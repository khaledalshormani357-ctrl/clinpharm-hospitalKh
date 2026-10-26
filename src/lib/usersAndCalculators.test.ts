import { describe, it, expect } from 'vitest';
import {
  getHospitalUsers,
  getActiveHospitalUser,
  setActiveHospitalUser,
  addHospitalUser,
  updateHospitalUser,
  deleteHospitalUser,
  getSystemAuditLogs
} from './usersManager';
import {
  PEDIATRIC_DRUG_FORMULARY,
  calculatePediatricDrugDose,
  calculateHollidaySegarFluids,
  calculatePediatricRenalAndPals,
  calculateMeldNa,
  calculateWinterTozerPhenytoin,
  calculateSodiumAndFreeWater,
  calculateAnionGapAndAcidBase,
  calculateQtcIntervals,
  convertCorticosteroid
} from './dynamedexAndPedsCalculators';
import {
  ensureAllCoreBooksPreloadedOffline,
  compileEmbeddedBookToFullRecord
} from './googleDrive/embeddedBookCompiler';
import { getOfflinePdfBlob } from './googleDrive/pdfOfflineStorageService';
import { getAllVerbatimBooks, getAllVerbatimChapters } from './library';

describe('Users & System Administrator Module (مدير النظام: خالد الشرماني)', () => {
  it('1. Initializes with Dr. Khaled Al-Shormani (د. خالد الشرماني) as Primary System Administrator', () => {
    const activeUser = getActiveHospitalUser();
    expect(activeUser.isPrimarySystemAdmin).toBe(true);
    expect(activeUser.role).toBe('system_admin');
    expect(activeUser.nameAr).toContain('خالد الشرماني');
    expect(activeUser.email).toBe('khaledalshormani357@gmail.com');
    expect(activeUser.permissions).toContain('FULL_ADMIN_ACCESS');
    expect(activeUser.permissions).toContain('MANAGE_USERS_RBAC');
    expect(activeUser.permissions).toContain('MANAGE_LIBRARY_VAULT');
    expect(activeUser.permissions).toContain('OVERRIDE_HIGH_ALERT_DDI');
  });

  it('2. Protects System Administrator (خالد الشرماني) from suspension or deletion and supports adding users', () => {
    const owner = getHospitalUsers().find(u => u.isPrimarySystemAdmin)!;
    expect(owner).toBeDefined();

    // Attempt to suspend owner should keep owner active/on_duty
    updateHospitalUser(owner.id, { status: 'suspended' });
    expect(getHospitalUsers().find(u => u.id === owner.id)?.status).not.toBe('suspended');

    // Attempt to delete owner should preserve owner
    const afterDeleteAttempt = deleteHospitalUser(owner.id);
    expect(afterDeleteAttempt.some(u => u.id === owner.id)).toBe(true);

    // Add a new user and switch session
    const newUser = addHospitalUser({
      nameAr: 'د. سامي المنصوري',
      nameEn: 'Dr. Sami Al-Mansouri',
      titleAr: 'صيدلي سريري - قسم الأطفال',
      titleEn: 'Pediatric Clinical Pharmacist',
      email: 'sami.mansouri@clinpharm-hospital.org',
      phone: '+967 771 999 888',
      role: 'clinical_pharmacist',
      departmentWard: 'Pediatrics',
      licenseBadge: 'BCPS-PED-901'
    });

    expect(newUser.id).toBeTruthy();
    setActiveHospitalUser(newUser.id);
    expect(getActiveHospitalUser().id).toBe(newUser.id);

    // Restore System Admin session
    setActiveHospitalUser(owner.id);
    expect(getActiveHospitalUser().isPrimarySystemAdmin).toBe(true);
    expect(getSystemAuditLogs().length).toBeGreaterThan(0);
  });
});

describe('Pediatric Drug Dosing & DynaMedex Clinical Calculators', () => {
  it('3. Provides 14 pediatric medications and calculates weight-based mg and mL volumes with adult ceiling', () => {
    expect(PEDIATRIC_DRUG_FORMULARY.length).toBeGreaterThanOrEqual(14);

    // High-dose Amoxicillin for 15 kg child (90 mg/kg/day divided q12h = 1350 mg/day = 675 mg/dose = 8.44 mL of 400mg/5mL [80 mg/mL])
    const amoxHigh = calculatePediatricDrugDose('amox-high-dose', 15, 90, 0);
    expect(amoxHigh.cappedDailyDoseMg).toBe(1350);
    expect(amoxHigh.cappedSingleDoseMg).toBe(675);
    expect(amoxHigh.volumePerDoseMl).toBeCloseTo(8.44, 1);
    expect(amoxHigh.isCappedAtAdultMax).toBe(false);

    // Adult ceiling test for 80 kg adolescent on Paracetamol (15 mg/kg = 1200 mg, capped at 1000 mg single dose)
    const paraHeavy = calculatePediatricDrugDose('paracetamol-peds', 80, 15, 0);
    expect(paraHeavy.cappedSingleDoseMg).toBe(1000);
    expect(paraHeavy.isCappedAtAdultMax).toBe(true);
  });

  it('4. Calculates Holliday-Segar 4-2-1 fluids and Bedside Schwartz Pediatric eGFR + PALS sizing', () => {
    // 25 kg child: first 10kg = 40 mL/hr, next 10kg = 20 mL/hr, remaining 5kg = 5 mL/hr -> 65 mL/hr
    const fluids = calculateHollidaySegarFluids(25, 5);
    expect(fluids.hourlyMaintenanceMlHr).toBe(65);
    expect(fluids.dehydrationDeficitMl).toBe(1250); // 25 kg * 5% * 10 = 1250 mL

    // 4-year-old, 16 kg, 102 cm, SCr 0.5 mg/dL -> Schwartz eGFR = 0.413 * 102 / 0.5 = 84.3
    const pedsRenal = calculatePediatricRenalAndPals(4, 16, 102, 0.5);
    expect(pedsRenal.schwartzEgfr).toBeCloseTo(84.3, 1);
    expect(pedsRenal.cuffedEttMm).toBe(4.5);
    expect(pedsRenal.defibFirstShockJoules).toBe(32);
  });

  it('5. Computes DynaMedex MELD-Na, Winter-Tozer Phenytoin, DKA Corrected Na+, Anion Gap, QTc, and Steroids', () => {
    const meld = calculateMeldNa(3.2, 2.1, 2.4, 128, false);
    expect(meld.meldNaScore).toBeGreaterThanOrEqual(25);

    // Phenytoin 8.0 mcg/mL in hypoalbuminemia (Albumin 2.2 g/dL, normal renal) -> Corrected ~14.8 mcg/mL (therapeutic)
    const pheny = calculateWinterTozerPhenytoin(8.0, 2.2, false);
    expect(pheny.correctedPhenytoin).toBeGreaterThan(13);
    expect(pheny.status).toBe('therapeutic');

    // Hyperglycemic Na+ (Measured 128, Glucose 600 -> Katz +8 -> 136 mEq/L)
    const naCalc = calculateSodiumAndFreeWater(128, 600, 70, 'adult_male', 140);
    expect(naCalc.katzCorrectedNa).toBe(136);

    // Hypernatremia Free Water Deficit (Measured Na 154, Target 140, 70kg male TBW 42L -> 4.2L deficit)
    const hyperNa = calculateSodiumAndFreeWater(154, 100, 70, 'adult_male', 140);
    expect(hyperNa.freeWaterDeficitLiters).toBeCloseTo(4.2, 1);

    // High Anion Gap Metabolic Acidosis (Na 138, Cl 100, HCO3 10, Albumin 2.5 -> AG 28, Corrected AG 31.8)
    const ag = calculateAnionGapAndAcidBase(138, 100, 10, 2.5, 23);
    expect(ag.anionGap).toBe(28);
    expect(ag.correctedAnionGap).toBeCloseTo(31.8, 1);
    expect(ag.wintersExpectedPaco2Min).toBeCloseTo(21, 1);

    // QTc prolongation (QT 480 ms, HR 75 bpm -> RR 0.8s -> Bazett ~537 ms)
    const qtc = calculateQtcIntervals(480, 75, 90);
    expect(qtc.bazettMs).toBeGreaterThan(500);
    expect(qtc.isHighTdpRisk).toBe(true);

    // Corticosteroid conversion: Prednisone 40 mg = Dexamethasone 6 mg
    const steroid = convertCorticosteroid('Prednisone', 40, 'Dexamethasone');
    expect(steroid.convertedDoseMg).toBe(6);
    expect(steroid.prednisoneEquivalentMg).toBe(40);
  });
});

describe('Pre-loaded Full Reference Library & Multi-Page PDF Compiler', () => {
  it('6. Pre-seeds all 7 clinical reference books offline with valid PDF-1.4 binary files', async () => {
    const books = getAllVerbatimBooks();
    expect(books.length).toBe(7);

    const seededRecords = await ensureAllCoreBooksPreloadedOffline();
    expect(seededRecords.length).toBe(7);

    // Verify Stockley's Drug Interactions PDF binary is available in IndexedDB/Memory vault
    const stockleyBlob = await getOfflinePdfBlob('1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S');
    expect(stockleyBlob).not.toBeNull();
    expect(stockleyBlob!.size).toBeGreaterThan(500);

    // Verify synthesized PDF header/footer
    const compiled = compileEmbeddedBookToFullRecord(books[0].id);
    const header = new TextDecoder().decode(compiled.pdfBytes.slice(0, 8));
    expect(header).toContain('%PDF-1.4');

    // Ensure pre-seeding does not duplicate chapter count
    expect(getAllVerbatimChapters().length).toBe(47);
  });
});

import { useState } from 'react';
import { Patient, Ward, Language, PatientStatus, CustomLabTest } from '../types/clinical';
import {
  X,
  UserPlus,
  Stethoscope,
  Activity,
  FileText,
  ClipboardList,
  HeartPulse,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  Calculator,
  Plus,
  Trash2
} from 'lucide-react';
import { calculateCrCl } from '../lib/clinical-engine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: Patient) => void;
  lang: Language;
}

type AdmissionSectionTab =
  | 'demographics'
  | 'subjective_hop'
  | 'medical_history'
  | 'objective_pe'
  | 'labs_diagnostics';

export function NewPatientModal({ isOpen, onClose, onAddPatient, lang }: Props) {
  const [activeSection, setActiveSection] = useState<AdmissionSectionTab>('demographics');

  // 1. Demographic & Administrative Information
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [mrn, setMrn] = useState(`MRN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [age, setAge] = useState(64);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(84);
  const [height, setHeight] = useState(172);
  const [ward, setWard] = useState<Ward>('ICU');
  const [room, setRoom] = useState('ICU-09');
  const [bed, setBed] = useState('A');
  const [status, setStatus] = useState<PatientStatus>('critical');
  const [attendingPhysician, setAttendingPhysician] = useState('د. طارق السديري (Dr. Tariq Al-Sudairi)');
  const [clinicalPharmacist, setClinicalPharmacist] = useState('د. فيصل الحربي (Dr. Faisal Al-Harbi, PharmD)');
  const [sourceOfHistory, setSourceOfHistory] = useState(
    'المريض وأفراد الأسرة + السجل الطبي الإلكتروني (Patient, Family & Electronic Health Record - Reliable)'
  );
  const [caseBookReferenceCode, setCaseBookReferenceCode] = useState(
    'Schwinghammer e-Casebook Standard • Inpatient Pharmacotherapy Workup'
  );

  // 2. Subjective: Chief Complaint (CC), HOP (HPI), Subjective Summary & ROS
  const [chiefComplaint, setChiefComplaint] = useState(
    '«عندي كتمة شديدة في النفس وحرارة مرتفعة من يومين مع قلة في التبول» ("Severe shortness of breath, high fever for 2 days, and decreased urine output")'
  );
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState(
    '64-year-old male admitted with progressive dyspnea (Onset: 48h ago, Provocation: worse supine, Quality: air hunger, Severity: 8/10, Time: acute worsening over 12h). Associated with productive purulent cough, rigors, and oliguria (< 0.4 mL/kg/h over past 12 hours). Empiric broad-spectrum IV antimicrobials and fluid resuscitation initiated in ED.'
  );
  const [subjectiveNotes, setSubjectiveNotes] = useState(
    'Patient reports marked fatigue, orthopnea (3 pillows), pleuritic chest discomfort on deep inspiration, and thirst. Denies hemoptysis, syncope, or melena.'
  );
  const [rosConstitutional, setRosConstitutional] = useState('Positive for fever, chills, diaphoresis, and malaise.');
  const [rosCardiovascular, setRosCardiovascular] = useState('Positive for orthopnea and bilateral ankle swelling; denies chest radiation.');
  const [rosRespiratory, setRosRespiratory] = useState('Positive for tachypnea, dyspnea at rest, and productive yellow-green sputum.');
  const [rosGi, setRosGi] = useState('Anorexia and mild nausea; no vomiting, diarrhea, or abdominal pain.');
  const [rosGu, setRosGu] = useState('Positive for dark concentrated urine and oliguria (< 400 mL/24h).');
  const [rosNeuro, setRosNeuro] = useState('Alert and oriented x3, mild lethargy; no focal weakness or seizure.');
  const [rosMusculoskeletal, setRosMusculoskeletal] = useState('Generalized myalgias; no acute joint synovitis.');
  const [rosIntegumentary, setRosIntegumentary] = useState('Warm skin with decreased turgor; no rash or pressure ulcers.');

  // 3. Medical History (MH / PMH, PSH, FH, SH, Allergies, Immunization, Active Diagnoses)
  const [diagnosesInput, setDiagnosesInput] = useState(
    'Severe Hospital-Acquired Pneumonia (HAP), Sepsis-Induced AKI Stage 2, Type 2 Diabetes Mellitus, Hypertension'
  );
  const [pastMedicalHistoryInput, setPastMedicalHistoryInput] = useState(
    'Hypertension (12 years), Type 2 Diabetes Mellitus (9 years), CKD Stage 3a (Baseline SCr 1.2 mg/dL), Dyslipidemia'
  );
  const [pastSurgicalHistoryInput, setPastSurgicalHistoryInput] = useState(
    'Laparoscopic cholecystectomy (2018), PCI with DES to LAD (2022)'
  );
  const [familyHistory, setFamilyHistory] = useState(
    'Father had T2DM and ischemic stroke at age 68; mother had hypertension and CKD.'
  );
  const [socialHistory, setSocialHistory] = useState(
    'Retired school principal; lives with spouse. Former smoker (20 pack-years, quit 6 years ago). Denies alcohol or illicit substance use. High-sodium diet; moderate medication adherence.'
  );
  const [allergiesInput, setAllergiesInput] = useState('Penicillin (Maculopapular Rash), Sulfonamides (Urticaria)');
  const [immunizationStatus, setImmunizationStatus] = useState(
    'Influenza vaccine (Current season), Pneumococcal PCV20 (2024), COVID-19 booster x3.'
  );

  // 4. Objective: Vital Signs & Physical Examination (PE)
  const [bloodPressure, setBloodPressure] = useState('96/58');
  const [meanArterialPressure, setMeanArterialPressure] = useState(71);
  const [heartRate, setHeartRate] = useState(112);
  const [respiratoryRate, setRespiratoryRate] = useState(26);
  const [temperatureC, setTemperatureC] = useState(38.8);
  const [oxygenSaturation, setOxygenSaturation] = useState(91);
  const [oxygenDelivery, setOxygenDelivery] = useState('4L Nasal Cannula (titrating to SpO2 >= 94%)');
  const [painScore, setPainScore] = useState('3/10 (Pleuritic chest discomfort)');
  const [fluidBalance24h, setFluidBalance24h] = useState('+1,450 mL/24h (In: 2,200 mL / Urine Out: 750 mL)');
  const [dryWeightKg, setDryWeightKg] = useState(81.5);

  const [peGeneral, setPeGeneral] = useState('Acutely ill-appearing male in moderate respiratory distress, diaphoretic.');
  const [peHeent, setPeHeent] = useState('PERRLA, dry oral mucosa, no pharyngeal exudates.');
  const [peNeck, setPeNeck] = useState('Supple, JVP ~8 cm H2O, no carotid bruits or thyromegaly.');
  const [peCardiovascular, setPeCardiovascular] = useState('Tachycardic, regular rhythm, normal S1/S2, no murmurs or pericardial rub.');
  const [peChestLungs, setPeChestLungs] = useState('Coarse inspiratory crackles and bronchial breath sounds over right lower lobe; accessory muscle use.');
  const [peAbdomen, setPeAbdomen] = useState('Soft, non-tender, non-distended, normoactive bowel sounds.');
  const [peGenitourinary, setPeGenitourinary] = useState('Foley catheter in place with concentrated amber urine; no CVA tenderness.');
  const [peExtremities, setPeExtremities] = useState('1+ bilateral lower extremity pitting edema; capillary refill 3 seconds.');
  const [peNeurological, setPeNeurological] = useState('GCS 15/15, cranial nerves II-XII intact, no asterixis.');
  const [peSkin, setPeSkin] = useState('Warm, intact around right internal jugular central line site.');

  // 5. Laboratory Results (Lab Panel), Diagnostics & PPCP Care Plan
  const [scr, setScr] = useState(2.4);
  const [bun, setBun] = useState(48);
  const [potassium, setPotassium] = useState(4.9);
  const [sodium, setSodium] = useState(134);
  const [chloride, setChloride] = useState(98);
  const [bicarbonate, setBicarbonate] = useState(19);
  const [glucose, setGlucose] = useState(215);
  const [calcium, setCalcium] = useState(8.6);
  const [magnesium, setMagnesium] = useState(1.8);
  const [phosphate, setPhosphate] = useState(4.3);
  const [ast, setAst] = useState(42);
  const [alt, setAlt] = useState(38);
  const [alkPhos, setAlkPhos] = useState(110);
  const [bilirubin, setBilirubin] = useState(1.1);
  const [albumin, setAlbumin] = useState(3.1);
  const [wbc, setWbc] = useState(16.8);
  const [hemoglobin, setHemoglobin] = useState(11.9);
  const [hematocrit, setHematocrit] = useState(36.2);
  const [platelets, setPlatelets] = useState(185);
  const [inr, setInr] = useState(1.2);
  const [aptt, setAptt] = useState(32);
  const [lactate, setLactate] = useState(2.8);
  const [procalcitonin, setProcalcitonin] = useState(4.2);
  const [crp, setCrp] = useState(148);
  const [troponin, setTroponin] = useState(24);
  const [bnp, setBnp] = useState(640);
  const [hba1c, setHba1c] = useState(7.9);
  const [abgPh, setAbgPh] = useState(7.33);
  const [abgPaco2, setAbgPaco2] = useState(34);
  const [abgPao2, setAbgPao2] = useState(68);
  const [anionGap, setAnionGap] = useState(17);
  const [tdmNote, setTdmNote] = useState('Target Vancomycin AUC24/MIC 400–600 mg·h/L; draw two-point PK levels after renal-adjusted loading dose.');

  // Custom / Additional Lab Tests State
  const [customLabs, setCustomLabs] = useState<CustomLabTest[]>([
    {
      id: 'clab-init-1',
      name: 'Vancomycin AUC24/MIC',
      value: '510',
      unit: 'mg·h/L',
      referenceRange: '400–600 mg·h/L',
      category: 'TDM / PK',
      isAbnormal: false
    }
  ]);
  const [newCustomLabName, setNewCustomLabName] = useState('');
  const [newCustomLabValue, setNewCustomLabValue] = useState('');
  const [newCustomLabUnit, setNewCustomLabUnit] = useState('mg/dL');
  const [newCustomLabRange, setNewCustomLabRange] = useState('');
  const [newCustomLabCategory, setNewCustomLabCategory] = useState<CustomLabTest['category']>('Chemistry');
  const [newCustomLabAbnormal, setNewCustomLabAbnormal] = useState(false);

  const handleAddCustomLab = () => {
    if (!newCustomLabName.trim() || !newCustomLabValue.trim()) return;
    const item: CustomLabTest = {
      id: `clab-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: newCustomLabName.trim(),
      value: newCustomLabValue.trim(),
      unit: newCustomLabUnit.trim() || 'units',
      referenceRange: newCustomLabRange.trim() || 'Hospital Ref',
      category: newCustomLabCategory,
      isAbnormal: newCustomLabAbnormal,
      date: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setCustomLabs(prev => [...prev, item]);
    setNewCustomLabName('');
    setNewCustomLabValue('');
    setNewCustomLabRange('');
    setNewCustomLabAbnormal(false);
  };

  const handleRemoveCustomLab = (id: string) => {
    setCustomLabs(prev => prev.filter(l => l.id !== id));
  };

  const [ecgFindings, setEcgFindings] = useState('Sinus tachycardia at 112 bpm; QTc 442 ms; no acute ST-segment elevation.');
  const [imagingFindings, setImagingFindings] = useState('Chest X-Ray & CT: Right lower and middle lobe consolidation with air bronchograms and small parapneumonic effusion.');
  const [echoFindings, setEchoFindings] = useState('Transthoracic Echo: LVEF 50%, mild LV hypertrophy, IVC collapsible >50%.');
  const [microbiologyCultures, setMicrobiologyCultures] = useState(
    'Blood cultures x2 sets pending; Sputum Gram stain: >25 PMNs/LPF, Gram-negative bacilli & Gram-positive cocci in clusters.'
  );
  const [problemListAssessment, setProblemListAssessment] = useState(
    '1. Severe HAP with Sepsis: Requires empiric anti-MRSA + antipseudomonal coverage adjusted for CrCl.\n2. Sepsis-Induced AKI Stage 2 (SCr 2.4 vs baseline 1.2 mg/dL): Avoid nephrotoxins (NSAIDs, aminoglycosides) and adjust renally cleared beta-lactams.\n3. Hyperglycemia in Critical Illness (BG 215 mg/dL): Hold outpatient oral agents; initiate IV/basal-bolus insulin target 140–180 mg/dL.'
  );
  const [pharmacotherapyPlan, setPharmacotherapyPlan] = useState(
    '• Initiate Cefepime 2 g IV q12h (renal-adjusted) + Vancomycin 20 mg/kg IV loading dose followed by AUC-guided maintenance.\n• Hold home Metformin and Lisinopril during acute AKI and hemodynamic instability.\n• Start Enoxaparin 40 mg SC daily (or UFH 5000 U SC q8h if CrCl drops < 30 mL/min) for VTE prophylaxis.'
  );
  const [monitoringParameters, setMonitoringParameters] = useState(
    '• Efficacy: Defervescence (Temp < 37.8°C), WBC/Procalcitonin trend q48h, SpO2 >= 94%, MAP >= 65 mmHg, Urine output >= 0.5 mL/kg/h.\n• Safety/Toxicity: Daily SCr/BUN/K+, Vancomycin two-level AUC24 monitoring, QTc interval, blood glucose q4h.'
  );

  if (!isOpen) return null;

  const crclPreview = calculateCrCl(age, weight, height, gender, scr);

  const applyCasebookPreset = (preset: 'sepsis_hap' | 'ccu_nstemi' | 'icu_dka') => {
    if (preset === 'sepsis_hap') {
      setName('سلمان بن راشد الدوسري');
      setNameEn('Salman R. Al-Dosari');
      setAge(66);
      setGender('male');
      setWeight(85);
      setHeight(170);
      setWard('ICU');
      setRoom('ICU-10');
      setBed('A');
      setStatus('critical');
      setChiefComplaint('«عندي حرارة شديدة وكتمة في النفس وبلغم أصفر من يومين» ("High fever, severe dyspnea, and purulent sputum for 2 days")');
      setHistoryOfPresentIllness(
        '66-year-old male admitted to ICU with severe Hospital-Acquired Pneumonia (HAP) complicated by sepsis and oliguric AKI Stage 2 (SCr doubled from 1.2 to 2.6 mg/dL).'
      );
      setDiagnosesInput('Severe HAP, Septic Shock (early), AKI Stage 2, Type 2 Diabetes Mellitus, Hypertension');
      setPastMedicalHistoryInput('HTN (14 yrs), T2DM (10 yrs), CKD Stage 3a (Baseline SCr 1.2 mg/dL), BPH');
      setAllergiesInput('Penicillin (Anaphylaxis)');
      setBloodPressure('92/54');
      setMeanArterialPressure(67);
      setHeartRate(118);
      setRespiratoryRate(28);
      setTemperatureC(39.1);
      setOxygenSaturation(90);
      setScr(2.6);
      setBun(54);
      setPotassium(5.1);
      setSodium(133);
      setLactate(3.2);
      setProcalcitonin(6.4);
      setWbc(18.5);
    } else if (preset === 'ccu_nstemi') {
      setName('منيرة بنت عبدالعزيز القحطاني');
      setNameEn('Munira A. Al-Qahtani');
      setAge(69);
      setGender('female');
      setWeight(74);
      setHeight(158);
      setWard('CCU');
      setRoom('CCU-05');
      setBed('B');
      setStatus('observation');
      setChiefComplaint('«ألم ضاغط في الصدر يمتد للكتف الأيسر مع ضيق تنفس عند أقل مجهود» ("Crushing retrosternal chest pressure radiating to left shoulder with dyspnea")');
      setHistoryOfPresentIllness(
        '69-year-old female presenting with NSTEMI (hs-Troponin I 840 ng/L) and acute decompensated HFrEF (LVEF 35%). Currently under CCU observation post-PCI with DES.'
      );
      setDiagnosesInput('NSTEMI (Post-PCI DES), Acute on Chronic HFrEF (LVEF 35%), Paroxysmal Atrial Fibrillation, CKD Stage 3b');
      setPastMedicalHistoryInput('HFrEF (LVEF 35%), Paroxysmal AFib, Dyslipidemia, Hypertension, CKD Stage 3b');
      setAllergiesInput('Aspirin (Desensitized), Contrast Dye (Premedicate)');
      setBloodPressure('118/72');
      setMeanArterialPressure(87);
      setHeartRate(88);
      setRespiratoryRate(20);
      setTemperatureC(36.9);
      setOxygenSaturation(95);
      setScr(1.7);
      setBun(38);
      setPotassium(4.8);
      setSodium(136);
      setLactate(1.4);
      setProcalcitonin(0.2);
      setTroponin(840);
      setBnp(1420);
      setWbc(9.4);
    } else if (preset === 'icu_dka') {
      setName('ريان بن فهد الشهري');
      setNameEn('Rayan F. Al-Shehri');
      setAge(29);
      setGender('male');
      setWeight(68);
      setHeight(176);
      setWard('ICU');
      setRoom('ICU-03');
      setBed('B');
      setStatus('improving');
      setChiefComplaint('«عطش شديد وغثيان وقيء مستمر وألم في البطن من ٢٤ ساعة» ("Severe polydipsia, persistent vomiting, and abdominal pain for 24h")');
      setHistoryOfPresentIllness(
        '29-year-old male with Type 1 DM admitted with severe Diabetic Ketoacidosis (DKA: BG 460 mg/dL, pH 7.18, HCO3 10 mEq/L, Anion Gap 26) triggered by insulin pump cannula occlusion. Now improving on IV regular insulin & K+ replacement.'
      );
      setDiagnosesInput('Diabetic Ketoacidosis (DKA - Resolving), Type 1 Diabetes Mellitus, Hypokalemia (Corrected), Prerenal Azotemia');
      setPastMedicalHistoryInput('Type 1 Diabetes Mellitus (diagnosed age 14), Autoimmune Hypothyroidism');
      setAllergiesInput('No Known Drug Allergies (NKDA)');
      setBloodPressure('114/68');
      setMeanArterialPressure(83);
      setHeartRate(98);
      setRespiratoryRate(22);
      setTemperatureC(37.1);
      setOxygenSaturation(99);
      setScr(1.3);
      setBun(29);
      setPotassium(3.7);
      setSodium(132);
      setBicarbonate(15);
      setGlucose(230);
      setAnionGap(16);
      setAbgPh(7.29);
      setLactate(1.9);
      setWbc(13.2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !nameEn.trim()) return;

    const diagnoses = diagnosesInput
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    const allergies = allergiesInput
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);

    const pastMedicalHistory = pastMedicalHistoryInput
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    const pastSurgicalHistory = pastSurgicalHistoryInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newPatient: Patient = {
      id: `pt-${Date.now()}`,
      mrn,
      name: name.trim() || nameEn.trim(),
      nameEn: nameEn.trim() || name.trim(),
      age: Number(age) || 50,
      gender,
      weight: Number(weight) || 70,
      height: Number(height) || 170,
      ward,
      room: room || '101',
      bed: bed || 'A',
      admissionDate: new Date().toISOString().split('T')[0],
      status,
      attendingPhysician,
      clinicalPharmacist,
      allergies: allergies.length > 0 ? allergies : ['No Known Drug Allergies (NKDA)'],
      diagnoses: diagnoses.length > 0 ? diagnoses : ['General Inpatient Evaluation'],
      labs: {
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        serumCreatinine: Number(scr) || 1.0,
        bun: Number(bun) || 18,
        potassium: Number(potassium) || 4.2,
        sodium: Number(sodium) || 138,
        chloride: Number(chloride) || 101,
        bicarbonate: Number(bicarbonate) || 24,
        glucose: Number(glucose) || 110,
        calcium: Number(calcium) || 9.0,
        magnesium: Number(magnesium) || 2.0,
        phosphate: Number(phosphate) || 3.5,
        crcl: crclPreview.crcl,
        ast: Number(ast) || 25,
        alt: Number(alt) || 28,
        alkPhos: Number(alkPhos) || 85,
        bilirubin: Number(bilirubin) || 0.8,
        albumin: Number(albumin) || 3.8,
        wbc: Number(wbc) || 8.0,
        hgb: Number(hemoglobin) || 13.2,
        hct: Number(hematocrit) || 39.5,
        platelets: Number(platelets) || 240,
        inr: Number(inr) || 1.0,
        aptt: Number(aptt) || 30,
        lactate: Number(lactate) || 1.2,
        procalcitonin: Number(procalcitonin) || 0.1,
        crp: Number(crp) || 10,
        troponin: `${troponin} ng/L`,
        bnp: `${bnp} pg/mL`,
        hba1c: Number(hba1c) || 6.2,
        ph: Number(abgPh) || 7.4,
        paco2: Number(abgPaco2) || 40,
        pao2: Number(abgPao2) || 92,
        anionGap: Number(anionGap) || 12,
        tdmSummary: tdmNote,
        customLabs
      },
      activeMedications: [],
      homeMedications: [],
      caseReport: {
        historySourceAndReliability: `${sourceOfHistory} (${caseBookReferenceCode})`,
        chiefComplaint,
        hopHpi: historyOfPresentIllness,
        subjectiveSummary: subjectiveNotes,
        pastMedicalHistory,
        pastSurgicalHistory,
        familyHistory,
        socialHistory,
        medicationAdherence: 'Documented in admission Medication Reconciliation & Social History',
        immunizationStatus,
        reviewOfSystems: {
          constitutional: rosConstitutional,
          cardiovascular: rosCardiovascular,
          respiratory: rosRespiratory,
          gastrointestinal: rosGi,
          genitourinary: rosGu,
          neurological: rosNeuro,
          musculoskeletal: rosMusculoskeletal,
          endocrineSkin: rosIntegumentary
        },
        vitals: {
          bp: `${bloodPressure} mmHg (MAP ${meanArterialPressure})`,
          hr: Number(heartRate) || 80,
          rr: Number(respiratoryRate) || 18,
          temp: Number(temperatureC) || 37.0,
          spo2: `${oxygenSaturation}% (${oxygenDelivery})`,
          painScore,
          fluidBalance24h,
          dryWeightKg: Number(dryWeightKg) || Number(weight)
        },
        physicalExam: {
          general: peGeneral,
          heent: peHeent,
          neckJvd: peNeck,
          cardiovascular: peCardiovascular,
          chestLungs: peChestLungs,
          abdomen: peAbdomen,
          genitourinaryRectal: peGenitourinary,
          extremities: peExtremities,
          neurological: peNeurological,
          skin: peSkin
        },
        diagnostics: {
          ecg: ecgFindings,
          imaging: imagingFindings,
          echocardiogram: echoFindings,
          microbiologyCultures
        },
        problemListAssessment,
        pharmacotherapyCarePlan: pharmacotherapyPlan,
        monitoringParameters
      }
    };

    onAddPatient(newPatient);
    onClose();
  };

  const sectionTabs: { id: AdmissionSectionTab; labelAr: string; labelEn: string; icon: any }[] = [
    {
      id: 'demographics',
      labelAr: '1. البيانات الديموغرافية والحالة',
      labelEn: '1. Demographics & Status',
      icon: UserPlus
    },
    {
      id: 'subjective_hop',
      labelAr: '2. الشكوى (CC) وتاريخ المرض (HOP/ROS)',
      labelEn: '2. Subjective, CC & HOP (HPI)',
      icon: ClipboardList
    },
    {
      id: 'medical_history',
      labelAr: '3. التاريخ المرضي (MH / PSH / SH)',
      labelEn: '3. Medical History (MH & Allergies)',
      icon: Stethoscope
    },
    {
      id: 'objective_pe',
      labelAr: '4. الفحص السريري والعلامات الحيوية (Objective)',
      labelEn: '4. Objective (Vitals & PE)',
      icon: HeartPulse
    },
    {
      id: 'labs_diagnostics',
      labelAr: '5. المختبر والتشخيص والخطة (Labs & Plan)',
      labelEn: '5. Lab Results, Diagnostics & Plan',
      icon: FlaskConical
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-5xl w-full h-[95dvh] sm:h-auto sm:max-h-[93vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white px-4 pt-2.5 pb-3.5 sm:p-5 border-b border-teal-500/30 shrink-0">
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-2 sm:hidden" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm sm:text-base">
                    {lang === 'ar'
                      ? 'تقرير إدخال مريض شامل (Schwinghammer e-Casebook Case Report)'
                      : 'Comprehensive Patient Admission Case Report (e-Casebook Standard)'}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30">
                    JCPP PPCP + SOAP / HOP
                  </span>
                </div>
                <p className="text-[11px] text-teal-200/80 mt-0.5">
                  {lang === 'ar'
                    ? 'نموذج قياسي يغطي Demographics, Subjective (CC + HOP + ROS), Medical History (MH), Objective (Vitals + PE), Lab Results & Plan'
                    : 'Complete Pharmacotherapy Casebook workup: Demographics, CC, HOP/HPI, MH, ROS, Objective Vitals/PE, Labs & Care Plan'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {/* Quick e-Casebook Presets */}
              <button
                type="button"
                onClick={() => applyCasebookPreset('sepsis_hap')}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 text-[10px] font-bold transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {lang === 'ar' ? 'نموذج حرج (HAP/AKI)' : 'Preset: Critical HAP'}
              </button>
              <button
                type="button"
                onClick={() => applyCasebookPreset('ccu_nstemi')}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-[10px] font-bold transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {lang === 'ar' ? 'نموذج ملاحظة (NSTEMI)' : 'Preset: CCU Observation'}
              </button>
              <button
                type="button"
                onClick={() => applyCasebookPreset('icu_dka')}
                className="px-2.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-[10px] font-bold transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {lang === 'ar' ? 'نموذج تحسن (DKA)' : 'Preset: ICU DKA'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-300 transition ms-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section Stepper Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3 sm:px-5 gap-1.5 shrink-0">
          {sectionTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`py-3 px-3 border-b-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'border-teal-600 text-teal-700 dark:text-teal-400 bg-white dark:bg-slate-900/80'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* Live Anthropometric & Renal Banner */}
          <div className="p-3 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'الحسابات الفورية لملف الحالة (Live e-Casebook Indices):' : 'Live Case Report Indices:'}
              </span>
            </div>
            <div dir="ltr" className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 font-bold text-teal-700 dark:text-teal-300">
                CrCl (CG): {crclPreview.crcl} mL/min ({crclPreview.weightType})
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                IBW: {crclPreview.ibw} kg
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                BMI: {(weight / Math.pow(height / 100, 2)).toFixed(1)} kg/m²
              </span>
            </div>
          </div>

          {/* SECTION 1: DEMOGRAPHICS & STATUS */}
          {activeSection === 'demographics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'اسم المريض (بالعربية) *' : 'Patient Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="مثال: عبدالله بن محمد العتيبي"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'اسم المريض ( بالإنجليزية)' : 'Patient Name (English)'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={nameEn}
                    onChange={e => setNameEn(e.target.value)}
                    placeholder="e.g. Abdullah M. Al-Otaibi"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">MRN</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={mrn}
                    onChange={e => setMrn(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* Color-Coded Patient Status Selector */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar'
                    ? 'مؤشر حالة المريض السريرية (Patient Acuity Status Badge):'
                    : 'Patient Acuity Status Badge:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    {
                      id: 'critical' as PatientStatus,
                      labelAr: 'حرج (Critical)',
                      labelEn: 'Critical',
                      cls: 'border-rose-300 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800',
                      dot: 'bg-rose-600'
                    },
                    {
                      id: 'observation' as PatientStatus,
                      labelAr: 'تحت الملاحظة (Observation)',
                      labelEn: 'Under Observation',
                      cls: 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
                      dot: 'bg-amber-500'
                    },
                    {
                      id: 'improving' as PatientStatus,
                      labelAr: 'في تحسن (Improving)',
                      labelEn: 'Improving',
                      cls: 'border-sky-300 bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800',
                      dot: 'bg-sky-500'
                    },
                    {
                      id: 'stable' as PatientStatus,
                      labelAr: 'مستقر (Stable)',
                      labelEn: 'Stable',
                      cls: 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
                      dot: 'bg-emerald-500'
                    },
                    {
                      id: 'discharge_planned' as PatientStatus,
                      labelAr: 'مخطط للخروج (Discharge)',
                      labelEn: 'Discharge Planned',
                      cls: 'border-indigo-300 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-800',
                      dot: 'bg-indigo-500'
                    }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStatus(item.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        item.cls
                      } ${status === item.id ? 'ring-2 ring-slate-900 dark:ring-teal-400 scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                      <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Anthropometrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'العمر (Age - yrs)' : 'Age (yrs)'}
                  </label>
                  <input
                    type="number"
                    dir="ltr"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الجنس (Sex)' : 'Sex'}
                  </label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as 'male' | 'female')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="male">{lang === 'ar' ? 'ذكر (Male)' : 'Male'}</option>
                    <option value="female">{lang === 'ar' ? 'أنثى (Female)' : 'Female'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الوزن الفعلي (TBW - kg)' : 'Weight (kg)'}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    dir="ltr"
                    value={weight}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الطول (Height - cm)' : 'Height (cm)'}
                  </label>
                  <input
                    type="number"
                    dir="ltr"
                    value={height}
                    onChange={e => setHeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* Ward, Room, Bed & Care Team */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'القسم السريري (Ward)' : 'Clinical Ward'}
                  </label>
                  <select
                    value={ward}
                    onChange={e => setWard(e.target.value as Ward)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="ICU">العناية المركزة (ICU)</option>
                    <option value="CCU">عناية القلب (CCU)</option>
                    <option value="InternalMedicine">الباطنية (Internal Medicine)</option>
                    <option value="Surgery">الجراحة (Surgery)</option>
                    <option value="Oncology">الأورام (Oncology)</option>
                    <option value="Pediatrics">الأطفال (Pediatrics)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الغرفة (Room)' : 'Room'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'السرير (Bed)' : 'Bed'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={bed}
                    onChange={e => setBed(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الطبيب الاستشاري المعالج (Attending Physician)' : 'Attending Physician'}
                  </label>
                  <input
                    type="text"
                    value={attendingPhysician}
                    onChange={e => setAttendingPhysician(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الصيدلي الإكلينيكي (Clinical Pharmacist)' : 'Clinical Pharmacist'}
                  </label>
                  <input
                    type="text"
                    value={clinicalPharmacist}
                    onChange={e => setClinicalPharmacist(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'مصدر القصة المرضية وموثوقيتها (Source of History)' : 'Source of History & Reliability'}
                  </label>
                  <input
                    type="text"
                    value={sourceOfHistory}
                    onChange={e => setSourceOfHistory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'رمز مرجع الـ e-Casebook (Casebook Reference Tag)' : 'e-Casebook Reference Code'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={caseBookReferenceCode}
                    onChange={e => setCaseBookReferenceCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: SUBJECTIVE, CHIEF COMPLAINT (CC), HOP (HPI) & REVIEW OF SYSTEMS (ROS) */}
          {activeSection === 'subjective_hop' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'الشكوى الرئيسية للمريض (Chief Complaint - CC) بكلمات المريض:'
                    : 'Chief Complaint (CC) in patient’s own words:'}
                </label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={e => setChiefComplaint(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'تاريخ المرض الحالي (HOP / History of Present Illness - OPQRST Narrative):'
                    : 'History of Present Illness (HOP / HPI - OPQRST Narrative):'}
                </label>
                <textarea
                  rows={4}
                  dir="ltr"
                  value={historyOfPresentIllness}
                  onChange={e => setHistoryOfPresentIllness(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'الأعراض الذاتية الإضافية (Subjective Clinical Summary):'
                    : 'Subjective Clinical Summary:'}
                </label>
                <textarea
                  rows={2}
                  dir="ltr"
                  value={subjectiveNotes}
                  onChange={e => setSubjectiveNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-teal-700 dark:text-teal-400">
                  {lang === 'ar' ? 'مراجعة الأجهزة الشاملة (Review of Systems - ROS):' : 'Review of Systems (ROS):'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Constitutional (الحرارة/الوزن/الإرهاق)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosConstitutional}
                      onChange={e => setRosConstitutional(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Cardiovascular (القلب والأوعية)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosCardiovascular}
                      onChange={e => setRosCardiovascular(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Respiratory (الجهاز التنفسي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosRespiratory}
                      onChange={e => setRosRespiratory(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Gastrointestinal (الجهاز الهضمي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosGi}
                      onChange={e => setRosGi(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Genitourinary (الجهاز البولي والتناسلي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosGu}
                      onChange={e => setRosGu(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Neurological (الجهاز العصبي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosNeuro}
                      onChange={e => setRosNeuro(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Musculoskeletal (العضلات والمفاصل)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosMusculoskeletal}
                      onChange={e => setRosMusculoskeletal(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Integumentary / Skin (الجلد)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={rosIntegumentary}
                      onChange={e => setRosIntegumentary(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: MEDICAL HISTORY (MH / PMH, PSH, FH, SH, ALLERGIES) */}
          {activeSection === 'medical_history' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'التشخيصات الحالية عند الدخول (Active Admission Diagnoses - مفصولة بفاصلة):'
                    : 'Active Admission Diagnoses (comma-separated):'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={diagnosesInput}
                  onChange={e => setDiagnosesInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'التاريخ المرضي السابق (MH / Past Medical History - PMH - مفصول بفاصلة):'
                    : 'Past Medical History (MH / PMH - comma-separated):'}
                </label>
                <textarea
                  rows={2}
                  dir="ltr"
                  value={pastMedicalHistoryInput}
                  onChange={e => setPastMedicalHistoryInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar'
                    ? 'التاريخ الجراحي السابق (Past Surgical History - PSH - مفصول بفاصلة):'
                    : 'Past Surgical History (PSH - comma-separated):'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={pastSurgicalHistoryInput}
                  onChange={e => setPastSurgicalHistoryInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-rose-600 mb-1">
                    {lang === 'ar'
                      ? 'الحساسية الدوائية والتفاعل السريري (Allergies & Reaction):'
                      : 'Documented Allergies & Reaction:'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={allergiesInput}
                    onChange={e => setAllergiesInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'حالة التطعيمات (Immunization Status):' : 'Immunization Status:'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={immunizationStatus}
                    onChange={e => setImmunizationStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'التاريخ العائلي (Family History - FH):' : 'Family History (FH):'}
                  </label>
                  <textarea
                    rows={2}
                    dir="ltr"
                    value={familyHistory}
                    onChange={e => setFamilyHistory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar'
                      ? 'التاريخ الاجتماعي ونمط الحياة والالتزام الدوائي (Social History - SH):'
                      : 'Social History (SH - Tobacco, Alcohol, Occupation, Adherence):'}
                  </label>
                  <textarea
                    rows={2}
                    dir="ltr"
                    value={socialHistory}
                    onChange={e => setSocialHistory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: OBJECTIVE (VITAL SIGNS & PHYSICAL EXAMINATION) */}
          {activeSection === 'objective_pe' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  {lang === 'ar'
                    ? 'العلامات الحيوية وتوازن السوائل (Vital Signs & Fluid Balance - I/O):'
                    : 'Vital Signs & 24h Fluid Balance:'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      BP (mmHg)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={bloodPressure}
                      onChange={e => setBloodPressure(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      MAP (mmHg)
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={meanArterialPressure}
                      onChange={e => setMeanArterialPressure(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      HR (bpm)
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={heartRate}
                      onChange={e => setHeartRate(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      RR (breaths/min)
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={respiratoryRate}
                      onChange={e => setRespiratoryRate(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Temp (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={temperatureC}
                      onChange={e => setTemperatureC(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      SpO2 (%)
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={oxygenSaturation}
                      onChange={e => setOxygenSaturation(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      O2 Delivery Device
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={oxygenDelivery}
                      onChange={e => setOxygenDelivery(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Pain Score
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={painScore}
                      onChange={e => setPainScore(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Dry Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      dir="ltr"
                      value={dryWeightKg}
                      onChange={e => setDryWeightKg(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    24h Fluid Balance (Intake / Output - I/O)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={fluidBalance24h}
                    onChange={e => setFluidBalance24h(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* System-by-System Physical Examination (PE) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-teal-700 dark:text-teal-400">
                  {lang === 'ar'
                    ? 'الفحص السريري المفصل حسب الأجهزة (Systemic Physical Examination - PE):'
                    : 'System-by-System Physical Examination (PE):'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      General Appearance (المظهر العام)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peGeneral}
                      onChange={e => setPeGeneral(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      HEENT (الرأس والعين والأنف والحنجرة)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peHeent}
                      onChange={e => setPeHeent(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Neck / JVD / Thyroid (العنق وضغط الوريد الوداجي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peNeck}
                      onChange={e => setPeNeck(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Cardiovascular (فحص القلب)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peCardiovascular}
                      onChange={e => setPeCardiovascular(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Chest / Lungs (فحص الصدر والرئتين)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peChestLungs}
                      onChange={e => setPeChestLungs(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Abdomen (فحص البطن)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peAbdomen}
                      onChange={e => setPeAbdomen(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Genitourinary / Foley (الجهاز البولي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peGenitourinary}
                      onChange={e => setPeGenitourinary(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Extremities / Edema (الأطراف والوذمة)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peExtremities}
                      onChange={e => setPeExtremities(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Neurological / GCS (الفحص العصبي)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peNeurological}
                      onChange={e => setPeNeurological(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Skin & Vascular Access (الجلد والخطوط الوريدية)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={peSkin}
                      onChange={e => setPeSkin(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: COMPREHENSIVE LAB RESULTS, DIAGNOSTICS & PPCP PLAN */}
          {activeSection === 'labs_diagnostics' && (
            <div className="space-y-4">
              {/* Comprehensive Chemistry, Electrolytes, Liver, Hematology, Biomarkers & ABG */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-teal-700 dark:text-teal-400">
                  {lang === 'ar'
                    ? 'الفحوصات المخبرية الشاملة (Comprehensive Laboratory Panel - Renal, Electrolytes, LFTs, CBC, Coag, Sepsis/Cardiac & ABG):'
                    : 'Comprehensive Laboratory Panel:'}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">SCr (mg/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={scr}
                      onChange={e => setScr(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">BUN (mg/dL)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={bun}
                      onChange={e => setBun(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">K+ (mEq/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={potassium}
                      onChange={e => setPotassium(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Na+ (mEq/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={sodium}
                      onChange={e => setSodium(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Cl- (mEq/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={chloride}
                      onChange={e => setChloride(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">HCO3- (mEq/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={bicarbonate}
                      onChange={e => setBicarbonate(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Glucose (mg/dL)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={glucose}
                      onChange={e => setGlucose(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Ca2+ (mg/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={calcium}
                      onChange={e => setCalcium(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Mg2+ (mg/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={magnesium}
                      onChange={e => setMagnesium(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">PO4 (mg/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={phosphate}
                      onChange={e => setPhosphate(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">AST (U/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={ast}
                      onChange={e => setAst(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">ALT (U/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={alt}
                      onChange={e => setAlt(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">AlkPhos (U/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={alkPhos}
                      onChange={e => setAlkPhos(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">T.Bili (mg/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={bilirubin}
                      onChange={e => setBilirubin(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Albumin (g/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={albumin}
                      onChange={e => setAlbumin(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">WBC (x10³/µL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={wbc}
                      onChange={e => setWbc(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Hgb (g/dL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={hemoglobin}
                      onChange={e => setHemoglobin(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Plt (x10³/µL)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={platelets}
                      onChange={e => setPlatelets(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">INR</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={inr}
                      onChange={e => setInr(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">aPTT (sec)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={aptt}
                      onChange={e => setAptt(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Lactate (mmol/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={lactate}
                      onChange={e => setLactate(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Procalcitonin (ng/mL)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={procalcitonin}
                      onChange={e => setProcalcitonin(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">hs-Troponin (ng/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={troponin}
                      onChange={e => setTroponin(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">NT-proBNP (pg/mL)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={bnp}
                      onChange={e => setBnp(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">HbA1c (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      dir="ltr"
                      value={hba1c}
                      onChange={e => setHba1c(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">CRP (mg/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={crp}
                      onChange={e => setCrp(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">ABG pH</label>
                    <input
                      type="number"
                      step="0.01"
                      dir="ltr"
                      value={abgPh}
                      onChange={e => setAbgPh(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">PaCO2 (mmHg)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={abgPaco2}
                      onChange={e => setAbgPaco2(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">PaO2 (mmHg)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={abgPao2}
                      onChange={e => setAbgPao2(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500">Anion Gap (mEq/L)</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={anionGap}
                      onChange={e => setAnionGap(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Therapeutic Drug Monitoring (TDM / PK Notes)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={tdmNote}
                    onChange={e => setTdmNote(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* ADD CUSTOM / ADDITIONAL LABORATORY TESTS SECTION */}
              <div className="p-4 rounded-2xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/70 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                      <FlaskConical className="w-4 h-4 text-teal-600" />
                      {lang === 'ar'
                        ? 'إضافة فحوصات مخبرية إضافية ومخصصة (Add Custom / Additional Laboratory Tests & TDM):'
                        : 'Add Custom / Additional Laboratory Tests & TDM Levels:'}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === 'ar'
                        ? 'أضف أي فحوصات مخبرية تخصصية، مستويات دوائية (TDM)، هرمونات، أو مؤشرات حيوية غير مدرجة أعلاه ليتم تضمينها في ملف المريض وتقرير الـ Case Report.'
                        : 'Add specialized lab tests, TDM levels, endocrine tests, or biomarkers to include in the patient chart and Case Report.'}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-teal-600 text-white self-start sm:self-auto">
                    {customLabs.length} {lang === 'ar' ? 'فحوصات مضافة' : 'Custom Labs Added'}
                  </span>
                </div>

                {/* Quick Clinical Lab Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {lang === 'ar' ? 'إضافة سريعة:' : 'Quick Add:'}
                  </span>
                  {[
                    { name: 'Vancomycin Trough', value: '18.4', unit: 'mcg/mL', range: '10–20 mcg/mL', cat: 'TDM / PK' as const, abn: false },
                    { name: 'Digoxin Level', value: '1.6', unit: 'ng/mL', range: '0.5–0.9 ng/mL (HF)', cat: 'TDM / PK' as const, abn: true },
                    { name: 'D-Dimer', value: '2.4', unit: 'mg/L FEU', range: '< 0.50 mg/L', cat: 'Coagulation' as const, abn: true },
                    { name: 'Ferritin', value: '320', unit: 'ng/mL', range: '30–400 ng/mL', cat: 'Hematology' as const, abn: false },
                    { name: 'Serum Osmolality', value: '308', unit: 'mOsm/kg', range: '275–295 mOsm/kg', cat: 'Chemistry' as const, abn: true },
                    { name: 'Ammonia (NH3)', value: '78', unit: 'mcmol/L', range: '15–45 mcmol/L', cat: 'Chemistry' as const, abn: true },
                    { name: 'Uric Acid', value: '8.9', unit: 'mg/dL', range: '3.5–7.2 mg/dL', cat: 'Chemistry' as const, abn: true },
                    { name: 'Lipase', value: '64', unit: 'U/L', range: '10–140 U/L', cat: 'Chemistry' as const, abn: false },
                    { name: 'TSH', value: '3.2', unit: 'mIU/L', range: '0.4–4.5 mIU/L', cat: 'Endocrine' as const, abn: false },
                    { name: 'Tacrolimus Trough', value: '9.5', unit: 'ng/mL', range: '5–10 ng/mL', cat: 'TDM / PK' as const, abn: false }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCustomLabs(prev => [
                          ...prev,
                          {
                            id: `clab-pre-${Date.now()}-${idx}`,
                            name: preset.name,
                            value: preset.value,
                            unit: preset.unit,
                            referenceRange: preset.range,
                            category: preset.cat,
                            isAbnormal: preset.abn,
                            date: new Date().toISOString().slice(0, 16).replace('T', ' ')
                          }
                        ]);
                      }}
                      dir="ltr"
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold transition shrink-0 cursor-pointer"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>

                {/* Custom Lab Input Row */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-end bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'اسم الفحص المخبري (Test Name)' : 'Lab Test Name'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., Gentamicin Peak, Cortisol, LDH..."
                      value={newCustomLabName}
                      onChange={e => setNewCustomLabName(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'النتيجة (Value)' : 'Result Value'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., 14.2"
                      value={newCustomLabValue}
                      onChange={e => setNewCustomLabValue(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'الوحدة (Unit)' : 'Unit'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="mg/dL, mcg/mL..."
                      value={newCustomLabUnit}
                      onChange={e => setNewCustomLabUnit(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'المعدل الطبيعي (Ref Range)' : 'Reference Range'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., 10–20"
                      value={newCustomLabRange}
                      onChange={e => setNewCustomLabRange(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-[10px] font-bold text-rose-600 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={newCustomLabAbnormal}
                        onChange={e => setNewCustomLabAbnormal(e.target.checked)}
                        className="rounded text-rose-600"
                      />
                      <span>{lang === 'ar' ? 'غير طبيعي' : 'Abnormal'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCustomLab}
                      className="w-full py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة الفحص' : 'Add Test'}</span>
                    </button>
                  </div>
                </div>

                {/* Added Custom Labs List */}
                {customLabs.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {customLabs.map(cl => (
                      <div
                        key={cl.id}
                        dir="ltr"
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                          cl.isAbnormal
                            ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {cl.name}
                            </span>
                            {cl.isAbnormal && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                                HIGH/LOW
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-xs font-extrabold text-teal-700 dark:text-teal-300">
                            {cl.value} <span className="text-[10px] font-normal">{cl.unit}</span>
                            {cl.referenceRange && (
                              <span className="text-[10px] text-slate-400 ms-1">
                                (Ref: {cl.referenceRange})
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomLab(cl.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          title="Remove test"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Diagnostics: ECG, Imaging, Echo, Microbiology */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    12-Lead ECG Findings
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={ecgFindings}
                    onChange={e => setEcgFindings(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Echocardiogram (TTE / LVEF)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={echoFindings}
                    onChange={e => setEchoFindings(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chest X-Ray / CT / Diagnostic Imaging
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={imagingFindings}
                    onChange={e => setImagingFindings(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Microbiology Cultures & Gram Stain
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={microbiologyCultures}
                    onChange={e => setMicrobiologyCultures(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Prioritized Problem List Assessment, Pharmacotherapy Plan & Monitoring */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar'
                      ? 'تقييم قائمة المشكلات (Problem List Assessment):'
                      : 'Prioritized Problem List Assessment:'}
                  </label>
                  <textarea
                    rows={3}
                    dir="ltr"
                    value={problemListAssessment}
                    onChange={e => setProblemListAssessment(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar'
                      ? 'خطة الرعاية الصيدلانية (Pharmacotherapy Care Plan):'
                      : 'Pharmacotherapy Care Plan:'}
                  </label>
                  <textarea
                    rows={3}
                    dir="ltr"
                    value={pharmacotherapyPlan}
                    onChange={e => setPharmacotherapyPlan(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar'
                      ? 'مؤشرات المتابعة والفعالية والسمية (Monitoring Parameters):'
                      : 'Efficacy & Safety Monitoring Parameters:'}
                  </label>
                  <textarea
                    rows={3}
                    dir="ltr"
                    value={monitoringParameters}
                    onChange={e => setMonitoringParameters(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation & Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {activeSection !== 'demographics' && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = sectionTabs.findIndex(s => s.id === activeSection);
                    if (idx > 0) setActiveSection(sectionTabs[idx - 1].id);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold"
                >
                  {lang === 'ar' ? 'السابق' : 'Previous Section'}
                </button>
              )}
              {activeSection !== 'labs_diagnostics' && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = sectionTabs.findIndex(s => s.id === activeSection);
                    if (idx < sectionTabs.length - 1) setActiveSection(sectionTabs[idx + 1].id);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold"
                >
                  {lang === 'ar' ? 'القسم التالي ←' : 'Next Section →'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 ms-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {lang === 'ar'
                    ? 'حفظ واعتماد تقرير إدخال المريض (Admit & Save Case Report)'
                    : 'Admit Patient & Save Case Report'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export type Language = 'ar' | 'en';

export type Ward = 'ICU' | 'CCU' | 'InternalMedicine' | 'Surgery' | 'Oncology' | 'Pediatrics' | 'Nephrology';

export type PatientStatus = 'critical' | 'observation' | 'stable' | 'improving' | 'discharge_planned';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dose: string;
  route: string;
  frequency: string;
  startDate: string;
  indication: string;
  isHighAlert?: boolean;
  requiresRenalAdjustment?: boolean;
  requiresTDM?: boolean;
  notes?: string;
}

export interface CustomLabTest {
  id: string;
  name: string;
  value: string;
  unit: string;
  referenceRange?: string;
  category?: string;
  isAbnormal?: boolean;
  date?: string;
}

export interface LabResult {
  date: string;
  // Renal & Electrolytes (Basic Metabolic Panel)
  serumCreatinine: number; // mg/dL
  bun?: number; // mg/dL
  potassium: number; // mEq/L
  sodium: number; // mEq/L
  chloride?: number; // mEq/L
  bicarbonate?: number; // mEq/L (HCO3-)
  glucose?: number; // mg/dL
  calcium?: number; // mg/dL
  magnesium?: number; // mg/dL
  phosphate?: number; // mg/dL
  crcl?: number; // mL/min
  // Hepatic Panel
  alt?: number; // U/L
  ast?: number; // U/L
  alkPhos?: number; // U/L
  bilirubin?: number; // mg/dL
  albumin?: number; // g/dL
  // Hematology & Coagulation
  wbc?: number; // x10^3/uL
  hgb?: number; // g/dL
  hct?: number; // %
  platelets?: number; // x10^3/uL
  neutrophilsPercent?: number; // %
  inr?: number;
  aptt?: number; // sec
  // Cardiac, Inflammatory & Endocrine Biomarkers
  lactate?: number; // mmol/L
  procalcitonin?: number; // ng/mL
  crp?: number; // mg/L
  troponin?: string; // ng/L or ng/mL
  bnp?: string; // pg/mL (BNP or NT-proBNP)
  hba1c?: number; // %
  tsh?: number; // mIU/L
  // Arterial Blood Gas (ABG)
  ph?: number;
  paco2?: number; // mmHg
  pao2?: number; // mmHg
  anionGap?: number; // mEq/L
  // TDM Levels
  tdmSummary?: string;
  // User-Added Custom / Specialized Laboratory Tests
  customLabs?: CustomLabTest[];
}

export interface VitalSignsRecord {
  bp: string; // e.g., "108/66 mmHg (MAP 80)"
  hr: number; // bpm
  rr: number; // breaths/min
  temp: number; // °C
  spo2: string; // e.g., "94% on 2L NC"
  painScore?: string; // e.g., "2/10"
  fluidBalance24h?: string; // e.g., "In: 1800 mL / Out: 2400 mL (Net -600 mL)"
  dryWeightKg?: number;
}

export interface ReviewOfSystemsRecord {
  constitutional: string;
  cardiovascular: string;
  respiratory: string;
  gastrointestinal: string;
  genitourinary: string;
  neurological: string;
  musculoskeletal?: string;
  endocrineSkin?: string;
}

export interface PhysicalExamRecord {
  general: string;
  heent: string;
  neckJvd: string;
  cardiovascular: string;
  chestLungs: string;
  abdomen: string;
  genitourinaryRectal?: string;
  extremities: string;
  neurological: string;
  skin: string;
}

export interface DiagnosticWorkupRecord {
  ecg: string;
  imaging: string;
  echocardiogram?: string;
  microbiologyCultures: string;
  additionalTests?: string;
}

/**
 * Schwinghammer's Pharmacotherapy Casebook (e-Casebook) Standardized Case Report Model
 */
export interface CaseReportDetails {
  historySourceAndReliability: string;
  chiefComplaint: string;
  hopHpi: string; // History of Present Illness / History of Present Condition (HOP)
  subjectiveSummary: string;
  reviewOfSystems: ReviewOfSystemsRecord;
  pastMedicalHistory: string[]; // MH / PMH
  pastSurgicalHistory: string[]; // PSH
  familyHistory: string; // FH
  socialHistory: string; // SH (tobacco, alcohol, occupation, living situation, diet)
  medicationAdherence: string;
  immunizationStatus: string;
  vitals: VitalSignsRecord;
  physicalExam: PhysicalExamRecord; // Objective PE
  diagnostics: DiagnosticWorkupRecord;
  problemListAssessment: string;
  pharmacotherapyCarePlan: string;
  monitoringParameters: string;
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  name: string;
  nameEn: string;
  age: number;
  gender: 'male' | 'female';
  ward: Ward;
  room: string;
  bed: string;
  weight: number; // kg
  height: number; // cm
  allergies: string[];
  diagnoses: string[];
  admissionDate: string;
  attendingPhysician: string;
  clinicalPharmacist: string;
  activeMedications: Medication[];
  homeMedications: Medication[];
  labs: LabResult;
  status: PatientStatus;
  caseReport?: CaseReportDetails;
}

export type DRPType = 
  | 'unnecessary_drug'
  | 'needs_additional_drug'
  | 'ineffective_drug'
  | 'dosage_too_low'
  | 'dosage_too_high'
  | 'adverse_drug_reaction'
  | 'drug_interaction'
  | 'non_compliance'
  | 'route_inappropriate'
  | 'renal_dose_adjustment'
  | 'therapeutic_drug_monitoring';

export type InterventionStatus = 'pending' | 'accepted' | 'modified' | 'rejected';

export interface ClinicalIntervention {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  ward: Ward;
  date: string;
  drpType: DRPType;
  medicationInvolved: string;
  clinicalIssue: string;
  proposedRecommendation: string;
  rationale: string;
  severity: 'high' | 'medium' | 'low';
  pharmacist: string;
  physician: string;
  status: InterventionStatus;
  physicianFeedback?: string;
  costImpactEstimatedSAR?: number;
  resolvedAt?: string;
  referenceTitle?: string;
  referenceSourceUrl?: string;
  evidenceLevel?: string;
}

export interface ReconciliationDiscrepancy {
  id: string;
  patientId: string;
  drugName: string;
  type: 'omission' | 'commission' | 'dose_mismatch' | 'frequency_mismatch' | 'duplicate_therapy';
  homePrescription: string;
  hospitalOrder: string;
  clinicalSignificance: 'major' | 'moderate' | 'minor';
  clarificationStatus: 'resolved' | 'unresolved' | 'intentional';
  pharmacistAction: string;
}

export interface DrugInteractionAlert {
  id: string;
  drugA: string;
  drugB: string;
  severity: 'Contraindicated' | 'Major' | 'Moderate' | 'Minor';
  stockleyRating?: string;
  referenceSource?: string;
  referenceUrl?: string;
  mechanism: string;
  clinicalEffect: string;
  actionRequired: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  titleEn: string;
  ward: Ward;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  patientBrief: string;
  vitalsAndLabs: string;
  currentRegimen: string[];
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export type Language = 'ar' | 'en';

export type Ward = 'ICU' | 'CCU' | 'InternalMedicine' | 'Surgery' | 'Oncology' | 'Pediatrics' | 'Nephrology';

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

export interface LabResult {
  date: string;
  serumCreatinine: number; // mg/dL
  bun?: number; // mg/dL
  potassium: number; // mEq/L
  sodium: number; // mEq/L
  alt?: number; // U/L
  ast?: number; // U/L
  bilirubin?: number; // mg/dL
  albumin?: number; // g/dL
  inr?: number;
  wbc?: number; // x10^3/uL
  platelets?: number;
  crcl?: number; // mL/min
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
  status: 'critical' | 'stable' | 'improving' | 'discharge_planned';
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

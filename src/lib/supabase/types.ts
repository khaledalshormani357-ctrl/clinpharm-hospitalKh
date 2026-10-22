export type SyncState = "synced" | "pending" | "failed" | "conflict";

export interface SyncQueueItem {
  id: string; // Deterministic operation ID (e.g. `case-${entityId}` or `${entityId}`)
  entityId?: string; // Stable Entity UUID
  operation: "create" | "update" | "delete";
  table: "clinical_patients" | "clinical_cases" | "clinical_interventions" | "medication_reviews";
  payload: Record<string, any>;
  createdAt: number;
  attempts: number;
  lastError?: string;
  version?: number;
}

export interface ConflictRecord<T = Record<string, any>> {
  id: string;
  entityId: string;
  table: SyncQueueItem["table"];
  local: T;
  remote: T | null;
  reason: "concurrent_edit" | "deleted_remotely" | "stale_update";
  detectedAt: string;
}

export interface CloudPatient {
  id: string;
  owner_id: string;
  initials: string;
  name: string;
  ward: string;
  issue: string;
  status: string;
  color: string;
  sync_state?: SyncState;
  version?: number;
  created_at: string;
  updated_at: string;
}

export type PatientDraft = Omit<CloudPatient, "owner_id" | "created_at" | "updated_at"> & {
  sync_state?: SyncState;
};

export interface ClinicalCaseRecord {
  id?: string;
  owner_id?: string;
  patient_id?: string | null;
  title: string;
  current_step?: number;
  source_verified?: boolean;
  data?: Record<string, unknown>;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface InterventionRecord {
  id?: string;
  owner_id?: string;
  patient_id?: string | null;
  intervention_type: string;
  soap_note?: string;
  evidence_url?: string;
  evidence_level?: string;
  status?: "draft" | "submitted" | "accepted" | "rejected";
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MedicationReviewRecord {
  id?: string;
  owner_id?: string;
  patient_id?: string | null;
  indication: string;
  effectiveness?: string;
  safety?: string;
  status?: "draft" | "submitted" | "completed";
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GuidelineRecord {
  id: string;
  organization: string;
  title: string;
  year?: number;
  tier: string;
  source_url: string;
  status: string;
}

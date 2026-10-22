import { supabase } from "./client";
import { sanitizeSearchTerm } from "./search";
import type {
  ClinicalCaseRecord,
  InterventionRecord,
  MedicationReviewRecord,
} from "./types";

export type { ClinicalCaseRecord, InterventionRecord, MedicationReviewRecord };

function requireClient() {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export function generateStableUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4 UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const clinicalRepository = {
  cases: {
    async list(ownerId: string): Promise<ClinicalCaseRecord[]> {
      const { data, error } = await requireClient()
        .from("clinical_cases")
        .select("*")
        .eq("owner_id", ownerId)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ClinicalCaseRecord[];
    },

    /**
     * Idempotent case creation using deterministic entity UUID.
     * Upserts with onConflict 'id' to prevent duplicate row generation upon network replay.
     */
    async create(
      ownerId: string,
      input: Omit<ClinicalCaseRecord, "owner_id"> & { id?: string }
    ): Promise<ClinicalCaseRecord> {
      const recordId = input.id || generateStableUuid();
      const payload = {
        ...input,
        id: recordId,
        owner_id: ownerId,
        updated_at: input.updated_at || new Date().toISOString(),
      };

      const { data, error } = await requireClient()
        .from("clinical_cases")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) throw error;
      return data as ClinicalCaseRecord;
    },

    async update(
      ownerId: string,
      id: string,
      patch: Partial<ClinicalCaseRecord>
    ): Promise<ClinicalCaseRecord> {
      const { data, error } = await requireClient()
        .from("clinical_cases")
        .update({
          ...patch,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("owner_id", ownerId)
        .select()
        .single();
      if (error) throw error;
      return data as ClinicalCaseRecord;
    },

    async remove(ownerId: string, id: string): Promise<void> {
      const { error } = await requireClient()
        .from("clinical_cases")
        .delete()
        .eq("id", id)
        .eq("owner_id", ownerId);
      if (error) throw error;
    },
  },

  medicationReviews: {
    async list(ownerId: string): Promise<MedicationReviewRecord[]> {
      const { data, error } = await requireClient()
        .from("medication_reviews")
        .select("*")
        .eq("owner_id", ownerId)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MedicationReviewRecord[];
    },

    async upsert(
      ownerId: string,
      input: Omit<MedicationReviewRecord, "owner_id"> & { id?: string }
    ): Promise<MedicationReviewRecord> {
      const recordId = input.id || generateStableUuid();
      const payload = {
        ...input,
        id: recordId,
        owner_id: ownerId,
        updated_at: input.updated_at || new Date().toISOString(),
      };

      const { data, error } = await requireClient()
        .from("medication_reviews")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();
      if (error) throw error;
      return data as MedicationReviewRecord;
    },

    async remove(ownerId: string, id: string): Promise<void> {
      const { error } = await requireClient()
        .from("medication_reviews")
        .delete()
        .eq("id", id)
        .eq("owner_id", ownerId);
      if (error) throw error;
    },
  },

  interventions: {
    async list(ownerId: string): Promise<InterventionRecord[]> {
      const { data, error } = await requireClient()
        .from("clinical_interventions")
        .select("*")
        .eq("owner_id", ownerId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as InterventionRecord[];
    },

    /**
     * Idempotent intervention creation with deterministic client UUID.
     */
    async create(
      ownerId: string,
      input: Omit<InterventionRecord, "owner_id"> & { id?: string }
    ): Promise<InterventionRecord> {
      const recordId = input.id || generateStableUuid();
      const payload = {
        ...input,
        id: recordId,
        owner_id: ownerId,
        updated_at: input.updated_at || new Date().toISOString(),
      };

      const { data, error } = await requireClient()
        .from("clinical_interventions")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();
      if (error) throw error;
      return data as InterventionRecord;
    },

    async update(
      ownerId: string,
      id: string,
      patch: Partial<InterventionRecord>
    ): Promise<InterventionRecord> {
      const { data, error } = await requireClient()
        .from("clinical_interventions")
        .update({
          ...patch,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("owner_id", ownerId)
        .select()
        .single();
      if (error) throw error;
      return data as InterventionRecord;
    },

    async remove(ownerId: string, id: string): Promise<void> {
      const { error } = await requireClient()
        .from("clinical_interventions")
        .delete()
        .eq("id", id)
        .eq("owner_id", ownerId);
      if (error) throw error;
    },
  },

  guidelines: {
    async search(query: string) {
      const term = sanitizeSearchTerm(query);
      let request = requireClient()
        .from("guidelines")
        .select("*")
        .order("year", { ascending: false })
        .limit(50);
      if (term) {
        request = request.or(`title.ilike.%${term}%,organization.ilike.%${term}%`);
      }
      const { data, error } = await request;
      if (error) throw error;
      return data ?? [];
    },
  },
};

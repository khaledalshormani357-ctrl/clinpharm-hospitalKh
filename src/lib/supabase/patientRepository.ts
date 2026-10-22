import { supabase } from "./client";
import type { CloudPatient, PatientDraft } from "./types";

export const patientRepository = {
  async list(ownerId?: string): Promise<CloudPatient[]> {
    if (!supabase) throw new Error("Supabase is not configured");
    let query = supabase
      .from("clinical_patients")
      .select("*")
      .order("updated_at", { ascending: false });
    if (ownerId) query = query.eq("owner_id", ownerId);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as CloudPatient[];
  },

  /**
   * Upsert keeps retries idempotent (a create that succeeded on the server but lost its response).
   */
  async create(patient: PatientDraft, ownerId: string): Promise<CloudPatient> {
    if (!supabase) throw new Error("Supabase is not configured");
    const recordId =
      patient.id ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `pat-${Date.now()}`);
    const payload = {
      ...patient,
      id: recordId,
      owner_id: ownerId,
      sync_state: "synced" as const,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("clinical_patients")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return data as CloudPatient;
  },

  async update(
    id: string,
    ownerId: string,
    patch: Partial<PatientDraft>
  ): Promise<CloudPatient> {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase
      .from("clinical_patients")
      .update({
        ...patch,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("owner_id", ownerId)
      .select()
      .single();
    if (error) throw error;
    return data as CloudPatient;
  },

  async remove(id: string, ownerId: string): Promise<void> {
    if (!supabase) throw new Error("Supabase is not configured");
    const { error } = await supabase
      .from("clinical_patients")
      .delete()
      .eq("id", id)
      .eq("owner_id", ownerId);
    if (error) throw error;
  },
};

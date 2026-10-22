import { supabase } from "./client";

export type LinkStatus = "pending" | "active" | "revoked";
export type SupervisedStudent = {
  link_id: string;
  student_id: string;
  display_name: string | null;
  status: LinkStatus;
  created_at: string;
};
export type MySupervisor = {
  link_id: string;
  supervisor_id: string;
  display_name: string | null;
  status: LinkStatus;
  created_at: string;
};
export type Competency = "not_yet" | "developing" | "competent" | "excellent";
export type FeedbackRecord = {
  id: string;
  supervisor_id: string;
  student_id: string;
  entity_type: string;
  entity_id: string | null;
  comment: string;
  competency: Competency | null;
  created_at: string;
};

function client() {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export const supervisionRepository = {
  async myInviteCode(userId: string) {
    const { data, error } = await client()
      .from("profiles")
      .select("invite_code, role, display_name")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data as {
      invite_code: string | null;
      role: string;
      display_name: string | null;
    };
  },

  async requestSupervision(studentCode: string) {
    const { data, error } = await client().rpc("request_supervision", {
      student_code: studentCode,
    });
    if (error) throw error;
    return data as string;
  },

  async students() {
    const { data, error } = await client().rpc("supervised_students");
    if (error) throw error;
    return (data ?? []) as SupervisedStudent[];
  },

  async supervisors() {
    const { data, error } = await client().rpc("my_supervisors");
    if (error) throw error;
    return (data ?? []) as MySupervisor[];
  },

  async setStatus(linkId: string, status: "active" | "revoked") {
    const { error } = await client()
      .from("supervision_links")
      .update({ status })
      .eq("id", linkId);
    if (error) throw error;
  },

  async studentOverview(studentId: string) {
    const [cases, interventions, reviews] = await Promise.all([
      client()
        .from("clinical_cases")
        .select("id,title,current_step,source_verified,updated_at")
        .eq("owner_id", studentId)
        .order("updated_at", { ascending: false })
        .limit(20),
      client()
        .from("clinical_interventions")
        .select("id,intervention_type,status,evidence_level,updated_at")
        .eq("owner_id", studentId)
        .order("updated_at", { ascending: false })
        .limit(20),
      client()
        .from("medication_reviews")
        .select("id,indication,status,updated_at")
        .eq("owner_id", studentId)
        .order("updated_at", { ascending: false })
        .limit(20),
    ]);
    for (const r of [cases, interventions, reviews]) if (r.error) throw r.error;
    return {
      cases: cases.data ?? [],
      interventions: interventions.data ?? [],
      reviews: reviews.data ?? [],
    };
  },

  async feedbackFor(studentId: string) {
    const { data, error } = await client()
      .from("supervisor_feedback")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return (data ?? []) as FeedbackRecord[];
  },

  async addFeedback(input: {
    student_id: string;
    comment: string;
    competency: Competency | null;
    entity_type?: string;
    entity_id?: string | null;
  }) {
    const { error } = await client()
      .from("supervisor_feedback")
      .insert({ entity_type: "general", ...input });
    if (error) throw error;
  },
};

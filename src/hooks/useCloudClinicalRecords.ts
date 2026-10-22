import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  clinicalRepository,
  generateStableUuid,
  type ClinicalCaseRecord,
  type InterventionRecord,
  type MedicationReviewRecord,
} from "@/lib/supabase/clinicalRepository";
import { syncQueue } from "@/lib/supabase/syncQueue";
import { localCache } from "@/lib/supabase/localCache";

export function useCloudClinicalRecords() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cases, setCases] = useState<ClinicalCaseRecord[]>(() => localCache.cases.get());
  const [interventions, setInterventions] = useState<InterventionRecord[]>(() =>
    localCache.interventions.get()
  );
  const [guidelines, setGuidelines] = useState<
    Array<{
      id: string;
      organization: string;
      title: string;
      year?: number;
      tier: string;
      source_url: string;
      status: string;
    }>
  >([]);
  const [medicationReviews, setMedicationReviews] = useState<MedicationReviewRecord[]>(() =>
    localCache.reviews.get()
  );
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    const ownerId = data.session?.user.id ?? null;
    setSessionId(ownerId);
    if (!ownerId) return;

    try {
      const [nextCases, nextInterventions, nextMedicationReviews] = await Promise.all([
        clinicalRepository.cases.list(ownerId),
        clinicalRepository.interventions.list(ownerId),
        clinicalRepository.medicationReviews.list(ownerId),
      ]);
      setCases(nextCases);
      setInterventions(nextInterventions);
      setMedicationReviews(nextMedicationReviews);
      localCache.cases.set(nextCases);
      localCache.interventions.set(nextInterventions);
      localCache.reviews.set(nextMedicationReviews);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Clinical cloud data unavailable");
    }
  }, []);

  useEffect(() => {
    void refresh();
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });
    return () => data.subscription.unsubscribe();
  }, [refresh]);

  /**
   * Deterministic Idempotent Case Creation:
   * Generates a fixed UUID upfront (`recordId`) and passes it in the payload and queue key
   * so retries or lost responses never produce duplicate clinical cases.
   */
  const createCase = useCallback(
    async (input: Omit<ClinicalCaseRecord, "owner_id"> & { id?: string }) => {
      if (!sessionId) throw new Error("Sign in to create a cloud clinical case");
      const recordId = input.id || generateStableUuid();
      const payload: ClinicalCaseRecord = {
        ...input,
        id: recordId,
        owner_id: sessionId,
        version: input.version ?? 1,
        created_at: input.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Optimistic local update
      setCases((items) => {
        const next = [payload, ...items.filter((c) => c.id !== recordId)];
        localCache.cases.set(next);
        return next;
      });

      try {
        const created = await clinicalRepository.cases.create(sessionId, payload);
        setCases((items) => {
          const next = items.map((c) => (c.id === recordId ? created : c));
          localCache.cases.set(next);
          return next;
        });
        return created;
      } catch (err) {
        syncQueue.enqueue({
          id: `case-${recordId}`,
          entityId: recordId,
          operation: "create",
          table: "clinical_cases",
          payload,
          version: payload.version,
        });
        throw err;
      }
    },
    [sessionId]
  );

  /**
   * Deterministic Idempotent Medication Review Upsert
   */
  const saveMedicationReview = useCallback(
    async (input: Omit<MedicationReviewRecord, "owner_id">) => {
      if (!sessionId) throw new Error("Sign in to save a medication review");
      const recordId = input.id || generateStableUuid();
      const isCreate = !input.id;
      const payload: MedicationReviewRecord = {
        ...input,
        id: recordId,
        owner_id: sessionId,
        version: (input.version ?? 0) + 1,
        updated_at: new Date().toISOString(),
      };

      setMedicationReviews((items) => {
        const next = [payload, ...items.filter((item) => item.id !== recordId)];
        localCache.reviews.set(next);
        return next;
      });

      try {
        const saved = await clinicalRepository.medicationReviews.upsert(sessionId, payload);
        setMedicationReviews((items) => {
          const next = [saved, ...items.filter((item) => item.id !== saved.id)];
          localCache.reviews.set(next);
          return next;
        });
        return saved;
      } catch (err) {
        syncQueue.enqueue({
          id: `medication-review-${recordId}`,
          entityId: recordId,
          operation: isCreate ? "create" : "update",
          table: "medication_reviews",
          payload,
          version: payload.version,
        });
        throw err;
      }
    },
    [sessionId]
  );

  /**
   * Resilient Medication Review Deletion with offline queue fallback
   */
  const deleteMedicationReview = useCallback(
    async (id: string) => {
      if (!sessionId) throw new Error("Sign in to delete a medication review");
      setMedicationReviews((items) => {
        const next = items.filter((item) => item.id !== id);
        localCache.reviews.set(next);
        return next;
      });
      try {
        await clinicalRepository.medicationReviews.remove(sessionId, id);
      } catch (err) {
        syncQueue.enqueue({
          id: `medication-review-${id}`,
          entityId: id,
          operation: "delete",
          table: "medication_reviews",
          payload: { id },
        });
        throw err;
      }
    },
    [sessionId]
  );

  /**
   * Deterministic Idempotent Intervention Creation
   */
  const createIntervention = useCallback(
    async (input: Omit<InterventionRecord, "owner_id"> & { id?: string }) => {
      if (!sessionId) throw new Error("Sign in to create a cloud intervention");
      const recordId = input.id || generateStableUuid();
      const payload: InterventionRecord = {
        ...input,
        id: recordId,
        owner_id: sessionId,
        version: input.version ?? 1,
        created_at: input.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setInterventions((items) => {
        const next = [payload, ...items.filter((i) => i.id !== recordId)];
        localCache.interventions.set(next);
        return next;
      });

      try {
        const created = await clinicalRepository.interventions.create(sessionId, payload);
        setInterventions((items) => {
          const next = items.map((i) => (i.id === recordId ? created : i));
          localCache.interventions.set(next);
          return next;
        });
        return created;
      } catch (err) {
        syncQueue.enqueue({
          id: `intervention-${recordId}`,
          entityId: recordId,
          operation: "create",
          table: "clinical_interventions",
          payload,
          version: payload.version,
        });
        throw err;
      }
    },
    [sessionId]
  );

  const searchGuidelines = useCallback(
    async (query: string) => {
      if (!sessionId) return [];
      const results = await clinicalRepository.guidelines.search(query);
      setGuidelines(results as typeof guidelines);
      return results;
    },
    [sessionId]
  );

  const updateIntervention = useCallback(
    async (id: string, patch: Partial<InterventionRecord>) => {
      if (!sessionId) throw new Error("Sign in to update a cloud intervention");
      setInterventions((items) => {
        const next = items.map((item) =>
          item.id === id
            ? { ...item, ...patch, updated_at: new Date().toISOString() }
            : item
        );
        localCache.interventions.set(next);
        return next;
      });
      try {
        const updated = await clinicalRepository.interventions.update(sessionId, id, patch);
        setInterventions((items) => {
          const next = items.map((item) => (item.id === id ? updated : item));
          localCache.interventions.set(next);
          return next;
        });
        return updated;
      } catch (err) {
        syncQueue.enqueue({
          id: `intervention-${id}`,
          entityId: id,
          operation: "update",
          table: "clinical_interventions",
          payload: { id, ...patch },
        });
        throw err;
      }
    },
    [sessionId]
  );

  const deleteCase = useCallback(
    async (id: string) => {
      if (!sessionId) throw new Error("Sign in to delete a cloud clinical case");
      setCases((items) => {
        const next = items.filter((item) => item.id !== id);
        localCache.cases.set(next);
        return next;
      });
      try {
        await clinicalRepository.cases.remove(sessionId, id);
      } catch (err) {
        syncQueue.enqueue({
          id: `case-${id}`,
          entityId: id,
          operation: "delete",
          table: "clinical_cases",
          payload: { id },
        });
        throw err;
      }
    },
    [sessionId]
  );

  return {
    sessionId,
    cases,
    interventions,
    guidelines,
    medicationReviews,
    error,
    refresh,
    createCase,
    createIntervention,
    searchGuidelines,
    updateIntervention,
    deleteCase,
    saveMedicationReview,
    deleteMedicationReview,
    isProtected: !sessionId,
  };
}

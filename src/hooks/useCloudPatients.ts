import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { patientRepository } from "@/lib/supabase/patientRepository";
import { clinicalRepository, generateStableUuid } from "@/lib/supabase/clinicalRepository";
import { resolveConflictDetailed, syncQueue } from "@/lib/supabase/syncQueue";
import { ensureCacheOwner } from "@/lib/supabase/localCache";
import type { CloudPatient, PatientDraft, SyncState, SyncQueueItem } from "@/lib/supabase/types";

const CACHE_KEY = "clinpharm-cloud-patients";

function readCache(): CloudPatient[] {
  try {
    if (typeof localStorage === "undefined") return [];
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]") as CloudPatient[];
  } catch {
    return [];
  }
}

function writeCache(items: CloudPatient[]) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(CACHE_KEY, JSON.stringify(items));
    }
  } catch {}
}

export function useCloudPatients() {
  const [patients, setPatients] = useState<CloudPatient[]>(readCache);
  const [syncState, setSyncState] = useState<SyncState>("pending");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { data: sessionData } = (await supabase?.auth.getSession()) ?? {
      data: { session: null },
    };
    const ownerId = sessionData.session?.user.id;
    if (!ownerId || !supabase) {
      setSyncState("pending");
      return;
    }

    // Never show or sync another account's cached patients on a shared device.
    if (ensureCacheOwner(ownerId)) {
      setPatients([]);
    }

    try {
      // 1. Flush pending queue items idempotently
      await syncQueue.flush(async (item: SyncQueueItem) => {
        const targetId = String(item.entityId || item.payload.id || item.id);
        if (item.table === "clinical_patients") {
          if (item.operation === "create") {
            await patientRepository.create(
              { ...(item.payload as PatientDraft), id: targetId },
              ownerId
            );
          }
          if (item.operation === "update") {
            await patientRepository.update(
              targetId,
              ownerId,
              item.payload as Partial<PatientDraft>
            );
          }
          if (item.operation === "delete") {
            await patientRepository.remove(targetId, ownerId);
          }
        }
        if (item.table === "clinical_cases") {
          if (item.operation === "create") {
            await clinicalRepository.cases.create(ownerId, {
              ...(item.payload as any),
              id: targetId,
            });
          }
          if (item.operation === "update") {
            await clinicalRepository.cases.update(ownerId, targetId, item.payload);
          }
          if (item.operation === "delete") {
            await clinicalRepository.cases.remove(ownerId, targetId);
          }
        }
        if (item.table === "clinical_interventions") {
          if (item.operation === "create") {
            await clinicalRepository.interventions.create(ownerId, {
              ...(item.payload as any),
              id: targetId,
            });
          }
          if (item.operation === "update") {
            await clinicalRepository.interventions.update(ownerId, targetId, item.payload);
          }
          if (item.operation === "delete") {
            await clinicalRepository.interventions.remove(ownerId, targetId);
          }
        }
        if (item.table === "medication_reviews") {
          if (item.operation === "create" || item.operation === "update") {
            await clinicalRepository.medicationReviews.upsert(ownerId, {
              ...(item.payload as any),
              id: targetId,
            });
          }
          if (item.operation === "delete") {
            await clinicalRepository.medicationReviews.remove(ownerId, targetId);
          }
        }
      });

      // 2. Fetch cloud patients and handle legacy draft migration
      let cloudPatients = await patientRepository.list(ownerId);
      const migrationKey = `clinpharm-migration-v1-${ownerId}`;
      if (cloudPatients.length === 0 && typeof localStorage !== "undefined" && !localStorage.getItem(migrationKey)) {
        let legacyPatients: PatientDraft[] = [];
        try {
          legacyPatients = JSON.parse(
            localStorage.getItem("clinpharm-patient-drafts") || "[]"
          ) as PatientDraft[];
        } catch {
          legacyPatients = [];
        }
        for (const legacy of legacyPatients) {
          try {
            await patientRepository.create(legacy, ownerId);
          } catch {
            /* duplicate or invalid legacy record; keep local cache */
          }
        }
        cloudPatients = await patientRepository.list(ownerId);
        localStorage.setItem(migrationKey, new Date().toISOString());
      }

      // 3. Reconcile local cache vs remote cloud records with full conflict detection
      const localList = readCache();
      const cachedById = new Map(localList.map((item) => [item.id, item]));
      const remoteById = new Map(cloudPatients.map((item) => [item.id, item]));
      const remainingQueue = syncQueue.list();

      const mergedPatients: CloudPatient[] = cloudPatients.map((remote) => {
        const local = cachedById.get(remote.id);
        if (!local) return remote;

        const resolution = resolveConflictDetailed(local, remote);
        if (resolution.isConflict) {
          syncQueue.conflicts.add({
            entityId: remote.id,
            table: "clinical_patients",
            local,
            remote,
            reason: "concurrent_edit",
          });
        }
        if (resolution.winner === "local" && local.updated_at !== remote.updated_at) {
          syncQueue.enqueue({
            id: `patient-conflict-${local.id}`,
            entityId: local.id,
            operation: "update",
            table: "clinical_patients",
            payload: local,
            version: (local.version ?? 1) + 1,
          });
        }
        return resolution.resolved;
      });

      // Check for local records that are NOT in remote (either pending create or deleted on another device)
      for (const local of localList) {
        if (!remoteById.has(local.id)) {
          const pendingOp = remainingQueue.find(
            (q) =>
              q.table === "clinical_patients" &&
              (q.entityId === local.id || q.payload?.id === local.id)
          );
          if (pendingOp && pendingOp.operation === "create") {
            // Still waiting to be created on server; keep in UI
            mergedPatients.unshift(local);
          } else if (pendingOp && pendingOp.operation === "update") {
            // Modified on this device, but deleted on another device!
            syncQueue.conflicts.add({
              entityId: local.id,
              table: "clinical_patients",
              local,
              remote: null,
              reason: "deleted_remotely",
            });
          }
        }
      }

      setPatients(mergedPatients);
      writeCache(mergedPatients);
      setSyncState("synced");
      setError(null);
    } catch (err) {
      setSyncState("failed");
      setError(err instanceof Error ? err.message : "Cloud sync failed");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") setPatients([]);
      void refresh();
    });
    return () => data.subscription.unsubscribe();
  }, [refresh]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOnline = () => {
      void refresh();
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [refresh]);

  const createPatient = useCallback(
    async (draft: PatientDraft) => {
      const session = await supabase?.auth.getSession();
      const ownerId = session?.data.session?.user.id;
      const patientId = draft.id || generateStableUuid();
      const localPatient: CloudPatient = {
        ...draft,
        id: patientId,
        owner_id: ownerId || "local",
        version: draft.version ?? 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sync_state: "pending",
      };

      const next = [localPatient, ...patients.filter((p) => p.id !== patientId)];
      setPatients(next);
      writeCache(next);

      if (!ownerId || !supabase || (typeof navigator !== "undefined" && !navigator.onLine)) {
        syncQueue.enqueue({
          id: localPatient.id,
          entityId: localPatient.id,
          operation: "create",
          table: "clinical_patients",
          payload: localPatient,
          version: localPatient.version,
        });
        setSyncState("pending");
        return localPatient;
      }

      try {
        const saved = await patientRepository.create({ ...draft, id: patientId }, ownerId);
        const savedItems = next.map((item) => (item.id === saved.id ? saved : item));
        setPatients(savedItems);
        writeCache(savedItems);
        setSyncState("synced");
        return saved;
      } catch (err) {
        syncQueue.enqueue({
          id: localPatient.id,
          entityId: localPatient.id,
          operation: "create",
          table: "clinical_patients",
          payload: localPatient,
          version: localPatient.version,
        });
        setSyncState("failed");
        setError(err instanceof Error ? err.message : "Create failed");
        return localPatient;
      }
    },
    [patients]
  );

  return useMemo(
    () => ({
      patients,
      syncState,
      error,
      refresh,
      createPatient,
      addPatient: createPatient,
      pendingCount: syncQueue.list().length,
    }),
    [patients, syncState, error, refresh, createPatient]
  );
}

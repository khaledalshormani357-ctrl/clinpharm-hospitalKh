import type { CloudPatient, ClinicalCaseRecord, InterventionRecord, MedicationReviewRecord } from "./types";

/**
 * Local (browser/WebView) cache hygiene & user-isolated clinical storage.
 *
 * Patient-related data is cached in localStorage for offline use. On shared
 * hospital devices that cache must never survive a sign-out un-isolated or leak into
 * another account's session.
 */
export const LOCAL_CACHE_KEYS = [
  "clinpharm-patient-drafts",
  "clinpharm-cloud-patients",
  "clinpharm-cloud-cases",
  "clinpharm-cloud-interventions",
  "clinpharm-cloud-reviews",
  "clinpharm-sync-queue",
  "clinpharm-sync-conflicts",
] as const;

const OWNER_KEY = "clinpharm-cache-owner";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const defaultStorage = (): StorageLike | null =>
  typeof localStorage === "undefined" ? null : localStorage;

export function purgeLocalClinicalData(storage: StorageLike | null = defaultStorage()) {
  if (!storage) return;
  for (const key of LOCAL_CACHE_KEYS) storage.removeItem(key);
  storage.removeItem(OWNER_KEY);
}

/**
 * Binds the cache to the signed-in user. If the cache belonged to someone else
 * it is wiped first. Returns true when a purge happened.
 */
export function ensureCacheOwner(
  userId: string,
  storage: StorageLike | null = defaultStorage()
): boolean {
  if (!storage) return false;
  const current = storage.getItem(OWNER_KEY);
  let purged = false;
  if (current && current !== userId) {
    purgeLocalClinicalData(storage);
    purged = true;
  }
  storage.setItem(OWNER_KEY, userId);
  return purged;
}

const KEYS = {
  PATIENTS: "clinpharm-cloud-patients",
  CASES: "clinpharm-cloud-cases",
  INTERVENTIONS: "clinpharm-cloud-interventions",
  REVIEWS: "clinpharm-cloud-reviews",
};

export const localCache = {
  patients: {
    get(): CloudPatient[] {
      try {
        return JSON.parse(defaultStorage()?.getItem(KEYS.PATIENTS) || "[]");
      } catch {
        return [];
      }
    },
    set(items: CloudPatient[]) {
      try {
        defaultStorage()?.setItem(KEYS.PATIENTS, JSON.stringify(items));
      } catch (err) {
        console.error("localCache patients write error", err);
      }
    },
  },

  cases: {
    get(): ClinicalCaseRecord[] {
      try {
        return JSON.parse(defaultStorage()?.getItem(KEYS.CASES) || "[]");
      } catch {
        return [];
      }
    },
    set(items: ClinicalCaseRecord[]) {
      try {
        defaultStorage()?.setItem(KEYS.CASES, JSON.stringify(items));
      } catch (err) {
        console.error("localCache cases write error", err);
      }
    },
  },

  interventions: {
    get(): InterventionRecord[] {
      try {
        return JSON.parse(defaultStorage()?.getItem(KEYS.INTERVENTIONS) || "[]");
      } catch {
        return [];
      }
    },
    set(items: InterventionRecord[]) {
      try {
        defaultStorage()?.setItem(KEYS.INTERVENTIONS, JSON.stringify(items));
      } catch (err) {
        console.error("localCache interventions write error", err);
      }
    },
  },

  reviews: {
    get(): MedicationReviewRecord[] {
      try {
        return JSON.parse(defaultStorage()?.getItem(KEYS.REVIEWS) || "[]");
      } catch {
        return [];
      }
    },
    set(items: MedicationReviewRecord[]) {
      try {
        defaultStorage()?.setItem(KEYS.REVIEWS, JSON.stringify(items));
      } catch (err) {
        console.error("localCache reviews write error", err);
      }
    },
  },

  clearAll() {
    purgeLocalClinicalData();
  },
};

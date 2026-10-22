import { beforeEach, describe, expect, it } from "vitest";
import { ensureCacheOwner, purgeLocalClinicalData } from "./supabase/localCache";
import { sanitizeSearchTerm } from "./supabase/search";
import {
  MAX_SYNC_ATTEMPTS,
  queueItemStatus,
  resolveConflict,
  syncQueue,
} from "./supabase/syncQueue";

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) {
    return this.data.has(key) ? this.data.get(key)! : null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, String(value));
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
  clear() {
    this.data.clear();
  }
}

beforeEach(() => {
  (globalThis as unknown as { localStorage: MemoryStorage }).localStorage =
    new MemoryStorage();
});

describe("local cache hygiene", () => {
  it("purges all clinical cache keys", () => {
    localStorage.setItem("clinpharm-patient-drafts", "[1]");
    localStorage.setItem("clinpharm-cloud-patients", "[2]");
    localStorage.setItem("clinpharm-sync-queue", "[3]");
    purgeLocalClinicalData();
    expect(localStorage.getItem("clinpharm-patient-drafts")).toBeNull();
    expect(localStorage.getItem("clinpharm-cloud-patients")).toBeNull();
    expect(localStorage.getItem("clinpharm-sync-queue")).toBeNull();
  });

  it("wipes the cache when a different user signs in on the same device", () => {
    expect(ensureCacheOwner("user-a")).toBe(false);
    localStorage.setItem("clinpharm-cloud-patients", '["A\'s patients"]');
    expect(ensureCacheOwner("user-a")).toBe(false);
    expect(localStorage.getItem("clinpharm-cloud-patients")).not.toBeNull();
    expect(ensureCacheOwner("user-b")).toBe(true);
    expect(localStorage.getItem("clinpharm-cloud-patients")).toBeNull();
  });
});

describe("search sanitiser", () => {
  it("removes characters that could alter a PostgREST filter", () => {
    expect(sanitizeSearchTerm("kdigo),title.ilike.%")).toBe("kdigo title.ilike.");
    expect(sanitizeSearchTerm("  a%_b  ")).toBe("a b");
    expect(sanitizeSearchTerm("x".repeat(200))).toHaveLength(80);
  });
});

describe("sync queue", () => {
  const base = { table: "clinical_patients" as const };

  it("coalesces a later edit into a queued create instead of dropping it", () => {
    syncQueue.enqueue({
      id: "p1",
      operation: "create",
      payload: { id: "p1", ward: "A" },
      ...base,
    });
    syncQueue.enqueue({
      id: "p1",
      operation: "update",
      payload: { ward: "B" },
      ...base,
    });
    const [item] = syncQueue.list();
    expect(syncQueue.list()).toHaveLength(1);
    expect(item.operation).toBe("create");
    expect(item.payload).toEqual({ id: "p1", ward: "B" });
  });

  it("cancels create + delete and turns update + delete into delete", () => {
    syncQueue.enqueue({
      id: "p1",
      operation: "create",
      payload: { id: "p1" },
      ...base,
    });
    syncQueue.enqueue({
      id: "p1",
      operation: "delete",
      payload: { id: "p1" },
      ...base,
    });
    expect(syncQueue.list()).toHaveLength(0);

    syncQueue.enqueue({
      id: "p2",
      operation: "update",
      payload: { id: "p2" },
      ...base,
    });
    syncQueue.enqueue({
      id: "p2",
      operation: "delete",
      payload: { id: "p2" },
      ...base,
    });
    expect(syncQueue.list()[0].operation).toBe("delete");
  });

  it("stops auto-retrying after the attempt limit but keeps the item visible", async () => {
    syncQueue.enqueue({
      id: "p3",
      operation: "create",
      payload: { id: "p3" },
      ...base,
    });
    let calls = 0;
    for (let i = 0; i < MAX_SYNC_ATTEMPTS + 3; i++) {
      await syncQueue.flush(async () => {
        calls++;
        throw new Error("offline");
      });
    }
    expect(calls).toBe(MAX_SYNC_ATTEMPTS);
    const [item] = syncQueue.list();
    expect(queueItemStatus(item)).toBe("failed");

    syncQueue.resetAttempts("p3");
    await syncQueue.flush(async () => undefined);
    expect(syncQueue.list()).toHaveLength(0);
  });

  it("keeps the most recent record on conflict", () => {
    const local = { updated_at: "2026-08-16T12:00:00.000Z" };
    const remote = { updated_at: "2026-08-16T11:00:00.000Z" };
    expect(resolveConflict(local, remote)).toBe(local);
    expect(resolveConflict(remote, local)).toBe(local);
  });
});

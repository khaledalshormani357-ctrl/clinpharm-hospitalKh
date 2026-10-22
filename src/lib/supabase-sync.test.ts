import { describe, it, expect, beforeEach } from "vitest";
import { syncQueue, resolveConflict, resolveConflictDetailed } from "./supabase/syncQueue";

const storageMock: Record<string, string> = {};
if (typeof globalThis.localStorage === "undefined") {
  (globalThis as any).localStorage = {
    getItem: (key: string) => storageMock[key] ?? null,
    setItem: (key: string, value: string) => {
      storageMock[key] = String(value);
    },
    removeItem: (key: string) => {
      delete storageMock[key];
    },
    clear: () => {
      Object.keys(storageMock).forEach((k) => delete storageMock[k]);
    },
  };
}

describe("Supabase sync conflict policy & P0/P1 Data Integrity Audit Tests", () => {
  beforeEach(() => {
    if (typeof localStorage.clear === "function") localStorage.clear();
    syncQueue.clear();
    syncQueue.conflicts.clear();
  });

  it("keeps the most recently updated record", () => {
    const local = { id: "p1", updated_at: "2026-08-16T12:00:00.000Z", value: "local" };
    const remote = { id: "p1", updated_at: "2026-08-16T11:00:00.000Z", value: "remote" };
    expect(resolveConflict(local, remote)).toEqual(local);
  });

  it("coalesces duplicate operations on the same entityId into a single queue entry (idempotency)", () => {
    const entityId = "uuid-case-1001";

    // First: enqueued as create
    syncQueue.enqueue({
      id: `case-${entityId}`,
      entityId,
      operation: "create",
      table: "clinical_cases",
      payload: { id: entityId, title: "Draft Case Title", current_step: 1 },
      version: 1,
    });

    expect(syncQueue.list()).toHaveLength(1);
    expect(syncQueue.list()[0].payload.title).toBe("Draft Case Title");

    // Second: updated locally before network flush
    syncQueue.enqueue({
      id: `case-update-${entityId}`,
      entityId,
      operation: "update",
      table: "clinical_cases",
      payload: { id: entityId, title: "Updated Case Title", current_step: 2 },
      version: 2,
    });

    // Should still be exactly 1 item in queue, coalesced into create with updated payload!
    const queue = syncQueue.list();
    expect(queue).toHaveLength(1);
    expect(queue[0].operation).toBe("create");
    expect(queue[0].payload.title).toBe("Updated Case Title");
    expect(queue[0].payload.current_step).toBe(2);
  });

  it("cancels pending create if an offline delete is enqueued for the same entity", () => {
    const entityId = "uuid-patient-2002";

    syncQueue.enqueue({
      id: `patient-${entityId}`,
      entityId,
      operation: "create",
      table: "clinical_patients",
      payload: { id: entityId, name: "Test Patient" },
    });

    expect(syncQueue.list()).toHaveLength(1);

    // Pharmacist deletes the draft before it ever synced
    syncQueue.enqueue({
      id: `patient-del-${entityId}`,
      entityId,
      operation: "delete",
      table: "clinical_patients",
      payload: { id: entityId },
    });

    // Both should cancel out, leaving empty queue (no redundant server writes)
    expect(syncQueue.list()).toHaveLength(0);
  });

  it("preserves unsynced queue items safely in isolated archive during user sign-out", () => {
    const userId = "doctor-usr-777";

    syncQueue.enqueue({
      id: "case-3003",
      entityId: "3003",
      operation: "create",
      table: "clinical_cases",
      payload: { id: "3003", title: "Critical ICU Intervention" },
    });

    expect(syncQueue.hasPendingSync()).toBe(true);
    expect(syncQueue.getPendingCount()).toBe(1);

    // Execute safe archive and clear
    const archiveResult = syncQueue.archiveAndClear(userId);
    expect(archiveResult.archivedCount).toBe(1);

    // Active queue is now empty
    expect(syncQueue.list()).toHaveLength(0);

    // But user archive in localStorage contains the un-synced data
    const archivedData = JSON.parse(localStorage.getItem(archiveResult.archiveKey) || "[]");
    expect(archivedData).toHaveLength(1);
    expect(archivedData[0].payload.title).toBe("Critical ICU Intervention");

    // Restoring upon next login recovers the items
    syncQueue.restoreArchive(userId);
    expect(syncQueue.list()).toHaveLength(1);
  });

  it("identifies concurrent multi-device conflicts via explicit version numbers", () => {
    const local = {
      id: "c1",
      version: 2,
      updated_at: "2026-10-12T10:00:00Z",
      title: "Local Edit",
    };
    const remote = {
      id: "c1",
      version: 3,
      updated_at: "2026-10-12T10:05:00Z",
      title: "Remote Edit",
    };

    const { resolved, isConflict } = resolveConflictDetailed(local, remote);
    expect(isConflict).toBe(false);
    expect(resolved.version).toBe(3);
    expect(resolved.title).toBe("Remote Edit");
  });

  it("detects conflict when both local and remote have same version but different content/timestamps", () => {
    const local = { id: "c2", version: 1, updated_at: "2026-10-12T10:00:01Z", ward: "ICU" };
    const remote = { id: "c2", version: 1, updated_at: "2026-10-12T10:00:02Z", ward: "CCU" };

    const { isConflict } = resolveConflictDetailed(local, remote);
    expect(isConflict).toBe(true);
  });

  it("tracks unresolvable conflicts (e.g. deleted remotely while edited locally) in recovery list", () => {
    syncQueue.conflicts.add({
      entityId: "pat-555",
      table: "clinical_patients",
      local: { id: "pat-555", name: "Edited Locally" },
      remote: null,
      reason: "deleted_remotely",
    });

    const conflicts = syncQueue.conflicts.list();
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].reason).toBe("deleted_remotely");

    syncQueue.conflicts.resolve("pat-555");
    expect(syncQueue.conflicts.list()).toHaveLength(0);
  });
});

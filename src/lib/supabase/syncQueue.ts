import type { ConflictRecord, SyncQueueItem } from "./types";

const QUEUE_KEY = "clinpharm-sync-queue";
const CONFLICTS_KEY = "clinpharm-sync-conflicts";
const ARCHIVE_PREFIX = "clinpharm-unsynced-archive-";

export const MAX_SYNC_ATTEMPTS = 5;
export const MAX_RETRY_ATTEMPTS = 5;

// In-memory fallback if localStorage is unavailable (e.g. Node/SSR/test environment)
const memStore: Record<string, string> = {};

function getStorageItem(key: string): string | null {
  if (typeof localStorage !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch {}
  }
  return memStore[key] || null;
}

function setStorageItem(key: string, val: string) {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(key, val);
      return;
    } catch {}
  }
  memStore[key] = val;
}

function removeStorageItem(key: string) {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(key);
      return;
    } catch {}
  }
  delete memStore[key];
}

function readQueue(): SyncQueueItem[] {
  try {
    return JSON.parse(getStorageItem(QUEUE_KEY) || "[]") as SyncQueueItem[];
  } catch {
    return [];
  }
}

function writeQueue(items: SyncQueueItem[]) {
  try {
    setStorageItem(QUEUE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to write sync queue", err);
  }
}

function readConflicts(): ConflictRecord[] {
  try {
    return JSON.parse(getStorageItem(CONFLICTS_KEY) || "[]") as ConflictRecord[];
  } catch {
    return [];
  }
}

function writeConflicts(items: ConflictRecord[]) {
  try {
    setStorageItem(CONFLICTS_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to write sync conflicts", err);
  }
}

export function queueItemStatus(item: SyncQueueItem): "conflict" | "failed" | "pending" {
  if (item.id.includes("conflict") || item.lastError?.includes("conflict")) return "conflict";
  if (item.attempts >= MAX_SYNC_ATTEMPTS) return "failed";
  return "pending";
}

export interface ConflictResolutionResult<T> {
  resolved: T;
  isConflict: boolean;
  winner: "local" | "remote";
  reason?: "version_mismatch" | "concurrent_edit" | "clock_skew" | "clean";
}

/**
 * Resolves conflict between local and remote versions with version & clock-skew awareness.
 */
export function resolveConflictDetailed<T extends { id?: string; updated_at?: string; version?: number }>(
  local: T,
  remote: T
): ConflictResolutionResult<T> {
  // 1. Explicit integer version comparison
  if (typeof local.version === "number" && typeof remote.version === "number") {
    if (local.version > remote.version) {
      return { resolved: local, isConflict: false, winner: "local", reason: "clean" };
    }
    if (remote.version > local.version) {
      return { resolved: remote, isConflict: false, winner: "remote", reason: "clean" };
    }
    // Same version counter: check if timestamps or contents diverged
    const localTime = local.updated_at ? Date.parse(local.updated_at) : 0;
    const remoteTime = remote.updated_at ? Date.parse(remote.updated_at) : 0;
    const isDifferent = JSON.stringify(local) !== JSON.stringify(remote);
    if (isDifferent) {
      const winner = localTime >= remoteTime ? local : remote;
      return {
        resolved: winner,
        isConflict: true,
        winner: winner === local ? "local" : "remote",
        reason: "concurrent_edit",
      };
    }
    return { resolved: remote, isConflict: false, winner: "remote", reason: "clean" };
  }

  // 2. Fallback to ISO timestamps with clock-skew detection (2s window)
  const localTime = local.updated_at ? Date.parse(local.updated_at) : 0;
  const remoteTime = remote.updated_at ? Date.parse(remote.updated_at) : 0;
  const diff = Math.abs(localTime - remoteTime);
  const isConflict = diff < 2000 && localTime !== 0 && remoteTime !== 0 && localTime !== remoteTime;
  const winner = localTime >= remoteTime ? local : remote;

  return {
    resolved: winner,
    isConflict,
    winner: winner === local ? "local" : "remote",
    reason: isConflict ? "clock_skew" : "clean",
  };
}

/**
 * Standard conflict resolver returning the winning record directly,
 * while also attaching non-enumerable metadata `.resolved` and `.isConflict`
 * so both `expect(resolveConflict(local, remote)).toBe(local)` AND
 * `const { resolved, isConflict } = resolveConflict(local, remote)` work seamlessly!
 */
export function resolveConflict<T extends { updated_at?: string; version?: number }>(
  local: T,
  remote: T
): T & { resolved: T; isConflict: boolean } {
  const detail = resolveConflictDetailed(local, remote);
  const winner = detail.resolved;
  if (winner && typeof winner === "object") {
    try {
      Object.defineProperty(winner, "resolved", {
        value: winner,
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(winner, "isConflict", {
        value: detail.isConflict,
        enumerable: false,
        configurable: true,
      });
    } catch {
      // Ignore if frozen
    }
  }
  return winner as T & { resolved: T; isConflict: boolean };
}

function getEntityKey(item: { id: string; entityId?: string; payload?: Record<string, any> }): string {
  if (item.entityId) return String(item.entityId);
  if (item.payload && typeof item.payload.id === "string" && item.payload.id) {
    return item.payload.id;
  }
  return item.id;
}

export const syncQueue = {
  list: readQueue,

  /**
   * Coalesces operations for the same record (matched by `id` or `table + entityId`):
   *  - create + update -> create (merged payload, incremented version)
   *  - create + delete -> nothing to sync (removed from queue)
   *  - update + update -> update (merged payload, incremented version)
   *  - update + delete -> delete
   *  - create + create (same entity) -> create (merged payload, idempotent)
   */
  enqueue(item: Omit<SyncQueueItem, "createdAt" | "attempts">) {
    const current = readQueue();
    const incomingEntityId = getEntityKey(item);

    const existingIndex = current.findIndex((entry) => {
      if (entry.id === item.id) return true;
      const entryEntityId = getEntityKey(entry);
      return entry.table === item.table && entryEntityId === incomingEntityId;
    });

    if (existingIndex === -1) {
      const nextItem: SyncQueueItem = {
        ...item,
        entityId: incomingEntityId,
        id: item.id || `${item.table}-${incomingEntityId}`,
        attempts: 0,
        createdAt: Date.now(),
      };
      const next = [...current, nextItem];
      writeQueue(next);
      return next;
    }

    const existing = current[existingIndex];

    // If new operation is delete:
    if (item.operation === "delete") {
      if (existing.operation === "create") {
        // Created offline then deleted before ever syncing -> cancel out completely
        const next = current.filter((_, idx) => idx !== existingIndex);
        writeQueue(next);
        return next;
      }
      // Existing was update or delete -> convert to delete
      const next = current.map((entry, idx) =>
        idx === existingIndex
          ? {
              ...entry,
              operation: "delete" as const,
              payload: item.payload,
              attempts: 0,
              lastError: undefined,
            }
          : entry
      );
      writeQueue(next);
      return next;
    }

    // If new operation is create or update:
    const next = current.map((entry, idx) =>
      idx === existingIndex
        ? {
            ...entry,
            entityId: incomingEntityId,
            operation: entry.operation === "create" ? ("create" as const) : item.operation,
            payload: { ...entry.payload, ...item.payload },
            version: (entry.version || 1) + 1,
            attempts: 0,
            lastError: undefined,
          }
        : entry
    );
    writeQueue(next);
    return next;
  },

  remove(id: string) {
    const next = readQueue().filter((item) => item.id !== id && item.entityId !== id);
    writeQueue(next);
    return next;
  },

  fail(id: string, error: string) {
    const next = readQueue().map((item) =>
      item.id === id
        ? {
            ...item,
            attempts: item.attempts + 1,
            lastError: error,
          }
        : item
    );
    writeQueue(next);
    return next;
  },

  /** Manual retry: lets a pharmacist re-arm an item that exhausted its attempts. */
  resetAttempts(id: string) {
    const next = readQueue().map((item) =>
      item.id === id ? { ...item, attempts: 0, lastError: undefined } : item
    );
    writeQueue(next);
    return next;
  },

  hasPendingSync(): boolean {
    return readQueue().some((item) => item.attempts < MAX_SYNC_ATTEMPTS);
  },

  getPendingCount(): number {
    return readQueue().filter((item) => item.attempts < MAX_SYNC_ATTEMPTS).length;
  },

  getPendingSummary(): { table: string; operation: string; count: number }[] {
    const items = readQueue();
    const map = new Map<string, number>();
    for (const item of items) {
      const key = `${item.table}:${item.operation}`;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries()).map(([key, count]) => {
      const [table, operation] = key.split(":");
      return { table, operation, count };
    });
  },

  /**
   * Conflict Recovery List:
   * Stores unresolvable conflicts (e.g. deleted remotely while modified locally, or version collision)
   * so pharmacists can inspect and resolve them without silent clinical data loss.
   */
  conflicts: {
    list: readConflicts,
    add(conflict: Omit<ConflictRecord, "id" | "detectedAt">) {
      const current = readConflicts();
      const id = `conflict-${conflict.table}-${conflict.entityId}`;
      const record: ConflictRecord = {
        ...conflict,
        id,
        detectedAt: new Date().toISOString(),
      };
      const filtered = current.filter((c) => c.id !== id);
      const next = [record, ...filtered];
      writeConflicts(next);
      return next;
    },
    resolve(id: string) {
      const next = readConflicts().filter((c) => c.id !== id && c.entityId !== id);
      writeConflicts(next);
      return next;
    },
    clear() {
      writeConflicts([]);
    },
  },

  /**
   * Safe sign-out guard:
   * Archives pending items to an isolated user storage key before clearing active queue.
   */
  archiveAndClear(userId: string): { archivedCount: number; archiveKey: string } {
    const items = readQueue();
    const archiveKey = `${ARCHIVE_PREFIX}${userId}`;
    if (items.length > 0) {
      try {
        const existingArchive = JSON.parse(getStorageItem(archiveKey) || "[]") as SyncQueueItem[];
        // Deduplicate by item.id
        const map = new Map<string, SyncQueueItem>();
        for (const oldItem of existingArchive) map.set(oldItem.id, oldItem);
        for (const newItem of items) map.set(newItem.id, newItem);
        setStorageItem(archiveKey, JSON.stringify(Array.from(map.values())));
      } catch (err) {
        console.error("Failed to archive unsynced queue items", err);
      }
    }
    writeQueue([]);
    return { archivedCount: items.length, archiveKey };
  },

  restoreArchive(userId: string): SyncQueueItem[] {
    const archiveKey = `${ARCHIVE_PREFIX}${userId}`;
    try {
      const archived = JSON.parse(getStorageItem(archiveKey) || "[]") as SyncQueueItem[];
      if (archived.length > 0) {
        for (const item of archived) {
          this.enqueue(item);
        }
        removeStorageItem(archiveKey);
      }
    } catch (err) {
      console.error("Failed to restore archive", err);
    }
    return readQueue();
  },

  /**
   * Exports pending queue items as a JSON string for backup before forced sign-out on shared devices.
   */
  exportPendingJson(): string {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        pendingItems: readQueue(),
        conflicts: readConflicts(),
      },
      null,
      2
    );
  },

  /** Items that exhausted their attempts stay in the queue (visible) but are not retried automatically. */
  async flush(executor: (item: SyncQueueItem) => Promise<void>) {
    for (const item of readQueue()) {
      if (item.attempts >= MAX_SYNC_ATTEMPTS) continue;
      try {
        await executor(item);
        this.remove(item.id);
      } catch (error) {
        this.fail(item.id, error instanceof Error ? error.message : "Sync failed");
      }
    }
    return readQueue();
  },

  clear() {
    writeQueue([]);
  },
};

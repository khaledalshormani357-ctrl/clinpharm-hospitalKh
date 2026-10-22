import { describe, it, expect, beforeEach, vi } from "vitest";

const { mockSupabase } = vi.hoisted(() => ({
  mockSupabase: {
    auth: {
      signUp: vi.fn(async () => ({ data: { user: { id: "new-user" } }, error: null })),
      signInWithPassword: vi.fn(async () => ({
        data: { user: { id: "restored-user" }, session: { user: { id: "restored-user" } } },
        error: null,
      })),
      signOut: vi.fn(async () => ({ error: null })),
      resetPasswordForEmail: vi.fn(async () => ({ data: {}, error: null })),
      getSession: vi.fn(async () => ({
        data: { session: { user: { id: "restored-user" } } },
        error: null,
      })),
    },
  },
}));

vi.mock("./supabase/client", () => ({ supabase: mockSupabase }));

import { authService, hasRestoredSession, resetPasswordRedirect } from "./supabase/auth";
import { syncQueue } from "./supabase/syncQueue";

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

describe("Supabase auth flow helpers & Safe Sign-Out Safeguards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (typeof localStorage.clear === "function") localStorage.clear();
    syncQueue.clear();
  });

  it("recognizes a restored session only when a user id exists", () => {
    expect(hasRestoredSession({ user: { id: "user-1" } })).toBe(true);
    expect(hasRestoredSession(null)).toBe(false);
    expect(hasRestoredSession({ user: {} })).toBe(false);
  });

  it("builds a deterministic reset-password redirect", () => {
    expect(resetPasswordRedirect("https://clinpharm.example")).toBe(
      "https://clinpharm.example/reset-password"
    );
  });

  it("rejects short passwords before calling Supabase", async () => {
    await expect(authService.signUp("a@b.co", "short")).rejects.toThrow(/at least 12/);
    expect(mockSupabase.auth.signUp).not.toHaveBeenCalled();
  });

  it("calls the real Auth session and reset-password methods", async () => {
    const sessionResult = await authService.getSession();
    expect(sessionResult?.data.session?.user.id).toBe("restored-user");
    await authService.resetPassword("pharmacist@example.com");
    expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "pharmacist@example.com",
      { redirectTo: "http://localhost:3000/reset-password" }
    );
  });

  it("blocks silent data loss on signOut when pending operations exist", async () => {
    syncQueue.enqueue({
      id: "case-999",
      entityId: "999",
      operation: "create",
      table: "clinical_cases",
      payload: { id: "999", title: "Unsynced ICU Assessment" },
    });

    expect(syncQueue.hasPendingSync()).toBe(true);

    // Call signOut without force
    const result = await authService.signOut({ force: false });

    // Should indicate pending operations and require explicit confirmation
    expect(result.hasPending).toBe(true);
    expect(result.pendingCount).toBe(1);
    expect(result.requiresConfirmation).toBe(true);

    // Queue must NOT have been silently wiped
    expect(syncQueue.list()).toHaveLength(1);
    expect(mockSupabase.auth.signOut).not.toHaveBeenCalled();
  });

  it("safely archives pending items and restores them upon re-authentication", async () => {
    syncQueue.enqueue({
      id: "case-888",
      entityId: "888",
      operation: "create",
      table: "clinical_cases",
      payload: { id: "888", title: "Emergency Medication Order" },
    });

    // Forced signOut with default archivePending=true
    const result = await authService.signOut({ force: true, archivePending: true });

    expect(result.hasPending).toBe(false);
    expect(syncQueue.list()).toHaveLength(0);
    expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);

    // Sign back in as restored-user -> should restore the archived queue item
    await authService.signIn("pharmacist@example.com", "ValidPass12345!");
    expect(syncQueue.list()).toHaveLength(1);
    expect(syncQueue.list()[0].payload.title).toBe("Emergency Medication Order");
  });
});

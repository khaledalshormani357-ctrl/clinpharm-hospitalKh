import { supabase } from "./client";
import { syncQueue } from "./syncQueue";
import { purgeLocalClinicalData } from "./localCache";

export const MIN_PASSWORD_LENGTH = 12;

export function resetPasswordRedirect(origin: string) {
  return `${origin}/reset-password`;
}

export function hasRestoredSession(
  session: { user?: { id?: string } } | null | undefined
) {
  return Boolean(session?.user?.id);
}

export interface SignOutOptions {
  force?: boolean;
  archivePending?: boolean;
}

export const authService = {
  async signUp(email: string, password: string, displayName?: string) {
    if (!supabase) throw new Error("Supabase is not configured");
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: displayName } },
    });
  },

  async signIn(email: string, password: string) {
    if (!supabase) throw new Error("Supabase is not configured");
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.data?.user?.id) {
      // Restore any archived unsynced items from previous sessions of this user
      syncQueue.restoreArchive(res.data.user.id);
    }
    return res;
  },

  /**
   * Safe Sign-Out Policy:
   * 1. Checks if unsynced clinical items exist in syncQueue.
   * 2. If pending items exist and `force` is not true, intercepts sign-out and returns
   *    `{ hasPending: true, pendingCount, requiresConfirmation: true }` so the UI can warn the user,
   *    attempt sync first, or export/archive safely.
   * 3. When proceeding with sign-out, archives pending items into a user-isolated compartment
   *    (`clinpharm-unsynced-archive-${userId}`) before invoking `purgeLocalClinicalData()`,
   *    protecting shared devices while preventing silent data destruction.
   */
  async signOut(options: SignOutOptions = {}) {
    const hasPending = syncQueue.hasPendingSync() || syncQueue.list().length > 0;
    if (hasPending && !options.force) {
      return {
        error: null,
        hasPending: true,
        pendingCount: syncQueue.list().length,
        requiresConfirmation: true,
      };
    }

    let userId: string | undefined = undefined;
    if (supabase) {
      try {
        const { data } = await supabase.auth.getSession();
        userId = data?.session?.user?.id;
      } catch {
        // Ignore session fetch error during offline sign-out
      }
    }

    try {
      if (options.archivePending ?? true) {
        syncQueue.archiveAndClear(userId || "offline-user");
      } else {
        syncQueue.clear();
      }
      if (!supabase) return { error: null, hasPending: false };
      const res = await supabase.auth.signOut();
      return { ...res, hasPending: false };
    } finally {
      purgeLocalClinicalData();
    }
  },

  async resetPassword(email: string) {
    if (!supabase) throw new Error("Supabase is not configured");
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordRedirect(origin),
    });
  },

  getSession() {
    return supabase?.auth.getSession();
  },
};

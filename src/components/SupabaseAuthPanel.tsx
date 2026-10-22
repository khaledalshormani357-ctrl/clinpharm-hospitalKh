import { useEffect, useState } from "react";
import { AlertTriangle, Download, LogIn, LogOut, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";
import { queueItemStatus, syncQueue } from "@/lib/supabase/syncQueue";
import type { ConflictRecord, SyncQueueItem } from "@/lib/supabase/types";

export function SupabaseAuthPanel({
  syncState,
  onRetry,
}: {
  syncState: "synced" | "pending" | "failed" | "conflict";
  onRetry?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [queueItems, setQueueItems] = useState<SyncQueueItem[]>(() => syncQueue.list());
  const [conflicts, setConflicts] = useState<ConflictRecord[]>(() =>
    syncQueue.conflicts.list()
  );
  const [signOutWarning, setSignOutWarning] = useState<{
    pendingCount: number;
  } | null>(null);

  const refreshQueue = () => {
    setQueueItems(syncQueue.list());
    setConflicts(syncQueue.conflicts.list());
  };

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth
      .getSession()
      .then(({ data }) => setSessionEmail(data.session?.user.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSessionEmail(nextSession?.user.email ?? null);
      refreshQueue();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async () => {
    setBusy(true);
    setMessage("");
    try {
      const result =
        mode === "signIn"
          ? await authService.signIn(email, password)
          : await authService.signUp(email, password);
      if (result.error) throw result.error;
      refreshQueue();
      setMessage(
        mode === "signIn"
          ? "Signed in; cloud sync is available."
          : "Account created. Check your email if confirmation is enabled."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const handleSignOutClick = async () => {
    const res = await authService.signOut({ force: false });
    if (res.requiresConfirmation) {
      setSignOutWarning({ pendingCount: res.pendingCount || syncQueue.list().length });
      return;
    }
    setSignOutWarning(null);
    refreshQueue();
  };

  const handleExportBeforeSignOut = () => {
    const json = syncQueue.exportPendingJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clinpharm-unsynced-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const queuePanel = (queueItems.length > 0 || conflicts.length > 0) && (
    <div className="mt-3 space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
      {queueItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-amber-900">Sync recovery queue</p>
            <span className="text-[10px] font-bold text-amber-800">
              {queueItems.length} item{queueItems.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-2 space-y-2">
            {queueItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-white/70 p-2 text-[10px] text-amber-900"
              >
                <span className="min-w-0 truncate">
                  <b>{item.table}</b> · {item.operation} ·{" "}
                  <strong
                    className={
                      queueItemStatus(item) === "conflict"
                        ? "text-violet-700"
                        : queueItemStatus(item) === "failed"
                        ? "text-rose-700"
                        : "text-amber-800"
                    }
                  >
                    {queueItemStatus(item) === "conflict"
                      ? "conflict — choose recovery"
                      : queueItemStatus(item)}
                  </strong>
                  {item.attempts > 0 ? ` · ${item.attempts} attempts` : ""}
                </span>
                <span className="flex shrink-0 gap-1">
                  <button
                    onClick={() => {
                      syncQueue.resetAttempts(item.id);
                      onRetry?.();
                      refreshQueue();
                    }}
                    className="font-bold underline"
                    aria-label={`Recover ${item.table} ${item.operation}`}
                  >
                    {queueItemStatus(item) === "conflict" ? "Recover" : "Retry"}
                  </button>
                  <button
                    onClick={() => {
                      syncQueue.remove(item.id);
                      refreshQueue();
                    }}
                    className="text-slate-500 underline"
                    aria-label={`Dismiss ${item.table} ${item.operation}`}
                  >
                    Dismiss
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {conflicts.length > 0 && (
        <div className="border-t border-amber-200/70 pt-2">
          <p className="text-xs font-bold text-violet-900">
            Unresolved version conflicts ({conflicts.length})
          </p>
          <div className="mt-1.5 space-y-1.5">
            {conflicts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-violet-50 p-2 text-[10px] text-violet-950"
              >
                <span className="truncate">
                  <b>{c.table}</b> ({c.entityId}) · {c.reason.replace("_", " ")}
                </span>
                <button
                  onClick={() => {
                    syncQueue.conflicts.resolve(c.id);
                    refreshQueue();
                  }}
                  className="font-bold text-violet-700 underline"
                >
                  Mark resolved
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const signOutConfirmModal = signOutWarning && (
    <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
        <div className="flex-1">
          <p className="font-bold">
            Unsynchronized clinical changes ({signOutWarning.pendingCount})
          </p>
          <p className="mt-1 text-[11px] leading-4 text-rose-800">
            Signing out on a shared device clears the active cache. Choose how to handle
            your pending offline changes:
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                onRetry?.();
                refreshQueue();
              }}
              className="h-7 bg-white text-[11px]"
            >
              <RefreshCw className="mr-1 h-3 w-3" /> Sync now
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportBeforeSignOut}
              className="h-7 bg-white text-[11px]"
            >
              <Download className="mr-1 h-3 w-3" /> Export backup
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                await authService.signOut({ force: true, archivePending: true });
                setSignOutWarning(null);
                refreshQueue();
              }}
              className="h-7 bg-teal-700 text-[11px] text-white"
            >
              Archive for my account &amp; sign out
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                await authService.signOut({ force: true, archivePending: false });
                setSignOutWarning(null);
                refreshQueue();
              }}
              className="h-7 bg-rose-600 text-[11px] text-white"
            >
              <Trash2 className="mr-1 h-3 w-3" /> Discard &amp; wipe
            </Button>
            <button
              onClick={() => setSignOutWarning(null)}
              className="px-2 text-[11px] font-semibold text-slate-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (sessionEmail)
    return (
      <div>
        <div className="flex items-center gap-2 rounded-xl border border-[#cfe5df] bg-[#eaf7f2] px-3 py-2 text-xs text-teal-900">
          <ShieldCheck className="h-4 w-4 text-teal-700" />
          <span className="max-w-[180px] truncate font-semibold">{sessionEmail}</span>
          <Button
            onClick={() => void handleSignOutClick()}
            variant="ghost"
            size="sm"
            className="h-7 rounded-lg px-2 text-teal-800"
            aria-label="Sign out from Supabase"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
          {syncState === "failed" && (
            <Button
              onClick={() => {
                onRetry?.();
                refreshQueue();
              }}
              variant="ghost"
              size="sm"
              className="h-7 rounded-lg px-2 text-rose-700"
              aria-label="Retry cloud sync"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        {signOutConfirmModal}
        {queuePanel}
      </div>
    );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-800">Cloud account</p>
          <p className="mt-1 text-xs text-slate-500">
            Sign in to enable Supabase sync.
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
            syncState === "failed"
              ? "bg-rose-100 text-rose-700"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {syncState === "failed" ? "Retry needed" : "Local cache"}
        </span>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Supabase email"
        />
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={
            mode === "signUp" ? "Password (min 12 characters)" : "Password"
          }
          autoComplete={mode === "signUp" ? "new-password" : "current-password"}
          aria-label="Supabase password"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {syncState === "failed" && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="h-9 rounded-lg text-xs"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Retry sync
          </Button>
        )}
        <Button
          disabled={busy || !email || !password}
          onClick={submit}
          className="h-9 rounded-lg bg-[#102b2c] text-xs text-white"
        >
          <LogIn className="mr-1.5 h-3.5 w-3.5" />
          {mode === "signIn" ? "Sign in" : "Create account"}
        </Button>
        <button
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          className="text-xs font-semibold text-teal-700"
        >
          {mode === "signIn" ? "Create account" : "Use existing account"}
        </button>
        <button
          disabled={!email}
          onClick={() =>
            void authService
              .resetPassword(email)
              .then(({ error }) =>
                setMessage(error ? error.message : "Reset email requested.")
              )
              .catch((error: unknown) =>
                setMessage(error instanceof Error ? error.message : "Reset failed")
              )
          }
          className="text-xs text-slate-500 disabled:opacity-40"
        >
          Reset password
        </button>
      </div>
      {message && <p className="mt-3 text-xs leading-5 text-slate-500">{message}</p>}
      {signOutConfirmModal}
      {queuePanel}
    </div>
  );
}

export default SupabaseAuthPanel;

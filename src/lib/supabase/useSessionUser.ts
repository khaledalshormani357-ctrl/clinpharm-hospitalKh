import { useEffect, useState } from "react";
import { supabase } from "./client";

export type SessionUser = { id: string; email: string | null; name: string };

function toUser(
  session:
    | {
        user?: {
          id: string;
          email?: string | null;
          user_metadata?: Record<string, unknown>;
        };
      }
    | null
    | undefined
): SessionUser | null {
  const user = session?.user;
  if (!user) return null;
  const fullName =
    typeof user.user_metadata?.full_name === "string"
      ? (user.user_metadata.full_name as string)
      : "";
  const email = user.email ?? null;
  return {
    id: user.id,
    email,
    name: fullName.trim() || email?.split("@")[0] || "Clinician",
  };
}

/** Supabase-session based identity (replaces the legacy OAuth/tRPC `useAuth` for the UI). */
export function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(toUser(data.session));
        setLoading(false);
      }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(toUser(session));
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

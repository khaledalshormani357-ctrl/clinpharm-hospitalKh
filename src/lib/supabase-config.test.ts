import { describe, expect, it } from "vitest";

// Live check: runs only when the public Supabase env is provided (never required for unit tests).
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const anonKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

describe.skipIf(!url || !anonKey)("Supabase configuration (live)", () => {
  it("has a valid public project configuration and is reachable", async () => {
    expect(url).toMatch(/^https:\/\/[a-z0-9]+\.supabase\.co$/);
    expect(anonKey).toMatch(/^sb_publishable_[A-Za-z0-9_-]+$|^eyJ/);
    expect(anonKey).not.toContain("service_role");
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey ?? "" },
    });
    expect(response.ok).toBe(true);
  }, 15000);
});

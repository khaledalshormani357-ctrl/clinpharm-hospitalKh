import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const schema = readFileSync(resolve(process.cwd(), "supabase/schema.sql"), "utf8");
const migration = readFileSync(resolve(process.cwd(), "supabase/migrations/0002_hardening_and_supervision.sql"), "utf8");

describe("Supabase schema safety (static checks)", () => {
  it("enables RLS and owner isolation for private clinical tables", () => {
    for (const table of ["clinical_patients", "clinical_cases", "clinical_interventions", "medication_reviews", "supervision_links", "supervisor_feedback", "audit_log"]) {
      expect(schema).toContain(`alter table public.${table} enable row level security`);
    }
    expect(schema).toContain("auth.uid() = owner_id");
    expect(schema).not.toMatch(/service[_-]?role['"]?\s*key/i);
  });

  it("prevents users from promoting their own role", () => {
    expect(schema).toContain("profiles_prevent_role_escalation");
    expect(schema).toContain("role = 'clinical_pharmacist'");
  });

  it("keeps guidelines private to signed-in users and admin-writable", () => {
    expect(schema).toContain('create policy "guidelines are shared readable" on public.guidelines for select to authenticated');
    expect(schema).toContain("guidelines admin write");
  });

  it("never exposes patient identifiers to supervisors", () => {
    expect(schema).not.toMatch(/on public\.clinical_patients for select using \(public\.is_active_supervisor_of/);
  });

  it("keeps the migration and the full schema in sync", () => {
    expect(schema).toContain(migration.trim());
  });
});

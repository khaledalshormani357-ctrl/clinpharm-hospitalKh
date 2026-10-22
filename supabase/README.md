# ClinPharm Hospital Supabase setup

The app now uses a **Cloud First + Local Cache** data layer. The public client uses `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (the legacy `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` names still work); no Service Role Key is accepted or required by the client.

## Manual Supabase step

Open the Supabase SQL Editor and run [`schema.sql`](./schema.sql). This creates the private clinical tables, indexes, ownership constraints, RLS policies, and the profile trigger for new Auth users. The project cannot create these tables through the anon key because that would weaken the security boundary.

## Authentication

Enable Email provider in Supabase Authentication settings. The UI supports sign in, sign up, persisted sessions, sign out, and password-reset email requests. Supabase Auth owns passwords and sessions; the application does not store passwords.

## Data flow

When a Supabase Auth session exists, patient reads and writes use Supabase and are isolated by `auth.uid() = owner_id`. When offline or signed out, the existing local cache remains available. New local records enter `syncQueue`; on reconnection or session restoration, queued create/update/delete operations are retried. Duplicate queue entries are rejected by operation id, and conflicts use the most recently updated record.

## Migration

On the first successful session for a user, the hook checks the legacy `clinpharm-patient-drafts` cache. If the cloud table is empty, it attempts an idempotent upload and stores a per-user migration marker. Invalid or duplicate records remain in the local cache for review instead of being deleted.

## Storage

No Supabase Storage bucket is created because the current UI does not persist PDF, image, certificate, or clinical-document attachments. Add a private bucket and owner-scoped policies before introducing such a workflow.


## Hardening + supervision (migration 0002)

`migrations/0002_hardening_and_supervision.sql` is idempotent and is already appended to `schema.sql`. It adds: role-escalation protection, authenticated-only guidelines (admin-writable), server-side `updated_at`, trainer↔student `supervision_links` (consent based) with read-only supervisor policies and `supervisor_feedback`, an `audit_log` (ids and operations only), and revokes all anon privileges on clinical tables. Run it on a staging project first, then `verify.sql`.

Promote a trainer or admin from the SQL editor only, e.g. `update public.profiles set role = 'supervisor' where id = '<uuid>';`.

## Local cache

Patients and the sync queue are cached in `localStorage` for offline use. The cache is wiped on sign-out and when a different user signs in. Conflicts use last-writer-wins on the server-set `updated_at`; items that fail 5 times stay visible in the recovery panel until retried or dismissed.

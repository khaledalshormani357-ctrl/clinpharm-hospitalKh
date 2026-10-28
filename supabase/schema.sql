-- ClinPharm Hospital Supabase schema
-- Run this migration in Supabase SQL Editor before enabling cloud writes.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'clinical_pharmacist' check (role in ('admin','clinical_pharmacist','pharmacy_student','supervisor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clinical_patients (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  initials text not null check (char_length(initials) between 1 and 8),
  name text not null,
  ward text not null default 'Unassigned',
  issue text not null default 'New clinical assessment',
  status text not null default 'Needs review',
  color text not null default 'bg-teal-100 text-teal-700',
  sync_state text not null default 'synced' check (sync_state in ('synced','pending','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clinical_cases (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id text references public.clinical_patients(id) on delete set null,
  title text not null,
  current_step integer not null default 0 check (current_step between 0 and 9),
  source_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.medication_reviews (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id text references public.clinical_patients(id) on delete set null,
  indication text not null,
  effectiveness text,
  safety text,
  status text not null default 'draft' check (status in ('draft','submitted','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clinical_interventions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id text references public.clinical_patients(id) on delete set null,
  intervention_type text not null,
  soap_note text,
  evidence_url text,
  evidence_level text,
  status text not null default 'draft' check (status in ('draft','submitted','accepted','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.guidelines (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  title text not null,
  year integer,
  tier text not null check (tier in ('Tier 1','Tier 2','Tier 3')),
  source_url text not null,
  status text not null default 'CURRENT',
  created_at timestamptz not null default now()
);

create table if not exists public.sync_queue (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  operation text not null check (operation in ('create','update','delete')),
  table_name text not null,
  payload jsonb not null,
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now()
);

create index if not exists clinical_patients_owner_updated_idx on public.clinical_patients(owner_id, updated_at desc);
create index if not exists clinical_cases_owner_updated_idx on public.clinical_cases(owner_id, updated_at desc);
create index if not exists clinical_interventions_owner_created_idx on public.clinical_interventions(owner_id, created_at desc);
create index if not exists medication_reviews_owner_updated_idx on public.medication_reviews(owner_id, updated_at desc);

alter table public.profiles enable row level security;
alter table public.clinical_patients enable row level security;
alter table public.clinical_cases enable row level security;
alter table public.clinical_interventions enable row level security;
alter table public.medication_reviews enable row level security;
alter table public.guidelines enable row level security;
alter table public.sync_queue enable row level security;

drop policy if exists "profiles are owner readable" on public.profiles;
create policy "profiles are owner readable" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles are owner writable" on public.profiles;
create policy "profiles are owner writable" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles are owner editable" on public.profiles;
create policy "profiles are owner editable" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "patients are owner isolated" on public.clinical_patients;
create policy "patients are owner isolated" on public.clinical_patients for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "cases are owner isolated" on public.clinical_cases;
create policy "cases are owner isolated" on public.clinical_cases for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "interventions are owner isolated" on public.clinical_interventions;
create policy "interventions are owner isolated" on public.clinical_interventions for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "medication reviews are owner isolated" on public.medication_reviews;
create policy "medication reviews are owner isolated" on public.medication_reviews for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "guidelines are shared readable" on public.guidelines;
create policy "guidelines are shared readable" on public.guidelines for select using (true);
drop policy if exists "sync queue is owner isolated" on public.sync_queue;
create policy "sync queue is owner isolated" on public.sync_queue for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- =============================================================================
-- Hardening + trainer/student supervision (idempotent: safe to run more than once)
-- Review in a STAGING Supabase project first, then run supabase/verify.sql.
-- =============================================================================

-- 1) Stop privilege escalation: a user could previously UPDATE their own profile
--    and set role = 'admin'. Role changes are now limited to the SQL editor /
--    service role.
create or replace function public.prevent_role_self_escalation() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.role is distinct from old.role and current_user not in ('postgres', 'supabase_admin', 'service_role') then
    raise exception 'Changing a profile role requires an administrator';
  end if;
  return new;
end;
$$;
drop trigger if exists profiles_prevent_role_escalation on public.profiles;
create trigger profiles_prevent_role_escalation before update on public.profiles
  for each row execute function public.prevent_role_self_escalation();

drop policy if exists "profiles are owner writable" on public.profiles;
create policy "profiles are owner writable" on public.profiles for insert
  with check (auth.uid() = id and role = 'clinical_pharmacist');

-- 2) Invite code a student shares with the trainer (no email lookup needed).
alter table public.profiles add column if not exists invite_code text unique default substr(md5(gen_random_uuid()::text), 1, 8);
update public.profiles set invite_code = substr(md5(gen_random_uuid()::text), 1, 8) where invite_code is null;
alter table public.profiles drop constraint if exists profiles_invite_code_len;
alter table public.profiles add constraint profiles_invite_code_len check (invite_code is null or char_length(invite_code) between 6 and 16);

-- 3) Server-side updated_at (client clocks are not trusted).
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
do $$
declare t text;
begin
  foreach t in array array['profiles', 'clinical_patients', 'clinical_cases', 'medication_reviews', 'clinical_interventions'] loop
    execute format('drop trigger if exists %I on public.%I', t || '_set_updated_at', t);
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()', t || '_set_updated_at', t);
  end loop;
end $$;

-- 4) Copilot answers (allergies, therapy, DRPs ...) are stored with the case. No names.
alter table public.clinical_cases add column if not exists data jsonb not null default '{}'::jsonb;

-- 5) Guidelines: authenticated read; only admins write.
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;
drop policy if exists "guidelines are shared readable" on public.guidelines;
create policy "guidelines are shared readable" on public.guidelines for select to authenticated using (true);
drop policy if exists "guidelines admin write" on public.guidelines;
create policy "guidelines admin write" on public.guidelines for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 6) Defense in depth: the anonymous role never touches clinical tables.
revoke all on public.profiles, public.clinical_patients, public.clinical_cases, public.medication_reviews, public.clinical_interventions, public.guidelines, public.sync_queue from anon;

-- 7) Missing FK indexes.
create index if not exists clinical_cases_patient_idx on public.clinical_cases(patient_id);
create index if not exists medication_reviews_patient_idx on public.medication_reviews(patient_id);
create index if not exists clinical_interventions_patient_idx on public.clinical_interventions(patient_id);

-- 8) Trainer <-> student supervision (consent based).
create table if not exists public.supervision_links (
  id uuid primary key default gen_random_uuid(),
  supervisor_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'revoked')),
  requested_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (supervisor_id, student_id),
  check (supervisor_id <> student_id)
);
alter table public.supervision_links enable row level security;
revoke all on public.supervision_links from anon;

drop policy if exists "links visible to both parties" on public.supervision_links;
create policy "links visible to both parties" on public.supervision_links for select using (auth.uid() in (supervisor_id, student_id));
drop policy if exists "student responds to link" on public.supervision_links;
create policy "student responds to link" on public.supervision_links for update
  using (auth.uid() = student_id) with check (auth.uid() = student_id and status in ('active', 'revoked'));
drop policy if exists "supervisor revokes link" on public.supervision_links;
create policy "supervisor revokes link" on public.supervision_links for update
  using (auth.uid() = supervisor_id) with check (auth.uid() = supervisor_id and status = 'revoked');

create or replace function public.prevent_link_identity_change() returns trigger language plpgsql as $$
begin
  if new.supervisor_id <> old.supervisor_id or new.student_id <> old.student_id or new.requested_by <> old.requested_by then
    raise exception 'supervision link participants cannot be changed';
  end if;
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists supervision_links_guard on public.supervision_links;
create trigger supervision_links_guard before update on public.supervision_links
  for each row execute function public.prevent_link_identity_change();

-- A trainer requests supervision with the student's invite code (creates a PENDING link).
create or replace function public.request_supervision(student_code text) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  my_role text;
  target uuid;
  link uuid;
begin
  if me is null then raise exception 'not authenticated'; end if;
  select role into my_role from public.profiles where id = me;
  if my_role is null or my_role = 'pharmacy_student' then raise exception 'only trainers can request supervision'; end if;
  select id into target from public.profiles where invite_code = lower(trim(student_code)) and id <> me;
  if target is null then raise exception 'invalid invite code'; end if;
  insert into public.supervision_links (supervisor_id, student_id, requested_by)
    values (me, target, me)
    on conflict (supervisor_id, student_id) do update set status = 'pending', requested_by = me
      where public.supervision_links.status = 'revoked'
    returning id into link;
  if link is null then
    select id into link from public.supervision_links where supervisor_id = me and student_id = target;
  end if;
  return link;
end;
$$;
revoke all on function public.request_supervision(text) from public, anon;
grant execute on function public.request_supervision(text) to authenticated;

create or replace function public.supervised_students() returns table (link_id uuid, student_id uuid, display_name text, status text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select l.id, l.student_id, p.display_name, l.status, l.created_at
  from public.supervision_links l join public.profiles p on p.id = l.student_id
  where l.supervisor_id = auth.uid() order by l.created_at desc;
$$;
create or replace function public.my_supervisors() returns table (link_id uuid, supervisor_id uuid, display_name text, status text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select l.id, l.supervisor_id, p.display_name, l.status, l.created_at
  from public.supervision_links l join public.profiles p on p.id = l.supervisor_id
  where l.student_id = auth.uid() order by l.created_at desc;
$$;
revoke all on function public.supervised_students(), public.my_supervisors() from public, anon;
grant execute on function public.supervised_students(), public.my_supervisors() to authenticated;

create or replace function public.is_active_supervisor_of(student uuid) returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.supervision_links l where l.supervisor_id = auth.uid() and l.student_id = student and l.status = 'active');
$$;

-- Supervisors get READ-ONLY access to a linked student's training records.
-- Patient identifiers (clinical_patients) are intentionally NOT shared.
drop policy if exists "supervisors read linked cases" on public.clinical_cases;
create policy "supervisors read linked cases" on public.clinical_cases for select using (public.is_active_supervisor_of(owner_id));
drop policy if exists "supervisors read linked interventions" on public.clinical_interventions;
create policy "supervisors read linked interventions" on public.clinical_interventions for select using (public.is_active_supervisor_of(owner_id));
drop policy if exists "supervisors read linked reviews" on public.medication_reviews;
create policy "supervisors read linked reviews" on public.medication_reviews for select using (public.is_active_supervisor_of(owner_id));

create table if not exists public.supervisor_feedback (
  id uuid primary key default gen_random_uuid(),
  supervisor_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null default 'general' check (entity_type in ('case', 'intervention', 'medication_review', 'general')),
  entity_id uuid,
  comment text not null check (char_length(comment) between 1 and 2000),
  competency text check (competency in ('not_yet', 'developing', 'competent', 'excellent')),
  created_at timestamptz not null default now()
);
create index if not exists supervisor_feedback_student_idx on public.supervisor_feedback(student_id, created_at desc);
alter table public.supervisor_feedback enable row level security;
revoke all on public.supervisor_feedback from anon;
drop policy if exists "feedback visible to both parties" on public.supervisor_feedback;
create policy "feedback visible to both parties" on public.supervisor_feedback for select using (auth.uid() in (supervisor_id, student_id));
drop policy if exists "supervisor writes feedback" on public.supervisor_feedback;
create policy "supervisor writes feedback" on public.supervisor_feedback for insert
  with check (supervisor_id = auth.uid() and public.is_active_supervisor_of(student_id));
drop policy if exists "supervisor deletes own feedback" on public.supervisor_feedback;
create policy "supervisor deletes own feedback" on public.supervisor_feedback for delete using (supervisor_id = auth.uid());

-- 9) Audit trail (who did what, when). Stores ids and operations only — never clinical content.
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  table_name text not null,
  row_id text,
  operation text not null,
  at timestamptz not null default now()
);
alter table public.audit_log enable row level security;
revoke all on public.audit_log from anon;
drop policy if exists "users read own audit rows" on public.audit_log;
create policy "users read own audit rows" on public.audit_log for select using (actor_id = auth.uid());

create or replace function public.log_row_change() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.audit_log (actor_id, table_name, row_id, operation)
  values (auth.uid(), tg_table_name, to_jsonb(coalesce(new, old)) ->> 'id', tg_op);
  return coalesce(new, old);
end;
$$;
do $$
declare t text;
begin
  foreach t in array array['clinical_patients', 'clinical_cases', 'medication_reviews', 'clinical_interventions', 'supervision_links', 'supervisor_feedback'] loop
    execute format('drop trigger if exists %I on public.%I', t || '_audit', t);
    execute format('create trigger %I after insert or update or delete on public.%I for each row execute function public.log_row_change()', t || '_audit', t);
  end loop;
end $$;

comment on table public.sync_queue is 'Unused: the offline queue lives on the client. Safe to drop once confirmed.';

-- =============================================================================
-- Migration 0003: Medical Books Full PDF Ingestion, Verification, Extraction & Audit Schema
-- Safe additive migration: does not drop or alter existing clinical or profile tables.
-- =============================================================================

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  book_id text not null unique,
  owner_id uuid references auth.users(id) on delete set null,
  source_type text not null check (source_type in ('google_drive_pdf', 'local_file_pdf', 'embedded_synthetic', 'unverified_legacy')),
  source_file_name text not null,
  display_title text not null,
  drive_file_id text,
  mime_type text not null default 'application/pdf',
  original_file_size bigint not null default 0 check (original_file_size >= 0),
  sha256 text not null,
  original_page_count integer not null default 0 check (original_page_count >= 0),
  processed_page_count integer not null default 0 check (processed_page_count >= 0),
  extracted_text_page_count integer not null default 0 check (extracted_text_page_count >= 0),
  ocr_page_count integer not null default 0 check (ocr_page_count >= 0),
  unprocessed_page_count integer not null default 0 check (unprocessed_page_count >= 0),
  blank_page_count integer not null default 0 check (blank_page_count >= 0),
  processing_status text not null default 'not_imported' check (
    processing_status in (
      'not_imported',
      'downloading',
      'extracting',
      'needs_ocr',
      'verified_complete',
      'partially_complete',
      'failed',
      'embedded_summary'
    )
  ),
  processing_version text not null default '2.0.0',
  storage_bucket_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_chapters (
  id text primary key,
  book_id text not null references public.books(book_id) on delete cascade,
  parent_chapter_id text references public.book_chapters(id) on delete set null,
  chapter_number integer not null default 1,
  title text not null,
  title_ar text,
  start_page integer not null check (start_page >= 1),
  end_page integer not null check (end_page >= start_page),
  hierarchy_level integer not null default 1 check (hierarchy_level >= 1),
  created_at timestamptz not null default now()
);

create table if not exists public.book_pages (
  id text primary key,
  book_id text not null references public.books(book_id) on delete cascade,
  chapter_id text references public.book_chapters(id) on delete set null,
  original_page_number integer not null check (original_page_number >= 1),
  extracted_text text not null default '',
  ocr_text text,
  extraction_method text not null default 'unprocessed' check (
    extraction_method in ('native_text', 'ocr', 'blank', 'unprocessed')
  ),
  extraction_status text not null default 'needs_ocr' check (
    extraction_status in ('extracted', 'ocr_completed', 'needs_ocr', 'blank', 'failed')
  ),
  ocr_confidence numeric(5,4) check (ocr_confidence is null or (ocr_confidence >= 0 and ocr_confidence <= 1)),
  has_embedded_images boolean not null default false,
  line_count integer not null default 0,
  content_hash text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_id, original_page_number)
);

create table if not exists public.book_sections (
  id text primary key,
  book_id text not null references public.books(book_id) on delete cascade,
  chapter_id text not null references public.book_chapters(id) on delete cascade,
  page_number integer not null check (page_number >= 1),
  section_order integer not null default 1,
  heading text not null,
  heading_ar text,
  full_text text not null default '',
  extraction_method text not null default 'native_text' check (
    extraction_method in ('native_text', 'ocr', 'blank', 'unprocessed')
  ),
  content_hash text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.book_tables (
  id text primary key,
  book_id text not null references public.books(book_id) on delete cascade,
  chapter_id text references public.book_chapters(id) on delete set null,
  page_number integer not null check (page_number >= 1),
  caption text not null,
  caption_ar text,
  headers jsonb not null default '[]'::jsonb,
  rows jsonb not null default '[]'::jsonb,
  units_and_footnotes text,
  raw_text text not null default '',
  structured_data jsonb not null default '{}'::jsonb,
  extraction_status text not null default 'structured' check (
    extraction_status in ('structured', 'needs_review')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.book_import_jobs (
  id text primary key,
  book_id text not null,
  owner_id uuid references auth.users(id) on delete set null,
  source_file_name text not null,
  source_type text not null check (source_type in ('google_drive_pdf', 'local_file_pdf', 'embedded_synthetic', 'unverified_legacy')),
  file_size bigint not null default 0,
  sha256 text not null default '',
  job_status text not null check (
    job_status in (
      'not_imported',
      'downloading',
      'extracting',
      'needs_ocr',
      'verified_complete',
      'partially_complete',
      'failed',
      'embedded_summary'
    )
  ),
  current_stage text not null default 'registered',
  last_processed_page integer not null default 0,
  original_page_count integer not null default 0,
  processed_page_count integer not null default 0,
  extracted_text_page_count integer not null default 0,
  ocr_page_count integer not null default 0,
  unprocessed_page_count integer not null default 0,
  blank_page_count integer not null default 0,
  sections_saved_count integer not null default 0,
  tables_saved_count integer not null default 0,
  db_save_status text not null default 'pending' check (db_save_status in ('pending', 'saved', 'failed')),
  search_index_status text not null default 'pending' check (search_index_status in ('pending', 'indexed', 'failed')),
  final_verification_status text not null default 'unverified',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  error_code text,
  safe_error_message text,
  warnings jsonb not null default '[]'::jsonb,
  errors jsonb not null default '[]'::jsonb,
  retry_count integer not null default 0
);

create index if not exists books_sha256_idx on public.books(sha256);
create index if not exists books_status_idx on public.books(processing_status);
create index if not exists book_pages_book_page_idx on public.book_pages(book_id, original_page_number);
create index if not exists book_pages_status_idx on public.book_pages(book_id, extraction_status);
create index if not exists book_chapters_book_page_idx on public.book_chapters(book_id, start_page, end_page);
create index if not exists book_sections_book_page_idx on public.book_sections(book_id, page_number);
create index if not exists book_tables_book_page_idx on public.book_tables(book_id, page_number);
create index if not exists book_import_jobs_book_started_idx on public.book_import_jobs(book_id, started_at desc);

alter table public.books enable row level security;
alter table public.book_chapters enable row level security;
alter table public.book_pages enable row level security;
alter table public.book_sections enable row level security;
alter table public.book_tables enable row level security;
alter table public.book_import_jobs enable row level security;

revoke all on public.books, public.book_chapters, public.book_pages, public.book_sections, public.book_tables, public.book_import_jobs from anon;

drop policy if exists "books readable by authenticated" on public.books;
create policy "books readable by authenticated" on public.books for select to authenticated using (true);
drop policy if exists "books writable by admin or owner" on public.books;
create policy "books writable by admin or owner" on public.books for all to authenticated
  using (public.is_admin() or owner_id = auth.uid())
  with check (public.is_admin() or owner_id = auth.uid());

drop policy if exists "book_chapters readable by authenticated" on public.book_chapters;
create policy "book_chapters readable by authenticated" on public.book_chapters for select to authenticated using (true);
drop policy if exists "book_chapters writable by admin" on public.book_chapters;
create policy "book_chapters writable by admin" on public.book_chapters for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "book_pages readable by authenticated" on public.book_pages;
create policy "book_pages readable by authenticated" on public.book_pages for select to authenticated using (true);
drop policy if exists "book_pages writable by admin" on public.book_pages;
create policy "book_pages writable by admin" on public.book_pages for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "book_sections readable by authenticated" on public.book_sections;
create policy "book_sections readable by authenticated" on public.book_sections for select to authenticated using (true);
drop policy if exists "book_sections writable by admin" on public.book_sections;
create policy "book_sections writable by admin" on public.book_sections for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "book_tables readable by authenticated" on public.book_tables;
create policy "book_tables readable by authenticated" on public.book_tables for select to authenticated using (true);
drop policy if exists "book_tables writable by admin" on public.book_tables;
create policy "book_tables writable by admin" on public.book_tables for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "book_import_jobs readable by authenticated" on public.book_import_jobs;
create policy "book_import_jobs readable by authenticated" on public.book_import_jobs for select to authenticated
  using (public.is_admin() or owner_id = auth.uid());
drop policy if exists "book_import_jobs writable by admin or owner" on public.book_import_jobs;
create policy "book_import_jobs writable by admin or owner" on public.book_import_jobs for all to authenticated
  using (public.is_admin() or owner_id = auth.uid())
  with check (public.is_admin() or owner_id = auth.uid());


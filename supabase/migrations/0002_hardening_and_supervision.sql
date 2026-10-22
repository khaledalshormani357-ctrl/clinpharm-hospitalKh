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

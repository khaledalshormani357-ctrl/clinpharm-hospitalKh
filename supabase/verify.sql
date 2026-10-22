-- ClinPharm post-migration verification
-- Read-only checks; safe to run in Supabase SQL Editor.

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('profiles','clinical_patients','clinical_cases','medication_reviews','clinical_interventions','guidelines','sync_queue','supervision_links','supervisor_feedback','audit_log')
order by table_name;

select indexname, tablename
from pg_indexes
where schemaname = 'public'
  and tablename in ('clinical_patients','clinical_cases','clinical_interventions','medication_reviews')
order by tablename, indexname;

select tgname, tgrelid::regclass as table_name
from pg_trigger
where not tgisinternal
  and tgname = 'on_auth_user_created';

select schemaname, tablename, policyname, cmd, permissive
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles','clinical_patients','clinical_cases','medication_reviews','clinical_interventions','guidelines','sync_queue','supervision_links','supervisor_feedback','audit_log')
order by tablename, policyname;

select relname as table_name, relrowsecurity as rls_enabled
from pg_class
join pg_namespace on pg_namespace.oid = pg_class.relnamespace
where nspname = 'public'
  and relname in ('profiles','clinical_patients','clinical_cases','medication_reviews','clinical_interventions','guidelines','sync_queue','supervision_links','supervisor_feedback','audit_log')
order by relname;

-- Hardening checks (expect: 1 row each)
select 'role-escalation trigger present' as check_name, count(*) as found from pg_trigger where tgname = 'profiles_prevent_role_escalation' and not tgisinternal;
select 'audit triggers' as check_name, count(*) as found from pg_trigger where tgname like '%\_audit' and not tgisinternal;
select 'anon has NO privileges on clinical tables (expect 0)' as check_name, count(*) as found
from information_schema.role_table_grants
where grantee = 'anon' and table_schema = 'public'
  and table_name in ('profiles','clinical_patients','clinical_cases','medication_reviews','clinical_interventions','supervision_links','supervisor_feedback','audit_log');

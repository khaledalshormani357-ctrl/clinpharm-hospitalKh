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

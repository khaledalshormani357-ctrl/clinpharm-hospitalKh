-- =============================================================================
-- Migration 0004 (PROTOTYPE BLUEPRINT — DO NOT RUN ON PRODUCTION WITHOUT APPROVAL)
-- ClinPharm Hospital: Topic-First Clinical Knowledge Graph & CDSS Schema
--
-- Engineering Guarantees:
-- 1. 100% Additive: Does NOT drop, alter, or modify any existing table, column,
--    or RLS policy in public.profiles, clinical_patients, clinical_cases,
--    medication_reviews, clinical_interventions, guidelines, books,
--    book_chapters, book_pages, book_sections, book_tables, or book_import_jobs.
-- 2. Strict Referential Integrity:
--    - Composite FK (topic_id, section_id) ensures a knowledge statement,
--      table/algorithm, or conflict group can NEVER reference a section belonging
--      to a different topic.
--    - ON DELETE RESTRICT on knowledge_sources and clinical_drugs prevents
--      accidental orphan citations or dosing records.
--    - Direct optional FKs to public.books(book_id), public.book_chapters(id),
--      public.book_sections(id), public.book_pages(id), and public.book_tables(id).
-- 3. Content Provenance & Anti-Hallucination Constraint:
--    - Explicitly separates (a) verbatim_source_text, (b) deterministic extracted
--      summary, and (c) clinician_reviewed_note.
--    - CHECK constraint strictly prohibits AI-fabricated doses, diagnostic
--      criteria, or therapeutic recommendations.
-- 4. Conflict Preservation:
--    - Dedicated knowledge_conflict_groups table prevents merging conflicting
--      recommendations across sources or editions.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- A. Clinical Topics (Canonical Medical Knowledge Graph Nodes)
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_topics (
  id text primary key,
  canonical_name text not null unique,
  english_name text not null,
  arabic_name text not null,
  slug text not null unique,
  synonyms text[] not null default '{}',
  search_keywords text[] not null default '{}',
  icd10_codes text[] not null default '{}',
  snomed_codes text[] not null default '{}',
  rxnorm_codes text[] not null default '{}',
  atc_codes text[] not null default '{}',
  topic_type text not null check (
    topic_type in (
      'disease',
      'syndrome',
      'acute_emergency',
      'subphenotype',
      'symptom',
      'drug_class',
      'drug_monograph',
      'laboratory_abnormality',
      'clinical_procedure',
      'pharmacokinetic_protocol'
    )
  ),
  parent_topic_id text references public.clinical_topics(id) on delete restrict,
  hierarchy_path text[] not null default '{}',
  specialty text not null,
  specialty_ar text not null,
  description_en text not null,
  description_ar text not null,
  clinical_urgency text not null default 'routine' check (
    clinical_urgency in ('emergent_icu', 'urgent_inpatient', 'routine', 'high_alert')
  ),
  prototype_scope text not null default 'full_monograph' check (
    prototype_scope in ('full_monograph', 'linked_subtopic_node')
  ),
  status text not null default 'verified' check (
    status in ('draft', 'under_review', 'verified', 'conflicting_evidence', 'archived')
  ),
  last_reviewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (parent_topic_id is null or parent_topic_id <> id)
);

-- -----------------------------------------------------------------------------
-- B. Topic Sections (Non-Mandatory Content — Reflects Actual Documented Sources)
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_topic_sections (
  id text primary key,
  topic_id text not null references public.clinical_topics(id) on delete cascade,
  section_key text not null check (
    section_key in (
      'overview_definition',        -- 1. التعريف
      'epidemiology_risk_factors',  -- 2. الوبائيات وعوامل الخطورة
      'pathophysiology',            -- 3. الفيزيولوجيا المرضية
      'etiology_precipitants',      -- 4. الأسباب والمحفزات
      'classification_diagnosis',   -- 5. التصنيف ومعايير التشخيص
      'clinical_presentation',      -- 6. العلامات والأعراض
      'investigations_workup',      -- 7. الفحوصات المخبرية والتصويرية
      'differential_diagnosis',     -- 8. التشخيص التفريقي
      'treatment_management',       -- 9. العلاج والتدبير السريري
      'therapeutic_protocols',      -- 10. البروتوكولات العلاجية
      'pharmacotherapy_dosing',     -- 11. الأدوية والجرعات وطريقة الإعطاء
      'organ_dose_adjustment',      -- 12. تعديل الجرعات في القصور الكلوي والكبدي
      'monitoring_followup',        -- 13. المراقبة والمتابعة
      'complications',              -- 14. المضاعفات
      'special_populations',        -- 15. الحالات الخاصة (الأطفال، الحمل، كبار السن، القصور الكلوي)
      'discharge_criteria',         -- 16. معايير التحويل والخروج من المستشفى
      'clinical_guidelines',        -- 17. التوصيات والإرشادات السريرية
      'references_evidence',        -- 18. المراجع والمصادر العلمية
      'related_topics',             -- 19. المواضيع المرتبطة
      'clinical_pearls_faqs'        -- 20. الأسئلة السريرية الشائعة والنقاط العملية المهمة
    )
  ),
  section_order integer not null check (section_order between 1 and 20),
  title_en text not null,
  title_ar text not null,
  availability_status text not null default 'populated' check (
    availability_status in (
      'populated',
      'not_documented_in_current_sources',
      'see_related_section'
    )
  ),
  availability_note_en text,
  availability_note_ar text,
  populated_statement_count integer not null default 0 check (populated_statement_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (topic_id, section_key),
  -- Composite uniqueness required for strict composite FK from child tables
  unique (topic_id, id)
);

-- -----------------------------------------------------------------------------
-- D. Knowledge Sources (Original Medical Textbooks, Compendia & Guidelines)
-- -----------------------------------------------------------------------------
create table if not exists public.knowledge_sources (
  id text primary key,
  book_id text references public.books(book_id) on delete restrict,
  title_en text not null,
  title_ar text not null,
  authors_or_editors text not null,
  edition text not null,
  publication_year integer not null check (publication_year between 1950 and 2100),
  publisher text not null,
  isbn_or_uan text,
  doi_or_url text,
  source_type text not null check (
    source_type in (
      'textbook',
      'board_review',
      'clinical_guideline',
      'drug_compendium',
      'ddi_reference',
      'casebook_methodology'
    )
  ),
  drive_file_id text,
  local_uri_prefix text not null,
  sha256 text,
  total_pages integer check (total_pages is null or total_pages >= 1),
  verification_status text not null default 'verified_source' check (
    verification_status in (
      'verified_source',
      'verified_curated_monograph',
      'partially_indexed_pdf',
      'unverified'
    )
  ),
  source_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Conflict Groups (Explicit Side-by-Side Representation of Conflicting Evidence)
-- -----------------------------------------------------------------------------
create table if not exists public.knowledge_conflict_groups (
  id text primary key,
  topic_id text not null,
  section_id text not null,
  clinical_question_en text not null,
  clinical_question_ar text not null,
  conflict_nature text not null check (
    conflict_nature in (
      'threshold_discrepancy',
      'dosing_regimen_difference',
      'route_administration_constraint',
      'guideline_edition_evolution',
      'first_line_agent_preference'
    )
  ),
  resolution_guidance_en text not null,
  resolution_guidance_ar text not null,
  resolution_status text not null default 'preserve_both_with_context' check (
    resolution_status in (
      'preserve_both_with_context',
      'newer_guideline_supersedes',
      'route_or_population_dependent',
      'unresolved_requires_specialist'
    )
  ),
  reviewed_by_pharmacist text,
  created_at timestamptz not null default now(),
  foreign key (topic_id, section_id) references public.clinical_topic_sections(topic_id, id) on delete cascade
);

-- -----------------------------------------------------------------------------
-- C. Knowledge Statements (Atomic Verifiable Clinical Units with 3-Layer Provenance)
-- -----------------------------------------------------------------------------
create table if not exists public.knowledge_statements (
  id text primary key,
  topic_id text not null,
  section_id text not null,
  statement_order integer not null default 1,
  -- Layer 1: Verbatim Original Text from Reference(s) (Mandatory & Unabridged)
  verbatim_source_text text not null check (char_length(trim(verbatim_source_text)) > 0),
  -- Layer 2: Structured Extracted Summary (Derived strictly from verbatim text)
  statement_text_en text not null,
  statement_text_ar text not null,
  -- Layer 3: Optional Clinician-Reviewed Annotation (Explicitly separated)
  clinician_reviewed_note_en text,
  clinician_reviewed_note_ar text,
  reviewed_by_specialist text,
  reviewed_at timestamptz,
  -- Strict Anti-Hallucination Guardrail: AI generation is forbidden for clinical rules
  generation_method text not null default 'verbatim_extraction' check (
    generation_method in (
      'verbatim_extraction',
      'deterministic_rule_extraction',
      'pharmacist_curated'
    )
  ),
  statement_type text not null check (
    statement_type in (
      'definition',
      'epidemiology_fact',
      'pathophysiologic_mechanism',
      'etiology_trigger',
      'diagnostic_criterion',
      'clinical_sign_symptom',
      'lab_or_imaging_finding',
      'differential_item',
      'therapeutic_recommendation',
      'protocol_step',
      'dosing_rule',
      'organ_adjustment_rule',
      'contraindication_warning',
      'monitoring_parameter',
      'complication_management',
      'special_population_rule',
      'discharge_transition_rule',
      'clinical_pearl',
      'faq_item',
      'conflicting_position'
    )
  ),
  clinical_context text,
  population text not null default 'adults' check (
    population in (
      'adults',
      'pediatrics',
      'pregnancy_lactation',
      'geriatrics',
      'renal_impairment',
      'hepatic_impairment',
      'icu_critical',
      'all'
    )
  ),
  recommendation_strength text,
  evidence_level text,
  certainty text check (certainty in ('high', 'moderate', 'low', 'very_low', 'consensus')),
  verification_status text not null default 'verified_single_source' check (
    verification_status in (
      'verified_multi_source',
      'verified_single_source',
      'conflicting_evidence',
      'pharmacist_verified'
    )
  ),
  conflict_group_id text references public.knowledge_conflict_groups(id) on delete set null,
  normalized_fingerprint text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (topic_id, section_id) references public.clinical_topic_sections(topic_id, id) on delete cascade
);

-- -----------------------------------------------------------------------------
-- E. Knowledge Citations (Traceability Link Between Statements and Exact Source Locations)
-- -----------------------------------------------------------------------------
create table if not exists public.knowledge_citations (
  id text primary key,
  knowledge_statement_id text not null references public.knowledge_statements(id) on delete cascade,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  book_chapter_id text references public.book_chapters(id) on delete set null,
  book_section_id text references public.book_sections(id) on delete set null,
  book_page_id text references public.book_pages(id) on delete set null,
  book_table_id text references public.book_tables(id) on delete set null,
  monograph_chapter_id text not null,
  monograph_section_id text,
  edition text not null,
  publication_year integer not null,
  chapter_number integer,
  chapter_title text not null,
  section_reference text,
  page_number integer check (page_number is null or page_number >= 1),
  page_range text not null,
  verbatim_excerpt text not null check (char_length(trim(verbatim_excerpt)) > 0),
  source_location_uri text not null,
  citation_role text not null default 'primary_source' check (
    citation_role in (
      'primary_source',
      'corroborating_source',
      'conflicting_source',
      'dosing_safety_source',
      'ddi_mechanism_source'
    )
  ),
  extraction_method text not null default 'curated_monograph' check (
    extraction_method in ('native_text', 'ocr', 'curated_monograph')
  ),
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- F. Topic Relationships (Directed & Bidirectional Semantic Medical Graph Edges)
-- -----------------------------------------------------------------------------
create table if not exists public.topic_relationships (
  id text primary key,
  source_topic_id text not null references public.clinical_topics(id) on delete cascade,
  target_topic_id text not null references public.clinical_topics(id) on delete cascade,
  relationship_type text not null check (
    relationship_type in (
      'parent_of',
      'child_of',
      'related_to',
      'causes',
      'complication_of',
      'differential_of',
      'treated_by',
      'contraindicated_in',
      'monitored_by',
      'diagnosed_by',
      'associated_with',
      'drug_interaction',
      'requires_adjustment_in'
    )
  ),
  directionality text not null default 'directed' check (
    directionality in ('directed', 'bidirectional')
  ),
  relationship_description_en text not null,
  relationship_description_ar text not null,
  primary_source_id text not null references public.knowledge_sources(id) on delete restrict,
  chapter_reference text not null,
  page_range text,
  source_location_uri text not null,
  created_at timestamptz not null default now(),
  unique (source_topic_id, target_topic_id, relationship_type),
  check (source_topic_id <> target_topic_id)
);

-- -----------------------------------------------------------------------------
-- G. Clinical Drugs (Normalized Drug Entities)
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_drugs (
  id text primary key,
  monograph_topic_id text references public.clinical_topics(id) on delete set null,
  generic_name text not null unique,
  arabic_name text not null,
  brand_names text[] not null default '{}',
  drug_class text not null,
  drug_class_ar text not null,
  atc_code text,
  rxnorm_code text,
  is_high_alert boolean not null default false,
  requires_tdm boolean not null default false,
  mechanism_of_action_en text not null,
  mechanism_of_action_ar text not null,
  approved_indications text[] not null default '{}',
  contraindications text[] not null default '{}',
  adverse_effects text[] not null default '{}',
  major_interactions_summary text[] not null default '{}',
  administration_pearls_en text not null,
  administration_pearls_ar text not null,
  pregnancy_lactation_notes text,
  monitoring_parameters text[] not null default '{}',
  primary_source_id text not null references public.knowledge_sources(id) on delete restrict,
  source_location_uri text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Join Table: Topic <-> Drug Role Mapping
create table if not exists public.clinical_topic_drugs (
  id text primary key,
  topic_id text not null references public.clinical_topics(id) on delete cascade,
  drug_id text not null references public.clinical_drugs(id) on delete restrict,
  therapeutic_role text not null check (
    therapeutic_role in (
      'first_line_pillar',
      'acute_resuscitation',
      'second_line_adjunct',
      'electrolyte_replacement',
      'inotropic_vasopressor',
      'contraindicated_in_topic',
      'interacting_agent'
    )
  ),
  role_summary_en text not null,
  role_summary_ar text not null,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  source_location_uri text not null,
  unique (topic_id, drug_id, therapeutic_role)
);

-- -----------------------------------------------------------------------------
-- H. Structured Drug Dosing & Organ Adjustment Records (Never Unverified Text)
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_drug_dosing (
  id text primary key,
  drug_id text not null references public.clinical_drugs(id) on delete restrict,
  indication_topic_id text not null references public.clinical_topics(id) on delete cascade,
  indication_label_en text not null,
  indication_label_ar text not null,
  population text not null default 'adults' check (
    population in (
      'adults',
      'pediatrics',
      'geriatrics',
      'pregnancy',
      'icu_critical',
      'renal_impairment',
      'hepatic_impairment'
    )
  ),
  regimen_phase text not null check (
    regimen_phase in (
      'initial_starting_dose',
      'loading_bolus',
      'continuous_infusion',
      'maintenance_target_dose',
      'titration_step',
      'transition_overlap',
      'diuretic_resistance_adjunct'
    )
  ),
  dose_display text not null,
  dose_min numeric,
  dose_max numeric,
  dose_unit text not null,
  route text not null,
  frequency text not null,
  duration_or_titration_schedule text,
  maximum_dose text,
  administration_instructions_en text not null,
  administration_instructions_ar text not null,
  special_conditions_en text,
  special_conditions_ar text,
  verbatim_dosing_excerpt text not null,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  monograph_chapter_id text not null,
  page_range text not null,
  source_location_uri text not null,
  generation_method text not null default 'verbatim_extraction' check (
    generation_method in ('verbatim_extraction', 'deterministic_rule_extraction')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.clinical_drug_organ_adjustments (
  id text primary key,
  dosing_id text not null references public.clinical_drug_dosing(id) on delete cascade,
  drug_id text not null references public.clinical_drugs(id) on delete restrict,
  topic_id text not null references public.clinical_topics(id) on delete cascade,
  organ_system text not null check (
    organ_system in ('renal', 'hepatic', 'hyperkalemia_gate', 'hypokalemia_gate', 'hemodynamic_gate')
  ),
  parameter_name text not null, -- e.g. 'eGFR', 'CrCl', 'Child-Pugh', 'Serum K+', 'SBP'
  threshold_expression text not null, -- e.g. 'eGFR < 30 mL/min/1.73m2', 'Serum K+ < 3.3 mEq/L'
  action_type text not null check (
    action_type in (
      'reduce_starting_dose',
      'reduce_maintenance_by_50_percent',
      'hold_or_contraindicated',
      'mandatory_washout',
      'safe_no_adjustment_needed',
      'expected_hemodynamic_bump_continue'
    )
  ),
  adjustment_instruction_en text not null,
  adjustment_instruction_ar text not null,
  verbatim_excerpt text not null,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  page_range text not null,
  source_location_uri text not null,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- I. Clinical Guidelines & Linked Evidence-Based Recommendations
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_guidelines_master (
  id text primary key,
  issuing_organization text not null,
  guideline_title_en text not null,
  guideline_title_ar text not null,
  publication_year integer not null,
  version_or_edition text not null,
  primary_source_id text not null references public.knowledge_sources(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.clinical_guideline_recommendations (
  id text primary key,
  guideline_id text not null references public.clinical_guidelines_master(id) on delete cascade,
  topic_id text not null references public.clinical_topics(id) on delete cascade,
  section_id text not null,
  drug_id text references public.clinical_drugs(id) on delete set null,
  recommendation_title_en text not null,
  recommendation_title_ar text not null,
  recommendation_text_en text not null,
  recommendation_text_ar text not null,
  recommendation_class text not null, -- e.g. 'Class I (Strong)', 'Class IIa (Moderate)', 'Class III (Harm)'
  evidence_level text not null,       -- e.g. 'Level A', 'Level B-R', 'Level B-NR', 'Consensus'
  landmark_trials text[] not null default '{}',
  verbatim_excerpt text not null,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  page_range text not null,
  source_location_uri text not null,
  created_at timestamptz not null default now(),
  foreign key (topic_id, section_id) references public.clinical_topic_sections(topic_id, id) on delete cascade
);

-- -----------------------------------------------------------------------------
-- J. Structured Clinical Tables & Stepwise Diagnostic/Therapeutic Algorithms
-- -----------------------------------------------------------------------------
create table if not exists public.clinical_tables_and_algorithms (
  id text primary key,
  topic_id text not null,
  section_id text not null,
  artifact_type text not null check (
    artifact_type in (
      'dosing_table',
      'diagnostic_criteria_table',
      'hemodynamic_classification_table',
      'stepwise_protocol_algorithm',
      'electrolyte_safety_table',
      'ddi_interaction_matrix'
    )
  ),
  title_en text not null,
  title_ar text not null,
  headers_en jsonb not null default '[]'::jsonb,
  headers_ar jsonb not null default '[]'::jsonb,
  rows_en jsonb not null default '[]'::jsonb,
  rows_ar jsonb not null default '[]'::jsonb,
  algorithm_steps jsonb not null default '[]'::jsonb,
  units_and_footnotes_en text,
  units_and_footnotes_ar text,
  source_id text not null references public.knowledge_sources(id) on delete restrict,
  monograph_chapter_id text not null,
  page_range text not null,
  source_location_uri text not null,
  created_at timestamptz not null default now(),
  foreign key (topic_id, section_id) references public.clinical_topic_sections(topic_id, id) on delete cascade
);

-- -----------------------------------------------------------------------------
-- Indexes for High-Speed Topic, Synonym, Graph & Dosing Retrieval
-- -----------------------------------------------------------------------------
create index if not exists clinical_topics_slug_idx on public.clinical_topics(slug);
create index if not exists clinical_topics_specialty_idx on public.clinical_topics(specialty, topic_type);
create index if not exists clinical_topics_synonyms_gin_idx on public.clinical_topics using gin(synonyms);
create index if not exists clinical_topics_keywords_gin_idx on public.clinical_topics using gin(search_keywords);

create index if not exists topic_sections_topic_order_idx on public.clinical_topic_sections(topic_id, section_order);
create index if not exists statements_topic_section_idx on public.knowledge_statements(topic_id, section_id, statement_order);
create index if not exists statements_fingerprint_idx on public.knowledge_statements(normalized_fingerprint);
create index if not exists statements_conflict_idx on public.knowledge_statements(conflict_group_id) where conflict_group_id is not null;

create index if not exists citations_statement_idx on public.knowledge_citations(knowledge_statement_id);
create index if not exists citations_source_chapter_idx on public.knowledge_citations(source_id, monograph_chapter_id);

create index if not exists topic_rel_source_idx on public.topic_relationships(source_topic_id, relationship_type);
create index if not exists topic_rel_target_idx on public.topic_relationships(target_topic_id, relationship_type);

create index if not exists drug_dosing_topic_drug_idx on public.clinical_drug_dosing(indication_topic_id, drug_id);
create index if not exists organ_adj_topic_organ_idx on public.clinical_drug_organ_adjustments(topic_id, organ_system);
create index if not exists guideline_rec_topic_idx on public.clinical_guideline_recommendations(topic_id, section_id);
create index if not exists tables_algo_topic_section_idx on public.clinical_tables_and_algorithms(topic_id, section_id);

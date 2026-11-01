import { MedicalSystemCategory } from '../lib/library/libraryTypes';

/**
 * The 20 standard clinical topic section keys.
 * Sections are NOT mandatory to force-fill: each section carries an explicit
 * `availabilityStatus` reflecting whether the available verified library sources
 * actually document content for that section.
 */
export type TopicSectionKey =
  | 'overview_definition'        // 1. التعريف
  | 'epidemiology_risk_factors'  // 2. الوبائيات وعوامل الخطورة
  | 'pathophysiology'            // 3. الفيزيولوجيا المرضية
  | 'etiology_precipitants'      // 4. الأسباب والمحفزات
  | 'classification_diagnosis'   // 5. التصنيف ومعايير التشخيص
  | 'clinical_presentation'      // 6. العلامات والأعراض
  | 'investigations_workup'      // 7. الفحوصات المخبرية والتصويرية
  | 'differential_diagnosis'     // 8. التشخيص التفريقي
  | 'treatment_management'       // 9. العلاج والتدبير السريري
  | 'therapeutic_protocols'      // 10. البروتوكولات العلاجية
  | 'pharmacotherapy_dosing'     // 11. الأدوية والجرعات وطريقة الإعطاء
  | 'organ_dose_adjustment'      // 12. تعديل الجرعات في القصور الكلوي والكبدي
  | 'monitoring_followup'        // 13. المراقبة والمتابعة
  | 'complications'              // 14. المضاعفات
  | 'special_populations'        // 15. الحالات الخاصة (الأطفال، الحمل، كبار السن، القصور الكلوي)
  | 'discharge_criteria'         // 16. معايير الخروج من المستشفى والتحويل العلاجي
  | 'clinical_guidelines'        // 17. التوصيات والإرشادات السريرية
  | 'references_evidence'        // 18. المراجع والمصادر العلمية التي تدعم كل معلومة
  | 'related_topics'             // 19. المواضيع المرتبطة
  | 'clinical_pearls_faqs';      // 20. الأسئلة السريرية الشائعة والنقاط العملية المهمة

export type TopicType =
  | 'disease'
  | 'syndrome'
  | 'acute_emergency'
  | 'subphenotype'
  | 'symptom'
  | 'drug_class'
  | 'drug_monograph'
  | 'laboratory_abnormality'
  | 'clinical_procedure'
  | 'pharmacokinetic_protocol';

export type ClinicalUrgency = 'emergent_icu' | 'urgent_inpatient' | 'routine' | 'high_alert';

export type SectionAvailabilityStatus =
  | 'populated'
  | 'not_documented_in_current_sources'
  | 'see_related_section';

/**
 * Strict anti-hallucination provenance rule:
 * AI generation is NEVER permitted to create doses, diagnostic criteria, or treatment recommendations.
 */
export type KnowledgeGenerationMethod =
  | 'verbatim_extraction'
  | 'deterministic_rule_extraction'
  | 'pharmacist_curated';

export type StatementVerificationStatus =
  | 'verified_multi_source'
  | 'verified_single_source'
  | 'conflicting_evidence'
  | 'pharmacist_verified';

export type StatementType =
  | 'definition'
  | 'epidemiology_fact'
  | 'pathophysiologic_mechanism'
  | 'etiology_trigger'
  | 'diagnostic_criterion'
  | 'clinical_sign_symptom'
  | 'clinical_presentation'
  | 'lab_or_imaging_finding'
  | 'differential_item'
  | 'differential_diagnosis'
  | 'therapeutic_recommendation'
  | 'protocol_step'
  | 'dosing_rule'
  | 'organ_adjustment_rule'
  | 'contraindication_warning'
  | 'monitoring_parameter'
  | 'complication_management'
  | 'complication_hazard'
  | 'special_population_rule'
  | 'discharge_transition_rule'
  | 'guideline_recommendation'
  | 'clinical_pearl'
  | 'faq_item'
  | 'conflicting_position';

export type TopicPopulation =
  | 'adults'
  | 'pediatrics'
  | 'pregnancy'
  | 'pregnancy_lactation'
  | 'geriatrics'
  | 'renal_impairment'
  | 'hepatic_impairment'
  | 'icu_critical'
  | 'all';

export type TopicRelationshipType =
  | 'parent_of'
  | 'child_of'
  | 'related_to'
  | 'causes'
  | 'complication_of'
  | 'differential_of'
  | 'treated_by'
  | 'contraindicated_in'
  | 'monitored_by'
  | 'diagnosed_by'
  | 'associated_with'
  | 'drug_interaction'
  | 'requires_adjustment_in';

export type ConflictNature =
  | 'threshold_discrepancy'
  | 'dosing_regimen_difference'
  | 'route_administration_constraint'
  | 'guideline_edition_evolution'
  | 'first_line_agent_preference';

export interface KnowledgeSource {
  id: string;
  titleEn: string;
  titleAr: string;
  shortBadgeEn: string;
  shortBadgeAr: string;
  sourceType:
    | 'textbook'
    | 'board_review'
    | 'clinical_guideline'
    | 'drug_compendium'
    | 'hospital_compendium'
    | 'ddi_reference'
    | 'casebook'
    | 'casebook_methodology';
  edition: string;
  publicationYear: number;
  publisherOrOrg: string;
  isbnOrDriveId: string;
  authorityRank: number;
  verbatimBookId: string;
}

export interface KnowledgeCitation {
  id: string;
  knowledgeStatementId: string;
  sourceId: string;
  monographChapterId: string;
  monographSectionId: string;
  edition: string;
  publicationYear: number;
  chapterNumber: number;
  chapterTitle: string;
  sectionReference: string;
  pageNumber?: number;
  pageRange: string;
  /** Exact unabridged excerpt from the source chapter/section */
  verbatimExcerpt: string;
  /** In-app navigable deep link: e.g. local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4 */
  sourceLocationUri: string;
  citationRole:
    | 'primary_source'
    | 'corroborating_source'
    | 'conflicting_source'
    | 'dosing_safety_source'
    | 'ddi_mechanism_source';
  extractionMethod: 'native_text' | 'ocr' | 'curated_monograph';
}

/**
 * Three-layer provenance separation on every Knowledge Statement:
 * 1. `verbatimSourceText`: Exact original text from the reference (unmodified).
 * 2. `statementTextEn` / `statementTextAr`: Structured extracted clinical summary.
 * 3. `clinicianReviewedNoteEn` / `clinicianReviewedNoteAr`: Optional specialist pharmacist review layer.
 */
export interface KnowledgeStatement {
  id: string;
  topicId: string;
  sectionId: string;
  sectionKey: TopicSectionKey;
  statementOrder: number;
  /** Layer 1: Immutable Verbatim Source Text */
  verbatimSourceText: string;
  /** Layer 2: Structured Extracted Clinical Statement */
  statementTextEn: string;
  statementTextAr: string;
  /** Layer 3: Specialist Pharmacist Review Layer (if reviewed) */
  clinicianReviewedNoteEn?: string;
  clinicianReviewedNoteAr?: string;
  reviewedBySpecialist?: string;
  reviewedAt?: string;
  generationMethod: KnowledgeGenerationMethod;
  statementType: StatementType;
  clinicalContext?: string;
  population: TopicPopulation;
  recommendationStrength?: string;
  evidenceLevel?: string;
  certainty: 'high' | 'moderate' | 'low' | 'consensus';
  verificationStatus: StatementVerificationStatus;
  conflictGroupId?: string;
  normalizedFingerprint: string;
  citations: KnowledgeCitation[];
}

export interface ConflictPositionEntry {
  positionId: string;
  sourceId: string;
  sourceBadgeEn: string;
  sourceBadgeAr: string;
  edition: string;
  publicationYear: number;
  chapterReference: string;
  pageRange: string;
  sourceLocationUri: string;
  positionStatementEn: string;
  positionStatementAr: string;
  verbatimExcerpt: string;
  evidenceGrade: string;
}

export interface KnowledgeConflictGroup {
  id: string;
  topicId: string;
  sectionId: string;
  sectionKey: TopicSectionKey;
  clinicalQuestionEn: string;
  clinicalQuestionAr: string;
  conflictNature: ConflictNature;
  positions: ConflictPositionEntry[];
  resolutionGuidanceEn: string;
  resolutionGuidanceAr: string;
  resolutionStatus:
    | 'preserve_both_with_context'
    | 'newer_guideline_supersedes'
    | 'route_or_population_dependent';
  reviewedByPharmacist: string;
}

export interface TopicRelationship {
  id: string;
  sourceTopicId: string;
  targetTopicId: string;
  targetTopicCanonicalName: string;
  targetTopicTitleEn: string;
  targetTopicTitleAr: string;
  targetTopicType: TopicType;
  relationshipType: TopicRelationshipType;
  directionality: 'directed' | 'bidirectional';
  relationshipDescriptionEn: string;
  relationshipDescriptionAr: string;
  primarySourceId: string;
  chapterReference: string;
  pageRange: string;
  /** Real in-app deep link to either the full prototype topic or the exact verbatim chapter/section */
  sourceLocationUri: string;
  targetTopicUri: string;
}

export interface DrugOrganAdjustmentRule {
  id: string;
  dosingId: string;
  drugId: string;
  topicId: string;
  organSystem: 'renal' | 'hepatic' | 'hyperkalemia_gate' | 'hypokalemia_gate' | 'hemodynamic_gate';
  parameterName: string;
  thresholdExpression: string;
  actionType:
    | 'reduce_starting_dose'
    | 'reduce_maintenance_by_50_percent'
    | 'hold_or_contraindicated'
    | 'mandatory_washout'
    | 'safe_no_adjustment_needed'
    | 'expected_hemodynamic_bump_continue';
  adjustmentInstructionEn: string;
  adjustmentInstructionAr: string;
  verbatimExcerpt: string;
  sourceId: string;
  pageRange: string;
  sourceLocationUri: string;
}

export interface ClinicalDrugDosing {
  id: string;
  drugId: string;
  drugGenericName: string;
  drugArabicName: string;
  indicationTopicId: string;
  indicationLabelEn: string;
  indicationLabelAr: string;
  population: TopicPopulation;
  regimenPhase:
    | 'initial_starting_dose'
    | 'loading_bolus'
    | 'continuous_infusion'
    | 'maintenance_target_dose'
    | 'titration_step'
    | 'transition_overlap'
    | 'diuretic_resistance_adjunct';
  doseDisplay: string;
  doseMin?: number;
  doseMax?: number;
  doseUnit: string;
  route: string;
  frequency: string;
  durationOrTitrationSchedule?: string;
  maximumDose?: string;
  administrationInstructionsEn: string;
  administrationInstructionsAr: string;
  specialConditionsEn?: string;
  specialConditionsAr?: string;
  verbatimDosingExcerpt: string;
  sourceId: string;
  monographChapterId: string;
  pageRange: string;
  sourceLocationUri: string;
  generationMethod: 'verbatim_extraction' | 'deterministic_rule_extraction';
  organAdjustments: DrugOrganAdjustmentRule[];
}

export interface ClinicalDrug {
  id: string;
  genericName: string;
  arabicName: string;
  brandNames: string[];
  rxnormCui: string;
  atcCode: string;
  pharmacologicClass: string;
  pharmacologicClassAr: string;
  isHighAlert: boolean;
  ismpWarningEn?: string;
  ismpWarningAr?: string;
}

export interface ClinicalTopicDrugLink {
  id: string;
  topicId: string;
  drugId: string;
  drugGenericName: string;
  drugArabicName: string;
  therapeuticRole:
    | 'first_line'
    | 'gdmt_pillar'
    | 'electrolyte_replacement'
    | 'adjunct'
    | 'precipitant_to_avoid';
  lineOfTherapy: string;
  sourceId: string;
}

export interface ClinicalGuidelineRecommendation {
  id: string;
  guidelineId: string;
  issuingOrganization: string;
  guidelineTitleEn: string;
  guidelineTitleAr: string;
  publicationYear: number;
  topicId: string;
  sectionId: string;
  drugId?: string;
  recommendationTitleEn: string;
  recommendationTitleAr: string;
  recommendationTextEn: string;
  recommendationTextAr: string;
  recommendationClass: string;
  evidenceLevel: string;
  landmarkTrials: string[];
  verbatimExcerpt: string;
  sourceId: string;
  pageRange: string;
  sourceLocationUri: string;
}

export interface AlgorithmStepNode {
  stepNumber: number;
  stepTitleEn: string;
  stepTitleAr: string;
  clinicalConditionEn: string;
  clinicalConditionAr: string;
  actionEn: string;
  actionAr: string;
  safetyRedFlagEn?: string;
  safetyRedFlagAr?: string;
  sourceLocationUri: string;
}

export interface ClinicalTableOrAlgorithm {
  id: string;
  topicId: string;
  sectionId: string;
  sectionKey: TopicSectionKey;
  artifactType:
    | 'dosing_table'
    | 'diagnostic_criteria_table'
    | 'hemodynamic_classification_table'
    | 'stepwise_protocol_algorithm'
    | 'electrolyte_safety_table'
    | 'ddi_interaction_matrix';
  titleEn: string;
  titleAr: string;
  headersEn: string[];
  headersAr: string[];
  rowsEn: string[][];
  rowsAr: string[][];
  algorithmSteps?: AlgorithmStepNode[];
  unitsAndFootnotesEn?: string;
  unitsAndFootnotesAr?: string;
  sourceId: string;
  monographChapterId: string;
  pageRange: string;
  sourceLocationUri: string;
}

export interface ClinicalTopicSection {
  id: string;
  topicId: string;
  sectionKey: TopicSectionKey;
  sectionOrder: number;
  titleEn: string;
  titleAr: string;
  availabilityStatus: SectionAvailabilityStatus;
  availabilityNoteEn?: string;
  availabilityNoteAr?: string;
  populatedStatementCount: number;
  sourceIds: string[];
}

export interface ClinicalTopic {
  id: string;
  canonicalName: string;
  englishName: string;
  arabicName: string;
  slug: string;
  synonyms: string[];
  searchKeywords: string[];
  icd10Codes: string[];
  snomedCodes: string[];
  rxnormCodes?: string[];
  atcCodes?: string[];
  topicType: TopicType;
  parentTopicId: string | null;
  hierarchyPath: string[];
  specialty: MedicalSystemCategory;
  specialtyAr: string;
  descriptionEn: string;
  descriptionAr: string;
  clinicalUrgency: ClinicalUrgency;
  prototypeScope: 'full_monograph' | 'linked_subtopic_node';
  status: 'verified' | 'conflicting_evidence';
  lastReviewedAt: string;
  contributingSources: string[];
  sectionsManifest: ClinicalTopicSection[];
}

/**
 * Lightweight summary record loaded initially in UI lists so Android WebView
 * never hydrates all statements, excerpts, or books into RAM at once.
 */
export interface TopicSummaryIndexItem {
  id: string;
  slug: string;
  canonicalName: string;
  englishName: string;
  arabicName: string;
  topicType: TopicType;
  specialty: MedicalSystemCategory;
  specialtyAr: string;
  clinicalUrgency: ClinicalUrgency;
  prototypeScope: 'full_monograph' | 'linked_subtopic_node';
  contributingSourceCount: number;
  populatedSectionCount: number;
  totalStatementCount: number;
  conflictCount: number;
  relatedTopicCount: number;
}

/**
 * Lazy-loaded section payload fetched on-demand when a user views or expands
 * a specific section of a Clinical Topic.
 */
export interface LazyTopicSectionPayload {
  topicId: string;
  section: ClinicalTopicSection;
  statements: KnowledgeStatement[];
  conflictGroups: KnowledgeConflictGroup[];
  tablesAndAlgorithms: ClinicalTableOrAlgorithm[];
  drugDosing: ClinicalDrugDosing[];
  guidelineRecommendations: ClinicalGuidelineRecommendation[];
  relationships: TopicRelationship[];
}

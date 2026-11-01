import {
  ClinicalDrug,
  ClinicalDrugDosing,
  ClinicalGuidelineRecommendation,
  ClinicalTableOrAlgorithm,
  ClinicalTopic,
  ClinicalTopicDrugLink,
  ClinicalTopicSection,
  KnowledgeCitation,
  KnowledgeConflictGroup,
  KnowledgeSource,
  KnowledgeStatement,
  LazyTopicSectionPayload,
  TopicRelationship,
  TopicSectionKey,
  TopicSummaryIndexItem
} from '../../types/knowledgeGraph';
import {
  DKA_CLINICAL_TOPIC,
  DKA_CONFLICT_GROUPS,
  DKA_DRUG_DOSING,
  DKA_GUIDELINE_RECOMMENDATIONS,
  DKA_KNOWLEDGE_STATEMENTS,
  DKA_TABLES_AND_ALGORITHMS,
  DKA_TOPIC_RELATIONSHIPS
} from './dkaTopicPrototype';
import {
  HEART_FAILURE_CLINICAL_TOPIC,
  HEART_FAILURE_CONFLICT_GROUPS,
  HEART_FAILURE_DRUG_DOSING,
  HEART_FAILURE_GUIDELINE_RECOMMENDATIONS,
  HEART_FAILURE_KNOWLEDGE_STATEMENTS,
  HEART_FAILURE_TABLES_AND_ALGORITHMS,
  HEART_FAILURE_TOPIC_RELATIONSHIPS
} from './heartFailureTopicPrototype';
import { getAllVerbatimBooks, getVerbatimChapterById } from '../library';

/**
 * Registry of the 7 real medical reference books in ClinPharm Hospital.
 * Preserves 100% backward compatibility with `VERBATIM_BOOKS`.
 */
export const KNOWLEDGE_SOURCES_REGISTRY: KnowledgeSource[] = [
  {
    id: 'dipiro-13th-ed',
    titleEn: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach",
    titleAr: 'مرجع ديبيرو للعلاج الدوائي: نهج فيزيولوجي مرضي (الطبعة 13)',
    shortBadgeEn: "DiPiro's 13th Ed",
    shortBadgeAr: 'مرجع DiPiro 13',
    sourceType: 'textbook',
    edition: '13th Edition (2026)',
    publicationYear: 2026,
    publisherOrOrg: 'McGraw Hill Medical',
    isbnOrDriveId: '1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR',
    authorityRank: 95,
    verbatimBookId: 'dipiro-13th-ed'
  },
  {
    id: 'accp-cardiology-2026',
    titleEn: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review Course (BCCP)',
    titleAr: 'مرجع البورد الأمريكي التخصصي لصيدلة القلب (ACCP/ASHP Cardiology 2026 — BCCP)',
    shortBadgeEn: 'ACCP Cardiology 2026 (BCCP)',
    shortBadgeAr: 'بورد القلب ACCP 2026',
    sourceType: 'board_review',
    edition: '2026 BCCP Edition',
    publicationYear: 2026,
    publisherOrOrg: 'American College of Clinical Pharmacy / ASHP',
    isbnOrDriveId: '1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt',
    authorityRank: 96,
    verbatimBookId: 'accp-cardiology-2026'
  },
  {
    id: 'accp-2026-vol1',
    titleEn: 'ACCP Updates in Therapeutics 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    titleAr: 'موسوعة البورد الأمريكي للصيدلة السريرية ACCP 2026 (المجلد الأول)',
    shortBadgeEn: 'ACCP 2026 Vol 1',
    shortBadgeAr: 'بورد ACCP 2026 (مجلد 1)',
    sourceType: 'board_review',
    edition: '2026 Edition',
    publicationYear: 2026,
    publisherOrOrg: 'American College of Clinical Pharmacy',
    isbnOrDriveId: '1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By',
    authorityRank: 94,
    verbatimBookId: 'accp-2026-vol1'
  },
  {
    id: 'accp-2026-vol2',
    titleEn: 'ACCP Updates in Therapeutics 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    titleAr: 'موسوعة البورد الأمريكي للصيدلة السريرية ACCP 2026 (المجلد الثاني)',
    shortBadgeEn: 'ACCP 2026 Vol 2',
    shortBadgeAr: 'بورد ACCP 2026 (مجلد 2)',
    sourceType: 'board_review',
    edition: '2026 Edition',
    publicationYear: 2026,
    publisherOrOrg: 'American College of Clinical Pharmacy',
    isbnOrDriveId: '1b6ba11b930709da18c7d41600fa2866',
    authorityRank: 94,
    verbatimBookId: 'accp-2026-vol2'
  },
  {
    id: 'stockleys-drug-interactions',
    titleEn: "Stockley's Drug Interactions (13th Ed / 2026 Clinical DDI Database)",
    titleAr: 'موسوعة ستوكلي للتعارضات والتداخلات الدوائية (Stockley’s Drug Interactions)',
    shortBadgeEn: "Stockley's DDI 2026",
    shortBadgeAr: 'موسوعة Stockley للتداخلات',
    sourceType: 'ddi_reference',
    edition: '13th Edition (2026)',
    publicationYear: 2026,
    publisherOrOrg: 'Pharmaceutical Press',
    isbnOrDriveId: '1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S',
    authorityRank: 98,
    verbatimBookId: 'stockleys-drug-interactions'
  },
  {
    id: 'hospital-compendium',
    titleEn: 'Hospital Clinical Dosing Compendium & IV Dilution Database',
    titleAr: 'موسوعة جرعات المستشفى وتخفيف الأدوية الوريدية والحركية السريرية',
    shortBadgeEn: 'Hospital Dosing Compendium',
    shortBadgeAr: 'موسوعة جرعات المستشفى',
    sourceType: 'hospital_compendium',
    edition: '2026 Inpatient Hospital Edition',
    publicationYear: 2026,
    publisherOrOrg: 'Hospital Pharmacy & Therapeutics Committee / ISMP',
    isbnOrDriveId: '1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC',
    authorityRank: 93,
    verbatimBookId: 'hospital-compendium'
  },
  {
    id: 'clinical-casebook-guide',
    titleEn: "Pharmacotherapy Casebook: A Patient-Focused Approach & PPCP Bedside Guide",
    titleAr: 'دليل الحالات السريرية ومنهجية رعاية المرضى (Pharmacotherapy Casebook — الطبعة 13)',
    shortBadgeEn: 'Casebook & PPCP 13th Ed',
    shortBadgeAr: 'دليل الحالات PPCP 13',
    sourceType: 'casebook',
    edition: '13th Edition (2026)',
    publicationYear: 2026,
    publisherOrOrg: 'McGraw Hill / ACCP PPCP',
    isbnOrDriveId: '1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP',
    authorityRank: 90,
    verbatimBookId: 'clinical-casebook-guide'
  }
];

/**
 * First-class normalized clinical drugs database for the Phase 3 Prototype.
 */
export const CLINICAL_DRUGS_PROTOTYPE_DB: ClinicalDrug[] = [
  {
    id: 'drug-regular-insulin',
    genericName: 'Regular Insulin (Human)',
    arabicName: 'الإنسولين النظامي البشري (Regular Insulin)',
    brandNames: ['Humulin R', 'Novolin R'],
    rxnormCui: '253182',
    atcCode: 'A10AB01',
    pharmacologicClass: 'Short-Acting Human Insulin',
    pharmacologicClassAr: 'إنسولين بشري قصير المفعول (وريدي/تحت الجلد)',
    isHighAlert: true,
    ismpWarningEn: 'ISMP High-Alert Medication: IV insulin infusions require smart-pump programming and baseline Serum K+ >= 3.3 mEq/L verification in DKA.',
    ismpWarningAr: 'دواء عالي الخطورة (ISMP): يتطلب التسريب الوريدي للإنسولين مضخة ذكية والتحقق من أن بوتاسيوم المصل >= 3.3 mEq/L في DKA.'
  },
  {
    id: 'drug-insulin-glargine',
    genericName: 'Insulin Glargine',
    arabicName: 'إنسولين غلارجين القاعدي (Insulin Glargine)',
    brandNames: ['Lantus', 'Basaglar', 'Toujeo'],
    rxnormCui: '274783',
    atcCode: 'A10AE04',
    pharmacologicClass: 'Long-Acting Basal Insulin Analog',
    pharmacologicClassAr: 'إنسولين قاعدي طويل المفعول (تحت الجلد)',
    isHighAlert: true,
    ismpWarningEn: 'Must be injected subcutaneously 2 to 4 hours BEFORE stopping IV regular insulin in resolved DKA.',
    ismpWarningAr: 'يجب حقنه تحت الجلد قبل 2 إلى 4 ساعات من إيقاف مضخة الإنسولين الوريدي بعد شفاء DKA.'
  },
  {
    id: 'drug-potassium-chloride',
    genericName: 'Potassium Chloride (IV/PO)',
    arabicName: 'كلوريد البوتاسيوم (Potassium Chloride)',
    brandNames: ['K-Dur', 'Klor-Con'],
    rxnormCui: '8591',
    atcCode: 'B05XA01',
    pharmacologicClass: 'Electrolyte Replenisher',
    pharmacologicClassAr: 'معوض للكهارل (البوتاسيوم)',
    isHighAlert: true,
    ismpWarningEn: 'NEVER administer concentrated KCl by direct IV push. Peripheral line max rate: 10 mEq/hr (40 mEq/L). Central line max rate: 20 mEq/hr with continuous ECG telemetry.',
    ismpWarningAr: 'يُحظر الحقن الوريدي المباشر (IV Push). سقف الوريد المحيطي: 10 mEq/ساعة، والوريد المركزي: 20 mEq/ساعة مع تخطيط قلب مستمر.'
  },
  {
    id: 'drug-sacubitril-valsartan',
    genericName: 'Sacubitril/Valsartan',
    arabicName: 'ساكوبيتريل/فالسارتان (Entresto — ARNI)',
    brandNames: ['Entresto'],
    rxnormCui: '1656340',
    atcCode: 'C09DX04',
    pharmacologicClass: 'Angiotensin Receptor-Neprilysin Inhibitor (ARNI)',
    pharmacologicClassAr: 'مثبط مستقبل الأنجيوتنسين والنيبريليسين (ARNI)',
    isHighAlert: false,
    ismpWarningEn: 'Contraindicated within 36 hours of any ACE inhibitor (fatal angioedema risk) and contraindicated in pregnancy.',
    ismpWarningAr: 'يُمنع قطعياً خلال 36 ساعة من أي مثبط ACE (خطر الوذمة الوعائية القاتلة) ويُمنع في الحمل.'
  },
  {
    id: 'drug-carvedilol',
    genericName: 'Carvedilol',
    arabicName: 'كارفيديلول (Carvedilol)',
    brandNames: ['Coreg'],
    rxnormCui: '20352',
    atcCode: 'C07AG02',
    pharmacologicClass: 'Non-Selective Beta-Adrenergic & Alpha-1 Blocker',
    pharmacologicClassAr: 'حاصر غير انتقائي لمستقبلات بيتا-1 وبيتا-2 مع حصار ألفا-1',
    isHighAlert: false
  },
  {
    id: 'drug-spironolactone',
    genericName: 'Spironolactone',
    arabicName: 'سبيرونولاكتون (Spironolactone)',
    brandNames: ['Aldactone'],
    rxnormCui: '9997',
    atcCode: 'C03DA01',
    pharmacologicClass: 'Mineralocorticoid Receptor Antagonist (MRA)',
    pharmacologicClassAr: 'مضاد مستقبلات الألدوستيرون (MRA)',
    isHighAlert: false,
    ismpWarningEn: 'Requires baseline Serum K+ <= 5.0 mEq/L and eGFR >= 30 mL/min/1.73m2. Hold if K+ >= 5.5 mEq/L.',
    ismpWarningAr: 'يشترط بوتاسيوم أساسي <= 5.0 mEq/L وeGFR >= 30 مل/دقيقة. يُوقف فوراً إذا وصل البوتاسيوم إلى >= 5.5 mEq/L.'
  },
  {
    id: 'drug-dapagliflozin',
    genericName: 'Dapagliflozin / Empagliflozin',
    arabicName: 'داباغليفلوزين / إمباغليفلوزين (SGLT2i)',
    brandNames: ['Farxiga', 'Jardiance'],
    rxnormCui: '1488564',
    atcCode: 'A10BK01',
    pharmacologicClass: 'Sodium-Glucose Cotransporter-2 (SGLT2) Inhibitor',
    pharmacologicClassAr: 'مثبط الناقل المشترك للصوديوم والجلوكوز-2 (SGLT2i)',
    isHighAlert: false,
    ismpWarningEn: 'Cardiorenal pillar across HFrEF/HFpEF down to eGFR >= 20 mL/min, but can precipitate euglycemic DKA during acute fasting illness or surgery (hold 3–4 days pre-op).',
    ismpWarningAr: 'ركيزة أساسية في قصور القلب حتى eGFR >= 20 مل/د، لكنه قد يسبب حماضاً كيتونياً سوي السكر (euDKA) أثناء الصيام أو الجراحة (يُوقف قبل 3–4 أيام من الجراحة).'
  }
];

/**
 * Explicit relational join table linking clinical topics to normalized drugs (`clinical_topic_drugs`).
 */
export const CLINICAL_TOPIC_DRUG_LINKS: ClinicalTopicDrugLink[] = [
  {
    id: 'tdl-dka-regular-insulin',
    topicId: 'topic-dka',
    drugId: 'drug-regular-insulin',
    drugGenericName: 'Regular Insulin (Human)',
    drugArabicName: 'الإنسولين النظامي الوريدي',
    therapeuticRole: 'first_line',
    lineOfTherapy: 'First-Line Continuous IV Infusion (after K+ >= 3.3 mEq/L verified)',
    sourceId: 'accp-2026-vol2'
  },
  {
    id: 'tdl-dka-potassium-chloride',
    topicId: 'topic-dka',
    drugId: 'drug-potassium-chloride',
    drugGenericName: 'Potassium Chloride (IV)',
    drugArabicName: 'كلوريد البوتاسيوم الوريدي',
    therapeuticRole: 'electrolyte_replacement',
    lineOfTherapy: 'Mandatory Pre-Insulin Resuscitation (if K+ < 3.3) & Maintenance (if K+ 3.3–5.2)',
    sourceId: 'hospital-compendium'
  },
  {
    id: 'tdl-dka-insulin-glargine',
    topicId: 'topic-dka',
    drugId: 'drug-insulin-glargine',
    drugGenericName: 'Insulin Glargine',
    drugArabicName: 'إنسولين غلارجين القاعدي تحت الجلد',
    therapeuticRole: 'first_line',
    lineOfTherapy: 'Mandatory 2–4 Hour Subcutaneous Overlap Transition Prior to Stopping IV Insulin',
    sourceId: 'dipiro-13th-ed'
  },
  {
    id: 'tdl-dka-sglt2i-precipitant',
    topicId: 'topic-dka',
    drugId: 'drug-dapagliflozin',
    drugGenericName: 'Dapagliflozin / Empagliflozin (SGLT2i)',
    drugArabicName: 'مثبطات SGLT2 (مسبب للحماض الكيتوني سوي السكر)',
    therapeuticRole: 'precipitant_to_avoid',
    lineOfTherapy: 'Precipitant of Euglycemic DKA (Hold during acute illness and 3–4 days before surgery)',
    sourceId: 'accp-2026-vol2'
  },
  {
    id: 'tdl-hf-sacubitril-valsartan',
    topicId: 'topic-heart-failure',
    drugId: 'drug-sacubitril-valsartan',
    drugGenericName: 'Sacubitril/Valsartan (ARNI)',
    drugArabicName: 'ساكوبيتريل/فالسارتان (Entresto)',
    therapeuticRole: 'gdmt_pillar',
    lineOfTherapy: 'HFrEF GDMT Pillar #1 (Preferred over ACEi/ARB; Class I, Level A)',
    sourceId: 'dipiro-13th-ed'
  },
  {
    id: 'tdl-hf-carvedilol',
    topicId: 'topic-heart-failure',
    drugId: 'drug-carvedilol',
    drugGenericName: 'Carvedilol',
    drugArabicName: 'كارفيديلول (حاصر بيتا مثبت)',
    therapeuticRole: 'gdmt_pillar',
    lineOfTherapy: 'HFrEF GDMT Pillar #2 (Evidence-Based Beta-Blocker; Class I, Level A)',
    sourceId: 'dipiro-13th-ed'
  },
  {
    id: 'tdl-hf-spironolactone',
    topicId: 'topic-heart-failure',
    drugId: 'drug-spironolactone',
    drugGenericName: 'Spironolactone',
    drugArabicName: 'سبيرونولاكتون (مضاد الألدوستيرون)',
    therapeuticRole: 'gdmt_pillar',
    lineOfTherapy: 'HFrEF GDMT Pillar #3 (Requires K+ <= 5.0 & eGFR >= 30; Class I, Level A)',
    sourceId: 'dipiro-13th-ed'
  },
  {
    id: 'tdl-hf-dapagliflozin',
    topicId: 'topic-heart-failure',
    drugId: 'drug-dapagliflozin',
    drugGenericName: 'Dapagliflozin / Empagliflozin',
    drugArabicName: 'داباغليفلوزين / إمباغليفلوزين (مثبط SGLT2)',
    therapeuticRole: 'gdmt_pillar',
    lineOfTherapy: 'HFrEF (Class I) & HFmrEF/HFpEF (Class 2a) Foundational Pillar #4 down to eGFR >= 20 mL/min',
    sourceId: 'accp-cardiology-2026'
  }
];

/**
 * Synchronize each topic's `sectionsManifest` so `populatedStatementCount` always equals
 * the exact number of `KnowledgeStatement` records for that `(topicId, sectionId)` pair.
 */
function buildSynchronizedTopic(
  baseTopic: ClinicalTopic,
  statements: KnowledgeStatement[]
): ClinicalTopic {
  const synchronizedSections: ClinicalTopicSection[] = baseTopic.sectionsManifest.map(sec => {
    const count = statements.filter(
      st => st.topicId === baseTopic.id && st.sectionId === sec.id
    ).length;
    return {
      ...sec,
      populatedStatementCount: count
    };
  });
  return {
    ...baseTopic,
    sectionsManifest: synchronizedSections
  };
}

export const SYNCHRONIZED_DKA_TOPIC: ClinicalTopic = buildSynchronizedTopic(
  DKA_CLINICAL_TOPIC,
  DKA_KNOWLEDGE_STATEMENTS
);

export const SYNCHRONIZED_HEART_FAILURE_TOPIC: ClinicalTopic = buildSynchronizedTopic(
  HEART_FAILURE_CLINICAL_TOPIC,
  HEART_FAILURE_KNOWLEDGE_STATEMENTS
);

const ALL_PROTOTYPE_TOPICS: ClinicalTopic[] = [
  SYNCHRONIZED_DKA_TOPIC,
  SYNCHRONIZED_HEART_FAILURE_TOPIC
];

const ALL_PROTOTYPE_STATEMENTS: KnowledgeStatement[] = [
  ...DKA_KNOWLEDGE_STATEMENTS,
  ...HEART_FAILURE_KNOWLEDGE_STATEMENTS
];

const ALL_PROTOTYPE_CONFLICTS: KnowledgeConflictGroup[] = [
  ...DKA_CONFLICT_GROUPS,
  ...HEART_FAILURE_CONFLICT_GROUPS
];

const ALL_PROTOTYPE_DOSING: ClinicalDrugDosing[] = [
  ...DKA_DRUG_DOSING,
  ...HEART_FAILURE_DRUG_DOSING
];

const ALL_PROTOTYPE_TABLES: ClinicalTableOrAlgorithm[] = [
  ...DKA_TABLES_AND_ALGORITHMS,
  ...HEART_FAILURE_TABLES_AND_ALGORITHMS
];

const ALL_PROTOTYPE_GUIDELINES: ClinicalGuidelineRecommendation[] = [
  ...DKA_GUIDELINE_RECOMMENDATIONS,
  ...HEART_FAILURE_GUIDELINE_RECOMMENDATIONS
];

const ALL_PROTOTYPE_RELATIONSHIPS: TopicRelationship[] = [
  ...DKA_TOPIC_RELATIONSHIPS,
  ...HEART_FAILURE_TOPIC_RELATIONSHIPS
];

// ============================================================================
// Android WebView Memory-Safe Bounded LRU Cache for Lazy Section Loading
// ============================================================================

const MAX_LRU_CACHED_SECTIONS = 8;
const sectionPayloadLruCache = new Map<string, LazyTopicSectionPayload>();

function makeSectionCacheKey(topicId: string, sectionKey: TopicSectionKey): string {
  return `${topicId}::${sectionKey}`;
}

export function getKnowledgeGraphSectionCacheStats(): {
  cachedSectionCount: number;
  maxCacheCapacity: number;
  cachedKeys: string[];
} {
  return {
    cachedSectionCount: sectionPayloadLruCache.size,
    maxCacheCapacity: MAX_LRU_CACHED_SECTIONS,
    cachedKeys: Array.from(sectionPayloadLruCache.keys())
  };
}

export function clearKnowledgeGraphSectionCache(): void {
  sectionPayloadLruCache.clear();
}

/**
 * Returns the lightweight topic summary catalog for initial list rendering.
 * Never loads full section statements, tables, or verbatim excerpts into memory at startup.
 */
export function getTopicSummaryCatalog(): TopicSummaryIndexItem[] {
  return ALL_PROTOTYPE_TOPICS.map(topic => {
    const topicStatements = ALL_PROTOTYPE_STATEMENTS.filter(st => st.topicId === topic.id);
    const topicConflicts = ALL_PROTOTYPE_CONFLICTS.filter(cg => cg.topicId === topic.id);
    const topicRelationships = ALL_PROTOTYPE_RELATIONSHIPS.filter(
      rel => rel.sourceTopicId === topic.id
    );
    const populatedSectionCount = topic.sectionsManifest.filter(
      s => s.availabilityStatus === 'populated'
    ).length;

    return {
      id: topic.id,
      slug: topic.slug,
      canonicalName: topic.canonicalName,
      englishName: topic.englishName,
      arabicName: topic.arabicName,
      topicType: topic.topicType,
      specialty: topic.specialty,
      specialtyAr: topic.specialtyAr,
      clinicalUrgency: topic.clinicalUrgency,
      prototypeScope: topic.prototypeScope,
      contributingSourceCount: topic.contributingSources.length,
      populatedSectionCount,
      totalStatementCount: topicStatements.length,
      conflictCount: topicConflicts.length,
      relatedTopicCount: topicRelationships.length
    };
  });
}

/**
 * Resolves a topic header and its 20-section manifest by ID or slug without loading section bodies.
 */
export function getClinicalTopicMetadata(topicIdOrSlug: string): ClinicalTopic | undefined {
  const clean = (topicIdOrSlug || '').trim().toLowerCase();
  return ALL_PROTOTYPE_TOPICS.find(
    t =>
      t.id.toLowerCase() === clean ||
      t.slug.toLowerCase() === clean ||
      t.canonicalName.toLowerCase() === clean
  );
}

/**
 * Lazily loads a single section's statements, conflicts, tables, dosing, guidelines, and relationships.
 * Uses a bounded LRU cache (`MAX_LRU_CACHED_SECTIONS = 8`) to protect Android WebView memory.
 */
export function getLazySectionPayload(
  topicIdOrSlug: string,
  sectionKey: TopicSectionKey
): LazyTopicSectionPayload | undefined {
  const topic = getClinicalTopicMetadata(topicIdOrSlug);
  if (!topic) return undefined;

  const section = topic.sectionsManifest.find(s => s.sectionKey === sectionKey);
  if (!section) return undefined;

  const cacheKey = makeSectionCacheKey(topic.id, sectionKey);
  const existing = sectionPayloadLruCache.get(cacheKey);
  if (existing) {
    // Refresh LRU order
    sectionPayloadLruCache.delete(cacheKey);
    sectionPayloadLruCache.set(cacheKey, existing);
    return existing;
  }

  const statements = ALL_PROTOTYPE_STATEMENTS.filter(
    st => st.topicId === topic.id && st.sectionId === section.id
  ).sort((a, b) => a.statementOrder - b.statementOrder);

  const conflictGroups = ALL_PROTOTYPE_CONFLICTS.filter(
    cg => cg.topicId === topic.id && cg.sectionId === section.id
  );

  const tablesAndAlgorithms = ALL_PROTOTYPE_TABLES.filter(
    tb => tb.topicId === topic.id && tb.sectionId === section.id
  );

  const drugDosing =
    sectionKey === 'pharmacotherapy_dosing' || sectionKey === 'organ_dose_adjustment'
      ? ALL_PROTOTYPE_DOSING.filter(d => d.indicationTopicId === topic.id)
      : [];

  const guidelineRecommendations =
    sectionKey === 'clinical_guidelines'
      ? ALL_PROTOTYPE_GUIDELINES.filter(g => g.topicId === topic.id)
      : [];

  const relationships =
    sectionKey === 'related_topics'
      ? ALL_PROTOTYPE_RELATIONSHIPS.filter(r => r.sourceTopicId === topic.id)
      : [];

  const payload: LazyTopicSectionPayload = {
    topicId: topic.id,
    section,
    statements,
    conflictGroups,
    tablesAndAlgorithms,
    drugDosing,
    guidelineRecommendations,
    relationships
  };

  if (sectionPayloadLruCache.size >= MAX_LRU_CACHED_SECTIONS) {
    const oldestKey = sectionPayloadLruCache.keys().next().value;
    if (oldestKey) {
      sectionPayloadLruCache.delete(oldestKey);
    }
  }
  sectionPayloadLruCache.set(cacheKey, payload);

  return payload;
}

/**
 * Returns all conflict groups for a given topic (so the user can inspect all conflicts at a glance if desired).
 */
export function getTopicConflictGroups(topicId: string): KnowledgeConflictGroup[] {
  return ALL_PROTOTYPE_CONFLICTS.filter(cg => cg.topicId === topicId);
}

/**
 * Returns all semantic relationships for a given topic.
 */
export function getTopicRelationships(topicId: string): TopicRelationship[] {
  return ALL_PROTOTYPE_RELATIONSHIPS.filter(rel => rel.sourceTopicId === topicId);
}

/**
 * Returns all normalized drug links for a given topic.
 */
export function getTopicDrugLinks(topicId: string): ClinicalTopicDrugLink[] {
  return CLINICAL_TOPIC_DRUG_LINKS.filter(link => link.topicId === topicId);
}

/**
 * Returns a source record from `KNOWLEDGE_SOURCES_REGISTRY`.
 */
export function getKnowledgeSourceById(sourceId: string): KnowledgeSource | undefined {
  return KNOWLEDGE_SOURCES_REGISTRY.find(s => s.id === sourceId);
}

// ============================================================================
// Multi-Source Statement Deduplication & Conflict Preservation Engine
// ============================================================================

/**
 * Deduplicates statements across multiple sources ONLY when:
 * 1. They share the exact same `normalizedFingerprint`.
 * 2. Neither statement is part of a `KnowledgeConflictGroup` (`conflictGroupId` is undefined)
 *    and neither has `verificationStatus === 'conflicting_evidence'`.
 *
 * When merged, all unique `citations` are combined and `verificationStatus` is upgraded
 * to `'verified_multi_source'`. Conflicting statements are NEVER merged.
 */
export function deduplicateKnowledgeStatements(
  statements: KnowledgeStatement[]
): KnowledgeStatement[] {
  const result: KnowledgeStatement[] = [];
  const fingerprintMap = new Map<string, KnowledgeStatement>();

  for (const stmt of statements) {
    const hasConflict =
      Boolean(stmt.conflictGroupId) || stmt.verificationStatus === 'conflicting_evidence';

    if (hasConflict) {
      // Never merge conflicting statements
      result.push({ ...stmt, citations: [...stmt.citations] });
      continue;
    }

    const key = `${stmt.topicId}::${stmt.sectionKey}::${stmt.normalizedFingerprint}`;
    const existing = fingerprintMap.get(key);

    if (!existing) {
      const cloned: KnowledgeStatement = {
        ...stmt,
        citations: [...stmt.citations]
      };
      fingerprintMap.set(key, cloned);
      result.push(cloned);
    } else {
      // Merge citations without duplicating by citation sourceId + monographSectionId + verbatimExcerpt
      for (const incomingCit of stmt.citations) {
        const alreadyPresent = existing.citations.some(
          c =>
            c.sourceId === incomingCit.sourceId &&
            c.monographChapterId === incomingCit.monographChapterId &&
            c.monographSectionId === incomingCit.monographSectionId
        );
        if (!alreadyPresent) {
          existing.citations.push(incomingCit);
        }
      }
      const uniqueSources = new Set(existing.citations.map(c => c.sourceId));
      if (uniqueSources.size > 1) {
        existing.verificationStatus = 'verified_multi_source';
      }
    }
  }

  return result;
}

// ============================================================================
// Source Traceability & Anti-Hallucination Verification Engine
// ============================================================================

export interface CitationTraceabilityResult {
  isValid: boolean;
  citationId: string;
  sourceExistsInLibrary: boolean;
  chapterExistsInBook: boolean;
  sectionExistsInChapter: boolean;
  hasNonEmptyPageAndSectionRef: boolean;
  hasVerbatimExcerpt: boolean;
  reason?: string;
}

/**
 * Verifies that a `KnowledgeCitation` points to a real book, real chapter, and real section
 * in the embedded `VERBATIM_BOOKS` library, with non-empty edition, pageRange, and verbatimExcerpt.
 */
export function verifyCitationTraceability(
  citation: KnowledgeCitation
): CitationTraceabilityResult {
  const books = getAllVerbatimBooks();
  const book = books.find(b => b.id === citation.sourceId);
  if (!book) {
    return {
      isValid: false,
      citationId: citation.id,
      sourceExistsInLibrary: false,
      chapterExistsInBook: false,
      sectionExistsInChapter: false,
      hasNonEmptyPageAndSectionRef: false,
      hasVerbatimExcerpt: false,
      reason: `Source book '${citation.sourceId}' not found in VERBATIM_BOOKS`
    };
  }

  const chapter = book.chapters.find(ch => ch.id === citation.monographChapterId);
  if (!chapter) {
    return {
      isValid: false,
      citationId: citation.id,
      sourceExistsInLibrary: true,
      chapterExistsInBook: false,
      sectionExistsInChapter: false,
      hasNonEmptyPageAndSectionRef: false,
      hasVerbatimExcerpt: false,
      reason: `Chapter '${citation.monographChapterId}' not found in book '${citation.sourceId}'`
    };
  }

  const section = chapter.sections.find(sec => sec.id === citation.monographSectionId);
  if (!section) {
    return {
      isValid: false,
      citationId: citation.id,
      sourceExistsInLibrary: true,
      chapterExistsInBook: true,
      sectionExistsInChapter: false,
      hasNonEmptyPageAndSectionRef: false,
      hasVerbatimExcerpt: false,
      reason: `Section '${citation.monographSectionId}' not found in chapter '${citation.monographChapterId}'`
    };
  }

  const hasNonEmptyPageAndSectionRef =
    Boolean(citation.edition?.trim()) &&
    Boolean(citation.pageRange?.trim()) &&
    Boolean(citation.sectionReference?.trim()) &&
    citation.sourceLocationUri.startsWith('local://ref/verbatim/');

  const hasVerbatimExcerpt = Boolean(
    citation.verbatimExcerpt && citation.verbatimExcerpt.trim().length >= 25
  );

  return {
    isValid: hasNonEmptyPageAndSectionRef && hasVerbatimExcerpt,
    citationId: citation.id,
    sourceExistsInLibrary: true,
    chapterExistsInBook: true,
    sectionExistsInChapter: true,
    hasNonEmptyPageAndSectionRef,
    hasVerbatimExcerpt
  };
}

// ============================================================================
// Internal Deep-Link Resolution (`local://ref/topic/...` & `local://ref/verbatim/...`)
// ============================================================================

export interface ResolvedKnowledgeGraphNavigation {
  targetType: 'knowledge_topic' | 'verbatim_chapter_section';
  uri: string;
  topicId?: string;
  topicSlug?: string;
  sectionKey?: TopicSectionKey;
  verbatimBookId?: string;
  verbatimChapterId?: string;
  verbatimSectionId?: string;
}

/**
 * Resolves any Knowledge Graph URI (`local://ref/topic/...` or `local://ref/verbatim/...`)
 * into a concrete navigable target.
 */
export function resolveKnowledgeGraphUri(
  uri: string
): ResolvedKnowledgeGraphNavigation | undefined {
  const clean = (uri || '').trim();

  if (clean.startsWith('local://ref/topic/')) {
    const pathPart = clean.replace('local://ref/topic/', '');
    const [slugOrId, maybeSectionKey] = pathPart.split('/');
    const topic = getClinicalTopicMetadata(slugOrId);
    if (topic) {
      const validSection = maybeSectionKey
        ? topic.sectionsManifest.find(s => s.sectionKey === maybeSectionKey)?.sectionKey
        : undefined;
      return {
        targetType: 'knowledge_topic',
        uri: clean,
        topicId: topic.id,
        topicSlug: topic.slug,
        sectionKey: validSection
      };
    }
  }

  if (clean.startsWith('local://ref/verbatim/')) {
    const pathPart = clean.replace('local://ref/verbatim/', '');
    const [bookId, chapterId, sectionId] = pathPart.split('/');
    const chapter = getVerbatimChapterById(chapterId);
    if (chapter) {
      return {
        targetType: 'verbatim_chapter_section',
        uri: clean,
        verbatimBookId: bookId || chapter.bookId,
        verbatimChapterId: chapter.id,
        verbatimSectionId: sectionId
      };
    }
  }

  return undefined;
}

// ============================================================================
// Topic-First Knowledge Graph Search Engine
// ============================================================================

export interface KnowledgeGraphSearchMatch {
  topic: TopicSummaryIndexItem;
  matchedIn: ('title_or_synonym' | 'statement' | 'drug_dosing' | 'conflict' | 'related_topic')[];
  matchingSectionKeys: TopicSectionKey[];
  snippetEn: string;
  snippetAr: string;
}

export function searchKnowledgeGraphPrototype(query: string): KnowledgeGraphSearchMatch[] {
  const q = (query || '').trim().toLowerCase();
  const catalog = getTopicSummaryCatalog();
  if (!q) {
    return catalog.map(item => {
      const full = getClinicalTopicMetadata(item.id)!;
      return {
        topic: item,
        matchedIn: ['title_or_synonym'],
        matchingSectionKeys: ['overview_definition'],
        snippetEn: full.descriptionEn,
        snippetAr: full.descriptionAr
      };
    });
  }

  const results: KnowledgeGraphSearchMatch[] = [];

  for (const item of catalog) {
    const full = getClinicalTopicMetadata(item.id)!;
    const matchedIn = new Set<
      'title_or_synonym' | 'statement' | 'drug_dosing' | 'conflict' | 'related_topic'
    >();
    const matchingSections = new Set<TopicSectionKey>();
    let snippetEn = full.descriptionEn;
    let snippetAr = full.descriptionAr;

    const titleOrSynMatch =
      full.canonicalName.toLowerCase().includes(q) ||
      full.englishName.toLowerCase().includes(q) ||
      full.arabicName.toLowerCase().includes(q) ||
      full.synonyms.some(s => s.toLowerCase().includes(q)) ||
      full.searchKeywords.some(k => k.toLowerCase().includes(q));

    if (titleOrSynMatch) {
      matchedIn.add('title_or_synonym');
      matchingSections.add('overview_definition');
    }

    const topicStatements = ALL_PROTOTYPE_STATEMENTS.filter(st => st.topicId === full.id);
    for (const st of topicStatements) {
      if (
        st.statementTextEn.toLowerCase().includes(q) ||
        st.statementTextAr.toLowerCase().includes(q) ||
        st.verbatimSourceText.toLowerCase().includes(q)
      ) {
        matchedIn.add('statement');
        matchingSections.add(st.sectionKey);
        snippetEn = st.statementTextEn;
        snippetAr = st.statementTextAr;
      }
    }

    const topicDosing = ALL_PROTOTYPE_DOSING.filter(d => d.indicationTopicId === full.id);
    for (const d of topicDosing) {
      if (
        d.drugGenericName.toLowerCase().includes(q) ||
        d.drugArabicName.toLowerCase().includes(q) ||
        d.doseDisplay.toLowerCase().includes(q)
      ) {
        matchedIn.add('drug_dosing');
        matchingSections.add('pharmacotherapy_dosing');
      }
    }

    const topicConflicts = ALL_PROTOTYPE_CONFLICTS.filter(c => c.topicId === full.id);
    for (const c of topicConflicts) {
      if (
        c.clinicalQuestionEn.toLowerCase().includes(q) ||
        c.clinicalQuestionAr.toLowerCase().includes(q)
      ) {
        matchedIn.add('conflict');
        matchingSections.add(c.sectionKey);
      }
    }

    const topicRels = ALL_PROTOTYPE_RELATIONSHIPS.filter(r => r.sourceTopicId === full.id);
    for (const r of topicRels) {
      if (
        r.targetTopicCanonicalName.toLowerCase().includes(q) ||
        r.targetTopicTitleAr.toLowerCase().includes(q)
      ) {
        matchedIn.add('related_topic');
        matchingSections.add('related_topics');
      }
    }

    if (matchedIn.size > 0) {
      results.push({
        topic: item,
        matchedIn: Array.from(matchedIn),
        matchingSectionKeys: Array.from(matchingSections),
        snippetEn,
        snippetAr
      });
    }
  }

  return results;
}

export {
  ALL_PROTOTYPE_TOPICS,
  ALL_PROTOTYPE_STATEMENTS,
  ALL_PROTOTYPE_CONFLICTS,
  ALL_PROTOTYPE_DOSING,
  ALL_PROTOTYPE_TABLES,
  ALL_PROTOTYPE_GUIDELINES,
  ALL_PROTOTYPE_RELATIONSHIPS
};

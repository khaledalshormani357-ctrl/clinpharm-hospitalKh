import {
  ClinicalDrug,
  ClinicalDrugDosing,
  ClinicalGuidelineRecommendation,
  ClinicalTableOrAlgorithm,
  ClinicalTopic,
  KnowledgeConflictGroup,
  KnowledgeStatement,
  TopicRelationship
} from '../../types/knowledgeGraph';

export const DKA_CLINICAL_TOPIC: ClinicalTopic = {
  id: 'topic-dka',
  canonicalName: 'Diabetic Ketoacidosis (DKA)',
  englishName: 'Diabetic Ketoacidosis (DKA) & Euglycemic Ketoacidosis',
  arabicName: 'الحماض الكيتوني السكري (DKA) والحماض الكيتوني سوي السكر',
  slug: 'diabetic-ketoacidosis-dka',
  synonyms: [
    'DKA',
    'Diabetic Ketoacidosis',
    'Euglycemic DKA',
    'euDKA',
    'Diabetic Acidosis',
    'Ketoacidotic Crisis',
    'الحماض الكيتوني السكري',
    'حماض كيتوني سكري',
    'الحماض الكيتوني سوي السكر'
  ],
  searchKeywords: [
    'dka',
    'ketoacidosis',
    'anion gap',
    'beta-hydroxybutyrate',
    'regular insulin infusion',
    'potassium 3.3',
    'corrected sodium',
    'glargine overlap',
    'eudka',
    'sglt2 inhibitor ketoacidosis'
  ],
  icd10Codes: ['E10.10', 'E11.10', 'E13.10'],
  snomedCodes: ['420422005'],
  topicType: 'acute_emergency',
  parentTopicId: 'topic-diabetes-mellitus',
  hierarchyPath: ['Endocrinology & Metabolism', 'Diabetes Mellitus', 'Diabetic Ketoacidosis (DKA)'],
  specialty: 'Endocrinology & Metabolism',
  specialtyAr: 'أمراض الغدد الصماء والاستقلاب والعناية المركزة',
  descriptionEn:
    'Life-threatening acute metabolic emergency defined by the triad of hyperglycemia (or euglycemia in SGLT2i/pregnancy), ketonemia (beta-hydroxybutyrate >= 3.0 mmol/L), and high-anion-gap metabolic acidosis (pH <= 7.30, HCO3- <= 18 mEq/L, Anion Gap > 12 mEq/L). Contributing source records listed for this topic: ACCP Updates in Therapeutics 2026 Vol 2, DiPiro Pharmacotherapy 13th Ed, Hospital Dosing Compendium, and Pharmacotherapy Casebook 13th Ed.',
  descriptionAr:
    'حالة طوارئ استقلابية حادة مهددة للحياة تتميز بالثلاثي التشخيصي: فرط سكر الدم (أو سكر طبيعي في euDKA المرتبط بمثبطات SGLT2 أو الحمل)، فرط كيتون الدم (بيتا هيدروكسي بيوتيرات >= 3.0 mmol/L)، وحماض استقلابي مرتفع الفجوة الأنيونية (pH <= 7.30، البيكربونات <= 18 mEq/L، الفجوة الأنيونية > 12 mEq/L). تسجل بيانات هذا الموضوع المصادر التالية كمراجع مساهمة: ACCP Updates in Therapeutics 2026 Vol 2 وDiPiro Pharmacotherapy 13th Ed وHospital Dosing Compendium وPharmacotherapy Casebook 13th Ed.',
  clinicalUrgency: 'emergent_icu',
  prototypeScope: 'full_monograph',
  status: 'conflicting_evidence',
  lastReviewedAt: '2026-11-01T06:40:00Z',
  contributingSources: [
    'accp-2026-vol2',
    'dipiro-13th-ed',
    'hospital-compendium',
    'clinical-casebook-guide'
  ],
  sectionsManifest: [
    {
      id: 'topic-dka:overview_definition',
      topicId: 'topic-dka',
      sectionKey: 'overview_definition',
      sectionOrder: 1,
      titleEn: '1. Definition & Diagnostic Triad Overview',
      titleAr: '1. التعريف والملخص التشخيصي الحرج',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:epidemiology_risk_factors',
      topicId: 'topic-dka',
      sectionKey: 'epidemiology_risk_factors',
      sectionOrder: 2,
      titleEn: '2. Epidemiology & Risk Factors',
      titleAr: '2. الوبائيات وعوامل الخطورة',
      availabilityStatus: 'not_documented_in_current_sources',
      availabilityNoteEn:
        'Population-level epidemiological incidence/prevalence statistics for DKA are not separately tabulated in the currently indexed chapters (ACCP Vol 2 Ch. 8/15 & DiPiro Ch. 83 focus directly on pathophysiology, precipitants, diagnostic thresholds, and resuscitation protocols). Precipitating risk factors (SGLT2 inhibitors, pregnancy, surgical fasting) are documented in Section 4.',
      availabilityNoteAr:
        'لا تتضمن الفصول المفهرسة حالياً (ACCP Vol 2 الفصل 8/15 وDiPiro الفصل 83) إحصاءات وبائية سكانية منفصلة لـ DKA، بل تركز مباشرةً على الفيزيولوجيا المرضية والمحفزات ومعايير التشخيص وبروتوكولات الإنعاش. راجع القسم 4 للعوامل المحفزة الموثقة.',
      populatedStatementCount: 0,
      sourceIds: []
    },
    {
      id: 'topic-dka:pathophysiology',
      topicId: 'topic-dka',
      sectionKey: 'pathophysiology',
      sectionOrder: 3,
      titleEn: '3. Pathophysiology (Lipolysis, Ketogenesis & Osmotic Diuresis)',
      titleAr: '3. الفيزيولوجيا المرضية (تحلل الشحوم، توليد الكيتون، والإدرار التناضحي)',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['accp-2026-vol2', 'hospital-compendium']
    },
    {
      id: 'topic-dka:etiology_precipitants',
      topicId: 'topic-dka',
      sectionKey: 'etiology_precipitants',
      sectionOrder: 4,
      titleEn: '4. Etiology & Drug/Clinical Precipitants (SGLT2i & Euglycemic DKA)',
      titleAr: '4. الأسباب والمحفزات السريرية والدوائية (مثبطات SGLT2 وeuDKA)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:classification_diagnosis',
      topicId: 'topic-dka',
      sectionKey: 'classification_diagnosis',
      sectionOrder: 5,
      titleEn: '5. Classification & ADA Diagnostic Severity Criteria',
      titleAr: '5. التصنيف ومعايير التشخيص وشدة الحماض (ADA)',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'clinical-casebook-guide']
    },
    {
      id: 'topic-dka:clinical_presentation',
      topicId: 'topic-dka',
      sectionKey: 'clinical_presentation',
      sectionOrder: 6,
      titleEn: '6. Clinical Presentation (Volume & Electrolyte Deficits)',
      titleAr: '6. العلامات والمظاهر السريرية (عجز السوائل والشوارد)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'hospital-compendium']
    },
    {
      id: 'topic-dka:investigations_workup',
      topicId: 'topic-dka',
      sectionKey: 'investigations_workup',
      sectionOrder: 7,
      titleEn: '7. Laboratory Workup & Mandatory Bedside Equations',
      titleAr: '7. الفحوصات المخبرية والمعادلات السريرية الإلزامية',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'clinical-casebook-guide']
    },
    {
      id: 'topic-dka:differential_diagnosis',
      topicId: 'topic-dka',
      sectionKey: 'differential_diagnosis',
      sectionOrder: 8,
      titleEn: '8. Differential Diagnosis',
      titleAr: '8. التشخيص التفريقي',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:treatment_management',
      topicId: 'topic-dka',
      sectionKey: 'treatment_management',
      sectionOrder: 9,
      titleEn: '9. Clinical Treatment & Fluid Resuscitation Strategy',
      titleAr: '9. العلاج والتدبير السريري وبروتوكول إنعاش السوائل',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:therapeutic_protocols',
      topicId: 'topic-dka',
      sectionKey: 'therapeutic_protocols',
      sectionOrder: 10,
      titleEn: '10. Stepwise Resuscitation, Potassium Gating & Dextrose Clamp Protocols',
      titleAr: '10. البروتوكولات العلاجية المتدرجة (بوابة البوتاسيوم وإضافة الدكستروز)',
      availabilityStatus: 'populated',
      populatedStatementCount: 4,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium']
    },
    {
      id: 'topic-dka:pharmacotherapy_dosing',
      topicId: 'topic-dka',
      sectionKey: 'pharmacotherapy_dosing',
      sectionOrder: 11,
      titleEn: '11. Medications, Dosing & IV Administration Ceilings',
      titleAr: '11. الأدوية والجرعات وضوابط التسريب الوريدي',
      availabilityStatus: 'populated',
      populatedStatementCount: 4,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium']
    },
    {
      id: 'topic-dka:organ_dose_adjustment',
      topicId: 'topic-dka',
      sectionKey: 'organ_dose_adjustment',
      sectionOrder: 12,
      titleEn: '12. Renal & Hepatic Dosing Adjustments',
      titleAr: '12. تعديل الجرعات في القصور الكلوي والكبدي',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:monitoring_followup',
      topicId: 'topic-dka',
      sectionKey: 'monitoring_followup',
      sectionOrder: 13,
      titleEn: '13. Therapeutic & Electrolyte Monitoring Schedule',
      titleAr: '13. المراقبة السريرية والمخبرية والمتابعة',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'clinical-casebook-guide']
    },
    {
      id: 'topic-dka:complications',
      topicId: 'topic-dka',
      sectionKey: 'complications',
      sectionOrder: 14,
      titleEn: '14. Treatment Complications & Iatrogenic Hazards',
      titleAr: '14. المضاعفات والمخاطر العلاجية المنشأ',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['accp-2026-vol2', 'hospital-compendium']
    },
    {
      id: 'topic-dka:special_populations',
      topicId: 'topic-dka',
      sectionKey: 'special_populations',
      sectionOrder: 15,
      titleEn: '15. Special Populations (Pregnancy, Older Adults, Renal Failure & Surgical Patients)',
      titleAr: '15. الحالات الخاصة (الحمل، كبار السن، القصور الكلوي، والمرضى الجراحيون)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed']
    },
    {
      id: 'topic-dka:discharge_criteria',
      topicId: 'topic-dka',
      sectionKey: 'discharge_criteria',
      sectionOrder: 16,
      titleEn: '16. DKA Resolution Criteria & Mandatory Subcutaneous Basal Insulin Transition',
      titleAr: '16. معايير شفاء DKA والانتقال الإلزامي للإنسولين القاعدي تحت الجلد',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'clinical-casebook-guide']
    },
    {
      id: 'topic-dka:clinical_guidelines',
      topicId: 'topic-dka',
      sectionKey: 'clinical_guidelines',
      sectionOrder: 17,
      titleEn: '17. Clinical Guidelines & Consensus Recommendations',
      titleAr: '17. التوصيات والإرشادات السريرية المسجلة',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium']
    },
    {
      id: 'topic-dka:references_evidence',
      topicId: 'topic-dka',
      sectionKey: 'references_evidence',
      sectionOrder: 18,
      titleEn: '18. Contributing References & Source Metadata',
      titleAr: '18. المراجع والمصادر العلمية الداعمة',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium', 'clinical-casebook-guide']
    },
    {
      id: 'topic-dka:related_topics',
      topicId: 'topic-dka',
      sectionKey: 'related_topics',
      sectionOrder: 19,
      titleEn: '19. Semantically Linked Clinical Topics',
      titleAr: '19. المواضيع السريرية والدوائية المرتبطة',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium']
    },
    {
      id: 'topic-dka:clinical_pearls_faqs',
      topicId: 'topic-dka',
      sectionKey: 'clinical_pearls_faqs',
      sectionOrder: 20,
      titleEn: '20. High-Yield Clinical Pearls & Bedside FAQs',
      titleAr: '20. اللآلئ السريرية والأسئلة العملية الشائعة',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['accp-2026-vol2', 'dipiro-13th-ed', 'hospital-compendium', 'clinical-casebook-guide']
    }
  ]
};

export const DKA_CONFLICT_GROUPS: KnowledgeConflictGroup[] = [
  {
    id: 'conflict-dka-dextrose-threshold',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    clinicalQuestionEn:
      'At what exact blood glucose threshold should 5% Dextrose (D5W) be added to IV fluids during DKA insulin infusion?',
    clinicalQuestionAr:
      'عند أي مستوى لسكر الدم يجب إضافة الدكستروز 5% (D5W) إلى السوائل الوريدية أثناء تسريب الإنسولين في DKA؟',
    conflictNature: 'threshold_discrepancy',
    positions: [
      {
        positionId: 'pos-dka-dex-accp',
        sourceId: 'accp-2026-vol2',
        sourceBadgeEn: 'ACCP Updates 2026 Vol 2',
        sourceBadgeAr: 'بورد ACCP 2026 (مجلد 2)',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterReference: 'Ch. 8: Gastroenterology, Hepatology & Endocrinology (§7.0)',
        pageRange: 'pp. 295–368',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        positionStatementEn:
          'Add 5% Dextrose (switch IV fluids to D5 0.45% NaCl) strictly when blood glucose drops to 200 mg/dL, and decrease regular insulin infusion to 0.02–0.05 units/kg/hr to maintain blood glucose between 150 and 200 mg/dL.',
        positionStatementAr:
          'تُضاف السوائل السكرية (D5 0.45% NaCl) عندما ينخفض سكر الدم إلى 200 mg/dL تحديداً، مع خفض معدل تسريب الإنسولين إلى 0.02–0.05 وحدة/كجم/ساعة للحفاظ على سكر الدم بين 150 و200 mg/dL.',
        verbatimExcerpt:
          'The 200 mg/dL Rule: When blood glucose drops to 200 mg/dL, DO NOT STOP INSULIN. Add 5% Dextrose to IV fluids (D5 0.45% NaCl) and decrease insulin rate to 0.02 to 0.05 units/kg/hr.',
        evidenceGrade: 'ADA Standard of Medical Care (via ACCP 2026)'
      },
      {
        positionId: 'pos-dka-dex-dipiro',
        sourceId: 'dipiro-13th-ed',
        sourceBadgeEn: "DiPiro's 13th Ed",
        sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterReference: 'Ch. 83: Endocrine Disorders (§6.1)',
        pageRange: 'pp. 1190–1255',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        positionStatementEn:
          'Add D5W (D5W + 0.45% NaCl) when blood glucose reaches <= 200–250 mg/dL, reducing insulin infusion to 0.02–0.05 units/kg/hr to maintain blood glucose 150–200 mg/dL until the Anion Gap closes.',
        positionStatementAr:
          'يُضاف الدكستروز D5W عند وصول سكر الدم إلى <= 200–250 mg/dL، مع خفض تسريب الإنسولين إلى 0.02–0.05 وحدة/كجم/ساعة للحفاظ على السكر بين 150–200 mg/dL حتى إغلاق الفجوة الأنيونية.',
        verbatimExcerpt:
          'When blood glucose reaches <=200–250 mg/dL, ADD D5W (D5W + 0.45% NaCl) to IV fluids and reduce insulin infusion to 0.02–0.05 units/kg/h to maintain BG 150–200 mg/dL while continuing insulin until the Anion Gap closes (<=12 mEq/L).',
        evidenceGrade: 'ADA / SCCM Class I, Level A (via DiPiro 13th Ed)'
      }
    ],
    resolutionGuidanceEn:
      'Both sources agree that insulin must NEVER be stopped when glucose falls and that target maintenance BG is 150–200 mg/dL until Anion Gap <= 12 mEq/L. DiPiro allows initiating D5W slightly earlier (at 250 mg/dL) in rapidly falling hyperglycemia, whereas ACCP uses the strict 200 mg/dL DKA cutoff (vs 250–300 mg/dL in HHS). Preserve both thresholds without merging.',
    resolutionGuidanceAr:
      'يتفق المرجعان على حظر إيقاف الإنسولين وعلى أن الهدف هو الحفاظ على السكر بين 150–200 mg/dL حتى إغلاق الفجوة الأنيونية (<= 12). يسمح DiPiro ببدء الدكستروز عند <= 200–250 mg/dL لتجنب الهبوط السريع، بينما يحدد ACCP عتبة 200 mg/dL في DKA. يُحتفظ بالرقمين معاً دون دمجهما.',
    resolutionStatus: 'preserve_both_with_context',
    reviewedByPharmacist: 'Clinical Pharmacy Specialist Review (Phase 3 Prototype)'
  },
  {
    id: 'conflict-dka-basal-overlap',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:discharge_criteria',
    sectionKey: 'discharge_criteria',
    clinicalQuestionEn:
      'What is the required subcutaneous basal insulin overlap duration before discontinuing the IV regular insulin infusion in resolved DKA?',
    clinicalQuestionAr:
      'ما هي مدة التداخل الزمني الإلزامية بعد حقن الإنسولين القاعدي تحت الجلد وقبل إيقاف مضخة الإنسولين الوريدي في DKA؟',
    conflictNature: 'threshold_discrepancy',
    positions: [
      {
        positionId: 'pos-dka-overlap-accp',
        sourceId: 'accp-2026-vol2',
        sourceBadgeEn: 'ACCP Updates 2026 Vol 2',
        sourceBadgeAr: 'بورد ACCP 2026 (مجلد 2)',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterReference: 'Ch. 8: DKA Protocol (§8.0)',
        pageRange: 'pp. 295–368',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
        positionStatementEn:
          'Administer subcutaneous basal insulin (Glargine, Detemir, or Degludec) at least 2 hours BEFORE stopping the IV insulin infusion.',
        positionStatementAr:
          'يُحقن الإنسولين القاعدي تحت الجلد (Glargine أو Detemir أو Degludec) قبل ساعتين على الأقل من إيقاف تسريب الإنسولين الوريدي.',
        verbatimExcerpt:
          'When transitioning from IV insulin to subcutaneous maintenance therapy, long-acting basal insulin (Glargine, Detemir, or Degludec) MUST be administered subcutaneously at least 2 hours BEFORE stopping the IV insulin infusion.',
        evidenceGrade: 'Board Examination Synthesis & Clinical Safety'
      },
      {
        positionId: 'pos-dka-overlap-dipiro-casebook',
        sourceId: 'dipiro-13th-ed',
        sourceBadgeEn: "DiPiro's 13th Ed & Casebook 13th Ed",
        sourceBadgeAr: 'مرجع DiPiro 13 ودليل الحالات PPCP',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterReference: 'DiPiro Ch. 83 (§6.1) & Casebook Sec. II (§2.3)',
        pageRange: 'pp. 1190–1255 & pp. 49–128',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        positionStatementEn:
          'Administer subcutaneous long-acting basal insulin (Insulin Glargine or Detemir) at least 2 to 4 hours BEFORE stopping the IV regular insulin infusion.',
        positionStatementAr:
          'يُحقن الإنسولين القاعدي طويل المفعول تحت الجلد (Glargine أو Detemir) قبل ساعتين إلى 4 ساعات من إيقاف تسريب الإنسولين الوريدي.',
        verbatimExcerpt:
          'Subcutaneous Basal Insulin Transition Rule: Administer subcutaneous long-acting basal insulin (Insulin Glargine or Detemir) at least 2 to 4 HOURS BEFORE stopping the IV regular insulin infusion to prevent rebound ketoacidosis.',
        evidenceGrade: 'ADA / SCCM Class I, Level A'
      }
    ],
    resolutionGuidanceEn:
      'Minimum safe overlap across all references is 2 hours (2–4 hours window in DiPiro & Casebook to account for slower subcutaneous absorption onset of Glargine). Never stop IV insulin < 2 hours after SC basal injection.',
    resolutionGuidanceAr:
      'الحد الأدنى الآمن المتفق عليه هو ساعتان على الأقل، بينما يوصي DiPiro ودليل الحالات بنافذة 2 إلى 4 ساعات لضمان بدء امتصاص Glargine تحت الجلد.',
    resolutionStatus: 'preserve_both_with_context',
    reviewedByPharmacist: 'Clinical Pharmacy Specialist Review (Phase 3 Prototype)'
  },
  {
    id: 'conflict-dka-kcl-route-ceiling',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:pharmacotherapy_dosing',
    sectionKey: 'pharmacotherapy_dosing',
    clinicalQuestionEn:
      'How do DKA potassium replacement rates (20–40 mEq/hr when K+ < 3.3 mEq/L) reconcile with Hospital IV Potassium Chloride peripheral vs central line rate ceilings?',
    clinicalQuestionAr:
      'كيف يتوافق معدل تعويض البوتاسيوم في DKA (20–40 mEq/ساعة عند K+ < 3.3) مع السقف المؤسسي لتسريب البوتاسيوم في الوريد المحيطي مقابل المركزي؟',
    conflictNature: 'route_administration_constraint',
    positions: [
      {
        positionId: 'pos-dka-kcl-ada',
        sourceId: 'accp-2026-vol2',
        sourceBadgeEn: 'ACCP Vol 2 & DiPiro 13th Ed',
        sourceBadgeAr: 'ACCP مجلد 2 و DiPiro 13',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterReference: 'ACCP Ch. 8 (§6.0) & DiPiro Ch. 83 (§6.1)',
        pageRange: 'pp. 295–368 & pp. 1190–1255',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6',
        positionStatementEn:
          'When baseline Serum K+ < 3.3 mEq/L in DKA: Hold all insulin immediately and infuse IV Potassium Chloride at 20 to 40 mEq/hr until K+ >= 3.3 mEq/L.',
        positionStatementAr:
          'عندما يكون البوتاسيوم < 3.3 mEq/L في DKA: يُوقف الإنسولين فوراً ويُسرب كلوريد البوتاسيوم وريدياً بمعدل 20 إلى 40 mEq/ساعة حتى يصل البوتاسيوم إلى >= 3.3 mEq/L.',
        verbatimExcerpt:
          'Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L.',
        evidenceGrade: 'ADA Class I Emergency Resuscitation Rule'
      },
      {
        positionId: 'pos-dka-kcl-hosp-ceiling',
        sourceId: 'hospital-compendium',
        sourceBadgeEn: 'Hospital Dosing Compendium',
        sourceBadgeAr: 'موسوعة جرعات المستشفى',
        edition: '2026 Inpatient Hospital Edition',
        publicationYear: 2026,
        chapterReference: 'Ch. 1: Potassium Chloride Replacement Protocol (§2.0)',
        pageRange: 'pp. 1–92',
        sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2',
        positionStatementEn:
          'Peripheral IV line maximum rate is strictly 10 mEq/hour (max concentration 40 mEq/L). Infusion rates up to 20 mEq/hour require a Central Venous Catheter (CVC) and mandatory continuous ECG telemetry monitoring.',
        positionStatementAr:
          'الحد الأقصى للتسريب في الوريد المحيطي هو 10 mEq/ساعة (بتركيز أقصى 40 mEq/L). معدلات التسريب حتى 20 mEq/ساعة تتطلب قسطرة وريد مركزي (CVC) ومراقبة تخطيط قلب مستمرة إلزامية.',
        verbatimExcerpt:
          'Peripheral Intravenous Infusion Limits: Maximum Infusion Rate: 10 mEq/hour. Maximum Peripheral Concentration: 40 mEq/L. Central Venous Catheter (CVC) Infusion Limits: Maximum Infusion Rate: 20 mEq/hour. Continuous electrocardiographic telemetry monitoring is MANDATORY whenever infusion rates exceed 10 mEq/hour.',
        evidenceGrade: 'Hospital Pharmacy Compendium & ISMP Safety Mandates'
      }
    ],
    resolutionGuidanceEn:
      'Route-Dependent Safety Rule: Never infuse 20–40 mEq/hr through a single peripheral IV line. To deliver >= 20 mEq/hr safely in hypokalemic DKA (K+ < 3.3 mEq/L), utilize a Central Venous Catheter (or two separate peripheral IV lines simultaneously at <= 10 mEq/hr each) with mandatory continuous cardiac ECG telemetry.',
    resolutionGuidanceAr:
      'قاعدة سلامة مرتبطة بطريق الإعطاء: يُمنع تسريب 20–40 mEq/ساعة عبر وريد محيطي واحد. لإعطاء >= 20 mEq/ساعة بأمان في مريض DKA مع نقص بوتاسيوم (< 3.3)، يلزم استخدام قسطرة وريد مركزي (أو خطين وريديين محيطيين منفصلين بمعدل <= 10 mEq/ساعة لكل خط) مع مراقبة تخطيط القلب المستمرة.',
    resolutionStatus: 'route_or_population_dependent',
    reviewedByPharmacist: 'Critical Care & Inpatient Safety Pharmacist Review'
  }
];

export const DKA_KNOWLEDGE_STATEMENTS: KnowledgeStatement[] = [
  // Section 1: overview_definition
  {
    id: 'stmt-dka-def-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:overview_definition',
    sectionKey: 'overview_definition',
    statementOrder: 1,
    verbatimSourceText:
      'Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency characterized by absolute or relative insulin deficiency paired with counter-regulatory hormone excess (glucagon, catecholamines, cortisol, and growth hormone).',
    statementTextEn:
      'Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency driven by absolute or relative insulin deficiency combined with surge of counter-regulatory hormones (glucagon, catecholamines, cortisol, and growth hormone).',
    statementTextAr:
      'الحماض الكيتوني السكري (DKA) هو حالة طوارئ استقلابية حادة مهددة للحياة تنجم عن عوز الإنسولين المطلق أو النسبي المقترن بفرط الهرمونات المضادة للتنظيم (الجلوكاجون، الكاتيكولامينات، الكورتيزول، وهرمون النمو).',
    clinicianReviewedNoteEn:
      'Verified across both ACCP Updates 2026 Vol 2 and DiPiro 13th Edition.',
    clinicianReviewedNoteAr:
      'موثق ومطابق في كل من مرجع ACCP 2026 المجلد الثاني ومرجع DiPiro الطبعة 13.',
    reviewedBySpecialist: 'Dr. Khaled Al-Shormani, Clinical Pharmacist',
    reviewedAt: '2026-11-01T06:40:00Z',
    generationMethod: 'verbatim_extraction',
    statementType: 'definition',
    population: 'all',
    recommendationStrength: 'Consensus Definition',
    evidenceLevel: 'ADA / SCCM Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-definition-insulin-deficiency-counter-regulatory-hormones',
    citations: [
      {
        id: 'cit-dka-def-1a',
        knowledgeStatementId: 'stmt-dka-def-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 5.0: Diabetic Ketoacidosis (DKA): Diagnostic Criteria & Pathophysiology',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency characterized by absolute or relative insulin deficiency paired with counter-regulatory hormone excess (glucagon, catecholamines, cortisol, and growth hormone).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-def-1b',
        knowledgeStatementId: 'stmt-dka-def-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA), HHS & Inpatient Glycemic Control',
        sectionReference: 'Section 6.1: Diabetic Ketoacidosis (DKA) Potassium Gate & Resuscitation Protocol',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Diabetic Ketoacidosis (DKA) is characterized by the triad of hyperglycemia (BG >200–250 mg/dL, or euglycemic in SGLT2i-associated DKA), high-anion-gap metabolic acidosis (arterial pH <7.30, serum HCO3- <18 mEq/L, Anion Gap >12 mEq/L), and ketonemia (beta-hydroxybutyrate >=3.0 mmol/L).',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 3: pathophysiology
  {
    id: 'stmt-dka-patho-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:pathophysiology',
    sectionKey: 'pathophysiology',
    statementOrder: 1,
    verbatimSourceText:
      'Uncontrolled Adipocyte Lipolysis: Absence of insulin activates hormone-sensitive lipase in adipose tissue, releasing copious free fatty acids (FFAs) into the portal circulation. Hepatic Ketogenesis: In hepatocytes, carnitine palmitoyltransferase-1 (CPT-1) transports FFAs into mitochondria, undergoing beta-oxidation to generate ketoacids: acetoacetate and beta-hydroxybutyrate.',
    statementTextEn:
      'Insulin deficiency disinhibits adipocyte hormone-sensitive lipase, flooding the portal vein with free fatty acids (FFAs) that enter hepatocyte mitochondria via carnitine palmitoyltransferase-1 (CPT-1) and undergo beta-oxidation into strong ketoacids (acetoacetate and beta-hydroxybutyrate).',
    statementTextAr:
      'يؤدي غياب الإنسولين إلى تنشيط إنزيم الليباز الحساس للهرمون في النسيج الشحمي، مما يطلق كميات هائلة من الأحماض الدهنية الحرة (FFAs) إلى الدوران البابي، فتدخل ميتوكوندريا الخلايا الكبدية عبر ناقل CPT-1 وتخضع للأكسدة بيتا لإنتاج الأحماض الكيتونية (أسيتوأسيتات وبيتا هيدروكسي بيوتيرات).',
    generationMethod: 'verbatim_extraction',
    statementType: 'pathophysiologic_mechanism',
    population: 'all',
    evidenceLevel: 'ADA Consensus Statement',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'dka-pathophysiology-hormone-sensitive-lipase-cpt1-ketogenesis',
    citations: [
      {
        id: 'cit-dka-patho-1',
        knowledgeStatementId: 'stmt-dka-patho-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 5.0: Pathophysiologic Cascade',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Uncontrolled Adipocyte Lipolysis: Absence of insulin activates hormone-sensitive lipase in adipose tissue, releasing copious free fatty acids (FFAs) into the portal circulation. Hepatic Ketogenesis: In hepatocytes, carnitine palmitoyltransferase-1 (CPT-1) transports FFAs into mitochondria, undergoing beta-oxidation to generate ketoacids: acetoacetate and beta-hydroxybutyrate.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  {
    id: 'stmt-dka-patho-2',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:pathophysiology',
    sectionKey: 'pathophysiology',
    statementOrder: 2,
    verbatimSourceText:
      'Osmotic Diuresis: Hyperglycemia exceeds the renal tubular absorptive threshold (~180 mg/dL), provoking massive glucosuria, osmotic diuresis, and electrolyte wasting (losses of 5-7 Liters of water, 400-700 mEq sodium, and 200-400 mEq potassium). Although baseline serum potassium in DKA is frequently normal or elevated (due to extracellular shifting caused by acidosis, insulinopenia, and hyperosmolality), EVERY patient with DKA suffers a profound total-body potassium deficit averaging 300 to 500 mEq resulting from prolonged osmotic kaliuresis.',
    statementTextEn:
      'Hyperglycemia exceeding the renal tubular threshold (~180 mg/dL) drives severe osmotic diuresis with losses of 5–7 L water, 400–700 mEq sodium, and 200–500 mEq total-body potassium; initial serum K+ often appears falsely normal or elevated due to extracellular shifting from insulinopenia and hyperosmolality.',
    statementTextAr:
      'تجاوز سكر الدم للعتبة الأنبوبية الكلوية (~180 mg/dL) يسبب إدراراً تناضحياً شديداً مع فقدان 5–7 لترات ماء، و400–700 mEq صوديوم، و200–500 mEq من إجمالي بوتاسيوم الجسم؛ رغم أن بوتاسيوم المصل قد يبدو طبيعياً أو مرتفعاً كاذباً في البداية بسبب خروجه من الخلايا بفعل نقص الإنسولين وفرط الأسمولية.',
    generationMethod: 'verbatim_extraction',
    statementType: 'pathophysiologic_mechanism',
    population: 'adults',
    evidenceLevel: 'ADA Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-osmotic-diuresis-total-body-potassium-deficit-extracellular-shift',
    citations: [
      {
        id: 'cit-dka-patho-2a',
        knowledgeStatementId: 'stmt-dka-patho-2',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Sections 5.0 & 6.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Osmotic Diuresis: Hyperglycemia exceeds the renal tubular absorptive threshold (~180 mg/dL), provoking massive glucosuria, osmotic diuresis, and electrolyte wasting (losses of 5-7 Liters of water, 400-700 mEq sodium, and 200-400 mEq potassium).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-patho-2b',
        knowledgeStatementId: 'stmt-dka-patho-2',
        sourceId: 'hospital-compendium',
        monographChapterId: 'hospital-compendium-protocols',
        monographSectionId: 'hosp-sec2',
        edition: '2026 Inpatient Hospital Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'Hospital Clinical Dosing Compendium',
        sectionReference: 'Section 2.0: Potassium Chloride Replacement Protocol',
        pageRange: 'pp. 1–92',
        verbatimExcerpt:
          'However, extracellular potassium represents only 2% of total body potassium stores; transcellular shifting can mask massive intracellular deficits.',
        sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 4: etiology_precipitants
  {
    id: 'stmt-dka-etio-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:etiology_precipitants',
    sectionKey: 'etiology_precipitants',
    statementOrder: 1,
    verbatimSourceText:
      'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis). Mechanism: Persistent renal glycosuria lowers blood glucose while suppressing endogenous insulin secretion and elevating glucagon, accelerating hepatic ketogenesis. Hold SGLT2 inhibitors at least 3-4 days prior to major surgeries or during acute medical illnesses.',
    statementTextEn:
      'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) and pregnancy can precipitate euglycemic DKA (BG < 200–250 mg/dL with severe high-anion-gap ketoacidosis) via persistent renal glycosuria, suppressed endogenous insulin, and elevated glucagon; SGLT2 inhibitors must be held during acute illness, prolonged fasting, or 3–4 days before scheduled surgery.',
    statementTextAr:
      'تُعد مثبطات SGLT2 (Empagliflozin, Dapagliflozin, Canagliflozin) والحمل من أهم مسببات الحماض الكيتوني سوي السكر (euDKA؛ سكر الدم < 200–250 mg/dL مع حماض كيتوني شديد)؛ ويجب إيقاف مثبطات SGLT2 أثناء الأمراض الحادة أو الصيام المديد أو قبل 3–4 أيام من العمليات الجراحية الكبرى.',
    generationMethod: 'verbatim_extraction',
    statementType: 'etiology_trigger',
    population: 'adults',
    recommendationStrength: 'Mandatory Safety Hold',
    evidenceLevel: 'ADA Standards of Care 2026',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-etiology-sglt2-inhibitors-euglycemic-dka-surgical-hold-3-4-days',
    citations: [
      {
        id: 'cit-dka-etio-1a',
        knowledgeStatementId: 'stmt-dka-etio-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec8',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 8.0: Euglycemic DKA (euDKA) and SGLT2 Inhibitor Pitfalls',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis)... Hold SGLT2 inhibitors at least 3-4 days prior to major surgeries or during acute medical illnesses.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-etio-1b',
        knowledgeStatementId: 'stmt-dka-etio-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec2',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.2: Inpatient Glycemic Targets & Oral Antidiabetic Hold Rules',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'SGLT2 Inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin): Hold during acute illness, prolonged fasting, or 3–4 days prior to scheduled surgery (risk of euglycemic DKA).',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 5: classification_diagnosis
  {
    id: 'stmt-dka-diag-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:classification_diagnosis',
    sectionKey: 'classification_diagnosis',
    statementOrder: 1,
    verbatimSourceText:
      'Diagnostic Triad & Severity Stratification: 1. Hyperglycemia: Blood glucose > 250 mg/dL (13.9 mmol/L) (can be < 200 mg/dL in euglycemic DKA associated with SGLT2 inhibitors or pregnancy). 2. Ketosis: Positive serum or urine acetoacetate or beta-hydroxybutyrate (beta-hydroxybutyrate >= 3.0 mmol/L). 3. High Anion Gap Metabolic Acidosis: Serum Bicarbonate: <= 18 mEq/L (Mild: 15-18; Moderate: 10 to < 15; Severe: < 10 mEq/L). Arterial pH: <= 7.30 (Mild: 7.25-7.30; Moderate: 7.00 to < 7.24; Severe: < 7.00). Anion Gap Formula: Na - (Cl + HCO3). Normal anion gap is 8 to 12 mEq/L. In DKA, anion gap is typically > 12 to 16 mEq/L.',
    statementTextEn:
      'DKA is diagnosed by: (1) Blood glucose > 200–250 mg/dL (< 200 mg/dL in euDKA), (2) Ketonemia with serum beta-hydroxybutyrate >= 3.0 mmol/L, and (3) High Anion Gap Metabolic Acidosis (Anion Gap > 12 mEq/L) stratified into Mild (pH 7.25–7.30, HCO3- 15–18 mEq/L), Moderate (pH 7.00 to < 7.24, HCO3- 10 to < 15 mEq/L), and Severe (pH < 7.00, HCO3- < 10 mEq/L).',
    statementTextAr:
      'يُشخص DKA بوجود: (1) سكر الدم > 200–250 mg/dL (أو < 200 في euDKA)، (2) ارتفاع بيتا هيدروكسي بيوتيرات بالمصل >= 3.0 mmol/L، و(3) حماض استقلابي مرتفع الفجوة الأنيونية (Anion Gap > 12 mEq/L) ويُصنف إلى خفيف (pH 7.25–7.30، بيكربونات 15–18)، ومتوسط (pH 7.00–7.24، بيكربونات 10–<15)، وشديد (pH < 7.00، بيكربونات < 10 mEq/L).',
    generationMethod: 'verbatim_extraction',
    statementType: 'diagnostic_criterion',
    population: 'adults',
    recommendationStrength: 'ADA Diagnostic Standard',
    evidenceLevel: 'Class I, Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-diagnostic-triad-severity-ph-bicarbonate-anion-gap-bhb',
    citations: [
      {
        id: 'cit-dka-diag-1a',
        knowledgeStatementId: 'stmt-dka-diag-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 5.0: Diagnostic Triad & Severity Stratification',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Serum Bicarbonate: <= 18 mEq/L (Mild: 15-18; Moderate: 10 to < 15; Severe: < 10 mEq/L). Arterial pH: <= 7.30 (Mild: 7.25-7.30; Moderate: 7.00 to < 7.24; Severe: < 7.00). Anion Gap Formula: Na - (Cl + HCO3).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-diag-1b',
        knowledgeStatementId: 'stmt-dka-diag-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Diabetic Ketoacidosis (DKA) is characterized by the triad of hyperglycemia (BG >200–250 mg/dL, or euglycemic in SGLT2i-associated DKA), high-anion-gap metabolic acidosis (arterial pH <7.30, serum HCO3- <18 mEq/L, Anion Gap >12 mEq/L), and ketonemia (beta-hydroxybutyrate >=3.0 mmol/L).',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-diag-1c',
        knowledgeStatementId: 'stmt-dka-diag-1',
        sourceId: 'clinical-casebook-guide',
        monographChapterId: 'casebook-section2-syndrome-checklists',
        monographSectionId: 'cb2-s3',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Section II: Disease-Specific Bedside Intake Checklists',
        sectionReference: 'Section 2.3: DKA Mandatory Data Extraction',
        pageRange: 'pp. 49–128',
        verbatimExcerpt:
          'Verify the Triad & Electrolytes: Blood Glucose, Arterial/Venous pH (<7.30), Serum Bicarbonate (<18 mEq/L), Anion Gap (>12 mEq/L; Na − [Cl + HCO3]), Serum Beta-hydroxybutyrate, Measured & Corrected Serum Sodium, and Baseline Serum Potassium.',
        sourceLocationUri: 'local://ref/verbatim/clinical-casebook-guide/casebook-section2-syndrome-checklists/cb2-s3',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 7: investigations_workup
  {
    id: 'stmt-dka-workup-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:investigations_workup',
    sectionKey: 'investigations_workup',
    statementOrder: 1,
    verbatimSourceText:
      'Calculate serum sodium corrected for hyperglycemia: Corrected Na = Measured Na + [0.016 * (Glucose - 100)]. Anion Gap Formula: Na - (Cl + HCO3). Normal anion gap is 8 to 12 mEq/L. Always measure serum beta-hydroxybutyrate and blood gases in unwell patients on SGLT2 inhibitors.',
    statementTextEn:
      'Mandatory DKA bedside calculations include: (1) Corrected Serum Sodium = Measured Na+ + [0.016 × (Serum Glucose in mg/dL − 100)] to guide 0.45% vs 0.9% NaCl selection after Hour 1; and (2) Anion Gap = Measured Na+ − (Cl− + HCO3−) (normal 8–12 mEq/L) to track ketoacidosis resolution.',
    statementTextAr:
      'تشمل المعادلات السريرية الإلزامية في DKA: (1) الصوديوم المصحح لفرط السكر = الصوديوم المقاس + [0.016 × (سكر الدم mg/dL − 100)] لتحديد نوع المحلول الوريدي بعد الساعة الأولى؛ و(2) الفجوة الأنيونية = Na − (Cl + HCO3) (الطبيعي 8–12 mEq/L) لمتابعة إغلاق الحماض الكيتوني.',
    generationMethod: 'verbatim_extraction',
    statementType: 'lab_or_imaging_finding',
    population: 'all',
    recommendationStrength: 'Mandatory Bedside Equation',
    evidenceLevel: 'ADA Standard of Care',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-equations-corrected-sodium-0.016-anion-gap-formula',
    citations: [
      {
        id: 'cit-dka-workup-1a',
        knowledgeStatementId: 'stmt-dka-workup-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec7',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 7.0: Fluid Resuscitation',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Hours 2+: Calculate serum sodium corrected for hyperglycemia: Corrected Na = Measured Na + [0.016 * (Glucose - 100)].',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-workup-1b',
        knowledgeStatementId: 'stmt-dka-workup-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Subsequently adjust to 0.45% NaCl or 0.9% NaCl at 250–500 mL/h based on corrected serum sodium: Corrected Na+ = Measured Na+ + [0.016 × (Serum Glucose − 100)].',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 9 & 10: treatment_management & therapeutic_protocols
  {
    id: 'stmt-dka-tx-fluids-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:treatment_management',
    sectionKey: 'treatment_management',
    statementOrder: 1,
    verbatimSourceText:
      'FLUID RESUSCITATION: Hour 1: 0.9% Normal Saline at 1000 to 1500 mL/hr (15-20 mL/kg/hr) to restore effective circulating intravascular volume. Hours 2+: Calculate serum sodium corrected for hyperglycemia: Corrected Na = Measured Na + [0.016 * (Glucose - 100)]. If corrected Na is normal or elevated (>= 135 mEq/L): Switch to 0.45% NaCl at 250 to 500 mL/hr. If corrected Na is low (< 135 mEq/L): Continue 0.9% NaCl at 250 to 500 mL/hr.',
    statementTextEn:
      'Step 1 Intravascular Volume Resuscitation: Infuse isotonic 0.9% NaCl (or balanced crystalloid) at 1000–1500 mL/hr (15–20 mL/kg/hr) during Hour 1. From Hour 2 onward, if Corrected Na+ is >= 135 mEq/L (normal/elevated), switch to 0.45% NaCl at 250–500 mL/hr; if Corrected Na+ is < 135 mEq/L, continue 0.9% NaCl at 250–500 mL/hr.',
    statementTextAr:
      'الخطوة الأولى (إنعاش الحجم داخل الأوعية): تسريب محلول ملحي متساوي التوتر 0.9% NaCl بمعدل 1000–1500 مل/ساعة (15–20 مل/كجم/ساعة) خلال الساعة الأولى. بدءاً من الساعة الثانية، إذا كان الصوديوم المصحح >= 135 mEq/L يُحول إلى 0.45% NaCl بمعدل 250–500 مل/ساعة، وإذا كان < 135 mEq/L يُستمر على 0.9% NaCl بمعدل 250–500 مل/ساعة.',
    generationMethod: 'verbatim_extraction',
    statementType: 'therapeutic_recommendation',
    population: 'adults',
    recommendationStrength: 'Class I',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-fluid-resuscitation-hour1-1000-1500ml-corrected-na-135-rule',
    citations: [
      {
        id: 'cit-dka-tx-fluids-1a',
        knowledgeStatementId: 'stmt-dka-tx-fluids-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec7',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 7.0: Fluid Resuscitation',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Hour 1: 0.9% Normal Saline at 1000 to 1500 mL/hr (15-20 mL/kg/hr) to restore effective circulating intravascular volume... If corrected Na is normal or elevated (>= 135 mEq/L): Switch to 0.45% NaCl at 250 to 500 mL/hr. If corrected Na is low (< 135 mEq/L): Continue 0.9% NaCl at 250 to 500 mL/hr.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-tx-fluids-1b',
        knowledgeStatementId: 'stmt-dka-tx-fluids-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          '1. Intravascular Volume Resuscitation: Administer isotonic crystalloid (0.9% NaCl or balanced crystalloid) at 15–20 mL/kg (1000–1500 mL) during Hour 1.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  {
    id: 'stmt-dka-proto-kgate-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    statementOrder: 1,
    verbatimSourceText:
      'MANDATORY ACTION ALGORITHM: Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L. Only then may insulin be safely started. Serum Potassium 3.3 to 5.2 mEq/L: Initiate regular insulin infusion and add 20 to 30 mEq potassium per liter of IV fluid to maintain serum potassium between 4.0 and 5.0 mEq/L. Serum Potassium > 5.2 mEq/L: Do NOT add potassium to IV fluids. Recheck BMP every 2 hours; add potassium once levels drop below 5.2 mEq/L.',
    statementTextEn:
      'Mandatory Potassium Gate Prior to Insulin: (1) If Serum K+ < 3.3 mEq/L: STRICTLY HOLD ALL INSULIN and infuse IV KCl at 20–40 mEq/hr until K+ >= 3.3 mEq/L to prevent lethal hypokalemic cardiac arrest and respiratory muscle paralysis; (2) If K+ is 3.3–5.2 mEq/L: start IV insulin and add 20–30 mEq KCl per Liter of IV fluid to maintain K+ 4.0–5.0 mEq/L; (3) If K+ > 5.2 mEq/L: start IV insulin without KCl and recheck K+ every 2 hours.',
    statementTextAr:
      'بوابة البوتاسيوم الإلزامية قبل الإنسولين: (1) إذا كان البوتاسيوم < 3.3 mEq/L: يُحظر بدء الإنسولين تماماً ويُسرب كلوريد البوتاسيوم 20–40 mEq/ساعة حتى يصل K+ >= 3.3 mEq/L لمنع الرجفان البطيني وتوقف القلب؛ (2) إذا كان 3.3–5.2 mEq/L: يبدأ الإنسولين الوريدي مع إضافة 20–30 mEq بوتاسيوم لكل لتر سوائل للحفاظ على البوتاسيوم بين 4.0–5.0 mEq/L؛ (3) إذا كان > 5.2 mEq/L: يبدأ الإنسولين دون بوتاسيوم ويُعاد الفحص كل ساعتين.',
    clinicianReviewedNoteEn:
      'Cross-check with Hospital Compendium Section 2.0: rates > 10 mEq/hr require central venous access (or dual peripheral lines <= 10 mEq/hr each) and continuous ECG telemetry.',
    clinicianReviewedNoteAr:
      'تنبيه سلامة من موسوعة جرعات المستشفى (القسم 2.0): معدلات تسريب البوتاسيوم > 10 mEq/ساعة تتطلب قسطرة وريد مركزي (أو خطين محيطيين منفصلين <= 10 mEq/ساعة لكل خط) مع مراقبة تخطيط القلب المستمرة.',
    reviewedBySpecialist: 'Critical Care Pharmacy Safety Committee',
    reviewedAt: '2026-11-01T06:40:00Z',
    generationMethod: 'verbatim_extraction',
    statementType: 'protocol_step',
    clinicalContext: 'Pre-Insulin Serum Potassium Stratification (< 3.3 vs 3.3–5.2 vs > 5.2 mEq/L)',
    population: 'all',
    recommendationStrength: 'Class I Life-Saving Mandate',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'conflicting_evidence',
    conflictGroupId: 'conflict-dka-kcl-route-ceiling',
    normalizedFingerprint: 'dka-potassium-gate-hold-insulin-below-3.3-meq-l',
    citations: [
      {
        id: 'cit-dka-kgate-1a',
        knowledgeStatementId: 'stmt-dka-proto-kgate-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec6',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 6.0: DKA Potassium Precondition: The Mandatory K+ > 3.3 Rule Before Insulin',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-kgate-1b',
        knowledgeStatementId: 'stmt-dka-proto-kgate-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1: Mandatory Serum Potassium Gate',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Serum K+ <3.3 mEq/L: STRICTLY HOLD INSULIN. Administer KCl 20–40 mEq/hour IV until serum K+ >=3.3 mEq/L.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-kgate-1c',
        knowledgeStatementId: 'stmt-dka-proto-kgate-1',
        sourceId: 'hospital-compendium',
        monographChapterId: 'hospital-compendium-protocols',
        monographSectionId: 'hosp-sec2',
        edition: '2026 Inpatient Hospital Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'Hospital Clinical Dosing Compendium',
        sectionReference: 'Section 2.0: Potassium Chloride Replacement Protocol: Peripheral vs Central Constraints',
        pageRange: 'pp. 1–92',
        verbatimExcerpt:
          'Peripheral Intravenous Infusion Limits: Maximum Infusion Rate: 10 mEq/hour. Maximum Peripheral Concentration: 40 mEq/L. Central Venous Catheter (CVC) Infusion Limits: Maximum Infusion Rate: 20 mEq/hour.',
        sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2',
        citationRole: 'dosing_safety_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 11: pharmacotherapy_dosing (Regular Insulin + Dextrose Clamp + Electrolytes)
  {
    id: 'stmt-dka-insulin-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:pharmacotherapy_dosing',
    sectionKey: 'pharmacotherapy_dosing',
    statementOrder: 1,
    verbatimSourceText:
      'REGULAR INSULIN INFUSION PROTOCOL: Infusion Regimen: Continuous IV infusion of Regular Insulin at 0.1 units/kg/hr (an initial IV bolus of 0.1 units/kg is optional; or 0.14 units/kg/hr without initial bolus). Target Glucose Velocity: Blood glucose should drop by 50 to 75 mg/dL per hour. If glucose fails to decline by 50 mg/dL in the first hour, verify IV patency, double the insulin infusion rate, and recheck BMP. The 200 mg/dL Rule: When blood glucose drops to 200 mg/dL (<=200–250 mg/dL in DiPiro), DO NOT STOP INSULIN. Add 5% Dextrose to IV fluids (D5 0.45% NaCl) and decrease insulin rate to 0.02 to 0.05 units/kg/hr.',
    statementTextEn:
      'Once Serum K+ is confirmed >= 3.3 mEq/L, initiate continuous IV Regular Insulin at 0.1 units/kg/hr (or 0.14 units/kg/hr without bolus), targeting a glucose decline of 50–75 mg/dL/hr (double infusion rate if BG drops < 50 mg/dL in Hour 1). When BG reaches 200 mg/dL (ACCP) or <= 200–250 mg/dL (DiPiro), add D5W to IV fluids and reduce Regular Insulin to 0.02–0.05 units/kg/hr to maintain BG 150–200 mg/dL while closing the Anion Gap.',
    statementTextAr:
      'بعد التأكد من أن البوتاسيوم >= 3.3 mEq/L، يبدأ التسريب الوريدي المستمر للإنسولين النظامي (Regular Insulin) بمعدل 0.1 وحدة/كجم/ساعة (أو 0.14 وحدة/كجم/ساعة بدون دفعة أولى) بهدف خفض السكر 50–75 mg/dL بالساعة. وعند وصول السكر إلى 200 mg/dL (وفق ACCP) أو <= 200–250 mg/dL (وفق DiPiro)، يُضاف الدكستروز 5% للسوائل ويُخفض الإنسولين إلى 0.02–0.05 وحدة/كجم/ساعة للحفاظ على السكر بين 150–200 mg/dL حتى إغلاق الفجوة الأنيونية.',
    generationMethod: 'verbatim_extraction',
    statementType: 'dosing_rule',
    population: 'adults',
    recommendationStrength: 'Class I',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'conflicting_evidence',
    conflictGroupId: 'conflict-dka-dextrose-threshold',
    normalizedFingerprint: 'dka-regular-insulin-0.1-u-kg-hr-d5w-addition-0.02-0.05-clamp',
    citations: [
      {
        id: 'cit-dka-insulin-1a',
        knowledgeStatementId: 'stmt-dka-insulin-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec7',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 7.0: Regular Insulin Infusion Protocol',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Infusion Regimen: Continuous IV infusion of Regular Insulin at 0.1 units/kg/hr... When blood glucose drops to 200 mg/dL, DO NOT STOP INSULIN. Add 5% Dextrose to IV fluids (D5 0.45% NaCl) and decrease insulin rate to 0.02 to 0.05 units/kg/hr.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-insulin-1b',
        knowledgeStatementId: 'stmt-dka-insulin-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Administer Regular Insulin 0.1 units/kg/hour IV continuous infusion (or 0.1 units/kg bolus followed by 0.1 units/kg/h). When blood glucose reaches <=200–250 mg/dL, ADD D5W (D5W + 0.45% NaCl) to IV fluids and reduce insulin infusion to 0.02–0.05 units/kg/h.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'conflicting_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  {
    id: 'stmt-dka-electrolytes-mg-po4',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:pharmacotherapy_dosing',
    sectionKey: 'pharmacotherapy_dosing',
    statementOrder: 2,
    verbatimSourceText:
      'Hypokalemia refractory to aggressive potassium supplementation is almost invariably driven by concomitant uncorrected hypomagnesemia. Magnesium is an essential cofactor for the Na+/K+ ATPase pump; hypomagnesemia permits uninhibited renal potassium wasting via the ROMK channels. ALWAYS check and correct magnesium first. Intravenous phosphate must always be ordered in millimoles (mmol) of phosphate, NOT in milligrams or ampuls. Potassium Phosphate: 1 mmol of phosphate provides 1.47 mEq of Potassium (K+) (~4.4 mEq K+ per 3 mmol PO4). Do NOT exceed a phosphate infusion rate of 7 mmol/hour to avoid acute hypocalcemia.',
    statementTextEn:
      'Concomitant Electrolyte Replacement Rules: (1) Refractory hypokalemia in DKA requires checking and correcting Magnesium (MgSO4 1–2 g IV over 1–2 hours) to restore ROMK channel inhibition; (2) Severe hypophosphatemia (< 1.0–1.9 mg/dL) must be ordered strictly in millimoles (0.16–0.64 mmol/kg IV over 4–8 hours, max rate 7 mmol/hr), accounting for 4.4 mEq of K+ delivered per 3 mmol of Potassium Phosphate.',
    statementTextAr:
      'قواعد تعويض الشوارد المرافقة: (1) نقص البوتاسيوم المعند يتطلب فحص وتعويض المغنيسيوم أولاً (MgSO4 1–2 غ وريدياً خلال 1–2 ساعة) لإغلاق قنوات ROMK الكلوية؛ (2) يُطلب الفوسفات الوريدي بوحدة الملي مول حصراً (0.16–0.64 mmol/kg خلال 4–8 ساعات، بحد أقصى 7 mmol/ساعة) مع حساب أن كل 3 mmol من فوسفات البوتاسيوم تعطي 4.4 mEq من البوتاسيوم.',
    generationMethod: 'verbatim_extraction',
    statementType: 'dosing_rule',
    population: 'adults',
    recommendationStrength: 'ISMP & ASPEN Safety Standard',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'dka-electrolyte-magnesium-romk-phosphate-mmol-ordering-ceiling',
    citations: [
      {
        id: 'cit-dka-mg-po4-1',
        knowledgeStatementId: 'stmt-dka-electrolytes-mg-po4',
        sourceId: 'hospital-compendium',
        monographChapterId: 'hospital-compendium-protocols',
        monographSectionId: 'hosp-sec3',
        edition: '2026 Inpatient Hospital Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'Hospital Clinical Dosing Compendium',
        sectionReference: 'Sections 3.0 & 4.0: Magnesium Sulfate & Phosphate Replacement Protocols',
        pageRange: 'pp. 1–92',
        verbatimExcerpt:
          'Renal Outer Medullary Potassium (ROMK) channels in the distal nephron are normally inhibited by intracellular magnesium ions... Mandatory Unit of Ordering: Orders must be entered strictly in millimoles (mmol) of phosphate... Do NOT exceed a phosphate infusion rate of 7 mmol/hour.',
        sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 16: discharge_criteria (DKA Resolution & SubQ Overlap)
  {
    id: 'stmt-dka-resolution-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:discharge_criteria',
    sectionKey: 'discharge_criteria',
    statementOrder: 1,
    verbatimSourceText:
      'ADA DKA RESOLUTION CRITERIA: DKA is defined as resolved ONLY when all of the following criteria are achieved: 1. Blood glucose < 200 mg/dL (11.1 mmol/L); AND 2. Serum bicarbonate (HCO3) >= 15 mEq/L; AND 3. Venous blood pH > 7.30; AND 4. Normalization of the anion gap (Anion Gap <= 12 mEq/L). The Mandatory 2-Hour (2 to 4 Hours in DiPiro) Basal Overlap Rule: Half-life of intravenous regular insulin is exceptionally short: approximately 5 to 9 minutes. When transitioning from IV insulin to subcutaneous maintenance therapy, long-acting basal insulin (Glargine, Detemir, or Degludec) MUST be administered subcutaneously at least 2 hours (2 to 4 hours) BEFORE stopping the IV insulin infusion.',
    statementTextEn:
      'DKA Resolution & Transition Criteria: Confirm BG < 200 mg/dL PLUS closure of the Anion Gap (<= 12 mEq/L), venous pH > 7.30, and serum HCO3- >= 15 mEq/L. Because IV regular insulin has a 5–9 minute half-life, subcutaneous long-acting basal insulin (Glargine, Detemir, or Degludec) MUST be injected at least 2 hours (ACCP) to 2–4 hours (DiPiro/Casebook) BEFORE turning off the IV insulin infusion to prevent immediate rebound ketoacidosis.',
    statementTextAr:
      'معايير شفاء DKA والانتقال للحقن تحت الجلد: يشترط انخفاض السكر < 200 mg/dL مع إغلاق الفجوة الأنيونية (Anion Gap <= 12 mEq/L)، وارتفاع pH الوريدي > 7.30، والبيكربونات >= 15 mEq/L. ونظراً لأن نصف عمر الإنسولين الوريدي هو 5–9 دقائق فقط، يجب حقن الإنسولين القاعدي تحت الجلد (Glargine أو Detemir أو Degludec) قبل ساعتين على الأقل (ACCP) أو 2–4 ساعات (DiPiro ودليل الحالات) من إيقاف مضخة الإنسولين الوريدي لمنع انتكاس الحماض الفوري.',
    generationMethod: 'verbatim_extraction',
    statementType: 'discharge_transition_rule',
    population: 'all',
    recommendationStrength: 'Class I Mandatory Transition Gate',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'conflicting_evidence',
    conflictGroupId: 'conflict-dka-basal-overlap',
    normalizedFingerprint: 'dka-resolution-criteria-ag-12-ph-7.30-hco3-15-basal-overlap-2-4h',
    citations: [
      {
        id: 'cit-dka-res-1a',
        knowledgeStatementId: 'stmt-dka-resolution-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec7',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Sections 7.0 & 8.0: ADA DKA Resolution Criteria & 2-Hour Basal Overlap',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'DKA is defined as resolved ONLY when all of the following criteria are achieved: 1. Blood glucose < 200 mg/dL; 2. Serum bicarbonate (HCO3) >= 15 mEq/L; 3. Venous blood pH > 7.30; 4. Normalization of the anion gap (Anion Gap <= 12 mEq/L).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-res-1b',
        knowledgeStatementId: 'stmt-dka-resolution-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1: Subcutaneous Basal Insulin Transition Rule',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Administer subcutaneous long-acting basal insulin (Insulin Glargine or Detemir) at least 2 to 4 HOURS BEFORE stopping the IV regular insulin infusion to prevent rebound ketoacidosis.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'conflicting_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-res-1c',
        knowledgeStatementId: 'stmt-dka-resolution-1',
        sourceId: 'clinical-casebook-guide',
        monographChapterId: 'casebook-section2-syndrome-checklists',
        monographSectionId: 'cb2-s3',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Section II: Syndrome-Specific Bedside Workup Checklists',
        sectionReference: 'Section 2.3 & Board Pearls',
        pageRange: 'pp. 49–128',
        verbatimExcerpt:
          'Never turn off the IV insulin drip until the Anion Gap is <=12 mEq/L AND subcutaneous basal insulin was given 2–4 hours prior.',
        sourceLocationUri: 'local://ref/verbatim/clinical-casebook-guide/casebook-section2-syndrome-checklists/cb2-s3',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 6: clinical_presentation
  {
    id: 'stmt-dka-pres-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:clinical_presentation',
    sectionKey: 'clinical_presentation',
    statementOrder: 1,
    verbatimSourceText:
      'Osmotic Diuresis: Hyperglycemia exceeds the renal tubular absorptive threshold (~180 mg/dL), provoking massive glucosuria, osmotic diuresis, and electrolyte wasting (losses of 5-7 Liters of water, 400-700 mEq sodium, and 200-400 mEq potassium). Severe volume depletion (5 to 7 Liters deficit in adults).',
    statementTextEn:
      'Adult DKA patients present with profound intravascular and total-body volume depletion (5 to 7 Liters water deficit), sodium depletion (400–700 mEq deficit), and total-body potassium depletion (200–500 mEq deficit) secondary to osmotic glucosuria.',
    statementTextAr:
      'يتظاهر مرضى الحماض الكيتوني السكري البالغون بتجفاف شديد ونقص حجم داخل الأوعية (عجز مائي بـ 5 إلى 7 لترات)، وعجز صوديوم (400–700 mEq)، وعجز بوتاسيوم كلي (200–500 mEq) نتيجة الإدرار التناضحي.',
    generationMethod: 'verbatim_extraction',
    statementType: 'clinical_presentation',
    population: 'adults',
    evidenceLevel: 'ADA Class I',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'dka-clinical-presentation-volume-depletion-5-7-liters-electrolyte-deficits',
    citations: [
      {
        id: 'cit-dka-pres-1',
        knowledgeStatementId: 'stmt-dka-pres-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 5.0: Osmotic Diuresis',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Osmotic Diuresis: Hyperglycemia exceeds the renal tubular absorptive threshold (~180 mg/dL), provoking massive glucosuria, osmotic diuresis, and electrolyte wasting (losses of 5-7 Liters of water, 400-700 mEq sodium, and 200-400 mEq potassium).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 8: differential_diagnosis
  {
    id: 'stmt-dka-diff-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:differential_diagnosis',
    sectionKey: 'differential_diagnosis',
    statementOrder: 1,
    verbatimSourceText:
      'In HHS, add D5W when BG reaches 250–300 mg/dL and maintain BG 250–300 mg/dL until plasma osmolality <315 mOsm/kg and patient is mentally alert. SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis).',
    statementTextEn:
      'Differentiate classic hyperglycemic DKA from: (1) Hyperosmolar Hyperglycemic State (HHS — characterized by severe hyperosmolality >= 315–320 mOsm/kg with minimal/absent ketonemia, where D5W is added at BG 250–300 mg/dL), and (2) Euglycemic DKA (euDKA — BG < 200–250 mg/dL with high-anion-gap metabolic acidosis and beta-hydroxybutyrate >= 3.0 mmol/L in patients on SGLT2 inhibitors or during pregnancy).',
    statementTextAr:
      'يجب تفريق DKA الكلاسيكي عن: (1) حالة فرط الأسمولية وفرط السكر (HHS — تتميز بفرط أسمولية شديد >= 315–320 mOsm/kg دون حماض كيتوني يُذكر، ويُضاف فيها الدكستروز عند سكر 250–300 mg/dL)، و(2) الحماض الكيتوني سوي السكر (euDKA — سكر الدم < 200–250 mg/dL مع حماض مرتفع الفجوة الأنيونية وبيتا هيدروكسي بيوتيرات >= 3.0 mmol/L لدى مستخدمي مثبطات SGLT2 أو الحوامل).',
    generationMethod: 'verbatim_extraction',
    statementType: 'differential_diagnosis',
    population: 'adults',
    evidenceLevel: 'ADA Standard of Care',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-differential-diagnosis-hhs-osmolality-315-vs-eudka-sglt2i',
    citations: [
      {
        id: 'cit-dka-diff-1a',
        knowledgeStatementId: 'stmt-dka-diff-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA), HHS & Inpatient Glycemic Control',
        sectionReference: 'Section 6.1: DKA vs HHS Glucose Clamp',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'In HHS, add D5W when BG reaches 250–300 mg/dL and maintain BG 250–300 mg/dL until plasma osmolality <315 mOsm/kg and patient is mentally alert.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-diff-1b',
        knowledgeStatementId: 'stmt-dka-diff-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec8',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 8.0: Euglycemic DKA (euDKA)',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 12: organ_dose_adjustment
  {
    id: 'stmt-dka-organ-adj-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:organ_dose_adjustment',
    sectionKey: 'organ_dose_adjustment',
    statementOrder: 1,
    verbatimSourceText:
      'High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day. Metformin: Hold in all hospitalized patients with AKI, eGFR <30 mL/min/1.73m2, sepsis, hypoxia, shock, acute heart failure, or prior to iodinated IV contrast (risk of Metformin-Associated Lactic Acidosis [MALA]).',
    statementTextEn:
      'Renal & Hepatic Dosing Rules in DKA / Inpatient Hyperglycemia: (1) Upon transitioning resolved DKA patients with renal impairment (eGFR < 30–45 mL/min), hepatic disease, or age >= 70 years to subcutaneous basal-bolus insulin, reduce Total Daily Dose (TDD) from 0.4–0.5 units/kg/day down to 0.2–0.3 units/kg/day; (2) Strictly HOLD Metformin in AKI, eGFR < 30 mL/min, sepsis, shock, or prior to IV iodinated contrast to prevent lactic acidosis (MALA).',
    statementTextAr:
      'قواعد تعديل الجرعات في القصور الكلوي والكبدي: (1) عند تحويل مريض DKA بعد الشفاء إلى الإنسولين تحت الجلد بوجود قصور كلوي (eGFR < 30–45 مل/د) أو مرض كبدي أو عمر >= 70 سنة، تُخفض الجرعة الكلية اليومية (TDD) من 0.4–0.5 إلى 0.2–0.3 وحدة/كجم/يوم لمنع هبوط السكر؛ (2) يُوقف الميتفورمين فوراً في القصور الكلوي الحاد أو eGFR < 30 أو الصدمة لمنع الحماض اللبني (MALA).',
    generationMethod: 'verbatim_extraction',
    statementType: 'organ_adjustment_rule',
    population: 'renal_impairment',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-organ-adjustment-renal-hepatic-tdd-0.2-0.3-hold-metformin-mala',
    citations: [
      {
        id: 'cit-dka-organ-1a',
        knowledgeStatementId: 'stmt-dka-organ-adj-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-2026-v2-c5',
        monographSectionId: 'v2c5-s2',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Chapter 15: Diabetes Mellitus: Outpatient Phenotype-Guided Therapy & Inpatient Glycemic Management',
        sectionReference: 'Section 15.2: Inpatient Glycemic Control',
        pageRange: 'pp. 2-219 to 2-274',
        verbatimExcerpt:
          'High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-organ-1b',
        knowledgeStatementId: 'stmt-dka-organ-adj-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec2',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.2: Oral Antidiabetic Hold Rules',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Metformin: Hold in all hospitalized patients with AKI, eGFR <30 mL/min/1.73m2, sepsis, hypoxia, shock, acute heart failure, or prior to iodinated IV contrast (risk of Metformin-Associated Lactic Acidosis [MALA]).',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 13: monitoring_followup
  {
    id: 'stmt-dka-mon-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:monitoring_followup',
    sectionKey: 'monitoring_followup',
    statementOrder: 1,
    verbatimSourceText:
      'Target Glucose Velocity: Blood glucose should drop by 50 to 75 mg/dL per hour. Recheck BMP every 2 hours; add potassium once levels drop below 5.2 mEq/L. Verify the Triad & Electrolytes: Blood Glucose, Arterial/Venous pH (<7.30), Serum Bicarbonate (<18 mEq/L), Anion Gap (>12 mEq/L; Na − [Cl + HCO3]), Serum Beta-hydroxybutyrate, Measured & Corrected Serum Sodium, and Baseline Serum Potassium.',
    statementTextEn:
      'DKA Intensive Monitoring Schedule: (1) Point-of-care Blood Glucose every 1 hour during IV insulin infusion (target decline 50–75 mg/dL/hr); (2) Basic Metabolic Panel (Serum K+, Na+, Cl-, HCO3-, Anion Gap, SCr) and venous pH every 2 to 4 hours; (3) Continuous ECG telemetry whenever IV KCl is infused > 10 mEq/hr.',
    statementTextAr:
      'جدول المراقبة اللصيقة في DKA: (1) فحص سكر الدم كل ساعة أثناء تسريب الإنسولين الوريدي (بهدف خفض 50–75 mg/dL/ساعة)؛ (2) فحص الكهارل الكاملة (البوتاسيوم، الصوديوم، الكلوريد، البيكربونات، الفجوة الأنيونية، الكرياتينين) وغازات الدم الوريدية كل 2 إلى 4 ساعات؛ (3) مراقبة تخطيط القلب المستمرة عند تسريب البوتاسيوم بمعدل > 10 mEq/ساعة.',
    generationMethod: 'verbatim_extraction',
    statementType: 'monitoring_parameter',
    population: 'all',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-monitoring-hourly-glucose-q2h-bmp-anion-gap-potassium-telemetry',
    citations: [
      {
        id: 'cit-dka-mon-1a',
        knowledgeStatementId: 'stmt-dka-mon-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec7',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Sections 6.0 & 7.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Target Glucose Velocity: Blood glucose should drop by 50 to 75 mg/dL per hour... Recheck BMP every 2 hours.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-mon-1b',
        knowledgeStatementId: 'stmt-dka-mon-1',
        sourceId: 'clinical-casebook-guide',
        monographChapterId: 'casebook-section2-syndrome-checklists',
        monographSectionId: 'cb2-s3',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Section II: Syndrome-Specific Bedside Workup Checklists',
        sectionReference: 'Section 2.3: DKA Workup',
        pageRange: 'pp. 49–128',
        verbatimExcerpt:
          'Verify the Triad & Electrolytes: Blood Glucose, Arterial/Venous pH (<7.30), Serum Bicarbonate (<18 mEq/L), Anion Gap (>12 mEq/L; Na − [Cl + HCO3]), Serum Beta-hydroxybutyrate, Measured & Corrected Serum Sodium, and Baseline Serum Potassium.',
        sourceLocationUri: 'local://ref/verbatim/clinical-casebook-guide/casebook-section2-syndrome-checklists/cb2-s3',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 14: complications
  {
    id: 'stmt-dka-comp-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:complications',
    sectionKey: 'complications',
    statementOrder: 1,
    verbatimSourceText:
      'CRITICAL WARNING: If a clinician administers intravenous insulin to a DKA patient whose baseline serum potassium is < 3.3 mEq/L, the rapid intracellular shift of potassium will precipitate severe, life-threatening hypokalemia (< 2.5 mEq/L), triggering ventricular fibrillation, torsades de pointes, respiratory muscle paralysis, and cardiac arrest. Failure to provide this 2-hour subcutaneous overlap results in an immediate precipitous drop in serum insulin to zero, triggering rapid rebound lipolysis, ketogenesis, and recurrent DKA within hours.',
    statementTextEn:
      'Critical Iatrogenic Complications of DKA Management: (1) Lethal Hypokalemic Arrhythmias (VFib, Torsades de Pointes, respiratory muscle paralysis) if IV insulin is started when Serum K+ < 3.3 mEq/L; (2) Rebound Ketoacidosis within hours if IV regular insulin is stopped without a >= 2–4 hour subcutaneous basal insulin overlap or if insulin is stopped prematurely when BG reaches 200 mg/dL before Anion Gap closure; (3) Hypoglycemia and Cerebral Edema from overly rapid osmolality/glucose drop without D5W clamping.',
    statementTextAr:
      'المضاعفات الخطيرة علاجية المنشأ في تدبير DKA: (1) اضطرابات النظم القاتلة (الرجفان البطيني، Torsades، وشلل عضلات التنفس) عند بدء الإنسولين الوريدي وبوتاسيوم المصل < 3.3 mEq/L؛ (2) انتكاس الحماض الكيتوني الحاد خلال ساعات عند إيقاف مضخة الإنسولين الوريدي دون تداخل مسبق بـ 2–4 ساعات مع الإنسولين القاعدي تحت الجلد؛ (3) هبوط السكر والوذمة الدماغية عند عدم إضافة الدكستروز D5W عند عتبة 200–250 mg/dL.',
    generationMethod: 'verbatim_extraction',
    statementType: 'complication_hazard',
    population: 'all',
    recommendationStrength: 'Boxed Clinical Safety Warning',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'dka-complications-hypokalemic-cardiac-arrest-rebound-ketoacidosis-cerebral-edema',
    citations: [
      {
        id: 'cit-dka-comp-1',
        knowledgeStatementId: 'stmt-dka-comp-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec6',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Sections 6.0 & 8.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'CRITICAL WARNING: If a clinician administers intravenous insulin to a DKA patient whose baseline serum potassium is < 3.3 mEq/L, the rapid intracellular shift of potassium will precipitate severe, life-threatening hypokalemia (< 2.5 mEq/L), triggering ventricular fibrillation, torsades de pointes, respiratory muscle paralysis, and cardiac arrest.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 15: special_populations
  {
    id: 'stmt-dka-specpop-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:special_populations',
    sectionKey: 'special_populations',
    statementOrder: 1,
    verbatimSourceText:
      'Hyperglycemia: Blood glucose > 250 mg/dL (13.9 mmol/L) (can be < 200 mg/dL in euglycemic DKA associated with SGLT2 inhibitors or pregnancy). Hold SGLT2 inhibitors at least 3-4 days prior to major surgeries or during acute medical illnesses. High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day.',
    statementTextEn:
      'Special Populations in DKA: (1) Pregnancy & Surgical/Fasting Patients on SGLT2 Inhibitors: High risk for Euglycemic DKA (BG < 200 mg/dL with severe ketoacidosis); always measure serum beta-hydroxybutyrate and venous blood gases regardless of normal fingerstick glucose, and hold SGLT2i 3–4 days pre-operatively; (2) Older Adults (Age >= 70 years) & CKD (eGFR < 30–45 mL/min): Reduce post-DKA subcutaneous insulin TDD to 0.2–0.3 units/kg/day.',
    statementTextAr:
      'الحالات الخاصة في DKA: (1) الحوامل والمرضى الجراحيون/الصائمون المستخدمون لمثبطات SGLT2: عرضة للحماض الكيتوني سوي السكر (euDKA؛ سكر الدم < 200 mg/dL)، لذا يجب فحص بيتا هيدروكسي بيوتيرات وغازات الدم حتى لو كان السكر طبيعياً، مع إيقاف مثبطات SGLT2 قبل 3–4 أيام من الجراحة؛ (2) كبار السن (>= 70 سنة) ومرضى القصور الكلوي: تُخفض جرعة الإنسولين تحت الجلد بعد الشفاء إلى 0.2–0.3 وحدة/كجم/يوم.',
    generationMethod: 'verbatim_extraction',
    statementType: 'special_population_rule',
    population: 'pregnancy',
    evidenceLevel: 'ADA Standards of Care 2026',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-special-populations-pregnancy-eudka-surgical-sglt2i-hold-elderly-tdd',
    citations: [
      {
        id: 'cit-dka-specpop-1a',
        knowledgeStatementId: 'stmt-dka-specpop-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Sections 5.0 & 8.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Blood glucose > 250 mg/dL (13.9 mmol/L) (can be < 200 mg/dL in euglycemic DKA associated with SGLT2 inhibitors or pregnancy).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-specpop-1b',
        knowledgeStatementId: 'stmt-dka-specpop-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-2026-v2-c5',
        monographSectionId: 'v2c5-s2',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Chapter 15: Diabetes Mellitus',
        sectionReference: 'Section 15.2',
        pageRange: 'pp. 2-219 to 2-274',
        verbatimExcerpt:
          'High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 17: clinical_guidelines
  {
    id: 'stmt-dka-guidelines-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:clinical_guidelines',
    sectionKey: 'clinical_guidelines',
    statementOrder: 1,
    verbatimSourceText:
      'Based on the landmark NICE-SUGAR trial, initiate insulin therapy in hospitalized ICU and non-ICU patients for persistent hyperglycemia >=180 mg/dL, targeting a blood glucose range of 140 to 180 mg/dL. Tighter glycemic targets (<110 mg/dL) are contraindicated due to increased all-cause mortality driven by severe hypoglycemia. Strongly discourage prolonged Sliding-Scale Insulin (SSI) monotherapy.',
    statementTextEn:
      'ADA & NICE-SUGAR Inpatient Glycemic Guidelines: Initiate insulin for persistent inpatient hyperglycemia >= 180 mg/dL targeting a blood glucose range of 140–180 mg/dL across ICU and non-ICU settings; intensive tight targets (80–110 mg/dL) and prolonged Sliding-Scale Insulin (SSI) monotherapy are contraindicated due to severe hypoglycemia and increased mortality.',
    statementTextAr:
      'إرشادات ADA ودراسة NICE-SUGAR لضبط السكر في المستشفى: يبدأ الإنسولين عند استمرار سكر الدم >= 180 mg/dL بهدف الحفاظ عليه بين 140–180 mg/dL في العناية المركزة والأجنحة؛ وتُمنع الأهداف الضيقة جداً (< 110 mg/dL) كما يُمنع الاعتماد على الإنسولين التصحيحي المنفرد (Sliding-Scale Monotherapy).',
    generationMethod: 'verbatim_extraction',
    statementType: 'guideline_recommendation',
    population: 'adults',
    recommendationStrength: 'ADA Class I',
    evidenceLevel: 'Level A (NICE-SUGAR)',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-guidelines-nice-sugar-140-180-avoid-sliding-scale-monotherapy',
    citations: [
      {
        id: 'cit-dka-guide-1a',
        knowledgeStatementId: 'stmt-dka-guidelines-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec2',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.2: Inpatient Glycemic Targets (NICE-SUGAR)',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Based on the landmark NICE-SUGAR trial, initiate insulin therapy in hospitalized ICU and non-ICU patients for persistent hyperglycemia >=180 mg/dL, targeting a blood glucose range of 140 to 180 mg/dL.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-guide-1b',
        knowledgeStatementId: 'stmt-dka-guidelines-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-2026-v2-c5',
        monographSectionId: 'v2c5-s2',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Chapter 15: Diabetes Mellitus',
        sectionReference: 'Section 15.2: Inpatient Glycemic Control',
        pageRange: 'pp. 2-219 to 2-274',
        verbatimExcerpt:
          'Target Blood Glucose Range: 140 to 180 mg/dL for the majority of critically ill (ICU) and non-critically ill hospitalized patients (initiation threshold >=180 mg/dL).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 18: references_evidence
  {
    id: 'stmt-dka-refs-summary-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:references_evidence',
    sectionKey: 'references_evidence',
    statementOrder: 1,
    verbatimSourceText:
      'Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency characterized by absolute or relative insulin deficiency paired with counter-regulatory hormone excess.',
    statementTextEn:
      'This clinical topic is synthesized exclusively from 4 verified in-app references: (1) ACCP Updates in Therapeutics 2026 Vol. 2 (Ch. 8 & Ch. 15, pp. 295–368 & 2-219 to 2-274), (2) DiPiro’s Pharmacotherapy 13th Ed (Ch. 83, pp. 1190–1255), (3) Hospital Clinical Dosing Compendium 2026 (Sec. 2.0–4.0, pp. 1–92), and (4) Pharmacotherapy Casebook & Bedside Workup Guide 13th Ed (Sec. II §2.3, pp. 49–128). Note: Stockley’s Drug Interactions and ACCP Cardiology 2026 do not contain primary DKA resuscitation monographs and are therefore not artificially cited.',
    statementTextAr:
      'تم تجميع هذا الموضوع السريري حصرياً من 4 مراجع موثقة تحتوي فعلياً على بيانات DKA في المكتبة: (1) موسوعة ACCP 2026 المجلد الثاني (الفصل 8 والفصل 15)، (2) مرجع DiPiro الطبعة 13 (الفصل 83)، (3) موسوعة جرعات المستشفى 2026 (الأقسام 2.0–4.0)، و(4) دليل أخذ الحالات السريرية PPCP (القسم 2.3). لم يتم إقحام المراجع الأخرى غير المختصة بـ DKA حفاظاً على الأمانة العلمية.',
    generationMethod: 'pharmacist_curated',
    statementType: 'clinical_pearl',
    population: 'all',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-references-evidence-scope-4-relevant-sources',
    citations: [
      {
        id: 'cit-dka-refs-1',
        knowledgeStatementId: 'stmt-dka-refs-summary-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec5',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 5.0–8.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency characterized by absolute or relative insulin deficiency paired with counter-regulatory hormone excess.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec5',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 19: related_topics
  {
    id: 'stmt-dka-rel-summary-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:related_topics',
    sectionKey: 'related_topics',
    statementOrder: 1,
    verbatimSourceText:
      'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis).',
    statementTextEn:
      'DKA is semantically linked to 5 clinical and pharmacological nodes in the Knowledge Graph: SGLT2 Inhibitors (precipitant of euglycemic DKA), Severe Hypokalemia & IV KCl Safety (electrolyte complication/gate), IV Regular Insulin Infusion (primary therapy), Acute Kidney Injury (prerenal volume deficit & insulin/metformin adjustment), and Heart Failure (shared SGLT2i therapy and fluid resuscitation caution).',
    statementTextAr:
      'يرتبط موضوع الحماض الكيتوني السكري (DKA) دلالياً بـ 5 عقد سريرية ودوائية في شبكة المعرفة: مثبطات SGLT2 (محفز euDKA)، نقص البوتاسيوم الشديد وضوابط KCl الوريدي، بروتوكول الإنسولين النظامي الوريدي، القصور الكلوي الحاد (AKI)، وقصور القلب (الرابط الدوائي عبر مثبطات SGLT2 والحذر في إنعاش السوائل).',
    generationMethod: 'pharmacist_curated',
    statementType: 'clinical_pearl',
    population: 'all',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-related-topics-semantic-graph-summary',
    citations: [
      {
        id: 'cit-dka-rel-1',
        knowledgeStatementId: 'stmt-dka-rel-summary-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec8',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 8.0',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis).',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 20: clinical_pearls_faqs
  {
    id: 'stmt-dka-pearls-1',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:clinical_pearls_faqs',
    sectionKey: 'clinical_pearls_faqs',
    statementOrder: 1,
    verbatimSourceText:
      'When Is Sodium Bicarbonate Indicated? Routine administration of intravenous sodium bicarbonate in DKA is NOT recommended (studies show no clinical benefit and increased risk of hypokalemia, paradoxical CNS acidosis, and delayed ketone clearance). Exception: Administer IV Sodium Bicarbonate ONLY if arterial pH falls < 6.90 (or < 6.9–7.0 with hemodynamic instability).',
    statementTextEn:
      'Bedside FAQ #1 — When is IV Sodium Bicarbonate indicated in DKA? Routine IV Sodium Bicarbonate is NOT recommended when pH >= 6.90–7.00 because it provides no mortality/resolution benefit and worsens hypokalemia and paradoxical CNS acidosis. Reserve IV Sodium Bicarbonate (100 mmol NaHCO3 in 400 mL sterile water + 20 mEq KCl infused over 2 hours) strictly for severe life-threatening acidemia with arterial pH < 6.90.',
    statementTextAr:
      'السؤال السريري الشائع #1 — متى يُعطى بيكربونات الصوديوم الوريدي في DKA؟ لا يُوصى بإعطاء بيكربونات الصوديوم روتينياً عندما يكون pH >= 6.90–7.00 لأنه لا يحسن النتائج ويفاقم نقص البوتاسيوم والحماض التناقضي في الجهاز العصبي المركزي. يُحصر إعطاؤه فقط في الحماض المهدد للحياة عندما ينخفض pH الشرياني إلى < 6.90.',
    generationMethod: 'verbatim_extraction',
    statementType: 'clinical_pearl',
    population: 'adults',
    recommendationStrength: 'Class III (No Benefit if pH >= 6.9) / Class IIb (if pH < 6.9)',
    evidenceLevel: 'ADA Consensus',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'dka-pearl-sodium-bicarbonate-only-when-arterial-ph-below-6.90',
    citations: [
      {
        id: 'cit-dka-pearl-1a',
        knowledgeStatementId: 'stmt-dka-pearls-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-v2-cirrhosis-dka',
        monographSectionId: 'accp-he-sec8',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 8,
        chapterTitle: 'Gastroenterology, Hepatology & Endocrinology: DKA Protocol',
        sectionReference: 'Section 8.0: When Is Sodium Bicarbonate Indicated?',
        pageRange: 'pp. 295–368',
        verbatimExcerpt:
          'Routine administration of intravenous sodium bicarbonate in DKA is NOT recommended... Exception: Administer IV Sodium Bicarbonate ONLY if arterial pH falls < 6.90.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-dka-pearl-1b',
        knowledgeStatementId: 'stmt-dka-pearls-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch83-endocrine-dka',
        monographSectionId: 'dipiro-endo-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 83,
        chapterTitle: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA)',
        sectionReference: 'Section 6.1: Sodium Bicarbonate Threshold',
        pageRange: 'pp. 1190–1255',
        verbatimExcerpt:
          'Sodium Bicarbonate Threshold: Routine IV sodium bicarbonate is NOT recommended in DKA; reserve strictly for severe life-threatening acidemia with arterial pH <6.9.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  }
];

export const DKA_DRUG_DOSING: ClinicalDrugDosing[] = [
  {
    id: 'dosing-dka-regular-insulin-iv',
    drugId: 'drug-regular-insulin',
    drugGenericName: 'Regular Insulin (Human)',
    drugArabicName: 'الإنسولين النظامي البشري (Regular Insulin IV)',
    indicationTopicId: 'topic-dka',
    indicationLabelEn: 'Acute Diabetic Ketoacidosis (DKA) Continuous IV Resuscitation',
    indicationLabelAr: 'التسريب الوريدي المستمر في الحماض الكيتوني السكري الحاد (DKA)',
    population: 'adults',
    regimenPhase: 'continuous_infusion',
    doseDisplay: '0.1 units/kg/hr IV continuous infusion (or 0.14 units/kg/hr without bolus); reduce to 0.02–0.05 units/kg/hr once BG <= 200–250 mg/dL',
    doseMin: 0.02,
    doseMax: 0.14,
    doseUnit: 'units/kg/hr',
    route: 'IV Continuous Infusion',
    frequency: 'Continuous (titrated hourly)',
    durationOrTitrationSchedule:
      'Target BG decline 50–75 mg/dL/hr; continue until Anion Gap <= 12 mEq/L, venous pH > 7.30, HCO3 >= 15 mEq/L, plus 2–4h overlap after SC basal insulin',
    administrationInstructionsEn:
      'Verify Serum K+ >= 3.3 mEq/L before starting. Double rate if BG drops < 50 mg/dL in Hour 1. Add D5W to IV fluids when BG drops to 200 mg/dL (<= 200–250 mg/dL) and reduce infusion to 0.02–0.05 units/kg/hr.',
    administrationInstructionsAr:
      'تحقق من أن بوتاسيوم المصل >= 3.3 mEq/L قبل البدء. ضاعف سرعة التسريب إذا لم ينخفض السكر بمقدار 50 mg/dL في الساعة الأولى. أضف D5W عند وصول السكر إلى 200–250 mg/dL واخفض المعدل إلى 0.02–0.05 وحدة/كجم/ساعة.',
    verbatimDosingExcerpt:
      'Regular Insulin continuous IV infusion at 0.1 units/kg/hr (or 0.14 units/kg/hr without initial bolus). Target glucose decline of 50 to 75 mg/dL per hour... Switch IV fluids to 5% Dextrose with 0.45% NaCl (D5 1/2NS) and reduce insulin infusion to 0.02-0.05 units/kg/hr.',
    sourceId: 'accp-2026-vol2',
    monographChapterId: 'accp-v2-cirrhosis-dka',
    pageRange: 'pp. 295–368',
    sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-dka-insulin-hypokalemia-gate',
        dosingId: 'dosing-dka-regular-insulin-iv',
        drugId: 'drug-regular-insulin',
        topicId: 'topic-dka',
        organSystem: 'hypokalemia_gate',
        parameterName: 'Serum Potassium (K+)',
        thresholdExpression: 'Serum K+ < 3.3 mEq/L',
        actionType: 'hold_or_contraindicated',
        adjustmentInstructionEn:
          'HOLD ALL INSULIN IMMEDIATELY. Infuse IV KCl at 20–40 mEq/hr until Serum K+ >= 3.3 mEq/L before starting insulin.',
        adjustmentInstructionAr:
          'أوقف وامنع إعطاء الإنسولين تماماً! سرّب كلوريد البوتاسيوم وريدياً بمعدل 20–40 mEq/ساعة حتى يرتفع البوتاسيوم إلى >= 3.3 mEq/L.',
        verbatimExcerpt:
          'Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L.',
        sourceId: 'accp-2026-vol2',
        pageRange: 'pp. 295–368',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6'
      }
    ]
  },
  {
    id: 'dosing-dka-insulin-glargine-sc',
    drugId: 'drug-insulin-glargine',
    drugGenericName: 'Insulin Glargine (Basal Subcutaneous Transition)',
    drugArabicName: 'إنسولين غلارجين القاعدي تحت الجلد (مرحلة الانتقال من الوريد)',
    indicationTopicId: 'topic-dka',
    indicationLabelEn: 'Post-DKA Resolution Transition & Inpatient Basal-Bolus Regimen',
    indicationLabelAr: 'الانتقال بعد شفاء DKA ونظام الإنسولين القاعدي والوجبات للمنومين',
    population: 'adults',
    regimenPhase: 'transition_overlap',
    doseDisplay:
      'Total Daily Dose (TDD) 0.4–0.5 units/kg/day (0.2–0.3 units/kg/day if age >= 70 or eGFR < 30–45 mL/min): give 50% as Basal Glargine SC once daily (injected 2–4 hours BEFORE stopping IV insulin)',
    doseMin: 0.2,
    doseMax: 0.5,
    doseUnit: 'units/kg/day (TDD)',
    route: 'Subcutaneous (SC)',
    frequency: 'Once daily (Basal 50% of TDD) + Rapid-acting Prandial 50% divided before 3 meals',
    durationOrTitrationSchedule: 'Inject first SC basal dose 2 to 4 hours prior to stopping IV regular insulin drip',
    administrationInstructionsEn:
      'Administer SC basal insulin at least 2 hours (ACCP) to 2–4 hours (DiPiro) before stopping IV insulin. Target inpatient BG 140–180 mg/dL (NICE-SUGAR).',
    administrationInstructionsAr:
      'يُحقن الإنسولين القاعدي تحت الجلد قبل 2 إلى 4 ساعات من إيقاف مضخة الوريد. هدف السكر للمنومين: 140–180 mg/dL.',
    verbatimDosingExcerpt:
      'Standard Weight-Based TDD: 0.4 to 0.5 units/kg/day. High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day. Give 50% as Long-Acting Basal Insulin (Insulin Glargine or Detemir once daily)...',
    sourceId: 'accp-2026-vol2',
    monographChapterId: 'accp-2026-v2-c5',
    pageRange: 'pp. 2-219 to 2-274',
    sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s2',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-dka-glargine-renal-elderly',
        dosingId: 'dosing-dka-insulin-glargine-sc',
        drugId: 'drug-insulin-glargine',
        topicId: 'topic-dka',
        organSystem: 'renal',
        parameterName: 'eGFR & Age',
        thresholdExpression: 'eGFR < 30–45 mL/min/1.73m2 OR Age >= 70 years',
        actionType: 'reduce_starting_dose',
        adjustmentInstructionEn:
          'Reduce total daily subcutaneous insulin starting dose to 0.2–0.3 units/kg/day (50% basal, 50% prandial) to prevent inpatient hypoglycemia.',
        adjustmentInstructionAr:
          'اخفض إجمالي جرعة الإنسولين اليومية تحت الجلد إلى 0.2–0.3 وحدة/كجم/يوم عند eGFR < 30–45 مل/د أو العمر >= 70 سنة لمنع هبوط السكر.',
        verbatimExcerpt:
          'High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day.',
        sourceId: 'accp-2026-vol2',
        pageRange: 'pp. 2-219 to 2-274',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s2'
      }
    ]
  },
  {
    id: 'dosing-dka-potassium-chloride-iv',
    drugId: 'drug-potassium-chloride',
    drugGenericName: 'Potassium Chloride (IV Replacement)',
    drugArabicName: 'كلوريد البوتاسيوم الوريدي (IV KCl)',
    indicationTopicId: 'topic-dka',
    indicationLabelEn: 'DKA Hypokalemic Resuscitation & Maintenance K+ Replacement',
    indicationLabelAr: 'تعويض وصيانة البوتاسيوم الوريدي في الحماض الكيتوني السكري',
    population: 'adults',
    regimenPhase: 'continuous_infusion',
    doseDisplay:
      'If K+ < 3.3 mEq/L: 20–40 mEq/hr IV (hold insulin). If K+ 3.3–5.2 mEq/L: 20–30 mEq per Liter of IV fluid (target K+ 4.0–5.0 mEq/L).',
    doseMin: 10,
    doseMax: 40,
    doseUnit: 'mEq/hr or mEq/L',
    route: 'IV Infusion (Smart Pump Mandatory — NEVER IV Push)',
    frequency: 'Continuous in IV fluids; recheck Serum K+ every 2 hours',
    maximumDose:
      'Peripheral IV ceiling: 10 mEq/hr (max 40 mEq/L). Central Line (CVC) ceiling: 20 mEq/hr (max 80 mEq/L) with continuous ECG telemetry.',
    administrationInstructionsEn:
      'NEVER administer undiluted or by direct IV push (causes immediate fatal ventricular fibrillation/asystole). Check and correct concomitant hypomagnesemia.',
    administrationInstructionsAr:
      'يُحظر منعاً باتاً الحقن الوريدي المباشر (IV Push). التزم بسقف 10 mEq/ساعة للوريد المحيطي و20 mEq/ساعة للوريد المركزي مع تخطيط قلب مستمر.',
    verbatimDosingExcerpt:
      'Peripheral line MAX: 10 mEq/hour (max conc: 40 mEq/L). Central line MAX: 20 mEq/hour with continuous ECG telemetry. NEVER IV PUSH.',
    sourceId: 'hospital-compendium',
    monographChapterId: 'hospital-compendium-protocols',
    pageRange: 'pp. 1–92',
    sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-dka-kcl-hyperkalemia-gate',
        dosingId: 'dosing-dka-potassium-chloride-iv',
        drugId: 'drug-potassium-chloride',
        topicId: 'topic-dka',
        organSystem: 'hyperkalemia_gate',
        parameterName: 'Serum Potassium (K+)',
        thresholdExpression: 'Serum K+ > 5.2 mEq/L',
        actionType: 'hold_or_contraindicated',
        adjustmentInstructionEn:
          'Do NOT add potassium to IV fluids when Serum K+ > 5.2 mEq/L; initiate IV insulin and recheck Serum K+ every 2 hours.',
        adjustmentInstructionAr:
          'لا تُضف البوتاسيوم إلى السوائل الوريدية عندما يكون K+ > 5.2 mEq/L؛ ابدأ الإنسولين الوريدي وأعد فحص البوتاسيوم كل ساعتين.',
        verbatimExcerpt:
          'Serum Potassium > 5.2 mEq/L: Do NOT add potassium to IV fluids. Recheck BMP every 2 hours; add potassium once levels drop below 5.2 mEq/L.',
        sourceId: 'accp-2026-vol2',
        pageRange: 'pp. 295–368',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6'
      }
    ]
  }
];

export const DKA_TABLES_AND_ALGORITHMS: ClinicalTableOrAlgorithm[] = [
  {
    id: 'table-dka-ada-resuscitation-algorithm',
    topicId: 'topic-dka',
    sectionId: 'topic-dka:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    artifactType: 'stepwise_protocol_algorithm',
    titleEn: 'ADA Diabetic Ketoacidosis (DKA) Stepwise Resuscitation & Resolution Algorithm',
    titleAr: 'خوارزمية الجمعية الأمريكية للسكري (ADA) المتدرجة لإنعاش وشفاء الحماض الكيتوني السكري (DKA)',
    headersEn: ['Protocol Step', 'Clinical Assessment', 'Pharmacotherapeutic Intervention', 'Safety Threshold & Transition Rule'],
    headersAr: ['خطوة البروتوكول', 'التقييم السريري', 'التدخل الدوائي الدقيق', 'عتبة الأمان وقواعد الانتقال'],
    rowsEn: [
      [
        'Step 1: Fluid Resuscitation',
        'Severe volume depletion (5 to 7 Liters deficit in adults)',
        'Infuse 0.9% Normal Saline at 1000 to 1500 mL/hr (15–20 mL/kg/hr) during Hour 1.',
        'After Hour 1, calculate Corrected Na+ = Measured Na+ + [0.016 × (Glucose − 100)]. If >= 135 mEq/L, switch to 0.45% NaCl at 250–500 mL/hr; if < 135 mEq/L, continue 0.9% NaCl.'
      ],
      [
        'Step 2: Mandatory Potassium Gate BEFORE Insulin',
        'Baseline Serum K+ < 3.3 mEq/L',
        'HOLD ALL INSULIN. Infuse IV KCl at 20 to 40 mEq/hr (respecting CVC/telemetry rules) until Serum K+ >= 3.3 mEq/L.',
        'CRITICAL SAFETY MANDATE: Administering insulin when K+ < 3.3 mEq/L drives K+ into cells and triggers fatal ventricular arrhythmias and cardiac arrest.'
      ],
      [
        'Step 3: Potassium Maintenance',
        'Serum K+ between 3.3 and 5.2 mEq/L',
        'Add 20 to 30 mEq KCl per Liter of IV fluid to maintain Serum K+ between 4.0 and 5.0 mEq/L.',
        'If Serum K+ > 5.2 mEq/L, do NOT add potassium to IV fluids; recheck K+ every 2 hours.'
      ],
      [
        'Step 4: Regular Insulin IV Infusion',
        'Serum K+ confirmed >= 3.3 mEq/L',
        'Regular Insulin continuous IV infusion at 0.1 units/kg/hr (or 0.14 units/kg/hr without bolus).',
        'Target glucose drop of 50 to 75 mg/dL/hr. If BG drops < 50 mg/dL in Hour 1, double infusion rate.'
      ],
      [
        'Step 5: Dextrose Addition (Glucose Clamp)',
        'Blood glucose reaches 200 mg/dL (ACCP) or <= 200–250 mg/dL (DiPiro)',
        'Switch IV fluids to D5W + 0.45% NaCl and reduce Regular Insulin infusion to 0.02–0.05 units/kg/hr.',
        'NEVER stop insulin when glucose normalizes; continue insulin + D5W to clear ketonemia and close the Anion Gap.'
      ],
      [
        'Step 6: Resolution & Subcutaneous Basal Overlap',
        'BG < 200 mg/dL + Anion Gap <= 12 mEq/L + Venous pH > 7.30 + Serum HCO3- >= 15 mEq/L',
        'Administer Subcutaneous Basal Insulin (Glargine/Detemir/Degludec) at least 2 hours (ACCP) to 2–4 hours (DiPiro/Casebook) PRIOR to stopping IV insulin.',
        'Stopping IV regular insulin (t1/2 = 5–9 min) without a 2–4 hour subcutaneous basal depot causes immediate rebound ketoacidosis.'
      ]
    ],
    rowsAr: [
      [
        'الخطوة 1: إنعاش السوائل',
        'نقص حجم شديد (عجز 5 إلى 7 لترات لدى البالغين)',
        'تسريب 0.9% Normal Saline بمعدل 1000 إلى 1500 مل/ساعة خلال الساعة الأولى.',
        'بعد الساعة 1: احسب الصوديوم المصحح. إذا كان >= 135 mEq/L حوّل إلى 0.45% NaCl بمعدل 250–500 مل/ساعة، وإذا كان < 135 استمر بـ 0.9% NaCl.'
      ],
      [
        'الخطوة 2: بوابة البوتاسيوم قبل الإنسولين',
        'بوتاسيوم المصل < 3.3 mEq/L',
        'إيقاف وحظر الإنسولين تماماً! تسريب KCl بمعدل 20–40 mEq/ساعة حتى يرتفع K+ >= 3.3 mEq/L.',
        'أمر سلامة حاسم: بدء الإنسولين مع K+ < 3.3 يدخل البوتاسيوم للخلايا ويسبب توقف القلب فوراً.'
      ],
      [
        'الخطوة 3: صيانة البوتاسيوم',
        'بوتاسيوم المصل بين 3.3 و 5.2 mEq/L',
        'إضافة 20 إلى 30 mEq بوتاسيوم لكل لتر سوائل للحفاظ على K+ بين 4.0 و 5.0 mEq/L.',
        'إذا كان K+ > 5.2 mEq/L لا يضاف البوتاسيوم ويُعاد الفحص كل ساعتين.'
      ],
      [
        'الخطوة 4: تسريب الإنسولين النظامي الوريدي',
        'تأكيد أن البوتاسيوم >= 3.3 mEq/L',
        'تسريب وريدي مستمر لـ Regular Insulin بمعدل 0.1 وحدة/كجم/ساعة.',
        'الهدف: خفض السكر 50–75 mg/dL/ساعة. إن لم ينخفض 50 في أول ساعة تُضاعف سرعة التسريب.'
      ],
      [
        'الخطوة 5: إضافة الدكستروز (D5W)',
        'وصول سكر الدم إلى 200 mg/dL (أو <= 200–250 mg/dL)',
        'تحويل السوائل إلى D5 0.45% NaCl وخفض تسريب الإنسولين إلى 0.02–0.05 وحدة/كجم/ساعة.',
        'يُمنع إيقاف الإنسولين عند انخفاض السكر؛ يستمر الإنسولين مع الدكستروز لإغلاق الفجوة الأنيونية.'
      ],
      [
        'الخطوة 6: معايير الشفاء وتداخل الإنسولين القاعدي',
        'سكر < 200 + فجوة أنيونية <= 12 + pH وريدي > 7.30 + بيكربونات >= 15 mEq/L',
        'حقن إنسولين قاعدي تحت الجلد (Glargine) قبل 2 إلى 4 ساعات من إيقاف مضخة الوريد.',
        'إيقاف الإنسولين الوريدي بدون تداخل 2–4 ساعات تحت الجلد يسبب ارتداد الحماض الكيتوني فوراً.'
      ]
    ],
    sourceId: 'accp-2026-vol2',
    monographChapterId: 'accp-v2-cirrhosis-dka',
    pageRange: 'pp. 295–368',
    sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec7'
  }
];

export const DKA_GUIDELINE_RECOMMENDATIONS: ClinicalGuidelineRecommendation[] = [
  {
    id: 'guideline-rec-dka-potassium-gate',
    guidelineId: 'guideline-ada-2026',
    issuingOrganization: 'American Diabetes Association (ADA) / SCCM',
    guidelineTitleEn: 'ADA Standards of Care in Diabetes — Hyperglycemic Crises (DKA & HHS)',
    guidelineTitleAr: 'معايير الرعاية الطبية للجمعية الأمريكية للسكري (ADA) — نوبات فرط السكر الحادة',
    publicationYear: 2026,
    topicId: 'topic-dka',
    sectionId: 'topic-dka:clinical_guidelines',
    drugId: 'drug-regular-insulin',
    recommendationTitleEn: 'Mandatory Serum Potassium Verification & Replacement Gate Before Insulin',
    recommendationTitleAr: 'التحقق الإلزامي من بوتاسيوم المصل وتعويضه قبل بدء الإنسولين',
    recommendationTextEn:
      'Insulin therapy must be withheld in any DKA patient presenting with Serum K+ < 3.3 mEq/L until potassium replacement restores Serum K+ >= 3.3 mEq/L.',
    recommendationTextAr:
      'يجب حجب الإنسولين عن أي مريض DKA يكون لديه بوتاسيوم المصل < 3.3 mEq/L حتى يتم تعويض البوتاسيوم وريثما يصل إلى >= 3.3 mEq/L.',
    recommendationClass: 'Class I (Strong)',
    evidenceLevel: 'Level A',
    landmarkTrials: ['ADA Consensus Crisis Statement'],
    verbatimExcerpt:
      'Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L.',
    sourceId: 'accp-2026-vol2',
    pageRange: 'pp. 295–368',
    sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec6'
  },
  {
    id: 'guideline-rec-dka-nice-sugar',
    guidelineId: 'guideline-ada-2026',
    issuingOrganization: 'American Diabetes Association (ADA) / Endocrine Society',
    guidelineTitleEn: 'Inpatient Glycemic Control Standards (NICE-SUGAR Consensus)',
    guidelineTitleAr: 'معايير ضبط سكر الدم للمنومين في المستشفيات والعناية المركزة',
    publicationYear: 2026,
    topicId: 'topic-dka',
    sectionId: 'topic-dka:clinical_guidelines',
    drugId: 'drug-insulin-glargine',
    recommendationTitleEn: 'Target Inpatient Glycemic Range 140–180 mg/dL & Basal-Bolus Over Sliding-Scale Monotherapy',
    recommendationTitleAr: 'نطاق سكر الدم المستهدف للمنومين (140–180 mg/dL) وتجنب نظام الشريحة المنزلقة المنفرد',
    recommendationTextEn:
      'Initiate insulin for persistent inpatient hyperglycemia >= 180 mg/dL targeting 140–180 mg/dL. Avoid prolonged Sliding-Scale Insulin (SSI) monotherapy; transition resolved DKA patients to scheduled subcutaneous Basal-Bolus insulin.',
    recommendationTextAr:
      'يُبدأ الإنسولين عند استمرار سكر الدم >= 180 mg/dL بهدف الحفاظ عليه بين 140–180 mg/dL، مع تجنب الاعتماد على Sliding-Scale المنفرد.',
    recommendationClass: 'Class I (Strong)',
    evidenceLevel: 'Level A',
    landmarkTrials: ['NICE-SUGAR Trial'],
    verbatimExcerpt:
      'Based on the landmark NICE-SUGAR trial, initiate insulin therapy in hospitalized ICU and non-ICU patients for persistent hyperglycemia >=180 mg/dL, targeting a blood glucose range of 140 to 180 mg/dL.',
    sourceId: 'dipiro-13th-ed',
    pageRange: 'pp. 1190–1255',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec2'
  }
];

export const DKA_TOPIC_RELATIONSHIPS: TopicRelationship[] = [
  {
    id: 'rel-dka-sglt2i-causes',
    sourceTopicId: 'topic-dka',
    targetTopicId: 'topic-sglt2-inhibitors',
    targetTopicCanonicalName: 'SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)',
    targetTopicTitleEn: 'SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)',
    targetTopicTitleAr: 'مثبطات SGLT2 (داباغليفلوزين، إمباغليفلوزين)',
    targetTopicType: 'drug_class',
    relationshipType: 'associated_with',
    directionality: 'bidirectional',
    relationshipDescriptionEn:
      'SGLT2 inhibitors can precipitate euglycemic DKA (BG < 200–250 mg/dL with high-anion-gap ketoacidosis) during acute illness, fasting, or surgery; must be held 3–4 days pre-operatively.',
    relationshipDescriptionAr:
      'قد تحفز مثبطات SGLT2 حدوث حماض كيتوني سوي السكر (euDKA) أثناء المرض الحاد أو الصيام أو الجراحة؛ ويجب إيقافها قبل 3–4 أيام من الجراحة.',
    primarySourceId: 'accp-2026-vol2',
    chapterReference: 'Ch. 8 (§8.0) & Ch. 15 (§15.1)',
    pageRange: 'pp. 295–368',
    sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-v2-cirrhosis-dka/accp-he-sec8',
    targetTopicUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s1'
  },
  {
    id: 'rel-dka-hypokalemia-complication',
    sourceTopicId: 'topic-dka',
    targetTopicId: 'topic-hypokalemia',
    targetTopicCanonicalName: 'Severe Hypokalemia & IV Potassium Safety',
    targetTopicTitleEn: 'Severe Hypokalemia & IV Potassium Replacement Protocol',
    targetTopicTitleAr: 'نقص البوتاسيوم الشديد وبروتوكول تعويض البوتاسيوم الوريدي',
    targetTopicType: 'laboratory_abnormality',
    relationshipType: 'complication_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Insulin therapy and acidosis correction rapidly drive extracellular K+ into cells; starting insulin when K+ < 3.3 mEq/L precipitates lethal hypokalemic arrhythmias.',
    relationshipDescriptionAr:
      'يدفع الإنسولين وتصحيح الحماض البوتاسيومَ بسرعة إلى داخل الخلايا؛ وبدء الإنسولين عند K+ < 3.3 mEq/L يسبب نقص بوتاسيوم قاتل وتوقف القلب.',
    primarySourceId: 'hospital-compendium',
    chapterReference: 'Ch. 1 (§2.0) & ACCP Vol 2 Ch. 8 (§6.0)',
    pageRange: 'pp. 1–92',
    sourceLocationUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2',
    targetTopicUri: 'local://ref/verbatim/hospital-compendium/hospital-compendium-protocols/hosp-sec2'
  },
  {
    id: 'rel-dka-regular-insulin-treated-by',
    sourceTopicId: 'topic-dka',
    targetTopicId: 'topic-regular-insulin-iv',
    targetTopicCanonicalName: 'Intravenous Regular Insulin Infusion',
    targetTopicTitleEn: 'Intravenous Regular Insulin Infusion Protocol',
    targetTopicTitleAr: 'بروتوكول التسريب الوريدي المستمر للإنسولين النظامي',
    targetTopicType: 'drug_monograph',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Continuous IV regular insulin (0.1 units/kg/hr, clamped at 0.02–0.05 units/kg/hr with D5W once BG <= 200–250 mg/dL) suppresses hepatic ketogenesis and closes the anion gap.',
    relationshipDescriptionAr:
      'التسريب الوريدي المستمر للإنسولين النظامي (0.1 وحدة/كجم/ساعة) يوقف توليد الكيتون الكبدي ويغلق الفجوة الأنيونية.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 83 (§6.1)',
    pageRange: 'pp. 1190–1255',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1'
  },
  {
    id: 'rel-dka-aki-associated',
    sourceTopicId: 'topic-dka',
    targetTopicId: 'topic-aki-ckd',
    targetTopicCanonicalName: 'Acute Kidney Injury (Prerenal Azotemia vs ATN)',
    targetTopicTitleEn: 'Acute Kidney Injury (Prerenal Volume Depletion & Renal Dosing)',
    targetTopicTitleAr: 'القصور الكلوي الحاد (نقص الحجم قبل الكلوي وتعديل الجرعات)',
    targetTopicType: 'disease',
    relationshipType: 'causes',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Osmotic diuresis in DKA causes a 5–7 Liter volume deficit leading to prerenal AKI; renal impairment requires holding Metformin and reducing post-DKA subcutaneous insulin TDD to 0.2–0.3 units/kg/day.',
    relationshipDescriptionAr:
      'يؤدي الإدرار التناضحي في DKA إلى عجز سوائل بـ 5–7 لترات وقصور كلوي قبل كلوي؛ مما يستلزم إيقاف الميتفورمين وتخفيض جرعة الإنسولين اليومية إلى 0.2–0.3 وحدة/كجم/يوم.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 54 (§4.3) & Ch. 83 (§6.2)',
    pageRange: 'pp. 740–795 & pp. 1190–1255',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch54-sepsis-aki-pk/dipiro-pk-sec3',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch54-sepsis-aki-pk/dipiro-pk-sec3'
  },
  {
    id: 'rel-dka-heart-failure-sglt2-bridge',
    sourceTopicId: 'topic-dka',
    targetTopicId: 'topic-heart-failure',
    targetTopicCanonicalName: 'Heart Failure (HFrEF, HFpEF & ADHF)',
    targetTopicTitleEn: 'Heart Failure (HFrEF, HFpEF & Acute Decompensated HF)',
    targetTopicTitleAr: 'قصور القلب (HFrEF و HFpEF وقصور القلب الحاد ADHF)',
    targetTopicType: 'syndrome',
    relationshipType: 'related_to',
    directionality: 'bidirectional',
    relationshipDescriptionEn:
      'Shared pharmacotherapeutic bridge via SGLT2 inhibitors (foundational pillar in Heart Failure that requires sick-day/perioperative hold rules in diabetic patients to prevent euDKA) and cautious fluid resuscitation monitoring in patients with reduced LVEF.',
    relationshipDescriptionAr:
      'ترابط دوائي وسريري مباشر عبر مثبطات SGLT2 (إحدى الركائز الأربع لعلاج قصور القلب والتي تتطلب تطبيق قواعد التوقف المرضي/الجراحي لمنع euDKA) وضرورة الحذر في سرعة إنعاش السوائل لدى مرضى ضعف العضلة القلبية.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§6.0) & Ch. 83 (§6.1)',
    pageRange: 'pp. 185–248 & pp. 1190–1255',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6',
    targetTopicUri: 'local://ref/topic/heart-failure'
  }
];

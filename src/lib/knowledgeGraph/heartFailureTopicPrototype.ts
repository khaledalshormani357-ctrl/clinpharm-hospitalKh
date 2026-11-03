import {
  ClinicalDrugDosing,
  ClinicalGuidelineRecommendation,
  ClinicalTableOrAlgorithm,
  ClinicalTopic,
  KnowledgeConflictGroup,
  KnowledgeStatement,
  TopicRelationship
} from '../../types/knowledgeGraph';

export const HEART_FAILURE_CLINICAL_TOPIC: ClinicalTopic = {
  id: 'topic-heart-failure',
  canonicalName: 'Heart Failure',
  englishName: 'Heart Failure (HFrEF, HFmrEF, HFpEF & Acute Decompensated Heart Failure)',
  arabicName: 'قصور القلب (المزمن بانخفاض أو حفظ الكسر القذفي HFrEF/HFpEF والهبوط الحاد ADHF)',
  slug: 'heart-failure',
  synonyms: [
    'Heart Failure',
    'CHF',
    'Congestive Heart Failure',
    'HFrEF',
    'HFpEF',
    'HFmrEF',
    'ADHF',
    'Acute Decompensated Heart Failure',
    'Systolic Heart Failure',
    'Diastolic Heart Failure',
    'قصور القلب',
    'فشل القلب',
    'ضعف عضلة القلب',
    'قصور القلب الحاد',
    'قصور القلب الاحتقاني'
  ],
  searchKeywords: [
    'heart failure',
    'hfref',
    'hfpef',
    'adhf',
    'gdmt',
    'sacubitril/valsartan',
    'entresto',
    'carvedilol',
    'metoprolol succinate',
    'bisoprolol',
    'spironolactone',
    'eplerenone',
    'dapagliflozin',
    'empagliflozin',
    'furosemide',
    'nohria-stevenson',
    'forrester',
    'milrinone',
    'dobutamine',
    'ivabradine',
    'digoxin',
    '36-hour washout'
  ],
  icd10Codes: ['I50.2', 'I50.3', 'I50.4', 'I50.9'],
  snomedCodes: ['84114007', '417996009'],
  topicType: 'syndrome',
  parentTopicId: null,
  hierarchyPath: ['Cardiology', 'Heart Failure'],
  specialty: 'Cardiology',
  specialtyAr: 'أمراض القلب والشرايين',
  descriptionEn:
    'Complex clinical syndrome resulting from structural or functional impairment of ventricular filling or ejection of blood, encompassing HFrEF (LVEF <= 40%), HFmrEF (LVEF 41–49%), HFpEF (LVEF >= 50%), and Acute Decompensated Heart Failure (ADHF / Nohria-Stevenson Subsets I–IV). Contributing source records listed for this topic: DiPiro 13th Ed, ACCP/ASHP Cardiology (BCCP) 2026, ACCP Vol 2, Stockley’s Drug Interactions, and Pharmacotherapy Casebook 13th Ed.',
  descriptionAr:
    'متلازمة سريرية معقدة تنجم عن خلل بنيوي أو وظيفي في امتلاء البطين أو قذف الدم، وتشمل قصور القلب بانخفاض الكسر القذفي (HFrEF؛ LVEF <= 40%)، ومتوسط الكسر القذفي (HFmrEF؛ 41–49%)، ومحفوظ الكسر القذفي (HFpEF؛ >= 50%)، والهبوط القلبي الحاد غير المعاوض (ADHF). تسجل بيانات هذا الموضوع المصادر التالية كمراجع مساهمة: DiPiro 13th Ed وACCP/ASHP Cardiology 2026 وACCP Vol 2 وStockley’s Drug Interactions وPharmacotherapy Casebook 13th Ed.',
  clinicalUrgency: 'high_alert',
  prototypeScope: 'full_monograph',
  status: 'conflicting_evidence',
  lastReviewedAt: '2026-11-01T06:40:00Z',
  contributingSources: [
    'dipiro-13th-ed',
    'accp-cardiology-2026',
    'accp-2026-vol2',
    'stockleys-drug-interactions',
    'clinical-casebook-guide'
  ],
  sectionsManifest: [
    {
      id: 'topic-hf:overview_definition',
      topicId: 'topic-heart-failure',
      sectionKey: 'overview_definition',
      sectionOrder: 1,
      titleEn: '1. Definition & LVEF Phenotypic Spectrum',
      titleAr: '1. التعريف وطيف الأنماط السريرية حسب الكسر القذفي (LVEF)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:epidemiology_risk_factors',
      topicId: 'topic-heart-failure',
      sectionKey: 'epidemiology_risk_factors',
      sectionOrder: 2,
      titleEn: '2. Epidemiology & Primary Etiologic Risk Factors',
      titleAr: '2. الوبائيات وعوامل الخطورة والأسباب الرئيسية',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['dipiro-13th-ed']
    },
    {
      id: 'topic-hf:pathophysiology',
      topicId: 'topic-heart-failure',
      sectionKey: 'pathophysiology',
      sectionOrder: 3,
      titleEn: '3. Neurohormonal Pathophysiology (RAAS, SNS, Natriuretic Peptides & Remodeling)',
      titleAr: '3. الفيزيولوجيا المرضية العصبية الهرمونية (RAAS، الجهاز الودي، الببتيدات المدرة للصوديوم)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed']
    },
    {
      id: 'topic-hf:etiology_precipitants',
      topicId: 'topic-heart-failure',
      sectionKey: 'etiology_precipitants',
      sectionOrder: 4,
      titleEn: '4. Acute Precipitants & Contraindicated HF-Exacerbating Drugs',
      titleAr: '4. المحفزات الحادة والأدوية المفاقمة لقصور القلب (الممنوعة)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'stockleys-drug-interactions', 'clinical-casebook-guide']
    },
    {
      id: 'topic-hf:classification_diagnosis',
      topicId: 'topic-heart-failure',
      sectionKey: 'classification_diagnosis',
      sectionOrder: 5,
      titleEn: '5. Staging (ACC/AHA A–D), NYHA Classes (I–IV) & Nohria-Stevenson Hemodynamic Quadrants',
      titleAr: '5. التصنيف المرحلي (ACC/AHA A–D)، درجات NYHA، ومربعات Nohria-Stevenson الهيموديناميكية',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:clinical_presentation',
      topicId: 'topic-heart-failure',
      sectionKey: 'clinical_presentation',
      sectionOrder: 6,
      titleEn: '6. Clinical Signs & Symptoms (Congestion vs Hypoperfusion)',
      titleAr: '6. العلامات والأعراض السريرية (محور الاحتقان مقابل محور التروية)',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'clinical-casebook-guide']
    },
    {
      id: 'topic-hf:investigations_workup',
      topicId: 'topic-heart-failure',
      sectionKey: 'investigations_workup',
      sectionOrder: 7,
      titleEn: '7. Diagnostic Biomarkers (BNP vs NT-proBNP on ARNI), Echocardiography & Invasive Hemodynamics',
      titleAr: '7. الفحوصات المخبرية والدلالات الحيوية (الفرق بين BNP وNT-proBNP مع Entresto) والإيكو',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:differential_diagnosis',
      topicId: 'topic-heart-failure',
      sectionKey: 'differential_diagnosis',
      sectionOrder: 8,
      titleEn: '8. Differential Diagnosis & Prescribing Cascade Pitfalls',
      titleAr: '8. التشخيص التفريقي ومتواليات الوصف الدوائي الخاطئة (وذمة حاصرات الكالسيوم)',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: ['accp-2026-vol2']
    },
    {
      id: 'topic-hf:treatment_management',
      topicId: 'topic-heart-failure',
      sectionKey: 'treatment_management',
      sectionOrder: 9,
      titleEn: '9. Chronic GDMT (The 4 Foundational Pillars) & HFpEF/HFmrEF Management',
      titleAr: '9. العلاج الدوائي الموجه بالدلائل (الركائز الأربع لـ HFrEF وعلاج HFpEF)',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'accp-2026-vol2']
    },
    {
      id: 'topic-hf:therapeutic_protocols',
      topicId: 'topic-heart-failure',
      sectionKey: 'therapeutic_protocols',
      sectionOrder: 10,
      titleEn: '10. Acute Decompensated HF (ADHF) Decongestion, Sequential Nephron Blockade & Shock Protocols',
      titleAr: '10. بروتوكولات إزالة الاحتقان الوريدي (DOSE/ADVOR) وتدبير الصدمة القلبية',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:pharmacotherapy_dosing',
      topicId: 'topic-heart-failure',
      sectionKey: 'pharmacotherapy_dosing',
      sectionOrder: 11,
      titleEn: '11. Medications, Starting/Target Doses, Washout Rules & Phenotypic Adjuncts',
      titleAr: '11. الأدوية والجرعات الابتدائية والقصوى وقواعد الغسيل الدوائي والأدوية التكميلية',
      availabilityStatus: 'populated',
      populatedStatementCount: 4,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'stockleys-drug-interactions']
    },
    {
      id: 'topic-hf:organ_dose_adjustment',
      topicId: 'topic-heart-failure',
      sectionKey: 'organ_dose_adjustment',
      sectionOrder: 12,
      titleEn: '12. Renal & Hepatic Dose Adjustments, Electrolyte Gates & Expected SCr Bump',
      titleAr: '12. تعديل الجرعات في القصور الكلوي والكبدي وبوابات البوتاسيوم وارتفاع الكرياتينين المتوقع',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'stockleys-drug-interactions']
    },
    {
      id: 'topic-hf:monitoring_followup',
      topicId: 'topic-heart-failure',
      sectionKey: 'monitoring_followup',
      sectionOrder: 13,
      titleEn: '13. Clinical, Renal, Electrolyte & Digoxin TDM Monitoring Schedule',
      titleAr: '13. المراقبة السريرية والمخبرية ومراقبة تركيز الديجوكسين (TDM)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-2026-vol2']
    },
    {
      id: 'topic-hf:complications',
      topicId: 'topic-heart-failure',
      sectionKey: 'complications',
      sectionOrder: 14,
      titleEn: '14. Complications (Cardiorenal Syndrome, Diuretic Resistance, Hyperkalemia & Angioedema)',
      titleAr: '14. المضاعفات (المتلازمة القلبية الكلوية، مقاومة المدرات، فرط البوتاسيوم، والوذمة الوعائية)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'stockleys-drug-interactions']
    },
    {
      id: 'topic-hf:special_populations',
      topicId: 'topic-heart-failure',
      sectionKey: 'special_populations',
      sectionOrder: 15,
      titleEn: '15. Special Populations (Pregnancy Teratogenicity, African American NYHA III–IV, Elderly & CKD)',
      titleAr: '15. الحالات الخاصة (الحمل، المرضى ذوو الأصول الأفريقية NYHA III–IV، المسنون، ومرضى الكلى)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:discharge_criteria',
      topicId: 'topic-heart-failure',
      sectionKey: 'discharge_criteria',
      sectionOrder: 16,
      titleEn: '16. Pre-Discharge GDMT Optimization (STRONG-HF Paradigm) & IV-to-PO Loop Conversion',
      titleAr: '16. تحسين أدوية GDMT قبل الخروج (دراسة STRONG-HF) والتحويل من المدرات الوريدية للفموية',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:clinical_guidelines',
      topicId: 'topic-heart-failure',
      sectionKey: 'clinical_guidelines',
      sectionOrder: 17,
      titleEn: '17. AHA/ACC/HFSA Guideline References & Landmark Clinical Trials',
      titleAr: '17. مراجع الإرشادات السريرية والتجارب المرجعية (AHA/ACC/HFSA)',
      availabilityStatus: 'populated',
      populatedStatementCount: 2,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026']
    },
    {
      id: 'topic-hf:references_evidence',
      topicId: 'topic-heart-failure',
      sectionKey: 'references_evidence',
      sectionOrder: 18,
      titleEn: '18. Contributing References & Source Metadata',
      titleAr: '18. المراجع والمصادر العلمية الداعمة',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: [
        'dipiro-13th-ed',
        'accp-cardiology-2026',
        'accp-2026-vol2',
        'stockleys-drug-interactions',
        'clinical-casebook-guide'
      ]
    },
    {
      id: 'topic-hf:related_topics',
      topicId: 'topic-heart-failure',
      sectionKey: 'related_topics',
      sectionOrder: 19,
      titleEn: '19. Semantically Linked Clinical Topics (13 Relationships)',
      titleAr: '19. المواضيع السريرية والدوائية المرتبطة (13 علاقة)',
      availabilityStatus: 'populated',
      populatedStatementCount: 1,
      sourceIds: [
        'dipiro-13th-ed',
        'accp-cardiology-2026',
        'accp-2026-vol2',
        'stockleys-drug-interactions'
      ]
    },
    {
      id: 'topic-hf:clinical_pearls_faqs',
      topicId: 'topic-heart-failure',
      sectionKey: 'clinical_pearls_faqs',
      sectionOrder: 20,
      titleEn: '20. High-Yield Board Pearls, Pharmacokinetic Traps & Clinical FAQs',
      titleAr: '20. اللآلئ السريرية وفخاخ الحركية الدوائية والأسئلة الشائعة',
      availabilityStatus: 'populated',
      populatedStatementCount: 3,
      sourceIds: ['dipiro-13th-ed', 'accp-cardiology-2026', 'stockleys-drug-interactions']
    }
  ]
};

export const HEART_FAILURE_CONFLICT_GROUPS: KnowledgeConflictGroup[] = [
  {
    id: 'conflict-hf-iv-furosemide-multiplier',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    clinicalQuestionEn:
      'What is the recommended initial IV Loop Diuretic dose multiplier relative to the patient’s home oral daily dose in Acute Decompensated Heart Failure (ADHF)?',
    clinicalQuestionAr:
      'ما هو معامل تحويل جرعة مدر العروة الوريدي الابتدائية في قصور القلب الحاد (ADHF) مقارنة بالجرعة الفموية المنزلية اليومية؟',
    conflictNature: 'dosing_regimen_difference',
    positions: [
      {
        positionId: 'pos-hf-dose-dipiro',
        sourceId: 'dipiro-13th-ed',
        sourceBadgeEn: "DiPiro's 13th Ed",
        sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterReference: 'Ch. 15: Heart Failure (§7.0: ADHF Subset II Warm & Wet)',
        pageRange: 'pp. 185–248',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec7',
        positionStatementEn:
          'In patients on chronic oral loop diuretic therapy, the initial IV dose should equal or exceed 2.0 to 2.5 times the home oral daily dose administered as an IV bolus (e.g., home Furosemide 40 mg PO daily -> 80 to 100 mg IV).',
        positionStatementAr:
          'لدى المرضى الذين يتناولون مدرات العروة فموياً بانتظام، يجب أن تعادل الجرعة الوريدية الابتدائية أو تتجاوز 2.0 إلى 2.5 ضعف الجرعة الفموية اليومية المنزلية.',
        verbatimExcerpt:
          'In patients with chronic oral loop diuretic therapy, the initial IV dose should equal or exceed 2.0 to 2.5 times the home oral daily dose administered as an IV bolus (e.g., if taking Furosemide 40 mg PO daily, administer Furosemide 80 to 100 mg IV).',
        evidenceGrade: 'ACC/AHA Class I/IIa, LOE B-NR (via DiPiro 13th Ed)'
      },
      {
        positionId: 'pos-hf-dose-accp-cardio',
        sourceId: 'accp-cardiology-2026',
        sourceBadgeEn: 'ACCP Cardiology 2026 (BCCP)',
        sourceBadgeAr: 'بورد القلب ACCP 2026 (BCCP)',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterReference: 'Ch. 1: ADHF & Cardiogenic Shock (§1.2: DOSE Trial Strategy)',
        pageRange: 'BCCP pp. 1-1 to 1-74',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s2',
        positionStatementEn:
          'DOSE Trial Protocol: Administer an initial IV Furosemide dose equal to 1.0 to 2.5 times the patient’s total daily home oral Furosemide dose (high-dose 2.5x strategy achieves faster dyspnea relief and net fluid loss with acceptable transient SCr bump up to 0.3–0.5 mg/dL).',
        positionStatementAr:
          'بروتوكول دراسة DOSE: إعطاء جرعة فوروسيميد وريدية ابتدائية تعادل 1.0 إلى 2.5 ضعف إجمالي الجرعة الفموية اليومية المنزلية (استراتيجية الجرعة العالية 2.5x تحقق زوالاً أسرع لضيق النفس وفقدان السوائل).',
        verbatimExcerpt:
          "DOSE Trial High-Dose Protocol: Administer an initial IV Furosemide dose equal to 1.0 to 2.5 times the patient's total daily home oral Furosemide dose (e.g., home Furosemide 80 mg PO BID = 160 mg/day -> give 160 to 400 mg IV/day divided q12h or continuous IV infusion).",
        evidenceGrade: 'ACC/AHA Class I, Level A (DOSE Trial via ACCP BCCP 2026)'
      }
    ],
    resolutionGuidanceEn:
      'ACCP Cardiology 2026 cites both arms of the landmark DOSE trial (1.0x low-intensification vs 2.5x high-intensification), whereas DiPiro 13th Ed recommends directly targeting the high-intensification 2.0–2.5x multiplier to overcome variable oral Furosemide bioavailability (~50%) and bowel wall edema.',
    resolutionGuidanceAr:
      'يعرض مرجع بورد القلب ACCP 2026 ذراعي دراسة DOSE (من 1.0 إلى 2.5 ضعف الجرعة المنزلية)، بينما يوصي مرجع DiPiro 13 بالبدء مباشرة بمعامل 2.0 إلى 2.5 ضعف للتغلب على ضعف الامتصاص الفموي للفوروسيميد (50%) ووذمة جدار الأمعاء.',
    resolutionStatus: 'preserve_both_with_context',
    reviewedByPharmacist: 'Cardiology Clinical Pharmacist Review (Phase 3 Prototype)'
  },
  {
    id: 'conflict-hf-sequential-nephron-blockade',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    clinicalQuestionEn:
      'When loop diuretic resistance occurs in ADHF, should sequential nephron blockade utilize distal tubule Thiazides (Metolazone/Chlorothiazide) or proximal tubule Acetazolamide (ADVOR trial)?',
    clinicalQuestionAr:
      'عند حدوث مقاومة لمدرات العروة في ADHF، هل يُستخدم الحصار الكلوي المتسلسل بالثيازيدات (Metolazone) أم بأسيتازولاميد (Acetazolamide — دراسة ADVOR)؟',
    conflictNature: 'guideline_edition_evolution',
    positions: [
      {
        positionId: 'pos-hf-snb-dipiro',
        sourceId: 'dipiro-13th-ed',
        sourceBadgeEn: "DiPiro's 13th Ed",
        sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterReference: 'Ch. 15: Heart Failure (§7.0: Diuretic Resistance Management)',
        pageRange: 'pp. 185–248',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec7',
        positionStatementEn:
          'If spot urine sodium at 2 hours is < 50–70 mEq/L or urine output is < 100–150 mL/hr, double the IV loop dose or add sequential nephron blockade using Metolazone 2.5–5 mg PO (or IV Chlorothiazide 500 mg) 30 minutes prior to the loop diuretic.',
        positionStatementAr:
          'إذا كان صوديوم البول بعد ساعتين < 50–70 mEq/L أو الإدرار < 100–150 مل/ساعة، ضاعف جرعة مدر العروة الوريدي أو أضف Metolazone بجرعة 2.5–5 ملغ فموياً (أو Chlorothiazide 500 ملغ وريدياً) قبل 30 دقيقة من مدر العروة.',
        verbatimExcerpt:
          'If spot urine sodium at 2 hours is < 50-70 mEq/L or hourly urine output is < 100-150 mL/hr, double the IV loop dose or add sequential nephron blockade using Metolazone 2.5 to 5 mg PO (or IV Chlorothiazide 500 mg) 30 minutes prior to the loop diuretic.',
        evidenceGrade: 'ACC/AHA Class IIa, LOE B-NR'
      },
      {
        positionId: 'pos-hf-snb-accp-advor',
        sourceId: 'accp-cardiology-2026',
        sourceBadgeEn: 'ACCP Cardiology 2026 (BCCP)',
        sourceBadgeAr: 'بورد القلب ACCP 2026 (BCCP)',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterReference: 'Ch. 1: ADHF (§1.2: Sequential Nephron Blockade & ADVOR)',
        pageRange: 'BCCP pp. 1-1 to 1-74',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s2',
        positionStatementEn:
          'Add either a distal convoluted tubule thiazide (Metolazone 2.5–5 mg PO 30 min prior to IV loop diuretic, or Chlorothiazide 500 mg IV) OR a proximal tubule carbonic anhydrase inhibitor (Acetazolamide 500 mg IV once daily for 3 days per the ADVOR trial, particularly when serum HCO3- >= 27 mEq/L).',
        positionStatementAr:
          'إضافة مدر ثيازيدي في الأنبوب البعيد (Metolazone 2.5–5 ملغ فموياً أو Chlorothiazide 500 ملغ وريدياً) أو مثبط الأنهيدراز الكربوني في الأنبوب القريب (Acetazolamide 500 ملغ وريدياً يومياً لمدة 3 أيام وفق دراسة ADVOR، خاصة عند ارتفاع البيكربونات >= 27 mEq/L).',
        verbatimExcerpt:
          'If diuresis is inadequate after doubling the IV loop diuretic dose, add a distal convoluted tubule thiazide (Metolazone 2.5–5 mg PO 30 minutes prior to IV loop diuretic, or Chlorothiazide 500 mg IV) OR a carbonic anhydrase inhibitor in the proximal tubule (Acetazolamide 500 mg IV once daily for 3 days per the landmark ADVOR trial, particularly when serum HCO3- >=27 mEq/L).',
        evidenceGrade: 'ACC/AHA Class I/IIa (DOSE & ADVOR Trials)'
      }
    ],
    resolutionGuidanceEn:
      'Both regimens are valid evidence-based options depending on acid-base and electrolyte status: Acetazolamide 500 mg IV daily x 3 days (ADVOR) is particularly advantageous when contraction metabolic alkalosis (HCO3- >= 27 mEq/L) is present, whereas Metolazone 2.5–5 mg PO provides potent distal blockade (monitor closely for severe hypokalemia and hyponatremia).',
    resolutionGuidanceAr:
      'الخياران معتمدان سريرياً حسب حالة الحمض والقلوي والشوارد: يُفضل Acetazolamide 500 mg IV لمدة 3 أيام (دراسة ADVOR) عند وجود قلاء استقلابي ناجم عن المدرات (HCO3- >= 27 mEq/L)، بينما يوفر Metolazone 2.5–5 mg PO حصاراً قوياً في الأنبوب البعيد مع ضرورة المراقبة اللصيقة لنقص البوتاسيوم والصوديوم.',
    resolutionStatus: 'route_or_population_dependent',
    reviewedByPharmacist: 'Cardiology Clinical Pharmacist Review (Phase 3 Prototype)'
  }
];

export const HEART_FAILURE_KNOWLEDGE_STATEMENTS: KnowledgeStatement[] = [
  // Section 1: overview_definition
  {
    id: 'stmt-hf-def-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:overview_definition',
    sectionKey: 'overview_definition',
    statementOrder: 1,
    verbatimSourceText:
      'Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection. Heart failure with reduced ejection fraction (HFrEF) is defined by a left ventricular ejection fraction (LVEF) <= 40%. In Heart Failure with Preserved Ejection Fraction (HFpEF, LVEF >=50%) and Mildly Reduced Ejection Fraction (HFmrEF, LVEF 41–49%)...',
    statementTextEn:
      'Heart Failure is a clinical syndrome of structural or functional ventricular impairment stratified by Left Ventricular Ejection Fraction (LVEF) into: HFrEF (LVEF <= 40%), HFmrEF (LVEF 41–49%), and HFpEF (LVEF >= 50%).',
    statementTextAr:
      'قصور القلب هو متلازمة سريرية تنجم عن اختلال بنيوي أو وظيفي في امتلاء البطين أو قذف الدم، ويُصنف حسب الكسر القذفي للبطين الأيسر (LVEF) إلى: HFrEF (<= 40%)، وHFmrEF (41–49%)، وHFpEF (>= 50%).',
    clinicianReviewedNoteEn:
      'Verified across DiPiro 13th Ed Ch. 15 and ACCP/ASHP Cardiology 2026 Ch. 2.',
    clinicianReviewedNoteAr:
      'موثق ومطابق في مرجع DiPiro الطبعة 13 (الفصل 15) ومرجع بورد القلب ACCP 2026 (الفصل 2).',
    reviewedBySpecialist: 'Dr. Khaled Al-Shormani, Clinical Pharmacist',
    reviewedAt: '2026-11-01T06:40:00Z',
    generationMethod: 'verbatim_extraction',
    statementType: 'definition',
    population: 'adults',
    recommendationStrength: 'AHA/ACC/HFSA Class I',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-definition-lvef-spectrum-hfref-40-hfmref-41-49-hfpef-50',
    citations: [
      {
        id: 'cit-hf-def-1a',
        knowledgeStatementId: 'stmt-hf-def-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction: Pathophysiology, GDMT, and Acute Decompensation',
        sectionReference: 'Section 1.0: Epidemiology, Etiology, and Neurohormonal Pathophysiology',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection. Heart failure with reduced ejection fraction (HFrEF) is defined by a left ventricular ejection fraction (LVEF) <= 40%.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-def-1b',
        knowledgeStatementId: 'stmt-hf-def-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s3',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure (HFrEF, HFmrEF, HFpEF) & 4-Pillar GDMT Sequencing',
        sectionReference: 'Section 2.3: HFmrEF & HFpEF Evidence-Based Pharmacotherapy',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'In Heart Failure with Preserved Ejection Fraction (HFpEF, LVEF >=50%) and Mildly Reduced Ejection Fraction (HFmrEF, LVEF 41–49%)...',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s3',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 3: pathophysiology
  {
    id: 'stmt-hf-patho-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:pathophysiology',
    sectionKey: 'pathophysiology',
    statementOrder: 1,
    verbatimSourceText:
      'Pathophysiologically, an index myocardial injury triggers a precipitous decline in cardiac output, prompting immediate compensatory neurohormonal activation: 1. Renin-Angiotensin-Aldosterone System (RAAS): Angiotensin II directly induces myocardial hypertrophy, fibroblast proliferation, interstitial collagen deposition... Aldosterone promotes distal tubular sodium and water retention at the expense of potassium and magnesium excretion, further stimulating myocardial and vascular perivascular fibrosis. 2. Sympathetic Nervous System (SNS): Chronic beta-1 adrenergic receptor stimulation provokes receptor downregulation, desensitization, intracellular calcium overload, direct cardiomyocyte apoptosis, and lethal ventricular arrhythmogenesis. 4. Counter-Regulatory Natriuretic Peptide System: ANP and BNP promote natriuresis, diuresis, vasodilation, and antifibrotic signaling via cGMP. However, endogenous neprilysin rapidly cleaves and inactivates these beneficial peptides.',
    statementTextEn:
      'Myocardial injury activates deleterious compensatory cascades: (1) RAAS (Angiotensin II & Aldosterone drive vasoconstriction, Na+/H2O retention, K+/Mg2+ wasting, and myocardial fibrosis), and (2) SNS (chronic Beta-1 overdrive causes myocyte apoptosis, Ca2+ overload, and arrhythmias), while endogenous neprilysin degrades protective counter-regulatory natriuretic peptides (ANP/BNP).',
    statementTextAr:
      'يحفز تضرر عضلة القلب تفعيل أنظمة عصبية هرمونية معيبة: (1) نظام RAAS (الأنجيوتنسين II والألدوستيرون يسببان تقبض الأوعية، احتباس الصوديوم والماء، طرح البوتاسيوم والمغنيسيوم، وتليف العضلة القلبية)، و(2) الجهاز الودي (التنبيه المزمن لمستقبلات Beta-1 يسبب موت الخلايا القلبية واضطرابات النظم)، بينما يقوم إنزيم النيبريليسين بتفكيك الببتيدات المدرة للصوديوم الحامية (ANP/BNP).',
    generationMethod: 'verbatim_extraction',
    statementType: 'pathophysiologic_mechanism',
    population: 'adults',
    evidenceLevel: 'Fundamental Pathophysiologic Science',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'hf-pathophysiology-raas-sns-neprilysin-ventricular-remodeling',
    citations: [
      {
        id: 'cit-hf-patho-1',
        knowledgeStatementId: 'stmt-hf-patho-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 1.0: Epidemiology, Etiology, and Neurohormonal Pathophysiology',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Pathophysiologically, an index myocardial injury triggers a precipitous decline in cardiac output, prompting immediate compensatory neurohormonal activation: 1. Renin-Angiotensin-Aldosterone System (RAAS)... 2. Sympathetic Nervous System (SNS)... 4. Counter-Regulatory Natriuretic Peptide System...',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 4: etiology_precipitants (Drugs that precipitate or worsen HF)
  {
    id: 'stmt-hf-precipitants-drugs-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:etiology_precipitants',
    sectionKey: 'etiology_precipitants',
    statementOrder: 1,
    verbatimSourceText:
      'Drugs That Precipitate or Worsen Heart Failure (MANDATORY TO AVOID): - Nonsteroidal Anti-inflammatory Drugs (NSAIDs & COX-2 inhibitors): Inhibit renal prostaglandin E2 and prostacyclin (PGI2), inducing afferent arteriolar vasoconstriction, profound sodium/water retention, and blunting loop diuretic efficacy. - Non-Dihydropyridine CCBs: Diltiazem and Verapamil induce potent negative inotropy and precipitate acute decompensation. - Class I Antiarrhythmics: Flecainide, Propafenone, Disopyramide (negative inotropy and proarrhythmia). - Thiazolidinediones (Pioglitazone, Rosiglitazone): PPAR-gamma stimulation in renal collecting ducts triggers severe fluid retention and heart failure exacerbations. - DPP-4 Inhibitor Saxagliptin: Associated with increased risk of HF hospitalization (SAVOR-TIMI 53 trial).',
    statementTextEn:
      'Medications Strictly Contraindicated / To Avoid in HFrEF: (1) Non-DHP Calcium Channel Blockers (Diltiazem, Verapamil — potent negative inotropes causing pulmonary edema/shock), (2) NSAIDs & COX-2 inhibitors (afferent vasoconstriction, Na+/water retention, loop diuretic resistance, and Triple Whammy AKI), (3) Class Ic/Ia antiarrhythmics (Flecainide, Propafenone, Disopyramide) and Dronedarone, (4) Thiazolidinediones (Pioglitazone, Rosiglitazone), and (5) Saxagliptin.',
    statementTextAr:
      'الأدوية الواجب تجنبها والتي تفاقم قصور القلب (HFrEF): (1) حاصرات قنوات الكالسيوم غير الدايهيدروبيريدين (Diltiazem وVerapamil — مثبطات قوية لانقباض العضلة القلبية)، (2) مضادات الالتهاب غير الستيرويدية NSAIDs (تقبض الشرين الوارد، احتباس الصوديوم والماء، وإضعاف مدرات العروة)، (3) مضادات اضطراب النظم من الصنف الأول (Flecainide, Propafenone) وDronedarone، (4) مركبات Thiazolidinediones (Pioglitazone)، و(5) Saxagliptin.',
    generationMethod: 'verbatim_extraction',
    statementType: 'contraindication_warning',
    population: 'adults',
    recommendationStrength: 'Class III (Harm)',
    evidenceLevel: 'Level A / B',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-contraindicated-precipitating-drugs-diltiazem-verapamil-nsaids-flecainide-pioglitazone',
    citations: [
      {
        id: 'cit-hf-precip-1a',
        knowledgeStatementId: 'stmt-hf-precipitants-drugs-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec8',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 8.0: Drugs That Precipitate or Worsen Heart Failure',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Nonsteroidal Anti-inflammatory Drugs (NSAIDs & COX-2 inhibitors)... Non-Dihydropyridine CCBs: Diltiazem and Verapamil induce potent negative inotropy... Class I Antiarrhythmics: Flecainide, Propafenone, Disopyramide... Thiazolidinediones (Pioglitazone, Rosiglitazone)... DPP-4 Inhibitor Saxagliptin...',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec8',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-precip-1b',
        knowledgeStatementId: 'stmt-hf-precipitants-drugs-1',
        sourceId: 'stockleys-drug-interactions',
        monographChapterId: 'stockleys-sec2-cardiovascular-qtc-raas',
        monographSectionId: 'stk-2-1',
        edition: "Stockley's 2026 Hospital Edition",
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Cardiovascular, Antiarrhythmic, QTc Prolongation & RAAS/Hyperkalemia Interactions',
        sectionReference: 'Section 2.1: The "Triple Whammy" (ACEi/ARB + Diuretic + NSAID)',
        pageRange: 'pp. 412–640',
        verbatimExcerpt:
          'The "Triple Whammy" (ACEi/ARB + Diuretic + NSAID): NSAIDs inhibit renal prostaglandin E2/I2 synthesis, causing afferent arteriolar vasoconstriction, while ACEi/ARBs dilate the efferent arteriole and diuretics contract intravascular volume.',
        sourceLocationUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-1',
        citationRole: 'ddi_mechanism_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-precip-1c',
        knowledgeStatementId: 'stmt-hf-precipitants-drugs-1',
        sourceId: 'clinical-casebook-guide',
        monographChapterId: 'casebook-section2-syndrome-checklists',
        monographSectionId: 'cb2-s1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Section II: Syndrome-Specific Bedside Workup Checklists',
        sectionReference: 'Section 2.1: Heart Failure Medication Audit Questions',
        pageRange: 'pp. 49–128',
        verbatimExcerpt:
          'Is the patient taking any HF-exacerbating drugs (NSAIDs, Diltiazem, Verapamil, Pioglitazone, Cilostazol, Flecainide, Dronedarone)?',
        sourceLocationUri: 'local://ref/verbatim/clinical-casebook-guide/casebook-section2-syndrome-checklists/cb2-s1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 7: investigations_workup (BNP vs NT-proBNP on ARNI)
  {
    id: 'stmt-hf-biomarkers-arni-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:investigations_workup',
    sectionKey: 'investigations_workup',
    statementOrder: 1,
    verbatimSourceText:
      'Diagnostic Biomarkers: - B-type Natriuretic Peptide (BNP): Threshold < 100 pg/mL has high negative predictive value (>95%) to rule out acute HF. - N-terminal pro-B-type Natriuretic Peptide (NT-proBNP): Age-stratified acute diagnostic cutoffs: > 450 pg/mL (age < 50), > 900 pg/mL (age 50–75), and > 1800 pg/mL (age > 75). In non-acute outpatient settings, NT-proBNP > 125 pg/mL establishes HF diagnosis. - CRITICAL INTERPRETIVE PEARL ON ARNI THERAPY: Sacubitril inhibits neprilysin, which degrades BNP but NOT NT-proBNP. Consequently, following ARNI initiation, circulating BNP levels rise artifactually and cannot be utilized as a reliable marker of clinical decompensation. NT-proBNP is not a substrate for neprilysin and remains the gold-standard biomarker for therapeutic monitoring and risk stratification in patients receiving sacubitril/valsartan.',
    statementTextEn:
      'Natriuretic Peptide Cutoffs & ARNI Interpretation Rule: Acute HF is ruled out when BNP < 100 pg/mL, and diagnosed acutely when NT-proBNP is > 450 pg/mL (age < 50), > 900 pg/mL (age 50–75), or > 1800 pg/mL (age > 75) (> 125 pg/mL outpatient). Because Sacubitril inhibits neprilysin (which degrades BNP but NOT NT-proBNP), BNP levels rise artifactually on Sacubitril/Valsartan; always monitor NT-proBNP in ARNI-treated patients.',
    statementTextAr:
      'قواعد تفسير BNP وNT-proBNP مع دواء Entresto: يُستبعد قصور القلب الحاد عند BNP < 100 pg/mL، ويُشخص حاداً عند NT-proBNP > 450 (لعمر < 50)، أو > 900 (لعمر 50–75)، أو > 1800 pg/mL (لعمر > 75). وبما أن Sacubitril يثبط إنزيم النيبريليسين الذي يفكك BNP ولا يفكك NT-proBNP، فإن مستوى BNP يرتفع دوائياً بعد بدء Entresto؛ لذا يجب الاعتماد حصرياً على NT-proBNP للمتابعة.',
    generationMethod: 'verbatim_extraction',
    statementType: 'lab_or_imaging_finding',
    population: 'adults',
    recommendationStrength: 'ACC/AHA Class I',
    evidenceLevel: 'Level B-NR',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'hf-biomarkers-bnp-ntprobnp-cutoffs-sacubitril-neprilysin-substrate-rule',
    citations: [
      {
        id: 'cit-hf-biomarkers-1',
        knowledgeStatementId: 'stmt-hf-biomarkers-arni-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec2',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 2.0: Diagnostic Criteria, Clinical Staging, and Biomarkers (BNP/NT-proBNP)',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'CRITICAL INTERPRETIVE PEARL ON ARNI THERAPY: Sacubitril inhibits neprilysin, which degrades BNP but NOT NT-proBNP. Consequently, following ARNI initiation, circulating BNP levels rise artifactually... NT-proBNP is not a substrate for neprilysin and remains the gold-standard biomarker.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 9: treatment_management (The 4 Foundational Pillars of HFrEF + HFpEF)
  {
    id: 'stmt-hf-gdmt-4pillars-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:treatment_management',
    sectionKey: 'treatment_management',
    statementOrder: 1,
    verbatimSourceText:
      'All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence within days to weeks of diagnosis, unless a genuine clinical contraindication exists: 1. ARNI (Sacubitril/Valsartan preferred over ACEi/ARB; PARADIGM-HF). 2. Evidence-Based Beta-Adrenergic Blocker: ONLY Carvedilol, Metoprolol Succinate extended-release, or Bisoprolol (COPERNICUS, MERIT-HF, CIBIS-II). 3. Mineralocorticoid Receptor Antagonist (MRA): Spironolactone or Eplerenone (requires eGFR >= 30 mL/min/1.73m2 and baseline K+ <= 5.0 mEq/L; RALES, EPHESUS). 4. SGLT2 Inhibitor: Dapagliflozin 10 mg daily or Empagliflozin 10 mg daily regardless of diabetes status (DAPA-HF, EMPEROR-Reduced). Cumulative Therapeutic Benefit: achieves an estimated 73% relative reduction in 2-year all-cause mortality.',
    statementTextEn:
      'Four Foundational Mortality-Reducing Pillars in HFrEF (LVEF <= 40%): Initiate simultaneously or in rapid sequence (within 2–4 weeks, prior to hospital discharge per STRONG-HF): (1) ARNI (Sacubitril/Valsartan preferred first-line over ACEi/ARB), (2) Evidence-Based Beta-Blocker (ONLY Carvedilol, Metoprolol Succinate CR/XL, or Bisoprolol — never Metoprolol Tartrate or Atenolol), (3) MRA (Spironolactone or Eplerenone if K+ <= 5.0 mEq/L and eGFR >= 30 mL/min), and (4) SGLT2 Inhibitor (Dapagliflozin 10 mg or Empagliflozin 10 mg daily down to eGFR >= 20 mL/min regardless of diabetes).',
    statementTextAr:
      'الركائز الدوائية الأربع الخافضة للوفيات في HFrEF (LVEF <= 40%): تُبدأ متزامنة أو بتتابع سريع (خلال 2–4 أسابيع وقبل الخروج من المستشفى وفق STRONG-HF): (1) ARNI (Sacubitril/Valsartan مفضل كخط أول على ACEi/ARB)، (2) حاصرات بيتا المثبتة فقط (Carvedilol، أو Metoprolol Succinate ممتد المفعول، أو Bisoprolol — ويُحظر Metoprolol Tartrate أو Atenolol)، (3) مضادات الألدوستيرون MRA (Spironolactone أو Eplerenone بشرط K+ <= 5.0 وeGFR >= 30)، و(4) مثبطات SGLT2 (Dapagliflozin 10 mg أو Empagliflozin 10 mg يومياً حتى eGFR >= 20 بغض النظر عن السكري).',
    generationMethod: 'verbatim_extraction',
    statementType: 'therapeutic_recommendation',
    population: 'adults',
    recommendationStrength: 'AHA/ACC/HFSA Class I',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-4-pillars-gdmt-arni-betablocker-mra-sglt2i-mortality-reduction',
    citations: [
      {
        id: 'cit-hf-gdmt-1a',
        knowledgeStatementId: 'stmt-hf-gdmt-4pillars-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec3',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 3.0: Foundational GDMT: The Four Cardinal Pillars',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence... Cumulative Therapeutic Benefit: The four-pillar combination achieves an estimated 73% relative reduction in 2-year all-cause mortality.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-gdmt-1b',
        knowledgeStatementId: 'stmt-hf-gdmt-4pillars-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s1',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure & 4-Pillar GDMT Sequencing',
        sectionReference: 'Section 2.1: Target Doses & Washout Rules of the 4 Foundational HFrEF Pillars',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'Simultaneous or rapid-sequence initiation (within 2 to 4 weeks, ideally prior to hospital discharge per the STRONG-HF trial) of all four foundational classes reduces all-cause mortality by >60% in HFrEF (LVEF <=40%).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 11: pharmacotherapy_dosing (36-hour washout + Stockley DDI)
  {
    id: 'stmt-hf-arni-washout-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:pharmacotherapy_dosing',
    sectionKey: 'pharmacotherapy_dosing',
    statementOrder: 1,
    verbatimSourceText:
      'THE 36-HOUR MANDATORY WASHOUT INTERVAL: Both ACE inhibitors and neprilysin degrade bradykinin. Concurrent administration of an ACE inhibitor and sacubitril causes massive, synergistic accumulation of tissue bradykinin, leading to severe, life-threatening angioedema of the larynx, tongue, and airways. Therefore: When switching from any ACE inhibitor (Lisinopril, Enalapril, Ramipril, Captopril, Perindopril) to Sacubitril/Valsartan, clinicians MUST ensure that at least 36 hours have elapsed between the last dose of the ACE inhibitor and the first dose of Sacubitril/Valsartan. When switching from an Angiotensin Receptor Blocker (ARB) such as Valsartan, Losartan, or Candesartan to Sacubitril/Valsartan, NO washout period is required.',
    statementTextEn:
      'Mandatory 36-Hour ACEi-to-ARNI Washout Rule: Because both ACE and neprilysin degrade bradykinin, switching from any ACE inhibitor to Sacubitril/Valsartan (or vice versa) requires a strict >= 36-hour medication-free washout interval to prevent life-threatening laryngeal angioedema. NO washout period is required when switching from an ARB (Valsartan, Losartan, Candesartan) to Sacubitril/Valsartan.',
    statementTextAr:
      'قاعدة فترة التوقف الإلزامية (36 ساعة) بين مثبطات ACE وEntresto: نظراً لأن كلاً من إنزيم ACE وإنزيم النيبريليسين يفككان البراديكينين، فإن الانتقال من أي مثبط ACE إلى Sacubitril/Valsartan يتطلب فترة توقف صارمة لا تقل عن 36 ساعة لمنع الوذمة الوعائية الحنجرية القاتلة. بينما لا حاجة لأي فترة توقف عند الانتقال من حاصرات مستقبلات الأنجيوتنسين (ARB).',
    generationMethod: 'verbatim_extraction',
    statementType: 'dosing_rule',
    population: 'adults',
    recommendationStrength: 'Class I / Boxed Contraindication',
    evidenceLevel: 'Level B-R',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-arni-sacubitril-valsartan-36-hour-acei-washout-no-arb-washout',
    citations: [
      {
        id: 'cit-hf-washout-1a',
        knowledgeStatementId: 'stmt-hf-arni-washout-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec4',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 4.0: ARNI Initiation Protocol & The 36-Hour ACEi Washout Mandate',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'When switching from any ACE inhibitor (Lisinopril, Enalapril, Ramipril, Captopril, Perindopril) to Sacubitril/Valsartan, clinicians MUST ensure that at least 36 hours have elapsed... When switching from an ARB to Sacubitril/Valsartan, NO washout period is required.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-washout-1b',
        knowledgeStatementId: 'stmt-hf-arni-washout-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s1',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure',
        sectionReference: 'Section 2.1',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'Mandatory 36-hour washout when switching from any ACE inhibitor (no washout required when switching from an ARB).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-washout-1c',
        knowledgeStatementId: 'stmt-hf-arni-washout-1',
        sourceId: 'stockleys-drug-interactions',
        monographChapterId: 'stockleys-sec2-cardiovascular-qtc-raas',
        monographSectionId: 'stk-2-1',
        edition: "Stockley's 2026 Hospital Edition",
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Cardiovascular, Antiarrhythmic, QTc Prolongation & RAAS/Hyperkalemia Interactions',
        sectionReference: 'Section 2.1: ACE Inhibitors + Sacubitril/Valsartan (ARNI)',
        pageRange: 'pp. 412–640',
        verbatimExcerpt:
          "Stockley's Directive: Absolute contraindication. Do not administer Sacubitril/Valsartan within 36 hours of the last dose of any ACE inhibitor (and vice versa).",
        sourceLocationUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-1',
        citationRole: 'ddi_mechanism_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 10: therapeutic_protocols (Cardiogenic Shock Milrinone vs Dobutamine & Norepinephrine)
  {
    id: 'stmt-hf-shock-inotropes-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:therapeutic_protocols',
    sectionKey: 'therapeutic_protocols',
    statementOrder: 1,
    verbatimSourceText:
      'Selecting Between Dobutamine and Milrinone (DOREMI Trial): Dobutamine (0.5–20 mcg/kg/min IV; t1/2 = 2 minutes): Beta-1 and Beta-2 adrenergic receptor agonist. Preferred in patients with acute kidney injury (hepatically/tissularly metabolized via COMT) or borderline blood pressure. Milrinone (0.125–0.5 mcg/kg/min IV; t1/2 = 2.5 hours in normal renal function, prolonged up to 6–12 hours in AKI): Phosphodiesterase-3 (PDE-3) inhibitor that elevates intracellular cAMP independently of Beta-1 receptors. Milrinone is PREFERRED over Dobutamine in patients maintained on chronic Beta-Blockers (especially non-selective Carvedilol) and in patients with severe Pulmonary Hypertension / Right Ventricular failure due to potent pulmonary arterial vasodilation. Omit the Milrinone loading bolus in hypotensive patients, and reduce maintenance rate by 50% when CrCl <30 mL/min. First-Line Vasopressor in Cardiogenic Shock (SOAP-II Trial): Norepinephrine (0.02–1.0 mcg/kg/min) is strictly preferred over Dopamine.',
    statementTextEn:
      'Cardiogenic Shock (Subset IV Cold & Wet) Pharmacology: (1) Norepinephrine (0.02–1.0 mcg/kg/min) is strictly preferred over Dopamine as first-line vasopressor when MAP < 65 or SBP < 90 mmHg (SOAP-II trial); (2) Milrinone (PDE-3 inhibitor, 0.125–0.5 mcg/kg/min) acts downstream of Beta-1 receptors and is preferred over Dobutamine in patients on chronic Beta-Blockers (Carvedilol) or with pulmonary hypertension, but is 85% renally cleared (omit loading bolus and reduce dose by 50% if CrCl < 30 mL/min); (3) Dobutamine (2.5–20 mcg/kg/min, t1/2 = 2 min) is preferred in severe AKI.',
    statementTextAr:
      'الفارماكولوجيا السريرية للصدمة القلبية (النمط الرابع Cold & Wet): (1) يُفضل Norepinephrine كرافع ضغط أول بدلاً من Dopamine لخفض الوفيات واضطرابات النظم (دراسة SOAP-II)؛ (2) يُفضل Milrinone (مثبط PDE-3 بجرعة 0.125–0.5 مكغ/كجم/د) لدى المرضى المستمرين على حاصرات بيتا المزمنة (مثل Carvedilol) أو المصابين بارتفاع الضغط الرئوي، مع إلغاء الجرعة التحميلية وخفض الصيانة 50% عند CrCl < 30 مل/د؛ (3) يُفضل Dobutamine في القصور الكلوي الحاد.',
    generationMethod: 'verbatim_extraction',
    statementType: 'protocol_step',
    population: 'icu_critical',
    recommendationStrength: 'AHA/ACC Consensus',
    evidenceLevel: 'Level B-R (SOAP-II & DOREMI Trials)',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-cardiogenic-shock-milrinone-vs-dobutamine-norepinephrine-over-dopamine',
    citations: [
      {
        id: 'cit-hf-shock-1a',
        knowledgeStatementId: 'stmt-hf-shock-inotropes-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch1-adhf-shock',
        monographSectionId: 'bccp-c1-s3',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'BCCP Ch. 1: ADHF, Nohria-Stevenson Quadrants & Cardiogenic Shock',
        sectionReference: 'Section 1.3: Cardiogenic Shock Pharmacology: Milrinone vs Dobutamine & Norepinephrine',
        pageRange: 'BCCP pp. 1-1 to 1-74',
        verbatimExcerpt:
          'Milrinone is PREFERRED over Dobutamine in patients maintained on chronic Beta-Blockers (especially non-selective Carvedilol)... Omit the Milrinone loading bolus in hypotensive patients, and reduce maintenance rate by 50% when CrCl <30 mL/min. Norepinephrine is strictly preferred over Dopamine in cardiogenic shock (SOAP-II Trial).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-shock-1b',
        knowledgeStatementId: 'stmt-hf-shock-inotropes-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec7',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 7.0: Subset IV: Cold & Wet',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Milrinone: Phosphodiesterase-3 (PDE3) inhibitor. Initial dose: 0.125 to 0.25 mcg/kg/min... Elimination is exclusively renal; dose must be reduced in renal insufficiency. Preferred over Dobutamine in patients receiving chronic beta-blocker therapy.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec7',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 12: organ_dose_adjustment (Expected 30% SCr bump & MRA hyperkalemia gates)
  {
    id: 'stmt-hf-organ-scr-bump-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:organ_dose_adjustment',
    sectionKey: 'organ_dose_adjustment',
    statementOrder: 1,
    verbatimSourceText:
      'When initiating RAAS inhibitors (ARNI, ACEi, ARB) or SGLT2 inhibitors, an initial rise in serum creatinine of up to 30% above baseline is hemodynamically expected due to efferent arteriolar vasodilation or intraglomerular pressure reduction. This does NOT indicate structural tubular injury and does not warrant discontinuing GDMT unless progressive refractory hyperkalemia (K > 5.5 mEq/L) or anuria intervenes.',
    statementTextEn:
      'Hemodynamic Serum Creatinine Rule on GDMT: An increase in Serum Creatinine of up to 30% above baseline after starting an ARNI/ACEi/ARB or SGLT2 inhibitor (or up to 0.3–0.5 mg/dL during active IV loop diuretic decongestion) reflects expected reduction in intraglomerular filtration pressure or hemoconcentration—DO NOT discontinue life-saving GDMT unless SCr rises > 30% with refractory hyperkalemia (K+ > 5.5 mEq/L) or anuria.',
    statementTextAr:
      'قاعدة الارتفاع المتوقع في الكرياتينين مع أدوية GDMT: إن ارتفاع كرياتينين المصل بنسبة تصل إلى 30% من خط الأساس بعد بدء ARNI/ACEi/ARB أو مثبطات SGLT2 يعكس انخفاضاً هيموديناميكياً متوقعاً في الضغط داخل الكبيبة ولا يعني أذية أنبوبية؛ لذا يُمنع إيقاف أدوية GDMT المنقذة للحياة إلا إذا تجاوز الارتفاع 30% أو رافقه فرط بوتاسيوم معند (K+ > 5.5 mEq/L) أو انقطاع بول.',
    generationMethod: 'verbatim_extraction',
    statementType: 'organ_adjustment_rule',
    population: 'renal_impairment',
    recommendationStrength: 'Class I Clinical Pearl',
    evidenceLevel: 'Consensus / Guideline Mandate',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-renal-creatinine-bump-up-to-30-percent-continue-gdmt-k-5.5-gate',
    citations: [
      {
        id: 'cit-hf-scr-1a',
        knowledgeStatementId: 'stmt-hf-organ-scr-bump-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec8',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 8.0: Cardiorenal Syndrome & Management of Azotemia',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'When initiating RAAS inhibitors (ARNI, ACEi, ARB) or SGLT2 inhibitors, an initial rise in serum creatinine of up to 30% above baseline is hemodynamically expected... does not warrant discontinuing GDMT unless progressive refractory hyperkalemia (K > 5.5 mEq/L) or anuria intervenes.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec8',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-scr-1b',
        knowledgeStatementId: 'stmt-hf-organ-scr-bump-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch1-adhf-shock',
        monographSectionId: 'bccp-c1-s2',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'BCCP Ch. 1: ADHF & Cardiogenic Shock',
        sectionReference: 'Section 1.2: DOSE Trial Strategy',
        pageRange: 'BCCP pp. 1-1 to 1-74',
        verbatimExcerpt:
          'Transient rises in Serum Creatinine up to 0.3–0.5 mg/dL during active decongestion represent hemoconcentration rather than true tubular injury and must NOT prompt premature diuretic discontinuation.',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s2',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 13: monitoring_followup (Digoxin TDM & Stockley P-gp Interaction)
  {
    id: 'stmt-hf-digoxin-tdm-ddi-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:monitoring_followup',
    sectionKey: 'monitoring_followup',
    statementOrder: 1,
    verbatimSourceText:
      'Digoxin Therapeutic Drug Monitoring: Therapeutic Serum Concentration: 0.5 to 0.9 ng/mL in Heart Failure (HFrEF); 0.8 to 1.2 ng/mL in Atrial Fibrillation. Mandatory Sampling Window: Digoxin exhibits a prolonged 6-to-8-hour two-compartment tissue distribution phase into skeletal and cardiac muscle. Always draw Digoxin troughs >=6–8 hours post-dose. Digoxin + Amiodarone / Verapamil / Clarithromycin: inhibit renal and intestinal P-glycoprotein (P-gp), doubling serum digoxin concentrations. Stockley’s Action: Halve the digoxin maintenance dose (reduce by 50%) immediately when starting Amiodarone.',
    statementTextEn:
      'Digoxin TDM & P-gp Interaction Protocol in HFrEF: Target serum Digoxin trough is strictly 0.5–0.9 ng/mL in HFrEF, drawn >= 6 to 8 hours post-dose (levels drawn < 6h post-dose are falsely elevated due to the myocardial distribution phase). Reduce Digoxin dose by 50% immediately when initiating Amiodarone, Verapamil, or Clarithromycin (P-gp inhibition), and maintain K+ > 4.0 mEq/L and Mg2+ > 2.0 mg/dL.',
    statementTextAr:
      'مراقبة تركيز الديجوكسين (TDM) وتداخلاته في HFrEF: النطاق العلاجي المستهدف في قصور القلب هو 0.5–0.9 ng/mL حصراً، وتُسحب العينة بعد >= 6 إلى 8 ساعات من الجرعة (السحب قبل 6 ساعات يعطي ارتفاعاً كاذباً بسبب طور التوزيع النسيجي). يجب خفض جرعة Digoxin بنسبة 50% فوراً عند بدء Amiodarone أو Verapamil أو Clarithromycin (تثبيط مضخة P-gp)، مع الحفاظ على البوتاسيوم > 4.0 mEq/L والمغنيسيوم > 2.0 mg/dL.',
    generationMethod: 'verbatim_extraction',
    statementType: 'monitoring_parameter',
    population: 'adults',
    recommendationStrength: 'TDM & Stockley High-Alert Mandate',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-digoxin-tdm-0.5-0.9-sampling-6-8h-amiodarone-reduce-50-percent',
    citations: [
      {
        id: 'cit-hf-dig-1a',
        knowledgeStatementId: 'stmt-hf-digoxin-tdm-ddi-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-2026-v2-c7',
        monographSectionId: 'v2c7-s3',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 17,
        chapterTitle: 'Chapter 17: Clinical Pharmacokinetics & Therapeutic Drug Monitoring',
        sectionReference: 'Section 17.3: Digoxin Distribution-Phase Sampling',
        pageRange: 'pp. 2-323 to 2-362',
        verbatimExcerpt:
          'Therapeutic Serum Concentration: 0.5 to 0.9 ng/mL in Heart Failure (HFrEF)... Always draw Digoxin troughs >=6–8 hours post-dose.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c7/v2c7-s3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-dig-1b',
        knowledgeStatementId: 'stmt-hf-digoxin-tdm-ddi-1',
        sourceId: 'stockleys-drug-interactions',
        monographChapterId: 'stockleys-sec2-cardiovascular-qtc-raas',
        monographSectionId: 'stk-2-2',
        edition: "Stockley's 2026 Hospital Edition",
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Cardiovascular, Antiarrhythmic, QTc Prolongation & RAAS/Hyperkalemia Interactions',
        sectionReference: 'Section 2.2: Digoxin + Amiodarone / Verapamil / Clarithromycin',
        pageRange: 'pp. 412–640',
        verbatimExcerpt:
          "Stockley's Action: Halve the digoxin maintenance dose (reduce by 50%) immediately when starting Amiodarone or Verapamil, and monitor serum digoxin trough levels (target 0.5–0.9 ng/mL in HFrEF).",
        sourceLocationUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-2',
        citationRole: 'ddi_mechanism_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 2: epidemiology_risk_factors
  {
    id: 'stmt-hf-epi-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:epidemiology_risk_factors',
    sectionKey: 'epidemiology_risk_factors',
    statementOrder: 1,
    verbatimSourceText:
      'Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection. Heart failure with reduced ejection fraction (HFrEF) is defined by a left ventricular ejection fraction (LVEF) <= 40% and accounts for approximately 50% of all hospitalized heart failure cases. Coronary artery disease (ischemic cardiomyopathy) and longstanding poorly controlled systemic hypertension account for over 70% of HFrEF cases.',
    statementTextEn:
      'HFrEF (LVEF <= 40%) accounts for ~50% of all heart failure hospitalizations; coronary artery disease (ischemic cardiomyopathy) and longstanding systemic hypertension are the primary etiologic risk factors, accounting for > 70% of cases (alongside dilated cardiomyopathy, valvular disease, and cardiotoxic chemotherapy such as anthracyclines and trastuzumab).',
    statementTextAr:
      'يشكل قصور القلب بانخفاض الكسر القذفي (HFrEF؛ LVEF <= 40%) نحو 50% من حالات التنويم بقصور القلب؛ ويُعد مرض الشريان التاجي (اعتلال العضلة القلبية الإقفاري) وارتفاع ضغط الدم المزمن غير المضبوط السببين الرئيسيين لأكثر من 70% من الحالات (إلى جانب اعتلالات العضلة القلبية التوسعية، أمراض الصمامات، والعلاج الكيميائي مثل الأنثراسيكلينات وTrastuzumab).',
    generationMethod: 'verbatim_extraction',
    statementType: 'epidemiology_fact',
    population: 'adults',
    evidenceLevel: 'Epidemiologic Consensus (DiPiro Ch. 15)',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'hf-epidemiology-hfref-50-percent-cad-hypertension-70-percent',
    citations: [
      {
        id: 'cit-hf-epi-1',
        knowledgeStatementId: 'stmt-hf-epi-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 1.0: Epidemiology, Etiology, and Neurohormonal Pathophysiology',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Heart failure with reduced ejection fraction (HFrEF) is defined by a left ventricular ejection fraction (LVEF) <= 40% and accounts for approximately 50% of all hospitalized heart failure cases. Coronary artery disease (ischemic cardiomyopathy) and longstanding poorly controlled systemic hypertension account for over 70% of HFrEF cases.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 5: classification_diagnosis
  {
    id: 'stmt-hf-class-staging-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:classification_diagnosis',
    sectionKey: 'classification_diagnosis',
    statementOrder: 1,
    verbatimSourceText:
      'ACC/AHA Stages of Heart Failure (Structural Progression): - Stage A (At Risk for HF)... - Stage B (Pre-HF)... - Stage C (Symptomatic HF)... - Stage D (Advanced HF). NYHA Functional Classification (Symptom Severity): - Class I: No limitation of physical activity... - Class II: Slight limitation... - Class III: Marked limitation... - Class IV: Unable to carry on any physical activity without discomfort; symptoms of heart failure at rest. Every patient admitted with Acute Decompensated Heart Failure (ADHF) must be immediately categorized along two clinical axes: Volume Status (Wet vs. Dry, reflecting left ventricular filling pressure / pulmonary capillary wedge pressure [PCWP <=18 vs >18 mmHg]) and Perfusion Status (Warm vs. Cold, reflecting cardiac index [CI >=2.2 vs <2.2 L/min/m2]).',
    statementTextEn:
      'Heart Failure is classified across 3 complementary systems: (1) ACC/AHA Structural Stages A (At Risk), B (Pre-HF structural disease without symptoms), C (Symptomatic HF), and D (Advanced refractory HF); (2) NYHA Functional Classes I–IV; and (3) Nohria-Stevenson / Forrester Acute Hemodynamic Subsets I–IV based on Congestion (PCWP <= 18 Dry vs > 18 mmHg Wet) and Perfusion (CI >= 2.2 Warm vs < 2.2 L/min/m2 Cold).',
    statementTextAr:
      'يُصنف قصور القلب عبر 3 أنظمة متكاملة: (1) المراحل البنيوية ACC/AHA من المرحلة A (معرض للخطر) وB (ما قبل قصور القلب) وC (قصور قلب عرضي) إلى D (قصور متقدم معند)؛ (2) التصنيف الوظيفي NYHA (الدرجات I–IV)؛ و(3) المربعات الهيموديناميكية الحادة Nohria-Stevenson (الأنماط I–IV) حسب ضغط الاسفين الشعري الرئوي (PCWP <= 18 جاف مقابل > 18 رطب) والمؤشر القلبي (CI >= 2.2 دافئ مقابل < 2.2 L/min/m2 بارد).',
    generationMethod: 'verbatim_extraction',
    statementType: 'diagnostic_criterion',
    population: 'adults',
    recommendationStrength: 'AHA/ACC/HFSA Class I',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-classification-acc-aha-stages-a-d-nyha-i-iv-nohria-stevenson-pcwp-18-ci-2.2',
    citations: [
      {
        id: 'cit-hf-class-1a',
        knowledgeStatementId: 'stmt-hf-class-staging-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec2',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 2.0: ACC/AHA Stages & NYHA Functional Classification',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'ACC/AHA Stages of Heart Failure (Structural Progression): - Stage A (At Risk for HF)... - Stage B (Pre-HF)... - Stage C (Symptomatic HF)... - Stage D (Advanced HF). NYHA Functional Classification (Symptom Severity): - Class I... - Class IV.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-class-1b',
        knowledgeStatementId: 'stmt-hf-class-staging-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch1-adhf-shock',
        monographSectionId: 'bccp-c1-s1',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 1,
        chapterTitle: 'BCCP Ch. 1: ADHF, Nohria-Stevenson Quadrants & Cardiogenic Shock',
        sectionReference: 'Section 1.1: Invasive & Bedside Hemodynamic Classification',
        pageRange: 'BCCP pp. 1-1 to 1-74',
        verbatimExcerpt:
          'Every patient admitted with Acute Decompensated Heart Failure (ADHF) must be immediately categorized along two clinical axes: Volume Status (Wet vs. Dry, reflecting left ventricular filling pressure / pulmonary capillary wedge pressure [PCWP <=18 vs >18 mmHg]) and Perfusion Status (Warm vs. Cold, reflecting cardiac index [CI >=2.2 vs <2.2 L/min/m2]).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s1',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 6: clinical_presentation
  {
    id: 'stmt-hf-pres-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:clinical_presentation',
    sectionKey: 'clinical_presentation',
    statementOrder: 1,
    verbatimSourceText:
      'Wet (PCWP > 18 mmHg): Orthopnea, paroxysmal nocturnal dyspnea (PND), jugular venous distension (JVD > 8 cm), S3 gallop, bibasilar rales, hepatomegaly, ascites, peripheral pitting edema. Cold (CI < 2.2 L/min/m2): Narrow pulse pressure (< 25% of SBP), cool/clammy extremities, altered mental status/somnolence, oliguria, rising serum lactate, and worsening azotemia.',
    statementTextEn:
      'Bedside Clinical Presentation along Two Hemodynamic Axes: (1) Congestion ("Wet" — PCWP > 18 mmHg): orthopnea, paroxysmal nocturnal dyspnea (PND), elevated JVD (> 8 cm), S3 gallop, pulmonary rales, hepatomegaly, ascites, and pitting peripheral edema; (2) Hypoperfusion ("Cold" — CI < 2.2 L/min/m2): narrow pulse pressure (< 25% of SBP), cool/clammy extremities, mental obtundation, oliguria (< 0.5 mL/kg/hr), and elevated lactate (> 2.0 mmol/L).',
    statementTextAr:
      'المظاهر السريرية حسب المحورين الهيموديناميكيين: (1) علامات الاحتقان (Wet — PCWP > 18 mmHg): ضيق النفس الاضطجاعي (Orthopnea)، ضيق النفس الليلي الانتيابي (PND)، انتباج وريد الوداجي (> 8 سم)، صوت القلب الثالث S3، الخراخر الرئوية، والوذمة المحيطية؛ (2) علامات نقص التروية (Cold — CI < 2.2): ضيق ضغط النبض (< 25% من الضغط الانقباضي)، برودة الأطراف، تغيم الوعي، قلة البول، وارتفاع اللاكتات (> 2.0 mmol/L).',
    generationMethod: 'verbatim_extraction',
    statementType: 'clinical_presentation',
    population: 'adults',
    evidenceLevel: 'Class I Clinical Assessment',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-clinical-presentation-wet-congestion-orthopnea-jvd-vs-cold-hypoperfusion',
    citations: [
      {
        id: 'cit-hf-pres-1a',
        knowledgeStatementId: 'stmt-hf-pres-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec7',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 7.0: Acute Decompensated Heart Failure (ADHF)',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Wet (PCWP > 18 mmHg): Orthopnea, paroxysmal nocturnal dyspnea (PND), jugular venous distension (JVD > 8 cm), S3 gallop, bibasilar rales, hepatomegaly, ascites, peripheral pitting edema. Cold (CI < 2.2 L/min/m2): Narrow pulse pressure (< 25% of SBP), cool/clammy extremities, altered mental status/somnolence, oliguria, rising serum lactate.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec7',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 8: differential_diagnosis
  {
    id: 'stmt-hf-diff-cascade-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:differential_diagnosis',
    sectionKey: 'differential_diagnosis',
    statementOrder: 1,
    verbatimSourceText:
      'Dihydropyridine CCB (Amlodipine/Nifedipine) -> Pre-capillary arteriolar vasodilation causing dependent ankle edema (NOT volume overload) -> Misinterpreting as Heart Failure and prescribing Furosemide (causes dehydration, falls, AKI, hypokalemia) -> Reduce CCB dose, switch to nighttime dosing, or add an ACEi/ARB (venodilator balances hydrostatic capillary pressure).',
    statementTextEn:
      'Critical Differential Diagnosis & Prescribing Cascade Trap: Dependent bilateral ankle edema caused by Dihydropyridine Calcium Channel Blockers (Amlodipine, Nifedipine) results from selective pre-capillary arteriolar vasodilation—NOT cardiac volume overload or right heart failure. Misdiagnosing CCB edema as Heart Failure and prescribing Furosemide precipitates volume depletion, falls, and AKI; instead, reduce CCB dose or add an ACEi/ARB to dilate post-capillary venules.',
    statementTextAr:
      'تشخيص تفريقي حاسم وفخ المتوالية الوصفية (Prescribing Cascade): وذمة الكاحلين الناتجة عن حاصرات الكالسيوم الدايهيدروبيريدينية (مثل Amlodipine) تنجم عن توسع الشرينات قبل الشعرية وليس عن فرط الحجم أو قصور القلب. تشخيصها خطأً كقصور قلب ووصف Furosemide يسبب التجفاف والسقوط والقصور الكلوي الحاد؛ والصواب هو خفض جرعة Amlodipine أو إضافة مثبط ACEi/ARB لتوسيع الوريدات بعد الشعرية.',
    generationMethod: 'verbatim_extraction',
    statementType: 'differential_diagnosis',
    population: 'geriatrics',
    recommendationStrength: 'AGS Beers & BCPS High-Yield Rule',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'hf-differential-amlodipine-precapillary-edema-prescribing-cascade-furosemide',
    citations: [
      {
        id: 'cit-hf-diff-1',
        knowledgeStatementId: 'stmt-hf-diff-cascade-1',
        sourceId: 'accp-2026-vol2',
        monographChapterId: 'accp-2026-v2-c8',
        monographSectionId: 'v2c8-s1',
        edition: '2026 Edition',
        publicationYear: 2026,
        chapterNumber: 18,
        chapterTitle: 'Chapter 18: Geriatrics: AGS Beers Criteria, Prescribing Cascades & Anticholinergic Burden',
        sectionReference: 'Section 18.1: Classic Prescribing Cascades to Intercept on Rounds',
        pageRange: 'pp. 2-363 to 2-398',
        verbatimExcerpt:
          'Dihydropyridine CCB (Amlodipine/Nifedipine) -> Pre-capillary arteriolar vasodilation causing dependent ankle edema (NOT volume overload) -> Misinterpreting as Heart Failure and prescribing Furosemide.',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c8/v2c8-s1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 14: complications
  {
    id: 'stmt-hf-comp-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:complications',
    sectionKey: 'complications',
    statementOrder: 1,
    verbatimSourceText:
      'Dual ACE + Neprilysin inhibition -> severe Bradykinin accumulation & fatal Angioedema. Spironolactone / Eplerenone + Potassium Supplements / Trimethoprim (TMP-SMX) / ACEi / ARB: Trimethoprim blocks epithelial sodium channels (ENaC) in the distal nephron identically to Amiloride. Combining TMP-SMX with an MRA or ACEi/ARB in elderly or CKD patients precipitates rapid, potentially fatal hyperkalemia (K+ > 6.5 mEq/L).',
    statementTextEn:
      'Major Pharmacotherapeutic Complications in Heart Failure: (1) Life-threatening Laryngeal Angioedema if Sacubitril/Valsartan is administered within 36 hours of an ACE inhibitor; (2) Lethal Hyperkalemia (K+ > 6.5 mEq/L) when Spironolactone/Eplerenone + ARNI/ACEi/ARB is combined with Trimethoprim-Sulfamethoxazole (ENaC blockade) or unmonitored K+ supplements; (3) Acute Kidney Injury ("Triple Whammy") if NSAIDs are added to RAASi + Loop Diuretic.',
    statementTextAr:
      'المضاعفات الدوائية الكبرى في علاج قصور القلب: (1) الوذمة الوعائية الحنجرية المهددة للحياة عند إعطاء Sacubitril/Valsartan خلال أقل من 36 ساعة من مثبطات ACE؛ (2) فرط البوتاسيوم القاتل (> 6.5 mEq/L) عند الجمع بين Spironolactone ومثبطات RAAS مع مضاد Trimethoprim-Sulfamethoxazole؛ (3) القصور الكلوي الحاد (Triple Whammy) عند تناول مضادات الالتهاب غير الستيرويدية NSAIDs مع مدر العروة ومثبط RAAS.',
    generationMethod: 'verbatim_extraction',
    statementType: 'complication_hazard',
    population: 'adults',
    recommendationStrength: 'Stockley Boxed Safety Alert',
    evidenceLevel: 'Class I',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-complications-angioedema-36h-trimethoprim-hyperkalemia-triple-whammy-aki',
    citations: [
      {
        id: 'cit-hf-comp-1a',
        knowledgeStatementId: 'stmt-hf-comp-1',
        sourceId: 'stockleys-drug-interactions',
        monographChapterId: 'stockleys-sec2-cardiovascular-qtc-raas',
        monographSectionId: 'stk-2-1',
        edition: "Stockley's 2026 Hospital Edition",
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'Cardiovascular, Antiarrhythmic, QTc Prolongation & RAAS/Hyperkalemia Interactions',
        sectionReference: 'Section 2.1: Dual RAAS Blockade, ARNI Washout, Hyperkalemia & The Triple Whammy',
        pageRange: 'pp. 412–640',
        verbatimExcerpt:
          'Trimethoprim blocks epithelial sodium channels (ENaC) in the distal nephron identically to Amiloride. Combining TMP-SMX with an MRA or ACEi/ARB in elderly or CKD patients precipitates rapid, potentially fatal hyperkalemia (K+ > 6.5 mEq/L).',
        sourceLocationUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 15: special_populations
  {
    id: 'stmt-hf-specpop-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:special_populations',
    sectionKey: 'special_populations',
    statementOrder: 1,
    verbatimSourceText:
      'Hydralazine + Isosorbide Dinitrate (H-ISDN): - Class I Recommendation: Self-identified African American patients with NYHA Class III–IV HFrEF already receiving optimal 4-pillar GDMT (A-HeFT trial: 43% mortality reduction). - Class IIb Recommendation: Patients with HFrEF who cannot tolerate an ARNI, ACEi, or ARB due to severe renal insufficiency, bilateral renal artery stenosis, or refractory hyperkalemia. Contraindications to ARNI/ACEi/ARB: Pregnancy (Category D/X fetotoxicity).',
    statementTextEn:
      'Special Populations in Heart Failure: (1) Self-identified African American patients with persistent NYHA Class III–IV HFrEF despite 4-pillar GDMT: add Hydralazine 37.5 mg + Isosorbide Dinitrate 20 mg PO TID -> target 75/40 mg PO TID (Class I, Level A — A-HeFT trial: 43% mortality reduction); (2) Pregnancy: ARNI, ACE inhibitors, ARBs, and MRAs are strictly CONTRAINDICATED due to severe fetal renal dysplasia and teratogenicity (manage with Hydralazine/Nitrates and Beta-blockers); (3) Severe CKD / Angioedema intolerant to all RAASi: use Hydralazine + Isosorbide Dinitrate (Class IIb).',
    statementTextAr:
      'الحالات الخاصة في قصور القلب: (1) المرضى ذوو الأصول الأفريقية المصابون بـ HFrEF من الدرجة NYHA III–IV رغم الركائز الأربع: يُضاف Hydralazine + Isosorbide Dinitrate (توصية Class I وفق دراسة A-HeFT؛ خفض الوفيات 43%)؛ (2) الحمل: يُمنع منعاً باتاً إعطاء ARNI وACEi وARB وSpironolactone بسبب التشوهات الجنينية الكلوية القاتلة؛ (3) عدم تحمل مثبطات RAAS بسبب القصور الكلوي المتقدم أو الوذمة الوعائية: يُستخدم Hydralazine + Isosorbide Dinitrate كبديل موسع وعائي.',
    generationMethod: 'verbatim_extraction',
    statementType: 'special_population_rule',
    population: 'adults',
    recommendationStrength: 'AHA/ACC Class I (A-HeFT) / Contraindicated in Pregnancy',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-special-populations-african-american-hisdn-aheft-pregnancy-raasi-contraindicated',
    citations: [
      {
        id: 'cit-hf-specpop-1a',
        knowledgeStatementId: 'stmt-hf-specpop-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s2',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure',
        sectionReference: 'Section 2.2: Phenotype-Specific HFrEF Adjuncts: H-ISDN',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'Class I Recommendation: Self-identified African American patients with NYHA Class III–IV HFrEF already receiving optimal 4-pillar GDMT (A-HeFT trial: 43% mortality reduction).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      },
      {
        id: 'cit-hf-specpop-1b',
        knowledgeStatementId: 'stmt-hf-specpop-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec4',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 4.0: Contraindications to ARNI',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Contraindications to ARNI: History of angioedema (hereditary, idiopathic, or prior ACEi/ARB-induced), pregnancy (Category D/X fetotoxicity), severe hepatic impairment (Child-Pugh Class C).',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
        citationRole: 'corroborating_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 16: discharge_criteria
  {
    id: 'stmt-hf-discharge-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:discharge_criteria',
    sectionKey: 'discharge_criteria',
    statementOrder: 1,
    verbatimSourceText:
      'Simultaneous or rapid-sequence initiation (within 2 to 4 weeks, ideally prior to hospital discharge per the STRONG-HF trial) of all four foundational classes reduces all-cause mortality by >60% in HFrEF (LVEF <=40%). Loop Diuretic Potency & Oral Bioavailability Equivalency: Furosemide 40 mg PO = Furosemide 20 mg IV (Oral bioavailability ~50%; highly variable 10–90%) = Torsemide 20 mg PO/IV (Bioavailability 80–100%) = Bumetanide 1 mg PO/IV (Bioavailability 80–100%).',
    statementTextEn:
      'Pre-Discharge Optimization & IV-to-PO Transition Rules: (1) Per the STRONG-HF paradigm, confirm resolution of resting congestion (euvolemia), transition from IV to stable oral loop diuretic for >= 24 hours (accounting for Furosemide 50% oral bioavailability: 20 mg IV = 40 mg PO, or convert to Torsemide 20 mg PO / Bumetanide 1 mg PO with 80–100% bioavailability), and initiate/optimize all 4 foundational GDMT pillars prior to hospital discharge with early 1-to-2-week follow-up.',
    statementTextAr:
      'معايير الخروج من المستشفى والتحويل الفموي (STRONG-HF): (1) التأكد من زوال الاحتقان والوصول للوزن الجاف، والتحويل من مدر العروة الوريدي إلى الفموي المستقر لمدة >= 24 ساعة قبل الخروج (مع مراعاة أن توافر Furosemide الفموي 50% فقط: 20 ملغ وريدي = 40 ملغ فموي، أو التحويل إلى Torsemide 20 mg أو Bumetanide 1 mg بتوافر حيوي 80–100%)، والبدء بالركائز الدوائية الأربع لـ GDMT قبل المغادرة.',
    generationMethod: 'verbatim_extraction',
    statementType: 'discharge_transition_rule',
    population: 'adults',
    recommendationStrength: 'AHA/ACC Class I (STRONG-HF)',
    evidenceLevel: 'Level B-R',
    certainty: 'high',
    verificationStatus: 'verified_single_source',
    normalizedFingerprint: 'hf-discharge-criteria-strong-hf-4-pillars-furosemide-iv-to-po-equivalency',
    citations: [
      {
        id: 'cit-hf-disch-1',
        knowledgeStatementId: 'stmt-hf-discharge-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s1',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure & 4-Pillar GDMT Sequencing',
        sectionReference: 'Section 2.1 & Ch. 1 Section 1.2',
        pageRange: 'BCCP pp. 1-1 to 1-148',
        verbatimExcerpt:
          'Simultaneous or rapid-sequence initiation (within 2 to 4 weeks, ideally prior to hospital discharge per the STRONG-HF trial) of all four foundational classes reduces all-cause mortality by >60% in HFrEF (LVEF <=40%).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 17: clinical_guidelines
  {
    id: 'stmt-hf-guidelines-summary-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:clinical_guidelines',
    sectionKey: 'clinical_guidelines',
    statementOrder: 1,
    verbatimSourceText:
      'In Heart Failure with Preserved Ejection Fraction (HFpEF, LVEF >=50%) and Mildly Reduced Ejection Fraction (HFmrEF, LVEF 41–49%), SGLT2 Inhibitors (Empagliflozin 10 mg daily [EMPEROR-Preserved] or Dapagliflozin 10 mg daily [DELIVER]) hold the highest level of recommendation (Class 2a, Level A) for reducing HF hospitalizations and cardiovascular death across the entire LVEF spectrum. Nonsteroidal MRA Finerenone (FINEARTS-HF) and steroidal MRA Spironolactone (TOPCAT) carry Class 2b recommendations.',
    statementTextEn:
      'AHA/ACC/HFSA Guideline Synthesis across LVEF Spectrum: (1) In HFrEF (LVEF <= 40%), all 4 pillars (ARNI, Evidence-based Beta-blocker, MRA, SGLT2i) carry Class I, Level A recommendations; (2) In HFmrEF (41–49%) and HFpEF (>= 50%), SGLT2 inhibitors (Dapagliflozin 10 mg or Empagliflozin 10 mg daily — DELIVER & EMPEROR-Preserved) hold the highest disease-modifying recommendation (Class 2a, Level A) alongside Loop Diuretics (Class I) for congestion, while Finerenone (FINEARTS-HF), Spironolactone (TOPCAT), and Sacubitril/Valsartan (PARAGON-HF) provide adjunctive reduction in HF hospitalizations (Class 2b).',
    statementTextAr:
      'خلاصة إرشادات AHA/ACC/HFSA عبر طيف الكسر القذفي: (1) في HFrEF (<= 40%) تحمل الركائز الأربع توصية الفئة الأولى (Class I, Level A)؛ (2) في HFmrEF (41–49%) وHFpEF (>= 50%) تتصدر مثبطات SGLT2 (Dapagliflozin أو Empagliflozin 10 mg يومياً — دراستا DELIVER وEMPEROR-Preserved) بأعلى توصية معدلة لسير المرض (Class 2a, Level A) مع مدرات العروة لإزالة الاحتقان (Class I)، تليها مضادات الألدوستيرون Finerenone/Spironolactone وEntresto (Class 2b).',
    generationMethod: 'verbatim_extraction',
    statementType: 'guideline_recommendation',
    population: 'adults',
    recommendationStrength: 'Class I (HFrEF) / Class 2a (HFpEF SGLT2i)',
    evidenceLevel: 'Level A',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-guidelines-aha-acc-hfsa-hfref-class1-hfpef-sglt2i-deliver-emperor-preserved',
    citations: [
      {
        id: 'cit-hf-guide-sum-1',
        knowledgeStatementId: 'stmt-hf-guidelines-summary-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s3',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure',
        sectionReference: 'Section 2.3: HFmrEF & HFpEF Evidence-Based Pharmacotherapy',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'In Heart Failure with Preserved Ejection Fraction (HFpEF, LVEF >=50%) and Mildly Reduced Ejection Fraction (HFmrEF, LVEF 41–49%), SGLT2 Inhibitors (Empagliflozin 10 mg daily [EMPEROR-Preserved] or Dapagliflozin 10 mg daily [DELIVER]) hold the highest level of recommendation (Class 2a, Level A).',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 18: references_evidence
  {
    id: 'stmt-hf-refs-summary-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:references_evidence',
    sectionKey: 'references_evidence',
    statementOrder: 1,
    verbatimSourceText:
      'Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection.',
    statementTextEn:
      'This Heart Failure knowledge topic is synthesized from 5 verified library references containing documented Heart Failure content: (1) DiPiro’s Pharmacotherapy 13th Ed (Ch. 15 & Ch. 30, pp. 185–248 & 375–411), (2) ACCP/ASHP Cardiology Pharmacy (BCCP) 2026 (Ch. 1 & Ch. 2, pp. 1-1 to 1-148), (3) ACCP Updates in Therapeutics 2026 Vol. 2 (Ch. 15, Ch. 17 Digoxin TDM, Ch. 18 Geriatric Cascades), (4) Stockley’s Drug Interactions 13th Ed (Sec. 2.1 RAAS/ARNI/MRA & Sec. 2.2 Digoxin P-gp DDIs, pp. 412–640), and (5) Pharmacotherapy Casebook 13th Ed (Sec. II §2.1, pp. 49–128).',
    statementTextAr:
      'تم تجميع موضوع قصور القلب من 5 مراجع موثقة في المكتبة تحتوي فعلياً على محتوى قصور القلب: (1) مرجع DiPiro الطبعة 13 (الفصل 15 والفصل 30)، (2) مرجع البورد التخصصي للقلب ACCP/ASHP Cardiology 2026 (الفصل 1 والفصل 2)، (3) موسوعة ACCP 2026 المجلد الثاني (الفصول 15 و17 و18)، (4) موسوعة Stockley للتداخلات الدوائية (القسم 2.1 و2.2)، و(5) دليل أخذ الحالات السريرية PPCP (القسم 2.1).',
    generationMethod: 'pharmacist_curated',
    statementType: 'clinical_pearl',
    population: 'adults',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-references-evidence-scope-5-verified-sources',
    citations: [
      {
        id: 'cit-hf-refs-sum-1',
        knowledgeStatementId: 'stmt-hf-refs-summary-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec1',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Sections 1.0–8.0',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec1',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 19: related_topics
  {
    id: 'stmt-hf-related-summary-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:related_topics',
    sectionKey: 'related_topics',
    statementOrder: 1,
    verbatimSourceText:
      'All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence.',
    statementTextEn:
      'Heart Failure is semantically connected to 13 verified clinical and pharmacological nodes in the Knowledge Graph: HFrEF, HFpEF, Acute Decompensated Heart Failure (ADHF), Cardiogenic Shock, Loop Diuretics, ACE Inhibitors, ARBs, ARNIs (Sacubitril/Valsartan), Evidence-Based Beta-Blockers, SGLT2 Inhibitors, Hyperkalemia, Chronic Kidney Disease (Cardiorenal Syndrome), and Hypertension.',
    statementTextAr:
      'يرتبط موضوع قصور القلب بعلاقات دلالية موثقة مع 13 عقدة سريرية ودوائية في شبكة المعرفة: HFrEF، وHFpEF، وقصور القلب الحاد غير المعاوض (ADHF)، والصدمة القلبية، ومدرات العروة، ومثبطات ACE، وحاصرات ARB، ومثبطات ARNI (Entresto)، وحاصرات بيتا المثبتة، ومثبطات SGLT2، وفرط البوتاسيوم، ومرض الكلى المزمن، وارتفاع ضغط الدم.',
    generationMethod: 'pharmacist_curated',
    statementType: 'clinical_pearl',
    population: 'adults',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-related-topics-13-connected-nodes-summary',
    citations: [
      {
        id: 'cit-hf-rel-sum-1',
        knowledgeStatementId: 'stmt-hf-related-summary-1',
        sourceId: 'dipiro-13th-ed',
        monographChapterId: 'dipiro-ch15-hf',
        monographSectionId: 'dipiro-hf-sec3',
        edition: '13th Edition (2026)',
        publicationYear: 2026,
        chapterNumber: 15,
        chapterTitle: 'Heart Failure with Reduced Ejection Fraction',
        sectionReference: 'Section 3.0',
        pageRange: 'pp. 185–248',
        verbatimExcerpt:
          'All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence.',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  },
  // Section 20: clinical_pearls_faqs
  {
    id: 'stmt-hf-pearls-1',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:clinical_pearls_faqs',
    sectionKey: 'clinical_pearls_faqs',
    statementOrder: 1,
    verbatimSourceText:
      'Ivabradine (Selective If Funny-Channel Inhibitor): Indicated in symptomatic NYHA Class II–III HFrEF patients with LVEF <=35% who are in NORMAL SINUS RHYTHM with a resting Heart Rate >=70 bpm despite maximally tolerated Beta-Blocker therapy (SHIFT trial). CONTRAINDICATED in Atrial Fibrillation (acts exclusively on the SA node).',
    statementTextEn:
      'High-Yield Board Pearls in Heart Failure: (1) Ivabradine (5 mg PO BID -> max 7.5 mg BID) acts exclusively on SA node If channels and requires LVEF <= 35%, Normal Sinus Rhythm, and resting HR >= 70 bpm on maximally tolerated Beta-blocker (CONTRAINDICATED in Atrial Fibrillation); (2) Never substitute immediate-release Metoprolol Tartrate for extended-release Metoprolol Succinate CR/XL; (3) Continue home oral Beta-blockers during Warm & Wet ADHF hospitalizations unless cardiogenic shock (Cold & Wet), severe hypotension (SBP < 85–90 mmHg), or high-grade AV block is present.',
    statementTextAr:
      'اللآلئ السريرية الفارقة في قصور القلب: (1) يعمل Ivabradine حصرياً على العقدة الجيبية الأذينية (SA Node) ويشترط كسراً قذفياً <= 35%، ونظماً جيبياً طبيعياً (Normal Sinus Rhythm)، ونبضاً أثناء الراحة >= 70 نبضة/د رغم الجرعة القصوى من حاصر بيتا (ويُمنع في الرجفان الأذيني)؛ (2) يُحظر استبدال Metoprolol Succinate ممتد المفعول بـ Metoprolol Tartrate قصير المفعول؛ (3) لا توقف حاصرات بيتا المزمنة عند تنويم المريض بنمط Warm & Wet إلا في حال الصدمة القلبية أو هبوط الضغط الشديد.',
    generationMethod: 'verbatim_extraction',
    statementType: 'clinical_pearl',
    population: 'adults',
    recommendationStrength: 'Class IIa (SHIFT Trial) / Board Exam Pearl',
    evidenceLevel: 'Level B-R',
    certainty: 'high',
    verificationStatus: 'verified_multi_source',
    normalizedFingerprint: 'hf-pearls-ivabradine-sinus-rhythm-hr-70-metoprolol-succinate-continue-bb-in-adhf',
    citations: [
      {
        id: 'cit-hf-pearl-1a',
        knowledgeStatementId: 'stmt-hf-pearls-1',
        sourceId: 'accp-cardiology-2026',
        monographChapterId: 'accp-cardio-2026-ch2-chronic-hf',
        monographSectionId: 'bccp-c2-s2',
        edition: '2026 BCCP Edition',
        publicationYear: 2026,
        chapterNumber: 2,
        chapterTitle: 'BCCP Ch. 2: Chronic Heart Failure',
        sectionReference: 'Section 2.2: Ivabradine',
        pageRange: 'BCCP pp. 1-75 to 1-148',
        verbatimExcerpt:
          'Ivabradine (Selective If Funny-Channel Inhibitor): Indicated in symptomatic NYHA Class II–III HFrEF patients with LVEF <=35% who are in NORMAL SINUS RHYTHM with a resting Heart Rate >=70 bpm despite maximally tolerated Beta-Blocker therapy (SHIFT trial). CONTRAINDICATED in Atrial Fibrillation.',
        sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s2',
        citationRole: 'primary_source',
        extractionMethod: 'curated_monograph'
      }
    ]
  }
];

export const HEART_FAILURE_DRUG_DOSING: ClinicalDrugDosing[] = [
  {
    id: 'dosing-hf-sacubitril-valsartan',
    drugId: 'drug-sacubitril-valsartan',
    drugGenericName: 'Sacubitril/Valsartan (Entresto — ARNI)',
    drugArabicName: 'ساكوبيتريل/فالسارتان (Entresto — مثبط ARNI)',
    indicationTopicId: 'topic-heart-failure',
    indicationLabelEn: 'HFrEF Foundational Pillar #1 (Preferred RAAS/Neprilysin Inhibitor)',
    indicationLabelAr: 'الركيزة الأولى لعلاج قصور القلب HFrEF (مفضل على ACEi/ARB)',
    population: 'adults',
    regimenPhase: 'initial_starting_dose',
    doseDisplay:
      'Start 49/51 mg PO BID (or 24/26 mg PO BID if ACEi/ARB-naive, eGFR < 30 mL/min, Child-Pugh B, or SBP 95–100 mmHg) -> Target 97/103 mg PO BID',
    doseMin: 24,
    doseMax: 97,
    doseUnit: 'mg (sacubitril component) PO BID',
    route: 'Oral (PO)',
    frequency: 'Twice daily (BID)',
    durationOrTitrationSchedule: 'Double dose every 2 to 4 weeks as tolerated to target 97/103 mg PO BID',
    maximumDose: '97/103 mg PO BID',
    administrationInstructionsEn:
      'Enforce strict 36-hour washout after the last dose of any ACE inhibitor before starting (no washout needed when switching from an ARB). Do not initiate if SBP < 95 mmHg or K+ > 5.0–5.2 mEq/L.',
    administrationInstructionsAr:
      'التزم بفترة توقف 36 ساعة كاملة بعد آخر جرعة من مثبطات ACE قبل البدء (لا حاجة لفترة توقف عند التحويل من ARB).',
    verbatimDosingExcerpt:
      'Standard Starting Dose: 49/51 mg PO BID... Reduced Starting Dose: 24/26 mg PO BID for patients who are ACEi/ARB naive, eGFR < 30 mL/min/1.73m2, or moderate hepatic impairment (Child-Pugh Class B)... Target dose of 97/103 mg PO BID.',
    sourceId: 'dipiro-13th-ed',
    monographChapterId: 'dipiro-ch15-hf',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-hf-arni-renal',
        dosingId: 'dosing-hf-sacubitril-valsartan',
        drugId: 'drug-sacubitril-valsartan',
        topicId: 'topic-heart-failure',
        organSystem: 'renal',
        parameterName: 'eGFR',
        thresholdExpression: 'eGFR < 30 mL/min/1.73m2',
        actionType: 'reduce_starting_dose',
        adjustmentInstructionEn: 'Initiate at reduced starting dose of 24/26 mg PO BID and titrate every 2–4 weeks.',
        adjustmentInstructionAr: 'ابدأ بالجرعة المخفضة 24/26 ملغ فموياً مرتين يومياً وعاير كل 2–4 أسابيع.',
        verbatimExcerpt: 'Reduced Starting Dose: 24/26 mg PO BID for patients who have severe renal impairment (eGFR < 30 mL/min/1.73m2).',
        sourceId: 'dipiro-13th-ed',
        pageRange: 'pp. 185–248',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4'
      },
      {
        id: 'adj-hf-arni-hepatic',
        dosingId: 'dosing-hf-sacubitril-valsartan',
        drugId: 'drug-sacubitril-valsartan',
        topicId: 'topic-heart-failure',
        organSystem: 'hepatic',
        parameterName: 'Child-Pugh Class',
        thresholdExpression: 'Child-Pugh Class B (Moderate) vs Class C (Severe)',
        actionType: 'reduce_starting_dose',
        adjustmentInstructionEn:
          'Child-Pugh Class B: start at 24/26 mg PO BID. Child-Pugh Class C (severe hepatic impairment): Strictly CONTRAINDICATED.',
        adjustmentInstructionAr:
          'في Child-Pugh B: ابدأ بجرعة 24/26 ملغ مرتين يومياً. في Child-Pugh C (القصور الكبدي الشديد): يُمنع استخدامه قطعياً.',
        verbatimExcerpt:
          'Reduced Starting Dose: 24/26 mg PO BID for moderate hepatic impairment (Child-Pugh Class B)... Contraindications: severe hepatic impairment (Child-Pugh Class C).',
        sourceId: 'dipiro-13th-ed',
        pageRange: 'pp. 185–248',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4'
      }
    ]
  },
  {
    id: 'dosing-hf-carvedilol',
    drugId: 'drug-carvedilol',
    drugGenericName: 'Carvedilol (Evidence-Based Beta-Blocker)',
    drugArabicName: 'كارفيديلول (Carvedilol — حاصر بيتا وألفا-1)',
    indicationTopicId: 'topic-heart-failure',
    indicationLabelEn: 'HFrEF Foundational Pillar #2 (Mortality-Reducing Beta-Blocker)',
    indicationLabelAr: 'الركيزة الثانية لعلاج قصور القلب HFrEF (أحد حاصرات بيتا الثلاثة المعتمدة)',
    population: 'adults',
    regimenPhase: 'initial_starting_dose',
    doseDisplay: 'Start 3.125 mg PO BID with food -> Target 25 mg PO BID (50 mg PO BID if weight > 85 kg)',
    doseMin: 3.125,
    doseMax: 50,
    doseUnit: 'mg PO BID',
    route: 'Oral (PO) with food',
    frequency: 'Twice daily (BID)',
    durationOrTitrationSchedule: 'Double dose every 2 weeks ONLY in hemodynamically stable, euvolemic patients',
    maximumDose: '25 mg PO BID (50 mg PO BID if body weight > 85 kg)',
    administrationInstructionsEn:
      'Take with food to slow absorption and reduce orthostatic hypotension. Do not initiate or up-titrate during acute decompensated fluid overload or cardiogenic shock.',
    administrationInstructionsAr:
      'يُؤخذ مع الطعام لتقليل هبوط الضغط الانتصابي. لا يُبدأ ولا تُرفع جرعته أثناء الاحتقان الحاد غير المعاوض أو الصدمة القلبية.',
    verbatimDosingExcerpt:
      'Carvedilol: Start 3.125 mg PO BID with food -> Target 25 mg PO BID (or 50 mg PO BID if body weight > 85 kg). Double dose every 2 weeks only in euvolemic/stable patients.',
    sourceId: 'dipiro-13th-ed',
    monographChapterId: 'dipiro-ch15-hf',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec5',
    generationMethod: 'verbatim_extraction',
    organAdjustments: []
  },
  {
    id: 'dosing-hf-spironolactone',
    drugId: 'drug-spironolactone',
    drugGenericName: 'Spironolactone (Mineralocorticoid Receptor Antagonist — MRA)',
    drugArabicName: 'سبيرونولاكتون (Spironolactone — مضاد مستقبلات الألدوستيرون)',
    indicationTopicId: 'topic-heart-failure',
    indicationLabelEn: 'HFrEF Foundational Pillar #3 (MRA Mortality & Fibrosis Reduction)',
    indicationLabelAr: 'الركيزة الثالثة لعلاج قصور القلب HFrEF (مضاد الألدوستيرون)',
    population: 'adults',
    regimenPhase: 'initial_starting_dose',
    doseDisplay: 'Start 12.5 to 25 mg PO once daily -> Target 25 to 50 mg PO once daily',
    doseMin: 12.5,
    doseMax: 50,
    doseUnit: 'mg PO daily',
    route: 'Oral (PO)',
    frequency: 'Once daily',
    durationOrTitrationSchedule: 'Recheck K+ and renal function at baseline, 1 week, 4 weeks, 12 weeks, and q6m',
    maximumDose: '50 mg PO once daily in HFrEF',
    administrationInstructionsEn:
      'Strict initiation prerequisites: Baseline Serum K+ <= 5.0 mEq/L AND eGFR >= 30 mL/min/1.73m2 (or SCr <= 2.5 mg/dL in men, <= 2.0 mg/dL in women).',
    administrationInstructionsAr:
      'شروط البدء الصارمة: بوتاسيوم المصل الأساسي <= 5.0 mEq/L ومعدل الترشيح الكبيبي eGFR >= 30 مل/دقيقة.',
    verbatimDosingExcerpt:
      'Spironolactone: Initial dose: 12.5 to 25 mg PO daily. Target dose: 25 to 50 mg PO daily. Strict Pre-requisite Safety Criteria: 1. Serum Potassium <= 5.0 mEq/L. 2. eGFR >= 30 mL/min/1.73m2.',
    sourceId: 'dipiro-13th-ed',
    monographChapterId: 'dipiro-ch15-hf',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-hf-mra-renal-k-gate',
        dosingId: 'dosing-hf-spironolactone',
        drugId: 'drug-spironolactone',
        topicId: 'topic-heart-failure',
        organSystem: 'hyperkalemia_gate',
        parameterName: 'Serum K+ & eGFR',
        thresholdExpression: 'eGFR < 30 mL/min/1.73m2 OR Serum K+ > 5.0 mEq/L (initiation) / >= 5.5 mEq/L (maintenance)',
        actionType: 'hold_or_contraindicated',
        adjustmentInstructionEn:
          'Contraindicated if baseline eGFR < 30 mL/min or K+ > 5.0 mEq/L. During therapy, reduce dose by 50% if K+ is 5.1–5.4 mEq/L, and HOLD immediately if K+ >= 5.5 mEq/L. Avoid concomitant TMP-SMX (Bactrim).',
        adjustmentInstructionAr:
          'يُمنع البدء عند eGFR < 30 أو K+ > 5.0. وأثناء العلاج، تُخفض الجرعة للنصف عند K+ بين 5.1–5.4، ويُوقف فوراً عند K+ >= 5.5 mEq/L.',
        verbatimExcerpt:
          'If K+ rises to 5.1–5.4 mEq/L, reduce dose by 50%. If K+ >= 5.5 mEq/L, hold MRA immediately.',
        sourceId: 'dipiro-13th-ed',
        pageRange: 'pp. 185–248',
        sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6'
      }
    ]
  },
  {
    id: 'dosing-hf-dapagliflozin-empagliflozin',
    drugId: 'drug-dapagliflozin',
    drugGenericName: 'Dapagliflozin / Empagliflozin (SGLT2 Inhibitor)',
    drugArabicName: 'داباغليفلوزين / إمباغليفلوزين (مثبطات SGLT2)',
    indicationTopicId: 'topic-heart-failure',
    indicationLabelEn: 'HFrEF, HFmrEF & HFpEF Foundational Pillar #4 (Across Entire LVEF Spectrum)',
    indicationLabelAr: 'الركيزة الرابعة لعلاج قصور القلب بكافة أنماطه (HFrEF وHFmrEF وHFpEF)',
    population: 'adults',
    regimenPhase: 'maintenance_target_dose',
    doseDisplay: 'Dapagliflozin 10 mg PO once daily OR Empagliflozin 10 mg PO once daily (no titration required)',
    doseMin: 10,
    doseMax: 10,
    doseUnit: 'mg PO daily',
    route: 'Oral (PO)',
    frequency: 'Once daily',
    durationOrTitrationSchedule: 'Starting dose and target dose are identical (10 mg PO daily)',
    maximumDose: '10 mg PO once daily',
    administrationInstructionsEn:
      'Initiate regardless of diabetes status down to eGFR >= 20 mL/min/1.73m2. Counsel on genital hygiene and sick-day rules (hold 3–4 days before major surgery or during acute fasting illness to prevent euDKA).',
    administrationInstructionsAr:
      'يُعطى بجرعة ثابتة 10 ملغ يومياً بغض النظر عن وجود السكري وحتى eGFR >= 20 مل/دقيقة. يُوقف مؤقتاً أثناء المرض الحاد أو قبل الجراحة بـ 3–4 أيام.',
    verbatimDosingExcerpt:
      'Dapagliflozin: 10 mg PO once daily (target and starting dose are identical; no titration required). Indicated down to eGFR 20-25 mL/min/1.73m2. Empagliflozin: 10 mg PO once daily... Indicated down to eGFR 20 mL/min/1.73m2.',
    sourceId: 'dipiro-13th-ed',
    monographChapterId: 'dipiro-ch15-hf',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6',
    generationMethod: 'verbatim_extraction',
    organAdjustments: [
      {
        id: 'adj-hf-sglt2i-renal-floor',
        dosingId: 'dosing-hf-dapagliflozin-empagliflozin',
        drugId: 'drug-dapagliflozin',
        topicId: 'topic-heart-failure',
        organSystem: 'renal',
        parameterName: 'eGFR',
        thresholdExpression: 'eGFR >= 20 mL/min/1.73m2',
        actionType: 'safe_no_adjustment_needed',
        adjustmentInstructionEn:
          'Retains full cardiovascular and renal protective efficacy down to eGFR >= 20 mL/min/1.73m2 (even though glycemic-lowering effect diminishes when eGFR < 45 mL/min).',
        adjustmentInstructionAr:
          'يحتفظ بكامل فعاليته في حماية القلب والكلى حتى eGFR >= 20 مل/دقيقة دون الحاجة لتعديل الجرعة.',
        verbatimExcerpt:
          'SGLT2 inhibitors lose their glycemic-lowering efficacy when eGFR falls <45 mL/min, but they RETAIN their full Heart Failure and CKD nephroprotective benefits down to eGFR >=20 mL/min.',
        sourceId: 'accp-2026-vol2',
        pageRange: 'pp. 2-219 to 2-274',
        sourceLocationUri: 'local://ref/verbatim/accp-2026-vol2/accp-2026-v2-c5/v2c5-s1'
      }
    ]
  }
];

export const HEART_FAILURE_TABLES_AND_ALGORITHMS: ClinicalTableOrAlgorithm[] = [
  {
    id: 'table-hf-4pillars-gdmt',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:pharmacotherapy_dosing',
    sectionKey: 'pharmacotherapy_dosing',
    artifactType: 'dosing_table',
    titleEn: 'Four Pillars of Guideline-Directed Medical Therapy (GDMT) in HFrEF',
    titleAr: 'الركائز الأربع للعلاج الدوائي الموجه بالدلائل لقصور القلب (GDMT)',
    headersEn: ['Drug Class / Agent', 'Starting Dose', 'Target Dose', 'Mandatory Clinical Titration & Safety Checks'],
    headersAr: ['فئة الدواء / الاسم العلمي', 'الجرعة الابتدائية', 'الجرعة الهدف (Target)', 'شروط المعايرة والسلامة السريرية'],
    rowsEn: [
      [
        'ARNI: Sacubitril/Valsartan (Entresto)',
        '49/51 mg PO BID (or 24/26 mg PO BID if ACEi-naive, SBP < 100, eGFR < 30, or Child-Pugh B)',
        '97/103 mg PO BID',
        'Enforce strict 36-hr washout if switching from ACEi (none from ARB). Monitor SBP, K+, and eGFR at 2 and 4 weeks. Contraindicated in history of angioedema, pregnancy, or Child-Pugh C.'
      ],
      [
        'Beta-Blocker: Carvedilol (Coreg)',
        '3.125 mg PO BID with food',
        '25 mg PO BID (or 50 mg PO BID if body weight > 85 kg)',
        'Double dose every 2 weeks ONLY in euvolemic/stable patients. Monitor for bradycardia (HR < 55 bpm), orthostasis, and fluid retention.'
      ],
      [
        'Beta-Blocker: Metoprolol Succinate XL (Toprol-XL)',
        '12.5 to 25 mg PO once daily',
        '200 mg PO once daily',
        'Must use Succinate (extended-release), NEVER Tartrate. Double dose every 2 weeks.'
      ],
      [
        'Beta-Blocker: Bisoprolol (Zebeta)',
        '1.25 mg PO once daily',
        '10 mg PO once daily',
        'Titrate every 2–4 weeks. Cardioselective beta-1 antagonist.'
      ],
      [
        'MRA: Spironolactone / Eplerenone',
        '12.5–25 mg PO OD (Spironolactone) | 25 mg PO OD (Eplerenone)',
        '25–50 mg PO OD (Spironolactone) | 50 mg PO OD (Eplerenone)',
        'Requires baseline K+ <= 5.0 mEq/L and eGFR >= 30 mL/min. Recheck BMP at 1, 4, and 12 weeks. Halve dose if K+ 5.1–5.4; hold if K+ >= 5.5 mEq/L.'
      ],
      [
        'SGLT2 Inhibitor: Dapagliflozin / Empagliflozin',
        '10 mg PO once daily',
        '10 mg PO once daily (no titration needed)',
        'Effective down to eGFR >= 20 mL/min across HFrEF, HFmrEF, and HFpEF regardless of diabetes status.'
      ]
    ],
    rowsAr: [
      [
        'ARNI: Sacubitril/Valsartan',
        '49/51 ملغ مرتين يومياً (أو 24/26 ملغ في eGFR < 30 أو Child-Pugh B أو بدون ACEi سابق)',
        '97/103 ملغ مرتين يومياً',
        'إلزامية انقضاء 36 ساعة عند التبديل من ACEi. يُمنع في الحمل وChild-Pugh C وسوابق الوذمة الوعائية.'
      ],
      [
        'Carvedilol',
        '3.125 ملغ مرتين يومياً مع الطعام',
        '25 ملغ مرتين يومياً (50 ملغ إذا كان الوزن > 85 كغ)',
        'تضاعف الجرعة كل أسبوعين فقط عند استقرار السوائل. مراقبة النبض (> 55) وهبوط الضغط الانتصابي.'
      ],
      [
        'Metoprolol Succinate XL',
        '12.5 إلى 25 ملغ يومياً',
        '200 ملغ يومياً',
        'استخدام Succinate ممتد المفعول حصراً وليس Tartrate. مضاعفة الجرعة كل أسبوعين.'
      ],
      [
        'Bisoprolol',
        '1.25 ملغ يومياً',
        '10 ملغ يومياً',
        'معايرة كل 2–4 أسابيع مع متابعة النبض وضغط الدم.'
      ],
      [
        'MRA: Spironolactone / Eplerenone',
        '12.5–25 ملغ يومياً (Spironolactone) | 25 ملغ (Eplerenone)',
        '25–50 ملغ يومياً (Spironolactone) | 50 ملغ (Eplerenone)',
        'يشترط بوتاسيوم أساسي <= 5.0 وeGFR >= 30. فحص الكهارل في الأسبوع 1 و4 و12. يُوقف عند K+ >= 5.5.'
      ],
      [
        'SGLT2i: Dapagliflozin / Empagliflozin',
        '10 ملغ يومياً',
        '10 ملغ يومياً (جرعة ثابتة)',
        'فعال حتى eGFR >= 20 مل/دقيقة في HFrEF وHFpEF بغض النظر عن وجود السكري.'
      ]
    ],
    sourceId: 'dipiro-13th-ed',
    monographChapterId: 'dipiro-ch15-hf',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3'
  },
  {
    id: 'table-hf-nohria-stevenson-adhf',
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:classification_diagnosis',
    sectionKey: 'classification_diagnosis',
    artifactType: 'hemodynamic_classification_table',
    titleEn: 'Nohria-Stevenson / Forrester Hemodynamic Quadrants & ADHF Therapeutic Algorithm',
    titleAr: 'جدول المربعات الهيموديناميكية (Nohria-Stevenson / Forrester) وخوارزمية علاج قصور القلب الحاد (ADHF)',
    headersEn: ['Hemodynamic Subset', 'Invasive Cutoffs (PCWP & CI)', 'Clinical Bedside Findings', 'Primary Pharmacotherapy'],
    headersAr: ['النمط الهيموديناميكي', 'معايير القسطرة (PCWP & CI)', 'المظاهر السريرية بجانب السرير', 'الخطة الدوائية الأساسية'],
    rowsEn: [
      [
        'Subset I: Warm & Dry',
        'PCWP <= 18 mmHg | CI >= 2.2 L/min/m2',
        'Adequate perfusion (warm extremities, normal mentation) + No congestion',
        'Compensated euvolemic state: initiate and titrate oral 4-Pillar GDMT. Avoid over-diuresis.'
      ],
      [
        'Subset II: Warm & Wet (~70–80%)',
        'PCWP > 18 mmHg | CI >= 2.2 L/min/m2',
        'Adequate perfusion (SBP > 100, warm) + Pulmonary rales, JVD > 8 cm, peripheral edema',
        'IV Loop Diuretics (1.0–2.5x home oral dose; Furosemide 40 mg PO = 20 mg IV = Torsemide 20 mg = Bumetanide 1 mg) ± IV Nitroglycerin/Nitroprusside if SBP > 110 mmHg. Add Metolazone or IV Acetazolamide (ADVOR) for diuretic resistance.'
      ],
      [
        'Subset III: Cold & Dry (< 5%)',
        'PCWP <= 18 mmHg | CI < 2.2 L/min/m2',
        'Hypoperfusion (cool extremities, oliguria, narrow pulse pressure) + No pulmonary congestion',
        'Cautious IV fluid challenge (250–500 mL isotonic crystalloid if PCWP < 15 mmHg); initiate IV Inotrope if hypoperfusion persists.'
      ],
      [
        'Subset IV: Cold & Wet (~15% — Cardiogenic Shock)',
        'PCWP > 18 mmHg | CI < 2.2 L/min/m2',
        'Hypoperfusion (SBP < 90, MAP < 65, elevated lactate) + Severe pulmonary congestion',
        'Hold Beta-blockers; start Norepinephrine (preferred over Dopamine if SBP < 90 / MAP < 65) + IV Inotrope (Milrinone preferred if on chronic Beta-blocker; Dobutamine preferred in AKI) + IV Loop Diuretic once perfusion pressure is restored.'
      ]
    ],
    rowsAr: [
      [
        'النمط الأول: Warm & Dry',
        'PCWP <= 18 | CI >= 2.2',
        'تروية كافية (أطراف دافئة، وعي سليم) + غياب الاحتقان',
        'حالة معاوضة: بدء ومعايرة الركائز الأربع الفموية (GDMT) وتجنب الإدرار المفرط.'
      ],
      [
        'النمط الثاني: Warm & Wet (70–80%)',
        'PCWP > 18 | CI >= 2.2',
        'تروية كافية + احتقان رئوي، ارتفاع JVD، ووذمات محيطية',
        'مدرات العروة الوريدية (1.0–2.5 ضعف الجرعة المنزلية؛ 40 ملغ فوروسيميد فموي = 20 ملغ وريدي) ± موسعات وريدية (Nitroglycerin) عند SBP > 110. إضافة Metolazone أو Acetazolamide لمقاومة الإدرار.'
      ],
      [
        'النمط الثالث: Cold & Dry (< 5%)',
        'PCWP <= 18 | CI < 2.2',
        'نقص تروية (برودة أطراف، قلة بول) + غياب الاحتقان الرئوي',
        'تجربة سوائل وريدية حذرة (250–500 مل سالين)؛ وإذا استمر نقص التروية يبدأ مقوي انقباض (Dobutamine).'
      ],
      [
        'النمط الرابع: Cold & Wet (صدمة قلبية)',
        'PCWP > 18 | CI < 2.2',
        'نقص تروية شديد (ضغط < 90، ارتفاع اللاكتات) + احتقان رئوي شديد',
        'إيقاف حاصرات بيتا؛ بدء Norepinephrine (مفضل على Dopamine) + مقوي انقباض (Milrinone للمرضى على حاصرات بيتا، أو Dobutamine في القصور الكلوي) + مدر وريدي بعد استعادة ضغط التروية.'
      ]
    ],
    sourceId: 'accp-cardiology-2026',
    monographChapterId: 'accp-cardio-2026-ch1-adhf-shock',
    pageRange: 'BCCP pp. 1-1 to 1-74',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s1'
  }
];

export const HEART_FAILURE_GUIDELINE_RECOMMENDATIONS: ClinicalGuidelineRecommendation[] = [
  {
    id: 'guideline-rec-hf-4pillars',
    guidelineId: 'guideline-aha-acc-hfsa-2022-2026',
    issuingOrganization: 'AHA / ACC / HFSA',
    guidelineTitleEn: 'AHA/ACC/HFSA Guideline for the Management of Heart Failure',
    guidelineTitleAr: 'إرشادات الكلية الأمريكية لأمراض القلب وجمعية القلب الأمريكية لتدبير قصور القلب',
    publicationYear: 2026,
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:clinical_guidelines',
    drugId: 'drug-sacubitril-valsartan',
    recommendationTitleEn: 'Four-Pillar GDMT Initiation & Rapid Pre-Discharge Sequencing in HFrEF',
    recommendationTitleAr: 'بدء الركائز الأربع المتزامن أو السريع قبل الخروج من المستشفى في HFrEF',
    recommendationTextEn:
      'Initiate ARNI (Sacubitril/Valsartan), Evidence-Based Beta-Blocker (Carvedilol, Metoprolol Succinate, or Bisoprolol), MRA (Spironolactone or Eplerenone), and SGLT2 Inhibitor (Dapagliflozin or Empagliflozin) in all eligible HFrEF patients to reduce mortality by >60–73%.',
    recommendationTextAr:
      'البدء بالركائز الأربع (ARNI، حاصر بيتا مثبت، MRA، ومثبط SGLT2) لدى جميع مرضى HFrEF المؤهلين لخفض الوفيات الكلية بنسبة تتجاوز 60–73%.',
    recommendationClass: 'Class I (Strong)',
    evidenceLevel: 'Level A',
    landmarkTrials: ['PARADIGM-HF', 'COPERNICUS', 'MERIT-HF', 'CIBIS-II', 'RALES', 'EPHESUS', 'DAPA-HF', 'EMPEROR-Reduced', 'STRONG-HF'],
    verbatimExcerpt:
      'All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence.',
    sourceId: 'dipiro-13th-ed',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3'
  },
  {
    id: 'guideline-rec-hfpef-sglt2i',
    guidelineId: 'guideline-aha-acc-hfsa-2022-2026',
    issuingOrganization: 'AHA / ACC / HFSA',
    guidelineTitleEn: 'AHA/ACC/HFSA Guideline for the Management of Heart Failure (HFmrEF & HFpEF)',
    guidelineTitleAr: 'توصيات علاج قصور القلب مع كسر قذفي محفوظ (HFpEF) ومتوسط (HFmrEF)',
    publicationYear: 2026,
    topicId: 'topic-heart-failure',
    sectionId: 'topic-hf:clinical_guidelines',
    drugId: 'drug-dapagliflozin',
    recommendationTitleEn: 'SGLT2 Inhibitors Across the Entire LVEF Spectrum (HFmrEF & HFpEF)',
    recommendationTitleAr: 'مثبطات SGLT2 كخط علاجي أول في HFmrEF وHFpEF',
    recommendationTextEn:
      'Empagliflozin 10 mg daily (EMPEROR-Preserved) or Dapagliflozin 10 mg daily (DELIVER) is recommended in HFmrEF (LVEF 41–49%) and HFpEF (LVEF >= 50%) to reduce HF hospitalizations and cardiovascular death.',
    recommendationTextAr:
      'يُوصى بـ Empagliflozin 10 mg أو Dapagliflozin 10 mg يومياً في مرضى HFmrEF وHFpEF لخفض التنويم القلبي والوفيات القلبية الوعائية.',
    recommendationClass: 'Class 2a (Moderate-Strong)',
    evidenceLevel: 'Level A',
    landmarkTrials: ['EMPEROR-Preserved', 'DELIVER', 'FINEARTS-HF', 'PARAGON-HF'],
    verbatimExcerpt:
      'SGLT2 Inhibitors (Empagliflozin 10 mg daily [EMPEROR-Preserved] or Dapagliflozin 10 mg daily [DELIVER]) hold the highest level of recommendation (Class 2a, Level A) for reducing HF hospitalizations and cardiovascular death across the entire LVEF spectrum.',
    sourceId: 'accp-cardiology-2026',
    pageRange: 'BCCP pp. 1-75 to 1-148',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s3'
  }
];

/**
 * All 13 required connected clinical topics for Heart Failure, each grounded in
 * documented library sources with explicit semantic relationship types and deep links.
 */
export const HEART_FAILURE_TOPIC_RELATIONSHIPS: TopicRelationship[] = [
  {
    id: 'rel-hf-hfref',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-hfref',
    targetTopicCanonicalName: 'HFrEF (Heart Failure with Reduced Ejection Fraction)',
    targetTopicTitleEn: 'HFrEF (Heart Failure with Reduced Ejection Fraction, LVEF <= 40%)',
    targetTopicTitleAr: 'قصور القلب بانخفاض الكسر القذفي (HFrEF — LVEF <= 40%)',
    targetTopicType: 'subphenotype',
    relationshipType: 'parent_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Primary systolic subphenotype of Heart Failure (LVEF <= 40%) managed with the 4 mortality-reducing GDMT pillars (ARNI, Beta-blocker, MRA, SGLT2i).',
    relationshipDescriptionAr:
      'النمط الانقباضي الرئيسي لقصور القلب (LVEF <= 40%) ويعالج بالركائز الدوائية الأربع الخافضة للوفيات.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§1.0–6.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec3'
  },
  {
    id: 'rel-hf-hfpef',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-hfpef',
    targetTopicCanonicalName: 'HFpEF (Heart Failure with Preserved Ejection Fraction)',
    targetTopicTitleEn: 'HFpEF (Heart Failure with Preserved Ejection Fraction, LVEF >= 50%)',
    targetTopicTitleAr: 'قصور القلب بحفظ الكسر القذفي (HFpEF — LVEF >= 50%)',
    targetTopicType: 'subphenotype',
    relationshipType: 'parent_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Diastolic subphenotype (LVEF >= 50%) anchored by SGLT2 inhibitors (EMPEROR-Preserved, DELIVER), Finerenone/Spironolactone, and loop diuretics for congestion.',
    relationshipDescriptionAr:
      'النمط الانبساطي لقصور القلب (LVEF >= 50%) ويرتكز علاجه على مثبطات SGLT2 ومضادات الألدوستيرون والمدرات.',
    primarySourceId: 'accp-cardiology-2026',
    chapterReference: 'Ch. 2 (§2.3)',
    pageRange: 'BCCP pp. 1-75 to 1-148',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s3',
    targetTopicUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch2-chronic-hf/bccp-c2-s3'
  },
  {
    id: 'rel-hf-adhf',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-adhf',
    targetTopicCanonicalName: 'Acute Decompensated Heart Failure (ADHF)',
    targetTopicTitleEn: 'Acute Decompensated Heart Failure (ADHF — Nohria-Stevenson Subsets I–IV)',
    targetTopicTitleAr: 'قصور القلب الحاد غير المعاوض (ADHF — أنماط Nohria-Stevenson)',
    targetTopicType: 'acute_emergency',
    relationshipType: 'parent_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Acute inpatient decompensation stratified by PCWP (<= 18 vs > 18 mmHg) and Cardiac Index (>= 2.2 vs < 2.2 L/min/m2) to guide IV loop diuretics, vasodilators, and inotropes.',
    relationshipDescriptionAr:
      'التفاقم الحاد لقصور القلب ويُصنف هيموديناميكياً لتوجيه مدرات العروة الوريدية والموسعات الوعائية ومقويات الانقباض.',
    primarySourceId: 'accp-cardiology-2026',
    chapterReference: 'Ch. 1 (§1.1–1.2)',
    pageRange: 'BCCP pp. 1-1 to 1-74',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s1',
    targetTopicUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s1'
  },
  {
    id: 'rel-hf-cardiogenic-shock',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-cardiogenic-shock',
    targetTopicCanonicalName: 'Cardiogenic Shock (Subset IV Cold & Wet)',
    targetTopicTitleEn: 'Cardiogenic Shock (Nohria-Stevenson Subset IV: Cold & Wet)',
    targetTopicTitleAr: 'الصدمة القلبية (النمط الرابع Cold & Wet)',
    targetTopicType: 'acute_emergency',
    relationshipType: 'complication_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Severe low-output state (CI < 2.2 L/min/m2, PCWP > 18 mmHg, SBP < 90 mmHg, elevated lactate) requiring Beta-blocker hold, Norepinephrine (first-line vasopressor), and Milrinone or Dobutamine.',
    relationshipDescriptionAr:
      'حالة نقص النتاج القلبي الحرجة وتتطلب إيقاف حاصرات بيتا والبدء بـ Norepinephrine مع Milrinone أو Dobutamine.',
    primarySourceId: 'accp-cardiology-2026',
    chapterReference: 'Ch. 1 (§1.3)',
    pageRange: 'BCCP pp. 1-1 to 1-74',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s3',
    targetTopicUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s3'
  },
  {
    id: 'rel-hf-loop-diuretics',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-loop-diuretics',
    targetTopicCanonicalName: 'Diuretics (Loop Diuretics & Sequential Nephron Blockade)',
    targetTopicTitleEn: 'Loop Diuretics (Furosemide, Torsemide, Bumetanide) & Sequential Nephron Blockade',
    targetTopicTitleAr: 'مدرات العروة (Furosemide, Torsemide, Bumetanide) والحصار الكلوي المتسلسل',
    targetTopicType: 'drug_class',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Cornerstone of acute and chronic decongestion (Furosemide 40 mg PO = 20 mg IV = Torsemide 20 mg PO/IV = Bumetanide 1 mg PO/IV; DOSE & ADVOR protocols).',
    relationshipDescriptionAr:
      'حجر الزاوية لإزالة الاحتقان الرئوي والمحيطي (40 ملغ فوروسيميد فموي = 20 ملغ وريدي = 20 ملغ تورسيميد = 1 ملغ بوميتانيد).',
    primarySourceId: 'accp-cardiology-2026',
    chapterReference: 'Ch. 1 (§1.2) & DiPiro Ch. 15 (§8.0)',
    pageRange: 'BCCP pp. 1-1 to 1-74',
    sourceLocationUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s2',
    targetTopicUri: 'local://ref/verbatim/accp-cardiology-2026/accp-cardio-2026-ch1-adhf-shock/bccp-c1-s2'
  },
  {
    id: 'rel-hf-ace-inhibitors',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-ace-inhibitors',
    targetTopicCanonicalName: 'ACE Inhibitors (Lisinopril, Enalapril, Ramipril)',
    targetTopicTitleEn: 'ACE Inhibitors (Lisinopril, Enalapril, Ramipril)',
    targetTopicTitleAr: 'مثبطات الإنزيم المحول للأنجيوتنسين (ACE Inhibitors)',
    targetTopicType: 'drug_class',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Indicated in HFrEF when ARNI is unavailable or not tolerated; requires a strict 36-hour washout before switching to Sacubitril/Valsartan.',
    relationshipDescriptionAr:
      'تُستخدم في HFrEF عند عدم توفر أو تحمل ARNI، مع إلزامية فترة غسيل 36 ساعة قبل التحويل إلى Entresto.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§3.0–4.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4'
  },
  {
    id: 'rel-hf-arbs',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-arbs',
    targetTopicCanonicalName: 'ARBs (Valsartan, Candesartan, Losartan)',
    targetTopicTitleEn: 'Angiotensin Receptor Blockers (ARBs: Valsartan, Candesartan, Losartan)',
    targetTopicTitleAr: 'حاصرات مستقبلات الأنجيوتنسين (ARBs)',
    targetTopicType: 'drug_class',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Alternative RAAS blocker in ACEi-intolerant (cough/angioedema) patients when ARNI is not feasible; requires NO washout period when transitioning to Sacubitril/Valsartan.',
    relationshipDescriptionAr:
      'بديل لمثبطات ACE عند عدم تحملها، ولا تتطلب فترة توقف (0 ساعة) عند الانتقال منها إلى Sacubitril/Valsartan.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§4.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4'
  },
  {
    id: 'rel-hf-arnis',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-arni',
    targetTopicCanonicalName: 'ARNIs (Sacubitril/Valsartan — Entresto)',
    targetTopicTitleEn: 'ARNI (Sacubitril/Valsartan — Entresto)',
    targetTopicTitleAr: 'مثبطات مستقبل الأنجيوتنسين والنيبريليسين (ARNI — Entresto)',
    targetTopicType: 'drug_monograph',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Preferred first-line Pillar #1 in HFrEF (PARADIGM-HF: 20% CV death/HF hospitalization reduction over Enalapril); target 97/103 mg PO BID.',
    relationshipDescriptionAr:
      'الركيزة الأولى المفضلة في HFrEF (دراسة PARADIGM-HF: خفض 20% في الوفيات القلبية والتنويم مقارنة بـ Enalapril).',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§3.0–4.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec4'
  },
  {
    id: 'rel-hf-beta-blockers',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-beta-blockers-hf',
    targetTopicCanonicalName: 'Beta Blockers (Carvedilol, Metoprolol Succinate, Bisoprolol)',
    targetTopicTitleEn: 'Evidence-Based HFrEF Beta-Blockers (Carvedilol, Metoprolol Succinate XL, Bisoprolol)',
    targetTopicTitleAr: 'حاصرات بيتا المثبتة في قصور القلب (Carvedilol, Metoprolol Succinate, Bisoprolol)',
    targetTopicType: 'drug_class',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Pillar #2 in HFrEF conferring 34–35% all-cause mortality reduction (COPERNICUS, MERIT-HF, CIBIS-II). Only these 3 agents are proven; never substitute Metoprolol Tartrate.',
    relationshipDescriptionAr:
      'الركيزة الثانية في HFrEF وتخفض الوفيات بنسبة 34–35%؛ وتقتصر حصرياً على هذه الأدوية الثلاثة.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§5.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec5',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec5'
  },
  {
    id: 'rel-hf-sglt2-inhibitors',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-sglt2-inhibitors',
    targetTopicCanonicalName: 'SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)',
    targetTopicTitleEn: 'SGLT2 Inhibitors (Dapagliflozin 10 mg, Empagliflozin 10 mg)',
    targetTopicTitleAr: 'مثبطات SGLT2 (داباغليفلوزين 10 ملغ، إمباغليفلوزين 10 ملغ)',
    targetTopicType: 'drug_class',
    relationshipType: 'treated_by',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Pillar #4 reducing CV death and HF hospitalization across HFrEF (DAPA-HF, EMPEROR-Reduced) and HFpEF (DELIVER, EMPEROR-Preserved) down to eGFR >= 20 mL/min regardless of diabetes.',
    relationshipDescriptionAr:
      'الركيزة الرابعة وتخفض الوفيات والتنويم في HFrEF وHFpEF حتى eGFR >= 20 مل/دقيقة بغض النظر عن وجود السكري.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§6.0) & ACCP Cardiology Ch. 2 (§2.3)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec6'
  },
  {
    id: 'rel-hf-hyperkalemia',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-hyperkalemia',
    targetTopicCanonicalName: 'Hyperkalemia (RAASi/MRA & Trimethoprim DDI)',
    targetTopicTitleEn: 'Hyperkalemia in RAASi / MRA Therapy & Stockley Trimethoprim Interaction',
    targetTopicTitleAr: 'فرط البوتاسيوم مع أدوية RAASi/MRA وتداخل Trimethoprim',
    targetTopicType: 'laboratory_abnormality',
    relationshipType: 'complication_of',
    directionality: 'directed',
    relationshipDescriptionEn:
      'Spironolactone/Eplerenone + ARNI/ACEi/ARB (especially if combined with ENaC-blocking Trimethoprim or KCl) can precipitate severe hyperkalemia; hold MRA if K+ >= 5.5 mEq/L.',
    relationshipDescriptionAr:
      'الجمع بين Spironolactone ومثبطات RAAS (خاصة مع Trimethoprim) قد يسبب فرط بوتاسيوم قاتل؛ يُوقف MRA عند K+ >= 5.5 mEq/L.',
    primarySourceId: 'stockleys-drug-interactions',
    chapterReference: 'Sec. 2 (§2.1) & DiPiro Ch. 15 (§6.0)',
    pageRange: 'pp. 412–640',
    sourceLocationUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-1',
    targetTopicUri: 'local://ref/verbatim/stockleys-drug-interactions/stockleys-sec2-cardiovascular-qtc-raas/stk-2-1'
  },
  {
    id: 'rel-hf-ckd',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-aki-ckd',
    targetTopicCanonicalName: 'Chronic Kidney Disease (Cardiorenal Syndrome & Renal Dosing)',
    targetTopicTitleEn: 'Chronic Kidney Disease & Cardiorenal Syndrome',
    targetTopicTitleAr: 'مرض الكلى المزمن والمتلازمة القلبية الكلوية (Cardiorenal Syndrome)',
    targetTopicType: 'disease',
    relationshipType: 'requires_adjustment_in',
    directionality: 'bidirectional',
    relationshipDescriptionEn:
      'Bidirectional cardiorenal interplay: eGFR < 30 mL/min requires starting Sacubitril/Valsartan at 24/26 mg BID, contraindicates Spironolactone/Eplerenone, and requires 50% Milrinone dose reduction, while SGLT2i remains protective down to eGFR >= 20 mL/min.',
    relationshipDescriptionAr:
      'ترابط قلبي كلوي ثنائي الاتجاه: عند eGFR < 30 يبدأ Entresto بجرعة 24/26 ملغ، ويُمنع Spironolactone، وتُخفض جرعة Milrinone للنصف.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 15 (§4.0, §6.0, §8.0)',
    pageRange: 'pp. 185–248',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec8',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch15-hf/dipiro-hf-sec8'
  },
  {
    id: 'rel-hf-hypertension',
    sourceTopicId: 'topic-heart-failure',
    targetTopicId: 'topic-hypertension',
    targetTopicCanonicalName: 'Hypertension & Acute Cardiogenic Pulmonary Edema',
    targetTopicTitleEn: 'Systemic Hypertension & Acute Hypertensive Pulmonary Edema',
    targetTopicTitleAr: 'ارتفاع ضغط الدم الشرياني ووذمة الرئة القلبية الحادة',
    targetTopicType: 'disease',
    relationshipType: 'associated_with',
    directionality: 'bidirectional',
    relationshipDescriptionEn:
      'Longstanding hypertension induces concentric LVH, diastolic dysfunction (HFpEF), and HFrEF; in acute hypertensive cardiogenic pulmonary edema, reduce MAP 20–25% immediately using IV Nitroglycerin/Nitroprusside + IV Loop Diuretic while avoiding acute IV Labetalol/Esmolol.',
    relationshipDescriptionAr:
      'يؤدي ارتفاع الضغط المزمن إلى تضخم البطين الأيسر وقصور القلب؛ وفي وذمة الرئة الحادة يُستخدم Nitroglycerin وريدي مع مدر عروة ويُتجنب Labetalol/Esmolol.',
    primarySourceId: 'dipiro-13th-ed',
    chapterReference: 'Ch. 30 (§1.1–1.3)',
    pageRange: 'pp. 375–411',
    sourceLocationUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch30-htn/dipiro-htn-sec3',
    targetTopicUri: 'local://ref/verbatim/dipiro-13th-ed/dipiro-ch30-htn/dipiro-htn-sec3'
  }
];

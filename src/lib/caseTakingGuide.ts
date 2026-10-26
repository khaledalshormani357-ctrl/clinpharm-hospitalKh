import { Patient, ClinicalIntervention, ReconciliationDiscrepancy } from '../types/clinical';
import { CaseSimulatorParams } from './clinicalReferences';

export const CASEBOOK_DRIVE_URL = 'local://ref/chapter/casebook-ppcp-workup';
export const CASEBOOK_DOWNLOAD_URL = 'local://ref/export/clinical-casebook-guide';

export interface WorkupStep {
  stepNumber: number;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  coreQuestionsAr: string[];
  coreQuestionsEn: string[];
  whatToExtractAr: string[];
  whatToExtractEn: string[];
  clinicalPitfallAr: string;
  clinicalPitfallEn: string;
}

export interface ChecklistItem {
  id: string;
  category: 'history' | 'labs_vitals' | 'med_history' | 'red_flag';
  categoryLabelAr: string;
  categoryLabelEn: string;
  itemAr: string;
  itemEn: string;
  whyItMattersAr: string;
  whyItMattersEn: string;
  isCritical?: boolean;
}

export interface DiseaseCaseTakingGuide {
  id: string;
  badge: string;
  titleAr: string;
  titleEn: string;
  ward: string;
  chiefComplaintExamplesAr: string;
  chiefComplaintExamplesEn: string;
  goldenRuleAr: string;
  goldenRuleEn: string;
  checklist: ChecklistItem[];
  workupAlgorithmAr: string[];
  workupAlgorithmEn: string[];
  soapTemplateAr: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

export interface AppBenchmarkTestCase {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  categoryBadge: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  clinicalSummaryAr: string;
  clinicalSummaryEn: string;
  mustGatherHighlightsAr: string[];
  mustGatherHighlightsEn: string[];
  whatAppModulesItTestsAr: string[];
  whatAppModulesItTestsEn: string[];
  expectedAppFindingsAr: string[];
  expectedAppFindingsEn: string[];
  patientData: Patient;
  discrepancies: ReconciliationDiscrepancy[];
  sampleIntervention: ClinicalIntervention;
  simulatorPreset: CaseSimulatorParams;
}

/**
 * 1. المنهجية القياسية لأخذ الحالة السريرية والتعامل معها (6-Step Clinical Pharmacist Case-Taking & PPCP Protocol)
 * المستخرجة من الدليل المرجعي للصيدلي السريري والطالب (Drive ID: 1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP)
 */
export const PPCP_WORKUP_STEPS: WorkupStep[] = [
  {
    stepNumber: 1,
    code: 'COLLECT-1: CC & HPI',
    titleAr: 'الخطوة 1: أخذ الشكوى الرئيسية وتفصيل القصة المرضية (CC & HPI via OPQRST)',
    titleEn: 'Step 1: Chief Complaint (CC) & History of Present Illness (HPI via OPQRST)',
    subtitleAr: 'كيف تبدأ مقابلة المريض أو قراءة تذكرة الدخول في العنبر؟',
    subtitleEn: 'How to start the bedside encounter or admission chart review',
    coreQuestionsAr: [
      'ما هو السبب المباشر الذي أحضر المريض إلى المستشفى اليوم (Chief Complaint)؟ وبكلمات المريض نفسه؟',
      'متى بدأ العرض (Onset)؟ وهل بدأ فجأة (Acute: مثل PE أو STEMI أو Anaphylaxis) أم تدريجياً (Subacute/Chronic: مثل ADHF)؟',
      'هل تزامن ظهور الأعراض مع بدء دواء جديد، زيادة جرعة، أو التوقف المفاجئ عن دواء منزلي (Drug-Induced Presentation)؟',
      'ما هي الأعراض المرافقة الإيجابية والسلبية الهامة (Pertinent Positives & Negatives: مثل الحمى، القشعريرة، Orthopnea، القطران في البراز Melena)؟'
    ],
    coreQuestionsEn: [
      'What brought the patient to the hospital today (Chief Complaint in the patient’s own words)?',
      'What was the exact Onset (sudden like PE/STEMI vs gradual like ADHF decompensation)?',
      'Did symptoms coincide with starting a new medication, dose escalation, or abrupt discontinuation?',
      'What are the key pertinent positives and negatives (e.g., fever, orthopnea, melena, oliguria)?'
    ],
    whatToExtractAr: [
      'Demographics: العمر، الجنس، الوزن الفعلي (Actual BW)، الطول، وحساب الوزن المثالي (IBW) والوزن المعدل (AdjBW).',
      'Timeline: ربط الخط الزمني للأعراض مع خط الأدوية والتحاليل منذ لحظة دخول الـ ER حتى الجناح.',
      'Past Medical History (PMH): تحديد الأمراض المزمنة المؤثرة على اختيار الدواء (CKD, Cirrhosis, HFrEF, Asthma, Prior Stroke/TIA).'
    ],
    whatToExtractEn: [
      'Demographics: Age, Sex, Actual Body Weight (ABW), Height, Ideal Body Weight (IBW), and Adjusted Body Weight (AdjBW).',
      'Timeline: Correlate symptom onset with ED interventions and medication administration times.',
      'PMH: Identify comorbidities that dictate drug selection or contraindications (CKD, Cirrhosis, HFrEF, Asthma, Prior Stroke/TIA).'
    ],
    clinicalPitfallAr: 'خطأ شائع للطلاب: التعامل مع العرض الجديد كمرض مستقل وإضافة دواء جديد له (Prescribing Cascade) دون الانتباه إلى أنه عرض جانبي لدواء حالي (مثل الكحة من ACEi، أو الوذمة من Amlodipine، أو الهذيان من Anticholinergics).',
    clinicalPitfallEn: 'Common student pitfall: Initiating a Prescribing Cascade for a new symptom without recognizing it as an Adverse Drug Reaction (ADR) of an existing medication.'
  },
  {
    stepNumber: 2,
    code: 'COLLECT-2: BPMH & MedRec',
    titleAr: 'الخطوة 2: أخذ التاريخ الدوائي الشامل والمطابقة الدوائية (BPMH & Allergy Verification)',
    titleEn: 'Step 2: Best Possible Medication History (BPMH), Adherence & Allergy Verification',
    subtitleAr: 'التحقق من كل دواء منزلي، الحساسية الحقيقية، والالتزام العلاجي',
    subtitleEn: 'Verifying home regimen, true allergy phenotype, OTC/herbals, and adherence',
    coreQuestionsAr: [
      'ما هي طبيعة الحساسية الدوائية المسجلة؟ هل هي IgE-Mediated Anaphylaxis / Angioedema / Bronchospasm أم مجرد عرض هضمي (GI Intolerance)؟',
      'ما هي الأدوية الفعلية التي يتناولها المريض في المنزل (الاسم، الجرعة، التكرار، وآخر جرعة أخذها قبل الدخول)؟',
      'هل يتناول المريض أدوية بدون وصفة (OTC مثل NSAIDs / Ibuprofen أو PPIs) أو خلطات عشبية تتداخل مع المميعات والكلى؟',
      'هل المريض ملتزم بأدويته (Adherence)؟ وإن لم يكن ملتزماً، هل السبب تكلفة الدواء، نسيان الجرعات، أم عرض جانبي؟'
    ],
    coreQuestionsEn: [
      'What is the exact reaction phenotype of listed allergies (True IgE Anaphylaxis/Bronchospasm vs mild GI intolerance)?',
      'What is the verified home regimen (Drug, Dose, Route, Frequency, and timing of last dose taken)?',
      'Does the patient use OTC analgesics (NSAIDs), antacids, supplements, or herbal products?',
      'What is the patient’s real-world adherence and barrier to taking medications?'
    ],
    whatToExtractAr: [
      'True Allergy Phenotype: التمييز بين الحساسية الحقيقية للبنسلين (Anaphylaxis) التي تمنع الـ Beta-Lactams المتصالبة، وبين الطفح البسيط أو الغثيان.',
      'Unintentional Omissions: الأدوية المنزلية الضرورية التي سقطت سهواً عند التنويم (مثل Statins، Beta-Blockers، Levothyroxine).',
      'Mandatory Holds on Admission: الأدوية المنزلية التي يجب إيقافها مؤقتاً في المرض الحاد (مثل Metformin و SGLT2i و NSAIDs في Sepsis/AKI).'
    ],
    whatToExtractEn: [
      'True Allergy Phenotype: Distinguish true IgE anaphylaxis/severe cutaneous reactions from mild intolerance.',
      'Unintentional Omissions: Essential chronic medications accidentally omitted on admission.',
      'Mandatory Acute Holds: Home medications that must be held during acute illness (Metformin, SGLT2i, NSAIDs in AKI/Sepsis).'
    ],
    clinicalPitfallAr: 'خطأ شائع: الاعتماد على قائمة الأدوية القديمة في النظام الإلكتروني دون سؤال المريض أو أهله، أو قبول كلمة "حساسية بنسلين" دون الاستفسار عن نوع التفاعل مما يحرم المريض من أفضل مضاد حيوي.',
    clinicalPitfallEn: 'Common pitfall: Relying solely on outdated EHR medication lists without patient/caregiver verification, or accepting unverified "Penicillin Allergy" labels.'
  },
  {
    stepNumber: 3,
    code: 'ASSESS-1: Vitals, Labs & PK',
    titleAr: 'الخطوة 3: التقييم السريري للعلامات الحيوية، الأعضاء، والحركية الدوائية (Vitals, Organ Function & PK)',
    titleEn: 'Step 3: Focused Physical Exam, Hemodynamics, Organ Function & PK Assessment',
    subtitleAr: 'قراءة التحاليل والمؤشرات الحيوية لربطها بـ PK/PD وتعديل الجرعات',
    subtitleEn: 'Translating hemodynamics, renal/hepatic labs, and electrolytes into PK/PD decisions',
    coreQuestionsAr: [
      'هل المريض مستقر هيموديناميكياً (BP, MAP >= 65 mmHg, HR, Perfusion)؟ وهل القناة الهضمية فعالة للتحويل من IV إلى PO؟',
      'ما هي وظيفة الكلى الفعلية (CrCl via Cockcroft-Gault) مقارنة بـ Baseline SCr؟ وهل الكرياتينين في حالة استقرار أم ارتفاع حاد (Unsteady SCr in AKI)؟',
      'ما هي حالة السوائل والكهارل (Fluid Balance I/O, Na+, K+, Mg2+, Ca2+, Acid-Base pH/HCO3-/Anion Gap)؟',
      'ما هي وظيفة الكبد (AST/ALT, Bilirubin, Albumin, INR, Child-Pugh Class A/B/C)؟'
    ],
    coreQuestionsEn: [
      'Is the patient hemodynamically stable (BP, MAP >= 65 mmHg, HR) and able to absorb oral medications (IV-to-PO switch)?',
      'What is the calculated Cockcroft-Gault CrCl vs baseline SCr, and is SCr rising acutely?',
      'What are the critical electrolyte and acid-base abnormalities (K+, Mg2+, Na+, pH, HCO3-, Anion Gap)?',
      'What is the hepatic synthetic/metabolic status (Albumin, INR, Bilirubin, Child-Pugh score)?'
    ],
    whatToExtractAr: [
      'Renal Clearance (CrCl): حساب تصفية الكرياتينين ومطابقتها مع كل دواء يطرح كلوياً (Vancomycin, Meropenem, Enoxaparin, DOACs, Gabapentin).',
      'Electrolyte-Drug Coupling: ربط K+ مع (ACEi/ARB/ARNI/MRA/Insulin)، وربط K+/Mg2+ مع الأدوية المسببة لتطاول QTc (Amiodarone, Fluoroquinolones, Macrolides).',
      'Infection & Biomarkers: اتجاه WBC، الحرارة، Procalcitonin، Lactate، ونتائج المزارع والحساسية (Cultures & C&S).'
    ],
    whatToExtractEn: [
      'Renal Clearance (CrCl): Match CrCl against every renally cleared drug on the MAR.',
      'Electrolyte-Drug Coupling: Link K+ with RAASi/MRA/Insulin, and K+/Mg2+ with QTc-prolonging agents.',
      'Infection & Biomarkers: Track WBC trend, fever curve, Procalcitonin, Lactate, and Culture/Susceptibility results.'
    ],
    clinicalPitfallAr: 'خطأ شائع: الاعتماد على رقم SCr الظاهري (مثل 1.1 mg/dL) لدى مسن نحيل واعتبار الكلى طبيعية، بينما حساب CrCl الفعلي يظهر قصوراً كلوياً (< 35 mL/min) يستوجب خفض الجرعة!',
    clinicalPitfallEn: 'Common pitfall: Assuming a "normal-looking" SCr (e.g., 1.1 mg/dL) in a frail elderly patient reflects normal renal function when actual CrCl is < 35 mL/min.'
  },
  {
    stepNumber: 4,
    code: 'ASSESS-2: DRP Scan (IESC)',
    titleAr: 'الخطوة 4: المسح المنهجي للمشاكل المتعلقة بالأدوية (Systematic DRP Identification — IESC)',
    titleEn: 'Step 4: Systematic Identification of Drug-Related Problems (IESC Framework)',
    subtitleAr: 'فحص كل دواء وكل مرض وفق معايير: الاستطباب، الفعالية، الأمان، والالتزام',
    subtitleEn: 'Evaluating every condition and medication for Indication, Effectiveness, Safety, and Compliance',
    coreQuestionsAr: [
      'Indication (الاستطباب): هل هناك دواء بلا استطباب واضح (مثل PPI دون مبرر)؟ وهل هناك حالة مرضية تفتقر لدواء إرشادي (مثل غياب VTE Prophylaxis أو غياب SGLT2i في HFrEF)؟',
      'Effectiveness (الفعالية): هل الدواء المختار هو الخط الأول وفق Guidelines؟ وهل الجرعة وطريقة الإعطاء (مثل Extended Infusion) تحقق الهدف العلاجي؟',
      'Safety (الأمان): هل الجرعة مرتفعة بالنسبة لوظيفة الكلى/الكبد؟ هل يوجد تداخل دوائي خطر (Major DDI) أو تضاد مع مرض آخر؟',
      'Compliance & Convenience (الالتزام والملاءمة): هل يمكن تبسيط النظام الدوائي أو التحويل من IV إلى PO؟'
    ],
    coreQuestionsEn: [
      'Indication: Is any drug unnecessary, or is any active condition missing guideline-directed therapy or prophylaxis?',
      'Effectiveness: Is the selected agent first-line, and is the dose/route/infusion optimized for target PK/PD?',
      'Safety: Is the dose supratherapeutic for renal/hepatic function, or is there a major DDI/ADR risk?',
      'Compliance: Can the regimen be simplified or transitioned from IV to PO?'
    ],
    whatToExtractAr: [
      'قائمة DRPs مرتبة حسب الخطورة (High / Medium / Low Severity).',
      'تحديد الآلية الفيزيولوجية والدوائية لكل مشكلة (مثلاً: CYP2C9 inhibition أو Accumulation due to prolonged t½).',
      'التحقق من باقة العناية المركزة (FAST HUG BID): التغذية، التسكين، الوقاية من الخثار (VTE)، رفع الرأس، الوقاية من القرحة (SUP)، ضبط السكر، وسحب القساطر/تخفيض المضادات.'
    ],
    whatToExtractEn: [
      'Prioritized list of DRPs ranked by clinical severity.',
      'Mechanistic rationale for each identified DRP (PK/PD or pathophysiologic mechanism).',
      'ICU Bundle verification (FAST HUG BID: Feeding, Analgesia, Sedation, Thromboembolism, Head-of-bed, Ulcer prophylaxis, Glycemic control, Indwelling lines, De-escalation).'
    ],
    clinicalPitfallAr: 'خطأ شائع: اقتراح إيقاف دواء يسبب مشكلة أو تداخلاً دون تقديم البديل الآمن بجرعته الدقيقة للطبيب المعالج.',
    clinicalPitfallEn: 'Common pitfall: Recommending discontinuation of a problematic drug without proposing a concrete, dose-specific safe alternative.'
  },
  {
    stepNumber: 5,
    code: 'PLAN & SOAP',
    titleAr: 'الخطوة 5: بناء الخطة العلاجية وتوثيق ملاحظة SOAP (Evidence-Based Plan & SOAP Note)',
    titleEn: 'Step 5: Care Plan Formulation, Monitoring Parameters & SOAP Documentation',
    subtitleAr: 'صياغة توصية صيدلانية محددة (الدواء، الجرعة، الطريق، التكرار، المدة، والمراقبة)',
    subtitleEn: 'Formulating actionable recommendations (Drug, Dose, Route, Frequency, Duration) and monitoring plans',
    coreQuestionsAr: [
      'ما هو الهدف العلاجي القابل للقياس (Goal of Therapy: مثل AUC24/MIC 400–600، أو INR 2.0–3.0، أو BG 140–180 mg/dL)؟',
      'ما هي التوصية الدوائية الكاملة (اسم الدواء + الجرعة بالمليغرام + طريق الإعطاء + التكرار + مدة العلاج)؟',
      'ما هي خطة مراقبة الفعالية (Efficacy Monitoring) وما هي خطة مراقبة السمية (Toxicity Monitoring) وبتوقيت زمني محدد؟',
      'ما هي نقاط تثقيف المريض عند الخروج (Patient Counseling & Red Flags on Discharge)؟'
    ],
    coreQuestionsEn: [
      'What is the measurable therapeutic target (e.g., AUC24/MIC 400–600, INR 2.0–3.0, BG 140–180 mg/dL)?',
      'What is the complete drug order recommendation (Drug + Dose + Route + Frequency + Duration)?',
      'What specific parameters and timelines will monitor Efficacy vs Toxicity?',
      'What essential discharge counseling and warning signs must the patient know?'
    ],
    whatToExtractAr: [
      'S (Subjective): الشكوى والأعراض الحالية والتاريخ الدوائي/الحساسية ذات الصلة بالمشكلة فقط.',
      'O (Objective): العلامات الحيوية، التحاليل المخبرية، CrCl، والأدوية الحالية المسببة للمشكلة.',
      'A (Assessment): تشخيص المشكلة الدوائية (DRP) + سببها العلمي + مدى السيطرة على المرض.',
      'P (Plan): التوصية المحددة (Stop / Start / Adjust) + المرجع العلمي + جدول مراقبة الفعالية والأمان.'
    ],
    whatToExtractEn: [
      'S (Subjective): Problem-focused symptoms, relevant HPI, adherence, and allergy history.',
      'O (Objective): Pertinent vitals, labs, calculated CrCl, microbiology, and current active MAR.',
      'A (Assessment): Disease state status + etiology of DRP + rationale for therapy change.',
      'P (Plan): Actionable drug regimen + guideline citation + Efficacy/Toxicity monitoring schedule.'
    ],
    clinicalPitfallAr: 'خطأ شائع: كتابة خطة عامة مثل "عدّل جرعة الفانكومايسين وراقب الكلى" بدلاً من خطة محددة: "عدّل الفانكومايسين إلى 1000 mg IV q24h، اسحب Peak & Trough حول الجرعة الثالثة، وراقب SCr يومياً".',
    clinicalPitfallEn: 'Common pitfall: Writing vague plans like "adjust dose and monitor renal function" instead of specific orders with exact doses, intervals, and lab timing.'
  }
];

/**
 * 2. أهم المعلومات التي يجب أن يأخذها الصيدلي السريري أو الطالب في كل حالة سريرية
 * (Condition-Specific Bedside Case-Taking Checklists)
 */
export const DISEASE_CASE_CHECKLISTS: DiseaseCaseTakingGuide[] = [
  {
    id: 'hf_cardiorenal',
    badge: 'Cardiology • ADHF / HFrEF',
    titleAr: 'قصور القلب الحاد والمزمن والمتلازمة القلبية الكلوية (ADHF / HFrEF & Cardiorenal)',
    titleEn: 'Heart Failure (ADHF / HFrEF) & Cardiorenal Syndrome Case Workup',
    ward: 'CCU',
    chiefComplaintExamplesAr: 'ضيق نفس عند الاستلقاء (Orthopnea)، ضيق نفس ليلي انتيابي (PND)، تورم الساقين (Bilateral Pitting Edema)، زيادة سريعة في الوزن.',
    chiefComplaintExamplesEn: 'Orthopnea (3-pillow), Paroxysmal Nocturnal Dyspnea (PND), bilateral lower extremity edema, rapid weight gain.',
    goldenRuleAr: 'القاعدة الذهبية: حدد أولاً التصنيف الهيموديناميكي (Nohria-Stevenson: Warm/Cold & Wet/Dry)، واحسب جرعة Furosemide الوريدية بـ 2.5 ضعف الجرعة المنزلية الفموية، ولا تجمع أبداً ACEi مع ARNI دون فترة غسيل 36 ساعة!',
    goldenRuleEn: 'Golden Rule: Classify Nohria-Stevenson profile (Warm/Cold & Wet/Dry), dose IV loop diuretic at 2.5x home oral dose, and strictly enforce a 36-hour washout when switching ACEi to ARNI.',
    checklist: [
      {
        id: 'hf-1',
        category: 'history',
        categoryLabelAr: 'القصة السريرية والأعراض (History)',
        categoryLabelEn: 'Clinical History & Symptoms',
        itemAr: 'تقييم أعراض الاحتقان الرئوي والمحيطي (Orthopnea, PND, JVD, Crackles, Edema) وتقييم التروية (برودة الأطراف، الدوخة، قلة البول).',
        itemEn: 'Assess congestion (Orthopnea, PND, JVD, edema) and perfusion (cool extremities, mentation, oliguria) for Nohria-Stevenson profile.',
        whyItMattersAr: 'يحدد ما إذا كان المريض يحتاج مدرات فقط (Warm & Wet) أم مقويات التقلص العضلي Inotropes/Vasodilators (Cold & Wet).',
        whyItMattersEn: 'Dictates whether the patient needs diuresis alone (Warm/Wet) vs inotropes/vasodilators (Cold/Wet).',
        isCritical: true
      },
      {
        id: 'hf-2',
        category: 'med_history',
        categoryLabelAr: 'التاريخ الدوائي المنزلي (Home Meds)',
        categoryLabelEn: 'Home Medication History',
        itemAr: 'معرفة الجرعة المنزلية الدقيقة من Furosemide أو Torsemide، وتاريخ آخر جرعة أُخذت من أي ACE-Inhibitor (مثل Ramipril/Lisinopril).',
        itemEn: 'Exact home Loop Diuretic daily dose and exact timestamp of last ACE-Inhibitor dose.',
        whyItMattersAr: 'الجرعة الوريدية الأولية في ADHF تساوي 2–2.5 ضعف الجرعة المنزلية؛ ومعرفة توقيت آخر جرعة ACEi إلزامي لحساب الـ 36-hour Washout قبل بدء Entresto لمنع Angioedema.',
        whyItMattersEn: 'IV loop diuretic starting dose is 2–2.5x home oral dose; last ACEi timestamp is required for the mandatory 36h washout before starting Sacubitril/Valsartan.',
        isCritical: true
      },
      {
        id: 'hf-3',
        category: 'labs_vitals',
        categoryLabelAr: 'الفحوصات والتحاليل الإلزامية (Labs & Echo)',
        categoryLabelEn: 'Mandatory Labs, Vitals & Echo',
        itemAr: 'قيمة الكسر القذفي (LVEF %)، ضغط الدم (SBP)، النبض (HR)، الوزن الجاف مقارنة بالوزن الحالي، البوتاسيوم (K+)، الكرياتينين (SCr/eGFR)، و NT-proBNP.',
        itemEn: 'LVEF %, SBP, HR, Dry Weight vs Admission Weight, Serum K+, SCr/eGFR, and BNP/NT-proBNP.',
        whyItMattersAr: 'يُمنع بدء MRA (Spironolactone) إذا كان K+ > 5.0 mEq/L أو eGFR < 30، ويُحذر من بدء ARNI إذا كان SBP < 100 mmHg.',
        whyItMattersEn: 'Spironolactone is contraindicated if K+ > 5.0 mEq/L or eGFR < 30; ARNI requires SBP >= 100 mmHg.',
        isCritical: true
      },
      {
        id: 'hf-4',
        category: 'red_flag',
        categoryLabelAr: 'فخاخ الأدوية المحظورة (Contraindicated Traps)',
        categoryLabelEn: 'Medication Traps & Red Flags',
        itemAr: 'فحص وجود أي دواء يفاقم قصور القلب: NSAIDs، Non-DHP CCBs (Verapamil / Diltiazem)، أو Thiazolidinediones (Pioglitazone).',
        itemEn: 'Screen for HF-exacerbating drugs: NSAIDs, Non-DHP CCBs (Verapamil/Diltiazem), or Pioglitazone.',
        whyItMattersAr: 'Verapamil و Diltiazem يثبطان قلوصية عضلة القلب (Negative Inotropes) ويسببان Cardiogenic Shock في مرضى HFrEF.',
        whyItMattersEn: 'Non-DHP CCBs exert negative inotropic effects and precipitate acute decompensation in HFrEF.'
      }
    ],
    workupAlgorithmAr: [
      '1. صنّف المريض هيموديناميكياً (Warm/Wet vs Cold/Wet) وابدأ Furosemide IV بجرعة 2.5× الجرعة المنزلية مع مراقبة Urine Output و Na البولي.',
      '2. لا توقف Beta-Blocker المنزلي أثناء التفجر الحاد إلا إذا كان المريض في Cardiogenic Shock أو يحتاج Inotropes.',
      '3. راجع الركائز الأربع لـ HFrEF (ARNI + Beta-Blocker + MRA + SGLT2i) خطوة بخطوة قبل الخروج مع الالتزام بـ 36h Washout بعد ACEi.'
    ],
    workupAlgorithmEn: [
      '1. Classify Nohria-Stevenson profile and initiate IV Furosemide at 2.5x home oral dose; monitor urine output.',
      '2. Continue home Beta-Blocker during ADHF unless patient is in cardiogenic shock or requires inotropes.',
      '3. Optimize all 4 GDMT pillars (ARNI, Beta-Blocker, MRA, SGLT2i) prior to discharge with 36h ACEi washout.'
    ],
    soapTemplateAr: {
      subjective: 'يعاني المريض من تفاقم Dyspnea و Orthopnea و Pitting Edema مع زيادة وزن +4 kg خلال أسبوع.',
      objective: 'LVEF 32% | BP 108/68 mmHg | HR 88 bpm | SCr 1.3 mg/dL (CrCl 52 mL/min) | K+ 4.7 mEq/L | NT-proBNP 4,200 pg/mL.',
      assessment: 'Acute Decompensated HFrEF (Warm & Wet profile) مع حاجة لتحسين Diuresis واستكمال 4 Pillars of GDMT.',
      plan: '1. Furosemide 80 mg IV BID (مع مراقبة I/O ووزن المريض يومياً + K+/Mg2+).\n2. إيقاف Ramipril والانتظار 36-hour Washout ثم بدء Sacubitril/Valsartan 24/26 mg PO BID.\n3. الاستمرار على Bisoprolol و Spironolactone وإضافة Dapagliflozin 10 mg PO OD.'
    }
  },
  {
    id: 'sepsis_hap_aki',
    badge: 'ICU • Sepsis / HAP & AKI TDM',
    titleAr: 'الإنتان، ذات الرئة المستشفوية، والقصور الكلوي الحاد (Sepsis / HAP / AKI & PK/TDM)',
    titleEn: 'Sepsis, Hospital-Acquired Pneumonia (HAP/VAP) & AKI Antimicrobial Dosing',
    ward: 'ICU',
    chiefComplaintExamplesAr: 'حمى، هذيان حاد، انخفاض ضغط الدم، نقص أكسجة، إفرازات تنفسية قيحية بعد أكثر من 48 ساعة من التنويم.',
    chiefComplaintExamplesEn: 'Fever, acute altered mental status, hypotension, hypoxia, purulent sputum >48h after admission.',
    goldenRuleAr: 'القاعدة الذهبية: في الإنتان مع AKI، أعطِ دائماً Loading Dose كاملة حسب الوزن الفعلي لملء حجم التوزع (Vd)، ثم عدّل جرعة الصيانة (Maintenance Dose / Interval) حسب CrCl مع مراقبة AUC24/MIC (400–600).',
    goldenRuleEn: 'Golden Rule: In Sepsis + AKI, always administer a full weight-based Loading Dose to fill expanded Vd, then adjust the Maintenance Dose/Interval based on CrCl and AUC24/MIC (400–600).',
    checklist: [
      {
        id: 'sep-1',
        category: 'history',
        categoryLabelAr: 'عوامل خطورة البكتيريا المقاومة (MDR Risk Factors)',
        categoryLabelEn: 'MDR Pathogen Risk Factors',
        itemAr: 'هل تلقى المريض مضادات حيوية وريدية خلال آخر 90 يوماً؟ وما هي مدة التنويم الحالية (> 5 أيام)؟ وهل يوجد استعمار سابق بـ MRSA أو Pseudomonas؟',
        itemEn: 'IV antibiotic exposure within the past 90 days, length of hospitalization >= 5 days, and prior MRSA/Pseudomonas colonization.',
        whyItMattersAr: 'يحدد الحاجة لتغطية MRSA (Vancomycin/Linezolid) وتغطية مزدوجة أو أحادية لـ Pseudomonas aeruginosa.',
        whyItMattersEn: 'Determines need for empiric MRSA coverage and single vs dual antipseudomonal therapy.',
        isCritical: true
      },
      {
        id: 'sep-2',
        category: 'med_history',
        categoryLabelAr: 'الحساسية والسموم الكلوية المتزامنة (Allergy & Nephrotoxins)',
        categoryLabelEn: 'Beta-Lactam Allergy & Concomitant Nephrotoxins',
        itemAr: 'تحقق من نوع حساسية البنسلين، وراجع قائمة الأدوية الحالية لإيقاف المترافقة السامة للكلى (Piperacillin/Tazobactam مع Vancomycin، NSAIDs، Metformin).',
        itemEn: 'Verify exact Beta-Lactam reaction type and screen MAR for synergistic nephrotoxins (Vancomycin + Zosyn, NSAIDs, Metformin).',
        whyItMattersAr: 'الجمع بين Vancomycin و Zosyn يضاعف خطر AKI مقارنة بـ Vancomycin + Meropenem/Cefepime؛ واستمرار Metformin في الإنتان يسبب Lactic Acidosis.',
        whyItMattersEn: 'Vancomycin + Piperacillin/Tazobactam carries high synergistic AKI risk; Metformin must be held to prevent lactic acidosis.',
        isCritical: true
      },
      {
        id: 'sep-3',
        category: 'labs_vitals',
        categoryLabelAr: 'المؤشرات الحيوية، المزارع، والكلية (Cultures, Lactate & CrCl)',
        categoryLabelEn: 'Cultures, Lactate, MAP & Renal Function',
        itemAr: 'تأكد من سحب Blood & Sputum Cultures قبل أول جرعة مضاد، وسجل MAP، Lactate، WBC، الوزن الفعلي، و CrCl المحسوب.',
        itemEn: 'Verify Blood/Sputum cultures drawn before antibiotics; record MAP, Serum Lactate, WBC, Actual Weight, and CrCl.',
        whyItMattersAr: 'الوزن الفعلي يحدد جرعة التحميل (Loading 20–25 mg/kg)، بينما CrCl يحدد فاصل الصيانة (q24h–q48h) وجرعة Meropenem بالتسريب الممتد.',
        whyItMattersEn: 'Actual weight determines the loading dose (20–25 mg/kg), while CrCl dictates maintenance interval and beta-lactam renal adjustment.',
        isCritical: true
      },
      {
        id: 'sep-4',
        category: 'red_flag',
        categoryLabelAr: 'خطة تخفيض الطيف بعد 48-72 ساعة (48–72h De-escalation)',
        categoryLabelEn: '48–72h Antimicrobial De-escalation Gate',
        itemAr: 'متابعة نتيجة MRSA Nasal PCR ومزرعة البلغم والدم خلال 48–72 ساعة لإيقاف Vancomycin أو تضييق الطيف.',
        itemEn: 'Follow up MRSA nasal swab and 48–72h culture sensitivities to de-escalate broad-spectrum antibiotics.',
        whyItMattersAr: 'سلبية مسحة الأنف لـ MRSA (NPV > 95%) في ذات الرئة تتيح إيقاف الفانكومايسين مبكراً وحماية الكلى.',
        whyItMattersEn: 'Negative MRSA nasal PCR has >95% negative predictive value in pneumonia, enabling early Vancomycin cessation.'
      }
    ],
    workupAlgorithmAr: [
      '1. اسحب المزارع فوراً وابدأ المضادات التجريبية خلال الساعة الأولى (Golden Hour) مع إعطاء Loading Dose كاملة.',
      '2. عدّل فواصل الصيانة حسب CrCl (مثلاً: Vancomycin q24–48h via TDM، و Meropenem 500 mg q12h Extended Infusion عند CrCl < 30).',
      '3. أوقف Metformin وأي دواء سام للكلى، وراجع المزارع عند 48–72 ساعة لتطبيق De-escalation.'
    ],
    workupAlgorithmEn: [
      '1. Draw cultures and administer full weight-based loading doses within the Golden Hour.',
      '2. Adjust maintenance intervals for CrCl and utilize 3h extended infusions for beta-lactams.',
      '3. Hold Metformin/nephrotoxins and perform 48–72h culture-guided de-escalation.'
    ],
    soapTemplateAr: {
      subjective: 'حمى (38.9°C)، زيادة الإفرازات القيحية، وضيق تنفس في اليوم الخامس من التنويم في الـ ICU.',
      objective: 'BP 96/58 mmHg | HR 108 | WBC 16.4 | Lactate 2.8 mmol/L | SCr 2.4 mg/dL (CrCl 28.5 mL/min) | Wt 78 kg.',
      assessment: 'Severe HAP مع Acute Kidney Injury؛ جرعة Vancomycin 1g q12h و Meropenem 1g q8h الحالية غير معدلة كلوياً وتحمل خطر Nephrotoxicity و Neurotoxicity.',
      plan: '1. تعديل Vancomycin إلى 1000 mg IV q24h–q48h مع سحب مستويات TDM لاستهداف AUC24/MIC 400–600.\n2. تعديل Meropenem إلى 500 mg IV q12h (تسريب ممتد 3 ساعات).\n3. إبقاء Metformin موقوفاً ومراجعة المزارع خلال 48–72 ساعة.'
    }
  },
  {
    id: 'acs_afib_anticoag',
    badge: 'CCU • ACS / PCI & AFib',
    titleAr: 'المتلازمة التاجية الحادة والرجفان الأذيني مع القسطرة (ACS / PCI + AFib Anticoagulation)',
    titleEn: 'Acute Coronary Syndrome (ACS / PCI) & Atrial Fibrillation Anticoagulation Workup',
    ward: 'CCU',
    chiefComplaintExamplesAr: 'ألم صدري ضاغط خلف القص يمتد للفك أو الذراع الأيسر، تعرق، خفقان متسارع غير منتظم.',
    chiefComplaintExamplesEn: 'Retrosternal crushing chest pain radiating to left arm/jaw, diaphoresis, irregular palpitations.',
    goldenRuleAr: 'القاعدة الذهبية: عند اجتماع PCI (الدعامة التاجية) مع AFib، تجنب Triple Therapy المطولة! أوقف الأسبرين عند الخروج (أو خلال أسبوع) واستمر بـ Dual Therapy (Apixaban + Clopidogrel) لتقليل النزيف للنصف.',
    goldenRuleEn: 'Golden Rule: In AFib patients undergoing PCI, avoid prolonged Triple Therapy! Discontinue Aspirin at discharge (or <=1 week) and use Dual Therapy (DOAC + Clopidogrel) to halve major bleeding.',
    checklist: [
      {
        id: 'acs-1',
        category: 'history',
        categoryLabelAr: 'تاريخ السكتة الدماغية والنزيف والقسطرة (Stroke, Bleed & PCI Details)',
        categoryLabelEn: 'Prior Stroke/TIA, Bleeding History & PCI Stent Details',
        itemAr: 'هل لدى المريض تاريخ سابق لـ Stroke أو TIA؟ وما هو نوع الدعامة (DES)؟ وهل يوجد حساسية أسبرين (Bronchospasm)؟',
        itemEn: 'Check for any prior Stroke/TIA, age >= 75, weight < 60 kg, stent type, and Aspirin allergy phenotype.',
        whyItMattersAr: 'وجود تاريخ Stroke أو TIA يعتبر مضاد استطباب مطلق (Boxed Warning) لإعطاء Prasugrel؛ وحساسية الأسبرين تستدعي Desensitization أو P2Y12 Monotherapy.',
        whyItMattersEn: 'Prior Stroke/TIA is an absolute contraindication to Prasugrel; Aspirin bronchospasm requires desensitization or P2Y12 monotherapy.',
        isCritical: true
      },
      {
        id: 'acs-2',
        category: 'labs_vitals',
        categoryLabelAr: 'درجات الخطر والتحاليل (CHA2DS2-VASc, HAS-BLED, Hgb, CrCl)',
        categoryLabelEn: 'Risk Scores (CHA2DS2-VASc / HAS-BLED), Hgb, Platelets & CrCl',
        itemAr: 'حساب CHA2DS2-VASc و HAS-BLED، وفحص الهيموغلوبين (Hgb)، الصفائح (Platelets)، الكرياتينين (SCr/CrCl)، والـ INR.',
        itemEn: 'Calculate CHA2DS2-VASc and HAS-BLED; record baseline Hgb, Platelets, SCr/CrCl, and INR.',
        whyItMattersAr: 'يتم خفض جرعة Apixaban من 5 mg BID إلى 2.5 mg BID فقط إذا اجتمع معياران من ثلاثة (العمر >= 80، الوزن <= 60 كجم، أو SCr >= 1.5 mg/dL).',
        whyItMattersEn: 'Apixaban is reduced to 2.5 mg BID only when >=2 of 3 ABC criteria are met (Age >=80, Body weight <=60 kg, Creatinine >=1.5 mg/dL).',
        isCritical: true
      },
      {
        id: 'acs-3',
        category: 'med_history',
        categoryLabelAr: 'التداخلات الأنزيمية (CYP2C19 & CYP2C9/P-gp Interactions)',
        categoryLabelEn: 'CYP2C19 & CYP2C9/3A4/P-gp Drug Interactions',
        itemAr: 'هل يتناول المريض Omeprazole/Esomeprazole مع Clopidogrel؟ أو يتناول Amiodarone مع Warfarin/DOACs؟',
        itemEn: 'Screen for Omeprazole/Esomeprazole with Clopidogrel, and Amiodarone/Diltiazem with Warfarin or DOACs.',
        whyItMattersAr: 'Omeprazole يثبط CYP2C19 فيبطل تفعيل Clopidogrel ويعرض الدعامة للتخثر (يُستبدل بـ Pantoprazole)؛ و Amiodarone يضاعف مفعول Warfarin.',
        whyItMattersEn: 'Omeprazole inhibits CYP2C19 bioactivation of Clopidogrel (switch to Pantoprazole); Amiodarone inhibits CYP2C9/P-gp.'
      }
    ],
    workupAlgorithmAr: [
      '1. في ACS بدون AFib: أعطِ DAPT (Aspirin + Ticagrelor أو Prasugrel) لمدة 12 شهراً + High-Intensity Statin (Atorvastatin 80 mg).',
      '2. في ACS مع AFib (Post-PCI): اعتمد Dual Therapy (Apixaban 5 mg BID + Clopidogrel 75 mg OD) مع Pantoprazole لحماية المعدة.',
      '3. عند التحويل من Clopidogrel إلى Ticagrelor في الطور الحاد، أعطِ Loading Dose 180 mg فوراً.'
    ],
    workupAlgorithmEn: [
      '1. In ACS without AFib: initiate DAPT (Aspirin + Ticagrelor/Prasugrel) for 12 months + High-Intensity Statin.',
      '2. In ACS + AFib post-PCI: use Dual Therapy (Apixaban + Clopidogrel) + Pantoprazole GI prophylaxis.',
      '3. When escalating Clopidogrel to Ticagrelor in acute ACS, give 180 mg loading dose immediately.'
    ],
    soapTemplateAr: {
      subjective: 'مريض خضع لـ PCI وتركيب دعامة DES بعد NSTEMI ولديه تاريخ AFib.',
      objective: 'BP 124/76 | HR 72 | Hgb 13.6 g/dL | Platelets 240k | SCr 1.0 mg/dL (CrCl 68 mL/min) | CHA2DS2-VASc = 4.',
      assessment: 'Post-PCI NSTEMI مع Non-Valvular AFib؛ يتطلب موازنة منع خثار الدعامة والسكتة مع تقليل خطر النزيف.',
      plan: '1. إيقاف Aspirin عند الخروج والاعتماد على Apixaban 5 mg PO BID + Clopidogrel 75 mg PO OD.\n2. استبدال Omeprazole بـ Pantoprazole 40 mg PO OD لتجنب تداخل CYP2C19.\n3. الاستمرار على Atorvastatin 80 mg PO qHS و Bisoprolol.'
    }
  },
  {
    id: 'dka_endocrine',
    badge: 'ICU/ER • DKA & Inpatient Glycemia',
    titleAr: 'الحماض الكيتوني السكري وإدارة سكر المنومين (DKA / HHS & Inpatient Glycemic Control)',
    titleEn: 'Diabetic Ketoacidosis (DKA) & Inpatient Glycemic Management Workup',
    ward: 'ICU',
    chiefComplaintExamplesAr: 'عطش شديد (Polydipsia)، تبول غزير (Polyuria)، غثيان وإقياء، ألم بطني، تنفس سريع وعميق (Kussmaul Breathing).',
    chiefComplaintExamplesEn: 'Polyuria, polydipsia, nausea/vomiting, abdominal pain, fruity breath, Kussmaul respirations.',
    goldenRuleAr: 'القاعدة الذهبية الأخطر في الطوارئ: لا تبدأ تسريب الأنسولين الوريدي في مريض DKA قبل ظهور نتيجة البوتاسيوم (K+)! إذا كان K+ < 3.5 mEq/L، أوقف الأنسولين وعوّض البوتاسيوم أولاً لمنع توقف القلب!',
    goldenRuleEn: 'Critical Golden Rule: NEVER start IV Insulin in DKA before checking Serum Potassium (K+)! If K+ < 3.5 mEq/L, hold insulin and replete potassium first to prevent fatal arrhythmias.',
    checklist: [
      {
        id: 'dka-1',
        category: 'labs_vitals',
        categoryLabelAr: 'معايير تشخيص وشدة DKA والكهارل (pH, HCO3-, Anion Gap, K+)',
        categoryLabelEn: 'Acid-Base Status, Anion Gap & Critical Serum Potassium',
        itemAr: 'فحص البوتاسيوم (K+) قبل الأنسولين، درجة الحموضة (pH)، البيكربونات (HCO3-)، الفجوة الأنيونية (Anion Gap = Na - [Cl + HCO3])، والصوديوم المصحح.',
        itemEn: 'Check Serum K+ BEFORE starting insulin, Arterial/Venous pH, Serum HCO3-, calculated Anion Gap, and Corrected Sodium.',
        whyItMattersAr: 'معيار شفاء DKA هو إغلاق الفجوة الأنيونية (Anion Gap <= 12 mEq/L) وارتفاع HCO3- >= 15–18 وليس مجرد انخفاض سكر الدم!',
        whyItMattersEn: 'DKA resolution requires Anion Gap closure (AG <= 12) and HCO3- >= 15–18, NOT merely normalization of blood glucose!',
        isCritical: true
      },
      {
        id: 'dka-2',
        category: 'history',
        categoryLabelAr: 'العامل المحفز للـ DKA وأدوية SGLT2i (Precipitating Factor)',
        categoryLabelEn: 'Precipitating Factor & SGLT2i Euglycemic DKA Check',
        itemAr: 'ما الذي حفز الـ DKA؟ هل هو عدوى خفية (Pneumonia/UTI)، إيقاف الأنسولين، احتشاء قلبي (MI)، أم استخدام SGLT2 Inhibitor (Dapagliflozin/Empagliflozin)؟',
        itemEn: 'Identify trigger: occult infection, missed insulin, silent MI, or SGLT2 inhibitor (Euglycemic DKA with BG < 250 mg/dL).',
        whyItMattersAr: 'أدوية SGLT2i قد تسبب Euglycemic DKA (حماض كيتوني شديد رغم أن السكر < 250 mg/dL) ويجب إيقافها فوراً.',
        whyItMattersEn: 'SGLT2 inhibitors can cause Euglycemic DKA (severe ketoacidosis despite BG < 250 mg/dL).'
      },
      {
        id: 'dka-3',
        category: 'red_flag',
        categoryLabelAr: 'بروتوكول إضافة الدكستروز والانتقال للأنسولين تحت الجلد (D5W & SC Overlap)',
        categoryLabelEn: 'Dextrose Addition (BG < 200) & 2–4h Basal Insulin Overlap',
        itemAr: 'عند وصول السكر إلى < 200 mg/dL مع بقاء Anion Gap مفتوحة: أضف D5W للسوائل واستمر بالأنسولين؛ وعند إغلاق الفجوة أعطِ Glargine تحت الجلد قبل ساعتين إلى 4 ساعات من إيقاف الوريدي.',
        itemEn: 'Add D5W when BG reaches < 200 mg/dL while AG remains open; overlap SC Basal Insulin for 2–4 hours before stopping IV insulin.',
        whyItMattersAr: 'إيقاف الأنسولين الوريدي مباشرة دون تداخل 2–4 ساعات مع الأنسولين القاعدي يسبب عودة فورية للحماض الكيتوني (Rebound DKA) لأن عمر نصف الأنسولين الوريدي 4–5 دقائق فقط!',
        whyItMattersEn: 'Stopping IV insulin without a 2–4h SC basal insulin overlap causes immediate rebound ketoacidosis (IV insulin t½ is only 4–5 minutes).',
        isCritical: true
      }
    ],
    workupAlgorithmAr: [
      '1. ابدأ الإنعاش بالسوائل الوريدية (Balanced Crystalloids / 0.9% NaCl) بمعدل 15–20 mL/kg في الساعة الأولى.',
      '2. تحقق من K+: إذا كان < 3.5 عوّض البوتاسيوم وأجّل الأنسولين؛ إذا كان 3.5–5.0 أضف 20–30 mEq KCl لكل لتر سوائل وابدأ Regular Insulin 0.1 U/kg/hr IV.',
      '3. عند BG <= 200 mg/dL أضف Dextrose 5% واخفض الأنسولين إلى 0.05 U/kg/hr حتى تغلق Anion Gap، ثم طبّق Overlap ساعتين إلى 4 ساعات مع Glargine SC.'
    ],
    workupAlgorithmEn: [
      '1. Initiate IV fluid resuscitation (15–20 mL/kg in hour 1).',
      '2. Verify K+: if <3.5 mEq/L hold insulin and replete K+; if 3.5–5.0 add KCl to fluids and start Regular Insulin 0.1 U/kg/hr IV.',
      '3. Add D5W when BG <=200 mg/dL until Anion Gap closes, then overlap SC Glargine for 2–4h before stopping IV infusion.'
    ],
    soapTemplateAr: {
      subjective: 'مريض سكري راجع الطوارئ بإقياء متكرر وألم بطني وتنفس سريع بعد انقطاع عن الأنسولين ليومين.',
      objective: 'BG 460 mg/dL | pH 7.18 | HCO3- 10 mEq/L | Na 131 | Cl 95 | Anion Gap = 26 | K+ 3.2 mEq/L | SCr 1.5 mg/dL.',
      assessment: 'Moderate-to-Severe DKA مترافق مع Hypokalemia حرجة (K+ 3.2 mEq/L < 3.5)؛ البدء الفوري للأنسولين الوريدي قبل تصحيح البوتاسيوم مضاد استطباب مطلق.',
      plan: '1. إيقاف/تأجيل تسريب الأنسولين الوريدي مؤقتاً.\n2. إعطاء السوائل الوريدية مع تعويض البوتاسيوم الفوري (KCl 20–40 mEq/hr) ومراقبة ECG وإعادة فحص K+ بعد ساعة.\n3. بدء Regular Insulin 0.1 U/kg/hr IV فقط بعد ارتفاع K+ >= 3.5 mEq/L.'
    }
  },
  {
    id: 'cirrhosis_he_sbp',
    badge: 'Hepatology • Cirrhosis, SBP & HE',
    titleAr: 'تشمع الكبد اللا معاوض، الحبن، والتهاب الصفاق، واعتلال الدماغ الكبدي (Cirrhosis / SBP / HE)',
    titleEn: 'Decompensated Cirrhosis, Ascites, SBP & Hepatic Encephalopathy Workup',
    ward: 'InternalMedicine',
    chiefComplaintExamplesAr: 'تخليط ذهني، اضطراب النوم، رجفان الخفقان باليدين (Asterixis)، انتفاخ بطني شديد، أو حمى وألم بطني.',
    chiefComplaintExamplesEn: 'Confusion, sleep-wake inversion, asterixis (flapping tremor), tense ascites, abdominal tenderness or fever.',
    goldenRuleAr: 'القاعدة الذهبية: في مريض التشمع، احسب Child-Pugh Score، وابحث عن العامل المحفز لاعتلال الدماغ (إمساك، نزيف، نقص بوتاسيوم، أو مهدئات)، وأوقف حاصرات بيتا غير الانتقائية (Propranolol/Carvedilol) إذا هبط SBP < 90 أو حدث HRS-AKI!',
    goldenRuleEn: 'Golden Rule: Calculate Child-Pugh score, identify HE precipitants, maintain Spironolactone:Furosemide 100:40 ratio, and hold NSBBs if SBP < 90 mmHg, Na < 130, or HRS-AKI develops.',
    checklist: [
      {
        id: 'cir-1',
        category: 'history',
        categoryLabelAr: 'درجة اعتلال الدماغ والعوامل المحفزة (West Haven Grade & Precipitants)',
        categoryLabelEn: 'West Haven HE Grade & Precipitating Factors',
        itemAr: 'تقييم درجة West Haven (I–IV)، وعدد مرات الإخراج اليومية (هدف Lactulose هو 2–3 براز لين يومياً)، والبحث عن نزيف هضمي أو عدوى.',
        itemEn: 'Assess West Haven Grade (I–IV), daily bowel movements (Lactulose target: 2–3 soft stools/day), and screen for GI bleed or infection.',
        whyItMattersAr: 'معالجة العامل المحفز (مثل تصحيح Hypokalemia التي تزيد إنتاج الأمونيا في الكلى، أو علاج الإمساك والعدوى) أهم من مجرد رفع جرعة اللاكتولوز.',
        whyItMattersEn: 'Correcting the precipitant (e.g., hypokalemia-induced renal ammoniagenesis, GI bleed, or SBP) is critical for HE resolution.',
        isCritical: true
      },
      {
        id: 'cir-2',
        category: 'labs_vitals',
        categoryLabelAr: 'تحاليل السائل الحجابي و Child-Pugh (PMN Count, Bilirubin, Albumin, INR)',
        categoryLabelEn: 'Ascitic Fluid PMN Count, Child-Pugh Labs & Renal Status',
        itemAr: 'تعداد الكريات البيض مفصصة النوى في سائل الحبن (Ascitic PMN >= 250 cells/mm³ يشخص SBP)، مع Bilirubin، Albumin، INR، Na+، K+، و SCr.',
        itemEn: 'Ascitic fluid PMN count (>=250 cells/mm³ diagnoses SBP), Serum Bilirubin, Albumin, INR, Na+, K+, and SCr.',
        whyItMattersAr: 'في SBP، إضافة Albumin IV (1.5 g/kg في اليوم 1 ثم 1 g/kg في اليوم 3) مع Ceftriaxone يقلل الوفيات والقصور الكلوي الكبدي (HRS) بنسبة كبيرة.',
        whyItMattersEn: 'In SBP, adding IV Albumin (Day 1: 1.5 g/kg; Day 3: 1 g/kg) to Ceftriaxone markedly reduces HRS-AKI and mortality.',
        isCritical: true
      },
      {
        id: 'cir-3',
        category: 'med_history',
        categoryLabelAr: 'الأدوية الممنوعة في التشمع (Contraindicated Drugs in Cirrhosis)',
        categoryLabelEn: 'Contraindicated Medications in Cirrhosis',
        itemAr: 'فحص وجود NSAIDs (تسبب HRS-AKI ونزيف دوالي)، Benzodiazepines/Opioids (تفاقم HE)، أو جرعة Paracetamol > 2 g/day.',
        itemEn: 'Screen for NSAIDs (precipitate HRS-AKI), Benzodiazepines/Opioids (precipitate HE), and Acetaminophen > 2 g/day.',
        whyItMattersAr: 'حبة واحدة من NSAIDs في مريض تشمع مع حبن قد تغلق الشرينات الكلوية وتدخل المريض في Hepatorenal Syndrome قاتل.',
        whyItMattersEn: 'Even short-term NSAIDs inhibit renal prostaglandins in cirrhosis, precipitating acute Hepatorenal Syndrome (HRS).'
      }
    ],
    workupAlgorithmAr: [
      '1. لعلاج HE: ابدأ Lactulose 30 mL PO q2–4h حتى حدوث الإخراج ثم عاير الجرعة لـ 2–3 مرات يومياً + Rifaximin 550 mg PO BID، وصحح K+.',
      '2. لعلاج الحبن (Ascites): التزم بنسبة Spironolactone 100 mg : Furosemide 40 mg مع تقييد الصوديوم (< 2 g/day).',
      '3. لعلاج SBP: أعطِ Ceftriaxone 2 g IV q24h + IV Albumin (اليوم 1 واليوم 3)، وأوقف Propranolol إذا كان SBP < 90 mmHg.'
    ],
    workupAlgorithmEn: [
      '1. For HE: titrate Lactulose to 2–3 soft stools/day + Rifaximin 550 mg BID and correct hypokalemia.',
      '2. For Ascites: maintain Spironolactone 100 mg : Furosemide 40 mg ratio with 2 g/day sodium restriction.',
      '3. For SBP: administer Ceftriaxone 2 g IV q24h + IV Albumin on Day 1 & Day 3, and hold NSBBs if hypotensive.'
    ],
    soapTemplateAr: {
      subjective: 'تخليط ذهني (HE Grade II) وحمى خفيفة مع إمساك منذ 3 أيام لدى مريض تشمع كبدي.',
      objective: 'BP 86/54 mmHg | Ascitic PMN 420 cells/mm³ | Bilirubin 3.4 | Albumin 2.5 | INR 1.9 (Child-Pugh C) | SCr 1.6 mg/dL | K+ 3.3 mEq/L.',
      assessment: 'Spontaneous Bacterial Peritonitis (SBP) محفز لـ Hepatic Encephalopathy مع انخفاض ضغط الدم ونقص البوتاسيوم.',
      plan: '1. بدء Ceftriaxone 2 g IV q24h + IV Albumin 1.5 g/kg اليوم الأول و 1 g/kg اليوم الثالث.\n2. إيقاف Propranolol و مدرات البول مؤقتاً بسبب انخفاض الضغط (BP 86/54) وارتفاع الكرياتينين.\n3. تكثيف Lactulose + Rifaximin 550 mg PO BID وتعويض البوتاسيوم.'
    }
  },
  {
    id: 'vte_pe_bleed',
    badge: 'Thrombosis • DVT / PE & Reversal',
    titleAr: 'الجلطات الوريدية والانصمام الرئوي وعكس المميعات (VTE / PE & Anticoagulation Reversal)',
    titleEn: 'Venous Thromboembolism (DVT / PE) & Anticoagulation Reversal Workup',
    ward: 'InternalMedicine',
    chiefComplaintExamplesAr: 'تورم وألم أحادي الجانب في ربلة الساق، أو ضيق نفس مفاجئ وألم صدري جنبي وتسرع قلب.',
    chiefComplaintExamplesEn: 'Unilateral calf swelling/erythema, or sudden-onset dyspnea, pleuritic chest pain, and tachycardia.',
    goldenRuleAr: 'القاعدة الذهبية: قبل اختيار أي مضاد تخثر لعلاج DVT/PE، افحص ثلاثية الأمان: (1) الاستقرار الهيموديناميكي، (2) تصفية الكرياتينين CrCl (عتبة 30 mL/min)، و(3) وجود سرطان نشط أو متلازمة أضداد الفوسفوليبيد (APS).',
    goldenRuleEn: 'Golden Rule: Before selecting VTE anticoagulation, verify the safety triad: (1) Hemodynamic stability, (2) CrCl (<30 mL/min cutoff), and (3) Active GI malignancy or triple-positive APS.',
    checklist: [
      {
        id: 'vte-1',
        category: 'labs_vitals',
        categoryLabelAr: 'تصنيف خطورة PE ووظيفة الكلى (Hemodynamics, Troponin/RV Strain & CrCl)',
        categoryLabelEn: 'PE Risk Stratification (SBP, RV Strain) & Renal Clearance (CrCl)',
        itemAr: 'فحص ضغط الدم (SBP < 90 يشير لـ Massive PE)، Troponin/BNP، وحساب Cockcroft-Gault CrCl وتعداد الصفائح الأساسية.',
        itemEn: 'Check SBP (<90 mmHg indicates Massive High-Risk PE), Troponin/Echo RV strain, baseline Platelets, and exact CrCl.',
        whyItMattersAr: 'إذا كان CrCl < 30 mL/min، يُمنع Rivaroxaban و Dabigatran، ويجب خفض Enoxaparin العلاجي إلى 1 mg/kg SC q24h أو استخدام UFH IV.',
        whyItMattersEn: 'When CrCl < 30 mL/min, avoid Rivaroxaban/Dabigatran and reduce therapeutic Enoxaparin to 1 mg/kg SC q24h or use IV UFH.',
        isCritical: true
      },
      {
        id: 'vte-2',
        category: 'med_history',
        categoryLabelAr: 'بروتوكول البدء بالـ DOACs (Lead-in Parenteral vs Monotherapy)',
        categoryLabelEn: 'DOAC Initiation Regimen (Oral Monotherapy vs Parenteral Lead-in)',
        itemAr: 'التمييز بين Apixaban/Rivaroxaban (تبدأ فموياً مباشرة بجرعة تحميل أولية) وبين Dabigatran/Edoxaban (تشترط 5–10 أيام Heparin/LMWH قبلها).',
        itemEn: 'Apixaban (10 mg BID x 7d) and Rivaroxaban (15 mg BID x 21d) start immediately without parenteral lead-in; Dabigatran/Edoxaban require 5–10d parenteral lead-in.',
        whyItMattersAr: 'إعطاء Apixaban بجرعة الصيانة (5 mg BID) من اليوم الأول لعلاج جلطة حادة دون جرعة الـ 10 mg BID لمدة 7 أيام يعرض المريض لامتداد الجلطة!',
        whyItMattersEn: 'Omitting the mandatory 7-day 10 mg BID loading phase of Apixaban in acute VTE leads to early thromboembolic recurrence.',
        isCritical: true
      },
      {
        id: 'vte-3',
        category: 'red_flag',
        categoryLabelAr: 'فحص قلة الصفائح المحدثة بالهيبارين (HIT 4Ts Score) وبروتوكول عكس النزيف',
        categoryLabelEn: 'HIT Screening (4Ts Score) & Emergency Bleed Reversal',
        itemAr: 'مراقبة هبوط الصفائح بنسبة > 50% بين اليوم 5–10 من الهيبارين (HIT)، ومعرفة ترياق العكس الفوري عند النزيف (4F-PCC + Vit K للوارفارين، Protamine للهيبارين).',
        itemEn: 'Monitor for >50% platelet drop on days 5–10 of heparin (HIT), and know reversal regimens (4F-PCC + IV Vit K for Warfarin; Protamine for UFH/LMWH).',
        whyItMattersAr: 'عند الاشتباه بـ HIT يجب إيقاف كل أشكال الهيبارين فوراً والبدء بـ Argatroban أو Fondaparinux أو DOAC، ويُمنع إعطاء الوارفارين قبل تعافي الصفائح > 150k.',
        whyItMattersEn: 'In acute HIT, stop all heparin immediately and start a non-heparin anticoagulant; never start Warfarin until platelets recover > 150,000.'
      }
    ],
    workupAlgorithmAr: [
      '1. إذا كان المريض مستقراً و CrCl >= 30 mL/min: ابدأ Apixaban 10 mg PO BID لمدة 7 أيام ثم 5 mg PO BID.',
      '2. إذا كان CrCl < 15 mL/min أو المريض غير مستقر: ابدأ Unfractionated Heparin (UFH) IV bolus 80 U/kg ثم 18 U/kg/hr.',
      '3. في النزيف المهدد للحياة مع Warfarin: أوقف الوارفارين وأعطِ 4-Factor PCC (25–50 U/kg IV) + Vitamin K 10 mg IV ببطء.'
    ],
    workupAlgorithmEn: [
      '1. If hemodynamically stable and CrCl >= 30 mL/min: start Apixaban 10 mg BID x 7 days, then 5 mg BID.',
      '2. If CrCl < 15 mL/min or unstable: initiate IV UFH 80 U/kg bolus then 18 U/kg/hr infusion.',
      '3. For life-threatening Warfarin bleed: give 4-Factor PCC (25–50 U/kg IV) + Vitamin K 10 mg slow IV.'
    ],
    soapTemplateAr: {
      subjective: 'تورم مؤلم في الساق اليسرى وضيق نفس حاد بعد عملية جراحية قبل أسبوعين.',
      objective: 'BP 118/74 | HR 102 | SpO2 94% | CTPA: Segmental PE | Hgb 13.1 | Platelets 220k | SCr 2.1 mg/dL (CrCl 24 mL/min).',
      assessment: 'Acute Submassive PE مترافق مع Severe Renal Impairment (CrCl 24 mL/min < 30)؛ وصف Enoxaparin 1 mg/kg q12h المعتاد سيؤدي لتراكم ونزيف.',
      plan: '1. إعطاء Enoxaparin بجرعة معدلة كلوياً 1 mg/kg SC q24h (أو البدء بـ UFH IV Infusion) بدلاً من q12h.\n2. مراقبة Anti-Xa والهيموغلوبين والصفائح يومياً.'
    }
  }
];

/**
 * 3. حالات الاختبار المرجعية للتطبيق (Application Benchmark & Validation Test Cases)
 * مستخرجة من الدليل المرجعي لاختبار محركات التطبيق (PK/CrCl, Safety/DDI, MedRec, Simulator, SOAP)
 */
// Adult DKA benchmark thresholds cross-checked against the 2024 ADA/EASD/AACE/JBDS/DTS consensus: https://doi.org/10.2337/dci24-0032
export const BENCHMARK_APP_TEST_CASES: AppBenchmarkTestCase[] = [
  {
    id: 'test-case-dka-k',
    code: 'TEST-01 • ICU DKA & K+ Gate',
    titleAr: 'حالة اختبار 1: الحماض الكيتوني السكري مع نقص بوتاسيوم حرج (DKA + Hypokalemia + SGLT2i)',
    titleEn: 'Test Case 1: Severe DKA with Critical Hypokalemia (K+ 3.1 mEq/L) & Home SGLT2i/Metformin',
    categoryBadge: 'Endocrine & ICU Safety Test',
    difficulty: 'Advanced',
    clinicalSummaryAr: 'مريضة 46 سنة أُدخلت الـ ICU بتشخيص DKA حاد (BG 440 mg/dL، pH 7.16، Anion Gap 25) مع بوتاسيوم منخفض (K+ = 3.1 mEq/L) وقصور كلوي قبل كلوي (SCr 1.9 mg/dL). وُصف لها بالخطأ Regular Insulin IV Infusion فوراً مع استمرار Dapagliflozin و Metformin.',
    clinicalSummaryEn: '46yo female admitted to ICU with acute DKA (BG 440, pH 7.16, AG 25), hypokalemia (K+ 3.1 mEq/L), and AKI (SCr 1.9). Ordered immediate IV Regular Insulin while continuing home Dapagliflozin and Metformin.',
    mustGatherHighlightsAr: [
      'قيمة Serum K+ (3.1 mEq/L < 3.5) قبل تشغيل مضخة الأنسولين الوريدي.',
      'حساب الفجوة الأنيونية (Anion Gap = 25) و CrCl (36 mL/min).',
      'مراجعة أدوية السكري المنزلية (Metformin + Dapagliflozin) التي تزيد الحماض في المرض الحاد.'
    ],
    mustGatherHighlightsEn: [
      'Serum K+ (3.1 mEq/L < 3.5) prior to starting IV insulin infusion.',
      'Calculated Anion Gap (25 mEq/L) and CrCl (36 mL/min).',
      'Home oral antidiabetics (Metformin & Dapagliflozin) requiring immediate inpatient hold.'
    ],
    whatAppModulesItTestsAr: [
      'محرك تنبيهات الأمان والكهارل (Safety & Electrolyte Scanner) في ملف المريض.',
      'وحدة المطابقة الدوائية (MedRec) لاكتشاف استمرار Metformin و Dapagliflozin الخاطئ في الـ ICU.',
      'محاكي الحالات التطبيقي (DKA & Dysglycemia Scenario) وتوليد ملاحظة SOAP.'
    ],
    whatAppModulesItTestsEn: [
      'Patient Safety & High-Alert Insulin Scanner.',
      'MedRec Engine for inappropriate continuation of Metformin & SGLT2i in DKA/AKI.',
      'Applied Clinical Simulator (DKA scenario) & SOAP Note Generator.'
    ],
    expectedAppFindingsAr: [
      'تنبيه حرج (STOP/HOLD): إيقاف Regular Insulin IV فوراً لأن K+ = 3.1 mEq/L (< 3.5) والبدء بتعويض KCl الوريدي أولاً.',
      'تنبيه MedRec: إيقاف Metformin (خطر Lactic Acidosis) وإيقاف Dapagliflozin (يسبب ويفاقم Ketoacidosis).',
      'خطة التحويل: عند انخفاض BG إلى أقل من 250 mg/dL، أضف Dextrose 5–10% وخفّض تسريب الإنسولين الوريدي إلى 0.05 وحدة/كغ/ساعة؛ وعند التحويل إلى basal insulin، حافظ على التداخل الزمني وفق بروتوكول المستشفى (عادةً 1–2 ساعة على الأقل).'
    ],
    expectedAppFindingsEn: [
      'CRITICAL ALERT: Hold IV Regular Insulin immediately due to K+ 3.1 mEq/L (<3.5); replete IV KCl first.',
      'MedRec Alert: Hold Metformin and Dapagliflozin during acute DKA/AKI.',
      'Transition Protocol (adult DKA consensus): when BG falls below 250 mg/dL, add 5–10% dextrose and reduce IV insulin to 0.05 units/kg/h; overlap basal insulin before stopping IV insulin per institutional protocol (at least 1–2 h).'
    ],
    patientData: {
      id: 'pt-test-dka',
      mrn: 'TEST-DKA-01',
      name: 'Synthetic DKA Test Patient',
      nameEn: 'Synthetic DKA Test Patient',
      age: 46,
      gender: 'female',
      ward: 'ICU',
      room: 'ICU-09',
      bed: 'Bed 1',
      weight: 68,
      height: 162,
      allergies: ['No Known Drug Allergies (NKDA)'],
      diagnoses: [
        'Severe Diabetic Ketoacidosis (DKA - pH 7.16, Anion Gap 25)',
        'Critical Hypokalemia (Serum K+ 3.1 mEq/L)',
        'Pre-renal Acute Kidney Injury (SCr 1.9 mg/dL)',
        'Type 2 Diabetes Mellitus on SGLT2i'
      ],
      admissionDate: '2026-10-21',
      attendingPhysician: 'Synthetic ICU Consultant',
      clinicalPharmacist: 'Synthetic Clinical Pharmacist',
      status: 'critical',
      labs: {
        date: '2026-10-21',
        serumCreatinine: 1.9,
        bun: 42,
        potassium: 3.1,
        sodium: 132,
        albumin: 3.6,
        inr: 1.0,
        wbc: 14.8,
        crcl: 36.4
      },
      activeMedications: [
        {
          id: 'med-dka-1',
          name: 'Regular Insulin IV Infusion',
          genericName: 'Insulin Regular IV',
          dose: '6.8 Units/hr (0.1 U/kg/hr)',
          route: 'IV Infusion',
          frequency: 'Continuous Infusion [HOLD IMMEDIATELY: K+ is 3.1 mEq/L < 3.5!]',
          startDate: '2026-10-21',
          indication: 'Acute DKA Management',
          isHighAlert: true,
          notes: 'CRITICAL SAFETY TRAP: Serum K+ is 3.1 mEq/L! Starting IV Insulin before K+ >= 3.5 mEq/L triggers fatal cardiac arrhythmias!'
        },
        {
          id: 'med-dka-2',
          name: 'Dapagliflozin (Forxiga)',
          genericName: 'Dapagliflozin',
          dose: '10 mg',
          route: 'Oral',
          frequency: 'Once daily (OD) [CONTRAINDICATED IN ACUTE DKA]',
          startDate: '2026-10-21',
          indication: 'T2DM (Inappropriately continued on admission)',
          notes: 'SGLT2 inhibitors precipitate and prolong ketoacidosis — must be held immediately!'
        },
        {
          id: 'med-dka-3',
          name: 'Metformin',
          genericName: 'Metformin',
          dose: '1000 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID) [CONTRAINDICATED IN ACIDOSIS & AKI]',
          startDate: '2026-10-21',
          indication: 'T2DM',
          requiresRenalAdjustment: true,
          notes: 'Severe Metabolic Acidosis + AKI (SCr 1.9) — Hold immediately!'
        }
      ],
      homeMedications: [
        {
          id: 'h-dka-1',
          name: 'Dapagliflozin',
          genericName: 'Dapagliflozin',
          dose: '10 mg',
          route: 'Oral',
          frequency: 'Once daily (OD)',
          startDate: '2025-05-01',
          indication: 'T2DM'
        },
        {
          id: 'h-dka-2',
          name: 'Metformin',
          genericName: 'Metformin',
          dose: '1000 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID)',
          startDate: '2024-01-10',
          indication: 'T2DM'
        }
      ]
    },
    discrepancies: [
      {
        id: 'rec-test-dka-1',
        patientId: 'pt-test-dka',
        drugName: 'Dapagliflozin & Metformin',
        type: 'commission',
        homePrescription: 'Dapagliflozin 10 mg OD + Metformin 1000 mg BID',
        hospitalOrder: 'Continued on ICU Admission despite Acute DKA & AKI',
        clinicalSignificance: 'major',
        clarificationStatus: 'unresolved',
        pharmacistAction: 'يتوجب إيقاف Dapagliflozin و Metformin فوراً في الـ ICU بسبب الحماض الكيتوني (pH 7.16) والقصور الكلوي الحاد.'
      }
    ],
    sampleIntervention: {
      id: 'int-test-dka-1',
      patientId: 'pt-test-dka',
      patientName: 'نورة عبدالرحمن القحطاني (حالة اختبار DKA)',
      mrn: 'TEST-DKA-01',
      ward: 'ICU',
      date: '2026-10-21 12:30',
      drpType: 'adverse_drug_reaction',
      medicationInvolved: 'Regular Insulin IV Infusion + IV KCl Replacement',
      clinicalIssue: 'بدء تسريب Regular Insulin IV (0.1 U/kg/hr) لمريضة DKA بينما البوتاسيوم المصل K+ = 3.1 mEq/L (< 3.5 mEq/L) مع استمرار Dapagliflozin و Metformin.',
      proposedRecommendation: 'إيقاف تسريب الأنسولين الوريدي فوراً، وإعطاء KCl 20–40 mEq/hr وريدياً مع السوائل حتى يرتفع K+ >= 3.5 mEq/L ثم استئناف الأنسولين، مع إيقاف Dapagliflozin و Metformin.',
      rationale: 'الأنسولين يدفع البوتاسيوم داخل الخلايا؛ إعطاؤه عند K+ < 3.5 mEq/L يسبب Hypokalemia قاتلة وتوقف القلب (ADA / DiPiro 13th Ed Ch. 91).',
      severity: 'high',
      pharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      physician: 'Dr. طارق العمري (ICU Consultant)',
      status: 'pending',
      costImpactEstimatedSAR: 2500,
      referenceTitle: 'Clinical Pharmacy Casebook & ACCP 2026 Vol 2 (DKA Protocol)',
      referenceSourceUrl: 'local://ref/chapter/accp-2026-v2-c5',
      evidenceLevel: 'ADA / ACCP 2026 Class I (Critical Safety Gate)'
    },
    simulatorPreset: {
      scenarioId: 'dka_hyperkalemia_glycemic',
      patientName: 'Noura A. Al-Qahtani (DKA Test Case)',
      age: 46,
      weightKg: 68,
      crcl: 36,
      serumCr: 1.9,
      potassium: 3.1,
      sodium: 132,
      sbp: 102,
      heartRate: 118,
      lvef: 55,
      inr: 1.0,
      childPughClass: 'A',
      hemodynamicProfile: 'warm_dry',
      hasPenicillinAnaphylaxis: false,
      hasAspirinAllergy: false,
      hasActiveBleed: false,
      switchingAceiToArni: false,
      onAmiodarone: false
    }
  },
  {
    id: 'test-case-vanco-zosyn',
    code: 'TEST-02 • Nephrotoxic Synergy & QTc',
    titleAr: 'حالة اختبار 2: سمية كلوية متآزرة (Vancomycin + Zosyn) وتطاول QTc قاتل (Ciprofloxacin + Amiodarone)',
    titleEn: 'Test Case 2: Vancomycin + Zosyn AKI Synergy & Ciprofloxacin + Amiodarone QTc Trap',
    categoryBadge: 'ID / PK & DDI Scanner Test',
    difficulty: 'Advanced',
    clinicalSummaryAr: 'مريض 74 سنة (الوزن 70 kg، CrCl = 22 mL/min) منوم في الباطنية/ICU بإنتان بولي وتنفسي و AFib. وُصف له Vancomycin 1000 mg q12h + Piperacillin/Tazobactam (Zosyn) + Ciprofloxacin مع وجود Amiodarone و Warfarin.',
    clinicalSummaryEn: '74yo male (Wt 70 kg, CrCl 22 mL/min) with urosepsis/HAP and AFib prescribed unadjusted Vancomycin 1g q12h + Zosyn + Ciprofloxacin alongside Amiodarone and Warfarin.',
    mustGatherHighlightsAr: [
      'حساب Cockcroft-Gault CrCl (22 mL/min) وملاحظة ارتفاع SCr إلى 2.6 mg/dL.',
      'رصد الثلاثي التداخلي: (Vancomycin + Zosyn) على الكلى، و (Ciprofloxacin + Amiodarone) على QTc، و (Amiodarone + Warfarin) على INR (3.8).',
      'التحقق من ازدواجية التغطية سالبة الغرام غير المبررة (Zosyn + Ciprofloxacin).'
    ],
    mustGatherHighlightsEn: [
      'Calculated CrCl (22 mL/min) with rising SCr (2.6 mg/dL).',
      'Triple DDI cluster: Vancomycin+Zosyn nephrotoxicity, Ciprofloxacin+Amiodarone Torsades risk, and Amiodarone+Warfarin supratherapeutic INR (3.8).',
      'Unnecessary double Gram-negative coverage.'
    ],
    whatAppModulesItTestsAr: [
      'ماسح التداخلات الدوائية المتعددة (Multi-Drug DDI Scanner) في تبويب Safety/DRP.',
      'حاسبة تصفية الكرياتينين (Cockcroft-Gault) وحاسبة Vancomycin AUC24/MIC & Half-Life.',
      'محرك تنبيهات تعديل الجرعات الكلوية (Renal Dose Adjustment Engine).'
    ],
    whatAppModulesItTestsEn: [
      'Multi-Drug Interaction Scanner (Contraindicated & Major DDIs).',
      'Cockcroft-Gault & Vancomycin PK/TDM Calculator.',
      'Renal Dose Adjustment Safety Engine.'
    ],
    expectedAppFindingsAr: [
      'تداخل ممنوع (Contraindicated): Ciprofloxacin + Amiodarone (خطر QTc Prolongation & Torsades de Pointes).',
      'تداخل كبير (Major): Vancomycin + Piperacillin/Tazobactam (سمية كلوية متآزرة — استبدل Zosyn بـ Cefepime أو Meropenem معدل كلوياً).',
      'تداخل كبير (Major): Amiodarone + Warfarin (INR ارتفع إلى 3.8 — خفض جرعة الوارفارين 33–50%).'
    ],
    expectedAppFindingsEn: [
      'Contraindicated DDI: Ciprofloxacin + Amiodarone (QTc prolongation / TdP).',
      'Major DDI: Vancomycin + Piperacillin/Tazobactam (synergistic AKI — switch to renally adjusted Meropenem/Cefepime).',
      'Major DDI: Amiodarone + Warfarin (INR 3.8 — reduce Warfarin dose by 33–50%).'
    ],
    patientData: {
      id: 'pt-test-ddi',
      mrn: 'TEST-PK-02',
      name: 'منصور سعيد الدوسري (حالة اختبار التداخلات و PK)',
      nameEn: 'Mansour S. Al-Dosari (PK & DDI Test Case)',
      age: 74,
      gender: 'male',
      ward: 'ICU',
      room: 'ICU-07',
      bed: 'Bed B',
      weight: 70,
      height: 168,
      allergies: ['No Known Drug Allergies (NKDA)'],
      diagnoses: [
        'Severe Sepsis secondary to Complicated UTI & HAP',
        'Acute Kidney Injury Stage 2 (SCr 2.6 mg/dL, CrCl 22 mL/min)',
        'Atrial Fibrillation on Warfarin & Amiodarone (INR 3.8)'
      ],
      admissionDate: '2026-10-20',
      attendingPhysician: 'Dr. طارق العمري (ICU Consultant)',
      clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      status: 'critical',
      labs: {
        date: '2026-10-21',
        serumCreatinine: 2.6,
        bun: 56,
        potassium: 4.9,
        sodium: 136,
        albumin: 2.9,
        inr: 3.8,
        wbc: 18.2,
        crcl: 21.8
      },
      activeMedications: [
        {
          id: 'med-ddi-1',
          name: 'Vancomycin IV',
          genericName: 'Vancomycin',
          dose: '1000 mg',
          route: 'IV Infusion',
          frequency: 'Every 12 hours (q12h) [Supratherapeutic for CrCl 22 mL/min!]',
          startDate: '2026-10-20',
          indication: 'Empiric MRSA Coverage',
          isHighAlert: true,
          requiresRenalAdjustment: true,
          requiresTDM: true,
          notes: 'CrCl 21.8 mL/min: Extend interval to q24h-q48h and monitor AUC24/MIC!'
        },
        {
          id: 'med-ddi-2',
          name: 'Piperacillin/Tazobactam (Zosyn)',
          genericName: 'Piperacillin/Tazobactam',
          dose: '4.5 g',
          route: 'IV Infusion',
          frequency: 'Every 6 hours (q6h) [Synergistic AKI with Vancomycin!]',
          startDate: '2026-10-20',
          indication: 'Empiric Gram-Negative Coverage',
          requiresRenalAdjustment: true,
          notes: 'Major synergistic nephrotoxicity with Vancomycin + unadjusted for CrCl 22 mL/min'
        },
        {
          id: 'med-ddi-3',
          name: 'Ciprofloxacin',
          genericName: 'Ciprofloxacin',
          dose: '400 mg',
          route: 'IV Infusion',
          frequency: 'Every 8 hours (q8h) [Contraindicated with Amiodarone - QTc!]',
          startDate: '2026-10-20',
          indication: 'Double Gram-Negative Coverage',
          requiresRenalAdjustment: true,
          notes: 'Contraindicated QTc prolongation with Amiodarone + needs renal dose reduction'
        },
        {
          id: 'med-ddi-4',
          name: 'Amiodarone',
          genericName: 'Amiodarone',
          dose: '200 mg',
          route: 'Oral',
          frequency: 'Once daily (OD)',
          startDate: '2026-10-20',
          indication: 'AFib Rhythm Control',
          isHighAlert: true
        },
        {
          id: 'med-ddi-5',
          name: 'Warfarin',
          genericName: 'Warfarin',
          dose: '5 mg',
          route: 'Oral',
          frequency: 'Once daily (OD) [INR 3.8 - Unadjusted for Amiodarone!]',
          startDate: '2026-10-20',
          indication: 'AFib Stroke Prevention',
          isHighAlert: true,
          notes: 'Supratherapeutic INR (3.8) due to CYP2C9 inhibition by Amiodarone'
        }
      ],
      homeMedications: [
        {
          id: 'h-ddi-1',
          name: 'Warfarin',
          genericName: 'Warfarin',
          dose: '5 mg',
          route: 'Oral',
          frequency: 'Once daily (OD)',
          startDate: '2024-03-01',
          indication: 'AFib'
        }
      ]
    },
    discrepancies: [],
    sampleIntervention: {
      id: 'int-test-ddi-1',
      patientId: 'pt-test-ddi',
      patientName: 'منصور سعيد الدوسري (حالة اختبار التداخلات و PK)',
      mrn: 'TEST-PK-02',
      ward: 'ICU',
      date: '2026-10-21 12:35',
      drpType: 'drug_interaction',
      medicationInvolved: 'Vancomycin + Zosyn + Ciprofloxacin + Amiodarone + Warfarin',
      clinicalIssue: 'اجتماع 3 تداخلات خطيرة مع قصور كلوي حاد (CrCl 22 mL/min): (1) Ciprofloxacin + Amiodarone يسبب تطاول QTc قاتل، (2) Vancomycin + Zosyn بجرعات غير معدلة يفاقم AKI، و(3) ارتفاع INR إلى 3.8 بسبب تداخل Amiodarone مع Warfarin.',
      proposedRecommendation: '1. إيقاف Ciprofloxacin و Zosyn والاستعاضة عنهما بـ Meropenem 500 mg IV q12h (Extended Infusion).\n2. تعديل Vancomycin إلى 1000 mg IV q24h–q48h via TDM.\n3. إيقاف جرعة اليوم من Warfarin ثم خفض جرعته بنسبة 40% إلى 3 mg PO OD.',
      rationale: 'منع Torsades de Pointes، وإيقاف السمية الكلوية المتآزرة، ومنع النزيف الناتج عن تثبيط CYP2C9 (ACCP 2026 & Casebook Guide).',
      severity: 'high',
      pharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      physician: 'Dr. طارق العمري (ICU Consultant)',
      status: 'pending',
      costImpactEstimatedSAR: 3400,
      referenceTitle: "DiPiro's 13th Ed (Ch. 54 & 118) & Clinical Casebook Guide",
      referenceSourceUrl: 'local://ref/chapter/dipiro-13-sepsis-aki-pk',
      evidenceLevel: 'ACCP 2026 / IDSA Class I'
    },
    simulatorPreset: {
      scenarioId: 'icu_hap_sepsis_aki',
      patientName: 'Mansour S. Al-Dosari (PK & DDI Test Case)',
      age: 74,
      weightKg: 70,
      crcl: 22,
      serumCr: 2.6,
      potassium: 4.9,
      sodium: 136,
      sbp: 104,
      heartRate: 92,
      lvef: 45,
      inr: 3.8,
      childPughClass: 'A',
      hemodynamicProfile: 'warm_wet',
      hasPenicillinAnaphylaxis: false,
      hasAspirinAllergy: false,
      hasActiveBleed: false,
      switchingAceiToArni: false,
      onAmiodarone: true
    }
  },
  {
    id: 'test-case-cardio-washout',
    code: 'TEST-03 • CCU HFrEF & ACS Switch',
    titleAr: 'حالة اختبار 3: تفجر قصور القلب الحاد مع جمع خاطئ لـ ACEi + ARNI وتداخل Clopidogrel + Omeprazole',
    titleEn: 'Test Case 3: ADHF Cardiorenal Decompensation + Concurrent ACEi/ARNI Trap & Clopidogrel-Omeprazole DDI',
    categoryBadge: 'Cardiology CCU Test',
    difficulty: 'Advanced',
    clinicalSummaryAr: 'مريض 63 سنة في الـ CCU بتشخيص ADHF (LVEF 28%, Warm & Wet) وتاريخ دعامة تاجية (DES) قبل شهرين. وُصف له Sacubitril/Valsartan (Entresto) بالتزامن مع Ramipril دون فترة غسيل 36 ساعة، ويتناول Clopidogrel مع Omeprazole.',
    clinicalSummaryEn: '63yo male in CCU with ADHF (LVEF 28%, Warm & Wet) and recent PCI stent. Prescribed Sacubitril/Valsartan concurrently with Ramipril without 36h washout, plus Clopidogrel with Omeprazole.',
    mustGatherHighlightsAr: [
      'التحقق من توقيت آخر جرعة Ramipril (يجب مرور 36 ساعة كاملة قبل أول جرعة Entresto).',
      'معرفة الجرعة المنزلية لـ Furosemide (40 mg PO) لحساب الجرعة الوريدية الفعالة (80–100 mg IV).',
      'اكتشاف تداخل Omeprazole مع Clopidogrel الذي يضعف حماية الدعامة التاجية.'
    ],
    mustGatherHighlightsEn: [
      'Timestamp of last Ramipril dose (mandatory 36-hour washout before first dose of Sacubitril/Valsartan).',
      'Home oral Furosemide dose (40 mg PO) to calculate 2.5x IV dose (80–100 mg IV).',
      'CYP2C19 inhibition of Clopidogrel by Omeprazole.'
    ],
    whatAppModulesItTestsAr: [
      'محاكي عناية القلب التطبيقي (HFrEF & Cardiorenal Simulator) وبروتوكول 36h Washout.',
      'ماسح التداخلات الدوائية (Clopidogrel + Omeprazole CYP2C19 Alert).',
      'توثيق تدخلات عناية القلب الحرجة (BCCP Evidence Gate).'
    ],
    whatAppModulesItTestsEn: [
      'HFrEF & Cardiorenal Simulator (36h ACEi-to-ARNI Washout Protocol).',
      'CYP2C19 Clopidogrel-Omeprazole Interaction Scanner.',
      'BCCP Cardiology SOAP Documentation.'
    ],
    expectedAppFindingsAr: [
      'مضاد استطباب مطلق (STOP): إيقاف Ramipril فوراً وتأجيل Entresto لمدة 36 ساعة كاملة لمنع Angioedema قاتلة.',
      'تعديل تداخل الدعامة: استبدال Omeprazole بـ Pantoprazole 40 mg PO OD لحماية فعالية Clopidogrel.',
      'تحسين إدرار البول: رفع Furosemide إلى 80 mg IV BID (2× الجرعة المنزلية) مع إضافة Dapagliflozin 10 mg OD.'
    ],
    expectedAppFindingsEn: [
      'Absolute Contraindication: Discontinue Ramipril and enforce 36-hour washout before starting Entresto.',
      'Stent Protection: Switch Omeprazole to Pantoprazole 40 mg OD to preserve Clopidogrel bioactivation.',
      'Diuretic Optimization: Administer Furosemide 80 mg IV BID + Dapagliflozin 10 mg OD.'
    ],
    patientData: {
      id: 'pt-test-cardio',
      mrn: 'TEST-CCU-03',
      name: 'خالد عبدالعزيز الشمري (حالة اختبار القلب CCU)',
      nameEn: 'Khaled A. Al-Shammari (Cardiology Test Case)',
      age: 63,
      gender: 'male',
      ward: 'CCU',
      room: 'CCU-05',
      bed: 'Bed A',
      weight: 84,
      height: 174,
      allergies: ['No Known Drug Allergies (NKDA)'],
      diagnoses: [
        'Acute Decompensated Heart Failure (ADHF, LVEF 28%, Warm & Wet)',
        'Status Post PCI with Drug-Eluting Stent (2 months ago)',
        'Stage 3a Chronic Kidney Disease (SCr 1.5 mg/dL, CrCl 49 mL/min)'
      ],
      admissionDate: '2026-10-21',
      attendingPhysician: 'Dr. سامي رضوان (Cardiology Consultant)',
      clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      status: 'critical',
      labs: {
        date: '2026-10-21',
        serumCreatinine: 1.5,
        bun: 34,
        potassium: 4.8,
        sodium: 135,
        albumin: 3.7,
        inr: 1.1,
        wbc: 7.9,
        crcl: 49.2
      },
      activeMedications: [
        {
          id: 'med-ccu-1',
          name: 'Ramipril',
          genericName: 'Ramipril',
          dose: '5 mg',
          route: 'Oral',
          frequency: 'Once daily (OD) [CONTRAINDICATED WITH ENTRESTO - ANGIOEDEMA!]',
          startDate: '2026-10-21',
          indication: 'HFrEF',
          isHighAlert: true,
          notes: 'Never co-administer ACEi with Sacubitril/Valsartan! Mandatory 36-hour washout required!'
        },
        {
          id: 'med-ccu-2',
          name: 'Sacubitril/Valsartan (Entresto)',
          genericName: 'Sacubitril/Valsartan',
          dose: '24/26 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID) [Hold until 36h after last Ramipril dose!]',
          startDate: '2026-10-21',
          indication: 'HFrEF GDMT Pillar 1',
          isHighAlert: true
        },
        {
          id: 'med-ccu-3',
          name: 'Clopidogrel (Plavix)',
          genericName: 'Clopidogrel',
          dose: '75 mg',
          route: 'Oral',
          frequency: 'Once daily (OD)',
          startDate: '2026-10-21',
          indication: 'Post-PCI Stent Thrombosis Prevention',
          isHighAlert: true
        },
        {
          id: 'med-ccu-4',
          name: 'Omeprazole',
          genericName: 'Omeprazole',
          dose: '20 mg',
          route: 'Oral',
          frequency: 'Once daily (OD) [Inhibits CYP2C19 activation of Clopidogrel!]',
          startDate: '2026-10-21',
          indication: 'GI Prophylaxis',
          notes: 'Switch to Pantoprazole 40 mg OD to prevent stent thrombosis!'
        },
        {
          id: 'med-ccu-5',
          name: 'Furosemide IV',
          genericName: 'Furosemide',
          dose: '80 mg',
          route: 'IV Push',
          frequency: 'Twice daily (BID)',
          startDate: '2026-10-21',
          indication: 'ADHF Decongestion (2x Home Dose)'
        }
      ],
      homeMedications: [
        {
          id: 'h-ccu-1',
          name: 'Furosemide',
          genericName: 'Furosemide',
          dose: '40 mg',
          route: 'Oral',
          frequency: 'Once daily (OD)',
          startDate: '2025-02-01',
          indication: 'HFrEF Fluid Management'
        },
        {
          id: 'h-ccu-2',
          name: 'Carvedilol',
          genericName: 'Carvedilol',
          dose: '12.5 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID)',
          startDate: '2025-02-01',
          indication: 'HFrEF GDMT Pillar 2'
        }
      ]
    },
    discrepancies: [
      {
        id: 'rec-test-ccu-1',
        patientId: 'pt-test-cardio',
        drugName: 'Carvedilol',
        type: 'omission',
        homePrescription: '12.5 mg Oral Twice Daily (BID)',
        hospitalOrder: 'Omitted on CCU Admission',
        clinicalSignificance: 'major',
        clarificationStatus: 'unresolved',
        pharmacistAction: 'يوصى باستمرار Carvedilol المنزلي لأن المريض في حالة Warm & Wet (SBP > 100 mmHg) ولا يعاني من Cardiogenic Shock.'
      }
    ],
    sampleIntervention: {
      id: 'int-test-ccu-1',
      patientId: 'pt-test-cardio',
      patientName: 'خالد عبدالعزيز الشمري (حالة اختبار القلب CCU)',
      mrn: 'TEST-CCU-03',
      ward: 'CCU',
      date: '2026-10-21 12:40',
      drpType: 'drug_interaction',
      medicationInvolved: 'Ramipril + Sacubitril/Valsartan & Clopidogrel + Omeprazole',
      clinicalIssue: 'وصف Sacubitril/Valsartan بالتزامن مع Ramipril دون فترة غسيل 36 ساعة (خطر Angioedema قاتل)، بالإضافة لوصف Omeprazole مع Clopidogrel وإغفال Carvedilol المنزلي.',
      proposedRecommendation: '1. إيقاف Ramipril فوراً وتأجيل أول جرعة من Sacubitril/Valsartan لمدة 36 ساعة كاملة.\n2. استبدال Omeprazole بـ Pantoprazole 40 mg PO OD.\n3. إعادة وصف Carvedilol 12.5 mg PO BID المنزلي.',
      rationale: 'منع تراكم Bradykinin المسبب لوذمة الحنجرة القاتلة، والحفاظ على فعالية Clopidogrel لحماية الدعامة التاجية (ACCP Cardiology 2026 & Casebook Guide).',
      severity: 'high',
      pharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      physician: 'Dr. سامي رضوان (Cardiology Consultant)',
      status: 'pending',
      costImpactEstimatedSAR: 2900,
      referenceTitle: "DiPiro's 13th Ed (Ch. 32) & ACCP Cardiology 2026 (BCCP)",
      referenceSourceUrl: 'local://ref/chapter/dipiro-13-hf-cardiorenal',
      evidenceLevel: 'ACC/AHA/HFSA Class I & Boxed Warning'
    },
    simulatorPreset: {
      scenarioId: 'hfref_adhf_cardiorenal',
      patientName: 'Khaled A. Al-Shammari (Cardiology Test Case)',
      age: 63,
      weightKg: 84,
      crcl: 49,
      serumCr: 1.5,
      potassium: 4.8,
      sodium: 135,
      sbp: 110,
      heartRate: 86,
      lvef: 28,
      inr: 1.1,
      childPughClass: 'A',
      hemodynamicProfile: 'warm_wet',
      hasPenicillinAnaphylaxis: false,
      hasAspirinAllergy: false,
      hasActiveBleed: false,
      switchingAceiToArni: true,
      onAmiodarone: false
    }
  },
  {
    id: 'test-case-cirrhosis-sbp',
    code: 'TEST-04 • Hepatology Child-Pugh C',
    titleAr: 'حالة اختبار 4: تشمع الكبد اللا معاوض (Child-Pugh C) مع التهاب الصفاق (SBP) واعتلال الدماغ الكبدي',
    titleEn: 'Test Case 4: Decompensated Cirrhosis (Child-Pugh C) with Acute SBP, HE Grade II & Hypotension',
    categoryBadge: 'Hepatology & Internal Med Test',
    difficulty: 'Advanced',
    clinicalSummaryAr: 'مريض 66 سنة يعاني من تشمع كبدي Child-Pugh C (Bilirubin 3.6, Albumin 2.4, INR 2.1) راجع بحمى وتخليط ذهني (HE Grade II) وتعداد PMN في الحبن 480 خلية/مم³ مع ضغط 86/52 mmHg وارتفاع SCr إلى 1.8 mg/dL، بينما لا يزال يتلقى Propranolol و Ibuprofen.',
    clinicalSummaryEn: '66yo male with Child-Pugh C cirrhosis presenting with SBP (ascitic PMN 480), HE Grade II, BP 86/52 mmHg, and SCr 1.8 mg/dL while still ordered Propranolol and Ibuprofen.',
    mustGatherHighlightsAr: [
      'حساب Child-Pugh Score (Class C - 12 نقطة) وفحص Ascitic Fluid PMN (480 >= 250 يشخص SBP).',
      'مراقبة ضغط الدم (SBP = 86 mmHg < 90) والكرياتينين (1.8 mg/dL) لإيقاف Propranolol والمدرات فوراً.',
      'رصد تناول Ibuprofen الذي يسبب Hepatorenal Syndrome (HRS-AKI) ونزيف الدوالي.'
    ],
    mustGatherHighlightsEn: [
      'Child-Pugh Class C calculation and ascitic fluid PMN count (480 cells/mm³ >= 250 confirms SBP).',
      'Hypotension (SBP 86 mmHg) and AKI (SCr 1.8) requiring immediate cessation of Propranolol and diuretics.',
      'NSAID (Ibuprofen) use precipitating HRS-AKI.'
    ],
    whatAppModulesItTestsAr: [
      'حاسبة Child-Pugh Score في تبويب PK Calc.',
      'محاكي أمراض الكبد التطبيقي (Cirrhosis, Ascites, SBP & HE Scenario).',
      'نظام رصد الأدوية عالية الخطورة في القصور الكبدي والكلوي.'
    ],
    whatAppModulesItTestsEn: [
      'Child-Pugh Hepatic Calculator.',
      'Cirrhosis, SBP & Hepatic Encephalopathy Case Simulator.',
      'Hepatorenal Safety & Contraindication Scanner.'
    ],
    expectedAppFindingsAr: [
      'علاج SBP المنقذ للحياة: البدء الفوري بـ Ceftriaxone 2 g IV q24h + IV Albumin (1.5 g/kg اليوم 1 و 1.0 g/kg اليوم 3).',
      'إيقاف فوري (STOP): إيقاف Ibuprofen نهائياً وإيقاف Propranolol لأن SBP < 90 mmHg مع HRS-AKI.',
      'علاج HE: إعطاء Lactulose لمعايرة 2–3 إخراج لين يومياً + Rifaximin 550 mg PO BID وتصحيح نقص البوتاسيوم (K+ 3.3).'
    ],
    expectedAppFindingsEn: [
      'Life-Saving SBP Protocol: Start Ceftriaxone 2 g IV q24h + IV Albumin (1.5 g/kg Day 1, 1.0 g/kg Day 3).',
      'Immediate Hold: Discontinue Ibuprofen permanently and hold Propranolol due to SBP < 90 mmHg and AKI.',
      'HE Protocol: Titrate Lactulose + Rifaximin 550 mg PO BID and replete potassium.'
    ],
    patientData: {
      id: 'pt-test-hep',
      mrn: 'TEST-HEP-04',
      name: 'إبراهيم حسن الزهراني (حالة اختبار الكبد SBP/HE)',
      nameEn: 'Ibrahim H. Al-Zahrani (Hepatology Test Case)',
      age: 66,
      gender: 'male',
      ward: 'InternalMedicine',
      room: 'Ward-308',
      bed: 'Bed A',
      weight: 76,
      height: 170,
      allergies: ['No Known Drug Allergies (NKDA)'],
      diagnoses: [
        'Decompensated Cirrhosis (Child-Pugh Class C, Score 12)',
        'Acute Spontaneous Bacterial Peritonitis (Ascitic PMN 480 cells/mm³)',
        'Hepatic Encephalopathy (West Haven Grade II)',
        'Acute Kidney Injury / Suspected HRS-AKI (SCr 1.8 mg/dL)'
      ],
      admissionDate: '2026-10-21',
      attendingPhysician: 'Dr. ماجد باوزير (Hepatology Consultant)',
      clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      status: 'critical',
      labs: {
        date: '2026-10-21',
        serumCreatinine: 1.8,
        bun: 44,
        potassium: 3.3,
        sodium: 128,
        bilirubin: 3.6,
        albumin: 2.4,
        inr: 2.1,
        wbc: 13.5,
        crcl: 41.0
      },
      activeMedications: [
        {
          id: 'med-hep-1',
          name: 'Propranolol',
          genericName: 'Propranolol',
          dose: '40 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID) [HOLD IN SBP WITH HYPOTENSION BP 86/52 & AKI!]',
          startDate: '2026-10-21',
          indication: 'Variceal Prophylaxis',
          notes: 'Closing the NSBB window: Hold Propranolol when SBP < 90 mmHg, Na < 130, or acute SBP/HRS-AKI!'
        },
        {
          id: 'med-hep-2',
          name: 'Ibuprofen',
          genericName: 'Ibuprofen',
          dose: '400 mg',
          route: 'Oral',
          frequency: 'Three times daily (TID) [CONTRAINDICATED IN CIRRHOSIS!]',
          startDate: '2026-10-21',
          indication: 'Pain / Fever',
          requiresRenalAdjustment: true,
          notes: 'NSAIDs are strictly contraindicated in cirrhosis — precipitate HRS-AKI and variceal bleeding!'
        },
        {
          id: 'med-hep-3',
          name: 'Ceftriaxone IV',
          genericName: 'Ceftriaxone',
          dose: '2 g',
          route: 'IV Infusion',
          frequency: 'Once daily (q24h) [Add IV Albumin 1.5 g/kg Day 1 & 1 g/kg Day 3!]',
          startDate: '2026-10-21',
          indication: 'Acute Spontaneous Bacterial Peritonitis (SBP)'
        },
        {
          id: 'med-hep-4',
          name: 'Lactulose Syrup',
          genericName: 'Lactulose',
          dose: '30 mL',
          route: 'Oral',
          frequency: 'Three times daily (TID) [Add Rifaximin 550 mg BID]',
          startDate: '2026-10-21',
          indication: 'Hepatic Encephalopathy Grade II'
        }
      ],
      homeMedications: [
        {
          id: 'h-hep-1',
          name: 'Propranolol',
          genericName: 'Propranolol',
          dose: '40 mg',
          route: 'Oral',
          frequency: 'Twice daily (BID)',
          startDate: '2025-01-15',
          indication: 'Esophageal Varices Prophylaxis'
        }
      ]
    },
    discrepancies: [],
    sampleIntervention: {
      id: 'int-test-hep-1',
      patientId: 'pt-test-hep',
      patientName: 'إبراهيم حسن الزهراني (حالة اختبار الكبد SBP/HE)',
      mrn: 'TEST-HEP-04',
      ward: 'InternalMedicine',
      date: '2026-10-21 12:45',
      drpType: 'needs_additional_drug',
      medicationInvolved: 'IV Albumin + Rifaximin (Start) & Ibuprofen + Propranolol (Stop)',
      clinicalIssue: 'مريض تشمع Child-Pugh C مصاب بـ SBP حاد و HE Grade II مع هبوط ضغط (86/52) و AKI (SCr 1.8): لم يُوصف له IV Albumin الوقائي للكلى، ولا يزال يتلقى Ibuprofen و Propranolol.',
      proposedRecommendation: '1. إضافة IV Albumin 20% بجرعة 1.5 g/kg (114 g) في اليوم الأول و 1 g/kg (76 g) في اليوم الثالث بالتزامن مع Ceftriaxone.\n2. إيقاف Ibuprofen نهائياً وإيقاف Propranolol مؤقتاً.\n3. إضافة Rifaximin 550 mg PO BID وتعويض KCl لتصحيح K+ (3.3 mEq/L).',
      rationale: 'إعطاء الألبومين الوريدي في SBP مع Bilirubin > 4 أو SCr > 1 يقلل حدوث HRS-AKI والوفيات من 29% إلى 10% (AASLD / DiPiro 13th Ed).',
      severity: 'high',
      pharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
      physician: 'Dr. ماجد باوزير (Hepatology Consultant)',
      status: 'pending',
      costImpactEstimatedSAR: 3800,
      referenceTitle: "DiPiro's 13th Ed (Ch. 46: Cirrhosis & SBP) & Casebook Guide",
      referenceSourceUrl: 'local://ref/chapter/dipiro-13-cirrhosis-portal-htn',
      evidenceLevel: 'AASLD / ACCP 2026 Class I'
    },
    simulatorPreset: {
      scenarioId: 'cirrhosis_ascites_he',
      patientName: 'Ibrahim H. Al-Zahrani (Hepatology Test Case)',
      age: 66,
      weightKg: 76,
      crcl: 41,
      serumCr: 1.8,
      potassium: 3.3,
      sodium: 128,
      sbp: 86,
      heartRate: 62,
      lvef: 55,
      inr: 2.1,
      childPughClass: 'C',
      hemodynamicProfile: 'warm_wet',
      hasPenicillinAnaphylaxis: false,
      hasAspirinAllergy: false,
      hasActiveBleed: false,
      switchingAceiToArni: false,
      onAmiodarone: false
    }
  }
];

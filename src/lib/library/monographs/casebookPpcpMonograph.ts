import { VerbatimChapter } from '../libraryTypes';

export const casebookPpcpChapter: VerbatimChapter = {
  id: 'casebook-ppcp-bedside',
  bookId: 'clinical-casebook-guide',
  chapterNumber: 1,
  title: 'Clinical Casebook & Bedside Workup Guide: JCPP Pharmacists’ Patient Care Process (PPCP) and Clinical Case-Taking Protocol',
  titleAr: 'دليل أخذ الحالات السريرية والتدريب السريري: منهجية رعاية المرضى (PPCP) وبروتوكول الفحص السريري للصيدلاني والطالب',
  authors: 'Terry L. Schwinghammer, PharmD, FCCP, FASHP, BCPS; Joseph T. DiPiro, PharmD, FCCP; Joint Commission of Pharmacy Practitioners (JCPP)',
  edition: '2026 Clinical Casebook Edition (McGraw Hill / JCPP)',
  pageRange: 'pp. 1–68',
  systemCategory: 'Clinical Methodology & PPCP',
  systemCategoryAr: 'المنهجية السريرية وأخذ الحالات (PPCP)',
  uan: '0217-0000-26-001-L04-P',
  sourceUrl: 'local://ref/chapter/casebook-ppcp-bedside',
  isVerbatimSource: true,
  citation:
    'Schwinghammer TL, DiPiro JT. The Pharmacists’ Patient Care Process and Bedside Case-Taking Manual. In: Pharmacotherapy Casebook: A Patient-Focused Approach. 13th ed. McGraw Hill; 2026:1-68. [local://ref/chapter/casebook-ppcp-bedside]',
  learningObjectives: [
    'Execute the five sequential steps of the JCPP Pharmacists’ Patient Care Process: Collect, Assess, Plan, Implement, and Follow-up/Monitor.',
    'Conduct a comprehensive Best Possible Medication History (BPMH) at bedside, systematically phenotyping drug allergies and identifying non-adherence drivers.',
    'Systematically evaluate all patient drug therapies using the Indication, Effectiveness, Safety, and Compliance (IESC) Drug-Related Problem (DRP) taxonomy.',
    'Formulate concise, legally defensible, evidence-grounded Pharmacotherapy SOAP Notes and conduct SBAR interprofessional bedside rounding presentations.'
  ],
  toc: [
    { id: 'ppcp-sec1', number: '1.0', title: 'The JCPP Pharmacists’ Patient Care Process (PPCP) Core Cycle' },
    { id: 'ppcp-sec2', number: '2.0', title: 'Bedside History of Present Illness (HPI): The OPQRST Framework' },
    { id: 'ppcp-sec3', number: '3.0', title: 'Best Possible Medication History (BPMH) & Allergy Phenotyping' },
    { id: 'ppcp-sec4', number: '4.0', title: 'Organ Function & Pharmacokinetic Workup: Cockcroft-Gault & Clearance' },
    { id: 'ppcp-sec5', number: '5.0', title: 'Drug-Related Problem (DRP) Identification: The IESC Framework' },
    { id: 'ppcp-sec6', number: '6.0', title: 'High-Impact Clinical SOAP Note Architecture & Documentation Rules' },
    { id: 'ppcp-sec7', number: '7.0', title: 'SBAR Interprofessional Bedside Communication & Team Rounding' },
    { id: 'ppcp-sec8', number: '8.0', title: 'OSCE Clinical Casebook Pearls, Student Traps, and Ward Scenarios' }
  ],
  boardPearls: [
    'COLLECT BEFORE ASSESS: A critical failure mode in clinical pharmacy and OSCE examinations is jumping directly to drug recommendations without verifying the completeness of the medication history, allergy phenotype, and renal/hepatic clearance parameters. Information gathering dictates clinical safety.',
    'ALLERGY PHENOTYPING PREVENTS HARMFUL DRUG AVOIDANCE: Over 90% of documented penicillin allergies are inaccurate. Distinguish true Type I IgE anaphylaxis (hives, bronchospasm, angioedema within 1 hour) or severe SCAR (SJS/TEN/DRESS) from mild gastrointestinal upset or childhood rashes to avoid unjustified broad-spectrum antibiotic toxicity.',
    'THE IESC DRP SEQUENCE: Every drug therapy must be systematically audited in order: 1) Indication (is there an indication? Is an untreated indication present?); 2) Effectiveness (is the dose, frequency, and drug selection reaching therapeutic targets?); 3) Safety (are there adverse effects, drug interactions, or contraindications?); 4) Compliance (is the patient able to take, afford, and tolerate the regimen?).',
    'COCKCROFT-GAULT WEIGHT RULES: Always calculate IBW (Ideal Body Weight) first. If actual weight < IBW, use actual weight. If actual weight is 100-120% of IBW, use IBW. If actual weight > 120% of IBW, use Adjusted Body Weight (AdjBW = IBW + 0.4 * [Actual - IBW]).',
    'SBAR ROUNDING COMMUNICATION: Interprofessional recommendations must follow SBAR: Situation (the immediate problem), Background (pertinent clinical history and labs), Assessment (clinical pharmacist’s evidence-based analysis), and Recommendation (exact drug, dose, route, frequency, and monitoring plan).'
  ],
  boardPearlsAr: [
    'الجمع قبل التقييم (Collect Before Assess): أكبر خطأ يقع فيه الطالب أو الصيدلاني هو القفز لتوصيات الأدوية قبل استكمال القصة الدوائية الكاملة (BPMH)، التحقق من نمط الحساسية، وحساب تصفية الأعضاء بدقة.',
    'تحديد نمط الحساسية بدقة (Allergy Phenotyping): أكثر من 90% من حساسيات البنسلين المسجلة غير صحيحة. يجب التمييز بين الحساسية التأقية الحقيقية (Anaphylaxis: شرى، وذمة وعائية، تشنج قصبي) والآثار الجانبية البسيطة لتجنب حرمان المريض من المضادات الفعالة.',
    'تسلسل فحص المشاكل الدوائية (IESC): فحص الأدوية بالترتيب الصارم: 1) دواعي الاستعمال (Indication)؛ 2) الفعالية والجرعة (Effectiveness)؛ 3) المأمونية والتداخلات (Safety)؛ 4) الالتزام والقدرة على أخذ العلاج (Compliance).',
    'قواعد اختيار الوزن في معادلة Cockcroft-Gault: حساب الوزن المثالي (IBW) أولاً. إذا كان الوزن الفعلي أقل من المثالي يُستخدم الفعلي. إذا زاد عن 120% من المثالي يستخدم الوزن المعدل (AdjBW).',
    'التواصل السريري بمنهجية SBAR: تقديم التوصيات الطبية للأطباء وفق: Situation (المشكلة الحالية)، Background (السياق المرضي)، Assessment (التقييم الصيدلاني الموثق)، و Recommendation (التوصية الدقيقة: الدواء، الجرعة، والتوقيت).'
  ],
  keywords: [
    'PPCP',
    'Case-Taking',
    'BPMH',
    'OPQRST',
    'IESC',
    'SOAP Note',
    'SBAR',
    'Allergy Phenotyping',
    'Cockcroft-Gault',
    'Bedside Assessment',
    'DRP'
  ],
  quickTables: [
    {
      title: 'The JCPP Pharmacists’ Patient Care Process (PPCP) Standardized Workflow',
      titleAr: 'دورة رعاية المرضى المعتمدة للصيادلة (JCPP Pharmacists’ Patient Care Process)',
      headers: ['PPCP Step', 'Essential Actions & Data Gathering', 'Key Clinical Deliverables', 'Common Pitfalls to Avoid'],
      headersAr: ['مرحلة PPCP', 'الإجراءات وجمع البيانات الأساسية', 'المخرجات السريرية المعتمدة', 'الأخطاء الشائعة الواجب تجنبها'],
      rows: [
        [
          '1. Collect',
          'Conduct bedside interview; gather OPQRST HPI; construct Best Possible Medication History (BPMH); collect vital signs, laboratory biomarkers, microbiology, and organ clearance indices.',
          'Comprehensive baseline clinical dataset; accurate reconciliation table; verified allergy phenotypes.',
          'Relying solely on outdated electronic health records; failing to ask about OTC medications, herbal remedies, or ocular/topical therapies.'
        ],
        [
          '2. Assess',
          'Evaluate each medical condition and medication systematically using the IESC framework: Indication, Effectiveness, Safety, and Compliance. Prioritize clinical problems by acute risk.',
          'Prioritized Problem List; explicit Drug-Related Problems (DRPs) categorized with severity and rationale.',
          'Focusing exclusively on laboratory abnormalities while ignoring non-adherence, adverse reactions, or missing preventative indications.'
        ],
        [
          '3. Plan',
          'Develop an individualized, evidence-based, patient-centered care plan. Select specific drug, exact dose, route, frequency, and duration. Define clear therapeutic goals and safety parameters.',
          'Structured SOAP Note; collaborative interventions; specific titration and monitoring schedules.',
          'Vague recommendations (e.g., "adjust dose") without specifying milligrams, frequencies, lab triggers, or duration.'
        ],
        [
          '4. Implement',
          'Communicate recommendations to medical team using SBAR format; initiate approved therapies; educate patient and family using the Teach-Back method; coordinate transitions of care.',
          'Executed bedside orders; documented patient counseling; discharge medication reconciliation.',
          'Failing to close the communication loop with the primary physician; assuming orders will be entered without active verification.'
        ],
        [
          '5. Follow-up: Monitor & Evaluate',
          'Continuously track clinical efficacy markers, organ function trends (CrCl, LFTs), therapeutic drug monitoring (AUC, troughs), and medication safety. Modify plan dynamically.',
          'Progress notes; TDM dosage adjustments; safety surveillance logs.',
          'Discharging or leaving the patient unmonitored after initiating high-risk medications (anticoagulants, inotropes, nephrotoxic antimicrobials).'
        ]
      ],
      rowsAr: [
        [
          '1. Collect (جمع البيانات)',
          'المقابلة السريرية عند سرير المريض؛ أخذ القصة OPQRST؛ جمع القصة الدوائية الدقيقة (BPMH)؛ العلامات الحيوية والتحاليل ومزارع الجراثيم وتصفية الأعضاء.',
          'قاعدة بيانات سريرية شاملة؛ جدول مطابقة دوائية دقيق؛ توثيق نمط الحساسية.',
          'الاعتماد فقط على السجلات القديمة وإغفال الأدوية غير الموصوفة (OTC) أو المكملات العشبية.'
        ],
        [
          '2. Assess (التقييم السريري)',
          'تقييم منهجي لكل حالة ودواء عبر إطار IESC: دواعي الاستعمال، الفعالية، المأمونية، والالتزام. ترتيب المشاكل حسب الخطورة.',
          'قائمة مشاكل سريرية مرتبة؛ استخراج المشاكل الدوائية (DRPs) وتصنيفها.',
          'التركيز على شذوذ التحاليل فقط وإغفال عدم التزام المريض أو الآثار الجانبية الخفية.'
        ],
        [
          '3. Plan (وضع الخطة)',
          'صياغة خطة علاجية مخصصة وموجهة بالدلائل. تحديد الدواء والجرعة والطريق والتكرار ومدة العلاج بدقة. وضع أهداف علاجية ومعايير سلامة.',
          'توثيق مذكرة SOAP احترافية؛ تحديد خطة المعايرة والمراقبة الدقيقة.',
          'إعطاء توصيات مبهمة (مثل "عدل الجرعة") دون ذكر الأرقام والمليغرامات ومواعيد التحاليل.'
        ],
        [
          '4. Implement (التنفيذ)',
          'توصيل الخطة للفريق الطبي عبر منهجية SBAR؛ تفعيل التوصيات المعتمدة؛ تثقيف المريض بطريقة Teach-Back وتنسيق الانتقال.',
          'أوامر دوائية مفعلة؛ توثيق تثقيف المريض؛ مطابقة أدوية الخروج.',
          'عدم متابعة إدخال الأوامر مع الطبيب المعالج والافتراض الخاطئ بأن التوصية ستنفذ تلقائياً.'
        ],
        [
          '5. Follow-up (المتابعة والتقييم)',
          'متابعة مؤشرات الفعالية السريرية، وظائف الأعضاء، حركية الأدوية (TDM)، ومراقبة السميات. تعديل الجرعات ديناميكياً.',
          'مذكرات التطور اليومي؛ تعديل جرعات TDM؛ مراقبة السلامة الدوائية.',
          'إهمال متابعة المريض بعد بدء أدوية عالية الخطورة (مضادات التخثر، مقويات القلب، المضادات السمية).'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'ppcp-sec1',
      number: '1.0',
      heading: 'The JCPP Pharmacists’ Patient Care Process (PPCP) Core Cycle',
      headingAr: 'دورة رعاية المرضى المعتمدة للصيادلة (JCPP PPCP Core Cycle)',
      evidenceGrade: 'Joint Commission of Pharmacy Practitioners (JCPP) Standard',
      body: `The Pharmacists' Patient Care Process (PPCP), endorsed by 13 national pharmacy organizations through the Joint Commission of Pharmacy Practitioners (JCPP), establishes a consistent, reproducible, evidence-based standard of care applicable across all inpatient, ambulatory, and critical care settings.

Core Philosophy:
The patient is the central focus of care, surrounded by collaborative, interprofessional teamwork with physicians, nurses, and allied healthcare professionals. The process is continuous and cyclic, comprising five interrelated components:
1. Collect: The pharmacist assures the collection of the necessary subjective and objective information about the patient in order to understand the relevant medical and medication history and clinical status of the patient.
2. Assess: The pharmacist assesses the information collected and analyzes the clinical effects of the patient's therapy in the context of the patient's overall health goals in order to identify and prioritize problems and achieve optimal care.
3. Plan: The pharmacist develops an individualized, patient-centered care plan, in collaboration with other healthcare professionals and the patient or caregiver, that is evidence-based and cost-effective.
4. Implement: The pharmacist implements the care plan in collaboration with other healthcare professionals and the patient or caregiver.
5. Follow-up: Monitor and Evaluate: The pharmacist monitors and evaluates the effectiveness of the care plan and modifies the plan in collaboration with other healthcare professionals and the patient or caregiver as needed.`
    },
    {
      id: 'ppcp-sec2',
      number: '2.0',
      heading: 'Bedside History of Present Illness (HPI): The OPQRST Framework',
      headingAr: 'أخذ القصة المرضية الحالية عند السرير: إطار OPQRST السريري',
      evidenceGrade: 'Bedside Clinical Assessment Methodology',
      body: `When conducting a clinical workup at bedside, eliciting a precise History of Present Illness (HPI) is foundational. Pharmacists and students must employ the mnemonic OPQRST to fully characterize every presenting symptom (e.g., chest pain, dyspnea, abdominal distention, fever):

- O — Onset: Exact time, date, and suddenness of symptom initiation. Did it begin abruptly (suggesting vascular rupture, embolus, or pneumothorax) or insidiously over days to weeks (suggesting progressive heart failure, chronic infection, or malignancy)?
- P — Provocation / Palliation: What makes the symptom worse? What relieves it? Does physical exertion, food intake, deep inspiration, or recumbency exacerbate the pain? Did sublingual nitroglycerin, antacids, or rest alleviate the discomfort?
- Q — Quality: Exact qualitative description in the patient's own words. Is the pain sharp, stabbing, burning, crushing, heavy, aching, or throbbing?
- R — Region / Radiation: Precise anatomical localization and trajectory of spread. Does the chest discomfort radiate to the left arm, neck, jaw, interscapular region, or epigastrium?
- S — Severity: Quantitative assessment utilizing an objective 0 to 10 visual analog scale (0 = no pain, 10 = worst imaginable pain). How does it interfere with activities of daily living?
- T — Temporal Pattern: Chronological behavior over time. Is the symptom constant, intermittent, waxing and waning, or nocturnal (paroxysmal nocturnal dyspnea)?`
    },
    {
      id: 'ppcp-sec3',
      number: '3.0',
      heading: 'Best Possible Medication History (BPMH) & Allergy Phenotyping',
      headingAr: 'القصة الدوائية الدقيقة (BPMH) وتحديد النمط المناعي للحساسية',
      evidenceGrade: 'High 5s WHO Patient Safety Standard',
      body: `BEST POSSIBLE MEDICATION HISTORY (BPMH):
A BPMH is a comprehensive interview conducted by a pharmacist utilizing at least two independent sources of information (e.g., bedside patient/caregiver interview, pharmacy dispensing records, pill bottles, outpatient clinic notes) to verify:
1. Exact drug name (generic and brand);
2. Exact dose (milligrams, micrograms, units);
3. Route of administration (oral, inhaled, subcutaneous, transdermal);
4. Actual frequency and schedule taken;
5. Non-prescription drugs: Over-the-counter (OTC) analgesics, NSAIDs, decongestants;
6. Dietary, herbal, and homeopathic supplements;
7. Patient-specific adherence patterns: missed doses, pill-splitting, affordability challenges.

ALLERGY PHENOTYPING:
Documenting "Allergy: Penicillin" without details causes severe patient harm through forced avoidance of first-line beta-lactams and reliance on more toxic, expensive, or less effective second-line alternatives.
- The 4 Questions for Verified Allergy Phenotyping:
  1. What exact drug was taken?
  2. How long after drug exposure did the reaction occur? (Immediate <= 1 hour indicates IgE-mediated type I hypersensitivity; delayed > 48 hours indicates T-cell mediated reactions).
  3. What were the exact physical symptoms? (Urticaria/hives, angioedema of lips/tongue, wheezing, hypotension vs nausea, headache, mild childhood rash).
  4. Was medical intervention required (epinephrine, hospitalization)? Did the patient ever tolerate a similar drug afterward?
- True IgE-Mediated Type I vs Adverse Effect:
  * True Type I: Anaphylaxis, stridor, bronchospasm, diffuse hives, hemodynamic collapse.
  * Severe Cutaneous Adverse Reactions (SCAR): Stevens-Johnson Syndrome (SJS), Toxic Epidermal Necrolysis (TEN), DRESS syndrome (Strictly contraindicates ANY rechallenge).
  * Drug Intolerance: Nausea from codeine, diarrhea from amoxicillin/clavulanate, cough from lisinopril (These are NOT allergies and should never be documented as such).`
    },
    {
      id: 'ppcp-sec4',
      number: '4.0',
      heading: 'Organ Function & Pharmacokinetic Workup: Cockcroft-Gault & Clearance',
      headingAr: 'تقييم وظائف الأعضاء والحركية الدوائية: معادلة Cockcroft-Gault والتصفية',
      evidenceGrade: 'FDA Guidance on Renal Dosing & Pharmacokinetics',
      body: `Accurate determination of organ clearance is essential before initiating or modifying narrow therapeutic index drugs (aminoglycosides, vancomycin, digoxin, DOACs, low molecular weight heparins).

RENAL FUNCTION ESTIMATION (THE COCKCROFT-GAULT EQUATION):
Despite the clinical prevalence of eGFR reported by hospital laboratories (CKD-EPI or MDRD formulas), the United States FDA and pharmaceutical manufacturers universally utilize the Cockcroft-Gault CrCl equation for drug labeling and dosing adjustments:

CrCl (mL/min) = [(140 - Age) * Weight in kg] / (72 * Serum Creatinine in mg/dL) [* 0.85 if Female]

Weight Selection Rules (CRITICAL FOR DOSING ACCURACY):
1. Calculate Ideal Body Weight (IBW) first:
   - IBW (Men) = 50 kg + 2.3 kg for each inch over 5 feet (60 inches).
   - IBW (Women) = 45.5 kg + 2.3 kg for each inch over 5 feet (60 inches).
2. Weight Application Hierarchy:
   - If Actual Body Weight (ABW) < IBW: Use Actual Body Weight (ABW).
   - If ABW is between 100% and 120% of IBW: Use IBW.
   - If ABW > 120% of IBW (Obesity): Calculate and use Adjusted Body Weight (AdjBW):
     AdjBW = IBW + 0.40 * (ABW - IBW).
   * Pearl: In elderly, cachectic, or bedridden patients with low muscle mass, a serum creatinine of < 0.6-0.7 mg/dL reflects muscle wasting rather than superior renal filtration. Rounding serum creatinine up to 0.8 or 1.0 mg/dL may prevent dangerous over-dosing of toxic renally cleared medications.`
    },
    {
      id: 'ppcp-sec5',
      number: '5.0',
      heading: 'Drug-Related Problem (DRP) Identification: The IESC Framework',
      headingAr: 'منهجية كشف وتصنيف المشاكل الدوائية: إطار IESC السريري',
      evidenceGrade: 'Clinical Pharmacotherapy Taxonomy Standard',
      body: `A Drug-Related Problem (DRP) is an undesirable event experienced by a patient that involves, or is suspected to involve, drug therapy, and that actually or potentially interferes with desired health outcomes. 

Every patient medication profile must be systematically audited across four sequential dimensions (IESC):

1. Indication (دواعي الاستعمال):
   - Unnecessary Drug Therapy: Patient is taking a medication without an active indication, duplicate therapy, or treating an avoidable adverse effect of another drug ("prescribing cascade").
   - Needs Additional Drug Therapy: Patient has an untreated clinical condition or lacks recommended guideline-directed primary or secondary preventative therapy (e.g., patient with HFrEF not receiving an MRA or SGLT2i).

2. Effectiveness (الفعالية السريرية):
   - Ineffective Drug Selection: Medication is not the most effective agent for the disorder based on clinical guidelines or microbiological susceptibilities (e.g., prescribing ampicillin for Klebsiella).
   - Subtherapeutic Dosage: Dose is too low, dosing frequency is inadequate, or duration of therapy is too brief to achieve the target clinical goal.

3. Safety (المأمونية والسميات):
   - Adverse Drug Reaction (ADR): Patient is experiencing an undesirable clinical reaction or allergic manifestation attributable to a medication.
   - Supratherapeutic Dosage: Dose is too high, frequency is too compressed, or drug clearance is impaired (renal or hepatic failure), producing toxic drug concentrations.
   - Clinically Significant Drug-Drug Interaction: Concomitant administration alters pharmacokinetics or pharmacodynamics (e.g., Amiodarone doubling Apixaban or Digoxin levels; ACEi plus ARNI causing fatal angioedema).

4. Compliance / Adherence (الالتزام الدوائي):
   - Patient is not receiving or taking the medication correctly due to economic barriers, complex administration schedules, confusing labeling, intolerable minor side effects, or physical inability to administer (e.g., poor inhaler technique).`
    },
    {
      id: 'ppcp-sec6',
      number: '6.0',
      heading: 'High-Impact Clinical SOAP Note Architecture & Documentation Rules',
      headingAr: 'هيكلية مذكرة SOAP السريرية وقواعد التوثيق الطبي الاحترافي',
      evidenceGrade: 'Joint Commission Healthcare Documentation Standard',
      body: `The SOAP note is the universal legal and clinical communication standard in inpatient and outpatient medical charts. Pharmacotherapy documentation must be structured as follows:

S — Subjective:
- Information communicated directly by the patient, family, or caregiver.
- Chief Complaint (CC) in the patient's own words.
- Detailed OPQRST History of Present Illness (HPI).
- Review of Systems (ROS) positive and negative findings.
- Patient-reported medication adherence, allergy symptoms, and side effects.

O — Objective:
- Measurable, reproducible physical and laboratory observations.
- Vital Signs: BP, HR, RR, Temperature, SpO2, daily weight, fluid balance (intake/output).
- Physical Examination findings: pulmonary rales, JVD, S3/S4 gallop, peripheral edema, asterixis.
- Laboratory Data: Complete Blood Count, Basic Metabolic Panel (electrolytes, BUN, Cr), LFTs, cardiac biomarkers (troponin, BNP), arterial blood gases (ABG).
- Diagnostic Imaging: Chest X-ray, 12-lead ECG, echocardiogram, CT/MRI scans.
- Current Inpatient Medication Administration Record (MAR).

A — Assessment:
- The clinical pharmacist's critical analytical synthesis. Organized by individual medical problem in order of clinical priority.
- Problem Statement: Etiology, current level of control (e.g., "Acute Decompensated Heart Failure, Warm & Wet subset, NYHA Class IV, precipitated by dietary sodium indiscretion").
- Therapy Evaluation: Comprehensive audit of current drug therapy utilizing IESC criteria.
- Target Goals: Specific clinical and surrogate goals (e.g., "Achieve euvolemia, weight reduction of 1 kg/day, normalize BNP, maintain serum K between 4.0-5.0 mEq/L and CrCl stable").

P — Plan:
- Actionable, precise therapeutic recommendations:
  1. Drug Therapy Changes: Exact generic name, dose, dosage form, route, frequency, and duration (e.g., "Initiate Furosemide 80 mg IV bolus BID; discontinue oral Furosemide").
  2. Monitoring Parameters: Efficacy endpoints (daily morning weights, strict I/O, symptom relief) and Safety endpoints (serum potassium, creatinine, orthostatic blood pressure checked daily).
  3. Patient Education: Counseling topics discussed with patient or caregiver.`
    },
    {
      id: 'ppcp-sec7',
      number: '7.0',
      heading: 'SBAR Interprofessional Bedside Communication & Team Rounding',
      headingAr: 'التواصل السريري بين التخصصات بمنهجية SBAR وأثناء المرور الصباحي',
      evidenceGrade: 'Institute for Healthcare Improvement (IHI) Standard',
      body: `Clear, unambiguous communication during multidisciplinary morning rounds is essential to prevent medical errors. The SBAR framework provides a standardized communication structure:

- S — Situation:
  "Hello Dr. Smith, this is Omar, the clinical pharmacy specialist in the ICU. I am calling regarding patient Abdullah in bed 12. He is experiencing an acute worsening of renal function and hyperkalemia while receiving Lisinopril and Spironolactone."

- B — Background:
  "He is a 68-year-old male admitted 48 hours ago for acute decompensated heart failure and pneumonia. His baseline creatinine was 1.1 mg/dL. Over the last 24 hours, his creatinine increased to 2.4 mg/dL and his serum potassium rose from 4.4 to 5.6 mEq/L with urine output dropping to 20 mL/hr."

- A — Assessment:
  "My assessment is KDIGO Stage 2 Acute Kidney Injury, likely prerenal azotemia exacerbated by aggressive diuresis paired with RAAS blockade. He now has moderate hyperkalemia without acute ECG changes. Continuing Spironolactone and Lisinopril poses immediate life-threatening arrhythmogenic risk."

- R — Recommendation:
  "I recommend:
   1. Immediately hold Lisinopril and Spironolactone;
   2. Administer Regular Insulin 10 units IV with 50 mL of 50% Dextrose over 5 minutes to shift potassium intracellularly;
   3. Initiate Sodium Zirconium Cyclosilicate (Lokelma) 10 g PO TID;
   4. Recheck Basic Metabolic Panel in 2 hours and obtain an immediate 12-lead ECG."`
    },
    {
      id: 'ppcp-sec8',
      number: '8.0',
      heading: 'OSCE Clinical Casebook Pearls, Student Traps, and Ward Scenarios',
      headingAr: 'لآلئ حالات البورد وكتب الحالات والامتحانات السريرية (OSCE)',
      evidenceGrade: 'Clinical Education & Board Examination Traps',
      body: `1. The "Silent" Hyperkalemia Trap:
   - A normal 12-lead ECG does NOT rule out dangerous hyperkalemia. Severe hyperkalemia (K > 6.5 mEq/L) can degenerate directly into ventricular fibrillation without proceeding through the classic stepwise peaked T-wave progression. If K+ >= 6.0 mEq/L, always initiate shifting therapies promptly.

2. The Antibiotic "Dose Adjustment in Sepsis" Error:
   - In the first 24 to 48 hours of septic shock, critically ill patients experience a massive expansion of extracellular volume of distribution (Vd) and augmented renal clearance (ARC). Never reduce the initial loading dose of hydrophilic antimicrobials (Vancomycin, beta-lactams, aminoglycosides) based on renal failure! Full weight-based loading doses are mandatory to achieve therapeutic peak concentrations; renal dose reductions are applied ONLY to subsequent maintenance intervals.

3. The Insulin-Potassium Oversight:
   - When preparing an order for intravenous regular insulin in diabetic ketoacidosis or hyperkalemia, ALWAYS verify that the patient's serum potassium is documented. If potassium is not checked, ordering insulin is a critical medical error.`
    }
  ]
};

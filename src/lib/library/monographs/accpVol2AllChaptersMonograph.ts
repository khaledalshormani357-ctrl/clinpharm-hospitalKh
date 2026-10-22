import { VerbatimChapter } from '../libraryTypes';

export const accpVol2AdditionalChapters: VerbatimChapter[] = [
  {
    id: 'accp-2026-v2-c1',
    bookId: 'accp-2026-vol2',
    chapterNumber: 11,
    title: 'Chapter 11: Health Care Systems, Medication Safety, ISMP High-Alert Medications & Formulary Management',
    titleAr: 'الفصل 11 (مجلد 2 - ص 2-1): الأنظمة الصحية، سلامة الأدوية، قوائم ISMP للأدوية عالية الخطورة، وإدارة دساتير الأدوية',
    authors: 'ACCP Medication Safety & Systems Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-1 to 2-52',
    systemCategory: 'Hospital Dosing & IV Protocols',
    systemCategoryAr: 'سلامة الأدوية والأنظمة الصحية',
    uan: '0217-0000-26-060-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c1',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 11: Health Care Systems & Medication Safety; pp. 2-1 to 2-52.',
    isVerbatimSource: true,
    learningObjectives: [
      'Apply the Institute for Safe Medication Practices (ISMP) Hierarchy of Effectiveness for error-prevention strategies.',
      'Implement hospital-wide safety guardrails for ISMP High-Alert Medications (concentrated electrolytes, insulin, heparin, opioids, neuromuscular blockers, and oral Methotrexate).',
      'Distinguish Root Cause Analysis (RCA — reactive retrospective) from Failure Mode and Effects Analysis (FMEA — proactive prospective).'
    ],
    toc: [
      { id: 'v2c1-s1', number: '11.1', title: 'ISMP Hierarchy of Error-Reduction Strategies & High-Alert Medication Guardrails' },
      { id: 'v2c1-s2', number: '11.2', title: 'Root Cause Analysis (RCA) vs Failure Mode and Effects Analysis (FMEA)' }
    ],
    sections: [
      {
        id: 'v2c1-s1',
        number: '11.1',
        heading: 'ISMP Hierarchy of Error-Reduction Strategies & High-Alert Medication Guardrails',
        headingAr: 'هرم ISMP لفعالية استراتيجيات منع الأخطاء وضوابط الأدوية عالية الخطورة',
        evidenceGrade: 'ISMP / The Joint Commission Standard',
        body: `1. ISMP Hierarchy of Effectiveness (Ranked from MOST Effective [System-Based] to LEAST Effective [Human-Reliant]):
• Rank 1 (Most Effective — High Leverage): Forcing Functions and Fail-Safes (e.g., removing concentrated KCl vials from all inpatient nursing units; physical Luer-lock incompatibility preventing enteral syringes from connecting to IV lines; CPOE hard stops blocking daily oral Methotrexate orders for non-oncologic indications).
• Rank 2: Automation and Computerization (e.g., Barcode Medication Administration [BCMA], Smart Infusion Pumps with Dose Error Reduction Systems [DERS] and hard limits).
• Rank 3: Standardization and Protocols (e.g., hospital-wide standardized IV concentration mixtures, weight-based heparin nomograms).
• Rank 4: Independent Double-Checks and Redundancies.
• Rank 5: Warnings, Alerts, Tall Man Lettering (e.g., hydrALAZINE vs hydrOXYzine; DOBUtamine vs DOPamine).
• Rank 6 (Least Effective — Low Leverage): Education, Rules, Policies, and "Be More Careful" reminders.

2. Specific ISMP Targeted Medication Safety Best Practices for Hospitals:
• Vinca Alkaloids (Vincristine, Vinblastine): MUST be diluted and dispensed in a minibag (25–50 mL NS/D5W) — NEVER dispense in a syringe (fatal if inadvertently administered intrathecally).
• Oral Methotrexate (Non-Oncologic): Default CPOE to WEEKLY dosing only; require a mandatory hard-stop clinical indication verification; never prescribe Folic Acid on the same day if institutional protocol separates them, and educate patients explicitly against daily dosing.
• Concentrated IV Potassium Chloride / Phosphate / 23.4% NaCl: Completely remove concentrated vials from patient care units; dispense only premixed diluted IV bags from central pharmacy.`
      },
      {
        id: 'v2c1-s2',
        number: '11.2',
        heading: 'Root Cause Analysis (RCA) vs Failure Mode and Effects Analysis (FMEA)',
        headingAr: 'تحليل السبب الجذري (RCA) مقابل تحليل أنماط وآثار الإخفاق الاستباقي (FMEA)',
        evidenceGrade: 'TJC Patient Safety Mandate',
        body: `• Root Cause Analysis (RCA): A REACTIVE, retrospective investigation conducted AFTER a sentinel event or serious near-miss occurs to identify latent system vulnerabilities (using fishbone/Ishikawa diagrams and the "5 Whys") rather than blaming individual clinicians.
• Failure Mode and Effects Analysis (FMEA): A PROACTIVE, prospective risk-assessment methodology performed BEFORE implementing a new high-risk drug, technology, or workflow. Calculates a Risk Priority Number (RPN = Severity × Occurrence Probability × Detectability) to redesign the process before any patient is harmed.`
      }
    ],
    quickTables: [
      {
        title: 'ISMP Targeted Medication Safety Best Practices Matrix',
        titleAr: 'جدول الممارسات الإلزامية لمعهد ISMP لمنع الأخطاء الدوائية القاتلة',
        headers: ['High-Alert Medication', 'Catastrophic Error Risk', 'Mandatory System Forcing Function'],
        rows: [
          ['Vincristine (Vinca alkaloids)', 'Fatal ascending myeloencephalopathy if given intrathecally', 'Dispense ONLY in a 25–50 mL IV minibag (NEVER in a syringe)'],
          ['Oral Methotrexate (RA/Psoriasis)', 'Fatal pancytopenia & mucositis from mistaken daily dosing', 'CPOE weekly default + hard-stop oncologic verification'],
          ['Concentrated KCl (2 mEq/mL)', 'Immediate hyperkalemic cardiac arrest if given IV push', 'Remove all vials from nursing units; stock premixed bags only'],
          ['Neuromuscular Blockers (Rocuronium)', 'Respiratory arrest in unventilated patients (LASA error)', 'Segregated auxiliary warning storage; never store in general floor Pyxis'],
          ['Tranexamic Acid (TXA) vs Bupivacaine', 'Accidental intrathecal TXA injection during spinal anesthesia', 'Store TXA outside OB/OR anesthesia trays; use premixed IV bags']
        ]
      }
    ],
    boardPearls: [
      'Forcing functions and physical barriers sit at the top (most effective) of the ISMP Hierarchy of Effectiveness, whereas staff education and policies sit at the very bottom (least effective).',
      'Vincristine must always be dispensed in a 25–50 mL minibag, never a syringe, to physically prevent accidental fatal intrathecal administration.',
      'FMEA is prospective (before an error occurs), whereas RCA is retrospective (after a sentinel event occurs).'
    ],
    boardPearlsAr: [
      'الضوابط الإجبارية والفيزيائية (Forcing Functions) هي الأعلى فعالية في هرم ISMP، بينما يقع التعليم والتنبيهات الشفهية في المرتبة الأضعف.',
      'يُحضر دواء Vincristine دائماً في كيس وريدي صغير (Minibag) ويُمنع وضعه في محقنة (Syringe) لمنع حقنه بالخطأ داخل القراب الشوكي.',
      'تحليل FMEA هو إجراء استباقي قبل وقوع الخطأ، بينما تحليل RCA هو إجراء رجعي بعد وقوع الحادثة.'
    ],
    keywords: ['ismp', 'medication safety', 'high-alert', 'vincristine', 'methotrexate', 'rca', 'fmea', 'forcing function']
  },
  {
    id: 'accp-2026-v2-c2',
    bookId: 'accp-2026-vol2',
    chapterNumber: 12,
    title: 'Chapter 12: Oncology Supportive Care (CINV Antiemetics, Tumor Lysis Syndrome & Febrile Neutropenia)',
    titleAr: 'الفصل 12 (مجلد 2 - ص 2-53): الرعاية الداعمة في الأورام (مضادات الإقياء الكيماوي، متلازمة انحلال الورم، وحمى قلة العدلات)',
    authors: 'ACCP Oncology Supportive Care Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-53 to 2-112',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'الأورام والرعاية التلطيفية والداعمة',
    uan: '0217-0000-26-060-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c2',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 12: Oncology Supportive Care; pp. 2-53 to 2-112.',
    isVerbatimSource: true,
    learningObjectives: [
      'Prescribe NCCN/ASCO 4-drug antiemetic prophylaxis (NK1-RA + 5-HT3-RA + Dexamethasone + Olanzapine) for Highly Emetogenic Chemotherapy (HEC).',
      'Prevent and treat Tumor Lysis Syndrome (TLS) using aggressive hydration, Allopurinol, Febuxostat, and Rasburicase.',
      'Apply ASCO/NCCN primary G-CSF (Filgrastim/Pegfilgrastim) prophylaxis thresholds (>=20% febrile neutropenia risk).'
    ],
    toc: [
      { id: 'v2c2-s1', number: '12.1', title: 'Chemotherapy-Induced Nausea and Vomiting (CINV) 4-Drug HEC Prophylaxis' },
      { id: 'v2c2-s2', number: '12.2', title: 'Tumor Lysis Syndrome (TLS) Electrolyte Triad & Rasburicase G6PD Contraindication' },
      { id: 'v2c2-s3', number: '12.3', title: 'Myeloid Growth Factors (G-CSF Timing) & Specific Chemotherapy Antidotes' }
    ],
    sections: [
      {
        id: 'v2c2-s1',
        number: '12.1',
        heading: 'Chemotherapy-Induced Nausea and Vomiting (CINV) 4-Drug HEC Prophylaxis',
        headingAr: 'الوقاية الرباعية من الغثيان والإقياء المحدث بالكيماوي عالي الإقياء (HEC)',
        evidenceGrade: 'ASCO / NCCN Category 1',
        body: `1. Highly Emetogenic Chemotherapy (HEC — >90% emesis risk without prophylaxis; e.g., Cisplatin, Carboplatin AUC >=4, Anthracycline + Cyclophosphamide [AC], Dacarbazine):
Requires a 4-Drug Prophylactic Regimen initiated prior to chemotherapy on Day 1:
• Neurokinin-1 Receptor Antagonist (NK1-RA): Aprepitant, Fosaprepitant IV, Rolapitant, or Netupitant (Note: Aprepitant/Fosaprepitant moderately inhibit CYP3A4 — reduce Day 1–4 oral Dexamethasone dose from 20 mg to 12 mg on Day 1 and 8 mg on Days 2–4! Rolapitant does NOT inhibit CYP3A4).
• 5-HT3 Receptor Antagonist: Ondansetron (8–16 mg PO or max single IV dose 16 mg due to QTc prolongation), Granisetron, or Palonosetron (0.25 mg IV; longest half-life ~40 hours).
• Corticosteroid: Dexamethasone 12 mg PO/IV on Day 1, followed by 8 mg PO daily on Days 2–4.
• Olanzapine: 5 to 10 mg PO once daily on Days 1 to 4 (blocks multiple dopamine D2, serotonin 5-HT2c/5-HT3, histamine H1, and muscarinic receptors; use 5 mg in older adults to minimize sedation).

2. Moderately Emetogenic Chemotherapy (MEC — 30–90% emesis risk; e.g., Irinotecan, Oxaliplatin, Cyclophosphamide <=1500 mg/m²):
• 2-Drug Regimen: 5-HT3 Receptor Antagonist + Dexamethasone on Day 1 (add NK1-RA for Carboplatin AUC >=4).`
      },
      {
        id: 'v2c2-s2',
        number: '12.2',
        heading: 'Tumor Lysis Syndrome (TLS) Electrolyte Triad & Rasburicase G6PD Contraindication',
        headingAr: 'متلازمة انحلال الورم (TLS): الشوارد الأربع، الألوبيورينول، وموانع Rasburicase',
        evidenceGrade: 'NCCN / ASCO Supportive Care Standard',
        body: `Rapid lysis of malignant cells releases massive intracellular quantities of Potassium, Phosphorus, and Nucleic Acids (catabolized via xanthine oxidase to Uric Acid), resulting in the Cairo-Bishop laboratory quartet:
1. Hyperuricemia (Uric acid >=8 mg/dL — precipitates acute uric acid nephropathy)
2. Hyperkalemia (K+ >=6.0 mEq/L — life-threatening ventricular arrhythmias)
3. Hyperphosphatemia (Phosphorus >=4.5 mg/dL — binds extracellular Ca2+ to form calcium-phosphate renal precipitates)
4. Secondary Hypocalcemia (Corrected Ca2+ <=7.0 mg/dL — do NOT administer IV Calcium Gluconate unless the patient has symptomatic tetany/arrhythmias, because IV calcium accelerates metastatic calcium-phosphate tissue precipitation!).

Prevention & Treatment of TLS Hyperuricemia:
• Aggressive IV Crystalloid Hydration (2–3 L/m²/day to maintain urine output >=2 mL/kg/h; urinary alkalinization with sodium bicarbonate is NO LONGER recommended because alkaline urine promotes calcium-phosphate precipitation and xanthine stones).
• Allopurinol (Xanthine Oxidase Inhibitor): Prevents NEW uric acid formation but does NOT degrade pre-existing uric acid; requires renal dose adjustment and a 67–75% dose reduction of concomitant oral 6-Mercaptopurine (6-MP) or Azathioprine!
• Rasburicase (Recombinant Urate Oxidase; 3–6 mg or 0.2 mg/kg IV × 1 dose): Rapidly converts existing insoluble uric acid into water-soluble allantoin within 4 hours.
  - Absolute Contraindications to Rasburicase (FDA Boxed Warning): G6PD Deficiency (produces hydrogen peroxide as a byproduct, causing severe hemolysis and methemoglobinemia) and Pregnancy. Blood samples drawn for uric acid after Rasburicase MUST be placed immediately on ice to prevent ex-vivo enzymatic degradation and falsely low lab readings.`
      },
      {
        id: 'v2c2-s3',
        number: '12.3',
        heading: 'Myeloid Growth Factors (G-CSF Timing) & Specific Chemotherapy Antidotes',
        headingAr: 'عوامل تحفيز الكريات البيض (G-CSF) والترياق النوعي لسميات العلاج الكيماوي',
        evidenceGrade: 'ASCO / NCCN Guideline',
        body: `• Primary G-CSF Prophylaxis (Filgrastim 5 mcg/kg/day SC or Pegfilgrastim 6 mg SC × 1): Indicated when chemotherapy regimen carries >=20% risk of Febrile Neutropenia. Administer 24 to 72 hours AFTER completion of cytotoxic chemotherapy (never within 24 hours before or after chemotherapy, as cycling myeloid progenitors are destroyed by chemotherapy).
• Classic Chemotherapy Organ Toxicities & Antidotes:
  - Doxorubicin / Daunorubicin (Anthracycline Cardiotoxicity — lifetime cumulative Doxorubicin ceiling 450–550 mg/m²): Prevented/mitigated by Dexrazoxane (iron chelator).
  - Cyclophosphamide / Ifosfamide (Hemorrhagic Cystitis caused by Acrolein metabolite): Prevented by Mesna + vigorous IV hydration.
  - High-Dose Methotrexate: Leucovorin (Folinic acid) rescue + urinary alkalinization (urine pH >=7.0 with IV NaHCO3); Glucarpidase (Voraxaze) if AKI and MTX >1–10 micromol/L.
  - Irinotecan Early vs Late Diarrhea: Early (<24h, cholinergic surge) -> Atropine IV/SC; Late (>24h, SN-38 mucosal toxicity) -> High-dose Loperamide.`
      }
    ],
    quickTables: [
      {
        title: 'Signature Chemotherapy Toxicities & Specific Pharmacologic Antidotes',
        titleAr: 'جدول السميات المميزة للأدوية الكيماوية والترياق النوعي المعتمد',
        headers: ['Chemotherapy Agent', 'Dose-Limiting / Signature Toxicity', 'Specific Antidote / Cytoprotectant', 'Mechanism of Protection'],
        rows: [
          ['Doxorubicin (Anthracyclines)', 'Dilated cardiomyopathy (lifetime max 450–550 mg/m²)', 'Dexrazoxane', 'Chelates intracellular iron to block free-radical myocardial injury'],
          ['Ifosfamide / Cyclophosphamide', 'Hemorrhagic cystitis (via Acrolein metabolite)', 'Mesna + IV Hydration', 'Sulfhydryl group binds and detoxifies acrolein in the bladder'],
          ['High-Dose Methotrexate', 'Nephrotoxicity, mucositis, myelosuppression', 'Leucovorin + IV NaHCO3 + Glucarpidase', 'Bypasses DHFR blockade; Glucarpidase cleaves MTX in AKI'],
          ['Irinotecan', 'Early (<24h) vs Late (>24h) secretory diarrhea', 'Early: Atropine | Late: Loperamide', 'Blocks acute cholinergic surge vs slows GI transit'],
          ['5-Fluorouracil / Capecitabine', 'Severe life-threatening toxicity (DPD deficiency)', 'Uridine Triacetate (Vistogard)', 'Competitive uridine nucleotide rescue within 96 hours']
        ]
      }
    ],
    boardPearls: [
      'Rasburicase is strictly contraindicated in G6PD deficiency due to hydrogen-peroxide-induced hemolytic anemia and methemoglobinemia; chill uric acid blood tubes on ice immediately after drawing.',
      'Maximum single intravenous dose of Ondansetron is 16 mg (32 mg IV single dose was withdrawn by the FDA due to dose-dependent QTc prolongation and Torsades de Pointes).',
      'Reduce oral 6-Mercaptopurine (6-MP) and Azathioprine doses by 67% to 75% when co-administered with Allopurinol or Febuxostat to prevent fatal pancytopenia.'
    ],
    boardPearlsAr: [
      'يُمنع استخدام Rasburicase قطعياً في مرضى نقص إنزيم G6PD لخطر انحلال الدم والميتهيموغلوبينية، ويجب وضع عينة الدم في الثلج فوراً.',
      'الحد الأقصى للجرعة الوريدية الواحدة من Ondansetron هو 16 ملغ لمنع استطالة QTc.',
      'يجب خفض جرعة Azathioprine أو 6-MP بنسبة 67-75% عند إعطائها مع Allopurinol لمنع تثبيط نقي العظم القاتل.'
    ],
    keywords: ['oncology', 'cinv', 'olanzapine', 'aprepitant', 'ondansetron', 'tumor lysis syndrome', 'rasburicase', 'allopurinol', 'g-csf', 'mesna']
  },
  {
    id: 'accp-2026-v2-c3',
    bookId: 'accp-2026-vol2',
    chapterNumber: 13,
    title: 'Chapter 13: Drug Information, Evidence-Based Medicine, Noninferiority Trials & Pharmacoeconomics',
    titleAr: 'الفصل 13 (مجلد 2 - ص 2-113): المعلومات الدوائية، الطب المبني على البراهين، دراسات عدم الدونية، والاقتصاد الدوائي',
    authors: 'ACCP Drug Information & Literature Evaluation Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-113 to 2-154',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'تقييم الأدلة السريرية والاقتصاد الدوائي',
    uan: '0217-0000-26-060-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c3',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 13: Drug Information & Pharmacoeconomics; pp. 2-113 to 2-154.',
    isVerbatimSource: true,
    learningObjectives: [
      'Distinguish Intention-to-Treat (ITT) from Per-Protocol (PP) analysis across Superiority versus Noninferiority randomized clinical trials.',
      'Classify pharmacoeconomic evaluations (Cost-Minimization, Cost-Benefit, Cost-Effectiveness, Cost-Utility) and calculate the Incremental Cost-Effectiveness Ratio (ICER).',
      'Evaluate FDA Orange Book (AB-rated bioequivalence) vs Purple Book (biosimilars and interchangeable biologics).'
    ],
    toc: [
      { id: 'v2c3-s1', number: '13.1', title: 'Superiority vs Noninferiority Trial Analysis (ITT vs Per-Protocol) & Systematic Reviews' },
      { id: 'v2c3-s2', number: '13.2', title: 'Pharmacoeconomic Models (CMA, CBA, CEA, CUA) & ICER Calculation' }
    ],
    sections: [
      {
        id: 'v2c3-s1',
        number: '13.1',
        heading: 'Superiority vs Noninferiority Trial Analysis (ITT vs Per-Protocol) & Systematic Reviews',
        headingAr: 'تحليل دراسات التفوق مقابل عدم الدونية (ITT مقابل Per-Protocol)',
        evidenceGrade: 'CONSORT / EBM Standard',
        body: `1. Intention-to-Treat (ITT) vs Per-Protocol (PP) Analysis:
• Intention-to-Treat (ITT): Analyzes every randomized participant in the group to which they were originally assigned, regardless of nonadherence, protocol deviations, or dropout.
  - In a Superiority Trial, ITT is the conservative gold standard because protocol nonadherence dilutes the treatment difference toward the null hypothesis (making it harder to falsely claim superiority — protects against Type I error).
• Per-Protocol (PP / As-Treated): Analyzes only participants who strictly completed the study protocol.
  - In a Noninferiority or Equivalence Trial, poor adherence in an ITT analysis artificially makes two treatments look similar (biasing toward noninferiority!). Therefore, to confirm true Noninferiority, BOTH Per-Protocol and Intention-to-Treat analyses should demonstrate that the 95% confidence interval does not cross the predefined noninferiority margin (Delta).

2. Systematic Reviews & Meta-Analysis Heterogeneity:
• Heterogeneity across pooled studies is tested using Cochran's Q test (p <0.10 indicates significant heterogeneity) and the I² statistic (I² <25% = low heterogeneity [use Fixed-Effects model]; I² >50% = substantial heterogeneity [use Random-Effects model]).
• Publication Bias is assessed visually via a Funnel Plot (symmetric inverted funnel indicates absence of publication bias; asymmetry indicates small negative studies are missing).`
      },
      {
        id: 'v2c3-s2',
        number: '13.2',
        heading: 'Pharmacoeconomic Models (CMA, CBA, CEA, CUA) & ICER Calculation',
        headingAr: 'نماذج الاقتصاد الدوائي الأربعة وحساب نسبة الفعالية التزايدية للتكلفة (ICER)',
        evidenceGrade: 'ISPOR Pharmacoeconomic Standard',
        body: `Four Core Pharmacoeconomic Methodologies (Distinguished by How Clinical Outcomes Are Measured):
1. Cost-Minimization Analysis (CMA): Costs in Dollars ($); Outcomes assumed to be clinically EQUIVALENT (e.g., generic vs brand AB-rated drug, or two regimens with identical cure rates). Selects the least expensive option.
2. Cost-Benefit Analysis (CBA): Costs in Dollars ($); Outcomes measured in Monetary Dollars ($). Allows comparison of completely different health programs (e.g., an anticoagulation clinic vs an asthma clinic). Net Benefit = Benefits ($) − Costs ($); Benefit-to-Cost Ratio >1.0 is favorable.
3. Cost-Effectiveness Analysis (CEA): Costs in Dollars ($); Outcomes measured in Natural Clinical Units (e.g., mmHg BP reduction, life-years gained, symptom-free days, cures).
   - Incremental Cost-Effectiveness Ratio (ICER) = (Cost_Drug_A − Cost_Drug_B) / (Effectiveness_Drug_A − Effectiveness_Drug_B).
4. Cost-Utility Analysis (CUA): Costs in Dollars ($); Outcomes adjusted for both length and quality of life using Quality-Adjusted Life Years (QALYs = Years of Life × Utility Weight [0.0 dead to 1.0 perfect health]).`
      }
    ],
    quickTables: [
      {
        title: 'Pharmacoeconomic Evaluation Methodologies Comparison',
        titleAr: 'جدول مقارنة نماذج التقييم الاقتصادي الدوائي الأربعة',
        headers: ['Analysis Type', 'Cost Unit', 'Outcome Unit', 'Primary Clinical Application'],
        rows: [
          ['Cost-Minimization (CMA)', 'Dollars ($)', 'Assumed Equal', 'Comparing AB-rated generic vs brand or bioequivalent IV-to-PO'],
          ['Cost-Benefit (CBA)', 'Dollars ($)', 'Dollars ($)', 'Comparing different clinical services or pharmacy staffing justification'],
          ['Cost-Effectiveness (CEA)', 'Dollars ($)', 'Natural Clinical Units (life-years, mmHg, cures)', 'Calculating ICER for a new drug vs standard of care'],
          ['Cost-Utility (CUA)', 'Dollars ($)', 'Quality-Adjusted Life Years (QALYs)', 'Oncology or chronic disease therapies affecting quality of life']
        ]
      }
    ],
    boardPearls: [
      'In a Superiority trial, Intention-to-Treat (ITT) is conservative; in a Noninferiority trial, Per-Protocol (PP) and ITT must both exclude the noninferiority margin.',
      'QALY = Years of Life × Utility Score (e.g., 10 years lived at 0.7 utility = 7.0 QALYs) and defines a Cost-Utility Analysis (CUA).',
      'FDA Orange Book lists small-molecule generic therapeutic equivalence (AB rating), whereas the FDA Purple Book lists licensed biological products and biosimilars.'
    ],
    boardPearlsAr: [
      'في دراسات التفوق يُفضل تحليل ITT، بينما في دراسات عدم الدونية (Noninferiority) يلزم توافق تحليلي Per-Protocol و ITT معاً.',
      'تُقاس مخرجات تحليل منفعة التكلفة (CUA) بوحدة سنوات الحياة المعدلة حسب الجودة (QALYs).',
      'كتاب Orange Book مخصص للجنيسات الكيميائية، بينما كتاب Purple Book مخصص للأدوية الحيوية والبدائل الحيوية (Biosimilars).'
    ],
    keywords: ['drug information', 'itt', 'per-protocol', 'noninferiority', 'pharmacoeconomics', 'qaly', 'icer', 'meta-analysis']
  },
  {
    id: 'accp-2026-v2-c5',
    bookId: 'accp-2026-vol2',
    chapterNumber: 15,
    title: 'Chapter 15: Endocrine & Metabolic Disorders (T2DM Organ-Protection, Inpatient Glycemic Control, DKA & Thyroid)',
    titleAr: 'الفصل 15 (مجلد 2 - ص 2-219): اضطرابات الغدد الصماء والاستقلاب (السكري، حماية القلب والكلى، ضبط سكر المنومين، والدرقية)',
    authors: 'ACCP Endocrinology Preparatory Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-219 to 2-274',
    systemCategory: 'Endocrinology & Metabolism',
    systemCategoryAr: 'أمراض الغدد الصماء والسكري',
    uan: '0217-0000-26-061-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c5',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 15: Endocrine & Metabolic Disorders; pp. 2-219 to 2-274.',
    isVerbatimSource: true,
    learningObjectives: [
      'Select cardiorenal-protective Type 2 Diabetes pharmacotherapy (SGLT2 inhibitors and GLP-1/GIP receptor agonists) independent of baseline HbA1c.',
      'Manage inpatient hyperglycemia (140–180 mg/dL target) with basal-bolus insulin and hold high-risk oral agents (Metformin, SGLT2i, Sulfonylureas).',
      'Dose Levothyroxine (1.6 mcg/kg/day IBW) in hypothyroidism and manage subclinical hypothyroidism and hyperthyroidism.'
    ],
    toc: [
      { id: 'v2c5-s1', number: '15.1', title: 'ADA 2026 Organ-Centric T2DM Algorithm (ASCVD, Heart Failure & CKD)' },
      { id: 'v2c5-s2', number: '15.2', title: 'Inpatient Glycemic Target (140–180 mg/dL) & Basal-Bolus Insulin Calculation' },
      { id: 'v2c5-s3', number: '15.3', title: 'Hypothyroidism (Levothyroxine Kinetics) & Hyperthyroidism Pharmacotherapy' }
    ],
    sections: [
      {
        id: 'v2c5-s1',
        number: '15.1',
        heading: 'ADA 2026 Organ-Centric T2DM Algorithm (ASCVD, Heart Failure & CKD)',
        headingAr: 'خوارزمية جمعية السكري الأمريكية (ADA 2026) لحماية القلب والكلى في السكري من النمط الثاني',
        evidenceGrade: 'ADA Standards of Care Class A',
        body: `In Type 2 Diabetes Mellitus, cardiorenal organ-protective therapy is initiated INDEPENDENT of baseline HbA1c or background Metformin use:
1. Established ASCVD or High ASCVD Risk: Initiate a GLP-1 Receptor Agonist with proven cardiovascular benefit (Semaglutide SC/PO, Liraglutide, or Dulaglutide — reduces MACE including stroke/MI) AND/OR an SGLT2 Inhibitor with proven CV benefit (Empagliflozin, Dapagliflozin, Canagliflozin).
2. Heart Failure (HFrEF, HFmrEF, or HFpEF): Initiate an SGLT2 Inhibitor (Dapagliflozin 10 mg daily or Empagliflozin 10 mg daily) to reduce HF hospitalization and cardiovascular death. (GLP-1 RAs Semaglutide and Tirzepatide also improve symptoms and reduce HF events in obesity-related HFpEF per STEP-HFpEF and SUMMIT trials).
3. Chronic Kidney Disease (eGFR 20–60 mL/min/1.73m² and/or Albuminuria UACR >=30 mg/g):
   - First-line: Maximum tolerated ACEi or ARB + SGLT2 Inhibitor (Dapagliflozin [DAPA-CKD], Empagliflozin [EMPA-KIDNEY], or Canagliflozin [CREDENCE]; may initiate down to eGFR >=20 mL/min and continue until dialysis).
   - Add-on for Persistent Albuminuria: Non-steroidal MRA Finerenone (10–20 mg PO daily if K+ <=4.8 mEq/L and eGFR >=25 mL/min; FIDELIO-DKD & FIGARO-DKD) and/or Semaglutide (FLOW trial).`
      },
      {
        id: 'v2c5-s2',
        number: '15.2',
        heading: 'Inpatient Glycemic Target (140–180 mg/dL) & Basal-Bolus Insulin Calculation',
        headingAr: 'ضبط السكر للمنومين (140-180 ملغ/دل) وحساب نظام الأنسولين القاعدي والوجبات (Basal-Bolus)',
        evidenceGrade: 'ADA / Endocrine Society Inpatient Guideline',
        body: `• Inpatient Glycemic Target: Initiate insulin at blood glucose >=180 mg/dL, targeting 140 to 180 mg/dL in both critically ill (ICU) and non-critically ill patients (NICE-SUGAR trial). Prolonged use of Sliding-Scale Insulin (SSI) monotherapy is strongly discouraged because it treats hyperglycemia reactively after it occurs, causing wide glycemic excursions.
• Calculating Inpatient Subcutaneous Basal-Bolus Insulin (Total Daily Dose [TDD]):
  - Standard Weight-Based TDD: 0.4 to 0.5 units/kg/day.
  - High-Risk for Hypoglycemia (Age >=70 years, eGFR <30–45 mL/min, liver disease, or insulin-naive): 0.2 to 0.3 units/kg/day.
  - Insulin-Resistant / Obesity / High-Dose Steroids: 0.6 to 0.8+ units/kg/day.
  - Distribution of TDD: Give 50% as Long-Acting Basal Insulin (Insulin Glargine or Detemir once daily) and 50% as Rapid-Acting Prandial Insulin divided equally before 3 meals (Insulin Lispro, Aspart, or Glulisine — hold prandial insulin if patient is NPO, but NEVER hold basal insulin completely!).`
      },
      {
        id: 'v2c5-s3',
        number: '15.3',
        heading: 'Hypothyroidism (Levothyroxine Kinetics) & Hyperthyroidism Pharmacotherapy',
        headingAr: 'علاج قصور الدرق (حركية وتداخلات Levothyroxine) وفرط نشاط الدرق',
        evidenceGrade: 'ATA Clinical Practice Guideline',
        body: `• Hypothyroidism (Elevated TSH, Low Free T4):
  - Full Replacement Dose in Healthy Adults: Levothyroxine (T4) 1.6 mcg/kg/day based on Ideal Body Weight (IBW), taken on an empty stomach 30–60 minutes before breakfast (or 3–4 hours after the last meal at bedtime), separated by at least 4 hours from Calcium carbonate, Ferrous sulfate, Magnesium/Aluminum antacids, Sucralfate, Sevelamer, and Bile acid resins.
  - Older Adults (>60–65 years) or Coronary Artery Disease: Start low at 12.5 to 25 mcg PO daily and titrate every 4–6 weeks to prevent precipitating angina or arrhythmias.
  - IV-to-PO Levothyroxine Conversion: Intravenous Levothyroxine dose is 50% to 75% of the oral Levothyroxine dose (oral bioavailability is ~70–80%).
  - Monitoring: Recheck serum TSH in 6 to 8 weeks after any dose change (T4 half-life is ~7 days).`
      }
    ],
    quickTables: [
      {
        title: 'Antidiabetic Class Profiles, Organ Benefits & Inpatient Hold Rules',
        titleAr: 'جدول خصائص أدوية السكري، الفوائد العضوية، وقواعد الإيقاف في المستشفى',
        headers: ['Drug Class', 'ASCVD / HF / CKD Benefit', 'eGFR Initiation Cutoff', 'Mandatory Inpatient Safety Rule'],
        rows: [
          ['Metformin', 'Neutral MACE; foundational oral agent', 'Contraindicated if eGFR <30; do not initiate if 30–44', 'Hold in AKI, sepsis/shock, hypoxia, or 48h around IV contrast (lactic acidosis)'],
          ['SGLT2 Inhibitors (Dapa/Empa)', 'Reduces HF hospitalization & CKD progression', 'eGFR >=20 mL/min (for HF/CKD benefit)', 'Hold during acute hospitalization, fasting, or 3–4d pre-op (euglycemic DKA)'],
          ['GLP-1 RAs (Semaglutide/Lira)', 'Reduces ASCVD MACE (Stroke/MI) & CKD events', 'No renal dose adjustment required', 'Contraindicated in personal/family history of Medullary Thyroid Carcinoma (MTC) or MEN2'],
          ['Thiazolidinediones (Pioglitazone)', 'Reduces stroke/MI (IRIS) but causes fluid retention', 'No renal adjustment', 'CONTRAINDICATED in NYHA Class III–IV Heart Failure (Boxed Warning)']
        ]
      }
    ],
    boardPearls: [
      'SGLT2 inhibitors lose their glycemic-lowering efficacy when eGFR falls <45 mL/min, but they RETAIN their full Heart Failure and CKD nephroprotective benefits down to eGFR >=20 mL/min.',
      'Intravenous Levothyroxine is dosed at 50% to 75% of the oral dose, and serum TSH requires 6 to 8 weeks to reach steady state after a dose adjustment.',
      'GLP-1 receptor agonists (Semaglutide, Liraglutide, Dulaglutide, Tirzepatide) carry an FDA Boxed Warning and contraindication in patients with a personal or family history of Medullary Thyroid Carcinoma (MTC) or Multiple Endocrine Neoplasia type 2 (MEN 2).'
    ],
    boardPearlsAr: [
      'تحافظ مثبطات SGLT2 على فعاليتها الكاملة في حماية القلب والكلى حتى eGFR >= 20 مل/دقيقة وإن ضعفت قدرتها على خفض السكر.',
      'تعادل الجرعة الوريدية من الليفوثيروكسين (Levothyroxine) نحو 50% إلى 75% من الجرعة الفموية، ويُفحص TSH بعد 6-8 أسابيع.',
      'تُمنع ناهضات GLP-1 في حال وجود قصة شخصية أو عائلية لسرطان الدرق اللبي (MTC) أو متلازمة MEN 2.'
    ],
    keywords: ['diabetes', 'sglt2', 'glp-1', 'semaglutide', 'finerenone', 'metformin', 'insulin', 'levothyroxine', 'hypothyroidism']
  },
  {
    id: 'accp-2026-v2-c7',
    bookId: 'accp-2026-vol2',
    chapterNumber: 17,
    title: 'Chapter 17: Clinical Pharmacokinetics & Therapeutic Drug Monitoring (Vancomycin AUC/MIC, Aminoglycosides, Phenytoin & Digoxin)',
    titleAr: 'الفصل 17 (مجلد 2 - ص 2-323): الحركية الدوائية السريرية ومراقبة التراكيز العلاجية (Vancomycin AUC/MIC, Phenytoin, Digoxin)',
    authors: 'ACCP Clinical Pharmacokinetics & TDM Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-323 to 2-362',
    systemCategory: 'Nephrology & Fluids',
    systemCategoryAr: 'الحركية الدوائية ومراقبة التراكيز (TDM)',
    uan: '0217-0000-26-061-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c7',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 17: Clinical Pharmacokinetics & Therapeutic Drug Monitoring; pp. 2-323 to 2-362.',
    isVerbatimSource: true,
    learningObjectives: [
      'Calculate one-compartment linear pharmacokinetic parameters (ke, t1/2, Vd, CL, AUC24) and design Bayesian/two-level Vancomycin AUC24/MIC regimens (400–600 mg·h/L).',
      'Apply the Winter-Tozer equation for Phenytoin albumin/renal correction and Michaelis-Menten nonlinear saturation kinetics.',
      'Optimize Digoxin and extended-interval Aminoglycoside therapeutic drug monitoring and sampling times.'
    ],
    toc: [
      { id: 'v2c7-s1', number: '17.1', title: '2020/2026 ASHP/IDSA/SIDP Vancomycin AUC24/MIC Consensus & Linear PK Equations' },
      { id: 'v2c7-s2', number: '17.2', title: 'Phenytoin Winter-Tozer Hypoalbuminemia Correction & Nonlinear Michaelis-Menten Kinetics' },
      { id: 'v2c7-s3', number: '17.3', title: 'Aminoglycoside Extended-Interval Dosing & Digoxin Distribution-Phase Sampling' }
    ],
    sections: [
      {
        id: 'v2c7-s1',
        number: '17.1',
        heading: '2020/2026 ASHP/IDSA/SIDP Vancomycin AUC24/MIC Consensus & Linear PK Equations',
        headingAr: 'توصيات ASHP/IDSA لمراقبة الفانكومايسين بنظام AUC24/MIC ومعادلات الحركية الخطية',
        evidenceGrade: 'ASHP/IDSA/PIDS/SIDP Consensus Guideline',
        body: `1. Vancomycin AUC24/MIC Monitoring Standard (Replaces Trough-Only 15–20 mcg/mL):
• Target Pharmacodynamic Index: For serious invasive MRSA infections (bacteremia, infective endocarditis, osteomyelitis, pneumonia, meningitis), target an AUC24/MIC ratio of 400 to 600 mg·h/L (assuming a broth microdilution MIC of 1 mg/L). AUC24 >600 mg·h/L exponentially increases Vancomycin-induced acute kidney injury without improving bacterial killing.
• Two-Level First-Order Pharmacokinetic Equations:
  - Elimination Rate Constant: ke = ln(C_peak / C_trough) / Δt
  - Half-Life: t1/2 = 0.693 / ke
  - Volume of Distribution: Vd = ~0.7 L/kg Actual Body Weight
  - Total Vancomycin Clearance: CL_vanco (L/h) = ke × Vd
  - Daily AUC24: AUC24 = Total Daily Dose (mg/24h) / CL_vanco (L/h). Because Vancomycin follows linear first-order kinetics, AUC24 and steady-state concentrations change strictly proportionally with Total Daily Dose: New TDD = Old TDD × (Target AUC24 / Measured AUC24).`
      },
      {
        id: 'v2c7-s2',
        number: '17.2',
        heading: 'Phenytoin Winter-Tozer Hypoalbuminemia Correction & Nonlinear Michaelis-Menten Kinetics',
        headingAr: 'معادلة Winter-Tozer لتصحيح الفينيتوين عند نقص الألبومين والحركية غير الخطية',
        evidenceGrade: 'Clinical Pharmacokinetic Standard',
        body: `Phenytoin is 90% bound to serum albumin and exhibits saturable, capacity-limited (Michaelis-Menten) hepatic CYP2C9/2C19 metabolism within the therapeutic range:
• Therapeutic Range: Total Phenytoin = 10 to 20 mcg/mL; Unbound (Free) Phenytoin = 1 to 2 mcg/mL.
• Winter-Tozer Equation (Mandatory in Hypoalbuminemia [Albumin <3.5 g/dL] and/or Renal Failure):
  - Normal Renal Function (CrCl >=10 mL/min):
    Corrected Phenytoin (mcg/mL) = Measured Total Phenytoin / [(0.2 × Serum Albumin) + 0.1]
  - Severe Renal Impairment (CrCl <10 mL/min or End-Stage Renal Disease — uremic toxins displace phenytoin from albumin):
    Corrected Phenytoin (mcg/mL) = Measured Total Phenytoin / [(0.1 × Serum Albumin) + 0.1]
  - Valproic Acid Co-Administration: Valproate competitively displaces Phenytoin from albumin AND inhibits CYP2C9 clearance; always measure a direct Free (Unbound) Phenytoin level!
• Nonlinear Dose Adjustment Caution: Because hepatic enzymes saturate near Vmax, small increases in daily Phenytoin dose (e.g., increasing by >30–50 mg/day when levels are >7–10 mcg/mL) cause disproportionate, supratherapeutic spikes in serum levels (nystagmus at >20 mcg/mL, ataxia at >30 mcg/mL, coma/seizures at >40 mcg/mL).`
      },
      {
        id: 'v2c7-s3',
        number: '17.3',
        heading: 'Aminoglycoside Extended-Interval Dosing & Digoxin Distribution-Phase Sampling',
        headingAr: 'الأمينوغليكوزيدات ذات الجرعة اليومية الممتدة وقواعد سحب عينة الديجوكسين',
        evidenceGrade: 'TDM Practice Standard',
        body: `1. High-Dose Extended-Interval Aminoglycosides (Hartford Nomogram):
• Gentamicin / Tobramycin 7 mg/kg IV once daily (or Amikacin 15–20 mg/kg IV once daily; use Ideal Body Weight, or Adjusted Body Weight = IBW + 0.4 × [TBW − IBW] if obese). Exploits concentration-dependent killing (Cmax/MIC >=8–10) and the post-antibiotic effect while allowing trough concentrations to fall <1 mcg/mL to minimize saturable renal proximal tubular and cochlear uptake.
• Contraindications to Extended-Interval Aminoglycoside Dosing: CrCl <30–40 mL/min, Pregnancy, Burns >20% BSA, Ascites/Cirrhosis, or Gram-positive Endocarditis synergy (where traditional low-dose Gentamicin 1 mg/kg IV q8h or 3 mg/kg q24h is used).

2. Digoxin Therapeutic Drug Monitoring:
• Therapeutic Serum Concentration: 0.5 to 0.9 ng/mL in Heart Failure (HFrEF); 0.8 to 1.2 ng/mL in Atrial Fibrillation.
• Mandatory Sampling Window: Digoxin exhibits a prolonged 6-to-8-hour two-compartment tissue distribution phase into skeletal and cardiac muscle. Drawing a serum Digoxin level <6 hours after an oral or IV dose yields a falsely elevated plasma level that does NOT reflect myocardial receptor concentration or toxicity! Always draw Digoxin troughs >=6–8 hours post-dose (or immediately prior to the next scheduled dose).
• Digoxin Immune Fab (Digibind/DigiFab) Indications: Life-threatening ventricular arrhythmias, symptomatic bradycardia/heart block unresponsive to atropine, Serum Potassium >5.0–5.5 mEq/L in acute overdose (digitalis Na+/K+-ATPase blockade causes severe extracellular hyperkalemia), or serum digoxin >10 ng/mL (or >4 ng/mL with severe symptoms).`
      }
    ],
    quickTables: [
      {
        title: 'Essential Clinical Pharmacokinetic Equations & TDM Targets',
        titleAr: 'جدول المعادلات الحركية الدوائية الأساسية وأهداف مراقبة التراكيز العلاجية',
        headers: ['Drug / Parameter', 'Formula / Equation', 'Therapeutic Target', 'Critical Sampling / Dosing Rule'],
        rows: [
          ['Vancomycin AUC24', 'AUC24 = TDD / CL_vanco (or New Dose = Old Dose × Target/Measured)', 'AUC24/MIC 400–600 mg·h/L', 'Infuse >=60 min per 1 g (max 10–15 mg/min)'],
          ['Phenytoin (Normal Renal)', 'C_corr = C_measured / [(0.2 × Albumin) + 0.1]', 'Total: 10–20 mcg/mL | Free: 1–2 mcg/mL', 'Use 0.1 × Albumin if CrCl <10 mL/min'],
          ['Digoxin', 'Linear kinetics: New Dose = Old Dose × (Target Css / Measured Css)', 'HFrEF: 0.5–0.9 ng/mL | AFib: 0.8–1.2 ng/mL', 'Draw level >=6 to 8 hours post-dose (distribution phase)'],
          ['Gentamicin / Tobramycin', 'AdjBW = IBW + 0.4 × (TBW − IBW) if TBW >120% IBW', 'Extended: 7 mg/kg | Traditional Peak 5–10, Trough <1–2', 'Avoid extended-interval in CrCl <30, ascites, pregnancy, burns']
        ]
      }
    ],
    boardPearls: [
      'A serum Digoxin concentration drawn within 4 hours of an IV or oral dose is clinically uninterpretable due to the 6-to-8-hour myocardial tissue distribution phase.',
      'In a patient with Albumin = 2.0 g/dL and normal renal function, a measured total Phenytoin level of 7.5 mcg/mL corrects to: 7.5 / [(0.2 × 2.0) + 0.1] = 7.5 / 0.5 = 15.0 mcg/mL (fully therapeutic — do NOT increase the dose!).',
      'After administering Digoxin Immune Fab (DigiFab), total serum digoxin immunoassays measure both bound and free digoxin and will falsely spike — monitor clinical ECG response and free digoxin levels instead.'
    ],
    boardPearlsAr: [
      'سحب عينة الديجوكسين خلال أقل من 6 ساعات من الجرعة يعطي قراءة مرتفعة كاذبة بسبب طور التوزيع النسيجي.',
      'عندما يكون الألبومين 2.0 جم/دل والوظيفة الكلوية طبيعية، فإن قراءة الفينيتوين الكلية 7.5 تعادل بعد التصحيح 15.0 مكغ/مل (ضمن النطاق العلاجي التام).',
      'بعد إعطاء ترياق الديجوكسين (DigiFab)، يرتفع مستوى الديجوكسين الكلي في التحليل المخبري كاذباً؛ لذا تُراقب استجابة تخطيط القلب.'
    ],
    keywords: ['pharmacokinetics', 'tdm', 'vancomycin', 'auc', 'phenytoin', 'winter-tozer', 'digoxin', 'aminoglycosides', 'gentamicin']
  },
  {
    id: 'accp-2026-v2-c8',
    bookId: 'accp-2026-vol2',
    chapterNumber: 18,
    title: 'Chapter 18: Geriatrics (AGS Beers Criteria, Deprescribing, Dementia, Osteoporosis & Gout)',
    titleAr: 'الفصل 18 (مجلد 2 - ص 2-363): طب المسنين (معايير Beers، إيقاف الأدوية الضارة، الخرف، هشاشة العظام، والنقرس)',
    authors: 'ACCP Geriatrics & Bone/Joint Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-363 to 2-408',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'طب المسنين وأمراض المفاصل والعظام',
    uan: '0217-0000-26-061-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c8',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapter 18: Geriatrics, Osteoporosis & Gout; pp. 2-363 to 2-408.',
    isVerbatimSource: true,
    learningObjectives: [
      'Identify potentially inappropriate medications in older adults (>=65 years) per the AGS Beers Criteria and break prescribing cascades.',
      'Manage Alzheimer dementia (Acetylcholinesterase inhibitors, Memantine) and urinary incontinence (Mirabegron/Vibegron vs antimuscarinics).',
      'Treat acute gout flares and chronic hyperuricemia (Allopurinol HLA-B*5801, Colchicine renal/CYP3A4 limits) and osteoporosis.'
    ],
    toc: [
      { id: 'v2c8-s1', number: '18.1', title: 'AGS Beers Criteria High-Risk Classes, Anticholinergic Burden & Prescribing Cascades' },
      { id: 'v2c8-s2', number: '18.2', title: 'Alzheimer Dementia, Overactive Bladder (Beta-3 Agonists) & Osteoporosis' },
      { id: 'v2c8-s3', number: '18.3', title: 'Acute Gout Flares & Chronic Urate-Lowering Therapy (Target Uric Acid <6.0 mg/dL)' }
    ],
    sections: [
      {
        id: 'v2c8-s1',
        number: '18.1',
        heading: 'AGS Beers Criteria High-Risk Classes, Anticholinergic Burden & Prescribing Cascades',
        headingAr: 'معايير الجمعية الأمريكية لطب المسنين (AGS Beers Criteria) ومتواليات الوصف الدوائي',
        evidenceGrade: 'AGS Beers Criteria® Update',
        body: `1. Major Medication Classes to Avoid in Older Adults (>=65 Years — AGS Beers Criteria):
• First-Generation Antihistamines (Diphenhydramine, Chlorpheniramine, Hydroxyzine, Promethazine) & Tricyclic Antidepressants (Amitriptyline, Nortriptyline, Doxepin >6 mg) & Antispasmodics (Oxybutynin, Tolterodine, Cyclobenzaprine): Potent central and peripheral anticholinergic blockade causing acute delirium, cognitive decline, falls, urinary retention, blurry vision, and constipation.
• Benzodiazepines (Alprazolam, Lorazepam, Diazepam) & Non-Benzodiazepine Z-Hypnotics (Zolpidem, Eszopiclone, Zaleplon): Double the risk of falls, hip fractures, delirium, and motor vehicle crashes.
• Antipsychotics (Haloperidol, Quetiapine, Risperidone, Olanzapine) in Behavioral & Psychological Symptoms of Dementia (BPSD): FDA Boxed Warning for increased risk of cerebrovascular events (stroke) and all-cause mortality in older adults with dementia-related psychosis.
• Endocrine & Antithrombotic Beers Additions: Avoid Sulfonylureas (especially Glyburide and Glimepiride due to severe prolonged hypoglycemia), Sliding-Scale Insulin monotherapy, Aspirin for primary cardiovascular prevention, and Warfarin as initial therapy for nonvalvular AFib/VTE (prefer DOACs, particularly Apixaban for lowest GI bleeding risk).

2. Recognizing and Breaking Prescribing Cascades:
• Classic Cascade 1: Dihydropyridine CCB (Amlodipine) -> Precapillary arteriolar vasodilation causing peripheral ankle edema -> Misinterpreted as new heart failure -> Inappropriate prescription of Furosemide (causing hypokalemia/falls). Fix: Switch Amlodipine or add an ACEi/ARB (which dilates postcapillary venules and resolves CCB edema).
• Classic Cascade 2: Cholinesterase Inhibitor (Donepezil/Rivastigmine) -> Cholinergic urge urinary incontinence -> Inappropriate addition of Oxybutynin (anticholinergic that directly antagonizes Donepezil in the brain and worsens dementia!).`
      },
      {
        id: 'v2c8-s2',
        number: '18.2',
        heading: 'Alzheimer Dementia, Overactive Bladder (Beta-3 Agonists) & Osteoporosis',
        headingAr: 'الخرف، فرط نشاط المثانة (ناهضات Beta-3)، وعلاج هشاشة العظام',
        evidenceGrade: 'Clinical Practice Guideline Standard',
        body: `• Overactive Bladder (Urge Urinary Incontinence) in Older Adults: Beta-3 Adrenergic Agonists (Mirabegron 25–50 mg daily [monitor BP] or Vibegron 75 mg daily [no BP elevation or CYP2D6 inhibition]) relax the detrusor muscle WITHOUT crossing the blood-brain barrier or causing anticholinergic cognitive impairment/dementia; strictly preferred over Oxybutynin/Tolterodine in older adults.
• Osteoporosis Diagnostic Thresholds (T-Score <= −2.5 at femoral neck, total hip, or lumbar spine; OR history of fragility hip/vertebral fracture; OR Osteopenia [T-score −1.0 to −2.5] with 10-year FRAX hip fracture risk >=3% or major osteoporotic fracture risk >=20%):
  - First-Line Oral Bisphosphonates: Alendronate 70 mg PO weekly or Risedronate 35 mg PO weekly (take with 6–8 oz plain water ONLY, >=30 minutes before first food/medication, and remain upright for >=30 minutes to prevent erosive esophagitis; contraindicated if CrCl <30–35 mL/min).
  - Intravenous / SC Options: Zoledronic Acid 5 mg IV once yearly (contraindicated if CrCl <35 mL/min) or Denosumab 60 mg SC every 6 months (RANKL monoclonal antibody; safe in severe CKD/dialysis, but monitor for severe hypocalcemia in CKD!).
  - Very High Fracture Risk (Anabolic First): Romosozumab (monthly × 12 months; boxed warning for MI/stroke), Teriparatide, or Abaloparatide (max 2 years lifetime).`
      },
      {
        id: 'v2c8-s3',
        number: '18.3',
        heading: 'Acute Gout Flares & Chronic Urate-Lowering Therapy (Target Uric Acid <6.0 mg/dL)',
        headingAr: 'علاج نوبات النقرس الحادة وخفض حمض اليوريك المزمن (< 6.0 ملغ/دل)',
        evidenceGrade: 'ACR Gout Guideline Class I',
        body: `1. Acute Gout Flare Treatment:
• First-line options (initiate within 24 hours of flare onset; DO NOT stop chronic Allopurinol/Febuxostat during an acute flare!):
  - Low-Dose Colchicine: 1.2 mg PO at first sign of flare, followed by 0.6 mg PO 1 hour later (Maximum 1.8 mg total over 1 hour!). Contraindicated with strong CYP3A4 or P-gp inhibitors (Clarithromycin, Cyclosporine, Itraconazole, Ritonavir) in patients with renal or hepatic impairment.
  - NSAIDs (Indomethacin, Naproxen, Celecoxib — avoid in CKD, Heart Failure, Cirrhosis, or PUD/anticoagulation).
  - Corticosteroids (Prednisone 0.5 mg/kg/day [30–40 mg daily] for 5–10 days or intra-articular triamcinolone — preferred in severe CKD/AKI where Colchicine and NSAIDs are unsafe).

2. Chronic Urate-Lowering Therapy (ULT — Target Serum Uric Acid <6.0 mg/dL):
• Allopurinol is the preferred first-line ULT for all patients, including those with Stage 3–5 CKD: Start low at <=100 mg PO daily (or <=50 mg/day in CKD Stage 4–5) and titrate every 2–5 weeks to achieve Serum Uric Acid <6.0 mg/dL.
• Mandatory HLA-B*5801 Screening: Screen patients of Southeast Asian descent (Han Chinese, Korean, Thai) and African American patients for HLA-B*5801 before starting Allopurinol (high risk of fatal Allopurinol Hypersensitivity Syndrome / SJS-TEN).
• Mandatory Flare Prophylaxis When Starting ULT: Always co-administer low-dose Colchicine (0.6 mg PO once or twice daily, or 0.3 mg daily in CKD) or low-dose NSAID/Prednisone for the first 3 to 6 months of starting Allopurinol or Febuxostat to prevent acute uric acid mobilization flares.`
      }
    ],
    quickTables: [
      {
        title: 'Classic Geriatric Prescribing Cascades & Clinical Resolutions',
        titleAr: 'جدول متواليات الوصف الدوائي الشهيرة لدى كبار السن وطريقة تصحيحها',
        headers: ['Inciting Drug', 'Drug-Induced Adverse Effect', 'Inappropriate Cascade Drug', 'Correct Clinical Intervention'],
        rows: [
          ['Amlodipine / Nifedipine', 'Ankle / pedal edema (arteriolar dilation)', 'Furosemide (Loop diuretic)', 'Add ACEi/ARB (venular dilation) or reduce/switch CCB'],
          ['Donepezil / Rivastigmine', 'Urinary incontinence (peripheral ACh increase)', 'Oxybutynin / Tolterodine (anticholinergic)', 'Avoid antimuscarinic (cancels Donepezil); use Vibegron or behavioral therapy'],
          ['Metoclopramide / Antipsychotics', 'Drug-induced Parkinsonism (D2 blockade)', 'Carbidopa / Levodopa', 'Discontinue Metoclopramide or switch to Quetiapine/Clozapine'],
          ['NSAIDs (Ibuprofen/Naproxen)', 'Sodium retention & elevated blood pressure', 'Adding new antihypertensive agent', 'Discontinue NSAID and substitute Acetaminophen or topical Diclofenac']
        ]
      }
    ],
    boardPearls: [
      'Never combine Donepezil (cholinesterase inhibitor) with Oxybutynin or Tolterodine (anticholinergics) — they are direct pharmacologic antagonists in the central nervous system.',
      'Acute gout Colchicine dosing is strictly 1.2 mg PO followed by 0.6 mg PO 1 hour later (total 1.8 mg); high-dose hourly colchicine causes severe hemorrhagic diarrhea without added efficacy (AGREE trial).',
      'Always provide 3 to 6 months of anti-inflammatory flare prophylaxis (low-dose Colchicine) when initiating Allopurinol or Febuxostat.'
    ],
    boardPearlsAr: [
      'يُمنع الجمع بين Donepezil وأدوية سلس البول المضادة للكولين (مثل Oxybutynin) لتضادهما الدوائي المباشر وتدهور الخرف.',
      'جرعة الكولشيسين في نوبة النقرس الحادة هي 1.2 ملغ يتبعها 0.6 ملغ بعد ساعة واحدة فقط (بحد أقصى 1.8 ملغ).',
      'يجب إعطاء وقاية مضادة للالتهاب (كولشيسين بجرعة صغيرة) لمدة 3 إلى 6 أشهر عند بدء دواء Allopurinol لمنع نوبات النقرس التحريضية.'
    ],
    keywords: ['geriatrics', 'beers criteria', 'dementia', 'donepezil', 'osteoporosis', 'alendronate', 'denosumab', 'gout', 'allopurinol', 'colchicine']
  },
  {
    id: 'accp-2026-v2-c9-10',
    bookId: 'accp-2026-vol2',
    chapterNumber: 19,
    title: 'Chapters 19–20: Biostatistics & Clinical Study Designs (NNT, NNH, ARR, RRR, OR, HR & Statistical Tests)',
    titleAr: 'الفصل 19-20 (مجلد 2 - ص 2-409): الإحصاء الحيوي وتصميم الدراسات السريرية (حسابات NNT, ARR, OR, HR واختيار الاختبار الإحصائي)',
    authors: 'ACCP Biostatistics & Research Design Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-409 to 2-478',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'الإحصاء الحيوي وتصميم التجارب السريرية',
    uan: '0217-0000-26-062-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c9-10',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapters 19–20: Biostatistics & Study Design; pp. 2-409 to 2-478.',
    isVerbatimSource: true,
    learningObjectives: [
      'Calculate Relative Risk (RR), Odds Ratio (OR), Hazard Ratio (HR), Absolute Risk Reduction (ARR), Relative Risk Reduction (RRR), Number Needed to Treat (NNT), and Number Needed to Harm (NNH).',
      'Select the exact parametric versus nonparametric statistical test based on variable scale (Continuous, Ordinal, Nominal) and group structure (independent vs paired).',
      'Calculate Sensitivity, Specificity, Positive Predictive Value (PPV), Negative Predictive Value (NPV), and Type I (Alpha) vs Type II (Beta / Power) errors.'
    ],
    toc: [
      { id: 'v2c9-s1', number: '19.1', title: 'Risk Quantification Equations (RR, OR, HR, ARR, RRR, NNT, NNH) & Confidence Intervals' },
      { id: 'v2c9-s2', number: '19.2', title: 'Selecting Parametric vs Nonparametric Statistical Tests & Diagnostic Accuracy' }
    ],
    sections: [
      {
        id: 'v2c9-s1',
        number: '19.1',
        heading: 'Risk Quantification Equations (RR, OR, HR, ARR, RRR, NNT, NNH) & Confidence Intervals',
        headingAr: 'معادلات قياس الخطر والفعالية السريرية (ARR, RRR, NNT, OR, HR) وتفسير فترات الثقة',
        evidenceGrade: 'BCPS Domain III Core Competency',
        body: `Let CER = Control Event Rate (incidence in placebo/control group) and EER = Experimental Event Rate (incidence in active treatment group):
1. Core Risk & Benefit Formulas:
• Relative Risk (RR — Cohort & Randomized Controlled Trials): RR = EER / CER
• Relative Risk Reduction (RRR): RRR = (CER − EER) / CER = 1 − RR
• Absolute Risk Reduction (ARR / Risk Difference): ARR = |CER − EER| (expressed as a decimal or percentage)
• Number Needed to Treat (NNT): NNT = 1 / ARR (when ARR is a decimal) OR 100 / ARR% (when ARR is a percentage).
  - Mandatory Board Rounding Rule: In clinical practice and board exams, NNT is ALWAYS rounded UP to the next whole integer (e.g., NNT = 12.1 rounds UP to 13 patients to avoid overstating benefit), whereas Number Needed to Harm (NNH = 1 / ARI) is rounded DOWN to the nearest whole integer (to avoid understating harm).
• Odds Ratio (OR — Case-Control Studies & Logistic Regression): OR = (a × d) / (b × c). Approximates RR only when the disease outcome is rare (<10%).

2. Interpreting 95% Confidence Intervals (CI) & p-Values:
• Ratios (Relative Risk, Odds Ratio, Hazard Ratio): Null value = 1.0. If the 95% CI includes 1.0 (e.g., HR 0.82; 95% CI 0.65–1.04), the result is NOT statistically significant (p > 0.05).
• Differences (Mean Difference, Absolute Risk Reduction): Null value = 0. If the 95% CI includes 0 (e.g., BP difference −4.2 mmHg; 95% CI −9.1 to +0.7), the result is NOT statistically significant.`
      },
      {
        id: 'v2c9-s2',
        number: '19.2',
        heading: 'Selecting Parametric vs Nonparametric Statistical Tests & Diagnostic Accuracy',
        headingAr: 'مصفوفة اختيار الاختبار الإحصائي (المعلمي وغير المعلمي) وحساسية ونوعية الفحوصات',
        evidenceGrade: 'Biostatistical Standard',
        body: `1. Hypothesis Testing Errors & Power:
• Type I Error (Alpha — False Positive): Rejecting the Null Hypothesis (H0) when H0 is actually true (concluding a difference exists when there is none; controlled by setting alpha = 0.05).
• Type II Error (Beta — False Negative): Failing to reject H0 when H0 is actually false (missing a true difference, usually due to inadequate sample size).
• Statistical Power = 1 − Beta (typically >=80% or 0.80): The probability of detecting a true difference when one exists.

2. Diagnostic Test 2×2 Matrix (Disease Present [a = True Positive, c = False Negative] vs Disease Absent [b = False Positive, d = True Negative]):
• Sensitivity (True Positive Rate — SnNOut: High Sensitivity rules OUT disease when negative): Sensitivity = a / (a + c)
• Specificity (True Negative Rate — SpPIn: High Specificity rules IN disease when positive): Specificity = d / (b + d)
• Positive Predictive Value (PPV — depends on disease prevalence): PPV = a / (a + b)
• Negative Predictive Value (NPV — depends on disease prevalence): NPV = d / (c + d)`
      }
    ],
    quickTables: [
      {
        title: 'Master Statistical Test Selection Matrix (Parametric vs Nonparametric vs Nominal)',
        titleAr: 'المصفوفة الشاملة لاختيار الاختبار الإحصائي حسب نوع البيانات وعدد المجموعات',
        headers: ['Study Comparison Design', 'Continuous Normal (Parametric)', 'Ordinal or Skewed Continuous (Nonparametric)', 'Nominal / Categorical Proportions'],
        rows: [
          ['2 Independent Groups (Parallel RCT)', 'Unpaired Student t-test', 'Mann-Whitney U test (Wilcoxon rank-sum)', 'Chi-square test (or Fisher exact if expected cell <5)'],
          ['2 Paired / Matched Groups (Before/After or Crossover)', 'Paired Student t-test', 'Wilcoxon signed-rank test', 'McNemar test'],
          ['>= 3 Independent Groups', 'One-way ANOVA', 'Kruskal-Wallis test', 'Chi-square test (R × C contingency)'],
          ['>= 3 Repeated / Matched Groups', 'Repeated-measures ANOVA', 'Friedman test', 'Cochran Q test'],
          ['Correlation / Time-to-Event Survival', 'Pearson r correlation / Linear regression', 'Spearman rho correlation', 'Kaplan-Meier + Log-rank test / Cox proportional hazards (HR)']
        ]
      }
    ],
    boardPearls: [
      'If CER = 15% (0.15) and EER = 10% (0.10): RRR = (0.15 − 0.10)/0.15 = 33.3%; ARR = 0.15 − 0.10 = 0.05 (5%); NNT = 1 / 0.05 = 20.',
      'Use McNemar test for paired nominal (categorical) data, Wilcoxon signed-rank test for paired ordinal/skewed data, and Paired t-test for paired continuous normal data.',
      'Case-Control studies are retrospective and cannot measure incidence; therefore, you MUST use Odds Ratio (OR) rather than Relative Risk (RR) in a Case-Control study.'
    ],
    boardPearlsAr: [
      'إذا كانت نسبة الحدث في الشاهد 15% وفي الدواء 10%: فإن خفض الخطر المطلق ARR = 5%، والعدد اللازم للعلاج NNT = 100 / 5 = 20 مريضاً.',
      'يُستخدم اختبار McNemar للبيانات الاسمية المزدوجة (قبل وبعد)، واختبار Fisher Exact عند صغر حجم العينات (< 5 في الخلية).',
      'في دراسات الحالات والشواهد الرجعية (Case-Control)، لا يمكن حساب RR بل يجب استخدام نسبة الأرجحية Odds Ratio (OR) حصراً.'
    ],
    keywords: ['biostatistics', 'nnt', 'arr', 'rrr', 'odds ratio', 'hazard ratio', 't-test', 'mann-whitney', 'chi-square', 'sensitivity', 'specificity']
  },
  {
    id: 'accp-2026-v2-c11-12',
    bookId: 'accp-2026-vol2',
    chapterNumber: 21,
    title: 'Chapters 21–22: Pediatrics & Psychiatry (Neonatal Sepsis, Pediatric Dosing, QTc Prolongation & Serotonin Syndrome)',
    titleAr: 'الفصل 21-22 (مجلد 2 - ص 2-479): طب الأطفال والطب النفسي (الإنتان الوليدي، موانع الأطفال، استطالة QTc، ومتلازمة السيروتونين)',
    authors: 'ACCP Pediatrics & Psychiatric Pharmacy Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 2)',
    pageRange: 'pp. 2-479 to 2-605',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'طب الأطفال والطب النفسي والسميات العصبية',
    uan: '0217-0000-26-062-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c11-12',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 2. Chapters 21–22: Pediatrics & Psychiatry; pp. 2-479 to 2-605.',
    isVerbatimSource: true,
    learningObjectives: [
      'Identify strict pediatric and neonatal drug contraindications (Ceftriaxone in neonates, Aspirin Reye syndrome, Codeine/Tramadol ultra-rapid CYP2D6 respiratory depression).',
      'Differentiate Serotonin Syndrome from Neuroleptic Malignant Syndrome (NMS) and execute targeted antidote therapy (Cyproheptadine vs Dantrolene).',
      'Monitor Clozapine Absolute Neutrophil Count (ANC) REMS thresholds and Lithium narrow-therapeutic-index interactions.'
    ],
    toc: [
      { id: 'v2c11-s1', number: '21.1', title: 'Neonatal & Pediatric Pharmacotherapy Contraindications & Weight-Based Regimens' },
      { id: 'v2c11-s2', number: '21.2', title: 'Serotonin Syndrome vs Neuroleptic Malignant Syndrome (NMS) & QTc Prolongation' },
      { id: 'v2c11-s3', number: '21.3', title: 'Psychiatric Pharmacotherapy: Clozapine ANC Monitoring & Lithium Toxicity Interactions' }
    ],
    sections: [
      {
        id: 'v2c11-s1',
        number: '21.1',
        heading: 'Neonatal & Pediatric Pharmacotherapy Contraindications & Weight-Based Regimens',
        headingAr: 'الموانع الدوائية المطلقة لدى حديثي الولادة والأطفال والجرعات الموزونة',
        evidenceGrade: 'AAP / Pediatric Safety Standard',
        body: `High-Alert Pediatric & Neonatal Medication Contraindications:
1. Ceftriaxone in Neonates (<=28 Days of Age): Strictly CONTRAINDICATED due to two life-threatening mechanisms: (a) displaces unconjugated bilirubin from serum albumin, precipitating kernicterus (bilirubin encephalopathy), and (b) forms fatal crystalline calcium-ceftriaxone precipitates in neonatal lungs and kidneys when co-administered with any IV calcium-containing solution (including Ringer's Lactate or TPN). For neonatal sepsis/meningitis (<28 days, Group B Streptococcus, E. coli, Listeria), use Ampicillin + Gentamicin (or Ampicillin + Cefotaxime/Cefepime).
2. Codeine and Tramadol in Children (<12 Years, or <18 Years Post-Tonsillectomy/Adenoidectomy): FDA Boxed Warning — CONTRAINDICATED because CYP2D6 ultra-rapid metabolizers rapidly convert Codeine to morphine, causing fatal respiratory arrest.
3. Aspirin / Salicylates in Viral Febrile Illness in Children: Contraindicated due to Reye Syndrome (fulminant hepatic steatosis and cerebral edema); exception: Kawasaki Disease (high-dose Aspirin + IVIG).
4. Chloramphenicol in Neonates: Deficiency of hepatic UDP-glucuronosyltransferase (UGT) causes "Gray Baby Syndrome" (cardiovascular collapse and cyanosis).
5. Benzyl Alcohol Excipient in Neonates: Causes fatal "Gasping Syndrome" (metabolic acidosis and CNS depression).`
      },
      {
        id: 'v2c11-s2',
        number: '21.2',
        heading: 'Serotonin Syndrome vs Neuroleptic Malignant Syndrome (NMS) & QTc Prolongation',
        headingAr: 'التفريق السريري بين متلازمة السيروتونين (Serotonin Syndrome) ومتلازمة الخبيث للدواء النفسي (NMS)',
        evidenceGrade: 'Emergency Toxicology & Psychiatry Standard',
        body: `Rapid bedside differentiation between Serotonin Syndrome and Neuroleptic Malignant Syndrome (NMS) is critical because their antidotes differ:
1. Serotonin Syndrome (Hunter Criteria):
   - Inciting Drugs: SSRIs/SNRIs/TCAs combined with MAOIs (including Linezolid and Methylene Blue!), Tramadol, Fentanyl, Meperidine, Dextromethorphan, Triptans, St. John's Wort, or Lithium.
   - Onset: Rapid (<24 hours, often within 6 hours of dose addition).
   - Signature Neuromuscular Finding: Hyperreflexia, inducible/spontaneous Ankle Clonus, ocular clonus, myoclonus, tremor, hyperactive bowel sounds, and mydriasis.
   - Treatment: Immediately discontinue all serotonergic agents, administer Benzodiazepines (Lorazepam) for agitation/tremor, IV fluids/cooling, and administer the 5-HT2A antagonist antidote Cyproheptadine (12 mg PO/NG initial dose, then 2 mg q2h).

2. Neuroleptic Malignant Syndrome (NMS):
   - Inciting Drugs: Dopamine D2 Receptor Antagonists (First- and Second-generation Antipsychotics: Haloperidol, Fluphenazine, Risperidone; Antiemetics: Metoclopramide, Prochlorperazine, Promethazine) OR abrupt withdrawal of Levodopa in Parkinson Disease.
   - Onset: Gradual over 1 to 3 days to 2 weeks.
   - Signature Neuromuscular Finding: "Lead-Pipe" Muscular Rigidity, hyporeflexia/bradyreflexia, severe hyperthermia (>40°C), autonomic instability, and marked Creatine Kinase (CK) elevation (rhabdomyolysis).
   - Treatment: Immediately stop the dopamine antagonist, aggressive IV hydration/cooling, and administer Dantrolene (ryanodine receptor Ca2+ release blocker, 1–2.5 mg/kg IV) and/or Bromocriptine (dopamine agonist, 2.5–5 mg PO/NG q8h).`
      },
      {
        id: 'v2c11-s3',
        number: '21.3',
        heading: 'Psychiatric Pharmacotherapy: Clozapine ANC Monitoring & Lithium Toxicity Interactions',
        headingAr: 'مراقبة الكلوزابين (Clozapine ANC) وتداخلات سمية الليثيوم الكلوية',
        evidenceGrade: 'APA Guideline Standard',
        body: `• Clozapine (Treatment-Resistant Schizophrenia & Suicidality Reduction):
  - Most effective antipsychotic, with zero extrapyramidal symptoms (EPS) or tardive dyskinesia, but carries 5 Boxed Warnings: Severe Neutropenia/Agranulocytosis (interrupt Clozapine if ANC <1000 cells/mcL in general population, or <500 cells/mcL in Benign Ethnic Neutropenia), Myocarditis/Cardiomyopathy, Seizures (dose-dependent), Orthostatic hypotension/bradycardia, and Dementia mortality. Also causes severe sialorrhea, weight gain/diabetes, and fatal gastrointestinal hypomotility.
• Lithium Carbonate (Bipolar I Disorder; Narrow Therapeutic Index: Acute Mania 0.8–1.2 mEq/L, Maintenance 0.6–1.0 mEq/L; Toxicity >1.5 mEq/L):
  - 100% renally cleared handling identically to Sodium in the proximal tubule.
  - Drugs that INCREASE Lithium Levels & Precipitate Toxicity: Thiazide diuretics (Hydrochlorothiazide, Chlorthalidone — paradoxical proximal Na+ and Li+ reabsorption), ACE Inhibitors / ARBs, NSAIDs (Ibuprofen, Naproxen, Celecoxib — Aspirin and Sulindac do not significantly alter Lithium levels), and dehydration/low-salt diet.`
      }
    ],
    quickTables: [
      {
        title: 'Serotonin Syndrome vs Neuroleptic Malignant Syndrome (NMS) Differential Matrix',
        titleAr: 'جدول التفريق السريري والعلاجي بين متلازمة السيروتونين ومتلازمة NMS',
        headers: ['Clinical Feature', 'Serotonin Syndrome', 'Neuroleptic Malignant Syndrome (NMS)'],
        rows: [
          ['Causative Agents', 'SSRIs/SNRIs + Linezolid, Tramadol, Fentanyl, MAOIs, Dextromethorphan', 'Dopamine D2 Blockers (Haloperidol, Risperidone, Metoclopramide)'],
          ['Onset Timeline', 'Rapid (< 24 hours)', 'Slow / Insidious (Days to Weeks)'],
          ['Neuromuscular Tone & Reflexes', 'HYPERREFLEXIA, Inducible CLONUS, Myoclonus, Tremor', 'LEAD-PIPE RIGIDITY, Hyporeflexia / Bradyreflexia'],
          ['Pupils & Bowel Sounds', 'Mydriasis (dilated) & Hyperactive bowel sounds / Diarrhea', 'Normal pupils & Normal/Decreased bowel sounds'],
          ['Specific Antidote', 'Cyproheptadine (5-HT2A antagonist) + Benzodiazepines', 'Dantrolene (skeletal muscle relaxant) ± Bromocriptine']
        ]
      }
    ],
    boardPearls: [
      'Clonus and hyperreflexia distinguish Serotonin Syndrome (treated with Cyproheptadine) from the "lead-pipe" rigidity and hyporeflexia of Neuroleptic Malignant Syndrome (treated with Dantrolene/Bromocriptine).',
      'Linezolid and Methylene Blue are reversible non-selective MAO inhibitors; co-administration with SSRIs, SNRIs, Fentanyl, or Tramadol precipitates acute Serotonin Syndrome.',
      'Thiazide diuretics, ACE inhibitors/ARBs, and NSAIDs decrease renal Lithium clearance and precipitate acute Lithium neurotoxicity (coarse tremor, ataxia, seizures, nephrogenic diabetes insipidus).'
    ],
    boardPearlsAr: [
      'الرمع العضلي (Clonus) وفرط المنعكسات يميزان متلازمة السيروتونين (وتُعالج بـ Cyproheptadine) عن التيبس الرصاصي في متلازمة NMS (وتُعالج بـ Dantrolene).',
      'المضاد الحيوي Linezolid وصبغة Methylene Blue يعملان كمثبطات لأكسيداز أحادي الأمين (MAOI) ويسببان متلازمة السيروتونين عند جمعهما مع مضادات الاكتئاب أو الترامادول.',
      'مدرات الثيازيد، مثبطات ACE/ARB، ومضادات الالتهاب NSAIDs ترفع مستوى الليثيوم وتسبب التسمم بالليثيوم.'
    ],
    keywords: ['pediatrics', 'neonates', 'ceftriaxone', 'serotonin syndrome', 'nms', 'cyproheptadine', 'dantrolene', 'clozapine', 'lithium', 'linezolid']
  }
];

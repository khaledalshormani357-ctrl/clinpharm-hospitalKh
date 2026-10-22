import { VerbatimChapter } from '../libraryTypes';

export const accpVol1AdditionalChapters: VerbatimChapter[] = [
  {
    id: 'accp-2026-v1-c2',
    bookId: 'accp-2026-vol1',
    chapterNumber: 2,
    title: 'Chapter 2: Chronic Care in Cardiology (HFrEF/HFpEF, Hypertension, Stable Ischemic Heart Disease & Dyslipidemia)',
    titleAr: 'الفصل 2 (مجلد 1 - ص 1-65): الرعاية المزمنة لأمراض القلب (قصور القلب المزمن، الضغط، الذبحة المستقرة، والشحوم)',
    authors: 'Robert D. Beckett, PharmD, BCPS; ACCP Cardiology Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-65 to 1-148',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-0000-26-056-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c2',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 2: Chronic Care in Cardiology; pp. 1-65 to 1-148.',
    isVerbatimSource: true,
    learningObjectives: [
      'Implement 2026 ACC/AHA/HFSA 4-Pillar GDMT for HFrEF and evaluate electrolyte/renal safety cutoffs for MRA and ARNI therapy.',
      'Construct antianginal regimens for Chronic Coronary Disease (CCD / Stable Ischemic Heart Disease) using Beta-blockers, CCBs, long-acting Nitrates, and Ranolazine.',
      'Select antihypertensive and lipid-lowering therapy in patients with diabetes, chronic kidney disease, and established ASCVD.'
    ],
    toc: [
      { id: 'v1c2-s1', number: '2.1', title: 'Chronic Heart Failure 4-Pillar Optimization & Electrolyte Cutoffs' },
      { id: 'v1c2-s2', number: '2.2', title: 'Chronic Coronary Disease (Stable Angina) Hemodynamic vs Non-Hemodynamic Antianginals' },
      { id: 'v1c2-s3', number: '2.3', title: 'Outpatient Hypertension & ASCVD Lipid Management' }
    ],
    sections: [
      {
        id: 'v1c2-s1',
        number: '2.1',
        heading: 'Chronic Heart Failure 4-Pillar Optimization & Electrolyte Cutoffs',
        headingAr: 'تحسين الركائز الأربع لقصور القلب المزمن وحدود الأمان الكلوية والشاردية',
        evidenceGrade: 'ACC/AHA/HFSA Class I, Level A',
        body: `All patients with HFrEF (LVEF <=40%, Stage C) must be titrated to target doses of four mortality-reducing drug classes:
1. Sacubitril/Valsartan (ARNI — preferred first-line over ACEi/ARB) 97/103 mg PO BID; enforce a mandatory 36-hour washout after the last dose of any ACE inhibitor.
2. Evidence-based Beta-Blocker: Carvedilol 25–50 mg PO BID, Metoprolol Succinate CR/XL 200 mg PO daily, or Bisoprolol 10 mg PO daily. Initiate only when euvolemic/compensated.
3. Mineralocorticoid Receptor Antagonist (Spironolactone 25–50 mg PO daily or Eplerenone 50 mg PO daily): Contraindicated at initiation if baseline Serum K+ >5.0 mEq/L or eGFR <=30 mL/min/1.73m² (or SCr >2.5 mg/dL in men / >2.0 mg/dL in women). Halve the dose if K+ rises to 5.0–5.4 mEq/L, and hold if K+ >=5.5 mEq/L.
4. SGLT2 Inhibitor: Dapagliflozin 10 mg PO daily or Empagliflozin 10 mg PO daily regardless of diabetes status (safe down to eGFR >=20 mL/min/1.73m²).

Drugs to Strictly Avoid in HFrEF (Class III: Harm):
• Non-dihydropyridine CCBs (Verapamil, Diltiazem; negative inotropes that precipitate ADHF).
• Thiazolidinediones (Pioglitazone, Rosiglitazone; fluid retention) and Saxagliptin/Alogliptin (SAVOR-TIMI 53 HF hospitalization risk).
• NSAIDs and COX-2 inhibitors (sodium/water retention and afferent arteriolar vasoconstriction).
• Class I and Class III antiarrhythmics EXCEPT Amiodarone and Dofetilide.`
      },
      {
        id: 'v1c2-s2',
        number: '2.2',
        heading: 'Chronic Coronary Disease (Stable Angina) Hemodynamic vs Non-Hemodynamic Antianginals',
        headingAr: 'علاج الذبحة الصدرية المستقرة: مضادات الذبحة الهيموديناميكية مقابل الرانولازين (Ranolazine)',
        evidenceGrade: 'ACC/AHA CCD Guideline Class I',
        body: `1. First-Line Antianginal Therapy:
• Beta-Blockers (Metoprolol, Atenolol, Carvedilol, Bisoprolol) titrated to resting Heart Rate 55 to 60 bpm are first-line to reduce myocardial oxygen demand (MVO2).
• Calcium Channel Blockers (Amlodipine, Nifedipine XL, Diltiazem, Verapamil) and Long-Acting Nitrates (Isosorbide Mononitrate 30–120 mg PO daily, Isosorbide Dinitrate; requires a mandatory 10-to-14-hour daily nitrate-free interval to prevent sulfhydryl depletion and tachyphylaxis) are used when Beta-blockers are contraindicated or as add-on therapy.
• Sublingual Nitroglycerin (0.3–0.4 mg SL every 5 minutes up to 3 doses; call EMS if chest pain persists 5 minutes after the first dose; store in original amber glass bottle; strictly contraindicated within 24 hours of Sildenafil/Vardenafil or 48 hours of Tadalafil).

2. Ranolazine (Ranexa — Late Inward Sodium Current INa Inhibitor):
• Mechanism: Inhibits late phase inward sodium current in ischemic myocytes, reducing intracellular calcium overload and left ventricular diastolic wall tension WITHOUT affecting Heart Rate or Blood Pressure.
• Clinical Role: Ideal add-on antianginal when baseline Bradycardia (HR <55–60 bpm) or Hypotension (SBP <100 mmHg) precludes further titration of Beta-blockers, CCBs, or Nitrates.
• Contraindications & Interactions: Contraindicated in liver cirrhosis and with strong CYP3A4 inhibitors (Clarithromycin, Ketoconazole) or CYP3A4 inducers (Rifampin). Limits Simvastatin to maximum 20 mg/day and Metformin to maximum 1700 mg/day (when taking Ranolazine 1000 mg BID).`
      },
      {
        id: 'v1c2-s3',
        number: '2.3',
        heading: 'Outpatient Hypertension & ASCVD Lipid Management',
        headingAr: 'ضبط ضغط الدم الخارجي وإدارة شحوم الدم في أمراض الشرايين العصيدية',
        evidenceGrade: 'ACC/AHA Class I, Level A',
        body: `• Blood Pressure Target: <130/80 mmHg for all patients with clinical ASCVD, Heart Failure, Diabetes Mellitus, Chronic Kidney Disease, or 10-year ASCVD risk >=10%.
• High-Intensity Statin Mandate: Atorvastatin 40–80 mg or Rosuvastatin 20–40 mg daily in all patients with clinical ASCVD, baseline LDL-C >=190 mg/dL, or Diabetes with high risk. Add Ezetimibe 10 mg daily followed by a PCSK9 inhibitor (Evolocumab or Alirocumab) if LDL-C remains >=55–70 mg/dL.`
      }
    ],
    quickTables: [
      {
        title: 'Chronic Stable Angina Antianginal Selection by Baseline HR & BP',
        titleAr: 'جدول اختيار أدوية الذبحة الصدرية المستقرة حسب النبض وضغط الدم',
        headers: ['Hemodynamic Profile', 'Preferred Antianginal Regimen', 'Target Endpoint', 'Drugs to Avoid'],
        rows: [
          ['HR >70 bpm & BP >130/80', 'Beta-Blocker (first-line) or Non-DHP CCB (Diltiazem/Verapamil)', 'Resting HR 55–60 bpm; BP <130/80', 'Never combine Beta-blocker + Verapamil/Diltiazem (severe heart block)'],
          ['HR <55 bpm & BP >130/80', 'DHP CCB (Amlodipine 5–10 mg OD) + Long-Acting Nitrate', 'BP <130/80 mmHg (10–14h nitrate-free interval)', 'Avoid Beta-blockers, Verapamil, Diltiazem (worsen bradycardia)'],
          ['HR <55 bpm & SBP <95–100', 'Ranolazine 500–1000 mg PO BID', 'Symptom relief (zero effect on HR or BP)', 'Contraindicated in Cirrhosis or with strong CYP3A4 modulators']
        ]
      }
    ],
    boardPearls: [
      'Ranolazine relieves angina by inhibiting the late inward Na+ current without lowering heart rate or blood pressure.',
      'Long-acting nitrates (Isosorbide mononitrate/dinitrate) require a daily 10-to-14-hour nitrate-free interval to prevent nitrate tolerance.',
      'Sublingual Nitroglycerin is contraindicated within 24 hours of Sildenafil/Vardenafil and within 48 hours of Tadalafil.'
    ],
    boardPearlsAr: [
      'يعالج Ranolazine الذبحة الصدرية دون أي تأثير على النبض أو ضغط الدم، مما يجعله الخيار الأمثل عند انخفاض الضغط أو النبض.',
      'تتطلب النترات طويلة الأمد فترة راحة يومية (10-14 ساعة بدون دواء) لمنع ظاهرة التحمل الدوائي.',
      'يُمنع إعطاء النيتروجليسرين خلال 24 ساعة من Sildenafil أو 48 ساعة من Tadalafil.'
    ],
    keywords: ['chronic cardiology', 'hfref', 'stable angina', 'ranolazine', 'nitrates', 'statin', 'hypertension']
  },
  {
    id: 'accp-2026-v1-c3',
    bookId: 'accp-2026-vol1',
    chapterNumber: 3,
    title: 'Chapter 3: Anticoagulation & Thromboembolism (VTE, Warfarin INR Reversal, HIT & Perioperative Bridging)',
    titleAr: 'الفصل 3 (مجلد 1 - ص 1-149): منع التخثر والجلطات الوريدية (علاج VTE، عكس الوارفارين، متلازمة HIT، والتجسير الجراحي)',
    authors: 'Jennifer A. Bente, PharmD, BCPS; ACCP Anticoagulation Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-149 to 1-214',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'تخثر الدم وأمراض الأوعية',
    uan: '0217-0000-26-056-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c3',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 3: Anticoagulation; pp. 1-149 to 1-214.',
    isVerbatimSource: true,
    learningObjectives: [
      'Design acute and extended-phase Venous Thromboembolism (DVT/PE) treatment regimens using lead-in oral DOACs (Apixaban, Rivaroxaban) versus parenteral lead-in DOACs (Dabigatran, Edoxaban) and LMWH.',
      'Execute CHEST/ACC supratherapeutic Warfarin INR management and life-threatening bleeding reversal (4-Factor PCC, Idarucizumab, Andexanet alfa, Protamine).',
      'Calculate the 4Ts score for Heparin-Induced Thrombocytopenia (HIT) and transition to Argatroban or Bivalirudin.'
    ],
    toc: [
      { id: 'v1c3-s1', number: '3.1', title: 'Acute Venous Thromboembolism (DVT/PE) DOAC & Enoxaparin Dosing Regimens' },
      { id: 'v1c3-s2', number: '3.2', title: 'Warfarin Supratherapeutic INR Management & Specific Anticoagulant Reversal' },
      { id: 'v1c3-s3', number: '3.3', title: 'Heparin-Induced Thrombocytopenia (HIT) 4Ts Score & Argatroban Transition' }
    ],
    sections: [
      {
        id: 'v1c3-s1',
        number: '3.1',
        heading: 'Acute Venous Thromboembolism (DVT/PE) DOAC & Enoxaparin Dosing Regimens',
        headingAr: 'بروتوكولات علاج الخثار الوريدي العميق والانصمام الرئوي (VTE)',
        evidenceGrade: 'CHEST Guideline Grade 1B',
        body: `For acute DVT or PE, Direct Oral Anticoagulants (DOACs) are preferred over Warfarin and LMWH in both non-cancer and cancer-associated VTE (Apixaban, Edoxaban, or Rivaroxaban preferred in cancer; avoid Rivaroxaban/Edoxaban inluminal GI/GU malignancies due to mucosal bleeding, where Apixaban or Enoxaparin is preferred):
1. Oral Monotherapy DOACs (NO Parenteral Heparin Lead-In Required):
   - Apixaban: 10 mg PO BID for 7 days, followed by 5 mg PO BID for >=3 months (notice: the AFib 2-of-3 ABC dose reduction rule does NOT apply to acute VTE treatment!).
   - Rivaroxaban: 15 mg PO BID with food for 21 days, followed by 20 mg PO once daily with food.
2. DOACs Requiring 5 to 10 Days of Parenteral Anticoagulation Lead-In (UFH or Enoxaparin):
   - Dabigatran: 5–10 days of parenteral anticoagulation, then 150 mg PO BID (if CrCl >30 mL/min).
   - Edoxaban: 5–10 days of parenteral anticoagulation, then 60 mg PO once daily (reduce to 30 mg PO once daily if CrCl 15–50 mL/min, body weight <=60 kg, or on potent P-gp inhibitors).
3. Enoxaparin (LMWH) Renal Cutoffs:
   - VTE Treatment: 1 mg/kg SC every 12 hours (or 1.5 mg/kg SC every 24 hours). If CrCl <30 mL/min: reduce treatment dose to 1 mg/kg SC every 24 hours!
   - VTE Prophylaxis: 40 mg SC every 24 hours. If CrCl <30 mL/min: reduce prophylaxis dose to 30 mg SC every 24 hours (or use Unfractionated Heparin 5000 units SC q8–12h).`
      },
      {
        id: 'v1c3-s2',
        number: '3.2',
        heading: 'Warfarin Supratherapeutic INR Management & Specific Anticoagulant Reversal',
        headingAr: 'تدبير ارتفاع INR فوق العلاجي وبروتوكولات عكس مضادات التخثر في النزف المهدد للحياة',
        evidenceGrade: 'CHEST / ACC Reversal Consensus',
        body: `1. Management of Elevated Warfarin INR WITHOUT Significant Bleeding (CHEST Guidelines):
• INR 4.5 to 10.0 (No Bleeding): Hold 1 to 2 doses of Warfarin, monitor INR, and resume at a reduced weekly maintenance dose once INR is in therapeutic range. Routine oral Vitamin K is NOT recommended for INR 4.5–10 without bleeding.
• INR >10.0 (No Bleeding): Hold Warfarin AND administer Oral Vitamin K1 (Phytonadione) 2.5 to 5 mg PO once (avoid SC Vitamin K due to erratic absorption; avoid IV Vitamin K unless major bleeding is present due to anaphylactoid risk).
• Life-Threatening or Intracranial Bleeding on Warfarin (Any Elevated INR): Hold Warfarin + Administer 4-Factor Prothrombin Complex Concentrate (4F-PCC, Kcentra, 25–50 units/kg IV based on INR and body weight; normalizes INR within 15 minutes without volume overload of FFP) + Vitamin K1 5 to 10 mg by slow IV infusion over 30 minutes (to sustain factor synthesis once PCC wears off at 12–24h).

2. Specific Anticoagulant Reversal Antidotes:
• Dabigatran: Idarucizumab (Praxbind) 5 g IV (administered as two consecutive 2.5 g vials).
• Apixaban & Rivaroxaban: Andexanet alfa (Andexxa; recombinant modified Factor Xa decoy) OR 4-Factor PCC 50 units/kg IV (max 4000 units).
• Unfractionated Heparin (UFH): Protamine Sulfate 1 mg IV per 100 units of UFH infused over the preceding 2–3 hours (MAXIMUM single dose 50 mg infused at <=5 mg/min).`
      },
      {
        id: 'v1c3-s3',
        number: '3.3',
        heading: 'Heparin-Induced Thrombocytopenia (HIT) 4Ts Score & Argatroban Transition',
        headingAr: 'متلازمة نقص الصفيحات المحدث بالهيبارين (HIT) والانتقال إلى Argatroban والوارفارين',
        evidenceGrade: 'ASH HIT Guideline Class I',
        body: `Type II Heparin-Induced Thrombocytopenia (HIT) is a prothrombotic autoimmune disorder caused by IgG antibodies against Platelet Factor 4 (PF4)-heparin complexes:
• Clinical Hallmarks (4Ts Score): Platelet count drop >=50% (typically to nadir 20,000–100,000/mm³) occurring 5 to 10 days after heparin exposure (or <24 hours if heparin exposure within the prior 30 days), accompanied by arterial/venous thrombosis rather than bleeding.
• Immediate Management when 4Ts Score >=4 (Intermediate/High Probability):
  1. Discontinue ALL forms of Heparin immediately (including LMWH, heparin flushes, and heparin-coated catheters).
  2. Initiate a non-heparin Direct Thrombin Inhibitor (Argatroban 2 mcg/kg/min IV infusion — hepatically cleared, reduced to 0.5 mcg/kg/min in Child-Pugh B/C hepatic impairment; OR Bivalirudin) or Fondaparinux.
  3. NEVER initiate Warfarin in acute HIT until platelets recover to >=150,000/mm³ (early Warfarin depletes Protein C and causes venous limb gangrene). If the patient is already taking Warfarin when HIT is diagnosed, administer Vitamin K 5–10 mg PO/IV to reverse Warfarin.
  4. Argatroban Falsely Elevates INR: When transitioning from Argatroban to Warfarin (once platelets >=150,000/mm³), overlap for >=5 days until the combined INR on Argatroban + Warfarin exceeds >4.0, then stop Argatroban and recheck INR in 4–6 hours (target therapeutic INR 2.0–3.0).`
      }
    ],
    quickTables: [
      {
        title: 'Anticoagulant Emergency Reversal & Antidote Reference Table',
        titleAr: 'جدول الترياق النوعي لعكس مضادات التخثر في حالات النزف الحرج',
        headers: ['Anticoagulant', 'Specific Reversal Antidote', 'Dosing Protocol', 'Critical Pearl'],
        rows: [
          ['Warfarin (Major Bleed)', '4-Factor PCC (Kcentra) + IV Vitamin K1', '25–50 U/kg 4F-PCC + Vitamin K 5–10 mg IV slow', '4F-PCC preferred over FFP; contains heparin (contraindicated in HIT)'],
          ['Dabigatran', 'Idarucizumab (Praxbind)', '5 g IV (two 2.5 g vials)', 'Monoclonal antibody fragment; also dialyzable'],
          ['Apixaban / Rivaroxaban', 'Andexanet alfa (Andexxa) or 4F-PCC', 'Low/High dose bolus + 2h infusion (or 4F-PCC 50 U/kg)', 'Not dialyzable due to high protein binding'],
          ['Unfractionated Heparin', 'Protamine Sulfate', '1 mg per 100 units UFH (last 2–3h), max 50 mg', 'Only partially (~60%) reverses Enoxaparin; zero reversal of Fondaparinux']
        ]
      }
    ],
    boardPearls: [
      '4-Factor PCC (Kcentra) contains trace heparin and is strictly contraindicated in patients with a history of Heparin-Induced Thrombocytopenia (HIT).',
      'In acute VTE treatment, Apixaban (10 mg BID × 7d -> 5 mg BID) and Rivaroxaban (15 mg BID × 21d -> 20 mg OD) do NOT require parenteral heparin lead-in, whereas Dabigatran and Edoxaban require 5–10 days of parenteral anticoagulation first.',
      'Argatroban is hepatically metabolized and significantly prolongs the INR — require a combined INR >4.0 during Warfarin overlap before stopping Argatroban.'
    ],
    boardPearlsAr: [
      'يحتوي مركب 4F-PCC (Kcentra) على آثار من الهيبارين؛ لذا يُمنع استخدامه في مرضى متلازمة HIT.',
      'في علاج الجلطات الوريدية الحادة (VTE)، يبدأ Apixaban و Rivaroxaban فموياً مباشرة، بينما يتطلب Dabigatran و Edoxaban إعطاء هيبارين وريدي لمدة 5-10 أيام أولاً.',
      'يرفع Argatroban قيمة INR كاذباً؛ لذا عند التحويل للوارفارين يجب الوصول إلى INR > 4.0 أثناء التداخل قبل إيقاف Argatroban.'
    ],
    keywords: ['anticoagulation', 'vte', 'dvt', 'pe', 'warfarin', 'inr', 'kcentra', 'pcc', 'hit', 'argatroban', 'enoxaparin']
  },
  {
    id: 'accp-2026-v1-c4',
    bookId: 'accp-2026-vol1',
    chapterNumber: 4,
    title: 'Chapter 4: Common Infectious Diseases (CAP, HAP/VAP, UTI, Meningitis, Endocarditis & C. difficile)',
    titleAr: 'الفصل 4 (مجلد 1 - ص 1-215): الأمراض المعدية الشائعة (ذات الرئة، التهاب السحايا، التهاب الشغاف، و C. difficile)',
    authors: 'ACCP Infectious Diseases Preparatory Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-215 to 1-294',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'الأمراض المعدية وترشيد المضادات',
    uan: '0217-0000-26-057-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c4',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 4: Common Infectious Diseases; pp. 1-215 to 1-294.',
    isVerbatimSource: true,
    learningObjectives: [
      'Select empiric outpatient and inpatient regimens for Community-Acquired Pneumonia (CAP) and nosocomial HAP/VAP.',
      'Apply 2021/2026 IDSA/SHEA Clostridioides difficile guidelines (Fidaxomicin vs oral Vancomycin, Fulminant CDI, and Bezlotoxumab).',
      'Formulate age-stratified empiric bacterial meningitis regimens plus adjunctive Dexamethasone timing.'
    ],
    toc: [
      { id: 'v1c4-s1', number: '4.1', title: 'Community-Acquired Pneumonia (CAP) & Bacterial Meningitis Empiric Regimens' },
      { id: 'v1c4-s2', number: '4.2', title: 'IDSA/SHEA Clostridioides difficile Infection (CDI) Treatment & Recurrence Prevention' },
      { id: 'v1c4-s3', number: '4.3', title: 'Asymptomatic Bacteriuria, Acute Cystitis, Pyelonephritis & SSTIs' }
    ],
    sections: [
      {
        id: 'v1c4-s1',
        number: '4.1',
        heading: 'Community-Acquired Pneumonia (CAP) & Bacterial Meningitis Empiric Regimens',
        headingAr: 'البروتوكولات القياسية لذات الرئة المكتسبة من المجتمع (CAP) والتهاب السحايا الجرثومي',
        evidenceGrade: 'IDSA/ATS Class I, Level A',
        body: `1. Community-Acquired Pneumonia (IDSA/ATS Guidelines):
• Outpatient without Comorbidities: Amoxicillin 1 g PO TID, Doxycycline 100 mg PO BID, OR a Macrolide (Azithromycin 500 mg Day 1 then 250 mg Days 2–5 ONLY if local pneumococcal macrolide resistance is <25%).
• Outpatient WITH Comorbidities (heart, lung, liver, or renal disease; diabetes; alcoholism; malignancy; asplenia): Combination of Amoxicillin/Clavulanate (875/125 mg PO BID or 2000/125 mg ER BID) or Cephalosporin (Cefpodoxime/Cefuroxime) PLUS a Macrolide (Azithromycin) or Doxycycline; OR Monotherapy with a Respiratory Fluoroquinolone (Levofloxacin 750 mg PO daily or Moxifloxacin 400 mg PO daily; Ciprofloxacin lacks pneumococcal coverage and is NEVER a respiratory fluoroquinolone!).
• Non-Severe Inpatient CAP (No MRSA/Pseudomonas risk): Ceftriaxone 1–2 g IV q24h (or Ampicillin/Sulbactam 3 g IV q6h) PLUS Azithromycin 500 mg IV/PO daily; OR Levofloxacin 750 mg / Moxifloxacin 400 mg monotherapy.

2. Acute Bacterial Meningitis (Age-Stratified Empiric Therapy):
• Adults 18 to 49 years (S. pneumoniae, N. meningitidis): Ceftriaxone 2 g IV every 12 hours + Vancomycin 15–20 mg/kg IV every 8–12 hours.
• Adults >=50 years, Neonates (<1 month), Pregnant, or Immunocompromised (adds Listeria monocytogenes risk): ADD Ampicillin 2 g IV every 4 hours (or TMP-SMX in severe penicillin allergy) to cover Listeria!
• Adjunctive Dexamethasone (0.15 mg/kg IV q6h × 4 days): Administer 10 to 20 minutes BEFORE or concomitant with the FIRST antibiotic dose to reduce neurologic sequelae and mortality in Streptococcus pneumoniae meningitis (do NOT start Dexamethasone if antibiotics have already been running).`
      },
      {
        id: 'v1c4-s2',
        number: '4.2',
        heading: 'IDSA/SHEA Clostridioides difficile Infection (CDI) Treatment & Recurrence Prevention',
        headingAr: 'توصيات IDSA/SHEA لعلاج التهاب القولون بـ C. difficile ومنع الانتكاس',
        evidenceGrade: 'IDSA/SHEA Focused Update',
        body: `1. Initial Episode of Non-Fulminant CDI (Non-severe or Severe [WBC >=15,000 cells/mm³ or SCr >=1.5 mg/dL]):
• Preferred First-Line: Fidaxomicin 200 mg PO BID for 10 days (significantly lowers recurrence rate compared to Vancomycin).
• Acceptable Alternative: Vancomycin 125 mg PO QID for 10 days. (Note: Intravenous Vancomycin does NOT penetrate the colonic lumen and is completely ineffective for CDI unless accompanied by oral/rectal Vancomycin!). Metronidazole is no longer recommended first-line.

2. First or Subsequent Recurrence of CDI:
• Fidaxomicin 200 mg PO BID × 10 days (or extended-pulsed regimen: 200 mg BID × 5 days, then 200 mg every other day on Days 7–25) OR Oral Vancomycin tapered-and-pulsed regimen over 6–8 weeks.
• Adjunctive Bezlotoxumab (10 mg/kg IV single infusion during standard CDI antibiotic therapy): Human monoclonal antibody binding C. difficile Toxin B; indicated for recurrence prevention in high-risk patients (age >=65, immunocompromised, severe CDI, or >=1 prior CDI episode within 6 months). Caution in patients with history of congestive heart failure!

3. Fulminant CDI (Hypotension/Shock, Ileus, or Toxic Megacolon):
• Oral Vancomycin 500 mg PO/NG four times daily PLUS Intravenous Metronidazole 500 mg IV every 8 hours (plus Rectal Vancomycin retention enema 500 mg in 100 mL NS every 6 hours if ileus is present).`
      },
      {
        id: 'v1c4-s3',
        number: '4.3',
        heading: 'Asymptomatic Bacteriuria, Acute Cystitis, Pyelonephritis & SSTIs',
        headingAr: 'البيلة الجرثومية اللاعرضية، التهاب المثانة والكلية، وعدوى الجلد والأنسجة الرخوة',
        evidenceGrade: 'IDSA Guideline Standard',
        body: `• Asymptomatic Bacteriuria (ASB): Screen and treat ONLY in TWO populations: (1) Pregnant women, and (2) Patients undergoing invasive urologic procedures expected to cause mucosal bleeding. Do NOT treat ASB in older adults, diabetic patients, or patients with indwelling Foley catheters.
• Acute Uncomplicated Cystitis First-Line Regimens:
  - Nitrofurantoin monohydrate/macrocrystals 100 mg PO BID × 5 days (contraindicated if CrCl <30 mL/min or pyelonephritis).
  - Trimethoprim-Sulfamethoxazole (TMP-SMX) 160/800 mg (1 DS tablet) PO BID × 3 days (if local E. coli resistance <20%).
  - Fosfomycin tromethamine 3 g PO single dose (never use for pyelonephritis).`
      }
    ],
    quickTables: [
      {
        title: 'IDSA/SHEA Clostridioides difficile Infection (CDI) Regimen Matrix',
        titleAr: 'جدول علاج التهاب القولون الغشائي الكاذب (C. difficile) حسب شدة الحالة',
        headers: ['Clinical Stage', 'Preferred Regimen', 'Alternative Regimen', 'Critical Clinical Pearl'],
        rows: [
          ['Initial Episode (Non-severe or Severe)', 'Fidaxomicin 200 mg PO BID × 10 days', 'Vancomycin 125 mg PO QID × 10 days', 'IV Vancomycin is ineffective; stop inciting antibiotics & unnecessary PPIs'],
          ['First / Multiple Recurrence', 'Fidaxomicin 200 mg BID × 10d (or pulsed) + Bezlotoxumab 10 mg/kg IV', 'Vancomycin tapered & pulsed regimen (6–8 weeks)', 'Bezlotoxumab binds Toxin B; caution in Heart Failure'],
          ['Fulminant CDI (Shock, Ileus, Megacolon)', 'Vancomycin 500 mg PO/NG QID + Metronidazole 500 mg IV q8h', 'Add Vancomycin 500 mg PR enema q6h if ileus present', 'Urgent surgical consultation for colectomy if lactate >=5 mmol/L']
        ]
      }
    ],
    boardPearls: [
      'Ciprofloxacin has poor activity against Streptococcus pneumoniae and must NEVER be used as empiric therapy for Community-Acquired Pneumonia (use Levofloxacin 750 mg or Moxifloxacin 400 mg).',
      'Moxifloxacin undergoes biliary/hepatic elimination and achieves poor urinary concentrations; never use Moxifloxacin for urinary tract infections or pyelonephritis.',
      'Add Ampicillin 2 g IV q4h to Ceftriaxone + Vancomycin for bacterial meningitis in adults >=50 years old, neonates, or immunocompromised patients to cover Listeria monocytogenes.'
    ],
    boardPearlsAr: [
      'السيبروفلوكساسين ضعيف جداً ضد المكورات الرئوية ولا يُستخدم أبداً لعلاج ذات الرئة المكتسبة من المجتمع (CAP).',
      'الموكسيفلوكساسين يُطرح عبر الكبد ولا يصل بتراكيز كافية للبول؛ لذا يُمنع استخدامه في التهابات المسالك البولية.',
      'يجب إضافة Ampicillin 2 جم كل 4 ساعات لعلاج التهاب السحايا في المرضى بعمر >= 50 عاماً لتغطية بكتيريا Listeria.'
    ],
    keywords: ['cap', 'meningitis', 'listeria', 'ampicillin', 'c. difficile', 'fidaxomicin', 'vancomycin', 'uti', 'nitrofurantoin']
  },
  {
    id: 'accp-2026-v1-c5',
    bookId: 'accp-2026-vol1',
    chapterNumber: 5,
    title: 'Chapter 5: HIV Pharmacotherapy, Opportunistic Infections, Tuberculosis & Viral Hepatitis',
    titleAr: 'الفصل 5 (مجلد 1 - ص 1-295): علاج فيروس نقص المناعة (HIV)، العدوى الانتهازية، السل الرئوي، والتهاب الكبد الفيروسي',
    authors: 'ACCP HIV & Infectious Diseases Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-295 to 1-354',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'الأمراض المعدية والفيروسية',
    uan: '0217-0000-26-057-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c5',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 5: HIV, Opportunistic Infections & Tuberculosis; pp. 1-295 to 1-354.',
    isVerbatimSource: true,
    learningObjectives: [
      'Initiate first-line Integrase Strand Transfer Inhibitor (INSTI)-based antiretroviral therapy (Bictegravir/TAF/FTC or Dolutegravir-based regimens) and manage polyvalent cation chelation.',
      'Apply CD4 T-lymphocyte thresholds (<200, <100, <50 cells/mm³) for Opportunistic Infection (OI) prophylaxis and treatment.',
      'Manage active Mycobacterium tuberculosis RIPE therapy toxicity and Rifampin CYP450/P-gp enzyme induction.'
    ],
    toc: [
      { id: 'v1c5-s1', number: '5.1', title: 'First-Line INSTI Antiretroviral Therapy, HLA-B*5701 & Cation Chelation' },
      { id: 'v1c5-s2', number: '5.2', title: 'HIV Opportunistic Infection Prophylaxis & Treatment Thresholds by CD4 Count' },
      { id: 'v1c5-s3', number: '5.3', title: 'Tuberculosis (RIPE) Hepatotoxicity, Neuropathy & Rifampin Drug Interactions' }
    ],
    sections: [
      {
        id: 'v1c5-s1',
        number: '5.1',
        heading: 'First-Line INSTI Antiretroviral Therapy, HLA-B*5701 & Cation Chelation',
        headingAr: 'مضادات الفيروسات القهقرية من الجيل الحديث (INSTIs)، فحص HLA-B*5701، والتداخلات المخلبية',
        evidenceGrade: 'DHHS HIV Guideline Class I, Level A',
        body: `1. Recommended Initial Antiretroviral Regimens for Most People with HIV:
• Bictegravir / Tenofovir alafenamide / Emtricitabine (BIC/TAF/FTC — Biktarvy) once daily.
• Dolutegravir (DTG) + (TAF or TDF) + (FTC or 3TC) once daily.
• Dolutegravir / Lamivudine (DTG/3TC — Dovato) once daily ONLY if HIV RNA <500,000 copies/mL, no Hepatitis B co-infection, and baseline resistance genotype obtained.

2. Critical Nucleoside Reverse Transcriptase Inhibitor (NRTI) & INSTI Safety Rules:
• Abacavir (ABC): Mandatory HLA-B*5701 pharmacogenetic screening prior to initiation. If HLA-B*5701 is POSITIVE, Abacavir is strictly contraindicated due to potentially fatal multiorgan hypersensitivity reaction.
• Tenofovir Disoproxil Fumarate (TDF) vs Tenofovir Alafenamide (TAF): TDF causes proximal renal tubular dysfunction (Fanconi syndrome) and bone mineral density loss; TAF achieves higher intracellular lymphoid levels at 90% lower plasma concentrations, significantly reducing renal and bone toxicity.
• Integrase Inhibitor (BIC, DTG, Raltegravir, Elvitegravir) Polyvalent Cation Chelation: All INSTIs bind divalent/trivalent cations (Calcium, Magnesium, Aluminum, Iron, Sucralfate) in the GI tract, causing virologic failure. Administer Biktarvy or Dolutegravir 2 hours BEFORE or 6 hours AFTER antacids/iron/calcium (or simultaneous WITH food for Calcium/Iron only).
• Dolutegravir + Metformin Interaction: Dolutegravir inhibits renal OCT2 transporters, doubling Metformin exposure; limit maximum daily Metformin dose to 1000 mg/day when co-administered with Dolutegravir.`
      },
      {
        id: 'v1c5-s2',
        number: '5.2',
        heading: 'HIV Opportunistic Infection Prophylaxis & Treatment Thresholds by CD4 Count',
        headingAr: 'عتبات خلايا CD4 للوقاية وعلاج العدوى الانتهازية في مرضى HIV',
        evidenceGrade: 'NIH/CDC/IDSA OI Guidelines',
        body: `• CD4 <200 cells/mm³ (or <14%, or Oral Candidiasis) — Pneumocystis jirovecii Pneumonia (PJP):
  - Prophylaxis: TMP-SMX 1 DS or 1 SS tablet PO daily (alternatives: Dapsone 100 mg daily after checking G6PD, Atovaquone 1500 mg daily with food, or Aerosolized Pentamidine). Discontinue when CD4 >200 cells/mm³ for >3 months on ART.
  - Moderate-to-Severe PJP Treatment: TMP-SMX (15–20 mg/kg/day of TMP component IV/PO divided q6–8h × 21 days). ADD Adjunctive Prednisone (40 mg PO BID × 5d, 40 mg daily × 5d, 20 mg daily × 11d) within 72 hours ONLY if arterial PaO2 <70 mmHg on room air or A-a gradient >=35 mmHg!
• CD4 <100 cells/mm³ AND Toxoplasma IgG Positive — Toxoplasma gondii Encephalitis:
  - Prophylaxis: TMP-SMX 1 DS tablet PO daily (covers both PJP and Toxoplasmosis!). Discontinue when CD4 >200 cells/mm³ for >3 months.
• CD4 <50 cells/mm³ — Disseminated Mycobacterium avium Complex (MAC):
  - Primary prophylaxis (Azithromycin 1200 mg PO weekly) is NO LONGER recommended if the patient is immediately initiating effective ART; indicate only if ART is delayed or viremia persists despite ART.`
      },
      {
        id: 'v1c5-s3',
        number: '5.3',
        heading: 'Tuberculosis (RIPE) Hepatotoxicity, Neuropathy & Rifampin Drug Interactions',
        headingAr: 'علاج السل الرئوي النشط (RIPE)، السمية الدوائية، وتداخلات الريفامبين',
        evidenceGrade: 'CDC/ATS/IDSA Tuberculosis Guideline',
        body: `Active drug-susceptible tuberculosis requires a 2-month intensive phase of 4 drugs—Rifampin (R), Isoniazid (I), Pyrazinamide (P), and Ethambutol (E)—followed by a 4-month continuation phase of Isoniazid + Rifampin:
• Isoniazid (INH): Causes peripheral neuropathy by depleting pyridoxal-5-phosphate; always co-administer Pyridoxine (Vitamin B6) 25–50 mg PO daily (mandatory in pregnancy, HIV, diabetes, renal failure, alcoholism, and malnutrition). Also causes hepatotoxicity and drug-induced lupus.
• Rifampin: Potent pan-inducer of CYP3A4, CYP2C9, CYP2C19, UGT1A1, and P-glycoprotein; turns urine/tears/sweat orange-red. In HIV patients taking Biktarvy (contraindicated with Rifampin) or Dolutegravir, Dolutegravir must be increased to 50 mg PO TWICE daily when combined with Rifampin (or substitute Rifabutin).
• Pyrazinamide: Causes hyperuricemia, polyarthralgia, and hepatotoxicity.
• Ethambutol: Causes retrobulbar optic neuritis (loss of red-green color vision and visual acuity; contraindicated in young children unable to report visual symptoms).`
      }
    ],
    quickTables: [
      {
        title: 'HIV Opportunistic Infection CD4 Thresholds & First-Line Regimens',
        titleAr: 'جدول عتبات CD4 للوقاية من العدوى الانتهازية وعلاجها في مرضى HIV',
        headers: ['Opportunistic Pathogen', 'CD4 Trigger Threshold', 'First-Line Prophylaxis', 'First-Line Active Treatment'],
        rows: [
          ['Pneumocystis jirovecii (PJP)', 'CD4 <200 cells/mm³ (or thrush)', 'TMP-SMX 1 DS or 1 SS PO daily', 'TMP-SMX 15–20 mg/kg/d IV/PO + Prednisone if PaO2 <70 mmHg'],
          ['Toxoplasma gondii', 'CD4 <100 cells/mm³ + Toxo IgG+', 'TMP-SMX 1 DS PO daily', 'Pyrimethamine + Sulfadiazine + Leucovorin'],
          ['Cryptococcus neoformans', 'CD4 <100 (No primary prophylaxis)', 'None recommended', 'Liposomal Amphotericin B + Flucytosine × 2w, then Fluconazole']
        ]
      }
    ],
    boardPearls: [
      'Always add adjunctive corticosteroids (Prednisone taper × 21 days) in HIV PJP pneumonia when room-air PaO2 <70 mmHg or A-a gradient >=35 mmHg.',
      'Check HLA-B*5701 before prescribing Abacavir, and check G6PD before prescribing Dapsone or Primaquine.',
      'Integrase inhibitors (Bictegravir, Dolutegravir) chelate with polyvalent cations (Ca2+, Mg2+, Al3+, Fe2+) — separate administration by 2 hours before or 6 hours after.'
    ],
    boardPearlsAr: [
      'يُضاف البريدنيزون (Prednisone) إلزامياً لعلاج ذات الرئة بـ PJP إذا كان ضغط الأكسجين الشرياني PaO2 < 70 mmHg.',
      'يجب فحص جين HLA-B*5701 قبل إعطاء Abacavir، وفحص إنزيم G6PD قبل إعطاء Dapsone.',
      'تتفاعل مثبطات الإنتغراز (Biktarvy, Dolutegravir) مع الكالسيوم والحديد والمغنيسيوم؛ لذا يجب الفصل الزمني بينهما.'
    ],
    keywords: ['hiv', 'biktarvy', 'dolutegravir', 'abacavir', 'pjp', 'toxoplasmosis', 'tuberculosis', 'rifampin', 'isoniazid', 'pyridoxine']
  },
  {
    id: 'accp-2026-v1-c7',
    bookId: 'accp-2026-vol1',
    chapterNumber: 7,
    title: 'Chapter 7: Fluids, Electrolytes, Acid-Base Disorders & Enteral/Parenteral Nutrition',
    titleAr: 'الفصل 7 (مجلد 1 - ص 1-405): السوائل، الكهارل، اضطرابات التوازن الحامضي القاعدي، والتغذية الوريدية',
    authors: 'ACCP Critical Care & Nutrition Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-405 to 1-462',
    systemCategory: 'Nephrology & Fluids',
    systemCategoryAr: 'السوائل والكهارل والتغذية السريرية',
    uan: '0217-0000-26-058-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c7',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 7: Fluids, Electrolytes & Nutrition; pp. 1-405 to 1-462.',
    isVerbatimSource: true,
    learningObjectives: [
      'Manage acute and chronic hyponatremia safely (<8–10 mEq/L/24h correction ceiling) to prevent Osmotic Demyelination Syndrome (ODS).',
      'Correct severe symptomatic hypokalemia, hyperkalemia, hypomagnesemia, and hypercalcemia of malignancy.',
      'Calculate Parenteral Nutrition (TPN) macronutrient kilocalories, nitrogen balance, and prevent Refeeding Syndrome.'
    ],
    toc: [
      { id: 'v1c7-s1', number: '7.1', title: 'Hyponatremia & Hypernatremia Correction Ceilings (Osmotic Demyelination Prevention)' },
      { id: 'v1c7-s2', number: '7.2', title: 'Potassium, Magnesium, Calcium & Phosphate Emergency Protocols' },
      { id: 'v1c7-s3', number: '7.3', title: 'Parenteral Nutrition (TPN) Caloric Calculations & Refeeding Syndrome' }
    ],
    sections: [
      {
        id: 'v1c7-s1',
        number: '7.1',
        heading: 'Hyponatremia & Hypernatremia Correction Ceilings (Osmotic Demyelination Prevention)',
        headingAr: 'ضوابط تصحيح نقص وفرط الصوديوم والوقاية من متلازمة التحلل المياليني التناضحي (ODS)',
        evidenceGrade: 'Consensus Critical Care Guideline',
        body: `1. Hyponatremia (Serum Na+ <135 mEq/L) Classification & Correction Ceiling:
• Severe Symptomatic Hyponatremia (Seizures, Coma, Obtundation, Respiratory Arrest): Administer 3% Hypertonic Saline 100 to 150 mL IV bolus over 10 to 20 minutes (may repeat up to 2 times) to achieve an immediate acute Serum Na+ rise of 4 to 6 mEq/L, which halts cerebral edema and herniation.
• Mandatory 24-Hour Correction Limit: Total Serum Na+ increase MUST NOT EXCEED 8 to 10 mEq/L in the first 24 hours (and <=6 to 8 mEq/L per 24 hours in high-risk patients with cirrhosis, alcoholism, malnutrition, or severe hypokalemia) and <=18 mEq/L over 48 hours. Exceeding this rate causes irreversible Osmotic Demyelination Syndrome (Central Pontine Myelinolysis). If overcorrection occurs, administer D5W + Desmopressin (DDAVP) 2 mcg IV to re-lower Na+.
• SIADH Management: Euvolemic hypotonic hyponatremia with inappropriately concentrated urine (Urine Osm >100 mOsm/kg, Urine Na+ >30–40 mEq/L) and normal thyroid/adrenal function. Treat with fluid restriction (<800–1000 mL/day), oral salt tablets + Furosemide, or Tolvaptan (V2 receptor antagonist; initiate in hospital, contraindicated in autosomal dominant polycystic kidney disease hepatotoxicity or with strong CYP3A4 inhibitors).`
      },
      {
        id: 'v1c7-s2',
        number: '7.2',
        heading: 'Potassium, Magnesium, Calcium & Phosphate Emergency Protocols',
        headingAr: 'بروتوكولات الطوارئ لتعويض البوتاسيوم والمغنيسيوم والفوسفات وعلاج فرط الكالسيوم',
        evidenceGrade: 'Hospital Critical Care Standard',
        body: `• Hypokalemia & Refractory Magnesium Rule: Every 0.3–0.4 mEq/L drop in Serum K+ below 4.0 mEq/L reflects an approximate 100 mEq total body potassium deficit (in the absence of acid-base shifts). Always correct concomitant Hypomagnesemia (Serum Mg2+ <1.8 mg/dL) with IV Magnesium Sulfate 2–4 g infused slowly over 2–4 hours (~1 g/hour max in non-emergent settings to prevent renal Mg wasting via loop of Henle threshold), because intracellular Mg2+ is required to inhibit ROMK potassium secretion in the cortical collecting duct.
• Severe Hypercalcemia of Malignancy (Corrected Ca2+ >14 mg/dL; Corrected Ca = Measured Ca + [0.8 × (4.0 − Albumin)]):
  1. Immediate Intravascular Volume Expansion: 0.9% NaCl at 200–300 mL/hour (to restore GFR and calciuria; add Furosemide ONLY if volume overload develops).
  2. Calcitonin 4 IU/kg SC/IM every 12 hours for 48 hours (rapid onset within 4–6 hours; tachyphylaxis develops after 48 hours).
  3. Intravenous Bisphosphonate: Zoledronic Acid 4 mg IV over >=15 minutes or Pamidronate 60–90 mg IV over 2–4 hours (onset 2–4 days, sustained effect; Denosumab 120 mg SC is preferred in severe renal failure where bisphosphonates are contraindicated).`
      },
      {
        id: 'v1c7-s3',
        number: '7.3',
        heading: 'Parenteral Nutrition (TPN) Caloric Calculations & Refeeding Syndrome',
        headingAr: 'حسابات السعرات الحرارية في التغذية الوريدية الكاملة (TPN) ومتلازمة إعادة التغذية',
        evidenceGrade: 'ASPEN Clinical Guideline',
        body: `• Parenteral Nutrition (TPN) Caloric Yields (High-Yield Board Calculations):
  - Hydrous Dextrose (in TPN): 3.4 kcal/g (maximum dextrose infusion rate in ICU: <=4–5 mg/kg/min to prevent hyperglycemia and hepatic steatosis).
  - Crystalline Amino Acids (Protein): 4.0 kcal/g (1 g of Nitrogen = 6.25 g of Protein).
  - Intravenous Lipid Injectable Emulsion (ILE): 10% Lipid emulsion = 1.1 kcal/mL; 20% Lipid emulsion = 2.0 kcal/mL; 30% Lipid emulsion = 3.0 kcal/mL (or ~10 kcal/g of fat; note Propofol is formulated in 10% lipid emulsion providing 1.1 kcal/mL!).
• Refeeding Syndrome: Reintroducing carbohydrates in chronically malnourished patients triggers an insulin surge that drives Phosphorus, Potassium, and Magnesium into cells, causing fatal respiratory muscle failure and arrhythmias, alongside acute Thiamine (Vitamin B1) depletion (Wernicke encephalopathy / lactic acidosis). Replete electrolytes and give Thiamine 100 mg IV daily BEFORE initiating nutrition.`
      }
    ],
    quickTables: [
      {
        title: 'Parenteral Nutrition (TPN) Macronutrient Caloric Equivalents',
        titleAr: 'جدول المكافئات الحرارية لعناصر التغذية الوريدية الكاملة (TPN)',
        headers: ['Macronutrient Component', 'Caloric Density', 'ICU Maximum / Target Rate', 'Clinical Calculation Pearl'],
        rows: [
          ['Dextrose (Hydrous IV)', '3.4 kcal / gram', 'Max infusion rate <=4–5 mg/kg/min', 'Enteral carbohydrate provides 4.0 kcal/g, but IV dextrose is 3.4 kcal/g'],
          ['Amino Acids (Protein)', '4.0 kcal / gram', 'ICU target: 1.2–2.0 g/kg/day (up to 2.5 in CRRT)', 'Grams of Nitrogen = Grams of Protein / 6.25'],
          ['IV Lipid Emulsion (ILE)', '10% = 1.1 kcal/mL | 20% = 2.0 kcal/mL', 'Keep Serum Triglycerides <400 mg/dL', 'Propofol 1% is in 10% soy lipid -> count 1.1 kcal/mL toward lipid calories']
        ]
      }
    ],
    boardPearls: [
      'Never correct chronic hyponatremia faster than 8 to 10 mEq/L in the first 24 hours to prevent Osmotic Demyelination Syndrome.',
      'Intravenous dextrose provides 3.4 kcal/g, protein provides 4 kcal/g, 10% lipid provides 1.1 kcal/mL, and 20% lipid provides 2.0 kcal/mL.',
      'Propofol is formulated in a 10% lipid emulsion (1.1 kcal/mL) and contains egg lecithin; subtract Propofol lipid calories from TPN and monitor serum triglycerides.'
    ],
    boardPearlsAr: [
      'يُمنع رفع صوديوم الدم في حالات النقص المزمن بأكثر من 8 إلى 10 mEq/L خلال 24 ساعة لمنع متلازمة التحلل المياليني التناضحي.',
      'يعطي غرام الدكستروز الوريدي 3.4 سعرة، وغرام البروتين 4 سعرات، والمستحلب الدهني 20% يعطي 2 سعرة لكل مل.',
      'يُحضر البروبوفول (Propofol) في مستحلب دهني 10% يعطي 1.1 سعرة/مل؛ ويجب احتسابه ضمن سعرات التغذية الوريدية.'
    ],
    keywords: ['hyponatremia', 'hypertonic saline', 'ods', 'siadh', 'tolvaptan', 'hypercalcemia', 'zoledronic acid', 'tpn', 'refeeding syndrome']
  },
  {
    id: 'accp-2026-v1-c8',
    bookId: 'accp-2026-vol1',
    chapterNumber: 8,
    title: 'Chapter 8: Pulmonology (GINA Asthma Track 1, GOLD ABE COPD) & Adult Immunization Schedules',
    titleAr: 'الفصل 8 (مجلد 1 - ص 1-463): الأمراض الصدرية (الربو وفق GINA، السدة الرئوية المزمنة وفق GOLD) وجداول اللقاحات',
    authors: 'ACCP Pulmonary & Ambulatory Care Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-463 to 1-518',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'الأمراض الصدرية والمناعة',
    uan: '0217-0000-26-058-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c8',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 8: Pulmonology & Vaccines; pp. 1-463 to 1-518.',
    isVerbatimSource: true,
    learningObjectives: [
      'Apply the GINA 2025/2026 Track 1 MART paradigm (Low-dose ICS-Formoterol as both maintenance and reliever) and prohibition of SABA-only monotherapy in Asthma.',
      'Stratify COPD patients into GOLD ABE groups and select LAMA + LABA dual bronchodilation versus LAMA + LABA + ICS triple therapy based on blood eosinophil count (>=300 cells/mcL).',
      'Recommend ACIP 2026 adult pneumococcal (PCV20/PCV21), RSV, Herpes Zoster (RZV), and Tdap vaccines.'
    ],
    toc: [
      { id: 'v1c8-s1', number: '8.1', title: 'GINA Asthma Track 1 (ICS-Formoterol MART) & Severe Asthma Biologics' },
      { id: 'v1c8-s2', number: '8.2', title: 'GOLD ABE Chronic Obstructive Pulmonary Disease (COPD) & Eosinophil-Guided ICS' },
      { id: 'v1c8-s3', number: '8.3', title: 'ACIP Adult Immunization Schedules (PCV20/PCV21, Shingrix, RSV)' }
    ],
    sections: [
      {
        id: 'v1c8-s1',
        number: '8.1',
        heading: 'GINA Asthma Track 1 (ICS-Formoterol MART) & Severe Asthma Biologics',
        headingAr: 'بروتوكول GINA الحديث للربو (ICS-Formoterol MART) ومنع موسعات القصبات المنفردة',
        evidenceGrade: 'GINA 2026 Report Strategy',
        body: `1. Elimination of SABA-Only Monotherapy in Adolescents & Adults:
GINA guidelines no longer recommend Short-Acting Beta-2 Agonist (SABA, Albuterol) monotherapy for Step 1 Asthma because SABA-only treatment downregulates beta-2 receptors, increases airway hyperresponsiveness, and increases severe exacerbation mortality.
• GINA Track 1 (Preferred Controller & Reliever Pathway — MART):
  - Steps 1 & 2: As-needed only low-dose Inhaled Corticosteroid-Formoterol (Budesonide/Formoterol 160/4.5 mcg). Formoterol is a Long-Acting Beta-2 Agonist (LABA) with a rapid 3-minute onset of action (unlike Salmeterol, which has a slow onset and must NEVER be used as a reliever).
  - Step 3: Low-dose maintenance ICS-Formoterol daily PLUS as-needed ICS-Formoterol reliever (MART — Maintenance And Reliever Therapy).
  - Step 4: Medium-dose maintenance ICS-Formoterol daily PLUS as-needed ICS-Formoterol reliever.
  - Step 5: Add LAMA (Tiotropium), High-dose ICS-Formoterol, and phenotype-targeted Biologic therapy (Anti-IgE Omalizumab; Anti-IL-5/IL-5R Mepolizumab, Benralizumab; Anti-IL-4R Dupilumab; Anti-TSLP Tezepelumab).`
      },
      {
        id: 'v1c8-s2',
        number: '8.2',
        heading: 'GOLD ABE Chronic Obstructive Pulmonary Disease (COPD) & Eosinophil-Guided ICS',
        headingAr: 'تصنيف GOLD ABE للسدة الرئوية المزمنة (COPD) ومعيار الحمضات (Eosinophils >= 300)',
        evidenceGrade: 'GOLD 2026 Report Class A',
        body: `COPD (post-bronchodilator FEV1/FVC <0.70) is classified into three clinical groups—Group A, Group B, and Group E—based on dyspnea/symptom burden (mMRC 0–1 vs >=2; CAT <10 vs >=10) and Exacerbation history:
• Group A (0–1 moderate exacerbations not leading to hospital admission + mMRC 0–1 / CAT <10): Any single bronchodilator (short- or long-acting).
• Group B (0–1 moderate exacerbations + mMRC >=2 / CAT >=10): Dual Long-Acting Bronchodilator Combination (LAMA + LABA, e.g., Tiotropium/Olodaterol, Umeclidinium/Vilanterol, or Glycopyrrolate/Formoterol) is superior to LAMA or LABA monotherapy.
• Group E (>=2 moderate exacerbations OR >=1 exacerbation leading to hospitalization):
  - First-line: LAMA + LABA dual bronchodilator.
  - Add Inhaled Corticosteroid (Triple Therapy: LAMA + LABA + ICS) if blood Eosinophil count is >=300 cells/mcL (or >=100 cells/mcL with recurrent exacerbations despite LAMA + LABA, or concomitant history of Asthma). Avoid ICS if blood eosinophils <100 cells/mcL or recurrent pneumonia/mycobacterial infection.
• Acute COPD Exacerbation: Short-acting bronchodilators (Albuterol ± Ipratropium) + Systemic Prednisone 40 mg PO once daily for 5 days (REDUCE trial) + Antibiotics for 5 days (Amoxicillin/Clavulanate, Azithromycin, or Doxycycline) if increased sputum purulence + increased dyspnea/volume.`
      },
      {
        id: 'v1c8-s3',
        number: '8.3',
        heading: 'ACIP Adult Immunization Schedules (PCV20/PCV21, Shingrix, RSV)',
        headingAr: 'جداول اللقاحات المعتمدة للبالغين (المكورات الرئوية، الحزام الناري، والفيروس المخلوي التنفسي)',
        evidenceGrade: 'CDC / ACIP 2026 Schedule',
        body: `• Pneumococcal Vaccination (Adults >=50–65 years OR Adults 19–64 years with chronic heart, lung, liver, renal disease, diabetes, alcoholism, smoking, or immunocompromise): Administer a single dose of PCV20 (Prevnar 20) or PCV21 (Capvaxive) alone — no subsequent PPSV23 dose is required! (If PCV15 is used instead, follow with PPSV23 >=1 year later, or >=8 weeks later in immunocompromised/CSF leak/cochlear implant patients).
• Recombinant Zoster Vaccine (RZV — Shingrix): 2 doses IM separated by 2 to 6 months for all adults >=50 years and immunocompromised adults >=19 years (even if prior history of shingles or Zostavax).`
      }
    ],
    quickTables: [
      {
        title: 'GINA Asthma vs GOLD COPD Pharmacotherapy Comparison',
        titleAr: 'جدول الفروقات الجوهرية بين علاج الربو (GINA) والسدة الرئوية (GOLD)',
        headers: ['Clinical Feature', 'Asthma (GINA Track 1)', 'COPD (GOLD ABE)', 'Board Exam Pitfall'],
        rows: [
          ['Foundation / Pillar', 'Inhaled Corticosteroid (ICS) mandatory in all steps', 'Long-Acting Bronchodilators (LAMA + LABA)', 'LABA monotherapy in Asthma increases asthma-related death (Boxed Warning)'],
          ['Preferred Reliever', 'Low-dose ICS-Formoterol PRN', 'SABA (Albuterol) ± SAMA (Ipratropium) PRN', 'Salmeterol cannot be used for MART due to slow onset and dose-limiting toxicity'],
          ['Role of ICS', 'First-line in Step 1 through Step 5', 'Reserved for Group E with Eosinophils >=300 cells/mcL', 'ICS in COPD increases pneumonia risk; avoid if Eosinophils <100 cells/mcL']
        ]
      }
    ],
    boardPearls: [
      'LABA monotherapy (without an Inhaled Corticosteroid) is strictly contraindicated in Asthma due to increased asthma-related mortality; conversely, LAMA + LABA without ICS is the preferred initial therapy in COPD Groups B and E (unless eosinophils >=300 cells/mcL).',
      'Only Formoterol (fast 3-minute onset) is used in ICS-LABA MART single-inhaler maintenance and reliever therapy; Salmeterol has a delayed onset and cannot be used as a rescue inhaler.',
      'For acute COPD exacerbations, Prednisone 40 mg PO daily for 5 days is noninferior to 14 days (REDUCE Trial).'
    ],
    boardPearlsAr: [
      'يُمنع استخدام موسعات LABA منفردة بدون كورتيزون استنشاقي في الربو لخطر الوفاة، بينما تُعد ثنائية LAMA + LABA هي الأساس في COPD.',
      'الفورموتيرول (Formoterol) وحده يصلح كعلاج إسعافي وصيانة (MART) لسرعة مفعوله خلال 3 دقائق، بخلاف السالميتيرول.',
      'في نوبات تفاقم COPD الحادة، يكفي إعطاء Prednisone 40 ملغ فموياً لمدة 5 أيام فقط.'
    ],
    keywords: ['asthma', 'gina', 'copd', 'gold', 'formoterol', 'mart', 'tiotropium', 'eosinophils', 'pcv20', 'vaccines']
  },
  {
    id: 'accp-2026-v1-c9',
    bookId: 'accp-2026-vol1',
    chapterNumber: 9,
    title: 'Chapter 9: Neurology (Epilepsy, Status Epilepticus, Acute Ischemic Stroke, Migraine & Parkinson Disease)',
    titleAr: 'الفصل 9 (مجلد 1 - ص 1-519): أمراض الأعصاب (الصرع، السكتة الدماغية، الشقيقة، وداء باركنسون)',
    authors: 'ACCP Neurology Preparatory Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-519 to 1-568',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'أمراض الأعصاب والطوارئ الدماغية',
    uan: '0217-0000-26-059-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c9',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 9: Neurology; pp. 1-519 to 1-568.',
    isVerbatimSource: true,
    learningObjectives: [
      'Select antiseizure medications (ASMs) for focal vs generalized epilepsy, pregnancy (Lamotrigine/Levetiracetam vs Valproate), and HLA-B*1502 screening.',
      'Compare acute migraine therapies (Triptans, Gepants, Lasmiditan) and CGRP preventive therapies in patients with cardiovascular disease.',
      'Manage motor fluctuations ("wearing-off") in Parkinson Disease using Carbidopa/Levodopa, MAO-B inhibitors, and COMT inhibitors.'
    ],
    toc: [
      { id: 'v1c9-s1', number: '9.1', title: 'Antiseizure Medication Selection, Teratogenicity & HLA-B*1502 Pharmacogenomics' },
      { id: 'v1c9-s2', number: '9.2', title: 'Migraine Pharmacotherapy: Triptan Contraindications vs Gepants & Ditans' },
      { id: 'v1c9-s3', number: '9.3', title: 'Parkinson Disease Dopaminergic Therapy & Motor Fluctuations' }
    ],
    sections: [
      {
        id: 'v1c9-s1',
        number: '9.1',
        heading: 'Antiseizure Medication Selection, Teratogenicity & HLA-B*1502 Pharmacogenomics',
        headingAr: 'اختيار مضادات الصرع، المسخية الجنينية، وفحص جين HLA-B*1502',
        evidenceGrade: 'AAN / AES Guideline Standard',
        body: `1. Epilepsy Spectrum & Teratogenicity in Women of Childbearing Potential:
• Generalized Onset Tonic-Clonic & Myoclonic Seizures: Lamotrigine and Levetiracetam are preferred in women of childbearing potential due to the lowest rates of major congenital malformations (~2%).
• Valproate (Valproic Acid / Divalproex) Teratogenicity Mandate: Strictly AVOID in pregnancy and women of childbearing potential — causes neural tube defects (spina bifida ~10%) and permanent neurodevelopmental IQ reduction.
• Absence Seizures: Ethosuximide is first-line (blocks thalamic T-type Ca2+ channels). Note: Carbamazepine, Oxcarbazepine, and Phenytoin WORSEN absence and myoclonic seizures!
• Lamotrigine + Valproate Interaction: Valproate potently inhibits Lamotrigine glucuronidation (UGT1A4), doubling Lamotrigine half-life and precipitating Stevens-Johnson Syndrome (SJS) / Toxic Epidermal Necrolysis (TEN) unless Lamotrigine starter dose is reduced by 50% and titrated slowly.
• HLA-B*1502 Pharmacogenetic Mandate: Screen patients of Asian ancestry for HLA-B*1502 prior to initiating Carbamazepine, Oxcarbazepine, or Phenytoin due to high risk of fatal SJS/TEN.`
      },
      {
        id: 'v1c9-s2',
        number: '9.2',
        heading: 'Migraine Pharmacotherapy: Triptan Contraindications vs Gepants & Ditans',
        headingAr: 'علاج الشقيقة (Migraine): موانع التريبتان القلبية مقابل أدوية Gepants و Lasmiditan',
        evidenceGrade: 'AHS Consensus Statement',
        body: `• Triptans (Sumatriptan, Rizatriptan — 5-HT1B/1D Receptor Agonists): First-line for moderate-to-severe acute migraine WITHOUT cardiovascular disease. Because 5-HT1B agonism causes coronary and cerebral vasoconstriction, Triptans (and Ergotamines) are STRICTLY CONTRAINDICATED in patients with ischemic heart disease, prior MI, coronary vasospasm, stroke/TIA, peripheral vascular disease, or uncontrolled hypertension.
• Safe Acute Migraine Alternatives in Cardiovascular Disease:
  1. Gepants (Oral CGRP Receptor Antagonists — Ubrogepant, Rimegepant, Zavegepant nasal): Do NOT cause vasoconstriction; safe in patients with CAD, prior stroke, or hypertension.
  2. Lasmiditan (Reyvow — Selective 5-HT1F Agonist "Ditan"): Acts centrally without 5-HT1B vasoconstriction; safe in CAD, though patients must not drive for 8 hours post-dose due to CNS dizziness/sedation.`
      },
      {
        id: 'v1c9-s3',
        number: '9.3',
        heading: 'Parkinson Disease Dopaminergic Therapy & Motor Fluctuations',
        headingAr: 'علاج داء باركنسون وتدبير ظاهرة انتهاء المفعول الحركي (Wearing-Off)',
        evidenceGrade: 'MDS Evidence-Based Review',
        body: `• Carbidopa/Levodopa remains the most effective symptomatic therapy for Parkinson Disease motor bradykinesia, rigidity, and tremor (requires at least 75–100 mg/day of Carbidopa to saturate peripheral DOPA decarboxylase and prevent nausea).
• Managing "Wearing-Off" Motor Fluctuations: Add a selective MAO-B Inhibitor (Rasagiline, Selegiline, Safinamide), a COMT Inhibitor (Entacapone 200 mg with each Levodopa dose, or Opicapone once daily at bedtime), or a Dopamine Agonist (Pramipexole, Ropinirole, Rotigotine patch; screen for impulse control disorders, sleep attacks, and orthostasis).`
      }
    ],
    quickTables: [
      {
        title: 'Antiseizure Medication (ASM) High-Yield Adverse Effects & Enzyme Interactions',
        titleAr: 'جدول التأثيرات الجانبية المميزة والتداخلات الإنزيمية لمضادات الصرع',
        headers: ['Antiseizure Drug', 'CYP / UGT Enzyme Effect', 'Signature Adverse Effect', 'Key Clinical Rule'],
        rows: [
          ['Carbamazepine / Phenytoin', 'Potent CYP & UGT Inducers', 'SJS/TEN (HLA-B*1502), Hyponatremia (CBZ), Gingival hyperplasia (PHT)', 'Worsens absence & myoclonic seizures; induces oral contraceptive failure'],
          ['Valproic Acid', 'Potent CYP2C9 & UGT Inhibitor', 'Teratogenicity (spina bifida), Hepatotoxicity, Hyperammonemia, Pancreatitis', 'Doubles Lamotrigine levels (SJS risk); administer L-carnitine in toxicity'],
          ['Lamotrigine', 'UGT1A4 substrate', 'Stevens-Johnson Syndrome (dose-rate dependent)', 'Preferred in pregnancy; slow titration mandatory'],
          ['Levetiracetam', 'None (renally cleared)', 'Behavioral irritability, agitation, depression', 'Preferred in Status Epilepticus, pregnancy, and drug-interaction avoidance']
        ]
      }
    ],
    boardPearls: [
      'Triptans and Ergotamines are contraindicated in patients with CAD, prior stroke/TIA, or uncontrolled hypertension; use a Gepant (Rimegepant, Ubrogepant) or Lasmiditan instead.',
      'Valproate inhibits Lamotrigine glucuronidation and doubles Lamotrigine levels — halve the Lamotrigine dose when adding Valproate to prevent Stevens-Johnson Syndrome.',
      'Check HLA-B*1502 in patients of Asian descent before initiating Carbamazepine, Oxcarbazepine, or Phenytoin.'
    ],
    boardPearlsAr: [
      'يُمنع استخدام أدوية Triptans في مرضى الشرايين التاجية أو السكتة الدماغية؛ وتُستخدم بدلاً منها أدوية Gepants الآمنة قلبياً.',
      'يثبط الفالبروات استقلاب اللاموتريجين ويضاعف مستواه؛ لذا يجب خفض جرعة Lamotrigine للنصف لمنع متلازمة ستيفنز جونسون.',
      'يجب فحص جين HLA-B*1502 لدى المرضى الآسيويين قبل وصف Carbamazepine أو Phenytoin.'
    ],
    keywords: ['epilepsy', 'lamotrigine', 'valproate', 'carbamazepine', 'levetiracetam', 'migraine', 'triptan', 'rimegepant', 'parkinson']
  },
  {
    id: 'accp-2026-v1-c10',
    bookId: 'accp-2026-vol1',
    chapterNumber: 10,
    title: 'Chapter 10: Women’s & Men’s Health, Pregnancy Pharmacotherapy, Teratogens & BPH',
    titleAr: 'الفصل 10 (مجلد 1 - ص 1-569): صحة المرأة والرجل، الأدوية أثناء الحمل والإرضاع، والأدوية الماسخة للأجنة',
    authors: 'ACCP Ambulatory & Women’s Health Panel',
    edition: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1)',
    pageRange: 'pp. 1-569 to 1-624',
    systemCategory: 'Endocrinology & Metabolism',
    systemCategoryAr: 'صحة المرأة والحمل والغدد',
    uan: '0217-0000-26-059-H01-P',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c10',
    citation: 'ACCP Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 Edition, Vol. 1. Chapter 10: Sexual & Reproductive Health; pp. 1-569 to 1-624.',
    isVerbatimSource: true,
    learningObjectives: [
      'Select safe antihypertensive, anticoagulant, and antimicrobial regimens during Pregnancy vs strictly contraindicated teratogens.',
      'Apply CDC US Medical Eligibility Criteria (US MEC Category 4) absolute contraindications to Combined Hormonal Contraceptives (CHC).',
      'Differentiate Alpha-1 Blockers (uroselective vs non-selective) and 5-Alpha-Reductase Inhibitors in Benign Prostatic Hyperplasia (BPH).'
    ],
    toc: [
      { id: 'v1c10-s1', number: '10.1', title: 'Pharmacotherapy in Pregnancy: Hypertension, Anticoagulation & Teratogen Contraindications' },
      { id: 'v1c10-s2', number: '10.2', title: 'CDC US MEC Contraception Contraindications & Benign Prostatic Hyperplasia (BPH)' }
    ],
    sections: [
      {
        id: 'v1c10-s1',
        number: '10.1',
        heading: 'Pharmacotherapy in Pregnancy: Hypertension, Anticoagulation & Teratogen Contraindications',
        headingAr: 'العلاج الدوائي الآمن في الحمل (الضغط، منع التخثر، والانتانات) والأدوية الماسخة الممنوعة',
        evidenceGrade: 'ACOG / ASH Guideline Standard',
        body: `1. Chronic & Gestational Hypertension in Pregnancy (CHAP Trial):
• Initiate pharmacotherapy at BP >=140/90 mmHg in pregnant patients.
• Safe First-Line Agents in Pregnancy:
  - Labetalol (100–1200 mg PO BID–TID)
  - Extended-Release Nifedipine (30–90 mg PO once daily)
  - Methyldopa (250–1000 mg PO BID–TID)
• Strictly Contraindicated Antihypertensives in Pregnancy: ACE Inhibitors, ARBs, Direct Renin Inhibitors (Aliskiren), and Sacubitril/Valsartan (cause fetal renal dysplasia, oligohydramnios, anhydramnios, Potter sequence, and fetal death).
• Eclampsia Prophylaxis: Initiate low-dose Aspirin 81 mg PO daily at 12 to 28 weeks gestation (optimally before 16 weeks) in patients at high risk for preeclampsia.

2. Anticoagulation in Pregnancy:
• Low-Molecular-Weight Heparin (Enoxaparin) or Unfractionated Heparin is mandatory throughout pregnancy because Heparins do NOT cross the placenta.
• Warfarin (causes nasal hypoplasia and stippled epiphyses in weeks 6–12, and fetal CNS hemorrhage) and DOACs (cross the placenta) are contraindicated in pregnancy (exception: high-risk mechanical heart valves during 2nd/3rd trimester per specialized cardiology protocols).`
      },
      {
        id: 'v1c10-s2',
        number: '10.2',
        heading: 'CDC US MEC Contraception Contraindications & Benign Prostatic Hyperplasia (BPH)',
        headingAr: 'موانع موانع الحمل الهرمونية المركبة (US MEC 4) وعلاج تضخم البروستات الحميد',
        evidenceGrade: 'CDC US MEC / AUA Guideline',
        body: `1. Absolute Contraindications to Estrogen-Containing Combined Hormonal Contraceptives (US MEC Category 4):
• Age >=35 years AND smoking >=15 cigarettes/day.
• Migraine WITH aura (at ANY age — high ischemic stroke risk).
• History of or active DVT/PE, known thrombogenic mutation, ischemic heart disease, stroke, complicated valvular heart disease, decompensated cirrhosis, hepatocellular adenoma/carcinoma, breast cancer, or uncontrolled hypertension (SBP >=160 or DBP >=100 mmHg).
• Postpartum <21 days (in all women due to peak VTE risk).

2. Benign Prostatic Hyperplasia (BPH):
• Alpha-1 Adrenergic Antagonists (Rapid symptom relief within 1–2 weeks):
  - Uroselective Alpha-1A Blockers (Tamsulosin 0.4–0.8 mg daily, Silodosin 8 mg daily): Minimal orthostatic hypotension; cause retrograde/abnormal ejaculation and Intraoperative Floppy Iris Syndrome (IFIS) during cataract surgery.
  - Non-selective Alpha-1 Blockers (Terazosin, Doxazosin): Require bedtime titration; cause significant first-dose syncope and orthostatic hypotension (Beers Criteria: avoid in older adults).
• 5-Alpha-Reductase Inhibitors (Finasteride 5 mg daily, Dutasteride 0.5 mg daily): Indicated ONLY when prostate volume is enlarged (>30–40 g or PSA >1.5 ng/mL); require 6 months for maximal prostate shrinkage and reduce serum PSA by ~50% (multiply measured PSA by 2 after >=6 months of therapy to screen for prostate cancer). Pregnancy Category X (pregnant women must not handle crushed tablets).`
      }
    ],
    quickTables: [
      {
        title: 'Safe vs Teratogenic Drug Selection in Pregnancy',
        titleAr: 'جدول البدائل الآمنة والأدوية الماسخة الممنوعة أثناء الحمل',
        headers: ['Clinical Indication', 'Safe / Preferred in Pregnancy', 'Strictly Contraindicated Teratogen', 'Fetal Toxicity Mechanism'],
        rows: [
          ['Hypertension', 'Labetalol, Nifedipine XL, Methyldopa', 'ACEi, ARBs, Entresto, Aliskiren', 'Fetal renal agenesis, oligohydramnios, fetal death'],
          ['Anticoagulation (VTE)', 'Enoxaparin (LMWH) or UFH', 'Warfarin & DOACs', 'Warfarin embryopathy (weeks 6–12) & fetal hemorrhage'],
          ['Hyperthyroidism', '1st Trimester: PTU | 2nd/3rd Trimester: Methimazole', 'Radioactive Iodine (I-131); Methimazole in 1st trimester', 'Methimazole in T1 causes aplasia cutis & choanal atresia'],
          ['Infectious Diseases / UTI', 'Amoxicillin, Cephalexin, Fosfomycin', 'Tetracyclines, Fluoroquinolones, TMP-SMX (T1/Term)', 'Tooth discoloration/bone inhibition (Tetracyclines); kernicterus (Sulfa at term)']
        ]
      }
    ],
    boardPearls: [
      'Combined estrogen-progestin contraceptives are strictly contraindicated (US MEC 4) in women of any age who have Migraine WITH Aura and in women >=35 years who smoke >=15 cigarettes/day.',
      'In hyperthyroidism during pregnancy, use Propylthiouracil (PTU) during the 1st trimester (organogenesis), then switch to Methimazole for the 2nd and 3rd trimesters (to reduce maternal PTU hepatotoxicity).',
      '5-Alpha-Reductase Inhibitors (Finasteride, Dutasteride) reduce serum PSA by 50% after 6 months; double the measured PSA value when interpreting prostate cancer screening.'
    ],
    boardPearlsAr: [
      'تُمنع موانع الحمل الحاوية على الإستروجين قطعياً في أي مريضة تعاني من الشقيقة المصحوبة بهالة (Migraine with Aura) أو المدخنات بعمر >= 35 عاماً.',
      'في فرط نشاط الدرق أثناء الحمل: يُستخدم PTU في الثلث الأول ثم يُحول إلى Methimazole في الثلثين الثاني والثالث.',
      'تخفض أدوية Finasteride و Dutasteride قيمة PSA إلى النصف بعد 6 أشهر؛ لذا يجب مضاعفة الرقم المقاس عند تقييم سرطان البروستات.'
    ],
    keywords: ['pregnancy', 'teratogen', 'labetalol', 'nifedipine', 'enoxaparin', 'contraception', 'migraine aura', 'bph', 'tamsulosin', 'finasteride']
  }
];

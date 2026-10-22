import { VerbatimChapter } from '../libraryTypes';

export const casebookAdditionalChapters: VerbatimChapter[] = [
  {
    id: 'casebook-section2-syndrome-checklists',
    bookId: 'clinical-casebook-guide',
    chapterNumber: 2,
    title: 'Section II: Disease-Specific Bedside Intake & Mandatory Data Extraction Checklists (8 Core Clinical Syndromes)',
    titleAr: 'القسم الثاني (ص 49-128): قوائم الفحص السريري الموجه وأهم المعلومات الواجب استخلاصها في 8 متلازمات سريرية كبرى',
    authors: 'Terry L. Schwinghammer, PharmD; Joseph T. DiPiro, PharmD; Clinical Preceptor Panel',
    edition: 'Pharmacotherapy Casebook: A Patient-Focused Approach, 13th Edition',
    pageRange: 'pp. 49–128',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'منهجية أخذ الحالات والتقييم السريري الموجه',
    uan: '0217-0000-26-002-L04-P',
    sourceUrl: 'local://ref/chapter/casebook-section2-syndrome-checklists',
    citation: 'Schwinghammer TL, DiPiro JT, et al. Section II: Syndrome-Specific Bedside Workup Checklists. Pharmacotherapy Casebook, 13th ed. McGraw Hill; 2026:49-128.',
    isVerbatimSource: true,
    learningObjectives: [
      'Execute syndrome-specific bedside history and physical/laboratory data extraction across Heart Failure, ACS, AFib, Sepsis/HAP, AKI/CKD, Cirrhosis, DKA, and VTE.',
      'Identify the "Non-Negotiable Clinical Red Flags" that must be verified before approving or dispensing high-alert orders in each syndrome.',
      'Audit home versus inpatient medication lists for syndrome-specific contraindicated drugs.'
    ],
    toc: [
      { id: 'cb2-s1', number: '2.1', title: 'Cardiovascular Intake Checklists: HFrEF/ADHF, Acute Coronary Syndrome & Atrial Fibrillation' },
      { id: 'cb2-s2', number: '2.2', title: 'Critical Care & Renal Intake Checklists: Sepsis/HAP & Acute Kidney Injury (AKI/CKD)' },
      { id: 'cb2-s3', number: '2.3', title: 'Hepatology, Endocrine & Thrombosis Checklists: Decompensated Cirrhosis, DKA & VTE' }
    ],
    sections: [
      {
        id: 'cb2-s1',
        number: '2.1',
        heading: 'Cardiovascular Intake Checklists: HFrEF/ADHF, Acute Coronary Syndrome & Atrial Fibrillation',
        headingAr: 'قوائم أخذ الحالة القلبية: قصور القلب (HFrEF)، المتلازمة التاجية الحادة (ACS)، والرجفان الأذيني (AFib)',
        evidenceGrade: 'PPCP Bedside Standard',
        body: `When a clinical pharmacist or PharmD student evaluates a cardiovascular admission at the bedside, generic history-taking is insufficient. You must extract the exact syndrome-specific parameters below:

1. Heart Failure (HFrEF / Acute Decompensated Heart Failure) Mandatory Data Extraction:
• Subjective & Bedside Physical Clues: NYHA Functional Class (I–IV), orthopnea (# of pillows), paroxysmal nocturnal dyspnea (PND), daily dry vs wet body weight trajectory, jugular venous distention (JVD), S3 gallop, pulmonary rales, and extremity perfusion (Warm vs Cold, Dry vs Wet Nohria-Stevenson quadrant).
• Mandatory Objective Parameters: Most recent Echocardiogram LVEF (%), BNP or NT-proBNP trend, Blood Pressure & Heart Rate, Serum Potassium (K+), Serum Sodium (Na+), Serum Creatinine (SCr), and Cockcroft-Gault CrCl.
• Medication Audit Questions:
  - Is the patient on all 4 mortality-reducing GDMT pillars (ARNI/ACEi/ARB + Carvedilol/Metoprolol Succinate/Bisoprolol + Spironolactone/Eplerenone + Dapagliflozin/Empagliflozin)?
  - Was a strict 36-hour washout enforced if switching from an ACEi to Sacubitril/Valsartan?
  - Is the patient taking any HF-exacerbating drugs (NSAIDs, Diltiazem, Verapamil, Pioglitazone, Cilostazol, Flecainide, Dronedarone)?

2. Acute Coronary Syndrome (STEMI / NSTEMI / Post-PCI) Mandatory Data Extraction:
• Subjective & Procedural Clues: Exact time of chest pain onset, PCI stent type and vessel(s), history of prior Stroke or TIA (absolute contraindication to Prasugrel), history of Asthma + Nasal Polyps (Samter triad / Aspirin-Exacerbated Respiratory Disease), and baseline GI bleeding risk.
• Medication Audit Questions:
  - Is Aspirin maintenance dose capped at <=81–100 mg/day if paired with Ticagrelor?
  - If Clopidogrel is prescribed, is the patient a CYP2C19 poor metabolizer or taking Omeprazole/Esomeprazole?
  - Is a High-Intensity Statin (Atorvastatin 80 mg or Rosuvastatin 40 mg) initiated prior to discharge?

3. Atrial Fibrillation & Anticoagulation Mandatory Data Extraction:
• Mandatory Scores & Labs: Calculate CHA2DS2-VASc stroke score and HAS-BLED bleeding score; record exact Age (years), Actual Body Weight (kg), and Serum Creatinine (mg/dL) to verify the Apixaban 2-of-3 ABC rule and Cockcroft-Gault CrCl (using Actual Body Weight).
• Medication Audit Questions: Check for mechanical heart valves or moderate-to-severe rheumatic mitral stenosis (DOACs contraindicated); audit P-gp/CYP3A4 interactors (Amiodarone, Dronedarone, Rifampin, Phenytoin) and duplicate antiplatelets/NSAIDs.`
      },
      {
        id: 'cb2-s2',
        number: '2.2',
        heading: 'Critical Care & Renal Intake Checklists: Sepsis/HAP & Acute Kidney Injury (AKI/CKD)',
        headingAr: 'قوائم أخذ حالة العناية المركزة والكلى: الإنتان وذات الرئة المستشفوية والقصور الكلوي الحاد',
        evidenceGrade: 'ICU Stewardship & KDIGO Standard',
        body: `4. Sepsis, Septic Shock & Nosocomial Pneumonia (HAP/VAP) Mandatory Data Extraction:
• Infection & Hemodynamic Timeline: Time zero of hypotension (MAP <65 mmHg), Serum Lactate (mmol/L) and 2–4h repeat clearance, volume of crystalloid resuscitation (30 mL/kg IBW), Norepinephrine infusion rate (mcg/kg/min), and timing of blood/sputum cultures relative to first antibiotic dose.
• MDR Risk Factor Audit: Did the patient receive IV antibiotics within the past 90 days? Has the patient been hospitalized >=5 days? What is the local ICU antibiogram resistance rate for MRSA and Pseudomonas?
• Pharmacokinetic & Allergy Audit:
  - Document the exact reaction to any reported Penicillin allergy (IgE-mediated anaphylaxis/angioedema/urticaria vs benign maculopapular rash) before deciding between Cefepime/Meropenem versus Aztreonam.
  - Ensure full Day-1 loading doses of Vancomycin (25–30 mg/kg ABW) and Beta-lactams are given before adjusting maintenance intervals for AKI.

5. Acute Kidney Injury (AKI) & Chronic Kidney Disease (CKD) Mandatory Data Extraction:
• Baseline vs Current SCr Trajectory: Compare admission SCr to 7-day and 90-day baseline SCr (KDIGO Stage 1, 2, or 3); check hourly Urine Output (mL/kg/h), BUN:SCr ratio, FENa / FEUrea, and urinalysis casts.
• Immediate Nephrotoxin & Renally Cleared Drug Audit ("STOP-AKI Checklist"):
  - Hold Triple Whammy agents (NSAIDs, ACEi/ARBs during acute hypovolemic/septic AKI), Metformin (if eGFR <30 or AKI), Nitrofurantoin, and Aminoglycosides.
  - Adjust Vancomycin, Meropenem, Cefepime, Piperacillin-Tazobactam, Enoxaparin (30 mg SC q24h prophylaxis / 1 mg/kg q24h treatment if CrCl <30), Gabapentin/Pregabalin, and Morphine/Meperidine (accumulate neurotoxic M6G/normeperidine metabolites — switch to Fentanyl or Hydromorphone).`
      },
      {
        id: 'cb2-s3',
        number: '2.3',
        heading: 'Hepatology, Endocrine & Thrombosis Checklists: Decompensated Cirrhosis, DKA & VTE',
        headingAr: 'قوائم أخذ حالة الكبد والغدد والجلطات: تشمع الكبد اللا معاوض، الحماض الكيتوني، والخثار الوريدي',
        evidenceGrade: 'AASLD / ADA / CHEST Standard',
        body: `6. Decompensated Cirrhosis, Ascites, SBP & Hepatic Encephalopathy Mandatory Data Extraction:
• Calculate Child-Pugh Score (Total Bilirubin, Serum Albumin, INR, Ascites grade, Encephalopathy grade) and MELD-Na Score (Bilirubin, INR, SCr, Serum Na+).
• Ascitic Fluid Analysis: Check SAAG (>=1.1 g/dL) and Ascitic Fluid PMN count (>=250 cells/mm³ = SBP requiring Ceftriaxone 2 g IV q24h + IV Albumin 1.5 g/kg Day 1 and 1.0 g/kg Day 3).
• Verify 100:40 mg Spironolactone:Furosemide ratio, Lactulose stool frequency (2–3 soft stools/day) + Rifaximin 550 mg BID, and hold Beta-blockers if SBP <90 mmHg or acute HRS-AKI develops.

7. Diabetic Ketoacidosis (DKA) & Inpatient Hyperglycemia Mandatory Data Extraction:
• Verify the Triad & Electrolytes: Blood Glucose, Arterial/Venous pH (<7.30), Serum Bicarbonate (<18 mEq/L), Anion Gap (>12 mEq/L; Na − [Cl + HCO3]), Serum Beta-hydroxybutyrate, Measured & Corrected Serum Sodium, and Baseline Serum Potassium (MUST be >=3.3 mEq/L before starting IV insulin!).`
      }
    ],
    quickTables: [
      {
        title: '8-Syndrome Bedside Data Extraction & Non-Negotiable Red Flag Matrix',
        titleAr: 'جدول المعلومات الحرجة والخطوط الحمراء في المتلازمات السريرية الثماني',
        headers: ['Clinical Syndrome', 'Mandatory Bedside Labs & Scores', 'Non-Negotiable Clinical Red Flag'],
        rows: [
          ['HFrEF / ADHF', 'LVEF%, Nohria quadrant, K+, SCr, BNP, dry weight', 'Never give Spironolactone if K+ >=5.0–5.5 or CrCl <=30; 36h ACEi->ARNI washout'],
          ['ACS / Post-PCI', 'Stent type, prior Stroke/TIA, weight, age, Hgb', 'Prasugrel contraindicated in prior Stroke/TIA; Aspirin <=81 mg with Ticagrelor'],
          ['Atrial Fibrillation', 'CHA2DS2-VASc, HAS-BLED, Age, Weight, SCr (ABW CrCl)', 'Apixaban 2.5 mg BID ONLY if >=2 of 3 ABC criteria met; no DOACs in mechanical valves'],
          ['ICU Sepsis / HAP', 'Lactate, MAP, 90d IV abx history, exact PCN allergy', 'Never reduce Day-1 antibiotic loading dose in AKI; avoid Daptomycin in pneumonia'],
          ['AKI / Severe CKD', 'Baseline SCr, Urine output, K+, HCO3, FENa/FEUrea', 'Hold NSAIDs, Metformin, Morphine; adjust Cefepime/Meropenem/Enoxaparin at CrCl <30'],
          ['Cirrhosis / Ascites / SBP', 'Child-Pugh, MELD-Na, Ascitic PMN, Na+, K+, Albumin', 'Give IV Albumin (1.5 g/kg D1, 1 g/kg D3) in SBP; correct hypokalemia in HE'],
          ['DKA / Hyperglycemia', 'BG, pH, HCO3, Anion Gap, Serum K+, Corrected Na+', 'Hold IV Insulin if K+ <3.3 mEq/L; overlap SC Glargine 2–4h before stopping IV insulin'],
          ['VTE / Anticoagulation', 'Platelets (baseline & Day 5–10), CrCl, INR, 4Ts score', 'Stop all heparin & start Argatroban if HIT 4Ts >=4; never give Warfarin until Plt >=150k']
        ]
      }
    ],
    boardPearls: [
      'Morphine and Meperidine accumulate active renally cleared metabolites (morphine-6-glucuronide and neurotoxic normeperidine) in AKI/CKD — use Fentanyl or Hydromorphone instead.',
      'Always document the exact reaction type and timing of a reported Penicillin allergy during bedside intake before selecting empiric Gram-negative coverage.',
      'In DKA bedside workup, Serum Potassium and Anion Gap must be checked every 2–4 hours; never turn off the IV insulin drip until the Anion Gap is <=12 mEq/L AND subcutaneous basal insulin was given 2–4 hours prior.'
    ],
    boardPearlsAr: [
      'يتراكم المورفين والميبيريدين في القصور الكلوي مسبباً تثبيطاً تنفسياً واختلاجات؛ لذا يُستبدلان بـ Fentanyl أو Hydromorphone.',
      'توثيق طبيعة حساسية البنسلين بدقة عند أخذ القصة السريرية يمنع الاستخدام العشوائي للمضادات البديلة الأقل فعالية.',
      'في متابعة حالة DKA، يُفحص البوتاسيوم والفجوة الأنيونية كل 2-4 ساعات، ولا يُوقف الأنسولين الوريدي إلا بعد إغلاق الفجوة الأنيونية.'
    ],
    keywords: ['bedside checklist', 'intake', 'syndrome workup', 'hfref', 'acs', 'sepsis', 'aki', 'cirrhosis', 'dka', 'red flags']
  },
  {
    id: 'casebook-section3-benchmark-cases',
    bookId: 'clinical-casebook-guide',
    chapterNumber: 3,
    title: 'Section III: Master Benchmark Clinical Cases, IESC Drug Therapy Problem Audits & OSCE Scoring Rubrics',
    titleAr: 'القسم الثالث (ص 129-245): الحالات السريرية المرجعية القياسية، تدقيق المشاكل الدوائية (IESC)، وسلالم تقييم OSCE للطلاب',
    authors: 'Terry L. Schwinghammer, PharmD; Joseph T. DiPiro, PharmD; Clinical Preceptor Panel',
    edition: 'Pharmacotherapy Casebook: A Patient-Focused Approach, 13th Edition',
    pageRange: 'pp. 129–245',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'الحالات السريرية التدريبية وتقييم الكفاءة (OSCE)',
    uan: '0217-0000-26-003-L04-P',
    sourceUrl: 'local://ref/chapter/casebook-section3-benchmark-cases',
    citation: 'Schwinghammer TL, DiPiro JT, et al. Section III: Benchmark Clinical Cases & OSCE Rubrics. Pharmacotherapy Casebook, 13th ed. McGraw Hill; 2026:129-245.',
    isVerbatimSource: true,
    learningObjectives: [
      'Work up complex multi-morbid inpatient benchmark cases using the 7-category IESC Drug Therapy Problem (DTP) taxonomy.',
      'Prioritize life-threatening Primary Drug Therapy Problems over Secondary/Preventive problems during OSCE case defenses.',
      'Construct measurable therapeutic and toxicity monitoring endpoints with exact laboratory frequencies.'
    ],
    toc: [
      { id: 'cb3-s1', number: '3.1', title: 'Benchmark Case 1: Septic Shock, ICU HAP & Acute Kidney Injury with Penicillin Allergy' },
      { id: 'cb3-s2', number: '3.2', title: 'Benchmark Case 2: Post-NSTEMI PCI with HFrEF, Hyperkalemia & Aspirin Hypersensitivity' },
      { id: 'cb3-s3', number: '3.3', title: 'Benchmark Case 3: Decompensated Cirrhosis with SBP, Variceal Bleed Risk & Overt HE' },
      { id: 'cb3-s4', number: '3.4', title: 'Standardized PharmD / Residency OSCE Case Defense Rubric (100-Point Scale)' }
    ],
    sections: [
      {
        id: 'cb3-s1',
        number: '3.1',
        heading: 'Benchmark Case 1: Septic Shock, ICU HAP & Acute Kidney Injury with Penicillin Allergy',
        headingAr: 'الحالة المرجعية الأولى: صدمة إنتانية وذات رئة مستشفوية (ICU HAP) مع قصور كلوي حاد وحساسية بنسلين',
        evidenceGrade: 'Casebook Benchmark Level III (Complex ICU)',
        body: `Clinical Presentation:
A 68-year-old male (78 kg, 172 cm) admitted to the ICU 6 days ago develops new fever (39.1°C), purulent endotracheal sputum, lobar infiltrate, hypotension (BP 82/48 mmHg, MAP 59 mmHg), and oliguria. Labs: WBC 19.4 × 10³/mcL, Lactate 4.2 mmol/L, SCr rose from 0.9 mg/dL (baseline) to 2.6 mg/dL (estimated CrCl ~24 mL/min), K+ 5.3 mEq/L. Allergy record states: "Penicillin — severe anaphylaxis & laryngeal angioedema (intubated 3 years ago)." Current orders under review: Vancomycin 1000 mg IV q12h, Piperacillin-Tazobactam 4.5 g IV q6h, Enalapril 10 mg PO BID, Ibuprofen 400 mg PO q8h PRN fever, Enoxaparin 40 mg SC q24h.

Complete IESC Drug Therapy Problem (DTP) Audit & Model Resolution:
1. DTP #1 (Safety — Life-Threatening IgE Cross-Reactivity): Piperacillin-Tazobactam is strictly CONTRAINDICATED in documented IgE-mediated Penicillin anaphylaxis/angioedema.
   • Intervention: Discontinue Piperacillin-Tazobactam immediately; initiate Aztreonam 2 g IV loading dose followed by 1 g IV q8h (renally adjusted for CrCl 24 mL/min; zero cross-reactivity with penicillins) PLUS Ciprofloxacin 400 mg IV q12h (or Amikacin single dose if shock persists) for double antipseudomonal coverage.
2. DTP #2 (Safety / PK — Supratherapeutic Maintenance Interval & Inadequate Loading): Vancomycin 1000 mg IV q12h in Stage 3 AKI (CrCl 24 mL/min) will rapidly accumulate to nephrotoxic troughs (>25–30 mcg/mL), while 1000 mg is an under-dosed initial load for a 78 kg septic shock patient.
   • Intervention: Administer Vancomycin 2000 mg (25 mg/kg ABW) IV × 1 loading dose infused over 120 minutes, then adjust maintenance to 1000 mg IV every 24 hours guided by two-level Bayesian AUC24/MIC monitoring (target 400–600 mg·h/L).
3. DTP #3 (Safety — Triple Whammy & Hemodynamic Instability): Enalapril 10 mg BID and Ibuprofen 400 mg q8h worsen septic shock (MAP 59 mmHg), acute kidney injury, and hyperkalemia (K+ 5.3 mEq/L).
   • Intervention: Hold Enalapril and discontinue Ibuprofen permanently; initiate Norepinephrine IV infusion at 0.05–0.1 mcg/kg/min titrated to MAP >=65 mmHg after 30 mL/kg balanced crystalloid resuscitation.
4. DTP #4 (Safety — Renal VTE Prophylaxis Overdose): Enoxaparin 40 mg SC q24h accumulates when CrCl <30 mL/min.
   • Intervention: Reduce Enoxaparin to 30 mg SC every 24 hours (or switch to Unfractionated Heparin 5000 units SC q8h).`
      },
      {
        id: 'cb3-s2',
        number: '3.2',
        heading: 'Benchmark Case 2: Post-NSTEMI PCI with HFrEF, Hyperkalemia & Aspirin Hypersensitivity',
        headingAr: 'الحالة المرجعية الثانية: متلازمة تاجية حادة بعد القسطرة (PCI) مع قصور قلب (LVEF 30%) وفرط بوتاسيوم وحساسية أسبرين',
        evidenceGrade: 'Casebook Benchmark Level III (Cardiorenal)',
        body: `Clinical Presentation:
A 61-year-old female (64 kg) undergoes drug-eluting stent (DES) placement to the proximal LAD for NSTEMI. Echocardiogram reveals LVEF 30%. Medical history: Prior TIA 2 years ago, Samter triad (bronchospasm with Aspirin), T2DM. Labs: SCr 1.9 mg/dL (CrCl 28 mL/min), K+ 5.6 mEq/L, BP 118/72 mmHg, HR 78 bpm. Proposed discharge orders: Prasugrel 10 mg PO OD, Spironolactone 25 mg PO OD, Ramipril 5 mg PO BID AND Sacubitril/Valsartan 49/51 mg PO BID started simultaneously today, Simvastatin 20 mg PO QHS.

Complete IESC Drug Therapy Problem (DTP) Audit & Model Resolution:
1. DTP #1 (Safety — Boxed Warning Stroke/TIA Contraindication): Prasugrel is strictly contraindicated in patients with a history of TIA or Stroke (TRITON-TIMI 38 net harm).
   • Intervention: Discontinue Prasugrel; initiate Ticagrelor 180 mg PO loading dose then 90 mg PO BID (plus urgent rapid Aspirin desensitization protocol to maintain Aspirin 81 mg PO OD, or P2Y12 monotherapy after brief DAPT per allergy protocol).
2. DTP #2 (Safety — Fatal Angioedema from Concurrent ACEi + ARNI): Co-administration of Ramipril and Sacubitril/Valsartan without a 36-hour washout is strictly contraindicated. Furthermore, with K+ = 5.6 mEq/L and CrCl = 28 mL/min, RAASi and MRA initiation must wait until hyperkalemia resolves.
   • Intervention: Discontinue Ramipril and hold Spironolactone (contraindicated at K+ >=5.5 mEq/L and CrCl <=30 mL/min). Treat hyperkalemia with Sodium Zirconium Cyclosilicate 10 g PO TID × 48h; once K+ <5.0 mEq/L and >=36 hours have elapsed since the last Ramipril dose, initiate Sacubitril/Valsartan at the renal starting dose of 24/26 mg PO BID.
3. DTP #3 (Effectiveness — Suboptimal Statin Intensity & Missing HFrEF Pillars): Simvastatin 20 mg is moderate-intensity (inadequate post-ACS), and the patient lacks an evidence-based Beta-blocker and SGLT2 inhibitor.
   • Intervention: Switch Simvastatin to Atorvastatin 80 mg PO daily; initiate Carvedilol 3.125 mg PO BID and Dapagliflozin 10 mg PO daily (safe at eGFR 28 mL/min).`
      },
      {
        id: 'cb3-s3',
        number: '3.3',
        heading: 'Benchmark Case 3: Decompensated Cirrhosis with SBP, Variceal Bleed Risk & Overt HE',
        headingAr: 'الحالة المرجعية الثالثة: تشمع كبد لا معاوض مع التهاب صفاق جرثومي (SBP) واعتلال دماغي كبدي',
        evidenceGrade: 'Casebook Benchmark Level III (Hepatology)',
        body: `Clinical Presentation:
A 57-year-old male with Child-Pugh Class C cirrhosis presents with fever (38.5°C), tense ascites, asterixis (West Haven Grade II Hepatic Encephalopathy), BP 86/52 mmHg (MAP 63 mmHg), HR 96 bpm. Diagnostic paracentesis: SAAG 1.6 g/dL, Ascitic fluid PMN count 640 cells/mm³. Labs: Total Bilirubin 4.8 mg/dL, Serum Albumin 2.2 g/dL, INR 2.1, SCr 1.7 mg/dL, Na+ 126 mEq/L, K+ 3.1 mEq/L. Home medications continued on admission: Propranolol 40 mg PO BID, Furosemide 80 mg PO daily monotherapy, Zolpidem 10 mg PO QHS.

Complete IESC Drug Therapy Problem (DTP) Audit & Model Resolution:
1. DTP #1 (Untreated Indication — Spontaneous Bacterial Peritonitis & Hepatorenal Prophylaxis): Ascitic PMN >=250 cells/mm³ (640/mm³) confirms acute SBP with high-risk predictors for Type 1 HRS (Bilirubin 4.8 >4 mg/dL and SCr 1.7 >1 mg/dL).
   • Intervention: Initiate Ceftriaxone 2 g IV every 24 hours × 5–7 days PLUS 25% Intravenous Albumin 1.5 g/kg on Day 1 (within 6 hours) and 1.0 g/kg on Day 3.
2. DTP #2 (Safety — Non-Selective Beta-Blocker in Hypotensive SBP / AKI): Continuing Propranolol 40 mg BID when SBP <90 mmHg (86/52 mmHg) and AKI (SCr 1.7 mg/dL) during acute SBP precipitates hepatorenal syndrome and circulatory collapse.
   • Intervention: Hold Propranolol and Furosemide immediately during acute hypotensive SBP/AKI.
3. DTP #3 (Untreated Indication & Safety — Overt Hepatic Encephalopathy Aggravated by Zolpidem & Hypokalemia): Zolpidem (GABA-A agonist) and hypokalemia (K+ 3.1 mEq/L -> stimulates renal ammoniagenesis) severely worsen Hepatic Encephalopathy.
   • Intervention: Discontinue Zolpidem permanently; replace Potassium Chloride to target K+ >=4.0 mEq/L; initiate Lactulose 30 mL PO q2h until bowel movement then titrate to 2–3 soft stools/day PLUS Rifaximin 550 mg PO BID.`
      },
      {
        id: 'cb3-s4',
        number: '3.4',
        heading: 'Standardized PharmD / Residency OSCE Case Defense Rubric (100-Point Scale)',
        headingAr: 'سلم التقييم المعياري للدفاع عن الحالات السريرية (OSCE 100-Point Scoring Rubric)',
        evidenceGrade: 'ACPE / ASHP Residency Standard',
        body: `Clinical students and PGY-1/PGY-2 residents are evaluated across five weighted competency domains during structured case defenses:
• Domain 1 — Targeted Data Collection & BPMH Verification (20 Points): Extracts all pertinent positive/negative history, calculates exact CrCl (Cockcroft-Gault IBW/AdjBW), Child-Pugh, CHA2DS2-VASc, or Corrected Labs, and verifies allergy nature.
• Domain 2 — Drug Therapy Problem Identification & Prioritization (25 Points): Identifies 100% of life-threatening safety/contraindication errors FIRST before secondary chronic issues, classifying each by Indication, Effectiveness, Safety, and Adherence (IESC).
• Domain 3 — Evidence-Based Pharmacotherapy Plan (30 Points): Recommends exact drug name, dose, route, frequency, infusion duration, and treatment duration supported by primary guidelines (DiPiro 13th Ed, ACCP 2026).
• Domain 4 — Monitoring Plan for Efficacy & Toxicity (15 Points): Specifies exact objective parameters, target goals, and recheck timelines (e.g., "Recheck K+ and SCr in 48 hours; target Vancomycin AUC24/MIC 400–600 mg·h/L").
• Domain 5 — Interprofessional SBAR & Patient Counseling (10 Points): Delivers a concise 60-second SBAR recommendation to the attending physician.`
      }
    ],
    quickTables: [
      {
        title: 'OSCE 100-Point Clinical Case Evaluation Rubric',
        titleAr: 'جدول توزيع الدرجات في اختبار التقييم السريري الموضوعي (OSCE Rubric)',
        headers: ['Competency Domain', 'Weight', 'Passing Requirement', 'Critical Automatic-Fail Error'],
        rows: [
          ['1. Data Extraction & Equations', '20 pts', 'Calculates CrCl, Corrected Ca/Na/Phenytoin, & allergy type', 'Missing documented anaphylaxis or baseline AKI'],
          ['2. IESC Problem Prioritization', '25 pts', 'Ranks acute life-threatening DTPs #1', 'Prioritizing minor vitamin/statin issue over lethal hyperkalemia/shock'],
          ['3. Specific Drug Regimen Plan', '30 pts', 'Exact drug, dose, route, rate, & duration with guideline citation', 'Prescribing a contraindicated dose or omitting mandatory washout/load'],
          ['4. Efficacy & Safety Monitoring', '15 pts', 'Defines lab parameter + exact target + timeline', 'Vague monitoring ("monitor labs") without specific thresholds'],
          ['5. SBAR & Patient Education', '10 pts', 'Structured SBAR to physician & teach-back points', 'Unclear or unassertive safety recommendation']
        ]
      }
    ],
    boardPearls: [
      'During any clinical exam or bedside rounding defense, ALWAYS address acute life-threatening hemodynamic, electrolyte, or anaphylactic Drug Therapy Problems FIRST.',
      'Never write "adjust dose for renal function" in a SOAP plan — always state the exact calculated CrCl and the exact numerical dose, route, and interval (e.g., "CrCl 24 mL/min -> Meropenem 500 mg IV q12h infused over 3 hours").',
      'Every drug recommendation in an Assessment & Plan must be paired with both an Efficacy monitoring endpoint and a Toxicity monitoring endpoint.'
    ],
    boardPearlsAr: [
      'في أي مناقشة سريرية أو اختبار OSCE، يجب البدء دائماً بالمشاكل المهددة للحياة (الصدمة، فرط البوتاسيوم، الحساسية المفرطة) قبل المشاكل المزمنة.',
      'لا تكتب عبارات عامة مثل "عدّل الجرعة حسب الكلى" بل اذكر دائماً قيمة CrCl المحسوبة والجرعة الرقمية والفاصل الزمني بدقة.',
      'كل توصية دوائية في خطة SOAP يجب أن تقترن بمعيار لمراقبة الفعالية ومعيار لمراقبة السمية مع تحديد التوقيت.'
    ],
    keywords: ['benchmark cases', 'osce', 'iesc', 'dtp', 'rubric', 'soap note', 'case workup', 'clinical training']
  },
  {
    id: 'casebook-section4-lab-abg-equations',
    bookId: 'clinical-casebook-guide',
    chapterNumber: 4,
    title: 'Section IV: Bedside Laboratory Interpretation, Arterial Blood Gas (ABG) Acid-Base Analysis & Clinical Equations',
    titleAr: 'القسم الرابع (ص 246-310): تفسير التحاليل المخبرية، غازات الدم الشرياني (ABG)، والمعادلات الحسابية السريرية',
    authors: 'Terry L. Schwinghammer, PharmD; Joseph T. DiPiro, PharmD',
    edition: 'Pharmacotherapy Casebook: A Patient-Focused Approach, 13th Edition',
    pageRange: 'pp. 246–310',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'تفسير المختبر وغازات الدم والمعادلات السريرية',
    uan: '0217-0000-26-004-L04-P',
    sourceUrl: 'local://ref/chapter/casebook-section4-lab-abg-equations',
    citation: 'Schwinghammer TL, DiPiro JT, et al. Section IV: Laboratory Interpretation, ABG Analysis & Clinical Equations. Pharmacotherapy Casebook, 13th ed. McGraw Hill; 2026:246-310.',
    isVerbatimSource: true,
    learningObjectives: [
      'Execute the 5-step Arterial Blood Gas (ABG) interpretation algorithm including Albumin-Corrected Anion Gap, Winter’s Formula, and Delta Ratio.',
      'Calculate Ideal Body Weight (IBW), Adjusted Body Weight (AdjBW), Cockcroft-Gault CrCl, FENa, Corrected Calcium, Corrected Sodium, and Absolute Neutrophil Count (ANC).',
      'Distinguish drug-inducedcholestatic, hepatocellular, and mixed liver injury using the R-factor.'
    ],
    toc: [
      { id: 'cb4-s1', number: '4.1', title: '5-Step Arterial Blood Gas (ABG) & Acid-Base Compensation Algorithm (Winter’s Formula)' },
      { id: 'cb4-s2', number: '4.2', title: 'Compendium of Essential Bedside Clinical Equations (IBW, AdjBW, CrCl, ANC, Osmolality)' }
    ],
    sections: [
      {
        id: 'cb4-s1',
        number: '4.1',
        heading: '5-Step Arterial Blood Gas (ABG) & Acid-Base Compensation Algorithm (Winter’s Formula)',
        headingAr: 'الخوارزمية الخماسية لتفسير غازات الدم الشرياني (ABG) ومعادلة Winter للمعاوضة',
        evidenceGrade: 'Critical Care Diagnostic Standard',
        body: `Normal Arterial Blood Gas Reference Values: pH = 7.35–7.45 (7.40); PaCO2 = 35–45 mmHg (40 mmHg); HCO3- = 22–26 mEq/L (24 mEq/L); PaO2 = 80–100 mmHg; Normal Serum Anion Gap = 8–12 mEq/L.

The 5-Step Bedside ABG Interpretation Algorithm:
• Step 1 (Assess pH): pH <7.35 = Acidemia; pH >7.45 = Alkalemia. (If pH is normal 7.35–7.45 but PaCO2/HCO3 are abnormal, check whether pH is on the acidemic [<7.40] or alkalemic [>7.40] side, or if a mixed acid-base disorder is present).
• Step 2 (Identify Primary Disturbance — ROME Rule):
  - Respiratory Opposite: pH <7.35 with PaCO2 >45 mmHg = Primary Respiratory Acidosis; pH >7.45 with PaCO2 <35 mmHg = Primary Respiratory Alkalosis.
  - Metabolic Equal: pH <7.35 with HCO3- <22 mEq/L = Primary Metabolic Acidosis; pH >7.45 with HCO3- >26 mEq/L = Primary Metabolic Alkalosis.
• Step 3 (Always Calculate the Serum Anion Gap & Albumin Correction):
  - Anion Gap (AG) = Serum Na+ − (Serum Cl- + Serum HCO3-).
  - Albumin-Corrected Anion Gap = Measured AG + [2.5 × (4.0 − Serum Albumin in g/dL)]. (Hypoalbuminemia masks a high anion gap; every 1 g/dL drop in albumin below 4.0 lowers the unmeasured anion gap by 2.5 mEq/L!).
  - High Anion Gap Metabolic Acidosis (>12 mEq/L — MUDPILES / GOLD MARK): Methanol, Uremia, Diabetic/Alcoholic/Starvation Ketoacidosis, Propylene glycol (IV Lorazepam/Diazepam solvent!) / Paraldehyde, Isoniazid / Iron, Lactic acidosis (Sepsis, Metformin, Propofol, Linezolid, Cyanide), Ethylene glycol, Salicylates (causes mixed High-AG Metabolic Acidosis + Primary Respiratory Alkalosis!).
  - Normal Anion Gap (Hyperchloremic) Metabolic Acidosis (AG <=12 mEq/L): Diarrhea, Renal Tubular Acidosis (RTA), Acetazolamide, Topiramate, Spironolactone, or excessive 0.9% Normal Saline resuscitation.
• Step 4 (Assess Physiological Compensation — Winter's Formula in Metabolic Acidosis):
  - Expected PaCO2 = (1.5 × Serum HCO3-) + 8 ± 2.
  - If Measured PaCO2 > Expected PaCO2 range -> Concomitant Respiratory Acidosis exists!
  - If Measured PaCO2 < Expected PaCO2 range -> Concomitant Primary Respiratory Alkalosis exists (classic in Salicylate toxicity or early Sepsis!).`
      },
      {
        id: 'cb4-s2',
        number: '4.2',
        heading: 'Compendium of Essential Bedside Clinical Equations (IBW, AdjBW, CrCl, ANC, Osmolality)',
        headingAr: 'مرجع المعادلات السريرية الأساسية عند السرير (الوزن المثالي، التصفية الكلوية، تعداد العدلات المطلق)',
        evidenceGrade: 'Board & Bedside Calculation Standard',
        body: `1. Anthropometric Dosing Weights:
• Ideal Body Weight (IBW, Devine Formula):
  - Males: IBW (kg) = 50 + [2.3 × (Height in inches − 60)]
  - Females: IBW (kg) = 45.5 + [2.3 × (Height in inches − 60)]  (Note: 1 inch = 2.54 cm; 5 feet = 60 inches = 152.4 cm).
• Adjusted Body Weight (AdjBW — used when Total Body Weight [TBW] > 120% of IBW):
  - AdjBW (kg) = IBW + 0.4 × (TBW − IBW).

2. Cockcroft-Gault Creatinine Clearance (CrCl):
• CrCl (mL/min) = [(140 − Age) × Weight (kg)] / (72 × Serum Creatinine) × (0.85 if Female).
  - Weight Selection Rule: Use Actual Body Weight (TBW) if TBW < IBW; use Ideal Body Weight (IBW) if TBW is within 100–120% of IBW; use Adjusted Body Weight (AdjBW) if obese (TBW >120% IBW). (Exception: Direct Oral Anticoagulants [DOACs] and Vancomycin use Actual Body Weight).

3. Hematology & Oncology Absolute Neutrophil Count (ANC):
• ANC (cells/mm³) = Total WBC (cells/mm³) × [(% Segmented Neutrophils + % Bands) / 100].
  - Severe Neutropenia: ANC <500 cells/mm³; Profound Neutropenia: ANC <100 cells/mm³.

4. Serum Osmolality & Osmolal Gap:
• Calculated Serum Osmolality (mOsm/kg) = (2 × Serum Na+) + (Blood Glucose / 18) + (BUN / 2.8). (Normal = 275–295 mOsm/kg).
• Osmolal Gap = Measured Serum Osmolality − Calculated Serum Osmolality (Normal <10 mOsm/kg; elevated >10–15 mOsm/kg in Methanol, Ethylene Glycol, or Intravenous Lorazepam/Diazepam Propylene Glycol toxicity).`
      }
    ],
    quickTables: [
      {
        title: 'Bedside Clinical Equations Quick-Reference Card',
        titleAr: 'بطاقة المعادلات الحسابية السريرية السريعة للصيدلاني السريري',
        headers: ['Equation Name', 'Exact Mathematical Formula', 'Normal / Cutoff Threshold'],
        rows: [
          ['Winter’s Formula (Metabolic Acidosis)', 'Expected PaCO2 = (1.5 × HCO3-) + 8 ± 2', 'Verifies respiratory compensation'],
          ['Albumin-Corrected Anion Gap', 'AG_corr = [Na - (Cl + HCO3)] + 2.5 × (4.0 - Albumin)', 'Normal <= 12 mEq/L (>12 = HAGMA)'],
          ['Corrected Serum Calcium', 'Ca_corr = Measured Ca + 0.8 × (4.0 - Albumin)', 'Normal 8.5–10.2 mg/dL'],
          ['Corrected Serum Sodium (Hyperglycemia)', 'Na_corr = Measured Na + [0.016 × (Glucose - 100)]', 'Adds 1.6 mEq/L per 100 mg/dL BG >100'],
          ['Absolute Neutrophil Count (ANC)', 'ANC = WBC × [(%Segs + %Bands) / 100]', '<500 = Severe neutropenia | <1000 hold Clozapine'],
          ['Fractional Excretion of Sodium (FENa)', 'FENa (%) = [(U_Na × S_Cr) / (S_Na × U_Cr)] × 100', '<1% = Prerenal AKI | >2% = Intrinsic ATN']
        ]
      }
    ],
    boardPearls: [
      'High-dose continuous IV Lorazepam or Diazepam infusions contain Propylene Glycol as a solvent, causing hyperosmolality (Osmolal Gap >10–12) and High-Anion-Gap Lactic Acidosis with AKI.',
      'Salicylate (Aspirin) overdose classically produces a mixed primary Respiratory Alkalosis (direct medullary respiratory center stimulation) PLUS a High-Anion-Gap Metabolic Acidosis; treat with IV Sodium Bicarbonate to alkalinize serum and urine (target urine pH 7.5–8.0).',
      'Always correct the Anion Gap for hypoalbuminemia in ICU and cirrhotic patients: add 2.5 mEq/L to the Anion Gap for every 1 g/dL that Serum Albumin is below 4.0 g/dL.'
    ],
    boardPearlsAr: [
      'يحتوي اللورازيبام والديازيبام الوريدي على مذيب Propylene Glycol الذي يسبب عند التسريب العالي حماضاً لاكتيكياً وارتفاع الفجوة التناضحية وقصوراً كلوياً.',
      'التسمم بالأسبرين (Salicylates) يسبب اضطراباً مختلطاً مميزاً: قلاء تنفسي أولي + حماض استقلابي مرتفع الفجوة الأنيونية، ويُعالج ببيكربونات الصوديوم الوريدية.',
      'يجب تصحيح الفجوة الأنيونية عند نقص الألبومين بإضافة 2.5 لكل 1 جم/دل ينقصه الألبومين عن 4.0.'
    ],
    keywords: ['abg', 'acid-base', 'anion gap', 'winter formula', 'cockcroft-gault', 'ibw', 'adjbw', 'anc', 'osmolal gap', 'propylene glycol']
  },
  {
    id: 'casebook-section5-sbar-soap-documentation',
    bookId: 'clinical-casebook-guide',
    chapterNumber: 5,
    title: 'Section V: Interprofessional SBAR Communication, Physician Intervention Scripting & Legal SOAP Documentation',
    titleAr: 'القسم الخامس (ص 311-360): التواصل الطبي المهني (SBAR)، صياغة التدخلات الصيدلانية للأطباء، والتوثيق القانوني (SOAP Notes)',
    authors: 'Terry L. Schwinghammer, PharmD; JCPP Documentation Working Group',
    edition: 'Pharmacotherapy Casebook: A Patient-Focused Approach, 13th Edition',
    pageRange: 'pp. 311–360',
    systemCategory: 'Clinical Methodology & PPCP',
    systemCategoryAr: 'التوثيق السريري (SOAP) والتواصل الطبي (SBAR)',
    uan: '0217-0000-26-005-L04-P',
    sourceUrl: 'local://ref/chapter/casebook-section5-sbar-soap-documentation',
    citation: 'Schwinghammer TL, DiPiro JT, et al. Section V: Interprofessional SBAR & Legal SOAP Documentation. Pharmacotherapy Casebook, 13th ed. McGraw Hill; 2026:311-360.',
    isVerbatimSource: true,
    learningObjectives: [
      'Structure problem-oriented medical record (POMR) clinical pharmacy SOAP notes free of placement errors between Subjective, Objective, Assessment, and Plan.',
      'Deliver rapid 45-second SBAR (Situation, Background, Assessment, Recommendation) verbal interventions during ICU and internal medicine rounds.',
      'Execute legal inpatient clinical documentation standards, verbal order read-backs, and adverse drug reaction (MedWatch / Naranjo Scale) reporting.'
    ],
    toc: [
      { id: 'cb5-s1', number: '5.1', title: 'Anatomy of a Defensible Clinical Pharmacy SOAP Note & Common Placement Pitfalls' },
      { id: 'cb5-s2', number: '5.2', title: 'High-Impact Bedside SBAR Scripting & Naranjo Adverse Drug Reaction Causality Scale' }
    ],
    sections: [
      {
        id: 'cb5-s1',
        number: '5.1',
        heading: 'Anatomy of a Defensible Clinical Pharmacy SOAP Note & Common Placement Pitfalls',
        headingAr: 'الهيكل القياسي لمذكرة SOAP السريرية وتجنب أخطاء الخلط بين الأقسام',
        evidenceGrade: 'JCPP / ASHP Documentation Standard',
        body: `A clinical pharmacist's SOAP note is a permanent legal component of the electronic health record (EHR). Strict separation of S, O, A, and P prevents documentation errors:
1. S — Subjective (Patient- or Caregiver-Reported Information ONLY):
   - Chief complaint (CC), History of Present Illness (OPQRST), patient-reported medication adherence ("takes Ramipril 3 days a week"), allergy descriptions reported by the patient, and review of systems symptoms (dyspnea, chest pain, dizziness).
   - Pitfall: NEVER put laboratory values, vital signs, or physical exam findings discovered by clinicians in the Subjective section!
2. O — Objective (Measurable, Reproducible Clinician-Verified Data ONLY):
   - Vital signs (BP, HR, RR, Temp, SpO2, dry/wet weight), physical examination findings (JVD, rales, asterixis, pedal edema), laboratory panels, microbiology cultures/MICs, imaging/ECG/Echo results (LVEF, QTc), calculated CrCl, and the verified MAR/dispensing record.
   - Pitfall: NEVER put therapeutic interpretations ("patient has uncontrolled hypertension") or recommendations in the Objective section!
3. A — Assessment (Clinical Synthesis, Problem Prioritization & IESC Drug Therapy Problem Justification):
   - Numbered problem list ordered by clinical acuity (#1 Septic Shock / AKI; #2 HFrEF; #3 T2DM).
   - For each problem, state: (a) Disease etiology and current control status/severity, (b) IESC evaluation of current drug therapy (identifying specific Drug Therapy Problems), and (c) Clinical rationale and guideline evidence for why therapy must be initiated, stopped, or adjusted.
4. P — Plan (Actionable, Measurable Directives):
   - Drug Action: Exact Start / Stop / Hold / Dose-Adjust orders (Drug name, exact dose, route, frequency, infusion rate, duration).
   - Efficacy Monitoring: Exact parameter, goal target, and timeline.
   - Toxicity Monitoring: Exact lab/clinical parameter, threshold to hold, and timeline.
   - Patient Education & Follow-up.`
      },
      {
        id: 'cb5-s2',
        number: '5.2',
        heading: 'High-Impact Bedside SBAR Scripting & Naranjo Adverse Drug Reaction Causality Scale',
        headingAr: 'نماذج التواصل السريع مع الأطباء بنظام (SBAR) ومقياس Naranjo لتقييم التفاعلات الدوائية الضارة',
        evidenceGrade: 'TJC Communication Standard',
        body: `1. The 45-Second Bedside SBAR Intervention Template:
• S (Situation — 10 sec): Identify yourself, the patient (name/bed), and the urgent drug safety issue immediately ("Dr. Ahmed, I am calling about Mr. Mansour in ICU Bed 4 regarding his new Piperacillin-Tazobactam order and his documented Penicillin anaphylaxis").
• B (Background — 10 sec): Concise pertinent clinical context and labs ("He is in septic shock from HAP with a lactate of 4.2 mmol/L, acute kidney injury with CrCl 24 mL/min, and a history of intubation for angioedema after Amoxicillin").
• A (Assessment — 10 sec): Clinical consequence and guideline rule ("Piperacillin-Tazobactam carries a high risk of fatal IgE cross-reactivity, and his Vancomycin maintenance dose of 1 g q12h will accumulate to nephrotoxic levels at CrCl 24 mL/min").
• R (Recommendation — 15 sec): Exact actionable replacement order ("I recommend discontinuing Piperacillin-Tazobactam and starting Aztreonam 2 g IV load then 1 g IV q8h plus Ciprofloxacin 400 mg IV q12h, and giving a Vancomycin 2000 mg IV loading dose now followed by 1000 mg IV q24h with AUC monitoring. Shall I enter those verbal orders?").

2. Naranjo Adverse Drug Reaction (ADR) Probability Scale:
Scores causality of a suspected ADR based on timing, dechallenge, rechallenge, alternative causes, toxic drug levels, and objective confirmation:
• Score >= 9: Definite ADR
• Score 5 to 8: Probable ADR
• Score 1 to 4: Possible ADR
• Score <= 0: Doubtful ADR`
      }
    ],
    quickTables: [
      {
        title: 'SOAP Note Section Boundaries &Naranjo ADR Probability Scale',
        titleAr: 'جدول حدود أقسام مذكرة SOAP ومقياس Naranjo للاحتمالية الدوائية',
        headers: ['SOAP / ADR Component', 'What Belongs Here', 'What Must NEVER Be Placed Here'],
        rows: [
          ['Subjective (S)', 'Symptoms, OPQRST, patient-stated adherence & allergy story', 'Vital signs, lab values, ECG/Echo, or physical exam signs'],
          ['Objective (O)', 'Vitals, PE signs, Labs, Cultures, Imaging, MAR, CrCl calculation', 'Diagnostic conclusions or drug change recommendations'],
          ['Assessment (A)', 'Acuity-ranked problem list, IESC DTP analysis, guideline rationale', 'Raw lab lists without interpretation or vague statements'],
          ['Plan (P)', 'Start/Stop/Adjust drug + dose + route + duration + Efficacy/Safety monitoring', 'Unjustified changes not discussed in the Assessment'],
          ['Naranjo Scale', '>=9 Definite | 5–8 Probable | 1–4 Possible | <=0 Doubtful', 'Assuming ADR without evaluating dechallenge & alternative causes']
        ]
      }
    ],
    boardPearls: [
      'Physical examination findings (e.g., pulmonary crackles, JVD, 2+ pitting edema) are ALWAYS Objective (O), whereas symptoms reported by the patient (e.g., orthopnea, chest tightness, nausea) are ALWAYS Subjective (S).',
      'On the Naranjo ADR Probability Scale, a total score >=9 indicates a Definite ADR, 5–8 indicates a Probable ADR, 1–4 indicates a Possible ADR, and <=0 indicates a Doubtful ADR.',
      'Every verbal or telephone medication order must undergo an immediate "Write Down and Read Back" verification including full drug name, numerical dose, route, and frequency (avoid trailing zeros like 5.0 mg; always use leading zeros like 0.5 mg).'
    ],
    boardPearlsAr: [
      'علامات الفحص السريري التي يلاحظها الطبيب (مثل الخراخر الرئوية وتوذم الكاحلين) توضع دائماً في قسم Objective، بينما الأعراض التي يشكو منها المريض توضع في Subjective.',
      'في مقياس Naranjo للتفاعلات الضارة: مجموع >= 9 يعني علاقة مؤكدة (Definite)، و 5-8 محتملة جداً (Probable)، و 1-4 ممكنة (Possible).',
      'يُمنع كتابة الصفر على يمين الفاصلة (مثل 5.0 mg) خشية قراءته 50 ملغ، ويجب دائماً كتابة الصفر قبل الفاصلة العشرية (مثل 0.5 mg).'
    ],
    keywords: ['soap note', 'sbar', 'naranjo scale', 'adr', 'documentation', 'interprofessional communication', 'subjective', 'objective']
  }
];

export const hospitalCompendiumAdditionalChapters: VerbatimChapter[] = [
  {
    id: 'hospital-compendium-heparin-reversal',
    bookId: 'hospital-compendium',
    chapterNumber: 2,
    title: 'Section B: Weight-Based Unfractionated Heparin (UFH) Nomograms, Argatroban HIT Protocol & Urgent Anticoagulation Reversal',
    titleAr: 'القسم B: جداول معايرة الهيبارين الوريدي الموزون (UFH)، بروتوكول Argatroban في HIT، وعكس مضادات التخثر الإسعافي',
    authors: 'Hospital Pharmacy & Therapeutics (P&T) Anticoagulation Subcommittee',
    edition: '2026 Inpatient Clinical Dosing Compendium',
    pageRange: 'Compendium Sec. B (pp. 29–58)',
    systemCategory: 'Hospital Dosing & IV Protocols',
    systemCategoryAr: 'بروتوكولات مضادات التخثر الوريدية ومعايرتها',
    sourceUrl: 'local://ref/chapter/hospital-compendium-heparin-reversal',
    citation: 'Inpatient Clinical Dosing Compendium, 2026 Edition. Section B: Weight-Based UFH Nomograms, Direct Thrombin Inhibitors & Anticoagulant Reversal.',
    isVerbatimSource: true,
    learningObjectives: [
      'Execute weight-based IV Unfractionated Heparin (UFH) bolus and infusion titration nomograms for Venous Thromboembolism (80 U/kg bolus, 18 U/kg/h) versus Acute Coronary Syndrome (60 U/kg bolus, 12 U/kg/h).',
      'Dose and titrate IV Argatroban and Bivalirudin in Heparin-Induced Thrombocytopenia (HIT) across normal versus impaired hepatic/renal function.',
      'Administer exact weight- and INR-stratified 4-Factor PCC (Kcentra), Protamine, Idarucizumab, and Andexanet alfa reversal protocols.'
    ],
    toc: [
      { id: 'hc-b-s1', number: 'B.1', title: 'Weight-Based IV Unfractionated Heparin (UFH) VTE vs ACS Nomograms & Anti-Xa Titration' },
      { id: 'hc-b-s2', number: 'B.2', title: 'Inpatient Argatroban & Bivalirudin Dosing in Heparin-Induced Thrombocytopenia (HIT)' },
      { id: 'hc-b-s3', number: 'B.3', title: '4-Factor PCC (Kcentra) INR-Stratified Dosing & Protamine Neutralization Rules' }
    ],
    sections: [
      {
        id: 'hc-b-s1',
        number: 'B.1',
        heading: 'Weight-Based IV Unfractionated Heparin (UFH) VTE vs ACS Nomograms & Anti-Xa Titration',
        headingAr: 'جداول معايرة الهيبارين الوريدي غير المجزأ (UFH) في الجلطات الوريدية (VTE) والمتلازمة التاجية (ACS)',
        evidenceGrade: 'Hospital P&T High-Alert Standard',
        body: `Unfractionated Heparin (UFH) is an ISMP High-Alert Medication requiring standardized concentrations (25,000 units in 250 mL 0.45% NaCl or D5W = 100 units/mL) and strict weight-based smart-pump nomograms based on Actual Body Weight:
1. Venous Thromboembolism (DVT / PE) High-Intensity Nomogram:
   • Initial IV Bolus: 80 units/kg IV push (Maximum bolus cap: 10,000 units).
   • Initial Continuous IV Infusion: 18 units/kg/hour (Maximum initial rate cap: 2,000 units/hour).
   • Therapeutic Target (drawn every 6 hours until 2 consecutive levels are therapeutic, then every 24 hours): Antifactor Xa (UFH Anti-Xa) level 0.30 to 0.70 IU/mL (corresponding to aPTT ~60–85 seconds).

2. Acute Coronary Syndrome (STEMI / NSTEMI) & Stroke Low-Intensity Nomogram:
   • Initial IV Bolus: 60 units/kg IV push (Maximum bolus cap: 4,000 units; or 5,000 units in PCI).
   • Initial Continuous IV Infusion: 12 units/kg/hour (Maximum initial rate cap: 1,000 units/hour).
   • Therapeutic Target: UFH Anti-Xa level 0.30 to 0.50 IU/mL (aPTT ~50–70 seconds).`
      },
      {
        id: 'hc-b-s2',
        number: 'B.2',
        heading: 'Inpatient Argatroban & Bivalirudin Dosing in Heparin-Induced Thrombocytopenia (HIT)',
        headingAr: 'بروتوكول التسريب الوريدي لـ Argatroban و Bivalirudin في متلازمة HIT',
        evidenceGrade: 'ASH / Hospital P&T Protocol',
        body: `When Heparin-Induced Thrombocytopenia (HIT) is suspected (4Ts score >=4), immediately discontinue all heparin exposures and initiate a direct thrombin inhibitor:
1. Argatroban IV Infusion (Eliminated via Hepatic CYP3A4/Biliary excretion — Safe in Renal Failure / Dialysis):
   • Standard Normal Hepatic Function: Start at 2 mcg/kg/min IV continuous infusion (NO bolus) titrated every 2–4 hours to target aPTT 1.5 to 3.0 times baseline (not to exceed 100 seconds; max rate 10 mcg/kg/min).
   • Moderate Hepatic Impairment (Child-Pugh B/C, Total Bilirubin >1.5 mg/dL), Heart Failure, Multi-Organ Failure, or Post-Cardiac Surgery: Reduce initial infusion rate by 75% to 0.5 mcg/kg/min IV!
2. Bivalirudin IV Infusion (80% proteolytic cleavage + 20% renal clearance — Safe in Hepatic Impairment):
   • Normal Renal Function: 0.15 to 0.20 mg/kg/hour IV continuous infusion titrated to target aPTT 1.5 to 2.5 times baseline.
   • Renal Impairment: Reduce initial infusion to 0.08–0.10 mg/kg/hour if CrCl <30 mL/min or on CRRT/Hemodialysis.`
      },
      {
        id: 'hc-b-s3',
        number: 'B.3',
        heading: '4-Factor PCC (Kcentra) INR-Stratified Dosing & Protamine Neutralization Rules',
        headingAr: 'جدول جرعات مركب البروثرومبين الرباعي (4F-PCC) وقواعد المعادلة بالبروتامين',
        evidenceGrade: 'FDA / Hospital Emergency Reversal Protocol',
        body: `1. 4-Factor Prothrombin Complex Concentrate (4F-PCC / Kcentra) for Life-Threatening Warfarin Bleeding (always co-administer Vitamin K1 5–10 mg IV slow infusion over 30 min):
   • Pretreatment INR 2.0 to <4.0: 25 units/kg IV of Factor IX activity (Maximum dose: 2,500 units).
   • Pretreatment INR 4.0 to 6.0: 35 units/kg IV (Maximum dose: 3,500 units).
   • Pretreatment INR > 6.0: 50 units/kg IV (Maximum dose: 5,000 units).
   • Fixed-Dose Option for Intracranial Hemorrhage / DOAC Factor Xa Reversal: 1,500 to 2,000 units IV (or 50 units/kg up to 4,000 units for Apixaban/Rivaroxaban major bleeding).

2. Protamine Sulfate Neutralization of Unfractionated Heparin (UFH):
   Because UFH has a dose-dependent half-life of 60 to 90 minutes, calculate Protamine dose based ONLY on the UFH administered over the preceding 2 to 3 hours:
   • Immediate (<30 min since UFH): 1 mg Protamine per 100 units of UFH.
   • 30 to 60 minutes since UFH: 0.5 to 0.75 mg Protamine per 100 units of UFH.
   • 60 to 120 minutes since UFH: 0.375 to 0.5 mg Protamine per 100 units of UFH.
   • Maximum Single Dose: 50 mg IV infused slowly over >=10 minutes (<=5 mg/min) to prevent severe histamine-mediated hypotension, bradycardia, and pulmonary vasoconstriction.`
      }
    ],
    quickTables: [
      {
        title: 'Standardized Weight-Based IV Heparin (UFH) Titration Nomogram (VTE Target Anti-Xa 0.30–0.70 IU/mL)',
        titleAr: 'جدول المعايرة القياسي للهيبارين الوريدي (UFH) حسب مستوى Anti-Xa أو aPTT',
        headers: ['Anti-Xa Level (IU/mL)', 'Corresponding aPTT (sec)', 'Bolus / Hold Action', 'Infusion Rate Adjustment', 'Next Lab Draw'],
        rows: [
          ['< 0.20 IU/mL', '< 45 sec', 'Re-bolus 80 units/kg IV', 'Increase rate by +4 units/kg/h', 'In 6 hours'],
          ['0.20 to 0.29 IU/mL', '45 to 59 sec', 'Re-bolus 40 units/kg IV', 'Increase rate by +2 units/kg/h', 'In 6 hours'],
          ['0.30 to 0.70 IU/mL (GOAL)', '60 to 85 sec (GOAL)', 'No bolus / No hold', 'No change (Therapeutic Range)', 'In 6h (q24h once 2× in range)'],
          ['0.71 to 0.90 IU/mL', '86 to 100 sec', 'No hold', 'Decrease rate by −2 units/kg/h', 'In 6 hours'],
          ['0.91 to 1.10 IU/mL', '101 to 120 sec', 'Hold infusion for 60 minutes', 'Decrease rate by −3 units/kg/h', 'In 6 hours'],
          ['> 1.10 IU/mL', '> 120 sec', 'Hold infusion for 60–90 minutes', 'Decrease rate by −4 units/kg/h & notify MD', 'In 6 hours']
        ]
      }
    ],
    boardPearls: [
      'When calculating Protamine reversal for a continuous IV Heparin infusion, sum ONLY the heparin units infused during the last 2 to 3 hours (e.g., running at 1200 U/h -> ~2400–3000 active units -> give 25–30 mg Protamine IV over 10 min, max 50 mg).',
      'Reduce Argatroban initial rate from 2 mcg/kg/min to 0.5 mcg/kg/min in patients with hepatic impairment (Total Bilirubin >1.5 mg/dL), heart failure, or critical illness.',
      '4-Factor PCC (Kcentra) is dosed according to baseline INR (25 U/kg for INR 2–<4; 35 U/kg for INR 4–6; 50 U/kg for INR >6) and must always be paired with IV Vitamin K 5–10 mg.'
    ],
    boardPearlsAr: [
      'عند حساب جرعة البروتامين لعكس التسريب المستمر للهيبارين، تُحسب فقط كمية الهيبارين المسربة خلال آخر ساعتين إلى 3 ساعات وبحد أقصى 50 ملغ.',
      'تُخفض سرعة بدء Argatroban من 2 إلى 0.5 مكغ/كجم/دقيقة في مرضى القصور الكبدي (البيليروبين > 1.5) أو قصور القلب.',
      'تُحدد جرعة 4F-PCC (Kcentra) حسب قيمة INR الأساسية (25 أو 35 أو 50 وحدة/كجم) مع إعطاء فيتامين K وريدياً دائماً.'
    ],
    keywords: ['heparin nomogram', 'ufh', 'anti-xa', 'aptt', 'argatroban', 'bivalirudin', 'kcentra', 'protamine', 'reversal']
  },
  {
    id: 'hospital-compendium-vasoactive-icu',
    bookId: 'hospital-compendium',
    chapterNumber: 3,
    title: 'Section C: ICU Vasoactive, Inotropic & Sedative Infusions, Receptor Profiles & Phentolamine Extravasation Rescue',
    titleAr: 'القسم C: محاليل العناية المركزة الرافعة للضغط والمقوية للقلب والمهدئة، وبروتوكول إنقاذ التسرب الوعائي (Phentolamine)',
    authors: 'Hospital Pharmacy & Therapeutics (P&T) Critical Care Committee',
    edition: '2026 Inpatient Clinical Dosing Compendium',
    pageRange: 'Compendium Sec. C (pp. 59–92)',
    systemCategory: 'Hospital Dosing & IV Protocols',
    systemCategoryAr: 'محاليل العناية المركزة وإنقاذ التسرب الوعائي',
    sourceUrl: 'local://ref/chapter/hospital-compendium-vasoactive-icu',
    citation: 'Inpatient Clinical Dosing Compendium, 2026 Edition. Section C: ICU Vasoactive, Inotropic & Sedative Infusions & Extravasation Management.',
    isVerbatimSource: true,
    learningObjectives: [
      'Compare Alpha-1, Beta-1, Beta-2, and V1 receptor affinities, standard ICU dilutions, and titration ranges for Norepinephrine, Epinephrine, Vasopressin, Phenylephrine, Dobutamine, and Milrinone.',
      'Execute the emergency bedside Phentolamine (and topical Nitroglycerin / Terbutaline) antidote protocol for vasopressor extravasation.',
      'Titrate ICU analgosedation (Fentanyl, Propofol, Dexmedetomidine) and neuromuscular blockade (Cisatracurium Train-of-Four).'
    ],
    toc: [
      { id: 'hc-c-s1', number: 'C.1', title: 'Vasopressor & Inotrope Receptor Pharmacology, Standard Dilutions & Titration Ranges' },
      { id: 'hc-c-s2', number: 'C.2', title: 'Emergency Vasopressor Extravasation Protocol (Intradermal Phentolamine Rescue)' },
      { id: 'hc-c-s3', number: 'C.3', title: 'ICU Analgosedation (Propofol PRIS, Dexmedetomidine) & Cisatracurium ARDS Paralysis' }
    ],
    sections: [
      {
        id: 'hc-c-s1',
        number: 'C.1',
        heading: 'Vasopressor & Inotrope Receptor Pharmacology, Standard Dilutions & Titration Ranges',
        headingAr: 'الفارماكولوجيا السريرية للمستقبلات والتراكيز القياسية لرافعات الضغط ومقويات القلب',
        evidenceGrade: 'SCCM / ASHP Standardize 4 Safety',
        body: `1. Vasopressor Receptor Profiles & Standard ICU Titration Ranges (Target MAP >=65 mmHg):
• Norepinephrine (Levophed — Alpha-1 ++++, Beta-1 ++, Beta-2 0):
  - Standard Concentration: 4 mg in 250 mL D5W or NS (16 mcg/mL; high-concentration 8 mg or 16 mg in 250 mL).
  - Titration Range: 0.01 to 0.5 mcg/kg/min (or 2–35 mcg/min). First-line vasopressor in Septic, Cardiogenic, and Hypovolemic/Distributive Shock.
• Vasopressin (Pitressin — Vascular V1a ++++, Renal V2 +):
  - Standard Concentration: 20 units in 100 mL NS/D5W (0.2 units/mL).
  - Fixed Non-Titrated Dose in Septic Shock: 0.03 units/minute (range 0.03–0.04 units/min; NEVER titrate above 0.04 units/min due to mesenteric, digital, and myocardial ischemia!). Added when Norepinephrine reaches 0.25–0.5 mcg/kg/min.
• Epinephrine (Adrenalin — Beta-1 ++++, Beta-2 +++, Alpha-1 ++++ at high doses):
  - Titration Range: 0.01 to 0.5 mcg/kg/min. First-line in Anaphylactic Shock; third-line in Septic Shock; causes beta-2-mediated skeletal muscle glycogenolysis and hyperlactatemia (elevates serum lactate even when tissue perfusion is improving!).
• Phenylephrine (Neo-Synephrine — Pure Alpha-1 ++++, Beta 0):
  - Titration Range: 0.1 to 2.0 mcg/kg/min (or 10–200 mcg/min). Pure arterial/venous vasoconstrictor that triggers baroreceptor reflex bradycardia and reduces cardiac output; reserved for Norepinephrine-induced tachyarrhythmias or neurogenic shock / HOCM.`
      },
      {
        id: 'hc-c-s2',
        number: 'C.2',
        heading: 'Emergency Vasopressor Extravasation Protocol (Intradermal Phentolamine Rescue)',
        headingAr: 'البروتوكول الإسعافي لإنقاذ تسرب رافعات الضغط خارج الوريد (Phentolamine Antidote)',
        evidenceGrade: 'Hospital Critical Care Safety Mandate',
        body: `Extravasation of Alpha-1 adrenergic vasopressors (Norepinephrine, Epinephrine, Dopamine, Phenylephrine) or Vasopressin into subcutaneous tissue causes intense local vasoconstriction, dermal ischemia, and full-thickness tissue necrosis/sloughing:
Step-by-Step Bedside Extravasation Rescue Protocol:
1. STOP the infusion immediately, disconnect the IV tubing, and LEAVE the cannula/needle in place initially to gently aspirate 3 to 5 mL of blood/extravasated drug before removing the catheter.
2. Elevate the affected extremity and apply DRY WARM COMPRESSES for 20 minutes 3–4 times daily (warmth promotes local vasodilation and drug dispersion; NEVER apply cold compresses to vasopressor extravasation, as cold worsens vasoconstriction and ischemia!).
3. Administer Intradermal / Subcutaneous Phentolamine Mesylate (Competitive Non-Selective Alpha-1 & Alpha-2 Blocker — Antidote of Choice):
   - Dilute Phentolamine 5 to 10 mg in 10 mL of 0.9% Normal Saline (0.5–1 mg/mL).
   - Using a 25- to 27-gauge needle, infiltrate 5 to 10 mL (5–10 mg total) subcutaneously in a clock-face ring around the leading edge of the blanched ischemic area as soon as possible (ideally within 12 hours). Hyperemia and return of skin warmth should occur within minutes.
4. Alternative Rescue (if Phentolamine is unavailable or for Vasopressin extravasation): Subcutaneous Terbutaline (1 mg in 10 mL NS local infiltration) and/or Topical 2% Nitroglycerin Ointment (1-inch strip applied over the ischemic site every 8 hours).`
      },
      {
        id: 'hc-c-s3',
        number: 'C.3',
        heading: 'ICU Analgosedation (Propofol PRIS, Dexmedetomidine) & Cisatracurium ARDS Paralysis',
        headingAr: 'التسكين والتهدئة في العناية المركزة (متلازمة PRIS، ديكسميديتوميدين) والإرخاء العضلي في ARDS',
        evidenceGrade: 'SCCM PADIS Guideline',
        body: `• Analgesia-First Sedation (RASS Target 0 to −2): Treat pain first with IV Fentanyl (25–100 mcg/h; preferred in renal failure and hemodynamic instability) or Hydromorphone, then add a non-benzodiazepine sedative:
  - Propofol (5–50 mcg/kg/min): Rapid onset/offset; causes hypotension and hypertriglyceridemia (formulated in 10% lipid = 1.1 kcal/mL). Monitor for Propofol-Related Infusion Syndrome (PRIS — occurs at doses >50–70 mcg/kg/min for >48 hours: refractory bradycardia, metabolic acidosis, rhabdomyolysis/CK >5000 U/L, hyperkalemia, hepatomegaly, and renal failure).
  - Dexmedetomidine (Precedex, 0.2–1.5 mcg/kg/h; central Alpha-2 agonist): Preserves respiratory drive (can continue through extubation!), reduces ICU delirium compared to Lorazepam/Midazolam, and causes bradycardia and hypotension (avoid loading bolus).
• Continuous Neuromuscular Blockade in Severe ARDS (PaO2/FiO2 <150):
  - Cisatracurium (Nimbex; 1–3 mcg/kg/min) is the neuromuscular blocker of choice in multi-organ failure because it undergoes non-enzymatic Hofmann elimination (dependent only on physiological pH and temperature — completely independent of liver and kidney function!). Always ensure deep sedation (RASS −4 to −5 / BIS 40–60), Lubricating Eye Drops q4h (prevents corneal ulceration), DVT prophylaxis, and Train-of-Four (TOF) peripheral nerve stimulation monitoring (target 1 to 2 twitches out of 4).`
      }
    ],
    quickTables: [
      {
        title: 'ICU Vasopressor & Inotrope Receptor Activity & Clinical Niche Matrix',
        titleAr: 'جدول فعالية رافعات الضغط ومقويات القلب على المستقبلات ودواعي استخدامها في العناية المركزة',
        headers: ['Vasoactive Agent', 'Alpha-1', 'Beta-1', 'Beta-2 / Other', 'Primary ICU Clinical Niche & Key Pearl'],
        rows: [
          ['Norepinephrine', '++++', '++', '0', '1st-line in Septic & Cardiogenic Shock (0.01–0.5 mcg/kg/min)'],
          ['Vasopressin', '0', '0', 'V1a ++++', '2nd-line in Septic Shock at fixed 0.03 units/min (works in severe acidemia)'],
          ['Epinephrine', '++++', '++++', '+++ (Beta-2)', '1st-line Anaphylaxis; 3rd-line Sepsis; causes Beta-2 hyperlactatemia & hyperglycemia'],
          ['Phenylephrine', '++++', '0', '0', 'Pure Alpha-1; causes reflex bradycardia; use if Norepinephrine causes AFib/VT'],
          ['Dobutamine', '+/0', '++++', '++ (Beta-2)', 'Inodilator for Cold & Wet shock (t1/2 = 2 min); blunted by chronic Carvedilol'],
          ['Milrinone', '0', '0', 'PDE-3 Inhibitor', 'Inodilator (0.125–0.5 mcg/kg/min); works on Beta-blockers; reduce 50% if CrCl <30']
        ]
      }
    ],
    boardPearls: [
      'For vasopressor extravasation, apply WARM dry compresses and infiltrate intradermal Phentolamine (5–10 mg in 10 mL NS) around the ischemic site.',
      'Cisatracurium undergoes Hofmann elimination (pH- and temperature-dependent degradation) and is the neuromuscular blocker of choice in combined hepatic and renal failure.',
      'Propofol-Related Infusion Syndrome (PRIS) presents with unexplained high-anion-gap lactic acidosis, rhabdomyolysis (elevated CK), hyperkalemia, hypertriglyceridemia, and refractory bradycardia/asystole.'
    ],
    boardPearlsAr: [
      'عند تسرب رافعات الضغط تحت الجلد، تُطبق كمادات دافئة جافة ويُحقن ترياق Phentolamine (5-10 ملغ في 10 مل محلول ملحي) موضعياً حول المنطقة.',
      'يُستقلب Cisatracurium عبر تفاعل Hofmann المعتمد على الحرارة ودرجة الحموضة، مما يجعله المرخي العضلي الأمثل في الفشل الكبدي والكلوي المشترك.',
      'متلازمة التسريب بالبروبوفول (PRIS) تتميز بحماض لاكتيكي وانحلال عضلي (ارتفاع CK) وفرط بوتاسيوم وبطء قلب معند.'
    ],
    keywords: ['vasopressors', 'norepinephrine', 'vasopressin', 'epinephrine', 'phenylephrine', 'phentolamine', 'extravasation', 'propofol', 'dexmedetomidine', 'cisatracurium']
  },
  {
    id: 'notebooklm-icu-stewardship-hub',
    bookId: 'hospital-compendium',
    chapterNumber: 4,
    title: 'Section D: ICU Daily Rounding Checklist (FAST HUGS BID), 48–72h Antimicrobial De-escalation & IV-to-PO Switch Protocol',
    titleAr: 'القسم D: قائمة تفقد جولة العناية المركزة اليومية (FAST HUGS BID)، مراجعة تضييق طيف المضادات (48h)، والتحويل من الوريدي للفموي',
    authors: 'ClinPharm Hospital Antimicrobial Stewardship & ICU Committee',
    edition: '2026 Inpatient Clinical Dosing Compendium & Stewardship Hub',
    pageRange: 'Compendium Sec. D (pp. 93–124)',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'ترشيد المضادات الحيوية وجولة العناية المركزة اليومية',
    sourceUrl: 'local://ref/chapter/notebooklm-icu-stewardship-hub',
    citation: 'ClinPharm Hospital Antimicrobial Stewardship & ICU Committee. Section D: FAST HUGS BID Daily Rounding Protocol, 48h De-escalation & IV-to-PO Conversion; 2026:93-124.',
    isVerbatimSource: true,
    learningObjectives: [
      'Execute the 11-point daily ICU clinical pharmacy rounding audit (FAST HUGS BID) on every critically ill patient.',
      'Conduct the mandatory 48-to-72-hour antimicrobial stewardship timeout using MRSA nasal PCR negative predictive value (>96%) and MIC susceptibility.',
      'Convert 100% bioequivalent intravenous antimicrobials and cardiovascular agents to enteral therapy upon hemodynamic stabilization.'
    ],
    toc: [
      { id: 'hc-d-s1', number: 'D.1', title: 'The 11-Point Daily ICU Clinical Pharmacy Audit (FAST HUGS BID Protocol)' },
      { id: 'hc-d-s2', number: 'D.2', title: '48-to-72-Hour Antimicrobial Timeout, MRSA Nasal PCR & Carbapenem Sparing' },
      { id: 'hc-d-s3', number: 'D.3', title: 'Hospital-Wide 1:1 Bioequivalent IV-to-PO Conversion Protocol & Tube Feeding Rules' }
    ],
    sections: [
      {
        id: 'hc-d-s1',
        number: 'D.1',
        heading: 'The 11-Point Daily ICU Clinical Pharmacy Audit (FAST HUGS BID Protocol)',
        headingAr: 'قائمة التفقد اليومية المنهجية للصيدلاني السريري في العناية المركزة (FAST HUGS BID)',
        evidenceGrade: 'SCCM Rounding Standard',
        body: `Every morning during multidisciplinary ICU rounds, the clinical pharmacist audits the 11 components of FAST HUGS BID:
• F — Feeding & Fluids: Initiate early enteral nutrition within 24–48h of ICU admission; transition resuscitation fluids to de-resuscitation/diuresis once vasopressors are weaning; audit IV fluid sodium/chloride load.
• A — Analgesia: Assess pain via CPOT/BPS in intubated patients; prioritize multimodal analgesia and lowest effective IV opioid (Fentanyl/Hydromorphone).
• S — Sedation: Target light sedation (RASS 0 to −2) using Propofol or Dexmedetomidine; perform daily Spontaneous Awakening Trial (SAT); avoid Benzodiazepines.
• T — Thromboembolism Prophylaxis: Verify pharmacologic VTE prophylaxis on every patient (Enoxaparin 40 mg SC q24h if CrCl >=30 mL/min; reduce Enoxaparin to 30 mg SC q24h or switch to UFH 5000 units SC q8–12h if CrCl <30 mL/min).
• H — Head-of-Bed Elevation (30° to 45°) & Oral Chlorhexidine / Toothbrushing for VAP prevention.
• U — Ulcer Prophylaxis (Stress Ulcer Prophylaxis — SUP): Administer Famotidine or Pantoprazole ONLY if major coagulopathy (Platelets <50k, INR >1.5), mechanical ventilation >48h, shock, or GI bleed history; discontinue SUP immediately upon ICU transfer out!
• G — Glycemic Control: Maintain blood glucose 140 to 180 mg/dL; avoid hypoglycemia (<70 mg/dL) and sliding-scale monotherapy.
• S — Spontaneous Breathing Trial (SBT): Pair daily SAT with SBT to accelerate extubation.
• B — Bowel Regimen: Prescribe stimulant laxative (Senna ± Polyethylene glycol) for all patients receiving opioids (avoid docusate monotherapy, which is ineffective).
• I — Indwelling Catheter Removal: Audit central venous catheters, arterial lines, and Foley catheters daily for prompt removal to prevent CLABSI and CAUTI.
• D — De-escalation of Medications: Narrow empiric antibiotics at 48–72h, convert IV to PO, and discontinue PRN antipsychotics/sedatives.`
      },
      {
        id: 'hc-d-s2',
        number: 'D.2',
        heading: '48-to-72-Hour Antimicrobial Timeout, MRSA Nasal PCR & Carbapenem Sparing',
        headingAr: 'وقفة مراجعة وتضييق طيف المضادات بعد 48-72 ساعة ومسحة MRSA الأنفية',
        evidenceGrade: 'IDSA / ASHP Antimicrobial Stewardship Guideline',
        body: `Prolonged empiric broad-spectrum therapy (Vancomycin + Meropenem / Piperacillin-Tazobactam) beyond 48–72 hours without microbiological justification drives Carbapenem-Resistant Enterobacterales (CRE), Clostridioides difficile infection, and nephrotoxicity:
1. Rapid MRSA Nasal PCR De-escalation Rule in Pneumonia:
   • A negative MRSA nasal PCR swab obtained within 48 hours of admission has a >96% to 99% Negative Predictive Value (NPV) for MRSA pneumonia (CAP, HAP, and VAP).
   • Action: Discontinue empiric IV Vancomycin or Linezolid within 24–48 hours in pneumonia patients if the MRSA nasal PCR and respiratory cultures are negative! (Note: MRSA nasal swab does NOT rule out MRSA bacteremia or deep surgical site infection).
2. Gram-Negative Carbapenem-Sparing De-escalation:
   • Once 48-to-72-hour blood, sputum, or urine culture susceptibilities (MICs) finalize, immediately de-escalate Meropenem or Imipenem to the narrowest effective beta-lactam (e.g., Ceftriaxone for pan-susceptible E. coli/Klebsiella; Cefepime or Piperacillin-Tazobactam for susceptible Pseudomonas; Ampicillin-Sulbactam for susceptible Acinetobacter).
   • Exceptions Requiring Carbapenem Continuation: Confirmed Extended-Spectrum Beta-Lactamase (ESBL)-producing Enterobacterales (MERINO trial proved Meropenem reduces 30-day mortality compared to Piperacillin-Tazobactam in ESBL bloodstream infections!) or AmpC-hyperproducing organisms (Enterobacter cloacae, Klebsiella aerogenes, Citrobacter freundii — where Cefepime or Meropenem is required instead of Ceftriaxone).`
      },
      {
        id: 'hc-d-s3',
        number: 'D.3',
        heading: 'Hospital-Wide 1:1 Bioequivalent IV-to-PO Conversion Protocol & Tube Feeding Rules',
        headingAr: 'بروتوكول المستشفى للتحويل المباشر (1:1) من الوريدي إلى الفموي وقواعد التغذية الأنبوبية',
        evidenceGrade: 'Hospital P&T Stewardship Policy',
        body: `1. Criteria for Automatic Pharmacist-Driven IV-to-PO Conversion:
• Functioning gastrointestinal tract (tolerating enteral diet, tube feeds, or oral liquids without severe vomiting, ileus, active GI bleeding, or short-bowel malabsorption).
• Improving clinical trajectory (afebrile or down-trending temperature curve for >=24 hours, down-trending WBC, and not in refractory shock requiring escalating vasopressors).
• Infection is NOT a central nervous system infection (meningitis/brain abscess) or infective endocarditis requiring high-dose parenteral bactericidal therapy.

2.Mandatory Enteral Tube Feeding Hold Rules:
• Phenytoin Suspension, Ciprofloxacin, and Levofloxacin bind to enteral nutrition proteins and divalent cations inside nasogastric/orogastric tubes, reducing bioavailability by 50–70%. Hold continuous enteral tube feeds for 1 to 2 hours BEFORE and 1 to 2 hours AFTER administering enteral Phenytoin or Fluoroquinolones!`
      }
    ],
    quickTables: [
      {
        title: 'Automatic Pharmacist-Driven 1:1 Bioequivalent IV-to-PO Conversion Table',
        titleAr: 'جدول الأدوية المعتمدة للتحويل التلقائي (1:1) من الوريدي إلى الفموي',
        headers: ['Medication', 'Oral Bioavailability', 'Intravenous Regimen', 'Equivalent Oral (PO) Regimen'],
        rows: [
          ['Linezolid', '100%', '600 mg IV q12h', '600 mg PO q12h'],
          ['Levofloxacin', '99%', '500 mg or 750 mg IV q24h', '500 mg or 750 mg PO q24h'],
          ['Moxifloxacin', '90%', '400 mg IV q24h', '400 mg PO q24h'],
          ['Ciprofloxacin', '70–80%', '400 mg IV q12h (or q8h)', '500 mg PO q12h (or 750 mg PO q12h)'],
          ['Metronidazole', '100%', '500 mg IV q8h', '500 mg PO q8h'],
          ['Fluconazole / Voriconazole', '>90–96%', '400 mg IV q24h (Fluconazole)', '400 mg PO q24h'],
          ['TMP-SMX (Bactrim)', '90–100%', '8–15 mg/kg/d (TMP) IV', 'Identical mg dose PO (1 DS = 160 mg TMP)']
        ]
      }
    ],
    boardPearls: [
      'For ESBL-producing E. coli or Klebsiella bloodstream infections, Meropenem (or Ertapenem after stabilization) is mandatory over Piperacillin-Tazobactam even if in-vitro susceptibility reports Piperacillin-Tazobactam as susceptible (MERINO Trial).',
      'A negative MRSA nasal PCR has a >96% negative predictive value for MRSA pneumonia and justifies immediate discontinuation of empiric Vancomycin in pneumonia.',
      'Hold enteral tube feedings 1 to 2 hours before and after enteral Phenytoin or Fluoroquinolone administration to prevent 70% loss of absorption.'
    ],
    boardPearlsAr: [
      'في تجرثم الدم ببكتيريا ESBL، يُعد الميروبينيم (Meropenem) إلزامياً بدلاً من Piperacillin-Tazobactam حتى لو أظهرت المزرعة حساسية مخبرية (دراسة MERINO).',
      'سلبية مسحة الأنف لـ MRSA تنفي ذات الرئة بـ MRSA بنسبة تفوق 96% وتسمح بإيقاف الفانكومايسين فوراً.',
      'يجب إيقاف التغذية الأنبوبية لمدة ساعة إلى ساعتين قبل وبعد إعطاء الفينيتوين أو الفلوروكينولونات الفموية.'
    ],
    keywords: ['fast hugs bid', 'stewardship', 'de-escalation', 'mrsa nasal pcr', 'merino trial', 'esbl', 'iv to po', 'linezolid', 'levofloxacin']
  },
  {
    id: 'hospital-compendium-antimicrobial-crrt',
    bookId: 'hospital-compendium',
    chapterNumber: 5,
    title: 'Section E: Extended-Infusion Beta-Lactam Protocols, CRRT / Hemodialysis Dosing Matrix & Nephrotoxin Stewardship',
    titleAr: 'القسم E: بروتوكولات التسريب الممتد للبيتا لاكتام، مصفوفة الجرعات في الغسيل الكلوي المستمر (CRRT) والتقليدي (IHD)، وحماية الكلى',
    authors: 'Hospital Pharmacy & Therapeutics (P&T) Renal & Infectious Diseases Committee',
    edition: '2026 Inpatient Clinical Dosing Compendium',
    pageRange: 'Compendium Sec. E (pp. 125–160)',
    systemCategory: 'Hospital Dosing & IV Protocols',
    systemCategoryAr: 'بروتوكولات التسريب الممتد والغسيل الكلوي (CRRT / IHD)',
    sourceUrl: 'local://ref/chapter/hospital-compendium-antimicrobial-crrt',
    citation: 'Inpatient Clinical Dosing Compendium, 2026 Edition. Section E: Extended-Infusion Beta-Lactams, CRRT/IHD Renal Replacement Dosing & Nephrotoxin Stewardship.',
    isVerbatimSource: true,
    learningObjectives: [
      'Dose extended-infusion Piperacillin-Tazobactam, Cefepime, and Meropenem across normal renal function, CrCl <30 mL/min, Intermittent Hemodialysis (IHD), and Continuous Renal Replacement Therapy (CRRT).',
      'Explain why Vancomycin + Piperacillin-Tazobactam induces synergistic pseudonephrotoxicity (OAT1/OAT3 tubular creatinine secretion inhibition) and true AKI compared to Vancomycin + Cefepime/Meropenem.',
      'Determine which drugs are removed by hemodialysis (low molecular weight, low protein binding, small Vd, water-soluble) and require post-HD supplementation.'
    ],
    toc: [
      { id: 'hc-e-s1', number: 'E.1', title: 'Complete Renal, IHD & CRRT Antimicrobial Dosing Matrix' },
      { id: 'hc-e-s2', number: 'E.2', title: 'Vancomycin + Piperacillin-Tazobactam Nephrotoxicity & Physicochemical Dialyzability Rules' }
    ],
    sections: [
      {
        id: 'hc-e-s1',
        number: 'E.1',
        heading: 'Complete Renal, IHD & CRRT Antimicrobial Dosing Matrix',
        headingAr: 'المصفوفة الشاملة لجرعات المضادات الحيوية حسب CrCl والغسيل الكلوي المتقطع (IHD) والمستمر (CRRT)',
        evidenceGrade: 'Hospital P&T Renal Dosing Standard',
        body: `Continuous Renal Replacement Therapy (CRRT — CVVH, CVVHD, CVVHDF at standard effluent flow rates of 20–25 mL/kg/hour) provides continuous 24-hour solute clearance equivalent to an endogenous Creatinine Clearance of approximately 25 to 50 mL/min!
• Critical CRRT Dosing Rule: Never dose CRRT patients using Intermittent Hemodialysis (IHD) regimens! Using low IHD doses in a patient on continuous 24-hour CRRT results in severe under-dosing, subtherapeutic antimicrobial concentrations, and septic mortality.
• Critical IHD Timing Rule: For dialyzable antimicrobials (Beta-lactams, Aminoglycosides, Vancomycin, Fluconazole, Acyclovir, Metronidazole), always administer the daily maintenance dose AFTER the hemodialysis session on dialysis days so the freshly infused dose is not immediately stripped by the dialyzer.`
      },
      {
        id: 'hc-e-s2',
        number: 'E.2',
        heading: 'Vancomycin + Piperacillin-Tazobactam Nephrotoxicity & Physicochemical Dialyzability Rules',
        headingAr: 'السمية الكلوية المشتركة لـ Vancomycin + Piperacillin-Tazobactam وقواعد القابلية للغسيل الكلوي',
        evidenceGrade: 'Clinical Nephropharmacology Standard',
        body: `1. Vancomycin + Piperacillin-Tazobactam Acute Kidney Injury (ACORN Trial & Nephrotoxin Stewardship):
   • Co-administration of Vancomycin + Piperacillin-Tazobactam increases measured Serum Creatinine elevation (20–30% incidence) compared to Vancomycin + Cefepime or Vancomycin + Meropenem through two mechanisms:
     (a) Competitive inhibition of renal proximal tubular organic anion transporters (OAT1/OAT3 and MATE1/OCT2), which blocks tubular creatinine secretion (raising SCr without dropping true Cystatin-C GFR), AND
     (b) Synergistic oxidative proximal tubular necrosis when Vancomycin AUC24 exceeds 600 mg·h/L.
   • Clinical Action: In patients with baseline Stage 2–3 AKI or multiple nephrotoxins, prefer Cefepime or Meropenem over Piperacillin-Tazobactam when combined with Vancomycin (or substitute Linezolid for Vancomycin), and utilize Cystatin-C eGFR and AUC24/MIC monitoring.

2. Four Physicochemical Properties Required for a Drug to Be Dialyzable (Removed by Hemodialysis):
   • Low Molecular Weight (<500 Daltons; high-flux membranes remove up to 1,500–10,000 Daltons, allowing Vancomycin [1,449 Da] removal).
   • Low Plasma Protein Binding (<80% bound — only unbound free drug crosses the dialysis membrane; e.g., Ceftriaxone [90–95% protein bound], Oxacillin/Nafcillin, Clindamycin, Linezolid [metabolized], and DOACs Apixaban/Rivaroxaban are NOT significantly dialyzed, whereas Dabigatran [35% protein bound] IS dialyzable).
   • Small Volume of Distribution (Vd <1.0 L/kg — drugs sequestered in adipose/tissues like Digoxin [Vd 7 L/kg], Tricyclic Antidepressants, and Amiodarone [Vd 60 L/kg] are NOT removable by hemodialysis!).
   • High Water Solubility (Hydrophilicity).`
      }
    ],
    quickTables: [
      {
        title: 'Hospital ICU Antimicrobial Dosing Across CrCl, Intermittent HD (IHD) & CRRT',
        titleAr: 'الجدول المرجعي لجرعات مضادات العناية المركزة في القصور الكلوي والغسيل المتقطع (IHD) والمستمر (CRRT)',
        headers: ['Antimicrobial (Extended Infusion)', 'Normal Renal (CrCl >50)', 'CrCl 15–29 mL/min', 'Intermittent HD (Give Post-HD)', 'CRRT (CVVHDF 20–25 mL/kg/h)'],
        rows: [
          ['Meropenem (3h infusion)', '1–2 g IV q8h', '500 mg–1 g IV q12h', '500 mg IV q24h (post-HD)', '1 g IV q8h or 1 g IV q12h'],
          ['Cefepime (3h infusion)', '2 g IV q8h', '1 g IV q12h or 2 g q24h', '1 g IV q24h (or 2 g post-HD 3×/wk)', '2 g IV load, then 1–2 g IV q12h'],
          ['Piperacillin-Tazobactam (4h inf)', '4.5 g IV q6h (or q8h ext)', '2.25 g IV q6–8h (or 3.375 g q8h ext)', '2.25 g IV q8–12h (+ 0.75 g post-HD)', '3.375–4.5 g IV q8h'],
          ['Vancomycin', '25–30 mg/kg load -> 15–20 mg/kg q8–12h', '25 mg/kg load -> 15 mg/kg q24–48h', '25 mg/kg load -> 7.5–10 mg/kg post-HD', '25 mg/kg load -> 10–15 mg/kg q12–24h (TDM)'],
          ['Ceftriaxone (Hepatic/Biliary)', '1–2 g IV q24h (2 g q12h CNS)', 'No adjustment (1–2 g q24h)', 'No adjustment (Not dialyzed)', 'No adjustment (1–2 g IV q24h)']
        ]
      }
    ],
    boardPearls: [
      'Continuous Renal Replacement Therapy (CRRT) clears hydrophilic beta-lactams at a rate equivalent to CrCl 30–50 mL/min — never use once-daily IHD doses in a patient on CRRT.',
      'Ceftriaxone, Linezolid, Moxifloxacin, Clindamycin, Nafcillin, Oxacillin, Doxycycline, and MetroNIDAZOLE (in mild-moderate AKI) do NOT require renal dose reduction in AKI.',
      'Drugs with a large Volume of Distribution (Digoxin, TCAs, Amiodarone, Fentanyl) or high protein binding (Phenytoin, Warfarin, Apixaban, Rivaroxaban, Ceftriaxone) cannot be removed by standard hemodialysis.'
    ],
    boardPearlsAr: [
      'الغسيل الكلوي المستمر (CRRT) يصفي المضادات الحيوية بمعدل يعادل CrCl بين 30 و 50 مل/دقيقة؛ لذا يُمنع إعطاؤهم الجرعات المنخفضة المخصصة للغسيل المتقطع.',
      'المضادات التالية لا تحتاج لتعديل الجرعة في القصور الكلوي: Ceftriaxone, Linezolid, Moxifloxacin, Clindamycin, Nafcillin, Doxycycline.',
      'الأدوية ذات حجم التوزيع الكبير (مثل الديجوكسين والأميودارون) أو الارتباط العالي بالبروتين (مثل الوارفارين و Apixaban) لا يمكن إزالتها بالغسيل الكلوي.'
    ],
    keywords: ['crrt', 'hemodialysis', 'extended infusion', 'meropenem', 'cefepime', 'piperacillin-tazobactam', 'vancomycin', 'dialyzable', 'nephrotoxicity']
  }
];

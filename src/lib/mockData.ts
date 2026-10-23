import { Patient, ClinicalIntervention, ReconciliationDiscrepancy, ClinicalCase } from '../types/clinical';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pt-1',
    mrn: 'CPH-88210',
    name: 'عبدالله محمد الحازمي',
    nameEn: 'Abdullah M. Al-Hazmi',
    age: 68,
    gender: 'male',
    ward: 'ICU',
    room: 'ICU-04',
    bed: 'Bed A',
    weight: 78,
    height: 172,
    allergies: ['Penicillin (True IgE Anaphylaxis — Bronchospasm & Angioedema)', 'Sulfa drugs (Maculopapular Rash)'],
    diagnoses: [
      'Severe Hospital-Acquired Pneumonia (HAP)',
      'Acute Kidney Injury (AKI Stage 2) on CKD Stage 3a',
      'Type 2 Diabetes Mellitus (T2DM)',
      'Paroxysmal Atrial Fibrillation (AFib)'
    ],
    admissionDate: '2026-10-09',
    attendingPhysician: 'Dr. طارق العمري (ICU Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'critical',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 2.4, // elevated from baseline 1.2 mg/dL
      bun: 48,
      potassium: 5.3,
      sodium: 138,
      chloride: 101,
      bicarbonate: 19,
      glucose: 196,
      calcium: 8.6,
      magnesium: 1.9,
      phosphate: 4.5,
      alt: 34,
      ast: 39,
      alkPhos: 92,
      bilirubin: 0.9,
      albumin: 3.1,
      wbc: 16.4,
      neutrophilsPercent: 86,
      hgb: 11.8,
      hct: 35.4,
      platelets: 210,
      inr: 1.3,
      aptt: 32,
      lactate: 2.7,
      procalcitonin: 3.8,
      crp: 142,
      hba1c: 8.1,
      ph: 7.33,
      paco2: 36,
      pao2: 68,
      anionGap: 18,
      crcl: 28.5,
      tdmSummary: 'Vancomycin Pre-3rd Dose Trough: 23.4 mcg/mL (Estimated AUC24/MIC: 685 mg·h/L — Supratherapeutic!)'
    },
    caseReport: {
      historySourceAndReliability: 'المريض وأفراد العائلة + ملف العناية المركزة الإلكتروني (موثوق - Reliable)',
      chiefComplaint: '«أشعر بضيق شديد في النفس، حرارة مرتفعة ورعشة مع كحة ببلغم أصفر كثيف منذ الأمس» ("Severe shortness of breath, high fever, chills, and thick purulent sputum since yesterday")',
      hopHpi: 'مريض يبلغ من العمر 68 عاماً نُوّم قبل 4 أيام إثر تفاقم رجفان أذيني، وفي اليوم الخامس من التنويم تطورت لديه حمى حادة (38.9°C)، تسرع تنفس (RR 28/min)، ونقص أكسجة استدعى نقله إلى الـ ICU. أظهرت أشعة الصدر ارتشاحات جديدة في الفص السفلي الأيمن، وارتفع الكرياتينين من 1.2 mg/dL (الأساسي) إلى 2.4 mg/dL (AKI Stage 2) مع قلة إدرار البول (Oliguria). بُدئ له Vancomycin 1000 mg IV q12h و Meropenem 1000 mg IV q8h في الطوارئ دون تعديل كلوي.',
      subjectiveSummary: 'يشكو من إعياء عام، ضيق نفس عند أقل مجهود، كحة منتجة لبلغم قيحي، وعطش خفيف. ينفي وجود ألم صدري عاصر أو قيء دموي.',
      reviewOfSystems: {
        constitutional: 'Positive for fever (38.9°C), chills, diaphoresis, and generalized weakness.',
        cardiovascular: 'Palpitations intermittently; denies crushing chest pain or syncope.',
        respiratory: 'Positive for dyspnea, tachypnea, and productive purulent cough.',
        gastrointestinal: 'Decreased appetite; denies nausea, vomiting, melena, or diarrhea.',
        genitourinary: 'Decreased urine output over the past 24 hours (dark concentrated urine); denies dysuria.',
        neurological: 'Mildly lethargic but easily arousable; oriented to person and place.',
        musculoskeletal: 'Generalized myalgias; trace bilateral ankle edema.',
        endocrineSkin: 'History of T2DM; warm skin, no acute rash currently.'
      },
      pastMedicalHistory: [
        'Chronic Kidney Disease (CKD Stage 3a, Baseline SCr 1.2 mg/dL, Baseline eGFR 54 mL/min/1.73m²)',
        'Type 2 Diabetes Mellitus (T2DM x 14 years, last HbA1c 8.1%)',
        'Paroxysmal Non-Valvular Atrial Fibrillation (CHA2DS2-VASc = 4)',
        'Essential Hypertension (HTN x 18 years)',
        'Dyslipidemia'
      ],
      pastSurgicalHistory: [
        'Laparoscopic Appendectomy (2011)',
        'Cataract Extraction right eye (2021)'
      ],
      familyHistory: 'الأب توفي بعمر 74 سنة إثر سكتة دماغية (Ischemic Stroke)؛ الأم كانت مصابة بالسكري من النوع الثاني وارتفاع ضغط الدم.',
      socialHistory: 'متقاعد (معلم سابق)، يسكن مع زوجته وابنه. مدخن سابق (أقلع منذ 10 سنوات؛ 25 pack-years). لا يتناول الكحول نهائياً. يشرب القهوة العربية مرتين يومياً.',
      medicationAdherence: 'ملتزم بأدويته المنزلية بنسبة جيدة (يستخدم علبة تنظيم الأدوية الأسبوعية)، وتم إيقاف Metformin و Warfarin عند دخوله الـ ICU.',
      immunizationStatus: 'تلقى لقاح الإنفلونزا الموسمية قبل شهرين؛ لم يتلقَّ لقاح المكورات الرئوية المحدث (PCV20).',
      vitals: {
        bp: '104/62 mmHg (MAP 76 mmHg)',
        hr: 108,
        rr: 26,
        temp: 38.9,
        spo2: '91% on 4L/min Nasal Cannula (improved to 95% on 40% Venturi Mask)',
        painScore: '2/10 (mild chest wall soreness from coughing)',
        fluidBalance24h: 'Intake: 2,200 mL / Urine Output: 750 mL (Net +1,450 mL; Oliguric ~0.4 mL/kg/hr)',
        dryWeightKg: 76.5
      },
      physicalExam: {
        general: 'Elderly male in moderate respiratory distress, diaphoretic, appearing acutely ill.',
        heent: 'PERRLA, mucous membranes slightly dry, no pharyngeal erythema.',
        neckJvd: 'Supple, JVD ~7 cm H2O, no cervical lymphadenopathy or thyromegaly.',
        cardiovascular: 'Irregularly irregular rhythm (AFib), tachycardia (108 bpm), normal S1/S2, no murmurs or rubs.',
        chestLungs: 'Coarse crackles (rales) and bronchial breath sounds over the right lower lobe (RLL); dullness to percussion at right base.',
        abdomen: 'Soft, non-tender, non-distended, normoactive bowel sounds, no hepatosplenomegaly.',
        genitourinaryRectal: 'Foley catheter in place with concentrated amber urine.',
        extremities: '1+ bilateral lower extremity pitting edema, peripheral pulses 2+ symmetric, capillary refill 2.5 sec.',
        neurological: 'GCS 14 (E3V5M6), oriented x3, no focal motor or sensory deficits.',
        skin: 'Warm and moist; right internal jugular central venous catheter site clean and intact without erythema.'
      },
      diagnostics: {
        ecg: 'Atrial Fibrillation with ventricular rate 108 bpm, QTc 448 ms, no acute ST-segment elevation.',
        imaging: 'Chest X-Ray (Portable ICU): New dense consolidation in the right lower lobe consistent with Hospital-Acquired Pneumonia; mild cardiomegaly.',
        echocardiogram: 'TTE (3 months ago): LVEF 52%, mild left atrial enlargement, no valvular vegetation.',
        microbiologyCultures: 'Sputum Gram Stain: >25 PMNs/LPF, <10 epithelial cells, abundant Gram-positive cocci in clusters & Gram-negative rods (Final C&S pending). MRSA Nasal PCR: Positive. Blood Cultures x2 sets: Pending at 24h.',
        additionalTests: 'Urinalysis: Specific gravity 1.025, trace protein, muddy brown granular casts consistent with ATN/AKI.'
      },
      problemListAssessment: '1. Severe HAP with high MRSA & Pseudomonas risk complicated by AKI Stage 2 (CrCl 28.5 mL/min): Both Vancomycin (1g q12h) and Meropenem (1g q8h) are supratherapeutic for current renal clearance.\n2. True IgE Penicillin Anaphylaxis: Avoid penicillins/cephalosporins; Meropenem (carbapenem) has <1% cross-reactivity and is tolerated.\n3. Major DDI (Amiodarone + Home Warfarin) & Unintentional Statin Omission.\n4. Inpatient Hyperglycemia (BG 196 mg/dL): Metformin appropriately held in AKI; manage with Basal-Bolus Insulin.',
      pharmacotherapyCarePlan: '1. Adjust Vancomycin to 1000 mg IV q24h (hold next dose until trough < 15 mcg/mL) targeting Bayesian AUC24/MIC 400–600 mg·h/L.\n2. Adjust Meropenem to 500 mg IV q12h via 3-hour Extended Infusion (for CrCl < 30 mL/min).\n3. Adjust Enoxaparin VTE prophylaxis from 40 mg SC q24h to 30 mg SC q24h (or UFH 5000 U SC q8h) due to CrCl < 30 mL/min.\n4. Restart Atorvastatin 40 mg PO qHS; keep Metformin and Warfarin held during acute ICU AKI.',
      monitoringParameters: 'Daily SCr, BUN, Urine Output (hourly), Serum K+ (target 4.0–4.8 mEq/L), Vancomycin TDM levels, WBC & fever curve, 48–72h Sputum/Blood Culture sensitivities for antibiotic de-escalation.'
    },
    activeMedications: [
      {
        id: 'med-101',
        name: 'Vancomycin IV',
        genericName: 'Vancomycin IV',
        dose: '1000 mg',
        route: 'IV Infusion',
        frequency: 'Every 12 hours (q12h) [Needs Renal Dose Adjustment!]',
        startDate: '2026-10-09',
        indication: 'MRSA Empirical Coverage / Severe HAP',
        isHighAlert: true,
        requiresRenalAdjustment: true,
        requiresTDM: true,
        notes: 'CrCl is 28.5 mL/min — Standard q12h causes high Nephrotoxicity & accumulation risk!'
      },
      {
        id: 'med-102',
        name: 'Meropenem IV',
        genericName: 'Meropenem IV',
        dose: '1000 mg',
        route: 'IV Infusion',
        frequency: 'Every 8 hours (q8h) [Adjust to 500 mg q12h Extended Infusion]',
        startDate: '2026-10-09',
        indication: 'Pseudomonas aeruginosa / MDR Gram-Negative Coverage',
        requiresRenalAdjustment: true,
        notes: 'Dose must be reduced to 500 mg IV q12h (3h Extended Infusion) for CrCl < 30 mL/min'
      },
      {
        id: 'med-103',
        name: 'Amiodarone',
        genericName: 'Amiodarone IV/Oral',
        dose: '200 mg',
        route: 'Oral',
        frequency: 'Once daily (OD)',
        startDate: '2026-10-10',
        indication: 'AFib Rhythm/Rate Control',
        isHighAlert: true,
        notes: 'Potent CYP2C9 & P-gp inhibitor — Major DDI with Warfarin and Digoxin'
      },
      {
        id: 'med-104',
        name: 'Enoxaparin (Clexane)',
        genericName: 'Enoxaparin Subcut',
        dose: '40 mg',
        route: 'SC',
        frequency: 'Once daily (q24h)',
        startDate: '2026-10-09',
        indication: 'VTE Prophylaxis',
        isHighAlert: true,
        requiresRenalAdjustment: true,
        notes: 'Renal dose adjustment required: 30 mg SC q24h or switch to UFH IV/SC when CrCl < 30 mL/min'
      },
      {
        id: 'med-105',
        name: 'Insulin Glargine (Lantus)',
        genericName: 'Insulin Glargine',
        dose: '18 Units',
        route: 'SC',
        frequency: 'At bedtime (qHS)',
        startDate: '2026-10-09',
        indication: 'Inpatient Basal Glycemic Control',
        isHighAlert: true
      }
    ],
    homeMedications: [
      {
        id: 'h-1',
        name: 'Metformin',
        genericName: 'Metformin',
        dose: '1000 mg',
        route: 'Oral',
        frequency: 'Twice daily (BID)',
        startDate: '2025-01-01',
        indication: 'T2DM'
      },
      {
        id: 'h-2',
        name: 'Warfarin',
        genericName: 'Warfarin',
        dose: '5 mg',
        route: 'Oral',
        frequency: 'Once daily (Evening)',
        startDate: '2024-06-15',
        indication: 'Atrial Fibrillation (AFib)'
      },
      {
        id: 'h-3',
        name: 'Atorvastatin',
        genericName: 'Atorvastatin',
        dose: '40 mg',
        route: 'Oral',
        frequency: 'Once daily (qHS)',
        startDate: '2024-02-10',
        indication: 'Dyslipidemia / ASCVD Prevention'
      }
    ]
  },
  {
    id: 'pt-2',
    mrn: 'CPH-90144',
    name: 'فاطمة صالح النجار',
    nameEn: 'Fatima S. Al-Najjar',
    age: 54,
    gender: 'female',
    ward: 'CCU',
    room: 'CCU-02',
    bed: 'Bed B',
    weight: 64,
    height: 158,
    allergies: ['Aspirin (Severe NSAID-Exacerbated Bronchospasm)'],
    diagnoses: [
      'Non-ST Elevation Myocardial Infarction (NSTEMI — Post-PCI with 1 DES to LAD)',
      'Heart Failure with Reduced Ejection Fraction (HFrEF, LVEF 35%)',
      'Essential Hypertension (HTN)'
    ],
    admissionDate: '2026-10-11',
    attendingPhysician: 'Dr. سامي رضوان (Interventional Cardiology Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'observation',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 0.9,
      bun: 18,
      potassium: 4.8,
      sodium: 140,
      chloride: 103,
      bicarbonate: 24,
      glucose: 118,
      calcium: 9.2,
      magnesium: 2.1,
      alt: 24,
      ast: 28,
      bilirubin: 0.6,
      albumin: 3.9,
      wbc: 8.4,
      hgb: 12.9,
      platelets: 245,
      inr: 1.0,
      troponin: '1,420 ng/L (Peak post-NSTEMI, trending down)',
      bnp: 'NT-proBNP: 2,850 pg/mL',
      crcl: 68.2
    },
    caseReport: {
      historySourceAndReliability: 'المريضة نفسها وتقرير قسطرة القلب التداخلية (موثوق تماماً - Highly Reliable)',
      chiefComplaint: '«ألم ضاغط في منتصف الصدر يمتد للكتف الأيسر مع ضيق في النفس عند صعود الدرج أو الاستلقاء» ("Crushing central chest tightness radiating to the left shoulder with orthopnea")',
      hopHpi: 'مريضة تبلغ من العمر 54 عاماً حضرت إلى الطوارئ بألم صدري إقفاري استمر 45 دقيقة مع ارتفاع Troponin عالي الحساسية وتغيرات ST-depression في المساري الأمامية (V2–V5). خضعت لقسطرة تاجية عاجلة (PCI) أظهرت تضيقاً بنسبة 90% في الشريان الأمامي النازل (Mid-LAD) وتم زرع دعامة دوائية (DES). أظهر الإيكو انخفاض الكسر القذفي (LVEF 35%). المريضة حالياً تحت الملاحظة الحثيثة في الـ CCU لمراقبة البوتاسيوم (4.8 mEq/L) وتطبيق فترة غسيل 36 ساعة (36h Washout) قبل التحويل المخطط من Ramipril إلى Sacubitril/Valsartan (Entresto).',
      subjectiveSummary: 'الألم الصدري زال تماماً بعد القسطرة (0/10)، لكنها لا تزال تشعر بضيق تنفس خفيف عند الاستلقاء المسطح وتحتاج وسادتين للنوم.',
      reviewOfSystems: {
        constitutional: 'No fever, chills, or night sweats; mild fatigue.',
        cardiovascular: 'Chest pain resolved post-PCI; two-pillow orthopnea; denies palpitations or syncope.',
        respiratory: 'Mild exertional dyspnea; history of bronchospasm with aspirin/NSAIDs.',
        gastrointestinal: 'Good appetite; denies nausea, vomiting, epigastric pain, or melena.',
        genitourinary: 'Adequate urine output; no dysuria or hematuria.',
        neurological: 'Alert, oriented x3, no dizziness or headache.'
      },
      pastMedicalHistory: [
        'Essential Hypertension (HTN x 8 years, previously on Amlodipine 5 mg)',
        'Hypercholesterolemia',
        'Mild Intermittent Asthma / Aspirin-Exacerbated Respiratory Disease (AERD)'
      ],
      pastSurgicalHistory: [
        'Primary PCI with 1 Drug-Eluting Stent (DES) to Mid-LAD (Yesterday)',
        'Cesarean Section x2 (2001, 2005)'
      ],
      familyHistory: 'الأخ الأكبر أصيب باحتشاء عضلة القلب (MI) في سن 52 عاماً؛ الأم مصابة بارتفاع ضغط الدم.',
      socialHistory: 'ربة منزل، متزوجة، غير مدخنة إطلاقاً، لا تتناول الكحول. تتبع حمية قليلة الملح حالياً.',
      medicationAdherence: 'ملتزمة تماماً بالتعليمات الطبية ولديها وعي ممتاز بخطورة إيقاف مضادات الصفيحات بعد الدعامة.',
      immunizationStatus: 'مكتملة التحصينات (COVID-19 & Influenza محدثة).',
      vitals: {
        bp: '116/72 mmHg (MAP 87 mmHg)',
        hr: 68,
        rr: 18,
        temp: 36.8,
        spo2: '97% on Room Air',
        painScore: '0/10 (Chest pain-free post-PCI)',
        fluidBalance24h: 'Intake: 1,500 mL / Urine Output: 1,850 mL (Net -350 mL)',
        dryWeightKg: 62.5
      },
      physicalExam: {
        general: 'Comfortable middle-aged female resting in bed at 30-degree elevation, in no acute distress.',
        heent: 'Normocephalic, atraumatic, moist oral mucosa.',
        neckJvd: 'Mild JVD at 5 cm H2O; carotid pulses 2+ without bruits.',
        cardiovascular: 'Regular rate and rhythm (68 bpm), normal S1/S2, soft S3 gallop audible at apex, no pericardial rub.',
        chestLungs: 'Fine bibasilar crackles at extreme lung bases; no wheezes.',
        abdomen: 'Soft, non-tender, normal bowel sounds, no hepatomegaly.',
        extremities: 'Trace bilateral ankle edema; right radial artery PCI access site clean, dry, and intact with strong radial pulse.',
        neurological: 'Alert and oriented x3, cranial nerves II–XII intact.',
        skin: 'Warm, well-perfused, no ecchymosis or hematoma at radial access site.'
      },
      diagnostics: {
        ecg: 'Normal Sinus Rhythm at 68 bpm, resolved anterior ST-segment depression, QTc 422 ms.',
        imaging: 'Coronary Angiography: 90% proximal/mid-LAD lesion successfully stented with 3.0 x 24 mm Everolimus-Eluting Stent (TIMI 3 flow).',
        echocardiogram: '2D TTE: LVEF 35%, anterior wall hypokinesis, mild mitral regurgitation, no LV thrombus.',
        microbiologyCultures: 'Not indicated (afebrile, no signs of infection).'
      },
      problemListAssessment: '1. Post-PCI NSTEMI with True Aspirin Bronchospasm: Managed with Ticagrelor 90 mg BID + Aspirin Desensitization / P2Y12-centered strategy + High-Intensity Statin.\n2. Newly Diagnosed HFrEF (LVEF 35%): Transitioning to full 4-Pillar GDMT (ARNI, Evidence-based Beta-Blocker, MRA, SGLT2i). Requires mandatory 36-hour washout after stopping Ramipril before initiating Sacubitril/Valsartan.\n3. Hyperkalemia Surveillance: Serum K+ is 4.8 mEq/L on Ramipril + Spironolactone.',
      pharmacotherapyCarePlan: '1. Continue Ticagrelor 90 mg PO BID and initiate Atorvastatin 80 mg PO qHS + Dapagliflozin 10 mg PO OD.\n2. Hold Ramipril now and enforce a strict 36-hour washout period before starting Sacubitril/Valsartan 24/26 mg PO BID.\n3. Continue Bisoprolol 2.5 mg PO OD and Spironolactone 25 mg PO OD (hold MRA if K+ > 5.0–5.5 mEq/L).',
      monitoringParameters: 'Recheck Serum K+ and SCr every 48h, monitor BP/HR prior to each GDMT titration, watch for any signs of bleeding or dyspnea.'
    },
    activeMedications: [
      {
        id: 'med-201',
        name: 'Ticagrelor (Brilinta)',
        genericName: 'Ticagrelor',
        dose: '90 mg',
        route: 'Oral',
        frequency: 'Twice daily (BID)',
        startDate: '2026-10-11',
        indication: 'Antiplatelet Therapy Post-PCI (NSTEMI)',
        isHighAlert: true,
        notes: 'Patient has Aspirin Bronchospasm — P2Y12 Inhibitor monotherapy / Aspirin Desensitization protocol'
      },
      {
        id: 'med-202',
        name: 'Bisoprolol (Concor)',
        genericName: 'Bisoprolol',
        dose: '2.5 mg',
        route: 'Oral',
        frequency: 'Once daily (OD)',
        startDate: '2026-10-11',
        indication: 'HFrEF GDMT / Post-MI Beta-Blocker'
      },
      {
        id: 'med-203',
        name: 'Ramipril (Tritace)',
        genericName: 'Ramipril',
        dose: '5 mg',
        route: 'Oral',
        frequency: 'Once daily (OD)',
        startDate: '2026-10-11',
        indication: 'HFrEF ACE-Inhibitor (Planned switch to ARNI after 36h Washout)'
      },
      {
        id: 'med-204',
        name: 'Spironolactone (Aldactone)',
        genericName: 'Spironolactone',
        dose: '25 mg',
        route: 'Oral',
        frequency: 'Once daily (OD)',
        startDate: '2026-10-11',
        indication: 'MRA Pillar for HFrEF',
        notes: 'Monitor Serum K+ closely (currently 4.8 mEq/L); hold if K+ > 5.5 mEq/L'
      }
    ],
    homeMedications: [
      {
        id: 'h-201',
        name: 'Amlodipine',
        genericName: 'Amlodipine',
        dose: '5 mg',
        route: 'Oral',
        frequency: 'Once daily (OD)',
        startDate: '2025-03-01',
        indication: 'HTN'
      }
    ]
  },
  {
    id: 'pt-3',
    mrn: 'CPH-74520',
    name: 'سالم بن أحمد الغامدي',
    nameEn: 'Salem A. Al-Ghamdi',
    age: 72,
    gender: 'male',
    ward: 'InternalMedicine',
    room: 'Ward-312',
    bed: 'Bed 1',
    weight: 85,
    height: 175,
    allergies: ['No Known Drug Allergies (NKDA)'],
    diagnoses: [
      'Decompensated Cirrhosis (Child-Pugh Class B, Score 8)',
      'Hepatic Encephalopathy (HE) West Haven Grade I (Improving)',
      'Moderate Portal Hypertensive Ascites (SAAG >= 1.1 g/dL)',
      'Spontaneous Bacterial Peritonitis (SBP) Secondary Prophylaxis'
    ],
    admissionDate: '2026-10-08',
    attendingPhysician: 'Dr. ماجد باوزير (Hepatology & GI Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'improving',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 1.2,
      bun: 24,
      potassium: 3.6,
      sodium: 132,
      chloride: 98,
      bicarbonate: 23,
      glucose: 108,
      alt: 58,
      ast: 74,
      alkPhos: 135,
      bilirubin: 2.8,
      albumin: 2.9,
      wbc: 6.2,
      hgb: 11.4,
      platelets: 92,
      inr: 1.6,
      crcl: 64.0
    },
    caseReport: {
      historySourceAndReliability: 'ابنه المرافق وملف عيادة أمراض الكبد (موثوق؛ المريض كان يعاني من تشوش ذهني بسيط عند الدخول وتحسن الآن)',
      chiefComplaint: '«لاحظنا عليه بطء في الكلام واضطراب في النوم مع انتفاخ متزايد في البطن خلال الأسبوع الماضي» ("Slowed speech, inverted sleep-wake cycle, and increasing abdominal distension over the past week")',
      hopHpi: 'مريض 72 سنة مصاب بتشمع كبد لا معاوض (Child-Pugh B) حضر بسبب اعتلال دماغي كبدي من الدرجة الأولى (West Haven Grade I) ناتج عن إمساك لمدة 4 أيام ونقص بوتاسيوم خفيف. تم استبعاد التهاب الصفاق الجرثومي العفوي (SBP) عبر بذل الحبن التشخيصي (Ascitic PMN = 110 cells/mm³ < 250). بعد بدء Lactulose 30 mL TID و Rifaximin 550 mg BID وضبط المدرات بنسبة 100:40 (Spironolactone:Furosemide)، استعاد المريض وعيه الكامل وتراجعت الرعشة الكبدية.',
      subjectiveSummary: 'المريض اليوم متيقظ، ينام بشكل أفضل، وأخرج 3 مرات برازاً ليناً خلال الـ 24 ساعة الماضية. يشعر بانخفاض تدريجي في ضغط البطن.',
      reviewOfSystems: {
        constitutional: 'Improving energy; no fever or rigors.',
        cardiovascular: 'No chest pain or orthopnea.',
        respiratory: 'Breathing comfortably after diuresis.',
        gastrointestinal: 'Abdominal distension improving; 3 soft stools/day on Lactulose; no hematemesis or melena.',
        genitourinary: 'Good diuresis on Spironolactone/Furosemide.',
        neurological: 'Resolved confusion; mild residual asterixis.'
      },
      pastMedicalHistory: [
        'Decompensated NASH/Cryptogenic Cirrhosis (Child-Pugh Class B, MELD-Na 16)',
        'Esophageal Varices Grade I (no prior variceal hemorrhage)',
        'Prior episode of Spontaneous Bacterial Peritonitis (SBP 6 months ago)'
      ],
      pastSurgicalHistory: ['Inguinal Hernia Repair (2014)'],
      familyHistory: 'لا يوجد تاريخ عائلي لأمراض الكبد الوراثية أو الأورام.',
      socialHistory: 'متقاعد، يعيش مع أسرته، لا يدخن ولا يتناول الكحول. يحتاج تذكيراً بجرعات اللاكتولوز اليومية.',
      medicationAdherence: 'كان يقلل جرعة Lactulose في المنزل لتجنب الإسهال مما أدى لحدوث الإمساك واعتلال الدماغ.',
      immunizationStatus: 'محصن ضد Hepatitis A & B والإنفلونزا.',
      vitals: {
        bp: '112/68 mmHg (MAP 83 mmHg)',
        hr: 74,
        rr: 16,
        temp: 36.7,
        spo2: '96% on Room Air',
        painScore: '0/10',
        fluidBalance24h: 'Net -450 mL (Target weight loss 0.5 kg/day achieved)',
        dryWeightKg: 79.0
      },
      physicalExam: {
        general: 'Elderly male, alert and cooperative, mild scleral icterus.',
        heent: 'Mild scleral icterus; mucous membranes moist.',
        neckJvd: 'No JVD.',
        cardiovascular: 'Regular rate and rhythm, normal S1/S2.',
        chestLungs: 'Clear to auscultation bilaterally.',
        abdomen: 'Moderate ascites with shifting dullness, soft, non-tender, no rebound or guarding.',
        extremities: 'Trace pedal edema; spider angiomata on upper chest.',
        neurological: 'Oriented x3 (person, place, time); asterixis resolved today.',
        skin: 'Mild jaundice, palmar erythema.'
      },
      diagnostics: {
        ecg: 'Normal Sinus Rhythm, 74 bpm.',
        imaging: 'Abdominal Ultrasound with Doppler: Cirrhotic liver morphology, moderate ascites, patent portal vein with hepatopetal flow.',
        microbiologyCultures: 'Diagnostic Paracentesis: SAAG 1.4 g/dL, Ascitic fluid PMN 110 cells/mm³ (Negative for acute SBP), Culture negative.'
      },
      problemListAssessment: '1. Overt Hepatic Encephalopathy (Resolving): Precipitated by constipation and mild hypokalemia (K+ 3.6 mEq/L).\n2. Portal Hypertensive Ascites: Responding well to 100 mg Spironolactone : 40 mg Furosemide natriuretic ratio.\n3. Prior SBP History: Requires lifelong secondary SBP prophylaxis (Norfloxacin/Ciprofloxacin or TMP-SMX).',
      pharmacotherapyCarePlan: '1. Continue Lactulose 30 mL PO TID titrated to 2–3 soft stools/day + Rifaximin 550 mg PO BID.\n2. Continue Spironolactone 100 mg + Furosemide 40 mg PO every morning; restrict dietary sodium to <2 g/day (88 mEq/day).\n3. Replete potassium gently to keep Serum K+ > 4.0 mEq/L (hypokalemia increases renal ammonia production).',
      monitoringParameters: 'Daily weight (target loss 0.5 kg/day without edema), daily mental status & stool count, Serum Na+, K+, SCr, and Bilirubin.'
    },
    activeMedications: [
      {
        id: 'med-301',
        name: 'Lactulose Syrup',
        genericName: 'Lactulose',
        dose: '30 mL',
        route: 'Oral',
        frequency: 'Three times daily (TID)',
        startDate: '2026-10-08',
        indication: 'Hepatic Encephalopathy (Titrate to 2–3 soft stools/day)'
      },
      {
        id: 'med-302',
        name: 'Rifaximin (Targaxan)',
        genericName: 'Rifaximin',
        dose: '550 mg',
        route: 'Oral',
        frequency: 'Twice daily (BID)',
        startDate: '2026-10-08',
        indication: 'Overt HE Recurrence Prevention'
      },
      {
        id: 'med-303',
        name: 'Furosemide (Lasix)',
        genericName: 'Furosemide',
        dose: '40 mg',
        route: 'Oral',
        frequency: 'Once daily in AM (OD)',
        startDate: '2026-10-09',
        indication: 'Ascites Mobilization (100:40 Spironolactone:Furosemide Ratio)'
      },
      {
        id: 'med-304',
        name: 'Spironolactone (Aldactone)',
        genericName: 'Spironolactone',
        dose: '100 mg',
        route: 'Oral',
        frequency: 'Once daily in AM (OD)',
        startDate: '2026-10-09',
        indication: 'Secondary Hyperaldosteronism / Portal Hypertensive Ascites'
      }
    ],
    homeMedications: []
  },
  {
    id: 'pt-4',
    mrn: 'CPH-66190',
    name: 'مها عبدالعزيز القحطاني',
    nameEn: 'Maha A. Al-Qahtani',
    age: 42,
    gender: 'female',
    ward: 'Surgery',
    room: 'Surg-108',
    bed: 'Bed 2',
    weight: 70,
    height: 165,
    allergies: ['Morphine (Severe Histamine-Mediated Pruritus & Nausea)'],
    diagnoses: [
      'Post-Laparoscopic Cholecystectomy (POD 1)',
      'Acute Post-Operative Pain (Controlled)',
      'Post-Operative Nausea and Vomiting (PONV — Resolved)'
    ],
    admissionDate: '2026-10-11',
    attendingPhysician: 'Dr. يوسف المري (General Surgery Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'stable',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 0.7,
      bun: 12,
      potassium: 4.1,
      sodium: 139,
      chloride: 102,
      bicarbonate: 25,
      glucose: 96,
      alt: 29,
      ast: 25,
      bilirubin: 0.7,
      albumin: 4.2,
      wbc: 7.8,
      hgb: 13.1,
      platelets: 265,
      inr: 1.0,
      crcl: 98.0
    },
    caseReport: {
      historySourceAndReliability: 'المريضة نفسها وسجل العمليات الجراحية (موثوق - Reliable)',
      chiefComplaint: '«ألم خفيف مكان جرح المنظار بعد استئصال المرارة أمس، والغثيان تحسن كثيراً» ("Mild incisional abdominal soreness post-laparoscopic cholecystectomy yesterday; nausea has resolved")',
      hopHpi: 'مريضة تبلغ من العمر 42 عاماً خضعت بالأمس لعملية استئصال المرارة بالمنظار (Laparoscopic Cholecystectomy) إثر التهاب مرارة حصوي. لديها تاريخ تفاعل هستاميني شديد (حكة وغثيان) مع المورفين، لذلك تم تطبيق بروتوكول تسكين متعدد الوسائط (Multimodal Analgesia) يعتمد على Paracetamol IV مجدولاً مع Hydromorphone IV عند اللزوم و Ondansetron IV. حالتها مستقرة تماماً وتتحرك في الغرفة.',
      subjectiveSummary: 'الألم تحت السيطرة (2/10 عند الحركة)، بدأت بشرب السوائل وتتحمل الحمية الخفيفة دون غثيان.',
      reviewOfSystems: {
        constitutional: 'Afebrile, feeling well.',
        cardiovascular: 'No chest pain or palpitations.',
        respiratory: 'No dyspnea or cough; using incentive spirometer.',
        gastrointestinal: 'Tolerating clear liquids and soft diet; passing flatus; nausea resolved.',
        genitourinary: 'Voiding spontaneously without difficulty.',
        neurological: 'Alert, oriented x3, no dizziness or sedation.'
      },
      pastMedicalHistory: ['Symptomatic Cholelithiasis / Acute Calculous Cholecystitis'],
      pastSurgicalHistory: ['Laparoscopic Cholecystectomy (POD #1)'],
      familyHistory: 'غير ذي صلة (Non-contributory).',
      socialHistory: 'موظفة إدارية، متزوجة، غير مدخنة.',
      medicationAdherence: 'ممتازة.',
      immunizationStatus: 'محدثة.',
      vitals: {
        bp: '120/76 mmHg (MAP 91 mmHg)',
        hr: 76,
        rr: 15,
        temp: 36.9,
        spo2: '99% on Room Air',
        painScore: '2/10 at laparoscopic port sites',
        fluidBalance24h: 'Balanced oral intake and urine output',
        dryWeightKg: 70.0
      },
      physicalExam: {
        general: 'Alert, comfortable female ambulating in room without distress.',
        heent: 'Normocephalic, moist mucous membranes.',
        neckJvd: 'Supple, no JVD.',
        cardiovascular: 'Regular rate and rhythm, normal S1/S2.',
        chestLungs: 'Clear to auscultation bilaterally.',
        abdomen: 'Soft, mild expected tenderness at 4 laparoscopic trocar port sites; dressings clean, dry, and intact; positive bowel sounds.',
        extremities: 'No lower extremity edema or calf tenderness.',
        neurological: 'Alert and oriented x3.',
        skin: 'Warm, intact, no pruritus or rash.'
      },
      diagnostics: {
        ecg: 'Normal Sinus Rhythm.',
        imaging: 'Pre-op RUQ Ultrasound: Cholelithiasis with gallbladder wall thickening; normal common bile duct diameter.',
        microbiologyCultures: 'None required.'
      },
      problemListAssessment: '1. Post-Operative Pain with Morphine Intolerance: Effectively managed with scheduled Paracetamol + PRN Hydromorphone (structurally distinct semi-synthetic phenanthrene with minimal histamine release).\n2. PONV Prevention: Resolved with Ondansetron.',
      pharmacotherapyCarePlan: '1. Transition IV Paracetamol to Oral Paracetamol 1000 mg PO q6h PRN + Ibuprofen 400 mg PO q8h with food for discharge.\n2. Discontinue IV Hydromorphone prior to discharge.',
      monitoringParameters: 'Pain score, GI tolerance of oral diet, surgical wound healing.'
    },
    activeMedications: [
      {
        id: 'med-401',
        name: 'Paracetamol IV (Perfalgan)',
        genericName: 'Paracetamol IV',
        dose: '1000 mg',
        route: 'IV Infusion',
        frequency: 'Every 6 hours (q6h Scheduled)',
        startDate: '2026-10-11',
        indication: 'Multimodal Opioid-Sparing Post-Op Analgesia'
      },
      {
        id: 'med-402',
        name: 'Hydromorphone IV (Dilaudid)',
        genericName: 'Hydromorphone IV',
        dose: '0.5 mg',
        route: 'IV Push',
        frequency: 'Every 3 hours PRN Severe Breakthrough Pain',
        startDate: '2026-10-11',
        indication: 'Breakthrough Pain (Synthetic/Semi-Synthetic Alternative to Morphine)',
        isHighAlert: true
      },
      {
        id: 'med-403',
        name: 'Ondansetron IV (Zofran)',
        genericName: 'Ondansetron IV',
        dose: '4 mg',
        route: 'IV Push',
        frequency: 'Every 8 hours PRN Nausea',
        startDate: '2026-10-11',
        indication: 'PONV Rescue / Prophylaxis'
      }
    ],
    homeMedications: []
  }
];

export const INITIAL_INTERVENTIONS: ClinicalIntervention[] = [
  {
    id: 'int-101',
    patientId: 'pt-1',
    patientName: 'عبدالله محمد الحازمي',
    mrn: 'CPH-88210',
    ward: 'ICU',
    date: '2026-10-12',
    drpType: 'dosage_too_high',
    medicationInvolved: 'Vancomycin IV',
    clinicalIssue: 'جرعة Vancomycin IV الحالية (1000 mg IV q12h) مرتفعة جداً لأن CrCl للمريض 28.5 mL/min مع وجود Acute Kidney Injury (AKI).',
    proposedRecommendation: 'تعديل Maintenance Dose إلى 1000 mg IV q24h مع سحب Pre-dose Trough Level أو تطبيق Bayesian Two-Point TDM لاستهداف AUC24/MIC بين 400–600 mg·h/L.',
    rationale: 'تراكم Vancomycin يرفع خطر Nephrotoxicity الحاد ويفاقم AKI (ACCP Pharmacotherapy 2026 Vol. 2, Pharmacokinetics pp. 2-323 to 2-362).',
    severity: 'high',
    pharmacist: 'Dr. خالد الشورماني',
    physician: 'Dr. طارق العمري',
    status: 'accepted',
    physicianFeedback: 'تمت الموافقة وتعديل الـ Order في النظام إلى Vancomycin 1000 mg IV q24h وجدولة Trough/AUC TDM غداً صباحاً.',
    costImpactEstimatedSAR: 1200,
    resolvedAt: '2026-10-12 09:30',
    referenceTitle: 'ACCP Updates in Therapeutics® 2026 Vol. 2 — Pharmacokinetics & TDM (pp. 2-323)',
    referenceSourceUrl: 'local://ref/chapter/accp-2026-v2-c7',
    evidenceLevel: 'ASHP/IDSA/ACCP 2026 Level A'
  },
  {
    id: 'int-102',
    patientId: 'pt-1',
    patientName: 'عبدالله محمد الحازمي',
    mrn: 'CPH-88210',
    ward: 'ICU',
    date: '2026-10-12',
    drpType: 'renal_dose_adjustment',
    medicationInvolved: 'Meropenem IV',
    clinicalIssue: 'دواء Meropenem IV موصوف بجرعة 1000 mg IV q8h، بينما يستلزم Renal Dose Adjustment إلى 500 mg IV q12h لأن CrCl < 30 mL/min.',
    proposedRecommendation: 'تخفيض جرعة Meropenem إلى 500 mg IV q12h عبر Extended Infusion على مدار 3 ساعات لتعظيم %fT>MIC.',
    rationale: 'منع تراكم Beta-Lactam وتجنب Neurotoxicity / Seizures مع الحفاظ على الفعالية القاتلة للبكتيريا ضد Pseudomonas (ACCP 2026 Vol. 1 ID pp. 1-193 & Vol. 2 Nephrology pp. 2-275).',
    severity: 'high',
    pharmacist: 'Dr. خالد الشورماني',
    physician: 'Dr. طارق العمري',
    status: 'accepted',
    physicianFeedback: 'تم الاتفاق وتطبيق 3-hour Extended Infusion.',
    costImpactEstimatedSAR: 850,
    resolvedAt: '2026-10-12 10:15',
    referenceTitle: "DiPiro's 13th Ed (Ch. 54 & 118) & ACCP 2026 Vol. 1 (HAP/VAP)",
    referenceSourceUrl: 'local://ref/chapter/dipiro-13-sepsis-aki-pk',
    evidenceLevel: 'ACCP 2026 / IDSA Grade A'
  },
  {
    id: 'int-103',
    patientId: 'pt-1',
    patientName: 'عبدالله محمد الحازمي',
    mrn: 'CPH-88210',
    ward: 'ICU',
    date: '2026-10-12',
    drpType: 'drug_interaction',
    medicationInvolved: 'Amiodarone + Home Warfarin',
    clinicalIssue: 'Major Drug-Drug Interaction: دواء Amiodarone يثبط إنزيم CYP2C9 وCYP3A4 مما يرفع تركيز S-Warfarin ويرفع الـ INR بشكل خطير مع خطر Major Bleeding.',
    proposedRecommendation: 'إيقاف Home Warfarin مؤقتاً خلال فترة التنويم الحرج في الـ ICU، أو خفض جرعة Warfarin تجريبياً بنسبة 33%–50% مع مراقبة INR كل 48 ساعة.',
    rationale: 'الوقاية من Supratherapeutic INR والنزيف الدماغي أو الهضمي الحاد (ACCP 2026 Vol. 1 Anticoagulation pp. 1-131 to 1-192).',
    severity: 'high',
    pharmacist: 'Dr. خالد الشورماني',
    physician: 'Dr. طارق العمري',
    status: 'accepted',
    physicianFeedback: 'تم Hold Warfarin حالياً والاعتماد على Prophylactic Anticoagulation المعدل كلوياً.',
    costImpactEstimatedSAR: 4500,
    resolvedAt: '2026-10-12 11:00',
    referenceTitle: 'ACCP Cardiology 2026 (BCCP Ch. 2–3) & ACCP Vol. 1 — Anticoagulation (pp. 1-131)',
    referenceSourceUrl: 'local://ref/chapter/accp-cardio-2026-arrhythmia-anticoag',
    evidenceLevel: 'ACCP 2026 Class I / Level A'
  },
  {
    id: 'int-104',
    patientId: 'pt-2',
    patientName: 'فاطمة صالح النجار',
    mrn: 'CPH-90144',
    ward: 'CCU',
    date: '2026-10-11',
    drpType: 'adverse_drug_reaction',
    medicationInvolved: 'Spironolactone + Ramipril',
    clinicalIssue: 'الجمع بين ACE-Inhibitor (Ramipril) و MRA (Spironolactone) يرفع خطورة Hyperkalemia حيث مستوى Serum K+ الحالي 4.8 mEq/L.',
    proposedRecommendation: 'مراقبة Serum K+ و SCr كل 48 ساعة، وتطبيق 36-hour Washout Period عند التحويل المخطط من Ramipril إلى Sacubitril/Valsartan (Entresto).',
    rationale: 'الوقاية من Life-threatening Hyperkalemia و Angioedema وفق توصيات HFrEF GDMT في DiPiro 13th Ed (Ch. 32) و ACCP 2026 Vol. 1 (pp. 1-65).',
    severity: 'medium',
    pharmacist: 'Dr. خالد الشورماني',
    physician: 'Dr. سامي رضوان',
    status: 'accepted',
    physicianFeedback: 'تمت جدولة متابعة Renal Panel & Electrolytes وتوثيق خطة الـ 36h Washout.',
    costImpactEstimatedSAR: 500,
    resolvedAt: '2026-10-11 16:20',
    referenceTitle: "DiPiro's Pharmacotherapy 13th Ed (Ch. 32–33) & ACCP Cardiology 2026",
    referenceSourceUrl: 'local://ref/chapter/dipiro-13-hf-cardiorenal',
    evidenceLevel: 'ACCP 2026 / AHA/ACC Class I'
  }
];

export const INITIAL_DISCREPANCIES: ReconciliationDiscrepancy[] = [
  {
    id: 'rec-1',
    patientId: 'pt-1',
    drugName: 'Metformin',
    type: 'omission',
    homePrescription: '1000 mg Oral Twice Daily (BID)',
    hospitalOrder: 'Held on Admission (Intentional Hold)',
    clinicalSignificance: 'major',
    clarificationStatus: 'intentional',
    pharmacistAction: 'Intentional Hold بسبب Acute Kidney Injury (CrCl 28.5 mL/min < 30 mL/min) لتجنب خطر Lactic Acidosis؛ تم استبداله بـ Inpatient Basal-Bolus Insulin.'
  },
  {
    id: 'rec-2',
    patientId: 'pt-1',
    drugName: 'Atorvastatin',
    type: 'omission',
    homePrescription: '40 mg Oral Once Daily at Bedtime (qHS)',
    hospitalOrder: 'Unintentionally Omitted on ICU Admission',
    clinicalSignificance: 'moderate',
    clarificationStatus: 'unresolved',
    pharmacistAction: 'تم إشعار الطبيب المعالج لإعادة طلب Atorvastatin 40 mg PO qHS وفق بروتوكول Statin Continuation.'
  },
  {
    id: 'rec-3',
    patientId: 'pt-2',
    drugName: 'Amlodipine',
    type: 'dose_mismatch',
    homePrescription: '5 mg Oral Daily',
    hospitalOrder: 'Discontinued / Replaced by HFrEF GDMT (Ramipril + Bisoprolol)',
    clinicalSignificance: 'moderate',
    clarificationStatus: 'resolved',
    pharmacistAction: 'تم التحقق مع استشاري القلب: إيقاف Amlodipine متعمد لصالح أدوية 4 Pillars of GDMT التي تحسن الـ Survival في مرضى HFrEF.'
  }
];

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-1',
    title: 'ضبط جرعة Vancomycin IV via TDM في مريض ICU يعاني من AKI',
    titleEn: 'Vancomycin Dosing Optimization & AUC/MIC TDM in ICU Patient with AKI',
    ward: 'ICU',
    difficulty: 'Intermediate',
    summary: 'مريض 68 سنة (الوزن 78 kg) منوم في الـ ICU بتشخيص Severe HAP مع ارتفاع SCr إلى 2.4 mg/dL (CrCl ~ 28.5 mL/min). وُصف له Vancomycin 1000 mg IV q12h.',
    patientBrief: 'ذكر، 68 سنة، يعاني من Fever و Leukocytosis (WBC 16.4 ×10³/µL) مع Acute-on-Chronic Kidney Injury.',
    vitalsAndLabs: 'BP: 110/70 | HR: 95 | SCr: 2.4 mg/dL | BUN: 48 | K+: 5.3 mEq/L | CrCl: 28.5 mL/min',
    currentRegimen: ['Vancomycin 1000 mg IV q12h', 'Meropenem 1000 mg IV q8h'],
    question: 'بصفتك الـ Clinical Pharmacist في جولة الـ ICU، ما هو التدخل الإكلينيكي (DRP Intervention) الأدق والأكثر أماناً؟',
    options: [
      {
        id: 'opt-1',
        text: 'الاستمرار بنفس الجرعة (1000 mg IV q12h) مع تسريع الـ Infusion Rate إلى 30 دقيقة.',
        isCorrect: false,
        explanation: 'خطأ: التسريب السريع لـ Vancomycin يسبب Vancomycin Flushing Reaction (Red Man Syndrome)، والجرعة ستؤدي لتراكم سام و Nephrotoxicity.'
      },
      {
        id: 'opt-2',
        text: 'إعطاء Loading Dose 20–25 mg/kg، ثم تعديل الـ Maintenance Interval إلى 1000 mg IV q24h–q48h مع سحب TDM لاستهداف AUC24/MIC 400–600 mg·h/L.',
        isCorrect: true,
        explanation: 'صحيح (ASHP/IDSA/ACCP 2026): في حالات CrCl < 30 mL/min ينخفض الـ Renal Clearance لـ Vancomycin بشدة ويجب مباعدة الـ Dosing Interval مع مراقبة TDM.'
      },
      {
        id: 'opt-3',
        text: 'إيقاف Vancomycin فوراً واستبداله بـ Ceftriaxone 2 g IV q24h.',
        isCorrect: false,
        explanation: 'خطأ: المريض لديه True Penicillin Anaphylaxis، كما أن Ceftriaxone يفتقر تماماً لتغطية MRSA.'
      },
      {
        id: 'opt-4',
        text: 'مضاعفة الجرعة إلى 2000 mg IV q24h دفعة واحدة بدون TDM.',
        isCorrect: false,
        explanation: 'خطأ: جرعة عالية ترفع الـ Peak & AUC وتسبب Nephrotoxicity و Ototoxicity مباشرة.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'إدارة التداخل الحرج Warfarin + Amiodarone في مريض AFib',
    titleEn: 'Warfarin-Amiodarone Critical CYP2C9 Interaction Management in AFib',
    ward: 'CCU',
    difficulty: 'Advanced',
    summary: 'مريض يتناول Warfarin 5 mg PO OD، تم تنويمه في الـ CCU بسبب Symptomatic AFib وبدء Amiodarone 200 mg PO OD. كان الـ Baseline INR مستقراً عند 2.3.',
    patientBrief: 'ذكر 70 سنة، الوزن 75 kg، تاريخ Chronic Non-Valvular AFib.',
    vitalsAndLabs: 'INR: 2.3 | SCr: 1.0 mg/dL | LFTs: Normal',
    currentRegimen: ['Warfarin 5 mg PO OD', 'Amiodarone 200 mg PO OD', 'Atorvastatin 40 mg PO qHS'],
    question: 'ما هو التعديل الاستباقي (Pre-emptive Dose Adjustment) الذي يجب أن يوصي به الصيدلي الإكلينيكي فور بدء Amiodarone؟',
    options: [
      {
        id: 'opt-1',
        text: 'تخفيض جرعة الـ Warfarin تجريبياً بنسبة 33% إلى 50% مع مراقبة الـ INR خلال 3–5 أيام.',
        isCorrect: true,
        explanation: 'صحيح (ACCP Anticoagulation 2026): Amiodarone مثبط قوي لـ CYP2C9 و CYP3A4، ويؤدي إلى ارتفاع حاد في الـ INR ومخاطر Major Hemorrhage إن لم تُخفض جرعة Warfarin استباقياً.'
      },
      {
        id: 'opt-2',
        text: 'مضاعفة جرعة الـ Warfarin لأن Amiodarone يقلل الـ GI Absorption.',
        isCorrect: false,
        explanation: 'خطأ فادح: Amiodarone لا يقلل الامتصاص بل يثبط Hepatic Clearance لـ S-Warfarin.'
      },
      {
        id: 'opt-3',
        text: 'الانتظار لمدة 4 أسابيع قبل إعادة فحص الـ INR.',
        isCorrect: false,
        explanation: 'خطأ: التداخل يبدأ خلال أيام قليلة وقد يرفع الـ INR لمستويات حرجة (> 5.0).'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'بروتوكول تحويل ACEi إلى ARNI (Entresto) وإدارة Hyperkalemia في HFrEF (DiPiro 13th Ed)',
    titleEn: 'Transitioning ACEi to ARNI & Hyperkalemia Protocol in HFrEF (DiPiro 13th Ed Ch. 32)',
    ward: 'CCU',
    difficulty: 'Advanced',
    summary: 'مريضة 54 سنة تعاني من HFrEF (LVEF 32%) تتناول Ramipril 5 mg PO OD و Spironolactone 25 mg PO OD. يخطط الفريق الطبي لتحويلها إلى Sacubitril/Valsartan (Entresto) لاستكمال 4 Pillars of GDMT.',
    patientBrief: 'أنثى 54 سنة، BP 112/70 mmHg، Serum K+ 4.8 mEq/L، CrCl 65 mL/min.',
    vitalsAndLabs: 'BP: 112/70 | LVEF: 32% | K+: 4.8 mEq/L | CrCl: 65 mL/min',
    currentRegimen: ['Ramipril 5 mg PO OD', 'Spironolactone 25 mg PO OD', 'Bisoprolol 2.5 mg PO OD'],
    question: 'استناداً إلى مرجع DiPiro 13th Edition (Ch. 32) و ACCP Cardiology 2026، ما هو البروتوكول الإلزامي للتحويل الآمن إلى Sacubitril/Valsartan؟',
    options: [
      {
        id: 'opt-1',
        text: 'إعطاء الجرعة الأولى من Sacubitril/Valsartan في نفس مساء آخر جرعة من Ramipril لضمان استمرارية التغطية.',
        isCorrect: false,
        explanation: 'خطأ قاتل (Absolute Contraindication): الجمع المباشر بين ACEi و Neprilysin Inhibitor يسبب تراكم Bradykinin وحدوث Life-threatening Angioedema.'
      },
      {
        id: 'opt-2',
        text: 'إيقاف Ramipril والانتظار فترة غسيل إلزامية (36-hour Washout Period) قبل بدء Sacubitril/Valsartan، مع مراقبة K+ وإيقاف Spironolactone إذا تجاوز K+ > 5.5 mEq/L.',
        isCorrect: true,
        explanation: 'صحيح (DiPiro 13th Ed Ch. 32 & ACCP Cardiology 2026): يجب تطبيق 36-hour Washout Period عند التحويل من أي ACEi إلى ARNI (ولا تلزم عند التحويل من ARB).'
      },
      {
        id: 'opt-3',
        text: 'إيقاف Bisoprolol نهائياً عند بدء Sacubitril/Valsartan لتجنب Bradycardia.',
        isCorrect: false,
        explanation: 'خطأ: Evidence-based Beta-Blockers (Bisoprolol/Carvedilol/Metoprolol Succinate) ركيزة أساسية من الـ 4 Pillars of GDMT ولا توقف إلا في الـ Cardiogenic Shock.'
      }
    ]
  },
  {
    id: 'case-4',
    title: 'الاختيار والتحويل بين P2Y12 Inhibitors في ACS / Post-PCI (ACCP Cardiology 2026)',
    titleEn: 'P2Y12 Inhibitor Selection & Switching in ACS/PCI (ACCP Cardiology 2026 BCCP)',
    ward: 'CCU',
    difficulty: 'Intermediate',
    summary: 'مريض خضع لـ Primary PCI وتركيب Drug-Eluting Stent (DES) بعد NSTEMI. تم إعطاؤه Clopidogrel 300 mg في الطوارئ، وتقرر في الـ CCU التصعيد (Escalation) إلى Ticagrelor مع وجود تاريخ Aspirin Bronchospasm.',
    patientBrief: 'ذكر 61 سنة، الوزن 74 kg، لا يوجد تاريخ سابق لـ Prior Stroke أو TIA.',
    vitalsAndLabs: 'BP: 124/76 | HR: 68 | Hgb: 13.8 g/dL | CrCl: 72 mL/min',
    currentRegimen: ['Clopidogrel 300 mg PO given 6 hours ago', 'UFH IV Infusion'],
    question: 'وفق مرجع ACCP/ASHP Cardiology Pharmacy 2026 (BCCP)، كيف يتم الـ Switching من Clopidogrel إلى Ticagrelor في الطور الحاد لـ ACS؟',
    options: [
      {
        id: 'opt-1',
        text: 'إعطاء Loading Dose كاملة من Ticagrelor 180 mg PO فوراً بغض النظر عن توقيت أو جرعة Clopidogrel السابقة، ثم Maintenance Dose 90 mg PO BID.',
        isCorrect: true,
        explanation: 'صحيح (ACCP Cardiology 2026 Ch. 5): في الطور الحاد لـ ACS، يتم التحويل من Clopidogrel إلى Ticagrelor بإعطاء 180 mg Loading Dose فوراً لأن Ticagrelor يرتبط بشكل Reversible بموقع Allosteric غير تنافسي على مستقبل P2Y12.'
      },
      {
        id: 'opt-2',
        text: 'الانتظار 5 أيام كاملة حتى ينتهي مفعول Clopidogrel قبل إعطاء أول جرعة من Ticagrelor.',
        isCorrect: false,
        explanation: 'خطأ: ترك الـ Coronary Stent الحديثة دون P2Y12 Inhibition كافٍ لمدة 5 أيام يؤدي إلى Acute Stent Thrombosis قاتل.'
      },
      {
        id: 'opt-3',
        text: 'إعطاء Prasugrel 60 mg Loading Dose لمريض لديه تاريخ Prior Stroke / TIA.',
        isCorrect: false,
        explanation: 'خطأ: Prasugrel يحمل FDA Boxed Warning كـ Absolute Contraindication في حال وجود Prior Stroke أو TIA.'
      }
    ]
  },
  {
    id: 'case-5',
    title: 'بروتوكول التعامل مع DKA المترافق مع Hypokalemia (قاعدة البوتاسيوم قبل الأنسولين — Casebook Guide)',
    titleEn: 'DKA Management with Critical Hypokalemia: The Potassium-Before-Insulin Rule (Casebook Guide)',
    ward: 'ICU',
    difficulty: 'Advanced',
    summary: 'مريضة 46 سنة حضرت إلى الطوارئ بتشخيص Moderate-to-Severe DKA (BG 440 mg/dL، pH 7.16، HCO3- 10 mEq/L، Anion Gap 25). أظهرت التحاليل الأولية أن Serum K+ = 3.1 mEq/L مع SCr 1.9 mg/dL.',
    patientBrief: 'أنثى 46 سنة، الوزن 68 kg، تعاني من Kussmaul Breathing وتجفاف شديد، تتناول بالمنزل Dapagliflozin 10 mg و Metformin 1000 mg BID.',
    vitalsAndLabs: 'BG: 440 mg/dL | pH: 7.16 | HCO3-: 10 mEq/L | AG: 25 | K+: 3.1 mEq/L | SCr: 1.9 mg/dL',
    currentRegimen: ['0.9% NaCl IV Resuscitation', 'Proposed Order: Regular Insulin 0.1 U/kg/hr IV Infusion'],
    question: 'عند أخذك لهذه الحالة في الـ ICU استناداً إلى دليل الحالات السريرية (Casebook Guide) و DiPiro 13th Ed، ما هو القرار الإكلينيكي الفوري الأهم؟',
    options: [
      {
        id: 'opt-1',
        text: 'البدء فوراً بـ Regular Insulin 0.1 U/kg/hr IV Push + Infusion لخفض السكر السريع ثم فحص K+ بعد 4 ساعات.',
        isCorrect: false,
        explanation: 'خطأ قاتل: إعطاء Insulin بينما K+ < 3.5 mEq/L يدفع البوتاسيوم المتبقي إلى داخل الخلايا ويسبب Severe Hypokalemia و Ventricular Arrhythmias / Cardiac Arrest.'
      },
      {
        id: 'opt-2',
        text: 'تأجيل (Hold) بدء Regular Insulin IV مؤقتاً، وإعطاء السوائل الوريدية مع تعويض البوتاسيوم الفوري (IV KCl 20–40 mEq/hr) حتى يرتفع K+ >= 3.5 mEq/L، مع إيقاف Dapagliflozin و Metformin.',
        isCorrect: true,
        explanation: 'صحيح (Casebook Guide & ADA/DiPiro 13th Ed): القاعدة الذهبية في DKA هي فحص K+ قبل الأنسولين؛ إذا كان K+ < 3.5 mEq/L يجب تأجيل الأنسولين وتعويض K+ أولاً، وإيقاف SGLT2i و Metformin.'
      },
      {
        id: 'opt-3',
        text: 'إعطاء Sodium Bicarbonate IV روتينياً لكل مريض DKA وإيقاف السوائل الوريدية.',
        isCorrect: false,
        explanation: 'خطأ: لا يُعطى Sodium Bicarbonate في DKA إلا إذا كان pH < 6.9 لأنه يفاقم Intracellular Acidosis و Hypokalemia.'
      }
    ]
  },
  {
    id: 'case-6',
    title: 'إدارة التهاب الصفاق الجرثومي العفوي (SBP) واعتلال الدماغ في تشمع الكبد (Child-Pugh C — Casebook)',
    titleEn: 'Spontaneous Bacterial Peritonitis (SBP), Albumin Renal Protection & NSBB Window in Cirrhosis',
    ward: 'InternalMedicine',
    difficulty: 'Advanced',
    summary: 'مريض 66 سنة يعاني من Decompensated Cirrhosis (Child-Pugh Class C) أُدخل بحمى وألم بطني وتخليط ذهني (HE Grade II). أظهر بذل الحبن (Paracentesis) أن تعداد PMN = 480 cells/mm³، مع BP 86/52 mmHg و SCr 1.8 mg/dL.',
    patientBrief: 'ذكر 66 سنة، الوزن 76 kg، يتناول بالمنزل Propranolol 40 mg BID و Ibuprofen 400 mg عند اللزوم.',
    vitalsAndLabs: 'BP: 86/52 mmHg | Ascitic PMN: 480 cells/mm³ | Bilirubin: 3.6 | Albumin: 2.4 | INR: 2.1 | SCr: 1.8 mg/dL | K+: 3.3 mEq/L',
    currentRegimen: ['Propranolol 40 mg PO BID', 'Ibuprofen 400 mg PO PRN', 'Lactulose 30 mL PO TID'],
    question: 'ما هي الخطة العلاجية المتكاملة التي يجب أن يوصي بها الصيدلي الإكلينيكي أو الطالب عند تقييم هذه الحالة؟',
    options: [
      {
        id: 'opt-1',
        text: 'البدء بـ Ceftriaxone 2 g IV q24h + IV Albumin (1.5 g/kg اليوم 1 ثم 1 g/kg اليوم 3)، إيقاف Ibuprofen نهائياً وإيقاف Propranolol بسبب هبوط الضغط و AKI، وإضافة Rifaximin 550 mg BID مع تصحيح K+.',
        isCorrect: true,
        explanation: 'صحيح (AASLD / Casebook Guide): تشخيص SBP يتم عند Ascitic PMN >= 250؛ وإضافة IV Albumin تخفض خطر HRS-AKI والوفيات لأكثر من النصف، كما يجب إغلاق نافذة NSBB (Propranolol) عند SBP < 90 mmHg أو AKI.'
      },
      {
        id: 'opt-2',
        text: 'رفع جرعة Propranolol إلى 80 mg BID وإعطاء Gentamicin IV لعلاج التهاب الصفاق.',
        isCorrect: false,
        explanation: 'خطأ فادح: Aminoglycosides (Gentamicin) سامة جداً للكلى في مرضى التشمع، واستمرار Propranolol مع ضغط 86/52 يمنع المعاوضة القلبية ويقود لـ HRS-AKI قاتل.'
      },
      {
        id: 'opt-3',
        text: 'إعطاء Lorazepam IV لتهدئة المريض مع الاستمرار على Ibuprofen لتسكين الألم البطني.',
        isCorrect: false,
        explanation: 'خطأ: Benzodiazepines تفاقم Hepatic Encephalopathy بشدة، و NSAIDs تغلق التروية الكلوية وتسبب نزيف دوالي المريء.'
      }
    ]
  },
  {
    id: 'case-7',
    title: 'اختيار وضبط مضاد التخثر في الانصمام الرئوي الحاد (Acute PE) مع قصور كلوي شديد (CrCl < 30)',
    titleEn: 'Anticoagulation Selection in Acute Submassive PE with Severe Renal Impairment (CrCl < 30 mL/min)',
    ward: 'InternalMedicine',
    difficulty: 'Intermediate',
    summary: 'مريض 71 سنة (الوزن 72 kg) شُخص بـ Acute Segmental Pulmonary Embolism (PE) بعد عملية جراحية. المريض مستقر هيموديناميكياً (BP 122/76 mmHg)، ولكن تحاليله أظهرت SCr = 2.3 mg/dL (CrCl المحسوب = 23 mL/min).',
    patientBrief: 'ذكر 71 سنة، Hgb 13.2 g/dL، Platelets 230 ×10³/µL، لا يوجد نزيف نشط.',
    vitalsAndLabs: 'BP: 122/76 | HR: 102 | SpO2: 94% | SCr: 2.3 mg/dL | CrCl: 23 mL/min | Platelets: 230k',
    currentRegimen: ['Proposed Order: Enoxaparin 70 mg (1 mg/kg) SC Every 12 Hours (q12h) OR Rivaroxaban 15 mg PO BID'],
    question: 'عند مراجعتك للوصفة المقترحة بناءً على قائمة فحص الجلطات (VTE Checklist)، ما هو التدخل الصيدلاني الصحيح؟',
    options: [
      {
        id: 'opt-1',
        text: 'الموافقة على Enoxaparin 1 mg/kg SC q12h لأنها الجرعة القياسية لعلاج PE.',
        isCorrect: false,
        explanation: 'خطأ: عندما يكون CrCl < 30 mL/min، يتراكم Enoxaparin بشدة إذا أُعطي كل 12 ساعة ويسبب Major Bleeding.'
      },
      {
        id: 'opt-2',
        text: 'رفض جرعة q12h وتعديلها إلى Unfractionated Heparin (UFH) IV Infusion (أو Enoxaparin 1 mg/kg SC مرة واحدة يومياً q24h)، وتجنب Rivaroxaban لأن CrCl < 30 mL/min.',
        isCorrect: true,
        explanation: 'صحيح (CHEST / ACCP 2026 & Casebook Guide): عند CrCl < 30 mL/min يُفضل UFH IV أو خفض Enoxaparin العلاجي إلى 1 mg/kg SC q24h، ويُتجنب Rivaroxaban/Dabigatran.'
      },
      {
        id: 'opt-3',
        text: 'البدء بـ Warfarin 5 mg PO بمفرده دون أي تغطية حقنية (No Parenteral Overlap).',
        isCorrect: false,
        explanation: 'خطأ: بدء Warfarin بمفرده في جلطة حادة يثبط Protein C & S أولاً فيحدث حالة تخثر عكسية (Hypercoagulable state / Skin Necrosis)؛ يجب التغطية بـ Heparin لمدة >= 5 أيام وحتى يصبح INR >= 2.0.'
      }
    ]
  },
  {
    id: 'case-8',
    title: 'أخذ حالة تفاقم السدة الرئوية الحاد (AECOPD — Anthonisen Criteria) وفخ تطاول QTc',
    titleEn: 'Acute Exacerbation of COPD (AECOPD) Workup, Systemic Steroid Duration & QTc Drug Interaction',
    ward: 'InternalMedicine',
    difficulty: 'Beginner',
    summary: 'مريض 67 سنة مدخن سابق يعاني من COPD (GOLD Group E) راجع بزيادة شديدة في ضيق النفس، زيادة حجم البلغم، وتحول لون البلغم إلى القيحي الأخضر (جميع معايير Anthonisen الثلاثة). يتناول بالمنزل Escitalopram 20 mg و Amiodarone 200 mg.',
    patientBrief: 'ذكر 67 سنة، الحرارة 37.8°C، SpO2 89% على هواء الغرفة، QTc في تخطيط القلب = 478 ms.',
    vitalsAndLabs: 'SpO2: 89% | RR: 26/min | WBC: 12.8 | Baseline QTc: 478 ms | CrCl: 64 mL/min',
    currentRegimen: ['Salbutamol + Ipratropium Nebulizer', 'Proposed: Methylprednisolone 60 mg IV q6h x 14 days + Levofloxacin 750 mg PO OD'],
    question: 'ما هو التعديل الإكلينيكي الأدق لخطة علاج الـ AECOPD لهذا المريض وفق الدليل المرجعي؟',
    options: [
      {
        id: 'opt-1',
        text: 'تحويل الكورتيزون إلى Prednisone 40 mg PO مرة يومياً لمدة 5 أيام فقط، واستبدال Levofloxacin بـ Amoxicillin/Clavulanate (أو Doxycycline) لتجنب تطاول QTc القاتل مع Amiodarone و Escitalopram.',
        isCorrect: true,
        explanation: 'صحيح (GOLD 2026 & Casebook Guide): دراسة REDUCE أثبتت أن Prednisone 40 mg PO لمدة 5 أيام يعادل 14 يوماً بأعراض جانبية أقل؛ وبما أن المريض لديه QTc = 478 ms ويتناول Amiodarone + Escitalopram، يجب تجنب Fluoroquinolones/Macrolides.'
      },
      {
        id: 'opt-2',
        text: 'الاستمرار على Methylprednisolone IV بجرعات عالية لمدة 14 يوماً وإضافة Azithromycin إلى Levofloxacin.',
        isCorrect: false,
        explanation: 'خطأ: الجمع بين Levofloxacin و Azithromycin مع Amiodarone يرفع خطر Torsades de Pointes بشكل حرج، والكورتيزون المطول يسبب Hyperglycemia وعدوى ثانوية.'
      },
      {
        id: 'opt-3',
        text: 'منع إعطاء أي مضاد حيوي رغم توفر معايير Anthonisen الثلاثة (ضيق النفس + زيادة حجم البلغم + قيحية البلغم).',
        isCorrect: false,
        explanation: 'خطأ: وجود قيحية البلغم (Increased Sputum Purulence) مع زيادة الحجم أو ضيق النفس يستوجب مضاداً حيوياً لمدة 5 أيام.'
      }
    ]
  }
];

export const DRUG_INTERACTIONS_DB = [
  {
    drugA: 'Amiodarone',
    drugB: 'Warfarin',
    severity: 'Major' as const,
    stockleyRating: 'Severe — Adjust Dose & Monitor INR (Stockley’s Sec. 1.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    mechanism: 'Amiodarone & desethylamiodarone potently inhibit hepatic CYP2C9 (S-warfarin) and CYP3A4 (R-warfarin) clearance; effect persists for months after discontinuation (t1/2 ~ 40–55 days).',
    clinicalEffect: 'Marked elevation of INR (often > 4.0–6.0) within 3–7 days and high risk of life-threatening intracranial or GI hemorrhage.',
    actionRequired: 'Empirically reduce Warfarin maintenance dose by 33% to 50% upon starting Amiodarone; monitor INR every 3–5 days until new steady state.'
  },
  {
    drugA: 'Meropenem / Ertapenem / Imipenem',
    drugB: 'Valproic Acid (Sodium Valproate)',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated — Do Not Co-Administer (Stockley’s Sec. 3.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec3-antimicrobials-cns-chelation',
    mechanism: 'Carbapenems inhibit hepatic and erythrocytic acylpeptide hydrolase, blocking deconjugation of valproate glucuronide and accelerating renal clearance.',
    clinicalEffect: 'Rapid 60% to 90% drop in serum Valproic Acid concentrations within 24–48 hours, precipitating acute breakthrough seizures and Status Epilepticus.',
    actionRequired: 'Avoid combination (increasing Valproate dose fails to overcome interaction). Switch antibiotic to Cefepime or add Levetiracetam.'
  },
  {
    drugA: 'Ramipril / Lisinopril / Enalapril (ACEi)',
    drugB: 'Sacubitril/Valsartan (Entresto)',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated — Mandatory 36h Washout (Stockley’s Sec. 2.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    mechanism: 'Synergistic inhibition of ACE and Neprilysin blocks breakdown of endogenous Bradykinin and Substance P.',
    clinicalEffect: 'High incidence of life-threatening laryngeal and angioedema.',
    actionRequired: 'Strictly contraindicated. Enforce a mandatory 36-hour washout period after the last ACE inhibitor dose before initiating Sacubitril/Valsartan.'
  },
  {
    drugA: 'Vancomycin',
    drugB: 'Piperacillin/Tazobactam (Zosyn)',
    severity: 'Major' as const,
    stockleyRating: 'Major — Prefer Alternative Beta-Lactam & Monitor TDM (Stockley’s Sec. 3.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec3-antimicrobials-cns-chelation',
    mechanism: 'Synergistic proximal tubular nephrotoxicity combined with OAT1/OAT3 tubular creatinine secretion competition.',
    clinicalEffect: '2.5- to 3.5-fold increased incidence of inpatient Acute Kidney Injury (AKI) compared to Vancomycin + Cefepime or Meropenem.',
    actionRequired: 'Consider substituting Piperacillin/Tazobactam with Cefepime or Meropenem; perform AUC24/MIC-guided Vancomycin TDM (400–600 mg·h/L) and daily SCr.'
  },
  {
    drugA: 'Linezolid',
    drugB: 'Sertraline / Escitalopram / Tramadol / Fentanyl',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated — Serotonin Toxicity Risk (Stockley’s Sec. 3.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec3-antimicrobials-cns-chelation',
    mechanism: 'Linezolid is a reversible, non-selective monoamine oxidase inhibitor (MAOI) that blocks central serotonin metabolism.',
    clinicalEffect: 'Life-threatening Serotonin Syndrome (hyperthermia > 40°C, neuromuscular clonus, agitation, autonomic crisis).',
    actionRequired: 'Hold serotonergic antidepressants/opioids (Tramadol/Meperidine) or replace Linezolid with Vancomycin or Daptomycin.'
  },
  {
    drugA: 'Digoxin',
    drugB: 'Amiodarone / Verapamil / Clarithromycin',
    severity: 'Major' as const,
    stockleyRating: 'Severe — Reduce Digoxin Dose by 50% (Stockley’s Sec. 2.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    mechanism: 'Potent inhibition of intestinal and renal tubular P-glycoprotein (P-gp) efflux transporter.',
    clinicalEffect: '70% to 100% increase in serum Digoxin concentration leading to GI toxicity, xanthopsia, high-grade AV block, and ventricular arrhythmias.',
    actionRequired: 'Empirically halve (reduce by 50%) the Digoxin maintenance dose immediately upon starting Amiodarone, Verapamil, or Clarithromycin; check Digoxin trough (target 0.5–0.9 ng/mL).'
  },
  {
    drugA: 'Spironolactone / Eplerenone',
    drugB: 'Ramipril / Lisinopril / Valsartan / Trimethoprim',
    severity: 'Major' as const,
    stockleyRating: 'Major — Intensive K+ & Renal Monitoring (Stockley’s Sec. 2.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    mechanism: 'Additive aldosterone suppression and distal nephron ENaC potassium retention (especially with Trimethoprim or CrCl < 45 mL/min).',
    clinicalEffect: 'Severe, potentially fatal Hyperkalemia (K+ > 5.5–6.0 mEq/L) and cardiac conduction arrest.',
    actionRequired: 'Verify baseline K+ < 5.0 mEq/L and CrCl > 30 mL/min; recheck Serum K+ and SCr within 48–72 hours; hold MRA if K+ > 5.5 mEq/L.'
  },
  {
    drugA: 'Clopidogrel',
    drugB: 'Omeprazole / Esomeprazole',
    severity: 'Moderate' as const,
    stockleyRating: 'Switch PPI to Pantoprazole (Stockley’s Sec. 1.3)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    mechanism: 'Irreversible mechanism-based inhibition of hepatic CYP2C19 blocks conversion of Clopidogrel prodrug to its active thiol metabolite (separating doses by 12h does NOT prevent interaction).',
    clinicalEffect: '40–45% reduction in active Clopidogrel metabolite and increased risk of coronary stent thrombosis.',
    actionRequired: 'Switch Omeprazole/Esomeprazole to Pantoprazole (minimal CYP2C19 inhibition) or Famotidine.'
  },
  {
    drugA: 'Ciprofloxacin / Levofloxacin / Azithromycin',
    drugB: 'Amiodarone / Sotalol / Haloperidol / Ondansetron',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated / Avoid — Additive QTc Prolongation (Stockley’s Sec. 2.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    mechanism: 'Synergistic blockade of cardiac hERG potassium channels (IKr) delaying ventricular repolarization.',
    clinicalEffect: 'Marked QTc prolongation (> 500 ms) and polymorphic ventricular tachycardia (Torsades de Pointes).',
    actionRequired: 'Avoid combination. Select a non-QTc-prolonging antibiotic (e.g., beta-lactam or doxycycline), or correct K+ > 4.0 mEq/L and Mg2+ > 2.0 mg/dL with continuous ECG.'
  },
  {
    drugA: 'Apixaban / Rivaroxaban',
    drugB: 'Voriconazole / Posaconazole / Itraconazole / Ritonavir',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated (Rivaroxaban) / 50% Dose Cut (Apixaban) (Stockley’s Sec. 1.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    mechanism: 'Dual potent inhibition of hepatic CYP3A4 metabolism and intestinal/renal P-glycoprotein (P-gp) efflux.',
    clinicalEffect: '100% to 160% increase in DOAC plasma AUC, resulting in major internal hemorrhage.',
    actionRequired: 'Rivaroxaban: Contraindicated. Apixaban: Reduce dose by 50% (from 5 mg BID to 2.5 mg BID); avoid if already on 2.5 mg BID.'
  },
  {
    drugA: 'Apixaban / Rivaroxaban / Dabigatran',
    drugB: 'Phenytoin / Carbamazepine / Rifampicin',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated — Loss of Anticoagulation (Stockley’s Sec. 1.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    mechanism: 'Potent PXR-mediated induction of intestinal/renal P-gp efflux and hepatic CYP3A4.',
    clinicalEffect: '50% to 66% reduction in DOAC plasma concentrations, leading to thromboembolic stroke or recurrent DVT/PE.',
    actionRequired: 'Avoid DOACs with potent P-gp/CYP3A4 inducers; transition to Warfarin with frequent INR titration or LMWH.'
  },
  {
    drugA: 'Simvastatin / Atorvastatin',
    drugB: 'Clarithromycin / Amiodarone / Amlodipine / Diltiazem',
    severity: 'Major' as const,
    stockleyRating: 'Severe — Statin Dose Ceiling or Hold (Stockley’s Sec. 2.3)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    mechanism: 'Inhibition of intestinal and hepatic CYP3A4 and OATP1B1 hepatic uptake transporter.',
    clinicalEffect: 'Up to 10-fold elevation in statin AUC, causing severe myopathy, CPK elevation, and acute rhabdomyolysis-induced AKI.',
    actionRequired: 'Temporarily hold Simvastatin/Atorvastatin during Clarithromycin therapy (or switch to Azithromycin). Cap Simvastatin at max 20 mg/day with Amiodarone or Amlodipine, or switch to Rosuvastatin/Pravastatin.'
  },
  {
    drugA: 'Warfarin / Apixaban / Rivaroxaban',
    drugB: 'Ibuprofen / Ketorolac / Naproxen / Diclofenac (NSAIDs)',
    severity: 'Major' as const,
    stockleyRating: 'Severe — Avoid Concurrent NSAID (Stockley’s Sec. 1.1)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    mechanism: 'Pharmacodynamic COX-1 platelet aggregation blockade + direct gastric mucosal prostaglandin depletion (+ CYP2C9 competition for Warfarin).',
    clinicalEffect: '3- to 6-fold increase in upper and lower gastrointestinal hemorrhage.',
    actionRequired: 'Discontinue systemic NSAID and use Paracetamol or topical analgesia; if antiplatelet + anticoagulant is mandatory, add Pantoprazole 40 mg OD.'
  },
  {
    drugA: 'Ceftriaxone IV',
    drugB: 'Calcium Gluconate IV / Ringer’s Lactate / TPN',
    severity: 'Contraindicated' as const,
    stockleyRating: 'Contraindicated — Intravascular Precipitation (Stockley’s Sec. 3.2)',
    referenceSource: "Stockley's Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    referenceUrl: 'local://ref/chapter/stockleys-sec3-antimicrobials-cns-chelation',
    mechanism: 'Physicochemical formation of insoluble Ceftriaxone-Calcium crystalline salt precipitates in IV tubing or bloodstream.',
    clinicalEffect: 'Fatal microvascular crystalline emboli in lungs and kidneys (especially in neonates < 28 days).',
    actionRequired: 'Contraindicated within 48h in neonates. In adults, never co-infuse in the same Y-site; flush IV lines thoroughly or switch to Cefotaxime/Cefepime.'
  }
];

export const HOSPITAL_GUIDELINES = [
  {
    id: 'guide-1',
    category: 'Antimicrobial Stewardship (AMS)',
    title: 'Hospital-Acquired & Ventilator-Associated Pneumonia (HAP/VAP)',
    titleAr: 'بروتوكول Hospital-Acquired & Ventilator-Associated Pneumonia (HAP/VAP)',
    summary: 'بروتوكول الـ Empiric Therapy للمرضى ذوي الخطورة العالية لـ MDR Pathogens (MRSA & Pseudomonas aeruginosa).',
    recommendations: [
      'MRSA Coverage: إعطاء Vancomycin IV (Loading 20–25 mg/kg ثم ضبط الجرعة عبر TDM لاستهداف AUC24/MIC 400–600 mg·h/L) أو Linezolid 600 mg IV/PO q12h.',
      'Antipseudomonal Coverage: إعطاء Meropenem 1 g IV q8h (أو 500 mg IV q12h عند CrCl < 30 mL/min) عبر 3-hour Extended Infusion، أو Cefepime 2 g IV q8h.',
      'Septic Shock / High Mortality Risk: دراسة Dual Antipseudomonal Coverage مع تجنب الجمع الروتيني لـ Aminoglycosides في مرضى AKI.',
      'Antimicrobial De-escalation: مراجعة Cultures & Susceptibility عند 48–72 ساعة وتحديد مدة العلاج بـ 7 أيام في الحالات المستجيبة سريرياً.'
    ]
  },
  {
    id: 'guide-2',
    category: 'Cardiology & Anticoagulation',
    title: 'Inpatient Anticoagulation & Heparin/DOAC Protocols',
    titleAr: 'بروتوكول Inpatient Anticoagulation (UFH / LMWH / DOACs)',
    summary: 'إرشادات ضبط الجرعات لـ Enoxaparin و Unfractionated Heparin (UFH) و DOACs في حالات Renal Impairment.',
    recommendations: [
      'VTE Prophylaxis: إعطاء Enoxaparin 40 mg SC q24h (وتُخفض إلى 30 mg SC q24h أو يُستبدل بـ UFH 5000 Units SC q8-12h إذا كان CrCl < 30 mL/min).',
      'Therapeutic VTE / ACS Anticoagulation: إعطاء Enoxaparin 1 mg/kg SC q12h (وتُعدل إلى 1 mg/kg SC q24h مع Anti-Xa Monitoring إذا كان CrCl 15–29 mL/min).',
      'Severe AKI / CrCl < 15 mL/min / Dialysis: يُفضل دائماً Unfractionated Heparin (UFH) IV Infusion مع المعايرة وفق aPTT أو Anti-Xa.',
      'Urgent Anticoagulation Reversal: إعطاء Protamine Sulfate لعكس UFH/LMWH، و 4-Factor PCC أو Vitamin K لعكس Warfarin، و Andexanet Alfa / 4F-PCC لنزيف Factor Xa Inhibitors.'
    ]
  },
  {
    id: 'guide-3',
    category: 'Electrolyte Replacement',
    title: 'Inpatient Potassium & Magnesium Replacement Protocol',
    titleAr: 'بروتوكول تعويض Hypokalemia & Hypomagnesemia في الأجنحة و ICU',
    summary: 'معايير التعويض الآمن عبر Oral & IV Infusion لتجنب Phlebitis و Cardiac Arrhythmias.',
    recommendations: [
      'Mild-to-Moderate Hypokalemia (K+ 3.0–3.9 mEq/L): تعويض 20–40 mEq Oral KCl مقسمة مع مراقبة Serum K+.',
      'Severe Hypokalemia (K+ < 3.0 mEq/L) أو Symptomatic Arrhythmia: تسريب 10–20 mEq/hr IV عبر Central Line مع Continuous ECG Monitoring (أقصى معدل Peripheral Line هو 10 mEq/hr).',
      'Refractory Hypokalemia Rule: يجب دائماً فحص وتصحيح Serum Magnesium بالتزامن، لأن Hypomagnesemia تمنع استجابة الكلى لتعويض البوتاسيوم.',
      'Hypomagnesemia Replacement: إعطاء Magnesium Sulfate 2–4 g IV Infusion على مدار 2–4 ساعات لتفادي Renal Magnesium Wasting.'
    ]
  }
];

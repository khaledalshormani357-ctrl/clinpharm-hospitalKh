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
    allergies: ['Penicillin (True IgE Anaphylaxis)', 'Sulfa drugs (Maculopapular Rash)'],
    diagnoses: [
      'Severe Hospital-Acquired Pneumonia (HAP)',
      'Acute Kidney Injury (AKI) on CKD Stage 3',
      'Type 2 Diabetes Mellitus (T2DM)',
      'Atrial Fibrillation (AFib)'
    ],
    admissionDate: '2026-10-09',
    attendingPhysician: 'Dr. طارق العمري (ICU Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'critical',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 2.4, // elevated!
      bun: 48,
      potassium: 5.3,
      sodium: 138,
      albumin: 3.1,
      inr: 1.3,
      wbc: 16.4,
      crcl: 28.5 // severe renal impairment!
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
      'Non-ST Elevation Myocardial Infarction (NSTEMI)',
      'Hypertension (HTN)',
      'Heart Failure with Reduced Ejection Fraction (HFrEF, LVEF 35%)'
    ],
    admissionDate: '2026-10-11',
    attendingPhysician: 'Dr. سامي رضوان (Interventional Cardiology Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'stable',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 0.9,
      potassium: 4.8,
      sodium: 140,
      crcl: 68.2
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
      'Hepatic Encephalopathy (HE) West Haven Grade I',
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
      potassium: 3.6,
      sodium: 132,
      bilirubin: 2.8,
      albumin: 2.9,
      inr: 1.6,
      crcl: 64.0
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
      'Acute Post-Operative Pain',
      'Post-Operative Nausea and Vomiting (PONV)'
    ],
    admissionDate: '2026-10-11',
    attendingPhysician: 'Dr. يوسف المري (General Surgery Consultant)',
    clinicalPharmacist: 'Dr. خالد الشورماني (Clinical Pharmacist)',
    status: 'discharge_planned',
    labs: {
      date: '2026-10-12',
      serumCreatinine: 0.7,
      potassium: 4.1,
      sodium: 139,
      crcl: 98.0
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
    mechanism: 'Inhibition of CYP2C9 and CYP3A4 by Amiodarone decreases S- and R-Warfarin hepatic clearance.',
    clinicalEffect: 'Marked elevation of INR (often > 4.0) and severe, life-threatening Major Hemorrhage risk.',
    actionRequired: 'Empirically reduce Warfarin maintenance dose by 33% to 50%; monitor INR every 2–3 days until stable.'
  },
  {
    drugA: 'Vancomycin',
    drugB: 'Piperacillin/Tazobactam (Zosyn)',
    severity: 'Major' as const,
    mechanism: 'Synergistic Nephrotoxicity via additive proximal tubular and interstitial renal injury.',
    clinicalEffect: 'Significantly elevated incidence of Acute Kidney Injury (AKI) compared to Vancomycin + Cefepime or Meropenem.',
    actionRequired: 'Consider switching Piperacillin/Tazobactam to Cefepime or Meropenem, and monitor daily SCr & Vancomycin AUC24/MIC.'
  },
  {
    drugA: 'Spironolactone',
    drugB: 'Ramipril / ACE-Inhibitors',
    severity: 'Moderate' as const,
    mechanism: 'Additive aldosterone suppression and renal potassium retention in the distal nephron.',
    clinicalEffect: 'Risk of severe Hyperkalemia (K+ > 5.5 mEq/L) predisposing to life-threatening cardiac arrhythmias.',
    actionRequired: 'Monitor Serum K+ and SCr within 48–72 hours; hold MRA if K+ > 5.5 mEq/L and avoid exogenous KCl or NSAIDs.'
  },
  {
    drugA: 'Clopidogrel',
    drugB: 'Omeprazole',
    severity: 'Moderate' as const,
    mechanism: 'Omeprazole competitively inhibits hepatic CYP2C19 bioactivation of the prodrug Clopidogrel.',
    clinicalEffect: 'Attenuated platelet P2Y12 inhibition and increased risk of High On-Treatment Platelet Reactivity / Stent Thrombosis.',
    actionRequired: 'Switch PPI to Pantoprazole (minimal CYP2C19 inhibition) or Famotidine (H2RA).'
  },
  {
    drugA: 'Ciprofloxacin',
    drugB: 'Amiodarone',
    severity: 'Contraindicated' as const,
    mechanism: 'Additive blockade of cardiac hERG potassium channels (IKr) delaying ventricular repolarization.',
    clinicalEffect: 'Severe QTc Prolongation (> 500 ms), Torsades de Pointes (TdP), and ventricular fibrillation.',
    actionRequired: 'Avoid combination. Select an alternative antimicrobial without QTc prolongation liability.'
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

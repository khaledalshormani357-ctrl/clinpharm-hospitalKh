import { VerbatimChapter } from '../libraryTypes';

export const accpAcsChapter: VerbatimChapter = {
  id: 'accp-v1-acs',
  bookId: 'accp-2026-vol1',
  chapterNumber: 2,
  title: 'Acute Coronary Syndromes: Pathophysiology, Antiplatelet Therapy, Anticoagulation, and Secondary Prevention',
  titleAr: 'المتلازمات الإكليلية الحادة (ACS): الفيزيولوجيا المرضية، مضادات الصفيحات (DAPT)، مضادات التخثر، والوقاية الثانوية',
  authors: 'Kelly C. Rogers, PharmD, FCCP, FACC, BCPS; Shannon W. Finks, PharmD, FCCP, BCPS',
  edition: '2026 Edition (American College of Clinical Pharmacy)',
  pageRange: 'pp. 45–112',
  systemCategory: 'Cardiology',
  systemCategoryAr: 'أمراض القلب والشرايين',
  uan: '0217-0000-26-002-L01-P',
  sourceUrl: 'local://ref/chapter/accp-v1-acs',
  isVerbatimSource: true,
  citation:
    'Rogers KC, Finks SW. Acute Coronary Syndromes. In: Beckett RD, et al, eds. Updates in Therapeutics: Pharmacotherapy Preparatory Review and Recertification Course. 2026 ed. ACCP; 2026:45-112. [local://ref/chapter/accp-v1-acs]',
  learningObjectives: [
    'Differentiate non-ST-segment elevation acute coronary syndromes (NSTE-ACS: unstable angina and NSTEMI) from ST-segment elevation myocardial infarction (STEMI) based on clinical presentation, ECG patterns, and high-sensitivity cardiac troponins.',
    'Formulate acute pharmacotherapy regimens for PCI-bound ACS patients, including aspirin, P2Y12 receptor antagonists, and parenteral anticoagulants.',
    'Navigate the pharmacology and contraindications of oral P2Y12 inhibitors (Clopidogrel, Prasugrel, Ticagrelor) including CYP2C19 loss-of-function alleles and bleeding risk profiles.',
    'Manage combination antithrombotic regimens (triple vs double therapy) in patients with concurrent atrial fibrillation undergoing percutaneous coronary intervention.'
  ],
  toc: [
    { id: 'accp-acs-sec1', number: '1.0', title: 'Plaque Rupture, Thrombosis, and Pathophysiologic Cascade' },
    { id: 'accp-acs-sec2', number: '2.0', title: 'Clinical Presentation, ECG Differentiation, and Biomarker Kinetics' },
    { id: 'accp-acs-sec3', number: '3.0', title: 'Acute Antiplatelet Protocols: Aspirin & P2Y12 Receptor Antagonists' },
    { id: 'accp-acs-sec4', number: '4.0', title: 'Parenteral Anticoagulant Strategies (UFH, Enoxaparin, Bivalirudin)' },
    { id: 'accp-acs-sec5', number: '5.0', title: 'High-Intensity Statin Therapy and Plaque Stabilization' },
    { id: 'accp-acs-sec6', number: '6.0', title: 'Special Populations: Triple vs Double Therapy in AFib Undergoing PCI' },
    { id: 'accp-acs-sec7', number: '7.0', title: 'Board Review Pearls, Reversal Strategies, and High-Yield Pitfalls' }
  ],
  boardPearls: [
    'PRASUGREL BLACK BOX WARNING: Prasugrel is strictly contraindicated in patients with a history of prior stroke or Transient Ischemic Attack (TIA) due to a significant excess of fatal intracranial hemorrhage (TRITON-TIMI 38 trial). It is generally not recommended in patients aged >= 75 years or weighing < 60 kg unless at very high ischemic risk (if used in < 60 kg, reduce maintenance to 5 mg daily).',
    'TICAGRELOR AND ASPIRIN CEILING: Ticagrelor maintenance efficacy is significantly reduced when co-administered with high-dose maintenance aspirin (> 100 mg daily). Aspirin maintenance dose must be strictly capped at 81 mg daily (PLATO trial US paradox).',
    'CLOPIDOGREL CYP2C19 PHARMACOGENOMICS: Clopidogrel is a prodrug requiring two-step hepatic bioactivation involving CYP2C19. Poor metabolizers (*2, *3 loss-of-function alleles) exhibit blunted platelet inhibition and higher stent thrombosis rates; Ticagrelor or Prasugrel should be selected instead.',
    'P2Y12 CABG WASHOUT WINDOWS: If urgent or elective Coronary Artery Bypass Graft (CABG) surgery is planned, P2Y12 inhibitors must be held: Ticagrelor for at least 3-5 days, Clopidogrel for 5 days, and Prasugrel for 7 days to minimize perioperative hemorrhagic catastrophe.',
    'PCI IN ATRIAL FIBRILLATION: Current guidelines mandate dropping Aspirin upon hospital discharge (or within 1-4 weeks max), continuing "Double Therapy" with a DOAC (preferably Apixaban or Rivaroxaban) plus Clopidogrel 75 mg daily to minimize major bleeding without compromising stent thrombosis protection.'
  ],
  boardPearlsAr: [
    'تحذير الصندوق الأسود لـ Prasugrel: ممنوع منعاً باتاً لمرضى السكتة الدماغية (Stroke/TIA) السابقة لزيادة النزف القحفي القاتل. يُتجنب لدى كبار السن (>= 75 سنة) أو الوزن < 60 كغ (وإن استُخدم يخفض إلى 5 mg).',
    'سقف جرعة الأسبرين مع Ticagrelor: يجب ألا تتجاوز جرعة الأسبرين اليومية 81 mg مع Ticagrelor لأن الجرعات > 100 mg تقلل من فعالية Ticagrelor السريرية (PLATO Trial).',
    'علم الصيدلة الجيني لـ Clopidogrel: طفرات إنزيم CYP2C19 (*2, *3) تعطل تحويل الدواء لشكله الفعال، مما يرفع خطر خثار الدعامة؛ يُفضل استبداله بـ Ticagrelor أو Prasugrel.',
    'فترات إيقاف مضادات P2Y12 قبل جراحة القلب المفتوح (CABG): يوقف Ticagrelor قبل 3-5 أيام، Clopidogrel قبل 5 أيام، و Prasugrel قبل 7 أيام لتجنب النزف الحاد.',
    'الرجفان الأذيني مع القسطرة (PCI): توصي الإرشادات بإلغاء الأسبرين عند الخروج من المستشفى والاستمرار على "علاج ثنائي" (DOAC + Clopidogrel) للحد من النزف الشديد.'
  ],
  keywords: [
    'ACS',
    'NSTEMI',
    'STEMI',
    'Aspirin',
    'Ticagrelor',
    'Prasugrel',
    'Clopidogrel',
    'Enoxaparin',
    'Bivalirudin',
    'Unfractionated Heparin',
    'DAPT',
    'PCI',
    'Atorvastatin'
  ],
  quickTables: [
    {
      title: 'Oral P2Y12 Receptor Antagonists Pharmacologic and Dosing Comparison',
      titleAr: 'مقارنة خصائص وجرعات مضادات مستقبلات P2Y12 الفموية',
      headers: ['Parameter / Agent', 'Clopidogrel (Plavix)', 'Prasugrel (Effient)', 'Ticagrelor (Brilinta)'],
      headersAr: ['المعيار / الدواء', 'Clopidogrel', 'Prasugrel', 'Ticagrelor'],
      rows: [
        [
          'Drug Class & Binding',
          'Thienopyridine; Irreversible covalent binding to P2Y12',
          'Thienopyridine; Irreversible covalent binding to P2Y12',
          'Cyclopentyltriazolopyrimidine; Reversible non-competitive binding'
        ],
        [
          'Loading Dose',
          '300 mg to 600 mg PO x 1 (600 mg preferred for acute PCI)',
          '60 mg PO x 1 (administer only AFTER coronary anatomy is defined)',
          '180 mg PO x 1'
        ],
        [
          'Maintenance Dose',
          '75 mg PO once daily',
          '10 mg PO once daily (5 mg daily if body weight < 60 kg)',
          '90 mg PO twice daily (decrease to 60 mg BID after 12 months)'
        ],
        [
          'Metabolism & Bioactivation',
          'Prodrug: requires 2-step CYP bioactivation (CYP2C19 primary)',
          'Prodrug: rapid esterase hydrolysis followed by single CYP step',
          'Active drug (does not require hepatic bioactivation); active metabolite via CYP3A4'
        ],
        [
          'Contraindications & Black Box',
          'Active bleeding; poor metabolizers risk stent thrombosis',
          'Active bleeding; PRIOR STROKE OR TIA (Absolute Contraindication)',
          'Active bleeding; intracranial hemorrhage history; severe hepatic impairment'
        ],
        [
          'Pre-CABG Washout Window',
          'Hold at least 5 days prior to surgery',
          'Hold at least 7 days prior to surgery',
          'Hold at least 3 to 5 days prior to surgery'
        ],
        [
          'Key Adverse Effects',
          'Bleeding, rash, rare TTP',
          'Higher major bleeding rates (including fatal bleeding)',
          'Dyspnea (10-15%, self-limiting), ventricular pauses, hyperuricemia'
        ]
      ],
      rowsAr: [
        [
          'الفئة ونوع الارتباط',
          'Thienopyridine؛ ارتباط غير عكوس',
          'Thienopyridine؛ ارتباط غير عكوس',
          'Cyclopentyltriazolopyrimidine؛ ارتباط عكوس'
        ],
        [
          'الجرعة التحميلية (Loading)',
          '300 إلى 600 mg فموياً (600 mg للقسطرة الإسعافية)',
          '60 mg فموياً (بعد تحديد تشريح الشرايين التاجية)',
          '180 mg فموياً'
        ],
        [
          'جرعة الاستمرار (Maintenance)',
          '75 mg مرة واحدة يومياً',
          '10 mg مرة يومياً (5 mg إذا كان الوزن < 60 كغ)',
          '90 mg مرتين يومياً (تخفض إلى 60 mg بعد سنة)'
        ],
        [
          'الاستقلاب والتنشيط',
          'طليعة دواء: تحتاج مرحلتين كبديتين عبر CYP2C19',
          'طليعة دواء: استقلاب سريع بمرحلة واحدة',
          'دواء فعال مباشرة دون حاجة لتنشيط كبدي'
        ],
        [
          'الموانع والتحذيرات الصارمة',
          'نزف فعال؛ ضعف الاستقلاب الجيني',
          'سكتة دماغية أو نقص تروية عابر سابق (Stroke/TIA)',
          'نزف داخل القحف سابق، نزف فعال، قصور كبدي شديد'
        ],
        [
          'فترة الإيقاف قبل CABG',
          'إيقاف قبل 5 أيام على الأقل',
          'إيقاف قبل 7 أيام على الأقل',
          'إيقاف قبل 3 إلى 5 أيام على الأقل'
        ],
        [
          'الآثار الجانبية الشائعة',
          'نزف، طفح جلدي',
          'زيادة ملحوظة في خطر النزف الشديد والقاتل',
          'ضيق تنفس عابر (Dyspnea)، توقفات بطينية، ارتفاع حمض اليوريك'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'accp-acs-sec1',
      number: '1.0',
      heading: 'Plaque Rupture, Thrombosis, and Pathophysiologic Cascade',
      headingAr: 'تمزق اللويحة العصيدية، تشكل الخثرة، والفيزيولوجيا المرضية',
      evidenceGrade: 'AHA/ACC Guideline Review',
      body: `Acute coronary syndromes (ACS) encompass a spectrum of clinical conditions resulting from acute disruption of an atherosclerotic coronary plaque. The cascade initiates when a thin, fibrous cap overlying a lipid-rich core ruptures or erodes, exposing subendothelial collagen and von Willebrand factor (vWF) to circulating platelets.

Platelet Activation and Aggregation Cascade:
1. Adhesion: Circulating platelets adhere to exposed collagen via Glycoprotein (GP) Ia/IIa and Ib/IX receptors mediated by vWF.
2. Activation and Secretion: Adhesion triggers intracellular signal transduction, resulting in shape change and release of dense granules and alpha-granules containing adenosine diphosphate (ADP), thromboxane A2 (TxA2), and serotonin. ADP binds to platelet surface P2Y1 and P2Y12 purinergic G-protein-coupled receptors. P2Y12 activation inhibits adenylyl cyclase, lowering cyclic adenosine monophosphate (cAMP) and driving sustained platelet activation.
3. Aggregation (The Final Common Pathway): Intraplatelet signaling alters the conformation of the Glycoprotein IIb/IIIa surface receptor, converting it into a high-affinity binding state. Divalent fibrinogen molecules bridge adjacent GP IIb/IIIa receptors across multiple platelets, assembling a dense, friable white platelet thrombus.
4. Coagulation Cascade Coupling: Concurrently, exposed tissue factor (TF) complexes with Factor VIIa, initiating the extrinsic coagulation cascade to generate thrombin (Factor IIa). Thrombin cleaves fibrinogen into insoluble fibrin strands, entrapping red blood cells and stabilizing the red occlusive thrombus.`
    },
    {
      id: 'accp-acs-sec2',
      number: '2.0',
      heading: 'Clinical Presentation, ECG Differentiation, and Biomarker Kinetics',
      headingAr: 'المظاهر السريرية، تخطيط القلب (ECG)، وحركية التروبونين الحساس',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `Clinical presentation is classically characterized by acute substernal chest discomfort described as crushing, heaviness, or burning radiating to the left arm, neck, jaw, or epigastrium, frequently accompanied by diaphoresis, dyspnea, nausea, and lightheadedness. Atypical presentations (angina equivalents) are prevalent among female patients, older adults (age >= 75), and diabetic individuals with autonomic neuropathy.

Electrocardiographic (ECG) Stratification (Within 10 Minutes of Medical Contact):
- ST-Segment Elevation MI (STEMI): New ST-segment elevation at the J-point in >= 2 contiguous leads:
  * Leads V2-V3: >= 2.5 mm in men < 40; >= 2.0 mm in men >= 40; >= 1.5 mm in women regardless of age.
  * Other leads: >= 1.0 mm.
  * Presumed new left bundle branch block (LBBB) or isolated posterior infarction (ST depression in V1-V3 with tall R waves and upright T waves).
  * Direct Emergency Reperfusion Mandate: Immediate percutaneous coronary intervention (door-to-balloon time < 90 minutes) or fibrinolytic therapy within 30 minutes if primary PCI cannot be accomplished within 120 minutes of first medical contact.
- Non-ST-Segment Elevation ACS (NSTE-ACS): Transient ST depressions (>= 0.5 mm), dynamic T-wave inversions (>= 1.0 mm), or normal ECG. 
  * Differentiating NSTEMI from Unstable Angina: NSTEMI demonstrates objective evidence of myocardial necrosis with cardiac troponin elevation above the 99th percentile upper reference limit. Unstable angina presents with classic ischemic symptoms without troponin elevation.

High-Sensitivity Cardiac Troponin (hs-cTnI / hs-cTnT):
High-sensitivity assays detect picogram quantities of myocardial necrosis. Accelerated 0/1-hour or 0/2-hour diagnostic algorithms rapidly rule in or rule out acute myocardial infarction based on absolute baseline values and delta kinetic shifts.`
    },
    {
      id: 'accp-acs-sec3',
      number: '3.0',
      heading: 'Acute Antiplatelet Protocols: Aspirin & P2Y12 Receptor Antagonists',
      headingAr: 'بروتوكولات مضادات الصفيحات الحادة: الأسبرين ومثبطات P2Y12',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `DUAL ANTIPLATELET THERAPY (DAPT):
Every patient presenting with suspected ACS must receive immediate DAPT consisting of non-enteric coated chewable aspirin plus a potent oral P2Y12 receptor antagonist.

1. Aspirin Regimen:
- Initial Loading Dose: 162 mg to 325 mg non-enteric coated tablets, chewed and swallowed immediately to achieve rapid buccal and gastric absorption within 15 minutes.
- Maintenance Dose: 81 mg PO once daily continued indefinitely. Higher chronic maintenance doses (325 mg daily) do not confer additional ischemic protection but drastically increase major gastrointestinal hemorrhage.

2. P2Y12 Receptor Inhibitor Selection and Dosing:
- Ticagrelor (Brilinta): Direct-acting, reversible cyclopentyltriazolopyrimidine. 
  * Dose: 180 mg PO loading dose, followed by 90 mg PO twice daily.
  * Superiority: The PLATO trial demonstrated that Ticagrelor reduced cardiovascular death and myocardial infarction compared to clopidogrel without an increase in overall fatal bleeding.
  * Maintenance Constraint: Co-administered aspirin must not exceed 81 mg daily.
  * Adverse Effect: Self-limiting dyspnea occurs in 10-15% of patients (due to inhibition of adenosine reuptake); usually resolves within weeks without causing bronchospasm.
- Prasugrel (Effient): Potent third-generation thienopyridine.
  * Dose: 60 mg PO loading dose, followed by 10 mg PO once daily (5 mg daily if body weight < 60 kg).
  * Timing: In NSTE-ACS, Prasugrel should be administered ONLY after coronary angiography has established suitable anatomy for PCI (ACCOAST trial demonstrated increased bleeding without ischemic benefit if pretreated before catheterization). In STEMI undergoing primary PCI, it may be administered immediately.
  * Absolute Contraindication: Prior stroke or TIA.
- Clopidogrel (Plavix): Second-generation thienopyridine prodrug.
  * Dose: 600 mg PO loading dose, followed by 75 mg PO once daily.
  * Indications: Reserved for patients requiring oral anticoagulation, patients with contraindications or intolerance to Ticagrelor/Prasugrel, patients undergoing fibrinolysis for STEMI (load with 300 mg if age <= 75; no loading dose if age > 75), or when financial barriers preclude newer agents.`
    },
    {
      id: 'accp-acs-sec4',
      number: '4.0',
      heading: 'Parenteral Anticoagulant Strategies (UFH, Enoxaparin, Bivalirudin)',
      headingAr: 'استراتيجيات مضادات التخثر الوريدية (UFH، Enoxaparin، Bivalirudin)',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `Parenteral anticoagulation is mandatory for all patients with ACS to halt propagation of the coronary thrombus and support catheter-based interventions.

1. Unfractionated Heparin (UFH):
- Dose: Weight-based IV bolus of 60 units/kg (maximum 4000 units), followed by an initial continuous IV infusion of 12 units/kg/hr (maximum 1000 units/hr).
- Monitoring: Titrate to target activated partial thromboplastin time (aPTT) of 1.5 to 2.0 times control (typically 50-70 seconds) or anti-Factor Xa level of 0.3-0.7 units/mL. If proceeding to PCI without GP IIb/IIIa inhibitors, titrate to target activated clotting time (ACT) of 250-300 seconds.
- Clinical Advantages: Rapid onset, short half-life (60-90 minutes), and complete reversibility with protamine sulfate.

2. Enoxaparin (Low Molecular Weight Heparin - LMWH):
- NSTE-ACS Dosing: 1 mg/kg subcutaneously every 12 hours.
- Severe Renal Impairment Adjustment: If CrCl < 30 mL/min, reduce dose to 1 mg/kg subcutaneously every 24 hours.
- Transitioning to PCI: If the last subcutaneous dose was administered within 8 hours prior to balloon inflation, no additional anticoagulant is required. If administered 8-12 hours prior, administer an IV booster of 0.3 mg/kg.
- Superiority: Proven in SYNERGY and ATOLL trials with superior anti-Factor Xa predictability and reduced need for laboratory monitoring compared to UFH.

3. Bivalirudin:
- Direct thrombin inhibitor. Recommended primarily for patients with a documented history of Heparin-Induced Thrombocytopenia (HIT) or those at excessively high bleeding risk. Dose: 0.75 mg/kg IV bolus followed by 1.75 mg/kg/hr infusion during PCI.`
    },
    {
      id: 'accp-acs-sec5',
      number: '5.0',
      heading: 'High-Intensity Statin Therapy and Plaque Stabilization',
      headingAr: 'العلاج بالستاتينات عالية الشدة وتثبيت اللويحات العصيدية',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `Every patient with ACS must be initiated on high-intensity HMG-CoA reductase inhibitor (statin) therapy as early as possible after presentation, regardless of baseline LDL cholesterol levels (PROVE-IT TIMI 22 trial).

Approved High-Intensity Statin Regimens:
- Atorvastatin: 80 mg PO once daily (40 mg daily may be utilized if intolerant to 80 mg).
- Rosuvastatin: 40 mg PO once daily (20 mg daily if high risk for myopathy).

Mechanisms Beyond Lipid Lowering (Pleiotropic Effects):
1. Endothelial Nitric Oxide Synthase (eNOS) upregulation, restoring microvascular endothelial vasodilatory tone within 24 to 48 hours.
2. Suppression of macrophage metalloproteinase secretion, thickening the fibrous plaque cap and preventing recurrent rupture.
3. Inhibition of platelet activation and reduction in systemic inflammatory biomarkers (high-sensitivity C-reactive protein - hsCRP).

Lipid Goals & Add-On Therapies:
- Goal: Achieve an LDL-C reduction of >= 50% from baseline and an absolute LDL-C level < 55 mg/dL.
- Reassess fasting lipid panel at 4 to 12 weeks.
- If LDL-C remains >= 55 mg/dL despite maximally tolerated statin therapy, add Ezetimibe 10 mg PO daily (IMPROVE-IT trial). If LDL-C remains elevated in very high-risk patients, add a PCSK9 inhibitor (Evolocumab or Alirocumab).`
    },
    {
      id: 'accp-acs-sec6',
      number: '6.0',
      heading: 'Special Populations: Triple vs Double Therapy in AFib Undergoing PCI',
      headingAr: 'الحالات الخاصة: العلاج الثلاثي مقابل الثنائي عند مرضى الرجفان الأذيني والقسطرة',
      evidenceGrade: 'ACC/AHA / ESC Class I, LOE A',
      body: `Approximately 6% to 8% of patients undergoing percutaneous coronary intervention (PCI) possess a concomitant indication for chronic oral anticoagulation, most commonly nonvalvular atrial fibrillation. 

THE HEMORRHAGIC DILEMMA:
Combining full oral anticoagulation with dual antiplatelet therapy ("Triple Therapy": Oral Anticoagulant + Aspirin + P2Y12 inhibitor) causes a 3- to 4-fold increase in major bleeding episodes, intracranial hemorrhage, and fatal bleeding complications.

CURRENT CONSENSUS GUIDELINES (Double Therapy as Standard of Care):
Landmark randomized clinical trials (PIONEER AF-PCI, RE-DUAL PCI, AUGUSTUS, ENTRUST-AF PCI) established that "Double Therapy" (a Direct Oral Anticoagulant [DOAC] plus a single antiplatelet agent) significantly reduces major bleeding without increasing recurrent ischemic events or stent thrombosis compared with triple therapy.

Double Therapy Protocol:
1. Hospital Stay: Triple therapy (DOAC + Aspirin 81 mg + Clopidogrel 75 mg) may be administered during the periprocedural period and initial hospital stay (up to hospital discharge or maximum 1 to 4 weeks only in patients with exceptionally high thrombotic/ischemic risk).
2. At Hospital Discharge: Aspirin is DISCONTINUED.
3. Outpatient Maintenance: Continue DOAC at standard stroke-prevention doses + Clopidogrel 75 mg once daily for up to 12 months.
4. Selection of Antiplatelet: Clopidogrel 75 mg daily is the MANDATED antiplatelet of choice. Ticagrelor is discouraged due to substantial bleeding penalties, and Prasugrel is strictly avoided in combination with oral anticoagulants.
5. After 12 Months Post-PCI: Discontinue Clopidogrel; continue the DOAC as monotherapy indefinitely for chronic stroke prevention.`
    },
    {
      id: 'accp-acs-sec7',
      number: '7.0',
      heading: 'Board Review Pearls, Reversal Strategies, and High-Yield Pitfalls',
      headingAr: 'لآلئ مراجعة البورد، استراتيجيات العكس، وفخاخ الأسئلة عالية العائد',
      evidenceGrade: 'Board Examination Synthesis',
      body: `1. Reversal of Antithrombotics in Catastrophic Bleeding:
   - Heparin: Protamine sulfate (1 mg reverses 100 units of heparin; max single dose 50 mg).
   - Enoxaparin: Protamine sulfate (1 mg per 1 mg of enoxaparin administered within past 8 hours; neutralizes ~60% of anti-Xa activity).
   - Apixaban / Rivaroxaban: Andexanet alfa or 4-Factor Prothrombin Complex Concentrate (4F-PCC: Kcentra) 50 units/kg IV.
   - Dabigatran: Idarucizumab (Praxbind) 5 grams IV (administered as two 2.5g boluses).
   - Platelet Transfusions for Antiplatelet Bleeding: Transfused platelets are ineffective in reversing Ticagrelor because circulating active drug inhibits newly transfused platelets. Platelets should not be routinely transfused unless life-threatening hemorrhage occurs under irreversible thienopyridine (Clopidogrel/Prasugrel) blockade.

2. Proton Pump Inhibitor (PPI) Co-therapy:
   - Routine prophylactic PPI co-prescription (e.g., Pantoprazole 40 mg daily) is recommended for patients on DAPT with risk factors for gastrointestinal bleeding (history of GI bleed, age >= 65, concurrent anticoagulants, steroids, or NSAIDs).
   - Avoid Omeprazole and Esomeprazole with Clopidogrel due to competitive CYP2C19 inhibition; Pantoprazole has the lowest CYP2C19 inhibitory potential.

3. Morphine vs Fentanyl:
   - Intravenous Morphine delays gastric emptying and significantly impairs intestinal absorption and antiplatelet onset of oral P2Y12 inhibitors (CRUSH and IMPRESSION trials). IV Fentanyl or sublingual nitroglycerin are preferred for persistent ischemic pain.`
    }
  ]
};

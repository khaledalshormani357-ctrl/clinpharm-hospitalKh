import { VerbatimChapter } from '../libraryTypes';

export const accpCardiology2026Chapters: VerbatimChapter[] = [
  {
    id: 'accp-cardio-2026-ch1-adhf-shock',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 1,
    title: 'BCCP Ch. 1: Acute Decompensated Heart Failure (ADHF), Nohria-Stevenson Hemodynamic Quadrants & Cardiogenic Shock',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 1): قصور القلب الحاد غير المعاوض، مربعات هيموديناميكا Nohria-Stevenson، والصدمة القلبية',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-1 to 1-74',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-001-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-ch1-adhf-shock',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 1: Acute Decompensated Heart Failure & Cardiogenic Shock.',
    isVerbatimSource: true,
    learningObjectives: [
      'Classify Acute Decompensated Heart Failure (ADHF) patients into Nohria-Stevenson hemodynamic profiles (Subsets I–IV) using pulmonary capillary wedge pressure (PCWP) and cardiac index (CI).',
      'Design intravenous loop diuretic escalation and sequential nephron blockade protocols according to the DOSE and ADVOR trials.',
      'Select inotropic versus vasopressor support (Milrinone vs Dobutamine vs Norepinephrine) in SCAI Stage C–E Cardiogenic Shock.'
    ],
    toc: [
      { id: 'bccp-c1-s1', number: '1.1', title: 'Nohria-Stevenson Hemodynamic Subsets & Invasive Swan-Ganz Targets' },
      { id: 'bccp-c1-s2', number: '1.2', title: 'Intravenous Decongestion (DOSE Trial) & Sequential Nephron Blockade (ADVOR)' },
      { id: 'bccp-c1-s3', number: '1.3', title: 'Cardiogenic Shock Pharmacology: Milrinone vs Dobutamine & Norepinephrine' }
    ],
    sections: [
      {
        id: 'bccp-c1-s1',
        number: '1.1',
        heading: 'Nohria-Stevenson Hemodynamic Subsets & Invasive Swan-Ganz Targets',
        headingAr: 'المربعات الهيموديناميكية لـ Nohria-Stevenson وأهداف قسطرة الشريان الرئوي',
        evidenceGrade: 'ACC/AHA/HFSA Class I, Level B',
        body: `Patients hospitalized with Acute Decompensated Heart Failure (ADHF) are stratified into four clinical and invasive hemodynamic quadrants based on Volume Status (Congestion: PCWP <=18 mmHg [Dry] vs >18 mmHg [Wet]) and Perfusion Status (Cardiac Index >=2.2 L/min/m² [Warm] vs <2.2 L/min/m² [Cold]):
• Subset I — Warm and Dry (PCWP <=18 mmHg, CI >=2.2 L/min/m²): Compensated euvolemic state. Optimize oral 4-Pillar Guideline-Directed Medical Therapy (GDMT).
• Subset II — Warm and Wet (PCWP >18 mmHg, CI >=2.2 L/min/m²): Accounts for ~70–80% of ADHF admissions. Characterized by pulmonary/systemic venous congestion with preserved systemic perfusion. Primary therapy is aggressive IV Loop Diuretics ± IV Vasodilators (Nitroglycerin or Nitroprusside if SBP >110 mmHg). Continue chronic oral Beta-blockers and GDMT unless hemodynamic instability ensues.
• Subset III — Cold and Dry (PCWP <=18 mmHg, CI <2.2 L/min/m²): Hypoperfusion without pulmonary congestion. Perform a cautious fluid challenge (250 mL isotonic crystalloid bolus) if PCWP <15 mmHg; if hypoperfusion persists despite adequate filling pressure, initiate an IV Inotrope.
• Subset IV — Cold and Wet (PCWP >18 mmHg, CI <2.2 L/min/m²): Cardiogenic shock / severe low-output state with congestion (~15% of admissions; highest inpatient mortality). Hold negative inotropes (Beta-blockers) and initiate IV Vasopressors (Norepinephrine if SBP <85–90 mmHg) and/or IV Inotropes (Dobutamine or Milrinone) alongside IV Loop Diuretics once perfusion pressure is restored.`
      },
      {
        id: 'bccp-c1-s2',
        number: '1.2',
        heading: 'Intravenous Decongestion (DOSE Trial) & Sequential Nephron Blockade (ADVOR)',
        headingAr: 'إزالة الاحتقان الوريدي (دراسة DOSE) والحصار الكلوي المتسلسل (دراسة ADVOR)',
        evidenceGrade: 'ACC/AHA Class I, Level A',
        body: `1. Initial Intravenous Loop Diuretic Conversion & DOSE Trial Strategy:
Oral Furosemide exhibits erratic, variable bioavailability (10–90%, averaging ~50%) that worsens during bowel wall edema in ADHF. By contrast, oral Torsemide and Bumetanide maintain 80–100% oral bioavailability.
• Loop Diuretic Potency Equivalence: Furosemide 40 mg PO = Furosemide 20 mg IV = Torsemide 20 mg PO/IV = Bumetanide 1 mg PO/IV.
• DOSE Trial High-Dose Protocol: Administer an initial IV Furosemide dose equal to 1.0 to 2.5 times the patient's total daily home oral Furosemide dose (e.g., home Furosemide 80 mg PO BID = 160 mg/day -> give 160 to 400 mg IV/day divided q12h or continuous IV infusion). High-dose strategy (2.5× home dose) achieves faster dyspnea relief and net fluid loss; transient rises in Serum Creatinine up to 0.3–0.5 mg/dL during active decongestion represent hemoconcentration rather than true tubular injury and must NOT prompt premature diuretic discontinuation.

2. Diuretic Resistance & Sequential Nephron Blockade:
• Check spot Urine Sodium (UNa) 2 hours after the first IV loop diuretic dose (target UNa >50–70 mEq/L) and hourly urine output (target >100–150 mL/h over the first 6 hours).
• If diuresis is inadequate after doubling the IV loop diuretic dose, add a distal convoluted tubule thiazide (Metolazone 2.5–5 mg PO 30 minutes prior to IV loop diuretic, or Chlorothiazide 500 mg IV) OR a carbonic anhydrase inhibitor in the proximal tubule (Acetazolamide 500 mg IV once daily for 3 days per the landmark ADVOR trial, particularly when serum HCO3- >=27 mEq/L).`
      },
      {
        id: 'bccp-c1-s3',
        number: '1.3',
        heading: 'Cardiogenic Shock Pharmacology: Milrinone vs Dobutamine & Norepinephrine',
        headingAr: 'الفارماكولوجيا السريرية للصدمة القلبية: مقارنة Milrinone و Dobutamine و Norepinephrine',
        evidenceGrade: 'AHA/ACC Cardiogenic Shock Consensus',
        body: `1. Selecting Between Dobutamine and Milrinone (DOREMI Trial):
• Dobutamine (0.5–20 mcg/kg/min IV; t1/2 = 2 minutes): Beta-1 and Beta-2 adrenergic receptor agonist. Preferred in patients with acute kidney injury (hepatically/tissularly metabolized via COMT) or borderline blood pressure.
• Milrinone (0.125–0.5 mcg/kg/min IV; t1/2 = 2.5 hours in normal renal function, prolonged up to 6–12 hours in AKI): Phosphodiesterase-3 (PDE-3) inhibitor that elevates intracellular cAMP independently of Beta-1 receptors. Milrinone is PREFERRED over Dobutamine in patients maintained on chronic Beta-Blockers (especially non-selective Carvedilol) and in patients with severe Pulmonary Hypertension / Right Ventricular failure due to potent pulmonary arterial vasodilation. Omit the Milrinone loading bolus in hypotensive patients, and reduce maintenance rate by 50% when CrCl <30 mL/min.
2. First-Line Vasopressor in Cardiogenic Shock (SOAP-II Trial):
Norepinephrine (0.02–1.0 mcg/kg/min) is strictly preferred over Dopamine in cardiogenic shock; Dopamine significantly increases 28-day mortality and tachyarrhythmias.`
      }
    ],
    quickTables: [
      {
        title: 'Nohria-Stevenson Hemodynamic Quadrants & Pharmacologic Interventions',
        titleAr: 'جدول المربعات الهيموديناميكية لقصور القلب الحاد والخطة الدوائية',
        headers: ['Hemodynamic Subset', 'PCWP & Cardiac Index', 'Clinical Presentation', 'Primary Pharmacotherapy'],
        rows: [
          ['Subset I (Warm & Dry)', 'PCWP <=18 mmHg | CI >=2.2', 'Euvolemic & well-perfused', 'Initiate / titrate oral 4-Pillar GDMT'],
          ['Subset II (Warm & Wet)', 'PCWP >18 mmHg | CI >=2.2', 'Pulmonary/peripheral edema, warm extremities', 'IV Loop Diuretic (2.5× home PO dose) ± IV Nitroglycerin'],
          ['Subset III (Cold & Dry)', 'PCWP <=18 mmHg | CI <2.2', 'Cool extremities, narrow pulse pressure, no rales', 'Cautious 250 mL fluid bolus; Inotrope if CI remains <2.2'],
          ['Subset IV (Cold & Wet)', 'PCWP >18 mmHg | CI <2.2', 'Cardiogenic shock + pulmonary congestion', 'Hold Beta-blocker; start Norepinephrine (if SBP <90) + Milrinone/Dobutamine + IV Diuretic']
        ]
      }
    ],
    boardPearls: [
      'Milrinone acts downstream of the Beta-1 receptor by inhibiting PDE-3; therefore, Milrinone retains full inotropic efficacy in patients taking chronic Carvedilol or Metoprolol.',
      'Milrinone is 85% renally excreted unchanged — omit the loading dose and start at 0.125 mcg/kg/min in patients with CrCl <30 mL/min to prevent profound refractory hypotension.',
      'Dopamine is contraindicated as first-line vasopressor in cardiogenic shock due to higher arrhythmic mortality compared to Norepinephrine (SOAP-II Trial).'
    ],
    boardPearlsAr: [
      'يعمل Milrinone عبر تثبيط PDE-3 بعد مستقبلات بيتا؛ لذا يحتفظ بكامل فعاليته لدى المرضى الذين يتناولون حاصرات بيتا المزمنة.',
      'يطرح Milrinone بنسبة 85% عبر الكلى؛ لذا يجب إلغاء الجرعة التحميلية وتخفيض الصيانة إلى 0.125 مكغ/كجم/دقيقة في القصور الكلوي.',
      'يُفضل Norepinephrine كخط أول في الصدمة القلبية بدلاً من Dopamine لخفض الوفيات واضطرابات النظم.'
    ],
    keywords: ['adhf', 'cardiogenic shock', 'nohria-stevenson', 'milrinone', 'dobutamine', 'furosemide', 'dose trial', 'advor', 'acetazolamide']
  },
  {
    id: 'accp-cardio-2026-ch2-chronic-hf',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 2,
    title: 'BCCP Ch. 2: Chronic Heart Failure (HFrEF, HFmrEF, HFpEF) & 4-Pillar GDMT Sequencing',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 2): قصور القلب المزمن (HFrEF, HFpEF) وتدريج الركائز الأربع (4-Pillar GDMT)',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-75 to 1-148',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-002-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-ch2-chronic-hf',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 2: Chronic Heart Failure.',
    isVerbatimSource: true,
    learningObjectives: [
      'Initiate and titrate the four foundational mortality-reducing pillars of HFrEF (ARNI, Evidence-Based Beta-Blocker, MRA, and SGLT2 Inhibitor) to target clinical trial doses.',
      'Apply secondary HFrEF therapies (Hydralazine/Isosorbide Dinitrate, Ivabradine, Vericiguat, Digoxin, Intravenous Iron) based on specific phenotypic criteria.',
      'Optimize pharmacotherapy in HFmrEF (LVEF 41–49%) and HFpEF (LVEF >=50%) anchored by SGLT2 Inhibitors and Finerenone/Spironolactone.'
    ],
    toc: [
      { id: 'bccp-c2-s1', number: '2.1', title: 'Target Doses & Washout Rules of the 4 Foundational HFrEF Pillars' },
      { id: 'bccp-c2-s2', number: '2.2', title: 'Targeted Adjuncts: Hydralazine-ISDN, Ivabradine, Vericiguat & IV Iron' },
      { id: 'bccp-c2-s3', number: '2.3', title: 'HFmrEF & HFpEF Evidence-Based Pharmacotherapy (EMPEROR-Preserved & DELIVER)' }
    ],
    sections: [
      {
        id: 'bccp-c2-s1',
        number: '2.1',
        heading: 'Target Doses & Washout Rules of the 4 Foundational HFrEF Pillars',
        headingAr: 'الجرعات القياسية وقواعد الغسيل الدوائي للركائز الأربع في HFrEF',
        evidenceGrade: 'ACC/AHA/HFSA Class I, Level A',
        body: `Simultaneous or rapid-sequence initiation (within 2 to 4 weeks, ideally prior to hospital discharge per the STRONG-HF trial) of all four foundational classes reduces all-cause mortality by >60% in HFrEF (LVEF <=40%):
1. ARNI (Preferred First-Line) or ACEi/ARB:
   - Sacubitril/Valsartan (Entresto): Start 49/51 mg PO BID (or 24/26 mg PO BID if naive to ACEi/ARB, eGFR <30 mL/min, or moderate hepatic impairment); titrate every 2–4 weeks to target 97/103 mg PO BID (PARADIGM-HF, PIONEER-HF). Mandatory 36-hour washout when switching from any ACE inhibitor (no washout required when switching from an ARB).
2. Evidence-Based Beta-Blockers (ONLY 3 Proven Agents):
   - Carvedilol: Start 3.125 mg PO BID -> Target 25 mg PO BID (50 mg PO BID if weight >85 kg).
   - Metoprolol Succinate CR/XL: Start 12.5–25 mg PO once daily -> Target 200 mg PO once daily (Metoprolol Tartrate immediate-release is NOT an evidence-based HFrEF beta-blocker).
   - Bisoprolol: Start 1.25 mg PO once daily -> Target 10 mg PO once daily.
3. Mineralocorticoid Receptor Antagonists (MRA):
   - Spironolactone or Eplerenone: Start 12.5–25 mg PO once daily -> Target 25–50 mg PO once daily. Requires baseline Serum K+ <5.0 mEq/L and eGFR >30 mL/min/1.73m².
4. SGLT2 Inhibitors (Irrespective of Diabetes Status):
   - Dapagliflozin 10 mg PO once daily (eGFR >=20 mL/min) or Empagliflozin 10 mg PO once daily (eGFR >=20 mL/min). Requires no dose titration.`
      },
      {
        id: 'bccp-c2-s2',
        number: '2.2',
        heading: 'Targeted Adjuncts: Hydralazine-ISDN, Ivabradine, Vericiguat & IV Iron',
        headingAr: 'الأدوية التكميلية الموجهة: Hydralazine-ISDN، Ivabradine، Vericiguat، والحديد الوريدي',
        evidenceGrade: 'ACC/AHA Class I–IIa',
        body: `• Hydralazine + Isosorbide Dinitrate (H-ISDN): Class I recommendation for self-identified African American patients with NYHA Class III–IV HFrEF already on optimal 4-pillar GDMT (A-HeFT trial: start Hydralazine 37.5 mg + ISDN 20 mg PO TID -> Target Hydralazine 75 mg + ISDN 40 mg PO TID). Class IIb alternative in patients intolerant to both ACEi/ARB/ARNI due to bilateral renal artery stenosis or severe AKI/hyperkalemia.
• Ivabradine (If Channel Blocker): Indicated for symptomatic NYHA Class II–III HFrEF with LVEF <=35%, in Normal Sinus Rhythm with resting Heart Rate >=70 bpm despite maximally tolerated Beta-Blocker dose (SHIFT trial; start 5 mg PO BID, target HR 50–60 bpm). Contraindicated in Atrial Fibrillation.
• Vericiguat (Soluble Guanylate Cyclase Stimulator): Indicated to reduce HF hospitalization following recent HF worsening in patients with LVEF <45% (VICTORIA trial; start 2.5 mg PO daily -> target 10 mg PO daily).
• Intravenous Iron Replacement (Ferric Carboxymaltose or Ferric Derisomaltose): Indicated in HFrEF with iron deficiency (Serum Ferritin <100 ng/mL, OR Ferritin 100–299 ng/mL with Transferrin Saturation [TSAT] <20%) to improve functional capacity and reduce HF hospitalizations (AFFIRM-AHF, IRONMAN). Oral iron (Ferrous sulfate) is ineffective in HFrEF (IRONOUT HF trial) due to hepcidin-mediated blockade of duodenal ferroportin.`
      },
      {
        id: 'bccp-c2-s3',
        number: '2.3',
        heading: 'HFmrEF & HFpEF Evidence-Based Pharmacotherapy (EMPEROR-Preserved & DELIVER)',
        headingAr: 'العلاج الدوائي لقصور القلب مع كفاءة ضخ محفوظة (HFpEF) ومتوسطة (HFmrEF)',
        evidenceGrade: 'ACC/AHA Class 2a, Level A',
        body: `In Heart Failure with Preserved Ejection Fraction (HFpEF, LVEF >=50%) and Mildly Reduced Ejection Fraction (HFmrEF, LVEF 41–49%):
• SGLT2 Inhibitors (Empagliflozin 10 mg daily [EMPEROR-Preserved] or Dapagliflozin 10 mg daily [DELIVER]) hold the highest level of recommendation (Class 2a, Level A) for reducing HF hospitalizations and cardiovascular death across the entire LVEF spectrum.
• Non-steroidal MRA Finerenone (FINEARTS-HF) or Spironolactone (TOPCAT) and ARNI (Sacubitril/Valsartan in PARAGON-HF, particularly in women and LVEF below normal) provide additional reductions in HF hospitalizations.`
      }
    ],
    quickTables: [
      {
        title: 'Secondary HFrEF Pharmacotherapy Eligibility Criteria',
        titleAr: 'جدول شروط استحقاق الأدوية التكميلية في قصور القلب (HFrEF)',
        headers: ['Medication', 'Specific Eligibility Criteria', 'Starting -> Target Dose', 'Contraindication / Pitfall'],
        rows: [
          ['Hydralazine + ISDN', 'Black patients NYHA III–IV on GDMT (Class I) or ACEi/ARB intolerance', '37.5/20 mg TID -> 75/40 mg TID', 'Drug-induced lupus, headache, hypotension'],
          ['Ivabradine', 'LVEF <=35% + Normal Sinus Rhythm + HR >=70 bpm on max Beta-blocker', '5 mg PO BID -> max 7.5 mg BID', 'Inactive/contraindicated in Atrial Fibrillation; causes phosphenes'],
          ['Intravenous Iron (FCM)', 'Ferritin <100 ng/mL OR (Ferritin 100–299 + TSAT <20%)', '750–1000 mg IV × 1–2 doses', 'Oral ferrous sulfate is NOT effective in HFrEF (IRONOUT trial)'],
          ['Digoxin', 'Persistent NYHA III–IV symptoms or AFib rate control in HFrEF', '0.125 mg PO OD (or q48h in CKD)', 'Target trough 0.5–0.9 ng/mL; toxicity worsened by hypokalemia']
        ]
      }
    ],
    boardPearls: [
      'Oral iron supplementation does not improve exercise capacity in HFrEF (IRONOUT-HF) because elevated inflammatory hepcidin blocks enterocyte iron absorption; use IV Ferric Carboxymaltose.',
      'Ivabradine selectively inhibits the SA nodal funny current (If) and has zero efficacy if the patient is in Atrial Fibrillation.',
      'Only three beta-blockers reduce mortality in HFrEF: Carvedilol, sustained-release Metoprolol Succinate, and Bisoprolol.'
    ],
    boardPearlsAr: [
      'الحديد الفموي غير فعال في مرضى قصور القلب بسبب ارتفاع الهيبسيدين؛ لذا يُستخدم الحديد الوريدي (Ferric Carboxymaltose).',
      'يعمل Ivabradine حصراً على العقدة الجيبية الأذينية (SA Node)؛ لذا يُمنع ولا يفيد في الرجفان الأذيني.',
      'حاصرات بيتا الثلاثة الوحيدة التي تخفض الوفيات في HFrEF هي: Carvedilol و Metoprolol Succinate و Bisoprolol.'
    ],
    keywords: ['hfref', 'hfpef', 'gdmt', 'entresto', 'dapagliflozin', 'empagliflozin', 'ivabradine', 'hydralazine', 'iv iron']
  },
  {
    id: 'accp-cardio-2026-arrhythmia-anticoag',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 3,
    title: 'BCCP Ch. 3: Atrial Fibrillation, Ventricular Arrhythmias & DOAC Renal/Interaction Matrix',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 3): الرجفان الأذيني، اضطرابات النظم البطينية، ومصفوفة جرعات وتداخلات مضادات التخثر (DOACs)',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-149 to 1-230',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-003-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-arrhythmia-anticoag',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 3: Arrhythmias & Stroke Prevention Anticoagulation.',
    isVerbatimSource: true,
    learningObjectives: [
      'Apply exact FDA/ACC/AHA dose-reduction criteria for Apixaban (2-of-3 ABC rule), Rivaroxaban, Dabigatran, and Edoxaban in nonvalvular atrial fibrillation.',
      'Manage pharmacokinetic interactions between DOACs and combined P-glycoprotein / CYP3A4 modulators (Amiodarone, Dronedarone, Verapamil, Diltiazem, Rifampin, Phenytoin).',
      'Execute dual vs triple antithrombotic de-escalation in patients with AFib undergoing PCI (AUGUSTUS, PIONEER AF-PCI, RE-DUAL PCI).'
    ],
    toc: [
      { id: 'bccp-c3-s1', number: '3.1', title: 'Direct Oral Anticoagulant (DOAC) Precision Renal Dosing Rules in AFib' },
      { id: 'bccp-c3-s2', number: '3.2', title: 'P-gp / CYP3A4 Drug Interactions & Valvular Contraindications' },
      { id: 'bccp-c3-s3', number: '3.3', title: 'AFib + PCI Dual Antithrombotic Therapy (AUGUSTUS Trial Paradigm)' }
    ],
    sections: [
      {
        id: 'bccp-c3-s1',
        number: '3.1',
        heading: 'Direct Oral Anticoagulant (DOAC) Precision Renal Dosing Rules in AFib',
        headingAr: 'القواعد الدقيقة لتعديل جرعات مضادات التخثر الفموية المباشرة (DOACs) في الرجفان الأذيني',
        evidenceGrade: 'ACC/AHA/ACCP/HRS Class I, Level A',
        body: `In patients with Nonvalvular Atrial Fibrillation and a CHA2DS2-VASc score >=2 in men or >=3 in women, Direct Oral Anticoagulants (DOACs) are recommended over Warfarin (Class I, Level A). All DOAC renal dosing trials utilized actual body weight Cockcroft-Gault Creatinine Clearance (CrCl):
1. Apixaban (Eliquis — ARISTOTLE Trial):
   - Standard Dose: 5 mg PO BID.
   - Reduced Dose (2.5 mg PO BID): Administer 2.5 mg PO BID ONLY if the patient meets AT LEAST 2 OF THE 3 "ABC" criteria:
     (A) Age >=80 years
     (B) Body weight <=60 kg
     (C) Serum Creatinine >=1.5 mg/dL
     (Or if patient is on chronic hemodialysis). Under-dosing Apixaban to 2.5 mg BID when only 1 criterion is present doubles thromboembolic stroke risk without reducing major bleeding!
2. Rivaroxaban (Xarelto — ROCKET-AF Trial):
   - CrCl >50 mL/min: 20 mg PO once daily with the evening meal (>=500 kcal required for 80–100% bioavailability of 15 mg and 20 mg tablets).
   - CrCl 15 to 50 mL/min: 15 mg PO once daily with the evening meal.
   - CrCl <15 mL/min: Avoid use.
3. Dabigatran (Pradaxa — RE-LY Trial):
   - CrCl >30 mL/min: 150 mg PO BID.
   - CrCl 15 to 30 mL/min: 75 mg PO BID.
   - CrCl <15 mL/min: Contraindicated. Store in original desiccant bottle; never crush or open capsules (opening increases bioavailability by 75% and causes major hemorrhage).
4. Edoxaban (Savaysa — ENGAGE AF-TIMI 48 Trial):
   - CrCl 51 to 95 mL/min: 60 mg PO once daily.
   - CrCl 15 to 50 mL/min: 30 mg PO once daily.
   - CrCl >95 mL/min: FDA Boxed Warning — CONTRAINDICATED in AFib when CrCl >95 mL/min due to rapid renal clearance and increased ischemic stroke rate compared to Warfarin.`
      },
      {
        id: 'bccp-c3-s2',
        number: '3.2',
        heading: 'P-gp / CYP3A4 Drug Interactions & Valvular Contraindications',
        headingAr: 'التداخلات الحركية عبر P-gp و CYP3A4 والموانع الصمامية المطلقة',
        evidenceGrade: 'FDA Prescribing Mandate',
        body: `• Valvular Heart Disease Contraindications: All DOACs are strictly CONTRAINDICATED in patients with Mechanical Prosthetic Heart Valves (RE-ALIGN, INVICTUS, PROACT Xa trials) and Moderate-to-Severe Rheumatic Mitral Stenosis. Warfarin (target INR 2.5 for mechanical aortic valve; INR 3.0 for mechanical mitral valve or rheumatic mitral stenosis) is mandatory.
• P-glycoprotein & CYP3A4 Interactions:
  - Apixaban and Rivaroxaban are substrates of BOTH P-gp and CYP3A4.
  - Dabigatran and Edoxaban are substrates of P-gp ONLY (not CYP3A4).
  - Strong Dual P-gp + CYP3A4 Inducers (Rifampin, Carbamazepine, Phenytoin, Phenobarbital, St. John's Wort): Avoid with all DOACs due to subtherapeutic levels and stroke/VTE failure.
  - Dronedarone or Systemic Ketoconazole + Dabigatran: Reduce Dabigatran to 75 mg PO BID if CrCl 30–50 mL/min, and avoid entirely if CrCl <30 mL/min.`
      },
      {
        id: 'bccp-c3-s3',
        number: '3.3',
        heading: 'AFib + PCI Dual Antithrombotic Therapy (AUGUSTUS Trial Paradigm)',
        headingAr: 'الجمع بين مضادات التخثر ومضادات الصفائح بعد القسطرة التاجية (دراسة AUGUSTUS)',
        evidenceGrade: 'ACC/AHA Class I, Level A',
        body: `In patients with Atrial Fibrillation undergoing Percutaneous Coronary Intervention (PCI) with stent placement, prolonged "Triple Therapy" (Oral Anticoagulant + Aspirin + P2Y12 Inhibitor) causes unacceptable rates of major bleeding.
• AUGUSTUS Trial Standard of Care: Discontinue Aspirin at hospital discharge (within 1 to 7 days post-PCI, or up to 30 days only in patients with very high stent thrombosis risk) and maintain Dual Antithrombotic Therapy consisting of:
  1. A DOAC (Apixaban 5 mg PO BID preferred over Warfarin) PLUS
  2. Clopidogrel 75 mg PO once daily (preferred over Ticagrelor or Prasugrel due to lower major bleeding) for 6 to 12 months, followed by DOAC monotherapy lifelong after 12 months.`
      }
    ],
    quickTables: [
      {
        title: 'Complete DOAC Dosing & Pharmacokinetic Matrix in Nonvalvular AFib',
        titleAr: 'المصفوفة المرجعية الكاملة لجرعات وحركية مضادات التخثر الفموية (DOACs) في الرجفان الأذيني',
        headers: ['DOAC Agent', 'Standard AFib Dose', 'Renal / Clinical Dose Reduction Rule', 'Metabolism & Critical Pearl'],
        rows: [
          ['Apixaban (Eliquis)', '5 mg PO BID', '2.5 mg PO BID ONLY if >=2 of 3: Age >=80, Weight <=60 kg, SCr >=1.5 mg/dL', '27% renal; P-gp + CYP3A4 substrate; lowest GI bleed risk'],
          ['Rivaroxaban (Xarelto)', '20 mg PO OD with dinner', '15 mg PO OD with dinner if CrCl 15–50 mL/min (avoid if <15)', '66% renal; P-gp + CYP3A4 substrate; MUST take with food'],
          ['Dabigatran (Pradaxa)', '150 mg PO BID', '75 mg PO BID if CrCl 15–30 mL/min (or CrCl 30–50 + Dronedarone)', '80% renal; P-gp substrate only; never crush/open capsules'],
          ['Edoxaban (Savaysa)', '60 mg PO OD', '30 mg PO OD if CrCl 15–50 mL/min; CONTRAINDICATED if CrCl >95 mL/min', '50% renal; P-gp substrate; boxed warning when CrCl >95']
        ]
      }
    ],
    boardPearls: [
      'Apixaban is reduced to 2.5 mg BID ONLY when >=2 of 3 criteria (Age >=80, Weight <=60 kg, SCr >=1.5) are met; a single isolated criterion (e.g., CrCl 32 mL/min with SCr 1.6 in a 72-year-old 75 kg patient) still requires the full 5 mg BID dose.',
      'Edoxaban is strictly contraindicated in nonvalvular AFib when CrCl exceeds 95 mL/min.',
      'After PCI in an AFib patient (AUGUSTUS trial), stop Aspirin at discharge and continue Apixaban + Clopidogrel (Dual Therapy).'
    ],
    boardPearlsAr: [
      'لا تُخفض جرعة Apixaban إلى 2.5 ملغ مرتين يومياً إلا بتحقق شرطين على الأقل من ثلاثة: (العمر >= 80، الوزن <= 60 كجم، الكرياتينين >= 1.5).',
      'يُمنع استخدام Edoxaban في الرجفان الأذيني إذا كانت تصفية الكرياتينين CrCl > 95 مل/دقيقة.',
      'بعد القسطرة التاجية لمريض رجفان أذيني (AUGUSTUS)، يُوقف الأسبرين عند التخريج ويُستمر بثنائية Apixaban + Clopidogrel.'
    ],
    keywords: ['doac', 'apixaban', 'rivaroxaban', 'dabigatran', 'edoxaban', 'augustus', 'atrial fibrillation', 'cha2ds2-vasc']
  },
  {
    id: 'accp-cardio-2026-ch4-lipids-htn',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 4,
    title: 'BCCP Ch. 4: Secondary Prevention, Dyslipidemia (PCSK9i, Inclisiran, Bempedoic Acid) & Resistant Hypertension',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 4): الوقاية الثانوية، اضطرابات الشحوم (الستاتين، PCSK9i، Bempedoic Acid)، والضغط المقاوم',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-231 to 1-298',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-004-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-ch4-lipids-htn',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 4: Dyslipidemia & Secondary Cardiovascular Prevention.',
    isVerbatimSource: true,
    learningObjectives: [
      'Prescribe high-intensity statin regimens and non-statin LDL-C lowering pathways (Ezetimibe, PCSK9 monoclonal antibodies, Inclisiran, Bempedoic acid) for very high-risk ASCVD.',
      'Manage statin-associated muscle symptoms (SAMS) and cytochrome P450 / OATP1B1 drug interactions (Simvastatin/Lovastatin + Amlodipine, Amiodarone, or Gemfibrozil).',
      'Indicate Icosapent Ethyl (REDUCE-IT) for residual hypertriglyceridemic cardiovascular risk.'
    ],
    toc: [
      { id: 'bccp-c4-s1', number: '4.1', title: 'High-Intensity Statins & Non-Statin LDL-C Thresholds (<55 mg/dL in Very High-Risk ASCVD)' },
      { id: 'bccp-c4-s2', number: '4.2', title: 'Statin Drug Interaction Ceilings & Bempedoic Acid / Icosapent Ethyl Pharmacology' }
    ],
    sections: [
      {
        id: 'bccp-c4-s1',
        number: '4.1',
        heading: 'High-Intensity Statins & Non-Statin LDL-C Thresholds (<55 mg/dL in Very High-Risk ASCVD)',
        headingAr: 'الستاتين عالي الشدة وأهداف الكوليسترول الضار (< 55 ملغ/دل) في خطورة ASCVD العالية جداً',
        evidenceGrade: 'ACC/AHA/ESC Class I, Level A',
        body: `Four Major Statin Benefit Groups:
1. Clinical ASCVD (ACS, prior MI, stable angina, coronary/arterial revascularization, ischemic stroke/TIA, PAD): High-Intensity Statin (Atorvastatin 40–80 mg PO daily or Rosuvastatin 20–40 mg PO daily) to achieve >=50% LDL-C reduction and an absolute LDL-C goal <55 mg/dL in very high-risk ASCVD (<70 mg/dL in high-risk ASCVD).
2. Severe Primary Hypercholesterolemia (Baseline LDL-C >=190 mg/dL): Immediately initiate High-Intensity Statin without calculating 10-year ASCVD risk.
3. Diabetes Mellitus (Age 40–75 years): At least Moderate-Intensity Statin; escalate to High-Intensity Statin if multiple ASCVD risk factors or 10-year risk >=20%.
4. Primary Prevention (Age 40–75 years, LDL-C 70–189 mg/dL, 10-year ASCVD risk >=7.5–20%): Moderate-to-High Intensity Statin guided by risk enhancers and Coronary Artery Calcium (CAC) scoring.

Stepwise Non-Statin Escalation in Very High-Risk ASCVD (when LDL-C remains >=55–70 mg/dL on maximally tolerated statin):
• Step 1: Add Ezetimibe 10 mg PO once daily (IMPROVE-IT trial; blocks intestinal NPC1L1 cholesterol transporter, providing an additional 18–25% LDL-C reduction).
• Step 2: Add a PCSK9 Monoclonal Antibody—Evolocumab 140 mg SC every 2 weeks (FOURIER) or Alirocumab 75–150 mg SC every 2 weeks (ODYSSEY OUTCOMES)—or Inclisiran 284 mg SC at Day 0, Month 3, and every 6 months (small interfering RNA inhibiting hepatic PCSK9 translation), achieving an additional 50–60% LDL-C reduction.
• Step 3 (Statin-Intolerant Patients): Bempedoic Acid 180 mg PO once daily (CLEAR Outcomes trial; ATP citrate lyase inhibitor prodrug activated exclusively in the liver by ACSVL1, which is absent in skeletal muscle, thereby avoiding myopathy).`
      },
      {
        id: 'bccp-c4-s2',
        number: '4.2',
        heading: 'Statin Drug Interaction Ceilings & Bempedoic Acid / Icosapent Ethyl Pharmacology',
        headingAr: 'الحدود القصوى لتداخلات الستاتين وفارماكولوجيا Bempedoic Acid و Icosapent Ethyl',
        evidenceGrade: 'FDA Safety Mandate',
        body: `• Statin Metabolism & CYP3A4 / OATP1B1 Interactions:
  - Simvastatin, Lovastatin, and Atorvastatin are metabolized by CYP3A4.
  - Rosuvastatin (CYP2C9 minor), Pravastatin (sulfation), and Pitavastatin have minimal CYP3A4 metabolism.
  - Gemfibrozil is STRICTLY CONTRAINDICATED with Simvastatin and Lovastatin (and should be avoided with all statins) because Gemfibrozil potently inhibits OATP1B1 hepatic uptake and glucuronidation, causing severe rhabdomyolysis. If a fibrate must be combined with a statin, use Fenofibrate.
  - Simvastatin Maximum Daily Dose Ceilings: Max 20 mg/day with Amlodipine, Ranolazine, or Amiodarone; Max 10 mg/day with Verapamil or Diltiazem; Contraindicated with Cyclosporine, Danazol, Gemfibrozil, or strong CYP3A4 inhibitors (Clarithromycin, Itraconazole, HIV protease inhibitors).
• Bempedoic Acid Adverse Effects: Increases serum uric acid (gout flares) and tendon rupture risk; requires reducing Simvastatin to <=20 mg/day and Pravastatin to <=40 mg/day.
• Hypertriglyceridemia & Icosapent Ethyl (REDUCE-IT Trial): In patients with established ASCVD (or Diabetes + >=2 risk factors) on maximally tolerated statin with fasting Triglycerides 135–499 mg/dL, Icosapent Ethyl (highly purified EPA) 2 g PO BID with food reduces major adverse cardiovascular events by 25%.`
      }
    ],
    quickTables: [
      {
        title: 'High-Intensity vs Moderate-Intensity Statin Regimens & Interaction Limits',
        titleAr: 'جدول جرعات الستاتين عالي ومتوسط الشدة وحدود التداخلات الدوائية',
        headers: ['Intensity Tier', 'Approved Regimens', 'Expected LDL-C Reduction', 'Key Interaction Ceiling'],
        rows: [
          ['High-Intensity Statin', 'Atorvastatin 40–80 mg OD | Rosuvastatin 20–40 mg OD', '>= 50% reduction', 'Cyclosporine: Max Rosuvastatin 5 mg OD; avoid Atorvastatin'],
          ['Moderate-Intensity Statin', 'Atorvastatin 10–20 mg | Rosuvastatin 5–10 mg | Simvastatin 20–40 mg | Pravastatin 40–80 mg', '30% to 49% reduction', 'Simvastatin max 20 mg with Amlodipine/Amiodarone; max 10 mg with Diltiazem/Verapamil'],
          ['Non-Statin Adjuncts', 'Ezetimibe 10 mg OD | Evolocumab 140 mg q2w | Bempedoic Acid 180 mg OD', 'Ezetimibe: ~20% | PCSK9i: ~60% | Bempedoic: ~20%', 'Bempedoic acid: Simvastatin max 20 mg OD, Pravastatin max 40 mg OD']
        ]
      }
    ],
    boardPearls: [
      'Only two statins qualify as High-Intensity: Atorvastatin 40–80 mg and Rosuvastatin 20–40 mg daily.',
      'Bempedoic acid is a prodrug activated by ACSVL1 (expressed in hepatocytes but absent in skeletal myocytes), explaining its lack of statin-like myotoxicity (CLEAR Outcomes).',
      'Gemfibrozil inhibits OATP1B1 and glucuronidation of statins and is contraindicated with Simvastatin; Fenofibrate does not inhibit statin glucuronidation.'
    ],
    boardPearlsAr: [
      'الستاتينات الوحيدة المصنفة عالية الشدة هي: Atorvastatin (40-80 ملغ) و Rosuvastatin (20-40 ملغ).',
      'لا يسبب Bempedoic acid اعتلالاً عضلياً لأنه يُفعل حصرياً في الكبد بواسطة إنزيم ACSVL1 غير الموجود في العضلات الهيكلية.',
      'يُمنع الجمع بين Gemfibrozil والستاتينات لخطر انحلال الربيدات الشديد؛ ويُستخدم Fenofibrate بدلاً منه عند الضرورة.'
    ],
    keywords: ['statin', 'atorvastatin', 'rosuvastatin', 'ezetimibe', 'pcsk9', 'evolocumab', 'bempedoic acid', 'icosapent ethyl', 'dyslipidemia']
  },
  {
    id: 'accp-cardio-2026-acs-p2y12',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 5,
    title: 'BCCP Ch. 5: Acute Coronary Syndromes (STEMI/NSTEMI), PCI Anticoagulation & P2Y12 Inhibitor Switching Rules',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 5): المتلازمة التاجية الحادة (STEMI/NSTEMI)، مضادات الصفائح، وقواعد التحويل بين مثبطات P2Y12',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-299 to 1-372',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-005-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-acs-p2y12',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 5: Acute Coronary Syndromes & Percutaneous Coronary Intervention.',
    isVerbatimSource: true,
    learningObjectives: [
      'Compare Clopidogrel, Prasugrel, and Ticagrelor pharmacology, CYP2C19 pharmacogenomics, and contraindications in STEMI and NSTEMI.',
      'Execute evidence-based acute vs chronic switching rules between oral P2Y12 inhibitors and intravenous Cangrelor.',
      'Select parenteral anticoagulation (UFH, Enoxaparin, Bivalirudin, Fondaparinux) during primary PCI versus fibrinolysis.'
    ],
    toc: [
      { id: 'bccp-c5-s1', number: '5.1', title: 'P2Y12 Receptor Inhibitor Selection (PLATO & TRITON-TIMI 38) & CYP2C19' },
      { id: 'bccp-c5-s2', number: '5.2', title: 'Oral & Intravenous P2Y12 Inhibitor Switching Matrix' },
      { id: 'bccp-c5-s3', number: '5.3', title: 'STEMI Fibrinolysis vs Primary PCI Anticoagulation & CABG Washout Windows' }
    ],
    sections: [
      {
        id: 'bccp-c5-s1',
        number: '5.1',
        heading: 'P2Y12 Receptor Inhibitor Selection (PLATO & TRITON-TIMI 38) & CYP2C19',
        headingAr: 'اختيار مثبطات مستقبلات P2Y12 (دراسات PLATO و TRITON) والجينات الدوائية CYP2C19',
        evidenceGrade: 'ACC/AHA/SCAI Class I, Level A',
        body: `Dual Antiplatelet Therapy (DAPT) with Aspirin (162–325 mg non-enteric coated chewed loading dose, followed by 81 mg PO daily indefinitely) plus a potent P2Y12 inhibitor for 12 months is the cornerstone of ACS management:
• Ticagrelor (Brilinta — PLATO Trial): Reversible, direct-acting cyclopentyltriazolopyrimidine P2Y12 antagonist (no hepatic bioactivation required). Loading dose 180 mg PO, maintenance 90 mg PO BID. Preferred over Clopidogrel in both invasive PCI and ischemia-guided medical management of ACS.
  - Mandatory Aspirin Ceiling: Maintenance Aspirin dose MUST NOT EXCEED 100 mg/day (use 81 mg daily); higher Aspirin doses (>100 mg/day) negate Ticagrelor's cardiovascular mortality benefit.
  - Contraindications & Adverse Effects: Contraindicated in prior intracranial hemorrhage (ICH) or with strong CYP3A4 inhibitors/inducers; causes benign adenosine-mediated dyspnea (15%) and ventricular pauses.
• Prasugrel (Effient — TRITON-TIMI 38 Trial): Irreversible thienopyridine prodrug requiring single-step esterase/CYP activation. Loading dose 60 mg PO (administered ONLY after coronary anatomy is known in NSTEMI), maintenance 10 mg PO once daily (reduce maintenance to 5 mg PO daily if body weight <60 kg).
  - Absolute Contraindication (FDA Boxed Warning): History of ANY prior Stroke or Transient Ischemic Attack (TIA) due to net clinical harm from fatal/intracranial hemorrhage. Generally avoided in age >=75 years unless high-risk diabetes or prior MI is present.
• Clopidogrel (Plavix): Irreversible thienopyridine prodrug requiring two-step hepatic CYP2C19 bioactivation. Loading dose 600 mg PO for PCI (300 mg PO for fibrinolysis; omit loading dose if age >75 receiving fibrinolysis), maintenance 75 mg PO daily. Avoid Omeprazole and Esomeprazole (potent CYP2C19 inhibitors that reduce active Clopidogrel metabolite by ~45%); use Pantoprazole if a PPI is indicated.`
      },
      {
        id: 'bccp-c5-s2',
        number: '5.2',
        heading: 'Oral & Intravenous P2Y12 Inhibitor Switching Matrix',
        headingAr: 'مصفوفة التحويل الدقيق بين مثبطات P2Y12 الفموية والوريدية (Cangrelor)',
        evidenceGrade: 'AHA Consensus Switching Statement',
        body: `1. Switching Between Oral P2Y12 Inhibitors:
• Acute Phase (<30 Days Post-ACS Event — Escalation or De-escalation): Administer a FULL Loading Dose of the new oral P2Y12 inhibitor regardless of the timing of the last Clopidogrel dose (if escalating from Clopidogrel to Ticagrelor 180 mg or Prasugrel 60 mg), OR administer a loading dose 24 hours after the last Ticagrelor/Prasugrel dose when de-escalating in the acute setting.
• Chronic Phase (>30 Days Post-ACS Event):
  - Switching FROM Ticagrelor (reversible) TO Clopidogrel or Prasugrel: Because Ticagrelor binds reversibly and platelets remain uninhibited once Ticagrelor clears, ALWAYS administer a Loading Dose (Clopidogrel 600 mg or Prasugrel 60 mg) 24 hours after the last Ticagrelor dose.
  - Switching FROM Prasugrel TO Clopidogrel (or Clopidogrel to Prasugrel) in the Chronic Phase: Start maintenance dose (75 mg Clopidogrel or 10 mg Prasugrel) 24 hours after the last dose without a loading dose.

2. Intravenous Cangrelor (Kengreal) to Oral P2Y12 Transition:
Cangrelor (30 mcg/kg IV bolus, then 4 mcg/kg/min IV infusion; t1/2 = 3–6 minutes) is a direct, reversible IV P2Y12 inhibitor. Because Cangrelor occupies the P2Y12 receptor and blocks the binding of short-lived active thienopyridine metabolites:
• Clopidogrel (600 mg PO) and Prasugrel (60 mg PO) MUST be administered IMMEDIATELY AFTER discontinuation of the Cangrelor infusion (if given during the Cangrelor infusion, their active metabolites are degraded in plasma before Cangrelor dissociates, leaving the patient with zero platelet inhibition!).
• Ticagrelor (180 mg PO) has a long plasma half-life and can be administered EITHER during the Cangrelor infusion OR immediately upon discontinuation.`
      },
      {
        id: 'bccp-c5-s3',
        number: '5.3',
        heading: 'STEMI Fibrinolysis vs Primary PCI Anticoagulation & CABG Washout Windows',
        headingAr: 'مضادات التخثر خلال القسطرة التاجية وفترات الإيقاف الإلزامية قبل جراحة القلب المفتوح (CABG)',
        evidenceGrade: 'ACC/AHA Class I, Level A',
        body: `• Pre-CABG Mandatory P2Y12 Washout Windows:
  - Ticagrelor: Hold at least 3 to 5 days prior to elective CABG.
  - Clopidogrel: Hold at least 5 days prior to elective CABG.
  - Prasugrel: Hold at least 7 days prior to elective CABG.
• Parenteral Anticoagulation Pearls in PCI:
  - Unfractionated Heparin (UFH): 70–100 U/kg IV bolus (target ACT 250–300 sec) or 50–70 U/kg if GP IIb/IIIa inhibitor used.
  - Bivalirudin: Preferred in patients with Heparin-Induced Thrombocytopenia (HIT) undergoing PCI.
  - Fondaparinux: Strictly CONTRAINDICATED as sole anticoagulant during Primary PCI due to guide-catheter thrombosis (OASIS-6 trial).`
      }
    ],
    quickTables: [
      {
        title: 'P2Y12 Receptor Inhibitor Comparison & Pre-CABG Hold Windows',
        titleAr: 'جدول مقارنة مثبطات P2Y12 وموانع الاستخدام وفترات الإيقاف قبل الجراحة',
        headers: ['P2Y12 Agent', 'Load & Maintenance Dose', 'Absolute Contraindications / Boxed Warnings', 'Pre-CABG Hold Window'],
        rows: [
          ['Ticagrelor (Brilinta)', '180 mg load -> 90 mg PO BID', 'Aspirin >100 mg/day; prior ICH; severe hepatic impairment', '3 to 5 days'],
          ['Prasugrel (Effient)', '60 mg load -> 10 mg PO OD (5 mg if <60 kg)', 'Prior Stroke or TIA (Class III Harm); do not load before angiography in NSTEMI', '7 days'],
          ['Clopidogrel (Plavix)', '600 mg (PCI) / 300 mg (lytics) -> 75 mg OD', 'CYP2C19 poor metabolizers (*2/*2, *2/*3); avoid Omeprazole/Esomeprazole', '5 days'],
          ['Cangrelor (Kengreal)', '30 mcg/kg IV bolus -> 4 mcg/kg/min', 'Give Clopidogrel/Prasugrel ONLY AFTER stopping Cangrelor infusion', 'Stop 1 hour pre-CABG']
        ]
      }
    ],
    boardPearls: [
      'Never administer Clopidogrel or Prasugrel during a Cangrelor IV infusion — Cangrelor blocks the P2Y12 receptor while the short-lived active metabolites of Clopidogrel/Prasugrel are eliminated.',
      'Prasugrel is strictly contraindicated in any patient with a history of Stroke or TIA (TRITON-TIMI 38).',
      'Fondaparinux must never be used as the sole anticoagulant during PCI because it does not inhibit contact-activation catheter thrombosis.'
    ],
    boardPearlsAr: [
      'يُمنع إعطاء Clopidogrel أو Prasugrel أثناء سريان تسريب Cangrelor الوريدي، بل يُعطيان فور إيقاف التسريب.',
      'يُمنع استخدام Prasugrel قطعياً في أي مريض لديه تاريخ سابق لسكتة دماغية (Stroke) أو نوبة إقفارية عابرة (TIA).',
      'يُمنع استخدام Fondaparinux كمضاد تخثر وحيد أثناء القسطرة التاجية لخطر تخثر القسطرة.'
    ],
    keywords: ['acs', 'stemi', 'nstemi', 'ticagrelor', 'prasugrel', 'clopidogrel', 'cangrelor', 'bivalirudin', 'fondaparinux', 'dapt']
  },
  {
    id: 'accp-cardio-2026-ch6-valvular-pah',
    bookId: 'accp-cardiology-2026',
    chapterNumber: 6,
    title: 'BCCP Ch. 6: Valvular Heart Disease, Mechanical Valve Anticoagulation, PAH & Acute Pericarditis',
    titleAr: 'بورد أمراض القلب (BCCP - فصل 6): أمراض الصمامات، منع التخثر للصمامات الميكانيكية، فرط الضغط الرئوي، والتهاب التامور',
    authors: 'ACCP/ASHP Cardiology Pharmacy Preparatory Panel',
    edition: '2026 ACCP/ASHP Cardiology Pharmacy (BCCP) Syllabus',
    pageRange: 'BCCP pp. 1-373 to 1-435',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    uan: '0217-9997-26-006-H01-P',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-ch6-valvular-pah',
    citation: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course, 2026 Edition. Chapter 6: Valvular Disease, PAH & Pericarditis.',
    isVerbatimSource: true,
    learningObjectives: [
      'Specify Warfarin INR targets for mechanical aortic versus mechanical mitral prosthetic valves and bioprosthetic valves.',
      'Manage Pulmonary Arterial Hypertension (PAH WHO Group 1) across the 4 molecular pathways (Endothelin, Nitric Oxide/sGC, Prostacyclin, Activin/Sotatercept).',
      'Treat Acute Pericarditis with weight-adjusted Colchicine plus high-dose NSAIDs/Aspirin.'
    ],
    toc: [
      { id: 'bccp-c6-s1', number: '6.1', title: 'Mechanical & Bioprosthetic Heart Valve Antithrombotic Targets' },
      { id: 'bccp-c6-s2', number: '6.2', title: 'Pulmonary Arterial Hypertension (WHO Group 1) & Acute Pericarditis' }
    ],
    sections: [
      {
        id: 'bccp-c6-s1',
        number: '6.1',
        heading: 'Mechanical & Bioprosthetic Heart Valve Antithrombotic Targets',
        headingAr: 'أهداف منع التخثر للصمامات القلبية الميكانيكية والحيوية',
        evidenceGrade: 'ACC/AHA Valvular Guideline Class I',
        body: `1. Mechanical Prosthetic Heart Valves (Warfarin is Mandatory; DOACs are Contraindicated):
• Mechanical Aortic Valve (Bileaflet / Current-Generation Single Tilting Disk) WITHOUT Thromboembolic Risk Factors (no AFib, normal LVEF, no prior VTE, no hypercoagulable state): Warfarin target INR 2.5 (range 2.0–3.0).
• Mechanical Aortic Valve WITH Risk Factors (AFib, prior thromboembolism, LV dysfunction, or older ball-in-cage valve): Warfarin target INR 3.0 (range 2.5–3.5).
• Mechanical Mitral Valve (All Patients): Warfarin target INR 3.0 (range 2.5–3.5).
• On-X Mechanical Aortic Valve: Target INR 2.5 for the first 3 months post-implantation; after 3 months in low-risk patients, INR may be lowered to 1.5–2.0 ONLY IF combined with Aspirin 81 mg PO daily.

2. Bioprosthetic Valves & TAVR:
• Surgical Bioprosthetic Aortic or Mitral Valve (No AFib): Warfarin (INR 2.5) for the first 3 to 6 months post-surgery, followed by lifelong Aspirin 81 mg daily.
• Transcatheter Aortic Valve Replacement (TAVR) without baseline anticoagulation indication: Single Antiplatelet Therapy (SAPT) with Aspirin 81 mg PO daily is preferred over DAPT or DOACs (POPular TAVI & GALILEO trials).`
      },
      {
        id: 'bccp-c6-s2',
        number: '6.2',
        heading: 'Pulmonary Arterial Hypertension (WHO Group 1) & Acute Pericarditis',
        headingAr: 'فرط ضغط الشريان الرئوي (WHO Group 1) والتهاب التامور الحاد',
        evidenceGrade: 'CHEST / ESC Guideline Standard',
        body: `1. WHO Group 1 Pulmonary Arterial Hypertension (PAH) Pathways:
• Vasoreactivity Testing: Only ~5–10% of idiopathic PAH patients respond positively to acute inhaled nitric oxide or IV epoprostenol testing and qualify for high-dose CCB therapy (Nifedipine, Amlodipine, or Diltiazem; avoid Verapamil).
• Initial Combination Therapy (AMBITION Trial): Upfront combination of an Endothelin Receptor Antagonist (Ambrisentan 5–10 mg daily or Macitentan 10 mg daily; Bosentan requires monthly LFT monitoring; all ERAs are REMS teratogens) PLUS a PDE-5 Inhibitor (Tadalafil 40 mg daily or Sildenafil 20 mg TID).
• Critical Contraindication: NEVER combine Riociguat (soluble guanylate cyclase stimulator) with PDE-5 Inhibitors (Sildenafil/Tadalafil) due to profound systemic hypotension.
• WHO Functional Class IV PAH: Continuous IV Prostacyclin (Epoprostenol or Treprostinil) or Activin signaling inhibitor (Sotatercept — STELLAR trial).

2. Acute Pericarditis (COPE & ICAP Trials):
• First-line dual anti-inflammatory therapy: High-dose Aspirin (750–1000 mg PO TID) or Ibuprofen (600–800 mg PO TID) tapered over 1–2 weeks PLUS Colchicine for 3 months (0.6 mg PO BID if weight >=70 kg; 0.6 mg PO once daily if weight <70 kg). Avoid corticosteroids first-line because steroids markedly increase pericarditis recurrence rates.`
      }
    ],
    quickTables: [
      {
        title: 'Prosthetic Heart Valve Antithrombotic Regimens & INR Targets',
        titleAr: 'جدول أهداف INR للصمامات القلبية الميكانيكية والحيوية',
        headers: ['Valve Type & Position', 'Antithrombotic Drug', 'Target INR Range', 'Key Clinical Rule'],
        rows: [
          ['Mechanical Aortic (Low Risk)', 'Warfarin', 'INR 2.5 (2.0–3.0)', 'DOACs strictly contraindicated (RE-ALIGN & PROACT Xa)'],
          ['Mechanical Mitral (All) or Aortic High-Risk', 'Warfarin', 'INR 3.0 (2.5–3.5)', 'Add Aspirin 81 mg only if concomitant ASCVD/indication'],
          ['TAVR (No AFib / No VTE)', 'Aspirin 81 mg PO OD (SAPT)', 'N/A', 'SAPT superior to DAPT for bleeding (POPular TAVI)']
        ]
      }
    ],
    boardPearls: [
      'All DOACs (Dabigatran, Apixaban, Rivaroxaban, Edoxaban) are contraindicated in Mechanical Heart Valves.',
      'Never co-administer Riociguat with Sildenafil or Tadalafil in PAH due to synergistic nitric oxide/cGMP hypotension.',
      'In Acute Pericarditis, adding 3 months of weight-based Colchicine to NSAIDs/Aspirin cuts recurrence rates in half; systemic corticosteroids increase recurrence and are reserved for refractory cases.'
    ],
    boardPearlsAr: [
      'تُمنع جميع مضادات التخثر الفموية المباشرة (DOACs) في الصمامات القلبية الميكانيكية، ويُستخدم الوارفارين حصراً.',
      'يُمنع الجمع بين Riociguat ومثبطات PDE-5 (Sildenafil/Tadalafil) لخطر هبوط الضغط الشديد.',
      'في التهاب التامور الحاد، يُستخدم الكولشيسين لمدة 3 أشهر مع الأسبرين/الإيبوبروفين، وتُتجنب الستيرويدات كخط أول لأنها تزيد النكس.'
    ],
    keywords: ['valvular', 'mechanical valve', 'warfarin', 'inr', 'tavr', 'pah', 'ambrisentan', 'riociguat', 'pericarditis', 'colchicine']
  }
];

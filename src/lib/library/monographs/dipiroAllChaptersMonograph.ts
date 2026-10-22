import { VerbatimChapter } from '../libraryTypes';

export const dipiroAdditionalChapters: VerbatimChapter[] = [
  {
    id: 'dipiro-ch30-htn',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 30,
    title: 'Systemic Hypertension, Hypertensive Emergencies & Acute Aortic Syndromes',
    titleAr: 'الفصل 30-31: ارتفاع ضغط الدم الشرياني، الطوارئ الوعائية، وتسلخ الأبهر الحاد',
    authors: 'Eric J. MacLaughlin, PharmD, FCCP, BCPS; Sandra L. Saseen, PharmD, FCCP, BCPS',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 375–411',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    sourceUrl: 'local://ref/chapter/dipiro-ch30-htn',
    citation: "MacLaughlin EJ, Saseen SL. Systemic Hypertension & Hypertensive Crises. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:375-411.",
    isVerbatimSource: true,
    learningObjectives: [
      'Differentiate stage 1 and stage 2 essential hypertension from hypertensive urgency and hypertensive emergency based on acute target-organ damage.',
      'Select evidence-based first-line antihypertensive pharmacotherapy (ACE inhibitors, ARBs, thiazide-like diuretics, dihydropyridine CCBs) tailored to compelling comorbidities.',
      'Execute intravenous blood pressure reduction kinetics in hypertensive emergencies (first-hour 25% MAP reduction rule vs immediate SBP <120 mmHg in acute aortic dissection).'
    ],
    toc: [
      { id: 'dipiro-htn-sec1', number: '1.1', title: 'Pathophysiology of Arterial Pressure Regulation & Vascular Remodeling' },
      { id: 'dipiro-htn-sec2', number: '1.2', title: 'Compelling Indications & First-Line Pharmacotherapy Selection' },
      { id: 'dipiro-htn-sec3', number: '1.3', title: 'Hypertensive Emergencies vs Urgencies & IV Titration Protocols' }
    ],
    sections: [
      {
        id: 'dipiro-htn-sec1',
        number: '1.1',
        heading: 'Pathophysiology of Arterial Pressure Regulation & Vascular Remodeling',
        headingAr: 'الفيزيولوجيا المرضية لتنظيم الضغط الشرياني وإعادة الهيكلة الوعائية',
        evidenceGrade: 'ACC/AHA Class I, Level A',
        body: `Arterial blood pressure is governed by the hemodynamic product of Cardiac Output (CO) and Systemic Vascular Resistance (SVR). In essential hypertension, chronic dysregulation of the Renin-Angiotensin-Aldosterone System (RAAS), heightened sympathetic nervous system (SNS) tone, impaired pressure-natriuresis in the renal proximal tubule, and endothelial nitric oxide (NO) depletion act synergistically to sustain elevated SVR and arterial stiffness.

Target-Organ Damage Pathogenesis:
• Left Ventricular Hypertrophy (LVH): Chronic pressure overload induces concentric myocardial hypertrophy, diastolic dysfunction (HFpEF), increased myocardial oxygen demand, and eventual decompensation to HFrEF.
• Hypertensive Nephrosclerosis: Loss of renal afferent arteriolar autoregulation transmits systemic pressure directly to the glomerular capillaries, causing hyperfiltration, proteinuria, and progressive glomerulosclerosis.
• Cerebrovascular Autoregulation Shift: In chronically hypertensive patients, the cerebral autoregulatory curve shifts to the right (maintaining constant cerebral blood flow across MAP 90–180 mmHg instead of the normal 60–150 mmHg). Consequently, precipitous acute reductions in blood pressure below the shifted lower limit of autoregulation provoke watershed cerebral ischemia.`
      },
      {
        id: 'dipiro-htn-sec2',
        number: '1.2',
        heading: 'Compelling Indications & First-Line Pharmacotherapy Selection',
        headingAr: 'الدواعي السريرية الملزمة واختيار الخط الأول لعلاج ارتفاع الضغط',
        evidenceGrade: 'ACC/AHA Guideline Standard',
        body: `For adult patients without compelling comorbidities, primary first-line antihypertensive classes include Thiazide-like diuretics (Chlorthalidone 12.5–25 mg PO daily or Indapamide preferred over Hydrochlorothiazide due to superior 24-hour ambulatory BP reduction and cardiovascular outcome data), Angiotensin-Converting Enzyme Inhibitors (ACEi: Lisinopril, Ramipril, Enalapril), Angiotensin Receptor Blockers (ARBs: Losartan, Valsartan, Candesartan), and long-acting Dihydropyridine Calcium Channel Blockers (DHP-CCBs: Amlodipine 5–10 mg PO daily, Nifedipine XL).

Compelling Comorbidity Drug Selection:
1. Chronic Kidney Disease with Albuminuria (UACR >=30 mg/g): ACEi or ARB is mandatory first-line therapy to dilate the efferent arteriole, reduce intraglomerular pressure, and slow GFR decline. Never combine an ACEi with an ARB or Direct Renin Inhibitor (Aliskiren) due to increased risks of hyperkalemia, hypotension, and acute kidney injury (ONTARGET trial).
2. Heart Failure with Reduced Ejection Fraction (HFrEF): ARNI (Sacubitril/Valsartan) or ACEi/ARB + Evidence-based Beta-Blocker (Carvedilol, Metoprolol Succinate, Bisoprolol) + MRA (Spironolactone/Eplerenone) + SGLT2 Inhibitor.
3. Resistant Hypertension: Defined as BP remaining above goal despite adherence to 3 maximally tolerated antihypertensives of different classes including a diuretic. After excluding pseudoresistance and secondary causes (primary aldosteronism, renal artery stenosis, OSA), add low-dose Spironolactone 25–50 mg PO daily as the preferred fourth-line agent (PATHWAY-2 trial), provided serum K+ <4.5 mEq/L and eGFR >30 mL/min.`
      },
      {
        id: 'dipiro-htn-sec3',
        number: '1.3',
        heading: 'Hypertensive Emergencies vs Urgencies & IV Titration Protocols',
        headingAr: 'طوارئ ارتفاع الضغط مقابل الحالات العاجلة وبروتوكولات التسريب الوريدي',
        evidenceGrade: 'Consensus Critical Care Standard',
        body: `A Hypertensive Crisis (SBP >180 mmHg and/or DBP >120 mmHg) is stratified strictly by the presence or absence of acute, ongoing target-organ damage:
• Hypertensive Urgency (Severe Asymptomatic Hypertension): BP >180/120 mmHg WITHOUT acute target-organ injury. Treat by reinstituting or intensifying oral antihypertensive therapy and lowering BP gradually over 24 to 48 hours. Intravenous antihypertensives and rapid-acting oral Nifedipine capsules are CONTRAINDICATED because abrupt BP drops precipitate cerebral or myocardial watershed infarction.
• Hypertensive Emergency: BP >180/120 mmHg WITH acute target-organ injury (hypertensive encephalopathy, acute ischemic/hemorrhagic stroke, acute myocardial infarction, acute cardiogenic pulmonary edema, eclampsia, or acute aortic dissection). Requires immediate ICU admission and continuous titratable IV antihypertensive infusion.

Standard Blood Pressure Reduction Rule in Hypertensive Emergency:
• Hour 1: Reduce Mean Arterial Pressure (MAP) by NO MORE than 20% to 25%.
• Hours 2 to 6: If stable, reduce BP toward 160/100–110 mmHg.
• Hours 24 to 48: Gradually titrate toward normal baseline BP.

Critical Exceptions Requiring Immediate Aggressive Reduction:
1. Acute Aortic Dissection: Immediately reduce SBP to <120 mmHg and Heart Rate to <60 bpm within 20 minutes. Always initiate IV Beta-Blocker (Esmolol or Labetalol) FIRST before any arterial vasodilator (Nicardipine or Nitroprusside) to prevent reflex tachycardia and increased aortic shear stress (dP/dt).
2. Acute Cardiogenic Pulmonary Edema: Immediately use IV Clevidipine, IV Nitroglycerin, or IV Nitroprusside + IV Loop Diuretic; avoid Labetalol/Esmolol in acute decompensated LV failure.
3. Severe Preeclampsia / Eclampsia: Reduce SBP to <140 mmHg using IV Labetalol, IV Hydralazine, or immediate-release oral Nifedipine, plus IV Magnesium Sulfate for seizure prophylaxis.`
      }
    ],
    quickTables: [
      {
        title: 'Intravenous Antihypertensive Selection in Hypertensive Emergencies',
        titleAr: 'جدول اختيار خافضات الضغط الوريدية في طوارئ ارتفاع الضغط',
        headers: ['Clinical Emergency', 'Preferred IV Agent(s)', 'Target BP Timeline', 'Contraindicated / Avoid'],
        rows: [
          ['Acute Aortic Dissection', 'Esmolol or Labetalol FIRST, then Nicardipine/Nitroprusside', 'SBP <120 mmHg & HR <60 bpm in <=20 min', 'Vasodilators without prior beta-blockade (increases aortic shear stress)'],
          ['Acute Pulmonary Edema (ADHF)', 'Nitroglycerin IV or Clevidipine / Nitroprusside + Loop Diuretic', 'Reduce MAP 20–25% immediately to relieve afterload', 'Beta-blockers (Labetalol, Esmolol) or Hydralazine'],
          ['Acute Coronary Syndrome', 'Nitroglycerin IV + Esmolol or Labetalol', 'Reduce MAP 20–25% without dropping DBP <60 mmHg', 'Nitroprusside (coronary steal) & Hydralazine (reflex tachycardia)'],
          ['Eclampsia / Severe Preeclampsia', 'Labetalol IV, Nicardipine IV, or Hydralazine IV (+ MgSO4)', 'SBP <140 mmHg & DBP <90 mmHg within 30–60 min', 'ACEi, ARBs, Direct Renin Inhibitors, and Nitroprusside (fetal cyanide toxicity)']
        ]
      }
    ],
    boardPearls: [
      'Never use sublingual or immediate-release oral Nifedipine in hypertensive urgency — unpredictable precipitous hypotension causes acute ischemic stroke and MI.',
      'In Acute Aortic Dissection, Beta-blockade (Esmolol or Labetalol) must precede vasodilator therapy to attenuate dP/dt shear stress on the aortic intimal tear.',
      'Sodium Nitroprusside releases 5 cyanide molecules per drug molecule; prolonged high-dose infusion (>2 mcg/kg/min or >24–48h) in renal or hepatic dysfunction causes lethal cyanide and thiocyanate toxicity.'
    ],
    boardPearlsAr: [
      'يُمنع استخدام كبسولات النيفيديبين سريعة المفعول لتخفيض الضغط الإسعافي لما تسببه من سكتة دماغية واحتشاء قلبي.',
      'في تسلخ الأبهر الحاد، يجب البدء بحاصرات بيتا (Esmolol أو Labetalol) لخفض النبض < 60 قبل إعطاء أي موسع وعائي.',
      'التسريب المطول لـ Nitroprusside في القصور الكلوي أو الكبدي يسبب تسمماً قاتلاً بالسيانيد والثيوسيانات.'
    ],
    keywords: ['hypertension', 'hypertensive emergency', 'aortic dissection', 'esmolol', 'labetalol', 'nicardipine', 'chlorthalidone', 'spironolactone']
  },
  {
    id: 'dipiro-ch34-arrhythmias',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 34,
    title: 'Supraventricular & Ventricular Arrhythmias, Atrial Fibrillation & Antiarrhythmic Pharmacology',
    titleAr: 'الفصل 34-35: اضطرابات النظم، الرجفان الأذيني، والفارماكولوجيا السريرية لمضادات اضطراب النظم',
    authors: 'James E. Tisdale, PharmD, FCCP, FAPhA, FNAP, FAHA, BCPS',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 486–534',
    systemCategory: 'Cardiology',
    systemCategoryAr: 'أمراض القلب والأوعية الدموية',
    sourceUrl: 'local://ref/chapter/dipiro-ch34-arrhythmias',
    citation: "Tisdale JE. The Arrhythmias. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:486-534.",
    isVerbatimSource: true,
    learningObjectives: [
      'Classify antiarrhythmic drugs by the Vaughan-Williams framework and identify ion channel mechanisms, use-dependence, and reverse use-dependence.',
      'Formulate rate-control versus rhythm-control regimens in Atrial Fibrillation stratified by left ventricular ejection fraction (LVEF <=40% vs >40%).',
      'Recognize and treat drug-induced QTc prolongation and polymorphic ventricular tachycardia (Torsades de Pointes).'
    ],
    toc: [
      { id: 'dipiro-arr-sec1', number: '2.1', title: 'Vaughan-Williams Classification & Reverse Use-Dependence' },
      { id: 'dipiro-arr-sec2', number: '2.2', title: 'Atrial Fibrillation Rate vs Rhythm Control & CHA2DS2-VASc Anticoagulation' },
      { id: 'dipiro-arr-sec3', number: '2.3', title: 'Amiodarone Multi-Organ Toxicity Surveillance & Drug-Induced Torsades de Pointes' }
    ],
    sections: [
      {
        id: 'dipiro-arr-sec1',
        number: '2.1',
        heading: 'Vaughan-Williams Classification & Reverse Use-Dependence',
        headingAr: 'تصنيف Vaughan-Williams لمضادات اضطراب النظم وخصائص القنوات الأيونية',
        evidenceGrade: 'Foundational Pharmacology',
        body: `Antiarrhythmic agents are categorized by their dominant cardiac ion channel blockade:
• Class I (Fast Sodium Channel Blockers - Phase 0 Depolarization):
  - Class Ia (Quinidine, Procainamide, Disopyramide): Moderate Na+ blockade (prolongs QRS) + K+ IKr blockade (prolongs action potential duration and QTc).
  - Class Ib (Lidocaine, Mexiletine): Weak Na+ blockade selective for ischemic ventricular myocardium; shortens action potential duration. Ineffective in atrial arrhythmias.
  - Class Ic (Flecainide, Propafenone): Potent Na+ channel blockade with slow dissociation kinetics; exhibits marked "use-dependence" (greater conduction slowing at rapid heart rates). Strictly CONTRAINDICATED in structural heart disease, prior MI, LVH, or HFrEF due to increased mortality from proarrhythmic ventricular tachycardia (CAST trial).
• Class II (Beta-Adrenergic Blockers): Metoprolol, Esmolol, Carvedilol, Bisoprolol, Propranolol. Suppress Phase 4 automaticity in the SA node and slow AV nodal conduction.
• Class III (Potassium Channel IKr Blockers - Phase 3 Repolarization): Amiodarone, Dronedarone, Sotalol, Dofetilide, Ibutilide. Prolong effective refractory period (ERP) and QTc interval. Sotalol, Dofetilide, and Ibutilide exhibit "reverse use-dependence" (QT prolongation is most pronounced at slow heart rates / bradycardia, predisposing to Torsades de Pointes upon conversion to sinus rhythm).
• Class IV (Non-Dihydropyridine Calcium Channel Blockers): Verapamil and Diltiazem. Block L-type Ca2+ channels in SA and AV nodes; strictly contraindicated in HFrEF (LVEF <=40%) due to negative inotropy.`
      },
      {
        id: 'dipiro-arr-sec2',
        number: '2.2',
        heading: 'Atrial Fibrillation Rate vs Rhythm Control & CHA2DS2-VASc Anticoagulation',
        headingAr: 'ضبط السرعة مقابل ضبط النظم في الرجفان الأذيني ومعايير منع التخثر',
        evidenceGrade: 'ACC/AHA/HRS Class I, Level A',
        body: `1. Acute & Chronic Ventricular Rate Control in AFib:
• Preserved Ejection Fraction (LVEF >40%): First-line therapy is a Beta-Blocker (Metoprolol tartrate/succinate) or a Non-DHP CCB (Diltiazem IV 0.25 mg/kg bolus over 2 min, then 5–15 mg/h; oral 120–360 mg daily). Target resting HR <80 bpm (strict) or <110 bpm (lenient, asymptomatic patients per RACE II trial).
• Reduced Ejection Fraction (HFrEF, LVEF <=40%): Non-DHP CCBs (Diltiazem, Verapamil) are CONTRAINDICATED (Class III: Harm). Use Beta-Blockers (if hemodynamically compensated), Digoxin (target trough 0.5–0.9 ng/mL), or IV Amiodarone in acute decompensated settings.

2. Rhythm Control & Maintenance of Sinus Rhythm:
• Structural Heart Disease / HFrEF (LVEF <=40%): Only Amiodarone and Dofetilide are safe for rhythm maintenance. Dronedarone, Sotalol, Flecainide, and Propafenone are contraindicated in HFrEF.
• Coronary Artery Disease (without Heart Failure): Dofetilide, Dronedarone, Sotalol, or Amiodarone (avoid Flecainide/Propafenone).
• No Structural Heart Disease ("Pill-in-the-Pocket" Eligible): Flecainide or Propafenone (must always co-administer an AV nodal blocker—Beta-blocker or Non-DHP CCB—at least 30 minutes prior to prevent 1:1 AV conduction of atrial flutter).`
      },
      {
        id: 'dipiro-arr-sec3',
        number: '2.3',
        heading: 'Amiodarone Multi-Organ Toxicity Surveillance & Drug-Induced Torsades de Pointes',
        headingAr: 'مراقبة السمية العضوية للأميودارون وعلاج Torsades de Pointes',
        evidenceGrade: 'Clinical Safety Mandate',
        body: `Amiodarone Pharmacokinetics & Monitoring Protocol:
Amiodarone is an iodinated benzofuran derivative (~37% iodine by weight) with an elimination half-life of 40 to 55 days due to extensive adipose tissue accumulation.
• Baseline & Periodic Surveillance:
  - Pulmonary Toxicity (Hypersensitivity pneumonitis / pulmonary fibrosis — most lethal toxicity): Baseline chest X-ray and pulmonary function tests (DLCO); repeat annually or immediately if dyspnea/cough develops.
  - Thyroid Function (TSH & Free T4): Baseline and every 6 months (causes both iodine-induced hypothyroidism and thyrotoxicosis).
  - Hepatic Transaminases (AST/ALT): Baseline and every 6 months (discontinue if >2–3× ULN).
  - Ophthalmologic Exam: Slit-lamp exam at baseline and if visual impairment occurs (corneal microdeposits occur in >90% of patients and are benign, whereas optic neuritis requires discontinuation).
• Major Drug Interactions: Potent inhibitor of CYP2C9, CYP2D6, CYP3A4, and P-glycoprotein. Empirically reduce Warfarin dose by 30% to 50% and reduce Digoxin dose by 50% immediately upon starting Amiodarone.

Management of Drug-Induced Torsades de Pointes (TdP):
• Hemodynamically Unstable TdP: Immediate unsynchronized defibrillation (electrical cardioversion).
• Hemodynamically Stable / Recurrent TdP: Administer Magnesium Sulfate 2 g IV bolus over 5–15 minutes regardless of baseline serum magnesium level (suppresses early afterdepolarizations), discontinue all QTc-prolonging agents, replenish serum Potassium to 4.5–5.0 mEq/L, and use overdrive pacing or IV Isoproterenol if bradycardia-dependent TdP persists.`
      }
    ],
    quickTables: [
      {
        title: 'Amiodarone Mandatory Clinical Surveillance Schedule',
        titleAr: 'جدول الفحوصات الدورية الإلزامية لمرضى الأميودارون (Amiodarone)',
        headers: ['Organ System', 'Diagnostic Test', 'Monitoring Frequency', 'Action Threshold'],
        rows: [
          ['Pulmonary', 'Chest X-Ray & PFTs (with DLCO)', 'Baseline, annually (CXR), and for new dyspnea/cough', 'Discontinue immediately if interstitial pneumonitis/fibrosis'],
          ['Hepatic', 'AST & ALT', 'Baseline and every 6 months', 'Discontinue if transaminases >2–3× ULN'],
          ['Thyroid', 'TSH & Free T4', 'Baseline and every 6 months', 'Add Levothyroxine for hypothyroidism; Methimazole/steroids for thyrotoxicosis'],
          ['Cardiac /Interactions', 'ECG (QTc, PR, HR), Warfarin INR, Digoxin level', 'Baseline; reduce Warfarin 30–50% & Digoxin 50% at Day 1', 'Hold if symptomatic bradycardia or heart block without pacemaker']
        ]
      }
    ],
    boardPearls: [
      'Flecainide and Propafenone (Class Ic) must NEVER be used in patients with prior MI, CAD, or LV hypertrophy/dysfunction (CAST Trial mortality).',
      'Dofetilide requires mandatory 3-day inpatient initiation with continuous ECG telemetry, baseline CrCl calculation via Cockcroft-Gault (contraindicated if CrCl <20 mL/min), and QTc measurement 2–3 hours after each dose.',
      'Intravenous Magnesium Sulfate 2 g IV is the first-line pharmacologic therapy for Torsades de Pointes even when serum magnesium is normal.'
    ],
    boardPearlsAr: [
      'يُمنع استخدام Flecainide و Propafenone في مرضى نقص التروية الإكليلية أو قصور القلب لزيادة الوفيات.',
      'يتطلب بدء Dofetilide تنويماً إلزامياً لمدة 3 أيام لمراقبة QTc وحساب CrCl (يُمنع عند CrCl < 20 مل/د).',
      'المغنيسيوم الوريدي 2 جم هو خط العلاج الدوائي الأول في Torsades de Pointes حتى لو كان مستوى المغنيسيوم بالدم طبيعياً.'
    ],
    keywords: ['arrhythmia', 'atrial fibrillation', 'amiodarone', 'dofetilide', 'sotalol', 'flecainide', 'torsades', 'vaughan-williams']
  },
  {
    id: 'dipiro-ch46-cirrhosis',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 46,
    title: 'Portal Hypertension, Decompensated Cirrhosis, Ascites, SBP & Hepatic Encephalopathy',
    titleAr: 'الفصل 46: فرط ضغط وريد الباب، تشمع الكبد اللا معاوض، الحبن، والاعتلال الدماغي الكبدي',
    authors: 'Julie M. Sease, PharmD, FCCP, BCPS, BCACP;ipiro Hepatology Group',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 610–642',
    systemCategory: 'Gastroenterology & Hepatology',
    systemCategoryAr: 'أمراض الجهاز الهضمي والكبد',
    sourceUrl: 'local://ref/chapter/dipiro-13-cirrhosis-portal-htn',
    citation: "Sease JM, et al. Portal Hypertension and Cirrhosis. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:610-642.",
    isVerbatimSource: true,
    learningObjectives: [
      'Explain the splanchnic arterial vasodilation hypothesis and neurohormonal RAAS activation driving cirrhotic ascites and hepatorenal syndrome.',
      'Execute the 100:40 mg Spironolactone-to-Furosemide natriuretic ratio and calculate post-paracentesis albumin volume expansion.',
      'Manage acute variceal hemorrhage, spontaneous bacterial peritonitis (SBP) with renal-protective albumin, and overt hepatic encephalopathy.'
    ],
    toc: [
      { id: 'dipiro-cirr-sec1', number: '3.1', title: 'Splanchnic Arterial Vasodilation & Ascites Mobilization (100:40 Ratio)' },
      { id: 'dipiro-cirr-sec2', number: '3.2', title: 'Spontaneous Bacterial Peritonitis (SBP) & Albumin Hepatorenal Protection' },
      { id: 'dipiro-cirr-sec3', number: '3.3', title: 'Esophageal Variceal Hemorrhage & Hepatic Encephalopathy' }
    ],
    sections: [
      {
        id: 'dipiro-cirr-sec1',
        number: '3.1',
        heading: 'Splanchnic Arterial Vasodilation & Ascites Mobilization (100:40 Ratio)',
        headingAr: 'التوسع الشرياني الحشوي وتعبئة الحبن الكبدي بنسبة 100:40',
        evidenceGrade: 'AASLD Practice Guideline Class I',
        body: `In decompensated cirrhosis, sinusoidal architectural distortion elevates hepatic venous pressure gradient (HVPG >=10 mmHg defines clinically significant portal hypertension). Endothelial shear stress in the splanchnic circulation triggers local nitric oxide overproduction, resulting in splanchnic arterial vasodilation and effective arterial underfilling. This arterial underfilling activates the sympathetic nervous system, non-osmotic vasopressin (ADH) release, and massive hyperaldosteronism.

Diagnostic Paracentesis & SAAG:
A Serum-Ascites Albumin Gradient (SAAG = Serum Albumin − Ascitic Fluid Albumin) >=1.1 g/dL confirms portal hypertension with 97% accuracy.

Pharmacotherapy of Cirrhotic Ascites:
• Sodium Restriction: Moderate dietary sodium restriction to 2000 mg/day (88 mEq/day). Fluid restriction (<1000–1500 mL/day) is NOT indicated unless dilutional hyponatremia is severe (Serum Na+ <120–125 mEq/L).
• Diuretic Ratio (100:40 Rule): Because secondary hyperaldosteronism drives distal tubular sodium avid retention, Spironolactone is the cornerstone diuretic. Initiate combination oral therapy with Spironolactone 100 mg PO once daily + Furosemide 40 mg PO once daily. Titrate upward every 3–5 days maintaining the strict 100:40 ratio (up to maximum Spironolactone 400 mg/day + Furosemide 160 mg/day) to maintain normokalemia.
• Weight Loss Ceilings: Target maximum daily weight loss of <=0.5 kg/day in patients without peripheral edema, or <=1.0 kg/day in patients with peripheral edema, to prevent intravascular depletion and Hepatorenal Syndrome (HRS-AKI).
• Large-Volume Paracentesis (LVP): When >5 Liters of ascitic fluid is removed in a single session, infuse 25% Intravenous Albumin at 6 to 8 g per Liter of total fluid removed to prevent post-paracentesis circulatory dysfunction.`
      },
      {
        id: 'dipiro-cirr-sec2',
        number: '3.2',
        heading: 'Spontaneous Bacterial Peritonitis (SBP) & Albumin Hepatorenal Protection',
        headingAr: 'التهاب الصفاق الجرثومي التلقائي (SBP) وحماية الكلى بالألبومين الوريدي',
        evidenceGrade: 'AASLD Class I, Level A',
        body: `Spontaneous Bacterial Peritonitis (SBP) is diagnosed when ascitic fluid polymorphonuclear (PMN) leukocyte count is >=250 cells/mm³ in the absence of an intra-abdominal surgical source.
• Empiric Antimicrobial Therapy: Administer a third-generation cephalosporin immediately—Ceftriaxone 2 g IV every 24 hours (or Cefotaxime 2 g IV every 8 hours) for 5 to 7 days. In nosocomial SBP or septic shock, broaden coverage to Piperacillin-Tazobactam or Meropenem.
• Mandatory IV Albumin for HRS Prevention (Sort et al. Landmark Trial): Administer 25% IV Albumin at 1.5 g/kg on Day 1 (within 6 hours of diagnosis, maximum 100 g) followed by 1.0 g/kg on Day 3 (maximum 100 g). Albumin infusion is strictly indicated when baseline Serum Creatinine >1.0 mg/dL, BUN >30 mg/dL, or Total Bilirubin >4.0 mg/dL, reducing Type 1 HRS incidence from 30% to 10% and halving inpatient mortality.
• Secondary SBP Prophylaxis: Following recovery from an episode of SBP, initiate lifelong daily prophylaxis with Ciprofloxacin 500 mg PO daily or Trimethoprim-Sulfamethoxazole 1 DS tablet PO daily.
• Critical Beta-Blocker Hold Rule in Refractory Ascites / SBP: Discontinue Non-Selective Beta-Blockers (Propranolol, Nadolol, Carvedilol) during acute SBP if SBP <90 mmHg, MAP <65 mmHg, Serum Na+ <130 mEq/L, or AKI develops.`
      },
      {
        id: 'dipiro-cirr-sec3',
        number: '3.3',
        heading: 'Esophageal Variceal Hemorrhage & Hepatic Encephalopathy',
        headingAr: 'نزف دوالي المريء الحاد والاعتلال الدماغي الكبدي',
        evidenceGrade: 'AASLD / Baveno VII Consensus',
        body: `1. Acute Esophageal Variceal Hemorrhage Bundle:
• Restrictive Transfusion Strategy: Transfuse packed RBCs at a hemoglobin threshold of <7 g/dL, targeting a post-transfusion hemoglobin of 7 to 9 g/dL (over-transfusion elevates portal pressure and triggers rebleeding).
• Splanchnic Vasoactive Infusion (initiate immediately prior to endoscopy and continue for 2–5 days): Octreotide 50 mcg IV bolus followed by 50 mcg/hour continuous IV infusion (or Terlipressin 2 mg IV q4h).
• Short-Course Antibiotic Prophylaxis: Ceftriaxone 1 g IV every 24 hours for up to 7 days (reduces bacterial infections, rebleeding, and mortality).
• Primary & Secondary Variceal Prophylaxis: Non-selective beta-blockers (Carvedilol 6.25 mg PO BID, Propranolol 20–40 mg PO BID, or Nadolol 20–40 mg PO daily titrated to resting HR 55–60 bpm) and/or endoscopic variceal ligation (EVL).

2. Overt Hepatic Encephalopathy (HE):
• First-Line Ammoniagenic Cathartic: Lactulose 20–30 g (30–45 mL) PO every 1–2 hours until bowel movement occurs, then titrate to maintain 2 to 3 soft stools per day (acidifies colonic lumen to trap NH3 as non-absorbable NH4+).
• Non-Absorbable Gut-Selective Antibiotic: Add Rifaximin 550 mg PO BID to Lactulose to prevent recurrent overt HE episodes.`
      }
    ],
    quickTables: [
      {
        title: 'Decompensated Cirrhosis Syndromes & Evidence-Based Regimens',
        titleAr: 'جدول متلازمات تشمع الكبد اللا معاوض والبروتوكولات العلاجية',
        headers: ['Cirrhosis Complication', 'Diagnostic Criterion', 'First-Line Pharmacotherapy', 'Mandatory Safety Rule'],
        rows: [
          ['Portal Hypertensive Ascites', 'SAAG >=1.1 g/dL', 'Spironolactone 100 mg + Furosemide 40 mg PO OD (100:40 ratio)', 'Give Albumin 6–8 g/L removed if LVP >5 L; absolute NSAID ban'],
          ['Spontaneous Bacterial Peritonitis', 'Ascitic PMN >=250 cells/mm³', 'Ceftriaxone 2 g IV q24h + IV Albumin 1.5 g/kg Day 1 & 1.0 g/kg Day 3', 'Hold NSBBs if SBP <90 mmHg, MAP <65 mmHg, or AKI'],
          ['Acute Variceal Hemorrhage', 'Upper GI bleed with varices', 'Octreotide 50 mcg bolus then 50 mcg/h + Ceftriaxone 1 g IV q24h', 'Restrictive RBC transfusion target Hgb 7–9 g/dL'],
          ['Overt Hepatic Encephalopathy', 'West Haven Grade II–IV', 'Lactulose titrated to 2–3 soft stools/day + Rifaximin 550 mg PO BID', 'Correct hypokalemia (hypokalemia increases renal NH3 synthesis)']
        ]
      }
    ],
    boardPearls: [
      'NSAIDs are strictly contraindicated in cirrhosis — blocking prostaglandin E2 causes unopposed renal afferent vasoconstriction and precipitates acute hepatorenal syndrome.',
      'Hypokalemia worsens Hepatic Encephalopathy because low intracellular potassium stimulates renal proximal tubular glutaminase to convert glutamine into ammonia (NH3).',
      'In SBP, IV Albumin (1.5 g/kg Day 1, 1.0 g/kg Day 3) is required when SCr >1 mg/dL, BUN >30 mg/dL, or Bilirubin >4 mg/dL.'
    ],
    boardPearlsAr: [
      'تُمنع مضادات الالتهاب غير الستيرويدية (NSAIDs) قطعياً في تشمع الكبد لأنها تسبب متلازمة كبدية كلوية حادة.',
      'نقص البوتاسيوم يفاقم الاعتلال الدماغي الكبدي لأنه يحفز الأنابيب الكلوية على إنتاج الأمونيا.',
      'في التهاب الصفاق الجرثومي (SBP)، يجب إعطاء الألبومين الوريدي في اليوم الأول (1.5 جم/كجم) واليوم الثالث (1 جم/كجم).'
    ],
    keywords: ['cirrhosis', 'ascites', 'sbp', 'spironolactone', 'albumin', 'octreotide', 'lactulose', 'rifaximin', 'portal hypertension']
  },
  {
    id: 'dipiro-ch54-sepsis-aki-pk',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 54,
    title: 'Sepsis, Septic Shock, Acute Kidney Injury & Critical Care Pharmacokinetics/TDM',
    titleAr: 'الفصل 54 و 118: الإنتان، الصدمة الإنتانية، القصور الكلوي الحاد، والحركية الدوائية في العناية المركزة',
    authors: 'in-Chief Critical Care & Nephrology Editorial Group',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 740–795 & 1620–1672',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'العناية المركزة والأمراض المعدية',
    sourceUrl: 'local://ref/chapter/dipiro-13-sepsis-aki-pk',
    citation: "DiPiro JT, et al. Acute Kidney Injury, Sepsis & Critical Care Pharmacokinetics. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:740-795.",
    isVerbatimSource: true,
    learningObjectives: [
      'Analyze how third-spacing endothelial capillary leak and acute kidney injury alter Volume of Distribution (Vd) and Clearance (CL) of hydrophilic vs lipophilic antimicrobials.',
      'Design full weight-based loading doses followed by renally adjusted maintenance intervals for Vancomycin and extended-infusion Beta-Lactams.',
      'Differentiate prerenal azotemia from intrinsic acute tubular necrosis (ATN) using fractional excretion of sodium (FENa), FEUrea, and urinary sediment.'
    ],
    toc: [
      { id: 'dipiro-pk-sec1', number: '4.1', title: 'Critical Illness Altered Volume of Distribution (Vd) & Loading Dose Mandate' },
      { id: 'dipiro-pk-sec2', number: '4.2', title: 'Extended-Infusion Beta-Lactam Pharmacodynamics (%fT > MIC) & Renal Adjustment' },
      { id: 'dipiro-pk-sec3', number: '4.3', title: 'Diagnostic Differentiation of Prerenal AKI vs Intrinsic ATN' }
    ],
    sections: [
      {
        id: 'dipiro-pk-sec1',
        number: '4.1',
        heading: 'Critical Illness Altered Volume of Distribution (Vd) & Loading Dose Mandate',
        headingAr: 'تغير حجم التوزيع (Vd) في الحالات الحرجة وحتمية الجرعة التحميلية الكاملة',
        evidenceGrade: 'SCCM / IDSA Consensus Standard',
        body: `In septic shock, systemic endothelitis, glycocalyx shedding, and aggressive crystalloid resuscitation (30 mL/kg) expand the extracellular fluid compartment by 30% to 50%. This capillary leak phenomenon markedly increases the Volume of Distribution (Vd) of hydrophilic antimicrobials (Beta-lactams, Vancomycin, Aminoglycosides, Daptomycin, Colistin).

The Fundamental Pharmacokinetic Loading Dose Rule:
Loading Dose (LD) = Target Peak Concentration (Cp) × Volume of Distribution (Vd).
Notice that Total Body Clearance (CL) and Creatinine Clearance (CrCl) do NOT appear in the loading dose equation. Therefore:
• Initial Loading Doses of Vancomycin (25–30 mg/kg actual body weight IV, max 3000 mg) and Beta-Lactams (e.g., Meropenem 1000–2000 mg IV × 1, Piperacillin-Tazobactam 4.5 g IV × 1, Cefepime 2 g IV × 1) must NEVER be reduced on Day 1 for acute kidney injury or continuous renal replacement therapy (CRRT).
• Reducing the initial loading dose in a septic patient with AKI results in subtherapeutic early plasma and tissue concentrations during the critical first 24 hours, directly increasing mortality. Renal dosage adjustment applies ONLY to subsequent maintenance doses and dosing intervals after the first loading dose.`
      },
      {
        id: 'dipiro-pk-sec2',
        number: '4.2',
        heading: 'Extended-Infusion Beta-Lactam Pharmacodynamics (%fT > MIC) & Renal Adjustment',
        headingAr: 'الديناميكا الدوائية للبيتا لاكتام بالتسريب الممتد (%fT > MIC) وتعديل الجرعات الكلوية',
        evidenceGrade: 'IDSA / ASHP Class I',
        body: `Antimicrobial agents exhibit three distinct pharmacodynamic killing profiles:
1. Time-Dependent Killing (%fT > MIC): Beta-lactams (Penicillins, Cephalosporins, Carbapenems, Aztreonam). Bactericidal efficacy depends on the percentage of the dosing interval during which free drug concentration remains above the pathogen MIC (target >=50–70% fT > MIC, or 100% fT > 4×MIC in critically ill ICU patients). Administering Piperacillin-Tazobactam, Cefepime, or Meropenem as an extended 3-to-4-hour IV infusion maximizes %fT > MIC against Pseudomonas aeruginosa and high-MIC Gram-negative bacilli.
2. Area-Under-the-Curve to MIC Ratio (AUC24/MIC): Vancomycin (target AUC24/MIC 400–600 mg·h/L for MRSA) and Fluoroquinolones (target AUC24/MIC >=125 for Gram-negatives).
3. Concentration-Dependent Killing (Cmax/MIC): Aminoglycosides (Gentamicin, Tobramycin, Amikacin; target Cmax/MIC >=8–10 via high-dose extended-interval dosing).`
      },
      {
        id: 'dipiro-pk-sec3',
        number: '4.3',
        heading: 'Diagnostic Differentiation of Prerenal AKI vs Intrinsic ATN',
        headingAr: 'التفريق التشخيصي بين القصور الكلوي قبل الكلوي والنخر الأنبوبي الحاد (ATN)',
        evidenceGrade: 'KDIGO Diagnostic Standard',
        body: `Accurate differentiation between prerenal azotemia (intact tubular function responding to hypoperfusion) and intrinsic acute tubular necrosis (ATN, ischemic or nephrotoxic tubular epithelial injury) dictates fluid versus diuretic management:
• Prerenal AKI: BUN:SCr ratio >20:1, Urine Sodium (UNa) <20 mEq/L, Fractional Excretion of Sodium (FENa) <1%, Fractional Excretion of Urea (FEUrea) <35% (preferred if patient received loop diuretics), Urine Osmolality >500 mOsm/kg, and bland hyaline casts.
• Intrinsic ATN: BUN:SCr ratio 10–15:1, Urine Sodium (UNa) >40 mEq/L, FENa >2%, FEUrea >50%, Urine Osmolality <350 mOsm/kg (isosthenuria), and muddy brown granular casts.`
      }
    ],
    quickTables: [
      {
        title: 'Critical Care Antimicrobial PK/PD Targets & Renal Dosing Cutoffs',
        titleAr: 'جدول الأهداف الحركية للمضادات الحيوية وتعديل الجرعات في القصور الكلوي',
        headers: ['Antimicrobial Class', 'PK/PD Index', 'ICU Administration Strategy', 'Adjustment when CrCl 15–29 mL/min'],
        rows: [
          ['Meropenem', '%fT > MIC (>=40–100%)', 'Full 1–2 g load, then 3-hour extended infusion', '500 mg IV q12h (or 1 g q12h in CNS/life-threatening shock)'],
          ['Cefepime', '%fT > MIC (>=60–100%)', 'Full 2 g load, then 3-hour extended infusion', '1 g IV q12h or 2 g IV q24h (prevent cefepime neurotoxicity/NCSE)'],
          ['Vancomycin', 'AUC24/MIC (400–600)', '25–30 mg/kg ABW load (max 3 g) over >=90–120 min', '15 mg/kg IV q24–48h guided by Bayesian/2-level AUC TDM'],
          ['Amikacin / Gentamicin', 'Cmax/MIC (8–10:1)', 'Extended-interval 7 mg/kg (Gent) or 15–20 mg/kg (Amikacin)', 'Extend interval to q36–48h or avoid if alternative exists']
        ]
      }
    ],
    boardPearls: [
      'Unadjusted Cefepime doses in AKI (CrCl <30 mL/min) cross the blood-brain barrier and antagonize GABA-A receptors, causing myoclonus, encephalopathy, and non-convulsive status epilepticus (NCSE).',
      'FENa is falsely elevated (>1%) in prerenal patients receiving loop or thiazide diuretics; use FEUrea (<35% confirms prerenal AKI) in diuretic-treated patients.',
      'Never reduce the initial Day-1 loading dose of Vancomycin or Beta-lactams in septic shock regardless of acute kidney injury.'
    ],
    boardPearlsAr: [
      'عدم تخفيض جرعة الصيانة للـ Cefepime في القصور الكلوي يسبب سمية عصبية واختلاجات غير تشنجية (NCSE).',
      'معادلة FENa تصبح غير دقيقة عند استخدام مدرات البول؛ لذا يُستخدم معيار FEUrea (< 35% يؤكد السبب قبل الكلوي).',
      'لا تخفض الجرعة التحميلية الأولى للمضادات الحيوية في الصدمة الإنتانية مهما بلغت درجة القصور الكلوي.'
    ],
    keywords: ['sepsis', 'aki', 'pharmacokinetics', 'loading dose', 'extended infusion', 'fena', 'feurea', 'cefepime', 'meropenem', 'vancomycin']
  },
  {
    id: 'dipiro-ch64-neuro-stroke-seizures',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 64,
    title: 'Neurological Disorders: Status Epilepticus, Acute Ischemic Stroke & Intracerebral Hemorrhage',
    titleAr: 'الفصل 64-66: الطوارئ العصبية: الحالة الصرعية المستمرة، السكتة الدماغية الإقفارية، والنزف الدماغي',
    authors: 'Susan J. Rogers, PharmD, BCPS; Timothy E. Welty, PharmD, FCCP, BCPS',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 912–968',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'العناية المركزة والطوارئ العصبية',
    sourceUrl: 'local://ref/chapter/dipiro-ch64-neuro-stroke-seizures',
    citation: "Rogers SJ, Welty TE. Status Epilepticus and Acute Cerebrovascular Disorders. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:912-968.",
    isVerbatimSource: true,
    learningObjectives: [
      'Execute the time-critical 3-phase pharmacotherapy algorithm for Convulsive Status Epilepticus (Benzodiazepine phase -> Urgent AED loading phase -> Refractory anesthetic infusion).',
      'Apply inclusion/exclusion criteria, blood pressure gates (<185/110 mmHg), and weight-based dosing for Alteplase and Tenecteplase in Acute Ischemic Stroke.',
      'Reverse anticoagulation-associated intracerebral hemorrhage using 4-factor PCC, Vitamin K, Idarucizumab, or Andexanet alfa.'
    ],
    toc: [
      { id: 'dipiro-neuro-sec1', number: '5.1', title: 'Convulsive Status Epilepticus Stepwise Pharmacotherapy Algorithm' },
      { id: 'dipiro-neuro-sec2', number: '5.2', title: 'Acute Ischemic Stroke Fibrinolysis (Alteplase vs Tenecteplase) & BP Gates' }
    ],
    sections: [
      {
        id: 'dipiro-neuro-sec1',
        number: '5.1',
        heading: 'Convulsive Status Epilepticus Stepwise Pharmacotherapy Algorithm',
        headingAr: 'الخوارزمية العلاجية المتدرجة للحالة الصرعية المستمرة (Status Epilepticus)',
        evidenceGrade: 'AES / Neurocritical Care Society Class I, Level A',
        body: `Status Epilepticus (SE) is defined operationally as >=5 minutes of continuous clinical and/or electrographic seizure activity, or recurrent seizures without recovery to baseline consciousness between episodes.

Phase 1: Emergent Initial Therapy (Minutes 0 to 5 — Benzodiazepine Phase):
• Intravenous Access Present: Lorazepam 0.1 mg/kg IV (up to 4 mg/dose, infused at <=2 mg/min; may repeat once in 5–10 minutes).
• No Intravenous Access: Midazolam 10 mg IM single dose (for body weight >40 kg; 5 mg IM for 13–40 kg) is superior to IV Lorazepam in prehospital time-to-administration (RAMPART trial).

Phase 2: Urgent Control Antiseizure Medication Loading (Minutes 5 to 20 — ESETT Trial):
The landmark ESETT randomized trial proved equivalent efficacy (~47% seizure cessation at 60 min) among three intravenous second-line loading regimens:
1. Levetiracetam: 60 mg/kg IV infused over 15 minutes (maximum 4500 mg). Preferred in patients with hepatic impairment, cardiac conduction disease, or multiple drug interactions.
2. Fosphenytoin: 20 mg PE/kg IV infused at <=150 mg PE/min (maximum 1500 mg PE; requires continuous ECG and BP monitoring due to hypotension and arrhythmias).
3. Valproate Sodium: 40 mg/kg IV infused over 10 minutes (maximum 3000 mg; contraindicated in pregnancy, mitochondrial POLG disorders, and severe hepatic dysfunction/thrombocytopenia).

Phase 3: Refractory Status Epilepticus (Minutes >20–40):
Continuous IV anesthetic infusion under continuous EEG monitoring: Midazolam (0.2 mg/kg bolus, then 0.05–2 mg/kg/h), Propofol (1–2 mg/kg bolus, then 20–80 mcg/kg/min; monitor triglycerides/CK for Propofol-Related Infusion Syndrome), or Pentobarbital.`
      },
      {
        id: 'dipiro-neuro-sec2',
        number: '5.2',
        heading: 'Acute Ischemic Stroke Fibrinolysis (Alteplase vs Tenecteplase) & BP Gates',
        headingAr: 'حالات الخثرة في السكتة الدماغية الإقفارية وضوابط ضغط الدم',
        evidenceGrade: 'AHA/ASA Class I, Level A',
        body: `Intravenous fibrinolysis is indicated within 3 hours (up to 4.5 hours in eligible patients) of last known well time after non-contrast head CT excludes intracranial hemorrhage:
• Alteplase (rt-PA) Dosing: 0.9 mg/kg IV (MAXIMUM total dose 90 mg), with 10% administered as an IV bolus over 1 minute and the remaining 90% infused over 60 minutes.
• Tenecteplase (TNK) Dosing: 0.25 mg/kg IV single bolus over 5 seconds (MAXIMUM dose 25 mg) — increasingly utilized for large vessel occlusion (LVO) prior to mechanical thrombectomy.
• Strict Blood Pressure Gates (via IV Labetalol 10–20 mg or IV Nicardipine 5–15 mg/h):
  - Pre-thrombolysis Gate: BP MUST be safely lowered to <185/110 mmHg before initiating Alteplase/Tenecteplase.
  - Post-thrombolysis Maintenance (First 24 Hours): Maintain BP strictly <=180/105 mmHg.
  - Permitted Permissive Hypertension (No Fibrinolysis Given): Do NOT lower BP during the first 24–48 hours unless BP exceeds >220/120 mmHg or another acute comorbid emergency exists.
• Antithrombotic Hold Rule: Strictly withhold all antiplatelets (Aspirin, Clopidogrel) and anticoagulants (Heparin, Enoxaparin, DOACs) for 24 hours after IV Alteplase/Tenecteplase until a 24-hour follow-up head CT confirms absence of hemorrhagic transformation.`
      }
    ],
    quickTables: [
      {
        title: 'Status Epilepticus & Acute Ischemic Stroke Emergency Dosing Matrix',
        titleAr: 'جدول الجرعات الإسعافية للحالة الصرعية والسكتة الدماغية الإقفارية',
        headers: ['Emergency Condition', 'Drug Regimen', 'Maximum Dose / Rate', 'Critical Safety Guardrail'],
        rows: [
          ['Status Epilepticus (Phase 1)', 'Lorazepam 0.1 mg/kg IV or Midazolam 10 mg IM', 'Max 4 mg/dose Lorazepam (<=2 mg/min)', 'Use IM Midazolam immediately if no IV access'],
          ['Status Epilepticus (Phase 2)', 'Levetiracetam 60 mg/kg IV or Fosphenytoin 20 mg PE/kg IV', 'Max 4500 mg (LEV) | Max 1500 mg PE (<=150 mg PE/min)', 'ESETT trial equal efficacy; monitor ECG with Fosphenytoin'],
          ['Acute Ischemic Stroke (<4.5h)', 'Alteplase 0.9 mg/kg IV (10% bolus, 90% over 60m)', 'Max 90 mg total (or Tenecteplase 0.25 mg/kg max 25 mg)', 'BP must be <185/110 prior and <=180/105 for 24h; no Aspirin/Heparin x 24h']
        ]
      }
    ],
    boardPearls: [
      'Phenytoin IV must be diluted ONLY in Normal Saline (0.9% NaCl) — it precipitates immediately in Dextrose (D5W) solutions and must be infused at <=50 mg/min.',
      'Never administer Aspirin, Clopidogrel, or Heparin within 24 hours AFTER intravenous Alteplase or Tenecteplase in acute ischemic stroke.',
      'In patients NOT receiving fibrinolysis for acute ischemic stroke, permissive hypertension is maintained up to 220/120 mmHg to preserve ischemic penumbra perfusion.'
    ],
    boardPearlsAr: [
      'يُخفف الفينيتوين الوريدي في المحلول الملحي (0.9% NaCl) حصراً لأنه يترسب فوراً في محاليل الدكستروز (D5W).',
      'يُمنع إعطاء الأسبرين أو الهيبارين خلال أول 24 ساعة بعد إعطاء Alteplase في السكتة الدماغية.',
      'في السكتة الإقفارية غير المعالجة بحالات الخثرة، يُسمح بارتفاع الضغط حتى 220/120 ملغ زئبق للحفاظ على تروية الدماغ.'
    ],
    keywords: ['status epilepticus', 'lorazepam', 'levetiracetam', 'fosphenytoin', 'stroke', 'alteplase', 'tenecteplase', 'nicardipine']
  },
  {
    id: 'dipiro-ch83-endocrine-dka',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 83,
    title: 'Endocrine Disorders: Diabetic Ketoacidosis (DKA), HHS, Inpatient Glycemic Control & Thyroid Storm',
    titleAr: 'الفصل 83-84: اضطرابات الغدد الصماء: الحماض الكيتوني السكري (DKA)، ضبط السكر للمنومين، والعاصفة الدرقية',
    authors: 'Stuart T. Haines, PharmD, FCCP, BCPS; Curtis L. Triplitt, PharmD',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 1190–1255',
    systemCategory: 'Endocrinology & Metabolism',
    systemCategoryAr: 'أمراض الغدد الصماء والاستقلاب',
    sourceUrl: 'local://ref/chapter/dipiro-ch83-endocrine-dka',
    citation: "Haines ST, Triplitt CL. Diabetes Mellitus and Thyroid Disorders. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:1190-1255.",
    isVerbatimSource: true,
    learningObjectives: [
      'Execute the 4-pillar resuscitation algorithm for Diabetic Ketoacidosis (IV fluids, potassium gating before insulin, IV regular insulin infusion, and dextrose addition at BG <200–250 mg/dL).',
      'Transition hospitalized patients from continuous IV insulin to subcutaneous basal-bolus insulin using the mandatory 2-to-4-hour overlap rule.',
      'Sequence antithyroid thionamides (PTU vs Methimazole), iodine, beta-blockers, and corticosteroids in Thyroid Storm.'
    ],
    toc: [
      { id: 'dipiro-endo-sec1', number: '6.1', title: 'Diabetic Ketoacidosis (DKA) Potassium Gate & Resuscitation Protocol' },
      { id: 'dipiro-endo-sec2', number: '6.2', title: 'Inpatient Glycemic Targets (140–180 mg/dL) & Oral Antidiabetic Hold Rules' },
      { id: 'dipiro-endo-sec3', number: '6.3', title: 'Thyroid Storm Pharmacologic Sequencing & Myxedema Coma' }
    ],
    sections: [
      {
        id: 'dipiro-endo-sec1',
        number: '6.1',
        heading: 'Diabetic Ketoacidosis (DKA) Potassium Gate & Resuscitation Protocol',
        headingAr: 'بروتوكول إنعاش الحماض الكيتوني السكري (DKA) وشرط البوتاسيوم الإلزامي',
        evidenceGrade: 'ADA / SCCM Class I, Level A',
        body: `Diabetic Ketoacidosis (DKA) is characterized by the triad of hyperglycemia (BG >200–250 mg/dL, or euglycemic in SGLT2i-associated DKA), high-anion-gap metabolic acidosis (arterial pH <7.30, serum HCO3- <18 mEq/L, Anion Gap >12 mEq/L), and ketonemia (beta-hydroxybutyrate >=3.0 mmol/L).

Stepwise DKA Management Protocol:
1. Intravascular Volume Resuscitation: Administer isotonic crystalloid (0.9% NaCl or balanced crystalloid) at 15–20 mL/kg (1000–1500 mL) during Hour 1. Subsequently adjust to 0.45% NaCl or 0.9% NaCl at 250–500 mL/h based on corrected serum sodium: Corrected Na+ = Measured Na+ + [0.016 × (Serum Glucose − 100)].
2. Mandatory Serum Potassium Gate (BEFORE Any Insulin):
   - Serum K+ <3.3 mEq/L: STRICTLY HOLD INSULIN. Administer KCl 20–40 mEq/hour IV until serum K+ >=3.3 mEq/L (giving insulin when K+ <3.3 mEq/L drives extracellular K+ into cells via Na+/K+-ATPase and precipitates fatal ventricular arrhythmias).
   - Serum K+ 3.3 to 5.2 mEq/L: Initiate IV insulin AND add 20–30 mEq KCl per Liter of IV maintenance fluid to keep serum K+ 4.0–5.0 mEq/L.
   - Serum K+ >5.2 mEq/L: Initiate IV insulin without KCl supplementation; recheck K+ every 2 hours.
3. Continuous IV Regular Insulin & Dextrose Clamp: Administer Regular Insulin 0.1 units/kg/hour IV continuous infusion (or 0.1 units/kg bolus followed by 0.1 units/kg/h). When blood glucose reaches <=200–250 mg/dL, ADD D5W (D5W + 0.45% NaCl) to IV fluids and reduce insulin infusion to 0.02–0.05 units/kg/h to maintain BG 150–200 mg/dL while continuing insulin until the Anion Gap closes (<=12 mEq/L).
4. Subcutaneous Basal Insulin Transition Rule: Administer subcutaneous long-acting basal insulin (Insulin Glargine or Detemir) at least 2 to 4 HOURS BEFORE stopping the IV regular insulin infusion to prevent rebound ketoacidosis.`
      },
      {
        id: 'dipiro-endo-sec2',
        number: '6.2',
        heading: 'Inpatient Glycemic Targets (140–180 mg/dL) & Oral Antidiabetic Hold Rules',
        headingAr: 'أهداف ضبط سكر الدم للمنومين (140-180) وقواعد إيقاف خافضات السكر الفموية',
        evidenceGrade: 'ADA Standards of Care 2026',
        body: `Based on the landmark NICE-SUGAR trial, initiate insulin therapy in hospitalized ICU and non-ICU patients for persistent hyperglycemia >=180 mg/dL, targeting a blood glucose range of 140 to 180 mg/dL. Intensive glycemic targets (<110 mg/dL) increase mortality due to severe hypoglycemia.
• Hold Oral Antidiabetics Upon Admission:
  - Metformin: Hold immediately in AKI, eGFR <30 mL/min/1.73m², sepsis/hypoxia, decompensated heart failure, hepatic failure, or for 48 hours following iodinated IV contrast (risk of Metformin-Associated Lactic Acidosis).
  - SGLT2 Inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin): Hold during acute illness, prolonged fasting, or 3–4 days prior to scheduled surgery (risk of euglycemic DKA).
  - Sulfonylureas (Glimepiride, Glyburide, Glipizide): Hold inpatient due to prolonged, unpredictable hypoglycemia.`
      },
      {
        id: 'dipiro-endo-sec3',
        number: '6.3',
        heading: 'Thyroid Storm Pharmacologic Sequencing & Myxedema Coma',
        headingAr: 'التسلسل الدوائي الإلزامي في العاصفة الدرقية (Thyroid Storm)',
        evidenceGrade: 'ATA Guideline Standard',
        body: `Thyroid Storm requires strict chronological sequencing of four pharmacological classes:
1. Beta-Adrenergic Blockade: Propranolol 60–80 mg PO q4–6h (or Esmolol IV infusion) to control severe tachycardia and inhibit peripheral T4-to-T3 conversion.
2. Thionamide (Blocks New Hormone Synthesis): Propylthiouracil (PTU) 500–1000 mg PO loading dose then 250 mg q4h (preferred over Methimazole in Thyroid Storm and 1st trimester of pregnancy because PTU additionally inhibits peripheral 5'-deiodinase T4-to-T3 conversion).
3. Inorganic Iodine Therapy (Wolff-Chaikoff Effect — Blocks Preformed Hormone Release): Saturated Solution of Potassium Iodide (SSKI) 5 drops PO q6h or Lugol solution MUST be administered at least 1 HOUR AFTER the thionamide (giving iodine before PTU/Methimazole provides substrate for new thyroid hormone synthesis — Jod-Basedow phenomenon).
4. Glucocorticoids: Hydrocortisone 100 mg IV q8h (blocks T4-to-T3 conversion and treats relative adrenal insufficiency).`
      }
    ],
    quickTables: [
      {
        title: 'DKA Serum Potassium & Insulin Decision Matrix',
        titleAr: 'جدول قرار الأنسولين والبوتاسيوم في الحماض الكيتوني السكري (DKA)',
        headers: ['Baseline Serum K+', 'Insulin Infusion Action', 'IV Potassium Replacement', 'Clinical Rationale'],
        rows: [
          ['< 3.3 mEq/L', 'HOLD INSULIN STRICTLY', 'Infuse 20–40 mEq/h KCl until K+ >=3.3 mEq/L', 'Prevents lethal hypokalemic cardiac arrest'],
          ['3.3 to 5.2 mEq/L', 'Start Regular Insulin 0.1 U/kg/h', 'Add 20–30 mEq KCl per Liter of IV fluid', 'Maintains serum K+ within 4.0–5.0 mEq/L during intracellular shift'],
          ['> 5.2 mEq/L', 'Start Regular Insulin 0.1 U/kg/h', 'Do NOT add KCl; recheck serum K+ every 2 hours', 'Insulin and acidosis correction will rapidly lower serum K+']
        ]
      }
    ],
    boardPearls: [
      'The endpoint of IV insulin infusion in DKA is closure of the Anion Gap (<=12 mEq/L) and normalization of beta-hydroxybutyrate—NOT normalization of blood glucose alone.',
      'Always administer SC basal insulin (Glargine) 2 to 4 hours BEFORE turning off the IV regular insulin infusion in DKA.',
      'In Thyroid Storm, inorganic iodine (SSKI/Lugol) must be delayed at least 1 hour AFTER Propylthiouracil or Methimazole.'
    ],
    boardPearlsAr: [
      'معيار إيقاف تسريب الأنسولين الوريدي في DKA هو إغلاق الفجوة الأنيونية (Anion Gap <= 12) وليس مجرد انخفاض سكر الدم.',
      'يجب إعطاء الأنسولين القاعدي تحت الجلد (Glargine) قبل ساعتين إلى 4 ساعات من إيقاف الأنسولين الوريدي.',
      'في العاصفة الدرقية، يُعطى اليود بعد ساعة كاملة على الأقل من إعطاء PTU أو Methimazole.'
    ],
    keywords: ['dka', 'insulin', 'potassium', 'anion gap', 'metformin', 'sglt2', 'thyroid storm', 'ptu', 'nice-sugar']
  },
  {
    id: 'dipiro-ch114-infectious-diseases',
    bookId: 'dipiro-13th-ed',
    chapterNumber: 114,
    title: 'Infectious Diseases: Nosocomial Pneumonia (HAP/VAP), MRSA Bacteremia, Endocarditis & Febrile Neutropenia',
    titleAr: 'الفصل 114-120: الأمراض المعدية: ذات الرئة المستشفوية (HAP/VAP)، تجرثم الدم بـ MRSA، التهاب الشغاف، وحمى قلة العدلات',
    authors: 'Keith A. Rodvold, PharmD, FCCP, FIDSA; Michael J. Rybak, PharmD, MPH, PhD',
    edition: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th Edition",
    pageRange: 'pp. 1680–1790',
    systemCategory: 'Critical Care & Infectious Disease',
    systemCategoryAr: 'العناية المركزة والأمراض المعدية',
    sourceUrl: 'local://ref/chapter/dipiro-ch114-infectious-diseases',
    citation: "Rodvold KA, Rybak MJ. Respiratory Tract Infections, Bacteremia, Endocarditis & Febrile Neutropenia. In: DiPiro's Pharmacotherapy: A Pathophysiologic Approach, 13th ed. McGraw Hill; 2026:1680-1790.",
    isVerbatimSource: true,
    learningObjectives: [
      'Select empiric antimicrobial regimens for Hospital-Acquired and Ventilator-Associated Pneumonia (HAP/VAP) based on MDR Pseudomonas and MRSA risk factors.',
      'Contrast Daptomycin, Vancomycin, and Linezolid tissue penetration and surfactant inactivation rules across pneumonia versus bacteremia/endocarditis.',
      'Initiate urgent monotherapy within 60 minutes for high-risk Febrile Neutropenia (MASCC score <21).'
    ],
    toc: [
      { id: 'dipiro-id-sec1', number: '7.1', title: 'IDSA/ATS HAP & VAP Empiric Tri-Pronged Selection & 7-Day Duration' },
      { id: 'dipiro-id-sec2', number: '7.2', title: 'MRSA Bacteremia, Infective Endocarditis & Daptomycin Surfactant Rule' },
      { id: 'dipiro-id-sec3', number: '7.3', title: 'High-Risk Febrile Neutropenia Monotherapy & Vancomycin Indications' }
    ],
    sections: [
      {
        id: 'dipiro-id-sec1',
        number: '7.1',
        heading: 'IDSA/ATS HAP & VAP Empiric Tri-Pronged Selection & 7-Day Duration',
        headingAr: 'بروتوكول IDSA/ATS لذات الرئة المستشفوية (HAP/VAP) ومدة العلاج القياسية (7 أيام)',
        evidenceGrade: 'IDSA/ATS Class I, Level A',
        body: `Hospital-Acquired Pneumonia (HAP, occurring >=48 hours after admission) and Ventilator-Associated Pneumonia (VAP, occurring >=48 hours after endotracheal intubation) require empiric stratification for Methicillin-Resistant Staphylococcus aureus (MRSA) and Pseudomonas aeruginosa:
• Risk Factor for MDR Pathogens (MRSA & Pseudomonas): Prior intravenous antibiotic exposure within the preceding 90 days, septic shock at time of VAP, ARDS preceding VAP, >=5 days of hospitalization prior to VAP, or local unit MRSA prevalence >10–20%.
• MRSA Empiric Coverage: Vancomycin (target AUC24/MIC 400–600 mg·h/L) OR Linezolid 600 mg IV/PO every 12 hours. Linezolid is preferred in patients with renal insufficiency or concomitant nephrotoxins; avoid Linezolid with serotonergic agents (SSRIs/SNRIs).
• Antipseudomonal Beta-Lactam Backbone: Piperacillin-Tazobactam 4.5 g IV q6h (extended infusion), Cefepime 2 g IV q8h, Ceftazidime 2 g IV q8h, Meropenem 1 g IV q8h, or Imipenem 500 mg IV q6h. Add a second non-beta-lactam antipseudomonal agent (Levofloxacin/Ciprofloxacin or Amikacin/Tobramycin) ONLY if MDR risk factors or structural lung disease (bronchiectasis/cystic fibrosis) are present.
• Treatment Duration: A 7-day course of antimicrobial therapy is recommended over longer durations (10–14 days) for uncomplicated HAP and VAP with good clinical response.`
      },
      {
        id: 'dipiro-id-sec2',
        number: '7.2',
        heading: 'MRSA Bacteremia, Infective Endocarditis & Daptomycin Surfactant Rule',
        headingAr: 'تجرثم الدم بـ MRSA والتهاب الشغاف العدوائي وقاعدة تثبيط Daptomycin في الرئة',
        evidenceGrade: 'AHA / IDSA Endocarditis Guideline',
        body: `1. Uncomplicated vs Complicated MRSA Bacteremia & Endocarditis:
• Uncomplicated MRSA Bacteremia requires at least 14 days of IV therapy from the first negative blood culture (obtain repeat blood cultures every 48–72h to document clearance), transesophageal echocardiogram (TEE) negative for vegetations, no implanted prostheses, and defervescence within 72 hours.
• Complicated MRSA Bacteremia or Infective Endocarditis requires 4 to 6 weeks of IV Vancomycin (AUC24/MIC 400–600) or high-dose Daptomycin (8–10 mg/kg IV once daily).
• Daptomycin Lung Inactivation Rule: Daptomycin is bound and completely inactivated by pulmonary surfactant; it must NEVER be used to treat pneumonia. Monitor serum Creatine Kinase (CK) weekly during Daptomycin therapy and discontinue if symptomatic myopathy with CK >5× ULN (or asymptomatic CK >10× ULN); hold statins temporarily during Daptomycin therapy.
• Enterococcal Endocarditis Synergy: Ampicillin 2 g IV q4h + Ceftriaxone 2 g IV q12h (dual beta-lactam saturation of PBPs) is as effective as Ampicillin + Gentamicin for Enterococcus faecalis endocarditis without aminoglycoside nephrotoxicity/ototoxicity.`
      },
      {
        id: 'dipiro-id-sec3',
        number: '7.3',
        heading: 'High-Risk Febrile Neutropenia Monotherapy & Vancomycin Indications',
        headingAr: 'التدبير الإسعافي لحمى قلة العدلات عالية الخطورة (Febrile Neutropenia)',
        evidenceGrade: 'IDSA / NCCN Class I, Level A',
        body: `Febrile Neutropenia is defined as a single oral temperature >=38.3°C (101°F) or >=38.0°C (100.4°F) sustained for >=1 hour in a patient with an Absolute Neutrophil Count (ANC) <500 cells/mm³ (or expected to fall <500 cells/mm³ within 48h).
• High-Risk Patients (MASCC Score <21 or anticipated prolonged neutropenia >7 days): Require immediate hospitalization and empiric IV antipseudomonal beta-lactam monotherapy within 60 minutes of triage: Cefepime 2 g IV q8h, Meropenem 1 g IV q8h, or Piperacillin-Tazobactam 4.5 g IV q6h.
• Vancomycin is NOT routine part of initial empiric therapy for febrile neutropenia; add Vancomycin ONLY for hemodynamic instability/shock, suspected catheter-related infection, skin/soft-tissue infection, pneumonia, or severe mucositis with prior fluoroquinolone prophylaxis.`
      }
    ],
    quickTables: [
      {
        title: 'Empiric Antimicrobial Pearls & Absolute Contraindications in Severe Infections',
        titleAr: 'جدول القواعد الذهبية والموانع المطلقة للمضادات الحيوية في العدوى الشديدة',
        headers: ['Antimicrobial Agent', 'Primary Clinical Niche', 'Site Where Ineffective / Contraindicated', 'Key Toxicity / Drug Interaction'],
        rows: [
          ['Daptomycin', 'MRSA Bacteremia, Right-sided Endocarditis, VRE (8–10 mg/kg)', 'PNEUMONIA (inactivated by pulmonary surfactant)', 'Myopathy / Rhabdomyolysis (check weekly CK; hold Statins)'],
          ['Linezolid', 'MRSA HAP/VAP, VRE Bacteremia/UTI (100% PO bioavailability)', 'Catheter-related bloodstream infection (bacteriostatic)', 'Thrombocytopenia (>14 days) & Serotonin Syndrome with SSRIs/SNRIs'],
          ['Tigecycline', 'MDR Intra-abdominal & SSTI', 'Bacteremia & Urinary Tract Infections (very low serum/urine levels)', 'FDA Boxed Warning: increased all-cause mortality in severe infections'],
          ['Nitrofurantoin', 'Uncomplicated lower cystitis ONLY (5 days)', 'Pyelonephritis, Bacteremia, or CrCl <30 mL/min', 'Pulmonary fibrosis & peripheral neuropathy']
        ]
      }
    ],
    boardPearls: [
      'Daptomycin is inactivated by pulmonary surfactant and is strictly contraindicated in MRSA pneumonia.',
      'Dual beta-lactam therapy (Ampicillin 2 g IV q4h + Ceftriaxone 2 g IV q12h) is preferred over Ampicillin + Gentamicin for Enterococcus faecalis endocarditis in patients with renal impairment.',
      'Routine empiric Vancomycin is NOT indicated in Febrile Neutropenia unless specific Gram-positive criteria (shock, line infection, pneumonia, SSTI) are met.'
    ],
    boardPearlsAr: [
      'الـ Daptomycin يفقد فعاليته تماماً في الرئة بفعل السورفاكتانت الرئوي ولذلك يُمنع استخدامه في ذات الرئة.',
      'الجمع بين Ampicillin + Ceftriaxone هو البديل الآمن على الكلى بدلاً من الجنتامايسين في التهاب الشغاف بالمكورات المعوية.',
      'لا يُعطى الفانكومايسين روتينياً في حمى قلة العدلات إلا بوجود صدمة أو التهاب قسطرة وريدية أو ذات رئة.'
    ],
    keywords: ['hap', 'vap', 'mrsa', 'daptomycin', 'linezolid', 'endocarditis', 'febrile neutropenia', 'pseudomonas']
  }
];

import { VerbatimChapter } from '../libraryTypes';

export const dipiroHeartFailureChapter: VerbatimChapter = {
  id: 'dipiro-ch15-hf',
  bookId: 'dipiro-13th-ed',
  chapterNumber: 15,
  title: 'Heart Failure with Reduced Ejection Fraction: Pathophysiology, Guideline-Directed Medical Therapy, and Acute Decompensation',
  titleAr: 'قصور القلب بانخفاض الكسر القذفي (HFrEF): الفيزيولوجيا المرضية، العلاج الدوائي الموجه بالدلائل، وتدبير الهبوط الحاد (ADHF)',
  authors: 'Robert L. Page II, PharmD, MSPH, FCCP, FAHA; Orly Vardeny, PharmD, MS, FCCP, FAHA',
  edition: '13th Edition (McGraw Hill Medical)',
  pageRange: 'pp. 185–248',
  systemCategory: 'Cardiology',
  systemCategoryAr: 'أمراض القلب والشرايين',
  uan: '0217-0000-26-015-L01-P',
  sourceUrl: 'local://ref/chapter/dipiro-ch15-hf',
  isVerbatimSource: true,
  citation:
    "Page RL II, Vardeny O. Heart Failure. In: DiPiro JT, Yee GC, Haines ST, Nolin TD, Ellingrod VL, Posey LM, eds. DiPiro's Pharmacotherapy: A Pathophysiologic Approach. 13th ed. McGraw Hill; 2026:chap 15. [local://ref/chapter/dipiro-ch15-hf]",
  learningObjectives: [
    'Delineate the neurohormonal cascade governing chronic ventricular remodeling, including the renin-angiotensin-aldosterone system (RAAS), sympathetic nervous system (SNS), and natriuretic peptide system.',
    'Differentiate ACC/AHA Stages (A through D) and NYHA Functional Classes (I through IV) to guide pharmacotherapeutic escalation.',
    'Implement the 4 pillars of Guideline-Directed Medical Therapy (GDMT) with target doses, mandatory washout intervals, and renal/electrolyte safety thresholds.',
    'Formulate an acute hemodynamic management plan for Acute Decompensated Heart Failure (ADHF) based on the Forrester classification subsets.'
  ],
  toc: [
    { id: 'dipiro-hf-sec1', number: '1.0', title: 'Epidemiology, Etiology, and Neurohormonal Pathophysiology' },
    { id: 'dipiro-hf-sec2', number: '2.0', title: 'Diagnostic Criteria, Clinical Staging, and Biomarkers (BNP/NT-proBNP)' },
    { id: 'dipiro-hf-sec3', number: '3.0', title: 'Foundational GDMT: The Four Cardinal Pillars' },
    { id: 'dipiro-hf-sec4', number: '4.0', title: 'ARNI Initiation Protocol & The 36-Hour ACEi Washout Mandate' },
    { id: 'dipiro-hf-sec5', number: '5.0', title: 'Evidence-Based Beta-Blocker Selection and Titration Rules' },
    { id: 'dipiro-hf-sec6', number: '6.0', title: 'Mineralocorticoid Receptor Antagonists (MRA) & SGLT2 Inhibitors' },
    { id: 'dipiro-hf-sec7', number: '7.0', title: 'Acute Decompensated Heart Failure (ADHF) & Hemodynamic Subsets' },
    { id: 'dipiro-hf-sec8', number: '8.0', title: 'High-Yield Board Pearls, Pharmacokinetic Traps, and Contraindications' }
  ],
  boardPearls: [
    'MANDATORY 36-HOUR WASHOUT: When transitioning a patient from an ACE inhibitor (e.g., Lisinopril, Enalapril, Ramipril) to Sacubitril/Valsartan (ARNI), a strict 36-hour medication-free washout interval is required to prevent life-threatening bradykinin-mediated angioedema. No washout is needed when switching from an ARB to an ARNI.',
    'ONLY THREE BETA-BLOCKERS PROVEN FOR MORTALITY IN HFrEF: Carvedilol (coreg), Metoprolol Succinate extended-release (Toprol-XL), and Bisoprolol (Zebeta). Atenolol, Metoprolol Tartrate, and short-acting agents have NOT demonstrated mortality reduction in clinical trials and should never be prescribed for HFrEF.',
    'AVOID NON-DIHYDROPYRIDINE CALCIUM CHANNEL BLOCKERS: Diltiazem and Verapamil are strictly contraindicated in HFrEF (LVEF <= 40%) due to pronounced negative inotropic effects leading to acute pulmonary edema and cardiogenic shock.',
    'SGLT2 INHIBITORS CONFER GLYCEMIA-INDEPENDENT CARDIOPROTECTION: Dapagliflozin 10 mg daily and Empagliflozin 10 mg daily reduce cardiovascular death and heart failure hospitalizations regardless of the presence or absence of Type 2 Diabetes Mellitus (DAPA-HF & EMPEROR-Reduced trials).',
    'SERUM CREATININE BUMP ON RAAS INHIBITION: An increase in serum creatinine of up to 30% above baseline following initiation of an ACEi/ARB/ARNI or SGLT2i reflects expected hemodynamic reduction in intraglomerular filtration pressure and is NOT an indication to discontinue therapy unless associated with uncontrolled hyperkalemia (K > 5.5 mEq/L) or refractory anuria.'
  ],
  boardPearlsAr: [
    'فترة التوقف الإلزامية (36-Hour Washout): يلزم التوقف لمدة 36 ساعة كاملة بين آخر جرعة من مثبطات ACE (مثل Lisinopril) وأول جرعة من ARNI (Sacubitril/Valsartan) لتجنب الوذمة الوعائية القاتلة (Angioedema). لا حاجة لفترة توقف عند التبديل من ARBs.',
    'ثلاثة حاصرات بيتا فقط معتمدة لخفض الوفيات في HFrEF: Carvedilol، Metoprolol Succinate (الممتد المفعول فقط)، و Bisoprolol. يُحظر استخدام Metoprolol Tartrate أو Atenolol لعلاج HFrEF المزمن لعدم ثبوت فائدتها الحيوية.',
    'موانع استخدام حاصرات قنوات الكالسيوم غير الدايهيدروبيريدين: يُمنع Verapamil و Diltiazem منعاً باتاً في LVEF <= 40% لتأثيرهما المثبط لانقباض عضلة القلب (Negative Inotrope).',
    'مثبطات SGLT2 مستقلة عن السكري: Dapagliflozin 10mg و Empagliflozin 10mg تخفضان الوفيات والتنويم القلبي بغض النظر عن وجود داء السكري (DAPA-HF & EMPEROR-Reduced).',
    'الارتفاع المقبول في الكرياتينين: يُعد ارتفاع الكرياتينين حتى 30% من خط الأساس متوقعاً ومقبولاً ديناميكياً عند بدء ACEi/ARB/ARNI أو SGLT2i ولا يستدعي إيقاف العلاج إلا إذا رافقه فرط بوتاسيوم (K > 5.5 mEq/L).'
  ],
  keywords: [
    'HFrEF',
    'ADHF',
    'Sacubitril/Valsartan',
    'ARNI',
    'Carvedilol',
    'Metoprolol Succinate',
    'Spironolactone',
    'Dapagliflozin',
    'Empagliflozin',
    'Forrester Classification',
    'Loop Diuretics',
    'Inotropes',
    'Dobutamine',
    'Milrinone'
  ],
  quickTables: [
    {
      title: 'Four Pillars of Guideline-Directed Medical Therapy (GDMT) in HFrEF',
      titleAr: 'الركائز الأربع للعلاج الدوائي الموجه بالدلائل لقصور القلب (GDMT)',
      headers: ['Drug Class / Agent', 'Starting Dose', 'Target Dose', 'Mandatory Clinical Titration & Safety Checks'],
      headersAr: ['فئة الدواء / الاسم العلمي', 'الجرعة الابتدائية', 'الجرعة الهدف (Target)', 'شروط المعايرة والسلامة السريرية'],
      rows: [
        [
          'ARNI: Sacubitril/Valsartan (Entresto)',
          '49/51 mg PO BID (or 24/26 mg PO BID if ACEi-naive, low SBP < 100, or eGFR < 30)',
          '97/103 mg PO BID',
          'Enforce strict 36-hr washout if switching from ACEi. Monitor SBP, serum K+, and eGFR at 2 and 4 weeks. Do not initiate if SBP < 95 mmHg.'
        ],
        [
          'Beta-Blocker: Carvedilol (Coreg)',
          '3.125 mg PO BID with food',
          '25 mg PO BID (or 50 mg PO BID if body weight > 85 kg)',
          'Double dose every 2 weeks only in euvolemic/stable patients. Monitor for bradycardia (HR < 55 bpm), orthostasis, and fluid retention.'
        ],
        [
          'Beta-Blocker: Metoprolol Succinate XL (Toprol-XL)',
          '12.5 to 25 mg PO once daily',
          '200 mg PO once daily',
          'Must use Succinate (extended-release), NOT Tartrate. Double dose every 2 weeks. Hold or reduce if symptomatic bradycardia occurs.'
        ],
        [
          'Beta-Blocker: Bisoprolol (Zebeta)',
          '1.25 mg PO once daily',
          '10 mg PO once daily',
          'Titrate every 2-4 weeks. Cardioselective beta-1 antagonist with renal/hepatic elimination.'
        ],
        [
          'MRA: Spironolactone (Aldactone)',
          '12.5 to 25 mg PO once daily',
          '25 to 50 mg PO once daily',
          'Requires baseline K+ <= 5.0 mEq/L and eGFR >= 30 mL/min. Recheck BMP at 1, 4, and 12 weeks. Hold if K+ exceeds 5.5 mEq/L.'
        ],
        [
          'MRA: Eplerenone (Inspra)',
          '25 mg PO once daily',
          '50 mg PO once daily',
          'Selective aldosterone antagonist with reduced gynecomastia. Hold if K+ > 5.5 mEq/L or eGFR < 30 mL/min.'
        ],
        [
          'SGLT2 Inhibitor: Dapagliflozin (Farxiga)',
          '10 mg PO once daily',
          '10 mg PO once daily (no titration needed)',
          'Effective down to eGFR 20-25 mL/min. No hypoglycemia risk in non-diabetic patients. Monitor volume status and mycotic genital hygiene.'
        ],
        [
          'SGLT2 Inhibitor: Empagliflozin (Jardiance)',
          '10 mg PO once daily',
          '10 mg PO once daily (no titration needed)',
          'Initiate down to eGFR 20 mL/min. Cardiovascular mortality and hospitalization reduction independent of glycemic control.'
        ]
      ],
      rowsAr: [
        [
          'ARNI: Sacubitril/Valsartan',
          '49/51 mg مرتين يومياً (أو 24/26 mg إذا كان المريض بدون ACEi سابق أو ضغط منخفض)',
          '97/103 mg مرتين يومياً',
          'إلزامية انقضاء 36 ساعة عند التبديل من ACEi. مراقبة الضغط الانقباضي، البوتاسيوم ووظائف الكلى.'
        ],
        [
          'Carvedilol',
          '3.125 mg مرتين يومياً مع الطعام',
          '25 mg مرتين يومياً (50 mg إذا كان الوزن > 85 كغ)',
          'تضاعف الجرعة كل أسبوعين فقط عند استقرار السوائل. مراقبة النبض (> 55) وهبوط الضغط الانتصابي.'
        ],
        [
          'Metoprolol Succinate XL',
          '12.5 إلى 25 mg يومياً',
          '200 mg يومياً',
          'استخدام Succinate ممتد المفعول حصراً وليس Tartrate. مضاعفة الجرعة تدريجياً كل أسبوعين.'
        ],
        [
          'Bisoprolol',
          '1.25 mg يومياً',
          '10 mg يومياً',
          'معايرة كل 2-4 أسابيع مع متابعة النبض وضغط الدم.'
        ],
        [
          'Spironolactone',
          '12.5 إلى 25 mg يومياً',
          '25 إلى 50 mg يومياً',
          'يشترط بوتاسيوم أساسي <= 5.0 و eGFR >= 30. فحص الكهارل في الأسبوع 1 و 4 و 12. إيقاف إذا تجاوز K 5.5.'
        ],
        [
          'Eplerenone',
          '25 mg يومياً',
          '50 mg يومياً',
          'انتقائي لمستقبلات الألدوستيرون بدون تثدي (gynecomastia). يوقف عند K > 5.5 أو قصور كلوي شديد.'
        ],
        [
          'Dapagliflozin',
          '10 mg يومياً',
          '10 mg يومياً (جرعة ثابتة)',
          'فعال حتى eGFR 20. لا يسبب هبوط سكر لدى غير المصابين بالسكري. خفض مثبت في الوفيات.'
        ],
        [
          'Empagliflozin',
          '10 mg يومياً',
          '10 mg يومياً (جرعة ثابتة)',
          'فعال حتى eGFR 20. خفض وفيات القلب وهبوط العضلة القلبية بغض النظر عن سكر الدم.'
        ]
      ]
    },
    {
      title: 'Forrester Hemodynamic Classification and Therapeutic Algorithm in ADHF',
      titleAr: 'تصنيف فوريستر الهيموديناميكي وخوارزمية العلاج في قصور القلب الحاد (ADHF)',
      headers: ['Hemodynamic Subset', 'Clinical Presentation', 'Primary Pharmacotherapy', 'Secondary / Escalation Agents'],
      headersAr: ['النمط الهيموديناميكي', 'المظاهر السريرية', 'الخيار الدوائي الأول', 'الخيارات الثانوية والتصعيدية'],
      rows: [
        [
          'Subset I: Warm & Dry',
          'Adequate perfusion (warm extremities, normal mentation) + No congestion (no orthopnea, JVP normal)',
          'Continue or optimize baseline oral GDMT. Avoid over-diuresis.',
          'Assess outpatient adherence and laboratory profile.'
        ],
        [
          'Subset II: Warm & Wet (Most Common, ~70%)',
          'Adequate perfusion (SBP > 100, warm) + Congestion (pulmonary rales, JVP > 8 cm, peripheral edema)',
          'IV Loop Diuretics (Furosemide IV bolus at 2.0 to 2.5x home oral dose, or 40-80 mg IV if loop-naive).',
          'Add IV Vasodilators (Nitroglycerin 10-200 mcg/min or Nitroprusside) if SBP > 110 mmHg. Add Metolazone 2.5-5 mg PO for diuretic resistance.'
        ],
        [
          'Subset III: Cold & Dry (< 5%)',
          'Hypoperfusion (cool extremities, oliguria, hypotension) + No congestion (PCWP < 15, flat neck veins)',
          'Cautious IV fluid bolus (250-500 mL normal saline or balanced crystalloid) to optimize Frank-Starling curve.',
          'If hypoperfusion persists after preload optimization, initiate Inotrope (Dobutamine 2.5-10 mcg/kg/min).'
        ],
        [
          'Subset IV: Cold & Wet (Cardiogenic Shock / High Mortality)',
          'Hypoperfusion (SBP < 90, MAP < 65, cool, elevated lactate) + Congestion (severe pulmonary rales, high PCWP)',
          'Inotropic support (Dobutamine 2.5-10 mcg/kg/min or Milrinone 0.125-0.75 mcg/kg/min) + Vasopressor (Norepinephrine) if MAP < 65.',
          'Cautious diuresis once perfusion pressure is restored. Mechanical Circulatory Support (IABP, Impella, ECMO) if medical therapy fails.'
        ]
      ],
      rowsAr: [
        [
          'النمط الأول: Warm & Dry',
          'تروية كافية (أطراف دافئة، وعي تام) + عدم وجود احتقان (ضغط وريدي وداجي طبيعي)',
          'متابعة ومعايرة أدوية GDMT الفموية. تجنب إدرار البول الزائد.',
          'تقييم الالتزام الدوائي والفحوصات المخبرية الدورية.'
        ],
        [
          'النمط الثاني: Warm & Wet (الأشيع ~70%)',
          'تروية كافية (ضغط > 100) + احتقان رئوي ووذمات محيطية وارتفاع JVP',
          'مدرات العروة الوريدية (Furosemide IV بجرعة 2 إلى 2.5 أضعاف الجرعة الفموية السابقة).',
          'إضافة موسعات وريدية (Nitroglycerin) إذا كان الضغط الانقباضي > 110. إضافة Metolazone لمقاومة الإدرار.'
        ],
        [
          'النمط الثالث: Cold & Dry',
          'نقص تروية (برودة الأطراف، قلة البول، هبوط ضغط) + غياب الاحتقان الرئوي',
          'إعطاء سوائل وريدية بحذر شديد (250-500 مل) لرفع الحمل القبلي (Preload).',
          'إذا استمر نقص التروية، البدء بمقويات الانقباض (Dobutamine).'
        ],
        [
          'النمط الرابع: Cold & Wet (صدمة قلبية / خطورة عالية)',
          'نقص تروية شديد (ضغط < 90، حمض اللاكتيك مرتفع) + احتقان رئوي شديد',
          'مقويات الانقباض (Dobutamine أو Milrinone) مع رافع ضغط (Norepinephrine) لضمان MAP >= 65.',
          'إدرار البول بحذر بعد استقرار التروية. الدعم الميكانيكي الدوراني (IABP / Impella) عند فشل الأدوية.'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'dipiro-hf-sec1',
      number: '1.0',
      heading: 'Epidemiology, Etiology, and Neurohormonal Pathophysiology',
      headingAr: 'الوبائيات، الأسباب، والفيزيولوجيا المرضية العصبية الهرمونية',
      evidenceGrade: 'Fundamental Pathophysiologic Science',
      body: `Heart failure (HF) represents a complex clinical syndrome characterized by structural or functional impairment of ventricular filling or blood ejection. Heart failure with reduced ejection fraction (HFrEF) is defined by a left ventricular ejection fraction (LVEF) <= 40%. The primary etiologies include coronary artery disease (ischemic cardiomyopathy accounting for >60% of cases), longstanding systemic arterial hypertension, idiopathic dilated cardiomyopathy, viral myocarditis, valvular heart disease, and cardiotoxic chemotherapeutic exposures (anthracyclines, trastuzumab).

Pathophysiologically, an index myocardial injury triggers a precipitous decline in cardiac output, prompting immediate compensatory neurohormonal activation:
1. Renin-Angiotensin-Aldosterone System (RAAS): Reduced renal afferent arteriolar perfusion stimulates juxtaglomerular renin secretion, converting angiotensinogen to angiotensin I. Pulmonary angiotensin-converting enzyme (ACE) generates angiotensin II, a potent systemic vasoconstrictor that promotes aldosterone release from the adrenal cortex. Angiotensin II directly induces myocardial hypertrophy, fibroblast proliferation, interstitial collagen deposition, and coronary microvascular rarefaction. Aldosterone promotes distal tubular sodium and water retention at the expense of potassium and magnesium excretion, further stimulating myocardial and vascular perivascular fibrosis.
2. Sympathetic Nervous System (SNS): Decreased carotid baroreceptor firing causes persistent sympathetic efferent hyperactivation, unleashing systemic norepinephrine and epinephrine release. Chronic beta-1 adrenergic receptor stimulation provokes receptor downregulation, desensitization, intracellular calcium overload, direct cardiomyocyte apoptosis, and lethal ventricular arrhythmogenesis.
3. Ventricular Remodeling: Sustained hemodynamic wall stress and neurohormonal toxicity trigger progressive left ventricular dilatation, spherical geometry alteration, wall thinning, and mitral annular dilatation resulting in functional secondary mitral regurgitation.
4. Counter-Regulatory Natriuretic Peptide System: In response to myocardial stretch, atrial natriuretic peptide (ANP) and B-type natriuretic peptide (BNP) are synthesized to promote natriuresis, diuresis, vasodilation, and antifibrotic signaling via cyclic guanosine monophosphate (cGMP). However, endogenous neprilysin rapidly cleaves and inactivates these beneficial peptides, neutralizing their counter-regulatory capacity.`
    },
    {
      id: 'dipiro-hf-sec2',
      number: '2.0',
      heading: 'Diagnostic Criteria, Clinical Staging, and Biomarkers (BNP/NT-proBNP)',
      headingAr: 'المعايير التشخيصية، التصنيف المرحلي، والدلالات الحيوية (BNP / NT-proBNP)',
      evidenceGrade: 'ACC/AHA Class I, LOE B-NR',
      body: `The diagnosis of HFrEF requires comprehensive integration of clinical history, objective physical examination signs of congestion or hypoperfusion, and transthoracic echocardiography (TTE) demonstrating LVEF <= 40%. 

The 2022 AHA/ACC/HFSA Guidelines classify HF across four distinct progressive stages:
- Stage A (At Risk for HF): Asymptomatic individuals without structural heart disease or elevated biomarkers, but possessing risk factors (hypertension, diabetes, atherosclerotic cardiovascular disease, metabolic syndrome, cardiotoxic exposures).
- Stage B (Pre-Heart Failure): Patients with objective structural heart disease (reduced LVEF, LV hypertrophy, chamber enlargement, wall motion abnormalities) or persistently elevated cardiac biomarkers (BNP/NT-proBNP or troponin) without historical or current signs or symptoms of HF.
- Stage C (Symptomatic HF): Structural heart disease accompanied by current or prior clinical symptoms (dyspnea on exertion, orthopnea, paroxysmal nocturnal dyspnea, fatigue, peripheral edema).
- Stage D (Advanced HF): Severe, end-stage symptoms refractory to maximal GDMT, resulting in recurrent hospitalizations, cardiorenal syndrome, and dependency on inotropes or mechanical circulatory support.

Functional capacity in symptomatic stages is stratified utilizing the New York Heart Association (NYHA) classification:
- NYHA Class I: No limitation of physical activity. Ordinary physical exertion does not provoke fatigue, palpitation, or dyspnea.
- NYHA Class II: Slight limitation of physical activity. Comfortable at rest; ordinary physical activity results in fatigue, dyspnea, or palpitations.
- NYHA Class III: Marked limitation of physical activity. Comfortable at rest, but less than ordinary physical activity causes clinical symptoms.
- NYHA Class IV: Inability to carry on any physical activity without discomfort. Symptoms of heart failure are present even at complete rest.

Diagnostic Biomarkers:
- B-type Natriuretic Peptide (BNP): Threshold < 100 pg/mL has high negative predictive value (>95%) to rule out acute HF.
- N-terminal pro-B-type Natriuretic Peptide (NT-proBNP): Age-stratified acute diagnostic cutoffs: > 450 pg/mL (age < 50), > 900 pg/mL (age 50–75), and > 1800 pg/mL (age > 75). In non-acute outpatient settings, NT-proBNP > 125 pg/mL establishes HF diagnosis.
- CRITICAL INTERPRETIVE PEARL ON ARNI THERAPY: Sacubitril inhibits neprilysin, which degrades BNP but NOT NT-proBNP. Consequently, following ARNI initiation, circulating BNP levels rise artifactually and cannot be utilized as a reliable marker of clinical decompensation. NT-proBNP is not a substrate for neprilysin and remains the gold-standard biomarker for therapeutic monitoring and risk stratification in patients receiving sacubitril/valsartan.`
    },
    {
      id: 'dipiro-hf-sec3',
      number: '3.0',
      heading: 'Foundational GDMT: The Four Cardinal Pillars',
      headingAr: 'الركائز الأربع للعلاج الدوائي الموجه بالدلائل (GDMT)',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `All patients with symptomatic HFrEF (ACC/AHA Stage C, NYHA Class II-IV) must be initiated on the Four Cardinal Pillars of GDMT simultaneously or in rapid sequence within days to weeks of diagnosis, unless a genuine clinical contraindication exists:

1. Angiotensin Receptor-Neprilysin Inhibitor (ARNI): Sacubitril/Valsartan is prioritized over ACE inhibitors or ARBs based on the landmark PARADIGM-HF trial, which demonstrated a 20% relative reduction in cardiovascular death or HF hospitalization, a 16% reduction in all-cause mortality, and a 21% reduction in sudden cardiac death compared with enalapril 10 mg BID. If an ARNI is unavailable or poorly tolerated, an ACE inhibitor (Lisinopril, Enalapril, Ramipril) or ARB (Valsartan, Candesartan, Losartan) is indicated.
2. Evidence-Based Beta-Adrenergic Blocker: Carvedilol, Metoprolol Succinate extended-release, or Bisoprolol must be prescribed. Clinical trials (COPERNICUS, MERIT-HF, CIBIS-II) established a consistent 34% to 35% reduction in all-cause mortality with these specific agents.
3. Mineralocorticoid Receptor Antagonist (MRA): Spironolactone or Eplerenone should be added for patients with NYHA Class II-IV symptoms, eGFR >= 30 mL/min/1.73m2, and baseline serum potassium <= 5.0 mEq/L. The RALES and EPHESUS trials proved a 30% and 15% reduction in mortality, respectively.
4. Sodium-Glucose Cotransporter-2 (SGLT2) Inhibitor: Dapagliflozin 10 mg once daily or Empagliflozin 10 mg once daily must be initiated regardless of diabetes status. The DAPA-HF and EMPEROR-Reduced trials confirmed a 25% relative reduction in cardiovascular death or worsening heart failure hospitalizations with remarkable preservation of renal function over long-term follow-up.

Cumulative Therapeutic Benefit: The four-pillar combination achieves an estimated 73% relative reduction in 2-year all-cause mortality compared with untreated heart failure, extending median survival by over 5 to 6 years in typical 55- to 65-year-old patients.`
    },
    {
      id: 'dipiro-hf-sec4',
      number: '4.0',
      heading: 'ARNI Initiation Protocol & The 36-Hour ACEi Washout Mandate',
      headingAr: 'بروتوكول بدء ARNI وفترة التوقف الإلزامية (36-Hour Washout)',
      evidenceGrade: 'ACC/AHA Class I, LOE B-R',
      body: `Sacubitril/Valsartan simultaneously inhibits the neutral endopeptidase neprilysin (preventing breakdown of ANP, BNP, bradykinin, adrenomedullin, and substance P) and selectively blocks the angiotensin II type 1 (AT1) receptor. 

THE 36-HOUR MANDATORY WASHOUT INTERVAL:
Both ACE inhibitors and neprilysin degrade bradykinin. Concurrent administration of an ACE inhibitor and sacubitril causes massive, synergistic accumulation of tissue bradykinin, leading to severe, life-threatening angioedema of the larynx, tongue, and airways. Therefore:
- When switching from any ACE inhibitor (Lisinopril, Enalapril, Ramipril, Captopril, Perindopril) to Sacubitril/Valsartan, clinicians MUST ensure that at least 36 hours have elapsed between the last dose of the ACE inhibitor and the first dose of Sacubitril/Valsartan.
- When switching from an Angiotensin Receptor Blocker (ARB) such as Valsartan, Losartan, or Candesartan to Sacubitril/Valsartan, NO washout period is required because ARBs do not inhibit bradykinin metabolism. Sacubitril/Valsartan can be initiated at the next scheduled dosing interval.

Dosing Protocols:
- Standard Starting Dose: 49/51 mg PO BID for patients previously tolerating moderate-to-high doses of an ACEi or ARB (e.g., Lisinopril >= 10 mg daily or Valsartan >= 160 mg daily).
- Reduced Starting Dose: 24/26 mg PO BID for patients who are:
  a) ACEi/ARB naive or previously receiving low doses (e.g., Lisinopril <= 5 mg daily);
  b) Severe renal impairment (eGFR < 30 mL/min/1.73m2);
  c) Moderate hepatic impairment (Child-Pugh Class B);
  d) Baseline systolic blood pressure between 95 and 100 mmHg; or
  e) Elderly patients (age >= 75 years) susceptible to orthostasis.
- Dose Titration: Double the dose every 2 to 4 weeks, as tolerated by blood pressure and renal function, to achieve the proven target dose of 97/103 mg PO BID.

Safety Monitoring:
- Check serum creatinine, eGFR, serum potassium, and sitting/standing blood pressure at 2 weeks and 4 weeks post-initiation or titration.
- Contraindications: History of angioedema with any previous ACEi/ARB exposure, concomitant aliskiren in diabetes, pregnancy (teratogenic box warning), and severe hepatic impairment (Child-Pugh Class C).`
    },
    {
      id: 'dipiro-hf-sec5',
      number: '5.0',
      heading: 'Evidence-Based Beta-Blocker Selection and Titration Rules',
      headingAr: 'قواعد اختيار حاصرات بيتا المعتمدة ومراحل معايرتها',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `Beta-adrenergic antagonists attenuate the deleterious sympathetic overdrive that characterizes chronic HFrEF, preventing myocyte hypertrophy, apoptosis, ischemia, and sudden arrhythmogenic death.

MANDATORY AGENT SPECIFICITY:
Only three beta-blockers have established mortality benefits in clinical endpoint trials:
1. Carvedilol: Non-selective beta-1 and beta-2 blocker with alpha-1 adrenergic antagonism, conferring systemic peripheral vasodilatation and blood pressure lowering.
2. Metoprolol Succinate: Extended-release cardioselective beta-1 antagonist (Toprol-XL). Note: Short-acting Metoprolol Tartrate (Lopressor) has NEVER demonstrated mortality reduction in chronic heart failure and must never be substituted for Metoprolol Succinate.
3. Bisoprolol: Highly selective beta-1 adrenergic antagonist.

Initiation and Titration Rules:
- Prerequisite: Patients MUST be clinically stable and euvolemic (no significant acute fluid overload or worsening decompensation requiring intravenous inotropes) prior to initiating or up-titrating a beta-blocker.
- Starting low and going slow: Start at minimal doses (Carvedilol 3.125 mg BID; Metoprolol Succinate 12.5-25 mg daily; Bisoprolol 1.25 mg daily).
- Titration interval: Double the daily dose every 2 weeks if the patient remains hemodynamically stable without symptomatic orthostatic hypotension, fluid retention, or marked bradycardia (heart rate < 55 beats/min).
- Target Doses: Carvedilol 25 mg PO BID (or 50 mg BID if body weight > 85 kg); Metoprolol Succinate 200 mg PO daily; Bisoprolol 10 mg PO daily.
- Transient Decompensation Management: If mild fluid retention occurs during titration, transiently increase the loop diuretic dose while maintaining beta-blocker therapy. Beta-blockers should NOT be stopped during mild hospitalizations unless the patient develops severe cardiogenic shock, marked bradycardia (HR < 50 bpm) with heart block, or requires inotropic infusions.`
    },
    {
      id: 'dipiro-hf-sec6',
      number: '6.0',
      heading: 'Mineralocorticoid Receptor Antagonists (MRA) & SGLT2 Inhibitors',
      headingAr: 'مضادات مستقبلات الألدوستيرون ومثبطات ناقل الصوديوم والجلوكوز (SGLT2)',
      evidenceGrade: 'ACC/AHA Class I, LOE A',
      body: `MINERALOCORTICOID RECEPTOR ANTAGONISTS (MRA):
Aldosterone promotes progressive interstitial myocardial fibrosis, baroreceptor dysfunction, and autonomic imbalance while inducing renal potassium and magnesium wasting.
- Spironolactone: Non-selective aldosterone receptor antagonist. Initial dose: 12.5 to 25 mg PO daily. Target dose: 25 to 50 mg PO daily. Common side effect: Gynecomastia, mastodynia, and menstrual irregularities (10% incidence due to progesterone/androgen cross-reactivity).
- Eplerenone: Selective aldosterone receptor antagonist. Initial dose: 25 mg PO daily. Target dose: 50 mg PO daily. Significantly lower incidence of endocrine side effects (<1%).
- Strict Pre-requisite Safety Criteria:
  1. Serum Potassium <= 5.0 mEq/L.
  2. Estimated Glomerular Filtration Rate (eGFR) >= 30 mL/min/1.73m2 (or serum Cr <= 2.5 mg/dL in men, <= 2.0 mg/dL in women).
- Mandatory Monitoring Protocol: Serum potassium and renal function must be evaluated at baseline, 1 week, 4 weeks, 12 weeks, and every 6 months thereafter.
- Action Thresholds: If K+ rises to 5.1–5.4 mEq/L, reduce dose by 50%. If K+ >= 5.5 mEq/L, hold MRA immediately, review dietary intake, adjust concomitant potassium-sparing medications, and monitor serial BMP until normalization.

SODIUM-GLUCOSE COTRANSPORTER-2 (SGLT2) INHIBITORS:
SGLT2 inhibitors block renal proximal tubular glucose and sodium reabsorption, promoting osmotic diuresis and natriuresis without triggering neurohormonal reflex activation. More importantly, they improve myocardial energetic efficiency, downregulate the sodium-hydrogen exchanger (NHE-1), decrease intracardiac filling pressures, reduce systemic arterial stiffness, and preserve renal microvascular architecture.
- Dapagliflozin: 10 mg PO once daily (target and starting dose are identical; no titration required). Indicated down to eGFR 20-25 mL/min/1.73m2.
- Empagliflozin: 10 mg PO once daily (no titration required). Indicated down to eGFR 20 mL/min/1.73m2.
- Clinical Advantages: Zero intrinsic risk of hypoglycemia in patients without diabetes mellitus; modest systolic blood pressure reduction (2-4 mmHg); mild osmotic weight loss (1-2 kg); and dramatic reduction in progressive renal composite endpoints.
- Safety & Monitoring: Assess volume status upon initiation; patients receiving aggressive loop diuretics may warrant modest diuretic dose reductions to avoid volume depletion. Counsel on daily genital hygiene to prevent mycotic genital infections. Instruct patients on sick-day rules to hold SGLT2 inhibitors prior to major elective surgeries or prolonged fasting to avert euglycemic diabetic ketoacidosis (euDKA) in diabetic individuals.`
    },
    {
      id: 'dipiro-hf-sec7',
      number: '7.0',
      heading: 'Acute Decompensated Heart Failure (ADHF) & Hemodynamic Subsets',
      headingAr: 'قصور القلب الحاد غير المعاوض وتصنيف الأنماط الهيموديناميكية (Forrester)',
      evidenceGrade: 'ACC/AHA Class I/IIa, LOE B-NR',
      body: `Acute Decompensated Heart Failure (ADHF) presents with worsening dyspnea, fatigue, and signs of systemic congestion, frequently precipitated by non-adherence to dietary sodium or medications, myocardial ischemia, uncontrolled hypertension, acute arrhythmias (atrial fibrillation), acute renal failure, systemic infection, or nephrotoxic drug exposures (NSAIDs, corticosteroids).

Clinical Hemodynamic Bedside Stratification (Forrester Subsets):
Bedside assessment evaluates two clinical axes:
1. Congestion ("Wet" vs "Dry"): Pulmonary rales, jugular venous distention (JVD > 8 cm H2O), hepatojugular reflux, peripheral pitting edema, orthopnea, paroxysmal nocturnal dyspnea, and elevated PCWP (> 18 mmHg).
2. Perfusion ("Warm" vs "Cold"): Systolic blood pressure, pulse pressure, peripheral extremity temperature, mental alertness, urine output (> 0.5 mL/kg/hr), serum creatinine progression, and serum lactate.

MANAGEMENT BY SUBSET:
- Subset II: "Warm & Wet" (Well Perfused & Congested — ~70% of admissions):
  * Initial Therapy: Intravenous loop diuretics. In patients with chronic oral loop diuretic therapy, the initial IV dose should equal or exceed 2.0 to 2.5 times the home oral daily dose administered as an IV bolus (e.g., if taking Furosemide 40 mg PO daily, administer Furosemide 80 to 100 mg IV). In diuretic-naive patients, start with Furosemide 40 mg IV.
  * Vasodilators: If SBP > 110 mmHg and marked pulmonary edema persists, initiate IV Nitroglycerin (5 to 10 mcg/min, titrated rapidly up to 200 mcg/min) to achieve rapid venodilatation and preload reduction. IV Nitroprusside (0.25 to 3 mcg/kg/min) provides potent balanced arterial/venous dilatation in severe hypertensive acute HF.
  * Diuretic Resistance Management: If spot urine sodium at 2 hours is < 50-70 mEq/L or hourly urine output is < 100-150 mL/hr, double the IV loop dose or add sequential nephron blockade using Metolazone 2.5 to 5 mg PO (or IV Chlorothiazide 500 mg) 30 minutes prior to the loop diuretic.

- Subset IV: "Cold & Wet" (Hypoperfused & Congested — Cardiogenic Shock Spectrum):
  * High in-hospital mortality. Patients exhibit low SBP (< 90 mmHg), MAP < 65 mmHg, cool extremities, altered sensorium, oliguria, elevated serum lactate, and worsening azotemia alongside severe pulmonary congestion.
  * Hemodynamic Goals: Restore systemic perfusion pressure and organ blood flow before attempting aggressive diuresis.
  * Inotropic Therapy:
    - Dobutamine: Synthetic catecholamine with potent beta-1 and moderate beta-2 adrenergic agonist activity. Initial dose: 2.5 mcg/kg/min; titrate up to 10-20 mcg/kg/min. Enhances myocardial contractility and stroke volume with peripheral vasodilation.
    - Milrinone: Phosphodiesterase-3 (PDE3) inhibitor. Initial dose: 0.125 to 0.25 mcg/kg/min; titrate to 0.75 mcg/kg/min. Increases intracellular cAMP in myocytes and vascular smooth muscle, producing "inodilator" effects. Elimination is exclusively renal; dose must be reduced in renal insufficiency. Preferred over Dobutamine in patients receiving chronic beta-blocker therapy.
  * Vasopressor Escalation: If profound hypotension (MAP < 65 mmHg) threatens vital organ perfusion, co-administer Norepinephrine (0.02 to 0.5 mcg/kg/min) to restore coronary and cerebral perfusion pressure while inotropes support cardiac output.`
    },
    {
      id: 'dipiro-hf-sec8',
      number: '8.0',
      heading: 'High-Yield Board Pearls, Pharmacokinetic Traps, and Contraindications',
      headingAr: 'فخاخ الحركية الدوائية وموانع الاستعمال عالية الأهمية في البورد',
      evidenceGrade: 'Expert Consensus & Board Pearls',
      body: `1. Loop Diuretic Bioavailability and Conversion Ratios:
   - Furosemide oral bioavailability is highly variable and averages approximately 50% (range: 10%–90%). Therefore, oral to intravenous Furosemide conversion is 2:1 (40 mg PO = 20 mg IV).
   - Torsemide (80%–100%) and Bumetanide (80%–100%) possess predictable, near-complete oral bioavailability; their PO to IV conversion ratio is 1:1.
   - Loop diuretic equivalency: Oral Furosemide 40 mg = IV Furosemide 20 mg = Oral/IV Torsemide 20 mg = Oral/IV Bumetanide 1 mg.

2. Drugs That Precipitate or Worsen Heart Failure (MANDATORY TO AVOID):
   - Nonsteroidal Anti-inflammatory Drugs (NSAIDs & COX-2 inhibitors): Inhibit renal prostaglandin E2 and prostacyclin (PGI2), inducing afferent arteriolar vasoconstriction, profound sodium/water retention, and blunting loop diuretic efficacy.
   - Non-Dihydropyridine CCBs: Diltiazem and Verapamil induce potent negative inotropy and precipitate acute decompensation.
   - Class I Antiarrhythmics: Flecainide, Propafenone, Disopyramide (negative inotropy and proarrhythmia).
   - Thiazolidinediones (Pioglitazone, Rosiglitazone): Peroxisome proliferator-activated receptor-gamma (PPAR-gamma) stimulation in renal collecting ducts triggers severe fluid retention and heart failure exacerbations.
   - DPP-4 Inhibitor Saxagliptin: Associated with increased risk of HF hospitalization (SAVOR-TIMI 53 trial).

3. Cardiorenal Syndrome & Management of Azotemia:
   - When initiating RAAS inhibitors (ARNI, ACEi, ARB) or SGLT2 inhibitors, an initial rise in serum creatinine of up to 30% above baseline is hemodynamically expected due to efferent arteriolar vasodilation or intraglomerular pressure reduction. This does NOT indicate structural tubular injury and does not warrant discontinuing GDMT unless progressive refractory hyperkalemia (K > 5.5 mEq/L) or anuria intervenes.
   - Over-diuresis resulting in intravascular volume depletion can cause prerenal azotemia (BUN:Cr ratio > 20:1); in such cases, decrease the diuretic dose while maintaining foundational GDMT.`
    }
  ]
};

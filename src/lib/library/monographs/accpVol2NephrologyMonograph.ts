import { VerbatimChapter } from '../libraryTypes';

export const accpNephrologyChapter: VerbatimChapter = {
  id: 'accp-v2-nephrology-aki-ckd',
  bookId: 'accp-2026-vol2',
  chapterNumber: 6,
  title: 'Nephrology: Acute Kidney Injury, Drug-Induced Nephrotoxicity, and Severe Electrolyte Emergencies',
  titleAr: 'أمراض الكلى: القصور الكلوي الحاد (AKI)، السمية الكلوية الدوائية، وطوارئ الكهارل الشديدة (Hyperkalemia)',
  authors: 'Thomas D. Nolin, PharmD, PhD, FCCP, FASN; Melanie S. Joy, PharmD, PhD, FCCP, FASN',
  edition: '2026 Edition (American College of Clinical Pharmacy)',
  pageRange: 'pp. 215–288',
  systemCategory: 'Nephrology & Fluids',
  systemCategoryAr: 'أمراض الكلى وسوائل الجسم',
  uan: '0217-0000-26-026-L01-P',
  sourceUrl: 'local://ref/chapter/accp-v2-nephrology-aki-ckd',
  isVerbatimSource: true,
  citation:
    'Nolin TD, Joy MS. Nephrology: Acute Kidney Injury and Electrolytes. In: Beckett RD, et al, eds. Updates in Therapeutics: Pharmacotherapy Preparatory Review and Recertification Course. 2026 ed. ACCP; 2026:215-288. [local://ref/chapter/accp-v2-nephrology-aki-ckd]',
  learningObjectives: [
    'Stage acute kidney injury (AKI) utilizing the KDIGO criteria incorporating serum creatinine and urine output thresholds.',
    'Differentiate prerenal azotemia, acute tubular necrosis (ATN), and acute interstitial nephritis (AIN) utilizing urinalysis and fractional excretion of sodium (FENa).',
    'Execute the acute hyperkalemia emergency treatment algorithm, distinguishing membrane stabilization from intracellular potassium shifts and absolute body removal.',
    'Formulate safe sodium correction trajectories in acute and chronic hyponatremia to avoid central pontine myelinolysis / osmotic demyelination syndrome.'
  ],
  toc: [
    { id: 'accp-neph-sec1', number: '1.0', title: 'KDIGO Staging Criteria, Definitions, and Renal Hemodynamics' },
    { id: 'accp-neph-sec2', number: '2.0', title: 'Differential Diagnosis: Prerenal Azotemia vs Intrinsic ATN vs AIN' },
    { id: 'accp-neph-sec3', number: '3.0', title: 'Drug-Induced Nephrotoxicity Mechanisms & Culprit Medication Classes' },
    { id: 'accp-neph-sec4', number: '4.0', title: 'Acute Severe Hyperkalemia: The 3-Phase Emergency Treatment Protocol' },
    { id: 'accp-neph-sec5', number: '5.0', title: 'Calcium Gluconate vs Calcium Chloride: Route and Administration Rules' },
    { id: 'accp-neph-sec6', number: '6.0', title: 'Hyponatremia Classification & Osmotic Demyelination Safeguards' },
    { id: 'accp-neph-sec7', number: '7.0', title: 'Renal Replacement Therapy (CRRT vs IHD) & Drug Dosing Board Pearls' }
  ],
  boardPearls: [
    'CALCIUM DOES NOT LOWER POTASSIUM: Intravenous Calcium Gluconate (1-2 g IV) stabilizes cardiac myocyte membranes against hyperkalemic arrhythmogenicity within 1-3 minutes. It has ZERO effect on serum potassium concentration and must always be paired with shifting and elimination therapies.',
    'CALCIUM CHLORIDE VS GLUCONATE ROUTE RESTRICTION: Calcium Chloride provides 3 times more elemental calcium (13.6 mEq per 10 mL) than Calcium Gluconate (4.65 mEq per 10 mL). However, Calcium Chloride is a severe vesicant and MUST be infused via a central venous catheter. In peripheral venous lines, Calcium Gluconate is mandatory to prevent limb-threatening extravasation and skin necrosis.',
    'ALBUTEROL AND BETA-BLOCKER RESISTANCE: Nebulized Albuterol (10 to 20 mg) lowers serum potassium by 0.5 to 1.0 mEq/L via beta-2 receptor intracellular shifting. However, approximately 20-40% of patients fail to respond, particularly those receiving concomitant chronic non-selective beta-blocker therapy (e.g., Carvedilol, Propranolol). Never rely on albuterol as monotherapy.',
    'SODIUM CORRECTION CEILING IN HYPONATREMIA: To prevent Central Pontine Myelinolysis (Osmotic Demyelination Syndrome), serum sodium correction must NOT exceed 8 mEq/L in any 24-hour window (or 6 mEq/L/24h in high-risk patients with malnutrition, cirrhosis, or hypokalemia).',
    'COCKCROFT-GAULT WEIGHT SELECTION IN OBESITY: When calculating creatinine clearance for drug dosing in obese patients (BMI >= 30 kg/m2 or actual weight > 120% of Ideal Body Weight [IBW]), use Adjusted Body Weight (AdjBW = IBW + 0.4 * [Actual Weight - IBW]). Using Actual Body Weight grossly overestimates renal drug clearance and causes severe medication toxicity.'
  ],
  boardPearlsAr: [
    'الكالسيوم لا يخفض البوتاسيوم في الدم: Calcium Gluconate يحمي غشاء الخلية العضلية القلبية من اللانظميات القاتلة خلال 1-3 دقائق، لكنه لا يخفض تركيز البوتاسيوم نهائياً. يجب إشراكه فوراً مع الإنسولين ومدرات البول لإزالة البوتاسيوم.',
    'كالسيوم كلورايد وريد مركزي حصراً: Calcium Chloride يحتوي 3 أضعاف الكالسيوم الحر مقارنة بـ Gluconate، لكنه مخرش شديد للأوردة (Vesicant) ويحظر حقنه وريدياً محيطياً، بل يلزم قسطرة وريد مركزي (CVC). الوريد المحيطي يتطلب Calcium Gluconate حصراً.',
    'مقاومة ألبوتيرول مع حاصرات بيتا: جلسات رذاذ Albuterol (10-20 mg) تنقل البوتاسيوم إلى داخل الخلايا، لكن 20-40% من المرضى لا يستجيبون خاصة من يتناولون حاصرات بيتا غير الانتقائية (مثل Carvedilol).',
    'سقف تصحيح الصوديوم لمنع تلف الدماغ: يجب ألا يتجاوز تصحيح الصوديوم 8 mEq/L في أول 24 ساعة (أو 6 mEq/L لدى مرضى الكبد وسوء التغذية) لمنع متلازمة انحلال النخاعين الجسري (Osmotic Demyelination Syndrome).',
    'اختيار الوزن في معادلة Cockcroft-Gault: في حالات السمنة (الوزن الفعلي > 120% من الوزن المثالي IBW)، يجب استخدام الوزن المعدل (AdjBW) بحساب 0.4. استخدام الوزن الفعلي يضخم تصفية الكرياتينين المحسوبة ويسبب تسمماً دوائياً خطيراً.'
  ],
  keywords: [
    'AKI',
    'KDIGO',
    'Hyperkalemia',
    'Calcium Gluconate',
    'Insulin Dextrose',
    'Lokelma',
    'Patiromer',
    'FENa',
    'Hyponatremia',
    'Cockcroft-Gault',
    'Osmotic Demyelination',
    'Drug-Induced Nephrotoxicity'
  ],
  quickTables: [
    {
      title: 'Emergency Pharmacotherapy Protocol for Acute Severe Hyperkalemia (K+ >= 6.0 mEq/L or ECG Changes)',
      titleAr: 'البروتوكول العلاجي الإسعافي لفرط البوتاسيوم الحاد (K+ >= 6.0 mEq/L أو تغيرات التخطيط ECG)',
      headers: ['Therapeutic Phase', 'Drug / Intervention', 'Dose & Administration Route', 'Onset & Mechanism', 'Duration & Critical Precautions'],
      headersAr: ['المرحلة العلاجية', 'الدواء / الإجراء', 'الجرعة وطريقة الإعطاء', 'البدء والآلية', 'مدة التأثير والتحذيرات الصارمة'],
      rows: [
        [
          'Phase 1: Membrane Stabilization',
          'Calcium Gluconate 10%',
          '1 g to 2 g (10 to 20 mL) IV over 2 to 3 minutes; repeat in 5-10 min if ECG abnormal',
          'Onset: 1 to 3 minutes. Antagonizes membrane excitability by raising cardiac action potential threshold.',
          'Duration: 30 to 60 minutes. DOES NOT LOWER SERUM POTASSIUM. Use Calcium Chloride (1g) ONLY via central line.'
        ],
        [
          'Phase 2: Intracellular Shift',
          'Regular Insulin + Dextrose',
          '10 units Regular Insulin IV bolus + 25 g to 50 g Dextrose (50 mL of D50W) IV over 5 minutes',
          'Onset: 15 to 30 minutes. Stimulates sodium-potassium ATPase (Na+/K+ pump), driving K+ into hepatocytes and skeletal myocytes.',
          'Duration: 4 to 6 hours. Expect K+ reduction of 0.5 to 1.2 mEq/L. Monitor capillary blood glucose at 0, 30, 60, 120, and 180 min to prevent hypoglycemia.'
        ],
        [
          'Phase 2: Intracellular Shift (Adjunct)',
          'Albuterol (Salbutamol) Nebulized',
          '10 mg to 20 mg nebulized in 4 mL saline over 10-15 minutes (4 to 8 times standard asthma dose)',
          'Onset: 30 minutes. Beta-2 adrenergic stimulation of intracellular Na+/K+ ATPase pump.',
          'Duration: 2 hours. Lowers K+ by 0.5 to 1.0 mEq/L. Caution in coronary ischemia or tachyarrhythmias; blunted in patients on beta-blockers.'
        ],
        [
          'Phase 2: Intracellular Shift (Metabolic Acidosis Only)',
          'Sodium Bicarbonate 8.4%',
          '50 mEq to 100 mEq (1 to 2 ampuls) IV slow infusion over 10 to 15 minutes',
          'Onset: 30 to 60 minutes. Extracellular alkalosis exchanges H+ for K+ across cellular membranes.',
          'Duration: 2 hours. Effective ONLY in severe metabolic acidemia (pH < 7.20 or HCO3 < 15 mEq/L). Ineffective in normo-acidemic patients.'
        ],
        [
          'Phase 3: Body Potassium Elimination',
          'Furosemide (Lasix)',
          '40 mg to 80 mg IV bolus (titrated higher in underlying CKD)',
          'Onset: 15 to 30 minutes. Inhibits Na-K-2Cl cotransporter in thick ascending limb of Henle, enhancing urinary potassium excretion.',
          'Requires intact renal tubular function and adequate intravascular volume. Combine with IV crystalloid replacement if euvolemic.'
        ],
        [
          'Phase 3: Body Potassium Elimination (Gastrointestinal)',
          'Sodium Zirconium Cyclosilicate (Lokelma / ZS-9)',
          '10 g PO three times daily for 48 hours, then 5 to 10 g once daily',
          'Onset: 1 hour (median time to normokalemia: 2.2 hours). Insoluble inorganic crystal selectively capturing K+ in exchange for Na+ and H+ throughout GI tract.',
          'Contains 400 mg sodium per 5g dose; monitor for peripheral edema in heart failure. Separate from other oral medications by 2 hours.'
        ],
        [
          'Phase 3: Definitive Elimination',
          'Hemodialysis (Intermittent)',
          'Standard 3- to 4-hour hemodialysis with low potassium dialysate bath (0 to 2 mEq/L K+)',
          'Immediate clearance. Clears 25 to 50 mEq of potassium per hour of active dialytic therapy.',
          'The definitive gold standard for refractory hyperkalemia, severe oliguric AKI, end-stage renal disease, or massive tumor lysis/crush injury.'
        ]
      ],
      rowsAr: [
        [
          'المرحلة 1: حماية الغشاء الخلوي',
          'Calcium Gluconate 10%',
          '1 إلى 2 غ (10-20 مل) وريدياً على 2-3 دقائق؛ تكرر بعد 5-10 دقائق إن استمر شذوذ التخطيط',
          'البدء: 1-3 دقائق. يرفع عتبة التنبيه الكهربائي في عضلة القلب لمنع توقف القلب.',
          'المدة: 30-60 دقيقة. لا يخفض البوتاسيوم. يحظر إعطاء Calcium Chloride بالوريد المحيطي.'
        ],
        [
          'المرحلة 2: النقل إلى داخل الخلايا',
          'Regular Insulin + Dextrose',
          '10 وحدات إنسولين نظامي وريدياً + 25-50 غ دكستروز (50 مل من D50W) على 5 دقائق',
          'البدء: 15-30 دقيقة. ينشط مضخة Na+/K+ ATPase ليدخل البوتاسيوم داخل الخلايا العضلية والكبدية.',
          'المدة: 4-6 ساعات. يخفض K بمقدار 0.5-1.2 mEq/L. فحص سكر الدم عند 30 و 60 و 120 و 180 دقيقة لمنع هبوط السكر.'
        ],
        [
          'المرحلة 2: النقل داخل الخلايا (رديف)',
          'Albuterol رذاذ استنشاقي',
          '10 إلى 20 mg رذاذ في 4 مل سالين (4 إلى 8 أضعاف جرعة الربو المعتادة)',
          'البدء: 30 دقيقة. تحفيز مستقبلات بيتا-2 ينشط إدخال البوتاسيوم للخلايا.',
          'المدة: ساعتان. يخفض K بمقدار 0.5-1.0. حذر في مرضى قصور الشرايين التاجية؛ مفعوله ضعيف مع حاصرات بيتا.'
        ],
        [
          'المرحلة 2: النقل داخل الخلايا (مع الحماض فقط)',
          'Sodium Bicarbonate 8.4%',
          '50 إلى 100 mEq وريدياً بالتسريب البطيء على 10-15 دقيقة',
          'البدء: 30-60 دقيقة. قلوية الدم تدفع خروج H+ ودخول K+ إلى الخلايا.',
          'المدة: ساعتان. فعال فقط في وجود حماض استقلابي شديد (pH < 7.20 أو بيكربونات < 15). عديم الفائدة بدون حماض.'
        ],
        [
          'المرحلة 3: الطرح النهائي من الجسم',
          'Furosemide',
          '40 إلى 80 mg وريدياً (ترفع الجرعة في القصور الكلوي المزمن)',
          'البدء: 15-30 دقيقة. يثبط نواقل الصوديوم والبوتاسيوم في عروة هنلي لزيادة طرح البوتاسيوم في البول.',
          'يتطلب وجود إدرار بولي وحجم سوائل كافٍ في الجسم. يفضل تعويض السوائل للمرضى غير المحتقنين.'
        ],
        [
          'المرحلة 3: الطرح الهضمي',
          'Lokelma (Sodium Zirconium)',
          '10 غ فموياً 3 مرات يومياً لمدة 48 ساعة، ثم 5-10 غ يومياً',
          'البدء: ساعة واحدة (الوصول للمستوى الطبيعي في 2.2 ساعة). يرتبط نوعياً بالبوتاسيوم في الأمعاء ويطرجه مع البراز.',
          'يحتوي 400 ملغ صوديوم لكل 5 غ؛ مراقبة الوذمات في مرضى القلب. الفصل ساعتين عن الأدوية الفموية الأخرى.'
        ],
        [
          'المرحلة 3: الغسيل الكلوي النهائي',
          'Hemodialysis',
          'جلسة ديلزة دموية قياسية لمدة 3-4 ساعات بسائل ديلزة منخفض البوتاسيوم',
          'طرح فوري ومباشر. يطرح 25-50 mEq بوتاسيوم لكل ساعة غسيل.',
          'الحل النهائي والجذري لفرط البوتاسيوم المعند، انقطاع البول، الفشل الكلوي النهائي، وانحلال العضلات الشديد.'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'accp-neph-sec1',
      number: '1.0',
      heading: 'KDIGO Staging Criteria, Definitions, and Renal Hemodynamics',
      headingAr: 'معايير KDIGO، تعريفات القصور الكلوي، والديناميكا الدموية الكلوية',
      evidenceGrade: 'KDIGO Clinical Practice Guideline for AKI',
      body: `Acute Kidney Injury (AKI) is characterized by an abrupt decline in glomerular filtration rate (GFR) resulting in retention of nitrogenous waste products (urea, creatinine) and dysregulation of extracellular fluid volume and electrolytes.

KDIGO AKI Staging Criteria (Based on Serum Creatinine and Urine Output):
- Stage 1:
  * Serum Creatinine: Increase in serum creatinine by >= 0.3 mg/dL (>= 26.5 mcmol/L) within 48 hours; OR increase to 1.5 to 1.9 times baseline within 7 days.
  * Urine Output: < 0.5 mL/kg/hour for 6 to 12 hours.
- Stage 2:
  * Serum Creatinine: Increase to 2.0 to 2.9 times baseline.
  * Urine Output: < 0.5 mL/kg/hour for >= 12 hours.
- Stage 3:
  * Serum Creatinine: Increase to >= 3.0 times baseline; OR increase in serum creatinine to >= 4.0 mg/dL (>= 353.6 mcmol/L); OR initiation of renal replacement therapy; OR in patients < 18 years, decrease in eGFR to < 35 mL/min/1.73m2.
  * Urine Output: < 0.3 mL/kg/hour for >= 24 hours; OR anuria for >= 12 hours.

Renal Autoregulation and Intraglomerular Hydrodynamics:
Normal glomerular filtration depends on the transcapillary hydraulic pressure gradient maintained by balanced vascular resistance between the afferent (preglomerular) and efferent (postglomerular) arterioles.
- Afferent Arteriolar Vasodilation: Mediated by local vasodilatory prostaglandins (PGE2, PGI2) to preserve glomerular perfusion pressure during low cardiac output or hypovolemia.
- Efferent Arteriolar Vasoconstriction: Mediated by Angiotensin II to sustain intraglomerular capillary hydrostatic pressure when renal perfusion declines.
- Drug Interruption Consequences: Nonsteroidal anti-inflammatory drugs (NSAIDs) inhibit prostaglandin synthesis, causing afferent vasoconstriction. ACE inhibitors and ARBs block angiotensin II, inducing efferent vasodilation. When combined in hypovolemic patients, this "triple whammy" completely collapses intraglomerular filtration pressure, triggering profound hemodynamically mediated AKI.`
    },
    {
      id: 'accp-neph-sec2',
      number: '2.0',
      heading: 'Differential Diagnosis: Prerenal Azotemia vs Intrinsic ATN vs AIN',
      headingAr: 'التشخيص التفريقي: القصور قبل الكلوي، النخر الأنبوبي، والتهاب الكلية الخلالي',
      evidenceGrade: 'Expert Consensus & Laboratory Diagnostics',
      body: `Accurate management requires distinguishing among the three primary anatomical categories of acute kidney injury:

1. Prerenal Azotemia (~50-60% of inpatient cases):
- Etiology: Renal hypoperfusion without structural parenchymal damage (dehydration, hemorrhage, heart failure, cirrhosis, sepsis).
- Pathophysiology: Intact tubular transport systems aggressively reabsorb sodium and water in response to aldosterone and vasopressin.
- Diagnostic Hallmarks:
  * Blood Urea Nitrogen to Serum Creatinine (BUN:Cr) ratio: > 20:1.
  * Fractional Excretion of Sodium (FENa): < 1% (indicates preserved tubular sodium reabsorption).
  * Fractional Excretion of Urea (FEUrea): < 35% (useful when patient is on diuretics).
  * Urine Sodium: < 20 mEq/L.
  * Urine Osmolality: > 500 mOsm/kg (concentrated urine).
  * Urine Sediment: Hyaline casts or normal.

2. Intrinsic Acute Tubular Necrosis (ATN) (~35-40% of inpatient cases):
- Etiology: Prolonged ischemia (prolonged prerenal state) or direct nephrotoxic exposure (aminoglycosides, iodinated radiocontrast, amphotericin B, myoglobin from rhabdomyolysis).
- Pathophysiology: Ischemic or toxic destruction of proximal tubular and thick ascending limb epithelial cells, resulting in loss of polarity, cell sloughing, and tubular obstruction.
- Diagnostic Hallmarks:
  * BUN:Cr ratio: 10:1 to 15:1.
  * FENa: > 2% (impaired tubular sodium reabsorption).
  * Urine Sodium: > 40 mEq/L.
  * Urine Osmolality: < 350 mOsm/kg (isosthenuric urine).
  * Urine Microscopy: Coarse granular "muddy brown" casts and sloughed renal tubular epithelial (RTE) cells.

3. Acute Interstitial Nephritis (AIN) (~5-10% of cases):
- Etiology: Drug-induced allergic immune hypersensitivity (beta-lactams, ciprofloxacin, sulfonamides, NSAIDs, proton pump inhibitors).
- Clinical Presentation: Triad of fever, rash, and eosinophilia (seen in < 30% of cases). Urinalysis shows white blood cell (WBC) casts, sterile pyuria, and urine eosinophils.
- Treatment: Prompt withdrawal of the offending agent; consider systemic corticosteroids (Prednisone 1 mg/kg/day for 2-4 weeks) if renal function does not improve within 72 hours of drug discontinuation.`
    },
    {
      id: 'accp-neph-sec3',
      number: '3.0',
      heading: 'Drug-Induced Nephrotoxicity Mechanisms & Culprit Medication Classes',
      headingAr: 'آليات السمية الكلوية الدوائية وقائمة الأدوية المسببة الرئيسية',
      evidenceGrade: 'Clinical Pharmacokinetics & Nephrotoxicity Consensus',
      body: `1. Aminoglycosides (Gentamicin, Tobramycin, Amikacin):
   - Mechanism: Polybasic molecules bind to megalin-cubilin receptor complexes on the brush border of proximal tubular cells, undergo endocytosis, and accumulate inside lysosomes, causing lysosomal rupture, mitochondrial dysfunction, and non-oliguric ATN.
   - Clinical Manifestation: Typically manifests after 5 to 7 days of therapy with gradual rise in serum creatinine and wasting of magnesium and calcium.
   - Prevention: Utilize once-daily consolidated high-dose extended-interval dosing (5-7 mg/kg) which maximizes peak concentration (Cmax/MIC) while allowing trough concentrations to drop to undetectable levels (< 0.5 mcg/mL), clearing intracellular aminoglycoside accumulation.

2. Vancomycin-Induced Nephrotoxicity (VIN):
   - Mechanism: Oxidative stress, mitochondrial uncoupling, and proximal tubular cast formation. Synergistic nephrotoxicity occurs when combined with Piperacillin/Tazobactam (Zosyn).
   - Prevention: Transition from traditional high-trough monitoring (15-20 mcg/mL) to Bayesian AUC24/MIC monitoring (400-600 mg*hr/L), which cuts the incidence of nephrotoxicity by over 50%.

3. Iodinated Radiocontrast-Induced Nephropathy (CIN):
   - Mechanism: Medullary vasoconstriction leading to ischemic tubular injury plus direct reactive oxygen species tubular cytotoxicity.
   - Prevention: Pre- and post-procedure isotonic crystalloid hydration (0.9% NaCl or Sodium Bicarbonate at 1-1.5 mL/kg/hr for 6-12 hours before and after contrast). N-acetylcysteine has failed to show definitive benefit.`
    },
    {
      id: 'accp-neph-sec4',
      number: '4.0',
      heading: 'Acute Severe Hyperkalemia: The 3-Phase Emergency Treatment Protocol',
      headingAr: 'البروتوكول العلاجي الإسعافي ثلاثي المراحل لفرط البوتاسيوم الحاد',
      evidenceGrade: 'AHA / ACC / ERC Resuscitation Guidelines',
      body: `Hyperkalemia (serum potassium >= 5.0 mEq/L) represents a medical emergency when severe (K+ >= 6.0-6.5 mEq/L) or when accompanied by characteristic electrocardiographic abnormalities:
1. Peaked, symmetric, narrow T waves;
2. Prolongation of PR interval and flattening of P waves;
3. Widening of the QRS complex;
4. Merging of QRS with T wave forming a classic biphasic "sine wave" pattern, presaging ventricular fibrillation or asystole.

THE SYSTEMATIC 3-PHASE TREATMENT FRAMEWORK:
- Phase 1: Cardiac Membrane Stabilization (Immediate, within 1-3 minutes)
  * Administer Calcium Gluconate 10% 1-2 g (10-20 mL) IV over 2-3 minutes.
  * Antagonizes hyperkalemic myocardial depolarization by elevating the threshold potential, restoring normal membrane excitability without altering extracellular potassium levels.
  * Duration of protection is brief (30-60 minutes). If ECG changes persist or recur after 5-10 minutes, a second dose of calcium must be administered immediately.
- Phase 2: Transcellular Potassium Redistribution (Within 15-30 minutes)
  * Regular Insulin 10 units IV bolus + 25 g to 50 g Dextrose (50 mL of D50W). Stimulates the Na+/K+ ATPase pump, shifting potassium into the intracellular fluid compartment. Lowers serum K+ by 0.5 to 1.2 mEq/L within 30-60 minutes, lasting 4-6 hours. Frequent capillary blood glucose checks (up to 3 hours) are essential to prevent late-onset hypoglycemia.
  * Nebulized Albuterol 10 to 20 mg in 4 mL normal saline. Provides additive beta-2 mediated potassium uptake into skeletal muscle.
  * Sodium Bicarbonate 50-100 mEq IV: Reserved solely for severe underlying metabolic acidosis (pH < 7.20).
- Phase 3: Total Body Potassium Elimination (Hours)
  * Loop Diuretics (Furosemide 40-80 mg IV) to promote kaliuresis in patients with residual kidney function.
  * Oral Cation Exchangers: Sodium Zirconium Cyclosilicate (Lokelma) 10 g PO TID or Patiromer (Veltassa) 8.4 g PO daily.
  * Hemodialysis: The most effective and rapid method of potassium removal, indicated for life-threatening hyperkalemia refractory to medical therapy or severe oliguric AKI/ESRD.`
    },
    {
      id: 'accp-neph-sec5',
      number: '5.0',
      heading: 'Calcium Gluconate vs Calcium Chloride: Route and Administration Rules',
      headingAr: 'قواعد المفاضلة بين كالسيوم جلوكونات وكالسيوم كلورايد ومسارات الحقن',
      evidenceGrade: 'Safety & Extravasation Consensus Guidelines',
      body: `Selecting between Calcium Gluconate and Calcium Chloride is a frequent source of medication errors and severe patient injury:

Elemental Calcium Discrepancy:
- 10 mL ampul of 10% Calcium Chloride contains 1000 mg of calcium chloride, yielding 272 mg (13.6 mEq) of elemental calcium.
- 10 mL ampul of 10% Calcium Gluconate contains 1000 mg of calcium gluconate, yielding only 93 mg (4.65 mEq) of elemental calcium.
- Therefore, Calcium Chloride provides approximately THREE TIMES more elemental calcium per volume than Calcium Gluconate.

Venous Access and Tissue Necrosis Warning:
- Calcium Chloride is highly hypertonic and causes severe chemical irritation, phlebitis, and tissue necrosis if extravasation occurs. It MUST be administered through a secure Central Venous Catheter (CVC). Peripheral administration is acceptable ONLY during active cardiac arrest when no central line is present.
- Calcium Gluconate is much less irritating to peripheral vascular endothelium and is the MANDATED formulation for peripheral venous administration.

Administration Speed:
- In non-arrest emergencies, infuse over 2 to 3 minutes. Infusing too rapidly can cause hypotension, bradycardia, and flushing.
- If the patient is receiving concurrent Digoxin, administer calcium cautiously over 20-30 minutes, as acute hypercalcemia potentiates digitalis-induced fatal arrhythmogenesis ("stone heart" phenomenon).`
    },
    {
      id: 'accp-neph-sec6',
      number: '6.0',
      heading: 'Hyponatremia Classification & Osmotic Demyelination Safeguards',
      headingAr: 'تصنيف نقص صوديوم الدم ومحاذير متلازمة انحلال النخاعين الجسري (ODS)',
      evidenceGrade: 'European & US Hyponatremia Expert Guidelines',
      body: `Hyponatremia (serum sodium < 135 mEq/L) is classified according to measured serum osmolality:
1. Hypertonic Hyponatremia (Osmolality > 280 mOsm/kg): Marked hyperglycemia or mannitol shifts water from intracellular to extracellular space. Corrected Sodium Formula: Measured Na + [0.016 * (Serum Glucose - 100)].
2. Isotonic Pseudohyponatremia (Osmolality 275-280 mOsm/kg): Severe hypertriglyceridemia or hyperproteinemia artifactually lowers sodium on indirect potentiometry.
3. Hypotonic Hyponatremia (Osmolality < 275 mOsm/kg): True hypoosmolar state, further classified by extracellular volume status (Hypovolemic, Euvolemic [SIADH], Hypervolemic [Heart Failure, Cirrhosis]).

OSMOTIC DEMYELINATION SYNDROME (ODS / CENTRAL PONTINE MYELINOLYSIS):
- Pathophysiology: In chronic hyponatremia (> 48 hours), brain astrocytes adapt to hypoosmolar stress by extruding organic osmoles (myoinositol, taurine, glutamate) to prevent cerebral edema. If serum sodium is raised too rapidly, the hypertonic extracellular environment causes rapid dehydration of brain cells, disruption of the blood-brain barrier, oligodendrocyte apoptosis, and widespread demyelination of the central pons, producing irreversible spastic quadriparesis, pseudobulbar palsy, "locked-in" syndrome, and death.
- Strict Rate Limits:
  * Maximum Correction Ceiling: Do NOT exceed an increase of 8 mEq/L in any 24-hour period (or 18 mEq/L in 48 hours).
  * High-Risk Patients: In patients with cirrhosis, advanced malnutrition, chronic alcoholism, or concurrent hypokalemia, limit correction to <= 4 to 6 mEq/L per 24 hours.

Emergency Management of Acute Severe Symptomatic Hyponatremia (Seizures, Coma):
- Administer 3% Hypertonic Saline (NaCl): 100 to 150 mL IV bolus infused over 10-20 minutes. May repeat once or twice at 10-minute intervals until clinical symptoms resolve or serum sodium increases by 4 to 6 mEq/L.
- Once acute symptoms abate, halt hypertonic infusion and adhere strictly to the 24-hour correction ceiling.`
    },
    {
      id: 'accp-neph-sec7',
      number: '7.0',
      heading: 'Renal Replacement Therapy (CRRT vs IHD) & Drug Dosing Board Pearls',
      headingAr: 'أنماط الغسيل الكلوي (CRRT مقابل IHD) ولآلئ ضبط الجرعات في البورد',
      evidenceGrade: 'Nephrology Clinical Practice Consensus',
      body: `1. Continuous Renal Replacement Therapy (CRRT: CVVH, CVVHD, CVVHDF):
   - Indicated primarily for hemodynamically unstable critically ill patients in the ICU with AKI, septic shock, or acute brain injury who cannot tolerate the rapid fluid and osmolar shifts of Intermittent Hemodialysis (IHD).
   - Drug Clearance in CRRT: Depends on molecular weight (sieving coefficient), protein binding (only free unbound drug is filtered), and volume of distribution (Vd). Highly protein-bound drugs (e.g., Ceftriaxone, Digitoxin) are NOT significantly cleared by CRRT. Hydrophilic antibiotics with low protein binding (e.g., Cefepime, Meropenem, Vancomycin, Aminoglycosides) are extensively cleared by CRRT and require substantial replacement doses (frequently near-normal daily doses) to avoid therapeutic failure.

2. Intermittent Hemodialysis (IHD):
   - In IHD, administer dialyzable medications (e.g., Cefazolin, Ampicillin, Lisinopril, Metoprolol, Atenolol) AFTER the completion of the hemodialysis run to prevent premature dialytic removal.
   - Non-dialyzable drugs (e.g., Ceftriaxone, Carvedilol, Diltiazem, Amlodipine) may be administered on standard schedules independent of hemodialysis timing.`
    }
  ]
};

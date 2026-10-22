import { VerbatimChapter } from '../libraryTypes';

export const accpCriticalCareSepsisChapter: VerbatimChapter = {
  id: 'accp-v1-critical-care-sepsis',
  bookId: 'accp-2026-vol1',
  chapterNumber: 7,
  title: 'Critical Care: Sepsis, Septic Shock, Hemodynamic Resuscitation, and Severe Inpatient Infections',
  titleAr: 'العناية المركزة: الإنتان (Sepsis)، الصدمة الإنتانية، الإنعاش الهيموديناميكي، وعدوى المستشفيات الشديدة',
  authors: 'Brian L. Erstad, PharmD, MCCM, FCCP, FASHP, BCPS; Mitchell J. Buckley, PharmD, FCCM, FCCP, BCPS',
  edition: '2026 Edition (American College of Clinical Pharmacy)',
  pageRange: 'pp. 315–384',
  systemCategory: 'Critical Care & Infectious Disease',
  systemCategoryAr: 'العناية المركزة والأمراض المعدية',
  uan: '0217-0000-26-007-L01-P',
  sourceUrl: 'local://ref/chapter/accp-v1-critical-care-sepsis',
  isVerbatimSource: true,
  citation:
    'Erstad BL, Buckley MJ. Critical Care: Sepsis and Septic Shock. In: Beckett RD, et al, eds. Updates in Therapeutics: Pharmacotherapy Preparatory Review and Recertification Course. 2026 ed. ACCP; 2026:315-384. [local://ref/chapter/accp-v1-critical-care-sepsis]',
  learningObjectives: [
    'Apply the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3) utilizing the Sequential Organ Failure Assessment (SOFA) score.',
    'Implement the Surviving Sepsis Campaign (SSC) 1-Hour Resuscitation Bundle including lactate clearance, blood culture protocols, balanced crystalloid resuscitation, and vasopressor titration.',
    'Select empiric broad-spectrum antimicrobial regimens for hospital-acquired and ventilator-associated pneumonia (HAP/VAP), incorporating extended-infusion beta-lactams and MRSA coverage.',
    'Formulate safe alternative antibiotic regimens in severe IgE-mediated beta-lactam anaphylaxis utilizing aztreonam and combination therapy.',
    'Calculate and monitor Vancomycin area-under-the-curve (AUC24/MIC) pharmacokinetics to optimize clinical cure and prevent acute kidney injury.'
  ],
  toc: [
    { id: 'accp-sepsis-sec1', number: '1.0', title: 'Sepsis-3 Definitions, Pathophysiology, and Microvascular Collapse' },
    { id: 'accp-sepsis-sec2', number: '2.0', title: 'Surviving Sepsis Campaign 1-Hour Emergency Resuscitation Bundle' },
    { id: 'accp-sepsis-sec3', number: '3.0', title: 'Fluid Selection: Balanced Crystalloids vs 0.9% Normal Saline vs Albumin' },
    { id: 'accp-sepsis-sec4', number: '4.0', title: 'Vasoactive Agent Hierarchy: Norepinephrine, Vasopressin, Epinephrine' },
    { id: 'accp-sepsis-sec5', number: '5.0', title: 'Inpatient Antimicrobial Selection & Extended-Infusion Pharmacokinetics' },
    { id: 'accp-sepsis-sec6', number: '6.0', title: 'Severe Beta-Lactam Allergy Algorithm: The Aztreonam Safety Bridge' },
    { id: 'accp-sepsis-sec7', number: '7.0', title: 'Vancomycin AUC/MIC Bayesian Monitoring vs Trough-Based Protocols' },
    { id: 'accp-sepsis-sec8', number: '8.0', title: 'Corticosteroids, Stress Ulcer Prophylaxis, and ICU Board Pearls' }
  ],
  boardPearls: [
    'FIRST-LINE VASOPRESSOR IN SEPTIC SHOCK: Norepinephrine is the uncontested first-line vasopressor of choice (target MAP >= 65 mmHg). Dopamine should be strictly avoided due to significantly increased tachydysrhythmias and excess mortality (SOAP II trial).',
    'VASOPRESSIN AT A FIXED 0.03 UNITS/MIN: Vasopressin (AVP) must be administered at a fixed infusion rate of 0.03 units/min as a catecholamine-sparing agent when norepinephrine dose escalates (0.25 mcg/kg/min). It should NOT be titrated up and down like a catecholamine due to coronary and splanchnic vasoconstriction at doses > 0.04 units/min.',
    'BALANCED CRYSTALLOIDS PREFERRED OVER 0.9% NORMAL SALINE: Resuscitation with Lactated Ringer or Plasma-Lyte significantly reduces major adverse kidney events (MAKE30) and avoids hyperchloremic metabolic acidosis compared with large volumes of 0.9% Normal Saline (SMART and SALT-ED trials).',
    'AZTREONAM ALLERGY CROSS-REACTIVITY: Aztreonam (a monobactam) shares NO immunologic cross-reactivity with penicillins, carbapenems, or cephalosporins EXCEPT Ceftazidime, with which it shares an identical R-1 side chain. In confirmed IgE-mediated anaphylaxis to penicillin, Aztreonam is 100% safe to administer.',
    'HYDROCORTISONE IN REFRACTORY SHOCK: Intravenous hydrocortisone (200 mg/day administered as 50 mg IV q6h or continuous infusion) is indicated ONLY in septic shock refractory to fluid resuscitation and high-dose vasopressor therapy (Norepinephrine equivalent >= 0.25 mcg/kg/min for > 4 hours). Routine ACTH testing is not recommended.'
  ],
  boardPearlsAr: [
    'رافع الضغط الأول في الصدمة الإنتانية: Norepinephrine هو الخيار الأول دون منازع للحفاظ على MAP >= 65 mmHg. يُحظر استخدام Dopamine لزيادة خطر اللانظميات القلبية القاتلة (SOAP II Trial).',
    'جرعة Vasopressin ثابتة عند 0.03 units/min: يُعطى كدواء إضافي لتقليل جرعة النورإبينفرين، ولا يجوز معايرته صعوداً وهبوطاً لأن الجرعات > 0.04 تسبب نقص تروية إكليلية وحشوية شديدة.',
    'تفضيل المحاليل المتوازنة على النورمال سالين: استخدام Lactated Ringer يمنع الحماض الأيضي بفرط الكلور (Hyperchloremic Acidosis) ويقلل القصور الكلوي الحاد مقارنة بـ Normal Saline (SMART Trial).',
    'التحسس المتبادل مع Aztreonam: لا يوجد أي تحسس متصالب بين Aztreonam والبنسلينات باستثناء Ceftazidime لتطابق السلسلة الجانبية R-1. يُعتبر Aztreonam آمناً تماماً في صدمة الحساسية (Anaphylaxis) من البنسلين.',
    'الكورتيزون في الصدمة المعندة فقط: Hydrocortisone 200 mg/day (50 mg كل 6 ساعات) يُعطى فقط عند فشل السوائل ورافعات الضغط بجرعات عالية (Norepinephrine >= 0.25 mcg/kg/min لأكثر من 4 ساعات).'
  ],
  keywords: [
    'Sepsis-3',
    'Septic Shock',
    'Norepinephrine',
    'Vasopressin',
    'Balanced Crystalloids',
    'Cefepime',
    'Piperacillin/Tazobactam',
    'Aztreonam',
    'Vancomycin',
    'AUC/MIC',
    'Hydrocortisone',
    'Lactate Clearance'
  ],
  quickTables: [
    {
      title: 'Surviving Sepsis Campaign: 1-Hour Emergency Resuscitation Bundle',
      titleAr: 'حزمة الإنعاش الإسعافي خلال ساعة واحدة (Surviving Sepsis Campaign 1-Hour Bundle)',
      headers: ['Bundle Component', 'Clinical Specification', 'Target / Action Threshold', 'Physiologic Rationale'],
      headersAr: ['عنصر الحزمة', 'المواصفة السريرية المعتمدة', 'الهدف / عتبة التدخل', 'الأساس الفيزيولوجي'],
      rows: [
        [
          '1. Measure Serum Lactate',
          'Measure venous or arterial lactate immediately upon suspicion of sepsis.',
          'Remeasure within 2-4 hours if initial lactate > 2.0 mmol/L.',
          'Biomarker of tissue hypoperfusion and anaerobic cellular metabolism. Lactate clearance > 10-20% indicates effective resuscitation.'
        ],
        [
          '2. Obtain Blood Cultures Prior to Antibiotics',
          'Draw at least 2 sets of blood cultures (both aerobic and anaerobic bottles) from separate venipuncture sites.',
          'Do NOT delay antimicrobial administration by > 45 minutes if cultures prove technically difficult.',
          'Essential for microbiological identification, susceptibility testing, and antimicrobial stewardship de-escalation.'
        ],
        [
          '3. Administer Broad-Spectrum IV Antimicrobials',
          'Infuse empiric broad-spectrum coverage covering likely pathogens within 1 hour of recognition.',
          'Include antipseudomonal beta-lactam + MRSA coverage if risk factors present.',
          'Every hour of delay in antibiotic administration during septic shock is associated with an 8% increase in mortality.'
        ],
        [
          '4. Administer IV Crystalloid Fluid Bolus',
          'Administer 30 mL/kg of balanced crystalloid (Lactated Ringer or Plasma-Lyte) within first 3 hours for hypotension (MAP < 65) or lactate >= 4 mmol/L.',
          'Calculate volume based on actual body weight (or adjusted weight in severe obesity).',
          'Restores effective intravascular circulating volume and optimizes cardiac preload via the Frank-Starling mechanism.'
        ],
        [
          '5. Apply Vasopressors for Persistent Hypotension',
          'Initiate Norepinephrine IV infusion via central line (or peripheral line transiently) if MAP remains < 65 mmHg despite fluid bolus.',
          'Titrate rapidly to achieve target Mean Arterial Pressure (MAP) >= 65 mmHg.',
          'Restores coronary, cerebral, and critical organ perfusion pressure; prevents progressive ischemic end-organ failure.'
        ]
      ],
      rowsAr: [
        [
          '1. قياس لاكتات المصل',
          'قياس اللاكتات وريدياً أو شريانياً فور الاشتباه بالإنتان.',
          'إعادة القياس خلال 2-4 ساعات إذا كان اللاكتات > 2.0 mmol/L.',
          'مؤشر حيوي لنقص التروية النسيجية والاستقلاب اللاهوائي. تراجع اللاكتات > 10-20% يؤكد استجابة الإنعاش.'
        ],
        [
          '2. زراعة الدم قبل المضادات الحيوية',
          'سحب عينتين على الأقل (هوائي ولاهوائي) من موقعين وريديين منفصلين.',
          'عدم تأخير المضاد الحيوي لأكثر من 45 دقيقة إذا تعذر السحب السريع.',
          'ضروري لعزل الجرثومة وتحديد الحساسية وتضييق طيف المضاد لاحقاً (Stewardship).'
        ],
        [
          '3. إعطاء مضادات حيوية واسعة الطيف وريدياً',
          'بدء المضاد واسع الطيف خلال ساعة واحدة كحد أقصى من تشخيص الإنتان أو الصدمة.',
          'تغطية Pseudomonas و MRSA عند وجود عوامل الخطورة.',
          'كل ساعة تأخير في إعطاء المضاد الحيوي في الصدمة الإنتانية ترفع الوفيات بنسبة 8%.'
        ],
        [
          '4. إعطاء سوائل بلورية وريدية (30 mL/kg)',
          'إعطاء 30 مل/كغ من المحاليل المتوازنة (Lactated Ringer) خلال أول 3 ساعات لهبوط الضغط أو لاكتات >= 4.',
          'الحساب بناءً على الوزن الفعلي (أو المعدل في السمنة المفرطة).',
          'يعيد حجم الدم الفعال داخل الأوعية ويحسن نتاج القلب.'
        ],
        [
          '5. رافعات الضغط عند استمرار هبوط الضغط',
          'بدء Norepinephrine وريدياً إذا بقي MAP < 65 mmHg بعد السوائل.',
          'المعايرة السريعة للوصول لضغط شرياني وسطي MAP >= 65 mmHg.',
          'يضمن استعادة تروية الأعضاء الحيوية ويمنع الفشل العضوي المتعدد.'
        ]
      ]
    },
    {
      title: 'Antimicrobial Dosing and Extended-Infusion Optimization in the ICU',
      titleAr: 'جرعات المضادات الحيوية وجداول التسريب الممتد (Extended Infusion) في العناية المركزة',
      headers: ['Antimicrobial Agent', 'Standard Dosing', 'Extended / Continuous Infusion Regimen', 'Renal Adjustment & Monitoring Target'],
      headersAr: ['المضاد الحيوي', 'الجرعة الاعتيادية', 'نظام التسريب الممتد (Extended Infusion)', 'تعديل الجرعة الكلوية والهدف الدوائي'],
      rows: [
        [
          'Cefepime (Maxipime)',
          '2 g IV every 8 hours over 30 min',
          '2 g IV every 8 hours infused over 4 hours (Extended Infusion)',
          'CrCl 30-50: 2g q12h; CrCl 11-29: 2g q24h; CrCl < 11: 1g q24h. Enforce strict dose reduction to prevent neurotoxicity/myoclonus.'
        ],
        [
          'Piperacillin/Tazobactam (Zosyn)',
          '4.5 g IV every 6 hours over 30 min',
          '3.375 g to 4.5 g IV every 8 hours infused over 4 hours (Extended Infusion)',
          'CrCl 20-50: 3.375g q6h; CrCl < 20: 2.25g q6h. Extended infusion optimizes time above MIC (%T > MIC).'
        ],
        [
          'Meropenem (Merrem)',
          '1 g to 2 g IV every 8 hours over 30 min',
          '1 g to 2 g IV every 8 hours infused over 3 hours (Extended Infusion)',
          'CrCl 26-50: 1g q12h; CrCl 10-25: 500mg q12h; CrCl < 10: 500mg q24h. Drug of choice for ESBL-producing Enterobacterales.'
        ],
        [
          'Aztreonam (Azactam)',
          '2 g IV every 8 hours over 30 min',
          '2 g IV every 8 hours infused over 3-4 hours',
          'CrCl 10-30: 1g q8h; CrCl < 10: 500mg q8h. 100% safe in severe penicillin anaphylaxis. Zero cross-reactivity except with Ceftazidime.'
        ],
        [
          'Vancomycin',
          'Loading dose: 25-35 mg/kg IV x 1 (max 2000-3000 mg) over 2 hours',
          'Maintenance: 15-20 mg/kg IV every 8 to 12 hours based on CrCl',
          'Target AUC24/MIC of 400-600 mg*hr/L via Bayesian modeling or 2-point PK sampling. Troughs of 15-20 mcg/mL cause higher nephrotoxicity.'
        ]
      ],
      rowsAr: [
        [
          'Cefepime',
          '2 g وريدياً كل 8 ساعات على 30 دقيقة',
          '2 g وريدياً كل 8 ساعات تسريب ممتد على 4 ساعات',
          'CrCl 30-50: 2g كل 12 ساعة؛ CrCl 11-29: 2g كل 24 ساعة؛ تخفيض إلزامي لمنع السمية العصبية (Neurotoxicity).'
        ],
        [
          'Piperacillin/Tazobactam',
          '4.5 g وريدياً كل 6 ساعات على 30 دقيقة',
          '3.375 g إلى 4.5 g وريدياً كل 8 ساعات تسريب ممتد على 4 ساعات',
          'CrCl 20-50: 3.375g كل 6 ساعات؛ CrCl < 20: 2.25g كل 6 ساعات؛ يضمن بقاء التركيز فوق MIC لأطول فترة (%T > MIC).'
        ],
        [
          'Meropenem',
          '1 g إلى 2 g وريدياً كل 8 ساعات على 30 دقيقة',
          '1 g إلى 2 g وريدياً كل 8 ساعات تسريب ممتد على 3 ساعات',
          'CrCl 26-50: 1g كل 12 ساعة؛ CrCl 10-25: 500mg كل 12 ساعة؛ الدواء المفضل لبكتيريا ESBL.'
        ],
        [
          'Aztreonam',
          '2 g وريدياً كل 8 ساعات على 30 دقيقة',
          '2 g وريدياً كل 8 ساعات تسريب ممتد على 3-4 ساعات',
          'CrCl 10-30: 1g كل 8 ساعات؛ CrCl < 10: 500mg كل 8 ساعات؛ آمن 100% في حساسية البنسلين المفرطة.'
        ],
        [
          'Vancomycin',
          'جرعة تحميل: 25-35 mg/kg وريدياً x 1 (بحد أقصى 2-3 غ) على ساعتين',
          'جرعة استمرار: 15-20 mg/kg وريدياً كل 8 إلى 12 ساعة حسب CrCl',
          'الهدف: AUC24/MIC بين 400-600. تركيزات القاع القديمة (15-20 mcg/mL) ترفع خطر السمية الكلوية الحادة.'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'accp-sepsis-sec1',
      number: '1.0',
      heading: 'Sepsis-3 Definitions, Pathophysiology, and Microvascular Collapse',
      headingAr: 'تعريفات Sepsis-3، الفيزيولوجيا المرضية، وانهيار الدوران الدقيق',
      evidenceGrade: 'Third International Consensus Definitions (Sepsis-3)',
      body: `The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3) redefined sepsis as life-threatening organ dysfunction caused by a dysregulated host response to infection. Organ dysfunction is objectively quantified as an acute change in total Sequential Organ Failure Assessment (SOFA) score of >= 2 points consequent to the infection, which is associated with an in-hospital mortality excess of > 10%.

Clinical Definitions:
- Sepsis: Suspected or documented infection plus acute organ dysfunction (delta SOFA >= 2).
- Septic Shock: A subset of sepsis in which underlying circulatory and cellular/metabolic abnormalities are profound enough to substantially increase mortality (> 40%). Clinically defined by:
  1. Persistent hypotension requiring vasopressors to maintain MAP >= 65 mmHg DESPITE adequate volume resuscitation; AND
  2. Serum lactate > 2.0 mmol/L (18 mg/dL) despite adequate volume resuscitation.
- Quick SOFA (qSOFA): Bedside prompt identifying patients outside the ICU at risk of poor outcomes:
  * Respiratory rate >= 22 breaths/min;
  * Altered mentation (Glasgow Coma Scale < 15);
  * Systolic blood pressure <= 100 mmHg.
  (Presence of >= 2 criteria prompts immediate SOFA scoring and intensive diagnostic workup).

Pathophysiology of Microvascular Collapse:
Microbial pathogen-associated molecular patterns (PAMPs, such as gram-negative endotoxin/LPS and gram-positive lipoteichoic acid) bind toll-like receptors (TLRs) on monocytes and endothelial cells. This stimulates excessive nuclear factor-kappa B (NF-kB) activation, releasing massive waves of proinflammatory cytokines (tumor necrosis factor-alpha [TNF-alpha], interleukin-1-beta [IL-1b], interleukin-6 [IL-6]). 

The systemic endothelium suffers extensive glycocalyx shedding, inducible nitric oxide synthase (iNOS) hyperactivation, endothelial barrier breakdown with capillary leak, and microvascular thrombosis via tissue factor expression. The net result is profound relative and absolute hypovolemia, loss of systemic vascular resistance (distributive shock), microvascular shunting, mitochondrial bioenergetic exhaustion (cytopathic hypoxia), and multiorgan failure.`
    },
    {
      id: 'accp-sepsis-sec2',
      number: '2.0',
      heading: 'Surviving Sepsis Campaign 1-Hour Emergency Resuscitation Bundle',
      headingAr: 'حزمة الإنعاش الإسعافي خلال ساعة واحدة (SSC 1-Hour Bundle)',
      evidenceGrade: 'Surviving Sepsis Campaign Class I',
      body: `The Surviving Sepsis Campaign establishes the "1-Hour Bundle" as the primary operational directive for emergency departments, medical wards, and intensive care units. Resuscitation should begin immediately upon recognition:

1. Measure blood lactate immediately; remeasure within 2 to 4 hours if initial lactate is elevated (> 2.0 mmol/L). Lactate normalization reflects restoration of tissue oxygen delivery and cellular clearance.
2. Obtain blood cultures prior to antibiotic administration. Draw two sets of blood cultures (aerobic and anaerobic bottles) from two distinct anatomical sites. Do not delay antibiotic initiation if culture draws encounter technical hurdles beyond 45 minutes.
3. Administer broad-spectrum intravenous antimicrobials within 1 hour of recognition. For septic shock, every 60 minutes of delay in antibiotic delivery increases absolute mortality by approximately 8%.
4. Administer 30 mL/kg of IV crystalloids within 3 hours for hypotension (MAP < 65 mmHg) or initial serum lactate >= 4.0 mmol/L (36 mg/dL).
5. Apply vasopressors during or immediately after fluid resuscitation to maintain MAP >= 65 mmHg. Do not wait for 30 mL/kg infusion to finish before starting norepinephrine if profound hypotension (MAP < 55) threatens coronary or cerebral perfusion.`
    },
    {
      id: 'accp-sepsis-sec3',
      number: '3.0',
      heading: 'Fluid Selection: Balanced Crystalloids vs 0.9% Normal Saline vs Albumin',
      headingAr: 'اختيار السوائل الوريدية: المحاليل المتوازنة مقابل النورمال سالين والألبومين',
      evidenceGrade: 'Surviving Sepsis Campaign Strong Recommendation',
      body: `CRYSTALLOIDS AS FIRST-LINE RESUSCITATION:
For initial fluid resuscitation, crystalloids are strongly recommended over colloids or synthetic starches.

Balanced Crystalloids vs 0.9% Normal Saline:
- Balanced crystalloids (Lactated Ringer's solution or Plasma-Lyte A) have electrolyte compositions closely mirroring human plasma (Chloride: 109–98 mEq/L, compared to 154 mEq/L in 0.9% NaCl).
- Pathologic Consequences of 0.9% Normal Saline: Rapid infusion of large volumes of 0.9% NaCl causes marked hyperchloremia. Excess chloride ions traversing the macula densa in the juxtaglomerular apparatus provoke renal afferent arteriolar vasoconstriction, precipitating acute kidney injury (AKI) and renal tubular ischemia. Furthermore, high chloride shifts bicarbonate out of plasma, generating hyperchloremic metabolic acidosis.
- Clinical Evidence: The landmark SMART and SALT-ED randomized trials demonstrated that balanced crystalloids significantly reduced the 30-day composite of Major Adverse Kidney Events (MAKE30: death, new renal replacement therapy, or persistent renal dysfunction) compared with 0.9% saline.
- Guideline Directive: Balanced crystalloids are the fluid of choice for resuscitation in sepsis and septic shock.

Role of Human Albumin:
- In patients who have received large volumes of crystalloids (e.g., > 30-50 mL/kg) and remain in persistent shock, the addition of 5% or 20% human albumin is suggested (ALBIOS trial demonstrated improved hemodynamics and physiological MAP maintenance).
- Synthetic Colloids (Hydroxyethyl Starches - HES): Strictly contraindicated in sepsis due to substantial increases in acute kidney injury requiring hemodialysis and increased mortality.`
    },
    {
      id: 'accp-sepsis-sec4',
      number: '4.0',
      heading: 'Vasoactive Agent Hierarchy: Norepinephrine, Vasopressin, Epinephrine',
      headingAr: 'التسلسل الهرمي لرافعات الضغط: النورإبينفرين، الفازوبريسين، والإبينفرين',
      evidenceGrade: 'Surviving Sepsis Campaign Strong Recommendation, High-Quality Evidence',
      body: `When fluid administration fails to restore a Mean Arterial Pressure (MAP) >= 65 mmHg, vasoactive agents must be titrated immediately:

1. Norepinephrine (Levophed) — The Uncontested First-Line Agent:
- Receptor Profile: Potent alpha-1 and alpha-2 adrenergic agonist with modest beta-1 adrenergic activity.
- Hemodynamic Actions: Produces intense peripheral vasoconstriction, increasing systemic vascular resistance (SVR) and effective arterial elastance, with mild positive inotropy without excessive tachycardia.
- Dosing: 0.02 to 0.5 mcg/kg/min (titrate every 2-5 minutes to target MAP >= 65 mmHg).
- Clinical Advantage: Proven superior to Dopamine in the landmark SOAP II trial, where dopamine caused significantly higher tachydysrhythmias (24% vs 12%) and significantly increased mortality in cardiogenic and septic shock.

2. Vasopressin (Arginine Vasopressin - AVP) — The Second-Line Adjunct:
- Receptor Profile: Direct stimulation of vascular V1 receptors on vascular smooth muscle, activating phospholipase C and protein kinase C independent of adrenergic receptors.
- Rationale: In septic shock, endogenous pituitary vasopressin stores become depleted within hours ("relative vasopressin deficiency"). Exogenous replacement restores vascular tone even in acidotic environments where catecholamine receptors are desensitized.
- Dosing: FIXED DOSE of 0.03 units/min continuous infusion.
- Operational Directive: Vasopressin should NOT be titrated up and down. Initiate when norepinephrine requirements escalate (e.g., reaching 0.25 mcg/kg/min) to facilitate catecholamine weaning (VASST trial). Doses > 0.04 units/min cause severe mesenteric, digital, and coronary vasoconstriction.

3. Epinephrine (Adrenaline) — The Third-Line Agent:
- Receptor Profile: Potent alpha-1, beta-1, and beta-2 adrenergic agonist.
- Dosing: 0.05 to 0.5 mcg/kg/min continuous infusion.
- Clinical Use: Recommended as add-on therapy when norepinephrine plus vasopressin fail to achieve target MAP. Note: Epinephrine stimulates beta-2 mediated aerobic glycolysis, temporarily driving serum lactate higher; this pharmacologic lactate bump must be distinguished from true worsening tissue hypoperfusion.

4. Inotrope Selection for Myocardial Dysfunction (Dobutamine):
- If the patient demonstrates persistent hypoperfusion (elevated lactate, low ScvO2 < 70%, cool extremities) despite adequate MAP and fluid loading, add Dobutamine (2.5 to 10 mcg/kg/min) to norepinephrine.`
    },
    {
      id: 'accp-sepsis-sec5',
      number: '5.0',
      heading: 'Inpatient Antimicrobial Selection & Extended-Infusion Pharmacokinetics',
      headingAr: 'اختيار المضادات الحيوية وحركية التسريب الممتد (Extended Infusion)',
      evidenceGrade: 'IDSA / Surviving Sepsis Guidelines',
      body: `Empiric antimicrobial coverage for severe inpatient sepsis and hospital-acquired pneumonia (HAP/VAP) must cover both Gram-negative pathogens (including Pseudomonas aeruginosa, Enterobacterales, Klebsiella pneumoniae, Acinetobacter) and Gram-positive pathogens (including Methicillin-Resistant Staphylococcus aureus - MRSA).

Extended-Infusion Beta-Lactam Pharmacokinetics:
Beta-lactams exhibit time-dependent bactericidal activity. The pharmacokinetic/pharmacodynamic (PK/PD) parameter that predicts clinical cure and microbiological eradication is the percentage of the dosing interval during which free drug concentration remains above the minimum inhibitory concentration (%fT > MIC).
- Standard Infusion (30 minutes): Results in high peak concentrations (Cmax) far exceeding the MIC, followed by rapid renal elimination, allowing trough concentrations to drop below the MIC for resistant organisms.
- Extended Infusion (3 to 4 hours) or Continuous Infusion: Sustains serum and epithelial lining fluid concentrations above the MIC for >= 60-100% of the dosing interval. Clinical trials and meta-analyses establish lower hospital mortality and faster clinical resolution in critically ill ICU patients treated with extended-infusion beta-lactams.

Standard Inpatient Regimens:
1. Cefepime: 2 g IV every 8 hours infused over 4 hours (Extended Infusion). Adjust dose aggressively if renal function declines (CrCl < 50 mL/min) to avoid neurotoxicity (encephalopathy, myoclonus, seizures).
2. Piperacillin/Tazobactam: 4.5 g IV every 6 hours over 30 min OR 3.375 g to 4.5 g IV every 8 hours infused over 4 hours (Extended Infusion). Note: Co-administration with Vancomycin synergistically increases acute kidney injury risk; switch to Cefepime or Meropenem if nephrotoxicity emerges.
3. Meropenem: 1 g to 2 g IV every 8 hours infused over 3 hours. Preferred for confirmed or high-suspicion Extended-Spectrum Beta-Lactamase (ESBL) producing organisms.`
    },
    {
      id: 'accp-sepsis-sec6',
      number: '6.0',
      heading: 'Severe Beta-Lactam Allergy Algorithm: The Aztreonam Safety Bridge',
      headingAr: 'خوارزمية حساسية البنسلين الشديدة: جسر الأمان الدوائي بـ Aztreonam',
      evidenceGrade: 'AAAAI / IDSA Allergy Consensus Guidelines',
      body: `Penicillin allergy is documented in approximately 10% of hospital inpatients, yet >90% of these patients tolerate beta-lactams upon skin testing or challenge. However, in acute critical illness with a documented history of severe Type I IgE-mediated anaphylaxis (bronchospasm, laryngeal angioedema, hypotension, hives within 1 hour) or severe cutaneous adverse reactions (SCAR: DRESS, SJS/TEN), beta-lactams with identical cross-reactive side chains must be strictly avoided.

THE MONOBACTAM EXCEPTION (AZTREONAM):
- Molecular Structure: Aztreonam is a synthetic monocyclic beta-lactam (monobactam) possessing a single beta-lactam ring without an adjacent bicyclic fused ring structure.
- Immunologic Specificity: Clinical and immunologic studies prove that IgE antibodies directed against penicillin, carbapenems, and general cephalosporins do NOT recognize or bind Aztreonam.
- THE SOLE EXCEPTION (Ceftazidime): Aztreonam shares an identical 2-aminothiazol-4-yl, 2-carboxypropan-2-yloxyimino acetyl side chain at the C-7/C-3 position with Ceftazidime. Therefore, patients with a verified IgE allergy to Ceftazidime should NOT receive Aztreonam.
- Aztreonam Spectrum: Potent bactericidal activity exclusively against aerobic Gram-negative bacilli, including Pseudomonas aeruginosa. It has ZERO activity against Gram-positive or anaerobic organisms.

Empiric Regimen for Severe Penicillin Anaphylaxis in Septic Shock:
1. Aztreonam: 2 g IV every 8 hours (Gram-negative & antipseudomonal backbone).
2. Vancomycin (or Linezolid): For Gram-positive and MRSA coverage.
3. Tobramycin or Amikacin (or Ciprofloxacin): Added as a second antipseudomonal agent in high-risk septic shock or severe pneumonia.`
    },
    {
      id: 'accp-sepsis-sec7',
      number: '7.0',
      heading: 'Vancomycin AUC/MIC Bayesian Monitoring vs Trough-Based Protocols',
      headingAr: 'مراقبة الفانكومايسين بـ AUC/MIC البايزي مقابل تراكيز القاع التقليدية',
      evidenceGrade: 'IDSA/ASHP/SIDP Consensus Guidelines',
      body: `Vancomycin exhibits time-dependent bactericidal activity with a post-antibiotic effect. The 2020 ASHP/IDSA/PIDS/SIDP Consensus Guidelines fundamentally revised Vancomycin therapeutic drug monitoring (TDM):

THE THERAPEUTIC MONITORING PARADIGM:
- Target PK/PD Parameter: 24-hour Area Under the Curve to Minimum Inhibitory Concentration ratio (AUC24/MIC) of 400 to 600 mg*hr/L (assuming an institutional broth microdilution MIC <= 1 mg/L).
- Abandonment of Traditional Troughs (15-20 mcg/mL): Traditional maintenance of high trough concentrations (15–20 mcg/mL) in an attempt to reach AUC targets resulted in a 3- to 4-fold increase in vancomycin-induced nephrotoxicity (VIN) without improving clinical efficacy or microbiologic cure.
- Preferred Monitoring Methodology: Bayesian software modeling utilizing a single steady-state concentration (collected at 24-48 hours) or traditional 2-point pharmacokinetic sampling (peak drawn 1-2 hours post-infusion and trough drawn within 30 minutes prior to the next dose).

Loading and Maintenance Dosing:
- Weight-Based Loading Dose: In critically ill septic patients, administer an initial loading dose of 25 to 35 mg/kg (based on actual body weight, capped at 2000–3000 mg) infused at a rate not exceeding 1000 mg/hour to avert vancomycin infusion reaction ("Red Man Syndrome").
- Empirical Maintenance Dosing: 15 to 20 mg/kg IV every 8 to 12 hours in patients with normal renal function, guided by calculated Cockcroft-Gault CrCl.`
    },
    {
      id: 'accp-sepsis-sec8',
      number: '8.0',
      heading: 'Corticosteroids, Stress Ulcer Prophylaxis, and ICU Board Pearls',
      headingAr: 'الكورتيزون، الوقاية من قرحة الشدة، ولآلئ بورد العناية المركزة',
      evidenceGrade: 'Surviving Sepsis Campaign Guidelines & Consensus',
      body: `1. Adjunctive Corticosteroid Therapy:
   - Indication: Indicated ONLY in adult patients with septic shock who require ongoing high-dose vasopressor therapy (e.g., Norepinephrine equivalent >= 0.25 mcg/kg/min for at least 4 hours) to maintain target MAP.
   - Regimen: Intravenous Hydrocortisone 200 mg daily, administered as 50 mg IV every 6 hours or as a continuous infusion.
   - Clinical Benefit: Accelerates shock reversal and time to vasopressor discontinuation (ADRENAL and APROCCHSS trials). Taper hydrocortisone when vasopressors are no longer required. Routine ACTH cosyntropin stimulation testing is unnecessary.

2. Stress Ulcer Prophylaxis (SUP) in the ICU:
   - Mandatory Indications (Major Risk Factors):
     a) Mechanical ventilation anticipated for >= 48 hours;
     b) Coagulopathy (Platelets < 50,000/mcL, INR > 1.5, or aPTT > 2x control).
   - Minor Indications (Presence of >= 2 risk factors): Sepsis, ICU stay > 1 week, occult GI bleed within past year, high-dose corticosteroid therapy (> 250 mg hydrocortisone equivalent/day).
   - Agent Selection: H2-receptor antagonists (Famotidine 20 mg IV/PO BID) or Proton Pump Inhibitors (Pantoprazole 40 mg IV/PO daily). Discontinue SUP immediately upon resolution of critical risk factors (extubation and resolution of coagulopathy) to minimize secondary Clostridioides difficile enterocolitis and nosocomial pneumonia.

3. Venous Thromboembolism (VTE) Prophylaxis:
   - Enoxaparin 40 mg SC once daily (reduce to 30 mg SC once daily if CrCl < 30 mL/min) is superior to Unfractionated Heparin 5000 units SC q8h in preventing deep vein thrombosis in critically ill medical-surgical patients, with equivalent bleeding risks.`
    }
  ]
};

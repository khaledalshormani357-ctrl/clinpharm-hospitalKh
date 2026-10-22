import { VerbatimChapter } from '../libraryTypes';

export const hospitalDosingChapter: VerbatimChapter = {
  id: 'hospital-compendium-protocols',
  bookId: 'hospital-compendium',
  chapterNumber: 1,
  title: 'Hospital Clinical Dosing Compendium: High-Alert IV Infusion Protocols, Electrolyte Replacement, and ICU Safety Ceilings',
  titleAr: 'موسوعة جرعات المستشفيات: بروتوكولات التسريب الوريدي عالي الخطورة، تعويض الكهارل، وحدود أمان العناية المركزة',
  authors: 'Inpatient Clinical Pharmacy Compendium Editorial Board; Critical Care Medication Safety Committee',
  edition: '2026 Inpatient Hospital Edition',
  pageRange: 'pp. 1–92',
  systemCategory: 'Hospital Dosing & IV Protocols',
  systemCategoryAr: 'بروتوكولات التغذية والكهارل والتسريب الوريدي',
  uan: '0217-0000-26-090-L01-P',
  sourceUrl: 'local://ref/chapter/hospital-compendium-protocols',
  isVerbatimSource: true,
  citation:
    'Clinical Pharmacy Hospital Dosing Compendium. High-Alert IV Protocols and Electrolyte Safety. Inpatient Pharmacy Service; 2026:1-92. [local://ref/chapter/hospital-compendium-protocols]',
  learningObjectives: [
    'Enforce peripheral versus central intravenous infusion rate and concentration ceilings for potassium chloride to prevent fatal extravasation and cardiac arrest.',
    'Execute urgent intravenous magnesium sulfate replacement protocols for severe hypomagnesemia and Torsades de Pointes arrhythmogenesis.',
    'Calculate and titrate continuous unfractionated heparin infusions using weight-based nomograms and anti-Factor Xa monitoring targets.',
    'Safely dilute and titrate high-alert vasoactive infusions (Norepinephrine, Epinephrine, Vasopressin, Dobutamine) in critical care resuscitation.'
  ],
  toc: [
    { id: 'hosp-sec1', number: '1.0', title: 'High-Alert Medication Safety Principles & Administration Ceilings' },
    { id: 'hosp-sec2', number: '2.0', title: 'Potassium Chloride Replacement Protocol: Peripheral vs Central Constraints' },
    { id: 'hosp-sec3', number: '3.0', title: 'Magnesium Sulfate IV Replacement & Torsades de Pointes Resuscitation' },
    { id: 'hosp-sec4', number: '4.0', title: 'Phosphate Replacement: Sodium Phosphate vs Potassium Phosphate' },
    { id: 'hosp-sec5', number: '5.0', title: 'Continuous Unfractionated Heparin (UFH) Weight-Based Titration Nomogram' },
    { id: 'hosp-sec6', number: '6.0', title: 'Vasoactive ICU Infusion Formulations, Compatibility, and Extravasation Phentolamine Protocol' }
  ],
  boardPearls: [
    'POTASSIUM IV RATE CEILING: Never infuse intravenous potassium chloride at a rate exceeding 10 mEq/hour via a peripheral intravenous line (concentration ceiling: 40 mEq/L). Infusion rates up to 20 mEq/hour require a dedicated Central Venous Catheter (CVC) and continuous cardiac telemetry monitoring to avoid fatal chemical phlebitis and cardiac arrest.',
    'POTASSIUM IV PUSH IS FATAL: Potassium chloride must NEVER be administered by direct intravenous push or rapid undiluted bolus. Rapid intravenous injection causes immediate ventricular fibrillation and asystole (used historically in judicial lethal injections). Ensure clear auxiliary warning labels.',
    'REFRACTORY HYPOKALEMIA OWING TO HYPOMAGNESEMIA: Hypokalemia refractory to aggressive potassium supplementation is almost invariably driven by concomitant uncorrected hypomagnesemia. Magnesium is an essential cofactor for the Na+/K+ ATPase pump; hypomagnesemia permits uninhibited renal potassium wasting via the ROMK channels. ALWAYS check and correct magnesium first.',
    'PHOSPHATE ORDERING IN MILLIMOLES, NOT MILLIGRAMS: Intravenous phosphate must always be ordered in millimoles (mmol) of phosphate, NOT in milligrams or ampuls. Specify whether Sodium Phosphate or Potassium Phosphate is intended, and account for the accompanying 4 mEq of potassium provided by every 3 mmol of potassium phosphate.',
    'PHENTOLAMINE EXTRAVASATION RESCUE: In the event of peripheral extravasation of norepinephrine, dopamine, or epinephrine, immediately stop the infusion, leave catheter in place, aspirate extravasated drug, and infiltrate the affected ischemic tissue with Phentolamine (5 to 10 mg diluted in 10-15 mL normal saline) via multiple fine subcutaneous injections to block alpha-1 vasoconstriction and prevent limb amputation.'
  ],
  boardPearlsAr: [
    'سقف تسريب البوتاسيوم الوريدي: لا يجوز نهائياً تسريب كلوريد البوتاسيوم بمعدل يتجاوز 10 mEq/الساعة في الوريد المحيطي (التركيز الأقصى 40 mEq/L). التسريب بمعدل 20 mEq/ساعة يتطلب قسطرة وريد مركزي (CVC) وتخطيط قلب مستمر لتجنب توقف القلب.',
    'حقن البوتاسيوم المباشر قاتل: يُحظر حقن البوتاسيوم وريدياً مباشراً (IV Push) نهائياً لأنه يسبب رجفاناً بطينياً وتوقفاً فورياً للقلب. يجب تمديده في محاليل وريدية وتسريبه بمضخة مبرمجة.',
    'نقص البوتاسيوم المعند بسبب نقص المغنيسيوم: عدم استجابة البوتاسيوم للتعويض المتكرر يعود في الغالب لنقص المغنيسيوم المرافق. المغنيسيوم ضروري لعمل مضخة الصوديوم/بوتاسيوم وإغلاق قنوات ROMK الكلوية؛ يجب فحص وتعويض المغنيسيوم أولاً.',
    'طلب الفوسفات بالملي مول (mmol): يجب طلب الفوسفات الوريدي بوحدة الملي مول حصراً. كل 3 mmol من فوسفات البوتاسيوم تحوي معها 4.4 mEq من البوتاسيوم، وهو ما يجب حسابه بدقة.',
    'إنقاذ تسرب رافعات الضغط بـ Phentolamine: عند تسرب النورإبينفرين للنسيج المحيطي، يجب إيقاف التسريب فوراً وحقن Phentolamine (5-10 ملغ في 10-15 مل سالين) تحت الجلد بموقع التسرب لمعاكسة تقبض الأوعية ومنع تموت وبتر الطرف.'
  ],
  keywords: [
    'High-Alert',
    'Potassium Chloride',
    'Magnesium Sulfate',
    'Phosphate',
    'Heparin Nomogram',
    'Extravasation',
    'Phentolamine',
    'Central Line',
    'Peripheral Line',
    'Anti-Xa'
  ],
  quickTables: [
    {
      title: 'Inpatient Intravenous Electrolyte Replacement Ceilings and Infusion Guidelines',
      titleAr: 'حدود أمان تسريب الكهارل الوريدية في أقسام المستشفى والعناية المركزة',
      headers: ['Electrolyte Deficit', 'Severity & Serum Level', 'Standard IV Replacement Regimen', 'Max Infusion Rate & Route Constraints'],
      headersAr: ['عجز الشوارد', 'الشدة ومستوى المصل', 'نظام التعويض الوريدي المعتمد', 'أقصى معدل تسريب ومحددات الوريد'],
      rows: [
        [
          'Hypokalemia (K+)',
          'Mild: 3.0 to 3.4 mEq/L',
          'Oral replacement preferred: 20 to 40 mEq PO daily or BID with meals.',
          'Oral administration is safest. Every 10 mEq of potassium chloride increases serum K+ by approximately 0.1 mEq/L.'
        ],
        [
          'Hypokalemia (K+)',
          'Severe: < 3.0 mEq/L or Symptomatic / NPO',
          'Potassium Chloride 20 to 40 mEq IV diluted in 500 mL normal saline.',
          'Peripheral line MAX: 10 mEq/hour (max conc: 40 mEq/L). Central line MAX: 20 mEq/hour with continuous ECG telemetry. NEVER IV PUSH.'
        ],
        [
          'Hypomagnesemia (Mg2+)',
          'Mild-Moderate: 1.0 to 1.5 mg/dL',
          'Magnesium Sulfate 1 g to 2 g (8 to 16 mEq) IV in 100 mL D5W or NS over 1 to 2 hours.',
          'Infuse at <= 1 g/hour to avoid renal wasting and hypotensive flushing. Up to 50% of infused magnesium is excreted in urine.'
        ],
        [
          'Hypomagnesemia (Mg2+)',
          'Severe: < 1.0 mg/dL or Torsades de Pointes',
          'Magnesium Sulfate 2 g to 4 g IV over 10 to 15 minutes (in cardiac arrest or active Torsades).',
          'Follow with continuous IV infusion of 1 to 2 g/hour for 4 to 6 hours. Monitor deep tendon reflexes and respiratory rate.'
        ],
        [
          'Hypophosphatemia (PO4)',
          'Moderate: 1.0 to 1.9 mg/dL',
          'Sodium Phosphate or Potassium Phosphate 0.16 to 0.32 mmol/kg IV in 250 mL NS over 4 to 6 hours.',
          'Maximum infusion rate: 7 mmol/hour. Use Potassium Phosphate ONLY if serum K+ < 4.0 mEq/L (provides ~4.4 mEq K+ per 3 mmol PO4).'
        ]
      ],
      rowsAr: [
        [
          'نقص البوتاسيوم',
          'خفيف: 3.0 إلى 3.4 mEq/L',
          'التعويض الفموي مفضل: 20 إلى 40 mEq فموياً يومياً مع الوجبات.',
          'الطريق الفموي هو الأكثر أماناً. كل 10 mEq كلوريد بوتاسيوم ترفع بوتاسيوم المصل بنحو 0.1 mEq/L تقريباً.'
        ],
        [
          'نقص البوتاسيوم',
          'شديد: < 3.0 mEq/L أو أعراض / صائم',
          'كلوريد البوتاسيوم 20 إلى 40 mEq وريدياً ممددة في 500 مل سالين.',
          'وريد محيطي: حد أقصى 10 mEq/ساعة. وريد مركزي: حد أقصى 20 mEq/ساعة مع تخطيط قلب مستمر. يحظر الحقن المباشر.'
        ],
        [
          'نقص المغنيسيوم',
          'متوسط: 1.0 إلى 1.5 mg/dL',
          'سلفات المغنيسيوم 1 إلى 2 غ وريدياً في 100 مل مغذي على 1-2 ساعة.',
          'معدل التسريب <= 1 غ/الساعة لتجنب الطرح الكلوي وهبوط الضغط. يطرح نصف المغنيسيوم المحقون في البول سريعاً.'
        ],
        [
          'نقص المغنيسيوم',
          'شديد: < 1.0 mg/dL أو توقف قلب / Torsades',
          'سلفات المغنيسيوم 2 إلى 4 غ وريدياً على 10 إلى 15 دقيقة إسعافياً.',
          'تتبع بتسريب مستمر بمعدل 1-2 غ/ساعة لمدة 4-6 ساعات. مراقبة المنعكسات الوترية العميقة ومعدل التنفس.'
        ],
        [
          'نقص الفوسفات',
          'متوسط: 1.0 إلى 1.9 mg/dL',
          'فوسفات الصوديوم أو البوتاسيوم 0.16 إلى 0.32 mmol/kg في 250 مل على 4-6 ساعات.',
          'أقصى معدل تسريب: 7 mmol/الساعة. استخدام فوسفات البوتاسيوم فقط إذا كان البوتاسيوم < 4.0 mEq/L.'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'hosp-sec1',
      number: '1.0',
      heading: 'High-Alert Medication Safety Principles & Administration Ceilings',
      headingAr: 'مبادئ سلامة الأدوية عالية الخطورة وحدود التراكيز ومعدلات التسريب',
      evidenceGrade: 'Institute for Safe Medication Practices (ISMP) Standards',
      body: `High-alert medications are drugs that bear a heightened risk of causing significant patient harm or catastrophic mortality when used in error. In hospitalized adult patients, the top categories implicated in fatal adverse events are:
1. Concentrated injectable electrolytes (Potassium Chloride, Potassium Phosphate, Hypertonic Saline);
2. Anticoagulants and antithrombotics (IV Unfractionated Heparin, subcutaneous LMWH);
3. Insulin formulations (intravenous regular insulin infusions);
4. Vasoactive adrenergic infusions (Norepinephrine, Epinephrine, Vasopressin, Phenylephrine);
5. Intravenous narcotics, sedatives, and neuromuscular blocking agents.

CORE INSTITUTIONAL SAFEGUARDS:
- Independent Double-Check: Two licensed clinicians (pharmacist and registered nurse) must independently verify the patient identity, drug name, calculated dose, infusion rate, pump programming, and concentration prior to initiation or rate titration of any high-alert intravenous infusion.
- Removal of Concentrated Potassium from Patient Units: Concentrated potassium chloride vials (2 mEq/mL) must NEVER be stored as floor stock in general or intensive care patient care areas; all solutions must be premixed and dispensed directly from the central inpatient pharmacy.
- Smart Infusion Pumps with Dose Error Reduction Systems (DERS): All continuous infusions must be administered via smart infusion pumps loaded with verified hospital drug libraries enforcing "Hard" and "Soft" dose rate and concentration limits.`
    },
    {
      id: 'hosp-sec2',
      number: '2.0',
      heading: 'Potassium Chloride Replacement Protocol: Peripheral vs Central Constraints',
      headingAr: 'بروتوكول تعويض كلوريد البوتاسيوم: المحددات المحيطية والمركزية الصارمة',
      evidenceGrade: 'Hospital Pharmacy Compendium & Safety Mandates',
      body: `POTASSIUM DEFICIT ESTIMATION:
In an adult patient with normal body composition, every 0.1 mEq/L decrement in serum potassium below 4.0 mEq/L corresponds to an approximate total-body deficit of 100 to 200 mEq of potassium. However, extracellular potassium represents only 2% of total body potassium stores; transcellular shifting can mask massive intracellular deficits.

ADMINISTRATION ROUTE CONSTRAINTS:
1. Oral Administration (The Safest Route):
   - Indicated whenever the gastrointestinal tract is functional and serum potassium is >= 3.0 mEq/L without active electrocardiographic abnormalities.
   - Typical oral dose: 20 to 40 mEq PO two to three times daily with meals. Oral doses > 40 mEq should be split into divided doses to prevent gastrointestinal mucosal irritation, nausea, and vomiting.
2. Peripheral Intravenous Infusion Limits:
   - Maximum Infusion Rate: 10 mEq/hour.
   - Maximum Peripheral Concentration: 40 mEq/L (e.g., 20 mEq in 500 mL normal saline or 10 mEq in 250 mL).
   - Higher concentrations cause excruciating vascular burning pain, chemical endophlebitis, and risk of superficial venous sclerosis.
3. Central Venous Catheter (CVC) Infusion Limits:
   - Maximum Infusion Rate: 20 mEq/hour.
   - Maximum Central Concentration: 80 mEq/L (e.g., 20 mEq in 250 mL or 40 mEq in 500 mL).
   - Mandatory Pre-requisite: Continuous electrocardiographic telemetry monitoring is MANDATORY whenever infusion rates exceed 10 mEq/hour to detect impending hyperkalemic electrophysiologic toxicity immediately.`
    },
    {
      id: 'hosp-sec3',
      number: '3.0',
      heading: 'Magnesium Sulfate IV Replacement & Torsades de Pointes Resuscitation',
      headingAr: 'تعويض سلفات المغنيسيوم وريدياً وإنعاش تسرع القلب البطيني (Torsades de Pointes)',
      evidenceGrade: 'AHA / ACC Emergency Cardiac Care Guidelines',
      body: `Magnesium is the second most abundant intracellular cation, functioning as a required cofactor in over 300 enzymatic reactions, most notably those involving adenosine triphosphate (ATP) hydrolysis and sodium-potassium ATPase pump activity.

THE HYPOKALEMIA-HYPOMAGNESEMIA INTERACTION:
- Renal Outer Medullary Potassium (ROMK) channels in the distal nephron are normally inhibited by intracellular magnesium ions. When intracellular magnesium is depleted, this inhibition is removed, permitting uncontrolled, massive kaliuresis into the tubular lumen.
- Consequently, refractory hypokalemia CANNOT be corrected until hypomagnesemia is resolved. Always measure and replate magnesium concomitantly.

DOSING & INFUSION PROTOCOLS:
- Asymptomatic / Mild-to-Moderate Hypomagnesemia (Serum Mg 1.0 to 1.5 mg/dL):
  * Regimen: Magnesium Sulfate 1 to 2 g (8 to 16 mEq) IV in 100 mL D5W or 0.9% NaCl infused over 1 to 2 hours.
  * Renal Kinetics: Up to 50% of an infused magnesium dose is rapidly eliminated in urine because the renal threshold is low. Therefore, slow infusions are far more physiologically effective at replenishing intracellular stores than rapid boluses.
- Severe / Symptomatic Hypomagnesemia (Serum Mg < 1.0 mg/dL):
  * Regimen: Magnesium Sulfate 4 to 8 g IV infused over 12 to 24 hours.
- Torsades de Pointes / Pulseless Ventricular Tachycardia Resuscitation:
  * In polymorphic ventricular tachycardia associated with a prolonged QT interval (Torsades de Pointes), administer Magnesium Sulfate 2 g IV push diluted in 10 mL D5W or NS over 1 to 2 minutes, regardless of baseline serum magnesium level. May repeat in 5 to 10 minutes if arrhythmia recurs, followed by a continuous infusion of 1 to 2 g/hour.`
    },
    {
      id: 'hosp-sec4',
      number: '4.0',
      heading: 'Phosphate Replacement: Sodium Phosphate vs Potassium Phosphate',
      headingAr: 'تعويض الفوسفات وريدياً: المفاضلة بين فوسفات الصوديوم وفوسفات البوتاسيوم',
      evidenceGrade: 'ASPEN Clinical Guidelines for Parenteral Nutrition & Electrolytes',
      body: `Phosphate is the critical intracellular anion required for 2,3-diphosphoglycerate (2,3-DPG) synthesis (governing hemoglobin-oxygen dissociation) and high-energy ATP generation. Severe hypophosphatemia (serum phosphate < 1.0 mg/dL) causes respiratory muscle weakness, failure to wean from mechanical ventilation, myocardial depression, rhabdomyolysis, and erythrocyte hemolysis.

REPLACEMENT GUIDELINES:
- Mandatory Unit of Ordering: Orders must be entered strictly in millimoles (mmol) of phosphate, NOT in milligrams or number of vials.
- Salt Selection:
  * Sodium Phosphate: 1 mmol of phosphate provides 1.33 mEq of Sodium (Na+). Indicated when serum potassium is normal or elevated (K+ >= 4.0 mEq/L).
  * Potassium Phosphate: 1 mmol of phosphate provides 1.47 mEq of Potassium (K+). (Approximately 3 mmol of phosphate delivers ~4.4 mEq of potassium). Indicated ONLY when serum potassium is low (< 4.0 mEq/L).
- Dosing Stratification:
  * Serum PO4 1.5 to 1.9 mg/dL: Administer 0.16 mmol/kg IV over 4 to 6 hours.
  * Serum PO4 1.0 to 1.4 mg/dL: Administer 0.32 mmol/kg IV over 4 to 6 hours.
  * Serum PO4 < 1.0 mg/dL: Administer 0.64 mmol/kg IV over 6 to 8 hours.
- Infusion Ceiling: Do NOT exceed a phosphate infusion rate of 7 mmol/hour to avoid acute hypocalcemia resulting from calcium-phosphate precipitation in soft tissues.`
    },
    {
      id: 'hosp-sec5',
      number: '5.0',
      heading: 'Continuous Unfractionated Heparin (UFH) Weight-Based Titration Nomogram',
      headingAr: 'جدول معايرة تسريب الهيبارين الوريدي غير المجزأ (UFH) المعتمد على الوزن',
      evidenceGrade: 'CHEST Antithrombotic Guidelines',
      body: `Continuous intravenous Unfractionated Heparin (UFH) is utilized for acute pulmonary embolism, deep vein thrombosis, and acute coronary syndromes. Weight-based nomograms achieve rapid therapeutic anticoagulation within 24 hours far more effectively than fixed-dose empiric protocols.

STANDARD WEIGHT-BASED VTE NOMOGRAM (Target Anti-Xa: 0.3 to 0.7 units/mL or aPTT: 60 to 80 seconds):
- Initial Loading Dose: 80 units/kg IV bolus (actual body weight, maximum 10,000 units).
- Initial Maintenance Infusion: 18 units/kg/hour continuous infusion (maximum initial rate 2000 units/hour).
- Titration Adjustments Based on Anti-Xa / aPTT Drawn Every 6 Hours:
  * Anti-Xa < 0.2 (aPTT < 45 sec): Re-bolus 80 units/kg, increase rate by 3 units/kg/hr. Recheck in 6 hours.
  * Anti-Xa 0.2 to 0.29 (aPTT 45-59 sec): Re-bolus 40 units/kg, increase rate by 1.5 units/kg/hr. Recheck in 6 hours.
  * Anti-Xa 0.3 to 0.7 (aPTT 60-80 sec) — THERAPEUTIC TARGET: No change. Recheck in 6 hours (or daily once therapeutic on 2 consecutive checks).
  * Anti-Xa 0.71 to 0.85 (aPTT 81-99 sec): Decrease infusion rate by 1 unit/kg/hr. Recheck in 6 hours.
  * Anti-Xa > 0.85 (aPTT > 100 sec): Hold infusion for 60 minutes, then decrease infusion rate by 2 to 3 units/kg/hr. Recheck in 6 hours.`
    },
    {
      id: 'hosp-sec6',
      number: '6.0',
      heading: 'Vasoactive ICU Infusion Formulations, Compatibility, and Extravasation Phentolamine Protocol',
      headingAr: 'محاليل رافعات الضغط في العناية، التوافق الدوائي، وبروتوكول Phentolamine للتسرب',
      evidenceGrade: 'ASHP / Critical Care Medication Safety Protocol',
      body: `VASOACTIVE CONCENTRATIONS & TITRATION:
- Norepinephrine (Levophed): Standard concentration: 4 mg in 250 mL D5W or NS (16 mcg/mL); Quad-strength concentrated solution: 16 mg in 250 mL (64 mcg/mL for fluid-restricted shock). Titrate by 0.02 to 0.05 mcg/kg/min every 2-5 minutes to target MAP >= 65 mmHg.
- Epinephrine: Standard concentration: 4 mg in 250 mL (16 mcg/mL). Dosed 0.01 to 0.5 mcg/kg/min.
- Vasopressin: Standard concentration: 20 units in 100 mL NS (0.2 units/mL). Dosed at FIXED 0.03 units/min.
- Dobutamine: Standard concentration: 250 mg in 250 mL D5W (1000 mcg/mL). Dosed 2.5 to 20 mcg/kg/min.

EXTRAVASATION EMERGENCY PROTOCOL (PHENTOLAMINE RESCUE):
Peripheral extravasation of alpha-1 agonists (norepinephrine, epinephrine, dopamine) induces severe, sustained local dermal and subcutaneous vasoconstriction, producing ischemic gangrene and tissue necrosis within hours.
- Management Protocol:
  1. Halt infusion immediately. Do NOT remove the intravenous catheter immediately.
  2. Aspirate as much of the extravasated vesicant drug as possible through the in-dwelling catheter.
  3. Prepare Phentolamine Mesylate: Dilute 5 to 10 mg of phentolamine in 10 to 15 mL of 0.9% Normal Saline.
  4. Infiltrate 1 to 5 mL of the solution directly through the catheter, then remove catheter.
  5. Using a fine-gauge (25 to 27 gauge) hypodermic needle, inject the remaining phentolamine solution liberally in multiple small subcutaneous wheals throughout the entire demarcated ischemic, blanched skin area.
  6. Efficacy: Phentolamine (a competitive non-selective alpha-adrenergic antagonist) immediately overcomes catecholamine-mediated vasoconstriction, restoring hyperemic capillary blood flow and averting amputation.`
    }
  ]
};

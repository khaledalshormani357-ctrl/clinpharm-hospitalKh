import { VerbatimChapter } from '../libraryTypes';

export const accpHepatologyEndocrineChapter: VerbatimChapter = {
  id: 'accp-v2-cirrhosis-dka',
  bookId: 'accp-2026-vol2',
  chapterNumber: 8,
  title: 'Gastroenterology, Hepatology & Endocrinology: Decompensated Cirrhosis, Ascites, Hepatic Encephalopathy, and DKA Protocol',
  titleAr: 'أمراض الكبد والجهاز الهضمي والغدد الصماء: تشمع الكبد اللامعاوض، الحبن (Ascites)، الاعتلال الدماغي الكبدي، وبروتوكول DKA',
  authors: 'Kelly E. Cochran, PharmD, BCPS; Christie A. Schumacher, PharmD, FCCP, BCPS, BC-ADM',
  edition: '2026 Edition (American College of Clinical Pharmacy)',
  pageRange: 'pp. 295–368',
  systemCategory: 'Gastroenterology & Hepatology',
  systemCategoryAr: 'أمراض الجهاز الهضمي والكبد والغدد',
  uan: '0217-0000-26-028-L01-P',
  sourceUrl: 'local://ref/chapter/accp-v2-cirrhosis-dka',
  isVerbatimSource: true,
  citation:
    'Cochran KE, Schumacher CA. Hepatology and Endocrinology: Cirrhosis Complications and Glycemic Emergencies. In: Beckett RD, et al, eds. Updates in Therapeutics. 2026 ed. ACCP; 2026:295-368. [local://ref/chapter/accp-v2-cirrhosis-dka]',
  learningObjectives: [
    'Calculate the Child-Pugh and MELD-Na scores to quantify hepatic dysfunction and guide pharmacotherapeutic selection.',
    'Formulate an evidence-based ascites regimen adhering to the mandatory 100 mg:40 mg Spironolactone to Furosemide ratio.',
    'Implement emergency antibiotic and intravenous albumin protocols in spontaneous bacterial peritonitis (SBP) to prevent hepatorenal syndrome.',
    'Direct the stepwise titration of lactulose and rifaximin in overt hepatic encephalopathy while avoiding precipitating sedative medications.',
    'Execute the ADA DKA resuscitation algorithm, enforcing potassium prerequisites prior to insulin initiation and calculating the anion gap closure.'
  ],
  toc: [
    { id: 'accp-he-sec1', number: '1.0', title: 'Portal Hypertension Pathophysiology & Cirrhosis Staging (Child-Pugh & MELD)' },
    { id: 'accp-he-sec2', number: '2.0', title: 'Ascites Management: The 100:40 Spironolactone-to-Furosemide Ratio' },
    { id: 'accp-he-sec3', number: '3.0', title: 'Spontaneous Bacterial Peritonitis (SBP) & Intravenous Albumin Infusion' },
    { id: 'accp-he-sec4', number: '4.0', title: 'Hepatic Encephalopathy: Lactulose Titration & Rifaximin Dual Therapy' },
    { id: 'accp-he-sec5', number: '5.0', title: 'Diabetic Ketoacidosis (DKA): Diagnostic Criteria & Pathophysiology' },
    { id: 'accp-he-sec6', number: '6.0', title: 'DKA Potassium Precondition: The Mandatory K+ > 3.3 Rule Before Insulin' },
    { id: 'accp-he-sec7', number: '7.0', title: 'Insulin Infusion, Fluid Resuscitation, and Anion Gap Resolution Criteria' },
    { id: 'accp-he-sec8', number: '8.0', title: 'High-Yield Board Review Pearls, Drug Traps, and Subcutaneous Transition' }
  ],
  boardPearls: [
    'MANDATORY 100:40 DIURETIC RATIO IN CIRRHOTIC ASCITES: Ascites must be treated with Spironolactone and Furosemide in a strict 100 mg to 40 mg ratio (e.g., Spironolactone 100 mg + Furosemide 40 mg daily, titrated in tandem up to 400 mg:160 mg). This preserves serum potassium homeostasis by balancing aldosterone blockade with loop kaliuresis.',
    'IV ALBUMIN IN SBP PREVENTS HEPATORENAL SYNDROME: In spontaneous bacterial peritonitis (ascitic PMN >= 250 cells/mm3), intravenous albumin 25% (1.5 g/kg within 6 hours, followed by 1.0 g/kg on day 3) reduces renal impairment from 33% to 10% and significantly cuts in-hospital mortality (Sort trial).',
    'NEVER START INSULIN IN DKA IF K+ < 3.3 mEq/L: Initiating insulin when serum potassium is < 3.3 mEq/L triggers catastrophic transcellular potassium shifts into cells, resulting in lethal cardiac arrhythmias, respiratory muscle paralysis, and cardiac arrest. Hold insulin, give IV potassium at 20-40 mEq/hr, and start insulin ONLY when K+ >= 3.3 mEq/L.',
    'ADD DEXTROSE TO IV FLUIDS WHEN GLUCOSE REACHES 200 mg/dL: In DKA, when blood glucose drops below 200 mg/dL, add 5% to 10% Dextrose to the IV fluids while CONTINUING the regular insulin infusion at 0.02-0.05 units/kg/hr. Never stop insulin prematurely; the insulin is needed to close the ketoacidosis anion gap, not merely normalize glucose.',
    'MANDATORY 2-HOUR BASAL INSULIN OVERLAP: Subcutaneous basal insulin (Glargine or Degludec) must be administered at least 2 hours BEFORE stopping the intravenous insulin infusion. Discontinuing the IV insulin infusion without an active subcutaneous basal depot causes immediate rebound ketoacidosis within 30 to 60 minutes.'
  ],
  boardPearlsAr: [
    'النسبة الإلزامية لمدرات الحبن (100:40): يجب إعطاء Spironolactone و Furosemide بنسبة 100 ملغ إلى 40 ملغ دائماً (المعايرة التزامنية حتى 400:160) للحفاظ على توازن البوتاسيوم وتجنب اعتلال الدماغ.',
    'الألبومين الوريدي في SBP يمنع المتلازمة الكبدية الكلوية: عند تشخيص التهاب الصفاق الجرثومي (PMN >= 250)، إعطاء Albumin 25% بجرعة 1.5 g/kg خلال 6 ساعات ثم 1 g/kg باليوم الثالث يخفض الفشل الكلوي من 33% إلى 10% والوفيات بشكل حاسم.',
    'حظر بدء الإنسولين في DKA إذا كان البوتاسيوم < 3.3 mEq/L: بدء الإنسولين مع بوتاسيوم < 3.3 يؤدي لانتقال حاد للبوتاسيوم لداخل الخلايا مما يسبب توقف القلب والوفاة فوراً. يُعطى البوتاسيوم وريدياً أولاً ولا يبدأ الإنسولين إلا عندما K >= 3.3.',
    'إضافة الدكستروز فور وصول السكر إلى 200 mg/dL: عند هبوط سكر الدم إلى 200، تضاف السوائل السكرية (D5W) مع الاستمرار بالإنسولين الوريدي؛ الهدف هو إغلاق الفجوة الحماضية (Anion Gap) وليس مجرد خفض الجلوكوز.',
    'تداخل الساعتين الإلزامي قبل إيقاف إنسولين الوريد: يجب حقن الإنسولين القاعدي تحت الجلد (Glargine) قبل ساعتين على الأقل من إيقاف مضخة الإنسولين الوريدي لتجنب الارتداد الحماضي الحاد (Rebound DKA).'
  ],
  keywords: [
    'Cirrhosis',
    'Ascites',
    'Spironolactone',
    'Furosemide',
    'SBP',
    'Albumin',
    'Hepatic Encephalopathy',
    'Lactulose',
    'Rifaximin',
    'DKA',
    'Anion Gap',
    'Insulin Infusion',
    'Potassium Precondition'
  ],
  quickTables: [
    {
      title: 'Ascites and Spontaneous Bacterial Peritonitis Management Protocol',
      titleAr: 'بروتوكول تدبير الحبن والتهاب الصفاق الجرثومي العفوي (SBP) في تشمع الكبد',
      headers: ['Clinical Entity', 'Diagnostic Criteria', 'First-Line Pharmacotherapy', 'Secondary & Long-Term Prophylaxis'],
      headersAr: ['الحالة السريرية', 'المعايير التشخيصية', 'العلاج الدوائي الأساسي', 'الوقاية الثانوية والمتابعة'],
      rows: [
        [
          'Cirrhotic Ascites',
          'SAAG >= 1.1 g/dL (indicates portal hypertension) + ultrasound/physical distention',
          'Dietary sodium restriction (< 2000 mg/day or 88 mEq/day) + Spironolactone 100 mg PO + Furosemide 40 mg PO once daily in morning.',
          'Titrate every 3-5 days maintaining 100:40 ratio up to max 400 mg:160 mg. Target weight loss: 0.5 kg/day (without edema) or 1.0 kg/day (with edema).'
        ],
        [
          'Spontaneous Bacterial Peritonitis (SBP)',
          'Diagnostic paracentesis showing Ascitic fluid absolute Polymorphonuclear (PMN) count >= 250 cells/mm3',
          'Cefotaxime 2 g IV every 8 hours OR Ceftriaxone 2 g IV every 24 hours for 5 days + IV Albumin 25% (1.5 g/kg within 6 hours of diagnosis, and 1.0 g/kg on Day 3).',
          'Secondary Prophylaxis (indefinite until liver transplantation): Ciprofloxacin 500 mg PO once daily OR Trimethoprim-Sulfamethoxazole 1 DS PO once daily.'
        ],
        [
          'Hepatic Encephalopathy (Overt HE)',
          'West Haven Criteria (Grade II-IV: asterixis, confusion, somnolence, disorientation)',
          'Lactulose 20 to 30 g (30 to 45 mL) PO every 1-2 hours until bowel evacuation, then titrate to 15-30 mL PO TID-QID to achieve 2 to 3 soft bowel movements daily.',
          'Add Rifaximin 550 mg PO twice daily as combination therapy for recurrent episodes despite lactulose adherence. Strictly avoid benzodiazepines and narcotics.'
        ]
      ],
      rowsAr: [
        [
          'الحبن الكبدي (Ascites)',
          'SAAG >= 1.1 g/dL (تأكيد فرط ضغط وريد الباب) مع انتفاخ البطن بالأمواج الصوتية',
          'حمية منخفضة الصوديوم (< 2 غ/يوم) + Spironolactone 100 mg فموياً مع Furosemide 40 mg فموياً صباحاً بنسبة 100:40.',
          'المعايرة كل 3-5 أيام بنسبة 100:40 حتى حد أقصى 400:160. الهدف: فقدان وزن 0.5 كغ/يوم (بدون وذمات) أو 1.0 كغ/يوم (مع وذمات).'
        ],
        [
          'التهاب الصفاق الجرثومي (SBP)',
          'بزل البطن التشخيصي يظهر كريات بيضاء محببة (PMN) >= 250 خلية/ملم3 في سائل الحبن',
          'Cefotaxime 2 غ وريدياً كل 8 ساعات أو Ceftriaxone 2 غ كل 24 ساعة لمدة 5 أيام + Albumin 25% (1.5 غ/كغ خلال أول 6 ساعات، و 1.0 غ/كغ باليوم 3).',
          'الوقاية الثانوية المستمرة (حتى زراعة الكبد): Ciprofloxacin 500 mg يومياً فموياً أو Bactrim DS حبة يومياً لمنع النكس.'
        ],
        [
          'الاعتلال الدماغي الكبدي (Overt HE)',
          'معايير West Haven (درجة 2-4: خفقان اليدين Asterixis، تشوش ذهني، نعاس)',
          'Lactulose 30-45 مل كل ساعتين حتى التغوط، ثم معايرة الجرعة إلى 15-30 مل 3-4 مرات يومياً للوصول إلى 2-3 خروج لين يومياً.',
          'إضافة Rifaximin 550 mg فموياً مرتين يومياً كعلاج مشترك للنكس المتكرر. تجنب المهدئات والمنومات والمسكنات الأفيونية.'
        ]
      ]
    },
    {
      title: 'ADA Diabetic Ketoacidosis (DKA) Resuscitation and Resolution Algorithm',
      titleAr: 'خوارزمية الجمعية الأمريكية للسكري (ADA) لإنعاش وتدبير الحماض الكيتوني السكري (DKA)',
      headers: ['Protocol Step', 'Clinical Assessment', 'Pharmacotherapeutic Intervention', 'Safety Threshold & Transition Rule'],
      headersAr: ['خطوة البروتوكول', 'التقييم السريري', 'التدخل الدوائي الدقيق', 'عتبة الأمان وقواعد الانتقال'],
      rows: [
        [
          'Step 1: Fluid Resuscitation',
          'Severe volume depletion (typically 5 to 6 Liters deficit in adults)',
          'Infuse 0.9% Normal Saline at 1000 to 1500 mL/hr during the first hour.',
          'After hour 1, calculate corrected sodium. If corrected Na+ is normal/high, switch to 0.45% NaCl at 250-500 mL/hr. If low, continue 0.9% NaCl.'
        ],
        [
          'Step 2: Check Potassium BEFORE Insulin',
          'Serum K+ < 3.3 mEq/L',
          'HOLD ALL INSULIN. Infuse IV KCl at 20 to 40 mEq/hr until serum potassium reaches >= 3.3 mEq/L.',
          'CRITICAL SAFETY MANDATE: Insulin drives K+ into cells; administering insulin when K+ < 3.3 triggers fatal cardiac arrest.'
        ],
        [
          'Step 3: Potassium Maintenance',
          'Serum K+ between 3.3 and 5.2 mEq/L',
          'Add 20 to 30 mEq potassium per liter of IV fluid to maintain serum K+ between 4.0 and 5.0 mEq/L.',
          'If serum K+ > 5.2 mEq/L, do NOT add potassium to IV fluids; recheck K+ every 2 hours until levels drop.'
        ],
        [
          'Step 4: Regular Insulin Infusion',
          'Serum K+ confirmed >= 3.3 mEq/L',
          'Regular Insulin continuous IV infusion at 0.1 units/kg/hr (or 0.14 units/kg/hr without initial bolus).',
          'Target glucose decline of 50 to 75 mg/dL per hour. If glucose does not drop by 50 mg/dL in first hour, double the infusion rate.'
        ],
        [
          'Step 5: Dextrose Addition',
          'Blood glucose drops to 200 mg/dL',
          'Switch IV fluids to 5% Dextrose with 0.45% NaCl (D5 1/2NS) and reduce insulin infusion to 0.02-0.05 units/kg/hr.',
          'CONTINUE insulin infusion to close the anion gap while maintaining blood glucose between 150 and 200 mg/dL.'
        ],
        [
          'Step 6: Resolution & SubQ Transition',
          'Blood glucose < 200 mg/dL + TWO of: Serum HCO3 >= 15, venous pH > 7.30, Anion Gap <= 12',
          'Administer Subcutaneous Basal Insulin (Glargine or Degludec) at least 2 HOURS PRIOR to discontinuing IV insulin infusion.',
          'Discontinuing IV insulin without a 2-hour subcutaneous overlap causes instant rebound ketoacidosis.'
        ]
      ],
      rowsAr: [
        [
          'الخطوة 1: إنعاش السوائل',
          'نقص حجم شديد (عجز سوائل يتراوح بين 5 إلى 6 لترات لدى البالغين)',
          'تسريب 0.9% Normal Saline بمعدل 1000 إلى 1500 مل/ساعة في أول ساعة.',
          'بعد الساعة الأولى: حساب الصوديوم المصحح. إن كان سوياً/مرتفعاً يحول إلى 0.45% NaCl. إن كان منخفضاً يتابع 0.9% NaCl.'
        ],
        [
          'الخطوة 2: فحص البوتاسيوم قبل الإنسولين',
          'بوتاسيوم المصل < 3.3 mEq/L',
          'إيقاف وحظر الإنسولين تماماً! تسريب كلوريد البوتاسيوم 20-40 mEq/ساعة حتى يرتفع K >= 3.3.',
          'أمر سلامة حاسم: الإنسولين يدخل البوتاسيوم للخلايا، وبدء الإنسولين مع K < 3.3 يسبب توقف القلب والوفاة الحتمية.'
        ],
        [
          'الخطوة 3: صيانة البوتاسيوم',
          'بوتاسيوم المصل بين 3.3 و 5.2 mEq/L',
          'إضافة 20 إلى 30 mEq بوتاسيوم لكل لتر مغذي للحفاظ على K بين 4.0 و 5.0 mEq/L.',
          'إذا كان K > 5.2 mEq/L لا يضاف البوتاسيوم ويعاد الفحص كل ساعتين.'
        ],
        [
          'الخطوة 4: تسريب الإنسولين النظامي',
          'تأكيد أن بوتاسيوم المصل >= 3.3 mEq/L',
          'تسريب وريدي مستمر للإنسولين النظامي (Regular Insulin) بمعدل 0.1 units/kg/hr.',
          'الهدف: انخفاض السكر بمعدل 50-75 mg/dL بالساعة. إن لم ينخفض 50 في أول ساعة تضاعف جرعة التسريب.'
        ],
        [
          'الخطوة 5: إضافة السكر عند 200',
          'هبوط سكر الدم إلى 200 mg/dL',
          'تحويل السوائل الوريدية إلى D5 1/2NS وتخفيض تسريب الإنسولين إلى 0.02-0.05 units/kg/hr.',
          'استمرار الإنسولين ضروري لإغلاق فجوة الحماض (Anion Gap) مع الحفاظ على الجلوكوز بين 150-200.'
        ],
        [
          'الخطوة 6: معايير الشفاء والانتقال للحقن',
          'سكر < 200 مع اثنين من: بيكربونات >= 15، حموضة pH > 7.30، فجوة صواعد Anion Gap <= 12',
          'حقن إنسولين قاعدي طويل المفعول (Glargine) تحت الجلد قبل ساعتين كاملتين من إيقاف تسريب الوريد.',
          'إيقاف إنسولين الوريد بدون تداخل ساعتين تحت الجلد يسبب انتكاس الحماض الكيتوني فوراً.'
        ]
      ]
    }
  ],
  sections: [
    {
      id: 'accp-he-sec1',
      number: '1.0',
      heading: 'Portal Hypertension Pathophysiology & Cirrhosis Staging (Child-Pugh & MELD)',
      headingAr: 'فيزيولوجيا فرط ضغط وريد الباب وتصنيف تشمع الكبد (Child-Pugh & MELD)',
      evidenceGrade: 'AASLD Practice Guidelines',
      body: `Cirrhosis represents the irreversible end-stage of chronic necroinflammatory liver disease characterized by diffuse architectural distortion, regenerative nodules surrounded by fibrous bands, and profound vascular resistance to portal blood flow.

Pathophysiology of Portal Hypertension:
1. Increased Intrahepatic Resistance: Hepatic stellate cell activation triggers excessive collagen deposition in the space of Disse, obliterating hepatic sinusoidal fenestrations (sinusoidal capillarization). Concurrently, intrahepatic endothelial nitric oxide synthase (eNOS) downregulation leads to local endothelin-mediated vasoconstriction.
2. Splanchnic Vasodilatation and Hyperdynamic Circulation: In response to portal hypertension, shear stress and bacterial translocation upregulate extrahepatic vascular endothelial production of nitric oxide, inducing massive splanchnic and systemic arterial vasodilation. Systemic vascular resistance (SVR) plunges, prompting compensatory cardiac output elevation and sympathetic hyperactivation.
3. Effective Hypovolemia: Despite massive total-body extracellular fluid volume, the pooling of blood in dilated splanchnic vascular beds reduces effective arterial blood volume (EABV). This unleashes maximal baroreceptor-mediated RAAS and non-osmotic vasopressin hypersecretion, driving refractory renal sodium and water retention (the underfill mechanism of ascites formation).

Cirrhosis Staging Systems:
- Child-Turcotte-Pugh (CTP) Classification: Incorporates 5 parameters:
  * Total Bilirubin: < 2 mg/dL (1 pt), 2-3 mg/dL (2 pts), > 3 mg/dL (3 pts).
  * Serum Albumin: > 3.5 g/dL (1 pt), 2.8-3.5 g/dL (2 pts), < 2.8 g/dL (3 pts).
  * International Normalized Ratio (INR): < 1.7 (1 pt), 1.7-2.2 (2 pts), > 2.2 (3 pts).
  * Ascites: None (1 pt), Mild/diuretic-controlled (2 pts), Moderate-severe/refractory (3 pts).
  * Hepatic Encephalopathy: None (1 pt), Grade 1-2 (2 pts), Grade 3-4 (3 pts).
  Stratification: Class A (5-6 points: well-compensated), Class B (7-9 points: significant functional compromise), Class C (10-15 points: decompensated cirrhosis with 1-year mortality approaching 50%).
- Model for End-Stage Liver Disease (MELD-Na): Utilized for liver transplant allocation. Incorporates Serum Creatinine, Total Bilirubin, INR, and Serum Sodium. Scores range from 6 to 40, directly predicting 90-day waitlist mortality.`
    },
    {
      id: 'accp-he-sec2',
      number: '2.0',
      heading: 'Ascites Management: The 100:40 Spironolactone-to-Furosemide Ratio',
      headingAr: 'تدبير الحبن والنسبة الإلزامية 100:40 بين سبيرونولاكتون وفوروسيميد',
      evidenceGrade: 'AASLD Class I, LOE A',
      body: `Ascites is the most frequent complication of cirrhosis, indicating the transition from compensated to decompensated liver disease.

Therapeutic Protocol:
1. Dietary Sodium Restriction: Limit dietary sodium intake to 2000 mg daily (88 mEq/day). Rigid fluid restriction (< 1000-1500 mL/day) is NOT recommended unless profound dilutional hypervolemic hyponatremia (serum Na < 125 mEq/L) coexists.
2. The Dual Diuretic Regimen (Spironolactone + Furosemide in 100:40 mg Ratio):
   - In cirrhotic ascites, secondary hyperaldosteronism is the predominant pathophysiologic driver of distal tubular sodium retention. Therefore, Spironolactone (an aldosterone antagonist) is the foundational diuretic backbone.
   - Furosemide is added to synergistically enhance loop natriuresis and prevent Spironolactone-induced hyperkalemia.
   - Initial Regimen: Spironolactone 100 mg PO daily + Furosemide 40 mg PO daily, administered as a single morning dose to optimize daytime adherence.
   - Stepwise Titration: If weight loss is inadequate, double both medications simultaneously every 3 to 5 days, maintaining the 100:40 mg proportion (Step 2: 200 mg / 80 mg; Step 3: 300 mg / 120 mg; Step 4 [Maximum]: 400 mg / 160 mg daily).
   - Rate of Safe Weight Loss:
     * Patients with ascites without peripheral edema: Limit weight loss to 0.5 kg/day to avoid intravascular depletion.
     * Patients with ascites AND peripheral edema: Weight loss of up to 1.0 kg/day is acceptable.
3. Diuretic Safety Holds:
   - Discontinue diuretics immediately if:
     a) Severe hyponatremia occurs (serum Na < 120-125 mEq/L);
     b) Progressive acute kidney injury or hepatorenal syndrome develops;
     c) Overt hepatic encephalopathy emerges; or
     d) Intractable muscle cramps or severe hyperkalemia (K > 5.5) intervene.`
    },
    {
      id: 'accp-he-sec3',
      number: '3.0',
      heading: 'Spontaneous Bacterial Peritonitis (SBP) & Intravenous Albumin Infusion',
      headingAr: 'التهاب الصفاق الجرثومي العفوي (SBP) وبروتوكول حقن الألبومين الوريدي',
      evidenceGrade: 'AASLD Class I, LOE A',
      body: `Spontaneous bacterial peritonitis (SBP) is an acute bacterial infection of ascitic fluid occurring in the absence of a surgically treatable intra-abdominal infection, resulting from enteric bacterial translocation across an impaired intestinal mucosal barrier into mesenteric lymphatics.

Diagnostic Criteria:
- Paracentesis Mandate: Diagnostic paracentesis is mandatory for every cirrhotic patient admitted with ascites, fever, abdominal pain, altered mental status, gastrointestinal bleeding, or unexplained leukocytosis.
- Diagnostic Threshold: Ascitic fluid absolute Polymorphonuclear (PMN) leukocyte count >= 250 cells/mm3 (calculated by multiplying total WBC by the percentage of neutrophils). Even if ascitic cultures return negative ("culture-negative neutrocytic ascites"), empirical therapy is identical.

Antimicrobial Therapy:
- First-Line Regimen: Third-generation cephalosporins: Cefotaxime 2 g IV every 8 hours OR Ceftriaxone 2 g IV every 24 hours for 5 days. These agents cover typical causative enteric pathogens (Escherichia coli, Klebsiella pneumoniae, Streptococcus pneumoniae).
- Severe Beta-Lactam Allergy: Ciprofloxacin 400 mg IV every 12 hours (only if institutional fluoroquinolone resistance is low).

INTRAVENOUS ALBUMIN PROTOCOL (PREVENTING HEPATORENAL SYNDROME):
- In SBP, systemic endotoxemia accelerates splanchnic nitric oxide release, collapsing effective arterial blood volume and precipitating fatal Hepatorenal Syndrome (HRS) in >30% of patients.
- Clinical Trial Evidence: In the landmark randomized trial by Sort et al. (NEJM), intravenous albumin infusion reduced renal impairment from 33% to 10% and cut in-hospital mortality from 29% to 10%.
- Albumin Regimen:
  * Dose 1: 1.5 grams/kg of 25% Albumin IV administered within 6 hours of diagnosis.
  * Dose 2: 1.0 gram/kg of 25% Albumin IV administered on Day 3 of therapy.
- Indication Criteria: Recommended for all SBP patients, particularly those with serum creatinine > 1.0 mg/dL, BUN > 30 mg/dL, or total bilirubin > 4.0 mg/dL.`
    },
    {
      id: 'accp-he-sec4',
      number: '4.0',
      heading: 'Hepatic Encephalopathy: Lactulose Titration & Rifaximin Dual Therapy',
      headingAr: 'الاعتلال الدماغي الكبدي: معايرة اللاكتولوز والعلاج الثنائي مع ريفاكسيمين',
      evidenceGrade: 'AASLD / EASL Clinical Practice Guidelines',
      body: `Hepatic encephalopathy (HE) represents a spectrum of neuropsychiatric abnormalities caused by portosystemic venous shunting and hepatic failure to clear neurotoxic nitrogenous gut-derived metabolites, predominantly ammonia (NH3). Ammonia crosses the blood-brain barrier and is converted by astrocytes into glutamine, provoking astrocyte swelling, cerebral edema, and neurocognitive decline.

Initial Management: Identify and Treat Precipitating Factors:
Over 80% of HE episodes are triggered by an identifiable reversible cause:
1. Gastrointestinal bleeding (massive enteric blood protein load);
2. Infection (SBP, UTI, pneumonia);
3. Over-diuresis or dehydration;
4. Hypokalemia or metabolic alkalosis (alkalosis converts NH4+ to lipophilic uncharged NH3, facilitating brain entry);
5. Constipation;
6. Inappropriate administration of sedatives, opioids, or benzodiazepines.

Pharmacotherapy Hierarchy:
1. Lactulose (Non-absorbable Synthetic Disaccharide — First-Line):
   - Mechanism: Colonic bacteria ferment lactulose into lactic and acetic acids, lowering intraluminal colonic pH to < 5.0. Acidic pH converts gaseous ammonia (NH3) into polar, non-absorbable ammonium ions (NH4+), trapping it in the bowel lumen ("ammonia trapping"). Furthermore, its osmotic effect accelerates colonic transit, expelling nitrogenous wastes.
   - Acute Episodic Dosing: 20 to 30 g (30 to 45 mL) PO every 1 to 2 hours until bowel evacuation occurs.
   - Chronic Maintenance Dosing: Titrate to 15 to 30 mL PO three to four times daily to achieve a strict target of TWO to THREE soft bowel movements per day.
   - Toxicity Warning: Avoid overzealous administration causing diarrhea, severe dehydration, and hypernatremia, which paradoxically worsen encephalopathy.
2. Rifaximin (Xifaxan — Non-absorbable Rifamycin Antibiotic — Add-On):
   - Mechanism: Eliminates ammonia-producing anaerobic and aerobic enteric bacteria without systemic absorption (< 0.4%).
   - Indication: Rifaximin 550 mg PO twice daily is recommended as an add-on to lactulose for secondary prevention of recurrent HE episodes (Bass et al., NEJM). Rifaximin plus lactulose reduces HE hospitalizations by 50% compared to lactulose alone.`
    },
    {
      id: 'accp-he-sec5',
      number: '5.0',
      heading: 'Diabetic Ketoacidosis (DKA): Diagnostic Criteria & Pathophysiology',
      headingAr: 'الحماض الكيتوني السكري (DKA): المعايير التشخيصية والفيزيولوجيا المرضية',
      evidenceGrade: 'American Diabetes Association (ADA) Consensus Statement',
      body: `Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic emergency characterized by absolute or relative insulin deficiency paired with counter-regulatory hormone excess (glucagon, catecholamines, cortisol, and growth hormone).

Diagnostic Triad & Severity Stratification:
1. Hyperglycemia: Blood glucose > 250 mg/dL (13.9 mmol/L) (can be < 200 mg/dL in euglycemic DKA associated with SGLT2 inhibitors or pregnancy).
2. Ketosis: Positive serum or urine acetoacetate or beta-hydroxybutyrate (beta-hydroxybutyrate >= 3.0 mmol/L).
3. High Anion Gap Metabolic Acidosis:
   - Serum Bicarbonate: <= 18 mEq/L (Mild: 15-18; Moderate: 10 to < 15; Severe: < 10 mEq/L).
   - Arterial pH: <= 7.30 (Mild: 7.25-7.30; Moderate: 7.00 to < 7.24; Severe: < 7.00).
   - Anion Gap Formula: Na - (Cl + HCO3). Normal anion gap is 8 to 12 mEq/L. In DKA, anion gap is typically > 12 to 16 mEq/L.

Pathophysiologic Cascade:
- Uncontrolled Adipocyte Lipolysis: Absence of insulin activates hormone-sensitive lipase in adipose tissue, releasing copious free fatty acids (FFAs) into the portal circulation.
- Hepatic Ketogenesis: In hepatocytes, carnitine palmitoyltransferase-1 (CPT-1) transports FFAs into mitochondria, undergoing beta-oxidation to generate ketoacids: acetoacetate and beta-hydroxybutyrate.
- Osmotic Diuresis: Hyperglycemia exceeds the renal tubular absorptive threshold (~180 mg/dL), provoking massive glucosuria, osmotic diuresis, and electrolyte wasting (losses of 5-7 Liters of water, 400-700 mEq sodium, and 200-400 mEq potassium).`
    },
    {
      id: 'accp-he-sec6',
      number: '6.0',
      heading: 'DKA Potassium Precondition: The Mandatory K+ > 3.3 Rule Before Insulin',
      headingAr: 'شرط البوتاسيوم في DKA: القاعدة الإلزامية K+ > 3.3 قبل إعطاء الإنسولين',
      evidenceGrade: 'ADA Class I Emergency Resuscitation Rule',
      body: `TOTAL-BODY POTASSIUM DEFICIT VS SERUM MEASUREMENT:
Although baseline serum potassium in DKA is frequently normal or elevated (due to extracellular shifting caused by acidosis, insulinopenia, and hyperosmolality), EVERY patient with DKA suffers a profound total-body potassium deficit averaging 300 to 500 mEq resulting from prolonged osmotic kaliuresis.

THE LETHAL PITFALL OF IMMEDIATE INSULIN:
Exogenous insulin stimulates the cellular Na+/K+ ATPase pump, driving extracellular potassium ions rapidly into the intracellular fluid compartment. Furthermore, fluid resuscitation and acidosis correction accelerate this transcellular shift.
- If insulin is initiated in a patient whose measured serum potassium is < 3.3 mEq/L, the sudden precipitously deep intracellular drop will cause profound hypokalemia (< 2.0 mEq/L).
- Clinical Consequences: Lethal ventricular fibrillation, asystole, respiratory muscle paralysis requiring emergency mechanical ventilation, and acute death.

MANDATORY ACTION ALGORITHM:
- Serum Potassium < 3.3 mEq/L: HOLD ALL INSULIN IMMEDIATELY. Infuse intravenous Potassium Chloride at 20 to 40 mEq/hr until serum potassium is verified >= 3.3 mEq/L. Only then may insulin be safely started.
- Serum Potassium 3.3 to 5.2 mEq/L: Initiate regular insulin infusion and add 20 to 30 mEq potassium per liter of IV fluid to maintain serum potassium between 4.0 and 5.0 mEq/L.
- Serum Potassium > 5.2 mEq/L: Do NOT add potassium to IV fluids. Recheck BMP every 2 hours; add potassium once levels drop below 5.2 mEq/L.`
    },
    {
      id: 'accp-he-sec7',
      number: '7.0',
      heading: 'Insulin Infusion, Fluid Resuscitation, and Anion Gap Resolution Criteria',
      headingAr: 'تسريب الإنسولين، إنعاش السوائل، ومعايير شفاء الحماض الكيتوني (ADA)',
      evidenceGrade: 'ADA Standard of Medical Care',
      body: `FLUID RESUSCITATION:
- Hour 1: 0.9% Normal Saline at 1000 to 1500 mL/hr (15-20 mL/kg/hr) to restore effective circulating intravascular volume.
- Hours 2+: Calculate serum sodium corrected for hyperglycemia: Corrected Na = Measured Na + [0.016 * (Glucose - 100)].
  * If corrected Na is normal or elevated (>= 135 mEq/L): Switch to 0.45% NaCl at 250 to 500 mL/hr.
  * If corrected Na is low (< 135 mEq/L): Continue 0.9% NaCl at 250 to 500 mL/hr.

REGULAR INSULIN INFUSION PROTOCOL:
- Infusion Regimen: Continuous IV infusion of Regular Insulin at 0.1 units/kg/hr (an initial IV bolus of 0.1 units/kg is optional).
- Target Glucose Velocity: Blood glucose should drop by 50 to 75 mg/dL per hour. If glucose fails to decline by 50 mg/dL in the first hour, verify IV patency, double the insulin infusion rate, and recheck BMP.
- The 200 mg/dL Rule: When blood glucose drops to 200 mg/dL, DO NOT STOP INSULIN. Add 5% Dextrose to IV fluids (D5 0.45% NaCl) and decrease insulin rate to 0.02 to 0.05 units/kg/hr. The insulin is required to extinguish hepatic ketogenesis and clear the acidotic anion gap!

ADA DKA RESOLUTION CRITERIA:
DKA is defined as resolved ONLY when all of the following criteria are achieved:
1. Blood glucose < 200 mg/dL (11.1 mmol/L); AND
2. Serum bicarbonate (HCO3) >= 15 mEq/L; AND
3. Venous blood pH > 7.30; AND
4. Normalization of the anion gap (Anion Gap <= 12 mEq/L).`
    },
    {
      id: 'accp-he-sec8',
      number: '8.0',
      heading: 'High-Yield Board Review Pearls, Drug Traps, and Subcutaneous Transition',
      headingAr: 'لآلئ مراجعة البورد، فخاخ الأدوية، وقواعد الانتقال للحقن تحت الجلد',
      evidenceGrade: 'Board Examination Synthesis & Clinical Safety',
      body: `1. The Mandatory 2-Hour Basal Overlap Rule:
   - Half-life of intravenous regular insulin is exceptionally short: approximately 5 to 9 minutes.
   - When transitioning from IV insulin to subcutaneous maintenance therapy, long-acting basal insulin (Glargine, Detemir, or Degludec) MUST be administered subcutaneously at least 2 hours BEFORE stopping the IV insulin infusion.
   - Premature cessation of IV insulin creates a rapid insulin-free window, triggering immediate rebound lipolysis, ketogenesis, and acute relapse into DKA.

2. Euglycemic DKA (euDKA) and SGLT2 Inhibitor Pitfalls:
   - SGLT2 inhibitors (Empagliflozin, Dapagliflozin, Canagliflozin) can precipitate euglycemic DKA (blood glucose < 200-250 mg/dL with severe high anion gap ketoacidosis).
   - Mechanism: Persistent renal glycosuria lowers blood glucose while suppressing endogenous insulin secretion and elevating glucagon, accelerating hepatic ketogenesis.
   - Diagnostic Trap: Clinicians frequently miss euDKA due to normal blood glucose levels. Always measure serum beta-hydroxybutyrate and blood gases in unwell patients on SGLT2 inhibitors. Hold SGLT2 inhibitors at least 3-4 days prior to major surgeries or during acute medical illnesses.`
    }
  ]
};

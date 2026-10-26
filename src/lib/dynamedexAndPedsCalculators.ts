/**
 * Comprehensive Pediatric Drug Dosing & DynaMedex Clinical Calculators Engine
 * References:
 * - DynaMedex Clinical Calculators & Monographs (2025/2026)
 * - Lexicomp Pediatric & Neonatal Dosage Handbook / Harriet Lane Handbook (23rd Ed)
 * - ACCP Updates in Therapeutics 2026 & DiPiro's Pharmacotherapy (13th Ed)
 */

export interface PediatricDrugFormularyItem {
  id: string;
  name: string;
  nameAr: string;
  category:
    | 'Antibiotics (Oral)'
    | 'Antibiotics (IV/IM)'
    | 'Antipyretics & Analgesics'
    | 'Respiratory & Steroids'
    | 'Neurology & Anticonvulsants'
    | 'Emergency & PALS Resuscitation'
    | 'GI & Supportive Care';
  categoryAr: string;
  indication: string;
  indicationAr: string;
  route: 'PO' | 'IV' | 'IM' | 'IV/PO' | 'Nebulized';
  /** Dose in mg/kg/day OR mg/kg/dose depending on dosingBasis */
  minDoseMgPerKg: number;
  maxDoseMgPerKg: number;
  defaultDoseMgPerKg: number;
  dosingBasis: 'per_day' | 'per_dose';
  dosesPerDay: number;
  frequencyLabel: string;
  /** Maximum single dose in mg */
  maxSingleDoseMg: number;
  /** Maximum total daily dose in mg */
  maxDailyDoseMg: number;
  /** Available concentrations for liquid volume (mL) calculation */
  concentrations: {
    label: string;
    mgPerMl: number;
  }[];
  clinicalPearlsEn: string;
  clinicalPearlsAr: string;
}

export const PEDIATRIC_DRUG_FORMULARY: PediatricDrugFormularyItem[] = [
  {
    id: 'amox-standard',
    name: 'Amoxicillin (Standard Dose)',
    nameAr: 'أموكسيسيلين (جرعة قياسية - التهاب اللوزتين/البلعوم/المسالك)',
    category: 'Antibiotics (Oral)',
    categoryAr: 'المضادات الحيوية الفموية للأطفال',
    indication: 'Mild-to-Moderate Pharyngitis, Tonsillitis, UTI, Skin Infections',
    indicationAr: 'التهاب البلعوم واللوزتين العقدي، التهابات المسالك البولية والجلد الخفيفة للمتوسطة',
    route: 'PO',
    minDoseMgPerKg: 40,
    maxDoseMgPerKg: 50,
    defaultDoseMgPerKg: 45,
    dosingBasis: 'per_day',
    dosesPerDay: 2,
    frequencyLabel: 'q12h (BID) or q8h (TID)',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1500,
    concentrations: [
      { label: '250 mg / 5 mL (50 mg/mL)', mgPerMl: 50 },
      { label: '125 mg / 5 mL (25 mg/mL)', mgPerMl: 25 },
      { label: '400 mg / 5 mL (80 mg/mL)', mgPerMl: 80 }
    ],
    clinicalPearlsEn:
      'For Group A Streptococcal pharyngitis: 50 mg/kg once daily (max 1000 mg/day) or 25 mg/kg BID (max 500 mg/dose) for 10 days.',
    clinicalPearlsAr:
      'في التهاب البلعوم العقدي (GAS): يمكن إعطاؤه 50 ملغ/كغ مرة يومياً (بحد أقصى 1000 ملغ/يوم) لمدة 10 أيام.'
  },
  {
    id: 'amox-high-dose',
    name: 'Amoxicillin (High-Dose Otitis Media / CAP)',
    nameAr: 'أموكسيسيلين (جرعة عالية - التهاب الأذن الوسطى الحاد / ذات الرئة)',
    category: 'Antibiotics (Oral)',
    categoryAr: 'المضادات الحيوية الفموية للأطفال',
    indication: 'Acute Otitis Media (AOM), Community-Acquired Pneumonia (CAP), Sinusitis',
    indicationAr: 'التهاب الأذن الوسطى الحاد (AOM) وذات الرئة المكتسبة من المجتمع (CAP) للتغلب على المكورات الرئوية المقاومة',
    route: 'PO',
    minDoseMgPerKg: 80,
    maxDoseMgPerKg: 90,
    defaultDoseMgPerKg: 90,
    dosingBasis: 'per_day',
    dosesPerDay: 2,
    frequencyLabel: 'q12h (divided BID)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    concentrations: [
      { label: '400 mg / 5 mL (80 mg/mL)', mgPerMl: 80 },
      { label: '250 mg / 5 mL (50 mg/mL)', mgPerMl: 50 }
    ],
    clinicalPearlsEn:
      'AAP/IDSA First-line for AOM and pediatric CAP: 90 mg/kg/day divided q12h achieves middle-ear and alveolar concentrations against penicillin-nonsusceptible S. pneumoniae.',
    clinicalPearlsAr:
      'الخط الأول حسب AAP/IDSA لالتهاب الأذن الوسطى وذات الرئة عند الأطفال: 90 ملغ/كغ/يوم مقسمة كل 12 ساعة.'
  },
  {
    id: 'amox-clav-high',
    name: 'Amoxicillin / Clavulanate (Augmentin ES-600 / 457)',
    nameAr: 'أموكسيسيلين + كلافولانات (Augmentin ES 600 / 457)',
    category: 'Antibiotics (Oral)',
    categoryAr: 'المضادات الحيوية الفموية للأطفال',
    indication: 'Recurrent/Refractory Otitis Media, Beta-Lactamase Sinusitis, Bite Wounds',
    indicationAr: 'التهاب الأذن الوسطى المتكرر أو المعند، التهاب الجيوب الأنفية، وعضات الحيوانات',
    route: 'PO',
    minDoseMgPerKg: 45,
    maxDoseMgPerKg: 90,
    defaultDoseMgPerKg: 90,
    dosingBasis: 'per_day',
    dosesPerDay: 2,
    frequencyLabel: 'q12h (With meals to reduce GI diarrhea)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    concentrations: [
      { label: '600 mg / 5 mL ES (120 mg/mL Amox)', mgPerMl: 120 },
      { label: '400 mg / 5 mL (80 mg/mL Amox - 457)', mgPerMl: 80 },
      { label: '200 mg / 5 mL (40 mg/mL Amox - 228)', mgPerMl: 40 }
    ],
    clinicalPearlsEn:
      'Always calculate based on the Amoxicillin component. Use 14:1 formulation (ES 600 mg/5mL) when prescribing 90 mg/kg/day to prevent clavulanate-induced diarrhea (>10 mg/kg/day clavulanate).',
    clinicalPearlsAr:
      'تحسب الجرعة دائماً على أساس مكون الأموكسيسيلين؛ يُفضل تركيز ES 600 (نسبة 14:1) عند إعطاء 90 ملغ/كغ/يوم لتقليل الإسهال الناتج عن الكلافولانات.'
  },
  {
    id: 'azithromycin-peds',
    name: 'Azithromycin (Zithromax Suspension)',
    nameAr: 'أزيثروميسين (معلق فموي للأطفال)',
    category: 'Antibiotics (Oral)',
    categoryAr: 'المضادات الحيوية الفموية للأطفال',
    indication: 'Atypical Pneumonia (Mycoplasma), Pertussis, Acute Otitis Media, Strep Pharyngitis',
    indicationAr: 'ذات الرئة اللانمطية (الميكوبلازما)، السعال الديكي، أو بديل لحساسية البنسلين',
    route: 'PO',
    minDoseMgPerKg: 5,
    maxDoseMgPerKg: 12,
    defaultDoseMgPerKg: 10,
    dosingBasis: 'per_day',
    dosesPerDay: 1,
    frequencyLabel: 'q24h (Once Daily for 3–5 Days)',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 500,
    concentrations: [
      { label: '200 mg / 5 mL (40 mg/mL)', mgPerMl: 40 },
      { label: '100 mg / 5 mL (20 mg/mL)', mgPerMl: 20 }
    ],
    clinicalPearlsEn:
      'CAP: 10 mg/kg on Day 1 (max 500 mg), then 5 mg/kg/day on Days 2–5 (max 250 mg). Streptococcal pharyngitis requires 12 mg/kg/day for 5 days.',
    clinicalPearlsAr:
      'في ذات الرئة: 10 ملغ/كغ في اليوم الأول ثم 5 ملغ/كغ من اليوم 2 إلى 5 (أو 10 ملغ/كغ لمدة 3 أيام). في التهاب اللوزتين يتطلب 12 ملغ/كغ/يوم لمدة 5 أيام.'
  },
  {
    id: 'cefdinir-peds',
    name: 'Cefdinir (Omnicef Pediatric Suspension)',
    nameAr: 'سيفدينير (Omnicef - سيفالوسبورين جيل ثالث فموي)',
    category: 'Antibiotics (Oral)',
    categoryAr: 'المضادات الحيوية الفموية للأطفال',
    indication: 'Otitis Media, Sinusitis, Pharyngitis (Non-severe Penicillin Allergy)',
    indicationAr: 'التهاب الأذن الوسطى والجيوب والبلعوم (خاصة عند وجود تحسس غير تأقي للبنسلين)',
    route: 'PO',
    minDoseMgPerKg: 14,
    maxDoseMgPerKg: 14,
    defaultDoseMgPerKg: 14,
    dosingBasis: 'per_day',
    dosesPerDay: 2,
    frequencyLabel: 'q12h (7 mg/kg BID) or q24h (14 mg/kg OD)',
    maxSingleDoseMg: 600,
    maxDailyDoseMg: 600,
    concentrations: [
      { label: '125 mg / 5 mL (25 mg/mL)', mgPerMl: 25 },
      { label: '250 mg / 5 mL (50 mg/mL)', mgPerMl: 50 }
    ],
    clinicalPearlsEn:
      'Counsel parents: Cefdinir forms a harmless reddish/maroon complex in stools if co-administered with iron supplements or iron-fortified infant formula (pseudo-melena).',
    clinicalPearlsAr:
      'تنبيه هام للأهل: قد يحول سيفدينير لون البراز إلى الأحمر عند تناوله مع الحديد أو الحليب المدعم بالحديد (تفاعل غير ضار وليس نزيفاً).'
  },
  {
    id: 'ceftriaxone-peds',
    name: 'Ceftriaxone IV/IM (Rocephin)',
    nameAr: 'سيفترياكسون وريدي/عضلي (Rocephin)',
    category: 'Antibiotics (IV/IM)',
    categoryAr: 'المضادات الحيوية الوريدية والعضلية للأطفال',
    indication: 'Severe Inpatient CAP, Pyelonephritis, Sepsis (50–75 mg/kg) vs Meningitis (100 mg/kg)',
    indicationAr: 'الإنتان، ذات الرئة الشديدة، التهاب الحويضة والكلية (50-75 ملغ/كغ) أو التهاب السحايا (100 ملغ/كغ)',
    route: 'IV',
    minDoseMgPerKg: 50,
    maxDoseMgPerKg: 100,
    defaultDoseMgPerKg: 75,
    dosingBasis: 'per_day',
    dosesPerDay: 1,
    frequencyLabel: 'q24h (or divided q12h for Meningitis)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    concentrations: [
      { label: 'IV Solution 100 mg/mL (1000 mg / 10 mL)', mgPerMl: 100 },
      { label: 'IM Reconstitution 250 mg/mL (with 1% Lidocaine)', mgPerMl: 250 }
    ],
    clinicalPearlsEn:
      'CONTRAINDICATED in hyperbilirubinemic neonates (<28 days) due to bilirubin displacement (kernicterus) and fatal Ceftriaxone-Calcium precipitation in IV lines/lungs. Use Cefotaxime in neonates.',
    clinicalPearlsAr:
      'مضاد استطباب في حديثي الولادة (<28 يوماً) لخطر اليرقان النووي وترسب الكالسيوم القاتل في الرئتين والكلى؛ يُستبدل بـ Cefotaxime في الخدج وحديثي الولادة.'
  },
  {
    id: 'vancomycin-peds',
    name: 'Vancomycin IV (Pediatric MRSA / Invasive Infection)',
    nameAr: 'فانكومايسين وريدي للأطفال (MRSA / الإنتان الشديد)',
    category: 'Antibiotics (IV/IM)',
    categoryAr: 'المضادات الحيوية الوريدية والعضلية للأطفال',
    indication: 'Invasive MRSA, Meningitis, Severe Pneumonia, Osteomyelitis, Central Line Sepsis',
    indicationAr: 'عدوى المكورات العنقودية المقاومة للميثيسيلين (MRSA)، التهاب السحايا، وذات العظم والنقي',
    route: 'IV',
    minDoseMgPerKg: 45,
    maxDoseMgPerKg: 60,
    defaultDoseMgPerKg: 60,
    dosingBasis: 'per_day',
    dosesPerDay: 4,
    frequencyLabel: 'q6h (15 mg/kg/dose IV over 60–90 min)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    concentrations: [
      { label: 'Standard IV Infusion 5 mg/mL', mgPerMl: 5 },
      { label: 'Central Line Concentration 10 mg/mL', mgPerMl: 10 }
    ],
    clinicalPearlsEn:
      'ASHP/IDSA/PIDS 2020 Consensus: Target AUC24/MIC 400–600 mg·h/L in pediatrics. Start 15 mg/kg/dose IV q6h (60 mg/kg/day) in children with normal renal function. Infuse over ≥60 min to prevent Red Man Syndrome.',
    clinicalPearlsAr:
      'توصيات ASHP/IDSA/PIDS: الجرعة البدئية للأطفال ذوي وظيفة الكلى الطبيعية هي 15 ملغ/كغ كل 6 ساعات (60 ملغ/كغ/يوم) لتحقيق AUC24/MIC بين 400–600.'
  },
  {
    id: 'meropenem-peds',
    name: 'Meropenem IV (Pediatric Sepsis & Meningitis)',
    nameAr: 'ميروبينيم وريدي للأطفال (الإنتان / التهاب السحايا / ESBL)',
    category: 'Antibiotics (IV/IM)',
    categoryAr: 'المضادات الحيوية الوريدية والعضلية للأطفال',
    indication: 'ESBL Gram-Negative Sepsis (60 mg/kg/day) vs Bacterial Meningitis (120 mg/kg/day)',
    indicationAr: 'الإنتان بالجراثيم المنتجة لـ ESBL (20 ملغ/كغ كل 8 ساعات) أو التهاب السحايا (40 ملغ/كغ كل 8 ساعات)',
    route: 'IV',
    minDoseMgPerKg: 60,
    maxDoseMgPerKg: 120,
    defaultDoseMgPerKg: 60,
    dosingBasis: 'per_day',
    dosesPerDay: 3,
    frequencyLabel: 'q8h (20–40 mg/kg/dose IV)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 6000,
    concentrations: [{ label: 'IV Reconstituted 50 mg/mL', mgPerMl: 50 }],
    clinicalPearlsEn:
      'Standard sepsis: 20 mg/kg/dose q8h (max 1g/dose). Meningitis or Pseudomonas in CF: 40 mg/kg/dose q8h (max 2g/dose). Avoid co-administration with Valproic Acid (drops valproate serum levels by >70% within 24h).',
    clinicalPearlsAr:
      'الإنتان القياسي: 20 ملغ/كغ كل 8 ساعات؛ التهاب السحايا: 40 ملغ/كغ كل 8 ساعات. يحظر الجمع مع Valproic Acid لأنه يخفض مستواه بالدم بأكثر من 70% ويسبب نوبات صرع.'
  },
  {
    id: 'paracetamol-peds',
    name: 'Paracetamol / Acetaminophen (Syrup, Drops & IV)',
    nameAr: 'باراسيتامول / أسيتامينوفين (شراب، نقط فموية، ووريدي)',
    category: 'Antipyretics & Analgesics',
    categoryAr: 'خافضات الحرارة والمسكنات للأطفال',
    indication: 'Fever & Mild-to-Moderate Pain in Neonates, Infants & Children',
    indicationAr: 'خفض الحرارة وتسكين الألم الخفيف إلى المتوسط للرضع والأطفال',
    route: 'IV/PO',
    minDoseMgPerKg: 10,
    maxDoseMgPerKg: 15,
    defaultDoseMgPerKg: 15,
    dosingBasis: 'per_dose',
    dosesPerDay: 4,
    frequencyLabel: 'q4–6h PRN (Max 5 doses / 75 mg/kg in 24h)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    concentrations: [
      { label: 'Syrup 120 mg / 5 mL (24 mg/mL)', mgPerMl: 24 },
      { label: 'Forte Syrup 250 mg / 5 mL (50 mg/mL)', mgPerMl: 50 },
      { label: 'Infant Oral Drops 100 mg / 1 mL', mgPerMl: 100 },
      { label: 'Perfalgan IV Vial 10 mg / mL (1000 mg/100mL)', mgPerMl: 10 }
    ],
    clinicalPearlsEn:
      'For IV Acetaminophen in infants <10 kg: reduce dose to 7.5–12.5 mg/kg/dose q6h (max 37.5–60 mg/kg/day). Hepatotoxic ceiling in children: >75 mg/kg/day or >4,000 mg/day.',
    clinicalPearlsAr:
      'للرضع أقل من 10 كغ بالوريد (Perfalgan): 7.5 إلى 12.5 ملغ/كغ لكل جرعة. الحد الأقصى اليومي الآمن للأطفال هو 75 ملغ/كغ/يوم (وبحد أقصى 4000 ملغ/يوم).'
  },
  {
    id: 'ibuprofen-peds',
    name: 'Ibuprofen (Brufen Pediatric Suspension)',
    nameAr: 'إيبوبروفين (بروفين شراب للأطفال ≥ 6 أشهر)',
    category: 'Antipyretics & Analgesics',
    categoryAr: 'خافضات الحرارة والمسكنات للأطفال',
    indication: 'Fever & Inflammation in Infants ≥6 Months and Children',
    indicationAr: 'خفض الحرارة وتسكين الألم والالتهاب للأطفال من عمر 6 أشهر فما فوق',
    route: 'PO',
    minDoseMgPerKg: 5,
    maxDoseMgPerKg: 10,
    defaultDoseMgPerKg: 10,
    dosingBasis: 'per_dose',
    dosesPerDay: 3,
    frequencyLabel: 'q6–8h with food (Max 40 mg/kg/day)',
    maxSingleDoseMg: 400,
    maxDailyDoseMg: 2400,
    concentrations: [
      { label: '100 mg / 5 mL (20 mg/mL)', mgPerMl: 20 },
      { label: '200 mg / 5 mL (40 mg/mL)', mgPerMl: 40 }
    ],
    clinicalPearlsEn:
      'Avoid in infants <6 months of age, dehydrated patients (risk of NSAID-induced afferent arteriolar vasoconstriction & AKI), active varicella, or thrombocytopenia.',
    clinicalPearlsAr:
      'لا يُعطى للرضع أقل من 6 أشهر أو في حالات الجفاف ونقص السوائل (خطر الفشل الكلوي الحاد AKI) أو جدري الماء.'
  },
  {
    id: 'prednisolone-peds',
    name: 'Prednisolone Oral Solution (Acute Asthma / Croup)',
    nameAr: 'بريدنيزولون شراب فموي (نوبات الربو الحادة والخناق)',
    category: 'Respiratory & Steroids',
    categoryAr: 'أدوية الجهاز التنفسي والكورتيكوستيرويدات',
    indication: 'Acute Asthma Exacerbation (1–2 mg/kg/day for 3–5 days)',
    indicationAr: 'نوبات الربو القصبي الحادة عند الأطفال (لمدة 3 إلى 5 أيام دون حاجة لتدريج)',
    route: 'PO',
    minDoseMgPerKg: 1,
    maxDoseMgPerKg: 2,
    defaultDoseMgPerKg: 1.5,
    dosingBasis: 'per_day',
    dosesPerDay: 1,
    frequencyLabel: 'q24h Morning (or divided BID) for 3–5 days',
    maxSingleDoseMg: 60,
    maxDailyDoseMg: 60,
    concentrations: [
      { label: '15 mg / 5 mL (3 mg/mL)', mgPerMl: 3 },
      { label: '5 mg / 5 mL (1 mg/mL)', mgPerMl: 1 }
    ],
    clinicalPearlsEn:
      'GINA Guidelines: Short-burst systemic corticosteroid (3–5 days) does NOT require tapering. Alternatively, single-dose Dexamethasone 0.6 mg/kg (max 16 mg) for 1–2 days has equal efficacy and better GI tolerability.',
    clinicalPearlsAr:
      'الكورس القصير (3-5 أيام) لا يحتاج إلى تخفيض تدريجي (Tapering). البديل المكافئ: ديكساميثازون 0.6 ملغ/كغ جرعة واحدة يومياً ليوم أو يومين.'
  },
  {
    id: 'levetiracetam-peds',
    name: 'Levetiracetam (Keppra Oral Solution & IV)',
    nameAr: 'ليفيتيراسيتام (كيبرا - مضاد اختلاج للصرع والحالة الصرعية)',
    category: 'Neurology & Anticonvulsants',
    categoryAr: 'أدوية الأعصاب والاختلاجات للأطفال',
    indication: 'Epilepsy Maintenance (20–60 mg/kg/day) or Status Epilepticus Load (60 mg/kg IV)',
    indicationAr: 'العلاج الوقائي للصرع (20-60 ملغ/كغ/يوم) أو جرعة التحميل في الحالة الصرعية (60 ملغ/كغ وريدياً)',
    route: 'IV/PO',
    minDoseMgPerKg: 20,
    maxDoseMgPerKg: 60,
    defaultDoseMgPerKg: 40,
    dosingBasis: 'per_day',
    dosesPerDay: 2,
    frequencyLabel: 'q12h (Maintenance) or Single IV Load over 15 min',
    maxSingleDoseMg: 1500,
    maxDailyDoseMg: 3000,
    concentrations: [{ label: 'Oral Solution / IV Vial 100 mg / mL', mgPerMl: 100 }],
    clinicalPearlsEn:
      'ESETT Trial (NEJM): For benzodiazepine-refractory Status Epilepticus, give Levetiracetam 60 mg/kg IV single loading dose (max 4,500 mg) over 15 minutes.',
    clinicalPearlsAr:
      'في الحالة الصرعية المعندة على البنزوديازيبينات (تجربة ESETT): يُعطى بجرعة تحميل وريدية 60 ملغ/كغ (بحد أقصى 4500 ملغ) خلال 15 دقيقة.'
  },
  {
    id: 'ondansetron-peds',
    name: 'Ondansetron (Zofran Pediatric Oral / IV)',
    nameAr: 'أوندانسيترون (زوفران - مضاد إقياء للأطفال)',
    category: 'GI & Supportive Care',
    categoryAr: 'أدوية الجهاز الهضمي والرعاية الداعمة',
    indication: 'Acute Gastroenteritis Vomiting & Chemotherapy-Induced Nausea/Vomiting',
    indicationAr: 'الإقياء الحاد المرافق لالتهاب المعدة والأمعاء أو العلاج الكيماوي',
    route: 'IV/PO',
    minDoseMgPerKg: 0.15,
    maxDoseMgPerKg: 0.15,
    defaultDoseMgPerKg: 0.15,
    dosingBasis: 'per_dose',
    dosesPerDay: 3,
    frequencyLabel: 'Single Dose or q8h PRN (Max 8 mg/dose)',
    maxSingleDoseMg: 8,
    maxDailyDoseMg: 24,
    concentrations: [
      { label: 'Oral Syrup 4 mg / 5 mL (0.8 mg/mL)', mgPerMl: 0.8 },
      { label: 'IV Injection 2 mg / mL (4 mg / 2 mL)', mgPerMl: 2 }
    ],
    clinicalPearlsEn:
      'Weight-band oral dosing for acute gastroenteritis: 8–15 kg = 2 mg; 15–30 kg = 4 mg; >30 kg = 8 mg given 15–30 min prior to oral rehydration therapy (ORT).',
    clinicalPearlsAr:
      'جرعة واحدة فموية قبل البدء بمحلول الإماهة الفموية (ORS) تقلل الحاجة للسوائل الوريدية: وزن 8-15 كغ (2 ملغ)، وزن 15-30 كغ (4 ملغ)، فوق 30 كغ (8 ملغ).'
  },
  {
    id: 'epinephrine-pals',
    name: 'Epinephrine (PALS Cardiac Arrest & Anaphylaxis)',
    nameAr: 'إبينفرين / أدرينالين (إنعاش PALS والصدمة التأقية)',
    category: 'Emergency & PALS Resuscitation',
    categoryAr: 'أدوية الطوارئ وإنعاش الأطفال (PALS)',
    indication: 'Cardiac Arrest IV/IO (0.01 mg/kg of 1:10,000) vs Anaphylaxis IM (0.01 mg/kg of 1:1,000)',
    indicationAr: 'توقف القلب الوريدي/العظمي (1:10,000) أو الصدمة التأقية عضلياً (1:1,000)',
    route: 'IV',
    minDoseMgPerKg: 0.01,
    maxDoseMgPerKg: 0.01,
    defaultDoseMgPerKg: 0.01,
    dosingBasis: 'per_dose',
    dosesPerDay: 1,
    frequencyLabel: 'q3–5 min in Cardiac Arrest / q5–15 min IM in Anaphylaxis',
    maxSingleDoseMg: 1,
    maxDailyDoseMg: 5,
    concentrations: [
      { label: 'Cardiac Arrest IV/IO 1:10,000 (0.1 mg/mL)', mgPerMl: 0.1 },
      { label: 'Anaphylaxis IM 1:1,000 (1 mg/mL - Max 0.5 mg)', mgPerMl: 1 }
    ],
    clinicalPearlsEn:
      'CRITICAL CONCENTRATION SAFETY: IV/IO Cardiac Arrest uses 0.1 mg/mL (1:10,000) = 0.1 mL/kg (max 1 mg / 10 mL). IM Anaphylaxis uses 1 mg/mL (1:1,000) = 0.01 mL/kg (max 0.3 mg child / 0.5 mg adolescent).',
    clinicalPearlsAr:
      'تحذير تركيز حرج (ISMP): في توقف القلب الوريدي يُستخدم تركيز 1:10,000 (0.1 مل/كغ)، أما في الحساسية المفرطة العضلية فيُستخدم تركيز 1:1,000 (0.01 مل/كغ بحد أقصى 0.5 مل).'
  }
];

export interface PediatricDoseCalculationResult {
  drug: PediatricDrugFormularyItem;
  weightKg: number;
  selectedMgPerKg: number;
  selectedConcentrationMgPerMl: number;
  rawSingleDoseMg: number;
  rawDailyDoseMg: number;
  cappedSingleDoseMg: number;
  cappedDailyDoseMg: number;
  isCappedAtAdultMax: boolean;
  volumePerDoseMl: number;
  volumePerDayMl: number;
}

export function calculatePediatricDrugDose(
  drugId: string,
  weightKg: number,
  customMgPerKg?: number,
  concentrationIdx: number = 0
): PediatricDoseCalculationResult {
  const drug =
    PEDIATRIC_DRUG_FORMULARY.find(d => d.id === drugId) || PEDIATRIC_DRUG_FORMULARY[0];
  const safeWeight = Math.max(0.5, weightKg);
  const mgPerKg = customMgPerKg ?? drug.defaultDoseMgPerKg;
  const conc =
    drug.concentrations[concentrationIdx] ||
    drug.concentrations[0] || { label: '1 mg/mL', mgPerMl: 1 };

  let rawSingleDoseMg = 0;
  let rawDailyDoseMg = 0;

  if (drug.dosingBasis === 'per_day') {
    rawDailyDoseMg = safeWeight * mgPerKg;
    rawSingleDoseMg = rawDailyDoseMg / Math.max(1, drug.dosesPerDay);
  } else {
    rawSingleDoseMg = safeWeight * mgPerKg;
    rawDailyDoseMg = rawSingleDoseMg * Math.max(1, drug.dosesPerDay);
  }

  const cappedSingleDoseMg = Math.min(rawSingleDoseMg, drug.maxSingleDoseMg);
  const cappedDailyDoseMg = Math.min(
    cappedSingleDoseMg * Math.max(1, drug.dosesPerDay),
    drug.maxDailyDoseMg
  );
  const finalSingleDoseMg = Math.min(
    cappedSingleDoseMg,
    cappedDailyDoseMg / Math.max(1, drug.dosesPerDay)
  );

  const isCappedAtAdultMax =
    rawSingleDoseMg > drug.maxSingleDoseMg || rawDailyDoseMg > drug.maxDailyDoseMg;

  const volumePerDoseMl =
    Math.round((finalSingleDoseMg / Math.max(0.01, conc.mgPerMl)) * 100) / 100;
  const volumePerDayMl =
    Math.round(volumePerDoseMl * Math.max(1, drug.dosesPerDay) * 100) / 100;

  return {
    drug,
    weightKg: safeWeight,
    selectedMgPerKg: mgPerKg,
    selectedConcentrationMgPerMl: conc.mgPerMl,
    rawSingleDoseMg: Math.round(rawSingleDoseMg * 100) / 100,
    rawDailyDoseMg: Math.round(rawDailyDoseMg * 100) / 100,
    cappedSingleDoseMg: Math.round(finalSingleDoseMg * 100) / 100,
    cappedDailyDoseMg: Math.round(cappedDailyDoseMg * 100) / 100,
    isCappedAtAdultMax,
    volumePerDoseMl,
    volumePerDayMl
  };
}

/**
 * Holliday-Segar 4-2-1 Rule for Pediatric Maintenance IV Fluids + Dehydration Deficit
 */
export function calculateHollidaySegarFluids(
  weightKg: number,
  dehydrationPercent: number = 0
): {
  hourlyMaintenanceMlHr: number;
  dailyMaintenanceMl24h: number;
  isotonicBolus20MlKg: number;
  dehydrationDeficitMl: number;
  total24hFluidWithDeficitMl: number;
  hourlyRateFirst8hMlHr: number;
  hourlyRateNext16hMlHr: number;
} {
  const w = Math.max(1, weightKg);
  let hourly = 0;
  let daily = 0;

  if (w <= 10) {
    hourly = w * 4;
    daily = w * 100;
  } else if (w <= 20) {
    hourly = 40 + (w - 10) * 2;
    daily = 1000 + (w - 10) * 50;
  } else {
    hourly = 60 + (w - 20) * 1;
    daily = 1500 + (w - 20) * 20;
  }

  const isotonicBolus20MlKg = Math.round(w * 20);
  // 1% dehydration = 10 mL/kg fluid deficit
  const dehydrationDeficitMl = Math.round(w * Math.max(0, dehydrationPercent) * 10);
  const total24hFluidWithDeficitMl = Math.round(daily + dehydrationDeficitMl);

  // Half of deficit in first 8 hours + maintenance, remaining half over next 16 hours + maintenance
  const hourlyRateFirst8hMlHr =
    Math.round((hourly + dehydrationDeficitMl / 2 / 8) * 10) / 10;
  const hourlyRateNext16hMlHr =
    Math.round((hourly + dehydrationDeficitMl / 2 / 16) * 10) / 10;

  return {
    hourlyMaintenanceMlHr: Math.round(hourly * 10) / 10,
    dailyMaintenanceMl24h: Math.round(daily),
    isotonicBolus20MlKg,
    dehydrationDeficitMl,
    total24hFluidWithDeficitMl,
    hourlyRateFirst8hMlHr,
    hourlyRateNext16hMlHr
  };
}

/**
 * Pediatric Bedside Schwartz eGFR, BSA (Mosteller), and PALS Emergency Resuscitation Sizing
 */
export function calculatePediatricRenalAndPals(
  ageYears: number,
  weightKg: number,
  heightCm: number,
  serumCr: number,
  kFactor: number = 0.413
) {
  const safeScr = Math.max(0.1, serumCr);
  const safeHt = Math.max(30, heightCm);
  const safeWt = Math.max(1, weightKg);

  const schwartzEgfr = Math.round(((kFactor * safeHt) / safeScr) * 10) / 10;
  const bsaMosteller = Math.round(Math.sqrt((safeHt * safeWt) / 3600) * 100) / 100;

  // PALS Endotracheal Tube (ETT) & Defibrillation sizing
  const uncuffedEttMm = Math.round((ageYears / 4 + 4) * 2) / 2;
  const cuffedEttMm = Math.round((ageYears / 4 + 3.5) * 2) / 2;
  const ettDepthCm = Math.round(cuffedEttMm * 3 * 10) / 10;
  const defibFirstShockJoules = Math.round(safeWt * 2);
  const defibSecondShockJoules = Math.round(safeWt * 4);
  const cardioversionJoules = Math.round(safeWt * 1);
  const epinephrineArrestMg = Math.min(1, Math.round(safeWt * 0.01 * 100) / 100);
  const epinephrineArrestMl1to10000 = Math.min(10, Math.round(safeWt * 0.1 * 10) / 10);
  const amiodaroneArrestMg = Math.min(300, Math.round(safeWt * 5));
  const d10wHypoglycemiaMl = Math.round(safeWt * 5);

  return {
    schwartzEgfr,
    bsaMosteller,
    uncuffedEttMm,
    cuffedEttMm,
    ettDepthCm,
    defibFirstShockJoules,
    defibSecondShockJoules,
    cardioversionJoules,
    epinephrineArrestMg,
    epinephrineArrestMl1to10000,
    amiodaroneArrestMg,
    d10wHypoglycemiaMl
  };
}

/**
 * DynaMedex MELD-Na (UNOS/OPTN) Liver Disease Severity Calculator
 */
export function calculateMeldNa(
  bilirubinMgDl: number,
  inr: number,
  creatinineMgDl: number,
  sodiumMeqL: number,
  onDialysisTwicePastWeek: boolean = false
): {
  meldInitial: number;
  meldNaScore: number;
  mortality90Day: string;
  clinicalInterpretation: string;
} {
  const bili = Math.max(1.0, bilirubinMgDl);
  const safeInr = Math.max(1.0, inr);
  const cr = onDialysisTwicePastWeek ? 4.0 : Math.min(4.0, Math.max(1.0, creatinineMgDl));
  const na = Math.min(137, Math.max(125, sodiumMeqL));

  const rawMeld =
    0.957 * Math.log(cr) +
    0.378 * Math.log(bili) +
    1.12 * Math.log(safeInr) +
    0.643;
  const meldInitial = Math.round(rawMeld * 10);

  let meldNa = meldInitial;
  if (meldInitial > 11) {
    meldNa =
      meldInitial + 1.32 * (137 - na) - 0.033 * meldInitial * (137 - na);
  }
  const meldNaScore = Math.min(40, Math.max(6, Math.round(meldNa)));

  let mortality90Day = '1.9% (Low 3-month mortality)';
  let clinicalInterpretation =
    'Outpatient hepatology follow-up; standard Child-Pugh / renal drug dosing checks.';
  if (meldNaScore >= 40) {
    mortality90Day = '71.3% (Critical 90-day mortality)';
    clinicalInterpretation =
      'Status 1 / Highest urgency liver transplant priority; intensive ICU hemodynamic and hepatorenal support.';
  } else if (meldNaScore >= 30) {
    mortality90Day = '52.6% (Very High 90-day mortality)';
    clinicalInterpretation =
      'Urgent liver transplant evaluation; avoid all hepatotoxins, NSAIDs, and nephrotoxic agents.';
  } else if (meldNaScore >= 20) {
    mortality90Day = '19.6% (High 90-day mortality)';
    clinicalInterpretation =
      'Expedited transplant listing recommended (MELD-Na >= 15 threshold).';
  } else if (meldNaScore >= 10) {
    mortality90Day = '6.0% (Moderate 90-day mortality)';
    clinicalInterpretation =
      'Monitor for portal hypertension complications (ascites, SBP prophylaxis, varices).';
  }

  return {
    meldInitial,
    meldNaScore,
    mortality90Day,
    clinicalInterpretation
  };
}

/**
 * DynaMedex Albumin-Corrected Phenytoin Calculator (Winter-Tozer Formula)
 */
export function calculateWinterTozerPhenytoin(
  measuredTotalPhenytoinMcgMl: number,
  serumAlbuminGDl: number,
  crclLessThan10OrEsrd: boolean = false
): {
  correctedPhenytoin: number;
  estimatedFreePhenytoin: number;
  status: 'subtherapeutic' | 'therapeutic' | 'supratherapeutic';
  recommendation: string;
} {
  const coeff = crclLessThan10OrEsrd ? 0.1 : 0.2;
  const denom = Math.max(0.1, coeff * serumAlbuminGDl + 0.1);
  const correctedPhenytoin = Math.round((measuredTotalPhenytoinMcgMl / denom) * 10) / 10;
  const estimatedFreePhenytoin = Math.round(correctedPhenytoin * 0.1 * 100) / 100;

  let status: 'subtherapeutic' | 'therapeutic' | 'supratherapeutic' = 'therapeutic';
  let recommendation =
    'Within therapeutic window (10–20 mcg/mL total / 1–2 mcg/mL free). Continue current maintenance regimen.';

  if (correctedPhenytoin < 10) {
    status = 'subtherapeutic';
    recommendation =
      'Subtherapeutic (<10 mcg/mL): Consider incremental Michaelis-Menten dose increase (non-linear saturable CYP2C9/2C19 kinetics; avoid large jumps).';
  } else if (correctedPhenytoin > 20) {
    status = 'supratherapeutic';
    recommendation =
      'Supratherapeutic / Toxicity Risk (>20 mcg/mL): Hold phenytoin, assess for nystagmus/ataxia/lethargy, and check direct Free Phenytoin level.';
  }

  return {
    correctedPhenytoin,
    estimatedFreePhenytoin,
    status,
    recommendation
  };
}

/**
 * DynaMedex Sodium Correction in Hyperglycemia & Free Water Deficit in Hypernatremia
 */
export function calculateSodiumAndFreeWater(
  measuredNaMeqL: number,
  serumGlucoseMgDl: number,
  weightKg: number,
  ageCategory: 'adult_male' | 'adult_female' | 'elderly_male' | 'elderly_female' | 'child',
  targetNaMeqL: number = 140
) {
  const glucoseAbove100 = Math.max(0, (serumGlucoseMgDl - 100) / 100);
  // Katz formula (1.6 mEq/L per 100 mg/dL) & Hillier formula (2.4 mEq/L per 100 mg/dL)
  const katzCorrectedNa = Math.round((measuredNaMeqL + 1.6 * glucoseAbove100) * 10) / 10;
  const hillierCorrectedNa = Math.round((measuredNaMeqL + 2.4 * glucoseAbove100) * 10) / 10;

  const tbwFactors: Record<typeof ageCategory, number> = {
    child: 0.6,
    adult_male: 0.6,
    adult_female: 0.5,
    elderly_male: 0.5,
    elderly_female: 0.45
  };
  const tbwLiters = Math.round(weightKg * tbwFactors[ageCategory] * 10) / 10;

  const freeWaterDeficitLiters =
    measuredNaMeqL > targetNaMeqL
      ? Math.round(tbwLiters * (measuredNaMeqL / targetNaMeqL - 1) * 100) / 100
      : 0;
  const freeWaterDeficitMl = Math.round(freeWaterDeficitLiters * 1000);

  return {
    katzCorrectedNa,
    hillierCorrectedNa,
    tbwLiters,
    freeWaterDeficitLiters,
    freeWaterDeficitMl
  };
}

/**
 * DynaMedex Acid-Base Anion Gap, Albumin-Corrected Anion Gap, Delta Ratio & Winter's Formula
 */
export function calculateAnionGapAndAcidBase(
  sodium: number,
  chloride: number,
  bicarbonate: number,
  albumin: number = 4.0,
  measuredPaco2: number = 40
) {
  const anionGap = Math.round((sodium - (chloride + bicarbonate)) * 10) / 10;
  const correctedAnionGap =
    Math.round((anionGap + 2.5 * (4.0 - albumin)) * 10) / 10;
  const deltaAg = Math.max(0, correctedAnionGap - 12);
  const deltaHco3 = Math.max(0.1, 24 - bicarbonate);
  const deltaRatio = Math.round((deltaAg / deltaHco3) * 100) / 100;

  // Winter's Formula for expected respiratory compensation in metabolic acidosis: PaCO2 = 1.5 * HCO3 + 8 (± 2)
  const wintersExpectedPaco2Min = Math.round((1.5 * bicarbonate + 6) * 10) / 10;
  const wintersExpectedPaco2Max = Math.round((1.5 * bicarbonate + 10) * 10) / 10;

  let deltaInterpretation = 'Pure High Anion Gap Metabolic Acidosis (HAGMA: Delta Ratio 1.0–2.0)';
  if (correctedAnionGap <= 12) {
    deltaInterpretation = 'Normal Anion Gap (Hyperchloremic Acidosis or Normal Acid-Base)';
  } else if (deltaRatio < 0.4) {
    deltaInterpretation = 'Hyperchloremic Normal Anion Gap Metabolic Acidosis (NAGMA)';
  } else if (deltaRatio < 1.0) {
    deltaInterpretation = 'Combined HAGMA + Normal Anion Gap Metabolic Acidosis (NAGMA)';
  } else if (deltaRatio > 2.0) {
    deltaInterpretation = 'Combined HAGMA + Concurrent Metabolic Alkalosis (or chronic respiratory acidosis)';
  }

  let respiratoryCompensation = 'Appropriate respiratory compensation (PaCO2 within Winter’s range)';
  if (measuredPaco2 < wintersExpectedPaco2Min) {
    respiratoryCompensation = 'Concurrent Primary Respiratory Alkalosis (PaCO2 lower than Winter’s prediction)';
  } else if (measuredPaco2 > wintersExpectedPaco2Max) {
    respiratoryCompensation = 'Concurrent Primary Respiratory Acidosis / Ventilatory Failure (PaCO2 higher than Winter’s prediction)';
  }

  return {
    anionGap,
    correctedAnionGap,
    deltaRatio,
    wintersExpectedPaco2Min,
    wintersExpectedPaco2Max,
    deltaInterpretation,
    respiratoryCompensation
  };
}

/**
 * DynaMedex QTc Interval Calculator (Bazett, Fridericia, Framingham, Hodges)
 */
export function calculateQtcIntervals(qtMs: number, heartRateBpm: number, qrsMs: number = 90) {
  const safeHr = Math.max(25, Math.min(250, heartRateBpm));
  const rrSec = 60 / safeHr;

  // Adjust QT for wide QRS (>120 ms) using Bogossian formula: QT_adj = QT - (QRS - 120)*0.5
  const effectiveQtMs = qrsMs > 120 ? qtMs - 0.5 * (qrsMs - 120) : qtMs;

  const bazettMs = Math.round(effectiveQtMs / Math.sqrt(rrSec));
  const fridericiaMs = Math.round(effectiveQtMs / Math.cbrt(rrSec));
  const framinghamMs = Math.round(effectiveQtMs + 154 * (1 - rrSec));
  const hodgesMs = Math.round(effectiveQtMs + 1.75 * (safeHr - 60));

  const isProlonged = fridericiaMs >= 460 || bazettMs >= 460;
  const isHighTdpRisk = fridericiaMs >= 500 || bazettMs >= 500;

  return {
    rrSec: Math.round(rrSec * 100) / 100,
    effectiveQtMs: Math.round(effectiveQtMs),
    bazettMs,
    fridericiaMs,
    framinghamMs,
    hodgesMs,
    isProlonged,
    isHighTdpRisk
  };
}

/**
 * Systemic Corticosteroid Equivalency Table & Converter (DynaMedex)
 */
export const CORTICOSTEROID_EQUIVALENTS = {
  Hydrocortisone: { eqMg: 20, mineralocorticoid: 1.0, halfLifeHours: '8–12h (Short-acting)' },
  Cortisone: { eqMg: 25, mineralocorticoid: 0.8, halfLifeHours: '8–12h (Short-acting)' },
  Prednisone: { eqMg: 5, mineralocorticoid: 0.8, halfLifeHours: '12–36h (Intermediate)' },
  Prednisolone: { eqMg: 5, mineralocorticoid: 0.8, halfLifeHours: '12–36h (Intermediate)' },
  Methylprednisolone: { eqMg: 4, mineralocorticoid: 0.5, halfLifeHours: '12–36h (Intermediate)' },
  Triamcinolone: { eqMg: 4, mineralocorticoid: 0, halfLifeHours: '12–36h (Intermediate)' },
  Dexamethasone: { eqMg: 0.75, mineralocorticoid: 0, halfLifeHours: '36–72h (Long-acting)' },
  Betamethasone: { eqMg: 0.6, mineralocorticoid: 0, halfLifeHours: '36–72h (Long-acting)' }
} as const;

export type CorticosteroidName = keyof typeof CORTICOSTEROID_EQUIVALENTS;

export function convertCorticosteroid(
  fromSteroid: CorticosteroidName,
  fromDoseMg: number,
  toSteroid: CorticosteroidName
): {
  convertedDoseMg: number;
  prednisoneEquivalentMg: number;
  fromInfo: (typeof CORTICOSTEROID_EQUIVALENTS)[CorticosteroidName];
  toInfo: (typeof CORTICOSTEROID_EQUIVALENTS)[CorticosteroidName];
} {
  const fromInfo = CORTICOSTEROID_EQUIVALENTS[fromSteroid];
  const toInfo = CORTICOSTEROID_EQUIVALENTS[toSteroid];
  const potencyRatio = fromDoseMg / fromInfo.eqMg;
  const convertedDoseMg = Math.round(potencyRatio * toInfo.eqMg * 100) / 100;
  const prednisoneEquivalentMg = Math.round(potencyRatio * 5 * 100) / 100;

  return {
    convertedDoseMg,
    prednisoneEquivalentMg,
    fromInfo,
    toInfo
  };
}

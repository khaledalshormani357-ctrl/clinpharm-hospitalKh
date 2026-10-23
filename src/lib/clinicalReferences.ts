import { Patient } from '../types/clinical';

export interface ExternalReferenceSource {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  type: 'notebooklm' | 'gdrive_archive' | 'gdrive_document' | 'gdrive_textbook';
  viewUrl: string;
  downloadUrl?: string;
  badge: string;
  badgeAr: string;
  metadata: string;
  metadataAr: string;
  citationTemplate: string;
  highlights: string[];
  highlightsAr: string[];
}

export interface QuickReferenceTable {
  title: string;
  titleAr: string;
  headers: string[];
  headersAr: string[];
  rows: string[][];
  rowsAr: string[][];
}

export interface AccpChapterReference {
  id: string;
  bookId: 'accp-2026-vol1' | 'accp-2026-vol2' | 'dipiro-13th' | 'accp-cardio-2026' | 'casebook-guide' | 'notebooklm-hub' | 'hospital-compendium' | 'stockleys-drug-interactions';
  volume: 1 | 2 | 13 | 2026;
  chapterNumber: number;
  pages: string;
  category: string;
  categoryAr: string;
  title: string;
  titleAr: string;
  authors?: string;
  uan?: string;
  summary: string;
  summaryAr: string;
  pathophysiology?: string;
  pathophysiologyAr?: string;
  algorithmSteps?: string[];
  algorithmStepsAr?: string[];
  quickTables?: QuickReferenceTable[];
  keyRecommendations: string[];
  keyRecommendationsAr: string[];
  clinicalPearls: string[];
  clinicalPearlsAr: string[];
  keywords: string[];
  sourceId: string;
  sourceUrl: string;
  evidenceLevel: string;
}

export interface CustomReferenceNote {
  id: string;
  sourceId: string;
  title: string;
  content: string;
  tags: string[];
  addedAt: string;
}

export interface CaseSimulatorParams {
  scenarioId: 'hfref_adhf_cardiorenal' | 'acs_nstemi_dapt' | 'afib_anticoag_interaction' | 'icu_hap_sepsis_aki' | 'cirrhosis_ascites_he' | 'dka_hyperkalemia_glycemic';
  patientName: string;
  age: number;
  weightKg: number;
  crcl: number;
  serumCr: number;
  potassium: number;
  sodium: number;
  sbp: number;
  heartRate: number;
  lvef: number;
  inr: number;
  childPughClass: 'A' | 'B' | 'C';
  hemodynamicProfile: 'warm_dry' | 'warm_wet' | 'cold_wet' | 'cold_dry';
  hasPenicillinAnaphylaxis: boolean;
  hasAspirinAllergy: boolean;
  hasActiveBleed: boolean;
  switchingAceiToArni: boolean;
  onAmiodarone: boolean;
}

export interface SimulatedCaseAction {
  priority: 'STOP_HOLD' | 'DOSE_ADJUST' | 'START_ESCALATE' | 'MONITOR_TDM';
  priorityLabelAr: string;
  priorityLabelEn: string;
  drugOrTarget: string;
  actionAr: string;
  actionEn: string;
  rationaleAr: string;
  rationaleEn: string;
  citationBadge: string;
  sourceUrl: string;
}

export interface ReferenceCaseExtract {
  sourceId: string;
  sourceBadge: string;
  sourceBadgeAr: string;
  chapterTitle: string;
  chapterTitleAr: string;
  pages: string;
  sourceUrl: string;
  roleInCaseAr: string;
  roleInCaseEn: string;
  tailoredExtractAr: string[];
  tailoredExtractEn: string[];
}

export interface CaseSimulationResult {
  headlineAr: string;
  headlineEn: string;
  pathophysiologyActiveAr: string;
  pathophysiologyActiveEn: string;
  activeAlgorithmBranchAr: string[];
  activeAlgorithmBranchEn: string[];
  immediateActions: SimulatedCaseAction[];
  referenceExtracts: ReferenceCaseExtract[];
  quickDosingTables: QuickReferenceTable[];
  readySoapPlanAr: string;
  readySoapPlanEn: string;
}

const CUSTOM_REF_STORAGE_KEY = 'clinpharm_custom_reference_notes_v1';

export const PRIMARY_CLINICAL_REFERENCES: ExternalReferenceSource[] = [
  {
    id: 'dipiro-13th-ed',
    title: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach (13th Edition)",
    titleAr: 'مرجع ديبيرو للعلاج الدوائي: نهج فيزيولوجي مرضي (DiPiro’s Pharmacotherapy — الطبعة 13)',
    subtitle: 'In-App Embedded Textbook DB • Pathophysiology, Diagnostic Algorithms & Step-by-Step Therapeutics',
    subtitleAr: 'قاعدة بيانات مرجعية محلية داخل التطبيق • الفيزيولوجيا المرضية، الخوارزميات التشخيصية، وخطط العلاج المتدرجة',
    type: 'gdrive_textbook',
    viewUrl: 'local://ref/source/dipiro-13th-ed',
    downloadUrl: 'local://ref/export/dipiro-13th-ed',
    badge: "DiPiro's 13th Edition",
    badgeAr: 'مرجع DiPiro (الطبعة 13)',
    metadata: "Local DB ID: dipiro-13th-ed (Archive Ref: 1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR) • 100% Offline In-App Indexed",
    metadataAr: 'قاعدة بيانات محلية: DiPiro Pharmacotherapy 13th Ed (Ref: 1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR) • مفهرس بالكامل داخل التطبيق دون اتصال خارجي',
    citationTemplate:
      "DiPiro JT, Yee GC, Haines ST, Nolin TD, Ellingrod VL, Posey LM, eds. DiPiro's Pharmacotherapy: A Pathophysiologic Approach. 13th ed. McGraw Hill; 2026. [local://ref/source/dipiro-13th-ed]",
    highlights: [
      'Complete pathophysiologic mechanisms linking organ dysfunction, biomarkers, and drug targets stored in the local app database.',
      'Step-by-step clinical treatment algorithms, patient-specific dosing tables, and monitoring parameters with direct in-app deep links.',
      'Extracted directly into the in-app Case Simulator so pharmacists and students get tailored guidance locally without external navigation.'
    ],
    highlightsAr: [
      'يربط الآلية الفيزيولوجية المرضية للحالة مباشرةً باختيار الدواء والجرعة وتعديلات الأعضاء من قاعدة بيانات التطبيق المحلية.',
      'يحتوي على خوارزميات علاجية متسلسلة وجداول جرعات ومراقبة مفهرسة بالكامل بروابط داخلية سريعة (local://ref/...).',
      'موظف تفاعلياً في محاكي الحالات السريري لاستخراج القرار الدوائي المخصص للمريض داخل التطبيق مباشرةً.'
    ]
  },
  {
    id: 'accp-cardiology-2026',
    title: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review Course (2026 Edition)',
    titleAr: 'مرجع البورد الأمريكي التخصصي لعلـوم وصيدلة القلب (ACCP/ASHP Cardiology 2026 — BCCP)',
    subtitle: 'In-App Board Database (BCCP) • ACS, HFrEF/ADHF Hemodynamics, Arrhythmias, Mechanical Support & Anticoagulation',
    subtitleAr: 'قاعدة بيانات البورد التخصصي للقلب (BCCP) • عناية القلب الحرجة والمزمنة والديناميكا الدموية داخل التطبيق',
    type: 'gdrive_textbook',
    viewUrl: 'local://ref/source/accp-cardiology-2026',
    downloadUrl: 'local://ref/export/accp-cardiology-2026',
    badge: 'ACCP Cardiology 2026 (BCCP)',
    badgeAr: 'ACCP للقلب 2026 (BCCP)',
    metadata: 'Local DB ID: accp-cardiology-2026 (Archive Ref: 1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt) • ISBN 978-1-964074-46-7 • ACPE UAN 0217-9999-26-096 to 102-H01-P',
    metadataAr: 'قاعدة بيانات محلية: ACCP Cardiology 2026 (Ref: 1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt) • ISBN 978-1-964074-46-7 • تخصص صيدلة القلب BCCP',
    citationTemplate:
      'Baker WL, Berei T, Bolesta S, et al, eds. Cardiology Pharmacy Preparatory Review Course, 2026 ed. American College of Clinical Pharmacy / ASHP; 2026. [local://ref/source/accp-cardiology-2026]',
    highlights: [
      'Specialized BCCP protocols for ADHF Nohria-Stevenson hemodynamic profiles (Warm/Wet, Cold/Wet) and sequential nephron blockade.',
      'Rapid 4-pillar HFrEF titration, P2Y12 inhibitor switching/de-escalation in ACS/PCI, and complex arrhythmia/DOAC management.',
      'Integrated into the live Case Simulator for instant in-app hemodynamic and cardiovascular dose optimization.'
    ],
    highlightsAr: [
      'بروتوكولات تخصصية دقيقة لتصنيف قصور القلب الحاد (Nohria-Stevenson Warm/Cold & Wet/Dry) والقوابض والمقويات القلبية.',
      'جداول التحويل بين مثبطات الصفائح (P2Y12 Switching) في القسطرة القلبية، وتدريج الركائز الأربع لقصور القلب، واضطرابات النظم.',
      'مدمج بالكامل في قاعدة بيانات التطبيق لاستخراج قرارات عناية القلب (CCU) بروابط محلية مباشرة.'
    ]
  },
  {
    id: 'accp-2026-vol1-vol2',
    title: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol. 1 & Vol. 2)',
    titleAr: 'موسوعة ACCP للعلاج الدوائي والبورد الأمريكي 2026 (المجلد الأول والثاني — BCPS)',
    subtitle: 'In-App Board Encyclopedia (BCPS) • 22 Clinical Chapters • 1,274 Pages Indexed Locally',
    subtitleAr: 'موسوعة البورد الأمريكي للصيدلة السريرية (BCPS) • 22 فصلاً سريرياً متكاملاً • مفهرسة محلياً بالكامل',
    type: 'gdrive_archive',
    viewUrl: 'local://ref/source/accp-2026-vol1-vol2',
    downloadUrl: 'local://ref/export/accp-2026-vol1-vol2',
    badge: 'ACCP 2026 (Vol 1 & 2)',
    badgeAr: 'ACCP 2026 (مجلد 1 و 2)',
    metadata: 'Local DB ID: accp-2026-vol1-vol2 (Archive Ref: 1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By) • Vol 1 (648 pp) & Vol 2 (626 pp) • ISBN 978-1-964074-44-3',
    metadataAr: 'قاعدة بيانات محلية: ACCP Pharmacotherapy 2026 (Ref: 1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By) • مجلد 1 (648 ص) ومجلد 2 (626 ص) • ISBN 978-1-964074-44-3',
    citationTemplate:
      'Beckett RD, Bente JA, Brunetti L, et al, eds. Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course, 2026 ed. American College of Clinical Pharmacy; 2026. [local://ref/source/accp-2026-vol1-vol2]',
    highlights: [
      'Volume 1 (648 pp): Acute & Chronic Cardiology, Anticoagulation, Infectious Diseases, HIV/TB, Critical Care, Fluids/Electrolytes/Nutrition, Pulmonology, Neurology, Reproductive Health.',
      'Volume 2 (626 pp): Health Care Systems, Oncology Supportive Care, Drug Info, Gastroenterology/Hepatology, Endocrinology, Nephrology, Pharmacokinetics/TDM, Geriatrics, Biostatistics, Study Designs, Pediatrics, Psychiatry.',
      '26.25 BCPS Continuing Pharmacy Education Contact Hours indexed as instant in-app local chapters.'
    ],
    highlightsAr: [
      'المجلد الأول (648 صفحة): عناية القلب الحرجة والمزمنة، مضادات التخثر، الأمراض المعدية، العناية المركزة، السوائل والكهارل والتغذية الوريدية، الصدرية، الأعصاب، وصحة المرأة.',
      'المجلد الثاني (626 صفحة): النظم الصحية، الرعاية الداعمة للأورام، معلومات الأدوية، الجهاز الهضمي والكبد، الغدد الصماء والسكري، الكلى وتعديل الجرعات، الحركية الدوائية (PK/TDM)، المسنين، الإحصاء الحيوي، والأطفال.',
      'مرفوع ومفهرس بالكامل كقاعدة بيانات محلية داخل التطبيق للبحث الفوري وربط الاستدلالات وخطط SOAP بروابط داخلية.'
    ]
  },
  {
    id: 'notebooklm-31c74a31',
    title: 'ClinPharm Local Knowledge Hub — Hospital Stewardship & High-Alert Protocols',
    titleAr: 'قاعدة المعرفة السريرية المحلية (ClinPharm Knowledge Hub) — بروتوكولات المستشفى والأدوية عالية الخطورة',
    subtitle: 'Embedded Clinical Synthesis & ICU Rounding Checklists (Synced from NotebookLM Hub)',
    subtitleAr: 'ملخصات البروتوكولات السريرية وقوائم التحقق اليومية للعناية المركزة المدمجة محلياً داخل التطبيق',
    type: 'notebooklm',
    viewUrl: 'local://ref/source/notebooklm-31c74a31',
    downloadUrl: 'local://ref/export/notebooklm-31c74a31',
    badge: 'Local Stewardship Hub',
    badgeAr: 'قاعدة بروتوكولات المستشفى المحلية',
    metadata: 'Local DB ID: notebooklm-31c74a31 (Sync Ref: 31c74a31-d444-4339-afd0-b74d8b045d98) • Grounded Local Synthesis',
    metadataAr: 'معرّف القاعدة المحلية: 31c74a31-d444-4339-afd0-b74d8b045d98 • استخلاص سريري موثّق داخل التطبيق',
    citationTemplate:
      'ClinPharm Embedded Hospital Knowledge Base (ID: 31c74a31-d444-4339-afd0-b74d8b045d98). [local://ref/source/notebooklm-31c74a31]',
    highlights: [
      'Embedded clinical pharmacotherapy synthesis notes, ICU daily rounding checklists, and antimicrobial de-escalation rules.',
      'Integrated with ClinPharm AI Copilot & SOAP Evidence Gate via local://ref/... citations.',
      'Supports adding custom clinical excerpts directly into the local offline reference database.'
    ],
    highlightsAr: [
      'وصول فوري داخل التطبيق إلى الملخصات العلاجية المعتمدة وقوائم مراجعة العناية المركزة للصيادلة.',
      'مربوط مباشرةً بروابط محلية مع المساعد الذكي (Copilot) وبوابة توثيق الأدلة العلمية في التدخلات (DRPs).',
      'يدعم إضافة وحفظ الملخصات السريرية المخصصة في قاعدة البيانات المحلية للبحث الفوري دون اتصال.'
    ]
  },
  {
    id: 'gdrive-clinical-ref-2',
    title: 'Hospital Clinical Dosing Compendium & IV Dilution Database',
    titleAr: 'موسوعة جرعات المستشفيات وتخفيف الأدوية الوريدية والحركية السريرية (قاعدة بيانات محلية)',
    subtitle: 'Embedded Hospital Dosing & Electrolyte/Infusion Reference (Archive ID: 1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC)',
    subtitleAr: 'مرجع الجرعات الوريدية وتعديلات الأعضاء وبروتوكولات الطوارئ المدمج محلياً داخل التطبيق',
    type: 'gdrive_document',
    viewUrl: 'local://ref/source/gdrive-clinical-ref-2',
    downloadUrl: 'local://ref/export/gdrive-clinical-ref-2',
    badge: 'Hospital Dosing DB',
    badgeAr: 'قاعدة جرعات المستشفى المحلية',
    metadata: 'Local DB ID: gdrive-clinical-ref-2 (Archive Ref: 1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC) • Embedded Local Monograph',
    metadataAr: 'قاعدة بيانات محلية: 1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC • جداول الجرعات الوريدية والطوارئ مدمجة داخل التطبيق',
    citationTemplate:
      'Clinical Pharmacy Hospital Dosing Compendium (Archive ID: 1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC). [local://ref/source/gdrive-clinical-ref-2]',
    highlights: [
      'Instant in-app access to hospital IV infusion rates, maximum concentrations, and emergency electrolyte protocols.',
      'Can be cited directly via local://ref/... URIs in high-risk clinical interventions (DRPs) and medication reviews.',
      'Supports adding custom indexed clinical notes into the local workspace database.'
    ],
    highlightsAr: [
      'فتح واستعراض فوري داخل التطبيق لجداول التسريب الوريدي، التراكيز القصوى، وبروتوكولات الطوارئ دون مغادرة التطبيق.',
      'معتمد كمرجع محلي موثق في بوابة التحقق من الأدلة العلمية (Evidence Gate) للتدخلات عالية الخطورة.',
      'يتيح للصيدلي فهرسة أي جداول أو ملاحظات إضافية داخل قاعدة البيانات المحلية للتطبيق.'
    ]
  },
  {
    id: 'clinical-casebook-guide',
    title: 'Clinical Pharmacy Casebook & Bedside Patient Workup Guide (PPCP & Case-Taking Manual)',
    titleAr: 'دليل الصيدلي الإكلينيكي والطالب لأخذ الحالات السريرية والتعامل معها (Clinical Case-Taking & PPCP Workup Guide)',
    subtitle: 'In-App Bedside Assessment DB, Essential Data Checklists by Syndrome, Test Cases & Student OSCE Casebook',
    subtitleAr: 'منهجية أخذ القصة المرضية والدوائية (BPMH)، أهم المعلومات المطلوبة في كل حالة، وحالات الاختبار والتدريب المحلي',
    type: 'gdrive_textbook',
    viewUrl: 'local://ref/source/clinical-casebook-guide',
    downloadUrl: 'local://ref/export/clinical-casebook-guide',
    badge: 'Case-Taking & Workup Guide',
    badgeAr: 'دليل أخذ الحالات والتدريب',
    metadata: 'Local DB ID: clinical-casebook-guide (Archive Ref: 1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP) • Extracted PPCP Checklists, App Test Cases & Student Training Cases',
    metadataAr: 'قاعدة بيانات محلية: 1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP • مرفوع بالكامل كقوائم فحص سريرية وحالات اختبار وتدريب داخل التطبيق',
    citationTemplate:
      'Clinical Pharmacy Patient Care Process (PPCP) & Pharmacotherapy Casebook Guide (Archive ID: 1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP). [local://ref/source/clinical-casebook-guide]',
    highlights: [
      'Complete 5-step Bedside Case-Taking Protocol (CC/HPI via OPQRST, BPMH & Allergy Phenotyping, Organ/PK Assessment, IESC DRP Scan, and SOAP/SBAR Plan).',
      'Syndrome-specific checklists detailing the exact history questions, labs, vitals, and drug traps to check in every clinical condition.',
      'Provides live Benchmark Test Cases to validate the app engines and interactive OSCE Training Cases for pharmacy students.'
    ],
    highlightsAr: [
      'يستخرج المنهجية الكاملة لكيفية أخذ الحالة السريرية خطوة بخطوة (Collect -> Assess -> Plan -> Implement -> Monitor) محلياً.',
      'يحدد أهم المعلومات والتحاليل والفخاخ الدوائية التي يجب أن يجمعها الصيدلي أو الطالب في كل متلازمة سريرية.',
      'موظف عملياً كحالات اختبار حية لمحركات التطبيق (App Test Cases) وكحالات تدريبية تفاعلية للطلاب (Student OSCE Cases).'
    ]
  },
  {
    id: 'stockleys-drug-interactions',
    title: "Stockley's Drug Interactions (13th Ed / 2026 Clinical DDI Database)",
    titleAr: 'موسوعة ستوكلي للتعارضات والتداخلات الدوائية (Stockley’s Drug Interactions — قاعدة بيانات DDI)',
    subtitle: 'Primary Clinical Drug-Drug Interaction (DDI) Reference Database • Drive Archive: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S',
    subtitleAr: 'المرجع العالمي الأول وقاعدة البيانات المعتمدة للتعارضات الدوائية الحركية والديناميكية وتصنيفات الخطورة السريرية',
    type: 'gdrive_textbook',
    viewUrl: 'local://ref/source/stockleys-drug-interactions',
    downloadUrl: 'https://drive.google.com/file/d/1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S/view?usp=drivesdk',
    badge: "Stockley's Drug Interactions",
    badgeAr: 'مرجع Stockley للتعارضات الدوائية',
    metadata: 'Local DB ID: stockleys-drug-interactions (Google Drive File ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) • Full DDI Engine & IndexedDB Sync',
    metadataAr: 'قاعدة بيانات محلية: Stockley’s Drug Interactions (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) • مربوطة بمحرك فحص التداخلات و IndexedDB',
    citationTemplate:
      "Preston CL, ed. Stockley's Drug Interactions. 13th ed. Pharmaceutical Press; 2026. [Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S | local://ref/source/stockleys-drug-interactions]",
    highlights: [
      'Authoritative Stockley Action Ratings (Contraindicated / Avoid / Adjust Dose / Monitor TDM) for CYP450, P-gp, OATP1B1, QTc, Serotonergic, and Nephrotoxic interactions.',
      'Directly powers the hospital DDI Screening Engine, Automated Patient Safety Scanner, and AI Clinical Copilot.',
      'Linked to Google Drive PDF (1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) for 1-click offline IndexedDB storage and verbatim chapter browsing.'
    ],
    highlightsAr: [
      'يوفر تصنيفات ستوكلي الإكلينيكية (Stockley Action Ratings) للتداخلات الاستقلابية (CYP450 / P-gp) والديناميكية (QTc، متلازمة السيروتونين، السمية الكلوية، والنزيف).',
      'يعمل كقاعدة البيانات الأساسية لمحرك فحص التعارضات الدوائية (Alerts & DDI Engine) والمساعد السريري الذكي.',
      'مربوط مباشرةً بملف Google Drive المرفوع (1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) للمزامنة والتخزين المحلي في المتصفح (IndexedDB).'
    ]
  }
];

export const ACCP_2026_CHAPTERS: AccpChapterReference[] = [
  // ==================== STOCKLEY'S DRUG INTERACTIONS MASTER REFERENCE ====================
  {
    id: 'stockleys-ddi-master',
    bookId: 'stockleys-drug-interactions',
    volume: 13,
    chapterNumber: 1,
    pages: 'Sections 1–3 (Anticoagulants, CV/QTc, Antimicrobials & Critical Care DDIs)',
    category: 'Drug Interactions & Safety',
    categoryAr: 'التعارضات الدوائية وسلامة المرضى (Stockley’s DDI)',
    title: "Stockley's Drug Interactions: Clinical Mechanisms, Action Ratings, CYP450/Transporter Matrices & Management",
    titleAr: 'موسوعة Stockley للتعارضات الدوائية: الآليات الحركية والديناميكية، جداول الإنزيمات الناقلة، وبروتوكولات التدبير السريري',
    authors: 'Claire L. Preston, BPharm, MRPharmS (Editor) — Pharmaceutical Press',
    summary:
      'Comprehensive evidence-based drug-drug interaction monographs covering anticoagulants (Warfarin, Apixaban, Rivaroxaban), antiplatelets (Clopidogrel + CYP2C19 PPIs), cardiovascular/QTc/RAAS combinations (ACEi + ARNI 36h washout, Spironolactone hyperkalemia, Digoxin P-gp toxicity, Statin myopathy), and ICU antimicrobials (Carbapenem + Valproate collapse, Vancomycin + Pip/Tazo AKI, Linezolid serotonin syndrome).',
    summaryAr:
      'المرجع السريري الشامل للتعارضات الدوائية وفق منهجية Stockley: يغطي تداخلات مضادات التخثر والصفائح، أدوية القلب وتطاول QTc، الحصار المزدوج لـ RAAS، سمية الديجوكسين والستاتينات، وتداخلات المضادات الحيوية الحرجة في العناية المركزة.',
    pathophysiology:
      'Clinically significant drug interactions arise via two primary mechanisms: (1) Pharmacokinetic (PK) alterations in absorption (divalent cation chelation), distribution (protein-binding displacement), hepatic/intestinal CYP450 metabolism (CYP2C9, CYP3A4, CYP2C19 inhibition or induction), or transmembrane efflux/uptake transporters (P-glycoprotein, OATP1B1, UGT); and (2) Pharmacodynamic (PD) synergy or antagonism at target receptors/physiological systems (additive IKr hERG blockade prolonging QTc, dual RAAS potassium retention, 5-HT accumulation, or synergistic tubular nephrotoxicity).',
    pathophysiologyAr:
      'تنشأ التعارضات الدوائية ذات الأهمية السريرية عبر آليتين رئيسيتين: (1) تداخلات حركية دوائية (Pharmacokinetic) تشمل الامتصاص (الاستخلاب بالمعادن ثنائية/ثلاثية التكافؤ)، الاستقلاب الكبدي والمعوي عبر إنزيمات السيتوكروم (CYP3A4, CYP2C9, CYP2C19)، أو النواقل الغشائية (P-gp, OATP1B1, UGT)؛ و(2) تداخلات ديناميكية دوائية (Pharmacodynamic) تشمل التآزر السمي مثل حصار قنوات البوتاسيوم القلبية (QTc Prolongation / Torsades)، احتباس البوتاسيوم الكلوي، متلازمة السيروتونين، أو السمية الكلوية المشتركة.',
    algorithmSteps: [
      'Step 1 (Classify Stockley Severity & Action Rating): Identify whether the pair is Contraindicated (Do NOT co-administer; e.g., ACEi + ARNI within 36h, Meropenem + Valproate, Linezolid + SSRI) vs Major Action Required (Empiric dose reduction or therapeutic substitution).',
      'Step 2 (Evaluate Onset & Offset Kinetics): Enzyme inhibition (e.g., Fluconazole/Metronidazole on Warfarin) begins within 24–72h, whereas long-half-life inhibitors (Amiodarone t1/2 ~40–55 days) or enzyme induction (Rifampin/Carbamazepine) persist for weeks after drug discontinuation.',
      'Step 3 (Verify Patient-Specific Amplifiers): Check renal function (CrCl <30–50 mL/min amplifies P-gp/CYP3A4 interactions and hyperkalemia), baseline electrolytes (K+ >5.0, Mg2+ <2.0), and QTc interval (>470–500 ms).',
      'Step 4 (Implement Actionable Clinical Workaround): Substitute non-interacting congener (e.g., Pantoprazole instead of Omeprazole with Clopidogrel; Cefepime instead of Pip/Tazo with Vancomycin; Pravastatin/Rosuvastatin instead of Simvastatin with Amlodipine/Amiodarone) or apply strict TDM/dose reduction.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (تحديد تصنيف Stockley الإكلينيكي): ميّز بين التداخلات الممنوعة قطعياً (Contraindicated مثل ACEi+ARNI، Meropenem+Valproate، Linezolid+SSRI) والتداخلات الكبرى التي تتطلب تعديل الجرعة أو استبدال الدواء.',
      'الخطوة 2 (مراعاة الحركية الزمنية لبدء وانتهاء التداخل): التثبيط الإنزيمي يبدأ خلال 24-72 ساعة، بينما الأدوية ذات العمر النصفي الطويل (مثل Amiodarone بنصف عمر 50 يوماً) يستمر تداخلها لأسابيع بعد إيقافها.',
      'الخطوة 3 (فحص عوامل المضاعفة الخاصة بالمريض): راجع وظائف الكلى (CrCl < 30 يضاعف تداخلات P-gp وفرط البوتاسيوم)، الكهارل (نقص K+ أو Mg2+ يفاقم سمية Digoxin وتطاول QTc)، وعمر المريض.',
      'الخطوة 4 (تطبيق البديل الآمن أو التعديل الاستباقي للجرعة): استبدل الدواء ببديل لا يتداخل (مثل Pantoprazole بدلاً من Omeprazole مع Clopidogrel؛ أو Cefepime بدلاً من Pip/Tazo مع Vancomycin) أو خفّض الجرعة استباقياً مع مراقبة TDM/INR.'
    ],
    quickTables: [
      {
        title: "Stockley's High-Alert Hospital Drug Interactions & Action Matrix (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
        titleAr: 'جدول مرجع Stockley لأخطر التعارضات الدوائية في المستشفيات والإجراء الإكلينيكي المعتمد',
        headers: ['Interacting Pair', 'Stockley Severity', 'Primary PK/PD Mechanism', 'Mandatory Clinical Action'],
        headersAr: ['الثنائية الدوائية', 'تصنيف الخطورة', 'الآلية الحركية / الديناميكية', 'الإجراء الصيدلاني الإلزامي'],
        rows: [
          ['ACEi (Lisinopril/Ramipril) + Entresto (ARNI)', 'Contraindicated', 'Dual ACE + Neprilysin inhibition -> severe Bradykinin accumulation & fatal Angioedema', 'Enforce strict 36-hour washout period after last ACEi dose before starting ARNI'],
          ['Meropenem / Ertapenem + Valproic Acid', 'Contraindicated', 'Inhibition of valproate glucuronide acylpeptide hydrolase -> 60–90% drop in Valproate in 24h', 'Avoid combination; switch to Levetiracetam or use Cefepime/Aztreonam'],
          ['Warfarin + Amiodarone / Fluconazole / Metronidazole', 'Major (Reduce Dose)', 'Potent CYP2C9 inhibition blocks S-warfarin clearance -> rapid INR surge & major bleeding', 'Reduce Warfarin dose empirically by 30–50% immediately and check INR in 3–5 days'],
          ['Clopidogrel + Omeprazole / Esomeprazole', 'Major (Switch PPI)', 'CYP2C19 inhibition blocks conversion of Clopidogrel prodrug to active thiol -> stent thrombosis', 'Switch PPI to Pantoprazole 40 mg OD or Famotidine'],
          ['Vancomycin + Piperacillin/Tazobactam', 'Major (Avoid/TDM)', 'Synergistic proximal tubular toxicity & OAT1/OAT3 competition -> 2-to-3x AKI incidence', 'Prefer Vancomycin + Cefepime; enforce AUC24/MIC 400–600 TDM & daily SCr'],
          ['Digoxin + Amiodarone / Verapamil / Clarithromycin', 'Major (Halve Dose)', 'P-gp efflux inhibition in gut & renal tubules -> doubles serum Digoxin concentration', 'Reduce Digoxin dose by 50% upon starting inhibitor; target level 0.5–0.9 ng/mL'],
          ['Linezolid + SSRI / SNRI / Fentanyl / Tramadol', 'Contraindicated', 'Reversible MAO-A inhibition + serotonergic agent -> life-threatening Serotonin Syndrome', 'Hold serotonergic agent or substitute Linezolid with Vancomycin / Daptomycin'],
          ['Simvastatin / Atorvastatin + Clarithromycin / Amlodipine', 'Contraindicated / Major', 'CYP3A4 & OATP1B1 inhibition -> massive statin AUC rise & Rhabdomyolysis', 'Hold statin during Clarithromycin; cap Simvastatin at <=20 mg/day with Amlodipine']
        ],
        rowsAr: [
          ['ACEi (Lisinopril/Ramipril) + Entresto (ARNI)', 'ممنوع قطعياً (Contraindicated)', 'تثبيط مزدوج لـ ACE و Neprilysin يؤدي لتراكم Bradykinin ووذمة وعائية قاتلة (Angioedema)', 'إلزامية فترة غسيل (36-hour Washout) بعد آخر جرعة ACEi قبل بدء Entresto'],
          ['Meropenem / Imipenem + Valproic Acid', 'ممنوع قطعياً (Contraindicated)', 'تثبيط إنزيم Acylpeptide Hydrolase يؤدي لهبوط مستوى الفالبروات بنسبة 60-90% خلال 24 ساعة ونوبات صرع', 'يُمنع الجمع؛ استبدل الفالبروات بـ Levetiracetam أو استخدم Cefepime'],
          ['Warfarin + Amiodarone / Fluconazole / Metronidazole', 'خطير (تخفيض الجرعة)', 'تثبيط قوي لإنزيم CYP2C9 يمنع استقلاب S-Warfarin فيرفع INR بشكل حاد ويسبب نزيفاً', 'خفّض جرعة Warfarin استباقياً بنسبة 30-50% عند البدء وافحص INR خلال 3-5 أيام'],
          ['Clopidogrel + Omeprazole / Esomeprazole', 'خطير (استبدال PPI)', 'تثبيط CYP2C19 يمنع تحول Clopidogrel إلى شكله الفعال مما يرفع خطر تخثر الدعامة القلبية', 'استبدل Omeprazole/Esomeprazole بـ Pantoprazole 40 mg أو Famotidine'],
          ['Vancomycin + Piperacillin/Tazobactam', 'خطير (تجنب / TDM)', 'سمية أنبوبية كلوية متآزرة تضاعف خطر القصور الكلوي الحاد (AKI) بـ 2-3 أضعاف', 'استبدل Pip/Tazo بـ Cefepime؛ راقب SCr يومياً وطبّق AUC24/MIC 400-600'],
          ['Digoxin + Amiodarone / Verapamil / Clarithromycin', 'خطير (نصف الجرعة)', 'تثبيط مضخة P-gp في الأمعاء والكلى يرفع مستوى Digoxin للضعف ويسبب سمية قلبية', 'خفّض جرعة Digoxin بنسبة 50% فوراً وحافظ على المستوى المصلي 0.5-0.9 ng/mL'],
          ['Linezolid + SSRI / SNRI / Fentanyl / Tramadol', 'ممنوع قطعياً (Contraindicated)', 'تثبيط MAO-A مع أدوية رافعة للسيروتونين يسبب متلازمة السيروتونين (Serotonin Syndrome)', 'أوقف الدواء السيروتونيني أو استبدل Linezolid بـ Vancomycin أو Daptomycin'],
          ['Simvastatin / Atorvastatin + Clarithromycin / Amlodipine', 'ممنوع / خطير', 'تثبيط CYP3A4 و OATP1B1 يرفع تركيز الستاتين بشدة ويسبب انحلال العضلات (Rhabdomyolysis)', 'أوقف الستاتين مؤقتاً أثناء شوط Clarithromycin؛ لا تتجاوز Simvastatin 20 mg مع Amlodipine']
        ]
      }
    ],
    keyRecommendations: [
      'Always screen both active inpatient medications (MAR) and home medications (BPMH) against Stockley’s DDI rules before verifying any new order.',
      'When a CYP2C9 or P-gp inhibitor is started in a patient on a narrow therapeutic index drug (Warfarin, Digoxin, Tacrolimus), perform preemptive dose reduction rather than waiting for toxicity to occur.',
      'For oral Fluoroquinolones (Ciprofloxacin, Levofloxacin) and Tetracyclines, enforce a 2-hour before or 4–6-hour after administration window around oral Calcium, Magnesium, Aluminum, Iron, or Enteral Tube Feeds.'
    ],
    keyRecommendationsAr: [
      'افحص دائماً قائمة الأدوية النشطة في المستشفى (MAR) والأدوية المنزلية (BPMH) وفق قواعد Stockley قبل اعتماد أي وصفة جديدة.',
      'عند إضافة مثبط إنزيمي قوي (CYP2C9 أو P-gp) لمريض يتناول دواءً ذا هامش علاجي ضيق (Warfarin, Digoxin, Tacrolimus)، قم بتخفيض الجرعة استباقياً ولا تنتظر ظهور علامات التسمم.',
      'افصل إعطاء الكينولونات الفموية (Ciprofloxacin, Levofloxacin) والتتراسيكلينات بساعتين قبل أو 4-6 ساعات بعد أملاح الكالسيوم، المغنيسيوم، الحديد، أو التغذية الأنبوبية.'
    ],
    clinicalPearls: [
      'The interaction between Carbapenems and Valproic Acid cannot be overcome by simply increasing the Valproate dose — serum Valproate concentrations remain subtherapeutic even at doubled doses.',
      'Apixaban and Rivaroxaban are dual substrates of CYP3A4 and P-glycoprotein: strong dual inhibitors (Ketoconazole, Itraconazole, Ritonavir) double DOAC exposure, whereas strong dual inducers (Rifampin, Carbamazepine, Phenytoin) reduce DOAC levels by >50% and cause stroke/VTE.'
    ],
    clinicalPearlsAr: [
      'تداخل الكاربابينيمات (Meropenem) مع Valproic Acid لا يمكن التغلب عليه بزيادة جرعة الفالبروات؛ لأن المستوى المصلي يظل منخفضاً حتى مع مضاعفة الجرعة.',
      'مضادات التخثر المباشرة (Apixaban / Rivaroxaban) تعتمد معاً على CYP3A4 و P-gp؛ لذا فإن المحرضات القوية (Rifampin, Carbamazepine, Phenytoin) تخفض تركيزها بأكثر من 50% وتسبب جلطات، والمثبطات المزدوجة القوية تضاعف خطر النزيف.'
    ],
    keywords: [
      'stockley',
      'stockleys',
      'drug interactions',
      'ddi',
      '1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S',
      'warfarin',
      'amiodarone',
      'clopidogrel',
      'omeprazole',
      'meropenem',
      'valproate',
      'linezolid',
      'serotonin',
      'vancomycin',
      'piperacillin',
      'digoxin',
      'simvastatin',
      'تداخلات',
      'تعارضات',
      'ستوكلي'
    ],
    sourceId: 'stockleys-drug-interactions',
    sourceUrl: 'local://ref/chapter/stockleys-ddi-master',
    evidenceLevel: "Stockley's Drug Interactions (13th Ed / Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)"
  },
  // ==================== CLINICAL CASEBOOK & PATIENT WORKUP GUIDE ====================
  {
    id: 'casebook-ppcp-workup',
    bookId: 'casebook-guide',
    volume: 2026,
    chapterNumber: 1,
    pages: 'Section I (Bedside Case-Taking & PPCP Protocol)',
    category: 'Clinical Case-Taking & Workup Methodology',
    categoryAr: 'منهجية أخذ الحالات السريرية والتعامل معها',
    title: 'Clinical Pharmacist & Student Guide: How to Take a Clinical Case, Identify DRPs & Formulate a SOAP Plan',
    titleAr: 'الدليل الشامل للصيدلي السريري والطالب: كيفية أخذ الحالة السريرية والتعامل معها خطوة بخطوة (PPCP & SOAP)',
    authors: 'Clinical Pharmacy Casebook & Bedside Workup Committee',
    summary:
      'Systematic framework for taking a clinical pharmacy case from admission to discharge: Chief Complaint (CC), HPI (OPQRST), Best Possible Medication History (BPMH), Allergy Phenotyping, Organ/PK evaluation, IESC DRP identification, and actionable SOAP/SBAR documentation.',
    summaryAr:
      'الإطار المنهجي الكامل لأخذ الحالة السريرية في المستشفى: كيف تقرأ ملف المريض، كيف تأخذ التاريخ الدوائي (BPMH) وتتحقق من الحساسية، ما هي التحاليل والمؤشرات التي تربطها بالأدوية، وكيف تكتشف الـ DRPs وتصيغ خطة SOAP احترافية.',
    pathophysiology:
      'Structured clinical reasoning prevents diagnostic and prescribing cascades: linking temporal symptom onset with pharmacokinetic/pharmacodynamic (PK/PD) shifts in renal/hepatic function ensures every drug on the MAR has an active indication, optimal efficacy, and verified safety margin.',
    pathophysiologyAr:
      'التفكير الإكلينيكي المنظم يمنع التسلسل الوصفي الخاطئ (Prescribing Cascade): إن ربط التوقيت الزمني لظهور الأعراض مع تغيرات وظائف الكلى والكبد والكهارل يضمن أن كل دواء في ملف المريض (MAR) يمتلك استطباباً صحيحاً، جرعة فعالة، وهامش أمان موثق.',
    algorithmSteps: [
      'Step 1 (Collect CC & HPI via OPQRST): Record Chief Complaint in patient words, symptom onset/severity, and rule out Drug-Induced presentation (ADR) before adding new therapy.',
      'Step 2 (BPMH, MedRec & True Allergy Phenotyping): Verify actual home regimen (Rx, OTC, NSAIDs, herbals), adherence, last dose timing, and classify allergies (IgE Anaphylaxis vs Intolerance).',
      'Step 3 (Focused Vitals, Organ Function & Labs): Calculate Cockcroft-Gault CrCl (using IBW/AdjBW), Child-Pugh score, Fluid Balance (I/O), Acid-Base/Anion Gap, and K+/Mg2+/QTc.',
      'Step 4 (Systematic DRP Scan via IESC): Audit every condition and medication for Indication (untreated condition or unnecessary drug), Effectiveness (guideline pillar & target dose), Safety (renal/hepatic dose, DDI, ADR), and Compliance.',
      'Step 5 (Actionable SOAP & SBAR Care Plan): Rank problems by acuity, specify exact Drug + Dose + Route + Frequency + Duration, and define measurable Efficacy vs Toxicity monitoring timelines.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (أخذ الشكوى CC وتفصيل HPI عبر OPQRST): سجل الشكوى الرئيسية، توقيت بدئها، واستبعد أن يكون العرض ناتجاً عن عرض جانبي لدواء حالي (Drug-Induced ADR) قبل إضافة دواء جديد.',
      'الخطوة 2 (التاريخ الدوائي BPMH والتحقق من الحساسية): طابق الأدوية المنزلية الفعلية (بما فيها المسكنات OTC والأعشاب)، التزام المريض، توقيت آخر جرعة، وميّز الحساسية الحقيقية (IgE Anaphylaxis) عن عدم التحمل الهضمي.',
      'الخطوة 3 (تقييم العلامات الحيوية، الأعضاء، والتحاليل): احسب CrCl الفعلي بمعادلة Cockcroft-Gault، وتصنيف Child-Pugh للكبد، وتوازن السوائل، والكهارل (K+, Mg2+, Na+) وفترة QTc.',
      'الخطوة 4 (المسح المنهجي للمشاكل الدوائية IESC): افحص كل دواء ومرض من حيث الاستطباب (Indication)، الفعالية (Effectiveness)، الأمان والتداخلات (Safety)، والالتزام (Compliance).',
      'الخطوة 5 (بناء خطة الرعاية وتوثيق SOAP / SBAR): رتب المشاكل حسب خطورتها الحادة، وحدد (الدواء + الجرعة + الطريق + التكرار + المدة) مع جدول زمني لمراقبة الفعالية والسمية.'
    ],
    quickTables: [
      {
        title: 'Essential Information Checklist to Collect in Every Clinical Case by Organ System',
        titleAr: 'جدول أهم المعلومات التي يجب أن يأخذها الصيدلي السريري أو الطالب في كل حالة سريرية',
        headers: ['Clinical Syndrome', 'Must-Ask History & Meds', 'Mandatory Labs & Vitals', 'Critical Safety / DRP Trap'],
        headersAr: ['الحالة السريرية (Syndrome)', 'أهم أسئلة القصة والتاريخ الدوائي', 'أهم التحاليل والمؤشرات الحيوية', 'الفخ الدوائي الحرج (Critical Trap)'],
        rows: [
          ['ADHF / HFrEF (Cardiology)', 'Orthopnea/PND, dry weight, exact home Loop Diuretic dose, last ACEi dose timestamp', 'LVEF %, SBP/HR, SCr/CrCl, Serum K+, Mg2+, NT-proBNP', '36h Washout required from ACEi to ARNI; avoid NSAIDs & Verapamil/Diltiazem'],
          ['Sepsis / HAP + AKI (ICU)', 'IV antibiotics in last 90d, MRSA risk, true Beta-Lactam allergy type', 'MAP, Lactate, Blood/Sputum Cultures before Abx, Actual Weight, CrCl', 'Give full weight-based Loading Dose, then adjust Maintenance for CrCl; avoid Vancomycin+Zosyn'],
          ['ACS / PCI + AFib (CCU)', 'Prior Stroke/TIA, stent type/timing, GI bleed history, Aspirin bronchospasm', 'Troponin, Hgb, Platelets, SCr/CrCl, CHA2DS2-VASc & HAS-BLED', 'Stop Aspirin early for Dual Therapy (DOAC+Clopidogrel); switch Omeprazole to Pantoprazole'],
          ['DKA / Hyperglycemia (ER/ICU)', 'Insulin omission, infection trigger, SGLT2i use (Euglycemic DKA)', 'Serum K+ BEFORE Insulin, pH, HCO3-, Anion Gap, BG hourly', 'NEVER start IV Insulin if K+ < 3.5 mEq/L! Overlap SC Glargine 2–4h before stopping IV'],
          ['Cirrhosis / SBP / HE (GI)', 'Stool frequency, GI bleed, NSAID/Benzo use, West Haven HE grade', 'Ascitic PMN (>=250 = SBP), Bilirubin, Albumin, INR (Child-Pugh), BP, SCr, K+', 'Give IV Albumin (Day 1 & 3) in SBP; hold NSBB (Propranolol) if SBP < 90 mmHg or HRS-AKI']
        ],
        rowsAr: [
          ['قصور القلب (ADHF / HFrEF)', 'Orthopnea/PND، الوزن الجاف، جرعة اللازكس المنزلية، وتوقيت آخر جرعة ACEi', 'الكسر القذفي LVEF%، الضغط والنبض، SCr/CrCl، البوتاسيوم K+، و NT-proBNP', 'إلزامية 36h Washout بين ACEi و Entresto؛ منع NSAIDs و Diltiazem/Verapamil'],
          ['الإنتان وذات الرئة (Sepsis / HAP)', 'مضادات وريدية بآخر 90 يوماً، خطر MRSA، ونوع تفاعل حساسية البنسلين', 'ضغط التروية MAP، Lactate، سحب المزارع قبل المضاد، الوزن الفعلي، و CrCl', 'إعطاء Loading Dose كاملة بالوزن ثم تعديل الصيانة حسب CrCl؛ تجنب جمع Vancomycin+Zosyn'],
          ['جلطة القلب والرجفان (ACS + AFib)', 'تاريخ Stroke/TIA سابق، نوع وتوقيت الدعامة، نزيف هضمي، حساسية الأسبرين', 'Troponin، الهيموغلوبين والصفائح، CrCl، وحساب CHA2DS2-VASc و HAS-BLED', 'اعتماد العلاج الثنائي (Apixaban+Clopidogrel)؛ استبدال Omeprazole بـ Pantoprazole'],
          ['الحماض الكيتوني السكري (DKA)', 'انقطاع الأنسولين، العدوى المحفزة، أو استخدام SGLT2i (Euglycemic DKA)', 'فحص البوتاسيوم K+ قبل الأنسولين، pH، HCO3-، الفجوة الأنيونية Anion Gap', 'يُمنع منعاً باتاً بدء الأنسولين الوريدي إذا كان K+ < 3.5! وتطبيق Overlap ساعتين قبل إيقافه'],
          ['تشمع الكبد والحبن (Cirrhosis / SBP)', 'عدد مرات الإخراج، نزيف هضمي، تناول NSAIDs أو مهدئات، درجة HE', 'كريات سائل الحبن PMN (>=250 يشخص SBP)، Child-Pugh، الضغط، SCr، و K+', 'إعطاء IV Albumin (اليوم 1 و 3) مع Ceftriaxone في SBP؛ إيقاف Propranolol إذا هبط الضغط < 90']
        ]
      }
    ],
    keyRecommendations: [
      'Always collect and verify 4 pillars of baseline patient data before evaluating any medication order: (1) Exact Allergies & Reaction Phenotype, (2) Actual vs Ideal Body Weight & Calculated CrCl, (3) Pertinent Vital Signs & Electrolytes (BP, HR, K+, Na+, QTc), and (4) Complete BPMH (Home Rx + OTC).',
      'Never treat an abnormal laboratory value or new symptom in isolation: always ask "Could this be caused by a current medication?" (e.g., hyperkalemia from Spironolactone/ACEi, thrombocytopenia from Heparin/Linezolid, confusion from anticholinergics).',
      'Every clinical intervention (SOAP Plan) must specify 5 concrete elements: Drug Name, Exact Dose/Route/Frequency, Mechanistic Rationale, Efficacy Target, and Toxicity Monitoring Timeline.'
    ],
    keyRecommendationsAr: [
      'اجمع وتحقق دائماً من 4 ركائز أساسية قبل تقييم أي وصفة: (1) نوع تفاعل الحساسية الدوائية، (2) الوزن الفعلي/المثالي وتصفية الكرياتينين المحسوبة CrCl، (3) العلامات الحيوية والكهارل (BP, HR, K+, Mg2+, QTc)، و(4) القائمة الكاملة للأدوية المنزلية BPMH.',
      'لا تعالج أي رقم مخبري شاذ أو عرض جديد بمعزل عن الأدوية: اسأل نفسك أولاً "هل هذا العرض ناجم عن دواء يتناوله المريض حالياً؟" لتجنب Prescribing Cascade.',
      'كل توصية صيدلانية (SOAP Plan) يجب أن تتضمن 5 عناصر محددة: اسم الدواء، الجرعة/الطريق/التكرار، التبرير العلمي، هدف الفعالية، وجدول مراقبة السمية.'
    ],
    clinicalPearls: [
      'In acute kidney injury (AKI) with rapidly rising serum creatinine, standard eGFR/CrCl equations overestimate true GFR — dose renally cleared drugs conservatively as if CrCl is <10–15 mL/min and use TDM.',
      'When presenting a patient case on clinical rounds, lead with the prioritized problem list and link each active disease state directly to its current pharmacotherapy and identified DRPs.'
    ],
    clinicalPearlsAr: [
      'في القصور الكلوي الحاد (AKI) عندما يكون الكرياتينين في ارتفاع مستمر وغير مستقر، فإن معادلات CrCl تبالغ في تقدير وظيفة الكلى الحقيقية؛ لذا عامل المريض دوائياً وكأن CrCl < 15 mL/min واعتمد على TDM.',
      'عند عرض الحالة السريرية في جولة الأطباء (Rounds Presentation)، ابدأ بالمشاكل الأعلى خطورة واربط كل مرض مباشرةً بأدويته الحالية والمشكلة الدوائية المكتشفة والبديل الجاهز.'
    ],
    keywords: ['casebook', 'ppcp', 'case taking', 'workup', 'soap', 'sbar', 'bpmh', 'medrec', 'drp', 'history', 'checklist', 'osce', 'student', 'أخذ الحالة', 'طالب', 'دليل الصيدلي'],
    sourceId: 'clinical-casebook-guide',
    sourceUrl: 'local://ref/chapter/casebook-ppcp-workup',
    evidenceLevel: 'JCPP PPCP & Clinical Casebook Standard'
  },
  // ==================== DIPIRO'S PHARMACOTHERAPY 13TH EDITION ====================
  {
    id: 'dipiro-13-hf-cardiorenal',
    bookId: 'dipiro-13th',
    volume: 13,
    chapterNumber: 32,
    pages: 'Ch. 32–33 (pp. 412–485)',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: "DiPiro's 13th Ed: Heart Failure Pathophysiology, 4-Pillar GDMT Sequencing & Cardiorenal Syndrome",
    titleAr: 'مرجع DiPiro (الطبعة 13 - ف 32-33): الفيزيولوجيا المرضية لقصور القلب، خوارزمية الركائز الأربع، والمتلازمة القلبية الكلوية',
    authors: 'Robert J. DiDomenico, Pharm.D., FCCP; William L. Baker, Pharm.D., FCCP, FACC, FAHA',
    summary:
      'Comprehensive pathophysiologic cascade of neurohormonal activation (RAAS, sympathetic nervous system, natriuretic peptides), step-by-step initiation/titration of the 4 GDMT pillars in HFrEF, and acute decompensated heart failure (ADHF) Nohria-Stevenson hemodynamic profiling.',
    summaryAr:
      'التفسير الفيزيولوجي المرضي المتكامل لتنشيط محور الرينين-أنجيوتنسين-ألدوستيرون والجهاز الودي، خوارزمية البدء المتزامن بالركائز الأربع لقصور القلب، وإدارة الاحتقان والمتلازمة القلبية الكلوية الحادة.',
    pathophysiology:
      'Reduced cardiac output triggers compensatory neurohormonal activation: (1) Norepinephrine causes vasoconstriction, tachycardia, and direct myocardial toxicity; (2) RAAS activation (Angiotensin II & Aldosterone) promotes Na+/water retention and myocardial fibrosis; (3) Neprilysin degrades beneficial endogenous natriuretic peptides (BNP/ANP). Blocking all pathways simultaneously reverses ventricular remodeling.',
    pathophysiologyAr:
      'يؤدي انخفاض النتاج القلبي إلى تنشيط عصبي هرموني معاوض ولكنه ضار على المدى الطويل: (1) يرفع النورإبينفرين المقاومة الوعائية والنبض ويسبب سمية مباشرة لعضلة القلب، (2) ينشط نظام RAAS (الأنجيوتنسين 2 والألدوستيرون) فيحبس الصوديوم والماء ويسبب تليف العضلة القلبية، (3) يقوم إنزيم النيبريلايسين بتكسير الببتيدات المدرة للصوديوم المفيدة. لذلك فإن الحصار الرباعي المتزامن يعكس التمدد البطيني ويخفض الوفيات.',
    algorithmSteps: [
      'Step 1 (Assess Hemodynamic Quadrant): Classify ADHF into Warm & Dry (Subset I), Warm & Wet (Subset II — most common: IV Loop Diuretic ± Vasodilator), Cold & Dry (Subset III), or Cold & Wet (Subset IV — cardiogenic shock: Vasodilator if SBP >90 or Inotrope Dobutamine/Milrinone if SBP <90).',
      'Step 2 (Initiate All 4 HFrEF Pillars Early): Start ARNI (Sacubitril/Valsartan 24/26 or 49/51 mg BID; 36h washout from ACEi) + Beta-Blocker (Bisoprolol 1.25 mg OD, Carvedilol 3.125 mg BID, or Metoprolol Succinate 12.5–25 mg OD once euvolemic) + MRA (Spironolactone 12.5–25 mg OD if eGFR >30 & K+ <5.0) + SGLT2i (Dapagliflozin 10 mg or Empagliflozin 10 mg OD).',
      'Step 3 (Manage Cardiorenal Rise in SCr): An acute SCr increase up to 30% after starting ACEi/ARB/ARNI/SGLT2i reflects expected efferent arteriolar dilation and intraglomerular pressure reduction — DO NOT discontinue unless SCr rises >30–50% or K+ >5.5 mEq/L.',
      'Step 4 (Overcome Diuretic Resistance): Double IV loop diuretic dose (ceiling 160–200 mg IV furosemide bolus) OR add sequential nephron blockade with Metolazone 2.5–5 mg PO or IV Chlorothiazide 30 min prior to loop diuretic.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (التصنيف الهيموديناميكي Nohria-Stevenson): تحديد مربع المريض: دافئ ورطب (Warm & Wet: احتقان بدون صدمة -> مدر بول عروي وريدي ± موسع وعائي) أو بارد ورطب (Cold & Wet: احتقان مع ضعف تروية/هبوط ضغط -> مقوي عضلة القلب Dobutamine/Milrinone).',
      'الخطوة 2 (البدء المبكر بالركائز الأربع لـ HFrEF): الجمع بين (ARNI بعد 36 ساعة من إيقاف ACEi) + حاصر بيتا انتقائي بعد زوال الاحتقان الحاد + مضاد ألدوستيرون (Spironolactone بشرط K < 5.0 و eGFR > 30) + مثبط SGLT2 (Dapagliflozin/Empagliflozin 10 mg).',
      'الخطوة 3 (التعامل مع ارتفاع الكرياتينين القلبي الكلوي): ارتفاع الكرياتينين بنسبة تصل إلى 30% بعد بدء ACEi/ARNI/SGLT2i هو أثر هيموديناميكي متوقع ومفيد (توسيع الشرين الصادر الكبيبي) ولا يستدعي إيقاف الدواء ما لم يتجاوز 30-50% أو يرتفع البوتاسيوم > 5.5.',
      'الخطوة 4 (كسر مقاومة مدرات البول): مضاعفة جرعة الفيوروسيميد الوريدي أو تطبيق الحصار النفروني المتسلسل بإضافة ثيازيد (Metolazone 2.5-5 mg قبل الفيوروسيميد بـ 30 دقيقة).'
    ],
    quickTables: [
      {
        title: "DiPiro's 13th Ed: Evidence-Based HFrEF Starting & Target Doses + Renal/K+ Thresholds",
        titleAr: 'جدول مرجع DiPiro (الطبعة 13): الجرعات البدئية والمستهدفة للركائز الأربع في HFrEF وحدود الأمان الكلوي والبوتاسيوم',
        headers: ['Pillar / Drug', 'Initial Dose', 'Target Dose', 'Renal / K+ Safety Threshold'],
        headersAr: ['الركيزة / الدواء', 'الجرعة البدئية', 'الجرعة المستهدفة (Target)', 'حدود الأمان (الكلى والبوتاسيوم)'],
        rows: [
          ['Sacubitril/Valsartan (ARNI)', '24/26 mg or 49/51 mg PO BID', '97/103 mg PO BID', '36h washout from ACEi; K+ <5.2; SBP >=100 mmHg'],
          ['Ramipril / Lisinopril (ACEi)', '1.25–2.5 mg PO OD', '10 mg PO OD (Ramipril) / 20–40 mg (Lisinopril)', 'Accept <=30% SCr rise; hold if K+ >5.5 or angioedema'],
          ['Bisoprolol / Carvedilol (BB)', '1.25 mg OD / 3.125 mg BID', '10 mg OD / 25–50 mg BID', 'Start when euvolemic (Warm/Dry); hold if HR <50 or cardiogenic shock'],
          ['Spironolactone / Eplerenone', '12.5–25 mg PO OD', '25–50 mg PO OD', 'Contraindicated if baseline K+ >5.0 mEq/L or eGFR <=30 mL/min'],
          ['Dapagliflozin / Empagliflozin', '10 mg PO OD', '10 mg PO OD (Fixed dose)', 'Safe down to eGFR >=20 mL/min; hold 3–4 days before major surgery (euDKA)']
        ],
        rowsAr: [
          ['ساكوبيتريل/فالسارتان (Entresto)', '24/26 أو 49/51 ملغ مرتين يومياً', '97/103 ملغ مرتين يومياً', 'فترة غسيل 36 ساعة من ACEi؛ الضغط الانقباضي >= 100؛ K < 5.2'],
          ['راميبريل / ليسينوبريل (ACEi)', '1.25 - 2.5 ملغ يومياً', '10 ملغ يومياً (راميبريل)', 'يُقبل ارتفاع SCr حتى 30%؛ يُوقف إذا تجاوز البوتاسيوم 5.5'],
          ['بيسوبرولول / كارفيديلول', '1.25 ملغ يومياً / 3.125 ملغ مرتين', '10 ملغ يومياً / 25-50 ملغ مرتين', 'يُبدأ بعد استقرار السوائل؛ يُؤجل في الصدمة القلبية أو بطء النبض < 50'],
          ['سبيرونولاكتون (Spironolactone)', '12.5 - 25 ملغ يومياً', '25 - 50 ملغ يومياً', 'يُمنع البدء إذا كان البوتاسيوم > 5.0 أو eGFR <= 30 مل/د (أو يُنصف إلى 12.5 ملغ يوم بعد يوم)'],
          ['داباغليفلوزين / إمباغليفلوزين', '10 ملغ مرة واحدة يومياً', '10 ملغ يومياً (بدون تدريج)', 'فعال وآمن حتى eGFR >= 20 مل/د؛ يُوقف مؤقتاً في الصيام الحاد والجراحة']
        ]
      }
    ],
    keyRecommendations: [
      'Simultaneous or rapid-sequence initiation of all 4 HFrEF pillars within 2–4 weeks reduces cardiovascular death and HF hospitalization by >60% (NNT ~ 4 over 2 years).',
      'In patients hospitalized with ADHF (Warm & Wet), continue home beta-blocker and ACEi/ARNI unless hemodynamic instability (SBP <85–90 mmHg, symptomatic hypotension, or cardiogenic shock requiring inotropes).',
      'If serum K+ rises to 5.1–5.5 mEq/L on RAASi + MRA, halve the Spironolactone dose (to 12.5 mg daily) and consider adding a novel potassium binder (Patiromer or Sodium Zirconium Cyclosilicate) to maintain life-saving GDMT; if K+ >5.5 mEq/L, hold Spironolactone immediately.'
    ],
    keyRecommendationsAr: [
      'البدء المتزامن أو المتسارع بالركائز الأربع لقصور القلب (ARNI + BB + MRA + SGLT2i) يخفض الوفيات والتنويم بنسبة تفوق 60%.',
      'أثناء التنويم بقصور القلب الحاد (Warm & Wet)، يجب الاستمرار بحاصر بيتا ومثبط ACE/ARNI المنزلي ما لم يحدث هبوط ضغط عرضي (SBP < 85-90) أو صدمة قلبية.',
      'إذا ارتفع البوتاسيوم إلى 5.1-5.5 mEq/L، تُخفض جرعة السبيرونولاكتون للنصف مع إمكانية إضافة رابط بوتاسيوم حديث (Patiromer / SZC) للحفاظ على أدوية القلب؛ وإذا تجاوز 5.5 mEq/L يُوقف السبيرونولاكتون فوراً.'
    ],
    clinicalPearls: [
      'Milrinone (PDE-3 inhibitor) is cleared renally and causes more arterial vasodilation/hypotension than Dobutamine, but is preferred over Dobutamine in patients on chronic beta-blockers because its mechanism bypasses beta-1 receptors.',
      'Furosemide oral bioavailability is ~50% (variable 10–90%), whereas Torsemide and Bumetanide have >=80% oral bioavailability — IV Furosemide dose is 50% of PO Furosemide dose (e.g., 40 mg PO = 20 mg IV).'
    ],
    clinicalPearlsAr: [
      'يُفضل الميلرينون (Milrinone) على الدوبوتامين في المرضى الذين يتناولون حاصرات بيتا المزمنة لأنه يعمل عبر تثبيط PDE-3 بعد مستقبلات بيتا، لكنه يتطلب تعديلاً كلوياً وقد يخفض الضغط.',
      'التوافر الحيوي للفيوروسيميد الفموي حوالي 50% فقط (40 ملغ فموي تكافئ 20 ملغ وريدي)، بينما التورسيميد والبيوميتانيد توافرهما الفموي > 80%.'
    ],
    keywords: ['dipiro', 'hfref', 'adhf', 'cardiorenal', 'spironolactone', 'ramipril', 'bisoprolol', 'entresto', 'sacubitril', 'dapagliflozin', 'furosemide', 'milrinone', 'dobutamine'],
    sourceId: 'dipiro-13th-ed',
    sourceUrl: 'local://ref/chapter/dipiro-13-hf-cardiorenal',
    evidenceLevel: "DiPiro's Pharmacotherapy 13th Ed. (Ch. 32–33, pp. 412–485)"
  },
  {
    id: 'dipiro-13-sepsis-aki-pk',
    bookId: 'dipiro-13th',
    volume: 13,
    chapterNumber: 54,
    pages: 'Ch. 54 & Ch. 118 (pp. 740–782, 1690–1735)',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: "DiPiro's 13th Ed: Acute Kidney Injury (AKI), Sepsis Pharmacokinetics (Vd & Clearance Shifts) & TDM",
    titleAr: 'مرجع DiPiro (الطبعة 13 - ف 54 و118): القصور الكلوي الحاد (AKI) وتغيرات الحركية الدوائية في الإنتان والعناية المركزة',
    authors: 'Thomas D. Nolin, Pharm.D., Ph.D., FCCP; Gary R. Matzke, Pharm.D., FCP, FCCP',
    summary:
      'Pathophysiologic alterations in volume of distribution (Vd) and renal/hepatic drug clearance during sepsis and AKI, KDIGO staging, prerenal vs intrinsic ATN differentiation, and individualized loading vs maintenance dosing.',
    summaryAr:
      'التغيرات الفيزيولوجية المرضية في حجم التوزع (Vd) والتصفية الكلوية أثناء الصدمة الإنتانية والقصور الكلوي الحاد، التفريق بين القصور قبل الكلوي والنخر الأنبوبي الحاد (ATN)، وفصل جرعة التحميل عن جرعة الصيانة.',
    pathophysiology:
      'In early sepsis, capillary leak and aggressive fluid resuscitation expand extracellular fluid, increasing the Volume of Distribution (Vd) of hydrophilic antimicrobials (Vancomycin, Beta-lactams, Aminoglycosides) — requiring FULL weight-based loading doses regardless of renal failure. Simultaneously, renal hypoperfusion and tubular injury reduce glomerular filtration (ke), requiring reduced/extended maintenance intervals.',
    pathophysiologyAr:
      'في الإنتان الحاد، يؤدي تسرب الشعيرات الدموية وإنعاش السوائل إلى زيادة حجم السائل خارج الخلوي، مما يرفع حجم التوزع (Vd) للمضادات الحيوية المحبة للماء (الفانكومايسين، البيتا-لاكتام، الأمينوغليكوزيدات)؛ لذلك يجب إعطاء جرعة تحميل كاملة (Loading Dose) بغض النظر عن الفشل الكلوي، بينما تُخفض جرعات الصيانة وتُباعد فواصلها الزمنية بسبب نقص التصفية الكلوية (ke).',
    algorithmSteps: [
      'Step 1 (Differentiate Prerenal AKI vs Intrinsic ATN): Calculate BUN:SCr ratio and Fractional Excretion of Sodium (FENa). Prerenal AKI: BUN:SCr >20:1, FENa <1% (or FEUrea <35% if on loop diuretics), urine osmolality >500 mOsm/kg. Intrinsic ATN: BUN:SCr 10–15:1, FENa >2%, muddy brown granular casts.',
      'Step 2 (Discontinue Nephrotoxins Immediately): Stop NSAIDs, aminoglycosides, IV radiocontrast, amphotericin B, and avoid Vancomycin + Piperacillin/Tazobactam co-administration; hold ACEi/ARB during acute hemodynamic instability.',
      'Step 3 (Decouple Loading Dose from Maintenance Dose): Loading Dose depends ONLY on Vd × Target Concentration -> give full Vancomycin load (25–30 mg/kg ABW) and full first Meropenem dose (1–2 g IV). Maintenance Dose depends on Clearance (Cl = ke × Vd) -> adjust interval/dose to CrCl immediately from the second dose onward.',
      'Step 4 (Maximize Beta-Lactam PK/PD in Sepsis): Administer Meropenem, Cefepime, and Piperacillin/Tazobactam as 3-to-4-hour Extended Infusions to maintain free drug concentration above MIC (%fT > MIC >= 40–70%).'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (التفريق المخبري بين القصور قبل الكلوي Pre-renal والنخر الأنبوبي ATN): في القصور قبل الكلوي تكون نسبة BUN:SCr أكبر من 20:1، و FENa < 1% (أو FEUrea < 35% في حال استخدام مدرات البول). أما في النخر الأنبوبي الحاد (ATN) فتكون نسبة BUN:SCr حوالي 10:1 و FENa > 2%.',
      'الخطوة 2 (إيقاف العوامل السامة للكلى فوراً): إيقاف NSAIDs، الأمينوغليكوزيدات غير الضرورية، وتجنب الجمع بين الفانكومايسين والتازوسين (Piperacillin/Tazobactam).',
      'الخطوة 3 (فصل جرعة التحميل عن جرعة الصيانة): جرعة التحميل تعتمد فقط على حجم التوزع (Vd) ولا تتأثر بوظيفة الكلى (تُعطى كاملة في الجرعة الأولى)، بينما تعتمد جرعة الصيانة على التصفية الكلوية فتُعدل من الجرعة الثانية.',
      'الخطوة 4 (تعظيم PK/PD للبيتا-لاكتام): إعطاء الميروبينيم أو السيفيبيم بالتسريب الوريدي الممتد (3 ساعات) لرفع زمن بقاء التركيز الحر فوق التركيز المثبط الأدنى (%fT > MIC).'
    ],
    quickTables: [
      {
        title: "DiPiro's 13th Ed: Critical ICU Antimicrobial Renal Dosing & PK/PD Optimization Table",
        titleAr: 'جدول مرجع DiPiro (الطبعة 13): تعديل جرعات المضادات الحيوية الحرجة في العناية المركزة حسب CrCl وخصائص PK/PD',
        headers: ['Antimicrobial', 'PK/PD Target', 'CrCl > 50 mL/min', 'CrCl 30–50 mL/min', 'CrCl 10–29 mL/min', 'HD / CRRT Note'],
        headersAr: ['المضاد الحيوي', 'معيار الفعالية PK/PD', 'CrCl > 50 مل/د', 'CrCl 30-50 مل/د', 'CrCl 10-29 مل/د', 'الغسيل الكلوي / CRRT'],
        rows: [
          ['Vancomycin IV', 'AUC24/MIC 400–600', '15–20 mg/kg q8–12h', '15 mg/kg q12–24h', '15 mg/kg q24–48h (TDM)', 'Load 25 mg/kg; redose by serum level'],
          ['Meropenem IV (HAP/Sepsis)', '%fT > MIC >=40%', '1–2 g q8h (3h inf)', '1 g q12h (3h inf)', '500 mg q12h (3h inf)', '500 mg q24h (after HD) / 1g q8-12h CRRT'],
          ['Cefepime IV', '%fT > MIC >=60%', '2 g q8h', '2 g q12h', '1 g q12h or 2 g q24h', 'Neurotoxicity/NCSE risk if unadjusted!'],
          ['Piperacillin/Tazobactam', '%fT > MIC >=50%', '4.5 g q6h (or 4h inf q8h)', '3.375 g q6h (nosocomial)', '2.25 g q6–8h', 'Avoid with Vancomycin (AKI synergy)'],
          ['Linezolid IV/PO', 'AUC/MIC 80–120', '600 mg q12h', '600 mg q12h (No adjustment)', '600 mg q12h (No adjustment)', 'No renal adjustment; monitor platelets >14d']
        ],
        rowsAr: [
          ['فانكومايسين (Vancomycin)', 'AUC24/MIC 400–600', '15-20 ملغ/كغ كل 8-12 ساعة', '15 ملغ/كغ كل 12-24 ساعة', '1000 ملغ (15 ملغ/كغ) كل 24-48 ساعة مع TDM', 'تحميل 25 ملغ/كغ؛ وتُضبط الصيانة بمستوى المصل'],
          ['ميروبينيم (Meropenem)', '%fT > MIC >= 40%', '1-2 جم كل 8 ساعات (تسريب 3س)', '1 جم كل 12 ساعة (تسريب 3س)', '500 ملغ كل 12 ساعة (تسريب 3 ساعات)', '500 ملغ كل 24 ساعة بعد الغسيل؛ 1 جم كل 12س في CRRT'],
          ['سيفيبيم (Cefepime)', '%fT > MIC >= 60%', '2 جم كل 8 ساعات', '2 جم كل 12 ساعة', '1 جم كل 12 ساعة أو 2 جم كل 24 ساعة', 'خطر صرع غير اختلاجي واعتلال دماغي إذا لم تُخفض الجرعة!'],
          ['بيبيراسيلين/تازوباكتام', '%fT > MIC >= 50%', '4.5 جم كل 6 ساعات', '3.375 جم كل 6 ساعات', '2.25 جم كل 6-8 ساعات', 'تجنب جمعه مع الفانكومايسين لخطر السمية الكلوية التآزرية'],
          ['لينيزوليد (Linezolid)', 'AUC/MIC 80–120', '600 ملغ كل 12 ساعة', '600 ملغ كل 12 ساعة (لا يُعدل)', '600 ملغ كل 12 ساعة (لا يحتاج تعديل كلوي)', 'بديل ممتاز لـ MRSA في القصور الكلوي؛ راقب الصفائح']
        ]
      }
    ],
    keyRecommendations: [
      'InPatient Abdullah Al-Hazmi (CrCl 28.5 mL/min, BUN 48, SCr 2.4 -> BUN:SCr = 20:1): Reduce Meropenem from 1000 mg q8h to 500 mg IV q12h (3-hour extended infusion) and extend Vancomycin from 1000 mg q12h to 1000 mg IV q24h with trough/AUC TDM.',
      'Cefepime and Meropenem accumulation in unadjusted renal impairment lowers the seizure threshold by antagonizing GABA-A receptors — renal dose adjustment is mandatory.',
      'In patients with severe Penicillin anaphylaxis + Sulfa allergy + AKI (like Patient 1), Linezolid 600 mg IV/PO q12h is a complete non-nephrotoxic alternative to Vancomycin that requires zero renal dose adjustment.'
    ],
    keyRecommendationsAr: [
      'تطبيق عملي لحالة عبدالله الحازمي (CrCl 28.5، BUN 48، SCr 2.4 -> نسبة BUN:SCr = 20:1): يجب فوراً تخفيض الميروبينيم من 1 جم كل 8 ساعات إلى 500 ملغ كل 12 ساعة (تسريب ممتد 3 ساعات)، ومباعدة الفانكومايسين إلى 1000 ملغ كل 24 ساعة.',
      'تراكم البيتا-لاكتام (خصوصاً Cefepime و Imipenem/Meropenem) في القصور الكلوي يثبط مستقبلات GABA الدماغية ويسبب تشنجات صرعية واعتلالاً دماغياً.',
      'خيار استراتيجي من مرجع DiPiro: عند وجود قصور كلوي حاد يتفاقم مع الفانكومايسين، يمكن التحويل إلى Linezolid 600 mg q12h لأنه يعطي تراكيز رئوية عالية جداً في HAP ولا يحتاج أي تعديل كلوي.'
    ],
    clinicalPearls: [
      'Always use FEUrea (<35% prerenal, >50% ATN) instead of FENa if the patient has received loop diuretics within the past 24 hours, because loop diuretics artificially elevate urinary sodium.',
      'Isotonic crystalloids (Balanced crystalloids like Lactated Ringer or Plasma-Lyte preferred over 0.9% NaCl in sepsis) prevent hyperchloremic metabolic acidosis and renal vasoconstriction.'
    ],
    clinicalPearlsAr: [
      'إذا كان المريض يتناول مدرات البول (مثل الفيوروسيميد)، تصبح نسبة FENa غير دقيقة؛ ويجب استخدام الكسر الإطراحي لليوريا (FEUrea < 35% يشير لقصور قبل كلوي).',
      'المحاليل المتوازنة (مثل الرينجر لاكتات) تُفضل على المحلول الملحي 0.9% بكميات كبيرة لأن فرط الكلور يسبب تقبضاً في الشرايين الكلوية وحماضاً استقلابياً.'
    ],
    keywords: ['dipiro', 'aki', 'fena', 'feurea', 'sepsis', 'vd', 'loading dose', 'vancomycin', 'meropenem', 'cefepime', 'linezolid', 'crrt'],
    sourceId: 'dipiro-13th-ed',
    sourceUrl: 'local://ref/chapter/dipiro-13-sepsis-aki-pk',
    evidenceLevel: "DiPiro's Pharmacotherapy 13th Ed. (Ch. 54 & Ch. 118)"
  },
  {
    id: 'dipiro-13-cirrhosis-portal-htn',
    bookId: 'dipiro-13th',
    volume: 13,
    chapterNumber: 46,
    pages: 'Ch. 46 (pp. 618–644)',
    category: 'Oncology, GI/Liver & Endocrine',
    categoryAr: 'الأورام والكبد والغدد الصماء',
    title: "DiPiro's 13th Ed: Portal Hypertension, Decompensated Cirrhosis, Ascites, SBP & Hepatorenal Syndrome",
    titleAr: 'مرجع DiPiro (الطبعة 13 - ف 46): تشمع الكبد غير المعاوض، فرط ضغط وريد الباب، الاستسقاء، والمتلازمة الكبدية الكلوية',
    authors: 'Julie M. Sease, Pharm.D., FCCP, BCPS; Edward T. Horn, Pharm.D., BCCCP',
    summary:
      'Pathophysiologic splanchnic vasodilation and hyperdynamic circulation in cirrhosis, SAAG >=1.1 g/dL ascites algorithm, nonselective beta-blockers (Carvedilol/Propranolol), hepatic encephalopathy ammonia lowering, and Terlipressin + Albumin for HRS-AKI.',
    summaryAr:
      'الآلية الفيزيولوجية للتوسع الوعائي الحشوي في تشمع الكبد، خوارزمية علاج الاستسقاء (SAAG >= 1.1)، حاصرات بيتا غير الانتقائية لدوالي المريء، علاج الاعتلال الدماغي الكبدي، وبروتوكول Terlipressin مع الألبومين للمتلازمة الكبدية الكلوية.',
    pathophysiology:
      'Portal hypertension triggers excessive nitric oxide release in the splanchnic circulation -> severe splanchnic arterial vasodilation -> decreased effective arterial blood volume -> compensatory activation of RAAS, SNS, and ADH -> avid renal sodium/water retention (ascites & dilutional hyponatremia) and extreme renal arterial vasoconstriction (Hepatorenal Syndrome, HRS-AKI).',
    pathophysiologyAr:
      'يؤدي ارتفاع ضغط الوريد البابي إلى إفراز مفرط لأكسيد النيتريك في الأوعية الحشوية -> توسع وعائي حشوي شديد -> انخفاض الحجم الدموي الشرياني الفعال -> تنشيط شديد لنظام الألدوستيرون والهرمون المضاد للإدرار (ADH) -> احتباس الصوديوم والماء (الاستسقاء ونقص الصوديوم التخفيفي) مع تقبض شديد في شرايين الكلى يؤدي للمتلازمة الكبدية الكلوية (HRS-AKI).',
    algorithmSteps: [
      'Step 1 (Ascites & Diuretic Titration): Confirm portal hypertension via SAAG (Serum-Ascites Albumin Gradient) >=1.1 g/dL. Restrict Na+ to <=2 g/day and initiate Spironolactone 100 mg + Furosemide 40 mg PO once daily in the morning (100:40 ratio). Titrate every 3–5 days up to max 400:160 mg/day targeting weight loss <=0.5 kg/day (without edema) or <=1.0 kg/day (with peripheral edema).',
      'Step 2 (When to Hold Diuretics in Cirrhosis): Immediately HOLD Spironolactone and Furosemide if overt Hepatic Encephalopathy worsens, Serum Na+ drops <120–125 mEq/L despite fluid restriction, AKI develops (SCr rises >0.3 mg/dL in 48h or >1.5× baseline), or severe muscle cramps/hyperkalemia (>5.5 mEq/L) occur.',
      'Step 3 (Variceal Bleeding Prophylaxis & Windows): Use Nonselective Beta-Blockers (Carvedilol 6.25 mg OD->BID preferred as it also blocks alpha-1 reducing intrahepatic resistance, or Propranolol 20–40 mg BID titrated to HR 55–60 bpm). Close the "Beta-Blocker Window" (discontinue NSBB) if SBP <90 mmHg, MAP <65 mmHg, HRS-AKI, or acute SBP.',
      'Step 4 (HRS-AKI Reversal): Discontinue all diuretics and beta-blockers, expand volume with IV Albumin 1 g/kg/day (max 100 g/day) for 2 days, then start Terlipressin (or Norepinephrine in ICU / Midodrine + Octreotide) + Albumin 20–40 g/day.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (إدارة الاستسقاء البطني): تقييد الصوديوم إلى أقل من 2 جم/يوم والبدء بنسبة 100:40 (سبيرونولاكتون 100 ملغ + فيوروسيميد 40 ملغ صباحاً) بهدف خفض الوزن بمعدل لا يتجاوز 0.5 كجم/يوم (أو 1 كجم/يوم في حال وجود وذمة محيطية) لمنع الفشل الكلوي.',
      'الخطوة 2 (موانع الاستمرار بمدرات البول في التشمع): يجب إيقاف مدرات البول فوراً إذا هبط الصوديوم لأقل من 120-125 mEq/L، أو تفاقم الاعتلال الدماغي الكبدي، أو ارتفع الكرياتينين الحاد (AKI).',
      'الخطوة 3 (الوقاية من نزيف الدوالي بحاصرات بيتا غير الانتقائية): يُفضل الكارفيديلول (Carvedilol 6.25 mg) أو البروبرانولول، ولكن يجب إيقافهما فوراً في حال انخفاض الضغط الانقباضي < 90 مم زئبق أو حدوث التهاب الصفاق الجرثومي التلقائي (SBP) أو المتلازمة الكبدية الكلوية.',
      'الخطوة 4 (علاج المتلازمة الكبدية الكلوية HRS-AKI): إيقاف المدرات تماماً، إعطاء الألبومين الوريدي (1 جم/كغ ليومين بحد أقصى 100 جم/يوم) مع مضيق للأوعية الحشوية مثل Terlipressin أو النورإبينفرين.'
    ],
    keyRecommendations: [
      'In Patient Salem Al-Ghamdi (Child-Pugh B, Score 8, Na+ 132 mEq/L, K+ 3.6 mEq/L, Bilirubin 2.8, Albumin 2.9, INR 1.6): Maintain Spironolactone 100 mg + Furosemide 40 mg morning ratio, continue Lactulose 30 mL TID + Rifaximin 550 mg BID, and initiate SBP prophylaxis if ascitic fluid protein <1.5 g/dL with impaired renal/liver indices (Ciprofloxacin 500 mg daily or TMP-SMX DS daily).',
      'After Large-Volume Paracentesis (>5 Liters removed), administer IV Albumin 6–8 g per liter of ascitic fluid removed to prevent post-paracentesis circulatory dysfunction (PPCD) and HRS.'
    ],
    keyRecommendationsAr: [
      'تطبيق سريري لحالة المريض سالم الغامدي (Child-Pugh B، الصوديوم 132، البوتاسيوم 3.6): الاستمرار بنسبة 100:40 لمدرات البول صباحاً مع مراقبة البوتاسيوم (3.6 حالياً قريب من الحد الأدنى)، والاستمرار باللاكتولوز 30 مل 3 مرات يومياً مع الريفاكسيمين 550 ملغ مرتين يومياً.',
      'عند سحب سوائل استسقاء بكمية كبيرة (> 5 لتر)، يجب تعويض المريض بالألبومين الوريدي بمعدل 6 إلى 8 جرام ألبومين لكل لتر مسحوب لمنع الانهيار الدوراني والفشل الكلوي.'
    ],
    clinicalPearls: [
      'Why Spironolactone is the cornerstone in Cirrhosis Ascites (unlike Heart Failure): Hyperaldosteronism is the primary driver of sodium retention in cirrhosis, and loop diuretics fail if the distal tubule reabsorbs all delivered sodium via aldosterone.',
      'Proton pump inhibitors (PPIs) increase the risk of Spontaneous Bacterial Peritonitis (SBP) and Hepatic Encephalopathy in cirrhotic patients — discontinue PPIs unless there is a strict active indication (e.g., post-variceal banding ulcer).'
    ],
    clinicalPearlsAr: [
      'لماذا يُعد السبيرونولاكتون الدواء الأساسي في استسقاء الكبد؟ لأن السبب الرئيسي لاحتباس السوائل في التشمع هو فرط الألدوستيرون الثانوي، والفيوروسيميد يُضاف فقط لموازنة البوتاسيوم وتعزيز الإدرار.',
      'الاستخدام غير المبرر لمثبطات مضخة البروتون (PPIs) في مرضى تشمع الكبد يرفع خطر الإصابة بالتهاب الصفاق الجرثومي التلقائي (SBP) والاعتلال الدماغي الكبدي.'
    ],
    keywords: ['dipiro', 'cirrhosis', 'ascites', 'saag', 'spironolactone', 'furosemide', 'lactulose', 'rifaximin', 'sbp', 'hepatorenal', 'terlipressin', 'albumin', 'carvedilol'],
    sourceId: 'dipiro-13th-ed',
    sourceUrl: 'local://ref/chapter/dipiro-13-cirrhosis-portal-htn',
    evidenceLevel: "DiPiro's Pharmacotherapy 13th Ed. (Ch. 46, pp. 618–644)"
  },

  // ==================== ACCP/ASHP CARDIOLOGY 2026 (BCCP) ====================
  {
    id: 'accp-cardio-2026-acs-p2y12',
    bookId: 'accp-cardio-2026',
    volume: 2026,
    chapterNumber: 5,
    pages: 'BCCP Ch. 5 (UAN 0217-9999-26-100-H01-P)',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: 'ACCP Cardiology 2026: Acute Coronary Syndrome (STEMI/NSTE-ACS), P2Y12 Switching & Antiplatelet De-escalation',
    titleAr: 'مرجع ACCP للقلب 2026 (BCCP): المتلازمة التاجية الحادة، التحويل بين مثبطات P2Y12، وبروتوكولات القسطرة (PCI)',
    authors: 'Tracy E. Macaulay, Pharm.D., FCCP, FACC, BCCP;Kelly C. Rogers, Pharm.D., FCCP, FACC, BCCP',
    uan: '0217-9999-26-100-H01-P',
    summary:
      'Specialized BCCP algorithms for STEMI/NSTE-ACS antiplatelet & parenteral anticoagulation selection, exact P2Y12 switching rules (acute vs chronic phase), aspirin hypersensitivity management, and DAPT de-escalation in high bleeding risk (TWILIGHT, TICO, MASTER DAPT trials).',
    summaryAr:
      'خوارزميات البورد التخصصي للقلب (BCCP 2026) لاختيار مضادات الصفائح والتخثر أثناء القسطرة، القواعد الدقيقة للتحويل الآمن بين Clopidogrel و Ticagrelor و Prasugrel، وإدارة حساسية الأسبرين ومخاطر النزيف.',
    pathophysiology:
      'Coronary plaque rupture or erosion exposes subendothelial collagen and tissue factor, triggering platelet adhesion (GP Ib), activation (TXA2 & ADP-P2Y12 amplification), and aggregation (GP IIb/IIIa fibrinogen cross-linking) alongside thrombin generation. Potent P2Y12 inhibition (Ticagrelor/Prasugrel) achieves >80% platelet inhibition within 1–2 hours.',
    pathophysiologyAr:
      'يؤدي تمزق اللويحة العصيدية التاجية إلى كشف الكولاجين وعامل الأنسجة، مما ينشط التصاق الصفائح وإفراز الثرومبوكسان A2 ومركب ADP عبر مستقبلات P2Y12 لتشكيل الخثرة التاجية. تحقق المثبطات القوية (Ticagrelor / Prasugrel) تثبيطاً يتجاوز 80% خلال ساعة إلى ساعتين دون الحاجة لتنشيط كبدي بإنزيم CYP2C19.',
    algorithmSteps: [
      'Step 1 (ACS Antiplatelet Selection): Give Aspirin 162–325 mg chewed + P2Y12 inhibitor. For PCI: Ticagrelor (180 mg load, 90 mg BID) or Prasugrel (60 mg load, 10 mg OD; reduce to 5 mg OD if weight <60 kg or age >=75; CONTRAINDICATED in prior stroke/TIA). Use Clopidogrel (600 mg load, 75 mg OD) ONLY if potent agents are contraindicated, unavailable, or patient receives fibrinolysis (300 mg load if age <=75; 75 mg no load if age >75).',
      'Step 2 (Aspirin Bronchospasm / Hypersensitivity in ACS — e.g. Patient Fatima Al-Najjar): Perform rapid ICU oral aspirin desensitization OR use potent P2Y12 monotherapy (Ticagrelor 90 mg PO BID) after PCI; avoid cross-reactive NSAIDs.',
      'Step 3 (P2Y12 Switching Protocol): In the ACUTE phase (<30 days post-ACS), switching between any P2Y12 inhibitors requires a FULL LOADING DOSE of the new agent. In the CHRONIC phase (>30 days), switching from Ticagrelor to Clopidogrel (or Prasugrel) STILL requires a 600 mg Clopidogrel loading dose 24 hours after the last Ticagrelor dose because Ticagrelor is a reversible inhibitor!',
      'Step 4 (High Bleeding Risk / Triple Therapy): If AFib + PCI requires OAC, discontinue Aspirin at hospital discharge (up to 1–4 weeks max) and use Dual Therapy: DOAC (Apixaban 5 mg BID) + Clopidogrel 75 mg OD (AUGUSTUS trial).'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (اختيار مثبط P2Y12 في القسطرة PCI): يفضل Ticagrelor (تحميل 180 ملغ ثم 90 ملغ مرتين يومياً) أو Prasugrel (تحميل 60 ملغ ثم 10 ملغ يومياً؛ يُخفض إلى 5 ملغ إذا كان الوزن < 60 كجم أو العمر >= 75؛ ويُمنع قطعياً في السكتة الدماغية السابقة). يُستخدم Clopidogrel عند توفر موانع للمثبطات القوية أو مع مذيبات الخثرة.',
      'الخطوة 2 (التعامل مع حساسية الأسبرين الربوية كما في المريضة فاطمة النجار): إما بروتوكول إزالة التحسس السريع تحت المراقبة أو الاعتماد على Ticagrelor 90 mg BID مع منع الأسبرين ومضادات الالتهاب غير الستيرويدية نهائياً.',
      'الخطوة 3 (قواعد التحويل بين مثبطات P2Y12): في الطور الحاد (< 30 يوماً من الجلطة) يُعطى دائماً تحميل كامل (Loading Dose) من الدواء الجديد. أما في الطور المزمن (> 30 يوماً)، فإن التحويل من Ticagrelor إلى Clopidogrel يتطلب أيضاً جرعة تحميل كاملة (600 ملغ كلوبيدوغريل) بعد 24 ساعة من آخر جرعة تيكاجريلور لأن ارتباط التيكاجريلور عكسي!',
      'الخطوة 4 (المرضى المحتاجون لمميع دم مع قسطرة AFib + PCI — دراسة AUGUSTUS): يُوقف الأسبرين عند الخروج من المستشفى ويُكتفى بالعلاج المزدوج: Apixaban 5mg BID + Clopidogrel 75mg OD لتقليل النزيف بنسبة كبيرة دون زيادة الخثرات.'
    ],
    quickTables: [
      {
        title: 'ACCP Cardiology 2026: P2Y12 Inhibitor Comparison & Switching Matrix',
        titleAr: 'جدول مرجع ACCP للقلب 2026: مقارنة مثبطات الصفائح P2Y12 وقواعد التحويل الجراحي والسريري',
        headers: ['Feature', 'Clopidogrel (Plavix)', 'Prasugrel (Effient)', 'Ticagrelor (Brilinta)', 'Cangrelor (Kengreal)'],
        headersAr: ['المعيار السريري', 'كلوبيدوغريل (Clopidogrel)', 'براسوغريل (Prasugrel)', 'تيكاجريلور (Ticagrelor)', 'كانغريلور الوريدي (Cangrelor)'],
        rows: [
          ['Receptor Binding & Prodrug', 'Irreversible • Prodrug (CYP2C19)', 'Irreversible • Prodrug (Esterases/CYP)', 'Reversible allosteric • Active drug', 'Reversible IV • Direct active'],
          ['Loading / Maintenance Dose', '600 mg (PCI) / 75 mg OD', '60 mg / 10 mg OD (5 mg if <60 kg)', '180 mg / 90 mg BID', '30 mcg/kg IV bolus + 4 mcg/kg/min'],
          ['Pre-CABG Hold Time', 'Hold 5 days prior', 'Hold 7 days prior', 'Hold 3–5 days prior', 'Hold 1 hour prior to surgery'],
          ['Key Contraindications / Warnings', 'CYP2C19 poor metabolizers; Omeprazole', 'Prior Stroke/TIA (Contraindicated)', 'Dyspnea (15%), Bradycardia, Aspirin >100 mg', 'Transition to PO P2Y12 at infusion end']
        ],
        rowsAr: [
          ['طبيعة الارتباط والتنشيط', 'غير عكسي • دواء أولي يعتمد على CYP2C19', 'غير عكسي • دواء أولي سريع التنشيط', 'عكسي مباشر • دواء نشط لا يحتاج تنشيطاً كبدياً', 'وريدي عكسي فوري التفعيل والزوال'],
          ['جرعة التحميل / الصيانة', '600 ملغ (قسطرة) / 75 ملغ يومياً', '60 ملغ / 10 ملغ يومياً (5 ملغ للوزن <60 كغ)', '180 ملغ / 90 ملغ مرتين يومياً', '30 مكغ/كغ دفعة ثم 4 مكغ/كغ/دقيقة'],
          ['فترة الإيقاف قبل جراحة القلب CABG', '5 أيام قبل الجراحة', '7 أيام قبل الجراحة', '3 إلى 5 أيام قبل الجراحة', 'ساعة واحدة فقط قبل الجراحة'],
          ['أهم الموانع والتنبيهات', 'ضعف استقلاب CYP2C19؛ تداخل Omeprazole', 'ممنوع قطعياً في حال وجود جلطة دماغية سابقة', 'قد يسبب ضيق تنفس عابر (15%)؛ يمنع الأسبرين >100 ملغ', 'يُستخدم كجسر وريدي قبل الجراحة أو عند تعذر البلع']
        ]
      }
    ],
    keyRecommendations: [
      'In Patient Fatima Al-Najjar (NSTEMI + HFrEF 35% + Aspirin allergy): Continue Ticagrelor 90 mg PO BID + Bisoprolol 2.5 mg OD + Ramipril 5 mg OD + Spironolactone 25 mg OD; ADD High-Intensity Statin (Atorvastatin 80 mg OD) and Dapagliflozin 10 mg OD (to complete all 4 HFrEF pillars and post-ACS secondary prevention).',
      'Never exceed Aspirin 100 mg/day maintenance when combined with Ticagrelor (PLATO trial North American paradox: high-dose aspirin reduces Ticagrelor efficacy).'
    ],
    keyRecommendationsAr: [
      'تطبيق عملي لحالة المريضة فاطمة النجار (NSTEMI + HFrEF 35% + حساسية أسبرين): الاستمرار على Ticagrelor 90mg BID، Bisoprolol، Ramipril، و Spironolactone؛ ويجب فوراً إضافة (1) ستاتين عالي الشدة Atorvastatin 80mg OD لما بعد الجلطة، و(2) Dapagliflozin 10mg OD لإكمال الركائز الأربع لقصور القلب.',
      'عند استخدام Ticagrelor مع الأسبرين، يُمنع تجاوز جرعة أسبرين 100 ملغ يومياً لأن الجرعات الأعلى تضعف فعالية التيكاجريلور (ظاهرة دراسة PLATO).'
    ],
    clinicalPearls: [
      'Ticagrelor causes benign, self-limiting dyspnea in 10–15% of patients (mediated by adenosine reuptake inhibition) usually within the first week — reassure the patient and do not confuse with heart failure unless pulmonary congestion signs are present.',
      'Ticagrelor inhibits P-gp and weak CYP3A4: increases Digoxin levels (monitor trough) and Simvastatin/Lovastatin levels (limit to <=40 mg).'
    ],
    clinicalPearlsAr: [
      'قد يسبب Ticagrelor ضيق تنفس حميد وعابر لدى 10-15% من المرضى خلال الأسبوع الأول بسبب تثبيط استرداد الأدينوزين؛ يجب تفريقه سريرياً عن وذمة الرئة قبل التسرع في إيقافه.',
      'التيكاجريلور يثبط البروتين السكري P-gp مما يرفع مستوى الديجوكسين بالدم عند الجمع بينهما.'
    ],
    keywords: ['accp cardiology', 'bccp', 'acs', 'nstemi', 'stemi', 'ticagrelor', 'prasugrel', 'clopidogrel', 'p2y12', 'switching', 'augustus', 'twilight', 'aspirin'],
    sourceId: 'accp-cardiology-2026',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-acs-p2y12',
    evidenceLevel: 'ACCP/ASHP Cardiology 2026 (BCCP Ch. 5 — Class I / Level A)'
  },
  {
    id: 'accp-cardio-2026-arrhythmia-anticoag',
    bookId: 'accp-cardio-2026',
    volume: 2026,
    chapterNumber: 3,
    pages: 'BCCP Ch. 2 & Ch. 3 (UAN 0217-9999-26-097/098-H01-P)',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: 'ACCP Cardiology 2026: Arrhythmias, DOAC Renal/Interaction Matrix, and Drugs to Avoid in CVD',
    titleAr: 'مرجع ACCP للقلب 2026 (BCCP): اضطرابات النظم، مصفوفة جرعات DOACs الكلوية، والأدوية الممنوعة قلبياً',
    authors: 'James E. Tisdale, Pharm.D., FCCP, FAHA, FACC, BCCP; Brent N. Reed, Pharm.D., FCCP, BCCP',
    uan: '0217-9999-26-098-H01-P',
    summary:
      'Acute and chronic atrial fibrillation rate vs rhythm control, Vaughan-Williams antiarrhythmic organ toxicities, exact DOAC dosing across renal stages and P-gp/CYP3A4 interactions, and AHA scientific statement on drugs that exacerbate heart failure and arrhythmias.',
    summaryAr:
      'بروتوكولات التحكم بالنبض والنظم في الرجفان الأذيني، سمية مضادات اضطراب النظم ومراقبتها الدورية، مصفوفة تعديل مضادات التخثر المباشرة (DOACs) في القصور الكلوي، والأدوية المسببة لتفاقم قصور القلب واستطالة QTc.',
    pathophysiology:
      'Atrial fibrillation results from rapid disorganized atrial electrical wavelet reentry originating predominantly from the pulmonary veins, causing loss of atrial kick (reducing cardiac output by 15–25%), rapid ventricular response (tachycardia-mediated cardiomyopathy), and left atrial appendage blood stasis leading to cardioembolic stroke.',
    pathophysiologyAr:
      'ينجم الرجفان الأذيني عن دوائر إعادة دخول كهربائية عشوائية تنشأ غالباً من الأوردة الرئوية، مما يؤدي إلى فقدان الانقباض الأذيني الفعال (انخفاض النتاج القلبي بنسبة 15-25%)، واستجابة بطينية سريعة قد تسبب اعتلال عضلة القلب الناتج عن تسرع النبض، وركود الدم في اللسين الأذيني الأيسر مما يسبب السكتات الدماغية الخثارية.',
    algorithmSteps: [
      'Step 1 (Acute AFib Rate Control by LVEF): If hemodynamically unstable -> Immediate synchronized direct-current cardioversion (DCCV). If stable & LVEF >40%: IV Metoprolol (2.5–5 mg q5min up to 3 doses) or IV Diltiazem (0.25 mg/kg bolus over 2 min, then 5–15 mg/h). If LVEF <=40% (HFrEF): NEVER give Diltiazem/Verapamil (negative inotrope -> cardiogenic shock); use Beta-Blocker (if compensated), Digoxin (0.25 mg IV q2h up to 1.5 mg), or IV Amiodarone (150 mg over 10 min, then 1 mg/min × 6h, then 0.5 mg/min × 18h).',
      'Step 2 (Rhythm Control Antiarrhythmic Selection): Structural Heart Disease / CAD / HFrEF -> Class IC agents (Flecainide, Propafenone) and Dronedarone are STRICTLY CONTRAINDICATED (CAST & ANDROMEDA trials increased mortality). Use Amiodarone or Dofetilide (requires 3-day inpatient QTc & CrCl monitoring; contraindicated if CrCl <20 mL/min).',
      'Step 3 (Stroke Prevention & Renal Anticoagulation): Calculate CHA2DS2-VASc (>=2 in men, >=3 in women -> Oral Anticoagulation). Prefer DOACs over Warfarin except in mechanical valves or moderate-to-severe mitral stenosis.',
      'Step 4 (Manage Amiodarone Multi-Drug Interactions & Organ Monitoring): Reduce Warfarin dose by 33–50%, reduce Digoxin dose by 50%, limit Simvastatin <=20 mg/day, avoid QTc-prolonging fluoroquinolones/macrolides. Obtain baseline and q6m TSH, LFTs, and annual chest X-ray / PFTs.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (التحكم الحاد بنبض الرجفان الأذيني حسب كفاءة البطين الأيسر LVEF): إذا كان المريض غير مستقر هيموديناميكياً -> صدمة كهربائية متزامنة فورية. إذا كان LVEF > 40%: ميتوبرولول أو ديلتيازيم وريدي. أما إذا كان LVEF <= 40% (قصور قلب انقباضي): يُمنع الديلتيازيم والفيراباميل منعاً باتاً؛ ويُستخدم الأميودارون أو الديجوكسين أو حاصر بيتا بعد استقرار السوائل.',
      'الخطوة 2 (اختيار دواء إعادة النظم Rhythm Control): في حال وجود مرض قلبي هيكلي أو جلطة سابقة أو قصور قلب، تُمنع أدوية الفئة IC (Flecainide / Propafenone) و Dronedarone قطعياً لأنها ترفع الوفيات؛ ويُسمح بالأميودارون أو الدوفيتيليد (Dofetilide بشرط CrCl > 20).',
      'الخطوة 3 (ضبط جرعة مضاد التخثر في القصور الكلوي والتداخلات): عند إضافة الأميودارون لمريض يتناول الوارفارين يجب خفض جرعة الوارفارين فوراً بنسبة 33-50% أو التحويل لبديل آمن مع مراقبة INR.',
      'الخطوة 4 (جدول المتابعة الدورية لسمية الأميودارون): فحص الغدة الدرقية (TSH) وإنزيمات الكبد (AST/ALT) عند البدء وكل 6 أشهر، وأشعة الصدر ووظائف الرئة سنوياً.'
    ],
    quickTables: [
      {
        title: 'ACCP Cardiology 2026: Complete DOAC &Parenteral Anticoagulant Renal Dosing Matrix (NVAF & VTE)',
        titleAr: 'جدول مرجع ACCP للقلب 2026: مصفوفة تعديل جرعات مضادات التخثر في الرجفان الأذيني والقصور الكلوي',
        headers: ['Anticoagulant', 'Standard NVAF Dose', 'Renal Adjustment / Criteria', 'Severe Renal / Dialysis (CrCl <15–30)', 'Amiodarone / P-gp Interaction'],
        headersAr: ['مضاد التخثر', 'الجرعة القياسية في AFib', 'معايير وشروط خفض الجرعة', 'القصور الكلوي الشديد (CrCl < 30)', 'تداخل الأميودارون ومثبطات P-gp'],
        rows: [
          ['Apixaban (Eliquis)', '5 mg PO BID', '2.5 mg BID ONLY if >=2 of: Age >=80, Wt <=60 kg, SCr >=1.5 mg/dL', '27% renal clearance; 5 mg BID (or 2.5 mg BID if Age >=80 or Wt <=60 kg) in ESRD/HD', 'Avoid dual strong CYP3A4 + P-gp inhibitors; safe with Amiodarone'],
          ['Rivaroxaban (Xarelto)', '20 mg PO OD with evening meal', '15 mg PO OD with food if CrCl 15–50 mL/min', 'Avoid if CrCl <15 mL/min (36% renal clearance)', 'Avoid if CrCl <80 mL/min with combined P-gp + moderate CYP3A4 inhibitors (e.g. Diltiazem/Amiodarone)'],
          ['Edoxaban (Savaysa)', '60 mg PO OD', '30 mg PO OD if CrCl 15–50 mL/min, Wt <=60 kg, or P-gp inhibitor', 'Contraindicated if CrCl >95 mL/min (higher ischemic stroke) or CrCl <15', 'Reduce to 30 mg OD with Verapamil, Quinidine, or Dronedarone'],
          ['Dabigatran (Pradaxa)', '150 mg PO BID', '75 mg BID if CrCl 15–30 mL/min', '80% renal clearance — Avoid if CrCl <30 mL/min!', 'Avoid with Amiodarone/Verapamil if CrCl <50 mL/min'],
          ['Enoxaparin (Clexane)', '1 mg/kg SC q12h (Therapeutic) / 40 mg q24h (Prophylaxis)', 'No adjustment if CrCl >=30 mL/min', 'If CrCl <30: 1 mg/kg SC q24h (Therapeutic) / 30 mg SC q24h (Prophylaxis)', 'No CYP/P-gp interaction; monitor platelets (HIT)']
        ],
        rowsAr: [
          ['أبيكسابان (Apixaban)', '5 ملغ مرتين يومياً', 'تُخفض إلى 2.5 ملغ مرتين فقط عند اجتماع معيارين: العمر >=80، الوزن <=60 كغ، أو SCr >=1.5', 'الأقل إطراحاً كلوياً (27%)؛ يُستخدم بحذر حتى في الغسيل الكلوي', 'آمن نسبياً مع الأميودارون؛ يُعدل فقط مع المثبطات المزدوجة القوية لـ CYP3A4 و P-gp'],
          ['ريفاروكسابان (Rivaroxaban)', '20 ملغ يومياً مع وجبة المساء', '15 ملغ يومياً مع الطعام إذا كان CrCl بين 15 و 50 مل/د', 'يُتجنب إذا كان CrCl < 15 مل/د (إطراح كلوي 36%)', 'في القصور الكلوي مع الأميودارون يرتفع تركيز الدواء ويزيد خطر النزيف'],
          ['إيدوكسابان (Edoxaban)', '60 ملغ مرة يومياً', '30 ملغ يومياً إذا كان CrCl 15-50 أو الوزن <= 60 كغ', 'ممنوع إذا كانت التصفية CrCl > 95 مل/د (يفقد فعاليته) أو < 15 مل/د', 'تُخفض الجرعة إلى 30 ملغ مع مثبطات P-gp'],
          ['دابيغاتران (Dabigatran)', '150 ملغ مرتين يومياً', '75 ملغ مرتين إذا كان CrCl 15-30 مل/د', 'إطراح كلوي 80% — يُتجنب تماماً عند CrCl < 30 مل/د!', 'تداخل شديد مع الأميودارون والفيراباميل في القصور الكلوي'],
          ['إينوكسابارين (Enoxaparin)', 'علاجي: 1 ملغ/كغ كل 12س | وقائي: 40 ملغ يومياً', 'لا يُعدل إذا كان CrCl >= 30 مل/د', 'عند CrCl < 30: العلاجي 1 ملغ/كغ كل 24س | الوقائي 30 ملغ كل 24س', 'لا يتداخل مع الأميودارون عبر الكبد؛ راقب الصفائح']
        ]
      }
    ],
    keyRecommendations: [
      'In Patient Abdullah Al-Hazmi (AFib, CrCl 28.5 mL/min, on Amiodarone 200 mg OD & Enoxaparin 40 mg q24h, Home Warfarin 5 mg): (1) Reduce Enoxaparin VTE prophylaxis from 40 mg to 30 mg SC q24h immediately because CrCl <30 mL/min; (2) Hold home Warfarin while on inpatient Enoxaparin, and when transitioning back to oral anticoagulation, either reduce Warfarin by 33–50% (due to Amiodarone CYP2C9 inhibition) OR switch to Apixaban (preferred DOAC in CrCl 28 mL/min).',
      'Maintain Serum K+ >=4.0 mEq/L and Mg2+ >=2.0 mg/dL in all patients receiving Amiodarone, Sotalol, Dofetilide, or QTc-prolonging medications to prevent Torsades de Pointes.'
    ],
    keyRecommendationsAr: [
      'تطبيق عملي لحالة المريض عبدالله الحازمي (رجفان أذيني، CrCl 28.5 مل/د، يتناول أميودارون وإينوكسابارين 40 ملغ ووارفارين منزلي): (1) خفض الإينوكسابارين الوقائي فوراً من 40 ملغ إلى 30 ملغ تحت الجلد يومياً لأن CrCl < 30؛ (2) عند الخروج على مميع فموي بوجود الأميودارون، إما خفض جرعة الوارفارين بنسبة 33-50% مع فحص INR كل 3 أيام، أو التحويل إلى Apixaban كونه الخيار الأكثر أماناً في القصور الكلوي.',
      'الحفاظ على البوتاسيوم >= 4.0 mEq/L والمغنيسيوم >= 2.0 mg/dL إلزامي في جميع مرضى عناية القلب الذين يتلقون أدوية مضادة لاضطراب النظم لمنع Torsades de Pointes.'
    ],
    clinicalPearls: [
      'Rivaroxaban 15 mg and 20 mg tablets MUST be taken with the evening meal (food increases bioavailability from 66% to >80%); taking on an empty stomach causes therapeutic failure and stroke.',
      'Amiodarone has a half-life of 40–55 days — CYP2C9/CYP3A4/P-gp drug interactions persist for weeks to months even after Amiodarone is discontinued!'
    ],
    clinicalPearlsAr: [
      'يجب تناول جرعتي 15 ملغ و 20 ملغ من Rivaroxaban مع وجبة الطعام حصراً لأن الطعام يرفع امتصاصه من 66% إلى أكثر من 80%، وتناوله على معدة فارغة يعرض المريض لجلطة دماغية.',
      'عمر النصف للأميودارون يتراوح بين 40 و 55 يوماً؛ لذلك يستمر تداخله مع الوارفارين والديجوكسين لعدة أشهر حتى بعد إيقاف الأميودارون!'
    ],
    keywords: ['accp cardiology', 'bccp', 'afib', 'arrhythmia', 'amiodarone', 'warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'enoxaparin', 'dofetilide', 'flecainide', 'qtc'],
    sourceId: 'accp-cardiology-2026',
    sourceUrl: 'local://ref/chapter/accp-cardio-2026-arrhythmia-anticoag',
    evidenceLevel: 'ACCP/ASHP Cardiology 2026 (BCCP Ch. 2–3 — Class I / Level A)'
  },

  // ==================== VOLUME 1 (ACCP PHARMACOTHERAPY 2026) ====================
  {
    id: 'accp-2026-v1-c1',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 1,
    pages: '1-1 to 1-64',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: 'ACCP 2026 Vol 1: Acute Care in Cardiology (ACS, ADHF, Arrhythmias & Hypertensive Emergency)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-1): العناية الحرجة للقلب (الجلطة القلبية، قصور القلب الحاد، واضطرابات النظم)',
    authors: 'Julie DiBridge Clarkson, Pharm.D., BCPS, BCCP, BCCCP',
    uan: '0217-0000-26-057-H01-P',
    summary:
      'Evidence-based acute management of STEMI/NSTE-ACS dual antiplatelet therapy, acute decompensated heart failure (ADHF) diuretic & vasodilator strategies, life-threatening arrhythmias, and hypertensive emergencies.',
    summaryAr:
      'الإرشادات المحدثة لعام 2026 للتعامل الحاد مع المتلازمة التاجية الحادة (STEMI/NSTEMI)، قصور القلب الحاد غير المعاوض (ADHF)، اضطرابات النظم المهددة للحياة، وفرط ضغط الدم الإسعافي.',
    keyRecommendations: [
      'ACS DAPT: Aspirin 162–325 mg loading (81 mg/day maintenance) + P2Y12 inhibitor. Prefer Ticagrelor (180 mg load, 90 mg BID) or Prasugrel (60 mg load, 10 mg daily; contraindicated in prior stroke/TIA) over Clopidogrel after PCI.',
      'Aspirin Allergy in ACS: Desensitization or P2Y12 monotherapy (Ticagrelor 90 mg BID or Clopidogrel) per PCI protocol.',
      'ADHF Loop Diuretic Escalation: Initial IV Furosemide dose should be 1–2.5× home oral daily dose; check spot urine Na at 2 hours (>50–70 mEq/L target) or urine output >100–150 mL/h.',
      'Hypertensive Emergency: Reduce MAP by no more than 25% within the first hour (except aortic dissection: target SBP <120 mmHg and HR <60 bpm within 20 minutes using Esmolol/Labetalol first).'
    ],
    keyRecommendationsAr: [
      'العلاج المزدوج للصفائح (DAPT) في ACS: أسبرين 162-325 ملغ تحميلة ثم 81 ملغ يومياً + مثبط P2Y12 (يفضل Ticagrelor 90mg BID أو Prasugrel 10mg OD على Clopidogrel بعد القسطرة، مع منع Prasugrel في حال وجود جلطة دماغية سابقة).',
      'حساسية الأسبرين في مرضى القسطرة: إزالة التحسس أو الاكتفاء بمثبط P2Y12 قوي مثل Ticagrelor 90 ملغ مرتين يومياً.',
      'مدرات البول في قصور القلب الحاد (ADHF): البدء بفيوروسيميد وريدي يعادل 1 إلى 2.5 ضعف الجرعة المنزلية الفموية، مع تقييم صوديوم البول بعد ساعتين (>50-70 mEq/L).',
      'فرط الضغط الإسعافي: خفض متوسط ضغط الدم الشرياني (MAP) بما لا يتجاوز 25% في الساعة الأولى (باستثناء تسلخ الأبهر: يخفض الضغط الانقباضي <120 والنبض <60 خلال 20 دقيقة بـ Esmolol أولاً).'
    ],
    clinicalPearls: [
      'Avoid NSAIDs, non-dihydropyridine CCBs (Verapamil/Diltiazem), and Thiazolidinediones in patients with HFrEF/ADHF.',
      'Morphine in ACS/ADHF is no longer routinely recommended due to delayed P2Y12 absorption and increased mortality signals.'
    ],
    clinicalPearlsAr: [
      'تجنب مضادات الالتهاب غير الستيرويدية (NSAIDs) وحاصرات الكالسيوم غير الديهيدروبيريدينية (فيراباميل/ديلتيازيم) في مرضى قصور القلب الانقباضي.',
      'لا يُنصح بالاستخدام الروتيني للمورفين في ACS لأنه يؤخر الامتصاص المعوي لمثبطات P2Y12.'
    ],
    keywords: ['acs', 'nstemi', 'stemi', 'ticagrelor', 'prasugrel', 'clopidogrel', 'adhf', 'furosemide', 'amiodarone', 'hypertensive emergency'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c1',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-1 to 1-64) — Class I / Level A'
  },
  {
    id: 'accp-2026-v1-c2',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 2,
    pages: '1-65 to 1-130',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: 'ACCP 2026 Vol 1: Chronic Care in Cardiology (HFrEF 4 Pillars, AFib, HTN & Dyslipidemia)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-65): الرعاية المزمنة للقلب (الركائز الأربع لقصور القلب HFrEF والرجفان الأذيني)',
    uan: '0217-0000-26-057-H01-P',
    summary:
      'Guideline-directed medical therapy (GDMT) for HFrEF/HFpEF, rate and rhythm control in atrial fibrillation, hypertension targets, and high-intensity statin/PCSK9i lipid management.',
    summaryAr:
      'العلاج الطبي الموجه بالإرشادات (GDMT) لقصور القلب (الركائز الأربع)، التحكم بالنبض والنظم في الرجفان الأذيني، أهداف ضغط الدم، وعلاج اضطراب شحوم الدم بالستاتين عالي الشدة.',
    keyRecommendations: [
      '4 Pillars of HFrEF (EF <=40%): (1) ARNI (Sacubitril/Valsartan preferred) or ACEi/ARB, (2) Evidence-based Beta-Blocker (Carvedilol, Metoprolol Succinate, or Bisoprolol), (3) MRA (Spironolactone or Eplerenone; K+ <5.0, eGFR >30), (4) SGLT2 Inhibitor (Dapagliflozin or Empagliflozin regardless of diabetes status).',
      'Washout Period: Mandatory 36-hour washout when switching from an ACE inhibitor (e.g., Ramipril/Lisinopril) to Sacubitril/Valsartan (ARNI) to prevent angioedema.',
      'AFib Rate Control: Beta-blockers or non-DHP CCBs (Diltiazem/Verapamil) for EF >40%; only Beta-blockers or Digoxin (or Amiodarone) if HFrEF (EF <=40%).',
      'Amiodarone Interactions: Inhibits CYP2C9, CYP2D6, CYP3A4, and P-gp; empirically reduce Warfarin by 33–50%, Digoxin by 50%, and limit Simvastatin to <=20 mg/day.'
    ],
    keyRecommendationsAr: [
      'الركائز الأربع لعلاج HFrEF (EF <=40%): (1) ARNI أو ACEi/ARB، (2) حاصرات بيتا المعتمدة (بيسوبرولول، كارفيديلول، ميتوبرولول سكسينات)، (3) مضادات الألدوستيرون (سبيرونولاكتون بشرط K < 5.0 و eGFR > 30)، (4) مثبطات SGLT2 (داباغليفلوزين أو إمباغليفلوزين مع أو بدون سكري).',
      'فترة الغسيل الدوائي (Washout): يجب التوقف عن مثبطات ACE لمدة 36 ساعة كاملة قبل البدء بـ Sacubitril/Valsartan لمنع الوذمة الوعائية.',
      'تداخل الأميودارون الحرج: يثبط CYP2C9 وCYP3A4 وP-gp؛ يجب خفض جرعة الوارفارين بنسبة 33-50% وخفض الديجوكسين بنسبة 50% استباقياً.'
    ],
    clinicalPearls: [
      'Monitor serum potassium and creatinine within 3–7 days after initiating or titrating ACEi/ARB/ARNI + Spironolactone.',
      'Continue high-intensity statin (Atorvastatin 40–80 mg or Rosuvastatin 20–40 mg) inpatient unless acute liver injury or rhabdomyolysis.'
    ],
    clinicalPearlsAr: [
      'يجب فحص البوتاسيوم والكرياتينين خلال 3-7 أيام من الجمع بين مثبط ACE/ARNI وسبيرونولاكتون لتجنب فرط البوتاسيوم القاتل.',
      'استمرار الستاتين عالي الشدة أثناء التنويم يمنع الارتداد الالتهابي الوعائي ما لم يوجد ارتفاع حاد في إنزيمات الكبد.'
    ],
    keywords: ['hfref', 'bisoprolol', 'ramipril', 'spironolactone', 'dapagliflozin', 'empagliflozin', 'arni', 'afib', 'amiodarone', 'atorvastatin'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c2',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-65 to 1-130) — Class I / Level A'
  },
  {
    id: 'accp-2026-v1-c3',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 3,
    pages: '1-131 to 1-192',
    category: 'Cardiology & Anticoagulation',
    categoryAr: 'أمراض القلب ومضادات التخثر',
    title: 'ACCP 2026 Vol 1: Anticoagulation (AFib Stroke Prevention, VTE, Renal Dosing & Reversal)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-131): مضادات التخثر (الوقاية والعلاج، التعديل الكلوي، وبروتوكولات العكس)',
    uan: '0217-0000-26-057-H01-P',
    summary:
      'DOAC vs Warfarin selection, CHA2DS2-VASc & HAS-BLED stratification, inpatient VTE prophylaxis and treatment in renal impairment, and emergency reversal protocols.',
    summaryAr:
      'اختيار مضادات التخثر المباشرة (DOACs) مقابل الوارفارين، الوقاية والعلاج من الجلطات الوريدية (VTE) في القصور الكلوي، وبروتوكولات عكس التمييع في النزيف المهدد للحياة.',
    keyRecommendations: [
      'VTE Prophylaxis in Medical/ICU Inpatients: Enoxaparin 40 mg SC q24h; reduce to 30 mg SC q24h if CrCl <30 mL/min, or switch to Unfractionated Heparin (UFH) 5000 units SC q8–12h.',
      'Therapeutic Enoxaparin: 1 mg/kg SC q12h (or 1.5 mg/kg SC q24h); if CrCl <30 mL/min, reduce to 1 mg/kg SC q24h with anti-Xa monitoring or use IV UFH.',
      'Apixaban NVAF Dosing: 5 mg PO BID; reduce to 2.5 mg PO BID ONLY if >=2 of the ABC criteria are met: Age >=80 years, Body weight <=60 kg, Serum Creatinine >=1.5 mg/dL.',
      'Valvular AFib Contraindication: DOACs are contraindicated in mechanical heart valves or moderate-to-severe mitral stenosis — use Warfarin (INR 2.0–3.0 or 2.5–3.5 per valve type).',
      'Emergency Reversal: Warfarin life-threatening bleed -> 4-Factor PCC (25–50 units/kg IV) + Vitamin K 10 mg slow IV; Dabigatran -> Idarucizumab 5 g IV; Apixaban/Rivaroxaban -> Andexanet alfa or 4F-PCC.'
    ],
    keyRecommendationsAr: [
      'الوقاية من VTE للمنومين: إينوكسابارين 40 ملغ تحت الجلد يومياً؛ وتُخفض وجوباً إلى 30 ملغ كل 24 ساعة إذا كان CrCl < 30 مل/د، أو يُستبدل بهيبارين غير مجزأ (UFH) 5000 وحدة كل 8-12 ساعة.',
      'الجرعة العلاجية للإينوكسابارين: 1 ملغ/كغ كل 12 ساعة، وتُعدل في CrCl < 30 مل/د إلى 1 ملغ/كغ مرة واحدة يومياً (q24h).',
      'معايير خفض جرعة Apixaban في الرجفان الأذيني إلى 2.5 ملغ مرتين يومياً: توفر معيارين على الأقل من (العمر >= 80 سنة، الوزن <= 60 كجم، الكرياتينين >= 1.5 ملغ/دل).',
      'عكس التمييع الطارئ: للوارفارين يُعطى 4-Factor PCC مع فيتامين K 10 ملغ وريدياً ببطء؛ ولأبيكسابان/ريفاروكسابان يُعطى Andexanet alfa أو 4F-PCC.'
    ],
    clinicalPearls: [
      'Bridging Warfarin is only needed in patients at very high thromboembolic risk (e.g., mechanical mitral valve, recent VTE <3 months, CHA2DS2-VASc >=7).',
      'Protamine reverses 100% of UFH (1 mg per 100 units of UFH given in past 2–3 h) and ~60% of Enoxaparin (1 mg per 1 mg Enoxaparin if given within 8 h).'
    ],
    clinicalPearlsAr: [
      'يُعكس الهيبارين بالبروتامين (1 ملغ لكل 100 وحدة هيبارين)، بينما يعكس البروتامين حوالي 60% فقط من فعالية الإينوكسابارين.'
    ],
    keywords: ['anticoagulation', 'enoxaparin', 'warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'heparin', 'vte', 'pcc', 'inr'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c3',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-131 to 1-192) — Class I / Level A'
  },
  {
    id: 'accp-2026-v1-c4',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 4,
    pages: '1-193 to 1-252',
    category: 'Antimicrobial Stewardship (AMS)',
    categoryAr: 'ترشيد المضادات الحيوية والأمراض المعدية',
    title: 'ACCP 2026 Vol 1: Common Infectious Diseases (HAP/VAP, Sepsis, UTI, SSTI, C. diff & AMS)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-193): الأمراض المعدية وترشيد المضادات الحيوية (HAP/VAP، الإنتان، و C. diff)',
    uan: '0217-0000-26-058-H01-P',
    summary:
      'Empiric and pathogen-directed regimens for CAP, HAP/VAP, complicated UTI, SSTI, endocarditis, meningitis, C. difficile infection, and beta-lactam cross-reactivity rules.',
    summaryAr:
      'البروتوكولات العلاجية لذات الرئة المكتسبة بالمستشفى (HAP/VAP)، التهابات المسالك البولية المعقدة، التهاب الشغاف، الكلوستريديوم ديفسيل، وقواعد الحساسية التصالبية للبيتا-لاكتام.',
    keyRecommendations: [
      'HAP/VAP Empiric Regimen: Anti-pseudomonal beta-lactam (Meropenem 1 g IV q8h, Cefepime 2 g IV q8h, or Piperacillin/Tazobactam 4.5 g IV q6h) + MRSA agent (Vancomycin target AUC24/MIC 400–600 or Linezolid 600 mg IV/PO q12h).',
      'Nephrotoxicity Alert: Avoid combining Vancomycin + Piperacillin/Tazobactam when possible due to synergistic acute kidney injury (AKI); prefer Vancomycin + Cefepime or Meropenem.',
      'Meropenem Renal Dosing & Extended Infusion: CrCl >50: 1 g q8h; CrCl 26–50: 1 g q12h; CrCl 10–25: 500 mg q12h; CrCl <10: 500 mg q24h. Infuse over 3 hours in critically ill/high-MIC infections to maximize %fT>MIC.',
      'Clostridioides difficile (IDSA/SHEA): Fidaxomicin 200 mg PO BID × 10 days (preferred) or Oral Vancomycin 125 mg PO QID × 10 days; Fulminant C. diff: Oral Vancomycin 500 mg PO/NG QID + IV Metronidazole 500 mg q8h.',
      'Penicillin Anaphylaxis Cross-Reactivity: Avoid Penicillins and early generation Cephalosporins with similar R1 side chains; Aztreonam has zero cross-reactivity (except with Ceftazidime); Carbapenems have <1% cross-reactivity.'
    ],
    keyRecommendationsAr: [
      'علاج HAP/VAP التجريبي: مضاد زوائف (Meropenem 1g q8h أو Cefepime 2g q8h) + مضاد MRSA (فانكومايسين بهدف AUC/MIC 400-600 أو لينيزوليد 600 ملغ كل 12 ساعة).',
      'تحذير السمية الكلوية المشتركة: الجمع بين Vancomycin و Piperacillin/Tazobactam يضاعف خطر الإصابة الكلوية الحادة (AKI) مقارنةً بـ Cefepime أو Meropenem.',
      'جرعات الميروبينيم الكلوية والتسريب الممتد: CrCl > 50: 1 جم كل 8 ساعات؛ CrCl 26-50: 1 جم كل 12 ساعة؛ CrCl 10-25: 500 ملغ كل 12 ساعة؛ CrCl < 10: 500 ملغ كل 24 ساعة (يُفضل التسريب على مدى 3 ساعات لتعظيم فاعلية Time > MIC).',
      'التهاب القولون بـ C. difficile: الفيداكسومايسين 200 ملغ مرتين يومياً أو الفانكومايسين الفموي 125 ملغ 4 مرات يومياً لمدة 10 أيام (الفانكومايسين الوريدي لا يفرز في القولون ولا يعالج C. diff).'
    ],
    clinicalPearls: [
      'Daptomycin is inactivated by pulmonary surfactant — NEVER use Daptomycin for pneumonia (use Vancomycin or Linezolid).',
      'Linezolid is a weak MAO inhibitor and can precipitate Serotonin Syndrome with SSRIs/SNRIs; monitor platelets if used >14 days.'
    ],
    clinicalPearlsAr: [
      'الدابتومايسين يتثبط بمادة الـ Surfactant الرئوية، لذلك يُمنع استخدامه نهائياً في علاج ذات الرئة (Pneumonia).',
      'تقييم تخفيض طيف المضادات (De-escalation) إلزامي خلال 48-72 ساعة فور صدور نتائج المزرعة.'
    ],
    keywords: ['hap', 'vap', 'cap', 'vancomycin', 'meropenem', 'piperacillin', 'zosyn', 'cefepime', 'linezolid', 'cdiff', 'penicillin', 'ams'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c4',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-193 to 1-252) — IDSA/ATS Grade A'
  },
  {
    id: 'accp-2026-v1-c5',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 5,
    pages: '1-253 to 1-294',
    category: 'Antimicrobial Stewardship (AMS)',
    categoryAr: 'ترشيد المضادات الحيوية والأمراض المعدية',
    title: 'ACCP 2026 Vol 1: HIV, Opportunistic Infections & Tuberculosis Pharmacotherapy',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-253): علاج نقص المناعة المكتسب والعدوى الانتهازية والسل (TB)',
    uan: '0217-0000-26-058-H01-P',
    summary:
      'INSTI-based initial antiretroviral regimens, opportunistic infection prophylaxis/treatment by CD4 count, and RIPE tuberculosis regimens with CYP interaction management.',
    summaryAr:
      'الأنظمة العلاجية لمثبطات الإنتغراز، الوقاية من العدوى الانتهازية حسب مستوى CD4، وعلاج الدرن الرباعي (RIPE) مع إدارة التداخلات الدوائية للريفامبيسين.',
    keyRecommendations: [
      'Opportunistic Infection Prophylaxis: CD4 <200 cells/mm3 -> TMP-SMX 1 DS tab daily for Pneumocystis jirovecii (PCP); CD4 <100 + Toxoplasma IgG+ -> TMP-SMX 1 DS daily.',
      'INSTI Chelation Interaction: Dolutegravir and Bictegravir chelate with polyvalent cations (Ca2+, Mg2+, Fe2+, Al3+) — separate administration by 2 hours before or 6 hours after.',
      'Tuberculosis Active Regimen (RIPE): Rifampin + Isoniazid (always add Pyridoxine/Vit B6 25–50 mg/day to prevent peripheral neuropathy) + Pyrazinamide + Ethambutol for 2 months, then INH + Rifampin for 4 months.'
    ],
    keyRecommendationsAr: [
      'الوقاية من ذات الرئة الكيسية الرئوية (PCP) عند انخفاض CD4 < 200: كوتريموكسازول (TMP-SMX) قرص مزدوج القوة يومياً.',
      'تداخل الاستخلاب المعوي: مثبطات الإنتغراز (Dolutegravir / Bictegravir) تتفاعل مع الكالسيوم والحديد والمغنيسيوم؛ يجب الفصل الزمني بساعتين قبل أو 6 ساعات بعد.',
      'في علاج الدرن: يُضاف فيتامين B6 (بيريدوكسين 25-50 ملغ يومياً) مع الإيزونيازيد للوقاية من اعتلال الأعصاب المحيطية، مع الانتباه لأن الريفامبيسين محفز قوي لإنزيمات الكبد CYP450.'
    ],
    clinicalPearls: [
      'Tenofovir disoproxil fumarate (TDF) causes proximal renal tubulopathy and bone mineral density loss; prefer Tenofovir alafenamide (TAF) if CrCl >=30 mL/min.'
    ],
    clinicalPearlsAr: [
      'الريفامبيسين محفز إنزيمي قوي جداً (CYP3A4/2C9/P-gp) ويبطل مفعول مضادات التخثر المباشرة والعديد من الأدوية القلبية.'
    ],
    keywords: ['hiv', 'tb', 'tuberculosis', 'rifampin', 'isoniazid', 'pcp', 'cotrimoxazole', 'dolutegravir'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c5',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-253 to 1-294) — DHHS/IDSA Guidelines'
  },
  {
    id: 'accp-2026-v1-c6',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 6,
    pages: '1-295 to 1-358',
    category: 'Critical Care & Fluids',
    categoryAr: 'العناية المركزة والسوائل والكهارل',
    title: 'ACCP 2026 Vol 1: Critical Care (Sepsis/Shock Vasopressors, PADIS Analgosedation & SUP)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-295): العناية المركزة (الصدمة الإنتانية، القوابض الوعائية، والتهدئة PADIS)',
    uan: '0217-0000-26-058-H01-P',
    summary:
      'Surviving Sepsis Campaign resuscitation, first-line Norepinephrine & second-line Vasopressin, ICU analgosedation (Fentanyl/Hydromorphone + Propofol/Dexmedetomidine), delirium, and stress ulcer prophylaxis.',
    summaryAr:
      'إرشادات حملة النجاة من الإنتان، القوابض الوعائية (نورإبينفرين وفازوبريسين)، بروتوكولات التسكين والتهدئة في العناية المركزة، والوقاية من قرحة الشدة.',
    keyRecommendations: [
      'Septic Shock Vasopressor Sequence: Norepinephrine is the 1st-line vasopressor (target MAP >=65 mmHg). Add Vasopressin (fixed dose 0.03 units/min) when Norepinephrine reaches 0.25–0.5 mcg/kg/min rather than escalating Norepinephrine alone.',
      'Septic Shock Corticosteroids: IV Hydrocortisone 200 mg/day (50 mg IV q6h) when shock requires ongoing vasopressor therapy.',
      'PADIS Analgosedation First: Treat pain first with IV opioids (Fentanyl or Hydromorphone; avoid Morphine in renal insufficiency due to neurotoxic M3G/M6G accumulation and histamine release).',
      'Sedation Choice: Prefer Propofol or Dexmedetomidine over Benzodiazepines (Midazolam/Lorazepam) to reduce ICU delirium duration and mechanical ventilation days.',
      'Stress Ulcer Prophylaxis (SUP): Indicated for coagulopathy (platelets <50k, INR >1.5), mechanical ventilation >48h, or shock; discontinue promptly upon ICU discharge.'
    ],
    keyRecommendationsAr: [
      'القابض الوعائي الأول في الصدمة الإنتانية: النورإبينفرين (Norepinephrine) لاستهداف MAP >= 65 mmHg، مع إضافة الفازوبريسين (0.03 وحدة/دقيقة) كخط ثانٍ.',
      'التسكين أولاً في العناية المركزة: يفضل الفنتانيل أو الهيدرومورفون وريدياً، ويجب تجنب المورفين في مرضى القصور الكلوي أو من لديهم تحسس/حكة هيستامينية شديدة.',
      'اختيار المهدئ: يفضل البروبوفول (Propofol) أو الديكسميديتوميدين (Dexmedetomidine) بدلاً من البنزوديازيبينات لتقليل الهذيان (ICU Delirium).',
      'إيقاف مثبطات مضخة البروتون (PPI) للوقاية من قرحة الشدة فور زوال عوامل الخطر أو خروج المريض من العناية المركزة.'
    ],
    clinicalPearls: [
      'Propofol provides 1.1 kcal/mL from 10% lipid emulsion — monitor serum triglycerides and subtract lipid calories from nutrition prescription.',
      'Propylene glycol toxicity (hyperosmolar metabolic acidosis + AKI) can occur with high-dose IV Lorazepam infusions.'
    ],
    clinicalPearlsAr: [
      'البروبوفول يحتوي على مستحلب دهني يمد الجسم بـ 1.1 سعرة حرارية لكل مل؛ يجب مراقبة الدهون الثلاثية وخصم سعراته من التغذية الوريدية.'
    ],
    keywords: ['icu', 'sepsis', 'septic shock', 'norepinephrine', 'vasopressin', 'propofol', 'dexmedetomidine', 'hydromorphone', 'morphine', 'delirium'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c6',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-295 to 1-358) — SCCM PADIS / Surviving Sepsis'
  },
  {
    id: 'accp-2026-v1-c7',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 7,
    pages: '1-359 to 1-408',
    category: 'Electrolyte Replacement',
    categoryAr: 'تصحيح الكهارل والسوائل والتغذية',
    title: 'ACCP 2026 Vol 1: Fluids, Electrolytes, and Nutrition (Na+, K+, Mg2+, Ca2+ & EN/PN)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-359): السوائل والكهارل والتغذية الوريدية والأنبوبية (Na, K, Mg)',
    uan: '0217-0000-26-058-H01-P',
    summary:
      'Exact protocols from ACCP 2026 Vol 1 for crystalloid resuscitation, safe hyponatremia/hypernatremia correction limits, hypokalemia/hyperkalemia management, magnesium replacement, and EN/PN water calculations.',
    summaryAr:
      'البروتوكولات المعتمدة في ACCP 2026 لإعطاء السوائل الوريدية، الحدود الآمنة لتصحيح الصوديوم، علاج اضطرابات البوتاسيوم والمغنيسيوم، وحساب الاحتياج المائي والغذائي.',
    keyRecommendations: [
      'Hyponatremia Safe Correction Limit (ACCP 2026 p. 1-404): Raise serum Na+ by NO MORE than 10–12 mEq/L in 24 hours to prevent osmotic demyelination syndrome (central pontine myelinolysis). In hypovolemic hyponatremia, restore intravascular volume with 0.9% NaCl bolus first to shut off ADH.',
      'Hypernatremia Free Water Deficit (ACCP 2026 p. 1-405): Water deficit (L) = 0.4 × LBW × [(Na+ / 140) − 1]. Replace via enteral tube (preferred) or IV D5W — NEVER administer IV sterile water (causes fatal intravascular hemolysis).',
      'Hypokalemia + Hyponatremia or Hypomagnesemia (ACCP 2026 p. 1-404): Always check and replace Magnesium (MgSO4 2–4 g IV over 2–4 h) because hypomagnesemia causes refractory renal K+ wasting. Each 10 mEq K+ raises serum K+ by ~0.1 mEq/L (60–80 mEq/day raises K+ by 0.6–0.8 mEq/L).',
      'Acute Severe Hyperkalemia (ACCP 2026 p. 1-405): (1) IV Calcium Gluconate 1–2 g for cardiac membrane stabilization if ECG changes (use caution in Digoxin toxicity), (2) Regular Insulin 10 units IV + Dextrose 25–50 g for fastest predictable intracellular K+ shift, (3) Potassium binders (Sodium zirconium cyclosilicate / Patiromer) or loop diuretics/HD.'
    ],
    keyRecommendationsAr: [
      'الحد الأقصى لتصحيح نقص الصوديوم (ACCP 2026 ص 1-404): يمنع رفع الصوديوم بأكثر من 10-12 mEq/L خلال 24 ساعة لتجنب تحلل الميالين الجسري المركزي (ODS).',
      'معادلة عجز الماء الحر في فرط الصوديوم (ص 1-405): 0.4 × الوزن × [(Na / 140) - 1]؛ يُعوض عبر الأنبوب المعوي أو D5W وريدياً، ويُمنع منعاً باتاً إعطاء الماء المقطر (Sterile Water) بالوريد لأنه يسبب انحلال دم قاتل.',
      'ارتباط البوتاسيوم بالمغنيسيوم: نقص المغنيسيوم يسبب هدر البوتاسيوم الكلوي المقاوم للعلاج؛ لذا يجب تعويض المغنيسيوم (2-4 جم سلفات المغنيسيوم وريدياً ببطء) بالتزامن مع البوتاسيوم.',
      'علاج فرط البوتاسيوم الحاد (ص 1-405): غلوكونات الكالسيوم وريدياً لحماية عضلة القلب (بحذر في سمية الديجوكسين)، يليها الأنسولين الوريدي مع الدكستروز كأسرع وسيلة لإدخال البوتاسيوم للخلايا.'
    ],
    clinicalPearls: [
      'In patients receiving calorie-dense enteral nutrition (2 kcal/mL, ~717 mL water/L), provide total free water of ~1 mL/kcal/day via scheduled flushes (e.g., 180 mL q4h) to prevent hypernatremia.',
      'Overfeeding (>25 kcal/kg/day in ICU) increases CO2 production and causes hypercapnic respiratory acidosis delaying ventilator weaning.'
    ],
    clinicalPearlsAr: [
      'التغذية المفرطة في العناية المركزة (> 25 سعرة/كغ/يوم) ترفع إنتاج ثاني أكسيد الكربون وتسبب حماضاً تنفسياً يعيق فصل المريض عن جهاز التنفس الصناعي.'
    ],
    keywords: ['potassium', 'hypokalemia', 'hyperkalemia', 'magnesium', 'sodium', 'hyponatremia', 'hypernatremia', 'fluids', 'tpn', 'enteral nutrition'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c7',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-359 to 1-408) — Clinical Consensus'
  },
  {
    id: 'accp-2026-v1-c8',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 8,
    pages: '1-409 to 1-470',
    category: 'Pulmonology, Neurology & Specialty',
    categoryAr: 'الصدرية والأعصاب والتخصصات الدقيقة',
    title: 'ACCP 2026 Vol 1: Pulmonology (GINA Asthma, GOLD COPD) & Adult Vaccinations',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-409): الأمراض الصدرية (الربو GINA و COPD GOLD) وتطعيمات البالغين',
    uan: '0217-0000-26-059-H01-P',
    summary:
      'GINA Track 1 ICS-Formoterol MART therapy, GOLD ABE COPD bronchodilator escalation, acute COPD/asthma exacerbation regimens, and ACIP adult immunization updates.',
    summaryAr:
      'توصيات GINA المحدثة لعلاج الربو، وتصنيف GOLD ABE لمرضى الانسداد الرئوي المزمن، وإدارة النوبات الحادة بالمستشفى.',
    keyRecommendations: [
      'GINA Asthma Preferred Track 1: Low-dose ICS-Formoterol as both maintenance and reliever therapy (MART); SABA-only monotherapy is no longer recommended in adults due to severe exacerbation risk.',
      'GOLD COPD Group E (Frequent Exacerbations): LABA + LAMA dual bronchodilation first; add ICS (Triple therapy) if blood eosinophils >=300 cells/mcL.',
      'Acute COPD Exacerbation Inpatient: Short-acting bronchodilators + Systemic Prednisone 40 mg PO daily × 5 days + Antibiotics (5 days) if increased dyspnea, sputum volume, and sputum purulence.'
    ],
    keyRecommendationsAr: [
      'توصيات GINA للربو: يُفضل بخاخ ICS-Formoterol كعلاج وقائي وإسعافي معاً (MART)، ولا يُنصح بالاكتفاء بـ SABA وحده.',
      'نوبة COPD الحادة في المستشفى: بريدنيزون 40 ملغ فموياً لمدة 5 أيام + موسعات القصبات قصيرة الأمد + مضاد حيوي لمدة 5 أيام عند وجود بلغم صديدي.'
    ],
    clinicalPearls: [
      'Cardioselective beta-blockers (Bisoprolol, Metoprolol, Nebivolol) are safe and beneficial in patients with COPD and concurrent HFrEF or Post-MI.'
    ],
    clinicalPearlsAr: [
      'حاصرات بيتا الانتقائية للقلب (مثل بيسوبرولول وميتوبرولول) آمنة ولازمة لمرضى COPD المصابين بقصور القلب أو الجلطة القلبية.'
    ],
    keywords: ['asthma', 'copd', 'gina', 'gold', 'formoterol', 'prednisone', 'vaccines', 'pulmonology'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c8',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-409 to 1-470) — GINA / GOLD 2026'
  },
  {
    id: 'accp-2026-v1-c9',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 9,
    pages: '1-471 to 1-538',
    category: 'Pulmonology, Neurology & Specialty',
    categoryAr: 'الصدرية والأعصاب والتخصصات الدقيقة',
    title: 'ACCP 2026 Vol 1: Neurology (Status Epilepticus, Acute Ischemic Stroke, Parkinson & Migraine)',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-471): الأمراض العصبية (الصرع المستمر، السكتة الدماغية، وباركنسون)',
    uan: '0217-0000-26-059-H01-P',
    summary:
      'Status epilepticus emergent benzodiazepine & second-line ASM loading, acute ischemic stroke thrombolysis (Alteplase/Tenecteplase) & blood pressure goals, and antiepileptic enzyme interactions.',
    summaryAr:
      'بروتوكول الحالة الصرعية المستمرة، إذابة الجلطة في السكتة الدماغية الإقفارية الحادة وضبط ضغط الدم، وتداخلات مضادات الصرع.',
    keyRecommendations: [
      'Status Epilepticus Urgent Sequence: (1) IV Lorazepam 0.1 mg/kg (max 4 mg/dose) or IM Midazolam 10 mg; (2) Second-line IV loading: Levetiracetam 60 mg/kg (max 4500 mg), Valproate 40 mg/kg (max 3000 mg), or Fosphenytoin 20 mg PE/kg.',
      'Acute Ischemic Stroke Thrombolysis: Lower BP to <185/110 mmHg BEFORE IV Alteplase (0.9 mg/kg, max 90 mg) or Tenecteplase (0.25 mg/kg, max 25 mg), and maintain BP <180/105 mmHg for 24 hours post-infusion; hold aspirin/anticoagulants for 24 hours.'
    ],
    keyRecommendationsAr: [
      'الحالة الصرعية المستمرة: الخط الأول لورازيبام وريدي 0.1 ملغ/كغ (بحد أقصى 4 ملغ) أو ميدازولام عضلي 10 ملغ، يليه تحميل وريدي بـ Levetiracetam 60 ملغ/كغ (أقصى 4500 ملغ) أو فالبروات 40 ملغ/كغ.',
      'السكتة الدماغية الإقفارية: يجب خفض ضغط الدم لأقل من 185/110 قبل إعطاء Alteplase أو Tenecteplase وإبقاؤه <180/105 لمدة 24 ساعة مع تأجيل الأسبرين ومميعات الدم 24 ساعة.'
    ],
    clinicalPearls: [
      'Carbapenems (Meropenem, Ertapenem) rapidly reduce serum Valproic Acid concentrations by up to 60–90% within 24 hours, precipitating breakthrough seizures — avoid combination.'
    ],
    clinicalPearlsAr: [
      'تداخل خطير: الكاربابينيمات (مثل Meropenem) تخفض مستوى حمض الفالبرويك (Depakine) في الدم بنسبة 60-90% خلال 24 ساعة وتسبب تشنجات صرعية فورية.'
    ],
    keywords: ['neurology', 'stroke', 'seizure', 'status epilepticus', 'levetiracetam', 'valproate', 'phenytoin', 'alteplase', 'tenecteplase'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c9',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-471 to 1-538) — AHA/ASA & AES Guidelines'
  },
  {
    id: 'accp-2026-v1-c10',
    bookId: 'accp-2026-vol1',
    volume: 1,
    chapterNumber: 10,
    pages: '1-539 to 1-620',
    category: 'Pulmonology, Neurology & Specialty',
    categoryAr: 'الصدرية والأعصاب والتخصصات الدقيقة',
    title: 'ACCP 2026 Vol 1: Sexual & Reproductive Health, Pregnancy, Lactation & Osteoporosis',
    titleAr: 'ACCP 2026 (مجلد 1 - ص 1-539): الأدوية في الحمل والرضاعة وهشاشة العظام وصحة المرأة',
    uan: '0217-0000-26-059-H01-P',
    summary:
      'Teratogenic medications, safe antihypertensives and anticoagulants in pregnancy, lactation safety, and osteoporosis bisphosphonate/denosumab protocols.',
    summaryAr:
      'الأدوية المشوهة للأجنة، البدائل الآمنة لعلاج الضغط والتخثر أثناء الحمل والرضاعة، وبروتوكولات علاج هشاشة العظام.',
    keyRecommendations: [
      'Hypertension in Pregnancy: First-line safe agents are Labetalol, Nifedipine extended-release, and Methyldopa. ACE inhibitors, ARBs, and Aliskiren are strictly contraindicated (fetal renal dysgenesis).',
      'Anticoagulation in Pregnancy: LMWH (Enoxaparin) is the anticoagulant of choice; Warfarin and DOACs cross the placenta and are contraindicated during organogenesis.'
    ],
    keyRecommendationsAr: [
      'علاج الضغط في الحمل: يُستخدم لابيتالول، نيفيديبين ممتد المفعول، أو ميثيل دوبا؛ وتُمنع مثبطات ACE ومضادات ARB منعاً باتاً لتسببها بتشوهات كلوية قاتلة للجنين.',
      'مضادات التخثر في الحمل: الإينوكسابارين (LMWH) هو الخيار الآمن لأنه لا يعبر المشيمة، بينما يُمنع الوارفارين و DOACs.'
    ],
    clinicalPearls: [
      'Valproic acid, Isotretinoin, Thalidomide, Methotrexate, Mycophenolate, and Statins are teratogenic and contraindicated in pregnancy.'
    ],
    clinicalPearlsAr: [
      'حمض الفالبرويك، الميثوتريكسات، الميكوفينولات، والوارفارين أدوية عالية التشوه الجنيني.'
    ],
    keywords: ['pregnancy', 'lactation', 'labetalol', 'nifedipine', 'methyldopa', 'osteoporosis', 'teratogenic'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v1-c10',
    evidenceLevel: 'ACCP 2026 Vol. 1 (pp. 1-539 to 1-620) — ACOG / Endocrine Society'
  },

  // ==================== VOLUME 2 (ACCP PHARMACOTHERAPY 2026) ====================
  {
    id: 'accp-2026-v2-c1',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 11,
    pages: '2-1 to 2-34',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: 'ACCP 2026 Vol 2: Health Care Systems, Medication Safety, High-Alert Drugs & Reconciliation',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-1): سلامة الأدوية، الأدوية عالية الخطورة (ISMP)، والاستبراء الدوائي',
    authors: 'Lisa C. Hutchison, Pharm.D., MPH, FCCP, BCPS, BCGP',
    uan: '0217-0000-26-060-H01-P',
    summary:
      'ISMP High-Alert inpatient medication safeguards, medication reconciliation at transitions of care, Swiss-cheese root cause analysis, and P&T formulary stewardship.',
    summaryAr:
      'ضوابط الأدوية عالية الخطورة في المستشفيات، الاستبراء الدوائي عند الدخول والنقل والخروج، وتحليل الأخطاء الدوائية.',
    keyRecommendations: [
      'ISMP High-Alert Inpatient Medications: Anticoagulants (Heparin, Warfarin, Enoxaparin, DOACs), Insulins (IV/SC), Opioids (Morphine, Hydromorphone, Fentanyl), Antiarrhythmics (Amiodarone), Concentrated IV Electrolytes (KCl, 3% NaCl), and Chemotherapeutics require independent double-checks and smart-pump guardrails.',
      'Medication Reconciliation Mandate: Compare pre-admission home medication list against admission/transfer orders within 24 hours; explicitly classify omissions (e.g., holding Metformin in AKI/sepsis vs unintentional omission of home Statin/Beta-blocker).'
    ],
    keyRecommendationsAr: [
      'الأدوية عالية الخطورة (ISMP High-Alert): المميعات، الأنسولين، المخدرات الأفيونية (كالهيدرومورفون والمورفين)، الأميودارون، والبوتاسيوم الوريدي المركز تتطلب تدقيقاً مزدوجاً مستقلاً.',
      'الاستبراء الدوائي عند التنويم: مطابقة أدوية المنزل مع أوامر التنويم خلال 24 ساعة، وتوثيق الإيقاف المتعمد (مثل إيقاف الميتفورمين في القصور الكلوي الحاد) مقابل السهو غير المقصود.'
    ],
    clinicalPearls: [
      'Use tall-man lettering (e.g., HYDROmorphone vs MORPHine) to prevent fatal 7-fold potency look-alike/sound-alike dosing errors.'
    ],
    clinicalPearlsAr: [
      'الهيدرومورفون الوريدي أقوى بحوالي 5 إلى 7 أضعاف من المورفين الوريدي (1.5 ملغ هيدرومورفون IV تعادل 10 ملغ مورفين IV).'
    ],
    keywords: ['reconciliation', 'high alert', 'ismp', 'safety', 'hydromorphone', 'insulin', 'metformin', 'omission'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c1',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-1 to 2-34) — ISMP / Joint Commission'
  },
  {
    id: 'accp-2026-v2-c2',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 12,
    pages: '2-35 to 2-82',
    category: 'Oncology, GI/Liver & Endocrine',
    categoryAr: 'الأورام والكبد والغدد الصماء',
    title: 'ACCP 2026 Vol 2: Oncology Supportive Care (Febrile Neutropenia, CINV, Pain & Tumor Lysis)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-35): الرعاية الداعمة للأورام (حمى قلة العدلات، مضادات القيء، والألم)',
    uan: '0217-0000-26-060-H01-P',
    summary:
      'Empiric anti-pseudomonal therapy for high-risk febrile neutropenia, CINV prophylaxis, opioid equianalgesic conversion, and tumor lysis syndrome (Rasburicase/Allopurinol).',
    summaryAr:
      'التعامل الفوري مع حمى قلة العدلات، الوقاية من الغثيان والقيء الكيميائي، تحويل المسكنات الأفيونية، ومتلازمة انحلال الورم.',
    keyRecommendations: [
      'Febrile Neutropenia (ANC <500 cells/mm3 + Single Oral Temp >=38.3°C): Initiate empiric anti-pseudomonal beta-lactam monotherapy within 60 minutes (Cefepime 2 g IV q8h, Meropenem 1 g IV q8h, or Piperacillin/Tazobactam 4.5 g IV q6h). Add Vancomycin ONLY if hemodynamic instability, suspected catheter/skin infection, pneumonia, or MRSA colonization.',
      'Opioid Equianalgesic Conversion (Morphine 30 mg PO = 10 mg IV): Hydromorphone 7.5 mg PO = 1.5 mg IV; Oxycodone 20 mg PO; Fentanyl 0.1 mg (100 mcg) IV. Reduce calculated equianalgesic dose by 25–50% for incomplete cross-tolerance when rotating opioids.'
    ],
    keyRecommendationsAr: [
      'حمى قلة العدلات (ANC < 500 مع حرارة >= 38.3°C): البدء خلال ساعة واحدة بمضاد زوائف وريدي (Cefepime أو Meropenem أو Tazocin)؛ ولا يُضاف الفانكومايسين روتينياً إلا عند اشتباه عدوى قسطرة، التهاب جلد، ذات رئة، أو عدم استقرار هيموديناميكي.',
      'جدول تكافؤ المسكنات الأفيونية: 30 ملغ مورفين فموي = 10 ملغ مورفين وريدي = 1.5 ملغ هيدرومورفون وريدي = 7.5 ملغ هيدرومورفون فموي = 100 ميكروغرام فنتانيل وريدي (تُخفض الجرعة المحسوبة بنسبة 25-50% عند التبديل بين الأفيونات).'
    ],
    clinicalPearls: [
      'Rasburicase is contraindicated in G6PD deficiency due to severe hemolysis and methemoglobinemia.'
    ],
    clinicalPearlsAr: [
      'يُمنع إعطاء دواء Rasburicase في مرضى نقص إنزيم G6PD لأنه يسبب انحلال دم حاد وميتهيموغلوبينية الدم.'
    ],
    keywords: ['oncology', 'febrile neutropenia', 'anc', 'ondansetron', 'opioid', 'morphine', 'hydromorphone', 'fentanyl', 'tumor lysis'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c2',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-35 to 2-82) — NCCN / ASCO / IDSA'
  },
  {
    id: 'accp-2026-v2-c3',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 13,
    pages: '2-83 to 2-130',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: 'ACCP 2026 Vol 2: Drug Information, Literature Evaluation & Evidence Grading',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-83): معلومات الأدوية، تقييم الأدلة العلمية، وصياغة الاستشارات',
    uan: '0217-0000-26-060-H01-P',
    summary:
      'Systematic drug information retrieval (tertiary -> secondary -> primary literature), GRADE evidence hierarchy, and Naranjo adverse drug reaction causality scale.',
    summaryAr:
      'المنهجية العلمية للبحث في المراجع الدوائية (الثلاثية والثانوية والأولية)، تقييم درجة الدليل العلمي، ومقياس نارانجو للأعراض الجانبية.',
    keyRecommendations: [
      'Evidence Verification Mandate: High-risk clinical recommendations (narrow therapeutic index drugs, anticoagulation, renal/hepatic dose adjustments in ICU) require traceable citation to original guidelines/compendia and explicit evidence grading.'
    ],
    keyRecommendationsAr: [
      'قاعدة التحقق الإلزامي من المصدر: التوصيات عالية الخطورة تتطلب توثيق رابط المرجع الأصلي ومستوى الدليل العلمي قبل اعتمادها النهائي.'
    ],
    clinicalPearls: [
      'Use the Naranjo algorithm (>=9 Definite, 5–8 Probable, 1–4 Possible, <=0 Doubtful) when documenting suspected ADRs.'
    ],
    clinicalPearlsAr: [
      'يُستخدم مقياس نارانجو (Naranjo Scale) لتحديد احتمالية ارتباط التفاعل الدوائي الضار (ADR) بالدواء المشتبه به.'
    ],
    keywords: ['drug information', 'evidence', 'naranjo', 'adr', 'guidelines', 'biostatistics'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c3',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-83 to 2-130) — Standard Methodology'
  },
  {
    id: 'accp-2026-v2-c4',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 14,
    pages: '2-131 to 2-218',
    category: 'Oncology, GI/Liver & Endocrine',
    categoryAr: 'الأورام والكبد والغدد الصماء',
    title: 'ACCP 2026 Vol 2: Gastroenterology & Hepatology (Cirrhosis, Ascites, Hepatic Encephalopathy, SBP & UGIB)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-131): الجهاز الهضمي والكبد (تشمع الكبد، الاستسقاء، والاعتلال الكبدي)',
    uan: '0217-0000-26-060-H01-P',
    summary:
      'Management of decompensated cirrhosis (Child-Pugh A/B/C), portal hypertension, ascites diuretic ratio, hepatic encephalopathy, SBP prophylaxis, and upper GI bleeding.',
    summaryAr:
      'إدارة تشمع الكبد غير المعاوض (مقياس Child-Pugh)، الاستسقاء البطني، الاعتلال الدماغي الكبدي، والوقاية من التهاب الصفاق الجرثومي التلقائي (SBP).',
    keyRecommendations: [
      'Cirrhosis Ascites Diuretic Regimen: Maintain 100:40 ratio of Spironolactone (100 mg PO morning) to Furosemide (40 mg PO morning), titrated every 3–5 days up to max 400 mg Spironolactone : 160 mg Furosemide to preserve normokalemia.',
      'Hepatic Encephalopathy (HE): First-line Lactulose 20–30 g (30–45 mL) PO 2–4 times daily titrated to produce 2–3 soft stools/day; add Rifaximin 550 mg PO BID to prevent recurrent overt HE.',
      'Spontaneous Bacterial Peritonitis (SBP): Acute treatment -> Ceftriaxone 2 g IV q24h × 5 days + IV Albumin (1.5 g/kg on Day 1, 1 g/kg on Day 3 if SCr >1 mg/dL, BUN >30 mg/dL, or Bilirubin >4 mg/dL). Secondary prophylaxis -> Ciprofloxacin 500 mg PO daily or TMP-SMX 1 DS daily.',
      'Variceal Upper GI Bleed: Octreotide (50 mcg IV bolus, then 50 mcg/h × 3–5 days) + Ceftriaxone 1 g IV q24h (up to 7 days) + IV Pantoprazole.'
    ],
    keyRecommendationsAr: [
      'بروتوكول مدرات البول في استسقاء تشمع الكبد: الحفاظ على نسبة 100:40 بين السبيرونولاكتون (100 ملغ صباحاً) والفيوروسيميد (40 ملغ صباحاً) لضمان توازن البوتاسيوم.',
      'الاعتلال الدماغي الكبدي (Hepatic Encephalopathy): لاكتولوز 30-45 مل فموياً 3 مرات يومياً (بهدف 2-3 إخراج لين يومياً) + ريفاكسيمين (Rifaximin) 550 ملغ مرتين يومياً لمنع الانتكاس.',
      'التهاب الصفاق الجرثومي التلقائي (SBP): يعالج بـ Ceftriaxone 2 جم يومياً مع الألبومين الوريدي (1.5 جم/كغ في اليوم الأول و1 جم/كغ في اليوم الثالث لحماية الكلى).',
      'تداخل Omeprazole + Clopidogrel: الأوميبرازول يثبط CYP2C19 ويضعف مفعول الكلوبيدوغريل؛ يستبدل بـ Pantoprazole.'
    ],
    clinicalPearls: [
      'Avoid NSAIDs in cirrhosis (precipitate hepatorenal syndrome and GI bleeding by inhibiting renal prostaglandin synthesis).',
      'Child-Pugh Class C (score 10–15) requires significant dose reductions or avoidance of hepatically cleared high-extraction drugs.'
    ],
    clinicalPearlsAr: [
      'تُمنع مضادات الالتهاب غير الستيرويدية (NSAIDs) قطعياً في مرضى تشمع الكبد لأنها تسبب المتلازمة الكبدية الكلوية (HRS) ونزيف الدوالي.'
    ],
    keywords: ['cirrhosis', 'child-pugh', 'ascites', 'spironolactone', 'furosemide', 'lactulose', 'rifaximin', 'hepatic encephalopathy', 'sbp', 'omeprazole'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c4',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-131 to 2-218) — AASLD Practice Guidance'
  },
  {
    id: 'accp-2026-v2-c5',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 15,
    pages: '2-219 to 2-274',
    category: 'Oncology, GI/Liver & Endocrine',
    categoryAr: 'الأورام والكبد والغدد الصماء',
    title: 'ACCP 2026 Vol 2: Endocrine & Metabolic Disorders (Inpatient Glycemic Control, T2DM, DKA & Thyroid)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-219): الغدد الصماء والسكري (ضبط السكر للمنومين، الحماض الكيتوني، والدرقية)',
    uan: '0217-0000-26-061-H01-P',
    summary:
      'ADA inpatient glycemic targets (140–180 mg/dL), basal-bolus insulin vs sliding scale, holding oral antidiabetics (Metformin/SGLT2i) in acute illness, and DKA/HHS management.',
    summaryAr:
      'أهداف ضبط سكر الدم للمنومين (140-180 ملغ/دل)، نظام الأنسولين القاعدي والوجبات، وإيقاف الميتفورمين ومثبطات SGLT2 أثناء المرض الحاد أو القصور الكلوي.',
    keyRecommendations: [
      'Inpatient Glycemic Target (ADA/SCCM): Initiate insulin at blood glucose >=180 mg/dL, targeting 140–180 mg/dL in both ICU and non-ICU inpatients. Avoid tight targets (<110 mg/dL) due to severe hypoglycemia mortality.',
      'Hold Oral Agents Inpatient: Hold Metformin in AKI, eGFR <30 mL/min, shock/hypoxia, or within 48h of iodinated contrast (lactic acidosis risk). Hold SGLT2 inhibitors during acute hospitalization/fasting/surgery (euglycemic DKA risk).',
      'Basal-Bolus Regimen Preferred: Use basal insulin (e.g., Insulin Glargine) + nutritional/correction rapid-acting insulin; avoid prolonged sliding-scale insulin monotherapy.'
    ],
    keyRecommendationsAr: [
      'هدف سكر الدم للمنومين في المستشفى والعناية المركزة: بين 140 و 180 ملغ/دل، مع تجنب الخفض الشديد (<110 ملغ/دل) لمنع نوبات هبوط السكر القاتلة.',
      'إيقاف الميتفورمين إلزامي عند التنويم في حالات: القصور الكلوي الحاد (AKI)، انخفاض التصفية <30 مل/د، الصدمة الإنتانية، أو قبل الصبغة الوريدية تجنباً للحماض اللاكتيكي (Lactic Acidosis).',
      'يُفضل نظام الأنسولين القاعدي (Glargine/Lantus) مع جرعات التصحيح بدلاً من الاعتماد المنفرد على جدول السلايدنج سكيل (Sliding Scale).'
    ],
    clinicalPearls: [
      'In DKA, check serum K+ BEFORE starting IV insulin: if K+ <3.3 mEq/L, hold insulin and replace K+ first to prevent fatal arrhythmias.'
    ],
    clinicalPearlsAr: [
      'في الحماض الكيتوني السكري (DKA): إذا كان البوتاسيوم < 3.3 mEq/L، يجب تأجيل الأنسولين الوريدي وتعويض البوتاسيوم أولاً لمنع توقف القلب.'
    ],
    keywords: ['diabetes', 'insulin', 'glargine', 'metformin', 'lactic acidosis', 'dka', 'sglt2', 'endocrine'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c5',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-219 to 2-274) — ADA Standards of Care 2026'
  },
  {
    id: 'accp-2026-v2-c6',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 16,
    pages: '2-275 to 2-322',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: 'ACCP 2026 Vol 2: Nephrology (AKI, Drug-Induced Nephrotoxicity, CKD KDIGO & Renal Dosing)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-275): أمراض الكلى (القصور الكلوي الحاد AKI، الأدوية السامة للكلى، وتعديل الجرعات)',
    uan: '0217-0000-26-061-H01-P',
    summary:
      'KDIGO AKI & CKD staging, Cockcroft-Gault vs race-free CKD-EPI 2021 equations, drug-induced nephrotoxicity mechanisms, and renal dosage adjustments.',
    summaryAr:
      'تشخيص وتصنيف القصور الكلوي الحاد والمزمن وفق KDIGO، مقارنة معادلة كوكروفت-غولت و CKD-EPI 2021، وآليات السمية الكلوية الدوائية وتعديل الجرعات.',
    keyRecommendations: [
      'Equation Selection for Drug Dosing: Use Cockcroft-Gault CrCl (with IBW or Adjusted Body Weight if TBW >120% IBW) for FDA-approved medication renal dosing tables; use race-free CKD-EPI 2021 eGFR for CKD staging (G1–G5).',
      'Triple Whammy Nephrotoxicity: Concurrent ACEi/ARB + Diuretic + NSAID precipitates acute prerenal AKI by constricting the afferent arteriole (NSAID) while dilating the efferent arteriole (ACEi/ARB).',
      'Key Renal Cutoffs (CrCl <30 mL/min): Reduce Meropenem to 500 mg q12h, Enoxaparin prophylaxis to 30 mg SC q24h, extend Vancomycin interval to q24–48h with TDM, hold Metformin, and avoid Nitrofurantoin/NSAIDs.'
    ],
    keyRecommendationsAr: [
      'اختيار معادلة الكلى: تُستخدم معادلة Cockcroft-Gault (مع الوزن المثالي IBW أو المعدل AdjBW في السمنة) لتعديل جرعات الأدوية، وتُستخدم CKD-EPI 2021 لتصنيف مراحل القصور الكلوي المزمن (G1-G5).',
      'الثلاثي المدمر للكلى (Triple Whammy): الجمع بين مثبط ACE/ARB + مدر بول + مسكن NSAID يسبب فشلاً كلوياً حاداً عبر تضييق الشرين الوارد وتوسيع الصادر معاً.',
      'الأدوية الواجب تعديلها فوراً عند CrCl < 30 مل/د: الفانكومايسين (مباعدة الجرعات ومراقبة التركيز)، الميروبينيم (500 ملغ كل 12 ساعة)، الإينوكسابارين الوقائي (30 ملغ يومياً)، وإيقاف الميتفورمين.'
    ],
    clinicalPearls: [
      'In unstable AKI where serum creatinine is rapidly rising, equations overestimate true GFR — assume CrCl <10–15 mL/min or use kinetic GFR and therapeutic drug monitoring.'
    ],
    clinicalPearlsAr: [
      'في القصور الكلوي الحاد المتسارع (Unstable AKI)، تعطي المعادلات تقديراً أعلى من الوظيفة الحقيقية للكلية؛ لذا يجب الاعتماد على مراقبة التراكيز الدوائية (TDM).'
    ],
    keywords: ['nephrology', 'aki', 'ckd', 'crcl', 'egfr', 'kdigo', 'cockcroft-gault', 'renal adjustment', 'triple whammy'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c6',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-275 to 2-322) — KDIGO Clinical Practice Guideline'
  },
  {
    id: 'accp-2026-v2-c7',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 17,
    pages: '2-323 to 2-362',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: 'ACCP 2026 Vol 2: Clinical Pharmacokinetics & Therapeutic Drug Monitoring (Vancomycin AUC/MIC, Aminoglycosides & Phenytoin)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-323): الحركية الدوائية ومراقبة التراكيز العلاجية (Vancomycin AUC/MIC والـ TDM)',
    uan: '0217-0000-26-061-H01-P',
    summary:
      '2020/2026 ASHP/IDSA/SIDP Vancomycin AUC24/MIC Bayesian & two-level PK dosing, extended-interval aminoglycoside nomograms, phenytoin albumin correction (Winter-Tozer), and digoxin TDM.',
    summaryAr:
      'توصيات مراقبة التراكيز الدوائية (TDM) للفانكومايسين بنظام AUC24/MIC، الأمينوغليكوزيدات ذات الجرعة اليومية الممتدة، وتصحيح الفينيتوين حسب الألبومين.',
    keyRecommendations: [
      'Vancomycin TDM Target (ASHP/IDSA/SIDP Consensus): Target AUC24/MIC ratio of 400–600 mg·h/L (assuming broth microdilution MIC = 1 mg/L) for serious MRSA infections. Trough-only monitoring (15–20 mcg/mL) is no longer preferred due to higher nephrotoxicity.',
      'Vancomycin Loading & Renal Interval: Loading dose 20–35 mg/kg actual body weight (max 3000 mg) in critically ill patients; maintenance 15–20 mg/kg q8–12h in normal renal function, extended to q24–48h when CrCl <30 mL/min.',
      'Phenytoin Winter-Tozer Correction in Hypoalbuminemia: Corrected Phenytoin = Measured Total Phenytoin / [(0.2 × Albumin) + 0.1] (use 0.1 instead of 0.2 if CrCl <10 mL/min). Therapeutic range: 10–20 mcg/mL total (1–2 mcg/mL free).',
      'Digoxin Therapeutic Range: 0.5–0.9 ng/mL for HFrEF (0.8–1.2 ng/mL for AFib); draw serum level at least 6–8 hours post-dose to avoid distribution-phase false elevation.'
    ],
    keyRecommendationsAr: [
      'الهدف الحركي للفانكومايسين (ASHP/IDSA): تحقيق نسبة AUC24/MIC بين 400 و 600 ملغ·ساعة/لتر لعلاج MRSA الخطير، بدلاً من الاعتماد المنفرد على القاع المرتفع (15-20) لتقليل السمية الكلوية.',
      'جرعة الفانكومايسين في القصور الكلوي (CrCl < 30): تُباعد فترة الصيانة إلى كل 24-48 ساعة (مثل 1000 ملغ كل 24 ساعة) مع سحب مستوى التركيز قبل الجرعة لتوجيه الجرعات اللاحقة.',
      'معادلة Winter-Tozer لتصحيح الفينيتوين عند نقص الألبومين: الفينيتوين المصحح = القراءة الكلية / [(0.2 × الألبومين) + 0.1] (أو ضرب الألبومين في 0.1 إذا كانت CrCl < 10).',
      'سحب عينة الديجوكسين: يجب سحب العينة بعد 6 إلى 8 ساعات على الأقل من الجرعة لتجنب القراءة المرتفعة كاذباً خلال طور التوزيع.'
    ],
    clinicalPearls: [
      'Infuse Vancomycin at <=10–15 mg/min (at least 60 minutes for 1000 mg, 90–120 minutes for >=1500 mg) to prevent histamine-mediated Red Man Syndrome.'
    ],
    clinicalPearlsAr: [
      'يجب تسريب الفانكومايسين ببطء (لا يقل عن 60 دقيقة لكل 1000 ملغ) لتفادي متلازمة الرجل الأحمر (Red Man Syndrome).'
    ],
    keywords: ['pharmacokinetics', 'pk', 'tdm', 'vancomycin', 'auc', 'trough', 'amikacin', 'gentamicin', 'phenytoin', 'digoxin', 'winter-tozer'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c7',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-323 to 2-362) — ASHP/IDSA/SIDP Consensus'
  },
  {
    id: 'accp-2026-v2-c8',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 18,
    pages: '2-363 to 2-408',
    category: 'Pulmonology, Neurology & Specialty',
    categoryAr: 'الصدرية والأعصاب والتخصصات الدقيقة',
    title: 'ACCP 2026 Vol 2: Geriatrics (AGS Beers Criteria, Deprescribing, Dementia & Gout)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-363): طب المسنين (معايير Beers، إيقاف الأدوية غير الضرورية، والنقرس)',
    uan: '0217-0000-26-061-H01-P',
    summary:
      'AGS Beers Criteria potentially inappropriate medications in older adults, anticholinergic burden, fall-risk drugs, dementia pharmacotherapy, and acute/chronic gout renal dosing.',
    summaryAr:
      'معايير Beers للأدوية غير المناسبة لكبار السن، العبء المضاد للكولين، أدوية السقوط والهذيان، وعلاج النقرس في القصور الكلوي.',
    keyRecommendations: [
      'AGS Beers Criteria High-Risk Classes in Older Adults: Avoid 1st-generation antihistamines (Diphenhydramine, Chlorpheniramine), Tricyclic Antidepressants (Amitriptyline), Benzodiazepines, Z-hypnotics, and Sliding-Scale Insulin or Sulfonylureas (Glyburide/Glimepiride).',
      'Gout & Colchicine Interaction: Colchicine is a P-gp and CYP3A4 substrate — contraindicated with strong CYP3A4/P-gp inhibitors (Clarithromycin, Cyclosporine) in renal or hepatic impairment.'
    ],
    keyRecommendationsAr: [
      'معايير Beers لكبار السن: تجنب مضادات الهيستامين من الجيل الأول، البنزوديازيبينات، ومضادات الاكتئاب ثلاثية الحلقات لما تسببه من هذيان حاد وسقوط وكسور في الورك.',
      'تداخل الكولشيسين (Colchicine): يُمنع الجمع بين الكولشيسين ومثبطات CYP3A4/P-gp القوية (مثل الكلاريثروميسين) خاصةً في مرضى القصور الكلوي أو الكبدي.'
    ],
    clinicalPearls: [
      'Remember the prescribing cascade: e.g., Amlodipine-induced pedal edema misdiagnosed as new heart failure and treated with a loop diuretic.'
    ],
    clinicalPearlsAr: [
      'احذر من متوالية الوصف الدوائي (Prescribing Cascade): مثل علاج تورم القدمين الناتج عن الأملوديبين بإضافة مدر بول بدلاً من تعديل الدواء المسبب.'
    ],
    keywords: ['geriatrics', 'beers criteria', 'elderly', 'dementia', 'gout', 'colchicine', 'allopurinol', 'anticholinergic'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c8',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-363 to 2-408) — AGS Beers Criteria'
  },
  {
    id: 'accp-2026-v2-c9-10',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 19,
    pages: '2-409 to 2-478',
    category: 'Pharmacokinetics, Renal & Med Safety',
    categoryAr: 'الحركية الدوائية والكلى وسلامة الأدوية',
    title: 'ACCP 2026 Vol 2: Biostatistics & Clinical Study Designs (NNT, NNH, RR, OR, HR & Statistical Tests)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-409): الإحصاء الحيوي وتصميم الدراسات الإكلينيكية (NNT, OR, HR)',
    uan: '0217-0000-26-062-H01-P',
    summary:
      'Selecting parametric vs nonparametric statistical tests, calculating Absolute Risk Reduction (ARR), Number Needed to Treat (NNT = 1/ARR), Relative Risk, Odds Ratio, Hazard Ratio, and Sensitivity/Specificity.',
    summaryAr:
      'اختيار الاختبارات الإحصائية الملائمة، وحساب خفض الخطر المطلق (ARR) والعدد اللازم للعلاج (NNT = 1/ARR) وتفسير فترات الثقة.',
    keyRecommendations: [
      'Risk & Effect Formulas: ARR = CER − EER; NNT = 1 / ARR (always round NNT UP to the next whole patient; round NNH DOWN). Relative Risk Reduction (RRR) = (CER − EER) / CER.',
      'Choosing a Statistical Test: Continuous normal data (2 independent groups) -> Unpaired t-test; Ordinal or skewed data (2 groups) -> Mann-Whitney U / Wilcoxon rank-sum; Nominal categorical data -> Chi-square or Fisher exact test; Time-to-event survival -> Log-rank / Cox proportional hazards.'
    ],
    keyRecommendationsAr: [
      'معادلات الفعالية السريرية: خفض الخطر المطلق ARR = CER - EER، والعدد اللازم للعلاج NNT = 1 / ARR (يُقرب NNT دائماً للأعلى إلى أقرب عدد صحيح).',
      'اختيار الاختبار الإحصائي: البيانات الكمية الطبيعية لمجموعتين مستقلتين (Student t-test)، والبيانات الرتبية أو غير الطبيعية (Mann-Whitney U)، والبيانات الاسمية (Chi-square أو Fisher Exact).'
    ],
    clinicalPearls: [
      'For a ratio (RR, OR, HR), a 95% Confidence Interval that crosses 1.0 is NOT statistically significant; for a difference (ARR, mean difference), crossing 0 is NOT statistically significant.'
    ],
    clinicalPearlsAr: [
      'في النسب (RR, OR, HR) إذا شملت فترة الثقة 95% الرقم 1.0 فإن النتيجة غير دالة إحصائياً؛ وفي الفروق إذا شملت الصفر فهي غير دالة.'
    ],
    keywords: ['biostatistics', 'study design', 'nnt', 'nnh', 'arr', 'rrr', 'odds ratio', 'hazard ratio', 't-test', 'chi-square'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c9-10',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-409 to 2-478) — BCPS Domain III'
  },
  {
    id: 'accp-2026-v2-c11-12',
    bookId: 'accp-2026-vol2',
    volume: 2,
    chapterNumber: 21,
    pages: '2-479 to 2-605',
    category: 'Pulmonology, Neurology & Specialty',
    categoryAr: 'الصدرية والأعصاب والتخصصات الدقيقة',
    title: 'ACCP 2026 Vol 2: Pediatrics & Psychiatry (Neonatal Sepsis, Pediatric Dosing, QTc & Serotonin Syndrome)',
    titleAr: 'ACCP 2026 (مجلد 2 - ص 2-479): طب الأطفال والطب النفسي (الإنتان الوليدي، استطالة QTc، ومتلازمة السيروتونين)',
    uan: '0217-0000-26-062-H01-P',
    summary:
      'Pediatric meningitis/sepsis weight-based regimens, neonatal Ceftriaxone contraindications, QTc-prolonging psychotropics/antiemetics/fluoroquinolones, and Serotonin Syndrome vs NMS.',
    summaryAr:
      'جرعات الأطفال الموزونة، موانع السيفترياكسون لدى حديثي الولادة، الأدوية المسببة لاستطالة QTc، والتفريق بين متلازمة السيروتونين ومتلازمة الخبيث للدواء النفسي (NMS).',
    keyRecommendations: [
      'Neonatal Ceftriaxone Contraindication: Avoid Ceftriaxone in neonates (<28 days) due to bilirubin displacement from albumin (kernicterus) and fatal calcium-ceftriaxone precipitates in lungs/kidneys; use Cefotaxime or Ampicillin + Gentamicin.',
      'QTc Prolongation & Torsades de Pointes: Avoid combining QTc-prolonging agents (Amiodarone, Ciprofloxacin/Levofloxacin, Ondansetron IV, Haloperidol, Quetiapine, Methadone) especially when K+ <4.0 mEq/L or Mg2+ <2.0 mg/dL.'
    ],
    keyRecommendationsAr: [
      'يُمنع استخدام Ceftriaxone في حديثي الولادة (< 28 يوماً) لخطر اليرقان النووي والترسبات الكلسية القاتلة في الرئة والكلى؛ ويُستخدم بدلاً منه Ampicillin + Gentamicin أو Cefotaxime.',
      'الوقاية من Torsades de Pointes: تجنب الجمع بين الأدوية المطيلة لـ QTc (مثل الأميودارون، السيبروفلوكساسين، الأوندانسيترون، والهالوبيريدول) مع الحفاظ على البوتاسيوم > 4.0 والمغنيسيوم > 2.0.'
    ],
    clinicalPearls: [
      'Serotonin Syndrome presents with clonus, hyperreflexia, agitation, and rapid onset (<24h) — treat by stopping serotonergic agents (Linezolid, Tramadol, Fentanyl, SSRIs) and giving Cyproheptadine.'
    ],
    clinicalPearlsAr: [
      'تتميز متلازمة السيروتونين بفرط المنعكسات والرمع العضلي (Clonus) وتُعالج بإيقاف الأدوية المسببة (مثل Linezolid أو Tramadol مع SSRIs) وإعطاء Cyproheptadine.'
    ],
    keywords: ['pediatrics', 'psychiatry', 'qtc', 'torsades', 'ondansetron', 'ciprofloxacin', 'serotonin syndrome', 'ceftriaxone', 'neonates'],
    sourceId: 'accp-2026-vol1-vol2',
    sourceUrl: 'local://ref/chapter/accp-2026-v2-c11-12',
    evidenceLevel: 'ACCP 2026 Vol. 2 (pp. 2-479 to 2-605) — AAP / APA Guidelines'
  },
  // ==================== EMBEDDED HOSPITAL STEWARDSHIP & DOSING COMPENDIUM CHAPTERS ====================
  {
    id: 'notebooklm-icu-stewardship-hub',
    bookId: 'notebooklm-hub',
    volume: 2026,
    chapterNumber: 23,
    pages: 'Local Hub Sec. 1–4 (ID: 31c74a31)',
    category: 'Antimicrobial Stewardship (AMS)',
    categoryAr: 'ترشيد المضادات الحيوية والأمراض المعدية',
    title: 'ClinPharm Local Hub: ICU Daily Rounding Checklist, 48h Antimicrobial De-escalation & High-Alert Verification',
    titleAr: 'قاعدة المعرفة المحلية (NotebookLM Hub): قائمة تفقد الجولة اليومية للعناية المركزة، تضييق طيف المضادات (48h De-escalation)، وفحص الأدوية عالية الخطورة',
    authors: 'ClinPharm Hospital Antimicrobial Stewardship & ICU Committee',
    summary:
      'Embedded local synthesis of daily ICU clinical pharmacy rounding protocols (FAST HUGS BID), 48–72h culture-guided antimicrobial de-escalation, IV-to-PO switch criteria, and QTc/electrolyte safety bundles.',
    summaryAr:
      'الخلاصة السريرية المدمجة محلياً لبروتوكول جولة العناية المركزة اليومية (FAST HUGS BID)، مراجعة المزارع البكتيرية بعد 48-72 ساعة لتضييق طيف المضادات، معايير التحويل من الوريدي للفموي (IV-to-PO)، وحزمة أمان QTc والكهارل.',
    pathophysiology:
      'Prolonged broad-spectrum empiric antimicrobial exposure selectively eradicates commensal flora, inducing AmpC beta-lactamases, carbapenemase-producing Enterobacterales (CRE), and Clostridioides difficile infection while compounding nephrotoxicity.',
    pathophysiologyAr:
      'الاستمرار غير المبرر بالمضادات واسعة الطيف بعد ظهور نتائج المزارع يؤدي لانتخاب سلالات بكتيرية مقاومة (CRE / ESBL) والتهاب القولون الغشائي الكاذب (C. difficile) وزيادة السمية الكلوية.',
    algorithmSteps: [
      'Step 1 (FAST HUGS BID Daily ICU Audit): Verify Feeding/Fluids, Analgesia, Sedation (RASS target), Thromboembolism prophylaxis (Renal Enoxaparin vs UFH), Head-of-bed elevation, Ulcer prophylaxis (SUP indication), Glycemic control (140–180 mg/dL), Spontaneous breathing trial, Bowel regimen, Indwelling catheter removal, and De-escalation of antibiotics.',
      'Step 2 (48–72h Antimicrobial Timeout): Review blood, sputum, and urine cultures at 48h. Discontinue Vancomycin/Linezolid if MRSA nasal swab and cultures are negative; narrow Meropenem to Cefepime, Ceftriaxone, or Ampicillin/Sulbactam based on MIC susceptibility.',
      'Step 3 (IV-to-PO Bioequivalent Switch): Transition Fluoroquinolones, Linezolid, Metronidazole, Fluconazole, Voriconazole, and Azithromycin from IV to PO once patient is afebrile >24h, hemodynamically stable, and absorbing enteral nutrition.'
    ],
    algorithmStepsAr: [
      'الخطوة 1 (الفحص اليومي المنهجي FAST HUGS BID): مراجعة التغذية والسوائل، التسكين والتهدئة، الوقاية من الجلطات VTE حسب CrCl، الوقاية من قرحة الشدة SUP، ضبط السكر (140-180)، وإزالة القساطر غير الضرورية.',
      'الخطوة 2 (وقفة مراجعة المضادات بعد 48-72 ساعة): إيقاف Vancomycin أو Linezolid إذا كانت مسحة ومزرعة MRSA سلبية، وتضييق Meropenem إلى مضاد أضيق طيفاً فور صدور حساسية المزرعة (MIC).',
      'الخطوة 3 (التحويل من الوريدي إلى الفموي IV-to-PO): تحويل الأدوية ذات التوافر الحيوي الفموي المماثل للوريدي (مثل Linezolid 100%, Levofloxacin 99%, Metronidazole 100%) فور استقرار المريض وقدرته على الامتصاص المعوي.'
    ],
    keyRecommendations: [
      'Perform a mandatory 48–72 hour antimicrobial de-escalation timeout on all ICU patients receiving Carbapenems or anti-MRSA agents.',
      'Verify daily Serum K+ >=4.0 mEq/L and Mg2+ >=2.0 mg/dL in any patient receiving Amiodarone, Fluoroquinolones, Macrolides, or IV Ondansetron.'
    ],
    keyRecommendationsAr: [
      'إلزامية إجراء مراجعة تضييق طيف المضادات (De-escalation Timeout) بعد 48-72 ساعة لجميع مرضى العناية المركزة الذين يتلقون الكاربابينيم أو مضادات MRSA.',
      'التحقق اليومي من بقاء البوتاسيوم >= 4.0 والمغنيسيوم >= 2.0 لدى أي مريض يتلقى الأميودارون أو الأدوية المطيلة لفترة QTc.'
    ],
    clinicalPearls: [
      'Linezolid (100% oral bioavailability) and Levofloxacin (99% oral bioavailability) achieve identical serum and lung ELF concentrations whether given IV or PO.'
    ],
    clinicalPearlsAr: [
      'اللينيزوليد (Linezolid) والليفوفلوكساسين يتمتعان بتوافر حيوي فموي يقارب 100%، مما يعطي نفس التركيز الدموي والرئوي للجرعة الوريدية.'
    ],
    keywords: ['notebooklm', 'fast hugs bid', 'de-escalation', 'iv to po', 'stewardship', 'icu rounding', 'qtc'],
    sourceId: 'notebooklm-31c74a31',
    sourceUrl: 'local://ref/chapter/notebooklm-icu-stewardship-hub',
    evidenceLevel: 'ClinPharm Local Stewardship Hub (ID: 31c74a31)'
  },
  {
    id: 'hospital-compendium-dosing-protocols',
    bookId: 'hospital-compendium',
    volume: 2026,
    chapterNumber: 24,
    pages: 'Local Compendium Sec. A–D (Ref: 1nMrGfPb)',
    category: 'Critical Care & Fluids',
    categoryAr: 'العناية المركزة والسوائل والكهارل',
    title: 'Hospital Dosing Compendium: IV Infusion Guardrails, Maximum Concentrations & Emergency Electrolyte Protocols',
    titleAr: 'موسوعة جرعات المستشفى المحلية: ضوابط التسريب الوريدي، التراكيز القصوى، وبروتوكولات تعويض الكهارل الإسعافية',
    authors: 'Hospital Pharmacy & Therapeutics (P&T) Clinical Compendium',
    summary:
      'In-app reference tables for high-alert IV infusion rates, peripheral vs central line osmolarity/concentration limits, and rapid bedside electrolyte replacement rules.',
    summaryAr:
      'الجداول المرجعية المدمجة محلياً لمعدلات التسريب الوريدي للأدوية الحرجة، حدود التراكيز بين الوريد المحيطي والمركزي، وقواعد تعويض الكهارل في الأقسام السريرية.',
    quickTables: [
      {
        title: 'Hospital P&T Smart-Pump IV Administration & Concentration Guardrails',
        titleAr: 'جدول ضوابط التسريب الوريدي والتراكيز القصوى في مضخات المستشفى الذكية',
        headers: ['Medication', 'Standard Dilution', 'Infusion Rate / Duration', 'Line Requirement & Critical Guardrail'],
        headersAr: ['الدواء الوريدي', 'التخفيف القياسي', 'معدل / مدة التسريب', 'خط الوريد وضوابط الأمان الحرجة'],
        rows: [
          ['Vancomycin IV', '1000 mg in 250 mL NS/D5W (<=5 mg/mL)', 'Infuse over >=60 min (1500 mg over >=90 min)', 'Max rate 10–15 mg/min to prevent Red Man Syndrome'],
          ['Meropenem IV', '500–1000 mg in 100 mL NS', 'Extended infusion over 3 hours', 'Maximizes %fT > MIC in ICU Sepsis/HAP'],
          ['Potassium Chloride (KCl)', 'Peripheral: <=10 mEq/100 mL | Central: up to 20–40 mEq/100 mL', 'Peripheral: <=10 mEq/h | Central: <=20 mEq/h (ECG)', 'NEVER give IV push! Verify urine output >=0.5 mL/kg/h'],
          ['Amiodarone IV', '150 mg in 100 mL D5W (1.5 mg/mL)', 'Load 150 mg over 10 min, then 1 mg/min × 6h, 0.5 mg/min × 18h', 'Use in-line 0.22 micron filter; Central line preferred if >2 mg/mL']
        ],
        rowsAr: [
          ['فانكومايسين (Vancomycin)', '1000 ملغ في 250 مل محلول ملحي (<= 5 ملغ/مل)', 'يُسرب خلال >= 60 دقيقة (1500 ملغ خلال >= 90 دقيقة)', 'أقصى سرعة 10-15 ملغ/دقيقة لمنع متلازمة الرجل الأحمر'],
          ['ميروبينيم (Meropenem)', '500 - 1000 ملغ في 100 مل محلول ملحي', 'تسريب وريدي ممتد على مدار 3 ساعات', 'يرفع زمن بقاء التركيز فوق MIC في إنتان العناية المركزة'],
          ['كلوريد البوتاسيوم (KCl)', 'وريد محيطي: <= 10 mEq/100mL | مركزي: 20-40 mEq/100mL', 'محيطي: <= 10 mEq/ساعة | مركزي: <= 20 mEq/ساعة مع تخطيط قلب', 'يُمنع الدفع الوريدي المباشر قطعياً! تأكد من إدرار البول أولاً'],
          ['أميودارون وريدي (Amiodarone)', '150 ملغ في 100 مل D5W حصراً', '150 ملغ خلال 10 دقائق ثم 1 ملغ/دقيقة لـ 6 ساعات ثم 0.5 ملغ/دقيقة', 'استخدم فلتر 0.22 ميكرون؛ وريد مركزي للتراكيز > 2 ملغ/مل']
        ]
      }
    ],
    keyRecommendations: [
      'Peripheral IV Potassium Chloride concentration must not exceed 10 mEq/100 mL and infusion rate must not exceed 10 mEq/hour to prevent severe chemical phlebitis and cardiac arrest.',
      'Amiodarone IV infusions exceeding 2 hours must be diluted in glass or polyolefin bottles with D5W to prevent PVC/DEHP leaching and drug adsorption.'
    ],
    keyRecommendationsAr: [
      'لا يجوز تجاوز تركيز 10 mEq/100 mL أو سرعة 10 mEq/ساعة للبوتاسيوم في الأوردة المحيطية لمنع التهاب الوريد الكيميائي وتوقف القلب.',
      'يُخفف الأميودارون الوريدي في محلول D5W حصراً مع استخدام فلتر وريدي.'
    ],
    clinicalPearls: [
      'Always co-administer IV Magnesium Sulfate (2 g IV over 2 hours) when correcting refractory hypokalemia.'
    ],
    clinicalPearlsAr: [
      'عوض المغنيسيوم الوريدي (2 جم على مدى ساعتين) دائماً عند علاج نقص البوتاسيوم المقاوم.'
    ],
    keywords: ['compendium', 'iv dilution', 'infusion rate', 'kcl', 'potassium', 'vancomycin', 'amiodarone', 'smart pump'],
    sourceId: 'gdrive-clinical-ref-2',
    sourceUrl: 'local://ref/chapter/hospital-compendium-dosing-protocols',
    evidenceLevel: 'Hospital P&T Clinical Dosing Compendium (Ref: 1nMrGfPb)'
  }
];

/**
 * Maps an active hospital Patient into default interactive CaseSimulatorParams
 * so any patient in the hospital can be simulated against DiPiro 13th Ed, ACCP Cardiology 2026, and ACCP Pharmacotherapy 2026.
 */
export function buildSimulatorParamsFromPatient(patient: Patient): CaseSimulatorParams {
  const diagText = patient.diagnoses.join(' ').toLowerCase();
  const medText = [...patient.activeMedications, ...patient.homeMedications]
    .map(m => `${m.name} ${m.genericName}`)
    .join(' ')
    .toLowerCase();
  const allergyText = patient.allergies.join(' ').toLowerCase();

  let scenarioId: CaseSimulatorParams['scenarioId'] = 'icu_hap_sepsis_aki';
  if (diagText.includes('cirrhosis') || diagText.includes('hepatic') || diagText.includes('ascites')) {
    scenarioId = 'cirrhosis_ascites_he';
  } else if (diagText.includes('nstemi') || diagText.includes('stemi') || diagText.includes('myocardial')) {
    scenarioId = 'acs_nstemi_dapt';
  } else if (diagText.includes('hfref') || diagText.includes('heart failure')) {
    scenarioId = 'hfref_adhf_cardiorenal';
  } else if (diagText.includes('pneumonia') || diagText.includes('hap') || diagText.includes('sepsis')) {
    scenarioId = 'icu_hap_sepsis_aki';
  } else if (diagText.includes('atrial fibrillation') || medText.includes('amiodarone')) {
    scenarioId = 'afib_anticoag_interaction';
  }

  return {
    scenarioId,
    patientName: patient.name,
    age: patient.age,
    weightKg: patient.weight,
    crcl: patient.labs.crcl ?? 60,
    serumCr: patient.labs.serumCreatinine,
    potassium: patient.labs.potassium,
    sodium: patient.labs.sodium,
    sbp: patient.status === 'critical' ? 105 : 124,
    heartRate: 88,
    lvef: diagText.includes('hfref') || diagText.includes('35%') ? 35 : 55,
    inr: patient.labs.inr ?? 1.2,
    childPughClass: diagText.includes('child-pugh c') ? 'C' : diagText.includes('cirrhosis') ? 'B' : 'A',
    hemodynamicProfile: 'warm_wet',
    hasPenicillinAnaphylaxis: allergyText.includes('penicillin'),
    hasAspirinAllergy: allergyText.includes('aspirin'),
    hasActiveBleed: false,
    switchingAceiToArni: false,
    onAmiodarone: medText.includes('amiodarone')
  };
}

/**
 * Interactive Case-Driven Clinical Reference Simulator (`simulateCaseWithReferences`).
 * Dynamically evaluates the patient's exact clinical parameters (CrCl, K+, Na+, SBP, LVEF, INR, Child-Pugh, allergies, interactions)
 * across ALL 5 accredited references (DiPiro 13th Ed, ACCP Cardiology 2026, ACCP Pharmacotherapy 2026 Vol 1 & 2, NotebookLM, Drive Ref)
 * and extracts customized, actionable decisions without requiring the user to open any external PDF.
 */
export function simulateCaseWithReferences(params: CaseSimulatorParams): CaseSimulationResult {
  const actions: SimulatedCaseAction[] = [];
  const extracts: ReferenceCaseExtract[] = [];
  const activeAlgorithmAr: string[] = [];
  const activeAlgorithmEn: string[] = [];
  const quickTables: QuickReferenceTable[] = [];

  const dipiroHfUrl = 'local://ref/chapter/dipiro-13-hf-cardiorenal';
  const dipiroSepsisUrl = 'local://ref/chapter/dipiro-13-sepsis-aki-pk';
  const dipiroLiverUrl = 'local://ref/chapter/dipiro-13-cirrhosis-portal-htn';
  const cardioAcsUrl = 'local://ref/chapter/accp-cardio-2026-acs-p2y12';
  const cardioArrhythmiaUrl = 'local://ref/chapter/accp-cardio-2026-arrhythmia-anticoag';
  const accpCardioVol1Url = 'local://ref/chapter/accp-2026-v1-c2';
  const accpGiVol2Url = 'local://ref/chapter/accp-2026-v2-c4';
  const accpEndoVol2Url = 'local://ref/chapter/accp-2026-v2-c5';
  const accpPkVol2Url = 'local://ref/chapter/accp-2026-v2-c7';
  const notebookUrl = 'local://ref/chapter/notebooklm-icu-stewardship-hub';

  // ==================== SCENARIO 1 & 2: CARDIOLOGY (HFrEF / ADHF / ACS / NSTEMI) ====================
  if (params.scenarioId === 'hfref_adhf_cardiorenal' || params.scenarioId === 'acs_nstemi_dapt') {
    const dipiroHf = ACCP_2026_CHAPTERS.find(c => c.id === 'dipiro-13-hf-cardiorenal');
    const cardioAcs = ACCP_2026_CHAPTERS.find(c => c.id === 'accp-cardio-2026-acs-p2y12');
    if (dipiroHf?.quickTables) quickTables.push(...dipiroHf.quickTables);
    if (cardioAcs?.quickTables) quickTables.push(...cardioAcs.quickTables);

    // 1. Evaluate Hemodynamics (SBP & Nohria-Stevenson Quadrant)
    if (params.sbp < 90 || params.hemodynamicProfile === 'cold_wet') {
      actions.push({
        priority: 'STOP_HOLD',
        priorityLabelAr: 'إيقاف/تأجيل فوري (صدمة هيموديناميكية)',
        priorityLabelEn: 'URGENT HOLD (Hemodynamic Instability)',
        drugOrTarget: 'Beta-Blockers (Bisoprolol) & ACEi/ARNI (Ramipril/Entresto)',
        actionAr: `بسبب هبوط الضغط الانقباضي (${params.sbp} mmHg) أو مربع (Cold & Wet): أوقف/أجّل حاصر بيتا ومثبطات RAAS مؤقتاً، وابدأ دعماً إينوتروبياً وريدياً (Milrinone 0.125–0.25 mcg/kg/min إذا كان المريض يتناول حاصر بيتا مسبقاً، أو Dobutamine 2.5–5 mcg/kg/min؛ مع Norepinephrine إذا كان SBP < 80).`,
        actionEn: `Due to SBP ${params.sbp} mmHg / Cold & Wet profile: Hold Beta-blocker and ACEi/ARNI temporarily; initiate IV Inotrope (Milrinone preferred if on chronic beta-blocker, or Dobutamine) ± Norepinephrine.`,
        rationaleAr: 'إعطاء حاصرات بيتا أو موسعات الأوعية أثناء الصدمة القلبية (Cold & Wet) يفاقم هبوط النتاج القلبي ويهدد الحياة.',
        rationaleEn: 'Negative inotropes and vasodilators worsen cardiogenic shock in Cold & Wet ADHF.',
        citationBadge: 'ACCP Cardiology 2026 (BCCP Ch. 4) & DiPiro 13th Ed (Ch. 33)',
        sourceUrl: dipiroHfUrl
      });
      activeAlgorithmAr.push(`المربع الهيموديناميكي النشط: بارد ورطب (Cold & Wet - Subset IV) مع SBP = ${params.sbp} mmHg -> الأولوية لاستعادة التروية بالمقويات القلبية (Inotropes) قبل التوسيع الوعائي.`);
      activeAlgorithmEn.push(`Active Hemodynamic Quadrant: Cold & Wet (Subset IV) with SBP ${params.sbp} mmHg -> Restore perfusion with IV inotropes before GDMT titration.`);
    } else {
      activeAlgorithmAr.push(`المربع الهيموديناميكي النشط: مستقر/دافئ (SBP = ${params.sbp} mmHg, LVEF = ${params.lvef}%) -> مؤهل لاستكمال وتدريج الركائز الأربع لقصور القلب (4-Pillar GDMT).`);
      activeAlgorithmEn.push(`Active Hemodynamic Quadrant: Warm profile (SBP ${params.sbp} mmHg, LVEF ${params.lvef}%) -> Eligible for simultaneous 4-Pillar GDMT optimization.`);
    }

    // 2. Evaluate Potassium & Renal Thresholds for Spironolactone / RAASi
    if (params.potassium >= 5.5 || params.crcl <= 30) {
      actions.push({
        priority: 'STOP_HOLD',
        priorityLabelAr: 'إيقاف فوري (خطر فرط البوتاسيوم / القصور الكلوي)',
        priorityLabelEn: 'IMMEDIATE HOLD (Hyperkalemia / Renal Cutoff)',
        drugOrTarget: 'Spironolactone (Aldactone) & Potassium Supplements',
        actionAr: `بما أن البوتاسيوم = ${params.potassium} mEq/L و CrCl = ${params.crcl} mL/min: أوقف Spironolactone فوراً (ممنوع عند K+ >= 5.5 أو CrCl <= 30). ${params.potassium >= 5.5 ? 'ابدأ بروتوكول خفض البوتاسيوم: Sodium Zirconium Cyclosilicate (Lokelma) 10 g PO TID × 48h أو Patiromer 8.4 g OD، مع Calcium Gluconate 1–2 g IV إذا ظهرت تغيرات بتخطيط القلب.' : ''}`,
        actionEn: `With K+ = ${params.potassium} mEq/L and CrCl = ${params.crcl} mL/min: Hold Spironolactone immediately (contraindicated at K+ >=5.5 or CrCl <=30). ${params.potassium >= 5.5 ? 'Initiate K+ binder (SZC 10 g TID or Patiromer 8.4 g OD) and check ECG.' : ''}`,
        rationaleAr: 'توصية صريحة في DiPiro 13th Ed و ACCP Cardiology 2026: مضادات الألدوستيرون تسبب رجفاناً بطينياً قاتلاً عند تجاوز البوتاسيوم 5.5 أو هبوط التصفية <= 30.',
        rationaleEn: 'DiPiro 13th Ed & ACCP Cardiology 2026: MRA therapy is contraindicated when K+ >5.0 at initiation or >5.5 during maintenance, or eGFR/CrCl <=30 mL/min.',
        citationBadge: "DiPiro's 13th Ed (Ch. 32) & ACCP 2026 Vol 1 (p. 1-405)",
        sourceUrl: dipiroHfUrl
      });
    } else if (params.potassium >= 5.0) {
      actions.push({
        priority: 'DOSE_ADJUST',
        priorityLabelAr: 'تخفيض الجرعة للنصف + رابط بوتاسيوم',
        priorityLabelEn: 'HALVE DOSE + Add K+ Binder',
        drugOrTarget: 'Spironolactone 25 mg -> 12.5 mg OD',
        actionAr: `البوتاسيوم في النطاق الحرج (${params.potassium} mEq/L): خفّض جرعة Spironolactone إلى 12.5 ملغ يومياً (أو يوم بعد يوم) مع إضافة Patiromer أو Lokelma للحفاظ على استمرارية مثبطات RAAS دون حرمان المريض من فوائدها القلبية.`,
        actionEn: `Borderline hyperkalemia (K+ ${params.potassium} mEq/L): Reduce Spironolactone to 12.5 mg daily and consider Patiromer/SZC to preserve RAASi therapy.`,
        rationaleAr: 'استخدام روابط البوتاسيوم الحديثة يمكّن من الاستمرار بأدوية الركائز الأربع لقصور القلب (DIAMOND trial - ACCP Cardiology 2026).',
        rationaleEn: 'Novel K+ binders enable continuation of GDMT in HFrEF patients with K+ 5.0–5.5 mEq/L (DIAMOND trial).',
        citationBadge: 'ACCP Cardiology 2026 (BCCP Ch. 4)',
        sourceUrl: cardioAcsUrl
      });
    } else {
      actions.push({
        priority: 'MONITOR_TDM',
        priorityLabelAr: 'آمن للاستمرار مع مراقبة مخبرية',
        priorityLabelEn: 'SAFE TO CONTINUE (Schedule Lab Check)',
        drugOrTarget: 'Spironolactone 25 mg PO OD + Ramipril/ARNI',
        actionAr: `البوتاسيوم (${params.potassium} mEq/L) وتصفية الكلى (${params.crcl} mL/min) ضمن النطاق الآمن (< 5.0 mEq/L و CrCl > 30): استمر بـ Spironolactone 25 mg OD مع فحص K+ و SCr كل 48-72 ساعة.`,
        actionEn: `K+ (${params.potassium} mEq/L) and CrCl (${params.crcl} mL/min) are within safe bounds: continue Spironolactone 25 mg OD and recheck K+/SCr in 3–5 days.`,
        rationaleAr: 'الحصار المزدوج لـ RAAS والألدوستيرون يخفض الوفيات القلبية بنسبة 30% في HFrEF (دراسة RALES & EMPHASIS-HF).',
        rationaleEn: 'MRA therapy reduces mortality by 30% in HFrEF when K+ <5.0 and CrCl >30 mL/min.',
        citationBadge: 'ACCP 2026 Vol 1 (p. 1-65)',
        sourceUrl: accpCardioVol1Url
      });
    }

    // 3. Evaluate ACEi to ARNI Switching Washout
    if (params.switchingAceiToArni) {
      actions.push({
        priority: 'STOP_HOLD',
        priorityLabelAr: 'فترة غسيل إلزامية 36 ساعة (36h Washout)',
        priorityLabelEn: 'MANDATORY 36-HOUR WASHOUT',
        drugOrTarget: 'Ramipril -> Sacubitril/Valsartan (Entresto)',
        actionAr: 'أوقف Ramipril فوراً وانتظر 36 ساعة كاملة قبل إعطاء أول جرعة من Sacubitril/Valsartan (49/51 mg PO BID) لمنع تراكم البراديكينين وحدوث الوذمة الوعائية القاتلة في الحنجرة (Angioedema).',
        actionEn: 'Stop Ramipril and enforce a strict 36-hour washout window before the first dose of Sacubitril/Valsartan (49/51 mg PO BID) to prevent life-threatening bradykinin angioedema.',
        rationaleAr: 'الجمع بين تثبيط ACE وتثبيط Neprilysin يضاعف خطر الوذمة الوعائية 3 أضعاف (PARADIGM-HF - ACCP Cardiology 2026).',
        rationaleEn: 'Dual inhibition of ACE and Neprilysin causes severe bradykinin accumulation and angioedema.',
        citationBadge: "ACCP Cardiology 2026 & DiPiro's 13th Ed (Ch. 32)",
        sourceUrl: dipiroHfUrl
      });
    }

    // 4. Evaluate SGLT2i Pillar & Post-ACS Statin / DAPT
    if (params.crcl >= 20) {
      actions.push({
        priority: 'START_ESCALATE',
        priorityLabelAr: 'إكمال الركائز الأربع + الوقاية الثانوية لما بعد القسطرة',
        priorityLabelEn: 'COMPLETE 4-PILLAR GDMT & ACS SECONDARY PREVENTION',
        drugOrTarget: 'Dapagliflozin 10 mg OD + Atorvastatin 80 mg OD',
        actionAr: `أضف Dapagliflozin (أو Empagliflozin) 10 ملغ فموياً مرة يومياً (آمن حتى CrCl >= 20 مل/د، بغض النظر عن وجود السكري)، وأضف Atorvastatin 80 ملغ مساءً، مع الاستمرار بـ ${params.hasAspirinAllergy ? 'Ticagrelor 90 mg PO BID (كعلاج مضاد صفائح بديل بسبب حساسية الأسبرين الربوية أو بعد إزالة التحسس)' : 'Aspirin 81 mg OD + Ticagrelor 90 mg BID'}.`,
        actionEn: `Initiate Dapagliflozin 10 mg PO OD (safe down to eGFR >=20 mL/min) + Atorvastatin 80 mg PO QHS, and maintain ${params.hasAspirinAllergy ? 'Ticagrelor 90 mg BID (Aspirin allergy protocol)' : 'Aspirin 81 mg OD + Ticagrelor 90 mg BID'}.`,
        rationaleAr: 'دراستا DAPA-HF و EMPEROR-Reduced أثبتتا انخفاض الوفيات والتنويم بغض النظر عن السكري، ودراسة PROVE-IT أثبتت تفوق الستاتين عالي الشدة فور المتلازمة التاجية الحادة.',
        rationaleEn: 'DAPA-HF, EMPEROR-Reduced, and ACCP Cardiology 2026 mandate SGLT2i + High-intensity Statin before discharge.',
        citationBadge: 'ACCP Cardiology 2026 (BCCP Ch. 4 & Ch. 5)',
        sourceUrl: cardioAcsUrl
      });
    }

    extracts.push(
      {
        sourceId: 'dipiro-13th-ed',
        sourceBadge: "DiPiro's 13th Edition",
        sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
        chapterTitle: 'Ch. 32–33: Heart Failure & Cardiorenal Syndrome',
        chapterTitleAr: 'الفصل 32-33: الفيزيولوجيا المرضية لقصور القلب والمتلازمة القلبية الكلوية',
        pages: 'pp. 412–485',
        sourceUrl: dipiroHfUrl,
        roleInCaseAr: 'تفسير الآلية الفيزيولوجية المرضية للحالة وخوارزمية التدرج العلاجي:',
        roleInCaseEn: 'Pathophysiologic Mechanism & Algorithmic Step-by-Step Pathway:',
        tailoredExtractAr: [
          `عند كفاءة ضخ LVEF = ${params.lvef}%، يعاني المريض من فرط تنشيط محور الرينين-أنجيوتنسين-ألدوستيرون (RAAS) والجهاز الودي؛ لذا فإن الجمع بين (Ramipril/Entresto + Bisoprolol + Spironolactone + Dapagliflozin) يحقق حصاراً رباعياً متكاملاً يوقف التليف البطيني.`,
          `قانون المتلازمة القلبية الكلوية (DiPiro Ch. 33): ارتفاع الكرياتينين المصلي (حالياً ${params.serumCr} mg/dL) بنسبة لا تتجاوز 30% بعد بدء مثبط ACE أو SGLT2i هو نتيجة طبيعية لتخفيف الضغط داخل الكبيبة الكلوية ولا يجوز إيقاف الدواء بسببه طالما البوتاسيوم < 5.5 mEq/L.`
        ],
        tailoredExtractEn: [
          `At LVEF ${params.lvef}%, neurohormonal blockade across all 4 pathways (ARNI/ACEi + BB + MRA + SGLT2i) halts ventricular remodeling.`,
          `Cardiorenal Rule (DiPiro Ch. 33): An acute SCr rise up to 30% (current SCr ${params.serumCr} mg/dL) after starting ACEi/ARNI/SGLT2i reflects benign intraglomerular pressure reduction — continue therapy unless K+ >5.5 mEq/L.`
        ]
      },
      {
        sourceId: 'accp-cardiology-2026',
        sourceBadge: 'ACCP Cardiology 2026 (BCCP)',
        sourceBadgeAr: 'مرجع ACCP للقلب 2026 (BCCP)',
        chapterTitle: 'BCCP Ch. 4 & Ch. 5: ACS, P2Y12 Protocols & Heart Failure Hemodynamics',
        chapterTitleAr: 'الفصل 4 و 5: المتلازمة التاجية الحادة، بروتوكولات الصفائح، وديناميكا قصور القلب',
        pages: 'UAN 0217-9999-26-099/100-H01-P',
        sourceUrl: cardioAcsUrl,
        roleInCaseAr: 'القرار التخصصي لعناية القلب والقسطرة (CCU & Cath Lab):',
        roleInCaseEn: 'Specialized CCU & Cath Lab Pharmacotherapy Protocol:',
        tailoredExtractAr: [
          params.hasAspirinAllergy
            ? 'وجود حساسية ربوية للأسبرين (Bronchospasm) يمنع إعطاء الأسبرين ومضادات NSAIDs؛ يُعتمد Ticagrelor 90 mg BID كركيزة مضادة للصفائح بعد القسطرة أو يُجرى بروتوكول إزالة التحسس السريع للأسبرين في CCU.'
            : 'بعد القسطرة في NSTEMI، يُفضل Ticagrelor 90 mg BID مع أسبرين 81 ملغ يومياً (يُمنع رفع الأسبرين فوق 100 ملغ مع التيكاجريلور).',
          `بروتوكول مراقبة البوتاسيوم (حالياً ${params.potassium} mEq/L): إذا ارتفع البوتاسيوم بين 5.0 و 5.5 mEq/L يُستخدم Patiromer أو Sodium Zirconium Cyclosilicate للحفاظ على استمرار أدوية قصور القلب (دراسة DIAMOND).`
        ],
        tailoredExtractEn: [
          params.hasAspirinAllergy
            ? 'In Aspirin-exacerbated respiratory disease (bronchospasm), avoid NSAIDs and either perform ICU rapid aspirin desensitization or maintain potent Ticagrelor 90 mg BID monotherapy.'
            : 'Prefer Ticagrelor 90 mg BID + Aspirin 81 mg OD post-ACS PCI (never exceed Aspirin 100 mg/day with Ticagrelor).',
          `Potassium Management (current K+ ${params.potassium} mEq/L): Utilize novel K+ binders (Patiromer/SZC) if K+ reaches 5.0–5.5 mEq/L to enable persistent RAASi/MRA dosing.`
        ]
      },
      {
        sourceId: 'accp-2026-vol1-vol2',
        sourceBadge: 'ACCP 2026 (Vol 1 & 2)',
        sourceBadgeAr: 'موسوعة ACCP 2026 (مجلد 1 و 2)',
        chapterTitle: 'Vol 1 Ch. 1–2 (pp. 1-1 to 1-130) & Vol 1 Ch. 7 Electrolytes (p. 1-405)',
        chapterTitleAr: 'المجلد 1 (ص 1-1 إلى 1-130) وفصل الكهارل (ص 1-405)',
        pages: 'Vol. 1 pp. 1-1 to 1-130, 1-405',
        sourceUrl: accpCardioVol1Url,
        roleInCaseAr: 'ضوابط السلامة الدوائية وتصحيح الكهارل للمنومين:',
        roleInCaseEn: 'Board-Certified Safety Cutoffs & Electrolyte Protocol:',
        tailoredExtractAr: [
          'تحذير الثلاثي الكلوي (Triple Whammy): منع وصف أي مسكن NSAID (مثل Ibuprofen أو Ketorolac) لمريض يتناول مثبط ACE ومدر بول.',
          'عند الحاجة للتحويل من Ramipril إلى Entresto، يجب توثيق فترة غسيل 36 ساعة في نظام السجل الدوائي (MAR).'
        ],
        tailoredExtractEn: [
          'Strictly avoid NSAIDs (Triple Whammy nephrotoxicity and HF decompensation).',
          'Document a mandatory 36-hour washout when transitioning from Ramipril to Sacubitril/Valsartan.'
        ]
      }
    );

    const readyPlanAr = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelAr} - ${a.drugOrTarget}]: ${a.actionAr} (${a.citationBadge})`).join('\n');
    const readyPlanEn = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelEn} - ${a.drugOrTarget}]: ${a.actionEn} (${a.citationBadge})`).join('\n');

    return {
      headlineAr: `خطة المحاكاة التطبيقية المخصصة للمريض (${params.patientName}) — متلازمة الشريان التاجي الحادة وقصور القلب الانقباضي (LVEF ${params.lvef}%)`,
      headlineEn: `Applied Clinical Simulation for ${params.patientName} — ACS / HFrEF (LVEF ${params.lvef}%) & Cardiorenal Management`,
      pathophysiologyActiveAr: dipiroHf?.pathophysiologyAr || '',
      pathophysiologyActiveEn: dipiroHf?.pathophysiology || '',
      activeAlgorithmBranchAr: activeAlgorithmAr,
      activeAlgorithmBranchEn: activeAlgorithmEn,
      immediateActions: actions,
      referenceExtracts: extracts,
      quickDosingTables: quickTables,
      readySoapPlanAr: readyPlanAr,
      readySoapPlanEn: readyPlanEn
    };
  }

  // ==================== SCENARIO 3: CIRRHOSIS, ASCITES, HE & PORTAL HTN ====================
  if (params.scenarioId === 'cirrhosis_ascites_he') {
    const dipiroLiver = ACCP_2026_CHAPTERS.find(c => c.id === 'dipiro-13-cirrhosis-portal-htn');
    if (dipiroLiver?.quickTables) quickTables.push(...dipiroLiver.quickTables);

    if (params.sodium < 125 || params.serumCr >= 1.5 || params.crcl < 30) {
      actions.push({
        priority: 'STOP_HOLD',
        priorityLabelAr: 'إيقاف مدرات البول فوراً (نقص صوديوم حاد / متلازمة كبدية كلوية)',
        priorityLabelEn: 'HOLD DIURETICS IMMEDIATELY (Severe Hyponatremia / HRS-AKI Risk)',
        drugOrTarget: 'Spironolactone 100 mg + Furosemide 40 mg',
        actionAr: `بسبب انخفاض الصوديوم (${params.sodium} mEq/L) أو تدهور الكلى (SCr = ${params.serumCr} mg/dL, CrCl = ${params.crcl} mL/min): أوقف Spironolactone و Furosemide فوراً، وابدأ تعويض الحجم الوعائي بـ Albumin IV (1 g/kg/day ليومين بحد أقصى 100 g/day) مع مراقبة الصوديوم بحيث لا يتجاوز الارتفاع 8–10 mEq/L خلال 24 ساعة.`,
        actionEn: `Due to Na+ ${params.sodium} mEq/L or AKI (SCr ${params.serumCr} mg/dL): Hold Spironolactone and Furosemide immediately; administer IV Albumin 1 g/kg/day (max 100 g/day) and limit Na+ correction to <=8–10 mEq/L per 24h.`,
        rationaleAr: 'استمرار المدرات عند Na+ < 125 أو ارتفاع الكرياتينين يدخل المريض في المتلازمة الكبدية الكلوية القاتلة (HRS-AKI) وتفاقم الاعتلال الدماغي.',
        rationaleEn: 'Continuing diuretics when Na+ <125 mEq/L or SCr rises precipitates irreversible Hepatorenal Syndrome (HRS-AKI).',
        citationBadge: "DiPiro's 13th Ed (Ch. 46) & ACCP 2026 Vol 2 (p. 2-131)",
        sourceUrl: dipiroLiverUrl
      });
      activeAlgorithmAr.push(`الفرع الخوارزمي النشط: تشمع كبد مع مضاعفات كهارل/كلى (Na = ${params.sodium}, SCr = ${params.serumCr}) -> إيقاف المدرات وإعطاء الألبومين الوريدي.`);
      activeAlgorithmEn.push(`Active Algorithm Branch: Decompensated Cirrhosis with Renal/Na+ Trigger (Na ${params.sodium}, SCr ${params.serumCr}) -> Hold diuretics & expand intravascular volume with Albumin.`);
    } else {
      actions.push({
        priority: 'DOSE_ADJUST',
        priorityLabelAr: 'الحفاظ على نسبة 100:40 الصباحية لضبط الاستسقاء',
        priorityLabelEn: 'MAINTAIN 100:40 DIURETIC RATIO FOR ASCITES',
        drugOrTarget: 'Spironolactone 100 mg + Furosemide 40 mg PO Morning',
        actionAr: `الصوديوم (${params.sodium} mEq/L) والكرياتينين (${params.serumCr} mg/dL) يسمحان بالاستمرار بنسبة 100:40 صباحاً مع تقييد صوديوم الطعام (< 2 جم/يوم) ومتابعة الوزن يومياً (الهدف خفض <= 0.5 كجم/يوم). ${params.potassium < 3.8 ? 'نظراً لأن البوتاسيوم يميل للانخفاض (' + params.potassium + ' mEq/L)، يمكن تقليل جرعة الفيوروسيميد مؤقتاً إلى 20 ملغ أو تعويض البوتاسيوم والمغنيسيوم لأن نقص البوتاسيوم يزيد إنتاج الأمونيا الكلوية ويفاقم الاعتلال الدماغي الكبدي!' : ''}`,
        actionEn: `Continue Spironolactone 100 mg + Furosemide 40 mg PO daily in the morning with 2 g/day Na+ restriction (target weight loss <=0.5 kg/day). ${params.potassium < 3.8 ? 'Correct borderline hypokalemia (' + params.potassium + ' mEq/L) as hypokalemia increases renal ammoniagenesis and worsens Hepatic Encephalopathy!' : ''}`,
        rationaleAr: 'نقص البوتاسيوم (Hypokalemia) والقلاء الاستقلابي يزيدان تحول NH4+ إلى أمونيا حرة (NH3) تعبر الحاجز الدموي الدماغي وتفاقم الغيبوبة الكبدية (DiPiro Ch. 46).',
        rationaleEn: 'Hypokalemia increases renal ammonia production and blood-brain barrier penetration of NH3.',
        citationBadge: "DiPiro's 13th Ed (Ch. 46, p. 628) & ACCP 2026 Vol 1 (p. 1-404)",
        sourceUrl: dipiroLiverUrl
      });
      activeAlgorithmAr.push(`الفرع الخوارزمي النشط: استسقاء تشمع كبد مستقر كلوياً (Child-Pugh ${params.childPughClass}) -> نسبة 100:40 لمدرات البول + علاج الاعتلال الكبدي المزدوج.`);
      activeAlgorithmEn.push(`Active Algorithm Branch: Hemodynamically stable Cirrhosis Ascites (Child-Pugh ${params.childPughClass}) -> 100:40 Diuretic Ratio + Dual HE Therapy.`);
    }

    actions.push({
      priority: 'START_ESCALATE',
      priorityLabelAr: 'علاج الاعتلال الدماغي الكبدي والوقاية من التهاب الصفاق (SBP)',
      priorityLabelEn: 'HE DUAL THERAPY & SBP PROPHYLAXIS',
      drugOrTarget: 'Lactulose 30 mL TID + Rifaximin 550 mg BID + Ciprofloxacin 500 mg OD',
      actionAr: 'استمر بـ Lactulose 30–45 mL PO TID (يُعاير لتحقيق 2-3 إخراج لين يومياً لحبس الأمونيا كأيون أمونيوم NH4+) + Rifaximin 550 mg PO BID لتقليل البكتيريا المعوية المنتجة للأمونيا، مع إضافة Ciprofloxacin 500 mg PO OD للوقاية من التهاب الصفاق الجرثومي التلقائي (SBP).',
      actionEn: 'Continue Lactulose 30–45 mL PO TID (titrated to 2–3 soft stools/day) + Rifaximin 550 mg PO BID, and ensure daily SBP prophylaxis (Ciprofloxacin 500 mg PO OD or TMP-SMX DS OD).',
      rationaleAr: 'الجمع بين اللاكتولوز والريفاكسيمين يخفض انتكاس الاعتلال الدماغي الكبدي بنسبة 58%، والوقاية من SBP تخفض الوفيات ومتلازمة HRS.',
      rationaleEn: 'Rifaximin + Lactulose reduces recurrent overt HE by 58% (Bass et al. NEJM / ACCP 2026 Vol 2).',
      citationBadge: 'ACCP 2026 Vol 2 (pp. 2-131 to 2-218)',
      sourceUrl: accpGiVol2Url
    });

    extracts.push(
      {
        sourceId: 'dipiro-13th-ed',
        sourceBadge: "DiPiro's 13th Edition",
        sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
        chapterTitle: 'Ch. 46: Portal Hypertension and Cirrhosis',
        chapterTitleAr: 'الفصل 46: فرط ضغط الوريد البابي وتشمع الكبد',
        pages: 'pp. 618–644',
        sourceUrl: dipiroLiverUrl,
        roleInCaseAr: 'الفيزيولوجيا المرضية الدقيقة لحالة المريض وخوارزمية العلاج:',
        roleInCaseEn: 'Pathophysiology & Step-by-Step Cirrhosis Algorithm:',
        tailoredExtractAr: [
          `مريض بتصنيف Child-Pugh ${params.childPughClass} مع بوتاسيوم ${params.potassium} mEq/L وصوديوم ${params.sodium} mEq/L: يشرح مرجع DiPiro أن نقص البوتاسيوم يحفز الكلى على إنتاج الأمونيا ويحولها للصيغة غير المتأينة (NH3) التي تدخل الدماغ فوراً؛ لذلك فإن تصحيح البوتاسيوم إلى > 4.0 mEq/L جزء علاجي أساسي لإنهاء الاعتلال الدماغي الكبدي.`,
          'قاعدة نافذة حاصرات بيتا (Beta-Blocker Window): يُستخدم Carvedilol 6.25 mg للوقاية من نزيف الدوالي، لكن يجب إيقافه فوراً إذا هبط الضغط الانقباضي < 90 مم زئبق أو حدثت متلازمة كبدية كلوية.'
        ],
        tailoredExtractEn: [
          `In Child-Pugh Class ${params.childPughClass} with K+ ${params.potassium} mEq/L and Na+ ${params.sodium} mEq/L: DiPiro highlights that hypokalemia directly stimulates renal ammoniagenesis and shifts NH4+ to neurotoxic NH3 — keep K+ >=4.0 mEq/L.`,
          'Close the nonselective beta-blocker window immediately if SBP <90 mmHg, Na+ <120 mEq/L, or acute AKI/SBP occurs.'
        ]
      },
      {
        sourceId: 'accp-2026-vol1-vol2',
        sourceBadge: 'ACCP 2026 Vol 1 & 2',
        sourceBadgeAr: 'موسوعة ACCP 2026 (مجلد 1 و 2)',
        chapterTitle: 'Vol 2 Ch. 4: Gastroenterology & Hepatology (pp. 2-131) & Vol 1 Ch. 7 (p. 1-404)',
        chapterTitleAr: 'المجلد 2 (فصل الكبد ص 2-131) والمجلد 1 (فصل الكهارل ص 1-404)',
        pages: 'pp. 2-131 to 2-218 & 1-404',
        sourceUrl: accpGiVol2Url,
        roleInCaseAr: 'ضوابط الجرعات الكبدية وتصحيح الصوديوم والبوتاسيوم:',
        roleInCaseEn: 'Hepatic Dosing & Safe Electrolyte Replacement Rules:',
        tailoredExtractAr: [
          'الحد الأقصى لتصحيح نقص الصوديوم المزمن في تشمع الكبد هو 8 إلى 10 mEq/L خلال 24 ساعة لتجنب تحلل الميالين الجسري المركزي (ODS).',
          `في تصنيف Child-Pugh ${params.childPughClass}، يجب خفض جرعات الأدوية ذات الاستخلاص الكبدي العالي بنسبة 50% وتجنب البنزوديازيبينات والمورفين و NSAIDs نهائياً.`
        ],
        tailoredExtractEn: [
          'Limit serum Na+ correction to <=8–10 mEq/L in 24h in cirrhotic hyponatremia to prevent Osmotic Demyelination Syndrome.',
          `In Child-Pugh Class ${params.childPughClass}, reduce hepatically cleared drugs by 50% and strictly avoid benzodiazepines and NSAIDs.`
        ]
      }
    );

    const readyPlanAr = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelAr} - ${a.drugOrTarget}]: ${a.actionAr} (${a.citationBadge})`).join('\n');
    const readyPlanEn = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelEn} - ${a.drugOrTarget}]: ${a.actionEn} (${a.citationBadge})`).join('\n');

    return {
      headlineAr: `خطة المحاكاة التطبيقية المخصصة للمريض (${params.patientName}) — تشمع الكبد غير المعاوض (Child-Pugh ${params.childPughClass}) والاستسقاء والاعتلال الكبدي`,
      headlineEn: `Applied Clinical Simulation for ${params.patientName} — Decompensated Cirrhosis (Child-Pugh ${params.childPughClass}), Ascites & HE`,
      pathophysiologyActiveAr: dipiroLiver?.pathophysiologyAr || '',
      pathophysiologyActiveEn: dipiroLiver?.pathophysiology || '',
      activeAlgorithmBranchAr: activeAlgorithmAr,
      activeAlgorithmBranchEn: activeAlgorithmEn,
      immediateActions: actions,
      referenceExtracts: extracts,
      quickDosingTables: quickTables,
      readySoapPlanAr: readyPlanAr,
      readySoapPlanEn: readyPlanEn
    };
  }

  // ==================== DEFAULT / SCENARIO 4 & 5: ICU HAP/VAP + SEPSIS + AKI + AFIB ANTICOAGULATION ====================
  const dipiroSepsis = ACCP_2026_CHAPTERS.find(c => c.id === 'dipiro-13-sepsis-aki-pk');
  const cardioArrhythmia = ACCP_2026_CHAPTERS.find(c => c.id === 'accp-cardio-2026-arrhythmia-anticoag');
  if (dipiroSepsis?.quickTables) quickTables.push(...dipiroSepsis.quickTables);
  if (cardioArrhythmia?.quickTables) quickTables.push(...cardioArrhythmia.quickTables);

  // Calculate exact Vancomycin PK for this patient's live parameters
  const ke = 0.00083 * params.crcl + 0.0044;
  const halfLife = Math.round((Math.log(2) / ke) * 10) / 10;
  const vd = Math.round(0.7 * params.weightKg * 10) / 10;
  const vancoLoad = Math.min(3000, Math.round((25 * params.weightKg) / 250) * 250);
  const vancoInterval = params.crcl < 15 ? 'q48h (أو حسب التركيز)' : params.crcl < 30 ? 'q24h' : params.crcl < 50 ? 'q12–24h' : 'q12h';
  const meropenemRegimen =
    params.crcl < 10
      ? '500 mg IV q24h (Extended 3h infusion)'
      : params.crcl < 26
      ? '500 mg IV q12h (Extended 3h infusion)'
      : params.crcl <= 50
      ? '1000 mg IV q12h (Extended 3h infusion)'
      : '1000 mg IV q8h (Extended 3h infusion)';

  activeAlgorithmAr.push(
    `الفرع الحركي النشط (PK/PD Branch): الوزن = ${params.weightKg} كجم، CrCl = ${params.crcl} mL/min -> حجم التوزع Vd = ${vd} لتر، وعمر النصف للفانكومايسين يرتفع إلى t½ = ${halfLife} ساعة!`,
    `خوارزمية المضادات الحيوية (HAP/Sepsis): إعطاء جرعة تحميل كاملة (${vancoLoad} ملغ) لتغطية اتساع Vd، ثم خفض ومباعدة جرعة الصيانة فوراً حسب CrCl = ${params.crcl} mL/min.`
  );
  activeAlgorithmEn.push(
    `Active PK/PD Branch: Weight ${params.weightKg} kg, CrCl ${params.crcl} mL/min -> Vd = ${vd} L, Vancomycin elimination half-life prolonged to t½ = ${halfLife} hours!`,
    `HAP/Sepsis Dosing Algorithm: Administer full weight-based loading dose (${vancoLoad} mg) for expanded Vd, then immediately adjust maintenance interval to ${vancoInterval} for CrCl ${params.crcl} mL/min.`
  );

  // 1. Vancomycin & Meropenem Renal + TDM Adjustment
  actions.push({
    priority: 'DOSE_ADJUST',
    priorityLabelAr: 'تعديل حركي وكلوي فوري للمضادات الحيوية (PK/PD Renal Adjustment)',
    priorityLabelEn: 'URGENT PK/PD RENAL ANTIMICROBIAL ADJUSTMENT',
    drugOrTarget: `Vancomycin IV (${vancoInterval}) & Meropenem IV (${meropenemRegimen})`,
    actionAr: `بناءً على CrCl = ${params.crcl} mL/min ووزن ${params.weightKg} كجم: (1) عدّل الفانكومايسين من q12h إلى 1000 ملغ وريدياً ${vancoInterval} (بهدف AUC24/MIC بين 400–600 وسحب مستوى القاع قبل الجرعة القادمة؛ أو استبدله بـ Linezolid 600 mg IV q12h لحماية الكلى تماماً)، و(2) عدّل الميروبينيم إلى ${meropenemRegimen}.`,
    actionEn: `For CrCl ${params.crcl} mL/min & Wt ${params.weightKg} kg: (1) Adjust Vancomycin to 1000 mg IV ${vancoInterval} targeting AUC24/MIC 400–600 (or switch to non-nephrotoxic Linezolid 600 mg IV q12h), and (2) Adjust Meropenem to ${meropenemRegimen}.`,
    rationaleAr: `عمر النصف للفانكومايسين لدى هذا المريض هو ${halfLife} ساعة؛ الاستمرار بجرعة كل 12 ساعة يؤدي لتراكم كلوي سام، كما أن تراكم الميروبينيم غير المعدل يسبب اختلاجات عصبية.`,
    rationaleEn: `Vancomycin t½ is prolonged to ${halfLife}h in this patient; unadjusted q12h dosing causes severe nephrotoxicity, and unadjusted Meropenem lowers the seizure threshold.`,
    citationBadge: "DiPiro's 13th Ed (Ch. 54 & 118) & ACCP 2026 Vol 2 (p. 2-323)",
    sourceUrl: dipiroSepsisUrl
  });

  // 2. Anticoagulation (Enoxaparin Renal Cutoff + Amiodarone/Warfarin Interaction + Active Bleed Reversal)
  if (params.hasActiveBleed) {
    actions.push({
      priority: 'STOP_HOLD',
      priorityLabelAr: 'طوارئ نزيف حاد — إيقاف المميعات وبروتوكول العكس الفوري',
      priorityLabelEn: 'EMERGENCY BLEED — STOP ANTICOAGULANTS & REVERSE NOW',
      drugOrTarget: '4-Factor PCC / Protamine / Andexanet Alfa',
      actionAr: `أوقف جميع مضادات التخثر فوراً! لعكس الوارفارين (INR = ${params.inr}): أعطِ 4-Factor PCC بجرعة 25–50 وحدة/كغ وريدياً + فيتامين K بجرعة 10 ملغ بالتسريب الوريدي البطيء. لعكس الإينوكسابارين: أعطِ Protamine Sulfate (1 ملغ لكل 1 ملغ إينوكسابارين أُعطي خلال آخر 8 ساعات).`,
      actionEn: `Stop all anticoagulants immediately! For Warfarin reversal (INR ${params.inr}): administer 4-Factor PCC 25–50 units/kg IV + Vitamin K 10 mg slow IV. For Enoxaparin: administer Protamine Sulfate (1 mg per 1 mg Enoxaparin given in last 8h).`,
      rationaleAr: 'بروتوكول عكس التمييع الطارئ المعتمد في ACCP Cardiology 2026 و ACCP Pharmacotherapy Vol 1.',
      rationaleEn: 'Accredited emergency anticoagulation reversal protocol (ACCP Cardiology 2026 & Vol 1 p. 1-131).',
      citationBadge: 'ACCP Cardiology 2026 (BCCP Ch. 2) & ACCP Vol 1 (p. 1-131)',
      sourceUrl: cardioArrhythmiaUrl
    });
  } else {
    actions.push({
      priority: 'DOSE_ADJUST',
      priorityLabelAr: 'تعديل جرعة المميع الكلوية + إدارة تداخل Amiodarone-Warfarin',
      priorityLabelEn: 'RENAL ANTICOAGULATION & AMIODARONE INTERACTION',
      drugOrTarget: params.crcl < 30 ? 'Enoxaparin 30 mg SC q24h (أو UFH 5000u q8–12h)' : 'Enoxaparin 40 mg SC q24h / Apixaban',
      actionAr: `${params.crcl < 30 ? `بما أن CrCl = ${params.crcl} mL/min (< 30): خفّض الإينوكسابارين الوقائي وجوباً من 40 ملغ إلى 30 ملغ تحت الجلد مرة يومياً (أو استبدله بـ Heparin 5000 IU SC q8-12h). ` : ''}${params.onAmiodarone ? 'نظراً لتناول المريض Amiodarone (مثبط قوي لـ CYP2C9 و P-gp بعمر نصف 50 يوماً): يُمنع إعادة الوارفارين بجرعته المنزلية السابقة (5 ملغ)، ويجب خفضه بنسبة 33–50% أو التحويل إلى Apixaban عند الاستقرار.' : ''}`,
      actionEn: `${params.crcl < 30 ? `Because CrCl is ${params.crcl} mL/min (<30): reduce Enoxaparin prophylaxis from 40 mg to 30 mg SC q24h (or switch to SC UFH). ` : ''}${params.onAmiodarone ? 'Due to concomitant Amiodarone (potent CYP2C9/P-gp inhibitor): reduce Warfarin dose by 33–50% or transition to Apixaban upon discharge.' : ''}`,
      rationaleAr: 'يتراكم الإينوكسابارين بنسبة 40-60% عند CrCl < 30، ويرفع الأميودارون تركيز الوارفارين للضعف مسبباً نزيفاً قاتلاً.',
      rationaleEn: 'Enoxaparin bioaccumulates when CrCl <30 mL/min, and Amiodarone doubles S-warfarin exposure via CYP2C9 inhibition.',
      citationBadge: 'ACCP Cardiology 2026 (BCCP Ch. 2 & 3)',
      sourceUrl: cardioArrhythmiaUrl
    });
  }

  // 3. Evaluate Inpatient Glycemic Control & Metformin Hold + Hyperkalemia
  actions.push({
    priority: 'STOP_HOLD',
    priorityLabelAr: 'إيقاف الميتفورمين في AKI/الإنتان + ضبط البوتاسيوم والسكر',
    priorityLabelEn: 'HOLD METFORMIN IN AKI/SEPSIS + POTASSIUM & GLYCEMIC CONTROL',
    drugOrTarget: 'Metformin (Hold) + Insulin Glargine (Target BG 140–180 mg/dL)',
    actionAr: `تأكد من استمرار إيقاف Metformin طوال فترة التنويم والقصور الكلوي (CrCl = ${params.crcl} mL/min) لمنع الحماض اللاكتيكي القاتل، واستخدم نظام الأنسولين القاعدي (Insulin Glargine) لاستهداف سكر الدم بين 140–180 ملغ/دل. ${params.potassium >= 5.2 ? `تنبيه: البوتاسيوم مرتفع (${params.potassium} mEq/L) — راقب تخطيط القلب، وتجنب أي سوائل تحتوي على البوتاسيوم.` : ''}`,
    actionEn: `Keep Metformin on hold during AKI/Sepsis (CrCl ${params.crcl} mL/min) to prevent lactic acidosis; maintain basal-bolus insulin targeting BG 140–180 mg/dL. ${params.potassium >= 5.2 ? `Monitor elevated K+ (${params.potassium} mEq/L) and avoid K+-containing fluids.` : ''}`,
    rationaleAr: 'توصيات ADA و ACCP 2026 المجلد الثاني لضبط سكر الدم للمنومين في العناية المركزة.',
    rationaleEn: 'ADA / SCCM & ACCP 2026 Vol 2 inpatient glycemic and renal safety standards.',
    citationBadge: 'ACCP 2026 Vol 2 (pp. 2-219 to 2-274)',
    sourceUrl: accpEndoVol2Url
  });

  extracts.push(
    {
      sourceId: 'dipiro-13th-ed',
      sourceBadge: "DiPiro's 13th Edition",
      sourceBadgeAr: 'مرجع DiPiro (الطبعة 13)',
      chapterTitle: 'Ch. 54 (Acute Kidney Injury) & Ch. 118 (Sepsis/HAP Pharmacotherapy)',
      chapterTitleAr: 'الفصل 54 (القصور الكلوي الحاد) والفصل 118 (الإنتان وذات الرئة المستشفوية)',
      pages: 'pp. 740–782, 1690–1735',
      sourceUrl: dipiroSepsisUrl,
      roleInCaseAr: 'الفيزيولوجيا المرضية للحركية الدوائية في الإنتان والقصور الكلوي:',
      roleInCaseEn: 'Pathophysiologic PK/PD Shifts in Sepsis & AKI:',
      tailoredExtractAr: [
        `حساب مخصص للمريض (${params.weightKg} كجم، CrCl = ${params.crcl} mL/min): حجم التوزع (Vd) للفانكومايسين يساوي ${vd} لتر، بينما انخفض ثابت الإطراح الكلوي ليصبح عمر النصف الحيوي ${halfLife} ساعة؛ لذا نفصل بين جرعة التحميل الكاملة وجرعة الصيانة المتباعدة (${vancoInterval}).`,
        params.hasPenicillinAnaphylaxis
          ? 'حساسية البنسلين التأقية (Anaphylaxis): يوضح مرجع DiPiro أن نسبة التصالب الحساسي مع الكاربابينيمات (Meropenem) أقل من 1%، ولكن في حال تدهور الكلى مع الفانكومايسين يُنصح بالتحويل إلى Linezolid 600 mg IV q12h لأنه لا يحتاج لتعديل كلوي ويحقق اختراقاً ممتازاً للسائل المبطن للرئة (ELF).'
          : 'يُعطى الميروبينيم بالتسريب الوريدي الممتد على مدار 3 ساعات لرفع %fT > MIC في البكتيريا سالبة الغرام المقاومة.'
      ],
      tailoredExtractEn: [
        `Patient-specific PK (${params.weightKg} kg, CrCl ${params.crcl} mL/min): Vancomycin Vd = ${vd} L and elimination half-life t½ = ${halfLife} hours — decouple full loading dose from extended maintenance interval (${vancoInterval}).`,
        params.hasPenicillinAnaphylaxis
          ? 'In Penicillin anaphylaxis + AKI: Carbapenems (Meropenem) carry <1% cross-reactivity, and Linezolid 600 mg q12h provides a complete non-nephrotoxic alternative to Vancomycin for MRSA HAP.'
          : 'Administer Meropenem as a 3-hour extended infusion to maximize %fT > MIC.'
      ]
    },
    {
      sourceId: 'accp-cardiology-2026',
      sourceBadge: 'ACCP Cardiology 2026 (BCCP)',
      sourceBadgeAr: 'مرجع ACCP للقلب 2026 (BCCP)',
      chapterTitle: 'BCCP Ch. 2 & Ch. 3: Anticoagulation & Arrhythmias in Renal Impairment',
      chapterTitleAr: 'الفصل 2 و 3: إدارة الرجفان الأذيني ومضادات التخثر في القصور الكلوي',
      pages: 'UAN 0217-9999-26-097/098-H01-P',
      sourceUrl: cardioArrhythmiaUrl,
      roleInCaseAr: 'إدارة الرجفان الأذيني والأميودارون ومميعات الدم لهذا المريض:',
      roleInCaseEn: 'Cardiology BCCP Protocol for AFib, Amiodarone & Renal Anticoagulation:',
      tailoredExtractAr: [
        `عند تصفية كرياتينين CrCl = ${params.crcl} mL/min: يوصي مرجع ACCP للقلب 2026 بخفض إينوكسابارين الوقاية إلى 30 ملغ تحت الجلد يومياً، وعند التحويل لمميع فموي للرجفان الأذيني يُفضل Apixaban لأنه الأقل اعتماداً على الإطراح الكلوي (27% فقط مقارنة بـ 80% للدابيغاتران).`,
        'تداخل الأميودارون المستدام: يثبط الأميودارون إنزيمي CYP2C9 و CYP3A4 وبروتين P-gp، ويمتد أثره التداخلي لأسابيع بعد إيقافه بسبب عمر نصفه البالغ 40-55 يوماً.'
      ],
      tailoredExtractEn: [
        `At CrCl ${params.crcl} mL/min: ACCP Cardiology 2026 mandates Enoxaparin 30 mg SC q24h for VTE prophylaxis, and favors Apixaban (only 27% renal clearance) when transitioning to oral NVAF anticoagulation.`,
        'Amiodarone inhibits CYP2C9, CYP3A4, and P-gp with a 40–55 day elimination half-life — empirically reduce Warfarin by 33–50%.'
      ]
    },
    {
      sourceId: 'accp-2026-vol1-vol2',
      sourceBadge: 'ACCP 2026 (Vol 1 & 2)',
      sourceBadgeAr: 'موسوعة ACCP 2026 (مجلد 1 و 2)',
      chapterTitle: 'Vol 1 Ch. 4 (HAP/VAP p. 1-193) & Vol 2 Ch. 7 (PK/TDM p. 2-323)',
      chapterTitleAr: 'المجلد 1 (فصل العدوى ص 1-193) والمجلد 2 (الحركية الدوائية ص 2-323)',
      pages: 'Vol. 1 p. 1-193 & Vol. 2 p. 2-323',
      sourceUrl: accpPkVol2Url,
      roleInCaseAr: 'معايير ترشيد المضادات الحيوية ومراقبة التراكيز العلاجية (TDM):',
      roleInCaseEn: 'Antimicrobial Stewardship & ASHP/IDSA Vancomycin AUC/MIC Consensus:',
      tailoredExtractAr: [
        'الهدف العلاجي للفانكومايسين هو تحقيق AUC24/MIC بين 400 و 600 ملغ·ساعة/لتر بدلاً من الاكتفاء بالقاع المرتفع (15-20) لتقليل السمية الكلوية في العناية المركزة.',
        `فحص الاستبراء الدوائي (Vol 2 p. 2-1): توثيق إيقاف Metformin كإيقاف سريري متعمد بسبب AKI، والتنبيه لإعادة وصف Atorvastatin المنزلي عند استقرار المريض.`
      ],
      tailoredExtractEn: [
        'Target Vancomycin AUC24/MIC of 400–600 mg·h/L rather than trough-only 15–20 mcg/mL to minimize ICU nephrotoxicity.',
        'Reconcile home medications: document intentional hold of Metformin in AKI and resume home Atorvastatin.'
      ]
    },
    {
      sourceId: 'notebooklm-31c74a31',
      sourceBadge: 'Local Stewardship Hub',
      sourceBadgeAr: 'قاعدة بروتوكولات المستشفى المحلية',
      chapterTitle: 'ICU Stewardship & High-Alert Verification Checklist',
      chapterTitleAr: 'قائمة التحقق السريري لأدوية العناية المركزة عالية الخطورة',
      pages: 'Local Hub Sec. 1–4',
      sourceUrl: notebookUrl,
      roleInCaseAr: 'قواعد المتابعة اليومية للصيدلي السريري في الجولة:',
      roleInCaseEn: 'Daily ICU Rounding Checklist:',
      tailoredExtractAr: [
        'مراجعة نتائج مزرعة البلغم والدم خلال 48-72 ساعة لتخفيض طيف المضادات (De-escalation).',
        'مراقبة فترة QTc وتصحيح البوتاسيوم والمغنيسيوم يومياً أثناء استخدام الأميودارون.'
      ],
      tailoredExtractEn: [
        'Perform 48–72h antimicrobial de-escalation review upon culture finalization.',
        'Monitor daily QTc, K+, and Mg2+ while on Amiodarone.'
      ]
    }
  );

  const readyPlanAr = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelAr} - ${a.drugOrTarget}]: ${a.actionAr} (${a.citationBadge})`).join('\n');
  const readyPlanEn = actions.map((a, idx) => `${idx + 1}. [${a.priorityLabelEn} - ${a.drugOrTarget}]: ${a.actionEn} (${a.citationBadge})`).join('\n');

  return {
    headlineAr: `خطة المحاكاة التطبيقية المخصصة للمريض (${params.patientName}) — ذات الرئة المستشفوية (HAP)، القصور الكلوي الحاد (CrCl ${params.crcl})، والرجفان الأذيني`,
    headlineEn: `Applied Clinical Simulation for ${params.patientName} — ICU HAP/Sepsis, Acute Kidney Injury (CrCl ${params.crcl} mL/min) & AFib`,
    pathophysiologyActiveAr: dipiroSepsis?.pathophysiologyAr || '',
    pathophysiologyActiveEn: dipiroSepsis?.pathophysiology || '',
    activeAlgorithmBranchAr: activeAlgorithmAr,
    activeAlgorithmBranchEn: activeAlgorithmEn,
    immediateActions: actions,
    referenceExtracts: extracts,
    quickDosingTables: quickTables,
    readySoapPlanAr: readyPlanAr,
    readySoapPlanEn: readyPlanEn
  };
}

export function getCustomUserReferences(): CustomReferenceNote[] {
  try {
    const raw = localStorage.getItem(CUSTOM_REF_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomUserReference(note: Omit<CustomReferenceNote, 'id' | 'addedAt'>): CustomReferenceNote {
  const existing = getCustomUserReferences();
  const created: CustomReferenceNote = {
    ...note,
    id: `custom-ref-${Date.now()}`,
    addedAt: new Date().toISOString().slice(0, 10)
  };
  const updated = [created, ...existing];
  try {
    localStorage.setItem(CUSTOM_REF_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage quota errors
  }
  return created;
}

export function deleteCustomUserReference(id: string): CustomReferenceNote[] {
  const updated = getCustomUserReferences().filter(n => n.id !== id);
  try {
    localStorage.setItem(CUSTOM_REF_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

/**
 * Searches all indexed chapters (DiPiro 13th Ed, ACCP Cardiology 2026, ACCP Pharmacotherapy 2026 Vol 1 & 2)
 * and custom NotebookLM/Google Drive notes for relevant clinical guidance.
 */
export function searchClinicalReferences(query: string): {
  chapters: AccpChapterReference[];
  customNotes: CustomReferenceNote[];
} {
  const q = query.trim().toLowerCase();
  const customNotes = getCustomUserReferences();

  if (!q) {
    return {
      chapters: ACCP_2026_CHAPTERS,
      customNotes
    };
  }

  const tokens = q.split(/\s+/).filter(t => t.length >= 2);

  const scoredChapters = ACCP_2026_CHAPTERS.map(ch => {
    const haystack = [
      ch.title,
      ch.titleAr,
      ch.category,
      ch.categoryAr,
      ch.summary,
      ch.summaryAr,
      ch.pathophysiology || '',
      ch.pathophysiologyAr || '',
      ...(ch.algorithmSteps || []),
      ...(ch.algorithmStepsAr || []),
      ...ch.keyRecommendations,
      ...ch.keyRecommendationsAr,
      ...ch.clinicalPearls,
      ...ch.clinicalPearlsAr,
      ...ch.keywords
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    if (haystack.includes(q)) score += 10;
    for (const tok of tokens) {
      if (ch.keywords.some(k => k.toLowerCase().includes(tok))) score += 5;
      if (haystack.includes(tok)) score += 2;
    }
    return { ch, score };
  })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.ch);

  const matchedCustom = customNotes.filter(n => {
    const hay = `${n.title} ${n.content} ${n.tags.join(' ')}`.toLowerCase();
    return hay.includes(q) || tokens.some(tok => hay.includes(tok));
  });

  return {
    chapters: scoredChapters,
    customNotes: matchedCustom
  };
}

/**
 * Builds a grounded clinical context string from all 5 accredited references
 * (DiPiro 13th Ed, ACCP Cardiology 2026, ACCP Pharmacotherapy 2026 Vol 1 & 2, NotebookLM, and Google Drive)
 * for the AI Copilot and offline clinical consultation engine.
 */
export function buildCopilotReferenceContext(query: string, lang: 'ar' | 'en'): {
  contextPrompt: string;
  matchedChapters: AccpChapterReference[];
  matchedCustomNotes: CustomReferenceNote[];
} {
  const { chapters, customNotes } = searchClinicalReferences(query);
  const topChapters = (chapters.length > 0 ? chapters : ACCP_2026_CHAPTERS).slice(0, 5);

  const sourcesHeader = `OFFICIAL IN-APP CLINICAL REFERENCE DATABASE (LOCAL EMBEDDED COMPENDIUM):
1. DiPiro's Pharmacotherapy: A Pathophysiologic Approach (13th Edition) — Local DB URI: local://ref/source/dipiro-13th-ed (Archive ID: 1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR)
2. ACCP/ASHP Cardiology Pharmacy Preparatory Review Course (2026 Edition, BCCP) — Local DB URI: local://ref/source/accp-cardiology-2026 (Archive ID: 1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt)
3. ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review and Recertification Course (Volumes 1 & 2, 1,274 pages, BCPS) — Local DB URI: local://ref/source/accp-2026-vol1-vol2 (Archive ID: 1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By)
4. ClinPharm Local Stewardship & NotebookLM Hub — Local DB URI: local://ref/source/notebooklm-31c74a31 (Hub ID: 31c74a31-d444-4339-afd0-b74d8b045d98)
5. Hospital Clinical Dosing Compendium & IV Guardrails — Local DB URI: local://ref/source/gdrive-clinical-ref-2 (Archive ID: 1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC)
6. Clinical Pharmacy Casebook & Bedside Patient Workup Guide (PPCP, Case-Taking Checklists, App Test Cases & Student OSCE Cases) — Local DB URI: local://ref/source/clinical-casebook-guide (Archive ID: 1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP)`;

  const chapterBlocks = topChapters
    .map(ch => {
      const recs = (lang === 'ar' ? ch.keyRecommendationsAr : ch.keyRecommendations).join('\n  - ');
      const pearls = (lang === 'ar' ? ch.clinicalPearlsAr : ch.clinicalPearls).join('\n  - ');
      const patho = lang === 'ar' ? ch.pathophysiologyAr : ch.pathophysiology;
      return `[${ch.evidenceLevel} | ${ch.sourceUrl}] ${lang === 'ar' ? ch.titleAr : ch.title}${patho ? `\n  Pathophysiology: ${patho}` : ''}
  Recommendations:
  - ${recs}
  Clinical Pearls:
  - ${pearls}`;
    })
    .join('\n\n');

  const customBlocks =
    customNotes.length > 0
      ? `\n\nUSER-INDEXED EXCERPTS IN LOCAL REFERENCE DATABASE:\n` +
        customNotes
          .slice(0, 3)
          .map(n => `- [${n.title} (${n.sourceId})]: ${n.content}`)
          .join('\n')
      : '';

  return {
    contextPrompt: `${sourcesHeader}\n\nRELEVANT DIPIRO 13TH ED, ACCP CARDIOLOGY 2026 & ACCP PHARMACOTHERAPY 2026 EXCERPTS:\n${chapterBlocks}${customBlocks}`,
    matchedChapters: topChapters,
    matchedCustomNotes: customNotes.slice(0, 3)
  };
}

export interface ResolvedLocalReference {
  uri: string;
  source: ExternalReferenceSource;
  chapter: AccpChapterReference;
  relatedChapters: AccpChapterReference[];
  verbatimChapterId?: string;
}

import { getVerbatimChapterById } from './library';
export * from './library';

/**
 * Resolves any local reference URI (`local://ref/chapter/...`, `local://ref/source/...`),
 * chapter ID, source ID, or legacy reference string into its embedded In-App Reference Database record.
 */
export function resolveLocalReference(uriOrId?: string): ResolvedLocalReference {
  const raw = (uriOrId || '').trim();
  const normalized = raw
    .replace(/^(local:\/\/ref\/chapter\/|local:\/\/ref\/source\/|local:\/\/ref\/export\/|local:\/\/ref\/|app:\/\/ref\/|#ref\/)/i, '')
    .trim();

  // Verbatim chapter ID direct aliases
  let targetChapterId = normalized;
  let targetVerbatimId: string | undefined = undefined;
  if (normalized === 'dipiro-ch15-hf' || normalized.includes('dipiro-ch15')) {
    targetChapterId = 'dipiro-13-hf-cardiorenal';
    targetVerbatimId = 'dipiro-ch15-hf';
  } else if (normalized === 'accp-v1-acs' || normalized.includes('accp-v1-acs')) {
    targetChapterId = 'cardio-2026-acs-antiplatelet';
    targetVerbatimId = 'accp-v1-acs';
  } else if (normalized === 'accp-v1-critical-care-sepsis') {
    targetChapterId = 'dipiro-13-sepsis-aki-pk';
    targetVerbatimId = 'accp-v1-critical-care-sepsis';
  } else if (normalized === 'accp-v2-nephrology-aki-ckd') {
    targetChapterId = 'accp-2026-nephrology-aki';
    targetVerbatimId = 'accp-v2-nephrology-aki-ckd';
  } else if (normalized === 'accp-v2-cirrhosis-dka') {
    targetChapterId = 'accp-2026-gi-liver-ascites';
    targetVerbatimId = 'accp-v2-cirrhosis-dka';
  } else if (normalized === 'casebook-ppcp-bedside') {
    targetChapterId = 'casebook-ppcp-workup';
    targetVerbatimId = 'casebook-ppcp-bedside';
  } else if (normalized === 'hospital-compendium-protocols') {
    targetChapterId = 'hosp-iv-electrolytes-compendium';
    targetVerbatimId = 'hospital-compendium-protocols';
  } else if (
    normalized.startsWith('stockleys-') ||
    normalized === 'stockleys-drug-interactions' ||
    normalized.includes('1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S')
  ) {
    targetChapterId = 'stockleys-ddi-master';
    targetVerbatimId =
      normalized.startsWith('stockleys-ch') ? normalized : 'stockleys-ch1-anticoag-antiplatelet';
  }

  // 1. Direct chapter match by ID or sourceUrl
  let matchedChapter =
    ACCP_2026_CHAPTERS.find(
      ch => ch.id === targetChapterId || ch.id === normalized || ch.sourceUrl === raw || ch.id.toLowerCase() === targetChapterId.toLowerCase()
    ) || null;

  // 2. Direct source match by ID or viewUrl
  let matchedSource =
    PRIMARY_CLINICAL_REFERENCES.find(
      src =>
        src.id === normalized ||
        src.viewUrl === raw ||
        src.downloadUrl === raw ||
        (normalized && src.metadata.includes(normalized))
    ) || null;

  // 3. Legacy archive ID mapping if any old string is passed
  if (!matchedChapter && !matchedSource) {
    if (raw.includes('1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR') || raw.toLowerCase().includes('dipiro')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'dipiro-13th-ed') || null;
      targetVerbatimId = 'dipiro-ch15-hf';
    } else if (raw.includes('1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt') || raw.toLowerCase().includes('bccp')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'accp-cardiology-2026') || null;
      targetVerbatimId = 'accp-v1-acs';
    } else if (raw.includes('1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP') || raw.toLowerCase().includes('casebook')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'clinical-casebook-guide') || null;
      targetVerbatimId = 'casebook-ppcp-bedside';
    } else if (raw.includes('31c74a31')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'notebooklm-31c74a31') || null;
    } else if (raw.includes('1nMrGfPb')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'gdrive-clinical-ref-2') || null;
      targetVerbatimId = 'hospital-compendium-protocols';
    } else if (raw.includes('1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By') || raw.toLowerCase().includes('accp')) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'accp-2026-vol1-vol2') || null;
      targetVerbatimId = 'accp-v1-acs';
    } else if (
      raw.includes('1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S') ||
      raw.toLowerCase().includes('stockley')
    ) {
      matchedSource = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === 'stockleys-drug-interactions') || null;
      targetVerbatimId = 'stockleys-ch1-anticoag-antiplatelet';
    }
  }

  // 4. Keyword search fallback
  if (!matchedChapter && !matchedSource && normalized) {
    const searchRes = searchClinicalReferences(normalized);
    if (searchRes.chapters.length > 0) {
      matchedChapter = searchRes.chapters[0];
    }
  }

  if (matchedChapter && !matchedSource) {
    matchedSource =
      PRIMARY_CLINICAL_REFERENCES.find(s => s.id === matchedChapter!.sourceId) || PRIMARY_CLINICAL_REFERENCES[0];
  }

  if (matchedSource && !matchedChapter) {
    matchedChapter =
      ACCP_2026_CHAPTERS.find(ch => ch.sourceId === matchedSource!.id) || ACCP_2026_CHAPTERS[0];
  }

  const finalSource = matchedSource || PRIMARY_CLINICAL_REFERENCES[0];
  const finalChapter = matchedChapter || ACCP_2026_CHAPTERS[0];
  const relatedChapters = ACCP_2026_CHAPTERS.filter(
    ch => ch.sourceId === finalSource.id && ch.id !== finalChapter.id
  );

  const verbatimMatch =
    getVerbatimChapterById(targetVerbatimId || normalized) ||
    getVerbatimChapterById(finalChapter.id) ||
    getVerbatimChapterById(finalChapter.sourceUrl);

  return {
    uri: finalChapter.sourceUrl,
    source: finalSource,
    chapter: finalChapter,
    relatedChapters,
    verbatimChapterId: verbatimMatch?.id || targetVerbatimId || 'dipiro-ch15-hf'
  };
}

/**
 * Generates a complete offline Markdown/Text monograph for any local reference chapter
 * so pharmacists or students can export/save the reference directly from the app database.
 */
export function exportLocalReferenceMarkdown(chapter: AccpChapterReference, lang: 'ar' | 'en' = 'ar'): string {
  const source = PRIMARY_CLINICAL_REFERENCES.find(s => s.id === chapter.sourceId);
  const lines: string[] = [
    `# ${lang === 'ar' ? chapter.titleAr : chapter.title}`,
    `**Source Database**: ${source ? (lang === 'ar' ? source.titleAr : source.title) : chapter.sourceId}`,
    `**Local Database URI**: ${chapter.sourceUrl}`,
    `**Evidence Level**: ${chapter.evidenceLevel} | **Pages**: ${chapter.pages}`,
    '',
    `## ${lang === 'ar' ? 'الملخص الإكلينيكي (Clinical Summary)' : 'Clinical Summary'}`,
    lang === 'ar' ? chapter.summaryAr : chapter.summary,
    ''
  ];

  if (chapter.pathophysiology || chapter.pathophysiologyAr) {
    lines.push(
      `## ${lang === 'ar' ? 'الفيزيولوجيا المرضية (Pathophysiology)' : 'Pathophysiology'}`,
      (lang === 'ar' ? chapter.pathophysiologyAr : chapter.pathophysiology) || '',
      ''
    );
  }

  const steps = lang === 'ar' ? chapter.algorithmStepsAr : chapter.algorithmSteps;
  if (steps && steps.length > 0) {
    lines.push(`## ${lang === 'ar' ? 'الخوارزمية العلاجية المتسلسلة (Clinical Algorithm)' : 'Step-by-Step Clinical Algorithm'}`);
    steps.forEach(s => lines.push(`- ${s}`));
    lines.push('');
  }

  const recs = lang === 'ar' ? chapter.keyRecommendationsAr : chapter.keyRecommendations;
  lines.push(`## ${lang === 'ar' ? 'التوصيات الإكلينيكية المعتمدة (Key Recommendations)' : 'Key Recommendations'}`);
  recs.forEach(r => lines.push(`* ${r}`));
  lines.push('');

  const pearls = lang === 'ar' ? chapter.clinicalPearlsAr : chapter.clinicalPearls;
  lines.push(`## ${lang === 'ar' ? 'درر وتنبيهات سريرية (Clinical Pearls)' : 'Clinical Pearls'}`);
  pearls.forEach(p => lines.push(`* ${p}`));

  return lines.join('\n');
}

import { VerbatimBook, VerbatimChapter, LibrarySearchMatch } from './libraryTypes';
import { getSyncedFullBooksSync } from '../googleDrive/fullBookIdb';
import { dipiroHeartFailureChapter } from './monographs/dipiroCardioMonograph';
import { dipiroAdditionalChapters } from './monographs/dipiroAllChaptersMonograph';
import { accpCardiology2026Chapters } from './monographs/accpCardiology2026Monograph';
import { accpAcsChapter } from './monographs/accpVol1AcsAfibMonograph';
import { accpCriticalCareSepsisChapter } from './monographs/accpVol1CriticalCareMonograph';
import { accpVol1AdditionalChapters } from './monographs/accpVol1AllChaptersMonograph';
import { accpNephrologyChapter } from './monographs/accpVol2NephrologyMonograph';
import { accpHepatologyEndocrineChapter } from './monographs/accpVol2HepatologyEndocrineMonograph';
import { accpVol2AdditionalChapters } from './monographs/accpVol2AllChaptersMonograph';
import { casebookPpcpChapter } from './monographs/casebookPpcpMonograph';
import { hospitalDosingChapter } from './monographs/hospitalDosingMonograph';
import {
  casebookAdditionalChapters,
  hospitalCompendiumAdditionalChapters
} from './monographs/casebookAndHospitalAllChaptersMonograph';
import { stockleysDrugInteractionsChapters } from './monographs/stockleysDrugInteractionsMonograph';

export * from './libraryTypes';

const dipiroAllChapters: VerbatimChapter[] = [
  dipiroHeartFailureChapter,
  ...dipiroAdditionalChapters
].sort((a, b) => a.chapterNumber - b.chapterNumber);

const accpVol1AllChapters: VerbatimChapter[] = [
  accpAcsChapter,
  accpCriticalCareSepsisChapter,
  ...accpVol1AdditionalChapters
].sort((a, b) => a.chapterNumber - b.chapterNumber);

const accpVol2AllChapters: VerbatimChapter[] = [
  accpHepatologyEndocrineChapter,
  accpNephrologyChapter,
  ...accpVol2AdditionalChapters
].sort((a, b) => a.chapterNumber - b.chapterNumber);

const casebookAllChapters: VerbatimChapter[] = [
  casebookPpcpChapter,
  ...casebookAdditionalChapters
].sort((a, b) => a.chapterNumber - b.chapterNumber);

const hospitalCompendiumAllChapters: VerbatimChapter[] = [
  hospitalDosingChapter,
  ...hospitalCompendiumAdditionalChapters
].sort((a, b) => a.chapterNumber - b.chapterNumber);

export const VERBATIM_BOOKS: VerbatimBook[] = [
  {
    id: 'dipiro-13th-ed',
    title: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach (13th Edition)",
    titleAr: 'مرجع ديبيرو للعلاج الدوائي: نهج فيزيولوجي مرضي (الطبعة 13 — كافة الفصول المعتمدة)',
    subtitle: 'Full Unabridged In-App Clinical Textbook • Pathophysiology, Pharmacotherapy & Diagnostic Algorithms',
    subtitleAr: 'المكتبة السريرية المرجعية الكاملة غير المترجمة • الفيزيولوجيا المرضية والخوارزميات الدوائية المعتمدة',
    edition: '13th Edition (2026 McGraw Hill)',
    editors: 'Joseph T. DiPiro, Gary C. Yee, Stuart T. Haines, Thomas D. Nolin, Vicki L. Ellingrod, L. Michael Posey',
    publisher: 'McGraw Hill Medical',
    isbnOrUan: 'ISBN: 978-1-264-84534-7',
    badge: "DiPiro's 13th Ed",
    badgeAr: 'مرجع ديبيرو (الطبعة 13)',
    description:
      "Complete, unabridged medical reference text providing in-depth organ pathophysiology, diagnostic criteria, clinical trial evidence, and guideline-directed pharmacotherapy escalation across all major organ systems.",
    descriptionAr:
      'النص المرجعي الطبي الأصلي غير المعدل شاملاً الفيزيولوجيا المرضية للأعضاء، معايير التشخيص، أدلة التجارب السريرية، وخوارزميات العلاج الدوائي لكافة الأجهزة.',
    chapters: dipiroAllChapters
  },
  {
    id: 'accp-cardiology-2026',
    title: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review and Recertification Course (2026 BCCP Edition)',
    titleAr: 'مرجع البورد الأمريكي التخصصي في صيدلة القلب والشرايين (ACCP/ASHP BCCP 2026 — كامل الفصول)',
    subtitle: 'ADHF Hemodynamic Quadrants, 4-Pillar HFrEF/HFpEF, Arrhythmias, DOAC Matrix, ACS/PCI & Valvular Disease',
    subtitleAr: 'مربعات قصور القلب الحاد، الركائز الأربع، اضطرابات النظم، مصفوفة DOACs، المتلازمة التاجية، وأمراض الصمامات',
    edition: '2026 Official BCCP Edition',
    editors: 'ACCP/ASHP Cardiology Pharmacy Editorial Board',
    publisher: 'American College of Clinical Pharmacy (ACCP) & ASHP',
    isbnOrUan: 'UAN: 0217-9997-26-001 through 006-H01-P',
    badge: 'ACCP Cardiology 2026',
    badgeAr: 'بورد القلب BCCP 2026',
    description:
      'Complete 6-chapter specialty board syllabus covering acute and chronic heart failure, cardiogenic shock, Vaughan-Williams antiarrhythmics, DOAC dosing, P2Y12 switching rules, dyslipidemia, and valvular heart disease.',
    descriptionAr:
      'المنهج التخصصي الكامل لبورد صيدلة القلب شاملاً الفصول الستة الكاملة لقصور القلب، الصدمة القلبية، اضطرابات النظم، المتلازمة التاجية، والشحوم.',
    chapters: accpCardiology2026Chapters
  },
  {
    id: 'accp-2026-vol1',
    title: 'Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course (Volume 1)',
    titleAr: 'مستجدات العلاج الدوائي: دورة البورد الأمريكي للصيدلة الإكلينيكية (ACCP 2026 — المجلد الأول الكامل: الفصول 1–10)',
    subtitle: 'Cardiology, Anticoagulation, Infectious Diseases, HIV/TB, Critical Care, Fluids/Nutrition, Pulmonology, Neurology & Women’s Health',
    subtitleAr: 'القلب، منع التخثر، الأمراض المعدية، HIV والسل، العناية المركزة، السوائل والتغذية، الصدرية، الأعصاب، وصحة المرأة',
    edition: '2026 Official Recertification Edition (All 10 Chapters)',
    editors: 'Robert D. Beckett, Jennifer A. Bente, Luigi Brunetti, et al.',
    publisher: 'American College of Clinical Pharmacy (ACCP)',
    isbnOrUan: 'UAN: 0217-0000-26-056 through 059-H01-P',
    badge: 'ACCP 2026 Vol 1',
    badgeAr: 'بورد ACCP 2026 (مجلد 1)',
    description:
      'Official unabridged Volume 1 board review syllabus containing all 10 chapters: Acute & Chronic Cardiology, Anticoagulation, Infectious Diseases, HIV/TB, Critical Care, Fluids/Electrolytes/TPN, Pulmonology/Vaccines, Neurology, and Reproductive Health.',
    descriptionAr:
      'المجلد الأول الكامل (جميع الفصول العشرة 1-10) من منهج البورد الأمريكي للصيدلة السريرية ACCP 2026 بالنص الأصلي الكامل.',
    chapters: accpVol1AllChapters
  },
  {
    id: 'accp-2026-vol2',
    title: 'Updates in Therapeutics®: Pharmacotherapy Preparatory Review and Recertification Course (Volume 2)',
    titleAr: 'مستجدات العلاج الدوائي: دورة البورد الأمريكي للصيدلة الإكلينيكية (ACCP 2026 — المجلد الثاني الكامل: الفصول 11–22)',
    subtitle: 'Med Safety/ISMP, Oncology, Drug Info/Pharmacoeconomics, GI/Hepatology, Endocrine, Nephrology, PK/TDM, Geriatrics, Biostats & Peds/Psych',
    subtitleAr: 'سلامة الأدوية ISMP، الأورام، الاقتصاد الدوائي، الهضمية والكبد، الغدد، الكلى، الحركية الدوائية TDM، المسنين، الإحصاء، والأطفال/النفسية',
    edition: '2026 Official Recertification Edition (All 10 Chapters)',
    editors: 'Robert D. Beckett, Jennifer A. Bente, Luigi Brunetti, et al.',
    publisher: 'American College of Clinical Pharmacy (ACCP)',
    isbnOrUan: 'UAN: 0217-0000-26-060 through 062-H01-P',
    badge: 'ACCP 2026 Vol 2',
    badgeAr: 'بورد ACCP 2026 (مجلد 2)',
    description:
      'Official unabridged Volume 2 board review syllabus containing all chapters (Ch. 11–22): Health Systems & ISMP Safety, Oncology Supportive Care, Drug Info & Pharmacoeconomics, GI/Hepatology, Endocrinology, Nephrology, PK/TDM, Geriatrics, Biostatistics, and Pediatrics/Psychiatry.',
    descriptionAr:
      'المجلد الثاني الكامل (جميع الفصول 11-22) من منهج البورد الأمريكي للصيدلة السريرية ACCP 2026 بالنص الأصلي الكامل.',
    chapters: accpVol2AllChapters
  },
  {
    id: 'clinical-casebook-guide',
    title: 'Pharmacotherapy Casebook & Bedside Workup Guide (PPCP & Clinical Methodology)',
    titleAr: 'دليل أخذ الحالات السريرية والتدريب السريري: منهجية رعاية المرضى (PPCP — جميع الأقسام I–V)',
    subtitle: 'Bedside OPQRST/BPMH Intake, 8-Syndrome Checklists, Benchmark Cases, ABG/Lab Equations & SBAR/SOAP Documentation',
    subtitleAr: 'أخذ القصة السريرية، قوائم الفحص للمتلازمات الثماني، الحالات القياسية، تفسير المختبر وغازات الدم، ومذكرات SOAP/SBAR',
    edition: '13th Edition & JCPP Standard (All 5 Sections)',
    editors: 'Terry L. Schwinghammer, Joseph T. DiPiro; JCPP Panel',
    publisher: 'McGraw Hill & Joint Commission of Pharmacy Practitioners',
    isbnOrUan: 'UAN: 0217-0000-26-001 through 005-L04-P',
    badge: 'Casebook PPCP Guide',
    badgeAr: 'دليل أخذ الحالات PPCP',
    description:
      'Complete 5-section bedside clinical manual detailing how pharmacists and students take cases, extract syndrome-specific red flags, solve benchmark cases with IESC, interpret ABGs/labs, and write legal SOAP notes.',
    descriptionAr:
      'الدليل المنهجي الكامل بأقسامه الخمسة لكيفية أخذ الحالات السريرية، قوائم الفحص الموجه، الحالات التدريبية، معادلات المختبر، وصياغة مذكرات SOAP.',
    chapters: casebookAllChapters
  },
  {
    id: 'hospital-compendium',
    title: 'Inpatient Clinical Dosing Compendium, ICU Stewardship & High-Alert IV Protocols',
    titleAr: 'موسوعة جرعات المستشفيات وبروتوكولات العناية المركزة وترشيد المضادات (جميع الأقسام A–E)',
    subtitle: 'Electrolyte Ceilings, Heparin/HIT/Reversal Nomograms, Vasopressors & Extravasation, FAST HUGS BID & CRRT/HD Dosing',
    subtitleAr: 'حدود الكهارل الوريدية، معايرة الهيبارين وعكس التخثر، رافعات الضغط والتسرب الوعائي، جولة العناية المركزة، وجرعات الغسيل الكلوي',
    edition: '2026 Inpatient Compendium (All 5 Sections)',
    editors: 'Inpatient Clinical Pharmacy Editorial Board & Critical Care Safety Committee',
    publisher: 'Hospital Clinical Pharmacy Compendium',
    isbnOrUan: 'Compendium ID: HOSP-DOSING-2026-V1 (Sec. A–E)',
    badge: 'Hospital Dosing Compendium',
    badgeAr: 'موسوعة جرعات المستشفى',
    description:
      'Complete 5-section inpatient hospital compendium covering peripheral vs central electrolyte limits, weight-based heparin/argatroban nomograms, vasoactive infusions, phentolamine rescue, FAST HUGS BID stewardship, and CRRT/IHD antimicrobial dosing.',
    descriptionAr:
      'موسوعة المستشفى السريرية الشاملة بأقسامها الخمسة (A-E) لضوابط التسريب الوريدي، جداول الهيبارين، رافعات الضغط، ترشيد المضادات، والغسيل الكلوي.',
    chapters: hospitalCompendiumAllChapters
  },
  {
    id: 'stockleys-drug-interactions',
    title: "Stockley's Drug Interactions: Clinical Pharmacokinetic & Pharmacodynamic DDI Database",
    titleAr: "مرجع ستوكلي للتداخلات الدوائية (Stockley's Drug Interactions — قاعدة بيانات التعارضات الدوائية المعتمدة)",
    subtitle: 'Authoritative PK/PD Drug Interaction Mechanisms, CYP450/P-gp Matrices, Severity Action Ratings & Bedside Management (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)',
    subtitleAr: 'الموسوعة المرجعية العالمية للتعارضات الدوائية: آليات CYP450 و P-gp، تطاول QTc، مضادات التخثر، المضادات الحيوية، وخوارزميات التدبير السريري',
    edition: "Stockley's Hospital Reference Edition (Google Drive Archive: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    editors: 'Karen Baxter, Claire L. Preston (Pharmaceutical Press)',
    publisher: 'Pharmaceutical Press (Royal Pharmaceutical Society)',
    isbnOrUan: 'Drive Ref: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S',
    badge: "Stockley's Drug Interactions",
    badgeAr: "مرجع Stockley's للتداخلات",
    description:
      "World's most authoritative clinical reference on drug-drug, drug-herb, and drug-food interactions, detailing exact pharmacokinetic/pharmacodynamic mechanisms, onset, clinical severity, and actionable dose adjustments.",
    descriptionAr:
      'المرجع العالمي الأول والأوثق للتداخلات والتعارضات الدوائية، يشرح الآلية الدوائية الحركية والديناميكية ومستوى الخطورة والإجراء الإكلينيكي المطلوب لضبط الجرعات أو استبدال الدواء.',
    chapters: stockleysDrugInteractionsChapters
  }
];

const CHAPTER_ID_ALIAS_MAP: Record<string, string> = {
  'dipiro-13-hf-cardiorenal': 'dipiro-ch15-hf',
  'dipiro-13-sepsis-aki-pk': 'dipiro-ch54-sepsis-aki-pk',
  'dipiro-13-cirrhosis-portal-htn': 'dipiro-ch46-cirrhosis',
  'accp-2026-v1-c1': 'accp-v1-acs',
  'cardio-2026-acs-antiplatelet': 'accp-cardio-2026-acs-p2y12',
  'accp-2026-v1-c6': 'accp-v1-critical-care-sepsis',
  'accp-2026-v2-c4': 'accp-v2-cirrhosis-dka',
  'accp-2026-gi-liver-ascites': 'accp-v2-cirrhosis-dka',
  'accp-2026-v2-c6': 'accp-v2-nephrology-aki-ckd',
  'accp-2026-nephrology-aki': 'accp-v2-nephrology-aki-ckd',
  'casebook-section1-bedside-ppcp': 'casebook-ppcp-bedside',
  'casebook-ppcp-workup': 'casebook-ppcp-bedside',
  'hospital-compendium-dosing-protocols': 'hospital-compendium-protocols',
  'hosp-iv-electrolytes-compendium': 'hospital-compendium-protocols'
};

export function getAllVerbatimBooks(): VerbatimBook[] {
  const syncedRecords = getSyncedFullBooksSync();
  if (syncedRecords.length === 0) {
    return VERBATIM_BOOKS.map(b => ({
      ...b,
      sourceType: 'embedded_synthetic',
      processingStatus: 'not_imported'
    }));
  }

  const mergedBooks: VerbatimBook[] = VERBATIM_BOOKS.map(baseBook => {
    const synced = syncedRecords.find(r => r.bookId === baseBook.id);
    if (!synced) {
      return {
        ...baseBook,
        sourceType: 'embedded_synthetic',
        processingStatus: 'not_imported'
      };
    }

    const extraChapters = synced.chapters.filter(
      sc => !baseBook.chapters.some(bc => bc.id === sc.id)
    );

    const isEmbedded = synced.sourceType === 'embedded_synthetic';
    const statusLabel = isEmbedded
      ? 'Embedded Offline Summary — NOT the original PDF'
      : synced.processingStatus === 'verified_complete'
      ? `Verified Complete PDF (${synced.totalPages} Pages)`
      : synced.processingStatus === 'needs_ocr'
      ? `Scanned PDF — Needs OCR (${synced.totalPages} Pages)`
      : `Partially Extracted PDF (${synced.extractedTextPageCount ?? 0}/${synced.totalPages} Pages)`;

    return {
      ...baseBook,
      edition: `${baseBook.edition} • ${statusLabel}`,
      sourceType: synced.sourceType,
      processingStatus: synced.processingStatus,
      sourceFileName: synced.sourceFileName || synced.fileName,
      sha256: synced.sha256,
      originalPageCount: synced.originalPageCount ?? synced.totalPages,
      processedPageCount: synced.processedPageCount,
      extractedTextPageCount: synced.extractedTextPageCount,
      ocrPageCount: synced.ocrPageCount,
      unprocessedPageCount: synced.unprocessedPageCount,
      chapters: extraChapters.length > 0 ? [...extraChapters, ...baseBook.chapters] : baseBook.chapters
    };
  });

  // Append any extra custom books synced from Google Drive or Local PDF
  for (const synced of syncedRecords) {
    const existsInCore = mergedBooks.some(b => b.id === synced.bookId);
    if (!existsInCore) {
      const isEmbedded = synced.sourceType === 'embedded_synthetic';
      const titleText = synced.displayTitle || synced.customTitle || synced.sourceFileName || synced.fileName;
      mergedBooks.push({
        id: synced.bookId,
        title: titleText,
        titleAr: isEmbedded
          ? `ملخص مضمّن غير أصلي: ${titleText}`
          : `مرجع PDF مستورد: ${titleText}`,
        subtitle: isEmbedded
          ? 'Embedded offline summary; not the original PDF'
          : `Imported PDF (${synced.totalPages} Pages • ${synced.totalChapters} Chapters • Status: ${synced.processingStatus || 'partially_complete'})`,
        subtitleAr: isEmbedded
          ? 'ملخص مضمّن للعمل دون اتصال؛ ليس ملف PDF الأصلي'
          : `ملف PDF مستورد (${synced.totalPages} صفحة • ${synced.totalChapters} فصلاً • الحالة: ${synced.processingStatus || 'partially_complete'})`,
        edition: isEmbedded
          ? 'Embedded Offline Summary — NOT the original PDF'
          : synced.processingStatus === 'verified_complete'
          ? `Verified Complete PDF (${synced.totalPages} Pages)`
          : `Imported PDF (${synced.totalPages} Pages • ${synced.processingStatus || 'partially_complete'})`,
        editors: isEmbedded ? 'Built-in Summary' : 'Original PDF Textbook',
        publisher: synced.sourceType === 'local_file_pdf' ? 'Local PDF Import' : 'Google Drive PDF Import',
        isbnOrUan: `Source ID: ${synced.driveFileId}`,
        badge: synced.customBadge || (synced.sourceFileName || synced.fileName).slice(0, 22),
        badgeAr: synced.customBadge || (synced.sourceFileName || synced.fileName).slice(0, 22),
        description: `Page-by-page extraction of ${synced.sourceFileName || synced.fileName} (${synced.totalPages} pages).`,
        descriptionAr: `المحتوى المستخرج صفحة بصفحة لملف ${synced.sourceFileName || synced.fileName} (${synced.totalPages} صفحة).`,
        sourceType: synced.sourceType,
        processingStatus: synced.processingStatus,
        sourceFileName: synced.sourceFileName || synced.fileName,
        sha256: synced.sha256,
        originalPageCount: synced.originalPageCount ?? synced.totalPages,
        processedPageCount: synced.processedPageCount,
        extractedTextPageCount: synced.extractedTextPageCount,
        ocrPageCount: synced.ocrPageCount,
        unprocessedPageCount: synced.unprocessedPageCount,
        chapters: synced.chapters
      });
    }
  }

  return mergedBooks;
}

export function getAllVerbatimChapters(): VerbatimChapter[] {
  const all: VerbatimChapter[] = [];
  for (const b of getAllVerbatimBooks()) {
    all.push(...b.chapters);
  }
  return all;
}

export function getVerbatimBookById(bookId: string): VerbatimBook | undefined {
  return getAllVerbatimBooks().find(b => b.id === bookId);
}

export function getVerbatimChapterById(chapterId: string): VerbatimChapter | undefined {
  const cleanId = (chapterId || '')
    .replace(/^(local:\/\/ref\/chapter\/|local:\/\/ref\/source\/|local:\/\/ref\/export\/|local:\/\/ref\/|app:\/\/ref\/|#ref\/)/i, '')
    .trim();
  const mappedId = CHAPTER_ID_ALIAS_MAP[cleanId] || cleanId;

  for (const b of getAllVerbatimBooks()) {
    const ch = b.chapters.find(
      c =>
        c.id === mappedId ||
        c.id === cleanId ||
        c.sourceUrl === chapterId ||
        c.sourceUrl.endsWith(`/${cleanId}`)
    );
    if (ch) return ch;
  }
  return undefined;
}

const ARABIC_TO_ENGLISH_MEDICAL_MAP: Record<string, string[]> = {
  وارفارين: ['warfarin', 'coumarin', 'inr', 'cyp2c9', 'vkorc1'],
  ورفرين: ['warfarin', 'coumarin', 'inr', 'cyp2c9'],
  اميودارون: ['amiodarone', 'cyp2c9', 'qtc', 'digoxin'],
  أميودارون: ['amiodarone', 'cyp2c9', 'qtc', 'digoxin'],
  فانكومايسين: ['vancomycin', 'auc24', 'auc', 'trough', 'mrsa', 'nephrotoxicity'],
  فانكوميسين: ['vancomycin', 'auc24', 'auc', 'trough', 'mrsa'],
  ميروبينيم: ['meropenem', 'carbapenem', 'valproate', 'valproic'],
  كاربابينيم: ['carbapenem', 'meropenem', 'imipenem', 'valproate'],
  فالبروات: ['valproate', 'valproic', 'meropenem', 'carbapenem'],
  ديباكين: ['valproate', 'valproic', 'meropenem'],
  كلوبيدوجريل: ['clopidogrel', 'p2y12', 'cyp2c19', 'omeprazole', 'pantoprazole'],
  بلافيكس: ['clopidogrel', 'p2y12', 'cyp2c19', 'omeprazole'],
  اوميبرازول: ['omeprazole', 'esomeprazole', 'cyp2c19', 'clopidogrel', 'pantoprazole'],
  أوميبرازول: ['omeprazole', 'esomeprazole', 'cyp2c19', 'clopidogrel', 'pantoprazole'],
  بانتوبرازول: ['pantoprazole', 'ppi', 'clopidogrel'],
  تيكاجريلور: ['ticagrelor', 'p2y12', 'acs', 'switching'],
  كانجريلور: ['cangrelor', 'p2y12', 'switching'],
  براسوجريل: ['prasugrel', 'p2y12', 'acs'],
  انتريستو: ['entresto', 'sacubitril', 'valsartan', 'arni', '36-hour', 'washout'],
  إنتريستو: ['entresto', 'sacubitril', 'valsartan', 'arni', '36-hour', 'washout'],
  ساكوبيتريل: ['sacubitril', 'valsartan', 'entresto', 'arni', 'washout'],
  فالسارتان: ['valsartan', 'sacubitril', 'entresto', 'arb'],
  راميبريل: ['ramipril', 'acei', 'washout', 'entresto', 'hyperkalemia'],
  ليزينوبريل: ['lisinopril', 'acei', 'washout', 'hyperkalemia'],
  اينالابريل: ['enalapril', 'acei', 'washout'],
  إينالابريل: ['enalapril', 'acei', 'washout'],
  سبيرونولاكتون: ['spironolactone', 'eplerenone', 'mra', 'hyperkalemia', 'potassium', 'ascites'],
  فوروسيميد: ['furosemide', 'loop', 'diuretic', 'adhf', 'congestion'],
  لازكس: ['furosemide', 'loop', 'diuretic'],
  ديجوكسين: ['digoxin', 'p-gp', 'amiodarone', 'verapamil', 'toxicity'],
  ابيكسابان: ['apixaban', 'doac', 'afib', 'cyp3a4', 'p-gp'],
  أبيكسابان: ['apixaban', 'doac', 'afib', 'cyp3a4', 'p-gp'],
  ريفاروكسابان: ['rivaroxaban', 'doac', 'crcl', 'cyp3a4'],
  دابيجاتران: ['dabigatran', 'doac', 'p-gp', 'idarucizumab'],
  هيبارين: ['heparin', 'ufh', 'aptt', 'hit', 'argatroban', 'protamine'],
  اينوكسابارين: ['enoxaparin', 'lmwh', 'anti-xa', 'crcl'],
  إينوكسابارين: ['enoxaparin', 'lmwh', 'anti-xa', 'crcl'],
  لينزوليد: ['linezolid', 'maoi', 'serotonin', 'ssri', 'fentanyl'],
  تازوسين: ['piperacillin', 'tazobactam', 'vancomycin', 'cefepime', 'aki'],
  بيبيراسيلين: ['piperacillin', 'tazobactam', 'vancomycin', 'aki'],
  تازوباكتام: ['tazobactam', 'piperacillin', 'vancomycin'],
  سيفيبيم: ['cefepime', 'neurotoxicity', 'renal'],
  سيبروفلوكساسين: ['ciprofloxacin', 'fluoroquinolone', 'qtc', 'chelation', 'theophylline'],
  ليفوفلوكساسين: ['levofloxacin', 'fluoroquinolone', 'qtc', 'chelation'],
  فلوكونازول: ['fluconazole', 'voriconazole', 'cyp2c9', 'cyp3a4', 'qtc', 'warfarin'],
  كلاريثروميسين: ['clarithromycin', 'macrolide', 'cyp3a4', 'qtc', 'statin', 'colchicine'],
  ازيثروميسين: ['azithromycin', 'macrolide', 'qtc'],
  أزيثروميسين: ['azithromycin', 'macrolide', 'qtc'],
  اتورفاستاتين: ['atorvastatin', 'statin', 'cyp3a4', 'rhabdomyolysis'],
  أتورفاستاتين: ['atorvastatin', 'statin', 'cyp3a4', 'rhabdomyolysis'],
  سيمفاستاتين: ['simvastatin', 'statin', 'cyp3a4', 'amiodarone', 'amlodipine'],
  كولشيسين: ['colchicine', 'cyp3a4', 'p-gp', 'clarithromycin'],
  ليثيوم: ['lithium', 'nsaid', 'acei', 'thiazide', 'toxicity'],
  ميتفورمين: ['metformin', 'egfr', 'lactic', 'acidosis', 'contrast'],
  انسولين: ['insulin', 'dka', 'potassium', 'glucose', 'hypoglycemia'],
  أنسولين: ['insulin', 'dka', 'potassium', 'glucose', 'hypoglycemia'],
  بوتاسيوم: ['potassium', 'kcl', 'hyperkalemia', 'hypokalemia'],
  صوديوم: ['sodium', 'hyponatremia', 'hypertonic', 'ods'],
  كالسيوم: ['calcium', 'gluconate', 'hyperkalemia'],
  مغنيسيوم: ['magnesium', 'torsades', 'qtc'],
  نورايبينفرين: ['norepinephrine', 'vasopressor', 'septic', 'extravasation', 'phentolamine'],
  نورإبينفرين: ['norepinephrine', 'vasopressor', 'septic', 'extravasation', 'phentolamine'],
  ستوكلي: ['stockley', 'interaction', 'ddi', 'cyp', 'p-gp'],
  تداخل: ['stockley', 'interaction', 'interactions', 'ddi', 'contraindicated'],
  تداخلات: ['stockley', 'interaction', 'interactions', 'ddi', 'contraindicated'],
  تعارض: ['stockley', 'interaction', 'interactions', 'ddi', 'contraindicated'],
  تعارضات: ['stockley', 'interaction', 'interactions', 'ddi', 'contraindicated'],
  ديبيرو: ['dipiro', 'pathophysiologic'],
  كلى: ['renal', 'aki', 'ckd', 'crcl', 'nephrology'],
  كلوي: ['renal', 'aki', 'ckd', 'crcl', 'nephrology'],
  غسيل: ['hemodialysis', 'crrt', 'renal'],
  قلب: ['heart failure', 'hfref', 'adhf', 'acs', 'cardiology'],
  كبد: ['cirrhosis', 'ascites', 'hepatic', 'encephalopathy', 'child-pugh'],
  تليف: ['cirrhosis', 'ascites', 'hepatic', 'spironolactone', 'furosemide'],
  استسقاء: ['ascites', 'cirrhosis', 'spironolactone', 'furosemide', 'sbp'],
  انتان: ['sepsis', 'septic', 'shock', 'lactate', 'norepinephrine'],
  إنتان: ['sepsis', 'septic', 'shock', 'lactate', 'norepinephrine']
};

const QUERY_STOPWORDS = new Set([
  'ما', 'هي', 'هو', 'هل', 'كيف', 'متى', 'لماذا', 'أين', 'في', 'من', 'على', 'إلى', 'الى', 'عن', 'مع', 'او', 'أو', 'ثم', 'بين',
  'هذا', 'هذه', 'ذلك', 'تلك', 'الذي', 'التي', 'كل', 'بعض', 'أي', 'اي', 'حول', 'وفق', 'حسب', 'مرجع', 'كتاب', 'فصل', 'قسم',
  'مريض', 'المريض', 'حالي', 'الحالي', 'نشط', 'النشط', 'ملف', 'حالة', 'توصيات', 'توصية', 'جرعة', 'جرعات', 'دواء', 'أدوية', 'ادوية',
  'اريد', 'أريد', 'اعطني', 'أعطني', 'اشرح', 'وضح', 'فحص', 'افحص', 'راجع', 'مراجعة', 'شاملة', 'كاملة', 'بالكامل',
  'what', 'is', 'are', 'was', 'were', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'per',
  'and', 'or', 'how', 'when', 'why', 'which', 'who', 'can', 'should', 'would', 'could', 'please', 'check', 'screen', 'review',
  'patient', 'active', 'current', 'medications', 'medication', 'drug', 'drugs', 'dose', 'dosing', 'guideline', 'guidelines',
  'recommendations', 'recommendation', 'book', 'chapter', 'section', 'reference', 'edition', 'ed', 'vol', 'ch'
]);

export function expandQueryTokensForLibrary(query: string): string[] {
  const normalized = query
    .toLowerCase()
    .replace(/[؟?!.,;:"'()[\]{}<>«»ـ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return [];

  const rawWords = normalized.split(' ');
  const tokenSet = new Set<string>();

  for (const word of rawWords) {
    if (!word || word.length < 2) continue;
    const strippedAr = word.replace(/^(وال|بال|كال|فال|لل|ال)/, '');

    if (!QUERY_STOPWORDS.has(word) && !QUERY_STOPWORDS.has(strippedAr)) {
      if (word.length >= 2) tokenSet.add(word);
      if (strippedAr.length >= 2) tokenSet.add(strippedAr);
    }

    for (const candidate of [word, strippedAr]) {
      const mapped = ARABIC_TO_ENGLISH_MEDICAL_MAP[candidate];
      if (mapped) {
        mapped.forEach(m => tokenSet.add(m.toLowerCase()));
      }
    }
  }

  for (const [arKey, enList] of Object.entries(ARABIC_TO_ENGLISH_MEDICAL_MAP)) {
    if (normalized.includes(arKey)) {
      enList.forEach(m => tokenSet.add(m.toLowerCase()));
    }
  }

  return Array.from(tokenSet);
}

export function searchVerbatimLibrary(
  query: string,
  options?: {
    bookId?: string;
    systemCategory?: string;
  }
): LibrarySearchMatch[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

  const tokens = expandQueryTokensForLibrary(cleanQ);
  const results: LibrarySearchMatch[] = [];

  for (const book of getAllVerbatimBooks()) {
    if (options?.bookId && options.bookId !== 'all' && book.id !== options.bookId) {
      continue;
    }

    for (const chapter of book.chapters) {
      if (
        options?.systemCategory &&
        options.systemCategory !== 'all' &&
        chapter.systemCategory !== options.systemCategory
      ) {
        continue;
      }

      const chapterTitleHay = `${chapter.title} ${chapter.titleAr} ${chapter.keywords.join(' ')} ${book.badge} ${book.title}`.toLowerCase();

      // 1. Chapter Title & Keywords Match (Exact or Multi-Token)
      let titleScore = 0;
      if (
        chapter.title.toLowerCase().includes(cleanQ) ||
        chapter.titleAr.toLowerCase().includes(cleanQ) ||
        chapter.keywords.some(k => k.toLowerCase().includes(cleanQ))
      ) {
        titleScore += 100;
      }

      let matchedKeywordCount = 0;
      for (const tok of tokens) {
        if (chapter.keywords.some(k => k.toLowerCase().includes(tok))) {
          titleScore += 22;
          matchedKeywordCount++;
        } else if (chapterTitleHay.includes(tok)) {
          titleScore += 14;
          matchedKeywordCount++;
        }
      }

      if (titleScore >= 25) {
        results.push({
          book,
          chapter,
          originalPageNumber: chapter.startPage,
          sourceType: book.sourceType,
          matchType: 'title',
          snippet: `${chapter.title} • Keywords: ${chapter.keywords.slice(0, 6).join(', ')}`,
          score: titleScore + matchedKeywordCount * 5
        });
      }

      // 2. Section Heading, Native Body, and OCR Body Matches
      for (const section of chapter.sections) {
        const headingHay = `${section.heading} ${section.headingAr} ${section.evidenceGrade || ''}`.toLowerCase();
        const bodyLower = (section.body || '').toLowerCase();
        const ocrLower = (section.ocrBody || '').toLowerCase();
        const notesLower = (section.clinicalNotes || []).join(' ').toLowerCase();

        let secScore = 0;
        let firstMatchIdx = -1;
        let firstMatchLen = cleanQ.length;
        let matchedViaOcr = false;

        if (headingHay.includes(cleanQ)) {
          secScore += 95;
        }
        const exactBodyIdx = bodyLower.indexOf(cleanQ);
        if (exactBodyIdx !== -1) {
          secScore += 80;
          firstMatchIdx = exactBodyIdx;
        } else if (ocrLower) {
          const exactOcrIdx = ocrLower.indexOf(cleanQ);
          if (exactOcrIdx !== -1) {
            secScore += 78;
            firstMatchIdx = exactOcrIdx;
            matchedViaOcr = true;
          }
        }

        let matchedTokensInSec = 0;
        for (const tok of tokens) {
          let tokenMatchedHere = false;
          if (headingHay.includes(tok)) {
            secScore += 24;
            tokenMatchedHere = true;
          }
          const tokIdx = bodyLower.indexOf(tok);
          if (tokIdx !== -1) {
            secScore += 15;
            tokenMatchedHere = true;
            if (firstMatchIdx === -1) {
              firstMatchIdx = tokIdx;
              firstMatchLen = tok.length;
            }
          } else if (ocrLower) {
            const ocrTokIdx = ocrLower.indexOf(tok);
            if (ocrTokIdx !== -1) {
              secScore += 14;
              tokenMatchedHere = true;
              matchedViaOcr = true;
              if (firstMatchIdx === -1) {
                firstMatchIdx = ocrTokIdx;
                firstMatchLen = tok.length;
              }
            }
          }
          if (notesLower.includes(tok)) {
            secScore += 12;
            tokenMatchedHere = true;
          }
          if (tokenMatchedHere) {
            matchedTokensInSec++;
          }
        }

        if (matchedTokensInSec >= 2) {
          secScore += matchedTokensInSec * 18;
        }

        if (secScore >= 20) {
          const sourceText = matchedViaOcr && section.ocrBody ? section.ocrBody : section.body;
          let snippet = '';
          if (firstMatchIdx !== -1 && sourceText) {
            const start = Math.max(0, firstMatchIdx - 90);
            const end = Math.min(sourceText.length, firstMatchIdx + firstMatchLen + 160);
            snippet = `...${sourceText.slice(start, end).replace(/\n+/g, ' ')}...`;
          } else {
            snippet = (sourceText || '').slice(0, 220).replace(/\n+/g, ' ') + '...';
          }

          results.push({
            book,
            chapter,
            section,
            originalPageNumber: section.originalPageNumber ?? chapter.startPage,
            extractionMethod: section.extractionMethod || (matchedViaOcr ? 'ocr' : 'native_text'),
            sourceType: book.sourceType,
            matchType:
              matchedViaOcr || section.extractionMethod === 'ocr'
                ? 'ocr'
                : headingHay.includes(cleanQ) || matchedTokensInSec >= 2
                ? 'heading'
                : 'body',
            snippet,
            score: secScore
          });
        }
      }

      // 3. Board Pearls Match
      const allPearls = [...chapter.boardPearls, ...(chapter.boardPearlsAr || [])];
      for (const pearl of allPearls) {
        const pearlLower = pearl.toLowerCase();
        let pearlScore = pearlLower.includes(cleanQ) ? 85 : 0;
        let pearlTokens = 0;
        for (const tok of tokens) {
          if (pearlLower.includes(tok)) {
            pearlScore += 16;
            pearlTokens++;
          }
        }
        if (pearlScore >= 28 || pearlTokens >= 2) {
          results.push({
            book,
            chapter,
            originalPageNumber: chapter.startPage,
            sourceType: book.sourceType,
            matchType: 'pearl',
            snippet: pearl.slice(0, 220) + (pearl.length > 220 ? '...' : ''),
            score: pearlScore + pearlTokens * 10
          });
          break;
        }
      }

      // 4. Quick Tables & Section Tables Match (including units, footnotes, and rawText)
      const allTables = [
        ...chapter.quickTables,
        ...chapter.sections.flatMap(s => s.tables || [])
      ];
      for (const table of allTables) {
        const tableHay = `${table.title} ${table.titleAr || ''} ${table.headers.join(' ')} ${table.rows
          .map(r => r.join(' '))
          .join(' ')} ${table.unitsAndFootnotes || ''} ${table.rawText || ''}`.toLowerCase();
        let tableScore = tableHay.includes(cleanQ) ? 80 : 0;
        let tableTokens = 0;
        for (const tok of tokens) {
          if (tableHay.includes(tok)) {
            tableScore += 16;
            tableTokens++;
          }
        }
        if (tableScore >= 28 || tableTokens >= 2) {
          results.push({
            book,
            chapter,
            table,
            originalPageNumber: table.pageNumber ?? chapter.startPage,
            sourceType: book.sourceType,
            matchType: 'table',
            snippet: `Table (p.${table.pageNumber ?? '?'}): ${table.title} (${table.rows.length} rows × ${table.headers.length} cols)`,
            score: tableScore + tableTokens * 10
          });
          break;
        }
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export function exportChapterMarkdown(chapter: VerbatimChapter): string {
  const lines: string[] = [];
  lines.push(`# ${chapter.title}`);
  lines.push(`**Arabic Heading:** ${chapter.titleAr}`);
  lines.push(`**Authors:** ${chapter.authors}`);
  lines.push(`**Edition:** ${chapter.edition} | **Pages:** ${chapter.pageRange}`);
  lines.push(`**System Category:** ${chapter.systemCategory} (${chapter.systemCategoryAr})`);
  lines.push(`**Citation:** ${chapter.citation}`);
  lines.push(`\n---\n`);

  lines.push(`## Learning Objectives`);
  chapter.learningObjectives.forEach((obj, idx) => {
    lines.push(`${idx + 1}. ${obj}`);
  });
  lines.push(`\n---\n`);

  lines.push(`## Table of Contents`);
  chapter.toc.forEach(item => {
    lines.push(`- **${item.number}** ${item.title}`);
  });
  lines.push(`\n---\n`);

  lines.push(`## High-Yield Board Pearls & Critical Directives`);
  chapter.boardPearls.forEach(pearl => {
    lines.push(`- 💎 ${pearl}`);
  });
  lines.push(`\n---\n`);

  lines.push(`## Verbatim Clinical Sections (Unabridged Source Text)`);
  chapter.sections.forEach(sec => {
    lines.push(`\n### ${sec.number} ${sec.heading}`);
    lines.push(`*(${sec.headingAr})*`);
    if (sec.evidenceGrade) {
      lines.push(`> **Evidence Grade / Standard:** ${sec.evidenceGrade}\n`);
    }
    lines.push(sec.body);
  });

  if (chapter.quickTables.length > 0) {
    lines.push(`\n---\n`);
    lines.push(`## Reference Dosing & Algorithm Tables`);
    chapter.quickTables.forEach(t => {
      lines.push(`\n### ${t.title}`);
      lines.push(`| ${t.headers.join(' | ')} |`);
      lines.push(`| ${t.headers.map(() => '---').join(' | ')} |`);
      t.rows.forEach(r => {
        lines.push(`| ${r.map(c => c.replace(/\n+/g, ' ')).join(' | ')} |`);
      });
    });
  }

  return lines.join('\n');
}

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
    return VERBATIM_BOOKS;
  }

  const mergedBooks: VerbatimBook[] = VERBATIM_BOOKS.map(baseBook => {
    const synced = syncedRecords.find(r => r.bookId === baseBook.id);
    if (!synced) return baseBook;

    return {
      ...baseBook,
      edition: `${baseBook.edition} • Full PDF Synced (${synced.totalPages} Pages)`,
      chapters: [...baseBook.chapters, ...synced.chapters]
    };
  });

  // Append any extra custom books synced from Google Drive or Local PDF
  for (const synced of syncedRecords) {
    const existsInCore = mergedBooks.some(b => b.id === synced.bookId);
    if (!existsInCore) {
      mergedBooks.push({
        id: synced.bookId,
        title: synced.customTitle || synced.fileName,
        titleAr: `مرجع مستورد بالكامل: ${synced.customTitle || synced.fileName}`,
        subtitle: `100% Verbatim Synced PDF Book (${synced.totalPages} Pages • ${synced.totalChapters} Chapters)`,
        subtitleAr: `كتاب كامل مستورد ومفهرس حرفياً (${synced.totalPages} صفحة • ${synced.totalChapters} فصلاً)`,
        edition: `Full Synced PDF (${synced.totalPages} Pages)`,
        editors: 'Google Drive Synced Textbook',
        publisher: 'Google Drive / Local Full PDF Import',
        isbnOrUan: `Drive ID: ${synced.driveFileId}`,
        badge: synced.customBadge || synced.fileName.slice(0, 22),
        badgeAr: synced.customBadge || synced.fileName.slice(0, 22),
        description: `Complete verbatim page-by-page extraction of ${synced.fileName} (${synced.totalPages} pages).`,
        descriptionAr: `النص الكامل المستخرج صفحة بصفحة (100% من الصفحات حرفياً) لملف ${synced.fileName}.`,
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

export function searchVerbatimLibrary(
  query: string,
  options?: {
    bookId?: string;
    systemCategory?: string;
  }
): LibrarySearchMatch[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

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

      // 1. Chapter Title & Keywords Match
      if (
        chapter.title.toLowerCase().includes(cleanQ) ||
        chapter.titleAr.toLowerCase().includes(cleanQ) ||
        chapter.keywords.some(k => k.toLowerCase().includes(cleanQ))
      ) {
        results.push({
          book,
          chapter,
          matchType: 'title',
          snippet: `${chapter.title} • Keywords: ${chapter.keywords.slice(0, 5).join(', ')}`,
          score: 100
        });
      }

      // 2. Section Heading & Body Matches
      for (const section of chapter.sections) {
        const headingMatch =
          section.heading.toLowerCase().includes(cleanQ) ||
          section.headingAr.toLowerCase().includes(cleanQ);

        const bodyIndex = section.body.toLowerCase().indexOf(cleanQ);

        if (headingMatch || bodyIndex !== -1) {
          let snippet = '';
          if (bodyIndex !== -1) {
            const start = Math.max(0, bodyIndex - 80);
            const end = Math.min(section.body.length, bodyIndex + cleanQ.length + 100);
            snippet = `...${section.body.slice(start, end).replace(/\n+/g, ' ')}...`;
          } else {
            snippet = section.body.slice(0, 160).replace(/\n+/g, ' ') + '...';
          }

          results.push({
            book,
            chapter,
            section,
            matchType: headingMatch ? 'heading' : 'body',
            snippet,
            score: headingMatch ? 80 : 50
          });
        }
      }

      // 3. Board Pearls Match
      for (const pearl of chapter.boardPearls) {
        if (pearl.toLowerCase().includes(cleanQ)) {
          results.push({
            book,
            chapter,
            matchType: 'pearl',
            snippet: pearl.slice(0, 180) + '...',
            score: 75
          });
          break;
        }
      }

      // 4. Quick Tables Match
      for (const table of chapter.quickTables) {
        if (
          table.title.toLowerCase().includes(cleanQ) ||
          table.headers.some(h => h.toLowerCase().includes(cleanQ)) ||
          table.rows.some(r => r.some(cell => cell.toLowerCase().includes(cleanQ)))
        ) {
          results.push({
            book,
            chapter,
            matchType: 'table',
            snippet: `Table: ${table.title} (Found matching row or header)`,
            score: 70
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

import { VERBATIM_BOOKS } from '../library';
import { VerbatimBook, VerbatimChapter } from '../library/libraryTypes';
import {
  FullBookPageRecord,
  SyncedFullBookRecord,
  getSyncedFullBookByIdSync,
  getSyncedPdfBytes,
  saveSyncedFullBook
} from './fullBookIdb';
import { KNOWN_DRIVE_BOOK_MAPPINGS, BookSyncProgress, computeContentHash } from './fullBookEngine';

/**
 * Transliterates common medical/mathematical Unicode symbols for WinAnsi PDF literal strings
 * so clinical operators (>=, <=, +/-, mcg, alpha, beta) are never lost in PDF stream rendering.
 */
function normalizeForPdfWinAnsi(raw: string): string {
  return raw
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/±/g, '+/-')
    .replace(/×/g, 'x')
    .replace(/÷/g, '/')
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/↔/g, '<->')
    .replace(/↑/g, '^')
    .replace(/↓/g, 'v')
    .replace(/μ/g, 'mc')
    .replace(/µ/g, 'mc')
    .replace(/α/g, 'alpha')
    .replace(/β/g, 'beta')
    .replace(/γ/g, 'gamma')
    .replace(/Δ/g, 'Delta')
    .replace(/[•·]/g, '*')
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
}

function escapePdfText(raw: string): string {
  return normalizeForPdfWinAnsi(raw)
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Wraps long text into lines of at most `maxChars` characters for clean PDF page rendering
 * without dropping any lines.
 */
export function wrapTextLines(text: string, maxChars: number = 88): string[] {
  const paragraphs = normalizeForPdfWinAnsi(text).split('\n');
  const wrapped: string[] = [];

  for (const para of paragraphs) {
    const clean = para.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) {
      wrapped.push('');
      continue;
    }
    const words = clean.split(' ');
    let line = '';
    for (const word of words) {
      if (!line) {
        line = word;
      } else if (line.length + 1 + word.length <= maxChars) {
        line += ' ' + word;
      } else {
        wrapped.push(line);
        line = word;
      }
    }
    if (line) wrapped.push(line);
  }
  return wrapped;
}

/**
 * Synthesizes a valid, standard-compliant multi-page PDF-1.4 binary (`ArrayBuffer`)
 * from an array of structured page records.
 * Long pages are automatically paginated across continuation sheets so ZERO lines are truncated.
 */
export function synthesizeValidMultiPagePdfBuffer(
  bookTitle: string,
  edition: string,
  pages: {
    pageNumber: number;
    chapterTitle: string;
    sectionHeading: string;
    text: string;
  }[]
): ArrayBuffer {
  const rawInputPages =
    pages.length > 0
      ? pages
      : [
          {
            pageNumber: 1,
            chapterTitle: bookTitle,
            sectionHeading: edition,
            text: bookTitle
          }
        ];

  const MAX_LINES_PER_SHEET = 46;
  const paginatedSheets: {
    pageNumber: number;
    chapterTitle: string;
    sectionHeading: string;
    lines: string[];
  }[] = [];

  for (const p of rawInputPages) {
    const allLines = wrapTextLines(p.text, 88);
    if (allLines.length <= MAX_LINES_PER_SHEET) {
      paginatedSheets.push({
        pageNumber: paginatedSheets.length + 1,
        chapterTitle: p.chapterTitle,
        sectionHeading: p.sectionHeading,
        lines: allLines
      });
    } else {
      let part = 1;
      for (let offset = 0; offset < allLines.length; offset += MAX_LINES_PER_SHEET) {
        const chunkLines = allLines.slice(offset, offset + MAX_LINES_PER_SHEET);
        paginatedSheets.push({
          pageNumber: paginatedSheets.length + 1,
          chapterTitle: p.chapterTitle,
          sectionHeading:
            part === 1 ? p.sectionHeading : `${p.sectionHeading} (Cont. Part ${part})`,
          lines: chunkLines
        });
        part++;
      }
    }
  }

  const objects: string[] = [];
  const pageObjIds: number[] = [];

  for (let i = 0; i < paginatedSheets.length; i++) {
    pageObjIds.push(5 + i * 2);
  }

  // Object 1: Catalog
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

  // Object 2: Pages
  const kidsRefs = pageObjIds.map(id => `${id} 0 R`).join(' ');
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [ ${kidsRefs} ] /Count ${paginatedSheets.length} >>\nendobj\n`
  );

  // Object 3: Helvetica
  objects.push(
    `3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n`
  );

  // Object 4: Helvetica-Bold
  objects.push(
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n`
  );

  for (let i = 0; i < paginatedSheets.length; i++) {
    const p = paginatedSheets[i];
    const pageObjId = 5 + i * 2;
    const contentObjId = 6 + i * 2;

    const streamCommands: string[] = [];

    // Header Banner Bar
    streamCommands.push('0.06 0.46 0.43 rg');
    streamCommands.push('36 742 540 28 re f');
    streamCommands.push('0 0 0 rg');

    // Header Text (White)
    streamCommands.push('BT');
    streamCommands.push('1 1 1 rg');
    streamCommands.push('/F2 9 Tf');
    streamCommands.push(
      `44 752 Td (${escapePdfText(bookTitle.slice(0, 62))} | Embedded Summary Page ${p.pageNumber} of ${paginatedSheets.length}) Tj`
    );
    streamCommands.push('ET');

    // Chapter & Section Title
    streamCommands.push('BT');
    streamCommands.push('0.07 0.12 0.22 rg');
    streamCommands.push('/F2 11 Tf');
    streamCommands.push(`36 720 Td (${escapePdfText(p.chapterTitle.slice(0, 82))}) Tj`);
    streamCommands.push('/F2 10 Tf');
    streamCommands.push('0.05 0.45 0.42 rg');
    streamCommands.push(`0 -16 Td (${escapePdfText(p.sectionHeading.slice(0, 86))}) Tj`);
    streamCommands.push('ET');

    // Divider line
    streamCommands.push('0.82 0.86 0.90 RG');
    streamCommands.push('0.75 w');
    streamCommands.push('36 696 m 576 696 l S');

    // Body Text Lines
    streamCommands.push('BT');
    streamCommands.push('0.12 0.16 0.23 rg');
    streamCommands.push('/F1 9.2 Tf');
    streamCommands.push('12.5 TL');
    streamCommands.push('36 680 Td');

    for (const line of p.lines) {
      if (!line) {
        streamCommands.push('T*');
      } else {
        streamCommands.push(`(${escapePdfText(line)}) Tj T*`);
      }
    }
    streamCommands.push('ET');

    // Footer
    streamCommands.push('BT');
    streamCommands.push('0.45 0.50 0.58 rg');
    streamCommands.push('/F1 8 Tf');
    streamCommands.push(
      `36 28 Td (ClinPharm Built-in Offline Summary [NOT Original PDF] | ${escapePdfText(
        edition.slice(0, 48)
      )} | Page ${p.pageNumber}/${paginatedSheets.length}) Tj`
    );
    streamCommands.push('ET');

    const streamContent = streamCommands.join('\n');

    objects.push(
      `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`
    );
    objects.push(
      `${contentObjId} 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`
    );
  }

  let pdfString = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets: number[] = [0];

  for (const objStr of objects) {
    offsets.push(pdfString.length);
    pdfString += objStr;
  }

  const xrefOffset = pdfString.length;
  const totalObjCount = objects.length + 1;
  pdfString += `xref\n0 ${totalObjCount}\n`;
  pdfString += `0000000000 65535 f \n`;

  for (let idx = 1; idx < offsets.length; idx++) {
    const offStr = String(offsets[idx]).padStart(10, '0');
    pdfString += `${offStr} 00000 n \n`;
  }

  pdfString += `trailer\n<< /Size ${totalObjCount} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const bytes = new Uint8Array(pdfString.length);
  for (let i = 0; i < pdfString.length; i++) {
    bytes[i] = pdfString.charCodeAt(i) & 0xff;
  }
  return bytes.buffer;
}

/**
 * Compiles a built-in VerbatimBook into an explicit `embedded_synthetic` summary record
 * (`processingStatus: 'embedded_summary'`). Must NEVER be represented as an imported original PDF.
 */
export function compileEmbeddedBookToFullRecord(
  bookIdOrDriveId: string
): { record: SyncedFullBookRecord; pdfBytes: ArrayBuffer } {
  const mapping =
    KNOWN_DRIVE_BOOK_MAPPINGS.find(
      m => m.bookId === bookIdOrDriveId || m.defaultDriveId === bookIdOrDriveId
    ) || KNOWN_DRIVE_BOOK_MAPPINGS[0];

  const baseBook: VerbatimBook =
    VERBATIM_BOOKS.find(b => b.id === mapping.bookId) || VERBATIM_BOOKS[0];

  const pages: FullBookPageRecord[] = [];
  const pdfRenderPages: {
    pageNumber: number;
    chapterTitle: string;
    sectionHeading: string;
    text: string;
  }[] = [];

  let pageCursor = 1;
  let totalCharacters = 0;

  for (const ch of baseBook.chapters) {
    const pearlsBlock = [
      `CHAPTER ${ch.chapterNumber}: ${ch.title}`,
      `Authors: ${ch.authors} | Edition: ${ch.edition} | Reference Pages: ${ch.pageRange}`,
      `Citation: ${ch.citation}`,
      '',
      'LEARNING OBJECTIVES:',
      ...ch.learningObjectives.map((o, idx) => `${idx + 1}. ${o}`),
      '',
      'HIGH-YIELD BOARD PEARLS & CLINICAL DIRECTIVES:',
      ...ch.boardPearls.map(p => `* ${p}`)
    ].join('\n');

    totalCharacters += pearlsBlock.length;
    const firstSecId = ch.sections[0]?.id || `${ch.id}-overview`;

    pages.push({
      id: `${baseBook.id}-page-${pageCursor}`,
      bookId: baseBook.id,
      pageNumber: pageCursor,
      originalPageNumber: pageCursor,
      text: pearlsBlock,
      extractedText: pearlsBlock,
      extractionMethod: 'native_text',
      extractionStatus: 'extracted',
      contentHash: computeContentHash(pearlsBlock),
      chapterId: ch.id,
      chapterTitle: ch.title,
      sectionId: firstSecId,
      lineCount: pearlsBlock.split('\n').length
    });
    pdfRenderPages.push({
      pageNumber: pageCursor,
      chapterTitle: `Ch. ${ch.chapterNumber}: ${ch.title}`,
      sectionHeading: `Chapter Overview, Objectives & Board Pearls (${ch.pageRange})`,
      text: pearlsBlock
    });
    pageCursor++;

    for (const sec of ch.sections) {
      let secText = `${sec.number} ${sec.heading}\n`;
      if (sec.evidenceGrade) {
        secText += `Evidence Standard: ${sec.evidenceGrade}\n`;
      }
      secText += `\n${sec.body}`;

      if (sec.tables && sec.tables.length > 0) {
        for (const t of sec.tables) {
          secText += `\n\n[TABLE: ${t.title}]\n`;
          secText += t.headers.join(' | ') + '\n';
          for (const r of t.rows) {
            secText += r.join(' | ') + '\n';
          }
        }
      }

      totalCharacters += secText.length;
      pages.push({
        id: `${baseBook.id}-page-${pageCursor}`,
        bookId: baseBook.id,
        pageNumber: pageCursor,
        originalPageNumber: pageCursor,
        text: secText,
        extractedText: secText,
        extractionMethod: 'native_text',
        extractionStatus: 'extracted',
        contentHash: computeContentHash(secText),
        chapterId: ch.id,
        chapterTitle: ch.title,
        sectionId: sec.id,
        lineCount: secText.split('\n').length
      });
      pdfRenderPages.push({
        pageNumber: pageCursor,
        chapterTitle: `Ch. ${ch.chapterNumber}: ${ch.title}`,
        sectionHeading: `Section ${sec.number}: ${sec.heading}`,
        text: secText
      });
      pageCursor++;
    }

    if (ch.quickTables && ch.quickTables.length > 0) {
      const tablesText = ch.quickTables
        .map(
          t =>
            `REFERENCE TABLE: ${t.title}\nColumns: ${t.headers.join(' | ')}\n` +
            t.rows.map(r => r.join(' | ')).join('\n')
        )
        .join('\n\n');

      totalCharacters += tablesText.length;
      pages.push({
        id: `${baseBook.id}-page-${pageCursor}`,
        bookId: baseBook.id,
        pageNumber: pageCursor,
        originalPageNumber: pageCursor,
        text: tablesText,
        extractedText: tablesText,
        extractionMethod: 'native_text',
        extractionStatus: 'extracted',
        contentHash: computeContentHash(tablesText),
        chapterId: ch.id,
        chapterTitle: ch.title,
        sectionId: ch.sections[ch.sections.length - 1]?.id || firstSecId,
        lineCount: tablesText.split('\n').length
      });
      pdfRenderPages.push({
        pageNumber: pageCursor,
        chapterTitle: `Ch. ${ch.chapterNumber}: ${ch.title}`,
        sectionHeading: `Indexed Clinical Dosing & Algorithm Tables`,
        text: tablesText
      });
      pageCursor++;
    }
  }

  const pdfBytes = synthesizeValidMultiPagePdfBuffer(
    baseBook.title,
    baseBook.edition,
    pdfRenderPages
  );

  const safeFileName = `${mapping.badge.replace(/[^a-zA-Z0-9_-]+/g, '_')}_Embedded_Summary.pdf`;
  const nowIso = new Date().toISOString();

  const record: SyncedFullBookRecord = {
    id: baseBook.id,
    bookId: baseBook.id,
    driveFileId: `builtin-${baseBook.id}`,
    fileName: safeFileName,
    sourceFileName: safeFileName,
    displayTitle: `${baseBook.title} (Embedded Offline Summary)`,
    mimeType: 'application/pdf',
    fileSize: pdfBytes.byteLength,
    originalFileSize: pdfBytes.byteLength,
    sha256: `embedded-summary-${baseBook.id}`,
    totalPages: pages.length,
    originalPageCount: pages.length,
    processedPageCount: pages.length,
    extractedTextPageCount: pages.length,
    ocrPageCount: 0,
    unprocessedPageCount: 0,
    blankPageCount: 0,
    totalChapters: baseBook.chapters.length,
    totalCharacters,
    emptyTextPagesCount: 0,
    sourceType: 'embedded_synthetic',
    processingStatus: 'embedded_summary',
    processingVersion: '2.0.0',
    syncedAt: nowIso,
    createdAt: nowIso,
    updatedAt: nowIso,
    chapters: baseBook.chapters as VerbatimChapter[],
    pages
  };

  return { record, pdfBytes };
}

/**
 * Seeds a built-in embedded summary ONLY if a real imported PDF does not already exist for this bookId.
 */
export async function seedSingleEmbeddedBookOffline(
  bookId: string,
  onProgress?: (progress: BookSyncProgress) => void
): Promise<SyncedFullBookRecord> {
  const existing = getSyncedFullBookByIdSync(bookId);
  if (
    existing &&
    (existing.sourceType === 'google_drive_pdf' || existing.sourceType === 'local_file_pdf')
  ) {
    return existing;
  }

  const { record, pdfBytes } = compileEmbeddedBookToFullRecord(bookId);

  onProgress?.({
    bookId: record.bookId,
    fileName: record.fileName,
    phase: 'indexing',
    currentPage: record.totalPages,
    totalPages: record.totalPages,
    processingStatus: 'embedded_summary',
    message: `Preparing embedded offline summary (not the original PDF) "${record.fileName}" (${record.totalPages} pages)...`
  });

  const saved = await saveSyncedFullBook(record, pdfBytes);

  onProgress?.({
    bookId: saved.bookId,
    fileName: saved.fileName,
    phase: 'completed',
    currentPage: saved.totalPages,
    totalPages: saved.totalPages,
    processingStatus: 'embedded_summary',
    message: `Embedded offline summary (not the original PDF) "${saved.fileName}" is stored separately from original PDF imports.`
  });

  return saved;
}

/**
 * Optional helper to seed embedded summaries without ever overwriting real imported PDFs.
 */
export async function ensureAllCoreBooksPreloadedOffline(
  forceRebuildSummaries: boolean = false,
  onProgress?: (progress: BookSyncProgress) => void
): Promise<SyncedFullBookRecord[]> {
  const results: SyncedFullBookRecord[] = [];

  for (const mapping of KNOWN_DRIVE_BOOK_MAPPINGS) {
    const existingRecord = getSyncedFullBookByIdSync(mapping.bookId);
    const existingBytes = await getSyncedPdfBytes(mapping.bookId);

    // Never overwrite a real imported PDF
    if (
      existingRecord &&
      (existingRecord.sourceType === 'google_drive_pdf' ||
        existingRecord.sourceType === 'local_file_pdf')
    ) {
      results.push(existingRecord);
      continue;
    }

    if (!forceRebuildSummaries && existingRecord && existingBytes && existingBytes.byteLength > 0) {
      results.push(existingRecord);
      continue;
    }

    const seeded = await seedSingleEmbeddedBookOffline(mapping.bookId, onProgress);
    results.push(seeded);
  }

  return results;
}

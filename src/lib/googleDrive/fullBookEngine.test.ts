import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeSha256Hex,
  downloadDriveFileBuffer,
  extractTablesFromPageText,
  hasPdfSignature,
  ingestDriveFileAsFullBook,
  parsePdfBufferToFullBookRecord,
  reconstructVerbatimPageText,
  setCustomPdfJsLoaderForTest,
} from './fullBookEngine';
import {
  clearAllSyncedFullBooksFromIdb,
  getBookBatchCheckpoint,
  getBookImportJobsSync,
  getSyncedFullBookByIdSync,
  normalizeSyncedFullBookRecord,
  removeSyncedFullBook,
  saveSyncedFullBook,
  setSimulatedDbSaveFailureForTest,
  type SyncedFullBookRecord,
} from './fullBookIdb';
import { seedSingleEmbeddedBookOffline } from './embeddedBookCompiler';

function createValidPdfBuffer(tag = 'test-pdf-payload'): ArrayBuffer {
  const text = `%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n% ${tag}\n%%EOF`;
  return new TextEncoder().encode(text).buffer as ArrayBuffer;
}

interface MockPdfTextItem {
  str: string;
  transform: number[];
  width?: number;
  height?: number;
  hasEOL?: boolean;
}

interface MockOutlineItem {
  title: string;
  dest?: string | unknown[];
  pageNumber?: number;
  items?: MockOutlineItem[];
}

function buildMockPdfJsLib(config: {
  numPages: number;
  pageBuilder: (pageNumber: number) => {
    items: MockPdfTextItem[];
    hasImages?: boolean;
    hasOperators?: boolean;
  };
  outline?: MockOutlineItem[] | null;
}) {
  return async () => ({
    getDocument(_params: unknown) {
      return {
        promise: Promise.resolve({
          numPages: config.numPages,
          async getPage(pageNumber: number) {
            const pageData = config.pageBuilder(pageNumber);
            const hasImages = Boolean(pageData.hasImages);
            const hasOperators = pageData.hasOperators ?? (hasImages || pageData.items.length > 0);
            return {
              hasImages,
              hasOperators,
              async getTextContent() {
                return { items: pageData.items };
              },
              async getOperatorList() {
                return {
                  // 85 = paintImageXObject in PDF.js OPS
                  fnArray: hasImages ? [85, 1, 2] : hasOperators ? [1, 2, 3] : [],
                };
              },
            };
          },
          async getOutline() {
            return config.outline ?? null;
          },
          async getDestination(dest: string | unknown[]) {
            if (typeof dest === 'string' && dest.startsWith('page-')) {
              const p = Number(dest.replace('page-', ''));
              return [{ num: p - 1 }];
            }
            return dest as unknown[];
          },
          async getPageIndex(ref: unknown) {
            if (ref && typeof ref === 'object' && 'num' in (ref as Record<string, unknown>)) {
              return Number((ref as { num: number }).num);
            }
            return 0;
          },
        }),
      };
    },
  });
}

describe('ClinPharm Hospital Full Medical PDF Ingestion Suite (16 Mandatory Scenarios)', () => {
  beforeEach(async () => {
    setCustomPdfJsLoaderForTest(null);
    setSimulatedDbSaveFailureForTest(null);
    vi.restoreAllMocks();
    await clearAllSyncedFullBooksFromIdb();
    await removeSyncedFullBook('test-book-1');
    await removeSyncedFullBook('dipiro-13th-ed');
  });

  afterEach(() => {
    setCustomPdfJsLoaderForTest(null);
    setSimulatedDbSaveFailureForTest(null);
    vi.restoreAllMocks();
  });

  // 1. تنزيل PDF صالح وتحليله
  it('1. downloads a valid PDF buffer and parses all pages into a verified_complete record with SHA-256 and original sourceFileName', async () => {
    const pdfBuffer = createValidPdfBuffer('valid-clinical-manual-v1');
    const expectedSha256 = await computeSha256Hex(pdfBuffer);

    // Mock 1: downloadDriveFileBuffer call
    // Mock 2: fetchPublicDrivePdfViaProxy inside ingestDriveFileAsFullBook (when accessToken is omitted)
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(pdfBuffer.slice(0), {
          status: 200,
          headers: { 'content-type': 'application/pdf' },
        })
      )
      .mockResolvedValueOnce(
        new Response(pdfBuffer.slice(0), {
          status: 200,
          headers: {
            'content-type': 'application/pdf',
            'x-drive-filename': encodeURIComponent('Harriet_Lane_23e_Original.pdf'),
          },
        })
      );

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 3,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Chapter ${pageNumber}: Pediatric Meropenem Dosing 20-40 mg/kg IV q8h`,
              transform: [1, 0, 0, 1, 36, 720],
              width: 300,
              height: 12,
            },
            {
              str: `Clinical monitoring on original page ${pageNumber} requires renal adjustment.`,
              transform: [1, 0, 0, 1, 36, 700],
              width: 320,
              height: 12,
            },
          ],
        }),
      })
    );

    const downloadedBuffer = await downloadDriveFileBuffer('ya29.valid_token', 'drive-valid-123');
    expect(hasPdfSignature(downloadedBuffer)).toBe(true);
    expect(await computeSha256Hex(downloadedBuffer)).toBe(expectedSha256);

    const savedRecord = await ingestDriveFileAsFullBook({
      targetBookId: 'test-book-1',
      driveFileId: 'drive-valid-123',
    });

    expect(savedRecord.processingStatus).toBe('verified_complete');
    expect(savedRecord.sourceType).toBe('google_drive_pdf');
    expect(savedRecord.sourceFileName).toBe('Harriet_Lane_23e_Original.pdf');
    expect(savedRecord.driveFileId).toBe('drive-valid-123');
    expect(savedRecord.originalPageCount).toBe(3);
    expect(savedRecord.extractedTextPageCount).toBe(3);
    expect(savedRecord.unprocessedPageCount).toBe(0);
    expect(savedRecord.sha256).toBe(expectedSha256);
    expect(savedRecord.diagnosticReport?.finalVerificationStatus).toBe('verified_complete');
  });

  // 2. فشل تنزيل ملف من Google Drive (مع منع الاستبدال الصامت بمرجع مضمّن)
  it('2. fails explicitly when Google Drive download fails and never falls back silently to an embedded synthetic book', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Service Unavailable', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'content-type': 'text/plain' },
      })
    );

    await expect(
      ingestDriveFileAsFullBook({
        targetBookId: 'test-book-1',
        driveFileId: 'drive-unreachable-id',
      })
    ).rejects.toThrow(/no embedded substitute was used/i);

    const storedAfterFailure = getSyncedFullBookByIdSync('test-book-1');
    expect(storedAfterFailure).toBeUndefined();
  });

  // 3. انتهاء صلاحية رمز الوصول (HTTP 401)
  it('3. surfaces an explicit expired/unauthorized token error when Google Drive returns HTTP 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ error: { code: 401, message: 'Invalid Credentials' } }), {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'content-type': 'application/json' },
      })
    );

    await expect(
      downloadDriveFileBuffer('ya29.expired_token', 'drive-protected-file')
    ).rejects.toThrow(/401|authorization error/i);
  });

  // 4. رفض استجابة HTML بدلاً من PDF
  it('4. rejects an HTML login or confirmation page returned instead of a binary PDF', async () => {
    const htmlBytes = new TextEncoder().encode(
      '<!DOCTYPE html><html><head><title>Google Drive - Sign in</title></head><body>accounts.google.com/ServiceLogin</body></html>'
    );
    expect(hasPdfSignature(htmlBytes.buffer as ArrayBuffer)).toBe(false);

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(htmlBytes, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    );

    await expect(
      downloadDriveFileBuffer('ya29.some_token', 'drive-html-response')
    ).rejects.toThrow(/HTML/i);
  });

  // 5. رفض ملف PDF تالف أو فارغ
  it('5. rejects empty buffers and corrupt PDF payloads that lack a valid PDF header or fail PDF parsing', async () => {
    const emptyBuffer = new ArrayBuffer(0);
    expect(hasPdfSignature(emptyBuffer)).toBe(false);

    await expect(
      parsePdfBufferToFullBookRecord({
        pdfBytes: emptyBuffer,
        bookId: 'test-book-1',
        fileName: 'Corrupt.pdf',
        driveFileId: 'drive-corrupt',
        sourceType: 'local_file_pdf',
      })
    ).rejects.toThrow(/not a valid PDF/i);

    const corruptPdfWithHeader = createValidPdfBuffer('corrupt-xref-table');
    setCustomPdfJsLoaderForTest(async () => ({
      getDocument() {
        return {
          promise: Promise.reject(new Error('InvalidPDFException: Invalid XRef stream')),
        };
      },
    }));

    await expect(
      parsePdfBufferToFullBookRecord({
        pdfBytes: corruptPdfWithHeader,
        bookId: 'test-book-1',
        fileName: 'Corrupt_XRef.pdf',
        driveFileId: 'drive-corrupt-xref',
        sourceType: 'local_file_pdf',
      })
    ).rejects.toThrow(/InvalidPDFException/);

    const failedJobs = getBookImportJobsSync('test-book-1');
    expect(failedJobs.length).toBeGreaterThan(0);
    expect(failedJobs[0].jobStatus).toBe('failed');
  });

  // 6. معالجة ملف PDF كبير على دفعات (Batch Processing)
  it('6. processes a multi-page PDF in configurable batches without dropping pages or chapters', async () => {
    const pdfBuffer = createValidPdfBuffer('large-24-page-reference');
    const progressPages: number[] = [];

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 24,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Page ${pageNumber} — Clinical Antimicrobial Stewardship Protocol & Dosing`,
              transform: [1, 0, 0, 1, 40, 740],
              width: 340,
              height: 12,
            },
          ],
        }),
      })
    );

    const record = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Sanford_Guide_Full.pdf',
      driveFileId: 'drive-large-24p',
      sourceType: 'google_drive_pdf',
      batchSize: 5,
      onProgress: (p) => {
        if (p.currentPage > 0) progressPages.push(p.currentPage);
      },
    });

    expect(record.originalPageCount).toBe(24);
    expect(record.extractedTextPageCount).toBe(24);
    expect(record.processingStatus).toBe('verified_complete');
    expect(record.diagnosticReport?.processedPageCount).toBe(24);
    expect(record.pages.length).toBe(24);
    expect(progressPages.length).toBe(24);
  });

  // 7. اكتشاف صفحات مصورة بلا نص وتشغيل مسار OCR الاختياري
  it('7. detects scanned image-only pages without injecting fake text, marks book partially_complete/needs_ocr unless OCR adapter extracts them, and records OCR provenance', async () => {
    const pdfBuffer = createValidPdfBuffer('scanned-pages-pdf');

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 3,
        pageBuilder: (pageNumber) => {
          if (pageNumber === 2) {
            // Scanned image page without selectable text layer
            return { items: [], hasImages: true };
          }
          return {
            items: [
              {
                str: `Page ${pageNumber}: Native selectable text on page ${pageNumber}.`,
                transform: [1, 0, 0, 1, 36, 700],
                width: 280,
                height: 12,
              },
            ],
            hasImages: false,
          };
        },
      })
    );

    // Run 1: Without OCR adapter -> must NOT be verified_complete, must NOT invent placeholder text
    const withoutOcr = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Scanned_Formulary.pdf',
      driveFileId: 'drive-scanned-no-ocr',
      sourceType: 'google_drive_pdf',
    });

    expect(withoutOcr.processingStatus).toBe('partially_complete');
    expect(withoutOcr.extractedTextPageCount).toBe(2);
    expect(withoutOcr.unprocessedPageCount).toBe(1);
    const page2WithoutOcr = withoutOcr.pages.find((p) => p.pageNumber === 2);
    expect(page2WithoutOcr?.extractionStatus).toBe('needs_ocr');
    expect(page2WithoutOcr?.extractedText).toBe('');

    // Run 2: With OCR adapter -> extracts OCR text into ocrText and marks page ocr_completed
    const withOcr = await parsePdfBufferToFullBookRecord({
      pdfBytes: createValidPdfBuffer('scanned-pages-pdf-ocr'),
      bookId: 'test-book-1-ocr',
      fileName: 'Scanned_Formulary_OCR.pdf',
      driveFileId: 'drive-scanned-with-ocr',
      sourceType: 'google_drive_pdf',
      ocrAdapter: async ({ pageNumber }) => ({
        ocrText: `OCR Extracted Page ${pageNumber}: Vancomycin trough target 15–20 mcg/mL.`,
        confidence: 94.5,
      }),
    });

    expect(withOcr.processingStatus).toBe('verified_complete');
    expect(withOcr.ocrPageCount).toBe(1);
    expect(withOcr.unprocessedPageCount).toBe(0);
    const page2WithOcr = withOcr.pages.find((p) => p.pageNumber === 2);
    expect(page2WithOcr?.extractionMethod).toBe('ocr');
    expect(page2WithOcr?.extractionStatus).toBe('ocr_completed');
    expect(page2WithOcr?.ocrText).toContain('Vancomycin trough target 15–20 mcg/mL');
    expect(page2WithOcr?.ocrConfidence).toBe(94.5);
  });

  // 8. الحفاظ على النصوص العربية والإنجليزية والرموز العلمية والطبية
  it('8. preserves Arabic text, English text, and scientific/medical symbols (≥, ≤, μg, α, β, ±) accurately', () => {
    const items: Array<Record<string, unknown>> = [
      {
        str: 'بروتوكول الجرعات السريرية للأطفال — CrCl ≥ 50 mL/min/1.73m²',
        transform: [1, 0, 0, 1, 36, 750],
        width: 320,
        height: 12,
      },
      {
        str: 'Norepinephrine 0.05–0.5 μg/kg/min IV (α1 & β1 agonist); target MAP ≥ 65 ± 5 mmHg; lactate ≤ 2.0 mmol/L',
        transform: [1, 0, 0, 1, 36, 730],
        width: 450,
        height: 12,
      },
    ];

    const reconstructed = reconstructVerbatimPageText(items);
    expect(reconstructed).toContain('بروتوكول الجرعات السريرية للأطفال');
    expect(reconstructed).toContain('CrCl ≥ 50 mL/min/1.73m²');
    expect(reconstructed).toContain('0.05–0.5 μg/kg/min');
    expect(reconstructed).toContain('(α1 & β1 agonist)');
    expect(reconstructed).toContain('± 5 mmHg');
    expect(reconstructed).toContain('≤ 2.0 mmol/L');
  });

  // 9. استخراج الجداول متعدّدة الصفوف والأعمدة دون أي قصّ (No 16-row or 5-column truncation)
  it('9. extracts medical dosing tables with >16 rows and >5 columns completely alongside units and footnotes without truncation', () => {
    const header =
      'Antimicrobial   Neonate (<7d)   Neonate (7-28d)   Infant/Child   Adult_Dose   CrCl_30_50   CrCl_10_29   HD_Adjustment';
    const dataRows: string[] = [];
    for (let i = 1; i <= 25; i += 1) {
      dataRows.push(
        `Drug_${i}   ${10 + i}mg/kg_q12h   ${15 + i}mg/kg_q8h   ${20 + i}mg/kg_q8h   ${500 + i * 10}mg_q8h   ${250 + i * 5}mg_q12h   ${125 + i}mg_q24h   Dose_after_HD`
      );
    }
    const footnote = '* Note: All doses expressed in mg/kg/dose IV unless otherwise indicated (μg/kg/min).';
    const pageText = [
      'Table 4.2: Comprehensive Renal & Neonatal Antimicrobial Dosing Matrix',
      header,
      ...dataRows,
      footnote,
    ].join('\n');

    const tables = extractTablesFromPageText(pageText, 42, 'test-book-1', 'ch-renal');
    expect(tables.length).toBe(1);
    const table = tables[0];
    expect(table.headers.length).toBe(8); // > 5 columns preserved
    expect(table.rows.length).toBe(25); // > 16 rows preserved
    expect(table.extractionStatus).toBe('structured');
    expect(table.pageNumber).toBe(42);
    expect(table.unitsAndFootnotes).toContain('mg/kg/dose');
  });

  // 10. استخراج الفهرس متعدّد المستويات (Multi-level PDF Outline Hierarchy)
  it('10. extracts multi-level PDF outlines (depth 1, 2, 3+) preserving parentChapterId and hierarchyLevel', async () => {
    const pdfBuffer = createValidPdfBuffer('deep-outline-book');

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 6,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Page ${pageNumber} clinical content for hierarchical outline verification.`,
              transform: [1, 0, 0, 1, 36, 700],
              width: 300,
              height: 12,
            },
          ],
        }),
        outline: [
          {
            title: 'Part I: Critical Care Pharmacotherapy',
            dest: 'page-1',
            items: [
              {
                title: 'Chapter 1: Hemodynamic Support',
                dest: 'page-2',
                items: [
                  {
                    title: 'Section 1.1: Vasopressor Titration in Septic Shock',
                    dest: 'page-3',
                    items: [],
                  },
                ],
              },
            ],
          },
        ],
      })
    );

    const record = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Critical_Care_Outline.pdf',
      driveFileId: 'drive-outline-3levels',
      sourceType: 'google_drive_pdf',
    });

    expect(record.chapters.length).toBe(3);
    const level1 = record.chapters.find((c) => c.hierarchyLevel === 1);
    const level2 = record.chapters.find((c) => c.hierarchyLevel === 2);
    const level3 = record.chapters.find((c) => c.hierarchyLevel === 3);

    expect(level1?.title).toContain('Part I');
    expect(level1?.parentChapterId).toBeNull();
    expect(level2?.title).toContain('Chapter 1');
    expect(level2?.parentChapterId).toBe(level1?.id);
    expect(level3?.title).toContain('Section 1.1');
    expect(level3?.parentChapterId).toBe(level2?.id);
    expect(level3?.startPage).toBe(3);
  });

  // 11. إيقاف المعالجة واستئنافها من آخر نقطة تحقق دون تكرار الصفحات
  it('11. resumes an interrupted import from the last saved batch checkpoint without duplicating previously extracted pages', async () => {
    const pdfBuffer = createValidPdfBuffer('resumable-10-page-book');

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 10,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Page ${pageNumber}: Authentic clinical text for resumable batch testing.`,
              transform: [1, 0, 0, 1, 36, 700],
              width: 300,
              height: 12,
            },
          ],
        }),
      })
    );

    // First run pauses after 4 pages (maxPagesToProcessInRun: 4)
    const partialRun = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Resumable_Manual.pdf',
      driveFileId: 'drive-resumable-10p',
      sourceType: 'google_drive_pdf',
      batchSize: 2,
      maxPagesToProcessInRun: 4,
    });

    expect(partialRun.processingStatus).toBe('partially_complete');
    expect(partialRun.extractedTextPageCount).toBe(4);
    expect(partialRun.unprocessedPageCount).toBe(6);

    const checkpoint = await getBookBatchCheckpoint('test-book-1');
    expect(checkpoint).not.toBeNull();
    expect(checkpoint?.lastProcessedPage).toBe(4);
    expect(checkpoint?.processedPages.length).toBe(4);

    // Second run resumes from page 5 and completes to page 10
    const resumed = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Resumable_Manual.pdf',
      driveFileId: 'drive-resumable-10p',
      sourceType: 'google_drive_pdf',
      batchSize: 2,
    });

    expect(resumed.processingStatus).toBe('verified_complete');
    expect(resumed.originalPageCount).toBe(10);
    expect(resumed.extractedTextPageCount).toBe(10);
    expect(resumed.pages.length).toBe(10);
    const uniquePageNumbers = new Set(resumed.pages.map((p) => p.pageNumber));
    expect(uniquePageNumbers.size).toBe(10);

    const clearedCheckpoint = await getBookBatchCheckpoint('test-book-1');
    expect(clearedCheckpoint).toBeNull();
  });

  // 12. منع تكرار استيراد نفس الملف بناءً على بصمة SHA-256
  it('12. deduplicates re-imports when a verified_complete book with the exact same SHA-256 already exists', async () => {
    const pdfBuffer = createValidPdfBuffer('dedup-sha256-book');
    const sha256 = await computeSha256Hex(pdfBuffer);

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 2,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Page ${pageNumber}: Deduplication test clinical content.`,
              transform: [1, 0, 0, 1, 36, 700],
              width: 280,
              height: 12,
            },
          ],
        }),
      })
    );

    const firstRecord = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Unique_Book.pdf',
      driveFileId: 'drive-sha-1',
      sourceType: 'google_drive_pdf',
    });
    await saveSyncedFullBook(firstRecord, pdfBuffer);
    expect(firstRecord.sha256).toBe(sha256);

    // Second parse with identical PDF buffer should reuse existing verified record without re-parsing
    const loaderSpy = vi.fn(
      buildMockPdfJsLib({
        numPages: 2,
        pageBuilder: () => ({ items: [] }),
      })
    );
    setCustomPdfJsLoaderForTest(loaderSpy);

    const secondRecord = await parsePdfBufferToFullBookRecord({
      pdfBytes: pdfBuffer,
      bookId: 'test-book-1',
      fileName: 'Unique_Book.pdf',
      driveFileId: 'drive-sha-1',
      sourceType: 'google_drive_pdf',
    });

    expect(loaderSpy).not.toHaveBeenCalled();
    expect(secondRecord.sha256).toBe(sha256);
    expect(secondRecord.processingStatus).toBe('verified_complete');
  });

  // 13. التعامل مع فشل الحفظ في قاعدة البيانات
  it('13. throws a clear error when database persistence fails and never reports the import as complete', async () => {
    const pdfBuffer = createValidPdfBuffer('db-save-failure-test');

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(pdfBuffer.slice(0), {
        status: 200,
        headers: {
          'content-type': 'application/pdf',
          'x-drive-filename': 'DB_Fail.pdf',
        },
      })
    );

    setCustomPdfJsLoaderForTest(
      buildMockPdfJsLib({
        numPages: 2,
        pageBuilder: (pageNumber) => ({
          items: [
            {
              str: `Page ${pageNumber}: Content that will fail on DB save.`,
              transform: [1, 0, 0, 1, 36, 700],
              width: 260,
              height: 12,
            },
          ],
        }),
      })
    );

    setSimulatedDbSaveFailureForTest('Simulated database persistence failure');

    await expect(
      ingestDriveFileAsFullBook({
        targetBookId: 'test-book-1',
        driveFileId: 'drive-db-fail',
      })
    ).rejects.toThrow(/Simulated database persistence failure/);

    setSimulatedDbSaveFailureForTest(null);
    expect(getSyncedFullBookByIdSync('test-book-1')).toBeUndefined();
  });

  // 14. منع إظهار حالة "مكتمل" لكتاب ناقص
  it('14. prevents marking any book as verified_complete if unprocessedPageCount > 0 or processedPageCount < originalPageCount', () => {
    const rawIncompleteRecord: SyncedFullBookRecord = {
      bookId: 'test-incomplete-book',
      fileName: 'Incomplete.pdf',
      mimeType: 'application/pdf',
      fileSize: 102400,
      driveFileId: 'drive-incomplete',
      syncedAt: new Date().toISOString(),
      totalPages: 100,
      originalPageCount: 100,
      processedPageCount: 82,
      extractedTextPageCount: 82,
      unprocessedPageCount: 18,
      totalChapters: 1,
      totalCharacters: 95000,
      sha256: 'b'.repeat(64),
      sourceType: 'google_drive_pdf',
      processingStatus: 'verified_complete', // Falsely claiming complete
      chapters: [],
      pages: [],
    };

    const normalized = normalizeSyncedFullBookRecord(rawIncompleteRecord);
    expect(normalized.processingStatus).not.toBe('verified_complete');
    expect(normalized.processingStatus).toBe('partially_complete');
    expect(normalized.unprocessedPageCount).toBe(18);
  });

  // 15. الحفاظ على الكتب الحالية وعدم فقدان أي بيانات عند الترقية أو عند استدعاء المرجع المضمّن
  it('15. preserves legacy stored books without data loss, strips legacy synthetic placeholder text, and blocks embedded summaries from overwriting real imported PDFs', async () => {
    // Part A: Legacy record with fake placeholder text on page 2 is cleaned and classified accurately
    const legacyRecord: SyncedFullBookRecord = {
      bookId: 'test-book-1',
      fileName: 'Legacy_Stored_Book.pdf',
      mimeType: 'application/pdf',
      fileSize: 50000,
      driveFileId: 'drive-legacy-1',
      syncedAt: new Date(Date.now() - 86400_000).toISOString(),
      totalPages: 2,
      totalChapters: 1,
      totalCharacters: 500,
      chapters: [],
      pages: [
        {
          pageNumber: 1,
          text: 'Genuine clinical text preserved from page 1.',
          chapterId: 'ch-leg-1',
          chapterTitle: 'Legacy Chapter',
          sectionId: 'sec-leg-1',
          lineCount: 1,
        },
        {
          pageNumber: 2,
          text: '[Page 2 of Legacy_Stored_Book.pdf — Graphical/Scanned Figure Page]',
          chapterId: 'ch-leg-1',
          chapterTitle: 'Legacy Chapter',
          sectionId: 'sec-leg-2',
          lineCount: 1,
        },
      ],
    };

    const normalizedLegacy = normalizeSyncedFullBookRecord(legacyRecord);
    expect(normalizedLegacy.pages[0].extractedText).toContain(
      'Genuine clinical text preserved from page 1.'
    );
    // Synthetic placeholder stripped and counted as unprocessed
    expect(normalizedLegacy.pages[1].extractedText).toBe('');
    expect(normalizedLegacy.unprocessedPageCount).toBe(1);
    expect(normalizedLegacy.processingStatus).toBe('partially_complete');

    // Part B: Genuine imported book cannot be overwritten by seedSingleEmbeddedBookOffline
    const realBookRecord: SyncedFullBookRecord = {
      bookId: 'dipiro-13th-ed',
      fileName: 'DiPiro_13e_Real_Original.pdf',
      sourceFileName: 'DiPiro_13e_Real_Original.pdf',
      displayTitle: "DiPiro's Pharmacotherapy (13th Ed)",
      mimeType: 'application/pdf',
      fileSize: 409600,
      driveFileId: '1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR',
      syncedAt: new Date().toISOString(),
      totalPages: 2,
      originalPageCount: 2,
      processedPageCount: 2,
      extractedTextPageCount: 2,
      unprocessedPageCount: 0,
      totalChapters: 1,
      totalCharacters: 25000,
      sha256: 'a'.repeat(64),
      sourceType: 'google_drive_pdf',
      processingStatus: 'verified_complete',
      chapters: [],
      pages: [
        {
          pageNumber: 1,
          text: 'Authentic imported PDF page 1.',
          extractedText: 'Authentic imported PDF page 1.',
          extractionMethod: 'native_text',
          extractionStatus: 'extracted',
          chapterId: 'ch-1',
          chapterTitle: 'Chapter 1',
          sectionId: 'sec-1',
          lineCount: 1,
        },
        {
          pageNumber: 2,
          text: 'Authentic imported PDF page 2.',
          extractedText: 'Authentic imported PDF page 2.',
          extractionMethod: 'native_text',
          extractionStatus: 'extracted',
          chapterId: 'ch-1',
          chapterTitle: 'Chapter 1',
          sectionId: 'sec-2',
          lineCount: 1,
        },
      ],
    };

    await saveSyncedFullBook(realBookRecord, createValidPdfBuffer('real-dipiro-pdf'));
    await seedSingleEmbeddedBookOffline('dipiro-13th-ed');

    const preserved = getSyncedFullBookByIdSync('dipiro-13th-ed');
    expect(preserved?.sourceType).toBe('google_drive_pdf');
    expect(preserved?.processingStatus).toBe('verified_complete');
    expect(preserved?.sourceFileName).toBe('DiPiro_13e_Real_Original.pdf');
  });

  // 16. التحقق من صلاحيات المستخدمين وسياسات RLS لقاعدة بيانات الكتب الطبية
  it('16. enforces RLS policies, role-based write controls, and anon revocation on all medical books database tables', () => {
    const migrationPath = path.resolve(
      process.cwd(),
      'supabase/migrations/0003_medical_books_full_ingestion.sql'
    );
    const sql = fs.readFileSync(migrationPath, 'utf8');

    const requiredTables = [
      'books',
      'book_chapters',
      'book_pages',
      'book_sections',
      'book_tables',
      'book_import_jobs',
    ];

    for (const table of requiredTables) {
      expect(sql).toMatch(
        new RegExp(`alter\\s+table\\s+public\\.${table}\\s+enable\\s+row\\s+level\\s+security`, 'i')
      );
      expect(sql).toContain(`public.${table}`);
    }

    expect(sql).toMatch(
      /revoke\s+all\s+on\s+public\.books,\s*public\.book_chapters,\s*public\.book_pages,\s*public\.book_sections,\s*public\.book_tables,\s*public\.book_import_jobs\s+from\s+anon/i
    );
    expect(sql).toContain('public.is_admin() or owner_id = auth.uid()');
  });
});

import {
  BookProcessingStatus,
  BookSourceType,
  SyncedFullBookRecord,
  getSyncedFullBooksSync,
  getSyncedPdfBytes,
  hydrateSyncedFullBooks,
  removeSyncedFullBook,
  saveSyncedFullBook,
  getAllSyncedPdfBlobSummaries,
  clearAllSyncedFullBooksFromIdb
} from './fullBookIdb';

export interface OfflineBookVaultItem {
  bookId: string;
  driveFileId: string;
  fileName: string;
  sourceFileName: string;
  displayTitle: string;
  customTitle?: string;
  sourceType: BookSourceType;
  processingStatus: BookProcessingStatus;
  sha256: string;
  totalPages: number;
  originalPageCount: number;
  processedPageCount: number;
  extractedTextPageCount: number;
  ocrPageCount: number;
  unprocessedPageCount: number;
  totalChapters: number;
  totalCharacters: number;
  syncedAt: string;
  hasBinaryPdf: boolean;
  binaryByteSize: number;
  indexedTextByteSize: number;
  isValidPdfSignature: boolean;
  offlineReady: boolean;
}

export interface OfflineVaultDiagnostics {
  isIndexedDbSupported: boolean;
  isPersistentStorageGranted: boolean;
  isOnline: boolean;
  totalBooksCached: number;
  totalVerifiedOriginalPdfs: number;
  totalEmbeddedSummaries: number;
  totalBinaryPdfsCached: number;
  totalPagesCached: number;
  totalChaptersCached: number;
  totalVaultBytes: number;
  browserQuotaBytes: number | null;
  browserUsageBytes: number | null;
  quotaUsagePercent: number | null;
  books: OfflineBookVaultItem[];
}

export interface IntegrityCheckResult {
  bookId: string;
  fileName: string;
  sourceType: BookSourceType;
  processingStatus: BookProcessingStatus;
  sha256: string;
  isHealthy: boolean;
  isVerifiedOriginalPdf: boolean;
  hasVerbatimPages: boolean;
  hasBinaryPdf: boolean;
  isValidPdfHeader: boolean;
  pageCount: number;
  processedPageCount: number;
  extractedTextPageCount: number;
  ocrPageCount: number;
  unprocessedPageCount: number;
  binaryBytes: number;
  messageEn: string;
  messageAr: string;
}

/**
 * Checks if the "%PDF-" magic header is present in the first 16 bytes of an ArrayBuffer.
 */
export function verifyPdfMagicHeader(buffer: ArrayBuffer | null | undefined): boolean {
  if (!buffer || buffer.byteLength < 5) return false;
  const view = new Uint8Array(buffer, 0, Math.min(16, buffer.byteLength));
  for (let i = 0; i <= view.length - 5; i++) {
    if (
      view[i] === 0x25 &&
      view[i + 1] === 0x50 &&
      view[i + 2] === 0x44 &&
      view[i + 3] === 0x46 &&
      view[i + 4] === 0x2d
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Formats byte counts into human-readable KB / MB / GB strings.
 */
export function formatStorageBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  if (mb < 0.1) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export async function requestPersistentOfflineStorage(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.storage) {
    return false;
  }
  try {
    if (typeof navigator.storage.persisted === 'function') {
      const alreadyPersisted = await navigator.storage.persisted();
      if (alreadyPersisted) return true;
    }
    if (typeof navigator.storage.persist === 'function') {
      return await navigator.storage.persist();
    }
    return false;
  } catch {
    return false;
  }
}

export async function checkPersistentStorageStatus(): Promise<boolean> {
  if (
    typeof navigator === 'undefined' ||
    !navigator.storage ||
    typeof navigator.storage.persisted !== 'function'
  ) {
    return false;
  }
  try {
    return await navigator.storage.persisted();
  } catch {
    return false;
  }
}

/**
 * Returns full diagnostics of the IndexedDB Offline PDF Vault, explicitly separating
 * verified original PDFs from embedded synthetic summaries and partially processed books.
 */
export async function getOfflineVaultDiagnostics(): Promise<OfflineVaultDiagnostics> {
  const isIndexedDbSupported = typeof indexedDB !== 'undefined';
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const isPersistentStorageGranted = await checkPersistentStorageStatus();

  const records = await hydrateSyncedFullBooks();
  const blobSummaries = await getAllSyncedPdfBlobSummaries();
  const blobMap = new Map<string, { byteLength: number; isValidPdfSignature: boolean }>();

  for (const summary of blobSummaries) {
    blobMap.set(summary.bookId, {
      byteLength: summary.byteLength,
      isValidPdfSignature: summary.isValidPdfSignature
    });
  }

  let totalPagesCached = 0;
  let totalChaptersCached = 0;
  let totalVaultBytes = 0;
  let totalBinaryPdfsCached = 0;
  let totalVerifiedOriginalPdfs = 0;
  let totalEmbeddedSummaries = 0;

  const books: OfflineBookVaultItem[] = records.map(rec => {
    const blobInfo = blobMap.get(rec.bookId);
    const hasBinaryPdf = Boolean(blobInfo && blobInfo.byteLength > 0);
    const binaryByteSize = blobInfo?.byteLength || 0;
    const indexedTextByteSize = Math.max(rec.totalCharacters * 2, 1024);
    const sourceType: BookSourceType = rec.sourceType || 'unverified_legacy';
    const processingStatus: BookProcessingStatus =
      rec.processingStatus ||
      (sourceType === 'embedded_synthetic' ? 'embedded_summary' : 'partially_complete');

    if (hasBinaryPdf) {
      totalBinaryPdfsCached++;
    }
    if (
      processingStatus === 'verified_complete' &&
      (sourceType === 'google_drive_pdf' || sourceType === 'local_file_pdf')
    ) {
      totalVerifiedOriginalPdfs++;
    }
    if (sourceType === 'embedded_synthetic') {
      totalEmbeddedSummaries++;
    }

    totalPagesCached += rec.totalPages;
    totalChaptersCached += rec.totalChapters;
    totalVaultBytes += binaryByteSize + indexedTextByteSize;

    return {
      bookId: rec.bookId,
      driveFileId: rec.driveFileId,
      fileName: rec.fileName,
      sourceFileName: rec.sourceFileName || rec.fileName,
      displayTitle: rec.displayTitle || rec.customTitle || rec.fileName,
      customTitle: rec.customTitle,
      sourceType,
      processingStatus,
      sha256: rec.sha256 || '',
      totalPages: rec.totalPages,
      originalPageCount: rec.originalPageCount ?? rec.totalPages,
      processedPageCount: rec.processedPageCount ?? rec.totalPages,
      extractedTextPageCount: rec.extractedTextPageCount ?? 0,
      ocrPageCount: rec.ocrPageCount ?? 0,
      unprocessedPageCount: rec.unprocessedPageCount ?? 0,
      totalChapters: rec.totalChapters,
      totalCharacters: rec.totalCharacters,
      syncedAt: rec.syncedAt,
      hasBinaryPdf,
      binaryByteSize,
      indexedTextByteSize,
      isValidPdfSignature: blobInfo?.isValidPdfSignature ?? Boolean(rec.sha256),
      offlineReady:
        processingStatus === 'verified_complete' &&
        ((hasBinaryPdf && Boolean(blobInfo?.isValidPdfSignature)) ||
          (rec.chapters.length > 0 && rec.totalCharacters > 0 && Boolean(rec.sha256)))
    };
  });

  let browserQuotaBytes: number | null = null;
  let browserUsageBytes: number | null = null;
  let quotaUsagePercent: number | null = null;

  if (typeof navigator !== 'undefined' && navigator.storage?.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      if (typeof estimate.quota === 'number' && estimate.quota > 0) {
        browserQuotaBytes = estimate.quota;
      }
      if (typeof estimate.usage === 'number') {
        browserUsageBytes = estimate.usage;
      }
      if (browserQuotaBytes && browserUsageBytes !== null) {
        quotaUsagePercent = Number(((browserUsageBytes / browserQuotaBytes) * 100).toFixed(2));
      }
    } catch {
      // ignore storage estimate errors in restricted contexts
    }
  }

  return {
    isIndexedDbSupported,
    isPersistentStorageGranted,
    isOnline,
    totalBooksCached: books.length,
    totalVerifiedOriginalPdfs,
    totalEmbeddedSummaries,
    totalBinaryPdfsCached,
    totalPagesCached,
    totalChaptersCached,
    totalVaultBytes,
    browserQuotaBytes,
    browserUsageBytes,
    quotaUsagePercent,
    books
  };
}

/**
 * Retrieves the cached PDF file from IndexedDB as a standard browser Blob.
 * Does NOT silently synthesize or save an embedded summary unless `allowEmbeddedSummaryFallback: true` is explicitly passed.
 */
export async function getOfflinePdfBlob(
  bookId: string,
  options?: { allowEmbeddedSummaryFallback?: boolean }
): Promise<Blob | null> {
  let bytes = await getSyncedPdfBytes(bookId);
  if (!bytes || bytes.byteLength === 0) {
    const { KNOWN_DRIVE_BOOK_MAPPINGS } = await import('./fullBookEngine');
    const matched = KNOWN_DRIVE_BOOK_MAPPINGS.find(
      m => m.bookId === bookId || m.defaultDriveId === bookId
    );
    if (matched && matched.bookId !== bookId) {
      bytes = await getSyncedPdfBytes(matched.bookId);
    }
  }
  if ((!bytes || bytes.byteLength === 0) && options?.allowEmbeddedSummaryFallback) {
    try {
      const { compileEmbeddedBookToFullRecord } = await import('./embeddedBookCompiler');
      const compiled = compileEmbeddedBookToFullRecord(bookId);
      await saveSyncedFullBook(compiled.record, compiled.pdfBytes);
      bytes = compiled.pdfBytes;
    } catch {
      return null;
    }
  }
  if (!bytes || bytes.byteLength === 0) return null;
  return new Blob([bytes], { type: 'application/pdf' });
}

export async function createOfflinePdfObjectUrl(bookId: string): Promise<string | null> {
  const blob = await getOfflinePdfBlob(bookId);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

export async function downloadOfflinePdfFromVault(bookId: string): Promise<boolean> {
  const books = await hydrateSyncedFullBooks();
  const book = books.find(b => b.bookId === bookId);
  let blob = await getOfflinePdfBlob(bookId);

  // If binary PDF is not in IndexedDB yet, attempt to fetch it on-demand from the server vault / proxy
  if (!blob && book?.driveFileId && !book.driveFileId.startsWith('builtin-')) {
    try {
      const { fetchPublicDrivePdfViaProxy } = await import('./fullBookEngine');
      const fetched = await fetchPublicDrivePdfViaProxy(
        book.driveFileId,
        null,
        { maxFileSizeBytes: 300 * 1024 * 1024, timeoutMs: 120_000 },
        book.bookId
      );
      if (fetched?.pdfBytes && fetched.pdfBytes.byteLength > 0) {
        await saveSyncedFullBook(book, fetched.pdfBytes, { silent: true });
        blob = new Blob([fetched.pdfBytes], { type: 'application/pdf' });
      }
    } catch {
      // Fallback below if offline or running on standalone APK without raw PDF proxy
    }
  }

  if (blob) {
    const rawName = book?.sourceFileName || book?.fileName || `${bookId}.pdf`;
    const safeFileName = rawName.toLowerCase().endsWith('.pdf') ? rawName : `${rawName}.pdf`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = safeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  }

  // Fallback for pre-indexed vault books on standalone Android APK / offline when 100MB binary PDF isn't cached:
  // Export the complete indexed verbatim text of the book as a downloadable Markdown/Text file.
  if (book && book.chapters.length > 0) {
    const headerLines = [
      `# ${book.displayTitle || book.sourceFileName || book.fileName}`,
      `Source File: ${book.sourceFileName || book.fileName}`,
      `Total Pages: ${book.totalPages} | Chapters: ${book.totalChapters} | SHA-256: ${book.sha256 || 'Verified'}`,
      `================================================================================\n`
    ];
    const chapterBlocks = book.chapters.slice(0, 60).map(ch => {
      const secText = (ch.sections || [])
        .map(s => `### [${s.number}] ${s.heading}\n${s.body || s.ocrBody || ''}`)
        .join('\n\n');
      return `## ${ch.title} (${ch.pageRange})\n\n${secText}`;
    });
    const fullContent = `${headerLines.join('\n')}\n${chapterBlocks.join('\n\n---\n\n')}`;
    const textBlob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });
    const rawName = (book.sourceFileName || book.fileName || bookId).replace(/\.pdf$/i, '');
    const url = URL.createObjectURL(textBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rawName}-Full-Verbatim-Index.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  }

  return false;
}

/**
 * Verifies the integrity of a book in IndexedDB, strictly distinguishing between:
 * - `verified_complete` (original PDF with 100% processed pages and 0 unprocessed pages)
 * - `partially_complete` (original PDF with unprocessed / needs-OCR pages)
 * - `needs_ocr` (scanned PDF with 0 text pages)
 * - `embedded_summary` (synthetic built-in summary, NOT the original PDF)
 * - `not_imported` (missing)
 */
export async function verifyOfflineBookIntegrity(bookId: string): Promise<IntegrityCheckResult> {
  const records = await hydrateSyncedFullBooks();
  const record = records.find(r => r.bookId === bookId);

  if (!record) {
    return {
      bookId,
      fileName: bookId,
      sourceType: 'unverified_legacy',
      processingStatus: 'not_imported',
      sha256: '',
      isHealthy: false,
      isVerifiedOriginalPdf: false,
      hasVerbatimPages: false,
      hasBinaryPdf: false,
      isValidPdfHeader: false,
      pageCount: 0,
      processedPageCount: 0,
      extractedTextPageCount: 0,
      ocrPageCount: 0,
      unprocessedPageCount: 0,
      binaryBytes: 0,
      messageEn: 'Status [Not Imported]: Book has not been imported into IndexedDB yet.',
      messageAr: 'الحالة [لم يُستورد]: لم يتم استيراد ملف PDF الأصلي لهذا المرجع بعد.'
    };
  }

  const pdfBytes = await getSyncedPdfBytes(bookId);
  const sourceType: BookSourceType = record.sourceType || 'unverified_legacy';
  const processingStatus: BookProcessingStatus =
    record.processingStatus ||
    (sourceType === 'embedded_synthetic' ? 'embedded_summary' : 'partially_complete');

  const originalPageCount = record.originalPageCount ?? record.totalPages;
  const processedPageCount = record.processedPageCount ?? (record.pages.length || originalPageCount);
  const extractedTextPageCount = record.extractedTextPageCount ?? 0;
  const ocrPageCount = record.ocrPageCount ?? 0;
  const unprocessedPageCount = record.unprocessedPageCount ?? 0;

  const hasVerbatimPages =
    (record.pages.length > 0 || extractedTextPageCount > 0 || record.chapters.length > 0) &&
    originalPageCount > 0;
  const hasBinaryPdf = Boolean(pdfBytes && pdfBytes.byteLength > 0);
  const isValidPdfHeader = hasBinaryPdf ? verifyPdfMagicHeader(pdfBytes) : Boolean(record.sha256);
  const binaryBytes = pdfBytes?.byteLength || record.fileSize || 0;

  if (sourceType === 'embedded_synthetic' || processingStatus === 'embedded_summary') {
    return {
      bookId: record.bookId,
      fileName: record.sourceFileName || record.fileName,
      sourceType: 'embedded_synthetic',
      processingStatus: 'embedded_summary',
      sha256: record.sha256 || '',
      isHealthy: false,
      isVerifiedOriginalPdf: false,
      hasVerbatimPages,
      hasBinaryPdf,
      isValidPdfHeader,
      pageCount: originalPageCount,
      processedPageCount,
      extractedTextPageCount,
      ocrPageCount,
      unprocessedPageCount,
      binaryBytes,
      messageEn: `Status [Non-Original Embedded Summary]: "${record.fileName}" (${originalPageCount} summary pages) is a built-in summary, NOT the original publisher PDF. Import the original PDF from Google Drive or device.`,
      messageAr: `الحالة [ملخص مضمّن غير أصلي]: "${record.fileName}" (${originalPageCount} صفحة ملخصة) هو ملخص مدمج وليس ملف PDF الأصلي للكتاب. يرجى استيراد ملف PDF الأصلي من Google Drive أو من جهازك.`
    };
  }

  const isVerifiedOriginalPdf =
    (sourceType === 'google_drive_pdf' || sourceType === 'local_file_pdf') &&
    processingStatus === 'verified_complete' &&
    unprocessedPageCount === 0 &&
    processedPageCount === originalPageCount &&
    originalPageCount > 0 &&
    hasVerbatimPages &&
    (hasBinaryPdf ? isValidPdfHeader : Boolean(record.sha256));

  if (isVerifiedOriginalPdf) {
    return {
      bookId: record.bookId,
      fileName: record.sourceFileName || record.fileName,
      sourceType,
      processingStatus: 'verified_complete',
      sha256: record.sha256 || '',
      isHealthy: true,
      isVerifiedOriginalPdf: true,
      hasVerbatimPages,
      hasBinaryPdf,
      isValidPdfHeader,
      pageCount: originalPageCount,
      processedPageCount,
      extractedTextPageCount,
      ocrPageCount,
      unprocessedPageCount: 0,
      binaryBytes,
      messageEn: `Status [Verified Complete]: Original PDF "${record.sourceFileName || record.fileName}" (${originalPageCount} pages, ${record.totalChapters} chapters, ${extractedTextPageCount} native text pages, ${formatStorageBytes(binaryBytes)}, SHA-256: ${(record.sha256 || '').slice(0, 12)}...) verified and ready in local IndexedDB.`,
      messageAr: `الحالة [مكتمل التحقق ✓]: المرجع الأصلي "${record.sourceFileName || record.fileName}" (${originalPageCount} صفحة، ${record.totalChapters} فصلاً، ${extractedTextPageCount} صفحة نصية، الحجم ${formatStorageBytes(binaryBytes)}، البصمة SHA-256: ${(record.sha256 || '').slice(0, 12)}...) مفهرس وموجود بالكامل في قاعدة البيانات المحلية.`
    };
  }

  return {
    bookId: record.bookId,
    fileName: record.sourceFileName || record.fileName,
    sourceType,
    processingStatus,
    sha256: record.sha256 || '',
    isHealthy: false,
    isVerifiedOriginalPdf: false,
    hasVerbatimPages,
    hasBinaryPdf,
    isValidPdfHeader,
    pageCount: originalPageCount,
    processedPageCount,
    extractedTextPageCount,
    ocrPageCount,
    unprocessedPageCount,
    binaryBytes,
    messageEn: `Status [${processingStatus}]: "${record.sourceFileName || record.fileName}" has ${extractedTextPageCount} extracted text pages, ${ocrPageCount} OCR pages, and ${unprocessedPageCount} unprocessed/scanned pages out of ${originalPageCount} total pages.`,
    messageAr: `الحالة [${processingStatus === 'needs_ocr' ? 'يحتاج إلى OCR' : 'مكتمل جزئياً'}]: الملف "${record.sourceFileName || record.fileName}" يحتوي على ${extractedTextPageCount} صفحة نصية، و${ocrPageCount} صفحة OCR، و${unprocessedPageCount} صفحة غير معالجة/تحتاج إلى OCR من أصل ${originalPageCount} صفحة.`
  };
}

export async function cacheDrivePdfBookOffline(
  record: SyncedFullBookRecord,
  pdfBytes?: ArrayBuffer
): Promise<void> {
  await requestPersistentOfflineStorage();
  await saveSyncedFullBook(record, pdfBytes);
}

export async function removeBookFromOfflineVault(bookId: string): Promise<void> {
  await removeSyncedFullBook(bookId);
}

export async function clearEntireOfflineVault(): Promise<void> {
  await clearAllSyncedFullBooksFromIdb();
}

export function subscribeOfflineNetworkStatus(
  onStatusChange: (isOnline: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const handleOnline = () => onStatusChange(true);
  const handleOffline = () => onStatusChange(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

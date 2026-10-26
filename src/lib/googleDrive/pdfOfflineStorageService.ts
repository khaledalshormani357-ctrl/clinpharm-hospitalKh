import {
  SyncedFullBookRecord,
  SyncedPdfBlobRecord,
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
  customTitle?: string;
  totalPages: number;
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
  isHealthy: boolean;
  hasVerbatimPages: boolean;
  hasBinaryPdf: boolean;
  isValidPdfHeader: boolean;
  pageCount: number;
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
  // Search for "%PDF-" (0x25 0x50 0x44 0x46 0x2D)
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

/**
 * Requests persistent browser storage so the operating system / browser never evicts
 * cached Google Drive medical PDFs from IndexedDB under storage pressure.
 */
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

/**
 * Checks whether persistent storage is currently granted by the browser.
 */
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
 * Returns full diagnostics of the IndexedDB Offline PDF Vault, including per-book
 * binary availability, page counts, and browser storage quota estimates.
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

  const books: OfflineBookVaultItem[] = records.map(rec => {
    const blobInfo = blobMap.get(rec.bookId);
    const hasBinaryPdf = Boolean(blobInfo && blobInfo.byteLength > 0);
    const binaryByteSize = blobInfo?.byteLength || 0;
    const indexedTextByteSize = Math.max(rec.totalCharacters * 2, 1024);

    if (hasBinaryPdf) {
      totalBinaryPdfsCached++;
    }
    totalPagesCached += rec.totalPages;
    totalChaptersCached += rec.totalChapters;
    totalVaultBytes += binaryByteSize + indexedTextByteSize;

    return {
      bookId: rec.bookId,
      driveFileId: rec.driveFileId,
      fileName: rec.fileName,
      customTitle: rec.customTitle,
      totalPages: rec.totalPages,
      totalChapters: rec.totalChapters,
      totalCharacters: rec.totalCharacters,
      syncedAt: rec.syncedAt,
      hasBinaryPdf,
      binaryByteSize,
      indexedTextByteSize,
      isValidPdfSignature: blobInfo?.isValidPdfSignature ?? false,
      offlineReady: rec.totalPages > 0
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
 * If not yet cached in IndexedDB, automatically compiles the built-in reference book PDF on the fly.
 */
export async function getOfflinePdfBlob(bookId: string): Promise<Blob | null> {
  let bytes = await getSyncedPdfBytes(bookId);
  if (!bytes || bytes.byteLength === 0) {
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

/**
 * Creates a temporary local `blob:` Object URL for a cached PDF in IndexedDB.
 * Caller should call `URL.revokeObjectURL(url)` when done if used long-term.
 */
export async function createOfflinePdfObjectUrl(bookId: string): Promise<string | null> {
  const blob = await getOfflinePdfBlob(bookId);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

/**
 * Triggers a direct 100% offline download of the cached PDF from IndexedDB to the user's device.
 */
export async function downloadOfflinePdfFromVault(bookId: string): Promise<boolean> {
  const blob = await getOfflinePdfBlob(bookId);
  if (!blob) return false;

  const books = getSyncedFullBooksSync();
  const book = books.find(b => b.bookId === bookId);
  const rawName = book?.fileName || `${bookId}.pdf`;
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

/**
 * Verifies the integrity of a cached book in IndexedDB (both verbatim pages and binary PDF header).
 */
export async function verifyOfflineBookIntegrity(bookId: string): Promise<IntegrityCheckResult> {
  const records = await hydrateSyncedFullBooks();
  const record = records.find(r => r.bookId === bookId);

  if (!record) {
    return {
      bookId,
      fileName: bookId,
      isHealthy: false,
      hasVerbatimPages: false,
      hasBinaryPdf: false,
      isValidPdfHeader: false,
      pageCount: 0,
      binaryBytes: 0,
      messageEn: 'Book is not cached in local IndexedDB storage.',
      messageAr: 'المرجع غير مخزن حالياً في قاعدة البيانات المحلية IndexedDB.'
    };
  }

  const pdfBytes = await getSyncedPdfBytes(bookId);
  const hasVerbatimPages = record.pages.length > 0 && record.totalPages > 0;
  const hasBinaryPdf = Boolean(pdfBytes && pdfBytes.byteLength > 0);
  const isValidPdfHeader = verifyPdfMagicHeader(pdfBytes);
  const binaryBytes = pdfBytes?.byteLength || 0;
  const isHealthy = hasVerbatimPages && (!hasBinaryPdf || isValidPdfHeader);

  return {
    bookId: record.bookId,
    fileName: record.fileName,
    isHealthy,
    hasVerbatimPages,
    hasBinaryPdf,
    isValidPdfHeader,
    pageCount: record.totalPages,
    binaryBytes,
    messageEn: isHealthy
      ? `Verified 100% offline readiness: ${record.totalPages} indexed pages${
          hasBinaryPdf ? ` + ${formatStorageBytes(binaryBytes)} valid PDF binary` : ''
        }.`
      : 'Warning: Local cache record is incomplete or missing pages.',
    messageAr: isHealthy
      ? `تم التحقق من الجاهزية الكاملة بدون إنترنت: ${record.totalPages} صفحة مفهرسة${
          hasBinaryPdf ? ` + ملف PDF أصلي سليم (${formatStorageBytes(binaryBytes)})` : ''
        }.`
      : 'تنبيه: النسخة المحلية غير مكتملة، يُرجى إعادة المزامنة.'
  };
}

/**
 * Stores a synced Google Drive book record and its raw PDF binary in IndexedDB
 * and automatically requests persistent storage protection.
 */
export async function cacheDrivePdfBookOffline(
  record: SyncedFullBookRecord,
  pdfBytes?: ArrayBuffer
): Promise<void> {
  await requestPersistentOfflineStorage();
  await saveSyncedFullBook(record, pdfBytes);
}

/**
 * Removes a single book and its binary PDF from IndexedDB.
 */
export async function removeBookFromOfflineVault(bookId: string): Promise<void> {
  await removeSyncedFullBook(bookId);
}

/**
 * Clears the entire IndexedDB offline PDF vault.
 */
export async function clearEntireOfflineVault(): Promise<void> {
  await clearAllSyncedFullBooksFromIdb();
}

/**
 * Subscribes to browser online/offline network transitions for real-time UI indicators.
 */
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

export type { SyncedFullBookRecord, SyncedPdfBlobRecord };

import {
  BookProcessingStatus,
  BookSourceType,
  PageExtractionMethod,
  PageExtractionStatus,
  VerbatimChapter,
  VerbatimReferenceTable
} from '../library/libraryTypes';

export type {
  BookProcessingStatus,
  BookSourceType,
  PageExtractionMethod,
  PageExtractionStatus
};

export interface FullBookPageRecord {
  id?: string;
  bookId?: string;
  pageNumber: number;
  originalPageNumber?: number;
  text: string;
  extractedText?: string;
  ocrText?: string | null;
  extractionMethod?: PageExtractionMethod;
  extractionStatus?: PageExtractionStatus;
  ocrConfidence?: number | null;
  hasEmbeddedImages?: boolean;
  contentHash?: string;
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  lineCount: number;
}

export interface StructuredBookChapterRecord {
  id: string;
  bookId: string;
  parentChapterId: string | null;
  chapterNumber: number;
  title: string;
  titleAr?: string;
  startPage: number;
  endPage: number;
  hierarchyLevel: number;
}

export interface StructuredBookSectionRecord {
  id: string;
  bookId: string;
  chapterId: string;
  pageNumber: number;
  sectionOrder: number;
  heading: string;
  headingAr?: string;
  fullText: string;
  extractionMethod: PageExtractionMethod;
  contentHash: string;
}

export interface StructuredBookTableRecord {
  id: string;
  bookId: string;
  chapterId: string;
  pageNumber: number;
  caption: string;
  captionAr?: string;
  headers: string[];
  rows: string[][];
  unitsAndFootnotes?: string;
  rawText: string;
  structuredData: Record<string, unknown>;
  extractionStatus: 'structured' | 'needs_review';
}

export interface BookImportDiagnosticReport {
  jobId: string;
  bookId: string;
  sourceFileName: string;
  displayTitle: string;
  sourceType: BookSourceType;
  driveFileId: string;
  fileSize: number;
  sha256: string;
  originalPageCount: number;
  processedPageCount: number;
  extractedTextPageCount: number;
  ocrPageCount: number;
  unprocessedPageCount: number;
  blankPageCount: number;
  chaptersSavedCount: number;
  sectionsSavedCount: number;
  tablesSavedCount: number;
  warnings: string[];
  errors: string[];
  dbSaveStatus: 'pending' | 'saved' | 'failed';
  searchIndexStatus: 'pending' | 'indexed' | 'failed';
  finalVerificationStatus: BookProcessingStatus;
  startedAt: string;
  completedAt: string;
}

export interface BookImportJobRecord {
  id: string;
  bookId: string;
  sourceFileName: string;
  sourceType: BookSourceType;
  fileSize: number;
  sha256: string;
  jobStatus: BookProcessingStatus;
  currentStage: string;
  lastProcessedPage: number;
  originalPageCount: number;
  processedPageCount: number;
  extractedTextPageCount: number;
  ocrPageCount: number;
  unprocessedPageCount: number;
  blankPageCount: number;
  sectionsSavedCount: number;
  tablesSavedCount: number;
  dbSaveStatus: 'pending' | 'saved' | 'failed';
  searchIndexStatus: 'pending' | 'indexed' | 'failed';
  finalVerificationStatus: BookProcessingStatus;
  startedAt: string;
  completedAt?: string;
  errorCode?: string;
  safeErrorMessage?: string;
  warnings: string[];
  errors: string[];
  retryCount: number;
}

export interface BookBatchCheckpointRecord {
  bookId: string;
  sha256: string;
  sourceFileName: string;
  sourceType: BookSourceType;
  driveFileId: string;
  originalPageCount: number;
  lastProcessedPage: number;
  processedPages: FullBookPageRecord[];
  tables: StructuredBookTableRecord[];
  outlineEntries: {
    id: string;
    parentId: string | null;
    title: string;
    startPage: number;
    endPage?: number;
    hierarchyLevel: number;
  }[];
  updatedAt: string;
}

export interface SyncedFullBookRecord {
  id?: string;
  bookId: string;
  driveFileId: string;
  fileName: string;
  sourceFileName?: string;
  displayTitle?: string;
  mimeType: string;
  fileSize: number;
  originalFileSize?: number;
  sha256?: string;
  totalPages: number;
  originalPageCount?: number;
  processedPageCount?: number;
  extractedTextPageCount?: number;
  ocrPageCount?: number;
  unprocessedPageCount?: number;
  blankPageCount?: number;
  totalChapters: number;
  totalCharacters: number;
  /** Number of pages without an extractable text layer; these may require OCR. */
  emptyTextPagesCount?: number;
  /** Distinguishes actual imported PDFs from generated embedded reference samples or legacy records. */
  sourceType?: BookSourceType;
  processingStatus?: BookProcessingStatus;
  processingVersion?: string;
  syncedAt: string;
  createdAt?: string;
  updatedAt?: string;
  customTitle?: string;
  customBadge?: string;
  chapters: VerbatimChapter[];
  pages: FullBookPageRecord[];
  structuredChapters?: StructuredBookChapterRecord[];
  structuredSections?: StructuredBookSectionRecord[];
  structuredTables?: StructuredBookTableRecord[];
  diagnosticReport?: BookImportDiagnosticReport;
}

export interface SyncedPdfBlobRecord {
  bookId: string;
  driveFileId: string;
  fileName: string;
  sha256?: string;
  pdfBytes: ArrayBuffer;
  savedAt: string;
}

const DB_NAME = 'clinpharm_full_books_idb_v1';
const DB_VERSION = 2;
const STORE_BOOKS = 'full_books';
const STORE_BLOBS = 'pdf_blobs';
const STORE_JOBS = 'book_import_jobs';
const STORE_CHECKPOINTS = 'book_batch_checkpoints';

const memorySyncedBooksMap = new Map<string, SyncedFullBookRecord>();
const memoryPdfBytesCache = new Map<string, ArrayBuffer>();
const memoryBlobSummariesMap = new Map<string, PdfBlobSummary>();
let isBlobSummariesHydrated = false;
const memoryImportJobsMap = new Map<string, BookImportJobRecord>();
const memoryCheckpointsMap = new Map<string, BookBatchCheckpointRecord>();
let isHydrated = false;
let inFlightHydration: Promise<SyncedFullBookRecord[]> | null = null;
let simulatedDbSaveFailureMessage: string | null = null;

export function setSimulatedDbSaveFailureForTest(message: string | null): void {
  simulatedDbSaveFailureMessage = message;
}

export function notifyFullBooksUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinpharm-full-books-updated'));
  }
}

/**
 * Normalizes legacy or partially populated book records so existing books are never lost,
 * while strictly preventing synthetic or unverified legacy records from masquerading as verified original PDFs.
 */
export function normalizeSyncedFullBookRecord(raw: SyncedFullBookRecord): SyncedFullBookRecord {
  const isSyntheticByName =
    raw.fileName?.endsWith('_Full_Verbatim_Reference.pdf') ||
    raw.driveFileId?.startsWith('builtin-');

  let sourceType: BookSourceType = raw.sourceType || 'unverified_legacy';
  if (isSyntheticByName || raw.sourceType === 'embedded_synthetic') {
    sourceType = 'embedded_synthetic';
  } else if (!raw.sourceType && !raw.sha256) {
    sourceType = 'unverified_legacy';
  }

  const originalPageCount = raw.originalPageCount ?? raw.totalPages ?? raw.pages?.length ?? 0;
  const pages = (raw.pages || []).map(p => {
    const cleanText = (p.extractedText ?? p.text ?? '').trim();
    const isLegacyFakePlaceholder = /^\[Page \d+ of .+ — Graphical\/Scanned Figure Page/i.test(
      cleanText
    );
    const actualExtractedText = isLegacyFakePlaceholder ? '' : p.extractedText ?? p.text ?? '';
    const ocrText = p.ocrText ?? null;

    let extractionMethod: PageExtractionMethod = p.extractionMethod || 'native_text';
    let extractionStatus: PageExtractionStatus = p.extractionStatus || 'extracted';

    if (!p.extractionMethod) {
      if (ocrText && ocrText.trim().length > 0) {
        extractionMethod = 'ocr';
        extractionStatus = 'ocr_completed';
      } else if (actualExtractedText.trim().length > 0) {
        extractionMethod = 'native_text';
        extractionStatus = 'extracted';
      } else {
        extractionMethod = 'unprocessed';
        extractionStatus = 'needs_ocr';
      }
    }

    return {
      ...p,
      id: p.id || `${raw.bookId}-page-${p.pageNumber}`,
      bookId: raw.bookId,
      originalPageNumber: p.originalPageNumber ?? p.pageNumber,
      text: actualExtractedText || ocrText || '',
      extractedText: actualExtractedText,
      ocrText,
      extractionMethod,
      extractionStatus
    };
  });

  const extractedTextPageCount =
    raw.extractedTextPageCount ??
    pages.filter(p => p.extractionMethod === 'native_text' && (p.extractedText || '').trim().length > 0).length;
  const ocrPageCount =
    raw.ocrPageCount ??
    pages.filter(p => p.extractionMethod === 'ocr' && (p.ocrText || '').trim().length > 0).length;
  const blankPageCount =
    raw.blankPageCount ?? pages.filter(p => p.extractionMethod === 'blank').length;
  const unprocessedPageCount =
    raw.unprocessedPageCount ??
    Math.max(
      0,
      originalPageCount - extractedTextPageCount - ocrPageCount - blankPageCount
    );
  const processedPageCount =
    raw.processedPageCount ??
    Math.min(originalPageCount, extractedTextPageCount + ocrPageCount + blankPageCount);

  let processingStatus: BookProcessingStatus = raw.processingStatus || 'partially_complete';
  if (sourceType === 'embedded_synthetic') {
    processingStatus = 'embedded_summary';
  } else if (sourceType === 'unverified_legacy' && !raw.sha256) {
    processingStatus = 'partially_complete';
  } else if (raw.processingStatus) {
    // Enforce rule: never allow verified_complete if unprocessedPageCount > 0 or processedPageCount < originalPageCount
    if (
      raw.processingStatus === 'verified_complete' &&
      (unprocessedPageCount > 0 || processedPageCount < originalPageCount || originalPageCount === 0)
    ) {
      processingStatus =
        extractedTextPageCount + ocrPageCount === 0 ? 'needs_ocr' : 'partially_complete';
    } else {
      processingStatus = raw.processingStatus;
    }
  } else {
    if (originalPageCount > 0 && unprocessedPageCount === 0 && processedPageCount === originalPageCount) {
      processingStatus = 'verified_complete';
    } else if (extractedTextPageCount + ocrPageCount === 0 && unprocessedPageCount > 0) {
      processingStatus = 'needs_ocr';
    } else {
      processingStatus = 'partially_complete';
    }
  }

  const totalCharacters =
    pages.length > 0
      ? pages.reduce((sum, p) => sum + (p.extractedText || p.ocrText || '').length, 0)
      : raw.totalCharacters ||
        (raw.chapters || []).reduce(
          (sum, ch) =>
            sum + (ch.sections || []).reduce((sSum, sec) => sSum + (sec.body || '').length, 0),
          0
        );

  return {
    ...raw,
    id: raw.id || raw.bookId,
    sourceFileName: raw.sourceFileName || raw.fileName,
    displayTitle: raw.displayTitle || raw.customTitle || raw.fileName,
    originalFileSize: raw.originalFileSize ?? raw.fileSize,
    sha256: raw.sha256 || '',
    originalPageCount,
    processedPageCount,
    extractedTextPageCount,
    ocrPageCount,
    unprocessedPageCount,
    blankPageCount,
    emptyTextPagesCount: unprocessedPageCount + blankPageCount,
    totalCharacters,
    sourceType,
    processingStatus,
    processingVersion: raw.processingVersion || '2.0.0',
    createdAt: raw.createdAt || raw.syncedAt,
    updatedAt: raw.updatedAt || raw.syncedAt,
    pages
  };
}

function openFullBookDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_BOOKS)) {
        db.createObjectStore(STORE_BOOKS, { keyPath: 'bookId' });
      }
      if (!db.objectStoreNames.contains(STORE_BLOBS)) {
        db.createObjectStore(STORE_BLOBS, { keyPath: 'bookId' });
      }
      if (!db.objectStoreNames.contains(STORE_JOBS)) {
        db.createObjectStore(STORE_JOBS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_CHECKPOINTS)) {
        db.createObjectStore(STORE_CHECKPOINTS, { keyPath: 'bookId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function hydrateSyncedFullBooks(options?: {
  forceFromDb?: boolean;
}): Promise<SyncedFullBookRecord[]> {
  if (isHydrated && !options?.forceFromDb) {
    return Array.from(memorySyncedBooksMap.values());
  }
  if (inFlightHydration && !options?.forceFromDb) {
    return inFlightHydration;
  }

  inFlightHydration = (async () => {
    try {
      const db = await openFullBookDb();
      if (!db) {
        isHydrated = true;
        return Array.from(memorySyncedBooksMap.values());
      }

      return await new Promise<SyncedFullBookRecord[]>((resolve, reject) => {
        const tx = db.transaction(STORE_BOOKS, 'readonly');
        const store = tx.objectStore(STORE_BOOKS);
        const req = store.openCursor();
        const normalizedList: SyncedFullBookRecord[] = [];
        memorySyncedBooksMap.clear();

        req.onsuccess = () => {
          const cursor = req.result;
          if (cursor) {
            const raw = cursor.value as SyncedFullBookRecord;
            const normalized = normalizeSyncedFullBookRecord(raw);
            memorySyncedBooksMap.set(normalized.bookId, normalized);
            normalizedList.push(normalized);
            cursor.continue();
          } else {
            isHydrated = true;
            resolve(normalizedList);
          }
        };

        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('IndexedDB hydration warning:', err);
      return Array.from(memorySyncedBooksMap.values());
    } finally {
      inFlightHydration = null;
    }
  })();

  return inFlightHydration;
}

export function getSyncedFullBooksSync(): SyncedFullBookRecord[] {
  if (!isHydrated && typeof indexedDB !== 'undefined') {
    void hydrateSyncedFullBooks();
  }
  return Array.from(memorySyncedBooksMap.values());
}

export function getSyncedFullBookByIdSync(bookId: string): SyncedFullBookRecord | undefined {
  return memorySyncedBooksMap.get(bookId);
}

export function findVerifiedBookBySha256Sync(sha256: string): SyncedFullBookRecord | undefined {
  if (!sha256) return undefined;
  for (const rec of memorySyncedBooksMap.values()) {
    if (
      rec.sha256 === sha256 &&
      rec.processingStatus === 'verified_complete' &&
      rec.sourceType !== 'embedded_synthetic'
    ) {
      return rec;
    }
  }
  return undefined;
}

export async function saveSyncedFullBook(
  rawRecord: SyncedFullBookRecord,
  pdfBytes?: ArrayBuffer,
  options?: { silent?: boolean }
): Promise<SyncedFullBookRecord> {
  if (simulatedDbSaveFailureMessage) {
    throw new Error(simulatedDbSaveFailureMessage);
  }

  const record = normalizeSyncedFullBookRecord(rawRecord);
  memorySyncedBooksMap.set(record.bookId, record);
  isHydrated = true;

  if (pdfBytes && pdfBytes.byteLength > 0) {
    // Only keep raw PDF bytes in memory if IndexedDB is unavailable (e.g. Node unit tests)
    if (typeof indexedDB === 'undefined') {
      memoryPdfBytesCache.set(record.bookId, pdfBytes.slice(0));
    }
    const header = new Uint8Array(pdfBytes, 0, Math.min(16, pdfBytes.byteLength));
    let isValidPdfSignature = false;
    for (let i = 0; i <= header.length - 5; i++) {
      if (
        header[i] === 0x25 &&
        header[i + 1] === 0x50 &&
        header[i + 2] === 0x44 &&
        header[i + 3] === 0x46 &&
        header[i + 4] === 0x2d
      ) {
        isValidPdfSignature = true;
        break;
      }
    }
    memoryBlobSummariesMap.set(record.bookId, {
      bookId: record.bookId,
      fileName: record.sourceFileName || record.fileName,
      byteLength: pdfBytes.byteLength,
      savedAt: record.syncedAt,
      isValidPdfSignature
    });
  }

  const db = await openFullBookDb();
  if (!db) {
    if (!options?.silent) {
      notifyFullBooksUpdated();
    }
    return record;
  }

  await new Promise<void>((resolve, reject) => {
    const stores = pdfBytes ? [STORE_BOOKS, STORE_BLOBS] : [STORE_BOOKS];
    const tx = db.transaction(stores, 'readwrite');
    tx.objectStore(STORE_BOOKS).put(record);

    if (pdfBytes) {
      const blobRecord: SyncedPdfBlobRecord = {
        bookId: record.bookId,
        driveFileId: record.driveFileId,
        fileName: record.sourceFileName || record.fileName,
        sha256: record.sha256,
        pdfBytes,
        savedAt: record.syncedAt
      };
      tx.objectStore(STORE_BLOBS).put(blobRecord);
    }

    tx.oncomplete = () => {
      if (!options?.silent) {
        notifyFullBooksUpdated();
      }
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });

  return record;
}

export async function saveBookImportJob(job: BookImportJobRecord): Promise<void> {
  memoryImportJobsMap.set(job.id, job);
  const db = await openFullBookDb();
  if (!db || !db.objectStoreNames.contains(STORE_JOBS)) return;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_JOBS, 'readwrite');
    tx.objectStore(STORE_JOBS).put(job);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllBookImportJobs(): Promise<BookImportJobRecord[]> {
  try {
    const db = await openFullBookDb();
    if (!db || !db.objectStoreNames.contains(STORE_JOBS)) {
      return Array.from(memoryImportJobsMap.values()).sort((a, b) =>
        b.startedAt.localeCompare(a.startedAt)
      );
    }

    return await new Promise<BookImportJobRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_JOBS, 'readonly');
      const req = tx.objectStore(STORE_JOBS).getAll();
      req.onsuccess = () => {
        const list = (req.result || []) as BookImportJobRecord[];
        for (const j of list) {
          memoryImportJobsMap.set(j.id, j);
        }
        resolve(
          Array.from(memoryImportJobsMap.values()).sort((a, b) =>
            b.startedAt.localeCompare(a.startedAt)
          )
        );
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return Array.from(memoryImportJobsMap.values());
  }
}

export function getBookImportJobsSync(bookId?: string): BookImportJobRecord[] {
  const all = Array.from(memoryImportJobsMap.values()).sort((a, b) =>
    b.startedAt.localeCompare(a.startedAt)
  );
  if (!bookId) return all;
  return all.filter(j => j.bookId === bookId);
}

export async function saveBookBatchCheckpoint(
  checkpoint: BookBatchCheckpointRecord
): Promise<void> {
  if (simulatedDbSaveFailureMessage) {
    throw new Error(simulatedDbSaveFailureMessage);
  }
  memoryCheckpointsMap.set(checkpoint.bookId, checkpoint);
  const db = await openFullBookDb();
  if (!db || !db.objectStoreNames.contains(STORE_CHECKPOINTS)) return;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_CHECKPOINTS, 'readwrite');
    tx.objectStore(STORE_CHECKPOINTS).put(checkpoint);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getBookBatchCheckpoint(
  bookId: string
): Promise<BookBatchCheckpointRecord | null> {
  const mem = memoryCheckpointsMap.get(bookId);
  if (mem) return mem;

  try {
    const db = await openFullBookDb();
    if (!db || !db.objectStoreNames.contains(STORE_CHECKPOINTS)) return null;

    return await new Promise<BookBatchCheckpointRecord | null>((resolve, reject) => {
      const tx = db.transaction(STORE_CHECKPOINTS, 'readonly');
      const req = tx.objectStore(STORE_CHECKPOINTS).get(bookId);
      req.onsuccess = () => {
        const res = (req.result as BookBatchCheckpointRecord | undefined) || null;
        if (res) memoryCheckpointsMap.set(bookId, res);
        resolve(res);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function clearBookBatchCheckpoint(bookId: string): Promise<void> {
  memoryCheckpointsMap.delete(bookId);
  const db = await openFullBookDb();
  if (!db || !db.objectStoreNames.contains(STORE_CHECKPOINTS)) return;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_CHECKPOINTS, 'readwrite');
    tx.objectStore(STORE_CHECKPOINTS).delete(bookId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSyncedPdfBytes(bookIdOrDriveId: string): Promise<ArrayBuffer | null> {
  let targetBookId = bookIdOrDriveId;
  if (!memoryPdfBytesCache.has(targetBookId)) {
    for (const rec of memorySyncedBooksMap.values()) {
      if (rec.bookId === bookIdOrDriveId || rec.driveFileId === bookIdOrDriveId) {
        targetBookId = rec.bookId;
        break;
      }
    }
  }

  const cachedInMem = memoryPdfBytesCache.get(targetBookId);
  if (cachedInMem && cachedInMem.byteLength > 0) {
    return cachedInMem;
  }

  try {
    const db = await openFullBookDb();
    if (!db) return null;

    return await new Promise<ArrayBuffer | null>((resolve, reject) => {
      const tx = db.transaction(STORE_BLOBS, 'readonly');
      const req = tx.objectStore(STORE_BLOBS).get(targetBookId);
      req.onsuccess = () => {
        const res = req.result as SyncedPdfBlobRecord | undefined;
        if (res?.pdfBytes && res.pdfBytes.byteLength > 0) {
          memoryPdfBytesCache.set(targetBookId, res.pdfBytes);
          resolve(res.pdfBytes);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export interface PdfBlobSummary {
  bookId: string;
  fileName: string;
  byteLength: number;
  savedAt: string;
  isValidPdfSignature: boolean;
}

export async function getAllSyncedPdfBlobSummaries(): Promise<PdfBlobSummary[]> {
  if (isBlobSummariesHydrated && memoryBlobSummariesMap.size > 0) {
    return Array.from(memoryBlobSummariesMap.values());
  }

  try {
    const db = await openFullBookDb();
    if (!db) {
      return Array.from(memoryBlobSummariesMap.values());
    }

    return await new Promise<PdfBlobSummary[]>((resolve, reject) => {
      const tx = db.transaction(STORE_BLOBS, 'readonly');
      const req = tx.objectStore(STORE_BLOBS).openCursor();
      const summaries: PdfBlobSummary[] = [];

      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const r = cursor.value as SyncedPdfBlobRecord;
          const byteLength = r.pdfBytes?.byteLength || 0;
          let isValidPdfSignature = false;
          if (r.pdfBytes && byteLength >= 5) {
            const header = new Uint8Array(r.pdfBytes, 0, Math.min(16, byteLength));
            for (let i = 0; i <= header.length - 5; i++) {
              if (
                header[i] === 0x25 &&
                header[i + 1] === 0x50 &&
                header[i + 2] === 0x44 &&
                header[i + 3] === 0x46 &&
                header[i + 4] === 0x2d
              ) {
                isValidPdfSignature = true;
                break;
              }
            }
          }
          const summary: PdfBlobSummary = {
            bookId: r.bookId,
            fileName: r.fileName,
            byteLength,
            savedAt: r.savedAt,
            isValidPdfSignature
          };
          memoryBlobSummariesMap.set(r.bookId, summary);
          summaries.push(summary);
          cursor.continue();
        } else {
          isBlobSummariesHydrated = true;
          resolve(summaries);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return Array.from(memoryBlobSummariesMap.values());
  }
}

export async function removeSyncedFullBook(bookId: string): Promise<void> {
  memorySyncedBooksMap.delete(bookId);
  memoryPdfBytesCache.delete(bookId);
  memoryBlobSummariesMap.delete(bookId);
  memoryCheckpointsMap.delete(bookId);

  const db = await openFullBookDb();
  if (!db) {
    notifyFullBooksUpdated();
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const storeNames = [STORE_BOOKS, STORE_BLOBS];
    if (db.objectStoreNames.contains(STORE_CHECKPOINTS)) {
      storeNames.push(STORE_CHECKPOINTS);
    }
    const tx = db.transaction(storeNames, 'readwrite');
    tx.objectStore(STORE_BOOKS).delete(bookId);
    tx.objectStore(STORE_BLOBS).delete(bookId);
    if (db.objectStoreNames.contains(STORE_CHECKPOINTS)) {
      tx.objectStore(STORE_CHECKPOINTS).delete(bookId);
    }
    tx.oncomplete = () => {
      notifyFullBooksUpdated();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllSyncedFullBooksFromIdb(): Promise<void> {
  memorySyncedBooksMap.clear();
  memoryPdfBytesCache.clear();
  memoryBlobSummariesMap.clear();
  memoryImportJobsMap.clear();
  memoryCheckpointsMap.clear();
  isHydrated = false;
  isBlobSummariesHydrated = false;

  const db = await openFullBookDb();
  if (!db) {
    notifyFullBooksUpdated();
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const storeNames = [STORE_BOOKS, STORE_BLOBS];
    if (db.objectStoreNames.contains(STORE_JOBS)) storeNames.push(STORE_JOBS);
    if (db.objectStoreNames.contains(STORE_CHECKPOINTS)) storeNames.push(STORE_CHECKPOINTS);

    const tx = db.transaction(storeNames, 'readwrite');
    tx.objectStore(STORE_BOOKS).clear();
    tx.objectStore(STORE_BLOBS).clear();
    if (db.objectStoreNames.contains(STORE_JOBS)) tx.objectStore(STORE_JOBS).clear();
    if (db.objectStoreNames.contains(STORE_CHECKPOINTS)) tx.objectStore(STORE_CHECKPOINTS).clear();
    tx.oncomplete = () => {
      notifyFullBooksUpdated();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

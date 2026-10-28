import { VerbatimChapter } from '../library/libraryTypes';

export interface FullBookPageRecord {
  pageNumber: number;
  text: string;
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  lineCount: number;
}

export interface SyncedFullBookRecord {
  bookId: string;
  driveFileId: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  totalPages: number;
  totalChapters: number;
  totalCharacters: number;
  /** Number of pages without an extractable text layer; these may require OCR. */
  emptyTextPagesCount?: number;
  /** Distinguishes actual imported PDFs from generated embedded reference samples. */
  sourceType?: 'google_drive_pdf' | 'embedded_synthetic';
  syncedAt: string;
  customTitle?: string;
  customBadge?: string;
  chapters: VerbatimChapter[];
  pages: FullBookPageRecord[];
}

export interface SyncedPdfBlobRecord {
  bookId: string;
  driveFileId: string;
  fileName: string;
  pdfBytes: ArrayBuffer;
  savedAt: string;
}

const DB_NAME = 'clinpharm_full_books_idb_v1';
const DB_VERSION = 1;
const STORE_BOOKS = 'full_books';
const STORE_BLOBS = 'pdf_blobs';

// In-memory mirror so synchronous library functions (getAllVerbatimBooks, searchVerbatimLibrary)
// immediately merge full PDF chapters and pages without blocking.
const memorySyncedBooksMap = new Map<string, SyncedFullBookRecord>();
// Fast in-memory cache of binary PDF ArrayBuffers so page navigation in PdfPageCanvasViewer is instant
const memoryPdfBytesCache = new Map<string, ArrayBuffer>();
let isHydrated = false;

function notifyFullBooksUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinpharm-full-books-updated'));
  }
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
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function hydrateSyncedFullBooks(): Promise<SyncedFullBookRecord[]> {
  try {
    const db = await openFullBookDb();
    if (!db) return Array.from(memorySyncedBooksMap.values());

    return await new Promise<SyncedFullBookRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_BOOKS, 'readonly');
      const store = tx.objectStore(STORE_BOOKS);
      const req = store.getAll();

      req.onsuccess = () => {
        const records = (req.result || []) as SyncedFullBookRecord[];
        memorySyncedBooksMap.clear();
        for (const rec of records) {
          memorySyncedBooksMap.set(rec.bookId, rec);
        }
        isHydrated = true;
        notifyFullBooksUpdated();
        resolve(records);
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB hydration warning:', err);
    return Array.from(memorySyncedBooksMap.values());
  }
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

export async function saveSyncedFullBook(
  record: SyncedFullBookRecord,
  pdfBytes?: ArrayBuffer
): Promise<void> {
  memorySyncedBooksMap.set(record.bookId, record);
  if (pdfBytes && pdfBytes.byteLength > 0) {
    memoryPdfBytesCache.set(record.bookId, pdfBytes.slice(0));
  }
  notifyFullBooksUpdated();

  // Proactively request persistent browser storage so IndexedDB is protected from OS eviction
  if (typeof navigator !== 'undefined' && navigator.storage?.persist) {
    void navigator.storage.persist().catch(() => {});
  }

  const db = await openFullBookDb();
  if (!db) return;

  await new Promise<void>((resolve, reject) => {
    const stores = pdfBytes ? [STORE_BOOKS, STORE_BLOBS] : [STORE_BOOKS];
    const tx = db.transaction(stores, 'readwrite');
    tx.objectStore(STORE_BOOKS).put(record);

    if (pdfBytes) {
      const blobRecord: SyncedPdfBlobRecord = {
        bookId: record.bookId,
        driveFileId: record.driveFileId,
        fileName: record.fileName,
        pdfBytes,
        savedAt: record.syncedAt
      };
      tx.objectStore(STORE_BLOBS).put(blobRecord);
    }

    tx.oncomplete = () => {
      notifyFullBooksUpdated();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSyncedPdfBytes(bookId: string): Promise<ArrayBuffer | null> {
  const cachedInMem = memoryPdfBytesCache.get(bookId);
  if (cachedInMem && cachedInMem.byteLength > 0) {
    return cachedInMem;
  }

  try {
    const db = await openFullBookDb();
    if (!db) return null;

    return await new Promise<ArrayBuffer | null>((resolve, reject) => {
      const tx = db.transaction(STORE_BLOBS, 'readonly');
      const req = tx.objectStore(STORE_BLOBS).get(bookId);
      req.onsuccess = () => {
        const res = req.result as SyncedPdfBlobRecord | undefined;
        if (res?.pdfBytes && res.pdfBytes.byteLength > 0) {
          memoryPdfBytesCache.set(bookId, res.pdfBytes);
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
  try {
    const db = await openFullBookDb();
    if (!db) return [];

    return await new Promise<PdfBlobSummary[]>((resolve, reject) => {
      const tx = db.transaction(STORE_BLOBS, 'readonly');
      const req = tx.objectStore(STORE_BLOBS).getAll();
      req.onsuccess = () => {
        const records = (req.result || []) as SyncedPdfBlobRecord[];
        const summaries: PdfBlobSummary[] = records.map(r => {
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
          return {
            bookId: r.bookId,
            fileName: r.fileName,
            byteLength,
            savedAt: r.savedAt,
            isValidPdfSignature
          };
        });
        resolve(summaries);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export async function removeSyncedFullBook(bookId: string): Promise<void> {
  memorySyncedBooksMap.delete(bookId);
  memoryPdfBytesCache.delete(bookId);
  notifyFullBooksUpdated();

  const db = await openFullBookDb();
  if (!db) return;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE_BOOKS, STORE_BLOBS], 'readwrite');
    tx.objectStore(STORE_BOOKS).delete(bookId);
    tx.objectStore(STORE_BLOBS).delete(bookId);
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
  notifyFullBooksUpdated();

  const db = await openFullBookDb();
  if (!db) return;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE_BOOKS, STORE_BLOBS], 'readwrite');
    tx.objectStore(STORE_BOOKS).clear();
    tx.objectStore(STORE_BLOBS).clear();
    tx.oncomplete = () => {
      notifyFullBooksUpdated();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}


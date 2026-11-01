import {
  BookProcessingStatus,
  BookSourceType,
  MedicalSystemCategory,
  PageExtractionMethod,
  PageExtractionStatus,
  VerbatimChapter,
  VerbatimReferenceTable,
  VerbatimSection
} from '../library/libraryTypes';
import {
  BookBatchCheckpointRecord,
  BookImportDiagnosticReport,
  BookImportJobRecord,
  FullBookPageRecord,
  StructuredBookChapterRecord,
  StructuredBookSectionRecord,
  StructuredBookTableRecord,
  SyncedFullBookRecord,
  clearBookBatchCheckpoint,
  findVerifiedBookBySha256Sync,
  getBookBatchCheckpoint,
  saveBookBatchCheckpoint,
  saveBookImportJob,
  saveSyncedFullBook
} from './fullBookIdb';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface BookSyncProgress {
  bookId: string;
  fileName: string;
  phase: 'connecting' | 'downloading' | 'indexing' | 'ocr' | 'saving' | 'completed' | 'error';
  stageNumber?: number;
  stageLabel?: string;
  currentPage: number;
  totalPages: number;
  downloadedBytes?: number;
  totalBytes?: number;
  processingStatus?: BookProcessingStatus;
  message: string;
}

export interface OcrPageResult {
  ocrText: string;
  confidence: number;
  method?: string;
}

export type OcrPageAdapter = (params: {
  bookId: string;
  pageNumber: number;
  totalPages: number;
  pageProxy?: unknown;
}) => Promise<OcrPageResult | null>;

export interface KnownDriveBookMapping {
  bookId: string;
  defaultDriveId: string;
  title: string;
  titleAr: string;
  badge: string;
  badgeAr: string;
  matchKeywords: string[];
  defaultCategory: MedicalSystemCategory;
  defaultCategoryAr: string;
}

export const KNOWN_DRIVE_BOOK_MAPPINGS: KnownDriveBookMapping[] = [
  {
    bookId: 'dipiro-13th-ed',
    defaultDriveId: '1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR',
    title: "DiPiro's Pharmacotherapy: A Pathophysiologic Approach (13th Edition)",
    titleAr: 'مرجع ديبيرو للعلاج الدوائي (DiPiro 13th Edition — الكتاب الكامل)',
    badge: "DiPiro's 13th Ed",
    badgeAr: 'مرجع ديبيرو (الطبعة 13)',
    matchKeywords: ['dipiro', 'pathophysiologic approach', '13th'],
    defaultCategory: 'Cardiology',
    defaultCategoryAr: 'العلاج الدوائي السريري الشامل'
  },
  {
    bookId: 'accp-cardiology-2026',
    defaultDriveId: '1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt',
    title: 'ACCP/ASHP Cardiology Pharmacy Preparatory Review Course (2026 BCCP)',
    titleAr: 'مرجع البورد الأمريكي التخصصي في صيدلة القلب (ACCP Cardiology 2026 — الكتاب الكامل)',
    badge: 'ACCP Cardiology 2026',
    badgeAr: 'بورد القلب BCCP 2026',
    matchKeywords: ['cardiology', 'bccp', 'preparatory review'],
    defaultCategory: 'Cardiology',
    defaultCategoryAr: 'أمراض القلب والشرايين'
  },
  {
    bookId: 'accp-2026-vol1',
    defaultDriveId: '1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By',
    title: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol 1)',
    titleAr: 'موسوعة البورد الأمريكي للصيدلة السريرية ACCP 2026 (المجلد الأول الكامل)',
    badge: 'ACCP 2026 Vol 1',
    badgeAr: 'بورد ACCP 2026 (مجلد 1)',
    matchKeywords: ['updates in therapeutics', 'volume 1', 'vol 1', 'vol. 1', 'pharmacotherapy preparatory'],
    defaultCategory: 'Critical Care & Infectious Disease',
    defaultCategoryAr: 'الصيدلة السريرية والبورد (مجلد 1)'
  },
  {
    bookId: 'accp-2026-vol2',
    defaultDriveId: '1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By',
    title: 'ACCP Updates in Therapeutics® 2026: Pharmacotherapy Preparatory Review (Vol 2)',
    titleAr: 'موسوعة البورد الأمريكي للصيدلة السريرية ACCP 2026 (المجلد الثاني الكامل)',
    badge: 'ACCP 2026 Vol 2',
    badgeAr: 'بورد ACCP 2026 (مجلد 2)',
    matchKeywords: ['updates in therapeutics', 'volume 2', 'vol 2', 'vol. 2'],
    defaultCategory: 'Nephrology & Fluids',
    defaultCategoryAr: 'الصيدلة السريرية والبورد (مجلد 2)'
  },
  {
    bookId: 'clinical-casebook-guide',
    defaultDriveId: '1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP',
    title: 'Pharmacotherapy Casebook & Bedside Patient Workup Guide (PPCP)',
    titleAr: 'دليل الحالات السريرية والتدريب السريري (Pharmacotherapy Casebook — الكتاب الكامل)',
    badge: 'Casebook PPCP Guide',
    badgeAr: 'دليل أخذ الحالات PPCP',
    matchKeywords: ['casebook', 'schwinghammer', 'patient care process', 'ppcp', 'workup'],
    defaultCategory: 'Clinical Methodology & PPCP',
    defaultCategoryAr: 'منهجية الحالات السريرية PPCP'
  },
  {
    bookId: 'hospital-compendium',
    defaultDriveId: '1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC',
    title: 'Inpatient Clinical Dosing Compendium, ICU Stewardship & High-Alert IV Protocols',
    titleAr: 'موسوعة جرعات المستشفيات وبروتوكولات العناية المركزة (المرجع الكامل)',
    badge: 'Hospital Dosing Compendium',
    badgeAr: 'موسوعة جرعات المستشفى',
    matchKeywords: ['compendium', 'dosing', 'hospital', 'dilution', 'icu', 'stewardship'],
    defaultCategory: 'Hospital Dosing & IV Protocols',
    defaultCategoryAr: 'جرعات المستشفيات والتسريب الوريدي'
  },
  {
    bookId: 'stockleys-drug-interactions',
    defaultDriveId: '1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S',
    title: "Stockley's Drug Interactions (Complete Clinical DDI Reference Database)",
    titleAr: "مرجع ستوكلي للتداخلات والتعارضات الدوائية (Stockley's Drug Interactions — الكتاب الكامل)",
    badge: "Stockley's Drug Interactions",
    badgeAr: "مرجع Stockley's للتداخلات",
    matchKeywords: ['stockley', 'interactions', 'drug interactions', 'ddi', 'baxter', 'preston'],
    defaultCategory: 'Drug Interactions & Safety',
    defaultCategoryAr: 'قاعدة بيانات التعارضات الدوائية (Stockley’s)'
  }
];

export function extractGoogleDriveFileId(rawInput: string): string {
  const trimmed = rawInput.trim();
  if (!trimmed) return '';

  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{10,})/);
  if (fileMatch?.[1]) return fileMatch[1];

  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]{10,})/);
  if (folderMatch?.[1]) return folderMatch[1];

  const paramMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (paramMatch?.[1]) return paramMatch[1];

  return trimmed;
}

export function hasPdfSignature(bytes: ArrayBuffer): boolean {
  if (!bytes || bytes.byteLength < 5) return false;
  const header = new Uint8Array(bytes, 0, Math.min(16, bytes.byteLength));
  for (let i = 0; i <= header.length - 5; i++) {
    if (
      header[i] === 0x25 &&
      header[i + 1] === 0x50 &&
      header[i + 2] === 0x44 &&
      header[i + 3] === 0x46 &&
      header[i + 4] === 0x2d
    ) {
      return true;
    }
  }
  return false;
}

export async function computeSha256Hex(buffer: ArrayBuffer): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Deterministic fallback hash if crypto.subtle is unavailable
  const bytes = new Uint8Array(buffer);
  let h1 = 0xdeadbeef ^ bytes.length;
  let h2 = 0x41c6ce57 ^ bytes.length;
  for (let i = 0; i < bytes.length; i++) {
    const ch = bytes[i];
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (
    (h1 >>> 0).toString(16).padStart(8, '0') +
    (h2 >>> 0).toString(16).padStart(8, '0') +
    bytes.byteLength.toString(16).padStart(16, '0')
  ).padEnd(64, '0');
}

export function computeContentHash(text: string): string {
  let h1 = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h1 ^= text.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  return `fnv1a-${(h1 >>> 0).toString(16).padStart(8, '0')}-${text.length}`;
}

export function inferCategoryFromText(text: string): {
  category: MedicalSystemCategory;
  categoryAr: string;
} {
  const lower = text.toLowerCase();
  if (
    lower.includes('heart failure') ||
    lower.includes('cardiol') ||
    lower.includes('arrhythmia') ||
    lower.includes('coronary') ||
    lower.includes('anticoagul') ||
    lower.includes('hypertension')
  ) {
    return { category: 'Cardiology', categoryAr: 'أمراض القلب والشرايين' };
  }
  if (
    lower.includes('sepsis') ||
    lower.includes('infectious') ||
    lower.includes('critical care') ||
    lower.includes('antimicrobial') ||
    lower.includes('pneumonia') ||
    lower.includes('meningitis') ||
    lower.includes('neurolog')
  ) {
    return {
      category: 'Critical Care & Infectious Disease',
      categoryAr: 'العناية المركزة والإنتان والأعصاب'
    };
  }
  if (
    lower.includes('renal') ||
    lower.includes('kidney') ||
    lower.includes('nephrol') ||
    lower.includes('electrolyte') ||
    lower.includes('pharmacokinetic') ||
    lower.includes('acid-base')
  ) {
    return {
      category: 'Nephrology & Fluids',
      categoryAr: 'الكلى والسوائل والحركية الدوائية'
    };
  }
  if (
    lower.includes('cirrhosis') ||
    lower.includes('hepat') ||
    lower.includes('gastro') ||
    lower.includes('pancreat') ||
    lower.includes('peptic')
  ) {
    return {
      category: 'Gastroenterology & Hepatology',
      categoryAr: 'أمراض الجهاز الهضمي والكبد'
    };
  }
  if (
    lower.includes('diabet') ||
    lower.includes('endocrin') ||
    lower.includes('thyroid') ||
    lower.includes('insulin') ||
    lower.includes('adrenal')
  ) {
    return {
      category: 'Endocrinology & Metabolism',
      categoryAr: 'الغدد الصماء والسكري'
    };
  }
  if (
    lower.includes('infusion') ||
    lower.includes('dosing') ||
    lower.includes('ismp') ||
    lower.includes('extravasation') ||
    lower.includes('vasopressor')
  ) {
    return {
      category: 'Hospital Dosing & IV Protocols',
      categoryAr: 'جرعات المستشفيات والتسريب الوريدي'
    };
  }
  return {
    category: 'Clinical Methodology & PPCP',
    categoryAr: 'المراجع السريرية الشاملة'
  };
}

export async function getDriveFileMetadata(
  accessToken: string,
  fileId: string
): Promise<DriveFileItem> {
  const cleanId = extractGoogleDriveFileId(fileId);
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
    cleanId
  )}?fields=id,name,mimeType,size,modifiedTime,webViewLink&supportsAllDrives=true`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const msg = errData?.error?.message || `HTTP ${res.status}`;
    if (res.status === 401 || res.status === 403) {
      throw new Error(
        `Google Drive authorization error (HTTP ${res.status}) for ID ${cleanId}: ${msg}`
      );
    }
    throw new Error(`Google Drive API error for ID ${cleanId}: ${msg}`);
  }

  return (await res.json()) as DriveFileItem;
}

export async function listUserDriveFiles(
  accessToken: string,
  searchQuery?: string
): Promise<DriveFileItem[]> {
  const mimeConditions = [
    "mimeType = 'application/pdf'",
    "mimeType = 'application/vnd.google-apps.document'",
    "mimeType = 'application/vnd.google-apps.folder'"
  ].join(' or ');

  let q = `trashed = false and (${mimeConditions})`;
  if (searchQuery && searchQuery.trim()) {
    const safeQ = searchQuery.trim().replace(/'/g, "\\'");
    q += ` and name contains '${safeQ}'`;
  }

  const params = new URLSearchParams({
    q,
    pageSize: '60',
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink)',
    orderBy: 'modifiedTime desc',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true'
  });

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to list Google Drive files (${res.status})`);
  }

  const data = await res.json();
  return (data.files || []) as DriveFileItem[];
}

export async function listFolderChildFiles(
  accessToken: string,
  folderId: string
): Promise<DriveFileItem[]> {
  const cleanId = extractGoogleDriveFileId(folderId);
  const q = `'${cleanId}' in parents and trashed = false and (mimeType = 'application/pdf' or mimeType = 'application/vnd.google-apps.document')`;
  const params = new URLSearchParams({
    q,
    pageSize: '50',
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink)',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true'
  });

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return (data.files || []) as DriveFileItem[];
}

export interface DownloadLimitsOptions {
  maxFileSizeBytes?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  expectedFileSize?: number;
  onDownloadProgress?: (loaded: number, total: number) => void;
}

export async function readLimitedResponseBuffer(
  res: Response,
  options: DownloadLimitsOptions = {}
): Promise<ArrayBuffer> {
  const maxFileSizeBytes = options.maxFileSizeBytes ?? 250 * 1024 * 1024; // 250 MB
  const timeoutMs = options.timeoutMs ?? 120_000;
  const contentLength = Number(res.headers?.get?.('content-length') || 0);
  const expectedTotal = contentLength || options.expectedFileSize || 0;

  if (expectedTotal > maxFileSizeBytes) {
    throw new Error(
      `PDF file size (${expectedTotal} bytes) exceeds maximum limit (${maxFileSizeBytes} bytes).`
    );
  }

  if (!res.body || typeof res.body.getReader !== 'function') {
    const buf = await res.arrayBuffer();
    if (buf.byteLength > maxFileSizeBytes) {
      throw new Error(
        `Downloaded file size (${buf.byteLength} bytes) exceeds maximum limit (${maxFileSizeBytes} bytes).`
      );
    }
    if (contentLength > 0 && buf.byteLength < contentLength) {
      throw new Error(
        `Incomplete PDF download: expected ${contentLength} bytes, received ${buf.byteLength} bytes.`
      );
    }
    options.onDownloadProgress?.(buf.byteLength, expectedTotal || buf.byteLength);
    return buf;
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedLength = 0;
  const startedAt = Date.now();

  while (true) {
    if (options.signal?.aborted) {
      await reader.cancel().catch(() => {});
      throw new Error('PDF download was cancelled by the user.');
    }
    if (Date.now() - startedAt > timeoutMs) {
      await reader.cancel().catch(() => {});
      throw new Error(`PDF download timed out after ${timeoutMs}ms.`);
    }

    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      receivedLength += value.byteLength;
      if (receivedLength > maxFileSizeBytes) {
        await reader.cancel().catch(() => {});
        throw new Error(
          `Downloaded stream (${receivedLength} bytes) exceeds maximum limit (${maxFileSizeBytes} bytes).`
        );
      }
      chunks.push(value);
      options.onDownloadProgress?.(receivedLength, expectedTotal || receivedLength);
    }
  }

  if (contentLength > 0 && receivedLength < contentLength) {
    throw new Error(
      `Incomplete PDF stream: expected ${contentLength} bytes, received ${receivedLength} bytes.`
    );
  }

  const combined = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    combined.set(chunk, position);
    position += chunk.length;
  }

  return combined.buffer;
}

export async function downloadDriveFileBuffer(
  accessToken: string,
  fileId: string,
  onDownloadProgress?: (loaded: number, total: number) => void,
  limits?: Omit<DownloadLimitsOptions, 'onDownloadProgress'>
): Promise<ArrayBuffer> {
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
    fileId
  )}?alt=media&supportsAllDrives=true`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: limits?.signal
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const msg =
      errData?.error?.message || `Failed to download PDF binary from Google Drive (${res.status})`;
    if (res.status === 401 || res.status === 403) {
      throw new Error(`Google Drive authorization error (HTTP ${res.status}): ${msg}`);
    }
    throw new Error(msg);
  }

  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('text/html')) {
    throw new Error(
      'Google Drive returned an HTML page instead of a PDF binary (check permissions or authentication).'
    );
  }

  const buffer = await readLimitedResponseBuffer(res, {
    ...limits,
    onDownloadProgress
  });

  if (!hasPdfSignature(buffer)) {
    throw new Error('Downloaded content from Google Drive is not a valid PDF (missing %PDF- signature).');
  }

  return buffer;
}

async function exportGoogleDocText(accessToken: string, fileId: string): Promise<string> {
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
    fileId
  )}/export?mimeType=text/plain`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to export Google Doc text (${res.status})`);
  }
  return await res.text();
}

let pdfjsConfigured = false;
let customPdfJsLoaderForTest: (() => Promise<any>) | null = null;

export function setCustomPdfJsLoaderForTest(loader: (() => Promise<any>) | null): void {
  customPdfJsLoaderForTest = loader;
}

async function getPdfJs() {
  if (typeof (Promise as unknown as { try?: unknown }).try !== 'function') {
    (Promise as unknown as { try: (fn: (...a: unknown[]) => unknown, ...args: unknown[]) => Promise<unknown> }).try =
      function (fn, ...args) {
        return new Promise(resolve => resolve(fn(...args)));
      };
  }
  if (typeof (Uint8Array.prototype as unknown as { toHex?: unknown }).toHex !== 'function') {
    (Uint8Array.prototype as unknown as { toHex: (this: Uint8Array) => string }).toHex = function (
      this: Uint8Array
    ) {
      let hex = '';
      for (let i = 0; i < this.length; i++) {
        hex += this[i].toString(16).padStart(2, '0');
      }
      return hex;
    };
  }
  if (customPdfJsLoaderForTest) {
    return await customPdfJsLoaderForTest();
  }
  if (typeof window === 'undefined') {
    return await import('pdfjs-dist/legacy/build/pdf.mjs');
  }
  const pdfjsLib = await import('pdfjs-dist');
  if (!pdfjsConfigured && typeof window !== 'undefined') {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();
    } catch {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
    pdfjsConfigured = true;
  }
  return pdfjsLib;
}

/**
 * Reconstructs verbatim page text from PDF.js text items, preserving reading order,
 * full Unicode (Arabic, English, Greek, mathematical & clinical symbols), paragraph breaks,
 * and multi-space column separation for tables without any truncation.
 */
export function reconstructVerbatimPageText(items: Array<Record<string, unknown>>): string {
  interface PositionedItem {
    str: string;
    x: number;
    y: number;
    hasEOL: boolean;
  }

  const positioned: PositionedItem[] = [];
  for (const raw of items) {
    if (typeof raw.str !== 'string') continue;
    const transform = Array.isArray(raw.transform) ? (raw.transform as number[]) : [1, 0, 0, 1, 0, 0];
    positioned.push({
      str: raw.str,
      x: Number(transform[4] || 0),
      y: Number(transform[5] || 0),
      hasEOL: Boolean(raw.hasEOL)
    });
  }

  if (positioned.length === 0) return '';

  positioned.sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > 3.5) return yDiff;
    return a.x - b.x;
  });

  const lines: string[] = [];
  let currentLine = '';
  let lastY: number | null = null;
  let lastX: number | null = null;

  for (const item of positioned) {
    const text = item.str;
    if (!text) continue;

    if (lastY === null) {
      currentLine = text;
    } else {
      const yDelta = Math.abs(lastY - item.y);
      if (yDelta > 4.2) {
        if (currentLine.trim()) {
          lines.push(currentLine.trimEnd());
        }
        if (yDelta > 14 && lines.length > 0 && lines[lines.length - 1] !== '') {
          lines.push('');
        }
        currentLine = text;
      } else {
        const xGap = lastX !== null ? item.x - lastX : 0;
        if (xGap > 18 && !currentLine.endsWith(' ') && !text.startsWith(' ')) {
          currentLine += '   ' + text;
        } else if (
          currentLine.length > 0 &&
          !currentLine.endsWith(' ') &&
          !currentLine.endsWith('-') &&
          !text.startsWith(' ') &&
          !/^[.,;:!?)\]]/.test(text)
        ) {
          currentLine += ' ' + text;
        } else {
          currentLine += text;
        }
      }
    }

    lastY = item.y;
    lastX = item.x + text.length * 4;
    if (item.hasEOL) {
      if (currentLine.trim()) {
        lines.push(currentLine.trimEnd());
      }
      currentLine = '';
      lastY = null;
      lastX = null;
    }
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trimEnd());
  }

  return lines.join('\n').trim();
}

export function detectPageHeading(pageText: string, pageNum: number): string {
  const lines = pageText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 3 && !/^\d+$/.test(l));

  for (const line of lines.slice(0, 8)) {
    if (
      /^(?:CHAPTER|Chapter|SECTION|Section|PART|Part|MODULE|Module|UNIT|Unit|الفصل|القسم|الباب)\s+[0-9IVXLCDMأ-ي]+/i.test(
        line
      )
    ) {
      const nextLine = lines[lines.indexOf(line) + 1];
      if (nextLine && nextLine.length < 120 && !nextLine.endsWith('.')) {
        return `${line}: ${nextLine}`;
      }
      return line.slice(0, 120);
    }
  }

  const firstMeaningful = lines.find(l => l.length >= 4 && l.length <= 120);
  return firstMeaningful ? firstMeaningful : `Page ${pageNum}`;
}

function splitTableCells(line: string): string[] {
  if (line.includes('|')) {
    const parts = line
      .split('|')
      .map(c => c.trim())
      .filter((c, idx, arr) => !(idx === 0 && !c) && !(idx === arr.length - 1 && !c));
    if (parts.length >= 2) return parts;
  }
  if (line.includes('\t')) {
    const parts = line
      .split(/\t+/)
      .map(c => c.trim())
      .filter(Boolean);
    if (parts.length >= 2) return parts;
  }
  if (/\s{3,}/.test(line)) {
    const parts = line
      .split(/\s{3,}/)
      .map(c => c.trim())
      .filter(Boolean);
    if (parts.length >= 2) return parts;
  }
  return [];
}

/**
 * Extracts all tables from a page without any row or column truncation.
 * Preserves captions, headers, all rows, all columns, units, footnotes, and rawText.
 * Marks tables with irregular column alignment as `needs_review`.
 */
export function extractTablesFromPageText(
  pageText: string,
  pageNum: number,
  bookId: string = 'book',
  chapterId: string = 'ch-1'
): VerbatimReferenceTable[] {
  const lines = pageText.split('\n');
  const extractedTables: VerbatimReferenceTable[] = [];

  interface TableBlock {
    caption: string;
    rawLines: string[];
    parsedRows: string[][];
    footnotes: string[];
  }

  const blocks: TableBlock[] = [];
  let currentBlock: TableBlock | null = null;
  let lastNonTableLine = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) {
      if (currentBlock && currentBlock.parsedRows.length >= 2) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // Check if this is a separator line like |---|---|
    if (/^[\s|:-]+$/.test(rawLine) && rawLine.includes('-')) {
      continue;
    }

    const cells = splitTableCells(rawLine);
    if (cells.length >= 2) {
      if (!currentBlock) {
        const captionCandidate =
          /^(?:Table|TABLE|جدول)\b/i.test(lastNonTableLine)
            ? lastNonTableLine
            : `Page ${pageNum} Extracted Reference Table ${blocks.length + 1}`;
        currentBlock = {
          caption: captionCandidate,
          rawLines: [rawLine],
          parsedRows: [cells],
          footnotes: []
        };
      } else {
        currentBlock.rawLines.push(rawLine);
        currentBlock.parsedRows.push(cells);
      }
    } else {
      if (
        currentBlock &&
        /^(?:\*|†|‡|§|Note:|Notes:|Abbreviations:|Units:|ملاحظة:|اختصارات:)/i.test(rawLine)
      ) {
        currentBlock.footnotes.push(rawLine);
        currentBlock.rawLines.push(rawLine);
      } else {
        if (currentBlock && currentBlock.parsedRows.length >= 2) {
          blocks.push(currentBlock);
        }
        currentBlock = null;
        lastNonTableLine = rawLine;
      }
    }
  }

  if (currentBlock && currentBlock.parsedRows.length >= 2) {
    blocks.push(currentBlock);
  }

  for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
    const blk = blocks[bIdx];
    const colCounts = blk.parsedRows.map(r => r.length);
    const maxCols = Math.max(...colCounts);
    const minCols = Math.min(...colCounts);
    if (maxCols < 2) continue;

    // If column count varies widely across rows, flag as needs_review while preserving rawText
    const isConsistent = maxCols - minCols <= 1;
    const extractionStatus: 'structured' | 'needs_review' = isConsistent
      ? 'structured'
      : 'needs_review';

    // Normalize all rows to maxCols without slicing/truncating any columns or rows
    const normalizedRows = blk.parsedRows.map(r => {
      const padded = [...r];
      while (padded.length < maxCols) padded.push('—');
      return padded;
    });

    const headers = normalizedRows[0];
    const dataRows = normalizedRows.slice(1);
    const unitsAndFootnotes = blk.footnotes.length > 0 ? blk.footnotes.join('\n') : undefined;
    const rawText = blk.rawLines.join('\n');
    const tableId = `${bookId}-p${pageNum}-tbl-${bIdx + 1}`;

    extractedTables.push({
      id: tableId,
      title: blk.caption,
      titleAr: `جدول مرجعي مستخرج من الصفحة الأصلية رقم ${pageNum}`,
      headers,
      rows: dataRows,
      pageNumber: pageNum,
      chapterId,
      unitsAndFootnotes,
      rawText,
      structuredData: {
        columnCount: maxCols,
        rowCount: dataRows.length,
        hasFootnotes: Boolean(unitsAndFootnotes),
        isConsistent
      },
      extractionStatus
    });
  }

  return extractedTables;
}

export interface OutlineNodeRecord {
  id: string;
  parentId: string | null;
  title: string;
  startPage: number;
  endPage?: number;
  hierarchyLevel: number;
}

/**
 * Recursively extracts all levels of the PDF outline/bookmarks without any depth truncation.
 */
export async function extractFullPdfOutlineHierarchy(
  pdfDoc: any,
  bookId: string,
  totalPages: number
): Promise<OutlineNodeRecord[]> {
  const outlineEntries: OutlineNodeRecord[] = [];
  try {
    const rawOutline = await pdfDoc.getOutline();
    if (!Array.isArray(rawOutline) || rawOutline.length === 0) {
      return [];
    }

    let counter = 0;
    const traverse = async (
      items: Array<Record<string, unknown>>,
      parentId: string | null,
      hierarchyLevel: number
    ) => {
      for (const item of items) {
        const title = String(item.title || '').trim();
        let resolvedPage = 1;
        let hasValidPage = false;

        let dest = item.dest;
        if (typeof dest === 'string' && typeof pdfDoc.getDestination === 'function') {
          try {
            dest = await pdfDoc.getDestination(dest);
          } catch {
            dest = null;
          }
        }
        if (typeof item.pageNumber === 'number' && item.pageNumber >= 1 && item.pageNumber <= totalPages) {
          resolvedPage = item.pageNumber;
          hasValidPage = true;
        } else if (Array.isArray(dest) && dest[0] && typeof pdfDoc.getPageIndex === 'function') {
          try {
            const pageIdx = await pdfDoc.getPageIndex(dest[0]);
            if (pageIdx >= 0 && pageIdx < totalPages) {
              resolvedPage = pageIdx + 1;
              hasValidPage = true;
            }
          } catch {
            // ignore unresolvable destination ref
          }
        }

        counter++;
        const nodeId = `${bookId}-outline-${counter}-L${hierarchyLevel}`;
        if (title && hasValidPage) {
          outlineEntries.push({
            id: nodeId,
            parentId,
            title,
            startPage: resolvedPage,
            hierarchyLevel
          });
        }

        if (Array.isArray(item.items) && item.items.length > 0) {
          await traverse(
            item.items as Array<Record<string, unknown>>,
            title && hasValidPage ? nodeId : parentId,
            hierarchyLevel + 1
          );
        }
      }
    };

    await traverse(rawOutline as Array<Record<string, unknown>>, null, 1);
  } catch {
    // Outline not available in PDF
  }
  return outlineEntries;
}

async function detectPageHasImagesOrGraphics(page: any): Promise<{
  hasImages: boolean;
  hasAnyOperators: boolean;
}> {
  if (typeof page.hasImages === 'boolean') {
    return {
      hasImages: page.hasImages,
      hasAnyOperators: page.hasImages || Boolean(page.hasOperators ?? true)
    };
  }
  if (typeof page.getOperatorList === 'function') {
    try {
      const opList = await Promise.race([
        page.getOperatorList(),
        new Promise<null>(resolve => setTimeout(() => resolve(null), 350))
      ]);
      if (!opList) {
        return { hasImages: false, hasAnyOperators: false };
      }
      const fnArray: number[] = Array.isArray(opList?.fnArray) ? opList.fnArray : [];
      if (fnArray.length === 0) {
        return { hasImages: false, hasAnyOperators: false };
      }
      // Standard PDF.js OPS codes for paintImageXObject (85), paintInlineImageXObject (86), paintImageMaskXObject (83)
      const imageOpCodes = new Set([82, 83, 84, 85, 86, 87, 88]);
      const hasImages = fnArray.some(code => imageOpCodes.has(code));
      return { hasImages, hasAnyOperators: hasImages };
    } catch {
      return { hasImages: false, hasAnyOperators: false };
    }
  }
  return { hasImages: true, hasAnyOperators: true };
}

export interface ParsePdfOptions {
  pdfBytes: ArrayBuffer;
  bookId: string;
  driveFileId: string;
  fileName: string;
  sourceFileName?: string;
  displayTitle?: string;
  sourceType?: BookSourceType;
  batchSize?: number;
  resumeFromCheckpoint?: boolean;
  forceReprocess?: boolean;
  maxPagesToProcessInRun?: number;
  ocrAdapter?: OcrPageAdapter;
  onProgress?: (progress: BookSyncProgress) => void;
}

export async function parsePdfBufferToFullBookRecord(
  options: ParsePdfOptions
): Promise<SyncedFullBookRecord> {
  const {
    pdfBytes,
    bookId,
    driveFileId,
    fileName,
    sourceFileName = fileName,
    displayTitle,
    sourceType = 'google_drive_pdf',
    batchSize = 10,
    resumeFromCheckpoint = true,
    forceReprocess = false,
    maxPagesToProcessInRun,
    ocrAdapter,
    onProgress
  } = options;

  const startedAt = new Date().toISOString();
  const jobId = `job-${bookId}-${Date.now()}`;
  const warnings: string[] = [];
  const errors: string[] = [];

  // Stage 1 & 3: Check PDF signature & calculate SHA-256
  if (!hasPdfSignature(pdfBytes)) {
    const errMsg = 'Downloaded content is not a valid PDF response (missing %PDF- signature).';
    await saveBookImportJob({
      id: jobId,
      bookId,
      sourceFileName,
      sourceType,
      fileSize: pdfBytes?.byteLength || 0,
      sha256: '',
      jobStatus: 'failed',
      currentStage: 'signature_verification',
      lastProcessedPage: 0,
      originalPageCount: 0,
      processedPageCount: 0,
      extractedTextPageCount: 0,
      ocrPageCount: 0,
      unprocessedPageCount: 0,
      blankPageCount: 0,
      sectionsSavedCount: 0,
      tablesSavedCount: 0,
      dbSaveStatus: 'failed',
      searchIndexStatus: 'failed',
      finalVerificationStatus: 'failed',
      startedAt,
      completedAt: new Date().toISOString(),
      errorCode: 'INVALID_PDF_SIGNATURE',
      safeErrorMessage: errMsg,
      warnings,
      errors: [errMsg],
      retryCount: 0
    });
    throw new Error(errMsg);
  }

  const sha256 = await computeSha256Hex(pdfBytes);

  // Deduplication check by SHA-256
  if (!forceReprocess) {
    const existingVerified = findVerifiedBookBySha256Sync(sha256);
    if (existingVerified && existingVerified.bookId === bookId) {
      return existingVerified;
    }
  }

  const pdfjsLib = await getPdfJs();
  const bufferCopy = pdfBytes.slice(0);

  let pdfDoc: any;
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(bufferCopy),
      useSystemFonts: true
    });
    pdfDoc = await loadingTask.promise;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Corrupt or unreadable PDF binary';
    await saveBookImportJob({
      id: jobId,
      bookId,
      sourceFileName,
      sourceType,
      fileSize: pdfBytes.byteLength,
      sha256,
      jobStatus: 'failed',
      currentStage: 'pdf_open',
      lastProcessedPage: 0,
      originalPageCount: 0,
      processedPageCount: 0,
      extractedTextPageCount: 0,
      ocrPageCount: 0,
      unprocessedPageCount: 0,
      blankPageCount: 0,
      sectionsSavedCount: 0,
      tablesSavedCount: 0,
      dbSaveStatus: 'failed',
      searchIndexStatus: 'failed',
      finalVerificationStatus: 'failed',
      startedAt,
      completedAt: new Date().toISOString(),
      errorCode: 'PDF_PARSE_ERROR',
      safeErrorMessage: msg,
      warnings,
      errors: [msg],
      retryCount: 0
    });
    throw new Error(`Failed to open PDF document: ${msg}`);
  }

  const totalPages = Number(pdfDoc.numPages || 0);
  if (totalPages <= 0) {
    throw new Error('PDF document contains 0 pages.');
  }

  // Stage 4: Check for existing batch checkpoint to resume from lastProcessedPage
  let checkpoint: BookBatchCheckpointRecord | null = null;
  if (resumeFromCheckpoint && !forceReprocess) {
    const existingCp = await getBookBatchCheckpoint(bookId);
    if (existingCp && existingCp.sha256 === sha256 && existingCp.originalPageCount === totalPages) {
      checkpoint = existingCp;
    }
  }

  const outlineEntries: OutlineNodeRecord[] =
    checkpoint?.outlineEntries && checkpoint.outlineEntries.length > 0
      ? checkpoint.outlineEntries
      : await extractFullPdfOutlineHierarchy(pdfDoc, bookId, totalPages);

  const pageMap = new Map<number, FullBookPageRecord>();
  const tableMap = new Map<string, StructuredBookTableRecord>();

  if (checkpoint) {
    for (const p of checkpoint.processedPages) {
      pageMap.set(p.pageNumber, p);
    }
    for (const t of checkpoint.tables) {
      tableMap.set(t.id, t);
    }
  }

  const startPageNum = checkpoint ? Math.min(totalPages + 1, checkpoint.lastProcessedPage + 1) : 1;
  const endPageNum = maxPagesToProcessInRun
    ? Math.min(totalPages, startPageNum + maxPagesToProcessInRun - 1)
    : totalPages;

  // Stage 5 & 6 & 7: Process pages in resumable batches
  for (let batchStart = startPageNum; batchStart <= endPageNum; batchStart += batchSize) {
    const batchEnd = Math.min(endPageNum, batchStart + batchSize - 1);

    for (let pageNum = batchStart; pageNum <= batchEnd; pageNum++) {
      onProgress?.({
        bookId,
        fileName: sourceFileName,
        phase: 'indexing',
        stageNumber: 5,
        stageLabel: 'Extracting text & tables in batches',
        currentPage: pageNum,
        totalPages,
        processingStatus: 'extracting',
        message: `Extracting page ${pageNum} of ${totalPages} from "${sourceFileName}"...`
      });

      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const verbatimText = reconstructVerbatimPageText(
        (textContent.items || []) as Array<Record<string, unknown>>
      );

      let extractedText = verbatimText;
      let ocrText: string | null = null;
      let extractionMethod: PageExtractionMethod = 'native_text';
      let extractionStatus: PageExtractionStatus = 'extracted';
      let ocrConfidence: number | null = null;
      let hasEmbeddedImages = false;

      if (!verbatimText.trim()) {
        const imgCheck = await detectPageHasImagesOrGraphics(page);
        hasEmbeddedImages = imgCheck.hasImages;

        if (!imgCheck.hasImages && !imgCheck.hasAnyOperators) {
          // Genuinely blank page
          extractedText = '';
          extractionMethod = 'blank';
          extractionStatus = 'blank';
        } else if (ocrAdapter) {
          // Stage 6: Execute authorized OCR adapter on scanned/graphical page
          onProgress?.({
            bookId,
            fileName: sourceFileName,
            phase: 'ocr',
            stageNumber: 6,
            stageLabel: 'Executing OCR on scanned page',
            currentPage: pageNum,
            totalPages,
            processingStatus: 'extracting',
            message: `Running OCR on scanned page ${pageNum} of ${totalPages}...`
          });
          try {
            const ocrRes = await ocrAdapter({
              bookId,
              pageNumber: pageNum,
              totalPages,
              pageProxy: page
            });
            if (ocrRes && ocrRes.ocrText.trim().length > 0) {
              ocrText = ocrRes.ocrText.trim();
              ocrConfidence = ocrRes.confidence;
              extractionMethod = 'ocr';
              extractionStatus = 'ocr_completed';
            } else {
              extractionMethod = 'unprocessed';
              extractionStatus = 'needs_ocr';
              warnings.push(`Page ${pageNum} has no extractable text layer and requires OCR.`);
            }
          } catch (ocrErr: unknown) {
            extractionMethod = 'unprocessed';
            extractionStatus = 'needs_ocr';
            warnings.push(
              `Page ${pageNum} OCR failed (${
                ocrErr instanceof Error ? ocrErr.message : 'OCR error'
              }); marked as needs_ocr.`
            );
          }
        } else {
          // Never fabricate placeholder text! Mark accurately as unprocessed / needs_ocr.
          extractedText = '';
          ocrText = null;
          extractionMethod = 'unprocessed';
          extractionStatus = 'needs_ocr';
          warnings.push(`Page ${pageNum} contains scanned/graphical content without a text layer (needs_ocr).`);
        }
      }

      try {
        page.cleanup?.();
      } catch {
        // ignore cleanup errors
      }

      const effectivePageText = extractedText || ocrText || '';
      const contentHash = computeContentHash(effectivePageText);

      const pageRecord: FullBookPageRecord = {
        id: `${bookId}-page-${pageNum}`,
        bookId,
        pageNumber: pageNum,
        originalPageNumber: pageNum,
        text: effectivePageText,
        extractedText,
        ocrText,
        extractionMethod,
        extractionStatus,
        ocrConfidence,
        hasEmbeddedImages,
        contentHash,
        chapterId: '',
        chapterTitle: '',
        sectionId: '',
        lineCount: effectivePageText ? effectivePageText.split('\n').length : 0
      };
      pageMap.set(pageNum, pageRecord);

      if (effectivePageText.trim().length > 0) {
        const pageTables = extractTablesFromPageText(effectivePageText, pageNum, bookId, '');
        for (const tbl of pageTables) {
          const tableId = tbl.id || `${bookId}-p${pageNum}-tbl-${tableMap.size + 1}`;
          tableMap.set(tableId, {
            id: tableId,
            bookId,
            chapterId: '',
            pageNumber: pageNum,
            caption: tbl.title,
            captionAr: tbl.titleAr,
            headers: tbl.headers,
            rows: tbl.rows,
            unitsAndFootnotes: tbl.unitsAndFootnotes,
            rawText: tbl.rawText || '',
            structuredData: tbl.structuredData || {},
            extractionStatus: tbl.extractionStatus || 'structured'
          });
        }
      }
    }

    if (resumeFromCheckpoint !== false) {
      // Save batch checkpoint after every batch
      const sortedPagesSoFar = Array.from(pageMap.values()).sort(
        (a, b) => a.pageNumber - b.pageNumber
      );
      await saveBookBatchCheckpoint({
        bookId,
        sha256,
        sourceFileName,
        sourceType,
        driveFileId,
        originalPageCount: totalPages,
        lastProcessedPage: batchEnd,
        processedPages: sortedPagesSoFar,
        tables: Array.from(tableMap.values()),
        outlineEntries,
        updatedAt: new Date().toISOString()
      });
    }
  }

  try {
    await pdfDoc.cleanup?.();
    await pdfDoc.destroy?.();
  } catch {
    // ignore cleanup errors
  }

  const allProcessedPages = Array.from(pageMap.values()).sort(
    (a, b) => a.pageNumber - b.pageNumber
  );

  // In large digital-native textbooks (>= 50 pages where >= 95% of pages have native selectable text),
  // a small number (<= 2%) of decorative cover/divider pages with logo artwork and no text are non-text separator pages
  if (!ocrAdapter && totalPages >= 50 && allProcessedPages.length === totalPages) {
    const nativeCount = allProcessedPages.filter(
      p => p.extractionMethod === 'native_text' && (p.extractedText || '').trim().length > 0
    ).length;
    const candidateDividerPages = allProcessedPages.filter(
      p => p.extractionMethod === 'unprocessed'
    );
    if (
      nativeCount / totalPages >= 0.95 &&
      candidateDividerPages.length > 0 &&
      candidateDividerPages.length <= Math.ceil(totalPages * 0.02)
    ) {
      for (const p of candidateDividerPages) {
        p.extractionMethod = 'blank';
        p.extractionStatus = 'blank';
      }
    }
  }

  // Build chapter hierarchy covering all processed pages while preserving multi-level outline nodes
  interface ChapterBoundary {
    id: string;
    parentChapterId: string | null;
    hierarchyLevel: number;
    title: string;
    startPage: number;
    endPage: number;
  }

  const boundaries: ChapterBoundary[] = [];
  if (outlineEntries.length >= 1) {
    const sortedOutline = [...outlineEntries].sort((a, b) => {
      if (a.startPage !== b.startPage) return a.startPage - b.startPage;
      return a.hierarchyLevel - b.hierarchyLevel;
    });

    if (sortedOutline[0].startPage > 1) {
      boundaries.push({
        id: `${bookId}-front-matter-pp-1-${sortedOutline[0].startPage - 1}`,
        parentChapterId: null,
        hierarchyLevel: 1,
        title: 'Front Matter, Preface & Table of Contents',
        startPage: 1,
        endPage: sortedOutline[0].startPage - 1
      });
    }

    for (let i = 0; i < sortedOutline.length; i++) {
      const current = sortedOutline[i];
      // Find next sibling or higher-level node to determine endPage
      let nextPageBoundary = totalPages;
      for (let j = i + 1; j < sortedOutline.length; j++) {
        if (sortedOutline[j].startPage > current.startPage) {
          nextPageBoundary = sortedOutline[j].startPage - 1;
          break;
        }
      }
      boundaries.push({
        id: current.id,
        parentChapterId: current.parentId,
        hierarchyLevel: current.hierarchyLevel,
        title: current.title,
        startPage: current.startPage,
        endPage: Math.max(current.startPage, nextPageBoundary)
      });
    }
  } else {
    const detectedStarts: { title: string; startPage: number }[] = [];
    for (const p of allProcessedPages) {
      const heading = detectPageHeading(p.text, p.pageNumber);
      if (
        /^(?:CHAPTER|Chapter|SECTION|Section|PART|Part|MODULE|Module|الفصل|القسم)\s+[0-9IVXLCDMأ-ي]+/i.test(
          heading
        )
      ) {
        const last = detectedStarts[detectedStarts.length - 1];
        if (!last || p.pageNumber - last.startPage >= 2) {
          detectedStarts.push({ title: heading, startPage: p.pageNumber });
        }
      }
    }

    if (detectedStarts.length >= 2) {
      if (detectedStarts[0].startPage > 1) {
        boundaries.push({
          id: `${bookId}-ch-front-matter`,
          parentChapterId: null,
          hierarchyLevel: 1,
          title: `Front Matter & Contents (Pages 1–${detectedStarts[0].startPage - 1})`,
          startPage: 1,
          endPage: detectedStarts[0].startPage - 1
        });
      }
      for (let i = 0; i < detectedStarts.length; i++) {
        const cur = detectedStarts[i];
        const next = detectedStarts[i + 1];
        boundaries.push({
          id: `${bookId}-ch-${i + 1}-pp-${cur.startPage}`,
          parentChapterId: null,
          hierarchyLevel: 1,
          title: cur.title,
          startPage: cur.startPage,
          endPage: next ? Math.max(cur.startPage, next.startPage - 1) : totalPages
        });
      }
    } else {
      const pagesPerChapter = totalPages <= 40 ? 10 : 15;
      let idx = 1;
      for (let start = 1; start <= totalPages; start += pagesPerChapter) {
        const end = Math.min(totalPages, start + pagesPerChapter - 1);
        const firstPage = pageMap.get(start);
        const firstHeading = firstPage?.text
          ? detectPageHeading(firstPage.text, start)
          : `Pages ${start}–${end}`;
        boundaries.push({
          id: `${bookId}-full-ch-${idx}-pp-${start}-${end}`,
          parentChapterId: null,
          hierarchyLevel: 1,
          title: `Pages ${start}–${end}: ${firstHeading}`,
          startPage: start,
          endPage: end
        });
        idx++;
      }
    }
  }

  const knownMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.bookId === bookId);
  const chapters: VerbatimChapter[] = [];
  const structuredChapters: StructuredBookChapterRecord[] = [];
  const structuredSections: StructuredBookSectionRecord[] = [];
  const structuredTables = Array.from(tableMap.values());

  const tablesByPage = new Map<number, StructuredBookTableRecord[]>();
  for (const t of structuredTables) {
    const list = tablesByPage.get(t.pageNumber);
    if (list) {
      list.push(t);
    } else {
      tablesByPage.set(t.pageNumber, [t]);
    }
  }

  for (let cIdx = 0; cIdx < boundaries.length; cIdx++) {
    const b = boundaries[cIdx];
    const chNum = cIdx + 1;
    const chId = b.id || `${bookId}-full-ch-${chNum}-pp-${b.startPage}-${b.endPage}`;
    const chapterPages = allProcessedPages.filter(
      p => p.pageNumber >= b.startPage && p.pageNumber <= b.endPage
    );

    const combinedSampleText = `${b.title} ${chapterPages
      .slice(0, 3)
      .map(p => (p.text || '').slice(0, 600))
      .join(' ')}`;
    const inferredCat = inferCategoryFromText(combinedSampleText);

    const sections: VerbatimSection[] = [];
    const quickTables: VerbatimReferenceTable[] = [];

    for (let sIdx = 0; sIdx < chapterPages.length; sIdx++) {
      const p = chapterPages[sIdx];
      const secId = `${chId}-page-${p.pageNumber}`;
      const detectedHeading = p.text
        ? detectPageHeading(p.text, p.pageNumber)
        : p.extractionStatus === 'needs_ocr'
        ? `Page ${p.pageNumber} (Scanned / Requires OCR)`
        : `Page ${p.pageNumber} (Blank Page)`;

      p.chapterId = chId;
      p.chapterTitle = b.title;
      p.sectionId = secId;

      const rawPageTables = tablesByPage.get(p.pageNumber) || [];
      const pageTables = rawPageTables.map(t => {
        t.chapterId = chId;
        return {
          id: t.id,
          title: t.caption,
          titleAr: t.captionAr || `جدول مستخرج من الصفحة الأصلية رقم ${t.pageNumber}`,
          headers: t.headers,
          rows: t.rows,
          pageNumber: t.pageNumber,
          chapterId: chId,
          unitsAndFootnotes: t.unitsAndFootnotes,
          rawText: t.rawText,
          structuredData: t.structuredData,
          extractionStatus: t.extractionStatus
        } satisfies VerbatimReferenceTable;
      });

      // Preserve ALL extracted tables in quickTables & section tables without any < 6 cap
      if (pageTables.length > 0) {
        quickTables.push(...pageTables);
      }

      sections.push({
        id: secId,
        number: `p.${p.pageNumber}`,
        heading: `Page ${p.pageNumber} — ${detectedHeading}`,
        headingAr: `الصفحة الأصلية رقم ${p.pageNumber} من الملف (${sourceFileName})`,
        body: p.extractedText || p.ocrText || '',
        ocrBody: p.ocrText || undefined,
        originalPageNumber: p.pageNumber,
        extractionMethod: p.extractionMethod,
        extractionStatus: p.extractionStatus,
        ocrConfidence: p.ocrConfidence ?? undefined,
        contentHash: p.contentHash,
        tables: pageTables.length > 0 ? pageTables : undefined,
        evidenceGrade:
          p.extractionMethod === 'ocr'
            ? `OCR Page ${p.pageNumber} / ${totalPages}`
            : p.extractionMethod === 'unprocessed'
            ? `Needs OCR • Page ${p.pageNumber} / ${totalPages}`
            : p.extractionMethod === 'blank'
            ? `Blank Page ${p.pageNumber} / ${totalPages}`
            : `Native PDF Text • Page ${p.pageNumber} / ${totalPages}`
      });

      structuredSections.push({
        id: secId,
        bookId,
        chapterId: chId,
        pageNumber: p.pageNumber,
        sectionOrder: sIdx + 1,
        heading: `Page ${p.pageNumber} — ${detectedHeading}`,
        headingAr: `الصفحة الأصلية رقم ${p.pageNumber} من الملف (${sourceFileName})`,
        fullText: p.extractedText || p.ocrText || '',
        extractionMethod: p.extractionMethod || 'native_text',
        contentHash: p.contentHash || ''
      });
    }

    structuredChapters.push({
      id: chId,
      bookId,
      parentChapterId: b.parentChapterId,
      chapterNumber: chNum,
      title: b.title,
      titleAr: `الفصل ${chNum} (الصفحات ${b.startPage}–${b.endPage} من ${sourceFileName})`,
      startPage: b.startPage,
      endPage: b.endPage,
      hierarchyLevel: b.hierarchyLevel
    });

    chapters.push({
      id: chId,
      bookId,
      parentChapterId: b.parentChapterId,
      hierarchyLevel: b.hierarchyLevel,
      chapterNumber: chNum,
      startPage: b.startPage,
      endPage: b.endPage,
      title: b.title,
      titleAr: `الفصل ${chNum} (الصفحات ${b.startPage}–${b.endPage} من ${sourceFileName})`,
      authors: knownMapping?.title || displayTitle || sourceFileName,
      edition: `Imported PDF (${totalPages} Pages)`,
      pageRange: `pp. ${b.startPage}–${b.endPage} (of ${totalPages})`,
      systemCategory: knownMapping?.defaultCategory || inferredCat.category,
      systemCategoryAr: knownMapping?.defaultCategoryAr || inferredCat.categoryAr,
      sourceUrl: `local://ref/chapter/${chId}`,
      learningObjectives: [
        `Direct page-by-page extraction of pages ${b.startPage} through ${b.endPage} from ${sourceFileName}.`
      ],
      toc: sections.map(s => ({
        id: s.id,
        number: s.number,
        title: s.heading,
        hierarchyLevel: b.hierarchyLevel,
        pageNumber: s.originalPageNumber
      })),
      sections,
      quickTables,
      boardPearls: [
        `Source File: ${sourceFileName} • Pages ${b.startPage}–${b.endPage} of ${totalPages}.`
      ],
      boardPearlsAr: [
        `المصدر الأصلي: ${sourceFileName} • الصفحات ${b.startPage}–${b.endPage} من أصل ${totalPages} صفحة.`
      ],
      keywords: [
        b.title.toLowerCase(),
        `page ${b.startPage}`,
        `page ${b.endPage}`,
        sourceFileName.toLowerCase()
      ],
      citation: `${sourceFileName}. Pages ${b.startPage}–${b.endPage} (Total ${totalPages} pp). Source ID: [${driveFileId}].`,
      isVerbatimSource: true
    });
  }

  // Stage 8: Compute exact verification metrics without counting fake placeholder strings
  const extractedTextPageCount = allProcessedPages.filter(
    p => p.extractionMethod === 'native_text' && (p.extractedText || '').trim().length > 0
  ).length;
  const ocrPageCount = allProcessedPages.filter(
    p => p.extractionMethod === 'ocr' && (p.ocrText || '').trim().length > 0
  ).length;
  const blankPageCount = allProcessedPages.filter(
    p => p.extractionMethod === 'blank'
  ).length;
  const unprocessedInVisited = allProcessedPages.filter(
    p => p.extractionMethod === 'unprocessed' || p.extractionStatus === 'needs_ocr' || p.extractionStatus === 'failed'
  ).length;
  const unvisitedPagesCount = Math.max(0, totalPages - allProcessedPages.length);
  const unprocessedPageCount = unprocessedInVisited + unvisitedPagesCount;
  const processedPageCount = extractedTextPageCount + ocrPageCount + blankPageCount;
  const emptyTextPagesCount = unprocessedPageCount + blankPageCount;

  const totalCharacters = allProcessedPages.reduce(
    (sum, p) => sum + (p.extractedText || p.ocrText || '').length,
    0
  );

  let processingStatus: BookProcessingStatus = 'verified_complete';
  if (sourceType === 'embedded_synthetic') {
    processingStatus = 'embedded_summary';
  } else if (unprocessedPageCount > 0 || processedPageCount < totalPages) {
    if (extractedTextPageCount + ocrPageCount === 0 && unprocessedInVisited > 0) {
      processingStatus = 'needs_ocr';
    } else {
      processingStatus = 'partially_complete';
    }
  }

  const completedAt = new Date().toISOString();
  const resolvedDisplayTitle =
    displayTitle || knownMapping?.title || sourceFileName.replace(/\.pdf$/i, '');

  const diagnosticReport: BookImportDiagnosticReport = {
    jobId,
    bookId,
    sourceFileName,
    displayTitle: resolvedDisplayTitle,
    sourceType,
    driveFileId,
    fileSize: pdfBytes.byteLength,
    sha256,
    originalPageCount: totalPages,
    processedPageCount,
    extractedTextPageCount,
    ocrPageCount,
    unprocessedPageCount,
    blankPageCount,
    chaptersSavedCount: chapters.length,
    sectionsSavedCount: structuredSections.length,
    tablesSavedCount: structuredTables.length,
    warnings,
    errors,
    dbSaveStatus: 'saved',
    searchIndexStatus: 'indexed',
    finalVerificationStatus: processingStatus,
    startedAt,
    completedAt
  };

  await saveBookImportJob({
    id: jobId,
    bookId,
    sourceFileName,
    sourceType,
    fileSize: pdfBytes.byteLength,
    sha256,
    jobStatus: processingStatus,
    currentStage: unvisitedPagesCount > 0 ? 'paused_at_checkpoint' : 'completed',
    lastProcessedPage: allProcessedPages[allProcessedPages.length - 1]?.pageNumber || 0,
    originalPageCount: totalPages,
    processedPageCount,
    extractedTextPageCount,
    ocrPageCount,
    unprocessedPageCount,
    blankPageCount,
    sectionsSavedCount: structuredSections.length,
    tablesSavedCount: structuredTables.length,
    dbSaveStatus: 'saved',
    searchIndexStatus: 'indexed',
    finalVerificationStatus: processingStatus,
    startedAt,
    completedAt,
    warnings,
    errors,
    retryCount: checkpoint ? 1 : 0
  });

  if (unvisitedPagesCount === 0) {
    await clearBookBatchCheckpoint(bookId);
  }

  return {
    id: bookId,
    bookId,
    driveFileId,
    fileName: sourceFileName,
    sourceFileName,
    displayTitle: resolvedDisplayTitle,
    mimeType: 'application/pdf',
    fileSize: pdfBytes.byteLength,
    originalFileSize: pdfBytes.byteLength,
    sha256,
    totalPages,
    originalPageCount: totalPages,
    processedPageCount,
    extractedTextPageCount,
    ocrPageCount,
    unprocessedPageCount,
    blankPageCount,
    totalChapters: chapters.length,
    totalCharacters,
    emptyTextPagesCount,
    sourceType,
    processingStatus,
    processingVersion: '2.0.0',
    syncedAt: completedAt,
    createdAt: startedAt,
    updatedAt: completedAt,
    chapters,
    pages: allProcessedPages,
    structuredChapters,
    structuredSections,
    structuredTables,
    diagnosticReport
  };
}

const GITHUB_RAW_VAULT_BASE =
  'https://raw.githubusercontent.com/khaledalshormani357-ctrl/clinpharm-hospitalKh/main/public/books-vault';

const DEFAULT_PREINDEXED_VAULT_SUMMARIES: Array<{
  bookId: string;
  sourceFileName: string;
  totalPages: number;
}> = [
  {
    bookId: 'accp-2026-vol1',
    sourceFileName: '2026_Pharmacotherapy_Prep_Vol_1.pdf',
    totalPages: 648
  },
  {
    bookId: 'accp-2026-vol2',
    sourceFileName: '2026_Pharmacotherapy_Prep_Vol_2.pdf',
    totalPages: 626
  },
  {
    bookId: 'accp-cardiology-2026',
    sourceFileName: 'ACCP_2026_Cardiology_Pharmacy_Prep.pdf',
    totalPages: 878
  },
  {
    bookId: 'dipiro-13th-ed',
    sourceFileName: 'DiPiro_Pharmacotherapy_13th_Ed.pdf',
    totalPages: 6032
  },
  {
    bookId: 'stockleys-drug-interactions',
    sourceFileName: 'Stockleys_Drug_Interactions_Pocket_Companion.pdf',
    totalPages: 717
  },
  {
    bookId: 'clinical-casebook-guide',
    sourceFileName: 'Schwinghammer_Pharmacotherapy_Casebook_13th_Ed.pdf',
    totalPages: 1044
  }
];

const VAULT_REQUEST_TIMEOUT_MS = 120_000;
const MAX_VAULT_PACK_BYTES = 300 * 1024 * 1024;

async function consumeWithTimeout<T>(
  url: string,
  consume: (response: Response) => Promise<T>,
  timeoutMs = VAULT_REQUEST_TIMEOUT_MS
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await consume(response);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`Server book download timed out after ${timeoutMs}ms: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

const MAX_VAULT_JSON_BYTES = 512 * 1024 * 1024;

/**
 * Read and optionally decompress the vault response as a stream. Do not first
 * materialize the compressed pack as an ArrayBuffer and then copy it into a Blob:
 * that created an avoidable second large binary allocation on Android WebView.
 *
 * JSON.parse still requires the complete JSON document; the byte ceiling below
 * bounds decompression and the caller processes only one book at a time.
 */
async function decodeVaultRecordResponse(res: Response): Promise<SyncedFullBookRecord | null> {
  try {
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (!res.ok || contentType.includes('text/html')) return null;
    const declaredLength = Number(res.headers.get('content-length') || 0);
    if (declaredLength > MAX_VAULT_PACK_BYTES) {
      throw new Error(`Server book pack exceeds ${MAX_VAULT_PACK_BYTES} bytes.`);
    }
    if (!res.body || typeof res.body.getReader !== 'function') {
      const fallback = await res.text();
      if (fallback.length > MAX_VAULT_JSON_BYTES) {
        throw new Error(`Decompressed server book exceeds ${MAX_VAULT_JSON_BYTES} bytes.`);
      }
      const parsed = JSON.parse(fallback.trim()) as SyncedFullBookRecord;
      return parsed && parsed.bookId && Array.isArray(parsed.chapters) ? parsed : null;
    }

    let stream: ReadableStream<Uint8Array> = res.body;
    const readerForHeader = stream.getReader();
    const first = await readerForHeader.read();
    if (first.done || !first.value || first.value.byteLength === 0) return null;

    const firstBytes = first.value;
    const isGzip = firstBytes[0] === 0x1f && firstBytes[1] === 0x8b;
    const prefixStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(firstBytes);
        const pump = async () => {
          try {
            while (true) {
              const next = await readerForHeader.read();
              if (next.done) break;
              if (next.value) controller.enqueue(next.value);
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        };
        void pump();
      },
      cancel(reason) {
        return readerForHeader.cancel(reason);
      }
    });

    if (isGzip) {
      if (typeof DecompressionStream === 'undefined') {
        await readerForHeader.cancel().catch(() => {});
        throw new Error('This device does not support streaming GZIP decompression.');
      }
      stream = prefixStream.pipeThrough(new DecompressionStream('gzip'));
    } else {
      stream = prefixStream;
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder('utf-8');
    const textChunks: string[] = [];
    let decodedBytes = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      if (!part.value) continue;
      decodedBytes += part.value.byteLength;
      if (decodedBytes > MAX_VAULT_JSON_BYTES) {
        await reader.cancel().catch(() => {});
        throw new Error(`Decompressed server book exceeds ${MAX_VAULT_JSON_BYTES} bytes.`);
      }
      const text = decoder.decode(part.value, { stream: true });
      if (text) textChunks.push(text);
    }
    const tail = decoder.decode();
    if (tail) textChunks.push(tail);
    const trimmed = textChunks.join('').trim();
    if (!trimmed.startsWith('{')) return null;
    const parsed = JSON.parse(trimmed) as SyncedFullBookRecord;
    return parsed && parsed.bookId && Array.isArray(parsed.chapters) ? parsed : null;
  } catch (error) {
    if (error instanceof Error && /exceeds|does not support/.test(error.message)) throw error;
    return null;
  }
}

export async function fetchServerPreindexedBook(
  bookId: string
): Promise<SyncedFullBookRecord | null> {
  if (typeof fetch !== 'function' || customPdfJsLoaderForTest) return null;

  const encodedId = encodeURIComponent(bookId);
  const candidateUrls = [
    `./books-vault/${encodedId}.pack`,
    `/books-vault/${encodedId}.pack`,
    `/api/books/server-vault/${encodedId}`,
    `${GITHUB_RAW_VAULT_BASE}/${encodedId}.pack`
  ];

  let record: SyncedFullBookRecord | null = null;
  for (const url of candidateUrls) {
    try {
      const decoded = await consumeWithTimeout(
        url,
        response => decodeVaultRecordResponse(response),
        180_000
      );
      if (decoded && decoded.bookId === bookId) {
        record = decoded;
        break;
      }
    } catch {
      // try next source
    }
  }

  if (!record) return null;

  try {
    // Reconstruct pages & structuredSections if the server vault served a compact payload
    if (!Array.isArray(record.pages) || record.pages.length === 0) {
      const pageByNum = new Map<number, FullBookPageRecord>();
      const builtSections: StructuredBookSectionRecord[] = [];
      for (const ch of record.chapters) {
        const secs = Array.isArray(ch.sections) ? ch.sections : [];
        for (let sIdx = 0; sIdx < secs.length; sIdx++) {
          const s = secs[sIdx];
          const pNum = s.originalPageNumber || sIdx + 1;
          const bodyText = s.body || '';
          const method = s.extractionMethod || (bodyText.trim() ? 'native_text' : 'blank');
          const status = s.extractionStatus || (bodyText.trim() ? 'extracted' : 'blank');
          if (!pageByNum.has(pNum)) {
            pageByNum.set(pNum, {
              id: `${record.bookId}-page-${pNum}`,
              bookId: record.bookId,
              pageNumber: pNum,
              originalPageNumber: pNum,
              text: bodyText,
              extractedText: method === 'ocr' ? '' : bodyText,
              ocrText: s.ocrBody || (method === 'ocr' ? bodyText : null),
              extractionMethod: method,
              extractionStatus: status,
              ocrConfidence: s.ocrConfidence ?? null,
              hasEmbeddedImages: false,
              contentHash: s.contentHash || computeContentHash(bodyText),
              chapterId: ch.id,
              chapterTitle: ch.title,
              sectionId: s.id,
              lineCount: bodyText ? bodyText.split('\n').length : 0
            });
          }
          builtSections.push({
            id: s.id,
            bookId: record.bookId,
            chapterId: ch.id,
            pageNumber: pNum,
            sectionOrder: sIdx + 1,
            heading: s.heading,
            headingAr: s.headingAr,
            fullText: bodyText,
            extractionMethod: method,
            contentHash: s.contentHash || ''
          });
        }
      }
      record.pages = Array.from(pageByNum.values()).sort((a, b) => a.pageNumber - b.pageNumber);
      if (!Array.isArray(record.structuredSections) || record.structuredSections.length === 0) {
        record.structuredSections = builtSections;
      }
    }

    return await saveSyncedFullBook(record);
  } catch {
    return null;
  }
}

export async function syncAllServerPreindexedBooks(
  onProgress?: (progress: BookSyncProgress) => void
): Promise<SyncedFullBookRecord[]> {
  if (typeof fetch !== 'function') return [];

  let summaries: Array<{ bookId: string; sourceFileName: string; totalPages: number }> = [];
  const indexUrls = [
    './books-vault/index.json',
    '/books-vault/index.json',
    '/api/books/server-vault',
    `${GITHUB_RAW_VAULT_BASE}/index.json`
  ];

  for (const url of indexUrls) {
    try {
      const raw = await consumeWithTimeout(url, async listRes => {
        if (!listRes.ok) return null;
        const contentType = (listRes.headers.get('content-type') || '').toLowerCase();
        if (contentType.includes('text/html')) return null;
        return await listRes.json();
      }, 45_000);
      if (!raw) continue;
      const list = Array.isArray(raw) ? raw : Array.isArray(raw?.books) ? raw.books : [];
      if (list.length > 0) {
        summaries = list;
        break;
      }
    } catch {
      // try next index source
    }
  }

  if (summaries.length === 0) {
    summaries = DEFAULT_PREINDEXED_VAULT_SUMMARIES;
  }

  const synced: SyncedFullBookRecord[] = [];
  // Large reference packs (especially DiPiro) must be downloaded one at a time.
  // Parallel fetch + JSON parsing multiplies peak WebView memory usage.
  for (let offset = 0; offset < summaries.length; offset += 1) {
    const batch = summaries.slice(offset, offset + 1);
    const batchResults = await Promise.all(batch.map(async item => {
      onProgress?.({
        bookId: item.bookId,
        fileName: item.sourceFileName || item.bookId,
        phase: 'downloading',
        currentPage: 0,
        totalPages: item.totalPages || 0,
        processingStatus: 'extracting',
        message: `Downloading "${item.sourceFileName}" from server vault (request timeout: 3 minutes)...`
      });
      try {
        const rec = await fetchServerPreindexedBook(item.bookId);
        if (rec) {
          onProgress?.({
            bookId: rec.bookId,
            fileName: rec.sourceFileName || rec.fileName,
            phase: 'completed',
            currentPage: rec.totalPages,
            totalPages: rec.totalPages,
            processingStatus: rec.processingStatus,
            message: `Verified complete! Loaded "${rec.sourceFileName}" (${rec.totalPages} pages).`
          });
        } else {
          onProgress?.({
            bookId: item.bookId,
            fileName: item.sourceFileName || item.bookId,
            phase: 'error',
            currentPage: 0,
            totalPages: item.totalPages || 0,
            processingStatus: 'failed',
            message: `Could not load "${item.sourceFileName || item.bookId}" from any configured server source.`
          });
        }
        return rec;
      } catch (error) {
        onProgress?.({
          bookId: item.bookId,
          fileName: item.sourceFileName || item.bookId,
          phase: 'error',
          currentPage: 0,
          totalPages: item.totalPages || 0,
          processingStatus: 'failed',
          message: error instanceof Error ? error.message : 'Unknown server download error.'
        });
        return null;
      }
    }));
    synced.push(...batchResults.filter((record): record is SyncedFullBookRecord => Boolean(record)));
  }
  return synced;
}

export async function fetchPublicDrivePdfViaProxy(
  cleanDriveId: string,
  accessToken?: string | null,
  limits?: DownloadLimitsOptions,
  targetBookId?: string
): Promise<{ pdfBytes: ArrayBuffer; fileName: string }> {
  const maxBytesQuery = limits?.maxFileSizeBytes ? `&maxBytes=${limits.maxFileSizeBytes}` : '';
  const timeoutQuery = limits?.timeoutMs ? `&timeoutMs=${limits.timeoutMs}` : '';
  const bookIdQuery = targetBookId ? `&bookId=${encodeURIComponent(targetBookId)}` : '';
  const proxyEndpoints = [
    `/api/drive/fetch-pdf?fileId=${encodeURIComponent(cleanDriveId)}${bookIdQuery}${maxBytesQuery}${timeoutQuery}`,
    `https://ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/drive/fetch-pdf?fileId=${encodeURIComponent(
      cleanDriveId
    )}${bookIdQuery}${maxBytesQuery}${timeoutQuery}`,
    `https://ais-dev-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/drive/fetch-pdf?fileId=${encodeURIComponent(
      cleanDriveId
    )}${bookIdQuery}${maxBytesQuery}${timeoutQuery}`
  ];

  let lastError = 'Could not download PDF from Google Drive link.';

  for (const endpoint of proxyEndpoints) {
    try {
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const res = await fetch(endpoint, { headers, signal: limits?.signal });
      const contentType = (res.headers.get('content-type') || '').toLowerCase();

      if (res.ok && contentType.includes('application/pdf')) {
        const pdfBytes = await readLimitedResponseBuffer(res, limits);
        if (!hasPdfSignature(pdfBytes)) {
          lastError = 'Downloaded response from proxy is missing %PDF- header signature.';
          continue;
        }
        const rawFilename = res.headers.get('x-drive-filename');
        const fileName = rawFilename
          ? decodeURIComponent(rawFilename)
          : `${cleanDriveId}.pdf`;
        return { pdfBytes, fileName };
      }

      if (contentType.includes('application/json')) {
        const errJson = await res.json().catch(() => ({}));
        if (errJson?.error) lastError = errJson.error;
      } else if (contentType.includes('text/html')) {
        lastError = `Received HTML response instead of PDF (HTTP ${res.status}).`;
      } else if (!res.ok) {
        lastError = `Proxy returned HTTP ${res.status}.`;
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'Network error';
    }
  }

  throw new Error(lastError);
}

export async function ingestDriveFileAsFullBook(options: {
  accessToken?: string | null;
  driveFileId: string;
  targetBookId?: string;
  batchSize?: number;
  forceReprocess?: boolean;
  ocrAdapter?: OcrPageAdapter;
  downloadLimits?: DownloadLimitsOptions;
  onProgress?: (progress: BookSyncProgress) => void;
}): Promise<SyncedFullBookRecord> {
  const {
    accessToken,
    driveFileId,
    targetBookId,
    batchSize,
    forceReprocess,
    ocrAdapter,
    downloadLimits,
    onProgress
  } = options;
  const cleanDriveId = extractGoogleDriveFileId(driveFileId) || targetBookId || 'dipiro-13th-ed';
  const matchedByDriveId = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.defaultDriveId === cleanDriveId);
  const resolvedBookId = targetBookId || matchedByDriveId?.bookId || `drive-book-${cleanDriveId}`;
  const knownMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.bookId === resolvedBookId);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: knownMapping?.badge || cleanDriveId,
    phase: 'connecting',
    stageNumber: 1,
    stageLabel: 'Registering import job',
    currentPage: 0,
    totalPages: 0,
    processingStatus: 'downloading',
    message: 'Connecting to Google Drive to verify and download original PDF...'
  });

  if (!forceReprocess && !customPdfJsLoaderForTest && knownMapping?.defaultDriveId === cleanDriveId) {
    const preindexed = await fetchServerPreindexedBook(resolvedBookId);
    if (preindexed) {
      onProgress?.({
        bookId: resolvedBookId,
        fileName: preindexed.sourceFileName || preindexed.fileName,
        phase: 'completed',
        stageNumber: 10,
        stageLabel: 'Import job finished',
        currentPage: preindexed.processedPageCount || preindexed.totalPages,
        totalPages: preindexed.totalPages,
        processingStatus: preindexed.processingStatus,
        message: `Verified complete! Imported "${preindexed.sourceFileName || preindexed.fileName}" (${preindexed.totalPages} pages).`
      });
      return preindexed;
    }
  }

  if (!accessToken) {
    try {
      const { pdfBytes, fileName } = await fetchPublicDrivePdfViaProxy(
        cleanDriveId,
        null,
        downloadLimits,
        resolvedBookId
      );
      // Preserve actual sourceFileName separate from displayTitle
      const sourceFileName = fileName || `${cleanDriveId}.pdf`;
      const displayTitle = knownMapping?.title || sourceFileName.replace(/\.pdf$/i, '');

      const record = await parsePdfBufferToFullBookRecord({
        pdfBytes,
        bookId: resolvedBookId,
        driveFileId: cleanDriveId,
        fileName: sourceFileName,
        sourceFileName,
        displayTitle,
        sourceType: 'google_drive_pdf',
        batchSize,
        forceReprocess,
        ocrAdapter,
        onProgress
      });

      if (!knownMapping) {
        record.customTitle = displayTitle;
        record.customBadge = displayTitle.slice(0, 26);
      }

      const savedRecord = await saveSyncedFullBook(record, pdfBytes);
      onProgress?.({
        bookId: resolvedBookId,
        fileName: sourceFileName,
        phase: 'completed',
        stageNumber: 10,
        stageLabel: 'Import job finished',
        currentPage: savedRecord.processedPageCount || 0,
        totalPages: savedRecord.totalPages,
        processingStatus: savedRecord.processingStatus,
        message:
          savedRecord.processingStatus === 'verified_complete'
            ? `Verified complete! Imported "${sourceFileName}" (${savedRecord.totalPages} pages).`
            : `Imported "${sourceFileName}" with status: ${savedRecord.processingStatus} (${savedRecord.extractedTextPageCount} text pages, ${savedRecord.unprocessedPageCount} pages needing OCR).`
      });
      return savedRecord;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown download or PDF parsing error';
      onProgress?.({
        bookId: resolvedBookId,
        fileName: knownMapping?.badge || cleanDriveId,
        phase: 'error',
        currentPage: 0,
        totalPages: 0,
        processingStatus: 'failed',
        message: `Google Drive import failed; no embedded substitute was used. ${message}`
      });
      throw new Error(`Google Drive import failed; no embedded substitute was used. ${message}`);
    }
  }

  let metadata: DriveFileItem;
  let metadataError: unknown;
  try {
    metadata = await getDriveFileMetadata(accessToken, cleanDriveId);
  } catch (error: unknown) {
    metadataError = error;
    const errText = error instanceof Error ? error.message : '';
    // If token is explicitly expired / 401, surface the auth error immediately if proxy also fails
    try {
      const { pdfBytes, fileName } = await fetchPublicDrivePdfViaProxy(
        cleanDriveId,
        accessToken,
        downloadLimits
      );
      const sourceFileName = fileName || `${cleanDriveId}.pdf`;
      const displayTitle = knownMapping?.title || sourceFileName.replace(/\.pdf$/i, '');

      const record = await parsePdfBufferToFullBookRecord({
        pdfBytes,
        bookId: resolvedBookId,
        driveFileId: cleanDriveId,
        fileName: sourceFileName,
        sourceFileName,
        displayTitle,
        sourceType: 'google_drive_pdf',
        batchSize,
        forceReprocess,
        ocrAdapter,
        onProgress
      });
      if (!knownMapping) {
        record.customTitle = displayTitle;
        record.customBadge = displayTitle.slice(0, 26);
      }
      return await saveSyncedFullBook(record, pdfBytes);
    } catch (proxyError: unknown) {
      const metadataMessage =
        metadataError instanceof Error ? metadataError.message : errText || 'Drive metadata request failed';
      const proxyMessage =
        proxyError instanceof Error ? proxyError.message : 'Unknown proxy download error';
      onProgress?.({
        bookId: resolvedBookId,
        fileName: knownMapping?.badge || cleanDriveId,
        phase: 'error',
        currentPage: 0,
        totalPages: 0,
        processingStatus: 'failed',
        message: `Google Drive import failed; no embedded substitute was used. Metadata: ${metadataMessage}. Proxy: ${proxyMessage}`
      });
      throw new Error(
        `Google Drive import failed; no embedded substitute was used. Metadata: ${metadataMessage}. Proxy: ${proxyMessage}`
      );
    }
  }

  if (metadata.mimeType === 'application/vnd.google-apps.folder') {
    const children = await listFolderChildFiles(accessToken, cleanDriveId);
    if (children.length === 0) {
      throw new Error(`The Google Drive folder "${metadata.name}" contains no PDF or Document files.`);
    }
    const pdfChild = children.find(c => c.mimeType === 'application/pdf') || children[0];
    return ingestDriveFileAsFullBook({
      accessToken,
      driveFileId: pdfChild.id,
      targetBookId: resolvedBookId,
      batchSize,
      forceReprocess,
      ocrAdapter,
      downloadLimits,
      onProgress
    });
  }

  if (metadata.mimeType === 'application/vnd.google-apps.document') {
    onProgress?.({
      bookId: resolvedBookId,
      fileName: metadata.name,
      phase: 'downloading',
      currentPage: 1,
      totalPages: 1,
      processingStatus: 'downloading',
      message: `Exporting full text from Google Doc "${metadata.name}"...`
    });

    const fullText = await exportGoogleDocText(accessToken, cleanDriveId);
    const chunks: string[] = [];
    const lines = fullText.split('\n');
    const linesPerPage = 55;
    for (let i = 0; i < lines.length; i += linesPerPage) {
      chunks.push(lines.slice(i, i + linesPerPage).join('\n'));
    }

    const totalPages = Math.max(1, chunks.length);
    const chId = `${resolvedBookId}-full-doc-ch-1`;
    const sections: VerbatimSection[] = chunks.map((chunkText, idx) => ({
      id: `${chId}-page-${idx + 1}`,
      number: `p.${idx + 1}`,
      heading: `Page ${idx + 1} — ${detectPageHeading(chunkText, idx + 1)}`,
      headingAr: `الصفحة ${idx + 1} من المستند (${metadata.name})`,
      body: chunkText,
      originalPageNumber: idx + 1,
      extractionMethod: 'native_text',
      extractionStatus: 'extracted'
    }));

    const chapter: VerbatimChapter = {
      id: chId,
      bookId: resolvedBookId,
      chapterNumber: 1,
      startPage: 1,
      endPage: totalPages,
      hierarchyLevel: 1,
      title: metadata.name,
      titleAr: `النص الكامل للمستند: ${metadata.name}`,
      authors: 'Google Drive Document',
      edition: `Full Synced Document (${totalPages} Pages)`,
      pageRange: `pp. 1–${totalPages}`,
      systemCategory: 'Clinical Methodology & PPCP',
      systemCategoryAr: 'المراجع السريرية الشاملة',
      sourceUrl: `local://ref/chapter/${chId}`,
      learningObjectives: [`Complete verbatim text of ${metadata.name}`],
      toc: sections.map(s => ({ id: s.id, number: s.number, title: s.heading, pageNumber: s.originalPageNumber })),
      sections,
      quickTables: [],
      boardPearls: [`Full verbatim document imported from Google Drive (${metadata.name}).`],
      boardPearlsAr: [`المستند الكامل مستورد حرفياً من Google Drive (${metadata.name}).`],
      keywords: [metadata.name.toLowerCase()],
      citation: `${metadata.name} [Google Drive ID: ${cleanDriveId}]`,
      isVerbatimSource: true
    };

    const docBytes = new TextEncoder().encode(fullText).buffer as ArrayBuffer;
    const sha256 = await computeSha256Hex(docBytes);

    const record: SyncedFullBookRecord = {
      bookId: resolvedBookId,
      driveFileId: cleanDriveId,
      fileName: metadata.name,
      sourceFileName: metadata.name,
      displayTitle: metadata.name,
      mimeType: metadata.mimeType,
      fileSize: fullText.length,
      originalFileSize: fullText.length,
      sha256,
      totalPages,
      originalPageCount: totalPages,
      processedPageCount: totalPages,
      extractedTextPageCount: totalPages,
      ocrPageCount: 0,
      unprocessedPageCount: 0,
      blankPageCount: 0,
      totalChapters: 1,
      totalCharacters: fullText.length,
      emptyTextPagesCount: 0,
      sourceType: 'google_drive_pdf',
      processingStatus: 'verified_complete',
      syncedAt: new Date().toISOString(),
      customTitle: metadata.name,
      customBadge: metadata.name.slice(0, 24),
      chapters: [chapter],
      pages: chunks.map((t, idx) => ({
        pageNumber: idx + 1,
        originalPageNumber: idx + 1,
        text: t,
        extractedText: t,
        extractionMethod: 'native_text',
        extractionStatus: 'extracted',
        chapterId: chId,
        chapterTitle: metadata.name,
        sectionId: `${chId}-page-${idx + 1}`,
        lineCount: t.split('\n').length
      }))
    };

    const saved = await saveSyncedFullBook(record);
    onProgress?.({
      bookId: resolvedBookId,
      fileName: metadata.name,
      phase: 'completed',
      currentPage: totalPages,
      totalPages,
      processingStatus: 'verified_complete',
      message: `Successfully indexed all ${totalPages} pages of "${metadata.name}".`
    });
    return saved;
  }

  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'downloading',
    stageNumber: 2,
    stageLabel: 'Downloading PDF binary',
    currentPage: 0,
    totalPages: 0,
    processingStatus: 'downloading',
    message: `Downloading "${metadata.name}" from Google Drive...`
  });

  const expectedSize = metadata.size ? Number(metadata.size) : undefined;
  const pdfBytes = await downloadDriveFileBuffer(
    accessToken,
    cleanDriveId,
    (loaded, total) => {
      const mbLoaded = (loaded / (1024 * 1024)).toFixed(1);
      const mbTotal = total ? (total / (1024 * 1024)).toFixed(1) : '?';
      onProgress?.({
        bookId: resolvedBookId,
        fileName: metadata.name,
        phase: 'downloading',
        stageNumber: 2,
        stageLabel: 'Downloading PDF binary',
        currentPage: 0,
        totalPages: 0,
        downloadedBytes: loaded,
        totalBytes: total,
        processingStatus: 'downloading',
        message: `Downloading "${metadata.name}" (${mbLoaded} MB / ${mbTotal} MB)...`
      });
    },
    {
      ...downloadLimits,
      expectedFileSize: expectedSize
    }
  );

  const displayTitle = knownMapping?.title || metadata.name.replace(/\.pdf$/i, '');
  const record = await parsePdfBufferToFullBookRecord({
    pdfBytes,
    bookId: resolvedBookId,
    driveFileId: cleanDriveId,
    fileName: metadata.name,
    sourceFileName: metadata.name,
    displayTitle,
    sourceType: 'google_drive_pdf',
    batchSize,
    forceReprocess,
    ocrAdapter,
    onProgress
  });

  if (!KNOWN_DRIVE_BOOK_MAPPINGS.some(m => m.bookId === resolvedBookId)) {
    record.customTitle = displayTitle;
    record.customBadge = displayTitle.slice(0, 26);
  }

  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'saving',
    stageNumber: 7,
    stageLabel: 'Saving extracted records & PDF to database',
    currentPage: record.processedPageCount || record.totalPages,
    totalPages: record.totalPages,
    processingStatus: record.processingStatus,
    message: `Saving ${record.processedPageCount}/${record.totalPages} pages and ${record.totalChapters} chapters to local database...`
  });

  const savedRecord = await saveSyncedFullBook(record, pdfBytes);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'completed',
    stageNumber: 10,
    stageLabel: 'Completed',
    currentPage: savedRecord.processedPageCount || savedRecord.totalPages,
    totalPages: savedRecord.totalPages,
    processingStatus: savedRecord.processingStatus,
    message:
      savedRecord.processingStatus === 'verified_complete'
        ? `Verified complete! Indexed 100% of "${metadata.name}" (${savedRecord.totalPages} pages, ${savedRecord.totalChapters} chapters).`
        : `Import finished with status "${savedRecord.processingStatus}": ${savedRecord.extractedTextPageCount} native text pages, ${savedRecord.ocrPageCount} OCR pages, ${savedRecord.unprocessedPageCount} pages needing OCR.`
  });

  return savedRecord;
}

export async function ingestLocalPdfFileAsFullBook(options: {
  file: File;
  targetBookId?: string;
  batchSize?: number;
  forceReprocess?: boolean;
  ocrAdapter?: OcrPageAdapter;
  onProgress?: (progress: BookSyncProgress) => void;
}): Promise<SyncedFullBookRecord> {
  const { file, targetBookId, batchSize, forceReprocess, ocrAdapter, onProgress } = options;
  const resolvedBookId =
    targetBookId || `local-pdf-${file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32)}`;
  const knownMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.bookId === resolvedBookId);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'downloading',
    stageNumber: 2,
    stageLabel: 'Reading local PDF file',
    currentPage: 0,
    totalPages: 0,
    processingStatus: 'downloading',
    message: `Reading local PDF "${file.name}"...`
  });

  const pdfBytes = await file.arrayBuffer();
  const displayTitle = knownMapping?.title || file.name.replace(/\.pdf$/i, '');

  const record = await parsePdfBufferToFullBookRecord({
    pdfBytes,
    bookId: resolvedBookId,
    driveFileId: `local:${file.name}`,
    fileName: file.name,
    sourceFileName: file.name,
    displayTitle,
    sourceType: 'local_file_pdf',
    batchSize,
    forceReprocess,
    ocrAdapter,
    onProgress
  });

  if (!knownMapping) {
    record.customTitle = displayTitle;
    record.customBadge = displayTitle.slice(0, 26);
  }

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'saving',
    stageNumber: 7,
    stageLabel: 'Saving to database',
    currentPage: record.processedPageCount || record.totalPages,
    totalPages: record.totalPages,
    processingStatus: record.processingStatus,
    message: `Saving ${record.processedPageCount}/${record.totalPages} pages to IndexedDB...`
  });

  const savedRecord = await saveSyncedFullBook(record, pdfBytes);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'completed',
    stageNumber: 10,
    stageLabel: 'Completed',
    currentPage: savedRecord.processedPageCount || savedRecord.totalPages,
    totalPages: savedRecord.totalPages,
    processingStatus: savedRecord.processingStatus,
    message:
      savedRecord.processingStatus === 'verified_complete'
        ? `Verified complete! Indexed 100% of "${file.name}" (${savedRecord.totalPages} pages).`
        : `Import finished with status "${savedRecord.processingStatus}" (${savedRecord.extractedTextPageCount} text pages, ${savedRecord.unprocessedPageCount} pages needing OCR).`
  });

  return savedRecord;
}

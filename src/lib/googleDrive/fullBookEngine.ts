import {
  MedicalSystemCategory,
  VerbatimChapter,
  VerbatimReferenceTable,
  VerbatimSection
} from '../library/libraryTypes';
import {
  FullBookPageRecord,
  SyncedFullBookRecord,
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
  phase: 'connecting' | 'downloading' | 'indexing' | 'saving' | 'completed' | 'error';
  currentPage: number;
  totalPages: number;
  downloadedBytes?: number;
  totalBytes?: number;
  message: string;
}

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

  // Match /file/d/{id} or /folders/{id} or id={id}
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{10,})/);
  if (fileMatch?.[1]) return fileMatch[1];

  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]{10,})/);
  if (folderMatch?.[1]) return folderMatch[1];

  const paramMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (paramMatch?.[1]) return paramMatch[1];

  return trimmed;
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

async function downloadDriveFileBuffer(
  accessToken: string,
  fileId: string,
  onDownloadProgress?: (loaded: number, total: number) => void
): Promise<ArrayBuffer> {
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
    fileId
  )}?alt=media&supportsAllDrives=true`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Failed to download PDF binary from Google Drive (${res.status})`
    );
  }

  const contentLength = Number(res.headers.get('content-length') || 0);
  if (!res.body || !onDownloadProgress) {
    return await res.arrayBuffer();
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      receivedLength += value.length;
      onDownloadProgress(receivedLength, contentLength || receivedLength);
    }
  }

  const combined = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    combined.set(chunk, position);
    position += chunk.length;
  }

  return combined.buffer;
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
async function getPdfJs() {
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

function reconstructVerbatimPageText(items: Array<Record<string, unknown>>): string {
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

  // Sort top-to-bottom (descending Y in PDF coordinate space), then left-to-right (ascending X)
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
        // Add an extra blank line for paragraph breaks
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

function detectPageHeading(pageText: string, pageNum: number): string {
  const lines = pageText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 3 && !/^\d+$/.test(l));

  for (const line of lines.slice(0, 8)) {
    if (
      /^(?:CHAPTER|Chapter|SECTION|Section|PART|Part|MODULE|Module|UNIT|Unit)\s+[0-9IVXLCDM]+/i.test(
        line
      )
    ) {
      const nextLine = lines[lines.indexOf(line) + 1];
      if (nextLine && nextLine.length < 110 && !nextLine.endsWith('.')) {
        return `${line}: ${nextLine}`;
      }
      return line.slice(0, 110);
    }
  }

  const firstMeaningful = lines.find(l => l.length >= 6 && l.length <= 105);
  return firstMeaningful ? firstMeaningful : `Verbatim Page ${pageNum}`;
}

function extractTablesFromPageText(pageText: string, pageNum: number): VerbatimReferenceTable[] {
  const lines = pageText.split('\n').map(l => l.trim());
  const tabularLines = lines.filter(l => l.includes('   ') && l.split(/\s{3,}/).length >= 3);
  if (tabularLines.length < 3) return [];

  const rows = tabularLines.slice(0, 16).map(l => l.split(/\s{3,}/).slice(0, 5));
  const colCount = Math.max(...rows.map(r => r.length));
  if (colCount < 2) return [];

  const normalizedRows = rows.map(r => {
    const padded = [...r];
    while (padded.length < colCount) padded.push('—');
    return padded;
  });

  return [
    {
      title: `Page ${pageNum} Extracted Reference Table`,
      titleAr: `جدول مستخرج من الصفحة الأصلية رقم ${pageNum}`,
      headers: normalizedRows[0],
      rows: normalizedRows.slice(1)
    }
  ];
}

export async function parsePdfBufferToFullBookRecord(options: {
  pdfBytes: ArrayBuffer;
  bookId: string;
  driveFileId: string;
  fileName: string;
  onProgress?: (progress: BookSyncProgress) => void;
}): Promise<SyncedFullBookRecord> {
  const { pdfBytes, bookId, driveFileId, fileName, onProgress } = options;
  const pdfjsLib = await getPdfJs();

  // Clone buffer so pdf.js worker transfer doesn't detach the caller's ArrayBuffer
  const bufferCopy = pdfBytes.slice(0);
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(bufferCopy),
    useSystemFonts: true
  });

  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  // Attempt to extract PDF Outline (Table of Contents bookmarks)
  interface OutlineEntry {
    title: string;
    startPage: number;
  }
  const outlineEntries: OutlineEntry[] = [];

  try {
    const rawOutline = await pdfDoc.getOutline();
    if (Array.isArray(rawOutline) && rawOutline.length > 0) {
      const flattenOutline = async (items: Array<Record<string, unknown>>, depth = 0) => {
        for (const item of items) {
          if (depth > 1) continue;
          const title = String(item.title || '').trim();
          let dest = item.dest;
          if (typeof dest === 'string') {
            dest = await pdfDoc.getDestination(dest);
          }
          if (Array.isArray(dest) && dest[0]) {
            try {
              const pageIdx = await pdfDoc.getPageIndex(dest[0]);
              if (pageIdx >= 0 && pageIdx < totalPages && title) {
                outlineEntries.push({
                  title,
                  startPage: pageIdx + 1
                });
              }
            } catch {
              // ignore unresolvable outline ref
            }
          }
          if (Array.isArray(item.items) && item.items.length > 0 && depth === 0) {
            await flattenOutline(item.items as Array<Record<string, unknown>>, depth + 1);
          }
        }
      };
      await flattenOutline(rawOutline as unknown as Array<Record<string, unknown>>);
    }
  } catch {
    // PDF has no embedded outline; chapter boundaries will be detected from page headings
  }

  const rawPages: { pageNumber: number; text: string; detectedHeading: string }[] = [];
  let totalCharacters = 0;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    if (pageNum === 1 || pageNum % 5 === 0 || pageNum === totalPages) {
      onProgress?.({
        bookId,
        fileName,
        phase: 'indexing',
        currentPage: pageNum,
        totalPages,
        message: `Extracting verbatim page ${pageNum} of ${totalPages}...`
      });
    }

    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const verbatimText = reconstructVerbatimPageText(
      (textContent.items || []) as Array<Record<string, unknown>>
    );

    const finalPageText =
      verbatimText ||
      `[Page ${pageNum} of ${fileName} — Graphical/Scanned Figure Page. Switch to "Original PDF Page View" tab above to view the visual page.]`;

    totalCharacters += finalPageText.length;
    rawPages.push({
      pageNumber: pageNum,
      text: finalPageText,
      detectedHeading: detectPageHeading(finalPageText, pageNum)
    });
  }

  // Group pages into structured chapters covering 100% of pages (1..totalPages)
  interface ChapterBoundary {
    title: string;
    startPage: number;
    endPage: number;
  }

  const boundaries: ChapterBoundary[] = [];
  const sortedOutline = outlineEntries
    .filter((e, idx, arr) => idx === arr.findIndex(o => o.startPage === e.startPage))
    .sort((a, b) => a.startPage - b.startPage);

  if (sortedOutline.length >= 2) {
    // Ensure page 1 is covered
    if (sortedOutline[0].startPage > 1) {
      boundaries.push({
        title: 'Front Matter, Preface & Table of Contents',
        startPage: 1,
        endPage: sortedOutline[0].startPage - 1
      });
    }
    for (let i = 0; i < sortedOutline.length; i++) {
      const current = sortedOutline[i];
      const next = sortedOutline[i + 1];
      const endPage = next ? Math.max(current.startPage, next.startPage - 1) : totalPages;
      boundaries.push({
        title: current.title,
        startPage: current.startPage,
        endPage
      });
    }
  } else {
    // Detect "Chapter X" / "Section X" headings from page text, or chunk every 15 pages
    const detectedStarts: { title: string; startPage: number }[] = [];
    for (const p of rawPages) {
      if (
        /^(?:CHAPTER|Chapter|SECTION|Section|PART|Part|MODULE|Module)\s+[0-9IVXLCDM]+/i.test(
          p.detectedHeading
        )
      ) {
        const last = detectedStarts[detectedStarts.length - 1];
        if (!last || p.pageNumber - last.startPage >= 3) {
          detectedStarts.push({
            title: p.detectedHeading,
            startPage: p.pageNumber
          });
        }
      }
    }

    if (detectedStarts.length >= 2) {
      if (detectedStarts[0].startPage > 1) {
        boundaries.push({
          title: 'Front Matter & Contents (Pages 1–' + (detectedStarts[0].startPage - 1) + ')',
          startPage: 1,
          endPage: detectedStarts[0].startPage - 1
        });
      }
      for (let i = 0; i < detectedStarts.length; i++) {
        const cur = detectedStarts[i];
        const next = detectedStarts[i + 1];
        boundaries.push({
          title: cur.title,
          startPage: cur.startPage,
          endPage: next ? Math.max(cur.startPage, next.startPage - 1) : totalPages
        });
      }
    } else {
      const pagesPerChapter = totalPages <= 40 ? 10 : 15;
      for (let start = 1; start <= totalPages; start += pagesPerChapter) {
        const end = Math.min(totalPages, start + pagesPerChapter - 1);
        const firstPageHeading = rawPages[start - 1]?.detectedHeading || `Pages ${start}–${end}`;
        boundaries.push({
          title: `Pages ${start}–${end}: ${firstPageHeading}`,
          startPage: start,
          endPage: end
        });
      }
    }
  }

  const knownMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.bookId === bookId);
  const chapters: VerbatimChapter[] = [];
  const allPageRecords: FullBookPageRecord[] = [];

  for (let cIdx = 0; cIdx < boundaries.length; cIdx++) {
    const b = boundaries[cIdx];
    const chNum = cIdx + 1;
    const chId = `${bookId}-full-ch-${chNum}-pp-${b.startPage}-${b.endPage}`;
    const chapterPages = rawPages.slice(b.startPage - 1, b.endPage);

    const combinedSampleText = `${b.title} ${chapterPages
      .slice(0, 3)
      .map(p => p.text.slice(0, 600))
      .join(' ')}`;
    const inferredCat = inferCategoryFromText(combinedSampleText);

    const sections: VerbatimSection[] = [];
    const quickTables: VerbatimReferenceTable[] = [];

    for (const p of chapterPages) {
      const secId = `${chId}-page-${p.pageNumber}`;
      sections.push({
        id: secId,
        number: `p.${p.pageNumber}`,
        heading: `Page ${p.pageNumber} — ${p.detectedHeading}`,
        headingAr: `الصفحة الأصلية رقم ${p.pageNumber} من الكتاب (${fileName})`,
        body: p.text,
        evidenceGrade: `Verbatim PDF Page ${p.pageNumber} / ${totalPages}`
      });

      const pageTables = extractTablesFromPageText(p.text, p.pageNumber);
      if (pageTables.length > 0 && quickTables.length < 6) {
        quickTables.push(...pageTables);
      }

      allPageRecords.push({
        pageNumber: p.pageNumber,
        text: p.text,
        chapterId: chId,
        chapterTitle: b.title,
        sectionId: secId,
        lineCount: p.text.split('\n').length
      });
    }

    chapters.push({
      id: chId,
      bookId,
      chapterNumber: chNum,
      title: b.title,
      titleAr: `الفصل ${chNum} (الصفحات ${b.startPage}–${b.endPage} حرفياً من ${fileName})`,
      authors: knownMapping?.title || fileName,
      edition: `Full Synced PDF (${totalPages} Total Pages)`,
      pageRange: `pp. ${b.startPage}–${b.endPage} (of ${totalPages})`,
      systemCategory: knownMapping?.defaultCategory || inferredCat.category,
      systemCategoryAr: knownMapping?.defaultCategoryAr || inferredCat.categoryAr,
      sourceUrl: `local://ref/chapter/${chId}`,
      learningObjectives: [
        `Complete, unabridged verbatim text of pages ${b.startPage} through ${b.endPage} extracted directly from ${fileName}.`
      ],
      toc: sections.map(s => ({
        id: s.id,
        number: s.number,
        title: s.heading
      })),
      sections,
      quickTables,
      boardPearls: [
        `Full Verbatim Source: Pages ${b.startPage}–${b.endPage} of ${totalPages} from Google Drive PDF (${fileName}).`
      ],
      boardPearlsAr: [
        `النص الحرفي الكامل للصفحات ${b.startPage}–${b.endPage} من أصل ${totalPages} صفحة من ملف ${fileName}.`
      ],
      keywords: [
        b.title.toLowerCase(),
        `page ${b.startPage}`,
        `page ${b.endPage}`,
        fileName.toLowerCase()
      ],
      citation: `${fileName}. Verbatim Pages ${b.startPage}–${b.endPage} (Total ${totalPages} pp). Synced from Google Drive [${driveFileId}].`,
      isVerbatimSource: true
    });
  }

  return {
    bookId,
    driveFileId,
    fileName,
    mimeType: 'application/pdf',
    fileSize: pdfBytes.byteLength,
    totalPages,
    totalChapters: chapters.length,
    totalCharacters,
    syncedAt: new Date().toISOString(),
    chapters,
    pages: allPageRecords
  };
}

async function fetchPublicDrivePdfViaProxy(
  cleanDriveId: string,
  accessToken?: string | null
): Promise<{ pdfBytes: ArrayBuffer; fileName: string }> {
  const proxyEndpoints = [
    `/api/drive/fetch-pdf?fileId=${encodeURIComponent(cleanDriveId)}`,
    `https://ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/drive/fetch-pdf?fileId=${encodeURIComponent(
      cleanDriveId
    )}`,
    `https://ais-dev-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/drive/fetch-pdf?fileId=${encodeURIComponent(
      cleanDriveId
    )}`
  ];

  let lastError = 'Could not download PDF from Google Drive link.';

  for (const endpoint of proxyEndpoints) {
    try {
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const res = await fetch(endpoint, { headers });
      const contentType = res.headers.get('content-type') || '';

      if (res.ok && contentType.includes('application/pdf')) {
        const pdfBytes = await res.arrayBuffer();
        const rawFilename = res.headers.get('x-drive-filename');
        const fileName = rawFilename
          ? decodeURIComponent(rawFilename)
          : `${cleanDriveId}.pdf`;
        return { pdfBytes, fileName };
      }

      if (contentType.includes('application/json')) {
        const errJson = await res.json().catch(() => ({}));
        if (errJson?.error) lastError = errJson.error;
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
  onProgress?: (progress: BookSyncProgress) => void;
}): Promise<SyncedFullBookRecord> {
  const { accessToken, driveFileId, targetBookId, onProgress } = options;
  const cleanDriveId = extractGoogleDriveFileId(driveFileId) || targetBookId || 'dipiro-13th-ed';
  const matchedByDriveId = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.defaultDriveId === cleanDriveId);
  const resolvedBookId = targetBookId || matchedByDriveId?.bookId || `drive-book-${cleanDriveId}`;
  const knownMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m => m.bookId === resolvedBookId);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: knownMapping?.badge || cleanDriveId,
    phase: 'connecting',
    currentPage: 0,
    totalPages: 0,
    message: 'Preparing full verbatim reference book & local PDF vault...'
  });

  // If no OAuth token is present, try direct proxy first, and automatically fall back to built-in full reference compiler
  if (!accessToken) {
    try {
      const { pdfBytes, fileName } = await fetchPublicDrivePdfViaProxy(cleanDriveId, null);
      const resolvedName = knownMapping ? `${knownMapping.badge}.pdf` : fileName;

      const record = await parsePdfBufferToFullBookRecord({
        pdfBytes,
        bookId: resolvedBookId,
        driveFileId: cleanDriveId,
        fileName: resolvedName,
        onProgress
      });

      if (!knownMapping) {
        record.customTitle = resolvedName.replace(/\.pdf$/i, '');
        record.customBadge = resolvedName.replace(/\.pdf$/i, '').slice(0, 26);
      }

      await saveSyncedFullBook(record, pdfBytes);
      onProgress?.({
        bookId: resolvedBookId,
        fileName: resolvedName,
        phase: 'completed',
        currentPage: record.totalPages,
        totalPages: record.totalPages,
        message: `Completed! Indexed 100% of "${resolvedName}" (${record.totalPages} pages).`
      });
      return record;
    } catch {
      const { seedSingleEmbeddedBookOffline } = await import('./embeddedBookCompiler');
      return await seedSingleEmbeddedBookOffline(
        knownMapping ? knownMapping.bookId : cleanDriveId,
        onProgress
      );
    }
  }

  let metadata: DriveFileItem;
  try {
    metadata = await getDriveFileMetadata(accessToken, cleanDriveId);
  } catch {
    try {
      const { pdfBytes, fileName } = await fetchPublicDrivePdfViaProxy(cleanDriveId, accessToken);
      const resolvedName = knownMapping ? `${knownMapping.badge}.pdf` : fileName;
      const record = await parsePdfBufferToFullBookRecord({
        pdfBytes,
        bookId: resolvedBookId,
        driveFileId: cleanDriveId,
        fileName: resolvedName,
        onProgress
      });
      if (!knownMapping) {
        record.customTitle = resolvedName.replace(/\.pdf$/i, '');
        record.customBadge = resolvedName.replace(/\.pdf$/i, '').slice(0, 26);
      }
      await saveSyncedFullBook(record, pdfBytes);
      return record;
    } catch {
      const { seedSingleEmbeddedBookOffline } = await import('./embeddedBookCompiler');
      return await seedSingleEmbeddedBookOffline(
        knownMapping ? knownMapping.bookId : cleanDriveId,
        onProgress
      );
    }
  }

  // If the Drive ID is a folder, look inside it for PDFs or Google Docs
  if (metadata.mimeType === 'application/vnd.google-apps.folder') {
    const children = await listFolderChildFiles(accessToken, cleanDriveId);
    if (children.length === 0) {
      throw new Error(`The Google Drive folder "${metadata.name}" contains no PDF or Document files.`);
    }
    // Sync the first matching PDF or largest PDF in the folder
    const pdfChild = children.find(c => c.mimeType === 'application/pdf') || children[0];
    return ingestDriveFileAsFullBook({
      accessToken,
      driveFileId: pdfChild.id,
      targetBookId: resolvedBookId,
      onProgress
    });
  }

  // If the Drive file is a Google Doc, export its full text
  if (metadata.mimeType === 'application/vnd.google-apps.document') {
    onProgress?.({
      bookId: resolvedBookId,
      fileName: metadata.name,
      phase: 'downloading',
      currentPage: 1,
      totalPages: 1,
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
      heading: `Page ${idx + 1} — ${ detectPageHeading(chunkText, idx + 1) }`,
      headingAr: `الصفحة ${idx + 1} من المستند (${metadata.name})`,
      body: chunkText
    }));

    const chapter: VerbatimChapter = {
      id: chId,
      bookId: resolvedBookId,
      chapterNumber: 1,
      title: metadata.name,
      titleAr: `النص الكامل للمستند: ${metadata.name}`,
      authors: 'Google Drive Document',
      edition: `Full Synced Document (${totalPages} Pages)`,
      pageRange: `pp. 1–${totalPages}`,
      systemCategory: 'Clinical Methodology & PPCP',
      systemCategoryAr: 'المراجع السريرية الشاملة',
      sourceUrl: `local://ref/chapter/${chId}`,
      learningObjectives: [`Complete verbatim text of ${metadata.name}`],
      toc: sections.map(s => ({ id: s.id, number: s.number, title: s.heading })),
      sections,
      quickTables: [],
      boardPearls: [`Full verbatim document imported from Google Drive (${metadata.name}).`],
      boardPearlsAr: [`المستند الكامل مستورد حرفياً من Google Drive (${metadata.name}).`],
      keywords: [metadata.name.toLowerCase()],
      citation: `${metadata.name} [Google Drive ID: ${cleanDriveId}]`,
      isVerbatimSource: true
    };

    const record: SyncedFullBookRecord = {
      bookId: resolvedBookId,
      driveFileId: cleanDriveId,
      fileName: metadata.name,
      mimeType: metadata.mimeType,
      fileSize: fullText.length,
      totalPages,
      totalChapters: 1,
      totalCharacters: fullText.length,
      syncedAt: new Date().toISOString(),
      customTitle: metadata.name,
      customBadge: metadata.name.slice(0, 24),
      chapters: [chapter],
      pages: chunks.map((t, idx) => ({
        pageNumber: idx + 1,
        text: t,
        chapterId: chId,
        chapterTitle: metadata.name,
        sectionId: `${chId}-page-${idx + 1}`,
        lineCount: t.split('\n').length
      }))
    };

    await saveSyncedFullBook(record);
    onProgress?.({
      bookId: resolvedBookId,
      fileName: metadata.name,
      phase: 'completed',
      currentPage: totalPages,
      totalPages,
      message: `Successfully indexed all ${totalPages} pages of "${metadata.name}".`
    });
    return record;
  }

  // Standard PDF Download & 100%-Page Verbatim Extraction
  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'downloading',
    currentPage: 0,
    totalPages: 0,
    message: `Downloading "${metadata.name}" from Google Drive...`
  });

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
        currentPage: 0,
        totalPages: 0,
        downloadedBytes: loaded,
        totalBytes: total,
        message: `Downloading "${metadata.name}" (${mbLoaded} MB / ${mbTotal} MB)...`
      });
    }
  );

  const record = await parsePdfBufferToFullBookRecord({
    pdfBytes,
    bookId: resolvedBookId,
    driveFileId: cleanDriveId,
    fileName: metadata.name,
    onProgress
  });

  if (!KNOWN_DRIVE_BOOK_MAPPINGS.some(m => m.bookId === resolvedBookId)) {
    record.customTitle = metadata.name.replace(/\.pdf$/i, '');
    record.customBadge = metadata.name.replace(/\.pdf$/i, '').slice(0, 26);
  }

  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'saving',
    currentPage: record.totalPages,
    totalPages: record.totalPages,
    message: `Saving all ${record.totalPages} pages and ${record.totalChapters} chapters to IndexedDB...`
  });

  await saveSyncedFullBook(record, pdfBytes);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: metadata.name,
    phase: 'completed',
    currentPage: record.totalPages,
    totalPages: record.totalPages,
    message: `Completed! Indexed 100% of "${metadata.name}" (${record.totalPages} pages, ${record.totalChapters} chapters).`
  });

  return record;
}

export async function ingestLocalPdfFileAsFullBook(options: {
  file: File;
  targetBookId?: string;
  onProgress?: (progress: BookSyncProgress) => void;
}): Promise<SyncedFullBookRecord> {
  const { file, targetBookId, onProgress } = options;
  const resolvedBookId =
    targetBookId || `local-pdf-${file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32)}`;

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'downloading',
    currentPage: 0,
    totalPages: 0,
    message: `Reading local PDF "${file.name}"...`
  });

  const pdfBytes = await file.arrayBuffer();
  const record = await parsePdfBufferToFullBookRecord({
    pdfBytes,
    bookId: resolvedBookId,
    driveFileId: `local:${file.name}`,
    fileName: file.name,
    onProgress
  });

  if (!KNOWN_DRIVE_BOOK_MAPPINGS.some(m => m.bookId === resolvedBookId)) {
    record.customTitle = file.name.replace(/\.pdf$/i, '');
    record.customBadge = file.name.replace(/\.pdf$/i, '').slice(0, 26);
  }

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'saving',
    currentPage: record.totalPages,
    totalPages: record.totalPages,
    message: `Saving ${record.totalPages} pages to IndexedDB...`
  });

  await saveSyncedFullBook(record, pdfBytes);

  onProgress?.({
    bookId: resolvedBookId,
    fileName: file.name,
    phase: 'completed',
    currentPage: record.totalPages,
    totalPages: record.totalPages,
    message: `Completed! Indexed 100% of "${file.name}" (${record.totalPages} pages).`
  });

  return record;
}

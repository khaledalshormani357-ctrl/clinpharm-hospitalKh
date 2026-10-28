import {
  ClinicalCitation,
  ClinicalKnowledgeRecord,
  KnowledgeDomain,
  createKnowledgeRecordId,
  normalizeClinicalText
} from './knowledgeSchema';

export interface ExtractedBookPage {
  pageNumber: number;
  text: string;
  chapterId?: string;
  chapterTitle?: string;
  sectionTitle?: string;
  printedPage?: string;
}

export interface ExtractedBookSource {
  sourceId: string;
  sourceTitle: string;
  edition?: string;
  sourceVersion?: string;
  sourceSha256?: string;
  pages: ExtractedBookPage[];
}

export interface ConvertPagesOptions {
  maxChunkChars?: number;
  overlapChars?: number;
  now?: string;
}

const DOMAIN_RULES: Array<{ domain: KnowledgeDomain; terms: string[] }> = [
  { domain: 'cardiology', terms: ['heart failure', 'myocardial', 'cardiac', 'arrhythmia', 'cardiology', 'القلب', 'قصور القلب'] },
  { domain: 'infectious-disease', terms: ['antibiotic', 'antimicrobial', 'infection', 'sepsis', 'pneumonia', 'المضادات الحيوية', 'الإنتان'] },
  { domain: 'critical-care', terms: ['critical care', 'intensive care', 'vasopressor', 'mechanical ventilation', 'العناية المركزة'] },
  { domain: 'nephrology', terms: ['renal', 'kidney', 'nephrology', 'creatinine', 'dialysis', 'الكلى', 'كلوي'] },
  { domain: 'endocrinology', terms: ['diabetes', 'diabetic ketoacidosis', 'insulin', 'thyroid', 'السكري', 'الأنسولين'] },
  { domain: 'gastroenterology', terms: ['gastroenterology', 'hepatitis', 'cirrhosis', 'liver disease', 'الكبد', 'التهاب الكبد'] },
  { domain: 'neurology', terms: ['neurology', 'seizure', 'stroke', 'epilepsy', 'السكتة', 'الصرع'] },
  { domain: 'drug-safety', terms: ['drug interaction', 'contraindication', 'adverse effect', 'toxicity', 'تداخل دوائي', 'موانع الاستعمال'] },
  { domain: 'pharmacology', terms: ['pharmacokinetic', 'pharmacodynamic', 'dose adjustment', 'drug dosing', 'جرعة', 'الجرعات'] },
  { domain: 'diagnostics', terms: ['diagnostic criteria', 'differential diagnosis', 'laboratory', 'diagnosis', 'التشخيص', 'التشخيص التفريقي'] }
];

export function inferKnowledgeDomain(text: string): KnowledgeDomain {
  const normalized = text.toLocaleLowerCase();
  for (const rule of DOMAIN_RULES) {
    if (rule.terms.some(term => normalized.includes(term))) return rule.domain;
  }
  return 'other';
}

function makeChunks(text: string, maxChars: number, overlap: number): string[] {
  if (!text.trim()) return [];
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + maxChars, text.length);
    if (end < text.length) {
      const preferredBreak = Math.max(
        text.lastIndexOf('\n', end),
        text.lastIndexOf('. ', end),
        text.lastIndexOf('; ', end)
      );
      if (preferredBreak > start + Math.floor(maxChars * 0.55)) end = preferredBreak + 1;
    }
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    const nextStart = Math.max(start + 1, end - overlap);
    start = nextStart;
  }
  return chunks;
}

/**
 * Converts PDF-extracted pages into traceable retrieval chunks.
 * This does NOT claim to extract or validate structured doses or treatment recommendations.
 */
export function convertExtractedPagesToKnowledge(
  source: ExtractedBookSource,
  options: ConvertPagesOptions = {}
): ClinicalKnowledgeRecord[] {
  const maxChars = Math.max(500, Math.min(options.maxChunkChars ?? 1800, 4000));
  const overlap = Math.max(0, Math.min(options.overlapChars ?? 180, Math.floor(maxChars / 4)));
  const now = options.now ?? new Date().toISOString();
  const records: ClinicalKnowledgeRecord[] = [];

  for (const page of source.pages) {
    if (!Number.isInteger(page.pageNumber) || page.pageNumber < 1) continue;
    const normalized = normalizeClinicalText(page.text);
    if (!normalized) continue;
    const chunks = makeChunks(normalized, maxChars, overlap);

    chunks.forEach((chunk, chunkIndex) => {
      const citation: ClinicalCitation = {
        sourceId: source.sourceId,
        sourceTitle: source.sourceTitle,
        edition: source.edition,
        chapterId: page.chapterId,
        chapterTitle: page.chapterTitle,
        printedPage: page.printedPage,
        pdfPage: page.pageNumber,
        sectionTitle: page.sectionTitle,
        sourceVersion: source.sourceVersion,
        sourceSha256: source.sourceSha256
      };
      records.push({
        id: createKnowledgeRecordId(source.sourceId, page.pageNumber, chunkIndex),
        kind: 'source_chunk',
        domain: inferKnowledgeDomain([page.chapterTitle, page.sectionTitle, chunk].filter(Boolean).join(' ')),
        title: page.sectionTitle || page.chapterTitle || `${source.sourceTitle} — PDF page ${page.pageNumber}`,
        titleAr: undefined,
        text: chunk,
        normalizedText: normalizeClinicalText(chunk).toLocaleLowerCase(),
        keywords: [],
        citation,
        reviewStatus: 'needs_review',
        createdAt: now,
        updatedAt: now
      });
    });
  }
  return records;
}

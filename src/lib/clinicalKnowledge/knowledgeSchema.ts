/**
 * Structured, source-traceable clinical knowledge records.
 *
 * Important: extracted text is not automatically a verified clinical recommendation.
 * All imported material remains "needs_review" until a qualified reviewer validates it.
 */
export type KnowledgeDomain =
  | 'cardiology'
  | 'critical-care'
  | 'infectious-disease'
  | 'nephrology'
  | 'endocrinology'
  | 'gastroenterology'
  | 'neurology'
  | 'pharmacology'
  | 'drug-safety'
  | 'diagnostics'
  | 'other';

export type ClinicalRecordKind =
  | 'source_chunk'
  | 'disease'
  | 'diagnostic_criterion'
  | 'differential_diagnosis'
  | 'treatment_recommendation'
  | 'drug_dose'
  | 'drug_interaction'
  | 'contraindication'
  | 'monitoring_parameter'
  | 'clinical_algorithm';

export type ReviewStatus = 'needs_review' | 'reviewed' | 'rejected';

export interface ClinicalCitation {
  sourceId: string;
  sourceTitle: string;
  edition?: string;
  chapterId?: string;
  chapterTitle?: string;
  printedPage?: string;
  pdfPage: number;
  sectionTitle?: string;
  sourceVersion?: string;
  sourceSha256?: string;
}

export interface ClinicalKnowledgeRecord {
  id: string;
  kind: ClinicalRecordKind;
  domain: KnowledgeDomain;
  title: string;
  titleAr?: string;
  text: string;
  normalizedText: string;
  keywords: string[];
  citation: ClinicalCitation;
  reviewStatus: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeLibraryManifest {
  schemaVersion: 1;
  libraryId: string;
  libraryVersion: string;
  createdAt: string;
  languageCoverage: string[];
  recordCount: number;
  sourceCount: number;
  compressedBytes: number;
  uncompressedBytes: number;
  sha256: string;
  minimumAppVersion?: string;
}

export const CLINICAL_LIBRARY_MAX_BYTES = 950 * 1024 * 1024;

export function normalizeClinicalText(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/[\u00ad\u200b-\u200f\ufeff]/g, '')
    .replace(/[\t\r ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function estimateUtf8Bytes(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

export function createKnowledgeRecordId(
  sourceId: string,
  pdfPage: number,
  chunkIndex: number
): string {
  return [sourceId, pdfPage, chunkIndex]
    .map(part => String(part).normalize('NFKC').replace(/[^a-zA-Z0-9_-]/g, '_'))
    .join(':');
}

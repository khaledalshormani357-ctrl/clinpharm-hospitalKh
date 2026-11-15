import type { KnowledgeCitation, KnowledgeSource } from '../../types/knowledgeGraph';
import type { BookProcessingStatus, BookSourceType } from '../library/libraryTypes';
import { getVerbatimBookSourceMetadataById } from '../library';
import { getKnowledgeSourceById } from './prototypeRepository';

export type ContentProvenanceState =
  | 'verbatim'
  | 'summarized'
  | 'pharmacist-reviewed'
  | 'guideline-recommendation'
  | 'pending-review'
  | 'source-metadata-unavailable';

export type SourceLayer =
  | 'extracted_original_book'
  | 'embedded_summary'
  | 'knowledge_graph_record'
  | 'unverified_legacy'
  | 'source_metadata_unavailable';

export interface SourceMetadataFields {
  sourceType?: BookSourceType;
  processingStatus?: BookProcessingStatus;
  sha256?: string;
}

export interface DerivedSourceProvenance {
  layer: SourceLayer;
  state: ContentProvenanceState;
}

export interface CitationSourceDetails extends DerivedSourceProvenance {
  sourceId: string;
  bookId?: string;
  source?: KnowledgeSource;
  bookTitle?: string;
  sourceType?: BookSourceType;
  processingStatus?: BookProcessingStatus;
  hasSha256: boolean;
  originalPageCount?: number;
  extractedTextPageCount?: number;
  unprocessedPageCount?: number;
}

/** Provenance is a direct mapping of the source record's explicit fields. */
export function deriveSourceProvenance(fields: SourceMetadataFields): DerivedSourceProvenance {
  if (fields.sourceType === 'google_drive_pdf' || fields.sourceType === 'local_file_pdf') {
    // processingStatus describes page processing, not byte-integrity or clinical review.
    // The stored SHA value cannot be rechecked here because this synchronous accessor
    // intentionally does not load the PDF binary from IndexedDB.
    return { layer: 'extracted_original_book', state: 'pending-review' };
  }
  if (fields.sourceType === 'embedded_synthetic' || fields.processingStatus === 'embedded_summary') {
    return { layer: 'embedded_summary', state: 'summarized' };
  }
  if (fields.sourceType === 'unverified_legacy') {
    return { layer: 'unverified_legacy', state: 'pending-review' };
  }
  return { layer: 'source_metadata_unavailable', state: 'source-metadata-unavailable' };
}

/** The topic/statement itself is always labeled as a record in the graph repository. */
export function knowledgeGraphRecordProvenance(): DerivedSourceProvenance {
  return { layer: 'knowledge_graph_record', state: 'source-metadata-unavailable' };
}

/** Reads only one book's provenance metadata; it never enumerates or decodes all packs. */
export function getCitationSourceDetails(citation: KnowledgeCitation): CitationSourceDetails {
  return getSourceProvenanceForSourceId(citation.sourceId);
}

export function getSourceProvenanceForSourceId(sourceId: string): CitationSourceDetails {
  const source = getKnowledgeSourceById(sourceId);
  const bookId = source?.verbatimBookId || sourceId;
  const book = getVerbatimBookSourceMetadataById(bookId);
  const derived = deriveSourceProvenance(book || {});

  return {
    ...derived,
    sourceId,
    bookId: book?.bookId,
    source,
    bookTitle: book?.title || source?.titleEn,
    sourceType: book?.sourceType,
    processingStatus: book?.processingStatus,
    hasSha256: Boolean(book?.sha256),
    originalPageCount: book?.originalPageCount,
    extractedTextPageCount: book?.extractedTextPageCount,
    unprocessedPageCount: book?.unprocessedPageCount
  };
}

export function sourceLayerLabel(layer: SourceLayer, lang: 'ar' | 'en'): string {
  const labels = {
    extracted_original_book: {
      ar: 'كتاب أصلي مستخرج',
      en: 'Extracted original book'
    },
    embedded_summary: {
      ar: 'ملخص مضمّن — ليس النص الأصلي',
      en: 'Embedded summary — not original source text'
    },
    knowledge_graph_record: {
      ar: 'سجل شبكة المعرفة',
      en: 'Knowledge graph record'
    },
    unverified_legacy: {
      ar: 'مصدر قديم — غير متحقق منه',
      en: 'Legacy source — unverified'
    },
    source_metadata_unavailable: {
      ar: 'بيانات المصدر غير متاحة',
      en: 'Source metadata unavailable'
    }
  } as const;
  return labels[layer][lang];
}

export function unavailableValue(value: string | number | undefined | null, lang: 'ar' | 'en'): string {
  if (value === undefined || value === null || String(value).trim() === '') {
    return lang === 'ar' ? 'غير متاح' : 'Unavailable';
  }
  return String(value);
}

export function isGuidelineSource(sourceId: string): boolean {
  return getKnowledgeSourceById(sourceId)?.sourceType === 'clinical_guideline';
}

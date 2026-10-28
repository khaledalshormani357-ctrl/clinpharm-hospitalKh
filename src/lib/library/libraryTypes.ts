export type BookSourceType =
  | 'google_drive_pdf'
  | 'local_file_pdf'
  | 'embedded_synthetic'
  | 'unverified_legacy';

export type BookProcessingStatus =
  | 'not_imported'
  | 'downloading'
  | 'extracting'
  | 'needs_ocr'
  | 'verified_complete'
  | 'partially_complete'
  | 'failed'
  | 'embedded_summary';

export type PageExtractionMethod = 'native_text' | 'ocr' | 'blank' | 'unprocessed';

export type PageExtractionStatus = 'extracted' | 'ocr_completed' | 'needs_ocr' | 'blank' | 'failed';

export interface VerbatimReferenceTable {
  id?: string;
  title: string;
  titleAr: string;
  headers: string[];
  headersAr?: string[];
  rows: string[][];
  rowsAr?: string[][];
  pageNumber?: number;
  chapterId?: string;
  unitsAndFootnotes?: string;
  rawText?: string;
  structuredData?: Record<string, unknown>;
  extractionStatus?: 'structured' | 'needs_review';
}

export type MedicalSystemCategory =
  | 'Cardiology'
  | 'Critical Care & Infectious Disease'
  | 'Nephrology & Fluids'
  | 'Gastroenterology & Hepatology'
  | 'Endocrinology & Metabolism'
  | 'Clinical Methodology & PPCP'
  | 'Hospital Dosing & IV Protocols'
  | 'Drug Interactions & Safety';

export interface VerbatimSection {
  id: string;
  number: string;
  heading: string;
  headingAr: string;
  body: string;
  ocrBody?: string;
  originalPageNumber?: number;
  extractionMethod?: PageExtractionMethod;
  extractionStatus?: PageExtractionStatus;
  ocrConfidence?: number;
  contentHash?: string;
  evidenceGrade?: string;
  clinicalNotes?: string[];
  tables?: VerbatimReferenceTable[];
  subsections?: {
    id: string;
    subnumber: string;
    subheading: string;
    content: string;
  }[];
}

export interface VerbatimChapter {
  id: string;
  bookId: string;
  parentChapterId?: string | null;
  hierarchyLevel?: number;
  chapterNumber: number;
  startPage?: number;
  endPage?: number;
  title: string;
  titleAr: string;
  authors: string;
  edition: string;
  pageRange: string;
  systemCategory: MedicalSystemCategory;
  systemCategoryAr: string;
  uan?: string;
  sourceUrl: string;
  learningObjectives: string[];
  toc: {
    id: string;
    number: string;
    title: string;
    titleAr?: string;
    hierarchyLevel?: number;
    pageNumber?: number;
  }[];
  sections: VerbatimSection[];
  quickTables: VerbatimReferenceTable[];
  boardPearls: string[];
  boardPearlsAr: string[];
  keywords: string[];
  citation: string;
  isVerbatimSource: true;
}

export interface VerbatimBook {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  edition: string;
  editors: string;
  publisher: string;
  isbnOrUan: string;
  badge: string;
  badgeAr: string;
  description: string;
  descriptionAr: string;
  sourceType?: BookSourceType;
  processingStatus?: BookProcessingStatus;
  sourceFileName?: string;
  sha256?: string;
  originalPageCount?: number;
  processedPageCount?: number;
  extractedTextPageCount?: number;
  ocrPageCount?: number;
  unprocessedPageCount?: number;
  chapters: VerbatimChapter[];
}

export interface LibrarySearchMatch {
  book: VerbatimBook;
  chapter: VerbatimChapter;
  section?: VerbatimSection;
  table?: VerbatimReferenceTable;
  originalPageNumber?: number;
  extractionMethod?: PageExtractionMethod;
  sourceType?: BookSourceType;
  matchType: 'title' | 'heading' | 'body' | 'ocr' | 'pearl' | 'table';
  snippet: string;
  score: number;
}

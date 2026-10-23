export interface VerbatimReferenceTable {
  title: string;
  titleAr: string;
  headers: string[];
  headersAr?: string[];
  rows: string[][];
  rowsAr?: string[][];
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
  chapterNumber: number;
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
  chapters: VerbatimChapter[];
}

export interface LibrarySearchMatch {
  book: VerbatimBook;
  chapter: VerbatimChapter;
  section?: VerbatimSection;
  matchType: 'title' | 'heading' | 'body' | 'pearl' | 'table';
  snippet: string;
  score: number;
}

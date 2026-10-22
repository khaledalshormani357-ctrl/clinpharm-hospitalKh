import { describe, it, expect } from 'vitest';
import {
  getAllVerbatimBooks,
  getAllVerbatimChapters,
  getVerbatimBookById,
  getVerbatimChapterById,
  searchVerbatimLibrary,
  exportChapterMarkdown
} from './library';
import { resolveLocalReference } from './clinicalReferences';

describe('In-App Verbatim Medical Library (All Books & All Chapters)', () => {
  it('should load all 6 accredited medical reference books with multiple chapters in every book', () => {
    const books = getAllVerbatimBooks();
    expect(books.length).toBe(6);

    const expectedCounts: Record<string, number> = {
      'dipiro-13th-ed': 8,
      'accp-cardiology-2026': 6,
      'accp-2026-vol1': 10,
      'accp-2026-vol2': 10,
      'clinical-casebook-guide': 5,
      'hospital-compendium': 5
    };

    for (const [bookId, minCount] of Object.entries(expectedCounts)) {
      const book = getVerbatimBookById(bookId);
      expect(book).toBeDefined();
      expect(book!.chapters.length).toBe(minCount);
    }
  });

  it('should have 44 complete chapters with verbatim source sections, TOC, and board pearls', () => {
    const chapters = getAllVerbatimChapters();
    expect(chapters.length).toBe(44);

    for (const ch of chapters) {
      expect(ch.title).toBeTruthy();
      expect(ch.citation).toBeTruthy();
      expect(ch.toc.length).toBeGreaterThan(0);
      expect(ch.sections.length).toBeGreaterThan(0);
      expect(ch.boardPearls.length).toBeGreaterThan(0);

      for (const sec of ch.sections) {
        expect(sec.number).toBeTruthy();
        expect(sec.heading).toBeTruthy();
        expect(sec.body.length).toBeGreaterThan(100);
      }
    }
  });

  it('should find exact clinical terms across newly added chapters in verbatim search', () => {
    // Search for 36-hour washout in DiPiro HF chapter
    const washoutMatches = searchVerbatimLibrary('36-hour');
    expect(washoutMatches.length).toBeGreaterThan(0);
    expect(washoutMatches.some(m => m.chapter.id === 'dipiro-ch15-hf')).toBe(true);

    // Search for Esmolol in DiPiro Hypertension chapter
    const htnMatches = searchVerbatimLibrary('Acute Aortic Dissection');
    expect(htnMatches.some(m => m.chapter.id === 'dipiro-ch30-htn')).toBe(true);

    // Search for Cangrelor in ACCP Cardiology 2026 Ch 5
    const cangrelorMatches = searchVerbatimLibrary('Cangrelor');
    expect(cangrelorMatches.some(m => m.chapter.id === 'accp-cardio-2026-acs-p2y12')).toBe(true);

    // Search for Fidaxomicin in ACCP Vol 1 Ch 4
    const cdiffMatches = searchVerbatimLibrary('Fidaxomicin');
    expect(cdiffMatches.some(m => m.chapter.id === 'accp-2026-v1-c4')).toBe(true);

    // Search for Rasburicase in ACCP Vol 2 Ch 12 Oncology
    const tlsMatches = searchVerbatimLibrary('Rasburicase');
    expect(tlsMatches.some(m => m.chapter.id === 'accp-2026-v2-c2')).toBe(true);

    // Search for Winter-Tozer in ACCP Vol 2 Ch 17 PK/TDM
    const pkMatches = searchVerbatimLibrary('Winter-Tozer');
    expect(pkMatches.some(m => m.chapter.id === 'accp-2026-v2-c7')).toBe(true);

    // Search for Naranjo in Casebook Section V
    const naranjoMatches = searchVerbatimLibrary('Naranjo');
    expect(naranjoMatches.some(m => m.chapter.id === 'casebook-section5-sbar-soap-documentation')).toBe(true);

    // Search for CRRT in Hospital Compendium Section E
    const crrtMatches = searchVerbatimLibrary('CRRT');
    expect(crrtMatches.some(m => m.chapter.id === 'hospital-compendium-antimicrobial-crrt')).toBe(true);
  });

  it('should export clean markdown monographs containing all sections and tables', () => {
    const hfChapter = getVerbatimChapterById('dipiro-ch15-hf');
    expect(hfChapter).toBeDefined();

    const md = exportChapterMarkdown(hfChapter!);
    expect(md).toContain('# Heart Failure with Reduced Ejection Fraction');
    expect(md).toContain('## Table of Contents');
    expect(md).toContain('## High-Yield Board Pearls');
    expect(md).toContain('## Verbatim Clinical Sections');
    expect(md).toContain('Sacubitril/Valsartan');
  });

  it('should resolve local reference URIs and aliases directly to verbatim chapters', () => {
    const resolvedDipiro = resolveLocalReference('local://ref/chapter/dipiro-ch15-hf');
    expect(resolvedDipiro.verbatimChapterId).toBe('dipiro-ch15-hf');

    const resolvedCardio = resolveLocalReference('local://ref/chapter/accp-cardio-2026-acs-p2y12');
    expect(resolvedCardio.verbatimChapterId).toBe('accp-cardio-2026-acs-p2y12');

    const resolvedPk = resolveLocalReference('local://ref/chapter/accp-2026-v2-c7');
    expect(resolvedPk.verbatimChapterId).toBe('accp-2026-v2-c7');

    const resolvedPpcp = resolveLocalReference('casebook-ppcp-bedside');
    expect(resolvedPpcp.verbatimChapterId).toBe('casebook-ppcp-bedside');

    const resolvedHosp = resolveLocalReference('hospital-compendium-protocols');
    expect(resolvedHosp.verbatimChapterId).toBe('hospital-compendium-protocols');
  });

  it('should merge synced full-PDF books and verbatim pages from Google Drive into the library and search engine', async () => {
    const { saveSyncedFullBook, removeSyncedFullBook } = await import('./googleDrive/fullBookIdb');
    const { extractGoogleDriveFileId } = await import('./googleDrive/fullBookEngine');

    expect(
      extractGoogleDriveFileId('https://drive.google.com/file/d/1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR/view?usp=sharing')
    ).toBe('1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR');

    await saveSyncedFullBook({
      bookId: 'dipiro-13th-ed',
      driveFileId: '1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR',
      fileName: 'DiPiro_13th_Full_Textbook.pdf',
      mimeType: 'application/pdf',
      fileSize: 52428800,
      totalPages: 2480,
      totalChapters: 1,
      totalCharacters: 6500000,
      syncedAt: new Date().toISOString(),
      chapters: [
        {
          id: 'dipiro-13th-ed-full-ch-1-pp-1-15',
          bookId: 'dipiro-13th-ed',
          chapterNumber: 99,
          title: 'Verbatim PDF Pages 1–15',
          titleAr: 'الصفحات 1-15 حرفياً',
          authors: 'DiPiro Full PDF',
          edition: 'Full Synced PDF (2480 Total Pages)',
          pageRange: 'pp. 1–15 (of 2480)',
          systemCategory: 'Cardiology',
          systemCategoryAr: 'أمراض القلب',
          sourceUrl: 'local://ref/chapter/dipiro-13th-ed-full-ch-1-pp-1-15',
          learningObjectives: ['Full verbatim pages'],
          toc: [{ id: 'sec-p-1', number: 'p.1', title: 'Page 1' }],
          sections: [
            {
              id: 'sec-p-1',
              number: 'p.1',
              heading: 'Page 1 — Exact Verbatim PDF Content',
              headingAr: 'الصفحة الأصلية 1',
              body: 'UNIQUE_VERBATIM_DRIVE_PAGE_TOKEN_987654321 appears on page 1 of the synced Google Drive PDF.'
            }
          ],
          quickTables: [],
          boardPearls: ['Full PDF synced'],
          boardPearlsAr: ['الكتاب الكامل متزامن'],
          keywords: ['unique_verbatim_drive_page_token_987654321'],
          citation: 'DiPiro Full PDF p.1',
          isVerbatimSource: true
        }
      ],
      pages: [
        {
          pageNumber: 1,
          text: 'UNIQUE_VERBATIM_DRIVE_PAGE_TOKEN_987654321 appears on page 1 of the synced Google Drive PDF.',
          chapterId: 'dipiro-13th-ed-full-ch-1-pp-1-15',
          chapterTitle: 'Verbatim PDF Pages 1–15',
          sectionId: 'sec-p-1',
          lineCount: 1
        }
      ]
    });

    const matches = searchVerbatimLibrary('UNIQUE_VERBATIM_DRIVE_PAGE_TOKEN_987654321');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].chapter.id).toBe('dipiro-13th-ed-full-ch-1-pp-1-15');

    await removeSyncedFullBook('dipiro-13th-ed');
  });
});


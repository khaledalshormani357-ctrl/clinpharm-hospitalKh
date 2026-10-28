import { describe, expect, it } from 'vitest';
import { convertExtractedPagesToKnowledge } from './convertExtractedPages';
import { assertWithinKnowledgeLibraryBudget, estimateKnowledgeLibrarySize } from './knowledgeBudget';
import { CLINICAL_LIBRARY_MAX_BYTES } from './knowledgeSchema';

describe('clinical knowledge conversion', () => {
  it('preserves source and exact PDF page citation for every extracted chunk', () => {
    const records = convertExtractedPagesToKnowledge({
      sourceId: 'reference-a',
      sourceTitle: 'Clinical Reference',
      edition: '2026',
      pages: [{ pageNumber: 12, chapterTitle: 'Heart Failure', text: 'Heart failure clinical reference text.' }]
    }, { now: '2026-10-28T00:00:00.000Z' });

    expect(records).toHaveLength(1);
    expect(records[0].citation.sourceId).toBe('reference-a');
    expect(records[0].citation.pdfPage).toBe(12);
    expect(records[0].reviewStatus).toBe('needs_review');
    expect(records[0].domain).toBe('cardiology');
  });

  it('splits long pages into overlapping chunks without losing source traceability', () => {
    const text = Array.from({ length: 100 }, (_, i) => `Clinical paragraph ${i}. ${'evidence '.repeat(12)}`).join('\n');
    const records = convertExtractedPagesToKnowledge({
      sourceId: 'ref',
      sourceTitle: 'Reference',
      pages: [{ pageNumber: 3, text }]
    }, { maxChunkChars: 600, overlapChars: 80 });

    expect(records.length).toBeGreaterThan(1);
    expect(records.every(record => record.citation.pdfPage === 3)).toBe(true);
    expect(records.every(record => record.text.length <= 600)).toBe(true);
  });

  it('skips empty pages and invalid page numbers', () => {
    const records = convertExtractedPagesToKnowledge({
      sourceId: 'ref',
      sourceTitle: 'Reference',
      pages: [
        { pageNumber: 0, text: 'invalid page' },
        { pageNumber: 1, text: '   ' },
        { pageNumber: 2, text: 'valid page text' }
      ]
    });
    expect(records).toHaveLength(1);
    expect(records[0].citation.pdfPage).toBe(2);
  });

  it('enforces a configurable sub-gigabyte size budget', () => {
    const records = convertExtractedPagesToKnowledge({
      sourceId: 'ref',
      sourceTitle: 'Reference',
      pages: [{ pageNumber: 1, text: 'x'.repeat(2000) }]
    }, { maxChunkChars: 800, overlapChars: 80 });

    expect(estimateKnowledgeLibrarySize(records, 10).withinBudget).toBe(false);
    expect(() => assertWithinKnowledgeLibraryBudget(records, 10)).toThrow(/exceeds its/);
    expect(CLINICAL_LIBRARY_MAX_BYTES).toBeLessThan(1024 * 1024 * 1024);
    expect(assertWithinKnowledgeLibraryBudget(records).withinBudget).toBe(true);
  });
});

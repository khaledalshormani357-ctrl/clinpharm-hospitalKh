import { SyncedFullBookRecord } from '../googleDrive/fullBookIdb';
import { normalizeClinicalText } from './knowledgeSchema';

export interface RetrievedBookPassage {
  sourceId: string;
  sourceTitle: string;
  chapterTitle: string;
  sectionTitle: string;
  pdfPage: number;
  text: string;
  score: number;
}

function tokenize(value: string): string[] {
  return Array.from(new Set(
    normalizeClinicalText(value)
      .toLocaleLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter(token => token.length >= 3)
  )).slice(0, 60);
}

/**
 * Lightweight local retrieval over already-imported PDF page text.
 * Results always retain book and PDF-page coordinates; ranking is lexical, not clinical validation.
 */
export function retrieveImportedBookPassages(
  query: string,
  books: SyncedFullBookRecord[],
  limit = 4
): RetrievedBookPassage[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const candidates: RetrievedBookPassage[] = [];
  for (const book of books) {
    for (const page of book.pages || []) {
      const text = normalizeClinicalText(page.text || '');
      if (!text) continue;
      const haystack = `${page.chapterTitle || ''} ${page.sectionId || ''} ${text}`.toLocaleLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (haystack.includes(token)) {
          score += token.length >= 7 ? 3 : 1;
          if ((page.chapterTitle || '').toLocaleLowerCase().includes(token)) score += 2;
        }
      }
      if (score > 0) {
        candidates.push({
          sourceId: book.bookId,
          sourceTitle: book.customTitle || book.fileName,
          chapterTitle: page.chapterTitle || 'Unclassified section',
          sectionTitle: page.sectionId || '',
          pdfPage: page.pageNumber,
          text: text.slice(0, 2600),
          score
        });
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score || a.pdfPage - b.pdfPage);
  const chosen: RetrievedBookPassage[] = [];
  const seen = new Set<string>();
  for (const item of candidates) {
    const key = `${item.sourceId}:${item.pdfPage}`;
    if (seen.has(key)) continue;
    seen.add(key);
    chosen.push(item);
    if (chosen.length >= Math.max(1, Math.min(limit, 8))) break;
  }
  return chosen;
}

export function formatImportedBookPassages(passages: RetrievedBookPassage[]): string {
  return passages.map((passage, index) =>
    `[IMPORTED SOURCE ${index + 1}] ${passage.sourceTitle} | ${passage.chapterTitle} | PDF page ${passage.pdfPage}\nRetrieval score (lexical only): ${passage.score}\nSource text (not independently clinically validated):\n${passage.text}`
  ).join('\n\n========================================\n\n');
}

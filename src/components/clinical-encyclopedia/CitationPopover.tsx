import { ArrowUpRight, BookOpen, ChevronDown } from 'lucide-react';
import type { KnowledgeCitation } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import type { CitationSourceDetails } from '../../lib/knowledgeGraph/provenance';
import { unavailableValue } from '../../lib/knowledgeGraph/provenance';
import { ContentProvenanceBadge, SourceLayerBadge } from '../ui/clinical';

interface Props {
  citation: KnowledgeCitation;
  source: CitationSourceDetails;
  lang: Language;
  evidenceLevel?: string;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}

export function CitationPopover({ citation, source, lang, evidenceLevel, canOpen, onOpenReference }: Props) {
  const isArabic = lang === 'ar';
  const shortTitle = source.source ? (isArabic ? source.source.shortBadgeAr : source.source.shortBadgeEn) : citation.sourceId;
  const unavailable = isArabic ? 'غير متاح' : 'Unavailable';
  const recordedHash = source.hasSha256 ? (isArabic ? 'مسجل في بيانات المصدر' : 'Recorded in source metadata') : unavailable;

  return (
    <details className="min-w-0 rounded-clinical border border-clinical-border bg-clinical-surface-subtle">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-3 py-2 text-start text-xs font-semibold text-clinical-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clinical-focus">
        <BookOpen aria-hidden="true" className="size-4 shrink-0 text-clinical-teal" />
        <span className="min-w-0 flex-1 truncate">{shortTitle} · {unavailableValue(citation.pageRange, lang)}</span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-clinical-muted" />
      </summary>
      <div className="space-y-3 border-t border-clinical-border p-3 text-xs">
        <div className="flex flex-wrap gap-2">
          <SourceLayerBadge layer={source.layer} lang={lang} />
          <ContentProvenanceBadge state={source.state} lang={lang} />
        </div>
        <dl className="grid min-w-0 grid-cols-[minmax(6rem,auto)_1fr] gap-x-3 gap-y-2 text-start">
          <dt className="text-clinical-muted">{isArabic ? 'الكتاب' : 'Book'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(source.bookTitle, lang)}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'الفصل' : 'Chapter'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(citation.chapterTitle, lang)} · {citation.chapterNumber > 0 ? citation.chapterNumber : unavailable}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'القسم' : 'Section'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(citation.sectionReference, lang)}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'الصفحات' : 'Pages'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(citation.pageRange, lang)}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'الطبعة' : 'Edition'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(citation.edition, lang)}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'سنة النشر' : 'Publication year'}</dt>
          <dd className="font-medium text-clinical-text">{citation.publicationYear > 0 ? citation.publicationYear : unavailable}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'مستوى الدليل' : 'Evidence level'}</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{unavailableValue(evidenceLevel, lang)}</dd>
          <dt className="text-clinical-muted">SHA-256</dt>
          <dd className="min-w-0 break-words font-medium text-clinical-text">{recordedHash}<span className="ms-1 text-clinical-muted">{isArabic ? '(التوفر فقط؛ لم يُعَد حساب البصمة هنا)' : '(availability only; not recomputed here)'}</span></dd>
          <dt className="text-clinical-muted">{isArabic ? 'نوع المصدر' : 'Source type'}</dt>
          <dd className="min-w-0 break-words font-mono text-clinical-text">{unavailableValue(source.sourceType, lang)}</dd>
          <dt className="text-clinical-muted">{isArabic ? 'حالة المعالجة' : 'Processing status'}</dt>
          <dd className="min-w-0 break-words font-mono text-clinical-text">{unavailableValue(source.processingStatus, lang)}</dd>
        </dl>
        {canOpen ? (
          <button type="button" onClick={() => onOpenReference(citation.sourceLocationUri)} className="inline-flex min-h-10 items-center gap-2 rounded-clinical bg-clinical-navy px-3 text-xs font-semibold text-white hover:bg-clinical-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus focus-visible:ring-offset-2">
            {isArabic ? 'فتح سجل المصدر' : 'Open source record'}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </button>
        ) : (
          <p role="status" className="text-clinical-muted">{isArabic ? 'رابط المصدر غير قابل للحل في السجلات المتاحة.' : 'Source link does not resolve in the available records.'}</p>
        )}
      </div>
    </details>
  );
}

import {
  AlertCircle,
  BookCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Layers3,
  type LucideIcon
} from 'lucide-react';
import type { Language } from '../../types/clinical';
import type { ContentProvenanceState, SourceLayer } from '../../lib/knowledgeGraph/provenance';
import { sourceLayerLabel } from '../../lib/knowledgeGraph/provenance';

export interface ContentProvenanceBadgeProps {
  state: ContentProvenanceState;
  lang: Language;
  className?: string;
}

const STATE_PRESENTATION: Record<ContentProvenanceState, { label: Record<Language, string>; icon: LucideIcon; tone: string }> = {
  verbatim: {
    label: { ar: 'نص مستخرج من المرجع', en: 'Extracted source text' },
    icon: FileCheck2,
    tone: 'border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-200'
  },
  summarized: {
    label: { ar: 'ملخص مضمّن — ليس النص الأصلي', en: 'Embedded summary — not original source text' },
    icon: Layers3,
    tone: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
  },
  'pharmacist-reviewed': {
    label: { ar: 'مراجعة صيدلي موثقة', en: 'Pharmacist-reviewed record' },
    icon: CheckCircle2,
    tone: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200'
  },
  'guideline-recommendation': {
    label: { ar: 'توصية من مصدر إرشادي', en: 'Guideline-source recommendation' },
    icon: BookCheck,
    tone: 'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
  },
  'pending-review': {
    label: { ar: 'بانتظار المراجعة', en: 'Pending review' },
    icon: Clock3,
    tone: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
  },
  'source-metadata-unavailable': {
    label: { ar: 'بيانات المصدر غير متاحة', en: 'Source metadata unavailable' },
    icon: AlertCircle,
    tone: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
  }
};

/** The caller supplies a data-derived state; this component only renders it. */
export function ContentProvenanceBadge({ state, lang, className = '' }: ContentProvenanceBadgeProps) {
  const presentation = STATE_PRESENTATION[state];
  const Icon = presentation.icon;
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-5 ${presentation.tone} ${className}`}
      aria-label={presentation.label[lang]}
    >
      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      <span>{presentation.label[lang]}</span>
    </span>
  );
}

export interface SourceLayerBadgeProps {
  layer: SourceLayer;
  lang: Language;
  className?: string;
}

export function SourceLayerBadge({ layer, lang, className = '' }: SourceLayerBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-clinical-border bg-clinical-surface-subtle px-2.5 py-1 text-xs font-medium text-clinical-muted ${className}`}>
      {sourceLayerLabel(layer, lang)}
    </span>
  );
}

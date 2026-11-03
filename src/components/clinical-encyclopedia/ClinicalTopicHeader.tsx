import { BookOpen, CalendarDays, Menu, Star } from 'lucide-react';
import type { ClinicalTopic } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { ClinicalPanel } from '../ui/clinical';

interface Props {
  topic: ClinicalTopic;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenTopics: () => void;
}

function formatRecordedDate(value: string, lang: Language): string | null {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export function ClinicalTopicHeader({ topic, lang, isFavorite, onToggleFavorite, onOpenTopics }: Props) {
  const isArabic = lang === 'ar';
  const recordedDate = formatRecordedDate(topic.lastReviewedAt, lang);
  const title = isArabic ? topic.arabicName : topic.englishName;
  return (
    <ClinicalPanel className="mb-4" contentClassName="space-y-4 p-4 sm:p-5" data-testid="clinical-topic-header">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <button type="button" onClick={onOpenTopics} aria-label={isArabic ? 'فتح قائمة الموضوعات' : 'Open topic list'} className="inline-flex size-11 shrink-0 items-center justify-center rounded-clinical border border-clinical-border text-clinical-muted hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus md:hidden">
            <Menu aria-hidden="true" className="size-5" />
          </button>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-clinical-muted">
              <span className="inline-flex items-center gap-1 rounded-full bg-clinical-info-soft px-2.5 py-1 font-semibold text-clinical-info">{isArabic ? topic.specialtyAr : topic.specialty}</span>
              <span className="rounded-full border border-clinical-border px-2.5 py-1">{topic.topicType.replaceAll('_', ' ')}</span>
              {topic.status === 'conflicting_evidence' && <span className="rounded-full border border-clinical-warning/40 bg-clinical-warning-soft px-2.5 py-1 font-semibold text-clinical-warning">{isArabic ? 'يتضمن تعارضًا مسجلًا' : 'Conflict recorded'}</span>}
            </div>
            <h1 className="text-xl font-bold leading-8 tracking-tight text-clinical-text sm:text-2xl" dir={isArabic ? 'rtl' : 'ltr'}>{title}</h1>
            {!isArabic && topic.arabicName && <p className="text-sm text-clinical-muted" dir="rtl">{topic.arabicName}</p>}
            {isArabic && topic.englishName && <p className="text-sm text-clinical-muted" dir="ltr">{topic.englishName}</p>}
            <p className="max-w-prose text-sm leading-6 text-clinical-muted">{isArabic ? topic.descriptionAr : topic.descriptionEn}</p>
          </div>
        </div>
        <button type="button" onClick={onToggleFavorite} aria-pressed={isFavorite} aria-label={isFavorite ? (isArabic ? 'إزالة من المفضلة' : 'Remove from favorites') : (isArabic ? 'إضافة إلى المفضلة' : 'Add to favorites')} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-clinical border border-clinical-border px-3 text-sm font-medium text-clinical-text hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus">
          <Star aria-hidden="true" className={`size-4 ${isFavorite ? 'fill-clinical-warning text-clinical-warning' : 'text-clinical-muted'}`} />
          <span className="hidden sm:inline">{isFavorite ? (isArabic ? 'في المفضلة' : 'Saved') : (isArabic ? 'حفظ' : 'Save')}</span>
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-clinical-border pt-3 text-xs text-clinical-muted">
        {topic.hierarchyPath.length > 0 && <span className="inline-flex items-center gap-1"><BookOpen aria-hidden="true" className="size-3.5" />{topic.hierarchyPath.join(' › ')}</span>}
        {topic.icd10Codes.length > 0 && <span>{isArabic ? 'ICD-10' : 'ICD-10'}: {topic.icd10Codes.join(', ')}</span>}
        {topic.snomedCodes.length > 0 && <span>SNOMED CT: {topic.snomedCodes.join(', ')}</span>}
        {recordedDate && <span className="inline-flex items-center gap-1"><CalendarDays aria-hidden="true" className="size-3.5" />{isArabic ? 'تاريخ المراجعة المسجل' : 'Recorded review date'}: <time dateTime={topic.lastReviewedAt}>{recordedDate}</time></span>}
      </div>
      <p className="text-[11px] leading-5 text-clinical-muted">{isArabic ? 'هذه بيانات موضوع من مستودع المعرفة، وليست تقييمًا لمريض أو توصية علاجية شخصية.' : 'This is a knowledge-repository topic record, not a patient assessment or individualized treatment recommendation.'}</p>
    </ClinicalPanel>
  );
}

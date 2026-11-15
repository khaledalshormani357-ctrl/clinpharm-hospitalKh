import { useCitationProvenance } from '../../hooks/useClinicalKnowledgeGraph';
import type { KnowledgeStatement } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { ContentProvenanceBadge, SourceLayerBadge } from '../ui/clinical';
import { knowledgeGraphRecordProvenance } from '../../lib/knowledgeGraph/provenance';
import { CitationPopover } from './CitationPopover';

interface Props {
  statement: KnowledgeStatement;
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
}

function statementTypeLabel(type: KnowledgeStatement['statementType'], lang: Language): string {
  const words: Partial<Record<KnowledgeStatement['statementType'], { ar: string; en: string }>> = {
    definition: { ar: 'تعريف', en: 'Definition' },
    diagnostic_criterion: { ar: 'معيار تشخيصي', en: 'Diagnostic criterion' },
    therapeutic_recommendation: { ar: 'توصية مسجلة', en: 'Recorded recommendation' },
    dosing_rule: { ar: 'قاعدة جرعة مسجلة', en: 'Recorded dosing rule' },
    contraindication_warning: { ar: 'تحذير مسجل', en: 'Recorded warning' },
    monitoring_parameter: { ar: 'معلمة مراقبة', en: 'Monitoring parameter' },
    guideline_recommendation: { ar: 'توصية مصنفة إرشادية', en: 'Guideline-tagged recommendation' },
    conflicting_position: { ar: 'موقف ضمن تعارض', en: 'Conflicting position' }
  };
  return words[type]?.[lang] || type.replaceAll('_', ' ');
}

export function EvidenceStatement({ statement, lang, canResolveUri, onOpenReference }: Props) {
  const isArabic = lang === 'ar';
  const title = isArabic ? statement.statementTextAr : statement.statementTextEn;
  const citationProvenance = useCitationProvenance(statement.citations);
  const reviewNote = isArabic ? statement.clinicianReviewedNoteAr : statement.clinicianReviewedNoteEn;
  const hasRecordedReview = Boolean(statement.reviewedBySpecialist && statement.reviewedAt && (statement.clinicianReviewedNoteAr || statement.clinicianReviewedNoteEn));
  const recordSource = knowledgeGraphRecordProvenance();

  return (
    <article className="space-y-3 rounded-clinical border border-clinical-border bg-clinical-surface p-4 sm:p-5" data-testid="evidence-statement">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <SourceLayerBadge layer={recordSource.layer} lang={lang} />
          {hasRecordedReview && <ContentProvenanceBadge state="pharmacist-reviewed" lang={lang} />}
          {statement.citations.length === 0 && <ContentProvenanceBadge state="source-metadata-unavailable" lang={lang} />}
          <span className="rounded-full border border-clinical-border px-2.5 py-1 text-xs text-clinical-muted">{statementTypeLabel(statement.statementType, lang)}</span>
        </div>
        <span className="text-xs text-clinical-muted">{statement.citations.length} {isArabic ? 'استشهادات' : 'citations'}</span>
      </div>
      <p className="text-sm font-medium leading-7 text-clinical-text" dir={isArabic ? 'rtl' : 'ltr'}>{title || (isArabic ? 'النص غير متاح' : 'Text unavailable')}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-clinical-muted">
        <span>{isArabic ? 'مستوى الدليل' : 'Evidence level'}: {statement.evidenceLevel || (isArabic ? 'غير متاح' : 'Unavailable')}</span>
        {statement.recommendationStrength && <span>{isArabic ? 'قوة التوصية' : 'Recommendation strength'}: {statement.recommendationStrength}</span>}
        {statement.verificationStatus === 'conflicting_evidence' && <span className="font-semibold text-clinical-warning">{isArabic ? 'التعارض مسجل في السجل' : 'Conflict is recorded in the source record'}</span>}
      </div>
      {hasRecordedReview && reviewNote && (
        <div className="space-y-2 rounded-clinical border border-clinical-info/30 bg-clinical-info-soft p-3">
          <p className="text-xs font-semibold text-clinical-info">{isArabic ? `ملاحظة مراجعة مسجلة: ${statement.reviewedBySpecialist} · ${statement.reviewedAt}` : `Recorded reviewer note: ${statement.reviewedBySpecialist} · ${statement.reviewedAt}`}</p>
          <p className="text-sm leading-6 text-clinical-text">{reviewNote}</p>
        </div>
      )}
      {citationProvenance.length > 0 ? (
        <div className="space-y-2 border-t border-clinical-border pt-3">
          <h4 className="text-xs font-semibold text-clinical-muted">{isArabic ? 'مصادر السجل' : 'Record sources'}</h4>
          <div className="grid min-w-0 gap-2 lg:grid-cols-2">
            {citationProvenance.map(({ citation, source }) => (
              <CitationPopover key={citation.id} citation={citation} source={source} lang={lang} evidenceLevel={statement.evidenceLevel} canOpen={canResolveUri(citation.sourceLocationUri)} onOpenReference={onOpenReference} />
            ))}
          </div>
        </div>
      ) : (
        <p role="status" className="border-t border-clinical-border pt-3 text-xs text-clinical-muted">{isArabic ? 'بيانات الاستشهاد غير متاحة.' : 'Citation metadata unavailable.'}</p>
      )}
    </article>
  );
}

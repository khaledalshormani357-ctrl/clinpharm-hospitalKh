import type { TopicRelationship } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { useSourceProvenance } from '../../hooks/useClinicalKnowledgeGraph';
import { ClinicalAlert, ClinicalEmptyState, ClinicalPanel, ContentProvenanceBadge, SourceLayerBadge } from '../ui/clinical';
import { ArrowUpRight, Network } from 'lucide-react';
import { unavailableValue } from '../../lib/knowledgeGraph/provenance';

interface Props {
  relationships: TopicRelationship[];
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenTarget: (uri: string) => void;
  onOpenSource: (uri: string) => void;
}

export function RelatedKnowledgePanel({ relationships, lang, canResolveUri, onOpenTarget, onOpenSource }: Props) {
  if (!relationships.length) return null;
  const isArabic = lang === 'ar';
  const resolved = relationships.filter(relationship => canResolveUri(relationship.targetTopicUri));
  const unresolved = relationships.filter(relationship => !canResolveUri(relationship.targetTopicUri));
  return (
    <ClinicalPanel title={isArabic ? 'علاقات مسجلة في شبكة المعرفة' : 'Knowledge-graph relationships'} description={isArabic ? 'لا تُعرض أهداف كرابط إلا إذا أمكن حلها إلى سجل موجود.' : 'A target is linked only when it resolves to an existing record.'}>
      {resolved.length ? <div className="grid min-w-0 gap-3 lg:grid-cols-2">{resolved.map(relationship => <RelationshipCard key={relationship.id} relationship={relationship} lang={lang} canResolveUri={canResolveUri} onOpenTarget={onOpenTarget} onOpenSource={onOpenSource} />)}</div> : <ClinicalEmptyState title={isArabic ? 'لا توجد علاقات قابلة للتنقل' : 'No navigable relationships'} />}
      {unresolved.length > 0 && <ClinicalAlert tone="warning" heading={isArabic ? 'أهداف علاقة غير قابلة للحل — لم تُنشأ روابط لها' : 'Unresolved relationship targets — no links were created'} className="mt-3"><ul className="list-inside list-disc space-y-1">{unresolved.map(relationship => <li key={relationship.id}>{isArabic ? relationship.targetTopicTitleAr : relationship.targetTopicTitleEn} <span className="font-mono">({relationship.targetTopicUri})</span></li>)}</ul></ClinicalAlert>}
    </ClinicalPanel>
  );
}

function RelationshipCard({ relationship, lang, canResolveUri, onOpenTarget, onOpenSource }: {
  relationship: TopicRelationship;
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenTarget: (uri: string) => void;
  onOpenSource: (uri: string) => void;
}) {
  const provenance = useSourceProvenance(relationship.primarySourceId);
  const isArabic = lang === 'ar';
  const targetTitle = isArabic ? relationship.targetTopicTitleAr : relationship.targetTopicTitleEn;
  const sourceResolvable = canResolveUri(relationship.sourceLocationUri);
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-clinical border border-clinical-border bg-clinical-surface p-4">
      <div className="flex flex-wrap gap-2"><SourceLayerBadge layer={provenance.layer} lang={lang} /><ContentProvenanceBadge state={provenance.state} lang={lang} /></div>
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-clinical-muted">{relationship.relationshipType.replaceAll('_', ' ')} · {relationship.targetTopicType.replaceAll('_', ' ')}</p>
        <h3 className="font-semibold text-clinical-text">{targetTitle}</h3>
        <p className="text-sm leading-6 text-clinical-muted">{isArabic ? relationship.relationshipDescriptionAr : relationship.relationshipDescriptionEn}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-clinical-border pt-3">
        <span className="text-xs text-clinical-muted">{isArabic ? 'الصفحات' : 'Pages'}: {unavailableValue(relationship.pageRange, lang)} · {unavailableValue(relationship.chapterReference, lang)}</span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onOpenTarget(relationship.targetTopicUri)} className="inline-flex min-h-10 items-center gap-1 rounded-clinical bg-clinical-navy px-3 text-xs font-semibold text-white hover:bg-clinical-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus focus-visible:ring-offset-2"><Network aria-hidden="true" className="size-3.5" />{isArabic ? 'فتح الهدف' : 'Open target'}<ArrowUpRight aria-hidden="true" className="size-3.5" /></button>
          {sourceResolvable && <button type="button" onClick={() => onOpenSource(relationship.sourceLocationUri)} className="inline-flex min-h-10 items-center gap-1 rounded-clinical border border-clinical-border px-3 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus">{isArabic ? 'فتح المصدر' : 'Open source'}</button>}
        </div>
      </div>
    </article>
  );
}

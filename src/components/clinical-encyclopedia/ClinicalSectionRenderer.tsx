import { useEffect, useRef, useState } from 'react';
import { useLazyClinicalTopicSection } from '../../hooks/useClinicalKnowledgeGraph';
import type { ClinicalTopic, ClinicalTopicSection, TopicSectionKey } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { ClinicalEmptyState, ClinicalLoadingState, ClinicalPanel } from '../ui/clinical';
import { ClinicalAlgorithmPanel, ClinicalDataTable, ClinicalDosingRecords, ClinicalSummaryPanel, ConflictEvidencePanel, DiagnosticCriteriaTable, MonitoringPanel, RecommendationPanel, WarningPanel } from './ClinicalContentPanels';
import { EvidenceStatement } from './EvidenceStatement';
import { RelatedKnowledgePanel } from './RelatedKnowledgePanel';
import { Database } from 'lucide-react';

interface Props {
  topic: ClinicalTopic;
  section: ClinicalTopicSection;
  lang: Language;
  active: boolean;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
  onOpenTopicTarget: (uri: string) => void;
}

export function ClinicalSectionRenderer({ topic, section, lang, active, canResolveUri, onOpenReference, onOpenTopicTarget }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '280px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [section.id]);

  const payload = useLazyClinicalTopicSection(topic.id, section.sectionKey as TopicSectionKey, nearViewport);
  const isArabic = lang === 'ar';
  const title = isArabic ? section.titleAr : section.titleEn;
  const diagnosticTables = payload?.tablesAndAlgorithms.filter(item => item.artifactType === 'diagnostic_criteria_table') || [];
  const algorithmRecords = payload?.tablesAndAlgorithms.filter(item => item.artifactType === 'stepwise_protocol_algorithm') || [];
  const dataTables = payload?.tablesAndAlgorithms.filter(item => item.artifactType !== 'diagnostic_criteria_table' && item.artifactType !== 'stepwise_protocol_algorithm') || [];
  const summaryStatements = payload?.statements.filter(item => item.statementType === 'definition' || item.statementType === 'clinical_presentation') || [];
  const warningStatements = payload?.statements.filter(item => item.statementType === 'contraindication_warning' || item.statementType === 'complication_hazard') || [];
  const monitoringStatements = payload?.statements.filter(item => item.statementType === 'monitoring_parameter') || [];
  const otherStatements = payload?.statements.filter(item => !summaryStatements.includes(item) && !warningStatements.includes(item) && !monitoringStatements.includes(item)) || [];
  const hasAnyContent = Boolean(payload && (
    payload.statements.length || payload.conflictGroups.length || payload.tablesAndAlgorithms.length ||
    payload.drugDosing.length || payload.guidelineRecommendations.length || payload.relationships.length
  ));

  return (
    <section ref={rootRef} id={`topic-section-${section.sectionKey}`} data-section-key={section.sectionKey} className="scroll-mt-20 space-y-3" data-testid={`topic-section-${section.sectionKey}`}>
      <ClinicalPanel title={title} description={isArabic ? `سجل قسم ${section.sectionOrder} · ${section.availabilityStatus}` : `Section record ${section.sectionOrder} · ${section.availabilityStatus}`} headingAs="h2" className={active ? 'ring-2 ring-clinical-teal/30' : ''}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-clinical-surface-subtle px-2.5 py-1 text-xs font-medium text-clinical-muted">{isArabic ? 'مصدر القسم: سجل شبكة المعرفة' : 'Section layer: knowledge-graph record'}</span>
          {section.populatedStatementCount > 0 && <span className="text-xs text-clinical-muted">{section.populatedStatementCount} {isArabic ? 'سجلات مملوءة' : 'populated records'}</span>}
        </div>
        {(section.availabilityNoteAr || section.availabilityNoteEn) && <p className="mt-3 text-sm leading-6 text-clinical-muted">{isArabic ? section.availabilityNoteAr : section.availabilityNoteEn}</p>}
        {!payload && <ClinicalLoadingState label={isArabic ? 'تحميل سجلات هذا القسم' : 'Loading this section record'} detail={isArabic ? 'يتم جلب قسم واحد عند الحاجة.' : 'Only this section is loaded when needed.'} className="mt-3" />}
        {payload && !hasAnyContent && <ClinicalEmptyState title={isArabic ? 'لا يوجد محتوى متاح في السجلات الحالية' : 'No content available in current records'} description={isArabic ? 'لم تُنشأ بيانات بديلة لهذا القسم.' : 'No replacement or placeholder content has been created.'} icon={<Database />} className="mt-3" />}
      </ClinicalPanel>
      {payload && hasAnyContent && (
        <div className="space-y-4">
          <ClinicalSummaryPanel statements={summaryStatements} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          {otherStatements.length > 0 && <ClinicalPanel title={isArabic ? 'سجلات سريرية إضافية' : 'Additional clinical records'}><div className="space-y-3">{otherStatements.map(statement => <EvidenceStatement key={statement.id} statement={statement} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />)}</div></ClinicalPanel>}
          <WarningPanel statements={warningStatements} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          <MonitoringPanel statements={monitoringStatements} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          <ConflictEvidencePanel conflicts={payload.conflictGroups} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          <RecommendationPanel recommendations={payload.guidelineRecommendations} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          <ClinicalDosingRecords dosingRecords={payload.drugDosing} lang={lang} canResolveUri={canResolveUri} onOpenReference={onOpenReference} />
          {diagnosticTables.map(table => <DiagnosticCriteriaTable key={table.id} table={table} lang={lang} canOpen={canResolveUri(table.sourceLocationUri)} onOpenReference={onOpenReference} />)}
          {dataTables.map(table => <ClinicalDataTable key={table.id} table={table} lang={lang} canOpen={canResolveUri(table.sourceLocationUri)} onOpenReference={onOpenReference} />)}
          {algorithmRecords.map(table => <ClinicalAlgorithmPanel key={table.id} table={table} lang={lang} canOpen={canResolveUri(table.sourceLocationUri)} onOpenReference={onOpenReference} />)}
          {payload.relationships.length > 0 && <RelatedKnowledgePanel relationships={payload.relationships} lang={lang} canResolveUri={canResolveUri} onOpenTarget={onOpenTopicTarget} onOpenSource={onOpenReference} />}
        </div>
      )}
    </section>
  );
}

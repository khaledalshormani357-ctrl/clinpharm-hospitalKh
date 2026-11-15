import { useSourceProvenance } from '../../hooks/useClinicalKnowledgeGraph';
import type {
  ClinicalGuidelineRecommendation,
  ClinicalTableOrAlgorithm,
  ClinicalDrugDosing,
  KnowledgeConflictGroup,
  KnowledgeStatement
} from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { ClinicalAlert, ClinicalPanel, ContentProvenanceBadge, SourceLayerBadge } from '../ui/clinical';
import { unavailableValue } from '../../lib/knowledgeGraph/provenance';
import { EvidenceStatement } from './EvidenceStatement';
import { ArrowUpRight, AlertTriangle, BookOpen } from 'lucide-react';

interface StatementPanelProps {
  statements: KnowledgeStatement[];
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
}

export function ClinicalSummaryPanel(props: StatementPanelProps) {
  const sourcedStatements = props.statements.filter(statement => statement.citations.length > 0);
  if (!sourcedStatements.length) return null;
  return (
    <ClinicalPanel title={props.lang === 'ar' ? 'ملخص من سجلات موضوع موثقة باستشهادات' : 'Summary from cited topic records'} description={props.lang === 'ar' ? 'يعرض هذا الملخص نصوصًا موجودة في سجل شبكة المعرفة فقط.' : 'This summary contains only statements already present in the knowledge-graph records.'}>
      <div className="space-y-3">
        {sourcedStatements.map(statement => <EvidenceStatement key={statement.id} statement={statement} lang={props.lang} canResolveUri={props.canResolveUri} onOpenReference={props.onOpenReference} />)}
      </div>
    </ClinicalPanel>
  );
}

export function WarningPanel(props: StatementPanelProps) {
  if (!props.statements.length) return null;
  const isArabic = props.lang === 'ar';
  return (
    <ClinicalPanel title={isArabic ? 'تحذيرات مسجلة في المستودع' : 'Warnings recorded in the repository'} surface="subtle">
      <div className="space-y-3">
        {props.statements.map(statement => (
          <div key={statement.id} className="rounded-clinical border border-clinical-warning/30 bg-clinical-warning-soft p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-clinical-warning"><AlertTriangle aria-hidden="true" className="size-4" />{isArabic ? 'نوع السجل: تحذير' : 'Record type: warning'}</div>
            <EvidenceStatement statement={statement} lang={props.lang} canResolveUri={props.canResolveUri} onOpenReference={props.onOpenReference} />
          </div>
        ))}
      </div>
    </ClinicalPanel>
  );
}

export function MonitoringPanel(props: StatementPanelProps) {
  if (!props.statements.length) return null;
  return (
    <ClinicalPanel title={props.lang === 'ar' ? 'معلمات المراقبة المسجلة' : 'Recorded monitoring parameters'}>
      <div className="space-y-3">
        {props.statements.map(statement => <EvidenceStatement key={statement.id} statement={statement} lang={props.lang} canResolveUri={props.canResolveUri} onOpenReference={props.onOpenReference} />)}
      </div>
    </ClinicalPanel>
  );
}

interface RecordSourceProps {
  sourceId: string;
  lang: Language;
  uri: string;
  pageRange?: string;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}

function RecordSource({ sourceId, lang, uri, pageRange, canOpen, onOpenReference }: RecordSourceProps) {
  const details = useSourceProvenance(sourceId);
  const isArabic = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-clinical-border pt-3 text-xs">
      <SourceLayerBadge layer={details.layer} lang={lang} />
      <ContentProvenanceBadge state={details.state} lang={lang} />
      <span className="text-clinical-muted">{isArabic ? 'الصفحات' : 'Pages'}: {unavailableValue(pageRange, lang)}</span>
      <span className="text-clinical-muted">SHA-256: {details.hasSha256 ? (isArabic ? 'متاح في metadata' : 'present in metadata') : (isArabic ? 'غير متاح' : 'Unavailable')}</span>
      {canOpen && <button type="button" onClick={() => onOpenReference(uri)} className="inline-flex min-h-9 items-center gap-1 rounded-clinical px-2 font-semibold text-clinical-teal hover:bg-clinical-info-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus">{isArabic ? 'فتح السجل' : 'Open record'}<ArrowUpRight aria-hidden="true" className="size-3.5" /></button>}
    </div>
  );
}

export function RecommendationPanel({ recommendations, lang, canResolveUri, onOpenReference }: {
  recommendations: ClinicalGuidelineRecommendation[];
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
}) {
  if (!recommendations.length) return null;
  const isArabic = lang === 'ar';
  return (
    <ClinicalPanel title={isArabic ? 'توصيات مسجلة' : 'Recorded recommendations'}>
      <div className="space-y-3">
        {recommendations.map(rec => (
          <RecommendationRecord key={rec.id} recommendation={rec} lang={lang} canOpen={canResolveUri(rec.sourceLocationUri)} onOpenReference={onOpenReference} />
        ))}
      </div>
    </ClinicalPanel>
  );
}

function RecommendationRecord({ recommendation: rec, lang, canOpen, onOpenReference }: {
  recommendation: ClinicalGuidelineRecommendation;
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}) {
  const details = useSourceProvenance(rec.sourceId);
  const isArabic = lang === 'ar';
  const sourceIsGuideline = details.source?.sourceType === 'clinical_guideline' && Boolean(rec.guidelineTitleEn && rec.issuingOrganization && rec.publicationYear);
  const state = sourceIsGuideline ? 'guideline-recommendation' as const : details.state;
  return (
    <article className="space-y-3 rounded-clinical border border-clinical-border bg-clinical-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <SourceLayerBadge layer={details.layer} lang={lang} />
        <ContentProvenanceBadge state={state} lang={lang} />
      </div>
      <p className="text-xs text-clinical-muted">{unavailableValue(rec.issuingOrganization, lang)} · {unavailableValue(rec.publicationYear, lang)} · {isArabic ? 'التصنيف' : 'Class'}: {unavailableValue(rec.recommendationClass, lang)} · {isArabic ? 'مستوى الدليل' : 'Evidence'}: {unavailableValue(rec.evidenceLevel, lang)}</p>
      <h3 className="font-semibold text-clinical-text">{isArabic ? rec.recommendationTitleAr : rec.recommendationTitleEn}</h3>
      <p className="text-sm leading-6 text-clinical-text">{isArabic ? rec.recommendationTextAr : rec.recommendationTextEn}</p>
      {details.state === 'verbatim' && rec.verbatimExcerpt && (
        <blockquote className="border-s-2 border-clinical-teal bg-clinical-surface-subtle p-3 text-xs leading-6 text-clinical-text" dir="auto">{rec.verbatimExcerpt}</blockquote>
      )}
      {details.state !== 'verbatim' && rec.verbatimExcerpt && <p className="text-xs text-clinical-muted">{isArabic ? 'لم يُعرض مقتطف بوصفه حرفيًا لأن سجل المصدر الحالي لا يثبت طبقة النص الأصلي.' : 'Excerpt is not presented as verbatim because the current source record does not establish the original-text layer.'}</p>}
      <RecordSource sourceId={rec.sourceId} lang={lang} uri={rec.sourceLocationUri} pageRange={rec.pageRange} canOpen={canOpen} onOpenReference={onOpenReference} />
    </article>
  );
}

export function DiagnosticCriteriaTable({ table, lang, canOpen, onOpenReference }: {
  table: ClinicalTableOrAlgorithm;
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}) {
  return <ClinicalDataTable table={table} lang={lang} canOpen={canOpen} onOpenReference={onOpenReference} heading={lang === 'ar' ? 'جدول معايير تشخيصي مسجل' : 'Recorded diagnostic-criteria table'} />;
}

export function ClinicalDataTable({ table, lang, canOpen, onOpenReference, heading }: {
  table: ClinicalTableOrAlgorithm;
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
  heading?: string;
}) {
  const details = useSourceProvenance(table.sourceId);
  const headers = lang === 'ar' ? table.headersAr : table.headersEn;
  const rows = lang === 'ar' ? table.rowsAr : table.rowsEn;
  const isArabic = lang === 'ar';
  return (
    <ClinicalPanel title={heading || (isArabic ? table.titleAr : table.titleEn)} description={isArabic ? 'جدول كما هو مخزن في سجل المعرفة؛ لا تُستنتج خلايا أو قيم مفقودة.' : 'Table as stored in the knowledge record; missing cells or values are not inferred.'}>
      <div className="mb-3 flex flex-wrap gap-2"><SourceLayerBadge layer={details.layer} lang={lang} /><ContentProvenanceBadge state={details.state} lang={lang} /></div>
      <div className="max-w-full overflow-x-auto rounded-clinical border border-clinical-border" role="region" aria-label={isArabic ? table.titleAr : table.titleEn} tabIndex={0}>
        <table className="min-w-full border-collapse text-start text-xs">
          <thead className="sticky top-0 bg-clinical-surface-subtle text-clinical-text">
            <tr>{headers.map((header, index) => <th key={`${index}-${header}`} scope="col" className="whitespace-nowrap border-b border-clinical-border px-3 py-2.5 text-start font-semibold">{header}</th>)}</tr>
          </thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-clinical-border last:border-0">
            {row.map((cell, columnIndex) => <td key={columnIndex} className="min-w-24 max-w-80 whitespace-pre-wrap px-3 py-2.5 align-top leading-5 text-clinical-text">{cell}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      {(table.unitsAndFootnotesAr || table.unitsAndFootnotesEn) && <p className="mt-3 text-xs leading-5 text-clinical-muted">{isArabic ? table.unitsAndFootnotesAr : table.unitsAndFootnotesEn}</p>}
      <RecordSource sourceId={table.sourceId} lang={lang} uri={table.sourceLocationUri} pageRange={table.pageRange} canOpen={canOpen} onOpenReference={onOpenReference} />
    </ClinicalPanel>
  );
}

export function ClinicalAlgorithmPanel({ table, lang, canOpen, onOpenReference }: {
  table: ClinicalTableOrAlgorithm;
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}) {
  const details = useSourceProvenance(table.sourceId);
  const isArabic = lang === 'ar';
  const steps = table.algorithmSteps || [];
  if (!steps.length) return null;
  return (
    <ClinicalPanel title={isArabic ? table.titleAr : table.titleEn}>
      <div className="mb-3 flex flex-wrap gap-2"><SourceLayerBadge layer={details.layer} lang={lang} /><ContentProvenanceBadge state={details.state} lang={lang} /></div>
      <ol className="space-y-3">
        {steps.map(step => (
          <li key={step.stepNumber} className="flex gap-3 rounded-clinical border border-clinical-border p-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-clinical-info-soft text-xs font-bold text-clinical-info">{step.stepNumber}</span>
            <div className="min-w-0 space-y-1">
              <h3 className="font-semibold text-clinical-text">{isArabic ? step.stepTitleAr : step.stepTitleEn}</h3>
              <p className="text-sm leading-6 text-clinical-text">{isArabic ? step.clinicalConditionAr : step.clinicalConditionEn}</p>
              <p className="text-sm leading-6 text-clinical-muted">{isArabic ? step.actionAr : step.actionEn}</p>
              {(step.safetyRedFlagAr || step.safetyRedFlagEn) && <ClinicalAlert tone="warning" heading={isArabic ? 'تنبيه مسجل' : 'Recorded safety flag'}>{isArabic ? step.safetyRedFlagAr : step.safetyRedFlagEn}</ClinicalAlert>}
            </div>
          </li>
        ))}
      </ol>
      <RecordSource sourceId={table.sourceId} lang={lang} uri={table.sourceLocationUri} pageRange={table.pageRange} canOpen={canOpen} onOpenReference={onOpenReference} />
    </ClinicalPanel>
  );
}

export function ClinicalDosingRecords({ dosingRecords, lang, canResolveUri, onOpenReference }: {
  dosingRecords: ClinicalDrugDosing[];
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
}) {
  if (!dosingRecords.length) return null;
  const isArabic = lang === 'ar';
  return (
    <div className="space-y-3">
      <ClinicalAlert tone="warning" heading={isArabic ? 'سجلات جرعات من نموذج المعرفة' : 'Knowledge-record dosing data'}>
        {isArabic ? 'قد يعتمد السجل المتاح حاليًا على ملخص مضمّن. لا يُعد جدولًا علاجيًا موثوقًا أو توصية لمريض؛ راجع المصدر الأصلي وبياناته قبل أي استخدام سريري.' : 'The available record may resolve to an embedded summary. It is not an authoritative dosing table or patient recommendation; verify against the original source before any clinical use.'}
      </ClinicalAlert>
      {dosingRecords.map(record => <DosingRecord key={record.id} record={record} lang={lang} canOpen={canResolveUri(record.sourceLocationUri)} onOpenReference={onOpenReference} />)}
    </div>
  );
}

function DosingRecord({ record, lang, canOpen, onOpenReference }: {
  record: ClinicalDrugDosing;
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}) {
  const details = useSourceProvenance(record.sourceId);
  const isArabic = lang === 'ar';
  return (
    <article className="space-y-3 rounded-clinical border border-clinical-border bg-clinical-surface p-4">
      <div className="flex flex-wrap items-center gap-2"><SourceLayerBadge layer={details.layer} lang={lang} /><ContentProvenanceBadge state={details.state} lang={lang} /></div>
      <div>
        <h3 className="font-semibold text-clinical-text">{isArabic ? record.drugArabicName : record.drugGenericName}</h3>
        <p className="text-xs text-clinical-muted">{isArabic ? record.indicationLabelAr : record.indicationLabelEn} · {record.route} · {record.frequency}</p>
      </div>
      <p className="rounded-clinical bg-clinical-surface-subtle p-3 font-mono text-sm font-semibold text-clinical-text">{record.doseDisplay}</p>
      <p className="text-sm leading-6 text-clinical-text">{isArabic ? record.administrationInstructionsAr : record.administrationInstructionsEn}</p>
      {record.organAdjustments.length > 0 && <div className="space-y-2 border-t border-clinical-border pt-3"><h4 className="text-xs font-semibold text-clinical-text">{isArabic ? 'تعديلات مسجلة' : 'Recorded adjustments'}</h4>{record.organAdjustments.map(adjustment => <div key={adjustment.id} className="rounded-clinical border border-clinical-warning/30 bg-clinical-warning-soft p-3 text-xs"><p className="font-semibold text-clinical-warning">{adjustment.parameterName}: {adjustment.thresholdExpression}</p><p className="mt-1 text-clinical-text">{isArabic ? adjustment.adjustmentInstructionAr : adjustment.adjustmentInstructionEn}</p></div>)}</div>}
      <RecordSource sourceId={record.sourceId} lang={lang} uri={record.sourceLocationUri} pageRange={record.pageRange} canOpen={canOpen} onOpenReference={onOpenReference} />
    </article>
  );
}

export function ConflictEvidencePanel({ conflicts, lang, canResolveUri, onOpenReference }: {
  conflicts: KnowledgeConflictGroup[];
  lang: Language;
  canResolveUri: (uri: string) => boolean;
  onOpenReference: (uri: string) => void;
}) {
  if (!conflicts.length) return null;
  const isArabic = lang === 'ar';
  return (
    <ClinicalPanel title={isArabic ? 'تعارضات مسجلة في المستودع' : 'Conflicts recorded in the repository'}>
      <div className="space-y-4">
        {conflicts.map(conflict => <div key={conflict.id} className="space-y-3 rounded-clinical border border-clinical-warning/40 bg-clinical-warning-soft p-4">
          <div className="flex items-start gap-2"><AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-clinical-warning" /><h3 className="font-semibold text-clinical-text">{isArabic ? conflict.clinicalQuestionAr : conflict.clinicalQuestionEn}</h3></div>
          <div className="grid gap-3 md:grid-cols-2">
            {conflict.positions.map(position => <ConflictPosition key={position.positionId} position={position} lang={lang} canOpen={canResolveUri(position.sourceLocationUri)} onOpenReference={onOpenReference} />)}
          </div>
          <p className="text-sm leading-6 text-clinical-text">{isArabic ? conflict.resolutionGuidanceAr : conflict.resolutionGuidanceEn}</p>
          <p className="text-xs text-clinical-muted">{isArabic ? 'مراجع السجل' : 'Record reviewer field'}: {conflict.reviewedByPharmacist || (isArabic ? 'غير متاح' : 'Unavailable')}</p>
        </div>)}
      </div>
    </ClinicalPanel>
  );
}

function ConflictPosition({ position, lang, canOpen, onOpenReference }: {
  position: KnowledgeConflictGroup['positions'][number];
  lang: Language;
  canOpen: boolean;
  onOpenReference: (uri: string) => void;
}) {
  const details = useSourceProvenance(position.sourceId);
  const isArabic = lang === 'ar';
  return (
    <article className="space-y-2 rounded-clinical border border-clinical-border bg-clinical-surface p-3">
      <div className="flex flex-wrap gap-2"><SourceLayerBadge layer={details.layer} lang={lang} /><ContentProvenanceBadge state={details.state} lang={lang} /></div>
      <p className="text-sm font-medium leading-6 text-clinical-text">{isArabic ? position.positionStatementAr : position.positionStatementEn}</p>
      {details.state === 'verbatim' && position.verbatimExcerpt && <blockquote className="border-s-2 border-clinical-teal bg-clinical-surface-subtle p-2 text-xs leading-5 text-clinical-muted" dir="auto">{position.verbatimExcerpt}</blockquote>}
      {details.state !== 'verbatim' && position.verbatimExcerpt && <p className="text-xs text-clinical-muted">{isArabic ? 'المقتطف غير معروض كنص حرفي لأن طبقة المصدر الأصلي غير مثبتة في السجل الحالي.' : 'Excerpt is not shown as verbatim because the current record does not establish the original-source layer.'}</p>}
      <p className="text-xs text-clinical-muted">{unavailableValue(position.edition, lang)} · {unavailableValue(position.publicationYear, lang)} · {unavailableValue(position.pageRange, lang)}</p>
      {canOpen && <button type="button" onClick={() => onOpenReference(position.sourceLocationUri)} className="inline-flex min-h-9 items-center gap-1 rounded-clinical px-2 text-xs font-semibold text-clinical-teal hover:bg-clinical-info-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"><BookOpen aria-hidden="true" className="size-3.5" />{isArabic ? 'فتح سجل المصدر' : 'Open source record'}<ArrowUpRight aria-hidden="true" className="size-3.5" /></button>}
    </article>
  );
}

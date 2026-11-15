import { ClipboardCheck, FileText, Plus, Share2 } from 'lucide-react';
import type { ClinicalIntervention, Language } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

interface Props {
  lang: Language;
  interventions: ClinicalIntervention[];
  onNew: () => void;
  onShare: () => void;
}

export function InterventionWorkspaceHeader({ lang, interventions, onNew, onShare }: Props) {
  const isArabic = lang === 'ar';
  const pending = interventions.filter(item => item.status === 'pending').length;
  const accepted = interventions.filter(item => item.status === 'accepted').length;
  const high = interventions.filter(item => item.severity === 'high').length;
  const costAvoidance = interventions.reduce((sum, item) => sum + (item.costImpactEstimatedSAR || 0), 0);
  const metrics = [
    { label: isArabic ? 'كل التدخلات' : 'All interventions', value: interventions.length, tone: 'info' as const },
    { label: isArabic ? 'قيد المراجعة' : 'Pending review', value: pending, tone: pending ? 'review' as const : 'verified' as const },
    { label: isArabic ? 'تم اعتمادها' : 'Accepted', value: accepted, tone: 'verified' as const },
    { label: isArabic ? 'عالية الأثر' : 'High impact', value: high, tone: high ? 'critical' as const : 'verified' as const },
  ];

  return <ClinicalPanel
    title={<span className="flex items-center gap-2"><ClipboardCheck aria-hidden="true" className="size-5 text-clinical-teal" />{isArabic ? 'توثيق التدخلات وSOAP/DRP' : 'SOAP / DRP intervention workspace'}</span>}
    description={isArabic ? 'سجل المشكلة والتقييم والخطة، ثم تابع اعتماد الطبيب والأثر السريري والمالي.' : 'Document the issue, assessment, and plan, then track physician acceptance and clinical impact.'}
    actions={<div className="flex flex-wrap gap-2"><button type="button" onClick={onShare} className="inline-flex min-h-10 items-center gap-1.5 rounded-clinical border border-clinical-border px-3 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><Share2 aria-hidden="true" className="size-4 text-clinical-success" />{isArabic ? 'مشاركة السجل' : 'Share log'}</button><button type="button" onClick={onNew} className="inline-flex min-h-10 items-center gap-1.5 rounded-clinical bg-clinical-teal px-3 text-xs font-semibold text-white hover:brightness-95"><Plus aria-hidden="true" className="size-4" />{isArabic ? 'تدخل جديد' : 'New intervention'}</button></div>}
  >
    <div className="mb-3 flex items-center gap-2 text-xs text-clinical-muted"><FileText aria-hidden="true" className="size-4 text-clinical-teal" />{isArabic ? 'سجل موثق بصيغة SOAP مع ربط المرجع المحلي' : 'Structured SOAP record with linked local evidence'}<span className="ms-auto font-semibold text-clinical-success" dir="ltr">SAR {costAvoidance.toLocaleString()}</span></div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{metrics.map(metric => <div key={metric.label} className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-3"><ClinicalBadge tone={metric.tone}>{metric.label}</ClinicalBadge><div className="mt-2 text-2xl font-bold text-clinical-text" dir="ltr">{metric.value}</div></div>)}</div>
  </ClinicalPanel>;
}

import { BookOpen, Check, Clock, DollarSign, FileText, UserRound } from 'lucide-react';
import type { ClinicalIntervention, InterventionStatus, Language } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

interface Props { item: ClinicalIntervention; lang: Language; onAccept: (item: ClinicalIntervention) => void; onOpenReference?: (uri: string) => void; }

const statusTone: Record<InterventionStatus, 'review' | 'verified' | 'info' | 'critical'> = { pending: 'review', accepted: 'verified', modified: 'info', rejected: 'critical' };
const severityTone: Record<ClinicalIntervention['severity'], 'critical' | 'review' | 'info'> = { high: 'critical', medium: 'review', low: 'info' };

export function InterventionCard({ item, lang, onAccept, onOpenReference }: Props) {
  const isArabic = lang === 'ar';
  const statusLabel = { pending: isArabic ? 'قيد المراجعة' : 'Pending review', accepted: isArabic ? 'تم الاعتماد' : 'Accepted', modified: isArabic ? 'تم التعديل' : 'Modified', rejected: isArabic ? 'مرفوض' : 'Rejected' }[item.status];
  const severityLabel = { high: isArabic ? 'أثر عالٍ' : 'High impact', medium: isArabic ? 'أثر متوسط' : 'Medium impact', low: isArabic ? 'أثر منخفض' : 'Low impact' }[item.severity];
  return <ClinicalPanel className="overflow-hidden" contentClassName="p-4 sm:p-5" title={<div className="min-w-0"><div className="flex flex-wrap items-center gap-2 text-xs text-clinical-muted"><span>{item.patientName}</span><span aria-hidden="true">·</span><span dir="ltr">{item.mrn}</span><span aria-hidden="true">·</span><span dir="ltr">{item.ward} · {item.date}</span></div><h3 className="mt-1 text-base font-bold text-clinical-text"><span>{item.drpType.replaceAll('_', ' ')}</span><span className="mx-1 text-clinical-muted">—</span><span dir="ltr">{item.medicationInvolved}</span></h3></div>} actions={<div className="flex flex-wrap justify-end gap-1.5"><ClinicalBadge tone={severityTone[item.severity]}>{severityLabel}</ClinicalBadge><ClinicalBadge tone={statusTone[item.status]}>{item.status === 'pending' ? <Clock aria-hidden="true" className="size-3.5" /> : <Check aria-hidden="true" className="size-3.5" />}{statusLabel}</ClinicalBadge></div>}>
    <div className="grid gap-3 rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-3 sm:p-4">
      <SoapSection code="S/O" label={isArabic ? 'المشكلة والمعطيات السريرية' : 'Clinical issue & observations'} value={item.clinicalIssue} tone="info" />
      <SoapSection code="A" label={isArabic ? 'التقييم والدليل المرجعي' : 'Assessment & rationale'} value={item.rationale} tone="review" />
      <SoapSection code="P" label={isArabic ? 'الخطة والتوصية المقترحة' : 'Proposed pharmacotherapy plan'} value={item.proposedRecommendation} tone="verified" />
    </div>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-clinical-muted"><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-1"><UserRound aria-hidden="true" className="size-3.5 text-clinical-teal" />{item.pharmacist}</span>{item.costImpactEstimatedSAR !== undefined && <span className="inline-flex items-center gap-1 text-clinical-success"><DollarSign aria-hidden="true" className="size-3.5" />SAR {item.costImpactEstimatedSAR.toLocaleString()}</span>}</div>{item.referenceTitle && <button type="button" onClick={() => item.referenceSourceUrl && onOpenReference?.(item.referenceSourceUrl)} className="inline-flex max-w-full items-center gap-1.5 rounded-clinical border border-clinical-border px-2.5 py-1.5 font-medium text-clinical-teal hover:bg-clinical-surface-subtle"><BookOpen aria-hidden="true" className="size-3.5 shrink-0" /><span className="truncate">{item.referenceTitle}</span></button>}</div>
    {item.physicianFeedback && <div className="mt-3 flex items-start gap-2 rounded-clinical border border-clinical-success/30 bg-clinical-success-soft p-3 text-xs leading-5 text-clinical-success"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><span><strong>{isArabic ? 'ملاحظات الطبيب: ' : 'Physician feedback: '}</strong>{item.physicianFeedback}</span></div>}
    {item.status === 'pending' && <div className="mt-3 flex justify-end border-t border-clinical-border pt-3"><button type="button" onClick={() => onAccept(item)} className="inline-flex min-h-10 items-center gap-1.5 rounded-clinical bg-clinical-success px-3 text-xs font-semibold text-white hover:brightness-95"><Check aria-hidden="true" className="size-4" />{isArabic ? 'اعتماد التوصية' : 'Accept recommendation'}</button></div>}
  </ClinicalPanel>;
}

function SoapSection({ code, label, value, tone }: { code: string; label: string; value: string; tone: 'info' | 'review' | 'verified' }) { return <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-start"><ClinicalBadge tone={tone}>{code}</ClinicalBadge><div><div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-clinical-muted">{label}</div><p className="whitespace-pre-line text-sm leading-6 text-clinical-text">{value}</p></div></div>; }

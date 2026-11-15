import { AlertTriangle, BookOpen, ExternalLink, ShieldAlert } from 'lucide-react';
import type { Language } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';
import type { ClinicalBadgeTone } from '../ui/clinical';

interface AlertWorkspaceHeaderProps {
  lang: Language;
  patientCount: number;
  totalAlerts: number;
  criticalCount: number;
  interactionCount: number;
  renalAdjustmentCount: number;
  databaseCount: number;
  onOpenLocalReference?: () => void;
}

export function AlertWorkspaceHeader({ lang, patientCount, totalAlerts, criticalCount, interactionCount, renalAdjustmentCount, databaseCount, onOpenLocalReference }: AlertWorkspaceHeaderProps) {
  const isArabic = lang === 'ar';
  const metrics = [
    { label: isArabic ? 'تنبيهات نشطة' : 'Active alerts', value: totalAlerts, tone: (totalAlerts > 0 ? 'critical' : 'verified') as ClinicalBadgeTone },
    { label: isArabic ? 'حالات حرجة' : 'Critical', value: criticalCount, tone: (criticalCount > 0 ? 'critical' : 'verified') as ClinicalBadgeTone },
    { label: isArabic ? 'تداخلات دوائية' : 'Interactions', value: interactionCount, tone: (interactionCount > 0 ? 'review' : 'verified') as ClinicalBadgeTone },
    { label: isArabic ? 'تعديلات كلوية' : 'Renal adjustments', value: renalAdjustmentCount, tone: (renalAdjustmentCount > 0 ? 'info' : 'verified') as ClinicalBadgeTone },
  ];

  return (
    <ClinicalPanel
      title={<span className="flex items-center gap-2"><ShieldAlert aria-hidden="true" className="size-5 text-clinical-danger" />{isArabic ? 'مركز السلامة الدوائية والتداخلات' : 'Medication safety & interaction center'}</span>}
      description={isArabic ? 'مراجعة التنبيهات حسب الأولوية، ثم فحص التداخلات المرجعية قبل توثيق التدخل.' : 'Review alerts by priority, then verify reference-backed interactions before documenting an intervention.'}
      actions={<div className="flex flex-wrap gap-2"><ClinicalBadge tone="info">Stockley’s · {databaseCount} {isArabic ? 'سجل' : 'records'}</ClinicalBadge>{onOpenLocalReference && <button type="button" onClick={onOpenLocalReference} className="inline-flex min-h-9 items-center gap-1.5 rounded-clinical border border-clinical-border px-2.5 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><BookOpen aria-hidden="true" className="size-4 text-clinical-teal" />{isArabic ? 'فتح المرجع' : 'Open reference'}</button>}<a href="https://drive.google.com/file/d/1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 rounded-clinical border border-clinical-border px-2.5 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><ExternalLink aria-hidden="true" className="size-3.5 text-clinical-teal" /><span dir="ltr">PDF</span></a></div>}
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-clinical-muted"><AlertTriangle aria-hidden="true" className="size-4 text-clinical-warning" />{isArabic ? `الفحص الآلي مفعّل على ${patientCount} ملف مرضى` : `Automated scan is active across ${patientCount} patient profiles`}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{metrics.map(metric => <div key={metric.label} className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-3"><ClinicalBadge tone={metric.tone}>{metric.label}</ClinicalBadge><div className="mt-2 text-2xl font-bold text-clinical-text" dir="ltr">{metric.value}</div></div>)}</div>
    </ClinicalPanel>
  );
}

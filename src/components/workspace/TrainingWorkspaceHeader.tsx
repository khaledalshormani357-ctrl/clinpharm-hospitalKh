import { Database, FileDown, FlaskConical, GraduationCap, ListChecks } from 'lucide-react';
import type { Language } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

type TrainingMode = 'guide' | 'training' | 'testcases';
interface Props { lang: Language; activeMode: TrainingMode; onModeChange: (mode: TrainingMode) => void; syndromeCount: number; caseCount: number; completedCount: number; testCaseCount: number; onOpenReference: () => void; onExportReference: () => void; }

export function TrainingWorkspaceHeader({ lang, activeMode, onModeChange, syndromeCount, caseCount, completedCount, testCaseCount, onOpenReference, onExportReference }: Props) {
  const isArabic = lang === 'ar';
  const modes = [
    { id: 'guide' as const, icon: ListChecks, label: isArabic ? 'دليل أخذ الحالة' : 'Case-taking guide', count: syndromeCount, tone: 'info' as const },
    { id: 'training' as const, icon: GraduationCap, label: isArabic ? 'حالات التدريب' : 'Training cases', count: `${completedCount}/${caseCount}`, tone: 'review' as const },
    { id: 'testcases' as const, icon: FlaskConical, label: isArabic ? 'اختبارات التطبيق' : 'App test cases', count: testCaseCount, tone: 'verified' as const },
  ];
  return <ClinicalPanel
    title={<span className="flex items-center gap-2"><GraduationCap aria-hidden="true" className="size-5 text-clinical-teal" />{isArabic ? 'أكاديمية التدريب والحالات السريرية' : 'Clinical training & case academy'}</span>}
    description={isArabic ? 'تعلّم المنهجية، طبّقها على حالات تفاعلية، ثم اختبر جاهزية التطبيق بحالات معيارية.' : 'Learn the workflow, apply it to interactive cases, then validate the app with benchmark scenarios.'}
    actions={<div className="flex flex-wrap gap-2"><ClinicalBadge tone="info">{syndromeCount} {isArabic ? 'متلازمات' : 'syndromes'}</ClinicalBadge><ClinicalBadge tone="verified">{caseCount} {isArabic ? 'حالات' : 'cases'}</ClinicalBadge></div>}
  >
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2 text-xs text-clinical-muted"><Database aria-hidden="true" className="size-4 text-clinical-teal" />{isArabic ? 'قاعدة تدريب محلية مرتبطة بالمراجع السريرية' : 'Local training database linked to clinical references'}</div><div className="flex gap-2"><button type="button" onClick={onOpenReference} className="inline-flex min-h-9 items-center gap-1.5 rounded-clinical border border-clinical-border px-2.5 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><Database aria-hidden="true" className="size-3.5 text-clinical-teal" />{isArabic ? 'فتح الدليل' : 'Open guide'}</button><button type="button" onClick={onExportReference} className="inline-flex min-h-9 items-center gap-1.5 rounded-clinical border border-clinical-border px-2.5 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><FileDown aria-hidden="true" className="size-3.5 text-clinical-success" />{isArabic ? 'تصدير' : 'Export'}</button></div></div>
    <div className="grid gap-2 sm:grid-cols-3">{modes.map(mode => { const Icon = mode.icon; const selected = activeMode === mode.id; return <button key={mode.id} type="button" onClick={() => onModeChange(mode.id)} className={`flex min-h-14 items-center justify-between gap-2 rounded-clinical border px-3 text-start text-xs font-semibold ${selected ? 'border-clinical-teal bg-clinical-teal text-white shadow-clinical' : 'border-clinical-border bg-clinical-surface-subtle text-clinical-text hover:bg-clinical-surface'}`}><span className="flex min-w-0 items-center gap-2"><Icon aria-hidden="true" className="size-4 shrink-0" /><span className="truncate">{mode.label}</span></span><ClinicalBadge tone={selected ? 'neutral' : mode.tone}>{mode.count}</ClinicalBadge></button>; })}</div>
  </ClinicalPanel>;
}

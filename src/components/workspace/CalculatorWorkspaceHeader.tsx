import type { LucideIcon } from 'lucide-react';
import { Calculator, Printer } from 'lucide-react';
import type { Language } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

export type CalculatorCategory = 'all' | 'pediatrics' | 'pk_renal_electrolytes' | 'cardio_icu_hepatic' | 'converters';
export interface CalculatorNavItem { id: string; category: Exclude<CalculatorCategory, 'all'>; labelAr: string; labelEn: string; icon: LucideIcon; badge?: string; }
interface Props { lang: Language; categoryFilter: CalculatorCategory; onCategoryChange: (category: CalculatorCategory) => void; activeTab: string; onTabChange: (id: string) => void; tabs: CalculatorNavItem[]; onPrint: () => void; }

const categories: { key: CalculatorCategory; ar: string; en: string }[] = [
  { key: 'all', ar: 'كل الحاسبات', en: 'All calculators' },
  { key: 'pediatrics', ar: 'الأطفال والسوائل وPALS', en: 'Pediatrics, fluids & PALS' },
  { key: 'pk_renal_electrolytes', ar: 'الكلى والشوارد وTDM', en: 'Renal, electrolytes & TDM' },
  { key: 'cardio_icu_hepatic', ar: 'القلب والعناية والكبد', en: 'Cardio, ICU & hepatic' },
  { key: 'converters', ar: 'محولات الأدوية', en: 'Drug converters' },
];

export function CalculatorWorkspaceHeader({ lang, categoryFilter, onCategoryChange, activeTab, onTabChange, tabs, onPrint }: Props) {
  const isArabic = lang === 'ar';
  const visibleTabs = tabs.filter(tab => categoryFilter === 'all' || tab.category === categoryFilter);
  return <ClinicalPanel
    title={<span className="flex items-center gap-2"><Calculator aria-hidden="true" className="size-5 text-clinical-teal" />{isArabic ? 'مركز الحاسبات السريرية' : 'Clinical calculator workspace'}</span>}
    description={isArabic ? 'اختر مجموعة الحساب، ثم راجع المدخلات والنتيجة والتحذير السريري في لوحة واحدة.' : 'Choose a calculator suite, then review inputs, results, and clinical safety context in one workspace.'}
    actions={<button type="button" onClick={onPrint} className="inline-flex min-h-10 items-center gap-1.5 rounded-clinical border border-clinical-border px-3 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle"><Printer aria-hidden="true" className="size-4 text-clinical-teal" />{isArabic ? 'تقرير PDF' : 'PDF report'}</button>}
  >
    <div className="mb-3 flex items-center gap-2 text-xs text-clinical-muted"><ClinicalBadge tone="info">{tabs.length} {isArabic ? 'حاسبة' : 'calculators'}</ClinicalBadge><span>{isArabic ? 'معادلات سريرية محلية — تحقق من السياق قبل اتخاذ القرار.' : 'Local clinical equations — verify context before making decisions.'}</span></div>
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={isArabic ? 'مجموعات الحاسبات' : 'Calculator suites'}>{categories.map(category => <button key={category.key} type="button" role="tab" aria-selected={categoryFilter === category.key} onClick={() => { onCategoryChange(category.key); const first = tabs.find(tab => category.key === 'all' || tab.category === category.key); if (first) onTabChange(first.id); }} className={`min-h-10 shrink-0 rounded-clinical px-3 text-xs font-semibold ${categoryFilter === category.key ? 'bg-clinical-navy text-white' : 'border border-clinical-border text-clinical-muted hover:bg-clinical-surface-subtle'}`}>{isArabic ? category.ar : category.en}</button>)}</div>
    <div className="mt-3 flex gap-2 overflow-x-auto border-t border-clinical-border pt-3" role="tablist" aria-label={isArabic ? 'الحاسبات' : 'Calculators'}>{visibleTabs.map(tab => { const Icon = tab.icon; const selected = activeTab === tab.id; return <button key={tab.id} type="button" role="tab" aria-selected={selected} onClick={() => onTabChange(tab.id)} className={`flex min-h-10 shrink-0 items-center gap-1.5 rounded-clinical px-3 text-xs font-semibold ${selected ? 'bg-clinical-teal text-white' : 'border border-clinical-border text-clinical-muted hover:bg-clinical-surface-subtle'}`}><Icon aria-hidden="true" className="size-4" /><span>{isArabic ? tab.labelAr : tab.labelEn}</span>{tab.badge && <ClinicalBadge tone={selected ? 'neutral' : 'info'}>{tab.badge}</ClinicalBadge>}</button>; })}</div>
  </ClinicalPanel>;
}

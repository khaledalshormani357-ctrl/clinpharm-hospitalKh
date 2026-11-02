import {
  BookOpen,
  Calculator,
  Ellipsis,
  ShieldAlert,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { AppTab } from '../../lib/navigation';
import type { Language } from '../../types/clinical';

interface Props {
  activeTab: AppTab;
  lang: Language;
  labels: { patients: string; guidelines: string; calculators: string; alerts: string; more: string };
  onNavigate: (tab: AppTab) => void;
  onOpenDrawer: () => void;
}

export function MobileBottomNavigation({ activeTab, lang, labels, onNavigate, onOpenDrawer }: Props) {
  const safetyActive = activeTab === 'alerts' || activeTab === 'interventions';
  const items: Array<{ tab: AppTab; label: string; icon: LucideIcon; active: boolean; onClick: () => void }> = [
    { tab: 'patients', label: labels.patients, icon: Users, active: activeTab === 'patients', onClick: () => onNavigate('patients') },
    { tab: 'guidelines', label: labels.guidelines, icon: BookOpen, active: activeTab === 'guidelines', onClick: () => onNavigate('guidelines') },
    { tab: 'calculators', label: labels.calculators, icon: Calculator, active: activeTab === 'calculators', onClick: () => onNavigate('calculators') },
    { tab: safetyActive ? activeTab : 'alerts', label: labels.alerts, icon: ShieldAlert, active: safetyActive, onClick: () => onNavigate(activeTab === 'alerts' ? 'interventions' : 'alerts') },
  ];

  return (
    <nav
      aria-label={lang === 'ar' ? 'التنقل السفلي' : 'Mobile bottom navigation'}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-clinical-border bg-clinical-surface/95 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-lg md:hidden"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-5 px-1">
        {items.map(({ tab, label, icon: Icon, active, onClick }) => (
          <button
            key={tab}
            type="button"
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
            className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-clinical text-[10px] leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clinical-focus ${active ? 'font-bold text-clinical-teal' : 'font-medium text-clinical-muted'}`}
          >
            <span className={`flex size-8 items-center justify-center rounded-full ${active ? 'bg-clinical-info-soft' : ''}`}>
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <span className="max-w-full truncate">{label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-haspopup="dialog"
          aria-label={labels.more}
          className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-clinical text-[10px] font-medium leading-tight text-clinical-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clinical-focus"
        >
          <span className="flex size-8 items-center justify-center rounded-full">
            <Ellipsis aria-hidden="true" className="size-5" />
          </span>
          <span className="max-w-full truncate">{labels.more}</span>
        </button>
      </div>
    </nav>
  );
}

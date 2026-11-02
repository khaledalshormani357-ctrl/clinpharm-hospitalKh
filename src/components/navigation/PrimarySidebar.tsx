import { useState } from 'react';
import {
  Crown,
  BookOpen,
  Calculator,
  ChevronLeft,
  ClipboardList,
  FileCheck,
  GraduationCap,
  ShieldAlert,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { AppTab, NavigationEntry } from '../../lib/navigation';
import type { Language } from '../../types/clinical';

const ICONS: Record<NavigationEntry['icon'], LucideIcon> = {
  patients: Users,
  reconciliation: FileCheck,
  calculators: Calculator,
  alerts: ShieldAlert,
  interventions: ClipboardList,
  guidelines: BookOpen,
  training: GraduationCap,
  users_admin: Crown,
};

const COLLAPSED_KEY = 'clinpharm-navigation-collapsed';

function readCollapsedPreference(): boolean {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
}

interface Props {
  entries: NavigationEntry[];
  activeTab: AppTab;
  lang: Language;
  onNavigate: (tab: AppTab) => void;
}

export function PrimarySidebar({ entries, activeTab, lang, onNavigate }: Props) {
  const [collapsed, setCollapsed] = useState(readCollapsedPreference);

  const toggleCollapsed = () => {
    setCollapsed(current => {
      const next = !current;
      try {
        localStorage.setItem(COLLAPSED_KEY, String(next));
      } catch {
        // Navigation remains usable when storage is unavailable.
      }
      return next;
    });
  };

  return (
    <aside className={`sticky top-16 hidden h-[calc(100dvh-4rem)] shrink-0 flex-col border-e border-clinical-border bg-clinical-surface md:flex ${collapsed ? 'w-16' : 'w-60'}`}>
      <nav aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="flex-1 space-y-1 overflow-y-auto p-2">
        {entries.map(entry => {
          const Icon = ICONS[entry.icon];
          const active = entry.tab === activeTab;
          return (
            <button
              key={entry.tab}
              type="button"
              onClick={() => onNavigate(entry.tab)}
              aria-current={active ? 'page' : undefined}
              aria-label={collapsed ? entry.label : undefined}
              title={collapsed ? entry.label : undefined}
              data-testid={`nav-${entry.tab}`}
              className={`flex min-h-11 w-full items-center gap-3 rounded-clinical px-3 text-start text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus ${collapsed ? 'justify-center px-0' : ''} ${active ? 'bg-clinical-navy font-semibold text-white' : 'text-clinical-text hover:bg-clinical-surface-subtle'}`}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              {!collapsed && <span className="min-w-0 truncate">{entry.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-clinical-border p-2">
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? (lang === 'ar' ? 'توسيع القائمة الجانبية' : 'Expand sidebar') : (lang === 'ar' ? 'طي القائمة الجانبية' : 'Collapse sidebar')}
          aria-expanded={!collapsed}
          data-testid="sidebar-collapse"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-clinical text-sm text-clinical-muted hover:bg-clinical-surface-subtle hover:text-clinical-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
        >
          <ChevronLeft aria-hidden="true" className={`size-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>{lang === 'ar' ? 'طي القائمة' : 'Collapse'}</span>}
        </button>
      </div>
    </aside>
  );
}

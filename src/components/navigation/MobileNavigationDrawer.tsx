import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Crown,
  BookOpen,
  Calculator,
  ClipboardList,
  FileCheck,
  GraduationCap,
  ShieldAlert,
  Users,
  X,
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

interface Props {
  open: boolean;
  entries: NavigationEntry[];
  activeTab: AppTab;
  lang: Language;
  utilityActions?: ReactNode;
  onNavigate: (tab: AppTab) => void;
  onRequestClose: () => void;
}

export function MobileNavigationDrawer({
  open,
  entries,
  activeTab,
  lang,
  utilityActions,
  onNavigate,
  onRequestClose,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onRequestClose);
  closeRef.current = onRequestClose;

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = dialogRef.current?.querySelector<HTMLElement>('button:not([disabled])');
    focusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden" data-testid="mobile-drawer">
      <button
        type="button"
        aria-label={lang === 'ar' ? 'إغلاق قائمة التنقل' : 'Close navigation menu'}
        onClick={onRequestClose}
        className="absolute inset-0 h-full w-full bg-slate-950/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="absolute inset-y-0 start-0 flex w-[min(20rem,88vw)] flex-col border-e border-clinical-border bg-clinical-surface shadow-2xl"
      >
        <div className="flex min-h-14 items-center justify-between border-b border-clinical-border px-4">
          <h2 className="text-sm font-bold text-clinical-text">{lang === 'ar' ? 'التنقل' : 'Navigation'}</h2>
          <button
            type="button"
            onClick={onRequestClose}
            aria-label={lang === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
            className="inline-flex size-10 items-center justify-center rounded-clinical text-clinical-muted hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <nav aria-label={lang === 'ar' ? 'كل أقسام التطبيق' : 'All application sections'} className="flex-1 space-y-1 overflow-y-auto p-3">
          {entries.map(entry => {
            const Icon = ICONS[entry.icon];
            const active = entry.tab === activeTab;
            return (
              <button
                key={entry.tab}
                type="button"
                onClick={() => onNavigate(entry.tab)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-12 w-full items-center gap-3 rounded-clinical px-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus ${active ? 'bg-clinical-navy font-semibold text-white' : 'text-clinical-text hover:bg-clinical-surface-subtle'}`}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span className="min-w-0 truncate">{entry.label}</span>
              </button>
            );
          })}
        </nav>
        {utilityActions && (
          <div className="border-t border-clinical-border p-3">
            <p className="mb-2 text-xs font-semibold text-clinical-muted">{lang === 'ar' ? 'أدوات التطبيق' : 'Application tools'}</p>
            <div className="grid gap-2">{utilityActions}</div>
          </div>
        )}
      </div>
    </div>
  );
}

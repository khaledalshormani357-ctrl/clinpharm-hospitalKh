import * as React from 'react';
import { Globe, Menu, Moon, Stethoscope, Sun } from 'lucide-react';
import type { Language } from '../../types/clinical';

interface Props {
  appName: string;
  contextLabel: string;
  activeLabel: string;
  lang: Language;
  darkMode: boolean;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  children?: React.ReactNode;
}

export function GlobalHeader({
  appName,
  contextLabel,
  activeLabel,
  lang,
  darkMode,
  onToggleLanguage,
  onToggleTheme,
  onOpenMenu,
  children,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-clinical-border bg-clinical-surface/95 shadow-clinical backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={lang === 'ar' ? 'فتح قائمة التنقل' : 'Open navigation menu'}
            aria-haspopup="dialog"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-clinical border border-clinical-border text-clinical-text hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus md:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-clinical bg-clinical-navy text-white sm:size-10">
            <Stethoscope aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight text-clinical-navy dark:text-clinical-text sm:text-base">
              {appName}
            </h1>
            <p className="truncate text-[11px] text-clinical-muted">
              <span className="md:hidden" aria-live="polite">{activeLabel}</span>
              <span className="hidden md:inline">{contextLabel}</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <div className="hidden items-center gap-1.5 md:flex">{children}</div>
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1 rounded-clinical border border-clinical-border px-2 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
          >
            <Globe aria-hidden="true" className="size-4 text-clinical-teal" />
            <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? (lang === 'ar' ? 'الوضع الفاتح' : 'Light mode') : (lang === 'ar' ? 'الوضع الداكن' : 'Dark mode')}
            aria-pressed={darkMode}
            className="inline-flex size-10 items-center justify-center rounded-clinical border border-clinical-border text-clinical-text hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
          >
            {darkMode ? <Sun aria-hidden="true" className="size-4 text-clinical-warning" /> : <Moon aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

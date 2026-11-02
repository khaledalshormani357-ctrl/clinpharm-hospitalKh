import type { ReactNode } from 'react';
import type { Language } from '../../types/clinical';

interface Props {
  lang: Language;
  children?: ReactNode;
}

export function ContextualSidebar({ lang, children }: Props) {
  if (!children) return null;
  return (
    <aside
      aria-label={lang === 'ar' ? 'معلومات سياقية' : 'Contextual information'}
      className="sticky top-16 hidden max-h-[calc(100dvh-4rem)] w-72 shrink-0 overflow-y-auto border-s border-clinical-border bg-clinical-surface-subtle p-4 xl:block"
    >
      {children}
    </aside>
  );
}

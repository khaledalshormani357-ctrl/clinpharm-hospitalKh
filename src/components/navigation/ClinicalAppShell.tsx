import type { ReactNode } from 'react';

interface Props {
  header: ReactNode;
  primarySidebar: ReactNode;
  contextualSidebar?: ReactNode;
  mobileBottomNavigation: ReactNode;
  mobileDrawer: ReactNode;
  children: ReactNode;
}

export function ClinicalAppShell({
  header,
  primarySidebar,
  contextualSidebar,
  mobileBottomNavigation,
  mobileDrawer,
  children,
}: Props) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {document.documentElement.lang === 'ar' ? 'تخطٍ إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>
      {header}
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-screen-2xl items-stretch">
        {primarySidebar}
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        {contextualSidebar}
      </div>
      {mobileBottomNavigation}
      {mobileDrawer}
    </>
  );
}

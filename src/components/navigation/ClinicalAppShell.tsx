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
      {header}
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-screen-2xl items-stretch">
        {primarySidebar}
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
        {contextualSidebar}
      </div>
      {mobileBottomNavigation}
      {mobileDrawer}
    </>
  );
}

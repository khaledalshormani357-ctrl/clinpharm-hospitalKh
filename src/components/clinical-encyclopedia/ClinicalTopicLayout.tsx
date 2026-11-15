import type { ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  header: ReactNode;
  sectionNavigation: ReactNode;
  children: ReactNode;
  lang: 'ar' | 'en';
}

export function ClinicalTopicLayout({ sidebar, header, sectionNavigation, children, lang }: Props) {
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-[calc(100dvh-4rem)] bg-clinical-bg pb-20 text-clinical-text md:pb-6" data-testid="clinical-topic-layout">
      <div className="mx-auto flex max-w-screen-2xl items-start">
        {sidebar}
        <div className="min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-5 lg:px-7">
          {header}
          <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start">
            <main className="min-w-0 space-y-4" data-testid="topic-article-content">{children}</main>
            <div className="min-w-0">{sectionNavigation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

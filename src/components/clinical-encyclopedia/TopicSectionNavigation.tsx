import { useState } from 'react';
import { ChevronDown, ListTree } from 'lucide-react';
import type { ClinicalTopicSection, TopicSectionKey } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';

interface Props {
  sections: ClinicalTopicSection[];
  activeSection?: TopicSectionKey;
  lang: Language;
  onNavigate: (sectionKey: TopicSectionKey) => void;
}

function SectionLinks({ sections, activeSection, lang, onNavigate }: Props) {
  return (
    <nav aria-label={lang === 'ar' ? 'أقسام الموضوع' : 'Topic sections'} className="space-y-1">
      {sections.map(section => {
        const active = activeSection === section.sectionKey;
        return (
          <button key={section.id} type="button" onClick={() => onNavigate(section.sectionKey)} aria-current={active ? 'location' : undefined} className={`min-h-10 w-full rounded-clinical px-2.5 py-2 text-start text-xs leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus ${active ? 'border-s-2 border-clinical-teal bg-clinical-info-soft font-semibold text-clinical-teal' : 'text-clinical-muted hover:bg-clinical-surface-subtle hover:text-clinical-text'}`}>
            <span className="me-1 font-mono tabular-nums text-[10px]">{String(section.sectionOrder).padStart(2, '0')}</span>
            {lang === 'ar' ? section.titleAr : section.titleEn}
          </button>
        );
      })}
    </nav>
  );
}

export function TopicSectionNavigation(props: Props) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const isArabic = props.lang === 'ar';
  return (
    <>
      <details open={mobileExpanded} onToggle={event => setMobileExpanded(event.currentTarget.open)} className="mb-4 rounded-clinical border border-clinical-border bg-clinical-surface xl:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-clinical-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clinical-focus">
          <ListTree aria-hidden="true" className="size-4 text-clinical-teal" />
          <span className="flex-1">{isArabic ? 'في هذه الصفحة' : 'On this page'}</span>
          <ChevronDown aria-hidden="true" className={`size-4 transition-transform motion-reduce:transition-none ${mobileExpanded ? 'rotate-180' : ''}`} />
        </summary>
        <div className="max-h-60 overflow-y-auto border-t border-clinical-border p-2">
          <SectionLinks {...props} />
        </div>
      </details>
      <aside className="sticky top-20 hidden max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-clinical border border-clinical-border bg-clinical-surface p-3 xl:block" aria-label={isArabic ? 'في هذه الصفحة' : 'On this page'}>
        <h2 className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-clinical-muted">{isArabic ? 'في هذه الصفحة' : 'On this page'}</h2>
        <SectionLinks {...props} />
      </aside>
    </>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Database } from 'lucide-react';
import { useClinicalKnowledgeGraph } from '../../hooks/useClinicalKnowledgeGraph';
import { useTopicHistory } from '../../hooks/useTopicHistory';
import { buildSpecialtyGroups } from '../../lib/knowledgeGraph/specialtyGroups';
import { clinicalTopicHash, parseClinicalTopicHash } from '../../lib/knowledgeGraph/topicRoutes';
import type { ClinicalTopic, TopicSectionKey } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import { ClinicalEmptyState, ClinicalPanel } from '../ui/clinical';
import { ClinicalTopicHeader } from './ClinicalTopicHeader';
import { ClinicalTopicLayout } from './ClinicalTopicLayout';
import { ClinicalTopicSidebar, type TopicListFilter, type TopicSortMode } from './ClinicalTopicSidebar';
import { TopicSectionNavigation } from './TopicSectionNavigation';
import { ClinicalSectionRenderer } from './ClinicalSectionRenderer';
import { hasDrawerHistoryMarker, useBackDismiss } from '../../hooks/useBackDismiss';

interface Props {
  lang: Language;
  onOpenReference: (uri: string) => void;
}

function scrollToTopicSection(sectionKey: TopicSectionKey, lang: Language) {
  const element = document.getElementById(`topic-section-${sectionKey}`);
  if (!element || typeof element.scrollIntoView !== 'function') return;
  element.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

export function ClinicalEncyclopediaPage({ lang, onOpenReference }: Props) {
  const { catalog, getTopic, search, resolveUri } = useClinicalKnowledgeGraph();
  const { favorites, recentTopics, toggleFavorite, recordVisit } = useTopicHistory();
  const [topicRoute, setTopicRoute] = useState(() => typeof window === 'undefined' ? null : parseClinicalTopicHash(window.location.hash));
  const [mobileTopicDrawerOpen, setMobileTopicDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTopicIds, setSearchTopicIds] = useState<string[] | undefined>();
  const [filter, setFilter] = useState<TopicListFilter>('all');
  const [sortMode, setSortMode] = useState<TopicSortMode>('category');
  const [activeSectionKey, setActiveSectionKey] = useState<TopicSectionKey | undefined>();
  const closeTopicDrawer = useCallback(() => {
    setMobileTopicDrawerOpen(false);
    if (typeof window !== 'undefined' && hasDrawerHistoryMarker(window.history.state)) window.history.back();
  }, []);
  useBackDismiss(mobileTopicDrawerOpen, () => setMobileTopicDrawerOpen(false));
  const groups = useMemo(() => buildSpecialtyGroups(catalog), [catalog]);
  const topicCatalogRecord = topicRoute
    ? catalog.find(item => item.slug === topicRoute.topicSlug || item.id === topicRoute.topicSlug)
    : catalog[0];
  const topic: ClinicalTopic | null = topicCatalogRecord ? getTopic(topicCatalogRecord.id) ?? null : null;
  const populatedSections = useMemo(
    () => topic?.sectionsManifest.filter(section => section.availabilityStatus === 'populated').sort((a, b) => a.sectionOrder - b.sectionOrder) || [],
    [topic]
  );
  const defaultSection = populatedSections[0]?.sectionKey;
  const currentSectionKey = topicRoute?.sectionKey && populatedSections.some(section => section.sectionKey === topicRoute.sectionKey)
    ? topicRoute.sectionKey
    : defaultSection;

  useEffect(() => {
    const syncRoute = () => setTopicRoute(parseClinicalTopicHash(window.location.hash));
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchTopicIds(undefined);
      return;
    }
    const timer = window.setTimeout(() => {
      setSearchTopicIds(search(searchQuery).map(match => match.topic.id));
    }, 180);
    return () => window.clearTimeout(timer);
  }, [search, searchQuery]);

  useEffect(() => {
    if (topic) recordVisit(topic.id);
  }, [topic?.id, recordVisit]);

  useEffect(() => {
    setActiveSectionKey(currentSectionKey);
  }, [topic?.id, currentSectionKey]);

  useEffect(() => {
    if (!topicRoute?.sectionKey) return;
    const section = populatedSections.find(item => item.sectionKey === topicRoute.sectionKey);
    if (!section) return;
    const scroll = () => scrollToTopicSection(section.sectionKey, lang);
    if (typeof window.requestAnimationFrame !== 'function') {
      scroll();
      return;
    }
    const frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame?.(frame);
  }, [topic?.id, topicRoute?.sectionKey, populatedSections, lang]);

  useEffect(() => {
    if (!topic || typeof IntersectionObserver === 'undefined') return;
    const elements = populatedSections
      .map(section => document.getElementById(`topic-section-${section.sectionKey}`))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      const key = visible?.target.getAttribute('data-section-key') as TopicSectionKey | null;
      if (key) setActiveSectionKey(key);
    }, { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.1, 0.5] });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [topic?.id, populatedSections]);

  const updateHash = (slug: string, sectionKey?: TopicSectionKey, replace = false) => {
    const hash = clinicalTopicHash(slug, sectionKey);
    const url = `${window.location.pathname}${window.location.search}${hash}`;
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method](window.history.state, '', url);
    setTopicRoute(parseClinicalTopicHash(hash));
  };

  const handleSelectTopic = (topicId: string) => {
    const selected = catalog.find(item => item.id === topicId);
    const replaceDrawerEntry = mobileTopicDrawerOpen && hasDrawerHistoryMarker(window.history.state);
    if (selected) updateHash(selected.slug, undefined, replaceDrawerEntry);
    if (replaceDrawerEntry) window.history.replaceState({}, '', window.location.href);
    setFilter('all');
    setSearchQuery('');
    setSearchTopicIds(undefined);
    setMobileTopicDrawerOpen(false);
  };

  const handleNavigateSection = (sectionKey: TopicSectionKey) => {
    if (!topic || !populatedSections.some(section => section.sectionKey === sectionKey)) return;
    setActiveSectionKey(sectionKey);
    updateHash(topic.slug, sectionKey);
    scrollToTopicSection(sectionKey, lang);
  };

  const canResolveUri = (uri: string) => Boolean(resolveUri(uri));
  const handleOpenKnowledgeTarget = (uri: string) => {
    const target = resolveUri(uri);
    if (!target) return;
    if (target.targetType === 'knowledge_topic' && target.topicSlug) {
      updateHash(target.topicSlug, target.sectionKey);
      setMobileTopicDrawerOpen(false);
      return;
    }
    onOpenReference(uri);
  };

  const isArabic = lang === 'ar';
  if (!topic) {
    const unknown = Boolean(topicRoute?.topicSlug);
    return (
      <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-[60vh] bg-clinical-bg p-4 sm:p-6">
        <ClinicalPanel title={isArabic ? 'الموسوعة السريرية' : 'Clinical encyclopedia'}>
          <ClinicalEmptyState title={unknown ? (isArabic ? 'الموضوع غير موجود' : 'Topic not found') : (isArabic ? 'لا توجد موضوعات بعد' : 'No topics available yet')} description={unknown ? (isArabic ? 'الرابط لا يطابق موضوعًا في مستودع المعرفة الحالي.' : 'The link does not match a topic in the current knowledge repository.') : undefined} icon={<Database />} />
        </ClinicalPanel>
      </div>
    );
  }

  return (
    <ClinicalTopicLayout
      lang={lang}
      sidebar={
        <ClinicalTopicSidebar
          topics={catalog}
          groups={groups}
          selectedTopicId={topic.id}
          selectedSpecialtyId={null}
          favoriteIds={favorites}
          recentIds={recentTopics}
          searchQuery={searchQuery}
          searchTopicIds={searchTopicIds}
          filter={filter}
          sortMode={sortMode}
          lang={lang}
          mobileOpen={mobileTopicDrawerOpen}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilter}
          onSortModeChange={setSortMode}
          onSpecialtySelect={() => undefined}
          onSelectTopic={handleSelectTopic}
          onToggleFavorite={toggleFavorite}
          onCloseMobile={closeTopicDrawer}
        />
      }
      header={<ClinicalTopicHeader topic={topic} lang={lang} isFavorite={favorites.includes(topic.id)} onToggleFavorite={() => toggleFavorite(topic.id)} onOpenTopics={() => setMobileTopicDrawerOpen(true)} />}
      sectionNavigation={<TopicSectionNavigation sections={populatedSections} activeSection={activeSectionKey} lang={lang} onNavigate={handleNavigateSection} />}
    >
      {populatedSections.length ? populatedSections.map(section => (
        <ClinicalSectionRenderer
          key={`${topic.id}-${section.id}`}
          topic={topic}
          section={section}
          lang={lang}
          active={activeSectionKey === section.sectionKey}
          canResolveUri={canResolveUri}
          onOpenReference={onOpenReference}
          onOpenTopicTarget={handleOpenKnowledgeTarget}
        />
      )) : (
        <ClinicalEmptyState title={isArabic ? 'لا توجد أقسام بمحتوى متاح حاليًا' : 'No populated sections available'} description={isArabic ? 'لم تُنشأ أقسام بديلة أو موضوعات تجريبية.' : 'No placeholder sections or topics were created.'} icon={<BookOpen />} />
      )}
    </ClinicalTopicLayout>
  );
}

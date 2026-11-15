import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Search, Star, X } from 'lucide-react';
import type { TopicSummaryIndexItem } from '../../types/knowledgeGraph';
import type { Language } from '../../types/clinical';
import type { SpecialtyGroup } from '../../lib/knowledgeGraph/specialtyGroups';
import { ClinicalEmptyState } from '../ui/clinical';

export type TopicListFilter = 'all' | 'favorites' | 'recent';
export type TopicSortMode = 'alphabetical' | 'category';

interface Props {
  topics: TopicSummaryIndexItem[];
  groups: SpecialtyGroup[];
  selectedTopicId?: string;
  selectedSpecialtyId?: string | null;
  favoriteIds: string[];
  recentIds: string[];
  searchQuery: string;
  searchTopicIds?: string[];
  filter: TopicListFilter;
  sortMode: TopicSortMode;
  lang: Language;
  mobileOpen: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: TopicListFilter) => void;
  onSortModeChange: (value: TopicSortMode) => void;
  onSpecialtySelect: (id: string | null) => void;
  onSelectTopic: (topicId: string) => void;
  onToggleFavorite: (topicId: string) => void;
  onCloseMobile: () => void;
}

function topicTitle(topic: TopicSummaryIndexItem, lang: Language): string {
  return lang === 'ar' ? topic.arabicName : topic.englishName;
}

export function ClinicalTopicSidebar({
  topics,
  groups,
  selectedTopicId,
  selectedSpecialtyId,
  favoriteIds,
  recentIds,
  searchQuery,
  searchTopicIds,
  filter,
  sortMode,
  lang,
  mobileOpen,
  onSearchChange,
  onFilterChange,
  onSortModeChange,
  onSpecialtySelect,
  onSelectTopic,
  onToggleFavorite,
  onCloseMobile
}: Props) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(groups.filter(group => group.count > 0).map(group => group.id))
  );
  const isArabic = lang === 'ar';

  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = document.querySelector<HTMLElement>('[data-testid="topic-drawer"] [role="dialog"]');
    if (!dialog) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const closeButton = dialog.querySelector<HTMLElement>('[data-topic-drawer-close]');
    closeButton?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseMobile();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('keydown', handleKeyDown);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [mobileOpen, onCloseMobile]);

  const filteredTopics = useMemo(() => {
    let result = [...topics];
    if (filter === 'favorites') result = result.filter(topic => favoriteIds.includes(topic.id));
    if (filter === 'recent') result = recentIds.flatMap(id => {
      const match = result.find(topic => topic.id === id);
      return match ? [match] : [];
    });
    if (selectedSpecialtyId) {
      const group = groups.find(item => item.id === selectedSpecialtyId);
      result = group ? result.filter(topic => group.topics.some(candidate => candidate.id === topic.id)) : [];
    }
    if (searchQuery.trim() && searchTopicIds) {
      const allowed = new Set(searchTopicIds);
      result = result.filter(topic => allowed.has(topic.id));
    }
    if (filter !== 'recent') {
      result.sort((a, b) => topicTitle(a, lang).localeCompare(topicTitle(b, lang), isArabic ? 'ar' : 'en'));
    }
    return result;
  }, [topics, filter, favoriteIds, recentIds, selectedSpecialtyId, groups, searchQuery, searchTopicIds, lang, isArabic]);

  const toggleGroup = (id: string) => {
    setExpandedGroups(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderTopic = (topic: TopicSummaryIndexItem) => {
    const active = selectedTopicId === topic.id;
    const favorite = favoriteIds.includes(topic.id);
    return (
      <div key={topic.id} className={`flex min-w-0 items-start gap-1 rounded-clinical ${active ? 'bg-clinical-info-soft' : 'hover:bg-clinical-surface-subtle'}`}>
        <button
          type="button"
          onClick={() => { onSelectTopic(topic.id); onCloseMobile(); }}
          aria-current={active ? 'page' : undefined}
          className={`min-h-11 min-w-0 flex-1 px-2.5 py-2 text-start text-sm leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clinical-focus ${active ? 'font-semibold text-clinical-teal' : 'text-clinical-text'}`}
        >
          <span className="block truncate">{topicTitle(topic, lang)}</span>
          <span className="mt-0.5 block truncate text-[11px] text-clinical-muted">{isArabic ? topic.specialtyAr : topic.specialty}</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleFavorite(topic.id)}
          aria-pressed={favorite}
          aria-label={favorite
            ? (isArabic ? `إزالة ${topicTitle(topic, lang)} من المفضلة` : `Remove ${topicTitle(topic, lang)} from favorites`)
            : (isArabic ? `إضافة ${topicTitle(topic, lang)} إلى المفضلة` : `Add ${topicTitle(topic, lang)} to favorites`)}
          className="m-1 inline-flex size-9 shrink-0 items-center justify-center rounded-clinical text-clinical-muted hover:bg-clinical-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
        >
          <Star aria-hidden="true" className={`size-4 ${favorite ? 'fill-clinical-warning text-clinical-warning' : ''}`} />
        </button>
      </div>
    );
  };

  const renderContents = () => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-clinical-border px-4 py-3">
        <div>
          <h2 className="text-sm font-bold text-clinical-text">{isArabic ? 'الموضوعات السريرية' : 'Clinical topics'}</h2>
          <p className="mt-0.5 text-xs text-clinical-muted">{isArabic ? `${topics.length} موضوعات موجودة` : `${topics.length} existing topics`}</p>
        </div>
        <button type="button" data-topic-drawer-close onClick={onCloseMobile} aria-label={isArabic ? 'إغلاق الموضوعات' : 'Close topics'} className="inline-flex size-9 items-center justify-center rounded-clinical text-clinical-muted hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus md:hidden">
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="space-y-3 border-b border-clinical-border p-3">
        <label className="relative block">
          <span className="sr-only">{isArabic ? 'البحث في الموضوعات' : 'Search topics'}</span>
          <Search aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-clinical-muted" />
          <input
            type="search"
            value={searchQuery}
            onChange={event => onSearchChange(event.target.value)}
            placeholder={isArabic ? 'ابحث في الموضوعات…' : 'Search topics…'}
            dir={isArabic ? 'rtl' : 'ltr'}
            className="min-h-11 w-full rounded-clinical border border-clinical-border bg-clinical-surface ps-9 pe-3 text-sm text-clinical-text placeholder:text-clinical-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus"
          />
        </label>
        <div className="grid grid-cols-3 gap-1" role="group" aria-label={isArabic ? 'تصفية الموضوعات' : 'Topic filters'}>
          {(['all', 'favorites', 'recent'] as const).map(value => {
            const active = filter === value;
            const label = value === 'all' ? (isArabic ? 'الكل' : 'All') : value === 'favorites' ? (isArabic ? 'المفضلة' : 'Favorites') : (isArabic ? 'الأخيرة' : 'Recent');
            return <button key={value} type="button" aria-pressed={active} onClick={() => onFilterChange(value)} className={`min-h-10 rounded-clinical px-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus ${active ? 'bg-clinical-navy font-semibold text-white' : 'text-clinical-muted hover:bg-clinical-surface-subtle'}`}>{label}</button>;
          })}
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-clinical-muted">
          <span>{isArabic ? 'ترتيب العرض' : 'View'}</span>
          <select value={sortMode} onChange={event => onSortModeChange(event.target.value as TopicSortMode)} className="min-h-9 min-w-0 flex-1 rounded-clinical border border-clinical-border bg-clinical-surface px-2 text-clinical-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus">
            <option value="category">{isArabic ? 'حسب الفئة' : 'By category'}</option>
            <option value="alphabetical">{isArabic ? 'أبجديًا' : 'Alphabetical'}</option>
          </select>
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2" data-testid="topic-list">
        {searchQuery.trim() || filter !== 'all' || sortMode === 'alphabetical' || selectedSpecialtyId ? (
          <div className="space-y-1">
            {selectedSpecialtyId && <button type="button" onClick={() => onSpecialtySelect(null)} className="mb-2 min-h-9 w-full rounded-clinical px-2 text-start text-xs font-semibold text-clinical-teal hover:bg-clinical-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus">{isArabic ? 'عرض كل الفئات' : 'Show all categories'}</button>}
            {filteredTopics.map(renderTopic)}
            {!filteredTopics.length && (
              <ClinicalEmptyState
                title={searchQuery.trim() ? (isArabic ? 'لا توجد موضوعات مطابقة' : 'No matching topics') : filter === 'favorites' ? (isArabic ? 'لا توجد مفضلات بعد' : 'No favorites yet') : filter === 'recent' ? (isArabic ? 'لا توجد موضوعات حديثة' : 'No recent topics') : (isArabic ? 'لا توجد موضوعات بعد' : 'No topics yet')}
                description={searchQuery.trim() ? (isArabic ? 'جرّب مصطلحًا آخر أو امسح البحث.' : 'Try another term or clear the search.') : undefined}
                className="py-6"
              />
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {groups.map(group => {
              const expanded = expandedGroups.has(group.id);
              return (
                <section key={group.id} className="rounded-clinical border border-transparent hover:border-clinical-border">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => { toggleGroup(group.id); onSpecialtySelect(null); }}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-clinical px-2.5 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-focus ${selectedSpecialtyId === group.id ? 'bg-clinical-info-soft font-semibold text-clinical-teal' : 'text-clinical-text hover:bg-clinical-surface-subtle'}`}
                  >
                    {expanded ? <ChevronDown aria-hidden="true" className="size-4 shrink-0" /> : <ChevronRight aria-hidden="true" className="size-4 shrink-0" />}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{isArabic ? group.labelAr : group.labelEn}</span>
                      {group.count === 0 && <span className="mt-0.5 block text-[10px] font-normal text-clinical-muted">{isArabic ? 'لا توجد موضوعات متاحة بعد' : 'No topics available yet'}</span>}
                    </span>
                    <span className="rounded-full bg-clinical-surface-subtle px-2 py-0.5 text-xs tabular-nums text-clinical-muted">{group.count}</span>
                  </button>
                  {expanded && (
                    <div className="ms-3 border-s border-clinical-border py-1 ps-2">
                      {group.topics.length ? group.topics.map(renderTopic) : <p className="px-2.5 py-2 text-xs text-clinical-muted">{isArabic ? 'لا توجد موضوعات متاحة بعد' : 'No topics available yet'}</p>}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside aria-label={isArabic ? 'قائمة الموضوعات السريرية' : 'Clinical topic list'} className="sticky top-16 hidden h-[calc(100dvh-8rem)] min-h-[32rem] w-72 shrink-0 flex-col overflow-hidden border-e border-clinical-border bg-clinical-surface md:flex">
        {renderContents()}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-[75] md:hidden" data-testid="topic-drawer">
          <button type="button" aria-label={isArabic ? 'إغلاق قائمة الموضوعات' : 'Close topic list'} onClick={onCloseMobile} className="absolute inset-0 h-full w-full bg-slate-950/50" />
          <aside role="dialog" aria-modal="true" aria-label={isArabic ? 'قائمة الموضوعات' : 'Topic list'} dir={isArabic ? 'rtl' : 'ltr'} className="absolute inset-y-0 start-0 flex w-[min(22rem,90vw)] flex-col border-e border-clinical-border bg-clinical-surface pb-safe shadow-2xl">
            {renderContents()}
          </aside>
        </div>
      )}
    </>
  );
}

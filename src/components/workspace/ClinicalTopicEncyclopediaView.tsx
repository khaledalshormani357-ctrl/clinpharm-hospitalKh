import { useState, useMemo } from 'react';
import { Language } from '../../types/clinical';
import {
  TopicSectionKey,
  KnowledgeStatement,
  KnowledgeConflictGroup,
  ClinicalDrugDosing,
  ClinicalTableOrAlgorithm,
  ClinicalGuidelineRecommendation,
  TopicRelationship
} from '../../types/knowledgeGraph';
import {
  getTopicSummaryCatalog,
  getClinicalTopicMetadata,
  getLazySectionPayload,
  getTopicConflictGroups,
  getTopicRelationships,
  getTopicDrugLinks,
  getKnowledgeSourceById,
  getKnowledgeGraphSectionCacheStats,
  clearKnowledgeGraphSectionCache,
  searchKnowledgeGraphPrototype,
  resolveKnowledgeGraphUri
} from '../../lib/knowledgeGraph/prototypeRepository';
import {
  BookOpen,
  Search,
  GitCompare,
  Scale,
  Network,
  FileText,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Database,
  Pill,
  Table as TableIcon,
  Compass
} from 'lucide-react';

interface Props {
  lang: Language;
  initialTopicIdOrSlug?: string;
  onOpenVerbatimCitation: (bookId: string, chapterId: string, sectionId?: string) => void;
}

type ProvenanceLayerMode = 'all_three' | 'summary_only' | 'verbatim_only';

export function ClinicalTopicEncyclopediaView({
  lang,
  initialTopicIdOrSlug,
  onOpenVerbatimCitation
}: Props) {
  const catalog = useMemo(() => getTopicSummaryCatalog(), []);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicIdOrSlug || catalog[0]?.id || 'topic-dka'
  );
  const [activeSectionKey, setActiveSectionKey] = useState<TopicSectionKey>('overview_definition');
  const [provenanceMode, setProvenanceMode] = useState<ProvenanceLayerMode>('all_three');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cacheVersion, setCacheVersion] = useState<number>(0);

  const activeTopic = useMemo(
    () => getClinicalTopicMetadata(selectedTopicId) || getClinicalTopicMetadata('topic-dka')!,
    [selectedTopicId]
  );

  // Lazy load ONLY the currently selected section payload (Android WebView memory-safe)
  const activeSectionPayload = useMemo(() => {
    void cacheVersion;
    return (
      getLazySectionPayload(activeTopic.id, activeSectionKey) ||
      getLazySectionPayload(activeTopic.id, 'overview_definition')!
    );
  }, [activeTopic.id, activeSectionKey, cacheVersion]);

  const cacheStats = useMemo(() => {
    void cacheVersion;
    return getKnowledgeGraphSectionCacheStats();
  }, [activeSectionPayload, cacheVersion]);

  const allTopicConflicts = useMemo(
    () => getTopicConflictGroups(activeTopic.id),
    [activeTopic.id]
  );

  const allTopicRelationships = useMemo(
    () => getTopicRelationships(activeTopic.id),
    [activeTopic.id]
  );

  const topicDrugLinks = useMemo(
    () => getTopicDrugLinks(activeTopic.id),
    [activeTopic.id]
  );

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchKnowledgeGraphPrototype(searchQuery);
  }, [searchQuery]);

  const handleNavigateUri = (uri: string) => {
    const resolved = resolveKnowledgeGraphUri(uri);
    if (!resolved) return;

    if (resolved.targetType === 'knowledge_topic' && resolved.topicId) {
      setSelectedTopicId(resolved.topicId);
      setActiveSectionKey(resolved.sectionKey || 'overview_definition');
      return;
    }

    if (resolved.targetType === 'verbatim_chapter_section' && resolved.verbatimChapterId) {
      onOpenVerbatimCitation(
        resolved.verbatimBookId || 'dipiro-13th-ed',
        resolved.verbatimChapterId,
        resolved.verbatimSectionId
      );
    }
  };

  const handleClearSectionCache = () => {
    clearKnowledgeGraphSectionCache();
    setCacheVersion(v => v + 1);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Clinical Topic Bar & Search */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Prototype Topic Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 me-1">
              {lang === 'ar' ? 'المواضيع السريرية المعتمدة (النموذج الأولي):' : 'Clinical Topics (Phase 3 Prototype):'}
            </span>
            {catalog.map(item => {
              const isSelected = item.id === activeTopic.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedTopicId(item.id);
                    setActiveSectionKey('overview_definition');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>{lang === 'ar' ? item.arabicName.split('(')[0].trim() : item.canonicalName}</span>
                  <span className="font-mono text-[11px] opacity-80">
                    ({item.contributingSourceCount} {lang === 'ar' ? 'مراجع' : 'sources'})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Provenance Mode Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحث في المواضيع أو الجرعات أو التعارضات...'
                    : 'Search topics, doses, conflicts...'
                }
                className="w-full ps-9 pe-3 py-1.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setProvenanceMode('all_three')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  provenanceMode === 'all_three'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {lang === 'ar' ? 'الطبقات الثلاث (ملخص + نص أصلي + مراجعة)' : 'All 3 Provenance Layers'}
              </button>
              <button
                type="button"
                onClick={() => setProvenanceMode('summary_only')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  provenanceMode === 'summary_only'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {lang === 'ar' ? 'الخلاصة السريرية فقط' : 'Clinical Summary'}
              </button>
              <button
                type="button"
                onClick={() => setProvenanceMode('verbatim_only')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  provenanceMode === 'verbatim_only'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {lang === 'ar' ? 'النص الحرفي الأصلي' : 'Verbatim Source'}
              </button>
            </div>
          </div>
        </div>

        {/* Live Search Dropdown Results */}
        {searchQuery.trim() && (
          <div className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {lang === 'ar'
                  ? `نتائج البحث في شبكة المعرفة (${searchMatches.length}):`
                  : `Knowledge Graph Search Matches (${searchMatches.length}):`}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
              >
                {lang === 'ar' ? 'إغلاق البحث' : 'Clear'}
              </button>
            </div>
            {searchMatches.length === 0 ? (
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'لا توجد نتائج مطابقة.' : 'No matching statements or topics.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {searchMatches.map(match => (
                  <button
                    key={match.topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(match.topic.id);
                      if (match.matchingSectionKeys[0]) {
                        setActiveSectionKey(match.matchingSectionKeys[0]);
                      }
                      setSearchQuery('');
                    }}
                    className="text-start p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-500 transition-colors"
                  >
                    <div className="font-bold text-xs text-teal-700 dark:text-teal-300">
                      {lang === 'ar' ? match.topic.arabicName : match.topic.englishName}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {lang === 'ar' ? match.snippetAr : match.snippetEn}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Split Workspace: Left 20-Section Navigation + Right Lazy-Loaded Section Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Sidebar: 20-Section Manifest with Honest Availability Counts */}
        <aside className="w-full lg:w-80 xl:w-88 shrink-0 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800 flex flex-col max-h-64 lg:max-h-none overflow-y-auto">
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'ar'
                ? 'فهرس الأقسام السريرية (20 قسماً معيارياً)'
                : 'Clinical Topic Structure (20 Sections)'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
              {lang === 'ar'
                ? `الذاكرة الكسولة (LRU Cache): ${cacheStats.cachedSectionCount}/${cacheStats.maxCacheCapacity} أقسام محملة`
                : `Lazy LRU Cache: ${cacheStats.cachedSectionCount}/${cacheStats.maxCacheCapacity} sections in RAM`}
              {' · '}
              <button
                type="button"
                onClick={handleClearSectionCache}
                className="text-teal-600 dark:text-teal-400 hover:underline font-sans font-semibold"
              >
                {lang === 'ar' ? 'تفريغ الذاكرة' : 'Purge RAM'}
              </button>
            </div>
          </div>

          <nav className="p-2 space-y-1 overflow-y-auto flex-1">
            {activeTopic.sectionsManifest.map(sec => {
              const isCurrent = sec.sectionKey === activeSectionKey;
              const isNotDocumented =
                sec.availabilityStatus === 'not_documented_in_current_sources';
              const hasConflict = allTopicConflicts.some(c => c.sectionId === sec.id);

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionKey(sec.sectionKey)}
                  className={`w-full text-start px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-teal-700 text-white font-bold shadow-2xs'
                      : isNotDocumented
                        ? 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">
                    {lang === 'ar' ? sec.titleAr : sec.titleEn}
                  </span>
                  <span className="shrink-0 flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
                    {hasConflict && (
                      <span
                        title={
                          lang === 'ar'
                            ? 'يحتوي على مقارنة اختلاف بين المراجع'
                            : 'Contains preserved inter-source conflict'
                        }
                      >
                        <Scale
                          className={`w-3.5 h-3.5 ${
                            isCurrent ? 'text-amber-200' : 'text-amber-600 dark:text-amber-400'
                          }`}
                        />
                      </span>
                    )}
                    {isNotDocumented ? (
                      <span className="opacity-75">{lang === 'ar' ? 'غير موثق' : 'N/A'}</span>
                    ) : (
                      <span className="opacity-85">
                        {sec.populatedStatementCount} · {sec.sourceIds.length}S
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Reader Pane: Topic Header + Active Lazy-Loaded Section */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Topic Monograph Header Card */}
          <header className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-teal-700 dark:text-teal-400 tabular-nums">
                  {activeTopic.hierarchyPath.join(' › ')} · ICD-10: {activeTopic.icd10Codes.join(', ')} · SNOMED-CT: {activeTopic.snomedCodes.join(', ')}
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {lang === 'ar' ? activeTopic.arabicName : activeTopic.englishName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                  {lang === 'ar' ? activeTopic.descriptionAr : activeTopic.descriptionEn}
                </p>
              </div>
            </div>

            {/* Contributing Sources & Quick Jump to Conflicts / Related Topics */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'المراجع المشاركة فعلياً في هذا الموضوع:' : 'Verified Contributing Sources:'}
                </span>
                {activeTopic.contributingSources.map((srcId, idx) => {
                  const src = getKnowledgeSourceById(srcId);
                  return (
                    <span key={srcId} className="font-medium text-teal-700 dark:text-teal-300">
                      {src ? (lang === 'ar' ? src.shortBadgeAr : src.shortBadgeEn) : srcId}
                      {idx < activeTopic.contributingSources.length - 1 ? ' · ' : ''}
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {allTopicConflicts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSectionKey('therapeutic_protocols')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold text-xs transition-colors"
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ar'
                        ? `${allTopicConflicts.length} اختلافات مرجعية موثقة`
                        : `${allTopicConflicts.length} Preserved Source Conflicts`}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveSectionKey('related_topics')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-500/30 font-bold text-xs transition-colors"
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? `${allTopicRelationships.length} مواضيع مترابطة`
                      : `${allTopicRelationships.length} Connected Graph Nodes`}
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Active Lazy-Loaded Section Body */}
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {lang === 'ar'
                    ? activeSectionPayload.section.titleAr
                    : activeSectionPayload.section.titleEn}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5">
                  {lang === 'ar'
                    ? `حالة التوثيق: ${
                        activeSectionPayload.section.availabilityStatus === 'populated'
                          ? `موثق (${activeSectionPayload.statements.length} قاعدة سريرية مستخلصة)`
                          : 'غير مفصل كإحصاء مستقل في الفصول الحالية'
                      }`
                    : `Availability: ${activeSectionPayload.section.availabilityStatus} · Statements loaded: ${activeSectionPayload.statements.length}`}
                </p>
              </div>
            </div>

            {/* Honest Not-Documented State (Anti-Hallucination Requirement #4 & #7) */}
            {activeSectionPayload.section.availabilityStatus ===
              'not_documented_in_current_sources' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <Database className="w-4 h-4 text-teal-600" />
                  <span>
                    {lang === 'ar'
                      ? 'شفافية المصدر السريري (عدم اختلاق بيانات غير موجودة في المراجع)'
                      : 'Strict Source Transparency (Zero Unverified AI Extrapolation)'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar'
                    ? activeSectionPayload.section.availabilityNoteAr
                    : activeSectionPayload.section.availabilityNoteEn}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSectionKey('etiology_precipitants')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors"
                  >
                    <span>
                      {lang === 'ar'
                        ? 'الانتقال إلى القسم 4: الأسباب والمحفزات الموثقة'
                        : 'Go to Section 4: Documented Etiology & Precipitants'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Preserved Conflict Comparison Cards in this Section */}
            {activeSectionPayload.conflictGroups.length > 0 && (
              <div className="space-y-4">
                {activeSectionPayload.conflictGroups.map((conflict: KnowledgeConflictGroup) => (
                  <div
                    key={conflict.id}
                    className="bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-300/80 dark:border-amber-800/60 p-5 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          {lang === 'ar'
                            ? 'مقارنة توصيات مرجعية غير مدمجة (آلية إدارة التعارض بين المصادر)'
                            : 'Preserved Multi-Source Evidence Discrepancy (Unmerged Recommendations)'}
                        </div>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                          {lang === 'ar' ? conflict.clinicalQuestionAr : conflict.clinicalQuestionEn}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {conflict.positions.map(pos => (
                        <div
                          key={pos.positionId}
                          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="text-xs font-mono text-teal-700 dark:text-teal-300 font-bold">
                              {lang === 'ar' ? pos.sourceBadgeAr : pos.sourceBadgeEn} · {pos.edition} ({pos.publicationYear}) · {pos.pageRange}
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                              {lang === 'ar' ? pos.positionStatementAr : pos.positionStatementEn}
                            </p>
                            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-[11px] font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                              "{pos.verbatimExcerpt}"
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                            <span>{pos.chapterReference}</span>
                            <button
                              type="button"
                              onClick={() => handleNavigateUri(pos.sourceLocationUri)}
                              className="inline-flex items-center gap-1 font-bold text-teal-700 dark:text-teal-400 hover:underline"
                            >
                              <span>{lang === 'ar' ? 'فتح النص الأصلي' : 'Open Verbatim Source'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      <span className="font-extrabold text-amber-900 dark:text-amber-300 me-1.5">
                        {lang === 'ar' ? 'التوجيه السريري التوفيقي (مراجعة الصيدلي المختص):' : 'Specialist Pharmacist Resolution Guidance:'}
                      </span>
                      {lang === 'ar' ? conflict.resolutionGuidanceAr : conflict.resolutionGuidanceEn}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3-Layer Provenance Knowledge Statements */}
            <div className="space-y-4">
              {activeSectionPayload.statements.map((stmt: KnowledgeStatement) => (
                <article
                  key={stmt.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4"
                >
                  {/* Statement Metadata Header (Typographic separators, zero static pills) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {stmt.verificationStatus === 'verified_multi_source'
                          ? lang === 'ar'
                            ? 'متعدد المصادر (Multi-Source Verified)'
                            : 'Multi-Source Verified'
                          : stmt.verificationStatus === 'conflicting_evidence'
                            ? lang === 'ar'
                              ? 'تباين مرجعي محفوظ (Preserved Conflict)'
                              : 'Preserved Multi-Source Conflict'
                            : lang === 'ar'
                              ? 'مصدر مرجعي موثق (Single-Source Verified)'
                              : 'Single-Source Verified'}
                      </span>
                      {stmt.recommendationStrength ? ` · ${stmt.recommendationStrength}` : ''}
                      {stmt.evidenceLevel ? ` · ${stmt.evidenceLevel}` : ''}
                      {` · Method: ${stmt.generationMethod}`}
                    </div>
                    <div>
                      {stmt.citations.length} {lang === 'ar' ? 'توثيق مرجعي' : 'Citation(s)'}
                    </div>
                  </div>

                  {/* Layer 1: Extracted Structured Clinical Statement */}
                  {(provenanceMode === 'all_three' || provenanceMode === 'summary_only') && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'ar'
                            ? 'الطبقة 1: القاعدة السريرية المستخلصة (Structured Clinical Statement)'
                            : 'Layer 1: Structured Clinical Synthesis'}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                        {lang === 'ar' ? stmt.statementTextAr : stmt.statementTextEn}
                      </p>
                    </div>
                  )}

                  {/* Layer 2: Unabridged Verbatim Original Source Text */}
                  {(provenanceMode === 'all_three' || provenanceMode === 'verbatim_only') && (
                    <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'ar'
                            ? 'الطبقة 2: النص الأصلي الحرفي من المرجع (Verbatim Source Text — LTR)'
                            : 'Layer 2: Unabridged Verbatim Source Excerpt'}
                        </span>
                      </div>
                      <p
                        dir="ltr"
                        className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        "{stmt.verbatimSourceText}"
                      </p>
                    </div>
                  )}

                  {/* Layer 3: Specialist Clinician-Reviewed Note (When Present) */}
                  {provenanceMode === 'all_three' &&
                    (stmt.clinicianReviewedNoteEn || stmt.clinicianReviewedNoteAr) && (
                      <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/70 dark:border-teal-800/50 text-xs text-teal-950 dark:text-teal-200 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                          <span>
                            {lang === 'ar'
                              ? `الطبقة 3: مراجعة المختص السريري (${stmt.reviewedBySpecialist || 'Clinical Specialist'})`
                              : `Layer 3: Specialist Pharmacist Review (${stmt.reviewedBySpecialist || 'Clinical Specialist'})`}
                          </span>
                        </div>
                        <p>
                          {lang === 'ar'
                            ? stmt.clinicianReviewedNoteAr
                            : stmt.clinicianReviewedNoteEn}
                        </p>
                      </div>
                    )}

                  {/* Traceable Citations Bar with Clickable Deep Links */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {lang === 'ar'
                        ? 'المصادر المرجعية الدقيقة الداعمة لهذه المعلومة (اضغط للانتقال إلى الفصل والصفحة):'
                        : 'Traceable Source Citations (Click to open exact book, chapter & section):'}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {stmt.citations.map(cit => {
                        const sourceMeta = getKnowledgeSourceById(cit.sourceId);
                        return (
                          <div
                            key={cit.id}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                                {sourceMeta
                                  ? lang === 'ar'
                                    ? sourceMeta.shortBadgeAr
                                    : sourceMeta.shortBadgeEn
                                  : cit.sourceId}
                                {' · '}
                                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                                  {cit.edition} · Ch. {cit.chapterNumber} · {cit.pageRange}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {cit.sectionReference}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleNavigateUri(cit.sourceLocationUri)}
                              className="shrink-0 px-2.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                            >
                              <BookOpen className="w-3 h-3" />
                              <span>{lang === 'ar' ? 'فتح المرجع' : 'Source'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Structured Drug Dosing & Organ Adjustment Cards (Sections 11 & 12) */}
            {activeSectionPayload.drugDosing.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-600" />
                  <span>
                    {lang === 'ar'
                      ? 'بطاقات الجرعات المهيكلة وتعديلات الأعضاء وبوابات الأمان'
                      : 'Structured Pharmacotherapy Dosing & Organ Adjustment Rules'}
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {activeSectionPayload.drugDosing.map((dosing: ClinicalDrugDosing) => (
                    <div
                      key={dosing.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-teal-800 dark:text-teal-300">
                            {lang === 'ar' ? dosing.drugArabicName : dosing.drugGenericName}
                          </h4>
                          <div className="text-xs text-slate-500 font-mono">
                            {lang === 'ar' ? dosing.indicationLabelAr : dosing.indicationLabelEn} · {dosing.route} · {dosing.frequency}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavigateUri(dosing.sourceLocationUri)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-bold hover:underline"
                        >
                          <span>{dosing.pageRange}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        {dosing.doseDisplay}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {lang === 'ar'
                          ? dosing.administrationInstructionsAr
                          : dosing.administrationInstructionsEn}
                      </p>

                      {dosing.organAdjustments.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {lang === 'ar'
                              ? 'بوابات تعديل الجرعة حسب وظائف الأعضاء والشوارد:'
                              : 'Organ Function & Electrolyte Dosing Gates:'}
                          </div>
                          {dosing.organAdjustments.map(adj => (
                            <div
                              key={adj.id}
                              className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 text-xs space-y-1"
                            >
                              <div className="font-mono font-bold text-amber-900 dark:text-amber-300">
                                {adj.parameterName}: {adj.thresholdExpression} ({adj.actionType})
                              </div>
                              <p className="text-slate-800 dark:text-slate-200">
                                {lang === 'ar'
                                  ? adj.adjustmentInstructionAr
                                  : adj.adjustmentInstructionEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Clinical Tables & Stepwise Algorithms */}
            {activeSectionPayload.tablesAndAlgorithms.length > 0 && (
              <div className="space-y-4 pt-2">
                {activeSectionPayload.tablesAndAlgorithms.map((tbl: ClinicalTableOrAlgorithm) => {
                  const headers = lang === 'ar' ? tbl.headersAr : tbl.headersEn;
                  const rows = lang === 'ar' ? tbl.rowsAr : tbl.rowsEn;
                  return (
                    <div
                      key={tbl.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                      <div className="px-5 py-3.5 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                          <TableIcon className="w-4 h-4 text-teal-600" />
                          <span>{lang === 'ar' ? tbl.titleAr : tbl.titleEn}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavigateUri(tbl.sourceLocationUri)}
                          className="text-xs font-bold text-teal-700 dark:text-teal-300 inline-flex items-center gap-1 hover:underline"
                        >
                          <span>{tbl.pageRange}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-start border-collapse">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                              {headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-300 text-start"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {rows.map((r, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                              >
                                {r.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-4 py-3 align-top leading-relaxed ${
                                      cIdx === 0
                                        ? 'font-bold text-slate-900 dark:text-white'
                                        : 'text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Structured Guideline Recommendations (Section 17) */}
            {activeSectionPayload.guidelineRecommendations.length > 0 && (
              <div className="space-y-3 pt-2">
                {activeSectionPayload.guidelineRecommendations.map(
                  (rec: ClinicalGuidelineRecommendation) => (
                    <div
                      key={rec.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-2"
                    >
                      <div className="text-xs font-mono text-teal-700 dark:text-teal-400 font-bold">
                        {rec.issuingOrganization} ({rec.publicationYear}) · Class: {rec.recommendationClass} · Evidence: {rec.evidenceLevel} · Trials: {rec.landmarkTrials.join(', ')}
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        {lang === 'ar' ? rec.recommendationTitleAr : rec.recommendationTitleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {lang === 'ar' ? rec.recommendationTextAr : rec.recommendationTextEn}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Semantically Linked Clinical Topics Graph Cards (Section 19) */}
            {activeSectionPayload.relationships.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lang === 'ar'
                    ? `علاقات شبكة المعرفة الطبية الموثقة (${activeSectionPayload.relationships.length} علاقة دلالية قابلة للتنقل):`
                    : `Verified Medical Knowledge Graph Edges (${activeSectionPayload.relationships.length} Navigable Semantic Links):`}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeSectionPayload.relationships.map((rel: TopicRelationship) => (
                    <div
                      key={rel.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-mono text-teal-700 dark:text-teal-400">
                          {rel.relationshipType.toUpperCase()} · {rel.targetTopicType} · {rel.chapterReference}
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {lang === 'ar' ? rel.targetTopicTitleAr : rel.targetTopicTitleEn}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === 'ar'
                            ? rel.relationshipDescriptionAr
                            : rel.relationshipDescriptionEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          {rel.pageRange}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleNavigateUri(rel.targetTopicUri)}
                          className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>
                            {rel.targetTopicUri.startsWith('local://ref/topic/')
                              ? lang === 'ar'
                                ? 'فتح الموضوع السريري'
                                : 'Open Clinical Topic'
                              : lang === 'ar'
                                ? 'فتح الفصل المرجعي'
                                : 'Open Source Monograph'}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Normalized Topic-to-Drug Links Summary Footer */}
            {activeSectionKey === 'pharmacotherapy_dosing' && topicDrugLinks.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'الربط العلائقي المهيكل للأدوية (clinical_topic_drugs):'
                    : 'Normalized Relational Drug Links (clinical_topic_drugs):'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topicDrugLinks.map(link => (
                    <div
                      key={link.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <div className="font-bold text-slate-900 dark:text-white">
                        {lang === 'ar' ? link.drugArabicName : link.drugGenericName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Role: {link.therapeuticRole} · {link.lineOfTherapy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

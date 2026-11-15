import { useState, useMemo, useRef, useEffect } from 'react';
import { Language } from '../../types/clinical';
import {
  getAllVerbatimBooks,
  getVerbatimChapterById,
  searchVerbatimLibrary,
  exportChapterMarkdown,
  VerbatimChapter,
  VerbatimBook,
  MedicalSystemCategory
} from '../../lib/library';
import {
  hydrateSyncedFullBooks,
  getSyncedFullBookByIdSync,
  SyncedFullBookRecord
} from '../../lib/googleDrive/fullBookIdb';
import {
  downloadOfflinePdfFromVault,
  formatStorageBytes
} from '../../lib/googleDrive/pdfOfflineStorageService';
import {
  GoogleDriveBookSyncModal,
  getProcessingStatusBadgeMeta
} from './GoogleDriveBookSyncModal';
import { PdfPageCanvasViewer } from './PdfPageCanvasViewer';
import {
  BookOpen,
  Search,
  Bookmark,
  FileDown,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  List,
  SlidersHorizontal,
  Table,
  ArrowUpRight,
  Info,
  Maximize2,
  Minimize2,
  Type,
  ExternalLink,
  BookMarked,
  CloudDownload,
  FileText,
  Printer,
  Share2,
  Columns2,
  Network
} from 'lucide-react';
import { printOrSaveClinicalPdf, shareClinicalFile } from '../../lib/androidPermissions';
import { resolveKnowledgeGraphUri } from '../../lib/knowledgeGraph/prototypeRepository';
import { ClinicalEncyclopediaPage } from '../clinical-encyclopedia/ClinicalEncyclopediaPage';

interface Props {
  lang: Language;
  initialChapterId?: string;
  onAskCopilot?: (prompt: string) => void;
  onNavigateLocalRef?: (uri: string) => void;
}

export function ClinicalLibraryViewer({
  lang,
  initialChapterId,
  onAskCopilot,
  onNavigateLocalRef
}: Props) {
  const [libraryVersion, setLibraryVersion] = useState(0);
  const [driveSyncModalOpen, setDriveSyncModalOpen] = useState(false);
  const [libraryEntryMode, setLibraryEntryMode] = useState<'clinical_topics' | 'verbatim_books'>(
    initialChapterId ? 'verbatim_books' : 'clinical_topics'
  );
  const [readerViewMode, setReaderViewMode] = useState<
    'verbatim_text' | 'pdf_canvas' | 'side_by_side'
  >('verbatim_text');
  const [activePdfPage, setActivePdfPage] = useState<number>(1);
  const [pageJumpInput, setPageJumpInput] = useState<string>('');

  useEffect(() => {
    void hydrateSyncedFullBooks().then(() => {
      setLibraryVersion(v => v + 1);
    });
    const handleFullBooksUpdated = () => {
      setLibraryVersion(v => v + 1);
    };
    window.addEventListener('clinpharm-full-books-updated', handleFullBooksUpdated);
    return () => {
      window.removeEventListener('clinpharm-full-books-updated', handleFullBooksUpdated);
    };
  }, []);

  const books = useMemo(() => getAllVerbatimBooks(), [libraryVersion]);
  const allChapters = useMemo(() => books.flatMap(b => b.chapters), [books]);

  // Active book & chapter selection
  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (initialChapterId) {
      const found = allChapters.find(
        c => c.id === initialChapterId || c.sourceUrl.includes(initialChapterId)
      );
      if (found) return found.id;
    }
    return allChapters[0]?.id || 'dipiro-ch15-hf';
  });

  // Sync if initialChapterId changes from external trigger
  useEffect(() => {
    if (initialChapterId) {
      const found = allChapters.find(
        c => c.id === initialChapterId || c.sourceUrl.includes(initialChapterId)
      );
      if (found) {
        setLibraryEntryMode('verbatim_books');
        setActiveChapterId(found.id);
        setSelectedBookId(found.bookId);
      }
    }
  }, [initialChapterId, allChapters]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchMatchIndex, setActiveSearchMatchIndex] = useState(0);

  // Reader settings
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [copiedChapter, setCopiedChapter] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const activeChapter = useMemo(() => {
    return getVerbatimChapterById(activeChapterId) || allChapters[0];
  }, [activeChapterId, allChapters, libraryVersion]);

  const activeBook = useMemo(() => {
    return books.find(b => b.id === activeChapter.bookId) || books[0];
  }, [activeChapter, books]);

  const syncedFullBookRecord: SyncedFullBookRecord | undefined = useMemo(() => {
    return getSyncedFullBookByIdSync(activeBook.id);
  }, [activeBook.id, libraryVersion]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchVerbatimLibrary(searchQuery, {
      bookId: selectedBookId,
      systemCategory: selectedCategory
    });
  }, [searchQuery, selectedBookId, selectedCategory, libraryVersion]);

  // Filtered chapters for the sidebar
  const filteredChapters = useMemo(() => {
    return allChapters.filter(ch => {
      const bookMatch = selectedBookId === 'all' || ch.bookId === selectedBookId;
      const catMatch = selectedCategory === 'all' || ch.systemCategory === selectedCategory;
      return bookMatch && catMatch;
    });
  }, [allChapters, selectedBookId, selectedCategory]);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setMobileTocOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyChapterText = async () => {
    const text = exportChapterMarkdown(activeChapter);
    await navigator.clipboard.writeText(text);
    setCopiedChapter(true);
    setTimeout(() => setCopiedChapter(false), 2000);
  };

  const handleCopyCitation = async () => {
    await navigator.clipboard.writeText(activeChapter.citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleExportMarkdown = () => {
    const text = exportChapterMarkdown(activeChapter);
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeChapter.id}-reference-record.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintChapterPdf = () => {
    const text = exportChapterMarkdown(activeChapter);
    printOrSaveClinicalPdf({
      title: activeChapter.title,
      subtitle: `${activeBook.title} (${activeBook.edition}) • Pages ${activeChapter.pageRange}`,
      bodyMarkdownOrText: text,
      filenameBase: `${activeChapter.id}-monograph`,
      dir: 'ltr'
    });
  };

  const handleShareChapter = () => {
    const text = exportChapterMarkdown(activeChapter);
    void shareClinicalFile({
      filename: `${activeChapter.id}-reference-record.md`,
      title: `${activeChapter.title} (${activeBook.title})`,
      summaryText: activeChapter.citation,
      content: text
    });
  };

  const handleAskCopilotCurrentChapter = () => {
    if (!onAskCopilot) return;
    const prompt =
      lang === 'ar'
        ? `لخّص محتوى المرجع المتاح لهذا الفصل، واذكر أي نقص في المصدر أو الجرعة أو الدليل: ${activeChapter.title} (${activeBook.title})`
        : `Summarize the available reference record for: ${activeChapter.title} (${activeBook.title}). Disclose missing source, dose, or evidence details.`;
    onAskCopilot(prompt);
  };

  const categories: { key: string; labelEn: string; labelAr: string }[] = [
    { key: 'all', labelEn: `All Specialties (${allChapters.length} Ch.)`, labelAr: `جميع التخصصات (${allChapters.length} فصلاً)` },
    { key: 'Pharmacotherapy & Internal Medicine', labelEn: 'Pharmacotherapy & Internal Medicine (DiPiro)', labelAr: 'العلاج الدوائي والباطنية الشاملة (DiPiro)' },
    { key: 'Drug Interactions & Safety', labelEn: "Drug Interactions & Safety (Stockley's)", labelAr: "التداخلات الدوائية وسلامة الأدوية (Stockley's)" },
    { key: 'Cardiology', labelEn: 'Cardiology', labelAr: 'أمراض القلب والشرايين' },
    { key: 'Critical Care & Infectious Disease', labelEn: 'Critical Care, ID & Neuro', labelAr: 'العناية المركزة والإنتان والأعصاب' },
    { key: 'Nephrology & Fluids', labelEn: 'Nephrology, Fluids & PK/TDM', labelAr: 'الكلى والسوائل والحركية الدوائية' },
    { key: 'Gastroenterology & Hepatology', labelEn: 'Gastroenterology & Hepatology', labelAr: 'أمراض الجهاز الهضمي والكبد' },
    { key: 'Endocrinology & Metabolism', labelEn: 'Endocrinology & Women Health', labelAr: 'الغدد الصماء والسكري وصحة المرأة' },
    { key: 'Clinical Methodology & PPCP', labelEn: 'PPCP, EBM & Biostatistics', labelAr: 'منهجية الحالات PPCP والإحصاء الحيوي' },
    { key: 'Hospital Dosing & IV Protocols', labelEn: 'Hospital Dosing, ISMP & IV', labelAr: 'جرعات المستشفيات والتسريب وسلامة الأدوية' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Reference collection banner; provenance is shown per record, not implied by this collection. */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-teal-800/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
            <BookMarked className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-extrabold text-sm sm:text-base tracking-tight truncate">
                {lang === 'ar' ? 'مجموعة المراجع السريرية داخل التطبيق' : 'In-App Clinical Reference Collection'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <BookOpen className="w-3 h-3" />
                {lang === 'ar'
                  ? `${books.length} مراجع • ${allChapters.length} سجل فصل؛ تُعرض طبقة المصدر عند توفرها`
                  : `${books.length} references • ${allChapters.length} chapter records; source layer shown when available`}
              </span>
            </div>
            <p className="text-[11px] text-teal-200/80 truncate">
              {lang === 'ar'
                ? 'DiPiro 13th Ed • ACCP Cardiology 2026 • ACCP Updates Vol 1 & Vol 2 (Ch. 1–22) • PPCP Casebook • Hospital Compendium'
                : 'DiPiro 13th Ed • ACCP Cardiology 2026 • ACCP Updates Vol 1 & Vol 2 (Ch. 1–22) • PPCP Casebook • Hospital Compendium'}
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setDriveSyncModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-bold transition cursor-pointer"
            title="Import PDF references and index their available pages"
          >
            <CloudDownload className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {lang === 'ar'
                ? 'استيراد مراجع PDF من Google Drive'
                : 'Import PDF references'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleAskCopilotCurrentChapter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold transition cursor-pointer"
            title="Ask Copilot about this chapter"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'استشارة المساعد الذكي (AI)' : 'Ask Real AI Copilot'}
            </span>
          </button>
          <button
            type="button"
            onClick={handlePrintChapterPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/40 hover:bg-indigo-600/60 text-indigo-100 border border-indigo-400/40 text-xs font-bold transition cursor-pointer"
            title="Print or Save Chapter as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleShareChapter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-700/50 hover:bg-teal-700 text-teal-100 border border-teal-500/30 text-xs font-bold transition cursor-pointer"
            title="Share or Export Chapter File"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'مشاركة / تصدير' : 'Share / Export'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700"
            aria-label="Toggle Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Switch between topic records and reference-book records. */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 sm:px-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setLibraryEntryMode('clinical_topics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
              libraryEntryMode === 'clinical_topics'
                ? 'bg-teal-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? 'الموسوعة السريرية حسب الموضوع'
                : 'Clinical topic encyclopedia'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setLibraryEntryMode('verbatim_books')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
              libraryEntryMode === 'verbatim_books'
                ? 'bg-teal-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? `سجلات المراجع والكتب (${books.length} مراجع • ${allChapters.length} فصلاً)`
                : `Reference records and books (${books.length} • ${allChapters.length} chapters)`}
            </span>
          </button>
        </div>
        <div className="text-[11px] text-teal-300/90 font-mono">
          {lang === 'ar'
            ? 'المبدأ: كل طبقة مصدر تُعرض على حدة'
            : 'Source layers are labeled independently'}
        </div>
      </div>

      {libraryEntryMode === 'clinical_topics' ? (
        <div className="flex-1 min-h-0 overflow-hidden">
          <ClinicalEncyclopediaPage
            lang={lang}
            onOpenReference={uri => {
              const target = resolveKnowledgeGraphUri(uri);
              if (target?.targetType === 'verbatim_chapter_section' && target.verbatimChapterId) {
                setLibraryEntryMode('verbatim_books');
                setSelectedBookId(target.verbatimBookId || 'all');
                setSelectedCategory('all');
                setActiveChapterId(target.verbatimChapterId);
                if (target.verbatimSectionId) setTimeout(() => scrollToSection(target.verbatimSectionId!), 120);
              } else {
                onNavigateLocalRef?.(uri);
              }
            }}
          />
        </div>
      ) : (
        <>
          {/* Filter and Search Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Book Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setSelectedBookId('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              selectedBookId === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {lang === 'ar'
              ? `جميع المراجع (${books.length} كتب • ${allChapters.length} فصلاً)`
              : `All Sources (${books.length} Books • ${allChapters.length} Ch.)`}
          </button>
          {books.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setSelectedBookId(b.id);
                setSelectedCategory('all');
                if (b.chapters[0]) {
                  setActiveChapterId(b.chapters[0].id);
                  if (b.chapters[0].startPage) {
                    setActivePdfPage(b.chapters[0].startPage);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedBookId === b.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{lang === 'ar' ? b.badgeAr : b.badge}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedBookId === b.id
                    ? 'bg-white/20 text-white'
                    : 'bg-teal-500/15 text-teal-700 dark:text-teal-300'
                }`}
              >
                {b.chapters.length} {lang === 'ar' ? 'فصول' : 'Ch'}
              </span>
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'بحث في نصوص المراجع المتاحة...'
                : 'Search available in-app reference text...'
            }
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main dual-pane layout: chapter navigation and reference reader. */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Table of Contents & Chapter Navigator */}
        <aside
          className={`${
            mobileTocOpen ? 'fixed inset-0 z-40 bg-white dark:bg-slate-900 flex' : 'hidden'
          } lg:flex lg:relative lg:w-80 xl:w-96 flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0 overflow-hidden`}
        >
          {/* Mobile Close Header */}
          <div className="lg:hidden p-3 bg-slate-100 dark:bg-slate-800 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <span className="font-bold text-xs">
              {lang === 'ar' ? 'فهرس الفصول والأقسام' : 'Table of Contents & Chapters'}
            </span>
            <button
              type="button"
              onClick={() => setMobileTocOpen(false)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          {/* Specialty Filter Dropdown inside sidebar */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
              {lang === 'ar' ? 'تصنيف التخصص الطبي' : 'Filter by Medical Specialty'}
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              {categories.map(c => (
                <option key={c.key} value={c.key}>
                  {lang === 'ar' ? c.labelAr : c.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Search Result Matches Dropdown if Search is Active */}
          {searchQuery.trim() && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200 mb-1.5">
                <span>
                  {lang === 'ar' ? `نتائج البحث (${searchResults.length})` : `Matches (${searchResults.length})`}
                </span>
                <span className="text-[10px] font-normal text-amber-700 dark:text-amber-300">
                  {lang === 'ar' ? 'انقر للانتقال' : 'Click to jump'}
                </span>
              </div>
              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                {searchResults.map((match, idx) => (
                  <button
                    key={`${match.chapter.id}-${idx}`}
                    type="button"
                    onClick={() => {
                      setActiveChapterId(match.chapter.id);
                      if (match.originalPageNumber) {
                        setActivePdfPage(match.originalPageNumber);
                      }
                      if (match.section) {
                        scrollToSection(match.section.id);
                      }
                    }}
                    className="w-full text-left p-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900 text-[11px] hover:border-amber-400 transition"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {match.chapter.title}
                      </span>
                      {match.originalPageNumber && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 shrink-0">
                          p.{match.originalPageNumber}
                        </span>
                      )}
                    </div>
                    {match.section && (
                      <div className="text-teal-600 dark:text-teal-400 font-semibold text-[10px]">
                        § {match.section.number} {match.section.heading}
                      </div>
                    )}
                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{match.snippet}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapter List & Accordion */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              {lang === 'ar' ? 'فصول المراجع المتاحة' : 'Available Library Chapters'} ({filteredChapters.length})
            </div>

            {filteredChapters.map(ch => {
              const isSelected = ch.id === activeChapter.id;
              const bookOfCh = books.find(b => b.id === ch.bookId);

              return (
                <div
                  key={ch.id}
                  className={`rounded-xl border transition ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800/90 border-teal-500/50 shadow-xs'
                      : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveChapterId(ch.id);
                      setMobileTocOpen(false);
                      if (mainScrollRef.current) {
                        mainScrollRef.current.scrollTop = 0;
                      }
                    }}
                    className="w-full text-left p-3 flex flex-col gap-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1 text-[10px] font-bold">
                      <span className="text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 border border-teal-200/50">
                        {bookOfCh ? (lang === 'ar' ? bookOfCh.badgeAr : bookOfCh.badge) : ch.bookId}
                      </span>
                      <span className="text-slate-400">{ch.pageRange}</span>
                    </div>

                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isSelected ? 'text-teal-800 dark:text-teal-200' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {ch.title}
                    </h4>

                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {lang === 'ar' ? ch.titleAr : ch.authors}
                    </div>
                  </button>

                  {/* If selected, show deep interactive Table of Contents anchors */}
                  {isSelected && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-slate-700/60 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {lang === 'ar' ? 'أقسام الفصل (انقر للقفز)' : 'Sections (Click to jump)'}
                      </div>
                      {ch.toc.map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition cursor-pointer ${
                            activeSectionId === item.id
                              ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold shrink-0">
                            {item.number}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main reference reader. */}
        <main
          ref={mainScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-white dark:bg-slate-900 scroll-smooth"
        >
          {/* Reader Top Controls (Font size, density, copy, citation) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            {/* Left: Breadcrumbs & Source Identifier */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-teal-700 dark:text-teal-400">
                {lang === 'ar' ? activeBook.titleAr : activeBook.title}
              </span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                Ch. {activeChapter.chapterNumber}: {activeChapter.title}
              </span>
            </div>

            {/* Right: Reader Toolbar Controls */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* If this book has a synced Full PDF in IndexedDB, show View Mode toggle & Page Jump */}
              {syncedFullBookRecord && (
                <>
                  <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setReaderViewMode('verbatim_text')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                        readerViewMode === 'verbatim_text'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {lang === 'ar' ? 'النص المستخرج' : 'Extracted Text'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderViewMode('pdf_canvas')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                        readerViewMode === 'pdf_canvas'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'صفحة الـ PDF الأصلية' : 'Original PDF Page'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderViewMode('side_by_side')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                        readerViewMode === 'side_by_side'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Columns2 className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'مقارنة جنباً إلى جنب' : 'Side-by-Side'}</span>
                    </button>
                  </div>

                  {/* Direct Page Number Jump across all synced pages */}
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const targetPage = parseInt(pageJumpInput, 10);
                      if (
                        !isNaN(targetPage) &&
                        targetPage >= 1 &&
                        targetPage <= syncedFullBookRecord.totalPages
                      ) {
                        setActivePdfPage(targetPage);
                        const pageRec = syncedFullBookRecord.pages.find(
                          p => p.pageNumber === targetPage
                        );
                        if (pageRec) {
                          setActiveChapterId(pageRec.chapterId);
                          setTimeout(() => {
                            scrollToSection(pageRec.sectionId);
                          }, 80);
                        } else {
                          const matchedCh = syncedFullBookRecord.chapters.find(
                            c =>
                              (c.startPage ?? 1) <= targetPage &&
                              (c.endPage ?? c.startPage ?? 1) >= targetPage
                          );
                          if (matchedCh) {
                            setActiveChapterId(matchedCh.id);
                            const matchedSec = matchedCh.sections.find(
                              s => s.originalPageNumber === targetPage
                            );
                            if (matchedSec) {
                              setTimeout(() => {
                                scrollToSection(matchedSec.id);
                              }, 80);
                            }
                          }
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl text-xs font-mono"
                  >
                    <span className="text-slate-500">
                      {lang === 'ar' ? 'صفحة:' : 'Go to p.'}
                    </span>
                    <input
                      type="text"
                      value={pageJumpInput}
                      onChange={e => setPageJumpInput(e.target.value)}
                      placeholder={`1-${syncedFullBookRecord.totalPages}`}
                      className="w-16 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center font-bold text-xs"
                    />
                  </form>
                </>
              )}

              {/* Font Size Selector */}
              <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    fontSize === 'sm' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500'
                  }`}
                  title="Small Font"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    fontSize === 'base' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500'
                  }`}
                  title="Standard Font"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    fontSize === 'lg' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500'
                  }`}
                  title="Large Font"
                >
                  A+
                </button>
              </div>

              {/* Full Width Toggle */}
              <button
                type="button"
                onClick={() => setIsFullWidth(!isFullWidth)}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={isFullWidth ? 'Standard Reading Width' : 'Full Width Reader'}
              >
                {isFullWidth ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Copy Citation Button */}
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition"
                title="Copy Formal Citation"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'نسخ التوثيق' : 'Cite'}</span>
                  </>
                )}
              </button>

              {/* Copy Monograph Button */}
              <button
                type="button"
                onClick={handleCopyChapterText}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/50 hover:bg-teal-100 text-xs font-bold transition"
                title="Copy full chapter text as Markdown"
              >
                {copiedChapter ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'ar' ? 'تم نسخ الفصل' : 'Copied Full Text'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'نسخ النص كاملاً' : 'Copy Text'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reader Body Container */}
          <div className={`${isFullWidth ? 'max-w-none' : 'max-w-4xl mx-auto'} space-y-8`}>
            {/* Full-Book Verification Status Callout Strip */}
            {!syncedFullBookRecord ? (
              <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CloudDownload className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'ملخص مضمّن — ليس نص المصدر الأصلي. لم يُستورد ملف PDF بعد؛ تُعرض الآن الفصول الملخصة المتاحة داخل التطبيق. لاستيراد PDF وفهرسة صفحاته:'
                      : 'Embedded summary — not original source text. No PDF has been imported; the in-app summary chapters are shown. To import a PDF and index its pages:'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDriveSyncModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold whitespace-nowrap cursor-pointer"
                >
                  {lang === 'ar' ? 'استيراد ملف PDF الأصلي' : 'Import Original PDF'}
                </button>
              </div>
            ) : (
              (() => {
                const statusMeta = getProcessingStatusBadgeMeta(
                  syncedFullBookRecord.processingStatus,
                  lang
                );
                const isEmbedded = syncedFullBookRecord.sourceType === 'embedded_synthetic';
                return (
                  <div
                    className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
                      syncedFullBookRecord.processingStatus === 'verified_complete'
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/70'
                        : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 font-mono flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] font-sans font-bold ${statusMeta.badgeClass}`}
                      >
                        {statusMeta.label}
                      </span>
                      <span>
                        {syncedFullBookRecord.sourceFileName || syncedFullBookRecord.fileName} (
                        {syncedFullBookRecord.originalPageCount ?? syncedFullBookRecord.totalPages}{' '}
                        {lang === 'ar' ? 'صفحة' : 'Pages'} •{' '}
                        {lang === 'ar' ? 'نص أصلي:' : 'Text:'}{' '}
                        {syncedFullBookRecord.extractedTextPageCount ?? 0} •{' '}
                        {lang === 'ar' ? 'OCR:' : 'OCR:'} {syncedFullBookRecord.ocrPageCount ?? 0} •{' '}
                        {lang === 'ar' ? 'تحتاج OCR:' : 'Needs OCR:'}{' '}
                        {syncedFullBookRecord.unprocessedPageCount ?? 0} •{' '}
                        {formatStorageBytes(syncedFullBookRecord.fileSize)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {!isEmbedded && (
                        <button
                          type="button"
                          onClick={() => void downloadOfflinePdfFromVault(activeBook.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold cursor-pointer"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>
                            {lang === 'ar' ? 'تنزيل PDF الأصلي' : 'Download Original PDF'}
                          </span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setDriveSyncModalOpen(true)}
                        className="text-teal-700 dark:text-teal-300 font-bold hover:underline cursor-pointer"
                      >
                        {lang === 'ar' ? 'إدارة وفحص الاستيراد' : 'Manage & Verify Import'}
                      </button>
                    </div>
                  </div>
                );
              })()
            )}

            {/* If user switched to Original PDF Page Canvas view or Side-by-Side comparison */}
            {syncedFullBookRecord &&
              (readerViewMode === 'pdf_canvas' || readerViewMode === 'side_by_side') && (
                <div
                  className={
                    readerViewMode === 'side_by_side'
                      ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 items-start'
                      : ''
                  }
                >
                  <PdfPageCanvasViewer
                    bookId={activeBook.id}
                    totalPages={syncedFullBookRecord.totalPages}
                    initialPage={activePdfPage}
                    lang={lang}
                    onPageChange={p => setActivePdfPage(p)}
                  />
                  {readerViewMode === 'side_by_side' && (
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
                        <span>
                          {lang === 'ar'
                            ? `النص المستخرج المقابل للصفحة رقم ${activePdfPage}`
                            : `Extracted Text for Page ${activePdfPage}`}
                        </span>
                        {(() => {
                          const pRec = syncedFullBookRecord.pages.find(
                            p => p.pageNumber === activePdfPage
                          );
                          return (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                              {pRec?.extractionMethod || 'native_text'} (
                              {pRec?.extractionStatus || 'extracted'})
                            </span>
                          );
                        })()}
                      </div>
                      {(() => {
                        const pRec = syncedFullBookRecord.pages.find(
                          p => p.pageNumber === activePdfPage
                        );
                        let fallbackText = pRec?.extractedText || pRec?.ocrText || pRec?.text || '';
                        if (!fallbackText) {
                          for (const ch of syncedFullBookRecord.chapters) {
                            const sec = ch.sections.find(s => s.originalPageNumber === activePdfPage);
                            if (sec?.body) {
                              fallbackText = sec.body;
                              break;
                            }
                            if (
                              (ch.startPage ?? 0) <= activePdfPage &&
                              (ch.endPage ?? 0) >= activePdfPage &&
                              ch.sections[0]?.body
                            ) {
                              fallbackText = ch.sections[0].body;
                              break;
                            }
                          }
                        }
                        if (!fallbackText) {
                          return (
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
                              {lang === 'ar'
                                ? `الصفحة رقم ${activePdfPage} لا تحتوي على طبقة نصية مستخرجة (${
                                    pRec?.extractionStatus === 'blank'
                                      ? 'صفحة فارغة'
                                      : 'صفحة مصورة تحتاج إلى OCR'
                                  }). يمكنك قراءة الصفحة بصرياً في العارض المجاور.`
                                : `Page ${activePdfPage} has no extracted text layer (${
                                    pRec?.extractionStatus === 'blank'
                                      ? 'blank page'
                                      : 'scanned page requiring OCR'
                                  }). View the visual page in the adjacent PDF pane.`}
                            </div>
                          );
                        }
                        return (
                          <div className="text-xs sm:text-sm leading-relaxed font-serif whitespace-pre-line max-h-[600px] overflow-y-auto">
                            {fallbackText}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            {/* Chapter Header Block */}
            <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200/60">
                  {activeChapter.systemCategory}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {activeChapter.edition} • {activeChapter.pageRange}
                </span>
                {activeChapter.uan && (
                  <span className="text-[10px] font-mono text-slate-400">
                    {activeChapter.uan}
                  </span>
                )}
              </div>

      {/* Title from the selected reference record. */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
                {activeChapter.title}
              </h1>

              {/* Arabic Subtitle Tag */}
              <div className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                {activeChapter.titleAr}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">Authors:</strong> {activeChapter.authors}
              </div>

              {/* Formal Citation Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between gap-3">
                <span className="truncate">{activeChapter.citation}</span>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="shrink-0 p-1 text-slate-400 hover:text-teal-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* High-Yield Board Pearls Banner */}
            {activeChapter.boardPearls.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-extrabold text-sm">
                  <span className="text-base">💎</span>
                  <h3>
                    {lang === 'ar'
                      ? 'لآلئ البورد الأمريكي والتوجيهات السريرية الحرجة (High-Yield Board Pearls)'
                      : 'High-Yield Board Pearls & Critical Directives'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {activeChapter.boardPearls.map((pearl, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1"
                    >
                      <p className="leading-relaxed font-medium">{pearl}</p>
                      {activeChapter.boardPearlsAr[pIdx] && (
                        <p className="text-teal-700 dark:text-teal-400 text-xs font-semibold pt-1 border-t border-slate-100 dark:border-slate-700/50">
                          {activeChapter.boardPearlsAr[pIdx]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Reference Tables (Dosing, Titration, Hemodynamics) */}
            {activeChapter.quickTables.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
                  <Table className="w-4 h-4 text-teal-600" />
                  <h3>
                    {lang === 'ar'
                      ? 'جداول الجرعات والخوارزميات السريعة (Indexed Dosing Tables)'
                      : 'Indexed Reference & Dosing Tables'}
                  </h3>
                </div>

                {activeChapter.quickTables.map((tbl, tIdx) => (
                  <div
                    key={tIdx}
                    className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
                  >
                    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        {tbl.title}
                      </div>
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
                        {tbl.titleAr}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100/70 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            {tbl.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3 py-2 font-bold whitespace-nowrap">
                                <div>{h}</div>
                                {tbl.headersAr?.[hIdx] && (
                                  <div className="text-[9px] font-normal text-teal-600 lowercase">
                                    {tbl.headersAr[hIdx]}
                                  </div>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          {tbl.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition"
                            >
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2.5 align-top">
                                  <div className="font-medium">{cell}</div>
                                  {tbl.rowsAr?.[rIdx]?.[cIdx] && (
                                    <div className="text-[10px] text-teal-700 dark:text-teal-400 mt-1 font-normal">
                                      {tbl.rowsAr[rIdx][cIdx]}
                                    </div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

              {/* Reference sections; their presence does not establish verbatim fidelity. */}
            <div className="space-y-8 pt-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-500">
                    {lang === 'ar' ? 'أقسام المرجع' : 'Reference sections'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {activeChapter.sections.length} {lang === 'ar' ? 'أقسام مفهرسة' : 'Sections Indexed'}
                </span>
              </div>

              {activeChapter.sections.map(sec => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="space-y-3 scroll-mt-20 p-4 sm:p-5 rounded-2xl bg-slate-50/40 dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/30 transition"
                >
                  {/* Section Heading & Subtitle */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm sm:text-base font-black text-teal-600 dark:text-teal-400">
                        {sec.number}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        {sec.heading}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {sec.originalPageNumber && syncedFullBookRecord && (
                        <button
                          type="button"
                          onClick={() => {
                            setActivePdfPage(sec.originalPageNumber!);
                            setReaderViewMode('side_by_side');
                          }}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500/20 cursor-pointer"
                        >
                          {lang === 'ar'
                            ? `عرض صفحة PDF #${sec.originalPageNumber}`
                            : `View PDF p.${sec.originalPageNumber}`}
                        </button>
                      )}
                      {sec. evidenceGrade && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            sec.extractionStatus === 'needs_ocr'
                              ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border-orange-300'
                              : sec.extractionMethod === 'ocr'
                              ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300'
                              : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border-teal-200/60'
                          }`}
                        >
                          {sec.evidenceGrade}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual-Language Tag */}
                  <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                    {sec.headingAr}
                  </div>

                  {/* Reference text or an unprocessed scanned-page notice. */}
                  {sec.extractionStatus === 'needs_ocr' && !sec.body && !sec.ocrBody ? (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-2">
                      <span>
                        {lang === 'ar'
                          ? `هذه الصفحة (رقم ${sec.originalPageNumber ?? '?'}) عبارة عن صفحة مصورة/تخطيطية بدون طبقة نصية وتحتاج إلى معالجة OCR.`
                          : `Page ${sec.originalPageNumber ?? '?'} is a scanned/graphical page without an extractable text layer and requires OCR.`}
                      </span>
                      {sec.originalPageNumber && syncedFullBookRecord && (
                        <button
                          type="button"
                          onClick={() => {
                            setActivePdfPage(sec.originalPageNumber!);
                            setReaderViewMode('pdf_canvas');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold shrink-0 cursor-pointer"
                        >
                          {lang === 'ar' ? 'فتح صفحة PDF الأصلية' : 'Open PDF Page'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`leading-relaxed text-slate-800 dark:text-slate-200 font-serif whitespace-pre-line ${
                        fontSize === 'sm'
                          ? 'text-xs sm:text-sm'
                          : fontSize === 'lg'
                          ? 'text-base sm:text-lg'
                          : 'text-sm sm:text-base'
                      }`}
                    >
                      {sec.body || sec.ocrBody}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Bottom Citation & Monograph Footer */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-600" />
                <span>
                    {lang === 'ar'
                      ? 'تعرض هذه الصفحة سجلات مرجعية مدمجة وأي صفحات PDF مستوردة متاحة. راجع بيانات المصدر عند ظهورها؛ وجود النص لا يعني أنه حرفي أو مُراجع سريريًا.'
                      : 'This view contains in-app reference records and any available imported PDF pages. Check source metadata where shown; the presence of text does not establish verbatim fidelity or clinical review.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (mainScrollRef.current) {
                    mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-teal-600 font-bold hover:underline"
              >
                {lang === 'ar' ? 'الرجوع للأعلى ↑' : 'Back to top ↑'}
              </button>
            </div>
          </div>
        </main>
      </div>
      </>
      )}

      <GoogleDriveBookSyncModal
        isOpen={driveSyncModalOpen}
        onClose={() => setDriveSyncModalOpen(false)}
        lang={lang}
        onBookSynced={record => {
          setLibraryVersion(v => v + 1);
          setSelectedBookId(record.bookId);
          setSelectedCategory('all');
          if (record.chapters[0]) {
            setActiveChapterId(record.chapters[0].id);
            if (record.chapters[0].startPage) {
              setActivePdfPage(record.chapters[0].startPage);
            }
          }
        }}
      />
    </div>
  );
}

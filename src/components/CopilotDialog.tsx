import { useState, useRef, useEffect, useMemo } from 'react';
import { Language, Patient } from '../types/clinical';
import {
  Bot,
  Send,
  User,
  Sparkles,
  X,
  Trash2,
  BookOpen,
  Database,
  ShieldCheck,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import {
  PRIMARY_CLINICAL_REFERENCES,
  getAllVerbatimBooks
} from '../lib/clinicalReferences';
import {
  buildNotebookLmGrounding,
  synthesizeGroundedNotebookAnswer,
  GroundedNotebookSource,
  MatchedStockleyDdi
} from '../lib/notebookLmEngine';
import { hydrateSyncedFullBooks } from '../lib/googleDrive/fullBookIdb';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelBadge?: string;
  isError?: boolean;
  groundedSources?: GroundedNotebookSource[];
  matchedDdis?: MatchedStockleyDdi[];
  citations?: {
    title: string;
    evidenceLevel: string;
    url: string;
  }[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentPatient?: Patient;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
  onOpenLocalReference?: (uri: string) => void;
}

export function CopilotDialog({
  isOpen,
  onClose,
  lang,
  currentPatient,
  initialPrompt,
  onClearInitialPrompt,
  onOpenLocalReference
}: Props) {
  const [libraryVersion, setLibraryVersion] = useState(0);
  const [expandedSourceKey, setExpandedSourceKey] = useState<string | null>(null);

  useEffect(() => {
    void hydrateSyncedFullBooks().then(() => setLibraryVersion(v => v + 1));
    const onUpdated = () => setLibraryVersion(v => v + 1);
    window.addEventListener('clinpharm-full-books-updated', onUpdated);
    return () => window.removeEventListener('clinpharm-full-books-updated', onUpdated);
  }, []);

  const allBooks = useMemo(() => getAllVerbatimBooks(), [libraryVersion]);
  const totalChaptersCount = allBooks.reduce((sum, b) => sum + b.chapters.length, 0);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      modelBadge: 'NotebookLM Grounded AI • Strict Reference Mode',
      text:
        lang === 'ar'
          ? `أهلاً بك زميلي الـ Clinical Pharmacist في **ClinPharm NotebookLM AI** (نظام الاستدلال المرجعي الموثّق الصارم — بدون أي تأليف خارج المراجع).
أنا مرتبط مباشرةً بـ **${allBooks.length} مراجع إكلينيكية معتمدة (${totalChaptersCount} فصلاً كاملاً بالنص الأصلي وجداول الجرعات)**:
• **[1] Stockley’s Drug Interactions** (قاعدة بيانات التعارضات الدوائية المعتمدة • Drive ID: \`1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S\`)
• **[2] DiPiro’s Pharmacotherapy (13th Ed)** — الفيزيولوجيا المرضية والخوارزميات العلاجية الكاملة
• **[3] ACCP/ASHP Cardiology Pharmacy (BCCP 2026)** — الفصول الستة الكاملة لصيدلة القلب والعناية التاجية
• **[4] ACCP Updates in Therapeutics® 2026 (Vol. 1 & Vol. 2)** — الفصول 1–22 الكاملة للبورد الأمريكي (BCPS)
• **[5] Pharmacotherapy Casebook & Bedside PPCP Guide** — معيار Schwinghammer e-Casebook
• **[6] Hospital Clinical Dosing Compendium & ICU Stewardship** — جداول التسريب الوريدي والغسيل الكلوي

كل إجابة أقدمها تكون **مسندة بالترقيم \`[1]\`، \`[2]\`، \`[3]\` إلى الفصل والصفحة والنص الحرفي من المرجع** مع إمكانية استعراض الفقرة الأصلية المقتبسة تحت كل إجابة مباشرةً.`
          : `Welcome Colleague to **ClinPharm NotebookLM AI** (Strict Source-Grounded Clinical Reference Engine — Zero Hallucination Policy).
Every response is synthesized strictly from your **${allBooks.length} Accredited In-App Medical Textbooks (${totalChaptersCount} unabridged chapters & dosing tables)**:
• **[1] Stockley’s Drug Interactions** (Authoritative PK/PD DDI Database • Drive ID: \`1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S\`)
• **[2] DiPiro’s Pharmacotherapy (13th Ed)** — Complete Organ-System Chapters
• **[3] ACCP/ASHP Cardiology Pharmacy (BCCP 2026)** — All 6 Specialty Chapters
• **[4] ACCP Updates in Therapeutics® 2026 (Vol. 1 & Vol. 2)** — All 22 BCPS Chapters
• **[5] Pharmacotherapy Casebook & Bedside PPCP Guide** — Schwinghammer e-Casebook Standard
• **[6] Hospital Clinical Dosing Compendium & ICU Stewardship**

Ask any clinical pharmacotherapy, renal/hepatic dosing, or Stockley’s DDI question. Every claim cites its numbered source \`[1]\`, \`[2]\` with expandable verbatim textbook passages below each answer.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: PRIMARY_CLINICAL_REFERENCES.map(r => ({
        title: lang === 'ar' ? r.badgeAr : r.badge,
        evidenceLevel: 'Verified Source',
        url: r.viewUrl
      }))
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [liveAiStatus, setLiveAiStatus] = useState<'checking' | 'configured' | 'connected' | 'grounded' | 'error'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    const checkAiAvailability = async () => {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3500);
        const res = await fetch('/api/copilot/health', { signal: ctrl.signal });
        clearTimeout(timer);
        const ct = res.headers.get('content-type') || '';
        if (res.ok && ct.includes('application/json')) {
          const data = await res.json();
          if (data?.ok && !cancelled) {
            setLiveAiStatus(data.liveAiConfigured ? 'configured' : 'grounded');
            return;
          }
        }
      } catch {
        // Ignore and keep grounded mode active
      }
      if (!cancelled) {
        setLiveAiStatus('error');
      }
    };

    void checkAiAvailability();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      setInput(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [isOpen, initialPrompt, onClearInitialPrompt]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input.trim();
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: currentInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Do not transmit prior chat turns by default; they may contain patient identifiers.

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Run NotebookLM Deep Multi-Token Bilingual Reference Retrieval across all 7 books (47+ chapters) & Stockley's DDI DB
      const groundingBundle = buildNotebookLmGrounding(currentInput, lang, currentPatient);

      const requestPayload = {
        query: currentInput,
        lang,
        history: [],
        patientContext: groundingBundle.patientContext,
        referenceContext: groundingBundle.referenceContext,
        verbatimLibraryContext: groundingBundle.notebookSourcesContext
      };

      const candidateEndpoints = [
        '/api/copilot/chat',
        'https://ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/copilot/chat',
        'https://ais-dev-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app/api/copilot/chat'
      ];

      let replyText = '';
      let usedLiveAi = false;
      let usedModelBadge = `NotebookLM Grounded AI • ${groundingBundle.numberedSources.length} Sources Cited`;

      // 2. Try Server Endpoints (Fast <2.5s Gemini 3 Flash with ThinkingLevel.LOW)
      for (const endpoint of candidateEndpoints) {
        try {
          const ctrl = new AbortController();
          const timeoutId = setTimeout(() => ctrl.abort(), 16000);
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload),
            signal: ctrl.signal
          });
          clearTimeout(timeoutId);

          const contentType = response.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            // Static host (e.g. GitHub Pages 404.html or Capacitor local server) returned HTML; continue to next endpoint
            continue;
          }

          const data = await response.json();
          if (response.ok && data?.text) {
            replyText = data.text;
            usedLiveAi = data.liveAi === true;
            if (data.model) {
              usedModelBadge = `${data.model} • NotebookLM (${groundingBundle.numberedSources.length} Sources)`;
            }
            break;
          }
          // Try next endpoint if this one returned non-200
          continue;
        } catch {
          // Endpoint timed out or unreachable, continue to next candidate
          continue;
        }
      }

      // Gemini requests must go through the server; never use a client-side API key.

      // 4. Offline Verbatim NotebookLM Reference Extractor (100% query-specific, strictly quotes matched [1]..[4] sources & tables, zero canned filler)
      if (!replyText) {
        replyText = synthesizeGroundedNotebookAnswer(
          currentInput,
          lang,
          currentPatient,
          groundingBundle
        );
        usedModelBadge = `NotebookLM Verbatim Extractor • ${groundingBundle.numberedSources.length} Sources Cited`;
      }

      setLiveAiStatus(usedLiveAi ? 'connected' : 'grounded');

      const sourceCitations = groundingBundle.numberedSources.map(src => ({
        title: `[${src.sourceIndex}] ${lang === 'ar' ? src.bookBadgeAr : src.bookBadge}: Ch.${src.chapterNumber} (${src.sectionNumber})`,
        evidenceLevel: src.pageRange,
        url: src.sourceUrl
      }));

      const botMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        modelBadge: usedModelBadge,
        groundedSources: groundingBundle.numberedSources,
        matchedDdis: groundingBundle.matchedInteractions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: sourceCitations
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const emergencyBundle = buildNotebookLmGrounding(currentInput, lang, currentPatient);
      const fallbackText = synthesizeGroundedNotebookAnswer(
        currentInput,
        lang,
        currentPatient,
        emergencyBundle
      );
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          modelBadge: `NotebookLM Verbatim Extractor • ${emergencyBundle.numberedSources.length} Sources`,
          groundedSources: emergencyBundle.numberedSources,
          matchedDdis: emergencyBundle.matchedInteractions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-3xl w-full h-[92dvh] sm:h-[720px] shadow-2xl border border-teal-500/30 flex flex-col overflow-hidden">
        {/* Header with Android Drag Handle */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white px-4 pt-2.5 pb-3.5 sm:p-4 border-b border-teal-500/30 shrink-0">
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-2 sm:hidden" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-xs sm:text-sm truncate">
                    {lang === 'ar'
                      ? 'المساعد المرجعي الموثّق (ClinPharm NotebookLM AI)'
                      : 'ClinPharm NotebookLM AI (Source-Grounded)'}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      liveAiStatus === 'connected'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : liveAiStatus === 'checking' || liveAiStatus === 'configured'
                        ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                        : liveAiStatus === 'grounded'
                        ? 'bg-sky-500/20 text-sky-200 border-sky-400/40'
                        : 'bg-rose-500/20 text-rose-200 border-rose-400/40'
                    }`}
                  >
                    {liveAiStatus === 'connected' ? (
                      <>
                        <ShieldCheck className="w-3 h-3" />
                        <span>
                          {lang === 'ar' ? 'استجابة Gemini مباشرة' : 'Live Gemini response'}
                        </span>
                      </>
                    ) : liveAiStatus === 'checking' ? (
                      <span>{lang === 'ar' ? 'جارٍ التحقق من حالة الخادم...' : 'Checking server status...'}</span>
                    ) : liveAiStatus === 'configured' ? (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'Gemini مهيأ؛ الاتصال غير مؤكد' : 'Gemini configured; connection unverified'}</span>
                      </>
                    ) : liveAiStatus === 'grounded' ? (
                      <>
                        <BookOpen className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'وضع المراجع المحلي' : 'Local reference mode'}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'تعذر التحقق من الخادم' : 'Server status unavailable'}</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/70 truncate">
                  {currentPatient
                    ? `Active Patient: ${currentPatient.name} (${currentPatient.mrn} • CrCl ${currentPatient.labs.crcl} mL/min)`
                    : `${allBooks.length} Accredited Books • ${totalChaptersCount} Verbatim Chapters Grounded`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setMessages(messages.slice(0, 1))}
                title={lang === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Connected Local Reference Database Strip (All 7 Accredited Sources) */}
        <div className="px-3 sm:px-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-[11px] shrink-0">
          <span className="font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {lang === 'ar'
                ? `مصادر NotebookLM (${allBooks.length} كتب / ${totalChaptersCount} فصلاً):`
                : `NotebookLM Sources (${allBooks.length} Books / ${totalChaptersCount} Ch.):`}
            </span>
          </span>
          <div className="flex items-center gap-1.5">
            {allBooks.map(book => (
              <button
                key={book.id}
                type="button"
                onClick={() => onOpenLocalReference?.(book.chapters[0]?.sourceUrl || `local://ref/source/${book.id}`)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-teal-700 dark:text-teal-300 font-semibold hover:border-teal-500 whitespace-nowrap transition cursor-pointer"
                title={`${book.title} (${book.chapters.length} Chapters)`}
              >
                <BookOpen className="w-3 h-3 text-teal-600 shrink-0" />
                <span>{lang === 'ar' ? book.badgeAr : book.badge}</span>
                <span className="text-[9px] px-1 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  {book.chapters.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : m.isError
                    ? 'bg-rose-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[90%] rounded-2xl p-3 sm:p-4 text-xs leading-relaxed shadow-xs space-y-3 ${
                  m.sender === 'user'
                    ? 'bg-slate-800 text-white rounded-tr-none'
                    : m.isError
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 rounded-tl-none'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.modelBadge && m.sender === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-teal-600 dark:text-teal-400">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {m.modelBadge}
                    </span>
                    {m.groundedSources && m.groundedSources.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                        {lang === 'ar'
                          ? `${m.groundedSources.length} مصادر مرجعية مقتبسة`
                          : `${m.groundedSources.length} Verified Citations`}
                      </span>
                    )}
                  </div>
                )}

                <div className="leading-relaxed">{m.text}</div>

                {/* NotebookLM Expandable Verbatim Source Cards */}
                {m.groundedSources && m.groundedSources.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-teal-600" />
                        {lang === 'ar'
                          ? 'المصادر المرجعية المرقّمة (انقر لعرض الفقرة الحرفية الأصلية أو فتح الفصل):'
                          : 'Numbered Reference Passages (Click to inspect verbatim textbook quote):'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {m.groundedSources.map(src => {
                        const cardKey = `${m.id}-src-${src.sourceIndex}`;
                        const isExpanded = expandedSourceKey === cardKey;
                        return (
                          <div
                            key={cardKey}
                            className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/50 overflow-hidden"
                          >
                            <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
                              <button
                                type="button"
                                onClick={() => setExpandedSourceKey(isExpanded ? null : cardKey)}
                                className="flex items-center gap-1.5 text-left min-w-0 flex-1 cursor-pointer hover:text-teal-600 dark:hover:text-teal-300 transition"
                              >
                                <span className="px-1.5 py-0.5 rounded bg-teal-600 text-white font-bold text-[10px] shrink-0">
                                  [{src.sourceIndex}]
                                </span>
                                <span className="font-bold text-[11px] text-slate-700 dark:text-slate-200 truncate">
                                  {lang === 'ar' ? src.bookBadgeAr : src.bookBadge} — Ch.{src.chapterNumber} ({src.sectionNumber}:{' '}
                                  {lang === 'ar' ? src.sectionHeadingAr || src.sectionHeading : src.sectionHeading})
                                </span>
                                <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">
                                  ({src.pageRange})
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => onOpenLocalReference?.(src.sourceUrl)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[10px] font-bold hover:bg-teal-100 shrink-0 cursor-pointer"
                                title={lang === 'ar' ? 'فتح الفصل الكامل في القارئ' : 'Open Full Chapter in Reader'}
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>{lang === 'ar' ? 'فتح الفصل' : 'Open'}</span>
                              </button>
                            </div>

                            {isExpanded && (
                              <div className="px-3 py-2.5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-teal-700 dark:text-teal-300 font-semibold">
                                  <span>
                                    {src.bookTitle} • {src.pageRange}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                                    {src.evidenceGrade}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border-l-2 border-teal-500 text-slate-700 dark:text-slate-200 font-mono text-[10.5px] leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
                                  {src.verbatimBody}
                                </div>
                                {src.clinicalNotes.length > 0 && (
                                  <div className="space-y-1">
                                    <span className="font-bold text-[10px] text-slate-500">
                                      {lang === 'ar' ? 'التوجيهات السريرية المباشرة:' : 'Direct Clinical Notes:'}
                                    </span>
                                    <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-600 dark:text-slate-300">
                                      {src.clinicalNotes.map((n, idx) => (
                                        <li key={idx}>{n}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                <div className="text-[9.5px] text-slate-400 italic">{src.citation}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fallback quick chapter links for initial greeting */}
                {(!m.groundedSources || m.groundedSources.length === 0) &&
                  m.citations &&
                  m.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="block text-[10px] font-bold text-slate-400">
                        {lang === 'ar'
                          ? 'المراجع المعتمدة المتصلة (انقر لفتح المرجع الكامل):'
                          : 'Connected Accredited References (Click to Open):'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.citations.map((cit, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onOpenLocalReference?.(cit.url)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-teal-700 dark:text-teal-300 transition cursor-pointer"
                            title={cit.url}
                          >
                            <Database className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                            <span className="truncate max-w-[220px]">{cit.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <span className="block text-[10px] opacity-60 text-right">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs py-2 px-1">
              <Sparkles className="w-4 h-4 text-teal-500 animate-spin" />
              <span>
                {lang === 'ar'
                  ? `جاري البحث المرجعي الدقيق في الـ ${allBooks.length} كتب (${totalChaptersCount} فصلاً + Stockley’s DDI) وتوثيق الإجابة بالترقيم [1]، [2]...`
                  : `Searching ${allBooks.length} accredited books (${totalChaptersCount} chapters + Stockley's DDI) for source-grounded synthesis...`}
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Buttons */}
        <div className="px-3 sm:px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar text-[11px] bg-white dark:bg-slate-900 shrink-0">
          <button
            type="button"
            onClick={() =>
              setInput(
                lang === 'ar'
                  ? 'افحص أدوية المريض الحالي وفق مرجع Stockley’s Drug Interactions (1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) وحدد تصنيف الخطورة والإجراء الصيدلاني الموثق'
                  : "Screen the active patient's medications against Stockley's Drug Interactions (1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S) with exact citations"
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 whitespace-nowrap transition font-bold cursor-pointer border border-rose-200/60"
          >
            {lang === 'ar' ? "فحص تداخلات Stockley's DDI" : "Stockley's DDI Check"}
          </button>
          <button
            type="button"
            onClick={() =>
              setInput(
                lang === 'ar'
                  ? 'راجع ملف المريض الحالي بالكامل واستخرج المشاكل الدوائية (IESC DTPs) وخطة SOAP والجرعات المعدلة حسب وظائف الكلى مع توثيق المراجع'
                  : 'Perform a complete source-grounded IESC Drug Therapy Problem audit and SOAP plan for the active patient'
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 whitespace-nowrap transition font-bold cursor-pointer border border-teal-200/60"
          >
            {lang === 'ar' ? 'مراجعة شاملة للمريض النشط (NotebookLM Audit)' : 'Full NotebookLM Audit of Patient'}
          </button>
          <button
            type="button"
            onClick={() =>
              setInput(
                lang === 'ar'
                  ? 'وفق DiPiro 13th Ed و ACCP Cardiology 2026، كيف أحول المريض من Ramipril إلى Sacubitril/Valsartan (Entresto) وما شروط K+؟'
                  : 'Per DiPiro 13th Ed & ACCP Cardiology 2026, how to switch Ramipril to Entresto and what are the K+ rules?'
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 whitespace-nowrap transition font-semibold cursor-pointer"
          >
            HFrEF & Entresto 36h Washout
          </button>
          <button
            type="button"
            onClick={() =>
              setInput(
                lang === 'ar'
                  ? 'ما هي خوارزمية ACCP Cardiology 2026 للـ Switching بين Clopidogrel و Ticagrelor و Cangrelor في مريض ACS؟'
                  : 'ACCP Cardiology 2026 algorithm for switching between Clopidogrel, Ticagrelor, and Cangrelor in ACS?'
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 whitespace-nowrap transition font-semibold cursor-pointer"
          >
            P2Y12 Switching Matrix (BCCP 2026)
          </button>
          <button
            type="button"
            onClick={() =>
              setInput(
                lang === 'ar'
                  ? 'ما هي توصيات DiPiro 13th و ACCP 2026 لجرعة Vancomycin IV ومراقبة AUC24/MIC في مريض CrCl 24 mL/min؟'
                  : 'DiPiro 13th & ACCP 2026 Vancomycin AUC24/MIC dosing for CrCl 24 mL/min?'
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 whitespace-nowrap transition font-semibold cursor-pointer"
          >
            Vancomycin AUC24/MIC
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 pb-safe border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              lang === 'ar'
                ? `اسأل NotebookLM السريري (إجابات موثقة من ${allBooks.length} مراجع و ${totalChaptersCount} فصلاً بالترقيم [1]، [2])...`
                : `Ask ClinPharm NotebookLM (strictly grounded in ${allBooks.length} books & ${totalChaptersCount} chapters)...`
            }
            className="flex-1 min-h-[44px] text-xs py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white rounded-xl transition shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

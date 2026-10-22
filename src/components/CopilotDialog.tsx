import { useState, useRef, useEffect, useMemo } from 'react';
import { Language, Patient } from '../types/clinical';
import { Bot, Send, User, Sparkles, X, Trash2, BookOpen, Database, ShieldCheck, AlertCircle } from 'lucide-react';
import {
  PRIMARY_CLINICAL_REFERENCES,
  buildCopilotReferenceContext,
  buildSimulatorParamsFromPatient,
  simulateCaseWithReferences,
  searchVerbatimLibrary,
  getAllVerbatimBooks
} from '../lib/clinicalReferences';
import { hydrateSyncedFullBooks } from '../lib/googleDrive/fullBookIdb';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelBadge?: string;
  isError?: boolean;
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
      modelBadge: 'Gemini 3.8 Flash (Live AI)',
      text:
        lang === 'ar'
          ? `أهلاً بك زميلي الـ Clinical Pharmacist. أنا المساعد السريري الذكي المرتبط مباشرةً بنموذج الذكاء الاصطناعي الحقيقي (Google Gemini 3.8 Flash) وبالمكتبة المرجعية الكاملة داخل التطبيق (${allBooks.length} مراجع معتمدة • ${totalChaptersCount} فصلاً كاملاً بالنص الأصلي، بالإضافة إلى جميع صفحات الكتب الكاملة المستوردة من Google Drive):
• DiPiro's Pharmacotherapy (13th Ed — All Organ-System Chapters + Synced PDF Pages)
• ACCP/ASHP Cardiology Pharmacy (BCCP 2026 — All 6 Chapters + Synced PDF Pages)
• ACCP Updates in Therapeutics® 2026 Vol. 1 (All 10 Chapters: Ch. 1–10 + Synced PDF Pages)
• ACCP Updates in Therapeutics® 2026 Vol. 2 (All 10 Chapters: Ch. 11–22 + Synced PDF Pages)
• Pharmacotherapy Casebook & Bedside PPCP Guide (All 5 Sections I–V + Synced PDF Pages)
• Hospital Clinical Dosing Compendium & ICU Stewardship (All 5 Sections A–E + Synced PDF Pages)

اسألني أي سؤال سريري أو حركي دوائي أو اطلب مراجعة شاملة لملف المريض النشط، وسأقوم بتحليله عبر الذكاء الاصطناعي الحقيقي مع ربط الإجابة مباشرةً بفصول وصفحات المكتبة.`
          : `Hello Colleague. I am your Real-Time AI Clinical Pharmacy Copilot powered by Google Gemini 3.8 Flash and grounded in the full In-App Verbatim Medical Library (${allBooks.length} accredited books • ${totalChaptersCount} chapters & synced Google Drive PDF pages):
• DiPiro's Pharmacotherapy (13th Ed — Complete Chapters + Synced PDF Pages)
• ACCP/ASHP Cardiology Pharmacy (BCCP 2026 — All 6 Chapters + Synced PDF Pages)
• ACCP Updates in Therapeutics® 2026 Vol. 1 (All 10 Chapters: Ch. 1–10 + Synced PDF Pages)
• ACCP Updates in Therapeutics® 2026 Vol. 2 (All 10 Chapters: Ch. 11–22 + Synced PDF Pages)
• Pharmacotherapy Casebook & Bedside PPCP Guide (All 5 Sections I–V + Synced PDF Pages)
• Hospital Clinical Dosing Compendium & ICU Stewardship (All 5 Sections A–E + Synced PDF Pages)

Ask any patient-specific pharmacotherapy, dosing, or pharmacokinetic question for live AI synthesis with direct in-app chapter and page links.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: PRIMARY_CLINICAL_REFERENCES.map(r => ({
        title: lang === 'ar' ? r.badgeAr : r.badge,
        evidenceLevel: 'Local DB',
        url: r.viewUrl
      }))
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [liveAiStatus, setLiveAiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/copilot/health')
        .then(r => r.json())
        .then(data => {
          if (data?.liveAiReady) {
            setLiveAiStatus('connected');
          } else if (import.meta.env.VITE_GEMINI_API_KEY) {
            setLiveAiStatus('connected');
          } else {
            setLiveAiStatus('error');
          }
        })
        .catch(() => {
          if (import.meta.env.VITE_GEMINI_API_KEY) {
            setLiveAiStatus('connected');
          } else {
            setLiveAiStatus('error');
          }
        });
    }
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

    const historyForApi = messages
      .filter(m => !m.isError)
      .slice(-6)
      .map(m => ({
        role: m.sender,
        text: m.text
      }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const { contextPrompt, matchedChapters } = buildCopilotReferenceContext(currentInput, lang);
      const verbatimMatches = searchVerbatimLibrary(currentInput).slice(0, 6);

      const verbatimLibraryContext = verbatimMatches
        .map(m => {
          const secHeading = m.section ? `Section ${m.section.number}: ${m.section.heading}` : 'Chapter Overview';
          const secBody = m.section ? m.section.body.slice(0, 1800) : m.snippet;
          const pearls = m.chapter.boardPearls.slice(0, 2).join(' | ');
          return `[Book: ${m.book.badge} | Chapter ${m.chapter.chapterNumber}: ${m.chapter.title} (${m.chapter.pageRange}) | URI: ${m.chapter.sourceUrl}]
${secHeading}:
${secBody}
Board Pearls: ${pearls}`;
        })
        .join('\n\n---\n\n');

      const patientSim = currentPatient
        ? simulateCaseWithReferences(buildSimulatorParamsFromPatient(currentPatient))
        : null;

      const patientContext = currentPatient
        ? `Patient: ${currentPatient.name} (${currentPatient.nameEn}), MRN: ${currentPatient.mrn}, Age: ${currentPatient.age}y, Sex: ${currentPatient.gender}, Weight: ${currentPatient.weight} kg, Height: ${currentPatient.height} cm, Ward: ${currentPatient.ward}.
Diagnoses: ${currentPatient.diagnoses.join(', ')}.
Allergies: ${currentPatient.allergies.join(', ')}.
Labs: SCr ${currentPatient.labs.serumCreatinine} mg/dL, Calculated CrCl ${currentPatient.labs.crcl} mL/min, K+ ${currentPatient.labs.potassium} mEq/L, Na+ ${currentPatient.labs.sodium} mEq/L, WBC ${currentPatient.labs.wbc}, INR ${currentPatient.labs.inr ?? 'N/A'}.
Active Inpatient Medications: ${currentPatient.activeMedications.map(m => `${m.genericName} (${m.name}) ${m.dose} ${m.route} ${m.frequency}`).join('; ')}.
Home Medications: ${currentPatient.homeMedications.map(m => `${m.genericName} ${m.dose} ${m.frequency}`).join('; ')}.
Simulated Case Engine Summary: ${patientSim?.readySoapPlanEn || ''}`
        : 'No specific inpatient selected.';

      let replyText = '';
      try {
        const response = await fetch('/api/copilot/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: currentInput,
            lang,
            history: historyForApi,
            patientContext,
            referenceContext: contextPrompt,
            verbatimLibraryContext
          })
        });

        const data = await response.json();
        if (!response.ok || !data?.text) {
          throw new Error(data?.error || `HTTP ${response.status}`);
        }
        replyText = data.text;
      } catch (serverErr) {
        // Fallback for static GitHub Pages / Android APK build when VITE_GEMINI_API_KEY is present
        const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!clientApiKey) {
          throw serverErr;
        }
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: clientApiKey });
        const aiRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Active Patient Context:\n${patientContext}\n\nMatched Verbatim Reference Excerpts:\n${verbatimLibraryContext}\n\n${contextPrompt}\n\nUser Clinical Question:\n${currentInput}`,
          config: {
            systemInstruction:
              lang === 'ar'
                ? 'أنت مساعد صيدلة سريرية (BCPS/BCCP) خبير. أجب بدقة علمية بالاعتماد على المراجع المرفقة وملف المريض النشط.'
                : 'You are an expert board-certified clinical pharmacy copilot (BCPS/BCCP). Provide evidence-based guidance grounded in the verbatim library excerpts and active patient chart.',
            temperature: 0.2
          }
        });
        replyText = aiRes.text || '';
        if (!replyText) {
          throw serverErr;
        }
      }

      const data = { text: replyText };
      setLiveAiStatus('connected');

      const verbatimCitations = verbatimMatches.map(m => ({
        title: `${m.book.badge}: Ch.${m.chapter.chapterNumber} ${m.chapter.title.slice(0, 42)}...`,
        evidenceLevel: m.chapter.pageRange,
        url: m.chapter.sourceUrl
      }));

      const chapterCitations = matchedChapters.slice(0, 2).map(ch => ({
        title: lang === 'ar' ? ch.titleAr : ch.title,
        evidenceLevel: ch.evidenceLevel,
        url: ch.sourceUrl
      }));

      const combinedCitations = [...verbatimCitations, ...chapterCitations].filter(
        (c, index, self) => index === self.findIndex(other => other.url === c.url)
      );

      const botMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        modelBadge: 'Gemini 3.8 Flash • Real AI',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations:
          combinedCitations.length > 0
            ? combinedCitations.slice(0, 4)
            : [
                {
                  title: "DiPiro's Pharmacotherapy (13th Ed)",
                  evidenceLevel: 'Local DB: dipiro-13th-ed',
                  url: 'local://ref/source/dipiro-13th-ed'
                },
                {
                  title: 'ACCP Updates in Therapeutics 2026',
                  evidenceLevel: 'Local DB: accp-2026-vol1',
                  url: 'local://ref/chapter/accp-v1-acs'
                }
              ]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Connection error';
      setLiveAiStatus('error');
      const errorBotMsg: Message = {
        id: `a-err-${Date.now()}`,
        sender: 'assistant',
        isError: true,
        modelBadge: 'AI Connection Error',
        text:
          lang === 'ar'
            ? `تعذر الاتصال بخادم الذكاء الاصطناعي الحقيقي (/api/copilot/chat): ${errMsg}. يرجى المحاولة مرة أخرى.`
            : `Failed to reach the real Gemini AI server endpoint (/api/copilot/chat): ${errMsg}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full h-[92dvh] sm:h-[680px] shadow-2xl border border-teal-500/30 flex flex-col overflow-hidden">
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
                    {lang === 'ar' ? 'المساعد السريري الذكي (Real Gemini AI)' : 'Real AI Clinical Pharmacy Copilot'}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      liveAiStatus === 'connected'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : liveAiStatus === 'checking'
                        ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                        : 'bg-rose-500/20 text-rose-200 border-rose-400/40'
                    }`}
                  >
                    {liveAiStatus === 'connected' ? (
                      <>
                        <ShieldCheck className="w-3 h-3" />
                        <span>Gemini 3.8 Flash • Live</span>
                      </>
                    ) : liveAiStatus === 'checking' ? (
                      <span>Connecting AI...</span>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>Check Server</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/70 truncate">
                  {currentPatient
                    ? `Active Patient: ${currentPatient.name} (${currentPatient.mrn} • CrCl ${currentPatient.labs.crcl} mL/min)`
                    : `${allBooks.length} Books • ${totalChaptersCount} Full Verbatim Chapters Indexed`}
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

        {/* Connected Local Reference Database Strip (All 6 Embedded Sources) */}
        <div className="px-3 sm:px-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-[11px] shrink-0">
          <span className="font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {lang === 'ar'
                ? `المكتبة المرجعية (${allBooks.length} كتب / ${totalChaptersCount} فصلاً):`
                : `Library (${allBooks.length} Books / ${totalChaptersCount} Ch.):`}
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
                className={`max-w-[86%] rounded-2xl p-3 sm:p-3.5 text-xs leading-relaxed shadow-xs space-y-2.5 ${
                  m.sender === 'user'
                    ? 'bg-slate-800 text-white rounded-tr-none'
                    : m.isError
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 rounded-tl-none'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.modelBadge && m.sender === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-teal-600 dark:text-teal-400">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {m.modelBadge}
                    </span>
                  </div>
                )}

                <div>{m.text}</div>

                {m.citations && m.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <span className="block text-[10px] font-bold text-slate-400">
                      {lang === 'ar'
                        ? 'فصول المكتبة المرجعية المرتبطة (انقر لفتح الفصل الكامل):'
                        : 'Linked Verbatim Library Chapters (Click to Open):'}
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
                  ? 'جاري التحليل عبر الذكاء الاصطناعي الحقيقي (Gemini 3.8 Flash) ومطابقة فصول المكتبة...'
                  : 'Generating live clinical response with Gemini 3.8 Flash across 43 library chapters...'}
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
                  ? 'راجع ملف المريض الحالي بالكامل واستخرج أهم المشاكل الدوائية (IESC DTPs) وخطة SOAP والجرعات المعدلة حسب وظائف الكلى'
                  : 'Perform a complete IESC Drug Therapy Problem audit and SOAP plan for the active patient'
              )
            }
            className="px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 whitespace-nowrap transition font-bold cursor-pointer border border-teal-200/60"
          >
            {lang === 'ar' ? 'مراجعة شاملة للمريض النشط (AI Audit)' : 'Full AI Audit of Active Patient'}
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
            Vancomycin AUC24/MIC (Ch. 17)
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
                ? 'اسأل المساعد الذكي الحقيقي (Gemini 3.8 Flash) في أي فصل من الفصول الـ 43...'
                : 'Ask Real Gemini 3.8 Flash AI across all 43 verbatim chapters...'
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

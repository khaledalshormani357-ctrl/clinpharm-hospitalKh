import React, { useState } from 'react';
import {
  GraduationCap,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Award,
  BookOpen,
  RotateCcw,
  Activity,
  Pill,
  ClipboardCheck,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  FileDown,
  Play,
  Copy,
  Check,
  Stethoscope,
  ListChecks,
  ShieldAlert,
  FlaskConical,
  Database
} from 'lucide-react';
import { CLINICAL_CASES } from '../../lib/mockData';
import {
  ACCP_2026_CHAPTERS,
  resolveLocalReference,
  exportLocalReferenceMarkdown
} from '../../lib/clinicalReferences';
import {
  CASEBOOK_DRIVE_URL,
  PPCP_WORKUP_STEPS,
  DISEASE_CASE_CHECKLISTS,
  BENCHMARK_APP_TEST_CASES,
  type AppBenchmarkTestCase
} from '../../lib/caseTakingGuide';
import { Language } from '../../types/clinical';

interface TrainingPanelProps {
  lang: Language;
  onLoadTestCaseIntoWard?: (testCase: AppBenchmarkTestCase) => void;
  onAskCopilot?: (prompt: string) => void;
  onOpenLocalReference?: (uri: string) => void;
}

export function TrainingPanel({
  lang,
  onLoadTestCaseIntoWard,
  onAskCopilot,
  onOpenLocalReference
}: TrainingPanelProps) {
  // Primary Mode: 'guide' (How to Take a Case & Syndrome Checklists) | 'training' (Student OSCE Cases) | 'testcases' (Live App Benchmark Test Cases)
  const [activeMode, setActiveMode] = useState<'guide' | 'training' | 'testcases'>('guide');

  // Guide State
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);
  const [selectedSyndromeId, setSelectedSyndromeId] = useState<string>(DISEASE_CASE_CHECKLISTS[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedSoapId, setCopiedSoapId] = useState<string | null>(null);

  // Student Training Cases State
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedCases, setCompletedCases] = useState<Record<string, boolean>>({});

  // Test Cases State
  const [loadedTestIds, setLoadedTestIds] = useState<Record<string, boolean>>({});

  const activeStep = PPCP_WORKUP_STEPS[selectedStepIdx] || PPCP_WORKUP_STEPS[0];
  const activeSyndrome =
    DISEASE_CASE_CHECKLISTS.find(d => d.id === selectedSyndromeId) || DISEASE_CASE_CHECKLISTS[0];

  const syndromeCheckedCount = activeSyndrome.checklist.filter(item => checkedItems[item.id]).length;

  const toggleChecklistItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopySoapTemplate = (syndromeId: string) => {
    const syn = DISEASE_CASE_CHECKLISTS.find(d => d.id === syndromeId);
    if (!syn) return;
    const text = `SOAP Note — ${syn.titleAr}\nS: ${syn.soapTemplateAr.subjective}\nO: ${syn.soapTemplateAr.objective}\nA: ${syn.soapTemplateAr.assessment}\nP:\n${syn.soapTemplateAr.plan}`;
    navigator.clipboard?.writeText(text);
    setCopiedSoapId(syndromeId);
    setTimeout(() => setCopiedSoapId(null), 2000);
  };

  // Student Training Case Helpers
  const activeCase = CLINICAL_CASES[activeCaseIndex];
  const matchedChapters = ACCP_2026_CHAPTERS.filter(ch => {
    const titleLower = (activeCase.titleEn + ' ' + activeCase.title).toLowerCase();
    if (titleLower.includes('sepsis') || titleLower.includes('aki') || titleLower.includes('vancomycin')) {
      return ch.id.includes('sepsis') || ch.id.includes('aki') || ch.id.includes('tdm') || ch.id.includes('casebook');
    }
    if (titleLower.includes('heart failure') || titleLower.includes('hfref') || titleLower.includes('arni')) {
      return ch.id.includes('hf') || ch.id.includes('cardiorenal') || ch.id.includes('casebook');
    }
    if (titleLower.includes('acs') || titleLower.includes('afib') || titleLower.includes('dapt') || titleLower.includes('pe')) {
      return ch.id.includes('acs') || ch.id.includes('afib') || ch.id.includes('vte') || ch.id.includes('casebook');
    }
    return ch.id.includes('casebook');
  });

  const handleSelectCase = (idx: number) => {
    setActiveCaseIndex(idx);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    const chosen = activeCase.options.find(o => o.id === selectedOption);
    if (chosen?.isCorrect) {
      setCompletedCases(prev => ({ ...prev, [activeCase.id]: true }));
    }
  };

  const correctCount = Object.values(completedCases).filter(Boolean).length;

  const handleInjectTestCase = (tc: AppBenchmarkTestCase) => {
    setLoadedTestIds(prev => ({ ...prev, [tc.id]: true }));
    if (onLoadTestCaseIntoWard) {
      onLoadTestCaseIntoWard(tc);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner: Reference Guide & Academy Hub */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-teal-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="bg-teal-500/20 p-3 rounded-2xl text-teal-300 border border-teal-400/30 shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {lang === 'ar' ? 'مرجع معتمد للصيدلي السريري والطالب' : 'Accredited Clinical Casebook & PPCP Guide'}
                </span>
                <span dir="ltr" className="text-[11px] font-mono text-teal-300/90">
                  Local DB: {CASEBOOK_DRIVE_URL}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white leading-snug">
                {lang === 'ar'
                  ? 'دليل أخذ الحالات السريرية والتعامل معها، وحالات التدريب والاختبار التفاعلي (PPCP & Clinical Casebook)'
                  : 'Clinical Pharmacist & Student Case-Taking Guide, OSCE Training & Live App Test Cases'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                {lang === 'ar'
                  ? 'قاعدة بيانات مرجعية محلية متكاملة داخل التطبيق: تستخرج كل التعليمات المنهجية في كيفية أخذ الحالة السريرية (CC, HPI, BPMH, DRPs, SOAP)، وأهم المعلومات المطلوبة في كل مرض، مع حالات تدريبية للطلاب وحالات اختبار حية للتطبيق دون الحاجة إلى Google Drive.'
                  : 'Embedded local reference database: complete methodology for bedside case-taking, syndrome-specific must-gather checklists, student OSCE training vignettes, and live application benchmark test cases.'}
              </p>
            </div>
          </div>

          {/* Direct Local Database Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onOpenLocalReference?.(CASEBOOK_DRIVE_URL)}
              className="flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-teal-300" />
              <span>{lang === 'ar' ? 'فتح الدليل محلياً (Local DB)' : 'Open in Local DB'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const resolved = resolveLocalReference(CASEBOOK_DRIVE_URL);
                const md = exportLocalReferenceMarkdown(resolved.chapter, lang);
                const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `clinpharm-local-ref-${resolved.chapter.id}.md`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تصدير الدليل (.md)' : 'Export Local (.md)'}</span>
            </button>
          </div>
        </div>

        {/* 3-Mode Segmented Switcher (Mobile-First Horizontal Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setActiveMode('guide')}
            className={`flex items-center justify-between gap-2 p-3 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer border ${
              activeMode === 'guide'
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? '1. كيفية أخذ الحالة وأهم المعلومات (Case-Taking Guide)'
                  : '1. How to Take a Case & Checklists'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20">
              {DISEASE_CASE_CHECKLISTS.length} Syndromes
            </span>
          </button>

          <button
            onClick={() => setActiveMode('training')}
            className={`flex items-center justify-between gap-2 p-3 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer border ${
              activeMode === 'training'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? '2. حالات تدريبية للطلاب (Student OSCE Cases)'
                  : '2. Student Training Cases'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20" dir="ltr">
              {correctCount}/{CLINICAL_CASES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMode('testcases')}
            className={`flex items-center justify-between gap-2 p-3 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer border ${
              activeMode === 'testcases'
                ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-md'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? '3. حالات اختبار التطبيق الحية (App Test Cases)'
                  : '3. Live App Test Cases'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20">
              {BENCHMARK_APP_TEST_CASES.length} Live Tests
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          MODE 1: HOW TO TAKE A CLINICAL CASE & ESSENTIAL INFORMATION CHECKLISTS
         ===================================================================== */}
      {activeMode === 'guide' && (
        <div className="space-y-6">
          {/* SECTION A: 5-Step Clinical Case-Taking & PPCP Workup Protocol */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'أولاً: المنهجية القياسية في كيفية أخذ الحالة السريرية والتعامل معها (5-Step PPCP Workup)'
                      : 'Part A: 5-Step Clinical Pharmacist Case-Taking & Workup Methodology'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'اضغط على أي خطوة لاستعراض الأسئلة السريرية والمعلومات الواجب استخراجها والأخطاء الشائعة التي يجب تجنبها.'
                    : 'Tap each step to inspect core bedside questions, data extraction targets, and common clinical pitfalls.'}
                  </p>
              </div>
            </div>

            {/* Horizontal Step Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {PPCP_WORKUP_STEPS.map((st, idx) => (
                <button
                  key={st.code}
                  onClick={() => setSelectedStepIdx(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer border shrink-0 ${
                    selectedStepIdx === idx
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/20 text-[11px] flex items-center justify-center font-mono">
                    {st.stepNumber}
                  </span>
                  <span dir="ltr">{st.code}</span>
                </button>
              ))}
            </div>

            {/* Active Step Detail Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
              <div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider" dir="ltr">
                  {activeStep.code}
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {lang === 'ar' ? activeStep.titleAr : activeStep.titleEn}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === 'ar' ? activeStep.subtitleAr : activeStep.subtitleEn}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Core Questions to Ask */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                  <div className="text-xs font-extrabold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'الأسئلة الجوهرية عند أخذ الحالة (What to Ask / Check):'
                        : 'Core Bedside Questions:'}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {(lang === 'ar' ? activeStep.coreQuestionsAr : activeStep.coreQuestionsEn).map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold mt-0.5">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to Extract & Document */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                  <div className="text-xs font-extrabold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'أهم البيانات الواجب استخراجها وتوثيقها (Data to Extract):'
                        : 'Essential Data to Extract:'}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {(lang === 'ar' ? activeStep.whatToExtractAr : activeStep.whatToExtractEn).map((ext, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ext}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clinical Pitfall Box */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">
                    {lang === 'ar' ? 'تنبيه من المرجع (Clinical Pitfall to Avoid): ' : 'Clinical Pitfall to Avoid: '}
                  </span>
                  <span>{lang === 'ar' ? activeStep.clinicalPitfallAr : activeStep.clinicalPitfallEn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Condition-Specific Essential Information Checklists */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'ثانياً: ما هي أهم المعلومات التي يجب أن تأخذها في كل حالة سريرية؟ (Interactive Bedside Checklists)'
                      : 'Part B: Essential Information to Collect in Every Clinical Syndrome'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'اختر المتلازمة السريرية لتفقد قائمة التحقق التفاعلية (الأسئلة، التحاليل الإلزامية، الفخاخ الدوائية، وخوارزمية التعامل + قالب SOAP جاهز).'
                    : 'Select a clinical syndrome to use the interactive bedside workup checklist, golden rules, and ready SOAP template.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {lang === 'ar'
                    ? `تم التحقق: ${syndromeCheckedCount} / ${activeSyndrome.checklist.length}`
                    : `Checked: ${syndromeCheckedCount} / ${activeSyndrome.checklist.length}`}
                </span>
              </div>
            </div>

            {/* Syndrome Horizontal Selector */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {DISEASE_CASE_CHECKLISTS.map(syn => (
                <button
                  key={syn.id}
                  onClick={() => setSelectedSyndromeId(syn.id)}
                  className={`px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer border shrink-0 ${
                    selectedSyndromeId === syn.id
                      ? 'bg-slate-900 text-white dark:bg-teal-600 border-transparent shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span dir="ltr">{syn.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Syndrome Header & Golden Rule */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50/90 to-emerald-50/70 dark:from-teal-950/40 dark:to-emerald-950/20 border border-teal-200/80 dark:border-teal-800/60 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  dir="ltr"
                  className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-teal-600 text-white"
                >
                  {activeSyndrome.badge} • Ward: {activeSyndrome.ward}
                </span>
                {onAskCopilot && (
                  <button
                    onClick={() =>
                      onAskCopilot(
                        `اشرح لي بالتفصيل كيفية أخذ حالة (${activeSyndrome.titleAr}) وما هي أهم التحاليل والجرعات والفخاخ الدوائية وفق دليل الحالات السريرية و DiPiro 13th Ed.`
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>{lang === 'ar' ? 'استشر الـ Copilot في هذه الحالة' : 'Ask Copilot'}</span>
                  </button>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {lang === 'ar' ? activeSyndrome.titleAr : activeSyndrome.titleEn}
              </h4>

              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'أمثلة الشكوى الرئيسية (Typical Chief Complaints): ' : 'Typical Chief Complaints: '}
                </span>
                {lang === 'ar' ? activeSyndrome.chiefComplaintExamplesAr : activeSyndrome.chiefComplaintExamplesEn}
              </div>

              <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-teal-300 dark:border-teal-700 text-xs font-bold text-teal-900 dark:text-teal-200 leading-relaxed">
                {lang === 'ar' ? activeSyndrome.goldenRuleAr : activeSyndrome.goldenRuleEn}
              </div>
            </div>

            {/* Interactive Must-Gather Items Checklist */}
            <div className="space-y-3">
              <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                {lang === 'ar'
                  ? 'قائمة التحقق السريرية لما يجب جمعه وفحصه في هذه الحالة (اضغط للتأشير أثناء أخذ الحالة):'
                  : 'Interactive Must-Gather Clinical Checklist (Tap to check off during bedside workup):'}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeSyndrome.checklist.map(item => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-700'
                          : item.isCritical
                          ? 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/60 hover:border-rose-300'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {lang === 'ar' ? item.categoryLabelAr : item.categoryLabelEn}
                          </span>
                          {item.isCritical && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
                              {lang === 'ar' ? 'معلومة حرجة إلزامية (Critical)' : 'Critical Must-Check'}
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                          {lang === 'ar' ? item.itemAr : item.itemEn}
                        </p>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="font-bold text-teal-700 dark:text-teal-400">
                            {lang === 'ar' ? 'لماذا تهم الصيدلي؟ ' : 'Why it matters: '}
                          </span>
                          {lang === 'ar' ? item.whyItMattersAr : item.whyItMattersEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Management & Ready SOAP Note Template */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5">
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>
                    {lang === 'ar'
                      ? 'خوارزمية التعامل مع الحالة بعد جمع المعلومات (Action Algorithm):'
                      : 'Step-by-Step Management Algorithm:'}
                  </span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {(lang === 'ar' ? activeSyndrome.workupAlgorithmAr : activeSyndrome.workupAlgorithmEn).map(
                    (step, i) => (
                      <li key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        {step}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-extrabold text-teal-300 flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? 'نموذج توثيق الحالة الجاهز (Ready SOAP Note Template):'
                        : 'Ready SOAP Note Template:'}
                    </span>
                  </h5>
                  <button
                    onClick={() => handleCopySoapTemplate(activeSyndrome.id)}
                    className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                  >
                    {copiedSoapId === activeSyndrome.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'نسخ قالب SOAP' : 'Copy SOAP'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs font-mono leading-relaxed text-slate-200">
                  <div>
                    <span className="text-amber-300 font-bold">S: </span>
                    {activeSyndrome.soapTemplateAr.subjective}
                  </div>
                  <div dir="ltr" className="text-teal-300">
                    <span className="text-amber-300 font-bold">O: </span>
                    {activeSyndrome.soapTemplateAr.objective}
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold">A: </span>
                    {activeSyndrome.soapTemplateAr.assessment}
                  </div>
                  <div className="whitespace-pre-line pt-1 border-t border-white/10 text-emerald-300">
                    <span className="text-amber-300 font-bold">P: </span>
                    {activeSyndrome.soapTemplateAr.plan}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 2: STUDENT TRAINING & OSCE CASEBOOK (8 INTERACTIVE CASES)
         ===================================================================== */}
      {activeMode === 'training' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Case Selector Tabs — Horizontally scrollable on Android */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CLINICAL_CASES.map((c, idx) => {
              const isDone = completedCases[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 border ${
                    activeCaseIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-teal-600 dark:border-teal-500 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span>{lang === 'ar' ? c.title : c.titleEn}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 rounded-md text-xs font-bold uppercase tracking-wider"
                  dir="ltr"
                >
                  {activeCase.difficulty}
                </span>
                <span
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1"
                  dir="ltr"
                >
                  <ChevronRight className={`h-3.5 w-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} /> Ward: {activeCase.ward}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{activeCase.summary}</span>
            </div>

            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {lang === 'ar' ? activeCase.title : activeCase.titleEn}
                </h3>

                {/* Structured Case-Taking Breakdown Card for the Student */}
                <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-700 dark:text-teal-400">
                    <Stethoscope className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'ملخص أخذ الحالة السريرية (Structured Bedside Case Presentation):'
                        : 'Structured Bedside Case Presentation:'}
                    </span>
                  </div>
                  <p>{activeCase.patientBrief}</p>
                  <div
                    className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-mono text-xs text-teal-700 dark:text-teal-300 flex items-start gap-2"
                    dir="ltr"
                  >
                    <Activity className="w-4 h-4 shrink-0 mt-0.5 text-teal-500" />
                    <span>{activeCase.vitalsAndLabs}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Pill className="w-3.5 h-3.5 text-blue-500" />
                      {lang === 'ar' ? 'الأدوية الحالية / المقترحة (Current Regimen):' : 'Current Regimen:'}
                    </span>
                    {activeCase.currentRegimen.map((med, i) => (
                      <span
                        key={i}
                        dir="ltr"
                        className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-start sm:items-center gap-2 text-sm sm:text-base">
                  <HelpCircle className="h-5 w-5 text-teal-500 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{activeCase.question}</span>
                </h4>

                <div className="space-y-3">
                  {activeCase.options.map(opt => {
                    const isSelected = selectedOption === opt.id;
                    let btnStyle =
                      'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50';

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-500/80';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 dark:border-rose-500/80';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/30 ring-2 ring-teal-500/20';
                    }

                    return (
                      <div key={opt.id}>
                        <button
                          onClick={() => !isSubmitted && setSelectedOption(opt.id)}
                          disabled={isSubmitted}
                          className={`w-full text-start p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <div
                            className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSubmitted && opt.isCorrect
                                ? 'bg-emerald-500 text-white'
                                : isSubmitted && isSelected && !opt.isCorrect
                                ? 'bg-rose-500 text-white'
                                : isSelected
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {opt.id.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white leading-relaxed block">
                              {opt.text}
                            </span>

                            {isSubmitted && (isSelected || opt.isCorrect) && (
                              <div
                                className={`mt-3 pt-3 border-t text-xs flex items-start gap-2 leading-relaxed ${
                                  opt.isCorrect
                                    ? 'border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                                    : 'border-rose-200 dark:border-rose-800/50 text-rose-800 dark:text-rose-300'
                                }`}
                              >
                                {opt.isCorrect ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                                )}
                                <span>{opt.explanation}</span>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Reference Pearl Box shown after submission */}
              {isSubmitted && matchedChapters.length > 0 && (
                <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300">
                    <BookOpen className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    {lang === 'ar'
                      ? 'المستخرج المرجعي المرتبط بالحالة (Casebook Guide, DiPiro 13th Ed & ACCP 2026):'
                      : 'Linked Reference Extracts (Casebook Guide, DiPiro 13th Ed & ACCP 2026):'}
                  </div>
                  {matchedChapters.slice(0, 2).map(ch => (
                    <div
                      key={ch.id}
                      className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/40 text-xs space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {lang === 'ar' ? ch.titleAr : ch.title}
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenLocalReference?.(ch.sourceUrl)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold transition cursor-pointer"
                          dir="ltr"
                        >
                          <Database className="w-3 h-3" />
                          <span>{ch.sourceUrl}</span>
                        </button>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lang === 'ar' ? ch.keyRecommendationsAr[0] : ch.keyRecommendations[0]}
                      </p>
                      <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                        {lang === 'ar' ? 'اللؤلؤة السريرية (Clinical Pearl): ' : 'Clinical Pearl: '}
                        {lang === 'ar' ? ch.clinicalPearlsAr[0] : ch.clinicalPearls[0]}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
                <div className="text-xs text-slate-400">
                  {lang === 'ar'
                    ? `الحالة التدريبية ${activeCaseIndex + 1} من ${CLINICAL_CASES.length}`
                    : `Training Case ${activeCaseIndex + 1} of ${CLINICAL_CASES.length}`}
                </div>
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="bg-slate-900 dark:bg-teal-600 text-white px-6 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {lang === 'ar' ? 'تحقق من القرار الإكلينيكي (Submit)' : 'Submit Clinical Decision'}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedOption(null);
                        setIsSubmitted(false);
                      }}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {lang === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
                    </button>
                    {activeCaseIndex < CLINICAL_CASES.length - 1 && (
                      <button
                        onClick={() => handleSelectCase(activeCaseIndex + 1)}
                        className="bg-teal-600 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-teal-500 transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'الحالة التالية ←' : 'Next Case →'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 3: LIVE APPLICATION BENCHMARK TEST CASES SUITE
         ===================================================================== */}
      {activeMode === 'testcases' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'حالات الاختبار المرجعية للتطبيق (Live Application Benchmark Test Cases)'
                    : 'Live Application Benchmark Test Cases from Reference Casebook'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {lang === 'ar'
                  ? 'حالات سريرية كاملة مستخرجة من المرجع لاختبار كفاءة محركات التطبيق (فحص التداخلات DDI، حسابات CrCl و TDM، المطابقة الدوائية MedRec، وتوليد SOAP). بضغطة زر واحدة يمكنك إدراج الحالة في العنبر وفتح ملفها لاختبار النظام عملياً!'
                  : 'Complete clinical test cases extracted from the reference guide to benchmark the app’s CDSS engines (Renal PK, DDI Scanner, MedRec, and SOAP generator).'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {BENCHMARK_APP_TEST_CASES.map(tc => {
              const isLoaded = !!loadedTestIds[tc.id];
              return (
                <div
                  key={tc.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        dir="ltr"
                        className="text-[11px] font-mono font-extrabold px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300"
                      >
                        {tc.code}
                      </span>
                      <span
                        dir="ltr"
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                      >
                        {tc.categoryBadge}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                      {lang === 'ar' ? tc.titleAr : tc.titleEn}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {lang === 'ar' ? tc.clinicalSummaryAr : tc.clinicalSummaryEn}
                    </p>

                    {/* Must-Gather Information in this Case */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                        <ListChecks className="w-4 h-4 shrink-0" />
                        <span>
                          {lang === 'ar'
                            ? 'أهم المعلومات السريرية المستخرجة في هذه الحالة:'
                            : 'Must-Gather Clinical Parameters:'}
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {(lang === 'ar' ? tc.mustGatherHighlightsAr : tc.mustGatherHighlightsEn).map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What App Modules It Tests */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 shrink-0" />
                        <span>
                          {lang === 'ar'
                            ? 'محركات التطبيق التي تختبرها هذه الحالة:'
                            : 'App Modules & Engines Tested:'}
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {(lang === 'ar' ? tc.whatAppModulesItTestsAr : tc.whatAppModulesItTestsEn).map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected CDSS Alerts */}
                    <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/25 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
                      <div className="text-xs font-extrabold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>
                          {lang === 'ar'
                            ? 'التنبيهات والقرارات المتوقعة من التطبيق عند الاختبار:'
                            : 'Expected CDSS Findings & Interventions:'}
                        </span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-rose-900 dark:text-rose-200 leading-relaxed">
                        {(lang === 'ar' ? tc.expectedAppFindingsAr : tc.expectedAppFindingsEn).map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="font-bold">!</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleInjectTestCase(tc)}
                      className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-extrabold transition shadow-sm cursor-pointer active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-current shrink-0" />
                      <span>
                        {isLoaded
                          ? lang === 'ar'
                            ? 'تم إدراج الحالة! افتح ملف المريض في العنبر ←'
                            : 'Loaded! Open in Ward →'
                          : lang === 'ar'
                          ? 'تشغيل واختبار الحالة حياً في العنبر (Load & Test in App)'
                          : 'Load & Test Case Live in Ward'}
                      </span>
                    </button>
                    {tc.sampleIntervention?.referenceSourceUrl && (
                      <button
                        type="button"
                        onClick={() => onOpenLocalReference?.(tc.sampleIntervention!.referenceSourceUrl!)}
                        className="flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-xs font-bold transition cursor-pointer"
                      >
                        <Database className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{lang === 'ar' ? 'الفصل المرجعي (Local DB)' : 'Local Ref Chapter'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

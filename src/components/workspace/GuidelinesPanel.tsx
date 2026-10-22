import { useState, useEffect } from 'react';
import { Language, Patient, ClinicalIntervention } from '../../types/clinical';
import { HOSPITAL_GUIDELINES } from '../../lib/mockData';
import {
  PRIMARY_CLINICAL_REFERENCES,
  ACCP_2026_CHAPTERS,
  getCustomUserReferences,
  saveCustomUserReference,
  deleteCustomUserReference,
  buildSimulatorParamsFromPatient,
  simulateCaseWithReferences,
  resolveLocalReference,
  exportLocalReferenceMarkdown,
  type CustomReferenceNote,
  type CaseSimulatorParams,
  type QuickReferenceTable
} from '../../lib/clinicalReferences';
import {
  BookOpen,
  Search,
  Shield,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  FileDown,
  Printer,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Plus,
  Trash2,
  Library,
  FileText,
  Sliders,
  Activity,
  AlertTriangle,
  Zap,
  Table,
  GitBranch,
  UserCheck,
  RotateCcw,
  BookMarked
} from 'lucide-react';
import { ClinicalLibraryViewer } from './ClinicalLibraryViewer';

interface Props {
  lang: Language;
  patients?: Patient[];
  onAddIntervention?: (int: ClinicalIntervention) => void;
  onAskCopilotWithReference?: (prompt: string) => void;
  initialTargetUri?: string | null;
  onOpenLocalReference?: (uri: string) => void;
}

export function GuidelinesPanel({
  lang,
  patients = [],
  onAddIntervention,
  onAskCopilotWithReference,
  initialTargetUri,
  onOpenLocalReference
}: Props) {
  // Primary Mode Switcher: 'library' (Full Verbatim Medical Library) vs 'simulator' (Applied Case Simulation) vs 'explorer' (In-App Book/Chapter/Table Explorer)
  const [viewMode, setViewMode] = useState<'library' | 'simulator' | 'explorer'>('library');
  const [libraryChapterId, setLibraryChapterId] = useState<string | undefined>(undefined);

  // Simulator State (aligned with CaseSimulatorParams in clinicalReferences.ts)
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'custom');
  const [simParams, setSimParams] = useState<CaseSimulatorParams>(() =>
    patients[0]
      ? buildSimulatorParamsFromPatient(patients[0])
      : {
          scenarioId: 'icu_hap_sepsis_aki',
          patientName: 'Abdullah M. Al-Hazmi',
          age: 68,
          weightKg: 78,
          crcl: 28.5,
          serumCr: 2.4,
          potassium: 5.3,
          sodium: 138,
          sbp: 112,
          heartRate: 96,
          lvef: 35,
          inr: 1.3,
          childPughClass: 'A',
          hemodynamicProfile: 'warm_wet',
          hasPenicillinAnaphylaxis: true,
          hasAspirinAllergy: false,
          hasActiveBleed: false,
          switchingAceiToArni: false,
          onAmiodarone: true
        }
  );
  const [loggedActionIndex, setLoggedActionIndex] = useState<number | null>(null);

  // Explorer State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<
    'all' | 'casebook' | 'dipiro13' | 'cardio2026' | 'vol1' | 'vol2' | 'hospital'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemId, setActiveItemId] = useState<string>(ACCP_2026_CHAPTERS[0]?.id || 'guide-1');
  const [mobileShowDetail, setMobileShowDetail] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTargetUri) {
      const resolved = resolveLocalReference(initialTargetUri);
      if (
        resolved.verbatimChapterId ||
        initialTargetUri.includes('dipiro') ||
        initialTargetUri.includes('accp') ||
        initialTargetUri.includes('casebook') ||
        initialTargetUri.includes('hospital') ||
        initialTargetUri.includes('source')
      ) {
        setViewMode('library');
        setLibraryChapterId(resolved.verbatimChapterId || resolved.chapter.id);
      } else {
        setViewMode('explorer');
        setSelectedSourceFilter('all');
        setSelectedCategory('all');
        setSearchTerm('');
        setActiveItemId(resolved.chapter.id);
        setMobileShowDetail(true);
      }
    }
  }, [initialTargetUri]);

  const handleOpenInAppChapter = (uriOrId: string) => {
    const resolved = resolveLocalReference(uriOrId);
    if (resolved.verbatimChapterId) {
      setViewMode('library');
      setLibraryChapterId(resolved.verbatimChapterId);
    } else {
      setViewMode('explorer');
      setSelectedSourceFilter('all');
      setSelectedCategory('all');
      setSearchTerm('');
      setActiveItemId(resolved.chapter.id);
      setMobileShowDetail(true);
    }
  };

  const handleOpenVerbatimLibraryChapter = (chapterId: string) => {
    setViewMode('library');
    setLibraryChapterId(chapterId);
  };

  const handleExportLocalMonograph = (uriOrId: string) => {
    const resolved = resolveLocalReference(uriOrId);
    const md = exportLocalReferenceMarkdown(resolved.chapter, lang);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resolved.chapter.id}-clinical-monograph.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Custom NotebookLM / Google Drive Note Indexer
  const [customNotes, setCustomNotes] = useState<CustomReferenceNote[]>(() => getCustomUserReferences());
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [noteSourceId, setNoteSourceId] = useState(PRIMARY_CLINICAL_REFERENCES[0].id);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState('');

  // Run dynamic multi-reference simulation for the current case parameters
  const simulationResult = simulateCaseWithReferences(simParams);

  const handleSelectPatientForSim = (ptId: string) => {
    setSelectedPatientId(ptId);
    const found = patients.find(p => p.id === ptId);
    if (found) {
      setSimParams(buildSimulatorParamsFromPatient(found));
    }
  };

  const handleScenarioChange = (scenarioId: CaseSimulatorParams['scenarioId']) => {
    setSelectedPatientId('custom');
    if (scenarioId === 'icu_hap_sepsis_aki') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 2.4,
        crcl: 28.5,
        potassium: 5.3,
        sbp: 96,
        hasPenicillinAnaphylaxis: true,
        hasActiveBleed: false
      });
    } else if (scenarioId === 'hfref_adhf_cardiorenal') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 1.4,
        crcl: 48,
        potassium: 4.9,
        sbp: 108,
        lvef: 32,
        hemodynamicProfile: 'warm_wet',
        switchingAceiToArni: true,
        hasActiveBleed: false
      });
    } else if (scenarioId === 'acs_nstemi_dapt') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 0.9,
        crcl: 68,
        potassium: 4.5,
        sbp: 124,
        lvef: 38,
        hasAspirinAllergy: true,
        hasActiveBleed: false
      });
    } else if (scenarioId === 'afib_anticoag_interaction') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 1.8,
        crcl: 34,
        potassium: 4.4,
        sbp: 118,
        lvef: 35,
        inr: 3.2,
        onAmiodarone: true,
        hasActiveBleed: false
      });
    } else if (scenarioId === 'cirrhosis_ascites_he') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 1.3,
        crcl: 58,
        potassium: 3.6,
        sodium: 131,
        sbp: 102,
        childPughClass: 'B',
        inr: 1.7,
        hasActiveBleed: false
      });
    } else if (scenarioId === 'dka_hyperkalemia_glycemic') {
      setSimParams({
        ...simParams,
        scenarioId,
        serumCr: 1.9,
        crcl: 38,
        potassium: 5.6,
        sodium: 132,
        sbp: 104,
        hasActiveBleed: false
      });
    }
  };

  // Preset "What-If" Interactive Clinical Triggers
  const applyWhatIfPreset = (preset: string) => {
    setSelectedPatientId('custom');
    if (preset === 'hyperkalemia') {
      setSimParams(prev => ({
        ...prev,
        scenarioId: 'hfref_adhf_cardiorenal',
        potassium: 5.8,
        crcl: 26,
        serumCr: 2.5,
        switchingAceiToArni: true
      }));
    } else if (preset === 'cardiogenic-shock') {
      setSimParams(prev => ({
        ...prev,
        scenarioId: 'hfref_adhf_cardiorenal',
        sbp: 82,
        lvef: 22,
        crcl: 29,
        serumCr: 2.2,
        hemodynamicProfile: 'cold_wet'
      }));
    } else if (preset === 'septic-anuria') {
      setSimParams(prev => ({
        ...prev,
        scenarioId: 'icu_hap_sepsis_aki',
        crcl: 16,
        serumCr: 3.6,
        sbp: 84,
        hasPenicillinAnaphylaxis: true
      }));
    } else if (preset === 'warfarin-supratherapeutic') {
      setSimParams(prev => ({
        ...prev,
        scenarioId: 'afib_anticoag_interaction',
        inr: 5.4,
        onAmiodarone: true,
        crcl: 27,
        hasActiveBleed: true
      }));
    } else if (preset === 'cirrhosis-hyponatremia-hrs') {
      setSimParams(prev => ({
        ...prev,
        scenarioId: 'cirrhosis_ascites_he',
        sodium: 121,
        sbp: 84,
        serumCr: 2.3,
        crcl: 28,
        childPughClass: 'C'
      }));
    }
  };

  const handleLogSimulatedIntervention = (idx: number) => {
    if (!onAddIntervention) return;
    const action = simulationResult.immediateActions[idx];
    if (!action) return;

    const activePt = patients.find(p => p.id === selectedPatientId) || patients[0];
    const newInt: ClinicalIntervention = {
      id: `int-sim-${Date.now()}`,
      patientId: activePt?.id || 'pt-1',
      patientName: activePt ? (lang === 'ar' ? activePt.name : activePt.nameEn) : 'Simulated Case Patient',
      mrn: activePt?.mrn || 'CPH-SIM',
      ward: activePt?.ward || 'ICU',
      date: new Date().toISOString().split('T')[0],
      drpType:
        action.priority === 'STOP_HOLD'
          ? 'adverse_drug_reaction'
          : action.priority === 'DOSE_ADJUST'
          ? 'renal_dose_adjustment'
          : 'drug_interaction',
      medicationInvolved: action.drugOrTarget,
      clinicalIssue: lang === 'ar' ? action.rationaleAr : action.rationaleEn,
      proposedRecommendation: lang === 'ar' ? action.actionAr : action.actionEn,
      rationale: `${lang === 'ar' ? action.rationaleAr : action.rationaleEn} (${action.citationBadge})`,
      severity: action.priority === 'STOP_HOLD' || action.priority === 'DOSE_ADJUST' ? 'high' : 'medium',
      pharmacist: 'Dr. خالد الشورماني',
      physician: activePt?.attendingPhysician || 'Attending Medical Team',
      status: 'pending',
      costImpactEstimatedSAR: 950,
      referenceTitle: action.citationBadge,
      referenceSourceUrl: action.sourceUrl,
      evidenceLevel: 'DiPiro 13th Ed / ACCP 2026 Simulation'
    };

    onAddIntervention(newInt);
    setLoggedActionIndex(idx);
    setTimeout(() => setLoggedActionIndex(null), 2500);
  };

  const categories = [
    'all',
    'Clinical Case-Taking & Workup Methodology',
    'Cardiology & Anticoagulation',
    'Antimicrobial Stewardship (AMS)',
    'Critical Care & Fluids',
    'Electrolyte Replacement',
    'Pharmacokinetics, Renal & Med Safety',
    'Oncology, GI/Liver & Endocrine',
    'Pulmonology, Neurology & Specialty'
  ];

  // Unified items combining all 6 Embedded Reference Databases + Hospital P&T Guidelines
  const unifiedItems = [
    ...ACCP_2026_CHAPTERS.map(ch => {
      const sourceType =
        ch.bookId === 'casebook-guide'
          ? ('casebook' as const)
          : ch.bookId === 'dipiro-13th'
          ? ('dipiro13' as const)
          : ch.bookId === 'accp-cardio-2026'
          ? ('cardio2026' as const)
          : ch.bookId === 'notebooklm-hub' || ch.bookId === 'hospital-compendium'
          ? ('hospital' as const)
          : ch.volume === 1
          ? ('vol1' as const)
          : ('vol2' as const);

      const badge =
        ch.bookId === 'casebook-guide'
          ? `Casebook & PPCP DB • ${ch.pages}`
          : ch.bookId === 'dipiro-13th'
          ? `DiPiro 13th Ed DB • ${ch.pages}`
          : ch.bookId === 'accp-cardio-2026'
          ? `ACCP Cardiology 2026 DB • ${ch.pages}`
          : ch.bookId === 'notebooklm-hub'
          ? `Local Stewardship Hub • ${ch.pages}`
          : ch.bookId === 'hospital-compendium'
          ? `Hospital Dosing DB • ${ch.pages}`
          : `ACCP 2026 Vol. ${ch.volume} DB • pp. ${ch.pages}`;

      return {
        id: ch.id,
        sourceType,
        badge,
        category: ch.category,
        categoryAr: ch.categoryAr,
        title: ch.title,
        titleAr: ch.titleAr,
        summary: ch.summary,
        summaryAr: ch.summaryAr,
        pathophysiology: lang === 'ar' ? ch.pathophysiologyAr : ch.pathophysiology,
        algorithmSteps: lang === 'ar' ? ch.algorithmStepsAr : ch.algorithmSteps,
        quickTables: ch.quickTables || ([] as QuickReferenceTable[]),
        recommendations: lang === 'ar' ? ch.keyRecommendationsAr : ch.keyRecommendations,
        pearls: lang === 'ar' ? ch.clinicalPearlsAr : ch.clinicalPearls,
        evidenceLevel: ch.evidenceLevel,
        sourceUrl: ch.sourceUrl,
        authors: ch.authors,
        uan: ch.uan
      };
    }),
    ...HOSPITAL_GUIDELINES.map(g => ({
      id: g.id,
      sourceType: 'hospital' as const,
      badge: 'Hospital P&T Protocol DB',
      category: g.category,
      categoryAr: g.category,
      title: g.title,
      titleAr: g.titleAr,
      summary: g.summary,
      summaryAr: g.summary,
      pathophysiology: undefined,
      algorithmSteps: undefined,
      quickTables: [] as QuickReferenceTable[],
      recommendations: g.recommendations,
      pearls: [
        lang === 'ar'
          ? 'يجب توثيق مبرر استخدام Restricted Antimicrobials (Meropenem / Vancomycin) ومراجعة De-escalation خلال 72 ساعة.'
          : 'Automated 72-hour stewardship review applies to restricted broad-spectrum antimicrobials.'
      ],
      evidenceLevel: 'Hospital P&T Committee Mandate',
      sourceUrl: 'local://ref/chapter/notebooklm-icu-stewardship-hub',
      authors: undefined,
      uan: undefined
    }))
  ];

  const filteredItems = unifiedItems.filter(item => {
    if (selectedSourceFilter !== 'all' && item.sourceType !== selectedSourceFilter) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.titleAr.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.summaryAr.toLowerCase().includes(term) ||
        item.recommendations.some(r => r.toLowerCase().includes(term)) ||
        item.pearls.some(p => p.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const activeItem = filteredItems.find(i => i.id === activeItemId) || filteredItems[0] || unifiedItems[0];

  const handleCopyCitation = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    saveCustomUserReference({
      sourceId: noteSourceId,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: noteTags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    });
    setCustomNotes(getCustomUserReferences());
    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setIsAddNoteOpen(false);
  };

  const handleDeleteCustomNote = (id: string) => {
    const updated = deleteCustomUserReference(id);
    setCustomNotes(updated);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-500/30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-300 text-[11px] sm:text-xs font-semibold mb-1.5">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'In-App Applied Reference Simulator & Knowledge Hub (5 Accredited Sources)'
                  : 'Interactive Applied Reference Simulator & In-App Knowledge Hub (5 Accredited Sources)'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold leading-snug">
              {lang === 'ar'
                ? 'المحاكاة الإكلينيكية التطبيقية واستخراج المراجع حسب الحالة (DiPiro 13th • ACCP Cardiology 2026 • ACCP 2026)'
                : 'Applied Case-Driven Reference Simulator (DiPiro 13th • ACCP Cardiology 2026 • ACCP 2026)'}
            </h2>
            <p className="text-emerald-100/80 text-xs mt-1 max-w-4xl leading-relaxed">
              {lang === 'ar'
                ? 'استخرج الـ Dosing Regimens المخصصة لحالة المريض، والـ Stop/Hold Triggers، ومسارات الـ Clinical Algorithms، والـ Quick Reference Tables مباشرةً من المراجع الخمسة داخل التطبيق دون فتح ملفات PDF خارجية.'
                : 'Extract patient-tailored dosing, stop/hold triggers, step-by-step clinical algorithms, and quick reference tables directly from all 5 accredited sources inside the app without opening external PDFs.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsAddNoteOpen(!isAddNoteOpen)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 min-h-[42px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md"
            >
              <Plus className="w-4 h-4" />
              {lang === 'ar' ? '+ فهرسة Clinical Note' : '+ Index Reference Note'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 min-h-[42px] bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/20 transition"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة الخطة' : 'Print Plan'}</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher Bar inside Banner */}
        <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            <button
              onClick={() => setViewMode('library')}
              className={`flex items-center justify-center sm:justify-start gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs cursor-pointer ${
                viewMode === 'library'
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/20'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BookMarked className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? '📖 المكتبة المرجعية الكاملة (Full Medical Library)'
                  : '📖 Full Verbatim Medical Library (Unabridged)'}
              </span>
            </button>

            <button
              onClick={() => setViewMode('simulator')}
              className={`flex items-center justify-center sm:justify-start gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs cursor-pointer ${
                viewMode === 'simulator'
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/20'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? '🧬 محاكي الحالات السريرية (Applied Case Simulator)'
                  : '🧬 Applied Case-Driven Reference Simulator'}
              </span>
            </button>

            <button
              onClick={() => setViewMode('explorer')}
              className={`flex items-center justify-center sm:justify-start gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs cursor-pointer ${
                viewMode === 'explorer'
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/20'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? `📚 مستكشف الفصول & Quick Tables (${unifiedItems.length} Chapters)`
                  : `📚 In-App Book & Table Explorer (${unifiedItems.length} Chapters)`}
              </span>
            </button>
          </div>

          <span className="text-[11px] text-emerald-200 font-mono hidden xl:inline">
            ✓ Zero-PDF-Leave In-App Clinical Extraction Active
          </span>
        </div>
      </div>

      {/* Accredited Reference Sources (Horizontal Snap Carousel on Android Mobile, 3-Col/6-Col Grid on Desktop) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Library className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'قاعدة البيانات المرجعية المحلية المدمجة في التطبيق (6 Embedded Clinical Databases — بدون مغادرة لـ Google Drive):'
                : '6 Embedded In-App Clinical Reference Databases (100% Local Resolution — Zero External Drive Links):'}
            </span>
          </h3>
          <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 lg:hidden">
            {lang === 'ar' ? 'اسحب أفقياً ⇆' : 'Swipe ⇆'}
          </span>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar lg:grid lg:grid-cols-3">
          {PRIMARY_CLINICAL_REFERENCES.map(ref => (
            <div
              key={ref.id}
              className="min-w-[275px] sm:min-w-[300px] lg:min-w-0 snap-start bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-teal-500/60 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1 text-[11px] text-teal-700 dark:text-teal-400 font-bold">
                  <span className="truncate">{lang === 'ar' ? ref.badgeAr : ref.badge}</span>
                  <span dir="ltr" className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50">
                    LOCAL DB
                  </span>
                </div>

                <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-snug">
                  {lang === 'ar' ? ref.titleAr : ref.title}
                </h4>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {lang === 'ar' ? ref.subtitleAr : ref.subtitle}
                </p>

                <ul className="space-y-1 pt-0.5">
                  {(lang === 'ar' ? ref.highlightsAr : ref.highlights).slice(0, 2).map((h, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="line-clamp-2">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const resolved = resolveLocalReference(ref.viewUrl);
                    setViewMode('explorer');
                    setSelectedCategory('all');
                    setSearchTerm('');
                    if (ref.id === 'clinical-casebook-guide') setSelectedSourceFilter('casebook');
                    else if (ref.id === 'dipiro-13th-ed') setSelectedSourceFilter('dipiro13');
                    else if (ref.id === 'accp-cardiology-2026') setSelectedSourceFilter('cardio2026');
                    else if (ref.id === 'accp-2026-vol1-vol2') setSelectedSourceFilter('vol1');
                    else if (ref.id === 'notebooklm-31c74a31' || ref.id === 'gdrive-clinical-ref-2') setSelectedSourceFilter('hospital');
                    else setSelectedSourceFilter('all');
                    setActiveItemId(resolved.chapter.id);
                    setMobileShowDetail(true);
                  }}
                  className="flex-1 min-h-[38px] inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'فتح من قاعدة البيانات' : 'Open Local DB'}</span>
                </button>

                {onOpenLocalReference && (
                  <button
                    type="button"
                    onClick={() => onOpenLocalReference(ref.viewUrl)}
                    title={lang === 'ar' ? 'معاينة فورية للمرجع المحلي' : 'Quick Local Reader'}
                    className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleExportLocalMonograph(ref.viewUrl)}
                  title={lang === 'ar' ? 'تصدير ملخص المرجع محلياً (.md)' : 'Export Local Monograph (.md)'}
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-600 transition"
                >
                  <FileDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCitation(ref.id, ref.citationTemplate)}
                  title={lang === 'ar' ? 'نسخ Citation المحلي' : 'Copy Local Citation'}
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                >
                  {copiedId === ref.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Reference Note Drawer */}
      {isAddNoteOpen && (
        <form
          onSubmit={handleAddCustomNote}
          className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-teal-500/40 shadow-lg space-y-4 text-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {lang === 'ar'
                  ? 'إضافة وفهرسة Clinical Excerpt من المراجع الخمسة (DiPiro / ACCP / NotebookLM)'
                  : 'Index Clinical Excerpt from Accredited References'}
              </h4>
              <p className="text-slate-500 mt-0.5">
                {lang === 'ar'
                  ? 'تُحفظ الملاحظات محلياً وتُستخدم تلقائياً كمرجع إضافي لـ Clinical Copilot أثناء الجولات.'
                  : 'Saved notes are indexed locally and automatically used by the AI Copilot and clinical search.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddNoteOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-2"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">
                {lang === 'ar' ? 'المصدر المرجعي المرتبط' : 'Linked Reference Source'}
              </label>
              <select
                value={noteSourceId}
                onChange={e => setNoteSourceId(e.target.value)}
                className="w-full min-h-[42px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
              >
                {PRIMARY_CLINICAL_REFERENCES.map(r => (
                  <option key={r.id} value={r.id}>
                    {lang === 'ar' ? r.titleAr : r.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">
                {lang === 'ar' ? 'عنوان الـ Protocol أو Excerpt' : 'Protocol / Excerpt Title'}
              </label>
              <input
                type="text"
                required
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
                placeholder="e.g. IV-to-PO Switch Criteria or Hepatic Dosing Table..."
                className="w-full min-h-[42px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">
              {lang === 'ar' ? 'النص الإكلينيكي أو توصية الـ Dosing' : 'Clinical Excerpt / Dosing Content'}
            </label>
            <textarea
              rows={3}
              required
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder="Paste clinical recommendations, PK equations, or notes here..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <input
              type="text"
              value={noteTags}
              onChange={e => setNoteTags(e.target.value)}
              placeholder="Tags (e.g. vancomycin, hfref, dipiro)"
              className="flex-1 min-h-[42px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAddNoteOpen(false)}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="min-h-[42px] px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
              >
                {lang === 'ar' ? 'حفظ وفهرسة' : 'Save & Index'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Custom Indexed Notes Display */}
      {customNotes.length > 0 && (
        <div className="bg-teal-50/60 dark:bg-teal-950/30 rounded-2xl p-4 border border-teal-200 dark:border-teal-900/50 space-y-3">
          <h4 className="text-xs font-extrabold text-teal-900 dark:text-teal-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            {lang === 'ar'
              ? `المقتطفات المفهرسة محلياً من المراجع (${customNotes.length}):`
              : `Locally Indexed Excerpts from Reference Sources (${customNotes.length}):`}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customNotes.map(note => (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-start gap-3"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{note.title}</div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    {note.sourceId} • {note.addedAt}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCustomNote(note.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 shrink-0"
                  title={lang === 'ar' ? 'حذف' : 'Delete'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 0: FULL VERBATIM MEDICAL REFERENCE LIBRARY (UNABRIDGED & INDEXED)
         ===================================================================== */}
      {viewMode === 'library' && (
        <div className="space-y-4">
          <ClinicalLibraryViewer
            lang={lang}
            initialChapterId={libraryChapterId}
            onAskCopilot={onAskCopilotWithReference}
            onNavigateLocalRef={handleOpenInAppChapter}
          />
        </div>
      )}

      {/* =====================================================================
          MODE 1: APPLIED CASE-DRIVEN CLINICAL REFERENCE SIMULATOR
         ===================================================================== */}
      {viewMode === 'simulator' && (
        <div className="space-y-5 sm:space-y-6">
          {/* Control Panel: Patient Picker + Scenario Picker + What-If Triggers */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Real-Time Patient-Tailored Reference Extraction
                </span>
                <h3 className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  {lang === 'ar'
                    ? 'اختر مريضاً من الأجنحة أو عدّل مؤشرات (CrCl, K+, SBP, INR) لاستخراج القرارات الدوائية المخصصة:'
                    : 'Select an inpatient or adjust vitals/labs (CrCl, K+, SBP, INR) to synthesize tailored decisions:'}
                </h3>
              </div>

              {/* Active Inpatient Selector */}
              {patients.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    {lang === 'ar' ? 'تطبيق على مريض:' : 'Load Inpatient:'}
                  </span>
                  {patients.map(pt => (
                    <button
                      key={pt.id}
                      onClick={() => handleSelectPatientForSim(pt.id)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                        selectedPatientId === pt.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'ar' ? pt.name.split(' ').slice(0, 2).join(' ') : pt.nameEn} ({pt.ward})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5 Clinical Pathophysiology Scenarios */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300">
                {lang === 'ar'
                  ? '1. المسار الإكلينيكي للحالة (Clinical Pathophysiology Scenario):'
                  : '1. Clinical Pathophysiology Scenario:'}
              </label>
              <div className="flex overflow-x-auto snap-x gap-2.5 pb-1 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-5">
                {(
                  [
                    {
                      id: 'icu_hap_sepsis_aki' as const,
                      titleAr: 'Severe HAP / Sepsis + AKI + Vancomycin/Meropenem PK',
                      titleEn: 'Sepsis + AKI + Vancomycin/Beta-Lactam PK',
                      books: 'DiPiro Ch.54/118 • ACCP Vol.2'
                    },
                    {
                      id: 'hfref_adhf_cardiorenal' as const,
                      titleAr: 'HFrEF (4 Pillars GDMT) + ADHF & Cardiorenal Syndrome',
                      titleEn: 'HFrEF 4-Pillar GDMT & Cardiorenal',
                      books: 'DiPiro Ch.32 • ACCP Cardio'
                    },
                    {
                      id: 'acs_nstemi_dapt' as const,
                      titleAr: 'NSTEMI / Post-PCI + P2Y12 Switching & Aspirin Allergy',
                      titleEn: 'ACS/PCI + P2Y12 & Aspirin Allergy',
                      books: 'ACCP Cardio Ch.5 • DiPiro'
                    },
                    {
                      id: 'afib_anticoag_interaction' as const,
                      titleAr: 'AFib Anticoagulation + Warfarin/Amiodarone CYP2C9 DDI',
                      titleEn: 'AFib + DOAC/Warfarin-Amiodarone',
                      books: 'ACCP Cardio Ch.2-3 • Vol.1'
                    },
                    {
                      id: 'cirrhosis_ascites_he' as const,
                      titleAr: 'Decompensated Cirrhosis + Ascites, HE & HRS-AKI',
                      titleEn: 'Decompensated Cirrhosis + Ascites/HE',
                      books: 'DiPiro Ch.46 • ACCP Vol.2'
                    }
                  ]
                ).map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`min-w-[235px] sm:min-w-0 snap-start p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                      simParams.scenarioId === sc.id
                        ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-600 ring-1 ring-teal-500'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-snug">
                      {lang === 'ar' ? sc.titleAr : sc.titleEn}
                    </div>
                    <div dir="ltr" className="text-[10px] font-mono text-teal-600 dark:text-teal-400 mt-2">
                      {sc.books}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Sliders & Clinical Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
              {/* CrCl & SCr */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">CrCl (Cockcroft-Gault):</span>
                  <span
                    dir="ltr"
                    className={`font-mono font-extrabold text-sm ${
                      simParams.crcl < 30 ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                    }`}
                  >
                    {simParams.crcl} mL/min
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  step={1}
                  value={Math.round(simParams.crcl)}
                  onChange={e => {
                    const crcl = Number(e.target.value);
                    const estScr = Number(Math.max(0.6, 95 / Math.max(crcl, 10)).toFixed(1));
                    setSimParams({ ...simParams, crcl, serumCr: estScr });
                  }}
                  className="w-full accent-teal-600 h-2"
                />
                <div dir="ltr" className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>ESRD (10)</span>
                  <span>SCr: {simParams.serumCr} mg/dL</span>
                  <span>Normal (120)</span>
                </div>
              </div>

              {/* Serum Potassium (K+) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Serum Potassium (K+):</span>
                  <span
                    dir="ltr"
                    className={`font-mono font-extrabold text-sm ${
                      simParams.potassium >= 5.5 || simParams.potassium < 3.5
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-teal-600 dark:text-teal-400'
                    }`}
                  >
                    {simParams.potassium} mEq/L
                  </span>
                </div>
                <input
                  type="range"
                  min={2.5}
                  max={6.8}
                  step={0.1}
                  value={simParams.potassium}
                  onChange={e => setSimParams({ ...simParams, potassium: Number(e.target.value) })}
                  className="w-full accent-teal-600 h-2"
                />
                <div dir="ltr" className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Hypo (2.5)</span>
                  <span>Hold MRA &gt;5.0</span>
                  <span>Hyper (6.8)</span>
                </div>
              </div>

              {/* Systolic BP & LVEF */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Systolic BP / LVEF:</span>
                  <span
                    dir="ltr"
                    className={`font-mono font-extrabold text-sm ${
                      simParams.sbp < 90 ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                    }`}
                  >
                    {simParams.sbp} mmHg • EF {simParams.lvef}%
                  </span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={160}
                  step={2}
                  value={simParams.sbp}
                  onChange={e => setSimParams({ ...simParams, sbp: Number(e.target.value) })}
                  className="w-full accent-teal-600 h-2"
                />
                <div dir="ltr" className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Shock (70)</span>
                  <span>Wt: {simParams.weightKg} kg</span>
                  <span>HTN (160)</span>
                </div>
              </div>

              {/* Sodium / INR / Child-Pugh */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Serum Na+ / INR:</span>
                  <span
                    dir="ltr"
                    className={`font-mono font-extrabold text-sm ${
                      simParams.sodium < 125 || simParams.inr > 3.5
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-teal-600 dark:text-teal-400'
                    }`}
                  >
                    Na {simParams.sodium} • INR {simParams.inr}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Na+ (mEq/L)</span>
                    <input
                      type="number"
                      min={112}
                      max={155}
                      value={simParams.sodium}
                      onChange={e => setSimParams({ ...simParams, sodium: Number(e.target.value) })}
                      className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">INR</span>
                    <input
                      type="number"
                      step={0.1}
                      min={0.9}
                      max={9.0}
                      value={simParams.inr}
                      onChange={e => setSimParams({ ...simParams, inr: Number(e.target.value) })}
                      className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Risk Flags & "What-If" Simulation Buttons */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={simParams.hasPenicillinAnaphylaxis}
                    onChange={e => setSimParams({ ...simParams, hasPenicillinAnaphylaxis: e.target.checked })}
                    className="rounded text-teal-600 w-4 h-4"
                  />
                  <span>Penicillin IgE Anaphylaxis</span>
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={simParams.hasAspirinAllergy}
                    onChange={e => setSimParams({ ...simParams, hasAspirinAllergy: e.target.checked })}
                    className="rounded text-teal-600 w-4 h-4"
                  />
                  <span>Aspirin Bronchospasm</span>
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={simParams.onAmiodarone}
                    onChange={e => setSimParams({ ...simParams, onAmiodarone: e.target.checked })}
                    className="rounded text-teal-600 w-4 h-4"
                  />
                  <span>On Amiodarone</span>
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-rose-700 dark:text-rose-400">
                  <input
                    type="checkbox"
                    checked={simParams.hasActiveBleed}
                    onChange={e => setSimParams({ ...simParams, hasActiveBleed: e.target.checked })}
                    className="rounded text-rose-600 w-4 h-4"
                  />
                  <span>Active Major Bleed</span>
                </label>
              </div>

              {/* 1-Click "What-If" Simulation Triggers */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1">
                <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'محاكاة "What-If":' : 'What-If:'}
                </span>

                <button
                  onClick={() => applyWhatIfPreset('hyperkalemia')}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[11px] font-bold whitespace-nowrap transition"
                >
                  K+ = 5.8 mEq/L
                </button>

                <button
                  onClick={() => applyWhatIfPreset('cardiogenic-shock')}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-bold whitespace-nowrap transition"
                >
                  SBP = 82 (Cold & Wet)
                </button>

                <button
                  onClick={() => applyWhatIfPreset('septic-anuria')}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[11px] font-bold whitespace-nowrap transition"
                >
                  Septic AKI (CrCl 16)
                </button>

                <button
                  onClick={() => applyWhatIfPreset('warfarin-supratherapeutic')}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[11px] font-bold whitespace-nowrap transition"
                >
                  INR = 5.4 + Bleed
                </button>

                <button
                  onClick={() => applyWhatIfPreset('cirrhosis-hyponatremia-hrs')}
                  className="px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px] font-bold whitespace-nowrap transition"
                >
                  HRS-AKI (Na+ 121)
                </button>

                {patients[0] && (
                  <button
                    onClick={() => handleSelectPatientForSim(patients[0].id)}
                    title={lang === 'ar' ? 'إعادة ضبط' : 'Reset'}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Simulation Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left 7 Cols: Prioritized Clinical Decisions + Active Algorithm Branch */}
            <div className="lg:col-span-7 space-y-5">
              {/* Active Case Summary Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 text-white border border-teal-500/30 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
                    Active Case Pharmacotherapy & PK Synthesis
                  </span>
                  <span dir="ltr" className="text-[11px] font-mono bg-teal-500/20 text-teal-200 px-2.5 py-0.5 rounded-full">
                    CrCl: {simParams.crcl} mL/min • K+: {simParams.potassium} • SBP: {simParams.sbp}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                  {lang === 'ar' ? simulationResult.headlineAr : simulationResult.headlineEn}
                </h4>
                <div className="text-xs text-teal-100/90 leading-relaxed font-mono bg-white/5 p-3 rounded-xl border border-white/10">
                  <GitBranch className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                  {(lang === 'ar'
                    ? simulationResult.activeAlgorithmBranchAr
                    : simulationResult.activeAlgorithmBranchEn
                  ).join(' ➔ ')}
                </div>
              </div>

              {/* Prioritized Decisions List */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? `القرارات الدوائية وتعديلات الجرعات المستخرجة للحالة (${simulationResult.immediateActions.length}):`
                      : `Patient-Tailored Clinical Decisions & Dosing Adjustments (${simulationResult.immediateActions.length}):`}
                  </span>
                </h4>

                <div className="space-y-3">
                  {simulationResult.immediateActions.map((act, idx) => {
                    const badgeStyle =
                      act.priority === 'STOP_HOLD'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border-rose-300'
                        : act.priority === 'DOSE_ADJUST'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300'
                        : act.priority === 'START_ESCALATE'
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300'
                        : 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border-purple-300';

                    return (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                            {lang === 'ar' ? act.priorityLabelAr : act.priorityLabelEn}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenLocalReference
                                ? onOpenLocalReference(act.sourceUrl)
                                : handleOpenInAppChapter(act.sourceUrl)
                            }
                            dir="ltr"
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/70 px-2.5 py-1 rounded-lg border border-teal-300/60 dark:border-teal-800 transition"
                            title={lang === 'ar' ? 'فتح الاستدلال من قاعدة البيانات المحلية' : 'Open Local Reference Chapter'}
                          >
                            <BookOpen className="w-3 h-3 shrink-0" />
                            <span>{act.citationBadge}</span>
                          </button>
                        </div>

                        <div className="text-xs font-extrabold text-teal-800 dark:text-teal-300" dir="ltr">
                          Target: {act.drugOrTarget}
                        </div>

                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-snug">
                          {lang === 'ar' ? act.actionAr : act.actionEn}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === 'ar' ? act.rationaleAr : act.rationaleEn}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenInAppChapter(act.sourceUrl)}
                            className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold transition"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                            <span>{lang === 'ar' ? 'فتح الفصل المحلي' : 'Open Local Chapter'}</span>
                          </button>

                          {onAddIntervention && (
                            <button
                              onClick={() => handleLogSimulatedIntervention(idx)}
                              className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition shadow-xs"
                            >
                              {loggedActionIndex === idx ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{lang === 'ar' ? 'تم التوثيق في السجل!' : 'Logged to Interventions!'}</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{lang === 'ar' ? 'توثيق كـ Clinical Intervention (DRP)' : 'Log as DRP Intervention'}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ready SOAP Note Extracted from Simulation */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    {lang === 'ar' ? 'ملاحظة SOAP Note الموثقة جاهزة للنسخ:' : 'Ready-to-Copy Grounded SOAP Plan:'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() =>
                        handleCopyCitation(
                          'soap-sim',
                          lang === 'ar' ? simulationResult.readySoapPlanAr : simulationResult.readySoapPlanEn
                        )
                      }
                      className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {copiedId === 'soap-sim' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'نسخ SOAP Note' : 'Copy SOAP Plan'}</span>
                        </>
                      )}
                    </button>

                    {onAskCopilotWithReference && (
                      <button
                        onClick={() =>
                          onAskCopilotWithReference(
                            lang === 'ar'
                              ? `بناءً على محاكاة الحالة (${simulationResult.headlineAr}) مع CrCl ${simParams.crcl} mL/min و K+ ${simParams.potassium} mEq/L، اشرح لي التفصيل الحركي (PK/PD) وخطة الـ TDM اليومية وفق DiPiro 13th Ed و ACCP 2026.`
                              : `Based on this simulated case (${simulationResult.headlineEn}) with CrCl ${simParams.crcl} mL/min and K+ ${simParams.potassium} mEq/L, explain the detailed PK rationale and daily monitoring plan per DiPiro 13th Ed and ACCP 2026.`
                          )
                        }
                        className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'مناقشة مع Clinical Copilot' : 'Discuss with Copilot'}</span>
                      </button>
                    )}
                  </div>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {lang === 'ar' ? simulationResult.readySoapPlanAr : simulationResult.readySoapPlanEn}
                </pre>
              </div>
            </div>

            {/* Right 5 Cols: Side-by-Side Reference Synthesis & In-App Quick Dosing Tables */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Library className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'المقتطفات المخصصة لحالة المريض من كل مرجع (Multi-Book Synthesis):'
                      : 'Side-by-Side Reference Synthesis Tailored to This Patient:'}
                  </span>
                </h4>

                <div className="space-y-3">
                  {simulationResult.referenceExtracts.map((ext, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/20 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-teal-800 dark:text-teal-300">
                          📘 {lang === 'ar' ? ext.sourceBadgeAr : ext.sourceBadge}
                        </span>
                        <span
                          dir="ltr"
                          className="text-[10px] font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500"
                        >
                          {ext.pages}
                        </span>
                      </div>

                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        {lang === 'ar' ? ext.chapterTitleAr : ext.chapterTitle}
                      </div>

                      <div className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold">
                        {lang === 'ar' ? ext.roleInCaseAr : ext.roleInCaseEn}
                      </div>

                      <ul className="space-y-1.5 pt-1">
                        {(lang === 'ar' ? ext.tailoredExtractAr : ext.tailoredExtractEn).map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between gap-2">
                        <span dir="ltr" className="text-[10px] font-mono text-slate-500 truncate">
                          {ext.sourceUrl}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onOpenLocalReference
                              ? onOpenLocalReference(ext.sourceUrl)
                              : handleOpenInAppChapter(ext.sourceUrl)
                          }
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'فتح الفصل الكامل محلياً' : 'Open Local Chapter'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-App Quick Dosing Tables */}
              {simulationResult.quickDosingTables.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Table className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'الجداول المرجعية السريعة المستخرجة للحالة (Quick Reference Tables):'
                        : 'In-App Quick Dosing & Decision Tables:'}
                    </span>
                  </h4>

                  {simulationResult.quickDosingTables.map((tbl, tIdx) => (
                    <div key={tIdx} className="space-y-2">
                      <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        {lang === 'ar' ? tbl.titleAr : tbl.title}
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                        <table className="w-full text-[11px] text-right">
                          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                            <tr>
                              {(lang === 'ar' ? tbl.headersAr : tbl.headers).map((h, hIdx) => (
                                <th key={hIdx} className="p-2.5 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {(lang === 'ar' ? tbl.rowsAr : tbl.rows).map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-2.5 ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : ''}`}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 2: IN-APP BOOK, ALGORITHM & QUICK TABLE EXPLORER
         ===================================================================== */}
      {viewMode === 'explorer' && (
        <div className="space-y-5">
          {/* Source Filter Tabs + Specialty Filter + Search */}
          <div className="space-y-3 bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
              <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
                {(
                  [
                    { id: 'all', labelAr: `كل المراجع (${unifiedItems.length})`, labelEn: `All Books (${unifiedItems.length})` },
                    { id: 'casebook', labelAr: 'Casebook & PPCP', labelEn: 'Casebook & PPCP' },
                    { id: 'dipiro13', labelAr: 'DiPiro 13th Ed', labelEn: 'DiPiro 13th Ed' },
                    { id: 'cardio2026', labelAr: 'ACCP Cardiology 2026', labelEn: 'ACCP Cardiology 2026' },
                    { id: 'vol1', labelAr: 'ACCP 2026 Vol. 1', labelEn: 'ACCP 2026 Vol. 1' },
                    { id: 'vol2', labelAr: 'ACCP 2026 Vol. 2', labelEn: 'ACCP 2026 Vol. 2' },
                    { id: 'hospital', labelAr: 'Hospital & Stewardship DB', labelEn: 'Hospital & Stewardship DB' }
                  ] as const
                ).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedSourceFilter(tab.id);
                      setMobileShowDetail(false);
                    }}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                      selectedSourceFilter === tab.id
                        ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'ar' ? tab.labelAr : tab.labelEn}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    lang === 'ar'
                      ? 'ابحث في DiPiro 13th, ACCP Cardiology, الجداول...'
                      : 'Search DiPiro 13th, ACCP Cardiology, tables...'
                  }
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setMobileShowDetail(false);
                  }}
                  className="w-full min-h-[40px] text-xs pl-3 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedCategory(c);
                    setMobileShowDetail(false);
                  }}
                  className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    selectedCategory === c
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c === 'all' ? (lang === 'ar' ? 'جميع التخصصات (All Specialties)' : 'All Clinical Specialties') : c}
                </button>
              ))}
            </div>
          </div>

          {/* Main Master-Detail Grid (On Android Mobile: Toggles cleanly between Chapter List and Chapter Reader) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left List of Chapters & Guidelines */}
            <div
              className={`lg:col-span-5 space-y-2.5 lg:max-h-[820px] lg:overflow-y-auto pr-1 ${
                mobileShowDetail ? 'hidden lg:block' : 'block'
              }`}
            >
              {filteredItems.map(g => (
                <div
                  key={g.id}
                  onClick={() => {
                    setActiveItemId(g.id);
                    setMobileShowDetail(true);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    activeItem?.id === g.id
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="text-[11px] font-bold text-teal-700 dark:text-teal-400">
                      {g.badge} · {lang === 'ar' ? g.categoryAr : g.category}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 shrink-0 transition ${
                        activeItem?.id === g.id ? 'rotate-90 text-teal-600' : ''
                      }`}
                    />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                    {lang === 'ar' ? g.titleAr : g.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {lang === 'ar' ? g.summaryAr : g.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Active Chapter / Protocol Details */}
            {activeItem && (
              <div
                className={`lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 ${
                  mobileShowDetail ? 'block' : 'hidden lg:block'
                }`}
              >
                {/* Mobile Back-to-Chapters Bar */}
                <div className="lg:hidden pb-2 border-b border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setMobileShowDetail(false)}
                    className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-extrabold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? `العودة لقائمة الفصول (${filteredItems.length} Chapters)`
                        : `Back to Chapters List (${filteredItems.length})`}
                    </span>
                  </button>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-teal-600 dark:text-teal-400 font-bold">
                    <span>
                      {activeItem.badge} · {activeItem.evidenceLevel}
                    </span>
                    {activeItem.uan && (
                      <span className="font-mono text-[11px] text-slate-400">ACPE UAN: {activeItem.uan}</span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {lang === 'ar' ? activeItem.titleAr : activeItem.title}
                  </h3>

                  {activeItem.authors && (
                    <p className="text-xs text-slate-500 font-medium">
                      Author(s): {activeItem.authors}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar' ? activeItem.summaryAr : activeItem.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => setViewMode('simulator')}
                      className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition shadow-xs"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'ar' ? 'تطبيق في Case Simulator' : 'Simulate on Patient Case'}
                      </span>
                    </button>

                    {onAskCopilotWithReference && (
                      <button
                        onClick={() =>
                          onAskCopilotWithReference(
                            lang === 'ar'
                              ? `استناداً إلى ${activeItem.titleAr}، لخص لي أهم توصيات الـ Dosing والـ Renal Adjustments والـ Drug Interactions.`
                              : `Based on ${activeItem.title}, summarize the key dosing protocols, renal adjustments, and critical interactions.`
                          )
                        }
                        className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'اسأل Clinical Copilot' : 'Ask Copilot'}</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleCopyCitation(
                          activeItem.id,
                          `${activeItem.title} (${activeItem.evidenceLevel}). Source: ${activeItem.sourceUrl}`
                        )
                      }
                      className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                    >
                      {copiedId === activeItem.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExportLocalMonograph(activeItem.sourceUrl)}
                      className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition"
                    >
                      <FileDown className="w-3.5 h-3.5 text-teal-600" />
                      <span>{lang === 'ar' ? 'تصدير الفصل محلياً (.md)' : 'Export Local Chapter (.md)'}</span>
                    </button>

                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300"
                    >
                      <span>{activeItem.sourceUrl}</span>
                    </span>
                  </div>
                </div>

                {/* Pathophysiologic Basis */}
                {activeItem.pathophysiology && (
                  <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 text-xs space-y-1.5">
                    <div className="font-extrabold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Pathophysiologic & Pharmacokinetic Basis:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {activeItem.pathophysiology}
                    </p>
                  </div>
                )}

                {/* Step-by-Step Clinical Decision Algorithm */}
                {activeItem.algorithmSteps && activeItem.algorithmSteps.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Step-by-Step Clinical Decision Algorithm:</span>
                    </h4>
                    <div className="space-y-2">
                      {activeItem.algorithmSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border-r-4 border-teal-600 text-xs font-medium text-slate-800 dark:text-slate-200"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In-App Quick Reference Dosing Tables */}
                {activeItem.quickTables && activeItem.quickTables.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Table className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>In-App Quick Reference Dosing & Comparison Tables:</span>
                    </h4>
                    {activeItem.quickTables.map((tbl, tIdx) => (
                      <div key={tIdx} className="space-y-2">
                        <div className="text-xs font-bold text-teal-700 dark:text-teal-300">
                          {lang === 'ar' ? tbl.titleAr : tbl.title}
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                          <table className="w-full text-xs text-right">
                            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                              <tr>
                                {(lang === 'ar' ? tbl.headersAr : tbl.headers).map((h, hIdx) => (
                                  <th key={hIdx} className="p-2.5 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {(lang === 'ar' ? tbl.rowsAr : tbl.rows).map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`p-2.5 ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : ''}`}
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
                    ))}
                  </div>
                )}

                {/* Key Clinical Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Accredited Clinical Recommendations & Dosing Protocols:</span>
                  </h4>

                  <div className="space-y-2.5">
                    {activeItem.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          {rec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Pearls & Stewardship Mandate */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>BCPS / BCCP Clinical Pearls & Safety Mandates:</span>
                  </p>
                  <ul className="space-y-1.5">
                    {activeItem.pearls.map((pearl, idx) => (
                      <li key={idx} className="leading-relaxed flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

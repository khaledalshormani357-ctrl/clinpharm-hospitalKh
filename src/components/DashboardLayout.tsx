import { useState } from 'react';
import { Patient, PatientStatus, Language, ClinicalIntervention, ReconciliationDiscrepancy, Medication, LabResult } from '../types/clinical';
import { translations } from '../lib/i18n';
import {
  Users,
  FileCheck,
  Calculator,
  ShieldAlert,
  ClipboardList,
  BookOpen,
  GraduationCap,
  Sparkles,
  Search,
  Plus,
  Moon,
  Sun,
  Globe,
  Stethoscope,
  Activity,
  AlertTriangle,
  Building2,
  Database,
  FileDown,
  GitBranch,
  Table,
  CheckCircle2,
  X,
  Download
} from 'lucide-react';
import { ReconciliationPanel } from './workspace/ReconciliationPanel';
import { CalculatorsPanel } from './workspace/CalculatorsPanel';
import { AlertsPanel } from './workspace/AlertsPanel';
import { DocumentationPanel } from './workspace/DocumentationPanel';
import { GuidelinesPanel } from './workspace/GuidelinesPanel';
import { TrainingPanel } from './workspace/TrainingPanel';
import { CopilotDialog } from './CopilotDialog';
import { PatientDetailsModal } from './PatientDetailsModal';
import { NewPatientModal } from './NewPatientModal';
import { GitHubReleaseModal } from './GitHubReleaseModal';
import { calculateCrCl, analyzePatientSafety } from '../lib/clinical-engine';
import { resolveLocalReference, exportLocalReferenceMarkdown } from '../lib/clinicalReferences';
import { syncQueue } from '../lib/supabase/syncQueue';
import { authService } from '../lib/supabase/auth';

interface Props {
  patients: Patient[];
  interventions: ClinicalIntervention[];
  discrepancies: ReconciliationDiscrepancy[];
  onAddPatient: (patient: Patient) => void;
  onAddMedication: (patientId: string, med: Medication) => void;
  onUpdatePatientLabs?: (patientId: string, updatedLabs: LabResult) => void;
  onAddIntervention: (int: ClinicalIntervention) => void;
  onUpdateInterventionStatus: (id: string, status: any, feedback?: string) => void;
  onAddDiscrepancy: (disc: ReconciliationDiscrepancy) => void;
  onResolveDiscrepancy: (id: string, action: string) => void;
}

export function DashboardLayout({
  patients,
  interventions,
  discrepancies,
  onAddPatient,
  onAddMedication,
  onUpdatePatientLabs,
  onAddIntervention,
  onUpdateInterventionStatus,
  onAddDiscrepancy,
  onResolveDiscrepancy
}: Props) {
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'patients' | 'reconciliation' | 'calculators' | 'alerts' | 'interventions' | 'guidelines' | 'training'
  >('patients');
  const [selectedWard, setSelectedWard] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | PatientStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotPrompt, setCopilotPrompt] = useState<string | null>(null);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isSyncAuditOpen, setIsSyncAuditOpen] = useState(false);
  const [isGitHubReleaseOpen, setIsGitHubReleaseOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [auditNotice, setAuditNotice] = useState<string | null>(null);
  const [activeLocalRefUri, setActiveLocalRefUri] = useState<string | null>(null);
  const [guidelinesTargetUri, setGuidelinesTargetUri] = useState<string | null>(null);

  const handleOpenLocalReference = (uri: string) => {
    setActiveLocalRefUri(uri);
  };

  const resolvedLocalRef = activeLocalRefUri ? resolveLocalReference(activeLocalRefUri) : null;

  const t = translations[lang];

  const getStatusBadgeStyle = (status: PatientStatus) => {
    switch (status) {
      case 'critical':
        return {
          badgeClass:
            'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-800 shadow-2xs',
          dotClass: 'bg-rose-600 animate-ping',
          solidDotClass: 'bg-rose-600',
          avatarClass: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 ring-2 ring-rose-300/60 dark:ring-rose-800/60',
          cardBorderClass: 'border-s-4 border-s-rose-500 border-slate-200/90 dark:border-slate-800'
        };
      case 'observation':
        return {
          badgeClass:
            'bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800 shadow-2xs',
          dotClass: 'bg-amber-500 animate-pulse',
          solidDotClass: 'bg-amber-500',
          avatarClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 ring-2 ring-amber-300/60 dark:ring-amber-800/60',
          cardBorderClass: 'border-s-4 border-s-amber-500 border-slate-200/90 dark:border-slate-800'
        };
      case 'improving':
        return {
          badgeClass:
            'bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-200 border border-sky-300 dark:border-sky-800 shadow-2xs',
          dotClass: 'bg-sky-500',
          solidDotClass: 'bg-sky-500',
          avatarClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 ring-2 ring-sky-300/60 dark:ring-sky-800/60',
          cardBorderClass: 'border-s-4 border-s-sky-500 border-slate-200/90 dark:border-slate-800'
        };
      case 'discharge_planned':
        return {
          badgeClass:
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800 shadow-2xs',
          dotClass: 'bg-indigo-500',
          solidDotClass: 'bg-indigo-500',
          avatarClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 ring-2 ring-indigo-300/60 dark:ring-indigo-800/60',
          cardBorderClass: 'border-s-4 border-s-indigo-500 border-slate-200/90 dark:border-slate-800'
        };
      case 'stable':
      default:
        return {
          badgeClass:
            'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 shadow-2xs',
          dotClass: 'bg-emerald-500',
          solidDotClass: 'bg-emerald-500',
          avatarClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 ring-2 ring-emerald-300/50 dark:ring-emerald-800/50',
          cardBorderClass: 'border-s-4 border-s-emerald-500 border-slate-200/90 dark:border-slate-800'
        };
    }
  };

  const filteredPatients = patients.filter(p => {
    if (selectedWard !== 'all' && p.ward !== selectedWard) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q) ||
        (p.caseReport?.chiefComplaint || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleOpenInterventionModal = (_pt: Patient) => {
    setActiveTab('interventions');
    setSelectedPatient(null);
  };

  const isSafetyGroupActive = activeTab === 'alerts' || activeTab === 'interventions';
  const isMoreGroupActive = activeTab === 'reconciliation' || activeTab === 'training';

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } font-sans overflow-x-hidden`}
    >
      {/* Compact Sticky Top App Bar (Android-First Ergonomics: 56px on mobile, 64px on desktop) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left / Start: Brand & Active Screen Context */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 text-white flex items-center justify-center shadow-sm shadow-teal-500/20 shrink-0">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-sm sm:text-lg tracking-tight bg-gradient-to-r from-teal-700 to-emerald-600 dark:from-teal-400 dark:to-emerald-300 bg-clip-text text-transparent truncate">
                    {t.appName}
                  </h1>
                  <span className="hidden lg:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200/50">
                    Medical Mix • Inpatient CDSS
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                  <span className="md:hidden font-semibold text-teal-700 dark:text-teal-400">
                    {t.tabs[activeTab]}
                  </span>
                  <span className="hidden md:inline">
                    {t.hospitalName} • {t.dutyPharmacist}
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Touch-Friendly Action Controls (Minimum 40x40px targets) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setIsGitHubReleaseOpen(true)}
                title={lang === 'ar' ? 'تثبيت التطبيق وإصدار GitHub' : 'Install App & GitHub Release'}
                className="flex items-center justify-center gap-1.5 min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-teal-300 border border-slate-700 text-xs font-bold transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="hidden md:inline">
                  {lang === 'ar' ? 'تثبيت التطبيق / GitHub' : 'Install / GitHub'}
                </span>
              </button>

              <button
                onClick={() => setIsSyncAuditOpen(true)}
                title={lang === 'ar' ? 'Offline Sync Queue' : 'Sync Queue'}
                className="flex items-center justify-center gap-1.5 min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
              >
                <Activity className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="hidden lg:inline">{lang === 'ar' ? 'Sync Queue' : 'Sync Queue'}</span>
                {syncQueue.hasPendingSync() ? (
                  <span className="text-[10px] bg-amber-500 text-white font-mono px-1.5 py-0.2 rounded-full font-bold">
                    {syncQueue.getPendingCount()}
                  </span>
                ) : (
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">✓</span>
                )}
              </button>

              <button
                onClick={() => setIsCopilotOpen(true)}
                className="flex items-center justify-center gap-1.5 min-h-[40px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold transition shadow-sm shadow-teal-600/20 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
                <span className="hidden sm:inline">Clinical Copilot</span>
              </button>

              <button
                onClick={toggleLanguage}
                title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى Medical Mix عربي/إنجليزي'}
                className="flex items-center justify-center gap-1 min-h-[40px] min-w-[44px] px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              >
                <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>

              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                className="flex items-center justify-center min-h-[40px] min-w-[40px] p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar (Hidden on Android Mobile to preserve viewport height) */}
        <div className="hidden md:block border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
              <button
                onClick={() => setActiveTab('patients')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'patients'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                {t.tabs.patients}
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {patients.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('guidelines')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'guidelines'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                {t.tabs.guidelines}
              </button>

              <button
                onClick={() => setActiveTab('calculators')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'calculators'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                {t.tabs.calculators}
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'alerts'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {t.tabs.alerts}
              </button>

              <button
                onClick={() => setActiveTab('interventions')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'interventions'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                {t.tabs.interventions}
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {interventions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reconciliation')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'reconciliation'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                {t.tabs.reconciliation}
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {discrepancies.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('training')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === 'training'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                {t.tabs.training}
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Sub-Switcher when inside grouped tabs (Safety/DRP or MedRec/Training) */}
        {(isSafetyGroupActive || isMoreGroupActive) && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 px-3 py-1.5">
            {isSafetyGroupActive ? (
              <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'alerts'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'فحص التداخلات (DDI & Safety)' : 'DDI & Safety'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('interventions')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'interventions'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar' ? `توثيق DRP & SOAP (${interventions.length})` : `DRP & SOAP (${interventions.length})`}
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('reconciliation')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'reconciliation'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar' ? `المطابقة الدوائية MedRec (${discrepancies.length})` : `MedRec (${discrepancies.length})`}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('training')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'training'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'حالات البورد (BCPS/BCCP)' : 'BCPS/BCCP Cases'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Container — pb-24 on mobile ensures bottom nav never obscures content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        {/* TAB 1: Patients & Inpatient Rounds */}
        {activeTab === 'patients' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'جولة الصيدلة الإكلينيكية بالأجنحة (Inpatient Clinical Rounds)'
                      : 'Inpatient Clinical Pharmacy Rounds'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'متابعة يومية لـ CrCl / eGFR، أهداف TDM (AUC24/MIC)، وملفات MAR لجميع المنومين في الـ ICU والـ CCU والأجنحة.'
                    : 'Daily monitoring of CrCl / eGFR, TDM targets (AUC24/MIC), and MAR charts across ICU, CCU, and inpatient wards.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('training')}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold transition border border-slate-700 active:scale-95 whitespace-nowrap"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'ar' ? 'دليل أخذ الحالة وحالات الاختبار' : 'Case-Taking Guide & Test Cases'}
                  </span>
                </button>
                <button
                  onClick={() => setIsNewPatientOpen(true)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-teal-600/20 active:scale-95 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  {t.patient.addNewPatient}
                </button>
              </div>
            </div>

            {/* Filter Controls: Horizontal Scrollable Ward Chips, Status Badges & Search */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                  {(['all', 'ICU', 'CCU', 'InternalMedicine', 'Surgery', 'Oncology', 'Pediatrics'] as const).map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWard(w)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                        selectedWard === w
                          ? 'bg-slate-900 text-white dark:bg-teal-600 dark:text-white border-transparent shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {w === 'all' ? t.wards.all : t.wards[w]}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t.actions.search}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full min-h-[42px] text-xs pl-3 pr-9 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Color-Coded Patient Status Badges Filter Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 me-1">
                  {lang === 'ar' ? 'حالة المريض:' : 'Patient Status:'}
                </span>
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition border flex items-center gap-1.5 ${
                    selectedStatus === 'all'
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{lang === 'ar' ? 'الكل (All)' : 'All Statuses'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {patients.length}
                  </span>
                </button>

                {(['critical', 'observation', 'improving', 'stable', 'discharge_planned'] as PatientStatus[]).map(st => {
                  const count = patients.filter(p => p.status === st).length;
                  const style = getStatusBadgeStyle(st);
                  const isSelected = selectedStatus === st;

                  return (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(isSelected ? 'all' : st)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                        style.badgeClass
                      } ${isSelected ? 'ring-2 ring-offset-1 ring-slate-900 dark:ring-teal-400 scale-[1.02]' : 'opacity-85 hover:opacity-100'}`}
                    >
                      <span className="relative flex h-2 w-2">
                        {st === 'critical' && (
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.solidDotClass}`} />
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${style.solidDotClass}`} />
                      </span>
                      <span>{t.status[st]}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/80 dark:bg-slate-900/80 font-mono">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Cards Grid — Ergonomic Mobile Cards on Android, 2-col on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredPatients.map(patient => {
                const crcl = calculateCrCl(
                  patient.age,
                  patient.weight,
                  patient.height,
                  patient.gender,
                  patient.labs.serumCreatinine
                );
                const safety = analyzePatientSafety(patient);
                const statusStyle = getStatusBadgeStyle(patient.status);

                return (
                  <div
                    key={patient.id}
                    className={`bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border ${statusStyle.cardBorderClass} shadow-xs hover:shadow-md transition flex flex-col justify-between`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            dir="ltr"
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${statusStyle.avatarClass}`}
                          >
                            {patient.age}y
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                                {lang === 'ar' ? patient.name : patient.nameEn}
                              </h3>
                              <span
                                dir="ltr"
                                className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                              >
                                {patient.mrn}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                              {t.wards[patient.ward]} • <span dir="ltr">{patient.room} ({patient.bed})</span>
                            </p>
                          </div>
                        </div>

                        {/* Color-Coded Visual Status Badge with Animated Indicator Dot */}
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-extrabold shrink-0 inline-flex items-center gap-1.5 ${statusStyle.badgeClass}`}
                        >
                          <span className="relative flex h-2 w-2">
                            {(patient.status === 'critical' || patient.status === 'observation') && (
                              <span
                                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${statusStyle.dotClass}`}
                              />
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${statusStyle.solidDotClass}`} />
                          </span>
                          <span>{t.status[patient.status]}</span>
                        </span>
                      </div>

                      {/* e-Casebook Chief Complaint (CC) & Vital Signs Quick Strip */}
                      {patient.caseReport && (
                        <div className="mb-3 p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-1 font-medium">
                              <span className="font-extrabold text-teal-700 dark:text-teal-400 me-1">CC:</span>
                              {patient.caseReport.chiefComplaint}
                            </p>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100/80 dark:bg-teal-950 text-teal-800 dark:text-teal-300 shrink-0">
                              e-Casebook
                            </span>
                          </div>
                          <div dir="ltr" className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700">
                              BP: <strong className="text-slate-800 dark:text-slate-200">{patient.caseReport.vitals.bp}</strong>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700">
                              HR: <strong className="text-slate-800 dark:text-slate-200">{patient.caseReport.vitals.hr}</strong> bpm
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700">
                              SpO2: <strong className="text-slate-800 dark:text-slate-200">{patient.caseReport.vitals.spo2}</strong>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700">
                              T: <strong className="text-slate-800 dark:text-slate-200">{patient.caseReport.vitals.temp}°C</strong>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Primary Diagnoses Preview Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {patient.diagnoses.slice(0, 2).map((diag, idx) => (
                          <span
                            key={idx}
                            dir="ltr"
                            className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg truncate max-w-full"
                          >
                            {diag}
                          </span>
                        ))}
                      </div>

                      {/* Clinical Indices Strip */}
                      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400 block text-[10px]">SCr</span>
                          <span dir="ltr" className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs sm:text-sm">
                            {patient.labs.serumCreatinine} mg/dL
                          </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400 block text-[10px]">CrCl (CG)</span>
                          <span
                            dir="ltr"
                            className={`font-bold font-mono text-xs sm:text-sm ${
                              crcl.crcl < 30 ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                            }`}
                          >
                            {crcl.crcl} mL/m
                          </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Active MAR</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs sm:text-sm">
                            {patient.activeMedications.length} Orders
                          </span>
                        </div>
                      </div>

                      {/* Allergies & Safety Badges */}
                      <div className="space-y-1.5 mb-3 text-xs">
                        {patient.allergies.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-rose-600">Allergies:</span>
                            {patient.allergies.map((a, i) => (
                              <span
                                key={i}
                                dir="ltr"
                                className="text-[10px] bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 px-2 py-0.5 rounded font-bold border border-rose-200/50"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        )}

                        {safety.criticalAlerts.length > 0 && (
                          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-[11px] text-rose-800 dark:text-rose-200 font-bold flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                            <span className="line-clamp-1">{safety.criticalAlerts[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions — Minimum 44px touch targets for Android */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition text-center active:scale-[0.99]"
                      >
                        {lang === 'ar' ? 'ملف المريض & Case Report' : t.patient.viewFile}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          handleOpenInterventionModal(patient);
                        }}
                        className="min-h-[44px] py-2 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-xs active:scale-[0.99]"
                      >
                        {lang === 'ar' ? '+ توثيق DRP' : '+ Log DRP'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Medication Reconciliation */}
        {activeTab === 'reconciliation' && (
          <ReconciliationPanel
            patients={patients}
            discrepancies={discrepancies}
            onAddDiscrepancy={onAddDiscrepancy}
            onResolveDiscrepancy={onResolveDiscrepancy}
            lang={lang}
          />
        )}

        {/* TAB 3: Clinical Calculators */}
        {activeTab === 'calculators' && <CalculatorsPanel lang={lang} />}

        {/* TAB 4: Safety & Drug Alerts */}
        {activeTab === 'alerts' && (
          <AlertsPanel
            patients={patients}
            lang={lang}
            onSelectPatientForIntervention={(p) => {
              handleOpenInterventionModal(p);
            }}
            onOpenLocalReference={handleOpenLocalReference}
          />
        )}

        {/* TAB 5: Clinical Interventions & SOAP Documentation */}
        {activeTab === 'interventions' && (
          <DocumentationPanel
            interventions={interventions}
            patients={patients}
            onAddIntervention={onAddIntervention}
            onUpdateStatus={onUpdateInterventionStatus}
            lang={lang}
            onOpenLocalReference={handleOpenLocalReference}
          />
        )}

        {/* TAB 6: Clinical Guidelines & Applied Reference Simulator */}
        {activeTab === 'guidelines' && (
          <GuidelinesPanel
            lang={lang}
            patients={patients}
            onAddIntervention={onAddIntervention}
            initialTargetUri={guidelinesTargetUri}
            onOpenLocalReference={handleOpenLocalReference}
            onAskCopilotWithReference={prompt => {
              setCopilotPrompt(prompt);
              setIsCopilotOpen(true);
            }}
          />
        )}

        {/* TAB 7: Clinical Training & Cases */}
        {activeTab === 'training' && (
          <TrainingPanel
            lang={lang}
            onOpenLocalReference={handleOpenLocalReference}
            onLoadTestCaseIntoWard={testCase => {
              const exists = patients.some(p => p.id === testCase.patientData.id);
              if (!exists) {
                onAddPatient(testCase.patientData);
              }
              testCase.discrepancies.forEach(d => {
                if (!discrepancies.some(existing => existing.id === d.id)) {
                  onAddDiscrepancy(d);
                }
              });
              if (
                testCase.sampleIntervention &&
                !interventions.some(existing => existing.id === testCase.sampleIntervention.id)
              ) {
                onAddIntervention(testCase.sampleIntervention);
              }
              setSelectedWard('all');
              setActiveTab('patients');
              setSelectedPatient(testCase.patientData);
            }}
            onAskCopilot={prompt => {
              setCopilotPrompt(prompt);
              setIsCopilotOpen(true);
            }}
          />
        )}
      </main>

      {/* Floating Copilot Trigger Button (Positioned above Android bottom nav on mobile) */}
      <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-30">
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-2 min-h-[44px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-xl shadow-teal-600/30 transition hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="hidden sm:inline">
            {lang === 'ar' ? 'المستشار الإكلينيكي (Clinical Copilot)' : 'Clinical Copilot'}
          </span>
          <span className="sm:hidden">Copilot</span>
        </button>
      </div>

      {/* ANDROID BOTTOM NAVIGATION BAR (Thumb-Zone Ergonomics, 5 Primary Destinations) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
          {/* 1. Inpatient Rounds */}
          <button
            onClick={() => setActiveTab('patients')}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition ${
              activeTab === 'patients'
                ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <div
              className={`px-3 py-0.5 rounded-full transition ${
                activeTab === 'patients' ? 'bg-teal-100/80 dark:bg-teal-950/80' : ''
              }`}
            >
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate max-w-full">{t.mobileNav.patients}</span>
          </button>

          {/* 2. Reference Simulator & Books */}
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition ${
              activeTab === 'guidelines'
                ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <div
              className={`px-3 py-0.5 rounded-full transition ${
                activeTab === 'guidelines' ? 'bg-teal-100/80 dark:bg-teal-950/80' : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate max-w-full">{t.mobileNav.guidelines}</span>
          </button>

          {/* 3. PK & Clinical Calculators */}
          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition ${
              activeTab === 'calculators'
                ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <div
              className={`px-3 py-0.5 rounded-full transition ${
                activeTab === 'calculators' ? 'bg-teal-100/80 dark:bg-teal-950/80' : ''
              }`}
            >
              <Calculator className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate max-w-full">{t.mobileNav.calculators}</span>
          </button>

          {/* 4. Safety Screening & DRP/SOAP */}
          <button
            onClick={() => setActiveTab(activeTab === 'alerts' ? 'interventions' : 'alerts')}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition ${
              isSafetyGroupActive
                ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <div
              className={`px-3 py-0.5 rounded-full transition ${
                isSafetyGroupActive ? 'bg-teal-100/80 dark:bg-teal-950/80' : ''
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate max-w-full">{t.mobileNav.alerts}</span>
          </button>

          {/* 5. MedRec & Board Cases */}
          <button
            onClick={() => setActiveTab(activeTab === 'reconciliation' ? 'training' : 'reconciliation')}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition ${
              isMoreGroupActive
                ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <div
              className={`px-3 py-0.5 rounded-full transition ${
                isMoreGroupActive ? 'bg-teal-100/80 dark:bg-teal-950/80' : ''
              }`}
            >
              <FileCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate max-w-full">{t.mobileNav.more}</span>
          </button>
        </div>
      </nav>

      {/* Copilot Dialog */}
      <CopilotDialog
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        lang={lang}
        currentPatient={
          (selectedPatient ? patients.find(p => p.id === selectedPatient.id) || selectedPatient : null) ||
          patients[0]
        }
        initialPrompt={copilotPrompt}
        onClearInitialPrompt={() => setCopilotPrompt(null)}
        onOpenLocalReference={handleOpenLocalReference}
      />

      {/* Patient Details Modal */}
      <PatientDetailsModal
        patient={selectedPatient ? patients.find(p => p.id === selectedPatient.id) || selectedPatient : null}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        lang={lang}
        onAddMedication={onAddMedication}
        onUpdatePatientLabs={onUpdatePatientLabs}
        onAddIntervention={onAddIntervention}
        onOpenInterventionModal={handleOpenInterventionModal}
        onOpenLocalReference={handleOpenLocalReference}
      />

      {/* New Patient Admission Modal */}
      <NewPatientModal
        isOpen={isNewPatientOpen}
        onClose={() => setIsNewPatientOpen(false)}
        onAddPatient={onAddPatient}
        lang={lang}
      />

      {/* GLOBAL IN-APP LOCAL REFERENCE DATABASE READER MODAL */}
      {resolvedLocalRef && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[92dvh] shadow-2xl border border-teal-500/40 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white px-4 sm:px-6 pt-3 pb-4 border-b border-teal-500/30 shrink-0">
              <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-2.5 sm:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      <Database className="w-3 h-3" />
                      <span>
                        {lang === 'ar' ? resolvedLocalRef.source.badgeAr : resolvedLocalRef.source.badge}
                      </span>
                    </span>
                    <span
                      dir="ltr"
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-white/10"
                    >
                      {resolvedLocalRef.chapter.sourceUrl}
                    </span>
                    <span dir="ltr" className="text-[11px] font-mono text-slate-300">
                      {resolvedLocalRef.chapter.pages} • {resolvedLocalRef.chapter.evidenceLevel}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-black text-white leading-snug">
                    {lang === 'ar' ? resolvedLocalRef.chapter.titleAr : resolvedLocalRef.chapter.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLocalRefUri(null)}
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Related Chapters Switcher within the same Local Reference Book */}
              {resolvedLocalRef.relatedChapters.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-bold text-teal-300 whitespace-nowrap shrink-0">
                    {lang === 'ar' ? 'فصول أخرى في هذا المرجع المحلي:' : 'Other Chapters in Book:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveLocalRefUri(resolvedLocalRef.chapter.sourceUrl)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap bg-teal-500 text-slate-950 transition cursor-pointer"
                  >
                    {lang === 'ar' ? resolvedLocalRef.chapter.categoryAr : resolvedLocalRef.chapter.category} ({resolvedLocalRef.chapter.pages})
                  </button>
                  {resolvedLocalRef.relatedChapters.map(ch => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveLocalRefUri(ch.sourceUrl)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap bg-white/10 text-slate-200 hover:bg-white/20 transition cursor-pointer"
                    >
                      {lang === 'ar' ? ch.categoryAr : ch.category} ({ch.pages})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Body: Full Embedded Chapter, Algorithm, Dosing Table & Pearls */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
              {/* Clinical Summary & Pathophysiology */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-extrabold text-teal-700 dark:text-teal-400">
                  {lang === 'ar'
                    ? 'الملخص الإكلينيكي والأساس الفيزيولوجي المرضي (Clinical Summary):'
                    : 'Clinical Summary & Pathophysiologic Basis:'}
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {lang === 'ar' ? resolvedLocalRef.chapter.summaryAr : resolvedLocalRef.chapter.summary}
                </p>
                {(resolvedLocalRef.chapter.pathophysiologyAr || resolvedLocalRef.chapter.pathophysiology) && (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                    {lang === 'ar'
                      ? resolvedLocalRef.chapter.pathophysiologyAr || resolvedLocalRef.chapter.pathophysiology
                      : resolvedLocalRef.chapter.pathophysiology || resolvedLocalRef.chapter.pathophysiologyAr}
                  </p>
                )}
              </div>

              {/* Algorithm Steps */}
              {((lang === 'ar' ? resolvedLocalRef.chapter.algorithmStepsAr : resolvedLocalRef.chapter.algorithmSteps) ||
                resolvedLocalRef.chapter.algorithmSteps)?.length ? (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
                  <div className="font-bold text-teal-300 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? 'مسار القرار السريري المعتمد (Clinical Algorithm):'
                        : 'Step-by-Step Clinical Decision Algorithm:'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {((lang === 'ar'
                      ? resolvedLocalRef.chapter.algorithmStepsAr
                      : resolvedLocalRef.chapter.algorithmSteps) ||
                      resolvedLocalRef.chapter.algorithmSteps ||
                      []).map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 leading-relaxed"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Quick Reference Dosing Tables */}
              {(resolvedLocalRef.chapter.quickTables || []).map((tbl, tIdx) => {
                const headers = lang === 'ar' ? tbl.headersAr : tbl.headers;
                const rows = lang === 'ar' ? tbl.rowsAr : tbl.rows;
                return (
                  <div
                    key={tIdx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Table className="w-4 h-4 text-teal-600" />
                      <span>{lang === 'ar' ? tbl.titleAr : tbl.title}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            {headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5 font-bold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {rows.map((row, rIdx) => (
                            <tr key={rIdx} className="bg-white dark:bg-slate-900">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-2.5 ${
                                    cIdx === 0
                                      ? 'font-bold text-teal-700 dark:text-teal-300'
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

              {/* Key Recommendations & Clinical Pearls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 space-y-2">
                  <div className="font-extrabold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>
                      {lang === 'ar'
                        ? 'التوصيات الإكلينيكية المعتمدة (Key Recommendations):'
                        : 'Key Evidence-Based Recommendations:'}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-200">
                    {(lang === 'ar'
                      ? resolvedLocalRef.chapter.keyRecommendationsAr
                      : resolvedLocalRef.chapter.keyRecommendations
                    ).map((rec, idx) => (
                      <li key={idx} className="leading-relaxed flex items-start gap-1.5">
                        <span className="font-bold text-teal-600">{idx + 1}.</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
                  <div className="font-extrabold text-amber-900 dark:text-amber-300">
                    {lang === 'ar'
                      ? 'لآلئ البورد السريرية وتنبيهات السلامة (Clinical Pearls):'
                      : 'Board Clinical Pearls & Safety Mandates:'}
                  </div>
                  <ul className="space-y-1.5 text-amber-950 dark:text-amber-200">
                    {(lang === 'ar'
                      ? resolvedLocalRef.chapter.clinicalPearlsAr
                      : resolvedLocalRef.chapter.clinicalPearls
                    ).map((pearl, idx) => (
                      <li key={idx} className="leading-relaxed flex items-start gap-1.5">
                        <span className="font-bold text-amber-600">•</span>
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = resolvedLocalRef.verbatimChapterId || resolvedLocalRef.chapter.sourceUrl;
                    setGuidelinesTargetUri(target);
                    setActiveLocalRefUri(null);
                    setSelectedPatient(null);
                    setIsCopilotOpen(false);
                    setActiveTab('guidelines');
                  }}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? 'قراءة النص الكامل في المكتبة الطبية (Full Medical Library)'
                      : 'Open in Full Medical Library'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const md = exportLocalReferenceMarkdown(resolvedLocalRef.chapter, lang);
                    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `clinpharm-local-ref-${resolvedLocalRef.chapter.id}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lang === 'ar' ? 'تصدير الفصل محلياً (.md)' : 'Export Local (.md)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = lang === 'ar' ? resolvedLocalRef.chapter.titleAr : resolvedLocalRef.chapter.title;
                    setActiveLocalRefUri(null);
                    setCopilotPrompt(
                      lang === 'ar'
                        ? `لخص لي أهم القواعد العلاجية وتعديلات الجرعات من الفصل المحلي: ${title}`
                        : `Summarize key clinical rules and dosing adjustments from local chapter: ${title}`
                    );
                    setIsCopilotOpen(true);
                  }}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'ar' ? 'استشارة Copilot حول هذا الفصل' : 'Ask Copilot'}</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveLocalRefUri(null)}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Queue & Data Integrity Audit Modal (Android Bottom-Sheet Style) */}
      {isSyncAuditOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90dvh] overflow-y-auto space-y-5">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto sm:hidden" />
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/20 text-teal-600 rounded-xl">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {lang === 'ar'
                      ? 'فحص سلامة البيانات & Offline Sync Queue'
                      : 'Data Integrity & Offline Sync Queue'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'P0/P1 Idempotency • Safe Sign-Out Guard • Optimistic Revision Versioning'
                      : 'P0/P1 Idempotency, Safe Sign-Out, and Revision Versioning Safeguards'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSyncAuditOpen(false);
                  setAuditNotice(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-2 min-h-[40px] min-w-[40px]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block mb-1">
                  P0 Idempotency
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Deterministic UUIDs</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'ar' ? 'توليد Client UUID ثابت ودمج العمليات (Upsert)' : 'Client UUID + Coalesced Ops'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block mb-1">
                  P0 Safe Sign-Out
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Zero Silent Data Loss</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'ar' ? 'منع فقدان السجلات غير المتزامنة عند الخروج' : 'Guarded sign-out with user archive'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block mb-1">
                  P1 Conflict Guard
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Revision Versioning</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'ar' ? 'كشف التعارض متعدد الأجهزة (Version Skew)' : 'Version checks & skew detection'}
                </p>
              </div>
            </div>

            {auditNotice && (
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-900 text-xs font-semibold">
                {auditNotice}
              </div>
            )}

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'العمليات الحالية في Sync Queue:' : 'Operations in Local Sync Queue:'} (
                  {syncQueue.getPendingCount()})
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const testEntityId =
                        typeof crypto !== 'undefined' && crypto.randomUUID
                          ? crypto.randomUUID()
                          : `uuid-${Date.now()}`;
                      syncQueue.enqueue({
                        id: `case-${testEntityId}`,
                        entityId: testEntityId,
                        operation: 'create',
                        table: 'clinical_cases',
                        payload: {
                          id: testEntityId,
                          title: `Offline Clinical Record (${new Date().toLocaleTimeString()})`
                        },
                        version: 1
                      });
                      setAuditNotice(
                        lang === 'ar'
                          ? `تمت إضافة عملية Offline بمعرّف UUID ثابت (${testEntityId.slice(0, 8)}...) ودمج تلقائي (Idempotent Upsert)!`
                          : `Simulated offline operation enqueued with deterministic UUID (${testEntityId.slice(0, 8)}...)!`
                      );
                    }}
                    className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    + Enqueue UUID Op
                  </button>
                  <button
                    onClick={() => {
                      const json = syncQueue.exportPendingJson();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `clinpharm-unsynced-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      setAuditNotice(
                        lang === 'ar'
                          ? 'تم تصدير نسخة احتياطية JSON للعمليات غير المتزامنة!'
                          : 'Exported safe backup of pending queue operations (JSON)!'
                      );
                    }}
                    className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg border border-teal-300 dark:border-teal-800 text-teal-700 dark:text-teal-300"
                  >
                    Export JSON Backup
                  </button>
                  <button
                    onClick={async () => {
                      await syncQueue.flush(async () => {});
                      setAuditNotice(
                        lang === 'ar'
                          ? 'تمت مزامنة جميع عناصر Sync Queue بنجاح!'
                          : 'All queue operations flushed successfully!'
                      );
                    }}
                    className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white"
                  >
                    Flush Queue
                  </button>
                </div>
              </div>

              {syncQueue.list().length === 0 ? (
                <div className="p-5 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500">
                  {lang === 'ar'
                    ? 'Sync Queue فارغ حالياً — جميع السجلات متطابقة.'
                    : 'Sync queue is currently empty — all local data is synchronized.'}
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {syncQueue.list().map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                            {item.operation}
                          </span>
                          <span>{item.table}</span>
                          <span className="font-mono text-[11px] text-slate-400">({(item.entityId || '').slice(0, 8)})</span>
                        </div>
                      </div>
                      <div className="text-right text-[11px] flex items-center gap-3">
                        <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">v{item.version || 1}</span>
                        <button
                          onClick={() => {
                            syncQueue.resetAttempts(item.id);
                            setAuditNotice(lang === 'ar' ? 'تمت إعادة تفعيل المحاولة.' : 'Attempts reset.');
                          }}
                          className="text-[10px] underline text-teal-600 font-bold"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-rose-900 dark:text-rose-200 block">Safe Sign-Out Guard:</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'يمنع تسجيل الخروج الصامت عند وجود عمليات معلقة في Sync Queue.'
                    : 'Prevents silent data loss when pending operations exist in Sync Queue.'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={async () => {
                    const check = await authService.signOut({ force: false });
                    if (check.hasPending) {
                      setAuditNotice(
                        lang === 'ar'
                          ? `⚠️ Safe Sign-Out Guard: تم اعتراض الخروج لوجود ${check.pendingCount} عملية غير متزامنة!`
                          : `Safety Alert: Sign-out intercepted (${check.pendingCount} pending operations)!`
                      );
                    } else {
                      setAuditNotice(
                        lang === 'ar'
                          ? 'تم التحقق: لا توجد عمليات معلقة في Sync Queue.'
                          : 'Safe sign-out verified (no pending items).'
                      );
                    }
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition"
                >
                  Test Sign-Out Guard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Release & Direct App Installation Modal */}
      <GitHubReleaseModal
        isOpen={isGitHubReleaseOpen}
        onClose={() => setIsGitHubReleaseOpen(false)}
        lang={lang}
        patients={patients}
        interventions={interventions}
        discrepancies={discrepancies}
      />
    </div>
  );
}

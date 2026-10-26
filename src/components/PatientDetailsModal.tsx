import { useState } from 'react';
import { Patient, Language, Medication, ClinicalIntervention, LabResult, CustomLabTest } from '../types/clinical';
import {
  X,
  User,
  Activity,
  AlertTriangle,
  Pill,
  Plus,
  Stethoscope,
  BookOpen,
  GitBranch,
  Library,
  Table,
  Check,
  Database,
  FileText,
  Copy,
  Download,
  HeartPulse,
  ClipboardList,
  FlaskConical,
  Trash2,
  Printer,
  Share2
} from 'lucide-react';
import { calculateCrCl, analyzePatientSafety } from '../lib/clinical-engine';
import { buildSimulatorParamsFromPatient, simulateCaseWithReferences } from '../lib/clinicalReferences';
import { printOrSaveClinicalPdf, shareClinicalFile } from '../lib/androidPermissions';
import { translations } from '../lib/i18n';

interface Props {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddMedication: (patientId: string, med: Medication) => void;
  onUpdatePatientLabs?: (patientId: string, updatedLabs: LabResult) => void;
  onAddIntervention?: (int: ClinicalIntervention) => void;
  onOpenInterventionModal: (patient: Patient) => void;
  onOpenLocalReference?: (uri: string) => void;
}

export function PatientDetailsModal({
  patient,
  isOpen,
  onClose,
  lang,
  onAddMedication,
  onUpdatePatientLabs,
  onAddIntervention,
  onOpenInterventionModal,
  onOpenLocalReference
}: Props) {
  const [activeTab, setActiveTab] = useState<'case_report' | 'profile' | 'mar' | 'safety' | 'labs' | 'references'>('case_report');
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedRoute, setNewMedRoute] = useState('IV Infusion');
  const [newMedFreq, setNewMedFreq] = useState('q12h');
  const [newMedIndication, setNewMedIndication] = useState('');
  const [isHighAlert, setIsHighAlert] = useState(false);
  const [loggedIdx, setLoggedIdx] = useState<number | null>(null);
  const [copiedCaseReport, setCopiedCaseReport] = useState(false);

  // Custom Laboratory Test Input State inside Patient Modal
  const [newLabName, setNewLabName] = useState('');
  const [newLabValue, setNewLabValue] = useState('');
  const [newLabUnit, setNewLabUnit] = useState('mg/dL');
  const [newLabRange, setNewLabRange] = useState('');
  const [newLabCategory, setNewLabCategory] = useState<CustomLabTest['category']>('Chemistry');
  const [newLabAbnormal, setNewLabAbnormal] = useState(false);

  if (!isOpen || !patient) return null;

  const t = translations[lang];

  const crclCalc = calculateCrCl(
    patient.age,
    patient.weight,
    patient.height,
    patient.gender,
    patient.labs.serumCreatinine
  );
  const safetyReport = analyzePatientSafety(patient);

  // Patient-tailored multi-reference simulation (DiPiro 13th + ACCP Cardiology 2026 + ACCP 2026 Vol 1 & 2)
  const simParams = buildSimulatorParamsFromPatient(patient);
  const caseReferenceSim = simulateCaseWithReferences(simParams);

  const handleAddMedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;

    const med: Medication = {
      id: `med-${Date.now()}`,
      name: newMedName,
      genericName: newMedName,
      dose: newMedDose || 'Standard',
      route: newMedRoute,
      frequency: newMedFreq,
      startDate: new Date().toISOString().split('T')[0],
      indication: newMedIndication || 'Inpatient therapy',
      isHighAlert
    };

    onAddMedication(patient.id, med);
    setIsAddingMed(false);
    setNewMedName('');
    setNewMedDose('');
    setNewMedIndication('');
  };

  const handleLogReferenceAction = (idx: number) => {
    if (!onAddIntervention) return;
    const act = caseReferenceSim.immediateActions[idx];
    if (!act) return;

    onAddIntervention({
      id: `int-pt-ref-${Date.now()}`,
      patientId: patient.id,
      patientName: lang === 'ar' ? patient.name : patient.nameEn,
      mrn: patient.mrn,
      ward: patient.ward,
      date: new Date().toISOString().split('T')[0],
      drpType:
        act.priority === 'STOP_HOLD'
          ? 'adverse_drug_reaction'
          : act.priority === 'DOSE_ADJUST'
          ? 'renal_dose_adjustment'
          : 'drug_interaction',
      medicationInvolved: act.drugOrTarget,
      clinicalIssue: lang === 'ar' ? act.rationaleAr : act.rationaleEn,
      proposedRecommendation: lang === 'ar' ? act.actionAr : act.actionEn,
      rationale: `${lang === 'ar' ? act.rationaleAr : act.rationaleEn} (${act.citationBadge})`,
      severity: act.priority === 'STOP_HOLD' || act.priority === 'DOSE_ADJUST' ? 'high' : 'medium',
      pharmacist: patient.clinicalPharmacist,
      physician: patient.attendingPhysician,
      status: 'pending',
      costImpactEstimatedSAR: 1100,
      referenceTitle: act.citationBadge,
      referenceSourceUrl: act.sourceUrl,
      evidenceLevel: 'DiPiro 13th Ed / ACCP 2026 Applied Extract'
    });
    setLoggedIdx(idx);
    setTimeout(() => setLoggedIdx(null), 2400);
  };

  const buildCaseReportMarkdown = () => {
    const cr = patient.caseReport;
    const lines = [
      `# CLINICAL PHARMACOTHERAPY CASE REPORT (e-Casebook Standard)`,
      `**Reference Model:** Schwinghammer Pharmacotherapy Casebook / JCPP PPCP`,
      `**Patient:** ${patient.name} (${patient.nameEn}) | **MRN:** ${patient.mrn}`,
      `**Age/Sex:** ${patient.age} yrs / ${patient.gender.toUpperCase()} | **Height/Weight:** ${patient.height} cm / ${patient.weight} kg (IBW: ${crclCalc.ibw} kg, CrCl: ${crclCalc.crcl} mL/min)`,
      `**Location:** ${patient.ward} • Room ${patient.room} (${patient.bed}) | **Status:** ${t.status[patient.status]}`,
      `**Attending Physician:** ${patient.attendingPhysician} | **Clinical Pharmacist:** ${patient.clinicalPharmacist}`,
      `**Admission Date:** ${patient.admissionDate} | **Source of History:** ${cr?.historySourceAndReliability || 'Patient & EHR'}`,
      ``,
      `## 1. CHIEF COMPLAINT (CC)`,
      `${cr?.chiefComplaint || 'See admission diagnoses.'}`,
      ``,
      `## 2. HISTORY OF PRESENT ILLNESS (HOP / HPI)`,
      `${cr?.hopHpi || 'Inpatient admission workup.'}`,
      ``,
      `## 3. SUBJECTIVE SUMMARY & REVIEW OF SYSTEMS (ROS)`,
      `- **Subjective Summary:** ${cr?.subjectiveSummary || 'N/A'}`,
      `- **Constitutional:** ${cr?.reviewOfSystems.constitutional || 'N/A'}`,
      `- **Cardiovascular:** ${cr?.reviewOfSystems.cardiovascular || 'N/A'}`,
      `- **Respiratory:** ${cr?.reviewOfSystems.respiratory || 'N/A'}`,
      `- **Gastrointestinal:** ${cr?.reviewOfSystems.gastrointestinal || 'N/A'}`,
      `- **Genitourinary:** ${cr?.reviewOfSystems.genitourinary || 'N/A'}`,
      `- **Neurological:** ${cr?.reviewOfSystems.neurological || 'N/A'}`,
      `- **Musculoskeletal:** ${cr?.reviewOfSystems.musculoskeletal || 'N/A'}`,
      `- **Endocrine / Skin:** ${cr?.reviewOfSystems.endocrineSkin || 'N/A'}`,
      ``,
      `## 4. PAST MEDICAL, SURGICAL, FAMILY & SOCIAL HISTORY (MH)`,
      `- **Active Admission Diagnoses:** ${patient.diagnoses.join(' | ')}`,
      `- **Past Medical History (PMH):** ${(cr?.pastMedicalHistory || patient.diagnoses).join(', ')}`,
      `- **Past Surgical History (PSH):** ${(cr?.pastSurgicalHistory || ['None reported']).join(', ')}`,
      `- **Allergies:** ${patient.allergies.join(', ')}`,
      `- **Family History (FH):** ${cr?.familyHistory || 'Non-contributory'}`,
      `- **Social History (SH):** ${cr?.socialHistory || 'Non-smoker'}`,
      `- **Medication Adherence:** ${cr?.medicationAdherence || 'Assessed on admission'}`,
      `- **Immunizations:** ${cr?.immunizationStatus || 'Up to date'}`,
      ``,
      `## 5. OBJECTIVE: VITAL SIGNS & PHYSICAL EXAMINATION (PE)`,
      `- **Vitals:** BP ${cr?.vitals.bp || '120/80 mmHg'} | HR ${cr?.vitals.hr || 80} bpm | RR ${cr?.vitals.rr || 18}/min | Temp ${cr?.vitals.temp || 37.0}°C | SpO2 ${cr?.vitals.spo2 || '98% Room Air'}`,
      `- **Fluid Balance (24h I/O):** ${cr?.vitals.fluidBalance24h || 'Balanced'} | **Pain Score:** ${cr?.vitals.painScore || '0/10'}`,
      `- **General:** ${cr?.physicalExam.general || 'Alert'}`,
      `- **HEENT & Neck/JVD:** ${cr?.physicalExam.heent || 'Normal'} | ${cr?.physicalExam.neckJvd || 'Supple'}`,
      `- **Cardiovascular:** ${cr?.physicalExam.cardiovascular || 'Normal S1/S2'}`,
      `- **Chest / Lungs:** ${cr?.physicalExam.chestLungs || 'Clear'}`,
      `- **Abdomen & GU:** ${cr?.physicalExam.abdomen || 'Soft'} | ${cr?.physicalExam.genitourinaryRectal || 'Normal'}`,
      `- **Extremities, Neuro & Skin:** ${cr?.physicalExam.extremities || 'No edema'} | ${cr?.physicalExam.neurological || 'GCS 15'} | ${cr?.physicalExam.skin || 'Intact'}`,
      ``,
      `## 6. LABORATORY RESULTS & DIAGNOSTICS`,
      `- **Renal & Electrolytes:** SCr ${patient.labs.serumCreatinine} mg/dL | BUN ${patient.labs.bun ?? 'N/A'} mg/dL | CrCl ${crclCalc.crcl} mL/min | K+ ${patient.labs.potassium} mEq/L | Na+ ${patient.labs.sodium} mEq/L | Cl- ${patient.labs.chloride ?? 'N/A'} mEq/L | HCO3- ${patient.labs.bicarbonate ?? 'N/A'} mEq/L | Ca ${patient.labs.calcium ?? 'N/A'} mg/dL | Mg ${patient.labs.magnesium ?? 'N/A'} mg/dL | PO4 ${patient.labs.phosphate ?? 'N/A'} mg/dL`,
      `- **Glucose & Metabolic:** Glucose ${patient.labs.glucose ?? 'N/A'} mg/dL | HbA1c ${patient.labs.hba1c ?? 'N/A'}% | Lactate ${patient.labs.lactate ?? 'N/A'} mmol/L | Anion Gap ${patient.labs.anionGap ?? 'N/A'} mEq/L`,
      `- **Hepatic Panel:** AST ${patient.labs.ast ?? 'N/A'} U/L | ALT ${patient.labs.alt ?? 'N/A'} U/L | AlkPhos ${patient.labs.alkPhos ?? 'N/A'} U/L | Total Bilirubin ${patient.labs.bilirubin ?? 'N/A'} mg/dL | Albumin ${patient.labs.albumin ?? 'N/A'} g/dL`,
      `- **Hematology & Coag:** WBC ${patient.labs.wbc ?? 'N/A'} x10³/µL | Hgb ${patient.labs.hgb ?? 'N/A'} g/dL | Plt ${patient.labs.platelets ?? 'N/A'} x10³/µL | INR ${patient.labs.inr ?? 'N/A'} | aPTT ${patient.labs.aptt ?? 'N/A'} sec`,
      `- **Biomarkers & ABG:** Procalcitonin ${patient.labs.procalcitonin ?? 'N/A'} ng/mL | CRP ${patient.labs.crp ?? 'N/A'} mg/L | hs-Troponin ${patient.labs.troponin ?? 'N/A'} | NT-proBNP ${patient.labs.bnp ?? 'N/A'} | ABG pH ${patient.labs.ph ?? 'N/A'} / PaCO2 ${patient.labs.paco2 ?? 'N/A'} / PaO2 ${patient.labs.pao2 ?? 'N/A'}`,
      `- **TDM / PK:** ${patient.labs.tdmSummary || 'None'}`,
      ...(patient.labs.customLabs && patient.labs.customLabs.length > 0
        ? [
            `- **Additional / Custom Labs:** ${patient.labs.customLabs
              .map(c => `${c.name}: ${c.value} ${c.unit} (Ref: ${c.referenceRange}${c.isAbnormal ? ' - ABNORMAL' : ''})`)
              .join(' | ')}`
          ]
        : []),
      `- **Diagnostics:** ECG: ${cr?.diagnostics.ecg || 'N/A'} | Imaging: ${cr?.diagnostics.imaging || 'N/A'} | Echo: ${cr?.diagnostics.echocardiogram || 'N/A'} | Cultures: ${cr?.diagnostics.microbiologyCultures || 'N/A'}`,
      ``,
      `## 7. ACTIVE MEDICATION ORDERS (MAR)`,
      ...patient.activeMedications.map(m => `- **${m.name}** (${m.genericName}) — ${m.dose} ${m.route} ${m.frequency} [Indication: ${m.indication}]`),
      ``,
      `## 8. PROBLEM LIST ASSESSMENT, PHARMACOTHERAPY PLAN & MONITORING`,
      `### Assessment:`,
      `${cr?.problemListAssessment || 'See clinical safety report.'}`,
      `### Pharmacotherapy Care Plan:`,
      `${cr?.pharmacotherapyCarePlan || 'Continue current regimen with renal/hepatic optimization.'}`,
      `### Monitoring Parameters:`,
      `${cr?.monitoringParameters || 'Daily SCr, electrolytes, vitals, and therapeutic response.'}`
    ];
    return lines.join('\n');
  };

  const handleCopyCaseReport = () => {
    navigator.clipboard.writeText(buildCaseReportMarkdown());
    setCopiedCaseReport(true);
    setTimeout(() => setCopiedCaseReport(false), 2200);
  };

  const handleDownloadCaseReport = () => {
    const md = buildCaseReportMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CaseReport_${patient.mrn}_${patient.nameEn.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintCaseReportPdf = () => {
    const md = buildCaseReportMarkdown();
    printOrSaveClinicalPdf({
      title: `Case Report: ${patient.name} (${patient.nameEn}) — ${patient.mrn}`,
      subtitle: `${patient.ward} • Room ${patient.room} (${patient.bed}) • CrCl ${crclCalc.crcl} mL/min`,
      bodyMarkdownOrText: md,
      filenameBase: `CaseReport_${patient.mrn}_${patient.nameEn.replace(/\s+/g, '_')}`,
      dir: 'ltr'
    });
  };

  const handleShareCaseReport = () => {
    const md = buildCaseReportMarkdown();
    void shareClinicalFile({
      filename: `CaseReport_${patient.mrn}_${patient.nameEn.replace(/\s+/g, '_')}.md`,
      title: `Clinical Case Report — ${patient.name} (${patient.mrn})`,
      summaryText: `e-Casebook Pharmacotherapy Report for ${patient.name} (${patient.mrn})`,
      content: md
    });
  };

  const headerStatusClass =
    patient.status === 'critical'
      ? 'bg-rose-500 text-white'
      : patient.status === 'observation'
      ? 'bg-amber-500 text-slate-950'
      : patient.status === 'improving'
      ? 'bg-sky-500 text-white'
      : patient.status === 'discharge_planned'
      ? 'bg-indigo-500 text-white'
      : 'bg-emerald-500 text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-5xl w-full h-[93dvh] sm:h-auto sm:max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Top Bar (Android Bottom-Sheet Drag Handle + Compact Header) */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white px-4 pt-2.5 pb-4 sm:p-5 border-b border-teal-500/30">
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-2.5 sm:hidden" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div
                dir="ltr"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center font-bold text-base sm:text-lg shrink-0"
              >
                {patient.age}y
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="font-bold text-base sm:text-lg truncate">
                    {lang === 'ar' ? patient.name : patient.nameEn}
                  </h3>
                  <span
                    dir="ltr"
                    className="text-[11px] bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded-full font-mono font-bold"
                  >
                    {patient.mrn}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold ${headerStatusClass}`}>
                    {t.status[patient.status]}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-teal-100/70 mt-0.5 truncate">
                  {patient.ward} • {patient.room} / {patient.bed} • {patient.attendingPhysician}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onOpenInterventionModal(patient)}
                className="min-h-[40px] px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-md whitespace-nowrap"
              >
                {lang === 'ar' ? '+ توثيق DRP' : '+ Log DRP'}
              </button>
              <button
                onClick={onClose}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 gap-4 sm:gap-5 text-xs font-bold bg-slate-50 dark:bg-slate-950/40 shrink-0">
          <button
            onClick={() => setActiveTab('case_report')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'case_report'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            {lang === 'ar' ? '📋 تقرير الحالة الشامل (e-Casebook Report)' : '📋 Full e-Casebook Report'}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            {lang === 'ar' ? 'الملخص السريري (Profile)' : 'Patient Profile'}
          </button>

          <button
            onClick={() => setActiveTab('mar')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'mar'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Pill className="w-4 h-4" />
            {`MAR Chart (${patient.activeMedications.length})`}
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'references'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            {lang === 'ar' ? '🧬 محاكاة المراجع (DiPiro / ACCP)' : '🧬 Case Reference Extract'}
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
              {caseReferenceSim.immediateActions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'safety'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            {lang === 'ar' ? 'Safety & Renal Report' : 'Clinical Safety Report'}
            {(safetyReport.criticalAlerts.length > 0 || safetyReport.allergyWarnings.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'labs'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            {lang === 'ar' ? 'الفحوصات المخبرية (Full Labs)' : 'Laboratory Panel'}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 pb-safe">
          {/* 0. Full e-Casebook Case Report Tab */}
          {activeTab === 'case_report' && (
            <div className="space-y-4 text-xs">
              {/* Top Action Bar */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 text-white border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 block">
                    Schwinghammer Pharmacotherapy Casebook Standard (JCPP PPCP)
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base mt-0.5">
                    {lang === 'ar'
                      ? 'تقرير الحالة الإكلينيكي الشامل (Complete Admission Case Report — Demographic, Subjective, HOP, MH, Objective & Labs)'
                      : 'Complete Clinical Case Report (Demographics, CC, HOP/HPI, MH, ROS, Objective Vitals/PE, Labs & Care Plan)'}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrintCaseReportPdf}
                    className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
                  </button>
                  <button
                    onClick={handleShareCaseReport}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'مشاركة الملف' : 'Share File'}</span>
                  </button>
                  <button
                    onClick={handleCopyCaseReport}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedCaseReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaseReport ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : lang === 'ar' ? 'نسخ التقرير' : 'Copy Report'}</span>
                  </button>
                  <button
                    onClick={handleDownloadCaseReport}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تنزيل (.md)' : 'Export (.md)'}</span>
                  </button>
                </div>
              </div>

              {/* I. Demographic & Administrative Information */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h5 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs sm:text-sm">
                  <User className="w-4 h-4" />
                  {lang === 'ar'
                    ? 'أولاً: المعلومات الديموغرافية والإدارية (Demographic & Administrative Data)'
                    : 'I. Demographic & Administrative Information'}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Patient Name / MRN</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{patient.name}</span>
                    <span dir="ltr" className="text-[11px] font-mono text-teal-600">{patient.nameEn} • {patient.mrn}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Age / Sex / Anthropometrics</span>
                    <span dir="ltr" className="font-bold font-mono text-slate-900 dark:text-slate-100 block">
                      {patient.age}y ({patient.gender.toUpperCase()}) • {patient.weight} kg / {patient.height} cm
                    </span>
                    <span dir="ltr" className="text-[11px] font-mono text-slate-500">
                      IBW: {crclCalc.ibw} kg • BMI: {(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)} kg/m²
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Ward / Bed / Admission</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">
                      {t.wards[patient.ward]} ({patient.room}-{patient.bed})
                    </span>
                    <span dir="ltr" className="text-[11px] font-mono text-slate-500">
                      Admitted: {patient.admissionDate}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Source of History</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block line-clamp-2">
                      {patient.caseReport?.historySourceAndReliability || 'Patient, Family & Electronic Medical Record (Reliable)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* II. Subjective: Chief Complaint (CC), HOP (HPI) & Review of Systems (ROS) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h5 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs sm:text-sm">
                  <ClipboardList className="w-4 h-4" />
                  {lang === 'ar'
                    ? 'ثانياً: البيانات الذاتية، الشكوى الرئيسية وتاريخ المرض الحالي (Subjective: CC, HOP / HPI & ROS)'
                    : 'II. Subjective: Chief Complaint (CC), HOP (HPI) & Review of Systems (ROS)'}
                </h5>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200/80 dark:border-teal-900/60">
                  <span className="text-[10px] font-extrabold uppercase text-teal-600 dark:text-teal-400 block mb-0.5">
                    Chief Complaint (CC) — الشكوى الرئيسية:
                  </span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    {patient.caseReport?.chiefComplaint || patient.diagnoses[0]}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-1">
                    History of Present Illness (HOP / HPI) — تاريخ المرض الحالي:
                  </span>
                  <p dir="ltr" className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    {patient.caseReport?.hopHpi || 'Patient admitted for inpatient pharmacotherapy management.'}
                  </p>
                  {patient.caseReport?.subjectiveSummary && (
                    <p dir="ltr" className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                      <strong>Subjective Summary:</strong> {patient.caseReport.subjectiveSummary}
                    </p>
                  )}
                </div>

                {patient.caseReport?.reviewOfSystems && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(patient.caseReport.reviewOfSystems).map(([sysKey, val]) => (
                      <div
                        key={sysKey}
                        dir="ltr"
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800"
                      >
                        <span className="text-[10px] font-extrabold uppercase text-teal-700 dark:text-teal-400 block">
                          ROS • {sysKey}
                        </span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 block">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* III. Medical History (MH: PMH, PSH, FH, SH, Allergies & Immunizations) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h5 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Stethoscope className="w-4 h-4" />
                  {lang === 'ar'
                    ? 'ثالثاً: التاريخ المرضي والجراحي والعائلي والاجتماعي والحساسية (Medical History — MH, PMH, PSH, FH, SH & Allergies)'
                    : 'III. Medical History (MH / PMH, PSH, FH, SH, Allergies & Immunizations)'}
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div dir="ltr" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase text-teal-600 block mb-1">
                      Past Medical History (MH / PMH):
                    </span>
                    <ul className="space-y-1 text-slate-800 dark:text-slate-200">
                      {(patient.caseReport?.pastMedicalHistory || patient.diagnoses).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div dir="ltr" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                        Past Surgical History (PSH):
                      </span>
                      <p className="text-slate-800 dark:text-slate-200">
                        {(patient.caseReport?.pastSurgicalHistory || ['No major surgical history']).join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-rose-600 block">
                        Allergies & Adverse Drug Reactions:
                      </span>
                      <p className="font-bold text-rose-700 dark:text-rose-300">
                        {patient.allergies.join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                        Immunization Status:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {patient.caseReport?.immunizationStatus || 'Up to date per hospital protocol'}
                      </p>
                    </div>
                  </div>

                  <div dir="ltr" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-0.5">
                      Family History (FH):
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {patient.caseReport?.familyHistory || 'Non-contributory'}
                    </p>
                  </div>

                  <div dir="ltr" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-0.5">
                      Social History (SH) & Medication Adherence:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {patient.caseReport?.socialHistory || 'Lives with family; denies tobacco/alcohol'}
                    </p>
                  </div>
                </div>
              </div>

              {/* IV. Objective Data: Vital Signs & Physical Examination (PE) */}
              {patient.caseReport && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h5 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs sm:text-sm">
                    <HeartPulse className="w-4 h-4" />
                    {lang === 'ar'
                      ? 'رابعاً: البيانات الموضوعية — العلامات الحيوية والفحص السريري (Objective: Vital Signs & Physical Exam)'
                      : 'IV. Objective Data: Vital Signs & System-by-System Physical Examination (PE)'}
                  </h5>

                  <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block">BP (MAP)</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                        {patient.caseReport.vitals.bp}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                        {patient.caseReport.vitals.hr} bpm
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Resp Rate</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                        {patient.caseReport.vitals.rr} /min
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Temp</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                        {patient.caseReport.vitals.temp} °C
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SpO2 & O2</span>
                      <span className="font-bold font-mono text-teal-600 dark:text-teal-400">
                        {patient.caseReport.vitals.spo2}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Pain Score</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100 truncate block">
                        {patient.caseReport.vitals.painScore || '0/10'}
                      </span>
                    </div>
                  </div>

                  <div dir="ltr" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <span>
                      <strong>24h Fluid Balance (I/O):</strong> {patient.caseReport.vitals.fluidBalance24h || 'Balanced'}
                    </span>
                    <span>
                      <strong>Estimated Dry Weight:</strong> {patient.caseReport.vitals.dryWeightKg ?? patient.weight} kg (Current: {patient.weight} kg)
                    </span>
                  </div>

                  <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(patient.caseReport.physicalExam).map(([peKey, peVal]) => (
                      <div
                        key={peKey}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800"
                      >
                        <span className="text-[10px] font-extrabold uppercase text-teal-700 dark:text-teal-400 block">
                          PE • {peKey}
                        </span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 block">{peVal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* V. Comprehensive Lab Results & Diagnostics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h5 className="font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Activity className="w-4 h-4" />
                  {lang === 'ar'
                    ? 'خامساً: نتائج المختبر الشاملة والفحوصات التشخيصية (Lab Results, Biomarkers, ABG & Diagnostics)'
                    : 'V. Comprehensive Laboratory Results & Diagnostic Workup'}
                </h5>

                <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {[
                    { label: 'SCr', val: `${patient.labs.serumCreatinine} mg/dL`, alert: patient.labs.serumCreatinine > 1.3 },
                    { label: 'CrCl (CG)', val: `${crclCalc.crcl} mL/min`, alert: crclCalc.crcl < 30 },
                    { label: 'BUN', val: `${patient.labs.bun ?? '—'} mg/dL`, alert: (patient.labs.bun ?? 0) > 25 },
                    { label: 'K+', val: `${patient.labs.potassium} mEq/L`, alert: patient.labs.potassium > 5.0 || patient.labs.potassium < 3.5 },
                    { label: 'Na+', val: `${patient.labs.sodium} mEq/L`, alert: patient.labs.sodium < 135 || patient.labs.sodium > 145 },
                    { label: 'Cl- / HCO3-', val: `${patient.labs.chloride ?? '—'} / ${patient.labs.bicarbonate ?? '—'} mEq/L`, alert: (patient.labs.bicarbonate ?? 24) < 20 },
                    { label: 'Glucose', val: `${patient.labs.glucose ?? '—'} mg/dL`, alert: (patient.labs.glucose ?? 100) > 180 },
                    { label: 'Ca / Mg / PO4', val: `${patient.labs.calcium ?? '—'} / ${patient.labs.magnesium ?? '—'} / ${patient.labs.phosphate ?? '—'}`, alert: false },
                    { label: 'AST / ALT', val: `${patient.labs.ast ?? '—'} / ${patient.labs.alt ?? '—'} U/L`, alert: (patient.labs.alt ?? 20) > 55 },
                    { label: 'AlkPhos / T.Bili', val: `${patient.labs.alkPhos ?? '—'} U/L / ${patient.labs.bilirubin ?? '—'} mg/dL`, alert: false },
                    { label: 'Albumin', val: `${patient.labs.albumin ?? '—'} g/dL`, alert: (patient.labs.albumin ?? 4) < 3.4 },
                    { label: 'WBC', val: `${patient.labs.wbc ?? '—'} x10³/µL`, alert: (patient.labs.wbc ?? 7) > 11 },
                    { label: 'Hgb / Hct', val: `${patient.labs.hgb ?? '—'} g/dL (${patient.labs.hct ?? '—'}%)`, alert: (patient.labs.hgb ?? 13) < 10 },
                    { label: 'Platelets', val: `${patient.labs.platelets ?? '—'} x10³/µL`, alert: (patient.labs.platelets ?? 200) < 150 },
                    { label: 'INR / aPTT', val: `${patient.labs.inr ?? '—'} / ${patient.labs.aptt ?? '—'}s`, alert: (patient.labs.inr ?? 1) > 1.5 },
                    { label: 'Lactate', val: `${patient.labs.lactate ?? '—'} mmol/L`, alert: (patient.labs.lactate ?? 1) >= 2.0 },
                    { label: 'Procalcitonin / CRP', val: `${patient.labs.procalcitonin ?? '—'} ng/mL / ${patient.labs.crp ?? '—'} mg/L`, alert: (patient.labs.procalcitonin ?? 0) > 0.5 },
                    { label: 'Troponin / BNP', val: `${patient.labs.troponin ?? '—'} / ${patient.labs.bnp ?? '—'}`, alert: Boolean(patient.labs.troponin) },
                    { label: 'HbA1c', val: `${patient.labs.hba1c ?? '—'}%`, alert: (patient.labs.hba1c ?? 5) > 7.0 },
                    { label: 'ABG (pH/pCO2/pO2)', val: `${patient.labs.ph ?? '—'} / ${patient.labs.paco2 ?? '—'} / ${patient.labs.pao2 ?? '—'}`, alert: (patient.labs.ph ?? 7.4) < 7.35 },
                    { label: 'Anion Gap', val: `${patient.labs.anionGap ?? '—'} mEq/L`, alert: (patient.labs.anionGap ?? 10) > 14 }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl border ${
                        item.alert
                          ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/70'
                          : 'bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 block">{item.label}</span>
                      <span
                        className={`font-bold font-mono text-[11px] ${
                          item.alert ? 'text-rose-700 dark:text-rose-300' : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>

                {patient.labs.tdmSummary && (
                  <div dir="ltr" className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 font-mono text-[11px] text-teal-900 dark:text-teal-200">
                    <strong>TDM / PK Dosing Note:</strong> {patient.labs.tdmSummary}
                  </div>
                )}

                {patient.labs.customLabs && patient.labs.customLabs.length > 0 && (
                  <div className="pt-1 space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase text-teal-700 dark:text-teal-300 block">
                      {lang === 'ar'
                        ? `الفحوصات المخبرية الإضافية والمخصصة (Custom / Additional Labs: ${patient.labs.customLabs.length}):`
                        : `Additional / Custom Laboratory Tests (${patient.labs.customLabs.length}):`}
                    </span>
                    <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {patient.labs.customLabs.map(cl => (
                        <div
                          key={cl.id}
                          className={`p-2 rounded-xl border ${
                            cl.isAbnormal
                              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                              : 'bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800'
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 block truncate">{cl.name}</span>
                          <span
                            className={`font-bold font-mono text-[11px] ${
                              cl.isAbnormal ? 'text-rose-700 dark:text-rose-300' : 'text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            {cl.value} {cl.unit}
                          </span>
                          {cl.referenceRange && (
                            <span className="text-[9px] text-slate-400 block font-mono">
                              Ref: {cl.referenceRange}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {patient.caseReport?.diagnostics && (
                  <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">12-Lead ECG</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{patient.caseReport.diagnostics.ecg}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Echocardiogram</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{patient.caseReport.diagnostics.echocardiogram}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Diagnostic Imaging (CXR / CT)</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{patient.caseReport.diagnostics.imaging}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Microbiology & Cultures</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{patient.caseReport.diagnostics.microbiologyCultures}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* VI. JCPP PPCP Assessment, Pharmacotherapy Plan & Monitoring */}
              {patient.caseReport && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div dir="ltr" className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                    <span className="text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-400 block mb-1">
                      Prioritized Problem List Assessment
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {patient.caseReport.problemListAssessment}
                    </p>
                  </div>
                  <div dir="ltr" className="p-3.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50">
                    <span className="text-[10px] font-extrabold uppercase text-teal-700 dark:text-teal-400 block mb-1">
                      Pharmacotherapy Care Plan
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {patient.caseReport.pharmacotherapyCarePlan}
                    </p>
                  </div>
                  <div dir="ltr" className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-700 dark:text-indigo-400 block mb-1">
                      Efficacy & Safety Monitoring Plan
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {patient.caseReport.monitoringParameters}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block mb-0.5">Weight / Height</span>
                  <span dir="ltr" className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm">
                    {patient.weight} kg / {patient.height} cm
                  </span>
                  <span dir="ltr" className="block text-[11px] text-teal-600 mt-1">
                    IBW: {crclCalc.ibw} kg
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block mb-0.5">Serum Creatinine (SCr)</span>
                  <span dir="ltr" className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm">
                    {patient.labs.serumCreatinine} mg/dL
                  </span>
                  <span dir="ltr" className="block text-[11px] text-slate-500 mt-1">
                    BUN: {patient.labs.bun || 20} mg/dL
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block mb-0.5">CrCl (Cockcroft-Gault)</span>
                  <span dir="ltr" className="font-bold text-teal-600 dark:text-teal-400 font-mono text-sm">
                    {crclCalc.crcl} mL/min
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1">{crclCalc.weightType}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block mb-0.5">Serum K+ / Na+</span>
                  <span dir="ltr" className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm">
                    {patient.labs.potassium} / {patient.labs.sodium} mEq/L
                  </span>
                  <span dir="ltr" className="block text-[11px] text-slate-500 mt-1">
                    Albumin: {patient.labs.albumin || 3.5} g/dL
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
                  <h4 className="font-bold text-rose-800 dark:text-rose-200 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Documented Drug Allergies:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies.map((a, i) => (
                      <span
                        key={i}
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold text-xs"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    Active Diagnoses:
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {patient.diagnoses.map((d, i) => (
                      <li key={i} dir="ltr" className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Preview of Case Reference Extract */}
              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-300 block">
                    Patient-Tailored Reference Extract (DiPiro 13th Ed + ACCP Cardiology 2026):
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {lang === 'ar' ? caseReferenceSim.headlineAr : caseReferenceSim.headlineEn}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('references')}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shrink-0 transition"
                >
                  {lang === 'ar' ? 'عرض التوصيات & Quick Tables' : 'View Tailored Extract & Tables'}
                </button>
              </div>
            </div>
          )}

          {/* 2. Medication Chart (MAR) Tab */}
          {activeTab === 'mar' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Active Inpatient Medication Administration Record (MAR)
                </h4>
                <button
                  onClick={() => setIsAddingMed(true)}
                  className="min-h-[38px] px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  {lang === 'ar' ? '+ إضافة Order' : '+ Add Order'}
                </button>
              </div>

              <div className="space-y-3">
                {patient.activeMedications.map(m => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                          <span dir="ltr">{m.name}</span>
                          {m.isHighAlert && (
                            <span className="text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 px-1.5 py-0.5 rounded font-bold">
                              High Alert (ISMP)
                            </span>
                          )}
                          {m.requiresTDM && (
                            <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.5 rounded font-bold">
                              TDM Protocol
                            </span>
                          )}
                        </div>
                        <p dir="ltr" className="text-slate-500 text-[11px] mt-0.5">
                          {m.genericName}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <span
                          dir="ltr"
                          className="inline-block font-bold font-mono text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-900"
                        >
                          {m.dose} • {m.route}
                        </span>
                        <span dir="ltr" className="block text-[11px] text-slate-500 mt-1">
                          {m.frequency}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-slate-600 dark:text-slate-400 flex flex-wrap gap-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                      <span>
                        Indication: <strong dir="ltr">{m.indication}</strong>
                      </span>
                      <span>•</span>
                      <span>Start: {m.startDate}</span>
                    </div>

                    {m.notes && (
                      <div className="mt-2 text-[11px] p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 rounded-lg border border-amber-200/50">
                        {m.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {isAddingMed && (
                <div className="p-4 rounded-xl border border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 text-xs space-y-3">
                  <h5 className="font-bold text-teal-800 dark:text-teal-300">Add New Inpatient Medication Order</h5>
                  <form onSubmit={handleAddMedSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Drug Name (Generic / Brand)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Cefepime, Enoxaparin..."
                          value={newMedName}
                          onChange={e => setNewMedName(e.target.value)}
                          className="w-full min-h-[40px] p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Dose</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1000 mg"
                          value={newMedDose}
                          onChange={e => setNewMedDose(e.target.value)}
                          className="w-full min-h-[40px] p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Route</label>
                        <select
                          value={newMedRoute}
                          onChange={e => setNewMedRoute(e.target.value)}
                          className="w-full min-h-[40px] p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        >
                          <option value="IV Infusion">IV Infusion</option>
                          <option value="IV Push">IV Push</option>
                          <option value="Oral">Oral (PO)</option>
                          <option value="SC">Subcutaneous (SC)</option>
                          <option value="Inhalation">Inhalation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Frequency</label>
                        <input
                          type="text"
                          value={newMedFreq}
                          onChange={e => setNewMedFreq(e.target.value)}
                          placeholder="q8h, q12h, OD..."
                          className="w-full min-h-[40px] p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Clinical Indication</label>
                        <input
                          type="text"
                          value={newMedIndication}
                          onChange={e => setNewMedIndication(e.target.value)}
                          placeholder="Sepsis, HTN..."
                          className="w-full min-h-[40px] p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isHighAlert}
                          onChange={e => setIsHighAlert(e.target.checked)}
                          className="w-4 h-4 text-rose-600 rounded"
                        />
                        <span className="font-semibold text-rose-700 dark:text-rose-300">ISMP High Alert Medication</span>
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingMed(false)}
                          className="min-h-[38px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="min-h-[38px] px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold"
                        >
                          Add Order
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* 3. Case Reference Extraction Tab */}
          {activeTab === 'references' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white space-y-2">
                <div className="text-[11px] font-bold text-teal-300">
                  Patient-Specific Clinical Extraction Across All 5 Accredited Reference Textbooks
                </div>
                <h4 className="font-extrabold text-sm">
                  {lang === 'ar' ? caseReferenceSim.headlineAr : caseReferenceSim.headlineEn}
                </h4>
                <div className="p-2.5 rounded-xl bg-white/10 font-mono text-[11px] text-teal-100">
                  <GitBranch className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                  {(lang === 'ar'
                    ? caseReferenceSim.activeAlgorithmBranchAr
                    : caseReferenceSim.activeAlgorithmBranchEn
                  ).join(' ➔ ')}
                </div>
              </div>

              {/* Tailored Actionable Decisions */}
              <div className="space-y-2.5">
                <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
                  {lang === 'ar'
                    ? 'القرارات الدوائية وتعديلات الجرعات المطلوبة لهذا المريض:'
                    : 'Actionable Dosing & Safety Decisions for This Patient:'}
                </h5>
                {caseReferenceSim.immediateActions.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-teal-700 dark:text-teal-300">
                        [{lang === 'ar' ? act.priorityLabelAr : act.priorityLabelEn}] {act.drugOrTarget}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenLocalReference?.(act.sourceUrl)}
                        dir="ltr"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition cursor-pointer"
                        title={lang === 'ar' ? 'فتح الاستدلال من قاعدة البيانات المحلية' : 'Open inference in local reference database'}
                      >
                        <Database className="w-3 h-3 text-teal-600 shrink-0" />
                        <span>{act.citationBadge}</span>
                      </button>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {lang === 'ar' ? act.actionAr : act.actionEn}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar' ? act.rationaleAr : act.rationaleEn}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenLocalReference?.(act.sourceUrl)}
                        className="min-h-[34px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-[11px] font-bold hover:bg-teal-50 transition cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3 text-teal-600" />
                        <span>{lang === 'ar' ? 'فتح الفصل المرجعي محلياً' : 'Open Local Chapter'}</span>
                      </button>
                      {onAddIntervention && (
                        <button
                          onClick={() => handleLogReferenceAction(idx)}
                          className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition cursor-pointer"
                        >
                          {loggedIdx === idx ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Logged!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>{lang === 'ar' ? 'توثيق كـ DRP Intervention' : 'Log DRP Intervention'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Side-by-Side Textbook Extracts */}
              <div className="space-y-2.5">
                <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
                  <Library className="w-4 h-4 text-teal-600" />
                  {lang === 'ar' ? 'المقتطفات المخصصة لحالة المريض من قاعدة البيانات المحلية:' : 'Tailored Extracts from Local Reference Database:'}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {caseReferenceSim.referenceExtracts.map((ext, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/20 space-y-1.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-teal-800 dark:text-teal-300">
                            {lang === 'ar' ? ext.sourceBadgeAr : ext.sourceBadge}
                          </span>
                          <span dir="ltr" className="text-[10px] font-mono text-slate-500">
                            {ext.pages}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                          {lang === 'ar' ? ext.chapterTitleAr : ext.chapterTitle}
                        </div>
                        <ul className="space-y-1">
                          {(lang === 'ar' ? ext.tailoredExtractAr : ext.tailoredExtractEn).map((line, lIdx) => (
                            <li key={lIdx} className="text-slate-700 dark:text-slate-200 leading-relaxed flex items-start gap-1.5">
                              <span className="text-teal-600 font-bold">•</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between gap-2">
                        <span dir="ltr" className="text-[10px] font-mono text-teal-700 dark:text-teal-400 truncate">
                          {ext.sourceUrl}
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenLocalReference?.(ext.sourceUrl)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold transition cursor-pointer shrink-0"
                        >
                          <Database className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'فتح الفصل محلياً' : 'Open Local DB'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Dosing Table inside Patient Modal */}
              {caseReferenceSim.quickDosingTables.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-teal-600" />
                    Quick Reference Dosing Table:
                  </h5>
                  {caseReferenceSim.quickDosingTables.slice(0, 1).map((tbl, tIdx) => (
                    <div
                      key={tIdx}
                      className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <table className="w-full text-[11px] text-right">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                          <tr>
                            {(lang === 'ar' ? tbl.headersAr : tbl.headers).map((h, hIdx) => (
                              <th key={hIdx} className="p-2 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {(lang === 'ar' ? tbl.rowsAr : tbl.rows).map((row, rIdx) => (
                            <tr key={rIdx} className="text-slate-700 dark:text-slate-300">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Safety Tab */}
          {activeTab === 'safety' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">
                  Real-Time Drug Safety, Allergy & Renal Dosing Screening
                </h4>
                {safetyReport.criticalAlerts.length === 0 &&
                safetyReport.allergyWarnings.length === 0 &&
                safetyReport.renalAdjustments.length === 0 ? (
                  <p className="text-emerald-600 font-semibold">
                    ✓ No contraindications or critical renal/interaction issues detected.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {safetyReport.allergyWarnings.map((a, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold border border-rose-200"
                      >
                        {a}
                      </div>
                    ))}
                    {safetyReport.criticalAlerts.map((c, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium border border-amber-200"
                      >
                        {c}
                      </div>
                    ))}
                    {safetyReport.renalAdjustments.map((r, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-teal-50/70 dark:bg-teal-950/40 text-slate-800 dark:text-slate-200 border border-teal-200 dark:border-teal-800"
                      >
                        <div className="font-bold text-teal-800 dark:text-teal-300" dir="ltr">
                          {r.drug} ({r.currentDose})
                        </div>
                        <p className="mt-1">{r.recommendedAdjustment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. Labs Tab — Interactive Comprehensive Laboratory & Custom Lab Tests Manager */}
          {activeTab === 'labs' && (
            <div className="space-y-5 text-xs">
              {/* Standard Core Laboratory Grid */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-teal-600" />
                    {lang === 'ar'
                      ? 'الفحوصات المخبرية الأساسية (Core Renal, Electrolytes, Hepatic, CBC & Coagulation Panel)'
                      : 'Core Laboratory Panel (Renal, Electrolytes, Hepatic, CBC & Coagulation)'}
                  </h4>
                  <span dir="ltr" className="text-[10px] font-mono text-slate-400">
                    Updated: {patient.labs.date}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Serum Creatinine (SCr)</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.serumCreatinine} mg/dL
                    </span>
                    <span dir="ltr" className="block text-[10px] text-teal-600 font-mono mt-0.5">
                      CrCl: {crclCalc.crcl} mL/min
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">BUN</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.bun ?? 20} mg/dL
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Potassium (K+)</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.potassium} mEq/L
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Sodium (Na+)</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.sodium} mEq/L
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Total Bilirubin</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.bilirubin || 0.8} mg/dL
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Serum Albumin</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.albumin || 3.8} g/dL
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">WBC / Platelets</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      {patient.labs.wbc} / {patient.labs.platelets ?? 220} x10³
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">INR / Lactate</span>
                    <span dir="ltr" className="font-bold text-sm font-mono text-slate-900 dark:text-white">
                      INR {patient.labs.inr || 1.1} • Lac {patient.labs.lactate ?? 1.2}
                    </span>
                  </div>
                </div>
              </div>

              {/* ADD CUSTOM / ADDITIONAL LABORATORY TESTS INSIDE PATIENT FILE */}
              <div className="p-4 rounded-2xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-teal-600" />
                      {lang === 'ar'
                        ? 'إضافة فحوصات مخبرية إضافية لملف المريض (Add Custom Laboratory Tests / TDM / Biomarkers)'
                        : 'Add Custom / Additional Laboratory Tests & TDM Levels'}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === 'ar'
                        ? 'أضف أي فحوصات مخبرية جديدة أو مستويات دوائية (TDM) ليتم حفظها فوراً في ملف المريض وتقرير الـ Case Report.'
                        : 'Add specialized lab tests or TDM levels directly to this patient chart and e-Casebook Case Report.'}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-teal-600 text-white self-start sm:self-auto">
                    {(patient.labs.customLabs || []).length} {lang === 'ar' ? 'فحوصات إضافية' : 'Custom Labs'}
                  </span>
                </div>

                {/* 1-Click Clinical Lab Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {lang === 'ar' ? 'فحوصات جاهزة:' : 'Quick Presets:'}
                  </span>
                  {[
                    { name: 'Vancomycin Trough', value: '17.8', unit: 'mcg/mL', range: '10–20 mcg/mL', cat: 'TDM / PK' as const, abn: false },
                    { name: 'Vancomycin AUC24/MIC', value: '525', unit: 'mg·h/L', range: '400–600 mg·h/L', cat: 'TDM / PK' as const, abn: false },
                    { name: 'Digoxin Serum Level', value: '1.5', unit: 'ng/mL', range: '0.5–0.9 ng/mL', cat: 'TDM / PK' as const, abn: true },
                    { name: 'D-Dimer', value: '1.9', unit: 'mg/L FEU', range: '< 0.50 mg/L', cat: 'Coagulation' as const, abn: true },
                    { name: 'Ferritin', value: '290', unit: 'ng/mL', range: '30–400 ng/mL', cat: 'Hematology' as const, abn: false },
                    { name: 'Ammonia (NH3)', value: '68', unit: 'mcmol/L', range: '15–45 mcmol/L', cat: 'Chemistry' as const, abn: true },
                    { name: 'Serum Osmolality', value: '304', unit: 'mOsm/kg', range: '275–295 mOsm/kg', cat: 'Chemistry' as const, abn: true },
                    { name: 'Uric Acid', value: '8.4', unit: 'mg/dL', range: '3.5–7.2 mg/dL', cat: 'Chemistry' as const, abn: true },
                    { name: 'TSH', value: '2.8', unit: 'mIU/L', range: '0.4–4.5 mIU/L', cat: 'Endocrine' as const, abn: false }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (!onUpdatePatientLabs) return;
                        const existing = patient.labs.customLabs || [];
                        const newItem: CustomLabTest = {
                          id: `clab-${Date.now()}-${idx}`,
                          name: preset.name,
                          value: preset.value,
                          unit: preset.unit,
                          referenceRange: preset.range,
                          category: preset.cat,
                          isAbnormal: preset.abn,
                          date: new Date().toISOString().slice(0, 16).replace('T', ' ')
                        };
                        onUpdatePatientLabs(patient.id, {
                          ...patient.labs,
                          customLabs: [...existing, newItem]
                        });
                      }}
                      dir="ltr"
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold transition shrink-0 cursor-pointer"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>

                {/* Custom Lab Form */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-end bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'اسم الفحص (Test Name)' : 'Test Name'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., Gentamicin Trough, Lipase..."
                      value={newLabName}
                      onChange={e => setNewLabName(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'النتيجة (Value)' : 'Value'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., 14.5"
                      value={newLabValue}
                      onChange={e => setNewLabValue(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'الوحدة (Unit)' : 'Unit'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="mg/dL, ng/mL..."
                      value={newLabUnit}
                      onChange={e => setNewLabUnit(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      {lang === 'ar' ? 'المعدل الطبيعي (Ref Range)' : 'Ref Range'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="e.g., 10–20"
                      value={newLabRange}
                      onChange={e => setNewLabRange(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-[10px] font-bold text-rose-600 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={newLabAbnormal}
                        onChange={e => setNewLabAbnormal(e.target.checked)}
                        className="rounded text-rose-600"
                      />
                      <span>{lang === 'ar' ? 'غير طبيعي' : 'Abnormal'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newLabName.trim() || !newLabValue.trim() || !onUpdatePatientLabs) return;
                        const existing = patient.labs.customLabs || [];
                        const newItem: CustomLabTest = {
                          id: `clab-${Date.now()}`,
                          name: newLabName.trim(),
                          value: newLabValue.trim(),
                          unit: newLabUnit.trim() || 'units',
                          referenceRange: newLabRange.trim() || 'Hospital Ref',
                          category: newLabCategory,
                          isAbnormal: newLabAbnormal,
                          date: new Date().toISOString().slice(0, 16).replace('T', ' ')
                        };
                        onUpdatePatientLabs(patient.id, {
                          ...patient.labs,
                          customLabs: [...existing, newItem]
                        });
                        setNewLabName('');
                        setNewLabValue('');
                        setNewLabRange('');
                        setNewLabAbnormal(false);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
                    </button>
                  </div>
                </div>

                {/* Custom Labs Cards */}
                {patient.labs.customLabs && patient.labs.customLabs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                    {patient.labs.customLabs.map(cl => (
                      <div
                        key={cl.id}
                        dir="ltr"
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                          cl.isAbnormal
                            ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {cl.name}
                            </span>
                            {cl.isAbnormal && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                                ABNORMAL
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-xs font-extrabold text-teal-700 dark:text-teal-300 mt-0.5">
                            {cl.value} <span className="text-[10px] font-normal">{cl.unit}</span>
                          </div>
                          {cl.referenceRange && (
                            <span className="block text-[10px] font-mono text-slate-400">
                              Ref: {cl.referenceRange}
                            </span>
                          )}
                        </div>
                        {onUpdatePatientLabs && (
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = (patient.labs.customLabs || []).filter(item => item.id !== cl.id);
                              onUpdatePatientLabs(patient.id, {
                                ...patient.labs,
                                customLabs: filtered
                              });
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                            title="Delete custom lab test"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 text-center py-2">
                    {lang === 'ar'
                      ? 'لا توجد فحوصات إضافية مخصصة بعد — اختر من الأزرار السريعة أعلاه أو أدخل فحصاً جديداً.'
                      : 'No custom laboratory tests added yet — use the quick presets above or enter a custom test.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

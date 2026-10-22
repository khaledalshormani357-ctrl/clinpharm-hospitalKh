import { useState } from 'react';
import { Patient, Language, Medication, ClinicalIntervention } from '../types/clinical';
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
  Database
} from 'lucide-react';
import { calculateCrCl, analyzePatientSafety } from '../lib/clinical-engine';
import { buildSimulatorParamsFromPatient, simulateCaseWithReferences } from '../lib/clinicalReferences';

interface Props {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddMedication: (patientId: string, med: Medication) => void;
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
  onAddIntervention,
  onOpenInterventionModal,
  onOpenLocalReference
}: Props) {
  const [activeTab, setActiveTab] = useState<'profile' | 'mar' | 'safety' | 'labs' | 'references'>('profile');
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedRoute, setNewMedRoute] = useState('IV Infusion');
  const [newMedFreq, setNewMedFreq] = useState('q12h');
  const [newMedIndication, setNewMedIndication] = useState('');
  const [isHighAlert, setIsHighAlert] = useState(false);
  const [loggedIdx, setLoggedIdx] = useState<number | null>(null);

  if (!isOpen || !patient) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full h-[93dvh] sm:h-auto sm:max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
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
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      patient.status === 'critical' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {patient.status}
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
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            {lang === 'ar' ? 'Clinical Profile' : 'Patient Profile'}
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
            {lang === 'ar'
              ? `MAR Chart (${patient.activeMedications.length})`
              : `MAR Chart (${patient.activeMedications.length})`}
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
            {lang === 'ar' ? 'Laboratory Panel' : 'Laboratory Values'}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 pb-safe">
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

          {/* 5. Labs Tab */}
          {activeTab === 'labs' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">Serum Creatinine (SCr)</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.serumCreatinine} mg/dL
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">Potassium (K+)</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.potassium} mEq/L
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">Sodium (Na+)</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.sodium} mEq/L
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">Total Bilirubin</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.bilirubin || 0.8} mg/dL
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">Serum Albumin</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.albumin || 3.8} g/dL
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block">INR</span>
                  <span dir="ltr" className="font-bold text-base font-mono">
                    {patient.labs.inr || 1.1}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

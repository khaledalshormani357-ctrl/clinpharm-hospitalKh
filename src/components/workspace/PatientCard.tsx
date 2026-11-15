import { AlertTriangle, ClipboardPlus, MapPin, Pill, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Language, Patient, PatientStatus } from '../../types/clinical';
import { calculateCrCl, analyzePatientSafety } from '../../lib/clinical-engine';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

interface PatientCardProps {
  patient: Patient;
  lang: Language;
  wardLabel: string;
  statusLabel: string;
  onOpen: (patient: Patient) => void;
  onLogIntervention: (patient: Patient) => void;
}

const STATUS_TONE: Record<PatientStatus, 'critical' | 'review' | 'info' | 'verified'> = {
  critical: 'critical',
  observation: 'review',
  improving: 'info',
  stable: 'verified',
  discharge_planned: 'info',
};

const STATUS_BORDER: Record<PatientStatus, string> = {
  critical: 'border-s-clinical-danger',
  observation: 'border-s-clinical-warning',
  improving: 'border-s-clinical-info',
  stable: 'border-s-clinical-success',
  discharge_planned: 'border-s-clinical-info',
};

export function PatientCard({ patient, lang, wardLabel, statusLabel, onOpen, onLogIntervention }: PatientCardProps) {
  const isArabic = lang === 'ar';
  const crcl = calculateCrCl(patient.age, patient.weight, patient.height, patient.gender, patient.labs.serumCreatinine);
  const safety = analyzePatientSafety(patient);

  return (
    <ClinicalPanel
      className={`border-s-4 ${STATUS_BORDER[patient.status]} transition-shadow hover:shadow-md`}
      contentClassName="flex h-full flex-col gap-4 p-4 sm:p-5"
      title={
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clinical-info-soft text-sm font-bold text-clinical-info" dir="ltr">
            {patient.age}y
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-clinical-text sm:text-base">{isArabic ? patient.name : patient.nameEn}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-clinical-muted" dir="ltr">
              <span>{patient.mrn}</span><span aria-hidden="true">·</span><span>{patient.room} ({patient.bed})</span>
            </p>
          </div>
        </div>
      }
      actions={<ClinicalBadge tone={STATUS_TONE[patient.status]}>{statusLabel}</ClinicalBadge>}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-clinical-muted">
          <span className="inline-flex items-center gap-1"><MapPin aria-hidden="true" className="size-3.5 text-clinical-teal" />{wardLabel}</span>
          <span className="inline-flex items-center gap-1"><UserRound aria-hidden="true" className="size-3.5 text-clinical-teal" />{patient.attendingPhysician}</span>
        </div>

        {patient.caseReport && (
          <div className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-3">
            <div className="flex items-start gap-2 text-xs leading-5 text-clinical-text">
              <span className="shrink-0 font-bold text-clinical-teal">CC</span>
              <span className="line-clamp-2">{patient.caseReport.chiefComplaint}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-clinical-muted" dir="ltr">
              <span className="rounded border border-clinical-border bg-clinical-surface px-1.5 py-1">BP {patient.caseReport.vitals.bp}</span>
              <span className="rounded border border-clinical-border bg-clinical-surface px-1.5 py-1">HR {patient.caseReport.vitals.hr}</span>
              <span className="rounded border border-clinical-border bg-clinical-surface px-1.5 py-1">SpO2 {patient.caseReport.vitals.spo2}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {patient.diagnoses.slice(0, 3).map(diagnosis => <span key={diagnosis} className="rounded-full bg-clinical-info-soft px-2 py-1 text-[10px] font-medium text-clinical-info" dir="ltr">{diagnosis}</span>)}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Metric label="SCr" value={`${patient.labs.serumCreatinine} mg/dL`} />
          <Metric label="CrCl" value={`${crcl.crcl} mL/min`} tone={crcl.crcl < 30 ? 'danger' : 'success'} />
          <Metric label={isArabic ? 'أدوية MAR' : 'MAR orders'} value={`${patient.activeMedications.length}`} icon={<Pill aria-hidden="true" className="size-3" />} />
        </div>

        {patient.allergies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-semibold text-clinical-danger">{isArabic ? 'حساسيات:' : 'Allergies:'}</span>
            {patient.allergies.map(allergy => <ClinicalBadge key={allergy} tone="critical">{allergy}</ClinicalBadge>)}
          </div>
        )}

        {safety.criticalAlerts.length > 0 && (
          <div className="flex items-start gap-2 rounded-clinical border border-clinical-danger/30 bg-clinical-danger-soft p-2.5 text-xs font-semibold text-clinical-danger">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-2">{safety.criticalAlerts[0]}</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex gap-2 border-t border-clinical-border pt-3">
        <button type="button" onClick={() => onOpen(patient)} className="min-h-11 flex-1 rounded-clinical border border-clinical-border px-3 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle">
          {isArabic ? 'فتح ملف المريض' : 'Open patient file'}
        </button>
        <button type="button" onClick={() => onLogIntervention(patient)} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-clinical bg-clinical-teal px-3 text-xs font-semibold text-white hover:brightness-95">
          <ClipboardPlus aria-hidden="true" className="size-4" />
          {isArabic ? 'توثيق DRP' : 'Log DRP'}
        </button>
      </div>
    </ClinicalPanel>
  );
}

function Metric({ label, value, tone = 'default', icon }: { label: string; value: string; tone?: 'default' | 'danger' | 'success'; icon?: ReactNode }) {
  const valueClass = tone === 'danger' ? 'text-clinical-danger' : tone === 'success' ? 'text-clinical-success' : 'text-clinical-text';
  return <div className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-2"><span className="block text-[10px] text-clinical-muted">{label}</span><span className={`mt-1 flex items-center gap-1 text-xs font-bold ${valueClass}`} dir="ltr">{icon}{value}</span></div>;
}

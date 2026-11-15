import { AlertTriangle, Building2, ClipboardPlus, GraduationCap, LogOut, Plus, Users } from 'lucide-react';
import { ClinicalPanel } from '../ui/clinical';
import type { Language, Patient } from '../../types/clinical';

interface PatientWorkspaceHeaderProps {
  lang: Language;
  patients: Patient[];
  onOpenTraining: () => void;
  onAddPatient: () => void;
}

export function PatientWorkspaceHeader({ lang, patients, onOpenTraining, onAddPatient }: PatientWorkspaceHeaderProps) {
  const isArabic = lang === 'ar';
  const critical = patients.filter(patient => patient.status === 'critical').length;
  const observation = patients.filter(patient => patient.status === 'observation').length;
  const dischargePlanned = patients.filter(patient => patient.status === 'discharge_planned').length;

  const metrics = [
    { label: isArabic ? 'إجمالي المرضى' : 'Total patients', value: patients.length, icon: Users, tone: 'text-clinical-info' },
    { label: isArabic ? 'حالات حرجة' : 'Critical', value: critical, icon: AlertTriangle, tone: 'text-clinical-danger' },
    { label: isArabic ? 'تحت الملاحظة' : 'Under observation', value: observation, icon: ClipboardPlus, tone: 'text-clinical-warning' },
    { label: isArabic ? 'خروج مخطط' : 'Discharge planned', value: dischargePlanned, icon: LogOut, tone: 'text-clinical-success' },
  ];

  return (
    <div className="space-y-3">
      <ClinicalPanel
        title={
          <span className="flex items-center gap-2">
            <Building2 aria-hidden="true" className="size-5 text-clinical-teal" />
            {isArabic ? 'جولة الصيدلة الإكلينيكية بالأجنحة' : 'Inpatient clinical pharmacy rounds'}
          </span>
        }
        description={
          isArabic
            ? 'مساحة عمل موحّدة لمراجعة المرضى، المخاطر الدوائية، ووثائق الجولة اليومية.'
            : 'A unified workspace for patient review, medication safety, and daily rounding documentation.'
        }
        actions={
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onOpenTraining} className="inline-flex min-h-10 items-center gap-2 rounded-clinical border border-clinical-border px-3 text-xs font-semibold text-clinical-text hover:bg-clinical-surface-subtle">
              <GraduationCap aria-hidden="true" className="size-4 text-clinical-warning" />
              {isArabic ? 'دليل الحالات' : 'Case guide'}
            </button>
            <button type="button" onClick={onAddPatient} className="inline-flex min-h-10 items-center gap-2 rounded-clinical bg-clinical-teal px-3 text-xs font-semibold text-white hover:brightness-95">
              <Plus aria-hidden="true" className="size-4" />
              {isArabic ? 'إدخال مريض' : 'New admission'}
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-clinical-muted">{label}</span>
                <Icon aria-hidden="true" className={`size-4 ${tone}`} />
              </div>
              <div className="mt-1 text-xl font-bold tracking-tight text-clinical-text" dir="ltr">{value}</div>
            </div>
          ))}
        </div>
      </ClinicalPanel>
    </div>
  );
}

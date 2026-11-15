import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AlertCircle, ArrowRight, Check, CheckCircle2, Plus, RefreshCw, X } from 'lucide-react';
import type { Language, Patient, ReconciliationDiscrepancy } from '../../types/clinical';
import { ClinicalBadge, ClinicalPanel } from '../ui/clinical';

interface ReconciliationPanelProps {
  patients: Patient[];
  discrepancies: ReconciliationDiscrepancy[];
  onAddDiscrepancy: (discrepancy: ReconciliationDiscrepancy) => void;
  onResolveDiscrepancy: (id: string, action: string) => void;
  lang: Language;
}

type Filter = 'all' | 'unresolved' | 'resolved';

export function ReconciliationPanel({ patients, discrepancies, onAddDiscrepancy, onResolveDiscrepancy, lang }: ReconciliationPanelProps) {
  const isArabic = lang === 'ar';
  const [filter, setFilter] = useState<Filter>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [patientId, setPatientId] = useState(patients[0]?.id || 'pt-1');
  const [drugName, setDrugName] = useState('');
  const [homePrescription, setHomePrescription] = useState('');
  const [hospitalOrder, setHospitalOrder] = useState('');
  const [type, setType] = useState<ReconciliationDiscrepancy['type']>('omission');
  const [clinicalSignificance, setClinicalSignificance] = useState<ReconciliationDiscrepancy['clinicalSignificance']>('major');
  const [pharmacistAction, setPharmacistAction] = useState('');

  const unresolvedCount = discrepancies.filter(item => item.clarificationStatus === 'unresolved').length;
  const resolvedCount = discrepancies.length - unresolvedCount;
  const filteredList = discrepancies.filter(item => filter === 'all' || (filter === 'unresolved' ? item.clarificationStatus === 'unresolved' : item.clarificationStatus !== 'unresolved'));

  const getPatientName = (id: string) => {
    const patient = patients.find(item => item.id === id);
    return patient ? (isArabic ? `${patient.name} (${patient.ward})` : `${patient.nameEn} (${patient.ward})`) : id;
  };

  const getTypeLabel = (value: ReconciliationDiscrepancy['type']) => ({
    omission: isArabic ? 'إغفال دواء منزلي' : 'Drug omission',
    commission: isArabic ? 'إضافة غير مبررة' : 'Unjustified addition',
    dose_mismatch: isArabic ? 'اختلاف الجرعة' : 'Dose mismatch',
    frequency_mismatch: isArabic ? 'اختلاف التكرار' : 'Frequency mismatch',
    duplicate_therapy: isArabic ? 'ازدواجية علاجية' : 'Therapeutic duplication',
  })[value];

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    onAddDiscrepancy({ id: `disc-${Date.now()}`, patientId, drugName, type, homePrescription, hospitalOrder, clinicalSignificance, clarificationStatus: 'unresolved', pharmacistAction });
    setIsAdding(false);
    setDrugName(''); setHomePrescription(''); setHospitalOrder(''); setPharmacistAction('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <ClinicalPanel
        title={<span className="flex items-center gap-2"><RefreshCw aria-hidden="true" className="size-5 text-clinical-teal" />{isArabic ? 'المطابقة الدوائية عند الانتقال' : 'Medication reconciliation workspace'}</span>}
        description={isArabic ? 'قارن أدوية المنزل بأوامر التنويم، ثم وثّق الإجراء واحسم الاختلافات.' : 'Compare home medications with inpatient orders, document the action, and close discrepancies.'}
        actions={<button type="button" onClick={() => setIsAdding(true)} className="inline-flex min-h-10 items-center gap-2 rounded-clinical bg-clinical-teal px-3 text-xs font-semibold text-white hover:brightness-95"><Plus aria-hidden="true" className="size-4" />{isArabic ? 'تسجيل اختلاف' : 'Log discrepancy'}</button>}
      >
        <div className="grid grid-cols-3 gap-2">
          <SummaryMetric label={isArabic ? 'كل الاختلافات' : 'All discrepancies'} value={discrepancies.length} tone="info" />
          <SummaryMetric label={isArabic ? 'قيد المراجعة' : 'Needs review'} value={unresolvedCount} tone="review" />
          <SummaryMetric label={isArabic ? 'تمت التسوية' : 'Resolved'} value={resolvedCount} tone="verified" />
        </div>
      </ClinicalPanel>

      {isAdding && <AddDiscrepancyModal {...{ isArabic, patients, patientId, setPatientId, drugName, setDrugName, homePrescription, setHomePrescription, hospitalOrder, setHospitalOrder, type, setType, clinicalSignificance, setClinicalSignificance, pharmacistAction, setPharmacistAction, onClose: () => setIsAdding(false), onSubmit: handleAdd }} />}

      <ClinicalPanel
        title={isArabic ? 'قائمة الاختلافات' : 'Discrepancy queue'}
        description={isArabic ? 'ابدأ بالحالات غير المحسومة، ثم اعتمد النتيجة بعد التحقق.' : 'Start with unresolved items and confirm the result after verification.'}
        actions={<div className="flex gap-1 overflow-x-auto" role="tablist">{([['all', isArabic ? 'الكل' : 'All', discrepancies.length], ['unresolved', isArabic ? 'قيد المراجعة' : 'Needs review', unresolvedCount], ['resolved', isArabic ? 'تمت التسوية' : 'Resolved', resolvedCount]] as const).map(([value, label, count]) => <button key={value} type="button" role="tab" aria-selected={filter === value} onClick={() => setFilter(value)} className={`min-h-9 whitespace-nowrap rounded-clinical px-2.5 text-xs font-semibold ${filter === value ? 'bg-clinical-navy text-white' : 'text-clinical-muted hover:bg-clinical-surface-subtle'}`}>{label} ({count})</button>)}</div>}
      >
        <div className="space-y-3">
          {filteredList.length === 0 ? <div className="rounded-clinical border border-dashed border-clinical-border p-8 text-center text-sm text-clinical-muted">{isArabic ? 'لا توجد اختلافات في هذا العرض.' : 'No discrepancies in this view.'}</div> : filteredList.map(item => <DiscrepancyCard key={item.id} item={item} isArabic={isArabic} patientName={getPatientName(item.patientId)} typeLabel={getTypeLabel(item.type)} onResolve={onResolveDiscrepancy} />)}
        </div>
      </ClinicalPanel>
    </div>
  );
}

function SummaryMetric({ label, value, tone }: { label: string; value: number; tone: 'info' | 'review' | 'verified' }) {
  return <div className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-3"><ClinicalBadge tone={tone}>{label}</ClinicalBadge><div className="mt-2 text-2xl font-bold text-clinical-text" dir="ltr">{value}</div></div>;
}

function DiscrepancyCard({ item, isArabic, patientName, typeLabel, onResolve }: { item: ReconciliationDiscrepancy; isArabic: boolean; patientName: string; typeLabel: string; onResolve: (id: string, action: string) => void }) {
  const resolved = item.clarificationStatus !== 'unresolved';
  const significanceTone = item.clinicalSignificance === 'major' ? 'critical' : item.clinicalSignificance === 'moderate' ? 'review' : 'neutral';
  return <article className="rounded-clinical border border-clinical-border bg-clinical-surface-subtle p-4 sm:p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-medium text-clinical-muted">{patientName}</p><h3 className="mt-1 text-base font-bold text-clinical-text" dir="ltr">{item.drugName}</h3></div><div className="flex flex-wrap gap-1.5"><ClinicalBadge tone="info">{typeLabel}</ClinicalBadge><ClinicalBadge tone={significanceTone}>{item.clinicalSignificance}</ClinicalBadge><ClinicalBadge tone={resolved ? 'verified' : 'review'}>{resolved ? <><CheckCircle2 aria-hidden="true" className="size-3.5" />{isArabic ? 'تمت التسوية' : 'Resolved'}</> : <><AlertCircle aria-hidden="true" className="size-3.5" />{isArabic ? 'قيد المراجعة' : 'Needs review'}</>}</ClinicalBadge></div></div>
    <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center"><Regimen label={isArabic ? 'النظام المنزلي' : 'Home regimen'} value={item.homePrescription} /><ArrowRight aria-hidden="true" className={`mx-auto size-4 text-clinical-muted ${isArabic ? 'rotate-180' : ''}`} /><Regimen label={isArabic ? 'أمر التنويم' : 'Inpatient order'} value={item.hospitalOrder} /></div>
    <div className="mt-4 flex flex-col gap-3 border-t border-clinical-border pt-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm leading-6 text-clinical-muted"><strong className="text-clinical-text">{isArabic ? 'إجراء الصيدلي: ' : 'Pharmacist action: '}</strong>{item.pharmacistAction}</p>{!resolved && <button type="button" onClick={() => onResolve(item.id, `${item.pharmacistAction} — [Verified & Resolved by Clinical Pharmacist]`)} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-clinical bg-clinical-navy px-3 text-xs font-semibold text-white hover:brightness-110"><Check aria-hidden="true" className="size-4" />{isArabic ? 'اعتماد المطابقة' : 'Mark resolved'}</button>}</div>
  </article>;
}

function Regimen({ label, value }: { label: string; value: string }) { return <div className="rounded-clinical border border-clinical-border bg-clinical-surface p-3"><span className="block text-[10px] font-semibold text-clinical-muted">{label}</span><span className="mt-1 block text-sm font-semibold text-clinical-text" dir="ltr">{value}</span></div>; }

interface AddDiscrepancyModalProps {
  isArabic: boolean;
  patients: Patient[];
  patientId: string;
  setPatientId: (value: string) => void;
  drugName: string;
  setDrugName: (value: string) => void;
  homePrescription: string;
  setHomePrescription: (value: string) => void;
  hospitalOrder: string;
  setHospitalOrder: (value: string) => void;
  type: ReconciliationDiscrepancy['type'];
  setType: (value: ReconciliationDiscrepancy['type']) => void;
  clinicalSignificance: ReconciliationDiscrepancy['clinicalSignificance'];
  setClinicalSignificance: (value: ReconciliationDiscrepancy['clinicalSignificance']) => void;
  pharmacistAction: string;
  setPharmacistAction: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

function AddDiscrepancyModal(props: AddDiscrepancyModalProps) {
  const { isArabic, patients, patientId, setPatientId, drugName, setDrugName, homePrescription, setHomePrescription, hospitalOrder, setHospitalOrder, type, setType, clinicalSignificance, setClinicalSignificance, pharmacistAction, setPharmacistAction, onClose, onSubmit } = props;
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"><div className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-clinical-border bg-clinical-surface p-5 shadow-2xl sm:max-w-xl sm:rounded-clinical"><div className="mb-4 flex items-center justify-between"><h2 className="text-base font-bold text-clinical-text">{isArabic ? 'تسجيل اختلاف مطابقة دوائية' : 'Log reconciliation discrepancy'}</h2><button type="button" onClick={onClose} className="rounded-clinical p-2 text-clinical-muted hover:bg-clinical-surface-subtle"><X aria-hidden="true" className="size-5" /></button></div><form onSubmit={onSubmit} className="space-y-4"><Field label={isArabic ? 'المريض' : 'Patient'}><select required value={patientId} onChange={event => setPatientId(event.target.value)} className="field">{patients.map(patient => <option key={patient.id} value={patient.id}>{isArabic ? patient.name : patient.nameEn} ({patient.mrn})</option>)}</select></Field><Field label={isArabic ? 'اسم الدواء' : 'Medication name'}><input required value={drugName} onChange={event => setDrugName(event.target.value)} className="field" dir="ltr" placeholder="e.g. Apixaban" /></Field><div className="grid gap-3 sm:grid-cols-2"><Field label={isArabic ? 'النظام المنزلي' : 'Home regimen'}><input required value={homePrescription} onChange={event => setHomePrescription(event.target.value)} className="field" dir="ltr" /></Field><Field label={isArabic ? 'أمر التنويم' : 'Inpatient order'}><input required value={hospitalOrder} onChange={event => setHospitalOrder(event.target.value)} className="field" dir="ltr" /></Field></div><div className="grid gap-3 sm:grid-cols-2"><Field label={isArabic ? 'نوع الاختلاف' : 'Discrepancy type'}><select value={type} onChange={event => setType(event.target.value as ReconciliationDiscrepancy['type'])} className="field"><option value="omission">Omission</option><option value="dose_mismatch">Dose mismatch</option><option value="frequency_mismatch">Frequency mismatch</option><option value="duplicate_therapy">Duplicate therapy</option><option value="commission">Commission</option></select></Field><Field label={isArabic ? 'الأهمية السريرية' : 'Clinical significance'}><select value={clinicalSignificance} onChange={event => setClinicalSignificance(event.target.value as ReconciliationDiscrepancy['clinicalSignificance'])} className="field"><option value="major">Major</option><option value="moderate">Moderate</option><option value="minor">Minor</option></select></Field></div><Field label={isArabic ? 'إجراء الصيدلي' : 'Pharmacist action plan'}><textarea required rows={3} value={pharmacistAction} onChange={event => setPharmacistAction(event.target.value)} className="field" /></Field><div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="min-h-10 rounded-clinical px-4 text-xs font-semibold text-clinical-muted hover:bg-clinical-surface-subtle">{isArabic ? 'إلغاء' : 'Cancel'}</button><button type="submit" className="min-h-10 rounded-clinical bg-clinical-teal px-4 text-xs font-semibold text-white">{isArabic ? 'حفظ' : 'Save'}</button></div></form></div></div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-xs font-semibold text-clinical-text">{label}<span className="mt-1.5 block">{children}</span></label>; }

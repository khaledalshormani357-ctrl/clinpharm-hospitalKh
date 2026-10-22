import React, { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, ArrowRight, Plus, Check, X } from "lucide-react";
import { Patient, ReconciliationDiscrepancy, Language } from "../../types/clinical";

interface ReconciliationPanelProps {
  patients: Patient[];
  discrepancies: ReconciliationDiscrepancy[];
  onAddDiscrepancy: (discrepancy: ReconciliationDiscrepancy) => void;
  onResolveDiscrepancy: (id: string, action: string) => void;
  lang: Language;
}

export function ReconciliationPanel({ patients, discrepancies, onAddDiscrepancy, onResolveDiscrepancy, lang }: ReconciliationPanelProps) {
  const [filter, setFilter] = useState<"all" | "unresolved" | "resolved">("all");
  const [isAdding, setIsAdding] = useState(false);

  const [patientId, setPatientId] = useState(patients[0]?.id || "pt-1");
  const [drugName, setDrugName] = useState("");
  const [homePrescription, setHomePrescription] = useState("");
  const [hospitalOrder, setHospitalOrder] = useState("");
  const [type, setType] = useState<ReconciliationDiscrepancy["type"]>("omission");
  const [clinicalSignificance, setClinicalSignificance] = useState<ReconciliationDiscrepancy["clinicalSignificance"]>("major");
  const [pharmacistAction, setPharmacistAction] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ReconciliationDiscrepancy = {
      id: `disc-${Date.now()}`,
      patientId,
      drugName,
      type,
      homePrescription,
      hospitalOrder,
      clinicalSignificance,
      clarificationStatus: "unresolved",
      pharmacistAction
    };
    onAddDiscrepancy(newItem);
    setIsAdding(false);
    setDrugName("");
    setHomePrescription("");
    setHospitalOrder("");
    setPharmacistAction("");
  };

  const filteredList = discrepancies.filter(item => {
    if (filter === "unresolved") return item.clarificationStatus === "unresolved";
    if (filter === "resolved") return item.clarificationStatus === "resolved" || item.clarificationStatus === "intentional";
    return true;
  });

  const getPatientName = (pid: string) => {
    const pt = patients.find(p => p.id === pid);
    if (!pt) return pid;
    return lang === 'ar' ? `${pt.name} (${pt.ward})` : `${pt.nameEn} (${pt.ward})`;
  };

  const getTypeLabel = (t: ReconciliationDiscrepancy["type"]) => {
    switch (t) {
      case "omission":
        return lang === 'ar' ? 'إغفال دواء منزلي (Drug Omission)' : 'Drug Omission';
      case "commission":
        return lang === 'ar' ? 'إضافة غير مبررة (Commission)' : 'Unjustified Addition';
      case "dose_mismatch":
        return lang === 'ar' ? 'اختلاف الجرعة (Dose Mismatch)' : 'Dose Mismatch';
      case "frequency_mismatch":
        return lang === 'ar' ? 'اختلاف التكرار (Frequency Mismatch)' : 'Frequency Mismatch';
      case "duplicate_therapy":
        return lang === 'ar' ? 'ازدواجية علاجية (Duplicate Therapy)' : 'Therapeutic Duplication';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shrink-0">
            <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'ar'
                ? 'المطابقة الدوائية عند التنويم والتحويل (Medication Reconciliation - MedRec)'
                : 'Medication Reconciliation (Admission / Transfer / Discharge)'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
              {lang === 'ar'
                ? 'مقارنة Home Medications مع أوامر التنويم (Active Inpatient MAR) لرصد Omissions، Dose Mismatches، والإيقاف المؤقت المقصود.'
                : 'Compare pre-admission home regimens with active inpatient orders to resolve omissions and dosing discrepancies.'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-teal-500 transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          {lang === 'ar' ? '+ تسجيل Discrepancy جديدة' : '+ Add MedRec Discrepancy'}
        </button>
      </div>

      {/* Android Bottom-Sheet Modal for Add Discrepancy */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90dvh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-slate-50 dark:bg-slate-800/50">
              <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {lang === 'ar' ? 'تسجيل اختلاف مطابقة دوائية (New MedRec Discrepancy)' : 'Log Medication Reconciliation Discrepancy'}
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-5 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'المريض (Inpatient)' : 'Select Patient'}
                </label>
                <select
                  value={patientId}
                  onChange={e => setPatientId(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                >
                  {patients.map(pt => (
                    <option key={pt.id} value={pt.id}>
                      {lang === 'ar' ? pt.name : pt.nameEn} ({pt.mrn})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'اسم الدواء (Medication Name)' : 'Medication Name'}
                </label>
                <input
                  required
                  type="text"
                  dir="ltr"
                  placeholder="e.g., Lisinopril, Metformin, Apixaban"
                  value={drugName}
                  onChange={e => setDrugName(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'النظام المنزلي (Home Regimen)' : 'Home Regimen'}
                  </label>
                  <input
                    required
                    type="text"
                    dir="ltr"
                    placeholder="e.g., 20 mg PO Daily"
                    value={homePrescription}
                    onChange={e => setHomePrescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'الأمر الداخلي (Inpatient Order)' : 'Inpatient Order'}
                  </label>
                  <input
                    required
                    type="text"
                    dir="ltr"
                    placeholder="e.g., Held (AKI) / Omitted"
                    value={hospitalOrder}
                    onChange={e => setHospitalOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'نوع الاختلاف (Discrepancy Type)' : 'Discrepancy Type'}
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as ReconciliationDiscrepancy["type"])}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    <option value="omission">Omission (إغفال دواء منزلي)</option>
                    <option value="dose_mismatch">Dose Mismatch (اختلاف الجرعة)</option>
                    <option value="frequency_mismatch">Frequency Mismatch (اختلاف التكرار)</option>
                    <option value="duplicate_therapy">Duplicate Therapy (ازدواجية علاجية)</option>
                    <option value="commission">Commission (إضافة غير مبررة)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'الأهمية السريرية (Significance)' : 'Clinical Significance'}
                  </label>
                  <select
                    value={clinicalSignificance}
                    onChange={e => setClinicalSignificance(e.target.value as ReconciliationDiscrepancy["clinicalSignificance"])}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    <option value="major">Major (عالي الخطورة)</option>
                    <option value="moderate">Moderate (متوسط)</option>
                    <option value="minor">Minor (بسيط)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'توصية الصيدلي الإكلينيكي (Pharmacist Action Plan)' : 'Pharmacist Action Plan'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={pharmacistAction}
                  onChange={e => setPharmacistAction(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2 pb-safe">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button type="submit" className="bg-teal-600 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-teal-500">
                  {lang === 'ar' ? 'حفظ (Save)' : 'Save Discrepancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex gap-2 bg-slate-50/50 dark:bg-slate-800/30 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setFilter("all")}
            className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${filter === "all" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}
          >
            {lang === 'ar' ? 'الكل (All)' : 'All'} ({discrepancies.length})
          </button>
          <button 
            onClick={() => setFilter("unresolved")}
            className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${filter === "unresolved" ? "bg-amber-500 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}
          >
            {lang === 'ar' ? 'قيد المراجعة (Unresolved)' : 'Unresolved'} ({discrepancies.filter(d => d.clarificationStatus === "unresolved").length})
          </button>
          <button 
            onClick={() => setFilter("resolved")}
            className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${filter === "resolved" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}
          >
            {lang === 'ar' ? 'تمت التسوية (Resolved / Intentional)' : 'Resolved / Intentional'} ({discrepancies.filter(d => d.clarificationStatus !== "unresolved").length})
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredList.map((item) => {
            const isResolved = item.clarificationStatus === "resolved" || item.clarificationStatus === "intentional";
            return (
              <div key={item.id} className="p-4 sm:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {getPatientName(item.patientId)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5" dir="ltr">
                      {item.drugName}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                      {getTypeLabel(item.type)}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                      item.clinicalSignificance === "major"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50"
                    }`} dir="ltr">
                      {item.clinicalSignificance}
                    </span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      isResolved
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}>
                      {isResolved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      {item.clarificationStatus === "intentional"
                        ? (lang === 'ar' ? 'إيقاف مقصود (Intentional Hold)' : 'Intentional Hold')
                        : isResolved
                        ? (lang === 'ar' ? 'تمت المطابقة (Resolved)' : 'Resolved')
                        : (lang === 'ar' ? 'بانتظار التأكيد (Unresolved)' : 'Unresolved')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/50 mb-4">
                  <div className="md:col-span-5">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      {lang === 'ar' ? 'الدواء المنزلي (Home Regimen)' : 'Home Prescription'}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                      {item.homePrescription}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                    <ArrowRight className={`h-4 w-4 text-slate-400 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="md:col-span-5">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      {lang === 'ar' ? 'أمر التنويم (Hospital Order)' : 'Inpatient Order'}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                      {item.hospitalOrder}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong className="font-semibold text-slate-900 dark:text-slate-300">
                      {lang === 'ar' ? 'إجراء الصيدلي (Pharmacist Action): ' : 'Pharmacist Action: '}
                    </strong>
                    {item.pharmacistAction}
                  </p>
                  {item.clarificationStatus === "unresolved" && (
                    <button 
                      onClick={() =>
                        onResolveDiscrepancy(
                          item.id,
                          `${item.pharmacistAction} — [Verified & Resolved by Clinical Pharmacist]`
                        )
                      }
                      className="flex items-center justify-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {lang === 'ar' ? 'اعتماد المطابقة (Resolve)' : 'Mark Resolved'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

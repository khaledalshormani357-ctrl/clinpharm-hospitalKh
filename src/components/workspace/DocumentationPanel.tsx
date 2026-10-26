import React, { useState } from "react";
import { FileText, Plus, CheckCircle2, Clock, Filter, X, Wand2, BookOpen, Database, Printer, Share2 } from "lucide-react";
import { ClinicalIntervention, InterventionStatus, Patient, DRPType, Language } from "../../types/clinical";
import { ACCP_2026_CHAPTERS } from "../../lib/clinicalReferences";
import { printOrSaveClinicalPdf, shareClinicalFile } from "../../lib/androidPermissions";

interface DocumentationPanelProps {
  interventions: ClinicalIntervention[];
  patients: Patient[];
  onAddIntervention: (intervention: ClinicalIntervention) => void;
  onUpdateStatus: (id: string, status: InterventionStatus, feedback?: string) => void;
  lang: Language;
  onOpenLocalReference?: (uri: string) => void;
}

const SOAP_TEMPLATES: {
  id: string;
  labelAr: string;
  labelEn: string;
  drpType: DRPType;
  severity: "high" | "medium" | "low";
  medicationInvolved: string;
  clinicalIssue: string;
  proposedRecommendation: string;
  rationale: string;
  costImpactEstimatedSAR: number;
  referenceChapterUrl: string;
}[] = [
  {
    id: "vanco-tdm",
    labelAr: "Vancomycin AUC24/MIC TDM Adjustment",
    labelEn: "Vancomycin AUC24/MIC TDM Adjustment",
    drpType: "therapeutic_drug_monitoring",
    severity: "high",
    medicationInvolved: "Vancomycin (فانكومايسين)",
    clinicalIssue: "S/O: المريض يتلقى Vancomycin IV لعلاج MRSA Bacteremia مع ارتفاع SCr وانخفاض CrCl < 30 mL/min. قيمة Trough / AUC24 المحسوبة تتجاوز 600 mg·h/L.",
    proposedRecommendation: "P: إيقاف الجرعة القادمة مؤقتاً (Hold next dose)، ثم تعديل الـ Maintenance Regimen إلى 1000 mg IV q24h مع إعادة قياس Bayesian AUC24/MIC (Target: 400–600 mg·h/L) ومراقبة SCr يومياً.",
    rationale: "A: Supratherapeutic Vancomycin exposure يرفع خطر Synergistic Acute Kidney Injury (AKI) وفق إرشادات ASHP/IDSA Vancomycin TDM Guidelines & DiPiro 13th Ed.",
    costImpactEstimatedSAR: 1450,
    referenceChapterUrl: "local://ref/chapter/accp-2026-v2-c7"
  },
  {
    id: "renal-mero",
    labelAr: "Meropenem Renal Dosing & Extended Infusion",
    labelEn: "Meropenem Renal Dosing & Extended Infusion",
    drpType: "renal_dose_adjustment",
    severity: "high",
    medicationInvolved: "Meropenem (ميروبينيم)",
    clinicalIssue: "S/O: مريض Septic Shock & AKI (CrCl ~24 mL/min) موصوف له Meropenem 1000 mg IV q8h (Full Unadjusted Dose).",
    proposedRecommendation: "P: تعديل الجرعة الكلوية إلى Meropenem 1000 mg IV q12h عبر 3-hour Extended Infusion مع تقييم Antimicrobial De-escalation فور صدور نتائج المزارع.",
    rationale: "A: يُطرح Meropenem عبر الكلى؛ عدم تعديل الـ Dosing Interval عند CrCl < 25 mL/min يرفع خطر تراكم الدواء والـ CNS Neurotoxicity/Seizures مع الحفاظ على %fT>MIC عبر الـ Extended Infusion.",
    costImpactEstimatedSAR: 980,
    referenceChapterUrl: "local://ref/chapter/dipiro-13-sepsis-aki-pk"
  },
  {
    id: "gdmt-washout",
    labelAr: "HFrEF GDMT: ACEi to ARNI 36-Hour Washout",
    labelEn: "HFrEF GDMT: ACEi to ARNI 36-Hour Washout",
    drpType: "drug_interaction",
    severity: "high",
    medicationInvolved: "Sacubitril/Valsartan (Entresto) + Enalapril",
    clinicalIssue: "S/O: مريض HFrEF (LVEF 25%) تقرر تحويله من Enalapril إلى Sacubitril/Valsartan (ARNI) لتحسين الـ 4 Pillars of GDMT.",
    proposedRecommendation: "P: إيقاف Enalapril فوراً والانتظار فترة 36-hour Washout Period إلزامية قبل إعطاء أول جرعة من Sacubitril/Valsartan 24/26 mg PO BID، مع مراقبة K+ و SCr وضغط الدم (SBP).",
    rationale: "A: التثبيط المزدوج لـ Neprilysin و ACE يسبب تراكماً حاداً للـ Bradykinin ويرفع خطر Life-Threatening Angioedema (ACCP 2026 Cardiology Guidelines).",
    costImpactEstimatedSAR: 2100,
    referenceChapterUrl: "local://ref/chapter/dipiro-13-hf-cardiorenal"
  }
];

export function DocumentationPanel({
  interventions,
  patients,
  onAddIntervention,
  onUpdateStatus,
  lang,
  onOpenLocalReference
}: DocumentationPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | InterventionStatus>("all");

  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "pt-1");
  const [drpType, setDrpType] = useState<DRPType>("renal_dose_adjustment");
  const [severity, setSeverity] = useState<"high" | "medium" | "low">("high");
  const [medicationInvolved, setMedicationInvolved] = useState("");
  const [clinicalIssue, setClinicalIssue] = useState("");
  const [proposedRecommendation, setProposedRecommendation] = useState("");
  const [rationale, setRationale] = useState("");
  const [costImpact, setCostImpact] = useState(950);
  const [selectedRefUrl, setSelectedRefUrl] = useState<string>("local://ref/chapter/accp-2026-v2-c7");

  const applyTemplate = (tplId: string) => {
    const tpl = SOAP_TEMPLATES.find(item => item.id === tplId);
    if (!tpl) return;
    setDrpType(tpl.drpType);
    setSeverity(tpl.severity);
    setMedicationInvolved(tpl.medicationInvolved);
    setClinicalIssue(tpl.clinicalIssue);
    setProposedRecommendation(tpl.proposedRecommendation);
    setRationale(tpl.rationale);
    setCostImpact(tpl.costImpactEstimatedSAR);
    setSelectedRefUrl(tpl.referenceChapterUrl);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const pt = patients.find(p => p.id === selectedPatientId) || patients[0];
    const matchedChapter = ACCP_2026_CHAPTERS.find(c => c.sourceUrl === selectedRefUrl);
    const newItem: ClinicalIntervention = {
      id: `int-${Date.now()}`,
      patientId: pt?.id || "pt-1",
      patientName: pt ? (lang === 'ar' ? pt.name : pt.nameEn) : "Inpatient",
      mrn: pt?.mrn || "MRN-000",
      ward: pt?.ward || "ICU",
      date: new Date().toISOString().split('T')[0],
      drpType,
      medicationInvolved,
      clinicalIssue,
      proposedRecommendation,
      rationale,
      severity,
      pharmacist: pt?.clinicalPharmacist || "د. خالد الشورماني",
      physician: pt?.attendingPhysician || "Attending Physician",
      status: "pending",
      costImpactEstimatedSAR: costImpact,
      referenceTitle: matchedChapter
        ? `${matchedChapter.title} (${matchedChapter.pages})`
        : "DiPiro 13th Ed & ACCP 2026 Local DB",
      referenceSourceUrl: selectedRefUrl
    };
    onAddIntervention(newItem);
    setIsModalOpen(false);
    setMedicationInvolved("");
    setClinicalIssue("");
    setProposedRecommendation("");
    setRationale("");
  };

  const filteredList = interventions.filter(item => {
    if (filterStatus === "all") return true;
    return item.status === filterStatus;
  });

  const getDrpLabel = (drp: DRPType) => {
    switch (drp) {
      case "renal_dose_adjustment":
        return "Renal Dose Adjustment (تعديل جرعة كلوية)";
      case "therapeutic_drug_monitoring":
        return "PK / TDM Consult (مراقبة علاجية TDM)";
      case "drug_interaction":
        return "Drug-Drug Interaction (تداخل دوائي)";
      case "adverse_drug_reaction":
        return "ADR / Contraindication (تفاعل ضار / مضاد استطباب)";
      case "dosage_too_high":
        return "Supratherapeutic Dose (جرعة زائدة)";
      case "dosage_too_low":
        return "Subtherapeutic Dose (جرعة دون علاجية)";
      case "needs_additional_drug":
        return "Needs Additional Therapy / GDMT";
      case "unnecessary_drug":
        return "Unnecessary Drug Therapy (دواء غير مستطب)";
      default:
        return drp;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-950/50 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'ar'
                ? 'توثيق التدخلات السريرية وملاحظات SOAP (Clinical Interventions & DRP Log)'
                : 'Clinical Pharmacist Interventions & SOAP Note Documentation'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
              {lang === 'ar'
                ? 'سجل رسمي لـ Drug-Related Problems (DRPs)، التوصيات الدوائية بصيغة SOAP، والأثر المالي التقديري (Cost Avoidance).'
                : 'Structured documentation of Drug-Related Problems (DRPs), SOAP clinical recommendations, and cost avoidance.'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              const md = [
                `# Clinical Pharmacist SOAP Interventions Log`,
                ...filteredList.map(
                  (it, i) =>
                    `## ${i + 1}. ${it.patientName} (${it.mrn}) — ${it.medicationInvolved}\n- **DRP:** ${it.drpType} (${it.severity.toUpperCase()})\n- **Issue (S/O):** ${it.clinicalIssue}\n- **Rationale (A):** ${it.rationale}\n- **Plan (P):** ${it.proposedRecommendation}\n- **Reference:** ${it.referenceTitle || 'Verified Local Reference'}`
                )
              ].join('\n\n');
              printOrSaveClinicalPdf({
                title:
                  lang === 'ar'
                    ? 'سجل التدخلات السريرية وملاحظات SOAP — ClinPharm Hospital'
                    : 'Clinical Pharmacist SOAP Interventions Log',
                subtitle: `Total Documented Interventions: ${filteredList.length}`,
                bodyMarkdownOrText: md,
                filenameBase: 'ClinPharm-SOAP-Interventions-Log',
                dir: lang === 'ar' ? 'rtl' : 'ltr'
              });
            }}
            className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4 text-indigo-600" />
            <span>{lang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const md = [
                `# Clinical Pharmacist SOAP Interventions Log`,
                ...filteredList.map(
                  (it, i) =>
                    `## ${i + 1}. ${it.patientName} (${it.mrn}) — ${it.medicationInvolved}\n- **DRP:** ${it.drpType} (${it.severity.toUpperCase()})\n- **Issue (S/O):** ${it.clinicalIssue}\n- **Rationale (A):** ${it.rationale}\n- **Plan (P):** ${it.proposedRecommendation}`
                )
              ].join('\n\n');
              void shareClinicalFile({
                filename: 'ClinPharm-SOAP-Interventions-Log.md',
                title: 'ClinPharm Hospital — SOAP Interventions Log',
                content: md
              });
            }}
            className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'مشاركة' : 'Share'}</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-teal-600 text-white px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-teal-500 transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            {lang === 'ar' ? '+ توثيق SOAP / DRP جديد' : '+ New SOAP Intervention'}
          </button>
        </div>
      </div>

      {/* Android Bottom-Sheet Modal for SOAP Note Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92dvh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-slate-50 dark:bg-slate-800/50">
              <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {lang === 'ar' ? 'توثيق تدخل صيدلاني إكلينيكي (New DRP & SOAP Note)' : 'Document Clinical Pharmacist Intervention (SOAP)'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              {/* Quick Smart Templates */}
              <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  <Wand2 className="h-3.5 w-3.5" />
                  {lang === 'ar' ? 'قوالب SOAP سريرية جاهزة (Smart Clinical Templates):' : 'Smart Clinical SOAP Templates:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {SOAP_TEMPLATES.map(tpl => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => applyTemplate(tpl.id)}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer font-medium"
                      dir="ltr"
                    >
                      {lang === 'ar' ? tpl.labelAr : tpl.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'المريض (Inpatient)' : 'Patient'}
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    {patients.map(pt => (
                      <option key={pt.id} value={pt.id}>
                        {lang === 'ar' ? pt.name : pt.nameEn} ({pt.ward})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'تصنيف المشكلة (DRP Category)' : 'DRP Category'}
                  </label>
                  <select
                    value={drpType}
                    onChange={e => setDrpType(e.target.value as DRPType)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    <option value="renal_dose_adjustment">Renal Dose Adjustment</option>
                    <option value="therapeutic_drug_monitoring">PK / TDM Consult</option>
                    <option value="drug_interaction">Drug-Drug Interaction (DDI)</option>
                    <option value="adverse_drug_reaction">ADR / Contraindication</option>
                    <option value="dosage_too_high">Dosage Too High</option>
                    <option value="dosage_too_low">Dosage Too Low</option>
                    <option value="needs_additional_drug">Needs Additional Drug (GDMT)</option>
                    <option value="unnecessary_drug">Unnecessary Drug</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'مستوى الخطورة (Severity)' : 'Clinical Severity'}
                  </label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as "high" | "medium" | "low")}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    <option value="high">High Impact (حرج / عالي)</option>
                    <option value="medium">Medium Impact (متوسط)</option>
                    <option value="low">Low Impact (منخفض)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'الدواء المعني (Medication Involved)' : 'Medication Involved'}
                </label>
                <input
                  required
                  type="text"
                  dir="ltr"
                  placeholder="e.g., Vancomycin 1g IV q12h / Meropenem"
                  value={medicationInvolved}
                  onChange={e => setMedicationInvolved(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                />
              </div>
              
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'S & O — المعطيات السريرية والمخبرية (Subjective & Objective Clinical Issue)' : 'S & O — Clinical Issue & Labs'}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={clinicalIssue}
                    onChange={e => setClinicalIssue(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'A — التقييم السريري والمرجعية (Assessment & Evidence Rationale)' : 'A — Clinical Assessment & Rationale'}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={rationale}
                    onChange={e => setRationale(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'P — الخطة العلاجية المقترحة وتوصية الصيدلي (Plan & Proposed Recommendation)' : 'P — Proposed Pharmacotherapy Plan'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={proposedRecommendation}
                    onChange={e => setProposedRecommendation(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar'
                      ? 'المرجع المرتبط من قاعدة بيانات التطبيق المحلية (Linked Local Reference Chapter)'
                      : 'Linked In-App Local Reference Chapter'}
                  </label>
                  <select
                    value={selectedRefUrl}
                    onChange={e => setSelectedRefUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
                    dir="ltr"
                  >
                    {ACCP_2026_CHAPTERS.map(ch => (
                      <option key={ch.id} value={ch.sourceUrl}>
                        {ch.title} ({ch.pages}) — {ch.sourceUrl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 shrink-0 pb-safe">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button type="submit" className="bg-teal-600 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold hover:bg-teal-500">
                  {lang === 'ar' ? 'حفظ التوثيق (Save SOAP)' : 'Save Intervention'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Filter:</span>
            <button onClick={() => setFilterStatus("all")} className={`px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-bold cursor-pointer shrink-0 ${filterStatus === "all" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-slate-400"}`}>
              {lang === 'ar' ? 'الكل (All)' : 'All'} ({interventions.length})
            </button>
            <button onClick={() => setFilterStatus("accepted")} className={`px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-bold cursor-pointer shrink-0 ${filterStatus === "accepted" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-400"}`}>
              {lang === 'ar' ? 'مقبول (Accepted)' : 'Accepted'} ({interventions.filter(i => i.status === "accepted").length})
            </button>
            <button onClick={() => setFilterStatus("pending")} className={`px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-bold cursor-pointer shrink-0 ${filterStatus === "pending" ? "bg-amber-500 text-white" : "text-slate-600 dark:text-slate-400"}`}>
              {lang === 'ar' ? 'قيد المراجعة (Pending)' : 'Pending'} ({interventions.filter(i => i.status === "pending").length})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredList.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {item.patientName} ({item.mrn})
                    </span>
                    <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold" dir="ltr">
                      • {item.ward} • {item.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {getDrpLabel(item.drpType)} — <span dir="ltr" className="text-teal-700 dark:text-teal-300">{item.medicationInvolved}</span>
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                    item.severity === "high" 
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50" 
                      : item.severity === "medium"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50"
                  }`} dir="ltr">
                    {item.severity} severity
                  </span>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "accepted"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                  }`}>
                    {item.status === "accepted" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                    {item.status === "accepted"
                      ? (lang === 'ar' ? 'تم القبول (Accepted)' : 'Accepted')
                      : (lang === 'ar' ? 'قيد المراجعة (Pending)' : 'Pending')}
                  </span>
                  {item.status === "pending" && (
                    <button
                      onClick={() => onUpdateStatus(item.id, "accepted", "تم اعتماد التوصية السريرية وتعديل الأمر الدوائي (Accepted by Attending).")}
                      className="text-xs font-bold px-3 py-1.5 min-h-[36px] rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      {lang === 'ar' ? 'اعتماد الطبيب (Accept)' : 'Mark Accepted'}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm">
                <div className="md:col-span-2">
                  <span className="font-bold text-teal-600 dark:text-teal-400 uppercase text-[11px] tracking-wider block mb-1">
                    {lang === 'ar' ? 'المشكلة السريرية والمعطيات (S/O — Clinical Issue)' : 'S/O — Clinical Issue'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.clinicalIssue}</p>
                </div>
                <div className="md:col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[11px] tracking-wider block mb-1">
                    {lang === 'ar' ? 'التقييم والدليل المرجعي (A — Assessment & Rationale)' : 'A — Clinical Rationale'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.rationale}</p>
                </div>
                <div className="md:col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[11px] tracking-wider block mb-1">
                    {lang === 'ar' ? 'التوصية والخطة العلاجية (P — Proposed Plan)' : 'P — Proposed Pharmacotherapy Plan'}
                  </span>
                  <p className="text-slate-900 dark:text-white font-semibold whitespace-pre-line leading-relaxed">{item.proposedRecommendation}</p>
                </div>
              </div>

              {(item.referenceTitle || item.physicianFeedback) && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {item.referenceTitle && (
                    <button
                      type="button"
                      onClick={() => {
                        if (item.referenceSourceUrl && onOpenLocalReference) {
                          onOpenLocalReference(item.referenceSourceUrl);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 font-mono text-teal-800 dark:text-teal-300 font-semibold transition cursor-pointer"
                      dir="ltr"
                      title={lang === 'ar' ? 'فتح الفصل المرجعي من قاعدة البيانات المحلية' : 'Open chapter in local reference database'}
                    >
                      <Database className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{item.referenceTitle}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-600 text-white font-sans font-bold">
                        {lang === 'ar' ? 'فتح محلياً' : 'Local DB'}
                      </span>
                    </button>
                  )}
                  {item.physicianFeedback && (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      ✓ {item.physicianFeedback}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

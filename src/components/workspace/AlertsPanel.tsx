import React, { useState, useMemo } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Info, Search, Pill, X, PlusCircle } from "lucide-react";
import { analyzePatientSafety } from "../../lib/clinical-engine";
import { Patient, Language } from "../../types/clinical";
import { DRUG_INTERACTIONS_DB } from "../../lib/mockData";

const COMMON_DRUGS_EN = [
  "Vancomycin", "Meropenem", "Piperacillin/Tazobactam", "Ceftriaxone", "Ciprofloxacin", "Levofloxacin", "Azithromycin", "Gentamicin", "Amikacin",
  "Enoxaparin", "Heparin", "Warfarin", "Apixaban", "Rivaroxaban", "Clopidogrel", "Aspirin",
  "Lisinopril", "Valsartan", "Sacubitril/Valsartan", "Amlodipine", "Metoprolol", "Carvedilol", "Bisoprolol", "Furosemide", "Spironolactone", "Digoxin", "Amiodarone",
  "Empagliflozin", "Dapagliflozin", "Metformin", "Insulin Glargine", "Insulin Aspart", "Sitagliptin", "Liraglutide",
  "Atorvastatin", "Rosuvastatin",
  "Omeprazole", "Pantoprazole", "Esomeprazole", "Famotidine", "Ondansetron",
  "Paracetamol", "Ibuprofen", "Naproxen", "Ketorolac", "Morphine", "Fentanyl", "Tramadol", "Gabapentin", "Pregabalin",
  "Losartan", "Hydrochlorothiazide", "Simvastatin", "Fluconazole", "Clarithromycin", "Sertraline", "Escitalopram", "Phenytoin", "Carbamazepine", "Valproic Acid"
];

interface AlertsPanelProps {
  patients: Patient[];
  lang: Language;
  onSelectPatientForIntervention: (patient: Patient) => void;
}

export function AlertsPanel({ patients, lang, onSelectPatientForIntervention }: AlertsPanelProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || "");
  
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [drug3, setDrug3] = useState("");
  const [interactionResult, setInteractionResult] = useState<{
    severity: string;
    pair: string;
    mechanism: string;
    management: string;
  }[] | null>(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const safetyAnalysis = useMemo(() => {
    if (!selectedPatient) return null;
    return analyzePatientSafety(selectedPatient);
  }, [selectedPatient]);

  const checkCustomInteractions = (e: React.FormEvent) => {
    e.preventDefault();
    const drugs = [drug1, drug2, drug3].map(d => d.trim().toLowerCase()).filter(Boolean);
    if (drugs.length < 2) return;

    const results: {
      severity: string;
      pair: string;
      mechanism: string;
      management: string;
    }[] = [];

    const has = (kw1: string, kw2: string) => 
      drugs.some(d => d.includes(kw1)) && drugs.some(d => d.includes(kw2));

    // Also match against DRUG_INTERACTIONS_DB
    DRUG_INTERACTIONS_DB.forEach((dbItem) => {
      const a = dbItem.drugA.toLowerCase();
      const b = dbItem.drugB.toLowerCase();
      if (drugs.some(d => d.includes(a) || a.includes(d)) && drugs.some(d => d.includes(b) || b.includes(d)) && a !== b) {
        results.push({
          severity: dbItem.severity,
          pair: `${dbItem.drugA} + ${dbItem.drugB}`,
          mechanism: dbItem.mechanism,
          management: `${dbItem.clinicalEffect} — ${dbItem.actionRequired}`
        });
      }
    });

    if (results.length === 0) {
      if (has("warfarin", "aspirin") || has("warfarin", "ibuprofen") || has("warfarin", "naproxen") || has("warfarin", "ketorolac")) {
        results.push({
          severity: "Major",
          pair: "Warfarin + NSAID / Aspirin",
          mechanism: lang === 'ar' 
            ? "Additive antiplatelet effect بالإضافة إلى GI mucosal irritation وتثبيط تصنيع Prostaglandins، مما يضاعف خطر Major GI Bleeding مع Anticoagulation." 
            : "Additive antiplatelet effects and GI mucosal irritation significantly increase risk of major gastrointestinal bleeding.",
          management: lang === 'ar'
            ? "تجنب الجمع (Avoid Concurrent Use) إن أمكن. إذا كان Aspirin مستطباً قلبياً، استخدم جرعة منخفضة (81 mg) مع إضافة PPI (مثل Pantoprazole) ومراقبة INR وعلامات النزيف."
            : "Avoid concurrent use if possible. If aspirin is clinically indicated, use lowest effective dose (81 mg) and add a PPI for GI protection. Monitor INR and signs of bleeding closely."
        });
      }
      if (has("warfarin", "amiodarone") || has("warfarin", "fluconazole") || has("warfarin", "metronidazole")) {
        results.push({
          severity: "Major",
          pair: "Warfarin + CYP2C9 Inhibitor (Amiodarone / Fluconazole)",
          mechanism: lang === 'ar'
            ? "تثبيط قوي لإنزيم CYP2C9 المسؤول عن استقلاب S-Warfarin (الأكثر فعالية)، مما يؤدي إلى ارتفاع حاد في INR وخطر Supratherapeutic Anticoagulation."
            : "Potent inhibition of CYP2C9 metabolism of the active S-warfarin enantiomer, leading to supratherapeutic INR and severe bleeding risk.",
          management: lang === 'ar'
            ? "قم بتخفيض جرعة Warfarin بنسبة 30% إلى 50% استباقياً عند بدء العلاج المرافق، مع مراقبة INR كل 3-5 أيام."
            : "Empirically reduce Warfarin dose by 30% to 50% upon initiation of the interacting agent and monitor INR closely within 3–5 days."
        });
      }
      if ((has("lisinopril", "spironolactone") || has("valsartan", "spironolactone") || has("sacubitril", "spironolactone"))) {
        results.push({
          severity: "Moderate",
          pair: "RAAS Inhibitor (ACEi/ARB/ARNI) + Spironolactone (MRA)",
          mechanism: lang === 'ar'
            ? "تثبيط مزدوج لنظام Aldosterone يقلل طرح البوتاسيوم الكلوي ويرفع خطر Severe Hyperkalemia (K+ > 5.5 mEq/L) وتدهور eGFR."
            : "Additive reduction in aldosterone activity impairs renal potassium excretion, increasing the risk of life-threatening hyperkalemia.",
          management: lang === 'ar'
            ? "تأكد أن K+ الأساسي < 5.0 mEq/L و eGFR > 30 mL/min. راقب Serum Potassium و SCr خلال 3-7 أيام من البدء أو تعديل الجرعة."
            : "Ensure baseline K+ < 5.0 mEq/L and eGFR > 30 mL/min. Monitor serum potassium and creatinine within 3–7 days of initiation or titration."
        });
      }
      if (has("vancomycin", "piperacillin") || has("vancomycin", "gentamicin") || has("vancomycin", "amikacin") || has("vancomycin", "furosemide")) {
        results.push({
          severity: "Major",
          pair: "Vancomycin + Nephrotoxic Agent (Pip/Tazo, Aminoglycoside, or Loop Diuretic)",
          mechanism: lang === 'ar'
            ? "تأثير Synergistic Nephrotoxicity يزيد بشكل ملحوظ من احتمالية حدوث Acute Kidney Injury (AKI) مقارنة باستخدام Vancomycin بمفرده."
            : "Synergistic nephrotoxicity significantly increases the incidence of Acute Kidney Injury (AKI) compared to Vancomycin monotherapy.",
          management: lang === 'ar'
            ? "قيّم إمكانية استبدال Piperacillin/Tazobactam بـ Cefepime أو Meropenem. طبّق بروتوكول AUC24/MIC TDM (الهدف 400–600) وراقب SCr يومياً."
            : "Consider alternative beta-lactam (e.g., Cefepime or Meropenem instead of Pip/Tazo). Perform strict AUC-guided TDM and monitor SCr daily."
        });
      }
      if (has("lisinopril", "sacubitril") || has("valsartan", "sacubitril")) {
        results.push({
          severity: "Contraindicated",
          pair: "ACEi / ARB + Sacubitril/Valsartan (ARNI)",
          mechanism: lang === 'ar'
            ? "تثبيط مزدوج لإنزيم Neprilysin و ACE يؤدي إلى تراكم خطير لـ Bradykinin وخطر مرتفع جداً لحدوث Angioedema مهدد للحياة."
            : "Dual inhibition of neprilysin and ACE causes severe bradykinin accumulation and life-threatening angioedema.",
          management: lang === 'ar'
            ? "مضاد استطباب مطلق (Absolute Contraindication). يجب الالتزام بفترة غسيل (36-hour Washout Period) على الأقل عند التحويل بين ACEi و ARNI."
            : "Strictly contraindicated. Enforce a mandatory 36-hour washout period between stopping an ACE inhibitor and starting Sacubitril/Valsartan."
        });
      }
    }

    if (results.length === 0) {
      results.push({
        severity: "Safe",
        pair: [drug1, drug2, drug3].filter(Boolean).join(" + "),
        mechanism: lang === 'ar'
          ? "لم يتم رصد تداخل دوائي حركي (PK) أو ديناميكي (PD) خطير مباشر في قاعدة البيانات السريرية الأساسية."
          : "No major pharmacokinetic or pharmacodynamic interactions identified in the primary clinical rulebase.",
        management: lang === 'ar'
          ? "استمر بالمراقبة السريرية الروتينية وتحقق من تعديل الجرعات حسب الكلى (CrCl / eGFR) والكبد."
          : "Continue routine clinical monitoring and verify renal/hepatic dosing adjustments."
      });
    }

    setInteractionResult(results);
  };

  const totalAlertsCount = safetyAnalysis
    ? safetyAnalysis.criticalAlerts.length +
      safetyAnalysis.allergyWarnings.length +
      safetyAnalysis.warnings.length +
      safetyAnalysis.interactions.length
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 shrink-0">
            <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'ar'
                ? 'فحص السلامة الدوائية والتداخلات (Clinical Safety & DDI Engine)'
                : 'Clinical Drug Safety & Interaction Screening Engine'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
              {lang === 'ar'
                ? 'فحص آلي لـ Drug-Drug Interactions (DDIs)، Cross-Allergy، Contraindications، و Renal Dose Adjustments.'
                : 'Automated screening for DDIs, IgE cross-reactivity, contraindications, and CrCl renal dose adjustments.'}
            </p>
          </div>
        </div>
      </div>

      {/* Patient-Specific Automated Safety Scanner */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              {lang === 'ar' ? 'الفحص الآلي لملف المريض (Automated Profile DRP & Safety Scan)' : 'Automated Patient Profile Safety Scan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'ar' ? 'يربط تلقائياً بين الأدوية النشطة (Active MAR)، الحساسية (Cross-Reactivity)، ووظائف الكلى (CrCl / eGFR).' : 'Automatically cross-references active medications, allergies, and renal function (CrCl).'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {lang === 'ar' ? p.name : p.nameEn} ({p.ward} • {p.room}) — CrCl: {p.labs.crcl || 'N/A'} mL/min
                </option>
              ))}
            </select>
            {selectedPatient && (
              <button
                onClick={() => onSelectPatientForIntervention(selectedPatient)}
                className="flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                {lang === 'ar' ? 'توثيق DRP' : 'Log DRP'}
              </button>
            )}
          </div>
        </div>

        {selectedPatient && safetyAnalysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Active Safety Alerts & Interactions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {lang === 'ar'
                  ? `التنبيهات السريرية النشطة (Active Safety Alerts: ${totalAlertsCount})`
                  : `Active Clinical Safety Alerts (${totalAlertsCount})`}
              </h4>

              {safetyAnalysis.allergyWarnings.map((aw, idx) => (
                <div key={`aw-${idx}`} className="p-3.5 sm:p-4 rounded-xl border bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-200 leading-relaxed">
                  {aw}
                </div>
              ))}

              {safetyAnalysis.criticalAlerts.map((ca, idx) => (
                <div key={`ca-${idx}`} className="p-3.5 sm:p-4 rounded-xl border bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-xs sm:text-sm font-semibold text-rose-800 dark:text-rose-200 leading-relaxed">
                  {ca}
                </div>
              ))}

              {safetyAnalysis.warnings.map((w, idx) => (
                <div key={`w-${idx}`} className="p-3.5 sm:p-4 rounded-xl border bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
                  {w}
                </div>
              ))}

              {safetyAnalysis.interactions.map((ddi) => (
                <div
                  key={ddi.id}
                  className={`p-3.5 sm:p-4 rounded-xl border ${
                    ddi.severity === "Contraindicated" || ddi.severity === "Major"
                      ? "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50"
                      : "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5" dir="ltr">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      ddi.severity === "Contraindicated" || ddi.severity === "Major"
                        ? "bg-rose-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      DDI • {ddi.severity}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-white">
                      {ddi.drugA} + {ddi.drugB}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{ddi.mechanism}</p>
                  <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-teal-600 dark:text-teal-400">{lang === 'ar' ? 'الإجراء السريري (Action Required): ' : 'Action Required: '}</span>
                    {ddi.actionRequired}
                  </div>
                </div>
              ))}

              {totalAlertsCount === 0 && (
                <div className="p-6 text-center bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/50 rounded-xl">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    {lang === 'ar' ? 'لا توجد تداخلات حرجة مرصودة (No High-Risk DRPs)' : 'No critical interactions detected'}
                  </p>
                </div>
              )}
            </div>

            {/* Renal Dosing Recommendations & High-Alert Drugs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {lang === 'ar'
                  ? `توصيات تعديل الجرعات الكلوية (Renal Dosing — CrCl: ${selectedPatient.labs.crcl || 'N/A'} mL/min)`
                  : `Renal Dosing Adjustments (CrCl: ${selectedPatient.labs.crcl || 'N/A'} mL/min)`}
              </h4>
              {safetyAnalysis.renalAdjustments.length > 0 ? (
                safetyAnalysis.renalAdjustments.map((adj, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/50">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5" dir="ltr">
                        <Pill className="h-4 w-4 text-blue-500 shrink-0" />
                        {adj.drug}
                      </span>
                      <span className="text-[11px] font-mono bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400" dir="ltr">
                        Current: {adj.currentDose}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-200 leading-relaxed">
                      {adj.recommendedAdjustment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl">
                  <Info className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {lang === 'ar' ? 'وظائف الكلى الحالية لا تتطلب تعديلاً فورياً للأدوية المسجلة.' : 'Current renal function does not require immediate dose adjustments for active meds.'}
                  </p>
                </div>
              )}

              {safetyAnalysis.highAlertDrugs.length > 0 && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/50">
                  <h5 className="text-xs font-extrabold text-purple-800 dark:text-purple-300 uppercase tracking-wider mb-2">
                    ISMP High-Alert Medications Active ({safetyAnalysis.highAlertDrugs.length})
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {safetyAnalysis.highAlertDrugs.map((had, idx) => (
                      <span key={idx} dir="ltr" className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {had}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Multi-Drug Custom Interaction Checker */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Search className="h-4 w-4 text-teal-500 shrink-0" />
          {lang === 'ar' ? 'فاحص التداخلات الدوائية المتعددة (Multi-Drug DDI & QTc Checker)' : 'Multi-Drug Clinical Interaction Checker'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {lang === 'ar' ? 'أدخل دواءين أو ثلاثة لفحص التداخلات الحركية (CYP450)، تطاول QTc، أو السمية الكلوية المشتركة (Nephrotoxicity).' : 'Enter 2 or 3 medications to check CYP450, QTc prolongation, or synergistic nephrotoxicity.'}
        </p>

        <datalist id="alert-drugs-list">
          {COMMON_DRUGS_EN.map((drug, idx) => (
            <option key={idx} value={drug} />
          ))}
        </datalist>

        <form onSubmit={checkCustomInteractions} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <input
              type="text"
              list="alert-drugs-list"
              dir="ltr"
              value={drug1}
              onChange={(e) => setDrug1(e.target.value)}
              placeholder="Drug 1 (e.g., Warfarin)"
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              required
            />
            {drug1 && (
              <button type="button" onClick={() => setDrug1("")} className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              list="alert-drugs-list"
              dir="ltr"
              value={drug2}
              onChange={(e) => setDrug2(e.target.value)}
              placeholder="Drug 2 (e.g., Amiodarone)"
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              required
            />
            {drug2 && (
              <button type="button" onClick={() => setDrug2("")} className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              list="alert-drugs-list"
              dir="ltr"
              value={drug3}
              onChange={(e) => setDrug3(e.target.value)}
              placeholder="Drug 3 (Optional, e.g., Aspirin)"
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
            {drug3 && (
              <button type="button" onClick={() => setDrug3("")} className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-slate-900 dark:bg-teal-600 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-teal-500 transition-colors cursor-pointer sm:col-span-2 md:col-span-1"
          >
            {lang === 'ar' ? 'فحص التداخلات (Check DDI)' : 'Check Interactions'}
          </button>
        </form>

        {/* Quick Preset Chips — Horizontally scrollable on Android */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs text-slate-400 shrink-0">{lang === 'ar' ? 'أمثلة سريعة:' : 'Quick presets:'}</span>
          <button
            type="button"
            onClick={() => { setDrug1("Vancomycin"); setDrug2("Piperacillin/Tazobactam"); setDrug3(""); }}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-600 transition-colors cursor-pointer shrink-0 font-mono"
            dir="ltr"
          >
            Vancomycin + Pip/Tazo
          </button>
          <button
            type="button"
            onClick={() => { setDrug1("Warfarin"); setDrug2("Amiodarone"); setDrug3("Aspirin"); }}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-600 transition-colors cursor-pointer shrink-0 font-mono"
            dir="ltr"
          >
            Warfarin + Amiodarone + Aspirin
          </button>
          <button
            type="button"
            onClick={() => { setDrug1("Lisinopril"); setDrug2("Sacubitril/Valsartan"); setDrug3(""); }}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-600 transition-colors cursor-pointer shrink-0 font-mono"
            dir="ltr"
          >
            Lisinopril + ARNI (Washout)
          </button>
        </div>

        {interactionResult && (
          <div className="mt-5 space-y-3">
            {interactionResult.map((res, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  res.severity === "Contraindicated" || res.severity === "Major"
                    ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50"
                    : res.severity === "Moderate"
                    ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50"
                    : "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2" dir="ltr">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      res.severity === "Contraindicated" || res.severity === "Major"
                        ? "bg-rose-600 text-white"
                        : res.severity === "Moderate"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-600 text-white"
                    }`}>
                      {res.severity}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{res.pair}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">{lang === 'ar' ? 'الآلية (Mechanism): ' : 'Mechanism: '}</strong>
                  {res.mechanism}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-teal-700 dark:text-teal-400">{lang === 'ar' ? 'التدبير السريري (Management): ' : 'Clinical Management: '}</strong>
                  {res.management}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

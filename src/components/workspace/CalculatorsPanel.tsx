import { useState } from 'react';
import { Language } from '../../types/clinical';
import {
  calculateCrCl,
  calculateVancomycinDosing,
  calculateChildPugh,
  convertOpioid,
  OPIOID_EQUIVALENTS
} from '../../lib/clinical-engine';
import { Calculator, Activity, Heart, ShieldAlert, Pill, Sparkles } from 'lucide-react';

interface Props {
  lang: Language;
}

export function CalculatorsPanel({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<
    'crcl' | 'vanco' | 'childpugh' | 'cha2ds2' | 'opioid' | 'correctedCa'
  >('crcl');

  // --- 1. CrCl State ---
  const [crclAge, setCrclAge] = useState<number>(68);
  const [crclWeight, setCrclWeight] = useState<number>(78);
  const [crclHeight, setCrclHeight] = useState<number>(172);
  const [crclGender, setCrclGender] = useState<'male' | 'female'>('male');
  const [crclScr, setCrclScr] = useState<number>(2.4);

  // --- 2. Vancomycin State ---
  const [vancoAge, setVancoAge] = useState<number>(68);
  const [vancoWeight, setVancoWeight] = useState<number>(78);
  const [vancoHeight] = useState<number>(172);
  const [vancoGender] = useState<'male' | 'female'>('male');
  const [vancoScr, setVancoScr] = useState<number>(2.4);
  const [vancoTargetAuc, setVancoTargetAuc] = useState<number>(450);

  // --- 3. Child-Pugh State ---
  const [cpBilirubin, setCpBilirubin] = useState<number>(2.8);
  const [cpAlbumin, setCpAlbumin] = useState<number>(2.9);
  const [cpInr, setCpInr] = useState<number>(1.6);
  const [cpAscites, setCpAscites] = useState<'none' | 'mild' | 'moderate_severe'>('mild');
  const [cpEnceph, setCpEnceph] = useState<'none' | 'grade_1_2' | 'grade_3_4'>('grade_1_2');

  // --- 4. CHA2DS2-VASc & HAS-BLED State ---
  const [chaAge, setChaAge] = useState<number>(72);
  const [chaFemale, setChaFemale] = useState<boolean>(false);
  const [chaChf, setChaChf] = useState<boolean>(true);
  const [chaHtn, setChaHtn] = useState<boolean>(true);
  const [chaStroke, setChaStroke] = useState<boolean>(false);
  const [chaVascular, setChaVascular] = useState<boolean>(true);
  const [chaDiabetes, setChaDiabetes] = useState<boolean>(true);

  // --- 5. Opioid Converter State ---
  const [fromOpioid, setFromOpioid] = useState<keyof typeof OPIOID_EQUIVALENTS>('Morphine_IV');
  const [fromOpioidDose, setFromOpioidDose] = useState<number>(20);
  const [toOpioid, setToOpioid] = useState<keyof typeof OPIOID_EQUIVALENTS>('Hydromorphone_IV');
  const [crossTolerance, setCrossTolerance] = useState<number>(25);

  // --- 6. Corrected Calcium State ---
  const [measuredCa, setMeasuredCa] = useState<number>(7.8);
  const [serumAlbumin, setSerumAlbumin] = useState<number>(2.2);

  // Results
  const crclResult = calculateCrCl(crclAge, crclWeight, crclHeight, crclGender, crclScr);
  const vancoResult = calculateVancomycinDosing(
    vancoAge,
    vancoWeight,
    vancoHeight,
    vancoGender,
    vancoScr,
    vancoTargetAuc
  );
  const childPughResult = calculateChildPugh(cpBilirubin, cpAlbumin, cpInr, cpAscites, cpEnceph);
  const opioidResult = convertOpioid(fromOpioid, fromOpioidDose, toOpioid, crossTolerance);

  // Calculate CHA2DS2 score
  let chaScore = 0;
  if (chaChf) chaScore += 1;
  if (chaHtn) chaScore += 1;
  if (chaAge >= 75) chaScore += 2;
  else if (chaAge >= 65) chaScore += 1;
  if (chaDiabetes) chaScore += 1;
  if (chaStroke) chaScore += 2;
  if (chaVascular) chaScore += 1;
  if (chaFemale) chaScore += 1;

  // Corrected Calcium = Measured Ca + 0.8 * (4.0 - Albumin)
  const correctedCalcium = Math.round((measuredCa + 0.8 * (4.0 - serumAlbumin)) * 100) / 100;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-800 via-teal-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-teal-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-400/30 shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">
              {lang === 'ar'
                ? 'الحاسبات الإكلينيكية & Clinical Pharmacokinetics (PK / TDM)'
                : 'Clinical Pharmacokinetics & Dosing Calculators'}
            </h2>
            <p className="text-teal-100/80 text-xs mt-1">
              {lang === 'ar'
                ? 'حسابات دقيقة لـ Cockcroft-Gault CrCl، و Vancomycin AUC24/MIC TDM، وتصنيف Child-Pugh، و Opioid Equianalgesic Conversion.'
                : 'Evidence-based algorithms for renal adjustments, hepatic grading, Vancomycin AUC24/MIC targets, and equianalgesia.'}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Tabs on Android Mobile */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5 -mx-1 px-1">
        <button
          onClick={() => setActiveTab('crcl')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'crcl'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4 shrink-0" />
          <span>Cockcroft-Gault CrCl</span>
        </button>

        <button
          onClick={() => setActiveTab('vanco')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'vanco'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Pill className="w-4 h-4 shrink-0" />
          <span>Vancomycin AUC24/MIC</span>
        </button>

        <button
          onClick={() => setActiveTab('childpugh')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'childpugh'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Child-Pugh Score</span>
        </button>

        <button
          onClick={() => setActiveTab('cha2ds2')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'cha2ds2'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4 shrink-0" />
          <span>CHA₂DS₂-VASc</span>
        </button>

        <button
          onClick={() => setActiveTab('opioid')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'opioid'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Opioid Equianalgesia (MME)</span>
        </button>

        <button
          onClick={() => setActiveTab('correctedCa')}
          className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition ${
            activeTab === 'correctedCa'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4 shrink-0" />
          <span>Corrected Calcium</span>
        </button>
      </div>

      {/* 1. CrCl Calculator */}
      {activeTab === 'crcl' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Cockcroft-Gault Creatinine Clearance (CrCl) Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Age (Years)</label>
                <input
                  type="number"
                  value={crclAge}
                  onChange={e => setCrclAge(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Biological Sex</label>
                <select
                  value={crclGender}
                  onChange={e => setCrclGender(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                >
                  <option value="male">{lang === 'ar' ? 'Male (ذكر)' : 'Male'}</option>
                  <option value="female">{lang === 'ar' ? 'Female (أنثى × 0.85)' : 'Female (×0.85)'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Actual Body Weight (TBW kg)
                </label>
                <input
                  type="number"
                  value={crclWeight}
                  onChange={e => setCrclWeight(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Height (cm)</label>
                <input
                  type="number"
                  value={crclHeight}
                  onChange={e => setCrclHeight(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Serum Creatinine (SCr mg/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={crclScr}
                  onChange={e => setCrclScr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm"
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <p>
                • Ideal Body Weight (IBW): <strong className="text-teal-600">{crclResult.ibw} kg</strong>
              </p>
              <p>
                • Dosing Weight Applied:{' '}
                <strong>
                  {crclResult.dosingWeightUsed} kg ({crclResult.weightType})
                </strong>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-teal-600/40">
            <div>
              <span className="text-xs text-teal-300 font-semibold tracking-wide uppercase block mb-1">
                Estimated Cockcroft-Gault CrCl
              </span>
              <div dir="ltr" className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">{crclResult.crcl}</span>
                <span className="text-teal-300 text-sm font-semibold">mL/min</span>
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  crclResult.crcl < 15
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : crclResult.crcl < 30
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    : crclResult.crcl < 60
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {crclResult.crcl < 15
                  ? 'Kidney Failure / ESRD (CrCl < 15 mL/min)'
                  : crclResult.crcl < 30
                  ? 'Severe Renal Impairment (CrCl 15–29 mL/min)'
                  : crclResult.crcl < 60
                  ? 'Moderate Renal Impairment (CrCl 30–59 mL/min)'
                  : 'Normal / Mild Renal Function (CrCl >= 60 mL/min)'}
              </div>

              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-teal-200">Renal Dosing Cutoffs (DiPiro / ACCP 2026):</div>
                <div dir="ltr" className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]">
                  <p>
                    • <strong>Meropenem IV:</strong>{' '}
                    {crclResult.crcl < 30
                      ? '500 mg IV q12h (3h Extended Infusion)'
                      : crclResult.crcl < 50
                      ? '1000 mg IV q12h'
                      : '1000 mg IV q8h'}
                  </p>
                  <p>
                    • <strong>Enoxaparin (VTE Prophylaxis):</strong>{' '}
                    {crclResult.crcl < 30 ? '30 mg SC q24h (or UFH SC)' : '40 mg SC q24h'}
                  </p>
                  <p>
                    • <strong>Cefepime IV:</strong>{' '}
                    {crclResult.crcl < 30 ? '1 g IV q24h' : crclResult.crcl < 50 ? '2 g IV q12-24h' : '2 g IV q8h'}
                  </p>
                  <p>
                    • <strong>Metformin:</strong>{' '}
                    {crclResult.crcl < 30 ? 'CONTRAINDICATED (Lactic Acidosis Risk)' : 'Monitor eGFR'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Vancomycin AUC/MIC */}
      {activeTab === 'vanco' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Vancomycin Individualized PK & AUC24/MIC Parameters (ASHP/IDSA 2026)
            </h3>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Age (Years)</label>
                <input
                  type="number"
                  value={vancoAge}
                  onChange={e => setVancoAge(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Total Body Weight (kg)</label>
                <input
                  type="number"
                  value={vancoWeight}
                  onChange={e => setVancoWeight(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Serum Creatinine (SCr mg/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={vancoScr}
                  onChange={e => setVancoScr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Target AUC24/MIC (400–600 mg·h/L)
                </label>
                <input
                  type="number"
                  value={vancoTargetAuc}
                  onChange={e => setVancoTargetAuc(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-teal-500/40">
            <div>
              <span className="text-xs text-indigo-300 font-semibold tracking-wide uppercase block mb-1">
                Empirical Maintenance Regimen
              </span>
              <div dir="ltr" className="text-xl sm:text-2xl font-bold text-teal-300 mb-3">
                {vancoResult.recommendedRegimen}
              </div>

              <div dir="ltr" className="space-y-2 text-xs text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between">
                  <span>Estimated CrCl:</span>
                  <span className="font-mono font-bold text-white">{vancoResult.crcl} mL/min</span>
                </div>
                <div className="flex justify-between">
                  <span>Elimination Half-Life (t½):</span>
                  <span className="font-mono text-white">{vancoResult.halfLife} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Vancomycin Clearance (CL):</span>
                  <span className="font-mono text-white">{vancoResult.clearanceLHr} L/hr</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-teal-300">
                  <span>Predicted Steady-State AUC24:</span>
                  <span className="font-mono">{vancoResult.estimatedAUC} mg·h/L</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200">
                <strong>TDM Protocol:</strong>{' '}
                {lang === 'ar'
                  ? `استخدم Bayesian Two-Point Kinetics (Peak + Trough) أو اسحب Pre-dose Trough قبل الجرعة الرابعة (${vancoResult.troughRangeGoal}).`
                  : `Use Bayesian 2-point sampling or draw steady-state trough 30 min prior to 4th dose (${vancoResult.troughRangeGoal}).`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Child-Pugh Hepatic Score */}
      {activeTab === 'childpugh' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Child-Pugh Hepatic Cirrhosis Staging Criteria
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Bilirubin (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cpBilirubin}
                  onChange={e => setCpBilirubin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Albumin (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cpAlbumin}
                  onChange={e => setCpAlbumin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">INR</label>
                <input
                  type="number"
                  step="0.1"
                  value={cpInr}
                  onChange={e => setCpInr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ascites</label>
                <select
                  value={cpAscites}
                  onChange={e => setCpAscites(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="none">None (+1 pt)</option>
                  <option value="mild">Mild / Diuretic-Controlled (+2 pts)</option>
                  <option value="moderate_severe">Moderate-to-Severe / Refractory (+3 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Hepatic Encephalopathy (West Haven)
                </label>
                <select
                  value={cpEnceph}
                  onChange={e => setCpEnceph(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="none">None (+1 pt)</option>
                  <option value="grade_1_2">Grade I–II (+2 pts)</option>
                  <option value="grade_3_4">Grade III–IV (+3 pts)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-amber-500/40">
            <div>
              <span className="text-xs text-amber-300 font-semibold tracking-wide uppercase block mb-1">
                Child-Pugh Classification
              </span>
              <div dir="ltr" className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">{childPughResult.score}</span>
                <span className="text-xl font-bold text-white">Class {childPughResult.classGrade}</span>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 mb-4">
                <strong>{childPughResult.mortality1Year}</strong>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-bold text-amber-300">Hepatic Pharmacokinetic Dosing Guidance:</div>
                <p className="text-[11px] leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  {childPughResult.doseRecommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CHA2DS2-VASc */}
      {activeTab === 'cha2ds2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              CHA₂DS₂-VASc Thromboembolic Risk Score in Atrial Fibrillation (AFib)
            </h3>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaChf}
                  onChange={e => setChaChf(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  C: Congestive Heart Failure / HFrEF (+1)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaHtn}
                  onChange={e => setChaHtn(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">H: Hypertension (+1)</span>
              </label>

              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <span className="font-medium text-slate-800 dark:text-slate-200">A: Age Bracket:</span>
                <select
                  value={chaAge}
                  onChange={e => setChaAge(Number(e.target.value))}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                >
                  <option value={55}>&lt; 65 years (+0)</option>
                  <option value={68}>65–74 years (+1)</option>
                  <option value={78}>&gt;= 75 years (+2)</option>
                </select>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaDiabetes}
                  onChange={e => setChaDiabetes(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">D: Diabetes Mellitus (+1)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaStroke}
                  onChange={e => setChaStroke(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  S₂: Prior Stroke / TIA / Systemic Thromboembolism (+2)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaVascular}
                  onChange={e => setChaVascular(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  V: Vascular Disease (Prior MI, PAD, Aortic Plaque) (+1)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaFemale}
                  onChange={e => setChaFemale(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">Sc: Sex Category (Female) (+1)</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-rose-500/40">
            <div>
              <span className="text-xs text-rose-300 font-semibold tracking-wide uppercase block mb-1">
                CHA₂DS₂-VASc Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-rose-400 font-mono mb-3">{chaScore}</div>

              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-200 mb-4">
                {chaScore >= 2 ? (
                  <p className="font-bold">
                    {lang === 'ar'
                      ? '⚠️ High Stroke Risk: يوصى بـ Oral Anticoagulation (Class I) مع تفضيل DOACs (Apixaban / Rivaroxaban) على Warfarin إلا في حال Mechanical Valve أو Moderate-Severe Mitral Stenosis.'
                      : 'High Stroke Risk: Oral anticoagulation strongly recommended (DOAC preferred over Warfarin).'}
                  </p>
                ) : chaScore === 1 ? (
                  <p>Intermediate Risk: Consider Oral Anticoagulation based on individual patient risk-benefit.</p>
                ) : (
                  <p>Low Risk: No antithrombotic therapy required.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Opioid Converter */}
      {activeTab === 'opioid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Opioid Equianalgesic Dosing & Cross-Tolerance Calculator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Current Opioid:</label>
                <select
                  value={fromOpioid}
                  onChange={e => setFromOpioid(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value="Morphine_IV">Morphine IV (mg)</option>
                  <option value="Morphine_Oral">Morphine Oral (mg)</option>
                  <option value="Hydromorphone_IV">Hydromorphone IV (mg)</option>
                  <option value="Hydromorphone_Oral">Hydromorphone Oral (mg)</option>
                  <option value="Fentanyl_IV_mcg">Fentanyl IV (mcg)</option>
                  <option value="Oxycodone_Oral">Oxycodone Oral (mg)</option>
                  <option value="Tramadol_Oral">Tramadol Oral (mg)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Total 24h Dose:</label>
                <input
                  type="number"
                  value={fromOpioidDose}
                  onChange={e => setFromOpioidDose(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Target Opioid:</label>
                <select
                  value={toOpioid}
                  onChange={e => setToOpioid(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value="Hydromorphone_IV">Hydromorphone IV (mg)</option>
                  <option value="Hydromorphone_Oral">Hydromorphone Oral (mg)</option>
                  <option value="Morphine_IV">Morphine IV (mg)</option>
                  <option value="Morphine_Oral">Morphine Oral (mg)</option>
                  <option value="Fentanyl_IV_mcg">Fentanyl IV (mcg)</option>
                  <option value="Oxycodone_Oral">Oxycodone Oral (mg)</option>
                  <option value="Tramadol_Oral">Tramadol Oral (mg)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Incomplete Cross-Tolerance Reduction (%)
                </label>
                <select
                  value={crossTolerance}
                  onChange={e => setCrossTolerance(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value={25}>25% Reduction (Standard Opioid Rotation)</option>
                  <option value={33}>33% Reduction (Elderly / Renal / Frail)</option>
                  <option value={50}>50% Reduction (High MME / Controlled Pain)</option>
                  <option value={0}>0% (Direct Equianalgesic Ratio)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-purple-500/40">
            <div>
              <span className="text-xs text-purple-300 font-semibold tracking-wide uppercase block mb-1">
                Adjusted Equianalgesic 24h Dose
              </span>
              <div dir="ltr" className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-purple-300 font-mono">
                  {opioidResult.adjustedForTolerance}
                </span>
                <span className="text-xs text-slate-300">{toOpioid.includes('mcg') ? 'mcg/24h' : 'mg/24h'}</span>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                (Unadjusted 1:1 Equianalgesic Equivalent: {opioidResult.equivalentDose})
              </p>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200">
                <strong>ISMP High-Alert Safety:</strong> راقب Respiratory Rate و Sedation Scale، مع توفر{' '}
                <strong>Naloxone IV</strong> في الجناح وتجنب Morphine في حالات CrCl &lt; 30 mL/min لتراكم المستقلب الفعال
                M6G.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Corrected Calcium */}
      {activeTab === 'correctedCa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Albumin-Corrected Serum Calcium (Payne Formula)
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Measured Total Calcium (mg/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={measuredCa}
                  onChange={e => setMeasuredCa(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Serum Albumin (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={serumAlbumin}
                  onChange={e => setSerumAlbumin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>

            <p dir="ltr" className="text-[11px] font-mono text-slate-500">
              Formula: Corrected Ca = Measured Ca + 0.8 × (4.0 - Serum Albumin)
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-emerald-500/40">
            <div>
              <span className="text-xs text-emerald-300 font-semibold tracking-wide uppercase block mb-1">
                Albumin-Corrected Calcium
              </span>
              <div dir="ltr" className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-300 font-mono">{correctedCalcium}</span>
                <span className="text-xs text-slate-300">mg/dL</span>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-200">
                {correctedCalcium < 8.5 ? (
                  <p>
                    ⚠️ True Hypocalcemia (&lt; 8.5 mg/dL): تحقق من Ionized Calcium و Serum Magnesium وأعراض Tetany / QTc
                    Prolongation.
                  </p>
                ) : correctedCalcium > 10.5 ? (
                  <p>⚠️ Hypercalcemia (&gt; 10.5 mg/dL): قيّم Hydration Status (IV 0.9% NaCl) ومسببات الارتفاع.</p>
                ) : (
                  <p>✓ Normocalcemia (8.5–10.5 mg/dL) بعد التصحيح لـ Hypoalbuminemia.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

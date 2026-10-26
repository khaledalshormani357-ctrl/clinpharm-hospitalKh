import { useState } from 'react';
import { Language } from '../../types/clinical';
import {
  calculateCrCl,
  calculateVancomycinDosing,
  calculateChildPugh,
  convertOpioid,
  OPIOID_EQUIVALENTS
} from '../../lib/clinical-engine';
import {
  PEDIATRIC_DRUG_FORMULARY,
  calculatePediatricDrugDose,
  calculateHollidaySegarFluids,
  calculatePediatricRenalAndPals,
  calculateMeldNa,
  calculateWinterTozerPhenytoin,
  calculateSodiumAndFreeWater,
  calculateAnionGapAndAcidBase,
  calculateQtcIntervals,
  convertCorticosteroid,
  CORTICOSTEROID_EQUIVALENTS,
  CorticosteroidName
} from '../../lib/dynamedexAndPedsCalculators';
import { printOrSaveClinicalPdf } from '../../lib/androidPermissions';
import {
  Calculator,
  Activity,
  Heart,
  ShieldAlert,
  Pill,
  Sparkles,
  Baby,
  Droplets,
  Stethoscope,
  Flame,
  Scale,
  Zap,
  Printer,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface Props {
  lang: Language;
}

type CalculatorTabId =
  | 'peds_dosing'
  | 'peds_fluids_pals'
  | 'crcl'
  | 'vanco'
  | 'phenytoin_tdm'
  | 'sodium_freewater'
  | 'anion_gap'
  | 'correctedCa'
  | 'cha2ds2'
  | 'wells_curb_qsofa'
  | 'qtc_calc'
  | 'meld_na'
  | 'childpugh'
  | 'steroid_conv'
  | 'opioid';

export function CalculatorsPanel({ lang }: Props) {
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'pediatrics' | 'pk_renal_electrolytes' | 'cardio_icu_hepatic' | 'converters'
  >('all');
  const [activeTab, setActiveTab] = useState<CalculatorTabId>('peds_dosing');

  // --- A. Pediatric Drug Dosing State ---
  const [pedsDrugId, setPedsDrugId] = useState<string>(PEDIATRIC_DRUG_FORMULARY[0].id);
  const [pedsWeightKg, setPedsWeightKg] = useState<number>(14);
  const [pedsAgeYears, setPedsAgeYears] = useState<number>(3);
  const [pedsCustomMgKg, setPedsCustomMgKg] = useState<number | undefined>(undefined);
  const [pedsConcIdx, setPedsConcIdx] = useState<number>(0);
  const [pedsCategoryFilter, setPedsCategoryFilter] = useState<string>('all');

  // --- B. Pediatric Fluids (Holliday-Segar), Schwartz eGFR & PALS State ---
  const [pedsFluidWeight, setPedsFluidWeight] = useState<number>(16);
  const [pedsDehydrationPct, setPedsDehydrationPct] = useState<number>(5);
  const [pedsHeightCm, setPedsHeightCm] = useState<number>(96);
  const [pedsScr, setPedsScr] = useState<number>(0.45);
  const [pedsKFactor, setPedsKFactor] = useState<number>(0.413);

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
  // HAS-BLED extras
  const [hbRenalOrLiver, setHbRenalOrLiver] = useState<boolean>(true);
  const [hbBleedingHistory, setHbBleedingHistory] = useState<boolean>(false);
  const [hbLabileInr, setHbLabileInr] = useState<boolean>(false);
  const [hbDrugsOrAlcohol, setHbDrugsOrAlcohol] = useState<boolean>(true);

  // --- 5. Opioid Converter State ---
  const [fromOpioid, setFromOpioid] = useState<keyof typeof OPIOID_EQUIVALENTS>('Morphine_IV');
  const [fromOpioidDose, setFromOpioidDose] = useState<number>(20);
  const [toOpioid, setToOpioid] = useState<keyof typeof OPIOID_EQUIVALENTS>('Hydromorphone_IV');
  const [crossTolerance, setCrossTolerance] = useState<number>(25);

  // --- 6. Corrected Calcium State ---
  const [measuredCa, setMeasuredCa] = useState<number>(7.8);
  const [serumAlbumin, setSerumAlbumin] = useState<number>(2.2);

  // --- 7. Phenytoin Winter-Tozer State ---
  const [phenytoinMeasured, setPhenytoinMeasured] = useState<number>(7.5);
  const [phenytoinAlbumin, setPhenytoinAlbumin] = useState<number>(2.1);
  const [phenytoinEsrd, setPhenytoinEsrd] = useState<boolean>(false);

  // --- 8. Sodium Hyperglycemia & Free Water Deficit State ---
  const [naMeasured, setNaMeasured] = useState<number>(128);
  const [glucoseMgDl, setGlucoseMgDl] = useState<number>(580);
  const [naWeightKg, setNaWeightKg] = useState<number>(75);
  const [naAgeCategory, setNaAgeCategory] = useState<
    'adult_male' | 'adult_female' | 'elderly_male' | 'elderly_female' | 'child'
  >('adult_male');
  const [hyperNaMeasured, setHyperNaMeasured] = useState<number>(158);

  // --- 9. Anion Gap & Delta Ratio State ---
  const [agNa, setAgNa] = useState<number>(138);
  const [agCl, setAgCl] = useState<number>(100);
  const [agHco3, setAgHco3] = useState<number>(12);
  const [agAlbumin, setAgAlbumin] = useState<number>(2.6);
  const [agPaco2, setAgPaco2] = useState<number>(26);

  // --- 10. QTc Calculator State ---
  const [qtMs, setQtMs] = useState<number>(440);
  const [hrBpm, setHrBpm] = useState<number>(88);
  const [qrsMs, setQrsMs] = useState<number>(96);

  // --- 11. MELD-Na State ---
  const [meldBili, setMeldBili] = useState<number>(3.4);
  const [meldInr, setMeldInr] = useState<number>(1.9);
  const [meldCr, setMeldCr] = useState<number>(2.1);
  const [meldNa, setMeldNa] = useState<number>(129);
  const [meldDialysis, setMeldDialysis] = useState<boolean>(false);

  // --- 12. CURB-65, qSOFA, Wells PE & Heparin Nomogram State ---
  const [curbConfusion, setCurbConfusion] = useState<boolean>(true);
  const [curbBunGt19, setCurbBunGt19] = useState<boolean>(true);
  const [curbRrGe30, setCurbRrGe30] = useState<boolean>(false);
  const [curbLowBp, setCurbLowBp] = useState<boolean>(false);
  const [curbAgeGe65, setCurbAgeGe65] = useState<boolean>(true);

  const [wellsDvtSigns, setWellsDvtSigns] = useState<boolean>(true);
  const [wellsPeLikely, setWellsPeLikely] = useState<boolean>(true);
  const [wellsHrGt100, setWellsHrGt100] = useState<boolean>(true);
  const [wellsImmobilization, setWellsImmobilization] = useState<boolean>(false);
  const [wellsPriorVte, setWellsPriorVte] = useState<boolean>(false);
  const [wellsHemoptysis, setWellsHemoptysis] = useState<boolean>(false);
  const [wellsMalignancy, setWellsMalignancy] = useState<boolean>(false);

  const [heparinWeightKg, setHeparinWeightKg] = useState<number>(80);
  const [heparinProtocol, setHeparinProtocol] = useState<'vte_pe' | 'acs_afib'>('vte_pe');

  // --- 13. Corticosteroid Converter State ---
  const [fromSteroid, setFromSteroid] = useState<CorticosteroidName>('Prednisone');
  const [fromSteroidDose, setFromSteroidDose] = useState<number>(40);
  const [toSteroid, setToSteroid] = useState<CorticosteroidName>('Methylprednisolone');

  // --- Computed Results ---
  const pedsDoseResult = calculatePediatricDrugDose(
    pedsDrugId,
    pedsWeightKg,
    pedsCustomMgKg,
    pedsConcIdx
  );
  const pedsFluidsResult = calculateHollidaySegarFluids(pedsFluidWeight, pedsDehydrationPct);
  const pedsRenalPalsResult = calculatePediatricRenalAndPals(
    pedsAgeYears,
    pedsFluidWeight,
    pedsHeightCm,
    pedsScr,
    pedsKFactor
  );

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
  const phenytoinResult = calculateWinterTozerPhenytoin(
    phenytoinMeasured,
    phenytoinAlbumin,
    phenytoinEsrd
  );
  const naCorrectionResult = calculateSodiumAndFreeWater(
    naMeasured,
    glucoseMgDl,
    naWeightKg,
    naAgeCategory
  );
  const hyperNaDeficitResult = calculateSodiumAndFreeWater(
    hyperNaMeasured,
    100,
    naWeightKg,
    naAgeCategory
  );
  const agResult = calculateAnionGapAndAcidBase(agNa, agCl, agHco3, agAlbumin, agPaco2);
  const qtcResult = calculateQtcIntervals(qtMs, hrBpm, qrsMs);
  const meldResult = calculateMeldNa(meldBili, meldInr, meldCr, meldNa, meldDialysis);
  const steroidResult = convertCorticosteroid(fromSteroid, fromSteroidDose, toSteroid);

  // CHA2DS2-VASc & HAS-BLED
  let chaScore = 0;
  if (chaChf) chaScore += 1;
  if (chaHtn) chaScore += 1;
  if (chaAge >= 75) chaScore += 2;
  else if (chaAge >= 65) chaScore += 1;
  if (chaDiabetes) chaScore += 1;
  if (chaStroke) chaScore += 2;
  if (chaVascular) chaScore += 1;
  if (chaFemale) chaScore += 1;

  let hasBledScore = 0;
  if (chaHtn) hasBledScore += 1;
  if (hbRenalOrLiver) hasBledScore += 1;
  if (chaStroke) hasBledScore += 1;
  if (hbBleedingHistory) hasBledScore += 1;
  if (hbLabileInr) hasBledScore += 1;
  if (chaAge > 65) hasBledScore += 1;
  if (hbDrugsOrAlcohol) hasBledScore += 1;

  // CURB-65 & Wells PE
  const curb65Score =
    (curbConfusion ? 1 : 0) +
    (curbBunGt19 ? 1 : 0) +
    (curbRrGe30 ? 1 : 0) +
    (curbLowBp ? 1 : 0) +
    (curbAgeGe65 ? 1 : 0);

  const wellsPeScore =
    (wellsDvtSigns ? 3.0 : 0) +
    (wellsPeLikely ? 3.0 : 0) +
    (wellsHrGt100 ? 1.5 : 0) +
    (wellsImmobilization ? 1.5 : 0) +
    (wellsPriorVte ? 1.5 : 0) +
    (wellsHemoptysis ? 1.0 : 0) +
    (wellsMalignancy ? 1.0 : 0);

  // Heparin Weight-Based Protocol
  const ufhBolusUnits =
    heparinProtocol === 'vte_pe'
      ? Math.min(10000, Math.round(heparinWeightKg * 80))
      : Math.min(4000, Math.round(heparinWeightKg * 60));
  const ufhInfusionUnitsHr =
    heparinProtocol === 'vte_pe'
      ? Math.round(heparinWeightKg * 18)
      : Math.min(1000, Math.round(heparinWeightKg * 12));

  // Corrected Calcium = Measured Ca + 0.8 * (4.0 - Albumin)
  const correctedCalcium = Math.round((measuredCa + 0.8 * (4.0 - serumAlbumin)) * 100) / 100;

  const calculatorTabs: {
    id: CalculatorTabId;
    category: 'pediatrics' | 'pk_renal_electrolytes' | 'cardio_icu_hepatic' | 'converters';
    labelAr: string;
    labelEn: string;
    icon: any;
    badge?: string;
  }[] = [
    {
      id: 'peds_dosing',
      category: 'pediatrics',
      labelAr: 'حاسبة جرعات أدوية الأطفال (Pediatric Dosing)',
      labelEn: 'Pediatric Drug Dosing (mg/kg & mL)',
      icon: Baby,
      badge: '14 Drugs'
    },
    {
      id: 'peds_fluids_pals',
      category: 'pediatrics',
      labelAr: 'سوائل الأطفال (4-2-1) + Schwartz eGFR + PALS',
      labelEn: 'Peds Fluids (4-2-1), Schwartz & PALS',
      icon: Droplets,
      badge: 'Peds ICU'
    },
    {
      id: 'crcl',
      category: 'pk_renal_electrolytes',
      labelAr: 'Cockcroft-Gault CrCl & Renal',
      labelEn: 'Cockcroft-Gault CrCl',
      icon: Activity
    },
    {
      id: 'vanco',
      category: 'pk_renal_electrolytes',
      labelAr: 'Vancomycin AUC24/MIC TDM',
      labelEn: 'Vancomycin AUC24/MIC',
      icon: Pill
    },
    {
      id: 'phenytoin_tdm',
      category: 'pk_renal_electrolytes',
      labelAr: 'Phenytoin (Winter-Tozer TDM)',
      labelEn: 'Winter-Tozer Phenytoin',
      icon: Zap,
      badge: 'DynaMedex'
    },
    {
      id: 'sodium_freewater',
      category: 'pk_renal_electrolytes',
      labelAr: 'تصحيح الصوديوم (DKA) وعجز الماء الحر',
      labelEn: 'Corrected Na+ & Free Water Deficit',
      icon: Droplets,
      badge: 'DynaMedex'
    },
    {
      id: 'anion_gap',
      category: 'pk_renal_electrolytes',
      labelAr: 'Anion Gap & Delta Ratio + Winter’s',
      labelEn: 'Anion Gap & Delta Ratio',
      icon: Flame,
      badge: 'DynaMedex'
    },
    {
      id: 'correctedCa',
      category: 'pk_renal_electrolytes',
      labelAr: 'الكالسيوم المصحح للألبومين (Payne)',
      labelEn: 'Corrected Calcium',
      icon: Activity
    },
    {
      id: 'cha2ds2',
      category: 'cardio_icu_hepatic',
      labelAr: 'CHA₂DS₂-VASc & HAS-BLED',
      labelEn: 'CHA₂DS₂-VASc & HAS-BLED',
      icon: Heart,
      badge: 'DynaMedex'
    },
    {
      id: 'wells_curb_qsofa',
      category: 'cardio_icu_hepatic',
      labelAr: 'CURB-65 + Wells PE + بروتوكول الهيبارين',
      labelEn: 'CURB-65, Wells PE & Heparin IV',
      icon: Stethoscope,
      badge: 'DynaMedex'
    },
    {
      id: 'qtc_calc',
      category: 'cardio_icu_hepatic',
      labelAr: 'حاسبة QTc (Bazett / Fridericia)',
      labelEn: 'QTc Interval (Bazett/Fridericia)',
      icon: Heart,
      badge: 'DynaMedex'
    },
    {
      id: 'meld_na',
      category: 'cardio_icu_hepatic',
      labelAr: 'MELD-Na الكبدي (UNOS/OPTN)',
      labelEn: 'MELD-Na Liver Score',
      icon: ShieldAlert,
      badge: 'DynaMedex'
    },
    {
      id: 'childpugh',
      category: 'cardio_icu_hepatic',
      labelAr: 'Child-Pugh Cirrhosis Score',
      labelEn: 'Child-Pugh Score',
      icon: ShieldAlert
    },
    {
      id: 'steroid_conv',
      category: 'converters',
      labelAr: 'محول الكورتيكوستيرويدات (Steroid Converter)',
      labelEn: 'Corticosteroid Converter',
      icon: Scale,
      badge: 'DynaMedex'
    },
    {
      id: 'opioid',
      category: 'converters',
      labelAr: 'محول المسكنات الأفيونية (Opioid MME)',
      labelEn: 'Opioid Equianalgesia (MME)',
      icon: Sparkles
    }
  ];

  const visibleTabs = calculatorTabs.filter(
    t => categoryFilter === 'all' || t.category === categoryFilter
  );

  const filteredPediatricDrugs = PEDIATRIC_DRUG_FORMULARY.filter(
    d => pedsCategoryFilter === 'all' || d.category === pedsCategoryFilter
  );

  const handlePrintCurrentCalculations = () => {
    const summaryLines = [
      `# ClinPharm Hospital — Clinical & Pediatric Calculators Summary`,
      `- **Pediatric Drug Selected:** ${pedsDoseResult.drug.name} (${pedsDoseResult.weightKg} kg) -> ${pedsDoseResult.cappedSingleDoseMg} mg/dose (${pedsDoseResult.volumePerDoseMl} mL) ${pedsDoseResult.drug.frequencyLabel}`,
      `- **Pediatric Holliday-Segar Fluids (${pedsFluidWeight} kg):** ${pedsFluidsResult.hourlyMaintenanceMlHr} mL/hr (${pedsFluidsResult.dailyMaintenanceMl24h} mL/24h) | Schwartz eGFR: ${pedsRenalPalsResult.schwartzEgfr} mL/min/1.73m2`,
      `- **Adult Cockcroft-Gault CrCl:** ${crclResult.crcl} mL/min (IBW: ${crclResult.ibw} kg)`,
      `- **Vancomycin Regimen:** ${vancoResult.recommendedRegimen} (Predicted AUC24: ${vancoResult.estimatedAUC} mg·h/L)`,
      `- **Winter-Tozer Corrected Phenytoin:** ${phenytoinResult.correctedPhenytoin} mcg/mL (Free: ${phenytoinResult.estimatedFreePhenytoin} mcg/mL)`,
      `- **Corrected Na+ (Katz/Hillier):** ${naCorrectionResult.katzCorrectedNa} / ${naCorrectionResult.hillierCorrectedNa} mEq/L | Free Water Deficit: ${hyperNaDeficitResult.freeWaterDeficitLiters} L`,
      `- **Anion Gap (Albumin-Corrected):** ${agResult.correctedAnionGap} mEq/L (Delta Ratio: ${agResult.deltaRatio})`,
      `- **MELD-Na Score:** ${meldResult.meldNaScore} (${meldResult.mortality90Day}) | Child-Pugh: ${childPughResult.score} (Class ${childPughResult.classGrade})`,
      `- **QTc (Fridericia / Bazett):** ${qtcResult.fridericiaMs} ms / ${qtcResult.bazettMs} ms`
    ];
    printOrSaveClinicalPdf({
      title:
        lang === 'ar'
          ? 'تقرير الحاسبات السريرية وحاسبات جرعات الأطفال و DynaMedex'
          : 'Pediatric Dosing & DynaMedex Clinical Calculators Report',
      subtitle: 'ClinPharm Hospital • Evidence-Based PK, Pediatric & DynaMedex Equations',
      bodyMarkdownOrText: summaryLines.join('\n\n'),
      filenameBase: 'clinpharm-peds-dynamedex-calculators',
      dir: 'ltr'
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-teal-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-400/30 shrink-0">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black">
                  {lang === 'ar'
                    ? 'موسوعة الحاسبات الطبية: جرعات الأطفال + حاسبات DynaMedex & PK/TDM'
                    : 'Comprehensive Pediatric Drug Dosing & DynaMedex Clinical Calculators'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {lang === 'ar'
                    ? '15 حاسبة تخصصية + 14 دواء أطفال'
                    : '15 Calculators + 14 Peds Drugs'}
                </span>
              </div>
              <p className="text-teal-100/80 text-xs mt-1">
                {lang === 'ar'
                  ? 'يشمل حاسبات جرعات أدوية الأطفال بالمليغرام والمليلتر (Harriet Lane / BNFc)، سوائل Holliday-Segar، معادلة Schwartz، وجميع حاسبات موقع DynaMedex المعتمدة.'
                  : 'Complete pediatric weight-based suspension/IV dosing (mg & mL), Holliday-Segar fluids, Schwartz eGFR, PALS resuscitation, and DynaMedex clinical calculators.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrintCurrentCalculations}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4 text-teal-300" />
            <span>
              {lang === 'ar' ? 'طباعة / حفظ التقرير PDF' : 'Print / Save PDF'}
            </span>
          </button>
        </div>

        {/* Category Suite Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-4 border-t border-white/10 text-xs">
          {(
            [
              {
                key: 'all',
                ar: 'جميع الحاسبات (All 15 Calculators)',
                en: 'All Calculators (15)'
              },
              {
                key: 'pediatrics',
                ar: 'حاسبات جرعات وسوائل وإنعاش الأطفال (Pediatrics & PALS)',
                en: 'Pediatric Drug Dosing, Fluids & PALS'
              },
              {
                key: 'pk_renal_electrolytes',
                ar: 'الكلى والشوارد و TDM (DynaMedex Renal/Electrolytes/PK)',
                en: 'DynaMedex Renal, Electrolytes & TDM'
              },
              {
                key: 'cardio_icu_hepatic',
                ar: 'القلب والعناية المركزة والكبد (DynaMedex Cardio/ICU/Liver)',
                en: 'DynaMedex Cardio, ICU & Hepatology'
              },
              {
                key: 'converters',
                ar: 'محولات الستيرويدات والأفيونات (Drug Converters)',
                en: 'Steroid & Opioid Converters'
              }
            ] as const
          ).map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setCategoryFilter(cat.key);
                const firstInCat = calculatorTabs.find(
                  t => cat.key === 'all' || t.category === cat.key
                );
                if (firstInCat) setActiveTab(firstInCat.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                categoryFilter === cat.key
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white/10 text-teal-100 hover:bg-white/20'
              }`}
            >
              {lang === 'ar' ? cat.ar : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontally Scrollable Calculator Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5 -mx-1 px-1">
        {visibleTabs.map(tab => {
          const IconComponent = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <IconComponent className="w-4 h-4 shrink-0" />
              <span>{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-teal-500/15 text-teal-700 dark:text-teal-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          TAB A: PEDIATRIC DRUG DOSING CALCULATOR (mg/kg & Suspension mL)
      ===================================================================== */}
      {activeTab === 'peds_dosing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Baby className="w-5 h-5 text-teal-600" />
                  <span>
                    {lang === 'ar'
                      ? 'حاسبة جرعات أدوية الأطفال الدقيقة حسب الوزن والتركيز (Harriet Lane / DynaMedex Peds)'
                      : 'Pediatric Weight-Based Drug & Liquid Suspension Volume Calculator'}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'تحسب الجرعة بالمليغرام (mg) والحجم الدقيق بالمليلتر (mL) مع سقف الجرعة القصوى البالغة تلقائياً.'
                    : 'Calculates exact mg dose and suspension/vial volume in mL with automatic adult ceiling protection.'}
                </p>
              </div>
            </div>

            {/* Filter by Pediatric Drug Class */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
              {[
                { key: 'all', ar: 'كل أدوية الأطفال (14)', en: 'All Peds Drugs (14)' },
                { key: 'Antibiotics (Oral)', ar: 'مضادات فموية (شراب)', en: 'Oral Antibiotics' },
                { key: 'Antibiotics (IV/IM)', ar: 'مضادات وريدية/عضلية', en: 'IV/IM Antibiotics' },
                {
                  key: 'Antipyretics & Analgesics',
                  ar: 'خافضات الحرارة والمسكنات',
                  en: 'Antipyretics'
                },
                { key: 'Respiratory & Steroids', ar: 'الربو والستيرويدات', en: 'Asthma/Steroids' },
                {
                  key: 'Neurology & Anticonvulsants',
                  ar: 'الأعصاب والاختلاج',
                  en: 'Anticonvulsants'
                },
                {
                  key: 'Emergency & PALS Resuscitation',
                  ar: 'طوارئ وإنعاش PALS',
                  en: 'Emergency/PALS'
                },
                { key: 'GI & Supportive Care', ar: 'مضادات الإقياء والهضمية', en: 'GI/Antiemetics' }
              ].map(c => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    setPedsCategoryFilter(c.key);
                    const first = PEDIATRIC_DRUG_FORMULARY.find(
                      d => c.key === 'all' || d.category === c.key
                    );
                    if (first) {
                      setPedsDrugId(first.id);
                      setPedsCustomMgKg(undefined);
                      setPedsConcIdx(0);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                    pedsCategoryFilter === c.key
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lang === 'ar' ? c.ar : c.en}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'اختر دواء الأطفال (Select Pediatric Medication):'
                    : 'Select Pediatric Medication:'}
                </label>
                <select
                  value={pedsDrugId}
                  onChange={e => {
                    setPedsDrugId(e.target.value);
                    setPedsCustomMgKg(undefined);
                    setPedsConcIdx(0);
                  }}
                  className="w-full min-h-[44px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100"
                >
                  {filteredPediatricDrugs.map(d => (
                    <option key={d.id} value={d.id}>
                      {lang === 'ar' ? `${d.nameAr} — ${d.name}` : `${d.name} (${d.route})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'وزن الطفل (Weight in kg):' : 'Child Weight (kg):'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="120"
                  value={pedsWeightKg}
                  onChange={e => setPedsWeightKg(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'التركيز الصيدلاني المتوفر (Concentration / Syrup):'
                    : 'Available Concentration:'}
                </label>
                <select
                  value={pedsConcIdx}
                  onChange={e => setPedsConcIdx(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                >
                  {pedsDoseResult.drug.concentrations.map((c, idx) => (
                    <option key={idx} value={idx}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {lang === 'ar'
                      ? `معدل الجرعة المختار (${
                          pedsDoseResult.drug.dosingBasis === 'per_day'
                            ? 'ملغ/كغ/يوم mg/kg/day'
                            : 'ملغ/كغ/جرعة mg/kg/dose'
                        }):`
                      : `Target Regimen (${
                          pedsDoseResult.drug.dosingBasis === 'per_day'
                            ? 'mg/kg/day'
                            : 'mg/kg/dose'
                        }):`}
                  </label>
                  <span className="font-mono font-extrabold text-teal-600 dark:text-teal-400">
                    {pedsDoseResult.selectedMgPerKg}{' '}
                    {pedsDoseResult.drug.dosingBasis === 'per_day' ? 'mg/kg/day' : 'mg/kg/dose'} (Range:{' '}
                    {pedsDoseResult.drug.minDoseMgPerKg}–{pedsDoseResult.drug.maxDoseMgPerKg})
                  </span>
                </div>
                <input
                  type="range"
                  min={pedsDoseResult.drug.minDoseMgPerKg}
                  max={pedsDoseResult.drug.maxDoseMgPerKg}
                  step={pedsDoseResult.drug.minDoseMgPerKg < 1 ? 0.01 : 1}
                  value={pedsDoseResult.selectedMgPerKg}
                  onChange={e => setPedsCustomMgKg(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Indication & Clinical Pearls Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <div>
                <span className="font-extrabold text-teal-700 dark:text-teal-400">
                  {lang === 'ar' ? 'الاستطباب السريري:' : 'Clinical Indication:'}{' '}
                </span>
                <span className="text-slate-700 dark:text-slate-200">
                  {lang === 'ar'
                    ? pedsDoseResult.drug.indicationAr
                    : pedsDoseResult.drug.indication}
                </span>
              </div>
              <div>
                <span className="font-extrabold text-amber-700 dark:text-amber-400">
                  {lang === 'ar' ? 'توجيهات البورد والسلامة:' : 'Pediatric Safety Pearl:'}{' '}
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  {lang === 'ar'
                    ? pedsDoseResult.drug.clinicalPearlsAr
                    : pedsDoseResult.drug.clinicalPearlsEn}
                </span>
              </div>
            </div>
          </div>

          {/* Right Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-teal-500/40">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-teal-300 font-bold tracking-wide uppercase block mb-1">
                  {lang === 'ar'
                    ? 'الجرعة المفردة المحسوبة والحجم بالمليلتر'
                    : 'Calculated Single Dose & Liquid Volume'}
                </span>
                <div dir="ltr" className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-300 font-mono">
                    {pedsDoseResult.volumePerDoseMl} mL
                  </span>
                  <span className="text-lg font-extrabold text-white font-mono">
                    ({pedsDoseResult.cappedSingleDoseMg} mg / dose)
                  </span>
                </div>
                <div dir="ltr" className="text-xs text-teal-200 font-bold mt-1">
                  Frequency: {pedsDoseResult.drug.frequencyLabel} • Route:{' '}
                  {pedsDoseResult.drug.route}
                </div>
              </div>

              {pedsDoseResult.isCappedAtAdultMax && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ar'
                      ? `تنبيه سقف الجرعة القصوى: تم تقليص الجرعة تلقائياً إلى الحد الأقصى المسموح للبالغين (${pedsDoseResult.drug.maxSingleDoseMg} mg/dose • ${pedsDoseResult.drug.maxDailyDoseMg} mg/day).`
                      : `Adult Maximum Ceiling Applied: Dose capped at maximum safe ceiling (${pedsDoseResult.drug.maxSingleDoseMg} mg/dose • ${pedsDoseResult.drug.maxDailyDoseMg} mg/day).`}
                  </span>
                </div>
              )}

              <div
                dir="ltr"
                className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs"
              >
                <div className="flex justify-between">
                  <span className="text-slate-300">Single Dose (mg):</span>
                  <span className="font-mono font-bold text-white">
                    {pedsDoseResult.cappedSingleDoseMg} mg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Volume per Dose (mL):</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {pedsDoseResult.volumePerDoseMl} mL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total 24-Hour Dose (mg/day):</span>
                  <span className="font-mono font-bold text-white">
                    {pedsDoseResult.cappedDailyDoseMg} mg/day
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-teal-200 font-bold">Total 24-Hour Volume (mL/day):</span>
                  <span className="font-mono font-bold text-teal-300">
                    {pedsDoseResult.volumePerDayMl} mL/day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB B: PEDIATRIC FLUIDS (4-2-1), SCHWARTZ eGFR, BSA & PALS EMERGENCY
      ===================================================================== */}
      {activeTab === 'peds_fluids_pals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              {lang === 'ar'
                ? 'مدخلات الطفل: السوائل الوريدية (Holliday-Segar 4-2-1) + الكلى (Schwartz) + إنعاش PALS'
                : 'Pediatric Maintenance Fluids (4-2-1), Schwartz eGFR, BSA & PALS Inputs'}
            </h3>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'وزن الطفل (Weight kg)' : 'Weight (kg)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={pedsFluidWeight}
                  onChange={e => setPedsFluidWeight(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'العمر (Age in Years)' : 'Age (Years)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={pedsAgeYears}
                  onChange={e => setPedsAgeYears(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'الطول (Height cm)' : 'Height / Length (cm)'}
                </label>
                <input
                  type="number"
                  value={pedsHeightCm}
                  onChange={e => setPedsHeightCm(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'كرياتينين المصل (SCr mg/dL)' : 'Serum Creatinine (mg/dL)'}
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={pedsScr}
                  onChange={e => setPedsScr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'نسبة الجفاف (% Dehydration)' : 'Dehydration Severity (%)'}
                </label>
                <select
                  value={pedsDehydrationPct}
                  onChange={e => setPedsDehydrationPct(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value={0}>0% (Euvolemic Maintenance Only)</option>
                  <option value={5}>5% Mild Dehydration (50 mL/kg deficit)</option>
                  <option value={7.5}>7.5% Moderate Dehydration (75 mL/kg deficit)</option>
                  <option value={10}>10% Severe Dehydration (100 mL/kg deficit)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'معامل Schwartz (k-factor)' : 'Schwartz Constant (k)'}
                </label>
                <select
                  value={pedsKFactor}
                  onChange={e => setPedsKFactor(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value={0.413}>0.413 (Bedside IDMS Revised Schwartz 1–17y)</option>
                  <option value={0.33}>0.33 (Preterm Infant &lt;1 year)</option>
                  <option value={0.45}>0.45 (Full-Term Infant &lt;1 year)</option>
                  <option value={0.55}>0.55 (Children &amp; Adolescent Females)</option>
                  <option value={0.7}>0.70 (Adolescent Males)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Holliday-Segar Fluids Card */}
            <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-teal-950 text-white p-5 rounded-2xl border border-sky-500/40 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                  Holliday-Segar 4-2-1 Maintenance & Deficit Fluids
                </span>
                <span className="font-mono text-xs bg-sky-500/20 text-sky-200 px-2.5 py-0.5 rounded-full">
                  D5 0.9% NaCl / D5 LR
                </span>
              </div>

              <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Maintenance Rate</span>
                  <span className="font-mono font-black text-xl text-sky-300">
                    {pedsFluidsResult.hourlyMaintenanceMlHr} mL/hr
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">24h Maintenance</span>
                  <span className="font-mono font-black text-xl text-white">
                    {pedsFluidsResult.dailyMaintenanceMl24h} mL/d
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Shock Bolus (20 mL/kg)</span>
                  <span className="font-mono font-black text-xl text-amber-300">
                    {pedsFluidsResult.isotonicBolus20MlKg} mL NS
                  </span>
                </div>
              </div>

              {pedsDehydrationPct > 0 && (
                <div
                  dir="ltr"
                  className="p-3 rounded-xl bg-sky-500/15 border border-sky-400/30 text-xs space-y-1"
                >
                  <div className="font-bold text-sky-200">
                    Dehydration Deficit ({pedsDehydrationPct}%):{' '}
                    {pedsFluidsResult.dehydrationDeficitMl} mL (Total 24h:{' '}
                    {pedsFluidsResult.total24hFluidWithDeficitMl} mL)
                  </div>
                  <div className="text-slate-200 font-mono text-[11px]">
                    • First 8 Hours Rate (1/2 Deficit + Maint):{' '}
                    <strong className="text-emerald-300">
                      {pedsFluidsResult.hourlyRateFirst8hMlHr} mL/hr
                    </strong>{' '}
                    | Next 16 Hours Rate:{' '}
                    <strong className="text-teal-300">
                      {pedsFluidsResult.hourlyRateNext16hMlHr} mL/hr
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Schwartz eGFR, BSA & PALS Resuscitation Card */}
            <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-rose-500/40 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300">
                  Schwartz Pediatric eGFR, Mosteller BSA & PALS Resuscitation
                </span>
                <span className="font-mono text-xs bg-rose-500/20 text-rose-200 px-2.5 py-0.5 rounded-full">
                  BSA: {pedsRenalPalsResult.bsaMosteller} m²
                </span>
              </div>

              <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Schwartz eGFR</span>
                  <span className="font-mono font-black text-lg text-emerald-300">
                    {pedsRenalPalsResult.schwartzEgfr}{' '}
                    <span className="text-[10px] font-normal">mL/min/1.73m²</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">ETT Size (Cuffed)</span>
                  <span className="font-mono font-black text-lg text-amber-300">
                    {pedsRenalPalsResult.cuffedEttMm} mm{' '}
                    <span className="text-[10px] font-normal">
                      (Depth {pedsRenalPalsResult.ettDepthCm} cm)
                    </span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Defibrillation (2–4 J/kg)</span>
                  <span className="font-mono font-black text-lg text-rose-300">
                    {pedsRenalPalsResult.defibFirstShockJoules}J →{' '}
                    {pedsRenalPalsResult.defibSecondShockJoules}J
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Epi Arrest (1:10,000)</span>
                  <span className="font-mono font-bold text-sm text-white">
                    {pedsRenalPalsResult.epinephrineArrestMg} mg (
                    {pedsRenalPalsResult.epinephrineArrestMl1to10000} mL)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Amiodarone Arrest</span>
                  <span className="font-mono font-bold text-sm text-white">
                    {pedsRenalPalsResult.amiodaroneArrestMg} mg IV/IO
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">D10W Hypoglycemia</span>
                  <span className="font-mono font-bold text-sm text-teal-300">
                    {pedsRenalPalsResult.d10wHypoglycemiaMl} mL IV
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. CrCl Calculator
      ===================================================================== */}
      {activeTab === 'crcl' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Cockcroft-Gault Creatinine Clearance (CrCl) Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Age (Years)
                </label>
                <input
                  type="number"
                  value={crclAge}
                  onChange={e => setCrclAge(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Biological Sex
                </label>
                <select
                  value={crclGender}
                  onChange={e => setCrclGender(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                >
                  <option value="male">{lang === 'ar' ? 'Male (ذكر)' : 'Male'}</option>
                  <option value="female">
                    {lang === 'ar' ? 'Female (أنثى × 0.85)' : 'Female (×0.85)'}
                  </option>
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
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Height (cm)
                </label>
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
                • Ideal Body Weight (IBW):{' '}
                <strong className="text-teal-600">{crclResult.ibw} kg</strong>
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
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {crclResult.crcl}
                </span>
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
                <div className="font-bold text-teal-200">
                  Renal Dosing Cutoffs (DiPiro / DynaMedex 2026):
                </div>
                <div
                  dir="ltr"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]"
                >
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
                    {crclResult.crcl < 30
                      ? '1 g IV q24h'
                      : crclResult.crcl < 50
                      ? '2 g IV q12-24h'
                      : '2 g IV q8h'}
                  </p>
                  <p>
                    • <strong>Metformin:</strong>{' '}
                    {crclResult.crcl < 30
                      ? 'CONTRAINDICATED (Lactic Acidosis Risk)'
                      : 'Monitor eGFR'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. Vancomycin AUC/MIC
      ===================================================================== */}
      {activeTab === 'vanco' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Vancomycin Individualized PK & AUC24/MIC Parameters (ASHP/IDSA 2026)
            </h3>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Age (Years)
                </label>
                <input
                  type="number"
                  value={vancoAge}
                  onChange={e => setVancoAge(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Total Body Weight (kg)
                </label>
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

              <div
                dir="ltr"
                className="space-y-2 text-xs text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10"
              >
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

      {/* =====================================================================
          3. Winter-Tozer Corrected Phenytoin (DynaMedex TDM)
      ===================================================================== */}
      {activeTab === 'phenytoin_tdm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex Albumin-Corrected Phenytoin (Winter-Tozer Formula)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Measured Total Phenytoin (mcg/mL)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={phenytoinMeasured}
                  onChange={e => setPhenytoinMeasured(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Serum Albumin (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={phenytoinAlbumin}
                  onChange={e => setPhenytoinAlbumin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <label className="sm:col-span-2 flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={phenytoinEsrd}
                  onChange={e => setPhenytoinEsrd(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar'
                    ? 'قصور كلوي شديد / غسيل كلوي (CrCl < 10 mL/min or ESRD — يستخدم معامل 0.1 بدلاً من 0.2 بسبب إزاحة اليوريميا)'
                    : 'Severe Renal Failure / ESRD (CrCl < 10 mL/min — uses 0.1 albumin multiplier due to uremic binding displacement)'}
                </span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-indigo-500/40 space-y-3">
            <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider block">
              Corrected Total & Estimated Free Phenytoin
            </span>
            <div dir="ltr" className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-indigo-300 font-mono">
                {phenytoinResult.correctedPhenytoin}
              </span>
              <span className="text-sm font-bold text-slate-300">
                mcg/mL (Target: 10–20 mcg/mL)
              </span>
            </div>
            <div dir="ltr" className="text-xs font-mono text-teal-300">
              Estimated Free Phenytoin (~10%):{' '}
              <strong>{phenytoinResult.estimatedFreePhenytoin} mcg/mL</strong> (Target: 1.0–2.0
              mcg/mL)
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
              {phenytoinResult.recommendation}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. Sodium Correction in Hyperglycemia & Free Water Deficit (DynaMedex)
      ===================================================================== */}
      {activeTab === 'sodium_freewater' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex Sodium Correction in DKA/HHS & Free Water Deficit Inputs
            </h3>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Measured Na+ in DKA/HHS (mEq/L)</label>
                <input
                  type="number"
                  value={naMeasured}
                  onChange={e => setNaMeasured(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Serum Glucose (mg/dL)</label>
                <input
                  type="number"
                  value={glucoseMgDl}
                  onChange={e => setGlucoseMgDl(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Hypernatremia Na+ for Water Deficit</label>
                <input
                  type="number"
                  value={hyperNaMeasured}
                  onChange={e => setHyperNaMeasured(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  value={naWeightKg}
                  onChange={e => setNaWeightKg(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold mb-1">Total Body Water (TBW) Compartment</label>
                <select
                  value={naAgeCategory}
                  onChange={e => setNaAgeCategory(e.target.value as any)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value="adult_male">Adult Male (0.6 × Weight)</option>
                  <option value="adult_female">Adult Female (0.5 × Weight)</option>
                  <option value="elderly_male">Elderly Male (0.5 × Weight)</option>
                  <option value="elderly_female">Elderly Female (0.45 × Weight)</option>
                  <option value="child">Child (0.6 × Weight)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-teal-950 to-slate-900 text-white p-5 rounded-2xl border border-teal-500/40 space-y-2">
              <span className="text-xs font-extrabold uppercase text-teal-300">
                1. True Corrected Sodium in Hyperglycemia (DKA / HHS)
              </span>
              <div dir="ltr" className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">
                    Katz Formula (+1.6 per 100 mg/dL)
                  </span>
                  <span className="font-mono font-black text-2xl text-emerald-300">
                    {naCorrectionResult.katzCorrectedNa} mEq/L
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">
                    Hillier Formula (+2.4 per 100 mg/dL)
                  </span>
                  <span className="font-mono font-black text-2xl text-amber-300">
                    {naCorrectionResult.hillierCorrectedNa} mEq/L
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 pt-1">
                {naCorrectionResult.katzCorrectedNa >= 135
                  ? '✓ Corrected Na+ is >=135 mEq/L: Switch DKA maintenance IV fluid after initial 0.9% NaCl resuscitation to 0.45% NaCl (Half-Normal Saline).'
                  : '⚠️ Corrected Na+ is <135 mEq/L: Continue 0.9% NaCl as maintenance IV fluid during DKA protocol.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-950 to-slate-900 text-white p-5 rounded-2xl border border-sky-500/40 space-y-2">
              <span className="text-xs font-extrabold uppercase text-sky-300">
                2. Free Water Deficit in Hypernatremia (Na+ = {hyperNaMeasured} mEq/L)
              </span>
              <div dir="ltr" className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-sky-300 font-mono">
                  {hyperNaDeficitResult.freeWaterDeficitLiters} L
                </span>
                <span className="text-sm font-mono text-slate-300">
                  ({hyperNaDeficitResult.freeWaterDeficitMl} mL Free Water • TBW:{' '}
                  {hyperNaDeficitResult.tbwLiters} L)
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                Safety Rule: Lower serum Na+ by NO MORE than 8–10 mEq/L per 24 hours to prevent
                cerebral edema.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. Anion Gap, Albumin-Corrected AG, Delta Ratio & Winter's Formula
      ===================================================================== */}
      {activeTab === 'anion_gap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex Acid-Base Analyzer: Anion Gap, Corrected AG, Delta Ratio & Winter’s Formula
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Sodium Na+ (mEq/L)</label>
                <input
                  type="number"
                  value={agNa}
                  onChange={e => setAgNa(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Chloride Cl- (mEq/L)</label>
                <input
                  type="number"
                  value={agCl}
                  onChange={e => setAgCl(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">HCO3- (mEq/L)</label>
                <input
                  type="number"
                  value={agHco3}
                  onChange={e => setAgHco3(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Serum Albumin (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={agAlbumin}
                  onChange={e => setAgAlbumin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Measured ABG PaCO2 (mmHg)</label>
                <input
                  type="number"
                  value={agPaco2}
                  onChange={e => setAgPaco2(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-amber-500/40 space-y-3 text-xs">
            <div dir="ltr" className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Uncorrected AG</span>
                <span className="font-mono font-black text-xl text-white">
                  {agResult.anionGap}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-amber-300 block">Corrected AG</span>
                <span className="font-mono font-black text-xl text-amber-300">
                  {agResult.correctedAnionGap}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-teal-300 block">Delta Ratio</span>
                <span className="font-mono font-black text-xl text-teal-300">
                  {agResult.deltaRatio}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="font-bold text-amber-300">{agResult.deltaInterpretation}</div>
              <div className="font-mono text-slate-300">
                Winter’s Expected PaCO2: {agResult.wintersExpectedPaco2Min}–
                {agResult.wintersExpectedPaco2Max} mmHg (Measured: {agPaco2} mmHg)
              </div>
              <div className="text-emerald-300 font-semibold">
                {agResult.respiratoryCompensation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. Corrected Calcium
      ===================================================================== */}
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
                <span className="text-4xl sm:text-5xl font-black text-emerald-300 font-mono">
                  {correctedCalcium}
                </span>
                <span className="text-xs text-slate-300">mg/dL</span>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-200">
                {correctedCalcium < 8.5 ? (
                  <p>
                    ⚠️ True Hypocalcemia (&lt; 8.5 mg/dL): تحقق من Ionized Calcium و Serum Magnesium
                    وأعراض Tetany / QTc Prolongation.
                  </p>
                ) : correctedCalcium > 10.5 ? (
                  <p>
                    ⚠️ Hypercalcemia (&gt; 10.5 mg/dL): قيّم Hydration Status (IV 0.9% NaCl) ومسببات
                    الارتفاع.
                  </p>
                ) : (
                  <p>✓ Normocalcemia (8.5–10.5 mg/dL) بعد التصحيح لـ Hypoalbuminemia.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          7. CHA2DS2-VASc & HAS-BLED (DynaMedex Cardiology)
      ===================================================================== */}
      {activeTab === 'cha2ds2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              CHA₂DS₂-VASc Stroke Risk & HAS-BLED Bleeding Score in Atrial Fibrillation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaChf}
                  onChange={e => setChaChf(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>C: Congestive Heart Failure / HFrEF (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaHtn}
                  onChange={e => setChaHtn(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>H: Hypertension (+1 CHA₂DS₂ / +1 HAS-BLED)</span>
              </label>

              <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <span>A: Age Bracket:</span>
                <select
                  value={chaAge}
                  onChange={e => setChaAge(Number(e.target.value))}
                  className="p-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                >
                  <option value={55}>&lt; 65 years (+0)</option>
                  <option value={68}>65–74 years (+1)</option>
                  <option value={78}>&gt;= 75 years (+2)</option>
                </select>
              </div>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaDiabetes}
                  onChange={e => setChaDiabetes(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>D: Diabetes Mellitus (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaStroke}
                  onChange={e => setChaStroke(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>S₂: Prior Stroke / TIA (+2 CHA₂DS₂ / +1 HAS-BLED)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaVascular}
                  onChange={e => setChaVascular(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>V: Vascular Disease (MI, PAD) (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chaFemale}
                  onChange={e => setChaFemale(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span>Sc: Sex Category (Female) (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-rose-200/70 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hbRenalOrLiver}
                  onChange={e => setHbRenalOrLiver(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>HAS-BLED: Abnormal Renal or Liver Function (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-rose-200/70 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hbBleedingHistory}
                  onChange={e => setHbBleedingHistory(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>HAS-BLED: Prior Major Bleeding or Anemia (+1)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-rose-200/70 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hbDrugsOrAlcohol}
                  onChange={e => setHbDrugsOrAlcohol(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>HAS-BLED: Concomitant Antiplatelet / NSAID (+1)</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-rose-500/40 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-rose-300 font-bold uppercase block">
                  CHA₂DS₂-VASc
                </span>
                <div className="text-4xl font-black text-rose-400 font-mono mt-1">{chaScore}</div>
                <span className="text-[10px] text-slate-300">
                  {chaScore >= 2 ? 'Oral Anticoagulation Class I' : 'Low-Moderate Risk'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-amber-300 font-bold uppercase block">
                  HAS-BLED Score
                </span>
                <div className="text-4xl font-black text-amber-400 font-mono mt-1">
                  {hasBledScore}
                </div>
                <span className="text-[10px] text-slate-300">
                  {hasBledScore >= 3
                    ? 'High Bleeding Risk (>=3): Address modifiable risks'
                    : 'Acceptable Bleeding Risk'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-200">
              {chaScore >= 2
                ? lang === 'ar'
                  ? '⚠️ High Stroke Risk: يوصى بـ Oral Anticoagulation (Class I) مع تفضيل DOACs (Apixaban 5 mg BID) وإيقاف الـ NSAIDs غير الضرورية لتقليل HAS-BLED.'
                  : 'High Stroke Risk: Oral anticoagulation strongly recommended (DOAC preferred over Warfarin).'
                : 'Low-to-Intermediate Stroke Risk.'}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          8. DynaMedex CURB-65, Wells PE & Weight-Based Heparin Nomogram
      ===================================================================== */}
      {activeTab === 'wells_curb_qsofa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 text-xs">
          {/* CURB-65 */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                1. CURB-65 Pneumonia Score
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-mono font-black">
                {curb65Score} / 5
              </span>
            </div>

            {[
              { label: 'C: Confusion (New-onset)', val: curbConfusion, set: setCurbConfusion },
              {
                label: 'U: BUN > 19 mg/dL (Urea > 7 mmol/L)',
                val: curbBunGt19,
                set: setCurbBunGt19
              },
              { label: 'R: Respiratory Rate >= 30/min', val: curbRrGe30, set: setCurbRrGe30 },
              {
                label: 'B: SBP < 90 or DBP <= 60 mmHg',
                val: curbLowBp,
                set: setCurbLowBp
              },
              { label: '65: Age >= 65 years', val: curbAgeGe65, set: setCurbAgeGe65 }
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={e => item.set(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-semibold">{item.label}</span>
              </label>
            ))}

            <div className="p-3 rounded-xl bg-teal-950 text-teal-100 font-semibold">
              {curb65Score <= 1
                ? 'Score 0–1: Low Mortality (<3%) — Outpatient oral CAP therapy (Amoxicillin + Azithromycin or Doxycycline).'
                : curb65Score === 2
                ? 'Score 2: Moderate Mortality (9%) — Inpatient Ward admission (Ceftriaxone 1–2g IV q24h + Azithromycin 500mg IV/PO).'
                : 'Score 3–5: Severe CAP (15–40% Mortality) — ICU Admission + Beta-Lactam + Macrolide (+/- MRSA/Pseudomonas coverage).'}
            </div>
          </div>

          {/* Wells PE Criteria */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                2. Wells Criteria for PE
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-mono font-black">
                {wellsPeScore} pts
              </span>
            </div>

            {[
              { label: 'Clinical signs of DVT (+3)', val: wellsDvtSigns, set: setWellsDvtSigns },
              {
                label: 'PE is #1 or equally likely diagnosis (+3)',
                val: wellsPeLikely,
                set: setWellsPeLikely
              },
              { label: 'Heart Rate > 100 bpm (+1.5)', val: wellsHrGt100, set: setWellsHrGt100 },
              {
                label: 'Immobilization >=3d or Surgery <4w (+1.5)',
                val: wellsImmobilization,
                set: setWellsImmobilization
              },
              { label: 'Previous DVT or PE (+1.5)', val: wellsPriorVte, set: setWellsPriorVte },
              { label: 'Hemoptysis (+1)', val: wellsHemoptysis, set: setWellsHemoptysis },
              { label: 'Active Malignancy (+1)', val: wellsMalignancy, set: setWellsMalignancy }
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={e => item.set(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>{item.label}</span>
              </label>
            ))}

            <div className="p-3 rounded-xl bg-rose-950 text-rose-100 font-semibold">
              {wellsPeScore > 6
                ? 'High Probability (>6 pts): Immediate CT Pulmonary Angiography (CTPA) + Empirical Anticoagulation.'
                : wellsPeScore >= 2
                ? 'Moderate Probability (2–6 pts): Check High-Sensitivity D-Dimer or proceed to CTPA.'
                : 'Low Probability (<2 pts): Check PERC Rule / D-Dimer to rule out PE.'}
            </div>
          </div>

          {/* Weight-Based Heparin Nomogram */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl border border-indigo-500/40 space-y-3">
            <h4 className="font-extrabold text-sm text-indigo-300 border-b border-white/10 pb-2">
              3. Weight-Based IV Heparin (UFH) Nomogram
            </h4>

            <div>
              <label className="block text-slate-300 mb-1">Patient Weight (kg)</label>
              <input
                type="number"
                value={heparinWeightKg}
                onChange={e => setHeparinWeightKg(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Clinical Protocol</label>
              <select
                value={heparinProtocol}
                onChange={e => setHeparinProtocol(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
              >
                <option value="vte_pe">VTE / PE (80 U/kg Bolus + 18 U/kg/hr)</option>
                <option value="acs_afib">ACS / AFib (60 U/kg Bolus + 12 U/kg/hr)</option>
              </select>
            </div>

            <div dir="ltr" className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div>
                <span className="text-[10px] text-indigo-300 uppercase block">
                  Initial IV Bolus
                </span>
                <span className="font-mono font-black text-2xl text-white">
                  {ufhBolusUnits.toLocaleString()} Units IV
                </span>
              </div>
              <div>
                <span className="text-[10px] text-teal-300 uppercase block">
                  Initial Continuous Infusion
                </span>
                <span className="font-mono font-black text-2xl text-teal-300">
                  {ufhInfusionUnitsHr.toLocaleString()} Units/hr
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                Check anti-Xa (0.3–0.7 IU/mL) or aPTT (60–85 sec) 6 hours after initiation and 6h
                after any rate change.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. QTc Interval Calculator (Bazett, Fridericia, Framingham, Hodges)
      ===================================================================== */}
      {activeTab === 'qtc_calc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex QTc Interval Calculator (Bazett, Fridericia, Framingham, Hodges & Wide-QRS)
            </h3>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Measured QT (ms)</label>
                <input
                  type="number"
                  value={qtMs}
                  onChange={e => setQtMs(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={hrBpm}
                  onChange={e => setHrBpm(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">QRS Duration (ms)</label>
                <input
                  type="number"
                  value={qrsMs}
                  onChange={e => setQrsMs(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-rose-500/40 space-y-3 text-xs">
            <div dir="ltr" className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-teal-300 block">
                  Fridericia QTc (Preferred at high/low HR)
                </span>
                <span className="font-mono font-black text-3xl text-teal-300">
                  {qtcResult.fridericiaMs} ms
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-rose-300 block">Bazett QTc</span>
                <span className="font-mono font-black text-3xl text-rose-300">
                  {qtcResult.bazettMs} ms
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Framingham QTc</span>
                <span className="font-mono font-bold text-lg text-white">
                  {qtcResult.framinghamMs} ms
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Hodges QTc</span>
                <span className="font-mono font-bold text-lg text-white">
                  {qtcResult.hodgesMs} ms
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-100">
              {qtcResult.isHighTdpRisk
                ? '⚠️ CRITICAL QTc >= 500 ms: High Risk of Torsades de Pointes (TdP)! Discontinue QT-prolonging drugs (Amiodarone, Fluoroquinolones, Macrolides, Ondansetron, Haloperidol) and replete K+ > 4.0 mEq/L & Mg2+ > 2.0 mg/dL.'
                : qtcResult.isProlonged
                ? 'Borderline QTc Prolongation (460–499 ms): Monitor ECG and electrolytes closely.'
                : '✓ Normal QTc Interval (< 460 ms).'}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          10. MELD-Na Liver Disease Severity Score (DynaMedex Hepatology)
      ===================================================================== */}
      {activeTab === 'meld_na' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex MELD-Na Score for End-Stage Liver Disease (UNOS / OPTN)
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Total Bilirubin (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={meldBili}
                  onChange={e => setMeldBili(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">INR</label>
                <input
                  type="number"
                  step="0.1"
                  value={meldInr}
                  onChange={e => setMeldInr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Serum Creatinine (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={meldCr}
                  onChange={e => setMeldCr(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Serum Sodium Na+ (mEq/L)</label>
                <input
                  type="number"
                  value={meldNa}
                  onChange={e => setMeldNa(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <label className="col-span-2 flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={meldDialysis}
                  onChange={e => setMeldDialysis(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-bold">
                  Dialysis &ge; 2 times in past week or 24h CVVHD (sets SCr to 4.0 mg/dL per UNOS)
                </span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-amber-500/40 space-y-3">
            <span className="text-xs font-extrabold uppercase text-amber-300">
              MELD-Na Score (Range 6–40)
            </span>
            <div dir="ltr" className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-amber-400 font-mono">
                {meldResult.meldNaScore}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                (Standard MELD(i): {meldResult.meldInitial})
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-200">
              90-Day Predicted Mortality: {meldResult.mortality90Day}
            </div>
            <p className="text-xs text-slate-300">{meldResult.clinicalInterpretation}</p>
          </div>
        </div>
      )}

      {/* =====================================================================
          11. Child-Pugh Hepatic Score
      ===================================================================== */}
      {activeTab === 'childpugh' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Child-Pugh Hepatic Cirrhosis Staging Criteria
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Bilirubin (mg/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={cpBilirubin}
                  onChange={e => setCpBilirubin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Albumin (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={cpAlbumin}
                  onChange={e => setCpAlbumin(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  INR
                </label>
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
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Ascites
                </label>
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
                <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                  {childPughResult.score}
                </span>
                <span className="text-xl font-bold text-white">
                  Class {childPughResult.classGrade}
                </span>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 mb-4">
                <strong>{childPughResult.mortality1Year}</strong>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-bold text-amber-300">
                  Hepatic Pharmacokinetic Dosing Guidance:
                </div>
                <p className="text-[11px] leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  {childPughResult.doseRecommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          12. Corticosteroid Equivalency Converter (DynaMedex)
      ===================================================================== */}
      {activeTab === 'steroid_conv' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              DynaMedex Systemic Corticosteroid Equivalency & Potency Converter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">From Corticosteroid</label>
                <select
                  value={fromSteroid}
                  onChange={e => setFromSteroid(e.target.value as CorticosteroidName)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  {(Object.keys(CORTICOSTEROID_EQUIVALENTS) as CorticosteroidName[]).map(k => (
                    <option key={k} value={k}>
                      {k} ({CORTICOSTEROID_EQUIVALENTS[k].eqMg} mg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Current Dose (mg)</label>
                <input
                  type="number"
                  value={fromSteroidDose}
                  onChange={e => setFromSteroidDose(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Target Corticosteroid</label>
                <select
                  value={toSteroid}
                  onChange={e => setToSteroid(e.target.value as CorticosteroidName)}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  {(Object.keys(CORTICOSTEROID_EQUIVALENTS) as CorticosteroidName[]).map(k => (
                    <option key={k} value={k}>
                      {k} ({CORTICOSTEROID_EQUIVALENTS[k].eqMg} mg)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              Equivalency Standard: Hydrocortisone 20 mg = Cortisone 25 mg = Prednisone 5 mg =
              Prednisolone 5 mg = Methylprednisolone 4 mg = Triamcinolone 4 mg = Dexamethasone 0.75
              mg = Betamethasone 0.6 mg
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-teal-500/40 space-y-3">
            <span className="text-xs font-extrabold uppercase text-teal-300">
              Equivalent Anti-Inflammatory Dose
            </span>
            <div dir="ltr" className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-300 font-mono">
                {steroidResult.convertedDoseMg} mg
              </span>
              <span className="text-sm font-bold text-white">{toSteroid}</span>
            </div>
            <div dir="ltr" className="text-xs text-slate-300 space-y-1">
              <div>
                • Prednisone Equivalent: <strong>{steroidResult.prednisoneEquivalentMg} mg</strong>
              </div>
              <div>
                • Target Biological Half-Life: <strong>{steroidResult.toInfo.halfLifeHours}</strong>
              </div>
              <div>
                • Mineralocorticoid Potency: <strong>{steroidResult.toInfo.mineralocorticoid}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          13. Opioid Converter
      ===================================================================== */}
      {activeTab === 'opioid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Opioid Equianalgesic Dosing & Cross-Tolerance Calculator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Current Opioid:
                </label>
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
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Total 24h Dose:
                </label>
                <input
                  type="number"
                  value={fromOpioidDose}
                  onChange={e => setFromOpioidDose(Number(e.target.value))}
                  className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Target Opioid:
                </label>
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
                <span className="text-xs text-slate-300">
                  {toOpioid.includes('mcg') ? 'mcg/24h' : 'mg/24h'}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                (Unadjusted 1:1 Equianalgesic Equivalent: {opioidResult.equivalentDose})
              </p>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200">
                <strong>ISMP High-Alert Safety:</strong> راقب Respiratory Rate و Sedation Scale، مع
                توفر <strong>Naloxone IV</strong> في الجناح وتجنب Morphine في حالات CrCl &lt; 30
                mL/min لتراكم المستقلب الفعال M6G.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

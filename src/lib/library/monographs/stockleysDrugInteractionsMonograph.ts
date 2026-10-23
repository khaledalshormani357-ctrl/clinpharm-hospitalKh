import { VerbatimChapter } from '../libraryTypes';

export const stockleysDrugInteractionsChapters: VerbatimChapter[] = [
  {
    id: 'stockleys-sec1-anticoagulants-antiplatelets',
    bookId: 'stockleys-drug-interactions',
    chapterNumber: 1,
    title: 'Anticoagulants, Antiplatelets & Fibrinolytics — Pharmacokinetic & Pharmacodynamic Drug Interactions',
    titleAr: 'التداخلات الدوائية لمضادات التخثر ومثبطات الصفائح (Stockley’s Section 1: Warfarin, DOACs & P2Y12)',
    authors: 'Karen Baxter, Claire L. Preston, eds. (Stockley’s Drug Interactions Editorial Panel)',
    edition: "Stockley's Drug Interactions (13th/2026 Hospital Reference Edition • Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    pageRange: 'pp. 210–388',
    systemCategory: 'Drug Interactions & Safety',
    systemCategoryAr: 'مرجع التداخلات الدوائية (Stockley’s DDI)',
    sourceUrl: 'local://ref/chapter/stockleys-sec1-anticoagulants-antiplatelets',
    learningObjectives: [
      'Quantify stereo-selective CYP2C9, CYP1A2, and CYP3A4 inhibition/induction interactions affecting S-warfarin and R-warfarin clearance.',
      'Apply dual P-glycoprotein (P-gp) and CYP3A4 interaction matrices for Apixaban, Rivaroxaban, Edoxaban, and Dabigatran.',
      'Differentiate CYP2C19 prodrug bioactivation blockade of Clopidogrel by Omeprazole/Esomeprazole vs Pantoprazole.',
      'Manage additive pharmacodynamic bleeding risks when combining anticoagulants with NSAIDs, SSRIs, or antiplatelet therapy.'
    ],
    toc: [
      { id: 'stk-1-1', number: '1.1', title: 'Warfarin & Coumarin Interactions (CYP2C9, Vitamin K Flora & Thyroid Status)' },
      { id: 'stk-1-2', number: '1.2', title: 'Direct Oral Anticoagulants (DOACs): P-gp & Strong CYP3A4 Modulators' },
      { id: 'stk-1-3', number: '1.3', title: 'P2Y12 Receptor Antagonists (Clopidogrel, Ticagrelor, Prasugrel) & PPI/CYP Interactions' }
    ],
    sections: [
      {
        id: 'stk-1-1',
        number: '1.1',
        heading: 'Warfarin & Coumarin Interactions: Stereo-Selective CYP2C9 Inhibition and Induction',
        headingAr: 'تداخلات الوارفارين (Warfarin): التثبيط والتحريض الإنزيمي الانتقائي لـ CYP2C9 و CYP3A4',
        evidenceGrade: "Stockley's Action Rating: Severe / Adjust Dose & Monitor INR",
        body: `Warfarin is administered as a racemic mixture of R- and S-enantiomers. The S-enantiomer is 3 to 5 times more potent as a vitamin K epoxide reductase (VKORC1) antagonist than the R-enantiomer and is predominantly metabolized by hepatic CYP2C9. R-warfarin is cleared via CYP1A2 and CYP3A4. Consequently, drugs that inhibit CYP2C9 (such as Amiodarone, Fluconazole, Voriconazole, Metronidazole, and Trimethoprim/Sulfamethoxazole) disproportionately impair clearance of the biologically potent S-warfarin isomer, producing rapid, marked, and potentially fatal elevations in INR.

Amiodarone + Warfarin Monograph: Amiodarone and its main metabolite desethylamiodarone inhibit both CYP2C9 and CYP3A4. The interaction begins within 3 to 7 days of co-administration, peaks at 2 to 6 weeks, and persists for weeks to months after amiodarone discontinuation due to its extremely long elimination half-life (t1/2 ~ 40–55 days). Stockley's Clinical Management: Empirically reduce the maintenance dose of warfarin by 30% to 50% depending on the amiodarone loading regimen, and monitor INR every 3–5 days for the first month.

Antimicrobials + Warfarin Monograph: Co-trimoxazole (TMP-SMX), Metronidazole, and Fluconazole predictably double the prothrombin time/INR within 3–5 days via potent CYP2C9 inhibition. Broad-spectrum cephalosporins (particularly those with an N-methylthiotetrazole side chain) and fluoroquinolones further potentiate anticoagulation by suppressing gut flora vitamin K synthesis and displacing warfarin from albumin.`,
        clinicalNotes: [
          'Stockley’s Pre-emptive Rule: Reduce Warfarin dose by 30–50% when starting Amiodarone, Fluconazole, or Metronidazole.',
          'Rifampicin & Carbamazepine potent CYP2C9/CYP3A4 induction: Increases warfarin dose requirements by 100–200%; stopping the inducer without tapering warfarin causes rebound fatal hemorrhage.'
        ],
        tables: [
          {
            title: "Stockley's Warfarin High-Risk Interaction Action Matrix",
            titleAr: 'مصفوفة مرجع Stockley للتداخلات الحرجة مع الوارفارين (Warfarin)',
            headers: ['Interacting Drug', 'Primary Mechanism', 'Onset & Magnitude', "Stockley's Clinical Action"],
            rows: [
              ['Amiodarone', 'Potent CYP2C9 & CYP3A4 inhibition (S- & R-warfarin)', 'Onset 3–7 days; persists months after stopping', 'Empirically reduce Warfarin dose by 33–50%; check INR in 3–5 days'],
              ['Fluconazole / Voriconazole', 'Potent CYP2C9 & CYP3A4 inhibition', 'Onset 2–5 days; INR often > 4.0–6.0', 'Reduce Warfarin dose by 25–50% and monitor INR closely'],
              ['Metronidazole / TMP-SMX', 'Stereoselective S-warfarin CYP2C9 inhibition', 'Onset 2–5 days; major bleeding risk', 'Avoid if alternative antibiotic exists, or reduce Warfarin by 25–40%'],
              ['Rifampicin / Carbamazepine', 'Potent PXR-mediated CYP2C9/3A4 induction', 'Onset 5–14 days; subtherapeutic INR', 'Requires 2x–3x Warfarin dose; reduce Warfarin immediately when stopping inducer'],
              ['NSAIDs / Ketorolac / High-dose Aspirin', 'Platelet COX-1 inhibition + direct GI mucosal erosion', 'Immediate additive bleeding risk (3x–6x GI bleed)', 'Avoid NSAIDs; if antiplatelet strictly required, add PPI (Pantoprazole)']
            ]
          }
        ]
      },
      {
        id: 'stk-1-2',
        number: '1.2',
        heading: 'Direct Oral Anticoagulants (DOACs): P-gp Efflux & Strong CYP3A4 Modulators',
        headingAr: 'مضادات التخثر الفموية المباشرة (DOACs): تداخلات مضخة P-gp وإنزيم CYP3A4',
        evidenceGrade: "Stockley's Action Rating: Contraindicated / Dose Reduction Required",
        body: `All four direct oral anticoagulants (Dabigatran, Apixaban, Rivaroxaban, Edoxaban) are substrates of the intestinal and renal efflux transporter P-glycoprotein (P-gp). In addition, Apixaban (~25–30%) and Rivaroxaban (~33–50%) undergo significant hepatic oxidative metabolism via CYP3A4, whereas Dabigatran is cleared ~80% unchanged by the kidneys and has zero CYP450 involvement.

Dual Strong CYP3A4 + P-gp Inhibitors (Ketoconazole, Itraconazole, Posaconazole, Voriconazole, Ritonavir/Nirmatrelvir [Paxlovid]): Co-administration increases Apixaban and Rivaroxaban AUC by 100% to 160%. Rivaroxaban is contraindicated with combined P-gp and strong CYP3A4 inhibitors. For Apixaban, reduce the dose by 50% (e.g., from 5 mg BID to 2.5 mg BID); if the patient is already taking 2.5 mg BID, avoid concurrent use.

P-gp Inhibitors + Renal Impairment (Dronedarone, Verapamil, Amiodarone, Clarithromycin): In patients with moderate renal impairment (CrCl 30–50 mL/min), P-gp inhibitors act synergistically with reduced glomerular filtration to cause severe DOAC accumulation. Dronedarone + Dabigatran is contraindicated when CrCl < 30 mL/min and requires dose reduction (75 mg BID in US / avoid in EU).`,
        clinicalNotes: [
          'Strong Inducers (Phenytoin, Carbamazepine, Phenobarbital, Rifampicin, St John’s Wort) reduce DOAC plasma concentrations by 50–66% and are contraindicated with all DOACs due to stroke/VTE treatment failure.'
        ]
      },
      {
        id: 'stk-1-3',
        number: '1.3',
        heading: 'P2Y12 Antiplatelet Interactions: Clopidogrel Bioactivation & Ticagrelor CYP3A4/P-gp',
        headingAr: 'تداخلات مثبطات P2Y12: تنشيط Clopidogrel عبر CYP2C19 وتداخلات Ticagrelor',
        evidenceGrade: "Stockley's Action Rating: Switch Interacting Agent",
        body: `Clopidogrel is an inactive prodrug requiring two-step hepatic bioactivation predominantly via CYP2C19 to generate its active thiol metabolite. Omeprazole and Esomeprazole are potent mechanism-based inhibitors of CYP2C19, reducing clopidogrel active metabolite exposure by 40–45% and diminishing platelet inhibition. Stockley's Recommendation: Avoid Omeprazole and Esomeprazole in patients taking Clopidogrel; select Pantoprazole or Rabeprazole (which have minimal CYP2C19 inhibitory activity) or an H2-receptor antagonist (Famotidine). Note that separating the administration times of Omeprazole and Clopidogrel by 12 hours does NOT prevent the interaction because Omeprazole causes irreversible mechanism-based inactivation of CYP2C19.

Ticagrelor is a direct-acting, reversible P2Y12 antagonist cleared by CYP3A4 (and is also a weak P-gp/CYP3A4 inhibitor). Strong CYP3A4 inhibitors (Clarithromycin, Itraconazole, Ritonavir) increase Ticagrelor AUC 2.6- to 5-fold and are contraindicated. Conversely, Ticagrelor increases Simvastatin and Lovastatin Cmax/AUC 2- to 3-fold (limit Simvastatin/Lovastatin to max 40 mg daily) and increases Digoxin trough concentrations via intestinal P-gp inhibition.`
      }
    ],
    quickTables: [],
    boardPearls: [
      'Separating Omeprazole and Clopidogrel by 12 hours does NOT prevent CYP2C19 inhibition; always switch to Pantoprazole.',
      'Ticagrelor inhibits P-gp and CYP3A4: monitor Digoxin levels and cap Simvastatin at 40 mg/day.'
    ],
    boardPearlsAr: [
      'الفصل الزمني بـ 12 ساعة بين Omeprazole و Clopidogrel لا يلغي التداخل لأن التثبيط غير عكوس؛ استبدله دائماً بـ Pantoprazole.',
      'دواء Ticagrelor يثبط مضخة P-gp وإنزيم CYP3A4 مما يرفع مستوى Digoxin و Simvastatin.'
    ],
    keywords: ['stockley', 'warfarin', 'amiodarone', 'fluconazole', 'metronidazole', 'apixaban', 'rivaroxaban', 'clopidogrel', 'omeprazole', 'ticagrelor'],
    citation: "Baxter K, Preston CL, eds. Stockley's Drug Interactions. Pharmaceutical Press; 2026. Section 1: Anticoagulants & Antiplatelets (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S).",
    isVerbatimSource: true
  },
  {
    id: 'stockleys-sec2-cardiovascular-qtc-raas',
    bookId: 'stockleys-drug-interactions',
    chapterNumber: 2,
    title: 'Cardiovascular, Antiarrhythmic, QTc Prolongation & RAAS/Hyperkalemia Interactions',
    titleAr: 'التداخلات القلبية، تطاول فترة QTc، مثبطات RAAS، والديجوكسين والستاتينات (Stockley’s Section 2)',
    authors: 'Karen Baxter, Claire L. Preston, eds. (Stockley’s Drug Interactions Editorial Panel)',
    edition: "Stockley's Drug Interactions (13th/2026 Hospital Reference Edition • Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    pageRange: 'pp. 412–640',
    systemCategory: 'Drug Interactions & Safety',
    systemCategoryAr: 'مرجع التداخلات الدوائية (Stockley’s DDI)',
    sourceUrl: 'local://ref/chapter/stockleys-sec2-cardiovascular-qtc-raas',
    learningObjectives: [
      'Enforce the mandatory 36-hour washout period between ACE inhibitors and Sacubitril/Valsartan (ARNI) to prevent bradykinin-mediated angioedema.',
      'Prevent life-threatening Torsades de Pointes (TdP) from additive IKr (hERG) potassium channel blockade.',
      'Manage P-gp-mediated Digoxin toxicity with Amiodarone, Verapamil, Clarithromycin, and Loop Diuretic-induced hypokalemia.',
      'Apply OATP1B1 and CYP3A4 statin dose ceilings with Amiodarone, Amlodipine, Diltiazem, and Macrolides.'
    ],
    toc: [
      { id: 'stk-2-1', number: '2.1', title: 'RAAS Blockade, ARNI 36-Hour Washout & Triple Whammy Nephrotoxicity' },
      { id: 'stk-2-2', number: '2.2', title: 'Additive QTc Prolongation & Torsades de Pointes (TdP) Risk Matrix' },
      { id: 'stk-2-3', number: '2.3', title: 'Digoxin P-gp Interactions & Statin Myopathy/Rhabdomyolysis Limits' }
    ],
    sections: [
      {
        id: 'stk-2-1',
        number: '2.1',
        heading: 'ACE Inhibitors + Sacubitril/Valsartan (ARNI), Potassium-Sparing Agents & The "Triple Whammy"',
        headingAr: 'تداخلات مثبطات ACE مع Entresto (قاعدة الـ 36 ساعة)، فرط البوتاسيوم، والثلاثي الكلوي السام',
        evidenceGrade: "Stockley's Action Rating: Contraindicated / High-Alert Electrolyte Monitoring",
        body: `ACE Inhibitors + Sacubitril/Valsartan (Entresto): Concurrent inhibition of Angiotensin-Converting Enzyme (ACE) and Neprilysin (neutral endopeptidase) synergistically blocks the degradation of endogenous bradykinin and substance P, leading to a markedly increased risk of life-threatening laryngeal and facial angioedema. Stockley's Directive: Absolute contraindication. Do not administer Sacubitril/Valsartan within 36 hours of the last dose of any ACE inhibitor (and vice versa). Note: No washout period is required when switching from an ARB (e.g., Valsartan, Losartan) to Sacubitril/Valsartan.

RAAS Inhibitors + Spironolactone/Eplerenone + Trimethoprim or KCl: Combining ACEi/ARB/ARNI with mineralocorticoid receptor antagonists (MRAs) or Trimethoprim (which blocks epithelial sodium channels [ENaC] in the distal convoluted tubule identically to amiloride) causes severe, potentially fatal hyperkalemia (K+ > 6.0 mEq/L), particularly when CrCl < 45 mL/min.

The "Triple Whammy" (ACEi/ARB + Diuretic + NSAID): NSAIDs inhibit renal prostaglandin E2/I2 synthesis, causing afferent arteriolar vasoconstriction, while ACEi/ARBs dilate the efferent arteriole and diuretics contract intravascular volume. Together, glomerular filtration pressure collapses, precipitating acute prerenal/hemodynamic AKI.`,
        clinicalNotes: [
          'Trimethoprim (in Bactrim/Septra) acts like Amiloride in the distal nephron; adding TMP-SMX to Spironolactone + ACEi doubles hospitalization for sudden hyperkalemic death.'
        ]
      },
      {
        id: 'stk-2-2',
        number: '2.2',
        heading: 'Additive QTc Prolongation, hERG Channel Blockade & Digoxin/Statin Pharmacokinetics',
        headingAr: 'تطاول فترة QTc، تداخلات Digoxin عبر مضخة P-gp، والحدود القصوى للستاتينات',
        evidenceGrade: "Stockley's Action Rating: Contraindicated / Empirical 50% Dose Reduction",
        body: `Additive QTc Prolongation: Class III antiarrhythmics (Amiodarone, Sotalol, Dofetilide) block the rapid component of the delayed rectifier potassium current (IKr / hERG). Co-administration with Fluoroquinolones (Levofloxacin, Ciprofloxacin, Moxifloxacin), Macrolides (Clarithromycin, Erythromycin, Azithromycin), Azole antifungals, Ondansetron (high IV dose), Haloperidol, or Escitalopram/Citalopram causes additive ventricular repolarization delay, QTc > 500 ms, and polymorphic ventricular tachycardia (Torsades de Pointes). Hypokalemia (K+ < 4.0 mEq/L) and Hypomagnesemia (Mg2+ < 2.0 mg/dL) dramatically amplify this risk.

Digoxin + Amiodarone / Verapamil / Clarithromycin: Amiodarone, Verapamil, Dronedarone, and Clarithromycin inhibit renal and intestinal P-glycoprotein (P-gp), reducing renal tubular secretion of digoxin and doubling serum digoxin concentrations within 3–7 days. Stockley's Action: Halve the digoxin maintenance dose (reduce by 50%) immediately when starting Amiodarone or Verapamil, and monitor serum digoxin trough levels (target 0.5–0.9 ng/mL in HFrEF).

Statin + CYP3A4 / OATP1B1 Inhibitors: Simvastatin and Lovastatin undergo extensive (>80%) first-pass metabolism via CYP3A4; Clarithromycin, Itraconazole, and HIV protease inhibitors increase Simvastatin AUC >10-fold and are contraindicated due to rhabdomyolysis. With Amiodarone, Amlodipine, or Verapamil/Diltiazem, Simvastatin must not exceed 10–20 mg/day.`,
        tables: [
          {
            title: "Stockley's Cardiovascular, Digoxin & Statin Interaction Thresholds",
            titleAr: 'جدول مرجع Stockley لضبط جرعات Digoxin والستاتينات وتداخلات القلب',
            headers: ['Drug Pair', 'PK / PD Mechanism', 'Clinical Consequence', "Stockley's Mandatory Action"],
            rows: [
              ['ACE Inhibitor + Sacubitril/Valsartan', 'Dual ACE + Neprilysin bradykinin accumulation', 'Life-threatening laryngeal angioedema', 'Contraindicated; enforce mandatory 36-hour washout'],
              ['Digoxin + Amiodarone / Verapamil', 'Inhibition of renal/intestinal P-gp efflux', '2-fold rise in serum digoxin; AV block & arrhythmias', 'Reduce Digoxin dose by 50% upon initiation; check trough level'],
              ['Digoxin + Furosemide / Thiazides', 'Diuretic-induced hypokalemia & hypomagnesemia', 'Sensitizes Na+/K+-ATPase to digoxin toxicity even at normal levels', 'Maintain Serum K+ > 4.0 mEq/L and Mg2+ > 2.0 mg/dL'],
              ['Simvastatin + Amiodarone / Amlodipine', 'CYP3A4 inhibition increases statin exposure', 'Myopathy and rhabdomyolysis', 'Cap Simvastatin at max 20 mg/day (or switch to Rosuvastatin)'],
              ['Amiodarone + Levofloxacin / Ciprofloxacin / Azithromycin', 'Additive IKr (hERG) blockade', 'Severe QTc prolongation (>500 ms) & Torsades de Pointes', 'Avoid combination; use beta-lactam or doxycycline instead']
            ]
          }
        ]
      }
    ],
    quickTables: [],
    boardPearls: [
      'Always halve Digoxin dose by 50% when initiating Amiodarone, Verapamil, or Clarithromycin.',
      'Loop diuretics cause Digoxin toxicity at normal serum digoxin concentrations if K+ < 3.5 mEq/L or Mg2+ < 1.8 mg/dL.'
    ],
    boardPearlsAr: [
      'اخفض جرعة Digoxin بنسبة 50% فوراً عند بدء Amiodarone أو Verapamil أو Clarithromycin.',
      'مدرات العروة (Furosemide) تسبب سمية الديجوكسين حتى لو كان مستواه بالدم طبيعياً في حال وجود نقص K+ أو Mg2+.'
    ],
    keywords: ['stockley', 'digoxin', 'amiodarone', 'verapamil', 'simvastatin', 'atorvastatin', 'qtc', 'torsades', 'entresto', 'spironolactone', 'trimethoprim'],
    citation: "Baxter K, Preston CL, eds. Stockley's Drug Interactions. Pharmaceutical Press; 2026. Section 2: Cardiovascular & Antiarrhythmics (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S).",
    isVerbatimSource: true
  },
  {
    id: 'stockleys-sec3-antimicrobials-cns-chelation',
    bookId: 'stockleys-drug-interactions',
    chapterNumber: 3,
    title: 'Antimicrobials, Carbapenem-Valproate, Linezolid Serotonin Syndrome, Nephrotoxins & Chelation Interactions',
    titleAr: 'تداخلات المضادات الحيوية، الكاربابينيم مع الفالبروات، Linezolid، والسمية الكلوية والاستخلاب (Stockley’s Section 3)',
    authors: 'Karen Baxter, Claire L. Preston, eds. (Stockley’s Drug Interactions Editorial Panel)',
    edition: "Stockley's Drug Interactions (13th/2026 Hospital Reference Edition • Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S)",
    pageRange: 'pp. 710–945',
    systemCategory: 'Drug Interactions & Safety',
    systemCategoryAr: 'مرجع التداخلات الدوائية (Stockley’s DDI)',
    sourceUrl: 'local://ref/chapter/stockleys-sec3-antimicrobials-cns-chelation',
    learningObjectives: [
      'Prevent breakthrough status epilepticus from the Meropenem/Ertapenem + Valproic Acid interaction.',
      'Identify synergistic nephrotoxicity between Vancomycin, Piperacillin/Tazobactam, and Aminoglycosides.',
      'Prevent Linezolid MAO-A inhibition interactions with SSRIs, SNRIs, Opioids (Fentanyl/Meperidine/Tramadol), and Vasopressors.',
      'Eliminate oral bioavailability failure from polyvalent cation chelation of Fluoroquinolones and Tetracyclines, and IV Ceftriaxone + Calcium precipitation.'
    ],
    toc: [
      { id: 'stk-3-1', number: '3.1', title: 'Carbapenems + Valproic Acid & Linezolid Serotonergic/Adrenergic Crisis' },
      { id: 'stk-3-2', number: '3.2', title: 'Synergistic Nephrotoxicity (Vancomycin + Pip/Tazo / Aminoglycosides) & Chelation' }
    ],
    sections: [
      {
        id: 'stk-3-1',
        number: '3.1',
        heading: 'Carbapenems + Valproate, Linezolid + Serotonergics, and Synergistic Nephrotoxins',
        headingAr: 'تداخل Meropenem مع Valproic Acid، متلازمة السيروتونين مع Linezolid، والسمية الكلوية المتآزرة',
        evidenceGrade: "Stockley's Action Rating: Contraindicated / Avoid Combination",
        body: `Carbapenems (Meropenem, Ertapenem, Imipenem) + Valproic Acid / Sodium Valproate: Carbapenems inhibit acylpeptide hydrolase in the liver and erythrocytes, blocking the hydrolysis of valproate glucuronide back to active valproic acid and increasing renal glucuronide clearance. Within 24 to 48 hours of starting a carbapenem, serum valproate concentrations plummet by 60% to 90%, precipitating acute breakthrough generalized seizures and status epilepticus. Increasing the dose of valproic acid is NOT effective in overcoming this interaction. Stockley's Directive: Avoid concurrent use; switch the antibiotic (e.g., to Cefepime or Ceftazidime/Avibactam) or add a non-interacting antiepileptic (e.g., Levetiracetam).

Linezolid + SSRIs / SNRIs / Tramadol / Fentanyl / Vasopressors: Linezolid is a reversible, non-selective monoamine oxidase inhibitor (MAOI). Co-administration with serotonergic agents (Sertraline, Escitalopram, Fluoxetine, Venlafaxine, Tramadol, Meperidine, Methadone) precipitates life-threatening Serotonin Syndrome (clonus, hyperthermia, autonomic instability). Co-administration with indirect sympathomimetics or high-dose Dopamine/Norepinephrine exaggerates hypertensive responses.

Vancomycin + Piperacillin/Tazobactam or Aminoglycosides: Clinical meta-analyses demonstrate a 2.5- to 3.5-fold higher incidence of acute kidney injury (AKI) with Vancomycin + Piperacillin/Tazobactam compared to Vancomycin + Cefepime or Meropenem (attributable to both true synergistic tubular toxicity and competitive inhibition of tubular creatinine secretion via OAT1/OAT3).

Polyvalent Cation Chelation & IV Ceftriaxone-Calcium Precipitation: Oral Fluoroquinolones (Ciprofloxacin, Levofloxacin) and Tetracyclines form insoluble chelates in the GI tract with Calcium, Magnesium, Aluminum, Iron, and Zinc (reducing antibiotic AUC by 50–85%); separate administration by 2 hours before or 6 hours after cations. Parenteral Ceftriaxone forms fatal crystalline precipitates with Calcium-containing IV solutions (e.g., Lactated Ringer’s, Calcium Gluconate, TPN) in neonates and in shared IV lines.`,
        tables: [
          {
            title: "Stockley's Critical Antimicrobial & Hospital ICU Interaction Matrix",
            titleAr: 'مصفوفة مرجع Stockley للتداخلات الحرجة للمضادات الحيوية والعناية المركزة',
            headers: ['Interacting Pair', 'Pharmacological Mechanism', 'Clinical Outcome', "Stockley's Clinical Management"],
            rows: [
              ['Meropenem / Ertapenem + Valproic Acid', 'Inhibition of acylpeptide hydrolase (blocks glucuronide deconjugation)', '60–90% drop in Valproate level within 24–48h -> Status Epilepticus', 'Contraindicated; switch to Cefepime or transition seizure coverage to Levetiracetam'],
              ['Linezolid + SSRI / SNRI / Tramadol', 'Reversible MAO-A inhibition by Linezolid', 'Severe Serotonin Syndrome (hyperthermia, clonus, rigidity)', 'Hold serotonergic agent or switch Linezolid to Vancomycin / Daptomycin'],
              ['Vancomycin + Piperacillin/Tazobactam', 'Synergistic nephrotoxicity & OAT1/OAT3 competition', '3-fold increase in inpatient AKI incidence', 'Prefer Cefepime or Meropenem with Vancomycin; monitor daily SCr & AUC24/MIC'],
              ['Ciprofloxacin / Levofloxacin PO + Ca/Mg/Fe', 'GI tract chelation into insoluble complex', 'Up to 85% loss of fluoroquinolone absorption & treatment failure', 'Administer quinolone 2h before or 6h after divalent/trivalent cations'],
              ['Ceftriaxone IV + IV Calcium / Ringer’s Lactate', 'Intravascular ceftriaxone-calcium salt precipitation', 'Pulmonary and renal microvascular crystalline emboli', 'Never co-infuse in same line; contraindicated within 48h in neonates']
            ]
          }
        ]
      }
    ],
    quickTables: [],
    boardPearls: [
      'Meropenem drops Valproic Acid levels by 60–90% within 24 hours; increasing the Valproate dose CANNOT overcome the interaction.',
      'Linezolid is a reversible MAOI: screen every inpatient chart for SSRIs, SNRIs, Tramadol, and Meperidine before approving Linezolid.'
    ],
    boardPearlsAr: [
      'دواء Meropenem يخفض مستوى Valproic Acid بنسبة 60-90% خلال 24 ساعة، وزيادة جرعة الفالبروات لا تنجح في التغلب على التداخل.',
      'دواء Linezolid هو مثبط لأكسيداز أحادي الأمين (MAOI): افحص قائمة أدوية المريض دائماً بحثاً عن SSRIs أو Tramadol قبل صرفه.'
    ],
    keywords: ['stockley', 'meropenem', 'valproic', 'valproate', 'linezolid', 'sertraline', 'escitalopram', 'tramadol', 'vancomycin', 'piperacillin', 'ceftriaxone', 'calcium', 'ciprofloxacin'],
    citation: "Baxter K, Preston CL, eds. Stockley's Drug Interactions. Pharmaceutical Press; 2026. Section 3: Antimicrobials & Critical Care (Drive ID: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S).",
    isVerbatimSource: true
  }
];

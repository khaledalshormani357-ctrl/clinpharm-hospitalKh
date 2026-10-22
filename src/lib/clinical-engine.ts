/**
 * Rule-based medication-safety screening & clinical pharmacokinetic calculations (pure functions).
 *
 * IMPORTANT — scope & limits
 *  - The rule tables below are a small, EDUCATIONAL seed set. They are NOT a
 *    substitute for a licensed interaction database (Lexicomp, Micromedex, BNF...).
 *  - "No alert" never means "no interaction". Every alert requires verification
 *    against the original source and the local protocol.
 *  - Extend the tables under pharmacist/supervisor review only.
 */
import { isValidEvidenceReference } from "./clinical";
import { Patient, DrugInteractionAlert } from "../types/clinical";
import { DRUG_INTERACTIONS_DB } from "./mockData";

export type Medication = {
  name: string;
  doseMg?: number;
  frequency?: string;
  route?: string;
  indication?: string;
  highAlert?: boolean;
  /** CrCl/eGFR (mL/min) below which this drug needs renal review (from your reference). */
  renalThreshold?: number;
  raw?: string;
};

export type PatientSnapshot = {
  egfr: number | null;
  allergies: string[];
  diagnoses: string[];
};

export type DrugRelatedProblem = {
  code: "INTERACTION" | "CONTRAINDICATION" | "DOSE" | "DUPLICATION" | "OMISSION" | "MONITORING";
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  rule?: string;
};

export const VERIFY_NOTE =
  "Verify in a licensed drug reference and the local protocol before acting.";

// ---------------------------------------------------------------- name helpers
export function normalizeDrugName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------- drug classes
const DRUG_CLASSES: Record<string, string[]> = {
  nsaid: [
    "ibuprofen",
    "naproxen",
    "diclofenac",
    "ketorolac",
    "indomethacin",
    "meloxicam",
    "celecoxib",
    "etoricoxib",
  ],
  vka: ["warfarin", "acenocoumarol"],
  doac: ["rivaroxaban", "apixaban", "dabigatran", "edoxaban"],
  antiplatelet: ["aspirin", "clopidogrel", "ticagrelor", "prasugrel"],
  ace_inhibitor: [
    "captopril",
    "enalapril",
    "lisinopril",
    "ramipril",
    "perindopril",
    "benazepril",
  ],
  arb: [
    "losartan",
    "valsartan",
    "candesartan",
    "irbesartan",
    "telmisartan",
    "olmesartan",
  ],
  k_sparing: ["spironolactone", "eplerenone", "amiloride", "triamterene"],
  potassium: ["potassium chloride"],
  nitrate: [
    "isosorbide mononitrate",
    "isosorbide dinitrate",
    "glyceryl trinitrate",
    "nitroglycerin",
  ],
  pde5: ["sildenafil", "tadalafil", "vardenafil"],
  ssri: [
    "fluoxetine",
    "sertraline",
    "paroxetine",
    "citalopram",
    "escitalopram",
    "fluvoxamine",
  ],
  statin: [
    "atorvastatin",
    "rosuvastatin",
    "simvastatin",
    "pravastatin",
    "lovastatin",
    "fluvastatin",
    "pitavastatin",
  ],
  glucose_lowering: [
    "metformin",
    "insulin",
    "gliclazide",
    "glimepiride",
    "glibenclamide",
    "glyburide",
    "sitagliptin",
    "linagliptin",
    "empagliflozin",
    "dapagliflozin",
    "canagliflozin",
    "liraglutide",
    "semaglutide",
    "dulaglutide",
    "pioglitazone",
  ],
  penicillin: [
    "penicillin",
    "amoxicillin",
    "ampicillin",
    "piperacillin",
    "flucloxacillin",
    "amoxicillin-clavulanate",
    "co-amoxiclav",
  ],
  sulfonamide_antibiotic: [
    "sulfamethoxazole",
    "trimethoprim-sulfamethoxazole",
    "co-trimoxazole",
    "cotrimoxazole",
  ],
};

const DUPLICATION_CLASSES = [
  "nsaid",
  "ace_inhibitor",
  "arb",
  "ssri",
  "statin",
  "doac",
  "vka",
  "nitrate",
  "pde5",
];

const HIGH_ALERT_DEFAULT = [
  "insulin",
  "heparin",
  "enoxaparin",
  "warfarin",
  "apixaban",
  "rivaroxaban",
  "dabigatran",
  "methotrexate",
  "morphine",
  "fentanyl",
  "hydromorphone",
  "oxycodone",
  "potassium chloride",
];

const ALLERGY_ALIASES: Record<string, string> = {
  penicillin: "penicillin",
  penicillins: "penicillin",
  "beta-lactam": "penicillin",
  sulfa: "sulfonamide_antibiotic",
  sulfonamide: "sulfonamide_antibiotic",
  sulfonamides: "sulfonamide_antibiotic",
};

export function drugClassesOf(name: string): string[] {
  const n = normalizeDrugName(name);
  return Object.entries(DRUG_CLASSES)
    .filter(([, members]) => members.some((m) => n === m || n.startsWith(`${m} `)))
    .map(([cls]) => cls);
}

type InteractionRule = {
  id: string;
  a: string; // drug name or class:<class>
  b: string;
  severity: "high" | "medium";
  title: string;
  detail: string;
};

const INTERACTION_RULES: InteractionRule[] = [
  {
    id: "vka-nsaid",
    a: "class:vka",
    b: "class:nsaid",
    severity: "high",
    title: "Bleeding-risk interaction",
    detail: "Warfarin-type anticoagulant combined with an NSAID increases bleeding risk.",
  },
  {
    id: "doac-nsaid",
    a: "class:doac",
    b: "class:nsaid",
    severity: "high",
    title: "Bleeding-risk interaction",
    detail: "Direct oral anticoagulant combined with an NSAID increases bleeding risk.",
  },
  {
    id: "vka-antiplatelet",
    a: "class:vka",
    b: "class:antiplatelet",
    severity: "medium",
    title: "Additive bleeding risk",
    detail: "Anticoagulant plus antiplatelet therapy: confirm the indication and monitoring plan.",
  },
  {
    id: "vka-inr-up",
    a: "class:vka",
    b: "metronidazole",
    severity: "high",
    title: "INR elevation risk",
    detail: "Metronidazole can markedly increase the effect of warfarin.",
  },
  {
    id: "vka-fluconazole",
    a: "class:vka",
    b: "fluconazole",
    severity: "high",
    title: "INR elevation risk",
    detail: "Fluconazole can markedly increase the effect of warfarin.",
  },
  {
    id: "vka-cotrimoxazole",
    a: "class:vka",
    b: "class:sulfonamide_antibiotic",
    severity: "high",
    title: "INR elevation risk",
    detail: "Sulfamethoxazole-containing antibiotics can markedly increase the effect of warfarin.",
  },
  {
    id: "vka-amiodarone",
    a: "class:vka",
    b: "amiodarone",
    severity: "high",
    title: "INR elevation risk",
    detail: "Amiodarone can increase the effect of warfarin; close INR monitoring is needed.",
  },
  {
    id: "ace-arb",
    a: "class:ace_inhibitor",
    b: "class:arb",
    severity: "high",
    title: "Dual RAS blockade",
    detail: "ACE inhibitor plus ARB: risk of hyperkalaemia, hypotension and acute kidney injury.",
  },
  {
    id: "raas-ksparing",
    a: "class:ace_inhibitor",
    b: "class:k_sparing",
    severity: "medium",
    title: "Hyperkalaemia risk",
    detail: "ACE inhibitor with a potassium-sparing agent: monitor potassium and renal function.",
  },
  {
    id: "arb-ksparing",
    a: "class:arb",
    b: "class:k_sparing",
    severity: "medium",
    title: "Hyperkalaemia risk",
    detail: "ARB with a potassium-sparing agent: monitor potassium and renal function.",
  },
  {
    id: "raas-potassium",
    a: "class:ace_inhibitor",
    b: "class:potassium",
    severity: "medium",
    title: "Hyperkalaemia risk",
    detail: "ACE inhibitor with potassium supplements: monitor potassium.",
  },
  {
    id: "arb-potassium",
    a: "class:arb",
    b: "class:potassium",
    severity: "medium",
    title: "Hyperkalaemia risk",
    detail: "ARB with potassium supplements: monitor potassium.",
  },
  {
    id: "ace-nsaid",
    a: "class:ace_inhibitor",
    b: "class:nsaid",
    severity: "medium",
    title: "Renal-function risk",
    detail: "ACE inhibitor with an NSAID can reduce renal function and blunt the antihypertensive effect.",
  },
  {
    id: "arb-nsaid",
    a: "class:arb",
    b: "class:nsaid",
    severity: "medium",
    title: "Renal-function risk",
    detail: "ARB with an NSAID can reduce renal function and blunt the antihypertensive effect.",
  },
  {
    id: "nitrate-pde5",
    a: "class:nitrate",
    b: "class:pde5",
    severity: "high",
    title: "Severe hypotension (contraindicated)",
    detail: "Nitrate with a PDE-5 inhibitor is contraindicated.",
  },
  {
    id: "simva-clarithro",
    a: "simvastatin",
    b: "clarithromycin",
    severity: "high",
    title: "Rhabdomyolysis risk",
    detail: "Clarithromycin markedly raises simvastatin exposure.",
  },
  {
    id: "simva-itraconazole",
    a: "simvastatin",
    b: "itraconazole",
    severity: "high",
    title: "Rhabdomyolysis risk",
    detail: "Itraconazole markedly raises simvastatin exposure.",
  },
  {
    id: "mtx-tmp",
    a: "methotrexate",
    b: "class:sulfonamide_antibiotic",
    severity: "high",
    title: "Myelosuppression risk",
    detail: "Methotrexate with trimethoprim/sulfamethoxazole can cause severe bone-marrow suppression.",
  },
  {
    id: "linezolid-ssri",
    a: "linezolid",
    b: "class:ssri",
    severity: "high",
    title: "Serotonin syndrome risk",
    detail: "Linezolid is a weak MAO inhibitor; combining with SSRIs risks serotonin syndrome.",
  },
];

function matches(drugNames: string[], key: string): string[] {
  if (key.startsWith("class:")) {
    const members = DRUG_CLASSES[key.slice(6)] ?? [];
    return drugNames.filter((n) => members.some((m) => n === m || n.startsWith(`${m} `)));
  }
  return drugNames.filter((n) => n === key || n.startsWith(`${key} `));
}

export function findInteractions(medicationNames: string[]): DrugRelatedProblem[] {
  const names = Array.from(new Set(medicationNames.map(normalizeDrugName).filter(Boolean)));
  const out: DrugRelatedProblem[] = [];
  for (const rule of INTERACTION_RULES) {
    const left = matches(names, rule.a);
    const right = matches(names, rule.b);
    if (left.length && right.length) {
      out.push({
        code: "INTERACTION",
        severity: rule.severity,
        title: rule.title,
        detail: `${left[0]} + ${right[0]}: ${rule.detail} ${VERIFY_NOTE}`,
        rule: rule.id,
      });
    }
  }
  return out;
}

const severityRank = { high: 0, medium: 1, low: 2 } as const;

export function detectDrugRelatedProblems(
  medications: Medication[],
  patient: PatientSnapshot
): DrugRelatedProblem[] {
  const problems: DrugRelatedProblem[] = [];
  const named = medications.filter((m) => normalizeDrugName(m.name));
  const names = named.map((m) => normalizeDrugName(m.name));

  problems.push(...findInteractions(names));

  // Exact duplicates (reported once per drug) and same-class duplication.
  const counts = new Map<string, number>();
  names.forEach((n) => counts.set(n, (counts.get(n) ?? 0) + 1));
  counts.forEach((count, name) => {
    if (count > 1) {
      problems.push({
        code: "DUPLICATION",
        severity: "medium",
        title: "Therapeutic duplication",
        detail: `${name} is listed ${count} times. Confirm whether this is intended.`,
        rule: "duplicate-drug",
      });
    }
  });

  for (const cls of DUPLICATION_CLASSES) {
    const members = Array.from(new Set(matches(names, `class:${cls}`)));
    if (members.length > 1) {
      problems.push({
        code: "DUPLICATION",
        severity: "medium",
        title: "Same-class duplication",
        detail: `Multiple agents from the same class (${cls.replace("_", " ")}): ${members.join(", ")}.`,
        rule: `class-duplication-${cls}`,
      });
    }
  }

  // Renal review — only for drugs that carry an explicit threshold from the user's reference.
  const withThreshold = named.filter((m) => m.renalThreshold !== undefined);
  if (withThreshold.length > 0 && patient.egfr === null) {
    problems.push({
      code: "MONITORING",
      severity: "medium",
      title: "Renal function unknown",
      detail: `Renal function is needed to review: ${withThreshold.map((m) => m.name).join(", ")}.`,
      rule: "renal-unknown",
    });
  } else if (patient.egfr !== null) {
    withThreshold
      .filter((m) => patient.egfr! < (m.renalThreshold ?? 0))
      .forEach((m) =>
        problems.push({
          code: "DOSE",
          severity: "high",
          title: "Renal dose review",
          detail: `${m.name}: kidney function (${patient.egfr} mL/min) is below the review threshold (${m.renalThreshold}). Check the drug-specific dosing reference.`,
          rule: "renal-threshold",
        })
      );
  }

  // High-alert medications.
  named
    .filter(
      (m) =>
        m.highAlert ||
        HIGH_ALERT_DEFAULT.some(
          (h) =>
            normalizeDrugName(m.name) === h || normalizeDrugName(m.name).startsWith(`${h} `)
        )
    )
    .forEach((m) =>
      problems.push({
        code: "MONITORING",
        severity: "high",
        title: "High-alert medication",
        detail: `${m.name} requires independent verification and explicit monitoring parameters.`,
        rule: "high-alert",
      })
    );

  // Allergies: exact name or class (cross-reactivity is NOT evaluated).
  for (const rawAllergy of patient.allergies) {
    const allergy = normalizeDrugName(rawAllergy);
    if (!allergy || ["nkda", "none", "no known allergies", "nka"].includes(allergy)) continue;
    const cls = ALLERGY_ALIASES[allergy] ?? (DRUG_CLASSES[allergy] ? allergy : undefined);
    const hit = names.find(
      (n) =>
        n === allergy ||
        n.startsWith(`${allergy} `) ||
        (cls && matches([n], `class:${cls}`).length > 0)
    );
    if (hit) {
      problems.push({
        code: "CONTRAINDICATION",
        severity: "high",
        title: "Allergy conflict",
        detail: `${hit} matches the documented allergy "${rawAllergy.trim()}". Reconcile before dispensing/administration.`,
        rule: "allergy-match",
      });
    }
  }

  // Omission: diabetes without any glucose-lowering therapy.
  const hasDiabetes = patient.diagnoses.some((d) => /diabet|سكري|سكر/i.test(d));
  if (hasDiabetes && matches(names, "class:glucose_lowering").length === 0) {
    problems.push({
      code: "OMISSION",
      severity: "medium",
      title: "Untreated indication",
      detail:
        "Diabetes is documented without an obvious glucose-lowering therapy; verify intent and contraindications.",
      rule: "diabetes-omission",
    });
  }

  return problems.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
}

// ---------------------------------------------------------------- evidence & documentation
export function evidenceGate(
  sourceUrl: string | undefined,
  evidenceLevel: string | undefined
) {
  return isValidEvidenceReference(sourceUrl, evidenceLevel);
}

export const EVIDENCE_LEVELS = [
  "Guideline / consensus statement",
  "Systematic review / meta-analysis",
  "Randomised controlled trial",
  "Cohort / case-control study",
  "Case series / expert opinion",
  "Regulatory label / safety communication",
] as const;

export type SoapInput = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  source?: string;
};

export function missingSoapSections(input: SoapInput): string[] {
  const missing: string[] = [];
  if (!input.subjective.trim()) missing.push("Subjective");
  if (!input.objective.trim()) missing.push("Objective");
  if (!input.assessment.trim()) missing.push("Assessment");
  if (!input.plan.trim()) missing.push("Plan");
  return missing;
}

export function buildSoapNote(input: SoapInput) {
  return [
    `S: ${input.subjective.trim()}`,
    `O: ${input.objective.trim()}`,
    `A: ${input.assessment.trim()}`,
    `P: ${input.plan.trim()}`,
    input.source?.trim()
      ? `Evidence: ${input.source.trim()}`
      : "Evidence: Insufficient evidence / source not available.",
  ].join("\n\n");
}

// ---------------------------------------------------------------- medication lists
const FREQUENCY =
  /\b(q\d{1,2}h|qd|od|bid|bd|tid|tds|qid|qds|prn|stat|daily|nightly|weekly|once daily|twice daily|every \d+ hours?)\b/i;
const ROUTES = new Set(["po", "iv", "im", "sc", "sq", "sl", "pr", "inh", "top"]);

/** Parses free text such as "metformin 500 mg BID" (one drug per line or ';'). */
export function parseMedicationList(text: string): Medication[] {
  return text
    .split(/[\n;]+/)
    .map((line) => line.replace(/^[\s\-•*\d.)]+(?=[A-Za-z\u0600-\u06ff])/, "").trim())
    .filter(Boolean)
    .map((raw) => {
      const dose = raw.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|µg|ug|g)\b/i);
      const freq = raw.match(FREQUENCY);
      let doseMg: number | undefined;
      if (dose) {
        const value = parseFloat(dose[1]);
        const unit = dose[2].toLowerCase();
        doseMg = unit === "g" ? value * 1000 : unit === "mg" ? value : value / 1000;
      }
      const stop = raw.search(
        /\d|\b(q\d|qd|od|bid|bd|tid|tds|qid|qds|prn|stat|daily|nightly|weekly|once|twice|every)\b/i
      );
      const head = (stop === -1 ? raw : raw.slice(0, stop)).trim().split(/\s+/);
      const route = head.find((token) => ROUTES.has(token.toLowerCase()))?.toLowerCase();
      const name =
        head
          .filter((token) => !ROUTES.has(token.toLowerCase()))
          .join(" ")
          .trim() || raw;
      return { name, doseMg, frequency: freq?.[0]?.toLowerCase(), route, raw };
    });
}

export type ReconciledPair = {
  home: Medication;
  inpatient: Medication;
  doseChanged: boolean;
  frequencyChanged: boolean;
};

export function reconcileMedications(home: Medication[], inpatient: Medication[]) {
  const key = (m: Medication) => normalizeDrugName(m.name);
  const homeByName = new Map(home.map((m) => [key(m), m]));
  const inpatientByName = new Map(inpatient.map((m) => [key(m), m]));
  const continued: ReconciledPair[] = inpatient
    .filter((m) => homeByName.has(key(m)))
    .map((m) => {
      const h = homeByName.get(key(m))!;
      return {
        home: h,
        inpatient: m,
        doseChanged:
          h.doseMg !== undefined && m.doseMg !== undefined && h.doseMg !== m.doseMg,
        frequencyChanged:
          !!h.frequency && !!m.frequency && h.frequency !== m.frequency,
      };
    });
  return {
    continued,
    omitted: home.filter((m) => !inpatientByName.has(key(m))),
    newTherapy: inpatient.filter((m) => !homeByName.has(key(m))),
  };
}

export function recordCalculation(
  history: Array<{ type: string; value: string; timestamp: number }>,
  type: string,
  value: string
) {
  return [{ type, value, timestamp: Date.now() }, ...history].slice(0, 20);
}

// ============================================================================
// Inpatient Pharmacokinetics & Extended Clinical Engine
// ============================================================================
export interface PatientSafetyReport {
  criticalAlerts: string[];
  warnings: string[];
  interactions: DrugInteractionAlert[];
  renalAdjustments: { drug: string; currentDose: string; recommendedAdjustment: string }[];
  highAlertDrugs: string[];
  allergyWarnings: string[];
}

export function calculateIBW(heightCm: number, gender: "male" | "female"): number {
  const heightInches = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, heightInches - 60);
  return gender === "male" ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
}

export function calculateDosingWeight(
  weightKg: number,
  heightCm: number,
  gender: "male" | "female"
): {
  weightUsed: number;
  type: "Actual" | "IBW" | "Adjusted (ABW)";
  ibw: number;
} {
  const ibw = calculateIBW(heightCm, gender);
  if (weightKg < ibw) {
    return { weightUsed: weightKg, type: "Actual", ibw };
  } else if (weightKg > 1.2 * ibw) {
    const abw = ibw + 0.4 * (weightKg - ibw);
    return { weightUsed: abw, type: "Adjusted (ABW)", ibw };
  } else {
    return { weightUsed: weightKg, type: "Actual", ibw };
  }
}

export function calculateCrCl(
  age: number,
  weightKg: number,
  heightCm: number,
  gender: "male" | "female",
  serumCr: number
): { crcl: number; dosingWeightUsed: number; weightType: string; ibw: number } {
  if (serumCr <= 0)
    return { crcl: 0, dosingWeightUsed: weightKg, weightType: "Actual", ibw: 0 };
  const { weightUsed, type, ibw } = calculateDosingWeight(weightKg, heightCm, gender);
  let crcl = ((140 - age) * weightUsed) / (72 * serumCr);
  if (gender === "female") crcl *= 0.85;
  return {
    crcl: Math.round(crcl * 10) / 10,
    dosingWeightUsed: Math.round(weightUsed * 10) / 10,
    weightType: type,
    ibw: Math.round(ibw * 10) / 10,
  };
}

export function calculateVancomycinDosing(
  age: number,
  weightKg: number,
  heightCm: number,
  gender: "male" | "female",
  serumCr: number,
  targetAucMic: number = 400
) {
  const { crcl } = calculateCrCl(age, weightKg, heightCm, gender, serumCr);
  const ke = 0.00083 * crcl + 0.0044;
  const halfLife = Math.log(2) / ke;
  const vd = 0.7 * weightKg;
  const clearanceLHr = ke * vd;
  const estimatedDailyDose = targetAucMic * clearanceLHr;

  let intervalHours = 12;
  if (crcl >= 90) intervalHours = 8;
  else if (crcl >= 50) intervalHours = 12;
  else if (crcl >= 30) intervalHours = 24;
  else if (crcl >= 15) intervalHours = 36;
  else intervalHours = 48;

  const dosesPerDay = 24 / intervalHours;
  const singleDose = Math.round(estimatedDailyDose / dosesPerDay / 250) * 250;
  const practicalDose = Math.max(500, Math.min(2000, singleDose));

  return {
    crcl,
    ke: Math.round(ke * 10000) / 10000,
    halfLife: Math.round(halfLife * 10) / 10,
    clearanceLHr: Math.round(clearanceLHr * 100) / 100,
    recommendedRegimen: `${practicalDose} mg IV every ${intervalHours} hours`,
    estimatedAUC: Math.round((practicalDose * dosesPerDay) / clearanceLHr),
    troughRangeGoal:
      crcl < 30 ? "10 - 15 mcg/mL" : "15 - 20 mcg/mL (for severe MRSA/HAP)",
  };
}

export function calculateChildPugh(
  bilirubin: number,
  albumin: number,
  inr: number,
  ascites: "none" | "mild" | "moderate_severe",
  encephalopathy: "none" | "grade_1_2" | "grade_3_4"
): {
  score: number;
  classGrade: "A" | "B" | "C";
  mortality1Year: string;
  doseRecommendation: string;
} {
  let score = 0;
  if (bilirubin < 2.0) score += 1;
  else if (bilirubin <= 3.0) score += 2;
  else score += 3;

  if (albumin > 3.5) score += 1;
  else if (albumin >= 2.8) score += 2;
  else score += 3;

  if (inr < 1.7) score += 1;
  else if (inr <= 2.3) score += 2;
  else score += 3;

  if (ascites === "none") score += 1;
  else if (ascites === "mild") score += 2;
  else score += 3;

  if (encephalopathy === "none") score += 1;
  else if (encephalopathy === "grade_1_2") score += 2;
  else score += 3;

  if (score <= 6) {
    return {
      score,
      classGrade: "A",
      mortality1Year: "100% 1-year survival (Mild impairment)",
      doseRecommendation:
        "Normal or mild dosage adjustment for hepatically metabolized drugs.",
    };
  } else if (score <= 9) {
    return {
      score,
      classGrade: "B",
      mortality1Year: "80% 1-year survival (Moderate impairment)",
      doseRecommendation:
        "Reduce dose by 25% to 50% for high first-pass clearance drugs; avoid sedatives and hepatotoxins.",
    };
  } else {
    return {
      score,
      classGrade: "C",
      mortality1Year: "45% 1-year survival (Severe hepatic dysfunction)",
      doseRecommendation:
        "Significant dose reduction (50% or more); contraindicated for many hepatic drugs; strict TDM.",
    };
  }
}

export const OPIOID_EQUIVALENTS = {
  Morphine_IV: 10,
  Morphine_Oral: 30,
  Hydromorphone_IV: 1.5,
  Hydromorphone_Oral: 7.5,
  Fentanyl_IV_mcg: 100,
  Oxycodone_Oral: 20,
  Tramadol_Oral: 150,
};

export function convertOpioid(
  fromDrug: keyof typeof OPIOID_EQUIVALENTS,
  fromDose: number,
  toDrug: keyof typeof OPIOID_EQUIVALENTS,
  incompleteCrossTolerancePercent: number = 25
): { equivalentDose: number; adjustedForTolerance: number } {
  const mme =
    (fromDose / OPIOID_EQUIVALENTS[fromDrug]) * OPIOID_EQUIVALENTS.Morphine_Oral;
  const targetRaw =
    (mme / OPIOID_EQUIVALENTS.Morphine_Oral) * OPIOID_EQUIVALENTS[toDrug];
  const adjusted = targetRaw * (1 - incompleteCrossTolerancePercent / 100);
  return {
    equivalentDose: Math.round(targetRaw * 10) / 10,
    adjustedForTolerance: Math.round(adjusted * 10) / 10,
  };
}

export function analyzePatientSafety(patient: Patient): PatientSafetyReport {
  const criticalAlerts: string[] = [];
  const warnings: string[] = [];
  const foundInteractions: DrugInteractionAlert[] = [];
  const renalAdjustments: {
    drug: string;
    currentDose: string;
    recommendedAdjustment: string;
  }[] = [];
  const highAlertDrugs: string[] = [];
  const allergyWarnings: string[] = [];

  const meds = patient.activeMedications;
  const { crcl } = calculateCrCl(
    patient.age,
    patient.weight,
    patient.height,
    patient.gender,
    patient.labs.serumCreatinine
  );

  patient.allergies.forEach((allergy) => {
    const lowerAllergy = allergy.toLowerCase();
    meds.forEach((med) => {
      const lowerName = (med.name + " " + med.genericName).toLowerCase();
      if (
        lowerAllergy.includes("penicillin") &&
        (lowerName.includes("penicillin") ||
          lowerName.includes("amoxicillin") ||
          lowerName.includes("ampicillin") ||
          lowerName.includes("augmentin"))
      ) {
        allergyWarnings.push(
          `⚠️ True IgE Allergy Alert: المريض لديه حساسية موثقة لـ ${allergy} وتم وصف ${med.name}!`
        );
      }
      if (
        lowerAllergy.includes("penicillin") &&
        (lowerName.includes("ceftriaxone") ||
          lowerName.includes("cefepime") ||
          lowerName.includes("cefazolin"))
      ) {
        warnings.push(
          `Beta-Lactam Cross-Reactivity Notice: حساسية Penicillin مع وصف Cephalosporin (${med.name}) — تحقق من نوع التفاعل السابق (IgE Anaphylaxis vs Delayed Rash).`
        );
      }
      if (
        lowerAllergy.includes("aspirin") &&
        (lowerName.includes("aspirin") ||
          lowerName.includes("ibuprofen") ||
          lowerName.includes("ketorolac"))
      ) {
        allergyWarnings.push(
          `⚠️ NSAID / Aspirin Cross-Sensitivity Alert: تم وصف ${med.name} لمريض يعاني من ${allergy}!`
        );
      }
      if (lowerAllergy.includes("morphine") && lowerName.includes("morphine")) {
        allergyWarnings.push(
          `⚠️ Opioid Allergy / Intolerance Alert: تم وصف ${med.name} لمريض مسجل لديه تحسس من Morphine.`
        );
      }
    });
  });

  meds.forEach((med) => {
    const lowerName = (med.name + " " + med.genericName).toLowerCase();
    if (crcl < 50) {
      if (lowerName.includes("vancomycin")) {
        renalAdjustments.push({
          drug: med.name,
          currentDose: med.frequency,
          recommendedAdjustment:
            crcl < 30
              ? "Renal Dose Adjustment (CrCl < 30 mL/min): مباعدة الـ Dosing Interval إلى 1000 mg IV q24h–q48h مع سحب Trough / Bayesian AUC24/MIC TDM قبل الجرعة التالية."
              : "Renal Dose Adjustment (CrCl 30–50 mL/min): تعديل الـ Interval إلى q12h–q24h مع مراقبة AUC24/MIC (400–600 mg·h/L).",
        });
      }
      if (lowerName.includes("meropenem")) {
        renalAdjustments.push({
          drug: med.name,
          currentDose: `${med.dose} ${med.frequency}`,
          recommendedAdjustment:
            crcl < 30
              ? "Renal Dose Adjustment (CrCl < 30 mL/min): تخفيض الجرعة إلى 500 mg IV q12h عبر 3-hour Extended Infusion."
              : "Renal Dose Adjustment (CrCl 30–50 mL/min): تعديل الجرعة إلى 1000 mg IV q12h عبر Extended Infusion.",
        });
      }
      if (lowerName.includes("enoxaparin") || lowerName.includes("clexane")) {
        renalAdjustments.push({
          drug: med.name,
          currentDose: `${med.dose} ${med.frequency}`,
          recommendedAdjustment:
            crcl < 30
              ? "Renal Dose Adjustment (CrCl < 30 mL/min): تخفيض VTE Prophylaxis إلى Enoxaparin 30 mg SC q24h أو التحويل إلى Unfractionated Heparin (UFH) SC."
              : "Renal Precaution (CrCl 30–50 mL/min): مراقبة علامات النزيف وتراكم Anti-Xa عند استخدام الجرعات العلاجية.",
        });
      }
      if (lowerName.includes("metformin") && crcl < 30) {
        criticalAlerts.push(
          `⚠️ Absolute Contraindication: دواء Metformin مضاد استطباب عند CrCl < 30 mL/min لخطر Metformin-Associated Lactic Acidosis (MALA).`
        );
      }
    }
  });

  meds.forEach((med) => {
    if (med.isHighAlert) {
      highAlertDrugs.push(`${med.name} (${med.indication})`);
    }
  });

  const drugNames = meds.map((m) => (m.genericName + " " + m.name).toLowerCase());
  patient.homeMedications.forEach((hm) => {
    drugNames.push((hm.genericName + " " + hm.name).toLowerCase());
  });

  DRUG_INTERACTIONS_DB.forEach((interaction) => {
    const hasA = drugNames.some((d) => d.includes(interaction.drugA.toLowerCase()));
    const hasB = drugNames.some((d) => d.includes(interaction.drugB.toLowerCase()));
    if (hasA && hasB) {
      foundInteractions.push({
        id: `ddi-${interaction.drugA}-${interaction.drugB}`,
        drugA: interaction.drugA,
        drugB: interaction.drugB,
        severity: interaction.severity,
        mechanism: interaction.mechanism,
        clinicalEffect: interaction.clinicalEffect,
        actionRequired: interaction.actionRequired,
      });
      if (
        interaction.severity === "Major" ||
        interaction.severity === "Contraindicated"
      ) {
        criticalAlerts.push(
          `⚠️ Critical Drug Interaction (${interaction.severity}): ${interaction.drugA} + ${interaction.drugB} — ${interaction.clinicalEffect}`
        );
      }
    }
  });

  return {
    criticalAlerts,
    warnings,
    interactions: foundInteractions,
    renalAdjustments,
    highAlertDrugs,
    allergyWarnings,
  };
}

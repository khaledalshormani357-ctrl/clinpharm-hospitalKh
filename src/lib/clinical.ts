/**
 * Clinical calculators (pure functions, no UI / network dependencies).
 *
 * Every function validates its inputs and returns `null` for implausible
 * values instead of producing a number that could be mistaken for a result.
 * These are decision-support/educational helpers: results must be checked
 * against the original reference and the institutional protocol.
 */

export type Sex = "female" | "male";

const isPositive = (n: number) => Number.isFinite(n) && n > 0;

/** Serum creatinine: µmol/L → mg/dL (÷ 88.4). */
export function umolToMgDl(umolPerL: number): number | null {
  return isPositive(umolPerL) ? umolPerL / 88.4 : null;
}

/**
 * Cockcroft–Gault creatinine clearance (mL/min).
 * Validated for adults only; `sex` is mandatory (no silent default).
 */
export function calculateCrCl(
  ageYears: number,
  weightKg: number,
  serumCreatinineMgDl: number,
  sex: Sex
): number | null {
  if (!isPositive(ageYears) || ageYears < 18 || ageYears > 120) return null;
  if (!isPositive(weightKg) || weightKg > 400) return null;
  if (!isPositive(serumCreatinineMgDl) || serumCreatinineMgDl > 30) return null;
  const base = ((140 - ageYears) * weightKg) / (72 * serumCreatinineMgDl);
  const value = sex === "female" ? base * 0.85 : base;
  return Math.max(0, Math.round(value));
}

/** Ideal body weight (Devine), kg. Returns null below 60 inches (152.4 cm). */
export function idealBodyWeightKg(heightCm: number, sex: Sex): number | null {
  if (!isPositive(heightCm) || heightCm > 250) return null;
  const inchesOver60 = heightCm / 2.54 - 60;
  if (inchesOver60 < 0) return null;
  const base = sex === "male" ? 50 : 45.5;
  return Math.round((base + 2.3 * inchesOver60) * 10) / 10;
}

/** Adjusted body weight = IBW + 0.4 × (actual − IBW), kg. */
export function adjustedBodyWeightKg(actualKg: number, idealKg: number): number | null {
  if (!isPositive(actualKg) || !isPositive(idealKg)) return null;
  return Math.round((idealKg + 0.4 * (actualKg - idealKg)) * 10) / 10;
}

/** CKD-EPI 2021 (race-free) eGFR in mL/min/1.73 m². */
export function calculateEgfrCkdEpi2021(
  ageYears: number,
  serumCreatinineMgDl: number,
  sex: Sex
): number | null {
  if (!isPositive(ageYears) || ageYears < 18 || ageYears > 120) return null;
  if (!isPositive(serumCreatinineMgDl) || serumCreatinineMgDl > 30) return null;
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const ratio = serumCreatinineMgDl / kappa;
  const egfr =
    142 *
    Math.pow(Math.min(ratio, 1), alpha) *
    Math.pow(Math.max(ratio, 1), -1.2) *
    Math.pow(0.9938, ageYears) *
    (sex === "female" ? 1.012 : 1);
  return Math.round(egfr);
}

export type GfrCategory = "G1" | "G2" | "G3a" | "G3b" | "G4" | "G5";

/** KDIGO GFR category from eGFR / CrCl. */
export function gfrCategory(egfr: number): GfrCategory | null {
  if (!Number.isFinite(egfr) || egfr < 0) return null;
  if (egfr >= 90) return "G1";
  if (egfr >= 60) return "G2";
  if (egfr >= 45) return "G3a";
  if (egfr >= 30) return "G3b";
  if (egfr >= 15) return "G4";
  return "G5";
}

export type ChildPughInput = {
  bilirubinMgDl: number;
  albuminGdl: number;
  inr: number;
  ascites: "none" | "mild" | "moderate-severe";
  encephalopathy: "none" | "grade1-2" | "grade3-4";
};

/** Child-Pugh score (5–15) and class (A: 5–6, B: 7–9, C: 10–15). */
export function childPugh(
  input: ChildPughInput
): { score: number; class: "A" | "B" | "C" } | null {
  const { bilirubinMgDl, albuminGdl, inr, ascites, encephalopathy } = input;
  if (![bilirubinMgDl, albuminGdl, inr].every(isPositive)) return null;
  const bili = bilirubinMgDl < 2 ? 1 : bilirubinMgDl <= 3 ? 2 : 3;
  const alb = albuminGdl > 3.5 ? 1 : albuminGdl >= 2.8 ? 2 : 3;
  const coag = inr < 1.7 ? 1 : inr <= 2.3 ? 2 : 3;
  const asc = ascites === "none" ? 1 : ascites === "mild" ? 2 : 3;
  const enc = encephalopathy === "none" ? 1 : encephalopathy === "grade1-2" ? 2 : 3;
  const score = bili + alb + coag + asc + enc;
  return { score, class: score <= 6 ? "A" : score <= 9 ? "B" : "C" };
}

/**
 * Applies a dose factor taken from a drug-specific reference (label, Renal Drug
 * Handbook, Lexicomp, ...). The app deliberately has NO generic "reduce by 50%"
 * rule: renal/hepatic adjustments are drug-specific.
 */
export function applyReferenceDoseFactor(
  currentDose: number,
  factor: number
): number | null {
  if (!isPositive(currentDose) || !Number.isFinite(factor) || factor <= 0 || factor > 1) {
    return null;
  }
  return Math.round(currentDose * factor * 100) / 100;
}

export function copilotProgress(completedStep: number, totalSteps: number) {
  if (totalSteps <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round(((completedStep + 1) / totalSteps) * 100)));
}

export type RecommendationGateInput = {
  sourceUrl?: string;
  evidenceLevel?: string;
  insufficientEvidenceAcknowledged?: boolean;
  isHighRisk: boolean;
  originalSourceVerified: boolean;
};

/**
 * A recommendation can be finalized only when:
 *  - there is a traceable source + evidence level, OR the pharmacist explicitly
 *    records "insufficient evidence"; and
 *  - for high-risk decisions, the pharmacist confirmed they verified the ORIGINAL
 *    source (not required when the outcome is "insufficient evidence").
 */
export function canFinalizeRecommendation(input: RecommendationGateInput): boolean {
  const hasEvidence = isValidEvidenceReference(input.sourceUrl, input.evidenceLevel);
  if (!hasEvidence && !input.insufficientEvidenceAcknowledged) return false;
  if (input.isHighRisk && hasEvidence && !input.originalSourceVerified) return false;
  return true;
}

const PLACEHOLDER_HOSTS = [
  "example.com",
  "example.org",
  "example.net",
  "localhost",
  "test.com",
  "foo.com",
];

/**
 * A source is valid if it is:
 *  1) an in-app Local Clinical Reference Database URI (`local://ref/...`, `app://ref/...`, or `#ref/...`), OR
 *  2) an http(s) URL on a real (non-placeholder) host.
 */
export function isValidEvidenceReference(
  sourceUrl?: string,
  evidenceLevel?: string
): boolean {
  if (!sourceUrl?.trim() || !evidenceLevel?.trim()) return false;
  const trimmed = sourceUrl.trim();

  // Accept canonical in-app local reference database URIs
  if (
    trimmed.startsWith("local://ref/") ||
    trimmed.startsWith("app://ref/") ||
    trimmed.startsWith("#ref/")
  ) {
    const targetPath = trimmed
      .replace(/^(local:\/\/ref\/|app:\/\/ref\/|#ref\/)/, "")
      .trim();
    return targetPath.length >= 2;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    const host = url.hostname.toLowerCase();
    if (
      PLACEHOLDER_HOSTS.some(
        (blocked) => host === blocked || host.endsWith(`.${blocked}`)
      )
    ) {
      return false;
    }
    return host.includes(".");
  } catch {
    return false;
  }
}


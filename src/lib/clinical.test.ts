import { describe, expect, it } from "vitest";
import {
  adjustedBodyWeightKg,
  applyReferenceDoseFactor,
  calculateCrCl,
  calculateEgfrCkdEpi2021,
  canFinalizeRecommendation,
  childPugh,
  copilotProgress,
  gfrCategory,
  idealBodyWeightKg,
  isValidEvidenceReference,
  umolToMgDl,
} from "./clinical";
import {
  ACCP_2026_CHAPTERS,
  PRIMARY_CLINICAL_REFERENCES,
  buildCopilotReferenceContext,
  buildSimulatorParamsFromPatient,
  exportLocalReferenceMarkdown,
  resolveLocalReference,
  searchClinicalReferences,
  simulateCaseWithReferences,
} from "./clinicalReferences";
import { INITIAL_PATIENTS, CLINICAL_CASES, INITIAL_INTERVENTIONS } from "./mockData";
import {
  CASEBOOK_DRIVE_URL,
  PPCP_WORKUP_STEPS,
  DISEASE_CASE_CHECKLISTS,
  BENCHMARK_APP_TEST_CASES,
} from "./caseTakingGuide";

describe("clinical calculators", () => {
  it("calculates Cockcroft–Gault CrCl for male and female adults", () => {
    expect(calculateCrCl(65, 70, 1.2, "male")).toBe(61);
    expect(calculateCrCl(65, 70, 1.2, "female")).toBe(52);
  });

  it("rejects out-of-range or pediatric inputs in calculateCrCl", () => {
    expect(calculateCrCl(12, 40, 0.8, "male")).toBeNull();
    expect(calculateCrCl(130, 70, 1.0, "male")).toBeNull();
    expect(calculateCrCl(50, 0, 1.0, "male")).toBeNull();
    expect(calculateCrCl(50, 70, 0, "male")).toBeNull();
    expect(calculateCrCl(50, 70, 40, "male")).toBeNull();
    expect(calculateCrCl(Number.NaN, 70, 1, "male")).toBeNull();
  });

  it("converts creatinine from µmol/L to mg/dL", () => {
    expect(umolToMgDl(88.4)).toBeCloseTo(1, 2);
    expect(umolToMgDl(0)).toBeNull();
  });

  it("computes CKD-EPI 2021 eGFR and KDIGO category", () => {
    const egfr = calculateEgfrCkdEpi2021(60, 1.0, "male");
    expect(egfr).toBeGreaterThan(70);
    expect(egfr).toBeLessThan(95);
    expect(gfrCategory(95)).toBe("G1");
    expect(gfrCategory(50)).toBe("G3a");
    expect(gfrCategory(35)).toBe("G3b");
    expect(gfrCategory(20)).toBe("G4");
    expect(gfrCategory(10)).toBe("G5");
    expect(gfrCategory(-3)).toBeNull();
  });

  it("computes ideal and adjusted body weight", () => {
    expect(idealBodyWeightKg(175, "male")).toBeCloseTo(70.5, 0);
    expect(idealBodyWeightKg(140, "female")).toBeNull();
    expect(adjustedBodyWeightKg(100, 70)).toBe(82);
  });

  it("scores Child-Pugh and assigns the class", () => {
    expect(
      childPugh({
        bilirubinMgDl: 1,
        albuminGdl: 4,
        inr: 1.1,
        ascites: "none",
        encephalopathy: "none",
      })
    ).toEqual({ score: 5, class: "A" });
    expect(
      childPugh({
        bilirubinMgDl: 2.5,
        albuminGdl: 3,
        inr: 1.9,
        ascites: "mild",
        encephalopathy: "none",
      })
    ).toEqual({ score: 9, class: "B" });
    expect(
      childPugh({
        bilirubinMgDl: 4,
        albuminGdl: 2.5,
        inr: 2.5,
        ascites: "moderate-severe",
        encephalopathy: "grade3-4",
      })
    ).toEqual({ score: 15, class: "C" });
    expect(
      childPugh({
        bilirubinMgDl: 0,
        albuminGdl: 4,
        inr: 1,
        ascites: "none",
        encephalopathy: "none",
      })
    ).toBeNull();
  });

  it("only applies a reference-based dose factor within (0, 1]", () => {
    expect(applyReferenceDoseFactor(100, 0.5)).toBe(50);
    expect(applyReferenceDoseFactor(100, 1.5)).toBeNull();
    expect(applyReferenceDoseFactor(100, 0)).toBeNull();
  });

  it("returns bounded copilot progress", () => {
    expect(copilotProgress(4, 10)).toBe(50);
    expect(copilotProgress(99, 10)).toBe(100);
    expect(copilotProgress(0, 0)).toBe(0);
  });
});

describe("evidence & finalization gate", () => {
  it("accepts real sources and rejects placeholders", () => {
    expect(
      isValidEvidenceReference(
        "https://kdigo.org/guidelines/ckd-evaluation-and-management/",
        "Guideline"
      )
    ).toBe(true);
    expect(isValidEvidenceReference("https://example.org/source", "Guideline")).toBe(
      false
    );
    expect(isValidEvidenceReference("javascript:alert(1)", "Guideline")).toBe(false);
    expect(isValidEvidenceReference("not a url", "Guideline")).toBe(false);
    expect(isValidEvidenceReference("https://kdigo.org/x", "")).toBe(false);
  });

  it("blocks unverified recommendations and allows explicit 'insufficient evidence'", () => {
    const base = { isHighRisk: true, originalSourceVerified: false };
    expect(canFinalizeRecommendation({ ...base })).toBe(false);
    expect(
      canFinalizeRecommendation({
        ...base,
        sourceUrl: "https://kdigo.org/x",
        evidenceLevel: "Guideline",
      })
    ).toBe(false);
    expect(
      canFinalizeRecommendation({
        ...base,
        sourceUrl: "https://kdigo.org/x",
        evidenceLevel: "Guideline",
        originalSourceVerified: true,
      })
    ).toBe(true);
    expect(
      canFinalizeRecommendation({
        ...base,
        insufficientEvidenceAcknowledged: true,
      })
    ).toBe(true);
    expect(
      canFinalizeRecommendation({
        isHighRisk: false,
        originalSourceVerified: false,
        sourceUrl: "https://kdigo.org/x",
        evidenceLevel: "Guideline",
      })
    ).toBe(true);
  });

  it("keeps the synthetic adult DKA benchmark aligned with the 2024 consensus thresholds", () => {
    const dka = BENCHMARK_APP_TEST_CASES.find((testCase) => testCase.id === "test-case-dka-k");
    expect(dka).toBeDefined();
    expect(dka!.expectedAppFindingsEn.join(" ")).toContain("BG falls below 250 mg/dL");
    expect(dka!.expectedAppFindingsEn.join(" ")).toContain("0.05 units/kg/h");
    expect(dka!.patientData.nameEn).toBe("Synthetic DKA Test Patient");
    expect(dka!.patientData.mrn).toBe("TEST-DKA-01");
  });

  it("validates all 7 accredited reference sources (including Casebook Guide & Stockley's DDI) and executes case simulation & test cases", () => {
    expect(PRIMARY_CLINICAL_REFERENCES.length).toBe(7);
    for (const ref of PRIMARY_CLINICAL_REFERENCES) {
      expect(isValidEvidenceReference(ref.viewUrl, "Accredited Reference")).toBe(true);
    }
    expect(ACCP_2026_CHAPTERS.some((c) => c.bookId === "dipiro-13th")).toBe(true);
    expect(ACCP_2026_CHAPTERS.some((c) => c.bookId === "accp-cardio-2026")).toBe(true);
    expect(ACCP_2026_CHAPTERS.some((c) => c.bookId === "casebook-guide")).toBe(true);
    expect(ACCP_2026_CHAPTERS.some((c) => c.bookId === "stockleys-drug-interactions")).toBe(true);
    expect(ACCP_2026_CHAPTERS.some((c) => c.volume === 1)).toBe(true);
    expect(ACCP_2026_CHAPTERS.some((c) => c.volume === 2)).toBe(true);

    // Verify Case-Taking Guide, Checklists, Training Cases, and App Benchmark Test Cases
    expect(PPCP_WORKUP_STEPS.length).toBeGreaterThanOrEqual(5);
    expect(DISEASE_CASE_CHECKLISTS.length).toBeGreaterThanOrEqual(5);
    expect(BENCHMARK_APP_TEST_CASES.length).toBeGreaterThanOrEqual(4);
    expect(CLINICAL_CASES.length).toBeGreaterThanOrEqual(8);

    const vancoSearch = searchClinicalReferences("vancomycin auc");
    expect(vancoSearch.chapters.length).toBeGreaterThan(0);

    const context = buildCopilotReferenceContext("meropenem renal", "ar");
    expect(context.contextPrompt).toContain("1yKRfJ3jcIXqmT5kQ6DL8OXE0Ab6mhgwR");
    expect(context.contextPrompt).toContain("1-nvGR8JU21uXROJKtnnqOiCWESIiqeKt");
    expect(context.contextPrompt).toContain("31c74a31-d444-4339-afd0-b74d8b045d98");
    expect(context.contextPrompt).toContain("1yYqokFGeNRAGcZMu5iCmERQn9w_PD1By");
    expect(context.contextPrompt).toContain("1nMrGfPbBjhkgRUehntRDQHyV6VAKRWkC");
    expect(context.contextPrompt).toContain("1mV4XwXY6k3f8zi-GO321tKUzqwRw-4lP");

    // Verify patient-tailored simulation for ICU Sepsis/AKI patient
    const icuParams = buildSimulatorParamsFromPatient(INITIAL_PATIENTS[0]);
    const simResult = simulateCaseWithReferences(icuParams);
    expect(simResult.immediateActions.length).toBeGreaterThan(0);
    expect(simResult.referenceExtracts.length).toBeGreaterThanOrEqual(3);
    expect(simResult.quickDosingTables.length).toBeGreaterThan(0);
    expect(simResult.readySoapPlanAr).toContain("DiPiro");

    // Verify all references, chapters, simulated actions, and interventions use local://ref/... URIs instead of Google Drive
    for (const ref of PRIMARY_CLINICAL_REFERENCES) {
      expect(ref.viewUrl.startsWith("local://ref/source/")).toBe(true);
      expect(ref.viewUrl).not.toContain("drive.google.com");
      const resolvedSource = resolveLocalReference(ref.viewUrl);
      expect(resolvedSource.source.id).toBe(ref.id);
      expect(resolvedSource.chapter).toBeDefined();
    }
    for (const ch of ACCP_2026_CHAPTERS) {
      expect(ch.sourceUrl.startsWith("local://ref/chapter/")).toBe(true);
      expect(ch.sourceUrl).not.toContain("drive.google.com");
      const resolvedChapter = resolveLocalReference(ch.sourceUrl);
      expect(resolvedChapter.chapter.id).toBe(ch.id);
    }
    for (const act of simResult.immediateActions) {
      expect(act.sourceUrl.startsWith("local://ref/chapter/")).toBe(true);
    }
    for (const ext of simResult.referenceExtracts) {
      expect(ext.sourceUrl.startsWith("local://ref/chapter/")).toBe(true);
    }
    for (const intv of INITIAL_INTERVENTIONS) {
      expect(intv.referenceSourceUrl?.startsWith("local://ref/chapter/")).toBe(true);
    }
    expect(CASEBOOK_DRIVE_URL).toBe("local://ref/chapter/casebook-ppcp-workup");
    const markdown = exportLocalReferenceMarkdown(ACCP_2026_CHAPTERS[0], "ar");
    expect(markdown).toContain("local://ref/chapter/");
  });
});



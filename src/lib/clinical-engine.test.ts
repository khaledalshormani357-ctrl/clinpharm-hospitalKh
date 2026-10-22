import { describe, expect, it } from "vitest";
import {
  buildSoapNote,
  detectDrugRelatedProblems,
  evidenceGate,
  findInteractions,
  missingSoapSections,
  normalizeDrugName,
  parseMedicationList,
  reconcileMedications,
  calculateCrCl,
  calculateVancomycinDosing,
  calculateChildPugh,
  convertOpioid,
  analyzePatientSafety,
  calculateIBW,
} from "./clinical-engine";
import { INITIAL_PATIENTS } from "./mockData";

const patient = { egfr: 35, allergies: [] as string[], diagnoses: [] as string[] };

describe("detectDrugRelatedProblems", () => {
  it("detects interaction, renal review and high-alert monitoring", () => {
    const problems = detectDrugRelatedProblems(
      [
        { name: "Warfarin", doseMg: 5 },
        { name: "ibuprofen", doseMg: 400 },
        { name: "enoxaparin", doseMg: 40, renalThreshold: 60 },
      ],
      patient
    );
    const codes = problems.map((p) => p.code);
    expect(codes).toContain("INTERACTION");
    expect(codes).toContain("DOSE");
    expect(codes).toContain("MONITORING");
    expect(problems[0].severity).toBe("high");
  });

  it("reports an exact duplicate once, not once per extra copy", () => {
    const dup = detectDrugRelatedProblems(
      [{ name: "metformin" }, { name: "metformin" }, { name: "metformin" }],
      patient
    ).filter((p) => p.rule === "duplicate-drug");
    expect(dup).toHaveLength(1);
  });

  it("flags same-class duplication", () => {
    const result = detectDrugRelatedProblems(
      [{ name: "ibuprofen" }, { name: "naproxen" }],
      patient
    );
    expect(result.some((p) => p.rule === "class-duplication-nsaid")).toBe(true);
  });

  it("matches allergies by drug name and by class, and ignores NKDA", () => {
    expect(
      detectDrugRelatedProblems([{ name: "amoxicillin" }], {
        ...patient,
        allergies: ["Penicillin"],
      }).some((p) => p.code === "CONTRAINDICATION")
    ).toBe(true);
    expect(
      detectDrugRelatedProblems([{ name: "aspirin" }], {
        ...patient,
        allergies: ["aspirin"],
      }).some((p) => p.code === "CONTRAINDICATION")
    ).toBe(true);
    expect(
      detectDrugRelatedProblems([{ name: "amoxicillin" }], {
        ...patient,
        allergies: ["NKDA"],
      }).some((p) => p.code === "CONTRAINDICATION")
    ).toBe(false);
  });

  it("does not claim a renal problem when kidney function is unknown", () => {
    const result = detectDrugRelatedProblems(
      [{ name: "enoxaparin", renalThreshold: 30 }],
      { ...patient, egfr: null }
    );
    expect(result.some((p) => p.code === "DOSE")).toBe(false);
    expect(result.some((p) => p.rule === "renal-unknown")).toBe(true);
  });

  it("flags diabetes without glucose-lowering therapy only", () => {
    const flagged = detectDrugRelatedProblems([{ name: "lisinopril" }], {
      ...patient,
      diagnoses: ["Type 2 Diabetes"],
    });
    expect(flagged.some((p) => p.code === "OMISSION")).toBe(true);
    const ok = detectDrugRelatedProblems([{ name: "sitagliptin" }], {
      ...patient,
      diagnoses: ["Type 2 Diabetes"],
    });
    expect(ok.some((p) => p.code === "OMISSION")).toBe(false);
  });
});

describe("interaction rules", () => {
  it("finds class-based interactions regardless of case/spacing", () => {
    expect(findInteractions(["  WARFARIN ", "Naproxen"]).map((p) => p.rule)).toContain(
      "vka-nsaid"
    );
    expect(findInteractions(["lisinopril", "losartan"]).map((p) => p.rule)).toContain(
      "ace-arb"
    );
    expect(
      findInteractions(["sildenafil", "isosorbide mononitrate"]).map((p) => p.rule)
    ).toContain("nitrate-pde5");
  });

  it("returns nothing for unrelated drugs", () => {
    expect(findInteractions(["paracetamol", "metformin"])).toEqual([]);
  });

  it("normalizes names", () => {
    expect(normalizeDrugName("  Amoxicillin  ")).toBe("amoxicillin");
  });
});

describe("medication list parsing & reconciliation", () => {
  it("parses name, dose, frequency and route from free text", () => {
    const [a, b, c] = parseMedicationList(
      "metformin 500 mg BID\n- lisinopril 10mg daily\nceftriaxone IV 2 g q24h"
    );
    expect(a).toMatchObject({ name: "metformin", doseMg: 500, frequency: "bid" });
    expect(b).toMatchObject({ name: "lisinopril", doseMg: 10, frequency: "daily" });
    expect(c).toMatchObject({
      name: "ceftriaxone",
      doseMg: 2000,
      route: "iv",
      frequency: "q24h",
    });
  });

  it("separates continued, changed, omitted and new therapy", () => {
    const home = parseMedicationList(
      "metformin 500 mg BID\nlisinopril 10 mg daily\naspirin 75 mg daily"
    );
    const inpatient = parseMedicationList(
      "lisinopril 20 mg daily\natorvastatin 20 mg nightly\naspirin 75 mg daily"
    );
    const result = reconcileMedications(home, inpatient);
    expect(result.continued).toHaveLength(2);
    expect(result.continued.find((p) => p.home.name === "lisinopril")?.doseChanged).toBe(
      true
    );
    expect(result.continued.find((p) => p.home.name === "aspirin")?.doseChanged).toBe(
      false
    );
    expect(result.omitted.map((m) => m.name)).toEqual(["metformin"]);
    expect(result.newTherapy.map((m) => m.name)).toEqual(["atorvastatin"]);
  });
});

describe("evidence and SOAP", () => {
  it("requires a real source and an evidence level", () => {
    expect(evidenceGate("https://kdigo.org/guidelines/", "Guideline")).toBe(true);
    expect(evidenceGate("https://example.org/guideline", "Guideline")).toBe(false);
    expect(evidenceGate(undefined, "Guideline")).toBe(false);
  });

  it("lists empty SOAP sections and states insufficient evidence when no source", () => {
    expect(
      missingSoapSections({
        subjective: "x",
        objective: " ",
        assessment: "",
        plan: "p",
      })
    ).toEqual(["Objective", "Assessment"]);
    expect(
      buildSoapNote({
        subjective: "No dyspnea",
        objective: "SCr 1.2",
        assessment: "Stable",
        plan: "Monitor",
      })
    ).toContain("Insufficient evidence");
    expect(
      buildSoapNote({
        subjective: "a",
        objective: "b",
        assessment: "c",
        plan: "d",
        source: "KDIGO 2024",
      })
    ).toContain("Evidence: KDIGO 2024");
  });
});

describe("Inpatient Pharmacokinetics & Extended Engine", () => {
  it("calculates Ideal Body Weight (IBW) correctly using Devine formula", () => {
    const ibwMale = calculateIBW(172, "male");
    expect(ibwMale).toBeGreaterThan(65);
    expect(ibwMale).toBeLessThan(70);

    const ibwFemale = calculateIBW(158, "female");
    expect(ibwFemale).toBeGreaterThan(48);
    expect(ibwFemale).toBeLessThan(53);
  });

  it("calculates Vancomycin AUC/MIC and dosing interval for renal impairment", () => {
    const dosing = calculateVancomycinDosing(68, 78, 172, "male", 2.4, 450);
    expect(dosing.recommendedRegimen).toMatch(/every (24|36|48) hours/i);
    expect(dosing.halfLife).toBeGreaterThan(15);
  });

  it("calculates Child-Pugh Score accurately for hepatic impairment", () => {
    const result = calculateChildPugh(2.8, 2.9, 1.6, "mild", "grade_1_2");
    expect(result.score).toBe(9);
    expect(result.classGrade).toBe("B");
  });

  it("converts opioids equianalgesically with cross-tolerance deduction", () => {
    const conversion = convertOpioid("Morphine_IV", 20, "Hydromorphone_IV", 25);
    expect(conversion.equivalentDose).toBe(3);
    expect(conversion.adjustedForTolerance).toBeCloseTo(2.3, 1);
  });

  it("identifies critical drug-drug interactions and renal dose warnings in patient profile", () => {
    const patient1 = INITIAL_PATIENTS[0];
    const report = analyzePatientSafety(patient1);
    expect(report.renalAdjustments.length).toBeGreaterThan(0);
    expect(
      report.renalAdjustments.some((r) => r.drug.toLowerCase().includes("vancomycin"))
    ).toBe(true);
  });
});

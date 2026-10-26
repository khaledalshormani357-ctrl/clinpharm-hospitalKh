import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("security configuration regression checks", () => {
  it("does not inject Gemini API secrets into the Vite client bundle", () => {
    const vite = read("vite.config.ts");
    expect(vite).not.toMatch(/resolvedGeminiKey|process\.env\.GEMINI_API_KEY|import\.meta\.env\.VITE_GEMINI_API_KEY/);
    expect(vite).not.toContain("VITE_GEMINI_API_KEY");
  });

  it("does not pass Gemini secrets to client build workflows or call Gemini directly from the client", () => {
    for (const workflow of [
      ".github/workflows/build-android-apk.yml",
      ".github/workflows/deploy-github-pages.yml",
    ]) {
      expect(read(workflow)).not.toContain("VITE_GEMINI_API_KEY");
    }
    const component = read("src/components/CopilotDialog.tsx");
    expect(component).not.toContain("VITE_GEMINI_API_KEY");
    expect(component).not.toContain("new GoogleGenAI");
  });

  it("reports live AI as configured only when an API key exists", () => {
    const server = read("server.ts");
    expect(server).toContain("liveAiConfigured: hasKey");
    expect(server).toContain("let liveAi = false;");
    expect(server).toContain("liveAi = true;");
    expect(server).toContain("liveAi\n");
    expect(server).not.toContain("error: errMessage");
  });

  it("omits direct patient identifiers from remote copilot context", () => {
    const engine = read("src/lib/notebookLmEngine.ts");
    expect(engine).toContain("De-identified clinical case:");
    expect(engine).not.toContain("MRN: ${currentPatient.mrn}");
    expect(engine).not.toContain("Active Inpatient: ${currentPatient.name}");
    expect(engine).not.toContain("Ward: ${currentPatient.ward}");
  });

  it("does not send prior chat turns to remote copilot endpoints by default", () => {
    const component = read("src/components/CopilotDialog.tsx");
    expect(component).toContain("history: []");
    expect(component).not.toContain("history: historyForApi");
  });

  it("does not make APK release errors invisible or depend on artifact upload quota", () => {
    const workflow = read(".github/workflows/build-android-apk.yml");
    expect(workflow).not.toContain("actions/upload-artifact@v4");
    expect(workflow).not.toMatch(/gh release (?:upload|create)[^\n]*\|\| true/);
  });
});

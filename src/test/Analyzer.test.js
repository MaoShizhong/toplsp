import Analyzer from "../Analyzer.js";
import Diagnostics from "../diagnostics/Diagnostics.js";

describe("Gets content correctly", () => {
  test("States is returned correctly", () => {
    const analyzer = new Analyzer();
    analyzer.updateState("fakeURL", "Hello content");
    expect(analyzer.getContent("fakeURL")).toBe("Hello content");
  });

  test("State returns empty if no state is set", () => {
    const analzyer = new Analyzer();
    expect(analzyer.getContent("noneURL")).toBe("");
  });
});

describe("Correct diagnostics returned", () => {
  let analyzer = new Analyzer();

  beforeEach(() => {
    analyzer = new Analyzer();
  });

  test("Contains introduction diagnostic", () => {
    analyzer.updateState("fakeURL", "");
    const diagnostics = analyzer.generateDiagnostics("fakeURL");
    expect(diagnostics).toContainEqual(Diagnostics.introductionMissing());
  });

  test("Does not Contains introduction diagnostic", () => {
    analyzer.updateState("fakeURL", "### Introduction");
    const diagnostics = analyzer.generateDiagnostics("fakeURL");
    expect(diagnostics).not.toContainEqual(Diagnostics.introductionMissing());
  });

  test("Contains lesson overview diagnostic", () => {
    analyzer.updateState("fakeURL", "### Introduction");
    const diagnostics = analyzer.generateDiagnostics("fakeURL");
    expect(diagnostics).toContainEqual(Diagnostics.lessonOverviewMissing(1, 1));
  });
});

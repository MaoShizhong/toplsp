import Analyzer from "../Analyzer.js";

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
  test("Contains introduction diagnostic", () => {
    const analyzer = new Analyzer();
    analyzer.updateState("fakeURL", "");
    const diagnostics = analyzer.generateDiagnostics("fakeURL");
    expect(diagnostics).toContainEqual("");
  });
});

import Analyzer from "../Analyzer.js";

describe("Gets content correctly", () => {
  test("States is returned correctly", () => {
    const analyzer = new Analyzer();
    analyzer.updateState("fakeURL", "Hello content");
    expect(analyzer.getContent("fakeURL")).toBe("Hello content");
  });
});

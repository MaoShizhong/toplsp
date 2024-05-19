import Analyzer from "../Analyzer";

describe("Return correct diagnostics", () => {
  let analyzer;
  beforeEach(() => {
    analyzer = new Analyzer();
  });
  test("Return nothing if not in TOP repository", () => {
    const result = analyzer.generateDiagnostics("some/path");
    expect(result).toEqual([]);
  });
});

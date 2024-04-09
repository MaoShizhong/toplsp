export default class Analyzer {
  #state = new Map();

  updateState(uri, content) {
    this.#state.set(uri, content);
  }

  getContent(uri) {
    return this.#state.get(uri) ?? "";
  }

  generateDiagnostics(uri) {
    const diagnostics = [];
    const lines = this.getContent(uri).split("\n");
    if (lines[0] !== "### Introduction") {
      diagnostics.push({
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: lines[0].length },
        },
        sevirity: 2,
        message:
          "There should be an introduction section on the top of the document",
      });
    }

    return diagnostics;
  }
}

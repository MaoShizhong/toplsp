import Diagnostic from "./diagnostics/Diagnostic.js";

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
      const introductionDiagnostic = new Diagnostic()
        .line(0, 0)
        .character(0, 0)
        .sevirity(2)
        .message(
          "There should be an introduction section on the top of the document",
        );
      diagnostics.push(introductionDiagnostic);
    }

    return diagnostics;
  }
}

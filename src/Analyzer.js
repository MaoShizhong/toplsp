import Diagnostics from "./diagnostics/Diagnostics.js";

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
      diagnostics.push(Diagnostics.introductionMissing());
    }

    return diagnostics;
  }
}

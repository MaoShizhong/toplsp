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
    const sections = {
      index: 0,
      line: 0,
      headers: ["### Introduction", "### Overview"],
    };

    lines.forEach((line, lineNumber) => {
      if (line === sections.headers[sections.index]) {
        sections.index = sections.index + 1;
        sections.line = lineNumber;
      }
    });

    if (sections.index <= sections.headers.length) {
      diagnostics.push(
        getMissingSection(sections.headers[sections.index], sections.line),
      );
    }

    return diagnostics;
  }

  getMissingSection(header, lineNumber) {
    switch (header) {
      case "### Introduction":
        return Diagnostics.introductionMissing();
      case "### Overview":
        return Diagnostics.lessonOverviewMissing(lineNumber);
    }
  }
}

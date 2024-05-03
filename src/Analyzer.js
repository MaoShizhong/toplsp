import Diagnostics from "./diagnostics/Diagnostics.js";
import Diagnostic from "./diagnostics/Diagnostic.js";
import top1 from "./diagnostics/top1.js";
import MarkdownIt from "markdown-it";

export default class Analyzer {
  #state = new Map();
  #parser = new MarkdownIt();

  updateState(uri, content) {
    this.#state.set(uri, content);
  }

  getContent(uri) {
    return this.#state.get(uri) ?? "";
  }

  generateDiagnostics(uri) {
    const diagnostics = [];
    const content = this.getContent(uri);
    const params = {
      parsers: { markdownit: { tokens: this.#parser.parse(content) } },
    };
    const onError = (errorObj) => {
      diagnostics.push(
        new Diagnostic()
          .line(errorObj.lineNumber ?? 0)
          .character(0, 0)
          .sevirityLevel(2)
          .diagnosticMessage(errorObj.detail),
      );
    };
    top1(params, onError);
    // diagnostics.push(token);
    // const sections = {
    //   index: 0,
    //   line: 0,
    //   headers: ["### Introduction", "### Overview"],
    // };
    //
    // lines.forEach((line, lineNumber) => {
    //   if (line === sections.headers[sections.index]) {
    //     sections.index = sections.index + 1;
    //     sections.line = lineNumber + 1;
    //   }
    // });
    //
    // if (sections.index <= sections.headers.length) {
    //   diagnostics.push(
    //     this.getMissingSection(sections.headers[sections.index], sections.line),
    //   );
    // }

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

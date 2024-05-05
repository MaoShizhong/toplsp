import Diagnostics from "./diagnostics/Diagnostics.js";
import Diagnostic from "./diagnostics/Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";

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
    const config = uri.lastIndexOf(".markdowncli-config.jsonc");
    console.error(config);
    console.error(uri);

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

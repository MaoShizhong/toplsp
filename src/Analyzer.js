import Diagnostics from "./diagnostics/Diagnostics.js";
import Diagnostic from "./diagnostics/Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";
import fs from "fs";

export default class Analyzer {
  #state = new Map();

  updateState(uri, content) {
    this.#state.set(uri, content);
  }

  getContent(uri) {
    return this.#state.get(uri) ?? "";
  }

  async generateDiagnostics(uri) {
    const diagnostics = [];
    const index = uri.indexOf("curriculum/");
    if (index == -1) {
      return diagnostics;
    }

    const path = uri.slice(0, index + "curriculum/".length);

    try {
      const config = new String(
        fs.readFileSync(path + ".markdownlint-cli2.jsonc"),
      );
      const options = parse(config);
      const rulePromises = options.customRules.map(
        (rule) => import(path + rule.slice(2)),
      );

      options.customRules = await Promise.all(rulePromises);
      options.customRules = options.customRules.map((rule) => rule.default);
      options.files = [uri];
      const result = markdownlint.sync(options);
      console.log(result);
    } catch (e) {
      console.error(e);
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

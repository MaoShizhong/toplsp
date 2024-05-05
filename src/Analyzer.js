import Diagnostics from "./diagnostics/Diagnostics.js";
import Diagnostic from "./diagnostics/Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";
import fs from "fs";

export default class Analyzer {
  #state = new Map();
  #options = undefined;

  #extractUri(msg) {
    const uri = msg.params.textDocument.uri;
    if (uri && uri.startsWith("file://")) {
      return uri.slice("file://".length);
    } else {
      return uri;
    }
  }

  async #initOptions(uri) {
    const index = uri.indexOf("curriculum/");
    if (index === -1) {
      return;
    }

    try {
      const path = uri.slice(0, index + "curriculum/".length);
      const config = new String(
        fs.readFileSync(path + ".markdownlint-cli2.jsonc"),
      );
      const options = parse(config);
      const rulePromises = options.customRules.map(
        (rule) => import(path + rule.slice(2)),
      );

      options.customRules = await Promise.all(rulePromises);
      options.customRules = options.customRules.map((rule) => rule.default);
      this.#options = options;
    } catch (e) {
      console.error(e);
    }
  }

  updateState(msg) {
    const uri = this.#extractUri(msg);
    const content = msg.params.textDocument.text;
    this.#state.set(uri, content);
  }

  getContent(msg) {
    const uri = this.#extractUri(msg);
    return this.#state.get(uri) ?? "";
  }

  async generateDiagnostics() {
    const diagnostics = [];
    if (!this.#options) {
      this.#initOptions();
    }

    if (this.#options) {
      options.files = [uri];
    } else {
      return diagnostics;
    }

    const result = markdownlint.sync(options);
    console.log(result);
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

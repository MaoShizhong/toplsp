import Diagnostic from "./Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";
import fs from "fs";
import CodeAction from "./CodeAction.js";

export default class Analyzer {
  #contents = new Map();
  #options = undefined;

  updateContent(uri, text) {
    this.#contents.set(uri, text);
  }

  async #initOptions(uri) {
    const index = uri.indexOf("curriculum/");
    if (index === -1) {
      return;
    }

    // Don't throw error, if file is not found then we are not in TOP repo. exit gracefully
    let config;
    try {
      const path = uri.slice(0, index + "curriculum/".length);
      config = new String(fs.readFileSync(path + ".markdownlint-cli2.jsonc"));
    } catch (_) {
      return;
    }

    const options = parse(config);
    const rulePromises = options.customRules.map(
      (rule) => import(path + rule.slice(2)),
    );

    options.customRules = await Promise.all(rulePromises);
    options.customRules = options.customRules.map((rule) => rule.default);
    this.#options = options;
  }

  #generateResults(uri) {
    const rootURI = this.#getRootURI(uri);
    const content = this.#contents.get(uri);
    if (!this.#options) {
      this.#initOptions(rootURI);
    }

    let results = [];
    if (this.#options && content) {
      this.#options.strings = { content };
      results = markdownlint.sync(this.#options);
    }

    return results;
  }

  generateDiagnostics(uri) {
    return this.#generateResults(uri).map((r) => new Diagnostic(r));
  }

  generateCodeActions(uri, range, diagnostics) {
    return this.#generateResults(uri)
      .filter((r) => this.#validActionResult(r, range))
      .map((r) => new CodeAction(r, uri, diagnostics));
  }

  #validActionResult(result, range) {
    const { start, end } = range;
    const line = result.lineNumber - 1;
    return line >= start.line && line <= end.line && result.fixInfo;
  }

  #getRootURI(uri) {
    if (uri && uri.startsWith("file://")) {
      return uri.slice("file://".length);
    } else {
      return uri;
    }
  }
}

import Diagnostic from "./Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";
import fs from "fs";
import CodeAction from "./CodeAction.js";

export default class Analyzer {
  #document = new Map();
  #options = undefined;

  updateContent(uri, text) {
    this.#document.set(uri, { text });
  }

  remove(uri) {
    this.#document.delete(uri);
  }

  async #initOptions(uri) {
    const index = uri.indexOf("curriculum/");
    if (index === -1) {
      return;
    }

    const path = uri.slice(0, index + "curriculum/".length);

    // Don't throw error, if file is not found then we are not in TOP repo. exit gracefully
    let config;
    try {
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
    const document = this.#document.get(uri);
    if (!this.#options) {
      this.#initOptions(rootURI);
    }

    let results = [];
    if (this.#options && document) {
      this.#options.strings = { content: document.text };
      results = markdownlint.sync(this.#options).content;
      document.results = results;
    }

    return results;
  }

  generateDiagnostics(uri) {
    return this.#generateResults(uri).map((r) => new Diagnostic(r));
  }

  generateCodeActions(uri, range, diagnostics) {
    return this.#document
      .get(uri)
      .results.filter((r) => this.#validActionResult(r, range))
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

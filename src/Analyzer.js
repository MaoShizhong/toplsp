import Diagnostic from "./Diagnostic.js";
import { parse } from "jsonc-parser";
import markdownlint from "markdownlint";
import fs from "fs";

export default class Analyzer {
  #state = new Map();
  #options = undefined;

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

  updateState(uri, content) {
    this.#state.set(uri, content);
  }

  getContent(uri) {
    return this.#state.get(uri) ?? "";
  }

  async generateDiagnostics(uri) {
    const rootURI = this.#getRootURI(uri);
    if (!this.#options) {
      this.#initOptions(rootURI);
    }

    if (this.#options) {
      this.#options.files = [rootURI];
      return markdownlint
        .sync(this.#options)
        [rootURI].map((r) => new Diagnostic(r));
    } else {
      return [];
    }
  }

  #getRootURI(uri) {
    if (uri && uri.startsWith("file://")) {
      return uri.slice("file://".length);
    } else {
      return uri;
    }
  }
}

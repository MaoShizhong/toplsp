import { parse } from "jsonc-parser";
import fs from "fs";

export default class MarkdownConfig {
  #projectConfig;
  #lessonConfig;

  getOptions(uri) {
    if (uri.includes("project_")) {
      return this.#projectConfig;
    } else {
      return this.#lessonConfig;
    }
  }

  async initOptions(uri) {
    // Wrap in try catch incase not working from TOP directory, exit gracefuly
    try {
      const configDirectory = this.#getConfigDirectory(uri);
      const baseConfig = this.#readBaseConfig(configDirectory);

      const options = parse(baseConfig);
      const rulePromises = options.customRules.map(
        (r) => import(configDirectory + r.slice(2)),
      );

      const customRules = await Promise.all(rulePromises);
      options.customRules = customRules.map((rule) => rule.default);

      this.#initProjectConfig(options, configDirectory);
      this.#initLessonConfig(options, configDirectory);
    } catch (_) {
      return;
    }
  }

  #initProjectConfig(options, configDirectory) {
    const path = `${configDirectory}project.markdownlint-cli2.jsonc`;
    this.#projectConfig = this.#mergeConfig(options, path);
  }

  #initLessonConfig(options, configDirectory) {
    const path = `${configDirectory}lesson.markdownlint-cli2.jsonc`;
    this.#lessonConfig = this.#mergeConfig(options, path);
  }

  #mergeConfig(options, path) {
    const configContent = fs.readFileSync(path).toString();
    const config = parse(configContent).config;
    const mergedConfig = {
      config: { ...options.config },
      customeRules: { ...options.customRules },
    };
    Object.entries(config)
      .filter(([key, _]) => key !== "extends")
      .forEach(([key, value]) => (mergedConfig[key] = value));

    return mergedConfig;
  }

  #readBaseConfig(configDirectory) {
    const path = `${configDirectory}.markdownlint-cli2.jsonc`;
    return fs.readFileSync(path).toString();
  }

  #getConfigDirectory(uri) {
    let startIndex = 0;
    if (uri.startsWith("file://")) {
      startIndex = "file://".length;
    }
    const endIndex = uri.indexOf("curriculum/");
    return uri.slice(startIndex, endIndex + "curriculum/".length);
  }
}

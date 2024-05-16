import { parse } from "jsonc-parser";
import fs from "fs";

export default class Markdown {
  #projectConfig;
  #lessonConfig;

  getOptions(uri) {
    if (uri.contains("project")) {
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

      this.#initProjectConfig(options);
      this.#initLessonConfig(options);
    } catch (_) {
      return;
    }
  }

  #initProjectConfig(options, configDirectory) {
    const path = `${configDirectory}project.markdownlint-cli2.jsonc`;
    const configContent = fs.readFileSync(path).toString();
    const config = parse(configContent);
    this.#projectConfig = options;
    Object.entries(config)
      .filter((key) => key !== "extends")
      .forEach((key, value) => (this.#projectConfig[key] = value));
  }

  #initLessonConfig(options, configDirectory) {
    const path = `${configDirectory}lesson.markdownlint-cli2.jsonc`;
    const configContent = fs.readFileSync(path).toString();
    const config = parse(configContent);
    this.#lessonConfig = options;
    Object.entries(config)
      .filter((key) => key !== "extends")
      .forEach((key, value) => (this.#lessonConfig[key] = value));
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

import { parse } from "jsonc-parser";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const BASE_CONFIG_FILE = ".markdownlint-cli2.jsonc";
const LESSON_CONFIG_FILE = "lesson.markdownlint-cli2.jsonc";
const PROJECT_CONFIG_FILE = "project.markdownlint-cli2.jsonc";

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
    if (this.#projectConfig && this.#lessonConfig) {
      return;
    }

    const paths = this.#getConfigFiles(uri)
    if (paths == null) {
      return;
    }

    const baseConfig = fs.readFileSync(paths.base).toString();;
    const options = parse(baseConfig);
    const rulePromises = options.customRules.map(
      (r) => import(configDirectory + r.slice(2)),
    );

    const customRules = await Promise.all(rulePromises);
    options.customRules = customRules.map((rule) => rule.default);

    this.#lessonConfig = this.#mergeConfig(options, paths.lesson);
    this.#projectConfig = this.#mergeConfig(options, paths.project);
  }

  #mergeConfig(options, path) {
    const configContent = fs.readFileSync(path).toString();
    const config = parse(configContent).config;
    const mergedConfig = {
      config: { ...options.config },
      customRules: [...options.customRules],
    };
    Object.entries(config)
      .filter(([key, _]) => key !== "extends")
      .forEach(([key, value]) => (mergedConfig.config[key] = value));

    return mergedConfig;
  }

  #getConfigFiles(uri) {
    let dir = path.dirname(fileURLToPath(uri));
    console.error("First dir", dir);
    while (fs.existsSync(dir)) {
      const baseConfig = path.join(dir, BASE_CONFIG_FILE);

      if (fs.existsSync(baseConfig)) {
        const lessonConfig = path.join(dir, LESSON_CONFIG_FILE);
        const projectConfig = path.join(dir, PROJECT_CONFIG_FILE);

        if (fs.existsSync(lessonConfig) && fs.existsSync(projectConfig)) {
          return {base: baseConfig, lesson: lessonConfig, project: projectConfig};
        }
      }

      const newDir = path.dirname(dir);
      if (dir === newDir) {
        return null;
      }

      dir = newDir;
    }

    return null;
  }
}

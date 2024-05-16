export default class Markdown {
  #projectConfig;
  #lessonConfig;

  async initOptions(uri) {
    // Wrap in try catch incase not working from TOP directory, exit gracefuly
    let baseConfig;
    let projectConfig;
    let lessonConfig;
    let configDirectory;
    try {
      configDirectory = this.#getConfigDirectory(uri);
      baseConfig = this.#readBaseConfig(configDirectory);
      projectConfig = this.#readProjectConfig(configDirectory);
      lessonConfig = this.#readLessonConfig(configDirectory);
    } catch (_) {
      return;
    }

    const options = parse(baseConfig);
    const rulePromises = options.customRules.map(
      (r) => import(configDirectory + r.slice(2)),
    );

    const customRules = await Promise.all(rulePromises);
    options.customRules = customRules.map((rule) => rule.default);

    this.#projectConfig = parse(projectConfig);
    this.#projectConfig.extends = options;

    this.#lessonConfig = parse(lessonConfig);
    this.#lessonConfig.extends = options;
  }

  getLessonConfig() {
    return this.#lessonConfig;
  }

  getProjectConfig() {
    return this.#projectConfig;
  }

  #readBaseConfig(configDirectory) {
    const path = `${configDirectory}.markdownlint-cli2.jsonc`;
    return fs.readFileSync(path).toString();
  }

  #readProjectConfig(configDirectory) {
    const path = `${configDirectory}project.markdownlint-cli2.jsonc`;
    return fs.readFileSync(path).toString();
  }

  #readLessonConfig(configDirectory) {
    const path = `${configDirectory}lesson.markdownlint-cli2.jsonc`;
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

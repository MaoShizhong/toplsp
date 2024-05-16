export default class Markdown {
  #baseConfig;
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
      baseConfig = this.#getBaseConfig(configDirectory);
      projectConfig = this.#getProjectConfig(configDirectory);
      lessonConfig = this.#getLessonConfig(configDirectory);
    } catch (_) {
      return;
    }

    const options = parse(baseConfig);
    const rulePromises = options.customRules.map(
      (r) => import(configDirectory + r.slice(2)),
    );

    const customRules = await Promise.all(rulePromises);
    options.customRules = customRules.map((rule) => rule.default);
    this.#baseConfig = options;
  }

  #getBaseConfig(configDirectory) {
    const path = `${configDirectory}.markdownlint-cli2.jsonc`;
    return fs.readFileSync(path).toString();
  }

  #getProjectConfig(configDirectory) {
    const path = `${configDirectory}project.markdownlint-cli2.jsonc`;
    return fs.readFileSync(path).toString();
  }

  #getLessonConfig(configDirectory) {
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

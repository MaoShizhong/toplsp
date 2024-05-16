export default class Markdown {
  #projectConfig;
  #lessonConfig;

  async initOptions(uri) {
    // Wrap in try catch incase not working from TOP directory, exit gracefuly
    let config;
    let rootPath;
    try {
      rootPath = this.#getConfigurationPath(uri);
      const configPath = rootPath + ".markdownlint-cli2.jsonc";
      config = fs.readFileSync(configPath).toString();
    } catch (_) {
      return;
    }

    const options = parse(config);
    const rulePromises = options.customRules.map(
      (r) => import(rootPath + r.slice(2)),
    );

    const customRules = await Promise.all(rulePromises);
    options.customRules = customRules.map((rule) => rule.default);
    this.#options = options;
  }

  #getConfigurationPath(uri) {
    let startIndex = 0;
    if (uri.startsWith("file://")) {
      startIndex = "file://".length;
    }
    const endIndex = uri.indexOf("curriculum/");
    return uri.slice(startIndex, endIndex + "curriculum/".length);
  }
}

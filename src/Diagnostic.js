export default class Diagnostic {
  constructor(result) {
    this.range = {
      start: {
        line: result.lineNumber - 1,
        character: 0,
      },
      end: {
        character: result.errorRange,
        line: result.lineNumber - 1,
      },
    };

    this.sevirity = 2;
    this.codeDescription = { href: result.ruleInformation };
    this.source = "toplsp";
    this.message = result.errorDetail;
    this.code = result.ruleNames[0];
    return this;
  }
}

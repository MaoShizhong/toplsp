export default class Diagnostic {
  constructor(result) {
    const lineEnd = result.lineNumber - 1 + result.errorRange ?? 0;
    this.range = {
      start: {
        line: result.lineNumber - 1,
        character: 0,
      },
      end: {
        line: lineEnd,
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

export default class Diagnostic {
  constructor(result) {
    this.range = {
      start: {
        line: result.lineNumber - 1,
        character: 0,
      },
      end: {
        character: 9999,
        line: result.lineNumber - 1,
      },
    };

    this.message = result.ruleDescription;
    this.sevirity = 3;
    this.source = "toplsp";
    this.code = result.ruleNames[0];

    if (result.errorRange) {
      const { start, end } = this.range;
      start.character = result.errorRange[0] - 1;
      end.character = start.character + result.errorRange[1];
    }

    if (result.ruleInformation) {
      this.codeDescription = { href: result.ruleInformation };
    }

    if (result.errorInformation) {
      this.codeDescription = { href: result.errorInformation };
    }

    if (result.errorDetail) {
      this.message += "\n" + result.errorDetail;
    }

    return this;
  }
}

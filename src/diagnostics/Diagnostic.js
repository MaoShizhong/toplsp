export default class Diagnostic {
  constructor() {
    this.range = {
      start: {},
      end: {},
    };
    this.sevirity = 1;
    this.message = "";
  }

  line(startLine, endLine) {
    this.range.start.line = startLine;
    this.range.end.line = endLine ?? startLine;
    return this;
  }

  character(startCharacter, endCharacter) {
    this.range.start.character = startCharacter;
    this.range.end.character = endCharacter;
    return this;
  }

  sevirityLevel(number) {
    this.sevirity = number;
    return this;
  }

  diagnosticMessage(string) {
    this.message = string;
    return this;
  }
}

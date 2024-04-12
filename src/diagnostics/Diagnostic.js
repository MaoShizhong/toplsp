class Diagnostic {
  constructor(range, sevirity, message) {
    this.range = range;
    this.sevirity = sevirity;
    this.message = message;
  }

  startLine(number) {
    this.range.start.line = number;
    return this;
  }

  endLine(number) {
    this.range.end.line = number;
    return this;
  }

  startCharacter(number) {
    this.range.start.character = number;
    return this;
  }

  endCharacter(number) {
    this.range.end.character = number;
  }

  sevirity(number) {
    this.sevirity = number;
    return this;
  }

  message(string) {
    this.message = string;
    return this;
  }
}

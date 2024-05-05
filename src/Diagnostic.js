export default class DiagnosticBuilder {
  #range = { start: {}, end: {} };
  #sevirity = 1;
  #message = "";
  #codeDescription = "";
  #source = "Toplsp";

  constructor(

  lineStart(lineStart) {
    this.range.start.line = startLine;
  }

  errorRange(lineEnd) {
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

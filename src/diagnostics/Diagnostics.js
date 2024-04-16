import Diagnostic from "./Diagnostic.js";

export default class Diagnostics {
  static introductionMissing() {
    return new Diagnostic()
      .line(0, 0)
      .character(0, 0)
      .sevirityLevel(2)
      .diagnosticMessage(
        "There should be an introduction section on the top of the document",
      );
  }

  static lessonOverviewMissing(lineNumber) {
    return new Diagnostic()
      .line(lineNumber, lineNumber)
      .character(0, 0)
      .sevirityLevel(2)
      .diagnosticMessage(
        "There should be lesson overview section after introduction",
      );
  }
}

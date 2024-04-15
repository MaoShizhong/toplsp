import Diagnostic from "./Diagnostic";

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
}

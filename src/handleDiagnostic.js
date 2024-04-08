import logger from "./logger.js";
import { encodeMessage } from "./parser.js";

export default function (state, msg) {
  const uri = msg.params.textDocument.uri;
  const diagnostics = parseDiagnostics(state.get(uri));

  const response = encodeMessage({
    method: "textDocument/publishDiagnostics",
    params: { uri, diagnostics },
  });
  console.log(response);
  logger(msg.method, "Handling diagnostics");
}

function parseDiagnostics(text) {
  const diagnostics = [];
  const lines = text.split("\n");
  if (lines[0] !== "### Introduction") {
    diagnostics.push({
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: lines[0].length },
      },
      sevirity: 2,
      message:
        "There should be an introduction section on the top of the document",
    });
  }

  return diagnostics;
}

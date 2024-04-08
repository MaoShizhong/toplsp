import logger from "./logger.js";
import { encodeMessage } from "./parser.js";

export default function (state, msg) {
  const uri = msg.params.textDocument.uri;
  const diagnostics = parseDiagnostics(state.get(uri));

  const response = encodeMessage({ id: msg.id, uri: msg, diagnostics });
  console.log(response);
  logger(msg.method, "Handling diagnostics");
}

function parseDiagnostics(text) {
  return [
    {
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 5 },
      },
      severity: 1,
      message: "This is diagnostic test",
    },
  ];
}

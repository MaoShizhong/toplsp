import { decodeMessage } from "./parser.js";
import handleInitalization from "./protocols/handleInitalization.js/index.js";
import handleOpen from "./protocols/handleOpen.js/index.js";
import handleChange from "./protocols/handleChange.js/index.js";
import handleHover from "./protocols/handleHover.js/index.js";
import handleCompletion from "./protocols/handleCompletion.js/index.js";
import handleDiagnostics from "./protocols/handleDiagnostic.js";

const state = new Map();

process.stdin.on("data", (data) => {
  try {
    const msg = decodeMessage(data.toString());
    response(msg);
  } catch (e) {
    console.error(e);
  }
});

function response(msg) {
  const { method } = msg;
  switch (method) {
    case "initialize":
      handleInitalization(msg);
      break;
    case "textDocument/didOpen":
      handleOpen(state, msg);
      handleDiagnostics(state, msg);
      break;
    case "textDocument/didChange":
      handleChange(state, msg);
      break;
    case "textDocument/hover":
      handleHover(state, msg);
      break;
    case "textDocument/completion":
      handleCompletion(msg);
      break;
    case "textDocument/didSave":
      handleDiagnostics(state, msg);
      break;
  }
}

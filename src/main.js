import Encoder from "./Encoder.js";
import Protocol from "./protocols/Protocol.js";

const encoder = new Encoder();
const protocol = new Protocol(analyzer, encoder);

process.stdin.on("data", (data) => {
  try {
    const msg = decode(data.toString());
    response(msg);
  } catch (e) {
    console.error(e);
  }
});

function response(msg) {
  const { method } = msg;
  switch (method) {
    case "initialize":
      protocol.handleInitalization(msg);
      break;
    case "textDocument/didOpen":
      protocol.handleOpen(state, msg);
      protocol.handleDiagnostics(state, msg);
      break;
    case "textDocument/didChange":
      protocol.handleChange(state, msg);
      break;
    case "textDocument/hover":
      protocol.handleHover(state, msg);
      break;
    case "textDocument/completion":
      protocol.handleCompletion(msg);
      break;
    case "textDocument/didSave":
      protocol.handleDiagnostics(state, msg);
      break;
  }
}

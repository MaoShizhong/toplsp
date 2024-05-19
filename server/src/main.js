import Analyzer from "./Analyzer.js";
import Encoder from "./Encoder.js";
import Protocol from "./Protocol.js";

const encoder = new Encoder();
const analyzer = new Analyzer();
const protocol = new Protocol(analyzer, encoder);

process.stdin.on("data", (data) => {
  try {
    const request = encoder.decode(data);
    if (request) {
      handleMessage(request);
    }
  } catch (e) {
    console.error(e);
  }
});

function handleMessage(request) {
  const { method } = request;
  switch (method) {
    case "initialize":
      protocol.handleInitialization(request);
      break;
    case "textDocument/didOpen":
      protocol.handleOpen(request);
      break;
    case "textDocument/didChange":
      protocol.handleChange(request);
      break;
    case "textDocument/didSave":
      protocol.handleSave(request);
      break;
    case "textDocument/didClose":
      protocol.handleClose(request);
      break;
    case "textDocument/completion":
      protocol.handleCompletion(request);
      break;
    case "textDocument/codeAction":
      protocol.handleCodeAction(request);
      break;
  }
}

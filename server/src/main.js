import Analyzer from "./Analyzer.js";
import Encoder from "./Encoder.js";
import Protocol from "./Protocol.js";
import logger from "./logger.js";

const encoder = new Encoder();
const analyzer = new Analyzer();
const protocol = new Protocol(analyzer, encoder, logger);

process.stdin.on("data", (request) => {
  try {
    logger.log("Request -> " + request);
    const requestObj = encoder.decode(request.toString());
    handleMessage(requestObj);
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

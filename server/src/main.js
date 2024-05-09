import Analyzer from "./Analyzer.js";
import Encoder from "./Encoder.js";
import Protocol from "./Protocol.js";
import logger from "./logger.js";

const encoder = new Encoder();
const analyzer = new Analyzer();
const protocol = new Protocol(analyzer, encoder, logger);

process.stdin.on("data", (data) => {
  try {
    const msg = encoder.decode(data.toString());
    handleMessage(msg);
  } catch (e) {
    console.error(e);
  }
});

function handleMessage(msg) {
  const { method } = msg;
  logger.log("Method -> " + method);
  switch (method) {
    case "initialize":
      protocol.handleInitialization(msg);
      break;
    case "textDocument/didOpen":
      protocol.handleOpen(msg);
      break;
    case "textDocument/didChange":
      protocol.handleChange(msg);
      break;
    case "textDocument/hover":
      protocol.handleHover(msg);
      break;
    case "textDocument/completion":
      protocol.handleCompletion(msg);
      break;
    case "textDocument/didSave":
      protocol.handleSave(msg);
      break;
    case "textDocument/codeAction":
      protocol.handleCodeAction(msg);
      break;
  }
}

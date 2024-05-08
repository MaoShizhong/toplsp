import Analyzer from "./Analyzer.js";
import Encoder from "./Encoder.js";
import Protocol from "./Protocol.js";

const encoder = new Encoder();
const analyzer = new Analyzer();
const protocol = new Protocol(analyzer);

process.stdin.on("data", (data) => {
  try {
    const msg = encoder.decode(data.toString());
    response(msg);
  } catch (e) {
    console.error(e);
  }
});

function response(msg) {
  const { method } = msg;
  switch (method) {
    case "initialize":
      response = protocol.initalizationResponse(msg);
      break;
    case "textDocument/didOpen":
      response = protocol.openResponse(msg);
      break;
    case "textDocument/didChange":
      response = protocol.changeResponse(msg);
      break;
    case "textDocument/hover":
      response = protocol.handleHover(msg);
      break;
    case "textDocument/completion":
      response = protocol.completionResponse(msg);
      break;
    case "textDocument/didSave":
      response = protocol.saveResponse(msg);
      break;
    case "textDocument/codeAction":
      response = protocol.codeActionResponse(msg);
      break;
  }

  console.log(encoder.encode(response));
}

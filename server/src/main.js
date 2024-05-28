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

async function handleMessage(request) {
  const { method } = request;
  let response;
  switch (method) {
    case "initialize":
      response = protocol.initializationResponse(request);
      break;
    case "textDocument/didOpen":
      response = await protocol.openResponse(request);
      break;
    case "textDocument/didChange":
      response = protocol.changeResponse(request);
      break;
    case "textDocument/didSave":
      response = protocol.saveResponse(request);
      break;
    case "textDocument/didClose":
      response = protocol.closeResponse(request);
      break;
    case "textDocument/completion":
      response = protocol.complectionResponse(request);
      break;
    case "textDocument/codeAction":
      response = protocol.codeActionResponse(request);
      break;
  }

  if (response) {
    const encodedResponse = encoder.encode(response);
    process.stdout.write(encodedResponse);
  }
}

import { decodeMessage, encodeMessage } from "./parser.js";
import logger from "./logger.js";
import Proccessor from "./Processor.js";

const initalizeResponse = {
  capabilities: {
    textDocumentSync: 1,
    hoverProvider: true,
  },
  serverInfo: { name: "toplsp", version: "0.06" },
};

const proc = new Proccessor();

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
  let response = null;
  switch (method) {
    case "initialize":
      response = encodeMessage({ id: msg.id, result: initalizeResponse });
      break;
    case "textDocument/didOpen":
      proc.updateState(
        msg.params.textDocument.uri,
        msg.params.textDocument.text,
      );
      logger(msg.method, proc.toString());
      break;
    case "textDocument/didChange":
      proc.updateState(msg.params.textDocument.uri, msg.params.contentChanges);
      logger(msg.method, proc.toString());
      break;
    case "textDocument/hover":
      response = encodeMessage({
        id: msg.id,
        result: {
          contents: "Hello from lsp",
        },
      });
      logger(
        msg.method,
        proc.getPosition(msg.params.textDocument.uri, msg.params.position),
      );
      break;
  }

  if (response != null) {
    console.log(response);
  }
}

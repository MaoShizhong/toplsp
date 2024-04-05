import { decodeMessage, encodeMessage } from "./parser.js";
import logger from "./logger.js";
import Proccessor from "./Processor.js";

const initalizeResponse = {
  capabilities: {
    textDocumentSync: 1,
    openClose: true,
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
  switch (method) {
    case "initialize":
      handleInitalization(msg);
      break;
    case "textDocument/didOpen":
      handleOpen(msg);
      break;
    case "textDocument/didChange":
      handleChange(msg);
      break;
    case "textDocument/hover":
      handleHover(msg);
      break;
  }
}

function handleInitalization(msg) {
  const response = encodeMessage({ id: msg.id, result: initalizeResponse });
  console.log(response);
}

function handleOpen(msg) {
  proc.updateState(msg.params.textDocument.uri, msg.params.textDocument.text);
  logger(msg.method, proc.toString());
}

function handleChange(msg) {
  proc.updateState(
    msg.params.textDocument.uri,
    msg.params.contentChanges[0].text,
  );
  logger(msg.method, proc.toString());
}

function handleHover(msg) {
  const response = encodeMessage({
    id: msg.id,
    result: {
      contents: proc.getPosition(
        msg.params.textDocument.uri,
        msg.params.position,
      ),
    },
  });
  console.log(response);

  logger(
    msg.method,
    proc.getPosition(msg.params.textDocument.uri, msg.params.position),
  );
}

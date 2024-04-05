import { decodeMessage, encodeMessage } from "./parser.js";
import logger from "./logger.js";
import Proccessor from "./Processor.js";

const initalizeResponse = {
  capabilities: {
    textDocumentSync: { openClose: true, change: 1 },
    hoverProvider: true,
  },
  serverInfo: { name: "toplsp", version: "0.06" },
};

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
      break;
    case "textDocument/didChange":
      handleChange(state, msg);
      break;
    case "textDocument/hover":
      handleHover(state, msg);
      break;
  }
}

function handleInitalization(msg) {
  const response = encodeMessage({ id: msg.id, result: initalizeResponse });
  console.log(response);
}

function handleOpen(state, msg) {
  const uri = msg.params.textDocument.uri;
  const content = msg.params.textDocument.text;

  state.set(uri, content);
  logger(msg.method, msg.params.textDocument.uri, msg.params.textDocument.text);
}

function handleChange(state, msg) {
  const uri = msg.params.textDocument.uri;
  const content = msg.params.contentChanges[0].text;

  state.set(uri, content);
  logger(msg.method, msg.params.textDocument.uri, text);
}

function handleHover(state, msg) {
  const uri = msg.params.textDocument.uri;
  const lineNumber = msg.params.position.line;

  const content = state.get(uri) ?? "";
  const contents = content.split("\n")[lineNumber];
  const response = encodeMessage({
    id: msg.id,
    result: {
      contents,
    },
  });
  console.log(response);

  logger(msg.method, uri, msg.params.position);
}

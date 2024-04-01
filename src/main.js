import { decodeMessage, encodeMessage } from "./parser.js";
import logger from "./logger.js";

const state = new Map();

process.stdin.on("data", (data) => {
  try {
    const msg = decodeMessage(data.toString());
    response(msg);
  } catch (e) {
    console.error(e);
  }
});

const initalizeResponse = {
  capabilities: {
    textDocumentSync: 1,
  },
  serverInfo: { name: "toplsp", version: "0.06" },
};

function response(msg) {
  const { method } = msg;
  switch (method) {
    case "initialize":
      const response = encodeMessage({ id: msg.id, result: initalizeResponse });
      console.log(response);
      break;
    case "textDocument/didOpen":
      state.set(msg.params.textDocument.uri, msg.params.textDocument.text);
      break;
    case "textDocument/didChange":
      state.set(msg.params.textDocument.uri, msg.params.contentChanges);
      break;
  }

  logger(msg.method, JSON.stringify(state));
}

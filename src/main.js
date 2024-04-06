import { decodeMessage } from "./parser.js";
import logger from "./logger.js";
import handleInitalization from "./handleInitalization.js";
import handleOpen from "./handleOpen.js";
import handleChange from "./handleChange.js";
import handleHover from "./handleHover.js";

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
    case "initialized":
      logger(method, "Inetalized Succeeded");
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
    case "textDocument/completion":
      logger(msg.method, "Completion requested");
      break;
  }
}

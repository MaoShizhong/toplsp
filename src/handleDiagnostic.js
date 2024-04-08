import logger from "./logger.js";

export default function (state, msg) {
  logger(msg.method, "Handling diagnostics");
}

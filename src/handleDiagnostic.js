import logger from "./logger";

export default function (state, msg) {
  logger(msg.method, "Handling diagnostics");
}

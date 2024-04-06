import logger from "./logger.js";

export default function (msg) {
  logger(msg.method, msg.params);
}

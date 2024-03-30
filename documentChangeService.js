import logger from "./logger.js";

export default function handleDocumentChangeRequest(msg, state) {
  logger(msg.method, JSON.stringify(msg.params.contentChanges));
}

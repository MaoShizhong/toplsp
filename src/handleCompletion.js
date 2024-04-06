import logger from "./logger.js";
import { encodeMessage } from "./parser.js";

const completionItmes = [
  {
    label: "Warning",
    detail: "Insert a warning tag",
    filterText: "<div",
  },
];

export default function (msg) {
  const response = encodeMessage({ id: msg.id, result: completionItmes });
  console.log(response);
  logger(msg.method, "Requested completion");
}

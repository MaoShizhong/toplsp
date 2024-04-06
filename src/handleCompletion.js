import logger from "./logger.js";
import { encodeMessage } from "./parser.js";

const completionItmes = [
  {
    label: "Warning Tag",
    detail: "Insert a warning tag",
    sortText: '<div class="lesson-note" markdown="1">',
    filterText: '<div class="lesson-note" markdown="1">',
    insertText: '<div class="lesson-note" markdown="1">\n</div>',
  },
];

export default function (msg) {
  const response = encodeMessage({ id: msg.id, result: completionItmes });
  console.log(response);
  logger(msg.method, "Requested completion");
}

import logger from "./logger.js";
import { encodeMessage } from "./parser.js";

const completionItmes = [
  {
    label: "Note Tag",
    detail: "Insert a Note",
    sortText: "note",
    filterText: '<div class="lesson-note" markdown="1">',
    insertText: '<div class="lesson-note" markdown="1">\n</div>',
  },
  {
    label: "Warning Tag",
    detail: "Insert a warning",
    sortText: "warning",
    filterText: '<div class="lesson-note--warning" markdown="1">',
    insertText:
      '<div class="lesson-note lesson-note--warning" markdown="1">\n</div>',
  },
  {
    label: "Tip Tag",
    detail: "Insert a tip",
    sortText: "tip",
    filterText: '<div class="lesson-note--tip" markdown="1">',
    insertText:
      '<div class="lesson-note lesson-note--tip" markdown="1">\n</div>',
  },
];

export default function (msg) {
  const response = encodeMessage({ id: msg.id, result: completionItmes });
  console.log(response);
  logger(msg.method, "Requested completion");
}

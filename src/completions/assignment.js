const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Assignment Section",
    detail: "Insert assignment section",
    sortText: "assignment Assignment",
    filterText: "### Assignment assignment",
    insertTextFormat,
    insertText:
      '### Assignment\n\n<div class="lesson-content__panel" markdown="1">\n\n\t#### ${1:Optional heading}\n\n\t1. ${2:List item}\n\t\t- ${3:Instruction}\n\n</div>',
  },
];

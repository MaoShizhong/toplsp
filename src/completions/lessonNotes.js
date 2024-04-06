const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Note Tag",
    detail: "Insert a Note",
    sortText: "note",
    filterText: '<div class="lesson-note" markdown="1">',
    insertTextFormat,
    insertText:
      '<div class="lesson-note" markdown="1">\n\t#### ${1:Optional title}\t$0\n</div>',
  },
  {
    kind,
    label: "Warning Tag",
    detail: "Insert a warning",
    sortText: "warning",
    filterText: '<div class="lesson-note lesson-note--warning" markdown="1">',
    insertTextFormat,
    insertText:
      '<div class="lesson-note lesson-note--warning" markdown="1">\n\n\t#### ${1:Optional title}${2:\n}\n$0</div>',
  },
  {
    kind,
    label: "Tip Tag",
    detail: "Insert a tip",
    sortText: "tip",
    filterText: '<div class="lesson-note lesson-note--tip" markdown="1">',
    insertTextFormat,
    insertText:
      '<div class="lesson-note lesson-note--tip" markdown="1">\n\t#### ${1:Optional title}$0\n</div>',
  },
];

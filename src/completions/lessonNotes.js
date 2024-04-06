const kind = 15;

export default [
  {
    kind,
    label: "Note Tag",
    detail: "Insert a Note",
    sortText: "note",
    filterText: '<div class="lesson-note" markdown="1">',
    insertText: '<div class="lesson-note" markdown="1">\n</div>',
  },
  {
    kind,
    label: "Warning Tag",
    detail: "Insert a warning",
    sortText: "warning",
    filterText: '<div class="lesson-note lesson-note--warning" markdown="1">',
    insertText:
      '<div class="lesson-note lesson-note--warning" markdown="1">\n</div>',
  },
  {
    kind,
    label: "Tip Tag",
    detail: "Insert a tip",
    sortText: "tip",
    filterText: '<div class="lesson-note lesson-note--tip" markdown="1">',
    insertText:
      '<div class="lesson-note lesson-note--tip" markdown="1">\n</div>',
  },
];

const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Anchor",
    detail: "Insert anchor link in document",
    sortText: "anchor",
    filterText: "anchor",
    insertTextFormat,
    insertText: "[${1:Details goes here}](${2:link-goes-here})",
  },
];

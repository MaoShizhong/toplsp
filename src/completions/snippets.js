const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Javascript",
    detail: "Javascript snippet",
    sortText: "```javascript",
    filterText: "```javascript",
    insertTextFormat,
    insertText:
      '```javascript\n\t${1:const obj = {\n\t\tname: "object"\n\t\tmarker: "X"\n\t}}\n```\n$0',
  },
];

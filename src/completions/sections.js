const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Assignment Section",
    detail: "Insert assignment section",
    sortText: "Assignment",
    filterText: "### Assignment",
    insertTextFormat,
    insertText:
      '### Assignment\n\n<div class="lesson-content__panel" markdown="1">\n\n\t#### ${1:Optional heading}\n\n\t1. ${2:List item}\n\t\t- ${3:Instruction}\n\n</div>\n\n$0',
  },
  {
    kind,
    label: "Introduction Section",
    detail: "Insert introduction section",
    sortText: "Introduction",
    filterText: "### Introduction",
    insertTextFormat,
    insertText: "### Introduction\n\n\t${1:A Brief Introduction.}\n\n$0",
  },
  {
    kind,
    label: "Lesson overview Section",
    detail: "Lesson overview section",
    sortText: "Lesson Overview",
    filterText: "### Lesson Overview",
    insertTextFormat,
    insertText:
      "### Lesson Overview\n\n\tThis section contains a general overview of topics that you will learn in this lesson.\n\n\t- ${1:Lesson overview item}\n\n$0",
  },
];

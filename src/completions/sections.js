const kind = 15; // Kind Snippet
const insertTextFormat = 2; // Format Snippet

export default [
  {
    kind,
    label: "Assignment section",
    detail: "Insert assignment section",
    sortText: "Assignment",
    filterText: "### Assignment",
    insertTextFormat,
    insertText:
      '### Assignment\n\n<div class="lesson-content__panel" markdown="1">\n\n\t#### ${1:Optional heading}\n\n\t1. ${2:List item}\n\t\t- ${3:Instruction}\n\n</div>\n\n$0',
  },
  {
    kind,
    label: "Introduction section",
    detail: "Insert introduction section",
    sortText: "Introduction",
    filterText: "### Introduction",
    insertTextFormat,
    insertText: "### Introduction\n\n\t${1:A Brief Introduction.}\n\n$0",
  },
  {
    kind,
    label: "Lesson overview section",
    detail: "Insert lesson overview section",
    sortText: "Lesson Overview",
    filterText: "### Lesson Overview",
    insertTextFormat,
    insertText:
      "### Lesson Overview\n\n\tThis section contains a general overview of topics that you will learn in this lesson.\n\n\t- ${1:Lesson overview item}\n\n$0",
  },
  {
    kind,
    label: "Knowledge check section",
    detail: "Insert lesson overview section",
    sortText: "Knowledge Check",
    filterText: "### Knowledge check",
    insertTextFormat,
    insertText:
      "### Knowledge check\n\n\tThe following questions are an opportunity to reflect on key topics in this lesson. If you can't answer a question, click on it to review the material, but keep in mind you are not expected to memorize or master this knowledge.\n\n\t- [${1:A knowledge check question}](${2:a-knowledge-check-url})\n\n$0",
  },
];

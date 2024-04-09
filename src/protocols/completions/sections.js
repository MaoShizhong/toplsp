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
      '### Assignment\n\n<div class="lesson-content__panel" markdown="1">\n\n#### ${1:Optional heading}\n\n1. ${2:List item}\n\t- ${3:Instruction}\n\nt#### ${4:Extra credit}\n\n- ${5:An optional add-on}\n\n</div>\n\n$0',
  },
  {
    kind,
    label: "Introduction section",
    detail: "Insert introduction section",
    sortText: "Introduction",
    filterText: "### Introduction",
    insertTextFormat,
    insertText: "### Introduction\n\n${1:A Brief Introduction.}\n\n$0",
  },
  {
    kind,
    label: "Lesson overview section",
    detail: "Insert lesson overview section",
    sortText: "Lesson Overview",
    filterText: "### Lesson Overview",
    insertTextFormat,
    insertText:
      "### Lesson Overview\n\nThis section contains a general overview of topics that you will learn in this lesson.\n\n- ${1:Lesson overview item}\n\n$0",
  },
  {
    kind,
    label: "Knowledge check section",
    detail: "Insert lesson overview section",
    sortText: "Knowledge Check",
    filterText: "### Knowledge check",
    insertTextFormat,
    insertText:
      "### Knowledge check\n\nThe following questions are an opportunity to reflect on key topics in this lesson. If you can't answer a question, click on it to review the material, but keep in mind you are not expected to memorize or master this knowledge.\n\n- [${1:A knowledge check question}](${2:a-knowledge-check-url})\n\n$0",
  },
  {
    kind,
    label: "Additional resources section",
    detail: "Insert additional resources section",
    sortText: "Additional resources",
    filterText: "### Additional resources",
    insertTextFormat,
    insertText:
      "### Additional resources\n\nThis section contains helpful links to related content. It isn't required, so consider it supplemental.\n\n- ${1:It looks like this lesson doesn't have any additional resources yet. Help us expand this section by contributing to our curriculum.}\n",
  },
];

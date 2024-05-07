export default class CodeAction {
  constructor(result) {
    this.title = "Top fixer";
    this.kind = "quickfix";
    this.isPreferred = true;
    this.edit = {
      documentChanges: [
        {
          textDocument: null,
          edits: {
            range: {
              start: {
                line: result.lineNumber - 1,
                character: result.editColumn - 1,
              },
              end: {
                line: result.lineNumber - 1,
                character: result.deleteCount + result.editColumn - 1,
              },
            },
            newText: result.insertText,
          },
        },
      ],
    };
  }
}

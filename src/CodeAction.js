export default class CodeAction {
  constructor(result, uri) {
    this.title = "Top fixer";
    this.kind = "quickfix";
    this.isPreferred = true;
    const lineNumber = result.fixInfo.lineNumber - 1;
    const characterStart = result.fixInfo.editColumn - 1;
    const characterEnd = result.fixInfo.deleteCount + characterStart;
    const { insertText } = result.fixInfo;

    this.edit = {
      changes: {
        [uri]: [
          {
            range: {
              start: {
                line: lineNumber,
                character: characterStart,
              },
              end: {
                line: lineNumber,
                character: characterEnd,
              },
            },
            newText: insertText,
          },
        ],
      },
    };
  }
}

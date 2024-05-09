export default class CodeAction {
  constructor(result, uri, diagnostics) {
    this.title = "Top fixer";
    this.kind = "quickfix";
    this.isPreferred = true;
    this.diagnostics = diagnostics;

    const lineNumber = result.lineNumber - 1;
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

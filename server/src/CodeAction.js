export default class CodeAction {
  constructor(result, uri, diagnostics) {
    this.title = "Top fixer";
    this.kind = "quickfix";
    this.isPreferred = true;
    this.diagnostics = diagnostics;
    const { fixInfo } = result;

    if (!fixInfo) {
      throw new Error(
        "Can't call constructor for results that doesn't contain fixInfo",
      );
    }

    const lineStart = result.lineNumber - 1;

    let lineEnd = fixInfo.lineNumber ? fixInfo.lineNumber - 1 : lineStart;
    const characterStart = fixInfo.editColumn ? fixInfo.editColumn - 1 : 0;
    let characterEnd = 0;
    if (fixInfo.deleteCount === -1) {
      lineEnd += 1;
    } else if (fixInfo.deleteCount > 0) {
      characterEnd = fixInfo.deleteCount + characterStart;
    }
    this.edit = {
      changes: {
        [uri]: [
          {
            range: {
              start: {
                line: lineStart,
                character: characterStart,
              },
              end: {
                line: lineEnd,
                character: characterEnd,
              },
            },
            newText: fixInfo.insertText ?? "",
          },
        ],
      },
    };
  }
}

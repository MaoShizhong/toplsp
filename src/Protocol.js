import completions from "./completions/index.js";

export default class Protocol {
  #analyzer;

  constructor(analyzer) {
    this.#analyzer = analyzer;
  }

  openResponse(msg) {
    const text = msg.params.textDocument.text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(msg);
  }

  changeResponse(msg) {
    const text = msg.params.contentChanges[0].text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(msg);
  }

  saveResponse(msg) {
    return this.#diagnosticsResponse(msg);
  }

  #diagnosticsResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    return {
      id: msg.id,
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    };
  }

  completionResponse(msg) {
    return { id: msg.id, result: completions };
  }

  hoverResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const { line } = msg.params.position;
    const content = this.#analyzer.getContent(uri);
    const contents = content.split("\n")[line];
    return {
      id: msg.id,
      result: {
        contents,
      },
    };
  }

  codeActionResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const range = msg.params.range;
    const diagnostics = msg.params.context.diagnostics;
    const actions = this.#analyzer.generateCodeActions(uri, range, diagnostics);
    return {
      id: msg.id,
      result: actions,
    };
  }

  initalizationResponse(msg) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: 1,
        hoverProvider: true,
        completionProvider: {},
      },
      serverInfo: { name: "toplsp", version: "1.0" },
    };

    return {
      id: msg.id,
      result: initalizeResponse,
    };
  }
}

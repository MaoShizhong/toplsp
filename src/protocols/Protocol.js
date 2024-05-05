import completions from "./completions/index.js";

export default class Protocol {
  #analyzer;
  #encoder;

  constructor(analyzer, encoder) {
    this.#analyzer = analyzer;
    this.#encoder = encoder;
  }

  handleOpen(msg) {
    const uri = msg.params.textDocument.uri;
    const content = msg.params.textDocument.text;
    this.#analyzer.updateState(uri, content);
    this.#diagnosticsResponse(uri);
  }

  handleChange(msg) {
    const uri = msg.params.textDocument.uri;
    const content = msg.params.contentChanges[0].text;
    this.#analyzer.updateState(uri, content);
  }

  handleSave(msg) {
    const uri = msg.params.textDocument.uri;
    this.#diagnosticsResponse(uri);
  }

  #diagnosticsResponse(uri) {
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    const response = this.#encoder.encode({
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    });

    console.log(response);
  }

  handleCompletion(msg) {
    const response = this.#encoder.encode({ id: msg.id, result: completions });
    console.log(response);
  }

  handleHover(msg) {
    const uri = msg.params.textDocument.uri;
    const { line } = msg.params.position;
    const content = this.#analyzer.getContent(uri);
    const contents = content.split("\n")[line];
    const response = encodeMessage({
      id: msg.id,
      result: {
        contents,
      },
    });

    console.log(response);
  }

  handleInitalization(msg) {
    const initalizeResponse = {
      capabilities: {
        textDocumentSync: 1,
        hoverProvider: true,
        completionProvider: {},
      },
      serverInfo: { name: "toplsp", version: "0.06" },
    };

    const response = this.#encoder.encode({
      id: msg.id,
      result: initalizeResponse,
    });

    console.log(response);
  }
}

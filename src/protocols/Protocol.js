export default class Protocol {
  #state;
  #analyzer;
  #encoder;

  constructor(analyzer, encoder) {
    this.#analyzer = analyzer;
    this.#encoder = encoder;
    this.#state = new Map();
  }

  handleChange(msg) {
    const uri = msg.params.textDocument.uri;
    const content = msg.params.contentChanges[0].text;

    this.#state.set(uri, content);
  }

  handleCompletion(msg) {
    const response = this.#encoder.encode({ id: msg.id, result: completions });

    console.log(response);
  }

  handleSave(msg) {
    const uri = msg.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(this.#state);

    const response = this.#encoder.encode({
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    });

    console.log(response);
  }

  handleHover(msg) {
    const uri = msg.params.textDocument.uri;
    const { line } = msg.params.position;

    const content = this.#state.get(uri) ?? "";
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

  handleOpen(msg) {
    const uri = msg.params.textDocument.uri;
    const content = msg.params.textDocument.text;

    this.#state.set(uri, content);
  }
}

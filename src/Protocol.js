import completions from "./completions/index.js";

export default class Protocol {
  #analyzer;
  #encoder;

  constructor(analyzer, encoder) {
    this.#analyzer = analyzer;
    this.#encoder = encoder;
  }

  handleOpen(msg) {
    this.#diagnosticsResponse(msg);
  }

  handleChange(msg) {
    this.#diagnosticsResponse(msg);
  }

  handleSave(msg) {
    this.#diagnosticsResponse(msg);
  }

  #diagnosticsResponse(msg) {
    const uri = msg.params.textDocument.uri;
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
    const response = this.#encoder.encode({
      id: msg.id,
      result: {
        contents,
      },
    });

    console.log(response);
  }

  handleCodeAction(msg) {
    const uri = msg.params.textDocument.uri;
    const range = msg.params.range;
    const actions = this.#analyzer.generateCodeActions(uri, range);
    const response = this.#encoder.encode({
      id: msg.id,
      result: actions,
    });

    console.log(response);
  }

  handleInitalization(msg) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
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

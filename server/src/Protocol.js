import completions from "./completions/index.js";

export default class Protocol {
  #analyzer;
  #encoder;
  #logger;

  constructor(analyzer, encoder, logger) {
    this.#analyzer = analyzer;
    this.#encoder = encoder;
    this.#logger = logger;
  }

  handleOpen(msg) {
    const text = msg.params.textDocument.text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    this.#diagnosticsResponse(msg);
  }

  handleChange(msg) {
    const text = msg.params.contentChanges[0].text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    this.#diagnosticsResponse(msg);
  }

  handleSave(msg) {
    this.#diagnosticsResponse(msg);
  }

  handleClose(msg) {
    const uri = msg.params.textDocument.uri;
    this.#analyzer.remove(uri);
  }

  #diagnosticsResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    const response = {
      id: msg.id,
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    };

    this.#respond(response);
  }

  handleCompletion(msg) {
    const response = { id: msg.id, result: completions };
    this.#respond(response);
  }

  handleCodeAction(msg) {
    const uri = msg.params.textDocument.uri;
    const range = msg.params.range;
    const diagnostics = msg.params.context.diagnostics;
    const actions = this.#analyzer.generateCodeActions(uri, range, diagnostics);
    const response = {
      id: msg.id,
      result: actions.length > 0 ? actions : null,
    };

    this.#respond(response);
  }

  handleInitialization(msg) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: 1,
        completionProvider: {},
      },
      serverInfo: { name: "toplsp", version: "1.0" },
    };

    const response = {
      id: msg.id,
      result: initalizeResponse,
    };

    this.#respond(response);
  }

  #respond(response) {
    const encodedResponse = this.#encoder.encode(response);
    this.#logger.log("Response -> " + encodedResponse);
    process.stdout.write(encodedResponse);
  }
}

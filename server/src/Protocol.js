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

  async handleOpen(request) {
    const text = request.params.textDocument.text;
    const uri = request.params.textDocument.uri;
    await this.#analyzer.initOptions(uri);
    this.#analyzer.updateContent(uri, text);
    this.#diagnosticsResponse(request);
  }

  handleChange(request) {
    const text = request.params.contentChanges[0].text;
    const uri = request.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    this.#diagnosticsResponse(request);
  }

  handleSave(request) {
    this.#diagnosticsResponse(request);
  }

  handleClose(request) {
    const uri = request.params.textDocument.uri;
    this.#analyzer.remove(uri);
  }

  #diagnosticsResponse(request) {
    const uri = request.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    const response = {
      id: request.id,
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    };

    this.#respond(response);
  }

  handleCompletion(request) {
    const response = { id: request.id, result: completions };
    this.#respond(response);
  }

  handleCodeAction(request) {
    const uri = request.params.textDocument.uri;
    const range = request.params.range;
    const diagnostics = request.params.context.diagnostics;
    const actions = this.#analyzer.generateCodeActions(uri, range, diagnostics);
    const response = {
      id: request.id,
      result: actions.length > 0 ? actions : null,
    };

    this.#respond(response);
  }

  handleInitialization(request) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: 1,
        completionProvider: {},
      },
      serverInfo: { name: "toplsp", version: "1.0" },
    };

    const response = {
      id: request.id,
      result: initalizeResponse,
    };

    this.#respond(response);
  }

  #respond(response) {
    const encodedResponse = this.#encoder.encode(response);
    process.stdout.write(encodedResponse);
    this.#logger.log("Response", encodedResponse);
  }
}

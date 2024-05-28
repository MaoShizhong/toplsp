import completions from "./completions/index.js";

export default class Protocol {
  #analyzer;
  #encoder;

  constructor(analyzer, encoder, logger) {
    this.#analyzer = analyzer;
    this.#encoder = encoder;
  }

  async openResponse(request) {
    const text = request.params.textDocument.text;
    const uri = request.params.textDocument.uri;
    await this.#analyzer.initConfigs(uri);
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(request);
  }

  changeResponse(request) {
    const text = request.params.contentChanges[0].text;
    const uri = request.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(request);
  }

  saveResponse(request) {
    return this.#diagnosticsResponse(request);
  }

  closeResponse(request) {
    const uri = request.params.textDocument.uri;
    this.#analyzer.remove(uri);
  }

  #diagnosticsResponse(request) {
    const uri = request.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    return {
      id: request.id,
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics },
    };
  }

  complectionResponse(request) {
    return { id: request.id, result: completions };
  }

  codeActionResponse(request) {
    const uri = request.params.textDocument.uri;
    const range = request.params.range;
    const diagnostics = request.params.context.diagnostics;
    const actions = this.#analyzer.generateCodeActions(uri, range, diagnostics);
    return {
      id: request.id,
      result: actions.length > 0 ? actions : null,
    };
  }

  initializationResponse(request) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: 1,
        completionProvider: {},
      },
      serverInfo: { name: "toplsp", version: "1.0" },
    };

    return {
      id: request.id,
      result: initalizeResponse,
    };
  }

  #respond(response) {
    const encodedResponse = this.#encoder.encode(response);
    process.stdout.write(encodedResponse);
  }
}

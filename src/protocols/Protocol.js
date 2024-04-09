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
    const response = encodeMessage({ id: msg.id, result: completions });
    console.log(response);
  }
}

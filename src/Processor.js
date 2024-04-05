export default class Proccessor {
  constructor() {
    this.state = new Map();
  }

  updateState(uri, text) {
    this.state.set(uri, text);
  }

  getState(uri) {
    return this.state.get(uri);
  }

  getPosition(uri, position) {
    return this.state.get(uri).split("\n")[position.line];
  }

  toString() {
    let strs = [];
    for (const [key, value] of this.state.entries()) {
      strs.push(`${key}: "${value}"`);
    }

    return strs.join("\n");
  }
}

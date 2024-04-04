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
    const text = this.state.get(uri)[0].text;
    return text.split("\n")[position.line];
  }

  toString() {
    let str = "";
    for (const [key, value] of this.state.entries()) {
      const valueStr = typeof value === "string" ? value : value[0].text;
      str += `${key}: "${valueStr}"`;
    }

    return str;
  }
}

export default class Proccessor {
  constructor() {
    this.state = new Map();
  }

  updateState(key, value) {
    this.state.set(key, value);
  }

  getState(key) {
    return this.state.get(key);
  }

  getPosition(hover) {
    const { line, character } = hover.position;
    const text = hover.textDocument;

    return text.split("\n")[line - 1];
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

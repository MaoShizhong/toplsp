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

  toString() {
    let str = "";
    for (const [key, value] of this.state.entries()) {
      const valueStr = typeof value === "string" ? value : value.join("\n\t");
      str += `${key}:\n\t${valueStr}`;
    }

    return str;
  }
}

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
      str += `${key}:\n\t${value}`;
    }

    return str;
  }
}

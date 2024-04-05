export default class Proccessor {
  constructor() {
    this.state = new Map();
  }

  updateState(uri, text) {
    this.state.set(uri, text);
    console.error("URI: ", uri);
    console.error("State: ", this.state.get(uri));
    console.error("Update state called");
  }

  getState(uri) {
    return this.state.get(uri);
  }

  getPosition(uri, position) {
    console.error("URI: ", uri);
    console.error("Position: ", position);
    console.error("State: ", this.state.get(uri));
    return this.state.get(uri).split("\n")[position.line];
  }

  toString() {
    let str = "";
    for (const [key, value] of this.state.entries()) {
      str += `${key}: "${value}"`;
    }

    return str;
  }
}

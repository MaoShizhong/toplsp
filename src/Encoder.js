export default class Encoder {
  encode(msg) {
    if (msg == undefined || msg.length === 0) {
      return `Content-Length 0\r\n\r\n`;
    }
    const json = JSON.stringify(msg);

    return `Content-Length: ${json.length}\r\n\r\n${json}`;
  }

  decode(msg) {
    const startIndex = "Content-Length ".length;

    const lastIndex = msg.indexOf("\r\n\r\n");
    const length = Number(msg.substring(startIndex, lastIndex));

    const obStart = lastIndex + "\r\n\r\n".length;
    const obj = msg.substring(obStart, obStart + length);
    return JSON.parse(obj);
  }
}

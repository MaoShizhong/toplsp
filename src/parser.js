export function encodeMessage(msg) {
  if (msg == undefined || msg.length === 0) {
    return `Content-Length 0`;
  }
  const json = JSON.stringify(msg);

  return `Content-Length: ${json.length}\r\n\r\n${json}`;
}

export function decodeMessage(msg) {
  const startIndex = "Content-Length ".length;

  const lastIndex = msg.indexOf("\r\n\r\n");
  const length = Number(msg.substring(startIndex, lastIndex));

  const obStart = lastIndex + "\r\n\r\n".length;
  const obj = msg.substring(obStart, obStart + length);
  return JSON.parse(obj);
}

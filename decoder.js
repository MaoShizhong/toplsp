export default function decodeMessage(msg) {
  const startIndex = "Content-Length ".length;

  const lastIndex = msg.indexOf("\r\n\r\n");
  const length = Number(msg.substring(startIndex, lastIndex));

  const obStart = lastIndex + "\r\n\r\n".length;
  const obj = msg.substring(obStart, obStart + length);
  return JSON.parse(obj);
}

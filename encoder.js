export default function encodeMessage(msg) {
  if (msg == undefined || msg.length === 0) {
    return `Content-Length 0`;
  }
  const json = JSON.stringify(msg);

  return `Content-Length: ${json.length}\r\n\r\n${json}`;
}

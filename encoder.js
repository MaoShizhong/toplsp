export default function encodeMessage(msg) {
  if (msg == undefined) {
    return "Content-Length: 0\r\n\r\n{}";
  }
  const json = JSON.stringify(msg);

  return `Content-Length: ${json.length}\r\n\r\n${json}`;
}

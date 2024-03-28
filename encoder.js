export default function encodeMessage(msg) {
  const json = JSON.stringify(msg);

  return `Content-Length: ${json.length}\r\n\r\n${json}`;
}

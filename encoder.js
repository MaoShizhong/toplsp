export default function encodeMessage(msg) {
  if (msg == undefined) {
    throw new Error("Message cannot be undefined or null");
  }
  const json = JSON.stringify(msg);

  return `Content-Length: ${json.length}\r\n\r\n${json}`;
}

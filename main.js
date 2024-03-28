function encodeMessage(msg) {
  JSON.stringfy(msg);

  return `Content-Length: ${msg.length}\r\n\r\n${msg}`;
}

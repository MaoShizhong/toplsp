export default function handleOpen(state, msg) {
  const uri = msg.params.textDocument.uri;
  const content = msg.params.textDocument.text;

  state.set(uri, content);
  logger(msg.method + " => " + uri, content);
}

export default function (state, msg) {
  const uri = msg.params.textDocument.uri;
  const content = msg.params.contentChanges[0].text;

  state.set(uri, content);
}

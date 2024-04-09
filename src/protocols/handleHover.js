import { encodeMessage } from "../parser.js";

export default function (state, msg) {
  const uri = msg.params.textDocument.uri;
  const { line, character } = msg.params.position;

  const content = state.get(uri) ?? "";
  const contents = content.split("\n")[line];
  const response = encodeMessage({
    id: msg.id,
    result: {
      contents,
    },
  });
  console.log(response);
}

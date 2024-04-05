import { encodeMessage } from "./parser.js";
import logger from "./logger.js";

export default function handleHover(state, msg) {
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

  logger(msg.method + " => " + uri, `line: ${line}, char: ${character}`);
}

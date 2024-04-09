import { encodeMessage } from "../parser.js";
import completions from "../completions/index.js";

export default function (msg) {
  const response = encodeMessage({ id: msg.id, result: completions });
  console.log(response);
}

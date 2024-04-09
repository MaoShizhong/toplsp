import { encodeMessage } from "../parser.js";

const initalizeResponse = {
  capabilities: {
    textDocumentSync: 1,
    hoverProvider: true,
    completionProvider: {},
  },
  serverInfo: { name: "toplsp", version: "0.06" },
};

export default function (msg) {
  const response = encodeMessage({ id: msg.id, result: initalizeResponse });
  console.log(response);
}

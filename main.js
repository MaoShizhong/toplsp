import fs from "fs";
import decodeMessage from "./decoder.js";

process.stdin.on("data", (data) => {
  const time = new Date().toISOString();
  try {
    const msg = decodeMessage(data.toString());
    fs.appendFile("./logger.txt", `${time}: ${data}\n`, () => {});
    response(msg);
  } catch (e) {
    console.error(e);
  }
});

function response(msg) {
  console.log({ id: msg.id, method: "Do stuff", params: msg.params });
}

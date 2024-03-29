import fs from "fs";
import decodeMessage from "./decoder.js";

process.stdin.on("data", (data) => {
  const time = newDate().toISOString();
  try {
    const obj = decodeMessage(data.toString());
    fs.appendFile("./logger.txt", `${time}: ${data}\n`, () => {});
    handleMessage(obj);
  } catch (e) {
    fs.appendFile("./error.txt", `${time}: ${e}\n`, () => {});
  }
});

function handleMessage(obj) {}

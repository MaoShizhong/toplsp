import fs from "fs";
import decodeMessage from "./decoder.js";

process.stdin.on("data", (data) => {
  try {
    const obj = decodeMessage(data.toString());
    fs.appendFile("./logger.txt", `${Date.now()}: ${data}\n`, () => {});
    handleMessage(obj);
  } catch (e) {
    fs.appendFile("./error.txt", `${Date.now()}: ${e}\n`, () => {});
  }
});

function handleMessage(obj) {}

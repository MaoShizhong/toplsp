import fs from "fs";

export default function logger(title, msg) {
  const time = new Date().toISOString();
  fs.appendFile("./logs.txt", `${time}: ${title}\n  ${msg}\n`, () => {});
}

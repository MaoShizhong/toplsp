import fs from "fs";

export default function logger(msg) {
  const time = new Date().toISOString();
  fs.writeFile("./logs.txt", `${time}: ${msg}\n`, () => {});
}

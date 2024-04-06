import fs from "fs";

export default function (title, msg) {
  const time = new Date().toISOString();
  fs.appendFile(
    "~/toplsp-logs.txt",
    `${time}: ${title}\n  ${msg}\n========================================\n`,
    () => {},
  );
}

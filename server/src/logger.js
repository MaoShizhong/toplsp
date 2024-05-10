import fs from "fs";

const logger = fs.createWriteStream("/tmp/toplsp.log");

export default {
  log: (header, msg) => {
    let str = msg;
    if (typeof msg === "object") {
      str = JSON.stringify(msg);
    }

    logger.write(header + " --> " + str + "\n---------------------\n\n");
  },
};

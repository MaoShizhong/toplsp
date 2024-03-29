import decodeMessage from "./decoder.js";

process.stdin.on("data", (data) => {
  try {
    const obj = decodeMessage(data.toString());
    handleMessage(obj);
  } catch {
    console.log(data.toString());
  }
});

function handleMessage(obj) {
  console.log("Handling");
}

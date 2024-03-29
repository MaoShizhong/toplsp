console.log("Give me a msg:");
process.stdin.on("data", (data) => {
  console.log("You said", String(data));
});

process.stdin.on("data", (data) => {
  console.log("You said", data.toString());
});

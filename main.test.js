import encodeMessage from "./encoder";

describe("Encode properly", () => {
  test("Encode correct length", () => {
    const msg = { hello: "World", thiskey: 22 };
    const json = JSON.stringify(msg);
    const result = encodeMessage(msg);
    expect(result).toBe(`Content-Length: ${json.length}\r\n\r\n${json}`);
  });
});

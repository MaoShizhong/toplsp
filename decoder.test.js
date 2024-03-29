import decodeMessage from "./decoder";

describe("Decode properly", () => {
  test("Decode empty object", () => {
    let str = "Content-Length 2\r\n\r\n{}";
    const result = decodeMessage(str);
    expect(result).toEqual({});
  });

  test("Decode object correctly", () => {
    let str = 'Content-Length 14\r\n\r\n{"name":"Joe"}';
    const result = decodeMessage(str);
    expect(result).toEqual({ name: "Joe" });
  });
});

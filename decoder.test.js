import decodeMessage from "./decoder";

describe("Decode properly", () => {
  test("Decode empty object", () => {
    let str = "Content-Length 2\r\r\n\n{}";
    const result = decodeMessage(str);
    expect(result).toEqual({});
  });
});

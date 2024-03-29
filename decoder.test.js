import decodeMessage from "./decoder";

describe("Decode properly", () => {
  test("Decode empty object", () => {
    const str = "Content-Length 2\r\n\r\n{}";
    const result = decodeMessage(str);
    expect(result).toEqual({});
  });

  test("Decode object correctly", () => {
    const str = 'Content-Length 14\r\n\r\n{"name":"Joe"}';
    const result = decodeMessage(str);
    expect(result).toEqual({ name: "Joe" });
  });

  test("Decode complext nested object", () => {
    const str =
      'Content-Length: 78\r\n\r\n{"nested":[{"man":"woman"}],"thiskey":23,"another":{"nested":{"object":true}}}';
    const result = decodeMessage(str);
    expect(result).toEqual({
      nested: [{ man: "woman" }],
      thiskey: 23,
      another: { nested: { object: true } },
    });
  });
});

import encodeMessage from "./encoder";

describe("Encode properly", () => {
  test("Encode correct length", () => {
    const ob = { hello: "World", thiskey: 22 };
    const result = encodeMessage(ob);
    expect(result).toBe(
      'Content-Length: 30\r\n\r\n{"hello":"World","thiskey":22}',
    );
  });

  test("Encode nested objects", () => {
    const ob = {
      nested: [{ world: "Hello" }],
      thiskey: 23,
      another: { nested: { object: true } },
    };
    const result = encodeMessage(ob);
    expect(result).toBe(
      'Content-Length: 80\r\n\r\n{"nested":[{"world":"Hello"}],"thiskey":23,"another":{"nested":{"object":true}}}',
    );
  });

  test("Encode undefined", () => {
    expect(encodeMessage(undefined)).toBe("Content-Length: 0\r\n\r\n{}");
    expect(encodeMessage(null)).toBe("Content-Length: 0\r\n\r\n{}");
  });
});

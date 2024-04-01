import { decodeMessage, encodeMessage } from "../parser";

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

  test("Decode object without trailing str information", () => {
    const str = 'Content-Length 14\r\n\r\n{"name":"Joe"}other things goes here';
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

  test("Decode did not find correct content length", () => {
    const str = 'Cent-Length 14\r\n\r\n{"name":"Joe"}other things goes here';
    expect(() => decodeMessage(str)).toThrow();
  });
});

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

  test("Encode empty object", () => {
    const ob = {};
    const result = encodeMessage(ob);
    expect(result).toBe("Content-Length: 2\r\n\r\n{}");
  });

  test("Encode undefined / null or empty string", () => {
    expect(encodeMessage("")).toBe("Content-Length 0");
    expect(encodeMessage(undefined)).toBe("Content-Length 0");
    expect(encodeMessage(null)).toBe("Content-Length 0");
  });
});

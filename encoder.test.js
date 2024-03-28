import encodeMessage from "./encoder";

describe("Encode properly", () => {
  test("Encode correct length", () => {
    const msg = '{hello:"World",thiskey:22}';
    const result = encodeMessage(msg);
    expect(result).toBe(
      `Content-Length: 30\r\n\r\n"{hello:\\"World\\",thiskey:22}"`,
    );
  });
});

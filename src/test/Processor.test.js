import Processor from "../Processor";

describe("Prints state correctly", () => {
  test("Prints one state", () => {
    const proc = new Processor();
    proc.updateState("home", "down the street");
    expect(proc.toString()).toBe("home:\n[\ndown the street\n]");
  });

  test("Print arrays correctly", () => {
    const proc = new Processor();
    proc.updateState("home", [{ text: "down the street" }]);
    expect(proc.toString()).toBe("home:\n[\ndown the street\n]");
  });
});

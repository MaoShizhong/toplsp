import Processor from "../Processor";

describe("Prints state correctly", () => {
  test("Prints one state", () => {
    const proc = new Processor();
    proc.updateState("home", "down the street");
    expect(proc.toString()).toBe('home: "down the street"');
  });

  test("Print arrays correctly", () => {
    const proc = new Processor();
    proc.updateState("work", [{ text: "away from\nthe street" }]);
    expect(proc.toString()).toBe('home: "away from\the street"');
  });
});

import Processor from "../Processor";

describe("Prints state correctly", () => {
  test("Prints one state", () => {
    const proc = new Processor();
    proc.updateState("home", "down the street");
    expect(proc.toString()).toBe("home:\n\tdown the street");
  });

  test("Print arrays correctly", () => {
    const proc = new Processor();
    proc.updateState("home", ["down the street", "another home coming"]);
    expect(proc.toString()).toBe(
      "home:\n\tdown the street\n\tanother home coming",
    );
  });
});

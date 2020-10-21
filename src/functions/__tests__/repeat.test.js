import repeat from "../repeat";

describe("repeat function", () => {
  it("Repeat generates an iterator with 5x letter B", () => {
    const iterable = repeat("B", 5);

    expect(Array.from(iterable)).toEqual(["B", "B", "B", "B", "B"]);
  });
});

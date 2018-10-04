const { repeat } = require("./../repeat");

describe("repeat function", () => {
  it("Repeat generates an iterator with 5x letter B", () => {
    const iterable = repeat(5, "B");

    expect(Array.from(iterable)).toEqual(["B", "B", "B", "B", "B"]);
  });
});

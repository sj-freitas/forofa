const { toArray } = require("./../toArray");

function* generateItems() {
  yield 1;
  yield 2;
  yield 3;
}

describe("toArray function", () => {
  it("Converts an iterable to an array", () => {
    const array = toArray(generateItems());

    expect(array).toEqual([1, 2, 3]);
  });
});

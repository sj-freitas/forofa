const { take } = require("../take");

describe("take function", () => {
  it("Takes 2 elements from an array returns a smaller collection with just 2 elements", () => {
    const array = [1, 2, 3, 4, 5];

    const taken = take(array, 2);

    expect(Array.from(taken)).toEqual([1, 2]);
  });

  it("Takes 5 elements from an array with 3 returns the whole array", () => {
    const array = [1, 2, 3];

    const taken = take(array, 5);

    expect(Array.from(taken)).toEqual(array);
  });
});

const { createIterable } = require("../createIterable");

const createFibonacci = () => {
  let prev = 0;
  let curr = 1;

  return createIterable(() => {
    const oldCurr = curr;
    const next = {
      done: false,
      value: prev,
    };

    curr += prev;
    prev = oldCurr;

    return next;
  });
};

describe("createIterable function", () => {
  it("creates a fibonacci sequence with createIterable", () => {
    const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    const iterable = createFibonacci();
    const array = [];

    for (const curr of iterable) {
      array.push(curr);

      if (array.length === fibonacci.length) {
        break;
      }
    }

    expect(array).toEqual(fibonacci);
  });
});

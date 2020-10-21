import concat from "../concat";

function* fourFiveSix() {
  yield 4;
  yield 5;
  yield 6;
}

describe("concat function", () => {
  it("Concats an array with an array concats both", () => {
    const array = [1, 2, 3];
    const toAdd = [4, 5, 6];

    const concatenated = concat(array, toAdd);

    expect(Array.from(concatenated)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("Concats an array with an iterable concats both", () => {
    const array = [1, 2, 3];
    const concatenated = concat(array, fourFiveSix());

    expect(Array.from(concatenated)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

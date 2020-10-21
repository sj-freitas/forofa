import filter from "../filter";

describe("filter function", () => {
  it("Filters out an array with numbers for all higher than 3 will filter out invalid values", () => {
    const array = [1, 2, 3, 4, 1, 2, 5, 2];
    const filtered = filter(array, t => t <= 3);

    expect(Array.from(filtered)).toEqual([1, 2, 3, 1, 2, 2]);
  });

  it("Filters an array with index to filter out all odds will filter out odd indexes", () => {
    const array = [1, 0, 2, 9, 3, 44, 4, 5];

    const filtered = filter(array, (t, i) => i % 2 === 0);

    expect(Array.from(filtered)).toEqual([1, 2, 3, 4]);
  });
});

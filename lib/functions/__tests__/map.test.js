const { map } = require("./../map");

describe("map function", () => {
  it("Maps an array by parsing string values to numbers", () => {
    const array = ["13", "24", "35", "46", "57", "68"];
    const mapped = map(array, t => parseInt(t, 10));

    expect(Array.from(mapped)).toEqual([13, 24, 35, 46, 57, 68]);
  });

  it("Maps an array with index to only parse even indexes", () => {
    const array = ["13", "24", "35", "46", "57", "68"];
    const filtered = map(array, (t, i) => (i % 2 === 0 ? parseInt(t, 10) : t));

    expect(Array.from(filtered)).toEqual([13, "24", 35, "46", 57, "68"]);
  });
});

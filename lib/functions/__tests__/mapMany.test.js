const { mapMany } = require("../mapMany");

describe("mapMany function", () => {
  it("Maps a collection of collections to a continuos array", () => {
    const mapOfMaps = mapMany(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      (t) => t
    );

    expect(Array.from(mapOfMaps)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("Merges collections from objects", () => {
    function* createSequence(start, amount) {
      let value = start;
      for (; value < amount + start; value += 1) {
        yield value;
      }
    }

    const objects = [
      { col: createSequence(0, 3) },
      { col: createSequence(3, 3) },
      { col: createSequence(6, 3) },
    ];
    const mapOfMaps = mapMany(objects, (t) => t.col);

    expect(Array.from(mapOfMaps)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

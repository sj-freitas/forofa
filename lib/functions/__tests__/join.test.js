const { join } = require("../join");

describe("join function", () => {
  it("Joins elements with no separator.", () => {
    const array = [6, 7, 8, 9, 10];
    const joined = join(array);

    expect(joined).toEqual("6,7,8,9,10");
  });

  it("Joins elements with specific separator.", () => {
    const array = [11, 12, 13, 14, 15];
    const joined = join(array, "/");

    expect(joined).toEqual("11/12/13/14/15");
  });
});

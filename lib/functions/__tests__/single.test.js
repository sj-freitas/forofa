const { single } = require("./../single");

describe("single function", () => {
  it("Gets the single value if no condition is present", () => {
    const value = single([1]);

    expect(value).toEqual(1);
  });

  it("Throws an exception if there are no values", () => {
    const singleOnEmptyIterable = () => single([]);

    expect(singleOnEmptyIterable).toThrow(Error);
    expect(singleOnEmptyIterable).toThrow("There's no element!");
  });

  it("Throws an exception if there are more than one value", () => {
    const singleOnFilledIterable = () => single([1, 2]);

    expect(singleOnFilledIterable).toThrow(Error);
    expect(singleOnFilledIterable).toThrow("There's more than 1 element!");
  });

  it("Gets the single item that fills in the condition", () => {
    const value = single([1, 2, 3], t => t % 2 === 0);

    expect(value).toEqual(2);
  });

  it("Throws an exception if there are more than one value that fills in the condition", () => {
    const singleOnFilledIterable = () => single([1, 2, 3, 4], t => t % 2 === 0);

    expect(singleOnFilledIterable).toThrow(Error);
    expect(singleOnFilledIterable).toThrow("There's more than 1 element!");
  });
});

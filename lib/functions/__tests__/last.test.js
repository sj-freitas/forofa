const { last } = require("./../last");

describe("last function", () => {
  it("Gets the unique and last value if no condition is present", () => {
    const value = last([1]);

    expect(value).toEqual(1);
  });

  it("Gets the  last value if no condition is present", () => {
    const value = last([1, 2, 3, 4, 5]);

    expect(value).toEqual(5);
  });

  it("Throws an exception if there are no values", () => {
    const lastOnEmptyIterable = () => last([]);

    expect(lastOnEmptyIterable).toThrow(Error);
    expect(lastOnEmptyIterable).toThrow("There's no element!");
  });

  it("Gets the last and unique item that fills in the condition", () => {
    const value = last([1, 2, 3], t => t % 2 === 0);

    expect(value).toEqual(2);
  });

  it("Gets the last item that fills in the condition", () => {
    const value = last([1, 2, 3, 4], t => t % 2 === 0);

    expect(value).toEqual(4);
  });
});

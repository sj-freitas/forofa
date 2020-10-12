import toIterable from "../toIterable";

describe("fromSingle function", () => {
  it("Converts a single item into an iterable", () => {
    const converted = toIterable("value");

    expect(Array.from(converted)).toEqual(["value"]);
  });
});

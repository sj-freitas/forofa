import some from "../some";

describe("some function", () => {
  it("Returns true if there's at least one result", () => {
    const any = some([1, 2, 3]);

    expect(any).toEqual(true);
  });

  it("Returns false if there's no results", () => {
    const any = some([]);

    expect(any).toEqual(false);
  });

  it("Returns true if there's at least one result that fulfils the condition", () => {
    const any = some([1, 2, 3], t => t % 2 === 0);

    expect(any).toEqual(true);
  });
});

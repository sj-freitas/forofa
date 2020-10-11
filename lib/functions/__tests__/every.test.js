const { every } = require("../every");

const isPair = (t) => t % 2 === 0;

describe("every function", () => {
  it("Returns true if all elements fulfil the condition", () => {
    const all = every([2, 4, 6], isPair);

    expect(all).toEqual(true);
  });

  it("Returns true if no elements exist", () => {
    const all = every([], () => false);

    expect(all).toEqual(true);
  });

  it("Returns false if there's at least one result that doesn't fulfil the condition", () => {
    const all = every([2, 4, 6, 7], isPair);

    expect(all).toEqual(false);
  });
});

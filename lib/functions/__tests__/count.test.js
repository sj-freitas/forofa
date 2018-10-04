const { count } = require("./../count");

describe("count function", () => {
  it("Iterates through all elements to obtain their count eagerly", () => {
    const mockGetValue = jest.fn(res => res);
    function* generateItems() {
      yield mockGetValue(4);
      yield mockGetValue(5);
      yield mockGetValue(6);
    }

    expect(count(generateItems())).toEqual(3);
    expect(mockGetValue.mock.calls.length).toBe(3);
  });
});

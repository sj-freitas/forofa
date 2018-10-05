const { count } = require("./../count");

function* createInfiniteCollection() {
  let i = 0;

  while (true) {
    yield i;
    i += 1;
  }
}

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

  it("Does not iterate forever if it has an infinity threshold", () => {
    const THRESHOLD = 10000;
    const result = count(createInfiniteCollection(), THRESHOLD);

    expect(result).toEqual(Infinity);
  });
});

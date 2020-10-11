const { firstAsync } = require("../firstAsync");
const { map } = require("../../functions");

describe("firstAsync function", async () => {
  it("Awaits a promise at a time with an array gets the first if no condition", async () => {
    const mockRequest = jest.fn(async (res) => res);
    const tasks = [
      async () => mockRequest(false),
      async () => mockRequest(true),
    ];

    const result = await firstAsync(tasks);

    expect(result).toEqual(false);
    expect(mockRequest.mock.calls.length).toBe(1);
  });

  it("Awaits a promise at a time but fails if no promise fulfils the condition", async () => {
    const tasks = [async () => false, async () => false];

    const failingFunction = async () => {
      const result = await firstAsync(tasks, (t) => t);
      return result;
    };

    expect(failingFunction()).rejects.toEqual(new Error("There's no element!"));
  });

  it("Awaits a promise at a time with an array", async () => {
    const mockRequest = jest.fn(async (res) => res);
    const tasks = [
      async () => mockRequest(false),
      async () => mockRequest(false),
      async () => mockRequest(true),
      async () => mockRequest(false),
    ];

    const result = await firstAsync(tasks, (t) => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });

  it("Awaits a promise at a time with a lazy iterable", async () => {
    const mockRequest = jest.fn(async (res) => res);
    const tasks = map([false, false, true, false], async (t) => {
      const result = await mockRequest(t);
      return result;
    });

    const result = await firstAsync(tasks, (t) => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });
});

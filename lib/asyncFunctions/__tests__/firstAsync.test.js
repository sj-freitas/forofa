const { firstAsync } = require('./../firstAsync');
const { map } = require('./../../functions');

describe('firstAsync function', async () => {
  it('Awaits a promise at a time with an array gets the first if no condition', async () => {
    const mockRequest = jest.fn(async (res) => await res);
    const tasks = [
      async () => await mockRequest(false),
      async () => await mockRequest(true),
    ];

    const result = await firstAsync(tasks);

    expect(result).toEqual(false);
    expect(mockRequest.mock.calls.length).toBe(1);
  });

  it('Awaits a promise at a time but fails if no promise fulfils the condition', async () => {
    const tasks = [
      async () => await false,
      async () => await false,
    ];

    const failingFunction = async () => await firstAsync(tasks, t => t);

    expect(failingFunction()).rejects.toEqual(new Error('There\'s no element!'));
  });

  it('Awaits a promise at a time with an array', async () => {
    const mockRequest = jest.fn(async (res) => await res);
    const tasks = [
      async () => await mockRequest(false),
      async () => await mockRequest(false),
      async () => await mockRequest(true),
      async () => await mockRequest(false),
    ];

    const result = await firstAsync(tasks, t => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });

  it('Awaits a promise at a time with a lazy iterable', async () => {
    const mockRequest = jest.fn(async (res) => await res);
    const tasks = map([false, false, true, false], async t => await mockRequest(t));

    const result = await firstAsync(tasks, t => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });
});

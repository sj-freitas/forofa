const { IterableConcretizer } = require('./../IterableConcretizer');
const { map, repeat } = require('./../functions');

describe('iterator', () => {
  it('IterableConcretizer implements the iterator protocol', () => {
    const generateItems = function* () {
      yield 1; yield 2; yield 3;
    }
    const iterator = new IterableConcretizer(generateItems())[Symbol.iterator]();

    const array = [];
    while(true) {
      const { done, value } = iterator.next();
      if (done) {
        break;
      }

      array.push(value);
    }

    expect(array).toEqual([1,2,3])
  })
})

describe('toArray', () => {
  it('Converts an iterable to an array', () => {
    const generateItems = function* () {
      yield 1; yield 2; yield 3;
    }

    const array = new IterableConcretizer(generateItems())
      .toArray();
    
    expect(array).toEqual([1,2,3]);
  });
});

describe('first', () => {
  it('Gets the first value if no condition is present', () => {
    const value = new IterableConcretizer([1,2,3]).first()

    expect(value).toEqual(1);
  });

  it('Throws an exception if there are no values', () => {
    const firstOnEmptyIterable = () => new IterableConcretizer([]).first();

    expect(firstOnEmptyIterable).toThrow(Error);
    expect(firstOnEmptyIterable).toThrow('There\'s no element!');
  });

  it('Gets the first item that fills in the condition', () => {
    const value = new IterableConcretizer([1,2,3]).first(t => t % 2 === 0);

    expect(value).toEqual(2);
  })
});

describe('any', () => {
  it('Returns true if there\'s at least one result', () => {
    const any = new IterableConcretizer([1,2,3]).any();

    expect(any).toEqual(true);
  });

  it('Returns false if there\'s no results', () => {
    const any = new IterableConcretizer([]).any();

    expect(any).toEqual(false);
  });

  it('Returns true if there\'s at least one result that fulfils the condition', () => {
    const any = new IterableConcretizer([1,2,3]).any(t => t % 2 === 0);

    expect(any).toEqual(true);
  });
});

describe('all', () => {
  it('Returns true if all elements fulfil the condition', () => {
    const all = new IterableConcretizer([2,4,6]).all(t => t % 2 === 0);

    expect(all).toEqual(true);
  });

  it('Returns true if no elements exist', () => {
    const all = new IterableConcretizer([]).all(t => false);

    expect(all).toEqual(true);
  });

  it('Returns false if there\s at least one result that doesn\'t fulfil the condition', () => {
    const all = new IterableConcretizer([2,4,6,7]).all(t => t % 2 === 0);

    expect(all).toEqual(false);
  });
});

describe('toArrayAsync', () => {
  it('Awaits all promises from an array to be completed', async () => {
    const tasks = [
      async () => await 'done',
      async () => await 'done',
      async () => await 'done',
      async () => await 'done',
    ];
    const results = await new IterableConcretizer(tasks)
      .toArrayAsync();

    expect(results).toEqual(['done', 'done', 'done', 'done']);
  });

  it('Awaits all promises from a lazy iterable to be completed', async () => {
    const tasks = map(repeat(4, 'done'), async () => await 'done');
    const results = await new IterableConcretizer(tasks).toArrayAsync();

    expect(results).toEqual(['done', 'done', 'done', 'done']);
  });
});

describe('firstAsync', async () => {
  it('Awaits a promise at a time with an array gets the first if no condition', async () => {
    const mockRequest = jest.fn(async (res) => await res);
    const tasks = [
      async () => await mockRequest(false),
      async () => await mockRequest(true),
    ];

    const result = await new IterableConcretizer(tasks).firstAsync();

    expect(result).toEqual(false);
    expect(mockRequest.mock.calls.length).toBe(1);
  });

  it('Awaits a promise at a time but fails if no promise fulfils the condition', async () => {
    const tasks = [
      async () => await false,
      async () => await false,
    ];

    const failingFunction = async () => await new IterableConcretizer(tasks).firstAsync(t => t);

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

    const result = await new IterableConcretizer(tasks).firstAsync(t => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });

  it('Awaits a promise at a time with a lazy iterable', async () => {
    const mockRequest = jest.fn(async (res) => await res);
    const tasks = map([false, false, true, false], async t => await mockRequest(t));

    const result = await new IterableConcretizer(tasks).firstAsync(t => t);

    expect(result).toEqual(true);
    expect(mockRequest.mock.calls.length).toBe(3);
  });

  describe('count', () => {
    it ('Iterates through all elements to obtain their count eagerly', () => {
      const mockGetValue = jest.fn(res => res);
      const generateItems = function* () {
        yield mockGetValue(1);
        yield mockGetValue(2);
        yield mockGetValue(3);
      };

      const count = new IterableConcretizer(generateItems()).count();

      expect(count).toEqual(3);
      expect(mockGetValue.mock.calls.length).toBe(3);
    });
  });
});
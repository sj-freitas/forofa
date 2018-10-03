const { toArray } = require('./../toArray');

describe('toArray function', () => {
  it('Converts an iterable to an array', () => {
    const generateItems = function* () {
      yield 1; yield 2; yield 3;
    };

    const array = toArray(generateItems());
    
    expect(array).toEqual([1,2,3]);
  });
});

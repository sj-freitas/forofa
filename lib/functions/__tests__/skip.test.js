const { skip } = require('../skip');

describe('skip function', () => {
  it('Skip 2 elements from an array returns a smaller collection with just 2 elements', () => {
    const array = [1,2,3,4,5];

    const skipped = skip(array, 2);

    expect(Array.from(skipped)).toEqual([3,4,5]);    
  });

  it('Skip 3 elements from an array with 3 return an empty array', () => {
    const array = [1,2,3];

    const skipped = skip(array, array.length);

    expect(Array.from(skipped)).toEqual([]);    
  });
});

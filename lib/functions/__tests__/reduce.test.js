const { reduce } = require('../reduce');

describe('reduce function', () => {
  it('Reduces an array to a Sum', () => {
    const array = [10,20,30,20,10,9];

    const sum = reduce(array, (prev, next) => prev + next);

    expect(sum).toEqual(99);    
  });

  it('Reduces an array to a Sum with an initial value', () => {
    const array = [1,2,3,5,8,13];

    const sum = reduce(array, (prev, next) => prev + next, 10);

    expect(sum).toEqual(42);    
  });

  it('Reduces an array to a Sum with index parameter', () => {
    const array = [1,2,3,5,8,13];

    const sum = reduce(array, (prev, next, idx) => idx * (prev + next));

    expect(sum).toEqual(1245);
  });
});

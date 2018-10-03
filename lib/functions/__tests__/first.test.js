const { first } = require('./../first');

describe('first function', () => {
  it('Gets the first value if no condition is present', () => {
    const value = first([1,2,3]);

    expect(value).toEqual(1);
  });

  it('Throws an exception if there are no values', () => {
    const firstOnEmptyIterable = () => first([]);

    expect(firstOnEmptyIterable).toThrow(Error);
    expect(firstOnEmptyIterable).toThrow('There\'s no element!');
  });

  it('Gets the first item that fills in the condition', () => {
    const value = first([1,2,3], t => t % 2 === 0);

    expect(value).toEqual(2);
  });
});

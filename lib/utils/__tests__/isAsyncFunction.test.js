const { isAsyncFunction } = require('./../isAsyncFunction');

describe('isAsyncFunction function', () => {
  it('AsyncFunction will return true.', () => {
    const asyncFunc = async () => await 3;
    expect(isAsyncFunction(asyncFunc)).toEqual(true);
  });
  
  it('Promise will return false as it\'s not an AsyncFunction', () => {
    expect(isAsyncFunction(new Promise(() => {}))).toEqual(false);
  });
});

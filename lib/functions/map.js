const { createIterable } = require('./../utils');

const map = (iterable, projection) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  return createIterable(() => {
    const { done, value } = iterator.next();

    return {
      done,
      value: !done && projection(value, index++),
    }
  });
};

module.exports = { map };

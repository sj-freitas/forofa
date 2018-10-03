const { createIterable } = require('./../utils');

const filter = (iterable, filterCondition) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  return createIterable(() => {
    while (true) {
      const { done, value } = iterator.next();

      if (done || filterCondition(value, index++)) {
        return {
          value,
          done,
        };
      }
    }
  });
};

module.exports = { filter };

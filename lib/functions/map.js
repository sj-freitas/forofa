const { createIterable } = require("../utils");

const map = (iterable, projection) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  return createIterable(() => {
    const { done, value } = iterator.next();
    const next = {
      done,
      value: !done && projection(value, index),
    };

    index += 1;
    return next;
  });
};

module.exports = { map };

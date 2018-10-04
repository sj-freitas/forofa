const get = (iterable, index) => {
  if (index < 0) {
    return undefined;
  }

  const iterator = iterable[Symbol.iterator]();
  let count = index;

  for (;;) {
    const { done, value } = iterator.next();

    if (done || !count) {
      return value;
    }

    count -= 1;
  }
};

module.exports = { get };

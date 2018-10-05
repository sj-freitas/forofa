const DEFAULT_INFINITY_THRESHOLD = 9007199254740992;

const count = (iterable, ifinityThreshold = DEFAULT_INFINITY_THRESHOLD) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  for (;;) {
    const curr = iterator.next();

    if (curr.done) {
      return index;
    }
    if (index === ifinityThreshold) {
      return Infinity;
    }
    index += 1;
  }
};

module.exports = { count };

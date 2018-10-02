const filter = (iterable, filterCondition) => ({
  [Symbol.iterator]: () => {
    const iterator = iterable[Symbol.iterator]();
  
    let index = 0;
    return {
      next: () => {
        // Iterate until a value that's valid can pass or the
        // iterator ends.
        while (true) {
          const { done, value } = iterator.next();

          if (done || filterCondition(value, index++)) {
            return {
              value,
              done,
            };
          }
        }
      },
    };
  },
});

module.exports = { filter };

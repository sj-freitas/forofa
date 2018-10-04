const some = (iterable, filterCondition = () => true) => {
  const iterator = iterable[Symbol.iterator]();

  for (;;) {
    const { done, value } = iterator.next();

    if (done) {
      return false;
    }
    if (filterCondition(value)) {
      return true;
    }
  }
};

module.exports = { some };

const every = (iterable, filterCondition) => {
  const iterator = iterable[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();
    if (done) {
      return true;
    }
    if (!filterCondition(value)) {
      return false;
    }
  }
};

module.exports = { every };

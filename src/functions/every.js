const every = (iterable, filterCondition) => {
  const iterator = iterable[Symbol.iterator]();

  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      return true;
    }
    if (!filterCondition(value)) {
      return false;
    }
  }
};

export default every;

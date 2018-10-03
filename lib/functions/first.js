const first = (iterable, filterCondition = () => true) => {
  const iterator = iterable[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();
    if (done) {
      break;
    }
    if (filterCondition(value)) {
      return value;
    }
  }
  throw new Error('There\'s no element!');
};

module.exports = { first };

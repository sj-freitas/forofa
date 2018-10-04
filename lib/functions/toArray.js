const toArray = iterable => {
  const array = [];
  const iterator = iterable[Symbol.iterator]();

  for (;;) {
    const curr = iterator.next();
    if (curr.done) {
      return array;
    }
    array.push(curr.value);
  }
};

module.exports = { toArray };

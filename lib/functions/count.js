const count = (iterable) => {
  const iterator = iterable[Symbol.iterator]();

  let count = 0;
  while(true) {
    const curr = iterator.next();
    if (curr.done) {
      break;
    }
    count++;
  }

  return count;
};

module.exports = { count };

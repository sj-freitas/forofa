const count = iterable => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  for (;;) {
    const curr = iterator.next();

    if (curr.done) {
      break;
    }
    index += 1;
  }

  return index;
};

module.exports = { count };

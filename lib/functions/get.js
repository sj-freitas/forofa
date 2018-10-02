const get = (iterable, index) => {
  const iterator = iterable[Symbol.iterator]();

  let i = index;
  while (true) {
    if (i < 0) {
      return undefined;
    }

    const { done, value } = iterator.next();
    
    if (done || !i--) {
      return value;
    }
  }
};

module.exports = { get };

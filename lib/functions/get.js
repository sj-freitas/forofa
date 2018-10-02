const get = (iterable, index) => {
  const iterator = iterable[Symbol.iterator]();

  let i = index;
  while (true) {
    const { done, value } = iterator.next();
    
    if (done || !i--) {
      return value;
    }
  }
};

module.exports = { get };

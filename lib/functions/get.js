const get = (iterable, index) => {
  if (index < 0) {
    return undefined;
  }

  const iterator = iterable[Symbol.iterator]();
  
  while (true) {
    const { done, value } = iterator.next();
    
    if (done || !index--) {
      return value;
    }
  }
};

module.exports = { get };

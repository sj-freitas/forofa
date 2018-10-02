const map = (iterable, mapProjection) => ({
  [Symbol.iterator]: () => {
    const iterator = iterable[Symbol.iterator]();
    
    let index = 0;
    return {
      next: () => {
        const { done, value } = iterator.next();
        return {
          value: !done && mapProjection(value, index++),
          done,
        };
      },
    };
  }
});

module.exports = { map };

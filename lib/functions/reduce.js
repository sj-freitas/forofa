const reduce = (iterable, reduceFunction, initialValue) => {
  const iterator = iterable[Symbol.iterator]();

  let index = 0;
  let prevValue = initialValue;
  while (true) {
    const { done, value } = iterator.next();

    if (done) {
      if (index === 0) {
          throw new TypeError('Reduce of empty iterable with no initial value');
      }
      return prevValue;
    }
    
    prevValue = prevValue?
      reduceFunction(prevValue, value, index, iterable) :
      value;
    index++;
  }
}

module.exports = { reduce };

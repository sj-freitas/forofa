const processResult = (value) => {
  if (!value) {
    throw new TypeError("Reduce of empty iterable with no initial value");
  }
  return value;
};

const doReduce = (prevValue, value, index, iterable, reduceFunction) => {
  if (prevValue) {
    return reduceFunction(prevValue, value, index, iterable);
  }
  return value;
};

const reduce = (iterable, reduceFunction, initialValue) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;
  let prevValue = initialValue;

  for (;;) {
    const { done, value } = iterator.next();

    if (done) {
      return processResult(prevValue);
    }

    prevValue = doReduce(prevValue, value, index, iterable, reduceFunction);
    index += 1;
  }
};

module.exports = { reduce };

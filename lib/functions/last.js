const { filter } = require("./filter");

const last = (iterable, filterCondition = () => true) => {
  const filtered = filter(iterable, filterCondition);
  const iterator = filtered[Symbol.iterator]();

  let lastValue;
  let hasValue = false;
  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      break;
    }
    hasValue = true;
    lastValue = value;
  }
  if (!hasValue) {
    throw new Error("Sequence contains no elements");
  }

  return lastValue;
};

module.exports = { last };

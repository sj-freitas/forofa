const { filter } = require("./filter");

const last = (iterable, filterCondition = () => true) => {
  const filtered = filter(iterable, filterCondition);
  const iterator = filtered[Symbol.iterator]();

  let lastValue;
  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      break;
    }
    lastValue = value;
  }
  if (!lastValue) {
    throw new Error("There's no element!");
  }

  return lastValue;
};

module.exports = { last };

const { filter } = require("./filter");
const { take } = require("./take");

const single = (iterable, filterCondition = () => true) => {
  const filtered = filter(iterable, filterCondition);
  const filteredWithTake = take(filtered, 2);
  const iterator = filteredWithTake[Symbol.iterator]();

  const { done, value } = iterator.next();
  if (done) {
    throw new Error("There's no element!");
  }

  const nextObj = iterator.next();
  if (!nextObj.done) {
    throw new Error("There's more than 1 element!");
  }

  return value;
};

module.exports = { single };

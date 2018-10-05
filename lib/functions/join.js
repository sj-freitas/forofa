const join = (iterable, separator = ",") => {
  const iterator = iterable[Symbol.iterator]();
  let firstIteration = true;
  let result = "";

  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      return result;
    }

    if (!firstIteration) {
      result += separator;
    } else {
      firstIteration = false;
    }

    result += value;
  }
};

module.exports = { join };

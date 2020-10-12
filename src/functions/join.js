const getSeparator = (separator, isFirstIteration) =>
  isFirstIteration ? "" : separator;

const join = (iterable, separator = ",") => {
  const iterator = iterable[Symbol.iterator]();
  let isFirstIteration = true;
  let result = "";

  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      return result;
    }

    result += `${getSeparator(separator, isFirstIteration)}${value}`;
    isFirstIteration = false;
  }
};

export default join;

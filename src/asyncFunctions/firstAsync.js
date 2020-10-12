const { isAsyncFunction } = require("./../utils");

const runValueAsync = async item => {
  // Convert the current value to an async function if it"s a promise,
  // if not await whichever the value is.
  if (isAsyncFunction(item)) {
    const asyncResult = await item();
    return asyncResult;
  }
  const promiseResult = await item;
  return promiseResult;
};

/**
 * Gets the first result from an iterable of async functions or promises
 * that fills up the condition.
 * @param {Function} filterCondition the filtering condition.
 */
const firstAsync = async (iterable, filterCondition = () => true) => {
  const iterator = iterable[Symbol.iterator]();

  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      throw new Error("There's no element!");
    }

    // Disabling es-lint rule because it defeats the purpose of this function
    // which intends on getting the first async action that fulfils the condition
    // without having to execute the following.
    // eslint-disable-next-line no-await-in-loop
    const currentValue = await runValueAsync(value);
    if (filterCondition(currentValue)) {
      return currentValue;
    }
  }
};

export default firstAsync;

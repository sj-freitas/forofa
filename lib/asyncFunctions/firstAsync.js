const { isAsyncFunction } = require('./../utils');

const runValueAsync = async (item) => {
  // Convert the current value to an async function if it's a promise,
  // if not await whichever the value is.
  if (isAsyncFunction(item)) {
    return await item();
  }
  return await item;
}

/**
 * Gets the first result from an iterable of async functions or promises
 * that fills up the condition.
 * 
 * @param {Function} filterCondition 
 */
const firstAsync = async (iterable, filterCondition = () => true) => {
  const iterator = iterable[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();
    if (done) {
      throw new Error('There\'s no element!');
    }

    const currentValue = await runValueAsync(value);
    if (filterCondition(currentValue)) {
      return currentValue;
    }
  }
};

module.exports = { firstAsync };

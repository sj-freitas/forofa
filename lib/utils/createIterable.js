/**
 * Helper function that handles all the boilerplate when creating
 * an iterable object.
 * @param {Function} next The call back to execute when executing
 * the next function, must return an object with done and value.
 */
const createIterable = (next) => ({
  [Symbol.iterator]: () => ({ next }),
});

module.exports = { createIterable };

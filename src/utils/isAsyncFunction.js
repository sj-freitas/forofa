const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

/**
 * Checks if the specific object is an async function.
 * @param {Object} instance object to check.
 */
const isAsyncFunction = instance =>
  Object.getPrototypeOf(instance) === AsyncFunction.prototype;

export default isAsyncFunction;

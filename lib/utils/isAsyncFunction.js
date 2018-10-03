const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

const isAsyncFunction = (instance) => {
  return Object.getPrototypeOf(instance) === AsyncFunction.prototype;
}

module.exports = { isAsyncFunction };

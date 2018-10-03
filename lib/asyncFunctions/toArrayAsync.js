const { map } = require('./../functions');
const { isAsyncFunction } = require('./../utils');

const toArrayAsync = async (iterable) => {
  const promises = map(iterable, t => isAsyncFunction(t)? t() : t);

  return await Promise.all(promises);
};

module.exports = { toArrayAsync };

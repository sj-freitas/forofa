const { map } = require("./../functions");
const { isAsyncFunction } = require("./../utils");

const toArrayAsync = async iterable => {
  const promises = map(iterable, t => (isAsyncFunction(t) ? t() : t));
  const result = await Promise.all(promises);

  return result;
};

module.exports = { toArrayAsync };

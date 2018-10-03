const toObject = (iterable, keyFunc, valueFunc) => {
  const object = {};
  for (const curr of iterable) {
    object[keyFunc(curr)] = valueFunc(curr);
  }

  return object;
};

module.exports = { toObject };

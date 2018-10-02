const concat = function* (iterable, iterableToConcat) {
  yield* iterable;
  yield* iterableToConcat;
};

module.exports = { concat };

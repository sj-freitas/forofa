function* concat(iterable, iterableToConcat) {
  yield* iterable;
  yield* iterableToConcat;
}

module.exports = { concat };

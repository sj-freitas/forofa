function* concat(iterable, iterableToConcat) {
  yield* iterable;
  yield* iterableToConcat;
}

export default concat;

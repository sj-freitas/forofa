function* mapMany(iterable, getIterableFunc) {
  const iterator = iterable[Symbol.iterator]();

  for (;;) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    }

    yield* getIterableFunc(value);
  }
}

export default mapMany;

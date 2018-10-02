const skip = function* (iterable, number) {
  for (const curr of iterable) {
    if (--number < 0) {
      yield curr;
    }
  }
};

module.exports = { skip };

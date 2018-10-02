const take = function* (iterable, number) {
  for (const curr of iterable) {
    yield curr;

    if (!--number) {
      break;
    }
  }
};

module.exports = { take };

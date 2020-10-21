function* skip(iterable, number) {
  let count = number;

  for (const curr of iterable) {
    count -= 1;
    if (count < 0) {
      yield curr;
    }
  }
}

export default skip;

function* take(iterable, number) {
  let count = number;

  for (const curr of iterable) {
    yield curr;

    count -= 1;
    if (!count) {
      break;
    }
  }
}

export default take;

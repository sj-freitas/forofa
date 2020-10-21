import filter from "./filter";

const first = (iterable, filterCondition = () => true) => {
  const filtered = filter(iterable, filterCondition);
  const iterator = filtered[Symbol.iterator]();

  for (;;) {
    const { done, value } = iterator.next();
    if (done) {
      break;
    }
    return value;
  }
  throw new Error("Sequence contains no matching elements");
};

export default first;

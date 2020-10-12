import filter from "./filter";
import take from "./take";

const single = (iterable, filterCondition = () => true) => {
  const filtered = filter(iterable, filterCondition);
  const filteredWithTake = take(filtered, 2);
  const iterator = filteredWithTake[Symbol.iterator]();

  const { done, value } = iterator.next();
  if (done) {
    throw new Error("Sequence contains no matching elements");
  }

  if (!iterator.next().done) {
    throw new Error("Sequence contains more than one element");
  }

  return value;
};

export default single;

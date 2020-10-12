import createIterable from "../utils/createIterable";

const filter = (iterable, filterCondition) => {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  return createIterable(() => {
    for (;;) {
      const { done, value } = iterator.next();

      if (done || filterCondition(value, index++)) {
        return {
          value,
          done
        };
      }
    }
  });
};

export default filter;

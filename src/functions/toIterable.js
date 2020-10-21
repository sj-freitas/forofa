const toIterable = value => ({
  [Symbol.iterator]: () => {
    let done = false;
    return {
      next: () => {
        const result = {
          done,
          value
        };

        done = true;
        return result;
      }
    };
  }
});

export default toIterable;

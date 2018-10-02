const repeat = (number, value) => ({
  [Symbol.iterator]: () => {
    return {
      next: () => {
        return {
          value: value,
          done: !number--,
        };
      },
    };
  },
});

module.exports = { repeat };

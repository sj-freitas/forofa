import createIterable from "../utils/createIterable";

const repeat = (value, number) => {
  let count = number;

  return createIterable(() => {
    const next = {
      value,
      done: !count
    };

    count -= 1;
    return next;
  });
};

export default repeat;

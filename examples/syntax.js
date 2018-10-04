const { Iterable } = require("../lib");

/*
 * Example of an operation using the Iterable library and the array
 * prototype functions.
 */
const simpleArray = ["2", "1", "4", "3", "7", "2", "3", "99", "42"];

// [3, 7, 3, 99]
const fromLazy = new Iterable(simpleArray)
  .map(t => parseInt(t, 10))
  .filter(t => t >= 3)
  .skip(1)
  .take(4)
  .toArray();

// [3, 7, 3, 99]
const fromEager = simpleArray
  .map(t => parseInt(t, 10))
  .filter(t => t >= 3)
  .slice(1, 5);

console.log(`lazy = [${fromLazy}]`);
console.log(`eager = [${fromEager}]`);

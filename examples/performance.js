const { performance } = require("perf_hooks");
const { Iterable } = require("../lib");
const { repeat } = require("../lib/functions");

const results = {};
const roundDecimals = (number, numberOfDecimals) => {
  const base = 10 ** numberOfDecimals;

  return (Math.round(number * base) / base).toFixed(numberOfDecimals);
};

const doTest = (testMethod, saveResult, nTries) => {
  let totalTime = 0;
  for (let i = 0; i < nTries; i += 1) {
    const prev = performance.now();

    testMethod();

    const interval = performance.now() - prev;
    totalTime += interval;
  }

  saveResult(totalTime);
};

const runTestAux = (name, nTries, test) => {
  doTest(
    test,
    (time) => {
      results[name] = `${roundDecimals(time, 3)} ms`;
    },
    nTries
  );
};

/**
 * Example of a performance test with a variable array and t
 */
const numberOfTries = 100;
const numberOfElementsPerCollection = 100000;

/**
 * Example of the operations to do.
 */
const doTransforms = (collection) =>
  collection
    .map((t) => parseInt(t, 10))
    .filter((t) => t >= 3)
    .slice(15, Math.floor(numberOfElementsPerCollection / 2))
    .reduce((prev, curr) => prev + curr);

const complexArray = new Iterable(repeat(1, numberOfElementsPerCollection))
  .map(() => Math.floor(Math.random() * 10000) + 1)
  .toArray();

runTestAux("lazy", numberOfTries, () => {
  const result = doTransforms(new Iterable(complexArray));
  const isIterable = result[Symbol.iterator];

  if (isIterable) {
    return result.toArray();
  }
  return result;
});
runTestAux("eager", numberOfTries, () => doTransforms(complexArray));

// eslint-disable-next-line no-console
console.log(JSON.stringify(results));

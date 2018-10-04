const { performance } = require("perf_hooks");
const { Iterable } = require("./../lib");
const { repeat } = require("./../lib/functions");

const simpleArray = ["2", "1", "4", "3", "7", "2", "3", "99"];
const complexArray = new Iterable(repeat(100000, 1))
  .map(() => Math.floor(Math.random() * 10000) + 1)
  .toArray();

const lazyJs = array =>
  new Iterable(array)
    .map(t => parseInt(t, 10))
    .filter(t => t >= 3)
    .skip(1)
    .take(4)
    .toArray();

const eagerJs = array =>
  array
    .map(t => parseInt(t, 10))
    .filter(t => t >= 3)
    .slice(1, 5);

console.log(lazyJs(simpleArray));
console.log(eagerJs(simpleArray));

const doTest = (testId, numberOfTries, testMethod) => {
  let totalTime = 0;
  for (let i = 0; i < numberOfTries; i += 1) {
    const prev = performance.now();

    testMethod();

    const interval = performance.now() - prev;
    totalTime += interval;
  }

  console.log(`${testId} - completed in ${totalTime}!`);
};

const numberOfTries = 100;
doTest("lazy", numberOfTries, () => lazyJs(complexArray));
doTest("eager", numberOfTries, () => eagerJs(complexArray));

const { FluentIterable } = require('./../lib');
const { repeat } = require('./../lib/functions');
const { performance } = require('perf_hooks');

const simpleArray = ['2', '1', '4', '3', '7', '2', '3', '99'];
const complexArray = new FluentIterable(repeat(1000, 1))
    .map(t => Math.floor(Math.random() * 10000) + 1)
    .toArray();

const lazyJs = (array) => {
    return new FluentIterable(array)
        .map(t => parseInt(t))
        .filter(t => t >= 3)
        .skip(1)
        .take(5)
        .first();
};

const eagerJs = (array) => {
    return array
        .map(t => parseInt(t))
        .filter(t => t >= 3)
        [0];
};

console.log(lazyJs(simpleArray));
console.log(eagerJs(simpleArray));

const doTest = (testId, numberOfTries, testMethod) => {
    let totalTime = 0;
    for (let i = 0; i <numberOfTries; i++) {
        const prev = performance.now();

        testMethod();

        const interval = performance.now() - prev;
        totalTime += interval;
    }

    console.log(`${testId} - completed in ${totalTime}!`);
};

const numberOfTries = 1;
doTest('lazy', numberOfTries, () => lazyJs(complexArray));
doTest('eager', numberOfTries, () => eagerJs(complexArray));

const { FluentIterable } = require('./../lib');
const { performance } = require('perf_hooks');

const simpleArray = ['2', '1', '4', '3', '7', '2', '3', '99'];
const complexArray = FluentIterable
    .repeat(500000, 1)
    .map(t => Math.floor(Math.random() * 10000) + 1)
    .toArray();

const lazyJs = (array) => {
    return new FluentIterable(array)
        .map(t => parseInt(t))
        .filter(t => t >= 3)
        .toArray();
}

const eagerJs = (array) => {
    return array
        .map(t => parseInt(t))
        .filter(t => t >= 3);
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

const numberOfTries = 100;
doTest('lazy', numberOfTries, () => lazyJs(complexArray));
doTest('eager', numberOfTries, () => eagerJs(complexArray));

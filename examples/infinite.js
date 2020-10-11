const { repeat } = require("../lib/functions");
const { Iterable } = require("../lib");

const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num !== 1 && num !== 0;
};

const infiniteSequence = new Iterable(repeat(0, Infinity));
const progressiveSequence = infiniteSequence.map((start, idx) => start + idx);

// This will get the first 5 prime numbers in the sequence and
// save it as an array. Careful to not call toArray, count or
// any method that is supposed to get to the end of a sequence
// on infinite sequences.
const primes = new Iterable(progressiveSequence)
  .filter(isPrime)
  .take(5)
  .toArray();

// eslint-disable-next-line no-console
console.log(primes);

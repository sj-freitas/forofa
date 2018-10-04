const { createIterable } = require("./../lib/utils/createIterable");
const { Iterable } = require("./../lib");

const isPrime = num => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num !== 1 && num !== 0;
};

const createFibonacci = () => {
  let prev = 0;
  let curr = 1;

  return createIterable(() => {
    const oldCurr = curr;
    const next = {
      done: false,
      value: prev
    };

    curr += prev;
    prev = oldCurr;

    return next;
  });
};

// This will get the first 5 prime numbers in the fibonacci
// sequence and save it as an array. Careful to not call
// toArray, count or any method that is supposed to get to
// the end of a sequence on infinite sequences.
const primes = new Iterable(createFibonacci())
  .filter(isPrime)
  .take(5)
  .toArray();

console.log(primes);

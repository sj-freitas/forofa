# forofa

[![Build Status](https://travis-ci.org/sj-freitas/forofa.svg?branch=master)](https://travis-ci.org/sj-freitas/forofa)
[![codecov](https://codecov.io/gh/sj-freitas/forofa/branch/master/graph/badge.svg)](https://codecov.io/gh/sj-freitas/forofa)
[![dependencies Status](https://david-dm.org/sj-freitas/forofa/status.svg)](https://david-dm.org/sj-freitas/forofa)

[![Maintainability](https://api.codeclimate.com/v1/badges/61676b6d8d92faad718e/maintainability)](https://codeclimate.com/github/sj-freitas/forofa/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61676b6d8d92faad718e/test_coverage)](https://codeclimate.com/github/sj-freitas/forofa/test_coverage)

A lazy iteration library that contains many of the `Array.prototype` methods that support any objects that implement the iterator [protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). It also contains the `Iterable` and `AsyncIterable` types that can be easily extended and allow a fluent API. Since this library is all about iterators, it can support infinite iteratables, such as a Fibonacci sequence or any other infinite sequence.

## Functions

Click [here](./functions) to check all the currently supported functions.

## Example

Most collection types in JavaScript implement the iterator protocol (Array, String, Set, Map), this library wraps any iterable into an object that has several fluent-api functions, allowing the types to be abstracted but still share the same methods. The wrapper also implements the iterator protocol, allowing the resulting iterables to be used with `for..of` loops, hence, the name.

```js
const { Iterable } = require("forofa");

// This is lazy, nothing has been iterated yet.
const iterable = new Iterable(["2", "1", "4", "3", "7", "2", "3", "99"])
  .map(t => parseInt(t))
  .filter(t => t >= 3);

// Does the iteration itself.
for (const curr of iterable) {
  console.log(curr);
}
```

This will print in `4`, `3`, `7`, `3` and `99`.

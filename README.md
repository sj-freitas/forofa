# forofa.js 🥓

[![Build Status](https://travis-ci.org/sj-freitas/forofa.svg?branch=master)](https://travis-ci.org/sj-freitas/forofa)
[![codecov](https://codecov.io/gh/sj-freitas/forofa/branch/master/graph/badge.svg)](https://codecov.io/gh/sj-freitas/forofa)
[![dependencies Status](https://david-dm.org/sj-freitas/forofa/status.svg)](https://david-dm.org/sj-freitas/forofa)

[![Maintainability](https://api.codeclimate.com/v1/badges/61676b6d8d92faad718e/maintainability)](https://codeclimate.com/github/sj-freitas/forofa/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61676b6d8d92faad718e/test_coverage)](https://codeclimate.com/github/sj-freitas/forofa/test_coverage)

A lazy iteration library that contains many of the `Array.prototype` methods that support any objects that implement the iterator [protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). It also contains the `Iterable` and `AsyncIterable` types that can be easily extended and allow a fluent API.

Since this library is all about iterators, it can support infinite iteratables, such as a Fibonacci sequence or any other infinite sequence.

## Getting Started

`npm install forofa --save`

### Examples

Since most collection types in JavaScript implement the iterator protocol, this library wraps any iterable into an object that has several fluent-api functions, allowing the types to be abstracted but still share the same methods. The wrapper also implements the iterator protocol, allowing the resulting iterables to be used with `for..of` loops, hence, the name.

```JavaScript
const { Iterable } = require("forofa");

 const iterable = new Iterable(['2', '1', '4', '3', '7', '2', '3', '99'])
  .map(t => parseInt(t))
  .filter(t => t >= 3);

for (const curr of iterable) {
  console.log(curr);
}
```

This will print in `4, 3, 7, 3, 99`.

The `toArray()` method will make the iterable concrete.

```JavaScript
const { createIterable } = require("forofa/utils");
const { Iterable } = require("forofa");

const createFibonacci = () => {
  let prev = 0;
  let curr = 1;

  return createIterable(() => {
    const oldCurr = curr;
    const next = {
      done: false,
      value: prev,
    };

    curr = curr + prev;
    prev = oldCurr;

    return next;
  });
};

const fibonacci = new Iterable(createFibonacci()).skip(1).take(5).toArray();
console.log(fibonacci);
```

This will print `[1, 2, 3, 5, 8]`, even though the fibonacci sequence is infinite. Calling functions such as `toArray()`, `reduce()` or `count()` can result in the application blocking!

### Extending

The fluent-api can be easily extended without having to change the source code. The `Iterable` and `AsyncIterable` classes can be both extended to add different features, for example, a version with a `toString` function.

```JavaScript
const { Iterable } = require("./../lib");

class ExtendedIterable extends Iterable {
  toString() {
    return `[${super.join(", ")}]`;
  }
}

// Will be "[2, 3, 4]"
const stringArray = new ExtendedIterable([2, 3, 4]).toString();
```

### Performance

Since iterables are inferred, the execution only matters when they are concretized. Therefore, the performance can vary on the type of concretization. `toArray` will always offer the worst performing one, since the whole collection is eagerly read and saved to an array, however, depending on the amount of elements and the type of transformations, it can be much better performant than the default `map` and `filter`.

#### Regular Case Scenario

```JavaScript
const { Iterable } = require("forofa");
const { repeat } = require("forofa/functions");

const numberOfElements = 70000;
const complexArray = new Iterable(repeat(numberOfElements, 1))
  .map(t => Math.floor(Math.random() * 10000) + 1)
  .toArray();

const lazyJs = (array) => {
  return new Iterable(array)
    .map(t => parseInt(t))
    .filter(t => t >= 3)
    .skip(1)
    .take(4)
    .toArray();
};

const eagerJs = (array) => {
  return array
    .map(t => parseInt(t))
    .filter(t => t >= 3)
    .slice(1, 5);
};
```

For 100 tries for each test, the results are as following (times in ms):

| Types              |    1    |    10     |    100    |   1000    |   10000   |    100000 |
| ------------------ | :-----: | :-------: | :-------: | :-------: | :-------: | --------: |
| Iterable           |  1.205  |   1.136   |   1.333   | **0.653** | **0.830** | **0.656** |
| Array.map & filter | **0.1** | **0.173** | **1.000** |   5.976   |  46.855   |   1789.61 |

Even though performance isn't always the best, it's interesting to take into consideration that iterables are already an abstraction and any collection type can be considered as one, making the Iterable code applyable to any collection, such as Sets, Strings, Arrays, etc.

#### Worst Case Scenario

```JavaScript
const { Iterable } = require("forofa");
const { repeat } = require("forofa/functions");

const complexArray = new Iterable(repeat(numberOfElements, 1))
  .map(t => Math.floor(Math.random() * 10000) + 1)
  .toArray();

const lazyJs = (array) => {
  return new Iterable(array)
    .map(t => parseInt(t))
    .filter(t => t >= 3)
    .toArray();
};

const eagerJs = (array) => {
  return array
    .map(t => parseInt(t))
    .filter(t => t >= 3);
};
```

For 100 tries for each test, the results are as following (times in ms):

| Types              |    1     |    10     |    100    |   1000    |   10000    |     100000 |
| ------------------ | :------: | :-------: | :-------: | :-------: | :--------: | ---------: |
| ITerable           |  0.823   |   1.237   |   5.138   |  11.675   |   75.693   | **762.78** |
| Array.map & filter | **0.08** | **0.143** | **0.750** | **5.295** | **46.682** |    1718.92 |

There's a noticeable performance gain after the arrays start getting very large.

### Prerequisites

ES2017 is needed or any transpiling tool, since the library supports async functions, generator functions as well as the `Symbol.iterator` keyword.

## Running the tests

`yarn test`

Will execute all tests including code coverage for all the generic functions.

## Contributing

Any contribution is allowed, create an issue on the [GitHub](https://github.com/sj-freitas/forofa) page describing in detail the feature, then, feel free to post a merge request!

## Authors

- **Sérgio Freitas** - _Initial work_ - [sj-freitas](https://github.com/sj-freitas)

See also the list of [contributors](https://github.com/sj-freitas/forofa/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- People at [Hexis Technology Hub](https://hexis-hub.com/#home) for their great support
- [C# Linq](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/getting-started-with-linq)

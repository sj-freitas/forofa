Below the many functions currently supported are documented.

## Table of Contents

- [concat](#concat)
- [count](#count)
- [every](#every)
- [filter](#filter)
- [first](#first)
- [get](#get)
- [join](#join)
- [last](#last)
- [map](#map)
- [mapMany](#mapmany)
- [reduce](#reduce)
- [repeat](#repeat)
- [single](#single)
- [skip](#skip)
- [slice](#slice)
- [some](#some)
- [take](#take)
- [toArray](#toarray)
- [toIterable](#toiterable)

## concat

Lazily concatenates two iterables by merging them together into a separate iteratable, it does not change any of the iterables.

### Example

```js
const { Iterable } = require("forofa");

const iterable1 = new Iterable([1, 2, 3, 4]);
const iterable2 = new Iterable("5678").map(t => parseInt(t));

for (const curr of iterable1.concat(iterable2)) {
  console.log(curr);
}
```

## count

Iterates the collection until its end and returns the amount of items.
**Warning**: This function can block your code in case of infinite iterables.

### Example

```js
const { Iterable } = require("forofa");

const iterable = new Iterable([1, 2, 3, 4]);

console.log(iterable.count());
```

This example will print `4`.

```js
const { Iterable } = require("forofa");

function* createInfiniteCollection() {
  let i = 0;
  while (true) {
    yield i;
  }
}

const iterable = new Iterable([1, 2, 3, 4]);

// This will cause a block!
iterable.count();
```

However, the operation can be concluded and return `Infinity` when it reaches the `INFINITY_THRESHOLD` parameter, which acts as a fail-safe. By default the threshold is set to `9007199254740992`, but it can be changed to a negative number so it'll never be reached.

## every

Similar to the [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) function, gets whether or not all the elements contained in the iterable fulfil a certain criteria. For better performance, the iteration will stop once a value that does not fulfil the criteria is found.
**Warning**: This function can block your code in case of infinite iterables.

### Examples

```js
const { Iterable } = require("forofa");

const iterable1 = new Iterable([1, 2, 3, 4]);
const iterable2 = new Iterable([1, 2, -3, -4]);
const isPositiveNumber = curr => curr > 0;

console.log(iterable1.every(isPositiveNumber));
console.log(iterable2.every(isPositiveNumber));
```

This will print `true` and `false` in order.

To demonstrate that it doesn't go through all values, check the example below.

```js
const { Iterable } = require("forofa");

let iterationCount = 0;
function* addLogToArray(array) {
  for (const curr of array) {
    iterationCount++;
    yield curr;
  }
}

new Iterable(addLogToArray([1, 2, -3, 4, 5, 6])).every(curr => curr > 0);
console.log(iterationCount);
```

This will show `3`, as the iterator was iterated three times.

## filter

Similar to the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function, but will function in a lazy manner, only filtering each item on demand. On every next call, it'll cycile through the iteratable until it finds an item that fulfils the condition.

### Example

```js
const { Iterable } = require("forofa");

const onlyEven = new Iterable([9, 2, 3, 40, 33, 35]).filter(
  curr => curr % 2 === 0
);

for (const curr of onlyEven) {
  console.log(curr);
}
```

This will print `2` and `40`.

## first

Will get the first element that fulfils the criteria and returns it. If no element is found it'll throw an error. This function was inspired on the [Linq First](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first?redirectedfrom=MSDN&view=netframework-4.7.2#overloads).
**Warning**: If empty or there's no match, it'll throw an error.

### Example

```js
const { Iterable } = require("forofa");

const first = new Iterable([1, 2, -3, 4, 5, 6]).first(curr => curr < 0);
console.log(first);
```

It'll print `-3`.

## get

Given an index, it'll give the element at the specific position. It'll return undefined if reaches an out of bounds value.

### Example

```js
const { Iterable } = require("forofa");

function* infiniteSequence(startValue) {
  let i = startValue;
  for (;;) {
    yield i;
    i += 1;
  }
}

console.log(new Iterable(infiniteSequence(1)).get(5));
```

It'll print `6`.

## join

Similar to the [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join), it's mostly an auxilary method. It'll convert the collection to a string and join the parts with the separator string.

### Example

```js
const { Iterable } = require("forofa");

function* daysOfTheWeek(startValue) {
  yield "Monday";
  yield "Tuesday";
  yield "Wednesday";
  yield "Thursday";
  yield "Friday";
  yield "Saturday";
  yield "Sunday";
}

const weekend = new Iterable(daysOfTheWeek())
  .skip(5)
  .take(2)
  .join(" and ");
console.log(weekend);
```

This will print `Saturday and Sunday`.

## last

Will get the last element that fulfils the criteria and returns it. If no element is found it'll throw an error. This function was inspired on the [Linq Last](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last?view=netframework-4.7.2).
**Warning**: If empty or there's no match, it'll throw an error.
**Warning**: This function can block your code in case of infinite iterables.

### Examples

```js
const { Iterable } = require("forofa");

const last = new Iterable([1, 2, 3, 4, 5, 6]).last();
console.log(last);
```

It'll print `6`.
Check at this [RunKit](https://runkit.com/embed/t0acmy92rge3)

```js
const { Iterable } = require("forofa");

const last = new Iterable([1, 2, 3, 4, 5, 6]).last(t => t < 4);
console.log(last);
```

It'll print `3`.
Check at this [RunKit](https://runkit.com/embed/6ja0h8zgdh1y)

## map

Similar to the [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function, but will function in a lazy manner, only mapping each item on demand.

### Example

```js
const { Iterable } = require("forofa");

const numbersInText = ["1", "2", "3"];
const numbers = new Iterable(numbersInText).map(parseInt).map(t => t * 2);

for (const curr of numbers) {
  console.log(curr);
}
```

This will print `2`, `4` and `6`.

## mapMany

Takes inspiration on the [Linq SelectMany](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectmany?view=netframework-4.7.2) which takes a collection per individual item and flattens them as a single collection but in a lazy fashion. This function is very useful when having a collection of objects where each object has in itself another collection.

### Example

```js
const { Iterable } = require("forofa");

const customer1 = {
  products: ["Apples", "Bananas"]
};
const customer2 = {
  prodcuts: ["Oranges", "Melons"]
};

const fruits = new Iterable([customer1, customer2]).mapMany(t => t.products);

for (const fruit of fruits) {
  console.log(fruit);
}
```

This will print `Apples`, `Bananas`, `Oranges` and `Melons`.

## reduce

Similar to the [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) function. Keeping the same behavior but working with all iterable types, not just arrays.

### Example

```js
const { Iterable } = require("forofa");

const sum = new Iterable("12345").reduce(
  (prev, next) => parseInt(prev) + parseInt(next)
);
console.log(sum);
```

This will print `15`.

## repeat

Creates a lazy collection of the same element repeated n times. It can be used to create infinite collections. It has O(1) creation cost as it doesn't necessarily create anything.

### Example

```js
const { repeat } = require("forofa/functions");

const words = repeat("word", 3);
for (const curr of words) {
  console.log(curr);
}
```

This will print `word` three times.

## single

Will get the single element that fulfils the criteria and returns it. If no element is found it'll throw an error. If there are more than 1 element from the criteria it'll throw an error. This function was inspired on the [Linq Single](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.single?view=netframework-4.7.2).
**Warning**: If empty or there's no match, it'll throw an error.
**Warning**: If more than 1 match, it'll throw an error.
**Warning**: If the collection is infinite and it has a predicate that is fulfilled just once, it can block your code.

### Examples

```js
const { Iterable } = require("forofa");

const single = new Iterable([1, 2, 3, 4, 5, 6]).single(t => t > 5);
console.log(single);
```

It'll print `6`.
Check at this [RunKit](https://runkit.com/embed/rx1ouvkjuqnp)

```js
const { Iterable } = require("forofa");

const single = new Iterable([1, 2, 3, 4, 5, 6]).single(t => t < 4);
console.log(single);
```

It'll throw an error.
Check at this [RunKit](https://runkit.com/embed/aprbtjg05p07)

## skip

Takes inspiration on the [Linq Skip](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skip?view=netframework-4.7.2) which will pass through the n first elements.

### Example

```js
const { Iterable } = require("forofa");

const items = new Iterable([1, 2, 3, 4, 5]).skip(2);
for (const curr of items) {
  console.log(curr);
}
```

This will print `3`, `4` and `5`.

## slice

Similar to the [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) function, but in a lazy fashion, it won't create a new collection or iterate through the items, it'll use the skip and take implementation under the hood.

### Example

```js
const { Iterable } = require("forofa");

const items = new Iterable([1, 2, 3, 4, 5]).slice(1, 4);
for (const curr of items) {
  console.log(curr);
}
```

This will print `2`, `3` and `4`.

## some

Similar to the [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) function, gets whether or not all the elements contained in the iterable fulfil a certain criteria. For better performance, the iteration will stop once a value that does not fulfil the criteria is found.
**Warning**: This function can block your code in case of infinite iterables.

### Example

```js
const { Iterable } = require("forofa");

const iterable1 = new Iterable([1, 2, -3, -4]);
const iterable2 = new Iterable([1, 2, 3, 4]);
const isNegativeNumber = curr => curr < 0;

console.log(iterable1.some(isNegativeNumber));
console.log(iterable2.some(isNegativeNumber));
```

This will print `true` and `false` in order.

## take

Takes inspiration on the [Linq Take](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take?view=netframework-4.7.2) which will take the n first elements.

### Example

```js
const { Iterable } = require("forofa");

const items = new Iterable([1, 2, 3, 4, 5]).take(3);
for (const curr of items) {
  console.log(curr);
}
```

This will print `1`, `2` and `3`.

## toArray

Concretizes the iterable to an array, materializing all its values.
**Warning**: This function can block your code in case of infinite iterables.

### Example

```js
const { Iterable } = require("forofa");

function* createCollection() {
  yield 1;
  yield 2;
  yield 3;
}

const items = new Iterable(createCollection()).toArray();
console.log(items);
```

This will print `Array(3) [1, 2, 3]`.

## toIterable

Wraps the single item as an iterable. This can be the equivalent to wrapping an item onto an array however this won't allocate an array in memory.

### Example

```js
const { toIterable } = require("forofa/functions");

// Equivalent to doing [5].
const item = toIterable(5);
for (const curr of item) {
  console.log(curr);
}
```

This will print `5`.

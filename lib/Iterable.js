const Functions = require("./functions");

/**
 * Auxiliary class that wraps an iterable instance (object that
 * implements the iterator protocol) and contains methods that provide
 * a fluent api.
 *
 * @param {Iterable} iterable The wrapped iterable object that implements
 * the iterator protocol.
 */
const Iterable = class {
  constructor(iterable) {
    this.iterable = iterable;
  }

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  concat(iterableToConcat) {
    return new this.constructor(
      Functions.concat(this.iterable, iterableToConcat)
    );
  }

  count(infinityThreshold) {
    return Functions.count(this.iterable, infinityThreshold);
  }

  every(filterCondition) {
    return Functions.every(this.iterable, filterCondition);
  }

  filter(filterCondition) {
    return new this.constructor(
      Functions.filter(this.iterable, filterCondition)
    );
  }

  first(filterCondition) {
    return new this.constructor(
      Functions.first(this.iterable, filterCondition)
    );
  }

  single(filterCondition) {
    return new this.constructor(
      Functions.single(this.iterable, filterCondition)
    );
  }

  last(filterCondition) {
    return new this.constructor(Functions.last(this.iterable, filterCondition));
  }

  get(index) {
    return Functions.get(this.iterable, index);
  }

  join(separator) {
    return Functions.join(this.iterable, separator);
  }

  map(mapProjection) {
    return new this.constructor(Functions.map(this.iterable, mapProjection));
  }

  mapMany(getIterableFunc) {
    return new this.constructor(
      Functions.mapMany(this.iterable, getIterableFunc)
    );
  }

  reduce(reduceFunction, initialValue) {
    return Functions.reduce(this.iterable, reduceFunction, initialValue);
  }

  skip(number) {
    const skipped = Functions.skip(this.iterable, number);

    return new this.constructor(skipped);
  }

  slice(indexFrom, indexTo) {
    const sliced = this.skip(indexFrom).take(indexTo - indexFrom);

    return new this.constructor(sliced);
  }

  some(filterCondition) {
    return Functions.some(this.iterable, filterCondition);
  }

  take(number) {
    return new this.constructor(Functions.take(this.iterable, number));
  }

  toArray() {
    return Functions.toArray(this.iterable);
  }
};

module.exports = { Iterable };

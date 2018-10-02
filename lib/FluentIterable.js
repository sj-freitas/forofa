const Functions = require('./functions')
const { IterableConcretizer } = require('./IterableConcretizer');

/**
 * Wraps an Iterable object to allow many functions that 
 * 
 * @param {Iterable} iterable 
 */
const FluentIterable = class extends IterableConcretizer {

  static repeat(number, value) {
    return new this.constructor(Functions.repeat(number, value));
  }
  
  concat(iterableToConcat) {
    return new this.constructor(Functions.concat(this.iterable, iterableToConcat));
  }

  filter(filterCondition) {
    return new this.constructor(Functions.filter(this.iterable, filterCondition));
  }

  get(index) {
    return Functions.get(this.iterable, index);
  }

  map(mapProjection) {
    return new this.constructor(Functions.map(this.iterable, mapProjection));
  }

  reduce(reduceFunction, initialValue) {
    return Functions.reduce(this.iterable, reduceFunction, initialValue);
  }

  skip(number) {
    const skipped = Functions.skip(this.iterable, number);
    return new this.constructor(skipped);
  }

  take(number) {
    return new this.constructor(Functions.take(this.iterable, number));
  }
};

module.exports = { FluentIterable };

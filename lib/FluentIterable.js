const Functions = require('./functions')
const { IterableConcretizer } = require('./IterableConcretizer');

/**
 * Wraps an Iterable
 * 
 * @param {Iterable} iterable 
 */
const FluentIterable = class extends IterableConcretizer {
  constructor(iterable) {
    super(iterable);
  }

  static repeat(number, value) {
    return new FluentIterable(Functions.repeat(number, value));
  }
  
  concat(iterableToConcat) {
    return new FluentIterable(Functions.concat(this.iterable, iterableToConcat));
  }

  filter(filterCondition) {
    return new FluentIterable(Functions.filter(this.iterable, filterCondition));
  }

  get(index) {
    return Functions.get(this.iterable, index);
  }

  map(mapProjection) {
    return new FluentIterable(Functions.map(this.iterable, mapProjection));
  }

  reduce(reduceFunction, initialValue) {
    return Functions.reduce(this.iterable, reduceFunction, initialValue);
  }

  skip(number) {
    const skipped = Functions.skip(this.iterable, number);
    return new FluentIterable(skipped);
  }

  take(number) {
    return new FluentIterable(Functions.take(this.iterable, number));
  }
};

module.exports = { FluentIterable };

const { Iterable } = require('./Iterable');
const { AsyncFunction } = require('./asyncFunctions');

/**
 * Wraps an Iterable object to allow async functions that allow
 * asynchronous concretization of the enumerable. 
 * 
 * @param {Iterable} iterable 
 */
const AsyncIterable = class extends Iterable {

  async toArrayAsync() {
    return await AsyncFunction.toArrayAsync(this.iterable);
  }

  async firstAsync(filterFunction) {
    return await AsyncFunction.firstAsync(this.iterable, filterFunction);
  }
};

module.exports = { AsyncIterable };

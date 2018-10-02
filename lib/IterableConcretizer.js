const { map } = require('./functions/map');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

const isAsyncFunction = (instance) => {
  return Object.getPrototypeOf(instance) === AsyncFunction.prototype;
}

/**
 * Auxiliary class that wraps an iterable instance (object that
 * implements the iterator protocol) and contains methods that
 * concretize that Iterable into concrete types such as arrays or
 * single items. It also contains async functionality.
 * 
 * It relies on using the raw implementation of the iterator protocol
 * for better performance since the "for ... of" iteration doesn't have
 * the best of performances.
 *
 * @param {Iterable} iterable The wrapped iterable object that implements
 * the iterator protocol.
 */
const IterableConcretizer = class {
  constructor(iterable) {
    this.iterable = iterable;
  };
  
  [Symbol.iterator]() {
    return this.iterable;
  }

  /**
   * Concretizes the iterable instance into an array.
   */
  toArray() {
    const array = [];
    const iterator = this.iterable[Symbol.iterator]();

    while(true) {
      const curr = iterator.next();
      if (curr.done) {
        return array;
      }
      array.push(curr.value);
    }
  }

  first(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const { done, value } = iterator.next();
      if (done) {
        break;
      }
      if (filterCondition(value)) {
        return value;
      }
    }
    throw new Error('There\'s no element!');
  }

  any(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const { done, value } = iterator.next();
      if (done) {
        return false;
      }
      if (filterCondition(value)) {
        return true;
      }
    }
  }

  all(filterCondition) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const { done, value } = iterator.next();
      if (done) {
        return true;
      }
      if (!filterCondition(value)) {
        return false;
      }
    }
  }

  async toArrayAsync() {
    const promises = map(this.iterable, t => isAsyncFunction(t)? t() : t);
 
    return await Promise.all(promises);
  }

  /**
   * Gets the first result from an iterable of async functions or promises
   * that fills up the condition.
   * 
   * @param {Function} filterCondition 
   */
  async firstAsync(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const { done, value } = iterator.next();
      if (done) {
        break;
      }

      // Convert the current value to an async function if it's a promise,
      // if not keep, whichever the value is.
      const asyncFunction = isAsyncFunction(value)?
        value : async () => await value;

      const currentValue = await asyncFunction();
      if (filterCondition(currentValue)) {
        return currentValue;
      }
    }
    throw new Error('There\'s no element!');
  }

  /**
   * Gets the end of the collection
   */
  count() {
    const iterator = this.iterable[Symbol.iterator]();

    let count = 0;
    while(true) {
      const curr = iterator.next();
      if (curr.done) {
        break;
      }
      count++;
    }

    return count;
  }
};

module.exports = { IterableConcretizer };

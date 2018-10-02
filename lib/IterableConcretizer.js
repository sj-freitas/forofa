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
  constructor(iterable = []) {
    this.iterable = iterable;
  };
  
  [Symbol.iterator]() {
    return this.iterable;
  }

  static fromSingle(value) {
    return {
      [Symbol.iterator]: () => {
        let done = false;
        return {
          next: () => {
            const result = {
              done,
              value,
            };

            done = true;
            return result;
          },
        };
      }
    }
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

  firstOrDefault(filterCondition = () => true, defaultValue = undefined) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const current = iterator.next();
      if (current.done) {
        break;
      }
      if (filterCondition(current.value)) {
        return current.value;
      }
    }
    return defaultValue;
  }

  first(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const current = iterator.next();
      if (current.done) {
        break;
      }
      if (filterCondition(current.value)) {
        return current.value;
      }
    }
    throw new Error('There\'s no element!');
  }

  any(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const current = iterator.next();
      if (current.done) {
        return false;
      }
      if (filterCondition(current.value)) {
        return true;
      }
    }
  }

  all(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const current = iterator.next();
      if (current.done) {
        return true;
      }
      if (!filterCondition(current.value)) {
        return false;
      }
    }
  }

  async toArrayAsync() {
    return await Promise.all(this.iterable);
  }

  async firstOrDefaultAsync(filterCondition = () => true, defaultValue = undefined) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const currentPromise = iterator.next();
      if (current.done) {
        break;
      }
      const currentValue = await currentPromise;
      if (filterCondition(currentValue)) {
        return currentValue;
      }
    }
    return defaultValue;
  }

  async firstAsync(filterCondition = () => true) {
    const iterator = this.iterable[Symbol.iterator]();

    while (true) {
      const currentPromise = iterator.next();
      if (current.done) {
        break;
      }
      const currentValue = await currentPromise;
      if (filterCondition(currentValue)) {
        return currentValue;
      }
    }
    throw new Error('There\'s no element!');
  }

  count() {
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

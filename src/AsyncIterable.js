import Iterable from "./Iterable";
import * as AsyncFunction from "./asyncFunctions";

/**
 * Wraps an iterable object to allow async functions that allow
 * asynchronous concretization of the enumerable.
 */
const AsyncIterable = class extends Iterable {
  async toArrayAsync() {
    const result = await AsyncFunction.toArrayAsync(this.iterable);
    return result;
  }

  async firstAsync(filterFunction) {
    const result = await AsyncFunction.firstAsync(
      this.iterable,
      filterFunction
    );
    return result;
  }
};

export default AsyncIterable;

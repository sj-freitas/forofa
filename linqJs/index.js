const filter = {
    name: 'filter',
    func: function* (iterable, filterCondition) {
        let i = 0;
        for (let curr of iterable) {
            if (filterCondition(curr, i++)) {
                yield curr;
            }
        }
    },
}

var lazyFilter = {
    name: 'lazyFilter',
    func: (iterable, filterCondition) => ({
        [Symbol.iterator]: () => {
            const iterator = iterable[Symbol.iterator]();
            return {
                next: () => {
                    while (true) {
                        const current = iterator.next();
                        if (current.done || filterCondition(current.value)) {
                            return {
                                value: current.value,
                                done: current.done,
                            };
                        }
                    }
                },
            };
        },
    }),
};

var lazyMap = {
    name: 'lazyMap',
    func: (iterable, mapProjection) => ({
        [Symbol.iterator]: () => {
            const iterator = iterable[Symbol.iterator]();
            return {
                next: () => {
                    const current = iterator.next();
                    return {
                        value: !current.done && mapProjection(current.value),
                        done: current.done,
                    };
                },
            };
        },
    }),
};

const map = {
    name: 'map',
    func: function* (iterable, mapProjection) {
        let i = 0;
        for (let curr of iterable) {
            yield mapProjection(curr, i++);
        }
    },
};

const take = {
    name: 'take',
    func: function* (iterable, number) {
        for (let curr of iterable) {
            yield curr;

            if (number-- === 0) {
                break;
            }
        }
    },
};

const skip = {
    name: 'skip',
    func: function* (iterable, number) {
        for (let curr of iterable) {
            if (--number < 0) {
                yield curr;
            }
        }
    },
};

const slice = {
    name: 'slice',
    func: function* (iterable, skipAmount, takeAmount) {
        const skipped = skip(iterable, skipAmount);
        
        yield* take(skipped, takeAmount);
    },
};

const concat = {
    name: 'concat',
    func: function* (iterable, iterableToConcat) {
        yield* iterable;
        yield* iterableToConcat;
    },
};

const reduce = {
    name: 'reduce',
    func: (iterable, reduceFunction, initialState) => {
        const iterator = iterable[Symbol.iterator]();
        let i = 0;
        let prevValue = initialState;

        while (true) {
            const current = iterator.next();
            if (current.done) {
                if (i === 0) {
                    throw new TypeError('Reduce of empty iterable with no initial value()');
                }
                return prevValue;
            }
            
            prevValue = prevValue?
                reduceFunction(prevValue, current.value, i) :
                current.value;
            i++;
        }
    },
};

const get = {
    name: 'get',
    func: (iterable, index) => {
        const iterator = iterable[Symbol.iterator]();
        let i = 0;

        while (true) {
            const current = iterator.next();
            
            if (current.done || i++ === index) {
                return current.value;
            }
        }
    },
};

const DEFAULT_ACTIONS = [
    filter,
    map,
    take,
    skip,
    slice,
    concat,
    lazyFilter,
    lazyMap,
    get,
];

const DEFAULT_FILTER_CONDITION = () => true;

const auxFirst = (iterable, filterCondition, onFailure) => {
    for (let curr of iterable) {
        if (filterCondition(curr)) {
            return curr;
        }
    }
    return onFailure();
};

const createIterableType = (functions = DEFAULT_ACTIONS) => {
    return class Iterable {
        constructor(iterable = []) {
            this.iterable = iterable;
            
            functions.forEach(({ name, func }) => {
                this[name] = (...args) => {
                    const parameters = [...args];
                    parameters.unshift(this.iterable);
                    return new Iterable(func.apply(null, parameters));
                };
            });
        };
        
        [Symbol.iterator]() {
            return this.iterable;
        }

        toArray() {
            const array = [];
            const iterator = this.iterable[Symbol.iterator]();
            while(true) {
                const curr = iterator.next();
                if (curr.done) {
                    break;
                }
                array.push(curr.value);
            }

            return array;
        }

        firstOrDefault(whereCondition, defaultValue) {
            return auxFirst(this.iterable, whereCondition, () => defaultValue);
        }

        first(whereCondition) {
            return auxFirst(this.iterable, whereCondition, () => {
                throw new Error('There\'s no element!');
            });
        }

        async toArrayAsync() {
            return await Promise.all(this.iterable);
        }

        async firstOrDefaultAsync() {

        }

        async firstAsync(){

        }

        async singleOrDefaultAsync() {

        }

        async singleAsync() {

        }
    };
};

module.exports = {
    filter,
    map,
    skip,
    take,
    slice,
    createIterableType,
    Iterable: createIterableType(),
};

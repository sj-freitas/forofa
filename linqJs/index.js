class Iterable {
    constructor(iterable) {
        this.iterable = iterable;
    };
    
    [Symbol.iterator]() {
        return this.iterable;
    }

    filter(whereCondition) {
        return new Iterable(function*(iterable) {
            for (let curr of iterable) {
                if (whereCondition(curr)) {
                    yield curr;
                }
            }
        }(this.iterable));
    }
    
    map(selectProjection) {
        return new Iterable(function*(iterable) {
            for (let curr of iterable) {
                yield selectProjection(curr);
            }
        }(this.iterable));
    }
    
    take(number) {
        return new Iterable(function*(iterable) {
            for (let curr of iterable) {
                if (number-- === 0) {
                    break;
                }
                yield curr;
            }
        }(this.iterable));
    }
    
    skip(number) {
        return new Iterable(function*(iterable) {
            for (let curr of iterable) {
                if (--number < 0) {
                    yield curr;
                }
            }
        }(this.iterable));
    }

    slice(skip, take) {
        return new Iterable(this.iterable)
            .skip(skip)
            .take(take);
    }
    
    firstOrDefault(whereCondition, defaultValue = null) {
        for (let curr of this.iterable) {
            if (whereCondition(curr)) {
                return curr;
            }
        }
        return defaultValue;
    };
    
    toArray() {
        return Array.from(this.iterable);
    };
};

module.exports = {
    Iterable,
};

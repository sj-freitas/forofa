class Iterable {
    constructor(iterable) {
        this.iterable = iterable;
    };
    
    [Symbol.iterator]() {
        return this.iterable;
    }

    where(whereCondition) {
        return new Iterable(function*(iterable) {
            for (let curr of iterable) {
                if (whereCondition(curr)) {
                    yield curr;
                }
            }
        }(this.iterable));
    }
    
    select(selectProjection) {
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
    
    firstOrDefault(whereCondition, defaultValue = null) {
        for (let curr of this.iterable) {
            if (whereCondition(curr)) {
                return curr;
            }
        }
        return defaultValue;
    };
    
    toArray() {
        const array = [];
        for (let curr of this.iterable) {
            array.push(curr);
        }
        return array;
    };
};

module.exports = {
    Iterable,
};

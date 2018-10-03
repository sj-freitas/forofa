const { toObject } = require('./../toObject');

describe('toObject function', () => {
  it('Creates an object provided the functions', () => {
    const generator = function* () {
      yield { key: 'name', value: 'Sergio' };
      yield { key: 'age', value: '28' };
    };

    const object = toObject(generator(), t => t.key, t => t.value);
    expect(object).toEqual({
      name: 'Sergio',
      age: '28',
    });
  });
});

const { get } = require('./../get');

describe('get function', () => {
  it('Gets element in the 3rd position of an array.', () => {
    const array = [1,2,3,4,5];

    const fetched = get(array, 2);

    expect(fetched).toEqual(array[2]);    
  });

  it('Gets element in the 1st position of an array.', () => {
    const array = [1,2,3,4,5];

    const fetched = get(array, 0);

    expect(fetched).toEqual(array[0]);    
  });

  it('Gets element in the last position of an array.', () => {
    const array = [1,2,3,4,5];

    const fetched = get(array, array.length - 1);

    expect(fetched).toEqual(array[array.length - 1]);    
  });

  it('Gets undefined if the position is out of bounds', () => {
    const array = [1,2,3];

    const fetched = get(array, 3);

    expect(fetched).toEqual(undefined);    
  });

  it('Gets undefined if the index is negative.', () => {
    const array = [1,2,3];

    const fetched = get(array, -1);

    expect(fetched).toEqual(undefined);    
  });
});

// import sinon from 'sinon';

import getWrapped from '../src/getWrapped';

it('getWrapped - should work', () => {
  const keys = ['first', 'second', 'third'];
  const values = ['a', 'b', 'c'];

  // Imitate some methods of Range Class
  const rangeClass = (init = [[]]) => {
    let state = init;
    const getValues = () => state;
    const setValues = (newValues) => {
      state = newValues;
    };
    const setValueBy = (i, j) => (value) => {
      state[i][j] = value;
    };
    const getCell = (row, col) => ({ setValue: setValueBy(row - 1, col - 1) });
    return { getValues, setValues, getCell };
  };

  const range = rangeClass([values]);
  const wrapped = getWrapped(keys, range);

  // Calling get() without parameters return data object
  expect(wrapped.get()).toEqual({ first: 'a', second: 'b', third: 'c' });

  // Calling get(key) with 'key' return value
  expect(wrapped.get('first')).toBe('a');

  // update({ key1: value1, key2, value2 })
  expect(wrapped.update({ second: 5 }).get('second')).toBe(5);

  expect(wrapped.get('second')).toBe(5);

  // set(key, value)  for single value
  expect(wrapped.set('second', 10).get('second')).toBe(10);

  expect(wrapped.get('second')).toBe(10);
});

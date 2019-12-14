// import sinon from 'sinon';

import {
  isEmpty, createMap, updateWith, rowWrapper,
} from '../src/main';

it('isEmpty - should work', () => {
  expect(isEmpty()).toBeTruthy();

  expect(isEmpty(null)).toBeTruthy();
  expect(isEmpty(undefined)).toBeTruthy();
  expect(isEmpty(false)).toBeTruthy();

  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty([])).toBeTruthy();
  expect(isEmpty({})).toBeTruthy();

  expect(isEmpty(0)).toBeTruthy();

  expect(isEmpty('some text')).toBe(false);
});

it('createMap - should work', () => {
  const keys = ['first', 'second'];
  const values = ['a', 'b'];
  expect(createMap(keys, values)).toEqual({ first: 'a', second: 'b' });
});

it('updateWith - should work', () => {
  const keys = ['first', 'second'];
  const values = ['a', 'b'];
  const update = updateWith(keys, values);
  expect(update({ second: 'abc' })).toEqual(['a', 'abc']);
});

it('rowWrapper - should work', () => {
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
  const wrapped = rowWrapper(keys, range);

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

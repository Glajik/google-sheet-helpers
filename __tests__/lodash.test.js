// import sinon from 'sinon';

import { isEmpty, hasIn, createMap, pick } from '../src/lodash';

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

it('hasIn - should work', () => {
  const list = ['a', 'b', 'c'];
  expect(hasIn(list, 'b')).toBeTruthy();
  expect(hasIn(list, 'd')).toBeFalsy();
  expect(hasIn([0, 1, 2], 2)).toBeTruthy();
  expect(hasIn([], '')).toBeFalsy();
  expect(hasIn([])).toBeFalsy();
  expect(hasIn()).toBeFalsy();
});

it('createMap - should work', () => {
  const keys = ['first', 'second'];
  const values = ['a', 'b'];
  expect(createMap(keys, values)).toEqual({ first: 'a', second: 'b' });
});

it('pick - should work', () => {
  const dict = { a: 1, b: 2, c: 3 };
  expect(pick(dict, 'a')).toEqual({ a: 1 });
  expect(pick(dict, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  expect(pick(dict, 'd')).toEqual({});
  expect(pick()).toEqual({});
});

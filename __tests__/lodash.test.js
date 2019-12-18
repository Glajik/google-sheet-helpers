// import sinon from 'sinon';

import { isEmpty, hasIn, createMap, pick, isObject, isPlainObject } from '../src/lodash';

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

it('isObject - should work', () => {
  function Foo() {
    this.a = 1;
  }
  expect(isObject({})).toBeTruthy();
  expect(isObject([1, 2, 3])).toBeTruthy();
  expect(isObject(Foo)).toBeTruthy();
  expect(isObject(null)).toBeFalsy();
});

it('isPlainObject - should work', () => {
  expect(isPlainObject({ a: 1 })).toBeTruthy();

  function Foo() {
    this.a = 1;
  }
  expect(isPlainObject(Foo)).toBeFalsy();
  expect(isPlainObject(new Foo())).toBeFalsy();

  expect(isPlainObject([])).toBeFalsy();
  expect(isPlainObject(1)).toBeFalsy();
  expect(isPlainObject(true)).toBeFalsy();
  expect(isPlainObject('string')).toBeFalsy();
  expect(isPlainObject(undefined)).toBeFalsy();
});
// import sinon from 'sinon';

import { isEmpty } from '../src/main';

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

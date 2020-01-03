import createMap from '../src/createMap';

it('createMap - should work', () => {
  const keys = ['first', 'second'];
  const values = ['a', 'b'];
  expect(createMap(keys, values)).toEqual({ first: 'a', second: 'b' });
});

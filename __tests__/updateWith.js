import updateWith from '../updateWith';

it('updateWith_ - should work', () => {
  const keys = ['first', 'second'];
  const values = ['a', 'b'];
  const update = updateWith(keys, values);
  expect(update({ second: 'abc' })).toEqual(['a', 'abc']);
});

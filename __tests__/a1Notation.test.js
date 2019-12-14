import { getLetter, convert } from '../src/a1Notation';

it('getLetter - should work', () => {
  expect(getLetter(1)).toBe('A');
  expect(getLetter(2)).toBe('B');
  expect(getLetter(25)).toBe('Y');
  expect(getLetter(26)).toBe('Z');
  expect(getLetter(27)).toBe('A');
  expect(getLetter(28)).toBe('B');
  expect(getLetter(52)).toBe('Z');
  expect(getLetter(53)).toBe('A');
});

it('convert - should work', () => {
  expect(convert(1)).toBe('A');
  expect(convert(2)).toBe('B');
  expect(convert(26)).toBe('Z');
  expect(convert(27)).toBe('AA');
  expect(convert(28)).toBe('AB');
  expect(convert(29)).toBe('AC');
  expect(convert(30)).toBe('AD');
  expect(convert(52)).toBe('AZ');
  expect(convert(53)).toBe('BA');
  expect(convert(676)).toBe('YZ');
  expect(convert(677)).toBe('ZA');
  expect(convert(703)).toBe('AAA');
  expect(convert(717)).toBe('AAO');
  expect(convert(728)).toBe('AAZ');
  expect(convert(729)).toBe('ABA');
  expect(convert(730)).toBe('ABB');
  expect(convert(18278)).toBe('ZZZ');
});

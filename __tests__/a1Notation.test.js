import { getLetter, getColLetters } from '../src/a1Notation';

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

it('getColLetters - should work', () => {
  expect(getColLetters(1)).toBe('A');
  expect(getColLetters(2)).toBe('B');
  expect(getColLetters(26)).toBe('Z');
  expect(getColLetters(27)).toBe('AA');
  expect(getColLetters(28)).toBe('AB');
  expect(getColLetters(29)).toBe('AC');
  expect(getColLetters(30)).toBe('AD');
  expect(getColLetters(52)).toBe('AZ');
  expect(getColLetters(53)).toBe('BA');
  expect(getColLetters(676)).toBe('YZ');
  expect(getColLetters(677)).toBe('ZA');
  expect(getColLetters(703)).toBe('AAA');
  expect(getColLetters(717)).toBe('AAO');
  expect(getColLetters(728)).toBe('AAZ');
  expect(getColLetters(729)).toBe('ABA');
  expect(getColLetters(730)).toBe('ABB');
  expect(getColLetters(18278)).toBe('ZZZ');
});

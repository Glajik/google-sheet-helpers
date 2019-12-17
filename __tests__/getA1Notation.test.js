import { getLetter_, toLetters_, getA1Notation } from '../src/getA1Notation';

it('getLetter_ - should work', () => {
  expect(getLetter_(1)).toBe('A');
  expect(getLetter_(2)).toBe('B');
  expect(getLetter_(25)).toBe('Y');
  expect(getLetter_(26)).toBe('Z');
  expect(getLetter_(27)).toBe('A');
  expect(getLetter_(28)).toBe('B');
  expect(getLetter_(52)).toBe('Z');
  expect(getLetter_(53)).toBe('A');
});

it('toLetters_ - should work', () => {
  expect(toLetters_(1)).toBe('A');
  expect(toLetters_(2)).toBe('B');
  expect(toLetters_(26)).toBe('Z');
  expect(toLetters_(27)).toBe('AA');
  expect(toLetters_(28)).toBe('AB');
  expect(toLetters_(29)).toBe('AC');
  expect(toLetters_(30)).toBe('AD');
  expect(toLetters_(52)).toBe('AZ');
  expect(toLetters_(53)).toBe('BA');
  expect(toLetters_(676)).toBe('YZ');
  expect(toLetters_(677)).toBe('ZA');
  expect(toLetters_(703)).toBe('AAA');
  expect(toLetters_(717)).toBe('AAO');
  expect(toLetters_(728)).toBe('AAZ');
  expect(toLetters_(729)).toBe('ABA');
  expect(toLetters_(730)).toBe('ABB');
  expect(toLetters_(18278)).toBe('ZZZ');
});

it('getA1Notation - should work', () => {
  expect(() => getA1Notation()).toThrowError('Function expects at least one argument');
  expect(getA1Notation(1)).toBe('1:1');
  expect(getA1Notation(null, 1)).toBe('A:A');
  expect(getA1Notation(1, 1)).toBe('A1');
  expect(getA1Notation(1, 1, 2)).toBe('A1:A2');
  // old - expect(getA1Notation(11, 1, 10)).toBe('A11:A20');
  expect(getA1Notation(11, 1, 20)).toBe('A11:A20');
  expect(getA1Notation(1, 1, 2, 2)).toBe('A1:B2');
  // old - expect(getA1Notation(11, 3, 1, 3)).toBe('C11:E11');
  expect(getA1Notation(11, 3, 11, 5)).toBe('C11:E11');
});

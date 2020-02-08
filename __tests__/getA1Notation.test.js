import getA1Notation, { getOneLetter, getLetters } from '../getA1Notation';

it('getOneLetter - should work', () => {
  expect(getOneLetter(1)).toBe('A');
  expect(getOneLetter(2)).toBe('B');
  expect(getOneLetter(25)).toBe('Y');
  expect(getOneLetter(26)).toBe('Z');
  expect(getOneLetter(27)).toBe('A');
  expect(getOneLetter(28)).toBe('B');
  expect(getOneLetter(52)).toBe('Z');
  expect(getOneLetter(53)).toBe('A');
});

it('getLetters - should work', () => {
  expect(getLetters(1)).toBe('A');
  expect(getLetters(2)).toBe('B');
  expect(getLetters(26)).toBe('Z');
  expect(getLetters(27)).toBe('AA');
  expect(getLetters(28)).toBe('AB');
  expect(getLetters(29)).toBe('AC');
  expect(getLetters(30)).toBe('AD');
  expect(getLetters(52)).toBe('AZ');
  expect(getLetters(53)).toBe('BA');
  expect(getLetters(676)).toBe('YZ');
  expect(getLetters(677)).toBe('ZA');
  expect(getLetters(703)).toBe('AAA');
  expect(getLetters(717)).toBe('AAO');
  expect(getLetters(728)).toBe('AAZ');
  expect(getLetters(729)).toBe('ABA');
  expect(getLetters(730)).toBe('ABB');
  expect(getLetters(18278)).toBe('ZZZ');
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

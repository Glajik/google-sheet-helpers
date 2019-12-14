import { getLetter_, toLetters_ } from '../src/a1Notation';

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

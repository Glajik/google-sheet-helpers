/**
 * Return single character for column number
 * Starts from 'A' for 1
 * If num > 26, it starts again from 'A'
 * 
 * @private
 * @param {Number} num Column number
 * @returns {String} Letter from 'A' to 'Z'
 */
export function getLetter_(num) {
  // Согласно таблице ASCII - код 65 = A
  const offset = 65;
  const remainder = num % 26;
  if (remainder === 0) {
    return 'Z';
  }
  // Функция chr преобразует число в символ
  return String.fromCharCode(offset + remainder - 1);
}

/**
 * Convert column number to column letters, like in Excel.
 * There is used recursion to get letters for any column number.
 * 
 * @private
 * @param {Integer} num Column number
 * @returns {String} Letters 'A-Z', for num < 27 and 'AA-ZZZ', if more
 */
export function toLetters_(num) {
  if (num < 27) {
    return getLetter_(num);
  }
  const result = Math.floor(num / 26);
  if (num % 26 === 0) {
    return toLetters_(result - 1) + getLetter_(num);
  }
  return toLetters_(result) + getLetter_(num);
}
    

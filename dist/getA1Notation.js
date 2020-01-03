/**
 * Return single character for column number
 * Starts from 'A' for 1
 * If num > 26, it starts again from 'A'
 * 
 * @private
 * @param {Number} num Column number
 * @returns {String} Letter from 'A' to 'Z'
 */
function getLetter_(num) {
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
function toLetters_(num) {
  if (num < 27) {
    return getLetter_(num);
  }
  const result = Math.floor(num / 26);
  if (num % 26 === 0) {
    return toLetters_(result - 1) + getLetter_(num);
  }
  return toLetters_(result) + getLetter_(num);
}

/**
 * Converts the coordinates of the range, represented as numbers in a1Notation,
 * like A1, or A5:K10
 * 
 * @param {Integer} row Row number
 * @param {Integer} col Column number
 * @param {Integer} lastRow Last row number
 * @param {Integer} lastCol Last column number
 * @returns {String} Coordinates of the range in a1Notation
 */
function getA1Notation(row, col, lastRow, lastCol) {
  function join(a, b) {
    return [a, b].join(':')
  }
  const A1 = col && row && toLetters_(col).concat(row);
  switch (arguments.length) {
    case 0:
      throw new Error('Function expects at least one argument');
    case 1:
      return join(row, row);
    case 2:
      if (col && !row) {
        const A = toLetters_(col);
        return join(A, A);
      }
      return A1;
    case 3:
      const A5 = toLetters_(col).concat(lastRow);
      return join(A1, A5);
    case 4:
      const Z5 = toLetters_(lastCol).concat(lastRow);
      return join(A1, Z5);
    default:
      break;
  }
}


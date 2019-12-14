export function getLetter(num) {
  // Согласно таблице ASCII - код 65 = A
  const offset = 65;
  const remainder = num % 26;
  if (remainder === 0) {
    return 'Z';      
  }
  // Функция chr преобразует число в символ
  return String.fromCharCode(offset + remainder - 1);
}

export function convert(num) {
  if (num < 27) {
    return getLetter(num);
  }
  const result = Math.floor(num / 26);
  if (num % 26 === 0) { 
    return convert(result - 1) + getLetter(num);
  }
  return convert(result) + getLetter(num);
}
    

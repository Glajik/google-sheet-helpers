export function isEmpty(value) {
  if (value instanceof Array) return !value.length;
  if (typeof value === 'string') return !value.length;
  if (value instanceof Object) return !Object.keys(value).length;
  return !value;
}

export function hasIn(list, value) {
  function isEq(item) {
    return item === value;
  }
  return list.some(isEq);
}

export function pick(obj, keys) {
  function getValue(key) {
    return obj[key];
  }
  const values = keys.map(getValue);
  return createMap_(keys, values);
}

export function extract(str, regex) {
  const result = regex.exec(str);
  if (result && result.length > 1) {
    return result[1];
  }
  return str;
}

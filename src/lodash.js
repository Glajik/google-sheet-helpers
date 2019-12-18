export function isEmpty(value) {
  if (value instanceof Array) return !value.length;
  if (typeof value === 'string') return !value.length;
  if (value instanceof Object) return !Object.keys(value).length;
  return !value;
}

export function hasIn(list, value) {
  if (!list) return false;
  function isEq(item) {
    return item === value;
  }
  return list.some(isEq);
}

export function createMap(keys, values) {
  function fn(acc, key, index) {
    acc[key] = values[index];
    return acc;
  }
  return keys.reduce(fn, {});
}

export function pick(obj, keys) {
  if (isEmpty(obj) || isEmpty(keys)) return {};
  function getValue(key) {
    return obj[key];
  }
  if (typeof keys === 'string') {
    return Object.defineProperty({}, keys, { value: obj[keys], enumerable: true });
  }
  const values = keys.map(getValue);
  return createMap(keys, values);
}

/**
 * Checks if `value` is `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 */
export function isObject(value) {
  return value != null && (typeof value === 'object' || typeof value === 'function');
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
export function isPlainObject(value) {
  if (!isObject(value)) return false;
  if (isFunction(value) || isArray(value)) return false;
  if (Object.getPrototypeOf(value) instanceof(Object)) return false;
  return true;
}

export function extract(str, regex) {
  const result = regex.exec(str);
  if (result && result.length > 1) {
    return result[1];
  }
  return str;
}

function isEmpty(value) {
  if (value instanceof Array) return !value.length;
  if (typeof value === 'string') return !value.length;
  if (value instanceof Object) return !Object.keys(value).length;
  return !value;
}

function hasIn(list, value) {
  if (!list) return false;
  function isEq(item) {
    return item === value;
  }
  return list.some(isEq);
}

function createMap(keys, values) {
  function fn(acc, key, index) {
    acc[key] = values[index];
    return acc;
  }
  return keys.reduce(fn, {});
}

function pick(obj, keys) {
  if (isEmpty(obj) || isEmpty(keys)) return {};
  function getValue(key) {
    return obj[key];
  }
  if (typeof keys === 'string') {
    return { [keys]: obj[keys] };
  }
  const values = keys.map(getValue);
  return createMap(keys, values);
}

function extract(str, regex) {
  const result = regex.exec(str);
  if (result && result.length > 1) {
    return result[1];
  }
  return str;
}

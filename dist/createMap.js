function createMap(keys, values) {
  function fn(acc, key, index) {
    acc[key] = values[index];
    return acc;
  }
  return keys.reduce(fn, {});
}


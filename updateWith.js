function updateWith(keys, values) {
  return function(data) {
    function fn(value, index) {
      const key = keys[index];
      if (!data[key]) return value;
      return data[key];
    }
    return values.map(fn);
  };
}

export default updateWith;

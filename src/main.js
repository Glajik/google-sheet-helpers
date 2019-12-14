import { getLetter, convert } from './a1Notation';

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

export function createMap(keys, values) {
  function fn(acc, key, index) {
    acc[key] = values[index];
    return acc;
  }
  return keys.reduce(fn, {});
}

export function pick(obj, keys) {
  function getValue(key) {
    return obj[key];
  }
  const values = keys.map(getValue);
  return createMap(keys, values);
}

export function extract(str, regex) {
  const result = regex.exec(str);
  if (result && result.length > 1) {
    return result[1];
  }
  return str;
}

export function getA1Notation(row, col, rows, cols) {
  if (!arguments) throw new Error('Аunction expects at least one argument'); // eslint-disable-line prefer-rest-params
  // A1:Z5
  if (row && col && rows && cols) {
    return [
      getColLetters(col).concat(row),
      getColLetters(col + cols - 1).concat(row + rows - 1)
    ].join(':');
  }
  // A1:A5
  if (row && col && rows) {
    return [
      getColLetters(col).concat(row),
      getColLetters(col).concat(row + rows - 1)
    ].join(':');
  }
  // A1
  if (row && col) {
    return getColLetters(col).concat(row);
  }
  // 1:1 for row, or A:A for column
  return [row, row].join(':');
}

export function updateWith(keys, values) {
  return function(data) {
    function fn(value, index) {
      const key = keys[index];
      if (!data[key]) return value;
      return data[key];
    }
    return values.map(fn);
  };
}

/**
 * Use keys and methods, which returns by function to get, set or update range
 * @param {Array} keys Array of keys
 * @param {Range} range Range class of SpreadsheetApp
 * @param {Array} values Array of values
 */
export function rowWrapper(keys, range, values) {
  values = values || range.getValues()[0];

  return {
    /**
     * Use get('key') to get value from specified cell.
     * Use get() to retrieve all row data as key-value map.
     * @returns value by key, or object
     * @param {String} key
     */
    get: function(key) {
      const data = createMap(keys, values);
      if (key) return data[key];
      return data;
    },

    /**
     * Use set to update specified cell by key
     * @returns rowWrapper for chaining
     * @param {String} key
     * @param {*} value
     */
    set: function(key, value) {
      const index = keys.indexOf(key);
      const col = index + 1;
      if (!col) {
        throw new Error('Can\'t set - no key "%s" in keys: %s', key, keys);
      }
      range.getCell(1, col).setValue(value);
      const newValues = [].concat(values);
      newValues[index] = value;
      values = newValues;
      return rowWrapper(keys, range, newValues);
    },

    /**
     * Use it to update some or all values in row range
     * Usage: update({ 'a': 1, 'text': 'hello' })
     * @returns rowWrapper for chaining
     * @param {*} data Key-value map
     */
    update: function(data) {
      const update = updateWith(keys, values);
      const newValues = update(data);
      range.setValues([newValues]);
      values = newValues;
      return rowWrapper(keys, range, newValues);
    },
  };
}

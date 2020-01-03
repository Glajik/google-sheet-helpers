
/**
 * Usage:
 * ```
 * const range = SpreadsheetApp.getActiveSheet().getRange('1:1');
 * const keys = ['id', 'name', 'age'];
 * const wrapped = getWrapped(keys, range);
 * wrapped.get(); // { id: '1', name: 'Joe', age: 30 }
 * wrapped.get('name'); // 'Joe'
 * wrapped.set('name', 'Rob').set('age', 24);
 * wrapped.update({ name: 'Rick', age: 47 });
 * ```
 * 
 * @param {Array} keys Array of keys
 * @param {Range} range Range class of SpreadsheetApp
 * @param {Array} [values] Array of values
 * @returns {Object} Functions get('key'), set('key', value), update({ key: value, ... })
 */
function getWrapped(keys, range, values) {
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
     * @returns wrap for chaining
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
      return getWrapped(keys, range, newValues);
    },

    /**
     * Use it to update some or all values in row range
     * Usage: update({ 'a': 1, 'text': 'hello' })
     * @returns getWrapped for chaining
     * @param {*} data Key-value map
     */
    update: function(data) {
      const update = updateWith(keys, values);
      const newValues = update(data);
      range.setValues([newValues]);
      values = newValues;
      return getWrapped(keys, range, newValues);
    }
  };
}


import R from 'ramda';

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
function getWrapped(keys) {
  return function withRange(range, values) {
    var state = values || R.head(range.getValues());

    return {
      /**
       * Use get('key') to get value from specified cell.
       * Use get() to retrieve all row data as key-value map.
       * @returns value by key, or object
       * @param {String} key
       */
      get: function(key) {
        const data = R.zipObj(keys, state);
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
          throw new Error(['Can\'t set - no key "', key,'" in keys: ', keys].join(''));
        }
        range.getCell(1, col).setValue(value);
        state = [].concat(values);
        state[index] = value;
        return withRange(range, state);
      },

      /**
       * Use it to update some or all values in row range
       * Usage: update({ 'a': 1, 'text': 'hello' })
       * @returns getWrapped for chaining
       * @param {Object} item object
       */
      update: function(item) {
        const data = R.zipObj(keys, state);
        const updated = R.merge(data, item);
        state = R.values(updated);
        range.setValues([state]);
        return withRange(range, state);
      }
    };
  };
}

export default getWrapped;

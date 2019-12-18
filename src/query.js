import { isPlainObject, isFunction, pick, isArray } from './lodash';

/**
 * Takes `key` and returns function, that expect plain object,
 * from which will be taken value by that `key`
 * 
 * @returns Function
 * @param {String} key 
 */
function byKey_(key) {
  return function (item) { return item[key] }
};

/**
 * Where `item[key] === value`
 * @param {String} key 
 * @param {*} value 
 * @returns Predicate for filter function
 */
export function byKeyValue_(key, value) {
  return function(item) {
    if (!key || typeof item !== 'object') {
      return false;
    }
    return item[key] === value;
  }
};

/**
 * Define your search terms using the dictionary
 * @param {Object} obj 
 * @returns Array of predicates that can be used in filter functions.
 */
export function byObj_(obj) {
  if (!isPlainObject(obj)) return [];
  return Object.entries(obj).map(
    function(entry) {
      const key = entry[0];
      const value = entry[1];
      return byKeyValue_(key, value);
    }
  )
};

function filter_(predicate) {
  return function(coll) {
    return coll.filter(predicate);
  }
}

function sort_(fn, direction) {
  return function(coll) {
    return coll.sort(
      function(a, b) {
        if (direction === 'desc') {
          return fn(a) < fn(b) ? 1 : -1;
        }
        return fn(a) > fn(b) ? 1 : -1;
      }
    )
  }
}

export default function query(state) {
  const ops = state && state.ops || [];
  const coll = state && state.coll || [];

  function isKey(value) { return typeof value === 'string' }
  function isEmpty(value) { return typeof value === undefined }

  /**
   * Add one or several operations
   * @returns New state object
   * @param {*} operations Array or single value
   */
  function addOps(operations) {
    if (isArray(operations)) {
      return { coll: coll, ops: ops.concat(operations) }
    }
    return { coll: coll, ops: ops.concat([operations]) };
  }
  
  function toArray() {
    return ops.reduce(
      function(result, operation) { return operation(result) },   coll.slice()
    );
  }
  
  return {
    /**
     * Apply all operations and return result
     * @param {*} arg Key, array of keys, function
     */
    select: function(arg) {
      const result = toArray();
      if (isFunction(arg)) {
        return result.map(arg);
      }
      if (isArray(arg)) return result.map(
        function(item) { return pick(item, arg) }
      );
      if (isKey(arg)) {
        return result.map(byKey_(arg));
      };
      return result;
    },

    /**
     * Add collection for query
     * @param {Array} collection 
     */
    from: function(collection) {
      return query({ coll: coll.concat(collection), ops: ops });
    },

    /**
     * Query
     * @param {*} arg Plain object, function or key
     * @param {String} value Optional, if first argument used as `key`
     */
    where: function(arg, value) {
      if (isPlainObject(arg)) {
        return query(
          addOps(
            byObj_(arg).map(
              function(predicate) { return filter_(predicate) }
            )
          )
        );
      }
      if (isFunction(arg)) {
        return query(
          addOps(filter_(arg))
        );
      }
      if (isKey(arg) && !isEmpty(value)) {
        return query(
          addOps(filter_(byKeyValue_(arg, value)))
        );
      }
      return query({ coll: coll, ops: ops });
    },

    /**
     * Order by
     * @param {*} arg Function, or String as `key`
     * @param {String} direction String value: `asc | desc`
     */
    orderBy: function(arg, direction) {
      direction = direction || 'asc';
      if (isFunction(arg)) {
        return query(addOps(sort_(arg, direction)));
      }
      if (isKey(arg)) { 
        return query(addOps(sort_(byKey_(arg), direction)));
      }
    }
  };
}

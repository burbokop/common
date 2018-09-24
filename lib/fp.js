'use strict';

const { safeCallback } = require('./callbacks');

// Partially apply arguments to function
//   fn - function
//   ...args - array, arguments to be applied
// Returns: function(...rest)
//   ...rest - arguments
const partial = (fn, ...args) => (...rest) => fn(...args.concat(rest));

// Map object fields with provided function
//   mapFn - function, to apply to every field value
//   obj - object, which fields used for mapping
// Returns: object, with same reference but with transformed fields
const omap = (mapFn, obj) => {
  for (const key in obj) {
    obj[key] = mapFn(obj[key]);
  }
  return obj;
};

// Compose multiple functions into one
//   ...fns - array, functions to be composed
// Returns: function(...args), composed
//   ...args - array, arguments to be passed to the first function
const compose = (...fns) => (...args) => {
  if (fns.length === 0) return args[0];

  let res = fns[0](...args);
  for (let i = 1; i < fns.length; i++) {
    res = fns[i](res);
  }
  return res;
};

// Apply given function to value or default value
//   fn - function
//   defVal - default value
//   value - value (optional)
// Returns: result of `fn` or `defVal`
const maybe = (fn, defVal, value) => (
  value !== undefined && value !== null ? fn(value) : defVal
);

// Zip several arrays into one
//   ...arrays - array, arrays to be zipped
// Returns: array, length is minimal of input arrays length,
// element with index i of resulting array is array with
// elements with index i from input arrays
const zip = (...arrays) => {
  if (arrays.length === 0) return arrays;

  let minLen = arrays[0].length;
  for (let i = 1; i < arrays.length; i++) {
    minLen = Math.min(arrays[i].length, minLen);
  }

  const res = new Array(minLen);
  for (let i = 0; i < res.length; i++) {
    res[i] = new Array(arrays.length);
    for (let j = 0; j < res[i].length; j++) {
      res[i][j] = arrays[j][i];
    }
  }
  return res;
};

// Create array of replicated values
//   count - number, new array length
//   elem - value to replicate
// Returns: array, replicated
const replicate = (count, elem) => (Array.from({ length: count }, () => elem));

// Zip arrays using specific function
//   fn - function, for zipping elements with index i
//   ...arrays - array, arrays to be zipped
// Returns: array, zipped, element with index i of resulting array is result
// of fn called with arguments from arrays
const zipWith = (fn, ...arrays) => zip(...arrays).map(args => fn(...args));

// Curry function until the condition is met
//   condition - function(argsI, argsParts) returns boolean
//     argsI - arguments for i-th currying
//     argsParts - array of args given for currying from first to i-th currying
//   fn - function, which will be curried
//   ...args - array, arguments for fn
// Returns: function(...args), curried
//   ...args - array, arguments
const curryUntil = (condition, fn, ...args) => {
  const argsParts = [];

  const curryMore = (...argsI) => {
    argsParts.push(argsI);
    if (condition(argsI, argsParts)) {
      const allArgs = [].concat(...argsParts);
      return fn(...allArgs);
    }
    return curryMore;
  };

  return curryMore(...args);
};

// Curry function with given arguments
//   fn - function, to be curried
//   ...args - array, arguments
// Returns: function, curried
const curry = (fn, ...args) => {
  let argsTotalCount = 0;
  const condition = (argsI) => (
    argsTotalCount += argsI.length,
    argsTotalCount >= fn.length
  );
  return curryUntil(condition, fn, ...args);
};

// Curry fn count times, first curry uses args for first currying
//   fn - function, curried
//   count - number, of times function should be curried
//   ...args - array, arguments for first currying
// Returns: function, curried given times count
const curryN = (fn, count, ...args) => {
  let i = -1;
  const condition = () => (i++, i === count);
  return curryUntil(condition, fn, ...args);
};

// Curry function curry with fn
//   fn - function, to be curried
// Returns: function, to pass arguments that returns curried fn
const curryTwice = fn => curry(curry, fn);

// Apply arguments
//   ...args - array, arguments to save in closure
// Returns: function, to be applied saved arguments
//   ...args - array, arguments saved in closure
const applyArgs = (...args) => fn => fn(...args);

// Get first not errored result of fn
//   fn - function, to be called
// Returns: result of `fn(...args)`
//   ...args - array, arguments to iterate
// Throws: Error, if `fn` throws it
const either = fn => (...args) => {
  let lastError;
  for (const arg of args) {
    try {
      return fn(arg);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

// Rest left, transform function
//   fn - function(args, arg1..argN, callback)
// Returns: function(arg1..argN, ...args, callback)
//   ...spreadArgs - array, arguments to be added
const restLeft = fn => (...spreadArgs) => {
  const callback = safeCallback(spreadArgs);
  const namedArgsCount = fn.length - 2;
  const namedArgs = spreadArgs.slice(0, namedArgsCount);
  const args = spreadArgs.slice(namedArgsCount);
  fn(args, ...namedArgs, callback);
};

module.exports = {
  partial,
  omap,
  compose,
  maybe,
  zip,
  replicate,
  zipWith,
  curryUntil,
  curryN,
  curryTwice,
  curry,
  applyArgs,
  either,
  restLeft,
};

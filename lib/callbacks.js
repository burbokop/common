'use strict';

const { last } = require('./array');
const { alias } = require('./utilities');

// Empty function
// Returns: boolean, always false
const falseness = () => false;

// Empty function
// Returns: boolean, always true
const trueness = () => true;

// Empty function
// Returns: always undefined
const emptiness = () => {};

// Empty asynchronous callback-last single-argument function
//   callback - function, callback to be called with (null)
const nop = callback => callback(null);

// Empty asynchronous callback-last double-argument function
//   empty - incoming value to be ignored
//   callback - function, callback to be called with (null, null)
const noop = (empty, callback) => {
  callback(null, null);
};

// Wrap function: call once, not null
//   fn - function, (optional)
// Returns: function, wrapped callback
const once = fn => {
  if (!fn) return emptiness;
  let finished = false;
  const wrap = (...args) => {
    if (finished) return;
    finished = true;
    fn(...args);
  };
  return wrap;
};

// Extract callback function
// It's unsafe: may return null, allows multiple calls
//   args - array, arguments
// Returns: function, callback or null
// Deprecated: previous names: `common.cbUnsafe`, `common.extractCallback`
const unsafeCallback = args => {
  const callback = last(args);
  if (typeof callback === 'function') return args.pop();
  return null;
};

// Extract callback
//   args - array, arguments
// Returns: function, callback or common.emptiness if there is no one
// Deprecated: previous name: `common.cbExtract`
const safeCallback = args => {
  const callback = last(args);
  if (typeof callback === 'function') return args.pop();
  return emptiness;
};

// Extract callback
//   args - array, arguments
// Returns: function, extracted callback
// Throws: TypeError, if there is no callback
const requiredCallback = args => {
  const callback = last(args);
  if (typeof callback === 'function') return args.pop();
  throw new TypeError('No callback provided');
};

// Extract callback and make it safe
// Wrap callback with once()
//   args - array, arguments
// Returns: function, callback or common.emptiness if there is no callback
const onceCallback = args => {
  const callback = last(args);
  if (typeof callback === 'function') return once(args.pop());
  return emptiness;
};

module.exports = {
  falseness,
  trueness,
  emptiness,
  nop,
  noop,

  once,
  cb: alias(once),

  unsafeCallback,
  extractCallback: alias(unsafeCallback),
  cbUnsafe: alias(unsafeCallback),

  safeCallback,
  cbExtract: alias(safeCallback),

  requiredCallback,
  onceCallback,
};

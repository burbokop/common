'use strict';

// List method names
//   iface - object, to be introspected
// Returns: array of strings, method names
const methods = (iface) => {
  const names = [];
  for (const name in iface) {
    if (typeof iface[name] === 'function') {
      names.push(name);
    }
  }
  return names;
};

// List property names
//   iface - object, to be introspected
// Returns: array of strings, property names
const properties = iface => {
  const names = [];
  for (const name in iface) {
    if (typeof iface[name] !== 'function') {
      names.push(name);
    }
  }
  return names;
};

module.exports = {
  methods,
  properties,
};

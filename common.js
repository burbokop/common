'use strict';

const submodules = [
  'array', // Arrays manipulations
  'cache', // Cache (enhanced Map)
  'callbacks', // Callback utilities
  'data', // Data structures manipulations
  'enum', // Enumerated type
  'events', // Events and emitter
  'fp', // Functional programming
  'id', // Keys and identifiers
  'iterator', // Iterator
  'math', // Math common function
  'mp', // Metaprogramming
  'network', // Network utilities
  'oop', // Object-oriented programming
  'sort', // Sort compare functions
  'strings', // Strings utilities
  'time', // Date and Time functions
  'uint64', // Uint64
  'units', // Units conversion
  'utilities', // Common utilities
].map(path => require('./lib/' + path));

module.exports = Object.assign({}, ...submodules);

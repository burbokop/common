'use strict';

const api = {};
api.common = {};
module.exports = api.common;

api.common.falseness = () => false;
api.common.trueness = () => true;
api.common.emptiness = () => {};

api.common.override = (
  obj, // object containing function to override
  fn // function, name will be used to find function inside object
  // Hint: previous function will be accessible by obj.fnName.inherited
) => {
  fn.inherited = obj[fn.name];
  obj[fn.name] = fn;
};

api.common.range = (
  from, // sequence start
  to // sequence end
  // Example: range(1, 5) = [1, 2, 3, 4, 5]
) => {
  if (to < from) return [];
  const len = to - from + 1;
  const range = new Array(len);
  let i;
  for (i = from; i <= to; i++) {
    range[i - from] = i;
  }
  return range;
};

api.common.sequence = (
  seq, // array
  max // optional max
  // Examples:
  // list: sequence([81, 82, 83]) = [81, 82, 83]
  // range from..to: sequence([81,,83]) = [81, 82, 83]
  // range from..count: sequence([81, [3]]) = [81, 82, 83]
  // range from..max-to: sequence([81, [-2]], 5) = [81, 82, 83]
) => {
  const from = seq[0];
  let to = seq[1];
  let res = seq;
  if (Array.isArray(to)) {
    const count = to[0] < 0 ? max + to[0] : to[0];
    res = api.common.range(from, from + count - 1);
  } else if (!to) {
    to = seq[2];
    res = api.common.range(from, to);
  }
  return res;
};

api.common.random = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

api.common.shuffle = (arr) => (
  arr.sort(() => Math.random() - 0.5)
);

api.common.eventEmitter = () => {
  const ee = new api.events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    const ar = args.slice(0);
    ar.unshift('*');
    emit.apply(ee, ar);
    emit.apply(ee, args);
  };
  return ee;
};
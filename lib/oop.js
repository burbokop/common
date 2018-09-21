'use strict';

const inherits = (child, base) => {
  child.super_ = base;
  Object.setPrototypeOf(child.prototype, base.prototype);
};

// Override method: save old to `fn.inherited`
//   obj - object, containing method to override
//   fn - function, name will be used to find method
// Hint: Previous function will be accessible by obj.fnName.inherited
const override = (obj, fn) => {
  fn.inherited = obj[fn.name];
  obj[fn.name] = fn;
};

// Mixin for ES6 classes without overriding existing methods
//   target - object, mixin to target
//   source - object, source methods
const mixin = (target, source) => {
  const methods = Object.getOwnPropertyNames(source);
  const mix = {};
  for (const method of methods) {
    if (!target[method]) {
      mix[method] = source[method];
    }
  }
  Object.assign(target, mix);
};

module.exports = {
  inherits,
  override,
  mixin,
};

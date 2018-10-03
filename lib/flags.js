'use strict';

class Flags {
  static from(...args) {
    const values = args.map(v => [v, 0]);
    class FlagsClass {
      static from(...args) {
        return new FlagsClass(...args);
      }

      constructor(...args) {
        this.values = new Map(values);
        args.forEach(arg => this.set(arg));
      }

      has(key) {
        return this.values.has(key);
      }

      get(key) {
        return this.values.get(key);
      }

      set(key) {
        if (this.values.has(key)) this.values.set(key, 1);
      }

      unset(key) {
        if (this.values.has(key)) this.values.set(key, 0);
      }

      toggle(key) {
        if (this.values.has(key))
          this.values.set(key, this.values.get(key) ? 0 : 1);
      }

      toString() {
        const arr = Array.from(this.values.values());
        return arr.reduce((acc, val) => val + acc, '');
      }

      toNumber() {
        const arr = Array.from(this.values.values());
        return arr.reduce((acc, val, idx) =>
          acc | (val << idx), 0);
      }

      [Symbol.toPrimitive]() {
        return this.toNumber();
      }
    }
    return FlagsClass;
  }
}

module.exports = { Flags };

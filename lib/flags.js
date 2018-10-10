'use strict';

class Flags {
  static from(...args) {
    const values = new Map(args.map((v, i) => [v, i]));
    class FlagsClass {
      static from(...args) {
        return new FlagsClass(...args);
      }

      constructor(...args) {
        this.value = 0;
        args.forEach(arg => this.set(arg));
      }

      has(key) {
        return values.has(key);
      }

      get(key) {
        return this.value >> values.get(key) & 0x1;
      }

      set(key) {
        if (values.has(key)) this.value |= 0x1 << values.get(key);
      }

      unset(key) {
        if (values.has(key)) this.value &= ~(0x1 << values.get(key));
      }

      toggle(key) {
        if (values.has(key)) this.get(key) ? this.unset(key) : this.set(key);
      }

      toString() {
        const str = this.value.toString(2);
        return '0'.repeat(args.length - str.length) + str;
      }

      toNumber() {
        return this.value;
      }

      [Symbol.toPrimitive]() {
        return this.value;
      }
    }
    return FlagsClass;
  }
}

module.exports = { Flags };

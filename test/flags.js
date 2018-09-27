'use strict';

const metatests = require('metatests');
const { Flags } = require('..');

metatests.test('FlagsClass.from', (test) => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  test.strictSame(typeof Numeri, 'function');

  const num = Numeri.from('Due', 'Tre');

  test.strictSame(typeof num, 'object');
  test.strictSame(num.get('Uno'), 0);
  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);
  test.strictSame(num.get('Quatro'), 0);

  test.end();
});

metatests.test('new FlagsClass', (test) => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  test.strictSame(typeof Numeri, 'function');

  const num = new Numeri('Due', 'Tre');

  test.strictSame(typeof num, 'object');
  test.strictSame(num.get('Uno'), 0);
  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);
  test.strictSame(num.get('Quatro'), 0);

  test.end();
});

metatests.test('FlagsClass.get', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const num = Numeri.from('Due', 'Tre');

  test.strictSame(num.get('Uno'), 0);
  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);
  test.strictSame(num.get('Quatro'), 0);

  test.end();
});

metatests.test('FlagsClass.has', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const num = Numeri.from();

  test.strictSame(num.has('Uno'), true);
  test.strictSame(num.has('Due'), true);
  test.strictSame(num.has('Tre'), true);
  test.strictSame(num.has('Quatro'), true);

  test.strictSame(num.has('Cinque'), false);
  test.strictSame(num.has('Sei'), false);

  test.end();
});

metatests.test('FlagsClass.set', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const num = Numeri.from();

  num.set('Due');
  num.set('Tre');

  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);

  num.set('Due');
  num.set('Tre');

  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);

  test.end();
});

metatests.test('FlagsClass.unset', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const num = Numeri.from('Due', 'Tre');

  num.unset('Due');
  num.unset('Tre');

  test.strictSame(num.get('Due'), 0);
  test.strictSame(num.get('Tre'), 0);

  num.unset('Due');
  num.unset('Tre');

  test.strictSame(num.get('Due'), 0);
  test.strictSame(num.get('Tre'), 0);

  test.end();
});

metatests.test('FlagsClass.switch', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const num = Numeri.from();

  num.switch('Due');
  num.switch('Tre');

  test.strictSame(num.get('Due'), 1);
  test.strictSame(num.get('Tre'), 1);

  num.switch('Due');
  num.switch('Tre');

  test.strictSame(num.get('Due'), 0);
  test.strictSame(num.get('Tre'), 0);

  test.end();
});

metatests.test('FlagsClass.toString', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const nums = [
    [[], '0000'],
    [['Uno'], '0001'],
    [['Due'], '0010'],
    [['Tre'], '0100'],
    [['Quatro'], '1000'],
    [['Uno', 'Due'], '0011'],
    [['Due', 'Tre'], '0110'],
    [['Uno', 'Quatro'], '1001'],
    [['Tre', 'Quatro'], '1100'],
    [['Uno', 'Due', 'Tre', 'Quatro'], '1111'],
  ];
  nums.forEach(num =>
    test.strictSame(Numeri.from(...num[0]).toString(), num[1]));

  test.end();
});

metatests.test('FlagsClass.toNumber', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const nums = [
    [[], 0],
    [['Uno'], 1],
    [['Due'], 2],
    [['Tre'], 4],
    [['Quatro'], 8],
    [['Uno', 'Due'], 3],
    [['Due', 'Tre'], 6],
    [['Uno', 'Quatro'], 9],
    [['Tre', 'Quatro'], 12],
    [['Uno', 'Due', 'Tre', 'Quatro'], 15],
  ];
  nums.forEach(num =>
    test.strictSame(Numeri.from(...num[0]).toNumber(), num[1]));

  test.end();
});

metatests.test('FlagsClass.toPrimitive', test => {
  const Numeri = Flags.from('Uno', 'Due', 'Tre', 'Quatro');
  const nums = [
    [[], 0],
    [['Uno'], 1],
    [['Due'], 2],
    [['Tre'], 4],
    [['Quatro'], 8],
    [['Uno', 'Due'], 3],
    [['Due', 'Tre'], 6],
    [['Uno', 'Quatro'], 9],
    [['Tre', 'Quatro'], 12],
    [['Uno', 'Due', 'Tre', 'Quatro'], 15],
  ];
  nums.forEach(num =>
    test.strictSame(+Numeri.from(...num[0]), num[1]));

  test.end();
});

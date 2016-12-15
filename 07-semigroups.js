const { flow, concat, uniq } = require('lodash/fp');
const { Map } = require('immutable-ext');

// whenever we think of combining we can think of semigroups

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: _ => `All(${x})`,
});

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: _ => `First(${x})`,
});

const Uniq = x => ({
  x,
  concat: ({x: y}) => flow(concat(), uniq, Uniq)(x, y), // ( ☼o☼)♡
  inspect: _ => `Uniq(${x})`,
});

// const Uniq = x => ({
//   x,
//   concat: ({x: y}) => Uniq([...new Set(x.concat(y))]),
//   inspect: _ => `Uniq(${x})`,
// });

const unique = Uniq([1, 2, 3])
  .concat(Uniq([1, 5, 6]))
  .concat(Uniq([2, 3, 9]))

console.log(unique);

const accountV1 = Map({
  name: First('Sean'),
  isPaid: All(true),
  points: Sum(10),
  friends: Uniq(['Alli', 'Sebastian',]),
});

const accountV2 = Map({
  name: First('Seann'),
  isPaid: All(false),
  points: Sum(9),
  friends: Uniq(['Castle', 'Alli']),
});

const accountV3 = Map({
  name: First('sean'),
  isPaid: All(true),
  points: Sum(3),
  friends: Uniq(['Todd', 'Sebastian']),
});

const account = accountV1
  .concat(accountV2)
  .concat(accountV3)

console.log(account.toJS());

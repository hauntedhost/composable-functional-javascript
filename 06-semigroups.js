// associativity
const s1 = 'a'
  .concat('b')
  .concat('c');

console.log(s1); // 'abc'

const s2 = 'a'
  .concat('b'
    .concat('c'));

console.log(s2); // 'abc'

const a1 = [1, 2]
  .concat([3, 4])
  .concat([5, 6]);

console.log(a1); // [1, 2, 3, 4, 5, 6]

const a2 = [1, 2]
  .concat([3, 4]
    .concat([5, 6]));

console.log(a2); // [1, 2, 3, 4, 5, 6]

// let's make our own semigroups
const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

const sum = Sum(1)
  .concat(Sum(2))
  .concat(Sum(3));

console.log(sum); // Sum(6)

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: _ => `All(${x})`,
});

const all = All(true)
  .concat(All(false))
  .concat(All(true));

console.log(all); // All(false)

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: _ => `First(${x})`,
});

const first = First('foo')
  .concat(First('bar'))
  .concat(First('baz'));

console.log(first); // First(foo)

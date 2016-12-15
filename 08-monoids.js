const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

Sum.empty = _ => Sum(0);

const sum = Sum.empty()
  .concat(Sum(3))
  .concat(Sum(5));

console.log(sum);

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: _ => `All(${x})`,
});

All.empty = _ => All(true);

const all = All.empty()
  .concat(All(false))
  .concat(All(true));

console.log(all);

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: _ => `First(${x})`,
});

// hmmm, no way to define a neutral element that is first and has no effect
// seems like this must remain a semigroup instead of a monoid
// First.empty = _ => First(???)

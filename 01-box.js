// identity functor ^__^
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`, // neat
});

const charFromNumericString = str =>
  Box(str)
  .map(s => s.trim())
  .map(s => parseInt(s))
  .map(n => n + 1)
  .map(i => String.fromCharCode(i))
  // .fold(i => String.fromCharCode(i))

console.log(charFromNumericString(' 64.0 '));

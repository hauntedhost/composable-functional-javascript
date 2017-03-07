const { Map, List } = require('immutable-ext');

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

Sum.empty = _ => Sum(0);

const listFold = List.of(Sum(1), Sum(2), Sum(3))
                  .fold(Sum.empty())

console.log(listFold);

const mapFold = Map({a: Sum(1), b: Sum(7)})
                  .fold(Sum.empty())

console.log(mapFold);

const mapFold2 = Map({a: 1, b: 7})
                  .map(Sum)
                  .fold(Sum.empty())

console.log(mapFold2);

const foldMap = Map({a: 1, b: 7})
                  .foldMap(Sum, Sum.empty())

console.log(foldMap);

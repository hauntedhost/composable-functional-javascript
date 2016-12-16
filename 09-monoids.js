const { foldMap, List } = require('immutable-ext');
const { flow } = require('lodash/fp');

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

Sum.empty = _ => Sum(0);

const Product = x => ({
  x,
  concat: ({x: y}) => Product(x * y),
  inspect: _ => `Product(${x})`,
});

Product.empty = _ => Product(1);

const Any = x => ({
  x,
  concat: ({x: y}) => Any(x || y),
  inspect: _ => `Any(${x})`,
});

Any.empty = _ => Any(false);

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: _ => `All(${x})`,
});

All.empty = _ => All(true);

const Max = x => ({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  inspect: _ => `Max(${x})`,
});

Max.empty = _ => Max(-Infinity);

const Min = x => ({
  x,
  concat: ({x: y}) => Min(x < y ? x : y),
  inspect: _ => `Min(${x})`,
});

Min.empty = _ => Min(Infinity);

const Right = x => ({
  map: f => Right(f(x)),
  fold: (_f, g) => g(x),
  concat: o => o.fold(
    _e => Right(x),
    y  => Right(x.concat(y))
  ),
  inspect: () => `Right(${x})`,
  isRight: true,
  isLeft: false,
});

const Left = x => ({
  map: _f => Left(x),
  fold: (f, _g) => f(x),
  concat: o => o.fold(
    _e => Left(x),
    y  => o
  ),
  inspect: () => `Left(${x})`,
  isRight: false,
  isLeft: true,
});

const fromNullable = x => x != null ? Right(x) : Left(null);

const stats = List.of(
  {page: 'Home', views: 40},
  {page: 'About', views: null},
  {page: 'Blog', views: 5}
);

const viewCount = stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)))
  .fold(_ => 'Error!', v => v);

console.log(viewCount);

const First = either => ({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either),
});

First.empty = _ => First(Left());

const find = (xs, f) =>
  List(xs)
  .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty())
  .fold(x => x)

const match = find([3, 4, 4, 6, 7], x => x > 4);

console.log(match);

// └[?﹏?]┘
const Fn = f => ({
  fold: f,
  concat: o => Fn(x => f(x).concat(o.fold(x)))
});

const hasVowels = x => !!x.match(/[aeiou]/ig);
const isLongWord = x => x.length >= 5;

const checkBoth = Fn(flow(hasVowels, All)).concat(Fn(flow(isLongWord, All)));

const matches = ['gym', 'rhythms', 'gymnasium', 'bird', 'lilac'].filter(x =>
  checkBoth.fold(x).x
);

console.log(matches);

const Pair = (x, y) => ({
  x,
  y,
  concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1)),
});

const { Right, Left } = require('data.either');
const { foldMap, List } = require('immutable-ext');

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

// const Right = x => ({
//   map: f => Right(f(x)),
//   fold: (_f, g) => g(x),
//   concat: o => o.fold(
//     e => Left(e),
//     r => Right(x.concat(r))
//   ),
//   inspect: () => `Right(${x})`,
// });
//
// const Left = x => ({
//   map: _f => Left(x),
//   fold: (f, _g) => f(x),
//   concat: _o => Left(x),
//   inspect: () => `Left(${x})`,
// });

const fromNullable = x => x != null ? Right(x) : Left(null);

// const fromNullable = (x, nullValue) => ({
//   map: f => x != null ? Right(f(x)) : Right(nullValue),
// });

const stats = List.of(
  {page: 'Home', views: 40},
  {page: 'About', views: 10},
  {page: 'Blog', views: 3}
);

// const viewCount = stats
//   .foldMap(x =>
//     fromNullable(x.views, 0).map(Sum),
//     Right(Sum(0)))
//   .fold(_e => 'err', v => v);

// ¯\_(ツ)_/¯
// const viewCount = stats
//   .foldMap(x =>
//     fromNullable(x.views)
//     .fold(_e => Right(0), v => Right(v))
//     .map(Sum),
//     Right(Sum(0)))
//     .fold(_e => 'err', s => s);

const viewCount = stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)));

// TypeError: acc.concat is not a function

console.log(viewCount);

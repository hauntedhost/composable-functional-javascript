const COLORS = {
  red: '#ff4444',
  blue: '#3b5998',
  yellow: '#fff68f',
}

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  map: _f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x => x != null ? Right(x) : Left(null);

const findColor = name => fromNullable(COLORS[name]);

const color = findColor('green')
  .map(c => c.slice(1))
  .map(c => c.toUpperCase())
  .fold(_ => 'No color!',
        c => c);

console.log(color);

// const rightResult =
//   Right(3)
//   .map(n => n + 6)
//   .map(n => n / 4);
//
// console.log(rightResult);
//
// const leftResult = Left(3)
//   .map(n => n + 6)
//   .map(n => n / 4);
//
// console.log(leftResult);
//
// const foldRightResult = Right(3)
//   .map(n => n + 6)
//   .map(n => n / 4)
//   .fold(l => 'Error', r => r);
//
// console.log(foldRightResult);
//
// const foldLeftResult = Left(3)
//   .map(n => n + 6)
//   .map(n => n / 4)
//   .fold(l => 'Error!', r => r);
//
// console.log(foldLeftResult);

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

const boxRes = Box(' 64 ')
                .map(s => s.trim())
                .map(s => parseInt(s))
                .map(n => n + 1)
                .map(n => String.fromCharCode(n))
                .fold(s => s.toLowerCase());

console.log(boxRes);

const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g()),
  inspect: () => `LazyBox(${g})`,
});

const lazyRes = LazyBox(() => ' 64 ')
                  .map(s => s.trim())
                  .map(s => parseInt(s))
                  .map(n => n + 1)
                  .map(n => String.fromCharCode(n))
                  .fold(s => s.toLowerCase());

console.log(lazyRes);

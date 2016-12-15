const fs = require('fs');

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  chain: f => Left(x),
  map: _f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x => x != null ? Right(x) : Left(null);

const tryCatch = f => {
  try {
    return Right(f());
  } catch(e) {
    return Left(e);
  }
};

const getPort = (configFile = 'config.json') =>
  tryCatch(() => fs.readFileSync(configFile))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(_ => 3000,
        c => c.port);

const result = getPort();
console.log(result);

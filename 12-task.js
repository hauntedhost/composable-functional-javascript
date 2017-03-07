const Task = require('data.task');

Task.of(1)
.map(n => n + 1)
.chain(n => Task.of(n + 1))
.fork(e => console.log('error', e),
      x => console.log('success', x));

const launchMissiles = () => new Task((rej, res) => {
  console.log('launching missiles!');
  res('missile');
});

const app = launchMissiles().map(x => x + '!');

app.map(x => x + '!').fork(e => console.log('err', e),
                           x => console.log('success', x));

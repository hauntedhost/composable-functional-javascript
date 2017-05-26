### [Functors Definition](https://en.wikipedia.org/wiki/Functor#Definition):

Where `Fx` is a functor holding `x`.

#### composition:

```javascript
Fx.map(f).map(g) === Fx.map(x => g(f(x)))
```

#### identity:

```javascript
Fx.map(id) === id(Fx)
```

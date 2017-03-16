## Professor Frisby Introduces Composable Functional JavaScript

[![Book cover](cover.png)](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)

Personal code while watching [Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript). Fun course.

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

---
[Sean Omlor](http://seanomlor.com)

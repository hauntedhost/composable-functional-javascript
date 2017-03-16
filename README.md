## Professor Frisby Introduces Composable Functional JavaScript

[![Book cover](cover.png)](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)

Personal code while watching [Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript). Fun course.

### [Functors Definition](https://en.wikipedia.org/wiki/Functor#Definition):

Where `fx` is a functor holding `x`.

#### composition:

```javascript
fx.map(f).map(g) == fx.map(x => g(f(x)))
```

#### identity:

```javascript
fx.map(id) == id(fx)
```

---
[Sean Omlor](http://seanomlor.com)

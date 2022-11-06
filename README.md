Fastest™ JSON deep clone in JavaScript
======================================

[fast-json-clone][npm] is a tiny library to clone [JSON][json] values in pure JavaScript focusing on the speed.

```js
import * as assert from 'assert';
import cloneJSON from 'fast-json-clone';

const value = { str: 'hello', num: 42, array: [true, null], object: { str: 'hello', bool: true, } };

const cloned = cloneJSON(value);
assert.notStrictEqual(value, cloned);
assert.deepStrictEqual(value, cloned);
};
```

## API

This package exports a single function `cloneJSON`.

```
cloneJSON(x: JsonValue): JsonValue;
```

This function clones the given JSON value and returns it. There are some invariants for the parameter:

- The parameter must not contain circles. This function does not detect circles by design.
- The parameter must contain JSON values only. Other values like `Date`, `Regexp`, `Map`, `Set`, `Buffer`, ... are not allowed.

## Benchmark

Here is the result of [the benchmark](./bench) with large (1.2MB) JSON value. This package is the fastest among the implementations.

```
Naive deep clone                x 269 ops/sec ±0.33% (90 runs sampled)
JSON serialize/deserialize      x 144 ops/sec ±0.97% (82 runs sampled)
Native structuredClone          x 156 ops/sec ±0.44% (79 runs sampled)
structuredClone polyfill        x 156 ops/sec ±0.31% (80 runs sampled)
lodash.clonedeep                x 169 ops/sec ±2.22% (82 runs sampled)
clone-deep                      x 239 ops/sec ±0.62% (87 runs sampled)
rfdc (default)                  x 558 ops/sec ±0.31% (94 runs sampled)
rfdc (proto)                    x 624 ops/sec ±0.60% (94 runs sampled)
fastest-json-copy               x 627 ops/sec ±0.36% (94 runs sampled)
fast-json-clone (this package)  x 664 ops/sec ±0.33% (96 runs sampled)

Fastest is fast-json-clone (this package)
```

## FAQ

### Why this package is the fastest?

Since this pacakge is optimized for removing function calls in the hot loop as much as possible. [rfdc][] is implemented
with the same strategy.

### Then why this package is faster than rfdc?

Since this package provides less functionality. rfdc provides support for some non-JSON types (`Date`, `Regexp`, ...).
It increses number of branches and causes some trade-off.

[npm]: https://www.npmjs.com/package/fast-json-clone
[json]: https://json.org/
[rfdc]: https://github.com/davidmarkclements/rfdc

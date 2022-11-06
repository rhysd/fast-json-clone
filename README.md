Fastest™ JSON deep clone in JavaScript
======================================
[![npm][npm-badge]][npm]
[![CI][ci-badge]][ci]

[fast-json-clone][npm] is a tiny library to clone [JSON][json] values in pure JavaScript focusing on the speed.
According to [the benchmark](./bench), this package is the fastest among the implementation.

```js
import * as assert from 'assert';
import cloneJSON from 'fast-json-clone';

const value = { str: 'hello', num: 42, array: [true, null], object: { str: 'hello', bool: true, } };

const cloned = cloneJSON(value);
assert.notStrictEqual(value, cloned);
assert.deepStrictEqual(value, cloned);
};
```

## Installation

This package is licensed with CC0-1.0. Directly copy [index.ts](./index.ts) to your project.

Or install via [npm](https://npmjs.com/) package manager.

```sh
npm install --save fast-json-clone
```

## API

This package exports a single function `cloneJSON`.

```
cloneJSON(x: JsonValue): JsonValue;
```

This function clones the given JSON value and returns it. There are some invariants for the parameter:

- The parameter must not contain circles. This function does not work with circular references by design.
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

Since this package is optimized for removing non-inline function calls in the hot loop as much as possible. [rfdc][] is
implemented with the same strategy.

### Then why this package is faster than rfdc?

Since this package provides less functionality. rfdc provides some extra functionalities such as support for some non-JSON
types (`Date`, `Regexp`, ...). They cause some trade-off.

## License

This package is distributed under [CC0 1.0](LICENSE.txt) (Public Domain).
Feel free to copy and paste the implementation directly to your project without any copyright notice.

[ci]: https://github.com/rhysd/fast-json-clone/actions/workflows/ci.yml
[ci-badge]: https://github.com/rhysd/fast-json-clone/actions/workflows/ci.yml/badge.svg
[npm]: https://www.npmjs.com/package/fast-json-clone
[npm-badge]: https://badge.fury.io/js/fast-json-clone.svg
[json]: https://json.org/
[rfdc]: https://github.com/davidmarkclements/rfdc

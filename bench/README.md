Benchmark suites for comparing multiple implementations to copy JSON value in the following conditions.

- No circles exist in the values
- Only JSON-compatible values (null, number, string, boolean, array, object)

To run the benchmarks:

```sh
npm run bench
```

## Benchmark suites

- `LARGE`: [Large JSON value](../testdata/large.json) (1.2MB)
- `MEDIUM`: [`package.json` of this package](../package.json)
- `SMALL`: Very small hand-made JSON object
- `EMPTY`: Empty object `{}`

## Implementations

- `Naive deep clone`: Naive implementation of deep clone in a few lines
- `JSON serialize/deserialize`: `JSON.parse(JSON.stringify(x))`
- `Native structuredClone`: Native [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) function
- `structuredClone polyfill`: [`@ungap/structured-clone`](https://www.npmjs.com/package/@ungap/structured-clone) package
- `lodash.clonedeep`: [`lodash.clonedeep`](https://www.npmjs.com/package/lodash.clonedeep) package
- `clone-deep`: [`clone-deep`](https://www.npmjs.com/package/clone-deep) package
- `rfdc (default)`: [`rfdc`](https://www.npmjs.com/package/rfdc) package with default options
- `rfdc (proto)`:  [`rfdc`](https://www.npmjs.com/package/rfdc) package with `proto` option enabled
- `fastest-json-copy`: [`fastest-json-copy`](https://www.npmjs.com/package/fastest-json-copy) package
- `fast-json-clone (this package)`: This package

## Results

Here are the results of each benchmark suites.

- Node.js 18.8.0
- iMac 2020
- macOS 11

LARGE:

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

MEDIUM:

```
Naive deep clone               x 377,647 ops/sec ±0.65% (96 runs sampled)
JSON serialize/deserialize     x 140,507 ops/sec ±0.28% (91 runs sampled)
Native structuredClone         x 127,046 ops/sec ±0.56% (93 runs sampled)
structuredClone polyfill       x 128,153 ops/sec ±0.26% (95 runs sampled)
lodash.clonedeep               x 275,571 ops/sec ±0.30% (94 runs sampled)
clone-deep                     x 406,903 ops/sec ±0.28% (93 runs sampled)
rfdc (default)                 x 586,620 ops/sec ±0.57% (95 runs sampled)
rfdc (proto)                   x 726,523 ops/sec ±0.25% (98 runs sampled)
fastest-json-copy              x 831,693 ops/sec ±0.48% (93 runs sampled)
fast-json-clone (this package) x 934,265 ops/sec ±0.38% (94 runs sampled)

Fastest is fast-json-clone (this package)
```

SMALL:

```
Naive deep clone               x 1,026,835 ops/sec ±0.20% (99 runs sampled)
JSON serialize/deserialize     x 523,975   ops/sec ±0.21% (94 runs sampled)
Native structuredClone         x 328,045   ops/sec ±0.43% (95 runs sampled)
structuredClone polyfill       x 324,168   ops/sec ±0.82% (95 runs sampled)
lodash.clonedeep               x 780,213   ops/sec ±0.99% (99 runs sampled)
clone-deep                     x 1,143,784 ops/sec ±0.34% (96 runs sampled)
rfdc (default)                 x 1,678,649 ops/sec ±0.24% (95 runs sampled)
rfdc (proto)                   x 1,931,670 ops/sec ±0.60% (97 runs sampled)
fastest-json-copy              x 2,884,027 ops/sec ±0.25% (94 runs sampled)
fast-json-clone (this package) x 3,114,469 ops/sec ±0.25% (96 runs sampled)

Fastest is fast-json-clone (this package)
```

EMPTY:

```
Naive deep clone               x 58,467,338  ops/sec ±1.26% (91 runs sampled)
JSON serialize/deserialize     x 3,922,987   ops/sec ±0.84% (91 runs sampled)
Native structuredClone         x 759,267     ops/sec ±0.60% (96 runs sampled)
structuredClone polyfill       x 761,859     ops/sec ±0.41% (96 runs sampled)
lodash.clonedeep               x 4,348,871   ops/sec ±0.26% (96 runs sampled)
clone-deep                     x 5,697,636   ops/sec ±0.56% (97 runs sampled)
rfdc (default)                 x 65,027,170  ops/sec ±1.14% (92 runs sampled)
rfdc (proto)                   x 87,071,104  ops/sec ±2.27% (90 runs sampled)
fastest-json-copy              x 70,005,364  ops/sec ±1.47% (90 runs sampled)
fast-json-clone (this package) x 113,750,854 ops/sec ±5.74% (74 runs sampled)

Fastest is fast-json-clone (this package)
```

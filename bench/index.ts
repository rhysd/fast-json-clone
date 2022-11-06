import * as path from 'path';
import Benchmark from 'benchmark';
import structuredClonePolyfill from '@ungap/structured-clone';
import lodashCloneDeep from 'lodash.clonedeep';
import rfdc from 'rfdc';
import cloneDeep from 'clone-deep';
import { copy as fastestClone } from 'fastest-json-copy';
import cloneJSON from '../index';

const rfdcDefault = rfdc();
const rfdcProto = rfdc({ proto: true, circles: false });

function viaJSON(x: any): any {
    return JSON.parse(JSON.stringify(x));
}

function naive(x: any): any {
    if (typeof x === 'number' || typeof x === 'boolean' || typeof x === 'string' || x === null) {
        return x;
    } else if (Array.isArray(x)) {
        return x.map(naive);
    } else {
        const ret: any = {};
        for (const [k, v] of Object.entries(x)) {
            ret[k] = naive(v);
        }
        return ret;
    }
}

function bench(name: string, data: any): void {
    console.log(`Running ${name} benchmark suite...`);

    const suite = new Benchmark.Suite(name);
    suite
        .add('Native structuredClone', function () {
            structuredClone(data);
        })
        .add('structuredClone polyfill', function () {
            structuredClonePolyfill(data);
        })
        .add('JSON serialize/deserialize', function () {
            viaJSON(data);
        })
        .add('Naive deep clone', function () {
            naive(data);
        })
        .add('lodash.clonedeep', function () {
            lodashCloneDeep(data);
        })
        .add('clone-deep', function () {
            cloneDeep(data);
        })
        .add('rfdc (default)', function () {
            rfdcDefault(data);
        })
        .add('rfdc (proto)', function () {
            rfdcProto(data);
        })
        .add('fastest-json-copy', function () {
            fastestClone(data);
        })
        .add('fast-json-clone (this package)', function () {
            cloneJSON(data);
        })
        .on('cycle', function (event: Benchmark.Event) {
            console.log(String(event.target));
        })
        .on('complete', function (this: typeof suite) {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run();

    console.log(`Finish ${name} benchmark suite`);
}

const large = require(path.join(__dirname, '..', 'testdata', 'large.json'));
const medium = require(path.join(__dirname, '..', 'package.json'));
const small = {
    str: 'hello',
    num: 42,
    bool: true,
    null: null,
    array: ['hello', 42, true, null],
    object: {
        str: 'hello',
        num: 42,
        bool: true,
        null: null,
    }
};

bench('LARGE', large);
bench('MEDIUM', medium);
bench('SMALL', small);
bench('EMPTY', {});

import { notStrictEqual as neq, deepStrictEqual as deq } from 'assert';
import * as path from 'path';
import cloneJSON from '../index';
import type { JsonValue } from '../index';

function check(data: JsonValue): void {
    const cloned = cloneJSON(data);
    if (typeof data === 'object' && data !== null) {
        neq(cloned, data);
    }
    deq(cloned, data);
}

describe('cloneJSON', function () {
    const params: JsonValue[] = [
        null,
        '',
        'abc',
        0,
        -123456,
        true,
        [],
        [1, '', true, null],
        {},
        { num: 1, str: 'a', bool: true, null: null },
    ];

    for (const param of params) {
        it(`should clone ${JSON.stringify(param)}`, function () {
            check(param);
        });
    }

    it('should clone package.json', function () {
        const data = require(path.join(path.dirname(__dirname), 'package.json'));
        check(data);
    });

    it('should clone large JSON data', function () {
        const data = require(path.join(path.dirname(__dirname), 'testdata', 'large.json'));
        check(data);
    });
});

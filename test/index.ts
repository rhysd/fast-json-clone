import { notStrictEqual as neq, deepStrictEqual as deq } from 'assert';
import cloneJSON from '../index';
import type { JsonValue } from '../index';

describe('basic', function() {
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
        {num: 1, str: 'a', bool: true, null: null},
    ];

    for (const param of params) {
        it(`can clone ${JSON.stringify(param)}`, function() {
            const cloned = cloneJSON(param);
            if (typeof param === 'object' && param !== null) {
                neq(cloned, param);
            }
            deq(cloned, param);
        });
    }
});

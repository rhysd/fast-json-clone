/**
 * fast-json-clone is a tiny library to clone JSON values in pure JavaScript focusing on the speed.
 * According to the benchmark, this package seems the fastest among several deep-clone implementations.
 *
 * Please visit the repository page for more details:
 *
 * https://github.com/rhysd/fast-json-clone
 * @module
 */

export type JsonValue = number | string | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * This function clones the given JSON value.
 *
 * @param value The JSON value to be cloned. There are two invariants. 1) It must not contain circles
 *              as JSON does not allow it. This function will cause infinite loop for such values by
 *              design. 2) It must contain JSON values only. Other values like `Date`, `Regexp`, `Map`,
 *              `Set`, `Buffer`, ... are not allowed.
 * @returns The cloned JSON value.
 */
export default function cloneJSON(value: JsonValue): JsonValue {
    if (typeof value !== 'object' || value === null) {
        return value;
    } else if (Array.isArray(value)) {
        return value.map(e => (typeof e !== 'object' || e === null ? e : cloneJSON(e)));
    } else {
        const ret: { [key: string]: JsonValue } = {};
        for (const k in value) {
            const v = value[k];
            ret[k] = typeof v !== 'object' || v === null ? v : cloneJSON(v);
        }
        return ret;
    }
}

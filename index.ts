export type JsonValue = number | string | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export default function cloneJSON(x: JsonValue): JsonValue {
    if (typeof x !== 'object' || x === null) {
        return x;
    } else if (Array.isArray(x)) {
        return x.map(e => (typeof e !== 'object' || e === null ? e : cloneJSON(e)));
    } else {
        const ret: { [key: string]: JsonValue } = {};
        for (const k in x) {
            const v = x[k];
            ret[k] = typeof v !== 'object' || v === null ? v : cloneJSON(v);
        }
        return ret;
    }
}

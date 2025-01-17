import jsdom from 'https://dev.jspm.io/jsdom';
import { renderer, serializer } from './deno_dom.js';

import type {
    Context,
    Data
} from './dom_engine.deno.d.ts';

const symbol = Symbol('source');

// deno-lint-ignore no-explicit-any
const { window } = new (jsdom as any).JSDOM('<!DOCTYPE html>')
const { document, DOMParser, XMLSerializer } = window

export const source = symbol;

export function template(src: string, {...data}: Data) {
    return ({
        [symbol]: src,
        ...data
    });
}

const ctx: Context = {
    document,
    parser: new DOMParser(),
    serializer: new XMLSerializer(),
    source
};

// deno-lint-ignore no-explicit-any
export const render = renderer(ctx as any); export const serialize = serializer(ctx as any);
import { _ as l } from './ProseCode.vue.08e636f3.js';
import {
  g as n,
  o as s,
  j as i,
  w as r,
  a as o,
  Q as g,
  R as u,
  r as c,
} from './entry.f0151a78.js';
const h = n({
  __name: 'ProsePre',
  props: {
    code: { type: String, default: '' },
    language: { type: String, default: null },
    filename: { type: String, default: null },
    highlights: { type: Array, default: () => [] },
    meta: { type: String, default: null },
    class: { type: String, default: null },
    style: { type: [String, Object], default: null },
  },
  setup(e) {
    return (t, d) => {
      const a = l;
      return (
        s(),
        i(
          a,
          {
            code: e.code,
            language: e.language,
            filename: e.filename,
            highlights: e.highlights,
            meta: e.meta,
          },
          {
            default: r(() => [
              o(
                'pre',
                { class: g(t.$props.class), style: u(e.style) },
                [c(t.$slots, 'default')],
                6,
              ),
            ]),
            _: 3,
          },
          8,
          ['code', 'language', 'filename', 'highlights', 'meta'],
        )
      );
    };
  },
});
export { h as default };

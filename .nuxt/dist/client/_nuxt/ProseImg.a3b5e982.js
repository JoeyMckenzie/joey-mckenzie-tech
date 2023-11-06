import {
  g as r,
  J as n,
  o as c,
  c as h,
  m as o,
  U as l,
  y as u,
  v as d,
  V as g,
} from './entry.f0151a78.js';
const f = ['src', 'alt', 'width', 'height'],
  p = r({
    __name: 'ProseImg',
    props: {
      src: { type: String, default: '' },
      alt: { type: String, default: '' },
      width: { type: [String, Number], default: void 0 },
      height: { type: [String, Number], default: void 0 },
    },
    setup(e) {
      const t = e,
        i = n(() => {
          var a;
          if (
            (a = t.src) != null &&
            a.startsWith('/') &&
            !t.src.startsWith('//')
          ) {
            const s = l(u(d().app.baseURL));
            if (s !== '/' && !t.src.startsWith(s)) return g(s, t.src);
          }
          return t.src;
        });
      return (a, s) => (
        c(),
        h(
          'img',
          { src: o(i), alt: e.alt, width: e.width, height: e.height },
          null,
          8,
          f,
        )
      );
    },
  });
export { p as default };

import {
  g as i,
  v as c,
  J as p,
  o as s,
  c as n,
  m as u,
  r as t,
} from './entry.f0151a78.js';
const f = ['id'],
  l = ['href'],
  k = i({
    __name: 'ProseH2',
    props: { id: {} },
    setup(r) {
      const a = r,
        { headings: o } = c().public.mdc,
        d = p(() => {
          var e;
          return (
            a.id &&
            ((e = o == null ? void 0 : o.anchorLinks) == null ? void 0 : e.h2)
          );
        });
      return (e, m) => (
        s(),
        n(
          'h2',
          { id: e.id },
          [
            e.id && u(d)
              ? (s(),
                n(
                  'a',
                  { key: 0, href: `#${e.id}` },
                  [t(e.$slots, 'default')],
                  8,
                  l,
                ))
              : t(e.$slots, 'default', { key: 1 }),
          ],
          8,
          f,
        )
      );
    },
  });
export { k as default };

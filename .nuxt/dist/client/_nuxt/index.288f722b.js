const l = /\d/,
  h = ['-', '_', '/', '.'];
function C(e = '') {
  if (!l.test(e)) return e.toUpperCase() === e;
}
function c(e, o) {
  const u = o ?? h,
    s = [];
  if (!e || typeof e != 'string') return s;
  let t = '',
    r,
    a;
  for (const p of e) {
    const i = u.includes(p);
    if (i === !0) {
      s.push(t), (t = ''), (r = void 0);
      continue;
    }
    const n = C(p);
    if (a === !1) {
      if (r === !1 && n === !0) {
        s.push(t), (t = p), (r = n);
        continue;
      }
      if (r === !0 && n === !1 && t.length > 1) {
        const f = t[t.length - 1];
        s.push(t.slice(0, Math.max(0, t.length - 1))), (t = f + p), (r = n);
        continue;
      }
    }
    (t += p), (r = n), (a = i);
  }
  return s.push(t), s;
}
function y(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : '';
}
function U(e) {
  return e ? (Array.isArray(e) ? e : c(e)).map((o) => y(o)).join('') : '';
}
function A(e, o) {
  return e
    ? (Array.isArray(e) ? e : c(e)).map((u) => u.toLowerCase()).join(o ?? '-')
    : '';
}
export { A as k, U as p };

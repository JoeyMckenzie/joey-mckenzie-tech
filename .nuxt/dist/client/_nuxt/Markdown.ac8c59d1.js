import r from './ContentSlot.1053d4d4.js';
import { g as o, x as u, J as f, P as c } from './entry.f0151a78.js';
const i = o({
  name: 'Markdown',
  extends: r,
  setup(t) {
    const { parent: e } = c(),
      { between: n, default: a } = u(),
      s = f(() => (typeof t.unwrap == 'string' ? t.unwrap.split(' ') : ['*']));
    return { fallbackSlot: a, tags: s, between: n, parent: e };
  },
});
export { i as default };

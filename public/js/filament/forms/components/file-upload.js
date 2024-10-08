var Jl = Object.defineProperty
var er = (e, t) => {
    for (var i in t) Jl(e, i, { get: t[i], enumerable: !0 })
}
var na = {}
er(na, {
    FileOrigin: () => zt,
    FileStatus: () => Et,
    OptionTypes: () => Gi,
    Status: () => no,
    create: () => ut,
    destroy: () => ft,
    find: () => Wi,
    getOptions: () => Hi,
    parse: () => Ui,
    registerPlugin: () => Ie,
    setOptions: () => Dt,
    supported: () => Vi,
})
var tr = (e) => e instanceof HTMLElement,
    ir = (e, t = [], i = []) => {
        let a = { ...e },
            n = [],
            o = [],
            l = () => ({ ...a }),
            r = () => {
                let f = [...n]
                return (n.length = 0), f
            },
            s = () => {
                let f = [...o]
                ;(o.length = 0),
                    f.forEach(({ type: h, data: g }) => {
                        p(h, g)
                    })
            },
            p = (f, h, g) => {
                if (g && !document.hidden) {
                    o.push({ type: f, data: h })
                    return
                }
                u[f] && u[f](h), n.push({ type: f, data: h })
            },
            c = (f, ...h) => (m[f] ? m[f](...h) : null),
            d = {
                getState: l,
                processActionQueue: r,
                processDispatchQueue: s,
                dispatch: p,
                query: c,
            },
            m = {}
        t.forEach((f) => {
            m = { ...f(a), ...m }
        })
        let u = {}
        return (
            i.forEach((f) => {
                u = { ...f(p, c, a), ...u }
            }),
            d
        )
    },
    ar = (e, t, i) => {
        if (typeof i == 'function') {
            e[t] = i
            return
        }
        Object.defineProperty(e, t, { ...i })
    },
    te = (e, t) => {
        for (let i in e) e.hasOwnProperty(i) && t(i, e[i])
    },
    We = (e) => {
        let t = {}
        return (
            te(e, (i) => {
                ar(t, i, e[i])
            }),
            t
        )
    },
    se = (e, t, i = null) => {
        if (i === null) return e.getAttribute(t) || e.hasAttribute(t)
        e.setAttribute(t, i)
    },
    nr = 'http://www.w3.org/2000/svg',
    or = ['svg', 'path'],
    Oa = (e) => or.includes(e),
    ni = (e, t, i = {}) => {
        typeof t == 'object' && ((i = t), (t = null))
        let a = Oa(e)
            ? document.createElementNS(nr, e)
            : document.createElement(e)
        return (
            t && (Oa(e) ? se(a, 'class', t) : (a.className = t)),
            te(i, (n, o) => {
                se(a, n, o)
            }),
            a
        )
    },
    lr = (e) => (t, i) => {
        typeof i < 'u' && e.children[i]
            ? e.insertBefore(t, e.children[i])
            : e.appendChild(t)
    },
    rr = (e, t) => (i, a) => (
        typeof a < 'u' ? t.splice(a, 0, i) : t.push(i), i
    ),
    sr = (e, t) => (i) => (
        t.splice(t.indexOf(i), 1),
        i.element.parentNode && e.removeChild(i.element),
        i
    ),
    cr = (() => typeof window < 'u' && typeof window.document < 'u')(),
    En = () => cr,
    dr = En() ? ni('svg') : {},
    pr =
        'children' in dr
            ? (e) => e.children.length
            : (e) => e.childNodes.length,
    bn = (e, t, i, a) => {
        let n = i[0] || e.left,
            o = i[1] || e.top,
            l = n + e.width,
            r = o + e.height * (a[1] || 1),
            s = {
                element: { ...e },
                inner: {
                    left: e.left,
                    top: e.top,
                    right: e.right,
                    bottom: e.bottom,
                },
                outer: { left: n, top: o, right: l, bottom: r },
            }
        return (
            t
                .filter((p) => !p.isRectIgnored())
                .map((p) => p.rect)
                .forEach((p) => {
                    Pa(s.inner, { ...p.inner }), Pa(s.outer, { ...p.outer })
                }),
            Da(s.inner),
            (s.outer.bottom += s.element.marginBottom),
            (s.outer.right += s.element.marginRight),
            Da(s.outer),
            s
        )
    },
    Pa = (e, t) => {
        ;(t.top += e.top),
            (t.right += e.left),
            (t.bottom += e.top),
            (t.left += e.left),
            t.bottom > e.bottom && (e.bottom = t.bottom),
            t.right > e.right && (e.right = t.right)
    },
    Da = (e) => {
        ;(e.width = e.right - e.left), (e.height = e.bottom - e.top)
    },
    $e = (e) => typeof e == 'number',
    mr = (e, t, i, a = 0.001) => Math.abs(e - t) < a && Math.abs(i) < a,
    ur = ({ stiffness: e = 0.5, damping: t = 0.75, mass: i = 10 } = {}) => {
        let a = null,
            n = null,
            o = 0,
            l = !1,
            p = We({
                interpolate: (c, d) => {
                    if (l) return
                    if (!($e(a) && $e(n))) {
                        ;(l = !0), (o = 0)
                        return
                    }
                    let m = -(n - a) * e
                    ;(o += m / i),
                        (n += o),
                        (o *= t),
                        mr(n, a, o) || d
                            ? ((n = a),
                              (o = 0),
                              (l = !0),
                              p.onupdate(n),
                              p.oncomplete(n))
                            : p.onupdate(n)
                },
                target: {
                    set: (c) => {
                        if (
                            ($e(c) && !$e(n) && (n = c),
                            a === null && ((a = c), (n = c)),
                            (a = c),
                            n === a || typeof a > 'u')
                        ) {
                            ;(l = !0), (o = 0), p.onupdate(n), p.oncomplete(n)
                            return
                        }
                        l = !1
                    },
                    get: () => a,
                },
                resting: { get: () => l },
                onupdate: (c) => {},
                oncomplete: (c) => {},
            })
        return p
    }
var fr = (e) => (e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e),
    hr = ({ duration: e = 500, easing: t = fr, delay: i = 0 } = {}) => {
        let a = null,
            n,
            o,
            l = !0,
            r = !1,
            s = null,
            c = We({
                interpolate: (d, m) => {
                    l ||
                        s === null ||
                        (a === null && (a = d),
                        !(d - a < i) &&
                            ((n = d - a - i),
                            n >= e || m
                                ? ((n = 1),
                                  (o = r ? 0 : 1),
                                  c.onupdate(o * s),
                                  c.oncomplete(o * s),
                                  (l = !0))
                                : ((o = n / e),
                                  c.onupdate(
                                      (n >= 0 ? t(r ? 1 - o : o) : 0) * s
                                  ))))
                },
                target: {
                    get: () => (r ? 0 : s),
                    set: (d) => {
                        if (s === null) {
                            ;(s = d), c.onupdate(d), c.oncomplete(d)
                            return
                        }
                        d < s ? ((s = 1), (r = !0)) : ((r = !1), (s = d)),
                            (l = !1),
                            (a = null)
                    },
                },
                resting: { get: () => l },
                onupdate: (d) => {},
                oncomplete: (d) => {},
            })
        return c
    },
    Fa = { spring: ur, tween: hr },
    gr = (e, t, i) => {
        let a = e[t] && typeof e[t][i] == 'object' ? e[t][i] : e[t] || e,
            n = typeof a == 'string' ? a : a.type,
            o = typeof a == 'object' ? { ...a } : {}
        return Fa[n] ? Fa[n](o) : null
    },
    ji = (e, t, i, a = !1) => {
        ;(t = Array.isArray(t) ? t : [t]),
            t.forEach((n) => {
                e.forEach((o) => {
                    let l = o,
                        r = () => i[o],
                        s = (p) => (i[o] = p)
                    typeof o == 'object' &&
                        ((l = o.key), (r = o.getter || r), (s = o.setter || s)),
                        !(n[l] && !a) && (n[l] = { get: r, set: s })
                })
            })
    },
    Er = ({
        mixinConfig: e,
        viewProps: t,
        viewInternalAPI: i,
        viewExternalAPI: a,
    }) => {
        let n = { ...t },
            o = []
        return (
            te(e, (l, r) => {
                let s = gr(r)
                if (!s) return
                ;(s.onupdate = (c) => {
                    t[l] = c
                }),
                    (s.target = n[l]),
                    ji(
                        [
                            {
                                key: l,
                                setter: (c) => {
                                    s.target !== c && (s.target = c)
                                },
                                getter: () => t[l],
                            },
                        ],
                        [i, a],
                        t,
                        !0
                    ),
                    o.push(s)
            }),
            {
                write: (l) => {
                    let r = document.hidden,
                        s = !0
                    return (
                        o.forEach((p) => {
                            p.resting || (s = !1), p.interpolate(l, r)
                        }),
                        s
                    )
                },
                destroy: () => {},
            }
        )
    },
    br = (e) => (t, i) => {
        e.addEventListener(t, i)
    },
    Tr = (e) => (t, i) => {
        e.removeEventListener(t, i)
    },
    vr = ({
        mixinConfig: e,
        viewProps: t,
        viewInternalAPI: i,
        viewExternalAPI: a,
        viewState: n,
        view: o,
    }) => {
        let l = [],
            r = br(o.element),
            s = Tr(o.element)
        return (
            (a.on = (p, c) => {
                l.push({ type: p, fn: c }), r(p, c)
            }),
            (a.off = (p, c) => {
                l.splice(
                    l.findIndex((d) => d.type === p && d.fn === c),
                    1
                ),
                    s(p, c)
            }),
            {
                write: () => !0,
                destroy: () => {
                    l.forEach((p) => {
                        s(p.type, p.fn)
                    })
                },
            }
        )
    },
    Ir = ({ mixinConfig: e, viewProps: t, viewExternalAPI: i }) => {
        ji(e, i, t)
    },
    ue = (e) => e != null,
    xr = {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        originX: 0,
        originY: 0,
    },
    yr = ({
        mixinConfig: e,
        viewProps: t,
        viewInternalAPI: i,
        viewExternalAPI: a,
        view: n,
    }) => {
        let o = { ...t },
            l = {}
        ji(e, [i, a], t)
        let r = () => [t.translateX || 0, t.translateY || 0],
            s = () => [t.scaleX || 0, t.scaleY || 0],
            p = () => (n.rect ? bn(n.rect, n.childViews, r(), s()) : null)
        return (
            (i.rect = { get: p }),
            (a.rect = { get: p }),
            e.forEach((c) => {
                t[c] = typeof o[c] > 'u' ? xr[c] : o[c]
            }),
            {
                write: () => {
                    if (_r(l, t))
                        return Rr(n.element, t), Object.assign(l, { ...t }), !0
                },
                destroy: () => {},
            }
        )
    },
    _r = (e, t) => {
        if (Object.keys(e).length !== Object.keys(t).length) return !0
        for (let i in t) if (t[i] !== e[i]) return !0
        return !1
    },
    Rr = (
        e,
        {
            opacity: t,
            perspective: i,
            translateX: a,
            translateY: n,
            scaleX: o,
            scaleY: l,
            rotateX: r,
            rotateY: s,
            rotateZ: p,
            originX: c,
            originY: d,
            width: m,
            height: u,
        }
    ) => {
        let f = '',
            h = ''
        ;(ue(c) || ue(d)) &&
            (h += `transform-origin: ${c || 0}px ${d || 0}px;`),
            ue(i) && (f += `perspective(${i}px) `),
            (ue(a) || ue(n)) &&
                (f += `translate3d(${a || 0}px, ${n || 0}px, 0) `),
            (ue(o) || ue(l)) &&
                (f += `scale3d(${ue(o) ? o : 1}, ${ue(l) ? l : 1}, 1) `),
            ue(p) && (f += `rotateZ(${p}rad) `),
            ue(r) && (f += `rotateX(${r}rad) `),
            ue(s) && (f += `rotateY(${s}rad) `),
            f.length && (h += `transform:${f};`),
            ue(t) &&
                ((h += `opacity:${t};`),
                t === 0 && (h += 'visibility:hidden;'),
                t < 1 && (h += 'pointer-events:none;')),
            ue(u) && (h += `height:${u}px;`),
            ue(m) && (h += `width:${m}px;`)
        let g = e.elementCurrentStyle || ''
        ;(h.length !== g.length || h !== g) &&
            ((e.style.cssText = h), (e.elementCurrentStyle = h))
    },
    wr = { styles: yr, listeners: vr, animations: Er, apis: Ir },
    za = (e = {}, t = {}, i = {}) => (
        t.layoutCalculated ||
            ((e.paddingTop = parseInt(i.paddingTop, 10) || 0),
            (e.marginTop = parseInt(i.marginTop, 10) || 0),
            (e.marginRight = parseInt(i.marginRight, 10) || 0),
            (e.marginBottom = parseInt(i.marginBottom, 10) || 0),
            (e.marginLeft = parseInt(i.marginLeft, 10) || 0),
            (t.layoutCalculated = !0)),
        (e.left = t.offsetLeft || 0),
        (e.top = t.offsetTop || 0),
        (e.width = t.offsetWidth || 0),
        (e.height = t.offsetHeight || 0),
        (e.right = e.left + e.width),
        (e.bottom = e.top + e.height),
        (e.scrollTop = t.scrollTop),
        (e.hidden = t.offsetParent === null),
        e
    ),
    ne =
        ({
            tag: e = 'div',
            name: t = null,
            attributes: i = {},
            read: a = () => {},
            write: n = () => {},
            create: o = () => {},
            destroy: l = () => {},
            filterFrameActionsForChild: r = (u, f) => f,
            didCreateView: s = () => {},
            didWriteView: p = () => {},
            ignoreRect: c = !1,
            ignoreRectUpdate: d = !1,
            mixins: m = [],
        } = {}) =>
        (u, f = {}) => {
            let h = ni(e, `filepond--${t}`, i),
                g = window.getComputedStyle(h, null),
                v = za(),
                E = null,
                T = !1,
                I = [],
                y = [],
                b = {},
                w = {},
                x = [n],
                _ = [a],
                P = [l],
                O = () => h,
                M = () => I.concat(),
                C = () => b,
                S = (G) => (H, Y) => H(G, Y),
                F = () => E || ((E = bn(v, I, [0, 0], [1, 1])), E),
                R = () => g,
                L = () => {
                    ;(E = null),
                        I.forEach((Y) => Y._read()),
                        !(d && v.width && v.height) && za(v, h, g)
                    let H = { root: Q, props: f, rect: v }
                    _.forEach((Y) => Y(H))
                },
                z = (G, H, Y) => {
                    let le = H.length === 0
                    return (
                        x.forEach((ee) => {
                            ee({
                                props: f,
                                root: Q,
                                actions: H,
                                timestamp: G,
                                shouldOptimize: Y,
                            }) === !1 && (le = !1)
                        }),
                        y.forEach((ee) => {
                            ee.write(G) === !1 && (le = !1)
                        }),
                        I.filter((ee) => !!ee.element.parentNode).forEach(
                            (ee) => {
                                ee._write(G, r(ee, H), Y) || (le = !1)
                            }
                        ),
                        I.forEach((ee, V) => {
                            ee.element.parentNode ||
                                (Q.appendChild(ee.element, V),
                                ee._read(),
                                ee._write(G, r(ee, H), Y),
                                (le = !1))
                        }),
                        (T = le),
                        p({ props: f, root: Q, actions: H, timestamp: G }),
                        le
                    )
                },
                D = () => {
                    y.forEach((G) => G.destroy()),
                        P.forEach((G) => {
                            G({ root: Q, props: f })
                        }),
                        I.forEach((G) => G._destroy())
                },
                k = {
                    element: { get: O },
                    style: { get: R },
                    childViews: { get: M },
                },
                B = {
                    ...k,
                    rect: { get: F },
                    ref: { get: C },
                    is: (G) => t === G,
                    appendChild: lr(h),
                    createChildView: S(u),
                    linkView: (G) => (I.push(G), G),
                    unlinkView: (G) => {
                        I.splice(I.indexOf(G), 1)
                    },
                    appendChildView: rr(h, I),
                    removeChildView: sr(h, I),
                    registerWriter: (G) => x.push(G),
                    registerReader: (G) => _.push(G),
                    registerDestroyer: (G) => P.push(G),
                    invalidateLayout: () => (h.layoutCalculated = !1),
                    dispatch: u.dispatch,
                    query: u.query,
                },
                X = {
                    element: { get: O },
                    childViews: { get: M },
                    rect: { get: F },
                    resting: { get: () => T },
                    isRectIgnored: () => c,
                    _read: L,
                    _write: z,
                    _destroy: D,
                },
                q = { ...k, rect: { get: () => v } }
            Object.keys(m)
                .sort((G, H) => (G === 'styles' ? 1 : H === 'styles' ? -1 : 0))
                .forEach((G) => {
                    let H = wr[G]({
                        mixinConfig: m[G],
                        viewProps: f,
                        viewState: w,
                        viewInternalAPI: B,
                        viewExternalAPI: X,
                        view: We(q),
                    })
                    H && y.push(H)
                })
            let Q = We(B)
            o({ root: Q, props: f })
            let pe = pr(h)
            return (
                I.forEach((G, H) => {
                    Q.appendChild(G.element, pe + H)
                }),
                s(Q),
                We(X)
            )
        },
    Sr = (e, t, i = 60) => {
        let a = '__framePainter'
        if (window[a]) {
            window[a].readers.push(e), window[a].writers.push(t)
            return
        }
        window[a] = { readers: [e], writers: [t] }
        let n = window[a],
            o = 1e3 / i,
            l = null,
            r = null,
            s = null,
            p = null,
            c = () => {
                document.hidden
                    ? ((s = () =>
                          window.setTimeout(() => d(performance.now()), o)),
                      (p = () => window.clearTimeout(r)))
                    : ((s = () => window.requestAnimationFrame(d)),
                      (p = () => window.cancelAnimationFrame(r)))
            }
        document.addEventListener('visibilitychange', () => {
            p && p(), c(), d(performance.now())
        })
        let d = (m) => {
            ;(r = s(d)), l || (l = m)
            let u = m - l
            u <= o ||
                ((l = m - (u % o)),
                n.readers.forEach((f) => f()),
                n.writers.forEach((f) => f(m)))
        }
        return (
            c(),
            d(performance.now()),
            {
                pause: () => {
                    p(r)
                },
            }
        )
    },
    he =
        (e, t) =>
        ({
            root: i,
            props: a,
            actions: n = [],
            timestamp: o,
            shouldOptimize: l,
        }) => {
            n
                .filter((r) => e[r.type])
                .forEach((r) =>
                    e[r.type]({
                        root: i,
                        props: a,
                        action: r.data,
                        timestamp: o,
                        shouldOptimize: l,
                    })
                ),
                t &&
                    t({
                        root: i,
                        props: a,
                        actions: n,
                        timestamp: o,
                        shouldOptimize: l,
                    })
        },
    Ca = (e, t) => t.parentNode.insertBefore(e, t),
    Na = (e, t) => t.parentNode.insertBefore(e, t.nextSibling),
    si = (e) => Array.isArray(e),
    Be = (e) => e == null,
    Lr = (e) => e.trim(),
    ci = (e) => '' + e,
    Ar = (e, t = ',') =>
        Be(e)
            ? []
            : si(e)
              ? e
              : ci(e)
                    .split(t)
                    .map(Lr)
                    .filter((i) => i.length),
    Tn = (e) => typeof e == 'boolean',
    vn = (e) => (Tn(e) ? e : e === 'true'),
    fe = (e) => typeof e == 'string',
    In = (e) => ($e(e) ? e : fe(e) ? ci(e).replace(/[a-z]+/gi, '') : 0),
    ai = (e) => parseInt(In(e), 10),
    Ba = (e) => parseFloat(In(e)),
    gt = (e) => $e(e) && isFinite(e) && Math.floor(e) === e,
    ka = (e, t = 1e3) => {
        if (gt(e)) return e
        let i = ci(e).trim()
        return /MB$/i.test(i)
            ? ((i = i.replace(/MB$i/, '').trim()), ai(i) * t * t)
            : /KB/i.test(i)
              ? ((i = i.replace(/KB$i/, '').trim()), ai(i) * t)
              : ai(i)
    },
    Xe = (e) => typeof e == 'function',
    Mr = (e) => {
        let t = self,
            i = e.split('.'),
            a = null
        for (; (a = i.shift()); ) if (((t = t[a]), !t)) return null
        return t
    },
    Va = {
        process: 'POST',
        patch: 'PATCH',
        revert: 'DELETE',
        fetch: 'GET',
        restore: 'GET',
        load: 'GET',
    },
    Or = (e) => {
        let t = {}
        return (
            (t.url = fe(e) ? e : e.url || ''),
            (t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0),
            (t.headers = e.headers ? e.headers : {}),
            te(Va, (i) => {
                t[i] = Pr(i, e[i], Va[i], t.timeout, t.headers)
            }),
            (t.process = e.process || fe(e) || e.url ? t.process : null),
            (t.remove = e.remove || null),
            delete t.headers,
            t
        )
    },
    Pr = (e, t, i, a, n) => {
        if (t === null) return null
        if (typeof t == 'function') return t
        let o = {
            url: i === 'GET' || i === 'PATCH' ? `?${e}=` : '',
            method: i,
            headers: n,
            withCredentials: !1,
            timeout: a,
            onload: null,
            ondata: null,
            onerror: null,
        }
        if (fe(t)) return (o.url = t), o
        if ((Object.assign(o, t), fe(o.headers))) {
            let l = o.headers.split(/:(.+)/)
            o.headers = { header: l[0], value: l[1] }
        }
        return (o.withCredentials = vn(o.withCredentials)), o
    },
    Dr = (e) => Or(e),
    Fr = (e) => e === null,
    ce = (e) => typeof e == 'object' && e !== null,
    zr = (e) =>
        ce(e) &&
        fe(e.url) &&
        ce(e.process) &&
        ce(e.revert) &&
        ce(e.restore) &&
        ce(e.fetch),
    Pi = (e) =>
        si(e)
            ? 'array'
            : Fr(e)
              ? 'null'
              : gt(e)
                ? 'int'
                : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
                  ? 'bytes'
                  : zr(e)
                    ? 'api'
                    : typeof e,
    Cr = (e) =>
        e
            .replace(/{\s*'/g, '{"')
            .replace(/'\s*}/g, '"}')
            .replace(/'\s*:/g, '":')
            .replace(/:\s*'/g, ':"')
            .replace(/,\s*'/g, ',"')
            .replace(/'\s*,/g, '",'),
    Nr = {
        array: Ar,
        boolean: vn,
        int: (e) => (Pi(e) === 'bytes' ? ka(e) : ai(e)),
        number: Ba,
        float: Ba,
        bytes: ka,
        string: (e) => (Xe(e) ? e : ci(e)),
        function: (e) => Mr(e),
        serverapi: Dr,
        object: (e) => {
            try {
                return JSON.parse(Cr(e))
            } catch {
                return null
            }
        },
    },
    Br = (e, t) => Nr[t](e),
    xn = (e, t, i) => {
        if (e === t) return e
        let a = Pi(e)
        if (a !== i) {
            let n = Br(e, i)
            if (((a = Pi(n)), n === null))
                throw `Trying to assign value with incorrect type to "${option}", allowed type: "${i}"`
            e = n
        }
        return e
    },
    kr = (e, t) => {
        let i = e
        return {
            enumerable: !0,
            get: () => i,
            set: (a) => {
                i = xn(a, e, t)
            },
        }
    },
    Vr = (e) => {
        let t = {}
        return (
            te(e, (i) => {
                let a = e[i]
                t[i] = kr(a[0], a[1])
            }),
            We(t)
        )
    },
    Gr = (e) => ({
        items: [],
        listUpdateTimeout: null,
        itemUpdateTimeout: null,
        processingQueue: [],
        options: Vr(e),
    }),
    di = (e, t = '-') =>
        e
            .split(/(?=[A-Z])/)
            .map((i) => i.toLowerCase())
            .join(t),
    Ur = (e, t) => {
        let i = {}
        return (
            te(t, (a) => {
                i[a] = {
                    get: () => e.getState().options[a],
                    set: (n) => {
                        e.dispatch(`SET_${di(a, '_').toUpperCase()}`, {
                            value: n,
                        })
                    },
                }
            }),
            i
        )
    },
    Wr = (e) => (t, i, a) => {
        let n = {}
        return (
            te(e, (o) => {
                let l = di(o, '_').toUpperCase()
                n[`SET_${l}`] = (r) => {
                    try {
                        a.options[o] = r.value
                    } catch {}
                    t(`DID_SET_${l}`, { value: a.options[o] })
                }
            }),
            n
        )
    },
    Hr = (e) => (t) => {
        let i = {}
        return (
            te(e, (a) => {
                i[`GET_${di(a, '_').toUpperCase()}`] = (n) => t.options[a]
            }),
            i
        )
    },
    _e = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 },
    Yi = () => Math.random().toString(36).substring(2, 11),
    qi = (e, t) => e.splice(t, 1),
    jr = (e, t) => {
        t
            ? e()
            : document.hidden
              ? Promise.resolve(1).then(e)
              : setTimeout(e, 0)
    },
    pi = () => {
        let e = [],
            t = (a, n) => {
                qi(
                    e,
                    e.findIndex((o) => o.event === a && (o.cb === n || !n))
                )
            },
            i = (a, n, o) => {
                e.filter((l) => l.event === a)
                    .map((l) => l.cb)
                    .forEach((l) => jr(() => l(...n), o))
            }
        return {
            fireSync: (a, ...n) => {
                i(a, n, !0)
            },
            fire: (a, ...n) => {
                i(a, n, !1)
            },
            on: (a, n) => {
                e.push({ event: a, cb: n })
            },
            onOnce: (a, n) => {
                e.push({
                    event: a,
                    cb: (...o) => {
                        t(a, n), n(...o)
                    },
                })
            },
            off: t,
        }
    },
    yn = (e, t, i) => {
        Object.getOwnPropertyNames(e)
            .filter((a) => !i.includes(a))
            .forEach((a) =>
                Object.defineProperty(
                    t,
                    a,
                    Object.getOwnPropertyDescriptor(e, a)
                )
            )
    },
    Yr = [
        'fire',
        'process',
        'revert',
        'load',
        'on',
        'off',
        'onOnce',
        'retryLoad',
        'extend',
        'archive',
        'archived',
        'release',
        'released',
        'requestProcessing',
        'freeze',
    ],
    ge = (e) => {
        let t = {}
        return yn(e, t, Yr), t
    },
    qr = (e) => {
        e.forEach((t, i) => {
            t.released && qi(e, i)
        })
    },
    W = {
        INIT: 1,
        IDLE: 2,
        PROCESSING_QUEUED: 9,
        PROCESSING: 3,
        PROCESSING_COMPLETE: 5,
        PROCESSING_ERROR: 6,
        PROCESSING_REVERT_ERROR: 10,
        LOADING: 7,
        LOAD_ERROR: 8,
    },
    re = { INPUT: 1, LIMBO: 2, LOCAL: 3 },
    _n = (e) => /[^0-9]+/.exec(e),
    Rn = () => _n((1.1).toLocaleString())[0],
    $r = () => {
        let e = Rn(),
            t = (1e3).toLocaleString(),
            i = (1e3).toString()
        return t !== i ? _n(t)[0] : e === '.' ? ',' : '.'
    },
    A = {
        BOOLEAN: 'boolean',
        INT: 'int',
        NUMBER: 'number',
        STRING: 'string',
        ARRAY: 'array',
        OBJECT: 'object',
        FUNCTION: 'function',
        ACTION: 'action',
        SERVER_API: 'serverapi',
        REGEX: 'regex',
    },
    $i = [],
    Ae = (e, t, i) =>
        new Promise((a, n) => {
            let o = $i.filter((r) => r.key === e).map((r) => r.cb)
            if (o.length === 0) {
                a(t)
                return
            }
            let l = o.shift()
            o.reduce((r, s) => r.then((p) => s(p, i)), l(t, i))
                .then((r) => a(r))
                .catch((r) => n(r))
        }),
    tt = (e, t, i) => $i.filter((a) => a.key === e).map((a) => a.cb(t, i)),
    Xr = (e, t) => $i.push({ key: e, cb: t }),
    Qr = (e) => Object.assign(dt, e),
    oi = () => ({ ...dt }),
    Zr = (e) => {
        te(e, (t, i) => {
            dt[t] && (dt[t][0] = xn(i, dt[t][0], dt[t][1]))
        })
    },
    dt = {
        id: [null, A.STRING],
        name: ['filepond', A.STRING],
        disabled: [!1, A.BOOLEAN],
        className: [null, A.STRING],
        required: [!1, A.BOOLEAN],
        captureMethod: [null, A.STRING],
        allowSyncAcceptAttribute: [!0, A.BOOLEAN],
        allowDrop: [!0, A.BOOLEAN],
        allowBrowse: [!0, A.BOOLEAN],
        allowPaste: [!0, A.BOOLEAN],
        allowMultiple: [!1, A.BOOLEAN],
        allowReplace: [!0, A.BOOLEAN],
        allowRevert: [!0, A.BOOLEAN],
        allowRemove: [!0, A.BOOLEAN],
        allowProcess: [!0, A.BOOLEAN],
        allowReorder: [!1, A.BOOLEAN],
        allowDirectoriesOnly: [!1, A.BOOLEAN],
        storeAsFile: [!1, A.BOOLEAN],
        forceRevert: [!1, A.BOOLEAN],
        maxFiles: [null, A.INT],
        checkValidity: [!1, A.BOOLEAN],
        itemInsertLocationFreedom: [!0, A.BOOLEAN],
        itemInsertLocation: ['before', A.STRING],
        itemInsertInterval: [75, A.INT],
        dropOnPage: [!1, A.BOOLEAN],
        dropOnElement: [!0, A.BOOLEAN],
        dropValidation: [!1, A.BOOLEAN],
        ignoredFiles: [['.ds_store', 'thumbs.db', 'desktop.ini'], A.ARRAY],
        instantUpload: [!0, A.BOOLEAN],
        maxParallelUploads: [2, A.INT],
        allowMinimumUploadDuration: [!0, A.BOOLEAN],
        chunkUploads: [!1, A.BOOLEAN],
        chunkForce: [!1, A.BOOLEAN],
        chunkSize: [5e6, A.INT],
        chunkRetryDelays: [[500, 1e3, 3e3], A.ARRAY],
        server: [null, A.SERVER_API],
        fileSizeBase: [1e3, A.INT],
        labelFileSizeBytes: ['bytes', A.STRING],
        labelFileSizeKilobytes: ['KB', A.STRING],
        labelFileSizeMegabytes: ['MB', A.STRING],
        labelFileSizeGigabytes: ['GB', A.STRING],
        labelDecimalSeparator: [Rn(), A.STRING],
        labelThousandsSeparator: [$r(), A.STRING],
        labelIdle: [
            'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
            A.STRING,
        ],
        labelInvalidField: ['Field contains invalid files', A.STRING],
        labelFileWaitingForSize: ['Waiting for size', A.STRING],
        labelFileSizeNotAvailable: ['Size not available', A.STRING],
        labelFileCountSingular: ['file in list', A.STRING],
        labelFileCountPlural: ['files in list', A.STRING],
        labelFileLoading: ['Loading', A.STRING],
        labelFileAdded: ['Added', A.STRING],
        labelFileLoadError: ['Error during load', A.STRING],
        labelFileRemoved: ['Removed', A.STRING],
        labelFileRemoveError: ['Error during remove', A.STRING],
        labelFileProcessing: ['Uploading', A.STRING],
        labelFileProcessingComplete: ['Upload complete', A.STRING],
        labelFileProcessingAborted: ['Upload cancelled', A.STRING],
        labelFileProcessingError: ['Error during upload', A.STRING],
        labelFileProcessingRevertError: ['Error during revert', A.STRING],
        labelTapToCancel: ['tap to cancel', A.STRING],
        labelTapToRetry: ['tap to retry', A.STRING],
        labelTapToUndo: ['tap to undo', A.STRING],
        labelButtonRemoveItem: ['Remove', A.STRING],
        labelButtonAbortItemLoad: ['Abort', A.STRING],
        labelButtonRetryItemLoad: ['Retry', A.STRING],
        labelButtonAbortItemProcessing: ['Cancel', A.STRING],
        labelButtonUndoItemProcessing: ['Undo', A.STRING],
        labelButtonRetryItemProcessing: ['Retry', A.STRING],
        labelButtonProcessItem: ['Upload', A.STRING],
        iconRemove: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
            A.STRING,
        ],
        iconProcess: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
            A.STRING,
        ],
        iconRetry: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
            A.STRING,
        ],
        iconUndo: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
            A.STRING,
        ],
        iconDone: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
            A.STRING,
        ],
        oninit: [null, A.FUNCTION],
        onwarning: [null, A.FUNCTION],
        onerror: [null, A.FUNCTION],
        onactivatefile: [null, A.FUNCTION],
        oninitfile: [null, A.FUNCTION],
        onaddfilestart: [null, A.FUNCTION],
        onaddfileprogress: [null, A.FUNCTION],
        onaddfile: [null, A.FUNCTION],
        onprocessfilestart: [null, A.FUNCTION],
        onprocessfileprogress: [null, A.FUNCTION],
        onprocessfileabort: [null, A.FUNCTION],
        onprocessfilerevert: [null, A.FUNCTION],
        onprocessfile: [null, A.FUNCTION],
        onprocessfiles: [null, A.FUNCTION],
        onremovefile: [null, A.FUNCTION],
        onpreparefile: [null, A.FUNCTION],
        onupdatefiles: [null, A.FUNCTION],
        onreorderfiles: [null, A.FUNCTION],
        beforeDropFile: [null, A.FUNCTION],
        beforeAddFile: [null, A.FUNCTION],
        beforeRemoveFile: [null, A.FUNCTION],
        beforePrepareFile: [null, A.FUNCTION],
        stylePanelLayout: [null, A.STRING],
        stylePanelAspectRatio: [null, A.STRING],
        styleItemPanelAspectRatio: [null, A.STRING],
        styleButtonRemoveItemPosition: ['left', A.STRING],
        styleButtonProcessItemPosition: ['right', A.STRING],
        styleLoadIndicatorPosition: ['right', A.STRING],
        styleProgressIndicatorPosition: ['right', A.STRING],
        styleButtonRemoveItemAlign: [!1, A.BOOLEAN],
        files: [[], A.ARRAY],
        credits: [['https://pqina.nl/', 'Powered by PQINA'], A.ARRAY],
    },
    Qe = (e, t) =>
        Be(t)
            ? e[0] || null
            : gt(t)
              ? e[t] || null
              : (typeof t == 'object' && (t = t.id),
                e.find((i) => i.id === t) || null),
    wn = (e) => {
        if (Be(e)) return e
        if (/:/.test(e)) {
            let t = e.split(':')
            return t[1] / t[0]
        }
        return parseFloat(e)
    },
    Me = (e) => e.filter((t) => !t.archived),
    Sn = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 },
    Zt = null,
    Kr = () => {
        if (Zt === null)
            try {
                let e = new DataTransfer()
                e.items.add(new File(['hello world'], 'This_Works.txt'))
                let t = document.createElement('input')
                t.setAttribute('type', 'file'),
                    (t.files = e.files),
                    (Zt = t.files.length === 1)
            } catch {
                Zt = !1
            }
        return Zt
    },
    Jr = [W.LOAD_ERROR, W.PROCESSING_ERROR, W.PROCESSING_REVERT_ERROR],
    es = [W.LOADING, W.PROCESSING, W.PROCESSING_QUEUED, W.INIT],
    ts = [W.PROCESSING_COMPLETE],
    is = (e) => Jr.includes(e.status),
    as = (e) => es.includes(e.status),
    ns = (e) => ts.includes(e.status),
    Ga = (e) =>
        ce(e.options.server) &&
        (ce(e.options.server.process) || Xe(e.options.server.process)),
    os = (e) => ({
        GET_STATUS: () => {
            let t = Me(e.items),
                { EMPTY: i, ERROR: a, BUSY: n, IDLE: o, READY: l } = Sn
            return t.length === 0
                ? i
                : t.some(is)
                  ? a
                  : t.some(as)
                    ? n
                    : t.some(ns)
                      ? l
                      : o
        },
        GET_ITEM: (t) => Qe(e.items, t),
        GET_ACTIVE_ITEM: (t) => Qe(Me(e.items), t),
        GET_ACTIVE_ITEMS: () => Me(e.items),
        GET_ITEMS: () => e.items,
        GET_ITEM_NAME: (t) => {
            let i = Qe(e.items, t)
            return i ? i.filename : null
        },
        GET_ITEM_SIZE: (t) => {
            let i = Qe(e.items, t)
            return i ? i.fileSize : null
        },
        GET_STYLES: () =>
            Object.keys(e.options)
                .filter((t) => /^style/.test(t))
                .map((t) => ({ name: t, value: e.options[t] })),
        GET_PANEL_ASPECT_RATIO: () =>
            /circle/.test(e.options.stylePanelLayout)
                ? 1
                : wn(e.options.stylePanelAspectRatio),
        GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
        GET_ITEMS_BY_STATUS: (t) => Me(e.items).filter((i) => i.status === t),
        GET_TOTAL_ITEMS: () => Me(e.items).length,
        SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Kr() && !Ga(e),
        IS_ASYNC: () => Ga(e),
        GET_FILE_SIZE_LABELS: (t) => ({
            labelBytes: t('GET_LABEL_FILE_SIZE_BYTES') || void 0,
            labelKilobytes: t('GET_LABEL_FILE_SIZE_KILOBYTES') || void 0,
            labelMegabytes: t('GET_LABEL_FILE_SIZE_MEGABYTES') || void 0,
            labelGigabytes: t('GET_LABEL_FILE_SIZE_GIGABYTES') || void 0,
        }),
    }),
    ls = (e) => {
        let t = Me(e.items).length
        if (!e.options.allowMultiple) return t === 0
        let i = e.options.maxFiles
        return i === null || t < i
    },
    Ln = (e, t, i) => Math.max(Math.min(i, e), t),
    rs = (e, t, i) => e.splice(t, 0, i),
    ss = (e, t, i) =>
        Be(t)
            ? null
            : typeof i > 'u'
              ? (e.push(t), t)
              : ((i = Ln(i, 0, e.length)), rs(e, i, t), t),
    Di = (e) =>
        /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
            e
        ),
    Ft = (e) => `${e}`.split('/').pop().split('?').shift(),
    mi = (e) => e.split('.').pop(),
    cs = (e) => {
        if (typeof e != 'string') return ''
        let t = e.split('/').pop()
        return /svg/.test(t)
            ? 'svg'
            : /zip|compressed/.test(t)
              ? 'zip'
              : /plain/.test(t)
                ? 'txt'
                : /msword/.test(t)
                  ? 'doc'
                  : /[a-z]+/.test(t)
                    ? t === 'jpeg'
                        ? 'jpg'
                        : t
                    : ''
    },
    At = (e, t = '') => (t + e).slice(-t.length),
    An = (e = new Date()) =>
        `${e.getFullYear()}-${At(e.getMonth() + 1, '00')}-${At(e.getDate(), '00')}_${At(e.getHours(), '00')}-${At(e.getMinutes(), '00')}-${At(e.getSeconds(), '00')}`,
    ht = (e, t, i = null, a = null) => {
        let n =
            typeof i == 'string'
                ? e.slice(0, e.size, i)
                : e.slice(0, e.size, e.type)
        return (
            (n.lastModifiedDate = new Date()),
            e._relativePath && (n._relativePath = e._relativePath),
            fe(t) || (t = An()),
            t && a === null && mi(t)
                ? (n.name = t)
                : ((a = a || cs(n.type)), (n.name = t + (a ? '.' + a : ''))),
            n
        )
    },
    ds = () =>
        (window.BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder),
    Mn = (e, t) => {
        let i = ds()
        if (i) {
            let a = new i()
            return a.append(e), a.getBlob(t)
        }
        return new Blob([e], { type: t })
    },
    ps = (e, t) => {
        let i = new ArrayBuffer(e.length),
            a = new Uint8Array(i)
        for (let n = 0; n < e.length; n++) a[n] = e.charCodeAt(n)
        return Mn(i, t)
    },
    On = (e) => (/^data:(.+);/.exec(e) || [])[1] || null,
    ms = (e) => e.split(',')[1].replace(/\s/g, ''),
    us = (e) => atob(ms(e)),
    fs = (e) => {
        let t = On(e),
            i = us(e)
        return ps(i, t)
    },
    hs = (e, t, i) => ht(fs(e), t, null, i),
    gs = (e) => {
        if (!/^content-disposition:/i.test(e)) return null
        let t = e
            .split(/filename=|filename\*=.+''/)
            .splice(1)
            .map((i) => i.trim().replace(/^["']|[;"']{0,2}$/g, ''))
            .filter((i) => i.length)
        return t.length ? decodeURI(t[t.length - 1]) : null
    },
    Es = (e) => {
        if (/content-length:/i.test(e)) {
            let t = e.match(/[0-9]+/)[0]
            return t ? parseInt(t, 10) : null
        }
        return null
    },
    bs = (e) =>
        (/x-content-transfer-id:/i.test(e) && (e.split(':')[1] || '').trim()) ||
        null,
    Xi = (e) => {
        let t = { source: null, name: null, size: null },
            i = e.split(`
`)
        for (let a of i) {
            let n = gs(a)
            if (n) {
                t.name = n
                continue
            }
            let o = Es(a)
            if (o) {
                t.size = o
                continue
            }
            let l = bs(a)
            if (l) {
                t.source = l
                continue
            }
        }
        return t
    },
    Ts = (e) => {
        let t = {
                source: null,
                complete: !1,
                progress: 0,
                size: null,
                timestamp: null,
                duration: 0,
                request: null,
            },
            i = () => t.progress,
            a = () => {
                t.request && t.request.abort && t.request.abort()
            },
            n = () => {
                let r = t.source
                l.fire('init', r),
                    r instanceof File
                        ? l.fire('load', r)
                        : r instanceof Blob
                          ? l.fire('load', ht(r, r.name))
                          : Di(r)
                            ? l.fire('load', hs(r))
                            : o(r)
            },
            o = (r) => {
                if (!e) {
                    l.fire('error', {
                        type: 'error',
                        body: "Can't load URL",
                        code: 400,
                    })
                    return
                }
                ;(t.timestamp = Date.now()),
                    (t.request = e(
                        r,
                        (s) => {
                            ;(t.duration = Date.now() - t.timestamp),
                                (t.complete = !0),
                                s instanceof Blob &&
                                    (s = ht(s, s.name || Ft(r))),
                                l.fire(
                                    'load',
                                    s instanceof Blob ? s : s ? s.body : null
                                )
                        },
                        (s) => {
                            l.fire(
                                'error',
                                typeof s == 'string'
                                    ? { type: 'error', code: 0, body: s }
                                    : s
                            )
                        },
                        (s, p, c) => {
                            if (
                                (c && (t.size = c),
                                (t.duration = Date.now() - t.timestamp),
                                !s)
                            ) {
                                t.progress = null
                                return
                            }
                            ;(t.progress = p / c),
                                l.fire('progress', t.progress)
                        },
                        () => {
                            l.fire('abort')
                        },
                        (s) => {
                            let p = Xi(typeof s == 'string' ? s : s.headers)
                            l.fire('meta', {
                                size: t.size || p.size,
                                filename: p.name,
                                source: p.source,
                            })
                        }
                    ))
            },
            l = {
                ...pi(),
                setSource: (r) => (t.source = r),
                getProgress: i,
                abort: a,
                load: n,
            }
        return l
    },
    Ua = (e) => /GET|HEAD/.test(e),
    Ze = (e, t, i) => {
        let a = {
                onheaders: () => {},
                onprogress: () => {},
                onload: () => {},
                ontimeout: () => {},
                onerror: () => {},
                onabort: () => {},
                abort: () => {
                    ;(n = !0), l.abort()
                },
            },
            n = !1,
            o = !1
        ;(i = { method: 'POST', headers: {}, withCredentials: !1, ...i }),
            (t = encodeURI(t)),
            Ua(i.method) &&
                e &&
                (t = `${t}${encodeURIComponent(typeof e == 'string' ? e : JSON.stringify(e))}`)
        let l = new XMLHttpRequest(),
            r = Ua(i.method) ? l : l.upload
        return (
            (r.onprogress = (s) => {
                n || a.onprogress(s.lengthComputable, s.loaded, s.total)
            }),
            (l.onreadystatechange = () => {
                l.readyState < 2 ||
                    (l.readyState === 4 && l.status === 0) ||
                    o ||
                    ((o = !0), a.onheaders(l))
            }),
            (l.onload = () => {
                l.status >= 200 && l.status < 300 ? a.onload(l) : a.onerror(l)
            }),
            (l.onerror = () => a.onerror(l)),
            (l.onabort = () => {
                ;(n = !0), a.onabort()
            }),
            (l.ontimeout = () => a.ontimeout(l)),
            l.open(i.method, t, !0),
            gt(i.timeout) && (l.timeout = i.timeout),
            Object.keys(i.headers).forEach((s) => {
                let p = unescape(encodeURIComponent(i.headers[s]))
                l.setRequestHeader(s, p)
            }),
            i.responseType && (l.responseType = i.responseType),
            i.withCredentials && (l.withCredentials = !0),
            l.send(e),
            a
        )
    },
    ie = (e, t, i, a) => ({ type: e, code: t, body: i, headers: a }),
    Ke = (e) => (t) => {
        e(ie('error', 0, 'Timeout', t.getAllResponseHeaders()))
    },
    Wa = (e) => /\?/.test(e),
    Pt = (...e) => {
        let t = ''
        return (
            e.forEach((i) => {
                t += Wa(t) && Wa(i) ? i.replace(/\?/, '&') : i
            }),
            t
        )
    },
    wi = (e = '', t) => {
        if (typeof t == 'function') return t
        if (!t || !fe(t.url)) return null
        let i = t.onload || ((n) => n),
            a = t.onerror || ((n) => null)
        return (n, o, l, r, s, p) => {
            let c = Ze(n, Pt(e, t.url), { ...t, responseType: 'blob' })
            return (
                (c.onload = (d) => {
                    let m = d.getAllResponseHeaders(),
                        u = Xi(m).name || Ft(n)
                    o(
                        ie(
                            'load',
                            d.status,
                            t.method === 'HEAD' ? null : ht(i(d.response), u),
                            m
                        )
                    )
                }),
                (c.onerror = (d) => {
                    l(
                        ie(
                            'error',
                            d.status,
                            a(d.response) || d.statusText,
                            d.getAllResponseHeaders()
                        )
                    )
                }),
                (c.onheaders = (d) => {
                    p(ie('headers', d.status, null, d.getAllResponseHeaders()))
                }),
                (c.ontimeout = Ke(l)),
                (c.onprogress = r),
                (c.onabort = s),
                c
            )
        }
    },
    xe = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 },
    vs = (e, t, i, a, n, o, l, r, s, p, c) => {
        let d = [],
            {
                chunkTransferId: m,
                chunkServer: u,
                chunkSize: f,
                chunkRetryDelays: h,
            } = c,
            g = { serverId: m, aborted: !1 },
            v = t.ondata || ((S) => S),
            E =
                t.onload ||
                ((S, F) =>
                    F === 'HEAD'
                        ? S.getResponseHeader('Upload-Offset')
                        : S.response),
            T = t.onerror || ((S) => null),
            I = (S) => {
                let F = new FormData()
                ce(n) && F.append(i, JSON.stringify(n))
                let R =
                        typeof t.headers == 'function'
                            ? t.headers(a, n)
                            : { ...t.headers, 'Upload-Length': a.size },
                    L = { ...t, headers: R },
                    z = Ze(v(F), Pt(e, t.url), L)
                ;(z.onload = (D) => S(E(D, L.method))),
                    (z.onerror = (D) =>
                        l(
                            ie(
                                'error',
                                D.status,
                                T(D.response) || D.statusText,
                                D.getAllResponseHeaders()
                            )
                        )),
                    (z.ontimeout = Ke(l))
            },
            y = (S) => {
                let F = Pt(e, u.url, g.serverId),
                    L = {
                        headers:
                            typeof t.headers == 'function'
                                ? t.headers(g.serverId)
                                : { ...t.headers },
                        method: 'HEAD',
                    },
                    z = Ze(null, F, L)
                ;(z.onload = (D) => S(E(D, L.method))),
                    (z.onerror = (D) =>
                        l(
                            ie(
                                'error',
                                D.status,
                                T(D.response) || D.statusText,
                                D.getAllResponseHeaders()
                            )
                        )),
                    (z.ontimeout = Ke(l))
            },
            b = Math.floor(a.size / f)
        for (let S = 0; S <= b; S++) {
            let F = S * f,
                R = a.slice(F, F + f, 'application/offset+octet-stream')
            d[S] = {
                index: S,
                size: R.size,
                offset: F,
                data: R,
                file: a,
                progress: 0,
                retries: [...h],
                status: xe.QUEUED,
                error: null,
                request: null,
                timeout: null,
            }
        }
        let w = () => o(g.serverId),
            x = (S) => S.status === xe.QUEUED || S.status === xe.ERROR,
            _ = (S) => {
                if (g.aborted) return
                if (((S = S || d.find(x)), !S)) {
                    d.every((k) => k.status === xe.COMPLETE) && w()
                    return
                }
                ;(S.status = xe.PROCESSING), (S.progress = null)
                let F = u.ondata || ((k) => k),
                    R = u.onerror || ((k) => null),
                    L = Pt(e, u.url, g.serverId),
                    z =
                        typeof u.headers == 'function'
                            ? u.headers(S)
                            : {
                                  ...u.headers,
                                  'Content-Type':
                                      'application/offset+octet-stream',
                                  'Upload-Offset': S.offset,
                                  'Upload-Length': a.size,
                                  'Upload-Name': a.name,
                              },
                    D = (S.request = Ze(F(S.data), L, { ...u, headers: z }))
                ;(D.onload = () => {
                    ;(S.status = xe.COMPLETE), (S.request = null), M()
                }),
                    (D.onprogress = (k, B, X) => {
                        ;(S.progress = k ? B : null), O()
                    }),
                    (D.onerror = (k) => {
                        ;(S.status = xe.ERROR),
                            (S.request = null),
                            (S.error = R(k.response) || k.statusText),
                            P(S) ||
                                l(
                                    ie(
                                        'error',
                                        k.status,
                                        R(k.response) || k.statusText,
                                        k.getAllResponseHeaders()
                                    )
                                )
                    }),
                    (D.ontimeout = (k) => {
                        ;(S.status = xe.ERROR),
                            (S.request = null),
                            P(S) || Ke(l)(k)
                    }),
                    (D.onabort = () => {
                        ;(S.status = xe.QUEUED), (S.request = null), s()
                    })
            },
            P = (S) =>
                S.retries.length === 0
                    ? !1
                    : ((S.status = xe.WAITING),
                      clearTimeout(S.timeout),
                      (S.timeout = setTimeout(() => {
                          _(S)
                      }, S.retries.shift())),
                      !0),
            O = () => {
                let S = d.reduce(
                    (R, L) =>
                        R === null || L.progress === null
                            ? null
                            : R + L.progress,
                    0
                )
                if (S === null) return r(!1, 0, 0)
                let F = d.reduce((R, L) => R + L.size, 0)
                r(!0, S, F)
            },
            M = () => {
                d.filter((F) => F.status === xe.PROCESSING).length >= 1 || _()
            },
            C = () => {
                d.forEach((S) => {
                    clearTimeout(S.timeout), S.request && S.request.abort()
                })
            }
        return (
            g.serverId
                ? y((S) => {
                      g.aborted ||
                          (d
                              .filter((F) => F.offset < S)
                              .forEach((F) => {
                                  ;(F.status = xe.COMPLETE),
                                      (F.progress = F.size)
                              }),
                          M())
                  })
                : I((S) => {
                      g.aborted || (p(S), (g.serverId = S), M())
                  }),
            {
                abort: () => {
                    ;(g.aborted = !0), C()
                },
            }
        )
    },
    Is = (e, t, i, a) => (n, o, l, r, s, p, c) => {
        if (!n) return
        let d = a.chunkUploads,
            m = d && n.size > a.chunkSize,
            u = d && (m || a.chunkForce)
        if (n instanceof Blob && u) return vs(e, t, i, n, o, l, r, s, p, c, a)
        let f = t.ondata || ((y) => y),
            h = t.onload || ((y) => y),
            g = t.onerror || ((y) => null),
            v =
                typeof t.headers == 'function'
                    ? t.headers(n, o) || {}
                    : { ...t.headers },
            E = { ...t, headers: v }
        var T = new FormData()
        ce(o) && T.append(i, JSON.stringify(o)),
            (n instanceof Blob ? [{ name: null, file: n }] : n).forEach((y) => {
                T.append(
                    i,
                    y.file,
                    y.name === null ? y.file.name : `${y.name}${y.file.name}`
                )
            })
        let I = Ze(f(T), Pt(e, t.url), E)
        return (
            (I.onload = (y) => {
                l(
                    ie(
                        'load',
                        y.status,
                        h(y.response),
                        y.getAllResponseHeaders()
                    )
                )
            }),
            (I.onerror = (y) => {
                r(
                    ie(
                        'error',
                        y.status,
                        g(y.response) || y.statusText,
                        y.getAllResponseHeaders()
                    )
                )
            }),
            (I.ontimeout = Ke(r)),
            (I.onprogress = s),
            (I.onabort = p),
            I
        )
    },
    xs = (e = '', t, i, a) =>
        typeof t == 'function'
            ? (...n) => t(i, ...n, a)
            : !t || !fe(t.url)
              ? null
              : Is(e, t, i, a),
    Mt = (e = '', t) => {
        if (typeof t == 'function') return t
        if (!t || !fe(t.url)) return (n, o) => o()
        let i = t.onload || ((n) => n),
            a = t.onerror || ((n) => null)
        return (n, o, l) => {
            let r = Ze(n, e + t.url, t)
            return (
                (r.onload = (s) => {
                    o(
                        ie(
                            'load',
                            s.status,
                            i(s.response),
                            s.getAllResponseHeaders()
                        )
                    )
                }),
                (r.onerror = (s) => {
                    l(
                        ie(
                            'error',
                            s.status,
                            a(s.response) || s.statusText,
                            s.getAllResponseHeaders()
                        )
                    )
                }),
                (r.ontimeout = Ke(l)),
                r
            )
        }
    },
    Pn = (e = 0, t = 1) => e + Math.random() * (t - e),
    ys = (e, t = 1e3, i = 0, a = 25, n = 250) => {
        let o = null,
            l = Date.now(),
            r = () => {
                let s = Date.now() - l,
                    p = Pn(a, n)
                s + p > t && (p = s + p - t)
                let c = s / t
                if (c >= 1 || document.hidden) {
                    e(1)
                    return
                }
                e(c), (o = setTimeout(r, p))
            }
        return (
            t > 0 && r(),
            {
                clear: () => {
                    clearTimeout(o)
                },
            }
        )
    },
    _s = (e, t) => {
        let i = {
                complete: !1,
                perceivedProgress: 0,
                perceivedPerformanceUpdater: null,
                progress: null,
                timestamp: null,
                perceivedDuration: 0,
                duration: 0,
                request: null,
                response: null,
            },
            { allowMinimumUploadDuration: a } = t,
            n = (c, d) => {
                let m = () => {
                        i.duration === 0 ||
                            i.progress === null ||
                            p.fire('progress', p.getProgress())
                    },
                    u = () => {
                        ;(i.complete = !0),
                            p.fire('load-perceived', i.response.body)
                    }
                p.fire('start'),
                    (i.timestamp = Date.now()),
                    (i.perceivedPerformanceUpdater = ys(
                        (f) => {
                            ;(i.perceivedProgress = f),
                                (i.perceivedDuration =
                                    Date.now() - i.timestamp),
                                m(),
                                i.response &&
                                    i.perceivedProgress === 1 &&
                                    !i.complete &&
                                    u()
                        },
                        a ? Pn(750, 1500) : 0
                    )),
                    (i.request = e(
                        c,
                        d,
                        (f) => {
                            ;(i.response = ce(f)
                                ? f
                                : {
                                      type: 'load',
                                      code: 200,
                                      body: `${f}`,
                                      headers: {},
                                  }),
                                (i.duration = Date.now() - i.timestamp),
                                (i.progress = 1),
                                p.fire('load', i.response.body),
                                (!a || (a && i.perceivedProgress === 1)) && u()
                        },
                        (f) => {
                            i.perceivedPerformanceUpdater.clear(),
                                p.fire(
                                    'error',
                                    ce(f)
                                        ? f
                                        : {
                                              type: 'error',
                                              code: 0,
                                              body: `${f}`,
                                          }
                                )
                        },
                        (f, h, g) => {
                            ;(i.duration = Date.now() - i.timestamp),
                                (i.progress = f ? h / g : null),
                                m()
                        },
                        () => {
                            i.perceivedPerformanceUpdater.clear(),
                                p.fire(
                                    'abort',
                                    i.response ? i.response.body : null
                                )
                        },
                        (f) => {
                            p.fire('transfer', f)
                        }
                    ))
            },
            o = () => {
                i.request &&
                    (i.perceivedPerformanceUpdater.clear(),
                    i.request.abort && i.request.abort(),
                    (i.complete = !0))
            },
            l = () => {
                o(),
                    (i.complete = !1),
                    (i.perceivedProgress = 0),
                    (i.progress = 0),
                    (i.timestamp = null),
                    (i.perceivedDuration = 0),
                    (i.duration = 0),
                    (i.request = null),
                    (i.response = null)
            },
            r = a
                ? () =>
                      i.progress
                          ? Math.min(i.progress, i.perceivedProgress)
                          : null
                : () => i.progress || null,
            s = a
                ? () => Math.min(i.duration, i.perceivedDuration)
                : () => i.duration,
            p = {
                ...pi(),
                process: n,
                abort: o,
                getProgress: r,
                getDuration: s,
                reset: l,
            }
        return p
    },
    Dn = (e) => e.substring(0, e.lastIndexOf('.')) || e,
    Rs = (e) => {
        let t = [e.name, e.size, e.type]
        return (
            e instanceof Blob || Di(e)
                ? (t[0] = e.name || An())
                : Di(e)
                  ? ((t[1] = e.length), (t[2] = On(e)))
                  : fe(e) &&
                    ((t[0] = Ft(e)),
                    (t[1] = 0),
                    (t[2] = 'application/octet-stream')),
            { name: t[0], size: t[1], type: t[2] }
        )
    },
    Je = (e) => !!(e instanceof File || (e instanceof Blob && e.name)),
    Fn = (e) => {
        if (!ce(e)) return e
        let t = si(e) ? [] : {}
        for (let i in e) {
            if (!e.hasOwnProperty(i)) continue
            let a = e[i]
            t[i] = a && ce(a) ? Fn(a) : a
        }
        return t
    },
    ws = (e = null, t = null, i = null) => {
        let a = Yi(),
            n = {
                archived: !1,
                frozen: !1,
                released: !1,
                source: null,
                file: i,
                serverFileReference: t,
                transferId: null,
                processingAborted: !1,
                status: t ? W.PROCESSING_COMPLETE : W.INIT,
                activeLoader: null,
                activeProcessor: null,
            },
            o = null,
            l = {},
            r = (x) => (n.status = x),
            s = (x, ..._) => {
                n.released || n.frozen || b.fire(x, ..._)
            },
            p = () => mi(n.file.name),
            c = () => n.file.type,
            d = () => n.file.size,
            m = () => n.file,
            u = (x, _, P) => {
                if (((n.source = x), b.fireSync('init'), n.file)) {
                    b.fireSync('load-skip')
                    return
                }
                ;(n.file = Rs(x)),
                    _.on('init', () => {
                        s('load-init')
                    }),
                    _.on('meta', (O) => {
                        ;(n.file.size = O.size),
                            (n.file.filename = O.filename),
                            O.source &&
                                ((e = re.LIMBO),
                                (n.serverFileReference = O.source),
                                (n.status = W.PROCESSING_COMPLETE)),
                            s('load-meta')
                    }),
                    _.on('progress', (O) => {
                        r(W.LOADING), s('load-progress', O)
                    }),
                    _.on('error', (O) => {
                        r(W.LOAD_ERROR), s('load-request-error', O)
                    }),
                    _.on('abort', () => {
                        r(W.INIT), s('load-abort')
                    }),
                    _.on('load', (O) => {
                        n.activeLoader = null
                        let M = (S) => {
                                ;(n.file = Je(S) ? S : n.file),
                                    e === re.LIMBO && n.serverFileReference
                                        ? r(W.PROCESSING_COMPLETE)
                                        : r(W.IDLE),
                                    s('load')
                            },
                            C = (S) => {
                                ;(n.file = O),
                                    s('load-meta'),
                                    r(W.LOAD_ERROR),
                                    s('load-file-error', S)
                            }
                        if (n.serverFileReference) {
                            M(O)
                            return
                        }
                        P(O, M, C)
                    }),
                    _.setSource(x),
                    (n.activeLoader = _),
                    _.load()
            },
            f = () => {
                n.activeLoader && n.activeLoader.load()
            },
            h = () => {
                if (n.activeLoader) {
                    n.activeLoader.abort()
                    return
                }
                r(W.INIT), s('load-abort')
            },
            g = (x, _) => {
                if (n.processingAborted) {
                    n.processingAborted = !1
                    return
                }
                if ((r(W.PROCESSING), (o = null), !(n.file instanceof Blob))) {
                    b.on('load', () => {
                        g(x, _)
                    })
                    return
                }
                x.on('load', (M) => {
                    ;(n.transferId = null), (n.serverFileReference = M)
                }),
                    x.on('transfer', (M) => {
                        n.transferId = M
                    }),
                    x.on('load-perceived', (M) => {
                        ;(n.activeProcessor = null),
                            (n.transferId = null),
                            (n.serverFileReference = M),
                            r(W.PROCESSING_COMPLETE),
                            s('process-complete', M)
                    }),
                    x.on('start', () => {
                        s('process-start')
                    }),
                    x.on('error', (M) => {
                        ;(n.activeProcessor = null),
                            r(W.PROCESSING_ERROR),
                            s('process-error', M)
                    }),
                    x.on('abort', (M) => {
                        ;(n.activeProcessor = null),
                            (n.serverFileReference = M),
                            r(W.IDLE),
                            s('process-abort'),
                            o && o()
                    }),
                    x.on('progress', (M) => {
                        s('process-progress', M)
                    })
                let P = (M) => {
                        n.archived || x.process(M, { ...l })
                    },
                    O = console.error
                _(n.file, P, O), (n.activeProcessor = x)
            },
            v = () => {
                ;(n.processingAborted = !1), r(W.PROCESSING_QUEUED)
            },
            E = () =>
                new Promise((x) => {
                    if (!n.activeProcessor) {
                        ;(n.processingAborted = !0),
                            r(W.IDLE),
                            s('process-abort'),
                            x()
                        return
                    }
                    ;(o = () => {
                        x()
                    }),
                        n.activeProcessor.abort()
                }),
            T = (x, _) =>
                new Promise((P, O) => {
                    let M =
                        n.serverFileReference !== null
                            ? n.serverFileReference
                            : n.transferId
                    if (M === null) {
                        P()
                        return
                    }
                    x(
                        M,
                        () => {
                            ;(n.serverFileReference = null),
                                (n.transferId = null),
                                P()
                        },
                        (C) => {
                            if (!_) {
                                P()
                                return
                            }
                            r(W.PROCESSING_REVERT_ERROR),
                                s('process-revert-error'),
                                O(C)
                        }
                    ),
                        r(W.IDLE),
                        s('process-revert')
                }),
            I = (x, _, P) => {
                let O = x.split('.'),
                    M = O[0],
                    C = O.pop(),
                    S = l
                O.forEach((F) => (S = S[F])),
                    JSON.stringify(S[C]) !== JSON.stringify(_) &&
                        ((S[C] = _),
                        s('metadata-update', {
                            key: M,
                            value: l[M],
                            silent: P,
                        }))
            },
            b = {
                id: { get: () => a },
                origin: { get: () => e, set: (x) => (e = x) },
                serverId: { get: () => n.serverFileReference },
                transferId: { get: () => n.transferId },
                status: { get: () => n.status },
                filename: { get: () => n.file.name },
                filenameWithoutExtension: { get: () => Dn(n.file.name) },
                fileExtension: { get: p },
                fileType: { get: c },
                fileSize: { get: d },
                file: { get: m },
                relativePath: { get: () => n.file._relativePath },
                source: { get: () => n.source },
                getMetadata: (x) => Fn(x ? l[x] : l),
                setMetadata: (x, _, P) => {
                    if (ce(x)) {
                        let O = x
                        return (
                            Object.keys(O).forEach((M) => {
                                I(M, O[M], _)
                            }),
                            x
                        )
                    }
                    return I(x, _, P), _
                },
                extend: (x, _) => (w[x] = _),
                abortLoad: h,
                retryLoad: f,
                requestProcessing: v,
                abortProcessing: E,
                load: u,
                process: g,
                revert: T,
                ...pi(),
                freeze: () => (n.frozen = !0),
                release: () => (n.released = !0),
                released: { get: () => n.released },
                archive: () => (n.archived = !0),
                archived: { get: () => n.archived },
                setFile: (x) => (n.file = x),
            },
            w = We(b)
        return w
    },
    Ss = (e, t) => (Be(t) ? 0 : fe(t) ? e.findIndex((i) => i.id === t) : -1),
    Ha = (e, t) => {
        let i = Ss(e, t)
        if (!(i < 0)) return e[i] || null
    },
    ja = (e, t, i, a, n, o) => {
        let l = Ze(null, e, { method: 'GET', responseType: 'blob' })
        return (
            (l.onload = (r) => {
                let s = r.getAllResponseHeaders(),
                    p = Xi(s).name || Ft(e)
                t(ie('load', r.status, ht(r.response, p), s))
            }),
            (l.onerror = (r) => {
                i(
                    ie(
                        'error',
                        r.status,
                        r.statusText,
                        r.getAllResponseHeaders()
                    )
                )
            }),
            (l.onheaders = (r) => {
                o(ie('headers', r.status, null, r.getAllResponseHeaders()))
            }),
            (l.ontimeout = Ke(i)),
            (l.onprogress = a),
            (l.onabort = n),
            l
        )
    },
    Ya = (e) => (
        e.indexOf('//') === 0 && (e = location.protocol + e),
        e
            .toLowerCase()
            .replace('blob:', '')
            .replace(/([a-z])?:\/\//, '$1')
            .split('/')[0]
    ),
    Ls = (e) =>
        (e.indexOf(':') > -1 || e.indexOf('//') > -1) &&
        Ya(location.href) !== Ya(e),
    Kt =
        (e) =>
        (...t) =>
            Xe(e) ? e(...t) : e,
    As = (e) => !Je(e.file),
    Si = (e, t) => {
        clearTimeout(t.listUpdateTimeout),
            (t.listUpdateTimeout = setTimeout(() => {
                e('DID_UPDATE_ITEMS', { items: Me(t.items) })
            }, 0))
    },
    qa = (e, ...t) =>
        new Promise((i) => {
            if (!e) return i(!0)
            let a = e(...t)
            if (a == null) return i(!0)
            if (typeof a == 'boolean') return i(a)
            typeof a.then == 'function' && a.then(i)
        }),
    Li = (e, t) => {
        e.items.sort((i, a) => t(ge(i), ge(a)))
    },
    ye =
        (e, t) =>
        ({
            query: i,
            success: a = () => {},
            failure: n = () => {},
            ...o
        } = {}) => {
            let l = Qe(e.items, i)
            if (!l) {
                n({ error: ie('error', 0, 'Item not found'), file: null })
                return
            }
            t(l, a, n, o || {})
        },
    Ms = (e, t, i) => ({
        ABORT_ALL: () => {
            Me(i.items).forEach((a) => {
                a.freeze(), a.abortLoad(), a.abortProcessing()
            })
        },
        DID_SET_FILES: ({ value: a = [] }) => {
            let n = a.map((l) => ({
                    source: l.source ? l.source : l,
                    options: l.options,
                })),
                o = Me(i.items)
            o.forEach((l) => {
                n.find((r) => r.source === l.source || r.source === l.file) ||
                    e('REMOVE_ITEM', { query: l, remove: !1 })
            }),
                (o = Me(i.items)),
                n.forEach((l, r) => {
                    o.find(
                        (s) => s.source === l.source || s.file === l.source
                    ) ||
                        e('ADD_ITEM', {
                            ...l,
                            interactionMethod: _e.NONE,
                            index: r,
                        })
                })
        },
        DID_UPDATE_ITEM_METADATA: ({ id: a, action: n, change: o }) => {
            o.silent ||
                (clearTimeout(i.itemUpdateTimeout),
                (i.itemUpdateTimeout = setTimeout(() => {
                    let l = Ha(i.items, a)
                    if (!t('IS_ASYNC')) {
                        Ae('SHOULD_PREPARE_OUTPUT', !1, {
                            item: l,
                            query: t,
                            action: n,
                            change: o,
                        }).then((c) => {
                            let d = t('GET_BEFORE_PREPARE_FILE')
                            d && (c = d(l, c)),
                                c &&
                                    e(
                                        'REQUEST_PREPARE_OUTPUT',
                                        {
                                            query: a,
                                            item: l,
                                            success: (m) => {
                                                e('DID_PREPARE_OUTPUT', {
                                                    id: a,
                                                    file: m,
                                                })
                                            },
                                        },
                                        !0
                                    )
                        })
                        return
                    }
                    l.origin === re.LOCAL &&
                        e('DID_LOAD_ITEM', {
                            id: l.id,
                            error: null,
                            serverFileReference: l.source,
                        })
                    let r = () => {
                            setTimeout(() => {
                                e('REQUEST_ITEM_PROCESSING', { query: a })
                            }, 32)
                        },
                        s = (c) => {
                            l.revert(
                                Mt(
                                    i.options.server.url,
                                    i.options.server.revert
                                ),
                                t('GET_FORCE_REVERT')
                            )
                                .then(c ? r : () => {})
                                .catch(() => {})
                        },
                        p = (c) => {
                            l.abortProcessing().then(c ? r : () => {})
                        }
                    if (l.status === W.PROCESSING_COMPLETE)
                        return s(i.options.instantUpload)
                    if (l.status === W.PROCESSING)
                        return p(i.options.instantUpload)
                    i.options.instantUpload && r()
                }, 0)))
        },
        MOVE_ITEM: ({ query: a, index: n }) => {
            let o = Qe(i.items, a)
            if (!o) return
            let l = i.items.indexOf(o)
            ;(n = Ln(n, 0, i.items.length - 1)),
                l !== n && i.items.splice(n, 0, i.items.splice(l, 1)[0])
        },
        SORT: ({ compare: a }) => {
            Li(i, a), e('DID_SORT_ITEMS', { items: t('GET_ACTIVE_ITEMS') })
        },
        ADD_ITEMS: ({
            items: a,
            index: n,
            interactionMethod: o,
            success: l = () => {},
            failure: r = () => {},
        }) => {
            let s = n
            if (n === -1 || typeof n > 'u') {
                let u = t('GET_ITEM_INSERT_LOCATION'),
                    f = t('GET_TOTAL_ITEMS')
                s = u === 'before' ? 0 : f
            }
            let p = t('GET_IGNORED_FILES'),
                c = (u) => (Je(u) ? !p.includes(u.name.toLowerCase()) : !Be(u)),
                m = a.filter(c).map(
                    (u) =>
                        new Promise((f, h) => {
                            e('ADD_ITEM', {
                                interactionMethod: o,
                                source: u.source || u,
                                success: f,
                                failure: h,
                                index: s++,
                                options: u.options || {},
                            })
                        })
                )
            Promise.all(m).then(l).catch(r)
        },
        ADD_ITEM: ({
            source: a,
            index: n = -1,
            interactionMethod: o,
            success: l = () => {},
            failure: r = () => {},
            options: s = {},
        }) => {
            if (Be(a)) {
                r({ error: ie('error', 0, 'No source'), file: null })
                return
            }
            if (Je(a) && i.options.ignoredFiles.includes(a.name.toLowerCase()))
                return
            if (!ls(i)) {
                if (
                    i.options.allowMultiple ||
                    (!i.options.allowMultiple && !i.options.allowReplace)
                ) {
                    let E = ie('warning', 0, 'Max files')
                    e('DID_THROW_MAX_FILES', { source: a, error: E }),
                        r({ error: E, file: null })
                    return
                }
                let v = Me(i.items)[0]
                if (
                    v.status === W.PROCESSING_COMPLETE ||
                    v.status === W.PROCESSING_REVERT_ERROR
                ) {
                    let E = t('GET_FORCE_REVERT')
                    if (
                        (v
                            .revert(
                                Mt(
                                    i.options.server.url,
                                    i.options.server.revert
                                ),
                                E
                            )
                            .then(() => {
                                E &&
                                    e('ADD_ITEM', {
                                        source: a,
                                        index: n,
                                        interactionMethod: o,
                                        success: l,
                                        failure: r,
                                        options: s,
                                    })
                            })
                            .catch(() => {}),
                        E)
                    )
                        return
                }
                e('REMOVE_ITEM', { query: v.id })
            }
            let p =
                    s.type === 'local'
                        ? re.LOCAL
                        : s.type === 'limbo'
                          ? re.LIMBO
                          : re.INPUT,
                c = ws(p, p === re.INPUT ? null : a, s.file)
            Object.keys(s.metadata || {}).forEach((v) => {
                c.setMetadata(v, s.metadata[v])
            }),
                tt('DID_CREATE_ITEM', c, { query: t, dispatch: e })
            let d = t('GET_ITEM_INSERT_LOCATION')
            i.options.itemInsertLocationFreedom ||
                (n = d === 'before' ? -1 : i.items.length),
                ss(i.items, c, n),
                Xe(d) && a && Li(i, d)
            let m = c.id
            c.on('init', () => {
                e('DID_INIT_ITEM', { id: m })
            }),
                c.on('load-init', () => {
                    e('DID_START_ITEM_LOAD', { id: m })
                }),
                c.on('load-meta', () => {
                    e('DID_UPDATE_ITEM_META', { id: m })
                }),
                c.on('load-progress', (v) => {
                    e('DID_UPDATE_ITEM_LOAD_PROGRESS', { id: m, progress: v })
                }),
                c.on('load-request-error', (v) => {
                    let E = Kt(i.options.labelFileLoadError)(v)
                    if (v.code >= 400 && v.code < 500) {
                        e('DID_THROW_ITEM_INVALID', {
                            id: m,
                            error: v,
                            status: { main: E, sub: `${v.code} (${v.body})` },
                        }),
                            r({ error: v, file: ge(c) })
                        return
                    }
                    e('DID_THROW_ITEM_LOAD_ERROR', {
                        id: m,
                        error: v,
                        status: { main: E, sub: i.options.labelTapToRetry },
                    })
                }),
                c.on('load-file-error', (v) => {
                    e('DID_THROW_ITEM_INVALID', {
                        id: m,
                        error: v.status,
                        status: v.status,
                    }),
                        r({ error: v.status, file: ge(c) })
                }),
                c.on('load-abort', () => {
                    e('REMOVE_ITEM', { query: m })
                }),
                c.on('load-skip', () => {
                    c.on('metadata-update', (v) => {
                        Je(c.file) &&
                            e('DID_UPDATE_ITEM_METADATA', { id: m, change: v })
                    }),
                        e('COMPLETE_LOAD_ITEM', {
                            query: m,
                            item: c,
                            data: { source: a, success: l },
                        })
                }),
                c.on('load', () => {
                    let v = (E) => {
                        if (!E) {
                            e('REMOVE_ITEM', { query: m })
                            return
                        }
                        c.on('metadata-update', (T) => {
                            e('DID_UPDATE_ITEM_METADATA', { id: m, change: T })
                        }),
                            Ae('SHOULD_PREPARE_OUTPUT', !1, {
                                item: c,
                                query: t,
                            }).then((T) => {
                                let I = t('GET_BEFORE_PREPARE_FILE')
                                I && (T = I(c, T))
                                let y = () => {
                                    e('COMPLETE_LOAD_ITEM', {
                                        query: m,
                                        item: c,
                                        data: { source: a, success: l },
                                    }),
                                        Si(e, i)
                                }
                                if (T) {
                                    e(
                                        'REQUEST_PREPARE_OUTPUT',
                                        {
                                            query: m,
                                            item: c,
                                            success: (b) => {
                                                e('DID_PREPARE_OUTPUT', {
                                                    id: m,
                                                    file: b,
                                                }),
                                                    y()
                                            },
                                        },
                                        !0
                                    )
                                    return
                                }
                                y()
                            })
                    }
                    Ae('DID_LOAD_ITEM', c, { query: t, dispatch: e })
                        .then(() => {
                            qa(t('GET_BEFORE_ADD_FILE'), ge(c)).then(v)
                        })
                        .catch((E) => {
                            if (!E || !E.error || !E.status) return v(!1)
                            e('DID_THROW_ITEM_INVALID', {
                                id: m,
                                error: E.error,
                                status: E.status,
                            })
                        })
                }),
                c.on('process-start', () => {
                    e('DID_START_ITEM_PROCESSING', { id: m })
                }),
                c.on('process-progress', (v) => {
                    e('DID_UPDATE_ITEM_PROCESS_PROGRESS', {
                        id: m,
                        progress: v,
                    })
                }),
                c.on('process-error', (v) => {
                    e('DID_THROW_ITEM_PROCESSING_ERROR', {
                        id: m,
                        error: v,
                        status: {
                            main: Kt(i.options.labelFileProcessingError)(v),
                            sub: i.options.labelTapToRetry,
                        },
                    })
                }),
                c.on('process-revert-error', (v) => {
                    e('DID_THROW_ITEM_PROCESSING_REVERT_ERROR', {
                        id: m,
                        error: v,
                        status: {
                            main: Kt(i.options.labelFileProcessingRevertError)(
                                v
                            ),
                            sub: i.options.labelTapToRetry,
                        },
                    })
                }),
                c.on('process-complete', (v) => {
                    e('DID_COMPLETE_ITEM_PROCESSING', {
                        id: m,
                        error: null,
                        serverFileReference: v,
                    }),
                        e('DID_DEFINE_VALUE', { id: m, value: v })
                }),
                c.on('process-abort', () => {
                    e('DID_ABORT_ITEM_PROCESSING', { id: m })
                }),
                c.on('process-revert', () => {
                    e('DID_REVERT_ITEM_PROCESSING', { id: m }),
                        e('DID_DEFINE_VALUE', { id: m, value: null })
                }),
                e('DID_ADD_ITEM', { id: m, index: n, interactionMethod: o }),
                Si(e, i)
            let {
                url: u,
                load: f,
                restore: h,
                fetch: g,
            } = i.options.server || {}
            c.load(
                a,
                Ts(
                    p === re.INPUT
                        ? fe(a) && Ls(a) && g
                            ? wi(u, g)
                            : ja
                        : p === re.LIMBO
                          ? wi(u, h)
                          : wi(u, f)
                ),
                (v, E, T) => {
                    Ae('LOAD_FILE', v, { query: t }).then(E).catch(T)
                }
            )
        },
        REQUEST_PREPARE_OUTPUT: ({
            item: a,
            success: n,
            failure: o = () => {},
        }) => {
            let l = { error: ie('error', 0, 'Item not found'), file: null }
            if (a.archived) return o(l)
            Ae('PREPARE_OUTPUT', a.file, { query: t, item: a }).then((r) => {
                Ae('COMPLETE_PREPARE_OUTPUT', r, { query: t, item: a }).then(
                    (s) => {
                        if (a.archived) return o(l)
                        n(s)
                    }
                )
            })
        },
        COMPLETE_LOAD_ITEM: ({ item: a, data: n }) => {
            let { success: o, source: l } = n,
                r = t('GET_ITEM_INSERT_LOCATION')
            if (
                (Xe(r) && l && Li(i, r),
                e('DID_LOAD_ITEM', {
                    id: a.id,
                    error: null,
                    serverFileReference: a.origin === re.INPUT ? null : l,
                }),
                o(ge(a)),
                a.origin === re.LOCAL)
            ) {
                e('DID_LOAD_LOCAL_ITEM', { id: a.id })
                return
            }
            if (a.origin === re.LIMBO) {
                e('DID_COMPLETE_ITEM_PROCESSING', {
                    id: a.id,
                    error: null,
                    serverFileReference: l,
                }),
                    e('DID_DEFINE_VALUE', { id: a.id, value: a.serverId || l })
                return
            }
            t('IS_ASYNC') &&
                i.options.instantUpload &&
                e('REQUEST_ITEM_PROCESSING', { query: a.id })
        },
        RETRY_ITEM_LOAD: ye(i, (a) => {
            a.retryLoad()
        }),
        REQUEST_ITEM_PREPARE: ye(i, (a, n, o) => {
            e(
                'REQUEST_PREPARE_OUTPUT',
                {
                    query: a.id,
                    item: a,
                    success: (l) => {
                        e('DID_PREPARE_OUTPUT', { id: a.id, file: l }),
                            n({ file: a, output: l })
                    },
                    failure: o,
                },
                !0
            )
        }),
        REQUEST_ITEM_PROCESSING: ye(i, (a, n, o) => {
            if (!(a.status === W.IDLE || a.status === W.PROCESSING_ERROR)) {
                let r = () =>
                        e('REQUEST_ITEM_PROCESSING', {
                            query: a,
                            success: n,
                            failure: o,
                        }),
                    s = () => (document.hidden ? r() : setTimeout(r, 32))
                a.status === W.PROCESSING_COMPLETE ||
                a.status === W.PROCESSING_REVERT_ERROR
                    ? a
                          .revert(
                              Mt(i.options.server.url, i.options.server.revert),
                              t('GET_FORCE_REVERT')
                          )
                          .then(s)
                          .catch(() => {})
                    : a.status === W.PROCESSING && a.abortProcessing().then(s)
                return
            }
            a.status !== W.PROCESSING_QUEUED &&
                (a.requestProcessing(),
                e('DID_REQUEST_ITEM_PROCESSING', { id: a.id }),
                e('PROCESS_ITEM', { query: a, success: n, failure: o }, !0))
        }),
        PROCESS_ITEM: ye(i, (a, n, o) => {
            let l = t('GET_MAX_PARALLEL_UPLOADS')
            if (t('GET_ITEMS_BY_STATUS', W.PROCESSING).length === l) {
                i.processingQueue.push({ id: a.id, success: n, failure: o })
                return
            }
            if (a.status === W.PROCESSING) return
            let s = () => {
                let c = i.processingQueue.shift()
                if (!c) return
                let { id: d, success: m, failure: u } = c,
                    f = Qe(i.items, d)
                if (!f || f.archived) {
                    s()
                    return
                }
                e('PROCESS_ITEM', { query: d, success: m, failure: u }, !0)
            }
            a.onOnce('process-complete', () => {
                n(ge(a)), s()
                let c = i.options.server
                if (
                    i.options.instantUpload &&
                    a.origin === re.LOCAL &&
                    Xe(c.remove)
                ) {
                    let u = () => {}
                    ;(a.origin = re.LIMBO),
                        i.options.server.remove(a.source, u, u)
                }
                t('GET_ITEMS_BY_STATUS', W.PROCESSING_COMPLETE).length ===
                    i.items.length && e('DID_COMPLETE_ITEM_PROCESSING_ALL')
            }),
                a.onOnce('process-error', (c) => {
                    o({ error: c, file: ge(a) }), s()
                })
            let p = i.options
            a.process(
                _s(
                    xs(p.server.url, p.server.process, p.name, {
                        chunkTransferId: a.transferId,
                        chunkServer: p.server.patch,
                        chunkUploads: p.chunkUploads,
                        chunkForce: p.chunkForce,
                        chunkSize: p.chunkSize,
                        chunkRetryDelays: p.chunkRetryDelays,
                    }),
                    {
                        allowMinimumUploadDuration: t(
                            'GET_ALLOW_MINIMUM_UPLOAD_DURATION'
                        ),
                    }
                ),
                (c, d, m) => {
                    Ae('PREPARE_OUTPUT', c, { query: t, item: a })
                        .then((u) => {
                            e('DID_PREPARE_OUTPUT', { id: a.id, file: u }), d(u)
                        })
                        .catch(m)
                }
            )
        }),
        RETRY_ITEM_PROCESSING: ye(i, (a) => {
            e('REQUEST_ITEM_PROCESSING', { query: a })
        }),
        REQUEST_REMOVE_ITEM: ye(i, (a) => {
            qa(t('GET_BEFORE_REMOVE_FILE'), ge(a)).then((n) => {
                n && e('REMOVE_ITEM', { query: a })
            })
        }),
        RELEASE_ITEM: ye(i, (a) => {
            a.release()
        }),
        REMOVE_ITEM: ye(i, (a, n, o, l) => {
            let r = () => {
                    let p = a.id
                    Ha(i.items, p).archive(),
                        e('DID_REMOVE_ITEM', { error: null, id: p, item: a }),
                        Si(e, i),
                        n(ge(a))
                },
                s = i.options.server
            a.origin === re.LOCAL && s && Xe(s.remove) && l.remove !== !1
                ? (e('DID_START_ITEM_REMOVE', { id: a.id }),
                  s.remove(
                      a.source,
                      () => r(),
                      (p) => {
                          e('DID_THROW_ITEM_REMOVE_ERROR', {
                              id: a.id,
                              error: ie('error', 0, p, null),
                              status: {
                                  main: Kt(i.options.labelFileRemoveError)(p),
                                  sub: i.options.labelTapToRetry,
                              },
                          })
                      }
                  ))
                : (((l.revert &&
                      a.origin !== re.LOCAL &&
                      a.serverId !== null) ||
                      (i.options.chunkUploads &&
                          a.file.size > i.options.chunkSize) ||
                      (i.options.chunkUploads && i.options.chunkForce)) &&
                      a.revert(
                          Mt(i.options.server.url, i.options.server.revert),
                          t('GET_FORCE_REVERT')
                      ),
                  r())
        }),
        ABORT_ITEM_LOAD: ye(i, (a) => {
            a.abortLoad()
        }),
        ABORT_ITEM_PROCESSING: ye(i, (a) => {
            if (a.serverId) {
                e('REVERT_ITEM_PROCESSING', { id: a.id })
                return
            }
            a.abortProcessing().then(() => {
                i.options.instantUpload && e('REMOVE_ITEM', { query: a.id })
            })
        }),
        REQUEST_REVERT_ITEM_PROCESSING: ye(i, (a) => {
            if (!i.options.instantUpload) {
                e('REVERT_ITEM_PROCESSING', { query: a })
                return
            }
            let n = (r) => {
                    r && e('REVERT_ITEM_PROCESSING', { query: a })
                },
                o = t('GET_BEFORE_REMOVE_FILE')
            if (!o) return n(!0)
            let l = o(ge(a))
            if (l == null) return n(!0)
            if (typeof l == 'boolean') return n(l)
            typeof l.then == 'function' && l.then(n)
        }),
        REVERT_ITEM_PROCESSING: ye(i, (a) => {
            a.revert(
                Mt(i.options.server.url, i.options.server.revert),
                t('GET_FORCE_REVERT')
            )
                .then(() => {
                    ;(i.options.instantUpload || As(a)) &&
                        e('REMOVE_ITEM', { query: a.id })
                })
                .catch(() => {})
        }),
        SET_OPTIONS: ({ options: a }) => {
            let n = Object.keys(a),
                o = Os.filter((r) => n.includes(r))
            ;[...o, ...Object.keys(a).filter((r) => !o.includes(r))].forEach(
                (r) => {
                    e(`SET_${di(r, '_').toUpperCase()}`, { value: a[r] })
                }
            )
        },
    }),
    Os = ['server'],
    Qi = (e) => e,
    ke = (e) => document.createElement(e),
    ae = (e, t) => {
        let i = e.childNodes[0]
        i
            ? t !== i.nodeValue && (i.nodeValue = t)
            : ((i = document.createTextNode(t)), e.appendChild(i))
    },
    $a = (e, t, i, a) => {
        let n = (((a % 360) - 90) * Math.PI) / 180
        return { x: e + i * Math.cos(n), y: t + i * Math.sin(n) }
    },
    Ps = (e, t, i, a, n, o) => {
        let l = $a(e, t, i, n),
            r = $a(e, t, i, a)
        return ['M', l.x, l.y, 'A', i, i, 0, o, 0, r.x, r.y].join(' ')
    },
    Ds = (e, t, i, a, n) => {
        let o = 1
        return (
            n > a && n - a <= 0.5 && (o = 0),
            a > n && a - n >= 0.5 && (o = 0),
            Ps(e, t, i, Math.min(0.9999, a) * 360, Math.min(0.9999, n) * 360, o)
        )
    },
    Fs = ({ root: e, props: t }) => {
        ;(t.spin = !1), (t.progress = 0), (t.opacity = 0)
        let i = ni('svg')
        ;(e.ref.path = ni('path', {
            'stroke-width': 2,
            'stroke-linecap': 'round',
        })),
            i.appendChild(e.ref.path),
            (e.ref.svg = i),
            e.appendChild(i)
    },
    zs = ({ root: e, props: t }) => {
        if (t.opacity === 0) return
        t.align && (e.element.dataset.align = t.align)
        let i = parseInt(se(e.ref.path, 'stroke-width'), 10),
            a = e.rect.element.width * 0.5,
            n = 0,
            o = 0
        t.spin ? ((n = 0), (o = 0.5)) : ((n = 0), (o = t.progress))
        let l = Ds(a, a, a - i, n, o)
        se(e.ref.path, 'd', l),
            se(e.ref.path, 'stroke-opacity', t.spin || t.progress > 0 ? 1 : 0)
    },
    Xa = ne({
        tag: 'div',
        name: 'progress-indicator',
        ignoreRectUpdate: !0,
        ignoreRect: !0,
        create: Fs,
        write: zs,
        mixins: {
            apis: ['progress', 'spin', 'align'],
            styles: ['opacity'],
            animations: {
                opacity: { type: 'tween', duration: 500 },
                progress: {
                    type: 'spring',
                    stiffness: 0.95,
                    damping: 0.65,
                    mass: 10,
                },
            },
        },
    }),
    Cs = ({ root: e, props: t }) => {
        ;(e.element.innerHTML = (t.icon || '') + `<span>${t.label}</span>`),
            (t.isDisabled = !1)
    },
    Ns = ({ root: e, props: t }) => {
        let { isDisabled: i } = t,
            a = e.query('GET_DISABLED') || t.opacity === 0
        a && !i
            ? ((t.isDisabled = !0), se(e.element, 'disabled', 'disabled'))
            : !a &&
              i &&
              ((t.isDisabled = !1), e.element.removeAttribute('disabled'))
    },
    zn = ne({
        tag: 'button',
        attributes: { type: 'button' },
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        name: 'file-action-button',
        mixins: {
            apis: ['label'],
            styles: ['translateX', 'translateY', 'scaleX', 'scaleY', 'opacity'],
            animations: {
                scaleX: 'spring',
                scaleY: 'spring',
                translateX: 'spring',
                translateY: 'spring',
                opacity: { type: 'tween', duration: 250 },
            },
            listeners: !0,
        },
        create: Cs,
        write: Ns,
    }),
    Cn = (e, t = '.', i = 1e3, a = {}) => {
        let {
            labelBytes: n = 'bytes',
            labelKilobytes: o = 'KB',
            labelMegabytes: l = 'MB',
            labelGigabytes: r = 'GB',
        } = a
        e = Math.round(Math.abs(e))
        let s = i,
            p = i * i,
            c = i * i * i
        return e < s
            ? `${e} ${n}`
            : e < p
              ? `${Math.floor(e / s)} ${o}`
              : e < c
                ? `${Qa(e / p, 1, t)} ${l}`
                : `${Qa(e / c, 2, t)} ${r}`
    },
    Qa = (e, t, i) =>
        e
            .toFixed(t)
            .split('.')
            .filter((a) => a !== '0')
            .join(i),
    Bs = ({ root: e, props: t }) => {
        let i = ke('span')
        ;(i.className = 'filepond--file-info-main'),
            se(i, 'aria-hidden', 'true'),
            e.appendChild(i),
            (e.ref.fileName = i)
        let a = ke('span')
        ;(a.className = 'filepond--file-info-sub'),
            e.appendChild(a),
            (e.ref.fileSize = a),
            ae(a, e.query('GET_LABEL_FILE_WAITING_FOR_SIZE')),
            ae(i, Qi(e.query('GET_ITEM_NAME', t.id)))
    },
    Fi = ({ root: e, props: t }) => {
        ae(
            e.ref.fileSize,
            Cn(
                e.query('GET_ITEM_SIZE', t.id),
                '.',
                e.query('GET_FILE_SIZE_BASE'),
                e.query('GET_FILE_SIZE_LABELS', e.query)
            )
        ),
            ae(e.ref.fileName, Qi(e.query('GET_ITEM_NAME', t.id)))
    },
    Za = ({ root: e, props: t }) => {
        if (gt(e.query('GET_ITEM_SIZE', t.id))) {
            Fi({ root: e, props: t })
            return
        }
        ae(e.ref.fileSize, e.query('GET_LABEL_FILE_SIZE_NOT_AVAILABLE'))
    },
    ks = ne({
        name: 'file-info',
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: he({
            DID_LOAD_ITEM: Fi,
            DID_UPDATE_ITEM_META: Fi,
            DID_THROW_ITEM_LOAD_ERROR: Za,
            DID_THROW_ITEM_INVALID: Za,
        }),
        didCreateView: (e) => {
            tt('CREATE_VIEW', { ...e, view: e })
        },
        create: Bs,
        mixins: {
            styles: ['translateX', 'translateY'],
            animations: { translateX: 'spring', translateY: 'spring' },
        },
    }),
    Nn = (e) => Math.round(e * 100),
    Vs = ({ root: e }) => {
        let t = ke('span')
        ;(t.className = 'filepond--file-status-main'),
            e.appendChild(t),
            (e.ref.main = t)
        let i = ke('span')
        ;(i.className = 'filepond--file-status-sub'),
            e.appendChild(i),
            (e.ref.sub = i),
            Bn({ root: e, action: { progress: null } })
    },
    Bn = ({ root: e, action: t }) => {
        let i =
            t.progress === null
                ? e.query('GET_LABEL_FILE_LOADING')
                : `${e.query('GET_LABEL_FILE_LOADING')} ${Nn(t.progress)}%`
        ae(e.ref.main, i), ae(e.ref.sub, e.query('GET_LABEL_TAP_TO_CANCEL'))
    },
    Gs = ({ root: e, action: t }) => {
        let i =
            t.progress === null
                ? e.query('GET_LABEL_FILE_PROCESSING')
                : `${e.query('GET_LABEL_FILE_PROCESSING')} ${Nn(t.progress)}%`
        ae(e.ref.main, i), ae(e.ref.sub, e.query('GET_LABEL_TAP_TO_CANCEL'))
    },
    Us = ({ root: e }) => {
        ae(e.ref.main, e.query('GET_LABEL_FILE_PROCESSING')),
            ae(e.ref.sub, e.query('GET_LABEL_TAP_TO_CANCEL'))
    },
    Ws = ({ root: e }) => {
        ae(e.ref.main, e.query('GET_LABEL_FILE_PROCESSING_ABORTED')),
            ae(e.ref.sub, e.query('GET_LABEL_TAP_TO_RETRY'))
    },
    Hs = ({ root: e }) => {
        ae(e.ref.main, e.query('GET_LABEL_FILE_PROCESSING_COMPLETE')),
            ae(e.ref.sub, e.query('GET_LABEL_TAP_TO_UNDO'))
    },
    Ka = ({ root: e }) => {
        ae(e.ref.main, ''), ae(e.ref.sub, '')
    },
    Ot = ({ root: e, action: t }) => {
        ae(e.ref.main, t.status.main), ae(e.ref.sub, t.status.sub)
    },
    js = ne({
        name: 'file-status',
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: he({
            DID_LOAD_ITEM: Ka,
            DID_REVERT_ITEM_PROCESSING: Ka,
            DID_REQUEST_ITEM_PROCESSING: Us,
            DID_ABORT_ITEM_PROCESSING: Ws,
            DID_COMPLETE_ITEM_PROCESSING: Hs,
            DID_UPDATE_ITEM_PROCESS_PROGRESS: Gs,
            DID_UPDATE_ITEM_LOAD_PROGRESS: Bn,
            DID_THROW_ITEM_LOAD_ERROR: Ot,
            DID_THROW_ITEM_INVALID: Ot,
            DID_THROW_ITEM_PROCESSING_ERROR: Ot,
            DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Ot,
            DID_THROW_ITEM_REMOVE_ERROR: Ot,
        }),
        didCreateView: (e) => {
            tt('CREATE_VIEW', { ...e, view: e })
        },
        create: Vs,
        mixins: {
            styles: ['translateX', 'translateY', 'opacity'],
            animations: {
                opacity: { type: 'tween', duration: 250 },
                translateX: 'spring',
                translateY: 'spring',
            },
        },
    }),
    zi = {
        AbortItemLoad: {
            label: 'GET_LABEL_BUTTON_ABORT_ITEM_LOAD',
            action: 'ABORT_ITEM_LOAD',
            className: 'filepond--action-abort-item-load',
            align: 'LOAD_INDICATOR_POSITION',
        },
        RetryItemLoad: {
            label: 'GET_LABEL_BUTTON_RETRY_ITEM_LOAD',
            action: 'RETRY_ITEM_LOAD',
            icon: 'GET_ICON_RETRY',
            className: 'filepond--action-retry-item-load',
            align: 'BUTTON_PROCESS_ITEM_POSITION',
        },
        RemoveItem: {
            label: 'GET_LABEL_BUTTON_REMOVE_ITEM',
            action: 'REQUEST_REMOVE_ITEM',
            icon: 'GET_ICON_REMOVE',
            className: 'filepond--action-remove-item',
            align: 'BUTTON_REMOVE_ITEM_POSITION',
        },
        ProcessItem: {
            label: 'GET_LABEL_BUTTON_PROCESS_ITEM',
            action: 'REQUEST_ITEM_PROCESSING',
            icon: 'GET_ICON_PROCESS',
            className: 'filepond--action-process-item',
            align: 'BUTTON_PROCESS_ITEM_POSITION',
        },
        AbortItemProcessing: {
            label: 'GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING',
            action: 'ABORT_ITEM_PROCESSING',
            className: 'filepond--action-abort-item-processing',
            align: 'BUTTON_PROCESS_ITEM_POSITION',
        },
        RetryItemProcessing: {
            label: 'GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING',
            action: 'RETRY_ITEM_PROCESSING',
            icon: 'GET_ICON_RETRY',
            className: 'filepond--action-retry-item-processing',
            align: 'BUTTON_PROCESS_ITEM_POSITION',
        },
        RevertItemProcessing: {
            label: 'GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING',
            action: 'REQUEST_REVERT_ITEM_PROCESSING',
            icon: 'GET_ICON_UNDO',
            className: 'filepond--action-revert-item-processing',
            align: 'BUTTON_PROCESS_ITEM_POSITION',
        },
    },
    Ci = []
te(zi, (e) => {
    Ci.push(e)
})
var ve = (e) => {
        if (Ni(e) === 'right') return 0
        let t = e.ref.buttonRemoveItem.rect.element
        return t.hidden ? null : t.width + t.left
    },
    Ys = (e) => e.ref.buttonAbortItemLoad.rect.element.width,
    Jt = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4),
    qs = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2),
    $s = (e) => e.query('GET_STYLE_LOAD_INDICATOR_POSITION'),
    Xs = (e) => e.query('GET_STYLE_PROGRESS_INDICATOR_POSITION'),
    Ni = (e) => e.query('GET_STYLE_BUTTON_REMOVE_ITEM_POSITION'),
    Qs = {
        buttonAbortItemLoad: { opacity: 0 },
        buttonRetryItemLoad: { opacity: 0 },
        buttonRemoveItem: { opacity: 0 },
        buttonProcessItem: { opacity: 0 },
        buttonAbortItemProcessing: { opacity: 0 },
        buttonRetryItemProcessing: { opacity: 0 },
        buttonRevertItemProcessing: { opacity: 0 },
        loadProgressIndicator: { opacity: 0, align: $s },
        processProgressIndicator: { opacity: 0, align: Xs },
        processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
        info: { translateX: 0, translateY: 0, opacity: 0 },
        status: { translateX: 0, translateY: 0, opacity: 0 },
    },
    Ja = {
        buttonRemoveItem: { opacity: 1 },
        buttonProcessItem: { opacity: 1 },
        info: { translateX: ve },
        status: { translateX: ve },
    },
    Ai = {
        buttonAbortItemProcessing: { opacity: 1 },
        processProgressIndicator: { opacity: 1 },
        status: { opacity: 1 },
    },
    pt = {
        DID_THROW_ITEM_INVALID: {
            buttonRemoveItem: { opacity: 1 },
            info: { translateX: ve },
            status: { translateX: ve, opacity: 1 },
        },
        DID_START_ITEM_LOAD: {
            buttonAbortItemLoad: { opacity: 1 },
            loadProgressIndicator: { opacity: 1 },
            status: { opacity: 1 },
        },
        DID_THROW_ITEM_LOAD_ERROR: {
            buttonRetryItemLoad: { opacity: 1 },
            buttonRemoveItem: { opacity: 1 },
            info: { translateX: ve },
            status: { opacity: 1 },
        },
        DID_START_ITEM_REMOVE: {
            processProgressIndicator: { opacity: 1, align: Ni },
            info: { translateX: ve },
            status: { opacity: 0 },
        },
        DID_THROW_ITEM_REMOVE_ERROR: {
            processProgressIndicator: { opacity: 0, align: Ni },
            buttonRemoveItem: { opacity: 1 },
            info: { translateX: ve },
            status: { opacity: 1, translateX: ve },
        },
        DID_LOAD_ITEM: Ja,
        DID_LOAD_LOCAL_ITEM: {
            buttonRemoveItem: { opacity: 1 },
            info: { translateX: ve },
            status: { translateX: ve },
        },
        DID_START_ITEM_PROCESSING: Ai,
        DID_REQUEST_ITEM_PROCESSING: Ai,
        DID_UPDATE_ITEM_PROCESS_PROGRESS: Ai,
        DID_COMPLETE_ITEM_PROCESSING: {
            buttonRevertItemProcessing: { opacity: 1 },
            info: { opacity: 1 },
            status: { opacity: 1 },
        },
        DID_THROW_ITEM_PROCESSING_ERROR: {
            buttonRemoveItem: { opacity: 1 },
            buttonRetryItemProcessing: { opacity: 1 },
            status: { opacity: 1 },
            info: { translateX: ve },
        },
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
            buttonRevertItemProcessing: { opacity: 1 },
            status: { opacity: 1 },
            info: { opacity: 1 },
        },
        DID_ABORT_ITEM_PROCESSING: {
            buttonRemoveItem: { opacity: 1 },
            buttonProcessItem: { opacity: 1 },
            info: { translateX: ve },
            status: { opacity: 1 },
        },
        DID_REVERT_ITEM_PROCESSING: Ja,
    },
    Zs = ne({
        create: ({ root: e }) => {
            e.element.innerHTML = e.query('GET_ICON_DONE')
        },
        name: 'processing-complete-indicator',
        ignoreRect: !0,
        mixins: {
            styles: ['scaleX', 'scaleY', 'opacity'],
            animations: {
                scaleX: 'spring',
                scaleY: 'spring',
                opacity: { type: 'tween', duration: 250 },
            },
        },
    }),
    Ks = ({ root: e, props: t }) => {
        let i = Object.keys(zi).reduce(
                (f, h) => ((f[h] = { ...zi[h] }), f),
                {}
            ),
            { id: a } = t,
            n = e.query('GET_ALLOW_REVERT'),
            o = e.query('GET_ALLOW_REMOVE'),
            l = e.query('GET_ALLOW_PROCESS'),
            r = e.query('GET_INSTANT_UPLOAD'),
            s = e.query('IS_ASYNC'),
            p = e.query('GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN'),
            c
        s
            ? l && !n
                ? (c = (f) => !/RevertItemProcessing/.test(f))
                : !l && n
                  ? (c = (f) =>
                        !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
                            f
                        ))
                  : !l && !n && (c = (f) => !/Process/.test(f))
            : (c = (f) => !/Process/.test(f))
        let d = c ? Ci.filter(c) : Ci.concat()
        if (
            (r &&
                n &&
                ((i.RevertItemProcessing.label =
                    'GET_LABEL_BUTTON_REMOVE_ITEM'),
                (i.RevertItemProcessing.icon = 'GET_ICON_REMOVE')),
            s && !n)
        ) {
            let f = pt.DID_COMPLETE_ITEM_PROCESSING
            ;(f.info.translateX = qs),
                (f.info.translateY = Jt),
                (f.status.translateY = Jt),
                (f.processingCompleteIndicator = {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                })
        }
        if (
            (s &&
                !l &&
                ([
                    'DID_START_ITEM_PROCESSING',
                    'DID_REQUEST_ITEM_PROCESSING',
                    'DID_UPDATE_ITEM_PROCESS_PROGRESS',
                    'DID_THROW_ITEM_PROCESSING_ERROR',
                ].forEach((f) => {
                    pt[f].status.translateY = Jt
                }),
                (pt.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Ys)),
            p && n)
        ) {
            i.RevertItemProcessing.align = 'BUTTON_REMOVE_ITEM_POSITION'
            let f = pt.DID_COMPLETE_ITEM_PROCESSING
            ;(f.info.translateX = ve),
                (f.status.translateY = Jt),
                (f.processingCompleteIndicator = {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                })
        }
        o || (i.RemoveItem.disabled = !0),
            te(i, (f, h) => {
                let g = e.createChildView(zn, {
                    label: e.query(h.label),
                    icon: e.query(h.icon),
                    opacity: 0,
                })
                d.includes(f) && e.appendChildView(g),
                    h.disabled &&
                        (g.element.setAttribute('disabled', 'disabled'),
                        g.element.setAttribute('hidden', 'hidden')),
                    (g.element.dataset.align = e.query(`GET_STYLE_${h.align}`)),
                    g.element.classList.add(h.className),
                    g.on('click', (v) => {
                        v.stopPropagation(),
                            !h.disabled && e.dispatch(h.action, { query: a })
                    }),
                    (e.ref[`button${f}`] = g)
            }),
            (e.ref.processingCompleteIndicator = e.appendChildView(
                e.createChildView(Zs)
            )),
            (e.ref.processingCompleteIndicator.element.dataset.align = e.query(
                'GET_STYLE_BUTTON_PROCESS_ITEM_POSITION'
            )),
            (e.ref.info = e.appendChildView(e.createChildView(ks, { id: a }))),
            (e.ref.status = e.appendChildView(e.createChildView(js, { id: a })))
        let m = e.appendChildView(
            e.createChildView(Xa, {
                opacity: 0,
                align: e.query('GET_STYLE_LOAD_INDICATOR_POSITION'),
            })
        )
        m.element.classList.add('filepond--load-indicator'),
            (e.ref.loadProgressIndicator = m)
        let u = e.appendChildView(
            e.createChildView(Xa, {
                opacity: 0,
                align: e.query('GET_STYLE_PROGRESS_INDICATOR_POSITION'),
            })
        )
        u.element.classList.add('filepond--process-indicator'),
            (e.ref.processProgressIndicator = u),
            (e.ref.activeStyles = [])
    },
    Js = ({ root: e, actions: t, props: i }) => {
        ec({ root: e, actions: t, props: i })
        let a = t
            .concat()
            .filter((n) => /^DID_/.test(n.type))
            .reverse()
            .find((n) => pt[n.type])
        if (a) {
            e.ref.activeStyles = []
            let n = pt[a.type]
            te(Qs, (o, l) => {
                let r = e.ref[o]
                te(l, (s, p) => {
                    let c = n[o] && typeof n[o][s] < 'u' ? n[o][s] : p
                    e.ref.activeStyles.push({ control: r, key: s, value: c })
                })
            })
        }
        e.ref.activeStyles.forEach(({ control: n, key: o, value: l }) => {
            n[o] = typeof l == 'function' ? l(e) : l
        })
    },
    ec = he({
        DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({
            root: e,
            action: t,
        }) => {
            e.ref.buttonAbortItemProcessing.label = t.value
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
            e.ref.buttonAbortItemLoad.label = t.value
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
            e.ref.buttonAbortItemRemoval.label = t.value
        },
        DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
            ;(e.ref.processProgressIndicator.spin = !0),
                (e.ref.processProgressIndicator.progress = 0)
        },
        DID_START_ITEM_LOAD: ({ root: e }) => {
            ;(e.ref.loadProgressIndicator.spin = !0),
                (e.ref.loadProgressIndicator.progress = 0)
        },
        DID_START_ITEM_REMOVE: ({ root: e }) => {
            ;(e.ref.processProgressIndicator.spin = !0),
                (e.ref.processProgressIndicator.progress = 0)
        },
        DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
            ;(e.ref.loadProgressIndicator.spin = !1),
                (e.ref.loadProgressIndicator.progress = t.progress)
        },
        DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
            ;(e.ref.processProgressIndicator.spin = !1),
                (e.ref.processProgressIndicator.progress = t.progress)
        },
    }),
    tc = ne({
        create: Ks,
        write: Js,
        didCreateView: (e) => {
            tt('CREATE_VIEW', { ...e, view: e })
        },
        name: 'file',
    }),
    ic = ({ root: e, props: t }) => {
        ;(e.ref.fileName = ke('legend')),
            e.appendChild(e.ref.fileName),
            (e.ref.file = e.appendChildView(
                e.createChildView(tc, { id: t.id })
            )),
            (e.ref.data = !1)
    },
    ac = ({ root: e, props: t }) => {
        ae(e.ref.fileName, Qi(e.query('GET_ITEM_NAME', t.id)))
    },
    nc = ne({
        create: ic,
        ignoreRect: !0,
        write: he({ DID_LOAD_ITEM: ac }),
        didCreateView: (e) => {
            tt('CREATE_VIEW', { ...e, view: e })
        },
        tag: 'fieldset',
        name: 'file-wrapper',
    }),
    en = { type: 'spring', damping: 0.6, mass: 7 },
    oc = ({ root: e, props: t }) => {
        ;[
            { name: 'top' },
            {
                name: 'center',
                props: { translateY: null, scaleY: null },
                mixins: {
                    animations: { scaleY: en },
                    styles: ['translateY', 'scaleY'],
                },
            },
            {
                name: 'bottom',
                props: { translateY: null },
                mixins: {
                    animations: { translateY: en },
                    styles: ['translateY'],
                },
            },
        ].forEach((i) => {
            lc(e, i, t.name)
        }),
            e.element.classList.add(`filepond--${t.name}`),
            (e.ref.scalable = null)
    },
    lc = (e, t, i) => {
        let a = ne({
                name: `panel-${t.name} filepond--${i}`,
                mixins: t.mixins,
                ignoreRectUpdate: !0,
            }),
            n = e.createChildView(a, t.props)
        e.ref[t.name] = e.appendChildView(n)
    },
    rc = ({ root: e, props: t }) => {
        if (
            ((e.ref.scalable === null || t.scalable !== e.ref.scalable) &&
                ((e.ref.scalable = Tn(t.scalable) ? t.scalable : !0),
                (e.element.dataset.scalable = e.ref.scalable)),
            !t.height)
        )
            return
        let i = e.ref.top.rect.element,
            a = e.ref.bottom.rect.element,
            n = Math.max(i.height + a.height, t.height)
        ;(e.ref.center.translateY = i.height),
            (e.ref.center.scaleY = (n - i.height - a.height) / 100),
            (e.ref.bottom.translateY = n - a.height)
    },
    kn = ne({
        name: 'panel',
        read: ({ root: e, props: t }) =>
            (t.heightCurrent = e.ref.bottom.translateY),
        write: rc,
        create: oc,
        ignoreRect: !0,
        mixins: { apis: ['height', 'heightCurrent', 'scalable'] },
    }),
    sc = (e) => {
        let t = e.map((a) => a.id),
            i
        return {
            setIndex: (a) => {
                i = a
            },
            getIndex: () => i,
            getItemIndex: (a) => t.indexOf(a.id),
        }
    },
    tn = { type: 'spring', stiffness: 0.75, damping: 0.45, mass: 10 },
    an = 'spring',
    nn = {
        DID_START_ITEM_LOAD: 'busy',
        DID_UPDATE_ITEM_LOAD_PROGRESS: 'loading',
        DID_THROW_ITEM_INVALID: 'load-invalid',
        DID_THROW_ITEM_LOAD_ERROR: 'load-error',
        DID_LOAD_ITEM: 'idle',
        DID_THROW_ITEM_REMOVE_ERROR: 'remove-error',
        DID_START_ITEM_REMOVE: 'busy',
        DID_START_ITEM_PROCESSING: 'busy processing',
        DID_REQUEST_ITEM_PROCESSING: 'busy processing',
        DID_UPDATE_ITEM_PROCESS_PROGRESS: 'processing',
        DID_COMPLETE_ITEM_PROCESSING: 'processing-complete',
        DID_THROW_ITEM_PROCESSING_ERROR: 'processing-error',
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: 'processing-revert-error',
        DID_ABORT_ITEM_PROCESSING: 'cancelled',
        DID_REVERT_ITEM_PROCESSING: 'idle',
    },
    cc = ({ root: e, props: t }) => {
        if (
            ((e.ref.handleClick = (a) =>
                e.dispatch('DID_ACTIVATE_ITEM', { id: t.id })),
            (e.element.id = `filepond--item-${t.id}`),
            e.element.addEventListener('click', e.ref.handleClick),
            (e.ref.container = e.appendChildView(
                e.createChildView(nc, { id: t.id })
            )),
            (e.ref.panel = e.appendChildView(
                e.createChildView(kn, { name: 'item-panel' })
            )),
            (e.ref.panel.height = null),
            (t.markedForRemoval = !1),
            !e.query('GET_ALLOW_REORDER'))
        )
            return
        e.element.dataset.dragState = 'idle'
        let i = (a) => {
            if (!a.isPrimary) return
            let n = !1,
                o = { x: a.pageX, y: a.pageY }
            ;(t.dragOrigin = { x: e.translateX, y: e.translateY }),
                (t.dragCenter = { x: a.offsetX, y: a.offsetY })
            let l = sc(e.query('GET_ACTIVE_ITEMS'))
            e.dispatch('DID_GRAB_ITEM', { id: t.id, dragState: l })
            let r = (d) => {
                    if (!d.isPrimary) return
                    d.stopPropagation(),
                        d.preventDefault(),
                        (t.dragOffset = { x: d.pageX - o.x, y: d.pageY - o.y }),
                        t.dragOffset.x * t.dragOffset.x +
                            t.dragOffset.y * t.dragOffset.y >
                            16 &&
                            !n &&
                            ((n = !0),
                            e.element.removeEventListener(
                                'click',
                                e.ref.handleClick
                            )),
                        e.dispatch('DID_DRAG_ITEM', { id: t.id, dragState: l })
                },
                s = (d) => {
                    d.isPrimary &&
                        ((t.dragOffset = {
                            x: d.pageX - o.x,
                            y: d.pageY - o.y,
                        }),
                        c())
                },
                p = () => {
                    c()
                },
                c = () => {
                    document.removeEventListener('pointercancel', p),
                        document.removeEventListener('pointermove', r),
                        document.removeEventListener('pointerup', s),
                        e.dispatch('DID_DROP_ITEM', { id: t.id, dragState: l }),
                        n &&
                            setTimeout(
                                () =>
                                    e.element.addEventListener(
                                        'click',
                                        e.ref.handleClick
                                    ),
                                0
                            )
                }
            document.addEventListener('pointercancel', p),
                document.addEventListener('pointermove', r),
                document.addEventListener('pointerup', s)
        }
        e.element.addEventListener('pointerdown', i)
    },
    dc = he({
        DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
            e.height = t.height
        },
    }),
    pc = he(
        {
            DID_GRAB_ITEM: ({ root: e, props: t }) => {
                t.dragOrigin = { x: e.translateX, y: e.translateY }
            },
            DID_DRAG_ITEM: ({ root: e }) => {
                e.element.dataset.dragState = 'drag'
            },
            DID_DROP_ITEM: ({ root: e, props: t }) => {
                ;(t.dragOffset = null),
                    (t.dragOrigin = null),
                    (e.element.dataset.dragState = 'drop')
            },
        },
        ({ root: e, actions: t, props: i, shouldOptimize: a }) => {
            e.element.dataset.dragState === 'drop' &&
                e.scaleX <= 1 &&
                (e.element.dataset.dragState = 'idle')
            let n = t
                .concat()
                .filter((l) => /^DID_/.test(l.type))
                .reverse()
                .find((l) => nn[l.type])
            n &&
                n.type !== i.currentState &&
                ((i.currentState = n.type),
                (e.element.dataset.filepondItemState =
                    nn[i.currentState] || ''))
            let o =
                e.query('GET_ITEM_PANEL_ASPECT_RATIO') ||
                e.query('GET_PANEL_ASPECT_RATIO')
            o
                ? a || (e.height = e.rect.element.width * o)
                : (dc({ root: e, actions: t, props: i }),
                  !e.height &&
                      e.ref.container.rect.element.height > 0 &&
                      (e.height = e.ref.container.rect.element.height)),
                a && (e.ref.panel.height = null),
                (e.ref.panel.height = e.height)
        }
    ),
    mc = ne({
        create: cc,
        write: pc,
        destroy: ({ root: e, props: t }) => {
            e.element.removeEventListener('click', e.ref.handleClick),
                e.dispatch('RELEASE_ITEM', { query: t.id })
        },
        tag: 'li',
        name: 'item',
        mixins: {
            apis: [
                'id',
                'interactionMethod',
                'markedForRemoval',
                'spawnDate',
                'dragCenter',
                'dragOrigin',
                'dragOffset',
            ],
            styles: [
                'translateX',
                'translateY',
                'scaleX',
                'scaleY',
                'opacity',
                'height',
            ],
            animations: {
                scaleX: an,
                scaleY: an,
                translateX: tn,
                translateY: tn,
                opacity: { type: 'tween', duration: 150 },
            },
        },
    }),
    Zi = (e, t) => Math.max(1, Math.floor((e + 1) / t)),
    Ki = (e, t, i) => {
        if (!i) return
        let a = e.rect.element.width,
            n = t.length,
            o = null
        if (n === 0 || i.top < t[0].rect.element.top) return -1
        let r = t[0].rect.element,
            s = r.marginLeft + r.marginRight,
            p = r.width + s,
            c = Zi(a, p)
        if (c === 1) {
            for (let u = 0; u < n; u++) {
                let f = t[u],
                    h = f.rect.outer.top + f.rect.element.height * 0.5
                if (i.top < h) return u
            }
            return n
        }
        let d = r.marginTop + r.marginBottom,
            m = r.height + d
        for (let u = 0; u < n; u++) {
            let f = u % c,
                h = Math.floor(u / c),
                g = f * p,
                v = h * m,
                E = v - r.marginTop,
                T = g + p,
                I = v + m + r.marginBottom
            if (i.top < I && i.top > E) {
                if (i.left < T) return u
                u !== n - 1 ? (o = u) : (o = null)
            }
        }
        return o !== null ? o : n
    },
    ei = {
        height: 0,
        width: 0,
        get getHeight() {
            return this.height
        },
        set setHeight(e) {
            ;(this.height === 0 || e === 0) && (this.height = e)
        },
        get getWidth() {
            return this.width
        },
        set setWidth(e) {
            ;(this.width === 0 || e === 0) && (this.width = e)
        },
        setDimensions: function (e, t) {
            ;(this.height === 0 || e === 0) && (this.height = e),
                (this.width === 0 || t === 0) && (this.width = t)
        },
    },
    uc = ({ root: e }) => {
        se(e.element, 'role', 'list'), (e.ref.lastItemSpanwDate = Date.now())
    },
    fc = ({ root: e, action: t }) => {
        let { id: i, index: a, interactionMethod: n } = t
        e.ref.addIndex = a
        let o = Date.now(),
            l = o,
            r = 1
        if (n !== _e.NONE) {
            r = 0
            let s = e.query('GET_ITEM_INSERT_INTERVAL'),
                p = o - e.ref.lastItemSpanwDate
            l = p < s ? o + (s - p) : o
        }
        ;(e.ref.lastItemSpanwDate = l),
            e.appendChildView(
                e.createChildView(mc, {
                    spawnDate: l,
                    id: i,
                    opacity: r,
                    interactionMethod: n,
                }),
                a
            )
    },
    on = (e, t, i, a = 0, n = 1) => {
        e.dragOffset
            ? ((e.translateX = null),
              (e.translateY = null),
              (e.translateX = e.dragOrigin.x + e.dragOffset.x),
              (e.translateY = e.dragOrigin.y + e.dragOffset.y),
              (e.scaleX = 1.025),
              (e.scaleY = 1.025))
            : ((e.translateX = t),
              (e.translateY = i),
              Date.now() > e.spawnDate &&
                  (e.opacity === 0 && hc(e, t, i, a, n),
                  (e.scaleX = 1),
                  (e.scaleY = 1),
                  (e.opacity = 1)))
    },
    hc = (e, t, i, a, n) => {
        e.interactionMethod === _e.NONE
            ? ((e.translateX = null),
              (e.translateX = t),
              (e.translateY = null),
              (e.translateY = i))
            : e.interactionMethod === _e.DROP
              ? ((e.translateX = null),
                (e.translateX = t - a * 20),
                (e.translateY = null),
                (e.translateY = i - n * 10),
                (e.scaleX = 0.8),
                (e.scaleY = 0.8))
              : e.interactionMethod === _e.BROWSE
                ? ((e.translateY = null), (e.translateY = i - 30))
                : e.interactionMethod === _e.API &&
                  ((e.translateX = null),
                  (e.translateX = t - 30),
                  (e.translateY = null))
    },
    gc = ({ root: e, action: t }) => {
        let { id: i } = t,
            a = e.childViews.find((n) => n.id === i)
        a &&
            ((a.scaleX = 0.9),
            (a.scaleY = 0.9),
            (a.opacity = 0),
            (a.markedForRemoval = !0))
    },
    Mi = (e) =>
        e.rect.element.height +
        e.rect.element.marginBottom * 0.5 +
        e.rect.element.marginTop * 0.5,
    Ec = (e) =>
        e.rect.element.width +
        e.rect.element.marginLeft * 0.5 +
        e.rect.element.marginRight * 0.5,
    bc = ({ root: e, action: t }) => {
        let { id: i, dragState: a } = t,
            n = e.query('GET_ITEM', { id: i }),
            o = e.childViews.find((g) => g.id === i),
            l = e.childViews.length,
            r = a.getItemIndex(n)
        if (!o) return
        let s = {
                x: o.dragOrigin.x + o.dragOffset.x + o.dragCenter.x,
                y: o.dragOrigin.y + o.dragOffset.y + o.dragCenter.y,
            },
            p = Mi(o),
            c = Ec(o),
            d = Math.floor(e.rect.outer.width / c)
        d > l && (d = l)
        let m = Math.floor(l / d + 1)
        ;(ei.setHeight = p * m), (ei.setWidth = c * d)
        var u = {
            y: Math.floor(s.y / p),
            x: Math.floor(s.x / c),
            getGridIndex: function () {
                return s.y > ei.getHeight ||
                    s.y < 0 ||
                    s.x > ei.getWidth ||
                    s.x < 0
                    ? r
                    : this.y * d + this.x
            },
            getColIndex: function () {
                let v = e.query('GET_ACTIVE_ITEMS'),
                    E = e.childViews.filter((O) => O.rect.element.height),
                    T = v.map((O) => E.find((M) => M.id === O.id)),
                    I = T.findIndex((O) => O === o),
                    y = Mi(o),
                    b = T.length,
                    w = b,
                    x = 0,
                    _ = 0,
                    P = 0
                for (let O = 0; O < b; O++)
                    if (((x = Mi(T[O])), (P = _), (_ = P + x), s.y < _)) {
                        if (I > O) {
                            if (s.y < P + y) {
                                w = O
                                break
                            }
                            continue
                        }
                        w = O
                        break
                    }
                return w
            },
        }
        let f = d > 1 ? u.getGridIndex() : u.getColIndex()
        e.dispatch('MOVE_ITEM', { query: o, index: f })
        let h = a.getIndex()
        if (h === void 0 || h !== f) {
            if ((a.setIndex(f), h === void 0)) return
            e.dispatch('DID_REORDER_ITEMS', {
                items: e.query('GET_ACTIVE_ITEMS'),
                origin: r,
                target: f,
            })
        }
    },
    Tc = he({ DID_ADD_ITEM: fc, DID_REMOVE_ITEM: gc, DID_DRAG_ITEM: bc }),
    vc = ({ root: e, props: t, actions: i, shouldOptimize: a }) => {
        Tc({ root: e, props: t, actions: i })
        let { dragCoordinates: n } = t,
            o = e.rect.element.width,
            l = e.childViews.filter((T) => T.rect.element.height),
            r = e
                .query('GET_ACTIVE_ITEMS')
                .map((T) => l.find((I) => I.id === T.id))
                .filter((T) => T),
            s = n ? Ki(e, r, n) : null,
            p = e.ref.addIndex || null
        e.ref.addIndex = null
        let c = 0,
            d = 0,
            m = 0
        if (r.length === 0) return
        let u = r[0].rect.element,
            f = u.marginTop + u.marginBottom,
            h = u.marginLeft + u.marginRight,
            g = u.width + h,
            v = u.height + f,
            E = Zi(o, g)
        if (E === 1) {
            let T = 0,
                I = 0
            r.forEach((y, b) => {
                if (s) {
                    let _ = b - s
                    _ === -2
                        ? (I = -f * 0.25)
                        : _ === -1
                          ? (I = -f * 0.75)
                          : _ === 0
                            ? (I = f * 0.75)
                            : _ === 1
                              ? (I = f * 0.25)
                              : (I = 0)
                }
                a && ((y.translateX = null), (y.translateY = null)),
                    y.markedForRemoval || on(y, 0, T + I)
                let x =
                    (y.rect.element.height + f) *
                    (y.markedForRemoval ? y.opacity : 1)
                T += x
            })
        } else {
            let T = 0,
                I = 0
            r.forEach((y, b) => {
                b === s && (c = 1),
                    b === p && (m += 1),
                    y.markedForRemoval && y.opacity < 0.5 && (d -= 1)
                let w = b + m + c + d,
                    x = w % E,
                    _ = Math.floor(w / E),
                    P = x * g,
                    O = _ * v,
                    M = Math.sign(P - T),
                    C = Math.sign(O - I)
                ;(T = P),
                    (I = O),
                    !y.markedForRemoval &&
                        (a && ((y.translateX = null), (y.translateY = null)),
                        on(y, P, O, M, C))
            })
        }
    },
    Ic = (e, t) =>
        t.filter((i) => (i.data && i.data.id ? e.id === i.data.id : !0)),
    xc = ne({
        create: uc,
        write: vc,
        tag: 'ul',
        name: 'list',
        didWriteView: ({ root: e }) => {
            e.childViews
                .filter(
                    (t) => t.markedForRemoval && t.opacity === 0 && t.resting
                )
                .forEach((t) => {
                    t._destroy(), e.removeChildView(t)
                })
        },
        filterFrameActionsForChild: Ic,
        mixins: { apis: ['dragCoordinates'] },
    }),
    yc = ({ root: e, props: t }) => {
        ;(e.ref.list = e.appendChildView(e.createChildView(xc))),
            (t.dragCoordinates = null),
            (t.overflowing = !1)
    },
    _c = ({ root: e, props: t, action: i }) => {
        e.query('GET_ITEM_INSERT_LOCATION_FREEDOM') &&
            (t.dragCoordinates = {
                left: i.position.scopeLeft - e.ref.list.rect.element.left,
                top:
                    i.position.scopeTop -
                    (e.rect.outer.top +
                        e.rect.element.marginTop +
                        e.rect.element.scrollTop),
            })
    },
    Rc = ({ props: e }) => {
        e.dragCoordinates = null
    },
    wc = he({ DID_DRAG: _c, DID_END_DRAG: Rc }),
    Sc = ({ root: e, props: t, actions: i }) => {
        if (
            (wc({ root: e, props: t, actions: i }),
            (e.ref.list.dragCoordinates = t.dragCoordinates),
            t.overflowing &&
                !t.overflow &&
                ((t.overflowing = !1),
                (e.element.dataset.state = ''),
                (e.height = null)),
            t.overflow)
        ) {
            let a = Math.round(t.overflow)
            a !== e.height &&
                ((t.overflowing = !0),
                (e.element.dataset.state = 'overflow'),
                (e.height = a))
        }
    },
    Lc = ne({
        create: yc,
        write: Sc,
        name: 'list-scroller',
        mixins: {
            apis: ['overflow', 'dragCoordinates'],
            styles: ['height', 'translateY'],
            animations: { translateY: 'spring' },
        },
    }),
    Oe = (e, t, i, a = '') => {
        i ? se(e, t, a) : e.removeAttribute(t)
    },
    Ac = (e) => {
        if (!(!e || e.value === '')) {
            try {
                e.value = ''
            } catch {}
            if (e.value) {
                let t = ke('form'),
                    i = e.parentNode,
                    a = e.nextSibling
                t.appendChild(e),
                    t.reset(),
                    a ? i.insertBefore(e, a) : i.appendChild(e)
            }
        }
    },
    Mc = ({ root: e, props: t }) => {
        ;(e.element.id = `filepond--browser-${t.id}`),
            se(e.element, 'name', e.query('GET_NAME')),
            se(e.element, 'aria-controls', `filepond--assistant-${t.id}`),
            se(e.element, 'aria-labelledby', `filepond--drop-label-${t.id}`),
            Vn({
                root: e,
                action: { value: e.query('GET_ACCEPTED_FILE_TYPES') },
            }),
            Gn({ root: e, action: { value: e.query('GET_ALLOW_MULTIPLE') } }),
            Un({
                root: e,
                action: { value: e.query('GET_ALLOW_DIRECTORIES_ONLY') },
            }),
            Bi({ root: e }),
            Wn({ root: e, action: { value: e.query('GET_REQUIRED') } }),
            Hn({ root: e, action: { value: e.query('GET_CAPTURE_METHOD') } }),
            (e.ref.handleChange = (i) => {
                if (!e.element.value) return
                let a = Array.from(e.element.files).map(
                    (n) => ((n._relativePath = n.webkitRelativePath), n)
                )
                setTimeout(() => {
                    t.onload(a), Ac(e.element)
                }, 250)
            }),
            e.element.addEventListener('change', e.ref.handleChange)
    },
    Vn = ({ root: e, action: t }) => {
        e.query('GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE') &&
            Oe(e.element, 'accept', !!t.value, t.value ? t.value.join(',') : '')
    },
    Gn = ({ root: e, action: t }) => {
        Oe(e.element, 'multiple', t.value)
    },
    Un = ({ root: e, action: t }) => {
        Oe(e.element, 'webkitdirectory', t.value)
    },
    Bi = ({ root: e }) => {
        let t = e.query('GET_DISABLED'),
            i = e.query('GET_ALLOW_BROWSE'),
            a = t || !i
        Oe(e.element, 'disabled', a)
    },
    Wn = ({ root: e, action: t }) => {
        t.value
            ? e.query('GET_TOTAL_ITEMS') === 0 && Oe(e.element, 'required', !0)
            : Oe(e.element, 'required', !1)
    },
    Hn = ({ root: e, action: t }) => {
        Oe(e.element, 'capture', !!t.value, t.value === !0 ? '' : t.value)
    },
    ln = ({ root: e }) => {
        let { element: t } = e
        e.query('GET_TOTAL_ITEMS') > 0
            ? (Oe(t, 'required', !1), Oe(t, 'name', !1))
            : (Oe(t, 'name', !0, e.query('GET_NAME')),
              e.query('GET_CHECK_VALIDITY') && t.setCustomValidity(''),
              e.query('GET_REQUIRED') && Oe(t, 'required', !0))
    },
    Oc = ({ root: e }) => {
        e.query('GET_CHECK_VALIDITY') &&
            e.element.setCustomValidity(e.query('GET_LABEL_INVALID_FIELD'))
    },
    Pc = ne({
        tag: 'input',
        name: 'browser',
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        attributes: { type: 'file' },
        create: Mc,
        destroy: ({ root: e }) => {
            e.element.removeEventListener('change', e.ref.handleChange)
        },
        write: he({
            DID_LOAD_ITEM: ln,
            DID_REMOVE_ITEM: ln,
            DID_THROW_ITEM_INVALID: Oc,
            DID_SET_DISABLED: Bi,
            DID_SET_ALLOW_BROWSE: Bi,
            DID_SET_ALLOW_DIRECTORIES_ONLY: Un,
            DID_SET_ALLOW_MULTIPLE: Gn,
            DID_SET_ACCEPTED_FILE_TYPES: Vn,
            DID_SET_CAPTURE_METHOD: Hn,
            DID_SET_REQUIRED: Wn,
        }),
    }),
    rn = { ENTER: 13, SPACE: 32 },
    Dc = ({ root: e, props: t }) => {
        let i = ke('label')
        se(i, 'for', `filepond--browser-${t.id}`),
            se(i, 'id', `filepond--drop-label-${t.id}`),
            (e.ref.handleKeyDown = (a) => {
                ;(a.keyCode === rn.ENTER || a.keyCode === rn.SPACE) &&
                    (a.preventDefault(), e.ref.label.click())
            }),
            (e.ref.handleClick = (a) => {
                a.target === i || i.contains(a.target) || e.ref.label.click()
            }),
            i.addEventListener('keydown', e.ref.handleKeyDown),
            e.element.addEventListener('click', e.ref.handleClick),
            jn(i, t.caption),
            e.appendChild(i),
            (e.ref.label = i)
    },
    jn = (e, t) => {
        e.innerHTML = t
        let i = e.querySelector('.filepond--label-action')
        return i && se(i, 'tabindex', '0'), t
    },
    Fc = ne({
        name: 'drop-label',
        ignoreRect: !0,
        create: Dc,
        destroy: ({ root: e }) => {
            e.ref.label.addEventListener('keydown', e.ref.handleKeyDown),
                e.element.removeEventListener('click', e.ref.handleClick)
        },
        write: he({
            DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
                jn(e.ref.label, t.value)
            },
        }),
        mixins: {
            styles: ['opacity', 'translateX', 'translateY'],
            animations: {
                opacity: { type: 'tween', duration: 150 },
                translateX: 'spring',
                translateY: 'spring',
            },
        },
    }),
    zc = ne({
        name: 'drip-blob',
        ignoreRect: !0,
        mixins: {
            styles: ['translateX', 'translateY', 'scaleX', 'scaleY', 'opacity'],
            animations: {
                scaleX: 'spring',
                scaleY: 'spring',
                translateX: 'spring',
                translateY: 'spring',
                opacity: { type: 'tween', duration: 250 },
            },
        },
    }),
    Cc = ({ root: e }) => {
        let t = e.rect.element.width * 0.5,
            i = e.rect.element.height * 0.5
        e.ref.blob = e.appendChildView(
            e.createChildView(zc, {
                opacity: 0,
                scaleX: 2.5,
                scaleY: 2.5,
                translateX: t,
                translateY: i,
            })
        )
    },
    Nc = ({ root: e, action: t }) => {
        if (!e.ref.blob) {
            Cc({ root: e })
            return
        }
        ;(e.ref.blob.translateX = t.position.scopeLeft),
            (e.ref.blob.translateY = t.position.scopeTop),
            (e.ref.blob.scaleX = 1),
            (e.ref.blob.scaleY = 1),
            (e.ref.blob.opacity = 1)
    },
    Bc = ({ root: e }) => {
        e.ref.blob && (e.ref.blob.opacity = 0)
    },
    kc = ({ root: e }) => {
        e.ref.blob &&
            ((e.ref.blob.scaleX = 2.5),
            (e.ref.blob.scaleY = 2.5),
            (e.ref.blob.opacity = 0))
    },
    Vc = ({ root: e, props: t, actions: i }) => {
        Gc({ root: e, props: t, actions: i })
        let { blob: a } = e.ref
        i.length === 0 &&
            a &&
            a.opacity === 0 &&
            (e.removeChildView(a), (e.ref.blob = null))
    },
    Gc = he({ DID_DRAG: Nc, DID_DROP: kc, DID_END_DRAG: Bc }),
    Uc = ne({ ignoreRect: !0, ignoreRectUpdate: !0, name: 'drip', write: Vc }),
    Yn = (e, t) => {
        try {
            let i = new DataTransfer()
            t.forEach((a) => {
                a instanceof File
                    ? i.items.add(a)
                    : i.items.add(new File([a], a.name, { type: a.type }))
            }),
                (e.files = i.files)
        } catch {
            return !1
        }
        return !0
    },
    Wc = ({ root: e }) => (e.ref.fields = {}),
    ui = (e, t) => e.ref.fields[t],
    Ji = (e) => {
        e.query('GET_ACTIVE_ITEMS').forEach((t) => {
            e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id])
        })
    },
    sn = ({ root: e }) => Ji(e),
    Hc = ({ root: e, action: t }) => {
        let n =
                !(e.query('GET_ITEM', t.id).origin === re.LOCAL) &&
                e.query('SHOULD_UPDATE_FILE_INPUT'),
            o = ke('input')
        ;(o.type = n ? 'file' : 'hidden'),
            (o.name = e.query('GET_NAME')),
            (e.ref.fields[t.id] = o),
            Ji(e)
    },
    jc = ({ root: e, action: t }) => {
        let i = ui(e, t.id)
        if (
            !i ||
            (t.serverFileReference !== null &&
                (i.value = t.serverFileReference),
            !e.query('SHOULD_UPDATE_FILE_INPUT'))
        )
            return
        let a = e.query('GET_ITEM', t.id)
        Yn(i, [a.file])
    },
    Yc = ({ root: e, action: t }) => {
        e.query('SHOULD_UPDATE_FILE_INPUT') &&
            setTimeout(() => {
                let i = ui(e, t.id)
                i && Yn(i, [t.file])
            }, 0)
    },
    qc = ({ root: e }) => {
        e.element.disabled = e.query('GET_DISABLED')
    },
    $c = ({ root: e, action: t }) => {
        let i = ui(e, t.id)
        i &&
            (i.parentNode && i.parentNode.removeChild(i),
            delete e.ref.fields[t.id])
    },
    Xc = ({ root: e, action: t }) => {
        let i = ui(e, t.id)
        i &&
            (t.value === null
                ? i.removeAttribute('value')
                : i.type != 'file' && (i.value = t.value),
            Ji(e))
    },
    Qc = he({
        DID_SET_DISABLED: qc,
        DID_ADD_ITEM: Hc,
        DID_LOAD_ITEM: jc,
        DID_REMOVE_ITEM: $c,
        DID_DEFINE_VALUE: Xc,
        DID_PREPARE_OUTPUT: Yc,
        DID_REORDER_ITEMS: sn,
        DID_SORT_ITEMS: sn,
    }),
    Zc = ne({
        tag: 'fieldset',
        name: 'data',
        create: Wc,
        write: Qc,
        ignoreRect: !0,
    }),
    Kc = (e) => ('getRootNode' in e ? e.getRootNode() : document),
    Jc = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff'],
    ed = ['css', 'csv', 'html', 'txt'],
    td = { zip: 'zip|compressed', epub: 'application/epub+zip' },
    qn = (e = '') => (
        (e = e.toLowerCase()),
        Jc.includes(e)
            ? 'image/' + (e === 'jpg' ? 'jpeg' : e === 'svg' ? 'svg+xml' : e)
            : ed.includes(e)
              ? 'text/' + e
              : td[e] || ''
    ),
    ea = (e) =>
        new Promise((t, i) => {
            let a = cd(e)
            if (a.length && !id(e)) return t(a)
            ad(e).then(t)
        }),
    id = (e) => (e.files ? e.files.length > 0 : !1),
    ad = (e) =>
        new Promise((t, i) => {
            let a = (e.items ? Array.from(e.items) : [])
                .filter((n) => nd(n))
                .map((n) => od(n))
            if (!a.length) {
                t(e.files ? Array.from(e.files) : [])
                return
            }
            Promise.all(a)
                .then((n) => {
                    let o = []
                    n.forEach((l) => {
                        o.push.apply(o, l)
                    }),
                        t(
                            o
                                .filter((l) => l)
                                .map(
                                    (l) => (
                                        l._relativePath ||
                                            (l._relativePath =
                                                l.webkitRelativePath),
                                        l
                                    )
                                )
                        )
                })
                .catch(console.error)
        }),
    nd = (e) => {
        if ($n(e)) {
            let t = ta(e)
            if (t) return t.isFile || t.isDirectory
        }
        return e.kind === 'file'
    },
    od = (e) =>
        new Promise((t, i) => {
            if (sd(e)) {
                ld(ta(e)).then(t).catch(i)
                return
            }
            t([e.getAsFile()])
        }),
    ld = (e) =>
        new Promise((t, i) => {
            let a = [],
                n = 0,
                o = 0,
                l = () => {
                    o === 0 && n === 0 && t(a)
                },
                r = (s) => {
                    n++
                    let p = s.createReader(),
                        c = () => {
                            p.readEntries((d) => {
                                if (d.length === 0) {
                                    n--, l()
                                    return
                                }
                                d.forEach((m) => {
                                    m.isDirectory
                                        ? r(m)
                                        : (o++,
                                          m.file((u) => {
                                              let f = rd(u)
                                              m.fullPath &&
                                                  (f._relativePath =
                                                      m.fullPath),
                                                  a.push(f),
                                                  o--,
                                                  l()
                                          }))
                                }),
                                    c()
                            }, i)
                        }
                    c()
                }
            r(e)
        }),
    rd = (e) => {
        if (e.type.length) return e
        let t = e.lastModifiedDate,
            i = e.name,
            a = qn(mi(e.name))
        return (
            a.length &&
                ((e = e.slice(0, e.size, a)),
                (e.name = i),
                (e.lastModifiedDate = t)),
            e
        )
    },
    sd = (e) => $n(e) && (ta(e) || {}).isDirectory,
    $n = (e) => 'webkitGetAsEntry' in e,
    ta = (e) => e.webkitGetAsEntry(),
    cd = (e) => {
        let t = []
        try {
            if (((t = pd(e)), t.length)) return t
            t = dd(e)
        } catch {}
        return t
    },
    dd = (e) => {
        let t = e.getData('url')
        return typeof t == 'string' && t.length ? [t] : []
    },
    pd = (e) => {
        let t = e.getData('text/html')
        if (typeof t == 'string' && t.length) {
            let i = t.match(/src\s*=\s*"(.+?)"/)
            if (i) return [i[1]]
        }
        return []
    },
    li = [],
    et = (e) => ({
        pageLeft: e.pageX,
        pageTop: e.pageY,
        scopeLeft: e.offsetX || e.layerX,
        scopeTop: e.offsetY || e.layerY,
    }),
    md = (e, t, i) => {
        let a = ud(t),
            n = {
                element: e,
                filterElement: i,
                state: null,
                ondrop: () => {},
                onenter: () => {},
                ondrag: () => {},
                onexit: () => {},
                onload: () => {},
                allowdrop: () => {},
            }
        return (n.destroy = a.addListener(n)), n
    },
    ud = (e) => {
        let t = li.find((a) => a.element === e)
        if (t) return t
        let i = fd(e)
        return li.push(i), i
    },
    fd = (e) => {
        let t = [],
            i = { dragenter: gd, dragover: Ed, dragleave: Td, drop: bd },
            a = {}
        te(i, (o, l) => {
            ;(a[o] = l(e, t)), e.addEventListener(o, a[o], !1)
        })
        let n = {
            element: e,
            addListener: (o) => (
                t.push(o),
                () => {
                    t.splice(t.indexOf(o), 1),
                        t.length === 0 &&
                            (li.splice(li.indexOf(n), 1),
                            te(i, (l) => {
                                e.removeEventListener(l, a[l], !1)
                            }))
                }
            ),
        }
        return n
    },
    hd = (e, t) => (
        'elementFromPoint' in e || (e = document), e.elementFromPoint(t.x, t.y)
    ),
    ia = (e, t) => {
        let i = Kc(t),
            a = hd(i, {
                x: e.pageX - window.pageXOffset,
                y: e.pageY - window.pageYOffset,
            })
        return a === t || t.contains(a)
    },
    Xn = null,
    ti = (e, t) => {
        try {
            e.dropEffect = t
        } catch {}
    },
    gd = (e, t) => (i) => {
        i.preventDefault(),
            (Xn = i.target),
            t.forEach((a) => {
                let { element: n, onenter: o } = a
                ia(i, n) && ((a.state = 'enter'), o(et(i)))
            })
    },
    Ed = (e, t) => (i) => {
        i.preventDefault()
        let a = i.dataTransfer
        ea(a).then((n) => {
            let o = !1
            t.some((l) => {
                let {
                    filterElement: r,
                    element: s,
                    onenter: p,
                    onexit: c,
                    ondrag: d,
                    allowdrop: m,
                } = l
                ti(a, 'copy')
                let u = m(n)
                if (!u) {
                    ti(a, 'none')
                    return
                }
                if (ia(i, s)) {
                    if (((o = !0), l.state === null)) {
                        ;(l.state = 'enter'), p(et(i))
                        return
                    }
                    if (((l.state = 'over'), r && !u)) {
                        ti(a, 'none')
                        return
                    }
                    d(et(i))
                } else
                    r && !o && ti(a, 'none'),
                        l.state && ((l.state = null), c(et(i)))
            })
        })
    },
    bd = (e, t) => (i) => {
        i.preventDefault()
        let a = i.dataTransfer
        ea(a).then((n) => {
            t.forEach((o) => {
                let {
                    filterElement: l,
                    element: r,
                    ondrop: s,
                    onexit: p,
                    allowdrop: c,
                } = o
                if (((o.state = null), !(l && !ia(i, r)))) {
                    if (!c(n)) return p(et(i))
                    s(et(i), n)
                }
            })
        })
    },
    Td = (e, t) => (i) => {
        Xn === i.target &&
            t.forEach((a) => {
                let { onexit: n } = a
                ;(a.state = null), n(et(i))
            })
    },
    vd = (e, t, i) => {
        e.classList.add('filepond--hopper')
        let {
                catchesDropsOnPage: a,
                requiresDropOnElement: n,
                filterItems: o = (c) => c,
            } = i,
            l = md(e, a ? document.documentElement : e, n),
            r = '',
            s = ''
        ;(l.allowdrop = (c) => t(o(c))),
            (l.ondrop = (c, d) => {
                let m = o(d)
                if (!t(m)) {
                    p.ondragend(c)
                    return
                }
                ;(s = 'drag-drop'), p.onload(m, c)
            }),
            (l.ondrag = (c) => {
                p.ondrag(c)
            }),
            (l.onenter = (c) => {
                ;(s = 'drag-over'), p.ondragstart(c)
            }),
            (l.onexit = (c) => {
                ;(s = 'drag-exit'), p.ondragend(c)
            })
        let p = {
            updateHopperState: () => {
                r !== s && ((e.dataset.hopperState = s), (r = s))
            },
            onload: () => {},
            ondragstart: () => {},
            ondrag: () => {},
            ondragend: () => {},
            destroy: () => {
                l.destroy()
            },
        }
        return p
    },
    ki = !1,
    mt = [],
    Qn = (e) => {
        let t = document.activeElement
        if (
            t &&
            (/textarea|input/i.test(t.nodeName) ||
                t.getAttribute('contenteditable') === 'true')
        ) {
            let a = !1,
                n = t
            for (; n !== document.body; ) {
                if (n.classList.contains('filepond--root')) {
                    a = !0
                    break
                }
                n = n.parentNode
            }
            if (!a) return
        }
        ea(e.clipboardData).then((a) => {
            a.length && mt.forEach((n) => n(a))
        })
    },
    Id = (e) => {
        mt.includes(e) ||
            (mt.push(e),
            !ki && ((ki = !0), document.addEventListener('paste', Qn)))
    },
    xd = (e) => {
        qi(mt, mt.indexOf(e)),
            mt.length === 0 &&
                (document.removeEventListener('paste', Qn), (ki = !1))
    },
    yd = () => {
        let e = (i) => {
                t.onload(i)
            },
            t = {
                destroy: () => {
                    xd(e)
                },
                onload: () => {},
            }
        return Id(e), t
    },
    _d = ({ root: e, props: t }) => {
        ;(e.element.id = `filepond--assistant-${t.id}`),
            se(e.element, 'role', 'status'),
            se(e.element, 'aria-live', 'polite'),
            se(e.element, 'aria-relevant', 'additions')
    },
    cn = null,
    dn = null,
    Oi = [],
    fi = (e, t) => {
        e.element.textContent = t
    },
    Rd = (e) => {
        e.element.textContent = ''
    },
    Zn = (e, t, i) => {
        let a = e.query('GET_TOTAL_ITEMS')
        fi(
            e,
            `${i} ${t}, ${a} ${a === 1 ? e.query('GET_LABEL_FILE_COUNT_SINGULAR') : e.query('GET_LABEL_FILE_COUNT_PLURAL')}`
        ),
            clearTimeout(dn),
            (dn = setTimeout(() => {
                Rd(e)
            }, 1500))
    },
    Kn = (e) => e.element.parentNode.contains(document.activeElement),
    wd = ({ root: e, action: t }) => {
        if (!Kn(e)) return
        e.element.textContent = ''
        let i = e.query('GET_ITEM', t.id)
        Oi.push(i.filename),
            clearTimeout(cn),
            (cn = setTimeout(() => {
                Zn(e, Oi.join(', '), e.query('GET_LABEL_FILE_ADDED')),
                    (Oi.length = 0)
            }, 750))
    },
    Sd = ({ root: e, action: t }) => {
        if (!Kn(e)) return
        let i = t.item
        Zn(e, i.filename, e.query('GET_LABEL_FILE_REMOVED'))
    },
    Ld = ({ root: e, action: t }) => {
        let a = e.query('GET_ITEM', t.id).filename,
            n = e.query('GET_LABEL_FILE_PROCESSING_COMPLETE')
        fi(e, `${a} ${n}`)
    },
    pn = ({ root: e, action: t }) => {
        let a = e.query('GET_ITEM', t.id).filename,
            n = e.query('GET_LABEL_FILE_PROCESSING_ABORTED')
        fi(e, `${a} ${n}`)
    },
    ii = ({ root: e, action: t }) => {
        let a = e.query('GET_ITEM', t.id).filename
        fi(e, `${t.status.main} ${a} ${t.status.sub}`)
    },
    Ad = ne({
        create: _d,
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: he({
            DID_LOAD_ITEM: wd,
            DID_REMOVE_ITEM: Sd,
            DID_COMPLETE_ITEM_PROCESSING: Ld,
            DID_ABORT_ITEM_PROCESSING: pn,
            DID_REVERT_ITEM_PROCESSING: pn,
            DID_THROW_ITEM_REMOVE_ERROR: ii,
            DID_THROW_ITEM_LOAD_ERROR: ii,
            DID_THROW_ITEM_INVALID: ii,
            DID_THROW_ITEM_PROCESSING_ERROR: ii,
        }),
        tag: 'span',
        name: 'assistant',
    }),
    Jn = (e, t = '-') =>
        e.replace(new RegExp(`${t}.`, 'g'), (i) => i.charAt(1).toUpperCase()),
    eo = (e, t = 16, i = !0) => {
        let a = Date.now(),
            n = null
        return (...o) => {
            clearTimeout(n)
            let l = Date.now() - a,
                r = () => {
                    ;(a = Date.now()), e(...o)
                }
            l < t ? i || (n = setTimeout(r, t - l)) : r()
        }
    },
    Md = 1e6,
    ri = (e) => e.preventDefault(),
    Od = ({ root: e, props: t }) => {
        let i = e.query('GET_ID')
        i && (e.element.id = i)
        let a = e.query('GET_CLASS_NAME')
        a &&
            a
                .split(' ')
                .filter((s) => s.length)
                .forEach((s) => {
                    e.element.classList.add(s)
                }),
            (e.ref.label = e.appendChildView(
                e.createChildView(Fc, {
                    ...t,
                    translateY: null,
                    caption: e.query('GET_LABEL_IDLE'),
                })
            )),
            (e.ref.list = e.appendChildView(
                e.createChildView(Lc, { translateY: null })
            )),
            (e.ref.panel = e.appendChildView(
                e.createChildView(kn, { name: 'panel-root' })
            )),
            (e.ref.assistant = e.appendChildView(
                e.createChildView(Ad, { ...t })
            )),
            (e.ref.data = e.appendChildView(e.createChildView(Zc, { ...t }))),
            (e.ref.measure = ke('div')),
            (e.ref.measure.style.height = '100%'),
            e.element.appendChild(e.ref.measure),
            (e.ref.bounds = null),
            e
                .query('GET_STYLES')
                .filter((s) => !Be(s.value))
                .map(({ name: s, value: p }) => {
                    e.element.dataset[s] = p
                }),
            (e.ref.widthPrevious = null),
            (e.ref.widthUpdated = eo(() => {
                ;(e.ref.updateHistory = []), e.dispatch('DID_RESIZE_ROOT')
            }, 250)),
            (e.ref.previousAspectRatio = null),
            (e.ref.updateHistory = [])
        let n = window.matchMedia('(pointer: fine) and (hover: hover)').matches,
            o = 'PointerEvent' in window
        e.query('GET_ALLOW_REORDER') &&
            o &&
            !n &&
            (e.element.addEventListener('touchmove', ri, { passive: !1 }),
            e.element.addEventListener('gesturestart', ri))
        let l = e.query('GET_CREDITS')
        if (l.length === 2) {
            let s = document.createElement('a')
            ;(s.className = 'filepond--credits'),
                (s.href = l[0]),
                (s.tabIndex = -1),
                (s.target = '_blank'),
                (s.rel = 'noopener noreferrer'),
                (s.textContent = l[1]),
                e.element.appendChild(s),
                (e.ref.credits = s)
        }
    },
    Pd = ({ root: e, props: t, actions: i }) => {
        if (
            (Nd({ root: e, props: t, actions: i }),
            i
                .filter((b) => /^DID_SET_STYLE_/.test(b.type))
                .filter((b) => !Be(b.data.value))
                .map(({ type: b, data: w }) => {
                    let x = Jn(b.substring(8).toLowerCase(), '_')
                    ;(e.element.dataset[x] = w.value), e.invalidateLayout()
                }),
            e.rect.element.hidden)
        )
            return
        e.rect.element.width !== e.ref.widthPrevious &&
            ((e.ref.widthPrevious = e.rect.element.width), e.ref.widthUpdated())
        let a = e.ref.bounds
        a ||
            ((a = e.ref.bounds = zd(e)),
            e.element.removeChild(e.ref.measure),
            (e.ref.measure = null))
        let { hopper: n, label: o, list: l, panel: r } = e.ref
        n && n.updateHopperState()
        let s = e.query('GET_PANEL_ASPECT_RATIO'),
            p = e.query('GET_ALLOW_MULTIPLE'),
            c = e.query('GET_TOTAL_ITEMS'),
            d = p ? e.query('GET_MAX_FILES') || Md : 1,
            m = c === d,
            u = i.find((b) => b.type === 'DID_ADD_ITEM')
        if (m && u) {
            let b = u.data.interactionMethod
            ;(o.opacity = 0),
                p
                    ? (o.translateY = -40)
                    : b === _e.API
                      ? (o.translateX = 40)
                      : b === _e.BROWSE
                        ? (o.translateY = 40)
                        : (o.translateY = 30)
        } else m || ((o.opacity = 1), (o.translateX = 0), (o.translateY = 0))
        let f = Dd(e),
            h = Fd(e),
            g = o.rect.element.height,
            v = !p || m ? 0 : g,
            E = m ? l.rect.element.marginTop : 0,
            T = c === 0 ? 0 : l.rect.element.marginBottom,
            I = v + E + h.visual + T,
            y = v + E + h.bounds + T
        if (
            ((l.translateY = Math.max(0, v - l.rect.element.marginTop) - f.top),
            s)
        ) {
            let b = e.rect.element.width,
                w = b * s
            s !== e.ref.previousAspectRatio &&
                ((e.ref.previousAspectRatio = s), (e.ref.updateHistory = []))
            let x = e.ref.updateHistory
            x.push(b)
            let _ = 2
            if (x.length > _ * 2) {
                let O = x.length,
                    M = O - 10,
                    C = 0
                for (let S = O; S >= M; S--)
                    if ((x[S] === x[S - 2] && C++, C >= _)) return
            }
            ;(r.scalable = !1), (r.height = w)
            let P = w - v - (T - f.bottom) - (m ? E : 0)
            h.visual > P ? (l.overflow = P) : (l.overflow = null),
                (e.height = w)
        } else if (a.fixedHeight) {
            r.scalable = !1
            let b = a.fixedHeight - v - (T - f.bottom) - (m ? E : 0)
            h.visual > b ? (l.overflow = b) : (l.overflow = null)
        } else if (a.cappedHeight) {
            let b = I >= a.cappedHeight,
                w = Math.min(a.cappedHeight, I)
            ;(r.scalable = !0), (r.height = b ? w : w - f.top - f.bottom)
            let x = w - v - (T - f.bottom) - (m ? E : 0)
            I > a.cappedHeight && h.visual > x
                ? (l.overflow = x)
                : (l.overflow = null),
                (e.height = Math.min(a.cappedHeight, y - f.top - f.bottom))
        } else {
            let b = c > 0 ? f.top + f.bottom : 0
            ;(r.scalable = !0),
                (r.height = Math.max(g, I - b)),
                (e.height = Math.max(g, y - b))
        }
        e.ref.credits &&
            r.heightCurrent &&
            (e.ref.credits.style.transform = `translateY(${r.heightCurrent}px)`)
    },
    Dd = (e) => {
        let t = e.ref.list.childViews[0].childViews[0]
        return t
            ? {
                  top: t.rect.element.marginTop,
                  bottom: t.rect.element.marginBottom,
              }
            : { top: 0, bottom: 0 }
    },
    Fd = (e) => {
        let t = 0,
            i = 0,
            a = e.ref.list,
            n = a.childViews[0],
            o = n.childViews.filter((E) => E.rect.element.height),
            l = e
                .query('GET_ACTIVE_ITEMS')
                .map((E) => o.find((T) => T.id === E.id))
                .filter((E) => E)
        if (l.length === 0) return { visual: t, bounds: i }
        let r = n.rect.element.width,
            s = Ki(n, l, a.dragCoordinates),
            p = l[0].rect.element,
            c = p.marginTop + p.marginBottom,
            d = p.marginLeft + p.marginRight,
            m = p.width + d,
            u = p.height + c,
            f = typeof s < 'u' && s >= 0 ? 1 : 0,
            h = l.find((E) => E.markedForRemoval && E.opacity < 0.45) ? -1 : 0,
            g = l.length + f + h,
            v = Zi(r, m)
        return (
            v === 1
                ? l.forEach((E) => {
                      let T = E.rect.element.height + c
                      ;(i += T), (t += T * E.opacity)
                  })
                : ((i = Math.ceil(g / v) * u), (t = i)),
            { visual: t, bounds: i }
        )
    },
    zd = (e) => {
        let t = e.ref.measureHeight || null
        return {
            cappedHeight: parseInt(e.style.maxHeight, 10) || null,
            fixedHeight: t === 0 ? null : t,
        }
    },
    aa = (e, t) => {
        let i = e.query('GET_ALLOW_REPLACE'),
            a = e.query('GET_ALLOW_MULTIPLE'),
            n = e.query('GET_TOTAL_ITEMS'),
            o = e.query('GET_MAX_FILES'),
            l = t.length
        return !a && l > 1
            ? (e.dispatch('DID_THROW_MAX_FILES', {
                  source: t,
                  error: ie('warning', 0, 'Max files'),
              }),
              !0)
            : ((o = a ? o : 1),
              !a && i
                  ? !1
                  : gt(o) && n + l > o
                    ? (e.dispatch('DID_THROW_MAX_FILES', {
                          source: t,
                          error: ie('warning', 0, 'Max files'),
                      }),
                      !0)
                    : !1)
    },
    Cd = (e, t, i) => {
        let a = e.childViews[0]
        return Ki(a, t, {
            left: i.scopeLeft - a.rect.element.left,
            top:
                i.scopeTop -
                (e.rect.outer.top +
                    e.rect.element.marginTop +
                    e.rect.element.scrollTop),
        })
    },
    mn = (e) => {
        let t = e.query('GET_ALLOW_DROP'),
            i = e.query('GET_DISABLED'),
            a = t && !i
        if (a && !e.ref.hopper) {
            let n = vd(
                e.element,
                (o) => {
                    let l = e.query('GET_BEFORE_DROP_FILE') || (() => !0)
                    return e.query('GET_DROP_VALIDATION')
                        ? o.every(
                              (s) =>
                                  tt('ALLOW_HOPPER_ITEM', s, {
                                      query: e.query,
                                  }).every((p) => p === !0) && l(s)
                          )
                        : !0
                },
                {
                    filterItems: (o) => {
                        let l = e.query('GET_IGNORED_FILES')
                        return o.filter((r) =>
                            Je(r) ? !l.includes(r.name.toLowerCase()) : !0
                        )
                    },
                    catchesDropsOnPage: e.query('GET_DROP_ON_PAGE'),
                    requiresDropOnElement: e.query('GET_DROP_ON_ELEMENT'),
                }
            )
            ;(n.onload = (o, l) => {
                let s = e.ref.list.childViews[0].childViews.filter(
                        (c) => c.rect.element.height
                    ),
                    p = e
                        .query('GET_ACTIVE_ITEMS')
                        .map((c) => s.find((d) => d.id === c.id))
                        .filter((c) => c)
                Ae('ADD_ITEMS', o, { dispatch: e.dispatch }).then((c) => {
                    if (aa(e, c)) return !1
                    e.dispatch('ADD_ITEMS', {
                        items: c,
                        index: Cd(e.ref.list, p, l),
                        interactionMethod: _e.DROP,
                    })
                }),
                    e.dispatch('DID_DROP', { position: l }),
                    e.dispatch('DID_END_DRAG', { position: l })
            }),
                (n.ondragstart = (o) => {
                    e.dispatch('DID_START_DRAG', { position: o })
                }),
                (n.ondrag = eo((o) => {
                    e.dispatch('DID_DRAG', { position: o })
                })),
                (n.ondragend = (o) => {
                    e.dispatch('DID_END_DRAG', { position: o })
                }),
                (e.ref.hopper = n),
                (e.ref.drip = e.appendChildView(e.createChildView(Uc)))
        } else
            !a &&
                e.ref.hopper &&
                (e.ref.hopper.destroy(),
                (e.ref.hopper = null),
                e.removeChildView(e.ref.drip))
    },
    un = (e, t) => {
        let i = e.query('GET_ALLOW_BROWSE'),
            a = e.query('GET_DISABLED'),
            n = i && !a
        n && !e.ref.browser
            ? (e.ref.browser = e.appendChildView(
                  e.createChildView(Pc, {
                      ...t,
                      onload: (o) => {
                          Ae('ADD_ITEMS', o, { dispatch: e.dispatch }).then(
                              (l) => {
                                  if (aa(e, l)) return !1
                                  e.dispatch('ADD_ITEMS', {
                                      items: l,
                                      index: -1,
                                      interactionMethod: _e.BROWSE,
                                  })
                              }
                          )
                      },
                  }),
                  0
              ))
            : !n &&
              e.ref.browser &&
              (e.removeChildView(e.ref.browser), (e.ref.browser = null))
    },
    fn = (e) => {
        let t = e.query('GET_ALLOW_PASTE'),
            i = e.query('GET_DISABLED'),
            a = t && !i
        a && !e.ref.paster
            ? ((e.ref.paster = yd()),
              (e.ref.paster.onload = (n) => {
                  Ae('ADD_ITEMS', n, { dispatch: e.dispatch }).then((o) => {
                      if (aa(e, o)) return !1
                      e.dispatch('ADD_ITEMS', {
                          items: o,
                          index: -1,
                          interactionMethod: _e.PASTE,
                      })
                  })
              }))
            : !a &&
              e.ref.paster &&
              (e.ref.paster.destroy(), (e.ref.paster = null))
    },
    Nd = he({
        DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
            un(e, t)
        },
        DID_SET_ALLOW_DROP: ({ root: e }) => {
            mn(e)
        },
        DID_SET_ALLOW_PASTE: ({ root: e }) => {
            fn(e)
        },
        DID_SET_DISABLED: ({ root: e, props: t }) => {
            mn(e),
                fn(e),
                un(e, t),
                e.query('GET_DISABLED')
                    ? (e.element.dataset.disabled = 'disabled')
                    : e.element.removeAttribute('data-disabled')
        },
    }),
    Bd = ne({
        name: 'root',
        read: ({ root: e }) => {
            e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight)
        },
        create: Od,
        write: Pd,
        destroy: ({ root: e }) => {
            e.ref.paster && e.ref.paster.destroy(),
                e.ref.hopper && e.ref.hopper.destroy(),
                e.element.removeEventListener('touchmove', ri),
                e.element.removeEventListener('gesturestart', ri)
        },
        mixins: { styles: ['height'] },
    }),
    kd = (e = {}) => {
        let t = null,
            i = oi(),
            a = ir(Gr(i), [os, Hr(i)], [Ms, Wr(i)])
        a.dispatch('SET_OPTIONS', { options: e })
        let n = () => {
            document.hidden || a.dispatch('KICK')
        }
        document.addEventListener('visibilitychange', n)
        let o = null,
            l = !1,
            r = !1,
            s = null,
            p = null,
            c = () => {
                l || (l = !0),
                    clearTimeout(o),
                    (o = setTimeout(() => {
                        ;(l = !1),
                            (s = null),
                            (p = null),
                            r && ((r = !1), a.dispatch('DID_STOP_RESIZE'))
                    }, 500))
            }
        window.addEventListener('resize', c)
        let d = Bd(a, { id: Yi() }),
            m = !1,
            u = !1,
            f = {
                _read: () => {
                    l &&
                        ((p = window.innerWidth),
                        s || (s = p),
                        !r &&
                            p !== s &&
                            (a.dispatch('DID_START_RESIZE'), (r = !0))),
                        u && m && (m = d.element.offsetParent === null),
                        !m && (d._read(), (u = d.rect.element.hidden))
                },
                _write: (R) => {
                    let L = a
                        .processActionQueue()
                        .filter((z) => !/^SET_/.test(z.type))
                    ;(m && !L.length) ||
                        (E(L),
                        (m = d._write(R, L, r)),
                        qr(a.query('GET_ITEMS')),
                        m && a.processDispatchQueue())
                },
            },
            h = (R) => (L) => {
                let z = { type: R }
                if (!L) return z
                if (
                    (L.hasOwnProperty('error') &&
                        (z.error = L.error ? { ...L.error } : null),
                    L.status && (z.status = { ...L.status }),
                    L.file && (z.output = L.file),
                    L.source)
                )
                    z.file = L.source
                else if (L.item || L.id) {
                    let D = L.item ? L.item : a.query('GET_ITEM', L.id)
                    z.file = D ? ge(D) : null
                }
                return (
                    L.items && (z.items = L.items.map(ge)),
                    /progress/.test(R) && (z.progress = L.progress),
                    L.hasOwnProperty('origin') &&
                        L.hasOwnProperty('target') &&
                        ((z.origin = L.origin), (z.target = L.target)),
                    z
                )
            },
            g = {
                DID_DESTROY: h('destroy'),
                DID_INIT: h('init'),
                DID_THROW_MAX_FILES: h('warning'),
                DID_INIT_ITEM: h('initfile'),
                DID_START_ITEM_LOAD: h('addfilestart'),
                DID_UPDATE_ITEM_LOAD_PROGRESS: h('addfileprogress'),
                DID_LOAD_ITEM: h('addfile'),
                DID_THROW_ITEM_INVALID: [h('error'), h('addfile')],
                DID_THROW_ITEM_LOAD_ERROR: [h('error'), h('addfile')],
                DID_THROW_ITEM_REMOVE_ERROR: [h('error'), h('removefile')],
                DID_PREPARE_OUTPUT: h('preparefile'),
                DID_START_ITEM_PROCESSING: h('processfilestart'),
                DID_UPDATE_ITEM_PROCESS_PROGRESS: h('processfileprogress'),
                DID_ABORT_ITEM_PROCESSING: h('processfileabort'),
                DID_COMPLETE_ITEM_PROCESSING: h('processfile'),
                DID_COMPLETE_ITEM_PROCESSING_ALL: h('processfiles'),
                DID_REVERT_ITEM_PROCESSING: h('processfilerevert'),
                DID_THROW_ITEM_PROCESSING_ERROR: [h('error'), h('processfile')],
                DID_REMOVE_ITEM: h('removefile'),
                DID_UPDATE_ITEMS: h('updatefiles'),
                DID_ACTIVATE_ITEM: h('activatefile'),
                DID_REORDER_ITEMS: h('reorderfiles'),
            },
            v = (R) => {
                let L = { pond: F, ...R }
                delete L.type,
                    d.element.dispatchEvent(
                        new CustomEvent(`FilePond:${R.type}`, {
                            detail: L,
                            bubbles: !0,
                            cancelable: !0,
                            composed: !0,
                        })
                    )
                let z = []
                R.hasOwnProperty('error') && z.push(R.error),
                    R.hasOwnProperty('file') && z.push(R.file)
                let D = ['type', 'error', 'file']
                Object.keys(R)
                    .filter((B) => !D.includes(B))
                    .forEach((B) => z.push(R[B])),
                    F.fire(R.type, ...z)
                let k = a.query(`GET_ON${R.type.toUpperCase()}`)
                k && k(...z)
            },
            E = (R) => {
                R.length &&
                    R.filter((L) => g[L.type]).forEach((L) => {
                        let z = g[L.type]
                        ;(Array.isArray(z) ? z : [z]).forEach((D) => {
                            L.type === 'DID_INIT_ITEM'
                                ? v(D(L.data))
                                : setTimeout(() => {
                                      v(D(L.data))
                                  }, 0)
                        })
                    })
            },
            T = (R) => a.dispatch('SET_OPTIONS', { options: R }),
            I = (R) => a.query('GET_ACTIVE_ITEM', R),
            y = (R) =>
                new Promise((L, z) => {
                    a.dispatch('REQUEST_ITEM_PREPARE', {
                        query: R,
                        success: (D) => {
                            L(D)
                        },
                        failure: (D) => {
                            z(D)
                        },
                    })
                }),
            b = (R, L = {}) =>
                new Promise((z, D) => {
                    _([{ source: R, options: L }], { index: L.index })
                        .then((k) => z(k && k[0]))
                        .catch(D)
                }),
            w = (R) => R.file && R.id,
            x = (R, L) => (
                typeof R == 'object' && !w(R) && !L && ((L = R), (R = void 0)),
                a.dispatch('REMOVE_ITEM', { ...L, query: R }),
                a.query('GET_ACTIVE_ITEM', R) === null
            ),
            _ = (...R) =>
                new Promise((L, z) => {
                    let D = [],
                        k = {}
                    if (si(R[0]))
                        D.push.apply(D, R[0]), Object.assign(k, R[1] || {})
                    else {
                        let B = R[R.length - 1]
                        typeof B == 'object' &&
                            !(B instanceof Blob) &&
                            Object.assign(k, R.pop()),
                            D.push(...R)
                    }
                    a.dispatch('ADD_ITEMS', {
                        items: D,
                        index: k.index,
                        interactionMethod: _e.API,
                        success: L,
                        failure: z,
                    })
                }),
            P = () => a.query('GET_ACTIVE_ITEMS'),
            O = (R) =>
                new Promise((L, z) => {
                    a.dispatch('REQUEST_ITEM_PROCESSING', {
                        query: R,
                        success: (D) => {
                            L(D)
                        },
                        failure: (D) => {
                            z(D)
                        },
                    })
                }),
            M = (...R) => {
                let L = Array.isArray(R[0]) ? R[0] : R,
                    z = L.length ? L : P()
                return Promise.all(z.map(y))
            },
            C = (...R) => {
                let L = Array.isArray(R[0]) ? R[0] : R
                if (!L.length) {
                    let z = P().filter(
                        (D) =>
                            !(D.status === W.IDLE && D.origin === re.LOCAL) &&
                            D.status !== W.PROCESSING &&
                            D.status !== W.PROCESSING_COMPLETE &&
                            D.status !== W.PROCESSING_REVERT_ERROR
                    )
                    return Promise.all(z.map(O))
                }
                return Promise.all(L.map(O))
            },
            S = (...R) => {
                let L = Array.isArray(R[0]) ? R[0] : R,
                    z
                typeof L[L.length - 1] == 'object'
                    ? (z = L.pop())
                    : Array.isArray(R[0]) && (z = R[1])
                let D = P()
                return L.length
                    ? L.map((B) => ($e(B) ? (D[B] ? D[B].id : null) : B))
                          .filter((B) => B)
                          .map((B) => x(B, z))
                    : Promise.all(D.map((B) => x(B, z)))
            },
            F = {
                ...pi(),
                ...f,
                ...Ur(a, i),
                setOptions: T,
                addFile: b,
                addFiles: _,
                getFile: I,
                processFile: O,
                prepareFile: y,
                removeFile: x,
                moveFile: (R, L) =>
                    a.dispatch('MOVE_ITEM', { query: R, index: L }),
                getFiles: P,
                processFiles: C,
                removeFiles: S,
                prepareFiles: M,
                sort: (R) => a.dispatch('SORT', { compare: R }),
                browse: () => {
                    var R = d.element.querySelector('input[type=file]')
                    R && R.click()
                },
                destroy: () => {
                    F.fire('destroy', d.element),
                        a.dispatch('ABORT_ALL'),
                        d._destroy(),
                        window.removeEventListener('resize', c),
                        document.removeEventListener('visibilitychange', n),
                        a.dispatch('DID_DESTROY')
                },
                insertBefore: (R) => Ca(d.element, R),
                insertAfter: (R) => Na(d.element, R),
                appendTo: (R) => R.appendChild(d.element),
                replaceElement: (R) => {
                    Ca(d.element, R), R.parentNode.removeChild(R), (t = R)
                },
                restoreElement: () => {
                    t &&
                        (Na(t, d.element),
                        d.element.parentNode.removeChild(d.element),
                        (t = null))
                },
                isAttachedTo: (R) => d.element === R || t === R,
                element: { get: () => d.element },
                status: { get: () => a.query('GET_STATUS') },
            }
        return a.dispatch('DID_INIT'), We(F)
    },
    to = (e = {}) => {
        let t = {}
        return (
            te(oi(), (a, n) => {
                t[a] = n[0]
            }),
            kd({ ...t, ...e })
        )
    },
    Vd = (e) => e.charAt(0).toLowerCase() + e.slice(1),
    Gd = (e) => Jn(e.replace(/^data-/, '')),
    io = (e, t) => {
        te(t, (i, a) => {
            te(e, (n, o) => {
                let l = new RegExp(i)
                if (!l.test(n) || (delete e[n], a === !1)) return
                if (fe(a)) {
                    e[a] = o
                    return
                }
                let s = a.group
                ce(a) && !e[s] && (e[s] = {}), (e[s][Vd(n.replace(l, ''))] = o)
            }),
                a.mapping && io(e[a.group], a.mapping)
        })
    },
    Ud = (e, t = {}) => {
        let i = []
        te(e.attributes, (n) => {
            i.push(e.attributes[n])
        })
        let a = i
            .filter((n) => n.name)
            .reduce((n, o) => {
                let l = se(e, o.name)
                return (n[Gd(o.name)] = l === o.name ? !0 : l), n
            }, {})
        return io(a, t), a
    },
    Wd = (e, t = {}) => {
        let i = {
            '^class$': 'className',
            '^multiple$': 'allowMultiple',
            '^capture$': 'captureMethod',
            '^webkitdirectory$': 'allowDirectoriesOnly',
            '^server': {
                group: 'server',
                mapping: {
                    '^process': { group: 'process' },
                    '^revert': { group: 'revert' },
                    '^fetch': { group: 'fetch' },
                    '^restore': { group: 'restore' },
                    '^load': { group: 'load' },
                },
            },
            '^type$': !1,
            '^files$': !1,
        }
        tt('SET_ATTRIBUTE_TO_OPTION_MAP', i)
        let a = { ...t },
            n = Ud(
                e.nodeName === 'FIELDSET'
                    ? e.querySelector('input[type=file]')
                    : e,
                i
            )
        Object.keys(n).forEach((l) => {
            ce(n[l])
                ? (ce(a[l]) || (a[l] = {}), Object.assign(a[l], n[l]))
                : (a[l] = n[l])
        }),
            (a.files = (t.files || []).concat(
                Array.from(e.querySelectorAll('input:not([type=file])')).map(
                    (l) => ({
                        source: l.value,
                        options: { type: l.dataset.type },
                    })
                )
            ))
        let o = to(a)
        return (
            e.files &&
                Array.from(e.files).forEach((l) => {
                    o.addFile(l)
                }),
            o.replaceElement(e),
            o
        )
    },
    Hd = (...e) => (tr(e[0]) ? Wd(...e) : to(...e)),
    jd = ['fire', '_read', '_write'],
    hn = (e) => {
        let t = {}
        return yn(e, t, jd), t
    },
    Yd = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (i, a) => t[a]),
    qd = (e) => {
        let t = new Blob(['(', e.toString(), ')()'], {
                type: 'application/javascript',
            }),
            i = URL.createObjectURL(t),
            a = new Worker(i)
        return {
            transfer: (n, o) => {},
            post: (n, o, l) => {
                let r = Yi()
                ;(a.onmessage = (s) => {
                    s.data.id === r && o(s.data.message)
                }),
                    a.postMessage({ id: r, message: n }, l)
            },
            terminate: () => {
                a.terminate(), URL.revokeObjectURL(i)
            },
        }
    },
    $d = (e) =>
        new Promise((t, i) => {
            let a = new Image()
            ;(a.onload = () => {
                t(a)
            }),
                (a.onerror = (n) => {
                    i(n)
                }),
                (a.src = e)
        }),
    ao = (e, t) => {
        let i = e.slice(0, e.size, e.type)
        return (i.lastModifiedDate = e.lastModifiedDate), (i.name = t), i
    },
    Xd = (e) => ao(e, e.name),
    gn = [],
    Qd = (e) => {
        if (gn.includes(e)) return
        gn.push(e)
        let t = e({
            addFilter: Xr,
            utils: {
                Type: A,
                forin: te,
                isString: fe,
                isFile: Je,
                toNaturalFileSize: Cn,
                replaceInString: Yd,
                getExtensionFromFilename: mi,
                getFilenameWithoutExtension: Dn,
                guesstimateMimeType: qn,
                getFileFromBlob: ht,
                getFilenameFromURL: Ft,
                createRoute: he,
                createWorker: qd,
                createView: ne,
                createItemAPI: ge,
                loadImage: $d,
                copyFile: Xd,
                renameFile: ao,
                createBlob: Mn,
                applyFilterChain: Ae,
                text: ae,
                getNumericAspectRatioFromString: wn,
            },
            views: { fileActionButton: zn },
        })
        Qr(t.options)
    },
    Zd = () =>
        Object.prototype.toString.call(window.operamini) ===
        '[object OperaMini]',
    Kd = () => 'Promise' in window,
    Jd = () => 'slice' in Blob.prototype,
    ep = () => 'URL' in window && 'createObjectURL' in window.URL,
    tp = () => 'visibilityState' in document,
    ip = () => 'performance' in window,
    ap = () => 'supports' in (window.CSS || {}),
    np = () => /MSIE|Trident/.test(window.navigator.userAgent),
    Vi = (() => {
        let e =
            En() &&
            !Zd() &&
            tp() &&
            Kd() &&
            Jd() &&
            ep() &&
            ip() &&
            (ap() || np())
        return () => e
    })(),
    Ue = { apps: [] },
    op = 'filepond',
    it = () => {},
    no = {},
    Et = {},
    zt = {},
    Gi = {},
    ut = it,
    ft = it,
    Ui = it,
    Wi = it,
    Ie = it,
    Hi = it,
    Dt = it
if (Vi()) {
    Sr(
        () => {
            Ue.apps.forEach((i) => i._read())
        },
        (i) => {
            Ue.apps.forEach((a) => a._write(i))
        }
    )
    let e = () => {
        document.dispatchEvent(
            new CustomEvent('FilePond:loaded', {
                detail: {
                    supported: Vi,
                    create: ut,
                    destroy: ft,
                    parse: Ui,
                    find: Wi,
                    registerPlugin: Ie,
                    setOptions: Dt,
                },
            })
        ),
            document.removeEventListener('DOMContentLoaded', e)
    }
    document.readyState !== 'loading'
        ? setTimeout(() => e(), 0)
        : document.addEventListener('DOMContentLoaded', e)
    let t = () =>
        te(oi(), (i, a) => {
            Gi[i] = a[1]
        })
    ;(no = { ...Sn }),
        (zt = { ...re }),
        (Et = { ...W }),
        (Gi = {}),
        t(),
        (ut = (...i) => {
            let a = Hd(...i)
            return a.on('destroy', ft), Ue.apps.push(a), hn(a)
        }),
        (ft = (i) => {
            let a = Ue.apps.findIndex((n) => n.isAttachedTo(i))
            return a >= 0 ? (Ue.apps.splice(a, 1)[0].restoreElement(), !0) : !1
        }),
        (Ui = (i) =>
            Array.from(i.querySelectorAll(`.${op}`))
                .filter((o) => !Ue.apps.find((l) => l.isAttachedTo(o)))
                .map((o) => ut(o))),
        (Wi = (i) => {
            let a = Ue.apps.find((n) => n.isAttachedTo(i))
            return a ? hn(a) : null
        }),
        (Ie = (...i) => {
            i.forEach(Qd), t()
        }),
        (Hi = () => {
            let i = {}
            return (
                te(oi(), (a, n) => {
                    i[a] = n[0]
                }),
                i
            )
        }),
        (Dt = (i) => (
            ce(i) &&
                (Ue.apps.forEach((a) => {
                    a.setOptions(i)
                }),
                Zr(i)),
            Hi()
        ))
}
function oo(e, t) {
    var i = Object.keys(e)
    if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e)
        t &&
            (a = a.filter(function (n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable
            })),
            i.push.apply(i, a)
    }
    return i
}
function xo(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t] != null ? arguments[t] : {}
        t % 2
            ? oo(Object(i), !0).forEach(function (a) {
                  cp(e, a, i[a])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
              : oo(Object(i)).forEach(function (a) {
                    Object.defineProperty(
                        e,
                        a,
                        Object.getOwnPropertyDescriptor(i, a)
                    )
                })
    }
    return e
}
function lp(e, t) {
    if (typeof e != 'object' || !e) return e
    var i = e[Symbol.toPrimitive]
    if (i !== void 0) {
        var a = i.call(e, t || 'default')
        if (typeof a != 'object') return a
        throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return (t === 'string' ? String : Number)(e)
}
function yo(e) {
    var t = lp(e, 'string')
    return typeof t == 'symbol' ? t : t + ''
}
function ra(e) {
    '@babel/helpers - typeof'
    return (
        (ra =
            typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (t) {
                      return typeof t
                  }
                : function (t) {
                      return t &&
                          typeof Symbol == 'function' &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t
                  }),
        ra(e)
    )
}
function rp(e, t) {
    if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
}
function lo(e, t) {
    for (var i = 0; i < t.length; i++) {
        var a = t[i]
        ;(a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            'value' in a && (a.writable = !0),
            Object.defineProperty(e, yo(a.key), a)
    }
}
function sp(e, t, i) {
    return (
        t && lo(e.prototype, t),
        i && lo(e, i),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        e
    )
}
function cp(e, t, i) {
    return (
        (t = yo(t)),
        t in e
            ? Object.defineProperty(e, t, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[t] = i),
        e
    )
}
function _o(e) {
    return dp(e) || pp(e) || mp(e) || up()
}
function dp(e) {
    if (Array.isArray(e)) return sa(e)
}
function pp(e) {
    if (
        (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
        e['@@iterator'] != null
    )
        return Array.from(e)
}
function mp(e, t) {
    if (e) {
        if (typeof e == 'string') return sa(e, t)
        var i = Object.prototype.toString.call(e).slice(8, -1)
        if (
            (i === 'Object' && e.constructor && (i = e.constructor.name),
            i === 'Map' || i === 'Set')
        )
            return Array.from(e)
        if (
            i === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
        )
            return sa(e, t)
    }
}
function sa(e, t) {
    ;(t == null || t > e.length) && (t = e.length)
    for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i]
    return a
}
function up() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var bi = typeof window < 'u' && typeof window.document < 'u',
    Fe = bi ? window : {},
    Ea =
        bi && Fe.document.documentElement
            ? 'ontouchstart' in Fe.document.documentElement
            : !1,
    ba = bi ? 'PointerEvent' in Fe : !1,
    K = 'cropper',
    Ta = 'all',
    Ro = 'crop',
    wo = 'move',
    So = 'zoom',
    at = 'e',
    nt = 'w',
    bt = 's',
    He = 'n',
    Ct = 'ne',
    Nt = 'nw',
    Bt = 'se',
    kt = 'sw',
    ca = ''.concat(K, '-crop'),
    ro = ''.concat(K, '-disabled'),
    be = ''.concat(K, '-hidden'),
    so = ''.concat(K, '-hide'),
    fp = ''.concat(K, '-invisible'),
    Ei = ''.concat(K, '-modal'),
    da = ''.concat(K, '-move'),
    Gt = ''.concat(K, 'Action'),
    hi = ''.concat(K, 'Preview'),
    va = 'crop',
    Lo = 'move',
    Ao = 'none',
    pa = 'crop',
    ma = 'cropend',
    ua = 'cropmove',
    fa = 'cropstart',
    co = 'dblclick',
    hp = Ea ? 'touchstart' : 'mousedown',
    gp = Ea ? 'touchmove' : 'mousemove',
    Ep = Ea ? 'touchend touchcancel' : 'mouseup',
    po = ba ? 'pointerdown' : hp,
    mo = ba ? 'pointermove' : gp,
    uo = ba ? 'pointerup pointercancel' : Ep,
    fo = 'ready',
    ho = 'resize',
    go = 'wheel',
    ha = 'zoom',
    Eo = 'image/jpeg',
    bp = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,
    Tp = /^data:/,
    vp = /^data:image\/jpeg;base64,/,
    Ip = /^img|canvas$/i,
    Mo = 200,
    Oo = 100,
    bo = {
        viewMode: 0,
        dragMode: va,
        initialAspectRatio: NaN,
        aspectRatio: NaN,
        data: null,
        preview: '',
        responsive: !0,
        restore: !0,
        checkCrossOrigin: !0,
        checkOrientation: !0,
        modal: !0,
        guides: !0,
        center: !0,
        highlight: !0,
        background: !0,
        autoCrop: !0,
        autoCropArea: 0.8,
        movable: !0,
        rotatable: !0,
        scalable: !0,
        zoomable: !0,
        zoomOnTouch: !0,
        zoomOnWheel: !0,
        wheelZoomRatio: 0.1,
        cropBoxMovable: !0,
        cropBoxResizable: !0,
        toggleDragModeOnDblclick: !0,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        minContainerWidth: Mo,
        minContainerHeight: Oo,
        ready: null,
        cropstart: null,
        cropmove: null,
        cropend: null,
        crop: null,
        zoom: null,
    },
    xp =
        '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',
    yp = Number.isNaN || Fe.isNaN
function j(e) {
    return typeof e == 'number' && !yp(e)
}
var To = function (t) {
    return t > 0 && t < 1 / 0
}
function oa(e) {
    return typeof e > 'u'
}
function ot(e) {
    return ra(e) === 'object' && e !== null
}
var _p = Object.prototype.hasOwnProperty
function Tt(e) {
    if (!ot(e)) return !1
    try {
        var t = e.constructor,
            i = t.prototype
        return t && i && _p.call(i, 'isPrototypeOf')
    } catch {
        return !1
    }
}
function Ee(e) {
    return typeof e == 'function'
}
var Rp = Array.prototype.slice
function Po(e) {
    return Array.from ? Array.from(e) : Rp.call(e)
}
function oe(e, t) {
    return (
        e &&
            Ee(t) &&
            (Array.isArray(e) || j(e.length)
                ? Po(e).forEach(function (i, a) {
                      t.call(e, i, a, e)
                  })
                : ot(e) &&
                  Object.keys(e).forEach(function (i) {
                      t.call(e, e[i], i, e)
                  })),
        e
    )
}
var J =
        Object.assign ||
        function (t) {
            for (
                var i = arguments.length,
                    a = new Array(i > 1 ? i - 1 : 0),
                    n = 1;
                n < i;
                n++
            )
                a[n - 1] = arguments[n]
            return (
                ot(t) &&
                    a.length > 0 &&
                    a.forEach(function (o) {
                        ot(o) &&
                            Object.keys(o).forEach(function (l) {
                                t[l] = o[l]
                            })
                    }),
                t
            )
        },
    wp = /\.\d*(?:0|9){12}\d*$/
function It(e) {
    var t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11
    return wp.test(e) ? Math.round(e * t) / t : e
}
var Sp = /^width|height|left|top|marginLeft|marginTop$/
function je(e, t) {
    var i = e.style
    oe(t, function (a, n) {
        Sp.test(n) && j(a) && (a = ''.concat(a, 'px')), (i[n] = a)
    })
}
function Lp(e, t) {
    return e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1
}
function de(e, t) {
    if (t) {
        if (j(e.length)) {
            oe(e, function (a) {
                de(a, t)
            })
            return
        }
        if (e.classList) {
            e.classList.add(t)
            return
        }
        var i = e.className.trim()
        i
            ? i.indexOf(t) < 0 && (e.className = ''.concat(i, ' ').concat(t))
            : (e.className = t)
    }
}
function De(e, t) {
    if (t) {
        if (j(e.length)) {
            oe(e, function (i) {
                De(i, t)
            })
            return
        }
        if (e.classList) {
            e.classList.remove(t)
            return
        }
        e.className.indexOf(t) >= 0 &&
            (e.className = e.className.replace(t, ''))
    }
}
function vt(e, t, i) {
    if (t) {
        if (j(e.length)) {
            oe(e, function (a) {
                vt(a, t, i)
            })
            return
        }
        i ? de(e, t) : De(e, t)
    }
}
var Ap = /([a-z\d])([A-Z])/g
function Ia(e) {
    return e.replace(Ap, '$1-$2').toLowerCase()
}
function ga(e, t) {
    return ot(e[t])
        ? e[t]
        : e.dataset
          ? e.dataset[t]
          : e.getAttribute('data-'.concat(Ia(t)))
}
function Ut(e, t, i) {
    ot(i)
        ? (e[t] = i)
        : e.dataset
          ? (e.dataset[t] = i)
          : e.setAttribute('data-'.concat(Ia(t)), i)
}
function Mp(e, t) {
    if (ot(e[t]))
        try {
            delete e[t]
        } catch {
            e[t] = void 0
        }
    else if (e.dataset)
        try {
            delete e.dataset[t]
        } catch {
            e.dataset[t] = void 0
        }
    else e.removeAttribute('data-'.concat(Ia(t)))
}
var Do = /\s\s*/,
    Fo = (function () {
        var e = !1
        if (bi) {
            var t = !1,
                i = function () {},
                a = Object.defineProperty({}, 'once', {
                    get: function () {
                        return (e = !0), t
                    },
                    set: function (o) {
                        t = o
                    },
                })
            Fe.addEventListener('test', i, a),
                Fe.removeEventListener('test', i, a)
        }
        return e
    })()
function Pe(e, t, i) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
        n = i
    t.trim()
        .split(Do)
        .forEach(function (o) {
            if (!Fo) {
                var l = e.listeners
                l &&
                    l[o] &&
                    l[o][i] &&
                    ((n = l[o][i]),
                    delete l[o][i],
                    Object.keys(l[o]).length === 0 && delete l[o],
                    Object.keys(l).length === 0 && delete e.listeners)
            }
            e.removeEventListener(o, n, a)
        })
}
function Re(e, t, i) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
        n = i
    t.trim()
        .split(Do)
        .forEach(function (o) {
            if (a.once && !Fo) {
                var l = e.listeners,
                    r = l === void 0 ? {} : l
                ;(n = function () {
                    delete r[o][i], e.removeEventListener(o, n, a)
                    for (
                        var p = arguments.length, c = new Array(p), d = 0;
                        d < p;
                        d++
                    )
                        c[d] = arguments[d]
                    i.apply(e, c)
                }),
                    r[o] || (r[o] = {}),
                    r[o][i] && e.removeEventListener(o, r[o][i], a),
                    (r[o][i] = n),
                    (e.listeners = r)
            }
            e.addEventListener(o, n, a)
        })
}
function xt(e, t, i) {
    var a
    return (
        Ee(Event) && Ee(CustomEvent)
            ? (a = new CustomEvent(t, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
              }))
            : ((a = document.createEvent('CustomEvent')),
              a.initCustomEvent(t, !0, !0, i)),
        e.dispatchEvent(a)
    )
}
function zo(e) {
    var t = e.getBoundingClientRect()
    return {
        left:
            t.left + (window.pageXOffset - document.documentElement.clientLeft),
        top: t.top + (window.pageYOffset - document.documentElement.clientTop),
    }
}
var la = Fe.location,
    Op = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i
function vo(e) {
    var t = e.match(Op)
    return (
        t !== null &&
        (t[1] !== la.protocol || t[2] !== la.hostname || t[3] !== la.port)
    )
}
function Io(e) {
    var t = 'timestamp='.concat(new Date().getTime())
    return e + (e.indexOf('?') === -1 ? '?' : '&') + t
}
function Vt(e) {
    var t = e.rotate,
        i = e.scaleX,
        a = e.scaleY,
        n = e.translateX,
        o = e.translateY,
        l = []
    j(n) && n !== 0 && l.push('translateX('.concat(n, 'px)')),
        j(o) && o !== 0 && l.push('translateY('.concat(o, 'px)')),
        j(t) && t !== 0 && l.push('rotate('.concat(t, 'deg)')),
        j(i) && i !== 1 && l.push('scaleX('.concat(i, ')')),
        j(a) && a !== 1 && l.push('scaleY('.concat(a, ')'))
    var r = l.length ? l.join(' ') : 'none'
    return { WebkitTransform: r, msTransform: r, transform: r }
}
function Pp(e) {
    var t = xo({}, e),
        i = 0
    return (
        oe(e, function (a, n) {
            delete t[n],
                oe(t, function (o) {
                    var l = Math.abs(a.startX - o.startX),
                        r = Math.abs(a.startY - o.startY),
                        s = Math.abs(a.endX - o.endX),
                        p = Math.abs(a.endY - o.endY),
                        c = Math.sqrt(l * l + r * r),
                        d = Math.sqrt(s * s + p * p),
                        m = (d - c) / c
                    Math.abs(m) > Math.abs(i) && (i = m)
                })
        }),
        i
    )
}
function gi(e, t) {
    var i = e.pageX,
        a = e.pageY,
        n = { endX: i, endY: a }
    return t ? n : xo({ startX: i, startY: a }, n)
}
function Dp(e) {
    var t = 0,
        i = 0,
        a = 0
    return (
        oe(e, function (n) {
            var o = n.startX,
                l = n.startY
            ;(t += o), (i += l), (a += 1)
        }),
        (t /= a),
        (i /= a),
        { pageX: t, pageY: i }
    )
}
function Ye(e) {
    var t = e.aspectRatio,
        i = e.height,
        a = e.width,
        n =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : 'contain',
        o = To(a),
        l = To(i)
    if (o && l) {
        var r = i * t
        ;(n === 'contain' && r > a) || (n === 'cover' && r < a)
            ? (i = a / t)
            : (a = i * t)
    } else o ? (i = a / t) : l && (a = i * t)
    return { width: a, height: i }
}
function Fp(e) {
    var t = e.width,
        i = e.height,
        a = e.degree
    if (((a = Math.abs(a) % 180), a === 90)) return { width: i, height: t }
    var n = ((a % 90) * Math.PI) / 180,
        o = Math.sin(n),
        l = Math.cos(n),
        r = t * l + i * o,
        s = t * o + i * l
    return a > 90 ? { width: s, height: r } : { width: r, height: s }
}
function zp(e, t, i, a) {
    var n = t.aspectRatio,
        o = t.naturalWidth,
        l = t.naturalHeight,
        r = t.rotate,
        s = r === void 0 ? 0 : r,
        p = t.scaleX,
        c = p === void 0 ? 1 : p,
        d = t.scaleY,
        m = d === void 0 ? 1 : d,
        u = i.aspectRatio,
        f = i.naturalWidth,
        h = i.naturalHeight,
        g = a.fillColor,
        v = g === void 0 ? 'transparent' : g,
        E = a.imageSmoothingEnabled,
        T = E === void 0 ? !0 : E,
        I = a.imageSmoothingQuality,
        y = I === void 0 ? 'low' : I,
        b = a.maxWidth,
        w = b === void 0 ? 1 / 0 : b,
        x = a.maxHeight,
        _ = x === void 0 ? 1 / 0 : x,
        P = a.minWidth,
        O = P === void 0 ? 0 : P,
        M = a.minHeight,
        C = M === void 0 ? 0 : M,
        S = document.createElement('canvas'),
        F = S.getContext('2d'),
        R = Ye({ aspectRatio: u, width: w, height: _ }),
        L = Ye({ aspectRatio: u, width: O, height: C }, 'cover'),
        z = Math.min(R.width, Math.max(L.width, f)),
        D = Math.min(R.height, Math.max(L.height, h)),
        k = Ye({ aspectRatio: n, width: w, height: _ }),
        B = Ye({ aspectRatio: n, width: O, height: C }, 'cover'),
        X = Math.min(k.width, Math.max(B.width, o)),
        q = Math.min(k.height, Math.max(B.height, l)),
        Q = [-X / 2, -q / 2, X, q]
    return (
        (S.width = It(z)),
        (S.height = It(D)),
        (F.fillStyle = v),
        F.fillRect(0, 0, z, D),
        F.save(),
        F.translate(z / 2, D / 2),
        F.rotate((s * Math.PI) / 180),
        F.scale(c, m),
        (F.imageSmoothingEnabled = T),
        (F.imageSmoothingQuality = y),
        F.drawImage.apply(
            F,
            [e].concat(
                _o(
                    Q.map(function (pe) {
                        return Math.floor(It(pe))
                    })
                )
            )
        ),
        F.restore(),
        S
    )
}
var Co = String.fromCharCode
function Cp(e, t, i) {
    var a = ''
    i += t
    for (var n = t; n < i; n += 1) a += Co(e.getUint8(n))
    return a
}
var Np = /^data:.*,/
function Bp(e) {
    var t = e.replace(Np, ''),
        i = atob(t),
        a = new ArrayBuffer(i.length),
        n = new Uint8Array(a)
    return (
        oe(n, function (o, l) {
            n[l] = i.charCodeAt(l)
        }),
        a
    )
}
function kp(e, t) {
    for (var i = [], a = 8192, n = new Uint8Array(e); n.length > 0; )
        i.push(Co.apply(null, Po(n.subarray(0, a)))), (n = n.subarray(a))
    return 'data:'.concat(t, ';base64,').concat(btoa(i.join('')))
}
function Vp(e) {
    var t = new DataView(e),
        i
    try {
        var a, n, o
        if (t.getUint8(0) === 255 && t.getUint8(1) === 216)
            for (var l = t.byteLength, r = 2; r + 1 < l; ) {
                if (t.getUint8(r) === 255 && t.getUint8(r + 1) === 225) {
                    n = r
                    break
                }
                r += 1
            }
        if (n) {
            var s = n + 4,
                p = n + 10
            if (Cp(t, s, 4) === 'Exif') {
                var c = t.getUint16(p)
                if (
                    ((a = c === 18761),
                    (a || c === 19789) && t.getUint16(p + 2, a) === 42)
                ) {
                    var d = t.getUint32(p + 4, a)
                    d >= 8 && (o = p + d)
                }
            }
        }
        if (o) {
            var m = t.getUint16(o, a),
                u,
                f
            for (f = 0; f < m; f += 1)
                if (((u = o + f * 12 + 2), t.getUint16(u, a) === 274)) {
                    ;(u += 8), (i = t.getUint16(u, a)), t.setUint16(u, 1, a)
                    break
                }
        }
    } catch {
        i = 1
    }
    return i
}
function Gp(e) {
    var t = 0,
        i = 1,
        a = 1
    switch (e) {
        case 2:
            i = -1
            break
        case 3:
            t = -180
            break
        case 4:
            a = -1
            break
        case 5:
            ;(t = 90), (a = -1)
            break
        case 6:
            t = 90
            break
        case 7:
            ;(t = 90), (i = -1)
            break
        case 8:
            t = -90
            break
    }
    return { rotate: t, scaleX: i, scaleY: a }
}
var Up = {
        render: function () {
            this.initContainer(),
                this.initCanvas(),
                this.initCropBox(),
                this.renderCanvas(),
                this.cropped && this.renderCropBox()
        },
        initContainer: function () {
            var t = this.element,
                i = this.options,
                a = this.container,
                n = this.cropper,
                o = Number(i.minContainerWidth),
                l = Number(i.minContainerHeight)
            de(n, be), De(t, be)
            var r = {
                width: Math.max(a.offsetWidth, o >= 0 ? o : Mo),
                height: Math.max(a.offsetHeight, l >= 0 ? l : Oo),
            }
            ;(this.containerData = r),
                je(n, { width: r.width, height: r.height }),
                de(t, be),
                De(n, be)
        },
        initCanvas: function () {
            var t = this.containerData,
                i = this.imageData,
                a = this.options.viewMode,
                n = Math.abs(i.rotate) % 180 === 90,
                o = n ? i.naturalHeight : i.naturalWidth,
                l = n ? i.naturalWidth : i.naturalHeight,
                r = o / l,
                s = t.width,
                p = t.height
            t.height * r > t.width
                ? a === 3
                    ? (s = t.height * r)
                    : (p = t.width / r)
                : a === 3
                  ? (p = t.width / r)
                  : (s = t.height * r)
            var c = {
                aspectRatio: r,
                naturalWidth: o,
                naturalHeight: l,
                width: s,
                height: p,
            }
            ;(this.canvasData = c),
                (this.limited = a === 1 || a === 2),
                this.limitCanvas(!0, !0),
                (c.width = Math.min(Math.max(c.width, c.minWidth), c.maxWidth)),
                (c.height = Math.min(
                    Math.max(c.height, c.minHeight),
                    c.maxHeight
                )),
                (c.left = (t.width - c.width) / 2),
                (c.top = (t.height - c.height) / 2),
                (c.oldLeft = c.left),
                (c.oldTop = c.top),
                (this.initialCanvasData = J({}, c))
        },
        limitCanvas: function (t, i) {
            var a = this.options,
                n = this.containerData,
                o = this.canvasData,
                l = this.cropBoxData,
                r = a.viewMode,
                s = o.aspectRatio,
                p = this.cropped && l
            if (t) {
                var c = Number(a.minCanvasWidth) || 0,
                    d = Number(a.minCanvasHeight) || 0
                r > 1
                    ? ((c = Math.max(c, n.width)),
                      (d = Math.max(d, n.height)),
                      r === 3 && (d * s > c ? (c = d * s) : (d = c / s)))
                    : r > 0 &&
                      (c
                          ? (c = Math.max(c, p ? l.width : 0))
                          : d
                            ? (d = Math.max(d, p ? l.height : 0))
                            : p &&
                              ((c = l.width),
                              (d = l.height),
                              d * s > c ? (c = d * s) : (d = c / s)))
                var m = Ye({ aspectRatio: s, width: c, height: d })
                ;(c = m.width),
                    (d = m.height),
                    (o.minWidth = c),
                    (o.minHeight = d),
                    (o.maxWidth = 1 / 0),
                    (o.maxHeight = 1 / 0)
            }
            if (i)
                if (r > (p ? 0 : 1)) {
                    var u = n.width - o.width,
                        f = n.height - o.height
                    ;(o.minLeft = Math.min(0, u)),
                        (o.minTop = Math.min(0, f)),
                        (o.maxLeft = Math.max(0, u)),
                        (o.maxTop = Math.max(0, f)),
                        p &&
                            this.limited &&
                            ((o.minLeft = Math.min(
                                l.left,
                                l.left + (l.width - o.width)
                            )),
                            (o.minTop = Math.min(
                                l.top,
                                l.top + (l.height - o.height)
                            )),
                            (o.maxLeft = l.left),
                            (o.maxTop = l.top),
                            r === 2 &&
                                (o.width >= n.width &&
                                    ((o.minLeft = Math.min(0, u)),
                                    (o.maxLeft = Math.max(0, u))),
                                o.height >= n.height &&
                                    ((o.minTop = Math.min(0, f)),
                                    (o.maxTop = Math.max(0, f)))))
                } else
                    (o.minLeft = -o.width),
                        (o.minTop = -o.height),
                        (o.maxLeft = n.width),
                        (o.maxTop = n.height)
        },
        renderCanvas: function (t, i) {
            var a = this.canvasData,
                n = this.imageData
            if (i) {
                var o = Fp({
                        width: n.naturalWidth * Math.abs(n.scaleX || 1),
                        height: n.naturalHeight * Math.abs(n.scaleY || 1),
                        degree: n.rotate || 0,
                    }),
                    l = o.width,
                    r = o.height,
                    s = a.width * (l / a.naturalWidth),
                    p = a.height * (r / a.naturalHeight)
                ;(a.left -= (s - a.width) / 2),
                    (a.top -= (p - a.height) / 2),
                    (a.width = s),
                    (a.height = p),
                    (a.aspectRatio = l / r),
                    (a.naturalWidth = l),
                    (a.naturalHeight = r),
                    this.limitCanvas(!0, !1)
            }
            ;(a.width > a.maxWidth || a.width < a.minWidth) &&
                (a.left = a.oldLeft),
                (a.height > a.maxHeight || a.height < a.minHeight) &&
                    (a.top = a.oldTop),
                (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
                (a.height = Math.min(
                    Math.max(a.height, a.minHeight),
                    a.maxHeight
                )),
                this.limitCanvas(!1, !0),
                (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
                (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
                (a.oldLeft = a.left),
                (a.oldTop = a.top),
                je(
                    this.canvas,
                    J(
                        { width: a.width, height: a.height },
                        Vt({ translateX: a.left, translateY: a.top })
                    )
                ),
                this.renderImage(t),
                this.cropped && this.limited && this.limitCropBox(!0, !0)
        },
        renderImage: function (t) {
            var i = this.canvasData,
                a = this.imageData,
                n = a.naturalWidth * (i.width / i.naturalWidth),
                o = a.naturalHeight * (i.height / i.naturalHeight)
            J(a, {
                width: n,
                height: o,
                left: (i.width - n) / 2,
                top: (i.height - o) / 2,
            }),
                je(
                    this.image,
                    J(
                        { width: a.width, height: a.height },
                        Vt(J({ translateX: a.left, translateY: a.top }, a))
                    )
                ),
                t && this.output()
        },
        initCropBox: function () {
            var t = this.options,
                i = this.canvasData,
                a = t.aspectRatio || t.initialAspectRatio,
                n = Number(t.autoCropArea) || 0.8,
                o = { width: i.width, height: i.height }
            a &&
                (i.height * a > i.width
                    ? (o.height = o.width / a)
                    : (o.width = o.height * a)),
                (this.cropBoxData = o),
                this.limitCropBox(!0, !0),
                (o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth)),
                (o.height = Math.min(
                    Math.max(o.height, o.minHeight),
                    o.maxHeight
                )),
                (o.width = Math.max(o.minWidth, o.width * n)),
                (o.height = Math.max(o.minHeight, o.height * n)),
                (o.left = i.left + (i.width - o.width) / 2),
                (o.top = i.top + (i.height - o.height) / 2),
                (o.oldLeft = o.left),
                (o.oldTop = o.top),
                (this.initialCropBoxData = J({}, o))
        },
        limitCropBox: function (t, i) {
            var a = this.options,
                n = this.containerData,
                o = this.canvasData,
                l = this.cropBoxData,
                r = this.limited,
                s = a.aspectRatio
            if (t) {
                var p = Number(a.minCropBoxWidth) || 0,
                    c = Number(a.minCropBoxHeight) || 0,
                    d = r
                        ? Math.min(
                              n.width,
                              o.width,
                              o.width + o.left,
                              n.width - o.left
                          )
                        : n.width,
                    m = r
                        ? Math.min(
                              n.height,
                              o.height,
                              o.height + o.top,
                              n.height - o.top
                          )
                        : n.height
                ;(p = Math.min(p, n.width)),
                    (c = Math.min(c, n.height)),
                    s &&
                        (p && c
                            ? c * s > p
                                ? (c = p / s)
                                : (p = c * s)
                            : p
                              ? (c = p / s)
                              : c && (p = c * s),
                        m * s > d ? (m = d / s) : (d = m * s)),
                    (l.minWidth = Math.min(p, d)),
                    (l.minHeight = Math.min(c, m)),
                    (l.maxWidth = d),
                    (l.maxHeight = m)
            }
            i &&
                (r
                    ? ((l.minLeft = Math.max(0, o.left)),
                      (l.minTop = Math.max(0, o.top)),
                      (l.maxLeft =
                          Math.min(n.width, o.left + o.width) - l.width),
                      (l.maxTop =
                          Math.min(n.height, o.top + o.height) - l.height))
                    : ((l.minLeft = 0),
                      (l.minTop = 0),
                      (l.maxLeft = n.width - l.width),
                      (l.maxTop = n.height - l.height)))
        },
        renderCropBox: function () {
            var t = this.options,
                i = this.containerData,
                a = this.cropBoxData
            ;(a.width > a.maxWidth || a.width < a.minWidth) &&
                (a.left = a.oldLeft),
                (a.height > a.maxHeight || a.height < a.minHeight) &&
                    (a.top = a.oldTop),
                (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
                (a.height = Math.min(
                    Math.max(a.height, a.minHeight),
                    a.maxHeight
                )),
                this.limitCropBox(!1, !0),
                (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
                (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
                (a.oldLeft = a.left),
                (a.oldTop = a.top),
                t.movable &&
                    t.cropBoxMovable &&
                    Ut(
                        this.face,
                        Gt,
                        a.width >= i.width && a.height >= i.height ? wo : Ta
                    ),
                je(
                    this.cropBox,
                    J(
                        { width: a.width, height: a.height },
                        Vt({ translateX: a.left, translateY: a.top })
                    )
                ),
                this.cropped && this.limited && this.limitCanvas(!0, !0),
                this.disabled || this.output()
        },
        output: function () {
            this.preview(), xt(this.element, pa, this.getData())
        },
    },
    Wp = {
        initPreview: function () {
            var t = this.element,
                i = this.crossOrigin,
                a = this.options.preview,
                n = i ? this.crossOriginUrl : this.url,
                o = t.alt || 'The image to preview',
                l = document.createElement('img')
            if (
                (i && (l.crossOrigin = i),
                (l.src = n),
                (l.alt = o),
                this.viewBox.appendChild(l),
                (this.viewBoxImage = l),
                !!a)
            ) {
                var r = a
                typeof a == 'string'
                    ? (r = t.ownerDocument.querySelectorAll(a))
                    : a.querySelector && (r = [a]),
                    (this.previews = r),
                    oe(r, function (s) {
                        var p = document.createElement('img')
                        Ut(s, hi, {
                            width: s.offsetWidth,
                            height: s.offsetHeight,
                            html: s.innerHTML,
                        }),
                            i && (p.crossOrigin = i),
                            (p.src = n),
                            (p.alt = o),
                            (p.style.cssText =
                                'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"'),
                            (s.innerHTML = ''),
                            s.appendChild(p)
                    })
            }
        },
        resetPreview: function () {
            oe(this.previews, function (t) {
                var i = ga(t, hi)
                je(t, { width: i.width, height: i.height }),
                    (t.innerHTML = i.html),
                    Mp(t, hi)
            })
        },
        preview: function () {
            var t = this.imageData,
                i = this.canvasData,
                a = this.cropBoxData,
                n = a.width,
                o = a.height,
                l = t.width,
                r = t.height,
                s = a.left - i.left - t.left,
                p = a.top - i.top - t.top
            !this.cropped ||
                this.disabled ||
                (je(
                    this.viewBoxImage,
                    J(
                        { width: l, height: r },
                        Vt(J({ translateX: -s, translateY: -p }, t))
                    )
                ),
                oe(this.previews, function (c) {
                    var d = ga(c, hi),
                        m = d.width,
                        u = d.height,
                        f = m,
                        h = u,
                        g = 1
                    n && ((g = m / n), (h = o * g)),
                        o && h > u && ((g = u / o), (f = n * g), (h = u)),
                        je(c, { width: f, height: h }),
                        je(
                            c.getElementsByTagName('img')[0],
                            J(
                                { width: l * g, height: r * g },
                                Vt(
                                    J(
                                        {
                                            translateX: -s * g,
                                            translateY: -p * g,
                                        },
                                        t
                                    )
                                )
                            )
                        )
                }))
        },
    },
    Hp = {
        bind: function () {
            var t = this.element,
                i = this.options,
                a = this.cropper
            Ee(i.cropstart) && Re(t, fa, i.cropstart),
                Ee(i.cropmove) && Re(t, ua, i.cropmove),
                Ee(i.cropend) && Re(t, ma, i.cropend),
                Ee(i.crop) && Re(t, pa, i.crop),
                Ee(i.zoom) && Re(t, ha, i.zoom),
                Re(a, po, (this.onCropStart = this.cropStart.bind(this))),
                i.zoomable &&
                    i.zoomOnWheel &&
                    Re(a, go, (this.onWheel = this.wheel.bind(this)), {
                        passive: !1,
                        capture: !0,
                    }),
                i.toggleDragModeOnDblclick &&
                    Re(a, co, (this.onDblclick = this.dblclick.bind(this))),
                Re(
                    t.ownerDocument,
                    mo,
                    (this.onCropMove = this.cropMove.bind(this))
                ),
                Re(
                    t.ownerDocument,
                    uo,
                    (this.onCropEnd = this.cropEnd.bind(this))
                ),
                i.responsive &&
                    Re(window, ho, (this.onResize = this.resize.bind(this)))
        },
        unbind: function () {
            var t = this.element,
                i = this.options,
                a = this.cropper
            Ee(i.cropstart) && Pe(t, fa, i.cropstart),
                Ee(i.cropmove) && Pe(t, ua, i.cropmove),
                Ee(i.cropend) && Pe(t, ma, i.cropend),
                Ee(i.crop) && Pe(t, pa, i.crop),
                Ee(i.zoom) && Pe(t, ha, i.zoom),
                Pe(a, po, this.onCropStart),
                i.zoomable &&
                    i.zoomOnWheel &&
                    Pe(a, go, this.onWheel, { passive: !1, capture: !0 }),
                i.toggleDragModeOnDblclick && Pe(a, co, this.onDblclick),
                Pe(t.ownerDocument, mo, this.onCropMove),
                Pe(t.ownerDocument, uo, this.onCropEnd),
                i.responsive && Pe(window, ho, this.onResize)
        },
    },
    jp = {
        resize: function () {
            if (!this.disabled) {
                var t = this.options,
                    i = this.container,
                    a = this.containerData,
                    n = i.offsetWidth / a.width,
                    o = i.offsetHeight / a.height,
                    l = Math.abs(n - 1) > Math.abs(o - 1) ? n : o
                if (l !== 1) {
                    var r, s
                    t.restore &&
                        ((r = this.getCanvasData()),
                        (s = this.getCropBoxData())),
                        this.render(),
                        t.restore &&
                            (this.setCanvasData(
                                oe(r, function (p, c) {
                                    r[c] = p * l
                                })
                            ),
                            this.setCropBoxData(
                                oe(s, function (p, c) {
                                    s[c] = p * l
                                })
                            ))
                }
            }
        },
        dblclick: function () {
            this.disabled ||
                this.options.dragMode === Ao ||
                this.setDragMode(Lp(this.dragBox, ca) ? Lo : va)
        },
        wheel: function (t) {
            var i = this,
                a = Number(this.options.wheelZoomRatio) || 0.1,
                n = 1
            this.disabled ||
                (t.preventDefault(),
                !this.wheeling &&
                    ((this.wheeling = !0),
                    setTimeout(function () {
                        i.wheeling = !1
                    }, 50),
                    t.deltaY
                        ? (n = t.deltaY > 0 ? 1 : -1)
                        : t.wheelDelta
                          ? (n = -t.wheelDelta / 120)
                          : t.detail && (n = t.detail > 0 ? 1 : -1),
                    this.zoom(-n * a, t)))
        },
        cropStart: function (t) {
            var i = t.buttons,
                a = t.button
            if (
                !(
                    this.disabled ||
                    ((t.type === 'mousedown' ||
                        (t.type === 'pointerdown' &&
                            t.pointerType === 'mouse')) &&
                        ((j(i) && i !== 1) || (j(a) && a !== 0) || t.ctrlKey))
                )
            ) {
                var n = this.options,
                    o = this.pointers,
                    l
                t.changedTouches
                    ? oe(t.changedTouches, function (r) {
                          o[r.identifier] = gi(r)
                      })
                    : (o[t.pointerId || 0] = gi(t)),
                    Object.keys(o).length > 1 && n.zoomable && n.zoomOnTouch
                        ? (l = So)
                        : (l = ga(t.target, Gt)),
                    bp.test(l) &&
                        xt(this.element, fa, {
                            originalEvent: t,
                            action: l,
                        }) !== !1 &&
                        (t.preventDefault(),
                        (this.action = l),
                        (this.cropping = !1),
                        l === Ro &&
                            ((this.cropping = !0), de(this.dragBox, Ei)))
            }
        },
        cropMove: function (t) {
            var i = this.action
            if (!(this.disabled || !i)) {
                var a = this.pointers
                t.preventDefault(),
                    xt(this.element, ua, { originalEvent: t, action: i }) !==
                        !1 &&
                        (t.changedTouches
                            ? oe(t.changedTouches, function (n) {
                                  J(a[n.identifier] || {}, gi(n, !0))
                              })
                            : J(a[t.pointerId || 0] || {}, gi(t, !0)),
                        this.change(t))
            }
        },
        cropEnd: function (t) {
            if (!this.disabled) {
                var i = this.action,
                    a = this.pointers
                t.changedTouches
                    ? oe(t.changedTouches, function (n) {
                          delete a[n.identifier]
                      })
                    : delete a[t.pointerId || 0],
                    i &&
                        (t.preventDefault(),
                        Object.keys(a).length || (this.action = ''),
                        this.cropping &&
                            ((this.cropping = !1),
                            vt(
                                this.dragBox,
                                Ei,
                                this.cropped && this.options.modal
                            )),
                        xt(this.element, ma, { originalEvent: t, action: i }))
            }
        },
    },
    Yp = {
        change: function (t) {
            var i = this.options,
                a = this.canvasData,
                n = this.containerData,
                o = this.cropBoxData,
                l = this.pointers,
                r = this.action,
                s = i.aspectRatio,
                p = o.left,
                c = o.top,
                d = o.width,
                m = o.height,
                u = p + d,
                f = c + m,
                h = 0,
                g = 0,
                v = n.width,
                E = n.height,
                T = !0,
                I
            !s && t.shiftKey && (s = d && m ? d / m : 1),
                this.limited &&
                    ((h = o.minLeft),
                    (g = o.minTop),
                    (v = h + Math.min(n.width, a.width, a.left + a.width)),
                    (E = g + Math.min(n.height, a.height, a.top + a.height)))
            var y = l[Object.keys(l)[0]],
                b = { x: y.endX - y.startX, y: y.endY - y.startY },
                w = function (_) {
                    switch (_) {
                        case at:
                            u + b.x > v && (b.x = v - u)
                            break
                        case nt:
                            p + b.x < h && (b.x = h - p)
                            break
                        case He:
                            c + b.y < g && (b.y = g - c)
                            break
                        case bt:
                            f + b.y > E && (b.y = E - f)
                            break
                    }
                }
            switch (r) {
                case Ta:
                    ;(p += b.x), (c += b.y)
                    break
                case at:
                    if (b.x >= 0 && (u >= v || (s && (c <= g || f >= E)))) {
                        T = !1
                        break
                    }
                    w(at),
                        (d += b.x),
                        d < 0 && ((r = nt), (d = -d), (p -= d)),
                        s && ((m = d / s), (c += (o.height - m) / 2))
                    break
                case He:
                    if (b.y <= 0 && (c <= g || (s && (p <= h || u >= v)))) {
                        T = !1
                        break
                    }
                    w(He),
                        (m -= b.y),
                        (c += b.y),
                        m < 0 && ((r = bt), (m = -m), (c -= m)),
                        s && ((d = m * s), (p += (o.width - d) / 2))
                    break
                case nt:
                    if (b.x <= 0 && (p <= h || (s && (c <= g || f >= E)))) {
                        T = !1
                        break
                    }
                    w(nt),
                        (d -= b.x),
                        (p += b.x),
                        d < 0 && ((r = at), (d = -d), (p -= d)),
                        s && ((m = d / s), (c += (o.height - m) / 2))
                    break
                case bt:
                    if (b.y >= 0 && (f >= E || (s && (p <= h || u >= v)))) {
                        T = !1
                        break
                    }
                    w(bt),
                        (m += b.y),
                        m < 0 && ((r = He), (m = -m), (c -= m)),
                        s && ((d = m * s), (p += (o.width - d) / 2))
                    break
                case Ct:
                    if (s) {
                        if (b.y <= 0 && (c <= g || u >= v)) {
                            T = !1
                            break
                        }
                        w(He), (m -= b.y), (c += b.y), (d = m * s)
                    } else
                        w(He),
                            w(at),
                            b.x >= 0
                                ? u < v
                                    ? (d += b.x)
                                    : b.y <= 0 && c <= g && (T = !1)
                                : (d += b.x),
                            b.y <= 0
                                ? c > g && ((m -= b.y), (c += b.y))
                                : ((m -= b.y), (c += b.y))
                    d < 0 && m < 0
                        ? ((r = kt), (m = -m), (d = -d), (c -= m), (p -= d))
                        : d < 0
                          ? ((r = Nt), (d = -d), (p -= d))
                          : m < 0 && ((r = Bt), (m = -m), (c -= m))
                    break
                case Nt:
                    if (s) {
                        if (b.y <= 0 && (c <= g || p <= h)) {
                            T = !1
                            break
                        }
                        w(He),
                            (m -= b.y),
                            (c += b.y),
                            (d = m * s),
                            (p += o.width - d)
                    } else
                        w(He),
                            w(nt),
                            b.x <= 0
                                ? p > h
                                    ? ((d -= b.x), (p += b.x))
                                    : b.y <= 0 && c <= g && (T = !1)
                                : ((d -= b.x), (p += b.x)),
                            b.y <= 0
                                ? c > g && ((m -= b.y), (c += b.y))
                                : ((m -= b.y), (c += b.y))
                    d < 0 && m < 0
                        ? ((r = Bt), (m = -m), (d = -d), (c -= m), (p -= d))
                        : d < 0
                          ? ((r = Ct), (d = -d), (p -= d))
                          : m < 0 && ((r = kt), (m = -m), (c -= m))
                    break
                case kt:
                    if (s) {
                        if (b.x <= 0 && (p <= h || f >= E)) {
                            T = !1
                            break
                        }
                        w(nt), (d -= b.x), (p += b.x), (m = d / s)
                    } else
                        w(bt),
                            w(nt),
                            b.x <= 0
                                ? p > h
                                    ? ((d -= b.x), (p += b.x))
                                    : b.y >= 0 && f >= E && (T = !1)
                                : ((d -= b.x), (p += b.x)),
                            b.y >= 0 ? f < E && (m += b.y) : (m += b.y)
                    d < 0 && m < 0
                        ? ((r = Ct), (m = -m), (d = -d), (c -= m), (p -= d))
                        : d < 0
                          ? ((r = Bt), (d = -d), (p -= d))
                          : m < 0 && ((r = Nt), (m = -m), (c -= m))
                    break
                case Bt:
                    if (s) {
                        if (b.x >= 0 && (u >= v || f >= E)) {
                            T = !1
                            break
                        }
                        w(at), (d += b.x), (m = d / s)
                    } else
                        w(bt),
                            w(at),
                            b.x >= 0
                                ? u < v
                                    ? (d += b.x)
                                    : b.y >= 0 && f >= E && (T = !1)
                                : (d += b.x),
                            b.y >= 0 ? f < E && (m += b.y) : (m += b.y)
                    d < 0 && m < 0
                        ? ((r = Nt), (m = -m), (d = -d), (c -= m), (p -= d))
                        : d < 0
                          ? ((r = kt), (d = -d), (p -= d))
                          : m < 0 && ((r = Ct), (m = -m), (c -= m))
                    break
                case wo:
                    this.move(b.x, b.y), (T = !1)
                    break
                case So:
                    this.zoom(Pp(l), t), (T = !1)
                    break
                case Ro:
                    if (!b.x || !b.y) {
                        T = !1
                        break
                    }
                    ;(I = zo(this.cropper)),
                        (p = y.startX - I.left),
                        (c = y.startY - I.top),
                        (d = o.minWidth),
                        (m = o.minHeight),
                        b.x > 0
                            ? (r = b.y > 0 ? Bt : Ct)
                            : b.x < 0 && ((p -= d), (r = b.y > 0 ? kt : Nt)),
                        b.y < 0 && (c -= m),
                        this.cropped ||
                            (De(this.cropBox, be),
                            (this.cropped = !0),
                            this.limited && this.limitCropBox(!0, !0))
                    break
            }
            T &&
                ((o.width = d),
                (o.height = m),
                (o.left = p),
                (o.top = c),
                (this.action = r),
                this.renderCropBox()),
                oe(l, function (x) {
                    ;(x.startX = x.endX), (x.startY = x.endY)
                })
        },
    },
    qp = {
        crop: function () {
            return (
                this.ready &&
                    !this.cropped &&
                    !this.disabled &&
                    ((this.cropped = !0),
                    this.limitCropBox(!0, !0),
                    this.options.modal && de(this.dragBox, Ei),
                    De(this.cropBox, be),
                    this.setCropBoxData(this.initialCropBoxData)),
                this
            )
        },
        reset: function () {
            return (
                this.ready &&
                    !this.disabled &&
                    ((this.imageData = J({}, this.initialImageData)),
                    (this.canvasData = J({}, this.initialCanvasData)),
                    (this.cropBoxData = J({}, this.initialCropBoxData)),
                    this.renderCanvas(),
                    this.cropped && this.renderCropBox()),
                this
            )
        },
        clear: function () {
            return (
                this.cropped &&
                    !this.disabled &&
                    (J(this.cropBoxData, {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.cropped = !1),
                    this.renderCropBox(),
                    this.limitCanvas(!0, !0),
                    this.renderCanvas(),
                    De(this.dragBox, Ei),
                    de(this.cropBox, be)),
                this
            )
        },
        replace: function (t) {
            var i =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : !1
            return (
                !this.disabled &&
                    t &&
                    (this.isImg && (this.element.src = t),
                    i
                        ? ((this.url = t),
                          (this.image.src = t),
                          this.ready &&
                              ((this.viewBoxImage.src = t),
                              oe(this.previews, function (a) {
                                  a.getElementsByTagName('img')[0].src = t
                              })))
                        : (this.isImg && (this.replaced = !0),
                          (this.options.data = null),
                          this.uncreate(),
                          this.load(t))),
                this
            )
        },
        enable: function () {
            return (
                this.ready &&
                    this.disabled &&
                    ((this.disabled = !1), De(this.cropper, ro)),
                this
            )
        },
        disable: function () {
            return (
                this.ready &&
                    !this.disabled &&
                    ((this.disabled = !0), de(this.cropper, ro)),
                this
            )
        },
        destroy: function () {
            var t = this.element
            return t[K]
                ? ((t[K] = void 0),
                  this.isImg && this.replaced && (t.src = this.originalUrl),
                  this.uncreate(),
                  this)
                : this
        },
        move: function (t) {
            var i =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : t,
                a = this.canvasData,
                n = a.left,
                o = a.top
            return this.moveTo(
                oa(t) ? t : n + Number(t),
                oa(i) ? i : o + Number(i)
            )
        },
        moveTo: function (t) {
            var i =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : t,
                a = this.canvasData,
                n = !1
            return (
                (t = Number(t)),
                (i = Number(i)),
                this.ready &&
                    !this.disabled &&
                    this.options.movable &&
                    (j(t) && ((a.left = t), (n = !0)),
                    j(i) && ((a.top = i), (n = !0)),
                    n && this.renderCanvas(!0)),
                this
            )
        },
        zoom: function (t, i) {
            var a = this.canvasData
            return (
                (t = Number(t)),
                t < 0 ? (t = 1 / (1 - t)) : (t = 1 + t),
                this.zoomTo((a.width * t) / a.naturalWidth, null, i)
            )
        },
        zoomTo: function (t, i, a) {
            var n = this.options,
                o = this.canvasData,
                l = o.width,
                r = o.height,
                s = o.naturalWidth,
                p = o.naturalHeight
            if (
                ((t = Number(t)),
                t >= 0 && this.ready && !this.disabled && n.zoomable)
            ) {
                var c = s * t,
                    d = p * t
                if (
                    xt(this.element, ha, {
                        ratio: t,
                        oldRatio: l / s,
                        originalEvent: a,
                    }) === !1
                )
                    return this
                if (a) {
                    var m = this.pointers,
                        u = zo(this.cropper),
                        f =
                            m && Object.keys(m).length
                                ? Dp(m)
                                : { pageX: a.pageX, pageY: a.pageY }
                    ;(o.left -= (c - l) * ((f.pageX - u.left - o.left) / l)),
                        (o.top -= (d - r) * ((f.pageY - u.top - o.top) / r))
                } else
                    Tt(i) && j(i.x) && j(i.y)
                        ? ((o.left -= (c - l) * ((i.x - o.left) / l)),
                          (o.top -= (d - r) * ((i.y - o.top) / r)))
                        : ((o.left -= (c - l) / 2), (o.top -= (d - r) / 2))
                ;(o.width = c), (o.height = d), this.renderCanvas(!0)
            }
            return this
        },
        rotate: function (t) {
            return this.rotateTo((this.imageData.rotate || 0) + Number(t))
        },
        rotateTo: function (t) {
            return (
                (t = Number(t)),
                j(t) &&
                    this.ready &&
                    !this.disabled &&
                    this.options.rotatable &&
                    ((this.imageData.rotate = t % 360),
                    this.renderCanvas(!0, !0)),
                this
            )
        },
        scaleX: function (t) {
            var i = this.imageData.scaleY
            return this.scale(t, j(i) ? i : 1)
        },
        scaleY: function (t) {
            var i = this.imageData.scaleX
            return this.scale(j(i) ? i : 1, t)
        },
        scale: function (t) {
            var i =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : t,
                a = this.imageData,
                n = !1
            return (
                (t = Number(t)),
                (i = Number(i)),
                this.ready &&
                    !this.disabled &&
                    this.options.scalable &&
                    (j(t) && ((a.scaleX = t), (n = !0)),
                    j(i) && ((a.scaleY = i), (n = !0)),
                    n && this.renderCanvas(!0, !0)),
                this
            )
        },
        getData: function () {
            var t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : !1,
                i = this.options,
                a = this.imageData,
                n = this.canvasData,
                o = this.cropBoxData,
                l
            if (this.ready && this.cropped) {
                l = {
                    x: o.left - n.left,
                    y: o.top - n.top,
                    width: o.width,
                    height: o.height,
                }
                var r = a.width / a.naturalWidth
                if (
                    (oe(l, function (c, d) {
                        l[d] = c / r
                    }),
                    t)
                ) {
                    var s = Math.round(l.y + l.height),
                        p = Math.round(l.x + l.width)
                    ;(l.x = Math.round(l.x)),
                        (l.y = Math.round(l.y)),
                        (l.width = p - l.x),
                        (l.height = s - l.y)
                }
            } else l = { x: 0, y: 0, width: 0, height: 0 }
            return (
                i.rotatable && (l.rotate = a.rotate || 0),
                i.scalable &&
                    ((l.scaleX = a.scaleX || 1), (l.scaleY = a.scaleY || 1)),
                l
            )
        },
        setData: function (t) {
            var i = this.options,
                a = this.imageData,
                n = this.canvasData,
                o = {}
            if (this.ready && !this.disabled && Tt(t)) {
                var l = !1
                i.rotatable &&
                    j(t.rotate) &&
                    t.rotate !== a.rotate &&
                    ((a.rotate = t.rotate), (l = !0)),
                    i.scalable &&
                        (j(t.scaleX) &&
                            t.scaleX !== a.scaleX &&
                            ((a.scaleX = t.scaleX), (l = !0)),
                        j(t.scaleY) &&
                            t.scaleY !== a.scaleY &&
                            ((a.scaleY = t.scaleY), (l = !0))),
                    l && this.renderCanvas(!0, !0)
                var r = a.width / a.naturalWidth
                j(t.x) && (o.left = t.x * r + n.left),
                    j(t.y) && (o.top = t.y * r + n.top),
                    j(t.width) && (o.width = t.width * r),
                    j(t.height) && (o.height = t.height * r),
                    this.setCropBoxData(o)
            }
            return this
        },
        getContainerData: function () {
            return this.ready ? J({}, this.containerData) : {}
        },
        getImageData: function () {
            return this.sized ? J({}, this.imageData) : {}
        },
        getCanvasData: function () {
            var t = this.canvasData,
                i = {}
            return (
                this.ready &&
                    oe(
                        [
                            'left',
                            'top',
                            'width',
                            'height',
                            'naturalWidth',
                            'naturalHeight',
                        ],
                        function (a) {
                            i[a] = t[a]
                        }
                    ),
                i
            )
        },
        setCanvasData: function (t) {
            var i = this.canvasData,
                a = i.aspectRatio
            return (
                this.ready &&
                    !this.disabled &&
                    Tt(t) &&
                    (j(t.left) && (i.left = t.left),
                    j(t.top) && (i.top = t.top),
                    j(t.width)
                        ? ((i.width = t.width), (i.height = t.width / a))
                        : j(t.height) &&
                          ((i.height = t.height), (i.width = t.height * a)),
                    this.renderCanvas(!0)),
                this
            )
        },
        getCropBoxData: function () {
            var t = this.cropBoxData,
                i
            return (
                this.ready &&
                    this.cropped &&
                    (i = {
                        left: t.left,
                        top: t.top,
                        width: t.width,
                        height: t.height,
                    }),
                i || {}
            )
        },
        setCropBoxData: function (t) {
            var i = this.cropBoxData,
                a = this.options.aspectRatio,
                n,
                o
            return (
                this.ready &&
                    this.cropped &&
                    !this.disabled &&
                    Tt(t) &&
                    (j(t.left) && (i.left = t.left),
                    j(t.top) && (i.top = t.top),
                    j(t.width) &&
                        t.width !== i.width &&
                        ((n = !0), (i.width = t.width)),
                    j(t.height) &&
                        t.height !== i.height &&
                        ((o = !0), (i.height = t.height)),
                    a &&
                        (n
                            ? (i.height = i.width / a)
                            : o && (i.width = i.height * a)),
                    this.renderCropBox()),
                this
            )
        },
        getCroppedCanvas: function () {
            var t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {}
            if (!this.ready || !window.HTMLCanvasElement) return null
            var i = this.canvasData,
                a = zp(this.image, this.imageData, i, t)
            if (!this.cropped) return a
            var n = this.getData(t.rounded),
                o = n.x,
                l = n.y,
                r = n.width,
                s = n.height,
                p = a.width / Math.floor(i.naturalWidth)
            p !== 1 && ((o *= p), (l *= p), (r *= p), (s *= p))
            var c = r / s,
                d = Ye({
                    aspectRatio: c,
                    width: t.maxWidth || 1 / 0,
                    height: t.maxHeight || 1 / 0,
                }),
                m = Ye(
                    {
                        aspectRatio: c,
                        width: t.minWidth || 0,
                        height: t.minHeight || 0,
                    },
                    'cover'
                ),
                u = Ye({
                    aspectRatio: c,
                    width: t.width || (p !== 1 ? a.width : r),
                    height: t.height || (p !== 1 ? a.height : s),
                }),
                f = u.width,
                h = u.height
            ;(f = Math.min(d.width, Math.max(m.width, f))),
                (h = Math.min(d.height, Math.max(m.height, h)))
            var g = document.createElement('canvas'),
                v = g.getContext('2d')
            ;(g.width = It(f)),
                (g.height = It(h)),
                (v.fillStyle = t.fillColor || 'transparent'),
                v.fillRect(0, 0, f, h)
            var E = t.imageSmoothingEnabled,
                T = E === void 0 ? !0 : E,
                I = t.imageSmoothingQuality
            ;(v.imageSmoothingEnabled = T), I && (v.imageSmoothingQuality = I)
            var y = a.width,
                b = a.height,
                w = o,
                x = l,
                _,
                P,
                O,
                M,
                C,
                S
            w <= -r || w > y
                ? ((w = 0), (_ = 0), (O = 0), (C = 0))
                : w <= 0
                  ? ((O = -w), (w = 0), (_ = Math.min(y, r + w)), (C = _))
                  : w <= y && ((O = 0), (_ = Math.min(r, y - w)), (C = _)),
                _ <= 0 || x <= -s || x > b
                    ? ((x = 0), (P = 0), (M = 0), (S = 0))
                    : x <= 0
                      ? ((M = -x), (x = 0), (P = Math.min(b, s + x)), (S = P))
                      : x <= b && ((M = 0), (P = Math.min(s, b - x)), (S = P))
            var F = [w, x, _, P]
            if (C > 0 && S > 0) {
                var R = f / r
                F.push(O * R, M * R, C * R, S * R)
            }
            return (
                v.drawImage.apply(
                    v,
                    [a].concat(
                        _o(
                            F.map(function (L) {
                                return Math.floor(It(L))
                            })
                        )
                    )
                ),
                g
            )
        },
        setAspectRatio: function (t) {
            var i = this.options
            return (
                !this.disabled &&
                    !oa(t) &&
                    ((i.aspectRatio = Math.max(0, t) || NaN),
                    this.ready &&
                        (this.initCropBox(),
                        this.cropped && this.renderCropBox())),
                this
            )
        },
        setDragMode: function (t) {
            var i = this.options,
                a = this.dragBox,
                n = this.face
            if (this.ready && !this.disabled) {
                var o = t === va,
                    l = i.movable && t === Lo
                ;(t = o || l ? t : Ao),
                    (i.dragMode = t),
                    Ut(a, Gt, t),
                    vt(a, ca, o),
                    vt(a, da, l),
                    i.cropBoxMovable ||
                        (Ut(n, Gt, t), vt(n, ca, o), vt(n, da, l))
            }
            return this
        },
    },
    $p = Fe.Cropper,
    xa = (function () {
        function e(t) {
            var i =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {}
            if ((rp(this, e), !t || !Ip.test(t.tagName)))
                throw new Error(
                    'The first argument is required and must be an <img> or <canvas> element.'
                )
            ;(this.element = t),
                (this.options = J({}, bo, Tt(i) && i)),
                (this.cropped = !1),
                (this.disabled = !1),
                (this.pointers = {}),
                (this.ready = !1),
                (this.reloading = !1),
                (this.replaced = !1),
                (this.sized = !1),
                (this.sizing = !1),
                this.init()
        }
        return sp(
            e,
            [
                {
                    key: 'init',
                    value: function () {
                        var i = this.element,
                            a = i.tagName.toLowerCase(),
                            n
                        if (!i[K]) {
                            if (((i[K] = this), a === 'img')) {
                                if (
                                    ((this.isImg = !0),
                                    (n = i.getAttribute('src') || ''),
                                    (this.originalUrl = n),
                                    !n)
                                )
                                    return
                                n = i.src
                            } else
                                a === 'canvas' &&
                                    window.HTMLCanvasElement &&
                                    (n = i.toDataURL())
                            this.load(n)
                        }
                    },
                },
                {
                    key: 'load',
                    value: function (i) {
                        var a = this
                        if (i) {
                            ;(this.url = i), (this.imageData = {})
                            var n = this.element,
                                o = this.options
                            if (
                                (!o.rotatable &&
                                    !o.scalable &&
                                    (o.checkOrientation = !1),
                                !o.checkOrientation || !window.ArrayBuffer)
                            ) {
                                this.clone()
                                return
                            }
                            if (Tp.test(i)) {
                                vp.test(i) ? this.read(Bp(i)) : this.clone()
                                return
                            }
                            var l = new XMLHttpRequest(),
                                r = this.clone.bind(this)
                            ;(this.reloading = !0),
                                (this.xhr = l),
                                (l.onabort = r),
                                (l.onerror = r),
                                (l.ontimeout = r),
                                (l.onprogress = function () {
                                    l.getResponseHeader('content-type') !==
                                        Eo && l.abort()
                                }),
                                (l.onload = function () {
                                    a.read(l.response)
                                }),
                                (l.onloadend = function () {
                                    ;(a.reloading = !1), (a.xhr = null)
                                }),
                                o.checkCrossOrigin &&
                                    vo(i) &&
                                    n.crossOrigin &&
                                    (i = Io(i)),
                                l.open('GET', i, !0),
                                (l.responseType = 'arraybuffer'),
                                (l.withCredentials =
                                    n.crossOrigin === 'use-credentials'),
                                l.send()
                        }
                    },
                },
                {
                    key: 'read',
                    value: function (i) {
                        var a = this.options,
                            n = this.imageData,
                            o = Vp(i),
                            l = 0,
                            r = 1,
                            s = 1
                        if (o > 1) {
                            this.url = kp(i, Eo)
                            var p = Gp(o)
                            ;(l = p.rotate), (r = p.scaleX), (s = p.scaleY)
                        }
                        a.rotatable && (n.rotate = l),
                            a.scalable && ((n.scaleX = r), (n.scaleY = s)),
                            this.clone()
                    },
                },
                {
                    key: 'clone',
                    value: function () {
                        var i = this.element,
                            a = this.url,
                            n = i.crossOrigin,
                            o = a
                        this.options.checkCrossOrigin &&
                            vo(a) &&
                            (n || (n = 'anonymous'), (o = Io(a))),
                            (this.crossOrigin = n),
                            (this.crossOriginUrl = o)
                        var l = document.createElement('img')
                        n && (l.crossOrigin = n),
                            (l.src = o || a),
                            (l.alt = i.alt || 'The image to crop'),
                            (this.image = l),
                            (l.onload = this.start.bind(this)),
                            (l.onerror = this.stop.bind(this)),
                            de(l, so),
                            i.parentNode.insertBefore(l, i.nextSibling)
                    },
                },
                {
                    key: 'start',
                    value: function () {
                        var i = this,
                            a = this.image
                        ;(a.onload = null),
                            (a.onerror = null),
                            (this.sizing = !0)
                        var n =
                                Fe.navigator &&
                                /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                                    Fe.navigator.userAgent
                                ),
                            o = function (p, c) {
                                J(i.imageData, {
                                    naturalWidth: p,
                                    naturalHeight: c,
                                    aspectRatio: p / c,
                                }),
                                    (i.initialImageData = J({}, i.imageData)),
                                    (i.sizing = !1),
                                    (i.sized = !0),
                                    i.build()
                            }
                        if (a.naturalWidth && !n) {
                            o(a.naturalWidth, a.naturalHeight)
                            return
                        }
                        var l = document.createElement('img'),
                            r = document.body || document.documentElement
                        ;(this.sizingImage = l),
                            (l.onload = function () {
                                o(l.width, l.height), n || r.removeChild(l)
                            }),
                            (l.src = a.src),
                            n ||
                                ((l.style.cssText =
                                    'left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;'),
                                r.appendChild(l))
                    },
                },
                {
                    key: 'stop',
                    value: function () {
                        var i = this.image
                        ;(i.onload = null),
                            (i.onerror = null),
                            i.parentNode.removeChild(i),
                            (this.image = null)
                    },
                },
                {
                    key: 'build',
                    value: function () {
                        if (!(!this.sized || this.ready)) {
                            var i = this.element,
                                a = this.options,
                                n = this.image,
                                o = i.parentNode,
                                l = document.createElement('div')
                            l.innerHTML = xp
                            var r = l.querySelector(
                                    '.'.concat(K, '-container')
                                ),
                                s = r.querySelector('.'.concat(K, '-canvas')),
                                p = r.querySelector('.'.concat(K, '-drag-box')),
                                c = r.querySelector('.'.concat(K, '-crop-box')),
                                d = c.querySelector('.'.concat(K, '-face'))
                            ;(this.container = o),
                                (this.cropper = r),
                                (this.canvas = s),
                                (this.dragBox = p),
                                (this.cropBox = c),
                                (this.viewBox = r.querySelector(
                                    '.'.concat(K, '-view-box')
                                )),
                                (this.face = d),
                                s.appendChild(n),
                                de(i, be),
                                o.insertBefore(r, i.nextSibling),
                                De(n, so),
                                this.initPreview(),
                                this.bind(),
                                (a.initialAspectRatio =
                                    Math.max(0, a.initialAspectRatio) || NaN),
                                (a.aspectRatio =
                                    Math.max(0, a.aspectRatio) || NaN),
                                (a.viewMode =
                                    Math.max(
                                        0,
                                        Math.min(3, Math.round(a.viewMode))
                                    ) || 0),
                                de(c, be),
                                a.guides ||
                                    de(
                                        c.getElementsByClassName(
                                            ''.concat(K, '-dashed')
                                        ),
                                        be
                                    ),
                                a.center ||
                                    de(
                                        c.getElementsByClassName(
                                            ''.concat(K, '-center')
                                        ),
                                        be
                                    ),
                                a.background && de(r, ''.concat(K, '-bg')),
                                a.highlight || de(d, fp),
                                a.cropBoxMovable && (de(d, da), Ut(d, Gt, Ta)),
                                a.cropBoxResizable ||
                                    (de(
                                        c.getElementsByClassName(
                                            ''.concat(K, '-line')
                                        ),
                                        be
                                    ),
                                    de(
                                        c.getElementsByClassName(
                                            ''.concat(K, '-point')
                                        ),
                                        be
                                    )),
                                this.render(),
                                (this.ready = !0),
                                this.setDragMode(a.dragMode),
                                a.autoCrop && this.crop(),
                                this.setData(a.data),
                                Ee(a.ready) && Re(i, fo, a.ready, { once: !0 }),
                                xt(i, fo)
                        }
                    },
                },
                {
                    key: 'unbuild',
                    value: function () {
                        if (this.ready) {
                            ;(this.ready = !1),
                                this.unbind(),
                                this.resetPreview()
                            var i = this.cropper.parentNode
                            i && i.removeChild(this.cropper),
                                De(this.element, be)
                        }
                    },
                },
                {
                    key: 'uncreate',
                    value: function () {
                        this.ready
                            ? (this.unbuild(),
                              (this.ready = !1),
                              (this.cropped = !1))
                            : this.sizing
                              ? ((this.sizingImage.onload = null),
                                (this.sizing = !1),
                                (this.sized = !1))
                              : this.reloading
                                ? ((this.xhr.onabort = null), this.xhr.abort())
                                : this.image && this.stop()
                    },
                },
            ],
            [
                {
                    key: 'noConflict',
                    value: function () {
                        return (window.Cropper = $p), e
                    },
                },
                {
                    key: 'setDefaults',
                    value: function (i) {
                        J(bo, Tt(i) && i)
                    },
                },
            ]
        )
    })()
J(xa.prototype, Up, Wp, Hp, jp, Yp, qp)
var No = {
    'application/prs.cww': ['cww'],
    'application/prs.xsf+xml': ['xsf'],
    'application/vnd.1000minds.decision-model+xml': ['1km'],
    'application/vnd.3gpp.pic-bw-large': ['plb'],
    'application/vnd.3gpp.pic-bw-small': ['psb'],
    'application/vnd.3gpp.pic-bw-var': ['pvb'],
    'application/vnd.3gpp2.tcap': ['tcap'],
    'application/vnd.3m.post-it-notes': ['pwn'],
    'application/vnd.accpac.simply.aso': ['aso'],
    'application/vnd.accpac.simply.imp': ['imp'],
    'application/vnd.acucobol': ['acu'],
    'application/vnd.acucorp': ['atc', 'acutc'],
    'application/vnd.adobe.air-application-installer-package+zip': ['air'],
    'application/vnd.adobe.formscentral.fcdt': ['fcdt'],
    'application/vnd.adobe.fxp': ['fxp', 'fxpl'],
    'application/vnd.adobe.xdp+xml': ['xdp'],
    'application/vnd.adobe.xfdf': ['*xfdf'],
    'application/vnd.age': ['age'],
    'application/vnd.ahead.space': ['ahead'],
    'application/vnd.airzip.filesecure.azf': ['azf'],
    'application/vnd.airzip.filesecure.azs': ['azs'],
    'application/vnd.amazon.ebook': ['azw'],
    'application/vnd.americandynamics.acc': ['acc'],
    'application/vnd.amiga.ami': ['ami'],
    'application/vnd.android.package-archive': ['apk'],
    'application/vnd.anser-web-certificate-issue-initiation': ['cii'],
    'application/vnd.anser-web-funds-transfer-initiation': ['fti'],
    'application/vnd.antix.game-component': ['atx'],
    'application/vnd.apple.installer+xml': ['mpkg'],
    'application/vnd.apple.keynote': ['key'],
    'application/vnd.apple.mpegurl': ['m3u8'],
    'application/vnd.apple.numbers': ['numbers'],
    'application/vnd.apple.pages': ['pages'],
    'application/vnd.apple.pkpass': ['pkpass'],
    'application/vnd.aristanetworks.swi': ['swi'],
    'application/vnd.astraea-software.iota': ['iota'],
    'application/vnd.audiograph': ['aep'],
    'application/vnd.balsamiq.bmml+xml': ['bmml'],
    'application/vnd.blueice.multipass': ['mpm'],
    'application/vnd.bmi': ['bmi'],
    'application/vnd.businessobjects': ['rep'],
    'application/vnd.chemdraw+xml': ['cdxml'],
    'application/vnd.chipnuts.karaoke-mmd': ['mmd'],
    'application/vnd.cinderella': ['cdy'],
    'application/vnd.citationstyles.style+xml': ['csl'],
    'application/vnd.claymore': ['cla'],
    'application/vnd.cloanto.rp9': ['rp9'],
    'application/vnd.clonk.c4group': ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
    'application/vnd.cluetrust.cartomobile-config': ['c11amc'],
    'application/vnd.cluetrust.cartomobile-config-pkg': ['c11amz'],
    'application/vnd.commonspace': ['csp'],
    'application/vnd.contact.cmsg': ['cdbcmsg'],
    'application/vnd.cosmocaller': ['cmc'],
    'application/vnd.crick.clicker': ['clkx'],
    'application/vnd.crick.clicker.keyboard': ['clkk'],
    'application/vnd.crick.clicker.palette': ['clkp'],
    'application/vnd.crick.clicker.template': ['clkt'],
    'application/vnd.crick.clicker.wordbank': ['clkw'],
    'application/vnd.criticaltools.wbs+xml': ['wbs'],
    'application/vnd.ctc-posml': ['pml'],
    'application/vnd.cups-ppd': ['ppd'],
    'application/vnd.curl.car': ['car'],
    'application/vnd.curl.pcurl': ['pcurl'],
    'application/vnd.dart': ['dart'],
    'application/vnd.data-vision.rdz': ['rdz'],
    'application/vnd.dbf': ['dbf'],
    'application/vnd.dece.data': ['uvf', 'uvvf', 'uvd', 'uvvd'],
    'application/vnd.dece.ttml+xml': ['uvt', 'uvvt'],
    'application/vnd.dece.unspecified': ['uvx', 'uvvx'],
    'application/vnd.dece.zip': ['uvz', 'uvvz'],
    'application/vnd.denovo.fcselayout-link': ['fe_launch'],
    'application/vnd.dna': ['dna'],
    'application/vnd.dolby.mlp': ['mlp'],
    'application/vnd.dpgraph': ['dpg'],
    'application/vnd.dreamfactory': ['dfac'],
    'application/vnd.ds-keypoint': ['kpxx'],
    'application/vnd.dvb.ait': ['ait'],
    'application/vnd.dvb.service': ['svc'],
    'application/vnd.dynageo': ['geo'],
    'application/vnd.ecowin.chart': ['mag'],
    'application/vnd.enliven': ['nml'],
    'application/vnd.epson.esf': ['esf'],
    'application/vnd.epson.msf': ['msf'],
    'application/vnd.epson.quickanime': ['qam'],
    'application/vnd.epson.salt': ['slt'],
    'application/vnd.epson.ssf': ['ssf'],
    'application/vnd.eszigno3+xml': ['es3', 'et3'],
    'application/vnd.ezpix-album': ['ez2'],
    'application/vnd.ezpix-package': ['ez3'],
    'application/vnd.fdf': ['*fdf'],
    'application/vnd.fdsn.mseed': ['mseed'],
    'application/vnd.fdsn.seed': ['seed', 'dataless'],
    'application/vnd.flographit': ['gph'],
    'application/vnd.fluxtime.clip': ['ftc'],
    'application/vnd.framemaker': ['fm', 'frame', 'maker', 'book'],
    'application/vnd.frogans.fnc': ['fnc'],
    'application/vnd.frogans.ltf': ['ltf'],
    'application/vnd.fsc.weblaunch': ['fsc'],
    'application/vnd.fujitsu.oasys': ['oas'],
    'application/vnd.fujitsu.oasys2': ['oa2'],
    'application/vnd.fujitsu.oasys3': ['oa3'],
    'application/vnd.fujitsu.oasysgp': ['fg5'],
    'application/vnd.fujitsu.oasysprs': ['bh2'],
    'application/vnd.fujixerox.ddd': ['ddd'],
    'application/vnd.fujixerox.docuworks': ['xdw'],
    'application/vnd.fujixerox.docuworks.binder': ['xbd'],
    'application/vnd.fuzzysheet': ['fzs'],
    'application/vnd.genomatix.tuxedo': ['txd'],
    'application/vnd.geogebra.file': ['ggb'],
    'application/vnd.geogebra.tool': ['ggt'],
    'application/vnd.geometry-explorer': ['gex', 'gre'],
    'application/vnd.geonext': ['gxt'],
    'application/vnd.geoplan': ['g2w'],
    'application/vnd.geospace': ['g3w'],
    'application/vnd.gmx': ['gmx'],
    'application/vnd.google-apps.document': ['gdoc'],
    'application/vnd.google-apps.presentation': ['gslides'],
    'application/vnd.google-apps.spreadsheet': ['gsheet'],
    'application/vnd.google-earth.kml+xml': ['kml'],
    'application/vnd.google-earth.kmz': ['kmz'],
    'application/vnd.grafeq': ['gqf', 'gqs'],
    'application/vnd.groove-account': ['gac'],
    'application/vnd.groove-help': ['ghf'],
    'application/vnd.groove-identity-message': ['gim'],
    'application/vnd.groove-injector': ['grv'],
    'application/vnd.groove-tool-message': ['gtm'],
    'application/vnd.groove-tool-template': ['tpl'],
    'application/vnd.groove-vcard': ['vcg'],
    'application/vnd.hal+xml': ['hal'],
    'application/vnd.handheld-entertainment+xml': ['zmm'],
    'application/vnd.hbci': ['hbci'],
    'application/vnd.hhe.lesson-player': ['les'],
    'application/vnd.hp-hpgl': ['hpgl'],
    'application/vnd.hp-hpid': ['hpid'],
    'application/vnd.hp-hps': ['hps'],
    'application/vnd.hp-jlyt': ['jlt'],
    'application/vnd.hp-pcl': ['pcl'],
    'application/vnd.hp-pclxl': ['pclxl'],
    'application/vnd.hydrostatix.sof-data': ['sfd-hdstx'],
    'application/vnd.ibm.minipay': ['mpy'],
    'application/vnd.ibm.modcap': ['afp', 'listafp', 'list3820'],
    'application/vnd.ibm.rights-management': ['irm'],
    'application/vnd.ibm.secure-container': ['sc'],
    'application/vnd.iccprofile': ['icc', 'icm'],
    'application/vnd.igloader': ['igl'],
    'application/vnd.immervision-ivp': ['ivp'],
    'application/vnd.immervision-ivu': ['ivu'],
    'application/vnd.insors.igm': ['igm'],
    'application/vnd.intercon.formnet': ['xpw', 'xpx'],
    'application/vnd.intergeo': ['i2g'],
    'application/vnd.intu.qbo': ['qbo'],
    'application/vnd.intu.qfx': ['qfx'],
    'application/vnd.ipunplugged.rcprofile': ['rcprofile'],
    'application/vnd.irepository.package+xml': ['irp'],
    'application/vnd.is-xpr': ['xpr'],
    'application/vnd.isac.fcs': ['fcs'],
    'application/vnd.jam': ['jam'],
    'application/vnd.jcp.javame.midlet-rms': ['rms'],
    'application/vnd.jisp': ['jisp'],
    'application/vnd.joost.joda-archive': ['joda'],
    'application/vnd.kahootz': ['ktz', 'ktr'],
    'application/vnd.kde.karbon': ['karbon'],
    'application/vnd.kde.kchart': ['chrt'],
    'application/vnd.kde.kformula': ['kfo'],
    'application/vnd.kde.kivio': ['flw'],
    'application/vnd.kde.kontour': ['kon'],
    'application/vnd.kde.kpresenter': ['kpr', 'kpt'],
    'application/vnd.kde.kspread': ['ksp'],
    'application/vnd.kde.kword': ['kwd', 'kwt'],
    'application/vnd.kenameaapp': ['htke'],
    'application/vnd.kidspiration': ['kia'],
    'application/vnd.kinar': ['kne', 'knp'],
    'application/vnd.koan': ['skp', 'skd', 'skt', 'skm'],
    'application/vnd.kodak-descriptor': ['sse'],
    'application/vnd.las.las+xml': ['lasxml'],
    'application/vnd.llamagraphics.life-balance.desktop': ['lbd'],
    'application/vnd.llamagraphics.life-balance.exchange+xml': ['lbe'],
    'application/vnd.lotus-1-2-3': ['123'],
    'application/vnd.lotus-approach': ['apr'],
    'application/vnd.lotus-freelance': ['pre'],
    'application/vnd.lotus-notes': ['nsf'],
    'application/vnd.lotus-organizer': ['org'],
    'application/vnd.lotus-screencam': ['scm'],
    'application/vnd.lotus-wordpro': ['lwp'],
    'application/vnd.macports.portpkg': ['portpkg'],
    'application/vnd.mapbox-vector-tile': ['mvt'],
    'application/vnd.mcd': ['mcd'],
    'application/vnd.medcalcdata': ['mc1'],
    'application/vnd.mediastation.cdkey': ['cdkey'],
    'application/vnd.mfer': ['mwf'],
    'application/vnd.mfmp': ['mfm'],
    'application/vnd.micrografx.flo': ['flo'],
    'application/vnd.micrografx.igx': ['igx'],
    'application/vnd.mif': ['mif'],
    'application/vnd.mobius.daf': ['daf'],
    'application/vnd.mobius.dis': ['dis'],
    'application/vnd.mobius.mbk': ['mbk'],
    'application/vnd.mobius.mqy': ['mqy'],
    'application/vnd.mobius.msl': ['msl'],
    'application/vnd.mobius.plc': ['plc'],
    'application/vnd.mobius.txf': ['txf'],
    'application/vnd.mophun.application': ['mpn'],
    'application/vnd.mophun.certificate': ['mpc'],
    'application/vnd.mozilla.xul+xml': ['xul'],
    'application/vnd.ms-artgalry': ['cil'],
    'application/vnd.ms-cab-compressed': ['cab'],
    'application/vnd.ms-excel': ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
    'application/vnd.ms-excel.addin.macroenabled.12': ['xlam'],
    'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['xlsb'],
    'application/vnd.ms-excel.sheet.macroenabled.12': ['xlsm'],
    'application/vnd.ms-excel.template.macroenabled.12': ['xltm'],
    'application/vnd.ms-fontobject': ['eot'],
    'application/vnd.ms-htmlhelp': ['chm'],
    'application/vnd.ms-ims': ['ims'],
    'application/vnd.ms-lrm': ['lrm'],
    'application/vnd.ms-officetheme': ['thmx'],
    'application/vnd.ms-outlook': ['msg'],
    'application/vnd.ms-pki.seccat': ['cat'],
    'application/vnd.ms-pki.stl': ['*stl'],
    'application/vnd.ms-powerpoint': ['ppt', 'pps', 'pot'],
    'application/vnd.ms-powerpoint.addin.macroenabled.12': ['ppam'],
    'application/vnd.ms-powerpoint.presentation.macroenabled.12': ['pptm'],
    'application/vnd.ms-powerpoint.slide.macroenabled.12': ['sldm'],
    'application/vnd.ms-powerpoint.slideshow.macroenabled.12': ['ppsm'],
    'application/vnd.ms-powerpoint.template.macroenabled.12': ['potm'],
    'application/vnd.ms-project': ['*mpp', 'mpt'],
    'application/vnd.ms-word.document.macroenabled.12': ['docm'],
    'application/vnd.ms-word.template.macroenabled.12': ['dotm'],
    'application/vnd.ms-works': ['wps', 'wks', 'wcm', 'wdb'],
    'application/vnd.ms-wpl': ['wpl'],
    'application/vnd.ms-xpsdocument': ['xps'],
    'application/vnd.mseq': ['mseq'],
    'application/vnd.musician': ['mus'],
    'application/vnd.muvee.style': ['msty'],
    'application/vnd.mynfc': ['taglet'],
    'application/vnd.neurolanguage.nlu': ['nlu'],
    'application/vnd.nitf': ['ntf', 'nitf'],
    'application/vnd.noblenet-directory': ['nnd'],
    'application/vnd.noblenet-sealer': ['nns'],
    'application/vnd.noblenet-web': ['nnw'],
    'application/vnd.nokia.n-gage.ac+xml': ['*ac'],
    'application/vnd.nokia.n-gage.data': ['ngdat'],
    'application/vnd.nokia.n-gage.symbian.install': ['n-gage'],
    'application/vnd.nokia.radio-preset': ['rpst'],
    'application/vnd.nokia.radio-presets': ['rpss'],
    'application/vnd.novadigm.edm': ['edm'],
    'application/vnd.novadigm.edx': ['edx'],
    'application/vnd.novadigm.ext': ['ext'],
    'application/vnd.oasis.opendocument.chart': ['odc'],
    'application/vnd.oasis.opendocument.chart-template': ['otc'],
    'application/vnd.oasis.opendocument.database': ['odb'],
    'application/vnd.oasis.opendocument.formula': ['odf'],
    'application/vnd.oasis.opendocument.formula-template': ['odft'],
    'application/vnd.oasis.opendocument.graphics': ['odg'],
    'application/vnd.oasis.opendocument.graphics-template': ['otg'],
    'application/vnd.oasis.opendocument.image': ['odi'],
    'application/vnd.oasis.opendocument.image-template': ['oti'],
    'application/vnd.oasis.opendocument.presentation': ['odp'],
    'application/vnd.oasis.opendocument.presentation-template': ['otp'],
    'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
    'application/vnd.oasis.opendocument.spreadsheet-template': ['ots'],
    'application/vnd.oasis.opendocument.text': ['odt'],
    'application/vnd.oasis.opendocument.text-master': ['odm'],
    'application/vnd.oasis.opendocument.text-template': ['ott'],
    'application/vnd.oasis.opendocument.text-web': ['oth'],
    'application/vnd.olpc-sugar': ['xo'],
    'application/vnd.oma.dd2+xml': ['dd2'],
    'application/vnd.openblox.game+xml': ['obgx'],
    'application/vnd.openofficeorg.extension': ['oxt'],
    'application/vnd.openstreetmap.data+xml': ['osm'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['pptx'],
    'application/vnd.openxmlformats-officedocument.presentationml.slide': [
        'sldx',
    ],
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': [
        'ppsx',
    ],
    'application/vnd.openxmlformats-officedocument.presentationml.template': [
        'potx',
    ],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        'xlsx',
    ],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': [
        'xltx',
    ],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        'docx',
    ],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': [
        'dotx',
    ],
    'application/vnd.osgeo.mapguide.package': ['mgp'],
    'application/vnd.osgi.dp': ['dp'],
    'application/vnd.osgi.subsystem': ['esa'],
    'application/vnd.palm': ['pdb', 'pqa', 'oprc'],
    'application/vnd.pawaafile': ['paw'],
    'application/vnd.pg.format': ['str'],
    'application/vnd.pg.osasli': ['ei6'],
    'application/vnd.picsel': ['efif'],
    'application/vnd.pmi.widget': ['wg'],
    'application/vnd.pocketlearn': ['plf'],
    'application/vnd.powerbuilder6': ['pbd'],
    'application/vnd.previewsystems.box': ['box'],
    'application/vnd.proteus.magazine': ['mgz'],
    'application/vnd.publishare-delta-tree': ['qps'],
    'application/vnd.pvi.ptid1': ['ptid'],
    'application/vnd.pwg-xhtml-print+xml': ['xhtm'],
    'application/vnd.quark.quarkxpress': [
        'qxd',
        'qxt',
        'qwd',
        'qwt',
        'qxl',
        'qxb',
    ],
    'application/vnd.rar': ['rar'],
    'application/vnd.realvnc.bed': ['bed'],
    'application/vnd.recordare.musicxml': ['mxl'],
    'application/vnd.recordare.musicxml+xml': ['musicxml'],
    'application/vnd.rig.cryptonote': ['cryptonote'],
    'application/vnd.rim.cod': ['cod'],
    'application/vnd.rn-realmedia': ['rm'],
    'application/vnd.rn-realmedia-vbr': ['rmvb'],
    'application/vnd.route66.link66+xml': ['link66'],
    'application/vnd.sailingtracker.track': ['st'],
    'application/vnd.seemail': ['see'],
    'application/vnd.sema': ['sema'],
    'application/vnd.semd': ['semd'],
    'application/vnd.semf': ['semf'],
    'application/vnd.shana.informed.formdata': ['ifm'],
    'application/vnd.shana.informed.formtemplate': ['itp'],
    'application/vnd.shana.informed.interchange': ['iif'],
    'application/vnd.shana.informed.package': ['ipk'],
    'application/vnd.simtech-mindmapper': ['twd', 'twds'],
    'application/vnd.smaf': ['mmf'],
    'application/vnd.smart.teacher': ['teacher'],
    'application/vnd.software602.filler.form+xml': ['fo'],
    'application/vnd.solent.sdkm+xml': ['sdkm', 'sdkd'],
    'application/vnd.spotfire.dxp': ['dxp'],
    'application/vnd.spotfire.sfs': ['sfs'],
    'application/vnd.stardivision.calc': ['sdc'],
    'application/vnd.stardivision.draw': ['sda'],
    'application/vnd.stardivision.impress': ['sdd'],
    'application/vnd.stardivision.math': ['smf'],
    'application/vnd.stardivision.writer': ['sdw', 'vor'],
    'application/vnd.stardivision.writer-global': ['sgl'],
    'application/vnd.stepmania.package': ['smzip'],
    'application/vnd.stepmania.stepchart': ['sm'],
    'application/vnd.sun.wadl+xml': ['wadl'],
    'application/vnd.sun.xml.calc': ['sxc'],
    'application/vnd.sun.xml.calc.template': ['stc'],
    'application/vnd.sun.xml.draw': ['sxd'],
    'application/vnd.sun.xml.draw.template': ['std'],
    'application/vnd.sun.xml.impress': ['sxi'],
    'application/vnd.sun.xml.impress.template': ['sti'],
    'application/vnd.sun.xml.math': ['sxm'],
    'application/vnd.sun.xml.writer': ['sxw'],
    'application/vnd.sun.xml.writer.global': ['sxg'],
    'application/vnd.sun.xml.writer.template': ['stw'],
    'application/vnd.sus-calendar': ['sus', 'susp'],
    'application/vnd.svd': ['svd'],
    'application/vnd.symbian.install': ['sis', 'sisx'],
    'application/vnd.syncml+xml': ['xsm'],
    'application/vnd.syncml.dm+wbxml': ['bdm'],
    'application/vnd.syncml.dm+xml': ['xdm'],
    'application/vnd.syncml.dmddf+xml': ['ddf'],
    'application/vnd.tao.intent-module-archive': ['tao'],
    'application/vnd.tcpdump.pcap': ['pcap', 'cap', 'dmp'],
    'application/vnd.tmobile-livetv': ['tmo'],
    'application/vnd.trid.tpt': ['tpt'],
    'application/vnd.triscape.mxs': ['mxs'],
    'application/vnd.trueapp': ['tra'],
    'application/vnd.ufdl': ['ufd', 'ufdl'],
    'application/vnd.uiq.theme': ['utz'],
    'application/vnd.umajin': ['umj'],
    'application/vnd.unity': ['unityweb'],
    'application/vnd.uoml+xml': ['uoml', 'uo'],
    'application/vnd.vcx': ['vcx'],
    'application/vnd.visio': ['vsd', 'vst', 'vss', 'vsw'],
    'application/vnd.visionary': ['vis'],
    'application/vnd.vsf': ['vsf'],
    'application/vnd.wap.wbxml': ['wbxml'],
    'application/vnd.wap.wmlc': ['wmlc'],
    'application/vnd.wap.wmlscriptc': ['wmlsc'],
    'application/vnd.webturbo': ['wtb'],
    'application/vnd.wolfram.player': ['nbp'],
    'application/vnd.wordperfect': ['wpd'],
    'application/vnd.wqd': ['wqd'],
    'application/vnd.wt.stf': ['stf'],
    'application/vnd.xara': ['xar'],
    'application/vnd.xfdl': ['xfdl'],
    'application/vnd.yamaha.hv-dic': ['hvd'],
    'application/vnd.yamaha.hv-script': ['hvs'],
    'application/vnd.yamaha.hv-voice': ['hvp'],
    'application/vnd.yamaha.openscoreformat': ['osf'],
    'application/vnd.yamaha.openscoreformat.osfpvg+xml': ['osfpvg'],
    'application/vnd.yamaha.smaf-audio': ['saf'],
    'application/vnd.yamaha.smaf-phrase': ['spf'],
    'application/vnd.yellowriver-custom-menu': ['cmp'],
    'application/vnd.zul': ['zir', 'zirz'],
    'application/vnd.zzazz.deck+xml': ['zaz'],
    'application/x-7z-compressed': ['7z'],
    'application/x-abiword': ['abw'],
    'application/x-ace-compressed': ['ace'],
    'application/x-apple-diskimage': ['*dmg'],
    'application/x-arj': ['arj'],
    'application/x-authorware-bin': ['aab', 'x32', 'u32', 'vox'],
    'application/x-authorware-map': ['aam'],
    'application/x-authorware-seg': ['aas'],
    'application/x-bcpio': ['bcpio'],
    'application/x-bdoc': ['*bdoc'],
    'application/x-bittorrent': ['torrent'],
    'application/x-blorb': ['blb', 'blorb'],
    'application/x-bzip': ['bz'],
    'application/x-bzip2': ['bz2', 'boz'],
    'application/x-cbr': ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
    'application/x-cdlink': ['vcd'],
    'application/x-cfs-compressed': ['cfs'],
    'application/x-chat': ['chat'],
    'application/x-chess-pgn': ['pgn'],
    'application/x-chrome-extension': ['crx'],
    'application/x-cocoa': ['cco'],
    'application/x-conference': ['nsc'],
    'application/x-cpio': ['cpio'],
    'application/x-csh': ['csh'],
    'application/x-debian-package': ['*deb', 'udeb'],
    'application/x-dgc-compressed': ['dgc'],
    'application/x-director': [
        'dir',
        'dcr',
        'dxr',
        'cst',
        'cct',
        'cxt',
        'w3d',
        'fgd',
        'swa',
    ],
    'application/x-doom': ['wad'],
    'application/x-dtbncx+xml': ['ncx'],
    'application/x-dtbook+xml': ['dtb'],
    'application/x-dtbresource+xml': ['res'],
    'application/x-dvi': ['dvi'],
    'application/x-envoy': ['evy'],
    'application/x-eva': ['eva'],
    'application/x-font-bdf': ['bdf'],
    'application/x-font-ghostscript': ['gsf'],
    'application/x-font-linux-psf': ['psf'],
    'application/x-font-pcf': ['pcf'],
    'application/x-font-snf': ['snf'],
    'application/x-font-type1': ['pfa', 'pfb', 'pfm', 'afm'],
    'application/x-freearc': ['arc'],
    'application/x-futuresplash': ['spl'],
    'application/x-gca-compressed': ['gca'],
    'application/x-glulx': ['ulx'],
    'application/x-gnumeric': ['gnumeric'],
    'application/x-gramps-xml': ['gramps'],
    'application/x-gtar': ['gtar'],
    'application/x-hdf': ['hdf'],
    'application/x-httpd-php': ['php'],
    'application/x-install-instructions': ['install'],
    'application/x-iso9660-image': ['*iso'],
    'application/x-iwork-keynote-sffkey': ['*key'],
    'application/x-iwork-numbers-sffnumbers': ['*numbers'],
    'application/x-iwork-pages-sffpages': ['*pages'],
    'application/x-java-archive-diff': ['jardiff'],
    'application/x-java-jnlp-file': ['jnlp'],
    'application/x-keepass2': ['kdbx'],
    'application/x-latex': ['latex'],
    'application/x-lua-bytecode': ['luac'],
    'application/x-lzh-compressed': ['lzh', 'lha'],
    'application/x-makeself': ['run'],
    'application/x-mie': ['mie'],
    'application/x-mobipocket-ebook': ['*prc', 'mobi'],
    'application/x-ms-application': ['application'],
    'application/x-ms-shortcut': ['lnk'],
    'application/x-ms-wmd': ['wmd'],
    'application/x-ms-wmz': ['wmz'],
    'application/x-ms-xbap': ['xbap'],
    'application/x-msaccess': ['mdb'],
    'application/x-msbinder': ['obd'],
    'application/x-mscardfile': ['crd'],
    'application/x-msclip': ['clp'],
    'application/x-msdos-program': ['*exe'],
    'application/x-msdownload': ['*exe', '*dll', 'com', 'bat', '*msi'],
    'application/x-msmediaview': ['mvb', 'm13', 'm14'],
    'application/x-msmetafile': ['*wmf', '*wmz', '*emf', 'emz'],
    'application/x-msmoney': ['mny'],
    'application/x-mspublisher': ['pub'],
    'application/x-msschedule': ['scd'],
    'application/x-msterminal': ['trm'],
    'application/x-mswrite': ['wri'],
    'application/x-netcdf': ['nc', 'cdf'],
    'application/x-ns-proxy-autoconfig': ['pac'],
    'application/x-nzb': ['nzb'],
    'application/x-perl': ['pl', 'pm'],
    'application/x-pilot': ['*prc', '*pdb'],
    'application/x-pkcs12': ['p12', 'pfx'],
    'application/x-pkcs7-certificates': ['p7b', 'spc'],
    'application/x-pkcs7-certreqresp': ['p7r'],
    'application/x-rar-compressed': ['*rar'],
    'application/x-redhat-package-manager': ['rpm'],
    'application/x-research-info-systems': ['ris'],
    'application/x-sea': ['sea'],
    'application/x-sh': ['sh'],
    'application/x-shar': ['shar'],
    'application/x-shockwave-flash': ['swf'],
    'application/x-silverlight-app': ['xap'],
    'application/x-sql': ['*sql'],
    'application/x-stuffit': ['sit'],
    'application/x-stuffitx': ['sitx'],
    'application/x-subrip': ['srt'],
    'application/x-sv4cpio': ['sv4cpio'],
    'application/x-sv4crc': ['sv4crc'],
    'application/x-t3vm-image': ['t3'],
    'application/x-tads': ['gam'],
    'application/x-tar': ['tar'],
    'application/x-tcl': ['tcl', 'tk'],
    'application/x-tex': ['tex'],
    'application/x-tex-tfm': ['tfm'],
    'application/x-texinfo': ['texinfo', 'texi'],
    'application/x-tgif': ['*obj'],
    'application/x-ustar': ['ustar'],
    'application/x-virtualbox-hdd': ['hdd'],
    'application/x-virtualbox-ova': ['ova'],
    'application/x-virtualbox-ovf': ['ovf'],
    'application/x-virtualbox-vbox': ['vbox'],
    'application/x-virtualbox-vbox-extpack': ['vbox-extpack'],
    'application/x-virtualbox-vdi': ['vdi'],
    'application/x-virtualbox-vhd': ['vhd'],
    'application/x-virtualbox-vmdk': ['vmdk'],
    'application/x-wais-source': ['src'],
    'application/x-web-app-manifest+json': ['webapp'],
    'application/x-x509-ca-cert': ['der', 'crt', 'pem'],
    'application/x-xfig': ['fig'],
    'application/x-xliff+xml': ['*xlf'],
    'application/x-xpinstall': ['xpi'],
    'application/x-xz': ['xz'],
    'application/x-zmachine': ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'],
    'audio/vnd.dece.audio': ['uva', 'uvva'],
    'audio/vnd.digital-winds': ['eol'],
    'audio/vnd.dra': ['dra'],
    'audio/vnd.dts': ['dts'],
    'audio/vnd.dts.hd': ['dtshd'],
    'audio/vnd.lucent.voice': ['lvp'],
    'audio/vnd.ms-playready.media.pya': ['pya'],
    'audio/vnd.nuera.ecelp4800': ['ecelp4800'],
    'audio/vnd.nuera.ecelp7470': ['ecelp7470'],
    'audio/vnd.nuera.ecelp9600': ['ecelp9600'],
    'audio/vnd.rip': ['rip'],
    'audio/x-aac': ['*aac'],
    'audio/x-aiff': ['aif', 'aiff', 'aifc'],
    'audio/x-caf': ['caf'],
    'audio/x-flac': ['flac'],
    'audio/x-m4a': ['*m4a'],
    'audio/x-matroska': ['mka'],
    'audio/x-mpegurl': ['m3u'],
    'audio/x-ms-wax': ['wax'],
    'audio/x-ms-wma': ['wma'],
    'audio/x-pn-realaudio': ['ram', 'ra'],
    'audio/x-pn-realaudio-plugin': ['rmp'],
    'audio/x-realaudio': ['*ra'],
    'audio/x-wav': ['*wav'],
    'chemical/x-cdx': ['cdx'],
    'chemical/x-cif': ['cif'],
    'chemical/x-cmdf': ['cmdf'],
    'chemical/x-cml': ['cml'],
    'chemical/x-csml': ['csml'],
    'chemical/x-xyz': ['xyz'],
    'image/prs.btif': ['btif', 'btf'],
    'image/prs.pti': ['pti'],
    'image/vnd.adobe.photoshop': ['psd'],
    'image/vnd.airzip.accelerator.azv': ['azv'],
    'image/vnd.dece.graphic': ['uvi', 'uvvi', 'uvg', 'uvvg'],
    'image/vnd.djvu': ['djvu', 'djv'],
    'image/vnd.dvb.subtitle': ['*sub'],
    'image/vnd.dwg': ['dwg'],
    'image/vnd.dxf': ['dxf'],
    'image/vnd.fastbidsheet': ['fbs'],
    'image/vnd.fpx': ['fpx'],
    'image/vnd.fst': ['fst'],
    'image/vnd.fujixerox.edmics-mmr': ['mmr'],
    'image/vnd.fujixerox.edmics-rlc': ['rlc'],
    'image/vnd.microsoft.icon': ['ico'],
    'image/vnd.ms-dds': ['dds'],
    'image/vnd.ms-modi': ['mdi'],
    'image/vnd.ms-photo': ['wdp'],
    'image/vnd.net-fpx': ['npx'],
    'image/vnd.pco.b16': ['b16'],
    'image/vnd.tencent.tap': ['tap'],
    'image/vnd.valve.source.texture': ['vtf'],
    'image/vnd.wap.wbmp': ['wbmp'],
    'image/vnd.xiff': ['xif'],
    'image/vnd.zbrush.pcx': ['pcx'],
    'image/x-3ds': ['3ds'],
    'image/x-cmu-raster': ['ras'],
    'image/x-cmx': ['cmx'],
    'image/x-freehand': ['fh', 'fhc', 'fh4', 'fh5', 'fh7'],
    'image/x-icon': ['*ico'],
    'image/x-jng': ['jng'],
    'image/x-mrsid-image': ['sid'],
    'image/x-ms-bmp': ['*bmp'],
    'image/x-pcx': ['*pcx'],
    'image/x-pict': ['pic', 'pct'],
    'image/x-portable-anymap': ['pnm'],
    'image/x-portable-bitmap': ['pbm'],
    'image/x-portable-graymap': ['pgm'],
    'image/x-portable-pixmap': ['ppm'],
    'image/x-rgb': ['rgb'],
    'image/x-tga': ['tga'],
    'image/x-xbitmap': ['xbm'],
    'image/x-xpixmap': ['xpm'],
    'image/x-xwindowdump': ['xwd'],
    'message/vnd.wfa.wsc': ['wsc'],
    'model/vnd.cld': ['cld'],
    'model/vnd.collada+xml': ['dae'],
    'model/vnd.dwf': ['dwf'],
    'model/vnd.gdl': ['gdl'],
    'model/vnd.gtw': ['gtw'],
    'model/vnd.mts': ['mts'],
    'model/vnd.opengex': ['ogex'],
    'model/vnd.parasolid.transmit.binary': ['x_b'],
    'model/vnd.parasolid.transmit.text': ['x_t'],
    'model/vnd.pytha.pyox': ['pyo', 'pyox'],
    'model/vnd.sap.vds': ['vds'],
    'model/vnd.usda': ['usda'],
    'model/vnd.usdz+zip': ['usdz'],
    'model/vnd.valve.source.compiled-map': ['bsp'],
    'model/vnd.vtu': ['vtu'],
    'text/prs.lines.tag': ['dsc'],
    'text/vnd.curl': ['curl'],
    'text/vnd.curl.dcurl': ['dcurl'],
    'text/vnd.curl.mcurl': ['mcurl'],
    'text/vnd.curl.scurl': ['scurl'],
    'text/vnd.dvb.subtitle': ['sub'],
    'text/vnd.familysearch.gedcom': ['ged'],
    'text/vnd.fly': ['fly'],
    'text/vnd.fmi.flexstor': ['flx'],
    'text/vnd.graphviz': ['gv'],
    'text/vnd.in3d.3dml': ['3dml'],
    'text/vnd.in3d.spot': ['spot'],
    'text/vnd.sun.j2me.app-descriptor': ['jad'],
    'text/vnd.wap.wml': ['wml'],
    'text/vnd.wap.wmlscript': ['wmls'],
    'text/x-asm': ['s', 'asm'],
    'text/x-c': ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
    'text/x-component': ['htc'],
    'text/x-fortran': ['f', 'for', 'f77', 'f90'],
    'text/x-handlebars-template': ['hbs'],
    'text/x-java-source': ['java'],
    'text/x-lua': ['lua'],
    'text/x-markdown': ['mkd'],
    'text/x-nfo': ['nfo'],
    'text/x-opml': ['opml'],
    'text/x-org': ['*org'],
    'text/x-pascal': ['p', 'pas'],
    'text/x-processing': ['pde'],
    'text/x-sass': ['sass'],
    'text/x-scss': ['scss'],
    'text/x-setext': ['etx'],
    'text/x-sfv': ['sfv'],
    'text/x-suse-ymp': ['ymp'],
    'text/x-uuencode': ['uu'],
    'text/x-vcalendar': ['vcs'],
    'text/x-vcard': ['vcf'],
    'video/vnd.dece.hd': ['uvh', 'uvvh'],
    'video/vnd.dece.mobile': ['uvm', 'uvvm'],
    'video/vnd.dece.pd': ['uvp', 'uvvp'],
    'video/vnd.dece.sd': ['uvs', 'uvvs'],
    'video/vnd.dece.video': ['uvv', 'uvvv'],
    'video/vnd.dvb.file': ['dvb'],
    'video/vnd.fvt': ['fvt'],
    'video/vnd.mpegurl': ['mxu', 'm4u'],
    'video/vnd.ms-playready.media.pyv': ['pyv'],
    'video/vnd.uvvu.mp4': ['uvu', 'uvvu'],
    'video/vnd.vivo': ['viv'],
    'video/x-f4v': ['f4v'],
    'video/x-fli': ['fli'],
    'video/x-flv': ['flv'],
    'video/x-m4v': ['m4v'],
    'video/x-matroska': ['mkv', 'mk3d', 'mks'],
    'video/x-mng': ['mng'],
    'video/x-ms-asf': ['asf', 'asx'],
    'video/x-ms-vob': ['vob'],
    'video/x-ms-wm': ['wm'],
    'video/x-ms-wmv': ['wmv'],
    'video/x-ms-wmx': ['wmx'],
    'video/x-ms-wvx': ['wvx'],
    'video/x-msvideo': ['avi'],
    'video/x-sgi-movie': ['movie'],
    'video/x-smv': ['smv'],
    'x-conference/x-cooltalk': ['ice'],
}
Object.freeze(No)
var Bo = No
var ko = {
    'application/andrew-inset': ['ez'],
    'application/appinstaller': ['appinstaller'],
    'application/applixware': ['aw'],
    'application/appx': ['appx'],
    'application/appxbundle': ['appxbundle'],
    'application/atom+xml': ['atom'],
    'application/atomcat+xml': ['atomcat'],
    'application/atomdeleted+xml': ['atomdeleted'],
    'application/atomsvc+xml': ['atomsvc'],
    'application/atsc-dwd+xml': ['dwd'],
    'application/atsc-held+xml': ['held'],
    'application/atsc-rsat+xml': ['rsat'],
    'application/automationml-aml+xml': ['aml'],
    'application/automationml-amlx+zip': ['amlx'],
    'application/bdoc': ['bdoc'],
    'application/calendar+xml': ['xcs'],
    'application/ccxml+xml': ['ccxml'],
    'application/cdfx+xml': ['cdfx'],
    'application/cdmi-capability': ['cdmia'],
    'application/cdmi-container': ['cdmic'],
    'application/cdmi-domain': ['cdmid'],
    'application/cdmi-object': ['cdmio'],
    'application/cdmi-queue': ['cdmiq'],
    'application/cpl+xml': ['cpl'],
    'application/cu-seeme': ['cu'],
    'application/cwl': ['cwl'],
    'application/dash+xml': ['mpd'],
    'application/dash-patch+xml': ['mpp'],
    'application/davmount+xml': ['davmount'],
    'application/docbook+xml': ['dbk'],
    'application/dssc+der': ['dssc'],
    'application/dssc+xml': ['xdssc'],
    'application/ecmascript': ['ecma'],
    'application/emma+xml': ['emma'],
    'application/emotionml+xml': ['emotionml'],
    'application/epub+zip': ['epub'],
    'application/exi': ['exi'],
    'application/express': ['exp'],
    'application/fdf': ['fdf'],
    'application/fdt+xml': ['fdt'],
    'application/font-tdpfr': ['pfr'],
    'application/geo+json': ['geojson'],
    'application/gml+xml': ['gml'],
    'application/gpx+xml': ['gpx'],
    'application/gxf': ['gxf'],
    'application/gzip': ['gz'],
    'application/hjson': ['hjson'],
    'application/hyperstudio': ['stk'],
    'application/inkml+xml': ['ink', 'inkml'],
    'application/ipfix': ['ipfix'],
    'application/its+xml': ['its'],
    'application/java-archive': ['jar', 'war', 'ear'],
    'application/java-serialized-object': ['ser'],
    'application/java-vm': ['class'],
    'application/javascript': ['*js'],
    'application/json': ['json', 'map'],
    'application/json5': ['json5'],
    'application/jsonml+json': ['jsonml'],
    'application/ld+json': ['jsonld'],
    'application/lgr+xml': ['lgr'],
    'application/lost+xml': ['lostxml'],
    'application/mac-binhex40': ['hqx'],
    'application/mac-compactpro': ['cpt'],
    'application/mads+xml': ['mads'],
    'application/manifest+json': ['webmanifest'],
    'application/marc': ['mrc'],
    'application/marcxml+xml': ['mrcx'],
    'application/mathematica': ['ma', 'nb', 'mb'],
    'application/mathml+xml': ['mathml'],
    'application/mbox': ['mbox'],
    'application/media-policy-dataset+xml': ['mpf'],
    'application/mediaservercontrol+xml': ['mscml'],
    'application/metalink+xml': ['metalink'],
    'application/metalink4+xml': ['meta4'],
    'application/mets+xml': ['mets'],
    'application/mmt-aei+xml': ['maei'],
    'application/mmt-usd+xml': ['musd'],
    'application/mods+xml': ['mods'],
    'application/mp21': ['m21', 'mp21'],
    'application/mp4': ['*mp4', '*mpg4', 'mp4s', 'm4p'],
    'application/msix': ['msix'],
    'application/msixbundle': ['msixbundle'],
    'application/msword': ['doc', 'dot'],
    'application/mxf': ['mxf'],
    'application/n-quads': ['nq'],
    'application/n-triples': ['nt'],
    'application/node': ['cjs'],
    'application/octet-stream': [
        'bin',
        'dms',
        'lrf',
        'mar',
        'so',
        'dist',
        'distz',
        'pkg',
        'bpk',
        'dump',
        'elc',
        'deploy',
        'exe',
        'dll',
        'deb',
        'dmg',
        'iso',
        'img',
        'msi',
        'msp',
        'msm',
        'buffer',
    ],
    'application/oda': ['oda'],
    'application/oebps-package+xml': ['opf'],
    'application/ogg': ['ogx'],
    'application/omdoc+xml': ['omdoc'],
    'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
    'application/oxps': ['oxps'],
    'application/p2p-overlay+xml': ['relo'],
    'application/patch-ops-error+xml': ['xer'],
    'application/pdf': ['pdf'],
    'application/pgp-encrypted': ['pgp'],
    'application/pgp-keys': ['asc'],
    'application/pgp-signature': ['sig', '*asc'],
    'application/pics-rules': ['prf'],
    'application/pkcs10': ['p10'],
    'application/pkcs7-mime': ['p7m', 'p7c'],
    'application/pkcs7-signature': ['p7s'],
    'application/pkcs8': ['p8'],
    'application/pkix-attr-cert': ['ac'],
    'application/pkix-cert': ['cer'],
    'application/pkix-crl': ['crl'],
    'application/pkix-pkipath': ['pkipath'],
    'application/pkixcmp': ['pki'],
    'application/pls+xml': ['pls'],
    'application/postscript': ['ai', 'eps', 'ps'],
    'application/provenance+xml': ['provx'],
    'application/pskc+xml': ['pskcxml'],
    'application/raml+yaml': ['raml'],
    'application/rdf+xml': ['rdf', 'owl'],
    'application/reginfo+xml': ['rif'],
    'application/relax-ng-compact-syntax': ['rnc'],
    'application/resource-lists+xml': ['rl'],
    'application/resource-lists-diff+xml': ['rld'],
    'application/rls-services+xml': ['rs'],
    'application/route-apd+xml': ['rapd'],
    'application/route-s-tsid+xml': ['sls'],
    'application/route-usd+xml': ['rusd'],
    'application/rpki-ghostbusters': ['gbr'],
    'application/rpki-manifest': ['mft'],
    'application/rpki-roa': ['roa'],
    'application/rsd+xml': ['rsd'],
    'application/rss+xml': ['rss'],
    'application/rtf': ['rtf'],
    'application/sbml+xml': ['sbml'],
    'application/scvp-cv-request': ['scq'],
    'application/scvp-cv-response': ['scs'],
    'application/scvp-vp-request': ['spq'],
    'application/scvp-vp-response': ['spp'],
    'application/sdp': ['sdp'],
    'application/senml+xml': ['senmlx'],
    'application/sensml+xml': ['sensmlx'],
    'application/set-payment-initiation': ['setpay'],
    'application/set-registration-initiation': ['setreg'],
    'application/shf+xml': ['shf'],
    'application/sieve': ['siv', 'sieve'],
    'application/smil+xml': ['smi', 'smil'],
    'application/sparql-query': ['rq'],
    'application/sparql-results+xml': ['srx'],
    'application/sql': ['sql'],
    'application/srgs': ['gram'],
    'application/srgs+xml': ['grxml'],
    'application/sru+xml': ['sru'],
    'application/ssdl+xml': ['ssdl'],
    'application/ssml+xml': ['ssml'],
    'application/swid+xml': ['swidtag'],
    'application/tei+xml': ['tei', 'teicorpus'],
    'application/thraud+xml': ['tfi'],
    'application/timestamped-data': ['tsd'],
    'application/toml': ['toml'],
    'application/trig': ['trig'],
    'application/ttml+xml': ['ttml'],
    'application/ubjson': ['ubj'],
    'application/urc-ressheet+xml': ['rsheet'],
    'application/urc-targetdesc+xml': ['td'],
    'application/voicexml+xml': ['vxml'],
    'application/wasm': ['wasm'],
    'application/watcherinfo+xml': ['wif'],
    'application/widget': ['wgt'],
    'application/winhlp': ['hlp'],
    'application/wsdl+xml': ['wsdl'],
    'application/wspolicy+xml': ['wspolicy'],
    'application/xaml+xml': ['xaml'],
    'application/xcap-att+xml': ['xav'],
    'application/xcap-caps+xml': ['xca'],
    'application/xcap-diff+xml': ['xdf'],
    'application/xcap-el+xml': ['xel'],
    'application/xcap-ns+xml': ['xns'],
    'application/xenc+xml': ['xenc'],
    'application/xfdf': ['xfdf'],
    'application/xhtml+xml': ['xhtml', 'xht'],
    'application/xliff+xml': ['xlf'],
    'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
    'application/xml-dtd': ['dtd'],
    'application/xop+xml': ['xop'],
    'application/xproc+xml': ['xpl'],
    'application/xslt+xml': ['*xsl', 'xslt'],
    'application/xspf+xml': ['xspf'],
    'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
    'application/yang': ['yang'],
    'application/yin+xml': ['yin'],
    'application/zip': ['zip'],
    'audio/3gpp': ['*3gpp'],
    'audio/aac': ['adts', 'aac'],
    'audio/adpcm': ['adp'],
    'audio/amr': ['amr'],
    'audio/basic': ['au', 'snd'],
    'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
    'audio/mobile-xmf': ['mxmf'],
    'audio/mp3': ['*mp3'],
    'audio/mp4': ['m4a', 'mp4a'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['oga', 'ogg', 'spx', 'opus'],
    'audio/s3m': ['s3m'],
    'audio/silk': ['sil'],
    'audio/wav': ['wav'],
    'audio/wave': ['*wav'],
    'audio/webm': ['weba'],
    'audio/xm': ['xm'],
    'font/collection': ['ttc'],
    'font/otf': ['otf'],
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    'image/aces': ['exr'],
    'image/apng': ['apng'],
    'image/avci': ['avci'],
    'image/avcs': ['avcs'],
    'image/avif': ['avif'],
    'image/bmp': ['bmp', 'dib'],
    'image/cgm': ['cgm'],
    'image/dicom-rle': ['drle'],
    'image/dpx': ['dpx'],
    'image/emf': ['emf'],
    'image/fits': ['fits'],
    'image/g3fax': ['g3'],
    'image/gif': ['gif'],
    'image/heic': ['heic'],
    'image/heic-sequence': ['heics'],
    'image/heif': ['heif'],
    'image/heif-sequence': ['heifs'],
    'image/hej2k': ['hej2'],
    'image/hsj2': ['hsj2'],
    'image/ief': ['ief'],
    'image/jls': ['jls'],
    'image/jp2': ['jp2', 'jpg2'],
    'image/jpeg': ['jpeg', 'jpg', 'jpe'],
    'image/jph': ['jph'],
    'image/jphc': ['jhc'],
    'image/jpm': ['jpm', 'jpgm'],
    'image/jpx': ['jpx', 'jpf'],
    'image/jxr': ['jxr'],
    'image/jxra': ['jxra'],
    'image/jxrs': ['jxrs'],
    'image/jxs': ['jxs'],
    'image/jxsc': ['jxsc'],
    'image/jxsi': ['jxsi'],
    'image/jxss': ['jxss'],
    'image/ktx': ['ktx'],
    'image/ktx2': ['ktx2'],
    'image/png': ['png'],
    'image/sgi': ['sgi'],
    'image/svg+xml': ['svg', 'svgz'],
    'image/t38': ['t38'],
    'image/tiff': ['tif', 'tiff'],
    'image/tiff-fx': ['tfx'],
    'image/webp': ['webp'],
    'image/wmf': ['wmf'],
    'message/disposition-notification': ['disposition-notification'],
    'message/global': ['u8msg'],
    'message/global-delivery-status': ['u8dsn'],
    'message/global-disposition-notification': ['u8mdn'],
    'message/global-headers': ['u8hdr'],
    'message/rfc822': ['eml', 'mime'],
    'model/3mf': ['3mf'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb'],
    'model/iges': ['igs', 'iges'],
    'model/jt': ['jt'],
    'model/mesh': ['msh', 'mesh', 'silo'],
    'model/mtl': ['mtl'],
    'model/obj': ['obj'],
    'model/prc': ['prc'],
    'model/step+xml': ['stpx'],
    'model/step+zip': ['stpz'],
    'model/step-xml+zip': ['stpxz'],
    'model/stl': ['stl'],
    'model/u3d': ['u3d'],
    'model/vrml': ['wrl', 'vrml'],
    'model/x3d+binary': ['*x3db', 'x3dbz'],
    'model/x3d+fastinfoset': ['x3db'],
    'model/x3d+vrml': ['*x3dv', 'x3dvz'],
    'model/x3d+xml': ['x3d', 'x3dz'],
    'model/x3d-vrml': ['x3dv'],
    'text/cache-manifest': ['appcache', 'manifest'],
    'text/calendar': ['ics', 'ifb'],
    'text/coffeescript': ['coffee', 'litcoffee'],
    'text/css': ['css'],
    'text/csv': ['csv'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/jade': ['jade'],
    'text/javascript': ['js', 'mjs'],
    'text/jsx': ['jsx'],
    'text/less': ['less'],
    'text/markdown': ['md', 'markdown'],
    'text/mathml': ['mml'],
    'text/mdx': ['mdx'],
    'text/n3': ['n3'],
    'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    'text/richtext': ['rtx'],
    'text/rtf': ['*rtf'],
    'text/sgml': ['sgml', 'sgm'],
    'text/shex': ['shex'],
    'text/slim': ['slim', 'slm'],
    'text/spdx': ['spdx'],
    'text/stylus': ['stylus', 'styl'],
    'text/tab-separated-values': ['tsv'],
    'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
    'text/turtle': ['ttl'],
    'text/uri-list': ['uri', 'uris', 'urls'],
    'text/vcard': ['vcard'],
    'text/vtt': ['vtt'],
    'text/wgsl': ['wgsl'],
    'text/xml': ['*xml'],
    'text/yaml': ['yaml', 'yml'],
    'video/3gpp': ['3gp', '3gpp'],
    'video/3gpp2': ['3g2'],
    'video/h261': ['h261'],
    'video/h263': ['h263'],
    'video/h264': ['h264'],
    'video/iso.segment': ['m4s'],
    'video/jpeg': ['jpgv'],
    'video/jpm': ['*jpm', '*jpgm'],
    'video/mj2': ['mj2', 'mjp2'],
    'video/mp2t': ['ts'],
    'video/mp4': ['mp4', 'mp4v', 'mpg4'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/ogg': ['ogv'],
    'video/quicktime': ['qt', 'mov'],
    'video/webm': ['webm'],
}
Object.freeze(ko)
var Vo = ko
var we = function (e, t, i, a) {
        if (i === 'a' && !a)
            throw new TypeError('Private accessor was defined without a getter')
        if (typeof t == 'function' ? e !== t || !a : !t.has(e))
            throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
            )
        return i === 'm' ? a : i === 'a' ? a.call(e) : a ? a.value : t.get(e)
    },
    yt,
    Wt,
    lt,
    ya = class {
        constructor(...t) {
            yt.set(this, new Map()),
                Wt.set(this, new Map()),
                lt.set(this, new Map())
            for (let i of t) this.define(i)
        }
        define(t, i = !1) {
            for (let [a, n] of Object.entries(t)) {
                ;(a = a.toLowerCase()),
                    (n = n.map((r) => r.toLowerCase())),
                    we(this, lt, 'f').has(a) ||
                        we(this, lt, 'f').set(a, new Set())
                let o = we(this, lt, 'f').get(a),
                    l = !0
                for (let r of n) {
                    let s = r.startsWith('*')
                    if (
                        ((r = s ? r.slice(1) : r),
                        o?.add(r),
                        l && we(this, Wt, 'f').set(a, r),
                        (l = !1),
                        s)
                    )
                        continue
                    let p = we(this, yt, 'f').get(r)
                    if (p && p != a && !i)
                        throw new Error(
                            `"${a} -> ${r}" conflicts with "${p} -> ${r}". Pass \`force=true\` to override this definition.`
                        )
                    we(this, yt, 'f').set(r, a)
                }
            }
            return this
        }
        getType(t) {
            if (typeof t != 'string') return null
            let i = t.replace(/^.*[/\\]/, '').toLowerCase(),
                a = i.replace(/^.*\./, '').toLowerCase(),
                n = i.length < t.length
            return !(a.length < i.length - 1) && n
                ? null
                : (we(this, yt, 'f').get(a) ?? null)
        }
        getExtension(t) {
            return typeof t != 'string'
                ? null
                : ((t = t?.split?.(';')[0]),
                  (t && we(this, Wt, 'f').get(t.trim().toLowerCase())) ?? null)
        }
        getAllExtensions(t) {
            return typeof t != 'string'
                ? null
                : (we(this, lt, 'f').get(t.toLowerCase()) ?? null)
        }
        _freeze() {
            ;(this.define = () => {
                throw new Error(
                    'define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances'
                )
            }),
                Object.freeze(this)
            for (let t of we(this, lt, 'f').values()) Object.freeze(t)
            return this
        }
        _getTestState() {
            return { types: we(this, yt, 'f'), extensions: we(this, Wt, 'f') }
        }
    }
;(yt = new WeakMap()), (Wt = new WeakMap()), (lt = new WeakMap())
var _a = ya
var Go = new _a(Vo, Bo)._freeze()
var Uo = ({ addFilter: e, utils: t }) => {
        let { Type: i, replaceInString: a, toNaturalFileSize: n } = t
        return (
            e('ALLOW_HOPPER_ITEM', (o, { query: l }) => {
                if (!l('GET_ALLOW_FILE_SIZE_VALIDATION')) return !0
                let r = l('GET_MAX_FILE_SIZE')
                if (r !== null && o.size > r) return !1
                let s = l('GET_MIN_FILE_SIZE')
                return !(s !== null && o.size < s)
            }),
            e(
                'LOAD_FILE',
                (o, { query: l }) =>
                    new Promise((r, s) => {
                        if (!l('GET_ALLOW_FILE_SIZE_VALIDATION')) return r(o)
                        let p = l('GET_FILE_VALIDATE_SIZE_FILTER')
                        if (p && !p(o)) return r(o)
                        let c = l('GET_MAX_FILE_SIZE')
                        if (c !== null && o.size > c) {
                            s({
                                status: {
                                    main: l('GET_LABEL_MAX_FILE_SIZE_EXCEEDED'),
                                    sub: a(l('GET_LABEL_MAX_FILE_SIZE'), {
                                        filesize: n(
                                            c,
                                            '.',
                                            l('GET_FILE_SIZE_BASE'),
                                            l('GET_FILE_SIZE_LABELS', l)
                                        ),
                                    }),
                                },
                            })
                            return
                        }
                        let d = l('GET_MIN_FILE_SIZE')
                        if (d !== null && o.size < d) {
                            s({
                                status: {
                                    main: l('GET_LABEL_MIN_FILE_SIZE_EXCEEDED'),
                                    sub: a(l('GET_LABEL_MIN_FILE_SIZE'), {
                                        filesize: n(
                                            d,
                                            '.',
                                            l('GET_FILE_SIZE_BASE'),
                                            l('GET_FILE_SIZE_LABELS', l)
                                        ),
                                    }),
                                },
                            })
                            return
                        }
                        let m = l('GET_MAX_TOTAL_FILE_SIZE')
                        if (
                            m !== null &&
                            l('GET_ACTIVE_ITEMS').reduce(
                                (f, h) => f + h.fileSize,
                                0
                            ) > m
                        ) {
                            s({
                                status: {
                                    main: l(
                                        'GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED'
                                    ),
                                    sub: a(l('GET_LABEL_MAX_TOTAL_FILE_SIZE'), {
                                        filesize: n(
                                            m,
                                            '.',
                                            l('GET_FILE_SIZE_BASE'),
                                            l('GET_FILE_SIZE_LABELS', l)
                                        ),
                                    }),
                                },
                            })
                            return
                        }
                        r(o)
                    })
            ),
            {
                options: {
                    allowFileSizeValidation: [!0, i.BOOLEAN],
                    maxFileSize: [null, i.INT],
                    minFileSize: [null, i.INT],
                    maxTotalFileSize: [null, i.INT],
                    fileValidateSizeFilter: [null, i.FUNCTION],
                    labelMinFileSizeExceeded: ['File is too small', i.STRING],
                    labelMinFileSize: [
                        'Minimum file size is {filesize}',
                        i.STRING,
                    ],
                    labelMaxFileSizeExceeded: ['File is too large', i.STRING],
                    labelMaxFileSize: [
                        'Maximum file size is {filesize}',
                        i.STRING,
                    ],
                    labelMaxTotalFileSizeExceeded: [
                        'Maximum total size exceeded',
                        i.STRING,
                    ],
                    labelMaxTotalFileSize: [
                        'Maximum total file size is {filesize}',
                        i.STRING,
                    ],
                },
            }
        )
    },
    Xp = typeof window < 'u' && typeof window.document < 'u'
Xp &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: Uo })
    )
var Wo = Uo
var Ho = ({ addFilter: e, utils: t }) => {
        let {
                Type: i,
                isString: a,
                replaceInString: n,
                guesstimateMimeType: o,
                getExtensionFromFilename: l,
                getFilenameFromURL: r,
            } = t,
            s = (u, f) => {
                let h = (/^[^/]+/.exec(u) || []).pop(),
                    g = f.slice(0, -2)
                return h === g
            },
            p = (u, f) => u.some((h) => (/\*$/.test(h) ? s(f, h) : h === f)),
            c = (u) => {
                let f = ''
                if (a(u)) {
                    let h = r(u),
                        g = l(h)
                    g && (f = o(g))
                } else f = u.type
                return f
            },
            d = (u, f, h) => {
                if (f.length === 0) return !0
                let g = c(u)
                return h
                    ? new Promise((v, E) => {
                          h(u, g)
                              .then((T) => {
                                  p(f, T) ? v() : E()
                              })
                              .catch(E)
                      })
                    : p(f, g)
            },
            m = (u) => (f) => (u[f] === null ? !1 : u[f] || f)
        return (
            e('SET_ATTRIBUTE_TO_OPTION_MAP', (u) =>
                Object.assign(u, { accept: 'acceptedFileTypes' })
            ),
            e('ALLOW_HOPPER_ITEM', (u, { query: f }) =>
                f('GET_ALLOW_FILE_TYPE_VALIDATION')
                    ? d(u, f('GET_ACCEPTED_FILE_TYPES'))
                    : !0
            ),
            e(
                'LOAD_FILE',
                (u, { query: f }) =>
                    new Promise((h, g) => {
                        if (!f('GET_ALLOW_FILE_TYPE_VALIDATION')) {
                            h(u)
                            return
                        }
                        let v = f('GET_ACCEPTED_FILE_TYPES'),
                            E = f('GET_FILE_VALIDATE_TYPE_DETECT_TYPE'),
                            T = d(u, v, E),
                            I = () => {
                                let y = v
                                        .map(
                                            m(
                                                f(
                                                    'GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP'
                                                )
                                            )
                                        )
                                        .filter((w) => w !== !1),
                                    b = y.filter((w, x) => y.indexOf(w) === x)
                                g({
                                    status: {
                                        main: f(
                                            'GET_LABEL_FILE_TYPE_NOT_ALLOWED'
                                        ),
                                        sub: n(
                                            f(
                                                'GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES'
                                            ),
                                            {
                                                allTypes: b.join(', '),
                                                allButLastType: b
                                                    .slice(0, -1)
                                                    .join(', '),
                                                lastType: b[b.length - 1],
                                            }
                                        ),
                                    },
                                })
                            }
                        if (typeof T == 'boolean') return T ? h(u) : I()
                        T.then(() => {
                            h(u)
                        }).catch(I)
                    })
            ),
            {
                options: {
                    allowFileTypeValidation: [!0, i.BOOLEAN],
                    acceptedFileTypes: [[], i.ARRAY],
                    labelFileTypeNotAllowed: [
                        'File is of invalid type',
                        i.STRING,
                    ],
                    fileValidateTypeLabelExpectedTypes: [
                        'Expects {allButLastType} or {lastType}',
                        i.STRING,
                    ],
                    fileValidateTypeLabelExpectedTypesMap: [{}, i.OBJECT],
                    fileValidateTypeDetectType: [null, i.FUNCTION],
                },
            }
        )
    },
    Qp = typeof window < 'u' && typeof window.document < 'u'
Qp &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: Ho })
    )
var jo = Ho
var Yo = (e) => /^image/.test(e.type),
    qo = ({ addFilter: e, utils: t }) => {
        let { Type: i, isFile: a, getNumericAspectRatioFromString: n } = t,
            o = (p, c) => !(!Yo(p.file) || !c('GET_ALLOW_IMAGE_CROP')),
            l = (p) => typeof p == 'object',
            r = (p) => typeof p == 'number',
            s = (p, c) =>
                p.setMetadata(
                    'crop',
                    Object.assign({}, p.getMetadata('crop'), c)
                )
        return (
            e('DID_CREATE_ITEM', (p, { query: c }) => {
                p.extend('setImageCrop', (d) => {
                    if (!(!o(p, c) || !l(center)))
                        return p.setMetadata('crop', d), d
                }),
                    p.extend('setImageCropCenter', (d) => {
                        if (!(!o(p, c) || !l(d))) return s(p, { center: d })
                    }),
                    p.extend('setImageCropZoom', (d) => {
                        if (!(!o(p, c) || !r(d)))
                            return s(p, { zoom: Math.max(1, d) })
                    }),
                    p.extend('setImageCropRotation', (d) => {
                        if (!(!o(p, c) || !r(d))) return s(p, { rotation: d })
                    }),
                    p.extend('setImageCropFlip', (d) => {
                        if (!(!o(p, c) || !l(d))) return s(p, { flip: d })
                    }),
                    p.extend('setImageCropAspectRatio', (d) => {
                        if (!o(p, c) || typeof d > 'u') return
                        let m = p.getMetadata('crop'),
                            u = n(d),
                            f = {
                                center: { x: 0.5, y: 0.5 },
                                flip: m
                                    ? Object.assign({}, m.flip)
                                    : { horizontal: !1, vertical: !1 },
                                rotation: 0,
                                zoom: 1,
                                aspectRatio: u,
                            }
                        return p.setMetadata('crop', f), f
                    })
            }),
            e(
                'DID_LOAD_ITEM',
                (p, { query: c }) =>
                    new Promise((d, m) => {
                        let u = p.file
                        if (
                            !a(u) ||
                            !Yo(u) ||
                            !c('GET_ALLOW_IMAGE_CROP') ||
                            p.getMetadata('crop')
                        )
                            return d(p)
                        let h = c('GET_IMAGE_CROP_ASPECT_RATIO')
                        p.setMetadata('crop', {
                            center: { x: 0.5, y: 0.5 },
                            flip: { horizontal: !1, vertical: !1 },
                            rotation: 0,
                            zoom: 1,
                            aspectRatio: h ? n(h) : null,
                        }),
                            d(p)
                    })
            ),
            {
                options: {
                    allowImageCrop: [!0, i.BOOLEAN],
                    imageCropAspectRatio: [null, i.STRING],
                },
            }
        )
    },
    Zp = typeof window < 'u' && typeof window.document < 'u'
Zp &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: qo })
    )
var $o = qo
var Ra = (e) => /^image/.test(e.type),
    Xo = (e) => {
        let { addFilter: t, utils: i, views: a } = e,
            { Type: n, createRoute: o, createItemAPI: l = (c) => c } = i,
            { fileActionButton: r } = a
        t(
            'SHOULD_REMOVE_ON_REVERT',
            (c, { item: d, query: m }) =>
                new Promise((u) => {
                    let { file: f } = d,
                        h =
                            m('GET_ALLOW_IMAGE_EDIT') &&
                            m('GET_IMAGE_EDIT_ALLOW_EDIT') &&
                            Ra(f)
                    u(!h)
                })
        ),
            t(
                'DID_LOAD_ITEM',
                (c, { query: d, dispatch: m }) =>
                    new Promise((u, f) => {
                        if (c.origin > 1) {
                            u(c)
                            return
                        }
                        let { file: h } = c
                        if (
                            !d('GET_ALLOW_IMAGE_EDIT') ||
                            !d('GET_IMAGE_EDIT_INSTANT_EDIT')
                        ) {
                            u(c)
                            return
                        }
                        if (!Ra(h)) {
                            u(c)
                            return
                        }
                        let g = (E, T, I) => (y) => {
                                s.shift(), y ? T(E) : I(E), m('KICK'), v()
                            },
                            v = () => {
                                if (!s.length) return
                                let { item: E, resolve: T, reject: I } = s[0]
                                m('EDIT_ITEM', {
                                    id: E.id,
                                    handleEditorResponse: g(E, T, I),
                                })
                            }
                        p({ item: c, resolve: u, reject: f }),
                            s.length === 1 && v()
                    })
            ),
            t('DID_CREATE_ITEM', (c, { query: d, dispatch: m }) => {
                c.extend('edit', () => {
                    m('EDIT_ITEM', { id: c.id })
                })
            })
        let s = [],
            p = (c) => (s.push(c), c)
        return (
            t('CREATE_VIEW', (c) => {
                let { is: d, view: m, query: u } = c
                if (!u('GET_ALLOW_IMAGE_EDIT')) return
                let f = u('GET_ALLOW_IMAGE_PREVIEW')
                if (!((d('file-info') && !f) || (d('file') && f))) return
                let g = u('GET_IMAGE_EDIT_EDITOR')
                if (!g) return
                g.filepondCallbackBridge ||
                    ((g.outputData = !0),
                    (g.outputFile = !1),
                    (g.filepondCallbackBridge = {
                        onconfirm: g.onconfirm || (() => {}),
                        oncancel: g.oncancel || (() => {}),
                    }))
                let v = ({ root: I, props: y, action: b }) => {
                        let { id: w } = y,
                            { handleEditorResponse: x } = b
                        ;(g.cropAspectRatio =
                            I.query('GET_IMAGE_CROP_ASPECT_RATIO') ||
                            g.cropAspectRatio),
                            (g.outputCanvasBackgroundColor =
                                I.query(
                                    'GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR'
                                ) || g.outputCanvasBackgroundColor)
                        let _ = I.query('GET_ITEM', w)
                        if (!_) return
                        let P = _.file,
                            O = _.getMetadata('crop'),
                            M = {
                                center: { x: 0.5, y: 0.5 },
                                flip: { horizontal: !1, vertical: !1 },
                                zoom: 1,
                                rotation: 0,
                                aspectRatio: null,
                            },
                            C = _.getMetadata('resize'),
                            S = _.getMetadata('filter') || null,
                            F = _.getMetadata('filters') || null,
                            R = _.getMetadata('colors') || null,
                            L = _.getMetadata('markup') || null,
                            z = {
                                crop: O || M,
                                size: C
                                    ? {
                                          upscale: C.upscale,
                                          mode: C.mode,
                                          width: C.size.width,
                                          height: C.size.height,
                                      }
                                    : null,
                                filter: F
                                    ? F.id || F.matrix
                                    : I.query('GET_ALLOW_IMAGE_FILTER') &&
                                        I.query(
                                            'GET_IMAGE_FILTER_COLOR_MATRIX'
                                        ) &&
                                        !R
                                      ? S
                                      : null,
                                color: R,
                                markup: L,
                            }
                        ;(g.onconfirm = ({ data: D }) => {
                            let {
                                    crop: k,
                                    size: B,
                                    filter: X,
                                    color: q,
                                    colorMatrix: Q,
                                    markup: pe,
                                } = D,
                                G = {}
                            if ((k && (G.crop = k), B)) {
                                let H = (_.getMetadata('resize') || {}).size,
                                    Y = { width: B.width, height: B.height }
                                !(Y.width && Y.height) &&
                                    H &&
                                    ((Y.width = H.width),
                                    (Y.height = H.height)),
                                    (Y.width || Y.height) &&
                                        (G.resize = {
                                            upscale: B.upscale,
                                            mode: B.mode,
                                            size: Y,
                                        })
                            }
                            pe && (G.markup = pe),
                                (G.colors = q),
                                (G.filters = X),
                                (G.filter = Q),
                                _.setMetadata(G),
                                g.filepondCallbackBridge.onconfirm(D, l(_)),
                                x &&
                                    (g.onclose = () => {
                                        x(!0), (g.onclose = null)
                                    })
                        }),
                            (g.oncancel = () => {
                                g.filepondCallbackBridge.oncancel(l(_)),
                                    x &&
                                        (g.onclose = () => {
                                            x(!1), (g.onclose = null)
                                        })
                            }),
                            g.open(P, z)
                    },
                    E = ({ root: I, props: y }) => {
                        if (!u('GET_IMAGE_EDIT_ALLOW_EDIT')) return
                        let { id: b } = y,
                            w = u('GET_ITEM', b)
                        if (!w) return
                        let x = w.file
                        if (Ra(x))
                            if (
                                ((I.ref.handleEdit = (_) => {
                                    _.stopPropagation(),
                                        I.dispatch('EDIT_ITEM', { id: b })
                                }),
                                f)
                            ) {
                                let _ = m.createChildView(r, {
                                    label: 'edit',
                                    icon: u('GET_IMAGE_EDIT_ICON_EDIT'),
                                    opacity: 0,
                                })
                                _.element.classList.add(
                                    'filepond--action-edit-item'
                                ),
                                    (_.element.dataset.align = u(
                                        'GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION'
                                    )),
                                    _.on('click', I.ref.handleEdit),
                                    (I.ref.buttonEditItem =
                                        m.appendChildView(_))
                            } else {
                                let _ = m.element.querySelector(
                                        '.filepond--file-info-main'
                                    ),
                                    P = document.createElement('button')
                                ;(P.className =
                                    'filepond--action-edit-item-alt'),
                                    (P.innerHTML =
                                        u('GET_IMAGE_EDIT_ICON_EDIT') +
                                        '<span>edit</span>'),
                                    P.addEventListener(
                                        'click',
                                        I.ref.handleEdit
                                    ),
                                    _.appendChild(P),
                                    (I.ref.editButton = P)
                            }
                    }
                m.registerDestroyer(({ root: I }) => {
                    I.ref.buttonEditItem &&
                        I.ref.buttonEditItem.off('click', I.ref.handleEdit),
                        I.ref.editButton &&
                            I.ref.editButton.removeEventListener(
                                'click',
                                I.ref.handleEdit
                            )
                })
                let T = { EDIT_ITEM: v, DID_LOAD_ITEM: E }
                if (f) {
                    let I = ({ root: y }) => {
                        y.ref.buttonEditItem &&
                            (y.ref.buttonEditItem.opacity = 1)
                    }
                    T.DID_IMAGE_PREVIEW_SHOW = I
                }
                m.registerWriter(o(T))
            }),
            {
                options: {
                    allowImageEdit: [!0, n.BOOLEAN],
                    styleImageEditButtonEditItemPosition: [
                        'bottom center',
                        n.STRING,
                    ],
                    imageEditInstantEdit: [!1, n.BOOLEAN],
                    imageEditAllowEdit: [!0, n.BOOLEAN],
                    imageEditIconEdit: [
                        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="currentColor" fill-rule="nonzero"/></svg>',
                        n.STRING,
                    ],
                    imageEditEditor: [null, n.OBJECT],
                },
            }
        )
    },
    Kp = typeof window < 'u' && typeof window.document < 'u'
Kp &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: Xo })
    )
var Qo = Xo
var Jp = (e) => /^image\/jpeg/.test(e.type),
    rt = {
        JPEG: 65496,
        APP1: 65505,
        EXIF: 1165519206,
        TIFF: 18761,
        Orientation: 274,
        Unknown: 65280,
    },
    st = (e, t, i = !1) => e.getUint16(t, i),
    Zo = (e, t, i = !1) => e.getUint32(t, i),
    em = (e) =>
        new Promise((t, i) => {
            let a = new FileReader()
            ;(a.onload = function (n) {
                let o = new DataView(n.target.result)
                if (st(o, 0) !== rt.JPEG) {
                    t(-1)
                    return
                }
                let l = o.byteLength,
                    r = 2
                for (; r < l; ) {
                    let s = st(o, r)
                    if (((r += 2), s === rt.APP1)) {
                        if (Zo(o, (r += 2)) !== rt.EXIF) break
                        let p = st(o, (r += 6)) === rt.TIFF
                        r += Zo(o, r + 4, p)
                        let c = st(o, r, p)
                        r += 2
                        for (let d = 0; d < c; d++)
                            if (st(o, r + d * 12, p) === rt.Orientation) {
                                t(st(o, r + d * 12 + 8, p))
                                return
                            }
                    } else {
                        if ((s & rt.Unknown) !== rt.Unknown) break
                        r += st(o, r)
                    }
                }
                t(-1)
            }),
                a.readAsArrayBuffer(e.slice(0, 64 * 1024))
        }),
    tm = (() => typeof window < 'u' && typeof window.document < 'u')(),
    im = () => tm,
    am =
        'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=',
    Ko,
    Ti = im() ? new Image() : {}
Ti.onload = () => (Ko = Ti.naturalWidth > Ti.naturalHeight)
Ti.src = am
var nm = () => Ko,
    Jo = ({ addFilter: e, utils: t }) => {
        let { Type: i, isFile: a } = t
        return (
            e(
                'DID_LOAD_ITEM',
                (n, { query: o }) =>
                    new Promise((l, r) => {
                        let s = n.file
                        if (
                            !a(s) ||
                            !Jp(s) ||
                            !o('GET_ALLOW_IMAGE_EXIF_ORIENTATION') ||
                            !nm()
                        )
                            return l(n)
                        em(s).then((p) => {
                            n.setMetadata('exif', { orientation: p }), l(n)
                        })
                    })
            ),
            { options: { allowImageExifOrientation: [!0, i.BOOLEAN] } }
        )
    },
    om = typeof window < 'u' && typeof window.document < 'u'
om &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: Jo })
    )
var el = Jo
var lm = (e) => /^image/.test(e.type),
    tl = (e, t) => jt(e.x * t, e.y * t),
    il = (e, t) => jt(e.x + t.x, e.y + t.y),
    rm = (e) => {
        let t = Math.sqrt(e.x * e.x + e.y * e.y)
        return t === 0 ? { x: 0, y: 0 } : jt(e.x / t, e.y / t)
    },
    vi = (e, t, i) => {
        let a = Math.cos(t),
            n = Math.sin(t),
            o = jt(e.x - i.x, e.y - i.y)
        return jt(i.x + a * o.x - n * o.y, i.y + n * o.x + a * o.y)
    },
    jt = (e = 0, t = 0) => ({ x: e, y: t }),
    Te = (e, t, i = 1, a) => {
        if (typeof e == 'string') return parseFloat(e) * i
        if (typeof e == 'number')
            return e * (a ? t[a] : Math.min(t.width, t.height))
    },
    sm = (e, t, i) => {
        let a = e.borderStyle || e.lineStyle || 'solid',
            n = e.backgroundColor || e.fontColor || 'transparent',
            o = e.borderColor || e.lineColor || 'transparent',
            l = Te(e.borderWidth || e.lineWidth, t, i),
            r = e.lineCap || 'round',
            s = e.lineJoin || 'round',
            p = typeof a == 'string' ? '' : a.map((d) => Te(d, t, i)).join(','),
            c = e.opacity || 1
        return {
            'stroke-linecap': r,
            'stroke-linejoin': s,
            'stroke-width': l || 0,
            'stroke-dasharray': p,
            stroke: o,
            fill: n,
            opacity: c,
        }
    },
    Se = (e) => e != null,
    cm = (e, t, i = 1) => {
        let a = Te(e.x, t, i, 'width') || Te(e.left, t, i, 'width'),
            n = Te(e.y, t, i, 'height') || Te(e.top, t, i, 'height'),
            o = Te(e.width, t, i, 'width'),
            l = Te(e.height, t, i, 'height'),
            r = Te(e.right, t, i, 'width'),
            s = Te(e.bottom, t, i, 'height')
        return (
            Se(n) || (Se(l) && Se(s) ? (n = t.height - l - s) : (n = s)),
            Se(a) || (Se(o) && Se(r) ? (a = t.width - o - r) : (a = r)),
            Se(o) || (Se(a) && Se(r) ? (o = t.width - a - r) : (o = 0)),
            Se(l) || (Se(n) && Se(s) ? (l = t.height - n - s) : (l = 0)),
            { x: a || 0, y: n || 0, width: o || 0, height: l || 0 }
        )
    },
    dm = (e) =>
        e.map((t, i) => `${i === 0 ? 'M' : 'L'} ${t.x} ${t.y}`).join(' '),
    Ce = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i])),
    pm = 'http://www.w3.org/2000/svg',
    _t = (e, t) => {
        let i = document.createElementNS(pm, e)
        return t && Ce(i, t), i
    },
    mm = (e) => Ce(e, { ...e.rect, ...e.styles }),
    um = (e) => {
        let t = e.rect.x + e.rect.width * 0.5,
            i = e.rect.y + e.rect.height * 0.5,
            a = e.rect.width * 0.5,
            n = e.rect.height * 0.5
        return Ce(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles })
    },
    fm = { contain: 'xMidYMid meet', cover: 'xMidYMid slice' },
    hm = (e, t) => {
        Ce(e, {
            ...e.rect,
            ...e.styles,
            preserveAspectRatio: fm[t.fit] || 'none',
        })
    },
    gm = { left: 'start', center: 'middle', right: 'end' },
    Em = (e, t, i, a) => {
        let n = Te(t.fontSize, i, a),
            o = t.fontFamily || 'sans-serif',
            l = t.fontWeight || 'normal',
            r = gm[t.textAlign] || 'start'
        Ce(e, {
            ...e.rect,
            ...e.styles,
            'stroke-width': 0,
            'font-weight': l,
            'font-size': n,
            'font-family': o,
            'text-anchor': r,
        }),
            e.text !== t.text &&
                ((e.text = t.text),
                (e.textContent = t.text.length ? t.text : ' '))
    },
    bm = (e, t, i, a) => {
        Ce(e, { ...e.rect, ...e.styles, fill: 'none' })
        let n = e.childNodes[0],
            o = e.childNodes[1],
            l = e.childNodes[2],
            r = e.rect,
            s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height }
        if ((Ce(n, { x1: r.x, y1: r.y, x2: s.x, y2: s.y }), !t.lineDecoration))
            return
        ;(o.style.display = 'none'), (l.style.display = 'none')
        let p = rm({ x: s.x - r.x, y: s.y - r.y }),
            c = Te(0.05, i, a)
        if (t.lineDecoration.indexOf('arrow-begin') !== -1) {
            let d = tl(p, c),
                m = il(r, d),
                u = vi(r, 2, m),
                f = vi(r, -2, m)
            Ce(o, {
                style: 'display:block;',
                d: `M${u.x},${u.y} L${r.x},${r.y} L${f.x},${f.y}`,
            })
        }
        if (t.lineDecoration.indexOf('arrow-end') !== -1) {
            let d = tl(p, -c),
                m = il(s, d),
                u = vi(s, 2, m),
                f = vi(s, -2, m)
            Ce(l, {
                style: 'display:block;',
                d: `M${u.x},${u.y} L${s.x},${s.y} L${f.x},${f.y}`,
            })
        }
    },
    Tm = (e, t, i, a) => {
        Ce(e, {
            ...e.styles,
            fill: 'none',
            d: dm(
                t.points.map((n) => ({
                    x: Te(n.x, i, a, 'width'),
                    y: Te(n.y, i, a, 'height'),
                }))
            ),
        })
    },
    Ii = (e) => (t) => _t(e, { id: t.id }),
    vm = (e) => {
        let t = _t('image', {
            id: e.id,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            opacity: '0',
        })
        return (
            (t.onload = () => {
                t.setAttribute('opacity', e.opacity || 1)
            }),
            t.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                e.src
            ),
            t
        )
    },
    Im = (e) => {
        let t = _t('g', {
                id: e.id,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
            i = _t('line')
        t.appendChild(i)
        let a = _t('path')
        t.appendChild(a)
        let n = _t('path')
        return t.appendChild(n), t
    },
    xm = {
        image: vm,
        rect: Ii('rect'),
        ellipse: Ii('ellipse'),
        text: Ii('text'),
        path: Ii('path'),
        line: Im,
    },
    ym = { rect: mm, ellipse: um, image: hm, text: Em, path: Tm, line: bm },
    _m = (e, t) => xm[e](t),
    Rm = (e, t, i, a, n) => {
        t !== 'path' && (e.rect = cm(i, a, n)),
            (e.styles = sm(i, a, n)),
            ym[t](e, i, a, n)
    },
    wm = ['x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height'],
    Sm = (e) => (typeof e == 'string' && /%/.test(e) ? parseFloat(e) / 100 : e),
    Lm = (e) => {
        let [t, i] = e,
            a = i.points ? {} : wm.reduce((n, o) => ((n[o] = Sm(i[o])), n), {})
        return [t, { zIndex: 0, ...i, ...a }]
    },
    Am = (e, t) =>
        e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0,
    Mm = (e) =>
        e.utils.createView({
            name: 'image-preview-markup',
            tag: 'svg',
            ignoreRect: !0,
            mixins: {
                apis: ['width', 'height', 'crop', 'markup', 'resize', 'dirty'],
            },
            write: ({ root: t, props: i }) => {
                if (!i.dirty) return
                let { crop: a, resize: n, markup: o } = i,
                    l = i.width,
                    r = i.height,
                    s = a.width,
                    p = a.height
                if (n) {
                    let { size: u } = n,
                        f = u && u.width,
                        h = u && u.height,
                        g = n.mode,
                        v = n.upscale
                    f && !h && (h = f), h && !f && (f = h)
                    let E = s < f && p < h
                    if (!E || (E && v)) {
                        let T = f / s,
                            I = h / p
                        if (g === 'force') (s = f), (p = h)
                        else {
                            let y
                            g === 'cover'
                                ? (y = Math.max(T, I))
                                : g === 'contain' && (y = Math.min(T, I)),
                                (s = s * y),
                                (p = p * y)
                        }
                    }
                }
                let c = { width: l, height: r }
                t.element.setAttribute('width', c.width),
                    t.element.setAttribute('height', c.height)
                let d = Math.min(l / s, r / p)
                t.element.innerHTML = ''
                let m = t.query('GET_IMAGE_PREVIEW_MARKUP_FILTER')
                o.filter(m)
                    .map(Lm)
                    .sort(Am)
                    .forEach((u) => {
                        let [f, h] = u,
                            g = _m(f, h)
                        Rm(g, f, h, c, d), t.element.appendChild(g)
                    })
            },
        }),
    Ht = (e, t) => ({ x: e, y: t }),
    Om = (e, t) => e.x * t.x + e.y * t.y,
    al = (e, t) => Ht(e.x - t.x, e.y - t.y),
    Pm = (e, t) => Om(al(e, t), al(e, t)),
    nl = (e, t) => Math.sqrt(Pm(e, t)),
    ol = (e, t) => {
        let i = e,
            a = 1.5707963267948966,
            n = t,
            o = 1.5707963267948966 - t,
            l = Math.sin(a),
            r = Math.sin(n),
            s = Math.sin(o),
            p = Math.cos(o),
            c = i / l,
            d = c * r,
            m = c * s
        return Ht(p * d, p * m)
    },
    Dm = (e, t) => {
        let i = e.width,
            a = e.height,
            n = ol(i, t),
            o = ol(a, t),
            l = Ht(e.x + Math.abs(n.x), e.y - Math.abs(n.y)),
            r = Ht(e.x + e.width + Math.abs(o.y), e.y + Math.abs(o.x)),
            s = Ht(e.x - Math.abs(o.y), e.y + e.height - Math.abs(o.x))
        return { width: nl(l, r), height: nl(l, s) }
    },
    Fm = (e, t, i = 1) => {
        let a = e.height / e.width,
            n = 1,
            o = t,
            l = 1,
            r = a
        r > o && ((r = o), (l = r / a))
        let s = Math.max(n / l, o / r),
            p = e.width / (i * s * l),
            c = p * t
        return { width: p, height: c }
    },
    rl = (e, t, i, a) => {
        let n = a.x > 0.5 ? 1 - a.x : a.x,
            o = a.y > 0.5 ? 1 - a.y : a.y,
            l = n * 2 * e.width,
            r = o * 2 * e.height,
            s = Dm(t, i)
        return Math.max(s.width / l, s.height / r)
    },
    sl = (e, t) => {
        let i = e.width,
            a = i * t
        a > e.height && ((a = e.height), (i = a / t))
        let n = (e.width - i) * 0.5,
            o = (e.height - a) * 0.5
        return { x: n, y: o, width: i, height: a }
    },
    zm = (e, t = {}) => {
        let { zoom: i, rotation: a, center: n, aspectRatio: o } = t
        o || (o = e.height / e.width)
        let l = Fm(e, o, i),
            r = { x: l.width * 0.5, y: l.height * 0.5 },
            s = { x: 0, y: 0, width: l.width, height: l.height, center: r },
            p = typeof t.scaleToFit > 'u' || t.scaleToFit,
            c = rl(e, sl(s, o), a, p ? n : { x: 0.5, y: 0.5 }),
            d = i * c
        return {
            widthFloat: l.width / d,
            heightFloat: l.height / d,
            width: Math.round(l.width / d),
            height: Math.round(l.height / d),
        }
    },
    ze = { type: 'spring', stiffness: 0.5, damping: 0.45, mass: 10 },
    Cm = (e) =>
        e.utils.createView({
            name: 'image-bitmap',
            ignoreRect: !0,
            mixins: { styles: ['scaleX', 'scaleY'] },
            create: ({ root: t, props: i }) => {
                t.appendChild(i.image)
            },
        }),
    Nm = (e) =>
        e.utils.createView({
            name: 'image-canvas-wrapper',
            tag: 'div',
            ignoreRect: !0,
            mixins: {
                apis: ['crop', 'width', 'height'],
                styles: [
                    'originX',
                    'originY',
                    'translateX',
                    'translateY',
                    'scaleX',
                    'scaleY',
                    'rotateZ',
                ],
                animations: {
                    originX: ze,
                    originY: ze,
                    scaleX: ze,
                    scaleY: ze,
                    translateX: ze,
                    translateY: ze,
                    rotateZ: ze,
                },
            },
            create: ({ root: t, props: i }) => {
                ;(i.width = i.image.width),
                    (i.height = i.image.height),
                    (t.ref.bitmap = t.appendChildView(
                        t.createChildView(Cm(e), { image: i.image })
                    ))
            },
            write: ({ root: t, props: i }) => {
                let { flip: a } = i.crop,
                    { bitmap: n } = t.ref
                ;(n.scaleX = a.horizontal ? -1 : 1),
                    (n.scaleY = a.vertical ? -1 : 1)
            },
        }),
    Bm = (e) =>
        e.utils.createView({
            name: 'image-clip',
            tag: 'div',
            ignoreRect: !0,
            mixins: {
                apis: [
                    'crop',
                    'markup',
                    'resize',
                    'width',
                    'height',
                    'dirty',
                    'background',
                ],
                styles: ['width', 'height', 'opacity'],
                animations: { opacity: { type: 'tween', duration: 250 } },
            },
            didWriteView: function ({ root: t, props: i }) {
                i.background && (t.element.style.backgroundColor = i.background)
            },
            create: ({ root: t, props: i }) => {
                ;(t.ref.image = t.appendChildView(
                    t.createChildView(Nm(e), Object.assign({}, i))
                )),
                    (t.ref.createMarkup = () => {
                        t.ref.markup ||
                            (t.ref.markup = t.appendChildView(
                                t.createChildView(Mm(e), Object.assign({}, i))
                            ))
                    }),
                    (t.ref.destroyMarkup = () => {
                        t.ref.markup &&
                            (t.removeChildView(t.ref.markup),
                            (t.ref.markup = null))
                    })
                let a = t.query('GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR')
                a !== null &&
                    (a === 'grid'
                        ? (t.element.dataset.transparencyIndicator = a)
                        : (t.element.dataset.transparencyIndicator = 'color'))
            },
            write: ({ root: t, props: i, shouldOptimize: a }) => {
                let {
                    crop: n,
                    markup: o,
                    resize: l,
                    dirty: r,
                    width: s,
                    height: p,
                } = i
                t.ref.image.crop = n
                let c = {
                        x: 0,
                        y: 0,
                        width: s,
                        height: p,
                        center: { x: s * 0.5, y: p * 0.5 },
                    },
                    d = {
                        width: t.ref.image.width,
                        height: t.ref.image.height,
                    },
                    m = { x: n.center.x * d.width, y: n.center.y * d.height },
                    u = {
                        x: c.center.x - d.width * n.center.x,
                        y: c.center.y - d.height * n.center.y,
                    },
                    f = Math.PI * 2 + (n.rotation % (Math.PI * 2)),
                    h = n.aspectRatio || d.height / d.width,
                    g = typeof n.scaleToFit > 'u' || n.scaleToFit,
                    v = rl(d, sl(c, h), f, g ? n.center : { x: 0.5, y: 0.5 }),
                    E = n.zoom * v
                o && o.length
                    ? (t.ref.createMarkup(),
                      (t.ref.markup.width = s),
                      (t.ref.markup.height = p),
                      (t.ref.markup.resize = l),
                      (t.ref.markup.dirty = r),
                      (t.ref.markup.markup = o),
                      (t.ref.markup.crop = zm(d, n)))
                    : t.ref.markup && t.ref.destroyMarkup()
                let T = t.ref.image
                if (a) {
                    ;(T.originX = null),
                        (T.originY = null),
                        (T.translateX = null),
                        (T.translateY = null),
                        (T.rotateZ = null),
                        (T.scaleX = null),
                        (T.scaleY = null)
                    return
                }
                ;(T.originX = m.x),
                    (T.originY = m.y),
                    (T.translateX = u.x),
                    (T.translateY = u.y),
                    (T.rotateZ = f),
                    (T.scaleX = E),
                    (T.scaleY = E)
            },
        }),
    km = (e) =>
        e.utils.createView({
            name: 'image-preview',
            tag: 'div',
            ignoreRect: !0,
            mixins: {
                apis: [
                    'image',
                    'crop',
                    'markup',
                    'resize',
                    'dirty',
                    'background',
                ],
                styles: ['translateY', 'scaleX', 'scaleY', 'opacity'],
                animations: {
                    scaleX: ze,
                    scaleY: ze,
                    translateY: ze,
                    opacity: { type: 'tween', duration: 400 },
                },
            },
            create: ({ root: t, props: i }) => {
                t.ref.clip = t.appendChildView(
                    t.createChildView(Bm(e), {
                        id: i.id,
                        image: i.image,
                        crop: i.crop,
                        markup: i.markup,
                        resize: i.resize,
                        dirty: i.dirty,
                        background: i.background,
                    })
                )
            },
            write: ({ root: t, props: i, shouldOptimize: a }) => {
                let { clip: n } = t.ref,
                    { image: o, crop: l, markup: r, resize: s, dirty: p } = i
                if (
                    ((n.crop = l),
                    (n.markup = r),
                    (n.resize = s),
                    (n.dirty = p),
                    (n.opacity = a ? 0 : 1),
                    a || t.rect.element.hidden)
                )
                    return
                let c = o.height / o.width,
                    d = l.aspectRatio || c,
                    m = t.rect.inner.width,
                    u = t.rect.inner.height,
                    f = t.query('GET_IMAGE_PREVIEW_HEIGHT'),
                    h = t.query('GET_IMAGE_PREVIEW_MIN_HEIGHT'),
                    g = t.query('GET_IMAGE_PREVIEW_MAX_HEIGHT'),
                    v = t.query('GET_PANEL_ASPECT_RATIO'),
                    E = t.query('GET_ALLOW_MULTIPLE')
                v && !E && ((f = m * v), (d = v))
                let T = f !== null ? f : Math.max(h, Math.min(m * d, g)),
                    I = T / d
                I > m && ((I = m), (T = I * d)),
                    T > u && ((T = u), (I = u / d)),
                    (n.width = I),
                    (n.height = T)
            },
        }),
    Vm = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`,
    ll = 0,
    Gm = (e) =>
        e.utils.createView({
            name: 'image-preview-overlay',
            tag: 'div',
            ignoreRect: !0,
            create: ({ root: t, props: i }) => {
                let a = Vm
                if (document.querySelector('base')) {
                    let n = new URL(
                        window.location.href.replace(window.location.hash, '')
                    ).href
                    a = a.replace(/url\(\#/g, 'url(' + n + '#')
                }
                ll++,
                    t.element.classList.add(
                        `filepond--image-preview-overlay-${i.status}`
                    ),
                    (t.element.innerHTML = a.replace(/__UID__/g, ll))
            },
            mixins: {
                styles: ['opacity'],
                animations: { opacity: { type: 'spring', mass: 25 } },
            },
        }),
    Um = function () {
        self.onmessage = (e) => {
            createImageBitmap(e.data.message.file).then((t) => {
                self.postMessage({ id: e.data.id, message: t }, [t])
            })
        }
    },
    Wm = function () {
        self.onmessage = (e) => {
            let t = e.data.message.imageData,
                i = e.data.message.colorMatrix,
                a = t.data,
                n = a.length,
                o = i[0],
                l = i[1],
                r = i[2],
                s = i[3],
                p = i[4],
                c = i[5],
                d = i[6],
                m = i[7],
                u = i[8],
                f = i[9],
                h = i[10],
                g = i[11],
                v = i[12],
                E = i[13],
                T = i[14],
                I = i[15],
                y = i[16],
                b = i[17],
                w = i[18],
                x = i[19],
                _ = 0,
                P = 0,
                O = 0,
                M = 0,
                C = 0
            for (; _ < n; _ += 4)
                (P = a[_] / 255),
                    (O = a[_ + 1] / 255),
                    (M = a[_ + 2] / 255),
                    (C = a[_ + 3] / 255),
                    (a[_] = Math.max(
                        0,
                        Math.min((P * o + O * l + M * r + C * s + p) * 255, 255)
                    )),
                    (a[_ + 1] = Math.max(
                        0,
                        Math.min((P * c + O * d + M * m + C * u + f) * 255, 255)
                    )),
                    (a[_ + 2] = Math.max(
                        0,
                        Math.min((P * h + O * g + M * v + C * E + T) * 255, 255)
                    )),
                    (a[_ + 3] = Math.max(
                        0,
                        Math.min((P * I + O * y + M * b + C * w + x) * 255, 255)
                    ))
            self.postMessage({ id: e.data.id, message: t }, [t.data.buffer])
        }
    },
    Hm = (e, t) => {
        let i = new Image()
        ;(i.onload = () => {
            let a = i.naturalWidth,
                n = i.naturalHeight
            ;(i = null), t(a, n)
        }),
            (i.src = e)
    },
    jm = {
        1: () => [1, 0, 0, 1, 0, 0],
        2: (e) => [-1, 0, 0, 1, e, 0],
        3: (e, t) => [-1, 0, 0, -1, e, t],
        4: (e, t) => [1, 0, 0, -1, 0, t],
        5: () => [0, 1, 1, 0, 0, 0],
        6: (e, t) => [0, 1, -1, 0, t, 0],
        7: (e, t) => [0, -1, -1, 0, t, e],
        8: (e) => [0, -1, 1, 0, 0, e],
    },
    Ym = (e, t, i, a) => {
        a !== -1 && e.transform.apply(e, jm[a](t, i))
    },
    qm = (e, t, i, a) => {
        ;(t = Math.round(t)), (i = Math.round(i))
        let n = document.createElement('canvas')
        ;(n.width = t), (n.height = i)
        let o = n.getContext('2d')
        return (
            a >= 5 && a <= 8 && ([t, i] = [i, t]),
            Ym(o, t, i, a),
            o.drawImage(e, 0, 0, t, i),
            n
        )
    },
    cl = (e) => /^image/.test(e.type) && !/svg/.test(e.type),
    $m = 10,
    Xm = 10,
    Qm = (e) => {
        let t = Math.min($m / e.width, Xm / e.height),
            i = document.createElement('canvas'),
            a = i.getContext('2d'),
            n = (i.width = Math.ceil(e.width * t)),
            o = (i.height = Math.ceil(e.height * t))
        a.drawImage(e, 0, 0, n, o)
        let l = null
        try {
            l = a.getImageData(0, 0, n, o).data
        } catch {
            return null
        }
        let r = l.length,
            s = 0,
            p = 0,
            c = 0,
            d = 0
        for (; d < r; d += 4)
            (s += l[d] * l[d]),
                (p += l[d + 1] * l[d + 1]),
                (c += l[d + 2] * l[d + 2])
        return (
            (s = wa(s, r)), (p = wa(p, r)), (c = wa(c, r)), { r: s, g: p, b: c }
        )
    },
    wa = (e, t) => Math.floor(Math.sqrt(e / (t / 4))),
    Zm = (e, t) => (
        (t = t || document.createElement('canvas')),
        (t.width = e.width),
        (t.height = e.height),
        t.getContext('2d').drawImage(e, 0, 0),
        t
    ),
    Km = (e) => {
        let t
        try {
            t = new ImageData(e.width, e.height)
        } catch {
            t = document
                .createElement('canvas')
                .getContext('2d')
                .createImageData(e.width, e.height)
        }
        return t.data.set(new Uint8ClampedArray(e.data)), t
    },
    Jm = (e) =>
        new Promise((t, i) => {
            let a = new Image()
            ;(a.crossOrigin = 'Anonymous'),
                (a.onload = () => {
                    t(a)
                }),
                (a.onerror = (n) => {
                    i(n)
                }),
                (a.src = e)
        }),
    eu = (e) => {
        let t = Gm(e),
            i = km(e),
            { createWorker: a } = e.utils,
            n = (E, T, I) =>
                new Promise((y) => {
                    E.ref.imageData ||
                        (E.ref.imageData = I.getContext('2d').getImageData(
                            0,
                            0,
                            I.width,
                            I.height
                        ))
                    let b = Km(E.ref.imageData)
                    if (!T || T.length !== 20)
                        return I.getContext('2d').putImageData(b, 0, 0), y()
                    let w = a(Wm)
                    w.post(
                        { imageData: b, colorMatrix: T },
                        (x) => {
                            I.getContext('2d').putImageData(x, 0, 0),
                                w.terminate(),
                                y()
                        },
                        [b.data.buffer]
                    )
                }),
            o = (E, T) => {
                E.removeChildView(T),
                    (T.image.width = 1),
                    (T.image.height = 1),
                    T._destroy()
            },
            l = ({ root: E }) => {
                let T = E.ref.images.shift()
                return (
                    (T.opacity = 0),
                    (T.translateY = -15),
                    E.ref.imageViewBin.push(T),
                    T
                )
            },
            r = ({ root: E, props: T, image: I }) => {
                let y = T.id,
                    b = E.query('GET_ITEM', { id: y })
                if (!b) return
                let w = b.getMetadata('crop') || {
                        center: { x: 0.5, y: 0.5 },
                        flip: { horizontal: !1, vertical: !1 },
                        zoom: 1,
                        rotation: 0,
                        aspectRatio: null,
                    },
                    x = E.query('GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR'),
                    _,
                    P,
                    O = !1
                E.query('GET_IMAGE_PREVIEW_MARKUP_SHOW') &&
                    ((_ = b.getMetadata('markup') || []),
                    (P = b.getMetadata('resize')),
                    (O = !0))
                let M = E.appendChildView(
                    E.createChildView(i, {
                        id: y,
                        image: I,
                        crop: w,
                        resize: P,
                        markup: _,
                        dirty: O,
                        background: x,
                        opacity: 0,
                        scaleX: 1.15,
                        scaleY: 1.15,
                        translateY: 15,
                    }),
                    E.childViews.length
                )
                E.ref.images.push(M),
                    (M.opacity = 1),
                    (M.scaleX = 1),
                    (M.scaleY = 1),
                    (M.translateY = 0),
                    setTimeout(() => {
                        E.dispatch('DID_IMAGE_PREVIEW_SHOW', { id: y })
                    }, 250)
            },
            s = ({ root: E, props: T }) => {
                let I = E.query('GET_ITEM', { id: T.id })
                if (!I) return
                let y = E.ref.images[E.ref.images.length - 1]
                ;(y.crop = I.getMetadata('crop')),
                    (y.background = E.query(
                        'GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR'
                    )),
                    E.query('GET_IMAGE_PREVIEW_MARKUP_SHOW') &&
                        ((y.dirty = !0),
                        (y.resize = I.getMetadata('resize')),
                        (y.markup = I.getMetadata('markup')))
            },
            p = ({ root: E, props: T, action: I }) => {
                if (
                    !/crop|filter|markup|resize/.test(I.change.key) ||
                    !E.ref.images.length
                )
                    return
                let y = E.query('GET_ITEM', { id: T.id })
                if (y) {
                    if (/filter/.test(I.change.key)) {
                        let b = E.ref.images[E.ref.images.length - 1]
                        n(E, I.change.value, b.image)
                        return
                    }
                    if (/crop|markup|resize/.test(I.change.key)) {
                        let b = y.getMetadata('crop'),
                            w = E.ref.images[E.ref.images.length - 1]
                        if (
                            b &&
                            b.aspectRatio &&
                            w.crop &&
                            w.crop.aspectRatio &&
                            Math.abs(b.aspectRatio - w.crop.aspectRatio) > 1e-5
                        ) {
                            let x = l({ root: E })
                            r({ root: E, props: T, image: Zm(x.image) })
                        } else s({ root: E, props: T })
                    }
                }
            },
            c = (E) => {
                let I = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./),
                    y = I ? parseInt(I[1]) : null
                return y !== null && y <= 58
                    ? !1
                    : 'createImageBitmap' in window && cl(E)
            },
            d = ({ root: E, props: T }) => {
                let { id: I } = T,
                    y = E.query('GET_ITEM', I)
                if (!y) return
                let b = URL.createObjectURL(y.file)
                Hm(b, (w, x) => {
                    E.dispatch('DID_IMAGE_PREVIEW_CALCULATE_SIZE', {
                        id: I,
                        width: w,
                        height: x,
                    })
                })
            },
            m = ({ root: E, props: T }) => {
                let { id: I } = T,
                    y = E.query('GET_ITEM', I)
                if (!y) return
                let b = URL.createObjectURL(y.file),
                    w = () => {
                        Jm(b).then(x)
                    },
                    x = (_) => {
                        URL.revokeObjectURL(b)
                        let O = (y.getMetadata('exif') || {}).orientation || -1,
                            { width: M, height: C } = _
                        if (!M || !C) return
                        O >= 5 && O <= 8 && ([M, C] = [C, M])
                        let S = Math.max(1, window.devicePixelRatio * 0.75),
                            R = E.query('GET_IMAGE_PREVIEW_ZOOM_FACTOR') * S,
                            L = C / M,
                            z = E.rect.element.width,
                            D = E.rect.element.height,
                            k = z,
                            B = k * L
                        L > 1
                            ? ((k = Math.min(M, z * R)), (B = k * L))
                            : ((B = Math.min(C, D * R)), (k = B / L))
                        let X = qm(_, k, B, O),
                            q = () => {
                                let pe = E.query(
                                    'GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR'
                                )
                                    ? Qm(data)
                                    : null
                                y.setMetadata('color', pe, !0),
                                    'close' in _ && _.close(),
                                    (E.ref.overlayShadow.opacity = 1),
                                    r({ root: E, props: T, image: X })
                            },
                            Q = y.getMetadata('filter')
                        Q ? n(E, Q, X).then(q) : q()
                    }
                if (c(y.file)) {
                    let _ = a(Um)
                    _.post({ file: y.file }, (P) => {
                        if ((_.terminate(), !P)) {
                            w()
                            return
                        }
                        x(P)
                    })
                } else w()
            },
            u = ({ root: E }) => {
                let T = E.ref.images[E.ref.images.length - 1]
                ;(T.translateY = 0),
                    (T.scaleX = 1),
                    (T.scaleY = 1),
                    (T.opacity = 1)
            },
            f = ({ root: E }) => {
                ;(E.ref.overlayShadow.opacity = 1),
                    (E.ref.overlayError.opacity = 0),
                    (E.ref.overlaySuccess.opacity = 0)
            },
            h = ({ root: E }) => {
                ;(E.ref.overlayShadow.opacity = 0.25),
                    (E.ref.overlayError.opacity = 1)
            },
            g = ({ root: E }) => {
                ;(E.ref.overlayShadow.opacity = 0.25),
                    (E.ref.overlaySuccess.opacity = 1)
            },
            v = ({ root: E }) => {
                ;(E.ref.images = []),
                    (E.ref.imageData = null),
                    (E.ref.imageViewBin = []),
                    (E.ref.overlayShadow = E.appendChildView(
                        E.createChildView(t, { opacity: 0, status: 'idle' })
                    )),
                    (E.ref.overlaySuccess = E.appendChildView(
                        E.createChildView(t, { opacity: 0, status: 'success' })
                    )),
                    (E.ref.overlayError = E.appendChildView(
                        E.createChildView(t, { opacity: 0, status: 'failure' })
                    ))
            }
        return e.utils.createView({
            name: 'image-preview-wrapper',
            create: v,
            styles: ['height'],
            apis: ['height'],
            destroy: ({ root: E }) => {
                E.ref.images.forEach((T) => {
                    ;(T.image.width = 1), (T.image.height = 1)
                })
            },
            didWriteView: ({ root: E }) => {
                E.ref.images.forEach((T) => {
                    T.dirty = !1
                })
            },
            write: e.utils.createRoute(
                {
                    DID_IMAGE_PREVIEW_DRAW: u,
                    DID_IMAGE_PREVIEW_CONTAINER_CREATE: d,
                    DID_FINISH_CALCULATE_PREVIEWSIZE: m,
                    DID_UPDATE_ITEM_METADATA: p,
                    DID_THROW_ITEM_LOAD_ERROR: h,
                    DID_THROW_ITEM_PROCESSING_ERROR: h,
                    DID_THROW_ITEM_INVALID: h,
                    DID_COMPLETE_ITEM_PROCESSING: g,
                    DID_START_ITEM_PROCESSING: f,
                    DID_REVERT_ITEM_PROCESSING: f,
                },
                ({ root: E }) => {
                    let T = E.ref.imageViewBin.filter((I) => I.opacity === 0)
                    ;(E.ref.imageViewBin = E.ref.imageViewBin.filter(
                        (I) => I.opacity > 0
                    )),
                        T.forEach((I) => o(E, I)),
                        (T.length = 0)
                }
            ),
        })
    },
    dl = (e) => {
        let { addFilter: t, utils: i } = e,
            { Type: a, createRoute: n, isFile: o } = i,
            l = eu(e)
        return (
            t('CREATE_VIEW', (r) => {
                let { is: s, view: p, query: c } = r
                if (!s('file') || !c('GET_ALLOW_IMAGE_PREVIEW')) return
                let d = ({ root: g, props: v }) => {
                        let { id: E } = v,
                            T = c('GET_ITEM', E)
                        if (!T || !o(T.file) || T.archived) return
                        let I = T.file
                        if (!lm(I) || !c('GET_IMAGE_PREVIEW_FILTER_ITEM')(T))
                            return
                        let y = 'createImageBitmap' in (window || {}),
                            b = c('GET_IMAGE_PREVIEW_MAX_FILE_SIZE')
                        if (!y && b && I.size > b) return
                        g.ref.imagePreview = p.appendChildView(
                            p.createChildView(l, { id: E })
                        )
                        let w = g.query('GET_IMAGE_PREVIEW_HEIGHT')
                        w &&
                            g.dispatch('DID_UPDATE_PANEL_HEIGHT', {
                                id: T.id,
                                height: w,
                            })
                        let x =
                            !y &&
                            I.size >
                                c(
                                    'GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE'
                                )
                        g.dispatch(
                            'DID_IMAGE_PREVIEW_CONTAINER_CREATE',
                            { id: E },
                            x
                        )
                    },
                    m = (g, v) => {
                        if (!g.ref.imagePreview) return
                        let { id: E } = v,
                            T = g.query('GET_ITEM', { id: E })
                        if (!T) return
                        let I = g.query('GET_PANEL_ASPECT_RATIO'),
                            y = g.query('GET_ITEM_PANEL_ASPECT_RATIO'),
                            b = g.query('GET_IMAGE_PREVIEW_HEIGHT')
                        if (I || y || b) return
                        let { imageWidth: w, imageHeight: x } = g.ref
                        if (!w || !x) return
                        let _ = g.query('GET_IMAGE_PREVIEW_MIN_HEIGHT'),
                            P = g.query('GET_IMAGE_PREVIEW_MAX_HEIGHT'),
                            M = (T.getMetadata('exif') || {}).orientation || -1
                        if (
                            (M >= 5 && M <= 8 && ([w, x] = [x, w]),
                            !cl(T.file) || g.query('GET_IMAGE_PREVIEW_UPSCALE'))
                        ) {
                            let z = 2048 / w
                            ;(w *= z), (x *= z)
                        }
                        let C = x / w,
                            S = (T.getMetadata('crop') || {}).aspectRatio || C,
                            F = Math.max(_, Math.min(x, P)),
                            R = g.rect.element.width,
                            L = Math.min(R * S, F)
                        g.dispatch('DID_UPDATE_PANEL_HEIGHT', {
                            id: T.id,
                            height: L,
                        })
                    },
                    u = ({ root: g }) => {
                        g.ref.shouldRescale = !0
                    },
                    f = ({ root: g, action: v }) => {
                        v.change.key === 'crop' && (g.ref.shouldRescale = !0)
                    },
                    h = ({ root: g, action: v }) => {
                        ;(g.ref.imageWidth = v.width),
                            (g.ref.imageHeight = v.height),
                            (g.ref.shouldRescale = !0),
                            (g.ref.shouldDrawPreview = !0),
                            g.dispatch('KICK')
                    }
                p.registerWriter(
                    n(
                        {
                            DID_RESIZE_ROOT: u,
                            DID_STOP_RESIZE: u,
                            DID_LOAD_ITEM: d,
                            DID_IMAGE_PREVIEW_CALCULATE_SIZE: h,
                            DID_UPDATE_ITEM_METADATA: f,
                        },
                        ({ root: g, props: v }) => {
                            g.ref.imagePreview &&
                                (g.rect.element.hidden ||
                                    (g.ref.shouldRescale &&
                                        (m(g, v), (g.ref.shouldRescale = !1)),
                                    g.ref.shouldDrawPreview &&
                                        (requestAnimationFrame(() => {
                                            requestAnimationFrame(() => {
                                                g.dispatch(
                                                    'DID_FINISH_CALCULATE_PREVIEWSIZE',
                                                    { id: v.id }
                                                )
                                            })
                                        }),
                                        (g.ref.shouldDrawPreview = !1))))
                        }
                    )
                )
            }),
            {
                options: {
                    allowImagePreview: [!0, a.BOOLEAN],
                    imagePreviewFilterItem: [() => !0, a.FUNCTION],
                    imagePreviewHeight: [null, a.INT],
                    imagePreviewMinHeight: [44, a.INT],
                    imagePreviewMaxHeight: [256, a.INT],
                    imagePreviewMaxFileSize: [null, a.INT],
                    imagePreviewZoomFactor: [2, a.INT],
                    imagePreviewUpscale: [!1, a.BOOLEAN],
                    imagePreviewMaxInstantPreviewFileSize: [1e6, a.INT],
                    imagePreviewTransparencyIndicator: [null, a.STRING],
                    imagePreviewCalculateAverageImageColor: [!1, a.BOOLEAN],
                    imagePreviewMarkupShow: [!0, a.BOOLEAN],
                    imagePreviewMarkupFilter: [() => !0, a.FUNCTION],
                },
            }
        )
    },
    tu = typeof window < 'u' && typeof window.document < 'u'
tu &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: dl })
    )
var pl = dl
var iu = (e) => /^image/.test(e.type),
    au = (e, t) => {
        let i = new Image()
        ;(i.onload = () => {
            let a = i.naturalWidth,
                n = i.naturalHeight
            ;(i = null), t({ width: a, height: n })
        }),
            (i.onerror = () => t(null)),
            (i.src = e)
    },
    ml = ({ addFilter: e, utils: t }) => {
        let { Type: i } = t
        return (
            e(
                'DID_LOAD_ITEM',
                (a, { query: n }) =>
                    new Promise((o, l) => {
                        let r = a.file
                        if (!iu(r) || !n('GET_ALLOW_IMAGE_RESIZE')) return o(a)
                        let s = n('GET_IMAGE_RESIZE_MODE'),
                            p = n('GET_IMAGE_RESIZE_TARGET_WIDTH'),
                            c = n('GET_IMAGE_RESIZE_TARGET_HEIGHT'),
                            d = n('GET_IMAGE_RESIZE_UPSCALE')
                        if (p === null && c === null) return o(a)
                        let m = p === null ? c : p,
                            u = c === null ? m : c,
                            f = URL.createObjectURL(r)
                        au(f, (h) => {
                            if ((URL.revokeObjectURL(f), !h)) return o(a)
                            let { width: g, height: v } = h,
                                E =
                                    (a.getMetadata('exif') || {}).orientation ||
                                    -1
                            if (
                                (E >= 5 && E <= 8 && ([g, v] = [v, g]),
                                g === m && v === u)
                            )
                                return o(a)
                            if (!d) {
                                if (s === 'cover') {
                                    if (g <= m || v <= u) return o(a)
                                } else if (g <= m && v <= m) return o(a)
                            }
                            a.setMetadata('resize', {
                                mode: s,
                                upscale: d,
                                size: { width: m, height: u },
                            }),
                                o(a)
                        })
                    })
            ),
            {
                options: {
                    allowImageResize: [!0, i.BOOLEAN],
                    imageResizeMode: ['cover', i.STRING],
                    imageResizeUpscale: [!0, i.BOOLEAN],
                    imageResizeTargetWidth: [null, i.INT],
                    imageResizeTargetHeight: [null, i.INT],
                },
            }
        )
    },
    nu = typeof window < 'u' && typeof window.document < 'u'
nu &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: ml })
    )
var ul = ml
var ou = (e) => /^image/.test(e.type),
    lu = (e) => e.substr(0, e.lastIndexOf('.')) || e,
    ru = { jpeg: 'jpg', 'svg+xml': 'svg' },
    su = (e, t) => {
        let i = lu(e),
            a = t.split('/')[1],
            n = ru[a] || a
        return `${i}.${n}`
    },
    cu = (e) => (/jpeg|png|svg\+xml/.test(e) ? e : 'image/jpeg'),
    du = (e) => /^image/.test(e.type),
    pu = {
        1: () => [1, 0, 0, 1, 0, 0],
        2: (e) => [-1, 0, 0, 1, e, 0],
        3: (e, t) => [-1, 0, 0, -1, e, t],
        4: (e, t) => [1, 0, 0, -1, 0, t],
        5: () => [0, 1, 1, 0, 0, 0],
        6: (e, t) => [0, 1, -1, 0, t, 0],
        7: (e, t) => [0, -1, -1, 0, t, e],
        8: (e) => [0, -1, 1, 0, 0, e],
    },
    mu = (e, t, i) => (i === -1 && (i = 1), pu[i](e, t)),
    Yt = (e, t) => ({ x: e, y: t }),
    uu = (e, t) => e.x * t.x + e.y * t.y,
    fl = (e, t) => Yt(e.x - t.x, e.y - t.y),
    fu = (e, t) => uu(fl(e, t), fl(e, t)),
    hl = (e, t) => Math.sqrt(fu(e, t)),
    gl = (e, t) => {
        let i = e,
            a = 1.5707963267948966,
            n = t,
            o = 1.5707963267948966 - t,
            l = Math.sin(a),
            r = Math.sin(n),
            s = Math.sin(o),
            p = Math.cos(o),
            c = i / l,
            d = c * r,
            m = c * s
        return Yt(p * d, p * m)
    },
    hu = (e, t) => {
        let i = e.width,
            a = e.height,
            n = gl(i, t),
            o = gl(a, t),
            l = Yt(e.x + Math.abs(n.x), e.y - Math.abs(n.y)),
            r = Yt(e.x + e.width + Math.abs(o.y), e.y + Math.abs(o.x)),
            s = Yt(e.x - Math.abs(o.y), e.y + e.height - Math.abs(o.x))
        return { width: hl(l, r), height: hl(l, s) }
    },
    Tl = (e, t, i = 0, a = { x: 0.5, y: 0.5 }) => {
        let n = a.x > 0.5 ? 1 - a.x : a.x,
            o = a.y > 0.5 ? 1 - a.y : a.y,
            l = n * 2 * e.width,
            r = o * 2 * e.height,
            s = hu(t, i)
        return Math.max(s.width / l, s.height / r)
    },
    vl = (e, t) => {
        let i = e.width,
            a = i * t
        a > e.height && ((a = e.height), (i = a / t))
        let n = (e.width - i) * 0.5,
            o = (e.height - a) * 0.5
        return { x: n, y: o, width: i, height: a }
    },
    El = (e, t, i = 1) => {
        let a = e.height / e.width,
            n = 1,
            o = t,
            l = 1,
            r = a
        r > o && ((r = o), (l = r / a))
        let s = Math.max(n / l, o / r),
            p = e.width / (i * s * l),
            c = p * t
        return { width: p, height: c }
    },
    Il = (e) => {
        ;(e.width = 1), (e.height = 1), e.getContext('2d').clearRect(0, 0, 1, 1)
    },
    bl = (e) => e && (e.horizontal || e.vertical),
    gu = (e, t, i) => {
        if (t <= 1 && !bl(i))
            return (e.width = e.naturalWidth), (e.height = e.naturalHeight), e
        let a = document.createElement('canvas'),
            n = e.naturalWidth,
            o = e.naturalHeight,
            l = t >= 5 && t <= 8
        l ? ((a.width = o), (a.height = n)) : ((a.width = n), (a.height = o))
        let r = a.getContext('2d')
        if ((t && r.transform.apply(r, mu(n, o, t)), bl(i))) {
            let s = [1, 0, 0, 1, 0, 0]
            ;((!l && i.horizontal) || l & i.vertical) &&
                ((s[0] = -1), (s[4] = n)),
                ((!l && i.vertical) || (l && i.horizontal)) &&
                    ((s[3] = -1), (s[5] = o)),
                r.transform(...s)
        }
        return r.drawImage(e, 0, 0, n, o), a
    },
    Eu = (e, t, i = {}, a = {}) => {
        let { canvasMemoryLimit: n, background: o = null } = a,
            l = i.zoom || 1,
            r = gu(e, t, i.flip),
            s = { width: r.width, height: r.height },
            p = i.aspectRatio || s.height / s.width,
            c = El(s, p, l)
        if (n) {
            let T = c.width * c.height
            if (T > n) {
                let I = Math.sqrt(n) / Math.sqrt(T)
                ;(s.width = Math.floor(s.width * I)),
                    (s.height = Math.floor(s.height * I)),
                    (c = El(s, p, l))
            }
        }
        let d = document.createElement('canvas'),
            m = { x: c.width * 0.5, y: c.height * 0.5 },
            u = { x: 0, y: 0, width: c.width, height: c.height, center: m },
            f = typeof i.scaleToFit > 'u' || i.scaleToFit,
            h =
                l *
                Tl(s, vl(u, p), i.rotation, f ? i.center : { x: 0.5, y: 0.5 })
        ;(d.width = Math.round(c.width / h)),
            (d.height = Math.round(c.height / h)),
            (m.x /= h),
            (m.y /= h)
        let g = {
                x: m.x - s.width * (i.center ? i.center.x : 0.5),
                y: m.y - s.height * (i.center ? i.center.y : 0.5),
            },
            v = d.getContext('2d')
        o && ((v.fillStyle = o), v.fillRect(0, 0, d.width, d.height)),
            v.translate(m.x, m.y),
            v.rotate(i.rotation || 0),
            v.drawImage(r, g.x - m.x, g.y - m.y, s.width, s.height)
        let E = v.getImageData(0, 0, d.width, d.height)
        return Il(d), E
    },
    bu = (() => typeof window < 'u' && typeof window.document < 'u')()
bu &&
    (HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (e, t, i) {
                var a = this.toDataURL(t, i).split(',')[1]
                setTimeout(function () {
                    for (
                        var n = atob(a),
                            o = n.length,
                            l = new Uint8Array(o),
                            r = 0;
                        r < o;
                        r++
                    )
                        l[r] = n.charCodeAt(r)
                    e(new Blob([l], { type: t || 'image/png' }))
                })
            },
        }))
var Tu = (e, t, i = null) =>
        new Promise((a) => {
            let n = i ? i(e) : e
            Promise.resolve(n).then((o) => {
                o.toBlob(a, t.type, t.quality)
            })
        }),
    yi = (e, t) => qt(e.x * t, e.y * t),
    _i = (e, t) => qt(e.x + t.x, e.y + t.y),
    xl = (e) => {
        let t = Math.sqrt(e.x * e.x + e.y * e.y)
        return t === 0 ? { x: 0, y: 0 } : qt(e.x / t, e.y / t)
    },
    qe = (e, t, i) => {
        let a = Math.cos(t),
            n = Math.sin(t),
            o = qt(e.x - i.x, e.y - i.y)
        return qt(i.x + a * o.x - n * o.y, i.y + n * o.x + a * o.y)
    },
    qt = (e = 0, t = 0) => ({ x: e, y: t }),
    me = (e, t, i = 1, a) => {
        if (typeof e == 'string') return parseFloat(e) * i
        if (typeof e == 'number')
            return e * (a ? t[a] : Math.min(t.width, t.height))
    },
    ct = (e, t, i) => {
        let a = e.borderStyle || e.lineStyle || 'solid',
            n = e.backgroundColor || e.fontColor || 'transparent',
            o = e.borderColor || e.lineColor || 'transparent',
            l = me(e.borderWidth || e.lineWidth, t, i),
            r = e.lineCap || 'round',
            s = e.lineJoin || 'round',
            p = typeof a == 'string' ? '' : a.map((d) => me(d, t, i)).join(','),
            c = e.opacity || 1
        return {
            'stroke-linecap': r,
            'stroke-linejoin': s,
            'stroke-width': l || 0,
            'stroke-dasharray': p,
            stroke: o,
            fill: n,
            opacity: c,
        }
    },
    Le = (e) => e != null,
    wt = (e, t, i = 1) => {
        let a = me(e.x, t, i, 'width') || me(e.left, t, i, 'width'),
            n = me(e.y, t, i, 'height') || me(e.top, t, i, 'height'),
            o = me(e.width, t, i, 'width'),
            l = me(e.height, t, i, 'height'),
            r = me(e.right, t, i, 'width'),
            s = me(e.bottom, t, i, 'height')
        return (
            Le(n) || (Le(l) && Le(s) ? (n = t.height - l - s) : (n = s)),
            Le(a) || (Le(o) && Le(r) ? (a = t.width - o - r) : (a = r)),
            Le(o) || (Le(a) && Le(r) ? (o = t.width - a - r) : (o = 0)),
            Le(l) || (Le(n) && Le(s) ? (l = t.height - n - s) : (l = 0)),
            { x: a || 0, y: n || 0, width: o || 0, height: l || 0 }
        )
    },
    vu = (e) =>
        e.map((t, i) => `${i === 0 ? 'M' : 'L'} ${t.x} ${t.y}`).join(' '),
    Ne = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i])),
    Iu = 'http://www.w3.org/2000/svg',
    Rt = (e, t) => {
        let i = document.createElementNS(Iu, e)
        return t && Ne(i, t), i
    },
    xu = (e) => Ne(e, { ...e.rect, ...e.styles }),
    yu = (e) => {
        let t = e.rect.x + e.rect.width * 0.5,
            i = e.rect.y + e.rect.height * 0.5,
            a = e.rect.width * 0.5,
            n = e.rect.height * 0.5
        return Ne(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles })
    },
    _u = { contain: 'xMidYMid meet', cover: 'xMidYMid slice' },
    Ru = (e, t) => {
        Ne(e, {
            ...e.rect,
            ...e.styles,
            preserveAspectRatio: _u[t.fit] || 'none',
        })
    },
    wu = { left: 'start', center: 'middle', right: 'end' },
    Su = (e, t, i, a) => {
        let n = me(t.fontSize, i, a),
            o = t.fontFamily || 'sans-serif',
            l = t.fontWeight || 'normal',
            r = wu[t.textAlign] || 'start'
        Ne(e, {
            ...e.rect,
            ...e.styles,
            'stroke-width': 0,
            'font-weight': l,
            'font-size': n,
            'font-family': o,
            'text-anchor': r,
        }),
            e.text !== t.text &&
                ((e.text = t.text),
                (e.textContent = t.text.length ? t.text : ' '))
    },
    Lu = (e, t, i, a) => {
        Ne(e, { ...e.rect, ...e.styles, fill: 'none' })
        let n = e.childNodes[0],
            o = e.childNodes[1],
            l = e.childNodes[2],
            r = e.rect,
            s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height }
        if ((Ne(n, { x1: r.x, y1: r.y, x2: s.x, y2: s.y }), !t.lineDecoration))
            return
        ;(o.style.display = 'none'), (l.style.display = 'none')
        let p = xl({ x: s.x - r.x, y: s.y - r.y }),
            c = me(0.05, i, a)
        if (t.lineDecoration.indexOf('arrow-begin') !== -1) {
            let d = yi(p, c),
                m = _i(r, d),
                u = qe(r, 2, m),
                f = qe(r, -2, m)
            Ne(o, {
                style: 'display:block;',
                d: `M${u.x},${u.y} L${r.x},${r.y} L${f.x},${f.y}`,
            })
        }
        if (t.lineDecoration.indexOf('arrow-end') !== -1) {
            let d = yi(p, -c),
                m = _i(s, d),
                u = qe(s, 2, m),
                f = qe(s, -2, m)
            Ne(l, {
                style: 'display:block;',
                d: `M${u.x},${u.y} L${s.x},${s.y} L${f.x},${f.y}`,
            })
        }
    },
    Au = (e, t, i, a) => {
        Ne(e, {
            ...e.styles,
            fill: 'none',
            d: vu(
                t.points.map((n) => ({
                    x: me(n.x, i, a, 'width'),
                    y: me(n.y, i, a, 'height'),
                }))
            ),
        })
    },
    xi = (e) => (t) => Rt(e, { id: t.id }),
    Mu = (e) => {
        let t = Rt('image', {
            id: e.id,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            opacity: '0',
        })
        return (
            (t.onload = () => {
                t.setAttribute('opacity', e.opacity || 1)
            }),
            t.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                e.src
            ),
            t
        )
    },
    Ou = (e) => {
        let t = Rt('g', {
                id: e.id,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
            i = Rt('line')
        t.appendChild(i)
        let a = Rt('path')
        t.appendChild(a)
        let n = Rt('path')
        return t.appendChild(n), t
    },
    Pu = {
        image: Mu,
        rect: xi('rect'),
        ellipse: xi('ellipse'),
        text: xi('text'),
        path: xi('path'),
        line: Ou,
    },
    Du = { rect: xu, ellipse: yu, image: Ru, text: Su, path: Au, line: Lu },
    Fu = (e, t) => Pu[e](t),
    zu = (e, t, i, a, n) => {
        t !== 'path' && (e.rect = wt(i, a, n)),
            (e.styles = ct(i, a, n)),
            Du[t](e, i, a, n)
    },
    yl = (e, t) =>
        e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0,
    Cu = (e, t = {}, i, a) =>
        new Promise((n) => {
            let { background: o = null } = a,
                l = new FileReader()
            ;(l.onloadend = () => {
                let r = l.result,
                    s = document.createElement('div')
                ;(s.style.cssText =
                    'position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;'),
                    (s.innerHTML = r)
                let p = s.querySelector('svg')
                document.body.appendChild(s)
                let c = p.getBBox()
                s.parentNode.removeChild(s)
                let d = s.querySelector('title'),
                    m = p.getAttribute('viewBox') || '',
                    u = p.getAttribute('width') || '',
                    f = p.getAttribute('height') || '',
                    h = parseFloat(u) || null,
                    g = parseFloat(f) || null,
                    v = (u.match(/[a-z]+/) || [])[0] || '',
                    E = (f.match(/[a-z]+/) || [])[0] || '',
                    T = m.split(' ').map(parseFloat),
                    I = T.length
                        ? { x: T[0], y: T[1], width: T[2], height: T[3] }
                        : c,
                    y = h ?? I.width,
                    b = g ?? I.height
                ;(p.style.overflow = 'visible'),
                    p.setAttribute('width', y),
                    p.setAttribute('height', b)
                let w = ''
                if (i && i.length) {
                    let Q = { width: y, height: b }
                    ;(w = i.sort(yl).reduce((pe, G) => {
                        let H = Fu(G[0], G[1])
                        return (
                            zu(H, G[0], G[1], Q),
                            H.removeAttribute('id'),
                            H.getAttribute('opacity') === 1 &&
                                H.removeAttribute('opacity'),
                            pe +
                                `
` +
                                H.outerHTML +
                                `
`
                        )
                    }, '')),
                        (w = `

<g>${w.replace(/&nbsp;/g, ' ')}</g>

`)
                }
                let x = t.aspectRatio || b / y,
                    _ = y,
                    P = _ * x,
                    O = typeof t.scaleToFit > 'u' || t.scaleToFit,
                    M = t.center ? t.center.x : 0.5,
                    C = t.center ? t.center.y : 0.5,
                    S = Tl(
                        { width: y, height: b },
                        vl({ width: _, height: P }, x),
                        t.rotation,
                        O ? { x: M, y: C } : { x: 0.5, y: 0.5 }
                    ),
                    F = t.zoom * S,
                    R = t.rotation * (180 / Math.PI),
                    L = { x: _ * 0.5, y: P * 0.5 },
                    z = { x: L.x - y * M, y: L.y - b * C },
                    D = [
                        `rotate(${R} ${L.x} ${L.y})`,
                        `translate(${L.x} ${L.y})`,
                        `scale(${F})`,
                        `translate(${-L.x} ${-L.y})`,
                        `translate(${z.x} ${z.y})`,
                    ],
                    k = t.flip && t.flip.horizontal,
                    B = t.flip && t.flip.vertical,
                    X = [
                        `scale(${k ? -1 : 1} ${B ? -1 : 1})`,
                        `translate(${k ? -y : 0} ${B ? -b : 0})`,
                    ],
                    q = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${_}${v}" height="${P}${E}" 
viewBox="0 0 ${_} ${P}" ${o ? 'style="background:' + o + '" ' : ''}
preserveAspectRatio="xMinYMin"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg">
<!-- Generated by PQINA - https://pqina.nl/ -->
<title>${d ? d.textContent : ''}</title>
<g transform="${D.join(' ')}">
<g transform="${X.join(' ')}">
${p.outerHTML}${w}
</g>
</g>
</svg>`
                n(q)
            }),
                l.readAsText(e)
        }),
    Nu = (e) => {
        let t
        try {
            t = new ImageData(e.width, e.height)
        } catch {
            t = document
                .createElement('canvas')
                .getContext('2d')
                .createImageData(e.width, e.height)
        }
        return t.data.set(e.data), t
    },
    Bu = () => {
        let e = { resize: c, filter: p },
            t = (d, m) => (
                d.forEach((u) => {
                    m = e[u.type](m, u.data)
                }),
                m
            ),
            i = (d, m) => {
                let u = d.transforms,
                    f = null
                if (
                    (u.forEach((h) => {
                        h.type === 'filter' && (f = h)
                    }),
                    f)
                ) {
                    let h = null
                    u.forEach((g) => {
                        g.type === 'resize' && (h = g)
                    }),
                        h &&
                            ((h.data.matrix = f.data),
                            (u = u.filter((g) => g.type !== 'filter')))
                }
                m(t(u, d.imageData))
            }
        self.onmessage = (d) => {
            i(d.data.message, (m) => {
                self.postMessage({ id: d.data.id, message: m }, [m.data.buffer])
            })
        }
        let a = 1,
            n = 1,
            o = 1
        function l(d, m, u) {
            let f = m[d] / 255,
                h = m[d + 1] / 255,
                g = m[d + 2] / 255,
                v = m[d + 3] / 255,
                E = f * u[0] + h * u[1] + g * u[2] + v * u[3] + u[4],
                T = f * u[5] + h * u[6] + g * u[7] + v * u[8] + u[9],
                I = f * u[10] + h * u[11] + g * u[12] + v * u[13] + u[14],
                y = f * u[15] + h * u[16] + g * u[17] + v * u[18] + u[19],
                b = Math.max(0, E * y) + a * (1 - y),
                w = Math.max(0, T * y) + n * (1 - y),
                x = Math.max(0, I * y) + o * (1 - y)
            ;(m[d] = Math.max(0, Math.min(1, b)) * 255),
                (m[d + 1] = Math.max(0, Math.min(1, w)) * 255),
                (m[d + 2] = Math.max(0, Math.min(1, x)) * 255)
        }
        let r = self.JSON.stringify([
            1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
        ])
        function s(d) {
            return self.JSON.stringify(d || []) === r
        }
        function p(d, m) {
            if (!m || s(m)) return d
            let u = d.data,
                f = u.length,
                h = m[0],
                g = m[1],
                v = m[2],
                E = m[3],
                T = m[4],
                I = m[5],
                y = m[6],
                b = m[7],
                w = m[8],
                x = m[9],
                _ = m[10],
                P = m[11],
                O = m[12],
                M = m[13],
                C = m[14],
                S = m[15],
                F = m[16],
                R = m[17],
                L = m[18],
                z = m[19],
                D = 0,
                k = 0,
                B = 0,
                X = 0,
                q = 0,
                Q = 0,
                pe = 0,
                G = 0,
                H = 0,
                Y = 0,
                le = 0,
                ee = 0
            for (; D < f; D += 4)
                (k = u[D] / 255),
                    (B = u[D + 1] / 255),
                    (X = u[D + 2] / 255),
                    (q = u[D + 3] / 255),
                    (Q = k * h + B * g + X * v + q * E + T),
                    (pe = k * I + B * y + X * b + q * w + x),
                    (G = k * _ + B * P + X * O + q * M + C),
                    (H = k * S + B * F + X * R + q * L + z),
                    (Y = Math.max(0, Q * H) + a * (1 - H)),
                    (le = Math.max(0, pe * H) + n * (1 - H)),
                    (ee = Math.max(0, G * H) + o * (1 - H)),
                    (u[D] = Math.max(0, Math.min(1, Y)) * 255),
                    (u[D + 1] = Math.max(0, Math.min(1, le)) * 255),
                    (u[D + 2] = Math.max(0, Math.min(1, ee)) * 255)
            return d
        }
        function c(d, m) {
            let {
                mode: u = 'contain',
                upscale: f = !1,
                width: h,
                height: g,
                matrix: v,
            } = m
            if (((v = !v || s(v) ? null : v), !h && !g)) return p(d, v)
            if ((h === null ? (h = g) : g === null && (g = h), u !== 'force')) {
                let M = h / d.width,
                    C = g / d.height,
                    S = 1
                if (
                    (u === 'cover'
                        ? (S = Math.max(M, C))
                        : u === 'contain' && (S = Math.min(M, C)),
                    S > 1 && f === !1)
                )
                    return p(d, v)
                ;(h = d.width * S), (g = d.height * S)
            }
            let E = d.width,
                T = d.height,
                I = Math.round(h),
                y = Math.round(g),
                b = d.data,
                w = new Uint8ClampedArray(I * y * 4),
                x = E / I,
                _ = T / y,
                P = Math.ceil(x * 0.5),
                O = Math.ceil(_ * 0.5)
            for (let M = 0; M < y; M++)
                for (let C = 0; C < I; C++) {
                    let S = (C + M * I) * 4,
                        F = 0,
                        R = 0,
                        L = 0,
                        z = 0,
                        D = 0,
                        k = 0,
                        B = 0,
                        X = (M + 0.5) * _
                    for (let q = Math.floor(M * _); q < (M + 1) * _; q++) {
                        let Q = Math.abs(X - (q + 0.5)) / O,
                            pe = (C + 0.5) * x,
                            G = Q * Q
                        for (let H = Math.floor(C * x); H < (C + 1) * x; H++) {
                            let Y = Math.abs(pe - (H + 0.5)) / P,
                                le = Math.sqrt(G + Y * Y)
                            if (
                                le >= -1 &&
                                le <= 1 &&
                                ((F = 2 * le * le * le - 3 * le * le + 1),
                                F > 0)
                            ) {
                                Y = 4 * (H + q * E)
                                let ee = b[Y + 3]
                                ;(B += F * ee),
                                    (L += F),
                                    ee < 255 && (F = (F * ee) / 250),
                                    (z += F * b[Y]),
                                    (D += F * b[Y + 1]),
                                    (k += F * b[Y + 2]),
                                    (R += F)
                            }
                        }
                    }
                    ;(w[S] = z / R),
                        (w[S + 1] = D / R),
                        (w[S + 2] = k / R),
                        (w[S + 3] = B / L),
                        v && l(S, w, v)
                }
            return { data: w, width: I, height: y }
        }
    },
    ku = (e, t) => {
        if (e.getUint32(t + 4, !1) !== 1165519206) return
        t += 4
        let i = e.getUint16((t += 6), !1) === 18761
        t += e.getUint32(t + 4, i)
        let a = e.getUint16(t, i)
        t += 2
        for (let n = 0; n < a; n++)
            if (e.getUint16(t + n * 12, i) === 274)
                return e.setUint16(t + n * 12 + 8, 1, i), !0
        return !1
    },
    Vu = (e) => {
        let t = new DataView(e)
        if (t.getUint16(0) !== 65496) return null
        let i = 2,
            a,
            n,
            o = !1
        for (
            ;
            i < t.byteLength &&
            ((a = t.getUint16(i, !1)),
            (n = t.getUint16(i + 2, !1) + 2),
            !(
                !((a >= 65504 && a <= 65519) || a === 65534) ||
                (o || (o = ku(t, i, n)), i + n > t.byteLength)
            ));

        )
            i += n
        return e.slice(0, i)
    },
    Gu = (e) =>
        new Promise((t) => {
            let i = new FileReader()
            ;(i.onload = () => t(Vu(i.result) || null)),
                i.readAsArrayBuffer(e.slice(0, 256 * 1024))
        }),
    Uu = () =>
        (window.BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder),
    Wu = (e, t) => {
        let i = Uu()
        if (i) {
            let a = new i()
            return a.append(e), a.getBlob(t)
        }
        return new Blob([e], { type: t })
    },
    Hu = () => Math.random().toString(36).substr(2, 9),
    ju = (e) => {
        let t = new Blob(['(', e.toString(), ')()'], {
                type: 'application/javascript',
            }),
            i = URL.createObjectURL(t),
            a = new Worker(i),
            n = []
        return {
            transfer: () => {},
            post: (o, l, r) => {
                let s = Hu()
                ;(n[s] = l),
                    (a.onmessage = (p) => {
                        let c = n[p.data.id]
                        c && (c(p.data.message), delete n[p.data.id])
                    }),
                    a.postMessage({ id: s, message: o }, r)
            },
            terminate: () => {
                a.terminate(), URL.revokeObjectURL(i)
            },
        }
    },
    Yu = (e) =>
        new Promise((t, i) => {
            let a = new Image()
            ;(a.onload = () => {
                t(a)
            }),
                (a.onerror = (n) => {
                    i(n)
                }),
                (a.src = e)
        }),
    qu = (e) =>
        e.reduce(
            (t, i) => t.then((a) => i().then(Array.prototype.concat.bind(a))),
            Promise.resolve([])
        ),
    $u = (e, t) =>
        new Promise((i) => {
            let a = { width: e.width, height: e.height },
                n = e.getContext('2d'),
                o = t.sort(yl).map(
                    (l) => () =>
                        new Promise((r) => {
                            tf[l[0]](n, a, l[1], r) && r()
                        })
                )
            qu(o).then(() => i(e))
        }),
    St = (e, t) => {
        e.beginPath(),
            (e.lineCap = t['stroke-linecap']),
            (e.lineJoin = t['stroke-linejoin']),
            (e.lineWidth = t['stroke-width']),
            t['stroke-dasharray'].length &&
                e.setLineDash(t['stroke-dasharray'].split(',')),
            (e.fillStyle = t.fill),
            (e.strokeStyle = t.stroke),
            (e.globalAlpha = t.opacity || 1)
    },
    Lt = (e) => {
        e.fill(), e.stroke(), (e.globalAlpha = 1)
    },
    Xu = (e, t, i) => {
        let a = wt(i, t),
            n = ct(i, t)
        return St(e, n), e.rect(a.x, a.y, a.width, a.height), Lt(e, n), !0
    },
    Qu = (e, t, i) => {
        let a = wt(i, t),
            n = ct(i, t)
        St(e, n)
        let o = a.x,
            l = a.y,
            r = a.width,
            s = a.height,
            p = 0.5522848,
            c = (r / 2) * p,
            d = (s / 2) * p,
            m = o + r,
            u = l + s,
            f = o + r / 2,
            h = l + s / 2
        return (
            e.moveTo(o, h),
            e.bezierCurveTo(o, h - d, f - c, l, f, l),
            e.bezierCurveTo(f + c, l, m, h - d, m, h),
            e.bezierCurveTo(m, h + d, f + c, u, f, u),
            e.bezierCurveTo(f - c, u, o, h + d, o, h),
            Lt(e, n),
            !0
        )
    },
    Zu = (e, t, i, a) => {
        let n = wt(i, t),
            o = ct(i, t)
        St(e, o)
        let l = new Image()
        new URL(i.src, window.location.href).origin !==
            window.location.origin && (l.crossOrigin = ''),
            (l.onload = () => {
                if (i.fit === 'cover') {
                    let s = n.width / n.height,
                        p = s > 1 ? l.width : l.height * s,
                        c = s > 1 ? l.width / s : l.height,
                        d = l.width * 0.5 - p * 0.5,
                        m = l.height * 0.5 - c * 0.5
                    e.drawImage(l, d, m, p, c, n.x, n.y, n.width, n.height)
                } else if (i.fit === 'contain') {
                    let s = Math.min(n.width / l.width, n.height / l.height),
                        p = s * l.width,
                        c = s * l.height,
                        d = n.x + n.width * 0.5 - p * 0.5,
                        m = n.y + n.height * 0.5 - c * 0.5
                    e.drawImage(l, 0, 0, l.width, l.height, d, m, p, c)
                } else
                    e.drawImage(
                        l,
                        0,
                        0,
                        l.width,
                        l.height,
                        n.x,
                        n.y,
                        n.width,
                        n.height
                    )
                Lt(e, o), a()
            }),
            (l.src = i.src)
    },
    Ku = (e, t, i) => {
        let a = wt(i, t),
            n = ct(i, t)
        St(e, n)
        let o = me(i.fontSize, t),
            l = i.fontFamily || 'sans-serif',
            r = i.fontWeight || 'normal',
            s = i.textAlign || 'left'
        return (
            (e.font = `${r} ${o}px ${l}`),
            (e.textAlign = s),
            e.fillText(i.text, a.x, a.y),
            Lt(e, n),
            !0
        )
    },
    Ju = (e, t, i) => {
        let a = ct(i, t)
        St(e, a), e.beginPath()
        let n = i.points.map((l) => ({
            x: me(l.x, t, 1, 'width'),
            y: me(l.y, t, 1, 'height'),
        }))
        e.moveTo(n[0].x, n[0].y)
        let o = n.length
        for (let l = 1; l < o; l++) e.lineTo(n[l].x, n[l].y)
        return Lt(e, a), !0
    },
    ef = (e, t, i) => {
        let a = wt(i, t),
            n = ct(i, t)
        St(e, n), e.beginPath()
        let o = { x: a.x, y: a.y },
            l = { x: a.x + a.width, y: a.y + a.height }
        e.moveTo(o.x, o.y), e.lineTo(l.x, l.y)
        let r = xl({ x: l.x - o.x, y: l.y - o.y }),
            s = 0.04 * Math.min(t.width, t.height)
        if (i.lineDecoration.indexOf('arrow-begin') !== -1) {
            let p = yi(r, s),
                c = _i(o, p),
                d = qe(o, 2, c),
                m = qe(o, -2, c)
            e.moveTo(d.x, d.y), e.lineTo(o.x, o.y), e.lineTo(m.x, m.y)
        }
        if (i.lineDecoration.indexOf('arrow-end') !== -1) {
            let p = yi(r, -s),
                c = _i(l, p),
                d = qe(l, 2, c),
                m = qe(l, -2, c)
            e.moveTo(d.x, d.y), e.lineTo(l.x, l.y), e.lineTo(m.x, m.y)
        }
        return Lt(e, n), !0
    },
    tf = { rect: Xu, ellipse: Qu, image: Zu, text: Ku, line: ef, path: Ju },
    af = (e) => {
        let t = document.createElement('canvas')
        return (
            (t.width = e.width),
            (t.height = e.height),
            t.getContext('2d').putImageData(e, 0, 0),
            t
        )
    },
    nf = (e, t, i = {}) =>
        new Promise((a, n) => {
            if (!e || !du(e)) return n({ status: 'not an image file', file: e })
            let {
                    stripImageHead: o,
                    beforeCreateBlob: l,
                    afterCreateBlob: r,
                    canvasMemoryLimit: s,
                } = i,
                { crop: p, size: c, filter: d, markup: m, output: u } = t,
                f =
                    t.image && t.image.orientation
                        ? Math.max(1, Math.min(8, t.image.orientation))
                        : null,
                h = u && u.quality,
                g = h === null ? null : h / 100,
                v = (u && u.type) || null,
                E = (u && u.background) || null,
                T = []
            c &&
                (typeof c.width == 'number' || typeof c.height == 'number') &&
                T.push({ type: 'resize', data: c }),
                d && d.length === 20 && T.push({ type: 'filter', data: d })
            let I = (w) => {
                    let x = r ? r(w) : w
                    Promise.resolve(x).then(a)
                },
                y = (w, x) => {
                    let _ = af(w),
                        P = m.length ? $u(_, m) : _
                    Promise.resolve(P).then((O) => {
                        Tu(O, x, l)
                            .then((M) => {
                                if ((Il(O), o)) return I(M)
                                Gu(e).then((C) => {
                                    C !== null &&
                                        (M = new Blob([C, M.slice(20)], {
                                            type: M.type,
                                        })),
                                        I(M)
                                })
                            })
                            .catch(n)
                    })
                }
            if (/svg/.test(e.type) && v === null)
                return Cu(e, p, m, { background: E }).then((w) => {
                    a(Wu(w, 'image/svg+xml'))
                })
            let b = URL.createObjectURL(e)
            Yu(b)
                .then((w) => {
                    URL.revokeObjectURL(b)
                    let x = Eu(w, f, p, {
                            canvasMemoryLimit: s,
                            background: E,
                        }),
                        _ = { quality: g, type: v || e.type }
                    if (!T.length) return y(x, _)
                    let P = ju(Bu)
                    P.post(
                        { transforms: T, imageData: x },
                        (O) => {
                            y(Nu(O), _), P.terminate()
                        },
                        [x.data.buffer]
                    )
                })
                .catch(n)
        }),
    of = ['x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height'],
    lf = (e) => (typeof e == 'string' && /%/.test(e) ? parseFloat(e) / 100 : e),
    rf = (e) => {
        let [t, i] = e,
            a = i.points ? {} : of.reduce((n, o) => ((n[o] = lf(i[o])), n), {})
        return [t, { zIndex: 0, ...i, ...a }]
    },
    sf = (e) =>
        new Promise((t, i) => {
            let a = new Image()
            a.src = URL.createObjectURL(e)
            let n = () => {
                let l = a.naturalWidth,
                    r = a.naturalHeight
                l &&
                    r &&
                    (URL.revokeObjectURL(a.src),
                    clearInterval(o),
                    t({ width: l, height: r }))
            }
            a.onerror = (l) => {
                URL.revokeObjectURL(a.src), clearInterval(o), i(l)
            }
            let o = setInterval(n, 1)
            n()
        })
typeof window < 'u' &&
    typeof window.document < 'u' &&
    (HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (e, t, i) {
                let a = this
                setTimeout(() => {
                    let n = a.toDataURL(t, i).split(',')[1],
                        o = atob(n),
                        l = o.length,
                        r = new Uint8Array(l)
                    for (; l--; ) r[l] = o.charCodeAt(l)
                    e(new Blob([r], { type: t || 'image/png' }))
                })
            },
        }))
var Sa = typeof window < 'u' && typeof window.document < 'u',
    cf = Sa && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    _l = ({ addFilter: e, utils: t }) => {
        let { Type: i, forin: a, getFileFromBlob: n, isFile: o } = t,
            l = ['crop', 'resize', 'filter', 'markup', 'output'],
            r = (c) => (d, m, u) => d(m, c ? c(u) : u),
            s = (c) =>
                c.aspectRatio === null &&
                c.rotation === 0 &&
                c.zoom === 1 &&
                c.center &&
                c.center.x === 0.5 &&
                c.center.y === 0.5 &&
                c.flip &&
                c.flip.horizontal === !1 &&
                c.flip.vertical === !1
        e(
            'SHOULD_PREPARE_OUTPUT',
            (c, { query: d }) =>
                new Promise((m) => {
                    m(!d('IS_ASYNC'))
                })
        )
        let p = (c, d, m) =>
            new Promise((u) => {
                if (
                    !c('GET_ALLOW_IMAGE_TRANSFORM') ||
                    m.archived ||
                    !o(d) ||
                    !ou(d)
                )
                    return u(!1)
                sf(d)
                    .then(() => {
                        let f = c('GET_IMAGE_TRANSFORM_IMAGE_FILTER')
                        if (f) {
                            let h = f(d)
                            if (h == null) return handleRevert(!0)
                            if (typeof h == 'boolean') return u(h)
                            if (typeof h.then == 'function') return h.then(u)
                        }
                        u(!0)
                    })
                    .catch((f) => {
                        u(!1)
                    })
            })
        return (
            e('DID_CREATE_ITEM', (c, { query: d, dispatch: m }) => {
                d('GET_ALLOW_IMAGE_TRANSFORM') &&
                    c.extend(
                        'requestPrepare',
                        () =>
                            new Promise((u, f) => {
                                m(
                                    'REQUEST_PREPARE_OUTPUT',
                                    {
                                        query: c.id,
                                        item: c,
                                        success: u,
                                        failure: f,
                                    },
                                    !0
                                )
                            })
                    )
            }),
            e(
                'PREPARE_OUTPUT',
                (c, { query: d, item: m }) =>
                    new Promise((u) => {
                        p(d, c, m).then((f) => {
                            if (!f) return u(c)
                            let h = []
                            d(
                                'GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL'
                            ) &&
                                h.push(
                                    () =>
                                        new Promise((x) => {
                                            x({
                                                name: d(
                                                    'GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME'
                                                ),
                                                file: c,
                                            })
                                        })
                                ),
                                d(
                                    'GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT'
                                ) &&
                                    h.push(
                                        (x, _, P) =>
                                            new Promise((O) => {
                                                x(_, P).then((M) =>
                                                    O({
                                                        name: d(
                                                            'GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME'
                                                        ),
                                                        file: M,
                                                    })
                                                )
                                            })
                                    )
                            let g = d('GET_IMAGE_TRANSFORM_VARIANTS') || {}
                            a(g, (x, _) => {
                                let P = r(_)
                                h.push(
                                    (O, M, C) =>
                                        new Promise((S) => {
                                            P(O, M, C).then((F) =>
                                                S({ name: x, file: F })
                                            )
                                        })
                                )
                            })
                            let v = d('GET_IMAGE_TRANSFORM_OUTPUT_QUALITY'),
                                E = d(
                                    'GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE'
                                ),
                                T = v === null ? null : v / 100,
                                I = d('GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE'),
                                y =
                                    d(
                                        'GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS'
                                    ) || l
                            m.setMetadata(
                                'output',
                                { type: I, quality: T, client: y },
                                !0
                            )
                            let b = (x, _) =>
                                    new Promise((P, O) => {
                                        let M = { ..._ }
                                        Object.keys(M)
                                            .filter((B) => B !== 'exif')
                                            .forEach((B) => {
                                                y.indexOf(B) === -1 &&
                                                    delete M[B]
                                            })
                                        let {
                                                resize: C,
                                                exif: S,
                                                output: F,
                                                crop: R,
                                                filter: L,
                                                markup: z,
                                            } = M,
                                            D = {
                                                image: {
                                                    orientation: S
                                                        ? S.orientation
                                                        : null,
                                                },
                                                output:
                                                    F &&
                                                    (F.type ||
                                                        typeof F.quality ==
                                                            'number' ||
                                                        F.background)
                                                        ? {
                                                              type: F.type,
                                                              quality:
                                                                  typeof F.quality ==
                                                                  'number'
                                                                      ? F.quality *
                                                                        100
                                                                      : null,
                                                              background:
                                                                  F.background ||
                                                                  d(
                                                                      'GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR'
                                                                  ) ||
                                                                  null,
                                                          }
                                                        : void 0,
                                                size:
                                                    C &&
                                                    (C.size.width ||
                                                        C.size.height)
                                                        ? {
                                                              mode: C.mode,
                                                              upscale:
                                                                  C.upscale,
                                                              ...C.size,
                                                          }
                                                        : void 0,
                                                crop:
                                                    R && !s(R)
                                                        ? { ...R }
                                                        : void 0,
                                                markup:
                                                    z && z.length
                                                        ? z.map(rf)
                                                        : [],
                                                filter: L,
                                            }
                                        if (D.output) {
                                            let B = F.type
                                                    ? F.type !== x.type
                                                    : !1,
                                                X = /\/jpe?g$/.test(x.type),
                                                q =
                                                    F.quality !== null
                                                        ? X && E === 'always'
                                                        : !1
                                            if (
                                                !!!(
                                                    D.size ||
                                                    D.crop ||
                                                    D.filter ||
                                                    B ||
                                                    q
                                                )
                                            )
                                                return P(x)
                                        }
                                        let k = {
                                            beforeCreateBlob: d(
                                                'GET_IMAGE_TRANSFORM_BEFORE_CREATE_BLOB'
                                            ),
                                            afterCreateBlob: d(
                                                'GET_IMAGE_TRANSFORM_AFTER_CREATE_BLOB'
                                            ),
                                            canvasMemoryLimit: d(
                                                'GET_IMAGE_TRANSFORM_CANVAS_MEMORY_LIMIT'
                                            ),
                                            stripImageHead: d(
                                                'GET_IMAGE_TRANSFORM_OUTPUT_STRIP_IMAGE_HEAD'
                                            ),
                                        }
                                        nf(x, D, k)
                                            .then((B) => {
                                                let X = n(
                                                    B,
                                                    su(x.name, cu(B.type))
                                                )
                                                P(X)
                                            })
                                            .catch(O)
                                    }),
                                w = h.map((x) => x(b, c, m.getMetadata()))
                            Promise.all(w).then((x) => {
                                u(
                                    x.length === 1 && x[0].name === null
                                        ? x[0].file
                                        : x
                                )
                            })
                        })
                    })
            ),
            {
                options: {
                    allowImageTransform: [!0, i.BOOLEAN],
                    imageTransformImageFilter: [null, i.FUNCTION],
                    imageTransformOutputMimeType: [null, i.STRING],
                    imageTransformOutputQuality: [null, i.INT],
                    imageTransformOutputStripImageHead: [!0, i.BOOLEAN],
                    imageTransformClientTransforms: [null, i.ARRAY],
                    imageTransformOutputQualityMode: ['always', i.STRING],
                    imageTransformVariants: [null, i.OBJECT],
                    imageTransformVariantsIncludeDefault: [!0, i.BOOLEAN],
                    imageTransformVariantsDefaultName: [null, i.STRING],
                    imageTransformVariantsIncludeOriginal: [!1, i.BOOLEAN],
                    imageTransformVariantsOriginalName: ['original_', i.STRING],
                    imageTransformBeforeCreateBlob: [null, i.FUNCTION],
                    imageTransformAfterCreateBlob: [null, i.FUNCTION],
                    imageTransformCanvasMemoryLimit: [
                        Sa && cf ? 4096 * 4096 : null,
                        i.INT,
                    ],
                    imageTransformCanvasBackgroundColor: [null, i.STRING],
                },
            }
        )
    }
Sa &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: _l })
    )
var Rl = _l
var La = (e) => /^video/.test(e.type),
    $t = (e) => /^audio/.test(e.type),
    Aa = class {
        constructor(t, i) {
            ;(this.mediaEl = t),
                (this.audioElems = i),
                (this.onplayhead = !1),
                (this.duration = 0),
                (this.timelineWidth =
                    this.audioElems.timeline.offsetWidth -
                    this.audioElems.playhead.offsetWidth),
                (this.moveplayheadFn = this.moveplayhead.bind(this)),
                this.registerListeners()
        }
        registerListeners() {
            this.mediaEl.addEventListener(
                'timeupdate',
                this.timeUpdate.bind(this),
                !1
            ),
                this.mediaEl.addEventListener(
                    'canplaythrough',
                    () => (this.duration = this.mediaEl.duration),
                    !1
                ),
                this.audioElems.timeline.addEventListener(
                    'click',
                    this.timelineClicked.bind(this),
                    !1
                ),
                this.audioElems.button.addEventListener(
                    'click',
                    this.play.bind(this)
                ),
                this.audioElems.playhead.addEventListener(
                    'mousedown',
                    this.mouseDown.bind(this),
                    !1
                ),
                window.addEventListener('mouseup', this.mouseUp.bind(this), !1)
        }
        play() {
            this.mediaEl.paused ? this.mediaEl.play() : this.mediaEl.pause(),
                this.audioElems.button.classList.toggle('play'),
                this.audioElems.button.classList.toggle('pause')
        }
        timeUpdate() {
            let t = (this.mediaEl.currentTime / this.duration) * 100
            ;(this.audioElems.playhead.style.marginLeft = t + '%'),
                this.mediaEl.currentTime === this.duration &&
                    (this.audioElems.button.classList.toggle('play'),
                    this.audioElems.button.classList.toggle('pause'))
        }
        moveplayhead(t) {
            let i = t.clientX - this.getPosition(this.audioElems.timeline)
            i >= 0 &&
                i <= this.timelineWidth &&
                (this.audioElems.playhead.style.marginLeft = i + 'px'),
                i < 0 && (this.audioElems.playhead.style.marginLeft = '0px'),
                i > this.timelineWidth &&
                    (this.audioElems.playhead.style.marginLeft =
                        this.timelineWidth - 4 + 'px')
        }
        timelineClicked(t) {
            this.moveplayhead(t),
                (this.mediaEl.currentTime =
                    this.duration * this.clickPercent(t))
        }
        mouseDown() {
            ;(this.onplayhead = !0),
                window.addEventListener('mousemove', this.moveplayheadFn, !0),
                this.mediaEl.removeEventListener(
                    'timeupdate',
                    this.timeUpdate.bind(this),
                    !1
                )
        }
        mouseUp(t) {
            window.removeEventListener('mousemove', this.moveplayheadFn, !0),
                this.onplayhead == !0 &&
                    (this.moveplayhead(t),
                    (this.mediaEl.currentTime =
                        this.duration * this.clickPercent(t)),
                    this.mediaEl.addEventListener(
                        'timeupdate',
                        this.timeUpdate.bind(this),
                        !1
                    )),
                (this.onplayhead = !1)
        }
        clickPercent(t) {
            return (
                (t.clientX - this.getPosition(this.audioElems.timeline)) /
                this.timelineWidth
            )
        }
        getPosition(t) {
            return t.getBoundingClientRect().left
        }
    },
    df = (e) =>
        e.utils.createView({
            name: 'media-preview',
            tag: 'div',
            ignoreRect: !0,
            create: ({ root: t, props: i }) => {
                let { id: a } = i,
                    n = t.query('GET_ITEM', { id: i.id }),
                    o = $t(n.file) ? 'audio' : 'video'
                if (
                    ((t.ref.media = document.createElement(o)),
                    t.ref.media.setAttribute('controls', !0),
                    t.element.appendChild(t.ref.media),
                    $t(n.file))
                ) {
                    let l = document.createDocumentFragment()
                    ;(t.ref.audio = []),
                        (t.ref.audio.container = document.createElement('div')),
                        (t.ref.audio.button = document.createElement('span')),
                        (t.ref.audio.timeline = document.createElement('div')),
                        (t.ref.audio.playhead = document.createElement('div')),
                        (t.ref.audio.container.className = 'audioplayer'),
                        (t.ref.audio.button.className = 'playpausebtn play'),
                        (t.ref.audio.timeline.className = 'timeline'),
                        (t.ref.audio.playhead.className = 'playhead'),
                        t.ref.audio.timeline.appendChild(t.ref.audio.playhead),
                        t.ref.audio.container.appendChild(t.ref.audio.button),
                        t.ref.audio.container.appendChild(t.ref.audio.timeline),
                        l.appendChild(t.ref.audio.container),
                        t.element.appendChild(l)
                }
            },
            write: e.utils.createRoute({
                DID_MEDIA_PREVIEW_LOAD: ({ root: t, props: i }) => {
                    let { id: a } = i,
                        n = t.query('GET_ITEM', { id: i.id })
                    if (!n) return
                    let o = window.URL || window.webkitURL,
                        l = new Blob([n.file], { type: n.file.type })
                    ;(t.ref.media.type = n.file.type),
                        (t.ref.media.src =
                            (n.file.mock && n.file.url) ||
                            o.createObjectURL(l)),
                        $t(n.file) && new Aa(t.ref.media, t.ref.audio),
                        t.ref.media.addEventListener(
                            'loadeddata',
                            () => {
                                let r = 75
                                if (La(n.file)) {
                                    let s = t.ref.media.offsetWidth,
                                        p = t.ref.media.videoWidth / s
                                    r = t.ref.media.videoHeight / p
                                }
                                t.dispatch('DID_UPDATE_PANEL_HEIGHT', {
                                    id: i.id,
                                    height: r,
                                })
                            },
                            !1
                        )
                },
            }),
        }),
    pf = (e) => {
        let t = ({ root: a, props: n }) => {
                let { id: o } = n
                a.query('GET_ITEM', o) &&
                    a.dispatch('DID_MEDIA_PREVIEW_LOAD', { id: o })
            },
            i = ({ root: a, props: n }) => {
                let o = df(e)
                a.ref.media = a.appendChildView(
                    a.createChildView(o, { id: n.id })
                )
            }
        return e.utils.createView({
            name: 'media-preview-wrapper',
            create: i,
            write: e.utils.createRoute({
                DID_MEDIA_PREVIEW_CONTAINER_CREATE: t,
            }),
        })
    },
    Ma = (e) => {
        let { addFilter: t, utils: i } = e,
            { Type: a, createRoute: n } = i,
            o = pf(e)
        return (
            t('CREATE_VIEW', (l) => {
                let { is: r, view: s, query: p } = l
                if (!r('file')) return
                let c = ({ root: d, props: m }) => {
                    let { id: u } = m,
                        f = p('GET_ITEM', u),
                        h = p('GET_ALLOW_VIDEO_PREVIEW'),
                        g = p('GET_ALLOW_AUDIO_PREVIEW')
                    !f ||
                        f.archived ||
                        ((!La(f.file) || !h) && (!$t(f.file) || !g)) ||
                        ((d.ref.mediaPreview = s.appendChildView(
                            s.createChildView(o, { id: u })
                        )),
                        d.dispatch('DID_MEDIA_PREVIEW_CONTAINER_CREATE', {
                            id: u,
                        }))
                }
                s.registerWriter(
                    n({ DID_LOAD_ITEM: c }, ({ root: d, props: m }) => {
                        let { id: u } = m,
                            f = p('GET_ITEM', u),
                            h = d.query('GET_ALLOW_VIDEO_PREVIEW'),
                            g = d.query('GET_ALLOW_AUDIO_PREVIEW')
                        !f ||
                            ((!La(f.file) || !h) && (!$t(f.file) || !g)) ||
                            d.rect.element.hidden
                    })
                )
            }),
            {
                options: {
                    allowVideoPreview: [!0, a.BOOLEAN],
                    allowAudioPreview: [!0, a.BOOLEAN],
                },
            }
        )
    },
    mf = typeof window < 'u' && typeof window.document < 'u'
mf &&
    document.dispatchEvent(
        new CustomEvent('FilePond:pluginloaded', { detail: Ma })
    )
var wl = {
    labelIdle:
        '\u0627\u0633\u062D\u0628 \u0648 \u0627\u062F\u0631\u062C \u0645\u0644\u0641\u0627\u062A\u0643 \u0623\u0648 <span class="filepond--label-action"> \u062A\u0635\u0641\u062D </span>',
    labelInvalidField:
        '\u0627\u0644\u062D\u0642\u0644 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629',
    labelFileWaitingForSize:
        '\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062D\u062C\u0645',
    labelFileSizeNotAvailable:
        '\u0627\u0644\u062D\u062C\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D',
    labelFileLoading: '\u0628\u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631',
    labelFileLoadError:
        '\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0645\u064A\u0644',
    labelFileProcessing: '\u064A\u062A\u0645 \u0627\u0644\u0631\u0641\u0639',
    labelFileProcessingComplete: '\u062A\u0645 \u0627\u0644\u0631\u0641\u0639',
    labelFileProcessingAborted:
        '\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0631\u0641\u0639',
    labelFileProcessingError:
        '\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0639',
    labelFileProcessingRevertError:
        '\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0631\u0627\u062C\u0639',
    labelFileRemoveError:
        '\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641',
    labelTapToCancel:
        '\u0627\u0646\u0642\u0631 \u0644\u0644\u0625\u0644\u063A\u0627\u0621',
    labelTapToRetry:
        '\u0627\u0646\u0642\u0631 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629',
    labelTapToUndo:
        '\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0631\u0627\u062C\u0639',
    labelButtonRemoveItem: '\u0645\u0633\u062D',
    labelButtonAbortItemLoad: '\u0625\u0644\u063A\u0627\u0621',
    labelButtonRetryItemLoad: '\u0625\u0639\u0627\u062F\u0629',
    labelButtonAbortItemProcessing: '\u0625\u0644\u063A\u0627\u0621',
    labelButtonUndoItemProcessing: '\u062A\u0631\u0627\u062C\u0639',
    labelButtonRetryItemProcessing: '\u0625\u0639\u0627\u062F\u0629',
    labelButtonProcessItem: '\u0631\u0641\u0639',
    labelMaxFileSizeExceeded:
        '\u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627',
    labelMaxFileSize:
        '\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0642\u0635\u0649: {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A',
    labelMaxTotalFileSize:
        '\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641: {filesize}',
    labelFileTypeNotAllowed:
        '\u0645\u0644\u0641 \u0645\u0646 \u0646\u0648\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D',
    fileValidateTypeLabelExpectedTypes:
        '\u062A\u062A\u0648\u0642\u0639 {allButLastType} \u0645\u0646 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u0646\u0648\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u0627\u0644\u0635\u0648\u0631\u0629 \u0635\u063A\u064A\u0631 \u062C\u062F\u0627',
    imageValidateSizeLabelImageSizeTooBig:
        '\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627',
    imageValidateSizeLabelExpectedMinSize:
        '\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0627\u0644\u062F\u0642\u0629 \u0636\u0639\u064A\u0641\u0629 \u062C\u062F\u0627',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0627\u0644\u062F\u0642\u0629 \u0645\u0631\u062A\u0641\u0639\u0629 \u062C\u062F\u0627',
    imageValidateSizeLabelExpectedMinResolution:
        '\u0623\u0642\u0644 \u062F\u0642\u0629: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u0623\u0642\u0635\u0649 \u062F\u0642\u0629: {maxResolution}',
}
var Sl = {
    labelIdle:
        'Arrossega i deixa anar els teus fitxers o <span class="filepond--label-action"> Navega </span>',
    labelInvalidField: 'El camp cont\xE9 fitxers inv\xE0lids',
    labelFileWaitingForSize: 'Esperant mida',
    labelFileSizeNotAvailable: 'Mida no disponible',
    labelFileLoading: 'Carregant',
    labelFileLoadError: 'Error durant la c\xE0rrega',
    labelFileProcessing: 'Pujant',
    labelFileProcessingComplete: 'Pujada completada',
    labelFileProcessingAborted: 'Pujada cancel\xB7lada',
    labelFileProcessingError: 'Error durant la pujada',
    labelFileProcessingRevertError: 'Error durant la reversi\xF3',
    labelFileRemoveError: "Error durant l'eliminaci\xF3",
    labelTapToCancel: 'toca per cancel\xB7lar',
    labelTapToRetry: 'toca per reintentar',
    labelTapToUndo: 'toca per desfer',
    labelButtonRemoveItem: 'Eliminar',
    labelButtonAbortItemLoad: 'Cancel\xB7lar',
    labelButtonRetryItemLoad: 'Reintentar',
    labelButtonAbortItemProcessing: 'Cancel\xB7lar',
    labelButtonUndoItemProcessing: 'Desfer',
    labelButtonRetryItemProcessing: 'Reintentar',
    labelButtonProcessItem: 'Pujar',
    labelMaxFileSizeExceeded: 'El fitxer \xE9s massa gran',
    labelMaxFileSize: 'La mida m\xE0xima del fitxer \xE9s {filesize}',
    labelMaxTotalFileSizeExceeded: 'Mida m\xE0xima total excedida',
    labelMaxTotalFileSize:
        'La mida m\xE0xima total del fitxer \xE9s {filesize}',
    labelFileTypeNotAllowed: 'Fitxer de tipus inv\xE0lid',
    fileValidateTypeLabelExpectedTypes: 'Espera {allButLastType} o {lastType}',
    imageValidateSizeLabelFormatError: "Tipus d'imatge no suportada",
    imageValidateSizeLabelImageSizeTooSmall: 'La imatge \xE9s massa petita',
    imageValidateSizeLabelImageSizeTooBig: 'La imatge \xE9s massa gran',
    imageValidateSizeLabelExpectedMinSize:
        'La mida m\xEDnima \xE9s {minWidth} x {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'La mida m\xE0xima \xE9s {maxWidth} x {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'La resoluci\xF3 \xE9s massa baixa',
    imageValidateSizeLabelImageResolutionTooHigh:
        'La resoluci\xF3 \xE9s massa alta',
    imageValidateSizeLabelExpectedMinResolution:
        'La resoluci\xF3 m\xEDnima \xE9s {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'La resoluci\xF3 m\xE0xima \xE9s {maxResolution}',
}
var Ll = {
    labelIdle:
        '\u067E\u06D5\u0695\u06AF\u06D5\u06A9\u0627\u0646 \u0641\u0695\u06CE \u0628\u062F\u06D5 \u0626\u06CE\u0631\u06D5 \u0628\u06C6 \u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u06CC\u0627\u0646 <span class="filepond--label-action"> \u0647\u06D5\u06B5\u0628\u0698\u06CE\u0631\u06D5 </span>',
    labelInvalidField:
        '\u067E\u06D5\u0695\u06AF\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06CC \u062A\u06CE\u062F\u0627\u06CC\u06D5',
    labelFileWaitingForSize:
        '\u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06CC\u06CC \u0642\u06D5\u0628\u0627\u0631\u06D5',
    labelFileSizeNotAvailable:
        '\u0642\u06D5\u0628\u0627\u0631\u06D5 \u0628\u06D5\u0631\u062F\u06D5\u0633\u062A \u0646\u06CC\u06D5',
    labelFileLoading: '\u0628\u0627\u0631\u06A9\u0631\u062F\u0646',
    labelFileLoadError:
        '\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u0645\u0627\u0648\u06D5\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646',
    labelFileProcessing: '\u0628\u0627\u0631\u06A9\u0631\u062F\u0646',
    labelFileProcessingComplete:
        '\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u062A\u06D5\u0648\u0627\u0648 \u0628\u0648\u0648',
    labelFileProcessingAborted:
        '\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u06CC\u06D5\u0648\u06D5',
    labelFileProcessingError:
        '\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u06A9\u0627\u062A\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646\u062F\u0627',
    labelFileProcessingRevertError:
        '\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u06AF\u06D5\u0695\u0627\u0646\u06D5\u0648\u06D5',
    labelFileRemoveError:
        '\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5',
    labelTapToCancel:
        '\u0628\u06C6 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5 Tab \u062F\u0627\u0628\u06AF\u0631\u06D5',
    labelTapToRetry:
        'tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u062F\u0648\u0648\u0628\u0627\u0631\u06D5\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5',
    labelTapToUndo:
        'tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5',
    labelButtonRemoveItem: '\u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5',
    labelButtonAbortItemLoad:
        '\u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5',
    labelButtonRetryItemLoad:
        '\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5',
    labelButtonAbortItemProcessing:
        '\u067E\u06D5\u0634\u06CC\u0645\u0627\u0646\u0628\u0648\u0648\u0646\u06D5\u0648\u06D5',
    labelButtonUndoItemProcessing:
        '\u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5',
    labelButtonRetryItemProcessing:
        '\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5',
    labelButtonProcessItem: '\u0628\u0627\u0631\u06A9\u0631\u062F\u0646',
    labelMaxFileSizeExceeded:
        '\u067E\u06D5\u0695\u06AF\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5',
    labelMaxFileSize:
        '\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u06AF\u0634\u062A\u06CC \u062A\u06CE\u067E\u06D5\u0695\u06CE\u0646\u062F\u0631\u0627',
    labelMaxTotalFileSize:
        '\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u067E\u06D5\u0695\u06AF\u06D5 {filesize}',
    labelFileTypeNotAllowed:
        '\u062C\u06C6\u0631\u06CC \u067E\u06D5\u0695\u06AF\u06D5\u06A9\u06D5 \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06D5',
    fileValidateTypeLabelExpectedTypes:
        '\u062C\u06AF\u06D5 \u0644\u06D5 {allButLastType} \u06CC\u0627\u0646 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u062C\u06C6\u0631\u06CC \u0648\u06CE\u0646\u06D5 \u067E\u0627\u06B5\u067E\u0634\u062A\u06CC\u06CC \u0646\u06D5\u06A9\u0631\u0627\u0648\u06D5',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u0628\u0686\u0648\u0648\u06A9\u06D5',
    imageValidateSizeLabelImageSizeTooBig:
        '\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5',
    imageValidateSizeLabelExpectedMinSize:
        '\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u06A9\u06D5\u0645\u06D5',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u0628\u06D5\u0631\u0632\u06D5',
    imageValidateSizeLabelExpectedMinResolution:
        '\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC {maxResolution}',
}
var Al = {
    labelIdle:
        'P\u0159et\xE1hn\u011Bte soubor sem (drag&drop) nebo <span class="filepond--label-action"> Vyhledat </span>',
    labelInvalidField: 'Pole obsahuje chybn\xE9 soubory',
    labelFileWaitingForSize: 'Zji\u0161\u0165uje se velikost',
    labelFileSizeNotAvailable: 'Velikost nen\xED zn\xE1m\xE1',
    labelFileLoading: 'P\u0159en\xE1\u0161\xED se',
    labelFileLoadError: 'Chyba p\u0159i p\u0159enosu',
    labelFileProcessing: 'Prob\xEDh\xE1 upload',
    labelFileProcessingComplete: 'Upload dokon\u010Den',
    labelFileProcessingAborted: 'Upload stornov\xE1n',
    labelFileProcessingError: 'Chyba p\u0159i uploadu',
    labelFileProcessingRevertError: 'Chyba p\u0159i obnov\u011B',
    labelFileRemoveError: 'Chyba p\u0159i odstran\u011Bn\xED',
    labelTapToCancel: 'klepn\u011Bte pro storno',
    labelTapToRetry: 'klepn\u011Bte pro opakov\xE1n\xED',
    labelTapToUndo: 'klepn\u011Bte pro vr\xE1cen\xED',
    labelButtonRemoveItem: 'Odstranit',
    labelButtonAbortItemLoad: 'Storno',
    labelButtonRetryItemLoad: 'Opakovat',
    labelButtonAbortItemProcessing: 'Zp\u011Bt',
    labelButtonUndoItemProcessing: 'Vr\xE1tit',
    labelButtonRetryItemProcessing: 'Opakovat',
    labelButtonProcessItem: 'Upload',
    labelMaxFileSizeExceeded: 'Soubor je p\u0159\xEDli\u0161 velk\xFD',
    labelMaxFileSize: 'Nejv\u011Bt\u0161\xED velikost souboru je {filesize}',
    labelMaxTotalFileSizeExceeded:
        'P\u0159ekro\u010Dena maxim\xE1ln\xED celkov\xE1 velikost souboru',
    labelMaxTotalFileSize:
        'Maxim\xE1ln\xED celkov\xE1 velikost souboru je {filesize}',
    labelFileTypeNotAllowed: 'Soubor je nespr\xE1vn\xE9ho typu',
    fileValidateTypeLabelExpectedTypes:
        'O\u010Dek\xE1v\xE1 se {allButLastType} nebo {lastType}',
    imageValidateSizeLabelFormatError:
        'Obr\xE1zek tohoto typu nen\xED podporov\xE1n',
    imageValidateSizeLabelImageSizeTooSmall:
        'Obr\xE1zek je p\u0159\xEDli\u0161 mal\xFD',
    imageValidateSizeLabelImageSizeTooBig:
        'Obr\xE1zek je p\u0159\xEDli\u0161 velk\xFD',
    imageValidateSizeLabelExpectedMinSize:
        'Minim\xE1ln\xED rozm\u011Br je {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maxim\xE1ln\xED rozm\u011Br je {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'Rozli\u0161en\xED je p\u0159\xEDli\u0161 mal\xE9',
    imageValidateSizeLabelImageResolutionTooHigh:
        'Rozli\u0161en\xED je p\u0159\xEDli\u0161 velk\xE9',
    imageValidateSizeLabelExpectedMinResolution:
        'Minim\xE1ln\xED rozli\u0161en\xED je {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maxim\xE1ln\xED rozli\u0161en\xED je {maxResolution}',
}
var Ml = {
    labelIdle:
        'Tr\xE6k & slip filer eller <span class = "filepond - label-action"> Gennemse </span>',
    labelInvalidField: 'Felt indeholder ugyldige filer',
    labelFileWaitingForSize: 'Venter p\xE5 st\xF8rrelse',
    labelFileSizeNotAvailable: 'St\xF8rrelse ikke tilg\xE6ngelig',
    labelFileLoading: 'Loader',
    labelFileLoadError: 'Load fejlede',
    labelFileProcessing: 'Uploader',
    labelFileProcessingComplete: 'Upload f\xE6rdig',
    labelFileProcessingAborted: 'Upload annulleret',
    labelFileProcessingError: 'Upload fejlede',
    labelFileProcessingRevertError: 'Fortryd fejlede',
    labelFileRemoveError: 'Fjern fejlede',
    labelTapToCancel: 'tryk for at annullere',
    labelTapToRetry: 'tryk for at pr\xF8ve igen',
    labelTapToUndo: 'tryk for at fortryde',
    labelButtonRemoveItem: 'Fjern',
    labelButtonAbortItemLoad: 'Annuller',
    labelButtonRetryItemLoad: 'Fors\xF8g igen',
    labelButtonAbortItemProcessing: 'Annuller',
    labelButtonUndoItemProcessing: 'Fortryd',
    labelButtonRetryItemProcessing: 'Pr\xF8v igen',
    labelButtonProcessItem: 'Upload',
    labelMaxFileSizeExceeded: 'Filen er for stor',
    labelMaxFileSize: 'Maksimal filst\xF8rrelse er {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maksimal totalst\xF8rrelse overskredet',
    labelMaxTotalFileSize: 'Maksimal total filst\xF8rrelse er {filesize}',
    labelFileTypeNotAllowed: 'Ugyldig filtype',
    fileValidateTypeLabelExpectedTypes:
        'Forventer {allButLastType} eller {lastType}',
    imageValidateSizeLabelFormatError: 'Ugyldigt format',
    imageValidateSizeLabelImageSizeTooSmall: 'Billedet er for lille',
    imageValidateSizeLabelImageSizeTooBig: 'Billedet er for stort',
    imageValidateSizeLabelExpectedMinSize:
        'Minimum st\xF8rrelse er {minBredde} \xD7 {minH\xF8jde}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maksimal st\xF8rrelse er {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'For lav opl\xF8sning',
    imageValidateSizeLabelImageResolutionTooHigh: 'For h\xF8j opl\xF8sning',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimum opl\xF8sning er {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maksimal opl\xF8sning er {maxResolution}',
}
var Ol = {
    labelIdle:
        'Dateien ablegen oder <span class="filepond--label-action"> ausw\xE4hlen </span>',
    labelInvalidField: 'Feld beinhaltet ung\xFCltige Dateien',
    labelFileWaitingForSize: 'Dateigr\xF6\xDFe berechnen',
    labelFileSizeNotAvailable: 'Dateigr\xF6\xDFe nicht verf\xFCgbar',
    labelFileLoading: 'Laden',
    labelFileLoadError: 'Fehler beim Laden',
    labelFileProcessing: 'Upload l\xE4uft',
    labelFileProcessingComplete: 'Upload abgeschlossen',
    labelFileProcessingAborted: 'Upload abgebrochen',
    labelFileProcessingError: 'Fehler beim Upload',
    labelFileProcessingRevertError: 'Fehler beim Wiederherstellen',
    labelFileRemoveError: 'Fehler beim L\xF6schen',
    labelTapToCancel: 'abbrechen',
    labelTapToRetry: 'erneut versuchen',
    labelTapToUndo: 'r\xFCckg\xE4ngig',
    labelButtonRemoveItem: 'Entfernen',
    labelButtonAbortItemLoad: 'Verwerfen',
    labelButtonRetryItemLoad: 'Erneut versuchen',
    labelButtonAbortItemProcessing: 'Abbrechen',
    labelButtonUndoItemProcessing: 'R\xFCckg\xE4ngig',
    labelButtonRetryItemProcessing: 'Erneut versuchen',
    labelButtonProcessItem: 'Upload',
    labelMaxFileSizeExceeded: 'Datei ist zu gro\xDF',
    labelMaxFileSize: 'Maximale Dateigr\xF6\xDFe: {filesize}',
    labelMaxTotalFileSizeExceeded:
        'Maximale gesamte Dateigr\xF6\xDFe \xFCberschritten',
    labelMaxTotalFileSize: 'Maximale gesamte Dateigr\xF6\xDFe: {filesize}',
    labelFileTypeNotAllowed: 'Dateityp ung\xFCltig',
    fileValidateTypeLabelExpectedTypes:
        'Erwartet {allButLastType} oder {lastType}',
    imageValidateSizeLabelFormatError: 'Bildtyp nicht unterst\xFCtzt',
    imageValidateSizeLabelImageSizeTooSmall: 'Bild ist zu klein',
    imageValidateSizeLabelImageSizeTooBig: 'Bild ist zu gro\xDF',
    imageValidateSizeLabelExpectedMinSize:
        'Mindestgr\xF6\xDFe: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximale Gr\xF6\xDFe: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Aufl\xF6sung ist zu niedrig',
    imageValidateSizeLabelImageResolutionTooHigh: 'Aufl\xF6sung ist zu hoch',
    imageValidateSizeLabelExpectedMinResolution:
        'Mindestaufl\xF6sung: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maximale Aufl\xF6sung: {maxResolution}',
}
var Pl = {
    labelIdle:
        'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
    labelInvalidField: 'Field contains invalid files',
    labelFileWaitingForSize: 'Waiting for size',
    labelFileSizeNotAvailable: 'Size not available',
    labelFileLoading: 'Loading',
    labelFileLoadError: 'Error during load',
    labelFileProcessing: 'Uploading',
    labelFileProcessingComplete: 'Upload complete',
    labelFileProcessingAborted: 'Upload cancelled',
    labelFileProcessingError: 'Error during upload',
    labelFileProcessingRevertError: 'Error during revert',
    labelFileRemoveError: 'Error during remove',
    labelTapToCancel: 'tap to cancel',
    labelTapToRetry: 'tap to retry',
    labelTapToUndo: 'tap to undo',
    labelButtonRemoveItem: 'Remove',
    labelButtonAbortItemLoad: 'Abort',
    labelButtonRetryItemLoad: 'Retry',
    labelButtonAbortItemProcessing: 'Cancel',
    labelButtonUndoItemProcessing: 'Undo',
    labelButtonRetryItemProcessing: 'Retry',
    labelButtonProcessItem: 'Upload',
    labelMaxFileSizeExceeded: 'File is too large',
    labelMaxFileSize: 'Maximum file size is {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maximum total size exceeded',
    labelMaxTotalFileSize: 'Maximum total file size is {filesize}',
    labelFileTypeNotAllowed: 'File of invalid type',
    fileValidateTypeLabelExpectedTypes:
        'Expects {allButLastType} or {lastType}',
    imageValidateSizeLabelFormatError: 'Image type not supported',
    imageValidateSizeLabelImageSizeTooSmall: 'Image is too small',
    imageValidateSizeLabelImageSizeTooBig: 'Image is too big',
    imageValidateSizeLabelExpectedMinSize:
        'Minimum size is {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximum size is {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Resolution is too low',
    imageValidateSizeLabelImageResolutionTooHigh: 'Resolution is too high',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimum resolution is {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maximum resolution is {maxResolution}',
}
var Dl = {
    labelIdle:
        'Arrastra y suelta tus archivos o <span class = "filepond--label-action"> Examina <span>',
    labelInvalidField: 'El campo contiene archivos inv\xE1lidos',
    labelFileWaitingForSize: 'Esperando tama\xF1o',
    labelFileSizeNotAvailable: 'Tama\xF1o no disponible',
    labelFileLoading: 'Cargando',
    labelFileLoadError: 'Error durante la carga',
    labelFileProcessing: 'Subiendo',
    labelFileProcessingComplete: 'Subida completa',
    labelFileProcessingAborted: 'Subida cancelada',
    labelFileProcessingError: 'Error durante la subida',
    labelFileProcessingRevertError: 'Error durante la reversi\xF3n',
    labelFileRemoveError: 'Error durante la eliminaci\xF3n',
    labelTapToCancel: 'toca para cancelar',
    labelTapToRetry: 'tocar para reintentar',
    labelTapToUndo: 'tocar para deshacer',
    labelButtonRemoveItem: 'Eliminar',
    labelButtonAbortItemLoad: 'Cancelar',
    labelButtonRetryItemLoad: 'Reintentar',
    labelButtonAbortItemProcessing: 'Cancelar',
    labelButtonUndoItemProcessing: 'Deshacer',
    labelButtonRetryItemProcessing: 'Reintentar',
    labelButtonProcessItem: 'Subir',
    labelMaxFileSizeExceeded: 'El archivo es demasiado grande',
    labelMaxFileSize: 'El tama\xF1o m\xE1ximo del archivo es {filesize}',
    labelMaxTotalFileSizeExceeded: 'Tama\xF1o total m\xE1ximo excedido',
    labelMaxTotalFileSize:
        'El tama\xF1o total m\xE1ximo del archivo es {filesize}',
    labelFileTypeNotAllowed: 'Archivo de tipo inv\xE1lido',
    fileValidateTypeLabelExpectedTypes: 'Espera {allButLastType} o {lastType}',
    imageValidateSizeLabelFormatError: 'Tipo de imagen no soportada',
    imageValidateSizeLabelImageSizeTooSmall:
        'La imagen es demasiado peque\xF1a',
    imageValidateSizeLabelImageSizeTooBig: 'La imagen es demasiado grande',
    imageValidateSizeLabelExpectedMinSize:
        'El tama\xF1o m\xEDnimo es {minWidth} x {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'El tama\xF1o m\xE1ximo es {maxWidth} x {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'La resoluci\xF3n es demasiado baja',
    imageValidateSizeLabelImageResolutionTooHigh:
        'La resoluci\xF3n es demasiado alta',
    imageValidateSizeLabelExpectedMinResolution:
        'La resoluci\xF3n m\xEDnima es {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'La resoluci\xF3n m\xE1xima es {maxResolution}',
}
var Fl = {
    labelIdle:
        '\u0641\u0627\u06CC\u0644 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06A9\u0634\u06CC\u062F \u0648 \u0631\u0647\u0627 \u06A9\u0646\u06CC\u062F\u060C \u06CC\u0627 <span class="filepond--label-action"> \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F </span>',
    labelInvalidField:
        '\u0641\u06CC\u0644\u062F \u062F\u0627\u0631\u0627\u06CC \u0641\u0627\u06CC\u0644 \u0647\u0627\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A',
    labelFileWaitingForSize: 'Waiting for size',
    labelFileSizeNotAvailable:
        '\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0645\u062C\u0627\u0632 \u0646\u06CC\u0633\u062A',
    labelFileLoading:
        '\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC',
    labelFileLoadError:
        '\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0627\u062C\u0631\u0627',
    labelFileProcessing:
        '\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC',
    labelFileProcessingComplete:
        '\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0627\u0645\u0644 \u0634\u062F',
    labelFileProcessingAborted:
        '\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0644\u063A\u0648 \u0634\u062F',
    labelFileProcessingError:
        '\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC',
    labelFileProcessingRevertError:
        '\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641',
    labelFileRemoveError:
        '\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641',
    labelTapToCancel:
        '\u0628\u0631\u0627\u06CC \u0644\u063A\u0648 \u0636\u0631\u0628\u0647 \u0628\u0632\u0646\u06CC\u062F',
    labelTapToRetry:
        '\u0628\u0631\u0627\u06CC \u062A\u06A9\u0631\u0627\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F',
    labelTapToUndo:
        '\u0628\u0631\u0627\u06CC \u0628\u0631\u06AF\u0634\u062A \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F',
    labelButtonRemoveItem: '\u062D\u0630\u0641',
    labelButtonAbortItemLoad: '\u0644\u063A\u0648',
    labelButtonRetryItemLoad: '\u062A\u06A9\u0631\u0627\u0631',
    labelButtonAbortItemProcessing: '\u0644\u063A\u0648',
    labelButtonUndoItemProcessing: '\u0628\u0631\u06AF\u0634\u062A',
    labelButtonRetryItemProcessing: '\u062A\u06A9\u0631\u0627\u0631',
    labelButtonProcessItem: '\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC',
    labelMaxFileSizeExceeded:
        '\u0641\u0627\u06CC\u0644 \u0628\u0633\u06CC\u0627\u0631 \u062D\u062C\u06CC\u0645 \u0627\u0633\u062A',
    labelMaxFileSize:
        '\u062D\u062F\u0627\u06A9\u062B\u0631 \u0645\u062C\u0627\u0632 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A',
    labelMaxTotalFileSizeExceeded:
        '\u0627\u0632 \u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0634\u062F',
    labelMaxTotalFileSize:
        '\u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A',
    labelFileTypeNotAllowed:
        '\u0646\u0648\u0639 \u0641\u0627\u06CC\u0644 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A',
    fileValidateTypeLabelExpectedTypes:
        '\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 {allButLastType} \u06CC\u0627 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u0641\u0631\u0645\u062A \u062A\u0635\u0648\u06CC\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC \u0634\u0648\u062F',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0648\u0686\u06A9 \u0627\u0633\u062A',
    imageValidateSizeLabelImageSizeTooBig:
        '\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0628\u0632\u0631\u06AF \u0627\u0633\u062A',
    imageValidateSizeLabelExpectedMinSize:
        '\u062D\u062F\u0627\u0642\u0644 \u0627\u0646\u062F\u0627\u0632\u0647 {minWidth} \xD7 {minHeight} \u0627\u0633\u062A',
    imageValidateSizeLabelExpectedMaxSize:
        '\u062D\u062F\u0627\u06A9\u062B\u0631 \u0627\u0646\u062F\u0627\u0632\u0647 {maxWidth} \xD7 {maxHeight} \u0627\u0633\u062A',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0645 \u0627\u0633\u062A',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0648\u0636\u0648\u0639 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0632\u06CC\u0627\u062F \u0627\u0633\u062A',
    imageValidateSizeLabelExpectedMinResolution:
        '\u062D\u062F\u0627\u0642\u0644 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {minResolution} \u0627\u0633\u062A',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u062D\u062F\u0627\u06A9\u062B\u0631 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {maxResolution} \u0627\u0633\u062A',
}
var zl = {
    labelIdle:
        'Ved\xE4 ja pudota tiedostoja tai <span class="filepond--label-action"> Selaa </span>',
    labelInvalidField: 'Kent\xE4ss\xE4 on virheellisi\xE4 tiedostoja',
    labelFileWaitingForSize: 'Odotetaan kokoa',
    labelFileSizeNotAvailable: 'Kokoa ei saatavilla',
    labelFileLoading: 'Ladataan',
    labelFileLoadError: 'Virhe latauksessa',
    labelFileProcessing: 'L\xE4hetet\xE4\xE4n',
    labelFileProcessingComplete: 'L\xE4hetys valmis',
    labelFileProcessingAborted: 'L\xE4hetys peruttu',
    labelFileProcessingError: 'Virhe l\xE4hetyksess\xE4',
    labelFileProcessingRevertError: 'Virhe palautuksessa',
    labelFileRemoveError: 'Virhe poistamisessa',
    labelTapToCancel: 'peruuta napauttamalla',
    labelTapToRetry: 'yrit\xE4 uudelleen napauttamalla',
    labelTapToUndo: 'kumoa napauttamalla',
    labelButtonRemoveItem: 'Poista',
    labelButtonAbortItemLoad: 'Keskeyt\xE4',
    labelButtonRetryItemLoad: 'Yrit\xE4 uudelleen',
    labelButtonAbortItemProcessing: 'Peruuta',
    labelButtonUndoItemProcessing: 'Kumoa',
    labelButtonRetryItemProcessing: 'Yrit\xE4 uudelleen',
    labelButtonProcessItem: 'L\xE4het\xE4',
    labelMaxFileSizeExceeded: 'Tiedoston koko on liian suuri',
    labelMaxFileSize: 'Tiedoston maksimikoko on {filesize}',
    labelMaxTotalFileSizeExceeded:
        'Tiedostojen yhdistetty maksimikoko ylitetty',
    labelMaxTotalFileSize: 'Tiedostojen yhdistetty maksimikoko on {filesize}',
    labelFileTypeNotAllowed: 'Tiedostotyyppi\xE4 ei sallita',
    fileValidateTypeLabelExpectedTypes:
        'Sallitaan {allButLastType} tai {lastType}',
    imageValidateSizeLabelFormatError: 'Kuvatyyppi\xE4 ei tueta',
    imageValidateSizeLabelImageSizeTooSmall: 'Kuva on liian pieni',
    imageValidateSizeLabelImageSizeTooBig: 'Kuva on liian suuri',
    imageValidateSizeLabelExpectedMinSize:
        'Minimikoko on {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maksimikoko on {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Resoluutio on liian pieni',
    imageValidateSizeLabelImageResolutionTooHigh: 'Resoluutio on liian suuri',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimiresoluutio on {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maksimiresoluutio on {maxResolution}',
}
var Cl = {
    labelIdle:
        'Faites glisser vos fichiers ou <span class = "filepond--label-action"> Parcourir </span>',
    labelInvalidField: 'Le champ contient des fichiers invalides',
    labelFileWaitingForSize: 'En attente de taille',
    labelFileSizeNotAvailable: 'Taille non disponible',
    labelFileLoading: 'Chargement',
    labelFileLoadError: 'Erreur durant le chargement',
    labelFileProcessing: 'Traitement',
    labelFileProcessingComplete: 'Traitement effectu\xE9',
    labelFileProcessingAborted: 'Traitement interrompu',
    labelFileProcessingError: 'Erreur durant le traitement',
    labelFileProcessingRevertError: 'Erreur durant la restauration',
    labelFileRemoveError: 'Erreur durant la suppression',
    labelTapToCancel: 'appuyer pour annuler',
    labelTapToRetry: 'appuyer pour r\xE9essayer',
    labelTapToUndo: 'appuyer pour revenir en arri\xE8re',
    labelButtonRemoveItem: 'Retirer',
    labelButtonAbortItemLoad: 'Annuler',
    labelButtonRetryItemLoad: 'Recommencer',
    labelButtonAbortItemProcessing: 'Annuler',
    labelButtonUndoItemProcessing: 'Revenir en arri\xE8re',
    labelButtonRetryItemProcessing: 'Recommencer',
    labelButtonProcessItem: 'Transf\xE9rer',
    labelMaxFileSizeExceeded: 'Le fichier est trop volumineux',
    labelMaxFileSize: 'La taille maximale de fichier est {filesize}',
    labelMaxTotalFileSizeExceeded: 'Taille totale maximale d\xE9pass\xE9e',
    labelMaxTotalFileSize:
        'La taille totale maximale des fichiers est {filesize}',
    labelFileTypeNotAllowed: 'Fichier non valide',
    fileValidateTypeLabelExpectedTypes:
        'Attendu {allButLastType} ou {lastType}',
    imageValidateSizeLabelFormatError: "Type d'image non pris en charge",
    imageValidateSizeLabelImageSizeTooSmall: "L'image est trop petite",
    imageValidateSizeLabelImageSizeTooBig: "L'image est trop grande",
    imageValidateSizeLabelExpectedMinSize:
        'La taille minimale est {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'La taille maximale est {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'La r\xE9solution est trop faible',
    imageValidateSizeLabelImageResolutionTooHigh:
        'La r\xE9solution est trop \xE9lev\xE9e',
    imageValidateSizeLabelExpectedMinResolution:
        'La r\xE9solution minimale est {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'La r\xE9solution maximale est {maxResolution}',
}
var Nl = {
    labelIdle:
        'Mozgasd ide a f\xE1jlt a felt\xF6lt\xE9shez, vagy <span class="filepond--label-action"> tall\xF3z\xE1s </span>',
    labelInvalidField: 'A mez\u0151 \xE9rv\xE9nytelen f\xE1jlokat tartalmaz',
    labelFileWaitingForSize: 'F\xE1ljm\xE9ret kisz\xE1mol\xE1sa',
    labelFileSizeNotAvailable: 'A f\xE1jlm\xE9ret nem el\xE9rhet\u0151',
    labelFileLoading: 'T\xF6lt\xE9s',
    labelFileLoadError: 'Hiba a bet\xF6lt\xE9s sor\xE1n',
    labelFileProcessing: 'Felt\xF6lt\xE9s',
    labelFileProcessingComplete: 'Sikeres felt\xF6lt\xE9s',
    labelFileProcessingAborted: 'A felt\xF6lt\xE9s megszak\xEDtva',
    labelFileProcessingError: 'Hiba t\xF6rt\xE9nt a felt\xF6lt\xE9s sor\xE1n',
    labelFileProcessingRevertError: 'Hiba a vissza\xE1ll\xEDt\xE1s sor\xE1n',
    labelFileRemoveError: 'Hiba t\xF6rt\xE9nt az elt\xE1vol\xEDt\xE1s sor\xE1n',
    labelTapToCancel: 'koppints a t\xF6rl\xE9shez',
    labelTapToRetry: 'koppints az \xFAjrakezd\xE9shez',
    labelTapToUndo: 'koppints a visszavon\xE1shoz',
    labelButtonRemoveItem: 'Elt\xE1vol\xEDt\xE1s',
    labelButtonAbortItemLoad: 'Megszak\xEDt\xE1s',
    labelButtonRetryItemLoad: '\xDAjrapr\xF3b\xE1lkoz\xE1s',
    labelButtonAbortItemProcessing: 'Megszak\xEDt\xE1s',
    labelButtonUndoItemProcessing: 'Visszavon\xE1s',
    labelButtonRetryItemProcessing: '\xDAjrapr\xF3b\xE1lkoz\xE1s',
    labelButtonProcessItem: 'Felt\xF6lt\xE9s',
    labelMaxFileSizeExceeded:
        'A f\xE1jl t\xFAll\xE9pte a maxim\xE1lis m\xE9retet',
    labelMaxFileSize: 'Maxim\xE1lis f\xE1jlm\xE9ret: {filesize}',
    labelMaxTotalFileSizeExceeded:
        'T\xFAll\xE9pte a maxim\xE1lis teljes m\xE9retet',
    labelMaxTotalFileSize: 'A maxim\xE1is teljes f\xE1jlm\xE9ret: {filesize}',
    labelFileTypeNotAllowed: '\xC9rv\xE9nytelen t\xEDpus\xFA f\xE1jl',
    fileValidateTypeLabelExpectedTypes:
        'Enged\xE9lyezett t\xEDpusok {allButLastType} vagy {lastType}',
    imageValidateSizeLabelFormatError: 'A k\xE9pt\xEDpus nem t\xE1mogatott',
    imageValidateSizeLabelImageSizeTooSmall: 'A k\xE9p t\xFAl kicsi',
    imageValidateSizeLabelImageSizeTooBig: 'A k\xE9p t\xFAl nagy',
    imageValidateSizeLabelExpectedMinSize:
        'Minimum m\xE9ret: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximum m\xE9ret: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'A felbont\xE1s t\xFAl alacsony',
    imageValidateSizeLabelImageResolutionTooHigh: 'A felbont\xE1s t\xFAl magas',
    imageValidateSizeLabelExpectedMinResolution:
        'Minim\xE1is felbont\xE1s: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maxim\xE1lis felbont\xE1s: {maxResolution}',
}
var Bl = {
    labelIdle:
        'Seret & Jatuhkan berkas Anda atau <span class="filepond--label-action">Jelajahi</span>',
    labelInvalidField: 'Isian berisi berkas yang tidak valid',
    labelFileWaitingForSize: 'Menunggu ukuran berkas',
    labelFileSizeNotAvailable: 'Ukuran berkas tidak tersedia',
    labelFileLoading: 'Memuat',
    labelFileLoadError: 'Kesalahan saat memuat',
    labelFileProcessing: 'Mengunggah',
    labelFileProcessingComplete: 'Pengunggahan selesai',
    labelFileProcessingAborted: 'Pengunggahan dibatalkan',
    labelFileProcessingError: 'Kesalahan saat pengunggahan',
    labelFileProcessingRevertError: 'Kesalahan saat pemulihan',
    labelFileRemoveError: 'Kesalahan saat penghapusan',
    labelTapToCancel: 'ketuk untuk membatalkan',
    labelTapToRetry: 'ketuk untuk mencoba lagi',
    labelTapToUndo: 'ketuk untuk mengurungkan',
    labelButtonRemoveItem: 'Hapus',
    labelButtonAbortItemLoad: 'Batalkan',
    labelButtonRetryItemLoad: 'Coba Kembali',
    labelButtonAbortItemProcessing: 'Batalkan',
    labelButtonUndoItemProcessing: 'Urungkan',
    labelButtonRetryItemProcessing: 'Coba Kembali',
    labelButtonProcessItem: 'Unggah',
    labelMaxFileSizeExceeded: 'Berkas terlalu besar',
    labelMaxFileSize: 'Ukuran berkas maksimum adalah {filesize}',
    labelMaxTotalFileSizeExceeded: 'Jumlah berkas maksimum terlampaui',
    labelMaxTotalFileSize: 'Jumlah berkas maksimum adalah {filesize}',
    labelFileTypeNotAllowed: 'Jenis berkas tidak valid',
    fileValidateTypeLabelExpectedTypes:
        'Mengharapkan {allButLastType} atau {lastType}',
    imageValidateSizeLabelFormatError: 'Jenis citra tidak didukung',
    imageValidateSizeLabelImageSizeTooSmall: 'Citra terlalu kecil',
    imageValidateSizeLabelImageSizeTooBig: 'Citra terlalu besar',
    imageValidateSizeLabelExpectedMinSize:
        'Ukuran minimum adalah {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Ukuran maksimum adalah {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Resolusi terlalu rendah',
    imageValidateSizeLabelImageResolutionTooHigh: 'Resolusi terlalu tinggi',
    imageValidateSizeLabelExpectedMinResolution:
        'Resolusi minimum adalah {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Resolusi maksimum adalah {maxResolution}',
}
var kl = {
    labelIdle:
        'Trascina e rilascia i tuoi file oppure <span class = "filepond--label-action"> Carica <span>',
    labelInvalidField: 'Il campo contiene dei file non validi',
    labelFileWaitingForSize: 'Aspettando le dimensioni',
    labelFileSizeNotAvailable: 'Dimensioni non disponibili',
    labelFileLoading: 'Caricamento',
    labelFileLoadError: 'Errore durante il caricamento',
    labelFileProcessing: 'Caricamento',
    labelFileProcessingComplete: 'Caricamento completato',
    labelFileProcessingAborted: 'Caricamento cancellato',
    labelFileProcessingError: 'Errore durante il caricamento',
    labelFileProcessingRevertError: 'Errore durante il ripristino',
    labelFileRemoveError: "Errore durante l'eliminazione",
    labelTapToCancel: 'tocca per cancellare',
    labelTapToRetry: 'tocca per riprovare',
    labelTapToUndo: 'tocca per ripristinare',
    labelButtonRemoveItem: 'Elimina',
    labelButtonAbortItemLoad: 'Cancella',
    labelButtonRetryItemLoad: 'Ritenta',
    labelButtonAbortItemProcessing: 'Camcella',
    labelButtonUndoItemProcessing: 'Indietro',
    labelButtonRetryItemProcessing: 'Ritenta',
    labelButtonProcessItem: 'Carica',
    labelMaxFileSizeExceeded: 'Il peso del file \xE8 eccessivo',
    labelMaxFileSize: 'Il peso massimo del file \xE8 {filesize}',
    labelMaxTotalFileSizeExceeded: 'Dimensione totale massima superata',
    labelMaxTotalFileSize:
        'La dimensione massima totale del file \xE8 {filesize}',
    labelFileTypeNotAllowed: 'File non supportato',
    fileValidateTypeLabelExpectedTypes: 'Aspetta {allButLastType} o {lastType}',
    imageValidateSizeLabelFormatError: 'Tipo di immagine non compatibile',
    imageValidateSizeLabelImageSizeTooSmall: "L'immagine \xE8 troppo piccola",
    imageValidateSizeLabelImageSizeTooBig: "L'immagine \xE8 troppo grande",
    imageValidateSizeLabelExpectedMinSize:
        'La dimensione minima \xE8 {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'La dimensione massima \xE8 {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'La risoluzione \xE8 troppo bassa',
    imageValidateSizeLabelImageResolutionTooHigh:
        'La risoluzione \xE8 troppo alta',
    imageValidateSizeLabelExpectedMinResolution:
        'La risoluzione minima \xE8 {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'La risoluzione massima \xE8 {maxResolution}',
}
var Vl = {
    labelIdle:
        '\u1791\u17B6\u1789&\u178A\u17B6\u1780\u17CB\u17A0\u17D2\u179C\u17B6\u179B\u17CB\u17AF\u1780\u179F\u17B6\u179A\u179A\u1794\u179F\u17CB\u17A2\u17D2\u1793\u1780 \u17AC <span class="filepond--label-action"> \u179F\u17D2\u179C\u17C2\u1784\u179A\u1780 </span>',
    labelInvalidField:
        '\u1785\u1793\u17D2\u179B\u17C4\u17C7\u1798\u17B6\u1793\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C',
    labelFileWaitingForSize:
        '\u1780\u17C6\u1796\u17BB\u1784\u179A\u1784\u17CB\u1785\u17B6\u17C6\u1791\u17C6\u17A0\u17C6',
    labelFileSizeNotAvailable:
        '\u1791\u17C6\u17A0\u17C6\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1794\u17D2\u179A\u17BE\u1794\u17B6\u1793',
    labelFileLoading:
        '\u1780\u17C6\u1796\u17BB\u1784\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A',
    labelFileLoadError:
        '\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A',
    labelFileProcessing:
        '\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784',
    labelFileProcessingComplete:
        '\u1780\u17B6\u179A\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784\u1796\u17C1\u1789\u179B\u17C1\u1789',
    labelFileProcessingAborted:
        '\u1780\u17B6\u179A\u1794\u1784\u17D2\u17A0\u17C4\u17C7\u178F\u17D2\u179A\u17BC\u179C\u1794\u17B6\u1793\u1794\u17C4\u17C7\u1794\u1784\u17CB',
    labelFileProcessingError:
        '\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784',
    labelFileProcessingRevertError:
        '\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178F\u17D2\u179A\u17A1\u1794\u17CB',
    labelFileRemoveError:
        '\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u1780\u1785\u17C1\u1789',
    labelTapToCancel:
        '\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1794\u17C4\u17C7\u1794\u1784\u17CB',
    labelTapToRetry:
        '\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F',
    labelTapToUndo:
        '\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789',
    labelButtonRemoveItem: '\u1799\u1780\u1785\u17C1\u1789',
    labelButtonAbortItemLoad: '\u1794\u17C4\u17C7\u1794\u1784\u17CB',
    labelButtonRetryItemLoad:
        '\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F',
    labelButtonAbortItemProcessing: '\u1794\u17C4\u17C7\u1794\u1784\u17CB',
    labelButtonUndoItemProcessing:
        '\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789',
    labelButtonRetryItemProcessing:
        '\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F',
    labelButtonProcessItem: '\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784',
    labelMaxFileSizeExceeded:
        '\u17AF\u1780\u179F\u17B6\u179A\u1792\u17C6\u1796\u17C1\u1780',
    labelMaxFileSize:
        '\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u179B\u17BE\u179F\u1791\u17C6\u17A0\u17C6\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6',
    labelMaxTotalFileSize:
        '\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}',
    labelFileTypeNotAllowed:
        '\u1794\u17D2\u179A\u1797\u17C1\u1791\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C',
    fileValidateTypeLabelExpectedTypes:
        '\u179A\u17C6\u1796\u17B9\u1784\u1790\u17B6 {allButLastType} \u17AC {lastType}',
    imageValidateSizeLabelFormatError:
        '\u1794\u17D2\u179A\u1797\u17C1\u1791\u179A\u17BC\u1794\u1797\u17B6\u1796\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u179A\u17BC\u1794\u1797\u17B6\u1796\u178F\u17BC\u1785\u1796\u17C1\u1780',
    imageValidateSizeLabelImageSizeTooBig:
        '\u179A\u17BC\u1794\u1797\u17B6\u1796\u1792\u17C6\u1796\u17C1\u1780',
    imageValidateSizeLabelExpectedMinSize:
        '\u1791\u17C6\u17A0\u17C6\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u1791\u17C6\u17A0\u17C6\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1791\u17B6\u1794\u1796\u17C1\u1780',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1781\u17D2\u1796\u179F\u17CB\u1796\u17C1\u1780',
    imageValidateSizeLabelExpectedMinResolution:
        '\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxResolution}',
}
var Gl = {
    labelIdle:
        'Drag & Drop je bestanden of <span class="filepond--label-action"> Bladeren </span>',
    labelInvalidField: 'Veld bevat ongeldige bestanden',
    labelFileWaitingForSize: 'Wachten op grootte',
    labelFileSizeNotAvailable: 'Grootte niet beschikbaar',
    labelFileLoading: 'Laden',
    labelFileLoadError: 'Fout tijdens laden',
    labelFileProcessing: 'Uploaden',
    labelFileProcessingComplete: 'Upload afgerond',
    labelFileProcessingAborted: 'Upload geannuleerd',
    labelFileProcessingError: 'Fout tijdens upload',
    labelFileProcessingRevertError: 'Fout bij herstellen',
    labelFileRemoveError: 'Fout bij verwijderen',
    labelTapToCancel: 'tik om te annuleren',
    labelTapToRetry: 'tik om opnieuw te proberen',
    labelTapToUndo: 'tik om ongedaan te maken',
    labelButtonRemoveItem: 'Verwijderen',
    labelButtonAbortItemLoad: 'Afbreken',
    labelButtonRetryItemLoad: 'Opnieuw proberen',
    labelButtonAbortItemProcessing: 'Annuleren',
    labelButtonUndoItemProcessing: 'Ongedaan maken',
    labelButtonRetryItemProcessing: 'Opnieuw proberen',
    labelButtonProcessItem: 'Upload',
    labelMaxFileSizeExceeded: 'Bestand is te groot',
    labelMaxFileSize: 'Maximale bestandsgrootte is {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maximale totale grootte overschreden',
    labelMaxTotalFileSize: 'Maximale totale bestandsgrootte is {filesize}',
    labelFileTypeNotAllowed: 'Ongeldig bestandstype',
    fileValidateTypeLabelExpectedTypes:
        'Verwacht {allButLastType} of {lastType}',
    imageValidateSizeLabelFormatError: 'Afbeeldingstype niet ondersteund',
    imageValidateSizeLabelImageSizeTooSmall: 'Afbeelding is te klein',
    imageValidateSizeLabelImageSizeTooBig: 'Afbeelding is te groot',
    imageValidateSizeLabelExpectedMinSize:
        'Minimale afmeting is {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximale afmeting is {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Resolutie is te laag',
    imageValidateSizeLabelImageResolutionTooHigh: 'Resolution is too high',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimale resolutie is {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maximale resolutie is {maxResolution}',
}
var Ul = {
    labelIdle:
        'Dra og slipp filene dine, eller <span class="filepond--label-action"> Bla gjennom... </span>',
    labelInvalidField: 'Feltet inneholder ugyldige filer',
    labelFileWaitingForSize: 'Venter p\xE5 st\xF8rrelse',
    labelFileSizeNotAvailable: 'St\xF8rrelse ikke tilgjengelig',
    labelFileLoading: 'Laster',
    labelFileLoadError: 'Feil under lasting',
    labelFileProcessing: 'Laster opp',
    labelFileProcessingComplete: 'Opplasting ferdig',
    labelFileProcessingAborted: 'Opplasting avbrutt',
    labelFileProcessingError: 'Feil under opplasting',
    labelFileProcessingRevertError: 'Feil under reversering',
    labelFileRemoveError: 'Feil under flytting',
    labelTapToCancel: 'klikk for \xE5 avbryte',
    labelTapToRetry: 'klikk for \xE5 pr\xF8ve p\xE5 nytt',
    labelTapToUndo: 'klikk for \xE5 angre',
    labelButtonRemoveItem: 'Fjern',
    labelButtonAbortItemLoad: 'Avbryt',
    labelButtonRetryItemLoad: 'Pr\xF8v p\xE5 nytt',
    labelButtonAbortItemProcessing: 'Avbryt',
    labelButtonUndoItemProcessing: 'Angre',
    labelButtonRetryItemProcessing: 'Pr\xF8v p\xE5 nytt',
    labelButtonProcessItem: 'Last opp',
    labelMaxFileSizeExceeded: 'Filen er for stor',
    labelMaxFileSize: 'Maksimal filst\xF8rrelse er {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maksimal total st\xF8rrelse oversteget',
    labelMaxTotalFileSize: 'Maksimal total st\xF8rrelse er {filesize}',
    labelFileTypeNotAllowed: 'Ugyldig filtype',
    fileValidateTypeLabelExpectedTypes:
        'Forventer {allButLastType} eller {lastType}',
    imageValidateSizeLabelFormatError: 'Bildeformat ikke st\xF8ttet',
    imageValidateSizeLabelImageSizeTooSmall: 'Bildet er for lite',
    imageValidateSizeLabelImageSizeTooBig: 'Bildet er for stort',
    imageValidateSizeLabelExpectedMinSize:
        'Minimumsst\xF8rrelse er {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maksimumsst\xF8rrelse er {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Oppl\xF8sningen er for lav',
    imageValidateSizeLabelImageResolutionTooHigh:
        'Oppl\xF8sningen er for h\xF8y',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimum oppl\xF8sning er {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maksimal oppl\xF8sning er {maxResolution}',
}
var Wl = {
    labelIdle:
        'Przeci\u0105gnij i upu\u015B\u0107 lub <span class="filepond--label-action">wybierz</span> pliki',
    labelInvalidField: 'Nieprawid\u0142owe pliki',
    labelFileWaitingForSize: 'Pobieranie rozmiaru',
    labelFileSizeNotAvailable: 'Nieznany rozmiar',
    labelFileLoading: 'Wczytywanie',
    labelFileLoadError: 'B\u0142\u0105d wczytywania',
    labelFileProcessing: 'Przesy\u0142anie',
    labelFileProcessingComplete: 'Przes\u0142ano',
    labelFileProcessingAborted: 'Przerwano',
    labelFileProcessingError: 'Przesy\u0142anie nie powiod\u0142o si\u0119',
    labelFileProcessingRevertError: 'Co\u015B posz\u0142o nie tak',
    labelFileRemoveError: 'Nieudane usuni\u0119cie',
    labelTapToCancel: 'Anuluj',
    labelTapToRetry: 'Pon\xF3w',
    labelTapToUndo: 'Cofnij',
    labelButtonRemoveItem: 'Usu\u0144',
    labelButtonAbortItemLoad: 'Przerwij',
    labelButtonRetryItemLoad: 'Pon\xF3w',
    labelButtonAbortItemProcessing: 'Anuluj',
    labelButtonUndoItemProcessing: 'Cofnij',
    labelButtonRetryItemProcessing: 'Pon\xF3w',
    labelButtonProcessItem: 'Prze\u015Blij',
    labelMaxFileSizeExceeded: 'Plik jest zbyt du\u017Cy',
    labelMaxFileSize: 'Dopuszczalna wielko\u015B\u0107 pliku to {filesize}',
    labelMaxTotalFileSizeExceeded:
        'Przekroczono \u0142\u0105czny rozmiar plik\xF3w',
    labelMaxTotalFileSize:
        '\u0141\u0105czny rozmiar plik\xF3w nie mo\u017Ce przekroczy\u0107 {filesize}',
    labelFileTypeNotAllowed: 'Niedozwolony rodzaj pliku',
    fileValidateTypeLabelExpectedTypes:
        'Oczekiwano {allButLastType} lub {lastType}',
    imageValidateSizeLabelFormatError: 'Nieobs\u0142ugiwany format obrazu',
    imageValidateSizeLabelImageSizeTooSmall: 'Obraz jest zbyt ma\u0142y',
    imageValidateSizeLabelImageSizeTooBig: 'Obraz jest zbyt du\u017Cy',
    imageValidateSizeLabelExpectedMinSize:
        'Minimalne wymiary obrazu to {minWidth}\xD7{minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maksymalna wymiary obrazu to {maxWidth}\xD7{maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'Rozdzielczo\u015B\u0107 jest zbyt niska',
    imageValidateSizeLabelImageResolutionTooHigh:
        'Rozdzielczo\u015B\u0107 jest zbyt wysoka',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimalna rozdzielczo\u015B\u0107 to {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maksymalna rozdzielczo\u015B\u0107 to {maxResolution}',
}
var Ri = {
    labelIdle:
        'Arraste e solte os arquivos ou <span class="filepond--label-action"> Clique aqui </span>',
    labelInvalidField: 'Arquivos inv\xE1lidos',
    labelFileWaitingForSize: 'Calculando o tamanho do arquivo',
    labelFileSizeNotAvailable: 'Tamanho do arquivo indispon\xEDvel',
    labelFileLoading: 'Carregando',
    labelFileLoadError: 'Erro durante o carregamento',
    labelFileProcessing: 'Enviando',
    labelFileProcessingComplete: 'Envio finalizado',
    labelFileProcessingAborted: 'Envio cancelado',
    labelFileProcessingError: 'Erro durante o envio',
    labelFileProcessingRevertError: 'Erro ao reverter o envio',
    labelFileRemoveError: 'Erro ao remover o arquivo',
    labelTapToCancel: 'clique para cancelar',
    labelTapToRetry: 'clique para reenviar',
    labelTapToUndo: 'clique para desfazer',
    labelButtonRemoveItem: 'Remover',
    labelButtonAbortItemLoad: 'Abortar',
    labelButtonRetryItemLoad: 'Reenviar',
    labelButtonAbortItemProcessing: 'Cancelar',
    labelButtonUndoItemProcessing: 'Desfazer',
    labelButtonRetryItemProcessing: 'Reenviar',
    labelButtonProcessItem: 'Enviar',
    labelMaxFileSizeExceeded: 'Arquivo \xE9 muito grande',
    labelMaxFileSize: 'O tamanho m\xE1ximo permitido: {filesize}',
    labelMaxTotalFileSizeExceeded: 'Tamanho total dos arquivos excedido',
    labelMaxTotalFileSize: 'Tamanho total permitido: {filesize}',
    labelFileTypeNotAllowed: 'Tipo de arquivo inv\xE1lido',
    fileValidateTypeLabelExpectedTypes:
        'Tipos de arquivo suportados s\xE3o {allButLastType} ou {lastType}',
    imageValidateSizeLabelFormatError: 'Tipo de imagem inv\xE1lida',
    imageValidateSizeLabelImageSizeTooSmall: 'Imagem muito pequena',
    imageValidateSizeLabelImageSizeTooBig: 'Imagem muito grande',
    imageValidateSizeLabelExpectedMinSize:
        'Tamanho m\xEDnimo permitida: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Tamanho m\xE1ximo permitido: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow: 'Resolu\xE7\xE3o muito baixa',
    imageValidateSizeLabelImageResolutionTooHigh: 'Resolu\xE7\xE3o muito alta',
    imageValidateSizeLabelExpectedMinResolution:
        'Resolu\xE7\xE3o m\xEDnima permitida: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Resolu\xE7\xE3o m\xE1xima permitida: {maxResolution}',
}
var Hl = {
    labelIdle:
        'Trage \u0219i plaseaz\u0103 fi\u0219iere sau <span class="filepond--label-action"> Caut\u0103-le </span>',
    labelInvalidField:
        'C\xE2mpul con\u021Bine fi\u0219iere care nu sunt valide',
    labelFileWaitingForSize: '\xCEn a\u0219teptarea dimensiunii',
    labelFileSizeNotAvailable: 'Dimensiunea nu este diponibil\u0103',
    labelFileLoading: 'Se \xEEncarc\u0103',
    labelFileLoadError: 'Eroare la \xEEnc\u0103rcare',
    labelFileProcessing: 'Se \xEEncarc\u0103',
    labelFileProcessingComplete: '\xCEnc\u0103rcare finalizat\u0103',
    labelFileProcessingAborted: '\xCEnc\u0103rcare anulat\u0103',
    labelFileProcessingError: 'Eroare la \xEEnc\u0103rcare',
    labelFileProcessingRevertError: 'Eroare la anulare',
    labelFileRemoveError: 'Eroare la \u015Ftergere',
    labelTapToCancel: 'apas\u0103 pentru a anula',
    labelTapToRetry: 'apas\u0103 pentru a re\xEEncerca',
    labelTapToUndo: 'apas\u0103 pentru a anula',
    labelButtonRemoveItem: '\u015Eterge',
    labelButtonAbortItemLoad: 'Anuleaz\u0103',
    labelButtonRetryItemLoad: 'Re\xEEncearc\u0103',
    labelButtonAbortItemProcessing: 'Anuleaz\u0103',
    labelButtonUndoItemProcessing: 'Anuleaz\u0103',
    labelButtonRetryItemProcessing: 'Re\xEEncearc\u0103',
    labelButtonProcessItem: '\xCEncarc\u0103',
    labelMaxFileSizeExceeded: 'Fi\u0219ierul este prea mare',
    labelMaxFileSize:
        'Dimensiunea maxim\u0103 a unui fi\u0219ier este de {filesize}',
    labelMaxTotalFileSizeExceeded:
        'Dimensiunea total\u0103 maxim\u0103 a fost dep\u0103\u0219it\u0103',
    labelMaxTotalFileSize:
        'Dimensiunea total\u0103 maxim\u0103 a fi\u0219ierelor este de {filesize}',
    labelFileTypeNotAllowed: 'Tipul fi\u0219ierului nu este valid',
    fileValidateTypeLabelExpectedTypes:
        'Se a\u0219teapt\u0103 {allButLastType} sau {lastType}',
    imageValidateSizeLabelFormatError: 'Formatul imaginii nu este acceptat',
    imageValidateSizeLabelImageSizeTooSmall: 'Imaginea este prea mic\u0103',
    imageValidateSizeLabelImageSizeTooBig: 'Imaginea este prea mare',
    imageValidateSizeLabelExpectedMinSize:
        'M\u0103rimea minim\u0103 este de {maxWidth} x {maxHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'M\u0103rimea maxim\u0103 este de {maxWidth} x {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'Rezolu\u021Bia este prea mic\u0103',
    imageValidateSizeLabelImageResolutionTooHigh:
        'Rezolu\u021Bia este prea mare',
    imageValidateSizeLabelExpectedMinResolution:
        'Rezolu\u021Bia minim\u0103 este de {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Rezolu\u021Bia maxim\u0103 este de {maxResolution}',
}
var jl = {
    labelIdle:
        '\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043B\u0438 <span class="filepond--label-action"> \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 </span>',
    labelInvalidField:
        '\u041F\u043E\u043B\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0444\u0430\u0439\u043B\u044B',
    labelFileWaitingForSize:
        '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440',
    labelFileSizeNotAvailable:
        '\u0420\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F',
    labelFileLoading: '\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435',
    labelFileLoadError:
        '\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438',
    labelFileProcessing: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430',
    labelFileProcessingComplete:
        '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430',
    labelFileProcessingAborted:
        '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430',
    labelFileProcessingError:
        '\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435',
    labelFileProcessingRevertError:
        '\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0435',
    labelFileRemoveError:
        '\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438',
    labelTapToCancel:
        '\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B',
    labelTapToRetry:
        '\u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u043E\u043F\u044B\u0442\u043A\u0443',
    labelTapToUndo:
        '\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F',
    labelButtonRemoveItem: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C',
    labelButtonAbortItemLoad:
        '\u041F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u043E',
    labelButtonRetryItemLoad:
        '\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443',
    labelButtonAbortItemProcessing: '\u041E\u0442\u043C\u0435\u043D\u0430',
    labelButtonUndoItemProcessing:
        '\u041E\u0442\u043C\u0435\u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F',
    labelButtonRetryItemProcessing:
        '\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443',
    labelButtonProcessItem: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430',
    labelMaxFileSizeExceeded:
        '\u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439',
    labelMaxFileSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440',
    labelMaxTotalFileSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}',
    labelFileTypeNotAllowed:
        '\u0424\u0430\u0439\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0430',
    fileValidateTypeLabelExpectedTypes:
        '\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F {allButLastType} \u0438\u043B\u0438 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u0422\u0438\u043F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435',
    imageValidateSizeLabelImageSizeTooBig:
        '\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435',
    imageValidateSizeLabelExpectedMinSize:
        '\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043D\u0438\u0437\u043A\u043E\u0435',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u044B\u0441\u043E\u043A\u043E\u0435',
    imageValidateSizeLabelExpectedMinResolution:
        '\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {maxResolution}',
}
var Yl = {
    labelIdle:
        'Drag och sl\xE4pp dina filer eller <span class="filepond--label-action"> Bl\xE4ddra </span>',
    labelInvalidField: 'F\xE4ltet inneh\xE5ller felaktiga filer',
    labelFileWaitingForSize: 'V\xE4ntar p\xE5 storlek',
    labelFileSizeNotAvailable: 'Storleken finns inte tillg\xE4nglig',
    labelFileLoading: 'Laddar',
    labelFileLoadError: 'Fel under laddning',
    labelFileProcessing: 'Laddar upp',
    labelFileProcessingComplete: 'Uppladdning klar',
    labelFileProcessingAborted: 'Uppladdning avbruten',
    labelFileProcessingError: 'Fel under uppladdning',
    labelFileProcessingRevertError: 'Fel under \xE5terst\xE4llning',
    labelFileRemoveError: 'Fel under borttagning',
    labelTapToCancel: 'tryck f\xF6r att avbryta',
    labelTapToRetry: 'tryck f\xF6r att f\xF6rs\xF6ka igen',
    labelTapToUndo: 'tryck f\xF6r att \xE5ngra',
    labelButtonRemoveItem: 'Tabort',
    labelButtonAbortItemLoad: 'Avbryt',
    labelButtonRetryItemLoad: 'F\xF6rs\xF6k igen',
    labelButtonAbortItemProcessing: 'Avbryt',
    labelButtonUndoItemProcessing: '\xC5ngra',
    labelButtonRetryItemProcessing: 'F\xF6rs\xF6k igen',
    labelButtonProcessItem: 'Ladda upp',
    labelMaxFileSizeExceeded: 'Filen \xE4r f\xF6r stor',
    labelMaxFileSize: 'St\xF6rsta till\xE5tna filstorlek \xE4r {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maximal uppladdningsstorlek uppn\xE5d',
    labelMaxTotalFileSize: 'Maximal uppladdningsstorlek \xE4r {filesize}',
    labelFileTypeNotAllowed: 'Felaktig filtyp',
    fileValidateTypeLabelExpectedTypes:
        'Godk\xE4nda filtyper {allButLastType} eller {lastType}',
    imageValidateSizeLabelFormatError: 'Bildtypen saknar st\xF6d',
    imageValidateSizeLabelImageSizeTooSmall: 'Bilden \xE4r f\xF6r liten',
    imageValidateSizeLabelImageSizeTooBig: 'Bilden \xE4r f\xF6r stor',
    imageValidateSizeLabelExpectedMinSize:
        'Minimal storlek \xE4r {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximal storlek \xE4r {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        'Uppl\xF6sningen \xE4r f\xF6r l\xE5g',
    imageValidateSizeLabelImageResolutionTooHigh:
        'Uppl\xF6sningen \xE4r f\xF6r h\xF6g',
    imageValidateSizeLabelExpectedMinResolution:
        'Minsta till\xE5tna uppl\xF6sning \xE4r {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'H\xF6gsta till\xE5tna uppl\xF6sning \xE4r {maxResolution}',
}
var ql = {
    labelIdle:
        'Dosyan\u0131z\u0131 S\xFCr\xFCkleyin & B\u0131rak\u0131n ya da <span class="filepond--label-action"> Se\xE7in </span>',
    labelInvalidField: 'Alan ge\xE7ersiz dosyalar i\xE7eriyor',
    labelFileWaitingForSize: 'Boyut hesaplan\u0131yor',
    labelFileSizeNotAvailable: 'Boyut mevcut de\u011Fil',
    labelFileLoading: 'Y\xFCkleniyor',
    labelFileLoadError: 'Y\xFCkleme s\u0131ras\u0131nda hata olu\u015Ftu',
    labelFileProcessing: 'Y\xFCkleniyor',
    labelFileProcessingComplete: 'Y\xFCkleme tamamland\u0131',
    labelFileProcessingAborted: 'Y\xFCkleme iptal edildi',
    labelFileProcessingError: 'Y\xFCklerken hata olu\u015Ftu',
    labelFileProcessingRevertError: 'Geri \xE7ekerken hata olu\u015Ftu',
    labelFileRemoveError: 'Kald\u0131r\u0131rken hata olu\u015Ftu',
    labelTapToCancel: '\u0130ptal etmek i\xE7in t\u0131klay\u0131n',
    labelTapToRetry: 'Tekrar denemek i\xE7in t\u0131klay\u0131n',
    labelTapToUndo: 'Geri almak i\xE7in t\u0131klay\u0131n',
    labelButtonRemoveItem: 'Kald\u0131r',
    labelButtonAbortItemLoad: '\u0130ptal Et',
    labelButtonRetryItemLoad: 'Tekrar dene',
    labelButtonAbortItemProcessing: '\u0130ptal et',
    labelButtonUndoItemProcessing: 'Geri Al',
    labelButtonRetryItemProcessing: 'Tekrar dene',
    labelButtonProcessItem: 'Y\xFCkle',
    labelMaxFileSizeExceeded: 'Dosya \xE7ok b\xFCy\xFCk',
    labelMaxFileSize: 'En fazla dosya boyutu: {filesize}',
    labelMaxTotalFileSizeExceeded: 'Maximum boyut a\u015F\u0131ld\u0131',
    labelMaxTotalFileSize: 'Maximum dosya boyutu :{filesize}',
    labelFileTypeNotAllowed: 'Ge\xE7ersiz dosya tipi',
    fileValidateTypeLabelExpectedTypes:
        '\u015Eu {allButLastType} ya da \u015Fu dosya olmas\u0131 gerekir: {lastType}',
    imageValidateSizeLabelFormatError: 'Resim tipi desteklenmiyor',
    imageValidateSizeLabelImageSizeTooSmall: 'Resim \xE7ok k\xFC\xE7\xFCk',
    imageValidateSizeLabelImageSizeTooBig: 'Resim \xE7ok b\xFCy\xFCk',
    imageValidateSizeLabelExpectedMinSize:
        'Minimum boyut {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'Maximum boyut {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok d\xFC\u015F\xFCk',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok y\xFCksek',
    imageValidateSizeLabelExpectedMinResolution:
        'Minimum \xE7\xF6z\xFCn\xFCrl\xFCk {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        'Maximum \xE7\xF6z\xFCn\xFCrl\xFCk {maxResolution}',
}
var $l = {
    labelIdle:
        '\u041F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u0444\u0430\u0439\u043B\u0438 \u0430\u0431\u043E <span class="filepond--label-action"> \u0432\u0438\u0431\u0435\u0440\u0456\u0442\u044C </span>',
    labelInvalidField:
        '\u041F\u043E\u043B\u0435 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0456 \u0444\u0430\u0439\u043B\u0438',
    labelFileWaitingForSize:
        '\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0440\u043E\u0437\u043C\u0456\u0440',
    labelFileSizeNotAvailable:
        '\u0420\u043E\u0437\u043C\u0456\u0440 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439',
    labelFileLoading:
        '\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F',
    labelFileLoadError:
        '\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456',
    labelFileProcessing:
        '\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F',
    labelFileProcessingComplete:
        '\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E',
    labelFileProcessingAborted:
        '\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E',
    labelFileProcessingError:
        '\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456',
    labelFileProcessingRevertError:
        '\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0456',
    labelFileRemoveError:
        '\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u0456',
    labelTapToCancel: '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438',
    labelTapToRetry:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443',
    labelTapToUndo:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0432\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E',
    labelButtonRemoveItem: '\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438',
    labelButtonAbortItemLoad:
        '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438',
    labelButtonRetryItemLoad:
        '\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443',
    labelButtonAbortItemProcessing:
        '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438',
    labelButtonUndoItemProcessing:
        '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E',
    labelButtonRetryItemProcessing:
        '\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443',
    labelButtonProcessItem:
        '\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F',
    labelMaxFileSizeExceeded:
        '\u0424\u0430\u0439\u043B \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0439',
    labelMaxFileSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440 \u0444\u0430\u0439\u043B\u0443: {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u041F\u0435\u0440\u0435\u0432\u0438\u0449\u0435\u043D\u043E \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440',
    labelMaxTotalFileSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {filesize}',
    labelFileTypeNotAllowed:
        '\u0424\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0443 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F',
    fileValidateTypeLabelExpectedTypes:
        '\u041E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F {allButLastType} \u0430\u0431\u043E {lastType}',
    imageValidateSizeLabelFormatError:
        '\u0424\u043E\u0440\u043C\u0430\u0442 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F',
    imageValidateSizeLabelImageSizeTooSmall:
        '\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0435',
    imageValidateSizeLabelImageSizeTooBig:
        '\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435',
    imageValidateSizeLabelExpectedMinSize:
        '\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0456',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0456',
    imageValidateSizeLabelExpectedMinResolution:
        '\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {maxResolution}',
}
var Xl = {
    labelIdle:
        'K\xE9o th\u1EA3 t\u1EC7p c\u1EE7a b\u1EA1n ho\u1EB7c <span class="filepond--label-action"> T\xECm ki\u1EBFm </span>',
    labelInvalidField:
        'Tr\u01B0\u1EDDng ch\u1EE9a c\xE1c t\u1EC7p kh\xF4ng h\u1EE3p l\u1EC7',
    labelFileWaitingForSize: '\u0110ang ch\u1EDD k\xEDch th\u01B0\u1EDBc',
    labelFileSizeNotAvailable:
        'K\xEDch th\u01B0\u1EDBc kh\xF4ng c\xF3 s\u1EB5n',
    labelFileLoading: '\u0110ang t\u1EA3i',
    labelFileLoadError: 'L\u1ED7i khi t\u1EA3i',
    labelFileProcessing: '\u0110ang t\u1EA3i l\xEAn',
    labelFileProcessingComplete: 'T\u1EA3i l\xEAn th\xE0nh c\xF4ng',
    labelFileProcessingAborted: '\u0110\xE3 hu\u1EF7 t\u1EA3i l\xEAn',
    labelFileProcessingError: 'L\u1ED7i khi t\u1EA3i l\xEAn',
    labelFileProcessingRevertError: 'L\u1ED7i khi ho\xE0n nguy\xEAn',
    labelFileRemoveError: 'L\u1ED7i khi x\xF3a',
    labelTapToCancel: 'nh\u1EA5n \u0111\u1EC3 h\u1EE7y',
    labelTapToRetry: 'nh\u1EA5n \u0111\u1EC3 th\u1EED l\u1EA1i',
    labelTapToUndo: 'nh\u1EA5n \u0111\u1EC3 ho\xE0n t\xE1c',
    labelButtonRemoveItem: 'Xo\xE1',
    labelButtonAbortItemLoad: 'Hu\u1EF7 b\u1ECF',
    labelButtonRetryItemLoad: 'Th\u1EED l\u1EA1i',
    labelButtonAbortItemProcessing: 'H\u1EE7y b\u1ECF',
    labelButtonUndoItemProcessing: 'Ho\xE0n t\xE1c',
    labelButtonRetryItemProcessing: 'Th\u1EED l\u1EA1i',
    labelButtonProcessItem: 'T\u1EA3i l\xEAn',
    labelMaxFileSizeExceeded: 'T\u1EADp tin qu\xE1 l\u1EDBn',
    labelMaxFileSize:
        'K\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u0110\xE3 v\u01B0\u1EE3t qu\xE1 t\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a',
    labelMaxTotalFileSize:
        'T\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}',
    labelFileTypeNotAllowed:
        'T\u1EC7p thu\u1ED9c lo\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7',
    fileValidateTypeLabelExpectedTypes:
        'Ki\u1EC3u t\u1EC7p h\u1EE3p l\u1EC7 l\xE0 {allButLastType} ho\u1EB7c {lastType}',
    imageValidateSizeLabelFormatError:
        'Lo\u1EA1i h\xECnh \u1EA3nh kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3',
    imageValidateSizeLabelImageSizeTooSmall: 'H\xECnh \u1EA3nh qu\xE1 nh\u1ECF',
    imageValidateSizeLabelImageSizeTooBig: 'H\xECnh \u1EA3nh qu\xE1 l\u1EDBn',
    imageValidateSizeLabelExpectedMinSize:
        'K\xEDch th\u01B0\u1EDBc t\u1ED1i thi\u1EC3u l\xE0 {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        'K\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a l\xE0 {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 th\u1EA5p',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 cao',
    imageValidateSizeLabelExpectedMinResolution:
        '\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i thi\u1EC3u l\xE0 {minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i \u0111a l\xE0 {maxResolution}',
}
var Ql = {
    labelIdle:
        '\u62D6\u653E\u6587\u4EF6\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u6D4F\u89C8 </span>',
    labelInvalidField: '\u5B57\u6BB5\u5305\u542B\u65E0\u6548\u6587\u4EF6',
    labelFileWaitingForSize: '\u8BA1\u7B97\u6587\u4EF6\u5927\u5C0F',
    labelFileSizeNotAvailable: '\u6587\u4EF6\u5927\u5C0F\u4E0D\u53EF\u7528',
    labelFileLoading: '\u52A0\u8F7D',
    labelFileLoadError: '\u52A0\u8F7D\u9519\u8BEF',
    labelFileProcessing: '\u4E0A\u4F20',
    labelFileProcessingComplete: '\u5DF2\u4E0A\u4F20',
    labelFileProcessingAborted: '\u4E0A\u4F20\u5DF2\u53D6\u6D88',
    labelFileProcessingError: '\u4E0A\u4F20\u51FA\u9519',
    labelFileProcessingRevertError: '\u8FD8\u539F\u51FA\u9519',
    labelFileRemoveError: '\u5220\u9664\u51FA\u9519',
    labelTapToCancel: '\u70B9\u51FB\u53D6\u6D88',
    labelTapToRetry: '\u70B9\u51FB\u91CD\u8BD5',
    labelTapToUndo: '\u70B9\u51FB\u64A4\u6D88',
    labelButtonRemoveItem: '\u5220\u9664',
    labelButtonAbortItemLoad: '\u4E2D\u6B62',
    labelButtonRetryItemLoad: '\u91CD\u8BD5',
    labelButtonAbortItemProcessing: '\u53D6\u6D88',
    labelButtonUndoItemProcessing: '\u64A4\u6D88',
    labelButtonRetryItemProcessing: '\u91CD\u8BD5',
    labelButtonProcessItem: '\u4E0A\u4F20',
    labelMaxFileSizeExceeded: '\u6587\u4EF6\u592A\u5927',
    labelMaxFileSize: '\u6700\u5927\u503C: {filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u8D85\u8FC7\u6700\u5927\u6587\u4EF6\u5927\u5C0F',
    labelMaxTotalFileSize:
        '\u6700\u5927\u6587\u4EF6\u5927\u5C0F\uFF1A{filesize}',
    labelFileTypeNotAllowed: '\u6587\u4EF6\u7C7B\u578B\u65E0\u6548',
    fileValidateTypeLabelExpectedTypes:
        '\u5E94\u4E3A {allButLastType} \u6216 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u4E0D\u652F\u6301\u56FE\u50CF\u7C7B\u578B',
    imageValidateSizeLabelImageSizeTooSmall: '\u56FE\u50CF\u592A\u5C0F',
    imageValidateSizeLabelImageSizeTooBig: '\u56FE\u50CF\u592A\u5927',
    imageValidateSizeLabelExpectedMinSize:
        '\u6700\u5C0F\u503C: {minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u6700\u5927\u503C: {maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u5206\u8FA8\u7387\u592A\u4F4E',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u5206\u8FA8\u7387\u592A\u9AD8',
    imageValidateSizeLabelExpectedMinResolution:
        '\u6700\u5C0F\u5206\u8FA8\u7387\uFF1A{minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u6700\u5927\u5206\u8FA8\u7387\uFF1A{maxResolution}',
}
var Zl = {
    labelIdle:
        '\u62D6\u653E\u6A94\u6848\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u700F\u89BD </span>',
    labelInvalidField: '\u4E0D\u652F\u63F4\u6B64\u6A94\u6848',
    labelFileWaitingForSize: '\u6B63\u5728\u8A08\u7B97\u6A94\u6848\u5927\u5C0F',
    labelFileSizeNotAvailable: '\u6A94\u6848\u5927\u5C0F\u4E0D\u7B26',
    labelFileLoading: '\u8B80\u53D6\u4E2D',
    labelFileLoadError: '\u8B80\u53D6\u932F\u8AA4',
    labelFileProcessing: '\u4E0A\u50B3',
    labelFileProcessingComplete: '\u5DF2\u4E0A\u50B3',
    labelFileProcessingAborted: '\u4E0A\u50B3\u5DF2\u53D6\u6D88',
    labelFileProcessingError: '\u4E0A\u50B3\u767C\u751F\u932F\u8AA4',
    labelFileProcessingRevertError: '\u9084\u539F\u932F\u8AA4',
    labelFileRemoveError: '\u522A\u9664\u932F\u8AA4',
    labelTapToCancel: '\u9EDE\u64CA\u53D6\u6D88',
    labelTapToRetry: '\u9EDE\u64CA\u91CD\u8A66',
    labelTapToUndo: '\u9EDE\u64CA\u9084\u539F',
    labelButtonRemoveItem: '\u522A\u9664',
    labelButtonAbortItemLoad: '\u505C\u6B62',
    labelButtonRetryItemLoad: '\u91CD\u8A66',
    labelButtonAbortItemProcessing: '\u53D6\u6D88',
    labelButtonUndoItemProcessing: '\u53D6\u6D88',
    labelButtonRetryItemProcessing: '\u91CD\u8A66',
    labelButtonProcessItem: '\u4E0A\u50B3',
    labelMaxFileSizeExceeded: '\u6A94\u6848\u904E\u5927',
    labelMaxFileSize: '\u6700\u5927\u503C\uFF1A{filesize}',
    labelMaxTotalFileSizeExceeded:
        '\u8D85\u904E\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F',
    labelMaxTotalFileSize:
        '\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F\uFF1A{filesize}',
    labelFileTypeNotAllowed: '\u4E0D\u652F\u63F4\u6B64\u985E\u578B\u6A94\u6848',
    fileValidateTypeLabelExpectedTypes:
        '\u61C9\u70BA {allButLastType} \u6216 {lastType}',
    imageValidateSizeLabelFormatError:
        '\u4E0D\u652F\u6301\u6B64\u985E\u5716\u7247\u985E\u578B',
    imageValidateSizeLabelImageSizeTooSmall: '\u5716\u7247\u904E\u5C0F',
    imageValidateSizeLabelImageSizeTooBig: '\u5716\u7247\u904E\u5927',
    imageValidateSizeLabelExpectedMinSize:
        '\u6700\u5C0F\u5C3A\u5BF8\uFF1A{minWidth} \xD7 {minHeight}',
    imageValidateSizeLabelExpectedMaxSize:
        '\u6700\u5927\u5C3A\u5BF8\uFF1A{maxWidth} \xD7 {maxHeight}',
    imageValidateSizeLabelImageResolutionTooLow:
        '\u89E3\u6790\u5EA6\u904E\u4F4E',
    imageValidateSizeLabelImageResolutionTooHigh:
        '\u89E3\u6790\u5EA6\u904E\u9AD8',
    imageValidateSizeLabelExpectedMinResolution:
        '\u6700\u4F4E\u89E3\u6790\u5EA6\uFF1A{minResolution}',
    imageValidateSizeLabelExpectedMaxResolution:
        '\u6700\u9AD8\u89E3\u6790\u5EA6\uFF1A{maxResolution}',
}
Ie(Wo)
Ie(jo)
Ie($o)
Ie(Qo)
Ie(el)
Ie(pl)
Ie(ul)
Ie(Rl)
Ie(Ma)
window.FilePond = na
function uf({
    acceptedFileTypes: e,
    imageEditorEmptyFillColor: t,
    imageEditorMode: i,
    imageEditorViewportHeight: a,
    imageEditorViewportWidth: n,
    deleteUploadedFileUsing: o,
    isDeletable: l,
    isDisabled: r,
    getUploadedFilesUsing: s,
    imageCropAspectRatio: p,
    imagePreviewHeight: c,
    imageResizeMode: d,
    imageResizeTargetHeight: m,
    imageResizeTargetWidth: u,
    imageResizeUpscale: f,
    isAvatar: h,
    hasImageEditor: g,
    hasCircleCropper: v,
    canEditSvgs: E,
    isSvgEditingConfirmed: T,
    confirmSvgEditingMessage: I,
    disabledSvgEditingMessage: y,
    isDownloadable: b,
    isMultiple: w,
    isOpenable: x,
    isPreviewable: _,
    isReorderable: P,
    itemPanelAspectRatio: O,
    loadingIndicatorPosition: M,
    locale: C,
    maxFiles: S,
    maxSize: F,
    minSize: R,
    panelAspectRatio: L,
    panelLayout: z,
    placeholder: D,
    removeUploadedFileButtonPosition: k,
    removeUploadedFileUsing: B,
    reorderUploadedFilesUsing: X,
    shouldAppendFiles: q,
    shouldOrientImageFromExif: Q,
    shouldTransformImage: pe,
    state: G,
    uploadButtonPosition: H,
    uploadingMessage: Y,
    uploadProgressIndicatorPosition: le,
    uploadUsing: ee,
}) {
    return {
        fileKeyIndex: {},
        pond: null,
        shouldUpdateState: !0,
        state: G,
        lastState: null,
        error: null,
        uploadedFileIndex: {},
        isEditorOpen: !1,
        editingFile: {},
        currentRatio: '',
        editor: {},
        init: async function () {
            Dt(Kl[C] ?? Kl.en),
                (this.pond = ut(this.$refs.input, {
                    acceptedFileTypes: e,
                    allowImageExifOrientation: Q,
                    allowPaste: !1,
                    allowRemove: l,
                    allowReorder: P,
                    allowImagePreview: _,
                    allowVideoPreview: _,
                    allowAudioPreview: _,
                    allowImageTransform: pe,
                    credits: !1,
                    files: await this.getFiles(),
                    imageCropAspectRatio: p,
                    imagePreviewHeight: c,
                    imageResizeTargetHeight: m,
                    imageResizeTargetWidth: u,
                    imageResizeMode: d,
                    imageResizeUpscale: f,
                    itemInsertLocation: q ? 'after' : 'before',
                    ...(D && { labelIdle: D }),
                    maxFiles: S,
                    maxFileSize: F,
                    minFileSize: R,
                    styleButtonProcessItemPosition: H,
                    styleButtonRemoveItemPosition: k,
                    styleItemPanelAspectRatio: O,
                    styleLoadIndicatorPosition: M,
                    stylePanelAspectRatio: L,
                    stylePanelLayout: z,
                    styleProgressIndicatorPosition: le,
                    server: {
                        load: async (N, U) => {
                            let Z = await (
                                await fetch(N, { cache: 'no-store' })
                            ).blob()
                            U(Z)
                        },
                        process: (N, U, $, Z, Ve, Ge) => {
                            this.shouldUpdateState = !1
                            let Xt = (
                                [1e7] +
                                -1e3 +
                                -4e3 +
                                -8e3 +
                                -1e11
                            ).replace(/[018]/g, (Qt) =>
                                (
                                    Qt ^
                                    (crypto.getRandomValues(
                                        new Uint8Array(1)
                                    )[0] &
                                        (15 >> (Qt / 4)))
                                ).toString(16)
                            )
                            ee(
                                Xt,
                                U,
                                (Qt) => {
                                    ;(this.shouldUpdateState = !0), Z(Qt)
                                },
                                Ve,
                                Ge
                            )
                        },
                        remove: async (N, U) => {
                            let $ = this.uploadedFileIndex[N] ?? null
                            $ && (await o($), U())
                        },
                        revert: async (N, U) => {
                            await B(N), U()
                        },
                    },
                    allowImageEdit: g,
                    imageEditEditor: {
                        open: (N) => this.loadEditor(N),
                        onconfirm: () => {},
                        oncancel: () => this.closeEditor(),
                        onclose: () => this.closeEditor(),
                    },
                    fileValidateTypeDetectType: (N, U) =>
                        new Promise(($, Z) => {
                            let Ve = U || Go.getType(N.name.split('.').pop())
                            Ve ? $(Ve) : Z()
                        }),
                })),
                this.$watch('state', async () => {
                    if (
                        this.pond &&
                        this.shouldUpdateState &&
                        this.state !== void 0
                    ) {
                        if (
                            this.state !== null &&
                            Object.values(this.state).filter((N) =>
                                N.startsWith('livewire-file:')
                            ).length
                        ) {
                            this.lastState = null
                            return
                        }
                        JSON.stringify(this.state) !== this.lastState &&
                            ((this.lastState = JSON.stringify(this.state)),
                            (this.pond.files = await this.getFiles()))
                    }
                }),
                this.pond.on('reorderfiles', async (N) => {
                    let U = N.map(($) =>
                        $.source instanceof File
                            ? $.serverId
                            : (this.uploadedFileIndex[$.source] ?? null)
                    ).filter(($) => $)
                    await X(q ? U : U.reverse())
                }),
                this.pond.on('initfile', async (N) => {
                    b && (h || this.insertDownloadLink(N))
                }),
                this.pond.on('initfile', async (N) => {
                    x && (h || this.insertOpenLink(N))
                }),
                this.pond.on('addfilestart', async (N) => {
                    N.status === Et.PROCESSING_QUEUED &&
                        this.dispatchFormEvent('form-processing-started', {
                            message: Y,
                        })
                })
            let V = async () => {
                this.pond
                    .getFiles()
                    .filter(
                        (N) =>
                            N.status === Et.PROCESSING ||
                            N.status === Et.PROCESSING_QUEUED
                    ).length ||
                    this.dispatchFormEvent('form-processing-finished')
            }
            this.pond.on('processfile', V),
                this.pond.on('processfileabort', V),
                this.pond.on('processfilerevert', V),
                z === 'compact circle' &&
                    (this.pond.on('error', (N) => {
                        this.error = `${N.main}: ${N.sub}`.replace(
                            'Expects  or',
                            'Expects'
                        )
                    }),
                    this.pond.on('removefile', () => (this.error = null)))
        },
        destroy: function () {
            this.destroyEditor(), ft(this.$refs.input), (this.pond = null)
        },
        dispatchFormEvent: function (V, N = {}) {
            this.$el
                .closest('form')
                ?.dispatchEvent(
                    new CustomEvent(V, {
                        composed: !0,
                        cancelable: !0,
                        detail: N,
                    })
                )
        },
        getUploadedFiles: async function () {
            let V = await s()
            ;(this.fileKeyIndex = V ?? {}),
                (this.uploadedFileIndex = Object.entries(this.fileKeyIndex)
                    .filter(([N, U]) => U?.url)
                    .reduce((N, [U, $]) => ((N[$.url] = U), N), {}))
        },
        getFiles: async function () {
            await this.getUploadedFiles()
            let V = []
            for (let N of Object.values(this.fileKeyIndex))
                N &&
                    V.push({
                        source: N.url,
                        options: {
                            type: 'local',
                            ...(!N.type ||
                            (_ &&
                                (/^audio/.test(N.type) ||
                                    /^image/.test(N.type) ||
                                    /^video/.test(N.type)))
                                ? {}
                                : {
                                      file: {
                                          name: N.name,
                                          size: N.size,
                                          type: N.type,
                                      },
                                  }),
                        },
                    })
            return q ? V : V.reverse()
        },
        insertDownloadLink: function (V) {
            if (V.origin !== zt.LOCAL) return
            let N = this.getDownloadLink(V)
            N &&
                document
                    .getElementById(`filepond--item-${V.id}`)
                    .querySelector('.filepond--file-info-main')
                    .prepend(N)
        },
        insertOpenLink: function (V) {
            if (V.origin !== zt.LOCAL) return
            let N = this.getOpenLink(V)
            N &&
                document
                    .getElementById(`filepond--item-${V.id}`)
                    .querySelector('.filepond--file-info-main')
                    .prepend(N)
        },
        getDownloadLink: function (V) {
            let N = V.source
            if (!N) return
            let U = document.createElement('a')
            return (
                (U.className = 'filepond--download-icon'),
                (U.href = N),
                (U.download = V.file.name),
                U
            )
        },
        getOpenLink: function (V) {
            let N = V.source
            if (!N) return
            let U = document.createElement('a')
            return (
                (U.className = 'filepond--open-icon'),
                (U.href = N),
                (U.target = '_blank'),
                U
            )
        },
        initEditor: function () {
            r ||
                (g &&
                    (this.editor = new xa(this.$refs.editor, {
                        aspectRatio: n / a,
                        autoCropArea: 1,
                        center: !0,
                        crop: (V) => {
                            ;(this.$refs.xPositionInput.value = Math.round(
                                V.detail.x
                            )),
                                (this.$refs.yPositionInput.value = Math.round(
                                    V.detail.y
                                )),
                                (this.$refs.heightInput.value = Math.round(
                                    V.detail.height
                                )),
                                (this.$refs.widthInput.value = Math.round(
                                    V.detail.width
                                )),
                                (this.$refs.rotationInput.value =
                                    V.detail.rotate)
                        },
                        cropBoxResizable: !0,
                        guides: !0,
                        highlight: !0,
                        responsive: !0,
                        toggleDragModeOnDblclick: !0,
                        viewMode: i,
                        wheelZoomRatio: 0.02,
                    })))
        },
        closeEditor: function () {
            ;(this.editingFile = {}),
                (this.isEditorOpen = !1),
                this.destroyEditor()
        },
        fixImageDimensions: function (V, N) {
            if (V.type !== 'image/svg+xml') return N(V)
            let U = new FileReader()
            ;(U.onload = ($) => {
                let Z = new DOMParser()
                    .parseFromString($.target.result, 'image/svg+xml')
                    ?.querySelector('svg')
                if (!Z) return N(V)
                let Ve = ['viewBox', 'ViewBox', 'viewbox'].find((Xt) =>
                    Z.hasAttribute(Xt)
                )
                if (!Ve) return N(V)
                let Ge = Z.getAttribute(Ve).split(' ')
                return !Ge || Ge.length !== 4
                    ? N(V)
                    : (Z.setAttribute('width', parseFloat(Ge[2]) + 'pt'),
                      Z.setAttribute('height', parseFloat(Ge[3]) + 'pt'),
                      N(
                          new File(
                              [
                                  new Blob(
                                      [
                                          new XMLSerializer().serializeToString(
                                              Z
                                          ),
                                      ],
                                      { type: 'image/svg+xml' }
                                  ),
                              ],
                              V.name,
                              { type: 'image/svg+xml', _relativePath: '' }
                          )
                      ))
            }),
                U.readAsText(V)
        },
        loadEditor: function (V) {
            if (r || !g || !V) return
            let N = V.type === 'image/svg+xml'
            if (!E && N) {
                alert(y)
                return
            }
            ;(T && N && !confirm(I)) ||
                this.fixImageDimensions(V, (U) => {
                    ;(this.editingFile = U), this.initEditor()
                    let $ = new FileReader()
                    ;($.onload = (Z) => {
                        ;(this.isEditorOpen = !0),
                            setTimeout(
                                () => this.editor.replace(Z.target.result),
                                200
                            )
                    }),
                        $.readAsDataURL(V)
                })
        },
        getRoundedCanvas: function (V) {
            let N = V.width,
                U = V.height,
                $ = document.createElement('canvas')
            ;($.width = N), ($.height = U)
            let Z = $.getContext('2d')
            return (
                (Z.imageSmoothingEnabled = !0),
                Z.drawImage(V, 0, 0, N, U),
                (Z.globalCompositeOperation = 'destination-in'),
                Z.beginPath(),
                Z.ellipse(N / 2, U / 2, N / 2, U / 2, 0, 0, 2 * Math.PI),
                Z.fill(),
                $
            )
        },
        saveEditor: function () {
            if (r || !g) return
            let V = this.editor.getCroppedCanvas({
                fillColor: t ?? 'transparent',
                height: m,
                imageSmoothingEnabled: !0,
                imageSmoothingQuality: 'high',
                width: u,
            })
            v && (V = this.getRoundedCanvas(V)),
                V.toBlob(
                    (N) => {
                        w &&
                            this.pond.removeFile(
                                this.pond
                                    .getFiles()
                                    .find(
                                        (U) =>
                                            U.filename === this.editingFile.name
                                    )?.id,
                                { revert: !0 }
                            ),
                            this.$nextTick(() => {
                                this.shouldUpdateState = !1
                                let U = this.editingFile.name.slice(
                                        0,
                                        this.editingFile.name.lastIndexOf('.')
                                    ),
                                    $ = this.editingFile.name.split('.').pop()
                                $ === 'svg' && ($ = 'png')
                                let Z = /-v(\d+)/
                                Z.test(U)
                                    ? (U = U.replace(
                                          Z,
                                          (Ve, Ge) => `-v${Number(Ge) + 1}`
                                      ))
                                    : (U += '-v1'),
                                    this.pond
                                        .addFile(
                                            new File([N], `${U}.${$}`, {
                                                type:
                                                    this.editingFile.type ===
                                                        'image/svg+xml' || v
                                                        ? 'image/png'
                                                        : this.editingFile.type,
                                                lastModified:
                                                    new Date().getTime(),
                                            })
                                        )
                                        .then(() => {
                                            this.closeEditor()
                                        })
                                        .catch(() => {
                                            this.closeEditor()
                                        })
                            })
                    },
                    v ? 'image/png' : this.editingFile.type
                )
        },
        destroyEditor: function () {
            this.editor &&
                typeof this.editor.destroy == 'function' &&
                this.editor.destroy(),
                (this.editor = null)
        },
    }
}
var Kl = {
    ar: wl,
    ca: Sl,
    ckb: Ll,
    cs: Al,
    da: Ml,
    de: Ol,
    en: Pl,
    es: Dl,
    fa: Fl,
    fi: zl,
    fr: Cl,
    hu: Nl,
    id: Bl,
    it: kl,
    km: Vl,
    nl: Gl,
    no: Ul,
    pl: Wl,
    pt_BR: Ri,
    pt_PT: Ri,
    ro: Hl,
    ru: jl,
    sv: Yl,
    tr: ql,
    uk: $l,
    vi: Xl,
    zh_CN: Ql,
    zh_TW: Zl,
}
export { uf as default }
/*! Bundled license information:

filepond/dist/filepond.esm.js:
  (*!
   * FilePond 4.31.4
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

cropperjs/dist/cropper.esm.js:
  (*!
   * Cropper.js v1.6.2
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2024-04-21T07:43:05.335Z
   *)

filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js:
  (*!
   * FilePondPluginFileValidateSize 2.2.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js:
  (*!
   * FilePondPluginFileValidateType 1.2.9
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-crop/dist/filepond-plugin-image-crop.esm.js:
  (*!
   * FilePondPluginImageCrop 2.0.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-edit/dist/filepond-plugin-image-edit.esm.js:
  (*!
   * FilePondPluginImageEdit 1.6.3
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.esm.js:
  (*!
   * FilePondPluginImageExifOrientation 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js:
  (*!
   * FilePondPluginImagePreview 4.6.12
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-resize/dist/filepond-plugin-image-resize.esm.js:
  (*!
   * FilePondPluginImageResize 2.0.10
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-transform/dist/filepond-plugin-image-transform.esm.js:
  (*!
   * FilePondPluginImageTransform 3.8.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-media-preview/dist/filepond-plugin-media-preview.esm.js:
  (*!
   * FilePondPluginMediaPreview 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit undefined for details.
   *)
*/

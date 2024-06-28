(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]'))
        l(a);
    new MutationObserver((a) => {
        for (const r of a)
            if (r.type === "childList")
                for (const o of r.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && l(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(a) {
        const r = {};
        return (
            a.integrity && (r.integrity = a.integrity),
            a.referrerPolicy && (r.referrerPolicy = a.referrerPolicy),
            a.crossOrigin === "use-credentials"
                ? (r.credentials = "include")
                : a.crossOrigin === "anonymous"
                ? (r.credentials = "omit")
                : (r.credentials = "same-origin"),
            r
        );
    }
    function l(a) {
        if (a.ep) return;
        a.ep = !0;
        const r = n(a);
        fetch(a.href, r);
    }
})();
/**
 * @vue/shared v3.4.29
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function io(e, t) {
    const n = new Set(e.split(","));
    return (l) => n.has(l);
}
const Oe = {},
    jn = [],
    pt = () => {},
    Bf = () => !1,
    Ba = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    so = (e) => e.startsWith("onUpdate:"),
    $e = Object.assign,
    uo = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Df = Object.prototype.hasOwnProperty,
    xe = (e, t) => Df.call(e, t),
    ve = Array.isArray,
    Wn = (e) => Da(e) === "[object Map]",
    wu = (e) => Da(e) === "[object Set]",
    ge = (e) => typeof e == "function",
    De = (e) => typeof e == "string",
    Vn = (e) => typeof e == "symbol",
    Re = (e) => e !== null && typeof e == "object",
    Au = (e) => (Re(e) || ge(e)) && ge(e.then) && ge(e.catch),
    _u = Object.prototype.toString,
    Da = (e) => _u.call(e),
    Hf = (e) => Da(e).slice(8, -1),
    xu = (e) => Da(e) === "[object Object]",
    co = (e) =>
        De(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    kl = io(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    Ha = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Nf = /-(\w)/g,
    Ct = Ha((e) => e.replace(Nf, (t, n) => (n ? n.toUpperCase() : ""))),
    $f = /\B([A-Z])/g,
    il = Ha((e) => e.replace($f, "-$1").toLowerCase()),
    sl = Ha((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    tr = Ha((e) => (e ? `on${sl(e)}` : "")),
    vn = (e, t) => !Object.is(e, t),
    nr = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t);
    },
    Mu = (e, t, n, l = !1) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            writable: l,
            value: n,
        });
    },
    Gf = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    },
    Eu = (e) => {
        const t = De(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t;
    };
let bi;
const Tu = () =>
    bi ||
    (bi =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
            ? self
            : typeof window < "u"
            ? window
            : typeof global < "u"
            ? global
            : {});
function fo(e) {
    if (ve(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const l = e[n],
                a = De(l) ? Wf(l) : fo(l);
            if (a) for (const r in a) t[r] = a[r];
        }
        return t;
    } else if (De(e) || Re(e)) return e;
}
const zf = /;(?![^(]*\))/g,
    Xf = /:([^]+)/,
    jf = /\/\*[^]*?\*\//g;
function Wf(e) {
    const t = {};
    return (
        e
            .replace(jf, "")
            .split(zf)
            .forEach((n) => {
                if (n) {
                    const l = n.split(Xf);
                    l.length > 1 && (t[l[0].trim()] = l[1].trim());
                }
            }),
        t
    );
}
function vo(e) {
    let t = "";
    if (De(e)) t = e;
    else if (ve(e))
        for (let n = 0; n < e.length; n++) {
            const l = vo(e[n]);
            l && (t += l + " ");
        }
    else if (Re(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const Uf =
        "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Kf = io(Uf);
function Pu(e) {
    return !!e || e === "";
}
const wl = (e) =>
        De(e)
            ? e
            : e == null
            ? ""
            : ve(e) || (Re(e) && (e.toString === _u || !ge(e.toString)))
            ? JSON.stringify(e, Iu, 2)
            : String(e),
    Iu = (e, t) =>
        t && t.__v_isRef
            ? Iu(e, t.value)
            : Wn(t)
            ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                      (n, [l, a], r) => ((n[lr(l, r) + " =>"] = a), n),
                      {}
                  ),
              }
            : wu(t)
            ? { [`Set(${t.size})`]: [...t.values()].map((n) => lr(n)) }
            : Vn(t)
            ? lr(t)
            : Re(t) && !ve(t) && !xu(t)
            ? String(t)
            : t,
    lr = (e, t = "") => {
        var n;
        return Vn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
/**
 * @vue/reactivity v3.4.29
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ft;
class Vu {
    constructor(t = !1) {
        (this.detached = t),
            (this._active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = ft),
            !t &&
                ft &&
                (this.index = (ft.scopes || (ft.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(t) {
        if (this._active) {
            const n = ft;
            try {
                return (ft = this), t();
            } finally {
                ft = n;
            }
        }
    }
    on() {
        ft = this;
    }
    off() {
        ft = this.parent;
    }
    stop(t) {
        if (this._active) {
            let n, l;
            for (n = 0, l = this.effects.length; n < l; n++)
                this.effects[n].stop();
            for (n = 0, l = this.cleanups.length; n < l; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0, l = this.scopes.length; n < l; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const a = this.parent.scopes.pop();
                a &&
                    a !== this &&
                    ((this.parent.scopes[this.index] = a),
                    (a.index = this.index));
            }
            (this.parent = void 0), (this._active = !1);
        }
    }
}
function mo(e) {
    return new Vu(e);
}
function Yf(e, t = ft) {
    t && t.active && t.effects.push(e);
}
function qf() {
    return ft;
}
function ct(e) {
    ft && ft.cleanups.push(e);
}
let En;
class ho {
    constructor(t, n, l, a) {
        (this.fn = t),
            (this.trigger = n),
            (this.scheduler = l),
            (this.active = !0),
            (this.deps = []),
            (this._dirtyLevel = 5),
            (this._trackId = 0),
            (this._runnings = 0),
            (this._shouldSchedule = !1),
            (this._depsLength = 0),
            Yf(this, a);
    }
    get dirty() {
        if (this._dirtyLevel === 2) return !1;
        if (this._dirtyLevel === 3 || this._dirtyLevel === 4) {
            (this._dirtyLevel = 1), gn();
            for (let t = 0; t < this._depsLength; t++) {
                const n = this.deps[t];
                if (n.computed) {
                    if (n.computed.effect._dirtyLevel === 2) return !0;
                    if ((Qf(n.computed), this._dirtyLevel >= 5)) break;
                }
            }
            this._dirtyLevel === 1 && (this._dirtyLevel = 0), yn();
        }
        return this._dirtyLevel >= 5;
    }
    set dirty(t) {
        this._dirtyLevel = t ? 5 : 0;
    }
    run() {
        if (((this._dirtyLevel = 0), !this.active)) return this.fn();
        let t = dn,
            n = En;
        try {
            return (
                (dn = !0), (En = this), this._runnings++, Si(this), this.fn()
            );
        } finally {
            Ci(this), this._runnings--, (En = n), (dn = t);
        }
    }
    stop() {
        this.active &&
            (Si(this),
            Ci(this),
            this.onStop && this.onStop(),
            (this.active = !1));
    }
}
function Qf(e) {
    return e.value;
}
function Si(e) {
    e._trackId++, (e._depsLength = 0);
}
function Ci(e) {
    if (e.deps.length > e._depsLength) {
        for (let t = e._depsLength; t < e.deps.length; t++) Ru(e.deps[t], e);
        e.deps.length = e._depsLength;
    }
}
function Ru(e, t) {
    const n = e.get(t);
    n !== void 0 &&
        t._trackId !== n &&
        (e.delete(t), e.size === 0 && e.cleanup());
}
let dn = !0,
    Er = 0;
const Lu = [];
function gn() {
    Lu.push(dn), (dn = !1);
}
function yn() {
    const e = Lu.pop();
    dn = e === void 0 ? !0 : e;
}
function go() {
    Er++;
}
function yo() {
    for (Er--; !Er && Tr.length; ) Tr.shift()();
}
function Ou(e, t, n) {
    if (t.get(e) !== e._trackId) {
        t.set(e, e._trackId);
        const l = e.deps[e._depsLength];
        l !== t
            ? (l && Ru(l, e), (e.deps[e._depsLength++] = t))
            : e._depsLength++;
    }
}
const Tr = [];
function Fu(e, t, n) {
    go();
    for (const l of e.keys()) {
        if (
            !e.computed &&
            l.computed &&
            e.get(l) === l._trackId &&
            l._runnings > 0
        ) {
            l._dirtyLevel = 2;
            continue;
        }
        let a;
        l._dirtyLevel < t &&
            (a ?? (a = e.get(l) === l._trackId)) &&
            (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0),
            l.computed && l._dirtyLevel === 2 && (l._shouldSchedule = !0),
            (l._dirtyLevel = t)),
            l._shouldSchedule &&
                (a ?? (a = e.get(l) === l._trackId)) &&
                (l.trigger(),
                (!l._runnings || l.allowRecurse) &&
                    l._dirtyLevel !== 3 &&
                    ((l._shouldSchedule = !1),
                    l.scheduler && Tr.push(l.scheduler)));
    }
    yo();
}
const Bu = (e, t) => {
        const n = new Map();
        return (n.cleanup = e), (n.computed = t), n;
    },
    pa = new WeakMap(),
    Tn = Symbol(""),
    Pr = Symbol("");
function st(e, t, n) {
    if (dn && En) {
        let l = pa.get(e);
        l || pa.set(e, (l = new Map()));
        let a = l.get(n);
        a || l.set(n, (a = Bu(() => l.delete(n)))), Ou(En, a);
    }
}
function Wt(e, t, n, l, a, r) {
    const o = pa.get(e);
    if (!o) return;
    let i = [];
    if (t === "clear") i = [...o.values()];
    else if (n === "length" && ve(e)) {
        const s = Number(l);
        o.forEach((u, c) => {
            (c === "length" || (!Vn(c) && c >= s)) && i.push(u);
        });
    } else
        switch ((n !== void 0 && i.push(o.get(n)), t)) {
            case "add":
                ve(e)
                    ? co(n) && i.push(o.get("length"))
                    : (i.push(o.get(Tn)), Wn(e) && i.push(o.get(Pr)));
                break;
            case "delete":
                ve(e) || (i.push(o.get(Tn)), Wn(e) && i.push(o.get(Pr)));
                break;
            case "set":
                Wn(e) && i.push(o.get(Tn));
                break;
        }
    go();
    for (const s of i) s && Fu(s, 5);
    yo();
}
function Zf(e, t) {
    const n = pa.get(e);
    return n && n.get(t);
}
const Jf = io("__proto__,__v_isRef,__isVue"),
    Du = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(Vn)
    ),
    ki = ev();
function ev() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const l = ye(this);
                for (let r = 0, o = this.length; r < o; r++)
                    st(l, "get", r + "");
                const a = l[t](...n);
                return a === -1 || a === !1 ? l[t](...n.map(ye)) : a;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                gn(), go();
                const l = ye(this)[t].apply(this, n);
                return yo(), yn(), l;
            };
        }),
        e
    );
}
function tv(e) {
    Vn(e) || (e = String(e));
    const t = ye(this);
    return st(t, "has", e), t.hasOwnProperty(e);
}
class Hu {
    constructor(t = !1, n = !1) {
        (this._isReadonly = t), (this._isShallow = n);
    }
    get(t, n, l) {
        const a = this._isReadonly,
            r = this._isShallow;
        if (n === "__v_isReactive") return !a;
        if (n === "__v_isReadonly") return a;
        if (n === "__v_isShallow") return r;
        if (n === "__v_raw")
            return l === (a ? (r ? mv : zu) : r ? Gu : $u).get(t) ||
                Object.getPrototypeOf(t) === Object.getPrototypeOf(l)
                ? t
                : void 0;
        const o = ve(t);
        if (!a) {
            if (o && xe(ki, n)) return Reflect.get(ki, n, l);
            if (n === "hasOwnProperty") return tv;
        }
        const i = Reflect.get(t, n, l);
        return (Vn(n) ? Du.has(n) : Jf(n)) || (a || st(t, "get", n), r)
            ? i
            : He(i)
            ? o && co(n)
                ? i
                : i.value
            : Re(i)
            ? a
                ? ul(i)
                : Ze(i)
            : i;
    }
}
class Nu extends Hu {
    constructor(t = !1) {
        super(!1, t);
    }
    set(t, n, l, a) {
        let r = t[n];
        if (!this._isShallow) {
            const s = Il(r);
            if (
                (!ba(l) && !Il(l) && ((r = ye(r)), (l = ye(l))),
                !ve(t) && He(r) && !He(l))
            )
                return s ? !1 : ((r.value = l), !0);
        }
        const o = ve(t) && co(n) ? Number(n) < t.length : xe(t, n),
            i = Reflect.set(t, n, l, a);
        return (
            t === ye(a) &&
                (o ? vn(l, r) && Wt(t, "set", n, l) : Wt(t, "add", n, l)),
            i
        );
    }
    deleteProperty(t, n) {
        const l = xe(t, n);
        t[n];
        const a = Reflect.deleteProperty(t, n);
        return a && l && Wt(t, "delete", n, void 0), a;
    }
    has(t, n) {
        const l = Reflect.has(t, n);
        return (!Vn(n) || !Du.has(n)) && st(t, "has", n), l;
    }
    ownKeys(t) {
        return st(t, "iterate", ve(t) ? "length" : Tn), Reflect.ownKeys(t);
    }
}
class nv extends Hu {
    constructor(t = !1) {
        super(!0, t);
    }
    set(t, n) {
        return !0;
    }
    deleteProperty(t, n) {
        return !0;
    }
}
const lv = new Nu(),
    av = new nv(),
    rv = new Nu(!0);
const po = (e) => e,
    Na = (e) => Reflect.getPrototypeOf(e);
function Jl(e, t, n = !1, l = !1) {
    e = e.__v_raw;
    const a = ye(e),
        r = ye(t);
    n || (vn(t, r) && st(a, "get", t), st(a, "get", r));
    const { has: o } = Na(a),
        i = l ? po : n ? Co : Vl;
    if (o.call(a, t)) return i(e.get(t));
    if (o.call(a, r)) return i(e.get(r));
    e !== a && e.get(t);
}
function ea(e, t = !1) {
    const n = this.__v_raw,
        l = ye(n),
        a = ye(e);
    return (
        t || (vn(e, a) && st(l, "has", e), st(l, "has", a)),
        e === a ? n.has(e) : n.has(e) || n.has(a)
    );
}
function ta(e, t = !1) {
    return (
        (e = e.__v_raw),
        !t && st(ye(e), "iterate", Tn),
        Reflect.get(e, "size", e)
    );
}
function wi(e) {
    e = ye(e);
    const t = ye(this);
    return Na(t).has.call(t, e) || (t.add(e), Wt(t, "add", e, e)), this;
}
function Ai(e, t) {
    t = ye(t);
    const n = ye(this),
        { has: l, get: a } = Na(n);
    let r = l.call(n, e);
    r || ((e = ye(e)), (r = l.call(n, e)));
    const o = a.call(n, e);
    return (
        n.set(e, t),
        r ? vn(t, o) && Wt(n, "set", e, t) : Wt(n, "add", e, t),
        this
    );
}
function _i(e) {
    const t = ye(this),
        { has: n, get: l } = Na(t);
    let a = n.call(t, e);
    a || ((e = ye(e)), (a = n.call(t, e))), l && l.call(t, e);
    const r = t.delete(e);
    return a && Wt(t, "delete", e, void 0), r;
}
function xi() {
    const e = ye(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Wt(e, "clear", void 0, void 0), n;
}
function na(e, t) {
    return function (l, a) {
        const r = this,
            o = r.__v_raw,
            i = ye(o),
            s = t ? po : e ? Co : Vl;
        return (
            !e && st(i, "iterate", Tn),
            o.forEach((u, c) => l.call(a, s(u), s(c), r))
        );
    };
}
function la(e, t, n) {
    return function (...l) {
        const a = this.__v_raw,
            r = ye(a),
            o = Wn(r),
            i = e === "entries" || (e === Symbol.iterator && o),
            s = e === "keys" && o,
            u = a[e](...l),
            c = n ? po : t ? Co : Vl;
        return (
            !t && st(r, "iterate", s ? Pr : Tn),
            {
                next() {
                    const { value: d, done: f } = u.next();
                    return f
                        ? { value: d, done: f }
                        : { value: i ? [c(d[0]), c(d[1])] : c(d), done: f };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function en(e) {
    return function (...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this;
    };
}
function ov() {
    const e = {
            get(r) {
                return Jl(this, r);
            },
            get size() {
                return ta(this);
            },
            has: ea,
            add: wi,
            set: Ai,
            delete: _i,
            clear: xi,
            forEach: na(!1, !1),
        },
        t = {
            get(r) {
                return Jl(this, r, !1, !0);
            },
            get size() {
                return ta(this);
            },
            has: ea,
            add: wi,
            set: Ai,
            delete: _i,
            clear: xi,
            forEach: na(!1, !0),
        },
        n = {
            get(r) {
                return Jl(this, r, !0);
            },
            get size() {
                return ta(this, !0);
            },
            has(r) {
                return ea.call(this, r, !0);
            },
            add: en("add"),
            set: en("set"),
            delete: en("delete"),
            clear: en("clear"),
            forEach: na(!0, !1),
        },
        l = {
            get(r) {
                return Jl(this, r, !0, !0);
            },
            get size() {
                return ta(this, !0);
            },
            has(r) {
                return ea.call(this, r, !0);
            },
            add: en("add"),
            set: en("set"),
            delete: en("delete"),
            clear: en("clear"),
            forEach: na(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
            (e[r] = la(r, !1, !1)),
                (n[r] = la(r, !0, !1)),
                (t[r] = la(r, !1, !0)),
                (l[r] = la(r, !0, !0));
        }),
        [e, n, t, l]
    );
}
const [iv, sv, uv, cv] = ov();
function bo(e, t) {
    const n = t ? (e ? cv : uv) : e ? sv : iv;
    return (l, a, r) =>
        a === "__v_isReactive"
            ? !e
            : a === "__v_isReadonly"
            ? e
            : a === "__v_raw"
            ? l
            : Reflect.get(xe(n, a) && a in l ? n : l, a, r);
}
const dv = { get: bo(!1, !1) },
    fv = { get: bo(!1, !0) },
    vv = { get: bo(!0, !1) };
const $u = new WeakMap(),
    Gu = new WeakMap(),
    zu = new WeakMap(),
    mv = new WeakMap();
function hv(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function gv(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : hv(Hf(e));
}
function Ze(e) {
    return Il(e) ? e : So(e, !1, lv, dv, $u);
}
function Xu(e) {
    return So(e, !1, rv, fv, Gu);
}
function ul(e) {
    return So(e, !0, av, vv, zu);
}
function So(e, t, n, l, a) {
    if (!Re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const r = a.get(e);
    if (r) return r;
    const o = gv(e);
    if (o === 0) return e;
    const i = new Proxy(e, o === 2 ? l : n);
    return a.set(e, i), i;
}
function Al(e) {
    return Il(e) ? Al(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Il(e) {
    return !!(e && e.__v_isReadonly);
}
function ba(e) {
    return !!(e && e.__v_isShallow);
}
function ju(e) {
    return e ? !!e.__v_raw : !1;
}
function ye(e) {
    const t = e && e.__v_raw;
    return t ? ye(t) : e;
}
function yv(e) {
    return Object.isExtensible(e) && Mu(e, "__v_skip", !0), e;
}
const Vl = (e) => (Re(e) ? Ze(e) : e),
    Co = (e) => (Re(e) ? ul(e) : e);
class Wu {
    constructor(t, n, l, a) {
        (this.getter = t),
            (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this.__v_isReadonly = !1),
            (this.effect = new ho(
                () => t(this._value),
                () => da(this, this.effect._dirtyLevel === 3 ? 3 : 4)
            )),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !a),
            (this.__v_isReadonly = l);
    }
    get value() {
        const t = ye(this);
        return (
            (!t._cacheable || t.effect.dirty) &&
                vn(t._value, (t._value = t.effect.run())) &&
                da(t, 5),
            Uu(t),
            t.effect._dirtyLevel >= 2 && da(t, 3),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
    get _dirty() {
        return this.effect.dirty;
    }
    set _dirty(t) {
        this.effect.dirty = t;
    }
}
function pv(e, t, n = !1) {
    let l, a;
    const r = ge(e);
    return (
        r ? ((l = e), (a = pt)) : ((l = e.get), (a = e.set)),
        new Wu(l, a, r || !a, n)
    );
}
function Uu(e) {
    var t;
    dn &&
        En &&
        ((e = ye(e)),
        Ou(
            En,
            (t = e.dep) != null
                ? t
                : (e.dep = Bu(
                      () => (e.dep = void 0),
                      e instanceof Wu ? e : void 0
                  ))
        ));
}
function da(e, t = 5, n, l) {
    e = ye(e);
    const a = e.dep;
    a && Fu(a, t);
}
function He(e) {
    return !!(e && e.__v_isRef === !0);
}
function le(e) {
    return Ku(e, !1);
}
function oe(e) {
    return Ku(e, !0);
}
function Ku(e, t) {
    return He(e) ? e : new bv(e, t);
}
class bv {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : ye(t)),
            (this._value = n ? t : Vl(t));
    }
    get value() {
        return Uu(this), this._value;
    }
    set value(t) {
        const n = this.__v_isShallow || ba(t) || Il(t);
        (t = n ? t : ye(t)),
            vn(t, this._rawValue) &&
                (this._rawValue,
                (this._rawValue = t),
                (this._value = n ? t : Vl(t)),
                da(this, 5));
    }
}
function Xe(e) {
    return He(e) ? e.value : e;
}
const Sv = {
    get: (e, t, n) => Xe(Reflect.get(e, t, n)),
    set: (e, t, n, l) => {
        const a = e[t];
        return He(a) && !He(n) ? ((a.value = n), !0) : Reflect.set(e, t, n, l);
    },
};
function Yu(e) {
    return Al(e) ? e : new Proxy(e, Sv);
}
function ko(e) {
    const t = ve(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = qu(e, n);
    return t;
}
class Cv {
    constructor(t, n, l) {
        (this._object = t),
            (this._key = n),
            (this._defaultValue = l),
            (this.__v_isRef = !0);
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
        this._object[this._key] = t;
    }
    get dep() {
        return Zf(ye(this._object), this._key);
    }
}
class kv {
    constructor(t) {
        (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
    }
    get value() {
        return this._getter();
    }
}
function ce(e, t, n) {
    return He(e)
        ? e
        : ge(e)
        ? new kv(e)
        : Re(e) && arguments.length > 1
        ? qu(e, t, n)
        : le(e);
}
function qu(e, t, n) {
    const l = e[t];
    return He(l) ? l : new Cv(e, t, n);
}
/**
 * @vue/runtime-core v3.4.29
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function fn(e, t, n, l) {
    try {
        return l ? e(...l) : e();
    } catch (a) {
        Wl(a, t, n);
    }
}
function St(e, t, n, l) {
    if (ge(e)) {
        const a = fn(e, t, n, l);
        return (
            a &&
                Au(a) &&
                a.catch((r) => {
                    Wl(r, t, n);
                }),
            a
        );
    }
    if (ve(e)) {
        const a = [];
        for (let r = 0; r < e.length; r++) a.push(St(e[r], t, n, l));
        return a;
    }
}
function Wl(e, t, n, l = !0) {
    const a = t ? t.vnode : null;
    if (t) {
        let r = t.parent;
        const o = t.proxy,
            i = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; r; ) {
            const u = r.ec;
            if (u) {
                for (let c = 0; c < u.length; c++)
                    if (u[c](e, o, i) === !1) return;
            }
            r = r.parent;
        }
        const s = t.appContext.config.errorHandler;
        if (s) {
            gn(), fn(s, null, 10, [e, o, i]), yn();
            return;
        }
    }
    wv(e, n, a, l);
}
function wv(e, t, n, l = !0) {
    console.error(e);
}
let Rl = !1,
    Ir = !1;
const et = [];
let Rt = 0;
const Un = [];
let an = null,
    xn = 0;
const Qu = Promise.resolve();
let wo = null;
function Ge(e) {
    const t = wo || Qu;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Av(e) {
    let t = Rt + 1,
        n = et.length;
    for (; t < n; ) {
        const l = (t + n) >>> 1,
            a = et[l],
            r = Ll(a);
        r < e || (r === e && a.pre) ? (t = l + 1) : (n = l);
    }
    return t;
}
function Ao(e) {
    (!et.length || !et.includes(e, Rl && e.allowRecurse ? Rt + 1 : Rt)) &&
        (e.id == null ? et.push(e) : et.splice(Av(e.id), 0, e), Zu());
}
function Zu() {
    !Rl && !Ir && ((Ir = !0), (wo = Qu.then(ec)));
}
function _v(e) {
    const t = et.indexOf(e);
    t > Rt && et.splice(t, 1);
}
function Vr(e) {
    ve(e)
        ? Un.push(...e)
        : (!an || !an.includes(e, e.allowRecurse ? xn + 1 : xn)) && Un.push(e),
        Zu();
}
function Mi(e, t, n = Rl ? Rt + 1 : 0) {
    for (; n < et.length; n++) {
        const l = et[n];
        if (l && l.pre) {
            if (e && l.id !== e.uid) continue;
            et.splice(n, 1), n--, l();
        }
    }
}
function Ju(e) {
    if (Un.length) {
        const t = [...new Set(Un)].sort((n, l) => Ll(n) - Ll(l));
        if (((Un.length = 0), an)) {
            an.push(...t);
            return;
        }
        for (an = t, xn = 0; xn < an.length; xn++) {
            const n = an[xn];
            n.active !== !1 && n();
        }
        (an = null), (xn = 0);
    }
}
const Ll = (e) => (e.id == null ? 1 / 0 : e.id),
    xv = (e, t) => {
        const n = Ll(e) - Ll(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return n;
    };
function ec(e) {
    (Ir = !1), (Rl = !0), et.sort(xv);
    try {
        for (Rt = 0; Rt < et.length; Rt++) {
            const t = et[Rt];
            t && t.active !== !1 && fn(t, null, 14);
        }
    } finally {
        (Rt = 0),
            (et.length = 0),
            Ju(),
            (Rl = !1),
            (wo = null),
            (et.length || Un.length) && ec();
    }
}
function Mv(e, t, ...n) {
    if (e.isUnmounted) return;
    const l = e.vnode.props || Oe;
    let a = n;
    const r = t.startsWith("update:"),
        o = r && t.slice(7);
    if (o && o in l) {
        const c = `${o === "modelValue" ? "model" : o}Modifiers`,
            { number: d, trim: f } = l[c] || Oe;
        f && (a = n.map((v) => (De(v) ? v.trim() : v))), d && (a = n.map(Gf));
    }
    let i,
        s = l[(i = tr(t))] || l[(i = tr(Ct(t)))];
    !s && r && (s = l[(i = tr(il(t)))]), s && St(s, e, 6, a);
    const u = l[i + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[i]) return;
        (e.emitted[i] = !0), St(u, e, 6, a);
    }
}
function tc(e, t, n = !1) {
    const l = t.emitsCache,
        a = l.get(e);
    if (a !== void 0) return a;
    const r = e.emits;
    let o = {},
        i = !1;
    if (!ge(e)) {
        const s = (u) => {
            const c = tc(u, t, !0);
            c && ((i = !0), $e(o, c));
        };
        !n && t.mixins.length && t.mixins.forEach(s),
            e.extends && s(e.extends),
            e.mixins && e.mixins.forEach(s);
    }
    return !r && !i
        ? (Re(e) && l.set(e, null), null)
        : (ve(r) ? r.forEach((s) => (o[s] = null)) : $e(o, r),
          Re(e) && l.set(e, o),
          o);
}
function $a(e, t) {
    return !e || !Ba(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, "")),
          xe(e, t[0].toLowerCase() + t.slice(1)) || xe(e, il(t)) || xe(e, t));
}
let rt = null,
    Ga = null;
function Sa(e) {
    const t = rt;
    return (rt = e), (Ga = (e && e.type.__scopeId) || null), t;
}
function _o(e) {
    Ga = e;
}
function xo() {
    Ga = null;
}
function Ye(e, t = rt, n) {
    if (!t || e._n) return e;
    const l = (...a) => {
        l._d && zi(-1);
        const r = Sa(t);
        let o;
        try {
            o = e(...a);
        } finally {
            Sa(r), l._d && zi(1);
        }
        return o;
    };
    return (l._n = !0), (l._c = !0), (l._d = !0), l;
}
function ar(e) {
    const {
            type: t,
            vnode: n,
            proxy: l,
            withProxy: a,
            propsOptions: [r],
            slots: o,
            attrs: i,
            emit: s,
            render: u,
            renderCache: c,
            props: d,
            data: f,
            setupState: v,
            ctx: g,
            inheritAttrs: m,
        } = e,
        p = Sa(e);
    let C, x;
    try {
        if (n.shapeFlag & 4) {
            const T = a || l,
                k = T;
            (C = xt(u.call(k, T, c, d, v, f, g))), (x = i);
        } else {
            const T = t;
            (C = xt(
                T.length > 1
                    ? T(d, { attrs: i, slots: o, emit: s })
                    : T(d, null)
            )),
                (x = t.props ? i : Tv(i));
        }
    } catch (T) {
        (El.length = 0), Wl(T, e, 1), (C = h(tt));
    }
    let _ = C;
    if (x && m !== !1) {
        const T = Object.keys(x),
            { shapeFlag: k } = _;
        T.length &&
            k & 7 &&
            (r && T.some(so) && (x = Pv(x, r)), (_ = Kt(_, x, !1, !0)));
    }
    return (
        n.dirs &&
            ((_ = Kt(_, null, !1, !0)),
            (_.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (_.transition = n.transition),
        (C = _),
        Sa(p),
        C
    );
}
function Ev(e, t = !0) {
    let n;
    for (let l = 0; l < e.length; l++) {
        const a = e[l];
        if (Bl(a)) {
            if (a.type !== tt || a.children === "v-if") {
                if (n) return;
                n = a;
            }
        } else return;
    }
    return n;
}
const Tv = (e) => {
        let t;
        for (const n in e)
            (n === "class" || n === "style" || Ba(n)) &&
                ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Pv = (e, t) => {
        const n = {};
        for (const l in e) (!so(l) || !(l.slice(9) in t)) && (n[l] = e[l]);
        return n;
    };
function Iv(e, t, n) {
    const { props: l, children: a, component: r } = e,
        { props: o, children: i, patchFlag: s } = t,
        u = r.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && s >= 0) {
        if (s & 1024) return !0;
        if (s & 16) return l ? Ei(l, o, u) : !!o;
        if (s & 8) {
            const c = t.dynamicProps;
            for (let d = 0; d < c.length; d++) {
                const f = c[d];
                if (o[f] !== l[f] && !$a(u, f)) return !0;
            }
        }
    } else
        return (a || i) && (!i || !i.$stable)
            ? !0
            : l === o
            ? !1
            : l
            ? o
                ? Ei(l, o, u)
                : !0
            : !!o;
    return !1;
}
function Ei(e, t, n) {
    const l = Object.keys(t);
    if (l.length !== Object.keys(e).length) return !0;
    for (let a = 0; a < l.length; a++) {
        const r = l[a];
        if (t[r] !== e[r] && !$a(n, r)) return !0;
    }
    return !1;
}
function Mo({ vnode: e, parent: t }, n) {
    for (; t; ) {
        const l = t.subTree;
        if (
            (l.suspense && l.suspense.activeBranch === e && (l.el = e.el),
            l === e)
        )
            ((e = t.vnode).el = n), (t = t.parent);
        else break;
    }
}
const Eo = "components",
    Vv = "directives";
function Rv(e, t) {
    return To(Eo, e, !0, t) || e;
}
const Lv = Symbol.for("v-ndc");
function Ov(e) {
    return (De(e) && To(Eo, e, !1)) || e;
}
function Rn(e) {
    return To(Vv, e);
}
function To(e, t, n = !0, l = !1) {
    const a = rt || Je;
    if (a) {
        const r = a.type;
        if (e === Eo) {
            const i = Vm(r, !1);
            if (i && (i === t || i === Ct(t) || i === sl(Ct(t)))) return r;
        }
        const o = Ti(a[e] || r[e], t) || Ti(a.appContext[e], t);
        return !o && l ? r : o;
    }
}
function Ti(e, t) {
    return e && (e[t] || e[Ct(t)] || e[sl(Ct(t))]);
}
const Fv = (e) => e.__isSuspense;
let Rr = 0;
const Bv = {
        name: "Suspense",
        __isSuspense: !0,
        process(e, t, n, l, a, r, o, i, s, u) {
            if (e == null) Hv(t, n, l, a, r, o, i, s, u);
            else {
                if (r && r.deps > 0 && !e.suspense.isInFallback) {
                    (t.suspense = e.suspense),
                        (t.suspense.vnode = t),
                        (t.el = e.el);
                    return;
                }
                Nv(e, t, n, l, a, o, i, s, u);
            }
        },
        hydrate: $v,
        create: Po,
        normalize: Gv,
    },
    Dv = Bv;
function Ol(e, t) {
    const n = e.props && e.props[t];
    ge(n) && n();
}
function Hv(e, t, n, l, a, r, o, i, s) {
    const {
            p: u,
            o: { createElement: c },
        } = s,
        d = c("div"),
        f = (e.suspense = Po(e, a, l, t, d, n, r, o, i, s));
    u(null, (f.pendingBranch = e.ssContent), d, null, l, f, r, o),
        f.deps > 0
            ? (Ol(e, "onPending"),
              Ol(e, "onFallback"),
              u(null, e.ssFallback, t, n, l, null, r, o),
              Kn(f, e.ssFallback))
            : f.resolve(!1, !0);
}
function Nv(e, t, n, l, a, r, o, i, { p: s, um: u, o: { createElement: c } }) {
    const d = (t.suspense = e.suspense);
    (d.vnode = t), (t.el = e.el);
    const f = t.ssContent,
        v = t.ssFallback,
        {
            activeBranch: g,
            pendingBranch: m,
            isInFallback: p,
            isHydrating: C,
        } = d;
    if (m)
        (d.pendingBranch = f),
            Lt(f, m)
                ? (s(m, f, d.hiddenContainer, null, a, d, r, o, i),
                  d.deps <= 0
                      ? d.resolve()
                      : p && (C || (s(g, v, n, l, a, null, r, o, i), Kn(d, v))))
                : ((d.pendingId = Rr++),
                  C ? ((d.isHydrating = !1), (d.activeBranch = m)) : u(m, a, d),
                  (d.deps = 0),
                  (d.effects.length = 0),
                  (d.hiddenContainer = c("div")),
                  p
                      ? (s(null, f, d.hiddenContainer, null, a, d, r, o, i),
                        d.deps <= 0
                            ? d.resolve()
                            : (s(g, v, n, l, a, null, r, o, i), Kn(d, v)))
                      : g && Lt(f, g)
                      ? (s(g, f, n, l, a, d, r, o, i), d.resolve(!0))
                      : (s(null, f, d.hiddenContainer, null, a, d, r, o, i),
                        d.deps <= 0 && d.resolve()));
    else if (g && Lt(f, g)) s(g, f, n, l, a, d, r, o, i), Kn(d, f);
    else if (
        (Ol(t, "onPending"),
        (d.pendingBranch = f),
        f.shapeFlag & 512
            ? (d.pendingId = f.component.suspenseId)
            : (d.pendingId = Rr++),
        s(null, f, d.hiddenContainer, null, a, d, r, o, i),
        d.deps <= 0)
    )
        d.resolve();
    else {
        const { timeout: x, pendingId: _ } = d;
        x > 0
            ? setTimeout(() => {
                  d.pendingId === _ && d.fallback(v);
              }, x)
            : x === 0 && d.fallback(v);
    }
}
function Po(e, t, n, l, a, r, o, i, s, u, c = !1) {
    const {
        p: d,
        m: f,
        um: v,
        n: g,
        o: { parentNode: m, remove: p },
    } = u;
    let C;
    const x = Xv(e);
    x && t && t.pendingBranch && ((C = t.pendingId), t.deps++);
    const _ = e.props ? Eu(e.props.timeout) : void 0,
        T = r,
        k = {
            vnode: e,
            parent: t,
            parentComponent: n,
            namespace: o,
            container: l,
            hiddenContainer: a,
            deps: 0,
            pendingId: Rr++,
            timeout: typeof _ == "number" ? _ : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !c,
            isHydrating: c,
            isUnmounted: !1,
            effects: [],
            resolve(A = !1, w = !1) {
                const {
                    vnode: L,
                    activeBranch: E,
                    pendingBranch: V,
                    pendingId: R,
                    effects: M,
                    parentComponent: B,
                    container: $,
                } = k;
                let Z = !1;
                k.isHydrating
                    ? (k.isHydrating = !1)
                    : A ||
                      ((Z =
                          E && V.transition && V.transition.mode === "out-in"),
                      Z &&
                          (E.transition.afterLeave = () => {
                              R === k.pendingId &&
                                  (f(V, $, r === T ? g(E) : r, 0), Vr(M));
                          }),
                      E &&
                          (m(E.el) !== k.hiddenContainer && (r = g(E)),
                          v(E, B, k, !0)),
                      Z || f(V, $, r, 0)),
                    Kn(k, V),
                    (k.pendingBranch = null),
                    (k.isInFallback = !1);
                let ee = k.parent,
                    ne = !1;
                for (; ee; ) {
                    if (ee.pendingBranch) {
                        ee.effects.push(...M), (ne = !0);
                        break;
                    }
                    ee = ee.parent;
                }
                !ne && !Z && Vr(M),
                    (k.effects = []),
                    x &&
                        t &&
                        t.pendingBranch &&
                        C === t.pendingId &&
                        (t.deps--, t.deps === 0 && !w && t.resolve()),
                    Ol(L, "onResolve");
            },
            fallback(A) {
                if (!k.pendingBranch) return;
                const {
                    vnode: w,
                    activeBranch: L,
                    parentComponent: E,
                    container: V,
                    namespace: R,
                } = k;
                Ol(w, "onFallback");
                const M = g(L),
                    B = () => {
                        k.isInFallback &&
                            (d(null, A, V, M, E, null, R, i, s), Kn(k, A));
                    },
                    $ = A.transition && A.transition.mode === "out-in";
                $ && (L.transition.afterLeave = B),
                    (k.isInFallback = !0),
                    v(L, E, null, !0),
                    $ || B();
            },
            move(A, w, L) {
                k.activeBranch && f(k.activeBranch, A, w, L), (k.container = A);
            },
            next() {
                return k.activeBranch && g(k.activeBranch);
            },
            registerDep(A, w, L) {
                const E = !!k.pendingBranch;
                E && k.deps++;
                const V = A.vnode.el;
                A.asyncDep
                    .catch((R) => {
                        Wl(R, A, 0);
                    })
                    .then((R) => {
                        if (
                            A.isUnmounted ||
                            k.isUnmounted ||
                            k.pendingId !== A.suspenseId
                        )
                            return;
                        A.asyncResolved = !0;
                        const { vnode: M } = A;
                        Gr(A, R, !1), V && (M.el = V);
                        const B = !V && A.subTree.el;
                        w(
                            A,
                            M,
                            m(V || A.subTree.el),
                            V ? null : g(A.subTree),
                            k,
                            o,
                            L
                        ),
                            B && p(B),
                            Mo(A, M.el),
                            E && --k.deps === 0 && k.resolve();
                    });
            },
            unmount(A, w) {
                (k.isUnmounted = !0),
                    k.activeBranch && v(k.activeBranch, n, A, w),
                    k.pendingBranch && v(k.pendingBranch, n, A, w);
            },
        };
    return k;
}
function $v(e, t, n, l, a, r, o, i, s) {
    const u = (t.suspense = Po(
            t,
            l,
            n,
            e.parentNode,
            document.createElement("div"),
            null,
            a,
            r,
            o,
            i,
            !0
        )),
        c = s(e, (u.pendingBranch = t.ssContent), n, u, r, o);
    return u.deps === 0 && u.resolve(!1, !0), c;
}
function Gv(e) {
    const { shapeFlag: t, children: n } = e,
        l = t & 32;
    (e.ssContent = Pi(l ? n.default : n)),
        (e.ssFallback = l ? Pi(n.fallback) : h(tt));
}
function Pi(e) {
    let t;
    if (ge(e)) {
        const n = Zn && e._c;
        n && ((e._d = !1), Ke()), (e = e()), n && ((e._d = !0), (t = bt), wc());
    }
    return (
        ve(e) && (e = Ev(e)),
        (e = xt(e)),
        t &&
            !e.dynamicChildren &&
            (e.dynamicChildren = t.filter((n) => n !== e)),
        e
    );
}
function zv(e, t) {
    t && t.pendingBranch
        ? ve(e)
            ? t.effects.push(...e)
            : t.effects.push(e)
        : Vr(e);
}
function Kn(e, t) {
    e.activeBranch = t;
    const { vnode: n, parentComponent: l } = e;
    let a = t.el;
    for (; !a && t.component; ) (t = t.component.subTree), (a = t.el);
    (n.el = a), l && l.subTree === n && ((l.vnode.el = a), Mo(l, a));
}
function Xv(e) {
    const t = e.props && e.props.suspensible;
    return t != null && t !== !1;
}
function za(e, t, n = Je, l = !1) {
    if (n) {
        const a = n[e] || (n[e] = []),
            r =
                t.__weh ||
                (t.__weh = (...o) => {
                    gn();
                    const i = Kl(n),
                        s = St(t, n, e, o);
                    return i(), yn(), s;
                });
        return l ? a.unshift(r) : a.push(r), r;
    }
}
const qt =
        (e) =>
        (t, n = Je) => {
            (!ja || e === "sp") && za(e, (...l) => t(...l), n);
        },
    Io = qt("bm"),
    Qt = qt("m"),
    jv = qt("bu"),
    Vo = qt("u"),
    ht = qt("bum"),
    nc = qt("um"),
    Wv = qt("sp"),
    Uv = qt("rtg"),
    Kv = qt("rtc");
function Yv(e, t = Je) {
    za("ec", e, t);
}
function ut(e, t) {
    if (rt === null) return e;
    const n = Wa(rt),
        l = e.dirs || (e.dirs = []);
    for (let a = 0; a < t.length; a++) {
        let [r, o, i, s = Oe] = t[a];
        r &&
            (ge(r) && (r = { mounted: r, updated: r }),
            r.deep && un(o),
            l.push({
                dir: r,
                instance: n,
                value: o,
                oldValue: void 0,
                arg: i,
                modifiers: s,
            }));
    }
    return e;
}
function Cn(e, t, n, l) {
    const a = e.dirs,
        r = t && t.dirs;
    for (let o = 0; o < a.length; o++) {
        const i = a[o];
        r && (i.oldValue = r[o].value);
        let s = i.dir[l];
        s && (gn(), St(s, n, 8, [e.el, i, e, t]), yn());
    }
}
function Lr(e, t, n, l) {
    let a;
    const r = n;
    if (ve(e) || De(e)) {
        a = new Array(e.length);
        for (let o = 0, i = e.length; o < i; o++) a[o] = t(e[o], o, void 0, r);
    } else if (typeof e == "number") {
        a = new Array(e);
        for (let o = 0; o < e; o++) a[o] = t(o + 1, o, void 0, r);
    } else if (Re(e))
        if (e[Symbol.iterator]) a = Array.from(e, (o, i) => t(o, i, void 0, r));
        else {
            const o = Object.keys(e);
            a = new Array(o.length);
            for (let i = 0, s = o.length; i < s; i++) {
                const u = o[i];
                a[i] = t(e[u], u, i, r);
            }
        }
    else a = [];
    return a;
}
/*! #__NO_SIDE_EFFECTS__ */ function Ro(e, t) {
    return ge(e) ? $e({ name: e.name }, t, { setup: e }) : e;
}
const fa = (e) => !!e.type.__asyncLoader,
    Or = (e) => (e ? (xc(e) ? Wa(e) : Or(e.parent)) : null),
    _l = $e(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Or(e.parent),
        $root: (e) => Or(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Lo(e),
        $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
                (e.effect.dirty = !0), Ao(e.update);
            }),
        $nextTick: (e) => e.n || (e.n = Ge.bind(e.proxy)),
        $watch: (e) => hm.bind(e),
    }),
    rr = (e, t) => e !== Oe && !e.__isScriptSetup && xe(e, t),
    qv = {
        get({ _: e }, t) {
            if (t === "__v_skip") return !0;
            const {
                ctx: n,
                setupState: l,
                data: a,
                props: r,
                accessCache: o,
                type: i,
                appContext: s,
            } = e;
            let u;
            if (t[0] !== "$") {
                const v = o[t];
                if (v !== void 0)
                    switch (v) {
                        case 1:
                            return l[t];
                        case 2:
                            return a[t];
                        case 4:
                            return n[t];
                        case 3:
                            return r[t];
                    }
                else {
                    if (rr(l, t)) return (o[t] = 1), l[t];
                    if (a !== Oe && xe(a, t)) return (o[t] = 2), a[t];
                    if ((u = e.propsOptions[0]) && xe(u, t))
                        return (o[t] = 3), r[t];
                    if (n !== Oe && xe(n, t)) return (o[t] = 4), n[t];
                    Fr && (o[t] = 0);
                }
            }
            const c = _l[t];
            let d, f;
            if (c) return t === "$attrs" && st(e.attrs, "get", ""), c(e);
            if ((d = i.__cssModules) && (d = d[t])) return d;
            if (n !== Oe && xe(n, t)) return (o[t] = 4), n[t];
            if (((f = s.config.globalProperties), xe(f, t))) return f[t];
        },
        set({ _: e }, t, n) {
            const { data: l, setupState: a, ctx: r } = e;
            return rr(a, t)
                ? ((a[t] = n), !0)
                : l !== Oe && xe(l, t)
                ? ((l[t] = n), !0)
                : xe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((r[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: l,
                    appContext: a,
                    propsOptions: r,
                },
            },
            o
        ) {
            let i;
            return (
                !!n[o] ||
                (e !== Oe && xe(e, o)) ||
                rr(t, o) ||
                ((i = r[0]) && xe(i, o)) ||
                xe(l, o) ||
                xe(_l, o) ||
                xe(a.config.globalProperties, o)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : xe(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
function Ii(e) {
    return ve(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Fr = !0;
function Qv(e) {
    const t = Lo(e),
        n = e.proxy,
        l = e.ctx;
    (Fr = !1), t.beforeCreate && Vi(t.beforeCreate, e, "bc");
    const {
        data: a,
        computed: r,
        methods: o,
        watch: i,
        provide: s,
        inject: u,
        created: c,
        beforeMount: d,
        mounted: f,
        beforeUpdate: v,
        updated: g,
        activated: m,
        deactivated: p,
        beforeDestroy: C,
        beforeUnmount: x,
        destroyed: _,
        unmounted: T,
        render: k,
        renderTracked: A,
        renderTriggered: w,
        errorCaptured: L,
        serverPrefetch: E,
        expose: V,
        inheritAttrs: R,
        components: M,
        directives: B,
        filters: $,
    } = t;
    if ((u && Zv(u, l, null), o))
        for (const ne in o) {
            const H = o[ne];
            ge(H) && (l[ne] = H.bind(n));
        }
    if (a) {
        const ne = a.call(n, n);
        Re(ne) && (e.data = Ze(ne));
    }
    if (((Fr = !0), r))
        for (const ne in r) {
            const H = r[ne],
                X = ge(H) ? H.bind(n, n) : ge(H.get) ? H.get.bind(n, n) : pt,
                F = !ge(H) && ge(H.set) ? H.set.bind(n) : pt,
                z = S({ get: X, set: F });
            Object.defineProperty(l, ne, {
                enumerable: !0,
                configurable: !0,
                get: () => z.value,
                set: (J) => (z.value = J),
            });
        }
    if (i) for (const ne in i) lc(i[ne], l, n, ne);
    if (s) {
        const ne = ge(s) ? s.call(n) : s;
        Reflect.ownKeys(ne).forEach((H) => {
            qe(H, ne[H]);
        });
    }
    c && Vi(c, e, "c");
    function ee(ne, H) {
        ve(H) ? H.forEach((X) => ne(X.bind(n))) : H && ne(H.bind(n));
    }
    if (
        (ee(Io, d),
        ee(Qt, f),
        ee(jv, v),
        ee(Vo, g),
        ee(hc, m),
        ee(gc, p),
        ee(Yv, L),
        ee(Kv, A),
        ee(Uv, w),
        ee(ht, x),
        ee(nc, T),
        ee(Wv, E),
        ve(V))
    )
        if (V.length) {
            const ne = e.exposed || (e.exposed = {});
            V.forEach((H) => {
                Object.defineProperty(ne, H, {
                    get: () => n[H],
                    set: (X) => (n[H] = X),
                });
            });
        } else e.exposed || (e.exposed = {});
    k && e.render === pt && (e.render = k),
        R != null && (e.inheritAttrs = R),
        M && (e.components = M),
        B && (e.directives = B);
}
function Zv(e, t, n = pt) {
    ve(e) && (e = Br(e));
    for (const l in e) {
        const a = e[l];
        let r;
        Re(a)
            ? "default" in a
                ? (r = Pe(a.from || l, a.default, !0))
                : (r = Pe(a.from || l))
            : (r = Pe(a)),
            He(r)
                ? Object.defineProperty(t, l, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => r.value,
                      set: (o) => (r.value = o),
                  })
                : (t[l] = r);
    }
}
function Vi(e, t, n) {
    St(ve(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function lc(e, t, n, l) {
    const a = l.includes(".") ? mc(n, l) : () => n[l];
    if (De(e)) {
        const r = t[e];
        ge(r) && ue(a, r);
    } else if (ge(e)) ue(a, e.bind(n));
    else if (Re(e))
        if (ve(e)) e.forEach((r) => lc(r, t, n, l));
        else {
            const r = ge(e.handler) ? e.handler.bind(n) : t[e.handler];
            ge(r) && ue(a, r, e);
        }
}
function Lo(e) {
    const t = e.type,
        { mixins: n, extends: l } = t,
        {
            mixins: a,
            optionsCache: r,
            config: { optionMergeStrategies: o },
        } = e.appContext,
        i = r.get(t);
    let s;
    return (
        i
            ? (s = i)
            : !a.length && !n && !l
            ? (s = t)
            : ((s = {}),
              a.length && a.forEach((u) => Ca(s, u, o, !0)),
              Ca(s, t, o)),
        Re(t) && r.set(t, s),
        s
    );
}
function Ca(e, t, n, l = !1) {
    const { mixins: a, extends: r } = t;
    r && Ca(e, r, n, !0), a && a.forEach((o) => Ca(e, o, n, !0));
    for (const o in t)
        if (!(l && o === "expose")) {
            const i = Jv[o] || (n && n[o]);
            e[o] = i ? i(e[o], t[o]) : t[o];
        }
    return e;
}
const Jv = {
    data: Ri,
    props: Li,
    emits: Li,
    methods: Cl,
    computed: Cl,
    beforeCreate: lt,
    created: lt,
    beforeMount: lt,
    mounted: lt,
    beforeUpdate: lt,
    updated: lt,
    beforeDestroy: lt,
    beforeUnmount: lt,
    destroyed: lt,
    unmounted: lt,
    activated: lt,
    deactivated: lt,
    errorCaptured: lt,
    serverPrefetch: lt,
    components: Cl,
    directives: Cl,
    watch: tm,
    provide: Ri,
    inject: em,
};
function Ri(e, t) {
    return t
        ? e
            ? function () {
                  return $e(
                      ge(e) ? e.call(this, this) : e,
                      ge(t) ? t.call(this, this) : t
                  );
              }
            : t
        : e;
}
function em(e, t) {
    return Cl(Br(e), Br(t));
}
function Br(e) {
    if (ve(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function lt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Cl(e, t) {
    return e ? $e(Object.create(null), e, t) : t;
}
function Li(e, t) {
    return e
        ? ve(e) && ve(t)
            ? [...new Set([...e, ...t])]
            : $e(Object.create(null), Ii(e), Ii(t ?? {}))
        : t;
}
function tm(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = $e(Object.create(null), e);
    for (const l in t) n[l] = lt(e[l], t[l]);
    return n;
}
function ac() {
    return {
        app: null,
        config: {
            isNativeTag: Bf,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let nm = 0;
function lm(e, t) {
    return function (l, a = null) {
        ge(l) || (l = $e({}, l)), a != null && !Re(a) && (a = null);
        const r = ac(),
            o = new WeakSet();
        let i = !1;
        const s = (r.app = {
            _uid: nm++,
            _component: l,
            _props: a,
            _container: null,
            _context: r,
            _instance: null,
            version: Lm,
            get config() {
                return r.config;
            },
            set config(u) {},
            use(u, ...c) {
                return (
                    o.has(u) ||
                        (u && ge(u.install)
                            ? (o.add(u), u.install(s, ...c))
                            : ge(u) && (o.add(u), u(s, ...c))),
                    s
                );
            },
            mixin(u) {
                return r.mixins.includes(u) || r.mixins.push(u), s;
            },
            component(u, c) {
                return c ? ((r.components[u] = c), s) : r.components[u];
            },
            directive(u, c) {
                return c ? ((r.directives[u] = c), s) : r.directives[u];
            },
            mount(u, c, d) {
                if (!i) {
                    const f = h(l, a);
                    return (
                        (f.appContext = r),
                        d === !0 ? (d = "svg") : d === !1 && (d = void 0),
                        c && t ? t(f, u) : e(f, u, d),
                        (i = !0),
                        (s._container = u),
                        (u.__vue_app__ = s),
                        Wa(f.component)
                    );
                }
            },
            unmount() {
                i && (e(null, s._container), delete s._container.__vue_app__);
            },
            provide(u, c) {
                return (r.provides[u] = c), s;
            },
            runWithContext(u) {
                const c = xl;
                xl = s;
                try {
                    return u();
                } finally {
                    xl = c;
                }
            },
        });
        return s;
    };
}
let xl = null;
function qe(e, t) {
    if (Je) {
        let n = Je.provides;
        const l = Je.parent && Je.parent.provides;
        l === n && (n = Je.provides = Object.create(l)), (n[e] = t);
    }
}
function Pe(e, t, n = !1) {
    const l = Je || rt;
    if (l || xl) {
        const a = l
            ? l.parent == null
                ? l.vnode.appContext && l.vnode.appContext.provides
                : l.parent.provides
            : xl._context.provides;
        if (a && e in a) return a[e];
        if (arguments.length > 1) return n && ge(t) ? t.call(l && l.proxy) : t;
    }
}
const rc = {},
    oc = () => Object.create(rc),
    ic = (e) => Object.getPrototypeOf(e) === rc;
function am(e, t, n, l = !1) {
    const a = {},
        r = oc();
    (e.propsDefaults = Object.create(null)), sc(e, t, a, r);
    for (const o in e.propsOptions[0]) o in a || (a[o] = void 0);
    n
        ? (e.props = l ? a : Xu(a))
        : e.type.props
        ? (e.props = a)
        : (e.props = r),
        (e.attrs = r);
}
function rm(e, t, n, l) {
    const {
            props: a,
            attrs: r,
            vnode: { patchFlag: o },
        } = e,
        i = ye(a),
        [s] = e.propsOptions;
    let u = !1;
    if ((l || o > 0) && !(o & 16)) {
        if (o & 8) {
            const c = e.vnode.dynamicProps;
            for (let d = 0; d < c.length; d++) {
                let f = c[d];
                if ($a(e.emitsOptions, f)) continue;
                const v = t[f];
                if (s)
                    if (xe(r, f)) v !== r[f] && ((r[f] = v), (u = !0));
                    else {
                        const g = Ct(f);
                        a[g] = Dr(s, i, g, v, e, !1);
                    }
                else v !== r[f] && ((r[f] = v), (u = !0));
            }
        }
    } else {
        sc(e, t, a, r) && (u = !0);
        let c;
        for (const d in i)
            (!t || (!xe(t, d) && ((c = il(d)) === d || !xe(t, c)))) &&
                (s
                    ? n &&
                      (n[d] !== void 0 || n[c] !== void 0) &&
                      (a[d] = Dr(s, i, d, void 0, e, !0))
                    : delete a[d]);
        if (r !== i)
            for (const d in r) (!t || !xe(t, d)) && (delete r[d], (u = !0));
    }
    u && Wt(e.attrs, "set", "");
}
function sc(e, t, n, l) {
    const [a, r] = e.propsOptions;
    let o = !1,
        i;
    if (t)
        for (let s in t) {
            if (kl(s)) continue;
            const u = t[s];
            let c;
            a && xe(a, (c = Ct(s)))
                ? !r || !r.includes(c)
                    ? (n[c] = u)
                    : ((i || (i = {}))[c] = u)
                : $a(e.emitsOptions, s) ||
                  ((!(s in l) || u !== l[s]) && ((l[s] = u), (o = !0)));
        }
    if (r) {
        const s = ye(n),
            u = i || Oe;
        for (let c = 0; c < r.length; c++) {
            const d = r[c];
            n[d] = Dr(a, s, d, u[d], e, !xe(u, d));
        }
    }
    return o;
}
function Dr(e, t, n, l, a, r) {
    const o = e[n];
    if (o != null) {
        const i = xe(o, "default");
        if (i && l === void 0) {
            const s = o.default;
            if (o.type !== Function && !o.skipFactory && ge(s)) {
                const { propsDefaults: u } = a;
                if (n in u) l = u[n];
                else {
                    const c = Kl(a);
                    (l = u[n] = s.call(null, t)), c();
                }
            } else l = s;
        }
        o[0] &&
            (r && !i
                ? (l = !1)
                : o[1] && (l === "" || l === il(n)) && (l = !0));
    }
    return l;
}
function uc(e, t, n = !1) {
    const l = t.propsCache,
        a = l.get(e);
    if (a) return a;
    const r = e.props,
        o = {},
        i = [];
    let s = !1;
    if (!ge(e)) {
        const c = (d) => {
            s = !0;
            const [f, v] = uc(d, t, !0);
            $e(o, f), v && i.push(...v);
        };
        !n && t.mixins.length && t.mixins.forEach(c),
            e.extends && c(e.extends),
            e.mixins && e.mixins.forEach(c);
    }
    if (!r && !s) return Re(e) && l.set(e, jn), jn;
    if (ve(r))
        for (let c = 0; c < r.length; c++) {
            const d = Ct(r[c]);
            Oi(d) && (o[d] = Oe);
        }
    else if (r)
        for (const c in r) {
            const d = Ct(c);
            if (Oi(d)) {
                const f = r[c],
                    v = (o[d] = ve(f) || ge(f) ? { type: f } : $e({}, f));
                if (v) {
                    const g = Di(Boolean, v.type),
                        m = Di(String, v.type);
                    (v[0] = g > -1),
                        (v[1] = m < 0 || g < m),
                        (g > -1 || xe(v, "default")) && i.push(d);
                }
            }
        }
    const u = [o, i];
    return Re(e) && l.set(e, u), u;
}
function Oi(e) {
    return e[0] !== "$" && !kl(e);
}
function Fi(e) {
    return e === null
        ? "null"
        : typeof e == "function"
        ? e.name || ""
        : (typeof e == "object" && e.constructor && e.constructor.name) || "";
}
function Bi(e, t) {
    return Fi(e) === Fi(t);
}
function Di(e, t) {
    return ve(t) ? t.findIndex((n) => Bi(n, e)) : ge(t) && Bi(t, e) ? 0 : -1;
}
const cc = (e) => e[0] === "_" || e === "$stable",
    Oo = (e) => (ve(e) ? e.map(xt) : [xt(e)]),
    om = (e, t, n) => {
        if (t._n) return t;
        const l = Ye((...a) => Oo(t(...a)), n);
        return (l._c = !1), l;
    },
    dc = (e, t, n) => {
        const l = e._ctx;
        for (const a in e) {
            if (cc(a)) continue;
            const r = e[a];
            if (ge(r)) t[a] = om(a, r, l);
            else if (r != null) {
                const o = Oo(r);
                t[a] = () => o;
            }
        }
    },
    fc = (e, t) => {
        const n = Oo(t);
        e.slots.default = () => n;
    },
    im = (e, t) => {
        const n = (e.slots = oc());
        if (e.vnode.shapeFlag & 32) {
            const l = t._;
            l ? ($e(n, t), Mu(n, "_", l, !0)) : dc(t, n);
        } else t && fc(e, t);
    },
    sm = (e, t, n) => {
        const { vnode: l, slots: a } = e;
        let r = !0,
            o = Oe;
        if (l.shapeFlag & 32) {
            const i = t._;
            i
                ? n && i === 1
                    ? (r = !1)
                    : ($e(a, t), !n && i === 1 && delete a._)
                : ((r = !t.$stable), dc(t, a)),
                (o = t);
        } else t && (fc(e, t), (o = { default: 1 }));
        if (r) for (const i in a) !cc(i) && o[i] == null && delete a[i];
    };
function Hr(e, t, n, l, a = !1) {
    if (ve(e)) {
        e.forEach((f, v) => Hr(f, t && (ve(t) ? t[v] : t), n, l, a));
        return;
    }
    if (fa(l) && !a) return;
    const r = l.shapeFlag & 4 ? Wa(l.component) : l.el,
        o = a ? null : r,
        { i, r: s } = e,
        u = t && t.r,
        c = i.refs === Oe ? (i.refs = {}) : i.refs,
        d = i.setupState;
    if (
        (u != null &&
            u !== s &&
            (De(u)
                ? ((c[u] = null), xe(d, u) && (d[u] = null))
                : He(u) && (u.value = null)),
        ge(s))
    )
        fn(s, i, 12, [o, c]);
    else {
        const f = De(s),
            v = He(s);
        if (f || v) {
            const g = () => {
                if (e.f) {
                    const m = f ? (xe(d, s) ? d[s] : c[s]) : s.value;
                    a
                        ? ve(m) && uo(m, r)
                        : ve(m)
                        ? m.includes(r) || m.push(r)
                        : f
                        ? ((c[s] = [r]), xe(d, s) && (d[s] = c[s]))
                        : ((s.value = [r]), e.k && (c[e.k] = s.value));
                } else
                    f
                        ? ((c[s] = o), xe(d, s) && (d[s] = o))
                        : v && ((s.value = o), e.k && (c[e.k] = o));
            };
            o ? ((g.id = -1), at(g, n)) : g();
        }
    }
}
const at = zv;
function um(e) {
    return cm(e);
}
function cm(e, t) {
    const n = Tu();
    n.__VUE__ = !0;
    const {
            insert: l,
            remove: a,
            patchProp: r,
            createElement: o,
            createText: i,
            createComment: s,
            setText: u,
            setElementText: c,
            parentNode: d,
            nextSibling: f,
            setScopeId: v = pt,
            insertStaticContent: g,
        } = e,
        m = (
            y,
            b,
            P,
            D = null,
            O = null,
            U = null,
            Y = void 0,
            K = null,
            Q = !!b.dynamicChildren
        ) => {
            if (y === b) return;
            y && !Lt(y, b) && ((D = I(y)), J(y, O, U, !0), (y = null)),
                b.patchFlag === -2 && ((Q = !1), (b.dynamicChildren = null));
            const { type: G, ref: te, shapeFlag: fe } = b;
            switch (G) {
                case Ul:
                    p(y, b, P, D);
                    break;
                case tt:
                    C(y, b, P, D);
                    break;
                case sr:
                    y == null && x(b, P, D, Y);
                    break;
                case we:
                    M(y, b, P, D, O, U, Y, K, Q);
                    break;
                default:
                    fe & 1
                        ? k(y, b, P, D, O, U, Y, K, Q)
                        : fe & 6
                        ? B(y, b, P, D, O, U, Y, K, Q)
                        : (fe & 64 || fe & 128) &&
                          G.process(y, b, P, D, O, U, Y, K, Q, N);
            }
            te != null && O && Hr(te, y && y.ref, U, b || y, !b);
        },
        p = (y, b, P, D) => {
            if (y == null) l((b.el = i(b.children)), P, D);
            else {
                const O = (b.el = y.el);
                b.children !== y.children && u(O, b.children);
            }
        },
        C = (y, b, P, D) => {
            y == null ? l((b.el = s(b.children || "")), P, D) : (b.el = y.el);
        },
        x = (y, b, P, D) => {
            [y.el, y.anchor] = g(y.children, b, P, D, y.el, y.anchor);
        },
        _ = ({ el: y, anchor: b }, P, D) => {
            let O;
            for (; y && y !== b; ) (O = f(y)), l(y, P, D), (y = O);
            l(b, P, D);
        },
        T = ({ el: y, anchor: b }) => {
            let P;
            for (; y && y !== b; ) (P = f(y)), a(y), (y = P);
            a(b);
        },
        k = (y, b, P, D, O, U, Y, K, Q) => {
            b.type === "svg"
                ? (Y = "svg")
                : b.type === "math" && (Y = "mathml"),
                y == null ? A(b, P, D, O, U, Y, K, Q) : E(y, b, O, U, Y, K, Q);
        },
        A = (y, b, P, D, O, U, Y, K) => {
            let Q, G;
            const { props: te, shapeFlag: fe, transition: se, dirs: be } = y;
            if (
                ((Q = y.el = o(y.type, U, te && te.is, te)),
                fe & 8
                    ? c(Q, y.children)
                    : fe & 16 && L(y.children, Q, null, D, O, or(y, U), Y, K),
                be && Cn(y, null, D, "created"),
                w(Q, y, y.scopeId, Y, D),
                te)
            ) {
                for (const Le in te)
                    Le !== "value" &&
                        !kl(Le) &&
                        r(Q, Le, null, te[Le], U, y.children, D, O, ae);
                "value" in te && r(Q, "value", null, te.value, U),
                    (G = te.onVnodeBeforeMount) && Vt(G, D, y);
            }
            be && Cn(y, null, D, "beforeMount");
            const _e = dm(O, se);
            _e && se.beforeEnter(Q),
                l(Q, b, P),
                ((G = te && te.onVnodeMounted) || _e || be) &&
                    at(() => {
                        G && Vt(G, D, y),
                            _e && se.enter(Q),
                            be && Cn(y, null, D, "mounted");
                    }, O);
        },
        w = (y, b, P, D, O) => {
            if ((P && v(y, P), D))
                for (let U = 0; U < D.length; U++) v(y, D[U]);
            if (O) {
                let U = O.subTree;
                if (b === U) {
                    const Y = O.vnode;
                    w(y, Y, Y.scopeId, Y.slotScopeIds, O.parent);
                }
            }
        },
        L = (y, b, P, D, O, U, Y, K, Q = 0) => {
            for (let G = Q; G < y.length; G++) {
                const te = (y[G] = K ? on(y[G]) : xt(y[G]));
                m(null, te, b, P, D, O, U, Y, K);
            }
        },
        E = (y, b, P, D, O, U, Y) => {
            const K = (b.el = y.el);
            let { patchFlag: Q, dynamicChildren: G, dirs: te } = b;
            Q |= y.patchFlag & 16;
            const fe = y.props || Oe,
                se = b.props || Oe;
            let be;
            if (
                (P && kn(P, !1),
                (be = se.onVnodeBeforeUpdate) && Vt(be, P, b, y),
                te && Cn(b, y, P, "beforeUpdate"),
                P && kn(P, !0),
                G
                    ? V(y.dynamicChildren, G, K, P, D, or(b, O), U)
                    : Y || H(y, b, K, null, P, D, or(b, O), U, !1),
                Q > 0)
            ) {
                if (Q & 16) R(K, b, fe, se, P, D, O);
                else if (
                    (Q & 2 &&
                        fe.class !== se.class &&
                        r(K, "class", null, se.class, O),
                    Q & 4 && r(K, "style", fe.style, se.style, O),
                    Q & 8)
                ) {
                    const _e = b.dynamicProps;
                    for (let Le = 0; Le < _e.length; Le++) {
                        const Me = _e[Le],
                            Ue = fe[Me],
                            At = se[Me];
                        (At !== Ue || Me === "value") &&
                            r(K, Me, Ue, At, O, y.children, P, D, ae);
                    }
                }
                Q & 1 && y.children !== b.children && c(K, b.children);
            } else !Y && G == null && R(K, b, fe, se, P, D, O);
            ((be = se.onVnodeUpdated) || te) &&
                at(() => {
                    be && Vt(be, P, b, y), te && Cn(b, y, P, "updated");
                }, D);
        },
        V = (y, b, P, D, O, U, Y) => {
            for (let K = 0; K < b.length; K++) {
                const Q = y[K],
                    G = b[K],
                    te =
                        Q.el && (Q.type === we || !Lt(Q, G) || Q.shapeFlag & 70)
                            ? d(Q.el)
                            : P;
                m(Q, G, te, null, D, O, U, Y, !0);
            }
        },
        R = (y, b, P, D, O, U, Y) => {
            if (P !== D) {
                if (P !== Oe)
                    for (const K in P)
                        !kl(K) &&
                            !(K in D) &&
                            r(y, K, P[K], null, Y, b.children, O, U, ae);
                for (const K in D) {
                    if (kl(K)) continue;
                    const Q = D[K],
                        G = P[K];
                    Q !== G &&
                        K !== "value" &&
                        r(y, K, G, Q, Y, b.children, O, U, ae);
                }
                "value" in D && r(y, "value", P.value, D.value, Y);
            }
        },
        M = (y, b, P, D, O, U, Y, K, Q) => {
            const G = (b.el = y ? y.el : i("")),
                te = (b.anchor = y ? y.anchor : i(""));
            let { patchFlag: fe, dynamicChildren: se, slotScopeIds: be } = b;
            be && (K = K ? K.concat(be) : be),
                y == null
                    ? (l(G, P, D),
                      l(te, P, D),
                      L(b.children || [], P, te, O, U, Y, K, Q))
                    : fe > 0 && fe & 64 && se && y.dynamicChildren
                    ? (V(y.dynamicChildren, se, P, O, U, Y, K),
                      (b.key != null || (O && b === O.subTree)) && Fo(y, b, !0))
                    : H(y, b, P, te, O, U, Y, K, Q);
        },
        B = (y, b, P, D, O, U, Y, K, Q) => {
            (b.slotScopeIds = K),
                y == null
                    ? b.shapeFlag & 512
                        ? O.ctx.activate(b, P, D, Y, Q)
                        : $(b, P, D, O, U, Y, Q)
                    : Z(y, b, Q);
        },
        $ = (y, b, P, D, O, U, Y) => {
            const K = (y.component = Mm(y, D, O));
            if ((Xa(y) && (K.ctx.renderer = N), Em(K), K.asyncDep)) {
                if ((O && O.registerDep(K, ee, Y), !y.el)) {
                    const Q = (K.subTree = h(tt));
                    C(null, Q, b, P);
                }
            } else ee(K, y, b, P, O, U, Y);
        },
        Z = (y, b, P) => {
            const D = (b.component = y.component);
            if (Iv(y, b, P))
                if (D.asyncDep && !D.asyncResolved) {
                    ne(D, b, P);
                    return;
                } else
                    (D.next = b),
                        _v(D.update),
                        (D.effect.dirty = !0),
                        D.update();
            else (b.el = y.el), (D.vnode = b);
        },
        ee = (y, b, P, D, O, U, Y) => {
            const K = () => {
                    if (y.isMounted) {
                        let {
                            next: te,
                            bu: fe,
                            u: se,
                            parent: be,
                            vnode: _e,
                        } = y;
                        {
                            const Hn = vc(y);
                            if (Hn) {
                                te && ((te.el = _e.el), ne(y, te, Y)),
                                    Hn.asyncDep.then(() => {
                                        y.isUnmounted || K();
                                    });
                                return;
                            }
                        }
                        let Le = te,
                            Me;
                        kn(y, !1),
                            te ? ((te.el = _e.el), ne(y, te, Y)) : (te = _e),
                            fe && nr(fe),
                            (Me = te.props && te.props.onVnodeBeforeUpdate) &&
                                Vt(Me, be, te, _e),
                            kn(y, !0);
                        const Ue = ar(y),
                            At = y.subTree;
                        (y.subTree = Ue),
                            m(At, Ue, d(At.el), I(At), y, O, U),
                            (te.el = Ue.el),
                            Le === null && Mo(y, Ue.el),
                            se && at(se, O),
                            (Me = te.props && te.props.onVnodeUpdated) &&
                                at(() => Vt(Me, be, te, _e), O);
                    } else {
                        let te;
                        const { el: fe, props: se } = b,
                            { bm: be, m: _e, parent: Le } = y,
                            Me = fa(b);
                        if (
                            (kn(y, !1),
                            be && nr(be),
                            !Me &&
                                (te = se && se.onVnodeBeforeMount) &&
                                Vt(te, Le, b),
                            kn(y, !0),
                            fe && he)
                        ) {
                            const Ue = () => {
                                (y.subTree = ar(y)),
                                    he(fe, y.subTree, y, O, null);
                            };
                            Me
                                ? b.type
                                      .__asyncLoader()
                                      .then(() => !y.isUnmounted && Ue())
                                : Ue();
                        } else {
                            const Ue = (y.subTree = ar(y));
                            m(null, Ue, P, D, y, O, U), (b.el = Ue.el);
                        }
                        if (
                            (_e && at(_e, O),
                            !Me && (te = se && se.onVnodeMounted))
                        ) {
                            const Ue = b;
                            at(() => Vt(te, Le, Ue), O);
                        }
                        (b.shapeFlag & 256 ||
                            (Le && fa(Le.vnode) && Le.vnode.shapeFlag & 256)) &&
                            y.a &&
                            at(y.a, O),
                            (y.isMounted = !0),
                            (b = P = D = null);
                    }
                },
                Q = (y.effect = new ho(K, pt, () => Ao(G), y.scope)),
                G = (y.update = () => {
                    Q.dirty && Q.run();
                });
            (G.id = y.uid), kn(y, !0), G();
        },
        ne = (y, b, P) => {
            b.component = y;
            const D = y.vnode.props;
            (y.vnode = b),
                (y.next = null),
                rm(y, b.props, D, P),
                sm(y, b.children, P),
                gn(),
                Mi(y),
                yn();
        },
        H = (y, b, P, D, O, U, Y, K, Q = !1) => {
            const G = y && y.children,
                te = y ? y.shapeFlag : 0,
                fe = b.children,
                { patchFlag: se, shapeFlag: be } = b;
            if (se > 0) {
                if (se & 128) {
                    F(G, fe, P, D, O, U, Y, K, Q);
                    return;
                } else if (se & 256) {
                    X(G, fe, P, D, O, U, Y, K, Q);
                    return;
                }
            }
            be & 8
                ? (te & 16 && ae(G, O, U), fe !== G && c(P, fe))
                : te & 16
                ? be & 16
                    ? F(G, fe, P, D, O, U, Y, K, Q)
                    : ae(G, O, U, !0)
                : (te & 8 && c(P, ""), be & 16 && L(fe, P, D, O, U, Y, K, Q));
        },
        X = (y, b, P, D, O, U, Y, K, Q) => {
            (y = y || jn), (b = b || jn);
            const G = y.length,
                te = b.length,
                fe = Math.min(G, te);
            let se;
            for (se = 0; se < fe; se++) {
                const be = (b[se] = Q ? on(b[se]) : xt(b[se]));
                m(y[se], be, P, null, O, U, Y, K, Q);
            }
            G > te ? ae(y, O, U, !0, !1, fe) : L(b, P, D, O, U, Y, K, Q, fe);
        },
        F = (y, b, P, D, O, U, Y, K, Q) => {
            let G = 0;
            const te = b.length;
            let fe = y.length - 1,
                se = te - 1;
            for (; G <= fe && G <= se; ) {
                const be = y[G],
                    _e = (b[G] = Q ? on(b[G]) : xt(b[G]));
                if (Lt(be, _e)) m(be, _e, P, null, O, U, Y, K, Q);
                else break;
                G++;
            }
            for (; G <= fe && G <= se; ) {
                const be = y[fe],
                    _e = (b[se] = Q ? on(b[se]) : xt(b[se]));
                if (Lt(be, _e)) m(be, _e, P, null, O, U, Y, K, Q);
                else break;
                fe--, se--;
            }
            if (G > fe) {
                if (G <= se) {
                    const be = se + 1,
                        _e = be < te ? b[be].el : D;
                    for (; G <= se; )
                        m(
                            null,
                            (b[G] = Q ? on(b[G]) : xt(b[G])),
                            P,
                            _e,
                            O,
                            U,
                            Y,
                            K,
                            Q
                        ),
                            G++;
                }
            } else if (G > se) for (; G <= fe; ) J(y[G], O, U, !0), G++;
            else {
                const be = G,
                    _e = G,
                    Le = new Map();
                for (G = _e; G <= se; G++) {
                    const dt = (b[G] = Q ? on(b[G]) : xt(b[G]));
                    dt.key != null && Le.set(dt.key, G);
                }
                let Me,
                    Ue = 0;
                const At = se - _e + 1;
                let Hn = !1,
                    gi = 0;
                const gl = new Array(At);
                for (G = 0; G < At; G++) gl[G] = 0;
                for (G = be; G <= fe; G++) {
                    const dt = y[G];
                    if (Ue >= At) {
                        J(dt, O, U, !0);
                        continue;
                    }
                    let It;
                    if (dt.key != null) It = Le.get(dt.key);
                    else
                        for (Me = _e; Me <= se; Me++)
                            if (gl[Me - _e] === 0 && Lt(dt, b[Me])) {
                                It = Me;
                                break;
                            }
                    It === void 0
                        ? J(dt, O, U, !0)
                        : ((gl[It - _e] = G + 1),
                          It >= gi ? (gi = It) : (Hn = !0),
                          m(dt, b[It], P, null, O, U, Y, K, Q),
                          Ue++);
                }
                const yi = Hn ? fm(gl) : jn;
                for (Me = yi.length - 1, G = At - 1; G >= 0; G--) {
                    const dt = _e + G,
                        It = b[dt],
                        pi = dt + 1 < te ? b[dt + 1].el : D;
                    gl[G] === 0
                        ? m(null, It, P, pi, O, U, Y, K, Q)
                        : Hn &&
                          (Me < 0 || G !== yi[Me] ? z(It, P, pi, 2) : Me--);
                }
            }
        },
        z = (y, b, P, D, O = null) => {
            const {
                el: U,
                type: Y,
                transition: K,
                children: Q,
                shapeFlag: G,
            } = y;
            if (G & 6) {
                z(y.component.subTree, b, P, D);
                return;
            }
            if (G & 128) {
                y.suspense.move(b, P, D);
                return;
            }
            if (G & 64) {
                Y.move(y, b, P, N);
                return;
            }
            if (Y === we) {
                l(U, b, P);
                for (let fe = 0; fe < Q.length; fe++) z(Q[fe], b, P, D);
                l(y.anchor, b, P);
                return;
            }
            if (Y === sr) {
                _(y, b, P);
                return;
            }
            if (D !== 2 && G & 1 && K)
                if (D === 0)
                    K.beforeEnter(U), l(U, b, P), at(() => K.enter(U), O);
                else {
                    const { leave: fe, delayLeave: se, afterLeave: be } = K,
                        _e = () => l(U, b, P),
                        Le = () => {
                            fe(U, () => {
                                _e(), be && be();
                            });
                        };
                    se ? se(U, _e, Le) : Le();
                }
            else l(U, b, P);
        },
        J = (y, b, P, D = !1, O = !1) => {
            const {
                type: U,
                props: Y,
                ref: K,
                children: Q,
                dynamicChildren: G,
                shapeFlag: te,
                patchFlag: fe,
                dirs: se,
                memoIndex: be,
            } = y;
            if (
                (K != null && Hr(K, null, P, y, !0),
                be != null && (b.renderCache[be] = void 0),
                te & 256)
            ) {
                b.ctx.deactivate(y);
                return;
            }
            const _e = te & 1 && se,
                Le = !fa(y);
            let Me;
            if (
                (Le && (Me = Y && Y.onVnodeBeforeUnmount) && Vt(Me, b, y),
                te & 6)
            )
                Ce(y.component, P, D);
            else {
                if (te & 128) {
                    y.suspense.unmount(P, D);
                    return;
                }
                _e && Cn(y, null, b, "beforeUnmount"),
                    te & 64
                        ? y.type.remove(y, b, P, O, N, D)
                        : G && (U !== we || (fe > 0 && fe & 64))
                        ? ae(G, b, P, !1, !0)
                        : ((U === we && fe & 384) || (!O && te & 16)) &&
                          ae(Q, b, P),
                    D && ie(y);
            }
            ((Le && (Me = Y && Y.onVnodeUnmounted)) || _e) &&
                at(() => {
                    Me && Vt(Me, b, y), _e && Cn(y, null, b, "unmounted");
                }, P);
        },
        ie = (y) => {
            const { type: b, el: P, anchor: D, transition: O } = y;
            if (b === we) {
                pe(P, D);
                return;
            }
            if (b === sr) {
                T(y);
                return;
            }
            const U = () => {
                a(P), O && !O.persisted && O.afterLeave && O.afterLeave();
            };
            if (y.shapeFlag & 1 && O && !O.persisted) {
                const { leave: Y, delayLeave: K } = O,
                    Q = () => Y(P, U);
                K ? K(y.el, U, Q) : Q();
            } else U();
        },
        pe = (y, b) => {
            let P;
            for (; y !== b; ) (P = f(y)), a(y), (y = P);
            a(b);
        },
        Ce = (y, b, P) => {
            const {
                bum: D,
                scope: O,
                update: U,
                subTree: Y,
                um: K,
                m: Q,
                a: G,
            } = y;
            Hi(Q),
                Hi(G),
                D && nr(D),
                O.stop(),
                U && ((U.active = !1), J(Y, y, b, P)),
                K && at(K, b),
                at(() => {
                    y.isUnmounted = !0;
                }, b),
                b &&
                    b.pendingBranch &&
                    !b.isUnmounted &&
                    y.asyncDep &&
                    !y.asyncResolved &&
                    y.suspenseId === b.pendingId &&
                    (b.deps--, b.deps === 0 && b.resolve());
        },
        ae = (y, b, P, D = !1, O = !1, U = 0) => {
            for (let Y = U; Y < y.length; Y++) J(y[Y], b, P, D, O);
        },
        I = (y) =>
            y.shapeFlag & 6
                ? I(y.component.subTree)
                : y.shapeFlag & 128
                ? y.suspense.next()
                : f(y.anchor || y.el);
    let W = !1;
    const j = (y, b, P) => {
            y == null
                ? b._vnode && J(b._vnode, null, null, !0)
                : m(b._vnode || null, y, b, null, null, null, P),
                W || ((W = !0), Mi(), Ju(), (W = !1)),
                (b._vnode = y);
        },
        N = {
            p: m,
            um: J,
            m: z,
            r: ie,
            mt: $,
            mc: L,
            pc: H,
            pbc: V,
            n: I,
            o: e,
        };
    let re, he;
    return { render: j, hydrate: re, createApp: lm(j, re) };
}
function or({ type: e, props: t }, n) {
    return (n === "svg" && e === "foreignObject") ||
        (n === "mathml" &&
            e === "annotation-xml" &&
            t &&
            t.encoding &&
            t.encoding.includes("html"))
        ? void 0
        : n;
}
function kn({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function dm(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Fo(e, t, n = !1) {
    const l = e.children,
        a = t.children;
    if (ve(l) && ve(a))
        for (let r = 0; r < l.length; r++) {
            const o = l[r];
            let i = a[r];
            i.shapeFlag & 1 &&
                !i.dynamicChildren &&
                ((i.patchFlag <= 0 || i.patchFlag === 32) &&
                    ((i = a[r] = on(a[r])), (i.el = o.el)),
                !n && i.patchFlag !== -2 && Fo(o, i)),
                i.type === Ul && (i.el = o.el);
        }
}
function fm(e) {
    const t = e.slice(),
        n = [0];
    let l, a, r, o, i;
    const s = e.length;
    for (l = 0; l < s; l++) {
        const u = e[l];
        if (u !== 0) {
            if (((a = n[n.length - 1]), e[a] < u)) {
                (t[l] = a), n.push(l);
                continue;
            }
            for (r = 0, o = n.length - 1; r < o; )
                (i = (r + o) >> 1), e[n[i]] < u ? (r = i + 1) : (o = i);
            u < e[n[r]] && (r > 0 && (t[l] = n[r - 1]), (n[r] = l));
        }
    }
    for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o]);
    return n;
}
function vc(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : vc(t);
}
function Hi(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].active = !1;
}
const vm = Symbol.for("v-scx"),
    mm = () => Pe(vm);
function mt(e, t) {
    return Bo(e, null, t);
}
const aa = {};
function ue(e, t, n) {
    return Bo(e, t, n);
}
function Bo(
    e,
    t,
    { immediate: n, deep: l, flush: a, once: r, onTrack: o, onTrigger: i } = Oe
) {
    if (t && r) {
        const A = t;
        t = (...w) => {
            A(...w), k();
        };
    }
    const s = Je,
        u = (A) => (l === !0 ? A : un(A, l === !1 ? 1 : void 0));
    let c,
        d = !1,
        f = !1;
    if (
        (He(e)
            ? ((c = () => e.value), (d = ba(e)))
            : Al(e)
            ? ((c = () => u(e)), (d = !0))
            : ve(e)
            ? ((f = !0),
              (d = e.some((A) => Al(A) || ba(A))),
              (c = () =>
                  e.map((A) => {
                      if (He(A)) return A.value;
                      if (Al(A)) return u(A);
                      if (ge(A)) return fn(A, s, 2);
                  })))
            : ge(e)
            ? t
                ? (c = () => fn(e, s, 2))
                : (c = () => (v && v(), St(e, s, 3, [g])))
            : (c = pt),
        t && l)
    ) {
        const A = c;
        c = () => un(A());
    }
    let v,
        g = (A) => {
            v = _.onStop = () => {
                fn(A, s, 4), (v = _.onStop = void 0);
            };
        },
        m;
    if (ja)
        if (
            ((g = pt),
            t ? n && St(t, s, 3, [c(), f ? [] : void 0, g]) : c(),
            a === "sync")
        ) {
            const A = mm();
            m = A.__watcherHandles || (A.__watcherHandles = []);
        } else return pt;
    let p = f ? new Array(e.length).fill(aa) : aa;
    const C = () => {
        if (!(!_.active || !_.dirty))
            if (t) {
                const A = _.run();
                (l || d || (f ? A.some((w, L) => vn(w, p[L])) : vn(A, p))) &&
                    (v && v(),
                    St(t, s, 3, [
                        A,
                        p === aa ? void 0 : f && p[0] === aa ? [] : p,
                        g,
                    ]),
                    (p = A));
            } else _.run();
    };
    C.allowRecurse = !!t;
    let x;
    a === "sync"
        ? (x = C)
        : a === "post"
        ? (x = () => at(C, s && s.suspense))
        : ((C.pre = !0), s && (C.id = s.uid), (x = () => Ao(C)));
    const _ = new ho(c, pt, x),
        T = qf(),
        k = () => {
            _.stop(), T && uo(T.effects, _);
        };
    return (
        t
            ? n
                ? C()
                : (p = _.run())
            : a === "post"
            ? at(_.run.bind(_), s && s.suspense)
            : _.run(),
        m && m.push(k),
        k
    );
}
function hm(e, t, n) {
    const l = this.proxy,
        a = De(e) ? (e.includes(".") ? mc(l, e) : () => l[e]) : e.bind(l, l);
    let r;
    ge(t) ? (r = t) : ((r = t.handler), (n = t));
    const o = Kl(this),
        i = Bo(a, r.bind(l), n);
    return o(), i;
}
function mc(e, t) {
    const n = t.split(".");
    return () => {
        let l = e;
        for (let a = 0; a < n.length && l; a++) l = l[n[a]];
        return l;
    };
}
function un(e, t = 1 / 0, n) {
    if (t <= 0 || !Re(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
        return e;
    if ((n.add(e), t--, He(e))) un(e.value, t, n);
    else if (ve(e)) for (let l = 0; l < e.length; l++) un(e[l], t, n);
    else if (wu(e) || Wn(e))
        e.forEach((l) => {
            un(l, t, n);
        });
    else if (xu(e)) {
        for (const l in e) un(e[l], t, n);
        for (const l of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, l) && un(e[l], t, n);
    }
    return e;
}
const Xa = (e) => e.type.__isKeepAlive;
function hc(e, t) {
    yc(e, "a", t);
}
function gc(e, t) {
    yc(e, "da", t);
}
function yc(e, t, n = Je) {
    const l =
        e.__wdc ||
        (e.__wdc = () => {
            let a = n;
            for (; a; ) {
                if (a.isDeactivated) return;
                a = a.parent;
            }
            return e();
        });
    if ((za(t, l, n), n)) {
        let a = n.parent;
        for (; a && a.parent; )
            Xa(a.parent.vnode) && gm(l, t, n, a), (a = a.parent);
    }
}
function gm(e, t, n, l) {
    const a = za(t, e, l, !0);
    nc(() => {
        uo(l[t], a);
    }, n);
}
const rn = Symbol("_leaveCb"),
    ra = Symbol("_enterCb");
function pc() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map(),
    };
    return (
        Qt(() => {
            e.isMounted = !0;
        }),
        ht(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const yt = [Function, Array],
    bc = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: yt,
        onEnter: yt,
        onAfterEnter: yt,
        onEnterCancelled: yt,
        onBeforeLeave: yt,
        onLeave: yt,
        onAfterLeave: yt,
        onLeaveCancelled: yt,
        onBeforeAppear: yt,
        onAppear: yt,
        onAfterAppear: yt,
        onAppearCancelled: yt,
    },
    Sc = (e) => {
        const t = e.subTree;
        return t.component ? Sc(t.component) : t;
    },
    ym = {
        name: "BaseTransition",
        props: bc,
        setup(e, { slots: t }) {
            const n = No(),
                l = pc();
            return () => {
                const a = t.default && Do(t.default(), !0);
                if (!a || !a.length) return;
                let r = a[0];
                if (a.length > 1) {
                    for (const f of a)
                        if (f.type !== tt) {
                            r = f;
                            break;
                        }
                }
                const o = ye(e),
                    { mode: i } = o;
                if (l.isLeaving) return ir(r);
                const s = Ni(r);
                if (!s) return ir(r);
                let u = Fl(s, o, l, n, (f) => (u = f));
                Qn(s, u);
                const c = n.subTree,
                    d = c && Ni(c);
                if (d && d.type !== tt && !Lt(s, d) && Sc(n).type !== tt) {
                    const f = Fl(d, o, l, n);
                    if ((Qn(d, f), i === "out-in" && s.type !== tt))
                        return (
                            (l.isLeaving = !0),
                            (f.afterLeave = () => {
                                (l.isLeaving = !1),
                                    n.update.active !== !1 &&
                                        ((n.effect.dirty = !0), n.update());
                            }),
                            ir(r)
                        );
                    i === "in-out" &&
                        s.type !== tt &&
                        (f.delayLeave = (v, g, m) => {
                            const p = Cc(l, d);
                            (p[String(d.key)] = d),
                                (v[rn] = () => {
                                    g(),
                                        (v[rn] = void 0),
                                        delete u.delayedLeave;
                                }),
                                (u.delayedLeave = m);
                        });
                }
                return r;
            };
        },
    },
    pm = ym;
function Cc(e, t) {
    const { leavingVNodes: n } = e;
    let l = n.get(t.type);
    return l || ((l = Object.create(null)), n.set(t.type, l)), l;
}
function Fl(e, t, n, l, a) {
    const {
            appear: r,
            mode: o,
            persisted: i = !1,
            onBeforeEnter: s,
            onEnter: u,
            onAfterEnter: c,
            onEnterCancelled: d,
            onBeforeLeave: f,
            onLeave: v,
            onAfterLeave: g,
            onLeaveCancelled: m,
            onBeforeAppear: p,
            onAppear: C,
            onAfterAppear: x,
            onAppearCancelled: _,
        } = t,
        T = String(e.key),
        k = Cc(n, e),
        A = (E, V) => {
            E && St(E, l, 9, V);
        },
        w = (E, V) => {
            const R = V[1];
            A(E, V),
                ve(E)
                    ? E.every((M) => M.length <= 1) && R()
                    : E.length <= 1 && R();
        },
        L = {
            mode: o,
            persisted: i,
            beforeEnter(E) {
                let V = s;
                if (!n.isMounted)
                    if (r) V = p || s;
                    else return;
                E[rn] && E[rn](!0);
                const R = k[T];
                R && Lt(e, R) && R.el[rn] && R.el[rn](), A(V, [E]);
            },
            enter(E) {
                let V = u,
                    R = c,
                    M = d;
                if (!n.isMounted)
                    if (r) (V = C || u), (R = x || c), (M = _ || d);
                    else return;
                let B = !1;
                const $ = (E[ra] = (Z) => {
                    B ||
                        ((B = !0),
                        Z ? A(M, [E]) : A(R, [E]),
                        L.delayedLeave && L.delayedLeave(),
                        (E[ra] = void 0));
                });
                V ? w(V, [E, $]) : $();
            },
            leave(E, V) {
                const R = String(e.key);
                if ((E[ra] && E[ra](!0), n.isUnmounting)) return V();
                A(f, [E]);
                let M = !1;
                const B = (E[rn] = ($) => {
                    M ||
                        ((M = !0),
                        V(),
                        $ ? A(m, [E]) : A(g, [E]),
                        (E[rn] = void 0),
                        k[R] === e && delete k[R]);
                });
                (k[R] = e), v ? w(v, [E, B]) : B();
            },
            clone(E) {
                const V = Fl(E, t, n, l, a);
                return a && a(V), V;
            },
        };
    return L;
}
function ir(e) {
    if (Xa(e)) return (e = Kt(e)), (e.children = null), e;
}
function Ni(e) {
    if (!Xa(e)) return e;
    const { shapeFlag: t, children: n } = e;
    if (n) {
        if (t & 16) return n[0];
        if (t & 32 && ge(n.default)) return n.default();
    }
}
function Qn(e, t) {
    e.shapeFlag & 6 && e.component
        ? Qn(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function Do(e, t = !1, n) {
    let l = [],
        a = 0;
    for (let r = 0; r < e.length; r++) {
        let o = e[r];
        const i =
            n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
        o.type === we
            ? (o.patchFlag & 128 && a++, (l = l.concat(Do(o.children, t, i))))
            : (t || o.type !== tt) && l.push(i != null ? Kt(o, { key: i }) : o);
    }
    if (a > 1) for (let r = 0; r < l.length; r++) l[r].patchFlag = -2;
    return l;
}
const bm = (e) => e.__isTeleport,
    Ml = (e) => e && (e.disabled || e.disabled === ""),
    $i = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
    Gi = (e) =>
        typeof MathMLElement == "function" && e instanceof MathMLElement,
    Nr = (e, t) => {
        const n = e && e.to;
        return De(n) ? (t ? t(n) : null) : n;
    },
    Sm = {
        name: "Teleport",
        __isTeleport: !0,
        process(e, t, n, l, a, r, o, i, s, u) {
            const {
                    mc: c,
                    pc: d,
                    pbc: f,
                    o: {
                        insert: v,
                        querySelector: g,
                        createText: m,
                        createComment: p,
                    },
                } = u,
                C = Ml(t.props);
            let { shapeFlag: x, children: _, dynamicChildren: T } = t;
            if (e == null) {
                const k = (t.el = m("")),
                    A = (t.anchor = m(""));
                v(k, n, l), v(A, n, l);
                const w = (t.target = Nr(t.props, g)),
                    L = (t.targetAnchor = m(""));
                w &&
                    (v(L, w),
                    o === "svg" || $i(w)
                        ? (o = "svg")
                        : (o === "mathml" || Gi(w)) && (o = "mathml"));
                const E = (V, R) => {
                    x & 16 && c(_, V, R, a, r, o, i, s);
                };
                C ? E(n, A) : w && E(w, L);
            } else {
                t.el = e.el;
                const k = (t.anchor = e.anchor),
                    A = (t.target = e.target),
                    w = (t.targetAnchor = e.targetAnchor),
                    L = Ml(e.props),
                    E = L ? n : A,
                    V = L ? k : w;
                if (
                    (o === "svg" || $i(A)
                        ? (o = "svg")
                        : (o === "mathml" || Gi(A)) && (o = "mathml"),
                    T
                        ? (f(e.dynamicChildren, T, E, a, r, o, i), Fo(e, t, !0))
                        : s || d(e, t, E, V, a, r, o, i, !1),
                    C)
                )
                    L
                        ? t.props &&
                          e.props &&
                          t.props.to !== e.props.to &&
                          (t.props.to = e.props.to)
                        : oa(t, n, k, u, 1);
                else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                    const R = (t.target = Nr(t.props, g));
                    R && oa(t, R, null, u, 0);
                } else L && oa(t, A, w, u, 1);
            }
            kc(t);
        },
        remove(e, t, n, l, { um: a, o: { remove: r } }, o) {
            const {
                shapeFlag: i,
                children: s,
                anchor: u,
                targetAnchor: c,
                target: d,
                props: f,
            } = e;
            if ((d && r(c), o && r(u), i & 16)) {
                const v = o || !Ml(f);
                for (let g = 0; g < s.length; g++) {
                    const m = s[g];
                    a(m, t, n, v, !!m.dynamicChildren);
                }
            }
        },
        move: oa,
        hydrate: Cm,
    };
function oa(e, t, n, { o: { insert: l }, m: a }, r = 2) {
    r === 0 && l(e.targetAnchor, t, n);
    const { el: o, anchor: i, shapeFlag: s, children: u, props: c } = e,
        d = r === 2;
    if ((d && l(o, t, n), (!d || Ml(c)) && s & 16))
        for (let f = 0; f < u.length; f++) a(u[f], t, n, 2);
    d && l(i, t, n);
}
function Cm(
    e,
    t,
    n,
    l,
    a,
    r,
    { o: { nextSibling: o, parentNode: i, querySelector: s } },
    u
) {
    const c = (t.target = Nr(t.props, s));
    if (c) {
        const d = c._lpa || c.firstChild;
        if (t.shapeFlag & 16)
            if (Ml(t.props))
                (t.anchor = u(o(e), t, i(e), n, l, a, r)), (t.targetAnchor = d);
            else {
                t.anchor = o(e);
                let f = d;
                for (; f; )
                    if (
                        ((f = o(f)),
                        f && f.nodeType === 8 && f.data === "teleport anchor")
                    ) {
                        (t.targetAnchor = f),
                            (c._lpa = t.targetAnchor && o(t.targetAnchor));
                        break;
                    }
                u(d, t, c, n, l, a, r);
            }
        kc(t);
    }
    return t.anchor && o(t.anchor);
}
const km = Sm;
function kc(e) {
    const t = e.ctx;
    if (t && t.ut) {
        let n = e.children[0].el;
        for (; n && n !== e.targetAnchor; )
            n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
                (n = n.nextSibling);
        t.ut();
    }
}
const we = Symbol.for("v-fgt"),
    Ul = Symbol.for("v-txt"),
    tt = Symbol.for("v-cmt"),
    sr = Symbol.for("v-stc"),
    El = [];
let bt = null;
function Ke(e = !1) {
    El.push((bt = e ? null : []));
}
function wc() {
    El.pop(), (bt = El[El.length - 1] || null);
}
let Zn = 1;
function zi(e) {
    Zn += e;
}
function Ac(e) {
    return (
        (e.dynamicChildren = Zn > 0 ? bt || jn : null),
        wc(),
        Zn > 0 && bt && bt.push(e),
        e
    );
}
function _t(e, t, n, l, a, r) {
    return Ac(Ie(e, t, n, l, a, r, !0));
}
function Yn(e, t, n, l, a) {
    return Ac(h(e, t, n, l, a, !0));
}
function Bl(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Lt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const _c = ({ key: e }) => e ?? null,
    va = ({ ref: e, ref_key: t, ref_for: n }) => (
        typeof e == "number" && (e = "" + e),
        e != null
            ? De(e) || He(e) || ge(e)
                ? { i: rt, r: e, k: t, f: !!n }
                : e
            : null
    );
function Ie(
    e,
    t = null,
    n = null,
    l = 0,
    a = null,
    r = e === we ? 0 : 1,
    o = !1,
    i = !1
) {
    const s = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && _c(t),
        ref: t && va(t),
        scopeId: Ga,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: l,
        dynamicProps: a,
        dynamicChildren: null,
        appContext: null,
        ctx: rt,
    };
    return (
        i
            ? (Ho(s, n), r & 128 && e.normalize(s))
            : n && (s.shapeFlag |= De(n) ? 8 : 16),
        Zn > 0 &&
            !o &&
            bt &&
            (s.patchFlag > 0 || r & 6) &&
            s.patchFlag !== 32 &&
            bt.push(s),
        s
    );
}
const h = wm;
function wm(e, t = null, n = null, l = 0, a = null, r = !1) {
    if (((!e || e === Lv) && (e = tt), Bl(e))) {
        const i = Kt(e, t, !0);
        return (
            n && Ho(i, n),
            Zn > 0 &&
                !r &&
                bt &&
                (i.shapeFlag & 6 ? (bt[bt.indexOf(e)] = i) : bt.push(i)),
            (i.patchFlag = -2),
            i
        );
    }
    if ((Rm(e) && (e = e.__vccOpts), t)) {
        t = Am(t);
        let { class: i, style: s } = t;
        i && !De(i) && (t.class = vo(i)),
            Re(s) && (ju(s) && !ve(s) && (s = $e({}, s)), (t.style = fo(s)));
    }
    const o = De(e) ? 1 : Fv(e) ? 128 : bm(e) ? 64 : Re(e) ? 4 : ge(e) ? 2 : 0;
    return Ie(e, t, n, l, a, o, r, !0);
}
function Am(e) {
    return e ? (ju(e) || ic(e) ? $e({}, e) : e) : null;
}
function Kt(e, t, n = !1, l = !1) {
    const { props: a, ref: r, patchFlag: o, children: i, transition: s } = e,
        u = t ? ke(a || {}, t) : a,
        c = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: u,
            key: u && _c(u),
            ref:
                t && t.ref
                    ? n && r
                        ? ve(r)
                            ? r.concat(va(t))
                            : [r, va(t)]
                        : va(t)
                    : r,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: i,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== we ? (o === -1 ? 16 : o | 16) : o,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: s,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Kt(e.ssContent),
            ssFallback: e.ssFallback && Kt(e.ssFallback),
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
        };
    return s && l && Qn(c, s.clone(c)), c;
}
function jt(e = " ", t = 0) {
    return h(Ul, null, e, t);
}
function wn(e = "", t = !1) {
    return t ? (Ke(), Yn(tt, null, e)) : h(tt, null, e);
}
function xt(e) {
    return e == null || typeof e == "boolean"
        ? h(tt)
        : ve(e)
        ? h(we, null, e.slice())
        : typeof e == "object"
        ? on(e)
        : h(Ul, null, String(e));
}
function on(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Kt(e);
}
function Ho(e, t) {
    let n = 0;
    const { shapeFlag: l } = e;
    if (t == null) t = null;
    else if (ve(t)) n = 16;
    else if (typeof t == "object")
        if (l & 65) {
            const a = t.default;
            a && (a._c && (a._d = !1), Ho(e, a()), a._c && (a._d = !0));
            return;
        } else {
            n = 32;
            const a = t._;
            !a && !ic(t)
                ? (t._ctx = rt)
                : a === 3 &&
                  rt &&
                  (rt.slots._ === 1
                      ? (t._ = 1)
                      : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        ge(t)
            ? ((t = { default: t, _ctx: rt }), (n = 32))
            : ((t = String(t)), l & 64 ? ((n = 16), (t = [jt(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function ke(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const l = e[n];
        for (const a in l)
            if (a === "class")
                t.class !== l.class && (t.class = vo([t.class, l.class]));
            else if (a === "style") t.style = fo([t.style, l.style]);
            else if (Ba(a)) {
                const r = t[a],
                    o = l[a];
                o &&
                    r !== o &&
                    !(ve(r) && r.includes(o)) &&
                    (t[a] = r ? [].concat(r, o) : o);
            } else a !== "" && (t[a] = l[a]);
    }
    return t;
}
function Vt(e, t, n, l = null) {
    St(e, t, 7, [n, l]);
}
const _m = ac();
let xm = 0;
function Mm(e, t, n) {
    const l = e.type,
        a = (t ? t.appContext : e.appContext) || _m,
        r = {
            uid: xm++,
            vnode: e,
            type: l,
            parent: t,
            appContext: a,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Vu(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(a.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: uc(l, a),
            emitsOptions: tc(l, a),
            emit: null,
            emitted: null,
            propsDefaults: Oe,
            inheritAttrs: l.inheritAttrs,
            ctx: Oe,
            data: Oe,
            props: Oe,
            attrs: Oe,
            slots: Oe,
            refs: Oe,
            setupState: Oe,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (
        (r.ctx = { _: r }),
        (r.root = t ? t.root : r),
        (r.emit = Mv.bind(null, r)),
        e.ce && e.ce(r),
        r
    );
}
let Je = null;
const No = () => Je || rt;
let ka, $r;
{
    const e = Tu(),
        t = (n, l) => {
            let a;
            return (
                (a = e[n]) || (a = e[n] = []),
                a.push(l),
                (r) => {
                    a.length > 1 ? a.forEach((o) => o(r)) : a[0](r);
                }
            );
        };
    (ka = t("__VUE_INSTANCE_SETTERS__", (n) => (Je = n))),
        ($r = t("__VUE_SSR_SETTERS__", (n) => (ja = n)));
}
const Kl = (e) => {
        const t = Je;
        return (
            ka(e),
            e.scope.on(),
            () => {
                e.scope.off(), ka(t);
            }
        );
    },
    Xi = () => {
        Je && Je.scope.off(), ka(null);
    };
function xc(e) {
    return e.vnode.shapeFlag & 4;
}
let ja = !1;
function Em(e, t = !1) {
    t && $r(t);
    const { props: n, children: l } = e.vnode,
        a = xc(e);
    am(e, n, a, t), im(e, l);
    const r = a ? Tm(e, t) : void 0;
    return t && $r(!1), r;
}
function Tm(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, qv));
    const { setup: l } = n;
    if (l) {
        const a = (e.setupContext = l.length > 1 ? Im(e) : null),
            r = Kl(e);
        gn();
        const o = fn(l, e, 0, [e.props, a]);
        if ((yn(), r(), Au(o))) {
            if ((o.then(Xi, Xi), t))
                return o
                    .then((i) => {
                        Gr(e, i, t);
                    })
                    .catch((i) => {
                        Wl(i, e, 0);
                    });
            e.asyncDep = o;
        } else Gr(e, o, t);
    } else Mc(e, t);
}
function Gr(e, t, n) {
    ge(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : Re(t) && (e.setupState = Yu(t)),
        Mc(e, n);
}
let ji;
function Mc(e, t, n) {
    const l = e.type;
    if (!e.render) {
        if (!t && ji && !l.render) {
            const a = l.template || Lo(e).template;
            if (a) {
                const { isCustomElement: r, compilerOptions: o } =
                        e.appContext.config,
                    { delimiters: i, compilerOptions: s } = l,
                    u = $e($e({ isCustomElement: r, delimiters: i }, o), s);
                l.render = ji(a, u);
            }
        }
        e.render = l.render || pt;
    }
    {
        const a = Kl(e);
        gn();
        try {
            Qv(e);
        } finally {
            yn(), a();
        }
    }
}
const Pm = {
    get(e, t) {
        return st(e, "get", ""), e[t];
    },
};
function Im(e) {
    const t = (n) => {
        e.exposed = n || {};
    };
    return {
        attrs: new Proxy(e.attrs, Pm),
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function Wa(e) {
    return e.exposed
        ? e.exposeProxy ||
              (e.exposeProxy = new Proxy(Yu(yv(e.exposed)), {
                  get(t, n) {
                      if (n in t) return t[n];
                      if (n in _l) return _l[n](e);
                  },
                  has(t, n) {
                      return n in t || n in _l;
                  },
              }))
        : e.proxy;
}
function Vm(e, t = !0) {
    return ge(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Rm(e) {
    return ge(e) && "__vccOpts" in e;
}
const S = (e, t) => pv(e, t, ja);
function pn(e, t, n) {
    const l = arguments.length;
    return l === 2
        ? Re(t) && !ve(t)
            ? Bl(t)
                ? h(e, null, [t])
                : h(e, t)
            : h(e, null, t)
        : (l > 3
              ? (n = Array.prototype.slice.call(arguments, 2))
              : l === 3 && Bl(n) && (n = [n]),
          h(e, t, n));
}
const Lm = "3.4.29";
/**
 * @vue/runtime-dom v3.4.29
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Om = "http://www.w3.org/2000/svg",
    Fm = "http://www.w3.org/1998/Math/MathML",
    Xt = typeof document < "u" ? document : null,
    Wi = Xt && Xt.createElement("template"),
    Bm = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, l) => {
            const a =
                t === "svg"
                    ? Xt.createElementNS(Om, e)
                    : t === "mathml"
                    ? Xt.createElementNS(Fm, e)
                    : n
                    ? Xt.createElement(e, { is: n })
                    : Xt.createElement(e);
            return (
                e === "select" &&
                    l &&
                    l.multiple != null &&
                    a.setAttribute("multiple", l.multiple),
                a
            );
        },
        createText: (e) => Xt.createTextNode(e),
        createComment: (e) => Xt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Xt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, n, l, a, r) {
            const o = n ? n.previousSibling : t.lastChild;
            if (a && (a === r || a.nextSibling))
                for (
                    ;
                    t.insertBefore(a.cloneNode(!0), n),
                        !(a === r || !(a = a.nextSibling));

                );
            else {
                Wi.innerHTML =
                    l === "svg"
                        ? `<svg>${e}</svg>`
                        : l === "mathml"
                        ? `<math>${e}</math>`
                        : e;
                const i = Wi.content;
                if (l === "svg" || l === "mathml") {
                    const s = i.firstChild;
                    for (; s.firstChild; ) i.appendChild(s.firstChild);
                    i.removeChild(s);
                }
                t.insertBefore(i, n);
            }
            return [
                o ? o.nextSibling : t.firstChild,
                n ? n.previousSibling : t.lastChild,
            ];
        },
    },
    tn = "transition",
    yl = "animation",
    Jn = Symbol("_vtc"),
    Yt = (e, { slots: t }) => pn(pm, Tc(e), t);
Yt.displayName = "Transition";
const Ec = {
        name: String,
        type: String,
        css: { type: Boolean, default: !0 },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String,
    },
    Dm = (Yt.props = $e({}, bc, Ec)),
    An = (e, t = []) => {
        ve(e) ? e.forEach((n) => n(...t)) : e && e(...t);
    },
    Ui = (e) => (e ? (ve(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Tc(e) {
    const t = {};
    for (const M in e) M in Ec || (t[M] = e[M]);
    if (e.css === !1) return t;
    const {
            name: n = "v",
            type: l,
            duration: a,
            enterFromClass: r = `${n}-enter-from`,
            enterActiveClass: o = `${n}-enter-active`,
            enterToClass: i = `${n}-enter-to`,
            appearFromClass: s = r,
            appearActiveClass: u = o,
            appearToClass: c = i,
            leaveFromClass: d = `${n}-leave-from`,
            leaveActiveClass: f = `${n}-leave-active`,
            leaveToClass: v = `${n}-leave-to`,
        } = e,
        g = Hm(a),
        m = g && g[0],
        p = g && g[1],
        {
            onBeforeEnter: C,
            onEnter: x,
            onEnterCancelled: _,
            onLeave: T,
            onLeaveCancelled: k,
            onBeforeAppear: A = C,
            onAppear: w = x,
            onAppearCancelled: L = _,
        } = t,
        E = (M, B, $) => {
            ln(M, B ? c : i), ln(M, B ? u : o), $ && $();
        },
        V = (M, B) => {
            (M._isLeaving = !1), ln(M, d), ln(M, v), ln(M, f), B && B();
        },
        R = (M) => (B, $) => {
            const Z = M ? w : x,
                ee = () => E(B, M, $);
            An(Z, [B, ee]),
                Ki(() => {
                    ln(B, M ? s : r),
                        zt(B, M ? c : i),
                        Ui(Z) || Yi(B, l, m, ee);
                });
        };
    return $e(t, {
        onBeforeEnter(M) {
            An(C, [M]), zt(M, r), zt(M, o);
        },
        onBeforeAppear(M) {
            An(A, [M]), zt(M, s), zt(M, u);
        },
        onEnter: R(!1),
        onAppear: R(!0),
        onLeave(M, B) {
            M._isLeaving = !0;
            const $ = () => V(M, B);
            zt(M, d),
                zt(M, f),
                Ic(),
                Ki(() => {
                    M._isLeaving &&
                        (ln(M, d), zt(M, v), Ui(T) || Yi(M, l, p, $));
                }),
                An(T, [M, $]);
        },
        onEnterCancelled(M) {
            E(M, !1), An(_, [M]);
        },
        onAppearCancelled(M) {
            E(M, !0), An(L, [M]);
        },
        onLeaveCancelled(M) {
            V(M), An(k, [M]);
        },
    });
}
function Hm(e) {
    if (e == null) return null;
    if (Re(e)) return [ur(e.enter), ur(e.leave)];
    {
        const t = ur(e);
        return [t, t];
    }
}
function ur(e) {
    return Eu(e);
}
function zt(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
        (e[Jn] || (e[Jn] = new Set())).add(t);
}
function ln(e, t) {
    t.split(/\s+/).forEach((l) => l && e.classList.remove(l));
    const n = e[Jn];
    n && (n.delete(t), n.size || (e[Jn] = void 0));
}
function Ki(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e);
    });
}
let Nm = 0;
function Yi(e, t, n, l) {
    const a = (e._endId = ++Nm),
        r = () => {
            a === e._endId && l();
        };
    if (n) return setTimeout(r, n);
    const { type: o, timeout: i, propCount: s } = Pc(e, t);
    if (!o) return l();
    const u = o + "end";
    let c = 0;
    const d = () => {
            e.removeEventListener(u, f), r();
        },
        f = (v) => {
            v.target === e && ++c >= s && d();
        };
    setTimeout(() => {
        c < s && d();
    }, i + 1),
        e.addEventListener(u, f);
}
function Pc(e, t) {
    const n = window.getComputedStyle(e),
        l = (g) => (n[g] || "").split(", "),
        a = l(`${tn}Delay`),
        r = l(`${tn}Duration`),
        o = qi(a, r),
        i = l(`${yl}Delay`),
        s = l(`${yl}Duration`),
        u = qi(i, s);
    let c = null,
        d = 0,
        f = 0;
    t === tn
        ? o > 0 && ((c = tn), (d = o), (f = r.length))
        : t === yl
        ? u > 0 && ((c = yl), (d = u), (f = s.length))
        : ((d = Math.max(o, u)),
          (c = d > 0 ? (o > u ? tn : yl) : null),
          (f = c ? (c === tn ? r.length : s.length) : 0));
    const v =
        c === tn &&
        /\b(transform|all)(,|$)/.test(l(`${tn}Property`).toString());
    return { type: c, timeout: d, propCount: f, hasTransform: v };
}
function qi(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, l) => Qi(n) + Qi(e[l])));
}
function Qi(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ic() {
    return document.body.offsetHeight;
}
function $m(e, t, n) {
    const l = e[Jn];
    l && (t = (t ? [t, ...l] : [...l]).join(" ")),
        t == null
            ? e.removeAttribute("class")
            : n
            ? e.setAttribute("class", t)
            : (e.className = t);
}
const wa = Symbol("_vod"),
    Vc = Symbol("_vsh"),
    Ln = {
        beforeMount(e, { value: t }, { transition: n }) {
            (e[wa] = e.style.display === "none" ? "" : e.style.display),
                n && t ? n.beforeEnter(e) : pl(e, t);
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e);
        },
        updated(e, { value: t, oldValue: n }, { transition: l }) {
            !t != !n &&
                (l
                    ? t
                        ? (l.beforeEnter(e), pl(e, !0), l.enter(e))
                        : l.leave(e, () => {
                              pl(e, !1);
                          })
                    : pl(e, t));
        },
        beforeUnmount(e, { value: t }) {
            pl(e, t);
        },
    };
function pl(e, t) {
    (e.style.display = t ? e[wa] : "none"), (e[Vc] = !t);
}
const Gm = Symbol(""),
    zm = /(^|;)\s*display\s*:/;
function Xm(e, t, n) {
    const l = e.style,
        a = De(n);
    let r = !1;
    if (n && !a) {
        if (t)
            if (De(t))
                for (const o of t.split(";")) {
                    const i = o.slice(0, o.indexOf(":")).trim();
                    n[i] == null && ma(l, i, "");
                }
            else for (const o in t) n[o] == null && ma(l, o, "");
        for (const o in n) o === "display" && (r = !0), ma(l, o, n[o]);
    } else if (a) {
        if (t !== n) {
            const o = l[Gm];
            o && (n += ";" + o), (l.cssText = n), (r = zm.test(n));
        }
    } else t && e.removeAttribute("style");
    wa in e && ((e[wa] = r ? l.display : ""), e[Vc] && (l.display = "none"));
}
const Zi = /\s*!important$/;
function ma(e, t, n) {
    if (ve(n)) n.forEach((l) => ma(e, t, l));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const l = jm(e, t);
        Zi.test(n)
            ? e.setProperty(il(l), n.replace(Zi, ""), "important")
            : (e[l] = n);
    }
}
const Ji = ["Webkit", "Moz", "ms"],
    cr = {};
function jm(e, t) {
    const n = cr[t];
    if (n) return n;
    let l = Ct(t);
    if (l !== "filter" && l in e) return (cr[t] = l);
    l = sl(l);
    for (let a = 0; a < Ji.length; a++) {
        const r = Ji[a] + l;
        if (r in e) return (cr[t] = r);
    }
    return t;
}
const es = "http://www.w3.org/1999/xlink";
function ts(e, t, n, l, a, r = Kf(t)) {
    l && t.startsWith("xlink:")
        ? n == null
            ? e.removeAttributeNS(es, t.slice(6, t.length))
            : e.setAttributeNS(es, t, n)
        : n == null || (r && !Pu(n))
        ? e.removeAttribute(t)
        : e.setAttribute(t, r ? "" : String(n));
}
function Wm(e, t, n, l, a, r, o) {
    if (t === "innerHTML" || t === "textContent") {
        l && o(l, a, r), (e[t] = n ?? "");
        return;
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
        const u = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
            c = n == null ? "" : String(n);
        (u !== c || !("_value" in e)) && (e.value = c),
            n == null && e.removeAttribute(t),
            (e._value = n);
        return;
    }
    let s = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean"
            ? (n = Pu(n))
            : n == null && u === "string"
            ? ((n = ""), (s = !0))
            : u === "number" && ((n = 0), (s = !0));
    }
    try {
        e[t] = n;
    } catch {}
    s && e.removeAttribute(t);
}
function Um(e, t, n, l) {
    e.addEventListener(t, n, l);
}
function Km(e, t, n, l) {
    e.removeEventListener(t, n, l);
}
const ns = Symbol("_vei");
function Ym(e, t, n, l, a = null) {
    const r = e[ns] || (e[ns] = {}),
        o = r[t];
    if (l && o) o.value = l;
    else {
        const [i, s] = qm(t);
        if (l) {
            const u = (r[t] = Jm(l, a));
            Um(e, i, u, s);
        } else o && (Km(e, i, o, s), (r[t] = void 0));
    }
}
const ls = /(?:Once|Passive|Capture)$/;
function qm(e) {
    let t;
    if (ls.test(e)) {
        t = {};
        let l;
        for (; (l = e.match(ls)); )
            (e = e.slice(0, e.length - l[0].length)),
                (t[l[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : il(e.slice(2)), t];
}
let dr = 0;
const Qm = Promise.resolve(),
    Zm = () => dr || (Qm.then(() => (dr = 0)), (dr = Date.now()));
function Jm(e, t) {
    const n = (l) => {
        if (!l._vts) l._vts = Date.now();
        else if (l._vts <= n.attached) return;
        St(eh(l, n.value), t, 5, [l]);
    };
    return (n.value = e), (n.attached = Zm()), n;
}
function eh(e, t) {
    if (ve(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((l) => (a) => !a._stopped && l && l(a))
        );
    } else return t;
}
const as = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) > 96 &&
        e.charCodeAt(2) < 123,
    th = (e, t, n, l, a, r, o, i, s) => {
        const u = a === "svg";
        t === "class"
            ? $m(e, l, u)
            : t === "style"
            ? Xm(e, n, l)
            : Ba(t)
            ? so(t) || Ym(e, t, n, l, o)
            : (
                  t[0] === "."
                      ? ((t = t.slice(1)), !0)
                      : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : nh(e, t, l, u)
              )
            ? (Wm(e, t, l, r, o, i, s),
              (t === "value" || t === "checked" || t === "selected") &&
                  ts(e, t, l, u, o, t !== "value"))
            : (t === "true-value"
                  ? (e._trueValue = l)
                  : t === "false-value" && (e._falseValue = l),
              ts(e, t, l, u));
    };
function nh(e, t, n, l) {
    if (l)
        return !!(
            t === "innerHTML" ||
            t === "textContent" ||
            (t in e && as(t) && ge(n))
        );
    if (
        t === "spellcheck" ||
        t === "draggable" ||
        t === "translate" ||
        t === "form" ||
        (t === "list" && e.tagName === "INPUT") ||
        (t === "type" && e.tagName === "TEXTAREA")
    )
        return !1;
    if (t === "width" || t === "height") {
        const a = e.tagName;
        if (a === "IMG" || a === "VIDEO" || a === "CANVAS" || a === "SOURCE")
            return !1;
    }
    return as(t) && De(n) ? !1 : t in e;
}
const Rc = new WeakMap(),
    Lc = new WeakMap(),
    Aa = Symbol("_moveCb"),
    rs = Symbol("_enterCb"),
    Oc = {
        name: "TransitionGroup",
        props: $e({}, Dm, { tag: String, moveClass: String }),
        setup(e, { slots: t }) {
            const n = No(),
                l = pc();
            let a, r;
            return (
                Vo(() => {
                    if (!a.length) return;
                    const o = e.moveClass || `${e.name || "v"}-move`;
                    if (!ih(a[0].el, n.vnode.el, o)) return;
                    a.forEach(ah), a.forEach(rh);
                    const i = a.filter(oh);
                    Ic(),
                        i.forEach((s) => {
                            const u = s.el,
                                c = u.style;
                            zt(u, o),
                                (c.transform =
                                    c.webkitTransform =
                                    c.transitionDuration =
                                        "");
                            const d = (u[Aa] = (f) => {
                                (f && f.target !== u) ||
                                    ((!f ||
                                        /transform$/.test(f.propertyName)) &&
                                        (u.removeEventListener(
                                            "transitionend",
                                            d
                                        ),
                                        (u[Aa] = null),
                                        ln(u, o)));
                            });
                            u.addEventListener("transitionend", d);
                        });
                }),
                () => {
                    const o = ye(e),
                        i = Tc(o);
                    let s = o.tag || we;
                    if (((a = []), r))
                        for (let u = 0; u < r.length; u++) {
                            const c = r[u];
                            c.el &&
                                c.el instanceof Element &&
                                (a.push(c),
                                Qn(c, Fl(c, i, l, n)),
                                Rc.set(c, c.el.getBoundingClientRect()));
                        }
                    r = t.default ? Do(t.default()) : [];
                    for (let u = 0; u < r.length; u++) {
                        const c = r[u];
                        c.key != null && Qn(c, Fl(c, i, l, n));
                    }
                    return h(s, null, r);
                }
            );
        },
    },
    lh = (e) => delete e.mode;
Oc.props;
const $o = Oc;
function ah(e) {
    const t = e.el;
    t[Aa] && t[Aa](), t[rs] && t[rs]();
}
function rh(e) {
    Lc.set(e, e.el.getBoundingClientRect());
}
function oh(e) {
    const t = Rc.get(e),
        n = Lc.get(e),
        l = t.left - n.left,
        a = t.top - n.top;
    if (l || a) {
        const r = e.el.style;
        return (
            (r.transform = r.webkitTransform = `translate(${l}px,${a}px)`),
            (r.transitionDuration = "0s"),
            e
        );
    }
}
function ih(e, t, n) {
    const l = e.cloneNode(),
        a = e[Jn];
    a &&
        a.forEach((i) => {
            i.split(/\s+/).forEach((s) => s && l.classList.remove(s));
        }),
        n.split(/\s+/).forEach((i) => i && l.classList.add(i)),
        (l.style.display = "none");
    const r = t.nodeType === 1 ? t : t.parentNode;
    r.appendChild(l);
    const { hasTransform: o } = Pc(l);
    return r.removeChild(l), o;
}
const sh = $e({ patchProp: th }, Bm);
let os;
function uh() {
    return os || (os = um(sh));
}
const ch = (...e) => {
    const t = uh().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (l) => {
            const a = fh(l);
            if (!a) return;
            const r = t._component;
            !ge(r) && !r.render && !r.template && (r.template = a.innerHTML),
                (a.innerHTML = "");
            const o = n(a, !1, dh(a));
            return (
                a instanceof Element &&
                    (a.removeAttribute("v-cloak"),
                    a.setAttribute("data-v-app", "")),
                o
            );
        }),
        t
    );
};
function dh(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
        return "mathml";
}
function fh(e) {
    return De(e) ? document.querySelector(e) : e;
}
function mn(e, t) {
    let n;
    function l() {
        (n = mo()),
            n.run(() =>
                t.length
                    ? t(() => {
                          n == null || n.stop(), l();
                      })
                    : t()
            );
    }
    ue(
        e,
        (a) => {
            a && !n ? l() : a || (n == null || n.stop(), (n = void 0));
        },
        { immediate: !0 }
    ),
        ct(() => {
            n == null || n.stop();
        });
}
const Ve = typeof window < "u",
    Go = Ve && "IntersectionObserver" in window,
    vh =
        Ve && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function Fc(e, t, n) {
    const l = t.length - 1;
    if (l < 0) return e === void 0 ? n : e;
    for (let a = 0; a < l; a++) {
        if (e == null) return n;
        e = e[t[a]];
    }
    return e == null || e[t[l]] === void 0 ? n : e[t[l]];
}
function cl(e, t) {
    if (e === t) return !0;
    if (
        (e instanceof Date &&
            t instanceof Date &&
            e.getTime() !== t.getTime()) ||
        e !== Object(e) ||
        t !== Object(t)
    )
        return !1;
    const n = Object.keys(e);
    return n.length !== Object.keys(t).length
        ? !1
        : n.every((l) => cl(e[l], t[l]));
}
function zr(e, t, n) {
    return e == null || !t || typeof t != "string"
        ? n
        : e[t] !== void 0
        ? e[t]
        : ((t = t.replace(/\[(\w+)\]/g, ".$1")),
          (t = t.replace(/^\./, "")),
          Fc(e, t.split("."), n));
}
function Ot(e, t, n) {
    if (t === !0) return e === void 0 ? n : e;
    if (t == null || typeof t == "boolean") return n;
    if (e !== Object(e)) {
        if (typeof t != "function") return n;
        const a = t(e, n);
        return typeof a > "u" ? n : a;
    }
    if (typeof t == "string") return zr(e, t, n);
    if (Array.isArray(t)) return Fc(e, t, n);
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
}
function Bc(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return Array.from({ length: e }, (n, l) => t + l);
}
function me(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
    if (!(e == null || e === ""))
        return isNaN(+e)
            ? String(e)
            : isFinite(+e)
            ? `${Number(e)}${t}`
            : void 0;
}
function Xr(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Dc(e) {
    if (e && "$el" in e) {
        const t = e.$el;
        return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE
            ? t.nextElementSibling
            : t;
    }
    return e;
}
const is = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16,
});
function fr(e, t) {
    return t.every((n) => e.hasOwnProperty(n));
}
function Hc(e, t) {
    const n = {},
        l = new Set(Object.keys(e));
    for (const a of t) l.has(a) && (n[a] = e[a]);
    return n;
}
function ss(e, t, n) {
    const l = Object.create(null),
        a = Object.create(null);
    for (const r in e)
        t.some((o) => (o instanceof RegExp ? o.test(r) : o === r)) &&
        !(n != null && n.some((o) => o === r))
            ? (l[r] = e[r])
            : (a[r] = e[r]);
    return [l, a];
}
function On(e, t) {
    const n = { ...e };
    return t.forEach((l) => delete n[l]), n;
}
function mh(e, t) {
    const n = {};
    return t.forEach((l) => (n[l] = e[l])), n;
}
const Nc = /^on[^a-z]/,
    zo = (e) => Nc.test(e),
    hh = [
        "onAfterscriptexecute",
        "onAnimationcancel",
        "onAnimationend",
        "onAnimationiteration",
        "onAnimationstart",
        "onAuxclick",
        "onBeforeinput",
        "onBeforescriptexecute",
        "onChange",
        "onClick",
        "onCompositionend",
        "onCompositionstart",
        "onCompositionupdate",
        "onContextmenu",
        "onCopy",
        "onCut",
        "onDblclick",
        "onFocusin",
        "onFocusout",
        "onFullscreenchange",
        "onFullscreenerror",
        "onGesturechange",
        "onGestureend",
        "onGesturestart",
        "onGotpointercapture",
        "onInput",
        "onKeydown",
        "onKeypress",
        "onKeyup",
        "onLostpointercapture",
        "onMousedown",
        "onMousemove",
        "onMouseout",
        "onMouseover",
        "onMouseup",
        "onMousewheel",
        "onPaste",
        "onPointercancel",
        "onPointerdown",
        "onPointerenter",
        "onPointerleave",
        "onPointermove",
        "onPointerout",
        "onPointerover",
        "onPointerup",
        "onReset",
        "onSelect",
        "onSubmit",
        "onTouchcancel",
        "onTouchend",
        "onTouchmove",
        "onTouchstart",
        "onTransitioncancel",
        "onTransitionend",
        "onTransitionrun",
        "onTransitionstart",
        "onWheel",
    ];
function $c(e) {
    const [t, n] = ss(e, [Nc]),
        l = On(t, hh),
        [a, r] = ss(n, ["class", "style", "id", /^data-/]);
    return Object.assign(a, t), Object.assign(r, l), [a, r];
}
function ot(e) {
    return e == null ? [] : Array.isArray(e) ? e : [e];
}
function gh(e, t) {
    let n = 0;
    const l = function () {
        for (var a = arguments.length, r = new Array(a), o = 0; o < a; o++)
            r[o] = arguments[o];
        clearTimeout(n), (n = setTimeout(() => e(...r), Xe(t)));
    };
    return (
        (l.clear = () => {
            clearTimeout(n);
        }),
        (l.immediate = e),
        l
    );
}
function Bt(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
        n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    return Math.max(t, Math.min(n, e));
}
function us(e, t) {
    let n =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
    return e + n.repeat(Math.max(0, t - e.length));
}
function cs(e, t) {
    return (
        (arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : "0"
        ).repeat(Math.max(0, t - e.length)) + e
    );
}
function yh(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    const n = [];
    let l = 0;
    for (; l < e.length; ) n.push(e.substr(l, t)), (l += t);
    return n;
}
function nt() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = arguments.length > 2 ? arguments[2] : void 0;
    const l = {};
    for (const a in e) l[a] = e[a];
    for (const a in t) {
        const r = e[a],
            o = t[a];
        if (Xr(r) && Xr(o)) {
            l[a] = nt(r, o, n);
            continue;
        }
        if (Array.isArray(r) && Array.isArray(o) && n) {
            l[a] = n(r, o);
            continue;
        }
        l[a] = o;
    }
    return l;
}
function Gc(e) {
    return e.map((t) => (t.type === we ? Gc(t.children) : t)).flat();
}
function Pn() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    if (Pn.cache.has(e)) return Pn.cache.get(e);
    const t = e
        .replace(/[^a-z]/gi, "-")
        .replace(/\B([A-Z])/g, "-$1")
        .toLowerCase();
    return Pn.cache.set(e, t), t;
}
Pn.cache = new Map();
function zn(e, t) {
    if (!t || typeof t != "object") return [];
    if (Array.isArray(t)) return t.map((n) => zn(e, n)).flat(1);
    if (t.suspense) return zn(e, t.ssContent);
    if (Array.isArray(t.children))
        return t.children.map((n) => zn(e, n)).flat(1);
    if (t.component) {
        if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
            return [t.component];
        if (t.component.subTree) return zn(e, t.component.subTree).flat(1);
    }
    return [];
}
function Xo(e) {
    const t = Ze({}),
        n = S(e);
    return (
        mt(
            () => {
                for (const l in n.value) t[l] = n.value[l];
            },
            { flush: "sync" }
        ),
        ko(t)
    );
}
function _a(e, t) {
    return e.includes(t);
}
function zc(e) {
    return e[2].toLowerCase() + e.slice(3);
}
const it = () => [Function, Array];
function ds(e, t) {
    return (
        (t = "on" + sl(t)),
        !!(
            e[t] ||
            e[`${t}Once`] ||
            e[`${t}Capture`] ||
            e[`${t}OnceCapture`] ||
            e[`${t}CaptureOnce`]
        )
    );
}
function ph(e) {
    for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1;
        l < t;
        l++
    )
        n[l - 1] = arguments[l];
    if (Array.isArray(e)) for (const a of e) a(...n);
    else typeof e == "function" && e(...n);
}
function xa(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const n = [
        "button",
        "[href]",
        'input:not([type="hidden"])',
        "select",
        "textarea",
        "[tabindex]",
    ]
        .map((l) => `${l}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`)
        .join(", ");
    return [...e.querySelectorAll(n)];
}
function Xc(e, t, n) {
    let l,
        a = e.indexOf(document.activeElement);
    const r = t === "next" ? 1 : -1;
    do (a += r), (l = e[a]);
    while (
        (!l ||
            l.offsetParent == null ||
            !((n == null ? void 0 : n(l)) ?? !0)) &&
        a < e.length &&
        a >= 0
    );
    return l;
}
function Ma(e, t) {
    var l, a, r, o;
    const n = xa(e);
    if (!t)
        (e === document.activeElement || !e.contains(document.activeElement)) &&
            ((l = n[0]) == null || l.focus());
    else if (t === "first") (a = n[0]) == null || a.focus();
    else if (t === "last") (r = n.at(-1)) == null || r.focus();
    else if (typeof t == "number") (o = n[t]) == null || o.focus();
    else {
        const i = Xc(n, t);
        i ? i.focus() : Ma(e, t === "next" ? "first" : "last");
    }
}
function bh() {}
function el(e, t) {
    if (
        !(
            Ve &&
            typeof CSS < "u" &&
            typeof CSS.supports < "u" &&
            CSS.supports(`selector(${t})`)
        )
    )
        return null;
    try {
        return !!e && e.matches(t);
    } catch {
        return null;
    }
}
function jo(e) {
    return e.some((t) =>
        Bl(t) ? (t.type === tt ? !1 : t.type !== we || jo(t.children)) : !0
    )
        ? e
        : null;
}
function Sh(e, t) {
    if (!Ve || e === 0) return t(), () => {};
    const n = window.setTimeout(t, e);
    return () => window.clearTimeout(n);
}
function fs(e, t) {
    const n = oe();
    return (
        mt(
            () => {
                n.value = e();
            },
            { flush: "sync", ...t }
        ),
        ul(n)
    );
}
function Ch(e, t) {
    const n = e.clientX,
        l = e.clientY,
        a = t.getBoundingClientRect(),
        r = a.left,
        o = a.top,
        i = a.right,
        s = a.bottom;
    return n >= r && n <= i && l >= o && l <= s;
}
function jr() {
    const e = oe(),
        t = (n) => {
            e.value = n;
        };
    return (
        Object.defineProperty(t, "value", {
            enumerable: !0,
            get: () => e.value,
            set: (n) => (e.value = n),
        }),
        Object.defineProperty(t, "el", {
            enumerable: !0,
            get: () => Dc(e.value),
        }),
        t
    );
}
const jc = ["top", "bottom"],
    kh = ["start", "end", "left", "right"];
function Wr(e, t) {
    let [n, l] = e.split(" ");
    return (
        l || (l = _a(jc, n) ? "start" : _a(kh, n) ? "top" : "center"),
        { side: vs(n, t), align: vs(l, t) }
    );
}
function vs(e, t) {
    return e === "start"
        ? t
            ? "right"
            : "left"
        : e === "end"
        ? t
            ? "left"
            : "right"
        : e;
}
function vr(e) {
    return {
        side: {
            center: "center",
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left",
        }[e.side],
        align: e.align,
    };
}
function mr(e) {
    return {
        side: e.side,
        align: {
            center: "center",
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left",
        }[e.align],
    };
}
function ms(e) {
    return { side: e.align, align: e.side };
}
function hs(e) {
    return _a(jc, e.side) ? "y" : "x";
}
class In {
    constructor(t) {
        let { x: n, y: l, width: a, height: r } = t;
        (this.x = n), (this.y = l), (this.width = a), (this.height = r);
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + this.height;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
}
function gs(e, t) {
    return {
        x: {
            before: Math.max(0, t.left - e.left),
            after: Math.max(0, e.right - t.right),
        },
        y: {
            before: Math.max(0, t.top - e.top),
            after: Math.max(0, e.bottom - t.bottom),
        },
    };
}
function Wc(e) {
    return Array.isArray(e)
        ? new In({ x: e[0], y: e[1], width: 0, height: 0 })
        : e.getBoundingClientRect();
}
function Wo(e) {
    const t = e.getBoundingClientRect(),
        n = getComputedStyle(e),
        l = n.transform;
    if (l) {
        let a, r, o, i, s;
        if (l.startsWith("matrix3d("))
            (a = l.slice(9, -1).split(/, /)),
                (r = +a[0]),
                (o = +a[5]),
                (i = +a[12]),
                (s = +a[13]);
        else if (l.startsWith("matrix("))
            (a = l.slice(7, -1).split(/, /)),
                (r = +a[0]),
                (o = +a[3]),
                (i = +a[4]),
                (s = +a[5]);
        else return new In(t);
        const u = n.transformOrigin,
            c = t.x - i - (1 - r) * parseFloat(u),
            d = t.y - s - (1 - o) * parseFloat(u.slice(u.indexOf(" ") + 1)),
            f = r ? t.width / r : e.offsetWidth + 1,
            v = o ? t.height / o : e.offsetHeight + 1;
        return new In({ x: c, y: d, width: f, height: v });
    } else return new In(t);
}
function Xn(e, t, n) {
    if (typeof e.animate > "u") return { finished: Promise.resolve() };
    let l;
    try {
        l = e.animate(t, n);
    } catch {
        return { finished: Promise.resolve() };
    }
    return (
        typeof l.finished > "u" &&
            (l.finished = new Promise((a) => {
                l.onfinish = () => {
                    a(l);
                };
            })),
        l
    );
}
const ha = new WeakMap();
function wh(e, t) {
    Object.keys(t).forEach((n) => {
        if (zo(n)) {
            const l = zc(n),
                a = ha.get(e);
            if (t[n] == null)
                a == null ||
                    a.forEach((r) => {
                        const [o, i] = r;
                        o === l && (e.removeEventListener(l, i), a.delete(r));
                    });
            else if (!a || ![...a].some((r) => r[0] === l && r[1] === t[n])) {
                e.addEventListener(l, t[n]);
                const r = a || new Set();
                r.add([l, t[n]]), ha.has(e) || ha.set(e, r);
            }
        } else t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
    });
}
function Ah(e, t) {
    Object.keys(t).forEach((n) => {
        if (zo(n)) {
            const l = zc(n),
                a = ha.get(e);
            a == null ||
                a.forEach((r) => {
                    const [o, i] = r;
                    o === l && (e.removeEventListener(l, i), a.delete(r));
                });
        } else e.removeAttribute(n);
    });
}
const Nn = 2.4,
    ys = 0.2126729,
    ps = 0.7151522,
    bs = 0.072175,
    _h = 0.55,
    xh = 0.58,
    Mh = 0.57,
    Eh = 0.62,
    ia = 0.03,
    Ss = 1.45,
    Th = 5e-4,
    Ph = 1.25,
    Ih = 1.25,
    Cs = 0.078,
    ks = 12.82051282051282,
    sa = 0.06,
    ws = 0.001;
function As(e, t) {
    const n = (e.r / 255) ** Nn,
        l = (e.g / 255) ** Nn,
        a = (e.b / 255) ** Nn,
        r = (t.r / 255) ** Nn,
        o = (t.g / 255) ** Nn,
        i = (t.b / 255) ** Nn;
    let s = n * ys + l * ps + a * bs,
        u = r * ys + o * ps + i * bs;
    if (
        (s <= ia && (s += (ia - s) ** Ss),
        u <= ia && (u += (ia - u) ** Ss),
        Math.abs(u - s) < Th)
    )
        return 0;
    let c;
    if (u > s) {
        const d = (u ** _h - s ** xh) * Ph;
        c = d < ws ? 0 : d < Cs ? d - d * ks * sa : d - sa;
    } else {
        const d = (u ** Eh - s ** Mh) * Ih;
        c = d > -ws ? 0 : d > -Cs ? d - d * ks * sa : d + sa;
    }
    return c * 100;
}
function Vh(e, t) {
    t = Array.isArray(t)
        ? t
              .slice(0, -1)
              .map((n) => `'${n}'`)
              .join(", ") + ` or '${t.at(-1)}'`
        : `'${t}'`;
}
const Ea = 0.20689655172413793,
    Rh = (e) => (e > Ea ** 3 ? Math.cbrt(e) : e / (3 * Ea ** 2) + 4 / 29),
    Lh = (e) => (e > Ea ? e ** 3 : 3 * Ea ** 2 * (e - 4 / 29));
function Uc(e) {
    const t = Rh,
        n = t(e[1]);
    return [
        116 * n - 16,
        500 * (t(e[0] / 0.95047) - n),
        200 * (n - t(e[2] / 1.08883)),
    ];
}
function Kc(e) {
    const t = Lh,
        n = (e[0] + 16) / 116;
    return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Oh = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.204, 1.057],
    ],
    Fh = (e) => (e <= 0.0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055),
    Bh = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505],
    ],
    Dh = (e) => (e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4);
function Yc(e) {
    const t = Array(3),
        n = Fh,
        l = Oh;
    for (let a = 0; a < 3; ++a)
        t[a] = Math.round(
            Bt(n(l[a][0] * e[0] + l[a][1] * e[1] + l[a][2] * e[2])) * 255
        );
    return { r: t[0], g: t[1], b: t[2] };
}
function Uo(e) {
    let { r: t, g: n, b: l } = e;
    const a = [0, 0, 0],
        r = Dh,
        o = Bh;
    (t = r(t / 255)), (n = r(n / 255)), (l = r(l / 255));
    for (let i = 0; i < 3; ++i) a[i] = o[i][0] * t + o[i][1] * n + o[i][2] * l;
    return a;
}
function Ur(e) {
    return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Hh(e) {
    return Ur(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const _s = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,
    Nh = {
        rgb: (e, t, n, l) => ({ r: e, g: t, b: n, a: l }),
        rgba: (e, t, n, l) => ({ r: e, g: t, b: n, a: l }),
        hsl: (e, t, n, l) => xs({ h: e, s: t, l: n, a: l }),
        hsla: (e, t, n, l) => xs({ h: e, s: t, l: n, a: l }),
        hsv: (e, t, n, l) => Dl({ h: e, s: t, v: n, a: l }),
        hsva: (e, t, n, l) => Dl({ h: e, s: t, v: n, a: l }),
    };
function Ft(e) {
    if (typeof e == "number")
        return { r: (e & 16711680) >> 16, g: (e & 65280) >> 8, b: e & 255 };
    if (typeof e == "string" && _s.test(e)) {
        const { groups: t } = e.match(_s),
            { fn: n, values: l } = t,
            a = l
                .split(/,\s*/)
                .map((r) =>
                    r.endsWith("%") &&
                    ["hsl", "hsla", "hsv", "hsva"].includes(n)
                        ? parseFloat(r) / 100
                        : parseFloat(r)
                );
        return Nh[n](...a);
    } else if (typeof e == "string") {
        let t = e.startsWith("#") ? e.slice(1) : e;
        return (
            [3, 4].includes(t.length)
                ? (t = t
                      .split("")
                      .map((n) => n + n)
                      .join(""))
                : [6, 8].includes(t.length),
            Gh(t)
        );
    } else if (typeof e == "object") {
        if (fr(e, ["r", "g", "b"])) return e;
        if (fr(e, ["h", "s", "l"])) return Dl(qc(e));
        if (fr(e, ["h", "s", "v"])) return Dl(e);
    }
    throw new TypeError(`Invalid color: ${
        e == null ? e : String(e) || e.constructor.name
    }
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Dl(e) {
    const { h: t, s: n, v: l, a } = e,
        r = (i) => {
            const s = (i + t / 60) % 6;
            return l - l * n * Math.max(Math.min(s, 4 - s, 1), 0);
        },
        o = [r(5), r(3), r(1)].map((i) => Math.round(i * 255));
    return { r: o[0], g: o[1], b: o[2], a };
}
function xs(e) {
    return Dl(qc(e));
}
function qc(e) {
    const { h: t, s: n, l, a } = e,
        r = l + n * Math.min(l, 1 - l),
        o = r === 0 ? 0 : 2 - (2 * l) / r;
    return { h: t, s: o, v: r, a };
}
function ua(e) {
    const t = Math.round(e).toString(16);
    return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function $h(e) {
    let { r: t, g: n, b: l, a } = e;
    return `#${[
        ua(t),
        ua(n),
        ua(l),
        a !== void 0 ? ua(Math.round(a * 255)) : "",
    ].join("")}`;
}
function Gh(e) {
    e = zh(e);
    let [t, n, l, a] = yh(e, 2).map((r) => parseInt(r, 16));
    return (a = a === void 0 ? a : a / 255), { r: t, g: n, b: l, a };
}
function zh(e) {
    return (
        e.startsWith("#") && (e = e.slice(1)),
        (e = e.replace(/([^0-9a-f])/gi, "F")),
        (e.length === 3 || e.length === 4) &&
            (e = e
                .split("")
                .map((t) => t + t)
                .join("")),
        e.length !== 6 && (e = us(us(e, 6), 8, "F")),
        e
    );
}
function Xh(e, t) {
    const n = Uc(Uo(e));
    return (n[0] = n[0] + t * 10), Yc(Kc(n));
}
function jh(e, t) {
    const n = Uc(Uo(e));
    return (n[0] = n[0] - t * 10), Yc(Kc(n));
}
function Wh(e) {
    const t = Ft(e);
    return Uo(t)[1];
}
function Qc(e) {
    const t = Math.abs(As(Ft(0), Ft(e)));
    return Math.abs(As(Ft(16777215), Ft(e))) > Math.min(t, 50)
        ? "#fff"
        : "#000";
}
function q(e, t) {
    return (n) =>
        Object.keys(e).reduce((l, a) => {
            const o =
                typeof e[a] == "object" && e[a] != null && !Array.isArray(e[a])
                    ? e[a]
                    : { type: e[a] };
            return (
                n && a in n ? (l[a] = { ...o, default: n[a] }) : (l[a] = o),
                t && !l[a].source && (l[a].source = t),
                l
            );
        }, {});
}
const Ae = q(
    {
        class: [String, Array, Object],
        style: { type: [String, Array, Object], default: null },
    },
    "component"
);
function je(e, t) {
    const n = No();
    if (!n)
        throw new Error(
            `[Vuetify] ${e} must be called from inside a setup function`
        );
    return n;
}
function Dt() {
    let e =
        arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : "composables";
    const t = je(e).type;
    return Pn(
        (t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name)
    );
}
let Zc = 0,
    ga = new WeakMap();
function Tt() {
    const e = je("getUid");
    if (ga.has(e)) return ga.get(e);
    {
        const t = Zc++;
        return ga.set(e, t), t;
    }
}
Tt.reset = () => {
    (Zc = 0), (ga = new WeakMap());
};
function Uh(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : je("injectSelf");
    const { provides: n } = t;
    if (n && e in n) return n[e];
}
const tl = Symbol.for("vuetify:defaults");
function Kh(e) {
    return le(e);
}
function Ko() {
    const e = Pe(tl);
    if (!e) throw new Error("[Vuetify] Could not find defaults instance");
    return e;
}
function Fn(e, t) {
    const n = Ko(),
        l = le(e),
        a = S(() => {
            if (Xe(t == null ? void 0 : t.disabled)) return n.value;
            const o = Xe(t == null ? void 0 : t.scoped),
                i = Xe(t == null ? void 0 : t.reset),
                s = Xe(t == null ? void 0 : t.root);
            if (l.value == null && !(o || i || s)) return n.value;
            let u = nt(l.value, { prev: n.value });
            if (o) return u;
            if (i || s) {
                const c = Number(i || 1 / 0);
                for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
                    u = u.prev;
                return (
                    u &&
                        typeof s == "string" &&
                        s in u &&
                        (u = nt(nt(u, { prev: u }), u[s])),
                    u
                );
            }
            return u.prev ? nt(u.prev, u) : u;
        });
    return qe(tl, a), a;
}
function Yh(e, t) {
    var n, l;
    return (
        typeof ((n = e.props) == null ? void 0 : n[t]) < "u" ||
        typeof ((l = e.props) == null ? void 0 : l[Pn(t)]) < "u"
    );
}
function qh() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t = arguments.length > 1 ? arguments[1] : void 0,
        n =
            arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : Ko();
    const l = je("useDefaults");
    if (((t = t ?? l.type.name ?? l.type.__name), !t))
        throw new Error("[Vuetify] Could not determine component name");
    const a = S(() => {
            var s;
            return (s = n.value) == null ? void 0 : s[e._as ?? t];
        }),
        r = new Proxy(e, {
            get(s, u) {
                var d, f, v, g, m, p, C;
                const c = Reflect.get(s, u);
                return u === "class" || u === "style"
                    ? [(d = a.value) == null ? void 0 : d[u], c].filter(
                          (x) => x != null
                      )
                    : typeof u == "string" && !Yh(l.vnode, u)
                    ? ((f = a.value) == null ? void 0 : f[u]) !== void 0
                        ? (v = a.value) == null
                            ? void 0
                            : v[u]
                        : ((m = (g = n.value) == null ? void 0 : g.global) ==
                          null
                              ? void 0
                              : m[u]) !== void 0
                        ? (C = (p = n.value) == null ? void 0 : p.global) ==
                          null
                            ? void 0
                            : C[u]
                        : c
                    : c;
            },
        }),
        o = oe();
    mt(() => {
        if (a.value) {
            const s = Object.entries(a.value).filter((u) => {
                let [c] = u;
                return c.startsWith(c[0].toUpperCase());
            });
            o.value = s.length ? Object.fromEntries(s) : void 0;
        } else o.value = void 0;
    });
    function i() {
        const s = Uh(tl, l);
        qe(
            tl,
            S(() =>
                o.value
                    ? nt((s == null ? void 0 : s.value) ?? {}, o.value)
                    : s == null
                    ? void 0
                    : s.value
            )
        );
    }
    return { props: r, provideSubDefaults: i };
}
function dl(e) {
    if (((e._setup = e._setup ?? e.setup), !e.name)) return e;
    if (e._setup) {
        e.props = q(e.props ?? {}, e.name)();
        const t = Object.keys(e.props).filter(
            (n) => n !== "class" && n !== "style"
        );
        (e.filterProps = function (l) {
            return Hc(l, t);
        }),
            (e.props._as = String),
            (e.setup = function (l, a) {
                const r = Ko();
                if (!r.value) return e._setup(l, a);
                const { props: o, provideSubDefaults: i } = qh(
                        l,
                        l._as ?? e.name,
                        r
                    ),
                    s = e._setup(o, a);
                return i(), s;
            });
    }
    return e;
}
function de() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return (t) => (e ? dl : Ro)(t);
}
function Ua(e) {
    let t =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : "div",
        n = arguments.length > 2 ? arguments[2] : void 0;
    return de()({
        name: n ?? sl(Ct(e.replace(/__/g, "-"))),
        props: { tag: { type: String, default: t }, ...Ae() },
        setup(l, a) {
            let { slots: r } = a;
            return () => {
                var o;
                return pn(
                    l.tag,
                    { class: [e, l.class], style: l.style },
                    (o = r.default) == null ? void 0 : o.call(r)
                );
            };
        },
    });
}
function Jc(e) {
    if (typeof e.getRootNode != "function") {
        for (; e.parentNode; ) e = e.parentNode;
        return e !== document ? null : document;
    }
    const t = e.getRootNode();
    return t !== document && t.getRootNode({ composed: !0 }) !== document
        ? null
        : t;
}
const Ta = "cubic-bezier(0.4, 0, 0.2, 1)",
    Qh = "cubic-bezier(0.0, 0, 0.2, 1)",
    Zh = "cubic-bezier(0.4, 0, 1, 1)";
function ed(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    for (; e; ) {
        if (t ? Jh(e) : Yo(e)) return e;
        e = e.parentElement;
    }
    return document.scrollingElement;
}
function Pa(e, t) {
    const n = [];
    if (t && e && !t.contains(e)) return n;
    for (; e && (Yo(e) && n.push(e), e !== t); ) e = e.parentElement;
    return n;
}
function Yo(e) {
    if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
    const t = window.getComputedStyle(e);
    return (
        t.overflowY === "scroll" ||
        (t.overflowY === "auto" && e.scrollHeight > e.clientHeight)
    );
}
function Jh(e) {
    if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
    const t = window.getComputedStyle(e);
    return ["scroll", "auto"].includes(t.overflowY);
}
function eg(e) {
    for (; e; ) {
        if (window.getComputedStyle(e).position === "fixed") return !0;
        e = e.offsetParent;
    }
    return !1;
}
function Se(e) {
    const t = je("useRender");
    t.render = e;
}
function Be(e, t, n) {
    let l =
            arguments.length > 3 && arguments[3] !== void 0
                ? arguments[3]
                : (d) => d,
        a =
            arguments.length > 4 && arguments[4] !== void 0
                ? arguments[4]
                : (d) => d;
    const r = je("useProxiedModel"),
        o = le(e[t] !== void 0 ? e[t] : n),
        i = Pn(t),
        u = S(
            i !== t
                ? () => {
                      var d, f, v, g;
                      return (
                          e[t],
                          !!(
                              (((d = r.vnode.props) != null &&
                                  d.hasOwnProperty(t)) ||
                                  ((f = r.vnode.props) != null &&
                                      f.hasOwnProperty(i))) &&
                              (((v = r.vnode.props) != null &&
                                  v.hasOwnProperty(`onUpdate:${t}`)) ||
                                  ((g = r.vnode.props) != null &&
                                      g.hasOwnProperty(`onUpdate:${i}`)))
                          )
                      );
                  }
                : () => {
                      var d, f;
                      return (
                          e[t],
                          !!(
                              (d = r.vnode.props) != null &&
                              d.hasOwnProperty(t) &&
                              (f = r.vnode.props) != null &&
                              f.hasOwnProperty(`onUpdate:${t}`)
                          )
                      );
                  }
        );
    mn(
        () => !u.value,
        () => {
            ue(
                () => e[t],
                (d) => {
                    o.value = d;
                }
            );
        }
    );
    const c = S({
        get() {
            const d = e[t];
            return l(u.value ? d : o.value);
        },
        set(d) {
            const f = a(d),
                v = ye(u.value ? e[t] : o.value);
            v === f ||
                l(v) === d ||
                ((o.value = f), r == null || r.emit(`update:${t}`, f));
        },
    });
    return (
        Object.defineProperty(c, "externalValue", {
            get: () => (u.value ? e[t] : o.value),
        }),
        c
    );
}
const tg = {
        badge: "Badge",
        open: "Open",
        close: "Close",
        dismiss: "Dismiss",
        confirmEdit: { ok: "OK", cancel: "Cancel" },
        dataIterator: {
            noResultsText: "No matching records found",
            loadingText: "Loading items...",
        },
        dataTable: {
            itemsPerPageText: "Rows per page:",
            ariaLabel: {
                sortDescending: "Sorted descending.",
                sortAscending: "Sorted ascending.",
                sortNone: "Not sorted.",
                activateNone: "Activate to remove sorting.",
                activateDescending: "Activate to sort descending.",
                activateAscending: "Activate to sort ascending.",
            },
            sortBy: "Sort by",
        },
        dataFooter: {
            itemsPerPageText: "Items per page:",
            itemsPerPageAll: "All",
            nextPage: "Next page",
            prevPage: "Previous page",
            firstPage: "First page",
            lastPage: "Last page",
            pageText: "{0}-{1} of {2}",
        },
        dateRangeInput: { divider: "to" },
        datePicker: {
            itemsSelected: "{0} selected",
            range: { title: "Select dates", header: "Enter dates" },
            title: "Select date",
            header: "Enter date",
            input: { placeholder: "Enter date" },
        },
        noDataText: "No data available",
        carousel: {
            prev: "Previous visual",
            next: "Next visual",
            ariaLabel: { delimiter: "Carousel slide {0} of {1}" },
        },
        calendar: { moreEvents: "{0} more", today: "Today" },
        input: {
            clear: "Clear {0}",
            prependAction: "{0} prepended action",
            appendAction: "{0} appended action",
            otp: "Please enter OTP character {0}",
        },
        fileInput: {
            counter: "{0} files",
            counterSize: "{0} files ({1} in total)",
        },
        timePicker: { am: "AM", pm: "PM", title: "Select Time" },
        pagination: {
            ariaLabel: {
                root: "Pagination Navigation",
                next: "Next page",
                previous: "Previous page",
                page: "Go to page {0}",
                currentPage: "Page {0}, Current page",
                first: "First page",
                last: "Last page",
            },
        },
        stepper: { next: "Next", prev: "Previous" },
        rating: { ariaLabel: { item: "Rating {0} of {1}" } },
        loading: "Loading...",
        infiniteScroll: { loadMore: "Load more", empty: "No more" },
    },
    Ms = "$vuetify.",
    Es = (e, t) => e.replace(/\{(\d+)\}/g, (n, l) => String(t[+l])),
    td = (e, t, n) =>
        function (l) {
            for (
                var a = arguments.length,
                    r = new Array(a > 1 ? a - 1 : 0),
                    o = 1;
                o < a;
                o++
            )
                r[o - 1] = arguments[o];
            if (!l.startsWith(Ms)) return Es(l, r);
            const i = l.replace(Ms, ""),
                s = e.value && n.value[e.value],
                u = t.value && n.value[t.value];
            let c = zr(s, i, null);
            return (
                c || (`${l}${e.value}`, (c = zr(u, i, null))),
                c || (c = l),
                typeof c != "string" && (c = l),
                Es(c, r)
            );
        };
function nd(e, t) {
    return (n, l) => new Intl.NumberFormat([e.value, t.value], l).format(n);
}
function hr(e, t, n) {
    const l = Be(e, t, e[t] ?? n.value);
    return (
        (l.value = e[t] ?? n.value),
        ue(n, (a) => {
            e[t] == null && (l.value = n.value);
        }),
        l
    );
}
function ld(e) {
    return (t) => {
        const n = hr(t, "locale", e.current),
            l = hr(t, "fallback", e.fallback),
            a = hr(t, "messages", e.messages);
        return {
            name: "vuetify",
            current: n,
            fallback: l,
            messages: a,
            t: td(n, l, a),
            n: nd(n, l),
            provide: ld({ current: n, fallback: l, messages: a }),
        };
    };
}
function ng(e) {
    const t = oe((e == null ? void 0 : e.locale) ?? "en"),
        n = oe((e == null ? void 0 : e.fallback) ?? "en"),
        l = le({ en: tg, ...(e == null ? void 0 : e.messages) });
    return {
        name: "vuetify",
        current: t,
        fallback: n,
        messages: l,
        t: td(t, n, l),
        n: nd(t, n),
        provide: ld({ current: t, fallback: n, messages: l }),
    };
}
const Ia = Symbol.for("vuetify:locale");
function lg(e) {
    return e.name != null;
}
function ag(e) {
    const t =
            e != null && e.adapter && lg(e == null ? void 0 : e.adapter)
                ? e == null
                    ? void 0
                    : e.adapter
                : ng(e),
        n = og(t, e);
    return { ...t, ...n };
}
function Yl() {
    const e = Pe(Ia);
    if (!e)
        throw new Error("[Vuetify] Could not find injected locale instance");
    return e;
}
function rg() {
    return {
        af: !1,
        ar: !0,
        bg: !1,
        ca: !1,
        ckb: !1,
        cs: !1,
        de: !1,
        el: !1,
        en: !1,
        es: !1,
        et: !1,
        fa: !0,
        fi: !1,
        fr: !1,
        hr: !1,
        hu: !1,
        he: !0,
        id: !1,
        it: !1,
        ja: !1,
        km: !1,
        ko: !1,
        lv: !1,
        lt: !1,
        nl: !1,
        no: !1,
        pl: !1,
        pt: !1,
        ro: !1,
        ru: !1,
        sk: !1,
        sl: !1,
        srCyrl: !1,
        srLatn: !1,
        sv: !1,
        th: !1,
        tr: !1,
        az: !1,
        uk: !1,
        vi: !1,
        zhHans: !1,
        zhHant: !1,
    };
}
function og(e, t) {
    const n = le((t == null ? void 0 : t.rtl) ?? rg()),
        l = S(() => n.value[e.current.value] ?? !1);
    return {
        isRtl: l,
        rtl: n,
        rtlClasses: S(() => `v-locale--is-${l.value ? "rtl" : "ltr"}`),
    };
}
function Zt() {
    const e = Pe(Ia);
    if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
    return { isRtl: e.isRtl, rtlClasses: e.rtlClasses };
}
const Hl = {
    "001": 1,
    AD: 1,
    AE: 6,
    AF: 6,
    AG: 0,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AS: 0,
    AT: 1,
    AU: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BD: 0,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BR: 0,
    BS: 0,
    BT: 0,
    BW: 0,
    BY: 1,
    BZ: 0,
    CA: 0,
    CH: 1,
    CL: 1,
    CM: 1,
    CN: 1,
    CO: 0,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DM: 0,
    DO: 0,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    ET: 0,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    "GB-alt-variant": 0,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    GT: 0,
    GU: 0,
    HK: 0,
    HN: 0,
    HR: 1,
    HU: 1,
    ID: 0,
    IE: 1,
    IL: 0,
    IN: 0,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JM: 0,
    JO: 6,
    JP: 0,
    KE: 0,
    KG: 1,
    KH: 0,
    KR: 0,
    KW: 6,
    KZ: 1,
    LA: 0,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MH: 0,
    MK: 1,
    MM: 0,
    MN: 1,
    MO: 0,
    MQ: 1,
    MT: 0,
    MV: 5,
    MX: 0,
    MY: 1,
    MZ: 0,
    NI: 0,
    NL: 1,
    NO: 1,
    NP: 0,
    NZ: 1,
    OM: 6,
    PA: 0,
    PE: 0,
    PH: 0,
    PK: 0,
    PL: 1,
    PR: 0,
    PT: 0,
    PY: 0,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SA: 0,
    SD: 6,
    SE: 1,
    SG: 0,
    SI: 1,
    SK: 1,
    SM: 1,
    SV: 0,
    SY: 6,
    TH: 0,
    TJ: 1,
    TM: 1,
    TR: 1,
    TT: 0,
    TW: 0,
    UA: 1,
    UM: 0,
    US: 0,
    UY: 1,
    UZ: 1,
    VA: 1,
    VE: 0,
    VI: 0,
    VN: 1,
    WS: 0,
    XK: 1,
    YE: 0,
    ZA: 0,
    ZW: 0,
};
function ig(e, t) {
    const n = [];
    let l = [];
    const a = ad(e),
        r = rd(e),
        o = (a.getDay() - Hl[t.slice(-2).toUpperCase()] + 7) % 7,
        i = (r.getDay() - Hl[t.slice(-2).toUpperCase()] + 7) % 7;
    for (let s = 0; s < o; s++) {
        const u = new Date(a);
        u.setDate(u.getDate() - (o - s)), l.push(u);
    }
    for (let s = 1; s <= r.getDate(); s++) {
        const u = new Date(e.getFullYear(), e.getMonth(), s);
        l.push(u), l.length === 7 && (n.push(l), (l = []));
    }
    for (let s = 1; s < 7 - i; s++) {
        const u = new Date(r);
        u.setDate(u.getDate() + s), l.push(u);
    }
    return l.length > 0 && n.push(l), n;
}
function sg(e, t) {
    const n = new Date(e);
    for (; n.getDay() !== (Hl[t.slice(-2).toUpperCase()] ?? 0); )
        n.setDate(n.getDate() - 1);
    return n;
}
function ug(e, t) {
    const n = new Date(e),
        l = ((Hl[t.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
    for (; n.getDay() !== l; ) n.setDate(n.getDate() + 1);
    return n;
}
function ad(e) {
    return new Date(e.getFullYear(), e.getMonth(), 1);
}
function rd(e) {
    return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function cg(e) {
    const t = e.split("-").map(Number);
    return new Date(t[0], t[1] - 1, t[2]);
}
const dg = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function od(e) {
    if (e == null) return new Date();
    if (e instanceof Date) return e;
    if (typeof e == "string") {
        let t;
        if (dg.test(e)) return cg(e);
        if (((t = Date.parse(e)), !isNaN(t))) return new Date(t);
    }
    return null;
}
const Ts = new Date(2e3, 0, 2);
function fg(e) {
    const t = Hl[e.slice(-2).toUpperCase()];
    return Bc(7).map((n) => {
        const l = new Date(Ts);
        return (
            l.setDate(Ts.getDate() + t + n),
            new Intl.DateTimeFormat(e, { weekday: "narrow" }).format(l)
        );
    });
}
function vg(e, t, n, l) {
    const a = od(e) ?? new Date(),
        r = l == null ? void 0 : l[t];
    if (typeof r == "function") return r(a, t, n);
    let o = {};
    switch (t) {
        case "fullDate":
            o = { year: "numeric", month: "long", day: "numeric" };
            break;
        case "fullDateWithWeekday":
            o = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            break;
        case "normalDate":
            const i = a.getDate(),
                s = new Intl.DateTimeFormat(n, { month: "long" }).format(a);
            return `${i} ${s}`;
        case "normalDateWithWeekday":
            o = { weekday: "short", day: "numeric", month: "short" };
            break;
        case "shortDate":
            o = { month: "short", day: "numeric" };
            break;
        case "year":
            o = { year: "numeric" };
            break;
        case "month":
            o = { month: "long" };
            break;
        case "monthShort":
            o = { month: "short" };
            break;
        case "monthAndYear":
            o = { month: "long", year: "numeric" };
            break;
        case "monthAndDate":
            o = { month: "long", day: "numeric" };
            break;
        case "weekday":
            o = { weekday: "long" };
            break;
        case "weekdayShort":
            o = { weekday: "short" };
            break;
        case "dayOfMonth":
            return new Intl.NumberFormat(n).format(a.getDate());
        case "hours12h":
            o = { hour: "numeric", hour12: !0 };
            break;
        case "hours24h":
            o = { hour: "numeric", hour12: !1 };
            break;
        case "minutes":
            o = { minute: "numeric" };
            break;
        case "seconds":
            o = { second: "numeric" };
            break;
        case "fullTime":
            o = {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !0,
            };
            break;
        case "fullTime12h":
            o = {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !0,
            };
            break;
        case "fullTime24h":
            o = {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !1,
            };
            break;
        case "fullDateTime":
            o = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !0,
            };
            break;
        case "fullDateTime12h":
            o = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !0,
            };
            break;
        case "fullDateTime24h":
            o = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !1,
            };
            break;
        case "keyboardDate":
            o = { year: "numeric", month: "2-digit", day: "2-digit" };
            break;
        case "keyboardDateTime":
            o = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !1,
            };
            break;
        case "keyboardDateTime12h":
            o = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !0,
            };
            break;
        case "keyboardDateTime24h":
            o = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: !1,
            };
            break;
        default:
            o = r ?? { timeZone: "UTC", timeZoneName: "short" };
    }
    return new Intl.DateTimeFormat(n, o).format(a);
}
function mg(e, t) {
    const n = e.toJsDate(t),
        l = n.getFullYear(),
        a = cs(String(n.getMonth() + 1), 2, "0"),
        r = cs(String(n.getDate()), 2, "0");
    return `${l}-${a}-${r}`;
}
function hg(e) {
    const [t, n, l] = e.split("-").map(Number);
    return new Date(t, n - 1, l);
}
function gg(e, t) {
    const n = new Date(e);
    return n.setMinutes(n.getMinutes() + t), n;
}
function yg(e, t) {
    const n = new Date(e);
    return n.setHours(n.getHours() + t), n;
}
function pg(e, t) {
    const n = new Date(e);
    return n.setDate(n.getDate() + t), n;
}
function bg(e, t) {
    const n = new Date(e);
    return n.setDate(n.getDate() + t * 7), n;
}
function Sg(e, t) {
    const n = new Date(e);
    return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function Cg(e) {
    return e.getFullYear();
}
function kg(e) {
    return e.getMonth();
}
function wg(e) {
    return e.getDate();
}
function Ag(e) {
    return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function _g(e) {
    return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function xg(e) {
    return e.getHours();
}
function Mg(e) {
    return e.getMinutes();
}
function Eg(e) {
    return new Date(e.getFullYear(), 0, 1);
}
function Tg(e) {
    return new Date(e.getFullYear(), 11, 31);
}
function Pg(e, t) {
    return Va(e, t[0]) && Rg(e, t[1]);
}
function Ig(e) {
    const t = new Date(e);
    return t instanceof Date && !isNaN(t.getTime());
}
function Va(e, t) {
    return e.getTime() > t.getTime();
}
function Vg(e, t) {
    return Va(Kr(e), Kr(t));
}
function Rg(e, t) {
    return e.getTime() < t.getTime();
}
function Ps(e, t) {
    return e.getTime() === t.getTime();
}
function Lg(e, t) {
    return (
        e.getDate() === t.getDate() &&
        e.getMonth() === t.getMonth() &&
        e.getFullYear() === t.getFullYear()
    );
}
function Og(e, t) {
    return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Fg(e, t) {
    return e.getFullYear() === t.getFullYear();
}
function Bg(e, t, n) {
    const l = new Date(e),
        a = new Date(t);
    switch (n) {
        case "years":
            return l.getFullYear() - a.getFullYear();
        case "quarters":
            return Math.floor(
                (l.getMonth() -
                    a.getMonth() +
                    (l.getFullYear() - a.getFullYear()) * 12) /
                    4
            );
        case "months":
            return (
                l.getMonth() -
                a.getMonth() +
                (l.getFullYear() - a.getFullYear()) * 12
            );
        case "weeks":
            return Math.floor(
                (l.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24 * 7)
            );
        case "days":
            return Math.floor(
                (l.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24)
            );
        case "hours":
            return Math.floor((l.getTime() - a.getTime()) / (1e3 * 60 * 60));
        case "minutes":
            return Math.floor((l.getTime() - a.getTime()) / (1e3 * 60));
        case "seconds":
            return Math.floor((l.getTime() - a.getTime()) / 1e3);
        default:
            return l.getTime() - a.getTime();
    }
}
function Dg(e, t) {
    const n = new Date(e);
    return n.setHours(t), n;
}
function Hg(e, t) {
    const n = new Date(e);
    return n.setMinutes(t), n;
}
function Ng(e, t) {
    const n = new Date(e);
    return n.setMonth(t), n;
}
function $g(e, t) {
    const n = new Date(e);
    return n.setDate(t), n;
}
function Gg(e, t) {
    const n = new Date(e);
    return n.setFullYear(t), n;
}
function Kr(e) {
    return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function zg(e) {
    return new Date(
        e.getFullYear(),
        e.getMonth(),
        e.getDate(),
        23,
        59,
        59,
        999
    );
}
class Xg {
    constructor(t) {
        (this.locale = t.locale), (this.formats = t.formats);
    }
    date(t) {
        return od(t);
    }
    toJsDate(t) {
        return t;
    }
    toISO(t) {
        return mg(this, t);
    }
    parseISO(t) {
        return hg(t);
    }
    addMinutes(t, n) {
        return gg(t, n);
    }
    addHours(t, n) {
        return yg(t, n);
    }
    addDays(t, n) {
        return pg(t, n);
    }
    addWeeks(t, n) {
        return bg(t, n);
    }
    addMonths(t, n) {
        return Sg(t, n);
    }
    getWeekArray(t) {
        return ig(t, this.locale);
    }
    startOfWeek(t) {
        return sg(t, this.locale);
    }
    endOfWeek(t) {
        return ug(t, this.locale);
    }
    startOfMonth(t) {
        return ad(t);
    }
    endOfMonth(t) {
        return rd(t);
    }
    format(t, n) {
        return vg(t, n, this.locale, this.formats);
    }
    isEqual(t, n) {
        return Ps(t, n);
    }
    isValid(t) {
        return Ig(t);
    }
    isWithinRange(t, n) {
        return Pg(t, n);
    }
    isAfter(t, n) {
        return Va(t, n);
    }
    isAfterDay(t, n) {
        return Vg(t, n);
    }
    isBefore(t, n) {
        return !Va(t, n) && !Ps(t, n);
    }
    isSameDay(t, n) {
        return Lg(t, n);
    }
    isSameMonth(t, n) {
        return Og(t, n);
    }
    isSameYear(t, n) {
        return Fg(t, n);
    }
    setMinutes(t, n) {
        return Hg(t, n);
    }
    setHours(t, n) {
        return Dg(t, n);
    }
    setMonth(t, n) {
        return Ng(t, n);
    }
    setDate(t, n) {
        return $g(t, n);
    }
    setYear(t, n) {
        return Gg(t, n);
    }
    getDiff(t, n, l) {
        return Bg(t, n, l);
    }
    getWeekdays() {
        return fg(this.locale);
    }
    getYear(t) {
        return Cg(t);
    }
    getMonth(t) {
        return kg(t);
    }
    getDate(t) {
        return wg(t);
    }
    getNextMonth(t) {
        return Ag(t);
    }
    getPreviousMonth(t) {
        return _g(t);
    }
    getHours(t) {
        return xg(t);
    }
    getMinutes(t) {
        return Mg(t);
    }
    startOfDay(t) {
        return Kr(t);
    }
    endOfDay(t) {
        return zg(t);
    }
    startOfYear(t) {
        return Eg(t);
    }
    endOfYear(t) {
        return Tg(t);
    }
}
const jg = Symbol.for("vuetify:date-options"),
    Is = Symbol.for("vuetify:date-adapter");
function Wg(e, t) {
    const n = nt(
        {
            adapter: Xg,
            locale: {
                af: "af-ZA",
                bg: "bg-BG",
                ca: "ca-ES",
                ckb: "",
                cs: "cs-CZ",
                de: "de-DE",
                el: "el-GR",
                en: "en-US",
                et: "et-EE",
                fa: "fa-IR",
                fi: "fi-FI",
                hr: "hr-HR",
                hu: "hu-HU",
                he: "he-IL",
                id: "id-ID",
                it: "it-IT",
                ja: "ja-JP",
                ko: "ko-KR",
                lv: "lv-LV",
                lt: "lt-LT",
                nl: "nl-NL",
                no: "no-NO",
                pl: "pl-PL",
                pt: "pt-PT",
                ro: "ro-RO",
                ru: "ru-RU",
                sk: "sk-SK",
                sl: "sl-SI",
                srCyrl: "sr-SP",
                srLatn: "sr-SP",
                sv: "sv-SE",
                th: "th-TH",
                tr: "tr-TR",
                az: "az-AZ",
                uk: "uk-UA",
                vi: "vi-VN",
                zhHans: "zh-CN",
                zhHant: "zh-TW",
            },
        },
        e
    );
    return { options: n, instance: Ug(n, t) };
}
function Ug(e, t) {
    const n = Ze(
        typeof e.adapter == "function"
            ? new e.adapter({
                  locale: e.locale[t.current.value] ?? t.current.value,
                  formats: e.formats,
              })
            : e.adapter
    );
    return (
        ue(t.current, (l) => {
            n.locale = e.locale[l] ?? l ?? n.locale;
        }),
        n
    );
}
const Yr = Symbol.for("vuetify:display"),
    Vs = {
        mobileBreakpoint: "lg",
        thresholds: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560 },
    },
    Kg = function () {
        let e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Vs;
        return nt(Vs, e);
    };
function Rs(e) {
    return Ve && !e
        ? window.innerWidth
        : (typeof e == "object" && e.clientWidth) || 0;
}
function Ls(e) {
    return Ve && !e
        ? window.innerHeight
        : (typeof e == "object" && e.clientHeight) || 0;
}
function Os(e) {
    const t = Ve && !e ? window.navigator.userAgent : "ssr";
    function n(g) {
        return !!t.match(g);
    }
    const l = n(/android/i),
        a = n(/iphone|ipad|ipod/i),
        r = n(/cordova/i),
        o = n(/electron/i),
        i = n(/chrome/i),
        s = n(/edge/i),
        u = n(/firefox/i),
        c = n(/opera/i),
        d = n(/win/i),
        f = n(/mac/i),
        v = n(/linux/i);
    return {
        android: l,
        ios: a,
        cordova: r,
        electron: o,
        chrome: i,
        edge: s,
        firefox: u,
        opera: c,
        win: d,
        mac: f,
        linux: v,
        touch: vh,
        ssr: t === "ssr",
    };
}
function Yg(e, t) {
    const { thresholds: n, mobileBreakpoint: l } = Kg(e),
        a = oe(Ls(t)),
        r = oe(Os(t)),
        o = Ze({}),
        i = oe(Rs(t));
    function s() {
        (a.value = Ls()), (i.value = Rs());
    }
    function u() {
        s(), (r.value = Os());
    }
    return (
        mt(() => {
            const c = i.value < n.sm,
                d = i.value < n.md && !c,
                f = i.value < n.lg && !(d || c),
                v = i.value < n.xl && !(f || d || c),
                g = i.value < n.xxl && !(v || f || d || c),
                m = i.value >= n.xxl,
                p = c
                    ? "xs"
                    : d
                    ? "sm"
                    : f
                    ? "md"
                    : v
                    ? "lg"
                    : g
                    ? "xl"
                    : "xxl",
                C = typeof l == "number" ? l : n[l],
                x = i.value < C;
            (o.xs = c),
                (o.sm = d),
                (o.md = f),
                (o.lg = v),
                (o.xl = g),
                (o.xxl = m),
                (o.smAndUp = !c),
                (o.mdAndUp = !(c || d)),
                (o.lgAndUp = !(c || d || f)),
                (o.xlAndUp = !(c || d || f || v)),
                (o.smAndDown = !(f || v || g || m)),
                (o.mdAndDown = !(v || g || m)),
                (o.lgAndDown = !(g || m)),
                (o.xlAndDown = !m),
                (o.name = p),
                (o.height = a.value),
                (o.width = i.value),
                (o.mobile = x),
                (o.mobileBreakpoint = l),
                (o.platform = r.value),
                (o.thresholds = n);
        }),
        Ve && window.addEventListener("resize", s, { passive: !0 }),
        { ...ko(o), update: u, ssr: !!t }
    );
}
const qg = q(
    {
        mobile: { type: Boolean, default: !1 },
        mobileBreakpoint: [Number, String],
    },
    "display"
);
function qo() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : Dt();
    const n = Pe(Yr);
    if (!n) throw new Error("Could not find Vuetify display injection");
    const l = S(() => {
            if (e.mobile != null) return e.mobile;
            if (!e.mobileBreakpoint) return n.mobile.value;
            const r =
                typeof e.mobileBreakpoint == "number"
                    ? e.mobileBreakpoint
                    : n.thresholds.value[e.mobileBreakpoint];
            return n.width.value < r;
        }),
        a = S(() => (t ? { [`${t}--mobile`]: l.value } : {}));
    return { ...n, displayClasses: a, mobile: l };
}
const id = Symbol.for("vuetify:goto");
function sd() {
    return {
        container: void 0,
        duration: 300,
        layout: !1,
        offset: 0,
        easing: "easeInOutCubic",
        patterns: {
            linear: (e) => e,
            easeInQuad: (e) => e ** 2,
            easeOutQuad: (e) => e * (2 - e),
            easeInOutQuad: (e) => (e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e),
            easeInCubic: (e) => e ** 3,
            easeOutCubic: (e) => (--e) ** 3 + 1,
            easeInOutCubic: (e) =>
                e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
            easeInQuart: (e) => e ** 4,
            easeOutQuart: (e) => 1 - (--e) ** 4,
            easeInOutQuart: (e) => (e < 0.5 ? 8 * e ** 4 : 1 - 8 * (--e) ** 4),
            easeInQuint: (e) => e ** 5,
            easeOutQuint: (e) => 1 + (--e) ** 5,
            easeInOutQuint: (e) =>
                e < 0.5 ? 16 * e ** 5 : 1 + 16 * (--e) ** 5,
        },
    };
}
function Qg(e) {
    return Qo(e) ?? (document.scrollingElement || document.body);
}
function Qo(e) {
    return typeof e == "string" ? document.querySelector(e) : Dc(e);
}
function gr(e, t, n) {
    if (typeof e == "number") return t && n ? -e : e;
    let l = Qo(e),
        a = 0;
    for (; l; ) (a += t ? l.offsetLeft : l.offsetTop), (l = l.offsetParent);
    return a;
}
function Zg(e, t) {
    return { rtl: t.isRtl, options: nt(sd(), e) };
}
async function Fs(e, t, n, l) {
    const a = n ? "scrollLeft" : "scrollTop",
        r = nt((l == null ? void 0 : l.options) ?? sd(), t),
        o = l == null ? void 0 : l.rtl.value,
        i = (typeof e == "number" ? e : Qo(e)) ?? 0,
        s =
            r.container === "parent" && i instanceof HTMLElement
                ? i.parentElement
                : Qg(r.container),
        u = typeof r.easing == "function" ? r.easing : r.patterns[r.easing];
    if (!u) throw new TypeError(`Easing function "${r.easing}" not found.`);
    let c;
    if (typeof i == "number") c = gr(i, n, o);
    else if (((c = gr(i, n, o) - gr(s, n, o)), r.layout)) {
        const g = window.getComputedStyle(i).getPropertyValue("--v-layout-top");
        g && (c -= parseInt(g, 10));
    }
    (c += r.offset), (c = ey(s, c, !!o, !!n));
    const d = s[a] ?? 0;
    if (c === d) return Promise.resolve(c);
    const f = performance.now();
    return new Promise((v) =>
        requestAnimationFrame(function g(m) {
            const C = (m - f) / r.duration,
                x = Math.floor(d + (c - d) * u(Bt(C, 0, 1)));
            if (((s[a] = x), C >= 1 && Math.abs(x - s[a]) < 10)) return v(c);
            if (C > 2) return v(s[a]);
            requestAnimationFrame(g);
        })
    );
}
function Jg() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const t = Pe(id),
        { isRtl: n } = Zt();
    if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
    const l = { ...t, rtl: S(() => t.rtl.value || n.value) };
    async function a(r, o) {
        return Fs(r, nt(e, o), !1, l);
    }
    return (a.horizontal = async (r, o) => Fs(r, nt(e, o), !0, l)), a;
}
function ey(e, t, n, l) {
    const { scrollWidth: a, scrollHeight: r } = e,
        [o, i] =
            e === document.scrollingElement
                ? [window.innerWidth, window.innerHeight]
                : [e.offsetWidth, e.offsetHeight];
    let s, u;
    return (
        l
            ? n
                ? ((s = -(a - o)), (u = 0))
                : ((s = 0), (u = a - o))
            : ((s = 0), (u = r + -i)),
        Math.max(Math.min(t, u), s)
    );
}
const ty = {
        collapse: "mdi-chevron-up",
        complete: "mdi-check",
        cancel: "mdi-close-circle",
        close: "mdi-close",
        delete: "mdi-close-circle",
        clear: "mdi-close-circle",
        success: "mdi-check-circle",
        info: "mdi-information",
        warning: "mdi-alert-circle",
        error: "mdi-close-circle",
        prev: "mdi-chevron-left",
        next: "mdi-chevron-right",
        checkboxOn: "mdi-checkbox-marked",
        checkboxOff: "mdi-checkbox-blank-outline",
        checkboxIndeterminate: "mdi-minus-box",
        delimiter: "mdi-circle",
        sortAsc: "mdi-arrow-up",
        sortDesc: "mdi-arrow-down",
        expand: "mdi-chevron-down",
        menu: "mdi-menu",
        subgroup: "mdi-menu-down",
        dropdown: "mdi-menu-down",
        radioOn: "mdi-radiobox-marked",
        radioOff: "mdi-radiobox-blank",
        edit: "mdi-pencil",
        ratingEmpty: "mdi-star-outline",
        ratingFull: "mdi-star",
        ratingHalf: "mdi-star-half-full",
        loading: "mdi-cached",
        first: "mdi-page-first",
        last: "mdi-page-last",
        unfold: "mdi-unfold-more-horizontal",
        file: "mdi-paperclip",
        plus: "mdi-plus",
        minus: "mdi-minus",
        calendar: "mdi-calendar",
        treeviewCollapse: "mdi-menu-down",
        treeviewExpand: "mdi-menu-right",
        eyeDropper: "mdi-eyedropper",
    },
    ny = { component: (e) => pn(cd, { ...e, class: "mdi" }) },
    Ee = [String, Function, Object, Array],
    qr = Symbol.for("vuetify:icons"),
    Ka = q({ icon: { type: Ee }, tag: { type: String, required: !0 } }, "icon"),
    Bs = de()({
        name: "VComponentIcon",
        props: Ka(),
        setup(e, t) {
            let { slots: n } = t;
            return () => {
                const l = e.icon;
                return h(e.tag, null, {
                    default: () => {
                        var a;
                        return [
                            e.icon
                                ? h(l, null, null)
                                : (a = n.default) == null
                                ? void 0
                                : a.call(n),
                        ];
                    },
                });
            };
        },
    }),
    ud = dl({
        name: "VSvgIcon",
        inheritAttrs: !1,
        props: Ka(),
        setup(e, t) {
            let { attrs: n } = t;
            return () =>
                h(e.tag, ke(n, { style: null }), {
                    default: () => [
                        h(
                            "svg",
                            {
                                class: "v-icon__svg",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                role: "img",
                                "aria-hidden": "true",
                            },
                            [
                                Array.isArray(e.icon)
                                    ? e.icon.map((l) =>
                                          Array.isArray(l)
                                              ? h(
                                                    "path",
                                                    {
                                                        d: l[0],
                                                        "fill-opacity": l[1],
                                                    },
                                                    null
                                                )
                                              : h("path", { d: l }, null)
                                      )
                                    : h("path", { d: e.icon }, null),
                            ]
                        ),
                    ],
                });
        },
    });
dl({
    name: "VLigatureIcon",
    props: Ka(),
    setup(e) {
        return () => h(e.tag, null, { default: () => [e.icon] });
    },
});
const cd = dl({
    name: "VClassIcon",
    props: Ka(),
    setup(e) {
        return () => h(e.tag, { class: e.icon }, null);
    },
});
function ly() {
    return { svg: { component: ud }, class: { component: cd } };
}
function ay(e) {
    const t = ly(),
        n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
    return (
        n === "mdi" && !t.mdi && (t.mdi = ny),
        nt(
            {
                defaultSet: n,
                sets: t,
                aliases: {
                    ...ty,
                    vuetify: [
                        "M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",
                        [
                            "M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",
                            0.6,
                        ],
                    ],
                    "vuetify-outline":
                        "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
                    "vuetify-play": [
                        "m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z",
                        [
                            "M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z",
                            0.6,
                        ],
                    ],
                },
            },
            e
        )
    );
}
const ry = (e) => {
        const t = Pe(qr);
        if (!t) throw new Error("Missing Vuetify Icons provide!");
        return {
            iconData: S(() => {
                var s;
                const l = Xe(e);
                if (!l) return { component: Bs };
                let a = l;
                if (
                    (typeof a == "string" &&
                        ((a = a.trim()),
                        a.startsWith("$") &&
                            (a =
                                (s = t.aliases) == null
                                    ? void 0
                                    : s[a.slice(1)])),
                    Array.isArray(a))
                )
                    return { component: ud, icon: a };
                if (typeof a != "string") return { component: Bs, icon: a };
                const r = Object.keys(t.sets).find(
                        (u) => typeof a == "string" && a.startsWith(`${u}:`)
                    ),
                    o = r ? a.slice(r.length + 1) : a;
                return {
                    component: t.sets[r ?? t.defaultSet].component,
                    icon: o,
                };
            }),
        };
    },
    Ra = Symbol.for("vuetify:theme"),
    We = q({ theme: String }, "theme");
function Ds() {
    return {
        defaultTheme: "light",
        variations: { colors: [], lighten: 0, darken: 0 },
        themes: {
            light: {
                dark: !1,
                colors: {
                    background: "#FFFFFF",
                    surface: "#FFFFFF",
                    "surface-bright": "#FFFFFF",
                    "surface-light": "#EEEEEE",
                    "surface-variant": "#424242",
                    "on-surface-variant": "#EEEEEE",
                    primary: "#1867C0",
                    "primary-darken-1": "#1F5592",
                    secondary: "#48A9A6",
                    "secondary-darken-1": "#018786",
                    error: "#B00020",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FB8C00",
                },
                variables: {
                    "border-color": "#000000",
                    "border-opacity": 0.12,
                    "high-emphasis-opacity": 0.87,
                    "medium-emphasis-opacity": 0.6,
                    "disabled-opacity": 0.38,
                    "idle-opacity": 0.04,
                    "hover-opacity": 0.04,
                    "focus-opacity": 0.12,
                    "selected-opacity": 0.08,
                    "activated-opacity": 0.12,
                    "pressed-opacity": 0.12,
                    "dragged-opacity": 0.08,
                    "theme-kbd": "#212529",
                    "theme-on-kbd": "#FFFFFF",
                    "theme-code": "#F5F5F5",
                    "theme-on-code": "#000000",
                },
            },
            dark: {
                dark: !0,
                colors: {
                    background: "#121212",
                    surface: "#212121",
                    "surface-bright": "#ccbfd6",
                    "surface-light": "#424242",
                    "surface-variant": "#a3a3a3",
                    "on-surface-variant": "#424242",
                    primary: "#2196F3",
                    "primary-darken-1": "#277CC1",
                    secondary: "#54B6B2",
                    "secondary-darken-1": "#48A9A6",
                    error: "#CF6679",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FB8C00",
                },
                variables: {
                    "border-color": "#FFFFFF",
                    "border-opacity": 0.12,
                    "high-emphasis-opacity": 1,
                    "medium-emphasis-opacity": 0.7,
                    "disabled-opacity": 0.5,
                    "idle-opacity": 0.1,
                    "hover-opacity": 0.04,
                    "focus-opacity": 0.12,
                    "selected-opacity": 0.08,
                    "activated-opacity": 0.12,
                    "pressed-opacity": 0.16,
                    "dragged-opacity": 0.08,
                    "theme-kbd": "#212529",
                    "theme-on-kbd": "#FFFFFF",
                    "theme-code": "#343434",
                    "theme-on-code": "#CCCCCC",
                },
            },
        },
    };
}
function oy() {
    var l, a;
    let e =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ds();
    const t = Ds();
    if (!e) return { ...t, isDisabled: !0 };
    const n = {};
    for (const [r, o] of Object.entries(e.themes ?? {})) {
        const i =
            o.dark || r === "dark"
                ? (l = t.themes) == null
                    ? void 0
                    : l.dark
                : (a = t.themes) == null
                ? void 0
                : a.light;
        n[r] = nt(i, o);
    }
    return nt(t, { ...e, themes: n });
}
function iy(e) {
    const t = oy(e),
        n = le(t.defaultTheme),
        l = le(t.themes),
        a = S(() => {
            const c = {};
            for (const [d, f] of Object.entries(l.value)) {
                const v = (c[d] = { ...f, colors: { ...f.colors } });
                if (t.variations)
                    for (const g of t.variations.colors) {
                        const m = v.colors[g];
                        if (m)
                            for (const p of ["lighten", "darken"]) {
                                const C = p === "lighten" ? Xh : jh;
                                for (const x of Bc(t.variations[p], 1))
                                    v.colors[`${g}-${p}-${x}`] = $h(
                                        C(Ft(m), x)
                                    );
                            }
                    }
                for (const g of Object.keys(v.colors)) {
                    if (/^on-[a-z]/.test(g) || v.colors[`on-${g}`]) continue;
                    const m = `on-${g}`,
                        p = Ft(v.colors[g]);
                    v.colors[m] = Qc(p);
                }
            }
            return c;
        }),
        r = S(() => a.value[n.value]),
        o = S(() => {
            var g;
            const c = [];
            (g = r.value) != null &&
                g.dark &&
                _n(c, ":root", ["color-scheme: dark"]),
                _n(c, ":root", Hs(r.value));
            for (const [m, p] of Object.entries(a.value))
                _n(c, `.v-theme--${m}`, [
                    `color-scheme: ${p.dark ? "dark" : "normal"}`,
                    ...Hs(p),
                ]);
            const d = [],
                f = [],
                v = new Set(
                    Object.values(a.value).flatMap((m) => Object.keys(m.colors))
                );
            for (const m of v)
                /^on-[a-z]/.test(m)
                    ? _n(f, `.${m}`, [
                          `color: rgb(var(--v-theme-${m})) !important`,
                      ])
                    : (_n(d, `.bg-${m}`, [
                          `--v-theme-overlay-multiplier: var(--v-theme-${m}-overlay-multiplier)`,
                          `background-color: rgb(var(--v-theme-${m})) !important`,
                          `color: rgb(var(--v-theme-on-${m})) !important`,
                      ]),
                      _n(f, `.text-${m}`, [
                          `color: rgb(var(--v-theme-${m})) !important`,
                      ]),
                      _n(f, `.border-${m}`, [
                          `--v-border-color: var(--v-theme-${m})`,
                      ]));
            return (
                c.push(...d, ...f),
                c.map((m, p) => (p === 0 ? m : `    ${m}`)).join("")
            );
        });
    function i() {
        return {
            style: [
                {
                    children: o.value,
                    id: "vuetify-theme-stylesheet",
                    nonce: t.cspNonce || !1,
                },
            ],
        };
    }
    function s(c) {
        if (t.isDisabled) return;
        const d = c._context.provides.usehead;
        if (d)
            if (d.push) {
                const v = d.push(i);
                Ve &&
                    ue(o, () => {
                        v.patch(i);
                    });
            } else
                Ve
                    ? (d.addHeadObjs(S(i)), mt(() => d.updateDOM()))
                    : d.addHeadObjs(i());
        else {
            let g = function () {
                if (typeof document < "u" && !v) {
                    const m = document.createElement("style");
                    (m.type = "text/css"),
                        (m.id = "vuetify-theme-stylesheet"),
                        t.cspNonce && m.setAttribute("nonce", t.cspNonce),
                        (v = m),
                        document.head.appendChild(v);
                }
                v && (v.innerHTML = o.value);
            };
            var f = g;
            let v = Ve
                ? document.getElementById("vuetify-theme-stylesheet")
                : null;
            Ve ? ue(o, g, { immediate: !0 }) : g();
        }
    }
    const u = S(() => (t.isDisabled ? void 0 : `v-theme--${n.value}`));
    return {
        install: s,
        isDisabled: t.isDisabled,
        name: n,
        themes: l,
        current: r,
        computedThemes: a,
        themeClasses: u,
        styles: o,
        global: { name: n, current: r },
    };
}
function Qe(e) {
    je("provideTheme");
    const t = Pe(Ra, null);
    if (!t) throw new Error("Could not find Vuetify theme injection");
    const n = S(() => e.theme ?? t.name.value),
        l = S(() => t.themes.value[n.value]),
        a = S(() => (t.isDisabled ? void 0 : `v-theme--${n.value}`)),
        r = { ...t, name: n, current: l, themeClasses: a };
    return qe(Ra, r), r;
}
function _n(e, t, n) {
    e.push(
        `${t} {
`,
        ...n.map(
            (l) => `  ${l};
`
        ),
        `}
`
    );
}
function Hs(e) {
    const t = e.dark ? 2 : 1,
        n = e.dark ? 1 : 2,
        l = [];
    for (const [a, r] of Object.entries(e.colors)) {
        const o = Ft(r);
        l.push(`--v-theme-${a}: ${o.r},${o.g},${o.b}`),
            a.startsWith("on-") ||
                l.push(
                    `--v-theme-${a}-overlay-multiplier: ${Wh(r) > 0.18 ? t : n}`
                );
    }
    for (const [a, r] of Object.entries(e.variables)) {
        const o = typeof r == "string" && r.startsWith("#") ? Ft(r) : void 0,
            i = o ? `${o.r}, ${o.g}, ${o.b}` : void 0;
        l.push(`--v-${a}: ${i ?? r}`);
    }
    return l;
}
function nl(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : "content";
    const n = jr(),
        l = le();
    if (Ve) {
        const a = new ResizeObserver((r) => {
            r.length &&
                (t === "content"
                    ? (l.value = r[0].contentRect)
                    : (l.value = r[0].target.getBoundingClientRect()));
        });
        ht(() => {
            a.disconnect();
        }),
            ue(
                () => n.el,
                (r, o) => {
                    o && (a.unobserve(o), (l.value = void 0)),
                        r && a.observe(r);
                },
                { flush: "post" }
            );
    }
    return { resizeRef: n, contentRect: ul(l) };
}
const La = Symbol.for("vuetify:layout"),
    dd = Symbol.for("vuetify:layout-item"),
    Ns = 1e3,
    sy = q(
        { overlaps: { type: Array, default: () => [] }, fullHeight: Boolean },
        "layout"
    ),
    uy = q(
        {
            name: { type: String },
            order: { type: [Number, String], default: 0 },
            absolute: Boolean,
        },
        "layout-item"
    );
function cy() {
    const e = Pe(La);
    if (!e) throw new Error("[Vuetify] Could not find injected layout");
    return {
        layoutIsReady: Ge(),
        getLayoutItem: e.getLayoutItem,
        mainRect: e.mainRect,
        mainStyles: e.mainStyles,
    };
}
function dy(e) {
    const t = Pe(La);
    if (!t) throw new Error("[Vuetify] Could not find injected layout");
    const n = e.id ?? `layout-item-${Tt()}`,
        l = je("useLayoutItem");
    qe(dd, { id: n });
    const a = oe(!1);
    gc(() => (a.value = !0)), hc(() => (a.value = !1));
    const r = Ge(),
        { layoutItemStyles: o, layoutItemScrimStyles: i } = t.register(l, {
            ...e,
            active: S(() => (a.value ? !1 : e.active.value)),
            id: n,
        });
    return (
        ht(() => t.unregister(n)),
        {
            layoutItemStyles: o,
            layoutRect: t.layoutRect,
            layoutItemScrimStyles: i,
            layoutIsReady: r,
        }
    );
}
const fy = (e, t, n, l) => {
    let a = { top: 0, left: 0, right: 0, bottom: 0 };
    const r = [{ id: "", layer: { ...a } }];
    for (const o of e) {
        const i = t.get(o),
            s = n.get(o),
            u = l.get(o);
        if (!i || !s || !u) continue;
        const c = {
            ...a,
            [i.value]:
                parseInt(a[i.value], 10) +
                (u.value ? parseInt(s.value, 10) : 0),
        };
        r.push({ id: o, layer: c }), (a = c);
    }
    return r;
};
function vy(e) {
    const t = Pe(La, null),
        n = S(() => (t ? t.rootZIndex.value - 100 : Ns)),
        l = le([]),
        a = Ze(new Map()),
        r = Ze(new Map()),
        o = Ze(new Map()),
        i = Ze(new Map()),
        s = Ze(new Map()),
        { resizeRef: u, contentRect: c } = nl(),
        d = fs(() => {
            const k = [...new Set([...o.values()].map((w) => w.value))].sort(
                    (w, L) => w - L
                ),
                A = [];
            for (const w of k) {
                const L = l.value.filter((E) => {
                    var V;
                    return ((V = o.get(E)) == null ? void 0 : V.value) === w;
                });
                A.push(...L);
            }
            return fy(A, a, r, i);
        }),
        f = S(() => !Array.from(s.values()).some((k) => k.value)),
        v = S(() => d.value[d.value.length - 1].layer),
        g = S(() => ({
            "--v-layout-left": me(v.value.left),
            "--v-layout-right": me(v.value.right),
            "--v-layout-top": me(v.value.top),
            "--v-layout-bottom": me(v.value.bottom),
            ...(f.value ? void 0 : { transition: "none" }),
        })),
        m = fs(() =>
            d.value.slice(1).map((k, A) => {
                let { id: w } = k;
                const { layer: L } = d.value[A],
                    E = r.get(w),
                    V = a.get(w);
                return {
                    id: w,
                    ...L,
                    size: Number(E.value),
                    position: V.value,
                };
            })
        ),
        p = (k) => m.value.find((A) => A.id === k),
        C = je("createLayout"),
        x = Ge();
    qe(La, {
        register: (k, A) => {
            let {
                id: w,
                order: L,
                position: E,
                layoutSize: V,
                elementSize: R,
                active: M,
                disableTransitions: B,
                absolute: $,
            } = A;
            o.set(w, L),
                a.set(w, E),
                r.set(w, V),
                i.set(w, M),
                B && s.set(w, B);
            const ee = zn(dd, C == null ? void 0 : C.vnode).indexOf(k);
            ee > -1 ? l.value.splice(ee, 0, w) : l.value.push(w);
            const ne = S(() => m.value.findIndex((z) => z.id === w)),
                H = S(() => n.value + d.value.length * 2 - ne.value * 2),
                X = S(() => {
                    const z = E.value === "left" || E.value === "right",
                        J = E.value === "right",
                        ie = E.value === "bottom",
                        pe = R.value ?? V.value,
                        Ce = pe === 0 ? "%" : "px",
                        ae = {
                            [E.value]: 0,
                            zIndex: H.value,
                            transform: `translate${z ? "X" : "Y"}(${
                                (M.value ? 0 : -(pe === 0 ? 100 : pe)) *
                                (J || ie ? -1 : 1)
                            }${Ce})`,
                            position:
                                $.value || n.value !== Ns
                                    ? "absolute"
                                    : "fixed",
                            ...(f.value ? void 0 : { transition: "none" }),
                        };
                    if (ne.value < 0)
                        throw new Error(`Layout item "${w}" is missing`);
                    const I = m.value[ne.value];
                    if (!I)
                        throw new Error(
                            `[Vuetify] Could not find layout item "${w}"`
                        );
                    return {
                        ...ae,
                        height: z
                            ? `calc(100% - ${I.top}px - ${I.bottom}px)`
                            : R.value
                            ? `${R.value}px`
                            : void 0,
                        left: J ? void 0 : `${I.left}px`,
                        right: J ? `${I.right}px` : void 0,
                        top: E.value !== "bottom" ? `${I.top}px` : void 0,
                        bottom: E.value !== "top" ? `${I.bottom}px` : void 0,
                        width: z
                            ? R.value
                                ? `${R.value}px`
                                : void 0
                            : `calc(100% - ${I.left}px - ${I.right}px)`,
                    };
                }),
                F = S(() => ({ zIndex: H.value - 1 }));
            return { layoutItemStyles: X, layoutItemScrimStyles: F, zIndex: H };
        },
        unregister: (k) => {
            o.delete(k),
                a.delete(k),
                r.delete(k),
                i.delete(k),
                s.delete(k),
                (l.value = l.value.filter((A) => A !== k));
        },
        mainRect: v,
        mainStyles: g,
        getLayoutItem: p,
        items: m,
        layoutRect: c,
        rootZIndex: n,
        layoutIsReady: x,
    });
    const _ = S(() => ["v-layout", { "v-layout--full-height": e.fullHeight }]),
        T = S(() => ({
            zIndex: t ? n.value : void 0,
            position: t ? "relative" : void 0,
            overflow: t ? "hidden" : void 0,
        }));
    return {
        layoutClasses: _,
        layoutStyles: T,
        getLayoutItem: p,
        items: m,
        layoutRect: c,
        layoutIsReady: x,
        layoutRef: u,
    };
}
function fd() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { blueprint: t, ...n } = e,
        l = nt(t, n),
        { aliases: a = {}, components: r = {}, directives: o = {} } = l,
        i = Kh(l.defaults),
        s = Yg(l.display, l.ssr),
        u = iy(l.theme),
        c = ay(l.icons),
        d = ag(l.locale),
        f = Wg(l.date, d),
        v = Zg(l.goTo, d);
    return {
        install: (m) => {
            for (const p in o) m.directive(p, o[p]);
            for (const p in r) m.component(p, r[p]);
            for (const p in a)
                m.component(p, dl({ ...a[p], name: p, aliasName: a[p].name }));
            if (
                (u.install(m),
                m.provide(tl, i),
                m.provide(Yr, s),
                m.provide(Ra, u),
                m.provide(qr, c),
                m.provide(Ia, d),
                m.provide(jg, f.options),
                m.provide(Is, f.instance),
                m.provide(id, v),
                Ve && l.ssr)
            )
                if (m.$nuxt)
                    m.$nuxt.hook("app:suspense:resolve", () => {
                        s.update();
                    });
                else {
                    const { mount: p } = m;
                    m.mount = function () {
                        const C = p(...arguments);
                        return Ge(() => s.update()), (m.mount = p), C;
                    };
                }
            Tt.reset(),
                m.mixin({
                    computed: {
                        $vuetify() {
                            return Ze({
                                defaults: $n.call(this, tl),
                                display: $n.call(this, Yr),
                                theme: $n.call(this, Ra),
                                icons: $n.call(this, qr),
                                locale: $n.call(this, Ia),
                                date: $n.call(this, Is),
                            });
                        },
                    },
                });
        },
        defaults: i,
        display: s,
        theme: u,
        icons: c,
        locale: d,
        date: f,
        goTo: v,
    };
}
const my = "3.6.9";
fd.version = my;
function $n(e) {
    var l, a;
    const t = this.$,
        n =
            ((l = t.parent) == null ? void 0 : l.provides) ??
            ((a = t.vnode.appContext) == null ? void 0 : a.provides);
    if (n && e in n) return n[e];
}
const hy = fd({ theme: { defaultTheme: "light" } }),
    gy = "/assets/icon-BJEeRdCC.png",
    Zo = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [l, a] of t) n[l] = a;
        return n;
    },
    yy = {},
    py = (e) => (_o("data-v-4786bde2"), (e = e()), xo(), e),
    by = py(() =>
        Ie("section", null, [Ie("span"), Ie("img", { src: gy, alt: "" })], -1)
    ),
    Sy = [by];
function Cy(e, t) {
    return Ke(), _t("main", null, Sy);
}
const ky = Zo(yy, [
        ["render", Cy],
        ["__scopeId", "data-v-4786bde2"],
    ]),
    ze = q({ tag: { type: String, default: "div" } }, "tag"),
    wy = q({ text: String, ...Ae(), ...ze() }, "VToolbarTitle"),
    Ay = de()({
        name: "VToolbarTitle",
        props: wy(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() => {
                    const l = !!(n.default || n.text || e.text);
                    return h(
                        e.tag,
                        { class: ["v-toolbar-title", e.class], style: e.style },
                        {
                            default: () => {
                                var a;
                                return [
                                    l &&
                                        h(
                                            "div",
                                            {
                                                class: "v-toolbar-title__placeholder",
                                            },
                                            [
                                                n.text ? n.text() : e.text,
                                                (a = n.default) == null
                                                    ? void 0
                                                    : a.call(n),
                                            ]
                                        ),
                                ];
                            },
                        }
                    );
                }),
                {}
            );
        },
    }),
    _y = q(
        {
            disabled: Boolean,
            group: Boolean,
            hideOnLeave: Boolean,
            leaveAbsolute: Boolean,
            mode: String,
            origin: String,
        },
        "transition"
    );
function gt(e, t, n) {
    return de()({
        name: e,
        props: _y({ mode: n, origin: t }),
        setup(l, a) {
            let { slots: r } = a;
            const o = {
                onBeforeEnter(i) {
                    l.origin && (i.style.transformOrigin = l.origin);
                },
                onLeave(i) {
                    if (l.leaveAbsolute) {
                        const {
                            offsetTop: s,
                            offsetLeft: u,
                            offsetWidth: c,
                            offsetHeight: d,
                        } = i;
                        (i._transitionInitialStyles = {
                            position: i.style.position,
                            top: i.style.top,
                            left: i.style.left,
                            width: i.style.width,
                            height: i.style.height,
                        }),
                            (i.style.position = "absolute"),
                            (i.style.top = `${s}px`),
                            (i.style.left = `${u}px`),
                            (i.style.width = `${c}px`),
                            (i.style.height = `${d}px`);
                    }
                    l.hideOnLeave &&
                        i.style.setProperty("display", "none", "important");
                },
                onAfterLeave(i) {
                    if (
                        l.leaveAbsolute &&
                        i != null &&
                        i._transitionInitialStyles
                    ) {
                        const {
                            position: s,
                            top: u,
                            left: c,
                            width: d,
                            height: f,
                        } = i._transitionInitialStyles;
                        delete i._transitionInitialStyles,
                            (i.style.position = s || ""),
                            (i.style.top = u || ""),
                            (i.style.left = c || ""),
                            (i.style.width = d || ""),
                            (i.style.height = f || "");
                    }
                },
            };
            return () => {
                const i = l.group ? $o : Yt;
                return pn(
                    i,
                    {
                        name: l.disabled ? "" : e,
                        css: !l.disabled,
                        ...(l.group ? void 0 : { mode: l.mode }),
                        ...(l.disabled ? {} : o),
                    },
                    r.default
                );
            };
        },
    });
}
function vd(e, t) {
    let n =
        arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : "in-out";
    return de()({
        name: e,
        props: {
            mode: { type: String, default: n },
            disabled: Boolean,
            group: Boolean,
        },
        setup(l, a) {
            let { slots: r } = a;
            const o = l.group ? $o : Yt;
            return () =>
                pn(
                    o,
                    {
                        name: l.disabled ? "" : e,
                        css: !l.disabled,
                        ...(l.disabled ? {} : t),
                    },
                    r.default
                );
        },
    });
}
function md() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    const n = (
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
        )
            ? "width"
            : "height",
        l = Ct(`offset-${n}`);
    return {
        onBeforeEnter(o) {
            (o._parent = o.parentNode),
                (o._initialStyle = {
                    transition: o.style.transition,
                    overflow: o.style.overflow,
                    [n]: o.style[n],
                });
        },
        onEnter(o) {
            const i = o._initialStyle;
            o.style.setProperty("transition", "none", "important"),
                (o.style.overflow = "hidden");
            const s = `${o[l]}px`;
            (o.style[n] = "0"),
                o.offsetHeight,
                (o.style.transition = i.transition),
                e && o._parent && o._parent.classList.add(e),
                requestAnimationFrame(() => {
                    o.style[n] = s;
                });
        },
        onAfterEnter: r,
        onEnterCancelled: r,
        onLeave(o) {
            (o._initialStyle = {
                transition: "",
                overflow: o.style.overflow,
                [n]: o.style[n],
            }),
                (o.style.overflow = "hidden"),
                (o.style[n] = `${o[l]}px`),
                o.offsetHeight,
                requestAnimationFrame(() => (o.style[n] = "0"));
        },
        onAfterLeave: a,
        onLeaveCancelled: a,
    };
    function a(o) {
        e && o._parent && o._parent.classList.remove(e), r(o);
    }
    function r(o) {
        const i = o._initialStyle[n];
        (o.style.overflow = o._initialStyle.overflow),
            i != null && (o.style[n] = i),
            delete o._initialStyle;
    }
}
const xy = q({ target: [Object, Array] }, "v-dialog-transition"),
    hd = de()({
        name: "VDialogTransition",
        props: xy(),
        setup(e, t) {
            let { slots: n } = t;
            const l = {
                onBeforeEnter(a) {
                    (a.style.pointerEvents = "none"),
                        (a.style.visibility = "hidden");
                },
                async onEnter(a, r) {
                    var f;
                    await new Promise((v) => requestAnimationFrame(v)),
                        await new Promise((v) => requestAnimationFrame(v)),
                        (a.style.visibility = "");
                    const {
                            x: o,
                            y: i,
                            sx: s,
                            sy: u,
                            speed: c,
                        } = Gs(e.target, a),
                        d = Xn(
                            a,
                            [
                                {
                                    transform: `translate(${o}px, ${i}px) scale(${s}, ${u})`,
                                    opacity: 0,
                                },
                                {},
                            ],
                            { duration: 225 * c, easing: Qh }
                        );
                    (f = $s(a)) == null ||
                        f.forEach((v) => {
                            Xn(
                                v,
                                [
                                    { opacity: 0 },
                                    { opacity: 0, offset: 0.33 },
                                    {},
                                ],
                                { duration: 225 * 2 * c, easing: Ta }
                            );
                        }),
                        d.finished.then(() => r());
                },
                onAfterEnter(a) {
                    a.style.removeProperty("pointer-events");
                },
                onBeforeLeave(a) {
                    a.style.pointerEvents = "none";
                },
                async onLeave(a, r) {
                    var f;
                    await new Promise((v) => requestAnimationFrame(v));
                    const {
                        x: o,
                        y: i,
                        sx: s,
                        sy: u,
                        speed: c,
                    } = Gs(e.target, a);
                    Xn(
                        a,
                        [
                            {},
                            {
                                transform: `translate(${o}px, ${i}px) scale(${s}, ${u})`,
                                opacity: 0,
                            },
                        ],
                        { duration: 125 * c, easing: Zh }
                    ).finished.then(() => r()),
                        (f = $s(a)) == null ||
                            f.forEach((v) => {
                                Xn(
                                    v,
                                    [
                                        {},
                                        { opacity: 0, offset: 0.2 },
                                        { opacity: 0 },
                                    ],
                                    { duration: 125 * 2 * c, easing: Ta }
                                );
                            });
                },
                onAfterLeave(a) {
                    a.style.removeProperty("pointer-events");
                },
            };
            return () =>
                e.target
                    ? h(
                          Yt,
                          ke({ name: "dialog-transition" }, l, { css: !1 }),
                          n
                      )
                    : h(Yt, { name: "dialog-transition" }, n);
        },
    });
function $s(e) {
    var n;
    const t =
        (n = e.querySelector(
            ":scope > .v-card, :scope > .v-sheet, :scope > .v-list"
        )) == null
            ? void 0
            : n.children;
    return t && [...t];
}
function Gs(e, t) {
    const n = Wc(e),
        l = Wo(t),
        [a, r] = getComputedStyle(t)
            .transformOrigin.split(" ")
            .map((C) => parseFloat(C)),
        [o, i] = getComputedStyle(t)
            .getPropertyValue("--v-overlay-anchor-origin")
            .split(" ");
    let s = n.left + n.width / 2;
    o === "left" || i === "left"
        ? (s -= n.width / 2)
        : (o === "right" || i === "right") && (s += n.width / 2);
    let u = n.top + n.height / 2;
    o === "top" || i === "top"
        ? (u -= n.height / 2)
        : (o === "bottom" || i === "bottom") && (u += n.height / 2);
    const c = n.width / l.width,
        d = n.height / l.height,
        f = Math.max(1, c, d),
        v = c / f || 0,
        g = d / f || 0,
        m = (l.width * l.height) / (window.innerWidth * window.innerHeight),
        p = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
    return { x: s - (a + l.left), y: u - (r + l.top), sx: v, sy: g, speed: p };
}
gt("fab-transition", "center center", "out-in");
gt("dialog-bottom-transition");
gt("dialog-top-transition");
const zs = gt("fade-transition");
gt("scale-transition");
gt("scroll-x-transition");
gt("scroll-x-reverse-transition");
gt("scroll-y-transition");
gt("scroll-y-reverse-transition");
gt("slide-x-transition");
gt("slide-x-reverse-transition");
const gd = gt("slide-y-transition");
gt("slide-y-reverse-transition");
const yd = vd("expand-transition", md()),
    pd = vd("expand-x-transition", md("", !0)),
    My = q(
        {
            defaults: Object,
            disabled: Boolean,
            reset: [Number, String],
            root: [Boolean, String],
            scoped: Boolean,
        },
        "VDefaultsProvider"
    ),
    Fe = de(!1)({
        name: "VDefaultsProvider",
        props: My(),
        setup(e, t) {
            let { slots: n } = t;
            const {
                defaults: l,
                disabled: a,
                reset: r,
                root: o,
                scoped: i,
            } = ko(e);
            return (
                Fn(l, { reset: r, root: o, scoped: i, disabled: a }),
                () => {
                    var s;
                    return (s = n.default) == null ? void 0 : s.call(n);
                }
            );
        },
    }),
    Ht = q(
        {
            height: [Number, String],
            maxHeight: [Number, String],
            maxWidth: [Number, String],
            minHeight: [Number, String],
            minWidth: [Number, String],
            width: [Number, String],
        },
        "dimension"
    );
function Nt(e) {
    return {
        dimensionStyles: S(() => {
            const n = {},
                l = me(e.height),
                a = me(e.maxHeight),
                r = me(e.maxWidth),
                o = me(e.minHeight),
                i = me(e.minWidth),
                s = me(e.width);
            return (
                l != null && (n.height = l),
                a != null && (n.maxHeight = a),
                r != null && (n.maxWidth = r),
                o != null && (n.minHeight = o),
                i != null && (n.minWidth = i),
                s != null && (n.width = s),
                n
            );
        }),
    };
}
function Ey(e) {
    return {
        aspectStyles: S(() => {
            const t = Number(e.aspectRatio);
            return t ? { paddingBottom: String((1 / t) * 100) + "%" } : void 0;
        }),
    };
}
const bd = q(
        {
            aspectRatio: [String, Number],
            contentClass: null,
            inline: Boolean,
            ...Ae(),
            ...Ht(),
        },
        "VResponsive"
    ),
    Mn = de()({
        name: "VResponsive",
        props: bd(),
        setup(e, t) {
            let { slots: n } = t;
            const { aspectStyles: l } = Ey(e),
                { dimensionStyles: a } = Nt(e);
            return (
                Se(() => {
                    var r;
                    return h(
                        "div",
                        {
                            class: [
                                "v-responsive",
                                { "v-responsive--inline": e.inline },
                                e.class,
                            ],
                            style: [a.value, e.style],
                        },
                        [
                            h(
                                "div",
                                {
                                    class: "v-responsive__sizer",
                                    style: l.value,
                                },
                                null
                            ),
                            (r = n.additional) == null ? void 0 : r.call(n),
                            n.default &&
                                h(
                                    "div",
                                    {
                                        class: [
                                            "v-responsive__content",
                                            e.contentClass,
                                        ],
                                    },
                                    [n.default()]
                                ),
                        ]
                    );
                }),
                {}
            );
        },
    });
function Jo(e) {
    return Xo(() => {
        const t = [],
            n = {};
        if (e.value.background)
            if (Ur(e.value.background)) {
                if (
                    ((n.backgroundColor = e.value.background),
                    !e.value.text && Hh(e.value.background))
                ) {
                    const l = Ft(e.value.background);
                    if (l.a == null || l.a === 1) {
                        const a = Qc(l);
                        (n.color = a), (n.caretColor = a);
                    }
                }
            } else t.push(`bg-${e.value.background}`);
        return (
            e.value.text &&
                (Ur(e.value.text)
                    ? ((n.color = e.value.text), (n.caretColor = e.value.text))
                    : t.push(`text-${e.value.text}`)),
            { colorClasses: t, colorStyles: n }
        );
    });
}
function Mt(e, t) {
    const n = S(() => ({ text: He(e) ? e.value : t ? e[t] : null })),
        { colorClasses: l, colorStyles: a } = Jo(n);
    return { textColorClasses: l, textColorStyles: a };
}
function Ut(e, t) {
    const n = S(() => ({ background: He(e) ? e.value : t ? e[t] : null })),
        { colorClasses: l, colorStyles: a } = Jo(n);
    return { backgroundColorClasses: l, backgroundColorStyles: a };
}
const kt = q(
    {
        rounded: { type: [Boolean, Number, String], default: void 0 },
        tile: Boolean,
    },
    "rounded"
);
function wt(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return {
        roundedClasses: S(() => {
            const l = He(e) ? e.value : e.rounded,
                a = He(e) ? e.value : e.tile,
                r = [];
            if (l === !0 || l === "") r.push(`${t}--rounded`);
            else if (typeof l == "string" || l === 0)
                for (const o of String(l).split(" ")) r.push(`rounded-${o}`);
            else (a || l === !1) && r.push("rounded-0");
            return r;
        }),
    };
}
const fl = q(
        {
            transition: {
                type: [Boolean, String, Object],
                default: "fade-transition",
                validator: (e) => e !== !0,
            },
        },
        "transition"
    ),
    cn = (e, t) => {
        let { slots: n } = t;
        const { transition: l, disabled: a, group: r, ...o } = e,
            { component: i = r ? $o : Yt, ...s } =
                typeof l == "object" ? l : {};
        return pn(
            i,
            ke(
                typeof l == "string" ? { name: a ? "" : l } : s,
                typeof l == "string"
                    ? {}
                    : Object.fromEntries(
                          Object.entries({ disabled: a, group: r }).filter(
                              (u) => {
                                  let [c, d] = u;
                                  return d !== void 0;
                              }
                          )
                      ),
                o
            ),
            n
        );
    };
function Ty(e, t) {
    if (!Go) return;
    const n = t.modifiers || {},
        l = t.value,
        { handler: a, options: r } =
            typeof l == "object" ? l : { handler: l, options: {} },
        o = new IntersectionObserver(function () {
            var d;
            let i =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : [],
                s = arguments.length > 1 ? arguments[1] : void 0;
            const u = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
            if (!u) return;
            const c = i.some((f) => f.isIntersecting);
            a && (!n.quiet || u.init) && (!n.once || c || u.init) && a(c, i, s),
                c && n.once ? Sd(e, t) : (u.init = !0);
        }, r);
    (e._observe = Object(e._observe)),
        (e._observe[t.instance.$.uid] = { init: !1, observer: o }),
        o.observe(e);
}
function Sd(e, t) {
    var l;
    const n = (l = e._observe) == null ? void 0 : l[t.instance.$.uid];
    n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Cd = { mounted: Ty, unmounted: Sd },
    Py = q(
        {
            alt: String,
            cover: Boolean,
            color: String,
            draggable: { type: [Boolean, String], default: void 0 },
            eager: Boolean,
            gradient: String,
            lazySrc: String,
            options: {
                type: Object,
                default: () => ({
                    root: void 0,
                    rootMargin: void 0,
                    threshold: void 0,
                }),
            },
            sizes: String,
            src: { type: [String, Object], default: "" },
            crossorigin: String,
            referrerpolicy: String,
            srcset: String,
            position: String,
            ...bd(),
            ...Ae(),
            ...kt(),
            ...fl(),
        },
        "VImg"
    ),
    ei = de()({
        name: "VImg",
        directives: { intersect: Cd },
        props: Py(),
        emits: { loadstart: (e) => !0, load: (e) => !0, error: (e) => !0 },
        setup(e, t) {
            let { emit: n, slots: l } = t;
            const { backgroundColorClasses: a, backgroundColorStyles: r } = Ut(
                    ce(e, "color")
                ),
                { roundedClasses: o } = wt(e),
                i = je("VImg"),
                s = oe(""),
                u = le(),
                c = oe(e.eager ? "loading" : "idle"),
                d = oe(),
                f = oe(),
                v = S(() =>
                    e.src && typeof e.src == "object"
                        ? {
                              src: e.src.src,
                              srcset: e.srcset || e.src.srcset,
                              lazySrc: e.lazySrc || e.src.lazySrc,
                              aspect: Number(
                                  e.aspectRatio || e.src.aspect || 0
                              ),
                          }
                        : {
                              src: e.src,
                              srcset: e.srcset,
                              lazySrc: e.lazySrc,
                              aspect: Number(e.aspectRatio || 0),
                          }
                ),
                g = S(() => v.value.aspect || d.value / f.value || 0);
            ue(
                () => e.src,
                () => {
                    m(c.value !== "idle");
                }
            ),
                ue(g, (M, B) => {
                    !M && B && u.value && T(u.value);
                }),
                Io(() => m());
            function m(M) {
                if (!(e.eager && M) && !(Go && !M && !e.eager)) {
                    if (((c.value = "loading"), v.value.lazySrc)) {
                        const B = new Image();
                        (B.src = v.value.lazySrc), T(B, null);
                    }
                    v.value.src &&
                        Ge(() => {
                            var B;
                            n(
                                "loadstart",
                                ((B = u.value) == null
                                    ? void 0
                                    : B.currentSrc) || v.value.src
                            ),
                                setTimeout(() => {
                                    var $;
                                    if (!i.isUnmounted)
                                        if (
                                            ($ = u.value) != null &&
                                            $.complete
                                        ) {
                                            if (
                                                (u.value.naturalWidth || C(),
                                                c.value === "error")
                                            )
                                                return;
                                            g.value || T(u.value, null),
                                                c.value === "loading" && p();
                                        } else g.value || T(u.value), x();
                                });
                        });
                }
            }
            function p() {
                var M;
                i.isUnmounted ||
                    (x(),
                    T(u.value),
                    (c.value = "loaded"),
                    n(
                        "load",
                        ((M = u.value) == null ? void 0 : M.currentSrc) ||
                            v.value.src
                    ));
            }
            function C() {
                var M;
                i.isUnmounted ||
                    ((c.value = "error"),
                    n(
                        "error",
                        ((M = u.value) == null ? void 0 : M.currentSrc) ||
                            v.value.src
                    ));
            }
            function x() {
                const M = u.value;
                M && (s.value = M.currentSrc || M.src);
            }
            let _ = -1;
            ht(() => {
                clearTimeout(_);
            });
            function T(M) {
                let B =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : 100;
                const $ = () => {
                    if ((clearTimeout(_), i.isUnmounted)) return;
                    const { naturalHeight: Z, naturalWidth: ee } = M;
                    Z || ee
                        ? ((d.value = ee), (f.value = Z))
                        : !M.complete && c.value === "loading" && B != null
                        ? (_ = window.setTimeout($, B))
                        : (M.currentSrc.endsWith(".svg") ||
                              M.currentSrc.startsWith("data:image/svg+xml")) &&
                          ((d.value = 1), (f.value = 1));
                };
                $();
            }
            const k = S(() => ({
                    "v-img__img--cover": e.cover,
                    "v-img__img--contain": !e.cover,
                })),
                A = () => {
                    var $;
                    if (!v.value.src || c.value === "idle") return null;
                    const M = h(
                            "img",
                            {
                                class: ["v-img__img", k.value],
                                style: { objectPosition: e.position },
                                src: v.value.src,
                                srcset: v.value.srcset,
                                alt: e.alt,
                                crossorigin: e.crossorigin,
                                referrerpolicy: e.referrerpolicy,
                                draggable: e.draggable,
                                sizes: e.sizes,
                                ref: u,
                                onLoad: p,
                                onError: C,
                            },
                            null
                        ),
                        B = ($ = l.sources) == null ? void 0 : $.call(l);
                    return h(
                        cn,
                        { transition: e.transition, appear: !0 },
                        {
                            default: () => [
                                ut(
                                    B
                                        ? h(
                                              "picture",
                                              { class: "v-img__picture" },
                                              [B, M]
                                          )
                                        : M,
                                    [[Ln, c.value === "loaded"]]
                                ),
                            ],
                        }
                    );
                },
                w = () =>
                    h(
                        cn,
                        { transition: e.transition },
                        {
                            default: () => [
                                v.value.lazySrc &&
                                    c.value !== "loaded" &&
                                    h(
                                        "img",
                                        {
                                            class: [
                                                "v-img__img",
                                                "v-img__img--preload",
                                                k.value,
                                            ],
                                            style: {
                                                objectPosition: e.position,
                                            },
                                            src: v.value.lazySrc,
                                            alt: e.alt,
                                            crossorigin: e.crossorigin,
                                            referrerpolicy: e.referrerpolicy,
                                            draggable: e.draggable,
                                        },
                                        null
                                    ),
                            ],
                        }
                    ),
                L = () =>
                    l.placeholder
                        ? h(
                              cn,
                              { transition: e.transition, appear: !0 },
                              {
                                  default: () => [
                                      (c.value === "loading" ||
                                          (c.value === "error" && !l.error)) &&
                                          h(
                                              "div",
                                              { class: "v-img__placeholder" },
                                              [l.placeholder()]
                                          ),
                                  ],
                              }
                          )
                        : null,
                E = () =>
                    l.error
                        ? h(
                              cn,
                              { transition: e.transition, appear: !0 },
                              {
                                  default: () => [
                                      c.value === "error" &&
                                          h("div", { class: "v-img__error" }, [
                                              l.error(),
                                          ]),
                                  ],
                              }
                          )
                        : null,
                V = () =>
                    e.gradient
                        ? h(
                              "div",
                              {
                                  class: "v-img__gradient",
                                  style: {
                                      backgroundImage: `linear-gradient(${e.gradient})`,
                                  },
                              },
                              null
                          )
                        : null,
                R = oe(!1);
            {
                const M = ue(g, (B) => {
                    B &&
                        (requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                R.value = !0;
                            });
                        }),
                        M());
                });
            }
            return (
                Se(() => {
                    const M = Mn.filterProps(e);
                    return ut(
                        h(
                            Mn,
                            ke(
                                {
                                    class: [
                                        "v-img",
                                        { "v-img--booting": !R.value },
                                        a.value,
                                        o.value,
                                        e.class,
                                    ],
                                    style: [
                                        {
                                            width: me(
                                                e.width === "auto"
                                                    ? d.value
                                                    : e.width
                                            ),
                                        },
                                        r.value,
                                        e.style,
                                    ],
                                },
                                M,
                                {
                                    aspectRatio: g.value,
                                    "aria-label": e.alt,
                                    role: e.alt ? "img" : void 0,
                                }
                            ),
                            {
                                additional: () =>
                                    h(we, null, [
                                        h(A, null, null),
                                        h(w, null, null),
                                        h(V, null, null),
                                        h(L, null, null),
                                        h(E, null, null),
                                    ]),
                                default: l.default,
                            }
                        ),
                        [
                            [
                                Rn("intersect"),
                                { handler: m, options: e.options },
                                null,
                                { once: !0 },
                            ],
                        ]
                    );
                }),
                {
                    currentSrc: s,
                    image: u,
                    state: c,
                    naturalWidth: d,
                    naturalHeight: f,
                }
            );
        },
    }),
    Bn = q({ border: [Boolean, Number, String] }, "border");
function Dn(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return {
        borderClasses: S(() => {
            const l = He(e) ? e.value : e.border,
                a = [];
            if (l === !0 || l === "") a.push(`${t}--border`);
            else if (typeof l == "string" || l === 0)
                for (const r of String(l).split(" ")) a.push(`border-${r}`);
            return a;
        }),
    };
}
const bn = q(
    {
        elevation: {
            type: [Number, String],
            validator(e) {
                const t = parseInt(e);
                return !isNaN(t) && t >= 0 && t <= 24;
            },
        },
    },
    "elevation"
);
function Sn(e) {
    return {
        elevationClasses: S(() => {
            const n = He(e) ? e.value : e.elevation,
                l = [];
            return n == null || l.push(`elevation-${n}`), l;
        }),
    };
}
const Iy = [null, "prominent", "default", "comfortable", "compact"],
    kd = q(
        {
            absolute: Boolean,
            collapse: Boolean,
            color: String,
            density: {
                type: String,
                default: "default",
                validator: (e) => Iy.includes(e),
            },
            extended: Boolean,
            extensionHeight: { type: [Number, String], default: 48 },
            flat: Boolean,
            floating: Boolean,
            height: { type: [Number, String], default: 64 },
            image: String,
            title: String,
            ...Bn(),
            ...Ae(),
            ...bn(),
            ...kt(),
            ...ze({ tag: "header" }),
            ...We(),
        },
        "VToolbar"
    ),
    Xs = de()({
        name: "VToolbar",
        props: kd(),
        setup(e, t) {
            var v;
            let { slots: n } = t;
            const { backgroundColorClasses: l, backgroundColorStyles: a } = Ut(
                    ce(e, "color")
                ),
                { borderClasses: r } = Dn(e),
                { elevationClasses: o } = Sn(e),
                { roundedClasses: i } = wt(e),
                { themeClasses: s } = Qe(e),
                { rtlClasses: u } = Zt(),
                c = oe(
                    !!(e.extended || ((v = n.extension) != null && v.call(n)))
                ),
                d = S(() =>
                    parseInt(
                        Number(e.height) +
                            (e.density === "prominent" ? Number(e.height) : 0) -
                            (e.density === "comfortable" ? 8 : 0) -
                            (e.density === "compact" ? 16 : 0),
                        10
                    )
                ),
                f = S(() =>
                    c.value
                        ? parseInt(
                              Number(e.extensionHeight) +
                                  (e.density === "prominent"
                                      ? Number(e.extensionHeight)
                                      : 0) -
                                  (e.density === "comfortable" ? 4 : 0) -
                                  (e.density === "compact" ? 8 : 0),
                              10
                          )
                        : 0
                );
            return (
                Fn({ VBtn: { variant: "text" } }),
                Se(() => {
                    var C;
                    const g = !!(e.title || n.title),
                        m = !!(n.image || e.image),
                        p = (C = n.extension) == null ? void 0 : C.call(n);
                    return (
                        (c.value = !!(e.extended || p)),
                        h(
                            e.tag,
                            {
                                class: [
                                    "v-toolbar",
                                    {
                                        "v-toolbar--absolute": e.absolute,
                                        "v-toolbar--collapse": e.collapse,
                                        "v-toolbar--flat": e.flat,
                                        "v-toolbar--floating": e.floating,
                                        [`v-toolbar--density-${e.density}`]: !0,
                                    },
                                    l.value,
                                    r.value,
                                    o.value,
                                    i.value,
                                    s.value,
                                    u.value,
                                    e.class,
                                ],
                                style: [a.value, e.style],
                            },
                            {
                                default: () => [
                                    m &&
                                        h(
                                            "div",
                                            {
                                                key: "image",
                                                class: "v-toolbar__image",
                                            },
                                            [
                                                n.image
                                                    ? h(
                                                          Fe,
                                                          {
                                                              key: "image-defaults",
                                                              disabled:
                                                                  !e.image,
                                                              defaults: {
                                                                  VImg: {
                                                                      cover: !0,
                                                                      src: e.image,
                                                                  },
                                                              },
                                                          },
                                                          n.image
                                                      )
                                                    : h(
                                                          ei,
                                                          {
                                                              key: "image-img",
                                                              cover: !0,
                                                              src: e.image,
                                                          },
                                                          null
                                                      ),
                                            ]
                                        ),
                                    h(
                                        Fe,
                                        {
                                            defaults: {
                                                VTabs: { height: me(d.value) },
                                            },
                                        },
                                        {
                                            default: () => {
                                                var x, _, T;
                                                return [
                                                    h(
                                                        "div",
                                                        {
                                                            class: "v-toolbar__content",
                                                            style: {
                                                                height: me(
                                                                    d.value
                                                                ),
                                                            },
                                                        },
                                                        [
                                                            n.prepend &&
                                                                h(
                                                                    "div",
                                                                    {
                                                                        class: "v-toolbar__prepend",
                                                                    },
                                                                    [
                                                                        (x =
                                                                            n.prepend) ==
                                                                        null
                                                                            ? void 0
                                                                            : x.call(
                                                                                  n
                                                                              ),
                                                                    ]
                                                                ),
                                                            g &&
                                                                h(
                                                                    Ay,
                                                                    {
                                                                        key: "title",
                                                                        text: e.title,
                                                                    },
                                                                    {
                                                                        text: n.title,
                                                                    }
                                                                ),
                                                            (_ = n.default) ==
                                                            null
                                                                ? void 0
                                                                : _.call(n),
                                                            n.append &&
                                                                h(
                                                                    "div",
                                                                    {
                                                                        class: "v-toolbar__append",
                                                                    },
                                                                    [
                                                                        (T =
                                                                            n.append) ==
                                                                        null
                                                                            ? void 0
                                                                            : T.call(
                                                                                  n
                                                                              ),
                                                                    ]
                                                                ),
                                                        ]
                                                    ),
                                                ];
                                            },
                                        }
                                    ),
                                    h(
                                        Fe,
                                        {
                                            defaults: {
                                                VTabs: { height: me(f.value) },
                                            },
                                        },
                                        {
                                            default: () => [
                                                h(yd, null, {
                                                    default: () => [
                                                        c.value &&
                                                            h(
                                                                "div",
                                                                {
                                                                    class: "v-toolbar__extension",
                                                                    style: {
                                                                        height: me(
                                                                            f.value
                                                                        ),
                                                                    },
                                                                },
                                                                [p]
                                                            ),
                                                    ],
                                                }),
                                            ],
                                        }
                                    ),
                                ],
                            }
                        )
                    );
                }),
                { contentHeight: d, extensionHeight: f }
            );
        },
    }),
    Vy = q(
        {
            scrollTarget: { type: String },
            scrollThreshold: { type: [String, Number], default: 300 },
        },
        "scroll"
    );
function Ry(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { canScroll: n } = t;
    let l = 0,
        a = 0;
    const r = le(null),
        o = oe(0),
        i = oe(0),
        s = oe(0),
        u = oe(!1),
        c = oe(!1),
        d = S(() => Number(e.scrollThreshold)),
        f = S(() => Bt((d.value - o.value) / d.value || 0)),
        v = () => {
            const g = r.value;
            if (!g || (n && !n.value)) return;
            (l = o.value),
                (o.value = "window" in g ? g.pageYOffset : g.scrollTop);
            const m =
                g instanceof Window
                    ? document.documentElement.scrollHeight
                    : g.scrollHeight;
            if (a !== m) {
                a = m;
                return;
            }
            (c.value = o.value < l), (s.value = Math.abs(o.value - d.value));
        };
    return (
        ue(c, () => {
            i.value = i.value || o.value;
        }),
        ue(u, () => {
            i.value = 0;
        }),
        Qt(() => {
            ue(
                () => e.scrollTarget,
                (g) => {
                    var p;
                    const m = g ? document.querySelector(g) : window;
                    m &&
                        m !== r.value &&
                        ((p = r.value) == null ||
                            p.removeEventListener("scroll", v),
                        (r.value = m),
                        r.value.addEventListener("scroll", v, { passive: !0 }));
                },
                { immediate: !0 }
            );
        }),
        ht(() => {
            var g;
            (g = r.value) == null || g.removeEventListener("scroll", v);
        }),
        n && ue(n, v, { immediate: !0 }),
        {
            scrollThreshold: d,
            currentScroll: o,
            currentThreshold: s,
            isScrollActive: u,
            scrollRatio: f,
            isScrollingUp: c,
            savedScroll: i,
        }
    );
}
function ti() {
    const e = oe(!1);
    return (
        Qt(() => {
            window.requestAnimationFrame(() => {
                e.value = !0;
            });
        }),
        {
            ssrBootStyles: S(() =>
                e.value ? void 0 : { transition: "none !important" }
            ),
            isBooted: ul(e),
        }
    );
}
const Ly = q(
        {
            scrollBehavior: String,
            modelValue: { type: Boolean, default: !0 },
            location: {
                type: String,
                default: "top",
                validator: (e) => ["top", "bottom"].includes(e),
            },
            ...kd(),
            ...uy(),
            ...Vy(),
            height: { type: [Number, String], default: 64 },
        },
        "VAppBar"
    ),
    Oy = de()({
        name: "VAppBar",
        props: Ly(),
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { slots: n } = t;
            const l = le(),
                a = Be(e, "modelValue"),
                r = S(() => {
                    var T;
                    const _ = new Set(
                        ((T = e.scrollBehavior) == null
                            ? void 0
                            : T.split(" ")) ?? []
                    );
                    return {
                        hide: _.has("hide"),
                        fullyHide: _.has("fully-hide"),
                        inverted: _.has("inverted"),
                        collapse: _.has("collapse"),
                        elevate: _.has("elevate"),
                        fadeImage: _.has("fade-image"),
                    };
                }),
                o = S(() => {
                    const _ = r.value;
                    return (
                        _.hide ||
                        _.fullyHide ||
                        _.inverted ||
                        _.collapse ||
                        _.elevate ||
                        _.fadeImage ||
                        !a.value
                    );
                }),
                {
                    currentScroll: i,
                    scrollThreshold: s,
                    isScrollingUp: u,
                    scrollRatio: c,
                } = Ry(e, { canScroll: o }),
                d = S(() => r.value.hide || r.value.fullyHide),
                f = S(
                    () =>
                        e.collapse ||
                        (r.value.collapse &&
                            (r.value.inverted ? c.value > 0 : c.value === 0))
                ),
                v = S(
                    () =>
                        e.flat ||
                        (r.value.fullyHide && !a.value) ||
                        (r.value.elevate &&
                            (r.value.inverted ? i.value > 0 : i.value === 0))
                ),
                g = S(() =>
                    r.value.fadeImage
                        ? r.value.inverted
                            ? 1 - c.value
                            : c.value
                        : void 0
                ),
                m = S(() => {
                    var k, A;
                    const _ = Number(
                            ((k = l.value) == null
                                ? void 0
                                : k.contentHeight) ?? e.height
                        ),
                        T = Number(
                            ((A = l.value) == null
                                ? void 0
                                : A.extensionHeight) ?? 0
                        );
                    return d.value
                        ? i.value < s.value || r.value.fullyHide
                            ? _ + T
                            : _
                        : _ + T;
                });
            mn(
                S(() => !!e.scrollBehavior),
                () => {
                    mt(() => {
                        d.value
                            ? r.value.inverted
                                ? (a.value = i.value > s.value)
                                : (a.value = u.value || i.value < s.value)
                            : (a.value = !0);
                    });
                }
            );
            const { ssrBootStyles: p } = ti(),
                { layoutItemStyles: C, layoutIsReady: x } = dy({
                    id: e.name,
                    order: S(() => parseInt(e.order, 10)),
                    position: ce(e, "location"),
                    layoutSize: m,
                    elementSize: oe(void 0),
                    active: a,
                    absolute: ce(e, "absolute"),
                });
            return (
                Se(() => {
                    const _ = Xs.filterProps(e);
                    return h(
                        Xs,
                        ke(
                            {
                                ref: l,
                                class: [
                                    "v-app-bar",
                                    {
                                        "v-app-bar--bottom":
                                            e.location === "bottom",
                                    },
                                    e.class,
                                ],
                                style: [
                                    {
                                        ...C.value,
                                        "--v-toolbar-image-opacity": g.value,
                                        height: void 0,
                                        ...p.value,
                                    },
                                    e.style,
                                ],
                            },
                            _,
                            { collapse: f.value, flat: v.value }
                        ),
                        n
                    );
                }),
                x
            );
        },
    }),
    Fy = [null, "default", "comfortable", "compact"],
    Pt = q(
        {
            density: {
                type: String,
                default: "default",
                validator: (e) => Fy.includes(e),
            },
        },
        "density"
    );
function $t(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return { densityClasses: S(() => `${t}--density-${e.density}`) };
}
const By = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function vl(e, t) {
    return h(we, null, [
        e && h("span", { key: "overlay", class: `${t}__overlay` }, null),
        h("span", { key: "underlay", class: `${t}__underlay` }, null),
    ]);
}
const Jt = q(
    {
        color: String,
        variant: {
            type: String,
            default: "elevated",
            validator: (e) => By.includes(e),
        },
    },
    "variant"
);
function ml(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    const n = S(() => {
            const { variant: r } = Xe(e);
            return `${t}--variant-${r}`;
        }),
        { colorClasses: l, colorStyles: a } = Jo(
            S(() => {
                const { variant: r, color: o } = Xe(e);
                return {
                    [["elevated", "flat"].includes(r) ? "background" : "text"]:
                        o,
                };
            })
        );
    return { colorClasses: l, colorStyles: a, variantClasses: n };
}
const wd = q(
        {
            baseColor: String,
            divided: Boolean,
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...bn(),
            ...kt(),
            ...ze(),
            ...We(),
            ...Jt(),
        },
        "VBtnGroup"
    ),
    js = de()({
        name: "VBtnGroup",
        props: wd(),
        setup(e, t) {
            let { slots: n } = t;
            const { themeClasses: l } = Qe(e),
                { densityClasses: a } = $t(e),
                { borderClasses: r } = Dn(e),
                { elevationClasses: o } = Sn(e),
                { roundedClasses: i } = wt(e);
            Fn({
                VBtn: {
                    height: "auto",
                    baseColor: ce(e, "baseColor"),
                    color: ce(e, "color"),
                    density: ce(e, "density"),
                    flat: !0,
                    variant: ce(e, "variant"),
                },
            }),
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: [
                                "v-btn-group",
                                { "v-btn-group--divided": e.divided },
                                l.value,
                                r.value,
                                a.value,
                                o.value,
                                i.value,
                                e.class,
                            ],
                            style: e.style,
                        },
                        n
                    )
                );
        },
    }),
    ni = q(
        {
            modelValue: { type: null, default: void 0 },
            multiple: Boolean,
            mandatory: [Boolean, String],
            max: Number,
            selectedClass: String,
            disabled: Boolean,
        },
        "group"
    ),
    Ad = q(
        { value: null, disabled: Boolean, selectedClass: String },
        "group-item"
    );
function _d(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    const l = je("useGroupItem");
    if (!l)
        throw new Error(
            "[Vuetify] useGroupItem composable must be used inside a component setup function"
        );
    const a = Tt();
    qe(Symbol.for(`${t.description}:id`), a);
    const r = Pe(t, null);
    if (!r) {
        if (!n) return r;
        throw new Error(
            `[Vuetify] Could not find useGroup injection with symbol ${t.description}`
        );
    }
    const o = ce(e, "value"),
        i = S(() => !!(r.disabled.value || e.disabled));
    r.register({ id: a, value: o, disabled: i }, l),
        ht(() => {
            r.unregister(a);
        });
    const s = S(() => r.isSelected(a)),
        u = S(() => r.items.value[0].id === a),
        c = S(() => r.items.value[r.items.value.length - 1].id === a),
        d = S(() => s.value && [r.selectedClass.value, e.selectedClass]);
    return (
        ue(
            s,
            (f) => {
                l.emit("group:selected", { value: f });
            },
            { flush: "sync" }
        ),
        {
            id: a,
            isSelected: s,
            isFirst: u,
            isLast: c,
            toggle: () => r.select(a, !s.value),
            select: (f) => r.select(a, f),
            selectedClass: d,
            value: o,
            disabled: i,
            group: r,
        }
    );
}
function li(e, t) {
    let n = !1;
    const l = Ze([]),
        a = Be(
            e,
            "modelValue",
            [],
            (f) => (f == null ? [] : xd(l, ot(f))),
            (f) => {
                const v = Hy(l, f);
                return e.multiple ? v : v[0];
            }
        ),
        r = je("useGroup");
    function o(f, v) {
        const g = f,
            m = Symbol.for(`${t.description}:id`),
            C = zn(m, r == null ? void 0 : r.vnode).indexOf(v);
        Xe(g.value) == null && ((g.value = C), (g.useIndexAsValue = !0)),
            C > -1 ? l.splice(C, 0, g) : l.push(g);
    }
    function i(f) {
        if (n) return;
        s();
        const v = l.findIndex((g) => g.id === f);
        l.splice(v, 1);
    }
    function s() {
        const f = l.find((v) => !v.disabled);
        f && e.mandatory === "force" && !a.value.length && (a.value = [f.id]);
    }
    Qt(() => {
        s();
    }),
        ht(() => {
            n = !0;
        }),
        Vo(() => {
            for (let f = 0; f < l.length; f++)
                l[f].useIndexAsValue && (l[f].value = f);
        });
    function u(f, v) {
        const g = l.find((m) => m.id === f);
        if (!(v && g != null && g.disabled))
            if (e.multiple) {
                const m = a.value.slice(),
                    p = m.findIndex((x) => x === f),
                    C = ~p;
                if (
                    ((v = v ?? !C),
                    (C && e.mandatory && m.length <= 1) ||
                        (!C && e.max != null && m.length + 1 > e.max))
                )
                    return;
                p < 0 && v ? m.push(f) : p >= 0 && !v && m.splice(p, 1),
                    (a.value = m);
            } else {
                const m = a.value.includes(f);
                if (e.mandatory && m) return;
                a.value = v ?? !m ? [f] : [];
            }
    }
    function c(f) {
        if ((e.multiple, a.value.length)) {
            const v = a.value[0],
                g = l.findIndex((C) => C.id === v);
            let m = (g + f) % l.length,
                p = l[m];
            for (; p.disabled && m !== g; )
                (m = (m + f) % l.length), (p = l[m]);
            if (p.disabled) return;
            a.value = [l[m].id];
        } else {
            const v = l.find((g) => !g.disabled);
            v && (a.value = [v.id]);
        }
    }
    const d = {
        register: o,
        unregister: i,
        selected: a,
        select: u,
        disabled: ce(e, "disabled"),
        prev: () => c(l.length - 1),
        next: () => c(1),
        isSelected: (f) => a.value.includes(f),
        selectedClass: S(() => e.selectedClass),
        items: S(() => l),
        getItemIndex: (f) => Dy(l, f),
    };
    return qe(t, d), d;
}
function Dy(e, t) {
    const n = xd(e, [t]);
    return n.length ? e.findIndex((l) => l.id === n[0]) : -1;
}
function xd(e, t) {
    const n = [];
    return (
        t.forEach((l) => {
            const a = e.find((o) => cl(l, o.value)),
                r = e[l];
            (a == null ? void 0 : a.value) != null
                ? n.push(a.id)
                : r != null && n.push(r.id);
        }),
        n
    );
}
function Hy(e, t) {
    const n = [];
    return (
        t.forEach((l) => {
            const a = e.findIndex((r) => r.id === l);
            if (~a) {
                const r = e[a];
                n.push(r.value != null ? r.value : a);
            }
        }),
        n
    );
}
const Md = Symbol.for("vuetify:v-btn-toggle"),
    Ny = q({ ...wd(), ...ni() }, "VBtnToggle");
de()({
    name: "VBtnToggle",
    props: Ny(),
    emits: { "update:modelValue": (e) => !0 },
    setup(e, t) {
        let { slots: n } = t;
        const {
            isSelected: l,
            next: a,
            prev: r,
            select: o,
            selected: i,
        } = li(e, Md);
        return (
            Se(() => {
                const s = js.filterProps(e);
                return h(
                    js,
                    ke({ class: ["v-btn-toggle", e.class] }, s, {
                        style: e.style,
                    }),
                    {
                        default: () => {
                            var u;
                            return [
                                (u = n.default) == null
                                    ? void 0
                                    : u.call(n, {
                                          isSelected: l,
                                          next: a,
                                          prev: r,
                                          select: o,
                                          selected: i,
                                      }),
                            ];
                        },
                    }
                );
            }),
            { next: a, prev: r, select: o }
        );
    },
});
const $y = ["x-small", "small", "default", "large", "x-large"],
    ql = q({ size: { type: [String, Number], default: "default" } }, "size");
function Ql(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return Xo(() => {
        let n, l;
        return (
            _a($y, e.size)
                ? (n = `${t}--size-${e.size}`)
                : e.size && (l = { width: me(e.size), height: me(e.size) }),
            { sizeClasses: n, sizeStyles: l }
        );
    });
}
const Gy = q(
        {
            color: String,
            disabled: Boolean,
            start: Boolean,
            end: Boolean,
            icon: Ee,
            ...Ae(),
            ...ql(),
            ...ze({ tag: "i" }),
            ...We(),
        },
        "VIcon"
    ),
    Ne = de()({
        name: "VIcon",
        props: Gy(),
        setup(e, t) {
            let { attrs: n, slots: l } = t;
            const a = le(),
                { themeClasses: r } = Qe(e),
                { iconData: o } = ry(S(() => a.value || e.icon)),
                { sizeClasses: i } = Ql(e),
                { textColorClasses: s, textColorStyles: u } = Mt(
                    ce(e, "color")
                );
            return (
                Se(() => {
                    var f, v;
                    const c = (f = l.default) == null ? void 0 : f.call(l);
                    c &&
                        (a.value =
                            (v = Gc(c).filter(
                                (g) =>
                                    g.type === Ul &&
                                    g.children &&
                                    typeof g.children == "string"
                            )[0]) == null
                                ? void 0
                                : v.children);
                    const d = !!(n.onClick || n.onClickOnce);
                    return h(
                        o.value.component,
                        {
                            tag: e.tag,
                            icon: o.value.icon,
                            class: [
                                "v-icon",
                                "notranslate",
                                r.value,
                                i.value,
                                s.value,
                                {
                                    "v-icon--clickable": d,
                                    "v-icon--disabled": e.disabled,
                                    "v-icon--start": e.start,
                                    "v-icon--end": e.end,
                                },
                                e.class,
                            ],
                            style: [
                                i.value
                                    ? void 0
                                    : {
                                          fontSize: me(e.size),
                                          height: me(e.size),
                                          width: me(e.size),
                                      },
                                u.value,
                                e.style,
                            ],
                            role: d ? "button" : void 0,
                            "aria-hidden": !d,
                            tabindex: d ? (e.disabled ? -1 : 0) : void 0,
                        },
                        { default: () => [c] }
                    );
                }),
                {}
            );
        },
    });
function Ed(e, t) {
    const n = le(),
        l = oe(!1);
    if (Go) {
        const a = new IntersectionObserver((r) => {
            l.value = !!r.find((o) => o.isIntersecting);
        }, t);
        ht(() => {
            a.disconnect();
        }),
            ue(
                n,
                (r, o) => {
                    o && (a.unobserve(o), (l.value = !1)), r && a.observe(r);
                },
                { flush: "post" }
            );
    }
    return { intersectionRef: n, isIntersecting: l };
}
const zy = q(
        {
            bgColor: String,
            color: String,
            indeterminate: [Boolean, String],
            modelValue: { type: [Number, String], default: 0 },
            rotate: { type: [Number, String], default: 0 },
            width: { type: [Number, String], default: 4 },
            ...Ae(),
            ...ql(),
            ...ze({ tag: "div" }),
            ...We(),
        },
        "VProgressCircular"
    ),
    Xy = de()({
        name: "VProgressCircular",
        props: zy(),
        setup(e, t) {
            let { slots: n } = t;
            const l = 20,
                a = 2 * Math.PI * l,
                r = le(),
                { themeClasses: o } = Qe(e),
                { sizeClasses: i, sizeStyles: s } = Ql(e),
                { textColorClasses: u, textColorStyles: c } = Mt(
                    ce(e, "color")
                ),
                { textColorClasses: d, textColorStyles: f } = Mt(
                    ce(e, "bgColor")
                ),
                { intersectionRef: v, isIntersecting: g } = Ed(),
                { resizeRef: m, contentRect: p } = nl(),
                C = S(() =>
                    Math.max(0, Math.min(100, parseFloat(e.modelValue)))
                ),
                x = S(() => Number(e.width)),
                _ = S(() =>
                    s.value
                        ? Number(e.size)
                        : p.value
                        ? p.value.width
                        : Math.max(x.value, 32)
                ),
                T = S(() => (l / (1 - x.value / _.value)) * 2),
                k = S(() => (x.value / _.value) * T.value),
                A = S(() => me(((100 - C.value) / 100) * a));
            return (
                mt(() => {
                    (v.value = r.value), (m.value = r.value);
                }),
                Se(() =>
                    h(
                        e.tag,
                        {
                            ref: r,
                            class: [
                                "v-progress-circular",
                                {
                                    "v-progress-circular--indeterminate":
                                        !!e.indeterminate,
                                    "v-progress-circular--visible": g.value,
                                    "v-progress-circular--disable-shrink":
                                        e.indeterminate === "disable-shrink",
                                },
                                o.value,
                                i.value,
                                u.value,
                                e.class,
                            ],
                            style: [s.value, c.value, e.style],
                            role: "progressbar",
                            "aria-valuemin": "0",
                            "aria-valuemax": "100",
                            "aria-valuenow": e.indeterminate ? void 0 : C.value,
                        },
                        {
                            default: () => [
                                h(
                                    "svg",
                                    {
                                        style: {
                                            transform: `rotate(calc(-90deg + ${Number(
                                                e.rotate
                                            )}deg))`,
                                        },
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: `0 0 ${T.value} ${T.value}`,
                                    },
                                    [
                                        h(
                                            "circle",
                                            {
                                                class: [
                                                    "v-progress-circular__underlay",
                                                    d.value,
                                                ],
                                                style: f.value,
                                                fill: "transparent",
                                                cx: "50%",
                                                cy: "50%",
                                                r: l,
                                                "stroke-width": k.value,
                                                "stroke-dasharray": a,
                                                "stroke-dashoffset": 0,
                                            },
                                            null
                                        ),
                                        h(
                                            "circle",
                                            {
                                                class: "v-progress-circular__overlay",
                                                fill: "transparent",
                                                cx: "50%",
                                                cy: "50%",
                                                r: l,
                                                "stroke-width": k.value,
                                                "stroke-dasharray": a,
                                                "stroke-dashoffset": A.value,
                                            },
                                            null
                                        ),
                                    ]
                                ),
                                n.default &&
                                    h(
                                        "div",
                                        {
                                            class: "v-progress-circular__content",
                                        },
                                        [n.default({ value: C.value })]
                                    ),
                            ],
                        }
                    )
                ),
                {}
            );
        },
    }),
    Ws = {
        center: "center",
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
    },
    Ya = q({ location: String }, "location");
function qa(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
        n = arguments.length > 2 ? arguments[2] : void 0;
    const { isRtl: l } = Zt();
    return {
        locationStyles: S(() => {
            if (!e.location) return {};
            const { side: r, align: o } = Wr(
                e.location.split(" ").length > 1
                    ? e.location
                    : `${e.location} center`,
                l.value
            );
            function i(u) {
                return n ? n(u) : 0;
            }
            const s = {};
            return (
                r !== "center" &&
                    (t ? (s[Ws[r]] = `calc(100% - ${i(r)}px)`) : (s[r] = 0)),
                o !== "center"
                    ? t
                        ? (s[Ws[o]] = `calc(100% - ${i(o)}px)`)
                        : (s[o] = 0)
                    : (r === "center"
                          ? (s.top = s.left = "50%")
                          : (s[
                                {
                                    top: "left",
                                    bottom: "left",
                                    left: "top",
                                    right: "top",
                                }[r]
                            ] = "50%"),
                      (s.transform = {
                          top: "translateX(-50%)",
                          bottom: "translateX(-50%)",
                          left: "translateY(-50%)",
                          right: "translateY(-50%)",
                          center: "translate(-50%, -50%)",
                      }[r])),
                s
            );
        }),
    };
}
const jy = q(
        {
            absolute: Boolean,
            active: { type: Boolean, default: !0 },
            bgColor: String,
            bgOpacity: [Number, String],
            bufferValue: { type: [Number, String], default: 0 },
            bufferColor: String,
            bufferOpacity: [Number, String],
            clickable: Boolean,
            color: String,
            height: { type: [Number, String], default: 4 },
            indeterminate: Boolean,
            max: { type: [Number, String], default: 100 },
            modelValue: { type: [Number, String], default: 0 },
            opacity: [Number, String],
            reverse: Boolean,
            stream: Boolean,
            striped: Boolean,
            roundedBar: Boolean,
            ...Ae(),
            ...Ya({ location: "top" }),
            ...kt(),
            ...ze(),
            ...We(),
        },
        "VProgressLinear"
    ),
    Wy = de()({
        name: "VProgressLinear",
        props: jy(),
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { slots: n } = t;
            const l = Be(e, "modelValue"),
                { isRtl: a, rtlClasses: r } = Zt(),
                { themeClasses: o } = Qe(e),
                { locationStyles: i } = qa(e),
                { textColorClasses: s, textColorStyles: u } = Mt(e, "color"),
                { backgroundColorClasses: c, backgroundColorStyles: d } = Ut(
                    S(() => e.bgColor || e.color)
                ),
                { backgroundColorClasses: f, backgroundColorStyles: v } = Ut(
                    S(() => e.bufferColor || e.bgColor || e.color)
                ),
                { backgroundColorClasses: g, backgroundColorStyles: m } = Ut(
                    e,
                    "color"
                ),
                { roundedClasses: p } = wt(e),
                { intersectionRef: C, isIntersecting: x } = Ed(),
                _ = S(() => parseFloat(e.max)),
                T = S(() => parseFloat(e.height)),
                k = S(() =>
                    Bt((parseFloat(e.bufferValue) / _.value) * 100, 0, 100)
                ),
                A = S(() => Bt((parseFloat(l.value) / _.value) * 100, 0, 100)),
                w = S(() => a.value !== e.reverse),
                L = S(() =>
                    e.indeterminate ? "fade-transition" : "slide-x-transition"
                );
            function E(V) {
                if (!C.value) return;
                const {
                        left: R,
                        right: M,
                        width: B,
                    } = C.value.getBoundingClientRect(),
                    $ = w.value ? B - V.clientX + (M - B) : V.clientX - R;
                l.value = Math.round(($ / B) * _.value);
            }
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            ref: C,
                            class: [
                                "v-progress-linear",
                                {
                                    "v-progress-linear--absolute": e.absolute,
                                    "v-progress-linear--active":
                                        e.active && x.value,
                                    "v-progress-linear--reverse": w.value,
                                    "v-progress-linear--rounded": e.rounded,
                                    "v-progress-linear--rounded-bar":
                                        e.roundedBar,
                                    "v-progress-linear--striped": e.striped,
                                },
                                p.value,
                                o.value,
                                r.value,
                                e.class,
                            ],
                            style: [
                                {
                                    bottom:
                                        e.location === "bottom" ? 0 : void 0,
                                    top: e.location === "top" ? 0 : void 0,
                                    height: e.active ? me(T.value) : 0,
                                    "--v-progress-linear-height": me(T.value),
                                    ...(e.absolute ? i.value : {}),
                                },
                                e.style,
                            ],
                            role: "progressbar",
                            "aria-hidden": e.active ? "false" : "true",
                            "aria-valuemin": "0",
                            "aria-valuemax": e.max,
                            "aria-valuenow": e.indeterminate ? void 0 : A.value,
                            onClick: e.clickable && E,
                        },
                        {
                            default: () => [
                                e.stream &&
                                    h(
                                        "div",
                                        {
                                            key: "stream",
                                            class: [
                                                "v-progress-linear__stream",
                                                s.value,
                                            ],
                                            style: {
                                                ...u.value,
                                                [w.value ? "left" : "right"]:
                                                    me(-T.value),
                                                borderTop: `${me(
                                                    T.value / 2
                                                )} dotted`,
                                                opacity: parseFloat(
                                                    e.bufferOpacity
                                                ),
                                                top: `calc(50% - ${me(
                                                    T.value / 4
                                                )})`,
                                                width: me(100 - k.value, "%"),
                                                "--v-progress-linear-stream-to":
                                                    me(
                                                        T.value *
                                                            (w.value ? 1 : -1)
                                                    ),
                                            },
                                        },
                                        null
                                    ),
                                h(
                                    "div",
                                    {
                                        class: [
                                            "v-progress-linear__background",
                                            c.value,
                                        ],
                                        style: [
                                            d.value,
                                            {
                                                opacity: parseFloat(
                                                    e.bgOpacity
                                                ),
                                                width: e.stream ? 0 : void 0,
                                            },
                                        ],
                                    },
                                    null
                                ),
                                h(
                                    "div",
                                    {
                                        class: [
                                            "v-progress-linear__buffer",
                                            f.value,
                                        ],
                                        style: [
                                            v.value,
                                            {
                                                opacity: parseFloat(
                                                    e.bufferOpacity
                                                ),
                                                width: me(k.value, "%"),
                                            },
                                        ],
                                    },
                                    null
                                ),
                                h(
                                    Yt,
                                    { name: L.value },
                                    {
                                        default: () => [
                                            e.indeterminate
                                                ? h(
                                                      "div",
                                                      {
                                                          class: "v-progress-linear__indeterminate",
                                                      },
                                                      [
                                                          ["long", "short"].map(
                                                              (V) =>
                                                                  h(
                                                                      "div",
                                                                      {
                                                                          key: V,
                                                                          class: [
                                                                              "v-progress-linear__indeterminate",
                                                                              V,
                                                                              g.value,
                                                                          ],
                                                                          style: m.value,
                                                                      },
                                                                      null
                                                                  )
                                                          ),
                                                      ]
                                                  )
                                                : h(
                                                      "div",
                                                      {
                                                          class: [
                                                              "v-progress-linear__determinate",
                                                              g.value,
                                                          ],
                                                          style: [
                                                              m.value,
                                                              {
                                                                  width: me(
                                                                      A.value,
                                                                      "%"
                                                                  ),
                                                              },
                                                          ],
                                                      },
                                                      null
                                                  ),
                                        ],
                                    }
                                ),
                                n.default &&
                                    h(
                                        "div",
                                        { class: "v-progress-linear__content" },
                                        [
                                            n.default({
                                                value: A.value,
                                                buffer: k.value,
                                            }),
                                        ]
                                    ),
                            ],
                        }
                    )
                ),
                {}
            );
        },
    }),
    ai = q({ loading: [Boolean, String] }, "loader");
function ri(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return { loaderClasses: S(() => ({ [`${t}--loading`]: e.loading })) };
}
function Td(e, t) {
    var l;
    let { slots: n } = t;
    return h("div", { class: `${e.name}__loader` }, [
        ((l = n.default) == null
            ? void 0
            : l.call(n, { color: e.color, isActive: e.active })) ||
            h(
                Wy,
                {
                    absolute: e.absolute,
                    active: e.active,
                    color: e.color,
                    height: "2",
                    indeterminate: !0,
                },
                null
            ),
    ]);
}
const Uy = ["static", "relative", "fixed", "absolute", "sticky"],
    oi = q(
        { position: { type: String, validator: (e) => Uy.includes(e) } },
        "position"
    );
function ii(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    return {
        positionClasses: S(() => (e.position ? `${t}--${e.position}` : void 0)),
    };
}
function Ky() {
    const e = je("useRoute");
    return S(() => {
        var t;
        return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
    });
}
function Yy() {
    var e, t;
    return (t = (e = je("useRouter")) == null ? void 0 : e.proxy) == null
        ? void 0
        : t.$router;
}
function Qa(e, t) {
    var u, c;
    const n = Ov("RouterLink"),
        l = S(() => !!(e.href || e.to)),
        a = S(
            () =>
                (l == null ? void 0 : l.value) ||
                ds(t, "click") ||
                ds(e, "click")
        );
    if (typeof n == "string" || !("useLink" in n))
        return { isLink: l, isClickable: a, href: ce(e, "href") };
    const r = S(() => ({ ...e, to: ce(() => e.to || "") })),
        o = n.useLink(r.value),
        i = S(() => (e.to ? o : void 0)),
        s = Ky();
    return {
        isLink: l,
        isClickable: a,
        route: (u = i.value) == null ? void 0 : u.route,
        navigate: (c = i.value) == null ? void 0 : c.navigate,
        isActive: S(() => {
            var d, f, v;
            return i.value
                ? e.exact
                    ? s.value
                        ? ((v = i.value.isExactActive) == null
                              ? void 0
                              : v.value) &&
                          cl(i.value.route.value.query, s.value.query)
                        : ((f = i.value.isExactActive) == null
                              ? void 0
                              : f.value) ?? !1
                    : ((d = i.value.isActive) == null ? void 0 : d.value) ?? !1
                : !1;
        }),
        href: S(() => {
            var d;
            return e.to
                ? (d = i.value) == null
                    ? void 0
                    : d.route.value.href
                : e.href;
        }),
    };
}
const Za = q(
    { href: String, replace: Boolean, to: [String, Object], exact: Boolean },
    "router"
);
let yr = !1;
function qy(e, t) {
    let n = !1,
        l,
        a;
    Ve &&
        (Ge(() => {
            window.addEventListener("popstate", r),
                (l =
                    e == null
                        ? void 0
                        : e.beforeEach((o, i, s) => {
                              yr
                                  ? n
                                      ? t(s)
                                      : s()
                                  : setTimeout(() => (n ? t(s) : s())),
                                  (yr = !0);
                          })),
                (a =
                    e == null
                        ? void 0
                        : e.afterEach(() => {
                              yr = !1;
                          }));
        }),
        ct(() => {
            window.removeEventListener("popstate", r),
                l == null || l(),
                a == null || a();
        }));
    function r(o) {
        var i;
        ((i = o.state) != null && i.replaced) ||
            ((n = !0), setTimeout(() => (n = !1)));
    }
}
function Qy(e, t) {
    ue(
        () => {
            var n;
            return (n = e.isActive) == null ? void 0 : n.value;
        },
        (n) => {
            e.isLink.value &&
                n &&
                t &&
                Ge(() => {
                    t(!0);
                });
        },
        { immediate: !0 }
    );
}
const Qr = Symbol("rippleStop"),
    Zy = 80;
function Us(e, t) {
    (e.style.transform = t), (e.style.webkitTransform = t);
}
function Zr(e) {
    return e.constructor.name === "TouchEvent";
}
function Pd(e) {
    return e.constructor.name === "KeyboardEvent";
}
const Jy = function (e, t) {
        var d;
        let n =
                arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {},
            l = 0,
            a = 0;
        if (!Pd(e)) {
            const f = t.getBoundingClientRect(),
                v = Zr(e) ? e.touches[e.touches.length - 1] : e;
            (l = v.clientX - f.left), (a = v.clientY - f.top);
        }
        let r = 0,
            o = 0.3;
        (d = t._ripple) != null && d.circle
            ? ((o = 0.15),
              (r = t.clientWidth / 2),
              (r = n.center
                  ? r
                  : r + Math.sqrt((l - r) ** 2 + (a - r) ** 2) / 4))
            : (r = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2);
        const i = `${(t.clientWidth - r * 2) / 2}px`,
            s = `${(t.clientHeight - r * 2) / 2}px`,
            u = n.center ? i : `${l - r}px`,
            c = n.center ? s : `${a - r}px`;
        return { radius: r, scale: o, x: u, y: c, centerX: i, centerY: s };
    },
    Oa = {
        show(e, t) {
            var v;
            let n =
                arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {};
            if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
                return;
            const l = document.createElement("span"),
                a = document.createElement("span");
            l.appendChild(a),
                (l.className = "v-ripple__container"),
                n.class && (l.className += ` ${n.class}`);
            const {
                    radius: r,
                    scale: o,
                    x: i,
                    y: s,
                    centerX: u,
                    centerY: c,
                } = Jy(e, t, n),
                d = `${r * 2}px`;
            (a.className = "v-ripple__animation"),
                (a.style.width = d),
                (a.style.height = d),
                t.appendChild(l);
            const f = window.getComputedStyle(t);
            f &&
                f.position === "static" &&
                ((t.style.position = "relative"),
                (t.dataset.previousPosition = "static")),
                a.classList.add("v-ripple__animation--enter"),
                a.classList.add("v-ripple__animation--visible"),
                Us(a, `translate(${i}, ${s}) scale3d(${o},${o},${o})`),
                (a.dataset.activated = String(performance.now())),
                setTimeout(() => {
                    a.classList.remove("v-ripple__animation--enter"),
                        a.classList.add("v-ripple__animation--in"),
                        Us(a, `translate(${u}, ${c}) scale3d(1,1,1)`);
                }, 0);
        },
        hide(e) {
            var r;
            if (!((r = e == null ? void 0 : e._ripple) != null && r.enabled))
                return;
            const t = e.getElementsByClassName("v-ripple__animation");
            if (t.length === 0) return;
            const n = t[t.length - 1];
            if (n.dataset.isHiding) return;
            n.dataset.isHiding = "true";
            const l = performance.now() - Number(n.dataset.activated),
                a = Math.max(250 - l, 0);
            setTimeout(() => {
                n.classList.remove("v-ripple__animation--in"),
                    n.classList.add("v-ripple__animation--out"),
                    setTimeout(() => {
                        var i;
                        e.getElementsByClassName("v-ripple__animation")
                            .length === 1 &&
                            e.dataset.previousPosition &&
                            ((e.style.position = e.dataset.previousPosition),
                            delete e.dataset.previousPosition),
                            ((i = n.parentNode) == null
                                ? void 0
                                : i.parentNode) === e &&
                                e.removeChild(n.parentNode);
                    }, 300);
            }, a);
        },
    };
function Id(e) {
    return typeof e > "u" || !!e;
}
function Nl(e) {
    const t = {},
        n = e.currentTarget;
    if (!(!(n != null && n._ripple) || n._ripple.touched || e[Qr])) {
        if (((e[Qr] = !0), Zr(e)))
            (n._ripple.touched = !0), (n._ripple.isTouch = !0);
        else if (n._ripple.isTouch) return;
        if (
            ((t.center = n._ripple.centered || Pd(e)),
            n._ripple.class && (t.class = n._ripple.class),
            Zr(e))
        ) {
            if (n._ripple.showTimerCommit) return;
            (n._ripple.showTimerCommit = () => {
                Oa.show(e, n, t);
            }),
                (n._ripple.showTimer = window.setTimeout(() => {
                    var l;
                    (l = n == null ? void 0 : n._ripple) != null &&
                        l.showTimerCommit &&
                        (n._ripple.showTimerCommit(),
                        (n._ripple.showTimerCommit = null));
                }, Zy));
        } else Oa.show(e, n, t);
    }
}
function Ks(e) {
    e[Qr] = !0;
}
function vt(e) {
    const t = e.currentTarget;
    if (t != null && t._ripple) {
        if (
            (window.clearTimeout(t._ripple.showTimer),
            e.type === "touchend" && t._ripple.showTimerCommit)
        ) {
            t._ripple.showTimerCommit(),
                (t._ripple.showTimerCommit = null),
                (t._ripple.showTimer = window.setTimeout(() => {
                    vt(e);
                }));
            return;
        }
        window.setTimeout(() => {
            t._ripple && (t._ripple.touched = !1);
        }),
            Oa.hide(t);
    }
}
function Vd(e) {
    const t = e.currentTarget;
    t != null &&
        t._ripple &&
        (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null),
        window.clearTimeout(t._ripple.showTimer));
}
let $l = !1;
function Rd(e) {
    !$l &&
        (e.keyCode === is.enter || e.keyCode === is.space) &&
        (($l = !0), Nl(e));
}
function Ld(e) {
    ($l = !1), vt(e);
}
function Od(e) {
    $l && (($l = !1), vt(e));
}
function Fd(e, t, n) {
    const { value: l, modifiers: a } = t,
        r = Id(l);
    if (
        (r || Oa.hide(e),
        (e._ripple = e._ripple ?? {}),
        (e._ripple.enabled = r),
        (e._ripple.centered = a.center),
        (e._ripple.circle = a.circle),
        Xr(l) && l.class && (e._ripple.class = l.class),
        r && !n)
    ) {
        if (a.stop) {
            e.addEventListener("touchstart", Ks, { passive: !0 }),
                e.addEventListener("mousedown", Ks);
            return;
        }
        e.addEventListener("touchstart", Nl, { passive: !0 }),
            e.addEventListener("touchend", vt, { passive: !0 }),
            e.addEventListener("touchmove", Vd, { passive: !0 }),
            e.addEventListener("touchcancel", vt),
            e.addEventListener("mousedown", Nl),
            e.addEventListener("mouseup", vt),
            e.addEventListener("mouseleave", vt),
            e.addEventListener("keydown", Rd),
            e.addEventListener("keyup", Ld),
            e.addEventListener("blur", Od),
            e.addEventListener("dragstart", vt, { passive: !0 });
    } else !r && n && Bd(e);
}
function Bd(e) {
    e.removeEventListener("mousedown", Nl),
        e.removeEventListener("touchstart", Nl),
        e.removeEventListener("touchend", vt),
        e.removeEventListener("touchmove", Vd),
        e.removeEventListener("touchcancel", vt),
        e.removeEventListener("mouseup", vt),
        e.removeEventListener("mouseleave", vt),
        e.removeEventListener("keydown", Rd),
        e.removeEventListener("keyup", Ld),
        e.removeEventListener("dragstart", vt),
        e.removeEventListener("blur", Od);
}
function ep(e, t) {
    Fd(e, t, !1);
}
function tp(e) {
    delete e._ripple, Bd(e);
}
function np(e, t) {
    if (t.value === t.oldValue) return;
    const n = Id(t.oldValue);
    Fd(e, t, n);
}
const Zl = { mounted: ep, unmounted: tp, updated: np },
    lp = q(
        {
            active: { type: Boolean, default: void 0 },
            baseColor: String,
            symbol: { type: null, default: Md },
            flat: Boolean,
            icon: [Boolean, String, Function, Object],
            prependIcon: Ee,
            appendIcon: Ee,
            block: Boolean,
            readonly: Boolean,
            slim: Boolean,
            stacked: Boolean,
            ripple: { type: [Boolean, Object], default: !0 },
            text: String,
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...Ht(),
            ...bn(),
            ...Ad(),
            ...ai(),
            ...Ya(),
            ...oi(),
            ...kt(),
            ...Za(),
            ...ql(),
            ...ze({ tag: "button" }),
            ...We(),
            ...Jt({ variant: "elevated" }),
        },
        "VBtn"
    ),
    qn = de()({
        name: "VBtn",
        props: lp(),
        emits: { "group:selected": (e) => !0 },
        setup(e, t) {
            let { attrs: n, slots: l } = t;
            const { themeClasses: a } = Qe(e),
                { borderClasses: r } = Dn(e),
                { densityClasses: o } = $t(e),
                { dimensionStyles: i } = Nt(e),
                { elevationClasses: s } = Sn(e),
                { loaderClasses: u } = ri(e),
                { locationStyles: c } = qa(e),
                { positionClasses: d } = ii(e),
                { roundedClasses: f } = wt(e),
                { sizeClasses: v, sizeStyles: g } = Ql(e),
                m = _d(e, e.symbol, !1),
                p = Qa(e, n),
                C = S(() => {
                    var V;
                    return e.active !== void 0
                        ? e.active
                        : p.isLink.value
                        ? (V = p.isActive) == null
                            ? void 0
                            : V.value
                        : m == null
                        ? void 0
                        : m.isSelected.value;
                }),
                x = S(() => {
                    var R, M;
                    return {
                        color:
                            ((m == null ? void 0 : m.isSelected.value) &&
                                (!p.isLink.value ||
                                    ((R = p.isActive) == null
                                        ? void 0
                                        : R.value))) ||
                            !m ||
                            ((M = p.isActive) == null ? void 0 : M.value)
                                ? e.color ?? e.baseColor
                                : e.baseColor,
                        variant: e.variant,
                    };
                }),
                { colorClasses: _, colorStyles: T, variantClasses: k } = ml(x),
                A = S(
                    () => (m == null ? void 0 : m.disabled.value) || e.disabled
                ),
                w = S(
                    () =>
                        e.variant === "elevated" &&
                        !(e.disabled || e.flat || e.border)
                ),
                L = S(() => {
                    if (!(e.value === void 0 || typeof e.value == "symbol"))
                        return Object(e.value) === e.value
                            ? JSON.stringify(e.value, null, 0)
                            : e.value;
                });
            function E(V) {
                var R;
                A.value ||
                    (p.isLink.value &&
                        (V.metaKey ||
                            V.ctrlKey ||
                            V.shiftKey ||
                            V.button !== 0 ||
                            n.target === "_blank")) ||
                    ((R = p.navigate) == null || R.call(p, V),
                    m == null || m.toggle());
            }
            return (
                Qy(p, m == null ? void 0 : m.select),
                Se(() => {
                    const V = p.isLink.value ? "a" : e.tag,
                        R = !!(e.prependIcon || l.prepend),
                        M = !!(e.appendIcon || l.append),
                        B = !!(e.icon && e.icon !== !0);
                    return ut(
                        h(
                            V,
                            {
                                type: V === "a" ? void 0 : "button",
                                class: [
                                    "v-btn",
                                    m == null ? void 0 : m.selectedClass.value,
                                    {
                                        "v-btn--active": C.value,
                                        "v-btn--block": e.block,
                                        "v-btn--disabled": A.value,
                                        "v-btn--elevated": w.value,
                                        "v-btn--flat": e.flat,
                                        "v-btn--icon": !!e.icon,
                                        "v-btn--loading": e.loading,
                                        "v-btn--readonly": e.readonly,
                                        "v-btn--slim": e.slim,
                                        "v-btn--stacked": e.stacked,
                                    },
                                    a.value,
                                    r.value,
                                    _.value,
                                    o.value,
                                    s.value,
                                    u.value,
                                    d.value,
                                    f.value,
                                    v.value,
                                    k.value,
                                    e.class,
                                ],
                                style: [
                                    T.value,
                                    i.value,
                                    c.value,
                                    g.value,
                                    e.style,
                                ],
                                "aria-busy": e.loading ? !0 : void 0,
                                disabled: A.value || void 0,
                                href: p.href.value,
                                tabindex: e.loading || e.readonly ? -1 : void 0,
                                onClick: E,
                                value: L.value,
                            },
                            {
                                default: () => {
                                    var $;
                                    return [
                                        vl(!0, "v-btn"),
                                        !e.icon &&
                                            R &&
                                            h(
                                                "span",
                                                {
                                                    key: "prepend",
                                                    class: "v-btn__prepend",
                                                },
                                                [
                                                    l.prepend
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "prepend-defaults",
                                                                  disabled:
                                                                      !e.prependIcon,
                                                                  defaults: {
                                                                      VIcon: {
                                                                          icon: e.prependIcon,
                                                                      },
                                                                  },
                                                              },
                                                              l.prepend
                                                          )
                                                        : h(
                                                              Ne,
                                                              {
                                                                  key: "prepend-icon",
                                                                  icon: e.prependIcon,
                                                              },
                                                              null
                                                          ),
                                                ]
                                            ),
                                        h(
                                            "span",
                                            {
                                                class: "v-btn__content",
                                                "data-no-activator": "",
                                            },
                                            [
                                                !l.default && B
                                                    ? h(
                                                          Ne,
                                                          {
                                                              key: "content-icon",
                                                              icon: e.icon,
                                                          },
                                                          null
                                                      )
                                                    : h(
                                                          Fe,
                                                          {
                                                              key: "content-defaults",
                                                              disabled: !B,
                                                              defaults: {
                                                                  VIcon: {
                                                                      icon: e.icon,
                                                                  },
                                                              },
                                                          },
                                                          {
                                                              default: () => {
                                                                  var Z;
                                                                  return [
                                                                      ((Z =
                                                                          l.default) ==
                                                                      null
                                                                          ? void 0
                                                                          : Z.call(
                                                                                l
                                                                            )) ??
                                                                          e.text,
                                                                  ];
                                                              },
                                                          }
                                                      ),
                                            ]
                                        ),
                                        !e.icon &&
                                            M &&
                                            h(
                                                "span",
                                                {
                                                    key: "append",
                                                    class: "v-btn__append",
                                                },
                                                [
                                                    l.append
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "append-defaults",
                                                                  disabled:
                                                                      !e.appendIcon,
                                                                  defaults: {
                                                                      VIcon: {
                                                                          icon: e.appendIcon,
                                                                      },
                                                                  },
                                                              },
                                                              l.append
                                                          )
                                                        : h(
                                                              Ne,
                                                              {
                                                                  key: "append-icon",
                                                                  icon: e.appendIcon,
                                                              },
                                                              null
                                                          ),
                                                ]
                                            ),
                                        !!e.loading &&
                                            h(
                                                "span",
                                                {
                                                    key: "loader",
                                                    class: "v-btn__loader",
                                                },
                                                [
                                                    (($ = l.loader) == null
                                                        ? void 0
                                                        : $.call(l)) ??
                                                        h(
                                                            Xy,
                                                            {
                                                                color:
                                                                    typeof e.loading ==
                                                                    "boolean"
                                                                        ? void 0
                                                                        : e.loading,
                                                                indeterminate:
                                                                    !0,
                                                                width: "2",
                                                            },
                                                            null
                                                        ),
                                                ]
                                            ),
                                    ];
                                },
                            }
                        ),
                        [[Zl, !A.value && !!e.ripple, "", { center: !!e.icon }]]
                    );
                }),
                { group: m }
            );
        },
    }),
    ap = Ua("v-spacer", "div", "VSpacer"),
    Jr = Symbol.for("vuetify:list");
function Dd() {
    const e = Pe(Jr, { hasPrepend: oe(!1), updateHasPrepend: () => null }),
        t = {
            hasPrepend: oe(!1),
            updateHasPrepend: (n) => {
                n && (t.hasPrepend.value = n);
            },
        };
    return qe(Jr, t), e;
}
function Hd() {
    return Pe(Jr, null);
}
const si = (e) => {
        const t = {
            activate: (n) => {
                let { id: l, value: a, activated: r } = n;
                return (
                    (l = ye(l)),
                    (e && !a && r.size === 1 && r.has(l)) ||
                        (a ? r.add(l) : r.delete(l)),
                    r
                );
            },
            in: (n, l, a) => {
                let r = new Set();
                if (n != null)
                    for (const o of ot(n))
                        r = t.activate({
                            id: o,
                            value: !0,
                            activated: new Set(r),
                            children: l,
                            parents: a,
                        });
                return r;
            },
            out: (n) => Array.from(n),
        };
        return t;
    },
    Nd = (e) => {
        const t = si(e);
        return {
            activate: (l) => {
                let { activated: a, id: r, ...o } = l;
                r = ye(r);
                const i = a.has(r) ? new Set([r]) : new Set();
                return t.activate({ ...o, id: r, activated: i });
            },
            in: (l, a, r) => {
                let o = new Set();
                if (l != null) {
                    const i = ot(l);
                    i.length && (o = t.in(i.slice(0, 1), a, r));
                }
                return o;
            },
            out: (l, a, r) => t.out(l, a, r),
        };
    },
    rp = (e) => {
        const t = si(e);
        return {
            activate: (l) => {
                let { id: a, activated: r, children: o, ...i } = l;
                return (
                    (a = ye(a)),
                    o.has(a)
                        ? r
                        : t.activate({ id: a, activated: r, children: o, ...i })
                );
            },
            in: t.in,
            out: t.out,
        };
    },
    op = (e) => {
        const t = Nd(e);
        return {
            activate: (l) => {
                let { id: a, activated: r, children: o, ...i } = l;
                return (
                    (a = ye(a)),
                    o.has(a)
                        ? r
                        : t.activate({ id: a, activated: r, children: o, ...i })
                );
            },
            in: t.in,
            out: t.out,
        };
    },
    ip = {
        open: (e) => {
            let { id: t, value: n, opened: l, parents: a } = e;
            if (n) {
                const r = new Set();
                r.add(t);
                let o = a.get(t);
                for (; o != null; ) r.add(o), (o = a.get(o));
                return r;
            } else return l.delete(t), l;
        },
        select: () => null,
    },
    $d = {
        open: (e) => {
            let { id: t, value: n, opened: l, parents: a } = e;
            if (n) {
                let r = a.get(t);
                for (l.add(t); r != null && r !== t; ) l.add(r), (r = a.get(r));
                return l;
            } else l.delete(t);
            return l;
        },
        select: () => null,
    },
    sp = {
        open: $d.open,
        select: (e) => {
            let { id: t, value: n, opened: l, parents: a } = e;
            if (!n) return l;
            const r = [];
            let o = a.get(t);
            for (; o != null; ) r.push(o), (o = a.get(o));
            return new Set(r);
        },
    },
    ui = (e) => {
        const t = {
            select: (n) => {
                let { id: l, value: a, selected: r } = n;
                if (((l = ye(l)), e && !a)) {
                    const o = Array.from(r.entries()).reduce((i, s) => {
                        let [u, c] = s;
                        return c === "on" && i.push(u), i;
                    }, []);
                    if (o.length === 1 && o[0] === l) return r;
                }
                return r.set(l, a ? "on" : "off"), r;
            },
            in: (n, l, a) => {
                let r = new Map();
                for (const o of n || [])
                    r = t.select({
                        id: o,
                        value: !0,
                        selected: new Map(r),
                        children: l,
                        parents: a,
                    });
                return r;
            },
            out: (n) => {
                const l = [];
                for (const [a, r] of n.entries()) r === "on" && l.push(a);
                return l;
            },
        };
        return t;
    },
    Gd = (e) => {
        const t = ui(e);
        return {
            select: (l) => {
                let { selected: a, id: r, ...o } = l;
                r = ye(r);
                const i = a.has(r) ? new Map([[r, a.get(r)]]) : new Map();
                return t.select({ ...o, id: r, selected: i });
            },
            in: (l, a, r) => {
                let o = new Map();
                return (
                    l != null && l.length && (o = t.in(l.slice(0, 1), a, r)), o
                );
            },
            out: (l, a, r) => t.out(l, a, r),
        };
    },
    up = (e) => {
        const t = ui(e);
        return {
            select: (l) => {
                let { id: a, selected: r, children: o, ...i } = l;
                return (
                    (a = ye(a)),
                    o.has(a)
                        ? r
                        : t.select({ id: a, selected: r, children: o, ...i })
                );
            },
            in: t.in,
            out: t.out,
        };
    },
    cp = (e) => {
        const t = Gd(e);
        return {
            select: (l) => {
                let { id: a, selected: r, children: o, ...i } = l;
                return (
                    (a = ye(a)),
                    o.has(a)
                        ? r
                        : t.select({ id: a, selected: r, children: o, ...i })
                );
            },
            in: t.in,
            out: t.out,
        };
    },
    dp = (e) => {
        const t = {
            select: (n) => {
                let {
                    id: l,
                    value: a,
                    selected: r,
                    children: o,
                    parents: i,
                } = n;
                l = ye(l);
                const s = new Map(r),
                    u = [l];
                for (; u.length; ) {
                    const d = u.shift();
                    r.set(d, a ? "on" : "off"), o.has(d) && u.push(...o.get(d));
                }
                let c = i.get(l);
                for (; c; ) {
                    const d = o.get(c),
                        f = d.every((g) => r.get(g) === "on"),
                        v = d.every((g) => !r.has(g) || r.get(g) === "off");
                    r.set(c, f ? "on" : v ? "off" : "indeterminate"),
                        (c = i.get(c));
                }
                return e &&
                    !a &&
                    Array.from(r.entries()).reduce((f, v) => {
                        let [g, m] = v;
                        return m === "on" && f.push(g), f;
                    }, []).length === 0
                    ? s
                    : r;
            },
            in: (n, l, a) => {
                let r = new Map();
                for (const o of n || [])
                    r = t.select({
                        id: o,
                        value: !0,
                        selected: new Map(r),
                        children: l,
                        parents: a,
                    });
                return r;
            },
            out: (n, l) => {
                const a = [];
                for (const [r, o] of n.entries())
                    o === "on" && !l.has(r) && a.push(r);
                return a;
            },
        };
        return t;
    },
    Gl = Symbol.for("vuetify:nested"),
    zd = {
        id: oe(),
        root: {
            register: () => null,
            unregister: () => null,
            parents: le(new Map()),
            children: le(new Map()),
            open: () => null,
            openOnSelect: () => null,
            activate: () => null,
            select: () => null,
            activatable: le(!1),
            selectable: le(!1),
            opened: le(new Set()),
            activated: le(new Set()),
            selected: le(new Map()),
            selectedValues: le([]),
        },
    },
    fp = q(
        {
            activatable: Boolean,
            selectable: Boolean,
            activeStrategy: [String, Function, Object],
            selectStrategy: [String, Function, Object],
            openStrategy: [String, Object],
            opened: null,
            activated: null,
            selected: null,
            mandatory: Boolean,
        },
        "nested"
    ),
    vp = (e) => {
        let t = !1;
        const n = le(new Map()),
            l = le(new Map()),
            a = Be(
                e,
                "opened",
                e.opened,
                (v) => new Set(v),
                (v) => [...v.values()]
            ),
            r = S(() => {
                if (typeof e.activeStrategy == "object")
                    return e.activeStrategy;
                if (typeof e.activeStrategy == "function")
                    return e.activeStrategy(e.mandatory);
                switch (e.activeStrategy) {
                    case "leaf":
                        return rp(e.mandatory);
                    case "single-leaf":
                        return op(e.mandatory);
                    case "independent":
                        return si(e.mandatory);
                    case "single-independent":
                    default:
                        return Nd(e.mandatory);
                }
            }),
            o = S(() => {
                if (typeof e.selectStrategy == "object")
                    return e.selectStrategy;
                if (typeof e.selectStrategy == "function")
                    return e.selectStrategy(e.mandatory);
                switch (e.selectStrategy) {
                    case "single-leaf":
                        return cp(e.mandatory);
                    case "leaf":
                        return up(e.mandatory);
                    case "independent":
                        return ui(e.mandatory);
                    case "single-independent":
                        return Gd(e.mandatory);
                    case "classic":
                    default:
                        return dp(e.mandatory);
                }
            }),
            i = S(() => {
                if (typeof e.openStrategy == "object") return e.openStrategy;
                switch (e.openStrategy) {
                    case "list":
                        return sp;
                    case "single":
                        return ip;
                    case "multiple":
                    default:
                        return $d;
                }
            }),
            s = Be(
                e,
                "activated",
                e.activated,
                (v) => r.value.in(v, n.value, l.value),
                (v) => r.value.out(v, n.value, l.value)
            ),
            u = Be(
                e,
                "selected",
                e.selected,
                (v) => o.value.in(v, n.value, l.value),
                (v) => o.value.out(v, n.value, l.value)
            );
        ht(() => {
            t = !0;
        });
        function c(v) {
            const g = [];
            let m = v;
            for (; m != null; ) g.unshift(m), (m = l.value.get(m));
            return g;
        }
        const d = je("nested"),
            f = {
                id: oe(),
                root: {
                    opened: a,
                    activatable: ce(e, "activatable"),
                    selectable: ce(e, "selectable"),
                    activated: s,
                    selected: u,
                    selectedValues: S(() => {
                        const v = [];
                        for (const [g, m] of u.value.entries())
                            m === "on" && v.push(g);
                        return v;
                    }),
                    register: (v, g, m) => {
                        g && v !== g && l.value.set(v, g),
                            m && n.value.set(v, []),
                            g != null &&
                                n.value.set(g, [...(n.value.get(g) || []), v]);
                    },
                    unregister: (v) => {
                        if (t) return;
                        n.value.delete(v);
                        const g = l.value.get(v);
                        if (g) {
                            const m = n.value.get(g) ?? [];
                            n.value.set(
                                g,
                                m.filter((p) => p !== v)
                            );
                        }
                        l.value.delete(v), a.value.delete(v);
                    },
                    open: (v, g, m) => {
                        d.emit("click:open", {
                            id: v,
                            value: g,
                            path: c(v),
                            event: m,
                        });
                        const p = i.value.open({
                            id: v,
                            value: g,
                            opened: new Set(a.value),
                            children: n.value,
                            parents: l.value,
                            event: m,
                        });
                        p && (a.value = p);
                    },
                    openOnSelect: (v, g, m) => {
                        const p = i.value.select({
                            id: v,
                            value: g,
                            selected: new Map(u.value),
                            opened: new Set(a.value),
                            children: n.value,
                            parents: l.value,
                            event: m,
                        });
                        p && (a.value = p);
                    },
                    select: (v, g, m) => {
                        d.emit("click:select", {
                            id: v,
                            value: g,
                            path: c(v),
                            event: m,
                        });
                        const p = o.value.select({
                            id: v,
                            value: g,
                            selected: new Map(u.value),
                            children: n.value,
                            parents: l.value,
                            event: m,
                        });
                        p && (u.value = p), f.root.openOnSelect(v, g, m);
                    },
                    activate: (v, g, m) => {
                        if (!e.activatable) return f.root.select(v, !0, m);
                        d.emit("click:activate", {
                            id: v,
                            value: g,
                            path: c(v),
                            event: m,
                        });
                        const p = r.value.activate({
                            id: v,
                            value: g,
                            activated: new Set(s.value),
                            children: n.value,
                            parents: l.value,
                            event: m,
                        });
                        p && (s.value = p);
                    },
                    children: n,
                    parents: l,
                },
            };
        return qe(Gl, f), f.root;
    },
    Xd = (e, t) => {
        const n = Pe(Gl, zd),
            l = Symbol(Tt()),
            a = S(() => (e.value !== void 0 ? e.value : l)),
            r = {
                ...n,
                id: a,
                open: (o, i) => n.root.open(a.value, o, i),
                openOnSelect: (o, i) => n.root.openOnSelect(a.value, o, i),
                isOpen: S(() => n.root.opened.value.has(a.value)),
                parent: S(() => n.root.parents.value.get(a.value)),
                activate: (o, i) => n.root.activate(a.value, o, i),
                isActivated: S(() => n.root.activated.value.has(ye(a.value))),
                select: (o, i) => n.root.select(a.value, o, i),
                isSelected: S(
                    () => n.root.selected.value.get(ye(a.value)) === "on"
                ),
                isIndeterminate: S(
                    () => n.root.selected.value.get(a.value) === "indeterminate"
                ),
                isLeaf: S(() => !n.root.children.value.get(a.value)),
                isGroupActivator: n.isGroupActivator,
            };
        return (
            !n.isGroupActivator && n.root.register(a.value, n.id.value, t),
            ht(() => {
                !n.isGroupActivator && n.root.unregister(a.value);
            }),
            t && qe(Gl, r),
            r
        );
    },
    mp = () => {
        const e = Pe(Gl, zd);
        qe(Gl, { ...e, isGroupActivator: !0 });
    },
    hp = dl({
        name: "VListGroupActivator",
        setup(e, t) {
            let { slots: n } = t;
            return (
                mp(),
                () => {
                    var l;
                    return (l = n.default) == null ? void 0 : l.call(n);
                }
            );
        },
    }),
    gp = q(
        {
            activeColor: String,
            baseColor: String,
            color: String,
            collapseIcon: { type: Ee, default: "$collapse" },
            expandIcon: { type: Ee, default: "$expand" },
            prependIcon: Ee,
            appendIcon: Ee,
            fluid: Boolean,
            subgroup: Boolean,
            title: String,
            value: null,
            ...Ae(),
            ...ze(),
        },
        "VListGroup"
    ),
    Ys = de()({
        name: "VListGroup",
        props: gp(),
        setup(e, t) {
            let { slots: n } = t;
            const { isOpen: l, open: a, id: r } = Xd(ce(e, "value"), !0),
                o = S(() => `v-list-group--id-${String(r.value)}`),
                i = Hd(),
                { isBooted: s } = ti();
            function u(v) {
                v.stopPropagation(), a(!l.value, v);
            }
            const c = S(() => ({
                    onClick: u,
                    class: "v-list-group__header",
                    id: o.value,
                })),
                d = S(() => (l.value ? e.collapseIcon : e.expandIcon)),
                f = S(() => ({
                    VListItem: {
                        active: l.value,
                        activeColor: e.activeColor,
                        baseColor: e.baseColor,
                        color: e.color,
                        prependIcon: e.prependIcon || (e.subgroup && d.value),
                        appendIcon: e.appendIcon || (!e.subgroup && d.value),
                        title: e.title,
                        value: e.value,
                    },
                }));
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: [
                                "v-list-group",
                                {
                                    "v-list-group--prepend":
                                        i == null ? void 0 : i.hasPrepend.value,
                                    "v-list-group--fluid": e.fluid,
                                    "v-list-group--subgroup": e.subgroup,
                                    "v-list-group--open": l.value,
                                },
                                e.class,
                            ],
                            style: e.style,
                        },
                        {
                            default: () => [
                                n.activator &&
                                    h(
                                        Fe,
                                        { defaults: f.value },
                                        {
                                            default: () => [
                                                h(hp, null, {
                                                    default: () => [
                                                        n.activator({
                                                            props: c.value,
                                                            isOpen: l.value,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }
                                    ),
                                h(
                                    cn,
                                    {
                                        transition: { component: yd },
                                        disabled: !s.value,
                                    },
                                    {
                                        default: () => {
                                            var v;
                                            return [
                                                ut(
                                                    h(
                                                        "div",
                                                        {
                                                            class: "v-list-group__items",
                                                            role: "group",
                                                            "aria-labelledby":
                                                                o.value,
                                                        },
                                                        [
                                                            (v = n.default) ==
                                                            null
                                                                ? void 0
                                                                : v.call(n),
                                                        ]
                                                    ),
                                                    [[Ln, l.value]]
                                                ),
                                            ];
                                        },
                                    }
                                ),
                            ],
                        }
                    )
                ),
                { isOpen: l }
            );
        },
    }),
    yp = q(
        { opacity: [Number, String], ...Ae(), ...ze() },
        "VListItemSubtitle"
    ),
    pp = de()({
        name: "VListItemSubtitle",
        props: yp(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: ["v-list-item-subtitle", e.class],
                            style: [
                                { "--v-list-item-subtitle-opacity": e.opacity },
                                e.style,
                            ],
                        },
                        n
                    )
                ),
                {}
            );
        },
    }),
    bp = Ua("v-list-item-title"),
    Sp = q(
        {
            start: Boolean,
            end: Boolean,
            icon: Ee,
            image: String,
            text: String,
            ...Ae(),
            ...Pt(),
            ...kt(),
            ...ql(),
            ...ze(),
            ...We(),
            ...Jt({ variant: "flat" }),
        },
        "VAvatar"
    ),
    hn = de()({
        name: "VAvatar",
        props: Sp(),
        setup(e, t) {
            let { slots: n } = t;
            const { themeClasses: l } = Qe(e),
                { colorClasses: a, colorStyles: r, variantClasses: o } = ml(e),
                { densityClasses: i } = $t(e),
                { roundedClasses: s } = wt(e),
                { sizeClasses: u, sizeStyles: c } = Ql(e);
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: [
                                "v-avatar",
                                {
                                    "v-avatar--start": e.start,
                                    "v-avatar--end": e.end,
                                },
                                l.value,
                                a.value,
                                i.value,
                                s.value,
                                u.value,
                                o.value,
                                e.class,
                            ],
                            style: [r.value, c.value, e.style],
                        },
                        {
                            default: () => [
                                n.default
                                    ? h(
                                          Fe,
                                          {
                                              key: "content-defaults",
                                              defaults: {
                                                  VImg: {
                                                      cover: !0,
                                                      image: e.image,
                                                  },
                                                  VIcon: { icon: e.icon },
                                              },
                                          },
                                          { default: () => [n.default()] }
                                      )
                                    : e.image
                                    ? h(
                                          ei,
                                          {
                                              key: "image",
                                              src: e.image,
                                              alt: "",
                                              cover: !0,
                                          },
                                          null
                                      )
                                    : e.icon
                                    ? h(Ne, { key: "icon", icon: e.icon }, null)
                                    : e.text,
                                vl(!1, "v-avatar"),
                            ],
                        }
                    )
                ),
                {}
            );
        },
    }),
    Cp = q(
        {
            active: { type: Boolean, default: void 0 },
            activeClass: String,
            activeColor: String,
            appendAvatar: String,
            appendIcon: Ee,
            baseColor: String,
            disabled: Boolean,
            lines: [Boolean, String],
            link: { type: Boolean, default: void 0 },
            nav: Boolean,
            prependAvatar: String,
            prependIcon: Ee,
            ripple: { type: [Boolean, Object], default: !0 },
            slim: Boolean,
            subtitle: [String, Number],
            title: [String, Number],
            value: null,
            onClick: it(),
            onClickOnce: it(),
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...Ht(),
            ...bn(),
            ...kt(),
            ...Za(),
            ...ze(),
            ...We(),
            ...Jt({ variant: "text" }),
        },
        "VListItem"
    ),
    ll = de()({
        name: "VListItem",
        directives: { Ripple: Zl },
        props: Cp(),
        emits: { click: (e) => !0 },
        setup(e, t) {
            let { attrs: n, slots: l, emit: a } = t;
            const r = Qa(e, n),
                o = S(() => (e.value === void 0 ? r.href.value : e.value)),
                {
                    activate: i,
                    isActivated: s,
                    select: u,
                    isSelected: c,
                    isIndeterminate: d,
                    isGroupActivator: f,
                    root: v,
                    parent: g,
                    openOnSelect: m,
                } = Xd(o, !1),
                p = Hd(),
                C = S(() => {
                    var F;
                    return (
                        e.active !== !1 &&
                        (e.active ||
                            ((F = r.isActive) == null ? void 0 : F.value) ||
                            (v.activatable.value ? s.value : c.value))
                    );
                }),
                x = S(() => e.link !== !1 && r.isLink.value),
                _ = S(
                    () =>
                        !e.disabled &&
                        e.link !== !1 &&
                        (e.link ||
                            r.isClickable.value ||
                            (!!p &&
                                (v.selectable.value ||
                                    v.activatable.value ||
                                    e.value != null)))
                ),
                T = S(() => e.rounded || e.nav),
                k = S(() => e.color ?? e.activeColor),
                A = S(() => ({
                    color: C.value ? k.value ?? e.baseColor : e.baseColor,
                    variant: e.variant,
                }));
            ue(
                () => {
                    var F;
                    return (F = r.isActive) == null ? void 0 : F.value;
                },
                (F) => {
                    F && g.value != null && v.open(g.value, !0), F && m(F);
                },
                { immediate: !0 }
            );
            const { themeClasses: w } = Qe(e),
                { borderClasses: L } = Dn(e),
                { colorClasses: E, colorStyles: V, variantClasses: R } = ml(A),
                { densityClasses: M } = $t(e),
                { dimensionStyles: B } = Nt(e),
                { elevationClasses: $ } = Sn(e),
                { roundedClasses: Z } = wt(T),
                ee = S(() =>
                    e.lines ? `v-list-item--${e.lines}-line` : void 0
                ),
                ne = S(() => ({
                    isActive: C.value,
                    select: u,
                    isSelected: c.value,
                    isIndeterminate: d.value,
                }));
            function H(F) {
                var z;
                a("click", F),
                    _.value &&
                        ((z = r.navigate) == null || z.call(r, F),
                        !f &&
                            (v.activatable.value
                                ? i(!s.value, F)
                                : (v.selectable.value || e.value != null) &&
                                  u(!c.value, F)));
            }
            function X(F) {
                (F.key === "Enter" || F.key === " ") &&
                    (F.preventDefault(), H(F));
            }
            return (
                Se(() => {
                    const F = x.value ? "a" : e.tag,
                        z = l.title || e.title != null,
                        J = l.subtitle || e.subtitle != null,
                        ie = !!(e.appendAvatar || e.appendIcon),
                        pe = !!(ie || l.append),
                        Ce = !!(e.prependAvatar || e.prependIcon),
                        ae = !!(Ce || l.prepend);
                    return (
                        p == null || p.updateHasPrepend(ae),
                        e.activeColor &&
                            Vh("active-color", ["color", "base-color"]),
                        ut(
                            h(
                                F,
                                {
                                    class: [
                                        "v-list-item",
                                        {
                                            "v-list-item--active": C.value,
                                            "v-list-item--disabled": e.disabled,
                                            "v-list-item--link": _.value,
                                            "v-list-item--nav": e.nav,
                                            "v-list-item--prepend":
                                                !ae &&
                                                (p == null
                                                    ? void 0
                                                    : p.hasPrepend.value),
                                            "v-list-item--slim": e.slim,
                                            [`${e.activeClass}`]:
                                                e.activeClass && C.value,
                                        },
                                        w.value,
                                        L.value,
                                        E.value,
                                        M.value,
                                        $.value,
                                        ee.value,
                                        Z.value,
                                        R.value,
                                        e.class,
                                    ],
                                    style: [V.value, B.value, e.style],
                                    href: r.href.value,
                                    tabindex: _.value ? (p ? -2 : 0) : void 0,
                                    onClick: H,
                                    onKeydown: _.value && !x.value && X,
                                },
                                {
                                    default: () => {
                                        var I;
                                        return [
                                            vl(
                                                _.value || C.value,
                                                "v-list-item"
                                            ),
                                            ae &&
                                                h(
                                                    "div",
                                                    {
                                                        key: "prepend",
                                                        class: "v-list-item__prepend",
                                                    },
                                                    [
                                                        l.prepend
                                                            ? h(
                                                                  Fe,
                                                                  {
                                                                      key: "prepend-defaults",
                                                                      disabled:
                                                                          !Ce,
                                                                      defaults:
                                                                          {
                                                                              VAvatar:
                                                                                  {
                                                                                      density:
                                                                                          e.density,
                                                                                      image: e.prependAvatar,
                                                                                  },
                                                                              VIcon: {
                                                                                  density:
                                                                                      e.density,
                                                                                  icon: e.prependIcon,
                                                                              },
                                                                              VListItemAction:
                                                                                  {
                                                                                      start: !0,
                                                                                  },
                                                                          },
                                                                  },
                                                                  {
                                                                      default:
                                                                          () => {
                                                                              var W;
                                                                              return [
                                                                                  (W =
                                                                                      l.prepend) ==
                                                                                  null
                                                                                      ? void 0
                                                                                      : W.call(
                                                                                            l,
                                                                                            ne.value
                                                                                        ),
                                                                              ];
                                                                          },
                                                                  }
                                                              )
                                                            : h(we, null, [
                                                                  e.prependAvatar &&
                                                                      h(
                                                                          hn,
                                                                          {
                                                                              key: "prepend-avatar",
                                                                              density:
                                                                                  e.density,
                                                                              image: e.prependAvatar,
                                                                          },
                                                                          null
                                                                      ),
                                                                  e.prependIcon &&
                                                                      h(
                                                                          Ne,
                                                                          {
                                                                              key: "prepend-icon",
                                                                              density:
                                                                                  e.density,
                                                                              icon: e.prependIcon,
                                                                          },
                                                                          null
                                                                      ),
                                                              ]),
                                                        h(
                                                            "div",
                                                            {
                                                                class: "v-list-item__spacer",
                                                            },
                                                            null
                                                        ),
                                                    ]
                                                ),
                                            h(
                                                "div",
                                                {
                                                    class: "v-list-item__content",
                                                    "data-no-activator": "",
                                                },
                                                [
                                                    z &&
                                                        h(
                                                            bp,
                                                            { key: "title" },
                                                            {
                                                                default: () => {
                                                                    var W;
                                                                    return [
                                                                        ((W =
                                                                            l.title) ==
                                                                        null
                                                                            ? void 0
                                                                            : W.call(
                                                                                  l,
                                                                                  {
                                                                                      title: e.title,
                                                                                  }
                                                                              )) ??
                                                                            e.title,
                                                                    ];
                                                                },
                                                            }
                                                        ),
                                                    J &&
                                                        h(
                                                            pp,
                                                            { key: "subtitle" },
                                                            {
                                                                default: () => {
                                                                    var W;
                                                                    return [
                                                                        ((W =
                                                                            l.subtitle) ==
                                                                        null
                                                                            ? void 0
                                                                            : W.call(
                                                                                  l,
                                                                                  {
                                                                                      subtitle:
                                                                                          e.subtitle,
                                                                                  }
                                                                              )) ??
                                                                            e.subtitle,
                                                                    ];
                                                                },
                                                            }
                                                        ),
                                                    (I = l.default) == null
                                                        ? void 0
                                                        : I.call(l, ne.value),
                                                ]
                                            ),
                                            pe &&
                                                h(
                                                    "div",
                                                    {
                                                        key: "append",
                                                        class: "v-list-item__append",
                                                    },
                                                    [
                                                        l.append
                                                            ? h(
                                                                  Fe,
                                                                  {
                                                                      key: "append-defaults",
                                                                      disabled:
                                                                          !ie,
                                                                      defaults:
                                                                          {
                                                                              VAvatar:
                                                                                  {
                                                                                      density:
                                                                                          e.density,
                                                                                      image: e.appendAvatar,
                                                                                  },
                                                                              VIcon: {
                                                                                  density:
                                                                                      e.density,
                                                                                  icon: e.appendIcon,
                                                                              },
                                                                              VListItemAction:
                                                                                  {
                                                                                      end: !0,
                                                                                  },
                                                                          },
                                                                  },
                                                                  {
                                                                      default:
                                                                          () => {
                                                                              var W;
                                                                              return [
                                                                                  (W =
                                                                                      l.append) ==
                                                                                  null
                                                                                      ? void 0
                                                                                      : W.call(
                                                                                            l,
                                                                                            ne.value
                                                                                        ),
                                                                              ];
                                                                          },
                                                                  }
                                                              )
                                                            : h(we, null, [
                                                                  e.appendIcon &&
                                                                      h(
                                                                          Ne,
                                                                          {
                                                                              key: "append-icon",
                                                                              density:
                                                                                  e.density,
                                                                              icon: e.appendIcon,
                                                                          },
                                                                          null
                                                                      ),
                                                                  e.appendAvatar &&
                                                                      h(
                                                                          hn,
                                                                          {
                                                                              key: "append-avatar",
                                                                              density:
                                                                                  e.density,
                                                                              image: e.appendAvatar,
                                                                          },
                                                                          null
                                                                      ),
                                                              ]),
                                                        h(
                                                            "div",
                                                            {
                                                                class: "v-list-item__spacer",
                                                            },
                                                            null
                                                        ),
                                                    ]
                                                ),
                                        ];
                                    },
                                }
                            ),
                            [[Rn("ripple"), _.value && e.ripple]]
                        )
                    );
                }),
                {
                    activate: i,
                    isActivated: s,
                    isGroupActivator: f,
                    isSelected: c,
                    list: p,
                    select: u,
                }
            );
        },
    }),
    kp = q(
        {
            color: String,
            inset: Boolean,
            sticky: Boolean,
            title: String,
            ...Ae(),
            ...ze(),
        },
        "VListSubheader"
    ),
    wp = de()({
        name: "VListSubheader",
        props: kp(),
        setup(e, t) {
            let { slots: n } = t;
            const { textColorClasses: l, textColorStyles: a } = Mt(
                ce(e, "color")
            );
            return (
                Se(() => {
                    const r = !!(n.default || e.title);
                    return h(
                        e.tag,
                        {
                            class: [
                                "v-list-subheader",
                                {
                                    "v-list-subheader--inset": e.inset,
                                    "v-list-subheader--sticky": e.sticky,
                                },
                                l.value,
                                e.class,
                            ],
                            style: [{ textColorStyles: a }, e.style],
                        },
                        {
                            default: () => {
                                var o;
                                return [
                                    r &&
                                        h(
                                            "div",
                                            { class: "v-list-subheader__text" },
                                            [
                                                ((o = n.default) == null
                                                    ? void 0
                                                    : o.call(n)) ?? e.title,
                                            ]
                                        ),
                                ];
                            },
                        }
                    );
                }),
                {}
            );
        },
    }),
    Ap = q(
        {
            color: String,
            inset: Boolean,
            length: [Number, String],
            opacity: [Number, String],
            thickness: [Number, String],
            vertical: Boolean,
            ...Ae(),
            ...We(),
        },
        "VDivider"
    ),
    _p = de()({
        name: "VDivider",
        props: Ap(),
        setup(e, t) {
            let { attrs: n, slots: l } = t;
            const { themeClasses: a } = Qe(e),
                { textColorClasses: r, textColorStyles: o } = Mt(
                    ce(e, "color")
                ),
                i = S(() => {
                    const s = {};
                    return (
                        e.length &&
                            (s[e.vertical ? "height" : "width"] = me(e.length)),
                        e.thickness &&
                            (s[
                                e.vertical
                                    ? "borderRightWidth"
                                    : "borderTopWidth"
                            ] = me(e.thickness)),
                        s
                    );
                });
            return (
                Se(() => {
                    const s = h(
                        "hr",
                        {
                            class: [
                                {
                                    "v-divider": !0,
                                    "v-divider--inset": e.inset,
                                    "v-divider--vertical": e.vertical,
                                },
                                a.value,
                                r.value,
                                e.class,
                            ],
                            style: [
                                i.value,
                                o.value,
                                { "--v-border-opacity": e.opacity },
                                e.style,
                            ],
                            "aria-orientation":
                                !n.role || n.role === "separator"
                                    ? e.vertical
                                        ? "vertical"
                                        : "horizontal"
                                    : void 0,
                            role: `${n.role || "separator"}`,
                        },
                        null
                    );
                    return l.default
                        ? h(
                              "div",
                              {
                                  class: [
                                      "v-divider__wrapper",
                                      {
                                          "v-divider__wrapper--vertical":
                                              e.vertical,
                                          "v-divider__wrapper--inset": e.inset,
                                      },
                                  ],
                              },
                              [
                                  s,
                                  h("div", { class: "v-divider__content" }, [
                                      l.default(),
                                  ]),
                                  s,
                              ]
                          )
                        : s;
                }),
                {}
            );
        },
    }),
    xp = q({ items: Array, returnObject: Boolean }, "VListChildren"),
    jd = de()({
        name: "VListChildren",
        props: xp(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Dd(),
                () => {
                    var l, a;
                    return (
                        ((l = n.default) == null ? void 0 : l.call(n)) ??
                        ((a = e.items) == null
                            ? void 0
                            : a.map((r) => {
                                  var f, v;
                                  let {
                                      children: o,
                                      props: i,
                                      type: s,
                                      raw: u,
                                  } = r;
                                  if (s === "divider")
                                      return (
                                          ((f = n.divider) == null
                                              ? void 0
                                              : f.call(n, { props: i })) ??
                                          h(_p, i, null)
                                      );
                                  if (s === "subheader")
                                      return (
                                          ((v = n.subheader) == null
                                              ? void 0
                                              : v.call(n, { props: i })) ??
                                          h(wp, i, null)
                                      );
                                  const c = {
                                          subtitle: n.subtitle
                                              ? (g) => {
                                                    var m;
                                                    return (m = n.subtitle) ==
                                                        null
                                                        ? void 0
                                                        : m.call(n, {
                                                              ...g,
                                                              item: u,
                                                          });
                                                }
                                              : void 0,
                                          prepend: n.prepend
                                              ? (g) => {
                                                    var m;
                                                    return (m = n.prepend) ==
                                                        null
                                                        ? void 0
                                                        : m.call(n, {
                                                              ...g,
                                                              item: u,
                                                          });
                                                }
                                              : void 0,
                                          append: n.append
                                              ? (g) => {
                                                    var m;
                                                    return (m = n.append) ==
                                                        null
                                                        ? void 0
                                                        : m.call(n, {
                                                              ...g,
                                                              item: u,
                                                          });
                                                }
                                              : void 0,
                                          title: n.title
                                              ? (g) => {
                                                    var m;
                                                    return (m = n.title) == null
                                                        ? void 0
                                                        : m.call(n, {
                                                              ...g,
                                                              item: u,
                                                          });
                                                }
                                              : void 0,
                                      },
                                      d = Ys.filterProps(i);
                                  return o
                                      ? h(
                                            Ys,
                                            ke(
                                                {
                                                    value:
                                                        i == null
                                                            ? void 0
                                                            : i.value,
                                                },
                                                d
                                            ),
                                            {
                                                activator: (g) => {
                                                    let { props: m } = g;
                                                    const p = {
                                                        ...i,
                                                        ...m,
                                                        value: e.returnObject
                                                            ? u
                                                            : i.value,
                                                    };
                                                    return n.header
                                                        ? n.header({ props: p })
                                                        : h(ll, p, c);
                                                },
                                                default: () =>
                                                    h(
                                                        jd,
                                                        {
                                                            items: o,
                                                            returnObject:
                                                                e.returnObject,
                                                        },
                                                        n
                                                    ),
                                            }
                                        )
                                      : n.item
                                      ? n.item({ props: i })
                                      : h(
                                            ll,
                                            ke(i, {
                                                value: e.returnObject
                                                    ? u
                                                    : i.value,
                                            }),
                                            c
                                        );
                              }))
                    );
                }
            );
        },
    }),
    Wd = q(
        {
            items: { type: Array, default: () => [] },
            itemTitle: { type: [String, Array, Function], default: "title" },
            itemValue: { type: [String, Array, Function], default: "value" },
            itemChildren: {
                type: [Boolean, String, Array, Function],
                default: "children",
            },
            itemProps: {
                type: [Boolean, String, Array, Function],
                default: "props",
            },
            returnObject: Boolean,
            valueComparator: { type: Function, default: cl },
        },
        "list-items"
    );
function eo(e, t) {
    const n = Ot(t, e.itemTitle, t),
        l = Ot(t, e.itemValue, n),
        a = Ot(t, e.itemChildren),
        r =
            e.itemProps === !0
                ? typeof t == "object" && t != null && !Array.isArray(t)
                    ? "children" in t
                        ? On(t, ["children"])
                        : t
                    : void 0
                : Ot(t, e.itemProps),
        o = { title: n, value: l, ...r };
    return {
        title: String(o.title ?? ""),
        value: o.value,
        props: o,
        children: Array.isArray(a) ? Ud(e, a) : void 0,
        raw: t,
    };
}
function Ud(e, t) {
    const n = [];
    for (const l of t) n.push(eo(e, l));
    return n;
}
function Kd(e) {
    const t = S(() => Ud(e, e.items)),
        n = S(() => t.value.some((r) => r.value === null));
    function l(r) {
        return (
            n.value || (r = r.filter((o) => o !== null)),
            r.map((o) =>
                e.returnObject && typeof o == "string"
                    ? eo(e, o)
                    : t.value.find((i) => e.valueComparator(o, i.value)) ||
                      eo(e, o)
            )
        );
    }
    function a(r) {
        return e.returnObject
            ? r.map((o) => {
                  let { raw: i } = o;
                  return i;
              })
            : r.map((o) => {
                  let { value: i } = o;
                  return i;
              });
    }
    return { items: t, transformIn: l, transformOut: a };
}
function Mp(e) {
    return (
        typeof e == "string" || typeof e == "number" || typeof e == "boolean"
    );
}
function Ep(e, t) {
    const n = Ot(t, e.itemType, "item"),
        l = Mp(t) ? t : Ot(t, e.itemTitle),
        a = Ot(t, e.itemValue, void 0),
        r = Ot(t, e.itemChildren),
        o = e.itemProps === !0 ? On(t, ["children"]) : Ot(t, e.itemProps),
        i = { title: l, value: a, ...o };
    return {
        type: n,
        title: i.title,
        value: i.value,
        props: i,
        children: n === "item" && r ? Yd(e, r) : void 0,
        raw: t,
    };
}
function Yd(e, t) {
    const n = [];
    for (const l of t) n.push(Ep(e, l));
    return n;
}
function Tp(e) {
    return { items: S(() => Yd(e, e.items)) };
}
const Pp = q(
        {
            baseColor: String,
            activeColor: String,
            activeClass: String,
            bgColor: String,
            disabled: Boolean,
            expandIcon: String,
            collapseIcon: String,
            lines: { type: [Boolean, String], default: "one" },
            slim: Boolean,
            nav: Boolean,
            "onClick:open": it(),
            "onClick:select": it(),
            "onUpdate:opened": it(),
            ...fp({ selectStrategy: "single-leaf", openStrategy: "list" }),
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...Ht(),
            ...bn(),
            itemType: { type: String, default: "type" },
            ...Wd(),
            ...kt(),
            ...ze(),
            ...We(),
            ...Jt({ variant: "text" }),
        },
        "VList"
    ),
    ci = de()({
        name: "VList",
        props: Pp(),
        emits: {
            "update:selected": (e) => !0,
            "update:activated": (e) => !0,
            "update:opened": (e) => !0,
            "click:open": (e) => !0,
            "click:activate": (e) => !0,
            "click:select": (e) => !0,
        },
        setup(e, t) {
            let { slots: n } = t;
            const { items: l } = Tp(e),
                { themeClasses: a } = Qe(e),
                { backgroundColorClasses: r, backgroundColorStyles: o } = Ut(
                    ce(e, "bgColor")
                ),
                { borderClasses: i } = Dn(e),
                { densityClasses: s } = $t(e),
                { dimensionStyles: u } = Nt(e),
                { elevationClasses: c } = Sn(e),
                { roundedClasses: d } = wt(e),
                { children: f, open: v, parents: g, select: m } = vp(e),
                p = S(() => (e.lines ? `v-list--${e.lines}-line` : void 0)),
                C = ce(e, "activeColor"),
                x = ce(e, "baseColor"),
                _ = ce(e, "color");
            Dd(),
                Fn({
                    VListGroup: {
                        activeColor: C,
                        baseColor: x,
                        color: _,
                        expandIcon: ce(e, "expandIcon"),
                        collapseIcon: ce(e, "collapseIcon"),
                    },
                    VListItem: {
                        activeClass: ce(e, "activeClass"),
                        activeColor: C,
                        baseColor: x,
                        color: _,
                        density: ce(e, "density"),
                        disabled: ce(e, "disabled"),
                        lines: ce(e, "lines"),
                        nav: ce(e, "nav"),
                        slim: ce(e, "slim"),
                        variant: ce(e, "variant"),
                    },
                });
            const T = oe(!1),
                k = le();
            function A(M) {
                T.value = !0;
            }
            function w(M) {
                T.value = !1;
            }
            function L(M) {
                var B;
                !T.value &&
                    !(
                        M.relatedTarget &&
                        (B = k.value) != null &&
                        B.contains(M.relatedTarget)
                    ) &&
                    R();
            }
            function E(M) {
                const B = M.target;
                if (!(!k.value || ["INPUT", "TEXTAREA"].includes(B.tagName))) {
                    if (M.key === "ArrowDown") R("next");
                    else if (M.key === "ArrowUp") R("prev");
                    else if (M.key === "Home") R("first");
                    else if (M.key === "End") R("last");
                    else return;
                    M.preventDefault();
                }
            }
            function V(M) {
                T.value = !0;
            }
            function R(M) {
                if (k.value) return Ma(k.value, M);
            }
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            ref: k,
                            class: [
                                "v-list",
                                {
                                    "v-list--disabled": e.disabled,
                                    "v-list--nav": e.nav,
                                    "v-list--slim": e.slim,
                                },
                                a.value,
                                r.value,
                                i.value,
                                s.value,
                                c.value,
                                p.value,
                                d.value,
                                e.class,
                            ],
                            style: [o.value, u.value, e.style],
                            tabindex: e.disabled || T.value ? -1 : 0,
                            role: "listbox",
                            "aria-activedescendant": void 0,
                            onFocusin: A,
                            onFocusout: w,
                            onFocus: L,
                            onKeydown: E,
                            onMousedown: V,
                        },
                        {
                            default: () => [
                                h(
                                    jd,
                                    {
                                        items: l.value,
                                        returnObject: e.returnObject,
                                    },
                                    n
                                ),
                            ],
                        }
                    )
                ),
                { open: v, select: m, focus: R, children: f, parents: g }
            );
        },
    });
function pr(e, t) {
    return { x: e.x + t.x, y: e.y + t.y };
}
function Ip(e, t) {
    return { x: e.x - t.x, y: e.y - t.y };
}
function qs(e, t) {
    if (e.side === "top" || e.side === "bottom") {
        const { side: n, align: l } = e,
            a =
                l === "left"
                    ? 0
                    : l === "center"
                    ? t.width / 2
                    : l === "right"
                    ? t.width
                    : l,
            r = n === "top" ? 0 : n === "bottom" ? t.height : n;
        return pr({ x: a, y: r }, t);
    } else if (e.side === "left" || e.side === "right") {
        const { side: n, align: l } = e,
            a = n === "left" ? 0 : n === "right" ? t.width : n,
            r =
                l === "top"
                    ? 0
                    : l === "center"
                    ? t.height / 2
                    : l === "bottom"
                    ? t.height
                    : l;
        return pr({ x: a, y: r }, t);
    }
    return pr({ x: t.width / 2, y: t.height / 2 }, t);
}
const qd = { static: Lp, connected: Fp },
    Vp = q(
        {
            locationStrategy: {
                type: [String, Function],
                default: "static",
                validator: (e) => typeof e == "function" || e in qd,
            },
            location: { type: String, default: "bottom" },
            origin: { type: String, default: "auto" },
            offset: [Number, String, Array],
        },
        "VOverlay-location-strategies"
    );
function Rp(e, t) {
    const n = le({}),
        l = le();
    Ve &&
        mn(
            () => !!(t.isActive.value && e.locationStrategy),
            (r) => {
                var o, i;
                ue(() => e.locationStrategy, r),
                    ct(() => {
                        window.removeEventListener("resize", a),
                            (l.value = void 0);
                    }),
                    window.addEventListener("resize", a, { passive: !0 }),
                    typeof e.locationStrategy == "function"
                        ? (l.value =
                              (o = e.locationStrategy(t, e, n)) == null
                                  ? void 0
                                  : o.updateLocation)
                        : (l.value =
                              (i = qd[e.locationStrategy](t, e, n)) == null
                                  ? void 0
                                  : i.updateLocation);
            }
        );
    function a(r) {
        var o;
        (o = l.value) == null || o.call(l, r);
    }
    return { contentStyles: n, updateLocation: l };
}
function Lp() {}
function Op(e, t) {
    t ? e.style.removeProperty("left") : e.style.removeProperty("right");
    const n = Wo(e);
    return (
        t
            ? (n.x += parseFloat(e.style.right || 0))
            : (n.x -= parseFloat(e.style.left || 0)),
        (n.y -= parseFloat(e.style.top || 0)),
        n
    );
}
function Fp(e, t, n) {
    (Array.isArray(e.target.value) || eg(e.target.value)) &&
        Object.assign(n.value, {
            position: "fixed",
            top: 0,
            [e.isRtl.value ? "right" : "left"]: 0,
        });
    const { preferredAnchor: a, preferredOrigin: r } = Xo(() => {
            const g = Wr(t.location, e.isRtl.value),
                m =
                    t.origin === "overlap"
                        ? g
                        : t.origin === "auto"
                        ? vr(g)
                        : Wr(t.origin, e.isRtl.value);
            return g.side === m.side && g.align === mr(m).align
                ? { preferredAnchor: ms(g), preferredOrigin: ms(m) }
                : { preferredAnchor: g, preferredOrigin: m };
        }),
        [o, i, s, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map(
            (g) =>
                S(() => {
                    const m = parseFloat(t[g]);
                    return isNaN(m) ? 1 / 0 : m;
                })
        ),
        c = S(() => {
            if (Array.isArray(t.offset)) return t.offset;
            if (typeof t.offset == "string") {
                const g = t.offset.split(" ").map(parseFloat);
                return g.length < 2 && g.push(0), g;
            }
            return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
        });
    let d = !1;
    const f = new ResizeObserver(() => {
        d && v();
    });
    ue(
        [e.target, e.contentEl],
        (g, m) => {
            let [p, C] = g,
                [x, _] = m;
            x && !Array.isArray(x) && f.unobserve(x),
                p && !Array.isArray(p) && f.observe(p),
                _ && f.unobserve(_),
                C && f.observe(C);
        },
        { immediate: !0 }
    ),
        ct(() => {
            f.disconnect();
        });
    function v() {
        if (
            ((d = !1),
            requestAnimationFrame(() => (d = !0)),
            !e.target.value || !e.contentEl.value)
        )
            return;
        const g = Wc(e.target.value),
            m = Op(e.contentEl.value, e.isRtl.value),
            p = Pa(e.contentEl.value),
            C = 12;
        p.length ||
            (p.push(document.documentElement),
            (e.contentEl.value.style.top && e.contentEl.value.style.left) ||
                ((m.x -= parseFloat(
                    document.documentElement.style.getPropertyValue(
                        "--v-body-scroll-x"
                    ) || 0
                )),
                (m.y -= parseFloat(
                    document.documentElement.style.getPropertyValue(
                        "--v-body-scroll-y"
                    ) || 0
                ))));
        const x = p.reduce((R, M) => {
            const B = M.getBoundingClientRect(),
                $ = new In({
                    x: M === document.documentElement ? 0 : B.x,
                    y: M === document.documentElement ? 0 : B.y,
                    width: M.clientWidth,
                    height: M.clientHeight,
                });
            return R
                ? new In({
                      x: Math.max(R.left, $.left),
                      y: Math.max(R.top, $.top),
                      width:
                          Math.min(R.right, $.right) - Math.max(R.left, $.left),
                      height:
                          Math.min(R.bottom, $.bottom) - Math.max(R.top, $.top),
                  })
                : $;
        }, void 0);
        (x.x += C), (x.y += C), (x.width -= C * 2), (x.height -= C * 2);
        let _ = { anchor: a.value, origin: r.value };
        function T(R) {
            const M = new In(m),
                B = qs(R.anchor, g),
                $ = qs(R.origin, M);
            let { x: Z, y: ee } = Ip(B, $);
            switch (R.anchor.side) {
                case "top":
                    ee -= c.value[0];
                    break;
                case "bottom":
                    ee += c.value[0];
                    break;
                case "left":
                    Z -= c.value[0];
                    break;
                case "right":
                    Z += c.value[0];
                    break;
            }
            switch (R.anchor.align) {
                case "top":
                    ee -= c.value[1];
                    break;
                case "bottom":
                    ee += c.value[1];
                    break;
                case "left":
                    Z -= c.value[1];
                    break;
                case "right":
                    Z += c.value[1];
                    break;
            }
            return (
                (M.x += Z),
                (M.y += ee),
                (M.width = Math.min(M.width, s.value)),
                (M.height = Math.min(M.height, u.value)),
                { overflows: gs(M, x), x: Z, y: ee }
            );
        }
        let k = 0,
            A = 0;
        const w = { x: 0, y: 0 },
            L = { x: !1, y: !1 };
        let E = -1;
        for (; !(E++ > 10); ) {
            const { x: R, y: M, overflows: B } = T(_);
            (k += R), (A += M), (m.x += R), (m.y += M);
            {
                const $ = hs(_.anchor),
                    Z = B.x.before || B.x.after,
                    ee = B.y.before || B.y.after;
                let ne = !1;
                if (
                    (["x", "y"].forEach((H) => {
                        if (
                            (H === "x" && Z && !L.x) ||
                            (H === "y" && ee && !L.y)
                        ) {
                            const X = {
                                    anchor: { ..._.anchor },
                                    origin: { ..._.origin },
                                },
                                F =
                                    H === "x"
                                        ? $ === "y"
                                            ? mr
                                            : vr
                                        : $ === "y"
                                        ? vr
                                        : mr;
                            (X.anchor = F(X.anchor)), (X.origin = F(X.origin));
                            const { overflows: z } = T(X);
                            ((z[H].before <= B[H].before &&
                                z[H].after <= B[H].after) ||
                                z[H].before + z[H].after <
                                    (B[H].before + B[H].after) / 2) &&
                                ((_ = X), (ne = L[H] = !0));
                        }
                    }),
                    ne)
                )
                    continue;
            }
            B.x.before && ((k += B.x.before), (m.x += B.x.before)),
                B.x.after && ((k -= B.x.after), (m.x -= B.x.after)),
                B.y.before && ((A += B.y.before), (m.y += B.y.before)),
                B.y.after && ((A -= B.y.after), (m.y -= B.y.after));
            {
                const $ = gs(m, x);
                (w.x = x.width - $.x.before - $.x.after),
                    (w.y = x.height - $.y.before - $.y.after),
                    (k += $.x.before),
                    (m.x += $.x.before),
                    (A += $.y.before),
                    (m.y += $.y.before);
            }
            break;
        }
        const V = hs(_.anchor);
        return (
            Object.assign(n.value, {
                "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
                transformOrigin: `${_.origin.side} ${_.origin.align}`,
                top: me(br(A)),
                left: e.isRtl.value ? void 0 : me(br(k)),
                right: e.isRtl.value ? me(br(-k)) : void 0,
                minWidth: me(V === "y" ? Math.min(o.value, g.width) : o.value),
                maxWidth: me(
                    Qs(Bt(w.x, o.value === 1 / 0 ? 0 : o.value, s.value))
                ),
                maxHeight: me(
                    Qs(Bt(w.y, i.value === 1 / 0 ? 0 : i.value, u.value))
                ),
            }),
            { available: w, contentBox: m }
        );
    }
    return (
        ue(
            () => [
                a.value,
                r.value,
                t.offset,
                t.minWidth,
                t.minHeight,
                t.maxWidth,
                t.maxHeight,
            ],
            () => v()
        ),
        Ge(() => {
            const g = v();
            if (!g) return;
            const { available: m, contentBox: p } = g;
            p.height > m.y &&
                requestAnimationFrame(() => {
                    v(),
                        requestAnimationFrame(() => {
                            v();
                        });
                });
        }),
        { updateLocation: v }
    );
}
function br(e) {
    return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Qs(e) {
    return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let to = !0;
const Fa = [];
function Bp(e) {
    !to || Fa.length ? (Fa.push(e), no()) : ((to = !1), e(), no());
}
let Zs = -1;
function no() {
    cancelAnimationFrame(Zs),
        (Zs = requestAnimationFrame(() => {
            const e = Fa.shift();
            e && e(), Fa.length ? no() : (to = !0);
        }));
}
const ya = { none: null, close: Np, block: $p, reposition: Gp },
    Dp = q(
        {
            scrollStrategy: {
                type: [String, Function],
                default: "block",
                validator: (e) => typeof e == "function" || e in ya,
            },
        },
        "VOverlay-scroll-strategies"
    );
function Hp(e, t) {
    if (!Ve) return;
    let n;
    mt(async () => {
        n == null || n.stop(),
            t.isActive.value &&
                e.scrollStrategy &&
                ((n = mo()),
                await new Promise((l) => setTimeout(l)),
                n.active &&
                    n.run(() => {
                        var l;
                        typeof e.scrollStrategy == "function"
                            ? e.scrollStrategy(t, e, n)
                            : (l = ya[e.scrollStrategy]) == null ||
                              l.call(ya, t, e, n);
                    }));
    }),
        ct(() => {
            n == null || n.stop();
        });
}
function Np(e) {
    function t(n) {
        e.isActive.value = !1;
    }
    Qd(e.targetEl.value ?? e.contentEl.value, t);
}
function $p(e, t) {
    var o;
    const n = (o = e.root.value) == null ? void 0 : o.offsetParent,
        l = [
            ...new Set([
                ...Pa(e.targetEl.value, t.contained ? n : void 0),
                ...Pa(e.contentEl.value, t.contained ? n : void 0),
            ]),
        ].filter((i) => !i.classList.contains("v-overlay-scroll-blocked")),
        a = window.innerWidth - document.documentElement.offsetWidth,
        r = ((i) => Yo(i) && i)(n || document.documentElement);
    r && e.root.value.classList.add("v-overlay--scroll-blocked"),
        l.forEach((i, s) => {
            i.style.setProperty("--v-body-scroll-x", me(-i.scrollLeft)),
                i.style.setProperty("--v-body-scroll-y", me(-i.scrollTop)),
                i !== document.documentElement &&
                    i.style.setProperty("--v-scrollbar-offset", me(a)),
                i.classList.add("v-overlay-scroll-blocked");
        }),
        ct(() => {
            l.forEach((i, s) => {
                const u = parseFloat(
                        i.style.getPropertyValue("--v-body-scroll-x")
                    ),
                    c = parseFloat(
                        i.style.getPropertyValue("--v-body-scroll-y")
                    ),
                    d = i.style.scrollBehavior;
                (i.style.scrollBehavior = "auto"),
                    i.style.removeProperty("--v-body-scroll-x"),
                    i.style.removeProperty("--v-body-scroll-y"),
                    i.style.removeProperty("--v-scrollbar-offset"),
                    i.classList.remove("v-overlay-scroll-blocked"),
                    (i.scrollLeft = -u),
                    (i.scrollTop = -c),
                    (i.style.scrollBehavior = d);
            }),
                r && e.root.value.classList.remove("v-overlay--scroll-blocked");
        });
}
function Gp(e, t, n) {
    let l = !1,
        a = -1,
        r = -1;
    function o(i) {
        Bp(() => {
            var c, d;
            const s = performance.now();
            (d = (c = e.updateLocation).value) == null || d.call(c, i),
                (l = (performance.now() - s) / (1e3 / 60) > 2);
        });
    }
    (r = (typeof requestIdleCallback > "u" ? (i) => i() : requestIdleCallback)(
        () => {
            n.run(() => {
                Qd(e.targetEl.value ?? e.contentEl.value, (i) => {
                    l
                        ? (cancelAnimationFrame(a),
                          (a = requestAnimationFrame(() => {
                              a = requestAnimationFrame(() => {
                                  o(i);
                              });
                          })))
                        : o(i);
                });
            });
        }
    )),
        ct(() => {
            typeof cancelIdleCallback < "u" && cancelIdleCallback(r),
                cancelAnimationFrame(a);
        });
}
function Qd(e, t) {
    const n = [document, ...Pa(e)];
    n.forEach((l) => {
        l.addEventListener("scroll", t, { passive: !0 });
    }),
        ct(() => {
            n.forEach((l) => {
                l.removeEventListener("scroll", t);
            });
        });
}
const lo = Symbol.for("vuetify:v-menu"),
    zp = q(
        { closeDelay: [Number, String], openDelay: [Number, String] },
        "delay"
    );
function Xp(e, t) {
    let n = () => {};
    function l(o) {
        n == null || n();
        const i = Number(o ? e.openDelay : e.closeDelay);
        return new Promise((s) => {
            n = Sh(i, () => {
                t == null || t(o), s(o);
            });
        });
    }
    function a() {
        return l(!0);
    }
    function r() {
        return l(!1);
    }
    return { clearDelay: n, runOpenDelay: a, runCloseDelay: r };
}
const jp = q(
    {
        target: [String, Object],
        activator: [String, Object],
        activatorProps: { type: Object, default: () => ({}) },
        openOnClick: { type: Boolean, default: void 0 },
        openOnHover: Boolean,
        openOnFocus: { type: Boolean, default: void 0 },
        closeOnContentClick: Boolean,
        ...zp(),
    },
    "VOverlay-activator"
);
function Wp(e, t) {
    let { isActive: n, isTop: l } = t;
    const a = je("useActivator"),
        r = le();
    let o = !1,
        i = !1,
        s = !0;
    const u = S(
            () => e.openOnFocus || (e.openOnFocus == null && e.openOnHover)
        ),
        c = S(
            () =>
                e.openOnClick ||
                (e.openOnClick == null && !e.openOnHover && !u.value)
        ),
        { runOpenDelay: d, runCloseDelay: f } = Xp(e, (w) => {
            w === ((e.openOnHover && o) || (u.value && i)) &&
                !(e.openOnHover && n.value && !l.value) &&
                (n.value !== w && (s = !0), (n.value = w));
        }),
        v = le(),
        g = {
            onClick: (w) => {
                w.stopPropagation(),
                    (r.value = w.currentTarget || w.target),
                    n.value || (v.value = [w.clientX, w.clientY]),
                    (n.value = !n.value);
            },
            onMouseenter: (w) => {
                var L;
                ((L = w.sourceCapabilities) != null && L.firesTouchEvents) ||
                    ((o = !0), (r.value = w.currentTarget || w.target), d());
            },
            onMouseleave: (w) => {
                (o = !1), f();
            },
            onFocus: (w) => {
                el(w.target, ":focus-visible") !== !1 &&
                    ((i = !0),
                    w.stopPropagation(),
                    (r.value = w.currentTarget || w.target),
                    d());
            },
            onBlur: (w) => {
                (i = !1), w.stopPropagation(), f();
            },
        },
        m = S(() => {
            const w = {};
            return (
                c.value && (w.onClick = g.onClick),
                e.openOnHover &&
                    ((w.onMouseenter = g.onMouseenter),
                    (w.onMouseleave = g.onMouseleave)),
                u.value && ((w.onFocus = g.onFocus), (w.onBlur = g.onBlur)),
                w
            );
        }),
        p = S(() => {
            const w = {};
            if (
                (e.openOnHover &&
                    ((w.onMouseenter = () => {
                        (o = !0), d();
                    }),
                    (w.onMouseleave = () => {
                        (o = !1), f();
                    })),
                u.value &&
                    ((w.onFocusin = () => {
                        (i = !0), d();
                    }),
                    (w.onFocusout = () => {
                        (i = !1), f();
                    })),
                e.closeOnContentClick)
            ) {
                const L = Pe(lo, null);
                w.onClick = () => {
                    (n.value = !1), L == null || L.closeParents();
                };
            }
            return w;
        }),
        C = S(() => {
            const w = {};
            return (
                e.openOnHover &&
                    ((w.onMouseenter = () => {
                        s && ((o = !0), (s = !1), d());
                    }),
                    (w.onMouseleave = () => {
                        (o = !1), f();
                    })),
                w
            );
        });
    ue(l, (w) => {
        w &&
            ((e.openOnHover && !o && (!u.value || !i)) ||
                (u.value && !i && (!e.openOnHover || !o))) &&
            (n.value = !1);
    }),
        ue(
            n,
            (w) => {
                w ||
                    setTimeout(() => {
                        v.value = void 0;
                    });
            },
            { flush: "post" }
        );
    const x = jr();
    mt(() => {
        x.value &&
            Ge(() => {
                r.value = x.el;
            });
    });
    const _ = jr(),
        T = S(() =>
            e.target === "cursor" && v.value
                ? v.value
                : _.value
                ? _.el
                : Zd(e.target, a) || r.value
        ),
        k = S(() => (Array.isArray(T.value) ? void 0 : T.value));
    let A;
    return (
        ue(
            () => !!e.activator,
            (w) => {
                w && Ve
                    ? ((A = mo()),
                      A.run(() => {
                          Up(e, a, { activatorEl: r, activatorEvents: m });
                      }))
                    : A && A.stop();
            },
            { flush: "post", immediate: !0 }
        ),
        ct(() => {
            A == null || A.stop();
        }),
        {
            activatorEl: r,
            activatorRef: x,
            target: T,
            targetEl: k,
            targetRef: _,
            activatorEvents: m,
            contentEvents: p,
            scrimEvents: C,
        }
    );
}
function Up(e, t, n) {
    let { activatorEl: l, activatorEvents: a } = n;
    ue(
        () => e.activator,
        (s, u) => {
            if (u && s !== u) {
                const c = i(u);
                c && o(c);
            }
            s && Ge(() => r());
        },
        { immediate: !0 }
    ),
        ue(
            () => e.activatorProps,
            () => {
                r();
            }
        ),
        ct(() => {
            o();
        });
    function r() {
        let s =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : i(),
            u =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : e.activatorProps;
        s && wh(s, ke(a.value, u));
    }
    function o() {
        let s =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : i(),
            u =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : e.activatorProps;
        s && Ah(s, ke(a.value, u));
    }
    function i() {
        let s =
            arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : e.activator;
        const u = Zd(s, t);
        return (
            (l.value =
                (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE
                    ? u
                    : void 0),
            l.value
        );
    }
}
function Zd(e, t) {
    var l, a;
    if (!e) return;
    let n;
    if (e === "parent") {
        let r =
            (a = (l = t == null ? void 0 : t.proxy) == null ? void 0 : l.$el) ==
            null
                ? void 0
                : a.parentNode;
        for (; r != null && r.hasAttribute("data-no-activator"); )
            r = r.parentNode;
        n = r;
    } else
        typeof e == "string"
            ? (n = document.querySelector(e))
            : "$el" in e
            ? (n = e.$el)
            : (n = e);
    return n;
}
function Kp() {
    if (!Ve) return oe(!1);
    const { ssr: e } = qo();
    if (e) {
        const t = oe(!1);
        return (
            Qt(() => {
                t.value = !0;
            }),
            t
        );
    } else return oe(!0);
}
const Yp = q({ eager: Boolean }, "lazy");
function qp(e, t) {
    const n = oe(!1),
        l = S(() => n.value || e.eager || t.value);
    ue(t, () => (n.value = !0));
    function a() {
        e.eager || (n.value = !1);
    }
    return { isBooted: n, hasContent: l, onAfterLeave: a };
}
function Jd() {
    const t = je("useScopeId").vnode.scopeId;
    return { scopeId: t ? { [t]: "" } : void 0 };
}
const Js = Symbol.for("vuetify:stack"),
    bl = Ze([]);
function Qp(e, t, n) {
    const l = je("useStack"),
        a = !n,
        r = Pe(Js, void 0),
        o = Ze({ activeChildren: new Set() });
    qe(Js, o);
    const i = oe(+t.value);
    mn(e, () => {
        var d;
        const c = (d = bl.at(-1)) == null ? void 0 : d[1];
        (i.value = c ? c + 10 : +t.value),
            a && bl.push([l.uid, i.value]),
            r == null || r.activeChildren.add(l.uid),
            ct(() => {
                if (a) {
                    const f = ye(bl).findIndex((v) => v[0] === l.uid);
                    bl.splice(f, 1);
                }
                r == null || r.activeChildren.delete(l.uid);
            });
    });
    const s = oe(!0);
    a &&
        mt(() => {
            var d;
            const c = ((d = bl.at(-1)) == null ? void 0 : d[0]) === l.uid;
            setTimeout(() => (s.value = c));
        });
    const u = S(() => !o.activeChildren.size);
    return {
        globalTop: ul(s),
        localTop: u,
        stackStyles: S(() => ({ zIndex: i.value })),
    };
}
function Zp(e) {
    return {
        teleportTarget: S(() => {
            const n = e.value;
            if (n === !0 || !Ve) return;
            const l =
                n === !1
                    ? document.body
                    : typeof n == "string"
                    ? document.querySelector(n)
                    : n;
            if (l == null) return;
            let a = l.querySelector(":scope > .v-overlay-container");
            return (
                a ||
                    ((a = document.createElement("div")),
                    (a.className = "v-overlay-container"),
                    l.appendChild(a)),
                a
            );
        }),
    };
}
function Jp() {
    return !0;
}
function ef(e, t, n) {
    if (!e || tf(e, n) === !1) return !1;
    const l = Jc(t);
    if (
        typeof ShadowRoot < "u" &&
        l instanceof ShadowRoot &&
        l.host === e.target
    )
        return !1;
    const a = ((typeof n.value == "object" && n.value.include) || (() => []))();
    return (
        a.push(t), !a.some((r) => (r == null ? void 0 : r.contains(e.target)))
    );
}
function tf(e, t) {
    return ((typeof t.value == "object" && t.value.closeConditional) || Jp)(e);
}
function e0(e, t, n) {
    const l = typeof n.value == "function" ? n.value : n.value.handler;
    t._clickOutside.lastMousedownWasOutside &&
        ef(e, t, n) &&
        setTimeout(() => {
            tf(e, n) && l && l(e);
        }, 0);
}
function eu(e, t) {
    const n = Jc(e);
    t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const t0 = {
    mounted(e, t) {
        const n = (a) => e0(a, e, t),
            l = (a) => {
                e._clickOutside.lastMousedownWasOutside = ef(a, e, t);
            };
        eu(e, (a) => {
            a.addEventListener("click", n, !0),
                a.addEventListener("mousedown", l, !0);
        }),
            e._clickOutside ||
                (e._clickOutside = { lastMousedownWasOutside: !1 }),
            (e._clickOutside[t.instance.$.uid] = {
                onClick: n,
                onMousedown: l,
            });
    },
    unmounted(e, t) {
        e._clickOutside &&
            (eu(e, (n) => {
                var r;
                if (
                    !n ||
                    !((r = e._clickOutside) != null && r[t.instance.$.uid])
                )
                    return;
                const { onClick: l, onMousedown: a } =
                    e._clickOutside[t.instance.$.uid];
                n.removeEventListener("click", l, !0),
                    n.removeEventListener("mousedown", a, !0);
            }),
            delete e._clickOutside[t.instance.$.uid]);
    },
};
function n0(e) {
    const { modelValue: t, color: n, ...l } = e;
    return h(
        Yt,
        { name: "fade-transition", appear: !0 },
        {
            default: () => [
                e.modelValue &&
                    h(
                        "div",
                        ke(
                            {
                                class: [
                                    "v-overlay__scrim",
                                    e.color.backgroundColorClasses.value,
                                ],
                                style: e.color.backgroundColorStyles.value,
                            },
                            l
                        ),
                        null
                    ),
            ],
        }
    );
}
const nf = q(
        {
            absolute: Boolean,
            attach: [Boolean, String, Object],
            closeOnBack: { type: Boolean, default: !0 },
            contained: Boolean,
            contentClass: null,
            contentProps: null,
            disabled: Boolean,
            opacity: [Number, String],
            noClickAnimation: Boolean,
            modelValue: Boolean,
            persistent: Boolean,
            scrim: { type: [Boolean, String], default: !0 },
            zIndex: { type: [Number, String], default: 2e3 },
            ...jp(),
            ...Ae(),
            ...Ht(),
            ...Yp(),
            ...Vp(),
            ...Dp(),
            ...We(),
            ...fl(),
        },
        "VOverlay"
    ),
    tu = de()({
        name: "VOverlay",
        directives: { ClickOutside: t0 },
        inheritAttrs: !1,
        props: { _disableGlobalStack: Boolean, ...nf() },
        emits: {
            "click:outside": (e) => !0,
            "update:modelValue": (e) => !0,
            afterEnter: () => !0,
            afterLeave: () => !0,
        },
        setup(e, t) {
            let { slots: n, attrs: l, emit: a } = t;
            const r = Be(e, "modelValue"),
                o = S({
                    get: () => r.value,
                    set: (ae) => {
                        (ae && e.disabled) || (r.value = ae);
                    },
                }),
                { themeClasses: i } = Qe(e),
                { rtlClasses: s, isRtl: u } = Zt(),
                { hasContent: c, onAfterLeave: d } = qp(e, o),
                f = Ut(S(() => (typeof e.scrim == "string" ? e.scrim : null))),
                {
                    globalTop: v,
                    localTop: g,
                    stackStyles: m,
                } = Qp(o, ce(e, "zIndex"), e._disableGlobalStack),
                {
                    activatorEl: p,
                    activatorRef: C,
                    target: x,
                    targetEl: _,
                    targetRef: T,
                    activatorEvents: k,
                    contentEvents: A,
                    scrimEvents: w,
                } = Wp(e, { isActive: o, isTop: g }),
                L = S(() => {
                    var ae;
                    return (ae = p == null ? void 0 : p.value) == null
                        ? void 0
                        : ae.getRootNode();
                }),
                { teleportTarget: E } = Zp(
                    S(() =>
                        e.attach || e.contained || L.value instanceof ShadowRoot
                            ? L.value
                            : !1
                    )
                ),
                { dimensionStyles: V } = Nt(e),
                R = Kp(),
                { scopeId: M } = Jd();
            ue(
                () => e.disabled,
                (ae) => {
                    ae && (o.value = !1);
                }
            );
            const B = le(),
                $ = le(),
                Z = le(),
                { contentStyles: ee, updateLocation: ne } = Rp(e, {
                    isRtl: u,
                    contentEl: Z,
                    target: x,
                    isActive: o,
                });
            Hp(e, {
                root: B,
                contentEl: Z,
                targetEl: _,
                isActive: o,
                updateLocation: ne,
            });
            function H(ae) {
                a("click:outside", ae), e.persistent ? ie() : (o.value = !1);
            }
            function X(ae) {
                return (
                    o.value && v.value && (!e.scrim || ae.target === $.value)
                );
            }
            Ve &&
                ue(
                    o,
                    (ae) => {
                        ae
                            ? window.addEventListener("keydown", F)
                            : window.removeEventListener("keydown", F);
                    },
                    { immediate: !0 }
                ),
                ht(() => {
                    Ve && window.removeEventListener("keydown", F);
                });
            function F(ae) {
                var I, W;
                ae.key === "Escape" &&
                    v.value &&
                    (e.persistent
                        ? ie()
                        : ((o.value = !1),
                          (I = Z.value) != null &&
                              I.contains(document.activeElement) &&
                              ((W = p.value) == null || W.focus())));
            }
            const z = Yy();
            mn(
                () => e.closeOnBack,
                () => {
                    qy(z, (ae) => {
                        v.value && o.value
                            ? (ae(!1), e.persistent ? ie() : (o.value = !1))
                            : ae();
                    });
                }
            );
            const J = le();
            ue(
                () => o.value && (e.absolute || e.contained) && E.value == null,
                (ae) => {
                    if (ae) {
                        const I = ed(B.value);
                        I &&
                            I !== document.scrollingElement &&
                            (J.value = I.scrollTop);
                    }
                }
            );
            function ie() {
                e.noClickAnimation ||
                    (Z.value &&
                        Xn(
                            Z.value,
                            [
                                { transformOrigin: "center" },
                                { transform: "scale(1.03)" },
                                { transformOrigin: "center" },
                            ],
                            { duration: 150, easing: Ta }
                        ));
            }
            function pe() {
                a("afterEnter");
            }
            function Ce() {
                d(), a("afterLeave");
            }
            return (
                Se(() => {
                    var ae;
                    return h(we, null, [
                        (ae = n.activator) == null
                            ? void 0
                            : ae.call(n, {
                                  isActive: o.value,
                                  targetRef: T,
                                  props: ke(
                                      { ref: C },
                                      k.value,
                                      e.activatorProps
                                  ),
                              }),
                        R.value &&
                            c.value &&
                            h(
                                km,
                                { disabled: !E.value, to: E.value },
                                {
                                    default: () => [
                                        h(
                                            "div",
                                            ke(
                                                {
                                                    class: [
                                                        "v-overlay",
                                                        {
                                                            "v-overlay--absolute":
                                                                e.absolute ||
                                                                e.contained,
                                                            "v-overlay--active":
                                                                o.value,
                                                            "v-overlay--contained":
                                                                e.contained,
                                                        },
                                                        i.value,
                                                        s.value,
                                                        e.class,
                                                    ],
                                                    style: [
                                                        m.value,
                                                        {
                                                            "--v-overlay-opacity":
                                                                e.opacity,
                                                            top: me(J.value),
                                                        },
                                                        e.style,
                                                    ],
                                                    ref: B,
                                                },
                                                M,
                                                l
                                            ),
                                            [
                                                h(
                                                    n0,
                                                    ke(
                                                        {
                                                            color: f,
                                                            modelValue:
                                                                o.value &&
                                                                !!e.scrim,
                                                            ref: $,
                                                        },
                                                        w.value
                                                    ),
                                                    null
                                                ),
                                                h(
                                                    cn,
                                                    {
                                                        appear: !0,
                                                        persisted: !0,
                                                        transition:
                                                            e.transition,
                                                        target: x.value,
                                                        onAfterEnter: pe,
                                                        onAfterLeave: Ce,
                                                    },
                                                    {
                                                        default: () => {
                                                            var I;
                                                            return [
                                                                ut(
                                                                    h(
                                                                        "div",
                                                                        ke(
                                                                            {
                                                                                ref: Z,
                                                                                class: [
                                                                                    "v-overlay__content",
                                                                                    e.contentClass,
                                                                                ],
                                                                                style: [
                                                                                    V.value,
                                                                                    ee.value,
                                                                                ],
                                                                            },
                                                                            A.value,
                                                                            e.contentProps
                                                                        ),
                                                                        [
                                                                            (I =
                                                                                n.default) ==
                                                                            null
                                                                                ? void 0
                                                                                : I.call(
                                                                                      n,
                                                                                      {
                                                                                          isActive:
                                                                                              o,
                                                                                      }
                                                                                  ),
                                                                        ]
                                                                    ),
                                                                    [
                                                                        [
                                                                            Ln,
                                                                            o.value,
                                                                        ],
                                                                        [
                                                                            Rn(
                                                                                "click-outside"
                                                                            ),
                                                                            {
                                                                                handler:
                                                                                    H,
                                                                                closeConditional:
                                                                                    X,
                                                                                include:
                                                                                    () => [
                                                                                        p.value,
                                                                                    ],
                                                                            },
                                                                        ],
                                                                    ]
                                                                ),
                                                            ];
                                                        },
                                                    }
                                                ),
                                            ]
                                        ),
                                    ],
                                }
                            ),
                    ]);
                }),
                {
                    activatorEl: p,
                    scrimEl: $,
                    target: x,
                    animateClick: ie,
                    contentEl: Z,
                    globalTop: v,
                    localTop: g,
                    updateLocation: ne,
                }
            );
        },
    }),
    Sr = Symbol("Forwarded refs");
function Cr(e, t) {
    let n = e;
    for (; n; ) {
        const l = Reflect.getOwnPropertyDescriptor(n, t);
        if (l) return l;
        n = Object.getPrototypeOf(n);
    }
}
function Ja(e) {
    for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1;
        l < t;
        l++
    )
        n[l - 1] = arguments[l];
    return (
        (e[Sr] = n),
        new Proxy(e, {
            get(a, r) {
                if (Reflect.has(a, r)) return Reflect.get(a, r);
                if (
                    !(
                        typeof r == "symbol" ||
                        r.startsWith("$") ||
                        r.startsWith("__")
                    )
                ) {
                    for (const o of n)
                        if (o.value && Reflect.has(o.value, r)) {
                            const i = Reflect.get(o.value, r);
                            return typeof i == "function" ? i.bind(o.value) : i;
                        }
                }
            },
            has(a, r) {
                if (Reflect.has(a, r)) return !0;
                if (
                    typeof r == "symbol" ||
                    r.startsWith("$") ||
                    r.startsWith("__")
                )
                    return !1;
                for (const o of n)
                    if (o.value && Reflect.has(o.value, r)) return !0;
                return !1;
            },
            set(a, r, o) {
                if (Reflect.has(a, r)) return Reflect.set(a, r, o);
                if (
                    typeof r == "symbol" ||
                    r.startsWith("$") ||
                    r.startsWith("__")
                )
                    return !1;
                for (const i of n)
                    if (i.value && Reflect.has(i.value, r))
                        return Reflect.set(i.value, r, o);
                return !1;
            },
            getOwnPropertyDescriptor(a, r) {
                var i;
                const o = Reflect.getOwnPropertyDescriptor(a, r);
                if (o) return o;
                if (
                    !(
                        typeof r == "symbol" ||
                        r.startsWith("$") ||
                        r.startsWith("__")
                    )
                ) {
                    for (const s of n) {
                        if (!s.value) continue;
                        const u =
                            Cr(s.value, r) ??
                            ("_" in s.value
                                ? Cr(
                                      (i = s.value._) == null
                                          ? void 0
                                          : i.setupState,
                                      r
                                  )
                                : void 0);
                        if (u) return u;
                    }
                    for (const s of n) {
                        const u = s.value && s.value[Sr];
                        if (!u) continue;
                        const c = u.slice();
                        for (; c.length; ) {
                            const d = c.shift(),
                                f = Cr(d.value, r);
                            if (f) return f;
                            const v = d.value && d.value[Sr];
                            v && c.push(...v);
                        }
                    }
                }
            },
        })
    );
}
const l0 = q(
        {
            id: String,
            ...On(
                nf({
                    closeDelay: 250,
                    closeOnContentClick: !0,
                    locationStrategy: "connected",
                    openDelay: 300,
                    scrim: !1,
                    scrollStrategy: "reposition",
                    transition: { component: hd },
                }),
                ["absolute"]
            ),
        },
        "VMenu"
    ),
    di = de()({
        name: "VMenu",
        props: l0(),
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { slots: n } = t;
            const l = Be(e, "modelValue"),
                { scopeId: a } = Jd(),
                r = Tt(),
                o = S(() => e.id || `v-menu-${r}`),
                i = le(),
                s = Pe(lo, null),
                u = oe(0);
            qe(lo, {
                register() {
                    ++u.value;
                },
                unregister() {
                    --u.value;
                },
                closeParents(m) {
                    setTimeout(() => {
                        !u.value &&
                            !e.persistent &&
                            (m == null || (m && !Ch(m, i.value.contentEl))) &&
                            ((l.value = !1), s == null || s.closeParents());
                    }, 40);
                },
            });
            async function c(m) {
                var x, _, T;
                const p = m.relatedTarget,
                    C = m.target;
                await Ge(),
                    l.value &&
                        p !== C &&
                        (x = i.value) != null &&
                        x.contentEl &&
                        (_ = i.value) != null &&
                        _.globalTop &&
                        ![document, i.value.contentEl].includes(C) &&
                        !i.value.contentEl.contains(C) &&
                        ((T = xa(i.value.contentEl)[0]) == null || T.focus());
            }
            ue(l, (m) => {
                m
                    ? (s == null || s.register(),
                      document.addEventListener("focusin", c, { once: !0 }))
                    : (s == null || s.unregister(),
                      document.removeEventListener("focusin", c));
            });
            function d(m) {
                s == null || s.closeParents(m);
            }
            function f(m) {
                var p, C, x;
                if (!e.disabled)
                    if (
                        m.key === "Tab" ||
                        (m.key === "Enter" && !e.closeOnContentClick)
                    ) {
                        if (
                            m.key === "Enter" &&
                            (m.target instanceof HTMLTextAreaElement ||
                                (m.target instanceof HTMLInputElement &&
                                    m.target.closest("form")))
                        )
                            return;
                        m.key === "Enter" && m.preventDefault(),
                            Xc(
                                xa(
                                    (p = i.value) == null
                                        ? void 0
                                        : p.contentEl,
                                    !1
                                ),
                                m.shiftKey ? "prev" : "next",
                                (T) => T.tabIndex >= 0
                            ) ||
                                ((l.value = !1),
                                (x =
                                    (C = i.value) == null
                                        ? void 0
                                        : C.activatorEl) == null || x.focus());
                    } else
                        ["Enter", " "].includes(m.key) &&
                            e.closeOnContentClick &&
                            ((l.value = !1), s == null || s.closeParents());
            }
            function v(m) {
                var C;
                if (e.disabled) return;
                const p = (C = i.value) == null ? void 0 : C.contentEl;
                p && l.value
                    ? m.key === "ArrowDown"
                        ? (m.preventDefault(), Ma(p, "next"))
                        : m.key === "ArrowUp" &&
                          (m.preventDefault(), Ma(p, "prev"))
                    : ["ArrowDown", "ArrowUp"].includes(m.key) &&
                      ((l.value = !0),
                      m.preventDefault(),
                      setTimeout(() => setTimeout(() => v(m))));
            }
            const g = S(() =>
                ke(
                    {
                        "aria-haspopup": "menu",
                        "aria-expanded": String(l.value),
                        "aria-owns": o.value,
                        onKeydown: v,
                    },
                    e.activatorProps
                )
            );
            return (
                Se(() => {
                    const m = tu.filterProps(e);
                    return h(
                        tu,
                        ke(
                            {
                                ref: i,
                                id: o.value,
                                class: ["v-menu", e.class],
                                style: e.style,
                            },
                            m,
                            {
                                modelValue: l.value,
                                "onUpdate:modelValue": (p) => (l.value = p),
                                absolute: !0,
                                activatorProps: g.value,
                                "onClick:outside": d,
                                onKeydown: f,
                            },
                            a
                        ),
                        {
                            activator: n.activator,
                            default: function () {
                                for (
                                    var p = arguments.length,
                                        C = new Array(p),
                                        x = 0;
                                    x < p;
                                    x++
                                )
                                    C[x] = arguments[x];
                                return h(
                                    Fe,
                                    { root: "VMenu" },
                                    {
                                        default: () => {
                                            var _;
                                            return [
                                                (_ = n.default) == null
                                                    ? void 0
                                                    : _.call(n, ...C),
                                            ];
                                        },
                                    }
                                );
                            },
                        }
                    );
                }),
                Ja({ id: o, ΨopenChildren: u }, i)
            );
        },
    }),
    a0 = (e) => (_o("data-v-37deb6c9"), (e = e()), xo(), e),
    r0 = { class: "box" },
    o0 = { class: "holder" },
    i0 = a0(() => Ie("div", { class: "data" }, "Cars Scraping Project", -1)),
    s0 = { class: "data data2" },
    u0 = {
        __name: "NavBar",
        props: { page: Number },
        setup(e) {
            const t = e,
                n = [
                    {
                        title: "Reload Page",
                        onClick: () => {
                            Of.go(0);
                        },
                        icon: "mdi-restart",
                    },
                ];
            return (l, a) => (
                Ke(),
                Yn(
                    Oy,
                    { class: "container", elevation: 2 },
                    {
                        default: Ye(() => [
                            Ie("div", r0, [
                                Ie("div", o0, [
                                    i0,
                                    h(ap),
                                    Ie("div", s0, "Page " + wl(t.page), 1),
                                    h(di, null, {
                                        activator: Ye(({ props: r }) => [
                                            h(
                                                qn,
                                                ke(
                                                    {
                                                        icon: "mdi-dots-vertical",
                                                    },
                                                    r
                                                ),
                                                null,
                                                16
                                            ),
                                        ]),
                                        default: Ye(() => [
                                            h(
                                                ci,
                                                { class: "list" },
                                                {
                                                    default: Ye(() => [
                                                        (Ke(),
                                                        _t(
                                                            we,
                                                            null,
                                                            Lr(n, (r, o) =>
                                                                h(
                                                                    qn,
                                                                    {
                                                                        "prepend-icon":
                                                                            r.icon,
                                                                        onClick:
                                                                            r.onClick,
                                                                        key: o,
                                                                        class: "button",
                                                                        variant:
                                                                            "text",
                                                                    },
                                                                    {
                                                                        default:
                                                                            Ye(
                                                                                () => [
                                                                                    jt(
                                                                                        wl(
                                                                                            r.title
                                                                                        ),
                                                                                        1
                                                                                    ),
                                                                                ]
                                                                            ),
                                                                        _: 2,
                                                                    },
                                                                    1032,
                                                                    [
                                                                        "prepend-icon",
                                                                        "onClick",
                                                                    ]
                                                                )
                                                            ),
                                                            64
                                                        )),
                                                    ]),
                                                    _: 1,
                                                }
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                ]),
                            ]),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    },
    c0 = Zo(u0, [["__scopeId", "data-v-37deb6c9"]]),
    kr = [
        { make: "AC", models: ["All Models", "428", "Aceca", "Shelby Cobra"] },
        {
            make: "Acura",
            models: [
                "All Models",
                "CL",
                "ILX",
                "ILX Hybrid",
                "Integra",
                "Legend",
                "MDX",
                "MDX Sport Hybrid",
                "NSX",
                "RDX",
                "RL",
                "RLX",
                "RLX Sport Hybrid",
                "RSX",
                "TL",
                "TLX",
                "TSX",
                "ZDX",
            ],
        },
        {
            make: "Alfa Romeo",
            models: [
                "All Models",
                "164",
                "1750",
                "1900",
                "2000",
                "2600",
                "4C",
                "4C Spider",
                "8c Competizione",
                "Alfetta",
                "GTV",
                "Giulia",
                "Giulietta",
                "Montreal",
                "Spider",
                "Sprint",
                "Stelvio",
                "Tonale",
            ],
        },
        { make: "Am General", models: ["All Models", "Hummer"] },
        {
            make: "American Motors",
            models: [
                "All Models",
                "Ambassador",
                "Classic",
                "Encore",
                "Hornet",
                "Marlin",
                "Matador",
                "Rambler",
                "Rogue",
            ],
        },
        {
            make: "Aston Martin",
            models: [
                "All Models",
                "DB AR1 Zagato",
                "DB11",
                "DB12",
                "DB2/4",
                "DB4",
                "DB6",
                "DB7",
                "DB7 Vantage",
                "DB9",
                "DBS",
                "DBX",
                "Lagonda",
                "Rapide",
                "Rapide S",
                "V12 Vanquish",
                "V12 Vantage",
                "V12 Vantage S",
                "V8 Vantage",
                "V8 Vantage S",
                "Vanquish",
                "Vantage",
                "Vantage GT",
                "Virage",
                "Volante",
                "Zagato",
            ],
        },
        {
            make: "Auburn",
            models: [
                "All Models",
                "Model A",
                "Model B",
                "Model H",
                "Model L",
                "Model S",
                "Model T",
                "Model X",
                "Model Y",
            ],
        },
        {
            make: "Audi",
            models: [
                "All Models",
                "100",
                "200",
                "A3",
                "A3 e-tron",
                "A4",
                "A4 allroad",
                "A5",
                "A5 Sportback",
                "A6",
                "A6 allroad",
                "A7",
                "A7 e",
                "A8",
                "A8 e",
                "Cabriolet",
                "GT",
                "Q3",
                "Q4 e-tron",
                "Q4 e-tron Sportback",
                "Q5",
                "Q5 Sportback",
                "Q5 e",
                "Q5 hybrid",
                "Q7",
                "Q8",
                "Q8 e-tron",
                "Q8 e-tron Sportback",
                "R8",
                "RS 3",
                "RS 4",
                "RS 5",
                "RS 6 Avant",
                "RS 7",
                "RS Q8",
                "RS e-tron GT",
                "RS6",
                "S3",
                "S4",
                "S5",
                "S6",
                "S7",
                "S8",
                "SQ5",
                "SQ5 Sportback",
                "SQ7",
                "SQ8",
                "SQ8 e-tron",
                "TT",
                "TT RS",
                "TTS",
                "allroad",
                "e-tron",
                "e-tron GT",
                "e-tron S",
                "e-tron S Sportback",
                "e-tron Sportback",
            ],
        },
        { make: "Austin", models: ["All Models", "Cooper", "Mini"] },
        {
            make: "Austin-Healey",
            models: [
                "All Models",
                "100",
                "100-6",
                "100M",
                "3000",
                "3000 Mk II",
                "3000 Mk III",
                "Sprite",
            ],
        },
        {
            make: "Avanti Motors",
            models: ["All Models", "Avanti", "Avanti II"],
        },
        {
            make: "BMW",
            models: [
                "All Models",
                "1 Series M",
                "128",
                "135",
                "1500",
                "1600",
                "1800",
                "2000",
                "2002",
                "228",
                "228 Gran Coupe",
                "230",
                "2500",
                "2600",
                "3",
                "318",
                "320",
                "3200",
                "323",
                "325",
                "328",
                "328 Gran Turismo",
                "328d",
                "330",
                "330 Gran Turismo",
                "330e",
                "335",
                "335 Gran Turismo",
                "340",
                "340 Gran Turismo",
                "428",
                "428 Gran Coupe",
                "430",
                "430 Gran Coupe",
                "435",
                "435 Gran Coupe",
                "440",
                "440 Gran Coupe",
                "525",
                "528",
                "530",
                "530e",
                "535",
                "535 Gran Turismo",
                "535d",
                "540",
                "550",
                "550 Gran Turismo",
                "600",
                "640",
                "640 Gran Coupe",
                "640 Gran Turismo",
                "645",
                "650",
                "650 Gran Coupe",
                "740",
                "740e",
                "745",
                "745e",
                "750",
                "750e",
                "760",
                "840",
                "840 Gran Coupe",
                "850",
                "ALPINA B7",
                "ALPINA B8 Gran Coupe",
                "ALPINA XB7",
                "ActiveHybrid 3",
                "M",
                "M2",
                "M235",
                "M235 Gran Coupe",
                "M240",
                "M3",
                "M340",
                "M4",
                "M440",
                "M440 Gran Coupe",
                "M5",
                "M550",
                "M6",
                "M760",
                "M8",
                "M8 Gran Coupe",
                "M850",
                "M850 Gran Coupe",
                "X1",
                "X2",
                "X3",
                "X3 M",
                "X3 PHEV",
                "X4",
                "X4 M",
                "X5",
                "X5 M",
                "X5 PHEV",
                "X5 eDrive",
                "X6",
                "X6 M",
                "X7",
                "XM",
                "Z3",
                "Z4",
                "Z4 M",
                "Z8",
                "i3",
                "i4 Gran Coupe",
                "i5",
                "i7",
                "i8",
                "iX",
            ],
        },
        {
            make: "Bentley",
            models: [
                "All Models",
                "Arnage",
                "Azure",
                "Bentayga",
                "Bentayga EWB",
                "Bentayga Hybrid",
                "Brooklands",
                "Continental",
                "Continental Flying Spur",
                "Continental GT",
                "Continental GTC",
                "Continental Supersports",
                "Corniche",
                "Eight",
                "Flying Spur",
                "Flying Spur Hybrid",
                "Mark VI",
                "Mulsanne",
                "R-Type",
                "R-Type Continental",
                "S1",
                "S2",
                "S3",
                "T1",
            ],
        },
        { make: "Bremen", models: ["All Models", "Mini Mark"] },
        { make: "Bricklin", models: ["All Models", "SV-1"] },
        {
            make: "Bugatti",
            models: ["All Models", "Chiron", "Veyron", "Veyron 16.4"],
        },
        {
            make: "Buick",
            models: [
                "All Models",
                "California",
                "Cascada",
                "Century",
                "Electra",
                "Electra 225",
                "Enclave",
                "Encore",
                "Encore GX",
                "Envision",
                "Envista",
                "GS",
                "GS 350",
                "GS 400",
                "GS 455",
                "GranSport",
                "LaCrosse",
                "LeSabre",
                "Limited",
                "Lucerne",
                "Master",
                "Model 27",
                "Model B",
                "Model H",
                "Model S",
                "Park Avenue",
                "Rainier",
                "Reatta",
                "Regal",
                "Regal Sportback",
                "Regal TourX",
                "Rendezvous",
                "Riviera",
                "Roadmaster",
                "Series 40",
                "Series 50",
                "Series 60",
                "Skylark",
                "Special",
                "Sport Wagon",
                "Standard",
                "Super",
                "Terraza",
                "Verano",
                "Wildcat",
            ],
        },
        {
            make: "Cadillac",
            models: [
                "All Models",
                "ATS",
                "ATS-V",
                "Allante",
                "Brougham",
                "CT4",
                "CT4-V",
                "CT5",
                "CT5-V",
                "CT6",
                "CT6 PLUG-IN",
                "CT6-V",
                "CTS",
                "CTS-V",
                "Calais",
                "Custom",
                "DTS",
                "DeVille",
                "ELR",
                "Eldorado",
                "Escalade",
                "Escalade ESV",
                "Escalade EXT",
                "Escalade Hybrid",
                "Fleetwood",
                "LYRIQ",
                "Model A",
                "Model B",
                "Model H",
                "Model L",
                "Model S",
                "Model T",
                "SRX",
                "STS",
                "Series 60",
                "Series 62",
                "Series 70",
                "Seville",
                "Type 57",
                "V-16",
                "XLR",
                "XT4",
                "XT5",
                "XT6",
                "XTS",
            ],
        },
        {
            make: "Chevrolet",
            models: [
                "All Models",
                "150",
                "1500",
                "210",
                "2500",
                "3100",
                "3200",
                "3500",
                "3600",
                "Apache",
                "Astro",
                "Avalanche",
                "Aveo",
                "Bel Air",
                "Biscayne",
                "Blazer",
                "Blazer EV",
                "Bolt EUV",
                "Bolt EV",
                "Brookwood",
                "C10/K10",
                "C20/K20",
                "C30/K30",
                "Camaro",
                "Cameo Carrier",
                "Caprice",
                "Caprice Classic",
                "Captiva Sport",
                "Cavalier",
                "Chevelle",
                "Chevy II",
                "City Express",
                "Classic",
                "Cobalt",
                "Colorado",
                "Confederate",
                "Corvair",
                "Corvette",
                "Corvette E-Ray",
                "Corvette Stingray",
                "Cosworth Vega",
                "Cruze",
                "Cruze Limited",
                "Deluxe",
                "El Camino",
                "Equinox",
                "Equinox EV",
                "Express 1500",
                "Express 2500",
                "Express 3500",
                "Fleetline",
                "Fleetmaster",
                "HHR",
                "Impala",
                "Impala Limited",
                "Independence",
                "Lumina",
                "Malibu",
                "Malibu Classic",
                "Malibu Hybrid",
                "Malibu Limited",
                "Malibu Maxx",
                "Master",
                "Master Deluxe",
                "Metro",
                "Monte Carlo",
                "Nomad",
                "Nova",
                "Panel",
                "Pickup Truck",
                "Prizm",
                "Roadster",
                "S-10",
                "S-10 Blazer",
                "SS",
                "SSR",
                "Sedan Delivery",
                "Silverado 1500",
                "Silverado 1500 Hybrid",
                "Silverado 1500 LD",
                "Silverado 1500 Limited",
                "Silverado 2500",
                "Silverado 3500",
                "Silverado EV",
                "Sonic",
                "Spark",
                "Spark EV",
                "Special Deluxe",
                "Sprint",
                "Standard",
                "Stylemaster",
                "Suburban",
                "Tahoe",
                "Tahoe Hybrid",
                "Tracker",
                "TrailBlazer EXT",
                "Trailblazer",
                "Traverse",
                "Traverse Limited",
                "Trax",
                "Uplander",
                "Van",
                "Vega",
                "Venture",
                "Volt",
            ],
        },
        {
            make: "Chrysler",
            models: [
                "All Models",
                "200",
                "300",
                "300C",
                "300M",
                "Aspen",
                "Concorde",
                "Cordoba",
                "Crossfire",
                "E Class",
                "F-58",
                "Fifth Avenue",
                "Grand Voyager",
                "Imperial",
                "Laser",
                "LeBaron",
                "New Yorker",
                "Newport",
                "PT Cruiser",
                "Pacifica",
                "Pacifica Hybrid",
                "Prowler",
                "Saratoga",
                "Sebring",
                "TC by Maserati",
                "Town &amp; Country",
                "Voyager",
            ],
        },
        { make: "Citroen", models: ["All Models", "2CV", "DS19", "DS21"] },
        {
            make: "Datsun",
            models: [
                "All Models",
                "110",
                "1500",
                "1600",
                "2000",
                "210",
                "240Z",
                "260Z",
                "280Z",
                "280ZX",
                "300ZX",
                "510",
                "Maxima",
                "Sentra",
            ],
        },
        { make: "DeTomaso", models: ["All Models", "Mangusta", "Pantera"] },
        { make: "Delorean", models: ["All Models", "DMC-12"] },
        {
            make: "Desoto",
            models: [
                "All Models",
                "Custom",
                "DeLuxe",
                "Firedome",
                "Fireflite",
                "SC",
            ],
        },
        {
            make: "Dodge",
            models: [
                "All Models",
                "330",
                "440",
                "600",
                "A100",
                "Aspen",
                "Avenger",
                "B-Series",
                "Caliber",
                "Caravan",
                "Challenger",
                "Charger",
                "Coronet",
                "Custom",
                "D100",
                "D150",
                "D2",
                "D250",
                "D350",
                "Dakota",
                "Dart",
                "Deluxe",
                "Diplomat",
                "Durango",
                "Grand Caravan",
                "Hornet",
                "Intrepid",
                "Journey",
                "Lancer",
                "Li&#39;l Red Express",
                "Magnum",
                "Matador",
                "Meadowbrook",
                "Mirada",
                "Monaco",
                "Neon",
                "Nitro",
                "Panel",
                "Pickup Truck",
                "Polara",
                "Power Wagon",
                "Raider",
                "Ram 1500",
                "Ram 2500",
                "Ram 3500",
                "Ram Van",
                "Ram Wagon",
                "Ramcharger",
                "Royal",
                "SRT Viper",
                "Shadow",
                "Special",
                "Sprinter",
                "Standard",
                "Stealth",
                "Stratus",
                "Suburban",
                "Van",
                "Victory",
                "Viper",
                "W250",
                "W350",
            ],
        },
        {
            make: "Edsel",
            models: ["All Models", "Corsair", "Ranger", "Villager"],
        },
        { make: "Essex", models: ["All Models", "Model A", "Super Six"] },
        { make: "Excalibur", models: ["All Models", "Series II", "Series VI"] },
        {
            make: "FIAT",
            models: [
                "All Models",
                "124",
                "124 Spider",
                "128",
                "1500",
                "1900",
                "500",
                "500C",
                "500L",
                "500X",
                "500e",
                "600",
                "850",
                "Dino 2400",
                "Pininfarina",
                "Spider 2000",
                "X1/9",
            ],
        },
        {
            make: "Facel-Vega",
            models: ["All Models", "FV3B", "Facel II", "Facellia"],
        },
        {
            make: "Ferrari",
            models: [
                "All Models",
                "296 GTB",
                "296 GTS",
                "308",
                "328",
                "330",
                "348",
                "360 Modena",
                "360 Spider",
                "365",
                "400i",
                "456 M",
                "458 Italia",
                "458 Speciale",
                "458 Spider",
                "488 GTB",
                "488 Pista",
                "488 Pista Spider",
                "488 Spider",
                "512",
                "512 M",
                "512 TR",
                "550 Maranello",
                "575 M",
                "599 GTB Fiorano",
                "599 GTO",
                "612 Scaglietti",
                "812 Competizione",
                "812 GTS",
                "812 Superfast",
                "California",
                "Dino",
                "F12berlinetta",
                "F12tdf",
                "F355",
                "F40",
                "F430",
                "F8 Spider",
                "F8 Tributo",
                "FF",
                "GT",
                "GTC4Lusso",
                "GTO",
                "LaFerrari",
                "Mondial",
                "Mondial t",
                "Portofino",
                "Portofino M",
                "Roma",
                "SF90 Spider",
                "SF90 Stradale",
                "Superamerica",
                "Testarossa",
            ],
        },
        { make: "Fisker", models: ["All Models", "Karma", "Ocean"] },
        {
            make: "Ford",
            models: [
                "All Models",
                "Aerostar",
                "Bronco",
                "Bronco II",
                "Bronco Sport",
                "Business Coupe",
                "C-Max Energi",
                "C-Max Hybrid",
                "Club Sedan",
                "Club Wagon",
                "Contour",
                "Country Squire",
                "Coupe",
                "Crestline",
                "Crown Victoria",
                "Custom",
                "Customline",
                "Deluxe",
                "E-Transit",
                "E100",
                "E150",
                "E250",
                "E350",
                "E350 Super Duty",
                "EcoSport",
                "Edge",
                "Elite",
                "Escape",
                "Escape Hybrid",
                "Escape PHEV",
                "Escort",
                "Excursion",
                "Expedition",
                "Expedition EL",
                "Expedition Max",
                "Explorer",
                "Explorer Sport",
                "Explorer Sport Trac",
                "F-150",
                "F-150 Lightning",
                "F-250",
                "F-350",
                "F-450",
                "F1",
                "F100",
                "F2",
                "Fairlane",
                "Fairlane 500",
                "Falcon",
                "Fiesta",
                "Five Hundred",
                "Flex",
                "Focus",
                "Focus Electric",
                "Focus RS",
                "Focus ST",
                "Freestar",
                "Freestyle",
                "Fusion",
                "Fusion Energi",
                "Fusion Hybrid",
                "Futura",
                "GT",
                "GT40",
                "Galaxie",
                "Galaxie 500",
                "Galaxie 500 XL",
                "Gran Torino",
                "LTD",
                "Maverick",
                "Model A",
                "Model B",
                "Model S",
                "Model T",
                "Mustang",
                "Mustang Mach-E",
                "Mustang Shelby GT",
                "Panel",
                "Parklane",
                "Phaeton",
                "Pickup Truck",
                "Probe",
                "Ranch",
                "Ranchero",
                "Ranger",
                "Roadster",
                "Sedan Delivery",
                "Sedan Police Interceptor",
                "Shelby GT350",
                "Shelby GT350R",
                "Shelby GT500",
                "Sunliner",
                "Super Deluxe",
                "Taurus",
                "Taurus X",
                "Thunderbird",
                "Torino",
                "Transit Connect",
                "Transit-150",
                "Transit-250",
                "Transit-350",
                "Tudor",
                "Utility Police Interceptor",
                "Van",
                "Victoria",
                "Windstar",
            ],
        },
        { make: "Franklin", models: ["All Models", "Model H"] },
        { make: "GAZ", models: ["All Models", "M20"] },
        {
            make: "GMC",
            models: [
                "All Models",
                "1500",
                "2500",
                "3500",
                "Acadia",
                "Acadia Limited",
                "Caballero",
                "Canyon",
                "Envoy",
                "Envoy XL",
                "Envoy XUV",
                "HUMMER EV",
                "HUMMER EV SUV",
                "Jimmy",
                "Panel",
                "Pickup Truck",
                "Safari",
                "Savana 1500",
                "Savana 2500",
                "Savana 3500",
                "Sierra 1500",
                "Sierra 1500 Hybrid",
                "Sierra 1500 Limited",
                "Sierra 2500",
                "Sierra 3500",
                "Sonoma",
                "Sprint",
                "Suburban",
                "Terrain",
                "Van",
                "Yukon",
                "Yukon Hybrid",
                "Yukon XL",
            ],
        },
        {
            make: "Genesis",
            models: [
                "All Models",
                "Electrified G80",
                "Electrified GV70",
                "G70",
                "G80",
                "G90",
                "GV60",
                "GV70",
                "GV80",
            ],
        },
        { make: "Geo", models: ["All Models", "Metro", "Prizm", "Tracker"] },
        {
            make: "Honda",
            models: [
                "All Models",
                "600",
                "Accord",
                "Accord Crosstour",
                "Accord Hybrid",
                "Accord Plug-In Hybrid",
                "CR-V",
                "CR-V Hybrid",
                "CR-Z",
                "Civic",
                "Civic Hybrid",
                "Civic Si",
                "Civic Type R",
                "Clarity Plug-In Hybrid",
                "Crosstour",
                "Element",
                "Fit",
                "HR-V",
                "Insight",
                "Odyssey",
                "Passport",
                "Pilot",
                "Prelude",
                "Prologue",
                "Ridgeline",
                "S2000",
                "del Sol",
            ],
        },
        {
            make: "Hudson",
            models: [
                "All Models",
                "Commodore",
                "Custom",
                "DeLuxe",
                "DeLuxe Six",
                "Eight",
                "Hornet",
                "Model 54",
                "Pacemaker",
                "Panel",
                "Pickup Truck",
                "Standard",
                "Super",
                "Super Eight",
                "Super Jet",
                "Super Six",
                "Traveler",
            ],
        },
        {
            make: "Hummer",
            models: ["All Models", "H1", "H1 Alpha", "H2", "H3", "H3T"],
        },
        {
            make: "Hupmobile",
            models: ["All Models", "Model H", "Model S", "Skylark"],
        },
        {
            make: "Hyundai",
            models: [
                "All Models",
                "Accent",
                "Azera",
                "Elantra",
                "Elantra GT",
                "Elantra HEV",
                "Elantra N",
                "Elantra Touring",
                "Entourage",
                "Equus",
                "Genesis",
                "Genesis Coupe",
                "IONIQ 5",
                "IONIQ 5 N",
                "IONIQ 6",
                "IONIQ EV",
                "IONIQ Hybrid",
                "IONIQ Plug-In Hybrid",
                "Kona",
                "Kona EV",
                "Kona N",
                "NEXO",
                "Palisade",
                "Santa Cruz",
                "Santa Fe",
                "Santa Fe HEV",
                "Santa Fe Plug-In Hybrid",
                "Santa Fe Sport",
                "Santa Fe XL",
                "Sonata",
                "Sonata Hybrid",
                "Sonata Plug-In Hybrid",
                "Tiburon",
                "Tucson",
                "Tucson Hybrid",
                "Tucson Plug-In Hybrid",
                "Veloster",
                "Veloster N",
                "Venue",
                "Veracruz",
                "XG350",
            ],
        },
        { make: "INEOS", models: ["All Models", "Grenadier"] },
        {
            make: "INFINITI",
            models: [
                "All Models",
                "EX35",
                "EX37",
                "FX35",
                "FX37",
                "FX45",
                "FX50",
                "G20",
                "G25",
                "G25x",
                "G35",
                "G35x",
                "G37",
                "G37x",
                "I30",
                "I35",
                "IPL G",
                "JX35",
                "M30",
                "M35",
                "M35h",
                "M35x",
                "M37",
                "M37x",
                "M45",
                "M45x",
                "M56",
                "M56x",
                "Q40",
                "Q45",
                "Q50",
                "Q50 Hybrid",
                "Q60",
                "Q70",
                "Q70L",
                "Q70h",
                "QX30",
                "QX4",
                "QX50",
                "QX55",
                "QX56",
                "QX60",
                "QX60 Hybrid",
                "QX70",
                "QX80",
            ],
        },
        {
            make: "International",
            models: [
                "All Models",
                "KB-5",
                "M",
                "MXT",
                "Pickup Truck",
                "Scout",
                "Scout II",
                "Travelall",
            ],
        },
        {
            make: "Isuzu",
            models: [
                "All Models",
                "Amigo",
                "Ascender",
                "Axiom",
                "Pickup Truck",
                "Rodeo",
                "Trooper",
                "VehiCROSS",
                "i-350",
                "i-370",
            ],
        },
        {
            make: "Jaguar",
            models: [
                "All Models",
                "340",
                "420",
                "E-PACE",
                "E-Type",
                "F-PACE",
                "F-TYPE",
                "I-PACE",
                "Mark II",
                "Mark IV",
                "Mark V",
                "Mark VII",
                "Mark VIII",
                "S-Type",
                "Vanden Plas",
                "X-Type",
                "XE",
                "XE SV",
                "XF",
                "XJ",
                "XJ12",
                "XJ6",
                "XJ8",
                "XJR",
                "XJR-S",
                "XJS",
                "XK",
                "XK 120",
                "XK 140",
                "XK 150",
                "XK8",
                "XKE",
                "XKR",
            ],
        },
        {
            make: "Jeep",
            models: [
                "All Models",
                "CJ",
                "CJ-5",
                "CJ-7",
                "Cherokee",
                "Comanche",
                "Commander",
                "Commando",
                "Compass",
                "Gladiator",
                "Grand Cherokee",
                "Grand Cherokee 4xe",
                "Grand Cherokee L",
                "Grand Cherokee WK",
                "Grand Wagoneer",
                "Grand Wagoneer L",
                "Jeepster",
                "Liberty",
                "New Compass",
                "Patriot",
                "Renegade",
                "Scrambler",
                "Wagoneer",
                "Wagoneer L",
                "Wrangler",
                "Wrangler 4xe",
                "Wrangler JK",
                "Wrangler JK Unlimited",
                "Wrangler Unlimited",
                "Wrangler Unlimited 4xe",
            ],
        },
        {
            make: "Jensen",
            models: ["All Models", "541", "GT", "Interceptor", "Jensen-Healey"],
        },
        {
            make: "Kaiser",
            models: [
                "All Models",
                "Darrin",
                "Henry J",
                "Jeep M715",
                "Manhattan",
                "Special",
            ],
        },
        {
            make: "Karma",
            models: ["All Models", "GS-6", "Revero", "Revero GT"],
        },
        {
            make: "Kia",
            models: [
                "All Models",
                "Amanti",
                "Borrego",
                "Cadenza",
                "Carnival",
                "EV6",
                "EV9",
                "Forte",
                "Forte Koup",
                "K5",
                "K900",
                "Niro",
                "Niro EV",
                "Niro Plug-In Hybrid",
                "Optima",
                "Optima Hybrid",
                "Optima Plug-In Hybrid",
                "Rio",
                "Rio5",
                "Rondo",
                "Sedona",
                "Seltos",
                "Sephia",
                "Sorento",
                "Sorento Hybrid",
                "Sorento Plug-In Hybrid",
                "Soul",
                "Soul EV",
                "Spectra",
                "Spectra5",
                "Sportage",
                "Sportage Hybrid",
                "Sportage Plug-In Hybrid",
                "Stinger",
                "Telluride",
            ],
        },
        { make: "Koenigsegg", models: ["All Models", "Regera"] },
        { make: "LaSalle", models: ["All Models", "328", "340", "50"] },
        {
            make: "Lamborghini",
            models: [
                "All Models",
                "400 GT",
                "Aventador",
                "Aventador S",
                "Aventador SVJ",
                "Countach",
                "Diablo",
                "Gallardo",
                "Huracan",
                "Huracan EVO",
                "Huracan STO",
                "Huracan Sterrato",
                "Huracan Tecnica",
                "Jalpa",
                "Murcielago",
                "Silhouette",
                "Urus",
            ],
        },
        {
            make: "Lancia",
            models: ["All Models", "Aurelia", "Scorpion", "Zagato"],
        },
        {
            make: "Land Rover",
            models: [
                "All Models",
                "Defender",
                "Discovery",
                "Discovery Sport",
                "LR2",
                "LR3",
                "LR4",
                "Range Rover",
                "Range Rover Evoque",
                "Range Rover Sport",
                "Range Rover Velar",
                "Series II",
                "Series III",
            ],
        },
        {
            make: "Lexus",
            models: [
                "All Models",
                "CT 200h",
                "ES 250",
                "ES 300",
                "ES 300h",
                "ES 330",
                "ES 350",
                "GS 200t",
                "GS 300",
                "GS 350",
                "GS 400",
                "GS 430",
                "GS 450h",
                "GS 460",
                "GS F",
                "GX 460",
                "GX 470",
                "GX 550",
                "HS 250h",
                "IS 200t",
                "IS 250",
                "IS 250C",
                "IS 300",
                "IS 350",
                "IS 350C",
                "IS 500",
                "IS-F",
                "LC 500",
                "LC 500h",
                "LFA",
                "LS 400",
                "LS 430",
                "LS 460",
                "LS 500",
                "LS 500h",
                "LS 600h L",
                "LX 450",
                "LX 470",
                "LX 570",
                "LX 600",
                "NX 200t",
                "NX 250",
                "NX 300",
                "NX 300h",
                "NX 350",
                "NX 350h",
                "NX 450h+",
                "RC 200t",
                "RC 300",
                "RC 350",
                "RC F",
                "RX 300",
                "RX 330",
                "RX 350",
                "RX 350L",
                "RX 350h",
                "RX 400h",
                "RX 450h",
                "RX 450h+",
                "RX 450hL",
                "RX 500h",
                "RZ 300e",
                "RZ 450e",
                "SC 300",
                "SC 400",
                "SC 430",
                "TX 350",
                "TX 500h",
                "TX 550h+",
                "UX 200",
                "UX 250h",
                "UX 300h",
            ],
        },
        {
            make: "Lincoln",
            models: [
                "All Models",
                "Aviator",
                "Blackwood",
                "Capri",
                "Continental",
                "Corsair",
                "Custom",
                "LS",
                "MKC",
                "MKS",
                "MKT",
                "MKX",
                "MKZ",
                "MKZ Hybrid",
                "Mark II",
                "Mark III",
                "Mark IV",
                "Mark LT",
                "Mark V",
                "Mark VI",
                "Mark VII",
                "Mark VIII",
                "Model L",
                "Nautilus",
                "Navigator",
                "Navigator L",
                "Premiere",
                "Town Car",
                "Zephyr",
            ],
        },
        {
            make: "Lotus",
            models: [
                "All Models",
                "Elan",
                "Eletre",
                "Elise",
                "Elite",
                "Emira",
                "Esprit",
                "Esprit V8",
                "Evora",
                "Evora 400",
                "Evora GT",
            ],
        },
        { make: "Lucid", models: ["All Models", "Air"] },
        {
            make: "MG",
            models: [
                "All Models",
                "MGA",
                "MGB",
                "Midget",
                "TC Roadster",
                "TD",
                "TF",
                "YT",
            ],
        },
        {
            make: "MINI",
            models: [
                "All Models",
                "Clubman",
                "Convertible",
                "Cooper",
                "Cooper Clubman",
                "Cooper Countryman",
                "Cooper S",
                "Cooper S Clubman",
                "Cooper S Countryman",
                "Countryman",
                "Coupe",
                "E Countryman",
                "Hardtop",
                "John Cooper Works GP",
                "Paceman",
                "Roadster",
                "SE Countryman",
                "SE Hardtop",
            ],
        },
        {
            make: "Maserati",
            models: [
                "All Models",
                "228",
                "3500",
                "430",
                "Biturbo",
                "Bora",
                "Coupe",
                "Ghibli",
                "GranCabrio",
                "GranSport",
                "GranTurismo",
                "Grecale",
                "Khamsin",
                "Levante",
                "MC20",
                "Mistral",
                "Quattroporte",
                "Sebring",
                "Spyder",
            ],
        },
        {
            make: "Maybach",
            models: ["All Models", "Landaulet", "Type 57", "Type 62"],
        },
        {
            make: "Mazda",
            models: [
                "All Models",
                "1800",
                "323",
                "626",
                "929",
                "B2300",
                "B2500",
                "B3000",
                "B4000",
                "CX-3",
                "CX-30",
                "CX-5",
                "CX-50",
                "CX-7",
                "CX-70",
                "CX-70 PHEV",
                "CX-9",
                "CX-90",
                "CX-90 PHEV",
                "MPV",
                "MX-30",
                "MX-30 EV",
                "MX-5 Miata",
                "MX-5 Miata RF",
                "Mazda2",
                "Mazda3",
                "Mazda5",
                "Mazda6",
                "MazdaSpeed Miata MX-5",
                "MazdaSpeed3",
                "Pickup Truck",
                "Protege",
                "Protege5",
                "RX-7",
                "RX-8",
                "Tribute",
            ],
        },
        {
            make: "McLaren",
            models: [
                "All Models",
                "570GT",
                "570S",
                "600LT",
                "620R",
                "650S",
                "675LT",
                "720S",
                "750S",
                "765LT",
                "Artura",
                "Elva",
                "GT",
                "MP4-12C",
                "P1",
                "Senna",
            ],
        },
        {
            make: "Mercedes-Benz",
            models: [
                "All Models",
                "190SL",
                "200",
                "230",
                "240",
                "280SE",
                "280SL",
                "300",
                "300C",
                "320",
                "380SL",
                "450SL",
                "600",
                "A-Class",
                "AMG A 35",
                "AMG C",
                "AMG C 43",
                "AMG C 63",
                "AMG CLA 35",
                "AMG CLA 45",
                "AMG CLE 53",
                "AMG CLS 53",
                "AMG E",
                "AMG E 43",
                "AMG E 53",
                "AMG E 63",
                "AMG EQE",
                "AMG EQS",
                "AMG G",
                "AMG G 63",
                "AMG GLA 35",
                "AMG GLA 45",
                "AMG GLB 35",
                "AMG GLC 43",
                "AMG GLC 63",
                "AMG GLE",
                "AMG GLE 43",
                "AMG GLE 53",
                "AMG GLE 63",
                "AMG GLS 63",
                "AMG GT",
                "AMG GT 43",
                "AMG GT 53",
                "AMG GT 55",
                "AMG GT 63",
                "AMG S",
                "AMG S 63",
                "AMG S 65",
                "AMG SL 43",
                "AMG SL 55",
                "AMG SL 63",
                "AMG SLC 43",
                "C-Class",
                "CL-Class",
                "CLA 250",
                "CLA-Class",
                "CLE 300",
                "CLE 450",
                "CLK-Class",
                "CLS 450",
                "CLS 550",
                "CLS-Class",
                "E-Class",
                "EQB 250",
                "EQB 300",
                "EQB 350",
                "EQE 350",
                "EQE 350+",
                "EQE 500",
                "EQS 450",
                "EQS 450+",
                "EQS 580",
                "G 550 4x4 Squared",
                "G-Class",
                "GL-Class",
                "GLA 250",
                "GLA-Class",
                "GLB 250",
                "GLC 300",
                "GLC 350e",
                "GLC-Class",
                "GLE 350",
                "GLE 400",
                "GLE 450",
                "GLE 450 Plug-In Hybrid",
                "GLE 580",
                "GLE-Class",
                "GLK-Class",
                "GLS 450",
                "GLS 550",
                "GLS 580",
                "M-Class",
                "Maybach EQS 680",
                "Maybach GLS 600",
                "Maybach S",
                "Maybach S 560",
                "Maybach S 580",
                "Maybach S 650",
                "Maybach S 680",
                "Metris",
                "R-Class",
                "S-Class",
                "SL 450",
                "SL 550",
                "SL-Class",
                "SLC 300",
                "SLK-Class",
                "SLR McLaren",
                "SLS AMG",
                "Sprinter",
                "Sprinter 1500",
                "Sprinter 2500",
                "Sprinter 3500",
                "Sprinter 3500XD",
                "Sprinter 4500",
                "eSprinter 2500",
            ],
        },
        {
            make: "Mercury",
            models: [
                "All Models",
                "Brougham",
                "Capri",
                "Colony Park",
                "Comet",
                "Cougar",
                "Custom",
                "Cyclone",
                "Eight",
                "Grand Marquis",
                "Marauder",
                "Mariner",
                "Mariner Hybrid",
                "Marquis",
                "Milan",
                "Montclair",
                "Montego",
                "Monterey",
                "Mountaineer",
                "Mystique",
                "Parklane",
                "Sable",
                "Series 19A",
                "Villager",
                "Voyager",
                "Zephyr",
            ],
        },
        {
            make: "Mitsubishi",
            models: [
                "All Models",
                "3000GT",
                "Diamante",
                "Eclipse",
                "Eclipse Cross",
                "Endeavor",
                "Galant",
                "Lancer",
                "Lancer Evolution",
                "Lancer Sportback",
                "Mirage",
                "Mirage G4",
                "Montero",
                "Montero Sport",
                "Outlander",
                "Outlander PHEV",
                "Outlander Sport",
                "Pickup Truck",
                "Raider",
                "i-MiEV",
            ],
        },
        { make: "Morgan", models: ["All Models", "Plus 4", "Roadster"] },
        { make: "Morris", models: ["All Models", "Mini"] },
        {
            make: "Nash",
            models: [
                "All Models",
                "600",
                "660",
                "960",
                "Ambassador",
                "DeLuxe",
                "Rambler",
                "Special",
                "Standard",
                "Super",
            ],
        },
        {
            make: "Nissan",
            models: [
                "All Models",
                "240SX",
                "280ZX",
                "300ZX",
                "350Z",
                "370Z",
                "ARIYA",
                "Altima",
                "Altima Hybrid",
                "Armada",
                "Cube",
                "Frontier",
                "GT-R",
                "Juke",
                "Kicks",
                "Leaf",
                "Maxima",
                "Murano",
                "Murano CrossCabriolet",
                "Murano Hybrid",
                "NV Cargo",
                "NV Cargo NV1500",
                "NV Cargo NV2500 HD",
                "NV Cargo NV3500 HD",
                "NV Passenger",
                "NV Passenger NV3500 HD",
                "NV200",
                "NX",
                "Pathfinder",
                "Pathfinder Hybrid",
                "Pickup Truck",
                "Quest",
                "Rogue",
                "Rogue Hybrid",
                "Rogue Select",
                "Rogue Sport",
                "Sentra",
                "Titan",
                "Titan XD",
                "Van",
                "Versa",
                "Versa Note",
                "Xterra",
                "Z",
            ],
        },
        {
            make: "Oldsmobile",
            models: [
                "All Models",
                "442",
                "66",
                "76",
                "88",
                "98",
                "Alero",
                "Aurora",
                "Bravada",
                "Calais",
                "Custom",
                "Cutlass",
                "Cutlass Calais",
                "Cutlass Ciera",
                "Cutlass Supreme",
                "Defender",
                "Delmont 88",
                "Dynamic 88",
                "Eighty-Eight",
                "F-85",
                "Fiesta",
                "Intrigue",
                "Limited",
                "Model 54",
                "Model A",
                "Model B",
                "Model F-34",
                "Model H",
                "Model L",
                "Model S",
                "Model X",
                "Ninety-Eight",
                "Silhouette",
                "Special",
                "Starfire",
                "Super 88",
                "Toronado",
                "Vista Cruiser",
            ],
        },
        { make: "Opel", models: ["All Models", "1900", "Caravan", "GT"] },
        {
            make: "Packard",
            models: [
                "All Models",
                "110",
                "115C",
                "120",
                "1600",
                "200",
                "300",
                "626",
                "640",
                "645",
                "740",
                "745",
                "840",
                "900",
                "Cavalier",
                "Clipper",
                "Custom",
                "Deluxe",
                "Eight",
                "LeBaron",
                "Model A",
                "Model B",
                "Model L",
                "Model S",
                "Standard",
                "Super",
                "Super Eight",
            ],
        },
        { make: "Pagani", models: ["All Models", "Huayra"] },
        {
            make: "Panoz",
            models: ["All Models", "AIV Roadster", "Esperante", "Roadster"],
        },
        { make: "Pierce-Arrow", models: ["All Models", "Model 54"] },
        {
            make: "Plymouth",
            models: [
                "All Models",
                "Barracuda",
                "Belvedere",
                "Business",
                "Champ",
                "Coupe",
                "Cranbrook",
                "Cuda",
                "DeLuxe",
                "Duster",
                "Fury",
                "GTX",
                "Grand Voyager",
                "Laser",
                "Model PB",
                "Neon",
                "PA",
                "Pickup Truck",
                "Prowler",
                "Roadrunner",
                "Satellite",
                "Savoy",
                "Scamp",
                "Sebring",
                "Sedan Delivery",
                "Special DeLuxe",
                "Sport Fury",
                "Standard",
                "Suburban",
                "Valiant",
                "Van",
                "Volare",
                "Voyager",
            ],
        },
        { make: "Polestar", models: ["All Models", "1", "2", "3"] },
        {
            make: "Pontiac",
            models: [
                "All Models",
                "2000",
                "Aztek",
                "Bonneville",
                "Catalina",
                "Chieftain",
                "Custom",
                "Deluxe",
                "Deluxe Six",
                "Fiero",
                "Firebird",
                "G3",
                "G5",
                "G6",
                "G8",
                "GTO",
                "Grand Am",
                "Grand Prix",
                "Grand Ville",
                "LeMans",
                "Montana",
                "Montana SV6",
                "Safari",
                "Solstice",
                "Streamliner",
                "Sunbird",
                "Sunfire",
                "Super Deluxe",
                "Tempest",
                "Torrent",
                "Trans Sport",
                "Ventura",
                "Vibe",
            ],
        },
        {
            make: "Porsche",
            models: [
                "All Models",
                "356",
                "718 Boxster",
                "718 Cayman",
                "718 Spyder",
                "911",
                "912",
                "914",
                "918 Spyder",
                "924",
                "928",
                "930",
                "944",
                "968",
                "Boxster",
                "Carrera GT",
                "Cayenne",
                "Cayenne E-Hybrid",
                "Cayenne E-Hybrid Coupe",
                "Cayenne Hybrid",
                "Cayman",
                "Macan",
                "Panamera",
                "Panamera E-Hybrid",
                "Panamera E-Hybrid Sport Turismo",
                "Panamera Hybrid",
                "Panamera Sport Turismo",
                "S90",
                "Taycan",
                "Taycan Cross Turismo",
            ],
        },
        { make: "Qvale", models: ["All Models", "Mangusta"] },
        {
            make: "RAM",
            models: [
                "All Models",
                "1500",
                "1500 Classic",
                "2500",
                "3500",
                "Cargo",
                "ProMaster 1500",
                "ProMaster 2500",
                "ProMaster 2500 Window Van",
                "ProMaster 3500",
                "ProMaster 3500 Window Van",
                "ProMaster City",
            ],
        },
        { make: "Rambler", models: ["All Models", "Custom", "Rogue"] },
        { make: "Renault", models: ["All Models", "R8", "Sport Wagon"] },
        { make: "Rivian", models: ["All Models", "R1S", "R1T"] },
        {
            make: "Rolls-Royce",
            models: [
                "All Models",
                "20/25",
                "Corniche",
                "Cullinan",
                "Dawn",
                "Ghost",
                "Phantom",
                "Phantom Coupe",
                "Phantom Drophead Coupe",
                "Phantom III",
                "Phantom V",
                "Phantom VI",
                "Silver Cloud II",
                "Silver Cloud III",
                "Silver Dawn",
                "Silver Seraph",
                "Silver Shadow",
                "Silver Shadow II",
                "Silver Spirit",
                "Silver Spur",
                "Silver Spur II",
                "Silver Wraith",
                "Silver Wraith II",
                "Spectre",
                "Wraith",
            ],
        },
        {
            make: "Saab",
            models: [
                "All Models",
                "9-2X",
                "9-3",
                "9-5",
                "9-7X",
                "900",
                "96",
                "GT",
                "Monte Carlo",
            ],
        },
        { make: "Saleen", models: ["All Models", "S7"] },
        {
            make: "Saturn",
            models: [
                "All Models",
                "Astra",
                "Aura",
                "Ion",
                "L",
                "LS",
                "Outlook",
                "SC",
                "SL",
                "Sky",
                "Vue",
                "Vue Hybrid",
            ],
        },
        {
            make: "Scion",
            models: [
                "All Models",
                "FR-S",
                "iA",
                "iM",
                "iQ",
                "tC",
                "xA",
                "xB",
                "xD",
            ],
        },
        {
            make: "Studebaker",
            models: [
                "All Models",
                "440",
                "Avanti",
                "Challenger",
                "Champ",
                "Champion",
                "Commander",
                "Golden Hawk",
                "Gran Turismo Hawk",
                "Land Cruiser",
                "Lark",
                "Model A",
                "Model B",
                "Model H",
                "Model L",
                "Pickup Truck",
                "President",
                "Regal",
            ],
        },
        {
            make: "Subaru",
            models: [
                "All Models",
                "1600",
                "1800",
                "Ascent",
                "B9 Tribeca",
                "BRZ",
                "Baja",
                "Crosstrek",
                "Crosstrek Hybrid",
                "Forester",
                "Impreza",
                "Impreza Outback Sport",
                "Impreza WRX",
                "Impreza WRX STi",
                "Legacy",
                "Outback",
                "STI S209",
                "SVX",
                "Solterra",
                "Tribeca",
                "WRX",
                "WRX STI",
                "XV Crosstrek",
                "XV Crosstrek Hybrid",
            ],
        },
        { make: "Sunbeam", models: ["All Models", "Alpine", "Tiger"] },
        {
            make: "Suzuki",
            models: [
                "All Models",
                "Aerio",
                "Equator",
                "Grand Vitara",
                "Kizashi",
                "Reno",
                "SX4",
                "Samurai",
                "Vitara",
                "XL7",
            ],
        },
        {
            make: "Tesla",
            models: [
                "All Models",
                "Cybertruck",
                "Model 3",
                "Model S",
                "Model X",
                "Model Y",
                "Roadster",
            ],
        },
        {
            make: "Toyota",
            models: [
                "All Models",
                "4Runner",
                "86",
                "Avalon",
                "Avalon Hybrid",
                "C-HR",
                "Camry",
                "Camry Hybrid",
                "Camry Solara",
                "Celica",
                "Corolla",
                "Corolla Cross",
                "Corolla Cross Hybrid",
                "Corolla Hatchback",
                "Corolla Hybrid",
                "Corolla iM",
                "Corona",
                "Cressida",
                "Crown",
                "ECHO",
                "FJ Cruiser",
                "GR Corolla",
                "GR Supra",
                "GR86",
                "Grand Highlander",
                "Grand Highlander Hybrid",
                "Highlander",
                "Highlander Hybrid",
                "Land Cruiser",
                "MR2",
                "Matrix",
                "Mirai",
                "Pickup Truck",
                "Previa",
                "Prius",
                "Prius Plug-in",
                "Prius Prime",
                "Prius c",
                "Prius v",
                "RAV4",
                "RAV4 EV",
                "RAV4 Hybrid",
                "RAV4 Prime",
                "Sequoia",
                "Sienna",
                "Supra",
                "T100",
                "Tacoma",
                "Tercel",
                "Tundra",
                "Tundra Hybrid",
                "Van",
                "Venza",
                "Yaris",
                "Yaris Sedan",
                "Yaris iA",
                "bZ4X",
            ],
        },
        {
            make: "Triumph",
            models: [
                "All Models",
                "1800",
                "2000",
                "Spitfire",
                "TR250",
                "TR3",
                "TR4",
                "TR6",
                "TR7",
                "TR8",
            ],
        },
        { make: "VinFast", models: ["All Models", "VF 8"] },
        {
            make: "Volkswagen",
            models: [
                "All Models",
                "1600",
                "Arteon",
                "Atlas",
                "Atlas Cross Sport",
                "Beetle",
                "Beetle (Pre-1980)",
                "CC",
                "Cabrio",
                "Cabriolet",
                "Corrado",
                "Eos",
                "Eurovan",
                "GTI",
                "Golf",
                "Golf Alltrack",
                "Golf GTI",
                "Golf R",
                "Golf SportWagen",
                "ID.4",
                "Jetta",
                "Jetta GLI",
                "Jetta Hybrid",
                "Jetta SportWagen",
                "Karmann Ghia",
                "Microbus",
                "New Beetle",
                "Passat",
                "Phaeton",
                "R32",
                "Rabbit",
                "Routan",
                "Super Beetle",
                "Taos",
                "Thing",
                "Tiguan",
                "Tiguan Limited",
                "Touareg",
                "Touareg 2",
                "Touareg Hybrid",
                "Type 2",
                "Van",
                "Vanagon",
                "e-Golf",
            ],
        },
        {
            make: "Volvo",
            models: [
                "All Models",
                "122",
                "164",
                "1800",
                "240",
                "740",
                "760",
                "850",
                "940",
                "960",
                "C30",
                "C40 Recharge Pure Electric",
                "C70",
                "Coupe",
                "P1800",
                "P1800E",
                "S40",
                "S60",
                "S60 Cross Country",
                "S60 Hybrid",
                "S60 Inscription",
                "S60 Recharge Plug-In Hybrid",
                "S70",
                "S80",
                "S90",
                "S90 Recharge Plug-In Hybrid",
                "V50",
                "V60",
                "V60 Cross Country",
                "V60 Recharge Plug-In Hybrid",
                "V70",
                "V90",
                "V90 Cross Country",
                "XC40",
                "XC40 Recharge Pure Electric",
                "XC60",
                "XC60 Recharge Plug-In Hybrid",
                "XC70",
                "XC90",
                "XC90 Hybrid",
                "XC90 Recharge Plug-In Hybrid",
            ],
        },
        {
            make: "Willys",
            models: [
                "All Models",
                "CJ-5",
                "Jeepster",
                "Maverick",
                "Panel",
                "Pickup Truck",
            ],
        },
        { make: "Yugo", models: ["All Models", "Cabrio"] },
        {
            make: "smart",
            models: [
                "All Models",
                "EQ ForTwo",
                "ForTwo",
                "ForTwo Electric Drive",
            ],
        },
    ],
    d0 = [10, 20, 30, 40, 50, 75, 100, 150, 200, 250, 500],
    f0 = Ua("v-alert-title"),
    v0 = ["success", "info", "warning", "error"],
    m0 = q(
        {
            border: {
                type: [Boolean, String],
                validator: (e) =>
                    typeof e == "boolean" ||
                    ["top", "end", "bottom", "start"].includes(e),
            },
            borderColor: String,
            closable: Boolean,
            closeIcon: { type: Ee, default: "$close" },
            closeLabel: { type: String, default: "$vuetify.close" },
            icon: { type: [Boolean, String, Function, Object], default: null },
            modelValue: { type: Boolean, default: !0 },
            prominent: Boolean,
            title: String,
            text: String,
            type: { type: String, validator: (e) => v0.includes(e) },
            ...Ae(),
            ...Pt(),
            ...Ht(),
            ...bn(),
            ...Ya(),
            ...oi(),
            ...kt(),
            ...ze(),
            ...We(),
            ...Jt({ variant: "flat" }),
        },
        "VAlert"
    ),
    h0 = de()({
        name: "VAlert",
        props: m0(),
        emits: { "click:close": (e) => !0, "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { emit: n, slots: l } = t;
            const a = Be(e, "modelValue"),
                r = S(() => {
                    if (e.icon !== !1)
                        return e.type ? e.icon ?? `$${e.type}` : e.icon;
                }),
                o = S(() => ({ color: e.color ?? e.type, variant: e.variant })),
                { themeClasses: i } = Qe(e),
                { colorClasses: s, colorStyles: u, variantClasses: c } = ml(o),
                { densityClasses: d } = $t(e),
                { dimensionStyles: f } = Nt(e),
                { elevationClasses: v } = Sn(e),
                { locationStyles: g } = qa(e),
                { positionClasses: m } = ii(e),
                { roundedClasses: p } = wt(e),
                { textColorClasses: C, textColorStyles: x } = Mt(
                    ce(e, "borderColor")
                ),
                { t: _ } = Yl(),
                T = S(() => ({
                    "aria-label": _(e.closeLabel),
                    onClick(k) {
                        (a.value = !1), n("click:close", k);
                    },
                }));
            return () => {
                const k = !!(l.prepend || r.value),
                    A = !!(l.title || e.title),
                    w = !!(l.close || e.closable);
                return (
                    a.value &&
                    h(
                        e.tag,
                        {
                            class: [
                                "v-alert",
                                e.border && {
                                    "v-alert--border": !!e.border,
                                    [`v-alert--border-${
                                        e.border === !0 ? "start" : e.border
                                    }`]: !0,
                                },
                                { "v-alert--prominent": e.prominent },
                                i.value,
                                s.value,
                                d.value,
                                v.value,
                                m.value,
                                p.value,
                                c.value,
                                e.class,
                            ],
                            style: [u.value, f.value, g.value, e.style],
                            role: "alert",
                        },
                        {
                            default: () => {
                                var L, E;
                                return [
                                    vl(!1, "v-alert"),
                                    e.border &&
                                        h(
                                            "div",
                                            {
                                                key: "border",
                                                class: [
                                                    "v-alert__border",
                                                    C.value,
                                                ],
                                                style: x.value,
                                            },
                                            null
                                        ),
                                    k &&
                                        h(
                                            "div",
                                            {
                                                key: "prepend",
                                                class: "v-alert__prepend",
                                            },
                                            [
                                                l.prepend
                                                    ? h(
                                                          Fe,
                                                          {
                                                              key: "prepend-defaults",
                                                              disabled:
                                                                  !r.value,
                                                              defaults: {
                                                                  VIcon: {
                                                                      density:
                                                                          e.density,
                                                                      icon: r.value,
                                                                      size: e.prominent
                                                                          ? 44
                                                                          : 28,
                                                                  },
                                                              },
                                                          },
                                                          l.prepend
                                                      )
                                                    : h(
                                                          Ne,
                                                          {
                                                              key: "prepend-icon",
                                                              density:
                                                                  e.density,
                                                              icon: r.value,
                                                              size: e.prominent
                                                                  ? 44
                                                                  : 28,
                                                          },
                                                          null
                                                      ),
                                            ]
                                        ),
                                    h("div", { class: "v-alert__content" }, [
                                        A &&
                                            h(
                                                f0,
                                                { key: "title" },
                                                {
                                                    default: () => {
                                                        var V;
                                                        return [
                                                            ((V = l.title) ==
                                                            null
                                                                ? void 0
                                                                : V.call(l)) ??
                                                                e.title,
                                                        ];
                                                    },
                                                }
                                            ),
                                        ((L = l.text) == null
                                            ? void 0
                                            : L.call(l)) ?? e.text,
                                        (E = l.default) == null
                                            ? void 0
                                            : E.call(l),
                                    ]),
                                    l.append &&
                                        h(
                                            "div",
                                            {
                                                key: "append",
                                                class: "v-alert__append",
                                            },
                                            [l.append()]
                                        ),
                                    w &&
                                        h(
                                            "div",
                                            {
                                                key: "close",
                                                class: "v-alert__close",
                                            },
                                            [
                                                l.close
                                                    ? h(
                                                          Fe,
                                                          {
                                                              key: "close-defaults",
                                                              defaults: {
                                                                  VBtn: {
                                                                      icon: e.closeIcon,
                                                                      size: "x-small",
                                                                      variant:
                                                                          "text",
                                                                  },
                                                              },
                                                          },
                                                          {
                                                              default: () => {
                                                                  var V;
                                                                  return [
                                                                      (V =
                                                                          l.close) ==
                                                                      null
                                                                          ? void 0
                                                                          : V.call(
                                                                                l,
                                                                                {
                                                                                    props: T.value,
                                                                                }
                                                                            ),
                                                                  ];
                                                              },
                                                          }
                                                      )
                                                    : h(
                                                          qn,
                                                          ke(
                                                              {
                                                                  key: "close-btn",
                                                                  icon: e.closeIcon,
                                                                  size: "x-small",
                                                                  variant:
                                                                      "text",
                                                              },
                                                              T.value
                                                          ),
                                                          null
                                                      ),
                                            ]
                                        ),
                                ];
                            },
                        }
                    )
                );
            };
        },
    }),
    g0 = q({ text: String, onClick: it(), ...Ae(), ...We() }, "VLabel"),
    lf = de()({
        name: "VLabel",
        props: g0(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() => {
                    var l;
                    return h(
                        "label",
                        {
                            class: [
                                "v-label",
                                { "v-label--clickable": !!e.onClick },
                                e.class,
                            ],
                            style: e.style,
                            onClick: e.onClick,
                        },
                        [e.text, (l = n.default) == null ? void 0 : l.call(n)]
                    );
                }),
                {}
            );
        },
    }),
    af = Symbol.for("vuetify:selection-control-group"),
    rf = q(
        {
            color: String,
            disabled: { type: Boolean, default: null },
            defaultsTarget: String,
            error: Boolean,
            id: String,
            inline: Boolean,
            falseIcon: Ee,
            trueIcon: Ee,
            ripple: { type: [Boolean, Object], default: !0 },
            multiple: { type: Boolean, default: null },
            name: String,
            readonly: { type: Boolean, default: null },
            modelValue: null,
            type: String,
            valueComparator: { type: Function, default: cl },
            ...Ae(),
            ...Pt(),
            ...We(),
        },
        "SelectionControlGroup"
    ),
    y0 = q(
        { ...rf({ defaultsTarget: "VSelectionControl" }) },
        "VSelectionControlGroup"
    );
de()({
    name: "VSelectionControlGroup",
    props: y0(),
    emits: { "update:modelValue": (e) => !0 },
    setup(e, t) {
        let { slots: n } = t;
        const l = Be(e, "modelValue"),
            a = Tt(),
            r = S(() => e.id || `v-selection-control-group-${a}`),
            o = S(() => e.name || r.value),
            i = new Set();
        return (
            qe(af, {
                modelValue: l,
                forceUpdate: () => {
                    i.forEach((s) => s());
                },
                onForceUpdate: (s) => {
                    i.add(s),
                        ct(() => {
                            i.delete(s);
                        });
                },
            }),
            Fn({
                [e.defaultsTarget]: {
                    color: ce(e, "color"),
                    disabled: ce(e, "disabled"),
                    density: ce(e, "density"),
                    error: ce(e, "error"),
                    inline: ce(e, "inline"),
                    modelValue: l,
                    multiple: S(
                        () =>
                            !!e.multiple ||
                            (e.multiple == null && Array.isArray(l.value))
                    ),
                    name: o,
                    falseIcon: ce(e, "falseIcon"),
                    trueIcon: ce(e, "trueIcon"),
                    readonly: ce(e, "readonly"),
                    ripple: ce(e, "ripple"),
                    type: ce(e, "type"),
                    valueComparator: ce(e, "valueComparator"),
                },
            }),
            Se(() => {
                var s;
                return h(
                    "div",
                    {
                        class: [
                            "v-selection-control-group",
                            { "v-selection-control-group--inline": e.inline },
                            e.class,
                        ],
                        style: e.style,
                        role: e.type === "radio" ? "radiogroup" : void 0,
                    },
                    [(s = n.default) == null ? void 0 : s.call(n)]
                );
            }),
            {}
        );
    },
});
const of = q(
    {
        label: String,
        baseColor: String,
        trueValue: null,
        falseValue: null,
        value: null,
        ...Ae(),
        ...rf(),
    },
    "VSelectionControl"
);
function p0(e) {
    const t = Pe(af, void 0),
        { densityClasses: n } = $t(e),
        l = Be(e, "modelValue"),
        a = S(() =>
            e.trueValue !== void 0
                ? e.trueValue
                : e.value !== void 0
                ? e.value
                : !0
        ),
        r = S(() => (e.falseValue !== void 0 ? e.falseValue : !1)),
        o = S(
            () => !!e.multiple || (e.multiple == null && Array.isArray(l.value))
        ),
        i = S({
            get() {
                const v = t ? t.modelValue.value : l.value;
                return o.value
                    ? ot(v).some((g) => e.valueComparator(g, a.value))
                    : e.valueComparator(v, a.value);
            },
            set(v) {
                if (e.readonly) return;
                const g = v ? a.value : r.value;
                let m = g;
                o.value &&
                    (m = v
                        ? [...ot(l.value), g]
                        : ot(l.value).filter(
                              (p) => !e.valueComparator(p, a.value)
                          )),
                    t ? (t.modelValue.value = m) : (l.value = m);
            },
        }),
        { textColorClasses: s, textColorStyles: u } = Mt(
            S(() => {
                if (!(e.error || e.disabled))
                    return i.value ? e.color : e.baseColor;
            })
        ),
        { backgroundColorClasses: c, backgroundColorStyles: d } = Ut(
            S(() =>
                i.value && !e.error && !e.disabled ? e.color : e.baseColor
            )
        ),
        f = S(() => (i.value ? e.trueIcon : e.falseIcon));
    return {
        group: t,
        densityClasses: n,
        trueValue: a,
        falseValue: r,
        model: i,
        textColorClasses: s,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        icon: f,
    };
}
const nu = de()({
        name: "VSelectionControl",
        directives: { Ripple: Zl },
        inheritAttrs: !1,
        props: of(),
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { attrs: n, slots: l } = t;
            const {
                    group: a,
                    densityClasses: r,
                    icon: o,
                    model: i,
                    textColorClasses: s,
                    textColorStyles: u,
                    backgroundColorClasses: c,
                    backgroundColorStyles: d,
                    trueValue: f,
                } = p0(e),
                v = Tt(),
                g = oe(!1),
                m = oe(!1),
                p = le(),
                C = S(() => e.id || `input-${v}`),
                x = S(() => !e.disabled && !e.readonly);
            a == null ||
                a.onForceUpdate(() => {
                    p.value && (p.value.checked = i.value);
                });
            function _(w) {
                x.value &&
                    ((g.value = !0),
                    el(w.target, ":focus-visible") !== !1 && (m.value = !0));
            }
            function T() {
                (g.value = !1), (m.value = !1);
            }
            function k(w) {
                w.stopPropagation();
            }
            function A(w) {
                if (!x.value) {
                    p.value && (p.value.checked = i.value);
                    return;
                }
                e.readonly && a && Ge(() => a.forceUpdate()),
                    (i.value = w.target.checked);
            }
            return (
                Se(() => {
                    var R, M;
                    const w = l.label
                            ? l.label({
                                  label: e.label,
                                  props: { for: C.value },
                              })
                            : e.label,
                        [L, E] = $c(n),
                        V = h(
                            "input",
                            ke(
                                {
                                    ref: p,
                                    checked: i.value,
                                    disabled: !!e.disabled,
                                    id: C.value,
                                    onBlur: T,
                                    onFocus: _,
                                    onInput: A,
                                    "aria-disabled": !!e.disabled,
                                    "aria-label": e.label,
                                    type: e.type,
                                    value: f.value,
                                    name: e.name,
                                    "aria-checked":
                                        e.type === "checkbox"
                                            ? i.value
                                            : void 0,
                                },
                                E
                            ),
                            null
                        );
                    return h(
                        "div",
                        ke(
                            {
                                class: [
                                    "v-selection-control",
                                    {
                                        "v-selection-control--dirty": i.value,
                                        "v-selection-control--disabled":
                                            e.disabled,
                                        "v-selection-control--error": e.error,
                                        "v-selection-control--focused": g.value,
                                        "v-selection-control--focus-visible":
                                            m.value,
                                        "v-selection-control--inline": e.inline,
                                    },
                                    r.value,
                                    e.class,
                                ],
                            },
                            L,
                            { style: e.style }
                        ),
                        [
                            h(
                                "div",
                                {
                                    class: [
                                        "v-selection-control__wrapper",
                                        s.value,
                                    ],
                                    style: u.value,
                                },
                                [
                                    (R = l.default) == null
                                        ? void 0
                                        : R.call(l, {
                                              backgroundColorClasses: c,
                                              backgroundColorStyles: d,
                                          }),
                                    ut(
                                        h(
                                            "div",
                                            {
                                                class: [
                                                    "v-selection-control__input",
                                                ],
                                            },
                                            [
                                                ((M = l.input) == null
                                                    ? void 0
                                                    : M.call(l, {
                                                          model: i,
                                                          textColorClasses: s,
                                                          textColorStyles: u,
                                                          backgroundColorClasses:
                                                              c,
                                                          backgroundColorStyles:
                                                              d,
                                                          inputNode: V,
                                                          icon: o.value,
                                                          props: {
                                                              onFocus: _,
                                                              onBlur: T,
                                                              id: C.value,
                                                          },
                                                      })) ??
                                                    h(we, null, [
                                                        o.value &&
                                                            h(
                                                                Ne,
                                                                {
                                                                    key: "icon",
                                                                    icon: o.value,
                                                                },
                                                                null
                                                            ),
                                                        V,
                                                    ]),
                                            ]
                                        ),
                                        [
                                            [
                                                Rn("ripple"),
                                                e.ripple && [
                                                    !e.disabled && !e.readonly,
                                                    null,
                                                    ["center", "circle"],
                                                ],
                                            ],
                                        ]
                                    ),
                                ]
                            ),
                            w &&
                                h(
                                    lf,
                                    { for: C.value, onClick: k },
                                    { default: () => [w] }
                                ),
                        ]
                    );
                }),
                { isFocused: g, input: p }
            );
        },
    }),
    b0 = q(
        {
            indeterminate: Boolean,
            indeterminateIcon: { type: Ee, default: "$checkboxIndeterminate" },
            ...of({ falseIcon: "$checkboxOff", trueIcon: "$checkboxOn" }),
        },
        "VCheckboxBtn"
    ),
    sf = de()({
        name: "VCheckboxBtn",
        props: b0(),
        emits: {
            "update:modelValue": (e) => !0,
            "update:indeterminate": (e) => !0,
        },
        setup(e, t) {
            let { slots: n } = t;
            const l = Be(e, "indeterminate"),
                a = Be(e, "modelValue");
            function r(s) {
                l.value && (l.value = !1);
            }
            const o = S(() => (l.value ? e.indeterminateIcon : e.falseIcon)),
                i = S(() => (l.value ? e.indeterminateIcon : e.trueIcon));
            return (
                Se(() => {
                    const s = On(nu.filterProps(e), ["modelValue"]);
                    return h(
                        nu,
                        ke(s, {
                            modelValue: a.value,
                            "onUpdate:modelValue": [(u) => (a.value = u), r],
                            class: ["v-checkbox-btn", e.class],
                            style: e.style,
                            type: "checkbox",
                            falseIcon: o.value,
                            trueIcon: i.value,
                            "aria-checked": l.value ? "mixed" : void 0,
                        }),
                        n
                    );
                }),
                {}
            );
        },
    });
function uf(e) {
    const { t } = Yl();
    function n(l) {
        let { name: a } = l;
        const r = {
                prepend: "prependAction",
                prependInner: "prependAction",
                append: "appendAction",
                appendInner: "appendAction",
                clear: "clear",
            }[a],
            o = e[`onClick:${a}`],
            i = o && r ? t(`$vuetify.input.${r}`, e.label ?? "") : void 0;
        return h(
            Ne,
            { icon: e[`${a}Icon`], "aria-label": i, onClick: o },
            null
        );
    }
    return { InputIcon: n };
}
const S0 = q(
        {
            active: Boolean,
            color: String,
            messages: { type: [Array, String], default: () => [] },
            ...Ae(),
            ...fl({
                transition: { component: gd, leaveAbsolute: !0, group: !0 },
            }),
        },
        "VMessages"
    ),
    C0 = de()({
        name: "VMessages",
        props: S0(),
        setup(e, t) {
            let { slots: n } = t;
            const l = S(() => ot(e.messages)),
                { textColorClasses: a, textColorStyles: r } = Mt(
                    S(() => e.color)
                );
            return (
                Se(() =>
                    h(
                        cn,
                        {
                            transition: e.transition,
                            tag: "div",
                            class: ["v-messages", a.value, e.class],
                            style: [r.value, e.style],
                            role: "alert",
                            "aria-live": "polite",
                        },
                        {
                            default: () => [
                                e.active &&
                                    l.value.map((o, i) =>
                                        h(
                                            "div",
                                            {
                                                class: "v-messages__message",
                                                key: `${i}-${l.value}`,
                                            },
                                            [
                                                n.message
                                                    ? n.message({ message: o })
                                                    : o,
                                            ]
                                        )
                                    ),
                            ],
                        }
                    )
                ),
                {}
            );
        },
    }),
    cf = q({ focused: Boolean, "onUpdate:focused": it() }, "focus");
function df(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dt();
    const n = Be(e, "focused"),
        l = S(() => ({ [`${t}--focused`]: n.value }));
    function a() {
        n.value = !0;
    }
    function r() {
        n.value = !1;
    }
    return { focusClasses: l, isFocused: n, focus: a, blur: r };
}
const k0 = Symbol.for("vuetify:form");
function fi() {
    return Pe(k0, null);
}
const w0 = q(
    {
        disabled: { type: Boolean, default: null },
        error: Boolean,
        errorMessages: { type: [Array, String], default: () => [] },
        maxErrors: { type: [Number, String], default: 1 },
        name: String,
        label: String,
        readonly: { type: Boolean, default: null },
        rules: { type: Array, default: () => [] },
        modelValue: null,
        validateOn: String,
        validationValue: null,
        ...cf(),
    },
    "validation"
);
function A0(e) {
    let t =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : Dt(),
        n =
            arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : Tt();
    const l = Be(e, "modelValue"),
        a = S(() =>
            e.validationValue === void 0 ? l.value : e.validationValue
        ),
        r = fi(),
        o = le([]),
        i = oe(!0),
        s = S(
            () =>
                !!(
                    ot(l.value === "" ? null : l.value).length ||
                    ot(a.value === "" ? null : a.value).length
                )
        ),
        u = S(
            () => !!(e.disabled ?? (r == null ? void 0 : r.isDisabled.value))
        ),
        c = S(
            () => !!(e.readonly ?? (r == null ? void 0 : r.isReadonly.value))
        ),
        d = S(() => {
            var k;
            return (k = e.errorMessages) != null && k.length
                ? ot(e.errorMessages)
                      .concat(o.value)
                      .slice(0, Math.max(0, +e.maxErrors))
                : o.value;
        }),
        f = S(() => {
            let k =
                (e.validateOn ?? (r == null ? void 0 : r.validateOn.value)) ||
                "input";
            k === "lazy" && (k = "input lazy");
            const A = new Set((k == null ? void 0 : k.split(" ")) ?? []);
            return {
                blur: A.has("blur") || A.has("input"),
                input: A.has("input"),
                submit: A.has("submit"),
                lazy: A.has("lazy"),
            };
        }),
        v = S(() => {
            var k;
            return e.error || ((k = e.errorMessages) != null && k.length)
                ? !1
                : e.rules.length
                ? i.value
                    ? o.value.length || f.value.lazy
                        ? null
                        : !0
                    : !o.value.length
                : !0;
        }),
        g = oe(!1),
        m = S(() => ({
            [`${t}--error`]: v.value === !1,
            [`${t}--dirty`]: s.value,
            [`${t}--disabled`]: u.value,
            [`${t}--readonly`]: c.value,
        })),
        p = je("validation"),
        C = S(() => e.name ?? Xe(n));
    Io(() => {
        r == null ||
            r.register({
                id: C.value,
                vm: p,
                validate: T,
                reset: x,
                resetValidation: _,
            });
    }),
        ht(() => {
            r == null || r.unregister(C.value);
        }),
        Qt(async () => {
            f.value.lazy || (await T(!0)),
                r == null || r.update(C.value, v.value, d.value);
        }),
        mn(
            () => f.value.input,
            () => {
                ue(a, () => {
                    if (a.value != null) T();
                    else if (e.focused) {
                        const k = ue(
                            () => e.focused,
                            (A) => {
                                A || T(), k();
                            }
                        );
                    }
                });
            }
        ),
        mn(
            () => f.value.blur,
            () => {
                ue(
                    () => e.focused,
                    (k) => {
                        k || T();
                    }
                );
            }
        ),
        ue([v, d], () => {
            r == null || r.update(C.value, v.value, d.value);
        });
    async function x() {
        (l.value = null), await Ge(), await _();
    }
    async function _() {
        (i.value = !0), f.value.lazy ? (o.value = []) : await T(!0);
    }
    async function T() {
        let k =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
        const A = [];
        g.value = !0;
        for (const w of e.rules) {
            if (A.length >= +(e.maxErrors ?? 1)) break;
            const E = await (typeof w == "function" ? w : () => w)(a.value);
            if (E !== !0) {
                if (E !== !1 && typeof E != "string") {
                    console.warn(
                        `${E} is not a valid value. Rule functions must return boolean true or a string.`
                    );
                    continue;
                }
                A.push(E || "");
            }
        }
        return (o.value = A), (g.value = !1), (i.value = k), o.value;
    }
    return {
        errorMessages: d,
        isDirty: s,
        isDisabled: u,
        isReadonly: c,
        isPristine: i,
        isValid: v,
        isValidating: g,
        reset: x,
        resetValidation: _,
        validate: T,
        validationClasses: m,
    };
}
const ff = q(
        {
            id: String,
            appendIcon: Ee,
            centerAffix: { type: Boolean, default: !0 },
            prependIcon: Ee,
            hideDetails: [Boolean, String],
            hideSpinButtons: Boolean,
            hint: String,
            persistentHint: Boolean,
            messages: { type: [Array, String], default: () => [] },
            direction: {
                type: String,
                default: "horizontal",
                validator: (e) => ["horizontal", "vertical"].includes(e),
            },
            "onClick:prepend": it(),
            "onClick:append": it(),
            ...Ae(),
            ...Pt(),
            ...mh(Ht(), ["maxWidth", "minWidth", "width"]),
            ...We(),
            ...w0(),
        },
        "VInput"
    ),
    lu = de()({
        name: "VInput",
        props: { ...ff() },
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { attrs: n, slots: l, emit: a } = t;
            const { densityClasses: r } = $t(e),
                { dimensionStyles: o } = Nt(e),
                { themeClasses: i } = Qe(e),
                { rtlClasses: s } = Zt(),
                { InputIcon: u } = uf(e),
                c = Tt(),
                d = S(() => e.id || `input-${c}`),
                f = S(() => `${d.value}-messages`),
                {
                    errorMessages: v,
                    isDirty: g,
                    isDisabled: m,
                    isReadonly: p,
                    isPristine: C,
                    isValid: x,
                    isValidating: _,
                    reset: T,
                    resetValidation: k,
                    validate: A,
                    validationClasses: w,
                } = A0(e, "v-input", d),
                L = S(() => ({
                    id: d,
                    messagesId: f,
                    isDirty: g,
                    isDisabled: m,
                    isReadonly: p,
                    isPristine: C,
                    isValid: x,
                    isValidating: _,
                    reset: T,
                    resetValidation: k,
                    validate: A,
                })),
                E = S(() => {
                    var V;
                    return ((V = e.errorMessages) != null && V.length) ||
                        (!C.value && v.value.length)
                        ? v.value
                        : e.hint && (e.persistentHint || e.focused)
                        ? e.hint
                        : e.messages;
                });
            return (
                Se(() => {
                    var $, Z, ee, ne;
                    const V = !!(l.prepend || e.prependIcon),
                        R = !!(l.append || e.appendIcon),
                        M = E.value.length > 0,
                        B =
                            !e.hideDetails ||
                            (e.hideDetails === "auto" && (M || !!l.details));
                    return h(
                        "div",
                        {
                            class: [
                                "v-input",
                                `v-input--${e.direction}`,
                                {
                                    "v-input--center-affix": e.centerAffix,
                                    "v-input--hide-spin-buttons":
                                        e.hideSpinButtons,
                                },
                                r.value,
                                i.value,
                                s.value,
                                w.value,
                                e.class,
                            ],
                            style: [o.value, e.style],
                        },
                        [
                            V &&
                                h(
                                    "div",
                                    {
                                        key: "prepend",
                                        class: "v-input__prepend",
                                    },
                                    [
                                        ($ = l.prepend) == null
                                            ? void 0
                                            : $.call(l, L.value),
                                        e.prependIcon &&
                                            h(
                                                u,
                                                {
                                                    key: "prepend-icon",
                                                    name: "prepend",
                                                },
                                                null
                                            ),
                                    ]
                                ),
                            l.default &&
                                h("div", { class: "v-input__control" }, [
                                    (Z = l.default) == null
                                        ? void 0
                                        : Z.call(l, L.value),
                                ]),
                            R &&
                                h(
                                    "div",
                                    { key: "append", class: "v-input__append" },
                                    [
                                        e.appendIcon &&
                                            h(
                                                u,
                                                {
                                                    key: "append-icon",
                                                    name: "append",
                                                },
                                                null
                                            ),
                                        (ee = l.append) == null
                                            ? void 0
                                            : ee.call(l, L.value),
                                    ]
                                ),
                            B &&
                                h("div", { class: "v-input__details" }, [
                                    h(
                                        C0,
                                        {
                                            id: f.value,
                                            active: M,
                                            messages: E.value,
                                        },
                                        { message: l.message }
                                    ),
                                    (ne = l.details) == null
                                        ? void 0
                                        : ne.call(l, L.value),
                                ]),
                        ]
                    );
                }),
                {
                    reset: T,
                    resetValidation: k,
                    validate: A,
                    isValid: x,
                    errorMessages: v,
                }
            );
        },
    });
function _0(e) {
    let {
        selectedElement: t,
        containerElement: n,
        isRtl: l,
        isHorizontal: a,
    } = e;
    const r = zl(a, n),
        o = vf(a, l, n),
        i = zl(a, t),
        s = mf(a, t),
        u = i * 0.4;
    return o > s ? s - u : o + r < s + i ? s - r + i + u : o;
}
function x0(e) {
    let { selectedElement: t, containerElement: n, isHorizontal: l } = e;
    const a = zl(l, n),
        r = mf(l, t),
        o = zl(l, t);
    return r - a / 2 + o / 2;
}
function au(e, t) {
    const n = e ? "scrollWidth" : "scrollHeight";
    return (t == null ? void 0 : t[n]) || 0;
}
function M0(e, t) {
    const n = e ? "clientWidth" : "clientHeight";
    return (t == null ? void 0 : t[n]) || 0;
}
function vf(e, t, n) {
    if (!n) return 0;
    const { scrollLeft: l, offsetWidth: a, scrollWidth: r } = n;
    return e ? (t ? r - a + l : l) : n.scrollTop;
}
function zl(e, t) {
    const n = e ? "offsetWidth" : "offsetHeight";
    return (t == null ? void 0 : t[n]) || 0;
}
function mf(e, t) {
    const n = e ? "offsetLeft" : "offsetTop";
    return (t == null ? void 0 : t[n]) || 0;
}
const E0 = Symbol.for("vuetify:v-slide-group"),
    hf = q(
        {
            centerActive: Boolean,
            direction: { type: String, default: "horizontal" },
            symbol: { type: null, default: E0 },
            nextIcon: { type: Ee, default: "$next" },
            prevIcon: { type: Ee, default: "$prev" },
            showArrows: {
                type: [Boolean, String],
                validator: (e) =>
                    typeof e == "boolean" ||
                    ["always", "desktop", "mobile"].includes(e),
            },
            ...Ae(),
            ...qg({ mobile: null }),
            ...ze(),
            ...ni({ selectedClass: "v-slide-group-item--active" }),
        },
        "VSlideGroup"
    ),
    ru = de()({
        name: "VSlideGroup",
        props: hf(),
        emits: { "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { slots: n } = t;
            const { isRtl: l } = Zt(),
                { displayClasses: a, mobile: r } = qo(e),
                o = li(e, e.symbol),
                i = oe(!1),
                s = oe(0),
                u = oe(0),
                c = oe(0),
                d = S(() => e.direction === "horizontal"),
                { resizeRef: f, contentRect: v } = nl(),
                { resizeRef: g, contentRect: m } = nl(),
                p = Jg(),
                C = S(() => ({
                    container: f.el,
                    duration: 200,
                    easing: "easeOutQuart",
                })),
                x = S(() =>
                    o.selected.value.length
                        ? o.items.value.findIndex(
                              (F) => F.id === o.selected.value[0]
                          )
                        : -1
                ),
                _ = S(() =>
                    o.selected.value.length
                        ? o.items.value.findIndex(
                              (F) =>
                                  F.id ===
                                  o.selected.value[o.selected.value.length - 1]
                          )
                        : -1
                );
            if (Ve) {
                let F = -1;
                ue(
                    () => [o.selected.value, v.value, m.value, d.value],
                    () => {
                        cancelAnimationFrame(F),
                            (F = requestAnimationFrame(() => {
                                if (v.value && m.value) {
                                    const z = d.value ? "width" : "height";
                                    (u.value = v.value[z]),
                                        (c.value = m.value[z]),
                                        (i.value = u.value + 1 < c.value);
                                }
                                if (x.value >= 0 && g.el) {
                                    const z = g.el.children[_.value];
                                    k(z, e.centerActive);
                                }
                            }));
                    }
                );
            }
            const T = oe(!1);
            function k(F, z) {
                let J = 0;
                z
                    ? (J = x0({
                          containerElement: f.el,
                          isHorizontal: d.value,
                          selectedElement: F,
                      }))
                    : (J = _0({
                          containerElement: f.el,
                          isHorizontal: d.value,
                          isRtl: l.value,
                          selectedElement: F,
                      })),
                    A(J);
            }
            function A(F) {
                if (!Ve || !f.el) return;
                const z = zl(d.value, f.el),
                    J = vf(d.value, l.value, f.el);
                if (!(au(d.value, f.el) <= z || Math.abs(F - J) < 16)) {
                    if (d.value && l.value && f.el) {
                        const { scrollWidth: pe, offsetWidth: Ce } = f.el;
                        F = pe - Ce - F;
                    }
                    d.value ? p.horizontal(F, C.value) : p(F, C.value);
                }
            }
            function w(F) {
                const { scrollTop: z, scrollLeft: J } = F.target;
                s.value = d.value ? J : z;
            }
            function L(F) {
                if (((T.value = !0), !(!i.value || !g.el))) {
                    for (const z of F.composedPath())
                        for (const J of g.el.children)
                            if (J === z) {
                                k(J);
                                return;
                            }
                }
            }
            function E(F) {
                T.value = !1;
            }
            let V = !1;
            function R(F) {
                var z;
                !V &&
                    !T.value &&
                    !(
                        F.relatedTarget &&
                        (z = g.el) != null &&
                        z.contains(F.relatedTarget)
                    ) &&
                    $(),
                    (V = !1);
            }
            function M() {
                V = !0;
            }
            function B(F) {
                if (!g.el) return;
                function z(J) {
                    F.preventDefault(), $(J);
                }
                d.value
                    ? F.key === "ArrowRight"
                        ? z(l.value ? "prev" : "next")
                        : F.key === "ArrowLeft" && z(l.value ? "next" : "prev")
                    : F.key === "ArrowDown"
                    ? z("next")
                    : F.key === "ArrowUp" && z("prev"),
                    F.key === "Home"
                        ? z("first")
                        : F.key === "End" && z("last");
            }
            function $(F) {
                var J, ie;
                if (!g.el) return;
                let z;
                if (!F) z = xa(g.el)[0];
                else if (F === "next") {
                    if (
                        ((z =
                            (J = g.el.querySelector(":focus")) == null
                                ? void 0
                                : J.nextElementSibling),
                        !z)
                    )
                        return $("first");
                } else if (F === "prev") {
                    if (
                        ((z =
                            (ie = g.el.querySelector(":focus")) == null
                                ? void 0
                                : ie.previousElementSibling),
                        !z)
                    )
                        return $("last");
                } else
                    F === "first"
                        ? (z = g.el.firstElementChild)
                        : F === "last" && (z = g.el.lastElementChild);
                z && z.focus({ preventScroll: !0 });
            }
            function Z(F) {
                const z = d.value && l.value ? -1 : 1,
                    J = (F === "prev" ? -z : z) * u.value;
                let ie = s.value + J;
                if (d.value && l.value && f.el) {
                    const { scrollWidth: pe, offsetWidth: Ce } = f.el;
                    ie += pe - Ce;
                }
                A(ie);
            }
            const ee = S(() => ({
                    next: o.next,
                    prev: o.prev,
                    select: o.select,
                    isSelected: o.isSelected,
                })),
                ne = S(() => {
                    switch (e.showArrows) {
                        case "always":
                            return !0;
                        case "desktop":
                            return !r.value;
                        case !0:
                            return i.value || Math.abs(s.value) > 0;
                        case "mobile":
                            return r.value || i.value || Math.abs(s.value) > 0;
                        default:
                            return (
                                !r.value && (i.value || Math.abs(s.value) > 0)
                            );
                    }
                }),
                H = S(() => Math.abs(s.value) > 1),
                X = S(() => {
                    if (!f.value) return !1;
                    const F = au(d.value, f.el),
                        z = M0(d.value, f.el);
                    return F - z - Math.abs(s.value) > 1;
                });
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: [
                                "v-slide-group",
                                {
                                    "v-slide-group--vertical": !d.value,
                                    "v-slide-group--has-affixes": ne.value,
                                    "v-slide-group--is-overflowing": i.value,
                                },
                                a.value,
                                e.class,
                            ],
                            style: e.style,
                            tabindex:
                                T.value || o.selected.value.length ? -1 : 0,
                            onFocus: R,
                        },
                        {
                            default: () => {
                                var F, z, J;
                                return [
                                    ne.value &&
                                        h(
                                            "div",
                                            {
                                                key: "prev",
                                                class: [
                                                    "v-slide-group__prev",
                                                    {
                                                        "v-slide-group__prev--disabled":
                                                            !H.value,
                                                    },
                                                ],
                                                onMousedown: M,
                                                onClick: () =>
                                                    H.value && Z("prev"),
                                            },
                                            [
                                                ((F = n.prev) == null
                                                    ? void 0
                                                    : F.call(n, ee.value)) ??
                                                    h(zs, null, {
                                                        default: () => [
                                                            h(
                                                                Ne,
                                                                {
                                                                    icon: l.value
                                                                        ? e.nextIcon
                                                                        : e.prevIcon,
                                                                },
                                                                null
                                                            ),
                                                        ],
                                                    }),
                                            ]
                                        ),
                                    h(
                                        "div",
                                        {
                                            key: "container",
                                            ref: f,
                                            class: "v-slide-group__container",
                                            onScroll: w,
                                        },
                                        [
                                            h(
                                                "div",
                                                {
                                                    ref: g,
                                                    class: "v-slide-group__content",
                                                    onFocusin: L,
                                                    onFocusout: E,
                                                    onKeydown: B,
                                                },
                                                [
                                                    (z = n.default) == null
                                                        ? void 0
                                                        : z.call(n, ee.value),
                                                ]
                                            ),
                                        ]
                                    ),
                                    ne.value &&
                                        h(
                                            "div",
                                            {
                                                key: "next",
                                                class: [
                                                    "v-slide-group__next",
                                                    {
                                                        "v-slide-group__next--disabled":
                                                            !X.value,
                                                    },
                                                ],
                                                onMousedown: M,
                                                onClick: () =>
                                                    X.value && Z("next"),
                                            },
                                            [
                                                ((J = n.next) == null
                                                    ? void 0
                                                    : J.call(n, ee.value)) ??
                                                    h(zs, null, {
                                                        default: () => [
                                                            h(
                                                                Ne,
                                                                {
                                                                    icon: l.value
                                                                        ? e.prevIcon
                                                                        : e.nextIcon,
                                                                },
                                                                null
                                                            ),
                                                        ],
                                                    }),
                                            ]
                                        ),
                                ];
                            },
                        }
                    )
                ),
                { selected: o.selected, scrollTo: Z, scrollOffset: s, focus: $ }
            );
        },
    }),
    gf = Symbol.for("vuetify:v-chip-group"),
    T0 = q(
        {
            column: Boolean,
            filter: Boolean,
            valueComparator: { type: Function, default: cl },
            ...hf(),
            ...Ae(),
            ...ni({ selectedClass: "v-chip--selected" }),
            ...ze(),
            ...We(),
            ...Jt({ variant: "tonal" }),
        },
        "VChipGroup"
    );
de()({
    name: "VChipGroup",
    props: T0(),
    emits: { "update:modelValue": (e) => !0 },
    setup(e, t) {
        let { slots: n } = t;
        const { themeClasses: l } = Qe(e),
            {
                isSelected: a,
                select: r,
                next: o,
                prev: i,
                selected: s,
            } = li(e, gf);
        return (
            Fn({
                VChip: {
                    color: ce(e, "color"),
                    disabled: ce(e, "disabled"),
                    filter: ce(e, "filter"),
                    variant: ce(e, "variant"),
                },
            }),
            Se(() => {
                const u = ru.filterProps(e);
                return h(
                    ru,
                    ke(u, {
                        class: [
                            "v-chip-group",
                            { "v-chip-group--column": e.column },
                            l.value,
                            e.class,
                        ],
                        style: e.style,
                    }),
                    {
                        default: () => {
                            var c;
                            return [
                                (c = n.default) == null
                                    ? void 0
                                    : c.call(n, {
                                          isSelected: a,
                                          select: r,
                                          next: o,
                                          prev: i,
                                          selected: s.value,
                                      }),
                            ];
                        },
                    }
                );
            }),
            {}
        );
    },
});
const P0 = q(
        {
            activeClass: String,
            appendAvatar: String,
            appendIcon: Ee,
            closable: Boolean,
            closeIcon: { type: Ee, default: "$delete" },
            closeLabel: { type: String, default: "$vuetify.close" },
            draggable: Boolean,
            filter: Boolean,
            filterIcon: { type: String, default: "$complete" },
            label: Boolean,
            link: { type: Boolean, default: void 0 },
            pill: Boolean,
            prependAvatar: String,
            prependIcon: Ee,
            ripple: { type: [Boolean, Object], default: !0 },
            text: String,
            modelValue: { type: Boolean, default: !0 },
            onClick: it(),
            onClickOnce: it(),
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...bn(),
            ...Ad(),
            ...kt(),
            ...Za(),
            ...ql(),
            ...ze({ tag: "span" }),
            ...We(),
            ...Jt({ variant: "tonal" }),
        },
        "VChip"
    ),
    yf = de()({
        name: "VChip",
        directives: { Ripple: Zl },
        props: P0(),
        emits: {
            "click:close": (e) => !0,
            "update:modelValue": (e) => !0,
            "group:selected": (e) => !0,
            click: (e) => !0,
        },
        setup(e, t) {
            let { attrs: n, emit: l, slots: a } = t;
            const { t: r } = Yl(),
                { borderClasses: o } = Dn(e),
                { colorClasses: i, colorStyles: s, variantClasses: u } = ml(e),
                { densityClasses: c } = $t(e),
                { elevationClasses: d } = Sn(e),
                { roundedClasses: f } = wt(e),
                { sizeClasses: v } = Ql(e),
                { themeClasses: g } = Qe(e),
                m = Be(e, "modelValue"),
                p = _d(e, gf, !1),
                C = Qa(e, n),
                x = S(() => e.link !== !1 && C.isLink.value),
                _ = S(
                    () =>
                        !e.disabled &&
                        e.link !== !1 &&
                        (!!p || e.link || C.isClickable.value)
                ),
                T = S(() => ({
                    "aria-label": r(e.closeLabel),
                    onClick(w) {
                        w.preventDefault(),
                            w.stopPropagation(),
                            (m.value = !1),
                            l("click:close", w);
                    },
                }));
            function k(w) {
                var L;
                l("click", w),
                    _.value &&
                        ((L = C.navigate) == null || L.call(C, w),
                        p == null || p.toggle());
            }
            function A(w) {
                (w.key === "Enter" || w.key === " ") &&
                    (w.preventDefault(), k(w));
            }
            return () => {
                const w = C.isLink.value ? "a" : e.tag,
                    L = !!(e.appendIcon || e.appendAvatar),
                    E = !!(L || a.append),
                    V = !!(a.close || e.closable),
                    R = !!(a.filter || e.filter) && p,
                    M = !!(e.prependIcon || e.prependAvatar),
                    B = !!(M || a.prepend),
                    $ = !p || p.isSelected.value;
                return (
                    m.value &&
                    ut(
                        h(
                            w,
                            {
                                class: [
                                    "v-chip",
                                    {
                                        "v-chip--disabled": e.disabled,
                                        "v-chip--label": e.label,
                                        "v-chip--link": _.value,
                                        "v-chip--filter": R,
                                        "v-chip--pill": e.pill,
                                    },
                                    g.value,
                                    o.value,
                                    $ ? i.value : void 0,
                                    c.value,
                                    d.value,
                                    f.value,
                                    v.value,
                                    u.value,
                                    p == null ? void 0 : p.selectedClass.value,
                                    e.class,
                                ],
                                style: [$ ? s.value : void 0, e.style],
                                disabled: e.disabled || void 0,
                                draggable: e.draggable,
                                href: C.href.value,
                                tabindex: _.value ? 0 : void 0,
                                onClick: k,
                                onKeydown: _.value && !x.value && A,
                            },
                            {
                                default: () => {
                                    var Z;
                                    return [
                                        vl(_.value, "v-chip"),
                                        R &&
                                            h(
                                                pd,
                                                { key: "filter" },
                                                {
                                                    default: () => [
                                                        ut(
                                                            h(
                                                                "div",
                                                                {
                                                                    class: "v-chip__filter",
                                                                },
                                                                [
                                                                    a.filter
                                                                        ? h(
                                                                              Fe,
                                                                              {
                                                                                  key: "filter-defaults",
                                                                                  disabled:
                                                                                      !e.filterIcon,
                                                                                  defaults:
                                                                                      {
                                                                                          VIcon: {
                                                                                              icon: e.filterIcon,
                                                                                          },
                                                                                      },
                                                                              },
                                                                              a.filter
                                                                          )
                                                                        : h(
                                                                              Ne,
                                                                              {
                                                                                  key: "filter-icon",
                                                                                  icon: e.filterIcon,
                                                                              },
                                                                              null
                                                                          ),
                                                                ]
                                                            ),
                                                            [
                                                                [
                                                                    Ln,
                                                                    p.isSelected
                                                                        .value,
                                                                ],
                                                            ]
                                                        ),
                                                    ],
                                                }
                                            ),
                                        B &&
                                            h(
                                                "div",
                                                {
                                                    key: "prepend",
                                                    class: "v-chip__prepend",
                                                },
                                                [
                                                    a.prepend
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "prepend-defaults",
                                                                  disabled: !M,
                                                                  defaults: {
                                                                      VAvatar: {
                                                                          image: e.prependAvatar,
                                                                          start: !0,
                                                                      },
                                                                      VIcon: {
                                                                          icon: e.prependIcon,
                                                                          start: !0,
                                                                      },
                                                                  },
                                                              },
                                                              a.prepend
                                                          )
                                                        : h(we, null, [
                                                              e.prependIcon &&
                                                                  h(
                                                                      Ne,
                                                                      {
                                                                          key: "prepend-icon",
                                                                          icon: e.prependIcon,
                                                                          start: !0,
                                                                      },
                                                                      null
                                                                  ),
                                                              e.prependAvatar &&
                                                                  h(
                                                                      hn,
                                                                      {
                                                                          key: "prepend-avatar",
                                                                          image: e.prependAvatar,
                                                                          start: !0,
                                                                      },
                                                                      null
                                                                  ),
                                                          ]),
                                                ]
                                            ),
                                        h(
                                            "div",
                                            {
                                                class: "v-chip__content",
                                                "data-no-activator": "",
                                            },
                                            [
                                                ((Z = a.default) == null
                                                    ? void 0
                                                    : Z.call(a, {
                                                          isSelected:
                                                              p == null
                                                                  ? void 0
                                                                  : p.isSelected
                                                                        .value,
                                                          selectedClass:
                                                              p == null
                                                                  ? void 0
                                                                  : p
                                                                        .selectedClass
                                                                        .value,
                                                          select:
                                                              p == null
                                                                  ? void 0
                                                                  : p.select,
                                                          toggle:
                                                              p == null
                                                                  ? void 0
                                                                  : p.toggle,
                                                          value:
                                                              p == null
                                                                  ? void 0
                                                                  : p.value
                                                                        .value,
                                                          disabled: e.disabled,
                                                      })) ?? e.text,
                                            ]
                                        ),
                                        E &&
                                            h(
                                                "div",
                                                {
                                                    key: "append",
                                                    class: "v-chip__append",
                                                },
                                                [
                                                    a.append
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "append-defaults",
                                                                  disabled: !L,
                                                                  defaults: {
                                                                      VAvatar: {
                                                                          end: !0,
                                                                          image: e.appendAvatar,
                                                                      },
                                                                      VIcon: {
                                                                          end: !0,
                                                                          icon: e.appendIcon,
                                                                      },
                                                                  },
                                                              },
                                                              a.append
                                                          )
                                                        : h(we, null, [
                                                              e.appendIcon &&
                                                                  h(
                                                                      Ne,
                                                                      {
                                                                          key: "append-icon",
                                                                          end: !0,
                                                                          icon: e.appendIcon,
                                                                      },
                                                                      null
                                                                  ),
                                                              e.appendAvatar &&
                                                                  h(
                                                                      hn,
                                                                      {
                                                                          key: "append-avatar",
                                                                          end: !0,
                                                                          image: e.appendAvatar,
                                                                      },
                                                                      null
                                                                  ),
                                                          ]),
                                                ]
                                            ),
                                        V &&
                                            h(
                                                "button",
                                                ke(
                                                    {
                                                        key: "close",
                                                        class: "v-chip__close",
                                                        type: "button",
                                                    },
                                                    T.value
                                                ),
                                                [
                                                    a.close
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "close-defaults",
                                                                  defaults: {
                                                                      VIcon: {
                                                                          icon: e.closeIcon,
                                                                          size: "x-small",
                                                                      },
                                                                  },
                                                              },
                                                              a.close
                                                          )
                                                        : h(
                                                              Ne,
                                                              {
                                                                  key: "close-icon",
                                                                  icon: e.closeIcon,
                                                                  size: "x-small",
                                                              },
                                                              null
                                                          ),
                                                ]
                                            ),
                                    ];
                                },
                            }
                        ),
                        [[Rn("ripple"), _.value && e.ripple, null]]
                    )
                );
            };
        },
    }),
    I0 = q(
        {
            active: Boolean,
            disabled: Boolean,
            max: [Number, String],
            value: { type: [Number, String], default: 0 },
            ...Ae(),
            ...fl({ transition: { component: gd } }),
        },
        "VCounter"
    ),
    V0 = de()({
        name: "VCounter",
        functional: !0,
        props: I0(),
        setup(e, t) {
            let { slots: n } = t;
            const l = S(() =>
                e.max ? `${e.value} / ${e.max}` : String(e.value)
            );
            return (
                Se(() =>
                    h(
                        cn,
                        { transition: e.transition },
                        {
                            default: () => [
                                ut(
                                    h(
                                        "div",
                                        {
                                            class: [
                                                "v-counter",
                                                {
                                                    "text-error":
                                                        e.max &&
                                                        !e.disabled &&
                                                        parseFloat(e.value) >
                                                            parseFloat(e.max),
                                                },
                                                e.class,
                                            ],
                                            style: e.style,
                                        },
                                        [
                                            n.default
                                                ? n.default({
                                                      counter: l.value,
                                                      max: e.max,
                                                      value: e.value,
                                                  })
                                                : l.value,
                                        ]
                                    ),
                                    [[Ln, e.active]]
                                ),
                            ],
                        }
                    )
                ),
                {}
            );
        },
    }),
    R0 = q({ floating: Boolean, ...Ae() }, "VFieldLabel"),
    ca = de()({
        name: "VFieldLabel",
        props: R0(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() =>
                    h(
                        lf,
                        {
                            class: [
                                "v-field-label",
                                { "v-field-label--floating": e.floating },
                                e.class,
                            ],
                            style: e.style,
                            "aria-hidden": e.floating || void 0,
                        },
                        n
                    )
                ),
                {}
            );
        },
    }),
    L0 = [
        "underlined",
        "outlined",
        "filled",
        "solo",
        "solo-inverted",
        "solo-filled",
        "plain",
    ],
    pf = q(
        {
            appendInnerIcon: Ee,
            bgColor: String,
            clearable: Boolean,
            clearIcon: { type: Ee, default: "$clear" },
            active: Boolean,
            centerAffix: { type: Boolean, default: void 0 },
            color: String,
            baseColor: String,
            dirty: Boolean,
            disabled: { type: Boolean, default: null },
            error: Boolean,
            flat: Boolean,
            label: String,
            persistentClear: Boolean,
            prependInnerIcon: Ee,
            reverse: Boolean,
            singleLine: Boolean,
            variant: {
                type: String,
                default: "filled",
                validator: (e) => L0.includes(e),
            },
            "onClick:clear": it(),
            "onClick:appendInner": it(),
            "onClick:prependInner": it(),
            ...Ae(),
            ...ai(),
            ...kt(),
            ...We(),
        },
        "VField"
    ),
    bf = de()({
        name: "VField",
        inheritAttrs: !1,
        props: { id: String, ...cf(), ...pf() },
        emits: { "update:focused": (e) => !0, "update:modelValue": (e) => !0 },
        setup(e, t) {
            let { attrs: n, emit: l, slots: a } = t;
            const { themeClasses: r } = Qe(e),
                { loaderClasses: o } = ri(e),
                { focusClasses: i, isFocused: s, focus: u, blur: c } = df(e),
                { InputIcon: d } = uf(e),
                { roundedClasses: f } = wt(e),
                { rtlClasses: v } = Zt(),
                g = S(() => e.dirty || e.active),
                m = S(() => !e.singleLine && !!(e.label || a.label)),
                p = Tt(),
                C = S(() => e.id || `input-${p}`),
                x = S(() => `${C.value}-messages`),
                _ = le(),
                T = le(),
                k = le(),
                A = S(() => ["plain", "underlined"].includes(e.variant)),
                { backgroundColorClasses: w, backgroundColorStyles: L } = Ut(
                    ce(e, "bgColor")
                ),
                { textColorClasses: E, textColorStyles: V } = Mt(
                    S(() =>
                        e.error || e.disabled
                            ? void 0
                            : g.value && s.value
                            ? e.color
                            : e.baseColor
                    )
                );
            ue(
                g,
                ($) => {
                    if (m.value) {
                        const Z = _.value.$el,
                            ee = T.value.$el;
                        requestAnimationFrame(() => {
                            const ne = Wo(Z),
                                H = ee.getBoundingClientRect(),
                                X = H.x - ne.x,
                                F = H.y - ne.y - (ne.height / 2 - H.height / 2),
                                z = H.width / 0.75,
                                J =
                                    Math.abs(z - ne.width) > 1
                                        ? { maxWidth: me(z) }
                                        : void 0,
                                ie = getComputedStyle(Z),
                                pe = getComputedStyle(ee),
                                Ce =
                                    parseFloat(ie.transitionDuration) * 1e3 ||
                                    150,
                                ae = parseFloat(
                                    pe.getPropertyValue("--v-field-label-scale")
                                ),
                                I = pe.getPropertyValue("color");
                            (Z.style.visibility = "visible"),
                                (ee.style.visibility = "hidden"),
                                Xn(
                                    Z,
                                    {
                                        transform: `translate(${X}px, ${F}px) scale(${ae})`,
                                        color: I,
                                        ...J,
                                    },
                                    {
                                        duration: Ce,
                                        easing: Ta,
                                        direction: $ ? "normal" : "reverse",
                                    }
                                ).finished.then(() => {
                                    Z.style.removeProperty("visibility"),
                                        ee.style.removeProperty("visibility");
                                });
                        });
                    }
                },
                { flush: "post" }
            );
            const R = S(() => ({
                isActive: g,
                isFocused: s,
                controlRef: k,
                blur: c,
                focus: u,
            }));
            function M($) {
                $.target !== document.activeElement && $.preventDefault();
            }
            function B($) {
                var Z;
                ($.key !== "Enter" && $.key !== " ") ||
                    ($.preventDefault(),
                    $.stopPropagation(),
                    (Z = e["onClick:clear"]) == null ||
                        Z.call(e, new MouseEvent("click")));
            }
            return (
                Se(() => {
                    var X, F, z;
                    const $ = e.variant === "outlined",
                        Z = !!(a["prepend-inner"] || e.prependInnerIcon),
                        ee = !!(e.clearable || a.clear),
                        ne = !!(a["append-inner"] || e.appendInnerIcon || ee),
                        H = () =>
                            a.label
                                ? a.label({
                                      ...R.value,
                                      label: e.label,
                                      props: { for: C.value },
                                  })
                                : e.label;
                    return h(
                        "div",
                        ke(
                            {
                                class: [
                                    "v-field",
                                    {
                                        "v-field--active": g.value,
                                        "v-field--appended": ne,
                                        "v-field--center-affix":
                                            e.centerAffix ?? !A.value,
                                        "v-field--disabled": e.disabled,
                                        "v-field--dirty": e.dirty,
                                        "v-field--error": e.error,
                                        "v-field--flat": e.flat,
                                        "v-field--has-background": !!e.bgColor,
                                        "v-field--persistent-clear":
                                            e.persistentClear,
                                        "v-field--prepended": Z,
                                        "v-field--reverse": e.reverse,
                                        "v-field--single-line": e.singleLine,
                                        "v-field--no-label": !H(),
                                        [`v-field--variant-${e.variant}`]: !0,
                                    },
                                    r.value,
                                    w.value,
                                    i.value,
                                    o.value,
                                    f.value,
                                    v.value,
                                    e.class,
                                ],
                                style: [L.value, e.style],
                                onClick: M,
                            },
                            n
                        ),
                        [
                            h("div", { class: "v-field__overlay" }, null),
                            h(
                                Td,
                                {
                                    name: "v-field",
                                    active: !!e.loading,
                                    color: e.error
                                        ? "error"
                                        : typeof e.loading == "string"
                                        ? e.loading
                                        : e.color,
                                },
                                { default: a.loader }
                            ),
                            Z &&
                                h(
                                    "div",
                                    {
                                        key: "prepend",
                                        class: "v-field__prepend-inner",
                                    },
                                    [
                                        e.prependInnerIcon &&
                                            h(
                                                d,
                                                {
                                                    key: "prepend-icon",
                                                    name: "prependInner",
                                                },
                                                null
                                            ),
                                        (X = a["prepend-inner"]) == null
                                            ? void 0
                                            : X.call(a, R.value),
                                    ]
                                ),
                            h(
                                "div",
                                {
                                    class: "v-field__field",
                                    "data-no-activator": "",
                                },
                                [
                                    [
                                        "filled",
                                        "solo",
                                        "solo-inverted",
                                        "solo-filled",
                                    ].includes(e.variant) &&
                                        m.value &&
                                        h(
                                            ca,
                                            {
                                                key: "floating-label",
                                                ref: T,
                                                class: [E.value],
                                                floating: !0,
                                                for: C.value,
                                                style: V.value,
                                            },
                                            { default: () => [H()] }
                                        ),
                                    h(
                                        ca,
                                        { ref: _, for: C.value },
                                        { default: () => [H()] }
                                    ),
                                    (F = a.default) == null
                                        ? void 0
                                        : F.call(a, {
                                              ...R.value,
                                              props: {
                                                  id: C.value,
                                                  class: "v-field__input",
                                                  "aria-describedby": x.value,
                                              },
                                              focus: u,
                                              blur: c,
                                          }),
                                ]
                            ),
                            ee &&
                                h(
                                    pd,
                                    { key: "clear" },
                                    {
                                        default: () => [
                                            ut(
                                                h(
                                                    "div",
                                                    {
                                                        class: "v-field__clearable",
                                                        onMousedown: (J) => {
                                                            J.preventDefault(),
                                                                J.stopPropagation();
                                                        },
                                                    },
                                                    [
                                                        h(
                                                            Fe,
                                                            {
                                                                defaults: {
                                                                    VIcon: {
                                                                        icon: e.clearIcon,
                                                                    },
                                                                },
                                                            },
                                                            {
                                                                default: () => [
                                                                    a.clear
                                                                        ? a.clear(
                                                                              {
                                                                                  ...R.value,
                                                                                  props: {
                                                                                      onKeydown:
                                                                                          B,
                                                                                      onFocus:
                                                                                          u,
                                                                                      onBlur: c,
                                                                                      onClick:
                                                                                          e[
                                                                                              "onClick:clear"
                                                                                          ],
                                                                                  },
                                                                              }
                                                                          )
                                                                        : h(
                                                                              d,
                                                                              {
                                                                                  name: "clear",
                                                                                  onKeydown:
                                                                                      B,
                                                                                  onFocus:
                                                                                      u,
                                                                                  onBlur: c,
                                                                              },
                                                                              null
                                                                          ),
                                                                ],
                                                            }
                                                        ),
                                                    ]
                                                ),
                                                [[Ln, e.dirty]]
                                            ),
                                        ],
                                    }
                                ),
                            ne &&
                                h(
                                    "div",
                                    {
                                        key: "append",
                                        class: "v-field__append-inner",
                                    },
                                    [
                                        (z = a["append-inner"]) == null
                                            ? void 0
                                            : z.call(a, R.value),
                                        e.appendInnerIcon &&
                                            h(
                                                d,
                                                {
                                                    key: "append-icon",
                                                    name: "appendInner",
                                                },
                                                null
                                            ),
                                    ]
                                ),
                            h(
                                "div",
                                {
                                    class: ["v-field__outline", E.value],
                                    style: V.value,
                                },
                                [
                                    $ &&
                                        h(we, null, [
                                            h(
                                                "div",
                                                {
                                                    class: "v-field__outline__start",
                                                },
                                                null
                                            ),
                                            m.value &&
                                                h(
                                                    "div",
                                                    {
                                                        class: "v-field__outline__notch",
                                                    },
                                                    [
                                                        h(
                                                            ca,
                                                            {
                                                                ref: T,
                                                                floating: !0,
                                                                for: C.value,
                                                            },
                                                            {
                                                                default: () => [
                                                                    H(),
                                                                ],
                                                            }
                                                        ),
                                                    ]
                                                ),
                                            h(
                                                "div",
                                                {
                                                    class: "v-field__outline__end",
                                                },
                                                null
                                            ),
                                        ]),
                                    A.value &&
                                        m.value &&
                                        h(
                                            ca,
                                            {
                                                ref: T,
                                                floating: !0,
                                                for: C.value,
                                            },
                                            { default: () => [H()] }
                                        ),
                                ]
                            ),
                        ]
                    );
                }),
                { controlRef: k }
            );
        },
    });
function O0(e) {
    const t = Object.keys(bf.props).filter(
        (n) => !zo(n) && n !== "class" && n !== "style"
    );
    return Hc(e, t);
}
const F0 = ["color", "file", "time", "date", "datetime-local", "week", "month"],
    vi = q(
        {
            autofocus: Boolean,
            counter: [Boolean, Number, String],
            counterValue: [Number, Function],
            prefix: String,
            placeholder: String,
            persistentPlaceholder: Boolean,
            persistentCounter: Boolean,
            suffix: String,
            role: String,
            type: { type: String, default: "text" },
            modelModifiers: Object,
            ...ff(),
            ...pf(),
        },
        "VTextField"
    ),
    al = de()({
        name: "VTextField",
        directives: { Intersect: Cd },
        inheritAttrs: !1,
        props: vi(),
        emits: {
            "click:control": (e) => !0,
            "mousedown:control": (e) => !0,
            "update:focused": (e) => !0,
            "update:modelValue": (e) => !0,
        },
        setup(e, t) {
            let { attrs: n, emit: l, slots: a } = t;
            const r = Be(e, "modelValue"),
                { isFocused: o, focus: i, blur: s } = df(e),
                u = S(() =>
                    typeof e.counterValue == "function"
                        ? e.counterValue(r.value)
                        : typeof e.counterValue == "number"
                        ? e.counterValue
                        : (r.value ?? "").toString().length
                ),
                c = S(() => {
                    if (n.maxlength) return n.maxlength;
                    if (
                        !(
                            !e.counter ||
                            (typeof e.counter != "number" &&
                                typeof e.counter != "string")
                        )
                    )
                        return e.counter;
                }),
                d = S(() => ["plain", "underlined"].includes(e.variant));
            function f(A, w) {
                var L, E;
                !e.autofocus ||
                    !A ||
                    (E = (L = w[0].target) == null ? void 0 : L.focus) ==
                        null ||
                    E.call(L);
            }
            const v = le(),
                g = le(),
                m = le(),
                p = S(
                    () =>
                        F0.includes(e.type) ||
                        e.persistentPlaceholder ||
                        o.value ||
                        e.active
                );
            function C() {
                var A;
                m.value !== document.activeElement &&
                    ((A = m.value) == null || A.focus()),
                    o.value || i();
            }
            function x(A) {
                l("mousedown:control", A),
                    A.target !== m.value && (C(), A.preventDefault());
            }
            function _(A) {
                C(), l("click:control", A);
            }
            function T(A) {
                A.stopPropagation(),
                    C(),
                    Ge(() => {
                        (r.value = null), ph(e["onClick:clear"], A);
                    });
            }
            function k(A) {
                var L;
                const w = A.target;
                if (
                    ((r.value = w.value),
                    (L = e.modelModifiers) != null &&
                        L.trim &&
                        ["text", "search", "password", "tel", "url"].includes(
                            e.type
                        ))
                ) {
                    const E = [w.selectionStart, w.selectionEnd];
                    Ge(() => {
                        (w.selectionStart = E[0]), (w.selectionEnd = E[1]);
                    });
                }
            }
            return (
                Se(() => {
                    const A = !!(
                            a.counter ||
                            (e.counter !== !1 && e.counter != null)
                        ),
                        w = !!(A || a.details),
                        [L, E] = $c(n),
                        { modelValue: V, ...R } = lu.filterProps(e),
                        M = O0(e);
                    return h(
                        lu,
                        ke(
                            {
                                ref: v,
                                modelValue: r.value,
                                "onUpdate:modelValue": (B) => (r.value = B),
                                class: [
                                    "v-text-field",
                                    {
                                        "v-text-field--prefixed": e.prefix,
                                        "v-text-field--suffixed": e.suffix,
                                        "v-input--plain-underlined": d.value,
                                    },
                                    e.class,
                                ],
                                style: e.style,
                            },
                            L,
                            R,
                            { centerAffix: !d.value, focused: o.value }
                        ),
                        {
                            ...a,
                            default: (B) => {
                                let {
                                    id: $,
                                    isDisabled: Z,
                                    isDirty: ee,
                                    isReadonly: ne,
                                    isValid: H,
                                } = B;
                                return h(
                                    bf,
                                    ke(
                                        {
                                            ref: g,
                                            onMousedown: x,
                                            onClick: _,
                                            "onClick:clear": T,
                                            "onClick:prependInner":
                                                e["onClick:prependInner"],
                                            "onClick:appendInner":
                                                e["onClick:appendInner"],
                                            role: e.role,
                                        },
                                        M,
                                        {
                                            id: $.value,
                                            active: p.value || ee.value,
                                            dirty: ee.value || e.dirty,
                                            disabled: Z.value,
                                            focused: o.value,
                                            error: H.value === !1,
                                        }
                                    ),
                                    {
                                        ...a,
                                        default: (X) => {
                                            let {
                                                props: { class: F, ...z },
                                            } = X;
                                            const J = ut(
                                                h(
                                                    "input",
                                                    ke(
                                                        {
                                                            ref: m,
                                                            value: r.value,
                                                            onInput: k,
                                                            autofocus:
                                                                e.autofocus,
                                                            readonly: ne.value,
                                                            disabled: Z.value,
                                                            name: e.name,
                                                            placeholder:
                                                                e.placeholder,
                                                            size: 1,
                                                            type: e.type,
                                                            onFocus: C,
                                                            onBlur: s,
                                                        },
                                                        z,
                                                        E
                                                    ),
                                                    null
                                                ),
                                                [
                                                    [
                                                        Rn("intersect"),
                                                        { handler: f },
                                                        null,
                                                        { once: !0 },
                                                    ],
                                                ]
                                            );
                                            return h(we, null, [
                                                e.prefix &&
                                                    h(
                                                        "span",
                                                        {
                                                            class: "v-text-field__prefix",
                                                        },
                                                        [
                                                            h(
                                                                "span",
                                                                {
                                                                    class: "v-text-field__prefix__text",
                                                                },
                                                                [e.prefix]
                                                            ),
                                                        ]
                                                    ),
                                                a.default
                                                    ? h(
                                                          "div",
                                                          {
                                                              class: F,
                                                              "data-no-activator":
                                                                  "",
                                                          },
                                                          [a.default(), J]
                                                      )
                                                    : Kt(J, { class: F }),
                                                e.suffix &&
                                                    h(
                                                        "span",
                                                        {
                                                            class: "v-text-field__suffix",
                                                        },
                                                        [
                                                            h(
                                                                "span",
                                                                {
                                                                    class: "v-text-field__suffix__text",
                                                                },
                                                                [e.suffix]
                                                            ),
                                                        ]
                                                    ),
                                            ]);
                                        },
                                    }
                                );
                            },
                            details: w
                                ? (B) => {
                                      var $;
                                      return h(we, null, [
                                          ($ = a.details) == null
                                              ? void 0
                                              : $.call(a, B),
                                          A &&
                                              h(we, null, [
                                                  h("span", null, null),
                                                  h(
                                                      V0,
                                                      {
                                                          active:
                                                              e.persistentCounter ||
                                                              o.value,
                                                          value: u.value,
                                                          max: c.value,
                                                          disabled: e.disabled,
                                                      },
                                                      a.counter
                                                  ),
                                              ]),
                                      ]);
                                  }
                                : void 0,
                        }
                    );
                }),
                Ja({}, v, g, m)
            );
        },
    }),
    B0 = q({ renderless: Boolean, ...Ae() }, "VVirtualScrollItem"),
    D0 = de()({
        name: "VVirtualScrollItem",
        inheritAttrs: !1,
        props: B0(),
        emits: { "update:height": (e) => !0 },
        setup(e, t) {
            let { attrs: n, emit: l, slots: a } = t;
            const { resizeRef: r, contentRect: o } = nl(void 0, "border");
            ue(
                () => {
                    var i;
                    return (i = o.value) == null ? void 0 : i.height;
                },
                (i) => {
                    i != null && l("update:height", i);
                }
            ),
                Se(() => {
                    var i, s;
                    return e.renderless
                        ? h(we, null, [
                              (i = a.default) == null
                                  ? void 0
                                  : i.call(a, { itemRef: r }),
                          ])
                        : h(
                              "div",
                              ke(
                                  {
                                      ref: r,
                                      class: [
                                          "v-virtual-scroll__item",
                                          e.class,
                                      ],
                                      style: e.style,
                                  },
                                  n
                              ),
                              [(s = a.default) == null ? void 0 : s.call(a)]
                          );
                });
        },
    }),
    H0 = -1,
    N0 = 1,
    wr = 100,
    $0 = q(
        {
            itemHeight: { type: [Number, String], default: null },
            height: [Number, String],
        },
        "virtual"
    );
function G0(e, t) {
    const n = qo(),
        l = oe(0);
    mt(() => {
        l.value = parseFloat(e.itemHeight || 0);
    });
    const a = oe(0),
        r = oe(
            Math.ceil(
                (parseInt(e.height) || n.height.value) / (l.value || 16)
            ) || 1
        ),
        o = oe(0),
        i = oe(0),
        s = le(),
        u = le();
    let c = 0;
    const { resizeRef: d, contentRect: f } = nl();
    mt(() => {
        d.value = s.value;
    });
    const v = S(() => {
            var X;
            return s.value === document.documentElement
                ? n.height.value
                : ((X = f.value) == null ? void 0 : X.height) ||
                      parseInt(e.height) ||
                      0;
        }),
        g = S(() => !!(s.value && u.value && v.value && l.value));
    let m = Array.from({ length: t.value.length }),
        p = Array.from({ length: t.value.length });
    const C = oe(0);
    let x = -1;
    function _(X) {
        return m[X] || l.value;
    }
    const T = gh(() => {
            const X = performance.now();
            p[0] = 0;
            const F = t.value.length;
            for (let z = 1; z <= F - 1; z++) p[z] = (p[z - 1] || 0) + _(z - 1);
            C.value = Math.max(C.value, performance.now() - X);
        }, C),
        k = ue(g, (X) => {
            X &&
                (k(),
                (c = u.value.offsetTop),
                T.immediate(),
                Z(),
                ~x &&
                    Ge(() => {
                        Ve &&
                            window.requestAnimationFrame(() => {
                                ne(x), (x = -1);
                            });
                    }));
        });
    ct(() => {
        T.clear();
    });
    function A(X, F) {
        const z = m[X],
            J = l.value;
        (l.value = J ? Math.min(l.value, F) : F),
            (z !== F || J !== l.value) && ((m[X] = F), T());
    }
    function w(X) {
        return (X = Bt(X, 0, t.value.length - 1)), p[X] || 0;
    }
    function L(X) {
        return z0(p, X);
    }
    let E = 0,
        V = 0,
        R = 0;
    ue(v, (X, F) => {
        F &&
            (Z(),
            X < F &&
                requestAnimationFrame(() => {
                    (V = 0), Z();
                }));
    });
    function M() {
        if (!s.value || !u.value) return;
        const X = s.value.scrollTop,
            F = performance.now();
        F - R > 500
            ? ((V = Math.sign(X - E)), (c = u.value.offsetTop))
            : (V = X - E),
            (E = X),
            (R = F),
            Z();
    }
    function B() {
        !s.value || !u.value || ((V = 0), (R = 0), Z());
    }
    let $ = -1;
    function Z() {
        cancelAnimationFrame($), ($ = requestAnimationFrame(ee));
    }
    function ee() {
        if (!s.value || !v.value) return;
        const X = E - c,
            F = Math.sign(V),
            z = Math.max(0, X - wr),
            J = Bt(L(z), 0, t.value.length),
            ie = X + v.value + wr,
            pe = Bt(L(ie) + 1, J + 1, t.value.length);
        if ((F !== H0 || J < a.value) && (F !== N0 || pe > r.value)) {
            const Ce = w(a.value) - w(J),
                ae = w(pe) - w(r.value);
            Math.max(Ce, ae) > wr
                ? ((a.value = J), (r.value = pe))
                : (J <= 0 && (a.value = J),
                  pe >= t.value.length && (r.value = pe));
        }
        (o.value = w(a.value)), (i.value = w(t.value.length) - w(r.value));
    }
    function ne(X) {
        const F = w(X);
        !s.value || (X && !F) ? (x = X) : (s.value.scrollTop = F);
    }
    const H = S(() =>
        t.value
            .slice(a.value, r.value)
            .map((X, F) => ({ raw: X, index: F + a.value }))
    );
    return (
        ue(
            t,
            () => {
                (m = Array.from({ length: t.value.length })),
                    (p = Array.from({ length: t.value.length })),
                    T.immediate(),
                    Z();
            },
            { deep: !0 }
        ),
        {
            containerRef: s,
            markerRef: u,
            computedItems: H,
            paddingTop: o,
            paddingBottom: i,
            scrollToIndex: ne,
            handleScroll: M,
            handleScrollend: B,
            handleItemResize: A,
        }
    );
}
function z0(e, t) {
    let n = e.length - 1,
        l = 0,
        a = 0,
        r = null,
        o = -1;
    if (e[n] < t) return n;
    for (; l <= n; )
        if (((a = (l + n) >> 1), (r = e[a]), r > t)) n = a - 1;
        else if (r < t) (o = a), (l = a + 1);
        else return r === t ? a : l;
    return o;
}
const X0 = q(
        {
            items: { type: Array, default: () => [] },
            renderless: Boolean,
            ...$0(),
            ...Ae(),
            ...Ht(),
        },
        "VVirtualScroll"
    ),
    Sf = de()({
        name: "VVirtualScroll",
        props: X0(),
        setup(e, t) {
            let { slots: n } = t;
            const l = je("VVirtualScroll"),
                { dimensionStyles: a } = Nt(e),
                {
                    containerRef: r,
                    markerRef: o,
                    handleScroll: i,
                    handleScrollend: s,
                    handleItemResize: u,
                    scrollToIndex: c,
                    paddingTop: d,
                    paddingBottom: f,
                    computedItems: v,
                } = G0(e, ce(e, "items"));
            return (
                mn(
                    () => e.renderless,
                    () => {
                        function g() {
                            var C, x;
                            const p = (
                                arguments.length > 0 && arguments[0] !== void 0
                                    ? arguments[0]
                                    : !1
                            )
                                ? "addEventListener"
                                : "removeEventListener";
                            r.value === document.documentElement
                                ? (document[p]("scroll", i, { passive: !0 }),
                                  document[p]("scrollend", s))
                                : ((C = r.value) == null ||
                                      C[p]("scroll", i, { passive: !0 }),
                                  (x = r.value) == null ||
                                      x[p]("scrollend", s));
                        }
                        Qt(() => {
                            (r.value = ed(l.vnode.el, !0)), g(!0);
                        }),
                            ct(g);
                    }
                ),
                Se(() => {
                    const g = v.value.map((m) =>
                        h(
                            D0,
                            {
                                key: m.index,
                                renderless: e.renderless,
                                "onUpdate:height": (p) => u(m.index, p),
                            },
                            {
                                default: (p) => {
                                    var C;
                                    return (C = n.default) == null
                                        ? void 0
                                        : C.call(n, {
                                              item: m.raw,
                                              index: m.index,
                                              ...p,
                                          });
                                },
                            }
                        )
                    );
                    return e.renderless
                        ? h(we, null, [
                              h(
                                  "div",
                                  {
                                      ref: o,
                                      class: "v-virtual-scroll__spacer",
                                      style: { paddingTop: me(d.value) },
                                  },
                                  null
                              ),
                              g,
                              h(
                                  "div",
                                  {
                                      class: "v-virtual-scroll__spacer",
                                      style: { paddingBottom: me(f.value) },
                                  },
                                  null
                              ),
                          ])
                        : h(
                              "div",
                              {
                                  ref: r,
                                  class: ["v-virtual-scroll", e.class],
                                  onScrollPassive: i,
                                  onScrollend: s,
                                  style: [a.value, e.style],
                              },
                              [
                                  h(
                                      "div",
                                      {
                                          ref: o,
                                          class: "v-virtual-scroll__container",
                                          style: {
                                              paddingTop: me(d.value),
                                              paddingBottom: me(f.value),
                                          },
                                      },
                                      [g]
                                  ),
                              ]
                          );
                }),
                { scrollToIndex: c }
            );
        },
    });
function Cf(e, t) {
    const n = oe(!1);
    let l;
    function a(i) {
        cancelAnimationFrame(l),
            (n.value = !0),
            (l = requestAnimationFrame(() => {
                l = requestAnimationFrame(() => {
                    n.value = !1;
                });
            }));
    }
    async function r() {
        await new Promise((i) => requestAnimationFrame(i)),
            await new Promise((i) => requestAnimationFrame(i)),
            await new Promise((i) => requestAnimationFrame(i)),
            await new Promise((i) => {
                if (n.value) {
                    const s = ue(n, () => {
                        s(), i();
                    });
                } else i();
            });
    }
    async function o(i) {
        var c, d;
        if (
            (i.key === "Tab" && ((c = t.value) == null || c.focus()),
            !["PageDown", "PageUp", "Home", "End"].includes(i.key))
        )
            return;
        const s = (d = e.value) == null ? void 0 : d.$el;
        if (!s) return;
        (i.key === "Home" || i.key === "End") &&
            s.scrollTo({
                top: i.key === "Home" ? 0 : s.scrollHeight,
                behavior: "smooth",
            }),
            await r();
        const u = s.querySelectorAll(
            ":scope > :not(.v-virtual-scroll__spacer)"
        );
        if (i.key === "PageDown" || i.key === "Home") {
            const f = s.getBoundingClientRect().top;
            for (const v of u)
                if (v.getBoundingClientRect().top >= f) {
                    v.focus();
                    break;
                }
        } else {
            const f = s.getBoundingClientRect().bottom;
            for (const v of [...u].reverse())
                if (v.getBoundingClientRect().bottom <= f) {
                    v.focus();
                    break;
                }
        }
    }
    return { onListScroll: a, onListKeydown: o };
}
const kf = q(
        {
            chips: Boolean,
            closableChips: Boolean,
            closeText: { type: String, default: "$vuetify.close" },
            openText: { type: String, default: "$vuetify.open" },
            eager: Boolean,
            hideNoData: Boolean,
            hideSelected: Boolean,
            listProps: { type: Object },
            menu: Boolean,
            menuIcon: { type: Ee, default: "$dropdown" },
            menuProps: { type: Object },
            multiple: Boolean,
            noDataText: { type: String, default: "$vuetify.noDataText" },
            openOnClear: Boolean,
            itemColor: String,
            ...Wd({ itemChildren: !1 }),
        },
        "Select"
    ),
    j0 = q(
        {
            ...kf(),
            ...On(vi({ modelValue: null, role: "combobox" }), [
                "validationValue",
                "dirty",
                "appendInnerIcon",
            ]),
            ...fl({ transition: { component: hd } }),
        },
        "VSelect"
    );
de()({
    name: "VSelect",
    props: j0(),
    emits: {
        "update:focused": (e) => !0,
        "update:modelValue": (e) => !0,
        "update:menu": (e) => !0,
    },
    setup(e, t) {
        let { slots: n } = t;
        const { t: l } = Yl(),
            a = le(),
            r = le(),
            o = le(),
            i = Be(e, "menu"),
            s = S({
                get: () => i.value,
                set: (H) => {
                    var X;
                    (i.value &&
                        !H &&
                        (X = r.value) != null &&
                        X.ΨopenChildren) ||
                        (i.value = H);
                },
            }),
            { items: u, transformIn: c, transformOut: d } = Kd(e),
            f = Be(
                e,
                "modelValue",
                [],
                (H) => c(H === null ? [null] : ot(H)),
                (H) => {
                    const X = d(H);
                    return e.multiple ? X : X[0] ?? null;
                }
            ),
            v = S(() =>
                typeof e.counterValue == "function"
                    ? e.counterValue(f.value)
                    : typeof e.counterValue == "number"
                    ? e.counterValue
                    : f.value.length
            ),
            g = fi(),
            m = S(() => f.value.map((H) => H.value)),
            p = oe(!1),
            C = S(() => (s.value ? e.closeText : e.openText));
        let x = "",
            _;
        const T = S(() =>
                e.hideSelected
                    ? u.value.filter(
                          (H) => !f.value.some((X) => e.valueComparator(X, H))
                      )
                    : u.value
            ),
            k = S(
                () =>
                    (e.hideNoData && !T.value.length) ||
                    e.readonly ||
                    (g == null ? void 0 : g.isReadonly.value)
            ),
            A = S(() => {
                var H;
                return {
                    ...e.menuProps,
                    activatorProps: {
                        ...(((H = e.menuProps) == null
                            ? void 0
                            : H.activatorProps) || {}),
                        "aria-haspopup": "listbox",
                    },
                };
            }),
            w = le(),
            { onListScroll: L, onListKeydown: E } = Cf(w, a);
        function V(H) {
            e.openOnClear && (s.value = !0);
        }
        function R() {
            k.value || (s.value = !s.value);
        }
        function M(H) {
            var ie, pe;
            if (!H.key || e.readonly || (g != null && g.isReadonly.value))
                return;
            ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(
                H.key
            ) && H.preventDefault(),
                ["Enter", "ArrowDown", " "].includes(H.key) && (s.value = !0),
                ["Escape", "Tab"].includes(H.key) && (s.value = !1),
                H.key === "Home"
                    ? (ie = w.value) == null || ie.focus("first")
                    : H.key === "End" &&
                      ((pe = w.value) == null || pe.focus("last"));
            const X = 1e3;
            function F(Ce) {
                const ae = Ce.key.length === 1,
                    I = !Ce.ctrlKey && !Ce.metaKey && !Ce.altKey;
                return ae && I;
            }
            if (e.multiple || !F(H)) return;
            const z = performance.now();
            z - _ > X && (x = ""), (x += H.key.toLowerCase()), (_ = z);
            const J = u.value.find((Ce) =>
                Ce.title.toLowerCase().startsWith(x)
            );
            if (J !== void 0) {
                f.value = [J];
                const Ce = T.value.indexOf(J);
                Ve &&
                    window.requestAnimationFrame(() => {
                        var ae;
                        Ce >= 0 &&
                            ((ae = o.value) == null || ae.scrollToIndex(Ce));
                    });
            }
        }
        function B(H) {
            let X =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : !0;
            if (!H.props.disabled)
                if (e.multiple) {
                    const F = f.value.findIndex((J) =>
                            e.valueComparator(J.value, H.value)
                        ),
                        z = X ?? !~F;
                    if (~F) {
                        const J = z ? [...f.value, H] : [...f.value];
                        J.splice(F, 1), (f.value = J);
                    } else z && (f.value = [...f.value, H]);
                } else {
                    const F = X !== !1;
                    (f.value = F ? [H] : []),
                        Ge(() => {
                            s.value = !1;
                        });
                }
        }
        function $(H) {
            var X;
            ((X = w.value) != null && X.$el.contains(H.relatedTarget)) ||
                (s.value = !1);
        }
        function Z() {
            var H;
            p.value && ((H = a.value) == null || H.focus());
        }
        function ee(H) {
            p.value = !0;
        }
        function ne(H) {
            if (H == null) f.value = [];
            else if (
                el(a.value, ":autofill") ||
                el(a.value, ":-webkit-autofill")
            ) {
                const X = u.value.find((F) => F.title === H);
                X && B(X);
            } else a.value && (a.value.value = "");
        }
        return (
            ue(s, () => {
                if (!e.hideSelected && s.value && f.value.length) {
                    const H = T.value.findIndex((X) =>
                        f.value.some((F) => e.valueComparator(F.value, X.value))
                    );
                    Ve &&
                        window.requestAnimationFrame(() => {
                            var X;
                            H >= 0 &&
                                ((X = o.value) == null || X.scrollToIndex(H));
                        });
                }
            }),
            ue(
                () => e.items,
                (H, X) => {
                    s.value ||
                        (p.value && !X.length && H.length && (s.value = !0));
                }
            ),
            Se(() => {
                const H = !!(e.chips || n.chip),
                    X = !!(
                        !e.hideNoData ||
                        T.value.length ||
                        n["prepend-item"] ||
                        n["append-item"] ||
                        n["no-data"]
                    ),
                    F = f.value.length > 0,
                    z = al.filterProps(e),
                    J =
                        F || (!p.value && e.label && !e.persistentPlaceholder)
                            ? void 0
                            : e.placeholder;
                return h(
                    al,
                    ke({ ref: a }, z, {
                        modelValue: f.value
                            .map((ie) => ie.props.value)
                            .join(", "),
                        "onUpdate:modelValue": ne,
                        focused: p.value,
                        "onUpdate:focused": (ie) => (p.value = ie),
                        validationValue: f.externalValue,
                        counterValue: v.value,
                        dirty: F,
                        class: [
                            "v-select",
                            {
                                "v-select--active-menu": s.value,
                                "v-select--chips": !!e.chips,
                                [`v-select--${
                                    e.multiple ? "multiple" : "single"
                                }`]: !0,
                                "v-select--selected": f.value.length,
                                "v-select--selection-slot": !!n.selection,
                            },
                            e.class,
                        ],
                        style: e.style,
                        inputmode: "none",
                        placeholder: J,
                        "onClick:clear": V,
                        "onMousedown:control": R,
                        onBlur: $,
                        onKeydown: M,
                        "aria-label": l(C.value),
                        title: l(C.value),
                    }),
                    {
                        ...n,
                        default: () =>
                            h(we, null, [
                                h(
                                    di,
                                    ke(
                                        {
                                            ref: r,
                                            modelValue: s.value,
                                            "onUpdate:modelValue": (ie) =>
                                                (s.value = ie),
                                            activator: "parent",
                                            contentClass: "v-select__content",
                                            disabled: k.value,
                                            eager: e.eager,
                                            maxHeight: 310,
                                            openOnClick: !1,
                                            closeOnContentClick: !1,
                                            transition: e.transition,
                                            onAfterLeave: Z,
                                        },
                                        A.value
                                    ),
                                    {
                                        default: () => [
                                            X &&
                                                h(
                                                    ci,
                                                    ke(
                                                        {
                                                            ref: w,
                                                            selected: m.value,
                                                            selectStrategy:
                                                                e.multiple
                                                                    ? "independent"
                                                                    : "single-independent",
                                                            onMousedown: (ie) =>
                                                                ie.preventDefault(),
                                                            onKeydown: E,
                                                            onFocusin: ee,
                                                            onScrollPassive: L,
                                                            tabindex: "-1",
                                                            "aria-live":
                                                                "polite",
                                                            color:
                                                                e.itemColor ??
                                                                e.color,
                                                        },
                                                        e.listProps
                                                    ),
                                                    {
                                                        default: () => {
                                                            var ie, pe, Ce;
                                                            return [
                                                                (ie =
                                                                    n[
                                                                        "prepend-item"
                                                                    ]) == null
                                                                    ? void 0
                                                                    : ie.call(
                                                                          n
                                                                      ),
                                                                !T.value
                                                                    .length &&
                                                                    !e.hideNoData &&
                                                                    (((pe =
                                                                        n[
                                                                            "no-data"
                                                                        ]) ==
                                                                    null
                                                                        ? void 0
                                                                        : pe.call(
                                                                              n
                                                                          )) ??
                                                                        h(
                                                                            ll,
                                                                            {
                                                                                title: l(
                                                                                    e.noDataText
                                                                                ),
                                                                            },
                                                                            null
                                                                        )),
                                                                h(
                                                                    Sf,
                                                                    {
                                                                        ref: o,
                                                                        renderless:
                                                                            !0,
                                                                        items: T.value,
                                                                    },
                                                                    {
                                                                        default:
                                                                            (
                                                                                ae
                                                                            ) => {
                                                                                var re;
                                                                                let {
                                                                                    item: I,
                                                                                    index: W,
                                                                                    itemRef:
                                                                                        j,
                                                                                } = ae;
                                                                                const N =
                                                                                    ke(
                                                                                        I.props,
                                                                                        {
                                                                                            ref: j,
                                                                                            key: W,
                                                                                            onClick:
                                                                                                () =>
                                                                                                    B(
                                                                                                        I,
                                                                                                        null
                                                                                                    ),
                                                                                        }
                                                                                    );
                                                                                return (
                                                                                    ((re =
                                                                                        n.item) ==
                                                                                    null
                                                                                        ? void 0
                                                                                        : re.call(
                                                                                              n,
                                                                                              {
                                                                                                  item: I,
                                                                                                  index: W,
                                                                                                  props: N,
                                                                                              }
                                                                                          )) ??
                                                                                    h(
                                                                                        ll,
                                                                                        ke(
                                                                                            N,
                                                                                            {
                                                                                                role: "option",
                                                                                            }
                                                                                        ),
                                                                                        {
                                                                                            prepend:
                                                                                                (
                                                                                                    he
                                                                                                ) => {
                                                                                                    let {
                                                                                                        isSelected:
                                                                                                            y,
                                                                                                    } =
                                                                                                        he;
                                                                                                    return h(
                                                                                                        we,
                                                                                                        null,
                                                                                                        [
                                                                                                            e.multiple &&
                                                                                                            !e.hideSelected
                                                                                                                ? h(
                                                                                                                      sf,
                                                                                                                      {
                                                                                                                          key: I.value,
                                                                                                                          modelValue:
                                                                                                                              y,
                                                                                                                          ripple: !1,
                                                                                                                          tabindex:
                                                                                                                              "-1",
                                                                                                                      },
                                                                                                                      null
                                                                                                                  )
                                                                                                                : void 0,
                                                                                                            I
                                                                                                                .props
                                                                                                                .prependAvatar &&
                                                                                                                h(
                                                                                                                    hn,
                                                                                                                    {
                                                                                                                        image: I
                                                                                                                            .props
                                                                                                                            .prependAvatar,
                                                                                                                    },
                                                                                                                    null
                                                                                                                ),
                                                                                                            I
                                                                                                                .props
                                                                                                                .prependIcon &&
                                                                                                                h(
                                                                                                                    Ne,
                                                                                                                    {
                                                                                                                        icon: I
                                                                                                                            .props
                                                                                                                            .prependIcon,
                                                                                                                    },
                                                                                                                    null
                                                                                                                ),
                                                                                                        ]
                                                                                                    );
                                                                                                },
                                                                                        }
                                                                                    )
                                                                                );
                                                                            },
                                                                    }
                                                                ),
                                                                (Ce =
                                                                    n[
                                                                        "append-item"
                                                                    ]) == null
                                                                    ? void 0
                                                                    : Ce.call(
                                                                          n
                                                                      ),
                                                            ];
                                                        },
                                                    }
                                                ),
                                        ],
                                    }
                                ),
                                f.value.map((ie, pe) => {
                                    function Ce(j) {
                                        j.stopPropagation(),
                                            j.preventDefault(),
                                            B(ie, !1);
                                    }
                                    const ae = {
                                            "onClick:close": Ce,
                                            onKeydown(j) {
                                                (j.key !== "Enter" &&
                                                    j.key !== " ") ||
                                                    (j.preventDefault(),
                                                    j.stopPropagation(),
                                                    Ce(j));
                                            },
                                            onMousedown(j) {
                                                j.preventDefault(),
                                                    j.stopPropagation();
                                            },
                                            modelValue: !0,
                                            "onUpdate:modelValue": void 0,
                                        },
                                        I = H ? !!n.chip : !!n.selection,
                                        W = I
                                            ? jo(
                                                  H
                                                      ? n.chip({
                                                            item: ie,
                                                            index: pe,
                                                            props: ae,
                                                        })
                                                      : n.selection({
                                                            item: ie,
                                                            index: pe,
                                                        })
                                              )
                                            : void 0;
                                    if (!(I && !W))
                                        return h(
                                            "div",
                                            {
                                                key: ie.value,
                                                class: "v-select__selection",
                                            },
                                            [
                                                H
                                                    ? n.chip
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "chip-defaults",
                                                                  defaults: {
                                                                      VChip: {
                                                                          closable:
                                                                              e.closableChips,
                                                                          size: "small",
                                                                          text: ie.title,
                                                                      },
                                                                  },
                                                              },
                                                              {
                                                                  default:
                                                                      () => [W],
                                                              }
                                                          )
                                                        : h(
                                                              yf,
                                                              ke(
                                                                  {
                                                                      key: "chip",
                                                                      closable:
                                                                          e.closableChips,
                                                                      size: "small",
                                                                      text: ie.title,
                                                                      disabled:
                                                                          ie
                                                                              .props
                                                                              .disabled,
                                                                  },
                                                                  ae
                                                              ),
                                                              null
                                                          )
                                                    : W ??
                                                      h(
                                                          "span",
                                                          {
                                                              class: "v-select__selection-text",
                                                          },
                                                          [
                                                              ie.title,
                                                              e.multiple &&
                                                                  pe <
                                                                      f.value
                                                                          .length -
                                                                          1 &&
                                                                  h(
                                                                      "span",
                                                                      {
                                                                          class: "v-select__selection-comma",
                                                                      },
                                                                      [jt(",")]
                                                                  ),
                                                          ]
                                                      ),
                                            ]
                                        );
                                }),
                            ]),
                        "append-inner": function () {
                            var ae;
                            for (
                                var ie = arguments.length,
                                    pe = new Array(ie),
                                    Ce = 0;
                                Ce < ie;
                                Ce++
                            )
                                pe[Ce] = arguments[Ce];
                            return h(we, null, [
                                (ae = n["append-inner"]) == null
                                    ? void 0
                                    : ae.call(n, ...pe),
                                e.menuIcon
                                    ? h(
                                          Ne,
                                          {
                                              class: "v-select__menu-icon",
                                              icon: e.menuIcon,
                                          },
                                          null
                                      )
                                    : void 0,
                            ]);
                        },
                    }
                );
            }),
            Ja({ isFocused: p, menu: s, select: B }, a)
        );
    },
});
const W0 = (e, t, n) =>
        e == null || t == null
            ? -1
            : e
                  .toString()
                  .toLocaleLowerCase()
                  .indexOf(t.toString().toLocaleLowerCase()),
    U0 = q(
        {
            customFilter: Function,
            customKeyFilter: Object,
            filterKeys: [Array, String],
            filterMode: { type: String, default: "intersection" },
            noFilter: Boolean,
        },
        "filter"
    );
function K0(e, t, n) {
    var i;
    const l = [],
        a = (n == null ? void 0 : n.default) ?? W0,
        r = n != null && n.filterKeys ? ot(n.filterKeys) : !1,
        o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
    if (!(e != null && e.length)) return l;
    e: for (let s = 0; s < e.length; s++) {
        const [u, c = u] = ot(e[s]),
            d = {},
            f = {};
        let v = -1;
        if ((t || o > 0) && !(n != null && n.noFilter)) {
            if (typeof u == "object") {
                const p = r || Object.keys(c);
                for (const C of p) {
                    const x = Ot(c, C),
                        _ =
                            (i = n == null ? void 0 : n.customKeyFilter) == null
                                ? void 0
                                : i[C];
                    if (
                        ((v = _ ? _(x, t, u) : a(x, t, u)),
                        v !== -1 && v !== !1)
                    )
                        _ ? (d[C] = v) : (f[C] = v);
                    else if ((n == null ? void 0 : n.filterMode) === "every")
                        continue e;
                }
            } else (v = a(u, t, u)), v !== -1 && v !== !1 && (f.title = v);
            const g = Object.keys(f).length,
                m = Object.keys(d).length;
            if (
                (!g && !m) ||
                ((n == null ? void 0 : n.filterMode) === "union" &&
                    m !== o &&
                    !g) ||
                ((n == null ? void 0 : n.filterMode) === "intersection" &&
                    (m !== o || !g))
            )
                continue;
        }
        l.push({ index: s, matches: { ...f, ...d } });
    }
    return l;
}
function Y0(e, t, n, l) {
    const a = le([]),
        r = le(new Map()),
        o = S(() => Xe(t));
    mt(() => {
        const s = typeof n == "function" ? n() : Xe(n),
            u = typeof s != "string" && typeof s != "number" ? "" : String(s),
            c = K0(o.value, u, {
                customKeyFilter: {
                    ...e.customKeyFilter,
                    ...Xe(l == null ? void 0 : l.customKeyFilter),
                },
                default: e.customFilter,
                filterKeys: e.filterKeys,
                filterMode: e.filterMode,
                noFilter: e.noFilter,
            }),
            d = Xe(t),
            f = [],
            v = new Map();
        c.forEach((g) => {
            let { index: m, matches: p } = g;
            const C = d[m];
            f.push(C), v.set(C.value, p);
        }),
            (a.value = f),
            (r.value = v);
    });
    function i(s) {
        return r.value.get(s.value);
    }
    return { filteredItems: a, filteredMatches: r, getMatches: i };
}
function q0(e, t, n) {
    if (t == null) return e;
    if (Array.isArray(t))
        throw new Error("Multiple matches is not implemented");
    return typeof t == "number" && ~t
        ? h(we, null, [
              h("span", { class: "v-autocomplete__unmask" }, [e.substr(0, t)]),
              h("span", { class: "v-autocomplete__mask" }, [e.substr(t, n)]),
              h("span", { class: "v-autocomplete__unmask" }, [e.substr(t + n)]),
          ])
        : e;
}
const Q0 = q(
        {
            autoSelectFirst: { type: [Boolean, String] },
            clearOnSelect: Boolean,
            search: String,
            ...U0({ filterKeys: ["title"] }),
            ...kf(),
            ...On(vi({ modelValue: null, role: "combobox" }), [
                "validationValue",
                "dirty",
                "appendInnerIcon",
            ]),
            ...fl({ transition: !1 }),
        },
        "VAutocomplete"
    ),
    Ar = de()({
        name: "VAutocomplete",
        props: Q0(),
        emits: {
            "update:focused": (e) => !0,
            "update:search": (e) => !0,
            "update:modelValue": (e) => !0,
            "update:menu": (e) => !0,
        },
        setup(e, t) {
            let { slots: n } = t;
            const { t: l } = Yl(),
                a = le(),
                r = oe(!1),
                o = oe(!0),
                i = oe(!1),
                s = le(),
                u = le(),
                c = Be(e, "menu"),
                d = S({
                    get: () => c.value,
                    set: (N) => {
                        var re;
                        (c.value &&
                            !N &&
                            (re = s.value) != null &&
                            re.ΨopenChildren) ||
                            (c.value = N);
                    },
                }),
                f = oe(-1),
                v = S(() => {
                    var N;
                    return (N = a.value) == null ? void 0 : N.color;
                }),
                g = S(() => (d.value ? e.closeText : e.openText)),
                { items: m, transformIn: p, transformOut: C } = Kd(e),
                { textColorClasses: x, textColorStyles: _ } = Mt(v),
                T = Be(e, "search", ""),
                k = Be(
                    e,
                    "modelValue",
                    [],
                    (N) => p(N === null ? [null] : ot(N)),
                    (N) => {
                        const re = C(N);
                        return e.multiple ? re : re[0] ?? null;
                    }
                ),
                A = S(() =>
                    typeof e.counterValue == "function"
                        ? e.counterValue(k.value)
                        : typeof e.counterValue == "number"
                        ? e.counterValue
                        : k.value.length
                ),
                w = fi(),
                { filteredItems: L, getMatches: E } = Y0(e, m, () =>
                    o.value ? "" : T.value
                ),
                V = S(() =>
                    e.hideSelected
                        ? L.value.filter(
                              (N) => !k.value.some((re) => re.value === N.value)
                          )
                        : L.value
                ),
                R = S(() => !!(e.chips || n.chip)),
                M = S(() => R.value || !!n.selection),
                B = S(() => k.value.map((N) => N.props.value)),
                $ = S(() => {
                    var re;
                    return (
                        (e.autoSelectFirst === !0 ||
                            (e.autoSelectFirst === "exact" &&
                                T.value ===
                                    ((re = V.value[0]) == null
                                        ? void 0
                                        : re.title))) &&
                        V.value.length > 0 &&
                        !o.value &&
                        !i.value
                    );
                }),
                Z = S(
                    () =>
                        (e.hideNoData && !V.value.length) ||
                        e.readonly ||
                        (w == null ? void 0 : w.isReadonly.value)
                ),
                ee = le(),
                { onListScroll: ne, onListKeydown: H } = Cf(ee, a);
            function X(N) {
                e.openOnClear && (d.value = !0), (T.value = "");
            }
            function F() {
                Z.value || (d.value = !0);
            }
            function z(N) {
                Z.value ||
                    (r.value && (N.preventDefault(), N.stopPropagation()),
                    (d.value = !d.value));
            }
            function J(N) {
                var y, b, P;
                if (e.readonly || (w != null && w.isReadonly.value)) return;
                const re = a.value.selectionStart,
                    he = k.value.length;
                if (
                    ((f.value > -1 ||
                        ["Enter", "ArrowDown", "ArrowUp"].includes(N.key)) &&
                        N.preventDefault(),
                    ["Enter", "ArrowDown"].includes(N.key) && (d.value = !0),
                    ["Escape"].includes(N.key) && (d.value = !1),
                    $.value &&
                        ["Enter", "Tab"].includes(N.key) &&
                        !k.value.some((D) => {
                            let { value: O } = D;
                            return O === V.value[0].value;
                        }) &&
                        j(V.value[0]),
                    N.key === "ArrowDown" &&
                        $.value &&
                        ((y = ee.value) == null || y.focus("next")),
                    ["Backspace", "Delete"].includes(N.key))
                ) {
                    if (
                        !e.multiple &&
                        M.value &&
                        k.value.length > 0 &&
                        !T.value
                    )
                        return j(k.value[0], !1);
                    if (~f.value) {
                        const D = f.value;
                        j(k.value[f.value], !1),
                            (f.value = D >= he - 1 ? he - 2 : D);
                    } else
                        N.key === "Backspace" && !T.value && (f.value = he - 1);
                }
                if (e.multiple) {
                    if (N.key === "ArrowLeft") {
                        if (f.value < 0 && re > 0) return;
                        const D = f.value > -1 ? f.value - 1 : he - 1;
                        k.value[D]
                            ? (f.value = D)
                            : ((f.value = -1),
                              a.value.setSelectionRange(
                                  (b = T.value) == null ? void 0 : b.length,
                                  (P = T.value) == null ? void 0 : P.length
                              ));
                    }
                    if (N.key === "ArrowRight") {
                        if (f.value < 0) return;
                        const D = f.value + 1;
                        k.value[D]
                            ? (f.value = D)
                            : ((f.value = -1), a.value.setSelectionRange(0, 0));
                    }
                }
            }
            function ie(N) {
                if (
                    el(a.value, ":autofill") ||
                    el(a.value, ":-webkit-autofill")
                ) {
                    const re = m.value.find(
                        (he) => he.title === N.target.value
                    );
                    re && j(re);
                }
            }
            function pe() {
                var N;
                r.value && ((o.value = !0), (N = a.value) == null || N.focus());
            }
            function Ce(N) {
                (r.value = !0),
                    setTimeout(() => {
                        i.value = !0;
                    });
            }
            function ae(N) {
                i.value = !1;
            }
            function I(N) {
                (N == null || (N === "" && !e.multiple && !M.value)) &&
                    (k.value = []);
            }
            const W = oe(!1);
            function j(N) {
                let re =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : !0;
                if (!(!N || N.props.disabled))
                    if (e.multiple) {
                        const he = k.value.findIndex((b) =>
                                e.valueComparator(b.value, N.value)
                            ),
                            y = re ?? !~he;
                        if (~he) {
                            const b = y ? [...k.value, N] : [...k.value];
                            b.splice(he, 1), (k.value = b);
                        } else y && (k.value = [...k.value, N]);
                        e.clearOnSelect && (T.value = "");
                    } else {
                        const he = re !== !1;
                        (k.value = he ? [N] : []),
                            (T.value = he && !M.value ? N.title : ""),
                            Ge(() => {
                                (d.value = !1), (o.value = !0);
                            });
                    }
            }
            return (
                ue(r, (N, re) => {
                    var he;
                    N !== re &&
                        (N
                            ? ((W.value = !0),
                              (T.value =
                                  e.multiple || M.value
                                      ? ""
                                      : String(
                                            ((he = k.value.at(-1)) == null
                                                ? void 0
                                                : he.props.title) ?? ""
                                        )),
                              (o.value = !0),
                              Ge(() => (W.value = !1)))
                            : (!e.multiple && T.value == null && (k.value = []),
                              (d.value = !1),
                              k.value.some((y) => {
                                  let { title: b } = y;
                                  return b === T.value;
                              }) || (T.value = ""),
                              (f.value = -1)));
                }),
                ue(T, (N) => {
                    !r.value ||
                        W.value ||
                        (N && (d.value = !0), (o.value = !N));
                }),
                ue(d, () => {
                    if (!e.hideSelected && d.value && k.value.length) {
                        const N = V.value.findIndex((re) =>
                            k.value.some((he) => re.value === he.value)
                        );
                        Ve &&
                            window.requestAnimationFrame(() => {
                                var re;
                                N >= 0 &&
                                    ((re = u.value) == null ||
                                        re.scrollToIndex(N));
                            });
                    }
                }),
                ue(
                    () => e.items,
                    (N, re) => {
                        d.value ||
                            (r.value &&
                                !re.length &&
                                N.length &&
                                (d.value = !0));
                    }
                ),
                Se(() => {
                    const N = !!(
                            !e.hideNoData ||
                            V.value.length ||
                            n["prepend-item"] ||
                            n["append-item"] ||
                            n["no-data"]
                        ),
                        re = k.value.length > 0,
                        he = al.filterProps(e);
                    return h(
                        al,
                        ke({ ref: a }, he, {
                            modelValue: T.value,
                            "onUpdate:modelValue": [(y) => (T.value = y), I],
                            focused: r.value,
                            "onUpdate:focused": (y) => (r.value = y),
                            validationValue: k.externalValue,
                            counterValue: A.value,
                            dirty: re,
                            onChange: ie,
                            class: [
                                "v-autocomplete",
                                `v-autocomplete--${
                                    e.multiple ? "multiple" : "single"
                                }`,
                                {
                                    "v-autocomplete--active-menu": d.value,
                                    "v-autocomplete--chips": !!e.chips,
                                    "v-autocomplete--selection-slot": !!M.value,
                                    "v-autocomplete--selecting-index":
                                        f.value > -1,
                                },
                                e.class,
                            ],
                            style: e.style,
                            readonly: e.readonly,
                            placeholder: re ? void 0 : e.placeholder,
                            "onClick:clear": X,
                            "onMousedown:control": F,
                            onKeydown: J,
                        }),
                        {
                            ...n,
                            default: () =>
                                h(we, null, [
                                    h(
                                        di,
                                        ke(
                                            {
                                                ref: s,
                                                modelValue: d.value,
                                                "onUpdate:modelValue": (y) =>
                                                    (d.value = y),
                                                activator: "parent",
                                                contentClass:
                                                    "v-autocomplete__content",
                                                disabled: Z.value,
                                                eager: e.eager,
                                                maxHeight: 310,
                                                openOnClick: !1,
                                                closeOnContentClick: !1,
                                                transition: e.transition,
                                                onAfterLeave: pe,
                                            },
                                            e.menuProps
                                        ),
                                        {
                                            default: () => [
                                                N &&
                                                    h(
                                                        ci,
                                                        ke(
                                                            {
                                                                ref: ee,
                                                                selected:
                                                                    B.value,
                                                                selectStrategy:
                                                                    e.multiple
                                                                        ? "independent"
                                                                        : "single-independent",
                                                                onMousedown: (
                                                                    y
                                                                ) =>
                                                                    y.preventDefault(),
                                                                onKeydown: H,
                                                                onFocusin: Ce,
                                                                onFocusout: ae,
                                                                onScrollPassive:
                                                                    ne,
                                                                tabindex: "-1",
                                                                "aria-live":
                                                                    "polite",
                                                                color:
                                                                    e.itemColor ??
                                                                    e.color,
                                                            },
                                                            e.listProps
                                                        ),
                                                        {
                                                            default: () => {
                                                                var y, b, P;
                                                                return [
                                                                    (y =
                                                                        n[
                                                                            "prepend-item"
                                                                        ]) ==
                                                                    null
                                                                        ? void 0
                                                                        : y.call(
                                                                              n
                                                                          ),
                                                                    !V.value
                                                                        .length &&
                                                                        !e.hideNoData &&
                                                                        (((b =
                                                                            n[
                                                                                "no-data"
                                                                            ]) ==
                                                                        null
                                                                            ? void 0
                                                                            : b.call(
                                                                                  n
                                                                              )) ??
                                                                            h(
                                                                                ll,
                                                                                {
                                                                                    title: l(
                                                                                        e.noDataText
                                                                                    ),
                                                                                },
                                                                                null
                                                                            )),
                                                                    h(
                                                                        Sf,
                                                                        {
                                                                            ref: u,
                                                                            renderless:
                                                                                !0,
                                                                            items: V.value,
                                                                        },
                                                                        {
                                                                            default:
                                                                                (
                                                                                    D
                                                                                ) => {
                                                                                    var Q;
                                                                                    let {
                                                                                        item: O,
                                                                                        index: U,
                                                                                        itemRef:
                                                                                            Y,
                                                                                    } = D;
                                                                                    const K =
                                                                                        ke(
                                                                                            O.props,
                                                                                            {
                                                                                                ref: Y,
                                                                                                key: U,
                                                                                                active:
                                                                                                    $.value &&
                                                                                                    U ===
                                                                                                        0
                                                                                                        ? !0
                                                                                                        : void 0,
                                                                                                onClick:
                                                                                                    () =>
                                                                                                        j(
                                                                                                            O,
                                                                                                            null
                                                                                                        ),
                                                                                            }
                                                                                        );
                                                                                    return (
                                                                                        ((Q =
                                                                                            n.item) ==
                                                                                        null
                                                                                            ? void 0
                                                                                            : Q.call(
                                                                                                  n,
                                                                                                  {
                                                                                                      item: O,
                                                                                                      index: U,
                                                                                                      props: K,
                                                                                                  }
                                                                                              )) ??
                                                                                        h(
                                                                                            ll,
                                                                                            ke(
                                                                                                K,
                                                                                                {
                                                                                                    role: "option",
                                                                                                }
                                                                                            ),
                                                                                            {
                                                                                                prepend:
                                                                                                    (
                                                                                                        G
                                                                                                    ) => {
                                                                                                        let {
                                                                                                            isSelected:
                                                                                                                te,
                                                                                                        } =
                                                                                                            G;
                                                                                                        return h(
                                                                                                            we,
                                                                                                            null,
                                                                                                            [
                                                                                                                e.multiple &&
                                                                                                                !e.hideSelected
                                                                                                                    ? h(
                                                                                                                          sf,
                                                                                                                          {
                                                                                                                              key: O.value,
                                                                                                                              modelValue:
                                                                                                                                  te,
                                                                                                                              ripple: !1,
                                                                                                                              tabindex:
                                                                                                                                  "-1",
                                                                                                                          },
                                                                                                                          null
                                                                                                                      )
                                                                                                                    : void 0,
                                                                                                                O
                                                                                                                    .props
                                                                                                                    .prependAvatar &&
                                                                                                                    h(
                                                                                                                        hn,
                                                                                                                        {
                                                                                                                            image: O
                                                                                                                                .props
                                                                                                                                .prependAvatar,
                                                                                                                        },
                                                                                                                        null
                                                                                                                    ),
                                                                                                                O
                                                                                                                    .props
                                                                                                                    .prependIcon &&
                                                                                                                    h(
                                                                                                                        Ne,
                                                                                                                        {
                                                                                                                            icon: O
                                                                                                                                .props
                                                                                                                                .prependIcon,
                                                                                                                        },
                                                                                                                        null
                                                                                                                    ),
                                                                                                            ]
                                                                                                        );
                                                                                                    },
                                                                                                title: () => {
                                                                                                    var G,
                                                                                                        te;
                                                                                                    return o.value
                                                                                                        ? O.title
                                                                                                        : q0(
                                                                                                              O.title,
                                                                                                              (G =
                                                                                                                  E(
                                                                                                                      O
                                                                                                                  )) ==
                                                                                                                  null
                                                                                                                  ? void 0
                                                                                                                  : G.title,
                                                                                                              ((te =
                                                                                                                  T.value) ==
                                                                                                              null
                                                                                                                  ? void 0
                                                                                                                  : te.length) ??
                                                                                                                  0
                                                                                                          );
                                                                                                },
                                                                                            }
                                                                                        )
                                                                                    );
                                                                                },
                                                                        }
                                                                    ),
                                                                    (P =
                                                                        n[
                                                                            "append-item"
                                                                        ]) ==
                                                                    null
                                                                        ? void 0
                                                                        : P.call(
                                                                              n
                                                                          ),
                                                                ];
                                                            },
                                                        }
                                                    ),
                                            ],
                                        }
                                    ),
                                    k.value.map((y, b) => {
                                        function P(Y) {
                                            Y.stopPropagation(),
                                                Y.preventDefault(),
                                                j(y, !1);
                                        }
                                        const D = {
                                                "onClick:close": P,
                                                onKeydown(Y) {
                                                    (Y.key !== "Enter" &&
                                                        Y.key !== " ") ||
                                                        (Y.preventDefault(),
                                                        Y.stopPropagation(),
                                                        P(Y));
                                                },
                                                onMousedown(Y) {
                                                    Y.preventDefault(),
                                                        Y.stopPropagation();
                                                },
                                                modelValue: !0,
                                                "onUpdate:modelValue": void 0,
                                            },
                                            O = R.value
                                                ? !!n.chip
                                                : !!n.selection,
                                            U = O
                                                ? jo(
                                                      R.value
                                                          ? n.chip({
                                                                item: y,
                                                                index: b,
                                                                props: D,
                                                            })
                                                          : n.selection({
                                                                item: y,
                                                                index: b,
                                                            })
                                                  )
                                                : void 0;
                                        if (!(O && !U))
                                            return h(
                                                "div",
                                                {
                                                    key: y.value,
                                                    class: [
                                                        "v-autocomplete__selection",
                                                        b === f.value && [
                                                            "v-autocomplete__selection--selected",
                                                            x.value,
                                                        ],
                                                    ],
                                                    style:
                                                        b === f.value
                                                            ? _.value
                                                            : {},
                                                },
                                                [
                                                    R.value
                                                        ? n.chip
                                                            ? h(
                                                                  Fe,
                                                                  {
                                                                      key: "chip-defaults",
                                                                      defaults:
                                                                          {
                                                                              VChip: {
                                                                                  closable:
                                                                                      e.closableChips,
                                                                                  size: "small",
                                                                                  text: y.title,
                                                                              },
                                                                          },
                                                                  },
                                                                  {
                                                                      default:
                                                                          () => [
                                                                              U,
                                                                          ],
                                                                  }
                                                              )
                                                            : h(
                                                                  yf,
                                                                  ke(
                                                                      {
                                                                          key: "chip",
                                                                          closable:
                                                                              e.closableChips,
                                                                          size: "small",
                                                                          text: y.title,
                                                                          disabled:
                                                                              y
                                                                                  .props
                                                                                  .disabled,
                                                                      },
                                                                      D
                                                                  ),
                                                                  null
                                                              )
                                                        : U ??
                                                          h(
                                                              "span",
                                                              {
                                                                  class: "v-autocomplete__selection-text",
                                                              },
                                                              [
                                                                  y.title,
                                                                  e.multiple &&
                                                                      b <
                                                                          k
                                                                              .value
                                                                              .length -
                                                                              1 &&
                                                                      h(
                                                                          "span",
                                                                          {
                                                                              class: "v-autocomplete__selection-comma",
                                                                          },
                                                                          [
                                                                              jt(
                                                                                  ","
                                                                              ),
                                                                          ]
                                                                      ),
                                                              ]
                                                          ),
                                                ]
                                            );
                                    }),
                                ]),
                            "append-inner": function () {
                                var D;
                                for (
                                    var y = arguments.length,
                                        b = new Array(y),
                                        P = 0;
                                    P < y;
                                    P++
                                )
                                    b[P] = arguments[P];
                                return h(we, null, [
                                    (D = n["append-inner"]) == null
                                        ? void 0
                                        : D.call(n, ...b),
                                    e.menuIcon
                                        ? h(
                                              Ne,
                                              {
                                                  class: "v-autocomplete__menu-icon",
                                                  icon: e.menuIcon,
                                                  onMousedown: z,
                                                  onClick: bh,
                                                  "aria-label": l(g.value),
                                                  title: l(g.value),
                                                  tabindex: "-1",
                                              },
                                              null
                                          )
                                        : void 0,
                                ]);
                            },
                        }
                    );
                }),
                Ja(
                    {
                        isFocused: r,
                        isPristine: o,
                        menu: d,
                        search: T,
                        filteredItems: L,
                        select: j,
                    },
                    a
                )
            );
        },
    }),
    Z0 = de()({
        name: "VCardActions",
        props: Ae(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Fn({ VBtn: { slim: !0, variant: "text" } }),
                Se(() => {
                    var l;
                    return h(
                        "div",
                        { class: ["v-card-actions", e.class], style: e.style },
                        [(l = n.default) == null ? void 0 : l.call(n)]
                    );
                }),
                {}
            );
        },
    }),
    J0 = q({ opacity: [Number, String], ...Ae(), ...ze() }, "VCardSubtitle"),
    eb = de()({
        name: "VCardSubtitle",
        props: J0(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: ["v-card-subtitle", e.class],
                            style: [
                                { "--v-card-subtitle-opacity": e.opacity },
                                e.style,
                            ],
                        },
                        n
                    )
                ),
                {}
            );
        },
    }),
    tb = Ua("v-card-title"),
    nb = q(
        {
            appendAvatar: String,
            appendIcon: Ee,
            prependAvatar: String,
            prependIcon: Ee,
            subtitle: [String, Number],
            title: [String, Number],
            ...Ae(),
            ...Pt(),
        },
        "VCardItem"
    ),
    lb = de()({
        name: "VCardItem",
        props: nb(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() => {
                    var u;
                    const l = !!(e.prependAvatar || e.prependIcon),
                        a = !!(l || n.prepend),
                        r = !!(e.appendAvatar || e.appendIcon),
                        o = !!(r || n.append),
                        i = !!(e.title != null || n.title),
                        s = !!(e.subtitle != null || n.subtitle);
                    return h(
                        "div",
                        { class: ["v-card-item", e.class], style: e.style },
                        [
                            a &&
                                h(
                                    "div",
                                    {
                                        key: "prepend",
                                        class: "v-card-item__prepend",
                                    },
                                    [
                                        n.prepend
                                            ? h(
                                                  Fe,
                                                  {
                                                      key: "prepend-defaults",
                                                      disabled: !l,
                                                      defaults: {
                                                          VAvatar: {
                                                              density:
                                                                  e.density,
                                                              image: e.prependAvatar,
                                                          },
                                                          VIcon: {
                                                              density:
                                                                  e.density,
                                                              icon: e.prependIcon,
                                                          },
                                                      },
                                                  },
                                                  n.prepend
                                              )
                                            : h(we, null, [
                                                  e.prependAvatar &&
                                                      h(
                                                          hn,
                                                          {
                                                              key: "prepend-avatar",
                                                              density:
                                                                  e.density,
                                                              image: e.prependAvatar,
                                                          },
                                                          null
                                                      ),
                                                  e.prependIcon &&
                                                      h(
                                                          Ne,
                                                          {
                                                              key: "prepend-icon",
                                                              density:
                                                                  e.density,
                                                              icon: e.prependIcon,
                                                          },
                                                          null
                                                      ),
                                              ]),
                                    ]
                                ),
                            h("div", { class: "v-card-item__content" }, [
                                i &&
                                    h(
                                        tb,
                                        { key: "title" },
                                        {
                                            default: () => {
                                                var c;
                                                return [
                                                    ((c = n.title) == null
                                                        ? void 0
                                                        : c.call(n)) ?? e.title,
                                                ];
                                            },
                                        }
                                    ),
                                s &&
                                    h(
                                        eb,
                                        { key: "subtitle" },
                                        {
                                            default: () => {
                                                var c;
                                                return [
                                                    ((c = n.subtitle) == null
                                                        ? void 0
                                                        : c.call(n)) ??
                                                        e.subtitle,
                                                ];
                                            },
                                        }
                                    ),
                                (u = n.default) == null ? void 0 : u.call(n),
                            ]),
                            o &&
                                h(
                                    "div",
                                    {
                                        key: "append",
                                        class: "v-card-item__append",
                                    },
                                    [
                                        n.append
                                            ? h(
                                                  Fe,
                                                  {
                                                      key: "append-defaults",
                                                      disabled: !r,
                                                      defaults: {
                                                          VAvatar: {
                                                              density:
                                                                  e.density,
                                                              image: e.appendAvatar,
                                                          },
                                                          VIcon: {
                                                              density:
                                                                  e.density,
                                                              icon: e.appendIcon,
                                                          },
                                                      },
                                                  },
                                                  n.append
                                              )
                                            : h(we, null, [
                                                  e.appendIcon &&
                                                      h(
                                                          Ne,
                                                          {
                                                              key: "append-icon",
                                                              density:
                                                                  e.density,
                                                              icon: e.appendIcon,
                                                          },
                                                          null
                                                      ),
                                                  e.appendAvatar &&
                                                      h(
                                                          hn,
                                                          {
                                                              key: "append-avatar",
                                                              density:
                                                                  e.density,
                                                              image: e.appendAvatar,
                                                          },
                                                          null
                                                      ),
                                              ]),
                                    ]
                                ),
                        ]
                    );
                }),
                {}
            );
        },
    }),
    ab = q({ opacity: [Number, String], ...Ae(), ...ze() }, "VCardText"),
    rb = de()({
        name: "VCardText",
        props: ab(),
        setup(e, t) {
            let { slots: n } = t;
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: ["v-card-text", e.class],
                            style: [
                                { "--v-card-text-opacity": e.opacity },
                                e.style,
                            ],
                        },
                        n
                    )
                ),
                {}
            );
        },
    }),
    ob = q(
        {
            appendAvatar: String,
            appendIcon: Ee,
            disabled: Boolean,
            flat: Boolean,
            hover: Boolean,
            image: String,
            link: { type: Boolean, default: void 0 },
            prependAvatar: String,
            prependIcon: Ee,
            ripple: { type: [Boolean, Object], default: !0 },
            subtitle: [String, Number],
            text: [String, Number],
            title: [String, Number],
            ...Bn(),
            ...Ae(),
            ...Pt(),
            ...Ht(),
            ...bn(),
            ...ai(),
            ...Ya(),
            ...oi(),
            ...kt(),
            ...Za(),
            ...ze(),
            ...We(),
            ...Jt({ variant: "elevated" }),
        },
        "VCard"
    ),
    ou = de()({
        name: "VCard",
        directives: { Ripple: Zl },
        props: ob(),
        setup(e, t) {
            let { attrs: n, slots: l } = t;
            const { themeClasses: a } = Qe(e),
                { borderClasses: r } = Dn(e),
                { colorClasses: o, colorStyles: i, variantClasses: s } = ml(e),
                { densityClasses: u } = $t(e),
                { dimensionStyles: c } = Nt(e),
                { elevationClasses: d } = Sn(e),
                { loaderClasses: f } = ri(e),
                { locationStyles: v } = qa(e),
                { positionClasses: g } = ii(e),
                { roundedClasses: m } = wt(e),
                p = Qa(e, n),
                C = S(() => e.link !== !1 && p.isLink.value),
                x = S(
                    () =>
                        !e.disabled &&
                        e.link !== !1 &&
                        (e.link || p.isClickable.value)
                );
            return (
                Se(() => {
                    const _ = C.value ? "a" : e.tag,
                        T = !!(l.title || e.title != null),
                        k = !!(l.subtitle || e.subtitle != null),
                        A = T || k,
                        w = !!(l.append || e.appendAvatar || e.appendIcon),
                        L = !!(l.prepend || e.prependAvatar || e.prependIcon),
                        E = !!(l.image || e.image),
                        V = A || L || w,
                        R = !!(l.text || e.text != null);
                    return ut(
                        h(
                            _,
                            {
                                class: [
                                    "v-card",
                                    {
                                        "v-card--disabled": e.disabled,
                                        "v-card--flat": e.flat,
                                        "v-card--hover":
                                            e.hover && !(e.disabled || e.flat),
                                        "v-card--link": x.value,
                                    },
                                    a.value,
                                    r.value,
                                    o.value,
                                    u.value,
                                    d.value,
                                    f.value,
                                    g.value,
                                    m.value,
                                    s.value,
                                    e.class,
                                ],
                                style: [i.value, c.value, v.value, e.style],
                                href: p.href.value,
                                onClick: x.value && p.navigate,
                                tabindex: e.disabled ? -1 : void 0,
                            },
                            {
                                default: () => {
                                    var M;
                                    return [
                                        E &&
                                            h(
                                                "div",
                                                {
                                                    key: "image",
                                                    class: "v-card__image",
                                                },
                                                [
                                                    l.image
                                                        ? h(
                                                              Fe,
                                                              {
                                                                  key: "image-defaults",
                                                                  disabled:
                                                                      !e.image,
                                                                  defaults: {
                                                                      VImg: {
                                                                          cover: !0,
                                                                          src: e.image,
                                                                      },
                                                                  },
                                                              },
                                                              l.image
                                                          )
                                                        : h(
                                                              ei,
                                                              {
                                                                  key: "image-img",
                                                                  cover: !0,
                                                                  src: e.image,
                                                              },
                                                              null
                                                          ),
                                                ]
                                            ),
                                        h(
                                            Td,
                                            {
                                                name: "v-card",
                                                active: !!e.loading,
                                                color:
                                                    typeof e.loading ==
                                                    "boolean"
                                                        ? void 0
                                                        : e.loading,
                                            },
                                            { default: l.loader }
                                        ),
                                        V &&
                                            h(
                                                lb,
                                                {
                                                    key: "item",
                                                    prependAvatar:
                                                        e.prependAvatar,
                                                    prependIcon: e.prependIcon,
                                                    title: e.title,
                                                    subtitle: e.subtitle,
                                                    appendAvatar:
                                                        e.appendAvatar,
                                                    appendIcon: e.appendIcon,
                                                },
                                                {
                                                    default: l.item,
                                                    prepend: l.prepend,
                                                    title: l.title,
                                                    subtitle: l.subtitle,
                                                    append: l.append,
                                                }
                                            ),
                                        R &&
                                            h(
                                                rb,
                                                { key: "text" },
                                                {
                                                    default: () => {
                                                        var B;
                                                        return [
                                                            ((B = l.text) ==
                                                            null
                                                                ? void 0
                                                                : B.call(l)) ??
                                                                e.text,
                                                        ];
                                                    },
                                                }
                                            ),
                                        (M = l.default) == null
                                            ? void 0
                                            : M.call(l),
                                        l.actions &&
                                            h(Z0, null, { default: l.actions }),
                                        vl(x.value, "v-card"),
                                    ];
                                },
                            }
                        ),
                        [[Rn("ripple"), x.value && e.ripple]]
                    );
                }),
                {}
            );
        },
    }),
    hl = (e) => (_o("data-v-95c71367"), (e = e()), xo(), e),
    ib = { class: "notification-box" },
    sb = { class: "content" },
    ub = { key: 0, class: "title-nav" },
    cb = hl(() => Ie("div", { class: "title" }, "Search Filter", -1)),
    db = hl(() => Ie("div", { class: "card-heading" }, "Filter", -1)),
    fb = { class: "grid-filter" },
    vb = { key: 2, class: "single-nav" },
    mb = hl(() => Ie("div", { class: "title" }, "Filtered Cars", -1)),
    hb = { class: "button-panel" },
    gb = { class: "loading" },
    yb = hl(() => Ie("br", null, null, -1)),
    pb = { class: "divider" },
    bb = { class: "text2" },
    Sb = hl(() => Ie("span", null, "Mileage: ", -1)),
    Cb = hl(() => Ie("span", null, "Price: ", -1)),
    kb = ["href"],
    wb = ["src"],
    Ab = { key: 3 },
    _b = { key: 4 },
    xb = { key: 5 },
    Mb = { key: 6 },
    Eb = {
        __name: "index",
        setup(e) {
            const t = new URL(window.location.href),
                n = le(!0),
                l = le(null),
                a = le(null),
                r = le(null),
                o = le(null),
                i = le(null),
                s = le(null),
                u = le([]),
                c = le([]),
                d = le([]),
                f = le([]),
                v = le(0),
                g = le([]),
                m = () => {
                    s.value != "1" &&
                        ((s.value = (Number(s.value) - 1).toString()), w());
                },
                p = () => {
                    (s.value = (Number(s.value) + 1).toString()), w();
                },
                C =
                    /^(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|(?:[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}|GIR 0AA))$/;
            function x(L) {
                return C.test(L);
            }
            const _ = Ze({
                make: t.searchParams.get("make"),
                model: t.searchParams.get("model"),
                distance: t.searchParams.get("distance"),
                trim: t.searchParams.get("trim"),
                zip: t.searchParams.get("zip"),
                page: t.searchParams.get("page"),
            });
            ue(l, (L) => {
                const E = kr.find((V) => V.make === L);
                (c.value = E ? E.models : []),
                    (!_.model || !c.value.includes(_.model)) &&
                        (a.value = "All Models");
            }),
                Qt(() => {
                    d.value = kr.map((E) => E.make);
                    let L = d0.map((E) => E + " Miles");
                    if (((f.value = ["All Distances", ...L]), _.make)) {
                        const E = _.make.toLowerCase(),
                            V = d.value.find((R) => R.toLowerCase() === E);
                        V
                            ? ((l.value = V),
                              (c.value = kr.find((R) => R.make === V).models))
                            : (l.value = null);
                    } else l.value = null;
                    if (_.distance) {
                        const E = _.distance,
                            V = f.value.find((R) => R.includes(E));
                        V ? (r.value = V) : (r.value = "All Distances");
                    } else r.value = null;
                    if (_.zip) {
                        const E = _.zip;
                        x(E) ? (o.value = E) : (o.value = null);
                    } else o.value = null;
                    if (_.model && l.value) {
                        const E = _.model.toLowerCase(),
                            V = c.value.find((R) => R.toLowerCase() === E);
                        V !== void 0
                            ? (a.value = V)
                            : (a.value = "All Mode2ls");
                    } else a.value = null;
                    _.trim ? (i.value = _.trim) : (i.value = null),
                        _.page ? (s.value = _.page) : (s.value = 1),
                        A();
                });
            const T = (L, E) => {
                    (v.value += 1),
                        E.length > 0 && (n.value = !1),
                        (E = E.filter((V) => {
                            if (V != null) return V;
                        })),
                        (u.value = u.value.concat(E)),
                        (u.value = u.value.filter(
                            (V, R) => u.value.indexOf(V) === R
                        )),
                        g.value.push(L + " : " + E.length + " cars found"),
                        console.log(u.value);
                },
                k = async (L) => {
                    console.log("REQUESTING: " + L);
                    try {
                        const V = await (
                            await fetch("/api/cars?website=" + L, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    make: l.value,
                                    model: a.value,
                                    distance: r.value,
                                    zip: o.value,
                                    trim: i.value,
                                    page: Number(s.value),
                                }),
                            })
                        ).json();
                        console.log(V),
                            console.log("DATA RECIEVED: " + L),
                            T(L, V.data);
                    } catch {
                        console.log("DATA ERROR: " + L), T(L, []);
                    }
                },
                A = () => {
                    if (((n.value = !0), s.value || (s.value = 1), !l.value)) {
                        n.value = !1;
                        return;
                    }
                    k("autotrader"),
                        k("carbravo"),
                        k("carfax"),
                        k("carguru"),
                        k("carmax"),
                        k("cars"),
                        k("edmund"),
                        k("truecar"),
                        k("carksl");
                },
                w = () => {
                    const L = new URL(window.location.href);
                    l.value
                        ? L.searchParams.set("make", l.value)
                        : L.searchParams.delete("make"),
                        a.value
                            ? L.searchParams.set("model", a.value)
                            : L.searchParams.delete("model"),
                        r.value
                            ? L.searchParams.set("distance", r.value)
                            : L.searchParams.delete("distance"),
                        i.value
                            ? L.searchParams.set("trim", i.value)
                            : L.searchParams.delete("trim"),
                        o.value
                            ? L.searchParams.set("zip", o.value)
                            : L.searchParams.delete("zip"),
                        s.value
                            ? L.searchParams.set("page", s.value)
                            : L.searchParams.delete("page"),
                        window.history.pushState({}, "", L),
                        window.location.reload();
                };
            return (L, E) => {
                const V = ky;
                return (
                    Ke(),
                    _t("main", null, [
                        h(c0, { page: s.value }, null, 8, ["page"]),
                        Ie("div", ib, [
                            (Ke(!0),
                            _t(
                                we,
                                null,
                                Lr(
                                    g.value,
                                    (R) => (
                                        Ke(),
                                        Yn(
                                            h0,
                                            {
                                                class: "notice-item",
                                                color: "info",
                                                icon: "$info",
                                                title: R,
                                                closable: "",
                                                text: "",
                                            },
                                            null,
                                            8,
                                            ["title"]
                                        )
                                    )
                                ),
                                256
                            )),
                        ]),
                        Ie("div", sb, [
                            n.value
                                ? wn("", !0)
                                : (Ke(),
                                  _t("div", ub, [
                                      cb,
                                      h(
                                          qn,
                                          { class: "button", onClick: w },
                                          {
                                              default: Ye(() => [
                                                  jt("Search Cars"),
                                              ]),
                                              _: 1,
                                          }
                                      ),
                                  ])),
                            n.value
                                ? wn("", !0)
                                : (Ke(),
                                  Yn(
                                      ou,
                                      { key: 1, class: "card" },
                                      {
                                          default: Ye(() => [
                                              db,
                                              Ie("div", fb, [
                                                  h(
                                                      Mn,
                                                      {
                                                          class: "text",
                                                          id: "make",
                                                      },
                                                      {
                                                          default: Ye(() => [
                                                              h(
                                                                  Ar,
                                                                  {
                                                                      label: "Make",
                                                                      items: d.value,
                                                                      variant:
                                                                          "outlined",
                                                                      color: "red darken 3",
                                                                      modelValue:
                                                                          l.value,
                                                                      "onUpdate:modelValue":
                                                                          E[0] ||
                                                                          (E[0] =
                                                                              (
                                                                                  R
                                                                              ) =>
                                                                                  (l.value =
                                                                                      R)),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  [
                                                                      "items",
                                                                      "modelValue",
                                                                  ]
                                                              ),
                                                          ]),
                                                          _: 1,
                                                      }
                                                  ),
                                                  h(
                                                      Mn,
                                                      {
                                                          class: "text",
                                                          id: "model",
                                                      },
                                                      {
                                                          default: Ye(() => [
                                                              h(
                                                                  Ar,
                                                                  {
                                                                      label: "Model",
                                                                      items: c.value,
                                                                      variant:
                                                                          "outlined",
                                                                      color: "red darken 3",
                                                                      modelValue:
                                                                          a.value,
                                                                      "onUpdate:modelValue":
                                                                          E[1] ||
                                                                          (E[1] =
                                                                              (
                                                                                  R
                                                                              ) =>
                                                                                  (a.value =
                                                                                      R)),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  [
                                                                      "items",
                                                                      "modelValue",
                                                                  ]
                                                              ),
                                                          ]),
                                                          _: 1,
                                                      }
                                                  ),
                                                  h(
                                                      Mn,
                                                      {
                                                          class: "text",
                                                          id: "distance",
                                                      },
                                                      {
                                                          default: Ye(() => [
                                                              h(
                                                                  Ar,
                                                                  {
                                                                      label: "Distance",
                                                                      items: f.value,
                                                                      variant:
                                                                          "outlined",
                                                                      color: "red darken 3",
                                                                      modelValue:
                                                                          r.value,
                                                                      "onUpdate:modelValue":
                                                                          E[2] ||
                                                                          (E[2] =
                                                                              (
                                                                                  R
                                                                              ) =>
                                                                                  (r.value =
                                                                                      R)),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  [
                                                                      "items",
                                                                      "modelValue",
                                                                  ]
                                                              ),
                                                          ]),
                                                          _: 1,
                                                      }
                                                  ),
                                                  h(
                                                      Mn,
                                                      {
                                                          class: "text",
                                                          id: "trim",
                                                      },
                                                      {
                                                          default: Ye(() => [
                                                              h(
                                                                  al,
                                                                  {
                                                                      label: "trim",
                                                                      variant:
                                                                          "outlined",
                                                                      modelValue:
                                                                          i.value,
                                                                      "onUpdate:modelValue":
                                                                          E[3] ||
                                                                          (E[3] =
                                                                              (
                                                                                  R
                                                                              ) =>
                                                                                  (i.value =
                                                                                      R)),
                                                                      color: "red darken 3",
                                                                  },
                                                                  null,
                                                                  8,
                                                                  ["modelValue"]
                                                              ),
                                                          ]),
                                                          _: 1,
                                                      }
                                                  ),
                                                  h(
                                                      Mn,
                                                      {
                                                          class: "text",
                                                          id: "zip",
                                                      },
                                                      {
                                                          default: Ye(() => [
                                                              h(
                                                                  al,
                                                                  {
                                                                      label: "Zip",
                                                                      variant:
                                                                          "outlined",
                                                                      modelValue:
                                                                          o.value,
                                                                      "onUpdate:modelValue":
                                                                          E[4] ||
                                                                          (E[4] =
                                                                              (
                                                                                  R
                                                                              ) =>
                                                                                  (o.value =
                                                                                      R)),
                                                                      type: "number",
                                                                      color: "red darken 3",
                                                                  },
                                                                  null,
                                                                  8,
                                                                  ["modelValue"]
                                                              ),
                                                          ]),
                                                          _: 1,
                                                      }
                                                  ),
                                              ]),
                                          ]),
                                          _: 1,
                                      }
                                  )),
                            n.value
                                ? wn("", !0)
                                : (Ke(),
                                  _t("div", vb, [
                                      mb,
                                      Ie("div", hb, [
                                          h(
                                              qn,
                                              { class: "button", onClick: m },
                                              {
                                                  default: Ye(() => [
                                                      jt("Previous Page"),
                                                  ]),
                                                  _: 1,
                                              }
                                          ),
                                          h(
                                              qn,
                                              { class: "button", onClick: p },
                                              {
                                                  default: Ye(() => [
                                                      jt("Next Page"),
                                                  ]),
                                                  _: 1,
                                              }
                                          ),
                                      ]),
                                  ])),
                            ut(Ie("div", gb, [h(V)], 512), [[Ln, n.value]]),
                            yb,
                            (Ke(!0),
                            _t(
                                we,
                                null,
                                Lr(
                                    u.value,
                                    (R, M) => (
                                        Ke(),
                                        Yn(
                                            ou,
                                            { class: "card2", key: M },
                                            {
                                                default: Ye(() => [
                                                    Ie("div", pb, [
                                                        Ie("div", bb, [
                                                            Ie(
                                                                "h3",
                                                                null,
                                                                wl(
                                                                    R.description
                                                                ),
                                                                1
                                                            ),
                                                            Ie("div", null, [
                                                                Sb,
                                                                jt(
                                                                    " " +
                                                                        wl(
                                                                            R.mileage
                                                                        ) +
                                                                        " miles ",
                                                                    1
                                                                ),
                                                            ]),
                                                            Ie("div", null, [
                                                                Cb,
                                                                jt(
                                                                    " " +
                                                                        wl(
                                                                            R.price
                                                                        ) +
                                                                        " USD ",
                                                                    1
                                                                ),
                                                            ]),
                                                            Ie("div", null, [
                                                                Ie(
                                                                    "a",
                                                                    {
                                                                        href: R.mainUrl,
                                                                        target: "_blank",
                                                                    },
                                                                    "View Original URL",
                                                                    8,
                                                                    kb
                                                                ),
                                                            ]),
                                                        ]),
                                                        Ie(
                                                            "img",
                                                            {
                                                                src: R.imageUrl,
                                                                alt: "car",
                                                            },
                                                            null,
                                                            8,
                                                            wb
                                                        ),
                                                    ]),
                                                ]),
                                                _: 2,
                                            },
                                            1024
                                        )
                                    )
                                ),
                                128
                            )),
                            n.value ? wn("", !0) : (Ke(), _t("br", Ab)),
                            n.value ? wn("", !0) : (Ke(), _t("br", _b)),
                            n.value ? wn("", !0) : (Ke(), _t("br", xb)),
                            n.value ? wn("", !0) : (Ke(), _t("br", Mb)),
                        ]),
                    ])
                );
            };
        },
    },
    Tb = Zo(Eb, [["__scopeId", "data-v-95c71367"]]);
/*!
 * vue-router v4.3.3
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const Gn = typeof document < "u";
function Pb(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const Te = Object.assign;
function _r(e, t) {
    const n = {};
    for (const l in t) {
        const a = t[l];
        n[l] = Et(a) ? a.map(e) : e(a);
    }
    return n;
}
const Tl = () => {},
    Et = Array.isArray,
    wf = /#/g,
    Ib = /&/g,
    Vb = /\//g,
    Rb = /=/g,
    Lb = /\?/g,
    Af = /\+/g,
    Ob = /%5B/g,
    Fb = /%5D/g,
    _f = /%5E/g,
    Bb = /%60/g,
    xf = /%7B/g,
    Db = /%7C/g,
    Mf = /%7D/g,
    Hb = /%20/g;
function mi(e) {
    return encodeURI("" + e)
        .replace(Db, "|")
        .replace(Ob, "[")
        .replace(Fb, "]");
}
function Nb(e) {
    return mi(e).replace(xf, "{").replace(Mf, "}").replace(_f, "^");
}
function ao(e) {
    return mi(e)
        .replace(Af, "%2B")
        .replace(Hb, "+")
        .replace(wf, "%23")
        .replace(Ib, "%26")
        .replace(Bb, "`")
        .replace(xf, "{")
        .replace(Mf, "}")
        .replace(_f, "^");
}
function $b(e) {
    return ao(e).replace(Rb, "%3D");
}
function Gb(e) {
    return mi(e).replace(wf, "%23").replace(Lb, "%3F");
}
function zb(e) {
    return e == null ? "" : Gb(e).replace(Vb, "%2F");
}
function Xl(e) {
    try {
        return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
}
const Xb = /\/$/,
    jb = (e) => e.replace(Xb, "");
function xr(e, t, n = "/") {
    let l,
        a = {},
        r = "",
        o = "";
    const i = t.indexOf("#");
    let s = t.indexOf("?");
    return (
        i < s && i >= 0 && (s = -1),
        s > -1 &&
            ((l = t.slice(0, s)),
            (r = t.slice(s + 1, i > -1 ? i : t.length)),
            (a = e(r))),
        i > -1 && ((l = l || t.slice(0, i)), (o = t.slice(i, t.length))),
        (l = Yb(l ?? t, n)),
        { fullPath: l + (r && "?") + r + o, path: l, query: a, hash: Xl(o) }
    );
}
function Wb(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
}
function iu(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
        ? e
        : e.slice(t.length) || "/";
}
function Ub(e, t, n) {
    const l = t.matched.length - 1,
        a = n.matched.length - 1;
    return (
        l > -1 &&
        l === a &&
        rl(t.matched[l], n.matched[a]) &&
        Ef(t.params, n.params) &&
        e(t.query) === e(n.query) &&
        t.hash === n.hash
    );
}
function rl(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ef(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Kb(e[n], t[n])) return !1;
    return !0;
}
function Kb(e, t) {
    return Et(e) ? su(e, t) : Et(t) ? su(t, e) : e === t;
}
function su(e, t) {
    return Et(t)
        ? e.length === t.length && e.every((n, l) => n === t[l])
        : e.length === 1 && e[0] === t;
}
function Yb(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
        l = e.split("/"),
        a = l[l.length - 1];
    (a === ".." || a === ".") && l.push("");
    let r = n.length - 1,
        o,
        i;
    for (o = 0; o < l.length; o++)
        if (((i = l[o]), i !== "."))
            if (i === "..") r > 1 && r--;
            else break;
    return n.slice(0, r).join("/") + "/" + l.slice(o).join("/");
}
var jl;
(function (e) {
    (e.pop = "pop"), (e.push = "push");
})(jl || (jl = {}));
var Pl;
(function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Pl || (Pl = {}));
function qb(e) {
    if (!e)
        if (Gn) {
            const t = document.querySelector("base");
            (e = (t && t.getAttribute("href")) || "/"),
                (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), jb(e);
}
const Qb = /^[^#]+#/;
function Zb(e, t) {
    return e.replace(Qb, "#") + t;
}
function Jb(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        l = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: l.left - n.left - (t.left || 0),
        top: l.top - n.top - (t.top || 0),
    };
}
const er = () => ({ left: window.scrollX, top: window.scrollY });
function eS(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            l = typeof n == "string" && n.startsWith("#"),
            a =
                typeof n == "string"
                    ? l
                        ? document.getElementById(n.slice(1))
                        : document.querySelector(n)
                    : n;
        if (!a) return;
        t = Jb(a, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              t.left != null ? t.left : window.scrollX,
              t.top != null ? t.top : window.scrollY
          );
}
function uu(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const ro = new Map();
function tS(e, t) {
    ro.set(e, t);
}
function nS(e) {
    const t = ro.get(e);
    return ro.delete(e), t;
}
let lS = () => location.protocol + "//" + location.host;
function Tf(e, t) {
    const { pathname: n, search: l, hash: a } = t,
        r = e.indexOf("#");
    if (r > -1) {
        let i = a.includes(e.slice(r)) ? e.slice(r).length : 1,
            s = a.slice(i);
        return s[0] !== "/" && (s = "/" + s), iu(s, "");
    }
    return iu(n, e) + l + a;
}
function aS(e, t, n, l) {
    let a = [],
        r = [],
        o = null;
    const i = ({ state: f }) => {
        const v = Tf(e, location),
            g = n.value,
            m = t.value;
        let p = 0;
        if (f) {
            if (((n.value = v), (t.value = f), o && o === g)) {
                o = null;
                return;
            }
            p = m ? f.position - m.position : 0;
        } else l(v);
        a.forEach((C) => {
            C(n.value, g, {
                delta: p,
                type: jl.pop,
                direction: p ? (p > 0 ? Pl.forward : Pl.back) : Pl.unknown,
            });
        });
    };
    function s() {
        o = n.value;
    }
    function u(f) {
        a.push(f);
        const v = () => {
            const g = a.indexOf(f);
            g > -1 && a.splice(g, 1);
        };
        return r.push(v), v;
    }
    function c() {
        const { history: f } = window;
        f.state && f.replaceState(Te({}, f.state, { scroll: er() }), "");
    }
    function d() {
        for (const f of r) f();
        (r = []),
            window.removeEventListener("popstate", i),
            window.removeEventListener("beforeunload", c);
    }
    return (
        window.addEventListener("popstate", i),
        window.addEventListener("beforeunload", c, { passive: !0 }),
        { pauseListeners: s, listen: u, destroy: d }
    );
}
function cu(e, t, n, l = !1, a = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: l,
        position: window.history.length,
        scroll: a ? er() : null,
    };
}
function rS(e) {
    const { history: t, location: n } = window,
        l = { value: Tf(e, n) },
        a = { value: t.state };
    a.value ||
        r(
            l.value,
            {
                back: null,
                current: l.value,
                forward: null,
                position: t.length - 1,
                replaced: !0,
                scroll: null,
            },
            !0
        );
    function r(s, u, c) {
        const d = e.indexOf("#"),
            f =
                d > -1
                    ? (n.host && document.querySelector("base")
                          ? e
                          : e.slice(d)) + s
                    : lS() + e + s;
        try {
            t[c ? "replaceState" : "pushState"](u, "", f), (a.value = u);
        } catch (v) {
            console.error(v), n[c ? "replace" : "assign"](f);
        }
    }
    function o(s, u) {
        const c = Te({}, t.state, cu(a.value.back, s, a.value.forward, !0), u, {
            position: a.value.position,
        });
        r(s, c, !0), (l.value = s);
    }
    function i(s, u) {
        const c = Te({}, a.value, t.state, { forward: s, scroll: er() });
        r(c.current, c, !0);
        const d = Te({}, cu(l.value, s, null), { position: c.position + 1 }, u);
        r(s, d, !1), (l.value = s);
    }
    return { location: l, state: a, push: i, replace: o };
}
function oS(e) {
    e = qb(e);
    const t = rS(e),
        n = aS(e, t.state, t.location, t.replace);
    function l(r, o = !0) {
        o || n.pauseListeners(), history.go(r);
    }
    const a = Te(
        { location: "", base: e, go: l, createHref: Zb.bind(null, e) },
        t,
        n
    );
    return (
        Object.defineProperty(a, "location", {
            enumerable: !0,
            get: () => t.location.value,
        }),
        Object.defineProperty(a, "state", {
            enumerable: !0,
            get: () => t.state.value,
        }),
        a
    );
}
function iS(e) {
    return typeof e == "string" || (e && typeof e == "object");
}
function Pf(e) {
    return typeof e == "string" || typeof e == "symbol";
}
const nn = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0,
    },
    If = Symbol("");
var du;
(function (e) {
    (e[(e.aborted = 4)] = "aborted"),
        (e[(e.cancelled = 8)] = "cancelled"),
        (e[(e.duplicated = 16)] = "duplicated");
})(du || (du = {}));
function ol(e, t) {
    return Te(new Error(), { type: e, [If]: !0 }, t);
}
function Gt(e, t) {
    return e instanceof Error && If in e && (t == null || !!(e.type & t));
}
const fu = "[^/]+?",
    sS = { sensitive: !1, strict: !1, start: !0, end: !0 },
    uS = /[.+*?^${}()[\]/\\]/g;
function cS(e, t) {
    const n = Te({}, sS, t),
        l = [];
    let a = n.start ? "^" : "";
    const r = [];
    for (const u of e) {
        const c = u.length ? [] : [90];
        n.strict && !u.length && (a += "/");
        for (let d = 0; d < u.length; d++) {
            const f = u[d];
            let v = 40 + (n.sensitive ? 0.25 : 0);
            if (f.type === 0)
                d || (a += "/"), (a += f.value.replace(uS, "\\$&")), (v += 40);
            else if (f.type === 1) {
                const { value: g, repeatable: m, optional: p, regexp: C } = f;
                r.push({ name: g, repeatable: m, optional: p });
                const x = C || fu;
                if (x !== fu) {
                    v += 10;
                    try {
                        new RegExp(`(${x})`);
                    } catch (T) {
                        throw new Error(
                            `Invalid custom RegExp for param "${g}" (${x}): ` +
                                T.message
                        );
                    }
                }
                let _ = m ? `((?:${x})(?:/(?:${x}))*)` : `(${x})`;
                d || (_ = p && u.length < 2 ? `(?:/${_})` : "/" + _),
                    p && (_ += "?"),
                    (a += _),
                    (v += 20),
                    p && (v += -8),
                    m && (v += -20),
                    x === ".*" && (v += -50);
            }
            c.push(v);
        }
        l.push(c);
    }
    if (n.strict && n.end) {
        const u = l.length - 1;
        l[u][l[u].length - 1] += 0.7000000000000001;
    }
    n.strict || (a += "/?"), n.end ? (a += "$") : n.strict && (a += "(?:/|$)");
    const o = new RegExp(a, n.sensitive ? "" : "i");
    function i(u) {
        const c = u.match(o),
            d = {};
        if (!c) return null;
        for (let f = 1; f < c.length; f++) {
            const v = c[f] || "",
                g = r[f - 1];
            d[g.name] = v && g.repeatable ? v.split("/") : v;
        }
        return d;
    }
    function s(u) {
        let c = "",
            d = !1;
        for (const f of e) {
            (!d || !c.endsWith("/")) && (c += "/"), (d = !1);
            for (const v of f)
                if (v.type === 0) c += v.value;
                else if (v.type === 1) {
                    const { value: g, repeatable: m, optional: p } = v,
                        C = g in u ? u[g] : "";
                    if (Et(C) && !m)
                        throw new Error(
                            `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
                        );
                    const x = Et(C) ? C.join("/") : C;
                    if (!x)
                        if (p)
                            f.length < 2 &&
                                (c.endsWith("/")
                                    ? (c = c.slice(0, -1))
                                    : (d = !0));
                        else throw new Error(`Missing required param "${g}"`);
                    c += x;
                }
        }
        return c || "/";
    }
    return { re: o, score: l, keys: r, parse: i, stringify: s };
}
function dS(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const l = t[n] - e[n];
        if (l) return l;
        n++;
    }
    return e.length < t.length
        ? e.length === 1 && e[0] === 80
            ? -1
            : 1
        : e.length > t.length
        ? t.length === 1 && t[0] === 80
            ? 1
            : -1
        : 0;
}
function Vf(e, t) {
    let n = 0;
    const l = e.score,
        a = t.score;
    for (; n < l.length && n < a.length; ) {
        const r = dS(l[n], a[n]);
        if (r) return r;
        n++;
    }
    if (Math.abs(a.length - l.length) === 1) {
        if (vu(l)) return 1;
        if (vu(a)) return -1;
    }
    return a.length - l.length;
}
function vu(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}
const fS = { type: 0, value: "" },
    vS = /[a-zA-Z0-9_]/;
function mS(e) {
    if (!e) return [[]];
    if (e === "/") return [[fS]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(v) {
        throw new Error(`ERR (${n})/"${u}": ${v}`);
    }
    let n = 0,
        l = n;
    const a = [];
    let r;
    function o() {
        r && a.push(r), (r = []);
    }
    let i = 0,
        s,
        u = "",
        c = "";
    function d() {
        u &&
            (n === 0
                ? r.push({ type: 0, value: u })
                : n === 1 || n === 2 || n === 3
                ? (r.length > 1 &&
                      (s === "*" || s === "+") &&
                      t(
                          `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
                      ),
                  r.push({
                      type: 1,
                      value: u,
                      regexp: c,
                      repeatable: s === "*" || s === "+",
                      optional: s === "*" || s === "?",
                  }))
                : t("Invalid state to consume buffer"),
            (u = ""));
    }
    function f() {
        u += s;
    }
    for (; i < e.length; ) {
        if (((s = e[i++]), s === "\\" && n !== 2)) {
            (l = n), (n = 4);
            continue;
        }
        switch (n) {
            case 0:
                s === "/" ? (u && d(), o()) : s === ":" ? (d(), (n = 1)) : f();
                break;
            case 4:
                f(), (n = l);
                break;
            case 1:
                s === "("
                    ? (n = 2)
                    : vS.test(s)
                    ? f()
                    : (d(),
                      (n = 0),
                      s !== "*" && s !== "?" && s !== "+" && i--);
                break;
            case 2:
                s === ")"
                    ? c[c.length - 1] == "\\"
                        ? (c = c.slice(0, -1) + s)
                        : (n = 3)
                    : (c += s);
                break;
            case 3:
                d(),
                    (n = 0),
                    s !== "*" && s !== "?" && s !== "+" && i--,
                    (c = "");
                break;
            default:
                t("Unknown state");
                break;
        }
    }
    return (
        n === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), o(), a
    );
}
function hS(e, t, n) {
    const l = cS(mS(e.path), n),
        a = Te(l, { record: e, parent: t, children: [], alias: [] });
    return t && !a.record.aliasOf == !t.record.aliasOf && t.children.push(a), a;
}
function gS(e, t) {
    const n = [],
        l = new Map();
    t = gu({ strict: !1, end: !0, sensitive: !1 }, t);
    function a(c) {
        return l.get(c);
    }
    function r(c, d, f) {
        const v = !f,
            g = yS(c);
        g.aliasOf = f && f.record;
        const m = gu(t, c),
            p = [g];
        if ("alias" in c) {
            const _ = typeof c.alias == "string" ? [c.alias] : c.alias;
            for (const T of _)
                p.push(
                    Te({}, g, {
                        components: f ? f.record.components : g.components,
                        path: T,
                        aliasOf: f ? f.record : g,
                    })
                );
        }
        let C, x;
        for (const _ of p) {
            const { path: T } = _;
            if (d && T[0] !== "/") {
                const k = d.record.path,
                    A = k[k.length - 1] === "/" ? "" : "/";
                _.path = d.record.path + (T && A + T);
            }
            if (
                ((C = hS(_, d, m)),
                f
                    ? f.alias.push(C)
                    : ((x = x || C),
                      x !== C && x.alias.push(C),
                      v && c.name && !hu(C) && o(c.name)),
                Rf(C) && s(C),
                g.children)
            ) {
                const k = g.children;
                for (let A = 0; A < k.length; A++)
                    r(k[A], C, f && f.children[A]);
            }
            f = f || C;
        }
        return x
            ? () => {
                  o(x);
              }
            : Tl;
    }
    function o(c) {
        if (Pf(c)) {
            const d = l.get(c);
            d &&
                (l.delete(c),
                n.splice(n.indexOf(d), 1),
                d.children.forEach(o),
                d.alias.forEach(o));
        } else {
            const d = n.indexOf(c);
            d > -1 &&
                (n.splice(d, 1),
                c.record.name && l.delete(c.record.name),
                c.children.forEach(o),
                c.alias.forEach(o));
        }
    }
    function i() {
        return n;
    }
    function s(c) {
        const d = SS(c, n);
        n.splice(d, 0, c), c.record.name && !hu(c) && l.set(c.record.name, c);
    }
    function u(c, d) {
        let f,
            v = {},
            g,
            m;
        if ("name" in c && c.name) {
            if (((f = l.get(c.name)), !f)) throw ol(1, { location: c });
            (m = f.record.name),
                (v = Te(
                    mu(
                        d.params,
                        f.keys
                            .filter((x) => !x.optional)
                            .concat(
                                f.parent
                                    ? f.parent.keys.filter((x) => x.optional)
                                    : []
                            )
                            .map((x) => x.name)
                    ),
                    c.params &&
                        mu(
                            c.params,
                            f.keys.map((x) => x.name)
                        )
                )),
                (g = f.stringify(v));
        } else if (c.path != null)
            (g = c.path),
                (f = n.find((x) => x.re.test(g))),
                f && ((v = f.parse(g)), (m = f.record.name));
        else {
            if (
                ((f = d.name
                    ? l.get(d.name)
                    : n.find((x) => x.re.test(d.path))),
                !f)
            )
                throw ol(1, { location: c, currentLocation: d });
            (m = f.record.name),
                (v = Te({}, d.params, c.params)),
                (g = f.stringify(v));
        }
        const p = [];
        let C = f;
        for (; C; ) p.unshift(C.record), (C = C.parent);
        return { name: m, path: g, params: v, matched: p, meta: bS(p) };
    }
    return (
        e.forEach((c) => r(c)),
        {
            addRoute: r,
            resolve: u,
            removeRoute: o,
            getRoutes: i,
            getRecordMatcher: a,
        }
    );
}
function mu(e, t) {
    const n = {};
    for (const l of t) l in e && (n[l] = e[l]);
    return n;
}
function yS(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: pS(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components:
            "components" in e
                ? e.components || null
                : e.component && { default: e.component },
    };
}
function pS(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const l in e.components) t[l] = typeof n == "object" ? n[l] : n;
    return t;
}
function hu(e) {
    for (; e; ) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function bS(e) {
    return e.reduce((t, n) => Te(t, n.meta), {});
}
function gu(e, t) {
    const n = {};
    for (const l in e) n[l] = l in t ? t[l] : e[l];
    return n;
}
function SS(e, t) {
    let n = 0,
        l = t.length;
    for (; n !== l; ) {
        const r = (n + l) >> 1;
        Vf(e, t[r]) < 0 ? (l = r) : (n = r + 1);
    }
    const a = CS(e);
    return a && (l = t.lastIndexOf(a, l - 1)), l;
}
function CS(e) {
    let t = e;
    for (; (t = t.parent); ) if (Rf(t) && Vf(e, t) === 0) return t;
}
function Rf({ record: e }) {
    return !!(
        e.name ||
        (e.components && Object.keys(e.components).length) ||
        e.redirect
    );
}
function kS(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const l = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let a = 0; a < l.length; ++a) {
        const r = l[a].replace(Af, " "),
            o = r.indexOf("="),
            i = Xl(o < 0 ? r : r.slice(0, o)),
            s = o < 0 ? null : Xl(r.slice(o + 1));
        if (i in t) {
            let u = t[i];
            Et(u) || (u = t[i] = [u]), u.push(s);
        } else t[i] = s;
    }
    return t;
}
function yu(e) {
    let t = "";
    for (let n in e) {
        const l = e[n];
        if (((n = $b(n)), l == null)) {
            l !== void 0 && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (Et(l) ? l.map((r) => r && ao(r)) : [l && ao(l)]).forEach((r) => {
            r !== void 0 &&
                ((t += (t.length ? "&" : "") + n), r != null && (t += "=" + r));
        });
    }
    return t;
}
function wS(e) {
    const t = {};
    for (const n in e) {
        const l = e[n];
        l !== void 0 &&
            (t[n] = Et(l)
                ? l.map((a) => (a == null ? null : "" + a))
                : l == null
                ? l
                : "" + l);
    }
    return t;
}
const AS = Symbol(""),
    pu = Symbol(""),
    hi = Symbol(""),
    Lf = Symbol(""),
    oo = Symbol("");
function Sl() {
    let e = [];
    function t(l) {
        return (
            e.push(l),
            () => {
                const a = e.indexOf(l);
                a > -1 && e.splice(a, 1);
            }
        );
    }
    function n() {
        e = [];
    }
    return { add: t, list: () => e.slice(), reset: n };
}
function sn(e, t, n, l, a, r = (o) => o()) {
    const o = l && (l.enterCallbacks[a] = l.enterCallbacks[a] || []);
    return () =>
        new Promise((i, s) => {
            const u = (f) => {
                    f === !1
                        ? s(ol(4, { from: n, to: t }))
                        : f instanceof Error
                        ? s(f)
                        : iS(f)
                        ? s(ol(2, { from: t, to: f }))
                        : (o &&
                              l.enterCallbacks[a] === o &&
                              typeof f == "function" &&
                              o.push(f),
                          i());
                },
                c = r(() => e.call(l && l.instances[a], t, n, u));
            let d = Promise.resolve(c);
            e.length < 3 && (d = d.then(u)), d.catch((f) => s(f));
        });
}
function Mr(e, t, n, l, a = (r) => r()) {
    const r = [];
    for (const o of e)
        for (const i in o.components) {
            let s = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (_S(s)) {
                    const c = (s.__vccOpts || s)[t];
                    c && r.push(sn(c, n, l, o, i, a));
                } else {
                    let u = s();
                    r.push(() =>
                        u.then((c) => {
                            if (!c)
                                return Promise.reject(
                                    new Error(
                                        `Couldn't resolve component "${i}" at "${o.path}"`
                                    )
                                );
                            const d = Pb(c) ? c.default : c;
                            o.components[i] = d;
                            const v = (d.__vccOpts || d)[t];
                            return v && sn(v, n, l, o, i, a)();
                        })
                    );
                }
        }
    return r;
}
function _S(e) {
    return (
        typeof e == "object" ||
        "displayName" in e ||
        "props" in e ||
        "__vccOpts" in e
    );
}
function bu(e) {
    const t = Pe(hi),
        n = Pe(Lf),
        l = S(() => {
            const s = Xe(e.to);
            return t.resolve(s);
        }),
        a = S(() => {
            const { matched: s } = l.value,
                { length: u } = s,
                c = s[u - 1],
                d = n.matched;
            if (!c || !d.length) return -1;
            const f = d.findIndex(rl.bind(null, c));
            if (f > -1) return f;
            const v = Su(s[u - 2]);
            return u > 1 && Su(c) === v && d[d.length - 1].path !== v
                ? d.findIndex(rl.bind(null, s[u - 2]))
                : f;
        }),
        r = S(() => a.value > -1 && TS(n.params, l.value.params)),
        o = S(
            () =>
                a.value > -1 &&
                a.value === n.matched.length - 1 &&
                Ef(n.params, l.value.params)
        );
    function i(s = {}) {
        return ES(s)
            ? t[Xe(e.replace) ? "replace" : "push"](Xe(e.to)).catch(Tl)
            : Promise.resolve();
    }
    return {
        route: l,
        href: S(() => l.value.href),
        isActive: r,
        isExactActive: o,
        navigate: i,
    };
}
const xS = Ro({
        name: "RouterLink",
        compatConfig: { MODE: 3 },
        props: {
            to: { type: [String, Object], required: !0 },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: { type: String, default: "page" },
        },
        useLink: bu,
        setup(e, { slots: t }) {
            const n = Ze(bu(e)),
                { options: l } = Pe(hi),
                a = S(() => ({
                    [Cu(
                        e.activeClass,
                        l.linkActiveClass,
                        "router-link-active"
                    )]: n.isActive,
                    [Cu(
                        e.exactActiveClass,
                        l.linkExactActiveClass,
                        "router-link-exact-active"
                    )]: n.isExactActive,
                }));
            return () => {
                const r = t.default && t.default(n);
                return e.custom
                    ? r
                    : pn(
                          "a",
                          {
                              "aria-current": n.isExactActive
                                  ? e.ariaCurrentValue
                                  : null,
                              href: n.href,
                              onClick: n.navigate,
                              class: a.value,
                          },
                          r
                      );
            };
        },
    }),
    MS = xS;
function ES(e) {
    if (
        !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
        !e.defaultPrevented &&
        !(e.button !== void 0 && e.button !== 0)
    ) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return;
        }
        return e.preventDefault && e.preventDefault(), !0;
    }
}
function TS(e, t) {
    for (const n in t) {
        const l = t[n],
            a = e[n];
        if (typeof l == "string") {
            if (l !== a) return !1;
        } else if (
            !Et(a) ||
            a.length !== l.length ||
            l.some((r, o) => r !== a[o])
        )
            return !1;
    }
    return !0;
}
function Su(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Cu = (e, t, n) => e ?? t ?? n,
    PS = Ro({
        name: "RouterView",
        inheritAttrs: !1,
        props: { name: { type: String, default: "default" }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const l = Pe(oo),
                a = S(() => e.route || l.value),
                r = Pe(pu, 0),
                o = S(() => {
                    let u = Xe(r);
                    const { matched: c } = a.value;
                    let d;
                    for (; (d = c[u]) && !d.components; ) u++;
                    return u;
                }),
                i = S(() => a.value.matched[o.value]);
            qe(
                pu,
                S(() => o.value + 1)
            ),
                qe(AS, i),
                qe(oo, a);
            const s = le();
            return (
                ue(
                    () => [s.value, i.value, e.name],
                    ([u, c, d], [f, v, g]) => {
                        c &&
                            ((c.instances[d] = u),
                            v &&
                                v !== c &&
                                u &&
                                u === f &&
                                (c.leaveGuards.size ||
                                    (c.leaveGuards = v.leaveGuards),
                                c.updateGuards.size ||
                                    (c.updateGuards = v.updateGuards))),
                            u &&
                                c &&
                                (!v || !rl(c, v) || !f) &&
                                (c.enterCallbacks[d] || []).forEach((m) =>
                                    m(u)
                                );
                    },
                    { flush: "post" }
                ),
                () => {
                    const u = a.value,
                        c = e.name,
                        d = i.value,
                        f = d && d.components[c];
                    if (!f) return ku(n.default, { Component: f, route: u });
                    const v = d.props[c],
                        g = v
                            ? v === !0
                                ? u.params
                                : typeof v == "function"
                                ? v(u)
                                : v
                            : null,
                        p = pn(
                            f,
                            Te({}, g, t, {
                                onVnodeUnmounted: (C) => {
                                    C.component.isUnmounted &&
                                        (d.instances[c] = null);
                                },
                                ref: s,
                            })
                        );
                    return ku(n.default, { Component: p, route: u }) || p;
                }
            );
        },
    });
function ku(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const IS = PS;
function VS(e) {
    const t = gS(e.routes, e),
        n = e.parseQuery || kS,
        l = e.stringifyQuery || yu,
        a = e.history,
        r = Sl(),
        o = Sl(),
        i = Sl(),
        s = oe(nn);
    let u = nn;
    Gn &&
        e.scrollBehavior &&
        "scrollRestoration" in history &&
        (history.scrollRestoration = "manual");
    const c = _r.bind(null, (I) => "" + I),
        d = _r.bind(null, zb),
        f = _r.bind(null, Xl);
    function v(I, W) {
        let j, N;
        return (
            Pf(I) ? ((j = t.getRecordMatcher(I)), (N = W)) : (N = I),
            t.addRoute(N, j)
        );
    }
    function g(I) {
        const W = t.getRecordMatcher(I);
        W && t.removeRoute(W);
    }
    function m() {
        return t.getRoutes().map((I) => I.record);
    }
    function p(I) {
        return !!t.getRecordMatcher(I);
    }
    function C(I, W) {
        if (((W = Te({}, W || s.value)), typeof I == "string")) {
            const b = xr(n, I, W.path),
                P = t.resolve({ path: b.path }, W),
                D = a.createHref(b.fullPath);
            return Te(b, P, {
                params: f(P.params),
                hash: Xl(b.hash),
                redirectedFrom: void 0,
                href: D,
            });
        }
        let j;
        if (I.path != null) j = Te({}, I, { path: xr(n, I.path, W.path).path });
        else {
            const b = Te({}, I.params);
            for (const P in b) b[P] == null && delete b[P];
            (j = Te({}, I, { params: d(b) })), (W.params = d(W.params));
        }
        const N = t.resolve(j, W),
            re = I.hash || "";
        N.params = c(f(N.params));
        const he = Wb(l, Te({}, I, { hash: Nb(re), path: N.path })),
            y = a.createHref(he);
        return Te(
            {
                fullPath: he,
                hash: re,
                query: l === yu ? wS(I.query) : I.query || {},
            },
            N,
            { redirectedFrom: void 0, href: y }
        );
    }
    function x(I) {
        return typeof I == "string" ? xr(n, I, s.value.path) : Te({}, I);
    }
    function _(I, W) {
        if (u !== I) return ol(8, { from: W, to: I });
    }
    function T(I) {
        return w(I);
    }
    function k(I) {
        return T(Te(x(I), { replace: !0 }));
    }
    function A(I) {
        const W = I.matched[I.matched.length - 1];
        if (W && W.redirect) {
            const { redirect: j } = W;
            let N = typeof j == "function" ? j(I) : j;
            return (
                typeof N == "string" &&
                    ((N =
                        N.includes("?") || N.includes("#")
                            ? (N = x(N))
                            : { path: N }),
                    (N.params = {})),
                Te(
                    {
                        query: I.query,
                        hash: I.hash,
                        params: N.path != null ? {} : I.params,
                    },
                    N
                )
            );
        }
    }
    function w(I, W) {
        const j = (u = C(I)),
            N = s.value,
            re = I.state,
            he = I.force,
            y = I.replace === !0,
            b = A(j);
        if (b)
            return w(
                Te(x(b), {
                    state: typeof b == "object" ? Te({}, re, b.state) : re,
                    force: he,
                    replace: y,
                }),
                W || j
            );
        const P = j;
        P.redirectedFrom = W;
        let D;
        return (
            !he &&
                Ub(l, N, j) &&
                ((D = ol(16, { to: P, from: N })), z(N, N, !0, !1)),
            (D ? Promise.resolve(D) : V(P, N))
                .catch((O) => (Gt(O) ? (Gt(O, 2) ? O : F(O)) : H(O, P, N)))
                .then((O) => {
                    if (O) {
                        if (Gt(O, 2))
                            return w(
                                Te({ replace: y }, x(O.to), {
                                    state:
                                        typeof O.to == "object"
                                            ? Te({}, re, O.to.state)
                                            : re,
                                    force: he,
                                }),
                                W || P
                            );
                    } else O = M(P, N, !0, y, re);
                    return R(P, N, O), O;
                })
        );
    }
    function L(I, W) {
        const j = _(I, W);
        return j ? Promise.reject(j) : Promise.resolve();
    }
    function E(I) {
        const W = pe.values().next().value;
        return W && typeof W.runWithContext == "function"
            ? W.runWithContext(I)
            : I();
    }
    function V(I, W) {
        let j;
        const [N, re, he] = RS(I, W);
        j = Mr(N.reverse(), "beforeRouteLeave", I, W);
        for (const b of N)
            b.leaveGuards.forEach((P) => {
                j.push(sn(P, I, W));
            });
        const y = L.bind(null, I, W);
        return (
            j.push(y),
            ae(j)
                .then(() => {
                    j = [];
                    for (const b of r.list()) j.push(sn(b, I, W));
                    return j.push(y), ae(j);
                })
                .then(() => {
                    j = Mr(re, "beforeRouteUpdate", I, W);
                    for (const b of re)
                        b.updateGuards.forEach((P) => {
                            j.push(sn(P, I, W));
                        });
                    return j.push(y), ae(j);
                })
                .then(() => {
                    j = [];
                    for (const b of he)
                        if (b.beforeEnter)
                            if (Et(b.beforeEnter))
                                for (const P of b.beforeEnter)
                                    j.push(sn(P, I, W));
                            else j.push(sn(b.beforeEnter, I, W));
                    return j.push(y), ae(j);
                })
                .then(
                    () => (
                        I.matched.forEach((b) => (b.enterCallbacks = {})),
                        (j = Mr(he, "beforeRouteEnter", I, W, E)),
                        j.push(y),
                        ae(j)
                    )
                )
                .then(() => {
                    j = [];
                    for (const b of o.list()) j.push(sn(b, I, W));
                    return j.push(y), ae(j);
                })
                .catch((b) => (Gt(b, 8) ? b : Promise.reject(b)))
        );
    }
    function R(I, W, j) {
        i.list().forEach((N) => E(() => N(I, W, j)));
    }
    function M(I, W, j, N, re) {
        const he = _(I, W);
        if (he) return he;
        const y = W === nn,
            b = Gn ? history.state : {};
        j &&
            (N || y
                ? a.replace(I.fullPath, Te({ scroll: y && b && b.scroll }, re))
                : a.push(I.fullPath, re)),
            (s.value = I),
            z(I, W, j, y),
            F();
    }
    let B;
    function $() {
        B ||
            (B = a.listen((I, W, j) => {
                if (!Ce.listening) return;
                const N = C(I),
                    re = A(N);
                if (re) {
                    w(Te(re, { replace: !0 }), N).catch(Tl);
                    return;
                }
                u = N;
                const he = s.value;
                Gn && tS(uu(he.fullPath, j.delta), er()),
                    V(N, he)
                        .catch((y) =>
                            Gt(y, 12)
                                ? y
                                : Gt(y, 2)
                                ? (w(y.to, N)
                                      .then((b) => {
                                          Gt(b, 20) &&
                                              !j.delta &&
                                              j.type === jl.pop &&
                                              a.go(-1, !1);
                                      })
                                      .catch(Tl),
                                  Promise.reject())
                                : (j.delta && a.go(-j.delta, !1), H(y, N, he))
                        )
                        .then((y) => {
                            (y = y || M(N, he, !1)),
                                y &&
                                    (j.delta && !Gt(y, 8)
                                        ? a.go(-j.delta, !1)
                                        : j.type === jl.pop &&
                                          Gt(y, 20) &&
                                          a.go(-1, !1)),
                                R(N, he, y);
                        })
                        .catch(Tl);
            }));
    }
    let Z = Sl(),
        ee = Sl(),
        ne;
    function H(I, W, j) {
        F(I);
        const N = ee.list();
        return (
            N.length ? N.forEach((re) => re(I, W, j)) : console.error(I),
            Promise.reject(I)
        );
    }
    function X() {
        return ne && s.value !== nn
            ? Promise.resolve()
            : new Promise((I, W) => {
                  Z.add([I, W]);
              });
    }
    function F(I) {
        return (
            ne ||
                ((ne = !I),
                $(),
                Z.list().forEach(([W, j]) => (I ? j(I) : W())),
                Z.reset()),
            I
        );
    }
    function z(I, W, j, N) {
        const { scrollBehavior: re } = e;
        if (!Gn || !re) return Promise.resolve();
        const he =
            (!j && nS(uu(I.fullPath, 0))) ||
            ((N || !j) && history.state && history.state.scroll) ||
            null;
        return Ge()
            .then(() => re(I, W, he))
            .then((y) => y && eS(y))
            .catch((y) => H(y, I, W));
    }
    const J = (I) => a.go(I);
    let ie;
    const pe = new Set(),
        Ce = {
            currentRoute: s,
            listening: !0,
            addRoute: v,
            removeRoute: g,
            hasRoute: p,
            getRoutes: m,
            resolve: C,
            options: e,
            push: T,
            replace: k,
            go: J,
            back: () => J(-1),
            forward: () => J(1),
            beforeEach: r.add,
            beforeResolve: o.add,
            afterEach: i.add,
            onError: ee.add,
            isReady: X,
            install(I) {
                const W = this;
                I.component("RouterLink", MS),
                    I.component("RouterView", IS),
                    (I.config.globalProperties.$router = W),
                    Object.defineProperty(I.config.globalProperties, "$route", {
                        enumerable: !0,
                        get: () => Xe(s),
                    }),
                    Gn &&
                        !ie &&
                        s.value === nn &&
                        ((ie = !0), T(a.location).catch((re) => {}));
                const j = {};
                for (const re in nn)
                    Object.defineProperty(j, re, {
                        get: () => s.value[re],
                        enumerable: !0,
                    });
                I.provide(hi, W), I.provide(Lf, Xu(j)), I.provide(oo, s);
                const N = I.unmount;
                pe.add(I),
                    (I.unmount = function () {
                        pe.delete(I),
                            pe.size < 1 &&
                                ((u = nn),
                                B && B(),
                                (B = null),
                                (s.value = nn),
                                (ie = !1),
                                (ne = !1)),
                            N();
                    });
            },
        };
    function ae(I) {
        return I.reduce((W, j) => W.then(() => E(j)), Promise.resolve());
    }
    return Ce;
}
function RS(e, t) {
    const n = [],
        l = [],
        a = [],
        r = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < r; o++) {
        const i = t.matched[o];
        i && (e.matched.find((u) => rl(u, i)) ? l.push(i) : n.push(i));
        const s = e.matched[o];
        s && (t.matched.find((u) => rl(u, s)) || a.push(s));
    }
    return [n, l, a];
}
const LS = [
        { path: "/", component: Tb, props: !0 },
        { path: "/:pathMatch(.*)*", redirect: "/welcome" },
    ],
    Of = VS({ history: oS(), routes: LS });
function OS(e) {
    e.use(hy).use(Of);
}
const FS = q({ ...Ae(), ...sy({ fullHeight: !0 }), ...We() }, "VApp"),
    BS = de()({
        name: "VApp",
        props: FS(),
        setup(e, t) {
            let { slots: n } = t;
            const l = Qe(e),
                {
                    layoutClasses: a,
                    getLayoutItem: r,
                    items: o,
                    layoutRef: i,
                } = vy(e),
                { rtlClasses: s } = Zt();
            return (
                Se(() =>
                    h(
                        "div",
                        {
                            ref: i,
                            class: [
                                "v-application",
                                l.themeClasses.value,
                                a.value,
                                s.value,
                                e.class,
                            ],
                            style: [e.style],
                        },
                        [
                            h("div", { class: "v-application__wrap" }, [
                                h(Dv, null, {
                                    default: () => {
                                        var u;
                                        return [
                                            h(we, null, [
                                                (u = n.default) == null
                                                    ? void 0
                                                    : u.call(n),
                                            ]),
                                        ];
                                    },
                                }),
                            ]),
                        ]
                    )
                ),
                { getLayoutItem: r, items: o, theme: l }
            );
        },
    }),
    DS = q(
        { scrollable: Boolean, ...Ae(), ...Ht(), ...ze({ tag: "main" }) },
        "VMain"
    ),
    HS = de()({
        name: "VMain",
        props: DS(),
        setup(e, t) {
            let { slots: n } = t;
            const { dimensionStyles: l } = Nt(e),
                { mainStyles: a, layoutIsReady: r } = cy(),
                { ssrBootStyles: o } = ti();
            return (
                Se(() =>
                    h(
                        e.tag,
                        {
                            class: [
                                "v-main",
                                { "v-main--scrollable": e.scrollable },
                                e.class,
                            ],
                            style: [a.value, o.value, l.value, e.style],
                        },
                        {
                            default: () => {
                                var i, s;
                                return [
                                    e.scrollable
                                        ? h(
                                              "div",
                                              { class: "v-main__scroller" },
                                              [
                                                  (i = n.default) == null
                                                      ? void 0
                                                      : i.call(n),
                                              ]
                                          )
                                        : (s = n.default) == null
                                        ? void 0
                                        : s.call(n),
                                ];
                            },
                        }
                    )
                ),
                r
            );
        },
    }),
    NS = {
        __name: "App",
        setup(e) {
            return (t, n) => {
                const l = Rv("router-view");
                return (
                    Ke(),
                    Yn(BS, null, {
                        default: Ye(() => [
                            h(HS, null, { default: Ye(() => [h(l)]), _: 1 }),
                        ]),
                        _: 1,
                    })
                );
            };
        },
    },
    Ff = ch(NS);
OS(Ff);
Ff.mount("#app");
